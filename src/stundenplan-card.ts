import { LitElement, html, css, TemplateResult } from "lit";

/**
 * Variante C: Individuelle Farbe pro Zelle
 *
 * Neu:
 * - Jede Zeile kann optional "cell_styles" haben (Array je Tag/Zelle)
 * - Jede Zelle kann bg/color/border bekommen
 *
 * YAML-Beispiel:
 * type: custom:stundenplan-card
 * title: Stundenplan - Klasse 2c
 * days: [Mo, Di, Mi, Do, Fr]
 * rows:
 *   - time: "1. 07:45–08:30"
 *     cells: ["D","Sp","M","D","Reli"]
 *     cell_styles:
 *       - { bg: "rgba(33,150,243,0.25)" }         # Mo Zelle
 *       - { bg: "rgba(76,175,80,0.25)" }          # Di Zelle
 *       - { bg: "rgba(255,193,7,0.25)", color: "#111" }
 *       - null
 *       - { bg: "rgba(156,39,176,0.25)" }
 */

type CellStyle = {
  bg?: string;     // background
  color?: string;  // text color
  border?: string; // optional border override
};

type LessonRow = {
  time: string;
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
  rows?: Row[];
};

function isBreakRow(r: any): r is BreakRow {
  return !!r && r.break === true;
}

function normalizeCellStyle(s: any): CellStyle | null {
  if (!s || typeof s !== "object") return null;
  const out: CellStyle = {};
  if (typeof s.bg === "string" && s.bg.trim()) out.bg = s.bg.trim();
  if (typeof s.color === "string" && s.color.trim()) out.color = s.color.trim();
  if (typeof s.border === "string" && s.border.trim()) out.border = s.border.trim();
  return Object.keys(out).length ? out : null;
}

function styleToString(style: CellStyle | null, fallbackBorder: string): string {
  if (!style) return `border:${fallbackBorder};`;
  const parts: string[] = [];
  if (style.bg) parts.push(`background:${style.bg}`);
  if (style.color) parts.push(`color:${style.color}`);
  parts.push(`border:${style.border ?? fallbackBorder}`);
  return parts.join(";") + ";";
}

export class StundenplanCard extends LitElement {
  // Sections view sizing (Home Assistant)
  public getGridOptions() {
    return { columns: "full" };
  }

  private config?: Required<Pick<StundenplanConfig, "type" | "title" | "days" | "highlight_today" | "rows">>;

  static getStubConfig(): Required<StundenplanConfig> {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: true,
      rows: [
        {
          time: "1. 08:00–08:45",
          cells: ["D", "M", "E", "D", "S"],
          cell_styles: [
            { bg: "rgba(33,150,243,0.18)" },
            { bg: "rgba(255,193,7,0.18)", color: "#111" },
            null,
            null,
            { bg: "rgba(156,39,176,0.18)" },
          ],
        },
        { time: "2. 08:50–09:35", cells: ["M", "M", "D", "E", "S"] },
        { break: true, time: "09:35–09:55", label: "Pause" },
      ],
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("stundenplan-card-editor");
  }

  // IMPORTANT: defensiv, damit Picker/Preview stabil bleibt
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

