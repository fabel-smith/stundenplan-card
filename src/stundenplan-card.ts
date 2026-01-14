import { LitElement, html, css, TemplateResult } from "lit";

/**
 * Stundenplan Card
 * - Visueller Editor
 * - highlight_today (Spalte)
 * - highlight_current (aktuelle Stunde -> Zeitspalte Hintergrund)
 * - highlight_current_text (aktuelles Fach -> Textfarbe NUR am heutigen Tag)
 * - highlight_current_time_text (aktuelle Stunde -> Textfarbe in der Zeitspalte)
 * - Highlight-Farben konfigurierbar (today/current/current_text/current_time_text)
 * - Highlight-Farben im Editor per Picker (HEX + Alpha -> rgba)
 * - Editor: Klick auf Vorschau springt/fokussiert die Zelle
 * - Editor: Wenn "time" geändert wird, werden start/end automatisch nachgezogen (wenn auto/leer)
 * - Auto-Refresh (Timer): Highlights springen automatisch um (ohne Dashboard-Reload)
 *
 * UPDATE:
 * - Echte Vorschau-Tabelle hinzugefügt (Klick auf Fach -> springt links zur passenden Eingabezelle)
 *
 * UPDATE 2:
 * - Optional: Daten aus Entity/Attribut laden (source_entity / source_attribute)
 * - Fix: Textfarbe der aktuellen Stunde/Fach bleibt unabhängig von highlight_current (Hintergrund)
 *
 * UPDATE 3:
 * - Fix (Editor): Pausen können nun gezielt "unter" einer Zeile eingefügt werden (nicht nur am Ende).
 */

type CellStyle = {
  bg?: string;        // HEX (#RRGGBB) oder CSS (rgba/var/rgb)
  bg_alpha?: number;  // 0..1 (nur wenn bg HEX ist)
  color?: string;     // HEX oder CSS
  border?: string;
};

type LessonRow = {
  time: string;
  start?: string; // "07:45"
  end?: string;   // "08:30"
  cells: string[];
  cell_styles?: (CellStyle | null)[];
};

type BreakRow = {
  break: true;
  time: string;
  label?: string;
};

type Row = LessonRow | BreakRow;

type StundenplanConfig = {
  type: string; // "custom:stundenplan-card"
  title?: string;
  days?: string[];

  highlight_today?: boolean;
  highlight_current?: boolean;

  highlight_today_color?: string;   // rgba(...) oder #...
  highlight_current_color?: string; // rgba(...) oder #...

  // Textfarbe für aktuelles Fach (nur heutige Spalte + aktuelle Zeit-Zeile)
  highlight_current_text?: boolean;
  highlight_current_text_color?: string; // rgba(...) oder #...

  // Textfarbe in der Zeitspalte für aktuelle Stunde
  highlight_current_time_text?: boolean;
  highlight_current_time_text_color?: string; // rgba(...) oder #...

  // OPTIONAL: Datenquelle aus HA Entity/Attribut
  source_entity?: string;      // z.B. "sensor.stundenplan"
  source_attribute?: string;   // z.B. "plan" (wenn JSON im Attribut liegt)
  source_time_key?: string;    // Default: "Stunde"
  rows?: Row[];
};

function isBreakRow(r: any): r is BreakRow {
  return !!r && r.break === true;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!hex) return null;
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((x) => Number.isNaN(x))) return null;
  return { r, g, b };
}

function normalizeCellStyle(s: any): CellStyle | null {
  if (!s || typeof s !== "object") return null;
  const out: CellStyle = {};

  if (typeof s.bg === "string" && s.bg.trim()) out.bg = s.bg.trim();
  if (typeof s.color === "string" && s.color.trim()) out.color = s.color.trim();
  if (typeof s.border === "string" && s.border.trim()) out.border = s.border.trim();

  if (typeof s.bg_alpha === "number" && !Number.isNaN(s.bg_alpha)) {
    out.bg_alpha = clamp01(s.bg_alpha);
  }

  return Object.keys(out).length ? out : null;
}

function backgroundCssFromStyle(st: CellStyle | null): string | null {
  if (!st?.bg) return null;
  const bg = st.bg.trim();

  if (bg.startsWith("rgba(") || bg.startsWith("rgb(") || bg.startsWith("var(")) return bg;

  const rgb = hexToRgb(bg);
  if (!rgb) return bg;
  const a = typeof st.bg_alpha === "number" ? clamp01(st.bg_alpha) : 0.18;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
}

function styleToString(style: CellStyle | null, fallbackBorder: string): string {
  const parts: string[] = [];
  const bgCss = backgroundCssFromStyle(style);
  if (bgCss) parts.push(`background:${bgCss}`);
  if (style?.color) parts.push(`color:${style.color}`);
  parts.push(`border:${style?.border ?? fallbackBorder}`);
  return parts.join(";") + ";";
}

function cssColorFromHexOrCss(value: string, defaultAlpha: number): string {
  const v = (value ?? "").toString().trim();
  if (!v) return `rgba(0,0,0,${defaultAlpha})`;
  if (v.startsWith("rgba(") || v.startsWith("rgb(") || v.startsWith("var(")) return v;
  if (v.startsWith("#")) {
    const rgb = hexToRgb(v);
    if (!rgb) return v;
    const a = clamp01(defaultAlpha);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
  }
  return v;
}

