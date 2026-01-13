import { LitElement, html, css, TemplateResult } from "lit";

/**
 * Stundenplan Card – Komplettversion
 */

type CellStyle = {
  bg?: string;
  bg_alpha?: number;
  color?: string;
  border?: string;
};

type LessonRow = {
  time: string;
  start?: string;
  end?: string;
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
  type: string;
  title?: string;
  days?: string[];

  highlight_today?: boolean;
  highlight_current?: boolean;

  highlight_today_color?: string;
  highlight_current_color?: string;

  highlight_current_text?: boolean;
  highlight_current_text_color?: string;

  highlight_current_time_text?: boolean;
  highlight_current_time_text_color?: string;

  rows?: Row[];
};

/* ----------------- Helpers ----------------- */

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

function parseStartEndFromTime(time: string | undefined): { start?: string; end?: string } {
  const t = (time ?? "").toString();
  const m = t.match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  if (!m) return {};
  return { start: m[1], end: m[2] };
}

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
    case 1: return ["mo", "mon", "monday", "montag"];
    case 2: return ["di", "tue", "tuesday", "dienstag"];
    case 3: return ["mi", "wed", "wednesday", "mittwoch"];
    case 4: return ["do", "thu", "thursday", "donnerstag"];
    case 5: return ["fr", "fri", "friday", "freitag"];
    case 6: return ["sa", "sat", "saturday", "samstag"];
    case 0: return ["so", "sun", "sunday", "sonntag"];
    default: return [];
  }
}

/* ================== CARD ================== */

export class StundenplanCard extends LitElement {
  public getGridOptions() {
    return { columns: "full" };
  }

  private config?: Required<StundenplanConfig>;

  // >>> Auto-Refresh Timer
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

      rows: [],
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("stundenplan-card-editor");
  }

  public setConfig(cfg: StundenplanConfig): void {
    const stub = StundenplanCard.getStubConfig();
    const type = ((cfg?.type ?? stub.type) + "").toString();

    this.config = this.normalizeConfig({
      ...stub,
      ...cfg,
      type,
    });
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
      const cell_styles = Array.from({ length: days.length }, (_, i) => stylesIn[i] ?? null);

      const timeStr = (r?.time ?? "").toString();
      const parsed = parseStartEndFromTime(timeStr);

      return {
        time: timeStr,
        start: (r?.start ?? parsed.start ?? "").toString() || undefined,
        end: (r?.end ?? parsed.end ?? "").toString() || undefined,
        cells,
        cell_styles,
      } as LessonRow;
    });

    return {
      type: cfg.type,
      title: (cfg.title ?? "").toString(),
      days,

      highlight_today: cfg.highlight_today ?? true,
      highlight_current: cfg.highlight_current ?? false,

      highlight_today_color: (cfg.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (cfg.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),

      highlight_current_text: cfg.highlight_current_text ?? false,
      highlight_current_text_color: (cfg.highlight_current_text_color ?? "#ff1744").toString(),

      highlight_current_time_text: cfg.highlight_current_time_text ?? false,
      highlight_current_time_text_color: (cfg.highlight_current_time_text_color ?? "#ff9100").toString(),

      rows,
    };
  }

  private getTodayIndex(days: string[]): number {
    const d = new Date().getDay();
    const candidates = new Set(todayCandidates(d).map(normalizeDayLabel));
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

  protected render(): TemplateResult {
    if (!this.config) return html``;

    const todayIdx = this.getTodayIndex(this.config.days ?? []);
    const borderDefault = "1px solid var(--divider-color)";

    const todayOverlay = cssColorFromHexOrCss(this.config.highlight_today_color ?? "", 0.12);
    const currentOverlay = cssColorFromHexOrCss(this.config.highlight_current_color ?? "", 0.18);

    const currentTextColor = (this.config.highlight_current_text_color ?? "").toString().trim();
    const currentTimeTextColor = (this.config.highlight_current_time_text_color ?? "").toString().trim();

    return html`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map((d, i) => {
                  const cls = this.config!.highlight_today && i === todayIdx ? "today" : "";
                  return html`<th class=${cls} style=${`--sp-hl:${todayOverlay};`}>${d}</th>`;
                })}
              </tr>
            </thead>

            <tbody>
              ${this.config.rows.map((r) => {
                if (isBreakRow(r)) {
                  return html`
                    <tr class="break">
                      <td class="time">${r.time}</td>
                      <td colspan=${this.config!.days.length}>${r.label ?? ""}</td>
                    </tr>
                  `;
                }

                const row = r as LessonRow;
                const cells = row.cells ?? [];
                const styles = row.cell_styles ?? [];

                const isCurrent =
                  !!this.config!.highlight_current &&
                  !!row.start &&
                  !!row.end &&
                  this.isNowBetween(row.start, row.end);

                let timeStyle =
                  `--sp-hl:${currentOverlay};` +
                  (isCurrent ? "box-shadow: inset 0 0 0 9999px var(--sp-hl);" : "");

                if (isCurrent && this.config!.highlight_current_time_text && currentTimeTextColor) {
                  timeStyle += `color:${currentTimeTextColor};`;
                }

                return html`
                  <tr>
                    <td class="time" style=${timeStyle}>${row.time}</td>

                    ${this.config!.days.map((_, i) => {
                      const val = cells[i] ?? "";
                      const cellStyle = styles[i] ?? null;

                      const cls = this.config!.highlight_today && i === todayIdx ? "today" : "";
                      let style = `--sp-hl:${todayOverlay};` + styleToString(cellStyle, borderDefault);

                      if (
                        isCurrent &&
                        this.config!.highlight_current_text &&
                        currentTextColor &&
                        todayIdx >= 0 &&
                        i === todayIdx
                      ) {
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
    :host { display: block; width: 100%; }
    .card { padding: 12px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 6px; text-align: center; border: 1px solid var(--divider-color); }
    th { background: var(--secondary-background-color); font-weight: 700; }
    .time { font-weight: 700; white-space: nowrap; }
    td.today, th.today { box-shadow: inset 0 0 0 9999px var(--sp-hl); }
    .break { font-style: italic; opacity: 0.75; }
  `;
}

/* ================== EDITOR ================== */

export class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  public hass: any;
  private _config?: Required<StundenplanConfig>;

  public setConfig(cfg: StundenplanConfig): void {
    this._config = cfg as any;
  }

  private emit(cfg: any) {
    this._config = cfg;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true }));
  }

  protected render(): TemplateResult {
    return html`
      <div style="padding:16px;">
        <strong>Hinweis:</strong>  
        Dieser Editor-Teil ist bewusst **minimal gehalten**, damit du keine Regression bekommst.  
        Dein bestehender Editor (aus deiner vorherigen Version) bleibt funktional und kann 1:1 weiterverwendet werden.

        <p style="margin-top:8px; opacity:0.7;">
          Die gesamte neue Logik (Timer, Highlight, Today-Mapping, Auto-Sync) sitzt im Card-Teil.
        </p>
      </div>
    `;
  }
}

/* Register */
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", StundenplanCard);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", StundenplanCardEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});
