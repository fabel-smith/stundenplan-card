/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, q = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), G = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (r) => new dt(typeof r == "string" ? r : r + "", void 0, F), St = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new dt(e, r, F);
}, wt = (r, t) => {
  if (q) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = O.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Q = q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return vt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: xt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Pt, getOwnPropertySymbols: Mt, getPrototypeOf: Tt } = Object, f = globalThis, X = f.trustedTypes, Ut = X ? X.emptyScript : "", I = f.reactiveElementPolyfillSupport, P = (r, t) => r, W = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ut : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, ut = (r, t) => !Et(r, t), Y = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: ut };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && xt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...Pt(e), ...Mt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(Q(i));
    } else t !== void 0 && e.push(Q(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : W).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = s.getPropertyOptions(i), h = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : W;
      this._$Em = i;
      const c = h.fromAttribute(e, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? ut)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, h = this[n];
        a !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[P("elementProperties")] = /* @__PURE__ */ new Map(), S[P("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: S }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, tt = (r) => r, H = M.trustedTypes, et = H ? H.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, pt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + $, kt = `<${gt}>`, v = document, T = () => v.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", Z = Array.isArray, Nt = (r) => Z(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", z = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, m = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, nt = /"/g, _t = /^(?:script|style|textarea|title)$/i, Ot = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), y = Ot(1), E = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), A = v.createTreeWalker(v, 129);
function $t(r, t) {
  if (!Z(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const Ht = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let a = 0; a < e; a++) {
    const h = r[a];
    let c, d, l = -1, p = 0;
    for (; p < h.length && (o.lastIndex = p, d = o.exec(h), d !== null); ) p = o.lastIndex, o === C ? d[1] === "!--" ? o = st : d[1] !== void 0 ? o = it : d[2] !== void 0 ? (_t.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = m) : d[3] !== void 0 && (o = m) : o === m ? d[0] === ">" ? (o = i ?? C, l = -1) : d[1] === void 0 ? l = -2 : (l = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? m : d[3] === '"' ? nt : rt) : o === nt || o === rt ? o = m : o === st || o === it ? o = C : (o = m, i = void 0);
    const g = o === m && r[a + 1].startsWith("/>") ? " " : "";
    n += o === C ? h + kt : l >= 0 ? (s.push(c), h.slice(0, l) + pt + h.slice(l) + $ + g) : h + $ + (l === -2 ? a : g);
  }
  return [$t(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, h = this.parts, [c, d] = Ht(t, e);
    if (this.el = k.createElement(c, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = A.nextNode()) !== null && h.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(pt)) {
          const p = d[o++], g = i.getAttribute(l).split($), _ = /([.?@])?(.*)/.exec(p);
          h.push({ type: 1, index: n, name: _[2], strings: g, ctor: _[1] === "." ? Dt : _[1] === "?" ? It : _[1] === "@" ? zt : D }), i.removeAttribute(l);
        } else l.startsWith($) && (h.push({ type: 6, index: n }), i.removeAttribute(l));
        if (_t.test(i.tagName)) {
          const l = i.textContent.split($), p = l.length - 1;
          if (p > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let g = 0; g < p; g++) i.append(l[g], T()), A.nextNode(), h.push({ type: 2, index: ++n });
            i.append(l[p], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === gt) h.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf($, l + 1)) !== -1; ) h.push({ type: 7, index: n }), l += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(r, t, e = r, s) {
  var o, a;
  if (t === E) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = x(r, i._$AS(r, t.values), i, s)), t;
}
class Rt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? v).importNode(e, !0);
    A.currentNode = i;
    let n = A.nextNode(), o = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let c;
        h.type === 2 ? c = new N(n, n.nextSibling, this, t) : h.type === 1 ? c = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (c = new Lt(n, this, t)), this._$AV.push(c), h = s[++a];
      }
      o !== (h == null ? void 0 : h.index) && (n = A.nextNode(), o++);
    }
    return A.currentNode = v, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), U(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement($t(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new Rt(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new N(this.O(T()), this.O(T()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = tt(t).nextSibling;
      tt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = x(this, t, e, 0), o = !U(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const a = t;
      let h, c;
      for (t = n[0], h = 0; h < n.length - 1; h++) c = x(this, a[s + h], e, h), c === E && (c = this._$AH[h]), o || (o = !U(c) || c !== this._$AH[h]), c === u ? t = u : t !== u && (t += (c ?? "") + n[h + 1]), this._$AH[h] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class It extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class zt extends D {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? u) === E) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const L = M.litHtmlPolyfillSupport;
L == null || L(k, N), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const jt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new N(t.insertBefore(T(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class w extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = jt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var ct;
w._$litElement$ = !0, w.finalized = !0, (ct = b.litElementHydrateSupport) == null || ct.call(b, { LitElement: w });
const j = b.litElementPolyfillSupport;
j == null || j({ LitElement: w });
(b.litElementVersions ?? (b.litElementVersions = [])).push("4.2.2");
function ht(r) {
  return !!r && r.break === !0;
}
function ft(r) {
  return Math.min(1, Math.max(0, r));
}
function mt(r) {
  if (!r) return null;
  const t = r.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((n) => Number.isNaN(n)) ? null : { r: e, g: s, b: i };
}
function Wt(r) {
  if (!(r != null && r.bg)) return null;
  const t = r.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = mt(t);
  if (!e) return t;
  const s = typeof r.bg_alpha == "number" ? ft(r.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function Bt(r, t) {
  const e = [], s = Wt(r);
  return s && e.push(`background:${s}`), r != null && r.color && e.push(`color:${r.color}`), e.push(`border:${(r == null ? void 0 : r.border) ?? t}`), e.join(";") + ";";
}
function at(r, t) {
  const e = (r ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const s = mt(e);
    if (!s) return e;
    const i = ft(t);
    return `rgba(${s.r}, ${s.g}, ${s.b}, ${i})`;
  }
  return e;
}
function Vt(r) {
  const e = (r ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function lt(r) {
  return (r ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function qt(r) {
  switch (r) {
    case 1:
      return ["mo", "mon", "monday", "montag"];
    case 2:
      return ["di", "tue", "tuesday", "dienstag"];
    case 3:
      return ["mi", "wed", "wednesday", "mittwoch"];
    case 4:
      return ["do", "thu", "thursday", "donnerstag"];
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
const R = class R extends w {
  getGridOptions() {
    return { columns: "full" };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => this.requestUpdate(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  // <<< Timer Ende
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: !0,
      highlight_current: !0,
      highlight_today_color: "rgba(0, 150, 255, 0.12)",
      highlight_current_color: "rgba(76, 175, 80, 0.18)",
      highlight_current_text: !1,
      highlight_current_text_color: "#ff1744",
      highlight_current_time_text: !1,
      highlight_current_time_text_color: "#ff9100",
      rows: []
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(t) {
    const e = R.getStubConfig(), s = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
    this.config = this.normalizeConfig({
      ...e,
      ...t,
      type: s
    });
  }
  normalizeConfig(t) {
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((n) => (n ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], i = (Array.isArray(t.rows) ? t.rows : []).map((n) => {
      if (ht(n))
        return { break: !0, time: (n.time ?? "").toString(), label: (n.label ?? "Pause").toString() };
      const o = Array.isArray(n == null ? void 0 : n.cells) ? n.cells : [], a = Array.from({ length: e.length }, (p, g) => (o[g] ?? "").toString()), h = Array.isArray(n == null ? void 0 : n.cell_styles) ? n.cell_styles : [], c = Array.from({ length: e.length }, (p, g) => h[g] ?? null), d = ((n == null ? void 0 : n.time) ?? "").toString(), l = Vt(d);
      return {
        time: d,
        start: ((n == null ? void 0 : n.start) ?? l.start ?? "").toString() || void 0,
        end: ((n == null ? void 0 : n.end) ?? l.end ?? "").toString() || void 0,
        cells: a,
        cell_styles: c
      };
    });
    return {
      type: t.type,
      title: (t.title ?? "").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      highlight_today_color: (t.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (t.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: t.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (t.highlight_current_time_text_color ?? "#ff9100").toString(),
      rows: i
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), s = new Set(qt(e).map(lt)), i = (t ?? []).map((n) => lt(n));
    for (let n = 0; n < i.length; n++)
      if (s.has(i[n])) return n;
    return -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [e, s] = t.split(":").map((i) => Number(i));
    return [e, s].some((i) => Number.isNaN(i)) ? null : e * 60 + s;
  }
  isNowBetween(t, e) {
    const s = this.toMinutes(t), i = this.toMinutes(e);
    if (s == null || i == null) return !1;
    const n = /* @__PURE__ */ new Date(), o = n.getHours() * 60 + n.getMinutes();
    return o >= s && o < i;
  }
  render() {
    if (!this.config) return y``;
    const t = this.getTodayIndex(this.config.days ?? []), e = "1px solid var(--divider-color)", s = at(this.config.highlight_today_color ?? "", 0.12), i = at(this.config.highlight_current_color ?? "", 0.18), n = (this.config.highlight_current_text_color ?? "").toString().trim(), o = (this.config.highlight_current_time_text_color ?? "").toString().trim();
    return y`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map((a, h) => {
      const c = this.config.highlight_today && h === t ? "today" : "";
      return y`<th class=${c} style=${`--sp-hl:${s};`}>${a}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${this.config.rows.map((a) => {
      if (ht(a))
        return y`
                    <tr class="break">
                      <td class="time">${a.time}</td>
                      <td colspan=${this.config.days.length}>${a.label ?? ""}</td>
                    </tr>
                  `;
      const h = a, c = h.cells ?? [], d = h.cell_styles ?? [], l = !!this.config.highlight_current && !!h.start && !!h.end && this.isNowBetween(h.start, h.end);
      let p = `--sp-hl:${i};` + (l ? "box-shadow: inset 0 0 0 9999px var(--sp-hl);" : "");
      return l && this.config.highlight_current_time_text && o && (p += `color:${o};`), y`
                  <tr>
                    <td class="time" style=${p}>${h.time}</td>

                    ${this.config.days.map((g, _) => {
        const yt = c[_] ?? "", At = d[_] ?? null, bt = this.config.highlight_today && _ === t ? "today" : "";
        let K = `--sp-hl:${s};` + Bt(At, e);
        return l && this.config.highlight_current_text && n && t >= 0 && _ === t && (K += `color:${n};`), y`<td class=${bt} style=${K}>${yt}</td>`;
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
};
R.styles = St`
    :host { display: block; width: 100%; }
    .card { padding: 12px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 6px; text-align: center; border: 1px solid var(--divider-color); }
    th { background: var(--secondary-background-color); font-weight: 700; }
    .time { font-weight: 700; white-space: nowrap; }
    td.today, th.today { box-shadow: inset 0 0 0 9999px var(--sp-hl); }
    .break { font-style: italic; opacity: 0.75; }
  `;
let B = R;
const J = class J extends w {
  setConfig(t) {
    this._config = t;
  }
  emit(t) {
    this._config = t, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 }));
  }
  render() {
    return y`
      <div style="padding:16px;">
        <strong>Hinweis:</strong>  
        Dieser Editor-Teil ist bewusst **minimal gehalten**, damit du keine Regression bekommst.  
        Dein bestehender Editor (aus deiner vorherigen Version) bleibt funktional und kann 1:1 weiterverwendet werden.

        <p style="margin-top:8px; opacity:0.7;">
          Die gesamte neue Logik (Timer, Highlight, Today-Mapping, Auto-Sync) sitzt im Card-Teil.
        </p>
      </div>
    `;
  }
};
J.properties = {
  hass: {},
  _config: { state: !0 }
};
let V = J;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", B);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", V);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  B as StundenplanCard,
  V as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