// start/end aus "time" extrahieren (z.B. "1. 07:45–08:30")
function parseStartEndFromTime(time: string | undefined): { start?: string; end?: string } {
  const t = (time ?? "").toString();
  const m = t.match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  if (!m) return {};
  return { start: m[1], end: m[2] };
}

// robustes Matching von "Heute" anhand der days-Labels (Mo/Di/... oder Mon/Tue/... etc.)
function normalizeDayLabel(label: string): string {
  return (label ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "");
}

function todayCandidates(getDay: number): string[] {
  switch (getDay) {
    case 1:
      return ["mo", "mon", "monday", "montag"];
    case 2:
      return ["di", "die", "tue", "tues", "tuesday", "dienstag"];
    case 3:
      return ["mi", "wed", "wednesday", "mittwoch"];
    case 4:
      return ["do", "thu", "thur", "thurs", "thursday", "donnerstag"];
    case 5:
      return ["fr", "fri", "friday", "freitag"];
    case 6:
      return ["sa", "sat", "saturday", "samstag"];
    case 0:
      return ["so", "sun", "sunday", "sonntag"];
    default:
      return [];
  }
}

export class StundenplanCard extends LitElement {
  public getGridOptions() {
    return { columns: "full" };
  }

  // HA injects hass into the card instance
  public hass: any;

  private config?: Required<StundenplanConfig>;

