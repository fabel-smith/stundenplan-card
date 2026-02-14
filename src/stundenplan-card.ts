import { LitElement, html, css, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";

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
  free_only_column_highlight?: boolean;

  highlight_today_color?: string;
  highlight_current_color?: string;

  highlight_current_text?: boolean;
  highlight_current_text_color?: string;

  highlight_current_time_text?: boolean;
  highlight_current_time_text_color?: string;

  source_entity?: string;
  source_attribute?: string;
  source_time_key?: string;

  // internal (auto-set) – not shown in UI
  week_offset_entity?: string;
  week_offset_attribute?: string;

  week_mode?: WeekMode;
  week_a_is_even_kw?: boolean;
  week_map_entity?: string;
  week_map_attribute?: string;

  source_entity_a?: string;
  source_attribute_a?: string;
  source_entity_b?: string;
  source_attribute_b?: string;

  // Stundenplan24 picker (sets legacy source_*)
  splan24_entity?: string;
  splan24_attribute?: string;

  filter_main_only?: boolean;
  filter_allow_prefixes?: string[];
  filter_exclude?: string[];

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

function isFreeCellValue(v: any): boolean {
  const s = (v ?? "").toString().trim();
  if (!s) return true;
  if (s === "-" || s === "–" || s === "---") return true;
  if (/^(—|\-|–|---|\s)+$/.test(s)) return true;
  return false;
}

function inferWeekOffsetEntity(sourceEntity: string): string {
  const ent = (sourceEntity ?? "").toString().trim();
  if (!ent.startsWith("sensor.")) return "";
  const id = ent.slice("sensor.".length);

  const m1 = id.match(/^(.+)_woche$/i);
  if (m1?.[1]) return `number.${m1[1]}_woche_offset`;

  const m2 = id.match(/^stundenplan_woche_(.+)$/i);
  if (m2?.[1]) return `number.${m2[1]}_woche_offset`;

  return "";
}

function mapCfgDayToIsoDow(label: string): number | null {
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

export class StundenplanCard extends LitElement {
  public getGridOptions() {
    return { columns: "full" };
  }

  @property({ attribute: false }) public accessor hass: any;
  @state() private accessor config?: Required<StundenplanConfig>;
  @state() private accessor _rowsCache: Row[] = [];

  private _tick?: number;
  private _lastWatchSig: string | null = null;
  private _lastWeekOffset: number | null = null;

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

  private getEntitySig(entityId: string): string {
    const st = this.hass?.states?.[entityId];
    if (!st) return `${entityId}:<missing>`;
    const lu = st.last_updated ?? "";
    const lc = st.last_changed ?? "";
    const state = st.state ?? "";
    const attrs = st.attributes ?? {};
    const rows = attrs.rows ?? attrs.rows_table ?? attrs.rows_json ?? attrs.rows_ha;
    const rowsLen = Array.isArray(rows) ? rows.length : typeof rows === "string" ? rows.length : 0;
    return `${entityId}|${lu}|${lc}|${state}|rowsLen=${rowsLen}`;
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

    const min = Number.isFinite(Number(minA)) ? Number(minA) : -52;
    const max = Number.isFinite(Number(maxA)) ? Number(maxA) : 52;

    let v = next;
    v = Math.max(min, v);
    v = Math.min(max, v);

    await this.hass.callService("number", "set_value", { entity_id: ent, value: v });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._tick = window.setInterval(() => {
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
      this._lastWatchSig = null;
      return;
    }

    if (changed.has("hass")) {
      if (this.config) {
        const off = this.getWeekOffsetValue(this.config);
        if (off !== this._lastWeekOffset) {
          this._lastWeekOffset = off;
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
      source_time_key: "time",

      week_offset_entity: "",
      week_offset_attribute: "",

      splan24_entity: "",
      splan24_attribute: "rows_table",

      week_mode: "off",
      week_a_is_even_kw: true,
      week_map_entity: "",
      week_map_attribute: "",

      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",

      filter_main_only: true,
      filter_allow_prefixes: [],
      filter_exclude: [],

      rows: [],
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
        return { break: true, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() } as BreakRow;
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

    const source_entity = (cfg.source_entity ?? stub.source_entity).toString().trim();
    const week_offset_entity_raw = (cfg.week_offset_entity ?? "").toString().trim();
    const week_offset_entity = week_offset_entity_raw || inferWeekOffsetEntity(source_entity);

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

      source_entity,
      source_attribute: (cfg.source_attribute ?? stub.source_attribute).toString(),
      source_time_key: (cfg.source_time_key ?? stub.source_time_key).toString(),

      week_offset_entity,
      week_offset_attribute: (cfg.week_offset_attribute ?? "").toString(),

      splan24_entity: (cfg.splan24_entity ?? "").toString(),
      splan24_attribute: (cfg.splan24_attribute ?? "rows_table").toString(),

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
    const timeKey = (cfg.source_time_key ?? "time").toString();

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

    if (data == null) data = this.readEntityJson(entityId, "rows_table");
    if (data == null) data = this.readEntityJson(entityId, "rows");
    if (data == null) data = this.readEntityJson(entityId, "rows_json");
    if (data == null) data = this.readEntityJson(entityId, "rows_ha");

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

  private filterCellText(cell: string, _cfg: Required<StundenplanConfig>): string {
    return (cell ?? "").toString().trim();
  }

  private getBaseDate(cfg: Required<StundenplanConfig>): Date {
    const off = this.getWeekOffsetValue(cfg) ?? 0;
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

  private fmtDDMMYYYY(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear());
    return `${dd}.${mm}.${yy}`;
  }

  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  private getHeaderDaysFromEntity(cfg: Required<StundenplanConfig>): Date[] | null {
    const ent = (cfg.source_entity ?? "").toString().trim();
    if (!ent || !this.hass?.states?.[ent]) return null;

    const st = this.hass.states[ent];
    const a = st.attributes ?? {};

    const daysArr: any =
      a?.meta_ha?.days ??
      a?.meta?.days ??
      a?.days ??
      (typeof a?.meta_json === "string" ? this.parseAnyJson(a.meta_json)?.days : null) ??
      null;

    if (!Array.isArray(daysArr) || daysArr.length < 3) return null;

    const dates: Date[] = [];
    for (const s0 of daysArr) {
      const s = (s0 ?? "").toString().trim();
      const m = s.match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!m) continue;
      const y = Number(m[1]);
      const mo = Number(m[2]);
      const d = Number(m[3]);
      const dt = new Date(y, mo - 1, d, 12, 0, 0, 0);
      if (!Number.isNaN(dt.getTime())) dates.push(dt);
    }
    return dates.length ? dates : null;
  }

  private getRowsResolved(cfg: Required<StundenplanConfig>): Row[] {
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

    const ent = (cfg.source_entity ?? "").toString().trim();
    if (ent) return this.getRowsFromEntity(cfg, ent, (cfg.source_attribute ?? "").toString().trim()) ?? (cfg.rows ?? []);
    return cfg.rows ?? [];
  }

  private recomputeRows() {
    if (!this.config) {
      this._rowsCache = [];
      return;
    }
    this._rowsCache = this.getRowsResolved(this.config);
  }

  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes  ✅ order like screenshot
  private parseCellTriplet(val: string): { fach?: string; raum?: string; lehrer?: string; notes?: string[] } | null {
    const raw = (val ?? "").toString().replace(/\r/g, "").trim();
    if (!raw) return null;

    const lines = raw
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (!lines.length) return null;

    const joined = lines.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(joined)) return null;

    const fach = lines[0];
    if (/^(—|\-|–|---)$/.test(fach)) return null;

    const isNote = (s: string) =>
      /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(s) ||
      /\bfällt\s+aus\b/i.test(s) ||
      /\bverlegt\b/i.test(s) ||
      /\bentfällt\b/i.test(s) ||
      /\bvertretung\b/i.test(s);

    // room is numeric (027/140/203/221/142) or alpha+digits (SH1)
    const isRoom = (s: string) => /^\d{1,4}$/.test(s) || /^[A-ZÄÖÜ]{1,4}\d{1,3}$/i.test(s);

    const tail = lines.slice(1);

    // find room (prefer first non-note that looks like room; else last room)
    let roomIdx = -1;
    for (let i = 0; i < tail.length; i++) {
      if (!isNote(tail[i]) && isRoom(tail[i])) {
        roomIdx = i;
        break;
      }
    }
    if (roomIdx < 0) {
      for (let i = tail.length - 1; i >= 0; i--) {
        if (isRoom(tail[i])) {
          roomIdx = i;
          break;
        }
      }
    }
    if (roomIdx < 0) return null;

    const raum = tail[roomIdx];

    // teacher: first non-note after room; else last non-note non-room
    let lehrer: string | undefined;
    for (let i = roomIdx + 1; i < tail.length; i++) {
      const s = tail[i];
      if (isNote(s)) continue;
      if (isRoom(s)) continue;
      lehrer = s;
      break;
    }
    if (!lehrer) {
      const cand = tail.filter((x) => !isNote(x) && !isRoom(x));
      lehrer = cand.length ? cand[cand.length - 1] : undefined;
    }

    // notes: all note-lines (anywhere after fach), keep order
    const notes = lines.slice(1).filter((s) => isNote(s));

    return { fach, raum, lehrer, notes: notes.length ? notes : undefined };
  }

  private renderCell(valIn: string, cfg: Required<StundenplanConfig>): TemplateResult {
    const v0 = (valIn ?? "").toString();
    const v = this.filterCellText(v0, cfg);
    if (isFreeCellValue(v)) return html``;

    const tri = this.parseCellTriplet(v);
    if (tri?.fach && tri?.raum && tri?.lehrer) {
      return html`
        <div class="cellWrap">
          <div class="fach">${tri.fach}</div>
          <div class="lehrer">${tri.lehrer}</div>
          <div class="raum">${tri.raum}</div>

          ${tri.notes?.length
            ? html`
                <div class="notes">
                  ${tri.notes.map((n) => {
                    const cls =
                      n.startsWith("🔴") ? "note noteRed" : n.startsWith("🟠") ? "note noteOrange" : n.startsWith("🟡") ? "note noteYellow" : "note";
                    const clean = n.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
                    return html`<div class=${cls}><span class="dot">${n.slice(0, 2).trim()}</span><span class="txt">${clean}</span></div>`;
                  })}
                </div>
              `
            : html``}
        </div>
      `;
    }

    // fallback: show first line bold, remaining as note-block
    const lines = v.replace(/\r/g, "").split("\n").map((x) => x.trim()).filter(Boolean);
    const first = (lines[0] ?? "").trim();
    const rest = lines.slice(1);

    if (first && rest.length) {
      return html`
        <div class="cellWrap">
          <div class="fach">${first}</div>
          <div class="notes">
            ${rest.map((n) => {
              const cls =
                n.startsWith("🔴") ? "note noteRed" : n.startsWith("🟠") ? "note noteOrange" : n.startsWith("🟡") ? "note noteYellow" : "note";
              const clean = n.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
              const dot = /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(n) ? n.slice(0, 2).trim() : "•";
              return html`<div class=${cls}><span class="dot">${dot}</span><span class="txt">${clean || n}</span></div>`;
            })}
          </div>
        </div>
      `;
    }

    return html`<span class="cellText">${v}</span>`;
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

    const off = this.getWeekOffsetValue(cfg);
    const canOffset = (cfg.week_offset_entity ?? "").trim().length > 0;

    const headerDatesFromEntity = this.getHeaderDaysFromEntity(cfg);
    const headerDatesByIdx =
      headerDatesFromEntity && headerDatesFromEntity.length >= (cfg.days?.length ?? 0) ? headerDatesFromEntity : null;

    const baseDate = this.getBaseDate(cfg);
    const mon = this.mondayOfWeek(baseDate);

    return html`
      <ha-card>
        <div class="headerRow">
          <div class="title">${cfg.title ?? ""}</div>

          <div class="headRight">
            ${showWeekBadge ? html`<div class="weekBadgeInline">Woche <b>${activeWeek}</b></div>` : html``}

            ${canOffset
              ? html`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => off != null && this.setWeekOffset(cfg, off - 1)}>&lt;</button>
                    <div class="offsetVal">${off ?? "?"}</div>
                    <button class="btnMini" @click=${() => off != null && this.setWeekOffset(cfg, off + 1)}>&gt;</button>
                  </div>
                `
              : html``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${cfg.days.map((d, i) => {
                  const cls = cfg.highlight_today && i === todayIdx ? "today" : "";
                  let ddmmyyyy = "";

                  if (headerDatesByIdx) {
                    ddmmyyyy = this.fmtDDMMYYYY(headerDatesByIdx[i]);
                  } else {
                    const isoDow = mapCfgDayToIsoDow(d);
                    if (isoDow) {
                      const dt = new Date(mon);
                      dt.setDate(mon.getDate() + (isoDow - 1));
                      ddmmyyyy = this.fmtDDMMYYYY(dt);
                    }
                  }

                  return html`
                    <th class=${cls} style=${`--sp-hl:${todayOverlay};`}>
                      <div>${d}</div>
                      <div class="thDate">${ddmmyyyy}</div>
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
                const isCurrentTime = !!row.start && !!row.end && this.isNowBetween(row.start, row.end);

                const todayValRaw = todayIdx >= 0 ? (cellsRaw[todayIdx] ?? "") : "";
                const todayVal = todayIdx >= 0 ? this.filterCellText(todayValRaw, cfg) : "";
                const todayCellIsFree = todayIdx >= 0 ? isFreeCellValue(todayVal) : false;

                const suppressCurrent = !!cfg.free_only_column_highlight && todayCellIsFree;
                const allowCurrent = !suppressCurrent;

                let timeStyle = `--sp-hl:${currentOverlay};`;
                if (allowCurrent && cfg.highlight_current && isCurrentTime)
                  timeStyle += "box-shadow: inset 0 0 0 9999px var(--sp-hl);";
                if (allowCurrent && isCurrentTime && cfg.highlight_current_time_text && currentTimeTextColor)
                  timeStyle += `color:${currentTimeTextColor};`;

                return html`
                  <tr>
                    <td class="time" style=${timeStyle}>${row.time}</td>

                    ${cfg.days.map((_, i) => {
                      const val = this.filterCellText(cellsRaw[i] ?? "", cfg);
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

                      return html`<td class=${cls} style=${style}>${this.renderCell(val, cfg)}</td>`;
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

    .headerRow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 14px 8px 14px;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }
    .headRight {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: nowrap;
    }

    .weekBadgeInline {
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      font-size: 13px;
      opacity: 0.95;
      white-space: nowrap;
    }

    .offsetInline {
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
      min-width: 30px;
      text-align: center;
      font-weight: 800;
    }

    .card {
      padding: 12px 12px 14px 12px;
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
      word-break: normal;
      overflow-wrap: anywhere;
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
      white-space: nowrap;
    }

    .time {
      font-weight: 700;
      white-space: nowrap;
      width: 110px;
    }

    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }

    .cellWrap {
      display: grid;
      gap: 2px;
      justify-items: center;
      line-height: 1.15;
    }
    .fach {
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
    .raum,
    .lehrer {
      font-size: 12px;
      opacity: 0.9;
      white-space: nowrap;
    }

    /* Notes like Stundenplan24: smaller, left aligned, indented */
    .notes {
      margin-top: 4px;
      display: grid;
      gap: 3px;
      justify-items: stretch;
      width: 100%;
      text-align: left;
    }
    .note {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 6px;
      align-items: start;
      font-size: 11px;
      line-height: 1.25;
      opacity: 0.92;
      padding: 3px 4px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.04);
    }
    .noteRed {
      background: rgba(244, 67, 54, 0.12);
    }
    .noteOrange {
      background: rgba(255, 152, 0, 0.12);
    }
    .noteYellow {
      background: rgba(255, 235, 59, 0.14);
    }
    .dot {
      font-size: 12px;
      line-height: 1;
      margin-top: 1px;
      opacity: 0.95;
    }
    .txt {
      white-space: pre-line;
      overflow-wrap: anywhere;
    }

    .cellText {
      white-space: pre-line;
      display: inline-block;
    }
  `;
}

/* ===================== Editor ===================== */

type AnyObj = Record<string, any>;

function fireEvent(node: HTMLElement, type: string, detail?: any) {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    })
  );
}

function asBool(v: any, def = false): boolean {
  if (typeof v === "boolean") return v;
  if (v == null) return def;
  const s = String(v).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(s)) return true;
  if (["0", "false", "no", "off"].includes(s)) return false;
  return def;
}

function splitCsv(s: string): string[] {
  return (s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

function joinCsv(arr: string[]): string {
  return (arr ?? []).map((x) => (x ?? "").toString().trim()).filter(Boolean).join(", ");
}

export class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  public hass: any;
  private _config?: Required<StundenplanConfig>;

  @state() private _open: Record<string, boolean> = {
    general: true,
    highlights: false,
    colors: false,
    splan24: true,
    sources: true,
    manual: false,
  };

  public setConfig(cfg: StundenplanConfig): void {
    const type = ((cfg?.type ?? "") + "").toString();
    if (type !== "custom:stundenplan-card" && type !== "stundenplan-card") {
      throw new Error(`Unsupported editor type: ${type}`);
    }
    this._config = this.normalizeConfig(this.clone(cfg));
  }

  private normalizeConfig(cfg: StundenplanConfig): Required<StundenplanConfig> {
    return (new (StundenplanCard as any)() as StundenplanCard)["normalizeConfig"](cfg);
  }

  private clone<T>(obj: T): T {
    try {
      // @ts-ignore
      return structuredClone(obj);
    } catch {
      return JSON.parse(JSON.stringify(obj));
    }
  }

  private emit(cfg: AnyObj) {
    this._config = cfg;
    fireEvent(this, "config-changed", { config: cfg });
  }

  private setValue(key: keyof StundenplanConfig, value: any) {
    if (!this._config) return;
    this.emit({ ...this._config, [key]: value });
  }

  private toggleOpen(key: string) {
    this._open = { ...this._open, [key]: !this._open[key] };
  }

  private findBestRowsAttribute(entityId: string): { attr: string; timeKey: string } {
    const st = this.hass?.states?.[entityId];
    const attrs = st?.attributes ?? {};
    if (attrs.rows_table != null) return { attr: "rows_table", timeKey: "time" };
    if (attrs.rows != null) return { attr: "rows", timeKey: "time" };
    if (attrs.rows_json != null) return { attr: "rows_json", timeKey: "time" };
    if (attrs.rows_ha != null) return { attr: "rows_ha", timeKey: "time" };
    return { attr: "rows_table", timeKey: "time" };
  }

private setSplan24Entity(entityId: string) {
  if (!this._config) return;

  const ent = (entityId ?? "").toString().trim();

  // FIX: Attribut nicht auswählbar, sondern fest
  const attr = "rows_ha"; // oder "rows" – je nachdem, was du nutzen willst

  // optional: offset helper automatisch merken/setzen (wie bei dir schon umgesetzt)
  // const offset = `number.${ent.split(".")[1]}_woche_offset`;

  this.emit({
    ...this._config,
    splan24_entity: ent,
    splan24_attribute: attr,
    source_entity: ent,
    source_attribute: attr,
    source_time_key: "time",
  });
}


  private renderSection(title: string, key: string, body: TemplateResult) {
    const open = !!this._open[key];
    return html`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(key)}>
          <div class="sectionTitle">${title}</div>
          <div class="chev">${open ? "▾" : "▸"}</div>
        </div>
        ${open ? html`<div class="sectionBody">${body}</div>` : html``}
      </div>
    `;
  }

  private onToggle(ev: any, key: keyof StundenplanConfig) {
    const checked = !!ev?.target?.checked;
    this.setValue(key, checked);
  }

  private onText(ev: any, key: keyof StundenplanConfig) {
    const v = (ev?.target?.value ?? "").toString();
    this.setValue(key, v);
  }

  private addManualRow() {
    if (!this._config) return;
    const days = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"];
    const rows = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    const newRow: LessonRow = { time: `${rows.length + 1}.`, cells: Array.from({ length: days.length }, () => "") };
    rows.push(newRow);
    this.emit({ ...this._config, rows });
  }

  private removeManualRow(idx: number) {
    if (!this._config) return;
    const rows = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    rows.splice(idx, 1);
    this.emit({ ...this._config, rows });
  }

  private updateManualRow(idx: number, patch: Partial<LessonRow | BreakRow>) {
    if (!this._config) return;
    const rows = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    const r = rows[idx];
    rows[idx] = { ...(r as any), ...(patch as any) };
    this.emit({ ...this._config, rows });
  }

  private updateManualCell(rowIdx: number, cellIdx: number, value: string) {
    if (!this._config) return;
    const rows = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    const r = rows[rowIdx];
    if (!r || isBreakRow(r)) return;
    const rr = r as LessonRow;
    const cells = Array.isArray(rr.cells) ? rr.cells.slice() : [];
    cells[cellIdx] = value;
    (rows[rowIdx] as LessonRow) = { ...rr, cells };
    this.emit({ ...this._config, rows });
  }

  private renderManualRows() {
    if (!this._config) return html``;
    const days = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"];
    const rows = Array.isArray(this._config.rows) ? this._config.rows : [];

    return html`
      <div class="rowActions">
        <mwc-button outlined @click=${this.addManualRow}>+ Zeile</mwc-button>
      </div>

      ${rows.map((r, idx) => {
        if (isBreakRow(r)) {
          return html`
            <div class="rowCard">
              <div class="rowHead">
                <div class="rowTitle">Pause</div>
                <mwc-button dense @click=${() => this.removeManualRow(idx)}>Entfernen</mwc-button>
              </div>
              <div class="grid2">
                <ha-textfield label="Zeit" .value=${r.time ?? ""} @input=${(e: any) => this.updateManualRow(idx, { time: e.target.value })}></ha-textfield>
                <ha-textfield
                  label="Label"
                  .value=${r.label ?? "Pause"}
                  @input=${(e: any) => this.updateManualRow(idx, { label: e.target.value })}
                ></ha-textfield>
              </div>
            </div>
          `;
        }

        const lr = r as LessonRow;
        return html`
          <div class="rowCard">
            <div class="rowHead">
              <div class="rowTitle">Zeile ${idx + 1}</div>
              <div class="rowHeadBtns">
                <mwc-button dense @click=${() => this.updateManualRow(idx, { ...(lr as any), break: true, label: "Pause" } as any)}
                  >Als Pause</mwc-button
                >
                <mwc-button dense @click=${() => this.removeManualRow(idx)}>Entfernen</mwc-button>
              </div>
            </div>

            <div class="grid3">
              <ha-textfield label="Stunde" .value=${lr.time ?? ""} @input=${(e: any) => this.updateManualRow(idx, { time: e.target.value })}></ha-textfield>
              <ha-textfield label="Start" .value=${lr.start ?? ""} @input=${(e: any) => this.updateManualRow(idx, { start: e.target.value })}></ha-textfield>
              <ha-textfield label="Ende" .value=${lr.end ?? ""} @input=${(e: any) => this.updateManualRow(idx, { end: e.target.value })}></ha-textfield>
            </div>

            <div class="cellsGrid" style=${`grid-template-columns: repeat(${days.length}, minmax(0, 1fr));`}>
              ${days.map(
                (d, di) => html`
                  <div class="cellEditor">
                    <div class="cellEditorHead">${d}</div>
                    <ha-textarea
                      .value=${(lr.cells?.[di] ?? "").toString()}
                      @input=${(e: any) => this.updateManualCell(idx, di, e.target.value)}
                      placeholder="Fach\nRaum\nLehrer + Info-Zeilen"
                      autosize
                    ></ha-textarea>
                  </div>
                `
              )}
            </div>
          </div>
        `;
      })}
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const cfg = this._config;

    const splan24Entity = (cfg.splan24_entity ?? "").toString().trim();
    const inferredOffset = splan24Entity ? inferWeekOffsetEntity(splan24Entity) : "";
    const offsetInfo = inferredOffset ? inferredOffset : (cfg.week_offset_entity ?? "").toString().trim();

    return html`
      <div class="wrap">
        ${this.renderSection(
          "Allgemein",
          "general",
          html`
            <div class="grid2">
              <ha-textfield label="Titel" .value=${cfg.title ?? ""} @input=${(e: any) => this.onText(e, "title")}></ha-textfield>

              <ha-textfield
                label="Tage (CSV)"
                .value=${joinCsv(cfg.days ?? [])}
                @input=${(e: any) => this.setValue("days", splitCsv(e.target.value))}
                helper="z.B. Mo, Di, Mi, Do, Fr"
              ></ha-textfield>
            </div>
          `
        )}

        ${this.renderSection(
          "Highlights",
          "highlights",
          html`
            <div class="grid3">
              <ha-switch .checked=${asBool(cfg.highlight_today, true)} @change=${(e: any) => this.onToggle(e, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${asBool(cfg.highlight_current, true)} @change=${(e: any) => this.onToggle(e, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${asBool(cfg.highlight_breaks, false)} @change=${(e: any) => this.onToggle(e, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${asBool(cfg.free_only_column_highlight, true)}
                @change=${(e: any) => this.onToggle(e, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${asBool(cfg.highlight_current_text, false)} @change=${(e: any) => this.onToggle(e, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${cfg.highlight_current_text_color ?? ""} @input=${(e: any) => this.onText(e, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${asBool(cfg.highlight_current_time_text, false)} @change=${(e: any) => this.onToggle(e, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-textfield label="Zeitfarbe" .value=${cfg.highlight_current_time_text_color ?? ""} @input=${(e: any) => this.onText(e, "highlight_current_time_text_color")}></ha-textfield>
            </div>
          `
        )}

        ${this.renderSection(
          "Farben",
          "colors",
          html`
            <div class="grid2">
              <ha-textfield label="Heute Overlay" .value=${cfg.highlight_today_color ?? ""} @input=${(e: any) => this.onText(e, "highlight_today_color")}></ha-textfield>
              <ha-textfield label="Aktuell Overlay" .value=${cfg.highlight_current_color ?? ""} @input=${(e: any) => this.onText(e, "highlight_current_color")}></ha-textfield>
            </div>
          `
        )}

        ${this.renderSection(
          "Stundenplan24",
          "splan24",
          html`
            <div class="hint">
              Wähle hier deinen <b>sensor.&lt;klasse&gt;_woche</b>. Dadurch werden Datenquelle + Attribut automatisch gesetzt und der Offset-Helper im Hintergrund erkannt
              (<code>${offsetInfo || "—"}</code>).
            </div>

            <div class="grid2">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${cfg.splan24_entity ?? ""}
                .includeDomains=${["sensor"]}
                .label=${"Stundenplan24 Woche Sensor (Entity-rows)"}
                @value-changed=${(e: any) => this.setSplan24Entity(e.detail.value)}
              ></ha-entity-picker>

              <ha-select
                .label=${"Attribut"}
                .value=${cfg.splan24_attribute ?? "rows_table"}
                @selected=${(e: any) => this.setValue("splan24_attribute", e.target.value)}
              >
                <mwc-list-item value="rows_table">rows_table</mwc-list-item>
                <mwc-list-item value="rows">rows</mwc-list-item>
                <mwc-list-item value="rows_ha">rows_ha</mwc-list-item>
                <mwc-list-item value="rows_json">rows_json</mwc-list-item>
              </ha-select>
            </div>
          `
        )}

        ${this.renderSection(
          "Datenquellen",
          "sources",
          html`
            <div class="grid2">
              <ha-textfield label="source_entity (Legacy / intern)" .value=${cfg.source_entity ?? ""} @input=${(e: any) => this.onText(e, "source_entity")}></ha-textfield>
              <ha-textfield label="source_attribute (Legacy / intern)" .value=${cfg.source_attribute ?? ""} @input=${(e: any) => this.onText(e, "source_attribute")}></ha-textfield>
            </div>

            <div class="hint">
              Hinweis: <code>week_offset_entity</code> wird automatisch aus <code>sensor.&lt;klasse&gt;_woche</code> abgeleitet und nicht mehr im UI angezeigt.
            </div>

            <div class="grid2">
              <ha-select .label=${"Wechselwochen (A/B)"} .value=${cfg.week_mode ?? "off"} @selected=${(e: any) => this.setValue("week_mode", e.target.value)}>
                <mwc-list-item value="off">off (deaktiviert)</mwc-list-item>
                <mwc-list-item value="kw_parity">kw_parity (KW gerade/ungerade)</mwc-list-item>
                <mwc-list-item value="week_map">week_map (Mapping Entity)</mwc-list-item>
              </ha-select>

              <ha-switch .checked=${asBool(cfg.week_a_is_even_kw, true)} @change=${(e: any) => this.onToggle(e, "week_a_is_even_kw")}></ha-switch>
              <div class="switchLabel">Woche A = gerade KW</div>
              <div></div>
            </div>

            ${cfg.week_mode === "week_map"
              ? html`
                  <div class="grid2">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${cfg.week_map_entity ?? ""}
                      .includeDomains=${["sensor", "input_text"]}
                      .label=${"week_map_entity"}
                      @value-changed=${(e: any) => this.setValue("week_map_entity", e.detail.value)}
                    ></ha-entity-picker>

                    <ha-textfield label="week_map_attribute" .value=${cfg.week_map_attribute ?? ""} @input=${(e: any) => this.onText(e, "week_map_attribute")}></ha-textfield>
                  </div>
                `
              : html``}

            ${cfg.week_mode !== "off"
              ? html`
                  <div class="grid2">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${cfg.source_entity_a ?? ""}
                      .includeDomains=${["sensor"]}
                      .label=${"source_entity_a"}
                      @value-changed=${(e: any) => this.setValue("source_entity_a", e.detail.value)}
                    ></ha-entity-picker>
                    <ha-textfield label="source_attribute_a" .value=${cfg.source_attribute_a ?? ""} @input=${(e: any) => this.onText(e, "source_attribute_a")}></ha-textfield>

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${cfg.source_entity_b ?? ""}
                      .includeDomains=${["sensor"]}
                      .label=${"source_entity_b"}
                      @value-changed=${(e: any) => this.setValue("source_entity_b", e.detail.value)}
                    ></ha-entity-picker>
                    <ha-textfield label="source_attribute_b" .value=${cfg.source_attribute_b ?? ""} @input=${(e: any) => this.onText(e, "source_attribute_b")}></ha-textfield>
                  </div>
                `
              : html``}
          `
        )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }

  static styles = css`
    .wrap {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .section {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    .sectionHead {
      padding: 12px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--secondary-background-color);
      user-select: none;
    }
    .sectionTitle {
      font-weight: 700;
    }
    .chev {
      opacity: 0.8;
    }
    .sectionBody {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      align-items: center;
    }
    .grid3 {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      gap: 10px;
      align-items: center;
    }
    .switchLabel {
      opacity: 0.9;
    }
    .hint {
      font-size: 12px;
      opacity: 0.85;
      line-height: 1.4;
    }
    code {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }

    .rowActions {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
    }
    .rowCard {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      display: grid;
      gap: 10px;
      background: var(--secondary-background-color);
    }
    .rowHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .rowTitle {
      font-weight: 700;
    }
    .rowHeadBtns {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .cellsGrid {
      display: grid;
      gap: 10px;
    }
    .cellEditor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: var(--card-background-color);
      display: grid;
      gap: 8px;
    }
    .cellEditorHead {
      font-weight: 700;
      opacity: 0.9;
      font-size: 12px;
    }

    @media (max-width: 900px) {
      .grid2 {
        grid-template-columns: 1fr;
      }
      .grid3 {
        grid-template-columns: 1fr;
      }
    }
  `;
}

customElements.get("stundenplan-card") || customElements.define("stundenplan-card", StundenplanCard);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", StundenplanCardEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit Wochenblättern (Offset Helper auto) + Stundenplan24 Notes-Layout",
  preview: true,
});