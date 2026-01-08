import { LitElement, html, css } from "lit";

interface StundenplanRow {
  time: string;
  cells?: string[];
  break?: boolean;
  label?: string;
}

interface StundenplanConfig {
  type: string;
  title?: string;
  days: string[];
  highlight_today?: boolean;
  highlight_current?: boolean; // NEU
  rows: StundenplanRow[];
}

/* =========================
   CARD
========================= */
class StundenplanCard extends LitElement {
  hass: any;
  config!: StundenplanConfig;

  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: true,
      highlight_current: true, // NEU
      rows: [
        { time: "1. 08:00–08:45", cells: ["D", "M", "E", "D", "S"] },
        { time: "2. 08:50–09:35", cells: ["M", "M", "D", "E", "S"] },
        { break: true, time: "09:35–09:55", label: "Pause" },
      ],
    };
  }

  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }

  // defensiv (wichtig für Picker/Preview)
  setConfig(config: Partial<StundenplanConfig>) {
    const stub = (this.constructor as any).getStubConfig() as StundenplanConfig;

    const t = (config?.type ?? stub.type ?? "").toString();
    const typeOk = t === "custom:stundenplan-card" || t === "stundenplan-card";

    if (!typeOk) {
      this.config = stub;
      return;
    }

    const merged: StundenplanConfig = {
      ...stub,
      ...config,
      type: t,
      title: (config?.title ?? stub.title) as string,
      highlight_today: config?.highlight_today ?? stub.highlight_today,
      highlight_current: config?.highlight_current ?? stub.highlight_current,
      days: Array.isArray(config?.days) ? (config!.days as string[]) : stub.days,
      rows: Array.isArray(config?.rows) ? (config!.rows as StundenplanRow[]) : stub.rows,
    };

    this.config = merged;
  }

  getCardSize() {
    return 3;
  }

  private getTodayIndex() {
    const map: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const day = new Date().getDay(); // 0=So
    return map[day] ?? -1;
  }

  // NEU: ermittelt welche Zeile gerade aktiv ist (anhand Zeitbereich HH:MM–HH:MM in row.time)
  private getCurrentRowIndex(): number {
    if (!this.config?.rows?.length) return -1;

    const now = new Date();
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < this.config.rows.length; i++) {
      const row = this.config.rows[i];
      if (row.break) continue;

      // sucht zwei Zeiten in der Zeile, z.B. "08:00–08:45" oder "08:00-08:45"
      const match = row.time?.match(/(\d{1,2}:\d{2})\D+(\d{1,2}:\d{2})/);
      if (!match) continue;

      const start = match[1];
      const end = match[2];

      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);

      if (!Number.isFinite(sh) || !Number.isFinite(sm) || !Number.isFinite(eh) || !Number.isFinite(em)) {
        continue;
      }

      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;

      if (minutesNow >= startMin && minutesNow <= endMin) {
        return i;
      }
    }

    return -1;
  }

  static styles = css`
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
    }
    .time {
      font-weight: bold;
      white-space: nowrap;
    }
    .today {
      background: rgba(0, 150, 255, 0.2);
    }
    .current {
      background: rgba(255, 200, 0, 0.35) !important;
      font-weight: 600;
    }
    .break {
      font-style: italic;
      opacity: 0.7;
    }
  `;

  render() {
    if (!this.config) return html``;

    const todayIndex = this.getTodayIndex();
    const currentRowIndex = this.config.highlight_current ? this.getCurrentRowIndex() : -1;

    return html`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map(
                  (d, i) => html`
                    <th class=${this.config.highlight_today && i === todayIndex ? "today" : ""}>
                      ${d}
                    </th>
                  `
                )}
              </tr>
            </thead>
            <tbody>
              ${this.config.rows.map((row, rowIndex) => {
                if (row.break) {
                  return html`
                    <tr class="break">
                      <td class="time">${row.time}</td>
                      <td colspan=${this.config.days.length}>${row.label ?? ""}</td>
                    </tr>
                  `;
                }

                const cells = row.cells ?? [];
                return html`
                  <tr>
                    <td class="time">${row.time}</td>
                    ${this.config.days.map((_, i) => {
                      const cell = cells[i] ?? "";
                      const classes = [
                        this.config.highlight_today && i === todayIndex ? "today" : "",
                        // NEU: aktuelles Fach (heutiger Tag + aktuelle Zeile)
                        rowIndex === currentRowIndex && i === todayIndex ? "current" : "",
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return html`<td class=${classes}>${cell}</td>`;
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
}

/* =========================
   VISUAL EDITOR
========================= */
class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: { state: true },
  };

  hass: any;
  _config?: StundenplanConfig;

  setConfig(config: StundenplanConfig) {
    const t = (config?.type ?? "").toString();
    if (t !== "custom:stundenplan-card" && t !== "stundenplan-card") {
      throw new Error(`Unsupported editor type: ${t}`);
    }

    const cloned = this._clone(config);
    this._config = this._normalizeConfig(cloned);
  }

  private _clone<T>(obj: T): T {
    try {
      // @ts-ignore
      return structuredClone(obj);
    } catch {
      return JSON.parse(JSON.stringify(obj));
    }
  }

  private _normalizeConfig(cfg: StundenplanConfig): StundenplanConfig {
    const days = Array.isArray(cfg.days) ? cfg.days : [];
    const rows = Array.isArray(cfg.rows) ? cfg.rows : [];

    const normalizedRows = rows.map((r) => {
      if (r.break) {
        return {
          break: true,
          time: r.time ?? "",
          label: r.label ?? "Pause",
        } as StundenplanRow;
      }
      const cells = Array.isArray(r.cells) ? r.cells : [];
      const fixedCells = Array.from({ length: days.length }, (_, i) => cells[i] ?? "");
      return {
        time: r.time ?? "",
        cells: fixedCells,
      } as StundenplanRow;
    });

    return {
      type: cfg.type,
      title: cfg.title ?? "Mein Stundenplan",
      days,
      highlight_today: cfg.highlight_today ?? true,
      highlight_current: cfg.highlight_current ?? true,
      rows: normalizedRows,
    };
  }

  private _emit(cfg: StundenplanConfig) {
    this._config = cfg;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: cfg },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _setDaysFromString(value: string) {
    if (!this._config) return;

    const days = value
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d.length);

    const cfg: StundenplanConfig = { ...this._config, days };
    this._emit(this._normalizeConfig(cfg));
  }

  private _updateRowTime(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => (i === idx ? { ...r, time: value } : r));
    this._emit({ ...this._config, rows });
  }

  private _updateRowCell(idx: number, dayIdx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) => {
      if (i !== idx) return r;
      if (r.break) return r;
      const cells = Array.isArray(r.cells) ? [...r.cells] : [];
      cells[dayIdx] = value;
      return { ...r, cells };
    });
    this._emit({ ...this._config, rows });
  }

  private _toggleBreak(idx: number, isBreak: boolean) {
    if (!this._config) return;

    const rows = this._config.rows.map((r, i) => {
      if (i !== idx) return r;

      if (isBreak) {
        return { break: true, time: r.time ?? "", label: r.label ?? "Pause" } as StundenplanRow;
      }

      const cells = Array.from({ length: this._config!.days.length }, () => "");
      return { time: r.time ?? "", cells } as StundenplanRow;
    });

    this._emit({ ...this._config, rows });
  }

  private _updateBreakLabel(idx: number, value: string) {
    if (!this._config) return;
    const rows = this._config.rows.map((r, i) =>
      i === idx ? ({ ...r, label: value } as StundenplanRow) : r
    );
    this._emit({ ...this._config, rows });
  }

  private _addLessonRow() {
    if (!this._config) return;
    const cells = Array.from({ length: this._config.days.length }, () => "");
    const rows = [...this._config.rows, { time: "", cells }];
    this._emit({ ...this._config, rows });
  }

  private _addBreakRow() {
    if (!this._config) return;
    const rows = [...this._config.rows, { break: true, time: "", label: "Pause" }];
    this._emit({ ...this._config, rows });
  }

  private _removeRow(idx: number) {
    if (!this._config) return;
    const rows = this._config.rows.filter((_, i) => i !== idx);
    this._emit({ ...this._config, rows });
  }

  static styles = css`
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

  render() {
    if (!this._config) return html``;

    return html`
      <div class="section">
        <div class="row">
          <label>Titel</label>
          <input
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(e: Event) => {
              const value = (e.target as HTMLInputElement).value;
              this._emit({ ...this._config!, title: value });
            }}
          />
        </div>

        <div class="row">
          <label>Tage (Komma getrennt)</label>
          <input
            type="text"
            .value=${(this._config.days ?? []).join(", ")}
            @input=${(e: Event) => {
              const value = (e.target as HTMLInputElement).value;
              this._setDaysFromString(value);
            }}
          />
          <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>

        <div class="row">
          <label>Optionen</label>
          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_today ?? true}
              @change=${(e: Event) => {
                const checked = (e.target as HTMLInputElement).checked;
                this._emit({ ...this._config!, highlight_today: checked });
              }}
            />
            <span>Heute hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current ?? true}
              @change=${(e: Event) => {
                const checked = (e.target as HTMLInputElement).checked;
                this._emit({ ...this._config!, highlight_current: checked });
              }}
            />
            <span>Aktuelles Fach hervorheben</span>
          </div>
        </div>
      </div>

      <div class="rowsHeader">
        <h3>Stundenplan (Zeilen)</h3>
        <div class="btnBar">
          <button @click=${() => this._addLessonRow()}>+ Stunde</button>
          <button @click=${() => this._addBreakRow()}>+ Pause</button>
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
                  .value=${r.time ?? ""}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(e: Event) =>
                    this._updateRowTime(idx, (e.target as HTMLInputElement).value)}
                />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input
                  type="checkbox"
                  .checked=${!!r.break}
                  @change=${(e: Event) =>
                    this._toggleBreak(idx, (e.target as HTMLInputElement).checked)}
                />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this._removeRow(idx)}>Löschen</button>
              </div>
            </div>

            ${r.break
              ? html`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${r.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(e: Event) =>
                        this._updateBreakLabel(idx, (e.target as HTMLInputElement).value)}
                    />
                  </div>
                `
              : html`
                  <div class="cellsGrid">
                    ${this._config!.days.map(
                      (day, dayIdx) => html`
                        <div>
                          <div class="cellLabel">${day}</div>
                          <input
                            type="text"
                            .value=${r.cells?.[dayIdx] ?? ""}
                            placeholder="Fach"
                            @input=${(e: Event) =>
                              this._updateRowCell(
                                idx,
                                dayIdx,
                                (e.target as HTMLInputElement).value
                              )}
                          />
                        </div>
                      `
                    )}
                  </div>
                `}
          </div>
        `
      )}
    `;
  }
}

/* =========================
   REGISTER
========================= */
if (!customElements.get("stundenplan-card")) {
  customElements.define("stundenplan-card", StundenplanCard);
}
if (!customElements.get("stundenplan-card-editor")) {
  customElements.define("stundenplan-card-editor", StundenplanCardEditor);
}

/* =========================
   CARD PICKER REGISTRATION
========================= */
const w = window as any;
w.customCards = w.customCards || [];
w.customCards.push({
  type: "stundenplan-card", // Picker: ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});