  // >>> Auto-Update Timer (damit Highlights automatisch umspringen)
  private _tick?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this._tick = window.setInterval(() => this.requestUpdate(), 30_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick) window.clearInterval(this._tick);
    this._tick = undefined;
  }
  // <<< Timer Ende

  static getStubConfig(): Required<StundenplanConfig> {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],

      highlight_today: true,
      highlight_current: true,

      highlight_today_color: "rgba(0, 150, 255, 0.12)",
      highlight_current_color: "rgba(76, 175, 80, 0.18)",

      highlight_current_text: false,
      highlight_current_text_color: "#ff1744",

      highlight_current_time_text: false,
      highlight_current_time_text_color: "#ff9100",

      // Defaults für Entity-Mode
      source_entity: "",
      source_attribute: "",
      source_time_key: "Stunde",

      rows: [
        {
          time: "1. 08:00–08:45",
          start: "08:00",
          end: "08:45",
          cells: ["D", "M", "E", "D", "S"],
          cell_styles: [
            { bg: "#3b82f6", bg_alpha: 0.18, color: "#ffffff" },
            { bg: "#22c55e", bg_alpha: 0.18, color: "#ffffff" },
            null,
            null,
            { bg: "#a855f7", bg_alpha: 0.18, color: "#ffffff" },
          ],
        },
        {
          time: "2. 08:50–09:35",
          start: "08:50",
          end: "09:35",
          cells: ["M", "M", "D", "E", "S"],
          cell_styles: [null, null, null, null, null],
        },
        { break: true, time: "09:35–09:55", label: "Pause" },
      ],
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("stundenplan-card-editor");
  }

  public setConfig(cfg: StundenplanConfig): void {
    const stub = StundenplanCard.getStubConfig();
    const type = ((cfg?.type ?? stub.type) + "").toString();

    if (!(type === "custom:stundenplan-card" || type === "stundenplan-card")) {
      this.config = this.normalizeConfig(stub);
      return;
    }

    this.config = this.normalizeConfig({
      ...stub,
      ...cfg,
      type,
    });
  }

  public getCardSize(): number {
    const rows = this.config?.rows?.length ?? 3;
    return Math.max(3, rows);
  }

  private normalizeConfig(cfg: StundenplanConfig): Required<StundenplanConfig> {
    const days =
      Array.isArray(cfg.days) && cfg.days.length
        ? cfg.days.map((d) => (d ?? "").toString())
        : ["Mo", "Di", "Mi", "Do", "Fr"];

    const rowsIn = Array.isArray(cfg.rows) ? cfg.rows : [];
    const rows: Row[] = rowsIn.map((r: any) => {
      if (isBreakRow(r)) {
        return {
          break: true,
          time: (r.time ?? "").toString(),
          label: (r.label ?? "Pause").toString(),
        };
      }

      const cellsIn = Array.isArray(r?.cells) ? r.cells : [];
      const cells = Array.from({ length: days.length }, (_, i) => (cellsIn[i] ?? "").toString());

      const stylesIn = Array.isArray(r?.cell_styles) ? r.cell_styles : [];
      const cell_styles = Array.from({ length: days.length }, (_, i) => normalizeCellStyle(stylesIn[i]));

      const timeStr = (r?.time ?? "").toString();
      const parsed = parseStartEndFromTime(timeStr);

      const startRaw = (r?.start ?? "").toString().trim();
      const endRaw = (r?.end ?? "").toString().trim();

      const out: LessonRow = {
        time: timeStr,
        start: startRaw || parsed.start || undefined,
        end: endRaw || parsed.end || undefined,
        cells,
      };
      if (cell_styles.some((x) => !!x)) out.cell_styles = cell_styles;

      return out;
    });

    return {
      type: (cfg.type ?? "custom:stundenplan-card").toString(),
      title: (cfg.title ?? "Mein Stundenplan").toString(),
      days,

      highlight_today: cfg.highlight_today ?? true,
      highlight_current: cfg.highlight_current ?? false,

      highlight_today_color: (cfg.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (cfg.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),

      highlight_current_text: cfg.highlight_current_text ?? false,
      highlight_current_text_color: (cfg.highlight_current_text_color ?? "#ff1744").toString(),

      highlight_current_time_text: cfg.highlight_current_time_text ?? false,
      highlight_current_time_text_color: (cfg.highlight_current_time_text_color ?? "#ff9100").toString(),

      source_entity: (cfg.source_entity ?? "").toString(),
      source_attribute: (cfg.source_attribute ?? "").toString(),
      source_time_key: (cfg.source_time_key ?? "Stunde").toString(),

      rows,
    };
  }

  private getTodayIndex(days: string[]): number {
    const d = new Date().getDay();
    const candidates = new Set(todayCandidates(d).map(normalizeDayLabel));
    if (!candidates.size) return -1;

    const normDays = (days ?? []).map((x) => normalizeDayLabel(x));
    for (let i = 0; i < normDays.length; i++) {
      if (candidates.has(normDays[i])) return i;
    }
    return -1;
  }

  private toMinutes(t: string | undefined): number | null {
    if (!t) return null;
    const [h, m] = t.split(":").map((x) => Number(x));
    if ([h, m].some((x) => Number.isNaN(x))) return null;
    return h * 60 + m;
  }

  private isNowBetween(start?: string, end?: string): boolean {
    const s = this.toMinutes(start);
    const e = this.toMinutes(end);
    if (s == null || e == null) return false;
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= s && mins < e;
  }

  private parseAnyJson(raw: any): any | null {
    if (raw == null) return null;
    if (typeof raw === "string") {
      const txt = raw.trim();
      if (!txt) return null;
      try {
        return JSON.parse(txt);
      } catch {
        return null;
      }
    }
    return raw;
  }

  /**
   * Optional: Rows aus HA Entity/Attribut bauen.
   * Erwartet Array von Objekten:
   * [
   *  {"ID":1,"Stunde":"1. 07:45-08:30","Montag":"Bio","Dienstag":"Mathe"},
   *  ...
   * ]
   * Keys für Tage müssen zu config.days passen (z.B. "Montag" wenn days=["Montag",...]).
   */
  private getRowsFromEntity(cfg: Required<StundenplanConfig>): Row[] | null {
    const ent = (cfg.source_entity ?? "").toString().trim();
    if (!ent) return null;
    if (!this.hass?.states?.[ent]) return null;

    const st = this.hass.states[ent];
    const attrName = (cfg.source_attribute ?? "").toString().trim();

    const raw = attrName ? st.attributes?.[attrName] : st.state;
    const data = this.parseAnyJson(raw);
    if (!Array.isArray(data)) return null;

    const days = cfg.days ?? [];
    const timeKey = (cfg.source_time_key ?? "Stunde").toString();

    const out: Row[] = data.map((obj: any) => {
      // optional: Break-Row support, falls er das später will
      if (obj?.break === true) {
        return {
          break: true,
          time: (obj.time ?? obj[timeKey] ?? "").toString(),
          label: (obj.label ?? "Pause").toString(),
        } as BreakRow;
      }

      const timeStr = (obj?.time ?? obj?.[timeKey] ?? "").toString();
      const parsed = parseStartEndFromTime(timeStr);

      const cells = Array.from({ length: days.length }, (_, i) => {
        const key = (days[i] ?? "").toString();
        const v = obj?.[key];
        return (v ?? "").toString();
      });

      const lr: LessonRow = {
        time: timeStr,
        start: parsed.start,
        end: parsed.end,
        cells,
      };

      return lr;
    });

    return out.length ? out : null;
  }

  protected render(): TemplateResult {
    if (!this.config) return html``;

    const cfg = this.config;

    // optional: rows aus Entity ziehen, fallback: manuell konfigurierte rows
    const rows = this.getRowsFromEntity(cfg) ?? cfg.rows;

    const todayIdx = this.getTodayIndex(cfg.days ?? []);
    const borderDefault = "1px solid var(--divider-color)";

    const todayOverlay = cssColorFromHexOrCss(cfg.highlight_today_color ?? "", 0.12);
    const currentOverlay = cssColorFromHexOrCss(cfg.highlight_current_color ?? "", 0.18);

    const currentTextColor = (cfg.highlight_current_text_color ?? "").toString().trim();
    const currentTimeTextColor = (cfg.highlight_current_time_text_color ?? "").toString().trim();

    return html`
      <ha-card header=${cfg.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${cfg.days.map((d, i) => {
                  const cls = cfg.highlight_today && i === todayIdx ? "today" : "";
                  return html`<th class=${cls} style=${`--sp-hl:${todayOverlay};`}>${d}</th>`;
                })}
              </tr>
            </thead>

            <tbody>
              ${rows.map((r) => {
                if (isBreakRow(r)) {
                  return html`
                    <tr class="break">
                      <td class="time">${r.time}</td>
                      <td colspan=${cfg.days.length}>${r.label ?? ""}</td>
                    </tr>
                  `;
                }

                const row = r as LessonRow;
                const cells = row.cells ?? [];
                const styles = row.cell_styles ?? [];

                // FIX: "isCurrent" darf NICHT von highlight_current abhängen,
                // sonst verschwinden Text-Highlights wenn nur der Hintergrund deaktiviert ist.
                const isCurrentTime = !!row.start && !!row.end && this.isNowBetween(row.start, row.end);

                // Zeitspalte: Hintergrund nur wenn highlight_current aktiv
                let timeStyle = `--sp-hl:${currentOverlay};`;
                if (cfg.highlight_current && isCurrentTime) {
                  timeStyle += "box-shadow: inset 0 0 0 9999px var(--sp-hl);";
                }

                // Zeitspalte: Textfarbe unabhängig vom Hintergrund-Highlight
                if (isCurrentTime && cfg.highlight_current_time_text && currentTimeTextColor) {
                  timeStyle += `color:${currentTimeTextColor};`;
                }

                return html`
                  <tr>
                    <td class="time" style=${timeStyle}>${row.time}</td>

                    ${cfg.days.map((_, i) => {
                      const val = cells[i] ?? "";
                      const cellStyle = styles[i] ?? null;

                      const cls = cfg.highlight_today && i === todayIdx ? "today" : "";
                      let style = `--sp-hl:${todayOverlay};` + styleToString(cellStyle, borderDefault);

                      // Textfarbe aktuelles Fach – unabhängig vom Hintergrund-Highlight (cfg.highlight_current)
                      if (isCurrentTime && cfg.highlight_current_text && currentTextColor && todayIdx >= 0 && i === todayIdx) {
                        style += `color:${currentTextColor};`;
                      }

                      return html`<td class=${cls} style=${style}>${val}</td>`;
                    })}
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
    }

    ha-card {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .card {
      padding: 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 6px;
      text-align: center;
      border: 1px solid var(--divider-color);
    }

    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }

    .time {
      font-weight: 700;
      white-space: nowrap;
    }

    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
}

