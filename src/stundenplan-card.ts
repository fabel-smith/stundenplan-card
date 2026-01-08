type StundenplanRow =
  | {
      time: string; // e.g. "1. 07:45–08:30"
      cells: string[]; // e.g. ["D","Sp","M","D","Reli"]
    }
  | {
      break: true;
      time?: string; // e.g. "09:20–09:40"
      label: string; // e.g. "gr. P"
    };

interface StundenplanCardConfig {
  type: string; // "custom:stundenplan-card"
  title?: string;
  days?: string[]; // ["Mo","Di","Mi","Do","Fr"]
  rows: StundenplanRow[];

  highlight_today?: boolean; // default true
  today_color?: string; // rgba
  cell_bg?: string; // rgba
  border_color?: string; // rgba
  header_bg?: string; // rgba
  radius?: number; // px
  font_size?: number; // px
  time_col_width?: number; // px
}

const DEFAULT_DAYS = ["Mo", "Di", "Mi", "Do", "Fr"];

class StundenplanCard extends HTMLElement {
  private _config!: StundenplanCardConfig;
  private _hass: any;

  set hass(hass: any) {
    this._hass = hass;
    this._render();
  }

  setConfig(config: StundenplanCardConfig) {
    if (!config || config.type !== "custom:stundenplan-card") {
      throw new Error("Invalid config: type must be custom:stundenplan-card");
    }
    if (!config.rows || !Array.isArray(config.rows) || config.rows.length === 0) {
      throw new Error("Invalid config: rows[] is required");
    }
    this._config = {
      highlight_today: true,
      today_color: "rgba(56,189,248,0.22)",
      cell_bg: "rgba(255,255,255,0.04)",
      border_color: "rgba(255,255,255,0.22)",
      header_bg: "rgba(255,255,255,0.10)",
      radius: 14,
      font_size: 14,
      time_col_width: 160,
      ...config,
    };
    this._render();
  }

  getCardSize() {
    return 4;
  }

  private _getTodayIndex(): number {
    // JS: 0=So,1=Mo,...,6=Sa. We map to 0..days-1 for Mo..Fr default.
    const d = new Date().getDay();
    // If days starts with "Mo" then Mo=1 -> index 0
    const days = this._config.days ?? DEFAULT_DAYS;

    const map: Record<number, string> = {
      1: "Mo",
      2: "Di",
      3: "Mi",
      4: "Do",
      5: "Fr",
      6: "Sa",
      0: "So",
    };

    const todayLabel = map[d];
    return days.indexOf(todayLabel);
  }

  private _escape(s: string): string {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  private _render() {
    if (!this._config) return;

    const days = this._config.days ?? DEFAULT_DAYS;
    const todayIdx = this._config.highlight_today ? this._getTodayIndex() : -1;

    const radius = this._config.radius ?? 14;
    const fontSize = this._config.font_size ?? 14;
    const timeW = this._config.time_col_width ?? 160;

    const border = this._config.border_color ?? "rgba(255,255,255,0.22)";
    const todayColor = this._config.today_color ?? "rgba(56,189,248,0.22)";
    const cellBg = this._config.cell_bg ?? "rgba(255,255,255,0.04)";
    const headerBg = this._config.header_bg ?? "rgba(255,255,255,0.10)";

    const titleHtml = this._config.title
      ? `<div class="title">${this._escape(this._config.title)}</div>`
      : "";

    const headerCells = days
      .map((d, i) => {
        const isToday = i === todayIdx;
        const bg = isToday ? todayColor : cellBg;
        const leftBorder = i === 0 ? `border-left: 3px solid ${border};` : `border-left: 1px solid ${border};`;
        return `<div class="cell head" style="background:${bg}; ${leftBorder}">${this._escape(d)}</div>`;
      })
      .join("");

    const rowsHtml = this._config.rows
      .map((row) => {
        if ((row as any).break) {
          const r = row as Extract<StundenplanRow, { break: true }>;
          // Break row: time cell + a single spanning cell
          const label = this._escape(r.label);
          const time = r.time ? this._escape(r.time) : "";
          return `
            <div class="row break">
              <div class="time break">${time}</div>
              <div class="breakcell" style="grid-column: 2 / span ${days.length};">
                <span class="breaklabel">${label}</span>
              </div>
            </div>
          `;
        }

        const r = row as Extract<StundenplanRow, { time: string; cells: string[] }>;
        const time = this._escape(r.time);

        const cells = days.map((_, i) => {
          const isToday = i === todayIdx;
          const bg = isToday ? todayColor : cellBg;
          const leftBorder = i === 0 ? `border-left: 3px solid ${border};` : `border-left: 1px solid ${border};`;
          const value = this._escape(r.cells?.[i] ?? "");
          return `<div class="cell" style="background:${bg}; ${leftBorder}">${value}</div>`;
        }).join("");

        return `
          <div class="row">
            <div class="time">${time}</div>
            ${cells}
          </div>
        `;
      })
      .join("");

    this.innerHTML = `
      <ha-card class="card">
        ${titleHtml}
        <div class="grid" style="--timeW:${timeW}px; --radius:${radius}px; --font:${fontSize}px; --border:${border}; --headerBg:${headerBg};">
          <div class="row header">
            <div class="time head" style="background:var(--headerBg);">Stunde</div>
            ${headerCells}
          </div>
          ${rowsHtml}
        </div>
      </ha-card>

      <style>
        .card {
          border-radius: var(--radius);
          overflow: hidden;
        }
        .title {
          padding: 12px 14px;
          font-weight: 800;
          font-size: 16px;
        }
        .grid {
          display: grid;
          grid-auto-rows: minmax(44px, auto);
          font-size: var(--font);
          border: 1px solid rgba(255,255,255,0.12);
          border-bottom: 3px solid rgba(255,255,255,0.22);
          border-radius: var(--radius) var(--radius) 0 0;
          overflow: hidden;
          background: rgba(255,255,255,0.10);
        }
        .row {
          display: grid;
          grid-template-columns: var(--timeW) repeat(${days.length}, 1fr);
          align-items: stretch;
        }
        .time, .cell {
          padding: 12px 12px;
          text-align: center;
          font-weight: 800;
        }
        .time {
          background: rgba(255,255,255,0.02);
        }
        .time.head {
          font-weight: 900;
        }
        .cell {
          background: rgba(255,255,255,0.04);
        }
        .row.header .cell.head {
          font-weight: 900;
        }
        .row.break {
          border-top: 2px dashed rgba(255,255,255,0.18);
          border-bottom: 2px dashed rgba(255,255,255,0.18);
        }
        .time.break {
          font-weight: 900;
          opacity: 0.95;
        }
        .breakcell {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 12px;
          background: rgba(255,255,255,0.02);
          border-left: 3px solid var(--border);
        }
        .breaklabel {
          font-weight: 900;
        }
      </style>
    `;
  }
}

customElements.define("stundenplan-card", StundenplanCard);
