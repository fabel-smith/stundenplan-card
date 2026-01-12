/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, Z = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), K = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (o) => new ht(typeof o == "string" ? o : o + "", void 0, J), ct = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[n + 1], o[0]);
  return new ht(e, o, J);
}, ft = (o, t) => {
  if (Z) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = O.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, Q = Z ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return $t(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _t, defineProperty: yt, getOwnPropertyDescriptor: bt, getOwnPropertyNames: vt, getOwnPropertySymbols: At, getPrototypeOf: wt } = Object, f = globalThis, X = f.trustedTypes, xt = X ? X.emptyScript : "", I = f.reactiveElementPolyfillSupport, k = (o, t) => o, W = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? xt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, dt = (o, t) => !_t(o, t), Y = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: dt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && yt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = bt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const l = s == null ? void 0 : s.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = wt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, i = [...vt(e), ...At(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Q(s));
    } else t !== void 0 && e.push(Q(t));
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ft(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : W).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : W;
      this._$Em = s;
      const h = a.fromAttribute(e, l.type);
      this[s] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    var r;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (n = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? dt)(n, e) || i.useDefault && i.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: l } = r, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var n;
        return (n = s.hostUpdate) == null ? void 0 : n.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[k("elementProperties")] = /* @__PURE__ */ new Map(), A[k("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: A }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, tt = (o) => o, N = P.trustedTypes, et = N ? N.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ut = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + $, St = `<${pt}>`, v = document, M = () => v.createComment(""), T = (o) => o === null || typeof o != "object" && typeof o != "function", G = Array.isArray, Et = (o) => G(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, _ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, rt = /"/g, gt = /^(?:script|style|textarea|title)$/i, Ct = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), g = Ct(1), S = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), y = v.createTreeWalker(v, 129);
