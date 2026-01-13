/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, Q = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), tt = /* @__PURE__ */ new WeakMap();
let pt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = tt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && tt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xt = (n) => new pt(typeof n == "string" ? n : n + "", void 0, X), gt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new pt(e, n, X);
}, At = (n, t) => {
  if (Q) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = L.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, et = Q ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return xt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St, defineProperty: Et, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: kt, getOwnPropertySymbols: Pt, getPrototypeOf: Mt } = Object, $ = globalThis, it = $.trustedTypes, Ht = it ? it.emptyScript : "", F = $.reactiveElementPolyfillSupport, H = (n, t) => n, Z = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ht : null;
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
} }, ft = (n, t) => !St(n, t), st = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Et(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const t = Mt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const e = this.properties, i = [...kt(e), ...Pt(e)];
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
      for (const s of i) e.unshift(et(s));
    } else t !== void 0 && e.push(et(t));
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
    return At(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Z).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : Z;
      this._$Em = s;
      const c = a.fromAttribute(e, l.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? ft)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: l } = o, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[H("elementProperties")] = /* @__PURE__ */ new Map(), E[H("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: E }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, rt = (n) => n, B = R.trustedTypes, nt = B ? B.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, _t = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + b, Rt = `<${mt}>`, A = document, N = () => A.createComment(""), T = (n) => n === null || typeof n != "object" && typeof n != "function", Y = Array.isArray, Nt = (n) => Y(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, lt = />/g, v = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, ht = /"/g, yt = /^(?:script|style|textarea|title)$/i, Tt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), _ = Tt(1), k = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), w = A.createTreeWalker(A, 129);
