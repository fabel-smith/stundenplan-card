const p = ["Mo", "Di", "Mi", "Do", "Fr"];
class k extends HTMLElement {
  set hass(e) {
    this._hass = e, this._render();
  }
  setConfig(e) {
    if (!e || e.type !== "custom:stundenplan-card")
      throw new Error("Invalid config: type must be custom:stundenplan-card");
    if (!e.rows || !Array.isArray(e.rows) || e.rows.length === 0)
      throw new Error("Invalid config: rows[] is required");
    this._config = {
      highlight_today: !0,
      today_color: "rgba(56,189,248,0.22)",
      cell_bg: "rgba(255,255,255,0.04)",
      border_color: "rgba(255,255,255,0.22)",
      header_bg: "rgba(255,255,255,0.10)",
      radius: 14,
      font_size: 14,
      time_col_width: 160,
      ...e
    }, this._render();
  }
  getCardSize() {
    return 4;
  }
  _getTodayIndex() {
    const e = (/* @__PURE__ */ new Date()).getDay(), o = this._config.days ?? p, d = {
      1: "Mo",
      2: "Di",
      3: "Mi",
      4: "Do",
      5: "Fr",
      6: "Sa",
      0: "So"
    }[e];
    return o.indexOf(d);
  }
  _escape(e) {
    return String(e).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  _render() {
    if (!this._config) return;
    const e = this._config.days ?? p, o = this._config.highlight_today ? this._getTodayIndex() : -1, l = this._config.radius ?? 14, d = this._config.font_size ?? 14, _ = this._config.time_col_width ?? 160, r = this._config.border_color ?? "rgba(255,255,255,0.22)", c = this._config.today_color ?? "rgba(56,189,248,0.22)", g = this._config.cell_bg ?? "rgba(255,255,255,0.04)", f = this._config.header_bg ?? "rgba(255,255,255,0.10)", m = this._config.title ? `<div class="title">${this._escape(this._config.title)}</div>` : "", u = e.map((s, i) => {
      const n = i === o ? c : g, t = i === 0 ? `border-left: 3px solid ${r};` : `border-left: 1px solid ${r};`;
      return `<div class="cell head" style="background:${n}; ${t}">${this._escape(s)}</div>`;
    }).join(""), v = this._config.rows.map((s) => {
      if (s.break) {
        const t = s, a = this._escape(t.label);
        return `
            <div class="row break">
              <div class="time break">${t.time ? this._escape(t.time) : ""}</div>
              <div class="breakcell" style="grid-column: 2 / span ${e.length};">
                <span class="breaklabel">${a}</span>
              </div>
            </div>
          `;
      }
      const i = s, h = this._escape(i.time), n = e.map((t, a) => {
        var b;
        const x = a === o ? c : g, w = a === 0 ? `border-left: 3px solid ${r};` : `border-left: 1px solid ${r};`, $ = this._escape(((b = i.cells) == null ? void 0 : b[a]) ?? "");
        return `<div class="cell" style="background:${x}; ${w}">${$}</div>`;
      }).join("");
      return `
          <div class="row">
            <div class="time">${h}</div>
            ${n}
          </div>
        `;
    }).join("");
    this.innerHTML = `
      <ha-card class="card">
        ${m}
        <div class="grid" style="--timeW:${_}px; --radius:${l}px; --font:${d}px; --border:${r}; --headerBg:${f};">
          <div class="row header">
            <div class="time head" style="background:var(--headerBg);">Stunde</div>
            ${u}
          </div>
          ${v}
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
          grid-template-columns: var(--timeW) repeat(${e.length}, 1fr);
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
customElements.define("stundenplan-card", k);
//# sourceMappingURL=stundenplan-card.js.map
