/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, ct = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ht = Symbol(), pt = /* @__PURE__ */ new WeakMap();
let Tt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ct && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = pt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && pt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bt = (o) => new Tt(typeof o == "string" ? o : o + "", void 0, ht), Rt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new Tt(e, o, ht);
}, Dt = (o, t) => {
  if (ct) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, gt = ct ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Bt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ut, defineProperty: Wt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Lt, getOwnPropertySymbols: It, getPrototypeOf: qt } = Object, A = globalThis, _t = A.trustedTypes, Zt = _t ? _t.emptyScript : "", it = A.reactiveElementPolyfillSupport, W = (o, t) => o, ot = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Zt : null;
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
} }, Pt = (o, t) => !Ut(o, t), mt = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: Pt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = mt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Wt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const a = s == null ? void 0 : s.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const e = this.properties, i = [...Lt(e), ...It(e)];
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
      for (const s of i) e.unshift(gt(s));
    } else t !== void 0 && e.push(gt(t));
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
    return Dt(t, this.constructor.elementStyles), t;
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
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : ot).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, n;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : ot;
      this._$Em = s;
      const c = l.fromAttribute(e, a.type);
      this[s] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Pt)(r, e) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[W("elementProperties")] = /* @__PURE__ */ new Map(), H[W("finalized")] = /* @__PURE__ */ new Map(), it == null || it({ ReactiveElement: H }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, ft = (o) => o, G = F.trustedTypes, yt = G ? G.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Mt = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Ht = "?" + k, Kt = `<${Ht}>`, P = document, L = () => P.createComment(""), I = (o) => o === null || typeof o != "object" && typeof o != "function", dt = Array.isArray, Vt = (o) => dt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", st = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vt = /-->/g, bt = />/g, E = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wt = /'/g, $t = /"/g, Nt = /^(?:script|style|textarea|title)$/i, Jt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), p = Jt(1), z = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), xt = /* @__PURE__ */ new WeakMap(), T = P.createTreeWalker(P, 129);