/* ----------------- Editor ----------------- */

export class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  public hass: any;
  private _config?: Required<StundenplanConfig>;

  public setConfig(cfg: StundenplanConfig): void {
    const type = ((cfg?.type ?? "") + "").toString();
    if (type !== "custom:stundenplan-card" && type !== "stundenplan-card") {
      throw new Error(`Unsupported editor type: ${type}`);
    }
    this._config = this.normalizeConfig(this.clone(cfg));
  }

  private clone<T>(obj: T): T {
    try {
      // @ts-ignore
      return structuredClone(obj);
    } catch {
      return JSON.parse(JSON.stringify(obj));
    }
  }

  // --- Picker Helpers (Editor) ---
  private rgbaFromHex(hex: string, alpha: number): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(0,0,0,${clamp01(alpha)})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp01(alpha)})`;
  }

  private parseColorToHexAlpha(value: string, fallbackHex: string, fallbackAlpha: number): { hex: string; alpha: number } {
    const v = (value ?? "").toString().trim();

    // HEX
    if (v.startsWith("#")) {
      const rgb = hexToRgb(v);
      if (rgb) return { hex: v, alpha: clamp01(fallbackAlpha) };
      return { hex: fallbackHex, alpha: clamp01(fallbackAlpha) };
    }

    // rgba(r,g,b,a)
    const m = v.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (m) {
      const r = Math.max(0, Math.min(255, Number(m[1])));
      const g = Math.max(0, Math.min(255, Number(m[2])));
      const b = Math.max(0, Math.min(255, Number(m[3])));
      const a = clamp01(Number(m[4]));
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      return { hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`, alpha: a };
    }

    // rgb(r,g,b)
    const m2 = v.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (m2) {
      const r = Math.max(0, Math.min(255, Number(m2[1])));
      const g = Math.max(0, Math.min(255, Number(m2[2])));
      const b = Math.max(0, Math.min(255, Number(m2[3])));
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      return { hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`, alpha: clamp01(fallbackAlpha) };
    }

    return { hex: fallbackHex, alpha: clamp01(fallbackAlpha) };
  }

  private setHighlightRgba(key: keyof StundenplanConfig, hex: string, alpha01: number) {
    if (!this._config) return;
    const rgba = this.rgbaFromHex(hex, alpha01);
    this.emit({ ...this._config, [key]: rgba });
  }

  private setHighlightHexOnly(key: keyof StundenplanConfig, hex: string) {
    if (!this._config) return;
    this.emit({ ...this._config, [key]: hex });
  }

  private normalizeConfig(cfg: StundenplanConfig): Required<StundenplanConfig> {
    const days =
      Array.isArray(cfg.days) && cfg.days.length
        ? cfg.days.map((d) => (d ?? "").toString())
        : ["Mo", "Di", "Mi", "Do", "Fr"];

    const rowsIn = Array.isArray(cfg.rows) ? cfg.rows : [];
    const rows: Row[] = rowsIn.map((r: any) => {
      if (isBreakRow(r)) {
        return { break: true, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() };
      }

      const cellsIn = Array.isArray(r?.cells) ? r.cells : [];
      const cells = Array.from({ length: days.length }, (_, i) => (cellsIn[i] ?? "").toString());

      const stylesIn = Array.isArray(r?.cell_styles) ? r.cell_styles : [];
      const cell_styles = Array.from({ length: days.length }, (_, i) => normalizeCellStyle(stylesIn[i]));

      const timeStr = (r?.time ?? "").toString();
      const parsed = parseStartEndFromTime(timeStr);

      const startRaw = (r?.start ?? "").toString().trim();
      const endRaw = (r?.end ?? "").toString().trim();

      return {
        time: timeStr,
        start: startRaw || parsed.start || undefined,
        end: endRaw || parsed.end || undefined,
        cells,
        // im Editor immer vorhanden, damit bequem editierbar
        cell_styles,
      } as LessonRow;
    });

    return {
      type: (cfg.type ?? "custom:stundenplan-card").toString(),
      title: (cfg.title ?? "Mein Stundenplan").toString(),
      days,

      highlight_today: cfg.highlight_today ?? true,
      highlight_current: cfg.highlight_current ?? false,

      highlight_today_color: (cfg.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (cfg.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),

      highlight_current_text: cfg.highlight_current_text ?? false,
      highlight_current_text_color: (cfg.highlight_current_text_color ?? "#ff1744").toString(),

      highlight_current_time_text: cfg.highlight_current_time_text ?? false,
      highlight_current_time_text_color: (cfg.highlight_current_time_text_color ?? "#ff9100").toString(),

      source_entity: (cfg.source_entity ?? "").toString(),
      source_attribute: (cfg.source_attribute ?? "").toString(),
      source_time_key: (cfg.source_time_key ?? "Stunde").toString(),

      rows,
    };
  }

  private emit(cfg: any) {
    this._config = cfg;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cfg },
        bubbles: true,
        composed: true,
      })
    );
  }

  private setDaysFromString(value: string) {
    if (!this._config) return;
    const days = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length);

    const rows = (this._config.rows ?? []).map((r) => {
      if (isBreakRow(r)) return r;
      const lr = r as LessonRow;
      const cells = Array.from({ length: days.length }, (_, i) => (lr.cells?.[i] ?? "").toString());
      const styles = Array.from({ length: days.length }, (_, i) => normalizeCellStyle(lr.cell_styles?.[i]));
      return { ...lr, cells, cell_styles: styles };
    });

    this.emit({ ...this._config, days, rows });
  }

  private updateRowTime(idx: number, value: string) {
    if (!this._config) return;

    const rows = this._config.rows.map((r, i) => {
      if (i !== idx) return r;

      if (isBreakRow(r)) return { ...r, time: value };

      const lr = r as LessonRow;

      const oldParsed = parseStartEndFromTime(lr.time);
      const newParsed = parseStartEndFromTime(value);

      const startNow = (lr.start ?? "").toString().trim();
      const endNow = (lr.end ?? "").toString().trim();

      const startWasAuto = !startNow || (!!oldParsed.start && startNow === oldParsed.start);
      const endWasAuto = !endNow || (!!oldParsed.end && endNow === oldParsed.end);

      return {
        ...lr,
        time: value,
        start: startWasAuto ? (newParsed.start ?? lr.start) : lr.start,
        end: endWasAuto ? (newParsed.end ?? lr.end) : lr.end,
      };
    });

    this.emit({ ...this._config, rows });
  }

  private updateRowStart(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => {
      if (i !== idx || isBreakRow(r)) return r;
      const lr = r as LessonRow;
      return { ...lr, start: value || undefined };
    });
    this.emit({ ...this._config, rows });
  }

  private updateRowEnd(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => {
      if (i !== idx || isBreakRow(r)) return r;
      const lr = r as LessonRow;
      return { ...lr, end: value || undefined };
    });
    this.emit({ ...this._config, rows });
  }

  private updateRowCell(rowIdx: number, cellIdx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => {
      if (i !== rowIdx || isBreakRow(r)) return r;
      const row = r as LessonRow;
      const cells = Array.isArray(row.cells) ? [...row.cells] : [];
      cells[cellIdx] = value;
      return { ...row, cells };
    });
    this.emit({ ...this._config, rows });
  }

  private updateCellStyle(rowIdx: number, cellIdx: number, patch: Partial<CellStyle>) {
    if (!this._config) return;

    const rows = this._config.rows.map((r, i) => {
      if (i !== rowIdx || isBreakRow(r)) return r;

      const row = r as LessonRow;
      const styles = Array.isArray(row.cell_styles)
        ? [...row.cell_styles]
        : Array.from({ length: this._config!.days.length }, () => null as CellStyle | null);

      const current = styles[cellIdx] ? { ...(styles[cellIdx] as CellStyle) } : ({} as CellStyle);

      const next: CellStyle = { ...current, ...patch };
      if (typeof next.bg_alpha === "number") next.bg_alpha = clamp01(next.bg_alpha);

      styles[cellIdx] = normalizeCellStyle(next);
      return { ...row, cell_styles: styles };
    });

    this.emit({ ...this._config, rows });
  }

  private toggleBreak(idx: number, isBreak: boolean) {
    if (!this._config) return;

    const rows = this._config.rows.map((r, i) => {
      if (i !== idx) return r;

      if (isBreak) {
        return { break: true, time: (r as any).time ?? "", label: (r as any).label ?? "Pause" };
      }

      return {
        time: (r as any).time ?? "",
        start: undefined,
        end: undefined,
        cells: Array.from({ length: this._config!.days.length }, () => ""),
        cell_styles: Array.from({ length: this._config!.days.length }, () => null),
      } as LessonRow;
    });

    this.emit({ ...this._config, rows });
  }

  private updateBreakLabel(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => (i === idx ? { ...r, label: value } : r));
    this.emit({ ...this._config, rows });
  }

  // --- INSERT HELPERS (neu) ---
  private addLessonRow(afterIdx?: number) {
    if (!this._config) return;

    const newRow: LessonRow = {
      time: "",
      start: "",
      end: "",
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null),
    };

    const rows = [...this._config.rows];

    // Wenn afterIdx gesetzt ist, füge direkt darunter ein, sonst ans Ende.
    if (typeof afterIdx === "number" && afterIdx >= 0 && afterIdx < rows.length) {
      rows.splice(afterIdx + 1, 0, newRow);
    } else {
      rows.push(newRow);
    }

    this.emit({ ...this._config, rows });
  }

  private addBreakRow(afterIdx?: number) {
    if (!this._config) return;

    const newRow: BreakRow = { break: true, time: "", label: "Pause" };

    const rows = [...this._config.rows];

    // Wenn afterIdx gesetzt ist, füge direkt darunter ein, sonst ans Ende.
    if (typeof afterIdx === "number" && afterIdx >= 0 && afterIdx < rows.length) {
      rows.splice(afterIdx + 1, 0, newRow);
    } else {
      rows.push(newRow);
    }

    this.emit({ ...this._config, rows });
  }

  private removeRow(idx: number) {
    if (!this._config) return;
    const rows = this._config.rows.filter((_, i) => i !== idx);
    this.emit({ ...this._config, rows });
  }

  private jumpToCell(rowIdx: number, cellIdx: number) {
    const id = `sp-cell-${rowIdx}-${cellIdx}`;
    const el = this.renderRoot?.getElementById(id) as HTMLElement | null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    (el as HTMLInputElement).focus?.();
  }

  private renderEditorPreview(): TemplateResult {
    if (!this._config) return html``;

    const borderDefault = "1px solid var(--divider-color)";
    const days = this._config.days ?? [];
    const rows = this._config.rows ?? [];

    return html`
      <div class="editorPreview">
        <div class="editorPreviewTitle">Vorschau</div>

        <table class="previewTable">
          <thead>
            <tr>
              <th class="p-time">Stunde</th>
              ${days.map((d) => html`<th>${d}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${rows.map((r, rowIdx) => {
              if (isBreakRow(r)) {
                return html`
                  <tr class="p-break">
                    <td class="p-time">${r.time}</td>
                    <td colspan=${days.length}>${r.label ?? ""}</td>
                  </tr>
                `;
              }

              const lr = r as LessonRow;
              return html`
                <tr>
                  <td class="p-time">${lr.time}</td>
                  ${days.map((_, cellIdx) => {
                    const val = (lr.cells?.[cellIdx] ?? "").toString();
                    const st = (lr.cell_styles?.[cellIdx] ?? null) as CellStyle | null;

                    return html`
                      <td
                        class="p-cell"
                        style=${styleToString(st, borderDefault)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(rowIdx, cellIdx)}
                      >
                        ${val}
                      </td>
                    `;
                  })}
                </tr>
              `;
            })}
          </tbody>
        </table>

        <div class="editorPreviewHint">Tipp: Klick auf ein Fach springt zur passenden Zelle.</div>
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    const todayState = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12);
    const currentState = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);

    return html`
      ${this.renderEditorPreview()}

      <div class="section">
        <div class="row">
          <label>Titel</label>
          <input
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(e: any) => this.emit({ ...this._config!, title: e.target.value })}
          />
        </div>

        <div class="row">
          <label>Tage (Komma getrennt)</label>
          <input
            type="text"
            .value=${(this._config.days ?? []).join(", ")}
            @input=${(e: any) => this.setDaysFromString(e.target.value)}
          />
          <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>

        <div class="row">
          <label>Optionen</label>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_today ?? true}
              @change=${(e: any) => this.emit({ ...this._config!, highlight_today: e.target.checked })}
            />
            <span>Heute hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current ?? false}
              @change=${(e: any) => this.emit({ ...this._config!, highlight_current: e.target.checked })}
            />
            <span>Aktuelle Stunde hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current_text ?? false}
              @change=${(e: any) => this.emit({ ...this._config!, highlight_current_text: e.target.checked })}
            />
            <span>Aktuelles Fach (Textfarbe) hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current_time_text ?? false}
              @change=${(e: any) => this.emit({ ...this._config!, highlight_current_time_text: e.target.checked })}
            />
            <span>Aktuelle Stunde (Textfarbe) hervorheben</span>
          </div>
        </div>

        <div class="row">
          <label>Highlight-Farbe (Heute)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${todayState.hex}
              @input=${(e: any) => this.setHighlightRgba("highlight_today_color", e.target.value, todayState.alpha)}
            />
            <div class="rangeWrap">
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(todayState.alpha * 100))}
                @input=${(e: any) =>
                  this.setHighlightRgba("highlight_today_color", todayState.hex, Number(e.target.value) / 100)}
              />
              <div class="styleHint">${Math.round(todayState.alpha * 100)}%</div>
            </div>
          </div>
          <div class="hint">${this._config.highlight_today_color}</div>
        </div>

        <div class="row">
          <label>Highlight-Farbe (Aktuelle Stunde)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${currentState.hex}
              @input=${(e: any) => this.setHighlightRgba("highlight_current_color", e.target.value, currentState.alpha)}
            />
            <div class="rangeWrap">
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(currentState.alpha * 100))}
                @input=${(e: any) =>
                  this.setHighlightRgba("highlight_current_color", currentState.hex, Number(e.target.value) / 100)}
              />
              <div class="styleHint">${Math.round(currentState.alpha * 100)}%</div>
            </div>
          </div>
          <div class="hint">${this._config.highlight_current_color}</div>
        </div>

        <div class="row">
          <label>Textfarbe (Aktuelles Fach)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()}
              @input=${(e: any) => this.setHighlightHexOnly("highlight_current_text_color", e.target.value)}
            />
            <input
              type="text"
              .value=${this._config.highlight_current_text_color ?? "#ff1744"}
              @input=${(e: any) => this.emit({ ...this._config!, highlight_current_text_color: e.target.value })}
            />
          </div>
        </div>

        <div class="row">
          <label>Textfarbe (Aktuelle Stunde / Zeitspalte)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()}
              @input=${(e: any) => this.setHighlightHexOnly("highlight_current_time_text_color", e.target.value)}
            />
            <input
              type="text"
              .value=${this._config.highlight_current_time_text_color ?? "#ff9100"}
              @input=${(e: any) => this.emit({ ...this._config!, highlight_current_time_text_color: e.target.value })}
            />
          </div>
        </div>

        <!-- OPTIONAL: Entity/Attribute inputs (simple) -->
        <div class="row">
          <label>Datenquelle (optional)</label>
          <div class="hint">
            Wenn gesetzt, werden die Zeilen aus einer Entität gelesen (JSON im state oder Attribut). Leer lassen = manueller Stundenplan.
          </div>

          <div class="timeGrid">
            <div class="row">
              <label>source_entity</label>
              <input
                type="text"
                .value=${this._config.source_entity ?? ""}
                placeholder="z.B. sensor.stundenplan"
                @input=${(e: any) => this.emit({ ...this._config!, source_entity: e.target.value })}
              />
            </div>

            <div class="row">
              <label>source_attribute</label>
              <input
                type="text"
                .value=${this._config.source_attribute ?? ""}
                placeholder="z.B. plan (leer = state)"
                @input=${(e: any) => this.emit({ ...this._config!, source_attribute: e.target.value })}
              />
            </div>
          </div>

          <div class="row">
            <label>source_time_key</label>
            <input
              type="text"
              .value=${this._config.source_time_key ?? "Stunde"}
              placeholder='Default: "Stunde"'
              @input=${(e: any) => this.emit({ ...this._config!, source_time_key: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div class="rowsHeader">
        <h3>Stundenplan (Zeilen)</h3>
        <div class="btnBar">
          <button @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      ${this._config.rows.map(
        (r, idx) => html`
          <div class="rowCard">
            <div class="rowTop">
              <div>
                <label>Zeit / Stunde</label>
                <input
                  type="text"
                  .value=${(r as any).time ?? ""}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(e: any) => this.updateRowTime(idx, e.target.value)}
                />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input type="checkbox" .checked=${isBreakRow(r)} @change=${(e: any) => this.toggleBreak(idx, e.target.checked)} />
                <span>Pause</span>
              </div>

              <div class="rowActions">
                <button class="mini" title="Stunde darunter einfügen" @click=${() => this.addLessonRow(idx)}>+ Stunde</button>
                <button class="mini" title="Pause darunter einfügen" @click=${() => this.addBreakRow(idx)}>+ Pause</button>
                <button class="danger" @click=${() => this.removeRow(idx)}>Löschen</button>
              </div>
            </div>

            ${isBreakRow(r)
              ? html`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${(r as BreakRow).label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(e: any) => this.updateBreakLabel(idx, e.target.value)}
                    />
                  </div>
                `
              : html`
                  <div class="timeGrid">
                    <div class="row">
                      <label>Start (HH:MM)</label>
                      <input
                        type="text"
                        .value=${(r as LessonRow).start ?? ""}
                        placeholder="z.B. 07:45"
                        @input=${(e: any) => this.updateRowStart(idx, e.target.value)}
                      />
                    </div>
                    <div class="row">
                      <label>Ende (HH:MM)</label>
                      <input
                        type="text"
                        .value=${(r as LessonRow).end ?? ""}
                        placeholder="z.B. 08:30"
                        @input=${(e: any) => this.updateRowEnd(idx, e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="cellsGrid">
                    ${(this._config!.days ?? []).map((d, i) => {
                      const row = r as LessonRow;
                      const val = (row.cells?.[i] ?? "").toString();
                      const st = (row.cell_styles?.[i] ?? null) as CellStyle | null;

                      const bgHex = st?.bg && st.bg.startsWith("#") ? st.bg : "#3b82f6";
                      const alpha = typeof st?.bg_alpha === "number" ? clamp01(st.bg_alpha) : 0.18;
                      const alphaPct = Math.round(alpha * 100);
                      const textHex = st?.color && st.color.startsWith("#") ? st.color : "#ffffff";

                      const inputId = `sp-cell-${idx}-${i}`;

                      return html`
                        <div class="cellBox">
                          <div class="cellLabel">${d}</div>

                          <input
                            id=${inputId}
                            type="text"
                            class="cellInput"
                            .value=${val}
                            placeholder="Fach"
                            @input=${(e: any) => this.updateRowCell(idx, i, e.target.value)}
                          />

                          <div class="styleGrid">
                            <div class="styleLine">
                              <div class="styleLabel">Hintergrund</div>
                              <input
                                type="color"
                                .value=${bgHex}
                                @input=${(e: any) => this.updateCellStyle(idx, i, { bg: e.target.value })}
                              />
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Transparenz</div>
                              <div class="rangeWrap">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  .value=${String(alphaPct)}
                                  @input=${(e: any) => this.updateCellStyle(idx, i, { bg_alpha: Number(e.target.value) / 100 })}
                                />
                                <div class="styleHint">${alphaPct}%</div>
                              </div>
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Text</div>
                              <input
                                type="color"
                                .value=${textHex}
                                @input=${(e: any) => this.updateCellStyle(idx, i, { color: e.target.value })}
                              />
                            </div>
                          </div>

                          <div
                            class="preview"
                            style=${styleToString(st, "1px solid var(--divider-color)")}
                            aria-label="Vorschau"
                            title="Vorschau"
                          >
                            ${val}
                          </div>
                        </div>
                      `;
                    })}
                  </div>
                `}
          </div>
        `
      )}
    `;
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .editorPreview {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 16px;
      background: var(--card-background-color);
    }

    .editorPreviewTitle {
      font-size: 14px;
      font-weight: 600;
      opacity: 0.9;
      margin-bottom: 10px;
    }

    .previewTable {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .previewTable th,
    .previewTable td {
      border: 1px solid var(--divider-color);
      padding: 6px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }

    .previewTable th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }

    .p-time {
      font-weight: 700;
      white-space: nowrap;
      width: 110px;
    }

    .p-break {
      font-style: italic;
      opacity: 0.8;
    }

    .p-cell {
      cursor: pointer;
      user-select: none;
    }

    .p-cell:hover {
      filter: brightness(1.06);
    }

    .editorPreviewHint {
      margin-top: 8px;
      font-size: 12px;
      opacity: 0.7;
    }

    .section {
      margin-bottom: 18px;
    }
    .row {
      margin-bottom: 12px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      opacity: 0.85;
      font-size: 13px;
    }
    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .hint {
      opacity: 0.7;
      font-size: 12px;
      margin-top: 4px;
      word-break: break-word;
    }
    .checkboxLine {
      display: flex;
      align-items: center;
      gap: 10px;
      user-select: none;
      margin-top: 6px;
    }

    .pickerRow {
      display: grid;
      grid-template-columns: 70px 1fr;
      gap: 10px;
      align-items: center;
    }

    .rowsHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 18px 0 10px;
    }
    .rowsHeader h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      opacity: 0.9;
    }

    .btnBar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
    }
    button:hover {
      filter: brightness(1.05);
    }
    button.danger {
      background: rgba(255, 0, 0, 0.08);
    }

    .rowCard {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 12px;
      background: var(--card-background-color);
    }

    .rowTop {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
    }

    .rowActions {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    button.mini {
      padding: 7px 9px;
      border-radius: 10px;
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
    }

    .timeGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }

    .cellsGrid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }

    .cellBox {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: var(--card-background-color);
    }

    .cellLabel {
      opacity: 0.7;
      font-size: 12px;
      margin-bottom: 6px;
    }

    .cellInput {
      margin-bottom: 8px;
    }

    .styleGrid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .styleLine {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 10px;
      align-items: center;
    }

    .styleLabel {
      opacity: 0.75;
      font-size: 12px;
    }

    .rangeWrap {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
    }

    .styleHint {
      opacity: 0.7;
      font-size: 12px;
      min-width: 44px;
      text-align: right;
    }

    input[type="range"] {
      width: 100%;
    }

    input[type="color"] {
      width: 100%;
      height: 34px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      box-sizing: border-box;
      cursor: pointer;
    }

    .preview {
      border-radius: 10px;
      padding: 8px;
      text-align: center;
      opacity: 0.85;
      background: rgba(255, 255, 255, 0.04);
    }
  `;
}

/* Register (wichtig für HA) */
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", StundenplanCard);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", StundenplanCardEditor);

/* Picker-Metadaten */
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card", // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});
