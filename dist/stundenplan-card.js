/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, J = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), X = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = X.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && X.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (n) => new ht(typeof n == "string" ? n : n + "", void 0, K), dt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new ht(e, n, K);
}, _t = (n, t) => {
  if (J) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = R.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, Y = J ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $t(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bt, defineProperty: vt, getOwnPropertyDescriptor: At, getOwnPropertyNames: wt, getOwnPropertySymbols: xt, getPrototypeOf: St } = Object, _ = globalThis, tt = _.trustedTypes, Et = tt ? tt.emptyScript : "", j = _.reactiveElementPolyfillSupport, P = (n, t) => n, q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Et : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, pt = (n, t) => !bt(n, t), et = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: pt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && vt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = At(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = St(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...wt(e), ...xt(e)];
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
      for (const i of s) e.unshift(Y(i));
    } else t !== void 0 && e.push(Y(t));
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
    return _t(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : q).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : q;
      this._$Em = i;
      const h = a.fromAttribute(e, l.type);
      this[i] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? pt)(r, e) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: l } = o, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[P("elementProperties")] = /* @__PURE__ */ new Map(), x[P("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: x }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, st = (n) => n, z = M.trustedTypes, it = z ? z.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ut = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + $, Ct = `<${gt}>`, w = document, H = () => w.createComment(""), T = (n) => n === null || typeof n != "object" && typeof n != "function", Q = Array.isArray, kt = (n) => Q(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", W = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, nt = />/g, b = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, at = /"/g, ft = /^(?:script|style|textarea|title)$/i, Pt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), f = Pt(1), E = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), lt = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function mt(n, t) {
  if (!Q(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Mt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = k;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let h, c, d = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, c = o.exec(a), c !== null); ) p = o.lastIndex, o === k ? c[1] === "!--" ? o = rt : c[1] !== void 0 ? o = nt : c[2] !== void 0 ? (ft.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = b) : c[3] !== void 0 && (o = b) : o === b ? c[0] === ">" ? (o = i ?? k, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? b : c[3] === '"' ? at : ot) : o === at || o === ot ? o = b : o === rt || o === nt ? o = k : (o = b, i = void 0);
    const m = o === b && n[l + 1].startsWith("/>") ? " " : "";
    r += o === k ? a + Ct : d >= 0 ? (s.push(h), a.slice(0, d) + ut + a.slice(d) + $ + m) : a + $ + (d === -2 ? l : m);
  }
  return [mt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, c] = Mt(t, e);
    if (this.el = U.createElement(h, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = v.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ut)) {
          const p = c[o++], m = i.getAttribute(d).split($), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: g[2], strings: m, ctor: g[1] === "." ? Tt : g[1] === "?" ? Ut : g[1] === "@" ? Ot : B }), i.removeAttribute(d);
        } else d.startsWith($) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (ft.test(i.tagName)) {
          const d = i.textContent.split($), p = d.length - 1;
          if (p > 0) {
            i.textContent = z ? z.emptyScript : "";
            for (let m = 0; m < p; m++) i.append(d[m], H()), v.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[p], H());
          }
        }
      } else if (i.nodeType === 8) if (i.data === gt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf($, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(n, t, e = n, s) {
  var o, l;
  if (t === E) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = T(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = C(n, i._$AS(n, t.values), i, s)), t;
}
class Ht {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    v.currentNode = i;
    let r = v.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new O(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new Rt(r, this, t)), this._$AV.push(h), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = v.nextNode(), o++);
    }
    return v.currentNode = w, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class O {
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
    t = C(this, t, e), T(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(mt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new Ht(i, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = lt.get(t.strings);
    return e === void 0 && lt.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new O(this.O(H()), this.O(H()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = st(t).nextSibling;
      st(t).remove(), t = i;
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
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = C(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++) h = C(this, l[s + a], e, a), h === E && (h = this._$AH[a]), o || (o = !T(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ut extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ot extends B {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? u) === E) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Rt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const F = M.litHtmlPolyfillSupport;
F == null || F(U, O), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const Nt = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new O(t.insertBefore(H(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class S extends x {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nt(e, this.renderRoot, this.renderOptions);
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
S._$litElement$ = !0, S.finalized = !0, (ct = A.litElementHydrateSupport) == null || ct.call(A, { LitElement: S });
const V = A.litElementPolyfillSupport;
V == null || V({ LitElement: S });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
function y(n) {
  return !!n && n.break === !0;
}
function L(n) {
  return Math.min(1, Math.max(0, n));
}
function zt(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((r) => Number.isNaN(r)) ? null : { r: e, g: s, b: i };
}
function N(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = L(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Lt(n) {
  if (!(n != null && n.bg)) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = zt(t);
  if (!e) return t;
  const s = typeof n.bg_alpha == "number" ? L(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function yt(n, t) {
  const e = [], s = Lt(n);
  return s && e.push(`background:${s}`), n != null && n.color && e.push(`color:${n.color}`), e.push(`border:${(n == null ? void 0 : n.border) ?? t}`), e.join(";") + ";";
}
const D = class D extends S {
  // Sections view sizing (Home Assistant)
  getGridOptions() {
    return {
      columns: "full"
    };
  }
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: !0,
      rows: [
        {
          time: "1. 08:00–08:45",
          cells: ["D", "M", "E", "D", "S"],
          cell_styles: [
            { bg: "#3b82f6", bg_alpha: 0.18, color: "#ffffff" },
            { bg: "#22c55e", bg_alpha: 0.18, color: "#ffffff" },
            null,
            null,
            { bg: "#a855f7", bg_alpha: 0.18, color: "#ffffff" }
          ]
        },
        { time: "2. 08:50–09:35", cells: ["M", "M", "D", "E", "S"] },
        { break: !0, time: "09:35–09:55", label: "Pause" }
      ]
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  // IMPORTANT: defensiv, damit Picker/Preview stabil bleibt
  setConfig(t) {
    const e = D.getStubConfig(), s = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
    if (!(s === "custom:stundenplan-card" || s === "stundenplan-card")) {
      this.config = this.normalizeConfig(e);
      return;
    }
    this.config = this.normalizeConfig({
      ...e,
      ...t,
      type: s
    });
  }
  getCardSize() {
    var e, s;
    const t = ((s = (e = this.config) == null ? void 0 : e.rows) == null ? void 0 : s.length) ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((r) => (r ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], i = (Array.isArray(t.rows) ? t.rows : []).map((r) => {
      if (y(r))
        return {
          break: !0,
          time: (r.time ?? "").toString(),
          label: (r.label ?? "Pause").toString()
        };
      const o = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], l = Array.from({ length: e.length }, (d, p) => (o[p] ?? "").toString()), a = Array.isArray(r == null ? void 0 : r.cell_styles) ? r.cell_styles : [], h = Array.from({ length: e.length }, (d, p) => N(a[p])), c = { time: ((r == null ? void 0 : r.time) ?? "").toString(), cells: l };
      return h.some((d) => !!d) && (c.cell_styles = h), c;
    });
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      rows: i
    };
  }
  getTodayIndex() {
    const t = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }, e = (/* @__PURE__ */ new Date()).getDay();
    return t[e] ?? -1;
  }
  render() {
    if (!this.config) return f``;
    const t = this.getTodayIndex(), e = "1px solid var(--divider-color)";
    return f`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map(
      (s, i) => f`<th class=${this.config.highlight_today && i === t ? "today" : ""}>${s}</th>`
    )}
              </tr>
            </thead>

            <tbody>
              ${this.config.rows.map((s) => {
      if (y(s))
        return f`
                    <tr class="break">
                      <td class="time">${s.time}</td>
                      <td colspan=${this.config.days.length}>${s.label ?? ""}</td>
                    </tr>
                  `;
      const i = s, r = i.cells ?? [], o = i.cell_styles ?? [];
      return f`
                  <tr>
                    <td class="time">${i.time}</td>
                    ${this.config.days.map((l, a) => {
        const h = r[a] ?? "", c = o[a] ?? null, d = this.config.highlight_today && a === t ? "today" : "";
        return f`<td class=${d} style=${yt(c, e)}>${h}</td>`;
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
D.styles = dt`
    /* volle Breite – unabhängig vom UI-Toggle */
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
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
    }

    th,
    td {
      padding: 6px;
      text-align: center;
      border: 1px solid var(--divider-color);
    }

    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }

    .time {
      font-weight: 700;
      white-space: nowrap;
    }

    /* Heute – nur als Overlay, damit Zellfarben bleiben */
    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px rgba(0, 150, 255, 0.12);
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
let Z = D;
const I = class I extends S {
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
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((r) => (r ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], i = (Array.isArray(t.rows) ? t.rows : []).map((r) => {
      if (y(r))
        return { break: !0, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() };
      const o = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], l = Array.from({ length: e.length }, (d, p) => (o[p] ?? "").toString()), a = Array.isArray(r == null ? void 0 : r.cell_styles) ? r.cell_styles : [], h = Array.from({ length: e.length }, (d, p) => N(a[p])), c = { time: ((r == null ? void 0 : r.time) ?? "").toString(), cells: l };
      return c.cell_styles = h, c;
    });
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      rows: i
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
    const e = t.split(",").map((i) => i.trim()).filter((i) => i.length), s = (this._config.rows ?? []).map((i) => {
      if (y(i)) return i;
      const r = i, o = Array.from({ length: e.length }, (a, h) => {
        var c;
        return (((c = r.cells) == null ? void 0 : c[h]) ?? "").toString();
      }), l = Array.from({ length: e.length }, (a, h) => {
        var c;
        return N((c = r.cell_styles) == null ? void 0 : c[h]);
      });
      return { ...r, cells: o, cell_styles: l };
    });
    this.emit({ ...this._config, days: e, rows: s });
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => r === t ? { ...i, time: e } : i);
    this.emit({ ...this._config, rows: s });
  }
  updateRowCell(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, o) => {
      if (o !== t || y(r)) return r;
      const l = r, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = s, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateCellStyle(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, o) => {
      if (o !== t || y(r)) return r;
      const l = r, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), c = { ...a[e] ? { ...a[e] } : {}, ...s };
      return typeof c.bg_alpha == "number" && (c.bg_alpha = L(c.bg_alpha)), a[e] = N(c), { ...l, cell_styles: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => r !== t ? i : e ? { break: !0, time: i.time ?? "", label: i.label ?? "Pause" } : {
      time: i.time ?? "",
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    });
    this.emit({ ...this._config, rows: s });
  }
  updateBreakLabel(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => r === t ? { ...i, label: e } : i);
    this.emit({ ...this._config, rows: s });
  }
  addLessonRow() {
    if (!this._config) return;
    const t = [
      ...this._config.rows,
      {
        time: "",
        cells: Array.from({ length: this._config.days.length }, () => ""),
        cell_styles: Array.from({ length: this._config.days.length }, () => null)
      }
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
    const e = this._config.rows.filter((s, i) => i !== t);
    this.emit({ ...this._config, rows: e });
  }
  render() {
    return this._config ? f`
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
      (t, e) => f`
          <div class="rowCard">
            <div class="rowTop">
              <div>
                <label>Zeit / Stunde</label>
                <input
                  type="text"
                  .value=${t.time ?? ""}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(s) => this.updateRowTime(e, s.target.value)}
                />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input type="checkbox" .checked=${y(t)} @change=${(s) => this.toggleBreak(e, s.target.checked)} />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this.removeRow(e)}>Löschen</button>
              </div>
            </div>

            ${y(t) ? f`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${t.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(s) => this.updateBreakLabel(e, s.target.value)}
                    />
                  </div>
                ` : f`
                  <div class="cellsGrid">
                    ${(this._config.days ?? []).map((s, i) => {
        var p, m;
        const r = t, o = (((p = r.cells) == null ? void 0 : p[i]) ?? "").toString(), l = ((m = r.cell_styles) == null ? void 0 : m[i]) ?? null, a = l != null && l.bg && l.bg.startsWith("#") ? l.bg : "#3b82f6", h = typeof (l == null ? void 0 : l.bg_alpha) == "number" ? L(l.bg_alpha) : 0.18, c = Math.round(h * 100), d = l != null && l.color && l.color.startsWith("#") ? l.color : "#ffffff";
        return f`
                        <div class="cellBox">
                          <div class="cellLabel">${s}</div>

                          <input
                            type="text"
                            class="cellInput"
                            .value=${o}
                            placeholder="Fach"
                            @input=${(g) => this.updateRowCell(e, i, g.target.value)}
                          />

                          <div class="styleGrid">
                            <div class="styleLine">
                              <div class="styleLabel">Hintergrund</div>
                              <input
                                type="color"
                                .value=${a}
                                @input=${(g) => this.updateCellStyle(e, i, { bg: g.target.value })}
                              />
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Transparenz</div>
                              <div class="rangeWrap">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  .value=${String(c)}
                                  @input=${(g) => this.updateCellStyle(e, i, { bg_alpha: Number(g.target.value) / 100 })}
                                />
                                <div class="styleHint">${c}%</div>
                              </div>
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Text</div>
                              <input
                                type="color"
                                .value=${d}
                                @input=${(g) => this.updateCellStyle(e, i, { color: g.target.value })}
                              />
                            </div>
                          </div>

                          <div class="preview" style=${yt(l, "1px solid var(--divider-color)")}>
                            Vorschau
                          </div>
                        </div>
                      `;
      })}
                  </div>
                `}
          </div>
        `
    )}
    ` : f``;
  }
};
I.properties = {
  hass: {},
  _config: { state: !0 }
}, I.styles = dt`
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
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }

    .cellBox {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: var(--card-background-color);
    }

    .cellLabel {
      opacity: 0.7;
      font-size: 12px;
      margin-bottom: 6px;
    }

    .cellInput {
      margin-bottom: 8px;
    }

    .styleGrid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin-top: 8px;
      margin-bottom: 8px;
    }

    .styleLine {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 10px;
      align-items: center;
    }

    .styleLabel {
      opacity: 0.75;
      font-size: 12px;
    }

    .rangeWrap {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
    }

    .styleHint {
      opacity: 0.7;
      font-size: 12px;
      min-width: 44px;
      text-align: right;
    }

    input[type="range"] {
      width: 100%;
    }

    input[type="color"] {
      width: 100%;
      height: 34px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      box-sizing: border-box;
      cursor: pointer;
    }

    .preview {
      border-radius: 10px;
      padding: 8px;
      text-align: center;
      opacity: 0.85;
      background: rgba(255, 255, 255, 0.04);
    }
  `;
let G = I;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Z);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", G);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  Z as StundenplanCard,
  G as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
