import { LitElement, html, css } from "lit";

interface StundenplanRow {
  time?: string;
  cells?: string[];
  break?: boolean;
  label?: string;
}

interface StundenplanConfig {
  type: string;
  title?: string;
  days?: string[];
  rows: StundenplanRow[];
  highlight_today?: boolean;
}

class StundenplanCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

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

  setConfig(config: StundenplanConfig) {
    if (!config.rows) {
      throw new Error("rows required");
    }
    this.config = config;
  }

  render() {
    const { title, days = [], rows = [], highlight_today = true } = this.config;
    const today = new Date().getDay(); // 1 = Mo

    return html`
      <ha-card>
        ${title ? html`<div class="header">${title}</div>` : ""}
        <div class="table">
          <div class="row header-row">
            <div class="cell time">Stunde</div>
            ${days.map((d) => html`<div class="cell">${d}</div>`)}
          </div>

          ${rows.map((row) =>
            row.break
              ? html`
                  <div class="row break-row">
                    <div class="cell time">${row.time ?? ""}</div>
                    <div class="cell break" colspan="${days.length}">
                      ${row.label ?? ""}
                    </div>
                  </div>
                `
              : html`
                  <div class="row">
                    <div class="cell time">${row.time}</div>
                    ${row.cells?.map(
                      (c, i) => html`
                        <div
                          class="cell ${highlight_today && today === i + 1
                            ? "today"
                            : ""}"
                        >
                          ${c}
                        </div>
                      `
                    )}
                  </div>
                `
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    .header {
      font-weight: 700;
      padding: 12px;
      font-size: 16px;
    }
    .table {
      display: flex;
      flex-direction: column;
    }
    .row {
      display: grid;
      grid-template-columns: 140px repeat(auto-fit, minmax(60px, 1fr));
    }
    .cell {
      padding: 10px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .time {
      font-weight: 600;
      background: rgba(255, 255, 255, 0.05);
    }
    .header-row .cell {
      font-weight: 700;
      background: rgba(255, 255, 255, 0.08);
    }
    .break-row .cell {
      background: rgba(255, 255, 255, 0.03);
      font-style: italic;
    }
    .today {
      background: rgba(56, 189, 248, 0.25);
    }
  `;
}

customElements.define("stundenplan-card", StundenplanCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
});
