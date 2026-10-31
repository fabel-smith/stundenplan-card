/*!
MIT License

Copyright (c) 2026 Fabian Schmidt (fabel-smith)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Lit (reactive-element, lit-html and lit-element)

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function k(t) {
  return !(t instanceof Date) || !Number.isFinite(t.getTime()) ? "" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function te(t) {
  if (typeof t != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(t)) return !1;
  const [e, i, n] = t.split("-").map(Number);
  return e >= 1900 && k(new Date(e, i - 1, n, 12)) === t;
}
function Yt(t) {
  if (typeof t == "string")
    try {
      t = JSON.parse(t);
    } catch {
      return null;
    }
  return Array.isArray(t) ? t : null;
}
const Ct = (t) => String(t ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("de"), ft = (t) => typeof t == "string" && t.trim() && !/[\r\n]/.test(t), Gt = (t) => typeof t == "string" && !/[;{}]/.test(t) ? t.trim() : "", X = (t) => Array.isArray(t) ? t : typeof t == "string" ? t.split(/[,;\n]/).map((e) => e.trim()).filter(Boolean) : [], de = (t) => {
  const e = Ct(t), i = e.match(/^(\d+)\.\s*\d{1,2}:\d{2}(?::\d{2})?\s*[-\u2013\u2014]\s*\d{1,2}:\d{2}(?::\d{2})?$/);
  return i ? i[1] : e.replace(/\.$/, "");
}, ue = (t) => (t?.action ?? "note") === "note" && t?.match === "period";
function yi(t, e = k(/* @__PURE__ */ new Date())) {
  const i = [...new Set(X(t?.dates ?? t?.date).filter(te))].sort(), n = (o) => o.split("-").reverse().join("."), s = i.find((o) => o >= e), r = X(t?.periods).map(de), a = i.length ? i.length === 1 ? n(i[0]) : `${i.length} Termine · ${s ? `nächster: ${n(s)} · ` : ""}letzter: ${n(i.at(-1))}` : "Datum noch auswählen";
  return {
    title: typeof t?.text == "string" && t.text.trim() || "Neuer Termin",
    detail: `${a}${r.length ? ` · ${r.join(", ")}${r.length === 1 ? ". Stunde" : ". Stunden"}` : ""}${t?.enabled === !1 ? " · inaktiv" : ""}`
  };
}
function Xi(t, e, i = k(/* @__PURE__ */ new Date())) {
  const n = /* @__PURE__ */ new Map();
  for (const s of t.filter(ue)) for (const r of s.dates) {
    if (r < i) continue;
    const a = s.periods.filter((l) => !e.has(`${r}/${l}`));
    if (!a.length) continue;
    const o = { date: r, periods: a, text: s.text, color: s.color, background: s.background };
    n.set(JSON.stringify(o), o);
  }
  return [...n.values()].sort((s, r) => s.date.localeCompare(r.date) || s.periods[0].localeCompare(r.periods[0], "de", { numeric: !0 }));
}
function nt(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return "Eintrag muss ein Objekt sein.";
  if (t.enabled === !1) return "";
  const e = X(t.dates ?? t.date);
  return !e.length || !e.every(te) ? "Bitte gültige Termine als JJJJ-MM-TT angeben." : t.match != null && !["period", "subject"].includes(t.match) ? "Unbekannte Terminzuordnung." : !ue(t) && !ft(t.subject) ? "Bitte das Fach für die Zuordnung angeben (eine Zeile)." : ["note", "replace"].includes(t.action ?? "note") ? ft(t.text) ? t.periods != null && !Array.isArray(t.periods) && typeof t.periods != "string" ? "Stunden bitte als Liste angeben." : X(t.periods).every((i) => (typeof i == "string" || typeof i == "number") && ft(String(i))) ? ue(t) && !X(t.periods).length ? "Bitte mindestens eine Unterrichtsstunde angeben, z. B. 1 oder 2." : "" : "Ungültige Stundenbezeichnung." : "Bitte einen Hinweis oder neuen Fachnamen angeben (eine Zeile)." : "Unbekannte Aktion.";
}
function $t(t, e) {
  const i = Yt(t.dated_entries) ?? [], n = [];
  let s = [];
  if (t.dated_entries_entity) {
    const o = e?.states?.[t.dated_entries_entity];
    if (!o || ["unavailable", "unknown"].includes(o.state))
      n.push("Terminquelle nicht verfügbar; externe Termine werden nicht angewendet.");
    else {
      const l = Yt(o.attributes?.[t.dated_entries_attribute || "entries"]);
      l ? s = l : n.push("Terminquelle enthält keine gültige Liste im gewählten Attribut.");
    }
  }
  let r = 0;
  const a = [...i, ...s].flatMap((o) => nt(o) ? (r++, []) : o.enabled === !1 ? [] : [{
    dates: X(o.dates ?? o.date),
    subject: Ct(o.subject),
    periods: [...new Set(X(o.periods).map(de))],
    match: ue(o) ? "period" : "subject",
    action: o.action ?? "note",
    text: o.text.trim(),
    color: Gt(o.color),
    background: Gt(o.background)
  }]);
  return r && n.push(`${r} unvollständige oder ungültige Termine werden nicht angewendet.`), { entries: a, warnings: n };
}
function Qt(t, e = k(/* @__PURE__ */ new Date())) {
  if (!te(e) || nt({ ...t, enabled: !0 })) return !1;
  const i = X(t?.dates ?? t?.date);
  return i.length > 0 && i.every((n) => n < e);
}
function xt(t, e, i, n, s) {
  const r = { text: String(t ?? ""), notes: [] }, a = k(n);
  if (!a || e?.break || !s.length) return r;
  const o = de(e?.cell_times?.[i]?.time || e?.time), l = /* @__PURE__ */ new Map(), d = (h) => l.set(JSON.stringify(h), h), g = (h) => ({
    text: h.text,
    ...h.color ? { color: h.color } : {},
    ...h.background ? { background: h.background } : {}
  });
  for (const h of s) ue(h) && h.dates.includes(a) && h.periods.includes(o) && d(g(h));
  return r.text = r.text.split(/\r?\n\s*\r?\n/).map((h) => {
    const u = h.split(/\r?\n/), p = Ct(u[0]);
    if (!p || /^[-\u2013\u2014]+$/.test(p)) return h;
    const m = s.filter((w) => !ue(w) && w.dates.includes(a) && w.subject === p && (!w.periods.length || w.periods.includes(o)));
    if (!m.length) return h;
    const A = /entfällt|fällt\s+aus|ausfall|abgesagt|cancel(?:led|ed)|vertretung|ersatz|verlegt|\bstatt\b|geändert/i.test(h), x = [...new Set(m.filter((w) => w.action === "replace").map((w) => w.text))];
    !A && x.length === 1 && (u[0] = x[0]), !A && x.length > 1 && d({ text: "Widersprüchliche Fachwechsel: Original bleibt." });
    for (const w of m) w.action === "note" && d({
      text: w.text,
      ...w.color ? { color: w.color } : {},
      ...w.background ? { background: w.background } : {}
    });
    return u.join(`
`);
  }).join(`

`), r.notes = [...l.values()], r;
}
function en(t) {
  const e = t.split(",").map((i) => i.trim());
  return e.every((i) => /^[1-9][0-9]?$/.test(i) || /^[\p{L}][\p{L}\p{M}\p{N} _./&()+-]{0,63}$/u.test(i)) ? [...new Set(e.map(de))].sort((i, n) => i.localeCompare(n, "de", { numeric: !0 })) : null;
}
function tn(t = /* @__PURE__ */ new Date()) {
  const e = new Date(t.getFullYear(), t.getMonth(), t.getDate()), i = new Date(e);
  return i.setDate(i.getDate() + 60), { start: e.toISOString(), end: i.toISOString(), first: k(e), last: k(i) };
}
function nn(t, e) {
  if (!Array.isArray(t)) throw new Error("Invalid calendar response");
  const i = /* @__PURE__ */ new Map();
  let n = 0;
  for (const s of t) {
    const r = s?.start?.date, a = s?.end?.date, o = typeof s?.summary == "string" ? s.summary.trim() : "", l = /^([^\r\n]+?)[ \t]*\[([^\[\]\r\n]+)\]$/.exec(o), d = l ? en(l[2]) : null;
    if (!te(r) || !te(a) || s.start.dateTime || s.end.dateTime || Date.parse(a) - Date.parse(r) !== 864e5 || !l || !d || !l[1].trim()) {
      n++;
      continue;
    }
    if (r < e.first || r >= e.last) continue;
    const g = {
      date: r,
      match: "period",
      action: "note",
      text: l[1].trim(),
      periods: d
    };
    i.set(JSON.stringify(g), g);
  }
  return { entries: [...i.values()].sort((s, r) => s.date.localeCompare(r.date)), ignored: n };
}
class wi {
  constructor(e, i = {}) {
    this.changed = e, this.parse = i.parse ?? nn, this.messages = i.messages ?? {
      unavailable: "Kalender nicht verfügbar; Kalendertermine werden nicht angezeigt.",
      failed: "Kalender konnte nicht geladen werden. Erneuter Versuch in einer Minute; manuelle Termine bleiben erhalten.",
      ignored: (n) => `${n} Kalendertermine ohne unterstützte Tages-/Stundenangabe übersprungen.`
    }, this.entries = [], this.warnings = [], this.generation = 0, this.key = "", this.next = 0;
  }
  reset() {
    this.generation++, this.key = "", this.pending = !1, this.unavailable = !1, this.next = 0, this.entries = [], this.warnings = [];
  }
  async update(e, i, n = /* @__PURE__ */ new Date(), s = tn(n)) {
    const r = i ? `${i}|${s.first}|${s.last}` : "";
    if (r !== this.key && (this.reset(), this.key = r, this.changed()), !i || !e) return;
    const a = e.states?.[i];
    if (!(/^calendar\.[a-z0-9_]+$/.test(i) && a && !["unknown", "unavailable"].includes(a.state) && e.connected !== !1)) {
      this.unavailable || (this.reset(), this.key = r, this.unavailable = !0, this.warnings = [this.messages.unavailable], this.changed());
      return;
    }
    if (this.unavailable && (this.unavailable = !1, this.next = 0), typeof e.callApi != "function" || this.pending || n.getTime() < this.next) return;
    const l = this.generation;
    this.pending = !0;
    let d;
    try {
      const g = new URLSearchParams({ start: s.start, end: s.end }), h = await Promise.race([
        e.callApi("GET", `calendars/${encodeURIComponent(i)}?${g}`),
        new Promise((p, m) => {
          d = setTimeout(() => m(new Error("Calendar timeout")), 2e4);
        })
      ]);
      if (l !== this.generation) return;
      const u = this.parse(h, s);
      this.entries = u.entries, this.warnings = u.ignored ? [this.messages.ignored(u.ignored)] : [], this.next = n.getTime() + 5 * 6e4;
    } catch {
      if (l !== this.generation) return;
      this.entries = [], this.warnings = [this.messages.failed], this.next = n.getTime() + 6e4;
    } finally {
      clearTimeout(d), l === this.generation && (this.pending = !1, this.changed());
    }
  }
}
const vi = [
  "Ferien",
  "Schulferien",
  "Herbstferien",
  "Winterferien",
  "Weihnachtsferien",
  "Osterferien",
  "Pfingstferien",
  "Sommerferien",
  "Faschingsferien",
  "Fastnachtsferien",
  "Frühjahrsferien",
  "Beweglicher Ferientag",
  "Bewegliche Ferientage"
], Ke = (t) => t.trim().replace(/\s+/g, " ").toLocaleLowerCase("de");
function Fe(t) {
  const e = Array.isArray(t) ? t : typeof t == "string" ? t.split(`
`) : [];
  return [...new Set(e.filter((i) => typeof i == "string" && i.trim() && i.length <= 200 && !/[\r\n]/.test(i.trim())).map(Ke))].sort();
}
function sn(t, e = /* @__PURE__ */ new Date()) {
  const i = t.map(k).filter(Boolean).sort(), n = i[0] || k(e), s = i.at(-1) || n, r = /* @__PURE__ */ new Date(`${n}T00:00:00`), a = /* @__PURE__ */ new Date(`${s}T00:00:00`);
  return a.setDate(a.getDate() + 1), { start: r.toISOString(), end: a.toISOString(), first: n, last: k(a) };
}
function rn(t, e, i = []) {
  if (!Array.isArray(t)) throw new Error("Invalid holiday calendar response");
  const n = /* @__PURE__ */ new Set([...vi.map(Ke), ...Fe(i)]), s = /* @__PURE__ */ new Map();
  let r = 0;
  for (const a of t) {
    const o = typeof a?.summary == "string" ? a.summary.trim() : "";
    if (!n.has(Ke(o))) continue;
    const l = a?.start?.date, d = a?.end?.date;
    if (!te(l) || !te(d) || l >= d || a.start.dateTime || a.end.dateTime) {
      r++;
      continue;
    }
    if (l >= e.last || d <= e.first) continue;
    const g = { title: o, start: l, end: d };
    s.set(`${Ke(o)}|${l}|${d}`, g);
  }
  return { entries: [...s.values()].sort((a, o) => a.start.localeCompare(o.start) || a.title.localeCompare(o.title)), ignored: r };
}
function an(t, e) {
  const i = k(e);
  return i ? t.filter((n) => n.start <= i && i < n.end) : [];
}
function on(t) {
  const e = /* @__PURE__ */ new Date(`${t.end}T12:00:00`);
  e.setDate(e.getDate() - 1);
  const i = (s) => s.split("-").reverse().join("."), n = k(e);
  return t.start === n ? i(n) : `${i(t.start)} – ${i(n)}`;
}
class ln extends wi {
  constructor(e) {
    super(e, {
      messages: {
        unavailable: "Ferienkalender nicht verfügbar; Ferien können nicht geprüft werden.",
        failed: "Ferienkalender konnte nicht geladen werden. Erneuter Versuch in einer Minute.",
        ignored: (i) => `${i} Ferieneinträge ohne gültigen ganztägigen Zeitraum übersprungen.`
      }
    }), this.titlesKey = "";
  }
  async update(e, i, n, s = [], r = /* @__PURE__ */ new Date()) {
    const a = Fe(s), o = JSON.stringify(a);
    return o !== this.titlesKey && (this.reset(), this.titlesKey = o), this.parse = (l, d) => rn(l, d, a), super.update(e, i, r, sn(n, r));
  }
}
function Ve(t) {
  return String(t ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("de");
}
function Xt(t) {
  const e = typeof t == "string" ? t.trim() : "";
  return e && !/[;{}<>]/.test(e) && !/url\s*\(/i.test(e) && globalThis.CSS?.supports("color", e) ? e : "";
}
function $i(t) {
  return Array.isArray(t) ? t.filter((e) => e && typeof e == "object").map((e) => ({
    subject: typeof e.subject == "string" ? e.subject.trim() : "",
    background: Xt(e.background),
    color: Xt(e.color)
  })) : [];
}
function cn(t, e) {
  const i = String(t ?? "").trim().split(/\r?\n/, 1)[0], n = i.replace(/(?:\s*[❌🔁🚪📝⚠✗↔]\uFE0F?)+$/u, "").trim();
  return e?.find((r) => r.subject && Ve(r.subject) === Ve(i)) ?? e?.find((r) => r.subject && Ve(r.subject) === Ve(n)) ?? null;
}
function ei(t, e) {
  const i = cn(t, e);
  return (i?.background ? `background:${i.background};` : "") + (i?.color ? `color:${i.color};` : "");
}
const xi = /(?<![\d:])((?:[01]?\d|2[0-3]):[0-5]\d)(?::[0-5]\d)?\s*[-\u2013\u2014]\s*((?:[01]?\d|2[0-3]):[0-5]\d)(?::[0-5]\d)?(?![\d:])/, ti = (t) => String(t ?? "").trim().replace(/^((?:[01]?\d|2[0-3]):[0-5]\d):[0-5]\d$/, "$1");
function dn(t) {
  const e = String(t ?? "").match(xi);
  return e ? { start: e[1], end: e[2] } : {};
}
function ii(t, e, i) {
  const n = String(t ?? "").trim(), s = n.match(xi);
  if (s) {
    const r = (n.slice(0, s.index) + n.slice(s.index + s[0].length)).trim(), a = `${s[1]}–${s[2]}`;
    return r ? { label: r, range: a } : { label: /\d:\d{2}:\d{2}/.test(s[0]) ? a : n, range: "" };
  }
  return { label: n, range: e && i ? `${ti(e)}–${ti(i)}` : "" };
}
function un(t, e, i) {
  const n = e?.source_type;
  if (n !== "entity" && n !== "sensor") return null;
  let s = n === "entity" ? e.source_entity_integration || e.source_entity : e.source_entity_legacy || e.source_entity;
  e.week_mode && e.week_mode !== "off" && (s = (i === "A" ? e.source_entity_a : i === "B" ? e.source_entity_b : null) || s);
  const r = t?.states?.[String(s ?? "").trim()];
  if (!r || ["unavailable", "unknown"].includes(r.state)) return null;
  const a = r.attributes, o = a?.meta;
  if (a?.provider !== "schulmanager" || o?.source_interface !== "get_schedule") return null;
  if (!Array.isArray(o.excluded_courses)) return { courses: null };
  const l = /* @__PURE__ */ new Set();
  return { courses: o.excluded_courses.flatMap((d) => !d || typeof d.id != "string" || !d.id.trim() || l.has(d.id) ? [] : (l.add(d.id), [{ id: d.id, label: typeof d.label == "string" && d.label.trim() ? d.label.trim() : `Kurs ${d.id}` }])) };
}
function _t(t) {
  const e = new Date(t);
  return e.setDate(e.getDate() - ((e.getDay() || 7) - 1)), k(e);
}
function hn(t, e = /* @__PURE__ */ new Date()) {
  const i = e.getDay() || 7;
  return t === "saturday" && i >= 6 || t === "sunday" && i === 7 ? 1 : 0;
}
function bt(t) {
  return JSON.stringify([!!t.break, t.time ?? "", t.start ?? "", t.end ?? ""]);
}
class pn {
  constructor(e) {
    this.changed = e, this.reset();
  }
  reset() {
    this.generation = (this.generation ?? 0) + 1, this.key = "", this.pending = !1, this.next = 0, this.data = null, this.error = "";
  }
  async update(e, i, n, s = /* @__PURE__ */ new Date()) {
    const r = e?.states?.[i], a = [...new Set(n.filter(Boolean).map(k))].sort(), o = `${i}|${a.join(",")}|${r?.last_updated ?? ""}`;
    if (o !== this.key && (this.reset(), this.key = o, this.changed()), !r || ["unknown", "unavailable"].includes(r.state) || e.connected === !1) {
      (this.data || this.pending) && (this.reset(), this.key = o, this.changed());
      return;
    }
    if (!a.length || this.pending || s.getTime() < this.next) return;
    const l = this.generation;
    this.pending = !0;
    let d;
    try {
      const g = await Promise.race([
        e.callWS({
          type: "call_service",
          domain: "stundenplan24_week",
          service: "get_view",
          service_data: { entity_id: i, dates: a },
          return_response: !0
        }),
        new Promise((u, p) => {
          d = setTimeout(() => p(new Error("Timeout")), 15e3);
        })
      ]);
      if (l !== this.generation) return;
      const h = g?.response;
      if (!h || !h.weeks || typeof h.weeks != "object" || Array.isArray(h.weeks) || !Array.isArray(h.loaded_days) || JSON.stringify(h.requested_days) !== JSON.stringify(a) || Object.values(h.weeks).some((u) => !Array.isArray(u))) throw new Error("Invalid view");
      this.data = h, this.error = "", this.next = s.getTime() + 6e4;
    } catch {
      if (l !== this.generation) return;
      this.data = null, this.error = "Stundenplan für diese Ansicht konnte nicht geladen werden.", this.next = s.getTime() + 6e4;
    } finally {
      clearTimeout(d), l === this.generation && (this.pending = !1, this.changed());
    }
  }
}
const Ie = globalThis, Et = Ie.ShadowRoot && (Ie.ShadyCSS === void 0 || Ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = /* @__PURE__ */ Symbol(), ni = /* @__PURE__ */ new WeakMap();
let ki = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Et && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ni.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ni.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gn = (t) => new ki(typeof t == "string" ? t : t + "", void 0, Tt), Si = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, s, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new ki(i, t, Tt);
}, mn = (t, e) => {
  if (Et) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), s = Ie.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, si = Et ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return gn(i);
})(t) : t, { is: fn, defineProperty: _n, getOwnPropertyDescriptor: bn, getOwnPropertyNames: yn, getOwnPropertySymbols: wn, getPrototypeOf: vn } = Object, ee = globalThis, ri = ee.trustedTypes, $n = ri ? ri.emptyScript : "", xn = ee.reactiveElementPolyfillSupport, Me = (t, e) => t, st = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? $n : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Mt = (t, e) => !fn(t, e), ai = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), ee.litPropertyMetadata ?? (ee.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ge = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ai) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && _n(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: s } = bn(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ai;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Me("elementProperties"))) return;
    const t = vn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Me("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Me("properties"))) {
      const e = this.properties, i = [...yn(e), ...wn(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(si(n));
    } else t !== void 0 && e.push(si(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return mn(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : st).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : st;
      this._$Em = n;
      const a = r.fromAttribute(e, s.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (s = this[t]), i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? Mt)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: s }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: r } = s, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, s, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ge.elementStyles = [], ge.shadowRootOptions = { mode: "open" }, ge[Me("elementProperties")] = /* @__PURE__ */ new Map(), ge[Me("finalized")] = /* @__PURE__ */ new Map(), xn?.({ ReactiveElement: ge }), (ee.reactiveElementVersions ?? (ee.reactiveElementVersions = [])).push("2.1.2");
const ze = globalThis, oi = (t) => t, rt = ze.trustedTypes, li = rt ? rt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ai = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, Di = "?" + Q, kn = `<${Di}>`, he = document, Re = () => he.createComment(""), Ne = (t) => t === null || typeof t != "object" && typeof t != "function", zt = Array.isArray, Sn = (t) => zt(t) || typeof t?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, De = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ci = /-->/g, di = />/g, ae = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ui = /'/g, hi = /"/g, Ci = /^(?:script|style|textarea|title)$/i, An = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = An(1), be = /* @__PURE__ */ Symbol.for("lit-noChange"), b = /* @__PURE__ */ Symbol.for("lit-nothing"), pi = /* @__PURE__ */ new WeakMap(), oe = he.createTreeWalker(he, 129);
function Ei(t, e) {
  if (!zt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return li !== void 0 ? li.createHTML(e) : e;
}
const Dn = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = De;
  for (let o = 0; o < i; o++) {
    const l = t[o];
    let d, g, h = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, g = a.exec(l), g !== null); ) u = a.lastIndex, a === De ? g[1] === "!--" ? a = ci : g[1] !== void 0 ? a = di : g[2] !== void 0 ? (Ci.test(g[2]) && (s = RegExp("</" + g[2], "g")), a = ae) : g[3] !== void 0 && (a = ae) : a === ae ? g[0] === ">" ? (a = s ?? De, h = -1) : g[1] === void 0 ? h = -2 : (h = a.lastIndex - g[2].length, d = g[1], a = g[3] === void 0 ? ae : g[3] === '"' ? hi : ui) : a === hi || a === ui ? a = ae : a === ci || a === di ? a = De : (a = ae, s = void 0);
    const p = a === ae && t[o + 1].startsWith("/>") ? " " : "";
    r += a === De ? l + kn : h >= 0 ? (n.push(d), l.slice(0, h) + Ai + l.slice(h) + Q + p) : l + Q + (h === -2 ? o : p);
  }
  return [Ei(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Pe {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, l = this.parts, [d, g] = Dn(e, i);
    if (this.el = Pe.createElement(d, n), oe.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = oe.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ai)) {
          const u = g[a++], p = s.getAttribute(h).split(Q), m = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: m[2], strings: p, ctor: m[1] === "." ? En : m[1] === "?" ? Tn : m[1] === "@" ? Mn : at }), s.removeAttribute(h);
        } else h.startsWith(Q) && (l.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Ci.test(s.tagName)) {
          const h = s.textContent.split(Q), u = h.length - 1;
          if (u > 0) {
            s.textContent = rt ? rt.emptyScript : "";
            for (let p = 0; p < u; p++) s.append(h[p], Re()), oe.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[u], Re());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Di) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(Q, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += Q.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = he.createElement("template");
    return n.innerHTML = e, n;
  }
}
function ye(t, e, i = t, n) {
  if (e === be) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = Ne(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (e = ye(t, s._$AS(t, e.values), s, n)), e;
}
class Cn {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? he).importNode(i, !0);
    oe.currentNode = s;
    let r = oe.nextNode(), a = 0, o = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Be(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new zn(r, this, e)), this._$AV.push(d), l = n[++o];
      }
      a !== l?.index && (r = oe.nextNode(), a++);
    }
    return oe.currentNode = he, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Be {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = ye(this, e, i), Ne(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== be && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Sn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && Ne(this._$AH) ? this._$AA.nextSibling.data = e : this.T(he.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Pe.createElement(Ei(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new Cn(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = pi.get(e.strings);
    return i === void 0 && pi.set(e.strings, i = new Pe(e)), i;
  }
  k(e) {
    zt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new Be(this.O(Re()), this.O(Re()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = oi(e).nextSibling;
      oi(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class at {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = ye(this, e, i, 0), a = !Ne(e) || e !== this._$AH && e !== be, a && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = ye(this, o[n + l], i, l), d === be && (d = this._$AH[l]), a || (a = !Ne(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class En extends at {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Tn extends at {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class Mn extends at {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ye(this, e, i, 0) ?? b) === be) return;
    const n = this._$AH, s = e === b && n !== b || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== b && (n === b || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class zn {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
}
const jn = ze.litHtmlPolyfillSupport;
jn?.(Pe, Be), (ze.litHtmlVersions ?? (ze.litHtmlVersions = [])).push("3.3.2");
const Fn = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new Be(e.insertBefore(Re(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
}, je = globalThis;
class fe extends ge {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return be;
  }
}
fe._$litElement$ = !0, fe.finalized = !0, je.litElementHydrateSupport?.({ LitElement: fe });
const Rn = je.litElementPolyfillSupport;
Rn?.({ LitElement: fe });
(je.litElementVersions ?? (je.litElementVersions = [])).push("4.2.2");
const Nn = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: Mt }, Pn = (t = Nn, e, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), n === "accessor") {
    const { name: a } = i;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, t, o), o;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Ti(t) {
  return (e, i) => typeof i == "object" ? Pn(t, e, i) : ((n, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
function ie(t) {
  return Ti({ ...t, state: !0, attribute: !1 });
}
var Bn = Object.defineProperty, On = Object.getOwnPropertyDescriptor, Mi = (t) => {
  throw TypeError(t);
}, V = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? On(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (n ? a(e, i, s) : a(s)) || s);
  return n && s && Bn(e, i, s), s;
}, zi = (t, e, i) => e.has(t) || Mi("Cannot " + i), J = (t, e, i) => (zi(t, e, "read from private field"), i ? i.call(t) : e.get(t)), q = (t, e, i) => e.has(t) ? Mi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), Z = (t, e, i, n) => (zi(t, e, "write to private field"), e.set(t, i), i), Je, qe, Ze, Ye, Ge, Qe, Xe, et;
function E(t) {
  return !!t && t.break === !0;
}
function ot(t) {
  return Math.min(1, Math.max(0, t));
}
function jt(t) {
  if (!t) return null;
  const e = t.replace("#", "").trim();
  if (e.length !== 6) return null;
  const i = parseInt(e.slice(0, 2), 16), n = parseInt(e.slice(2, 4), 16), s = parseInt(e.slice(4, 6), 16);
  return [i, n, s].some((r) => Number.isNaN(r)) ? null : { r: i, g: n, b: s };
}
function Ft(t) {
  if (!t || typeof t != "object") return null;
  const e = {};
  return typeof t.bg == "string" && t.bg.trim() && (e.bg = t.bg.trim()), typeof t.color == "string" && t.color.trim() && (e.color = t.color.trim()), typeof t.border == "string" && t.border.trim() && (e.border = t.border.trim()), typeof t.bg_alpha == "number" && !Number.isNaN(t.bg_alpha) && (e.bg_alpha = ot(t.bg_alpha)), Object.keys(e).length ? e : null;
}
function gi(t, e) {
  return (Array.isArray(t) ? t : []).map((i) => {
    if (E(i))
      return { break: !0, time: (i.time ?? "").toString(), label: (i.label ?? "Pause").toString() };
    const n = Array.isArray(i?.cells) ? i.cells : [], s = Array.from({ length: e.length }, (p, m) => (n[m] ?? "").toString()), r = Array.isArray(i?.cell_styles) ? i.cell_styles : [], a = Array.from({ length: e.length }, (p, m) => Ft(r[m])), o = Array.isArray(i?.cell_times) ? Array.from({ length: e.length }, (p, m) => Fi(i.cell_times[m])) : [], l = (i?.time ?? "").toString(), d = _e(l), g = (i?.start ?? "").toString().trim(), h = (i?.end ?? "").toString().trim(), u = {
      time: l,
      start: g || d.start || void 0,
      end: h || d.end || void 0,
      cells: s
    };
    return u.subject_changes = Ni(i?.subject_changes), a.some((p) => !!p) && (u.cell_styles = a), o.some((p) => !!p) && (u.cell_times = o), u;
  });
}
function ji(t) {
  if (!t?.bg) return null;
  const e = t.bg.trim();
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  const i = jt(e);
  if (!i) return e;
  const n = typeof t.bg_alpha == "number" ? ot(t.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${n})`;
}
function wt(t, e = "#2196f3", i = 1) {
  const n = String(t ?? "").trim();
  if (n.toLowerCase() === "transparent") return { hex: e, alpha: 0 };
  const s = n.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (s) {
    const a = s[1].length === 3 ? [...s[1]].map((o) => o + o).join("") : s[1];
    return { hex: "#" + a.slice(0, 6), alpha: a.length === 8 ? parseInt(a.slice(6), 16) / 255 : i };
  }
  const r = n.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  return r ? {
    hex: "#" + r.slice(1, 4).map((a) => Math.min(255, Number(a)).toString(16).padStart(2, "0")).join(""),
    alpha: r[4] == null ? 1 : ot(Number(r[4]))
  } : { hex: e, alpha: i };
}
function Wn(t, e) {
  const i = [], n = ji(t);
  return n && i.push(`background:${n}`), t?.color && i.push(`color:${t.color}`), i.push(`border:${t?.border ?? e}`), i.join(";") + ";";
}
function mi(t, e) {
  const i = (t ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${e})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const n = jt(i);
    return n ? `rgba(${n.r}, ${n.g}, ${n.b}, ${ot(e)})` : i;
  }
  return i;
}
function _e(t) {
  return dn(t);
}
function Fi(t) {
  if (t == null) return null;
  if (typeof t == "string") {
    const r = t.trim(), a = _e(r);
    return r ? { time: r, start: a.start, end: a.end } : null;
  }
  if (typeof t != "object") return null;
  const e = (t.time ?? "").toString().trim(), i = _e(e), n = (t.start ?? "").toString().trim() || i.start, s = (t.end ?? "").toString().trim() || i.end;
  return e || n || s ? { time: e || (n && s ? `${n}-${s}` : ""), start: n || void 0, end: s || void 0 } : null;
}
function kt(t) {
  return (t ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Hn(t) {
  switch (t) {
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
function fi(t) {
  const e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())), i = e.getUTCDay() === 0 ? 7 : e.getUTCDay();
  e.setUTCDate(e.getUTCDate() + 4 - i);
  const n = e.getUTCFullYear(), s = new Date(Date.UTC(n, 0, 4)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), a = new Date(s);
  a.setUTCDate(s.getUTCDate() + (4 - r));
  const o = e.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(o / (10080 * 60 * 1e3)), isoYear: n };
}
function _i(t) {
  const e = (t ?? "").toString().trim().toUpperCase();
  return e === "A" || e === "B" ? e : null;
}
function G(t) {
  const e = (t ?? "").toString().trim();
  return !e || e === "-" || e === "–" || e === "—";
}
function le(t) {
  return t.trim().replace(/\s+/g, " ").toLocaleLowerCase("de");
}
function tt(t) {
  const e = Array.isArray(t) ? t : [], i = /* @__PURE__ */ new Map();
  for (const n of e) {
    if (typeof n != "string") continue;
    const s = n.trim().replace(/\s+/g, " ");
    s && i.set(le(s), s);
  }
  return [...i.values()];
}
function Ri(t) {
  return t.trim().split(/\r?\n/, 1)[0].trim();
}
function Ni(t) {
  const e = {};
  for (const i of ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]) {
    if (!Array.isArray(t?.[i])) continue;
    const n = t[i].filter((s) => typeof s?.current == "string" && typeof s?.original == "string" && s.current.trim() && s.original.trim()).map((s) => ({ current: s.current, original: s.original }));
    n.length && (e[i] = n);
  }
  return e;
}
function Un(t, e) {
  if (!e?.length) return t;
  const i = new Set(e.map(le));
  return t.split(/\r?\n\s*\r?\n/).filter((n) => !i.has(le(Ri(n)))).join(`

`).trim();
}
function Ln(t, e, i = (n, s, r) => n?.cells?.[r] ?? "") {
  const n = Array.isArray(t) ? t : [], s = Array.isArray(e) ? e : [];
  let r = -1;
  return n.forEach((a, o) => {
    E(a) || s.some((l, d) => !G(i(a, o, l, d))) && (r = o);
  }), r >= 0 ? n.slice(0, r + 1) : [];
}
function Ee(t) {
  const e = (t ?? "").toString().replace(/\r/g, "").split(`
`).map((n) => n.trim()), i = [];
  for (const n of e)
    if (!/^(—|–|-)$/.test(n)) {
      if (!n) {
        i.length && i[i.length - 1] !== "" && i.push("");
        continue;
      }
      i.push(n.replace(/\s+/g, " "));
    }
  for (; i[i.length - 1] === ""; ) i.pop();
  return i.join(`
`);
}
function Vn(t) {
  const e = Ft(t);
  if (!e) return "";
  const i = {};
  return e.bg && (i.bg = e.bg, i.bg_alpha = typeof e.bg_alpha == "number" ? e.bg_alpha : 0.18), e.color && (i.color = e.color), e.border && (i.border = e.border), Object.keys(i).length ? JSON.stringify(i) : "";
}
function Kn(t, e, i) {
  const n = Array.isArray(t) ? t : [];
  if (e < 0 || e >= n.length || E(n[e])) return { covered: !1, span: 1 };
  const s = (o) => {
    if (o < 0 || o >= n.length || E(n[o])) return null;
    const l = i(n[o], o) ?? {}, d = Ee(l.text);
    return G(d) ? null : JSON.stringify([d, Vn(l.style), l.notes ?? [], l.subjectChanges ?? []]);
  }, r = s(e);
  if (!r) return { covered: !1, span: 1 };
  if (s(e - 1) === r) return { covered: !0, span: 0 };
  let a = 1;
  for (; s(e + a) === r; ) a += 1;
  return { covered: !1, span: a };
}
function Pi(t) {
  const e = (t ?? "").toString().trim();
  if (!e.startsWith("sensor.")) return "";
  const i = e.slice(7), n = i.match(/^(.+)_woche$/i);
  if (n?.[1]) return `number.${n[1]}_woche_offset`;
  const s = i.match(/^stundenplan_woche_(.+)$/i);
  return s?.[1] ? `number.${s[1]}_woche_offset` : "";
}
function vt(t) {
  const e = kt(t);
  return ["mo", "montag", "mon", "monday"].includes(e) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(e) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(e) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(e) ? 4 : ["fr", "freitag", "fri", "friday"].includes(e) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(e) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(e) ? 7 : null;
}
const Rt = [
  { key: "card_background", variable: "--stundenplan-card-background", label: "Kartenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "header_background", variable: "--stundenplan-header-background", label: "Tabellenkopf & Navigation", theme: "--secondary-background-color", fallback: "#eeeeee" },
  { key: "row_background", variable: "--stundenplan-row-background", label: "Zeilenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "divider_color", variable: "--stundenplan-divider-color", label: "Trennlinien", theme: "--divider-color", fallback: "#e0e0e0" }
];
function ce(t) {
  const e = typeof t == "string" ? t.trim() : "";
  return e && !/[;{}]/.test(e) && CSS.supports("color", e) ? e : "";
}
function bi(t) {
  const e = ce(t.color), i = ce(t.background);
  return `${e ? `color:${e};` : ""}${i ? `background-color:${i};` : ""}`;
}
function St(t) {
  const e = {};
  for (const { key: i } of Rt) {
    const n = ce(t[i]);
    n && (e[i] = n);
  }
  return e;
}
const me = [
  { key: "font_size_subject", variable: "--stundenplan-font-size-subject", label: "Fächer (px)", min: 8, max: 64 },
  { key: "font_size_time", variable: "--stundenplan-font-size-time", label: "Stunden & Uhrzeiten (px)", min: 8, max: 64 },
  { key: "font_size_header", variable: "--stundenplan-font-size-header", label: "Wochentage / Tabellenkopf (px)", min: 8, max: 64 },
  { key: "font_size_details", variable: "--stundenplan-font-size-details", label: "Raum, Lehrer & Hinweise (px)", min: 8, max: 64 },
  { key: "row_height", variable: "--stundenplan-row-height", label: "Mindesthöhe der Stundenzeilen (px)", min: 24, max: 240 },
  { key: "header_table_gap", variable: "--stundenplan-header-table-gap", label: "Abstand Kopfzeile / Tabelle (px)", min: 0, max: 64 },
  { key: "font_size_title_compact", variable: "--stundenplan-font-size-title-compact", label: "Titelgröße kompakt (px)", min: 8, max: 64 }
];
function At(t) {
  const e = {};
  for (const { key: i, min: n, max: s } of me) {
    const r = t[i];
    if (typeof r != "number" && typeof r != "string" || String(r).trim() === "") continue;
    const a = Number(r);
    Number.isFinite(a) && (a > 0 || n === 0 && a === 0) && (e[i] = Math.max(n, Math.min(s, a)));
  }
  return e;
}
var Ce;
const K = (Ce = class extends fe {
  constructor() {
    super(...arguments), q(this, Je), q(this, qe), q(this, Ze, []), q(this, Ye, !1), q(this, Ge, ""), q(this, Qe, null), q(this, Xe, "idle"), q(this, et, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  syncCalendar() {
    this.syncTimetable(), this._calendar ?? (this._calendar = new wi(() => this.requestUpdate())), this.isConnected && this._calendar.update(this.hass, this.config?.calendar_entity ?? ""), this._holidays ?? (this._holidays = new ln(() => this.requestUpdate())), this.isConnected && this.config && this._holidays.update(
      this.hass,
      this.config.holiday_calendar_entity ?? "",
      this.getHolidayDates(this.config),
      this.config.holiday_extra_titles
    );
  }
  getColumnDates(t, e = null) {
    if (e?.length) return e;
    const i = this.hasTimetableView(t) || this.autoWeekend(t) ? null : this.getHeaderDaysFromEntity(t), n = i && i.length >= (t.days?.length ?? 0) ? i : null, s = this.mondayOfWeek(this.getBaseDate(t));
    return (t.days ?? []).map((r) => {
      const a = vt(r);
      if (!a) return null;
      if (n) return n.find((l) => (l.getDay() || 7) === a) ?? null;
      const o = new Date(s);
      return o.setDate(o.getDate() + a - 1), o;
    });
  }
  getHolidayDates(t) {
    const e = t.source_type ?? "manual", i = !!t.week_offset_entity && (e === "entity" || e === "sensor" && t.week_mode !== "off"), n = (this._uiViewMode ?? t.view_mode) === "rolling" && (!i || (this.getWeekOffsetValue(t) ?? 0) === 0), s = this.getColumnDates(t, n ? this.getRollingVisibleSlots(t, t.days_ahead ?? 0).map((r) => r.date) : null);
    return this._uiPopupOpen ? [...s, ...this.getColumnDates(t)] : s;
  }
  collectDatedEntries(t) {
    const e = $t({ ...t, dated_entries: [...t.dated_entries ?? [], ...this._calendar?.entries ?? []] }, this.hass);
    return e.warnings.push(...this._calendar?.warnings ?? []), e;
  }
  timetableEntity(t) {
    return ["entity", "sensor"].includes(t?.source_type) ? (t.source_type === "entity" ? t.source_entity_integration || t.source_entity : t.source_entity_legacy || t.source_entity) ?? "" : "";
  }
  hasTimetableView(t) {
    return t?.week_mode !== "off" && (t?.source_entity_a || t?.source_entity_b) ? !1 : this.hass?.states?.[this.timetableEntity(t)]?.attributes?.view_service === 1;
  }
  autoWeekend(t) {
    return (this.getWeekOffsetValue(t) ?? 0) === 0 ? hn(t.weekend_switch) : 0;
  }
  syncTimetable() {
    if (!this.config || !this.isConnected) return;
    if (!this.hasTimetableView(this.config)) {
      this._timetable && (this._timetable.reset(), this._timetable = null);
      return;
    }
    this._timetable ?? (this._timetable = new pn(() => {
      this.recomputeRows(), this.requestUpdate();
    }));
    let t = this.getHolidayDates(this.config);
    if ((this._uiViewMode ?? this.config.view_mode) === "rolling" && !(this.getWeekOffsetValue(this.config) ?? 0)) {
      const e = this.mondayOfWeek(/* @__PURE__ */ new Date());
      t = Array.from({ length: 21 }, (i, n) => {
        const s = new Date(e);
        return s.setDate(s.getDate() + n), s;
      });
    }
    this._timetable.update(this.hass, this.timetableEntity(this.config), t);
  }
  timetableRows(t) {
    const e = this._timetable?.data, i = /* @__PURE__ */ new Map(), n = new Set(this.getHolidayDates(t).filter(Boolean).map(_t));
    for (const [s, r] of Object.entries(e?.weeks ?? {}))
      if (n.has(s))
        for (const a of this.buildRowsFromArray(t, r) ?? []) i.set(bt(a), a);
    return [...i.values()].sort((s, r) => (s.start ?? s.time).localeCompare(r.start ?? r.time));
  }
  viewWarning(t, e) {
    if (this.hasTimetableView(t)) {
      if (!this._timetable?.data) return this._timetable?.error || "Stundenplandaten für diese Ansicht werden geladen.";
      if (e.some((i) => i && !this._timetable.data.loaded_days.includes(k(i))))
        return "Für einen Teil dieser Ansicht liegen noch keine aktuellen Stundenplandaten vor.";
    } else if (this.timetableEntity(t)) {
      const i = this.getHeaderDaysFromEntity(t);
      if (i && e.some((n) => n && !i.some((s) => k(s) === k(n))))
        return "Die Datenquelle liefert diese Tage noch nicht. Bitte die Datenwoche auswählen oder die Suite aktualisieren.";
    }
    return "";
  }
  get hass() {
    return J(this, Je);
  }
  set hass(t) {
    Z(this, Je, t);
    try {
      const e = this.config;
      if ((e?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (e?.view_mode ?? "week").toString(), d = Number(e?.days_ahead), g = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0;
          if (l === "rolling" && g === 0 && !this.hasTimetableView(e)) {
            const h = ((e?.week_offset_entity ?? "") + "").toString().trim();
            if (h && t?.states?.[h]) {
              const u = Number(t.states[h].state);
              Number.isFinite(u) && u !== 0 && (t.callService("number", "set_value", { entity_id: h, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const p = ((e?.source_entity_integration ?? e?.source_entity ?? "") + "").toString().trim();
                  p && this.hass?.callService("homeassistant", "update_entity", { entity_id: p });
                } catch {
                }
              }, 400));
            }
          }
        } catch {
        }
        const n = ((e?.source_entity_integration ?? e?.source_entity ?? "") + "").toString().trim(), s = t, a = (n ? s?.states?.[n] : void 0)?.attributes ?? {}, o = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (n && o && !this.hasTimetableView(e)) {
          let l = ((e?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = n.replace(/^sensor\./, "number.") + "_offset");
          const d = l && s?.states && l in s.states, g = n + "|" + l;
          if (d && this.__autokickSig !== g) {
            this.__autokickSig = g;
            const h = s.states[l]?.state, u = Number(h), p = Number.isFinite(u) ? u : 0;
            s.callService("number", "set_value", { entity_id: l, value: p }).catch?.(() => {
            }), window.setTimeout(() => {
              try {
                this.hass?.callService("homeassistant", "update_entity", { entity_id: n });
              } catch {
              }
            }, 600);
          }
        }
      }
    } catch {
    }
  }
  get config() {
    return J(this, qe);
  }
  set config(t) {
    Z(this, qe, t);
  }
  get _rowsCache() {
    return J(this, Ze);
  }
  set _rowsCache(t) {
    Z(this, Ze, t);
  }
  get _noData() {
    return J(this, Ye);
  }
  set _noData(t) {
    Z(this, Ye, t);
  }
  get _noDataMsg() {
    return J(this, Ge);
  }
  set _noDataMsg(t) {
    Z(this, Ge, t);
  }
  get _jsonRows() {
    return J(this, Qe);
  }
  set _jsonRows(t) {
    Z(this, Qe, t);
  }
  get _jsonStatus() {
    return J(this, Xe);
  }
  set _jsonStatus(t) {
    Z(this, Xe, t);
  }
  get _jsonError() {
    return J(this, et);
  }
  set _jsonError(t) {
    Z(this, et, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), i = (n) => {
      const s = (n ?? "").toString().trim();
      s && e.add(s);
    };
    return i(t.dated_entries_entity), i(t.week_offset_entity), i(t.source_entity), i(t.source_entity_integration), i(t.source_entity_legacy), i(t.source_entity_a), i(t.source_entity_b), i(t.week_map_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const i = e.last_updated ?? "", n = e.last_changed ?? "", s = e.state ?? "", r = e.attributes ?? {}, a = r.plan ?? r.rows ?? r.rows_table ?? r.rows_json ?? r.rows_ha, o = Array.isArray(a) || typeof a == "string" ? a.length : 0;
    return `${t}|${i}|${n}|${s}|rowsLen=${o}`;
  }
  computeWatchSig(t) {
    const e = this.getWatchedEntities(t).map((s) => this.getEntitySig(s)), i = t.week_mode !== "off" ? this.getActiveWeek(t) : "off", n = this.getWeekOffsetValue(t);
    return `week=${i}|off=${n ?? "null"}::` + e.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const t = this.computeWatchSig(this.config);
    t !== this._lastWatchSig && (this._lastWatchSig = t, this.recomputeRows());
  }
  getWeekOffsetValue(t) {
    const e = (t.week_offset_entity ?? "").trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e], n = (t.week_offset_attribute ?? "").trim(), s = n ? i.attributes?.[n] : i.state, r = Number(s);
    return Number.isFinite(r) ? r : null;
  }
  async setWeekOffset(t, e) {
    const i = (t.week_offset_entity ?? "").trim();
    if (!i) return;
    const n = this.hass?.states?.[i], s = n?.attributes?.min, r = n?.attributes?.max, a = Number.isFinite(Number(s)) ? Number(s) : -52, o = Number.isFinite(Number(r)) ? Number(r) : 52;
    let l = e;
    l = Math.max(a, l), l = Math.min(o, l), await this.hass.callService("number", "set_value", { entity_id: i, value: l });
  }
  connectedCallback() {
    this.syncCalendar(), super.connectedCallback(), this._tick = window.setInterval(() => {
      this.syncCalendar(), this.hasTimetableView(this.config) && this.recomputeRows(), this.requestUpdate();
    }, 3e4);
  }
  disconnectedCallback() {
    this._timetable?.reset(), this._calendar?.reset(), this._holidays?.reset(), super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  updated(t) {
    if (this.syncCalendar(), super.updated(t), t.has("config")) {
      this.recomputeRows(), this._lastWatchSig = null;
      return;
    }
    if (t.has("hass")) {
      if (this.config) {
        const e = this.getWeekOffsetValue(this.config);
        e !== this._lastWeekOffset && (this._lastWeekOffset = e);
      }
      this.recomputeRowsIfWatchedChanged();
    }
  }
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      show_title: !0,
      title_font_size: 20,
      title_font_family: "",
      show_header_date: !0,
      show_time_column: !0,
      show_week_navigation: !0,
      trim_empty_rows: !1,
      hidden_subjects: [],
      subject_colors: [],
      merge_double_lessons: !1,
      equal_column_widths: !1,
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      view_mode: "week",
      display_mode: "default",
      days_ahead: 0,
      rolling_switch_mode: "midnight",
      rolling_week_only: !1,
      weekend_switch: "off",
      rolling_switch_time: "",
      tap_action: { action: "none" },
      highlight_today: !0,
      highlight_current: !0,
      highlight_breaks: !1,
      free_only_column_highlight: !0,
      highlight_today_color: "rgba(0, 150, 255, 0.12)",
      highlight_current_color: "rgba(76, 175, 80, 0.18)",
      highlight_current_text: !1,
      highlight_current_text_color: "#ff1744",
      highlight_current_time_text: !1,
      highlight_current_time_text_color: "#ff9100",
      source_entity: "",
      source_entity_integration: "",
      source_entity_legacy: "",
      source_attribute: "rows_table",
      source_time_key: "time",
      source_type: "manual",
      json_url: "",
      no_data_text: "Keine Daten für diesen Zeitraum (Ferien/Feiertag).",
      week_offset_entity: "",
      week_offset_attribute: "",
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
      filter_main_only: !0,
      filter_allow_prefixes: [],
      filter_exclude: [],
      rows: [],
      rows_b: []
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(t) {
    const e = Ce.getStubConfig(), i = ((t?.type ?? e.type) + "").toString();
    if (!(i === "custom:stundenplan-card" || i === "stundenplan-card")) {
      this.config = this.normalizeConfig(e), this.recomputeRows();
      return;
    }
    this.config = this.normalizeConfig({ ...e, ...t, type: i }), this.recomputeRows(), this._lastWatchSig = null;
  }
  getCardSize() {
    const t = this.config?.rows?.length ?? 3;
    return Math.max(3, t);
  }
  normalizeTapAction(t) {
    const e = typeof t == "object" && t ? t : {}, i = ((e.action ?? "none") + "").toString().trim();
    return {
      action: i === "toggle_view" || i === "popup_week" || i === "navigate" || i === "url" || i === "more-info" ? i : "none",
      navigation_path: (e.navigation_path ?? "").toString(),
      url_path: (e.url_path ?? "").toString(),
      entity: (e.entity ?? "").toString(),
      target: (e.target ?? "").toString()
    };
  }
  normalizeConfig(t) {
    const e = Ce.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((C) => (C ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = gi(t.rows, i), s = gi(t.rows_b, i), r = ((t.view_mode ?? "week") + "").toString().trim(), a = r === "rolling" ? "rolling" : "week", o = ((t.display_mode ?? "default") + "").toString().trim(), l = o === "compact" ? "compact" : "default", d = Number(t.days_ahead), g = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0, h = ((t.rolling_switch_mode ?? e.rolling_switch_mode ?? "midnight") + "").toString().trim(), u = h === "after_last_lesson" || h === "fixed_time" ? h : "midnight", p = ((t.rolling_switch_time ?? e.rolling_switch_time ?? "") + "").toString().trim(), m = ((t.week_mode ?? e.week_mode) + "").toString().trim(), A = m === "kw_parity" || m === "week_map" || m === "off" ? m : "off", x = (() => {
      const C = ((t.source_type ?? "") + "").toString().trim();
      if (C === "manual" || C === "entity" || C === "json" || C === "sensor") return C;
      const H = ((t.source_entity ?? e.source_entity) + "").toString().trim();
      if (H) {
        const D = ((t.source_attribute ?? "") + "").toString().trim(), U = ((t.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(H) && (D === "" || D === "rows_table") && (U === "" || U === "time")) && (D || U) ? "legacy" : "entity";
      }
      return "manual";
    })(), w = (t.source_entity ?? e.source_entity).toString().trim(), f = (t.source_entity_integration ?? "").toString().trim(), _ = (t.source_entity_legacy ?? "").toString().trim(), v = x === "sensor" ? _ || w : x === "entity" && f || w, j = (t.week_offset_entity ?? "").toString().trim() || Pi(v);
    return {
      type: (t.type ?? e.type).toString(),
      title: (t.title ?? e.title).toString(),
      show_title: t.show_title ?? e.show_title,
      title_font_size: Number.isFinite(Number(t.title_font_size)) ? Math.max(0, Math.min(40, Number(t.title_font_size))) : e.title_font_size,
      title_font_family: (t.title_font_family ?? e.title_font_family ?? "").toString(),
      ...At(t),
      ...St(t),
      show_header_date: t.show_header_date ?? e.show_header_date,
      show_time_column: t.show_time_column ?? e.show_time_column,
      show_week_navigation: t.show_week_navigation ?? e.show_week_navigation,
      trim_empty_rows: t.trim_empty_rows ?? e.trim_empty_rows,
      hidden_subjects: tt(t.hidden_subjects),
      subject_colors: $i(t.subject_colors),
      dated_entries: Array.isArray(t.dated_entries) ? t.dated_entries : [],
      show_upcoming_notes: Y(t.show_upcoming_notes, !1),
      dated_entries_entity: typeof t.dated_entries_entity == "string" ? t.dated_entries_entity.trim() : "",
      calendar_entity: typeof t.calendar_entity == "string" ? t.calendar_entity.trim() : "",
      holiday_calendar_entity: typeof t.holiday_calendar_entity == "string" ? t.holiday_calendar_entity.trim() : "",
      holiday_extra_titles: Fe(t.holiday_extra_titles),
      dated_entries_attribute: typeof t.dated_entries_attribute == "string" && t.dated_entries_attribute.trim() || "entries",
      merge_double_lessons: t.merge_double_lessons ?? e.merge_double_lessons,
      equal_column_widths: t.equal_column_widths ?? e.equal_column_widths,
      days: i,
      view_mode: a,
      display_mode: l,
      days_ahead: g,
      rolling_switch_mode: u,
      rolling_week_only: t.rolling_week_only === !0,
      weekend_switch: ["saturday", "sunday"].includes(t.weekend_switch) ? t.weekend_switch : "off",
      rolling_switch_time: p,
      tap_action: this.normalizeTapAction(t.tap_action ?? e.tap_action),
      highlight_today: t.highlight_today ?? e.highlight_today,
      highlight_current: t.highlight_current ?? e.highlight_current,
      highlight_breaks: t.highlight_breaks ?? e.highlight_breaks,
      free_only_column_highlight: t.free_only_column_highlight ?? e.free_only_column_highlight,
      highlight_today_color: (t.highlight_today_color ?? e.highlight_today_color).toString(),
      highlight_current_color: (t.highlight_current_color ?? e.highlight_current_color).toString(),
      highlight_current_text: t.highlight_current_text ?? e.highlight_current_text,
      highlight_current_text_color: (t.highlight_current_text_color ?? e.highlight_current_text_color).toString(),
      highlight_current_time_text: t.highlight_current_time_text ?? e.highlight_current_time_text,
      highlight_current_time_text_color: (t.highlight_current_time_text_color ?? e.highlight_current_time_text_color).toString(),
      source_entity: v,
      source_entity_integration: f || "",
      source_entity_legacy: _ || "",
      source_attribute: x === "entity" ? "rows_table" : ((t.source_attribute ?? e.source_attribute ?? "plan") + "").toString(),
      source_time_key: x === "entity" ? "time" : ((t.source_time_key ?? e.source_time_key ?? "Stunde") + "").toString(),
      source_type: x,
      json_url: (t.json_url ?? "").toString(),
      week_offset_entity: j,
      week_offset_attribute: (t.week_offset_attribute ?? "").toString(),
      week_mode: A,
      week_a_is_even_kw: t.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (t.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (t.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (t.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (t.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (t.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (t.source_attribute_b ?? e.source_attribute_b).toString(),
      filter_main_only: t.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(t.filter_allow_prefixes) ? t.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(t.filter_exclude) ? t.filter_exclude.map(String) : [],
      rows: n,
      rows_b: s
    };
  }
  getTodayIndex(t, e) {
    const i = /* @__PURE__ */ new Date(), n = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(e) && e.length) {
      const l = e.map((d) => {
        if (d instanceof Date && !Number.isNaN(d.getTime()))
          return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
        const g = (d ?? "").toString().trim(), h = g.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return h ? `${h[1]}${h[2]}${h[3]}` : g;
      }).indexOf(n);
      return l >= 0 ? l : -1;
    }
    const s = i.getDay(), r = new Set(Hn(s).map(kt));
    if (!r.size) return -1;
    const a = (t ?? []).map((o) => kt(o));
    for (let o = 0; o < a.length; o++) if (r.has(a[o])) return o;
    return -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [e, i] = t.split(":").map((n) => Number(n));
    return [e, i].some((n) => Number.isNaN(n)) ? null : e * 60 + i;
  }
  isNowBetween(t, e) {
    const i = this.toMinutes(t), n = this.toMinutes(e);
    if (i == null || n == null) return !1;
    const s = /* @__PURE__ */ new Date(), r = s.getHours() * 60 + s.getMinutes();
    return r >= i && r < n;
  }
  parseAnyJson(t) {
    if (t == null) return null;
    if (typeof t == "string") {
      const e = t.trim();
      if (!e) return null;
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    }
    return t;
  }
  readEntityJson(t, e) {
    const i = (t ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const n = this.hass.states[i], s = (e ?? "").toString().trim(), r = s ? n.attributes?.[s] : n.state;
    return this.parseAnyJson(r);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], n = (t.source_time_key ?? "time").toString().trim(), s = "Stunde", r = "time", a = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o?.time ?? o?.[n] ?? o?.[s] ?? o?.[r] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[n] ?? o?.[s] ?? o?.[r] ?? "").toString(), d = _e(l), g = Array.isArray(o?.cells) ? Array.from({ length: i.length }, (x, w) => (o?.cells?.[w] ?? "").toString()) : Array.from({ length: i.length }, (x, w) => {
        const f = (i[w] ?? "").toString();
        return (o?.[f] ?? "").toString();
      }), h = Array.isArray(o?.cell_styles) ? Array.from({ length: i.length }, (x, w) => Ft(o?.cell_styles?.[w])) : [], u = Array.isArray(o?.cell_times) ? Array.from({ length: i.length }, (x, w) => Fi(o.cell_times[w])) : [], p = (o?.start ?? "").toString().trim() || d.start, m = (o?.end ?? "").toString().trim() || d.end, A = { time: l, start: p || void 0, end: m || void 0, cells: g };
      return A.subject_changes = Ni(o?.subject_changes), h.some((x) => !!x) && (A.cell_styles = h), u.some((x) => !!x) && (A.cell_times = u), A;
    });
    return a.length ? a : null;
  }
  getRowsFromEntity(t, e, i) {
    let n = this.readEntityJson(e, i);
    if (n == null && i && (i + "").toString().trim() && (i + "").toString().trim() !== "plan" && (n = this.readEntityJson(e, "plan")), n == null && (n = this.readEntityJson(e, "rows_ha")), n == null && (n = this.readEntityJson(e, "rows")), n == null && (n = this.readEntityJson(e, "rows_table")), n == null && (n = this.readEntityJson(e, "rows_json")), n && typeof n == "object" && !Array.isArray(n)) {
      const s = n.plan, r = n.rows;
      Array.isArray(s) ? n = s : Array.isArray(r) && (n = r);
    }
    return Array.isArray(n) ? this.buildRowsFromArray(t, n) : null;
  }
  async loadJsonRows(t, e) {
    const i = (e ?? "").toString().trim();
    if (!i) {
      this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = "";
      return;
    }
    this._jsonStatus = "loading", this._jsonError = "";
    try {
      const n = await fetch(i, { cache: "no-store" });
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const s = await n.json(), r = Array.isArray(s) ? s : Array.isArray(s?.rows) ? s.rows : null, a = r ? this.buildRowsFromArray(t, r) : null;
      this._jsonRows = a ?? [], this._jsonStatus = "ok";
    } catch (n) {
      this._jsonRows = [], this._jsonStatus = "error", this._jsonError = (n?.message ?? "JSON konnte nicht geladen werden").toString();
    } finally {
      this.requestUpdate();
    }
  }
  ensureJsonLoaded(t) {
    const e = (t.json_url ?? "").toString().trim();
    e === this._jsonUrlLast && this._jsonStatus !== "error" || (e !== this._jsonUrlLast && (this._jsonUrlLast = e, this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = ""), this._jsonStatus === "idle" && e && this.loadJsonRows(t, e));
  }
  weekFromParity(t) {
    return this.weekFromParityAtDate(t, this.getBaseDate(t));
  }
  weekFromParityAtDate(t, e) {
    const { isoWeek: i } = fi(e), n = i % 2 === 0, s = !!t.week_a_is_even_kw;
    return n === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), n = this.readEntityJson(e, i);
    if (!n || typeof n != "object") return null;
    const { isoWeek: s, isoYear: r } = fi(this.getBaseDate(t)), a = String(s), o = String(r);
    if (n?.[o] && typeof n[o] == "object") {
      const d = _i(n[o][a]);
      if (d) return d;
    }
    return _i(n?.[a]) || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  filterCellText(t, e) {
    return Un((t ?? "").toString().trim(), e.hidden_subjects);
  }
  getDatedCell(t, e, i, n, s) {
    this.timetableEntity(t) && (e = this.getManualRowForDate(t, e, -1, n));
    const r = this.filterCellText(e?.cells?.[i], t);
    if (!s?.length || E(e)) return { text: r, notes: [] };
    const a = /* @__PURE__ */ new Map(), o = [];
    xt("", e, i, n, s).notes.forEach((l) => a.set(JSON.stringify(l), l));
    for (const l of r.split(/\r?\n\s*\r?\n/)) {
      const d = xt(l, e, i, n, s), g = this.filterCellText(d.text, t);
      g && (o.push(g), d.notes.forEach((h) => a.set(JSON.stringify(h), h)));
    }
    return { text: o.join(`

`), notes: [...a.values()] };
  }
  getTitleStyle(t) {
    const e = [], i = Number(t.title_font_size);
    Number.isFinite(i) && i > 0 && e.push(`font-size:${Math.max(10, Math.min(40, i))}px`);
    const n = (t.title_font_family ?? "").toString().trim();
    return n && e.push(`font-family:${n}`), e.join(";");
  }
  getTypographyStyle(t) {
    const e = At(t);
    return me.filter(({ key: i }) => e[i] != null).map(({ key: i, variable: n }) => `${n}:${e[i]}px`).join(";");
  }
  getAppearanceStyle(t) {
    const e = St(t);
    return Rt.filter(({ key: i }) => e[i] != null).map(({ key: i, variable: n }) => `${n}:${e[i]}`).join(";");
  }
  fmtYMD(t) {
    return `${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, "0")}${String(t.getDate()).padStart(2, "0")}`;
  }
  findConfiguredDayIndexForDate(t, e) {
    const i = t.getDay() === 0 ? 7 : t.getDay();
    return (e ?? []).findIndex((n) => vt(n) === i);
  }
  isConfiguredSchoolday(t, e) {
    return this.findConfiguredDayIndexForDate(t, e) >= 0;
  }
  nextConfiguredSchoolday(t, e) {
    const i = new Date(t);
    for (let n = 0; n < 14; n++)
      if (i.setDate(i.getDate() + 1), this.isConfiguredSchoolday(i, e)) return i;
    return i;
  }
  getLastLessonEnd(t = this.config, e = /* @__PURE__ */ new Date()) {
    if (this.hasTimetableView(t)) {
      const n = this._timetable?.data, s = this.findConfiguredDayIndexForDate(e, t.days);
      if (s < 0 || !n?.loaded_days.includes(k(e))) return "";
      let r = "";
      for (const a of this.buildRowsFromArray(t, n.weeks[_t(e)] ?? []) ?? []) {
        if (E(a) || G(this.filterCellText(a.cells?.[s], t))) continue;
        const o = a.cell_times?.[s]?.end || a.end;
        if (!/^\d{2}:\d{2}$/.test(o ?? "")) return "";
        o > r && (r = o);
      }
      return r;
    }
    const i = this._rowsCache ?? [];
    if (t?.hidden_subjects?.length) {
      const n = this.collectDatedEntries(t).entries, s = this.findConfiguredDayIndexForDate(e, t.days);
      if (s < 0) return "";
      let r = "";
      for (let a = 0; a < i.length; a++) {
        const o = this.getManualRowForDate(t, i[a], a, e);
        if (E(o) || G(this.getDatedCell(t, o, s, e, n).text)) continue;
        const l = o?.cell_times?.[s]?.end || o?.end;
        if (!/^\d{1,2}:\d{2}$/.test(l ?? "")) return "";
        const [d, g] = l.split(":").map(Number);
        if (d > 23 || g > 59) return "";
        const h = `${String(d).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
        h > r && (r = h);
      }
      return r;
    }
    for (let n = i.length - 1; n >= 0; n--) {
      const s = i[n];
      if (!E(s) && s?.end) return (s.end + "").toString().trim();
    }
    return "";
  }
  shouldAdvanceRollingDay(t, e) {
    if (!this.isConfiguredSchoolday(e, t.days ?? [])) return !0;
    const i = ((t.rolling_switch_mode ?? "midnight") + "").toString();
    if (i === "after_last_lesson") {
      const n = this.getLastLessonEnd(t, e);
      if (!n) return !1;
      const [s, r] = n.split(":").map(Number);
      return Number.isFinite(s) && Number.isFinite(r) ? e.getHours() > s || e.getHours() === s && e.getMinutes() >= r : !1;
    }
    if (i === "fixed_time") {
      const n = ((t.rolling_switch_time ?? "") + "").toString().trim(), [s, r] = n.split(":").map(Number);
      return Number.isFinite(s) && Number.isFinite(r) ? e.getHours() > s || e.getHours() === s && e.getMinutes() >= r : !1;
    }
    return !1;
  }
  getRollingVisibleSlots(t, e, i = /* @__PURE__ */ new Date()) {
    const n = t.days ?? [];
    if (!n.length) return [];
    const s = i;
    let r = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 12, 0, 0, 0);
    this.isConfiguredSchoolday(r, n) ? this.shouldAdvanceRollingDay(t, s) && (r = this.nextConfiguredSchoolday(r, n)) : r = this.nextConfiguredSchoolday(r, n);
    const a = [], o = Math.max(0, Math.min(6, e));
    let l = new Date(r);
    const d = new Date(r);
    d.setDate(r.getDate() + (7 - (r.getDay() || 7))), d.setHours(23, 59, 59, 999);
    for (let g = 0; g <= o && !(t.rolling_week_only && l > d); g++) {
      const h = this.findConfiguredDayIndexForDate(l, n);
      h >= 0 && a.push({ orig: h, date: new Date(l) }), l = this.nextConfiguredSchoolday(l, n);
    }
    return a;
  }
  async handleCardAction(t, e) {
    if (!e || e.defaultPrevented || P(this) || (e.composedPath?.() ?? []).some((s) => s instanceof HTMLElement && (s.closest?.(".offsetInline") || s.closest?.(".btnMini")))) return;
    const n = this.normalizeTapAction(t.tap_action);
    if (!(!n || n.action === "none")) {
      if (n.action === "toggle_view") {
        const s = ((this._uiViewMode ?? t.view_mode ?? "week") + "").toString();
        this._uiViewMode = s === "rolling" ? "week" : "rolling", this.hasTimetableView(t) && this.recomputeRows(), this.requestUpdate();
        return;
      }
      if (n.action === "popup_week") {
        this._uiPopupOpen = !0, this.hasTimetableView(t) && this.recomputeRows(), this.requestUpdate();
        return;
      }
      if (n.action === "navigate") {
        const s = (n.navigation_path ?? "").toString().trim();
        if (!s) return;
        history.pushState(null, "", s), it(window, "location-changed", { replace: !1 });
        return;
      }
      if (n.action === "url") {
        const s = (n.url_path ?? "").toString().trim();
        if (!s) return;
        window.open(s, n.target || "_blank");
        return;
      }
      if (n.action === "more-info") {
        const s = (n.entity ?? t.source_entity ?? t.source_entity_integration ?? "").toString().trim();
        if (!s) return;
        it(this, "hass-more-info", { entityId: s });
      }
    }
  }
  closeWeekPopup(t) {
    t?.stopPropagation?.(), this._uiPopupOpen = !1, this.requestUpdate();
  }
  handlePreviewNote(t, e, i, n, s, r) {
    P(this) && (e.stopPropagation(), this.dispatchEvent(new CustomEvent("stundenplan-add-note", {
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      detail: {
        config: this.config,
        date: k(s),
        period: de(i?.cell_times?.[n]?.time || i?.time),
        note: r,
        sourceText: i?.cells?.[n] ?? ""
      }
    })));
  }
  updatePreviewTooltip(t, e) {
    if (!P(this)) return;
    const i = { config: this.config, text: t.source_type === "manual" ? "Fach bearbeiten" : "Termin oder Hinweis hinzufügen" };
    this.dispatchEvent(new CustomEvent("stundenplan-preview-tooltip", { bubbles: !0, composed: !0, detail: i })), e.currentTarget.title = i.text;
  }
  handlePreviewCell(t, e, i, n, s, r = 1) {
    if (!P(this)) return;
    e.stopPropagation();
    let a = e.currentTarget.parentElement;
    for (let p = 1; p < r && (a = a?.nextElementSibling, a && e.clientY >= a.getBoundingClientRect().top); p++)
      i++;
    const o = this.getManualRowForDate(t, this._rowsCache[i], i, s), l = de(o?.cell_times?.[n]?.time || o?.time);
    if (n >= 0 && o && !E(o) && l && k(s)) {
      const p = new CustomEvent("stundenplan-add-note", {
        bubbles: !0,
        composed: !0,
        cancelable: !0,
        detail: { config: this.config, date: k(s), period: l }
      });
      if (!this.dispatchEvent(p)) return;
    }
    if (t.source_type !== "manual") return;
    let d = t.week_mode === "kw_parity" ? s instanceof Date ? this.weekFromParityAtDate(t, s) : this.getActiveWeek(t) : "A";
    d === "B" && !t.rows_b?.length && (d = "A");
    const g = d === "B" ? t.rows_b : t.rows, h = this.getManualRowForDate(t, this._rowsCache[i], i, s), u = g.indexOf(h);
    u < 0 || it(this, "stundenplan-edit-cell", { config: this.config, rowIndex: u, dayIndex: n, week: d });
  }
  getBaseDate(t) {
    const e = (this.getWeekOffsetValue(t) ?? 0) || this.autoWeekend(t), i = /* @__PURE__ */ new Date();
    return i.setHours(12, 0, 0, 0), i.setDate(i.getDate() + e * 7), i;
  }
  mondayOfWeek(t) {
    const e = new Date(t), i = e.getDay() === 0 ? 7 : e.getDay();
    return e.setDate(e.getDate() - (i - 1)), e.setHours(12, 0, 0, 0), e;
  }
  fmtDDMMYYYY(t) {
    const e = String(t.getDate()).padStart(2, "0"), i = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getFullYear());
    return `${e}.${i}.${n}`;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(t) {
    const e = ((t.source_type ?? "manual") === "entity" ? (t.source_entity_integration || t.source_entity) ?? "" : (t.source_type ?? "manual") === "sensor" ? (t.source_entity_legacy || t.source_entity) ?? "" : t.source_entity ?? "").toString().trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e].attributes ?? {}, n = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
    if (!Array.isArray(n) || n.length < 3) return null;
    const s = [];
    for (const r of n) {
      const a = (r ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const o = Number(a[1]), l = Number(a[2]), d = Number(a[3]), g = new Date(o, l - 1, d, 12, 0, 0, 0);
      Number.isNaN(g.getTime()) || s.push(g);
    }
    return s.length ? s : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(t) {
    const e = ((t.source_type ?? "manual") + "").toString().trim();
    if (e !== "entity" && e !== "sensor") return null;
    const i = (e === "entity" ? (t.source_entity_integration || t.source_entity) ?? "" : e === "sensor" ? (t.source_entity_legacy || t.source_entity) ?? "" : t.source_entity ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const n = this.hass.states[i].attributes ?? {}, s = n?.meta_ha ?? n?.meta ?? (typeof n?.meta_json == "string" ? this.parseAnyJson(n.meta_json) : null) ?? null;
    if (!s) return null;
    const r = (t.days?.length ?? 0) || 5, a = s?.updated_days;
    if (Array.isArray(a) && a.length) {
      const l = (a[0] ?? "").toString().trim();
      return Array.from({ length: r }, (g, h) => (a[h] ?? l ?? "").toString().trim());
    }
    const o = (s?.updated_raw ?? s?.updated ?? "").toString().trim();
    return o ? Array.from({ length: r }, () => o) : null;
  }
  getRowsResolved(t) {
    if (this.hasTimetableView(t)) return this.timetableRows(t);
    const e = t.source_type ?? "manual", i = (e === "entity" ? (t.source_entity_integration || t.source_entity) ?? "" : e === "sensor" ? (t.source_entity_legacy || t.source_entity) ?? "" : t.source_entity ?? "").toString().trim();
    if (e === "manual")
      return t.week_mode === "kw_parity" && this.getActiveWeek(t) === "B" ? Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : t.rows ?? [] : t.rows ?? [];
    if (e === "json")
      return this.ensureJsonLoaded(t), this._jsonRows ?? [];
    if (t.week_mode !== "off") {
      const s = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), a = (t.source_entity_b ?? "").trim(), o = (t.source_attribute_a ?? "").trim(), l = (t.source_attribute_b ?? "").trim();
      if (s === "A" && r)
        return this.getRowsFromEntity(t, r, o) ?? [];
      if (s === "B" && a)
        return this.getRowsFromEntity(t, a, l) ?? [];
      const d = i;
      return d ? this.getRowsFromEntity(t, d, ((t.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
    }
    const n = i;
    return n ? this.getRowsFromEntity(t, n, ((t.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
  }
  getManualRowForDate(t, e, i, n) {
    if (n instanceof Date && this.hasTimetableView(t)) {
      const l = this._timetable?.data;
      return (l?.loaded_days?.includes(k(n)) ? this.buildRowsFromArray(t, l.weeks[_t(n)] ?? []) ?? [] : []).find((g) => bt(g) === bt(e)) ?? { ...e, cells: [], cell_styles: [], cell_times: [], subject_changes: {} };
    }
    if (n instanceof Date && this.timetableEntity(t)) {
      const l = this.getHeaderDaysFromEntity(t);
      if (l && !l.some((d) => k(d) === k(n)))
        return { ...e, cells: [], cell_styles: [], cell_times: [], subject_changes: {} };
    }
    if ((t.source_type ?? "manual") !== "manual" || t.week_mode !== "kw_parity" || !(n instanceof Date)) return e;
    const s = this.weekFromParityAtDate(t, n), r = s === "B" && Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : t.rows ?? [], a = (e?.time ?? "").toString();
    return r.find((l) => E(l) === E(e) && (l?.time ?? "").toString() === a) ?? r[i] ?? e;
  }
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [], this._noData = !1, this._noDataMsg = "";
      return;
    }
    const t = this.config, e = t.source_type ?? "manual", i = this.getRowsResolved(t);
    if (this._rowsCache = i, e === "manual") {
      this._noData = !1, this._noDataMsg = "";
      return;
    }
    const n = this.hasTimetableView(t) ? "Keine Unterrichtseinträge für diese Ansicht verfügbar." : "Keine Daten für diesen Zeitraum (Ferien/Feiertag).";
    !i || i.length === 0 ? (this._noData = !0, e === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || n}` : e === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = n) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(t) {
    const e = (t ?? "").toString().replace(/\r/g, "").trim();
    if (!e) return null;
    const i = e.split(`
`).map((u) => u.trim()).filter((u) => u.length > 0);
    if (!i.length) return null;
    const n = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(n)) return null;
    const s = i[0];
    if (/^(—|\-|–|---)$/.test(s)) return null;
    const r = (u) => {
      const p = (u ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(p) || /\bfällt\s+aus\b/i.test(p) || /\bverlegt\b/i.test(p) || /\bentfällt\b/i.test(p) || /\bvertretung\b/i.test(p) || /\bstatt\b/i.test(p) || /\bgehalten\b/i.test(p) || /\bAufgaben\b/i.test(p) || /^für\b/i.test(p);
    }, a = (u) => {
      const p = (u ?? "").toString().trim();
      return /^\d{1,4}$/.test(p) || /^[A-Za-zÄÖÜäöüß]{1,8}\s*\d{1,4}$/i.test(p) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(p) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/i.test(p);
    }, o = i.slice(1);
    let l = -1;
    for (let u = 0; u < o.length; u++)
      if (!r(o[u]) && a(o[u])) {
        l = u;
        break;
      }
    if (l < 0) {
      for (let u = o.length - 1; u >= 0; u--)
        if (a(o[u])) {
          l = u;
          break;
        }
    }
    if (l < 0) return null;
    const d = o[l];
    let g;
    for (let u = l + 1; u < o.length; u++) {
      const p = o[u];
      if (!r(p) && !a(p)) {
        g = p;
        break;
      }
    }
    if (!g) {
      const u = o.filter((p) => !r(p) && !a(p));
      g = u.length ? u[u.length - 1] : void 0;
    }
    const h = i.slice(1).filter((u) => r(u));
    return { fach: s, raum: d, lehrer: g, notes: h.length ? h : void 0 };
  }
  renderCell(t, e, i = !1, n = "", s = []) {
    const r = (t ?? "").toString(), a = this.filterCellText(r, e);
    if (G(a)) return c``;
    const o = (() => {
      let f = a.replace(/\r/g, "").split(`
`).map((v) => (v ?? "").toString().trim());
      for (; f.length && /^(—|–|-)$/.test(f[0]); ) f.shift();
      const _ = [];
      for (const v of f) {
        const j = v.length === 0;
        if (!/^(—|–|-)$/.test(v)) {
          if (j) {
            if (_.length === 0 || _[_.length - 1] === "") continue;
            _.push("");
            continue;
          }
          _.push(v);
        }
      }
      for (; _.length && _[_.length - 1] === ""; ) _.pop();
      return _.join(`
`);
    })();
    if (G(o)) return c``;
    const l = o.split(/\n\s*\n/).map((f) => f.trim()).filter(Boolean), d = (f) => {
      if (f.startsWith("🔴")) return "note noteRed";
      if (f.startsWith("🟠")) return "note noteOrange";
      if (f.startsWith("🟡")) return "note noteYellow";
      const _ = f;
      return /\bfällt\s+aus\b/i.test(_) || /\bverlegt\b/i.test(_) || /\bstatt\b/i.test(_) || /\bgehalten\b/i.test(_) || /\bentfällt\b/i.test(_) ? "note noteRed" : "note";
    }, g = (f) => (f ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim(), h = (f) => {
      const _ = (f ?? "").toString().trim();
      if (!_) return c``;
      const v = this.parseCellTriplet(_);
      if (v?.fach && v?.raum && v?.lehrer)
        return v.notes = _.split(`
`).slice(1).map((D) => D.trim()).filter((D) => D && D !== v.raum && D !== v.lehrer), c`
          <div class="cellWrap">
            <div class="fach">${v.fach}</div>
            <div class="lehrer">${v.lehrer}</div>
            <div class="raum">${v.raum}</div>

            ${v.notes?.length ? c`
                  <div class="notes">
                    ${v.notes.map((D) => {
          const U = d(D), pe = g(D) || D;
          return c`<div class=${U}><span class="txt">${pe}</span></div>`;
        })}
                  </div>
                ` : c``}
          </div>
        `;
      const j = _.split(`
`).map((D) => D.trim()).filter(Boolean), C = (j[0] ?? "").trim(), H = j.slice(1);
      return C && H.length ? c`
          <div class="cellWrap">
            <div class="fach">${C}</div>
            <div class="notes">
              ${H.map((D) => {
        const U = d(D), pe = g(D) || D;
        return c`<div class=${U}><span class="txt">${pe}</span></div>`;
      })}
            </div>
          </div>
        ` : c`<span class="cellText">${_}</span>`;
    }, u = (f) => {
      const _ = s.filter((v) => Ee(v.current) === Ee(f));
      return _.length !== 1 ? h(f) : c`<div class="subjectChange" role="group" aria-label="Fachwechsel">
        <div class="subjectChangeOriginal"><div class="subjectChangeLabel">Bisher</div>${h(_[0].original)}</div>
        <div><div class="subjectChangeLabel">Jetzt</div>${h(f)}</div>
      </div>`;
    }, p = (f) => {
      const _ = i ? "" : ei(f, e.subject_colors);
      return _ ? c`<div class="subjectColorBlock" style=${_ + (n ? `color:${n};` : "")}>${u(f)}</div>` : u(f);
    };
    if (l.length > 1)
      return c`<div class="cellMulti">${l.map(p)}</div>`;
    if (s.some((f) => Ee(f.current) === Ee(o)))
      return u(o);
    const m = (o ?? "").split(`
`).map((f) => f.trim()).filter(Boolean), A = /^(?:\d{1,4}|[A-Za-zÄÖÜäöüß]{1,8}\s*\d{1,4}|[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}|\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12})$/i, x = /^[A-Za-zÄÖÜäöüß]{2,12}$/i, w = (f) => {
      const _ = (f ?? "").trim();
      if (!_ || A.test(_)) return !1;
      const v = _.toLowerCase();
      return v.startsWith("statt ") || v.includes("fällt aus") || v.includes("verlegt") || v.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(_) ? !1 : /[a-z0-9äöü]/i.test(_);
    };
    if (m.length >= 6 && m.length % 3 === 0) {
      const f = [];
      for (let _ = 0; _ < m.length; _ += 3) {
        const v = m[_] ?? "", j = m[_ + 1] ?? "", C = m[_ + 2] ?? "";
        if (!w(v) || !A.test(j) || !x.test(C)) {
          f.length = 0;
          break;
        }
        f.push([v, j, C].join(`
`));
      }
      if (f.length >= 2)
        return c`<div class="cellMulti">${f.map((_) => u(_))}</div>`;
    }
    return u(o);
  }
  renderCardLayout(t, e = null, i = !1) {
    const n = this._rowsCache, s = this.getHeaderDaysFromEntity(t), r = this.getTodayIndex(t.days ?? [], s), a = ((e ?? this._uiViewMode ?? t.view_mode ?? "week") + "").toString(), o = Number(t.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, d = "1px solid var(--stundenplan-divider-color, var(--divider-color))", g = mi(t.highlight_today_color ?? "", 0.12), h = mi(t.highlight_current_color ?? "", 0.18), u = (t.highlight_current_text_color ?? "").toString().trim(), p = (t.highlight_current_time_text_color ?? "").toString().trim(), m = t.week_mode !== "off", A = m ? this.getActiveWeek(t) : null, x = this.getWeekOffsetValue(t), w = (t.source_type ?? "manual").toString(), f = t.show_time_column !== !1, _ = !i && (t.week_offset_entity ?? "").trim().length > 0, v = _ && (w === "entity" || w === "sensor" && (t.week_mode ?? "off") !== "off"), j = v && t.show_week_navigation !== !1, C = s && s.length >= (t.days?.length ?? 0) ? s : null, H = this.getHeaderUpdatedFromEntity(t), D = this.getBaseDate(t), U = this.mondayOfWeek(D), pe = this.normalizeTapAction(t.tap_action), Oi = i ? "default" : t.display_mode ?? "default", Wi = `${Oi === "compact" ? "compact" : ""}${!i && pe.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}${t.header_table_gap != null ? " customHeaderGap" : ""}`, Nt = t.show_title !== !1 && (t.title ?? "").toString().trim().length > 0, Hi = this.getTitleStyle(t), Ui = Nt || m || j, Li = a === "rolling" && (i || !v || (x ?? 0) === 0), we = Li ? this.getRollingVisibleSlots(t, l) : [], ne = we.length ? we.map((y) => y.orig) : Array.from({ length: t.days?.length ?? 0 }, (y, $) => $), ve = ne.map((y) => t.days[y]), Oe = we.length ? we.map((y) => y.date) : null, se = this.collectDatedEntries(t), M = this.getColumnDates(t, Oe), L = (y) => M[y] ?? null, Vi = t.holiday_calendar_entity ? this._holidays?.entries ?? [] : [], lt = M.map((y) => an(Vi, y)), Pt = [...new Set(lt.flat())], ct = we.length ? 0 : Math.max(0, ne.indexOf(r)), We = ne[ct] ?? 0, He = M?.[ct] ?? null, Bt = He instanceof Date ? this.fmtYMD(He) === this.fmtYMD(/* @__PURE__ */ new Date()) : We === r, $e = t.trim_empty_rows || t.hidden_subjects?.length ? Ln(n, ne, (y, $, S, F) => {
      const O = this.getManualRowForDate(t, y, $, M?.[F]), R = this.getDatedCell(t, O ?? y, S, L(F), se.entries);
      return R.text + R.notes.map((I) => I.text).join(" ");
    }) : n, Ot = /* @__PURE__ */ new Set(), Wt = t.show_upcoming_notes ? (this._noData || $e.forEach((y, $) => {
      E(y) || ne.forEach((S, F) => {
        const O = this.getManualRowForDate(t, y, $, L(F)) ?? y;
        Ot.add(`${k(L(F))}/${de(O.cell_times?.[S]?.time || O.time)}`);
      });
    }), Xi(se.entries, Ot)) : [], Ht = (() => {
      const y = /* @__PURE__ */ new Map();
      return !C || !H || C.forEach(($, S) => {
        const F = H[S];
        $ instanceof Date && F && y.set(this.fmtYMD($), F);
      }), y;
    })();
    return c`
      <ha-card class=${Wi} style=${[this.getTypographyStyle(t), this.getAppearanceStyle(t)].filter(Boolean).join(";")} @click=${i ? (y) => this.closeWeekPopup(y) : (y) => this.handleCardAction(t, y)}>
        ${Ui ? c`<div class="headerRow">
          ${Nt ? c`<div class="title" style=${Hi}>${t.title ?? ""}</div>` : c`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${m ? c`<div class="weekBadgeInline">Woche <b>${A}</b></div>` : c``}

            ${j ? c`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), x != null && this.setWeekOffset(t, x - 1);
    }}>&lt;</button>
                    <div class="offsetVal">${x ?? "?"}</div>
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), x != null && this.setWeekOffset(t, x + 1);
    }}>&gt;</button>
                  </div>
                ` : c``}
          </div>
        </div>` : c``}

        <div class="card">
          ${Pt.length ? c`<div class="holidayBanner" role="note" aria-label="Ferien im angezeigten Zeitraum">
            ${Pt.map((y) => c`<div><strong>${y.title}</strong><span>${on(y)}</span></div>`)}
          </div>` : b}
          <table class=${t.equal_column_widths ? "equalColumns" : ""}>
            <thead>
              <tr>
                ${f ? c`<th class="time">Stunde</th>` : c``}
                ${ve.map((y, $) => {
      const S = ne[$], F = t.highlight_today && M[$] && this.fmtYMD(M[$]) === this.fmtYMD(/* @__PURE__ */ new Date()) ? "today" : "";
      let O = "";
      if (M?.[$] instanceof Date)
        O = this.fmtDDMMYYYY(M[$]);
      else if (C)
        O = this.fmtDDMMYYYY(C[S]);
      else {
        const R = vt(y);
        if (R) {
          const I = new Date(U);
          I.setDate(U.getDate() + (R - 1)), O = this.fmtDDMMYYYY(I);
        }
      }
      return c`
                    <th class=${F} style=${`--sp-hl:${g};`}>
                      <div>${y}</div>
                      ${t.show_header_date !== !1 ? c`<div class="thDate">${O}</div>` : c``}
                      ${lt[$]?.length ? c`<div class="holidayDay" title=${lt[$].map((R) => R.title).join(", ")}>Ferien</div>` : b}
                      ${Oe?.[$] ? Ht.get(this.fmtYMD(Oe[$])) ? c`<div class="thUpdated">(aktualisiert: ${Ht.get(this.fmtYMD(Oe[$]))})</div>` : c`` : H?.[S] ? c`<div class="thUpdated">(aktualisiert: ${H[S]})</div>` : c``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${ve.length + (f ? 1 : 0)}>${this._noDataMsg}</td></tr>` : t.hidden_subjects?.length && n.length && !$e.length ? c`<tr class="nodata"><td class="nodataCell" colspan=${ve.length + (f ? 1 : 0)}>Keine Einträge nach Filterung.</td></tr>` : $e.map((y, $) => {
      if (E(y)) {
        const xe = _e(y.time), N = !!xe.start && !!xe.end && this.isNowBetween(xe.start, xe.end), T = !!t.highlight_breaks && N;
        let B = `--sp-hl:${h};`, Ue = "";
        return T && (B += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", Ue += `--sp-hl:${h}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), T && t.highlight_current_time_text && p && (B += `color:${p};`), c`
                    <tr class="break">
                      ${f ? c`<td class="time" style=${B}>${Object.values(ii(y.time)).filter(Boolean).join(" ")}</td>` : c``}
                      <td colspan=${ve.length} style=${Ue} @click=${(ke) => this.handlePreviewCell(t, ke, $, -1, He)}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const S = y, F = S.cells ?? [], O = S.cell_styles ?? [], R = this.getManualRowForDate(t, S, $, He), I = (R?.cell_times ?? S.cell_times)?.[We] ?? null, Ut = I?.time || R?.time || S.time, dt = I?.start || R?.start || S.start, ut = I?.end || R?.end || S.end, ht = Bt && !!dt && !!ut && this.isNowBetween(dt, ut), Ki = r >= 0 ? F[r] ?? "" : "", Ii = se.entries.length ? this.getDatedCell(t, R ?? S, We, L(ct), se.entries).text : r >= 0 ? this.filterCellText(Ki, t) : "", Ji = r >= 0 ? G(Ii) : !1, pt = !(t.free_only_column_highlight && Ji);
      _e(Ut);
      const Lt = ii(Ut, dt, ut), Vt = Lt.range;
      let gt = `--sp-hl:${h};`;
      return pt && t.highlight_current && ht && (gt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), pt && ht && t.highlight_current_time_text && p && (gt += `color:${p};`), c`
                  <tr>
                    ${f ? c`<td class="time" style=${gt}>
                      <div class="timeWrap">
                        <div class="timeSt">${Lt.label}</div>
                        ${Vt ? c`<div class="timeHm">${Vt}</div>` : c``}
                      </div>
                    </td>` : c``}

                    ${ve.map((xe, N) => {
        const T = ne[N], B = this.getManualRowForDate(t, S, $, M?.[N]);
        B?.cells;
        const Ue = B?.cell_styles ?? O, ke = M[N] && this.fmtYMD(M[N]) === this.fmtYMD(/* @__PURE__ */ new Date()), Kt = this.getDatedCell(t, B ?? S, T, L(N), se.entries), Le = Kt.text, It = Ue[T] ?? null, qi = t.highlight_today && ke ? "today" : "", Se = t.merge_double_lessons ? Kn($e, $, (z, W) => {
          const re = this.getManualRowForDate(t, z, W, M?.[N]), Ae = this.getDatedCell(t, re ?? z, T, L(N), se.entries);
          return {
            text: Ae.text,
            notes: Ae.notes,
            style: (re?.cell_styles ?? z?.cell_styles ?? [])[T] ?? null,
            subjectChanges: (re ?? z)?.subject_changes?.[t.days[T]] ?? []
          };
        }) : { covered: !1, span: 1 };
        if (Se.covered) return b;
        const Zi = /\n\s*\n/.test(Le) ? "" : ei(Le, t.subject_colors);
        let Jt = `--sp-hl:${g};` + Zi + Wn(It, d);
        const Yi = !G(Le), Gi = (() => {
          if (!ke || !Bt || T !== We || Se.span <= 1) return !1;
          const z = (B?.cell_times ?? S.cell_times)?.[T] ?? null, W = $ + Se.span - 1, re = $e[W], Ae = this.getManualRowForDate(t, re, W, M?.[N]), Qi = (Ae?.cell_times ?? re?.cell_times)?.[T] ?? null, qt = z?.start || B?.start || S.start, Zt = Qi?.end || Ae?.end || re?.end;
          return !!qt && !!Zt && this.isNowBetween(qt, Zt);
        })(), mt = pt && Yi && (ke && (ht || Gi)) && t.highlight_current_text && u && r >= 0 && T === r ? u : "";
        return mt && (Jt += `color:${mt};`), c`<td class=${qi} style=${Jt} rowspan=${Se.span} @mouseenter=${(z) => this.updatePreviewTooltip(t, z)} @click=${(z) => this.handlePreviewCell(t, z, $, T, L(N), Se.span)}>${this.renderCell(Le, t, !!It, mt, (B ?? S)?.subject_changes?.[t.days[T]] ?? [])}${Kt.notes.map((z) => c`<div class="datedNote" style=${bi(z)}
          title=${P(this) ? "Hinweis bearbeiten" : b}
          role=${P(this) ? "button" : b} tabindex=${P(this) ? "0" : b}
          @click=${(W) => this.handlePreviewNote(t, W, B ?? S, T, L(N), z)}
          @keydown=${(W) => {
          P(this) && (W.key === "Enter" || W.key === " ") && (W.preventDefault(), this.handlePreviewNote(t, W, B ?? S, T, L(N), z));
        }}>${z.text}</div>`)}</td>`;
      })}
                  </tr>
                `;
    })}
            </tbody>
          </table>
          ${Wt.length ? c`<div class="upcomingNotes"><strong>Anstehende Termine</strong>
            ${Wt.map((y) => c`<div class="datedNote" style=${bi(y)}
              title=${P(this) ? "Hinweis bearbeiten" : b}
              role=${P(this) ? "button" : b} tabindex=${P(this) ? "0" : b}
              @click=${($) => this.handlePreviewNote(t, $, { time: y.periods[0] }, 0, /* @__PURE__ */ new Date(`${y.date}T12:00:00`), y)}
              @keydown=${($) => {
      P(this) && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), this.handlePreviewNote(t, $, { time: y.periods[0] }, 0, /* @__PURE__ */ new Date(`${y.date}T12:00:00`), y));
    }}><strong>${y.text}</strong><br>${yi(y).detail}</div>`)}
          </div>` : b}
          ${se.warnings.map((y) => c`<div class="datedWarning" role="status">${y}</div>`)}
          ${this.viewWarning(t, M) ? c`<div class="datedWarning" role="status">${this.viewWarning(t, M)}</div>` : b}
          ${t.holiday_calendar_entity ? (this._holidays?.warnings ?? []).map((y) => c`<div class="datedWarning" role="status">${y}</div>`) : b}
        </div>
      </ha-card>
    `;
  }
  render() {
    if (!this.config) return c``;
    const t = this.config;
    return c`
      ${this.renderCardLayout(t)}
      ${this._uiPopupOpen ? c`
        <div class="popupBackdrop" @click=${(e) => this.closeWeekPopup(e)}>
          <div class="popupShell">
            ${this.renderCardLayout(t, "week", !0)}
          </div>
        </div>
      ` : c``}
    `;
  }
}, Ce.styles = Si`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
    }
    ha-card {
      display: block;
      background: var(--stundenplan-card-background, var(--ha-card-background, var(--card-background-color, white)));
      border-color: var(--stundenplan-divider-color, var(--ha-card-border-color, var(--divider-color, #e0e0e0)));
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    ha-card.tappable {
      cursor: pointer;
    }
    .popupBackdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }
    .popupShell {
      width: min(1400px, calc(100vw - 40px));
      max-height: calc(100vh - 40px);
      overflow: auto;
    }
    ha-card.popupCard {
      cursor: pointer;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
    }

    .headerRow {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 14px 8px 14px;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }
    .titleSpacer {
      flex: 1 1 auto;
      min-width: 0;
    }
    .headRight {
      display: flex;
      align-items: start;
      gap: 10px;
      flex-wrap: nowrap;
    }

    .weekBadgeInline {
      padding: 6px 10px;
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      border-radius: 12px;
      background: var(--stundenplan-header-background, var(--secondary-background-color));
      font-size: 13px;
      opacity: 0.95;
      white-space: nowrap;
    }

    .offsetInline {
      display: flex;
      gap: 8px;
      align-items: start;
      padding: 6px 8px;
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      border-radius: 12px;
      background: var(--stundenplan-header-background, var(--secondary-background-color));
    }
    .btnMini {
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      background: var(--stundenplan-card-background, var(--card-background-color));
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
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: max-content;
      min-width: 100%;
      border-collapse: collapse;
    }
    table.equalColumns {
      width: 100%;
      table-layout: fixed;
    }
    th,
    td {
      padding: 6px;
      text-align: center;
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      vertical-align: middle;
      word-break: normal;
      overflow-wrap: anywhere;
    }
    th {
      background: var(--stundenplan-header-background, var(--secondary-background-color));
      font-weight: 700;
      font-size: var(--stundenplan-font-size-header, inherit);
    }
    td {
      background: var(--stundenplan-row-background, transparent);
    }
    /* A table row's height is a minimum; wrapped content can still grow. */
    tbody tr:not(.break):not(.nodata) {
      height: var(--stundenplan-row-height, auto);
    }
    .break .time {
      font-size: var(--stundenplan-font-size-time, inherit);
    }

    .thDate {
      font-size: 11px;
      opacity: 0.75;
      margin-top: 2px;
      font-weight: 600;
      white-space: nowrap;
    }
    .thUpdated {
      font-size: 10px;
      opacity: 0.7;
      margin-top: 1px;
      white-space: nowrap;
    }

    .holidayBanner {
      margin-bottom: 10px;
      padding: 9px 12px;
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      border-inline-start: 3px solid var(--primary-color, #03a9f4);
      border-radius: 8px;
      background: var(--stundenplan-header-background, var(--secondary-background-color));
      color: var(--primary-text-color);
      overflow-wrap: anywhere;
    }
    .holidayBanner > div { display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: baseline; }
    .holidayBanner span { font-size: 12px; }
    .holidayDay {
      display: inline-block;
      margin-top: 4px;
      padding: 2px 4px;
      border: 1px solid currentColor;
      border-radius: 4px;
      font-size: 11px;
      line-height: 1.2;
    }

    .time {
      font-weight: 700;
      white-space: normal;
      width: 125px;
    }
    .timeWrap {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 2px;
      justify-items: center;
      line-height: 1.1;
    }
    .timeSt, .timeHm {
      min-width: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
    .timeSt {
      font-size: var(--stundenplan-font-size-time, 13px);
      font-weight: 800;
    }
    .timeHm {
      font-size: var(--stundenplan-font-size-time, 11px);
      font-weight: 650;
      opacity: 0.85;
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
    .cellMulti {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: flex-start;
    }
    .cellMulti > * + * {
      border-left: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      padding-left: 10px;
    }
    .cellMulti .cellWrap {
      flex: 1 1 0;
      min-width: 0;
    }
    .subjectChange { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; min-width: 0; flex: 1 1 0; overflow-wrap: anywhere; }
    .subjectChange > * { min-width: 0; }
    .subjectChange > * + * { border-left: 1px solid var(--stundenplan-divider-color, var(--divider-color)); padding-left: 8px; }
    .subjectChangeOriginal .fach, .subjectChangeOriginal .cellText { text-decoration: line-through; }
    .subjectChangeLabel { font-size: 10px; font-weight: normal; opacity: 0.8; margin-bottom: 4px; }
    .subjectColorBlock { flex: 1 1 0; min-width: 0; padding: 4px; border-radius: 4px; }
    td.today .subjectColorBlock { box-shadow: inset 0 0 0 9999px var(--sp-hl); }
    .fach {
      font-weight: 800;
      font-size: var(--stundenplan-font-size-subject, 14px);
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
    table.equalColumns .fach {
      white-space: normal;
    }
    .raum,
    .lehrer {
      font-size: var(--stundenplan-font-size-details, 12px);
      opacity: 0.9;
      white-space: nowrap;
    }

    .datedNote { margin-top: 6px; padding: 3px 5px; border: 1px solid var(--divider-color); border-radius: 4px; font-size: var(--stundenplan-font-size-details, 12px); font-weight: 500; overflow-wrap: anywhere; }
    .datedWarning { margin-top: 8px; font-size: 12px; overflow-wrap: anywhere; }
    .upcomingNotes { margin-top: 14px; text-align: left; }
    .notes {
      margin-top: 4px;
      display: grid;
      gap: 3px;
      justify-items: center;
      width: 100%;
      text-align: center;
    }
    .note {
      display: block;
      text-align: center;
      font-size: var(--stundenplan-font-size-details, 11px);
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
      font-size: var(--stundenplan-font-size-subject, inherit);
    }
  

    tr.nodata td {
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      background: var(--stundenplan-row-background, var(--secondary-background-color));
    }
    .nodataCell {
      text-align: center;
      padding: 18px 10px;
      opacity: 0.85;
      font-style: italic;
      white-space: normal;
    }
    ha-card.compact .headerRow {
      padding: 10px 10px 4px 10px;
      gap: 8px;
    }
    ha-card.compact .title {
      font-size: var(--stundenplan-font-size-title-compact, 16px) !important;
      line-height: 1.1;
    }
    ha-card.compact .headRight {
      gap: 6px;
    }
    ha-card.compact .weekBadgeInline,
    ha-card.compact .offsetInline {
      padding: 4px 6px;
      border-radius: 10px;
      font-size: 11px;
    }
    ha-card.compact .btnMini {
      padding: 4px 8px;
    }
    ha-card.compact .card {
      padding: 8px 8px 10px 8px;
    }
    ha-card.compact th,
    ha-card.compact td {
      padding: 4px;
    }
    ha-card.compact .time {
      width: 102px;
    }
    ha-card.compact .thDate {
      font-size: 10px;
      margin-top: 1px;
    }
    ha-card.compact .thUpdated {
      font-size: 9px;
      margin-top: 0;
    }
    ha-card.compact .timeSt {
      font-size: var(--stundenplan-font-size-time, 12px);
    }
    ha-card.compact .timeHm {
      font-size: var(--stundenplan-font-size-time, 10px);
    }
    ha-card.compact .cellWrap {
      gap: 1px;
      line-height: 1.08;
    }
    ha-card.compact .fach {
      font-size: var(--stundenplan-font-size-subject, 12px);
    }
    ha-card.compact .raum,
    ha-card.compact .lehrer {
      font-size: var(--stundenplan-font-size-details, 11px);
    }
    ha-card.compact .notes {
      margin-top: 2px;
      gap: 2px;
    }
    ha-card.compact .note {
      font-size: var(--stundenplan-font-size-details, 10px);
      padding: 2px 4px;
      border-radius: 7px;
    }
    ha-card.compact .dot {
      font-size: 11px;
    }
    ha-card.customHeaderGap .headerRow {
      padding-bottom: var(--stundenplan-header-table-gap);
    }
    ha-card.customHeaderGap .headerRow + .card {
      padding-top: 0;
    }
`, Ce);
Je = /* @__PURE__ */ new WeakMap();
qe = /* @__PURE__ */ new WeakMap();
Ze = /* @__PURE__ */ new WeakMap();
Ye = /* @__PURE__ */ new WeakMap();
Ge = /* @__PURE__ */ new WeakMap();
Qe = /* @__PURE__ */ new WeakMap();
Xe = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
V([
  Ti({ attribute: !1 })
], K.prototype, "hass", 1);
V([
  ie()
], K.prototype, "config", 1);
V([
  ie()
], K.prototype, "_rowsCache", 1);
V([
  ie()
], K.prototype, "_noData", 1);
V([
  ie()
], K.prototype, "_noDataMsg", 1);
V([
  ie()
], K.prototype, "_jsonRows", 1);
V([
  ie()
], K.prototype, "_jsonStatus", 1);
V([
  ie()
], K.prototype, "_jsonError", 1);
let Te = K;
function P(t) {
  for (let e = t; e; e = e.parentNode ?? e.host)
    if (e.localName === "hui-dialog-edit-card") return e;
  return null;
}
function it(t, e, i) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function Y(t, e = !1) {
  if (typeof t == "boolean") return t;
  if (t == null) return e;
  const i = String(t).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : e;
}
function In(t) {
  return (t ?? "").split(",").map((e) => e.trim()).filter((e) => e.length > 0);
}
function Jn(t) {
  return (t ?? []).map((e) => (e ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Dt = class extends fe {
  constructor() {
    super(...arguments), this._unsubEntities = null, this._didSubEntities = !1, this._open = {
      general: !1,
      rolling: !1,
      filters: !1,
      holidays: !1,
      typography: !1,
      appearance: !1,
      highlights: !1,
      colors: !1,
      sources: !1,
      manual: !1
    }, this._uiLoaded = !1, this._stopEvent = (e) => {
      try {
        e?.stopPropagation?.();
      } catch {
      }
    }, this._rowOpen = {}, this._showCellStyles = !1, this._manualWeek = "A", this._onPreviewCell = (e) => this.openPreviewCell(e), this._onPreviewNote = (e) => this.openPreviewNote(e), this._onPreviewTooltip = (e) => {
      JSON.stringify(e.detail.config) === JSON.stringify(this._config) && (this._open.dates && (e.detail.text = "Termin oder Hinweis hinzufügen"), e.stopPropagation());
    }, this._datedToday = k(/* @__PURE__ */ new Date());
  }
  connectedCallback() {
    super.connectedCallback(), this._previewDialog = P(this), this._previewDialog?.addEventListener("stundenplan-edit-cell", this._onPreviewCell), this._previewDialog?.addEventListener("stundenplan-add-note", this._onPreviewNote), this._previewDialog?.addEventListener("stundenplan-preview-tooltip", this._onPreviewTooltip), this.ensureUiLoaded(), this.ensureEntitySubscription(), this.refreshDatedDay(), this._datedDayTimer = window.setInterval(() => this.refreshDatedDay(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._previewDialog?.removeEventListener("stundenplan-edit-cell", this._onPreviewCell), this._previewDialog?.removeEventListener("stundenplan-add-note", this._onPreviewNote), this._previewDialog?.removeEventListener("stundenplan-preview-tooltip", this._onPreviewTooltip), this._previewDialog = null, this._datedDraftEntry = null, this._datedReplacementDraft = null, window.clearInterval(this._datedDayTimer), this._datedDayTimer = void 0;
    try {
      this._unsubEntities?.();
    } catch {
    }
    this._unsubEntities = null, this._didSubEntities = !1;
  }
  refreshDatedDay() {
    const e = k(/* @__PURE__ */ new Date());
    e !== this._datedToday && (this._datedToday = e, this.requestUpdate());
  }
  async openPreviewNote(e) {
    const { config: i, date: n, period: s, note: r, sourceText: a } = e.detail ?? {};
    if (!(!this._config || JSON.stringify(i) !== JSON.stringify(this._config) || !te(n) || !s) && !(!r && this._config.source_type === "manual" && !this._open.dates)) {
      if (e.preventDefault(), e.stopPropagation(), this._open = { ...this._open, dates: !0 }, this._datedReadOnly = !1, r) {
        const o = /* @__PURE__ */ new Date(`${n}T12:00:00`), l = (this._config.dated_entries ?? []).findIndex((u) => {
          const p = $t({ dated_entries: [u] }).entries;
          return xt(a, { time: s }, 0, o, p).notes.some((m) => m.text === r.text && (m.color || "") === (r.color || "") && (m.background || "") === (r.background || ""));
        });
        if (l < 0) {
          this._datedReadOnly = !0, this.requestUpdate();
          return;
        }
        this._datedOpen = l, this.requestUpdate(), await this.updateComplete;
        const d = this.shadowRoot.querySelector(`[data-entry-index="${l}"]`), g = d?.closest(".pastDatedEntries");
        g && (g.open = !0);
        const h = d?.querySelector("input[data-note-text]");
        h?.scrollIntoView({ block: "nearest" }), h?.focus({ preventScroll: !0 });
        return;
      }
      await this.addDatedNote(n, s);
    }
  }
  async addDatedNote(e, i) {
    this._datedDraftEntry ?? (this._datedDraftEntry = { action: "note", match: "period", text: "", dates: [], periods: [] }), this._datedOpen = -1, this.updateDatedEntry(-1, { ...e ? { dates: [e] } : {}, ...i ? { periods: [i] } : {} }), await this.updateComplete;
    const n = this.shadowRoot.querySelector(`[data-entry-index="${this._datedOpen}"] input[data-note-text]`);
    n?.scrollIntoView({ block: "nearest" }), n?.focus({ preventScroll: !0 });
  }
  async openPreviewCell(e) {
    const { config: i, rowIndex: n, dayIndex: s, week: r } = e.detail ?? {};
    if (!this._config || this._config.source_type !== "manual" || JSON.stringify(i) !== JSON.stringify(this._config)) return;
    const o = (r === "B" ? this._config.rows_b : this._config.rows)?.[n];
    if (!o || !Number.isInteger(n) || !E(o) && (!Number.isInteger(s) || s < 0 || s >= this._config.days.length) || (e.stopPropagation(), this._manualWeek = r === "B" ? "B" : "A", this._open = { ...this._open, manual: !0 }, this._rowOpen = { [n]: !0 }, this.requestUpdate(), await this.updateComplete, !this.isConnected)) return;
    const l = this.shadowRoot.querySelectorAll(".rowPanel")[n], d = E(o) ? l?.querySelector('ha-input[label="Pausentext"]') : l?.querySelectorAll(".lessonArea")[s];
    d?.scrollIntoView({ block: "nearest", inline: "nearest" }), d?.focus({ preventScroll: !0 });
  }
  async ensureEntitySubscription() {
    if (this._didSubEntities) return;
    const e = this.hass;
    if (!(!e || !e.connection))
      try {
        const i = e.connection.subscribeEntities;
        typeof i == "function" && (this._didSubEntities = !0, this._unsubEntities = await i(() => {
        }));
      } catch {
        this._didSubEntities = !0, this._unsubEntities = null;
      }
  }
  async ensureUiLoaded() {
    if (!this._uiLoaded) {
      this._uiLoaded = !0;
      try {
        await window.loadCardHelpers?.();
      } catch {
      }
      setTimeout(() => this.requestUpdate(), 0), this.ensureEntitySubscription();
    }
  }
  setConfig(e) {
    this.ensureUiLoaded();
    const i = ((e?.type ?? "") + "").toString();
    if (i !== "custom:stundenplan-card" && i !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${i}`);
    this._config = this.normalizeConfig(this.clone(e));
  }
  normalizeConfig(e) {
    return new Te().normalizeConfig(e);
  }
  clone(e) {
    try {
      return structuredClone(e);
    } catch {
      return JSON.parse(JSON.stringify(e));
    }
  }
  emit(e) {
    this._config = e, it(this, "config-changed", { config: e });
  }
  setValue(e, i) {
    this._config && this.emit({ ...this._config, [e]: i });
  }
  toggleOpen(e) {
    this._open = { ...this._open, [e]: !this._open[e] };
  }
  findBestRowsAttribute(e) {
    const i = this.hass?.states?.[e]?.attributes ?? {};
    return i.rows_ha != null ? { attr: "rows_ha", timeKey: "time" } : i.rows != null ? { attr: "rows", timeKey: "time" } : i.rows_table != null ? { attr: "rows_table", timeKey: "time" } : i.rows_json != null ? { attr: "rows_json", timeKey: "time" } : { attr: "rows_ha", timeKey: "time" };
  }
  setSourceType(e) {
    if (!this._config) return;
    const i = e === "entity" || e === "json" || e === "manual" || e === "sensor" ? e : "manual", n = { ...this._config, source_type: i };
    i === "json" && n.json_url == null && (n.json_url = ""), i === "entity" && (n.source_entity == null && (n.source_entity = ""), n.source_attribute = "rows_table", n.source_time_key = "time"), i === "sensor" && (n.source_entity == null && (n.source_entity = ""), n.source_entity_integration = "", n.source_attribute = (n.source_attribute ?? "").toString().trim() || "plan", n.source_time_key = (n.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(n);
  }
  setSourceEntity(e) {
    if (!this._config) return;
    const i = (e ?? "").toString().trim(), n = (this._config.source_type ?? "manual").toString();
    if (n === "sensor") {
      this.emit({
        ...this._config,
        source_type: "sensor",
        source_entity: i,
        source_entity_legacy: i
      });
      return;
    }
    if (n === "entity") {
      const s = (i ?? "").toString().trim();
      let r = "";
      s && (r = this.hass?.states?.[s]?.attributes?.week_offset_entity || Pi(s)), this.emit({
        ...this._config,
        source_type: "entity",
        source_entity: i,
        source_entity_integration: i,
        source_attribute: "rows_table",
        source_time_key: "time",
        week_offset_entity: r
      });
      return;
    }
    this.emit({
      ...this._config,
      source_entity: i
    });
  }
  setJsonUrl(e) {
    this._config && this.emit({
      ...this._config,
      source_type: "json",
      json_url: (e ?? "").toString()
    });
  }
  renderSection(e, i, n) {
    const s = !!this._open[i], r = {
      general: ["Titel, Schultage und die grundlegende Ansicht.", "M4 5h16M4 12h16M4 19h16M8 3v4M16 10v4M10 17v4"],
      sources: ["Woher dein Stundenplan kommt.", "M4 4h16v5H4zM4 15h16v5H4zM8 9v6M16 9v6"],
      manual: ["Fächer, Zeiten und Pausen selbst eintragen.", "M4 4h16v16H4zM4 9h16M9 4v16M9 14h11"],
      filters: ["Fächer/Angebote gezielt ausblenden.", "M3 4h18l-7 8v7l-4 2v-9z"],
      dates: ["Klassenarbeiten und Erinnerungen nach Datum und Stunde.", "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M8 15h8M12 12v6"],
      holidays: ["Ferien aus einem Kalender im Stundenplan kennzeichnen.", "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M8 15l3 3 5-5"],
      replacements: ["Fächer an ausgewählten Tagen ersetzen, z. B. Schwimmen durch Sport.", "M4 7h14l-3-3M20 17H6l3 3M18 7l-3 3M6 17l3-3"],
      rolling: ["Ganze Woche oder ab heute: Ansicht und Zeitraum wählen.", "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M9 15h6M13 13l2 2-2 2"],
      typography: ["Textgrößen und Abstände deiner Karte.", "M3 5h12M9 5v15M6 20h6M15 12h6M18 12v8"],
      highlights: ["Heute, aktuellen Unterricht und Pausen hervorheben.", "M12 3l3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1z"],
      colors: ["Farben und Transparenz der Hervorhebungen.", "M12 3C8 8 5 11 5 15a7 7 0 0 0 14 0c0-4-3-7-7-12zM8 15a4 4 0 0 0 4 4"],
      appearance: ["Kartenflächen, Tabellenlinien und Transparenz.", "M3 4h18v16H3zM3 9h18M3 14h18M9 9v11"]
    }, [a, o] = r[i] ?? ["", "M4 4h16v16H4z"];
    return c`
      <div class="section" data-section=${i}>
        <button type="button" class="sectionHead" aria-expanded=${String(s)} aria-controls=${`section-${i}`} @click=${() => this.toggleOpen(i)}>
          <svg class="sectionIcon" viewBox="0 0 24 24" aria-hidden="true"><path d=${o}></path></svg>
          <span class="sectionLabels"><span class="sectionTitle">${e}</span><span class="sectionDescription">${a}</span></span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d=${s ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"}></path></svg>
        </button>
        ${s ? c`<div class="sectionBody" id=${`section-${i}`}>${n}</div>` : c``}
      </div>
    `;
  }
  getFilterSubjects() {
    const e = this._config;
    let i = [];
    if ((e.source_type ?? "manual") === "manual")
      i = [...e.rows ?? [], ...e.week_mode === "kw_parity" ? e.rows_b ?? [] : []];
    else if (e.source_type !== "json") {
      const s = new Te();
      s.hass = this.hass, i = s.getRowsResolved(e);
    }
    const n = [...e.hidden_subjects ?? []];
    for (const s of i ?? [])
      if (!E(s))
        for (const r of s.cells ?? [])
          for (const a of String(r).split(/\r?\n\s*\r?\n/)) {
            const o = Ri(a);
            o && !/^[\s—–-]+$/.test(o) && n.push(o);
          }
    return tt(n).sort((s, r) => s.localeCompare(r, "de"));
  }
  renderFilterSettings() {
    if (!this._open.filters) return this.renderSection("Inhalte filtern", "filters", b);
    const e = this._config.hidden_subjects ?? [], i = this.getFilterSubjects(), n = new Te();
    n.hass = this.hass;
    const s = un(this.hass, this._config, n.getActiveWeek(this._config)), r = this.renderCardSubjectFilters(e, i, !!s);
    return this.renderSection("Inhalte filtern", "filters", c`
      ${s ? c`<div class="infoBox suiteFilters" data-suite-filters>
        <strong>Bereits durch die Suite ausgeblendet</strong>
        ${s.courses === null ? c`<p>Diese Suite-Version übermittelt noch keine Liste der ausgeblendeten Kurse.</p>` : s.courses.length ? c`<ul style="margin:8px 0;padding-left:20px;overflow-wrap:anywhere">
            ${s.courses.map((a) => c`<li>${a.label}</li>`)}
          </ul>` : c`<p>In der Suite sind keine Kurse ausgeblendet.</p>`}
        <div>Die Kursauswahl verwaltest du in den Einstellungen der Stundenplan Suite. Sie gilt für alle Karten mit dieser Quelle.</div>
      </div>
      <details class="additionalCardFilters">
        <summary>Zusätzliche Filter nur für diese Karte${e.length ? c`<span class="hint">${e.length} Fächer/Angebote zusätzlich ausgeblendet</span>` : b}</summary>
        ${r}
      </details>` : r}
    `);
  }
  renderCardSubjectFilters(e, i, n) {
    return c`
      <div class="hint">Wähle die Fächer/Angebote aus, an denen dein Kind nicht teilnimmt. Nur diese Karte wird gefiltert; die Quelldaten bleiben unverändert.</div>
      ${i.length ? c`<div class="subjectChoices" role="group" aria-label="Zum Ausblenden auswählen">
        ${i.map((s) => c`<label class="subjectChoice">
          <input type="checkbox" .checked=${e.some((r) => le(r) === le(s))}
            @change=${(r) => this.setValue("hidden_subjects", r.target.checked ? tt([...e, s]) : e.filter((a) => le(a) !== le(s)))}>
          <span>${s}</span>
        </label>`)}
      </div>` : c`<div class="hint">Keine Fächer/Angebote in der aktuellen Quelle gefunden. Du kannst sie unten selbst ergänzen.</div>`}
      <form class="subjectAdd" @submit=${(s) => {
      s.preventDefault();
      const r = s.currentTarget.elements.namedItem("subject");
      r.value.trim() && (this.setValue("hidden_subjects", tt([...e, r.value])), r.value = "");
    }}>
        <label>Fächer/Angebote ergänzen<input name="subject" type="text" placeholder="z. B. Ess/Spi GT" autocomplete="off"></label>
        <button type="submit" class="spBtn">Hinzufügen</button>
      </form>
      <div class="hint">Verglichen wird der vollständige Fachname in der ersten Zeile, nicht Raum, Lehrkraft oder Hinweise. Groß-/Kleinschreibung spielt keine Rolle. Neue Namen werden nicht automatisch ausgewählt.</div>
      ${e.length ? c`<div class="infoBox slim">${e.length} Fächer/Angebote ausgeblendet. Vollständig leere Endzeilen werden gekürzt. „Nach der letzten Stunde“ berücksichtigt nur die verbleibenden Einträge des jeweiligen Tages.</div>
        <button type="button" class="spBtn" @click=${() => this.setValue("hidden_subjects", [])}>${n ? "Kartenfilter zurücksetzen" : "Alle Einträge wieder anzeigen"}</button>` : b}
    `;
  }
  updateDatedEntry(e, i) {
    if (e === -1 || e === -2) {
      const s = e === -1 ? "_datedDraftEntry" : "_datedReplacementDraft";
      if (!this[s]) return;
      if (this[s] = { ...this[s], ...i }, nt({ ...this[s], enabled: !0 })) {
        this.requestUpdate();
        return;
      }
      const r = this._config.dated_entries ?? [], a = this[s];
      this[s] = null, this._datedOpen = r.length, this.setValue("dated_entries", [...r, a]);
      return;
    }
    const n = [...this._config.dated_entries ?? []];
    n[e] = { ...n[e], ...i }, this.setValue("dated_entries", n);
  }
  renderDatedSettings(e = "note") {
    const i = e === "replace", n = i ? "replacements" : "dates", s = i ? "Fachabweichungen an bestimmten Tagen" : "Termine und Hinweise eintragen";
    if (!this._open[n]) return this.renderSection(s, n, b);
    const r = this._config, a = r.dated_entries ?? [], o = a.map((u, p) => ({ raw: u, index: p })).filter(({ raw: u }) => u?.action === "replace" === i), l = o.filter(({ raw: u }) => !Qt(u, this._datedToday));
    !i && this._datedDraftEntry && l.push({ raw: this._datedDraftEntry, index: -1 }), i && this._datedReplacementDraft && l.push({ raw: this._datedReplacementDraft, index: -2 });
    const d = o.filter(({ raw: u }) => Qt(u, this._datedToday)), g = (u) => Array.isArray(u) ? u.join(", ") : typeof u == "string" ? u : "", h = ({ raw: u, index: p }) => {
      const m = u && typeof u == "object" ? u : {}, A = nt(u), x = ue(m), w = yi(m, this._datedToday);
      return c`<details class="datedEntry" data-entry-index=${p} .open=${this._datedOpen === p}>
          <summary><span class="datedTitle">${i ? `${m.subject || "Fach"} → ${m.text || "Neuer Fachname"}` : w.title}</span><span class="datedMeta">${p < 0 ? "Entwurf · " : ""}${w.detail}</span>
            <button type="button" class="datedRemove" aria-label=${p < 0 ? "Entwurf verwerfen" : "Eintrag entfernen"}
              title=${p < 0 ? "Entwurf verwerfen" : `${w.title} entfernen`} @click=${(f) => {
        if (f.preventDefault(), f.stopPropagation(), this._datedOpen = -1, p < 0) {
          this[p === -1 ? "_datedDraftEntry" : "_datedReplacementDraft"] = null, this.requestUpdate();
          return;
        }
        this.setValue("dated_entries", a.filter((_, v) => v !== p));
      }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
          </summary>
          <div class="datedFields">
            ${p < 0 ? c`<div class="hint">${i ? "Noch nicht übernommen. Erst mit ursprünglichem Fach, neuem Fachnamen und Datum wird daraus eine Abweichung." : "Noch nicht übernommen. Erst mit Text, Datum und Stunde wird daraus ein Termin. Weitere Fachklicks ändern nur diesen Entwurf."}</div>` : b}
            <label class="subjectChoice"><input type="checkbox" .checked=${m.enabled !== !1}
              @change=${(f) => this.updateDatedEntry(p, { enabled: f.target.checked })}><span>Aktiv</span></label>
            ${i ? c`<label>Ursprüngliches Fach<input type="text" .value=${m.subject ?? ""} placeholder="z. B. Sport oder Mathe"
              @change=${(f) => this.updateDatedEntry(p, { subject: f.target.value })}></label>` : x ? b : c`<details class="legacyAssignment"><summary>Bisherige Fachzuordnung: ${m.subject || "nicht angegeben"}</summary>
              <div class="datedFields"><div class="hint">Dieser ältere Eintrag gilt weiterhin nur beim gewählten Fach. Für die Umstellung Unterrichtsstunden angeben; danach gilt er dort unabhängig vom Fachnamen.</div>
              <label>Fach für bisherigen Eintrag<input type="text" .value=${m.subject ?? ""} @change=${(f) => this.updateDatedEntry(p, { subject: f.target.value })}></label>
              <button type="button" class="spBtn" ?disabled=${!g(m.periods).trim()} @click=${() => {
        const f = { ...m, match: "period" };
        delete f.subject;
        const _ = [...a];
        _[p] = f, this.setValue("dated_entries", _);
      }}>Auf Datum und Stunde umstellen</button></div>
            </details>`}
            <label>${m.action === "replace" ? "Neuer Fachname" : "Termin / Hinweis"}<input type="text" data-note-text .value=${m.text ?? ""}
              placeholder=${m.action === "replace" ? "z. B. Schwimmen" : "z. B. Schulaufgabe"}
              @change=${(f) => this.updateDatedEntry(p, { text: f.target.value })}></label>
            <label>${x ? "Unterrichtsstunden" : "Stunden (optional)"}<input type="text" .value=${g(m.periods)} placeholder="z. B. 1, 2"
              @change=${(f) => this.updateDatedEntry(p, { periods: f.target.value })}></label>
            <div class="hint">${x ? "Nummern der Unterrichtsstunden, z. B. 1 oder 1, 2. Der Termin gilt dort unabhängig vom Fachnamen." : "Leer lassen = alle Stunden des gewählten Fachs. Für einzelne Unterrichtsstunden z. B. 1, 2 eintragen."}</div>
            <div class="dateAdd"><label>Datum auswählen<input type="date" aria-label="Datum auswählen"></label>
              <button type="button" class="spBtn" @click=${(f) => {
        const _ = f.currentTarget.parentElement.querySelector("input");
        if (!_.value || !_.checkValidity()) {
          _.reportValidity();
          return;
        }
        const v = g(m.dates ?? m.date).split(/[,;\n]/).map((j) => j.trim()).filter(Boolean);
        this.updateDatedEntry(p, { dates: [.../* @__PURE__ */ new Set([...v, _.value])] });
      }}>Datum hinzufügen</button>
            </div>
            <label>Termine (JJJJ-MM-TT, mit Komma getrennt)<textarea rows="2" .value=${g(m.dates ?? m.date)}
              @change=${(f) => this.updateDatedEntry(p, { dates: f.target.value })}></textarea></label>
            ${m.action !== "replace" ? c`<details class="datedColors"><summary>Hinweisfarben (optional)</summary>
              <div class="datedFields">
                <div class="hint">Färbt nur den Hinweis, nicht die Fachzelle. Ohne Auswahl bleibt die bisherige Darstellung erhalten.</div>
                ${this.renderColorPicker("Hinweis: Text", ce(m.color), (f) => this.updateDatedEntry(p, { color: ce(f) }), "#ffffff")}
                ${this.renderColorPicker("Hinweis: Hintergrund", ce(m.background), (f) => this.updateDatedEntry(p, { background: ce(f) }), "#ffeb3b", 0.25)}
              </div>
            </details>` : b}
            ${A ? c`<div class="hint" role="status">${A} Dieser Eintrag wird noch nicht angewendet.</div>` : b}
          </div>
        </details>`;
    };
    return this.renderSection(s, n, c`
      ${i ? b : c`<div class="datedFields">
        ${this.isHaEntityPickerAvailable() ? c`<ha-entity-picker
          .hass=${this.hass} .value=${r.calendar_entity ?? ""} .includeDomains=${["calendar"]}
          .label=${"Kalender für Termine (optional)"} .allowCustomEntity=${!1}
          @value-changed=${(u) => {
      u.stopPropagation(), this.setValue("calendar_entity", u.detail?.value ?? "");
    }}
        ></ha-entity-picker>` : c`<label>Kalender für Termine (optional)<select aria-label="Kalender für Termine (optional)"
          .value=${r.calendar_entity ?? ""} @change=${(u) => this.setValue("calendar_entity", u.target.value)}>
          <option value="">Kein Kalender</option>
          ${Object.keys(this.hass?.states ?? {}).filter((u) => u.startsWith("calendar.")).sort().map((u) => c`<option value=${u} ?selected=${r.calendar_entity === u}>${this.hass.states[u].attributes?.friendly_name ?? u}</option>`)}
        </select></label>`}
        <div class="hint">Ganztägige Einzeltermine im Kalender anlegen, z. B. „Mathearbeit [3,4]“ für die 3. und 4. Stunde oder „Pasta [Essen]“ für die Zeile „Essen“ in der Stundenspalte. Die nächsten 60 Tage werden alle 5 Minuten geladen, auch ohne vorliegenden Stundenplan. Kein zusätzlicher Sensor nötig. Termine bitte im Kalender bearbeiten.</div>
      </div>`}
      ${i ? b : c`${this.renderToggle("show_upcoming_notes", "Anstehende Termine unter der Tabelle anzeigen")}
        <div class="hint">Standardmäßig aus. Hinweise in den Unterrichtsstunden bleiben sichtbar; gespeicherte Termine werden nicht gelöscht.</div>`}
      <div class="hint">${i ? "Gib das ursprüngliche Fach und den neuen Fachnamen ein, z. B. Schwimmen → Sport. Wähle die Tage, an denen die Änderung gelten soll. Die Quelldaten bleiben unverändert; kein automatischer Zweiwochenwechsel." : "Klicke auf „+ Termin hinzufügen“ oder auf ein Fach in der Vorschau, um einen Termin oder Hinweis anzulegen. Zukünftige Termine sind auch ohne geladenen Stundenplan über die Datumseingabe möglich. Vorhandene Hinweise kannst du zum Bearbeiten anklicken."}</div>
      ${!i && this._datedReadOnly ? c`<div class="hint" role="status">Dieser Hinweis gehört zu keinem lokalen Termin. Hinweise aus einem Kalender oder einer Sensorquelle bitte dort bearbeiten.</div>` : b}
      ${!i && r.source_type === "manual" ? c`<div class="hint">Solange dieser Bereich geöffnet ist, legt ein Vorschauklick einen Termin an. Zum Bearbeiten der Fächer diesen Bereich schließen.</div>` : b}
      ${l.length ? b : c`<div class="infoBox slim">${i ? "Keine aktuellen oder zukünftigen Abweichungen." : r.calendar_entity || r.dated_entries_entity ? "Keine aktuellen oder zukünftigen manuell eingetragenen Hinweise." : "Keine aktuellen oder zukünftigen Hinweise."}</div>`}
      ${l.map(h)}
      <button type="button" class="spBtn" @click=${async () => {
      if (!i) {
        await this.addDatedNote();
        return;
      }
      this._datedReplacementDraft ?? (this._datedReplacementDraft = { action: e, subject: "", text: "", dates: [] }), this._datedOpen = -2, this.requestUpdate(), await this.updateComplete;
      const u = this.shadowRoot.querySelector('[data-entry-index="-2"] input[type="text"]');
      u?.focus(), u?.scrollIntoView({ block: "nearest" });
    }}>${i ? "+ Abweichung hinzufügen" : "+ Termin hinzufügen"}</button>
      ${d.length ? c`<details class="pastDatedEntries">
        <summary>Vergangene Termine (${d.length})</summary>
        <div class="hint">Alle Termine dieser Einträge liegen vor heute. Sie bleiben bearbeitbar und im früheren Stundenplan sichtbar. Ein neuer zukünftiger Termin macht einen Eintrag wieder aktuell.</div>
        ${d.map(h)}
      </details>` : b}
      ${i ? c`<div class="hint">Erkennbare Ausfall- und Vertretungshinweise werden nicht ersetzt. Bei widersprüchlichen Abweichungen bleibt das Original stehen.</div>` : b}
      ${$t(r, this.hass).warnings.map((u) => c`<div class="hint" role="status">${u}</div>`)}
    `);
  }
  renderHolidaySettings() {
    const e = this._config;
    return this._open.holidays ? this.renderSection("Ferien", "holidays", c`<div class="datedFields">
      ${this.isHaEntityPickerAvailable() ? c`<ha-entity-picker
        .hass=${this.hass} .value=${e.holiday_calendar_entity ?? ""} .includeDomains=${["calendar"]}
        .label=${"Ferienkalender (optional)"} .allowCustomEntity=${!1}
        @value-changed=${(i) => {
      i.stopPropagation(), this.setValue("holiday_calendar_entity", i.detail?.value ?? "");
    }}
      ></ha-entity-picker>` : c`<label>Ferienkalender (optional)<select aria-label="Ferienkalender (optional)"
        .value=${e.holiday_calendar_entity ?? ""} @change=${(i) => this.setValue("holiday_calendar_entity", i.target.value)}>
        <option value="">Kein Ferienkalender</option>
        ${Object.keys(this.hass?.states ?? {}).filter((i) => i.startsWith("calendar.")).sort().map((i) => c`<option value=${i} ?selected=${e.holiday_calendar_entity === i}>${this.hass.states[i].attributes?.friendly_name ?? i}</option>`)}
      </select></label>`}
      <div class="hint">Wähle z. B. den Schulmanager-Kalender. Ganztägige Ferieneinträge erscheinen über der Tabelle und an den passenden Tagen, auch wenn sie mehrere Tage dauern. Unterricht und Termine bleiben unverändert.</div>
      <details><summary>Welche Einträge zählen als Ferien?</summary>
        <div class="hint">Nur diese vollständigen Namen werden erkannt (Groß-/Kleinschreibung egal): ${vi.join(", ")}. Elternabende, Ferienbetreuung und andere Schultermine zählen nicht dazu. Der Kalender wird alle 5 Minuten für den angezeigten Zeitraum geprüft.</div>
        <label>Zusätzliche Ferienbezeichnungen<textarea rows="2" aria-label="Zusätzliche Ferienbezeichnungen"
          placeholder="Ein vollständiger Terminname pro Zeile"
          .value=${Fe(e.holiday_extra_titles).join(`
`)}
          @change=${(i) => this.setValue("holiday_extra_titles", Fe(i.target.value))}></textarea></label>
        <div class="hint">Nur eindeutige Bezeichnungen für schulfreie Tage ergänzen. Keine Teilwörter oder allgemeinen Schultermine.</div>
      </details>
    </div>`) : this.renderSection("Ferien", "holidays", b);
  }
  onToggle(e, i) {
    const n = !!e?.target?.checked;
    this.setValue(i, n);
  }
  onText(e, i) {
    if (!this._config) return;
    const n = e?.detail?.value ?? e?.target?.value ?? e?.currentTarget?.value ?? e?.target?.checked ?? "";
    this.emit({
      ...this._config,
      [i]: n
    });
  }
  getManualRowsKey() {
    return this._config?.week_mode === "kw_parity" && this._manualWeek === "B" ? "rows_b" : "rows";
  }
  getManualRows() {
    const e = this.getManualRowsKey();
    return Array.isArray(this._config?.[e]) ? this.clone(this._config[e]) : [];
  }
  emitManualRows(e) {
    if (!this._config) return;
    const i = this.getManualRowsKey();
    this.emit({ ...this._config, [i]: e });
  }
  async scrollToManualRow(e, i) {
    if (await this.updateComplete, !this.isConnected || this._config?.source_type !== "manual" || this.getManualRowsKey() !== i || !this._open.manual) return;
    const n = this.shadowRoot?.querySelectorAll(".rowPanel")[e];
    if (!n?.open) return;
    const s = n.querySelector("summary");
    s?.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" }), s?.focus({ preventScroll: !0 });
  }
  addManualRow() {
    if (!this._config) return;
    const e = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = this.getManualRows(), n = { time: `${i.length + 1}.`, cells: Array.from({ length: e.length }, () => "") };
    this._rowOpen = { ...this._rowOpen, [i.length]: !0 }, i.push(n), this.emitManualRows(i), this.scrollToManualRow(i.length - 1, this.getManualRowsKey());
  }
  insertManualRowBelow(e) {
    if (!this._config) return;
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = this.getManualRows(), s = { time: `${e + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    n.splice(e + 1, 0, s), this.emitManualRows(n);
  }
  insertManualBreakBelow(e) {
    if (!this._config) return;
    const i = this.getManualRows();
    i.splice(e + 1, 0, { break: !0, time: "", label: "Pause" }), this.emitManualRows(i);
  }
  removeManualRow(e) {
    if (!this._config) return;
    const i = this.getManualRows();
    i.splice(e, 1), this.emitManualRows(i);
  }
  updateManualRow(e, i) {
    if (!this._config) return;
    const n = this.getManualRows(), s = n[e];
    n[e] = { ...s, ...i }, this.emitManualRows(n);
  }
  updateManualCell(e, i, n) {
    if (!this._config) return;
    const s = this.getManualRows(), r = s[e];
    if (!r || E(r)) return;
    const a = r, o = Array.isArray(a.cells) ? a.cells.slice() : [];
    o[i] = n, s[e] = { ...a, cells: o }, this.emitManualRows(s);
  }
  addLessonRow() {
    this.addManualRow();
  }
  addBreakRow() {
    if (!this._config) return;
    const e = this.getManualRows();
    this._rowOpen = { ...this._rowOpen, [e.length]: !0 }, e.push({ break: !0, time: "", label: "Pause" }), this.emitManualRows(e), this.scrollToManualRow(e.length - 1, this.getManualRowsKey());
  }
  toggleManualBreak(e, i) {
    if (!this._config) return;
    const n = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = this.getManualRows(), r = s[e];
    if (r) {
      if (i) {
        const a = (r.time ?? "").toString(), o = (r.label ?? "Pause").toString();
        s[e] = { break: !0, time: a, label: o };
      } else {
        const a = (r.time ?? "").toString();
        s[e] = { time: a, start: "", end: "", cells: Array.from({ length: n.length }, () => "") };
      }
      this.emitManualRows(s);
    }
  }
  updateManualCellStyle(e, i, n) {
    if (!this._config) return;
    const s = this.getManualRows(), r = s[e];
    if (!r || E(r)) return;
    const a = r, o = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = o[i] ?? {};
    o[i] = { ...l, ...n }, s[e] = { ...a, cell_styles: o }, this.emitManualRows(s);
  }
  renderManualRows() {
    if (!this._config) return c``;
    const e = this._config, i = e.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = e.week_mode === "kw_parity", s = n && this._manualWeek === "B" ? "B" : "A", r = s === "B" && Array.isArray(e.rows_b) ? e.rows_b : Array.isArray(e.rows) ? e.rows : [];
    return c`
      <div class="manualWeekBox">
        <div class="optRow">
          <div>
            <div class="optTitle">Wechselwochen A/B</div>
            <div class="sub">Zwei manuelle Pläne automatisch nach Kalenderwoche wechseln.</div>
          </div>
          <ha-switch
            .checked=${n}
            @change=${(a) => {
      const o = !!a?.target?.checked, l = Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : this.clone(e.rows ?? []);
      this._manualWeek = "A", this._rowOpen = {}, this.emit({ ...e, week_mode: o ? "kw_parity" : "off", rows_b: l });
    }}
          ></ha-switch>
        </div>

        ${n ? c`
          <ha-form
            .hass=${this.hass}
            .data=${{ week_a_is_even_kw: Y(e.week_a_is_even_kw, !0) }}
            .schema=${[{
      name: "week_a_is_even_kw",
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: !0, label: "Woche A = gerade Kalenderwoche" },
            { value: !1, label: "Woche A = ungerade Kalenderwoche" }
          ]
        }
      }
    }]}
            .computeLabel=${() => "Zuordnung der Woche A"}
            @value-changed=${(a) => {
      const o = a?.detail?.value?.week_a_is_even_kw;
      typeof o == "boolean" && this.setValue("week_a_is_even_kw", o);
    }}
          ></ha-form>

          <div class="manualWeekTabs">
            ${["A", "B"].map((a) => c`
              <button
                type="button"
                class=${`spBtn ${s === a ? "spBtnActive" : ""}`}
                @click=${() => {
      this._manualWeek = a, this._rowOpen = {}, this.requestUpdate();
    }}
              >Woche ${a} bearbeiten</button>
            `)}
          </div>
          <div class="hint">Aktuell bearbeitest du Woche ${s}. Die Karte zeigt automatisch den zur Kalenderwoche passenden Plan.</div>
        ` : c``}
      </div>

      ${r.length ? c`<div class="rowsTop">
        <div class="rowsTitle">Stundenplan${n ? ` · Woche ${s}` : ""}</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Zellfarben</div>
            <ha-switch
              .checked=${!!this._showCellStyles}
              @change=${(a) => {
      this._showCellStyles = !!a?.target?.checked, this.requestUpdate();
    }}
            ></ha-switch>
          </div>

          <button type="button" class="spBtn manualAdd" @click=${this.addLessonRow}>+ Stunde</button>
          <button type="button" class="spBtn manualAdd" @click=${this.addBreakRow}>+ Pause</button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">
        Pro Zeile: Zeit sowie optional Start und Ende. Ein Klick in der Vorschau öffnet direkt die passende Zelle.
      </div>
      ` : c`<div class="manualEmpty">
        <div class="rowsTitle">${n ? `Woche ${s}: Noch keine Einträge` : "Noch keine Stunden angelegt"}</div>
        <div class="hint">Lege zuerst eine Stunde an, um Zeiten und Fächer einzutragen. Die Eingabefelder öffnen sich automatisch.</div>
        <div class="btnBar">
          <button type="button" class="spBtn manualAdd manualAddPrimary" @click=${this.addLessonRow}>Erste Stunde hinzufügen</button>
          <button type="button" class="spBtn manualAdd" @click=${this.addBreakRow}>+ Pause</button>
        </div>
      </div>`}

      ${r.map((a, o) => {
      const l = E(a), d = l ? `Pause · ${(a.time ?? "").toString()}` : `Stunde · ${(a.time ?? "").toString()}`, g = a, h = (g.start ?? "").toString(), u = (g.end ?? "").toString(), p = (a.label ?? "Pause").toString();
      return c`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[o] ?? !1}
            @toggle=${(m) => {
        try {
          this._rowOpen[o] = !!m?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${d || `Zeile ${o + 1}`}</div>
                <div class="rowHeadMeta">${l ? p : `${h || "Start?"} – ${u || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-input
                  label="Zeit / Stunde"
                  .value=${(a.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(m) => this.updateManualRow(o, { time: m?.target?.value ?? "" })}
                ></ha-input>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${l} @change=${(m) => this.toggleManualBreak(o, !!m?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${l ? c`
                    <ha-input
                      label="Pausentext"
                      .value=${p}
                      placeholder="z. B. Große Pause"
                      @input=${(m) => this.updateManualRow(o, { label: m?.target?.value ?? "" })}
                    ></ha-input>
                  ` : c`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-input
                        label="Start (HH:MM)"
                        .value=${h}
                        @input=${(m) => this.updateManualRow(o, { start: m?.target?.value ?? "" })}
                      ></ha-input>
                      <ha-input
                        label="Ende (HH:MM)"
                        .value=${u}
                        @input=${(m) => this.updateManualRow(o, { end: m?.target?.value ?? "" })}
                      ></ha-input>
                    </div>

                    <div class="cellsGrid">
                      ${i.map((m, A) => {
        const x = (g.cells?.[A] ?? "").toString(), w = (Array.isArray(g.cell_styles) ? g.cell_styles?.[A] : void 0) ?? {}, f = typeof w?.bg_alpha == "number" && !Number.isNaN(w.bg_alpha) ? w.bg_alpha : 0.18;
        return c`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${m}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${x}
                              @input=${(_) => this.updateManualCell(o, A, _?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              ${this.renderColorPicker("Hintergrund", ji(w) ?? "", (_) => {
          const v = wt(_);
          this.updateManualCellStyle(o, A, _ ? { bg: _, bg_alpha: v.alpha } : { bg: "", bg_alpha: 0.18 });
        }, "#2196f3", f)}
                              ${this.renderColorPicker("Text", w.color ?? "", (_) => this.updateManualCellStyle(o, A, { color: _ }), "#ffffff")}
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowFoot">
                <div class="rowActions">
                  <button type="button" class="spBtn" @click=${() => this.insertManualRowBelow(o)}>+ Stunde darunter</button>
                  <button type="button" class="spBtn" @click=${() => this.insertManualBreakBelow(o)}>+ Pause darunter</button>
                </div>
                <button type="button" class="spBtn spBtnDanger" @click=${() => this.removeManualRow(o)}>Löschen</button>
              </div>
            </div>
          </details>
        `;
    })}
    `;
  }
  isHaEntityPickerAvailable() {
    return typeof customElements < "u" && !!customElements.get("ha-entity-picker");
  }
  renderToggle(e, i, n = !1) {
    return c`<label class="toggleRow"><span>${i}</span><ha-switch
      .checked=${Y(this._config[e], n)}
      @change=${(s) => this.onToggle(s, e)}></ha-switch></label>`;
  }
  renderColorPicker(e, i, n, s = "#2196f3", r = 1) {
    const a = wt(i, s, r), o = [
      ["#03a9f4", "Blau"],
      ["#009688", "Türkis"],
      ["#4caf50", "Grün"],
      ["#ffeb3b", "Gelb"],
      ["#ff9800", "Orange"],
      ["#f44336", "Rot"],
      ["#e91e63", "Pink"],
      ["#9c27b0", "Violett"],
      ["#ffffff", "Weiß"],
      ["#212121", "Dunkel"]
    ], l = (d, g) => {
      const h = jt(d);
      h && n(`rgba(${h.r}, ${h.g}, ${h.b}, ${Math.round(g * 100) / 100})`);
    };
    return c`<fieldset class="colorPicker">
      <legend>${e}</legend>
      <div class="palette">
        ${o.map(([d, g]) => c`<button type="button" class="swatch"
          style=${`--swatch:${d}`} title=${g} aria-label=${`${e}: ${g}`}
          aria-pressed=${a.hex.toLowerCase() === d}
          @click=${() => l(d, a.alpha)}></button>`)}
        <input type="color" class="customColor" aria-label=${`${e}: eigene Farbe`}
          title="Eigene Farbe" .value=${a.hex} @input=${(d) => l(d.target.value, a.alpha)} />
      </div>
      <label class="opacityControl"><span>Transparenz</span>
        <input type="range" min="0" max="100" aria-label=${`${e}: Transparenz`}
          .value=${String(Math.round((1 - a.alpha) * 100))}
          @input=${(d) => l(a.hex, 1 - Number(d.target.value) / 100)} />
        <output>${Math.round((1 - a.alpha) * 100)}%</output>
      </label>
      <div class="colorFooter"><span class="colorPreview" style=${`background:${i || s}`}></span>
        <button type="button" class="resetColor" @click=${() => n("")}>Zurücksetzen</button>
        <details class="colorAdvanced"><summary>Farbcode</summary>
          <input aria-label=${`${e}: Farbcode`} .value=${i ?? ""}
            @change=${(d) => n(d.target.value)} />
        </details>
      </div>
    </fieldset>`;
  }
  renderConfigColor(e, i, n, s = 1) {
    return this.renderColorPicker(e, this._config[i], (r) => {
      this.setValue(i, r || Te.getStubConfig()[i]);
    }, n, s);
  }
  updateSubjectColor(e, i) {
    const n = [...this._config.subject_colors];
    n[e] = { ...n[e], ...i }, this.setValue("subject_colors", $i(n));
  }
  renderSubjectColors() {
    const e = this._config.subject_colors ?? [];
    return c`<details class="subjectColors">
      <summary>Farben pro Fach</summary>
      <div class="hint">Wähle ein Fach oder trage sein Kürzel wie im Stundenplan ein. Die Farben gelten für alle Datenquellen und bleiben beim Wochenwechsel erhalten. Eigene Zellfarben und Highlights haben Vorrang.</div>
      <datalist id="subject-color-options">${this.getFilterSubjects().map((i) => c`<option value=${i}></option>`)}</datalist>
      <div class="stack">
        ${e.map((i, n) => c`<details class="subjectColorRule" open>
          <summary>${i.subject || "Neues Fach"}</summary>
          <label>Fach / Kürzel<input class="subjectColorName" list="subject-color-options" aria-label="Fach für Farbe" placeholder="z. B. M oder Mathe" .value=${i.subject}
            @change=${(s) => this.updateSubjectColor(n, { subject: s.target.value })}></label>
          ${this.renderColorPicker("Hintergrund", i.background, (s) => this.updateSubjectColor(n, { background: s }), "#03a9f4", 0.25)}
          ${this.renderColorPicker("Text", i.color, (s) => this.updateSubjectColor(n, { color: s }), "#ffffff")}
          <button type="button" class="spBtn" @click=${() => this.setValue("subject_colors", e.filter((s, r) => r !== n))}>Fachfarbe entfernen</button>
        </details>`)}
        <button type="button" class="spBtn" @click=${() => this.setValue("subject_colors", [...e, { subject: "", background: "", color: "" }])}>+ Fachfarbe hinzufügen</button>
      </div>
    </details>`;
  }
  renderAppearanceColor(e) {
    const i = getComputedStyle(this).getPropertyValue(e.theme).trim(), n = wt(i, e.fallback).hex;
    return this.renderColorPicker(e.label, this._config[e.key] ?? "", (s) => {
      const r = { ...this._config }, a = St({ [e.key]: s })[e.key];
      a ? r[e.key] = a : delete r[e.key], this.emit(r);
    }, n);
  }
  renderTypographyInput(e) {
    return c`<ha-input
      label=${e.label} type="number" min=${e.min} max=${e.max} step="1"
      placeholder="Standard" .value=${String(this._config[e.key] ?? "")}
      @change=${(i) => {
      const n = At({ [e.key]: i.target.value })[e.key], s = { ...this._config };
      n == null ? delete s[e.key] : s[e.key] = n, this.emit(s);
    }}
    ></ha-input>`;
  }
  resetTypography() {
    const e = { ...this._config, title_font_size: 20 };
    for (const { key: i } of me) delete e[i];
    this.emit(e);
  }
  renderSourceSettings() {
    const e = this._config;
    return this.renderSection(
      "Datenquellen",
      "sources",
      c`
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{
        source_type: e.source_type ?? "manual"
      }}
                .schema=${[
        {
          name: "source_type",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "manual", label: "Manuell" },
                { value: "entity", label: "Stundenplan Suite (Integration)" },
                ...(e.source_type ?? "manual") === "json" ? [{ value: "json", label: "JSON-Datei (deprecated)" }] : [],
                { value: "sensor", label: "Beliebiger Sensor (JSON)" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "source_type" ? "Quelle" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const n = (i?.detail?.value ?? {}).source_type ?? e.source_type ?? "manual";
          n !== (e.source_type ?? "manual") && this.setSourceType(n);
        } catch (n) {
          console.error("stundenplan-card editor: ha-form value-changed failed", n);
        }
      }}
              ></ha-form>
            </div>

            ${(e.source_type ?? "manual") === "entity" ? c`
                  <div class="hint">Stundenplan Suite: Wochensensor für Stundenplan24 oder Schulmanager auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), n = i.filter((s) => /^sensor\./.test(s) && (/_woche$/i.test(s) || this.hass?.states?.[s]?.attributes?.rows_table != null));
        return i.length < 5 || n.length === 0 ? c`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : c``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.source_entity_integration ?? e.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const s = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !s || /_woche$/i.test(s) || this.hass?.states?.[s]?.attributes?.rows_table != null;
      }}
                      .label=${"Stundenplan Suite Sensor"}
                      @value-changed=${(i) => {
        try {
          const n = i.detail?.value ?? i.target?.value, s = typeof n == "string" ? n : n && typeof n == "object" ? n.entity_id : void 0;
          this.setSourceEntity(s);
        } catch (n) {
          console.error("stundenplan-card editor: setSourceEntity failed", n);
        }
      }}
                    ></ha-entity-picker>
                  ` : c``}

                  ${this.isHaEntityPickerAvailable() ? b : c`<ha-input
                    label="Stundenplan Suite Entity-ID"
                    .value=${e.source_entity_integration ?? e.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-input>`}
                ` : c``}

            ${(e.source_type ?? "manual") === "sensor" ? c`
                  <div class="hint">Beliebiger Sensor (JSON): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const s = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !s || /^sensor\./.test(s);
      }}
                      .label=${"Sensor (JSON)"}
                      @value-changed=${(i) => {
        try {
          const n = i.detail?.value ?? i.target?.value, s = typeof n == "string" ? n : n && typeof n == "object" ? n.entity_id : void 0;
          this.setSourceEntity(s);
        } catch (n) {
          console.error("stundenplan-card editor: setSourceEntity failed", n);
        }
      }}
                    ></ha-entity-picker>
                  ` : c``}

                  ${this.isHaEntityPickerAvailable() ? b : c`<ha-input
                    label="Sensor Entity-ID (manuell)"
                    .value=${e.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-input>`}

                  <div class="grid2">
                    <ha-input label="Attribut" .value=${e.source_attribute ?? ""} @input=${(i) => this.onText(i, "source_attribute")} @change=${(i) => this.onText(i, "source_attribute")} @value-changed=${(i) => this.onText(i, "source_attribute")} placeholder="plan"></ha-input>
                    <ha-input label="Time-Key" .value=${e.source_time_key ?? ""} @input=${(i) => this.onText(i, "source_time_key")} @change=${(i) => this.onText(i, "source_time_key")} @value-changed=${(i) => this.onText(i, "source_time_key")} placeholder="Stunde"></ha-input>
                  </div>
                  <div class="hint">Sensor (JSON): REST-Sensor + JSON-Attribut (z.B. <code>plan</code>) und Zeit-Key (z.B. <code>Stunde</code>).</div>

                  <div class="hint" style="margin-top:10px;">
                    Wechselwochen (A/B) gehört zu „Single-Source (Legacy / einfach)“.
                  </div>

                  <div class="grid2">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
        week_mode: e.week_mode ?? "off",
        week_a_is_even_kw: Y(e.week_a_is_even_kw, !0)
      }}
                      .schema=${[
        {
          name: "week_mode",
          selector: {
            select: {
              mode: "list",
              options: [
                { value: "off", label: "off (deaktiviert)" },
                { value: "kw_parity", label: "A/B nach Kalenderwoche" }
              ]
            }
          }
        },
        {
          name: "week_a_is_even_kw",
          selector: {
            select: {
              mode: "list",
              options: [
                { value: !0, label: "Woche A = gerade KW" },
                { value: !1, label: "Woche A = ungerade KW" }
              ]
            }
          }
        }
      ]}
                      .computeLabel=${(i) => i?.name === "week_mode" ? "Wechselwochen (A/B)" : i?.name === "week_a_is_even_kw" ? "Woche A" : i?.name}
                      @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const n = i?.detail?.value ?? {}, s = n.week_mode ?? e.week_mode ?? "off";
          s !== (e.week_mode ?? "off") && this.setValue("week_mode", s);
          const r = n.week_a_is_even_kw;
          typeof r == "boolean" && r !== Y(e.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
        } catch (n) {
          console.error("stundenplan-card editor: week settings change failed", n);
        }
      }}
                    ></ha-form>
                  </div>
` : c``}

          `
    );
  }
  renderRollingSettings() {
    const e = this._config;
    return this.renderSection("Ansicht & Rolling", "rolling", c`
      <ha-form
        .hass=${this.hass}
        .data=${{ view_mode: e.view_mode ?? "week" }}
        .schema=${[{ name: "view_mode", selector: { select: { mode: "dropdown", options: [
      { value: "week", label: "Ganze Woche" },
      { value: "rolling", label: "Ab heute (rolling)" }
    ] } } }]}
        .computeLabel=${() => "Ansichtsmodus"}
        @value-changed=${(i) => {
      i.stopPropagation(), this.setValue("view_mode", i.detail?.value?.view_mode ?? "week");
    }}
      ></ha-form>
      ${(e.view_mode ?? "week") === "rolling" ? c`
      <div class="grid2">
        <div class="gridFull">${this.renderToggle("rolling_week_only", "Auf Kalenderwoche begrenzen")}</div>
        ${e.rolling_week_only ? c`<div class="hint gridFull">Endet am Sonntag der Startwoche. Am Wochenende beginnt die Ansicht beim nächsten Schultag; auch „Nach der letzten Stunde“ bleibt wirksam.</div>` : b}
        <ha-input
          label="Zusätzliche Tage im Voraus"
          type="number"
          .value=${String(e.days_ahead ?? 0)}
          @input=${(i) => {
      const n = Number(i.target.value);
      this.setValue("days_ahead", Number.isFinite(n) ? Math.max(0, Math.min(6, Math.floor(n))) : 0);
    }}
          hint="0 = nur Starttag, 1 = Starttag + nächster Schultag"
        ></ha-input>
        <ha-form
          .hass=${this.hass}
          .data=${{ rolling_switch_mode: e.rolling_switch_mode ?? "midnight" }}
          .schema=${[{
      name: "rolling_switch_mode",
      selector: { select: { mode: "dropdown", options: [
        { value: "midnight", label: "Ab 00:00 Uhr" },
        { value: "after_last_lesson", label: "Nach der letzten Stunde" },
        { value: "fixed_time", label: "Feste Umschaltzeit" }
      ] } }
    }]}
          .computeLabel=${(i) => i?.name === "rolling_switch_mode" ? "Auf nächsten Tag springen" : i?.name}
          @value-changed=${(i) => {
      try {
        i?.stopPropagation?.();
        const n = (i?.detail?.value ?? {}).rolling_switch_mode ?? "midnight";
        this.setValue("rolling_switch_mode", n);
      } catch (n) {
        console.error("stundenplan-card editor: rolling_switch_mode change failed", n);
      }
    }}
        ></ha-form>
        ${(e.rolling_switch_mode ?? "midnight") === "fixed_time" ? c`
          <ha-input class="gridFull"
            label="Umschaltzeit (HH:MM)"
            .value=${e.rolling_switch_time ?? ""}
            @input=${(i) => this.onText(i, "rolling_switch_time")}
            hint="Beispiel: 15:00"
          ></ha-input>
        ` : c`<div class="infoBox slim gridFull">${(e.rolling_switch_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung auf den nächsten Schultag folgt nach der letzten Endzeit aus deinem Plan." : "Der Sprung auf den nächsten Schultag folgt direkt ab Mitternacht."}</div>`}
      </div>
      <div class="hint">Ab dem Starttag werden die nächsten passenden Schultage angezeigt. Beim Blättern in andere Wochen beginnt die Ansicht am Montag.</div>
      ` : b}
      ${(e.view_mode ?? "week") === "week" ? c`
        <ha-form .hass=${this.hass}
          .data=${{ weekend_switch: e.weekend_switch ?? "off" }}
          .schema=${[{ name: "weekend_switch", selector: { select: { mode: "dropdown", options: [
      { value: "off", label: "Erst am Montag" },
      { value: "saturday", label: "Ab Samstag" },
      { value: "sunday", label: "Ab Sonntag" }
    ] } } }]}
          .computeLabel=${() => "Automatisch zur nächsten Woche"}
          @value-changed=${(i) => {
      i.stopPropagation(), this.setValue("weekend_switch", i.detail?.value?.weekend_switch ?? "off");
    }}
        ></ha-form>
        <div class="hint">Gilt in der Grundansicht (Wochenwahl 0). Manuelles Blättern hat Vorrang. Für datumsgenaue Suite-Daten wird Suite ab v0.4.0b3 benötigt. Fehlende Unterrichtsdaten bleiben leer.</div>
      ` : b}
    `);
  }
  render() {
    if (!this._config) return c``;
    const e = this._config;
    return c`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      c`
<div class="generalDivider first">Grunddaten</div>
            <div class="grid2">
              <ha-input label="Titel der Karte" .value=${e.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-input>

              <ha-input
                label="Schultage (CSV)"
                .value=${Jn(e.days ?? [])}
                @input=${(i) => this.setValue("days", In(i.target.value))}
                hint="Beispiel: Mo, Di, Mi, Do, Fr"
              ></ha-input>
            </div>

            <div class="generalDivider">Titel & Kopfzeile</div>
            <div class="toggleGroup">
              ${this.renderToggle("show_title", "Titelzeile anzeigen", !0)}
              ${this.renderToggle("show_header_date", "Datum anzeigen", !0)}
              ${this.renderToggle("show_time_column", "Spalte „Stunde“ anzeigen", !0)}
              ${this.renderToggle("show_week_navigation", "Wochennavigation anzeigen", !0)}
            </div>
            <div class="generalDivider">Ansicht</div>
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{ display_mode: e.display_mode ?? "default" }}
                .schema=${[
        {
          name: "display_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "default", label: "Normal" },
                { value: "compact", label: "Kompakt" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "display_mode" ? "Ansichtsdichte" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const n = (i?.detail?.value ?? {}).display_mode ?? "default";
          this.setValue("display_mode", n);
        } catch (n) {
          console.error("stundenplan-card editor: display_mode change failed", n);
        }
      }}
              ></ha-form>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Leere Endstunden ausblenden</div>
                  <div class="sub">Nur bis zur letzten belegten Stunde anzeigen.</div>
                </div>
                <ha-switch .checked=${Y(e.trim_empty_rows, !1)} @change=${(i) => this.onToggle(i, "trim_empty_rows")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleiche Folgestunden verbinden</div>
                  <div class="sub">Identische Fächer ohne Pausenzeile zusammenfassen.</div>
                </div>
                <ha-switch .checked=${Y(e.merge_double_lessons, !1)} @change=${(i) => this.onToggle(i, "merge_double_lessons")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleichmäßige Spaltenbreiten</div>
                  <div class="sub">Für mehrere gleich breite Karten untereinander.</div>
                </div>
                <ha-switch .checked=${Y(e.equal_column_widths, !1)} @change=${(i) => this.onToggle(i, "equal_column_widths")}></ha-switch>
              </div>

            </div>

            <div class="generalDivider">Beim Antippen</div>
            <div class="stack">
              <ha-form
                .hass=${this.hass}
                .data=${{ tap_action_action: ((e.tap_action?.action ?? "none") + "").toString() }}
                .schema=${[
        {
          name: "tap_action_action",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "none", label: "Keine Aktion" },
                { value: "toggle_view", label: "Ansicht umschalten" },
                { value: "popup_week", label: "Wochen-Popup" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "tap_action_action" ? "Tap-Aktion" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const n = (i?.detail?.value ?? {}).tap_action_action ?? "none";
          this.setValue("tap_action", { ...e.tap_action ?? {}, action: n });
        } catch (n) {
          console.error("stundenplan-card editor: tap_action change failed", n);
        }
      }}
              ></ha-form>

              ${((e.tap_action?.action ?? "none") + "").toString() === "toggle_view" ? c`
                <div class="hint">Ein Tipp auf die Karte wechselt zwischen „Ganze Woche“ und „Ab heute (rolling)“.</div>
              ` : ((e.tap_action?.action ?? "none") + "").toString() === "popup_week" ? c`
                <div class="hint">Ein Tipp auf die Karte öffnet ein Popup mit der aktuellen ganzen Woche. Ein weiterer Tipp auf das Popup schließt es wieder.</div>
              ` : c`<div class="hint">Für Wallpanels sind meist „Ansicht umschalten“ oder „Wochen-Popup“ die sinnvollsten Varianten.</div>`}
            </div>
          `
    )}

        ${this.renderSourceSettings()}
        ${this.renderRollingSettings()}
        ${(e.source_type ?? "manual") === "manual" ? this.renderSection("Manueller Stundenplan", "manual", this.renderManualRows()) : b}
        ${this.renderFilterSettings()}
        ${this.renderDatedSettings()}
        ${this.renderHolidaySettings()}
        ${this.renderDatedSettings("replace")}

        ${this.renderSection("Schrift & Abstände", "typography", c`
          <div class="hint">Alle Größen in Pixeln. Leere Felder verwenden die bisherigen Vorgaben der normalen oder kompakten Ansicht.</div>
          ${e.show_title !== !1 ? c`
            <div class="generalDivider first">Kartentitel</div>
            <div class="grid2">
              <ha-input label="Titelgröße normal (px)" type="number" min="10" max="40" step="1"
                placeholder="Standard: 20" .value=${String(e.title_font_size ?? 20)}
                @change=${(i) => {
      const n = i.target.value, s = n === "" ? 20 : Number(n);
      this.setValue("title_font_size", Number.isFinite(s) ? Math.max(10, Math.min(40, s)) : 20);
    }}></ha-input>
              ${this.renderTypographyInput(me.find(({ key: i }) => i === "font_size_title_compact"))}
              <ha-input class="gridFull" label="Titel-Schriftfamilie (optional)"
                .value=${e.title_font_family ?? ""}
                @input=${(i) => this.onText(i, "title_font_family")}></ha-input>
            </div>
          ` : b}
          <div class=${e.show_title !== !1 ? "generalDivider" : "generalDivider first"}>Kopfzeile & Tabelle</div>
          <div class="grid2">
            ${["header_table_gap", "font_size_header"].map((i) => this.renderTypographyInput(me.find((n) => n.key === i)))}
            <div class="hint gridFull">Der Abstand gilt unterhalb von Titel und Navigation: leer = bisheriger Abstand, 0 = kein zusätzlicher Abstand.</div>
          </div>
          <div class="generalDivider">Stunden & Inhalte</div>
          <div class="grid2">
            ${["font_size_time", "font_size_subject", "font_size_details", "row_height"].map((i) => this.renderTypographyInput(me.find((n) => n.key === i)))}
            <div class="hint gridFull">Die Mindesthöhe gilt pro Stundenzeile. Mehrzeilige Inhalte dürfen die Zeile vergrößern; Pausenzeilen bleiben kompakt.</div>
          </div>
          <button type="button" class="spBtn" @click=${() => this.resetTypography()}>Größen zurücksetzen</button>
        `)}

        ${this.renderSection(
      "Highlights",
      "highlights",
      c`
            <div class="toggleGroup">
              ${this.renderToggle("highlight_today", "Heute-Spalte hervorheben", !0)}
              ${this.renderToggle("highlight_current", "Aktuelle Stunde hervorheben", !0)}
              ${this.renderToggle("highlight_breaks", "Pause hervorheben")}
              ${this.renderToggle("free_only_column_highlight", "Freistunden nicht hervorheben", !0)}
              ${this.renderToggle("highlight_current_text", "Aktuelles Fach farbig anzeigen")}
              ${e.show_time_column !== !1 ? this.renderToggle("highlight_current_time_text", "Aktuelle Zeit farbig anzeigen") : b}
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      c`
            ${this.renderSubjectColors()}
            <div class="stack">
              ${this.renderConfigColor("Heute-Spalte", "highlight_today_color", "#0096ff", 0.12)}
              ${this.renderConfigColor("Aktuelle Stunde / Pause", "highlight_current_color", "#4caf50", 0.18)}
              ${e.highlight_current_text ? this.renderConfigColor("Aktuelles Fach: Text", "highlight_current_text_color", "#ff1744") : b}
              ${e.highlight_current_time_text && e.show_time_column !== !1 ? this.renderConfigColor("Aktuelle Zeit: Text", "highlight_current_time_text_color", "#ff9100") : b}
            </div>
          `
    )}
        ${this.renderSection(
      "Hintergründe & Linien",
      "appearance",
      c`
        <div class="hint">Optional für transparente Dashboards. Zurücksetzen verwendet wieder Theme oder CSS-Vorgaben. Eigene Fachfarben und Highlights bleiben erhalten.</div>
        <div class="stack">
          ${Rt.map((i) => this.renderAppearanceColor(i))}
        </div>
      `
    )}
      </div>
    `;
  }
};
Dt.properties = {
  hass: {},
  _config: { state: !0 }
}, Dt.styles = Si`
    :host {
      display: block;
      min-width: 0;
      container-type: inline-size;
      color: var(--primary-text-color);
    }
    *, *::before, *::after { box-sizing: border-box; }
    ha-input, ha-form, ha-entity-picker { display: block; min-width: 0; width: 100%; }
    ha-switch { flex: 0 0 auto; }
    .wrap {
      padding: 8px;
      display: grid;
      gap: 10px;
    }
    .section {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    .sectionHead {
      width: 100%;
      padding: 10px;
      border: 0;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: center;
      background: transparent;
      user-select: none;
    }
    .sectionHead:hover { background: var(--secondary-background-color); }
    .sectionHead:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -3px; }
    .sectionLabels { flex: 1; min-width: 0; }
    .sectionTitle {
      display: block;
      font-size: 13px;
      line-height: 1.4;
      font-weight: 700;
    }
    .sectionDescription {
      display: block;
      font-size: 12px;
      line-height: 1.35;
      color: var(--secondary-text-color, var(--primary-text-color));
      overflow-wrap: anywhere;
    }
    .sectionIcon, .chev { width: 22px; height: 22px; flex: 0 0 auto; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    .chev { width: 18px; height: 18px; opacity: 0.8; }
    .sectionBody {
      padding: 12px;
      display: grid;
      gap: 10px;
    }
    .sectionBody > *, .grid2 > *, .optRow > div { min-width: 0; }
    .subjectChoices { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 4px; }
    .subjectChoice { display: flex; align-items: center; gap: 8px; padding: 6px; cursor: pointer; min-width: 0; }
    .subjectChoice span { overflow-wrap: anywhere; }
    .subjectChoice input { width: 18px; height: 18px; flex: 0 0 auto; accent-color: var(--primary-color); }
    .subjectAdd { display: flex; gap: 8px; align-items: end; flex-wrap: wrap; }
    .subjectAdd label { flex: 1 1 170px; min-width: 0; font-size: 12px; }
    .subjectAdd input { display: block; width: 100%; padding: 10px; margin-top: 4px; border: 1px solid var(--divider-color); border-radius: 6px; background: var(--secondary-background-color); color: inherit; font: inherit; }
    .datedEntry, .datedSource, .pastDatedEntries { min-width: 0; border: 1px solid var(--divider-color); border-radius: 8px; }
    .datedEntry summary, .datedSource summary, .pastDatedEntries > summary { padding: 12px; cursor: pointer; overflow-wrap: anywhere; }
    .datedEntry > summary { position: relative; padding-right: 56px; }
    .datedRemove { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 6px; background: transparent; color: var(--secondary-text-color); cursor: pointer; }
    .datedRemove:hover { background: var(--secondary-background-color); color: var(--primary-text-color); }
    .datedRemove:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .datedRemove svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
    .datedTitle { font-weight: 600; }
    .datedMeta { display: block; margin-top: 4px; color: var(--secondary-text-color); font-size: 12px; font-weight: 400; }
    .legacyAssignment { border: 1px solid var(--divider-color); border-radius: 6px; }
    .pastDatedEntries > .hint, .pastDatedEntries > .datedEntry { margin: 0 10px 10px; }
    .datedFields { display: grid; gap: 10px; padding: 12px; min-width: 0; }
    .datedFields label:not(.opacityControl) { display: block; min-width: 0; font-size: 12px; }
    .datedFields input:not([type="checkbox"]):not([type="color"]):not([type="range"]), .datedFields textarea, .datedFields select { display: block; box-sizing: border-box; width: 100%; min-width: 0; padding: 10px; margin-top: 4px; border: 1px solid var(--divider-color); border-radius: 6px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; }
    .datedFields textarea { resize: vertical; }
    .datedFields .subjectChoice { display: flex; }
    .dateAdd { display: flex; flex-wrap: wrap; align-items: end; gap: 8px; }
    .dateAdd label { flex: 1 1 150px; }
    [data-section="dates"] .spBtn, [data-section="replacements"] .spBtn { min-height: 40px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); }
    .stack, .toggleGroup { display: grid; gap: 10px; min-width: 0; }
    .toggleGroup { gap: 0; }
    .toggleRow {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 7px 0; font-size: 14px; cursor: pointer;
    }
    .toggleRow span { min-width: 0; overflow-wrap: anywhere; }
    .grid2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      align-items: start;
    }
    .grid3 {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      gap: 10px;
      align-items: start;
    }
    .switchLabel {
      opacity: 0.9;
    }
    .hint {
      font-size: 12px;
      opacity: 0.85;
      line-height: 1.4;
    }
    .sub { font-size: 12px; line-height: 1.4; opacity: 0.75; }
    .hint, .sub, .optTitle { overflow-wrap: anywhere; }
    .infoBox {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(3, 169, 244, 0.10);
      border: 1px solid rgba(3, 169, 244, 0.35);
      line-height: 1.45;
      margin-bottom: 12px;
    }
    .infoBox.slim {
      margin-bottom: 0;
      display: flex;
      align-items: center;
      min-height: 0;
    }
    .generalDivider {
      margin: 8px 0 0;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.02em;
      color: var(--primary-text-color);
    }
    .generalDivider.first {
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }
    .generalDivider.gridFull {
      grid-column: 1 / -1;
      margin-top: 6px;
    }
    .gridFull {
      grid-column: 1 / -1;
    }
    .generalHint {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
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
      align-items: start;
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
      overflow-x: auto;
      padding-bottom: 6px;
    }
    .cellEditor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: var(--card-background-color);
      display: grid;
      gap: 8px;
      min-width: 220px;
      box-sizing: border-box;
    }
    .cellEditorHead {
      font-weight: 700;
      opacity: 0.9;
      font-size: 12px;
    }

    .lessonArea {
      width: 100%;
      min-height: 44px;
      resize: vertical;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: rgba(0,0,0,0.12);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 14px;
      box-sizing: border-box;
    }

    @container (max-width: 390px) {
      .grid2 {
        grid-template-columns: minmax(0, 1fr);
      }
      .grid3 {
        grid-template-columns: 1fr;
      }
    }

    /* ---- Manual Rows Editor (classic accordion UI) ---- */
    .manualWeekBox {
      display: grid;
      gap: 10px;
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: rgba(255,255,255,0.02);
    }
    .manualWeekTabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .spBtnActive {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    }
    .rowsTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 6px;
      flex-wrap: wrap;
    }
    .rowsTitle {
      font-weight: 700;
      font-size: 14px;
    }
    .btnBar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .toggleInline {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .toggleText {
      font-size: 12px;
      opacity: 0.9;
    }

    details.rowPanel {
      margin: 6px 0;
      border-radius: 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      overflow: hidden;
    }
    details.rowPanel > summary {
      scroll-margin-block: 12px;
      list-style: none;
      cursor: pointer;
      padding: 12px 14px;
      user-select: none;
    }
    details.rowPanel > summary::-webkit-details-marker {
      display: none;
    }
    .rowHead {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .rowHeadTitle {
      font-weight: 700;
    }
    .rowHeadMeta {
      opacity: 0.75;
      font-size: 12px;
      white-space: nowrap;
    }
    .rowBody {
      padding: 12px 14px 14px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .optRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
    }
    .optTitle {
      font-weight: 700;
      margin-bottom: 2px;
    }
    .cellsGrid {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 4px;
      align-items: start;
    }
    .cellEditor {
      border-radius: 14px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .cellEditorHead {
      font-weight: 700;
      font-size: 12px;
      opacity: 0.9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cellStyles {
      margin-top: 2px;
      padding-top: 8px;
      border-top: 1px dashed rgba(255,255,255,0.10);
      display: grid;
      gap: 8px;
    }
    .cellStyles--hidden { display: none !important; }
    .subjectColors { margin-bottom: 16px; }
    .subjectColors summary { cursor: pointer; font-weight: 600; padding: 8px 0; }
    .suiteFilters { display: block; margin-bottom: 0; overflow-wrap: anywhere; }
    .suiteFilters > strong { display: block; }
    .additionalCardFilters { margin-top: 12px; border: 1px solid var(--divider-color); border-radius: 10px; padding: 0 12px 12px; }
    .additionalCardFilters > summary { cursor: pointer; font-weight: 600; padding: 12px 0; overflow-wrap: anywhere; }
    .additionalCardFilters > summary .hint { display: block; margin-top: 4px; font-weight: normal; }
    .subjectColorRule { min-width: 0; padding: 10px; border: 1px solid var(--divider-color); border-radius: 10px; }
    .subjectColorRule > label { display: block; margin-bottom: 12px; }
    .subjectColorName { display: block; width: 100%; min-width: 0; margin-top: 5px; padding: 10px; color: inherit; background: var(--secondary-background-color); border: 1px solid var(--divider-color); border-radius: 6px; font: inherit; }
    .subjectColorRule .colorPicker { margin-bottom: 10px; }
    .colorPicker { min-width: 0; margin: 0; padding: 10px; border: 1px solid var(--divider-color); border-radius: 10px; }
    .colorPicker legend { padding: 0 5px; font-size: 13px; font-weight: 600; }
    .palette { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
    .swatch { width: 25px; height: 25px; padding: 0; border: 1px solid var(--divider-color); border-radius: 50%; background: var(--swatch); cursor: pointer; }
    .swatch[aria-pressed="true"] { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .customColor { width: 32px; height: 28px; padding: 1px; border: 1px solid var(--divider-color); border-radius: 5px; background: transparent; cursor: pointer; }
    .opacityControl { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 12px; font-size: 12px; }
    .opacityControl input { min-width: 40px; width: 0; flex: 1; accent-color: var(--primary-color); }
    .opacityControl output { width: 35px; text-align: right; }
    .colorFooter { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 8px; font-size: 12px; }
    .colorPreview { width: 24px; height: 18px; border: 1px solid var(--divider-color); border-radius: 4px; }
    .resetColor { border: 0; background: transparent; color: var(--primary-color); cursor: pointer; font: inherit; padding: 4px 0; }
    .colorAdvanced { flex: 1; min-width: 0; }
    .colorAdvanced summary { cursor: pointer; opacity: 0.75; }
    .colorAdvanced input { width: 100%; min-width: 0; margin-top: 6px; background: var(--secondary-background-color); color: var(--primary-text-color); border: 1px solid var(--divider-color); padding: 6px; border-radius: 4px; }
    .styleLine {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .styleLbl {
      font-size: 12px;
      opacity: 0.8;
      min-width: 84px;
    }
    input.col {
      width: 44px;
      height: 28px;
      border: none;
      background: transparent;
      padding: 0;
    }
    .range {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      justify-content: flex-start;
    }
    .range input[type="range"] {
      flex: 1;
      width: 100%;
      min-width: 140px;
    }
    .pct {
      width: 42px;
      text-align: right;
      opacity: 0.85;
      font-size: 12px;
    }
    .rowFoot {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .rowActions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .spBtn{
      appearance:none;
      border:1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.04);
      color: var(--primary-text-color);
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 13px;
      line-height: 1.2;
      cursor: pointer;
      user-select: none;
      transition: background 120ms ease, border-color 120ms ease, transform 80ms ease;
    }
    .spBtn:hover{
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.28);
    }
    .spBtn:active{
      transform: translateY(1px);
    }
    .spBtn:focus-visible{
      outline: 2px solid rgba(33,150,243,0.6);
      outline-offset: 2px;
    }
    .spBtnDanger{
      border-color: rgba(219,68,55,0.55);
      background: rgba(219,68,55,0.12);
    }
    .spBtnDanger:hover{
      border-color: rgba(219,68,55,0.8);
      background: rgba(219,68,55,0.18);
    }
    .manualEmpty {
      display: grid;
      gap: 12px;
      padding: 14px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
    }
    .spBtn.manualAdd {
      min-height: 44px;
      max-width: 100%;
      padding: 10px 14px;
      border: 1px solid var(--primary-color);
      border-radius: 8px;
      background: var(--card-background-color);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .spBtn.manualAdd:hover {
      background: color-mix(in srgb, var(--primary-color) 12%, var(--card-background-color));
    }
    .spBtn.manualAddPrimary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .spBtn.manualAddPrimary:hover {
      background: color-mix(in srgb, var(--primary-color) 90%, #000);
    }
    .spBtn.manualAdd:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 3px;
    }
  `;
let Bi = Dt;
V([
  ie()
], Bi.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Te);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", Bi);
window.__STUNDENPLAN_CARD_VERSION = "v3.11.0-beta.2";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v3.11.0-beta.2 (marker: STUNDENPLAN_CARD_v3.11.0-beta.2)",
  preview: !0
});
export {
  Te as StundenplanCard,
  Bi as StundenplanCardEditor
};