function bt(n, t) {
  if (!Y(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const Ot = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, h, d = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, h = o.exec(a), h !== null); ) u = o.lastIndex, o === M ? h[1] === "!--" ? o = ot : h[1] !== void 0 ? o = lt : h[2] !== void 0 ? (yt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = v) : h[3] !== void 0 && (o = v) : o === v ? h[0] === ">" ? (o = s ?? M, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? v : h[3] === '"' ? ht : at) : o === ht || o === at ? o = v : o === ot || o === lt ? o = M : (o = v, s = void 0);
    const f = o === v && n[l + 1].startsWith("/>") ? " " : "";
    r += o === M ? a + Rt : d >= 0 ? (i.push(c), a.slice(0, d) + _t + a.slice(d) + b + f) : a + b + (d === -2 ? l : f);
  }
  return [bt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class O {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, h] = Ot(t, e);
    if (this.el = O.createElement(c, i), w.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = w.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(_t)) {
          const u = h[o++], f = s.getAttribute(d).split(b), p = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: p[2], strings: f, ctor: p[1] === "." ? zt : p[1] === "?" ? Lt : p[1] === "@" ? Dt : j }), s.removeAttribute(d);
        } else d.startsWith(b) && (a.push({ type: 6, index: r }), s.removeAttribute(d));
        if (yt.test(s.tagName)) {
          const d = s.textContent.split(b), u = d.length - 1;
          if (u > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(d[f], N()), w.nextNode(), a.push({ type: 2, index: ++r });
            s.append(d[u], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === mt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(b, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += b.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(n, t, e = n, i) {
  var o, l;
  if (t === k) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = T(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = P(n, s._$AS(n, t.values), s, i)), t;
}
class Ut {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    w.currentNode = s;
    let r = w.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new z(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new Bt(r, this, t)), this._$AV.push(c), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = w.nextNode(), o++);
    }
    return w.currentNode = A, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = P(this, t, e), T(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = O.createElement(bt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new Ut(s, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ct.get(t.strings);
    return e === void 0 && ct.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new z(this.O(N()), this.O(N()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = rt(t).nextSibling;
      rt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = P(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== k, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = P(this, l[i + a], e, a), c === k && (c = this._$AH[a]), o || (o = !T(c) || c !== this._$AH[a]), c === g ? t = g : t !== g && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Lt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Dt extends j {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? g) === k) return;
    const i = this._$AH, s = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== g && (i === g || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const G = R.litHtmlPolyfillSupport;
G == null || G(O, z), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.2");
const It = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new z(t.insertBefore(N(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class C extends E {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = It(e, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
var ut;
C._$litElement$ = !0, C.finalized = !0, (ut = x.litElementHydrateSupport) == null || ut.call(x, { LitElement: C });
const q = x.litElementPolyfillSupport;
q == null || q({ LitElement: C });
(x.litElementVersions ?? (x.litElementVersions = [])).push("4.2.2");
function m(n) {
  return !!n && n.break === !0;
}
function U(n) {
  return Math.min(1, Math.max(0, n));
}
function $t(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function D(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = U(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Wt(n) {
  if (!(n != null && n.bg)) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = $t(t);
  if (!e) return t;
  const i = typeof n.bg_alpha == "number" ? U(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function vt(n, t) {
  const e = [], i = Wt(n);
  return i && e.push(`background:${i}`), n != null && n.color && e.push(`color:${n.color}`), e.push(`border:${(n == null ? void 0 : n.border) ?? t}`), e.join(";") + ";";
}
function dt(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = $t(e);
    if (!i) return e;
    const s = U(t);
    return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
  }
  return e;
}
function wt(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
const I = class I extends C {
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
      highlight_current: !0,
      highlight_today_color: "rgba(0, 150, 255, 0.12)",
      highlight_current_color: "rgba(76, 175, 80, 0.18)",
      // NEU
      highlight_current_text: !1,
      highlight_current_text_color: "rgba(255, 255, 255, 0.95)",
      rows: [
        {
          time: "1. 08:00–08:45",
          start: "08:00",
          end: "08:45",
          cells: ["D", "M", "E", "D", "S"],
          cell_styles: [
            { bg: "#3b82f6", bg_alpha: 0.18, color: "#ffffff" },
            { bg: "#22c55e", bg_alpha: 0.18, color: "#ffffff" },
            null,
            null,
            { bg: "#a855f7", bg_alpha: 0.18, color: "#ffffff" }
          ]
        },
        {
          time: "2. 08:50–09:35",
          start: "08:50",
          end: "09:35",
          cells: ["M", "M", "D", "E", "S"],
          cell_styles: [null, null, null, null, null]
        },
        { break: !0, time: "09:35–09:55", label: "Pause" }
      ]
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  // IMPORTANT: defensiv, damit Picker/Preview stabil bleibt
  setConfig(t) {
    const e = I.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((r) => (r ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((r) => {
      if (m(r))
        return {
          break: !0,
          time: (r.time ?? "").toString(),
          label: (r.label ?? "Pause").toString()
        };
      const o = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], l = Array.from({ length: e.length }, (y, S) => (o[S] ?? "").toString()), a = Array.isArray(r == null ? void 0 : r.cell_styles) ? r.cell_styles : [], c = Array.from({ length: e.length }, (y, S) => D(a[S])), h = ((r == null ? void 0 : r.time) ?? "").toString(), d = wt(h), u = ((r == null ? void 0 : r.start) ?? "").toString().trim(), f = ((r == null ? void 0 : r.end) ?? "").toString().trim(), p = {
        time: h,
        start: u || d.start || void 0,
        end: f || d.end || void 0,
        cells: l
      };
      return c.some((y) => !!y) && (p.cell_styles = c), p;
    });
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      highlight_today_color: (t.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (t.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      // NEU
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "rgba(255, 255, 255, 0.95)").toString(),
      rows: s
    };
  }
  getTodayIndex() {
    const t = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }, e = (/* @__PURE__ */ new Date()).getDay();
    return t[e] ?? -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [e, i] = t.split(":").map((s) => Number(s));
    return [e, i].some((s) => Number.isNaN(s)) ? null : e * 60 + i;
  }
  isNowBetween(t, e) {
    const i = this.toMinutes(t), s = this.toMinutes(e);
    if (i == null || s == null) return !1;
    const r = /* @__PURE__ */ new Date(), o = r.getHours() * 60 + r.getMinutes();
    return o >= i && o < s;
  }
  render() {
    if (!this.config) return _``;
    const t = this.getTodayIndex(), e = "1px solid var(--divider-color)", i = dt(this.config.highlight_today_color ?? "", 0.12), s = dt(this.config.highlight_current_color ?? "", 0.18), r = (this.config.highlight_current_text_color ?? "").toString().trim();
    return _`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map((o, l) => {
      const a = this.config.highlight_today && l === t ? "today" : "";
      return _`<th class=${a} style=${`--sp-hl:${i};`}>${o}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${this.config.rows.map((o) => {
      if (m(o))
        return _`
                    <tr class="break">
                      <td class="time">${o.time}</td>
                      <td colspan=${this.config.days.length}>${o.label ?? ""}</td>
                    </tr>
                  `;
      const l = o, a = l.cells ?? [], c = l.cell_styles ?? [], h = !!this.config.highlight_current && !!l.start && !!l.end && this.isNowBetween(l.start, l.end);
      return _`
                  <tr>
                    <td
                      class="time"
                      style=${`--sp-hl:${s};` + (h ? "box-shadow: inset 0 0 0 9999px var(--sp-hl);" : "")}
                    >
                      ${l.time}
                    </td>

                    ${this.config.days.map((d, u) => {
        const f = a[u] ?? "", p = c[u] ?? null, y = this.config.highlight_today && u === t ? "today" : "";
        let S = `--sp-hl:${i};` + vt(p, e);
        return h && this.config.highlight_current_text && r && u === t && t >= 0 && (S += `color:${r};`), _`<td class=${y} style=${S}>${f}</td>`;
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
I.styles = gt`
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

    /* Heute – als Overlay, damit Zellfarben bleiben */
    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
let J = I;
const W = class W extends C {
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
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((r) => (r ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((r) => {
      if (m(r))
        return { break: !0, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() };
      const o = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], l = Array.from({ length: e.length }, (p, y) => (o[y] ?? "").toString()), a = Array.isArray(r == null ? void 0 : r.cell_styles) ? r.cell_styles : [], c = Array.from({ length: e.length }, (p, y) => D(a[y])), h = ((r == null ? void 0 : r.time) ?? "").toString(), d = wt(h), u = ((r == null ? void 0 : r.start) ?? "").toString().trim(), f = ((r == null ? void 0 : r.end) ?? "").toString().trim();
      return {
        time: h,
        start: u || d.start || void 0,
        end: f || d.end || void 0,
        cells: l,
        // im Editor immer vorhanden, damit bequem editierbar
        cell_styles: c
      };
    });
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      highlight_today_color: (t.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (t.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      // NEU
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "rgba(255, 255, 255, 0.95)").toString(),
      rows: s
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
    const e = t.split(",").map((s) => s.trim()).filter((s) => s.length), i = (this._config.rows ?? []).map((s) => {
      if (m(s)) return s;
      const r = s, o = Array.from({ length: e.length }, (a, c) => {
        var h;
        return (((h = r.cells) == null ? void 0 : h[c]) ?? "").toString();
      }), l = Array.from({ length: e.length }, (a, c) => {
        var h;
        return D((h = r.cell_styles) == null ? void 0 : h[c]);
      });
      return { ...r, cells: o, cell_styles: l };
    });
    this.emit({ ...this._config, days: e, rows: i });
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r === t ? { ...s, time: e } : s);
    this.emit({ ...this._config, rows: i });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || m(s) ? s : { ...s, start: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || m(s) ? s : { ...s, end: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || m(r)) return r;
      const l = r, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = i, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || m(r)) return r;
      const l = r, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), h = { ...a[e] ? { ...a[e] } : {}, ...i };
      return typeof h.bg_alpha == "number" && (h.bg_alpha = U(h.bg_alpha)), a[e] = D(h), { ...l, cell_styles: a };
    });
    this.emit({ ...this._config, rows: s });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t ? s : e ? { break: !0, time: s.time ?? "", label: s.label ?? "Pause" } : {
      time: s.time ?? "",
      start: void 0,
      end: void 0,
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    });
    this.emit({ ...this._config, rows: i });
  }
  updateBreakLabel(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r === t ? { ...s, label: e } : s);
    this.emit({ ...this._config, rows: i });
  }
  addLessonRow() {
    if (!this._config) return;
    const t = [
      ...this._config.rows,
      {
        time: "",
        start: "",
        end: "",
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
    const e = this._config.rows.filter((i, s) => s !== t);
    this.emit({ ...this._config, rows: e });
  }
  render() {
    return this._config ? _`
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

          <!-- NEU -->
          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current_text ?? !1}
              @change=${(t) => this.emit({ ...this._config, highlight_current_text: t.target.checked })}
            />
            <span>Aktuelles Fach (Textfarbe) hervorheben</span>
          </div>
        </div>

        <div class="row">
          <label>Highlight-Farbe (Heute)</label>
          <input
            type="text"
            .value=${this._config.highlight_today_color ?? "rgba(0, 150, 255, 0.12)"}
            placeholder='z.B. rgba(0,150,255,0.12) oder #0096ff'
            @input=${(t) => this.emit({ ...this._config, highlight_today_color: t.target.value })}
          />
        </div>

        <div class="row">
          <label>Highlight-Farbe (Aktuelle Stunde)</label>
          <input
            type="text"
            .value=${this._config.highlight_current_color ?? "rgba(76, 175, 80, 0.18)"}
            placeholder='z.B. rgba(76,175,80,0.18) oder #4caf50'
            @input=${(t) => this.emit({ ...this._config, highlight_current_color: t.target.value })}
          />
        </div>

        <!-- NEU -->
        <div class="row">
          <label>Textfarbe (Aktuelles Fach)</label>
          <input
            type="text"
            .value=${this._config.highlight_current_text_color ?? "rgba(255, 255, 255, 0.95)"}
            placeholder='z.B. #ff0000 oder rgba(255,0,0,0.95)'
            @input=${(t) => this.emit({ ...this._config, highlight_current_text_color: t.target.value })}
          />
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
      (t, e) => _`
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
                <input type="checkbox" .checked=${m(t)} @change=${(i) => this.toggleBreak(e, i.target.checked)} />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this.removeRow(e)}>Löschen</button>
              </div>
            </div>

            ${m(t) ? _`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${t.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(i) => this.updateBreakLabel(e, i.target.value)}
                    />
                  </div>
                ` : _`
                  <div class="timeGrid">
                    <div class="row">
                      <label>Start (HH:MM)</label>
                      <input
                        type="text"
                        .value=${t.start ?? ""}
                        placeholder="z.B. 07:45"
                        @input=${(i) => this.updateRowStart(e, i.target.value)}
                      />
                    </div>
                    <div class="row">
                      <label>Ende (HH:MM)</label>
                      <input
                        type="text"
                        .value=${t.end ?? ""}
                        placeholder="z.B. 08:30"
                        @input=${(i) => this.updateRowEnd(e, i.target.value)}
                      />
                    </div>
                  </div>

                  <div class="cellsGrid">
                    ${(this._config.days ?? []).map((i, s) => {
        var u, f;
        const r = t, o = (((u = r.cells) == null ? void 0 : u[s]) ?? "").toString(), l = ((f = r.cell_styles) == null ? void 0 : f[s]) ?? null, a = l != null && l.bg && l.bg.startsWith("#") ? l.bg : "#3b82f6", c = typeof (l == null ? void 0 : l.bg_alpha) == "number" ? U(l.bg_alpha) : 0.18, h = Math.round(c * 100), d = l != null && l.color && l.color.startsWith("#") ? l.color : "#ffffff";
        return _`
                        <div class="cellBox">
                          <div class="cellLabel">${i}</div>

                          <input
                            type="text"
                            class="cellInput"
                            .value=${o}
                            placeholder="Fach"
                            @input=${(p) => this.updateRowCell(e, s, p.target.value)}
                          />

                          <div class="styleGrid">
                            <div class="styleLine">
                              <div class="styleLabel">Hintergrund</div>
                              <input
                                type="color"
                                .value=${a}
                                @input=${(p) => this.updateCellStyle(e, s, { bg: p.target.value })}
                              />
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Transparenz</div>
                              <div class="rangeWrap">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  .value=${String(h)}
                                  @input=${(p) => this.updateCellStyle(e, s, { bg_alpha: Number(p.target.value) / 100 })}
                                />
                                <div class="styleHint">${h}%</div>
                              </div>
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Text</div>
                              <input
                                type="color"
                                .value=${d}
                                @input=${(p) => this.updateCellStyle(e, s, { color: p.target.value })}
                              />
                            </div>
                          </div>

                          <div class="preview" style=${vt(l, "1px solid var(--divider-color)")}>
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
    ` : _``;
  }
};
W.properties = {
  hass: {},
  _config: { state: !0 }
}, W.styles = gt`
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

    .timeGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
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
let K = W;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", J);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", K);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  J as StundenplanCard,
  K as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