function mt(o, t) {
  if (!G(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const kt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = C;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let h, d, c = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, d = r.exec(a), d !== null); ) p = r.lastIndex, r === C ? d[1] === "!--" ? r = it : d[1] !== void 0 ? r = st : d[2] !== void 0 ? (gt.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = _) : d[3] !== void 0 && (r = _) : r === _ ? d[0] === ">" ? (r = s ?? C, c = -1) : d[1] === void 0 ? c = -2 : (c = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? _ : d[3] === '"' ? rt : nt) : r === rt || r === nt ? r = _ : r === it || r === st ? r = C : (r = _, s = void 0);
    const m = r === _ && o[l + 1].startsWith("/>") ? " " : "";
    n += r === C ? a + St : c >= 0 ? (i.push(h), a.slice(0, c) + ut + a.slice(c) + $ + m) : a + $ + (c === -2 ? l : m);
  }
  return [mt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, d] = kt(t, e);
    if (this.el = U.createElement(h, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = y.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ut)) {
          const p = d[r++], m = s.getAttribute(c).split($), H = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: H[2], strings: m, ctor: H[1] === "." ? Mt : H[1] === "?" ? Tt : H[1] === "@" ? Ut : B }), s.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: n }), s.removeAttribute(c));
        if (gt.test(s.tagName)) {
          const c = s.textContent.split($), p = c.length - 1;
          if (p > 0) {
            s.textContent = N ? N.emptyScript : "";
            for (let m = 0; m < p; m++) s.append(c[m], M()), y.nextNode(), a.push({ type: 2, index: ++n });
            s.append(c[p], M());
          }
        }
      } else if (s.nodeType === 8) if (s.data === pt) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = s.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = v.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(o, t, e = o, i) {
  var r, l;
  if (t === S) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), n === void 0 ? s = void 0 : (s = new n(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = E(o, s._$AS(o, t.values), s, i)), t;
}
class Pt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? v).importNode(e, !0);
    y.currentNode = s;
    let n = y.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new R(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new Rt(n, this, t)), this._$AV.push(h), a = i[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = y.nextNode(), r++);
    }
    return y.currentNode = v, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = E(this, t, e), T(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = U.createElement(mt(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const r = new Pt(s, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    G(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new R(this.O(M()), this.O(M()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = tt(t).nextSibling;
      tt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = E(this, t, e, 0), r = !T(t) || t !== this._$AH && t !== S, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = E(this, l[i + a], e, a), h === S && (h = this._$AH[a]), r || (r = !T(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Tt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ut extends B {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? u) === S) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Rt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const F = P.litHtmlPolyfillSupport;
F == null || F(U, R), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.2");
const Ht = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new R(t.insertBefore(M(), n), n, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class x extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ht(e, this.renderRoot, this.renderOptions);
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
    return S;
  }
}
var lt;
x._$litElement$ = !0, x.finalized = !0, (lt = b.litElementHydrateSupport) == null || lt.call(b, { LitElement: x });
const V = b.litElementPolyfillSupport;
V == null || V({ LitElement: x });
(b.litElementVersions ?? (b.litElementVersions = [])).push("4.2.2");
function w(o) {
  return !!o && o.break === !0;
}
function at(o) {
  const t = /^(\d{1,2}):(\d{2})$/.exec((o ?? "").trim());
  if (!t) return null;
  const e = Number(t[1]), i = Number(t[2]);
  return !Number.isFinite(e) || !Number.isFinite(i) ? null : e * 60 + i;
}
function Ot(o) {
  const e = (o ?? "").toString().match(/\b\d{1,2}:\d{2}\b/g) ?? [];
  if (e.length < 2) return { start: null, end: null };
  const i = at(e[0]), s = at(e[1]);
  return { start: i, end: s };
}
function Nt() {
  const o = /* @__PURE__ */ new Date();
  return o.getHours() * 60 + o.getMinutes();
}
const D = class D extends x {
  // Sections view sizing (Home Assistant)
  getGridOptions() {
    return { columns: "full" };
  }
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: !0,
      highlight_current: !1,
      rows: [
        { time: "1. 08:00–08:45", cells: ["D", "M", "E", "D", "S"] },
        { time: "2. 08:50–09:35", cells: ["M", "M", "D", "E", "S"] },
        { break: !0, time: "09:35–09:55", label: "Pause" }
      ]
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(t) {
    const e = D.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
    if (!(i === "custom:stundenplan-card" || i === "stundenplan-card")) {
      this.config = this.normalizeConfig(e);
      return;
    }
    this.config = this.normalizeConfig({
      ...e,
      ...t,
      type: i
    });
  }
  getCardSize() {
    var e, i;
    const t = ((i = (e = this.config) == null ? void 0 : e.rows) == null ? void 0 : i.length) ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((n) => (n ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((n) => {
      if (w(n))
        return {
          break: !0,
          time: (n.time ?? "").toString(),
          label: (n.label ?? "Pause").toString()
        };
      const r = Array.isArray(n == null ? void 0 : n.cells) ? n.cells : [], l = Array.from({ length: e.length }, (a, h) => (r[h] ?? "").toString());
      return {
        time: ((n == null ? void 0 : n.time) ?? "").toString(),
        cells: l
      };
    });
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      rows: s
    };
  }
  getTodayIndex() {
    const t = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }, e = (/* @__PURE__ */ new Date()).getDay();
    return t[e] ?? -1;
  }
  render() {
    if (!this.config) return g``;
    const t = this.getTodayIndex(), e = Nt();
    return g`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map(
      (i, s) => g`<th class=${this.config.highlight_today && s === t ? "today" : ""}>${i}</th>`
    )}
              </tr>
            </thead>

            <tbody>
              ${this.config.rows.map((i) => {
      if (w(i))
        return g`
                    <tr class="break">
                      <td class="time">${i.time}</td>
                      <td colspan=${this.config.days.length}>${i.label ?? ""}</td>
                    </tr>
                  `;
      const s = i, { start: n, end: r } = Ot(s.time), l = this.config.highlight_current && n != null && r != null && e >= n && e < r;
      return g`
                  <tr class=${l ? "current" : ""}>
                    <td class="time ${l ? "currentTime" : ""}">${s.time}</td>
                    ${this.config.days.map((a, h) => {
        var p;
        const d = ((p = s.cells) == null ? void 0 : p[h]) ?? "", c = this.config.highlight_today && h === t;
        return g`<td class=${c ? "today" : ""}>${d}</td>`;
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
D.styles = ct`
    /* immer volle Breite */
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    ha-card {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .card {
      padding: 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    th,
    td {
      padding: 6px;
      text-align: center;
      border: 1px solid var(--divider-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }

    .time {
      font-weight: 700;
      white-space: nowrap;
    }

    .today {
      background: rgba(0, 150, 255, 0.2);
    }

    /* highlight_current */
    tr.current td {
      background: rgba(76, 175, 80, 0.10);
    }
    /* Zeitfeld etwas stärker */
    td.currentTime {
      background: rgba(76, 175, 80, 0.18) !important;
    }

    /* Pausen */
    .break td {
      font-style: italic;
      opacity: 0.75;
      background: rgba(255, 255, 255, 0.02);
    }
  `;
let z = D;
const L = class L extends x {
  setConfig(t) {
    const e = (((t == null ? void 0 : t.type) ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  normalizeConfig(t) {
    const e = z.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((r) => (r ?? "").toString()) : e.days, n = (Array.isArray(t.rows) ? t.rows : e.rows).map((r) => {
      if (w(r))
        return { break: !0, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() };
      const l = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], a = Array.from({ length: i.length }, (h, d) => (l[d] ?? "").toString());
      return { time: ((r == null ? void 0 : r.time) ?? "").toString(), cells: a };
    });
    return {
      type: (t.type ?? e.type).toString(),
      title: (t.title ?? e.title).toString(),
      days: i,
      highlight_today: t.highlight_today ?? e.highlight_today,
      highlight_current: t.highlight_current ?? e.highlight_current,
      rows: n
    };
  }
  emit(t) {
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((i) => i.trim()).filter((i) => i.length);
    this.emit(this.normalizeConfig({ ...this._config, days: e }));
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, n) => n === t ? { ...s, time: e } : s);
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((n, r) => {
      if (r !== t || w(n)) return n;
      const l = Array.isArray(n.cells) ? [...n.cells] : [];
      return l[e] = i, { ...n, cells: l };
    });
    this.emit({ ...this._config, rows: s });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, n) => n !== t ? s : e ? { break: !0, time: s.time ?? "", label: s.label ?? "Pause" } : { time: s.time ?? "", cells: Array.from({ length: this._config.days.length }, () => "") });
    this.emit({ ...this._config, rows: i });
  }
  updateBreakLabel(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, n) => n === t ? { ...s, label: e } : s);
    this.emit({ ...this._config, rows: i });
  }
  addLessonRow() {
    if (!this._config) return;
    const t = [
      ...this._config.rows,
      { time: "", cells: Array.from({ length: this._config.days.length }, () => "") }
    ];
    this.emit({ ...this._config, rows: t });
  }
  addBreakRow() {
    if (!this._config) return;
    const t = [...this._config.rows, { break: !0, time: "", label: "Pause" }];
    this.emit({ ...this._config, rows: t });
  }
  removeRow(t) {
    if (!this._config) return;
    const e = this._config.rows.filter((i, s) => s !== t);
    this.emit({ ...this._config, rows: e });
  }
  render() {
    return this._config ? g`
      <div class="section">
        <div class="row">
          <label>Titel</label>
          <input
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(t) => this.emit({ ...this._config, title: t.target.value })}
          />
        </div>

        <div class="row">
          <label>Tage (Komma getrennt)</label>
          <input
            type="text"
            .value=${(this._config.days ?? []).join(", ")}
            @input=${(t) => this.setDaysFromString(t.target.value)}
          />
          <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>

        <div class="row">
          <label>Optionen</label>
          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_today ?? !0}
              @change=${(t) => this.emit({ ...this._config, highlight_today: t.target.checked })}
            />
            <span>Heute hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current ?? !1}
              @change=${(t) => this.emit({ ...this._config, highlight_current: t.target.checked })}
            />
            <span>Aktuelle Stunde hervorheben</span>
          </div>
        </div>
      </div>

      <div class="rowsHeader">
        <h3>Stundenplan (Zeilen)</h3>
        <div class="btnBar">
          <button @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      ${this._config.rows.map(
      (t, e) => g`
          <div class="rowCard">
            <div class="rowTop">
              <div>
                <label>Zeit / Stunde</label>
                <input
                  type="text"
                  .value=${t.time ?? ""}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(i) => this.updateRowTime(e, i.target.value)}
                />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input
                  type="checkbox"
                  .checked=${w(t)}
                  @change=${(i) => this.toggleBreak(e, i.target.checked)}
                />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this.removeRow(e)}>Löschen</button>
              </div>
            </div>

            ${w(t) ? g`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${t.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(i) => this.updateBreakLabel(e, i.target.value)}
                    />
                  </div>
                ` : g`
                  <div class="cellsGrid">
                    ${(this._config.days ?? []).map(
        (i, s) => {
          var n;
          return g`
                        <div>
                          <div class="cellLabel">${i}</div>
                          <input
                            type="text"
                            .value=${(((n = t.cells) == null ? void 0 : n[s]) ?? "").toString()}
                            placeholder="Fach"
                            @input=${(r) => this.updateRowCell(e, s, r.target.value)}
                          />
                        </div>
                      `;
        }
      )}
                  </div>
                `}
          </div>
        `
    )}
    ` : g``;
  }
};
L.properties = {
  hass: {},
  _config: { state: !0 }
}, L.styles = ct`
    :host {
      display: block;
      box-sizing: border-box;
    }

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
let q = L;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", z);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", q);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  z as StundenplanCard,
  q as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
