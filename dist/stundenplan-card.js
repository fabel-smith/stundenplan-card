/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, _t = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mt = Symbol(), vt = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = vt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && vt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ot = (a) => new Pt(typeof a == "string" ? a : a + "", void 0, mt), zt = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + a[r + 1], a[0]);
  return new Pt(e, a, mt);
}, Ut = (a, t) => {
  if (_t) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = Y.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, a.appendChild(i);
  }
}, bt = _t ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ot(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wt, defineProperty: Ft, getOwnPropertyDescriptor: It, getOwnPropertyNames: qt, getOwnPropertySymbols: Zt, getPrototypeOf: Kt } = Object, T = globalThis, yt = T.trustedTypes, Xt = yt ? yt.emptyScript : "", ot = T.reactiveElementPolyfillSupport, q = (a, t) => a, ht = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Xt : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch {
        e = null;
      }
  }
  return e;
} }, Ht = (a, t) => !Wt(a, t), wt = { attribute: !0, type: String, converter: ht, reflect: !1, useDefault: !1, hasChanged: Ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = wt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ft(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = It(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const c = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = Kt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const e = this.properties, i = [...qt(e), ...Zt(e)];
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
      for (const s of i) e.unshift(bt(s));
    } else t !== void 0 && e.push(bt(t));
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
    return Ut(t, this.constructor.elementStyles), t;
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
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : ht).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const c = i.getPropertyOptions(s), n = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : ht;
      this._$Em = s;
      const l = n.fromAttribute(e, c.type);
      this[s] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const c = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? Ht)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
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
        const { wrapped: c } = o, n = this[r];
        c !== !0 || this._$AL.has(r) || n === void 0 || this.C(r, void 0, o, n);
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[q("elementProperties")] = /* @__PURE__ */ new Map(), L[q("finalized")] = /* @__PURE__ */ new Map(), ot == null || ot({ ReactiveElement: L }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, $t = (a) => a, tt = Z.trustedTypes, xt = tt ? tt.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Nt = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, Lt = "?" + R, Vt = `<${Lt}>`, N = document, K = () => N.createComment(""), X = (a) => a === null || typeof a != "object" && typeof a != "function", ft = Array.isArray, jt = (a) => ft(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", at = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, St = /-->/g, kt = />/g, P = RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, Ct = /"/g, Bt = /^(?:script|style|textarea|title)$/i, Jt = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), p = Jt(1), O = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Et = /* @__PURE__ */ new WeakMap(), z = N.createTreeWalker(N, 129);
function Dt(a, t) {
  if (!ft(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xt !== void 0 ? xt.createHTML(t) : t;
}
const Gt = (a, t) => {
  const e = a.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = I;
  for (let c = 0; c < e; c++) {
    const n = a[c];
    let l, h, d = -1, u = 0;
    for (; u < n.length && (o.lastIndex = u, h = o.exec(n), h !== null); ) u = o.lastIndex, o === I ? h[1] === "!--" ? o = St : h[1] !== void 0 ? o = kt : h[2] !== void 0 ? (Bt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = P) : h[3] !== void 0 && (o = P) : o === P ? h[0] === ">" ? (o = s ?? I, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? P : h[3] === '"' ? Ct : At) : o === Ct || o === At ? o = P : o === St || o === kt ? o = I : (o = P, s = void 0);
    const g = o === P && a[c + 1].startsWith("/>") ? " " : "";
    r += o === I ? n + Vt : d >= 0 ? (i.push(l), n.slice(0, d) + Nt + n.slice(d) + R + g) : n + R + (d === -2 ? c : g);
  }
  return [Dt(a, r + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const c = t.length - 1, n = this.parts, [l, h] = Gt(t, e);
    if (this.el = V.createElement(l, i), z.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = z.nextNode()) !== null && n.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Nt)) {
          const u = h[o++], g = s.getAttribute(d).split(R), _ = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: r, name: _[2], strings: g, ctor: _[1] === "." ? Qt : _[1] === "?" ? te : _[1] === "@" ? ee : nt }), s.removeAttribute(d);
        } else d.startsWith(R) && (n.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Bt.test(s.tagName)) {
          const d = s.textContent.split(R), u = d.length - 1;
          if (u > 0) {
            s.textContent = tt ? tt.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(d[g], K()), z.nextNode(), n.push({ type: 2, index: ++r });
            s.append(d[u], K());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Lt) n.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(R, d + 1)) !== -1; ) n.push({ type: 7, index: r }), d += R.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = N.createElement("template");
    return i.innerHTML = t, i;
  }
}
function U(a, t, e = a, i) {
  var o, c;
  if (t === O) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = X(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((c = s == null ? void 0 : s._$AO) == null || c.call(s, !1), r === void 0 ? s = void 0 : (s = new r(a), s._$AT(a, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = U(a, s._$AS(a, t.values), s, i)), t;
}
class Yt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? N).importNode(e, !0);
    z.currentNode = s;
    let r = z.nextNode(), o = 0, c = 0, n = i[0];
    for (; n !== void 0; ) {
      if (o === n.index) {
        let l;
        n.type === 2 ? l = new j(r, r.nextSibling, this, t) : n.type === 1 ? l = new n.ctor(r, n.name, n.strings, this, t) : n.type === 6 && (l = new ie(r, this, t)), this._$AV.push(l), n = i[++c];
      }
      o !== (n == null ? void 0 : n.index) && (r = z.nextNode(), o++);
    }
    return z.currentNode = N, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = U(this, t, e), X(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && X(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = V.createElement(Dt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new Yt(s, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Et.get(t.strings);
    return e === void 0 && Et.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new j(this.O(K()), this.O(K()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = $t(t).nextSibling;
      $t(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = U(this, t, e, 0), o = !X(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const c = t;
      let n, l;
      for (t = r[0], n = 0; n < r.length - 1; n++) l = U(this, c[i + n], e, n), l === O && (l = this._$AH[n]), o || (o = !X(l) || l !== this._$AH[n]), l === f ? t = f : t !== f && (t += (l ?? "") + r[n + 1]), this._$AH[n] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qt extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class te extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ee extends nt {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = U(this, t, e, 0) ?? f) === O) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const lt = Z.litHtmlPolyfillSupport;
lt == null || lt(V, j), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.2");
const se = (a, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new j(t.insertBefore(K(), r), r, void 0, e ?? {});
  }
  return s._$AI(a), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
class B extends L {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
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
    return O;
  }
}
var Tt;
B._$litElement$ = !0, B.finalized = !0, (Tt = H.litElementHydrateSupport) == null || Tt.call(H, { LitElement: B });
const ct = H.litElementPolyfillSupport;
ct == null || ct({ LitElement: B });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
function S(a) {
  return !!a && a.break === !0;
}
function w(a) {
  return Math.min(1, Math.max(0, a));
}
function et(a) {
  if (!a) return null;
  const t = a.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function Q(a) {
  if (!a || typeof a != "object") return null;
  const t = {};
  return typeof a.bg == "string" && a.bg.trim() && (t.bg = a.bg.trim()), typeof a.color == "string" && a.color.trim() && (t.color = a.color.trim()), typeof a.border == "string" && a.border.trim() && (t.border = a.border.trim()), typeof a.bg_alpha == "number" && !Number.isNaN(a.bg_alpha) && (t.bg_alpha = w(a.bg_alpha)), Object.keys(t).length ? t : null;
}
function re(a) {
  if (!(a != null && a.bg)) return null;
  const t = a.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = et(t);
  if (!e) return t;
  const i = typeof a.bg_alpha == "number" ? w(a.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function ut(a, t) {
  const e = [], i = re(a);
  return i && e.push(`background:${i}`), a != null && a.color && e.push(`color:${a.color}`), e.push(`border:${(a == null ? void 0 : a.border) ?? t}`), e.join(";") + ";";
}
function Mt(a, t) {
  const e = (a ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = et(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${w(t)})` : e;
  }
  return e;
}
function D(a) {
  const e = (a ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function pt(a) {
  return (a ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ne(a) {
  switch (a) {
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
function Rt(a) {
  const t = new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const i = t.getUTCFullYear(), s = new Date(Date.UTC(i, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), o = new Date(s);
  o.setUTCDate(s.getUTCDate() + (4 - r));
  const c = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(c / (7 * 24 * 60 * 60 * 1e3)), isoYear: i };
}
function dt(a) {
  const t = (a ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function oe(a) {
  const t = (a ?? "").toString().trim();
  return t ? t === "-" || t === "–" || t === "---" : !0;
}
function ae(a) {
  const t = pt(a);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
async function le(a, t) {
  const e = `${a}${a.includes("?") ? "&" : "?"}_ts=${Date.now()}`, i = await (await fetch(e, { cache: "no-store" })).text(), s = new DOMParser().parseFromString(i, "text/xml"), r = Array.from(s.querySelectorAll("Kl")).find(
    (n) => {
      var l;
      return (((l = n.querySelector("Kurz")) == null ? void 0 : l.textContent) ?? "").trim().toLowerCase() === (t ?? "").trim().toLowerCase();
    }
  );
  if (!r) throw new Error(`Klasse "${t}" nicht gefunden`);
  const o = Array.from(r.querySelectorAll("Stunden > St")).map((n) => ({
    hour: parseInt((n.textContent ?? "0").trim(), 10),
    start: n.getAttribute("StZeit") ?? "",
    end: n.getAttribute("StZeitBis") ?? ""
  })).filter((n) => Number.isFinite(n.hour)).sort((n, l) => n.hour - l.hour), c = Array.from(r.querySelectorAll("Pl > Std")).map((n) => {
    var l, h, d, u, g, _, v;
    return {
      sw: (((l = n.querySelector("PlSw")) == null ? void 0 : l.textContent) ?? "").trim(),
      // 01 / 02 / 0102
      day: parseInt((((h = n.querySelector("PlTg")) == null ? void 0 : h.textContent) ?? "0").trim(), 10),
      hour: parseInt((((d = n.querySelector("PlSt")) == null ? void 0 : d.textContent) ?? "0").trim(), 10),
      subject: (((u = n.querySelector("PlFa")) == null ? void 0 : u.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      teacher: (((g = n.querySelector("PlLe")) == null ? void 0 : g.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      room: (((_ = n.querySelector("PlRa")) == null ? void 0 : _.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      week: (((v = n.querySelector("PlWo")) == null ? void 0 : v.textContent) ?? "").replace(/\u00a0/g, " ").trim().toUpperCase()
      // A/B/leer
    };
  });
  return { times: o, lessons: c };
}
const st = class st extends B {
  constructor() {
    super(...arguments), this._splanData = null, this._splanErr = null, this._splanLoading = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  connectedCallback() {
    super.connectedCallback(), this.reloadSplanIfNeeded(!0), this._tick = window.setInterval(() => {
      var t;
      this.requestUpdate(), (t = this.config) != null && t.splan_xml_enabled && Date.now() % (10 * 60 * 1e3) < 3e4 && this.reloadSplanIfNeeded(!1);
    }, 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  // Wenn Config geändert wird (URL/Klasse), neu laden
  updated(t) {
    super.updated(t), t.has("config") && this.reloadSplanIfNeeded(!0);
  }
  async reloadSplanIfNeeded(t) {
    const e = this.config;
    if (!e || !e.splan_xml_enabled) return;
    const i = (e.splan_xml_url ?? "").toString().trim(), s = (e.splan_class ?? "").toString().trim();
    if (!i || !s) {
      this._splanData = null, this._splanErr = "XML aktiv, aber URL oder Klasse fehlt.", this.requestUpdate();
      return;
    }
    if (!this._splanLoading && !(!t && this._splanData && !this._splanErr)) {
      this._splanLoading = !0, this._splanErr = null;
      try {
        const r = await le(i, s);
        this._splanData = r, this._splanErr = null;
      } catch (r) {
        this._splanData = null, this._splanErr = r != null && r.message ? String(r.message) : String(r);
      } finally {
        this._splanLoading = !1, this.requestUpdate();
      }
    }
  }
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
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
      source_attribute: "",
      source_time_key: "Stunde",
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
      // ✅ XML defaults
      splan_xml_enabled: !1,
      splan_xml_url: "/local/splan/sdaten/splank.xml",
      splan_class: "5a",
      splan_week: "auto",
      splan_show_room: !0,
      splan_show_teacher: !1,
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
  setConfig(t) {
    const e = st.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((l) => (l ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((l) => {
      if (S(l))
        return { break: !0, time: (l.time ?? "").toString(), label: (l.label ?? "Pause").toString() };
      const h = Array.isArray(l == null ? void 0 : l.cells) ? l.cells : [], d = Array.from({ length: e.length }, (x, y) => (h[y] ?? "").toString()), u = Array.isArray(l == null ? void 0 : l.cell_styles) ? l.cell_styles : [], g = Array.from({ length: e.length }, (x, y) => Q(u[y])), _ = ((l == null ? void 0 : l.time) ?? "").toString(), v = D(_), $ = ((l == null ? void 0 : l.start) ?? "").toString().trim(), k = ((l == null ? void 0 : l.end) ?? "").toString().trim(), C = {
        time: _,
        start: $ || v.start || void 0,
        end: k || v.end || void 0,
        cells: d
      };
      return g.some((x) => !!x) && (C.cell_styles = g), C;
    }), r = ((t.week_mode ?? "off") + "").toString().trim(), o = r === "kw_parity" || r === "week_map" || r === "off" ? r : "off", c = ((t.splan_week ?? "auto") + "").toString().trim().toLowerCase(), n = c === "a" ? "A" : c === "b" ? "B" : "auto";
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      highlight_breaks: t.highlight_breaks ?? !1,
      free_only_column_highlight: t.free_only_column_highlight ?? !0,
      highlight_today_color: (t.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (t.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: t.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (t.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (t.source_entity ?? "").toString(),
      source_attribute: (t.source_attribute ?? "").toString(),
      source_time_key: (t.source_time_key ?? "Stunde").toString(),
      week_mode: o,
      week_a_is_even_kw: t.week_a_is_even_kw ?? !0,
      week_map_entity: (t.week_map_entity ?? "").toString(),
      week_map_attribute: (t.week_map_attribute ?? "").toString(),
      source_entity_a: (t.source_entity_a ?? "").toString(),
      source_attribute_a: (t.source_attribute_a ?? "").toString(),
      source_entity_b: (t.source_entity_b ?? "").toString(),
      source_attribute_b: (t.source_attribute_b ?? "").toString(),
      splan_xml_enabled: t.splan_xml_enabled ?? !1,
      splan_xml_url: (t.splan_xml_url ?? "/local/splan/sdaten/splank.xml").toString(),
      splan_class: (t.splan_class ?? "5a").toString(),
      splan_week: n,
      splan_show_room: t.splan_show_room ?? !0,
      splan_show_teacher: t.splan_show_teacher ?? !1,
      rows: s
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(ne(e).map(pt));
    if (!i.size) return -1;
    const s = (t ?? []).map((r) => pt(r));
    for (let r = 0; r < s.length; r++) if (i.has(s[r])) return r;
    return -1;
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
    var c, n, l;
    const i = (t ?? "").toString().trim();
    if (!i || !((n = (c = this.hass) == null ? void 0 : c.states) != null && n[i])) return null;
    const s = this.hass.states[i], r = (e ?? "").toString().trim(), o = r ? (l = s.attributes) == null ? void 0 : l[r] : s.state;
    return this.parseAnyJson(o);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], s = (t.source_time_key ?? "Stunde").toString(), r = e.map((o) => {
      if ((o == null ? void 0 : o.break) === !0)
        return { break: !0, time: (o.time ?? o[s] ?? "").toString(), label: (o.label ?? "Pause").toString() };
      const c = ((o == null ? void 0 : o.time) ?? (o == null ? void 0 : o[s]) ?? "").toString(), n = D(c), l = Array.from({ length: i.length }, (d, u) => {
        const g = (i[u] ?? "").toString();
        return ((o == null ? void 0 : o[g]) ?? "").toString();
      });
      return { time: c, start: n.start, end: n.end, cells: l };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, i) {
    const s = this.readEntityJson(e, i);
    return Array.isArray(s) ? this.buildRowsFromArray(t, s) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = Rt(/* @__PURE__ */ new Date()), i = e % 2 === 0, s = !!t.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(e, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: o } = Rt(/* @__PURE__ */ new Date()), c = String(r), n = String(o);
    if (s != null && s[n] && typeof s[n] == "object") {
      const h = dt(s[n][c]);
      if (h) return h;
    }
    const l = dt(s == null ? void 0 : s[c]);
    return l || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    const e = this.getRowsFromSplanXml(t);
    if (e) return e;
    if (t.week_mode !== "off") {
      const s = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), o = (t.source_entity_b ?? "").trim(), c = (t.source_attribute_a ?? "").trim(), n = (t.source_attribute_b ?? "").trim();
      if (s === "A" && r) {
        const h = this.getRowsFromEntity(t, r, c);
        if (h) return h;
      }
      if (s === "B" && o) {
        const h = this.getRowsFromEntity(t, o, n);
        if (h) return h;
      }
      const l = (t.source_entity ?? "").trim();
      if (l) {
        const h = this.getRowsFromEntity(t, l, (t.source_attribute ?? "").trim());
        if (h) return h;
      }
      return t.rows ?? [];
    }
    const i = (t.source_entity ?? "").toString().trim();
    return i ? this.getRowsFromEntity(t, i, (t.source_attribute ?? "").toString().trim()) ?? t.rows ?? [] : t.rows ?? [];
  }
  getRowsFromSplanXml(t) {
    if (!t.splan_xml_enabled || !this._splanData) return null;
    const e = t.days ?? [], i = e.map((d) => ae(d)), s = !!t.splan_show_room, r = !!t.splan_show_teacher;
    let o = null;
    t.splan_week === "A" ? o = "A" : t.splan_week === "B" ? o = "B" : t.week_mode !== "off" ? o = this.getActiveWeek(t) : o = null;
    const c = (this._splanData.times ?? []).slice().sort((d, u) => d.hour - u.hour), n = Array.from(
      new Set((this._splanData.lessons ?? []).map((d) => d.hour).filter((d) => Number.isFinite(d)))
    ).sort((d, u) => d - u), l = c.length ? c.map((d) => d.hour) : n;
    return l.length ? l.map((d) => {
      const u = c.find((x) => x.hour === d), g = (u == null ? void 0 : u.start) ?? "", _ = (u == null ? void 0 : u.end) ?? "", v = `${d}.`, $ = g && _ ? `${v} ${g}–${_}` : `${v}`, k = e.map((x, y) => {
        const m = i[y];
        if (!m) return "";
        const M = (this._splanData.lessons ?? []).filter((b) => {
          if (b.hour !== d || b.day !== m) return !1;
          const A = dt(b.week);
          return !A || !o ? !0 : A === o;
        });
        if (!M.length) return "";
        const E = M.map((b) => {
          const A = (b.subject ?? "").trim(), F = (b.room ?? "").trim(), J = (b.teacher ?? "").trim(), G = [];
          return s && F && G.push(F), r && J && G.push(J), G.length ? `${A} (${G.join(" · ")})` : A;
        });
        return Array.from(new Set(E.filter((b) => b.trim().length > 0))).join(" / ");
      });
      return {
        time: $,
        start: g || void 0,
        end: _ || void 0,
        cells: k
      };
    }) : null;
  }
  render() {
    if (!this.config) return p``;
    const t = this.config, e = this.getRowsResolved(t), i = this.getTodayIndex(t.days ?? []), s = "1px solid var(--divider-color)", r = Mt(t.highlight_today_color ?? "", 0.12), o = Mt(t.highlight_current_color ?? "", 0.18), c = (t.highlight_current_text_color ?? "").toString().trim(), n = (t.highlight_current_time_text_color ?? "").toString().trim(), l = t.week_mode !== "off", h = l ? this.getActiveWeek(t) : null, d = t.splan_xml_enabled;
    return p`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${l ? p`<div class="weekBadge">Woche: <b>${h}</b></div>` : p``}

          ${d ? p`
                <div class="xmlBadge">
                  <div class="xmlLine">
                    <b>XML</b>
                    <span class="mono">${t.splan_class}</span>
                    <span class="mono">${t.splan_week === "auto" ? "auto" : t.splan_week}</span>
                    ${this._splanLoading ? p`<span class="pill">lädt…</span>` : p``}
                    ${this._splanErr ? p`<span class="pill err">Fehler</span>` : p``}
                  </div>
                  ${this._splanErr ? p`<div class="xmlErr">${this._splanErr}</div>` : p``}
                </div>
              ` : p``}

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((u, g) => {
      const _ = t.highlight_today && g === i ? "today" : "";
      return p`<th class=${_} style=${`--sp-hl:${r};`}>${u}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((u) => {
      if (S(u)) {
        const M = D(u.time), E = !!M.start && !!M.end && this.isNowBetween(M.start, M.end), W = !!t.highlight_current && !!t.highlight_breaks && E;
        let b = `--sp-hl:${o};`, A = "";
        return W && (b += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", A += `--sp-hl:${o}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), E && t.highlight_current_time_text && n && (b += `color:${n};`), p`
                    <tr class="break">
                      <td class="time" style=${b}>${u.time}</td>
                      <td colspan=${t.days.length} style=${A}>${u.label ?? ""}</td>
                    </tr>
                  `;
      }
      const g = u, _ = g.cells ?? [], v = g.cell_styles ?? [], $ = !!g.start && !!g.end && this.isNowBetween(g.start, g.end), k = i >= 0 ? _[i] ?? "" : "", C = i >= 0 ? oe(k) : !1, y = !(!!t.free_only_column_highlight && C);
      let m = `--sp-hl:${o};`;
      return y && t.highlight_current && $ && (m += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), y && $ && t.highlight_current_time_text && n && (m += `color:${n};`), p`
                  <tr>
                    <td class="time" style=${m}>${g.time}</td>

                    ${t.days.map((M, E) => {
        const W = _[E] ?? "", b = v[E] ?? null, A = t.highlight_today && E === i ? "today" : "";
        let F = `--sp-hl:${r};` + ut(b, s);
        const J = (W ?? "").toString().trim().length > 0;
        return y && J && $ && t.highlight_current_text && c && i >= 0 && E === i && (F += `color:${c};`), p`<td class=${A} style=${F}>${W}</td>`;
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
st.styles = zt`
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
    .weekBadge {
      margin: 0 0 10px 0;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      font-size: 13px;
      opacity: 0.95;
    }
    .xmlBadge {
      margin: 0 0 10px 0;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
      font-size: 13px;
      opacity: 0.95;
    }
    .xmlLine {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .pill {
      padding: 2px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      font-size: 12px;
      opacity: 0.9;
      background: var(--secondary-background-color);
    }
    .pill.err {
      background: rgba(255, 0, 0, 0.08);
    }
    .xmlErr {
      margin-top: 6px;
      font-size: 12px;
      opacity: 0.8;
      color: var(--error-color, #ff5252);
      word-break: break-word;
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
      vertical-align: middle;
      word-break: break-word;
    }
    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }
    .time {
      font-weight: 700;
      white-space: nowrap;
    }
    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }
    .break {
      font-style: italic;
      opacity: 0.75;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      opacity: 0.85;
      word-break: break-word;
    }
  `;
let it = st;
const rt = class rt extends B {
  constructor() {
    super(...arguments), this._ui = {
      openGeneral: !1,
      openHighlight: !1,
      openColors: !1,
      openSources: !1,
      openRows: !1,
      showCellStyles: !0,
      rowOpen: {}
      // default: empty => all closed
    };
  }
  setConfig(t) {
    const e = (((t == null ? void 0 : t.type) ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    const i = !!this._config;
    this._config = this.normalizeConfig(this.clone(t)), i || (this._ui.rowOpen = {});
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 }));
  }
  /* ---------- Row open state: keep indices stable on insert/remove ---------- */
  shiftRowOpenAfterInsert(t) {
    const e = {};
    for (const [i, s] of Object.entries(this._ui.rowOpen)) {
      const r = Number(i);
      Number.isNaN(r) || (e[r >= t ? r + 1 : r] = s);
    }
    this._ui.rowOpen = e;
  }
  shiftRowOpenAfterRemove(t) {
    const e = {};
    for (const [i, s] of Object.entries(this._ui.rowOpen)) {
      const r = Number(i);
      Number.isNaN(r) || r === t || (e[r > t ? r - 1 : r] = s);
    }
    this._ui.rowOpen = e;
  }
  /* ---------- Color helpers (Highlight colors) ---------- */
  rgbaFromHex(t, e) {
    const i = et(t);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${w(e)})` : `rgba(0,0,0,${w(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const s = (t ?? "").toString().trim();
    if (s.startsWith("#"))
      return et(s) ? { hex: s, alpha: w(i) } : { hex: e, alpha: w(i) };
    const r = s.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const c = Math.max(0, Math.min(255, Number(r[1]))), n = Math.max(0, Math.min(255, Number(r[2]))), l = Math.max(0, Math.min(255, Number(r[3]))), h = w(Number(r[4])), d = (u) => u.toString(16).padStart(2, "0");
      return { hex: `#${d(c)}${d(n)}${d(l)}`, alpha: h };
    }
    const o = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (o) {
      const c = Math.max(0, Math.min(255, Number(o[1]))), n = Math.max(0, Math.min(255, Number(o[2]))), l = Math.max(0, Math.min(255, Number(o[3]))), h = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${h(c)}${h(n)}${h(l)}`, alpha: w(i) };
    }
    return { hex: e, alpha: w(i) };
  }
  setHighlightRgba(t, e, i) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, i) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  /* ---------- Normalization ---------- */
  normalizeConfig(t) {
    const i = { ...it.getStubConfig(), ...t }, s = Array.isArray(i.days) && i.days.length ? i.days.map((d) => (d ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], o = (Array.isArray(i.rows) ? i.rows : []).map((d) => {
      if (S(d)) return { break: !0, time: (d.time ?? "").toString(), label: (d.label ?? "Pause").toString() };
      const u = Array.isArray(d == null ? void 0 : d.cells) ? d.cells : [], g = Array.from({ length: s.length }, (y, m) => (u[m] ?? "").toString()), _ = Array.isArray(d == null ? void 0 : d.cell_styles) ? d.cell_styles : [], v = Array.from({ length: s.length }, (y, m) => Q(_[m])), $ = ((d == null ? void 0 : d.time) ?? "").toString(), k = D($), C = ((d == null ? void 0 : d.start) ?? "").toString().trim(), x = ((d == null ? void 0 : d.end) ?? "").toString().trim();
      return {
        time: $,
        start: C || k.start || void 0,
        end: x || k.end || void 0,
        cells: g,
        cell_styles: v
      };
    }), c = ((i.week_mode ?? "off") + "").toString().trim(), n = c === "kw_parity" || c === "week_map" || c === "off" ? c : "off", l = ((i.splan_week ?? "auto") + "").toString().trim().toLowerCase(), h = l === "a" ? "A" : l === "b" ? "B" : "auto";
    return {
      type: (i.type ?? "custom:stundenplan-card").toString(),
      title: (i.title ?? "Mein Stundenplan").toString(),
      days: s,
      highlight_today: i.highlight_today ?? !0,
      highlight_current: i.highlight_current ?? !1,
      highlight_breaks: i.highlight_breaks ?? !1,
      free_only_column_highlight: i.free_only_column_highlight ?? !0,
      highlight_today_color: (i.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (i.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: i.highlight_current_text ?? !1,
      highlight_current_text_color: (i.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: i.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (i.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (i.source_entity ?? "").toString(),
      source_attribute: (i.source_attribute ?? "").toString(),
      source_time_key: (i.source_time_key ?? "Stunde").toString(),
      week_mode: n,
      week_a_is_even_kw: i.week_a_is_even_kw ?? !0,
      week_map_entity: (i.week_map_entity ?? "").toString(),
      week_map_attribute: (i.week_map_attribute ?? "").toString(),
      source_entity_a: (i.source_entity_a ?? "").toString(),
      source_attribute_a: (i.source_attribute_a ?? "").toString(),
      source_entity_b: (i.source_entity_b ?? "").toString(),
      source_attribute_b: (i.source_attribute_b ?? "").toString(),
      splan_xml_enabled: i.splan_xml_enabled ?? !1,
      splan_xml_url: (i.splan_xml_url ?? "/local/splan/sdaten/splank.xml").toString(),
      splan_class: (i.splan_class ?? "5a").toString(),
      splan_week: h,
      splan_show_room: i.splan_show_room ?? !0,
      splan_show_teacher: i.splan_show_teacher ?? !1,
      rows: o
    };
  }
  /* ---------- Editor: Basic config ---------- */
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((r) => r.trim()).filter((r) => r.length), i = (this._config.rows ?? []).map((r) => {
      if (S(r)) return r;
      const o = r, c = Array.from({ length: e.length }, (l, h) => {
        var d;
        return (((d = o.cells) == null ? void 0 : d[h]) ?? "").toString();
      }), n = Array.from({ length: e.length }, (l, h) => {
        var d;
        return Q((d = o.cell_styles) == null ? void 0 : d[h]);
      });
      return { ...o, cells: c, cell_styles: n };
    });
    this.emit({ ...this._config, days: e, rows: i });
    const s = {};
    Object.entries(this._ui.rowOpen).forEach(([r, o]) => {
      const c = Number(r);
      !Number.isNaN(c) && c >= 0 && c < i.length && (s[c] = o);
    }), this._ui.rowOpen = s;
  }
  /* ---------- Editor: Rows ---------- */
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => {
      if (r !== t) return s;
      if (S(s)) return { ...s, time: e };
      const o = s, c = D(o.time), n = D(e), l = (o.start ?? "").toString().trim(), h = (o.end ?? "").toString().trim(), d = !l || !!c.start && l === c.start, u = !h || !!c.end && h === c.end;
      return {
        ...o,
        time: e,
        start: d ? n.start ?? o.start : o.start,
        end: u ? n.end ?? o.end : o.end
      };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || S(s) ? s : { ...s, start: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || S(s) ? s : { ...s, end: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || S(r)) return r;
      const c = r, n = Array.isArray(c.cells) ? [...c.cells] : [];
      return n[e] = i, { ...c, cells: n };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || S(r)) return r;
      const c = r, n = Array.isArray(c.cell_styles) ? [...c.cell_styles] : Array.from({ length: this._config.days.length }, () => null), h = { ...n[e] ? { ...n[e] } : {}, ...i };
      return typeof h.bg_alpha == "number" && (h.bg_alpha = w(h.bg_alpha)), n[e] = Q(h), { ...c, cell_styles: n };
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
  addLessonRow(t) {
    if (!this._config) return;
    const e = {
      time: "",
      start: "",
      end: "",
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    }, i = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < i.length) {
      const s = t + 1;
      this.shiftRowOpenAfterInsert(s), i.splice(s, 0, e);
    } else
      i.push(e);
    this.emit({ ...this._config, rows: i });
  }
  addBreakRow(t) {
    if (!this._config) return;
    const e = { break: !0, time: "", label: "Pause" }, i = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < i.length) {
      const s = t + 1;
      this.shiftRowOpenAfterInsert(s), i.splice(s, 0, e);
    } else
      i.push(e);
    this.emit({ ...this._config, rows: i });
  }
  removeRow(t) {
    if (!this._config) return;
    const e = this._config.rows.filter((i, s) => s !== t);
    this.shiftRowOpenAfterRemove(t), this.emit({ ...this._config, rows: e });
  }
  async jumpToCell(t, e) {
    var r, o;
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((c) => requestAnimationFrame(() => c(null))), await new Promise((c) => requestAnimationFrame(() => c(null)));
    const i = `sp-cell-${t}-${e}`, s = (r = this.renderRoot) == null ? void 0 : r.getElementById(i);
    s && (s.scrollIntoView({ behavior: "smooth", block: "center" }), (o = s.focus) == null || o.call(s));
  }
  /* ---------- UI blocks ---------- */
  uiSwitch(t, e) {
    return p`
      <label class="switch">
        <input type="checkbox" .checked=${t} @change=${(i) => e(!!i.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }
  panel(t, e, i, s) {
    return p`
      <details class="panel" ?open=${e} @toggle=${(r) => i(!!r.target.open)}>
        <summary>
          <div class="panelTitle">${t}</div>
        </summary>
        <div class="panelBody">${s}</div>
      </details>
    `;
  }
  renderEditorPreview() {
    if (!this._config) return p``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], i = this._config.rows ?? [];
    return p`
      <div class="previewWrap">
        <div class="previewTop">
          <div>
            <div class="previewTitle">Vorschau</div>
            <div class="previewHint">Klick auf ein Fach springt zur passenden Zelle im Editor.</div>
          </div>
        </div>

        <table class="previewTable">
          <thead>
            <tr>
              <th class="p-time">Stunde</th>
              ${e.map((s) => p`<th>${s}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${i.map((s, r) => {
      if (S(s))
        return p`
                  <tr class="p-break">
                    <td class="p-time">${s.time}</td>
                    <td colspan=${e.length}>${s.label ?? ""}</td>
                  </tr>
                `;
      const o = s;
      return p`
                <tr>
                  <td class="p-time">${o.time}</td>
                  ${e.map((c, n) => {
        var d, u;
        const l = (((d = o.cells) == null ? void 0 : d[n]) ?? "").toString(), h = ((u = o.cell_styles) == null ? void 0 : u[n]) ?? null;
        return p`
                      <td
                        class="p-cell"
                        style=${ut(h, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(r, n)}
                      >
                        ${l}
                      </td>
                    `;
      })}
                </tr>
              `;
    })}
          </tbody>
        </table>
      </div>
    `;
  }
  renderGeneral() {
    return this._config ? p`
      <div class="grid2">
        <div class="field">
          <label class="lbl">Titel</label>
          <input class="in" type="text" .value=${this._config.title ?? ""} @input=${(t) => this.emit({ ...this._config, title: t.target.value })} />
        </div>

        <div class="field">
          <label class="lbl">Tage (Komma getrennt)</label>
          <input class="in" type="text" .value=${(this._config.days ?? []).join(", ")} @input=${(t) => this.setDaysFromString(t.target.value)} />
          <div class="sub">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>
      </div>
    ` : p``;
  }
  renderHighlighting() {
    if (!this._config) return p``;
    const t = this._config;
    return p`
      <div class="stack">
        <div class="optRow">
          <div>
            <div class="optTitle">Heute hervorheben</div>
            <div class="sub">Hintergrund für die heutige Spalte.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_today, (e) => this.emit({ ...t, highlight_today: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelle Stunde hervorheben</div>
            <div class="sub">Hintergrund in der Zeitspalte (Zeile bleibt neutral).</div>
          </div>
          ${this.uiSwitch(!!t.highlight_current, (e) => this.emit({ ...t, highlight_current: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Pausen als aktuell markieren</div>
            <div class="sub">Wenn die Pause „jetzt“ ist, wird sie wie eine aktuelle Stunde behandelt.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_breaks, (e) => this.emit({ ...t, highlight_breaks: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Freistunden: nur Tag hervorheben</div>
            <div class="sub">Unterdrückt „Aktuell“-Highlights, wenn die heutige Zelle in der aktuellen Stunde leer ist, oder "-" bzw. "---" eingetragen wird.</div>
          </div>
          ${this.uiSwitch(!!t.free_only_column_highlight, (e) => this.emit({ ...t, free_only_column_highlight: e }))}
        </div>

        <div class="divider"></div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelles Fach (Textfarbe)</div>
            <div class="sub">Nur am heutigen Tag, nur wenn Zelle nicht leer ist.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_current_text, (e) => this.emit({ ...t, highlight_current_text: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelle Stunde (Zeitspalte Textfarbe)</div>
            <div class="sub">Zusätzlich zur Zeitspalten-Hinterlegung.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_current_time_text, (e) => this.emit({ ...t, highlight_current_time_text: e }))}
        </div>
      </div>
    `;
  }
  colorRow(t, e, i, s, r, o) {
    const c = Math.round(w(i.alpha) * 100);
    return p`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${i.hex} @input=${(n) => s(n.target.value)} />
          <div class="range">
            <input type="range" min="0" max="100" .value=${String(c)} @input=${(n) => r(Number(n.target.value) / 100)} />
            <div class="pct">${c}%</div>
          </div>
        </div>

        <div class="mono">${o}</div>
      </div>
    `;
  }
  renderColors() {
    if (!this._config) return p``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), e = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return p`
      <div class="stack">
        ${this.colorRow(
      "Highlight-Farbe: Heute (Hintergrund)",
      "Spalten-Overlay für den aktuellen Wochentag.",
      t,
      (i) => this.setHighlightRgba("highlight_today_color", i, t.alpha),
      (i) => this.setHighlightRgba("highlight_today_color", t.hex, i),
      this._config.highlight_today_color
    )}

        ${this.colorRow(
      "Highlight-Farbe: Aktuelle Stunde (Hintergrund)",
      "Zeitspalten-Overlay (und optional Pausen).",
      e,
      (i) => this.setHighlightRgba("highlight_current_color", i, e.alpha),
      (i) => this.setHighlightRgba("highlight_current_color", e.hex, i),
      this._config.highlight_current_color
    )}

        <div class="divider"></div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">Textfarbe: Aktuelles Fach</label>
            <div class="inRow">
              <input class="col" type="color" .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()} @input=${(i) => this.setHighlightHexOnly("highlight_current_text_color", i.target.value)} />
              <input class="in" type="text" .value=${this._config.highlight_current_text_color ?? "#ff1744"} @input=${(i) => this.emit({ ...this._config, highlight_current_text_color: i.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Textfarbe: Zeitspalte (aktuelle Stunde)</label>
            <div class="inRow">
              <input class="col" type="color" .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()} @input=${(i) => this.setHighlightHexOnly("highlight_current_time_text_color", i.target.value)} />
              <input class="in" type="text" .value=${this._config.highlight_current_time_text_color ?? "#ff9100"} @input=${(i) => this.emit({ ...this._config, highlight_current_time_text_color: i.target.value })} />
            </div>
          </div>
        </div>

        <div class="sub">
          Tipp: Du kannst auch <span class="mono">rgb()/rgba()</span> oder <span class="mono">var(--...)</span> Werte direkt in YAML setzen – der Editor hält es kompatibel.
        </div>
      </div>
    `;
  }
  renderSources() {
    if (!this._config) return p``;
    const t = this._config, e = !!t.splan_xml_enabled, i = (n) => n ? "opacity:0.55; filter:grayscale(0.1);" : "", s = (n) => n ? p`<div class="sub" style="margin-top:8px;">
            XML ist aktiv – die folgenden Quellen werden nur genutzt, wenn XML deaktiviert ist.
          </div>` : p``, r = e && !(t.splan_xml_url ?? "").toString().trim(), o = e && !(t.splan_class ?? "").toString().trim(), c = r || o;
    return p`
      <div class="stack">
        <div class="sub">
          Wähle, woher der Stundenplan kommt. Wenn <b>Stundenplan24 (XML)</b> aktiv ist, hat diese Quelle <b>Priorität</b>.
          Andernfalls werden <b>Entity</b> oder <b>manuelle Zeilen</b> verwendet.
        </div>

        <!-- ✅ Stundenplan24 XML -->
        <div class="panelMinor">
          <div class="minorTitle">✅ Stundenplan24 (XML)</div>

          <div class="optRow">
            <div>
              <div class="optTitle">Stundenplan24 verwenden</div>
              <div class="sub">Lädt den Plan automatisch aus deiner XML-Datei unter <span class="mono">/local/...</span>.</div>
            </div>
            ${this.uiSwitch(!!t.splan_xml_enabled, (n) => this.emit({ ...t, splan_xml_enabled: n }))}
          </div>

          ${e ? p`
                <div class="grid2">
                  <div class="field">
                    <label class="lbl">XML-URL</label>
                    <input
                      class="in"
                      type="text"
                      .value=${t.splan_xml_url ?? ""}
                      placeholder="/local/splan/sdaten/splank.xml"
                      @input=${(n) => this.emit({ ...t, splan_xml_url: n.target.value })}
                    />
                    <div class="sub">
                      Wichtig: In Home Assistant immer <span class="mono">/local/...</span> verwenden (entspricht <span class="mono">/config/www/</span>).
                    </div>
                    ${r ? p`<div class="sub" style="color:var(--error-color,#ff5252);">XML-URL fehlt.</div>` : p``}
                  </div>

                  <div class="field">
                    <label class="lbl">Klasse (Kurz)</label>
                    <input
                      class="in"
                      type="text"
                      .value=${t.splan_class ?? ""}
                      placeholder="z.B. 5b"
                      @input=${(n) => this.emit({ ...t, splan_class: n.target.value })}
                    />
                    <div class="sub">
                      Muss exakt so in der XML stehen, z.B. <span class="mono">&lt;Kurz&gt;5b&lt;/Kurz&gt;</span>.
                    </div>
                    ${o ? p`<div class="sub" style="color:var(--error-color,#ff5252);">Klasse fehlt.</div>` : p``}
                  </div>
                </div>

                <div class="grid2">
                  <div class="field">
                    <label class="lbl">Woche (XML)</label>
                    <select class="in" .value=${t.splan_week ?? "auto"} @change=${(n) => this.emit({ ...t, splan_week: n.target.value })}>
                      <option value="auto">auto (nutzt week_mode, sonst alle)</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                    </select>
                    <div class="sub">Wenn im XML keine Woche steht: gilt immer.</div>
                  </div>

                  <div class="field">
                    <label class="lbl">Anzeige</label>

                    <div class="optRow" style="padding:8px 10px;">
                      <div>
                        <div class="optTitle">Raum anzeigen</div>
                        <div class="sub">z.B. Mathe (R101)</div>
                      </div>
                      ${this.uiSwitch(!!t.splan_show_room, (n) => this.emit({ ...t, splan_show_room: n }))}
                    </div>

                    <div class="optRow" style="padding:8px 10px; margin-top:8px;">
                      <div>
                        <div class="optTitle">Lehrer anzeigen</div>
                        <div class="sub">z.B. Mathe (R101 · MU)</div>
                      </div>
                      ${this.uiSwitch(!!t.splan_show_teacher, (n) => this.emit({ ...t, splan_show_teacher: n }))}
                    </div>
                  </div>
                </div>

                ${c ? p`<div class="sub" style="color:var(--error-color,#ff5252);">
                      XML ist aktiv, aber es fehlen Pflichtfelder (URL/Klasse). Dadurch kann nicht geladen werden.
                    </div>` : p``}
              ` : p`<div class="sub">XML ist deaktiviert – es wird die Fallback-Quelle genutzt.</div>`}
        </div>

        <!-- 🔁 Fallback-Hinweis -->
        <div class="panelMinor" style=${i(e)}>
          <div class="minorTitle">🔁 Fallback (wenn XML deaktiviert ist)</div>

          <div class="sub">
            Wenn Stundenplan24 <b>aus</b> ist, nimmt die Karte Daten in dieser Reihenfolge:
            <br />
            1) <b>Wechselwochen A/B</b> (falls <span class="mono">week_mode</span> aktiv)
            <br />
            2) <b>Single Entity</b> (falls gesetzt)
            <br />
            3) <b>Manuelle Zeilen</b> (<span class="mono">rows</span>)
          </div>

          ${s(e)}
        </div>

        <!-- 📅 Wechselwochen -->
        <div class="panelMinor" style=${i(e)}>
          <div class="minorTitle">📅 Wechselwochen (A/B)</div>

          <div class="field">
            <label class="lbl">week_mode</label>
            <select class="in" .value=${t.week_mode ?? "off"} @change=${(n) => this.emit({ ...t, week_mode: n.target.value })} ?disabled=${e}>
              <option value="off">off (deaktiviert)</option>
              <option value="kw_parity">kw_parity (gerade/ungerade ISO-KW)</option>
              <option value="week_map">week_map (Mapping-Entity, Fallback Parität)</option>
            </select>
            <div class="sub">
              Steuert A/B-Wochen. Wird auch für XML-Woche <span class="mono">auto</span> genutzt (wenn gesetzt).
            </div>
          </div>

          <div class="optRow">
            <div>
              <div class="optTitle">A-Woche = gerade Kalenderwoche</div>
              <div class="sub">Wenn deaktiviert: A-Woche = ungerade KW.</div>
            </div>
            ${this.uiSwitch(!!t.week_a_is_even_kw, (n) => this.emit({ ...t, week_a_is_even_kw: n }))}
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">week_map_entity (optional)</label>
              <input class="in" type="text" .value=${t.week_map_entity ?? ""} placeholder="z.B. sensor.wechselwochen_map" @input=${(n) => this.emit({ ...t, week_map_entity: n.target.value })} ?disabled=${e} />
            </div>

            <div class="field">
              <label class="lbl">week_map_attribute</label>
              <input class="in" type="text" .value=${t.week_map_attribute ?? ""} placeholder="z.B. map (leer = state)" @input=${(n) => this.emit({ ...t, week_map_attribute: n.target.value })} ?disabled=${e} />
            </div>
          </div>

          <div class="sub">
            Mapping-Format: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span>
          </div>

          <div class="divider"></div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity_a</label>
              <input class="in" type="text" .value=${t.source_entity_a ?? ""} placeholder="z.B. sensor.stundenplan_a" @input=${(n) => this.emit({ ...t, source_entity_a: n.target.value })} ?disabled=${e} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_a</label>
              <input class="in" type="text" .value=${t.source_attribute_a ?? ""} placeholder="z.B. plan" @input=${(n) => this.emit({ ...t, source_attribute_a: n.target.value })} ?disabled=${e} />
            </div>

            <div class="field">
              <label class="lbl">source_entity_b</label>
              <input class="in" type="text" .value=${t.source_entity_b ?? ""} placeholder="z.B. sensor.stundenplan_b" @input=${(n) => this.emit({ ...t, source_entity_b: n.target.value })} ?disabled=${e} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_b</label>
              <input class="in" type="text" .value=${t.source_attribute_b ?? ""} placeholder="z.B. plan" @input=${(n) => this.emit({ ...t, source_attribute_b: n.target.value })} ?disabled=${e} />
            </div>
          </div>

          ${s(e)}
        </div>

        <!-- 🧩 Single Entity -->
        <div class="panelMinor" style=${i(e)}>
          <div class="minorTitle">🧩 Entity (Single / Legacy)</div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity</label>
              <input class="in" type="text" .value=${t.source_entity ?? ""} placeholder="z.B. sensor.stundenplan" @input=${(n) => this.emit({ ...t, source_entity: n.target.value })} ?disabled=${e} />
            </div>

            <div class="field">
              <label class="lbl">source_attribute</label>
              <input class="in" type="text" .value=${t.source_attribute ?? ""} placeholder="z.B. plan (leer = state)" @input=${(n) => this.emit({ ...t, source_attribute: n.target.value })} ?disabled=${e} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">source_time_key</label>
            <input class="in" type="text" .value=${t.source_time_key ?? "Stunde"} placeholder='Default: "Stunde"' @input=${(n) => this.emit({ ...t, source_time_key: n.target.value })} ?disabled=${e} />
          </div>

          ${s(e)}
        </div>
      </div>
    `;
  }
  renderRows() {
    if (!this._config) return p``;
    const t = this._config, e = t.days ?? [];
    return p`
      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan (Zeilen)</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Cell-Styles</div>
            ${this.uiSwitch(!!this._ui.showCellStyles, (i) => {
      this._ui.showCellStyles = i, this.requestUpdate();
    })}
          </div>

          <button class="btn" @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button class="btn" @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">
        Pro Zeile: Zeit + optional Start/Ende. Per Klick in der Vorschau springst du zur passenden Zelle.
        <br />
        Hinweis: Wenn XML aktiv ist, werden diese Zeilen nur als Fallback genutzt.
      </div>

      ${t.rows.map((i, s) => {
      const r = S(i), o = r ? `Pause · ${i.time ?? ""}` : `Stunde · ${i.time ?? ""}`, c = r ? i.label ?? "Pause" : "", n = i;
      return p`
          <details
            class="rowPanel"
            ?open=${this._ui.rowOpen[s] ?? !1}
            @toggle=${(l) => this._ui.rowOpen[s] = !!l.target.open}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${o || `Zeile ${s + 1}`}</div>
                <div class="rowHeadMeta">${r ? c : `${(n.start ?? "") || "Start?"} – ${(n.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${i.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(l) => this.updateRowTime(s, l.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(r, (l) => this.toggleBreak(s, l))}
                  </div>
                </div>
              </div>

              ${r ? p`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${i.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(l) => this.updateBreakLabel(s, l.target.value)} />
                    </div>
                  ` : p`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${n.start ?? ""} placeholder="z.B. 07:45" @input=${(l) => this.updateRowStart(s, l.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${n.end ?? ""} placeholder="z.B. 08:30" @input=${(l) => this.updateRowEnd(s, l.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((l, h) => {
        var x, y;
        const d = (((x = n.cells) == null ? void 0 : x[h]) ?? "").toString(), u = ((y = n.cell_styles) == null ? void 0 : y[h]) ?? null, g = u != null && u.bg && u.bg.startsWith("#") ? u.bg : "#3b82f6", _ = typeof (u == null ? void 0 : u.bg_alpha) == "number" ? w(u.bg_alpha) : 0.18, v = Math.round(_ * 100), $ = u != null && u.color && u.color.startsWith("#") ? u.color : "#ffffff", k = `sp-cell-${s}-${h}`, C = ut(u, "1px solid var(--divider-color)");
        return p`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${l}</div>
                              <div class="cellMiniPreview" style=${C} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${k} class="in" type="text" .value=${d} placeholder="Fach" @input=${(m) => this.updateRowCell(s, h, m.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${g} @input=${(m) => this.updateCellStyle(s, h, { bg: m.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String(v)}
                                    @input=${(m) => this.updateCellStyle(s, h, {
          bg_alpha: Number(m.target.value) / 100
        })}
                                  />
                                  <div class="pct">${v}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${$} @input=${(m) => this.updateCellStyle(s, h, { color: m.target.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowActions">
                <button class="btn" @click=${() => this.addLessonRow(s)}>+ Stunde darunter</button>
                <button class="btn" @click=${() => this.addBreakRow(s)}>+ Pause darunter</button>
                <button class="btn danger" @click=${() => this.removeRow(s)}>Löschen</button>
              </div>
            </div>
          </details>
        `;
    })}
    `;
  }
  render() {
    return this._config ? p`
      ${this.renderEditorPreview()}

      ${this.panel("Allgemein", this._ui.openGeneral, (t) => this._ui.openGeneral = t, this.renderGeneral())}

      ${this.panel("Highlights", this._ui.openHighlight, (t) => this._ui.openHighlight = t, this.renderHighlighting())}

      ${this.panel("Farben", this._ui.openColors, (t) => this._ui.openColors = t, this.renderColors())}

      ${this.panel("Datenquellen", this._ui.openSources, (t) => this._ui.openSources = t, this.renderSources())}

      ${this.panel("Zeilen & Fächer", this._ui.openRows, (t) => this._ui.openRows = t, this.renderRows())}
    ` : p``;
  }
};
rt.properties = {
  hass: {},
  _config: { state: !0 }
}, rt.styles = zt`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 0;
    }

    /* ---------- Preview ---------- */
    .previewWrap {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 14px;
      background: var(--card-background-color);
    }
    .previewTop {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;
    }
    .previewTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }
    .previewHint {
      margin-top: 2px;
      font-size: 12px;
      opacity: 0.7;
    }
    .previewTable {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .previewTable th,
    .previewTable td {
      border: 1px solid var(--divider-color);
      padding: 6px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
    .previewTable th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }
    .p-time {
      font-weight: 700;
      white-space: nowrap;
      width: 110px;
    }
    .p-break {
      font-style: italic;
      opacity: 0.8;
    }
    .p-cell {
      cursor: pointer;
      user-select: none;
    }
    .p-cell:hover {
      filter: brightness(1.06);
    }

    /* ---------- Panels (Accordion) ---------- */
    .panel {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--card-background-color);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .panel summary {
      list-style: none;
      cursor: pointer;
      padding: 12px 12px;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      user-select: none;
    }
    .panel summary::-webkit-details-marker {
      display: none;
    }
    .panelTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }
    .panelBody {
      padding: 12px;
    }

    /* ---------- Layout helpers ---------- */
    .stack {
      display: grid;
      gap: 12px;
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 800px) {
      .grid2 {
        grid-template-columns: 1fr;
      }
    }
    .field {
      display: grid;
      gap: 6px;
    }
    .lbl {
      font-size: 13px;
      opacity: 0.85;
    }
    .sub {
      font-size: 12px;
      opacity: 0.7;
      line-height: 1.35;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      opacity: 0.85;
      word-break: break-word;
    }
    .divider {
      height: 1px;
      background: var(--divider-color);
      opacity: 0.55;
      margin: 2px 0;
    }

    /* ---------- Inputs / Buttons ---------- */
    .in {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      outline: none;
    }
    .in:focus {
      box-shadow: 0 0 0 2px rgba(100, 160, 255, 0.25);
    }
    .inRow {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 10px;
      align-items: center;
    }
    .btnBar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
    }
    .toggleInline {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--secondary-background-color);
    }
    .toggleText {
      font-size: 12px;
      font-weight: 700;
      opacity: 0.85;
      white-space: nowrap;
    }

    .btn {
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn:hover {
      filter: brightness(1.05);
    }
    .btn.danger {
      background: rgba(255, 0, 0, 0.08);
    }
    select.in {
      padding: 10px;
    }

    /* ---------- Switch (robust) ---------- */
    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 26px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(120, 120, 120, 0.35);
      transition: 0.2s;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--card-background-color);
      transition: 0.2s;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }
    .switch input:checked + .slider {
      background: rgba(90, 160, 255, 0.45);
    }
    .switch input:checked + .slider:before {
      transform: translate(18px, -50%);
    }

    /* ---------- Highlight option rows ---------- */
    .optRow {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
    }
    .optTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.9;
      margin-bottom: 2px;
    }

    /* ---------- Colors ---------- */
    .colorRow {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      display: grid;
      gap: 10px;
      background: rgba(255, 255, 255, 0.02);
    }
    .colorControls {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 10px;
      align-items: center;
    }
    .col {
      width: 44px;
      height: 34px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--card-background-color);
      cursor: pointer;
      box-sizing: border-box;
    }
    .range {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
    }
    .pct {
      min-width: 44px;
      text-align: right;
      font-size: 12px;
      opacity: 0.75;
    }

    /* ---------- Data sources minor panels ---------- */
    .panelMinor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.02);
      display: grid;
      gap: 10px;
    }
    .minorTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.9;
    }

    /* ---------- Rows ---------- */
    .rowsTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    .rowsTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }

    .rowPanel {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--card-background-color);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .rowPanel summary {
      list-style: none;
      cursor: pointer;
      padding: 12px;
      background: var(--secondary-background-color);
      user-select: none;
    }
    .rowPanel summary::-webkit-details-marker {
      display: none;
    }
    .rowHead {
      display: grid;
      gap: 4px;
    }
    .rowHeadTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.95;
    }
    .rowHeadMeta {
      font-size: 12px;
      opacity: 0.7;
    }
    .rowBody {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .rowActions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .cellsGrid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
    .cell {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.02);
      display: grid;
      gap: 8px;
    }
    .cellTop {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
    }
    .cellDay {
      font-size: 12px;
      opacity: 0.75;
      font-weight: 700;
    }
    .cellMiniPreview {
      border-radius: 10px;
      padding: 6px 8px;
      font-size: 12px;
      opacity: 0.9;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cellStyles {
      display: grid;
      gap: 10px;
      margin-top: 2px;
    }
    .cellStyles[hidden] {
      display: none;
    }
    .styleLine {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 10px;
      align-items: center;
    }
    .styleLbl {
      font-size: 12px;
      opacity: 0.75;
    }
    input[type="range"] {
      width: 100%;
    }
  `;
let gt = rt;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", it);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", gt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + XML (Stundenplan24)",
  preview: !0
});
export {
  it as StundenplanCard,
  gt as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