function Ot(o, t) {
  if (!dt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yt !== void 0 ? yt.createHTML(t) : t;
}
const jt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = U;
  for (let a = 0; a < e; a++) {
    const l = o[a];
    let c, d, h = -1, u = 0;
    for (; u < l.length && (n.lastIndex = u, d = n.exec(l), d !== null); ) u = n.lastIndex, n === U ? d[1] === "!--" ? n = vt : d[1] !== void 0 ? n = bt : d[2] !== void 0 ? (Nt.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = E) : d[3] !== void 0 && (n = E) : n === E ? d[0] === ">" ? (n = s ?? U, h = -1) : d[1] === void 0 ? h = -2 : (h = n.lastIndex - d[2].length, c = d[1], n = d[3] === void 0 ? E : d[3] === '"' ? $t : wt) : n === $t || n === wt ? n = E : n === vt || n === bt ? n = U : (n = E, s = void 0);
    const g = n === E && o[a + 1].startsWith("/>") ? " " : "";
    r += n === U ? l + Kt : h >= 0 ? (i.push(c), l.slice(0, h) + Mt + l.slice(h) + k + g) : l + k + (h === -2 ? a : g);
  }
  return [Ot(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class q {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [c, d] = jt(t, e);
    if (this.el = q.createElement(c, i), T.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = T.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Mt)) {
          const u = d[n++], g = s.getAttribute(h).split(k), m = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: m[2], strings: g, ctor: m[1] === "." ? Yt : m[1] === "?" ? Qt : m[1] === "@" ? Xt : et }), s.removeAttribute(h);
        } else h.startsWith(k) && (l.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Nt.test(s.tagName)) {
          const h = s.textContent.split(k), u = h.length - 1;
          if (u > 0) {
            s.textContent = G ? G.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(h[g], L()), T.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[u], L());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ht) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(k, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += k.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(o, t, e = o, i) {
  var n, a;
  if (t === z) return t;
  let s = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const r = I(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), r === void 0 ? s = void 0 : (s = new r(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = B(o, s._$AS(o, t.values), s, i)), t;
}
class Gt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? P).importNode(e, !0);
    T.currentNode = s;
    let r = T.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new Z(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new te(r, this, t)), this._$AV.push(c), l = i[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = T.nextNode(), n++);
    }
    return T.currentNode = P, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Z {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = B(this, t, e), I(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = q.createElement(Ot(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const n = new Gt(s, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = xt.get(t.strings);
    return e === void 0 && xt.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    dt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new Z(this.O(L()), this.O(L()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = ft(t).nextSibling;
      ft(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = _;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = B(this, t, e, 0), n = !I(t) || t !== this._$AH && t !== z, n && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = B(this, a[i + l], e, l), c === z && (c = this._$AH[l]), n || (n = !I(c) || c !== this._$AH[l]), c === _ ? t = _ : t !== _ && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class Qt extends et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class Xt extends et {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? _) === z) return;
    const i = this._$AH, s = t === _ && i !== _ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== _ && (i === _ || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class te {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const rt = F.litHtmlPolyfillSupport;
rt == null || rt(q, Z), (F.litHtmlVersions ?? (F.litHtmlVersions = [])).push("3.3.2");
const ee = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new Z(t.insertBefore(L(), r), r, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
class N extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ee(e, this.renderRoot, this.renderOptions);
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
N._$litElement$ = !0, N.finalized = !0, (Et = R.litElementHydrateSupport) == null || Et.call(R, { LitElement: N });
const nt = R.litElementPolyfillSupport;
nt == null || nt({ LitElement: N });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.2");
function b(o) {
  return !!o && o.break === !0;
}
function y(o) {
  return Math.min(1, Math.max(0, o));
}
function Y(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function j(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = y(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function ie(o) {
  if (!(o != null && o.bg)) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = Y(t);
  if (!e) return t;
  const i = typeof o.bg_alpha == "number" ? y(o.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function at(o, t) {
  const e = [], i = ie(o);
  return i && e.push(`background:${i}`), o != null && o.color && e.push(`color:${o.color}`), e.push(`border:${(o == null ? void 0 : o.border) ?? t}`), e.join(";") + ";";
}
function St(o, t) {
  const e = (o ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = Y(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${y(t)})` : e;
  }
  return e;
}
function O(o) {
  const e = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function kt(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function se(o) {
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
function At(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const i = t.getUTCFullYear(), s = new Date(Date.UTC(i, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), n = new Date(s);
  n.setUTCDate(s.getUTCDate() + (4 - r));
  const a = t.getTime() - n.getTime();
  return { isoWeek: 1 + Math.round(a / (7 * 24 * 60 * 60 * 1e3)), isoYear: i };
}
function Ct(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function re(o) {
  const t = (o ?? "").toString().trim();
  return t ? t === "-" || t === "–" || t === "---" : !0;
}
const X = class X extends N {
  constructor() {
    super(...arguments), this._splanData = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  connectedCallback() {
    super.connectedCallback(), ne("/local/splan/sdaten/splank.xml", "5a").then((t) => {
      console.log("SPLAN DATA", t), this._splanData = t, this.requestUpdate();
    }).catch((t) => console.error("SPLAN ERROR", t)), this._tick = window.setInterval(() => this.requestUpdate(), 3e4);
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
      highlight_breaks: !1,
      // ✅ Default: an
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
    const e = X.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((a) => (a ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((a) => {
      if (b(a))
        return { break: !0, time: (a.time ?? "").toString(), label: (a.label ?? "Pause").toString() };
      const l = Array.isArray(a == null ? void 0 : a.cells) ? a.cells : [], c = Array.from({ length: e.length }, ($, S) => (l[S] ?? "").toString()), d = Array.isArray(a == null ? void 0 : a.cell_styles) ? a.cell_styles : [], h = Array.from({ length: e.length }, ($, S) => j(d[S])), u = ((a == null ? void 0 : a.time) ?? "").toString(), g = O(u), m = ((a == null ? void 0 : a.start) ?? "").toString().trim(), v = ((a == null ? void 0 : a.end) ?? "").toString().trim(), x = {
        time: u,
        start: m || g.start || void 0,
        end: v || g.end || void 0,
        cells: c
      };
      return h.some(($) => !!$) && (x.cell_styles = h), x;
    }), r = ((t.week_mode ?? "off") + "").toString().trim(), n = r === "kw_parity" || r === "week_map" || r === "off" ? r : "off";
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
      week_mode: n,
      week_a_is_even_kw: t.week_a_is_even_kw ?? !0,
      week_map_entity: (t.week_map_entity ?? "").toString(),
      week_map_attribute: (t.week_map_attribute ?? "").toString(),
      source_entity_a: (t.source_entity_a ?? "").toString(),
      source_attribute_a: (t.source_attribute_a ?? "").toString(),
      source_entity_b: (t.source_entity_b ?? "").toString(),
      source_attribute_b: (t.source_attribute_b ?? "").toString(),
      rows: s
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(se(e).map(kt));
    if (!i.size) return -1;
    const s = (t ?? []).map((r) => kt(r));
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
    const r = /* @__PURE__ */ new Date(), n = r.getHours() * 60 + r.getMinutes();
    return n >= i && n < s;
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
    var a, l, c;
    const i = (t ?? "").toString().trim();
    if (!i || !((l = (a = this.hass) == null ? void 0 : a.states) != null && l[i])) return null;
    const s = this.hass.states[i], r = (e ?? "").toString().trim(), n = r ? (c = s.attributes) == null ? void 0 : c[r] : s.state;
    return this.parseAnyJson(n);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], s = (t.source_time_key ?? "Stunde").toString(), r = e.map((n) => {
      if ((n == null ? void 0 : n.break) === !0)
        return { break: !0, time: (n.time ?? n[s] ?? "").toString(), label: (n.label ?? "Pause").toString() };
      const a = ((n == null ? void 0 : n.time) ?? (n == null ? void 0 : n[s]) ?? "").toString(), l = O(a), c = Array.from({ length: i.length }, (h, u) => {
        const g = (i[u] ?? "").toString();
        return ((n == null ? void 0 : n[g]) ?? "").toString();
      });
      return { time: a, start: l.start, end: l.end, cells: c };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, i) {
    const s = this.readEntityJson(e, i);
    return Array.isArray(s) ? this.buildRowsFromArray(t, s) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = At(/* @__PURE__ */ new Date()), i = e % 2 === 0, s = !!t.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(e, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: n } = At(/* @__PURE__ */ new Date()), a = String(r), l = String(n);
    if (s != null && s[l] && typeof s[l] == "object") {
      const d = Ct(s[l][a]);
      if (d) return d;
    }
    const c = Ct(s == null ? void 0 : s[a]);
    return c || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), s = (t.source_entity_a ?? "").trim(), r = (t.source_entity_b ?? "").trim(), n = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (i === "A" && s) {
        const c = this.getRowsFromEntity(t, s, n);
        if (c) return c;
      }
      if (i === "B" && r) {
        const c = this.getRowsFromEntity(t, r, a);
        if (c) return c;
      }
      const l = (t.source_entity ?? "").trim();
      if (l) {
        const c = this.getRowsFromEntity(t, l, (t.source_attribute ?? "").trim());
        if (c) return c;
      }
      return t.rows ?? [];
    }
    const e = (t.source_entity ?? "").toString().trim();
    return e ? this.getRowsFromEntity(t, e, (t.source_attribute ?? "").toString().trim()) ?? t.rows ?? [] : t.rows ?? [];
  }
  render() {
    if (!this.config) return p``;
    const t = this.config, e = this.getRowsResolved(t), i = this.getTodayIndex(t.days ?? []), s = "1px solid var(--divider-color)", r = St(t.highlight_today_color ?? "", 0.12), n = St(t.highlight_current_color ?? "", 0.18), a = (t.highlight_current_text_color ?? "").toString().trim(), l = (t.highlight_current_time_text_color ?? "").toString().trim(), c = t.week_mode !== "off", d = c ? this.getActiveWeek(t) : null;
    return p`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${c ? p`<div class="weekBadge">Woche: <b>${d}</b></div>` : p``}

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((h, u) => {
      const g = t.highlight_today && u === i ? "today" : "";
      return p`<th class=${g} style=${`--sp-hl:${r};`}>${h}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((h) => {
      if (b(h)) {
        const f = O(h.time), C = !!f.start && !!f.end && this.isNowBetween(f.start, f.end), K = !!t.highlight_current && !!t.highlight_breaks && C;
        let D = `--sp-hl:${n};`, V = "";
        return K && (D += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", V += `--sp-hl:${n}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), C && t.highlight_current_time_text && l && (D += `color:${l};`), p`
                    <tr class="break">
                      <td class="time" style=${D}>${h.time}</td>
                      <td colspan=${t.days.length} style=${V}>${h.label ?? ""}</td>
                    </tr>
                  `;
      }
      const u = h, g = u.cells ?? [], m = u.cell_styles ?? [], v = !!u.start && !!u.end && this.isNowBetween(u.start, u.end), x = i >= 0 ? g[i] ?? "" : "", $ = i >= 0 ? re(x) : !1, w = !(!!t.free_only_column_highlight && $);
      let M = `--sp-hl:${n};`;
      return w && t.highlight_current && v && (M += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), w && v && t.highlight_current_time_text && l && (M += `color:${l};`), p`
                  <tr>
                    <td class="time" style=${M}>${u.time}</td>

                    ${t.days.map((f, C) => {
        const K = g[C] ?? "", D = m[C] ?? null, V = t.highlight_today && C === i ? "today" : "";
        let ut = `--sp-hl:${r};` + at(D, s);
        const zt = (K ?? "").toString().trim().length > 0;
        return w && zt && v && t.highlight_current_text && a && i >= 0 && C === i && (ut += `color:${a};`), p`<td class=${V} style=${ut}>${K}</td>`;
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
X.styles = Rt`
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
let Q = X;
const tt = class tt extends N {
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
    const i = Y(t);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${y(e)})` : `rgba(0,0,0,${y(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const s = (t ?? "").toString().trim();
    if (s.startsWith("#"))
      return Y(s) ? { hex: s, alpha: y(i) } : { hex: e, alpha: y(i) };
    const r = s.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const a = Math.max(0, Math.min(255, Number(r[1]))), l = Math.max(0, Math.min(255, Number(r[2]))), c = Math.max(0, Math.min(255, Number(r[3]))), d = y(Number(r[4])), h = (u) => u.toString(16).padStart(2, "0");
      return { hex: `#${h(a)}${h(l)}${h(c)}`, alpha: d };
    }
    const n = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (n) {
      const a = Math.max(0, Math.min(255, Number(n[1]))), l = Math.max(0, Math.min(255, Number(n[2]))), c = Math.max(0, Math.min(255, Number(n[3]))), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(a)}${d(l)}${d(c)}`, alpha: y(i) };
    }
    return { hex: e, alpha: y(i) };
  }
  setHighlightRgba(t, e, i) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, i) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  /* ---------- Normalization ---------- */
  normalizeConfig(t) {
    const i = { ...Q.getStubConfig(), ...t }, s = Array.isArray(i.days) && i.days.length ? i.days.map((c) => (c ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(i.rows) ? i.rows : []).map((c) => {
      if (b(c)) return { break: !0, time: (c.time ?? "").toString(), label: (c.label ?? "Pause").toString() };
      const d = Array.isArray(c == null ? void 0 : c.cells) ? c.cells : [], h = Array.from({ length: s.length }, (S, w) => (d[w] ?? "").toString()), u = Array.isArray(c == null ? void 0 : c.cell_styles) ? c.cell_styles : [], g = Array.from({ length: s.length }, (S, w) => j(u[w])), m = ((c == null ? void 0 : c.time) ?? "").toString(), v = O(m), x = ((c == null ? void 0 : c.start) ?? "").toString().trim(), $ = ((c == null ? void 0 : c.end) ?? "").toString().trim();
      return {
        time: m,
        start: x || v.start || void 0,
        end: $ || v.end || void 0,
        cells: h,
        cell_styles: g
      };
    }), a = ((i.week_mode ?? "off") + "").toString().trim(), l = a === "kw_parity" || a === "week_map" || a === "off" ? a : "off";
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
      week_mode: l,
      week_a_is_even_kw: i.week_a_is_even_kw ?? !0,
      week_map_entity: (i.week_map_entity ?? "").toString(),
      week_map_attribute: (i.week_map_attribute ?? "").toString(),
      source_entity_a: (i.source_entity_a ?? "").toString(),
      source_attribute_a: (i.source_attribute_a ?? "").toString(),
      source_entity_b: (i.source_entity_b ?? "").toString(),
      source_attribute_b: (i.source_attribute_b ?? "").toString(),
      rows: n
    };
  }
  /* ---------- Editor: Basic config ---------- */
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((r) => r.trim()).filter((r) => r.length), i = (this._config.rows ?? []).map((r) => {
      if (b(r)) return r;
      const n = r, a = Array.from({ length: e.length }, (c, d) => {
        var h;
        return (((h = n.cells) == null ? void 0 : h[d]) ?? "").toString();
      }), l = Array.from({ length: e.length }, (c, d) => {
        var h;
        return j((h = n.cell_styles) == null ? void 0 : h[d]);
      });
      return { ...n, cells: a, cell_styles: l };
    });
    this.emit({ ...this._config, days: e, rows: i });
    const s = {};
    Object.entries(this._ui.rowOpen).forEach(([r, n]) => {
      const a = Number(r);
      !Number.isNaN(a) && a >= 0 && a < i.length && (s[a] = n);
    }), this._ui.rowOpen = s;
  }
  /* ---------- Editor: Rows ---------- */
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => {
      if (r !== t) return s;
      if (b(s)) return { ...s, time: e };
      const n = s, a = O(n.time), l = O(e), c = (n.start ?? "").toString().trim(), d = (n.end ?? "").toString().trim(), h = !c || !!a.start && c === a.start, u = !d || !!a.end && d === a.end;
      return {
        ...n,
        time: e,
        start: h ? l.start ?? n.start : n.start,
        end: u ? l.end ?? n.end : n.end
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
    const s = this._config.rows.map((r, n) => {
      if (n !== t || b(r)) return r;
      const a = r, l = Array.isArray(a.cells) ? [...a.cells] : [];
      return l[e] = i, { ...a, cells: l };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, n) => {
      if (n !== t || b(r)) return r;
      const a = r, l = Array.isArray(a.cell_styles) ? [...a.cell_styles] : Array.from({ length: this._config.days.length }, () => null), d = { ...l[e] ? { ...l[e] } : {}, ...i };
      return typeof d.bg_alpha == "number" && (d.bg_alpha = y(d.bg_alpha)), l[e] = j(d), { ...a, cell_styles: l };
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
    var r, n;
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((a) => requestAnimationFrame(() => a(null))), await new Promise((a) => requestAnimationFrame(() => a(null)));
    const i = `sp-cell-${t}-${e}`, s = (r = this.renderRoot) == null ? void 0 : r.getElementById(i);
    s && (s.scrollIntoView({ behavior: "smooth", block: "center" }), (n = s.focus) == null || n.call(s));
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
      if (b(s))
        return p`
                  <tr class="p-break">
                    <td class="p-time">${s.time}</td>
                    <td colspan=${e.length}>${s.label ?? ""}</td>
                  </tr>
                `;
      const n = s;
      return p`
                <tr>
                  <td class="p-time">${n.time}</td>
                  ${e.map((a, l) => {
        var h, u;
        const c = (((h = n.cells) == null ? void 0 : h[l]) ?? "").toString(), d = ((u = n.cell_styles) == null ? void 0 : u[l]) ?? null;
        return p`
                      <td
                        class="p-cell"
                        style=${at(d, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(r, l)}
                      >
                        ${c}
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
  colorRow(t, e, i, s, r, n) {
    const a = Math.round(y(i.alpha) * 100);
    return p`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${i.hex} @input=${(l) => s(l.target.value)} />
          <div class="range">
            <input type="range" min="0" max="100" .value=${String(a)} @input=${(l) => r(Number(l.target.value) / 100)} />
            <div class="pct">${a}%</div>
          </div>
        </div>

        <div class="mono">${n}</div>
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
    const t = this._config;
    return p`
      <div class="stack">
        <div class="sub">
          Optional: Plan aus Entity laden (JSON im state oder Attribut). Bei Wechselwochen werden bevorzugt A/B-Quellen genutzt. Ohne Entity → manueller Plan.
        </div>

        <div class="panelMinor">
          <div class="minorTitle">Wechselwochen (A/B)</div>

          <div class="field">
            <label class="lbl">week_mode</label>
            <select class="in" .value=${t.week_mode ?? "off"} @change=${(e) => this.emit({ ...t, week_mode: e.target.value })}>
              <option value="off">off (deaktiviert)</option>
              <option value="kw_parity">kw_parity (gerade/ungerade ISO-KW)</option>
              <option value="week_map">week_map (Mapping-Entity, Fallback Parität)</option>
            </select>
          </div>

          <div class="optRow">
            <div>
              <div class="optTitle">A-Woche = gerade Kalenderwoche</div>
              <div class="sub">Wenn deaktiviert: A-Woche = ungerade KW.</div>
            </div>
            ${this.uiSwitch(!!t.week_a_is_even_kw, (e) => this.emit({ ...t, week_a_is_even_kw: e }))}
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">week_map_entity (optional)</label>
              <input class="in" type="text" .value=${t.week_map_entity ?? ""} placeholder="z.B. sensor.wechselwochen_map" @input=${(e) => this.emit({ ...t, week_map_entity: e.target.value })} />
            </div>

            <div class="field">
              <label class="lbl">week_map_attribute</label>
              <input class="in" type="text" .value=${t.week_map_attribute ?? ""} placeholder="z.B. map (leer = state)" @input=${(e) => this.emit({ ...t, week_map_attribute: e.target.value })} />
            </div>
          </div>

          <div class="sub">
            Mapping-Format: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span>
          </div>

          <div class="divider"></div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity_a</label>
              <input class="in" type="text" .value=${t.source_entity_a ?? ""} placeholder="z.B. sensor.stundenplan_a" @input=${(e) => this.emit({ ...t, source_entity_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_a</label>
              <input class="in" type="text" .value=${t.source_attribute_a ?? ""} placeholder="z.B. plan" @input=${(e) => this.emit({ ...t, source_attribute_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_entity_b</label>
              <input class="in" type="text" .value=${t.source_entity_b ?? ""} placeholder="z.B. sensor.stundenplan_b" @input=${(e) => this.emit({ ...t, source_entity_b: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_b</label>
              <input class="in" type="text" .value=${t.source_attribute_b ?? ""} placeholder="z.B. plan" @input=${(e) => this.emit({ ...t, source_attribute_b: e.target.value })} />
            </div>
          </div>
        </div>

        <div class="panelMinor">
          <div class="minorTitle">Single-Source (Legacy / einfach)</div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity</label>
              <input class="in" type="text" .value=${t.source_entity ?? ""} placeholder="z.B. sensor.stundenplan" @input=${(e) => this.emit({ ...t, source_entity: e.target.value })} />
            </div>

            <div class="field">
              <label class="lbl">source_attribute</label>
              <input class="in" type="text" .value=${t.source_attribute ?? ""} placeholder="z.B. plan (leer = state)" @input=${(e) => this.emit({ ...t, source_attribute: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">source_time_key</label>
            <input class="in" type="text" .value=${t.source_time_key ?? "Stunde"} placeholder='Default: "Stunde"' @input=${(e) => this.emit({ ...t, source_time_key: e.target.value })} />
          </div>
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
      </div>

      ${t.rows.map((i, s) => {
      const r = b(i), n = r ? `Pause · ${i.time ?? ""}` : `Stunde · ${i.time ?? ""}`, a = r ? i.label ?? "Pause" : "", l = i;
      return p`
          <details
            class="rowPanel"
            ?open=${this._ui.rowOpen[s] ?? !1}
            @toggle=${(c) => this._ui.rowOpen[s] = !!c.target.open}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${n || `Zeile ${s + 1}`}</div>
                <div class="rowHeadMeta">${r ? a : `${(l.start ?? "") || "Start?"} – ${(l.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${i.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(c) => this.updateRowTime(s, c.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(r, (c) => this.toggleBreak(s, c))}
                  </div>
                </div>
              </div>

              ${r ? p`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${i.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(c) => this.updateBreakLabel(s, c.target.value)} />
                    </div>
                  ` : p`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${l.start ?? ""} placeholder="z.B. 07:45" @input=${(c) => this.updateRowStart(s, c.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${l.end ?? ""} placeholder="z.B. 08:30" @input=${(c) => this.updateRowEnd(s, c.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((c, d) => {
        var w, M;
        const h = (((w = l.cells) == null ? void 0 : w[d]) ?? "").toString(), u = ((M = l.cell_styles) == null ? void 0 : M[d]) ?? null, g = u != null && u.bg && u.bg.startsWith("#") ? u.bg : "#3b82f6", m = typeof (u == null ? void 0 : u.bg_alpha) == "number" ? y(u.bg_alpha) : 0.18, v = Math.round(m * 100), x = u != null && u.color && u.color.startsWith("#") ? u.color : "#ffffff", $ = `sp-cell-${s}-${d}`, S = at(u, "1px solid var(--divider-color)");
        return p`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${c}</div>
                              <div class="cellMiniPreview" style=${S} title="Zellvorschau">${h || "…"}</div>
                            </div>

                            <input id=${$} class="in" type="text" .value=${h} placeholder="Fach" @input=${(f) => this.updateRowCell(s, d, f.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${g} @input=${(f) => this.updateCellStyle(s, d, { bg: f.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String(v)}
                                    @input=${(f) => this.updateCellStyle(s, d, {
          bg_alpha: Number(f.target.value) / 100
        })}
                                  />
                                  <div class="pct">${v}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${x} @input=${(f) => this.updateCellStyle(s, d, { color: f.target.value })} />
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
tt.properties = {
  hass: {},
  _config: { state: !0 }
}, tt.styles = Rt`
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
let lt = tt;
async function ne(o, t) {
  const e = await (await fetch(o, { cache: "no-store" })).text(), i = new DOMParser().parseFromString(e, "text/xml"), s = Array.from(i.querySelectorAll("Klassen > Kl")).find((a) => {
    var l;
    return (((l = a.querySelector("Kurz")) == null ? void 0 : l.textContent) ?? "").trim() === t;
  });
  if (!s) throw new Error(`Klasse "${t}" nicht gefunden`);
  const r = Array.from(s.querySelectorAll("Stunden > St")).map((a) => ({
    hour: parseInt((a.textContent ?? "0").trim(), 10),
    start: a.getAttribute("StZeit") ?? "",
    end: a.getAttribute("StZeitBis") ?? ""
  })), n = Array.from(s.querySelectorAll("Pl > Std")).map((a) => {
    var l, c, d, h, u, g, m;
    return {
      sw: (((l = a.querySelector("PlSw")) == null ? void 0 : l.textContent) ?? "").trim(),
      // 01 / 02 / 0102
      day: parseInt((((c = a.querySelector("PlTg")) == null ? void 0 : c.textContent) ?? "0").trim(), 10),
      hour: parseInt((((d = a.querySelector("PlSt")) == null ? void 0 : d.textContent) ?? "0").trim(), 10),
      subject: (((h = a.querySelector("PlFa")) == null ? void 0 : h.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      teacher: (((u = a.querySelector("PlLe")) == null ? void 0 : u.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      room: (((g = a.querySelector("PlRa")) == null ? void 0 : g.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      week: (((m = a.querySelector("PlWo")) == null ? void 0 : m.textContent) ?? "").replace(/\u00a0/g, " ").trim().toUpperCase()
      // A/B/leer
    };
  });
  return { times: r, lessons: n };
}
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Q);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", lt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor (strukturierter PR-Stand)",
  preview: !0
});
export {
  Q as StundenplanCard,
  lt as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