  private normalizeConfig(cfg: StundenplanConfig) {
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
      const cells = Array.from({ length: days.length }, (_, i) =>
        (cellsIn[i] ?? "").toString()
      );

      const stylesIn = Array.isArray(r?.cell_styles) ? r.cell_styles : [];
      const cell_styles = Array.from({ length: days.length }, (_, i) =>
        normalizeCellStyle(stylesIn[i])
      );

      const out: LessonRow = {
        time: (r?.time ?? "").toString(),
        cells,
      };
      // nur setzen, wenn mindestens eine Style-Zelle existiert
      if (cell_styles.some((x) => !!x)) out.cell_styles = cell_styles;
      return out;
    });

    return {
      type: (cfg.type ?? "custom:stundenplan-card").toString(),
      title: (cfg.title ?? "Mein Stundenplan").toString(),
      days,
      highlight_today: cfg.highlight_today ?? true,
      rows,
    };
  }

  private getTodayIndex(): number {
    // JS getDay(): 0=So,1=Mo,...,5=Fr,6=Sa
    const map: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const d = new Date().getDay();
    return map[d] ?? -1;
  }

  protected render(): TemplateResult {
    if (!this.config) return html``;

    const todayIdx = this.getTodayIndex();
    const borderDefault = "1px solid var(--divider-color)";

    return html`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map(
                  (d, i) =>
                    html`<th class=${this.config.highlight_today && i === todayIdx ? "today" : ""}>${d}</th>`
                )}
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

                return html`
                  <tr>
                    <td class="time">${row.time}</td>
                    ${this.config!.days.map((_, i) => {
                      const val = cells[i] ?? "";

                      // Variante C: individueller Stil pro Zelle
                      const cellStyle = styles[i] ?? null;
                      const inlineStyle = styleToString(cellStyle, borderDefault);

                      // optional zusätzlich "Heute"-Spalte leicht markieren (ohne deine Farben zu überschreiben)
                      const cls = this.config!.highlight_today && i === todayIdx ? "today" : "";

                      return html`<td class=${cls} style=${inlineStyle}>${val}</td>`;
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

    /* "Heute" – bewusst nur leicht, damit Zellfarben (Variante C) nicht kaputt gehen */
    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px rgba(0, 150, 255, 0.12);
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
}

/* ----------------- Editor (Variante C) ----------------- */

export class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  public hass: any;
  private _config?: Required<Pick<StundenplanConfig, "type" | "title" | "days" | "highlight_today" | "rows">>;

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

  private normalizeConfig(cfg: StundenplanConfig) {
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

      const out: LessonRow = { time: (r?.time ?? "").toString(), cells };
      if (cell_styles.some((x) => !!x)) out.cell_styles = cell_styles;
      return out;
    });

    return {
      type: (cfg.type ?? "custom:stundenplan-card").toString(),
      title: (cfg.title ?? "Mein Stundenplan").toString(),
      days,
      highlight_today: cfg.highlight_today ?? true,
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
    this.emit(this.normalizeConfig({ ...this._config, days }));
  }

  private updateRowTime(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => (i === idx ? { ...r, time: value } : r));
    this.emit({ ...this._config, rows });
  }

  private updateRowCell(rowIdx: number, cellIdx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => {
      if (i !== rowIdx || isBreakRow(r)) return r;
      const cells = Array.isArray((r as LessonRow).cells) ? [...(r as LessonRow).cells] : [];
      cells[cellIdx] = value;
      return { ...(r as LessonRow), cells };
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

      const current = styles[cellIdx] ?? {};
      const next: CellStyle = {
        ...current,
        ...patch,
      };

      // leere styles -> null
      const normalized = normalizeCellStyle(next);

      styles[cellIdx] = normalized;
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
        cells: Array.from({ length: this._config!.days.length }, () => ""),
        cell_styles: Array.from({ length: this._config!.days.length }, () => null),
      };
    });
    this.emit({ ...this._config, rows });
  }

  private updateBreakLabel(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => (i === idx ? { ...r, label: value } : r));
    this.emit({ ...this._config, rows });
  }

  private addLessonRow() {
    if (!this._config) return;
    const rows = [
      ...this._config.rows,
      {
        time: "",
        cells: Array.from({ length: this._config.days.length }, () => ""),
        cell_styles: Array.from({ length: this._config.days.length }, () => null),
      },
    ];
    this.emit({ ...this._config, rows });
  }

  private addBreakRow() {
    if (!this._config) return;
    const rows = [...this._config.rows, { break: true, time: "", label: "Pause" }];
    this.emit({ ...this._config, rows });
  }

  private removeRow(idx: number) {
    if (!this._config) return;
    const rows = this._config.rows.filter((_, i) => i !== idx);
    this.emit({ ...this._config, rows });
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    return html`
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
                <input
                  type="checkbox"
                  .checked=${isBreakRow(r)}
                  @change=${(e: any) => this.toggleBreak(idx, e.target.checked)}
                />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this.removeRow(idx)}>Löschen</button>
              </div>
            </div>

            ${isBreakRow(r)
              ? html`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${r.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(e: any) => this.updateBreakLabel(idx, e.target.value)}
                    />
                  </div>
                `
              : html`
                  <div class="cellsGrid">
                    ${(this._config!.days ?? []).map((d, i) => {
                      const row = r as LessonRow;
                      const val = (row.cells?.[i] ?? "").toString();
                      const st = (row.cell_styles?.[i] ?? null) as CellStyle | null;

                      return html`
                        <div class="cellBox">
                          <div class="cellLabel">${d}</div>

                          <input
                            type="text"
                            class="cellInput"
                            .value=${val}
                            placeholder="Fach"
                            @input=${(e: any) => this.updateRowCell(idx, i, e.target.value)}
                          />

                          <div class="styleGrid">
                            <input
                              type="text"
                              class="styleInput"
                              .value=${st?.bg ?? ""}
                              placeholder='bg (z.B. rgba(...))'
                              @input=${(e: any) => this.updateCellStyle(idx, i, { bg: e.target.value })}
                            />
                            <input
                              type="text"
                              class="styleInput"
                              .value=${st?.color ?? ""}
                              placeholder='text (z.B. #fff)'
                              @input=${(e: any) => this.updateCellStyle(idx, i, { color: e.target.value })}
                            />
                          </div>

                          <div class="preview" style=${styleToString(st, "1px solid var(--divider-color)")}>
                            Vorschau
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
    }
    .checkboxLine {
      display: flex;
      align-items: center;
      gap: 10px;
      user-select: none;
      margin-top: 6px;
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

    .cellsGrid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
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
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }

    .styleInput {
      padding: 8px !important;
      border-radius: 10px !important;
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

// Register (wichtig für HA)
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", StundenplanCard);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", StundenplanCardEditor);

// Picker-Metadaten
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card", // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});
