import { LitElement, html, css, nothing, TemplateResult } from "lit";

type LessonRow = {
  time: string;
  cells: string[];
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

export class StundenplanCard extends LitElement {
  private config?: Required<Pick<StundenplanConfig, "type" | "title" | "days" | "highlight_today" | "rows">>;

  static getStubConfig(): Required<StundenplanConfig> {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: true,
      rows: [
        { time: "1. 08:00–08:45", cells: ["D", "M", "E", "D", "S"] },
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

  // optional: hilft HA beim Platzieren
  public getCardSize(): number {
    const rows = this.config?.rows?.length ?? 3;
    return Math.max(3, rows);
  }

  // FIX B: Sections/Grid → default full width
  public getLayoutOptions(): { grid_columns: number; grid_rows: string } {
    return { grid_columns: 12, grid_rows: "auto" };
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
      const cells = Array.from({ length: days.length }, (_, i) => (cellsIn[i] ?? "").toString());
      return {
        time: (r?.time ?? "").toString(),
        cells,
      };
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

    return html`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map(
                  (d, i) => html`<th class=${this.config.highlight_today && i === todayIdx ? "today" : ""}>${d}</th>`
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

                const cells = (r as LessonRow).cells ?? [];
                return html`
                  <tr>
                    <td class="time">${(r as LessonRow).time}</td>
                    ${this.config!.days.map((_, i) => {
                      const val = cells[i] ?? "";
                      return html`<td class=${this.config!.highlight_today && i === todayIdx ? "today" : ""}>${val}</td>`;
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
    /* FIX A: immer volle Breite – unabhängig vom UI-Toggle */
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

    .today {
      background: rgba(0, 150, 255, 0.2);
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
}

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
    const days = Array.isArray(cfg.days) ? cfg.days.map((d) => (d ?? "").toString()) : [];
    const rowsIn = Array.isArray(cfg.rows) ? cfg.rows : [];

    const rows: Row[] = rowsIn.map((r: any) => {
      if (isBreakRow(r)) {
        return { break: true, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() };
      }
      const cellsIn = Array.isArray(r?.cells) ? r.cells : [];
      const cells = Array.from({ length: days.length }, (_, i) => (cellsIn[i] ?? "").toString());
      return { time: (r?.time ?? "").toString(), cells };
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

  private toggleBreak(idx: number, isBreak: boolean) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => {
      if (i !== idx) return r;
      if (isBreak) return { break: true, time: (r as any).time ?? "", label: (r as any).label ?? "Pause" };
      return { time: (r as any).time ?? "", cells: Array.from({ length: this._config!.days.length }, () => "") };
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
      { time: "", cells: Array.from({ length: this._config.days.length }, () => "") },
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
          <input type="text" .value=${this._config.title ?? ""} @input=${(e: any) => this.emit({ ...this._config!, title: e.target.value })} />
        </div>

        <div class="row">
          <label>Tage (Komma getrennt)</label>
          <input type="text" .value=${(this._config.days ?? []).join(", ")} @input=${(e: any) => this.setDaysFromString(e.target.value)} />
          <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>

        <div class="row">
          <label>Optionen</label>
          <div class="checkboxLine">
            <input type="checkbox" .checked=${this._config.highlight_today ?? true} @change=${(e: any) => this.emit({ ...this._config!, highlight_today: e.target.checked })} />
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

      ${this._config.rows.map((r, idx) => html`
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

            <div style="margin-top: 20px; text-align:right;">
              <button class="danger" @click=${() => this.removeRow(idx)}>Löschen</button>
            </div>
          </div>

          ${isBreakRow(r)
            ? html`
                <div class="row">
                  <label>Pausentext</label>
                  <input type="text" .value=${r.label ?? "Pause"} placeholder="z. B. Pause" @input=${(e: any) => this.updateBreakLabel(idx, e.target.value)} />
                </div>
              `
            : html`
                <div class="cellsGrid">
                  ${(this._config!.days ?? []).map((d, i) => html`
                    <div>
                      <div class="cellLabel">${d}</div>
                      <input type="text" .value=${((r as LessonRow).cells?.[i] ?? "").toString()} placeholder="Fach" @input=${(e: any) => this.updateRowCell(idx, i, e.target.value)} />
                    </div>
                  `)}
                </div>
              `}
        </div>
      `)}
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
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    }
    .cellLabel {
      opacity: 0.7;
      font-size: 12px;
      margin-bottom: 4px;
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
