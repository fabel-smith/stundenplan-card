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

/* =========================
   CARD
========================= */
class StundenplanCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

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
    if (!config.rows) throw new Error("rows required");
    this.config = config;
  }

  render() {
    const { title, days = [], rows = [], highlight_today = true } = this.config;
    const today = new Date().getDay();

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

/* =========================
   VISUAL EDITOR
========================= */
class StundenplanCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: {},
  };

  hass: any;
  _config!: StundenplanConfig;

  setConfig(config: StundenplanConfig) {
    this._config = { ...config };
  }

  private _valueChanged(ev: any) {
    if (!this._config) return;
    const target = ev.target;
    const key = target.configValue;

    const value = target.type === "checkbox" ? target.checked : target.value;
    this._config = { ...this._config, [key]: value };

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
      })
    );
  }

  render() {
    if (!this.hass) return html``;

    return html`
      <div style="padding:16px;">
        <ha-textfield
          label="Titel"
          .value=${this._config.title || ""}
          .configValue=${"title"}
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          label="Tage (kommagetrennt, z.B. Mo,Di,Mi,Do,Fr)"
          .value=${(this._config.days || []).join(",")}
          .configValue=${"days"}
          @input=${(e: any) => {
            const val = e.target.value.split(",").map((v: string) => v.trim());
            this._config = { ...this._config, days: val };
            this.dispatchEvent(
              new CustomEvent("config-changed", {
                detail: { config: this._config },
              })
            );
          }}
        ></ha-textfield>

        <ha-formfield label="Heute hervorheben">
          <ha-switch
            .checked=${this._config.highlight_today ?? true}
            .configValue=${"highlight_today"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <p style="margin-top:16px; opacity:0.7;">
          Zeilen (rows) bearbeitest du aktuell noch im YAML – UI-Editor für
          Zeilen kommt in v0.2.0 😉
        </p>
      </div>
    `;
  }
}

customElements.define("stundenplan-card-editor", StundenplanCardEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: true,
});

/* Verbindung Card ↔ Editor */
(window as any).customElements.whenDefined("stundenplan-card").then(() => {
  (window as any).customCards = (window as any).customCards || [];
});
