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
function B(t) {
  return !(t instanceof Date) || !Number.isFinite(t.getTime()) ? "" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}
function tt(t) {
  if (typeof t != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(t)) return !1;
  const [e, i, n] = t.split("-").map(Number);
  return e >= 1900 && B(new Date(e, i - 1, n, 12)) === t;
}
function Ot(t) {
  if (typeof t == "string")
    try {
      t = JSON.parse(t);
    } catch {
      return null;
    }
  return Array.isArray(t) ? t : null;
}
const _t = (t) => String(t ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("de"), lt = (t) => typeof t == "string" && t.trim() && !/[\r\n]/.test(t), Ht = (t) => typeof t == "string" && !/[;{}]/.test(t) ? t.trim() : "", Y = (t) => Array.isArray(t) ? t : typeof t == "string" ? t.split(/[,;\n]/).map((e) => e.trim()).filter(Boolean) : [], he = (t) => {
  const e = _t(t), i = e.match(/^(\d+)\.\s*\d{1,2}:\d{2}\s*[-\u2013\u2014]\s*\d{1,2}:\d{2}$/);
  return i ? i[1] : e.replace(/\.$/, "");
}, oe = (t) => (t?.action ?? "note") === "note" && t?.match === "period";
function ri(t, e = B(/* @__PURE__ */ new Date())) {
  const i = [...new Set(Y(t?.dates ?? t?.date).filter(tt))].sort(), n = (o) => o.split("-").reverse().join("."), r = i.find((o) => o >= e), s = Y(t?.periods).map(he), a = i.length ? i.length === 1 ? n(i[0]) : `${i.length} Termine · ${r ? `nächster: ${n(r)} · ` : ""}letzter: ${n(i.at(-1))}` : "Datum noch auswählen";
  return {
    title: typeof t?.text == "string" && t.text.trim() || "Neuer Termin",
    detail: `${a}${s.length ? ` · ${s.join(", ")}${s.length === 1 ? ". Stunde" : ". Stunden"}` : ""}${t?.enabled === !1 ? " · inaktiv" : ""}`
  };
}
function Ri(t, e, i = B(/* @__PURE__ */ new Date())) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t.filter(oe)) for (const s of r.dates) {
    if (s < i) continue;
    const a = r.periods.filter((l) => !e.has(`${s}/${l}`));
    if (!a.length) continue;
    const o = { date: s, periods: a, text: r.text, color: r.color, background: r.background };
    n.set(JSON.stringify(o), o);
  }
  return [...n.values()].sort((r, s) => r.date.localeCompare(s.date) || r.periods[0].localeCompare(s.periods[0], "de", { numeric: !0 }));
}
function Ge(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return "Eintrag muss ein Objekt sein.";
  if (t.enabled === !1) return "";
  const e = Y(t.dates ?? t.date);
  return !e.length || !e.every(tt) ? "Bitte gültige Termine als JJJJ-MM-TT angeben." : t.match != null && !["period", "subject"].includes(t.match) ? "Unbekannte Terminzuordnung." : !oe(t) && !lt(t.subject) ? "Bitte das Fach für die Zuordnung angeben (eine Zeile)." : ["note", "replace"].includes(t.action ?? "note") ? lt(t.text) ? t.periods != null && !Array.isArray(t.periods) && typeof t.periods != "string" ? "Stunden bitte als Liste angeben." : Y(t.periods).every((i) => (typeof i == "string" || typeof i == "number") && lt(String(i))) ? oe(t) && !Y(t.periods).length ? "Bitte mindestens eine Unterrichtsstunde angeben, z. B. 1 oder 2." : "" : "Ungültige Stundenbezeichnung." : "Bitte einen Hinweis oder neuen Fachnamen angeben (eine Zeile)." : "Unbekannte Aktion.";
}
function Qe(t, e) {
  const i = Ot(t.dated_entries) ?? [], n = [];
  let r = [];
  if (t.dated_entries_entity) {
    const o = e?.states?.[t.dated_entries_entity];
    if (!o || ["unavailable", "unknown"].includes(o.state))
      n.push("Terminquelle nicht verfügbar; externe Termine werden nicht angewendet.");
    else {
      const l = Ot(o.attributes?.[t.dated_entries_attribute || "entries"]);
      l ? r = l : n.push("Terminquelle enthält keine gültige Liste im gewählten Attribut.");
    }
  }
  let s = 0;
  const a = [...i, ...r].flatMap((o) => Ge(o) ? (s++, []) : o.enabled === !1 ? [] : [{
    dates: Y(o.dates ?? o.date),
    subject: _t(o.subject),
    periods: [...new Set(Y(o.periods).map(he))],
    match: oe(o) ? "period" : "subject",
    action: o.action ?? "note",
    text: o.text.trim(),
    color: Ht(o.color),
    background: Ht(o.background)
  }]);
  return s && n.push(`${s} unvollständige oder ungültige Termine werden nicht angewendet.`), { entries: a, warnings: n };
}
function Wt(t, e = B(/* @__PURE__ */ new Date())) {
  if (!tt(e) || Ge({ ...t, enabled: !0 })) return !1;
  const i = Y(t?.dates ?? t?.date);
  return i.length > 0 && i.every((n) => n < e);
}
function ht(t, e, i, n, r) {
  const s = { text: String(t ?? ""), notes: [] }, a = B(n);
  if (!a || e?.break || !r.length) return s;
  const o = he(e?.cell_times?.[i]?.time || e?.time), l = /* @__PURE__ */ new Map(), u = (p) => l.set(JSON.stringify(p), p), f = (p) => ({
    text: p.text,
    ...p.color ? { color: p.color } : {},
    ...p.background ? { background: p.background } : {}
  });
  for (const p of r) oe(p) && p.dates.includes(a) && p.periods.includes(o) && u(f(p));
  return s.text = s.text.split(/\r?\n\s*\r?\n/).map((p) => {
    const g = p.split(/\r?\n/), c = _t(g[0]);
    if (!c || /^[-\u2013\u2014]+$/.test(c)) return p;
    const h = r.filter((_) => !oe(_) && _.dates.includes(a) && _.subject === c && (!_.periods.length || _.periods.includes(o)));
    if (!h.length) return p;
    const y = /entfällt|fällt\s+aus|ausfall|abgesagt|cancel(?:led|ed)|vertretung|ersatz|verlegt|\bstatt\b|geändert/i.test(p), v = [...new Set(h.filter((_) => _.action === "replace").map((_) => _.text))];
    !y && v.length === 1 && (g[0] = v[0]), !y && v.length > 1 && u({ text: "Widersprüchliche Fachwechsel: Original bleibt." });
    for (const _ of h) _.action === "note" && u({
      text: _.text,
      ..._.color ? { color: _.color } : {},
      ..._.background ? { background: _.background } : {}
    });
    return g.join(`
`);
  }).join(`

`), s.notes = [...l.values()], s;
}
const Oe = globalThis, bt = Oe.ShadowRoot && (Oe.ShadyCSS === void 0 || Oe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = /* @__PURE__ */ Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let si = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (bt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ji = (t) => new si(typeof t == "string" ? t : t + "", void 0, yt), ai = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, r, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new si(i, t, yt);
}, Ni = (t, e) => {
  if (bt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), r = Oe.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, t.appendChild(n);
  }
}, Lt = bt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return ji(i);
})(t) : t, { is: Pi, defineProperty: Fi, getOwnPropertyDescriptor: Bi, getOwnPropertyNames: Oi, getOwnPropertySymbols: Hi, getPrototypeOf: Wi } = Object, Z = globalThis, Vt = Z.trustedTypes, Ui = Vt ? Vt.emptyScript : "", Li = Z.reactiveElementPolyfillSupport, De = (t, e) => t, Xe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ui : null;
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
} }, wt = (t, e) => !Pi(t, e), Kt = { attribute: !0, type: String, converter: Xe, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let de = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Kt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Fi(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = Bi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: n, set(s) {
      const a = n?.call(this);
      r?.call(this, s), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(De("elementProperties"))) return;
    const t = Wi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(De("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(De("properties"))) {
      const e = this.properties, i = [...Oi(e), ...Hi(e)];
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
      for (const n of i) e.unshift(Lt(n));
    } else t !== void 0 && e.push(Lt(t));
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
    return Ni(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Xe).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Xe;
      this._$Em = n;
      const a = s.fromAttribute(e, r.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (n === !1 && (r = this[t]), i ?? (i = s.getPropertyOptions(t)), !((i.hasChanged ?? wt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), r !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: s } = r, a = this[n];
        s !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
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
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[De("elementProperties")] = /* @__PURE__ */ new Map(), de[De("finalized")] = /* @__PURE__ */ new Map(), Li?.({ ReactiveElement: de }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
const Me = globalThis, It = (t) => t, et = Me.trustedTypes, Jt = et ? et.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, oi = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, li = "?" + q, Vi = `<${li}>`, le = document, Te = () => le.createComment(""), Ce = (t) => t === null || typeof t != "object" && typeof t != "function", vt = Array.isArray, Ki = (t) => vt(t) || typeof t?.[Symbol.iterator] == "function", ct = `[ 	
\f\r]`, Se = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Yt = />/g, te = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Zt = /'/g, Gt = /"/g, ci = /^(?:script|style|textarea|title)$/i, Ii = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), d = Ii(1), fe = /* @__PURE__ */ Symbol.for("lit-noChange"), b = /* @__PURE__ */ Symbol.for("lit-nothing"), Qt = /* @__PURE__ */ new WeakMap(), re = le.createTreeWalker(le, 129);
function di(t, e) {
  if (!vt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Jt !== void 0 ? Jt.createHTML(e) : e;
}
const Ji = (t, e) => {
  const i = t.length - 1, n = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Se;
  for (let o = 0; o < i; o++) {
    const l = t[o];
    let u, f, p = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, f = a.exec(l), f !== null); ) g = a.lastIndex, a === Se ? f[1] === "!--" ? a = qt : f[1] !== void 0 ? a = Yt : f[2] !== void 0 ? (ci.test(f[2]) && (r = RegExp("</" + f[2], "g")), a = te) : f[3] !== void 0 && (a = te) : a === te ? f[0] === ">" ? (a = r ?? Se, p = -1) : f[1] === void 0 ? p = -2 : (p = a.lastIndex - f[2].length, u = f[1], a = f[3] === void 0 ? te : f[3] === '"' ? Gt : Zt) : a === Gt || a === Zt ? a = te : a === qt || a === Yt ? a = Se : (a = te, r = void 0);
    const c = a === te && t[o + 1].startsWith("/>") ? " " : "";
    s += a === Se ? l + Vi : p >= 0 ? (n.push(u), l.slice(0, p) + oi + l.slice(p) + q + c) : l + q + (p === -2 ? o : c);
  }
  return [di(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class ze {
  constructor({ strings: e, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [u, f] = Ji(e, i);
    if (this.el = ze.createElement(u, n), re.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = re.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(oi)) {
          const g = f[a++], c = r.getAttribute(p).split(q), h = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: s, name: h[2], strings: c, ctor: h[1] === "." ? Yi : h[1] === "?" ? Zi : h[1] === "@" ? Gi : it }), r.removeAttribute(p);
        } else p.startsWith(q) && (l.push({ type: 6, index: s }), r.removeAttribute(p));
        if (ci.test(r.tagName)) {
          const p = r.textContent.split(q), g = p.length - 1;
          if (g > 0) {
            r.textContent = et ? et.emptyScript : "";
            for (let c = 0; c < g; c++) r.append(p[c], Te()), re.nextNode(), l.push({ type: 2, index: ++s });
            r.append(p[g], Te());
          }
        }
      } else if (r.nodeType === 8) if (r.data === li) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(q, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += q.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const n = le.createElement("template");
    return n.innerHTML = e, n;
  }
}
function me(t, e, i = t, n) {
  if (e === fe) return e;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Ce(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = r : i._$Cl = r), r !== void 0 && (e = me(t, r._$AS(t, e.values), r, n)), e;
}
class qi {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (e?.creationScope ?? le).importNode(i, !0);
    re.currentNode = r;
    let s = re.nextNode(), a = 0, o = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new Re(s, s.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (u = new Qi(s, this, e)), this._$AV.push(u), l = n[++o];
      }
      a !== l?.index && (s = re.nextNode(), a++);
    }
    return re.currentNode = le, r;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Re {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, r) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = me(this, e, i), Ce(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== fe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ki(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && Ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(le.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ze.createElement(di(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new qi(r, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Qt.get(e.strings);
    return i === void 0 && Qt.set(e.strings, i = new ze(e)), i;
  }
  k(e) {
    vt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of e) r === i.length ? i.push(n = new Re(this.O(Te()), this.O(Te()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = It(e).nextSibling;
      It(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, r, s) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(e, i = this, n, r) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = me(this, e, i, 0), a = !Ce(e) || e !== this._$AH && e !== fe, a && (this._$AH = e);
    else {
      const o = e;
      let l, u;
      for (e = s[0], l = 0; l < s.length - 1; l++) u = me(this, o[n + l], i, l), u === fe && (u = this._$AH[l]), a || (a = !Ce(u) || u !== this._$AH[l]), u === b ? e = b : e !== b && (e += (u ?? "") + s[l + 1]), this._$AH[l] = u;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Yi extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Zi extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class Gi extends it {
  constructor(e, i, n, r, s) {
    super(e, i, n, r, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = me(this, e, i, 0) ?? b) === fe) return;
    const n = this._$AH, r = e === b && n !== b || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== b && (n === b || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Qi {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    me(this, e);
  }
}
const Xi = Me.litHtmlPolyfillSupport;
Xi?.(ze, Re), (Me.litHtmlVersions ?? (Me.litHtmlVersions = [])).push("3.3.2");
const en = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Re(e.insertBefore(Te(), s), s, void 0, i ?? {});
  }
  return r._$AI(t), r;
}, Ee = globalThis;
class pe extends de {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = en(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return fe;
  }
}
pe._$litElement$ = !0, pe.finalized = !0, Ee.litElementHydrateSupport?.({ LitElement: pe });
const tn = Ee.litElementPolyfillSupport;
tn?.({ LitElement: pe });
(Ee.litElementVersions ?? (Ee.litElementVersions = [])).push("4.2.2");
const nn = { attribute: !0, type: String, converter: Xe, reflect: !1, hasChanged: wt }, rn = (t = nn, e, i) => {
  const { kind: n, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), n === "accessor") {
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
function ui(t) {
  return (e, i) => typeof i == "object" ? rn(t, e, i) : ((n, r, s) => {
    const a = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, i);
}
function G(t) {
  return ui({ ...t, state: !0, attribute: !1 });
}
var sn = Object.defineProperty, an = Object.getOwnPropertyDescriptor, hi = (t) => {
  throw TypeError(t);
}, W = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? an(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (r = (n ? a(e, i, r) : a(r)) || r);
  return n && r && sn(e, i, r), r;
}, pi = (t, e, i) => e.has(t) || hi("Cannot " + i), K = (t, e, i) => (pi(t, e, "read from private field"), i ? i.call(t) : e.get(t)), I = (t, e, i) => e.has(t) ? hi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), J = (t, e, i, n) => (pi(t, e, "write to private field"), e.set(t, i), i), He, We, Ue, Le, Ve, Ke, Ie, Je;
function S(t) {
  return !!t && t.break === !0;
}
function nt(t) {
  return Math.min(1, Math.max(0, t));
}
function $t(t) {
  if (!t) return null;
  const e = t.replace("#", "").trim();
  if (e.length !== 6) return null;
  const i = parseInt(e.slice(0, 2), 16), n = parseInt(e.slice(2, 4), 16), r = parseInt(e.slice(4, 6), 16);
  return [i, n, r].some((s) => Number.isNaN(s)) ? null : { r: i, g: n, b: r };
}
function xt(t) {
  if (!t || typeof t != "object") return null;
  const e = {};
  return typeof t.bg == "string" && t.bg.trim() && (e.bg = t.bg.trim()), typeof t.color == "string" && t.color.trim() && (e.color = t.color.trim()), typeof t.border == "string" && t.border.trim() && (e.border = t.border.trim()), typeof t.bg_alpha == "number" && !Number.isNaN(t.bg_alpha) && (e.bg_alpha = nt(t.bg_alpha)), Object.keys(e).length ? e : null;
}
function Xt(t, e) {
  return (Array.isArray(t) ? t : []).map((i) => {
    if (S(i))
      return { break: !0, time: (i.time ?? "").toString(), label: (i.label ?? "Pause").toString() };
    const n = Array.isArray(i?.cells) ? i.cells : [], r = Array.from({ length: e.length }, (c, h) => (n[h] ?? "").toString()), s = Array.isArray(i?.cell_styles) ? i.cell_styles : [], a = Array.from({ length: e.length }, (c, h) => xt(s[h])), o = Array.isArray(i?.cell_times) ? Array.from({ length: e.length }, (c, h) => fi(i.cell_times[h])) : [], l = (i?.time ?? "").toString(), u = ge(l), f = (i?.start ?? "").toString().trim(), p = (i?.end ?? "").toString().trim(), g = {
      time: l,
      start: f || u.start || void 0,
      end: p || u.end || void 0,
      cells: r
    };
    return a.some((c) => !!c) && (g.cell_styles = a), o.some((c) => !!c) && (g.cell_times = o), g;
  });
}
function gi(t) {
  if (!t?.bg) return null;
  const e = t.bg.trim();
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  const i = $t(e);
  if (!i) return e;
  const n = typeof t.bg_alpha == "number" ? nt(t.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${n})`;
}
function dt(t, e = "#2196f3", i = 1) {
  const n = String(t ?? "").trim();
  if (n.toLowerCase() === "transparent") return { hex: e, alpha: 0 };
  const r = n.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (r) {
    const a = r[1].length === 3 ? [...r[1]].map((o) => o + o).join("") : r[1];
    return { hex: "#" + a.slice(0, 6), alpha: a.length === 8 ? parseInt(a.slice(6), 16) / 255 : i };
  }
  const s = n.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  return s ? {
    hex: "#" + s.slice(1, 4).map((a) => Math.min(255, Number(a)).toString(16).padStart(2, "0")).join(""),
    alpha: s[4] == null ? 1 : nt(Number(s[4]))
  } : { hex: e, alpha: i };
}
function on(t, e) {
  const i = [], n = gi(t);
  return n && i.push(`background:${n}`), t?.color && i.push(`color:${t.color}`), i.push(`border:${t?.border ?? e}`), i.join(";") + ";";
}
function ei(t, e) {
  const i = (t ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${e})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const n = $t(i);
    return n ? `rgba(${n.r}, ${n.g}, ${n.b}, ${nt(e)})` : i;
  }
  return i;
}
function ge(t) {
  const e = (t ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function fi(t) {
  if (t == null) return null;
  if (typeof t == "string") {
    const s = t.trim(), a = ge(s);
    return s ? { time: s, start: a.start, end: a.end } : null;
  }
  if (typeof t != "object") return null;
  const e = (t.time ?? "").toString().trim(), i = ge(e), n = (t.start ?? "").toString().trim() || i.start, r = (t.end ?? "").toString().trim() || i.end;
  return e || n || r ? { time: e || (n && r ? `${n}-${r}` : ""), start: n || void 0, end: r || void 0 } : null;
}
function pt(t) {
  return (t ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ln(t) {
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
function ti(t) {
  const e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())), i = e.getUTCDay() === 0 ? 7 : e.getUTCDay();
  e.setUTCDate(e.getUTCDate() + 4 - i);
  const n = e.getUTCFullYear(), r = new Date(Date.UTC(n, 0, 4)), s = r.getUTCDay() === 0 ? 7 : r.getUTCDay(), a = new Date(r);
  a.setUTCDate(r.getUTCDate() + (4 - s));
  const o = e.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(o / (10080 * 60 * 1e3)), isoYear: n };
}
function ii(t) {
  const e = (t ?? "").toString().trim().toUpperCase();
  return e === "A" || e === "B" ? e : null;
}
function ne(t) {
  const e = (t ?? "").toString().trim();
  return !e || e === "-" || e === "–" || e === "—";
}
function se(t) {
  return t.trim().replace(/\s+/g, " ").toLocaleLowerCase("de");
}
function qe(t) {
  const e = Array.isArray(t) ? t : [], i = /* @__PURE__ */ new Map();
  for (const n of e) {
    if (typeof n != "string") continue;
    const r = n.trim().replace(/\s+/g, " ");
    r && i.set(se(r), r);
  }
  return [...i.values()];
}
function mi(t) {
  return t.trim().split(/\r?\n/, 1)[0].trim();
}
function cn(t, e) {
  if (!e?.length) return t;
  const i = new Set(e.map(se));
  return t.split(/\r?\n\s*\r?\n/).filter((n) => !i.has(se(mi(n)))).join(`

`).trim();
}
function dn(t, e, i = (n, r, s) => n?.cells?.[s] ?? "") {
  const n = Array.isArray(t) ? t : [], r = Array.isArray(e) ? e : [];
  let s = -1;
  return n.forEach((a, o) => {
    S(a) || r.some((l, u) => !ne(i(a, o, l, u))) && (s = o);
  }), s >= 0 ? n.slice(0, s + 1) : [];
}
function un(t) {
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
function hn(t) {
  const e = xt(t);
  if (!e) return "";
  const i = {};
  return e.bg && (i.bg = e.bg, i.bg_alpha = typeof e.bg_alpha == "number" ? e.bg_alpha : 0.18), e.color && (i.color = e.color), e.border && (i.border = e.border), Object.keys(i).length ? JSON.stringify(i) : "";
}
function pn(t, e, i) {
  const n = Array.isArray(t) ? t : [];
  if (e < 0 || e >= n.length || S(n[e])) return { covered: !1, span: 1 };
  const r = (o) => {
    if (o < 0 || o >= n.length || S(n[o])) return null;
    const l = i(n[o], o) ?? {}, u = un(l.text);
    return ne(u) ? null : JSON.stringify([u, hn(l.style), l.notes ?? []]);
  }, s = r(e);
  if (!s) return { covered: !1, span: 1 };
  if (r(e - 1) === s) return { covered: !0, span: 0 };
  let a = 1;
  for (; r(e + a) === s; ) a += 1;
  return { covered: !1, span: a };
}
function _i(t) {
  const e = (t ?? "").toString().trim();
  if (!e.startsWith("sensor.")) return "";
  const i = e.slice(7), n = i.match(/^(.+)_woche$/i);
  if (n?.[1]) return `number.${n[1]}_woche_offset`;
  const r = i.match(/^stundenplan_woche_(.+)$/i);
  return r?.[1] ? `number.${r[1]}_woche_offset` : "";
}
function ut(t) {
  const e = pt(t);
  return ["mo", "montag", "mon", "monday"].includes(e) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(e) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(e) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(e) ? 4 : ["fr", "freitag", "fri", "friday"].includes(e) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(e) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(e) ? 7 : null;
}
const kt = [
  { key: "card_background", variable: "--stundenplan-card-background", label: "Kartenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "header_background", variable: "--stundenplan-header-background", label: "Tabellenkopf & Navigation", theme: "--secondary-background-color", fallback: "#eeeeee" },
  { key: "row_background", variable: "--stundenplan-row-background", label: "Zeilenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "divider_color", variable: "--stundenplan-divider-color", label: "Trennlinien", theme: "--divider-color", fallback: "#e0e0e0" }
];
function ae(t) {
  const e = typeof t == "string" ? t.trim() : "";
  return e && !/[;{}]/.test(e) && CSS.supports("color", e) ? e : "";
}
function ni(t) {
  const e = ae(t.color), i = ae(t.background);
  return `${e ? `color:${e};` : ""}${i ? `background-color:${i};` : ""}`;
}
function gt(t) {
  const e = {};
  for (const { key: i } of kt) {
    const n = ae(t[i]);
    n && (e[i] = n);
  }
  return e;
}
const ue = [
  { key: "font_size_subject", variable: "--stundenplan-font-size-subject", label: "Fächer (px)", min: 8, max: 64 },
  { key: "font_size_time", variable: "--stundenplan-font-size-time", label: "Stunden & Uhrzeiten (px)", min: 8, max: 64 },
  { key: "font_size_header", variable: "--stundenplan-font-size-header", label: "Wochentage / Tabellenkopf (px)", min: 8, max: 64 },
  { key: "font_size_details", variable: "--stundenplan-font-size-details", label: "Raum, Lehrer & Hinweise (px)", min: 8, max: 64 },
  { key: "row_height", variable: "--stundenplan-row-height", label: "Mindesthöhe der Stundenzeilen (px)", min: 24, max: 240 },
  { key: "header_table_gap", variable: "--stundenplan-header-table-gap", label: "Abstand Kopfzeile / Tabelle (px)", min: 0, max: 64 },
  { key: "font_size_title_compact", variable: "--stundenplan-font-size-title-compact", label: "Titelgröße kompakt (px)", min: 8, max: 64 }
];
function ft(t) {
  const e = {};
  for (const { key: i, min: n, max: r } of ue) {
    const s = t[i];
    if (typeof s != "number" && typeof s != "string" || String(s).trim() === "") continue;
    const a = Number(s);
    Number.isFinite(a) && (a > 0 || n === 0 && a === 0) && (e[i] = Math.max(n, Math.min(r, a)));
  }
  return e;
}
var Ae;
const U = (Ae = class extends pe {
  constructor() {
    super(...arguments), I(this, He), I(this, We), I(this, Ue, []), I(this, Le, !1), I(this, Ve, ""), I(this, Ke, null), I(this, Ie, "idle"), I(this, Je, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return K(this, He);
  }
  set hass(t) {
    J(this, He, t);
    try {
      const e = this.config;
      if ((e?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (e?.view_mode ?? "week").toString(), u = Number(e?.days_ahead), f = Number.isFinite(u) ? Math.max(0, Math.min(6, Math.floor(u))) : 0;
          if (l === "rolling" && f === 0) {
            const p = ((e?.week_offset_entity ?? "") + "").toString().trim();
            if (p && t?.states?.[p]) {
              const g = Number(t.states[p].state);
              Number.isFinite(g) && g !== 0 && (t.callService("number", "set_value", { entity_id: p, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const c = ((e?.source_entity_integration ?? e?.source_entity ?? "") + "").toString().trim();
                  c && this.hass?.callService("homeassistant", "update_entity", { entity_id: c });
                } catch {
                }
              }, 400));
            }
          }
        } catch {
        }
        const n = ((e?.source_entity_integration ?? e?.source_entity ?? "") + "").toString().trim(), r = t, a = (n ? r?.states?.[n] : void 0)?.attributes ?? {}, o = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (n && o) {
          let l = ((e?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = n.replace(/^sensor\./, "number.") + "_offset");
          const u = l && r?.states && l in r.states, f = n + "|" + l;
          if (u && this.__autokickSig !== f) {
            this.__autokickSig = f;
            const p = r.states[l]?.state, g = Number(p), c = Number.isFinite(g) ? g : 0;
            r.callService("number", "set_value", { entity_id: l, value: c }).catch?.(() => {
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
    return K(this, We);
  }
  set config(t) {
    J(this, We, t);
  }
  get _rowsCache() {
    return K(this, Ue);
  }
  set _rowsCache(t) {
    J(this, Ue, t);
  }
  get _noData() {
    return K(this, Le);
  }
  set _noData(t) {
    J(this, Le, t);
  }
  get _noDataMsg() {
    return K(this, Ve);
  }
  set _noDataMsg(t) {
    J(this, Ve, t);
  }
  get _jsonRows() {
    return K(this, Ke);
  }
  set _jsonRows(t) {
    J(this, Ke, t);
  }
  get _jsonStatus() {
    return K(this, Ie);
  }
  set _jsonStatus(t) {
    J(this, Ie, t);
  }
  get _jsonError() {
    return K(this, Je);
  }
  set _jsonError(t) {
    J(this, Je, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), i = (n) => {
      const r = (n ?? "").toString().trim();
      r && e.add(r);
    };
    return i(t.dated_entries_entity), i(t.week_offset_entity), i(t.source_entity), i(t.source_entity_integration), i(t.source_entity_legacy), i(t.source_entity_a), i(t.source_entity_b), i(t.week_map_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const i = e.last_updated ?? "", n = e.last_changed ?? "", r = e.state ?? "", s = e.attributes ?? {}, a = s.plan ?? s.rows ?? s.rows_table ?? s.rows_json ?? s.rows_ha, o = Array.isArray(a) || typeof a == "string" ? a.length : 0;
    return `${t}|${i}|${n}|${r}|rowsLen=${o}`;
  }
  computeWatchSig(t) {
    const e = this.getWatchedEntities(t).map((r) => this.getEntitySig(r)), i = t.week_mode !== "off" ? this.getActiveWeek(t) : "off", n = this.getWeekOffsetValue(t);
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
    const i = this.hass.states[e], n = (t.week_offset_attribute ?? "").trim(), r = n ? i.attributes?.[n] : i.state, s = Number(r);
    return Number.isFinite(s) ? s : null;
  }
  async setWeekOffset(t, e) {
    const i = (t.week_offset_entity ?? "").trim();
    if (!i) return;
    const n = this.hass?.states?.[i], r = n?.attributes?.min, s = n?.attributes?.max, a = Number.isFinite(Number(r)) ? Number(r) : -52, o = Number.isFinite(Number(s)) ? Number(s) : 52;
    let l = e;
    l = Math.max(a, l), l = Math.min(o, l), await this.hass.callService("number", "set_value", { entity_id: i, value: l });
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this.requestUpdate();
    }, 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  updated(t) {
    if (super.updated(t), t.has("config")) {
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
      merge_double_lessons: !1,
      equal_column_widths: !1,
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      view_mode: "week",
      display_mode: "default",
      days_ahead: 0,
      rolling_switch_mode: "midnight",
      rolling_week_only: !1,
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
    const e = Ae.getStubConfig(), i = ((t?.type ?? e.type) + "").toString();
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
    const e = Ae.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((T) => (T ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = Xt(t.rows, i), r = Xt(t.rows_b, i), s = ((t.view_mode ?? "week") + "").toString().trim(), a = s === "rolling" ? "rolling" : "week", o = ((t.display_mode ?? "default") + "").toString().trim(), l = o === "compact" ? "compact" : "default", u = Number(t.days_ahead), f = Number.isFinite(u) ? Math.max(0, Math.min(6, Math.floor(u))) : 0, p = ((t.rolling_switch_mode ?? e.rolling_switch_mode ?? "midnight") + "").toString().trim(), g = p === "after_last_lesson" || p === "fixed_time" ? p : "midnight", c = ((t.rolling_switch_time ?? e.rolling_switch_time ?? "") + "").toString().trim(), h = ((t.week_mode ?? e.week_mode) + "").toString().trim(), y = h === "kw_parity" || h === "week_map" || h === "off" ? h : "off", v = (() => {
      const T = ((t.source_type ?? "") + "").toString().trim();
      if (T === "manual" || T === "entity" || T === "json" || T === "sensor") return T;
      const Q = ((t.source_entity ?? e.source_entity) + "").toString().trim();
      if (Q) {
        const _e = ((t.source_attribute ?? "") + "").toString().trim(), X = ((t.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(Q) && (_e === "" || _e === "rows_table") && (X === "" || X === "time")) && (_e || X) ? "legacy" : "entity";
      }
      return "manual";
    })(), _ = (t.source_entity ?? e.source_entity).toString().trim(), w = (t.source_entity_integration ?? "").toString().trim(), x = (t.source_entity_legacy ?? "").toString().trim(), D = v === "sensor" ? x || _ : v === "entity" && w || _, O = (t.week_offset_entity ?? "").toString().trim() || _i(D);
    return {
      type: (t.type ?? e.type).toString(),
      title: (t.title ?? e.title).toString(),
      show_title: t.show_title ?? e.show_title,
      title_font_size: Number.isFinite(Number(t.title_font_size)) ? Math.max(0, Math.min(40, Number(t.title_font_size))) : e.title_font_size,
      title_font_family: (t.title_font_family ?? e.title_font_family ?? "").toString(),
      ...ft(t),
      ...gt(t),
      show_header_date: t.show_header_date ?? e.show_header_date,
      show_time_column: t.show_time_column ?? e.show_time_column,
      show_week_navigation: t.show_week_navigation ?? e.show_week_navigation,
      trim_empty_rows: t.trim_empty_rows ?? e.trim_empty_rows,
      hidden_subjects: qe(t.hidden_subjects),
      dated_entries: Array.isArray(t.dated_entries) ? t.dated_entries : [],
      dated_entries_entity: typeof t.dated_entries_entity == "string" ? t.dated_entries_entity.trim() : "",
      dated_entries_attribute: typeof t.dated_entries_attribute == "string" && t.dated_entries_attribute.trim() || "entries",
      merge_double_lessons: t.merge_double_lessons ?? e.merge_double_lessons,
      equal_column_widths: t.equal_column_widths ?? e.equal_column_widths,
      days: i,
      view_mode: a,
      display_mode: l,
      days_ahead: f,
      rolling_switch_mode: g,
      rolling_week_only: t.rolling_week_only === !0,
      rolling_switch_time: c,
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
      source_entity: D,
      source_entity_integration: w || "",
      source_entity_legacy: x || "",
      source_attribute: v === "entity" ? "rows_table" : ((t.source_attribute ?? e.source_attribute ?? "plan") + "").toString(),
      source_time_key: v === "entity" ? "time" : ((t.source_time_key ?? e.source_time_key ?? "Stunde") + "").toString(),
      source_type: v,
      json_url: (t.json_url ?? "").toString(),
      week_offset_entity: O,
      week_offset_attribute: (t.week_offset_attribute ?? "").toString(),
      week_mode: y,
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
      rows_b: r
    };
  }
  getTodayIndex(t, e) {
    const i = /* @__PURE__ */ new Date(), n = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(e) && e.length) {
      const l = e.map((u) => {
        if (u instanceof Date && !Number.isNaN(u.getTime()))
          return `${u.getFullYear()}${String(u.getMonth() + 1).padStart(2, "0")}${String(u.getDate()).padStart(2, "0")}`;
        const f = (u ?? "").toString().trim(), p = f.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return p ? `${p[1]}${p[2]}${p[3]}` : f;
      }).indexOf(n);
      return l >= 0 ? l : -1;
    }
    const r = i.getDay(), s = new Set(ln(r).map(pt));
    if (!s.size) return -1;
    const a = (t ?? []).map((o) => pt(o));
    for (let o = 0; o < a.length; o++) if (s.has(a[o])) return o;
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
    const r = /* @__PURE__ */ new Date(), s = r.getHours() * 60 + r.getMinutes();
    return s >= i && s < n;
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
    const n = this.hass.states[i], r = (e ?? "").toString().trim(), s = r ? n.attributes?.[r] : n.state;
    return this.parseAnyJson(s);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], n = (t.source_time_key ?? "time").toString().trim(), r = "Stunde", s = "time", a = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o?.time ?? o?.[n] ?? o?.[r] ?? o?.[s] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[n] ?? o?.[r] ?? o?.[s] ?? "").toString(), u = ge(l), f = Array.isArray(o?.cells) ? Array.from({ length: i.length }, (v, _) => (o?.cells?.[_] ?? "").toString()) : Array.from({ length: i.length }, (v, _) => {
        const w = (i[_] ?? "").toString();
        return (o?.[w] ?? "").toString();
      }), p = Array.isArray(o?.cell_styles) ? Array.from({ length: i.length }, (v, _) => xt(o?.cell_styles?.[_])) : [], g = Array.isArray(o?.cell_times) ? Array.from({ length: i.length }, (v, _) => fi(o.cell_times[_])) : [], c = (o?.start ?? "").toString().trim() || u.start, h = (o?.end ?? "").toString().trim() || u.end, y = { time: l, start: c || void 0, end: h || void 0, cells: f };
      return p.some((v) => !!v) && (y.cell_styles = p), g.some((v) => !!v) && (y.cell_times = g), y;
    });
    return a.length ? a : null;
  }
  getRowsFromEntity(t, e, i) {
    let n = this.readEntityJson(e, i);
    if (n == null && i && (i + "").toString().trim() && (i + "").toString().trim() !== "plan" && (n = this.readEntityJson(e, "plan")), n == null && (n = this.readEntityJson(e, "rows_ha")), n == null && (n = this.readEntityJson(e, "rows")), n == null && (n = this.readEntityJson(e, "rows_table")), n == null && (n = this.readEntityJson(e, "rows_json")), n && typeof n == "object" && !Array.isArray(n)) {
      const r = n.plan, s = n.rows;
      Array.isArray(r) ? n = r : Array.isArray(s) && (n = s);
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
      const r = await n.json(), s = Array.isArray(r) ? r : Array.isArray(r?.rows) ? r.rows : null, a = s ? this.buildRowsFromArray(t, s) : null;
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
    const { isoWeek: i } = ti(e), n = i % 2 === 0, r = !!t.week_a_is_even_kw;
    return n === r ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), n = this.readEntityJson(e, i);
    if (!n || typeof n != "object") return null;
    const { isoWeek: r, isoYear: s } = ti(this.getBaseDate(t)), a = String(r), o = String(s);
    if (n?.[o] && typeof n[o] == "object") {
      const u = ii(n[o][a]);
      if (u) return u;
    }
    return ii(n?.[a]) || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  filterCellText(t, e) {
    return cn((t ?? "").toString().trim(), e.hidden_subjects);
  }
  getDatedCell(t, e, i, n, r) {
    const s = this.filterCellText(e?.cells?.[i], t);
    if (!r?.length || S(e)) return { text: s, notes: [] };
    const a = /* @__PURE__ */ new Map(), o = [];
    ht("", e, i, n, r).notes.forEach((l) => a.set(JSON.stringify(l), l));
    for (const l of s.split(/\r?\n\s*\r?\n/)) {
      const u = ht(l, e, i, n, r), f = this.filterCellText(u.text, t);
      f && (o.push(f), u.notes.forEach((p) => a.set(JSON.stringify(p), p)));
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
    const e = ft(t);
    return ue.filter(({ key: i }) => e[i] != null).map(({ key: i, variable: n }) => `${n}:${e[i]}px`).join(";");
  }
  getAppearanceStyle(t) {
    const e = gt(t);
    return kt.filter(({ key: i }) => e[i] != null).map(({ key: i, variable: n }) => `${n}:${e[i]}`).join(";");
  }
  fmtYMD(t) {
    return `${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, "0")}${String(t.getDate()).padStart(2, "0")}`;
  }
  findConfiguredDayIndexForDate(t, e) {
    const i = t.getDay() === 0 ? 7 : t.getDay();
    return (e ?? []).findIndex((n) => ut(n) === i);
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
    const i = this._rowsCache ?? [];
    if (t?.hidden_subjects?.length) {
      const n = Qe(t, this.hass).entries, r = this.findConfiguredDayIndexForDate(e, t.days);
      if (r < 0) return "";
      let s = "";
      for (let a = 0; a < i.length; a++) {
        const o = this.getManualRowForDate(t, i[a], a, e);
        if (S(o) || ne(this.getDatedCell(t, o, r, e, n).text)) continue;
        const l = o?.cell_times?.[r]?.end || o?.end;
        if (!/^\d{1,2}:\d{2}$/.test(l ?? "")) return "";
        const [u, f] = l.split(":").map(Number);
        if (u > 23 || f > 59) return "";
        const p = `${String(u).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
        p > s && (s = p);
      }
      return s;
    }
    for (let n = i.length - 1; n >= 0; n--) {
      const r = i[n];
      if (!S(r) && r?.end) return (r.end + "").toString().trim();
    }
    return "";
  }
  shouldAdvanceRollingDay(t, e) {
    if (!this.isConfiguredSchoolday(e, t.days ?? [])) return !0;
    const i = ((t.rolling_switch_mode ?? "midnight") + "").toString();
    if (i === "after_last_lesson") {
      const n = this.getLastLessonEnd(t, e);
      if (!n) return !1;
      const [r, s] = n.split(":").map(Number);
      return Number.isFinite(r) && Number.isFinite(s) ? e.getHours() > r || e.getHours() === r && e.getMinutes() >= s : !1;
    }
    if (i === "fixed_time") {
      const n = ((t.rolling_switch_time ?? "") + "").toString().trim(), [r, s] = n.split(":").map(Number);
      return Number.isFinite(r) && Number.isFinite(s) ? e.getHours() > r || e.getHours() === r && e.getMinutes() >= s : !1;
    }
    return !1;
  }
  getRollingVisibleSlots(t, e, i = /* @__PURE__ */ new Date()) {
    const n = t.days ?? [];
    if (!n.length) return [];
    const r = i;
    let s = new Date(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, 0);
    this.isConfiguredSchoolday(s, n) ? this.shouldAdvanceRollingDay(t, r) && (s = this.nextConfiguredSchoolday(s, n)) : s = this.nextConfiguredSchoolday(s, n);
    const a = [], o = Math.max(0, Math.min(6, e));
    let l = new Date(s);
    const u = new Date(s);
    u.setDate(s.getDate() + (7 - (s.getDay() || 7))), u.setHours(23, 59, 59, 999);
    for (let f = 0; f <= o && !(t.rolling_week_only && l > u); f++) {
      const p = this.findConfiguredDayIndexForDate(l, n);
      p >= 0 && a.push({ orig: p, date: new Date(l) }), l = this.nextConfiguredSchoolday(l, n);
    }
    return a;
  }
  async handleCardAction(t, e) {
    if (!e || e.defaultPrevented || z(this) || (e.composedPath?.() ?? []).some((r) => r instanceof HTMLElement && (r.closest?.(".offsetInline") || r.closest?.(".btnMini")))) return;
    const n = this.normalizeTapAction(t.tap_action);
    if (!(!n || n.action === "none")) {
      if (n.action === "toggle_view") {
        const r = ((this._uiViewMode ?? t.view_mode ?? "week") + "").toString();
        this._uiViewMode = r === "rolling" ? "week" : "rolling", this.requestUpdate();
        return;
      }
      if (n.action === "popup_week") {
        this._uiPopupOpen = !0, this.requestUpdate();
        return;
      }
      if (n.action === "navigate") {
        const r = (n.navigation_path ?? "").toString().trim();
        if (!r) return;
        history.pushState(null, "", r), Ze(window, "location-changed", { replace: !1 });
        return;
      }
      if (n.action === "url") {
        const r = (n.url_path ?? "").toString().trim();
        if (!r) return;
        window.open(r, n.target || "_blank");
        return;
      }
      if (n.action === "more-info") {
        const r = (n.entity ?? t.source_entity ?? t.source_entity_integration ?? "").toString().trim();
        if (!r) return;
        Ze(this, "hass-more-info", { entityId: r });
      }
    }
  }
  closeWeekPopup(t) {
    t?.stopPropagation?.(), this._uiPopupOpen = !1, this.requestUpdate();
  }
  handlePreviewNote(t, e, i, n, r, s) {
    z(this) && (e.stopPropagation(), this.dispatchEvent(new CustomEvent("stundenplan-add-note", {
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      detail: {
        config: this.config,
        date: B(r),
        period: he(i?.cell_times?.[n]?.time || i?.time),
        note: s,
        sourceText: i?.cells?.[n] ?? ""
      }
    })));
  }
  updatePreviewTooltip(t, e) {
    if (!z(this)) return;
    const i = { config: this.config, text: t.source_type === "manual" ? "Fach bearbeiten" : "Termin oder Hinweis hinzufügen" };
    this.dispatchEvent(new CustomEvent("stundenplan-preview-tooltip", { bubbles: !0, composed: !0, detail: i })), e.currentTarget.title = i.text;
  }
  handlePreviewCell(t, e, i, n, r, s = 1) {
    if (!z(this)) return;
    e.stopPropagation();
    let a = e.currentTarget.parentElement;
    for (let c = 1; c < s && (a = a?.nextElementSibling, a && e.clientY >= a.getBoundingClientRect().top); c++)
      i++;
    const o = this.getManualRowForDate(t, this._rowsCache[i], i, r), l = he(o?.cell_times?.[n]?.time || o?.time);
    if (n >= 0 && o && !S(o) && l && B(r)) {
      const c = new CustomEvent("stundenplan-add-note", {
        bubbles: !0,
        composed: !0,
        cancelable: !0,
        detail: { config: this.config, date: B(r), period: l }
      });
      if (!this.dispatchEvent(c)) return;
    }
    if (t.source_type !== "manual") return;
    let u = t.week_mode === "kw_parity" ? r instanceof Date ? this.weekFromParityAtDate(t, r) : this.getActiveWeek(t) : "A";
    u === "B" && !t.rows_b?.length && (u = "A");
    const f = u === "B" ? t.rows_b : t.rows, p = this.getManualRowForDate(t, this._rowsCache[i], i, r), g = f.indexOf(p);
    g < 0 || Ze(this, "stundenplan-edit-cell", { config: this.config, rowIndex: g, dayIndex: n, week: u });
  }
  getBaseDate(t) {
    const e = this.getWeekOffsetValue(t) ?? 0, i = /* @__PURE__ */ new Date();
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
    const r = [];
    for (const s of n) {
      const a = (s ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const o = Number(a[1]), l = Number(a[2]), u = Number(a[3]), f = new Date(o, l - 1, u, 12, 0, 0, 0);
      Number.isNaN(f.getTime()) || r.push(f);
    }
    return r.length ? r : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(t) {
    const e = ((t.source_type ?? "manual") + "").toString().trim();
    if (e !== "entity" && e !== "sensor") return null;
    const i = (e === "entity" ? (t.source_entity_integration || t.source_entity) ?? "" : e === "sensor" ? (t.source_entity_legacy || t.source_entity) ?? "" : t.source_entity ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const n = this.hass.states[i].attributes ?? {}, r = n?.meta_ha ?? n?.meta ?? (typeof n?.meta_json == "string" ? this.parseAnyJson(n.meta_json) : null) ?? null;
    if (!r) return null;
    const s = (t.days?.length ?? 0) || 5, a = r?.updated_days;
    if (Array.isArray(a) && a.length) {
      const l = (a[0] ?? "").toString().trim();
      return Array.from({ length: s }, (f, p) => (a[p] ?? l ?? "").toString().trim());
    }
    const o = (r?.updated_raw ?? r?.updated ?? "").toString().trim();
    return o ? Array.from({ length: s }, () => o) : null;
  }
  getRowsResolved(t) {
    const e = t.source_type ?? "manual", i = (e === "entity" ? (t.source_entity_integration || t.source_entity) ?? "" : e === "sensor" ? (t.source_entity_legacy || t.source_entity) ?? "" : t.source_entity ?? "").toString().trim();
    if (e === "manual")
      return t.week_mode === "kw_parity" && this.getActiveWeek(t) === "B" ? Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : t.rows ?? [] : t.rows ?? [];
    if (e === "json")
      return this.ensureJsonLoaded(t), this._jsonRows ?? [];
    if (t.week_mode !== "off") {
      const r = this.getActiveWeek(t), s = (t.source_entity_a ?? "").trim(), a = (t.source_entity_b ?? "").trim(), o = (t.source_attribute_a ?? "").trim(), l = (t.source_attribute_b ?? "").trim();
      if (r === "A" && s)
        return this.getRowsFromEntity(t, s, o) ?? [];
      if (r === "B" && a)
        return this.getRowsFromEntity(t, a, l) ?? [];
      const u = i;
      return u ? this.getRowsFromEntity(t, u, ((t.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
    }
    const n = i;
    return n ? this.getRowsFromEntity(t, n, ((t.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
  }
  getManualRowForDate(t, e, i, n) {
    if ((t.source_type ?? "manual") !== "manual" || t.week_mode !== "kw_parity" || !(n instanceof Date)) return e;
    const r = this.weekFromParityAtDate(t, n), s = r === "B" && Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : t.rows ?? [], a = (e?.time ?? "").toString();
    return s.find((l) => S(l) === S(e) && (l?.time ?? "").toString() === a) ?? s[i] ?? e;
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
    const n = "Keine Daten für diesen Zeitraum (Ferien/Feiertag).";
    !i || i.length === 0 ? (this._noData = !0, e === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || n}` : e === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = n) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(t) {
    const e = (t ?? "").toString().replace(/\r/g, "").trim();
    if (!e) return null;
    const i = e.split(`
`).map((g) => g.trim()).filter((g) => g.length > 0);
    if (!i.length) return null;
    const n = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(n)) return null;
    const r = i[0];
    if (/^(—|\-|–|---)$/.test(r)) return null;
    const s = (g) => {
      const c = (g ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(c) || /\bfällt\s+aus\b/i.test(c) || /\bverlegt\b/i.test(c) || /\bentfällt\b/i.test(c) || /\bvertretung\b/i.test(c) || /\bstatt\b/i.test(c) || /\bgehalten\b/i.test(c) || /\bAufgaben\b/i.test(c) || /^für\b/i.test(c);
    }, a = (g) => {
      const c = (g ?? "").toString().trim();
      return /^\d{1,4}$/.test(c) || /^[A-Za-zÄÖÜäöüß]{1,8}\s*\d{1,4}$/i.test(c) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(c) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/i.test(c);
    }, o = i.slice(1);
    let l = -1;
    for (let g = 0; g < o.length; g++)
      if (!s(o[g]) && a(o[g])) {
        l = g;
        break;
      }
    if (l < 0) {
      for (let g = o.length - 1; g >= 0; g--)
        if (a(o[g])) {
          l = g;
          break;
        }
    }
    if (l < 0) return null;
    const u = o[l];
    let f;
    for (let g = l + 1; g < o.length; g++) {
      const c = o[g];
      if (!s(c) && !a(c)) {
        f = c;
        break;
      }
    }
    if (!f) {
      const g = o.filter((c) => !s(c) && !a(c));
      f = g.length ? g[g.length - 1] : void 0;
    }
    const p = i.slice(1).filter((g) => s(g));
    return { fach: r, raum: u, lehrer: f, notes: p.length ? p : void 0 };
  }
  renderCell(t, e) {
    const i = (t ?? "").toString(), n = this.filterCellText(i, e);
    if (ne(n)) return d``;
    const r = (() => {
      let c = n.replace(/\r/g, "").split(`
`).map((y) => (y ?? "").toString().trim());
      for (; c.length && /^(—|–|-)$/.test(c[0]); ) c.shift();
      const h = [];
      for (const y of c) {
        const v = y.length === 0;
        if (!/^(—|–|-)$/.test(y)) {
          if (v) {
            if (h.length === 0 || h[h.length - 1] === "") continue;
            h.push("");
            continue;
          }
          h.push(y);
        }
      }
      for (; h.length && h[h.length - 1] === ""; ) h.pop();
      return h.join(`
`);
    })();
    if (ne(r)) return d``;
    const s = r.split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean), a = (c) => {
      if (c.startsWith("🔴")) return "note noteRed";
      if (c.startsWith("🟠")) return "note noteOrange";
      if (c.startsWith("🟡")) return "note noteYellow";
      const h = c;
      return /\bfällt\s+aus\b/i.test(h) || /\bverlegt\b/i.test(h) || /\bstatt\b/i.test(h) || /\bgehalten\b/i.test(h) || /\bentfällt\b/i.test(h) ? "note noteRed" : "note";
    }, o = (c) => (c ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim(), l = (c) => {
      const h = (c ?? "").toString().trim();
      if (!h) return d``;
      const y = this.parseCellTriplet(h);
      if (y?.fach && y?.raum && y?.lehrer)
        return d`
          <div class="cellWrap">
            <div class="fach">${y.fach}</div>
            <div class="lehrer">${y.lehrer}</div>
            <div class="raum">${y.raum}</div>

            ${y.notes?.length ? d`
                  <div class="notes">
                    ${y.notes.map((x) => {
          const D = a(x), O = o(x) || x;
          return d`<div class=${D}><span class="txt">${O}</span></div>`;
        })}
                  </div>
                ` : d``}
          </div>
        `;
      const v = h.split(`
`).map((x) => x.trim()).filter(Boolean), _ = (v[0] ?? "").trim(), w = v.slice(1);
      return _ && w.length ? d`
          <div class="cellWrap">
            <div class="fach">${_}</div>
            <div class="notes">
              ${w.map((x) => {
        const D = a(x), O = o(x) || x;
        return d`<div class=${D}><span class="txt">${O}</span></div>`;
      })}
            </div>
          </div>
        ` : d`<span class="cellText">${h}</span>`;
    };
    if (s.length > 1)
      return d`<div class="cellMulti">${s.map((c) => l(c))}</div>`;
    const u = (r ?? "").split(`
`).map((c) => c.trim()).filter(Boolean), f = /^(?:\d{1,4}|[A-Za-zÄÖÜäöüß]{1,8}\s*\d{1,4}|[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}|\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12})$/i, p = /^[A-Za-zÄÖÜäöüß]{2,12}$/i, g = (c) => {
      const h = (c ?? "").trim();
      if (!h || f.test(h)) return !1;
      const y = h.toLowerCase();
      return y.startsWith("statt ") || y.includes("fällt aus") || y.includes("verlegt") || y.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(h) ? !1 : /[a-z0-9äöü]/i.test(h);
    };
    if (u.length >= 6 && u.length % 3 === 0) {
      const c = [];
      for (let h = 0; h < u.length; h += 3) {
        const y = u[h] ?? "", v = u[h + 1] ?? "", _ = u[h + 2] ?? "";
        if (!g(y) || !f.test(v) || !p.test(_)) {
          c.length = 0;
          break;
        }
        c.push([y, v, _].join(`
`));
      }
      if (c.length >= 2)
        return d`<div class="cellMulti">${c.map((h) => l(h))}</div>`;
    }
    return l(r);
  }
  renderCardLayout(t, e = null, i = !1) {
    const n = this._rowsCache, r = this.getHeaderDaysFromEntity(t), s = this.getTodayIndex(t.days ?? [], r), a = ((e ?? this._uiViewMode ?? t.view_mode ?? "week") + "").toString(), o = Number(t.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, u = "1px solid var(--stundenplan-divider-color, var(--divider-color))", f = ei(t.highlight_today_color ?? "", 0.12), p = ei(t.highlight_current_color ?? "", 0.18), g = (t.highlight_current_text_color ?? "").toString().trim(), c = (t.highlight_current_time_text_color ?? "").toString().trim(), h = t.week_mode !== "off", y = h ? this.getActiveWeek(t) : null, v = this.getWeekOffsetValue(t), _ = (t.source_type ?? "manual").toString(), w = t.show_time_column !== !1, x = !i && (t.week_offset_entity ?? "").trim().length > 0, D = x && (_ === "entity" || _ === "sensor" && (t.week_mode ?? "off") !== "off"), O = D && t.show_week_navigation !== !1, T = r && r.length >= (t.days?.length ?? 0) ? r : null, Q = this.getHeaderUpdatedFromEntity(t), _e = this.getBaseDate(t), X = this.mondayOfWeek(_e), St = this.normalizeTapAction(t.tap_action), yi = i ? "default" : t.display_mode ?? "default", wi = `${yi === "compact" ? "compact" : ""}${!i && St.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}${t.header_table_gap != null ? " customHeaderGap" : ""}`, At = t.show_title !== !1 && (t.title ?? "").toString().trim().length > 0, vi = this.getTitleStyle(t), $i = At || h || O, xi = a === "rolling" && (i || !D || (v ?? 0) === 0), be = xi ? this.getRollingVisibleSlots(t, l) : [], L = be.length ? be.map((m) => m.orig) : Array.from({ length: t.days?.length ?? 0 }, (m, $) => $), ye = L.map((m) => t.days[m]), A = be.length ? be.map((m) => m.date) : null, ee = Qe(t, this.hass), H = (m) => {
      if (A) return A[m];
      const $ = ut(t.days[L[m]]);
      if (!$) return null;
      if (T) return T.find((M) => (M.getDay() || 7) === $) ?? null;
      const k = new Date(X);
      return k.setDate(k.getDate() + $ - 1), k;
    }, rt = be.length ? 0 : Math.max(0, L.indexOf(s)), je = L[rt] ?? 0, Ne = A?.[rt] ?? null, Dt = Ne instanceof Date ? this.fmtYMD(Ne) === this.fmtYMD(/* @__PURE__ */ new Date()) : je === s, we = t.trim_empty_rows || t.hidden_subjects?.length ? dn(n, L, (m, $, k, M) => {
      const j = this.getManualRowForDate(t, m, $, A?.[M]), N = this.getDatedCell(t, j ?? m, k, H(M), ee.entries);
      return N.text + N.notes.map((V) => V.text).join(" ");
    }) : n, Mt = /* @__PURE__ */ new Set(), Et = (this._noData || we.forEach((m, $) => {
      S(m) || L.forEach((k, M) => {
        const j = this.getManualRowForDate(t, m, $, H(M)) ?? m;
        Mt.add(`${B(H(M))}/${he(j.cell_times?.[k]?.time || j.time)}`);
      });
    }), Ri(ee.entries, Mt)), Tt = (() => {
      const m = /* @__PURE__ */ new Map();
      return !T || !Q || T.forEach(($, k) => {
        const M = Q[k];
        $ instanceof Date && M && m.set(this.fmtYMD($), M);
      }), m;
    })();
    return d`
      <ha-card class=${wi} style=${[this.getTypographyStyle(t), this.getAppearanceStyle(t)].filter(Boolean).join(";")} @click=${i ? (m) => this.closeWeekPopup(m) : (m) => this.handleCardAction(t, m)}>
        ${$i ? d`<div class="headerRow">
          ${At ? d`<div class="title" style=${vi}>${t.title ?? ""}</div>` : d`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${h ? d`<div class="weekBadgeInline">Woche <b>${y}</b></div>` : d``}

            ${O ? d`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${(m) => {
      m.stopPropagation(), v != null && this.setWeekOffset(t, v - 1);
    }}>&lt;</button>
                    <div class="offsetVal">${v ?? "?"}</div>
                    <button class="btnMini" @click=${(m) => {
      m.stopPropagation(), v != null && this.setWeekOffset(t, v + 1);
    }}>&gt;</button>
                  </div>
                ` : d``}
          </div>
        </div>` : d``}

        <div class="card">
          <table class=${t.equal_column_widths ? "equalColumns" : ""}>
            <thead>
              <tr>
                ${w ? d`<th class="time">Stunde</th>` : d``}
                ${ye.map((m, $) => {
      const k = L[$], M = t.highlight_today && (A ? this.fmtYMD(A[$]) === this.fmtYMD(/* @__PURE__ */ new Date()) : k === s) ? "today" : "";
      let j = "";
      if (A?.[$] instanceof Date)
        j = this.fmtDDMMYYYY(A[$]);
      else if (T)
        j = this.fmtDDMMYYYY(T[k]);
      else {
        const N = ut(m);
        if (N) {
          const V = new Date(X);
          V.setDate(X.getDate() + (N - 1)), j = this.fmtDDMMYYYY(V);
        }
      }
      return d`
                    <th class=${M} style=${`--sp-hl:${f};`}>
                      <div>${m}</div>
                      ${t.show_header_date !== !1 ? d`<div class="thDate">${j}</div>` : d``}
                      ${A?.[$] ? Tt.get(this.fmtYMD(A[$])) ? d`<div class="thUpdated">(aktualisiert: ${Tt.get(this.fmtYMD(A[$]))})</div>` : d`` : Q?.[k] ? d`<div class="thUpdated">(aktualisiert: ${Q[k]})</div>` : d``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? d`<tr class="nodata"><td class="nodataCell" colspan=${ye.length + (w ? 1 : 0)}>${this._noDataMsg}</td></tr>` : t.hidden_subjects?.length && n.length && !we.length ? d`<tr class="nodata"><td class="nodataCell" colspan=${ye.length + (w ? 1 : 0)}>Keine Einträge nach Filterung.</td></tr>` : we.map((m, $) => {
      if (S(m)) {
        const ve = ge(m.time), R = !!ve.start && !!ve.end && this.isNowBetween(ve.start, ve.end), E = !!t.highlight_breaks && R;
        let P = `--sp-hl:${p};`, Be = "";
        return E && (P += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", Be += `--sp-hl:${p}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), E && t.highlight_current_time_text && c && (P += `color:${c};`), d`
                    <tr class="break">
                      ${w ? d`<td class="time" style=${P}>${m.time}</td>` : d``}
                      <td colspan=${ye.length} style=${Be} @click=${($e) => this.handlePreviewCell(t, $e, $, -1, Ne)}>${m.label ?? ""}</td>
                    </tr>
                  `;
      }
      const k = m, M = k.cells ?? [], j = k.cell_styles ?? [], N = this.getManualRowForDate(t, k, $, Ne), V = (N?.cell_times ?? k.cell_times)?.[je] ?? null, Ct = V?.time || N?.time || k.time, Pe = V?.start || N?.start || k.start, Fe = V?.end || N?.end || k.end, st = Dt && !!Pe && !!Fe && this.isNowBetween(Pe, Fe), ki = s >= 0 ? M[s] ?? "" : "", Si = ee.entries.length ? this.getDatedCell(t, N ?? k, je, H(rt), ee.entries).text : s >= 0 ? this.filterCellText(ki, t) : "", Ai = s >= 0 ? ne(Si) : !1, at = !(t.free_only_column_highlight && Ai), zt = ge(Ct), Di = !!(zt.start && zt.end), Rt = !Di && Pe && Fe ? `${Pe}–${Fe}` : "";
      let ot = `--sp-hl:${p};`;
      return at && t.highlight_current && st && (ot += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), at && st && t.highlight_current_time_text && c && (ot += `color:${c};`), d`
                  <tr>
                    ${w ? d`<td class="time" style=${ot}>
                      <div class="timeWrap">
                        <div class="timeSt">${Ct}</div>
                        ${Rt ? d`<div class="timeHm">${Rt}</div>` : d``}
                      </div>
                    </td>` : d``}

                    ${ye.map((ve, R) => {
        const E = L[R], P = this.getManualRowForDate(t, k, $, A?.[R]);
        P?.cells;
        const Be = P?.cell_styles ?? j, $e = A ? this.fmtYMD(A[R]) === this.fmtYMD(/* @__PURE__ */ new Date()) : E === s, jt = this.getDatedCell(t, P ?? k, E, H(R), ee.entries), Nt = jt.text, Mi = Be[E] ?? null, Ei = t.highlight_today && $e ? "today" : "", xe = t.merge_double_lessons ? pn(we, $, (C, F) => {
          const ce = this.getManualRowForDate(t, C, F, A?.[R]), ke = this.getDatedCell(t, ce ?? C, E, H(R), ee.entries);
          return { text: ke.text, notes: ke.notes, style: (ce?.cell_styles ?? C?.cell_styles ?? [])[E] ?? null };
        }) : { covered: !1, span: 1 };
        if (xe.covered) return b;
        let Pt = `--sp-hl:${f};` + on(Mi, u);
        const Ti = !ne(Nt), Ci = (() => {
          if (!$e || !Dt || E !== je || xe.span <= 1) return !1;
          const C = (P?.cell_times ?? k.cell_times)?.[E] ?? null, F = $ + xe.span - 1, ce = we[F], ke = this.getManualRowForDate(t, ce, F, A?.[R]), zi = (ke?.cell_times ?? ce?.cell_times)?.[E] ?? null, Ft = C?.start || P?.start || k.start, Bt = zi?.end || ke?.end || ce?.end;
          return !!Ft && !!Bt && this.isNowBetween(Ft, Bt);
        })();
        return at && Ti && ($e && (st || Ci)) && t.highlight_current_text && g && s >= 0 && E === s && (Pt += `color:${g};`), d`<td class=${Ei} style=${Pt} rowspan=${xe.span} @mouseenter=${(C) => this.updatePreviewTooltip(t, C)} @click=${(C) => this.handlePreviewCell(t, C, $, E, H(R), xe.span)}>${this.renderCell(Nt, t)}${jt.notes.map((C) => d`<div class="datedNote" style=${ni(C)}
          title=${z(this) ? "Hinweis bearbeiten" : b}
          role=${z(this) ? "button" : b} tabindex=${z(this) ? "0" : b}
          @click=${(F) => this.handlePreviewNote(t, F, P ?? k, E, H(R), C)}
          @keydown=${(F) => {
          z(this) && (F.key === "Enter" || F.key === " ") && (F.preventDefault(), this.handlePreviewNote(t, F, P ?? k, E, H(R), C));
        }}>${C.text}</div>`)}</td>`;
      })}
                  </tr>
                `;
    })}
            </tbody>
          </table>
          ${Et.length ? d`<div class="upcomingNotes"><strong>Anstehende Termine</strong>
            <div class="datedWarning">Termine außerhalb der angezeigten Stunden. Noch nicht geladener Unterricht wird dadurch nicht bestätigt.</div>
            ${Et.map((m) => d`<div class="datedNote" style=${ni(m)}
              title=${z(this) ? "Hinweis bearbeiten" : b}
              role=${z(this) ? "button" : b} tabindex=${z(this) ? "0" : b}
              @click=${($) => this.handlePreviewNote(t, $, { time: m.periods[0] }, 0, /* @__PURE__ */ new Date(`${m.date}T12:00:00`), m)}
              @keydown=${($) => {
      z(this) && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), this.handlePreviewNote(t, $, { time: m.periods[0] }, 0, /* @__PURE__ */ new Date(`${m.date}T12:00:00`), m));
    }}><strong>${m.text}</strong><br>${ri(m).detail}</div>`)}
          </div>` : b}
          ${ee.warnings.map((m) => d`<div class="datedWarning" role="status">${m}</div>`)}
        </div>
      </ha-card>
    `;
  }
  render() {
    if (!this.config) return d``;
    const t = this.config;
    return d`
      ${this.renderCardLayout(t)}
      ${this._uiPopupOpen ? d`
        <div class="popupBackdrop" @click=${(e) => this.closeWeekPopup(e)}>
          <div class="popupShell">
            ${this.renderCardLayout(t, "week", !0)}
          </div>
        </div>
      ` : d``}
    `;
  }
}, Ae.styles = ai`
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

    .time {
      font-weight: 700;
      white-space: nowrap;
      width: 125px;
    }
    .timeWrap {
      display: grid;
      gap: 2px;
      justify-items: center;
      line-height: 1.1;
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
`, Ae);
He = /* @__PURE__ */ new WeakMap();
We = /* @__PURE__ */ new WeakMap();
Ue = /* @__PURE__ */ new WeakMap();
Le = /* @__PURE__ */ new WeakMap();
Ve = /* @__PURE__ */ new WeakMap();
Ke = /* @__PURE__ */ new WeakMap();
Ie = /* @__PURE__ */ new WeakMap();
Je = /* @__PURE__ */ new WeakMap();
W([
  ui({ attribute: !1 })
], U.prototype, "hass", 1);
W([
  G()
], U.prototype, "config", 1);
W([
  G()
], U.prototype, "_rowsCache", 1);
W([
  G()
], U.prototype, "_noData", 1);
W([
  G()
], U.prototype, "_noDataMsg", 1);
W([
  G()
], U.prototype, "_jsonRows", 1);
W([
  G()
], U.prototype, "_jsonStatus", 1);
W([
  G()
], U.prototype, "_jsonError", 1);
let Ye = U;
function z(t) {
  for (let e = t; e; e = e.parentNode ?? e.host)
    if (e.localName === "hui-dialog-edit-card") return e;
  return null;
}
function Ze(t, e, i) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function ie(t, e = !1) {
  if (typeof t == "boolean") return t;
  if (t == null) return e;
  const i = String(t).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : e;
}
function gn(t) {
  return (t ?? "").split(",").map((e) => e.trim()).filter((e) => e.length > 0);
}
function fn(t) {
  return (t ?? []).map((e) => (e ?? "").toString().trim()).filter(Boolean).join(", ");
}
const mt = class extends pe {
  constructor() {
    super(...arguments), this._unsubEntities = null, this._didSubEntities = !1, this._open = {
      general: !1,
      rolling: !1,
      filters: !1,
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
    }, this._datedToday = B(/* @__PURE__ */ new Date());
  }
  connectedCallback() {
    super.connectedCallback(), this._previewDialog = z(this), this._previewDialog?.addEventListener("stundenplan-edit-cell", this._onPreviewCell), this._previewDialog?.addEventListener("stundenplan-add-note", this._onPreviewNote), this._previewDialog?.addEventListener("stundenplan-preview-tooltip", this._onPreviewTooltip), this.ensureUiLoaded(), this.ensureEntitySubscription(), this.refreshDatedDay(), this._datedDayTimer = window.setInterval(() => this.refreshDatedDay(), 6e4);
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
    const e = B(/* @__PURE__ */ new Date());
    e !== this._datedToday && (this._datedToday = e, this.requestUpdate());
  }
  async openPreviewNote(e) {
    const { config: i, date: n, period: r, note: s, sourceText: a } = e.detail ?? {};
    if (!(!this._config || JSON.stringify(i) !== JSON.stringify(this._config) || !tt(n) || !r) && !(!s && this._config.source_type === "manual" && !this._open.dates)) {
      if (e.preventDefault(), e.stopPropagation(), this._open = { ...this._open, dates: !0 }, this._datedReadOnly = !1, s) {
        const o = /* @__PURE__ */ new Date(`${n}T12:00:00`), l = (this._config.dated_entries ?? []).findIndex((g) => {
          const c = Qe({ dated_entries: [g] }).entries;
          return ht(a, { time: r }, 0, o, c).notes.some((h) => h.text === s.text && (h.color || "") === (s.color || "") && (h.background || "") === (s.background || ""));
        });
        if (l < 0) {
          this._datedReadOnly = !0, this.requestUpdate();
          return;
        }
        this._datedOpen = l, this.requestUpdate(), await this.updateComplete;
        const u = this.shadowRoot.querySelector(`[data-entry-index="${l}"]`), f = u?.closest(".pastDatedEntries");
        f && (f.open = !0);
        const p = u?.querySelector("input[data-note-text]");
        p?.scrollIntoView({ block: "nearest" }), p?.focus({ preventScroll: !0 });
        return;
      }
      await this.addDatedNote(n, r);
    }
  }
  async addDatedNote(e, i) {
    this._datedDraftEntry ?? (this._datedDraftEntry = { action: "note", match: "period", text: "", dates: [], periods: [] }), this._datedOpen = -1, this.updateDatedEntry(-1, { ...e ? { dates: [e] } : {}, ...i ? { periods: [i] } : {} }), await this.updateComplete;
    const n = this.shadowRoot.querySelector(`[data-entry-index="${this._datedOpen}"] input[data-note-text]`);
    n?.scrollIntoView({ block: "nearest" }), n?.focus({ preventScroll: !0 });
  }
  async openPreviewCell(e) {
    const { config: i, rowIndex: n, dayIndex: r, week: s } = e.detail ?? {};
    if (!this._config || this._config.source_type !== "manual" || JSON.stringify(i) !== JSON.stringify(this._config)) return;
    const o = (s === "B" ? this._config.rows_b : this._config.rows)?.[n];
    if (!o || !Number.isInteger(n) || !S(o) && (!Number.isInteger(r) || r < 0 || r >= this._config.days.length) || (e.stopPropagation(), this._manualWeek = s === "B" ? "B" : "A", this._open = { ...this._open, manual: !0 }, this._rowOpen = { [n]: !0 }, this.requestUpdate(), await this.updateComplete, !this.isConnected)) return;
    const l = this.shadowRoot.querySelectorAll(".rowPanel")[n], u = S(o) ? l?.querySelector('ha-input[label="Pausentext"]') : l?.querySelectorAll(".lessonArea")[r];
    u?.scrollIntoView({ block: "nearest", inline: "nearest" }), u?.focus({ preventScroll: !0 });
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
    return new Ye().normalizeConfig(e);
  }
  clone(e) {
    try {
      return structuredClone(e);
    } catch {
      return JSON.parse(JSON.stringify(e));
    }
  }
  emit(e) {
    this._config = e, Ze(this, "config-changed", { config: e });
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
      const r = (i ?? "").toString().trim();
      let s = "";
      r && (s = this.hass?.states?.[r]?.attributes?.week_offset_entity || _i(r)), this.emit({
        ...this._config,
        source_type: "entity",
        source_entity: i,
        source_entity_integration: i,
        source_attribute: "rows_table",
        source_time_key: "time",
        week_offset_entity: s
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
    const r = !!this._open[i], s = {
      general: ["Titel, Schultage und die grundlegende Ansicht.", "M4 5h16M4 12h16M4 19h16M8 3v4M16 10v4M10 17v4"],
      sources: ["Woher dein Stundenplan kommt.", "M4 4h16v5H4zM4 15h16v5H4zM8 9v6M16 9v6"],
      manual: ["Fächer, Zeiten und Pausen selbst eintragen.", "M4 4h16v16H4zM4 9h16M9 4v16M9 14h11"],
      filters: ["Fächer/Angebote gezielt ausblenden.", "M3 4h18l-7 8v7l-4 2v-9z"],
      dates: ["Klassenarbeiten und Erinnerungen nach Datum und Stunde.", "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M8 15h8M12 12v6"],
      replacements: ["Fächer an ausgewählten Tagen ersetzen, z. B. Schwimmen durch Sport.", "M4 7h14l-3-3M20 17H6l3 3M18 7l-3 3M6 17l3-3"],
      rolling: ["Ganze Woche oder ab heute: Ansicht und Zeitraum wählen.", "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M9 15h6M13 13l2 2-2 2"],
      typography: ["Textgrößen und Abstände deiner Karte.", "M3 5h12M9 5v15M6 20h6M15 12h6M18 12v8"],
      highlights: ["Heute, aktuellen Unterricht und Pausen hervorheben.", "M12 3l3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1z"],
      colors: ["Farben und Transparenz der Hervorhebungen.", "M12 3C8 8 5 11 5 15a7 7 0 0 0 14 0c0-4-3-7-7-12zM8 15a4 4 0 0 0 4 4"],
      appearance: ["Kartenflächen, Tabellenlinien und Transparenz.", "M3 4h18v16H3zM3 9h18M3 14h18M9 9v11"]
    }, [a, o] = s[i] ?? ["", "M4 4h16v16H4z"];
    return d`
      <div class="section" data-section=${i}>
        <button type="button" class="sectionHead" aria-expanded=${String(r)} aria-controls=${`section-${i}`} @click=${() => this.toggleOpen(i)}>
          <svg class="sectionIcon" viewBox="0 0 24 24" aria-hidden="true"><path d=${o}></path></svg>
          <span class="sectionLabels"><span class="sectionTitle">${e}</span><span class="sectionDescription">${a}</span></span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d=${r ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"}></path></svg>
        </button>
        ${r ? d`<div class="sectionBody" id=${`section-${i}`}>${n}</div>` : d``}
      </div>
    `;
  }
  getFilterSubjects() {
    const e = this._config;
    let i = [];
    if ((e.source_type ?? "manual") === "manual")
      i = [...e.rows ?? [], ...e.week_mode === "kw_parity" ? e.rows_b ?? [] : []];
    else if (e.source_type !== "json") {
      const r = new Ye();
      r.hass = this.hass, i = r.getRowsResolved(e);
    }
    const n = [...e.hidden_subjects ?? []];
    for (const r of i ?? [])
      if (!S(r))
        for (const s of r.cells ?? [])
          for (const a of String(s).split(/\r?\n\s*\r?\n/)) {
            const o = mi(a);
            o && !/^[\s—–-]+$/.test(o) && n.push(o);
          }
    return qe(n).sort((r, s) => r.localeCompare(s, "de"));
  }
  renderFilterSettings() {
    if (!this._open.filters) return this.renderSection("Inhalte filtern", "filters", b);
    const e = this._config.hidden_subjects ?? [], i = this.getFilterSubjects();
    return this.renderSection("Inhalte filtern", "filters", d`
      <div class="hint">Wähle die Fächer/Angebote aus, an denen dein Kind nicht teilnimmt. Nur diese Karte wird gefiltert; die Quelldaten bleiben unverändert.</div>
      ${i.length ? d`<div class="subjectChoices" role="group" aria-label="Zum Ausblenden auswählen">
        ${i.map((n) => d`<label class="subjectChoice">
          <input type="checkbox" .checked=${e.some((r) => se(r) === se(n))}
            @change=${(r) => this.setValue("hidden_subjects", r.target.checked ? qe([...e, n]) : e.filter((s) => se(s) !== se(n)))}>
          <span>${n}</span>
        </label>`)}
      </div>` : d`<div class="hint">Keine Fächer/Angebote in der aktuellen Quelle gefunden. Du kannst sie unten selbst ergänzen.</div>`}
      <form class="subjectAdd" @submit=${(n) => {
      n.preventDefault();
      const r = n.currentTarget.elements.namedItem("subject");
      r.value.trim() && (this.setValue("hidden_subjects", qe([...e, r.value])), r.value = "");
    }}>
        <label>Fächer/Angebote ergänzen<input name="subject" type="text" placeholder="z. B. Ess/Spi GT" autocomplete="off"></label>
        <button type="submit" class="spBtn">Hinzufügen</button>
      </form>
      <div class="hint">Verglichen wird der vollständige Fachname in der ersten Zeile, nicht Raum, Lehrkraft oder Hinweise. Groß-/Kleinschreibung spielt keine Rolle. Neue Namen werden nicht automatisch ausgewählt.</div>
      ${e.length ? d`<div class="infoBox slim">${e.length} Fächer/Angebote ausgeblendet. Vollständig leere Endzeilen werden gekürzt. „Nach der letzten Stunde“ berücksichtigt nur die verbleibenden Einträge des jeweiligen Tages.</div>
        <button type="button" class="spBtn" @click=${() => this.setValue("hidden_subjects", [])}>Alle Einträge wieder anzeigen</button>` : b}
    `);
  }
  updateDatedEntry(e, i) {
    if (e === -1 || e === -2) {
      const r = e === -1 ? "_datedDraftEntry" : "_datedReplacementDraft";
      if (!this[r]) return;
      if (this[r] = { ...this[r], ...i }, Ge({ ...this[r], enabled: !0 })) {
        this.requestUpdate();
        return;
      }
      const s = this._config.dated_entries ?? [], a = this[r];
      this[r] = null, this._datedOpen = s.length, this.setValue("dated_entries", [...s, a]);
      return;
    }
    const n = [...this._config.dated_entries ?? []];
    n[e] = { ...n[e], ...i }, this.setValue("dated_entries", n);
  }
  renderDatedSettings(e = "note") {
    const i = e === "replace", n = i ? "replacements" : "dates", r = i ? "Fachabweichungen an bestimmten Tagen" : "Termine und Hinweise eintragen";
    if (!this._open[n]) return this.renderSection(r, n, b);
    const s = this._config, a = s.dated_entries ?? [], o = a.map((g, c) => ({ raw: g, index: c })).filter(({ raw: g }) => g?.action === "replace" === i), l = o.filter(({ raw: g }) => !Wt(g, this._datedToday));
    !i && this._datedDraftEntry && l.push({ raw: this._datedDraftEntry, index: -1 }), i && this._datedReplacementDraft && l.push({ raw: this._datedReplacementDraft, index: -2 });
    const u = o.filter(({ raw: g }) => Wt(g, this._datedToday)), f = (g) => Array.isArray(g) ? g.join(", ") : typeof g == "string" ? g : "", p = ({ raw: g, index: c }) => {
      const h = g && typeof g == "object" ? g : {}, y = Ge(g), v = oe(h), _ = ri(h, this._datedToday);
      return d`<details class="datedEntry" data-entry-index=${c} .open=${this._datedOpen === c}>
          <summary><span class="datedTitle">${i ? `${h.subject || "Fach"} → ${h.text || "Neuer Fachname"}` : _.title}</span><span class="datedMeta">${c < 0 ? "Entwurf · " : ""}${_.detail}</span>
            <button type="button" class="datedRemove" aria-label=${c < 0 ? "Entwurf verwerfen" : "Eintrag entfernen"}
              title=${c < 0 ? "Entwurf verwerfen" : `${_.title} entfernen`} @click=${(w) => {
        if (w.preventDefault(), w.stopPropagation(), this._datedOpen = -1, c < 0) {
          this[c === -1 ? "_datedDraftEntry" : "_datedReplacementDraft"] = null, this.requestUpdate();
          return;
        }
        this.setValue("dated_entries", a.filter((x, D) => D !== c));
      }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
          </summary>
          <div class="datedFields">
            ${c < 0 ? d`<div class="hint">${i ? "Noch nicht übernommen. Erst mit ursprünglichem Fach, neuem Fachnamen und Datum wird daraus eine Abweichung." : "Noch nicht übernommen. Erst mit Text, Datum und Stunde wird daraus ein Termin. Weitere Fachklicks ändern nur diesen Entwurf."}</div>` : b}
            <label class="subjectChoice"><input type="checkbox" .checked=${h.enabled !== !1}
              @change=${(w) => this.updateDatedEntry(c, { enabled: w.target.checked })}><span>Aktiv</span></label>
            ${i ? d`<label>Ursprüngliches Fach<input type="text" .value=${h.subject ?? ""} placeholder="z. B. Sport oder Mathe"
              @change=${(w) => this.updateDatedEntry(c, { subject: w.target.value })}></label>` : v ? b : d`<details class="legacyAssignment"><summary>Bisherige Fachzuordnung: ${h.subject || "nicht angegeben"}</summary>
              <div class="datedFields"><div class="hint">Dieser ältere Eintrag gilt weiterhin nur beim gewählten Fach. Für die Umstellung Unterrichtsstunden angeben; danach gilt er dort unabhängig vom Fachnamen.</div>
              <label>Fach für bisherigen Eintrag<input type="text" .value=${h.subject ?? ""} @change=${(w) => this.updateDatedEntry(c, { subject: w.target.value })}></label>
              <button type="button" class="spBtn" ?disabled=${!f(h.periods).trim()} @click=${() => {
        const w = { ...h, match: "period" };
        delete w.subject;
        const x = [...a];
        x[c] = w, this.setValue("dated_entries", x);
      }}>Auf Datum und Stunde umstellen</button></div>
            </details>`}
            <label>${h.action === "replace" ? "Neuer Fachname" : "Termin / Hinweis"}<input type="text" data-note-text .value=${h.text ?? ""}
              placeholder=${h.action === "replace" ? "z. B. Schwimmen" : "z. B. Schulaufgabe"}
              @change=${(w) => this.updateDatedEntry(c, { text: w.target.value })}></label>
            <label>${v ? "Unterrichtsstunden" : "Stunden (optional)"}<input type="text" .value=${f(h.periods)} placeholder="z. B. 1, 2"
              @change=${(w) => this.updateDatedEntry(c, { periods: w.target.value })}></label>
            <div class="hint">${v ? "Nummern der Unterrichtsstunden, z. B. 1 oder 1, 2. Der Termin gilt dort unabhängig vom Fachnamen." : "Leer lassen = alle Stunden des gewählten Fachs. Für einzelne Unterrichtsstunden z. B. 1, 2 eintragen."}</div>
            <div class="dateAdd"><label>Datum auswählen<input type="date" aria-label="Datum auswählen"></label>
              <button type="button" class="spBtn" @click=${(w) => {
        const x = w.currentTarget.parentElement.querySelector("input");
        if (!x.value || !x.checkValidity()) {
          x.reportValidity();
          return;
        }
        const D = f(h.dates ?? h.date).split(/[,;\n]/).map((O) => O.trim()).filter(Boolean);
        this.updateDatedEntry(c, { dates: [.../* @__PURE__ */ new Set([...D, x.value])] });
      }}>Datum hinzufügen</button>
            </div>
            <label>Termine (JJJJ-MM-TT, mit Komma getrennt)<textarea rows="2" .value=${f(h.dates ?? h.date)}
              @change=${(w) => this.updateDatedEntry(c, { dates: w.target.value })}></textarea></label>
            ${h.action !== "replace" ? d`<details class="datedColors"><summary>Hinweisfarben (optional)</summary>
              <div class="datedFields">
                <div class="hint">Färbt nur den Hinweis, nicht die Fachzelle. Ohne Auswahl bleibt die bisherige Darstellung erhalten.</div>
                ${this.renderColorPicker("Hinweis: Text", ae(h.color), (w) => this.updateDatedEntry(c, { color: ae(w) }), "#ffffff")}
                ${this.renderColorPicker("Hinweis: Hintergrund", ae(h.background), (w) => this.updateDatedEntry(c, { background: ae(w) }), "#ffeb3b", 0.25)}
              </div>
            </details>` : b}
            ${y ? d`<div class="hint" role="status">${y} Dieser Eintrag wird noch nicht angewendet.</div>` : b}
          </div>
        </details>`;
    };
    return this.renderSection(r, n, d`
      <div class="hint">${i ? "Gib das ursprüngliche Fach und den neuen Fachnamen ein, z. B. Schwimmen → Sport. Wähle die Tage, an denen die Änderung gelten soll. Die Quelldaten bleiben unverändert; kein automatischer Zweiwochenwechsel." : "Klicke auf „+ Termin hinzufügen“ oder auf ein Fach in der Vorschau, um einen Termin oder Hinweis anzulegen. Zukünftige Termine sind auch ohne geladenen Stundenplan über die Datumseingabe möglich. Vorhandene Hinweise kannst du zum Bearbeiten anklicken."}</div>
      ${!i && this._datedReadOnly ? d`<div class="hint" role="status">Dieser Hinweis gehört zu keinem lokalen Termin. Hinweise aus einer Sensorquelle bitte dort bearbeiten.</div>` : b}
      ${!i && s.source_type === "manual" ? d`<div class="hint">Solange dieser Bereich geöffnet ist, legt ein Vorschauklick einen Termin an. Zum Bearbeiten der Fächer diesen Bereich schließen.</div>` : b}
      ${l.length ? b : d`<div class="infoBox slim">${i ? "Keine aktuellen oder zukünftigen Abweichungen." : "Keine aktuellen oder zukünftigen Hinweise."}</div>`}
      ${l.map(p)}
      <button type="button" class="spBtn" @click=${async () => {
      if (!i) {
        await this.addDatedNote();
        return;
      }
      this._datedReplacementDraft ?? (this._datedReplacementDraft = { action: e, subject: "", text: "", dates: [] }), this._datedOpen = -2, this.requestUpdate(), await this.updateComplete;
      const g = this.shadowRoot.querySelector('[data-entry-index="-2"] input[type="text"]');
      g?.focus(), g?.scrollIntoView({ block: "nearest" });
    }}>${i ? "+ Abweichung hinzufügen" : "+ Termin hinzufügen"}</button>
      ${u.length ? d`<details class="pastDatedEntries">
        <summary>Vergangene Termine (${u.length})</summary>
        <div class="hint">Alle Termine dieser Einträge liegen vor heute. Sie bleiben bearbeitbar und im früheren Stundenplan sichtbar. Ein neuer zukünftiger Termin macht einen Eintrag wieder aktuell.</div>
        ${u.map(p)}
      </details>` : b}
      ${i ? d`<div class="hint">Erkennbare Ausfall- und Vertretungshinweise werden nicht ersetzt. Bei widersprüchlichen Abweichungen bleibt das Original stehen.</div>` : b}
      ${Qe(s, this.hass).warnings.map((g) => d`<div class="hint" role="status">${g}</div>`)}
    `);
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
    const r = n.querySelector("summary");
    r?.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" }), r?.focus({ preventScroll: !0 });
  }
  addManualRow() {
    if (!this._config) return;
    const e = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = this.getManualRows(), n = { time: `${i.length + 1}.`, cells: Array.from({ length: e.length }, () => "") };
    this._rowOpen = { ...this._rowOpen, [i.length]: !0 }, i.push(n), this.emitManualRows(i), this.scrollToManualRow(i.length - 1, this.getManualRowsKey());
  }
  insertManualRowBelow(e) {
    if (!this._config) return;
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = this.getManualRows(), r = { time: `${e + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    n.splice(e + 1, 0, r), this.emitManualRows(n);
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
    const n = this.getManualRows(), r = n[e];
    n[e] = { ...r, ...i }, this.emitManualRows(n);
  }
  updateManualCell(e, i, n) {
    if (!this._config) return;
    const r = this.getManualRows(), s = r[e];
    if (!s || S(s)) return;
    const a = s, o = Array.isArray(a.cells) ? a.cells.slice() : [];
    o[i] = n, r[e] = { ...a, cells: o }, this.emitManualRows(r);
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
    const n = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], r = this.getManualRows(), s = r[e];
    if (s) {
      if (i) {
        const a = (s.time ?? "").toString(), o = (s.label ?? "Pause").toString();
        r[e] = { break: !0, time: a, label: o };
      } else {
        const a = (s.time ?? "").toString();
        r[e] = { time: a, start: "", end: "", cells: Array.from({ length: n.length }, () => "") };
      }
      this.emitManualRows(r);
    }
  }
  updateManualCellStyle(e, i, n) {
    if (!this._config) return;
    const r = this.getManualRows(), s = r[e];
    if (!s || S(s)) return;
    const a = s, o = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = o[i] ?? {};
    o[i] = { ...l, ...n }, r[e] = { ...a, cell_styles: o }, this.emitManualRows(r);
  }
  renderManualRows() {
    if (!this._config) return d``;
    const e = this._config, i = e.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = e.week_mode === "kw_parity", r = n && this._manualWeek === "B" ? "B" : "A", s = r === "B" && Array.isArray(e.rows_b) ? e.rows_b : Array.isArray(e.rows) ? e.rows : [];
    return d`
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

        ${n ? d`
          <ha-form
            .hass=${this.hass}
            .data=${{ week_a_is_even_kw: ie(e.week_a_is_even_kw, !0) }}
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
            ${["A", "B"].map((a) => d`
              <button
                type="button"
                class=${`spBtn ${r === a ? "spBtnActive" : ""}`}
                @click=${() => {
      this._manualWeek = a, this._rowOpen = {}, this.requestUpdate();
    }}
              >Woche ${a} bearbeiten</button>
            `)}
          </div>
          <div class="hint">Aktuell bearbeitest du Woche ${r}. Die Karte zeigt automatisch den zur Kalenderwoche passenden Plan.</div>
        ` : d``}
      </div>

      ${s.length ? d`<div class="rowsTop">
        <div class="rowsTitle">Stundenplan${n ? ` · Woche ${r}` : ""}</div>

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
      ` : d`<div class="manualEmpty">
        <div class="rowsTitle">${n ? `Woche ${r}: Noch keine Einträge` : "Noch keine Stunden angelegt"}</div>
        <div class="hint">Lege zuerst eine Stunde an, um Zeiten und Fächer einzutragen. Die Eingabefelder öffnen sich automatisch.</div>
        <div class="btnBar">
          <button type="button" class="spBtn manualAdd manualAddPrimary" @click=${this.addLessonRow}>Erste Stunde hinzufügen</button>
          <button type="button" class="spBtn manualAdd" @click=${this.addBreakRow}>+ Pause</button>
        </div>
      </div>`}

      ${s.map((a, o) => {
      const l = S(a), u = l ? `Pause · ${(a.time ?? "").toString()}` : `Stunde · ${(a.time ?? "").toString()}`, f = a, p = (f.start ?? "").toString(), g = (f.end ?? "").toString(), c = (a.label ?? "Pause").toString();
      return d`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[o] ?? !1}
            @toggle=${(h) => {
        try {
          this._rowOpen[o] = !!h?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${u || `Zeile ${o + 1}`}</div>
                <div class="rowHeadMeta">${l ? c : `${p || "Start?"} – ${g || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-input
                  label="Zeit / Stunde"
                  .value=${(a.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(h) => this.updateManualRow(o, { time: h?.target?.value ?? "" })}
                ></ha-input>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${l} @change=${(h) => this.toggleManualBreak(o, !!h?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${l ? d`
                    <ha-input
                      label="Pausentext"
                      .value=${c}
                      placeholder="z. B. Große Pause"
                      @input=${(h) => this.updateManualRow(o, { label: h?.target?.value ?? "" })}
                    ></ha-input>
                  ` : d`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-input
                        label="Start (HH:MM)"
                        .value=${p}
                        @input=${(h) => this.updateManualRow(o, { start: h?.target?.value ?? "" })}
                      ></ha-input>
                      <ha-input
                        label="Ende (HH:MM)"
                        .value=${g}
                        @input=${(h) => this.updateManualRow(o, { end: h?.target?.value ?? "" })}
                      ></ha-input>
                    </div>

                    <div class="cellsGrid">
                      ${i.map((h, y) => {
        const v = (f.cells?.[y] ?? "").toString(), _ = (Array.isArray(f.cell_styles) ? f.cell_styles?.[y] : void 0) ?? {}, w = typeof _?.bg_alpha == "number" && !Number.isNaN(_.bg_alpha) ? _.bg_alpha : 0.18;
        return d`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${h}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${v}
                              @input=${(x) => this.updateManualCell(o, y, x?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              ${this.renderColorPicker("Hintergrund", gi(_) ?? "", (x) => {
          const D = dt(x);
          this.updateManualCellStyle(o, y, x ? { bg: x, bg_alpha: D.alpha } : { bg: "", bg_alpha: 0.18 });
        }, "#2196f3", w)}
                              ${this.renderColorPicker("Text", _.color ?? "", (x) => this.updateManualCellStyle(o, y, { color: x }), "#ffffff")}
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
    return d`<label class="toggleRow"><span>${i}</span><ha-switch
      .checked=${ie(this._config[e], n)}
      @change=${(r) => this.onToggle(r, e)}></ha-switch></label>`;
  }
  renderColorPicker(e, i, n, r = "#2196f3", s = 1) {
    const a = dt(i, r, s), o = [
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
    ], l = (u, f) => {
      const p = $t(u);
      p && n(`rgba(${p.r}, ${p.g}, ${p.b}, ${Math.round(f * 100) / 100})`);
    };
    return d`<fieldset class="colorPicker">
      <legend>${e}</legend>
      <div class="palette">
        ${o.map(([u, f]) => d`<button type="button" class="swatch"
          style=${`--swatch:${u}`} title=${f} aria-label=${`${e}: ${f}`}
          aria-pressed=${a.hex.toLowerCase() === u}
          @click=${() => l(u, a.alpha)}></button>`)}
        <input type="color" class="customColor" aria-label=${`${e}: eigene Farbe`}
          title="Eigene Farbe" .value=${a.hex} @input=${(u) => l(u.target.value, a.alpha)} />
      </div>
      <label class="opacityControl"><span>Transparenz</span>
        <input type="range" min="0" max="100" aria-label=${`${e}: Transparenz`}
          .value=${String(Math.round((1 - a.alpha) * 100))}
          @input=${(u) => l(a.hex, 1 - Number(u.target.value) / 100)} />
        <output>${Math.round((1 - a.alpha) * 100)}%</output>
      </label>
      <div class="colorFooter"><span class="colorPreview" style=${`background:${i || r}`}></span>
        <button type="button" class="resetColor" @click=${() => n("")}>Zurücksetzen</button>
        <details class="colorAdvanced"><summary>Farbcode</summary>
          <input aria-label=${`${e}: Farbcode`} .value=${i ?? ""}
            @change=${(u) => n(u.target.value)} />
        </details>
      </div>
    </fieldset>`;
  }
  renderConfigColor(e, i, n, r = 1) {
    return this.renderColorPicker(e, this._config[i], (s) => {
      this.setValue(i, s || Ye.getStubConfig()[i]);
    }, n, r);
  }
  renderAppearanceColor(e) {
    const i = getComputedStyle(this).getPropertyValue(e.theme).trim(), n = dt(i, e.fallback).hex;
    return this.renderColorPicker(e.label, this._config[e.key] ?? "", (r) => {
      const s = { ...this._config }, a = gt({ [e.key]: r })[e.key];
      a ? s[e.key] = a : delete s[e.key], this.emit(s);
    }, n);
  }
  renderTypographyInput(e) {
    return d`<ha-input
      label=${e.label} type="number" min=${e.min} max=${e.max} step="1"
      placeholder="Standard" .value=${String(this._config[e.key] ?? "")}
      @change=${(i) => {
      const n = ft({ [e.key]: i.target.value })[e.key], r = { ...this._config };
      n == null ? delete r[e.key] : r[e.key] = n, this.emit(r);
    }}
    ></ha-input>`;
  }
  resetTypography() {
    const e = { ...this._config, title_font_size: 20 };
    for (const { key: i } of ue) delete e[i];
    this.emit(e);
  }
  renderSourceSettings() {
    const e = this._config;
    return this.renderSection(
      "Datenquellen",
      "sources",
      d`
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

            ${(e.source_type ?? "manual") === "entity" ? d`
                  <div class="hint">Stundenplan Suite: Wochensensor für Stundenplan24 oder Schulmanager auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? d`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), n = i.filter((r) => /^sensor\./.test(r) && (/_woche$/i.test(r) || this.hass?.states?.[r]?.attributes?.rows_table != null));
        return i.length < 5 || n.length === 0 ? d`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : d``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.source_entity_integration ?? e.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const r = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !r || /_woche$/i.test(r) || this.hass?.states?.[r]?.attributes?.rows_table != null;
      }}
                      .label=${"Stundenplan Suite Sensor"}
                      @value-changed=${(i) => {
        try {
          const n = i.detail?.value ?? i.target?.value, r = typeof n == "string" ? n : n && typeof n == "object" ? n.entity_id : void 0;
          this.setSourceEntity(r);
        } catch (n) {
          console.error("stundenplan-card editor: setSourceEntity failed", n);
        }
      }}
                    ></ha-entity-picker>
                  ` : d``}

                  ${this.isHaEntityPickerAvailable() ? b : d`<ha-input
                    label="Stundenplan Suite Entity-ID"
                    .value=${e.source_entity_integration ?? e.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-input>`}
                ` : d``}

            ${(e.source_type ?? "manual") === "sensor" ? d`
                  <div class="hint">Beliebiger Sensor (JSON): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? d`
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const r = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !r || /^sensor\./.test(r);
      }}
                      .label=${"Sensor (JSON)"}
                      @value-changed=${(i) => {
        try {
          const n = i.detail?.value ?? i.target?.value, r = typeof n == "string" ? n : n && typeof n == "object" ? n.entity_id : void 0;
          this.setSourceEntity(r);
        } catch (n) {
          console.error("stundenplan-card editor: setSourceEntity failed", n);
        }
      }}
                    ></ha-entity-picker>
                  ` : d``}

                  ${this.isHaEntityPickerAvailable() ? b : d`<ha-input
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
        week_a_is_even_kw: ie(e.week_a_is_even_kw, !0)
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
          const n = i?.detail?.value ?? {}, r = n.week_mode ?? e.week_mode ?? "off";
          r !== (e.week_mode ?? "off") && this.setValue("week_mode", r);
          const s = n.week_a_is_even_kw;
          typeof s == "boolean" && s !== ie(e.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", s);
        } catch (n) {
          console.error("stundenplan-card editor: week settings change failed", n);
        }
      }}
                    ></ha-form>
                  </div>
` : d``}

          `
    );
  }
  renderRollingSettings() {
    const e = this._config;
    return this.renderSection("Ansicht & Rolling", "rolling", d`
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
      ${(e.view_mode ?? "week") === "rolling" ? d`
      <div class="grid2">
        <div class="gridFull">${this.renderToggle("rolling_week_only", "Auf Kalenderwoche begrenzen")}</div>
        ${e.rolling_week_only ? d`<div class="hint gridFull">Endet am Sonntag der Startwoche. Am Wochenende beginnt die Ansicht beim nächsten Schultag; auch „Nach der letzten Stunde“ bleibt wirksam.</div>` : b}
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
        ${(e.rolling_switch_mode ?? "midnight") === "fixed_time" ? d`
          <ha-input class="gridFull"
            label="Umschaltzeit (HH:MM)"
            .value=${e.rolling_switch_time ?? ""}
            @input=${(i) => this.onText(i, "rolling_switch_time")}
            hint="Beispiel: 15:00"
          ></ha-input>
        ` : d`<div class="infoBox slim gridFull">${(e.rolling_switch_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung auf den nächsten Schultag folgt nach der letzten Endzeit aus deinem Plan." : "Der Sprung auf den nächsten Schultag folgt direkt ab Mitternacht."}</div>`}
      </div>
      <div class="hint">Ab dem Starttag werden die nächsten passenden Schultage angezeigt. Beim Blättern in andere Wochen beginnt die Ansicht am Montag.</div>
      ` : b}
    `);
  }
  render() {
    if (!this._config) return d``;
    const e = this._config;
    return d`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      d`
<div class="generalDivider first">Grunddaten</div>
            <div class="grid2">
              <ha-input label="Titel der Karte" .value=${e.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-input>

              <ha-input
                label="Schultage (CSV)"
                .value=${fn(e.days ?? [])}
                @input=${(i) => this.setValue("days", gn(i.target.value))}
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
                <ha-switch .checked=${ie(e.trim_empty_rows, !1)} @change=${(i) => this.onToggle(i, "trim_empty_rows")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleiche Folgestunden verbinden</div>
                  <div class="sub">Identische Fächer ohne Pausenzeile zusammenfassen.</div>
                </div>
                <ha-switch .checked=${ie(e.merge_double_lessons, !1)} @change=${(i) => this.onToggle(i, "merge_double_lessons")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleichmäßige Spaltenbreiten</div>
                  <div class="sub">Für mehrere gleich breite Karten untereinander.</div>
                </div>
                <ha-switch .checked=${ie(e.equal_column_widths, !1)} @change=${(i) => this.onToggle(i, "equal_column_widths")}></ha-switch>
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

              ${((e.tap_action?.action ?? "none") + "").toString() === "toggle_view" ? d`
                <div class="hint">Ein Tipp auf die Karte wechselt zwischen „Ganze Woche“ und „Ab heute (rolling)“.</div>
              ` : ((e.tap_action?.action ?? "none") + "").toString() === "popup_week" ? d`
                <div class="hint">Ein Tipp auf die Karte öffnet ein Popup mit der aktuellen ganzen Woche. Ein weiterer Tipp auf das Popup schließt es wieder.</div>
              ` : d`<div class="hint">Für Wallpanels sind meist „Ansicht umschalten“ oder „Wochen-Popup“ die sinnvollsten Varianten.</div>`}
            </div>
          `
    )}

        ${this.renderSourceSettings()}
        ${this.renderRollingSettings()}
        ${(e.source_type ?? "manual") === "manual" ? this.renderSection("Manueller Stundenplan", "manual", this.renderManualRows()) : b}
        ${this.renderFilterSettings()}
        ${this.renderDatedSettings()}
        ${this.renderDatedSettings("replace")}

        ${this.renderSection("Schrift & Abstände", "typography", d`
          <div class="hint">Alle Größen in Pixeln. Leere Felder verwenden die bisherigen Vorgaben der normalen oder kompakten Ansicht.</div>
          ${e.show_title !== !1 ? d`
            <div class="generalDivider first">Kartentitel</div>
            <div class="grid2">
              <ha-input label="Titelgröße normal (px)" type="number" min="10" max="40" step="1"
                placeholder="Standard: 20" .value=${String(e.title_font_size ?? 20)}
                @change=${(i) => {
      const n = i.target.value, r = n === "" ? 20 : Number(n);
      this.setValue("title_font_size", Number.isFinite(r) ? Math.max(10, Math.min(40, r)) : 20);
    }}></ha-input>
              ${this.renderTypographyInput(ue.find(({ key: i }) => i === "font_size_title_compact"))}
              <ha-input class="gridFull" label="Titel-Schriftfamilie (optional)"
                .value=${e.title_font_family ?? ""}
                @input=${(i) => this.onText(i, "title_font_family")}></ha-input>
            </div>
          ` : b}
          <div class=${e.show_title !== !1 ? "generalDivider" : "generalDivider first"}>Kopfzeile & Tabelle</div>
          <div class="grid2">
            ${["header_table_gap", "font_size_header"].map((i) => this.renderTypographyInput(ue.find((n) => n.key === i)))}
            <div class="hint gridFull">Der Abstand gilt unterhalb von Titel und Navigation: leer = bisheriger Abstand, 0 = kein zusätzlicher Abstand.</div>
          </div>
          <div class="generalDivider">Stunden & Inhalte</div>
          <div class="grid2">
            ${["font_size_time", "font_size_subject", "font_size_details", "row_height"].map((i) => this.renderTypographyInput(ue.find((n) => n.key === i)))}
            <div class="hint gridFull">Die Mindesthöhe gilt pro Stundenzeile. Mehrzeilige Inhalte dürfen die Zeile vergrößern; Pausenzeilen bleiben kompakt.</div>
          </div>
          <button type="button" class="spBtn" @click=${() => this.resetTypography()}>Größen zurücksetzen</button>
        `)}

        ${this.renderSection(
      "Highlights",
      "highlights",
      d`
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
      d`
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
      d`
        <div class="hint">Optional für transparente Dashboards. Zurücksetzen verwendet wieder Theme oder CSS-Vorgaben. Eigene Fachfarben und Highlights bleiben erhalten.</div>
        <div class="stack">
          ${kt.map((i) => this.renderAppearanceColor(i))}
        </div>
      `
    )}
      </div>
    `;
  }
};
mt.properties = {
  hass: {},
  _config: { state: !0 }
}, mt.styles = ai`
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
let bi = mt;
W([
  G()
], bi.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Ye);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", bi);
window.__STUNDENPLAN_CARD_VERSION = "v3.9.0";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v3.9.0 (marker: STUNDENPLAN_CARD_v3.9.0)",
  preview: !0
});
export {
  Ye as StundenplanCard,
  bi as StundenplanCardEditor
};
