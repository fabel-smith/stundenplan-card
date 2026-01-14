/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, rt = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), at = /* @__PURE__ */ new WeakMap();
let vt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (rt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = at.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ct = (n) => new vt(typeof n == "string" ? n : n + "", void 0, st), xt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[s + 1], n[0]);
  return new vt(e, n, st);
}, Mt = (n, t) => {
  if (rt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = I.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, n.appendChild(i);
  }
}, lt = rt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ct(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ht, defineProperty: Pt, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Rt, getOwnPropertySymbols: Nt, getPrototypeOf: Ot } = Object, w = globalThis, ht = w.trustedTypes, zt = ht ? ht.emptyScript : "", K = w.reactiveElementPolyfillSupport, R = (n, t) => n, j = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? zt : null;
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
} }, wt = (n, t) => !Ht(n, t), ct = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Pt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: s } = Tt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const h = r == null ? void 0 : r.call(this);
      s == null || s.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = Ot(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, i = [...Rt(e), ...Nt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(lt(r));
    } else t !== void 0 && e.push(lt(t));
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
    return Mt(t, this.constructor.elementStyles), t;
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
    var s;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var s, o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const h = i.getPropertyOptions(r), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((s = h.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? h.converter : j;
      this._$Em = r;
      const l = a.fromAttribute(e, h.type);
      this[r] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, s) {
    var o;
    if (t !== void 0) {
      const h = this.constructor;
      if (r === !1 && (s = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? wt)(s, e) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: s }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), s !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, o] of r) {
        const { wrapped: h } = o, a = this[s];
        h !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var s;
        return (s = r.hostUpdate) == null ? void 0 : s.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[R("elementProperties")] = /* @__PURE__ */ new Map(), C[R("finalized")] = /* @__PURE__ */ new Map(), K == null || K({ ReactiveElement: C }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, dt = (n) => n, F = N.trustedTypes, ut = F ? F.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, St = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + x, Ut = `<${At}>`, E = document, z = () => E.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", nt = Array.isArray, Lt = (n) => nt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, gt = />/g, S = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, mt = /"/g, kt = /^(?:script|style|textarea|title)$/i, Dt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), _ = Dt(1), H = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function Et(n, t) {
  if (!nt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Bt = (n, t) => {
  const e = n.length - 1, i = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let l, c, d = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, c = o.exec(a), c !== null); ) p = o.lastIndex, o === T ? c[1] === "!--" ? o = pt : c[1] !== void 0 ? o = gt : c[2] !== void 0 ? (kt.test(c[2]) && (r = RegExp("</" + c[2], "g")), o = S) : c[3] !== void 0 && (o = S) : o === S ? c[0] === ">" ? (o = r ?? T, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? S : c[3] === '"' ? mt : _t) : o === mt || o === _t ? o = S : o === pt || o === gt ? o = T : (o = S, r = void 0);
    const u = o === S && n[h + 1].startsWith("/>") ? " " : "";
    s += o === T ? a + Ut : d >= 0 ? (i.push(l), a.slice(0, d) + St + a.slice(d) + x + u) : a + x + (d === -2 ? h : u);
  }
  return [Et(n, s + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class L {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const h = t.length - 1, a = this.parts, [l, c] = Bt(t, e);
    if (this.el = L.createElement(l, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = A.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(St)) {
          const p = c[o++], u = r.getAttribute(d).split(x), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: s, name: g[2], strings: u, ctor: g[1] === "." ? Wt : g[1] === "?" ? Ft : g[1] === "@" ? Vt : J }), r.removeAttribute(d);
        } else d.startsWith(x) && (a.push({ type: 6, index: s }), r.removeAttribute(d));
        if (kt.test(r.tagName)) {
          const d = r.textContent.split(x), p = d.length - 1;
          if (p > 0) {
            r.textContent = F ? F.emptyScript : "";
            for (let u = 0; u < p; u++) r.append(d[u], z()), A.nextNode(), a.push({ type: 2, index: ++s });
            r.append(d[p], z());
          }
        }
      } else if (r.nodeType === 8) if (r.data === At) a.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(x, d + 1)) !== -1; ) a.push({ type: 7, index: s }), d += x.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = E.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(n, t, e = n, i) {
  var o, h;
  if (t === H) return t;
  let r = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const s = U(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), s === void 0 ? r = void 0 : (r = new s(n), r._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = P(n, r._$AS(n, t.values), r, i)), t;
}
class It {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    A.currentNode = r;
    let s = A.nextNode(), o = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new D(s, s.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (l = new qt(s, this, t)), this._$AV.push(l), a = i[++h];
      }
      o !== (a == null ? void 0 : a.index) && (s = A.nextNode(), o++);
    }
    return A.currentNode = E, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class D {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = P(this, t, e), U(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Lt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = L.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(e);
    else {
      const o = new It(r, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new L(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const s of t) r === e.length ? e.push(i = new D(this.O(z()), this.O(z()), this, this.options)) : i = e[r], i._$AI(s), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = dt(t).nextSibling;
      dt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = P(this, t, e, 0), o = !U(t) || t !== this._$AH && t !== H, o && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = s[0], a = 0; a < s.length - 1; a++) l = P(this, h[i + a], e, a), l === H && (l = this._$AH[a]), o || (o = !U(l) || l !== this._$AH[a]), l === m ? t = m : t !== m && (t += (l ?? "") + s[a + 1]), this._$AH[a] = l;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Wt extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Ft extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Vt extends J {
  constructor(t, e, i, r, s) {
    super(t, e, i, r, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? m) === H) return;
    const i = this._$AH, r = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== m && (i === m || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qt {
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
const X = N.litHtmlPolyfillSupport;
X == null || X(L, D), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Gt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new D(t.insertBefore(z(), s), s, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class M extends C {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gt(e, this.renderRoot, this.renderOptions);
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
    return H;
  }
}
var $t;
M._$litElement$ = !0, M.finalized = !0, ($t = k.litElementHydrateSupport) == null || $t.call(k, { LitElement: M });
const Y = k.litElementPolyfillSupport;
Y == null || Y({ LitElement: M });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
function b(n) {
  return !!n && n.break === !0;
}
function $(n) {
  return Math.min(1, Math.max(0, n));
}
function V(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return [e, i, r].some((s) => Number.isNaN(s)) ? null : { r: e, g: i, b: r };
}
function W(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = $(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Jt(n) {
  if (!(n != null && n.bg)) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = V(t);
  if (!e) return t;
  const i = typeof n.bg_alpha == "number" ? $(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function tt(n, t) {
  const e = [], i = Jt(n);
  return i && e.push(`background:${i}`), n != null && n.color && e.push(`color:${n.color}`), e.push(`border:${(n == null ? void 0 : n.border) ?? t}`), e.join(";") + ";";
}
function yt(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = V(e);
    if (!i) return e;
    const r = $(t);
    return `rgba(${i.r}, ${i.g}, ${i.b}, ${r})`;
  }
  return e;
}
function O(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function bt(n) {
  return (n ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Zt(n) {
  switch (n) {
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
const q = class q extends M {
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
      // Defaults für Entity-Mode
      source_entity: "",
      source_attribute: "",
      source_time_key: "Stunde",
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
    const e = q.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((s) => (s ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((s) => {
      if (b(s))
        return {
          break: !0,
          time: (s.time ?? "").toString(),
          label: (s.label ?? "Pause").toString()
        };
      const o = Array.isArray(s == null ? void 0 : s.cells) ? s.cells : [], h = Array.from({ length: e.length }, (f, y) => (o[y] ?? "").toString()), a = Array.isArray(s == null ? void 0 : s.cell_styles) ? s.cell_styles : [], l = Array.from({ length: e.length }, (f, y) => W(a[y])), c = ((s == null ? void 0 : s.time) ?? "").toString(), d = O(c), p = ((s == null ? void 0 : s.start) ?? "").toString().trim(), u = ((s == null ? void 0 : s.end) ?? "").toString().trim(), g = {
        time: c,
        start: p || d.start || void 0,
        end: u || d.end || void 0,
        cells: h
      };
      return l.some((f) => !!f) && (g.cell_styles = l), g;
    });
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      highlight_today_color: (t.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (t.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: t.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (t.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (t.source_entity ?? "").toString(),
      source_attribute: (t.source_attribute ?? "").toString(),
      source_time_key: (t.source_time_key ?? "Stunde").toString(),
      rows: r
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(Zt(e).map(bt));
    if (!i.size) return -1;
    const r = (t ?? []).map((s) => bt(s));
    for (let s = 0; s < r.length; s++)
      if (i.has(r[s])) return s;
    return -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [e, i] = t.split(":").map((r) => Number(r));
    return [e, i].some((r) => Number.isNaN(r)) ? null : e * 60 + i;
  }
  isNowBetween(t, e) {
    const i = this.toMinutes(t), r = this.toMinutes(e);
    if (i == null || r == null) return !1;
    const s = /* @__PURE__ */ new Date(), o = s.getHours() * 60 + s.getMinutes();
    return o >= i && o < r;
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
  /**
   * Optional: Rows aus HA Entity/Attribut bauen.
   * Erwartet Array von Objekten:
   * [
   *  {"ID":1,"Stunde":"1. 07:45-08:30","Montag":"Bio","Dienstag":"Mathe"},
   *  ...
   * ]
   * Keys für Tage müssen zu config.days passen (z.B. "Montag" wenn days=["Montag",...]).
   */
  getRowsFromEntity(t) {
    var c, d, p;
    const e = (t.source_entity ?? "").toString().trim();
    if (!e || !((d = (c = this.hass) == null ? void 0 : c.states) != null && d[e])) return null;
    const i = this.hass.states[e], r = (t.source_attribute ?? "").toString().trim(), s = r ? (p = i.attributes) == null ? void 0 : p[r] : i.state, o = this.parseAnyJson(s);
    if (!Array.isArray(o)) return null;
    const h = t.days ?? [], a = (t.source_time_key ?? "Stunde").toString(), l = o.map((u) => {
      if ((u == null ? void 0 : u.break) === !0)
        return {
          break: !0,
          time: (u.time ?? u[a] ?? "").toString(),
          label: (u.label ?? "Pause").toString()
        };
      const g = ((u == null ? void 0 : u.time) ?? (u == null ? void 0 : u[a]) ?? "").toString(), f = O(g), y = Array.from({ length: h.length }, (ot, Z) => {
        const B = (h[Z] ?? "").toString();
        return ((u == null ? void 0 : u[B]) ?? "").toString();
      });
      return {
        time: g,
        start: f.start,
        end: f.end,
        cells: y
      };
    });
    return l.length ? l : null;
  }
  render() {
    if (!this.config) return _``;
    const t = this.config, e = this.getRowsFromEntity(t) ?? t.rows, i = this.getTodayIndex(t.days ?? []), r = "1px solid var(--divider-color)", s = yt(t.highlight_today_color ?? "", 0.12), o = yt(t.highlight_current_color ?? "", 0.18), h = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim();
    return _`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((l, c) => {
      const d = t.highlight_today && c === i ? "today" : "";
      return _`<th class=${d} style=${`--sp-hl:${s};`}>${l}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((l) => {
      if (b(l))
        return _`
                    <tr class="break">
                      <td class="time">${l.time}</td>
                      <td colspan=${t.days.length}>${l.label ?? ""}</td>
                    </tr>
                  `;
      const c = l, d = c.cells ?? [], p = c.cell_styles ?? [], u = !!c.start && !!c.end && this.isNowBetween(c.start, c.end);
      let g = `--sp-hl:${o};`;
      return t.highlight_current && u && (g += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), u && t.highlight_current_time_text && a && (g += `color:${a};`), _`
                  <tr>
                    <td class="time" style=${g}>${c.time}</td>

                    ${t.days.map((f, y) => {
        const v = d[y] ?? "", ot = p[y] ?? null, Z = t.highlight_today && y === i ? "today" : "";
        let B = `--sp-hl:${s};` + tt(ot, r);
        return u && t.highlight_current_text && h && i >= 0 && y === i && (B += `color:${h};`), _`<td class=${Z} style=${B}>${v}</td>`;
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
q.styles = xt`
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

    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }
  `;
let et = q;
const G = class G extends M {
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
  // --- Picker Helpers (Editor) ---
  rgbaFromHex(t, e) {
    const i = V(t);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${$(e)})` : `rgba(0,0,0,${$(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const r = (t ?? "").toString().trim();
    if (r.startsWith("#"))
      return V(r) ? { hex: r, alpha: $(i) } : { hex: e, alpha: $(i) };
    const s = r.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (s) {
      const h = Math.max(0, Math.min(255, Number(s[1]))), a = Math.max(0, Math.min(255, Number(s[2]))), l = Math.max(0, Math.min(255, Number(s[3]))), c = $(Number(s[4])), d = (p) => p.toString(16).padStart(2, "0");
      return { hex: `#${d(h)}${d(a)}${d(l)}`, alpha: c };
    }
    const o = r.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (o) {
      const h = Math.max(0, Math.min(255, Number(o[1]))), a = Math.max(0, Math.min(255, Number(o[2]))), l = Math.max(0, Math.min(255, Number(o[3]))), c = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${c(h)}${c(a)}${c(l)}`, alpha: $(i) };
    }
    return { hex: e, alpha: $(i) };
  }
  setHighlightRgba(t, e, i) {
    if (!this._config) return;
    const r = this.rgbaFromHex(e, i);
    this.emit({ ...this._config, [t]: r });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  normalizeConfig(t) {
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((s) => (s ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((s) => {
      if (b(s))
        return { break: !0, time: (s.time ?? "").toString(), label: (s.label ?? "Pause").toString() };
      const o = Array.isArray(s == null ? void 0 : s.cells) ? s.cells : [], h = Array.from({ length: e.length }, (g, f) => (o[f] ?? "").toString()), a = Array.isArray(s == null ? void 0 : s.cell_styles) ? s.cell_styles : [], l = Array.from({ length: e.length }, (g, f) => W(a[f])), c = ((s == null ? void 0 : s.time) ?? "").toString(), d = O(c), p = ((s == null ? void 0 : s.start) ?? "").toString().trim(), u = ((s == null ? void 0 : s.end) ?? "").toString().trim();
      return {
        time: c,
        start: p || d.start || void 0,
        end: u || d.end || void 0,
        cells: h,
        // im Editor immer vorhanden, damit bequem editierbar
        cell_styles: l
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
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: t.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (t.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (t.source_entity ?? "").toString(),
      source_attribute: (t.source_attribute ?? "").toString(),
      source_time_key: (t.source_time_key ?? "Stunde").toString(),
      rows: r
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
    const e = t.split(",").map((r) => r.trim()).filter((r) => r.length), i = (this._config.rows ?? []).map((r) => {
      if (b(r)) return r;
      const s = r, o = Array.from({ length: e.length }, (a, l) => {
        var c;
        return (((c = s.cells) == null ? void 0 : c[l]) ?? "").toString();
      }), h = Array.from({ length: e.length }, (a, l) => {
        var c;
        return W((c = s.cell_styles) == null ? void 0 : c[l]);
      });
      return { ...s, cells: o, cell_styles: h };
    });
    this.emit({ ...this._config, days: e, rows: i });
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((r, s) => {
      if (s !== t) return r;
      if (b(r)) return { ...r, time: e };
      const o = r, h = O(o.time), a = O(e), l = (o.start ?? "").toString().trim(), c = (o.end ?? "").toString().trim(), d = !l || !!h.start && l === h.start, p = !c || !!h.end && c === h.end;
      return {
        ...o,
        time: e,
        start: d ? a.start ?? o.start : o.start,
        end: p ? a.end ?? o.end : o.end
      };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((r, s) => s !== t || b(r) ? r : { ...r, start: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((r, s) => s !== t || b(r) ? r : { ...r, end: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const r = this._config.rows.map((s, o) => {
      if (o !== t || b(s)) return s;
      const h = s, a = Array.isArray(h.cells) ? [...h.cells] : [];
      return a[e] = i, { ...h, cells: a };
    });
    this.emit({ ...this._config, rows: r });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const r = this._config.rows.map((s, o) => {
      if (o !== t || b(s)) return s;
      const h = s, a = Array.isArray(h.cell_styles) ? [...h.cell_styles] : Array.from({ length: this._config.days.length }, () => null), c = { ...a[e] ? { ...a[e] } : {}, ...i };
      return typeof c.bg_alpha == "number" && (c.bg_alpha = $(c.bg_alpha)), a[e] = W(c), { ...h, cell_styles: a };
    });
    this.emit({ ...this._config, rows: r });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((r, s) => s !== t ? r : e ? { break: !0, time: r.time ?? "", label: r.label ?? "Pause" } : {
      time: r.time ?? "",
      start: void 0,
      end: void 0,
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    });
    this.emit({ ...this._config, rows: i });
  }
  updateBreakLabel(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((r, s) => s === t ? { ...r, label: e } : r);
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
    const e = this._config.rows.filter((i, r) => r !== t);
    this.emit({ ...this._config, rows: e });
  }
  jumpToCell(t, e) {
    var s, o;
    const i = `sp-cell-${t}-${e}`, r = (s = this.renderRoot) == null ? void 0 : s.getElementById(i);
    r && (r.scrollIntoView({ behavior: "smooth", block: "center" }), (o = r.focus) == null || o.call(r));
  }
  renderEditorPreview() {
    if (!this._config) return _``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], i = this._config.rows ?? [];
    return _`
      <div class="editorPreview">
        <div class="editorPreviewTitle">Vorschau</div>

        <table class="previewTable">
          <thead>
            <tr>
              <th class="p-time">Stunde</th>
              ${e.map((r) => _`<th>${r}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${i.map((r, s) => {
      if (b(r))
        return _`
                  <tr class="p-break">
                    <td class="p-time">${r.time}</td>
                    <td colspan=${e.length}>${r.label ?? ""}</td>
                  </tr>
                `;
      const o = r;
      return _`
                <tr>
                  <td class="p-time">${o.time}</td>
                  ${e.map((h, a) => {
        var d, p;
        const l = (((d = o.cells) == null ? void 0 : d[a]) ?? "").toString(), c = ((p = o.cell_styles) == null ? void 0 : p[a]) ?? null;
        return _`
                      <td
                        class="p-cell"
                        style=${tt(c, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(s, a)}
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
    if (!this._config) return _``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), e = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return _`
      ${this.renderEditorPreview()}

      <div class="section">
        <div class="row">
          <label>Titel</label>
          <input
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(i) => this.emit({ ...this._config, title: i.target.value })}
          />
        </div>

        <div class="row">
          <label>Tage (Komma getrennt)</label>
          <input
            type="text"
            .value=${(this._config.days ?? []).join(", ")}
            @input=${(i) => this.setDaysFromString(i.target.value)}
          />
          <div class="hint">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>

        <div class="row">
          <label>Optionen</label>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_today ?? !0}
              @change=${(i) => this.emit({ ...this._config, highlight_today: i.target.checked })}
            />
            <span>Heute hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current ?? !1}
              @change=${(i) => this.emit({ ...this._config, highlight_current: i.target.checked })}
            />
            <span>Aktuelle Stunde hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current_text ?? !1}
              @change=${(i) => this.emit({ ...this._config, highlight_current_text: i.target.checked })}
            />
            <span>Aktuelles Fach (Textfarbe) hervorheben</span>
          </div>

          <div class="checkboxLine">
            <input
              type="checkbox"
              .checked=${this._config.highlight_current_time_text ?? !1}
              @change=${(i) => this.emit({ ...this._config, highlight_current_time_text: i.target.checked })}
            />
            <span>Aktuelle Stunde (Textfarbe) hervorheben</span>
          </div>
        </div>

        <div class="row">
          <label>Highlight-Farbe (Heute)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${t.hex}
              @input=${(i) => this.setHighlightRgba("highlight_today_color", i.target.value, t.alpha)}
            />
            <div class="rangeWrap">
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(t.alpha * 100))}
                @input=${(i) => this.setHighlightRgba("highlight_today_color", t.hex, Number(i.target.value) / 100)}
              />
              <div class="styleHint">${Math.round(t.alpha * 100)}%</div>
            </div>
          </div>
          <div class="hint">${this._config.highlight_today_color}</div>
        </div>

        <div class="row">
          <label>Highlight-Farbe (Aktuelle Stunde)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${e.hex}
              @input=${(i) => this.setHighlightRgba("highlight_current_color", i.target.value, e.alpha)}
            />
            <div class="rangeWrap">
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(e.alpha * 100))}
                @input=${(i) => this.setHighlightRgba("highlight_current_color", e.hex, Number(i.target.value) / 100)}
              />
              <div class="styleHint">${Math.round(e.alpha * 100)}%</div>
            </div>
          </div>
          <div class="hint">${this._config.highlight_current_color}</div>
        </div>

        <div class="row">
          <label>Textfarbe (Aktuelles Fach)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()}
              @input=${(i) => this.setHighlightHexOnly("highlight_current_text_color", i.target.value)}
            />
            <input
              type="text"
              .value=${this._config.highlight_current_text_color ?? "#ff1744"}
              @input=${(i) => this.emit({ ...this._config, highlight_current_text_color: i.target.value })}
            />
          </div>
        </div>

        <div class="row">
          <label>Textfarbe (Aktuelle Stunde / Zeitspalte)</label>
          <div class="pickerRow">
            <input
              type="color"
              .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()}
              @input=${(i) => this.setHighlightHexOnly("highlight_current_time_text_color", i.target.value)}
            />
            <input
              type="text"
              .value=${this._config.highlight_current_time_text_color ?? "#ff9100"}
              @input=${(i) => this.emit({ ...this._config, highlight_current_time_text_color: i.target.value })}
            />
          </div>
        </div>

        <!-- OPTIONAL: Entity/Attribute inputs (simple) -->
        <div class="row">
          <label>Datenquelle (optional)</label>
          <div class="hint">
            Wenn gesetzt, werden die Zeilen aus einer Entität gelesen (JSON im state oder Attribut). Leer lassen = manueller Stundenplan.
          </div>

          <div class="timeGrid">
            <div class="row">
              <label>source_entity</label>
              <input
                type="text"
                .value=${this._config.source_entity ?? ""}
                placeholder="z.B. sensor.stundenplan"
                @input=${(i) => this.emit({ ...this._config, source_entity: i.target.value })}
              />
            </div>

            <div class="row">
              <label>source_attribute</label>
              <input
                type="text"
                .value=${this._config.source_attribute ?? ""}
                placeholder="z.B. plan (leer = state)"
                @input=${(i) => this.emit({ ...this._config, source_attribute: i.target.value })}
              />
            </div>
          </div>

          <div class="row">
            <label>source_time_key</label>
            <input
              type="text"
              .value=${this._config.source_time_key ?? "Stunde"}
              placeholder='Default: "Stunde"'
              @input=${(i) => this.emit({ ...this._config, source_time_key: i.target.value })}
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
      (i, r) => _`
          <div class="rowCard">
            <div class="rowTop">
              <div>
                <label>Zeit / Stunde</label>
                <input
                  type="text"
                  .value=${i.time ?? ""}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(s) => this.updateRowTime(r, s.target.value)}
                />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input type="checkbox" .checked=${b(i)} @change=${(s) => this.toggleBreak(r, s.target.checked)} />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this.removeRow(r)}>Löschen</button>
              </div>
            </div>

            ${b(i) ? _`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${i.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(s) => this.updateBreakLabel(r, s.target.value)}
                    />
                  </div>
                ` : _`
                  <div class="timeGrid">
                    <div class="row">
                      <label>Start (HH:MM)</label>
                      <input
                        type="text"
                        .value=${i.start ?? ""}
                        placeholder="z.B. 07:45"
                        @input=${(s) => this.updateRowStart(r, s.target.value)}
                      />
                    </div>
                    <div class="row">
                      <label>Ende (HH:MM)</label>
                      <input
                        type="text"
                        .value=${i.end ?? ""}
                        placeholder="z.B. 08:30"
                        @input=${(s) => this.updateRowEnd(r, s.target.value)}
                      />
                    </div>
                  </div>

                  <div class="cellsGrid">
                    ${(this._config.days ?? []).map((s, o) => {
        var f, y;
        const h = i, a = (((f = h.cells) == null ? void 0 : f[o]) ?? "").toString(), l = ((y = h.cell_styles) == null ? void 0 : y[o]) ?? null, c = l != null && l.bg && l.bg.startsWith("#") ? l.bg : "#3b82f6", d = typeof (l == null ? void 0 : l.bg_alpha) == "number" ? $(l.bg_alpha) : 0.18, p = Math.round(d * 100), u = l != null && l.color && l.color.startsWith("#") ? l.color : "#ffffff", g = `sp-cell-${r}-${o}`;
        return _`
                        <div class="cellBox">
                          <div class="cellLabel">${s}</div>

                          <input
                            id=${g}
                            type="text"
                            class="cellInput"
                            .value=${a}
                            placeholder="Fach"
                            @input=${(v) => this.updateRowCell(r, o, v.target.value)}
                          />

                          <div class="styleGrid">
                            <div class="styleLine">
                              <div class="styleLabel">Hintergrund</div>
                              <input
                                type="color"
                                .value=${c}
                                @input=${(v) => this.updateCellStyle(r, o, { bg: v.target.value })}
                              />
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Transparenz</div>
                              <div class="rangeWrap">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  .value=${String(p)}
                                  @input=${(v) => this.updateCellStyle(r, o, { bg_alpha: Number(v.target.value) / 100 })}
                                />
                                <div class="styleHint">${p}%</div>
                              </div>
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Text</div>
                              <input
                                type="color"
                                .value=${u}
                                @input=${(v) => this.updateCellStyle(r, o, { color: v.target.value })}
                              />
                            </div>
                          </div>

                          <div
                            class="preview"
                            style=${tt(l, "1px solid var(--divider-color)")}
                            aria-label="Vorschau"
                            title="Vorschau"
                          >
                            ${a}
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
G.properties = {
  hass: {},
  _config: { state: !0 }
}, G.styles = xt`
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
let it = G;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", et);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", it);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  et as StundenplanCard,
  it as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
