import { LitElement, html, css, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";

/**
 * Stundenplan Card (Home Assistant)
 *
 * ✅ Woche blättern über week_offset_entity (Number-Entity)
 * ✅ Datum (DD.MM.) je Wochentag passend zum Offset
 * ✅ Highlights: today/current/breaks + Freistunden-Logik (nur Spalte)
 * ✅ Farben + Cell-Styles
 * ✅ Datenquelle:
 *    A) Manuell (rows)
 *    B) Entity (legacy / A/B-Wochen)
 *
 * ❌ XML / Stundenplan24 XML / Vertretungsplan: komplett entfernt (nicht genutzt)
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
type WeekMode = "off" | "kw_parity" | "week_map";

type StundenplanConfig = {
  type: string;
  title?: string;
  days?: string[];

  highlight_today?: boolean;
  highlight_current?: boolean;
  highlight_breaks?: boolean;

  // Freistunden: wenn heutige Zelle leer/"-"/"---" → nur Spalte highlighten
  free_only_column_highlight?: boolean;

  highlight_today_color?: string;
  highlight_current_color?: string;

  highlight_current_text?: boolean;
  highlight_current_text_color?: string;

  highlight_current_time_text?: boolean;
  highlight_current_time_text_color?: string;

  // Entity (legacy)
  source_entity?: string;
  source_attribute?: string;
  source_time_key?: string;

  // ✅ Woche-Offset (0 = diese Woche, 1 = nächste, -1 = letzte)
  week_offset_entity?: string; // number.xyz
  week_offset_attribute?: string; // optional (meist leer)
  week_offset_step?: number; // default 1
  week_offset_min?: number; // optional override
  week_offset_max?: number; // optional override

  // Wechselwochen (Entity A/B)
  week_mode?: WeekMode;
  week_a_is_even_kw?: boolean;
  week_map_entity?: string;
  week_map_attribute?: string;

  // A/B Entity Quellen
  source_entity_a?: string;
  source_attribute_a?: string;
  source_entity_b?: string;
  source_attribute_b?: string;

  // ✅ Komfort: Stundenplan24-Entity-Picker (Editor setzt daraus automatisch die Legacy-Quelle)
  splan24_entity?: string; // z.B. sensor.stundenplan_woche_09c
  splan24_attribute?: string; // default "rows"

  // ✅ Filter gegen "zu viele Kurse"
  filter_main_only?: boolean; // default true: nur Einträge ohne führende Zahl
  filter_allow_prefixes?: string[]; // optional: z.B. ["10eth", "08pmit"]
  filter_exclude?: string[]; // optional: Regex oder Text (wird entfernt)

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
  if (typeof s.bg_alpha === "number" && !Number.isNaN(s.bg_alpha)) out.bg_alpha = clamp01(s.bg_alpha);
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
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp01(defaultAlpha)})`;
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

// ISO-Woche / ISO-Jahr (robust)
function getISOWeekYear(date: Date): { isoWeek: number; isoYear: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const isoYear = d.getUTCFullYear();

  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const yearStartDayNum = yearStart.getUTCDay() === 0 ? 7 : yearStart.getUTCDay();
  const firstThursday = new Date(yearStart);
  firstThursday.setUTCDate(yearStart.getUTCDate() + (4 - yearStartDayNum));

  const diffMs = d.getTime() - firstThursday.getTime();
  const isoWeek = 1 + Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
  return { isoWeek, isoYear };
}

function normalizeWeekLetter(x: any): "A" | "B" | null {
  const v = (x ?? "").toString().trim().toUpperCase();
  return v === "A" || v === "B" ? v : null;
}

// Freistunden-Erkennung (Zelle)
function isFreeCellValue(v: any): boolean {
  const s = (v ?? "").toString().trim();
  if (!s) return true;
  if (s === "-" || s === "–" || s === "---") return true;
  if (s.startsWith("---")) return true;
  if (s.toUpperCase().startsWith("AUSFALL")) return true;
  return false;
}

function mapCfgDayToIsoDay(label: string): number | null {
  const n = normalizeDayLabel(label);
  if (["mo", "montag", "mon", "monday"].includes(n)) return 1;
  if (["di", "dienstag", "tue", "tues", "tuesday"].includes(n)) return 2;
  if (["mi", "mittwoch", "wed", "wednesday"].includes(n)) return 3;
  if (["do", "donnerstag", "thu", "thurs", "thursday"].includes(n)) return 4;
  if (["fr", "freitag", "fri", "friday"].includes(n)) return 5;
  if (["sa", "samstag", "sat", "saturday"].includes(n)) return 6;
  if (["so", "sonntag", "sun", "sunday"].includes(n)) return 7;
  return null;
}

/* ===================== Card ===================== */

export class StundenplanCard extends LitElement {
  public getGridOptions() {
    return { columns: "full" };
  }

  @property({ attribute: false }) public accessor hass: any;

  @state() private accessor config?: Required<StundenplanConfig>;
  @state() private accessor _rowsCache: Row[] = [];

  private _tick?: number;
  private _lastWeekOffset: number | null = null;

  // --- Recompute Guard ---
  private _lastWatchSig: string | null = null;

  private getWatchedEntities(cfg: Required<StundenplanConfig>): string[] {
    const out = new Set<string>();
    const add = (e?: string) => {
      const v = (e ?? "").toString().trim();
      if (v) out.add(v);
    };

    add(cfg.week_offset_entity);
    add(cfg.source_entity);
    add(cfg.source_entity_a);
    add(cfg.source_entity_b);
    add(cfg.week_map_entity);
    add(cfg.splan24_entity);

    return Array.from(out);
  }

  private getWeekOffsetValue(cfg: Required<StundenplanConfig>): number | null {
    const ent = (cfg.week_offset_entity ?? "").trim();
    if (!ent || !this.hass?.states?.[ent]) return null;

    const st = this.hass.states[ent];
    const attr = (cfg.week_offset_attribute ?? "").trim();
    const raw = attr ? st.attributes?.[attr] : st.state;

    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  private async setWeekOffset(cfg: Required<StundenplanConfig>, next: number) {
    const ent = (cfg.week_offset_entity ?? "").trim();
    if (!ent) return;

    const st = this.hass?.states?.[ent];
    const minA = st?.attributes?.min;
    const maxA = st?.attributes?.max;

    const min = Number.isFinite(Number(cfg.week_offset_min)) ? Number(cfg.week_offset_min) : Number(minA);
    const max = Number.isFinite(Number(cfg.week_offset_max)) ? Number(cfg.week_offset_max) : Number(maxA);

    let v = next;
    if (Number.isFinite(min)) v = Math.max(min, v);
    if (Number.isFinite(max)) v = Math.min(max, v);

    await this.hass.callService("number", "set_value", { entity_id: ent, value: v });
  }

  private getEntitySig(entityId: string): string {
    const st = this.hass?.states?.[entityId];
    if (!st) return `${entityId}:<missing>`;

    const lu = st.last_updated ?? "";
    const lc = st.last_changed ?? "";
    const state = st.state ?? "";

    const attrs = st.attributes ?? {};
    const rows = attrs.rows ?? attrs.rows_json ?? attrs.rows_ha;
    const rowsLen = Array.isArray(rows) ? rows.length : typeof rows === "string" ? rows.length : 0;

    const wk = attrs.week ?? attrs.kw ?? "";
    return `${entityId}|${lu}|${lc}|${state}|rowsLen=${rowsLen}|wk=${wk}`;
  }

  private computeWatchSig(cfg: Required<StundenplanConfig>): string {
    const ents = this.getWatchedEntities(cfg);
    const parts = ents.map((e) => this.getEntitySig(e));
    const week = cfg.week_mode !== "off" ? this.getActiveWeek(cfg) : "off";
    const off = this.getWeekOffsetValue(cfg);
    return `week=${week}|off=${off ?? "null"}::` + parts.join("::");
  }

  private recomputeRowsIfWatchedChanged(): void {
    if (!this.config) return;
    const sig = this.computeWatchSig(this.config);
    if (sig === this._lastWatchSig) return;
    this._lastWatchSig = sig;
    this.recomputeRows();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._tick = window.setInterval(() => {
      // nur für Highlights / Uhrzeit
      this.requestUpdate();
    }, 30_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick) window.clearInterval(this._tick);
    this._tick = undefined;
  }

  protected updated(changed: Map<string, any>): void {
    super.updated(changed);

    if (changed.has("config")) {
      this.recomputeRows();
      return;
    }

    if (changed.has("hass")) {
      if (this.config) {
        const off = this.getWeekOffsetValue(this.config);
        if (off !== this._lastWeekOffset) {
          this._lastWeekOffset = off;
          // kein extra reload nötig, aber Neu-Render für Datum/Anzeige
          this.requestUpdate();
        }
      }
      this.recomputeRowsIfWatchedChanged();
    }
  }

  static getStubConfig(): Required<StundenplanConfig> {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],

      highlight_today: true,
      highlight_current: true,
      highlight_breaks: false,
      free_only_column_highlight: true,

      highlight_today_color: "rgba(0, 150, 255, 0.12)",
      highlight_current_color: "rgba(76, 175, 80, 0.18)",

      highlight_current_text: false,
      highlight_current_text_color: "#ff1744",

      highlight_current_time_text: false,
      highlight_current_time_text_color: "#ff9100",

      source_entity: "",
      source_attribute: "",
      source_time_key: "Stunde",

      splan24_entity: "",
      splan24_attribute: "rows",

      week_mode: "off",
      week_a_is_even_kw: true,
      week_map_entity: "",
      week_map_attribute: "",

      week_offset_entity: "",
      week_offset_attribute: "",
      week_offset_step: 1,
      week_offset_min: undefined as any,
      week_offset_max: undefined as any,

      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",

      // Filter defaults
      filter_main_only: true,
      filter_allow_prefixes: [],
      filter_exclude: [],

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
      this.recomputeRows();
      return;
    }

    this.config = this.normalizeConfig({ ...stub, ...cfg, type });
    this.recomputeRows();
    this._lastWatchSig = null;
  }

  public getCardSize(): number {
    const rows = this.config?.rows?.length ?? 3;
    return Math.max(3, rows);
  }

  private normalizeConfig(cfg: StundenplanConfig): Required<StundenplanConfig> {
    const stub = StundenplanCard.getStubConfig();

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
        } as BreakRow;
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

    const weekModeRaw = ((cfg.week_mode ?? stub.week_mode) + "").toString().trim() as WeekMode;
    const week_mode: WeekMode =
      weekModeRaw === "kw_parity" || weekModeRaw === "week_map" || weekModeRaw === "off" ? weekModeRaw : "off";

    return {
      type: (cfg.type ?? stub.type).toString(),
      title: (cfg.title ?? stub.title).toString(),
      days,

      highlight_today: cfg.highlight_today ?? stub.highlight_today,
      highlight_current: cfg.highlight_current ?? stub.highlight_current,
      highlight_breaks: cfg.highlight_breaks ?? stub.highlight_breaks,
      free_only_column_highlight: cfg.free_only_column_highlight ?? stub.free_only_column_highlight,

      highlight_today_color: (cfg.highlight_today_color ?? stub.highlight_today_color).toString(),
      highlight_current_color: (cfg.highlight_current_color ?? stub.highlight_current_color).toString(),

      highlight_current_text: cfg.highlight_current_text ?? stub.highlight_current_text,
      highlight_current_text_color: (cfg.highlight_current_text_color ?? stub.highlight_current_text_color).toString(),

      highlight_current_time_text: cfg.highlight_current_time_text ?? stub.highlight_current_time_text,
      highlight_current_time_text_color: (cfg.highlight_current_time_text_color ?? stub.highlight_current_time_text_color).toString(),

      source_entity: (cfg.source_entity ?? stub.source_entity).toString(),
      source_attribute: (cfg.source_attribute ?? stub.source_attribute).toString(),
      source_time_key: (cfg.source_time_key ?? stub.source_time_key).toString(),

      splan24_entity: (cfg.splan24_entity ?? "").toString(),
      splan24_attribute: (cfg.splan24_attribute ?? "rows").toString(),

      week_mode,
      week_a_is_even_kw: cfg.week_a_is_even_kw ?? stub.week_a_is_even_kw,
      week_map_entity: (cfg.week_map_entity ?? stub.week_map_entity).toString(),
      week_map_attribute: (cfg.week_map_attribute ?? stub.week_map_attribute).toString(),

      source_entity_a: (cfg.source_entity_a ?? stub.source_entity_a).toString(),
      source_attribute_a: (cfg.source_attribute_a ?? stub.source_attribute_a).toString(),
      source_entity_b: (cfg.source_entity_b ?? stub.source_entity_b).toString(),
      source_attribute_b: (cfg.source_attribute_b ?? stub.source_attribute_b).toString(),

      filter_main_only: cfg.filter_main_only ?? true,
      filter_allow_prefixes: Array.isArray(cfg.filter_allow_prefixes) ? cfg.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(cfg.filter_exclude) ? cfg.filter_exclude.map(String) : [],

      week_offset_entity: (cfg.week_offset_entity ?? "").toString(),
      week_offset_attribute: (cfg.week_offset_attribute ?? "").toString(),
      week_offset_step: Number.isFinite(Number(cfg.week_offset_step)) ? Number(cfg.week_offset_step) : 1,
      week_offset_min: cfg.week_offset_min as any,
      week_offset_max: cfg.week_offset_max as any,

      rows,
    };
  }

  private getTodayIndex(days: string[]): number {
    const d = new Date().getDay();
    const candidates = new Set(todayCandidates(d).map(normalizeDayLabel));
    if (!candidates.size) return -1;

    const normDays = (days ?? []).map((x) => normalizeDayLabel(x));
    for (let i = 0; i < normDays.length; i++) if (candidates.has(normDays[i])) return i;
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

  private readEntityJson(entityId: string, attributeName: string): any | null {
    const ent = (entityId ?? "").toString().trim();
    if (!ent) return null;
    if (!this.hass?.states?.[ent]) return null;

    const st = this.hass.states[ent];
    const attr = (attributeName ?? "").toString().trim();
    const raw = attr ? st.attributes?.[attr] : st.state;
    return this.parseAnyJson(raw);
  }

  private buildRowsFromArray(cfg: Required<StundenplanConfig>, data: any[]): Row[] | null {
    if (!Array.isArray(data)) return null;

    const days = cfg.days ?? [];
    const timeKey = (cfg.source_time_key ?? "Stunde").toString();

    const out: Row[] = data.map((obj: any) => {
      if (obj?.break === true) {
        return {
          break: true,
          time: (obj.time ?? obj[timeKey] ?? "").toString(),
          label: (obj.label ?? "Pause").toString(),
        };
      }

      const timeStr = (obj?.time ?? obj?.[timeKey] ?? "").toString();
      const parsed = parseStartEndFromTime(timeStr);

      const cells = Array.from({ length: days.length }, (_, i) => {
        const key = (days[i] ?? "").toString();
        return (obj?.[key] ?? "").toString();
      });

      const lr: LessonRow = { time: timeStr, start: parsed.start, end: parsed.end, cells };
      return lr;
    });

    return out.length ? out : null;
  }

  private getRowsFromEntity(cfg: Required<StundenplanConfig>, entityId: string, attributeName: string): Row[] | null {
    let data = this.readEntityJson(entityId, attributeName);

    if (data == null) {
      if (data == null) data = this.readEntityJson(entityId, "rows");
      if (data == null) data = this.readEntityJson(entityId, "rows_json");
      if (data == null) data = this.readEntityJson(entityId, "rows_ha");
    }

    if (!Array.isArray(data)) return null;
    return this.buildRowsFromArray(cfg, data);
  }

  private weekFromParity(cfg: Required<StundenplanConfig>): "A" | "B" {
    const { isoWeek } = getISOWeekYear(new Date());
    const even = isoWeek % 2 === 0;
    const aIsEven = !!cfg.week_a_is_even_kw;
    return even === aIsEven ? "A" : "B";
  }

  private weekFromMap(cfg: Required<StundenplanConfig>): "A" | "B" | null {
    const ent = (cfg.week_map_entity ?? "").toString().trim();
    if (!ent) return null;

    const attr = (cfg.week_map_attribute ?? "").toString().trim();
    const mapData = this.readEntityJson(ent, attr);
    if (!mapData || typeof mapData !== "object") return null;

    const { isoWeek, isoYear } = getISOWeekYear(new Date());
    const wKey = String(isoWeek);
    const yKey = String(isoYear);

    if (mapData?.[yKey] && typeof mapData[yKey] === "object") {
      const v = normalizeWeekLetter(mapData[yKey][wKey]);
      if (v) return v;
    }

    const v2 = normalizeWeekLetter(mapData?.[wKey]);
    if (v2) return v2;

    return null;
  }

  private getActiveWeek(cfg: Required<StundenplanConfig>): "A" | "B" {
    if (cfg.week_mode === "week_map") return this.weekFromMap(cfg) ?? this.weekFromParity(cfg);
    if (cfg.week_mode === "kw_parity") return this.weekFromParity(cfg);
    return "A";
  }

  // ✅ Textfilter gegen "zu viele Kurse"
  private filterCellText(cell: string, cfg: Required<StundenplanConfig>): string {
    const raw = (cell ?? "").toString().trim();
    if (!raw) return "";

    const parts = raw
      .split("/")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s !== "---" && s !== "—");

    const excl = (cfg.filter_exclude ?? []).map((x) => x.trim()).filter(Boolean);
    const isExcluded = (p: string) =>
      excl.some((e) => {
        try {
          return new RegExp(e, "i").test(p);
        } catch {
          return p.toLowerCase().includes(e.toLowerCase());
        }
      });

    const remaining = parts.filter((p) => !isExcluded(p));

    const mainOnly = cfg.filter_main_only !== false ? remaining.filter((p) => !/^\d/.test(p)) : remaining;

    const allow = (cfg.filter_allow_prefixes ?? []).map((x) => x.toLowerCase()).filter(Boolean);
    const allowed = remaining.filter((p) => {
      const m = p.match(/^(\d+[a-z]+)/i);
      if (!m) return false;
      const key = m[1].toLowerCase();
      return allow.some((a) => key.startsWith(a));
    });

    const finalParts = Array.from(new Set([...mainOnly, ...allowed]));
    return finalParts.join(" / ");
  }

  private getWeekOffset(cfg: Required<StundenplanConfig>): number {
    const n = this.getWeekOffsetValue(cfg);
    if (n == null) return 0;
    return Math.max(-52, Math.min(52, Math.trunc(n)));
  }

  private getBaseDate(cfg: Required<StundenplanConfig>): Date {
    const off = this.getWeekOffset(cfg);
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + off * 7);
    return d;
  }

  private mondayOfWeek(date: Date): Date {
    const d = new Date(date);
    const dow = d.getDay() === 0 ? 7 : d.getDay(); // Mo=1..So=7
    d.setDate(d.getDate() - (dow - 1));
    d.setHours(12, 0, 0, 0);
    return d;
  }

  private fmtDDMM(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}.`;
  }

  private getRowsResolved(cfg: Required<StundenplanConfig>): Row[] {
    // 1) Wechselwochen Entity A/B
    if (cfg.week_mode !== "off") {
      const w = this.getActiveWeek(cfg);

      const entA = (cfg.source_entity_a ?? "").trim();
      const entB = (cfg.source_entity_b ?? "").trim();
      const attrA = (cfg.source_attribute_a ?? "").trim();
      const attrB = (cfg.source_attribute_b ?? "").trim();

      if (w === "A" && entA) {
        const rA = this.getRowsFromEntity(cfg, entA, attrA);
        if (rA) return rA;
      }
      if (w === "B" && entB) {
        const rB = this.getRowsFromEntity(cfg, entB, attrB);
        if (rB) return rB;
      }

      const legacyEnt = (cfg.source_entity ?? "").trim();
      if (legacyEnt) {
        const rLegacy = this.getRowsFromEntity(cfg, legacyEnt, (cfg.source_attribute ?? "").trim());
        if (rLegacy) return rLegacy;
      }

      return cfg.rows ?? [];
    }

    // 2) Single entity
    const ent = (cfg.source_entity ?? "").toString().trim();
    if (ent) return this.getRowsFromEntity(cfg, ent, (cfg.source_attribute ?? "").toString().trim()) ?? (cfg.rows ?? []);

    // 3) fallback manual
    return cfg.rows ?? [];
  }

  private recomputeRows() {
    if (!this.config) {
      this._rowsCache = [];
      return;
    }
    this._rowsCache = this.getRowsResolved(this.config);
  }

  protected render(): TemplateResult {
    if (!this.config) return html``;

    const cfg = this.config;
    const rows = this._rowsCache;

    const todayIdx = this.getTodayIndex(cfg.days ?? []);
    const borderDefault = "1px solid var(--divider-color)";

    const todayOverlay = cssColorFromHexOrCss(cfg.highlight_today_color ?? "", 0.12);
    const currentOverlay = cssColorFromHexOrCss(cfg.highlight_current_color ?? "", 0.18);

    const currentTextColor = (cfg.highlight_current_text_color ?? "").toString().trim();
    const currentTimeTextColor = (cfg.highlight_current_time_text_color ?? "").toString().trim();

    const showWeekBadge = cfg.week_mode !== "off";
    const activeWeek = showWeekBadge ? this.getActiveWeek(cfg) : null;

    const offVal = this.getWeekOffsetValue(cfg);
    const canOffset = (cfg.week_offset_entity ?? "").trim().length > 0;
    const step = Number(cfg.week_offset_step ?? 1) || 1;
    const offDisplay = offVal ?? 0; // wenn null: trotzdem bedienbar ab 0

    return html`
      <ha-card header=${cfg.title ?? ""}>
        <div class="card">
          <div class="topBar">
            <div class="leftPills">
              ${showWeekBadge ? html`<div class="pillBox">Woche: <b>${activeWeek}</b></div>` : html``}
            </div>

            ${canOffset
              ? html`
                  <div class="offsetBar">
                    <button class="btnMini" @click=${() => this.setWeekOffset(cfg, offDisplay - step)}>&lt;</button>
                    <div class="offsetVal" title="week_offset_entity">${offVal ?? 0}</div>
                    <button class="btnMini" @click=${() => this.setWeekOffset(cfg, offDisplay + step)}>&gt;</button>
                  </div>
                `
              : html``}
          </div>

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${cfg.days.map((d, i) => {
                  const cls = cfg.highlight_today && i === todayIdx ? "today" : "";

                  const baseDate = this.getBaseDate(cfg);
                  const mon = this.mondayOfWeek(baseDate);

                  const isoDay = mapCfgDayToIsoDay(d);
                  let ddmm = "";
                  if (isoDay) {
                    const dt = new Date(mon);
                    dt.setDate(mon.getDate() + (isoDay - 1));
                    ddmm = this.fmtDDMM(dt);
                  }

                  return html`
                    <th class=${cls} style=${`--sp-hl:${todayOverlay};`}>
                      <div>${d}</div>
                      <div class="thDate">${ddmm}</div>
                    </th>
                  `;
                })}
              </tr>
            </thead>

            <tbody>
              ${rows.map((r) => {
                if (isBreakRow(r)) {
                  const parsed = parseStartEndFromTime(r.time);
                  const isCurrentBreak = !!parsed.start && !!parsed.end && this.isNowBetween(parsed.start, parsed.end);
                  const doHighlightBreak = !!cfg.highlight_breaks && isCurrentBreak;

                  let breakTimeStyle = `--sp-hl:${currentOverlay};`;
                  let breakCellStyle = "";

                  if (doHighlightBreak) {
                    breakTimeStyle += "box-shadow: inset 0 0 0 9999px var(--sp-hl);";
                    breakCellStyle += `--sp-hl:${currentOverlay}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`;
                  }

                  if (doHighlightBreak && cfg.highlight_current_time_text && currentTimeTextColor) {
                    breakTimeStyle += `color:${currentTimeTextColor};`;
                  }

                  return html`
                    <tr class="break">
                      <td class="time" style=${breakTimeStyle}>${r.time}</td>
                      <td colspan=${cfg.days.length} style=${breakCellStyle}>${r.label ?? ""}</td>
                    </tr>
                  `;
                }

                const row = r as LessonRow;
                const cellsRaw = row.cells ?? [];
                const styles = row.cell_styles ?? [];

                const cells = cellsRaw.map((c) => this.filterCellText(c, cfg));
                const isCurrentTime = !!row.start && !!row.end && this.isNowBetween(row.start, row.end);

                const todayValRaw = todayIdx >= 0 ? (cellsRaw[todayIdx] ?? "") : "";
                const todayVal = todayIdx >= 0 ? this.filterCellText(todayValRaw, cfg) : "";
                const todayCellIsFree = todayIdx >= 0 ? isFreeCellValue(todayVal) : false;

                const suppressCurrent = !!cfg.free_only_column_highlight && todayCellIsFree;
                const allowCurrent = !suppressCurrent;

                let timeStyle = `--sp-hl:${currentOverlay};`;
                if (allowCurrent && cfg.highlight_current && isCurrentTime) timeStyle += "box-shadow: inset 0 0 0 9999px var(--sp-hl);";
                if (allowCurrent && isCurrentTime && cfg.highlight_current_time_text && currentTimeTextColor)
                  timeStyle += `color:${currentTimeTextColor};`;

                return html`
                  <tr>
                    <td class="time" style=${timeStyle}>${row.time}</td>

                    ${cfg.days.map((_, i) => {
                      const val = cells[i] ?? "";
                      const cellStyle = styles[i] ?? null;

                      const cls = cfg.highlight_today && i === todayIdx ? "today" : "";
                      let style = `--sp-hl:${todayOverlay};` + styleToString(cellStyle, borderDefault);

                      const hasValue = !isFreeCellValue(val);

                      if (
                        allowCurrent &&
                        hasValue &&
                        isCurrentTime &&
                        cfg.highlight_current_text &&
                        currentTextColor &&
                        todayIdx >= 0 &&
                        i === todayIdx
                      ) {
                        style += `color:${currentTextColor};`;
                      }

                      return html`<td class=${cls} style=${style}><span class="cellText">${val}</span></td>`;
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
      display: grid;
      gap: 10px;
    }

    /* ✅ Fix: Offset-Bar liegt NICHT mehr über der Tabelle */
    .topBar {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .leftPills {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    .pillBox {
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      font-size: 13px;
      opacity: 0.95;
      white-space: nowrap;
    }

    .offsetBar {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 6px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
    }
    .btnMini {
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 6px 10px;
      cursor: pointer;
    }
    .btnMini:hover {
      filter: brightness(1.06);
    }
    .offsetVal {
      min-width: 34px;
      text-align: center;
      font-weight: 700;
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
      vertical-align: middle;
      word-break: break-word;
    }
    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }
    .thDate {
      font-size: 11px;
      opacity: 0.75;
      margin-top: 2px;
      font-weight: 600;
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
    .cellText {
      white-space: pre-line;
      display: inline-block;
    }
  `;
}

/* ===================== Editor ===================== */

export class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  public hass: any;
  private _config?: Required<StundenplanConfig>;

  private _ui = {
    openGeneral: false,
    openHighlight: false,
    openColors: false,
    openSources: false,
    openRows: false,
    openSplan24: false,
    showCellStyles: true,
    rowOpen: {} as Record<number, boolean>,
  };

  public setConfig(cfg: StundenplanConfig): void {
    const type = ((cfg?.type ?? "") + "").toString();
    if (type !== "custom:stundenplan-card" && type !== "stundenplan-card") {
      throw new Error(`Unsupported editor type: ${type}`);
    }

    const wasInitialized = !!this._config;
    this._config = this.normalizeConfig(this.clone(cfg));

    if (!wasInitialized) {
      this._ui.rowOpen = {};
    }
  }

  private normalizeConfig(cfg: StundenplanConfig): Required<StundenplanConfig> {
    const stub = StundenplanCard.getStubConfig();
    const merged: StundenplanConfig = { ...stub, ...cfg, type: (cfg.type ?? stub.type).toString() };

    const days =
      Array.isArray(merged.days) && merged.days.length
        ? merged.days.map((d) => (d ?? "").toString())
        : ["Mo", "Di", "Mi", "Do", "Fr"];

    const rowsIn = Array.isArray(merged.rows) ? merged.rows : [];
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

      const out: LessonRow = {
        time: timeStr,
        start: startRaw || parsed.start || undefined,
        end: endRaw || parsed.end || undefined,
        cells,
      };
      if (cell_styles.some((x) => !!x)) out.cell_styles = cell_styles;
      return out;
    });

    const weekModeRaw = ((merged.week_mode ?? stub.week_mode) + "").toString().trim() as WeekMode;
    const week_mode: WeekMode =
      weekModeRaw === "kw_parity" || weekModeRaw === "week_map" || weekModeRaw === "off" ? weekModeRaw : "off";

    const subDaysNum = Number(merged.week_offset_step ?? 1);
    const week_offset_step = Number.isFinite(subDaysNum) ? subDaysNum : 1;

    return {
      type: (merged.type ?? stub.type).toString(),
      title: (merged.title ?? stub.title).toString(),
      days,

      highlight_today: merged.highlight_today ?? stub.highlight_today,
      highlight_current: merged.highlight_current ?? stub.highlight_current,
      highlight_breaks: merged.highlight_breaks ?? stub.highlight_breaks,
      free_only_column_highlight: merged.free_only_column_highlight ?? stub.free_only_column_highlight,

      highlight_today_color: (merged.highlight_today_color ?? stub.highlight_today_color).toString(),
      highlight_current_color: (merged.highlight_current_color ?? stub.highlight_current_color).toString(),

      highlight_current_text: merged.highlight_current_text ?? stub.highlight_current_text,
      highlight_current_text_color: (merged.highlight_current_text_color ?? stub.highlight_current_text_color).toString(),

      highlight_current_time_text: merged.highlight_current_time_text ?? stub.highlight_current_time_text,
      highlight_current_time_text_color: (merged.highlight_current_time_text_color ?? stub.highlight_current_time_text_color).toString(),

      source_entity: (merged.source_entity ?? stub.source_entity).toString(),
      source_attribute: (merged.source_attribute ?? stub.source_attribute).toString(),
      source_time_key: (merged.source_time_key ?? stub.source_time_key).toString(),

      splan24_entity: (merged.splan24_entity ?? "").toString(),
      splan24_attribute: (merged.splan24_attribute ?? "rows").toString(),

      week_mode,
      week_a_is_even_kw: merged.week_a_is_even_kw ?? stub.week_a_is_even_kw,
      week_map_entity: (merged.week_map_entity ?? stub.week_map_entity).toString(),
      week_map_attribute: (merged.week_map_attribute ?? stub.week_map_attribute).toString(),

      source_entity_a: (merged.source_entity_a ?? stub.source_entity_a).toString(),
      source_attribute_a: (merged.source_attribute_a ?? stub.source_attribute_a).toString(),
      source_entity_b: (merged.source_entity_b ?? stub.source_entity_b).toString(),
      source_attribute_b: (merged.source_attribute_b ?? stub.source_attribute_b).toString(),

      filter_main_only: merged.filter_main_only ?? true,
      filter_allow_prefixes: Array.isArray(merged.filter_allow_prefixes) ? merged.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(merged.filter_exclude) ? merged.filter_exclude.map(String) : [],

      week_offset_entity: (merged.week_offset_entity ?? "").toString(),
      week_offset_attribute: (merged.week_offset_attribute ?? "").toString(),
      week_offset_step,
      week_offset_min: merged.week_offset_min as any,
      week_offset_max: merged.week_offset_max as any,

      rows,
    };
  }

  private clone<T>(obj: T): T {
    try {
      // @ts-ignore
      return structuredClone(obj);
    } catch {
      return JSON.parse(JSON.stringify(obj));
    }
  }

  private emit(cfg: any) {
    this._config = cfg;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg }, bubbles: true, composed: true }));
  }

  private setSplan24Entity(entityId: string) {
    if (!this._config) return;

    const ent = (entityId ?? "").toString().trim();
    const attr = "rows";

    this.emit({
      ...this._config,
      splan24_entity: ent,
      splan24_attribute: attr,
      source_entity: ent,
      source_attribute: attr,
      source_time_key: "time",
    });
  }

  private shiftRowOpenAfterInsert(insertIdx: number) {
    const next: Record<number, boolean> = {};
    for (const [k, v] of Object.entries(this._ui.rowOpen)) {
      const i = Number(k);
      if (Number.isNaN(i)) continue;
      next[i >= insertIdx ? i + 1 : i] = v;
    }
    this._ui.rowOpen = next;
  }

  private shiftRowOpenAfterRemove(removeIdx: number) {
    const next: Record<number, boolean> = {};
    for (const [k, v] of Object.entries(this._ui.rowOpen)) {
      const i = Number(k);
      if (Number.isNaN(i) || i === removeIdx) continue;
      next[i > removeIdx ? i - 1 : i] = v;
    }
    this._ui.rowOpen = next;
  }

  private rgbaFromHex(hex: string, alpha: number): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(0,0,0,${clamp01(alpha)})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp01(alpha)})`;
  }

  private parseColorToHexAlpha(value: string, fallbackHex: string, fallbackAlpha: number): { hex: string; alpha: number } {
    const v = (value ?? "").toString().trim();

    if (v.startsWith("#")) {
      const rgb = hexToRgb(v);
      if (rgb) return { hex: v, alpha: clamp01(fallbackAlpha) };
      return { hex: fallbackHex, alpha: clamp01(fallbackAlpha) };
    }

    const m = v.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (m) {
      const r = Math.max(0, Math.min(255, Number(m[1])));
      const g = Math.max(0, Math.min(255, Number(m[2])));
      const b = Math.max(0, Math.min(255, Number(m[3])));
      const a = clamp01(Number(m[4]));
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      return { hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`, alpha: a };
    }

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
    this.emit({ ...this._config, [key]: this.rgbaFromHex(hex, alpha01) });
  }

  private setHighlightHexOnly(key: keyof StundenplanConfig, hex: string) {
    if (!this._config) return;
    this.emit({ ...this._config, [key]: hex });
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
      const styles = Array.from({ length: days.length }, (_, i) => normalizeCellStyle((lr as any).cell_styles?.[i]));
      return { ...lr, cells, cell_styles: styles };
    });

    this.emit({ ...this._config, days, rows });

    const next: Record<number, boolean> = {};
    Object.entries(this._ui.rowOpen).forEach(([k, v]) => {
      const i = Number(k);
      if (!Number.isNaN(i) && i >= 0 && i < rows.length) next[i] = v;
    });
    this._ui.rowOpen = next;
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
    const rows = this._config.rows.map((r, i) =>
      i !== idx || isBreakRow(r) ? r : ({ ...(r as LessonRow), start: value || undefined } as LessonRow)
    );
    this.emit({ ...this._config, rows });
  }

  private updateRowEnd(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) =>
      i !== idx || isBreakRow(r) ? r : ({ ...(r as LessonRow), end: value || undefined } as LessonRow)
    );
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
      const styles = Array.isArray((row as any).cell_styles)
        ? [...((row as any).cell_styles as (CellStyle | null)[])]
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

      if (isBreak) return { break: true, time: (r as any).time ?? "", label: (r as any).label ?? "Pause" };

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
    const rows = this._config.rows.map((r, i) => (i === idx ? { ...(r as any), label: value } : r));
    this.emit({ ...this._config, rows });
  }

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

    if (typeof afterIdx === "number" && afterIdx >= 0 && afterIdx < rows.length) {
      const insertIdx = afterIdx + 1;
      this.shiftRowOpenAfterInsert(insertIdx);
      rows.splice(insertIdx, 0, newRow);
    } else {
      rows.push(newRow);
    }

    this.emit({ ...this._config, rows });
  }

  private addBreakRow(afterIdx?: number) {
    if (!this._config) return;
    const newRow: BreakRow = { break: true, time: "", label: "Pause" };

    const rows = [...this._config.rows];

    if (typeof afterIdx === "number" && afterIdx >= 0 && afterIdx < rows.length) {
      const insertIdx = afterIdx + 1;
      this.shiftRowOpenAfterInsert(insertIdx);
      rows.splice(insertIdx, 0, newRow);
    } else {
      rows.push(newRow);
    }

    this.emit({ ...this._config, rows });
  }

  private removeRow(idx: number) {
    if (!this._config) return;
    const rows = this._config.rows.filter((_, i) => i !== idx);
    this.shiftRowOpenAfterRemove(idx);
    this.emit({ ...this._config, rows });
  }

  private async jumpToCell(rowIdx: number, cellIdx: number) {
    this._ui.openRows = true;
    this._ui.rowOpen[rowIdx] = true;

    this.requestUpdate();

    await this.updateComplete;
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    const id = `sp-cell-${rowIdx}-${cellIdx}`;
    const el = this.renderRoot?.getElementById(id) as HTMLElement | null;
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    (el as HTMLInputElement).focus?.();
  }

  private uiSwitch(checked: boolean, onChange: (v: boolean) => void) {
    return html`
      <label class="switch">
        <input type="checkbox" .checked=${checked} @change=${(e: any) => onChange(!!e.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }

  private panel(title: string, open: boolean, onToggle: (open: boolean) => void, body: TemplateResult) {
    return html`
      <details class="panel" ?open=${open} @toggle=${(e: any) => onToggle(!!e.target.open)}>
        <summary>
          <div class="panelTitle">${title}</div>
        </summary>
        <div class="panelBody">${body}</div>
      </details>
    `;
  }

  private renderEditorPreview(): TemplateResult {
    if (!this._config) return html``;

    const borderDefault = "1px solid var(--divider-color)";
    const days = this._config.days ?? [];
    const rows = this._config.rows ?? [];

    return html`
      <div class="previewWrap">
        <div class="previewTop">
          <div>
            <div class="previewTitle">Vorschau</div>
            <div class="previewHint">Klick auf ein Fach springt zur passenden Zelle im Editor.</div>
          </div>
        </div>

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
                    const st = ((lr as any).cell_styles?.[cellIdx] ?? null) as CellStyle | null;

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
      </div>
    `;
  }

  private renderGeneral(): TemplateResult {
    if (!this._config) return html``;

    return html`
      <div class="grid2">
        <div class="field">
          <label class="lbl">Titel</label>
          <input
            class="in"
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(e: any) => this.emit({ ...this._config!, title: e.target.value })}
          />
        </div>

        <div class="field">
          <label class="lbl">Tage (Komma getrennt)</label>
          <input class="in" type="text" .value=${(this._config.days ?? []).join(", ")} @input=${(e: any) => this.setDaysFromString(e.target.value)} />
          <div class="sub">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>
      </div>
    `;
  }

  private renderHighlighting(): TemplateResult {
    if (!this._config) return html``;

    const c = this._config;

    return html`
      <div class="stack">
        <div class="optRow">
          <div>
            <div class="optTitle">Heute hervorheben</div>
            <div class="sub">Hintergrund für die heutige Spalte.</div>
          </div>
          ${this.uiSwitch(!!c.highlight_today, (v) => this.emit({ ...c, highlight_today: v }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelle Stunde hervorheben</div>
            <div class="sub">Hintergrund in der Zeitspalte (Zeile bleibt neutral).</div>
          </div>
          ${this.uiSwitch(!!c.highlight_current, (v) => this.emit({ ...c, highlight_current: v }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Pausen als aktuell markieren</div>
            <div class="sub">Wenn die Pause „jetzt“ ist, wird sie wie eine aktuelle Stunde behandelt.</div>
          </div>
          ${this.uiSwitch(!!c.highlight_breaks, (v) => this.emit({ ...c, highlight_breaks: v }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Freistunden: nur Tag hervorheben</div>
            <div class="sub">Unterdrückt „Aktuell“-Highlights, wenn die heutige Zelle leer ist oder "-" / "---".</div>
          </div>
          ${this.uiSwitch(!!c.free_only_column_highlight, (v) => this.emit({ ...c, free_only_column_highlight: v }))}
        </div>

        <div class="divider"></div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelles Fach (Textfarbe)</div>
            <div class="sub">Nur am heutigen Tag, nur wenn Zelle nicht leer ist.</div>
          </div>
          ${this.uiSwitch(!!c.highlight_current_text, (v) => this.emit({ ...c, highlight_current_text: v }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelle Stunde (Zeitspalte Textfarbe)</div>
            <div class="sub">Zusätzlich zur Zeitspalten-Hinterlegung.</div>
          </div>
          ${this.uiSwitch(!!c.highlight_current_time_text, (v) => this.emit({ ...c, highlight_current_time_text: v }))}
        </div>
      </div>
    `;
  }

  private colorRow(
    label: string,
    hint: string,
    hexAlpha: { hex: string; alpha: number },
    onHex: (hex: string) => void,
    onAlpha: (a01: number) => void,
    previewText: string
  ) {
    const alphaPct = Math.round(clamp01(hexAlpha.alpha) * 100);

    return html`
      <div class="colorRow">
        <div>
          <div class="optTitle">${label}</div>
          <div class="sub">${hint}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${hexAlpha.hex} @input=${(e: any) => onHex(e.target.value)} />
          <div class="range">
            <input type="range" min="0" max="100" .value=${String(alphaPct)} @input=${(e: any) => onAlpha(Number(e.target.value) / 100)} />
            <div class="pct">${alphaPct}%</div>
          </div>
        </div>

        <div class="mono">${previewText}</div>
      </div>
    `;
  }

  private renderColors(): TemplateResult {
    if (!this._config) return html``;

    const today = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12);
    const current = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);

    return html`
      <div class="stack">
        ${this.colorRow(
          "Highlight-Farbe: Heute (Hintergrund)",
          "Spalten-Overlay für den aktuellen Wochentag.",
          today,
          (hex) => this.setHighlightRgba("highlight_today_color", hex, today.alpha),
          (a) => this.setHighlightRgba("highlight_today_color", today.hex, a),
          this._config.highlight_today_color
        )}

        ${this.colorRow(
          "Highlight-Farbe: Aktuelle Stunde (Hintergrund)",
          "Zeitspalten-Overlay (und optional Pausen).",
          current,
          (hex) => this.setHighlightRgba("highlight_current_color", hex, current.alpha),
          (a) => this.setHighlightRgba("highlight_current_color", current.hex, a),
          this._config.highlight_current_color
        )}

        <div class="divider"></div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">Textfarbe: Aktuelles Fach</label>
            <div class="inRow">
              <input class="col" type="color" .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()} @input=${(e: any) => this.setHighlightHexOnly("highlight_current_text_color", e.target.value)} />
              <input class="in" type="text" .value=${this._config.highlight_current_text_color ?? "#ff1744"} @input=${(e: any) => this.emit({ ...this._config!, highlight_current_text_color: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Textfarbe: Zeitspalte (aktuelle Stunde)</label>
            <div class="inRow">
              <input class="col" type="color" .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()} @input=${(e: any) => this.setHighlightHexOnly("highlight_current_time_text_color", e.target.value)} />
              <input class="in" type="text" .value=${this._config.highlight_current_time_text_color ?? "#ff9100"} @input=${(e: any) => this.emit({ ...this._config!, highlight_current_time_text_color: e.target.value })} />
            </div>
          </div>
        </div>

        <div class="sub">Tipp: Du kannst auch <span class="mono">rgb()/rgba()</span> oder <span class="mono">var(--...)</span> direkt in YAML setzen.</div>
      </div>
    `;
  }

  private renderSplan24(): TemplateResult {
    if (!this._config) return html``;
    const c = this._config;

    const all = Object.keys(this.hass?.states ?? {})
      .filter((eid) => eid.startsWith("sensor.stundenplan_woche_"))
      .sort((a, b) => a.localeCompare(b));

    return html`
      <div class="stack">
        <div class="panelMinor">
          <div class="minorTitle">Stundenplan24 Sensor (Entity-rows)</div>

          <div class="field">
            <label class="lbl">Stundenplan24 Woche</label>
            <select class="in" .value=${c.splan24_entity ?? ""} @change=${(e: any) => this.setSplan24Entity(e.target.value)} ?disabled=${all.length === 0}>
              <option value="">– auswählen –</option>
              ${all.map((eid) => {
                const st = this.hass?.states?.[eid];
                const fn = (st?.attributes?.friendly_name ?? "").toString().trim();
                const label = fn ? `${fn} (${eid})` : eid;
                return html`<option value=${eid}>${label}</option>`;
              })}
            </select>

            <div class="sub" style="margin-top:6px;">
              Auswahl setzt automatisch <span class="mono">source_entity</span> / <span class="mono">source_attribute</span>.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderSources(): TemplateResult {
    if (!this._config) return html``;
    const c = this._config;

    return html`
      <div class="panelMinor">
        <div class="minorTitle">Blättern (Woche Offset)</div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">week_offset_entity</label>
            <input
              class="in"
              type="text"
              .value=${c.week_offset_entity ?? ""}
              placeholder="z.B. number.05b_woche_offset"
              @input=${(e: any) => this.emit({ ...c, week_offset_entity: e.target.value })}
            />
          </div>

          <div class="field">
            <label class="lbl">Schrittweite</label>
            <input class="in" type="number" .value=${String(c.week_offset_step ?? 1)} @input=${(e: any) => this.emit({ ...c, week_offset_step: Number(e.target.value) })} />
          </div>
        </div>
      </div>

      <div class="panelMinor">
        <div class="minorTitle">Single-Source (Legacy / einfach)</div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">source_entity</label>
            <input class="in" type="text" .value=${c.source_entity ?? ""} @input=${(e: any) => this.emit({ ...c, source_entity: e.target.value })} />
          </div>

          <div class="field">
            <label class="lbl">source_attribute</label>
            <input class="in" type="text" .value=${c.source_attribute ?? ""} @input=${(e: any) => this.emit({ ...c, source_attribute: e.target.value })} />
          </div>
        </div>

        <div class="field">
          <label class="lbl">source_time_key</label>
          <input class="in" type="text" .value=${c.source_time_key ?? "Stunde"} @input=${(e: any) => this.emit({ ...c, source_time_key: e.target.value })} />
        </div>
      </div>

      <div class="panelMinor">
        <div class="minorTitle">Wechselwochen (A/B)</div>

        <div class="field">
          <label class="lbl">week_mode</label>
          <select class="in" .value=${c.week_mode ?? "off"} @change=${(e: any) => this.emit({ ...c, week_mode: e.target.value })}>
            <option value="off">off (deaktiviert)</option>
            <option value="kw_parity">kw_parity (gerade/ungerade ISO-KW)</option>
            <option value="week_map">week_map (Mapping-Entity, Fallback Parität)</option>
          </select>
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">A-Woche = gerade Kalenderwoche</div>
            <div class="sub">Wenn deaktiviert: A-Woche = ungerade KW.</div>
          </div>
          ${this.uiSwitch(!!c.week_a_is_even_kw, (v) => this.emit({ ...c, week_a_is_even_kw: v }))}
        </div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">week_map_entity (optional)</label>
            <input class="in" type="text" .value=${c.week_map_entity ?? ""} placeholder="z.B. sensor.wechselwochen_map" @input=${(e: any) => this.emit({ ...c, week_map_entity: e.target.value })} />
          </div>

          <div class="field">
            <label class="lbl">week_map_attribute</label>
            <input class="in" type="text" .value=${c.week_map_attribute ?? ""} placeholder="z.B. map (leer = state)" @input=${(e: any) => this.emit({ ...c, week_map_attribute: e.target.value })} />
          </div>
        </div>

        <div class="sub">Mapping: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span></div>

        <div class="divider"></div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">source_entity_a</label>
            <input class="in" type="text" .value=${c.source_entity_a ?? ""} @input=${(e: any) => this.emit({ ...c, source_entity_a: e.target.value })} />
          </div>
          <div class="field">
            <label class="lbl">source_attribute_a</label>
            <input class="in" type="text" .value=${c.source_attribute_a ?? ""} @input=${(e: any) => this.emit({ ...c, source_attribute_a: e.target.value })} />
          </div>
          <div class="field">
            <label class="lbl">source_entity_b</label>
            <input class="in" type="text" .value=${c.source_entity_b ?? ""} @input=${(e: any) => this.emit({ ...c, source_entity_b: e.target.value })} />
          </div>
          <div class="field">
            <label class="lbl">source_attribute_b</label>
            <input class="in" type="text" .value=${c.source_attribute_b ?? ""} @input=${(e: any) => this.emit({ ...c, source_attribute_b: e.target.value })} />
          </div>
        </div>
      </div>
    `;
  }

  private renderRows(): TemplateResult {
    if (!this._config) return html``;

    const c = this._config;
    const days = c.days ?? [];

    return html`
      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan (Zeilen)</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Cell-Styles</div>
            ${this.uiSwitch(!!this._ui.showCellStyles, (v) => {
              this._ui.showCellStyles = v;
              this.requestUpdate();
            })}
          </div>

          <button class="btn" @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button class="btn" @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">Pro Zeile: Zeit + optional Start/Ende. Per Klick in der Vorschau springst du zur passenden Zelle.</div>

      ${(c.rows ?? []).map((r, idx) => {
        const isBreak = isBreakRow(r);
        const header = isBreak ? `Pause · ${(r as any).time ?? ""}` : `Stunde · ${(r as any).time ?? ""}`;
        const label = isBreak ? ((r as BreakRow).label ?? "Pause") : "";
        const lr = r as LessonRow;

        return html`
          <details class="rowPanel" ?open=${this._ui.rowOpen[idx] ?? false} @toggle=${(e: any) => (this._ui.rowOpen[idx] = !!e.target.open)}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${header || `Zeile ${idx + 1}`}</div>
                <div class="rowHeadMeta">${isBreak ? label : `${(lr.start ?? "") || "Start?"} – ${(lr.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${(r as any).time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(e: any) => this.updateRowTime(idx, e.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(isBreak, (v) => this.toggleBreak(idx, v))}
                  </div>
                </div>
              </div>

              ${isBreak
                ? html`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${(r as BreakRow).label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(e: any) => this.updateBreakLabel(idx, e.target.value)} />
                    </div>
                  `
                : html`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${(lr.start ?? "") as any} placeholder="z.B. 07:45" @input=${(e: any) => this.updateRowStart(idx, e.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${(lr.end ?? "") as any} placeholder="z.B. 08:30" @input=${(e: any) => this.updateRowEnd(idx, e.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${days.map((d, i) => {
                        const val = (lr.cells?.[i] ?? "").toString();
                        const st = ((lr as any).cell_styles?.[i] ?? null) as CellStyle | null;

                        const bgHex = st?.bg && st.bg.startsWith("#") ? st.bg : "#3b82f6";
                        const alpha = typeof st?.bg_alpha === "number" ? clamp01(st.bg_alpha) : 0.18;
                        const alphaPct = Math.round(alpha * 100);
                        const textHex = st?.color && st.color.startsWith("#") ? st.color : "#ffffff";

                        const inputId = `sp-cell-${idx}-${i}`;
                        const compactPreview = styleToString(st, "1px solid var(--divider-color)");

                        return html`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${d}</div>
                              <div class="cellMiniPreview" style=${compactPreview} title="Zellvorschau">${val || "…"}</div>
                            </div>

                            <input id=${inputId} class="in" type="text" .value=${val} placeholder="Fach" @input=${(e: any) => this.updateRowCell(idx, i, e.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${bgHex} @input=${(e: any) => this.updateCellStyle(idx, i, { bg: e.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(alphaPct)} @input=${(e: any) => this.updateCellStyle(idx, i, { bg_alpha: Number(e.target.value) / 100 })} />
                                  <div class="pct">${alphaPct}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${textHex} @input=${(e: any) => this.updateCellStyle(idx, i, { color: e.target.value })} />
                              </div>
                            </div>
                          </div>
                        `;
                      })}
                    </div>
                  `}

              <div class="rowActions">
                <button class="btn" @click=${() => this.addLessonRow(idx)}>+ Stunde darunter</button>
                <button class="btn" @click=${() => this.addBreakRow(idx)}>+ Pause darunter</button>
                <button class="btn danger" @click=${() => this.removeRow(idx)}>Löschen</button>
              </div>
            </div>
          </details>
        `;
      })}
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    return html`
      ${this.renderEditorPreview()}
      ${this.panel("Allgemein", this._ui.openGeneral, (v) => (this._ui.openGeneral = v), this.renderGeneral())}
      ${this.panel("Highlights", this._ui.openHighlight, (v) => (this._ui.openHighlight = v), this.renderHighlighting())}
      ${this.panel("Farben", this._ui.openColors, (v) => (this._ui.openColors = v), this.renderColors())}
      ${this.panel("Stundenplan24", this._ui.openSplan24, (v) => (this._ui.openSplan24 = v), this.renderSplan24())}
      ${this.panel("Datenquellen", this._ui.openSources, (v) => (this._ui.openSources = v), this.renderSources())}
      ${this.panel("Zeilen & Fächer", this._ui.openRows, (v) => (this._ui.openRows = v), this.renderRows())}
    `;
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 0;
    }

    .previewWrap {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 14px;
      background: var(--card-background-color);
    }
    .previewTop {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;
    }
    .previewTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }
    .previewHint {
      margin-top: 2px;
      font-size: 12px;
      opacity: 0.7;
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

    .panel {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--card-background-color);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .panel summary {
      list-style: none;
      cursor: pointer;
      padding: 12px 12px;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      user-select: none;
    }
    .panel summary::-webkit-details-marker {
      display: none;
    }
    .panelTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }
    .panelBody {
      padding: 12px;
    }

    .stack {
      display: grid;
      gap: 12px;
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 800px) {
      .grid2 {
        grid-template-columns: 1fr;
      }
    }
    .field {
      display: grid;
      gap: 6px;
    }
    .lbl {
      font-size: 13px;
      opacity: 0.85;
    }
    .sub {
      font-size: 12px;
      opacity: 0.7;
      line-height: 1.35;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      opacity: 0.85;
      word-break: break-word;
    }
    .divider {
      height: 1px;
      background: var(--divider-color);
      opacity: 0.55;
      margin: 2px 0;
    }

    .in {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      outline: none;
    }
    .in:focus {
      box-shadow: 0 0 0 2px rgba(100, 160, 255, 0.25);
    }
    .inRow {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 10px;
      align-items: center;
    }
    .btnBar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
    }
    .toggleInline {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--secondary-background-color);
    }
    .toggleText {
      font-size: 12px;
      font-weight: 700;
      opacity: 0.85;
      white-space: nowrap;
    }

    .btn {
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn:hover {
      filter: brightness(1.05);
    }
    .btn.danger {
      background: rgba(255, 0, 0, 0.08);
    }
    select.in {
      padding: 10px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 26px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(120, 120, 120, 0.35);
      transition: 0.2s;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--card-background-color);
      transition: 0.2s;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }
    .switch input:checked + .slider {
      background: rgba(90, 160, 255, 0.45);
    }
    .switch input:checked + .slider:before {
      transform: translate(18px, -50%);
    }

    .optRow {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
    }
    .optTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.9;
      margin-bottom: 2px;
    }

    .colorRow {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      display: grid;
      gap: 10px;
      background: rgba(255, 255, 255, 0.02);
    }
    .colorControls {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 10px;
      align-items: center;
    }
    .col {
      width: 44px;
      height: 34px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--card-background-color);
      cursor: pointer;
      box-sizing: border-box;
    }
    .range {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
    }
    .pct {
      min-width: 44px;
      text-align: right;
      font-size: 12px;
      opacity: 0.75;
    }

    .panelMinor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.02);
      display: grid;
      gap: 10px;
    }
    .minorTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.9;
    }

    .rowsTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    .rowsTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }

    .rowPanel {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--card-background-color);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .rowPanel summary {
      list-style: none;
      cursor: pointer;
      padding: 12px;
      background: var(--secondary-background-color);
      user-select: none;
    }
    .rowPanel summary::-webkit-details-marker {
      display: none;
    }
    .rowHead {
      display: grid;
      gap: 4px;
    }
    .rowHeadTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.95;
    }
    .rowHeadMeta {
      font-size: 12px;
      opacity: 0.7;
    }
    .rowBody {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .rowActions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .cellsGrid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
    .cell {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.02);
      display: grid;
      gap: 8px;
    }
    .cellTop {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
    }
    .cellDay {
      font-size: 12px;
      opacity: 0.75;
      font-weight: 700;
    }
    .cellMiniPreview {
      border-radius: 10px;
      padding: 6px 8px;
      font-size: 12px;
      opacity: 0.9;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cellStyles {
      display: grid;
      gap: 10px;
      margin-top: 2px;
    }
    .cellStyles[hidden] {
      display: none;
    }
    .styleLine {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 10px;
      align-items: center;
    }
    .styleLbl {
      font-size: 12px;
      opacity: 0.75;
    }
    input[type="range"] {
      width: 100%;
    }
  `;
}

/* ===================== Register ===================== */

customElements.get("stundenplan-card") || customElements.define("stundenplan-card", StundenplanCard);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", StundenplanCardEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + Woche blättern (week_offset_entity). Ohne XML.",
  preview: true,
});
