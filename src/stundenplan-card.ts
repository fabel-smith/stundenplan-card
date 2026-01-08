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
    // tolerant gegenüber type-Varianten
    const t = (config?.type ?? "").toString();
    if (t !== "custom:stundenplan-card" && t !== "stundenplan-card") {
      throw new Error(`Unsupported card type: ${t}`);
    }
    if (!config || !Array.isArray(config.days) || !Array.isArray(config.rows)) {
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
    .break {
      font-style: italic;
      opacity: 0.7;
    }
  `;

  render() {
    if (!this.config) return html``;

    const todayIndex = this.getTodayIndex();

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
              ${this.config.rows.map((row) => {
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
                      return html`
                        <td class=${this.config.highlight_today && i === todayIndex ? "today" : ""}>
                          ${cell}
                        </td>
                      `;
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
    // Clone, damit wir nicht das Original mutieren
    // structuredClone ist modern; fallback via JSON ist ok
    try {
      // @ts-ignore
      this._config = structuredClone(config);
    } catch {
      this._config = JSON.parse(JSON.stringify(config));
    }
  }

  private _emit(config: StundenplanConfig) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .row {
      margin-bottom: 12px;
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
    label {
      display: block;
      margin-bottom: 6px;
      opacity: 0.85;
      font-size: 13px;
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      user-select: none;
      margin-top: 6px;
    }
    .hint {
      opacity: 0.7;
      font-size: 12px;
      margin-top: 4px;
    }
  `;

  render() {
    if (!this._config) return html``;

    return html`
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
            const days = value
              .split(",")
              .map((d) => d.trim())
              .filter((d) => d.length);
            this._emit({ ...this._config!, days });
          }}
        />
        <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
      </div>

      <div class="row">
        <label>Optionen</label>
        <div class="checkbox">
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
      </div>
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
  type: "custom:stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});
