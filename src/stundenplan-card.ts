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

  setConfig(config: StundenplanConfig) {
    if (!config || !config.rows || !config.days) {
      throw new Error("Invalid configuration");
    }
    this.config = config;
  }

  private getTodayIndex() {
    const map: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const day = new Date().getDay(); // 0=So
    return map[day] ?? -1;
  }

  static styles = css`
    .card { padding: 12px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 6px; text-align: center; border: 1px solid var(--divider-color); }
    th { background: var(--secondary-background-color); }
    .time { font-weight: bold; white-space: nowrap; }
    .today { background: rgba(0, 150, 255, 0.2); }
    .break { font-style: italic; opacity: 0.7; }
  `;

  render() {
    if (!this.config) return html``;

    const todayIndex = this.getTodayIndex();

    return html`
      <ha-card header="${this.config.title ?? ""}">
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map(
                  (d, i) => html`
                    <th class="${this.config.highlight_today && i === todayIndex ? "today" : ""}">
                      ${d}
                    </th>
                  `
                )}
              </tr>
            </thead>
            <tbody>
              ${this.config.rows.map((row) => {
                if (row.break) {
                  return html`
                    <tr class="break">
                      <td class="time">${row.time}</td>
                      <td colspan="${this.config.days.length}">${row.label ?? ""}</td>
                    </tr>
                  `;
                }
                return html`
                  <tr>
                    <td class="time">${row.time}</td>
                    ${(row.cells ?? []).map(
                      (cell, i) => html`
                        <td class="${this.config.highlight_today && i === todayIndex ? "today" : ""}">
                          ${cell}
                        </td>
                      `
                    )}
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
  hass: any;
  _config!: StundenplanConfig;

  setConfig(config: StundenplanConfig) {
    this._config = JSON.parse(JSON.stringify(config));
  }

  private _emit() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .row { margin-bottom: 12px; }
    input { width: 100%; box-sizing: border-box; padding: 8px; }
    label { display: block; margin-bottom: 6px; opacity: 0.8; }
  `;

  render() {
    if (!this._config) return html``;

    return html`
      <div class="row">
        <label>Titel</label>
        <input
          type="text"
          .value="${this._config.title ?? ""}"
          @input="${(e: any) => {
            this._config.title = e.target.value;
            this._emit();
          }}"
        />
      </div>

      <div class="row">
        <label>Tage (Komma getrennt)</label>
        <input
          type="text"
          .value="${(this._config.days ?? []).join(", ")}"
          @input="${(e: any) => {
            this._config.days = e.target.value
              .split(",")
              .map((d: string) => d.trim())
              .filter((d: string) => d.length);
            this._emit();
          }}"
        />
      </div>

      <div class="row">
        <label>
          <input
            type="checkbox"
            .checked="${this._config.highlight_today ?? true}"
            @change="${(e: any) => {
              this._config.highlight_today = e.target.checked;
              this._emit();
            }}"
          />
          Heute hervorheben
        </label>
      </div>
    `;
  }
}

// Register custom elements
customElements.define("stundenplan-card", StundenplanCard);
customElements.define("stundenplan-card-editor", StundenplanCardEditor);

// Show in card picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});
