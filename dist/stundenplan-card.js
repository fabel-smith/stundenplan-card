/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, tt = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), rt = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (n) => new yt(typeof n == "string" ? n : n + "", void 0, et), bt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new yt(e, n, et);
}, Et = (n, t) => {
  if (tt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = D.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, nt = tt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return kt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ct, defineProperty: Mt, getOwnPropertyDescriptor: Ht, getOwnPropertyNames: Pt, getOwnPropertySymbols: Rt, getPrototypeOf: Tt } = Object, w = globalThis, ot = w.trustedTypes, Nt = ot ? ot.emptyScript : "", q = w.reactiveElementPolyfillSupport, T = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Nt : null;
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
} }, $t = (n, t) => !Ct(n, t), at = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Mt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Ht(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, i = [...Pt(e), ...Rt(e)];
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
      for (const s of i) e.unshift(nt(s));
    } else t !== void 0 && e.push(nt(t));
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
    return Et(t, this.constructor.elementStyles), t;
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
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Q).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : Q;
      this._$Em = s;
      const h = a.fromAttribute(e, l.type);
      this[s] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? $t)(r, e) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[T("elementProperties")] = /* @__PURE__ */ new Map(), C[T("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: C }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, lt = (n) => n, W = N.trustedTypes, ht = W ? W.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, vt = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + x, Ot = `<${xt}>`, E = document, O = () => E.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", it = Array.isArray, Ut = (n) => it(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, A = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, gt = /"/g, wt = /^(?:script|style|textarea|title)$/i, zt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), y = zt(1), H = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), S = E.createTreeWalker(E, 129);
function At(n, t) {
  if (!it(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const Lt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = R;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let h, c, d = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, c = o.exec(a), c !== null); ) u = o.lastIndex, o === R ? c[1] === "!--" ? o = ct : c[1] !== void 0 ? o = dt : c[2] !== void 0 ? (wt.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = A) : c[3] !== void 0 && (o = A) : o === A ? c[0] === ">" ? (o = s ?? R, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? A : c[3] === '"' ? gt : ut) : o === gt || o === ut ? o = A : o === ct || o === dt ? o = R : (o = A, s = void 0);
    const _ = o === A && n[l + 1].startsWith("/>") ? " " : "";
    r += o === R ? a + Ot : d >= 0 ? (i.push(h), a.slice(0, d) + vt + a.slice(d) + x + _) : a + x + (d === -2 ? l : _);
  }
  return [At(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class z {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, c] = Lt(t, e);
    if (this.el = z.createElement(h, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(vt)) {
          const u = c[o++], _ = s.getAttribute(d).split(x), p = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: p[2], strings: _, ctor: p[1] === "." ? It : p[1] === "?" ? Bt : p[1] === "@" ? Wt : Z }), s.removeAttribute(d);
        } else d.startsWith(x) && (a.push({ type: 6, index: r }), s.removeAttribute(d));
        if (wt.test(s.tagName)) {
          const d = s.textContent.split(x), u = d.length - 1;
          if (u > 0) {
            s.textContent = W ? W.emptyScript : "";
            for (let _ = 0; _ < u; _++) s.append(d[_], O()), S.nextNode(), a.push({ type: 2, index: ++r });
            s.append(d[u], O());
          }
        }
      } else if (s.nodeType === 8) if (s.data === xt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(x, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += x.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = E.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(n, t, e = n, i) {
  var o, l;
  if (t === H) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const r = U(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = P(n, s._$AS(n, t.values), s, i)), t;
}
class Dt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    S.currentNode = s;
    let r = S.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new L(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new jt(r, this, t)), this._$AV.push(h), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = S.nextNode(), o++);
    }
    return S.currentNode = E, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
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
    t = P(this, t, e), U(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = z.createElement(At(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const o = new Dt(s, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new L(this.O(O()), this.O(O()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = lt(t).nextSibling;
      lt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Z {
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
    if (r === void 0) t = P(this, t, e, 0), o = !U(t) || t !== this._$AH && t !== H, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++) h = P(this, l[i + a], e, a), h === H && (h = this._$AH[a]), o || (o = !U(h) || h !== this._$AH[a]), h === g ? t = g : t !== g && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class It extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Bt extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Wt extends Z {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? g) === H) return;
    const i = this._$AH, s = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== g && (i === g || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
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
const J = N.litHtmlPolyfillSupport;
J == null || J(z, L), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const Ft = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new L(t.insertBefore(O(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ft(e, this.renderRoot, this.renderOptions);
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
var mt;
M._$litElement$ = !0, M.finalized = !0, (mt = k.litElementHydrateSupport) == null || mt.call(k, { LitElement: M });
const K = k.litElementPolyfillSupport;
K == null || K({ LitElement: M });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
function b(n) {
  return !!n && n.break === !0;
}
function m(n) {
  return Math.min(1, Math.max(0, n));
}
function j(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function I(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = m(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Vt(n) {
  if (!(n != null && n.bg)) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = j(t);
  if (!e) return t;
  const i = typeof n.bg_alpha == "number" ? m(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function St(n, t) {
  const e = [], i = Vt(n);
  return i && e.push(`background:${i}`), n != null && n.color && e.push(`color:${n.color}`), e.push(`border:${(n == null ? void 0 : n.border) ?? t}`), e.join(";") + ";";
}
function _t(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = j(e);
    if (!i) return e;
    const s = m(t);
    return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
  }
  return e;
}
function B(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function ft(n) {
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
const F = class F extends M {
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
      // auffälligere Defaults:
      highlight_current_text: !1,
      highlight_current_text_color: "#ff1744",
      // kräftiges Rot/Pink, sofort sichtbar
      // Zeitspalte Textfarbe
      highlight_current_time_text: !1,
      highlight_current_time_text_color: "#ff9100",
      // kräftiges Orange, sofort sichtbar
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
  // defensiv, damit Picker/Preview stabil bleibt
  setConfig(t) {
    const e = F.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
      if (b(r))
        return {
          break: !0,
          time: (r.time ?? "").toString(),
          label: (r.label ?? "Pause").toString()
        };
      const o = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], l = Array.from({ length: e.length }, (f, v) => (o[v] ?? "").toString()), a = Array.isArray(r == null ? void 0 : r.cell_styles) ? r.cell_styles : [], h = Array.from({ length: e.length }, (f, v) => I(a[v])), c = ((r == null ? void 0 : r.time) ?? "").toString(), d = B(c), u = ((r == null ? void 0 : r.start) ?? "").toString().trim(), _ = ((r == null ? void 0 : r.end) ?? "").toString().trim(), p = {
        time: c,
        start: u || d.start || void 0,
        end: _ || d.end || void 0,
        cells: l
      };
      return h.some((f) => !!f) && (p.cell_styles = h), p;
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
      rows: s
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(Zt(e).map(ft));
    if (!i.size) return -1;
    const s = (t ?? []).map((r) => ft(r));
    for (let r = 0; r < s.length; r++)
      if (i.has(s[r])) return r;
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
  render() {
    if (!this.config) return y``;
    const t = this.getTodayIndex(this.config.days ?? []), e = "1px solid var(--divider-color)", i = _t(this.config.highlight_today_color ?? "", 0.12), s = _t(this.config.highlight_current_color ?? "", 0.18), r = (this.config.highlight_current_text_color ?? "").toString().trim(), o = (this.config.highlight_current_time_text_color ?? "").toString().trim();
    return y`
      <ha-card header=${this.config.title ?? ""}>
        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${this.config.days.map((l, a) => {
      const h = this.config.highlight_today && a === t ? "today" : "";
      return y`<th class=${h} style=${`--sp-hl:${i};`}>${l}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${this.config.rows.map((l) => {
      if (b(l))
        return y`
                    <tr class="break">
                      <td class="time">${l.time}</td>
                      <td colspan=${this.config.days.length}>${l.label ?? ""}</td>
                    </tr>
                  `;
      const a = l, h = a.cells ?? [], c = a.cell_styles ?? [], d = !!this.config.highlight_current && !!a.start && !!a.end && this.isNowBetween(a.start, a.end);
      let u = `--sp-hl:${s};` + (d ? "box-shadow: inset 0 0 0 9999px var(--sp-hl);" : "");
      return d && this.config.highlight_current_time_text && o && (u += `color:${o};`), y`
                  <tr>
                    <td class="time" style=${u}>${a.time}</td>

                    ${this.config.days.map((_, p) => {
        const f = h[p] ?? "", v = c[p] ?? null, $ = this.config.highlight_today && p === t ? "today" : "";
        let st = `--sp-hl:${i};` + St(v, e);
        return d && this.config.highlight_current_text && r && t >= 0 && p === t && (st += `color:${r};`), y`<td class=${$} style=${st}>${f}</td>`;
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
F.styles = bt`
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
let X = F;
const V = class V extends M {
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
    const i = j(t);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${m(e)})` : `rgba(0,0,0,${m(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const s = (t ?? "").toString().trim();
    if (s.startsWith("#"))
      return j(s) ? { hex: s, alpha: m(i) } : { hex: e, alpha: m(i) };
    const r = s.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const l = Math.max(0, Math.min(255, Number(r[1]))), a = Math.max(0, Math.min(255, Number(r[2]))), h = Math.max(0, Math.min(255, Number(r[3]))), c = m(Number(r[4])), d = (u) => u.toString(16).padStart(2, "0");
      return { hex: `#${d(l)}${d(a)}${d(h)}`, alpha: c };
    }
    const o = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (o) {
      const l = Math.max(0, Math.min(255, Number(o[1]))), a = Math.max(0, Math.min(255, Number(o[2]))), h = Math.max(0, Math.min(255, Number(o[3]))), c = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${c(l)}${c(a)}${c(h)}`, alpha: m(i) };
    }
    return { hex: e, alpha: m(i) };
  }
  setHighlightRgba(t, e, i) {
    if (!this._config) return;
    const s = this.rgbaFromHex(e, i);
    this.emit({ ...this._config, [t]: s });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  normalizeConfig(t) {
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((r) => (r ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((r) => {
      if (b(r))
        return { break: !0, time: (r.time ?? "").toString(), label: (r.label ?? "Pause").toString() };
      const o = Array.isArray(r == null ? void 0 : r.cells) ? r.cells : [], l = Array.from({ length: e.length }, (p, f) => (o[f] ?? "").toString()), a = Array.isArray(r == null ? void 0 : r.cell_styles) ? r.cell_styles : [], h = Array.from({ length: e.length }, (p, f) => I(a[f])), c = ((r == null ? void 0 : r.time) ?? "").toString(), d = B(c), u = ((r == null ? void 0 : r.start) ?? "").toString().trim(), _ = ((r == null ? void 0 : r.end) ?? "").toString().trim();
      return {
        time: c,
        start: u || d.start || void 0,
        end: _ || d.end || void 0,
        cells: l,
        // im Editor immer vorhanden, damit bequem editierbar
        cell_styles: h
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
      if (b(s)) return s;
      const r = s, o = Array.from({ length: e.length }, (a, h) => {
        var c;
        return (((c = r.cells) == null ? void 0 : c[h]) ?? "").toString();
      }), l = Array.from({ length: e.length }, (a, h) => {
        var c;
        return I((c = r.cell_styles) == null ? void 0 : c[h]);
      });
      return { ...r, cells: o, cell_styles: l };
    });
    this.emit({ ...this._config, days: e, rows: i });
  }
  // WICHTIG: Wenn "time" geändert wird, start/end nachziehen, sofern leer oder auto-abgeleitet
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => {
      if (r !== t) return s;
      if (b(s)) return { ...s, time: e };
      const o = s, l = B(o.time), a = B(e), h = (o.start ?? "").toString().trim(), c = (o.end ?? "").toString().trim(), d = !h || !!l.start && h === l.start, u = !c || !!l.end && c === l.end;
      return {
        ...o,
        time: e,
        start: d ? a.start ?? o.start : o.start,
        end: u ? a.end ?? o.end : o.end
      };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || b(s) ? s : { ...s, start: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || b(s) ? s : { ...s, end: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || b(r)) return r;
      const l = r, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = i, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || b(r)) return r;
      const l = r, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), c = { ...a[e] ? { ...a[e] } : {}, ...i };
      return typeof c.bg_alpha == "number" && (c.bg_alpha = m(c.bg_alpha)), a[e] = I(c), { ...l, cell_styles: a };
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
  jumpToCell(t, e) {
    var r, o;
    const i = `sp-cell-${t}-${e}`, s = (r = this.renderRoot) == null ? void 0 : r.getElementById(i);
    s && (s.scrollIntoView({ behavior: "smooth", block: "center" }), (o = s.focus) == null || o.call(s));
  }
  render() {
    if (!this._config) return y``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), e = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return y`
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

        <!-- Picker: Heute (Overlay) -->
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

        <!-- Picker: Aktuelle Stunde (Overlay Zeitspalte) -->
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

        <!-- Picker: Textfarbe aktuelles Fach -->
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

        <!-- Picker: Textfarbe aktuelle Stunde (Zeitspalte) -->
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
      </div>

      <div class="rowsHeader">
        <h3>Stundenplan (Zeilen)</h3>
        <div class="btnBar">
          <button @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      ${this._config.rows.map(
      (i, s) => y`
          <div class="rowCard">
            <div class="rowTop">
              <div>
                <label>Zeit / Stunde</label>
                <input
                  type="text"
                  .value=${i.time ?? ""}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(r) => this.updateRowTime(s, r.target.value)}
                />
              </div>

              <div class="checkboxLine" style="margin-top: 20px;">
                <input type="checkbox" .checked=${b(i)} @change=${(r) => this.toggleBreak(s, r.target.checked)} />
                <span>Pause</span>
              </div>

              <div style="margin-top: 20px; text-align:right;">
                <button class="danger" @click=${() => this.removeRow(s)}>Löschen</button>
              </div>
            </div>

            ${b(i) ? y`
                  <div class="row">
                    <label>Pausentext</label>
                    <input
                      type="text"
                      .value=${i.label ?? "Pause"}
                      placeholder="z. B. Pause"
                      @input=${(r) => this.updateBreakLabel(s, r.target.value)}
                    />
                  </div>
                ` : y`
                  <div class="timeGrid">
                    <div class="row">
                      <label>Start (HH:MM)</label>
                      <input
                        type="text"
                        .value=${i.start ?? ""}
                        placeholder="z.B. 07:45"
                        @input=${(r) => this.updateRowStart(s, r.target.value)}
                      />
                    </div>
                    <div class="row">
                      <label>Ende (HH:MM)</label>
                      <input
                        type="text"
                        .value=${i.end ?? ""}
                        placeholder="z.B. 08:30"
                        @input=${(r) => this.updateRowEnd(s, r.target.value)}
                      />
                    </div>
                  </div>

                  <div class="cellsGrid">
                    ${(this._config.days ?? []).map((r, o) => {
        var f, v;
        const l = i, a = (((f = l.cells) == null ? void 0 : f[o]) ?? "").toString(), h = ((v = l.cell_styles) == null ? void 0 : v[o]) ?? null, c = h != null && h.bg && h.bg.startsWith("#") ? h.bg : "#3b82f6", d = typeof (h == null ? void 0 : h.bg_alpha) == "number" ? m(h.bg_alpha) : 0.18, u = Math.round(d * 100), _ = h != null && h.color && h.color.startsWith("#") ? h.color : "#ffffff", p = `sp-cell-${s}-${o}`;
        return y`
                        <div class="cellBox">
                          <div class="cellLabel">${r}</div>

                          <input
                            id=${p}
                            type="text"
                            class="cellInput"
                            .value=${a}
                            placeholder="Fach"
                            @input=${($) => this.updateRowCell(s, o, $.target.value)}
                          />

                          <div class="styleGrid">
                            <div class="styleLine">
                              <div class="styleLabel">Hintergrund</div>
                              <input
                                type="color"
                                .value=${c}
                                @input=${($) => this.updateCellStyle(s, o, { bg: $.target.value })}
                              />
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Transparenz</div>
                              <div class="rangeWrap">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  .value=${String(u)}
                                  @input=${($) => this.updateCellStyle(s, o, { bg_alpha: Number($.target.value) / 100 })}
                                />
                                <div class="styleHint">${u}%</div>
                              </div>
                            </div>

                            <div class="styleLine">
                              <div class="styleLabel">Text</div>
                              <input
                                type="color"
                                .value=${_}
                                @input=${($) => this.updateCellStyle(s, o, { color: $.target.value })}
                              />
                            </div>
                          </div>

                          <div
                            class="preview clickable"
                            style=${St(h, "1px solid var(--divider-color)")}
                            @click=${() => this.jumpToCell(s, o)}
                          >
                            Vorschau (klicken)
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
V.properties = {
  hass: {},
  _config: { state: !0 }
}, V.styles = bt`
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

    .preview.clickable {
      cursor: pointer;
      user-select: none;
    }
    .preview.clickable:hover {
      filter: brightness(1.06);
    }
  `;
let Y = V;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", X);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", Y);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  // ohne "custom:"
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor",
  preview: !0
});
export {
  X as StundenplanCard,
  Y as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
