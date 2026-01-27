/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, at = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lt = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let Ct = class {
  constructor(t, i, e) {
    if (this._$cssResult$ = !0, e !== lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (at && t === void 0) {
      const e = i !== void 0 && i.length === 1;
      e && (t = dt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && dt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bt = (o) => new Ct(typeof o == "string" ? o : o + "", void 0, lt), Mt = (o, ...t) => {
  const i = o.length === 1 ? o[0] : t.reduce((e, r, s) => e + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[s + 1], o[0]);
  return new Ct(i, o, lt);
}, Ut = (o, t) => {
  if (at) o.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const e = document.createElement("style"), r = J.litNonce;
    r !== void 0 && e.setAttribute("nonce", r), e.textContent = i.cssText, o.appendChild(e);
  }
}, gt = at ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const e of t.cssRules) i += e.cssText;
  return Bt(i);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Dt, defineProperty: Ot, getOwnPropertyDescriptor: Wt, getOwnPropertyNames: Lt, getOwnPropertySymbols: Ft, getPrototypeOf: It } = Object, k = globalThis, pt = k.trustedTypes, Vt = pt ? pt.emptyScript : "", tt = k.reactiveElementPolyfillSupport, O = (o, t) => o, st = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Vt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let i = o;
  switch (t) {
    case Boolean:
      i = o !== null;
      break;
    case Number:
      i = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(o);
      } catch {
        i = null;
      }
  }
  return i;
} }, Ht = (o, t) => !Dt(o, t), _t = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = _t) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const e = Symbol(), r = this.getPropertyDescriptor(t, e, i);
      r !== void 0 && Ot(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, e) {
    const { get: r, set: s } = Wt(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: r, set(n) {
      const a = r == null ? void 0 : r.call(this);
      s == null || s.call(this, n), this.requestUpdate(t, a, e);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = It(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const i = this.properties, e = [...Lt(i), ...Ft(i)];
      for (const r of e) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [e, r] of i) this.elementProperties.set(e, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, e] of this.elementProperties) {
      const r = this._$Eu(i, e);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const e = new Set(t.flat(1 / 0).reverse());
      for (const r of e) i.unshift(gt(r));
    } else t !== void 0 && i.push(gt(t));
    return i;
  }
  static _$Eu(t, i) {
    const e = i.attribute;
    return e === !1 ? void 0 : typeof e == "string" ? e : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((i) => i(this));
  }
  addController(t) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$EO) == null || i.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const e of i.keys()) this.hasOwnProperty(e) && (t.set(e, this[e]), delete this[e]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ut(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var e;
      return (e = i.hostConnected) == null ? void 0 : e.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var e;
      return (e = i.hostDisconnected) == null ? void 0 : e.call(i);
    });
  }
  attributeChangedCallback(t, i, e) {
    this._$AK(t, e);
  }
  _$ET(t, i) {
    var s;
    const e = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, e);
    if (r !== void 0 && e.reflect === !0) {
      const n = (((s = e.converter) == null ? void 0 : s.toAttribute) !== void 0 ? e.converter : st).toAttribute(i, e.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var s, n;
    const e = this.constructor, r = e._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = e.getPropertyOptions(r), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : st;
      this._$Em = r;
      const l = c.fromAttribute(i, a.type);
      this[r] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, e, r = !1, s) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (s = this[t]), e ?? (e = a.getPropertyOptions(t)), !((e.hasChanged ?? Ht)(s, i) || e.useDefault && e.reflect && s === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, e)))) return;
      this.C(t, i, e);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: e, reflect: r, wrapped: s }, n) {
    e && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), s !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || e || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) {
        const { wrapped: a } = n, c = this[s];
        a !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, n, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$EO) == null || e.forEach((r) => {
        var s;
        return (s = r.hostUpdate) == null ? void 0 : s.call(r);
      }), this.update(i)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((e) => {
      var r;
      return (r = e.hostUpdated) == null ? void 0 : r.call(e);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[O("elementProperties")] = /* @__PURE__ */ new Map(), P[O("finalized")] = /* @__PURE__ */ new Map(), tt == null || tt({ ReactiveElement: P }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, mt = (o) => o, Z = W.trustedTypes, ft = Z ? Z.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Tt = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Pt = "?" + x, Kt = `<${Pt}>`, H = document, L = () => H.createComment(""), F = (o) => o === null || typeof o != "object" && typeof o != "function", ct = Array.isArray, Jt = (o) => ct(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", et = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, bt = />/g, E = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vt = /'/g, $t = /"/g, Rt = /^(?:script|style|textarea|title)$/i, Gt = (o) => (t, ...i) => ({ _$litType$: o, strings: t, values: i }), p = Gt(1), z = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), C = H.createTreeWalker(H, 129);
function Nt(o, t) {
  if (!ct(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(t) : t;
}
const Zt = (o, t) => {
  const i = o.length - 1, e = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = D;
  for (let a = 0; a < i; a++) {
    const c = o[a];
    let l, u, h = -1, d = 0;
    for (; d < c.length && (n.lastIndex = d, u = n.exec(c), u !== null); ) d = n.lastIndex, n === D ? u[1] === "!--" ? n = yt : u[1] !== void 0 ? n = bt : u[2] !== void 0 ? (Rt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = E) : u[3] !== void 0 && (n = E) : n === E ? u[0] === ">" ? (n = r ?? D, h = -1) : u[1] === void 0 ? h = -2 : (h = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? E : u[3] === '"' ? $t : vt) : n === $t || n === vt ? n = E : n === yt || n === bt ? n = D : (n = E, r = void 0);
    const g = n === E && o[a + 1].startsWith("/>") ? " " : "";
    s += n === D ? c + Kt : h >= 0 ? (e.push(l), c.slice(0, h) + Tt + c.slice(h) + x + g) : c + x + (h === -2 ? a : g);
  }
  return [Nt(o, s + (o[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), e];
};
class I {
  constructor({ strings: t, _$litType$: i }, e) {
    let r;
    this.parts = [];
    let s = 0, n = 0;
    const a = t.length - 1, c = this.parts, [l, u] = Zt(t, i);
    if (this.el = I.createElement(l, e), C.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = C.nextNode()) !== null && c.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Tt)) {
          const d = u[n++], g = r.getAttribute(h).split(x), m = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: s, name: m[2], strings: g, ctor: m[1] === "." ? Yt : m[1] === "?" ? jt : m[1] === "@" ? Qt : X }), r.removeAttribute(h);
        } else h.startsWith(x) && (c.push({ type: 6, index: s }), r.removeAttribute(h));
        if (Rt.test(r.tagName)) {
          const h = r.textContent.split(x), d = h.length - 1;
          if (d > 0) {
            r.textContent = Z ? Z.emptyScript : "";
            for (let g = 0; g < d; g++) r.append(h[g], L()), C.nextNode(), c.push({ type: 2, index: ++s });
            r.append(h[d], L());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Pt) c.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(x, h + 1)) !== -1; ) c.push({ type: 7, index: s }), h += x.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const e = H.createElement("template");
    return e.innerHTML = t, e;
  }
}
function B(o, t, i = o, e) {
  var n, a;
  if (t === z) return t;
  let r = e !== void 0 ? (n = i._$Co) == null ? void 0 : n[e] : i._$Cl;
  const s = F(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), s === void 0 ? r = void 0 : (r = new s(o), r._$AT(o, i, e)), e !== void 0 ? (i._$Co ?? (i._$Co = []))[e] = r : i._$Cl = r), r !== void 0 && (t = B(o, r._$AS(o, t.values), r, e)), t;
}
class qt {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: e } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? H).importNode(i, !0);
    C.currentNode = r;
    let s = C.nextNode(), n = 0, a = 0, c = e[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let l;
        c.type === 2 ? l = new V(s, s.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (l = new Xt(s, this, t)), this._$AV.push(l), c = e[++a];
      }
      n !== (c == null ? void 0 : c.index) && (s = C.nextNode(), n++);
    }
    return C.currentNode = H, r;
  }
  p(t) {
    let i = 0;
    for (const e of this._$AV) e !== void 0 && (e.strings !== void 0 ? (e._$AI(t, e, i), i += e.strings.length - 2) : e._$AI(t[i])), i++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, e, r) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = e, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = B(this, t, i), F(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: i, _$litType$: e } = t, r = typeof e == "number" ? this._$AC(t) : (e.el === void 0 && (e.el = I.createElement(Nt(e.h, e.h[0]), this.options)), e);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(i);
    else {
      const n = new qt(r, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = wt.get(t.strings);
    return i === void 0 && wt.set(t.strings, i = new I(t)), i;
  }
  k(t) {
    ct(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let e, r = 0;
    for (const s of t) r === i.length ? i.push(e = new V(this.O(L()), this.O(L()), this, this.options)) : e = i[r], e._$AI(s), r++;
    r < i.length && (this._$AR(e && e._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var e;
    for ((e = this._$AP) == null ? void 0 : e.call(this, !1, !0, i); t !== this._$AB; ) {
      const r = mt(t).nextSibling;
      mt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, e, r, s) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String()), this.strings = e) : this._$AH = _;
  }
  _$AI(t, i = this, e, r) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = B(this, t, i, 0), n = !F(t) || t !== this._$AH && t !== z, n && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = s[0], c = 0; c < s.length - 1; c++) l = B(this, a[e + c], i, c), l === z && (l = this._$AH[c]), n || (n = !F(l) || l !== this._$AH[c]), l === _ ? t = _ : t !== _ && (t += (l ?? "") + s[c + 1]), this._$AH[c] = l;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class jt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class Qt extends X {
  constructor(t, i, e, r, s) {
    super(t, i, e, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = B(this, t, i, 0) ?? _) === z) return;
    const e = this._$AH, r = t === _ && e !== _ || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, s = t !== _ && (e === _ || r);
    r && this.element.removeEventListener(this.name, this, e), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xt {
  constructor(t, i, e) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = e;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const it = W.litHtmlPolyfillSupport;
it == null || it(I, V), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.2");
const te = (o, t, i) => {
  const e = (i == null ? void 0 : i.renderBefore) ?? t;
  let r = e._$litPart$;
  if (r === void 0) {
    const s = (i == null ? void 0 : i.renderBefore) ?? null;
    e._$litPart$ = r = new V(t.insertBefore(L(), s), s, void 0, i ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
class R extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = te(i, this.renderRoot, this.renderOptions);
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
    return z;
  }
}
var Et;
R._$litElement$ = !0, R.finalized = !0, (Et = M.litElementHydrateSupport) == null || Et.call(M, { LitElement: R });
const rt = M.litElementPolyfillSupport;
rt == null || rt({ LitElement: R });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
function y(o) {
  return !!o && o.break === !0;
}
function b(o) {
  return Math.min(1, Math.max(0, o));
}
function q(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), e = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return [i, e, r].some((s) => Number.isNaN(s)) ? null : { r: i, g: e, b: r };
}
function G(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = b(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function ee(o) {
  if (!(o != null && o.bg)) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = q(t);
  if (!i) return t;
  const e = typeof o.bg_alpha == "number" ? b(o.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${e})`;
}
function nt(o, t) {
  const i = [], e = ee(o);
  return e && i.push(`background:${e}`), o != null && o.color && i.push(`color:${o.color}`), i.push(`border:${(o == null ? void 0 : o.border) ?? t}`), i.join(";") + ";";
}
function xt(o, t) {
  const i = (o ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const e = q(i);
    if (!e) return i;
    const r = b(t);
    return `rgba(${e.r}, ${e.g}, ${e.b}, ${r})`;
  }
  return i;
}
function N(o) {
  const i = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return i ? { start: i[1], end: i[2] } : {};
}
function kt(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ie(o) {
  switch (o) {
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
function St(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const e = t.getUTCFullYear(), r = new Date(Date.UTC(e, 0, 1)), s = r.getUTCDay() === 0 ? 7 : r.getUTCDay(), n = new Date(r);
  n.setUTCDate(r.getUTCDate() + (4 - s));
  const a = t.getTime() - n.getTime();
  return { isoWeek: 1 + Math.round(a / (7 * 24 * 60 * 60 * 1e3)), isoYear: e };
}
function At(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function re(o) {
  const t = (o ?? "").toString().trim();
  return t ? t === "-" || t === "–" || t === "---" : !0;
}
function se(o, t) {
  const i = Array.isArray(o == null ? void 0 : o.cells) ? o.cells : [];
  for (let e = 0; e < t; e++)
    if (!re(i[e])) return !1;
  return !0;
}
const j = class j extends R {
  getGridOptions() {
    return { columns: "full" };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => this.requestUpdate(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      highlight_today: !0,
      highlight_current: !0,
      // NEU
      highlight_breaks: !1,
      // NEU (UPDATE 6)
      free_only_column_highlight: !0,
      highlight_today_color: "rgba(0, 150, 255, 0.12)",
      highlight_current_color: "rgba(76, 175, 80, 0.18)",
      highlight_current_text: !1,
      highlight_current_text_color: "#ff1744",
      highlight_current_time_text: !1,
      highlight_current_time_text_color: "#ff9100",
      // Legacy Single-Source
      source_entity: "",
      source_attribute: "",
      source_time_key: "Stunde",
      // Wechselwochen Defaults
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
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
    const i = j.getStubConfig(), e = (((t == null ? void 0 : t.type) ?? i.type) + "").toString();
    if (!(e === "custom:stundenplan-card" || e === "stundenplan-card")) {
      this.config = this.normalizeConfig(i);
      return;
    }
    this.config = this.normalizeConfig({
      ...i,
      ...t,
      type: e
    });
  }
  getCardSize() {
    var i, e;
    const t = ((e = (i = this.config) == null ? void 0 : i.rows) == null ? void 0 : e.length) ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const i = Array.isArray(t.days) && t.days.length ? t.days.map((a) => (a ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((a) => {
      if (y(a))
        return {
          break: !0,
          time: (a.time ?? "").toString(),
          label: (a.label ?? "Pause").toString()
        };
      const c = Array.isArray(a == null ? void 0 : a.cells) ? a.cells : [], l = Array.from({ length: i.length }, (f, w) => (c[w] ?? "").toString()), u = Array.isArray(a == null ? void 0 : a.cell_styles) ? a.cell_styles : [], h = Array.from({ length: i.length }, (f, w) => G(u[w])), d = ((a == null ? void 0 : a.time) ?? "").toString(), g = N(d), m = ((a == null ? void 0 : a.start) ?? "").toString().trim(), v = ((a == null ? void 0 : a.end) ?? "").toString().trim(), $ = {
        time: d,
        start: m || g.start || void 0,
        end: v || g.end || void 0,
        cells: l
      };
      return h.some((f) => !!f) && ($.cell_styles = h), $;
    }), s = ((t.week_mode ?? "off") + "").toString().trim(), n = s === "kw_parity" || s === "week_map" || s === "off" ? s : "off";
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: i,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      // NEU
      highlight_breaks: t.highlight_breaks ?? !1,
      // NEU (UPDATE 6)
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
      week_mode: n,
      week_a_is_even_kw: t.week_a_is_even_kw ?? !0,
      week_map_entity: (t.week_map_entity ?? "").toString(),
      week_map_attribute: (t.week_map_attribute ?? "").toString(),
      source_entity_a: (t.source_entity_a ?? "").toString(),
      source_attribute_a: (t.source_attribute_a ?? "").toString(),
      source_entity_b: (t.source_entity_b ?? "").toString(),
      source_attribute_b: (t.source_attribute_b ?? "").toString(),
      rows: r
    };
  }
  getTodayIndex(t) {
    const i = (/* @__PURE__ */ new Date()).getDay(), e = new Set(ie(i).map(kt));
    if (!e.size) return -1;
    const r = (t ?? []).map((s) => kt(s));
    for (let s = 0; s < r.length; s++)
      if (e.has(r[s])) return s;
    return -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [i, e] = t.split(":").map((r) => Number(r));
    return [i, e].some((r) => Number.isNaN(r)) ? null : i * 60 + e;
  }
  isNowBetween(t, i) {
    const e = this.toMinutes(t), r = this.toMinutes(i);
    if (e == null || r == null) return !1;
    const s = /* @__PURE__ */ new Date(), n = s.getHours() * 60 + s.getMinutes();
    return n >= e && n < r;
  }
  parseAnyJson(t) {
    if (t == null) return null;
    if (typeof t == "string") {
      const i = t.trim();
      if (!i) return null;
      try {
        return JSON.parse(i);
      } catch {
        return null;
      }
    }
    return t;
  }
  readEntityJson(t, i) {
    var a, c, l;
    const e = (t ?? "").toString().trim();
    if (!e || !((c = (a = this.hass) == null ? void 0 : a.states) != null && c[e])) return null;
    const r = this.hass.states[e], s = (i ?? "").toString().trim(), n = s ? (l = r.attributes) == null ? void 0 : l[s] : r.state;
    return this.parseAnyJson(n);
  }
  buildRowsFromArray(t, i) {
    if (!Array.isArray(i)) return null;
    const e = t.days ?? [], r = (t.source_time_key ?? "Stunde").toString(), s = i.map((n) => {
      if ((n == null ? void 0 : n.break) === !0)
        return {
          break: !0,
          time: (n.time ?? n[r] ?? "").toString(),
          label: (n.label ?? "Pause").toString()
        };
      const a = ((n == null ? void 0 : n.time) ?? (n == null ? void 0 : n[r]) ?? "").toString(), c = N(a), l = Array.from({ length: e.length }, (h, d) => {
        const g = (e[d] ?? "").toString();
        return ((n == null ? void 0 : n[g]) ?? "").toString();
      });
      return {
        time: a,
        start: c.start,
        end: c.end,
        cells: l
      };
    });
    return s.length ? s : null;
  }
  getRowsFromEntity(t, i, e) {
    const r = this.readEntityJson(i, e);
    return Array.isArray(r) ? this.buildRowsFromArray(t, r) : null;
  }
  weekFromParity(t) {
    const { isoWeek: i } = St(/* @__PURE__ */ new Date()), e = i % 2 === 0, r = !!t.week_a_is_even_kw;
    return e === r ? "A" : "B";
  }
  weekFromMap(t) {
    const i = (t.week_map_entity ?? "").toString().trim();
    if (!i) return null;
    const e = (t.week_map_attribute ?? "").toString().trim(), r = this.readEntityJson(i, e);
    if (!r || typeof r != "object") return null;
    const { isoWeek: s, isoYear: n } = St(/* @__PURE__ */ new Date()), a = String(s), c = String(n);
    if (r != null && r[c] && typeof r[c] == "object") {
      const u = At(r[c][a]);
      if (u) return u;
    }
    const l = At(r == null ? void 0 : r[a]);
    return l || null;
  }
  getActiveWeek(t) {
    if (t.week_mode === "week_map") {
      const i = this.weekFromMap(t);
      return i || this.weekFromParity(t);
    }
    return t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    if (t.week_mode !== "off") {
      const e = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), s = (t.source_entity_b ?? "").trim(), n = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (e === "A" && r) {
        const l = this.getRowsFromEntity(t, r, n);
        if (l) return l;
      }
      if (e === "B" && s) {
        const l = this.getRowsFromEntity(t, s, a);
        if (l) return l;
      }
      const c = (t.source_entity ?? "").trim();
      if (c) {
        const l = this.getRowsFromEntity(t, c, (t.source_attribute ?? "").trim());
        if (l) return l;
      }
      return t.rows ?? [];
    }
    const i = (t.source_entity ?? "").toString().trim();
    if (i) {
      const e = this.getRowsFromEntity(t, i, (t.source_attribute ?? "").toString().trim());
      if (e) return e;
    }
    return t.rows ?? [];
  }
  render() {
    if (!this.config) return p``;
    const t = this.config, i = this.getRowsResolved(t), e = this.getTodayIndex(t.days ?? []), r = "1px solid var(--divider-color)", s = xt(t.highlight_today_color ?? "", 0.12), n = xt(t.highlight_current_color ?? "", 0.18), a = (t.highlight_current_text_color ?? "").toString().trim(), c = (t.highlight_current_time_text_color ?? "").toString().trim(), l = t.week_mode !== "off", u = l ? this.getActiveWeek(t) : null;
    return p`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${l ? p`<div class="weekBadge">Woche: <b>${u}</b></div>` : p``}

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((h, d) => {
      const g = t.highlight_today && d === e ? "today" : "";
      return p`<th class=${g} style=${`--sp-hl:${s};`}>${h}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${i.map((h) => {
      if (y(h)) {
        const U = N(h.time), A = !!U.start && !!U.end && this.isNowBetween(U.start, U.end);
        let T = `--sp-hl:${n};`, K = "";
        return !!t.highlight_current && !!t.highlight_breaks && A && (T += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", K += `--sp-hl:${n}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), A && t.highlight_current_time_text && c && (T += `color:${c};`), p`
                    <tr class="break">
                      <td class="time" style=${T}>${h.time}</td>
                      <td colspan=${t.days.length} style=${K}>${h.label ?? ""}</td>
                    </tr>
                  `;
      }
      const d = h, g = d.cells ?? [], m = d.cell_styles ?? [], v = !!d.start && !!d.end && this.isNowBetween(d.start, d.end), $ = se(d, (t.days ?? []).length), w = !(!!t.free_only_column_highlight && $);
      let S = `--sp-hl:${n};`;
      return w && t.highlight_current && v && (S += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), w && v && t.highlight_current_time_text && c && (S += `color:${c};`), p`
                  <tr>
                    <td class="time" style=${S}>${d.time}</td>

                    ${t.days.map((U, A) => {
        const T = g[A] ?? "", K = m[A] ?? null, ht = t.highlight_today && A === e ? "today" : "";
        let ut = `--sp-hl:${s};` + nt(K, r);
        const zt = (T ?? "").toString().trim().length > 0;
        return w && zt && v && t.highlight_current_text && a && e >= 0 && A === e && (ut += `color:${a};`), p`<td class=${ht} style=${ut}>${T}</td>`;
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
j.styles = Mt`
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

    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
let Y = j;
const Q = class Q extends R {
  setConfig(t) {
    const i = (((t == null ? void 0 : t.type) ?? "") + "").toString();
    if (i !== "custom:stundenplan-card" && i !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${i}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  rgbaFromHex(t, i) {
    const e = q(t);
    return e ? `rgba(${e.r}, ${e.g}, ${e.b}, ${b(i)})` : `rgba(0,0,0,${b(i)})`;
  }
  parseColorToHexAlpha(t, i, e) {
    const r = (t ?? "").toString().trim();
    if (r.startsWith("#"))
      return q(r) ? { hex: r, alpha: b(e) } : { hex: i, alpha: b(e) };
    const s = r.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (s) {
      const a = Math.max(0, Math.min(255, Number(s[1]))), c = Math.max(0, Math.min(255, Number(s[2]))), l = Math.max(0, Math.min(255, Number(s[3]))), u = b(Number(s[4])), h = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${h(a)}${h(c)}${h(l)}`, alpha: u };
    }
    const n = r.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (n) {
      const a = Math.max(0, Math.min(255, Number(n[1]))), c = Math.max(0, Math.min(255, Number(n[2]))), l = Math.max(0, Math.min(255, Number(n[3]))), u = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${u(a)}${u(c)}${u(l)}`, alpha: b(e) };
    }
    return { hex: i, alpha: b(e) };
  }
  setHighlightRgba(t, i, e) {
    if (!this._config) return;
    const r = this.rgbaFromHex(i, e);
    this.emit({ ...this._config, [t]: r });
  }
  setHighlightHexOnly(t, i) {
    this._config && this.emit({ ...this._config, [t]: i });
  }
  normalizeConfig(t) {
    const e = { ...Y.getStubConfig(), ...t }, r = Array.isArray(e.days) && e.days.length ? e.days.map((l) => (l ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(e.rows) ? e.rows : []).map((l) => {
      if (y(l))
        return { break: !0, time: (l.time ?? "").toString(), label: (l.label ?? "Pause").toString() };
      const u = Array.isArray(l == null ? void 0 : l.cells) ? l.cells : [], h = Array.from({ length: r.length }, (w, S) => (u[S] ?? "").toString()), d = Array.isArray(l == null ? void 0 : l.cell_styles) ? l.cell_styles : [], g = Array.from({ length: r.length }, (w, S) => G(d[S])), m = ((l == null ? void 0 : l.time) ?? "").toString(), v = N(m), $ = ((l == null ? void 0 : l.start) ?? "").toString().trim(), f = ((l == null ? void 0 : l.end) ?? "").toString().trim();
      return {
        time: m,
        start: $ || v.start || void 0,
        end: f || v.end || void 0,
        cells: h,
        cell_styles: g
      };
    }), a = ((e.week_mode ?? "off") + "").toString().trim(), c = a === "kw_parity" || a === "week_map" || a === "off" ? a : "off";
    return {
      type: (e.type ?? "custom:stundenplan-card").toString(),
      title: (e.title ?? "Mein Stundenplan").toString(),
      days: r,
      highlight_today: e.highlight_today ?? !0,
      highlight_current: e.highlight_current ?? !1,
      // NEU
      highlight_breaks: e.highlight_breaks ?? !1,
      // NEU (UPDATE 6)
      free_only_column_highlight: e.free_only_column_highlight ?? !0,
      highlight_today_color: (e.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (e.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: e.highlight_current_text ?? !1,
      highlight_current_text_color: (e.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: e.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (e.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (e.source_entity ?? "").toString(),
      source_attribute: (e.source_attribute ?? "").toString(),
      source_time_key: (e.source_time_key ?? "Stunde").toString(),
      week_mode: c,
      week_a_is_even_kw: e.week_a_is_even_kw ?? !0,
      week_map_entity: (e.week_map_entity ?? "").toString(),
      week_map_attribute: (e.week_map_attribute ?? "").toString(),
      source_entity_a: (e.source_entity_a ?? "").toString(),
      source_attribute_a: (e.source_attribute_a ?? "").toString(),
      source_entity_b: (e.source_entity_b ?? "").toString(),
      source_attribute_b: (e.source_attribute_b ?? "").toString(),
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
    const i = t.split(",").map((r) => r.trim()).filter((r) => r.length), e = (this._config.rows ?? []).map((r) => {
      if (y(r)) return r;
      const s = r, n = Array.from({ length: i.length }, (c, l) => {
        var u;
        return (((u = s.cells) == null ? void 0 : u[l]) ?? "").toString();
      }), a = Array.from({ length: i.length }, (c, l) => {
        var u;
        return G((u = s.cell_styles) == null ? void 0 : u[l]);
      });
      return { ...s, cells: n, cell_styles: a };
    });
    this.emit({ ...this._config, days: i, rows: e });
  }
  updateRowTime(t, i) {
    if (!this._config) return;
    const e = this._config.rows.map((r, s) => {
      if (s !== t) return r;
      if (y(r)) return { ...r, time: i };
      const n = r, a = N(n.time), c = N(i), l = (n.start ?? "").toString().trim(), u = (n.end ?? "").toString().trim(), h = !l || !!a.start && l === a.start, d = !u || !!a.end && u === a.end;
      return {
        ...n,
        time: i,
        start: h ? c.start ?? n.start : n.start,
        end: d ? c.end ?? n.end : n.end
      };
    });
    this.emit({ ...this._config, rows: e });
  }
  updateRowStart(t, i) {
    if (!this._config) return;
    const e = this._config.rows.map((r, s) => s !== t || y(r) ? r : { ...r, start: i || void 0 });
    this.emit({ ...this._config, rows: e });
  }
  updateRowEnd(t, i) {
    if (!this._config) return;
    const e = this._config.rows.map((r, s) => s !== t || y(r) ? r : { ...r, end: i || void 0 });
    this.emit({ ...this._config, rows: e });
  }
  updateRowCell(t, i, e) {
    if (!this._config) return;
    const r = this._config.rows.map((s, n) => {
      if (n !== t || y(s)) return s;
      const a = s, c = Array.isArray(a.cells) ? [...a.cells] : [];
      return c[i] = e, { ...a, cells: c };
    });
    this.emit({ ...this._config, rows: r });
  }
  updateCellStyle(t, i, e) {
    if (!this._config) return;
    const r = this._config.rows.map((s, n) => {
      if (n !== t || y(s)) return s;
      const a = s, c = Array.isArray(a.cell_styles) ? [...a.cell_styles] : Array.from({ length: this._config.days.length }, () => null), u = { ...c[i] ? { ...c[i] } : {}, ...e };
      return typeof u.bg_alpha == "number" && (u.bg_alpha = b(u.bg_alpha)), c[i] = G(u), { ...a, cell_styles: c };
    });
    this.emit({ ...this._config, rows: r });
  }
  toggleBreak(t, i) {
    if (!this._config) return;
    const e = this._config.rows.map((r, s) => s !== t ? r : i ? { break: !0, time: r.time ?? "", label: r.label ?? "Pause" } : {
      time: r.time ?? "",
      start: void 0,
      end: void 0,
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    });
    this.emit({ ...this._config, rows: e });
  }
  updateBreakLabel(t, i) {
    if (!this._config) return;
    const e = this._config.rows.map((r, s) => s === t ? { ...r, label: i } : r);
    this.emit({ ...this._config, rows: e });
  }
  addLessonRow(t) {
    if (!this._config) return;
    const i = {
      time: "",
      start: "",
      end: "",
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    }, e = [...this._config.rows];
    typeof t == "number" && t >= 0 && t < e.length ? e.splice(t + 1, 0, i) : e.push(i), this.emit({ ...this._config, rows: e });
  }
  addBreakRow(t) {
    if (!this._config) return;
    const i = { break: !0, time: "", label: "Pause" }, e = [...this._config.rows];
    typeof t == "number" && t >= 0 && t < e.length ? e.splice(t + 1, 0, i) : e.push(i), this.emit({ ...this._config, rows: e });
  }
  removeRow(t) {
    if (!this._config) return;
    const i = this._config.rows.filter((e, r) => r !== t);
    this.emit({ ...this._config, rows: i });
  }
  jumpToCell(t, i) {
    var s, n;
    const e = `sp-cell-${t}-${i}`, r = (s = this.renderRoot) == null ? void 0 : s.getElementById(e);
    r && (r.scrollIntoView({ behavior: "smooth", block: "center" }), (n = r.focus) == null || n.call(r));
  }
  renderEditorPreview() {
    if (!this._config) return p``;
    const t = "1px solid var(--divider-color)", i = this._config.days ?? [], e = this._config.rows ?? [];
    return p`
      <div class="editorPreview">
        <div class="editorPreviewTitle">Vorschau</div>

        <table class="previewTable">
          <thead>
            <tr>
              <th class="p-time">Stunde</th>
              ${i.map((r) => p`<th>${r}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${e.map((r, s) => {
      if (y(r))
        return p`
                  <tr class="p-break">
                    <td class="p-time">${r.time}</td>
                    <td colspan=${i.length}>${r.label ?? ""}</td>
                  </tr>
                `;
      const n = r;
      return p`
                <tr>
                  <td class="p-time">${n.time}</td>
                  ${i.map((a, c) => {
        var h, d;
        const l = (((h = n.cells) == null ? void 0 : h[c]) ?? "").toString(), u = ((d = n.cell_styles) == null ? void 0 : d[c]) ?? null;
        return p`
                      <td
                        class="p-cell"
                        style=${nt(u, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(s, c)}
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

        <div class="editorPreviewHint">Tipp: Klick auf ein Fach springt zur passenden Zelle.</div>
      </div>
    `;
  }
  render() {
    if (!this._config) return p``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), i = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return p`
      ${this.renderEditorPreview()}

      <div class="section">
        <div class="row">
          <label>Titel</label>
          <input type="text" .value=${this._config.title ?? ""} @input=${(e) => this.emit({ ...this._config, title: e.target.value })} />
        </div>

        <div class="row">
          <label>Tage (Komma getrennt)</label>
          <input type="text" .value=${(this._config.days ?? []).join(", ")} @input=${(e) => this.setDaysFromString(e.target.value)} />
          <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>

<div class="row">
  <label>Optionen</label>

  <!-- Hintergrund-Highlights -->
  <div class="checkboxLine">
    <input
      type="checkbox"
      .checked=${this._config.highlight_today ?? !0}
      @change=${(e) => this.emit({ ...this._config, highlight_today: e.target.checked })}
    />
    <span>Heute hervorheben (Hintergrund – ganze Spalte)</span>
  </div>

  <div class="checkboxLine">
    <input
      type="checkbox"
      .checked=${this._config.highlight_current ?? !1}
      @change=${(e) => this.emit({ ...this._config, highlight_current: e.target.checked })}
    />
    <span>Aktuelle Stunde hervorheben (Hintergrund – Zeitspalte)</span>
  </div>

  <div class="checkboxLine">
    <input
      type="checkbox"
      .checked=${this._config.highlight_breaks ?? !1}
      @change=${(e) => this.emit({ ...this._config, highlight_breaks: e.target.checked })}
    />
    <span>Pausen als aktuell markieren (Hintergrund)</span>
  </div>

  <div class="checkboxLine">
    <input
      type="checkbox"
      .checked=${this._config.free_only_column_highlight ?? !0}
      @change=${(e) => this.emit({ ...this._config, free_only_column_highlight: e.target.checked })}
    />
    <span>Freistunden: nur Tag hervorheben (Hintergrund – Spalte)</span>
  </div>

  <hr style="opacity:0.2; margin:10px 0;" />

  <!-- Text-Highlights -->
  <div class="checkboxLine">
    <input
      type="checkbox"
      .checked=${this._config.highlight_current_text ?? !1}
      @change=${(e) => this.emit({ ...this._config, highlight_current_text: e.target.checked })}
    />
    <span>Aktuelles Fach hervorheben (Textfarbe)</span>
  </div>

  <div class="checkboxLine">
    <input
      type="checkbox"
      .checked=${this._config.highlight_current_time_text ?? !1}
      @change=${(e) => this.emit({ ...this._config, highlight_current_time_text: e.target.checked })}
    />
    <span>Aktuelle Stunde hervorheben (Textfarbe – Zeitspalte)</span>
  </div>
</div>




        <div class="row">
          <label>Highlight-Farbe (Heute)</label>
          <div class="pickerRow">
            <input type="color" .value=${t.hex} @input=${(e) => this.setHighlightRgba("highlight_today_color", e.target.value, t.alpha)} />
            <div class="rangeWrap">
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(t.alpha * 100))}
                @input=${(e) => this.setHighlightRgba("highlight_today_color", t.hex, Number(e.target.value) / 100)}
              />
              <div class="styleHint">${Math.round(t.alpha * 100)}%</div>
            </div>
          </div>
          <div class="hint">${this._config.highlight_today_color}</div>
        </div>

        <div class="row">
          <label>Highlight-Farbe (Aktuelle Stunde)</label>
          <div class="pickerRow">
            <input type="color" .value=${i.hex} @input=${(e) => this.setHighlightRgba("highlight_current_color", e.target.value, i.alpha)} />
            <div class="rangeWrap">
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(i.alpha * 100))}
                @input=${(e) => this.setHighlightRgba("highlight_current_color", i.hex, Number(e.target.value) / 100)}
              />
              <div class="styleHint">${Math.round(i.alpha * 100)}%</div>
            </div>
          </div>
          <div class="hint">${this._config.highlight_current_color}</div>
        </div>

        <div class="row">
          <label>Textfarbe (Aktuelles Fach)</label>
          <div class="pickerRow">
            <input type="color" .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()} @input=${(e) => this.setHighlightHexOnly("highlight_current_text_color", e.target.value)} />
            <input type="text" .value=${this._config.highlight_current_text_color ?? "#ff1744"} @input=${(e) => this.emit({ ...this._config, highlight_current_text_color: e.target.value })} />
          </div>
        </div>

        <div class="row">
          <label>Textfarbe (Aktuelle Stunde / Zeitspalte)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()}
              @input=${(e) => this.setHighlightHexOnly("highlight_current_time_text_color", e.target.value)}
            />
            <input
              type="text"
              .value=${this._config.highlight_current_time_text_color ?? "#ff9100"}
              @input=${(e) => this.emit({ ...this._config, highlight_current_time_text_color: e.target.value })}
            />
          </div>
        </div>

        <!-- Wechselwochen -->
        <div class="row">
          <label>Wechselwochen (A/B)</label>
          <div class="hint">
            Optional. Wenn aktiviert, kann die Card automatisch A/B-Woche bestimmen (KW-Parität) oder via Mapping-Entity überschreiben.
          </div>

          <div class="row">
            <label>week_mode</label>
            <select .value=${this._config.week_mode ?? "off"} @change=${(e) => this.emit({ ...this._config, week_mode: e.target.value })}>
              <option value="off">off (deaktiviert)</option>
              <option value="kw_parity">kw_parity (gerade/ungerade KW)</option>
              <option value="week_map">week_map (Mapping-Entity, Fallback Parität)</option>
            </select>
          </div>

          <div class="checkboxLine">
            <input type="checkbox" .checked=${this._config.week_a_is_even_kw ?? !0} @change=${(e) => this.emit({ ...this._config, week_a_is_even_kw: e.target.checked })} />
            <span>A-Woche = gerade Kalenderwoche (ISO-KW)</span>
          </div>
          <div class="hint">Wenn deaktiviert: A-Woche = ungerade KW.</div>

          <div class="timeGrid">
            <div class="row">
              <label>week_map_entity (optional)</label>
              <input
                type="text"
                .value=${this._config.week_map_entity ?? ""}
                placeholder="z.B. sensor.wechselwochen_map"
                @input=${(e) => this.emit({ ...this._config, week_map_entity: e.target.value })}
              />
            </div>

            <div class="row">
              <label>week_map_attribute</label>
              <input
                type="text"
                .value=${this._config.week_map_attribute ?? ""}
                placeholder="z.B. map (leer = state)"
                @input=${(e) => this.emit({ ...this._config, week_map_attribute: e.target.value })}
              />
            </div>
          </div>

          <div class="hint">
            Mapping-Format (Beispiele):<br />
            <code>{"2026":{"1":"A","2":"B"}}</code> oder <code>{"1":"A","2":"B"}</code>
          </div>

          <div class="timeGrid" style="margin-top:10px;">
            <div class="row">
              <label>source_entity_a</label>
              <input
                type="text"
                .value=${this._config.source_entity_a ?? ""}
                placeholder="z.B. sensor.stundenplan_a"
                @input=${(e) => this.emit({ ...this._config, source_entity_a: e.target.value })}
              />
            </div>

            <div class="row">
              <label>source_attribute_a</label>
              <input
                type="text"
                .value=${this._config.source_attribute_a ?? ""}
                placeholder="z.B. plan"
                @input=${(e) => this.emit({ ...this._config, source_attribute_a: e.target.value })}
              />
            </div>

            <div class="row">
              <label>source_entity_b</label>
              <input
                type="text"
                .value=${this._config.source_entity_b ?? ""}
                placeholder="z.B. sensor.stundenplan_b"
                @input=${(e) => this.emit({ ...this._config, source_entity_b: e.target.value })}
              />
            </div>

            <div class="row">
              <label>source_attribute_b</label>
              <input
                type="text"
                .value=${this._config.source_attribute_b ?? ""}
                placeholder="z.B. plan"
                @input=${(e) => this.emit({ ...this._config, source_attribute_b: e.target.value })}
              />
            </div>
          </div>
        </div>

        <!-- Legacy Entity/Attribute inputs -->
        <div class="row">
          <label>Datenquelle (optional, Single)</label>
          <div class="hint">
            Wenn gesetzt, werden die Zeilen aus einer Entität gelesen (JSON im state oder Attribut). Leer lassen = manueller Stundenplan. Bei Wechselwochen werden bevorzugt
            A/B-Quellen genutzt.
          </div>

          <div class="timeGrid">
            <div class="row">
              <label>source_entity</label>
              <input
                type="text"
                .value=${this._config.source_entity ?? ""}
                placeholder="z.B. sensor.stundenplan"
                @input=${(e) => this.emit({ ...this._config, source_entity: e.target.value })}
              />
            </div>

            <div class="row">
              <label>source_attribute</label>
              <input
                type="text"
                .value=${this._config.source_attribute ?? ""}
                placeholder="z.B. plan (leer = state)"
                @input=${(e) => this.emit({ ...this._config, source_attribute: e.target.value })}
              />
            </div>
          </div>

          <div class="row">
            <label>source_time_key</label>
            <input
              type="text"
              .value=${this._config.source_time_key ?? "Stunde"}
              placeholder='Default: "Stunde"'
              @input=${(e) => this.emit({ ...this._config, source_time_key: e.target.value })}
            />
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
      (e, r) => p`
          <div class="rowCard">
            <div class="rowTop">
              <div>
                <label>Zeit / Stunde</label>
                <input type="text" .value=${e.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(s) => this.updateRowTime(r, s.target.value)} />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input type="checkbox" .checked=${y(e)} @change=${(s) => this.toggleBreak(r, s.target.checked)} />
                <span>Pause</span>
              </div>

              <div class="rowActions">
                <button class="mini" title="Stunde darunter einfügen" @click=${() => this.addLessonRow(r)}>+ Stunde</button>
                <button class="mini" title="Pause darunter einfügen" @click=${() => this.addBreakRow(r)}>+ Pause</button>
                <button class="danger" @click=${() => this.removeRow(r)}>Löschen</button>
              </div>
            </div>

            ${y(e) ? p`
                  <div class="row">
                    <label>Pausentext</label>
                    <input type="text" .value=${e.label ?? "Pause"} placeholder="z. B. Pause" @input=${(s) => this.updateBreakLabel(r, s.target.value)} />
                  </div>
                ` : p`
                  <div class="timeGrid">
                    <div class="row">
                      <label>Start (HH:MM)</label>
                      <input type="text" .value=${e.start ?? ""} placeholder="z.B. 07:45" @input=${(s) => this.updateRowStart(r, s.target.value)} />
                    </div>
                    <div class="row">
                      <label>Ende (HH:MM)</label>
                      <input type="text" .value=${e.end ?? ""} placeholder="z.B. 08:30" @input=${(s) => this.updateRowEnd(r, s.target.value)} />
                    </div>
                  </div>

                  <div class="cellsGrid">
                    ${(this._config.days ?? []).map((s, n) => {
        var v, $;
        const a = e, c = (((v = a.cells) == null ? void 0 : v[n]) ?? "").toString(), l = (($ = a.cell_styles) == null ? void 0 : $[n]) ?? null, u = l != null && l.bg && l.bg.startsWith("#") ? l.bg : "#3b82f6", h = typeof (l == null ? void 0 : l.bg_alpha) == "number" ? b(l.bg_alpha) : 0.18, d = Math.round(h * 100), g = l != null && l.color && l.color.startsWith("#") ? l.color : "#ffffff", m = `sp-cell-${r}-${n}`;
        return p`
                        <div class="cellBox">
                          <div class="cellLabel">${s}</div>

                          <input
                            id=${m}
                            type="text"
                            class="cellInput"
                            .value=${c}
                            placeholder="Fach"
                            @input=${(f) => this.updateRowCell(r, n, f.target.value)}
                          />

                          <div class="styleGrid">
                            <div class="styleLine">
                              <div class="styleLabel">Hintergrund</div>
                              <input type="color" .value=${u} @input=${(f) => this.updateCellStyle(r, n, { bg: f.target.value })} />
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Transparenz</div>
                              <div class="rangeWrap">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  .value=${String(d)}
                                  @input=${(f) => this.updateCellStyle(r, n, { bg_alpha: Number(f.target.value) / 100 })}
                                />
                                <div class="styleHint">${d}%</div>
                              </div>
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Text</div>
                              <input type="color" .value=${g} @input=${(f) => this.updateCellStyle(r, n, { color: f.target.value })} />
                            </div>
                          </div>

                          <div class="preview" style=${nt(l, "1px solid var(--divider-color)")} aria-label="Vorschau" title="Vorschau">
                            ${c}
                          </div>
                        </div>
                      `;
      })}
                  </div>
                `}
          </div>
        `
    )}
    `;
  }
};
Q.properties = {
  hass: {},
  _config: { state: !0 }
}, Q.styles = Mt`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .editorPreview {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 16px;
      background: var(--card-background-color);
    }

    .editorPreviewTitle {
      font-size: 14px;
      font-weight: 600;
      opacity: 0.9;
      margin-bottom: 10px;
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

    .editorPreviewHint {
      margin-top: 8px;
      font-size: 12px;
      opacity: 0.7;
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
      word-break: break-word;
    }
    .checkboxLine {
      display: flex;
      align-items: center;
      gap: 10px;
      user-select: none;
      margin-top: 6px;
    }

    .pickerRow {
      display: grid;
      grid-template-columns: 70px 1fr;
      gap: 10px;
      align-items: center;
    }

    select {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
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

    .rowActions {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    button.mini {
      padding: 7px 9px;
      border-radius: 10px;
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
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
let ot = Q;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Y);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", ot);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  Y as StundenplanCard,
  ot as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
