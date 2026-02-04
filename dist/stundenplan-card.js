/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, dt = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = Symbol(), _t = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (dt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = _t.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && _t.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (o) => new Pt(typeof o == "string" ? o : o + "", void 0, ut), Ht = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, r, s) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[s + 1], o[0]);
  return new Pt(e, o, ut);
}, Ft = (o, t) => {
  if (dt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = G.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, o.appendChild(i);
  }
}, mt = dt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Wt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Lt, defineProperty: It, getOwnPropertyDescriptor: Zt, getOwnPropertyNames: Vt, getOwnPropertySymbols: Jt, getPrototypeOf: qt } = Object, A = globalThis, ft = A.trustedTypes, Kt = ft ? ft.emptyScript : "", st = A.reactiveElementPolyfillSupport, L = (o, t) => o, at = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Kt : null;
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
} }, Nt = (o, t) => !Lt(o, t), yt = { attribute: !0, type: String, converter: at, reflect: !1, useDefault: !1, hasChanged: Nt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let N = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = yt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && It(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: s } = Zt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const c = r == null ? void 0 : r.call(this);
      s == null || s.call(this, n), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? yt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...Vt(e), ...Jt(e)];
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
      for (const r of i) e.unshift(mt(r));
    } else t !== void 0 && e.push(mt(t));
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
    return Ft(t, this.constructor.elementStyles), t;
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
      const n = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : at).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var s, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const c = i.getPropertyOptions(r), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((s = c.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? c.converter : at;
      this._$Em = r;
      const a = l.fromAttribute(e, c.type);
      this[r] = a ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, s) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (r === !1 && (s = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? Nt)(s, e) || i.useDefault && i.reflect && s === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: s }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), s !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) {
        const { wrapped: c } = n, l = this[s];
        c !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
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
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[L("elementProperties")] = /* @__PURE__ */ new Map(), N[L("finalized")] = /* @__PURE__ */ new Map(), st == null || st({ ReactiveElement: N }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, bt = (o) => o, X = I.trustedTypes, vt = X ? X.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Ot = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, zt = "?" + k, jt = `<${zt}>`, P = document, V = () => P.createComment(""), J = (o) => o === null || typeof o != "object" && typeof o != "function", pt = Array.isArray, Gt = (o) => pt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", nt = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, wt = /-->/g, $t = />/g, T = RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, St = /"/g, Ut = /^(?:script|style|textarea|title)$/i, Yt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), g = Yt(1), U = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), kt = /* @__PURE__ */ new WeakMap(), R = P.createTreeWalker(P, 129);
function Dt(o, t) {
  if (!pt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vt !== void 0 ? vt.createHTML(t) : t;
}
const Xt = (o, t) => {
  const e = o.length - 1, i = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = F;
  for (let c = 0; c < e; c++) {
    const l = o[c];
    let a, d, h = -1, u = 0;
    for (; u < l.length && (n.lastIndex = u, d = n.exec(l), d !== null); ) u = n.lastIndex, n === F ? d[1] === "!--" ? n = wt : d[1] !== void 0 ? n = $t : d[2] !== void 0 ? (Ut.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = T) : d[3] !== void 0 && (n = T) : n === T ? d[0] === ">" ? (n = r ?? F, h = -1) : d[1] === void 0 ? h = -2 : (h = n.lastIndex - d[2].length, a = d[1], n = d[3] === void 0 ? T : d[3] === '"' ? St : xt) : n === St || n === xt ? n = T : n === wt || n === $t ? n = F : (n = T, r = void 0);
    const _ = n === T && o[c + 1].startsWith("/>") ? " " : "";
    s += n === F ? l + jt : h >= 0 ? (i.push(a), l.slice(0, h) + Ot + l.slice(h) + k + _) : l + k + (h === -2 ? c : _);
  }
  return [Dt(o, s + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class q {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let s = 0, n = 0;
    const c = t.length - 1, l = this.parts, [a, d] = Xt(t, e);
    if (this.el = q.createElement(a, i), R.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = R.nextNode()) !== null && l.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Ot)) {
          const u = d[n++], _ = r.getAttribute(h).split(k), m = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: s, name: m[2], strings: _, ctor: m[1] === "." ? te : m[1] === "?" ? ee : m[1] === "@" ? ie : it }), r.removeAttribute(h);
        } else h.startsWith(k) && (l.push({ type: 6, index: s }), r.removeAttribute(h));
        if (Ut.test(r.tagName)) {
          const h = r.textContent.split(k), u = h.length - 1;
          if (u > 0) {
            r.textContent = X ? X.emptyScript : "";
            for (let _ = 0; _ < u; _++) r.append(h[_], V()), R.nextNode(), l.push({ type: 2, index: ++s });
            r.append(h[u], V());
          }
        }
      } else if (r.nodeType === 8) if (r.data === zt) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(k, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += k.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function D(o, t, e = o, i) {
  var n, c;
  if (t === U) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const s = J(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((c = r == null ? void 0 : r._$AO) == null || c.call(r, !1), s === void 0 ? r = void 0 : (r = new s(o), r._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = D(o, r._$AS(o, t.values), r, i)), t;
}
class Qt {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? P).importNode(e, !0);
    R.currentNode = r;
    let s = R.nextNode(), n = 0, c = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let a;
        l.type === 2 ? a = new K(s, s.nextSibling, this, t) : l.type === 1 ? a = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (a = new re(s, this, t)), this._$AV.push(a), l = i[++c];
      }
      n !== (l == null ? void 0 : l.index) && (s = R.nextNode(), n++);
    }
    return R.currentNode = P, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class K {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = D(this, t, e), J(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = q.createElement(Dt(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(e);
    else {
      const n = new Qt(r, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = kt.get(t.strings);
    return e === void 0 && kt.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const s of t) r === e.length ? e.push(i = new K(this.O(V()), this.O(V()), this, this.options)) : i = e[r], i._$AI(s), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = bt(t).nextSibling;
      bt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, r) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = D(this, t, e, 0), n = !J(t) || t !== this._$AH && t !== U, n && (this._$AH = t);
    else {
      const c = t;
      let l, a;
      for (t = s[0], l = 0; l < s.length - 1; l++) a = D(this, c[i + l], e, l), a === U && (a = this._$AH[l]), n || (n = !J(a) || a !== this._$AH[l]), a === f ? t = f : t !== f && (t += (a ?? "") + s[l + 1]), this._$AH[l] = a;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ee extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ie extends it {
  constructor(t, e, i, r, s) {
    super(t, e, i, r, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = D(this, t, e, 0) ?? f) === U) return;
    const i = this._$AH, r = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== f && (i === f || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class re {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const ot = I.litHtmlPolyfillSupport;
ot == null || ot(q, K), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.2");
const se = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new K(t.insertBefore(V(), s), s, void 0, e ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
class O extends N {
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
    return U;
  }
}
var Mt;
O._$litElement$ = !0, O.finalized = !0, (Mt = M.litElementHydrateSupport) == null || Mt.call(M, { LitElement: O });
const lt = M.litElementPolyfillSupport;
lt == null || lt({ LitElement: O });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
function S(o) {
  return !!o && o.break === !0;
}
function $(o) {
  return Math.min(1, Math.max(0, o));
}
function Q(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return [e, i, r].some((s) => Number.isNaN(s)) ? null : { r: e, g: i, b: r };
}
function Y(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = $(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function ne(o) {
  if (!(o != null && o.bg)) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = Q(t);
  if (!e) return t;
  const i = typeof o.bg_alpha == "number" ? $(o.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function ct(o, t) {
  const e = [], i = ne(o);
  return i && e.push(`background:${i}`), o != null && o.color && e.push(`color:${o.color}`), e.push(`border:${(o == null ? void 0 : o.border) ?? t}`), e.join(";") + ";";
}
function At(o, t) {
  const e = (o ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = Q(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${$(t)})` : e;
  }
  return e;
}
function z(o) {
  const e = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function Ct(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function oe(o) {
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
function Et(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const i = t.getUTCFullYear(), r = new Date(Date.UTC(i, 0, 1)), s = r.getUTCDay() === 0 ? 7 : r.getUTCDay(), n = new Date(r);
  n.setUTCDate(r.getUTCDate() + (4 - s));
  const c = t.getTime() - n.getTime();
  return { isoWeek: 1 + Math.round(c / (7 * 24 * 60 * 60 * 1e3)), isoYear: i };
}
function Tt(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function Rt(o) {
  const t = (o ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || t.startsWith("---") || t.toUpperCase().startsWith("AUSFALL"));
}
const Z = class Z extends O {
  getGridOptions() {
    return { columns: "full" };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this.requestUpdate();
    }, 3e4);
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
      // Filter defaults
      filter_main_only: !0,
      filter_allow_prefixes: [],
      filter_exclude: [],
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
    const e = Z.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
    const e = Z.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((l) => (l ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((l) => {
      if (S(l))
        return {
          break: !0,
          time: (l.time ?? "").toString(),
          label: (l.label ?? "Pause").toString()
        };
      const a = Array.isArray(l == null ? void 0 : l.cells) ? l.cells : [], d = Array.from({ length: i.length }, (v, w) => (a[w] ?? "").toString()), h = Array.isArray(l == null ? void 0 : l.cell_styles) ? l.cell_styles : [], u = Array.from({ length: i.length }, (v, w) => Y(h[w])), _ = ((l == null ? void 0 : l.time) ?? "").toString(), m = z(_), b = ((l == null ? void 0 : l.start) ?? "").toString().trim(), p = ((l == null ? void 0 : l.end) ?? "").toString().trim(), y = {
        time: _,
        start: b || m.start || void 0,
        end: p || m.end || void 0,
        cells: d
      };
      return u.some((v) => !!v) && (y.cell_styles = u), y;
    }), n = ((t.week_mode ?? e.week_mode) + "").toString().trim(), c = n === "kw_parity" || n === "week_map" || n === "off" ? n : "off";
    return {
      type: (t.type ?? e.type).toString(),
      title: (t.title ?? e.title).toString(),
      days: i,
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
      source_entity: (t.source_entity ?? e.source_entity).toString(),
      source_attribute: (t.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (t.source_time_key ?? e.source_time_key).toString(),
      week_mode: c,
      week_a_is_even_kw: t.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (t.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (t.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (t.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (t.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (t.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (t.source_attribute_b ?? e.source_attribute_b).toString(),
      // Filter
      filter_main_only: t.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(t.filter_allow_prefixes) ? t.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(t.filter_exclude) ? t.filter_exclude.map(String) : [],
      rows: s
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(oe(e).map(Ct));
    if (!i.size) return -1;
    const r = (t ?? []).map((s) => Ct(s));
    for (let s = 0; s < r.length; s++) if (i.has(r[s])) return s;
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
    const s = /* @__PURE__ */ new Date(), n = s.getHours() * 60 + s.getMinutes();
    return n >= i && n < r;
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
    var c, l, a;
    const i = (t ?? "").toString().trim();
    if (!i || !((l = (c = this.hass) == null ? void 0 : c.states) != null && l[i])) return null;
    const r = this.hass.states[i], s = (e ?? "").toString().trim(), n = s ? (a = r.attributes) == null ? void 0 : a[s] : r.state;
    return this.parseAnyJson(n);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], r = (t.source_time_key ?? "Stunde").toString(), s = e.map((n) => {
      if ((n == null ? void 0 : n.break) === !0)
        return {
          break: !0,
          time: (n.time ?? n[r] ?? "").toString(),
          label: (n.label ?? "Pause").toString()
        };
      const c = ((n == null ? void 0 : n.time) ?? (n == null ? void 0 : n[r]) ?? "").toString(), l = z(c), a = Array.from({ length: i.length }, (h, u) => {
        const _ = (i[u] ?? "").toString();
        return ((n == null ? void 0 : n[_]) ?? "").toString();
      });
      return { time: c, start: l.start, end: l.end, cells: a };
    });
    return s.length ? s : null;
  }
  getRowsFromEntity(t, e, i) {
    var u, _, m, b, p;
    const r = (e ?? "").toString().trim();
    if (!r || !((_ = (u = this.hass) == null ? void 0 : u.states) != null && _[r])) return null;
    const s = this.hass.states[r], n = (i ?? "").toString().trim();
    if (n) {
      const y = (m = s.attributes) == null ? void 0 : m[n], v = this.parseAnyJson(y);
      if (Array.isArray(v))
        return this.buildRowsFromArray(t, v);
    }
    const c = (b = s.attributes) == null ? void 0 : b.rows_ha, l = this.parseAnyJson(c);
    if (Array.isArray(l))
      return this.buildRowsFromArray(t, l);
    const a = (p = s.attributes) == null ? void 0 : p.rows, d = this.parseAnyJson(a);
    if (Array.isArray(d))
      return this.buildRowsFromArray(t, d);
    const h = this.parseAnyJson(s.state);
    return Array.isArray(h) ? this.buildRowsFromArray(t, h) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = Et(/* @__PURE__ */ new Date()), i = e % 2 === 0, r = !!t.week_a_is_even_kw;
    return i === r ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), r = this.readEntityJson(e, i);
    if (!r || typeof r != "object") return null;
    const { isoWeek: s, isoYear: n } = Et(/* @__PURE__ */ new Date()), c = String(s), l = String(n);
    if (r != null && r[l] && typeof r[l] == "object") {
      const d = Tt(r[l][c]);
      if (d) return d;
    }
    const a = Tt(r == null ? void 0 : r[c]);
    return a || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  // Textfilter: „Hauptzeile“ split nach "/" + Excludes + optional „main_only“,
  // Info-Zeilen (nach \n) bleiben standardmäßig dran.
  filterCellText(t, e) {
    const i = (t ?? "").toString().trim();
    if (!i) return "";
    const r = i.split(`
`).map((p) => p.trim()), s = (r[0] ?? "").trim(), n = r.slice(1).join(`
`).trim(), c = s.split("/").map((p) => p.trim()).filter((p) => p.length > 0 && p !== "---" && p !== "—"), l = (e.filter_exclude ?? []).map((p) => p.trim()).filter(Boolean), a = (p) => l.some((y) => {
      try {
        return new RegExp(y, "i").test(p);
      } catch {
        return p.toLowerCase().includes(y.toLowerCase());
      }
    }), d = c.filter((p) => !a(p)), h = e.filter_main_only !== !1 ? d.filter((p) => !/^\d/.test(p)) : d, u = (e.filter_allow_prefixes ?? []).map((p) => p.toLowerCase()).filter(Boolean), _ = d.filter((p) => {
      const y = p.match(/^(\d+[a-z]+)/i);
      if (!y) return !1;
      const v = y[1].toLowerCase();
      return u.some((w) => v.startsWith(w));
    }), b = Array.from(/* @__PURE__ */ new Set([...h, ..._])).join(" / ").trim();
    return n ? `${b}
${n}`.trim() : b;
  }
  getRowsResolved(t) {
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), s = (t.source_entity_b ?? "").trim(), n = (t.source_attribute_a ?? "").trim(), c = (t.source_attribute_b ?? "").trim();
      if (i === "A" && r) {
        const a = this.getRowsFromEntity(t, r, n);
        if (a) return a;
      }
      if (i === "B" && s) {
        const a = this.getRowsFromEntity(t, s, c);
        if (a) return a;
      }
      const l = (t.source_entity ?? "").trim();
      if (l) {
        const a = this.getRowsFromEntity(t, l, (t.source_attribute ?? "").trim());
        if (a) return a;
      }
      return t.rows ?? [];
    }
    const e = (t.source_entity ?? "").toString().trim();
    return e ? this.getRowsFromEntity(t, e, (t.source_attribute ?? "").toString().trim()) ?? t.rows ?? [] : t.rows ?? [];
  }
  render() {
    if (!this.config) return g``;
    const t = this.config, e = this.getRowsResolved(t), i = this.getTodayIndex(t.days ?? []), r = "1px solid var(--divider-color)", s = At(t.highlight_today_color ?? "", 0.12), n = At(t.highlight_current_color ?? "", 0.18), c = (t.highlight_current_text_color ?? "").toString().trim(), l = (t.highlight_current_time_text_color ?? "").toString().trim(), a = t.week_mode !== "off", d = a ? this.getActiveWeek(t) : null;
    return g`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${a ? g`<div class="weekBadge">Woche: <b>${d}</b></div>` : g``}

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((h, u) => {
      const _ = t.highlight_today && u === i ? "today" : "";
      return g`<th class=${_} style=${`--sp-hl:${s};`}>${h}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((h) => {
      if (S(h)) {
        const E = z(h.time), H = !!E.start && !!E.end && this.isNowBetween(E.start, E.end), B = !!t.highlight_breaks && H;
        let W = `--sp-hl:${n};`, j = "";
        return B && (W += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", j += `--sp-hl:${n}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), B && t.highlight_current_time_text && l && (W += `color:${l};`), g`
                    <tr class="break">
                      <td class="time" style=${W}>${h.time}</td>
                      <td colspan=${t.days.length} style=${j}>${h.label ?? ""}</td>
                    </tr>
                  `;
      }
      const u = h, _ = u.cells ?? [], m = u.cell_styles ?? [], b = _.map((E) => this.filterCellText(E, t)), p = !!u.start && !!u.end && this.isNowBetween(u.start, u.end), y = i >= 0 ? _[i] ?? "" : "", v = i >= 0 ? this.filterCellText(y, t) : "", w = i >= 0 ? Rt(v) : !1, x = !(!!t.free_only_column_highlight && w);
      let rt = `--sp-hl:${n};`;
      return x && t.highlight_current && p && (rt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), x && p && t.highlight_current_time_text && l && (rt += `color:${l};`), g`
                  <tr>
                    <td class="time" style=${rt}>${u.time}</td>

                    ${t.days.map((E, H) => {
        const B = b[H] ?? "", W = m[H] ?? null, j = t.highlight_today && H === i ? "today" : "";
        let gt = `--sp-hl:${s};` + ct(W, r);
        const Bt = !Rt(B);
        return x && Bt && p && t.highlight_current_text && c && i >= 0 && H === i && (gt += `color:${c};`), g`<td class=${j} style=${gt}><span class="cellText">${B}</span></td>`;
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
Z.styles = Ht`
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
    .cellText {
      white-space: pre-line;
      display: inline-block;
    }
  `;
let tt = Z;
const et = class et extends O {
  constructor() {
    super(...arguments), this._ui = {
      openGeneral: !1,
      openHighlight: !1,
      openColors: !1,
      openSources: !1,
      openRows: !1,
      showCellStyles: !0,
      rowOpen: {}
    };
  }
  setConfig(t) {
    const e = (((t == null ? void 0 : t.type) ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    const i = !!this._config;
    this._config = this.normalizeConfig(this.clone(t)), i || (this._ui.rowOpen = {});
  }
  normalizeConfig(t) {
    const e = tt.getStubConfig(), i = { ...e, ...t, type: (t.type ?? e.type).toString() }, r = Array.isArray(i.days) && i.days.length ? i.days.map((a) => (a ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(i.rows) ? i.rows : []).map((a) => {
      if (S(a))
        return { break: !0, time: (a.time ?? "").toString(), label: (a.label ?? "Pause").toString() };
      const d = Array.isArray(a == null ? void 0 : a.cells) ? a.cells : [], h = Array.from({ length: r.length }, (w, C) => (d[C] ?? "").toString()), u = Array.isArray(a == null ? void 0 : a.cell_styles) ? a.cell_styles : [], _ = Array.from({ length: r.length }, (w, C) => Y(u[C])), m = ((a == null ? void 0 : a.time) ?? "").toString(), b = z(m), p = ((a == null ? void 0 : a.start) ?? "").toString().trim(), y = ((a == null ? void 0 : a.end) ?? "").toString().trim(), v = {
        time: m,
        start: p || b.start || void 0,
        end: y || b.end || void 0,
        cells: h
      };
      return _.some((w) => !!w) && (v.cell_styles = _), v;
    }), c = ((i.week_mode ?? e.week_mode) + "").toString().trim(), l = c === "kw_parity" || c === "week_map" || c === "off" ? c : "off";
    return {
      type: (i.type ?? e.type).toString(),
      title: (i.title ?? e.title).toString(),
      days: r,
      highlight_today: i.highlight_today ?? e.highlight_today,
      highlight_current: i.highlight_current ?? e.highlight_current,
      highlight_breaks: i.highlight_breaks ?? e.highlight_breaks,
      free_only_column_highlight: i.free_only_column_highlight ?? e.free_only_column_highlight,
      highlight_today_color: (i.highlight_today_color ?? e.highlight_today_color).toString(),
      highlight_current_color: (i.highlight_current_color ?? e.highlight_current_color).toString(),
      highlight_current_text: i.highlight_current_text ?? e.highlight_current_text,
      highlight_current_text_color: (i.highlight_current_text_color ?? e.highlight_current_text_color).toString(),
      highlight_current_time_text: i.highlight_current_time_text ?? e.highlight_current_time_text,
      highlight_current_time_text_color: (i.highlight_current_time_text_color ?? e.highlight_current_time_text_color).toString(),
      source_entity: (i.source_entity ?? e.source_entity).toString(),
      source_attribute: (i.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (i.source_time_key ?? e.source_time_key).toString(),
      week_mode: l,
      week_a_is_even_kw: i.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (i.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (i.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (i.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (i.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (i.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (i.source_attribute_b ?? e.source_attribute_b).toString(),
      // Filter
      filter_main_only: i.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(i.filter_allow_prefixes) ? i.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(i.filter_exclude) ? i.filter_exclude.map(String) : [],
      rows: n
    };
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
  shiftRowOpenAfterInsert(t) {
    const e = {};
    for (const [i, r] of Object.entries(this._ui.rowOpen)) {
      const s = Number(i);
      Number.isNaN(s) || (e[s >= t ? s + 1 : s] = r);
    }
    this._ui.rowOpen = e;
  }
  shiftRowOpenAfterRemove(t) {
    const e = {};
    for (const [i, r] of Object.entries(this._ui.rowOpen)) {
      const s = Number(i);
      Number.isNaN(s) || s === t || (e[s > t ? s - 1 : s] = r);
    }
    this._ui.rowOpen = e;
  }
  rgbaFromHex(t, e) {
    const i = Q(t);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${$(e)})` : `rgba(0,0,0,${$(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const r = (t ?? "").toString().trim();
    if (r.startsWith("#"))
      return Q(r) ? { hex: r, alpha: $(i) } : { hex: e, alpha: $(i) };
    const s = r.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (s) {
      const c = Math.max(0, Math.min(255, Number(s[1]))), l = Math.max(0, Math.min(255, Number(s[2]))), a = Math.max(0, Math.min(255, Number(s[3]))), d = $(Number(s[4])), h = (u) => u.toString(16).padStart(2, "0");
      return { hex: `#${h(c)}${h(l)}${h(a)}`, alpha: d };
    }
    const n = r.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (n) {
      const c = Math.max(0, Math.min(255, Number(n[1]))), l = Math.max(0, Math.min(255, Number(n[2]))), a = Math.max(0, Math.min(255, Number(n[3]))), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(c)}${d(l)}${d(a)}`, alpha: $(i) };
    }
    return { hex: e, alpha: $(i) };
  }
  setHighlightRgba(t, e, i) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, i) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((s) => s.trim()).filter((s) => s.length), i = (this._config.rows ?? []).map((s) => {
      if (S(s)) return s;
      const n = s, c = Array.from({ length: e.length }, (a, d) => {
        var h;
        return (((h = n.cells) == null ? void 0 : h[d]) ?? "").toString();
      }), l = Array.from({ length: e.length }, (a, d) => {
        var h;
        return Y((h = n.cell_styles) == null ? void 0 : h[d]);
      });
      return { ...n, cells: c, cell_styles: l };
    });
    this.emit({ ...this._config, days: e, rows: i });
    const r = {};
    Object.entries(this._ui.rowOpen).forEach(([s, n]) => {
      const c = Number(s);
      !Number.isNaN(c) && c >= 0 && c < i.length && (r[c] = n);
    }), this._ui.rowOpen = r;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((r, s) => {
      if (s !== t) return r;
      if (S(r)) return { ...r, time: e };
      const n = r, c = z(n.time), l = z(e), a = (n.start ?? "").toString().trim(), d = (n.end ?? "").toString().trim(), h = !a || !!c.start && a === c.start, u = !d || !!c.end && d === c.end;
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
    const i = this._config.rows.map(
      (r, s) => s !== t || S(r) ? r : { ...r, start: e || void 0 }
    );
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map(
      (r, s) => s !== t || S(r) ? r : { ...r, end: e || void 0 }
    );
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const r = this._config.rows.map((s, n) => {
      if (n !== t || S(s)) return s;
      const c = s, l = Array.isArray(c.cells) ? [...c.cells] : [];
      return l[e] = i, { ...c, cells: l };
    });
    this.emit({ ...this._config, rows: r });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const r = this._config.rows.map((s, n) => {
      if (n !== t || S(s)) return s;
      const c = s, l = Array.isArray(c.cell_styles) ? [...c.cell_styles] : Array.from({ length: this._config.days.length }, () => null), d = { ...l[e] ? { ...l[e] } : {}, ...i };
      return typeof d.bg_alpha == "number" && (d.bg_alpha = $(d.bg_alpha)), l[e] = Y(d), { ...c, cell_styles: l };
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
      const r = t + 1;
      this.shiftRowOpenAfterInsert(r), i.splice(r, 0, e);
    } else
      i.push(e);
    this.emit({ ...this._config, rows: i });
  }
  addBreakRow(t) {
    if (!this._config) return;
    const e = { break: !0, time: "", label: "Pause" }, i = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < i.length) {
      const r = t + 1;
      this.shiftRowOpenAfterInsert(r), i.splice(r, 0, e);
    } else
      i.push(e);
    this.emit({ ...this._config, rows: i });
  }
  removeRow(t) {
    if (!this._config) return;
    const e = this._config.rows.filter((i, r) => r !== t);
    this.shiftRowOpenAfterRemove(t), this.emit({ ...this._config, rows: e });
  }
  async jumpToCell(t, e) {
    var s, n;
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((c) => requestAnimationFrame(() => c(null))), await new Promise((c) => requestAnimationFrame(() => c(null)));
    const i = `sp-cell-${t}-${e}`, r = (s = this.renderRoot) == null ? void 0 : s.getElementById(i);
    r && (r.scrollIntoView({ behavior: "smooth", block: "center" }), (n = r.focus) == null || n.call(r));
  }
  uiSwitch(t, e) {
    return g`
      <label class="switch">
        <input type="checkbox" .checked=${t} @change=${(i) => e(!!i.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }
  panel(t, e, i, r) {
    return g`
      <details class="panel" ?open=${e} @toggle=${(s) => i(!!s.target.open)}>
        <summary>
          <div class="panelTitle">${t}</div>
        </summary>
        <div class="panelBody">${r}</div>
      </details>
    `;
  }
  renderEditorPreview() {
    if (!this._config) return g``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], i = this._config.rows ?? [];
    return g`
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
              ${e.map((r) => g`<th>${r}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${i.map((r, s) => {
      if (S(r))
        return g`
                  <tr class="p-break">
                    <td class="p-time">${r.time}</td>
                    <td colspan=${e.length}>${r.label ?? ""}</td>
                  </tr>
                `;
      const n = r;
      return g`
                <tr>
                  <td class="p-time">${n.time}</td>
                  ${e.map((c, l) => {
        var h, u;
        const a = (((h = n.cells) == null ? void 0 : h[l]) ?? "").toString(), d = ((u = n.cell_styles) == null ? void 0 : u[l]) ?? null;
        return g`
                      <td
                        class="p-cell"
                        style=${ct(d, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(s, l)}
                      >
                        ${a}
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
    return this._config ? g`
      <div class="grid2">
        <div class="field">
          <label class="lbl">Titel</label>
          <input
            class="in"
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(t) => this.emit({ ...this._config, title: t.target.value })}
          />
        </div>

        <div class="field">
          <label class="lbl">Tage (Komma getrennt)</label>
          <input
            class="in"
            type="text"
            .value=${(this._config.days ?? []).join(", ")}
            @input=${(t) => this.setDaysFromString(t.target.value)}
          />
          <div class="sub">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>
      </div>
    ` : g``;
  }
  renderHighlighting() {
    if (!this._config) return g``;
    const t = this._config;
    return g`
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
            <div class="sub">
              Unterdrückt „Aktuell“-Highlights, wenn die heutige Zelle in der aktuellen Stunde leer ist, oder "-" bzw.
              "---" eingetragen wird.
            </div>
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
  colorRow(t, e, i, r, s, n) {
    const c = Math.round($(i.alpha) * 100);
    return g`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${i.hex} @input=${(l) => r(l.target.value)} />
          <div class="range">
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(c)}
              @input=${(l) => s(Number(l.target.value) / 100)}
            />
            <div class="pct">${c}%</div>
          </div>
        </div>

        <div class="mono">${n}</div>
      </div>
    `;
  }
  renderColors() {
    if (!this._config) return g``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), e = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return g`
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
              <input
                class="col"
                type="color"
                .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()}
                @input=${(i) => this.setHighlightHexOnly("highlight_current_text_color", i.target.value)}
              />
              <input
                class="in"
                type="text"
                .value=${this._config.highlight_current_text_color ?? "#ff1744"}
                @input=${(i) => this.emit({ ...this._config, highlight_current_text_color: i.target.value })}
              />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Textfarbe: Zeitspalte (aktuelle Stunde)</label>
            <div class="inRow">
              <input
                class="col"
                type="color"
                .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()}
                @input=${(i) => this.setHighlightHexOnly("highlight_current_time_text_color", i.target.value)}
              />
              <input
                class="in"
                type="text"
                .value=${this._config.highlight_current_time_text_color ?? "#ff9100"}
                @input=${(i) => this.emit({ ...this._config, highlight_current_time_text_color: i.target.value })}
              />
            </div>
          </div>
        </div>

        <div class="sub">
          Tipp: Du kannst auch <span class="mono">rgb()/rgba()</span> oder <span class="mono">var(--...)</span> Werte
          direkt in YAML setzen – der Editor hält es kompatibel.
        </div>
      </div>
    `;
  }
  renderSources() {
    if (!this._config) return g``;
    const t = this._config;
    return g`
      <div class="stack">
        <div class="sub">Datenquelle: Entity (JSON) oder manuell. Wechselwochen A/B optional.</div>

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

          <div class="sub">Mapping: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span></div>

          <div class="divider"></div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity_a</label>
              <input class="in" type="text" .value=${t.source_entity_a ?? ""} @input=${(e) => this.emit({ ...t, source_entity_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_a</label>
              <input class="in" type="text" .value=${t.source_attribute_a ?? ""} @input=${(e) => this.emit({ ...t, source_attribute_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_entity_b</label>
              <input class="in" type="text" .value=${t.source_entity_b ?? ""} @input=${(e) => this.emit({ ...t, source_entity_b: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_b</label>
              <input class="in" type="text" .value=${t.source_attribute_b ?? ""} @input=${(e) => this.emit({ ...t, source_attribute_b: e.target.value })} />
            </div>
          </div>
        </div>

        <div class="panelMinor">
          <div class="minorTitle">Single-Source (Legacy / einfach)</div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity</label>
              <input class="in" type="text" .value=${t.source_entity ?? ""} @input=${(e) => this.emit({ ...t, source_entity: e.target.value })} />
            </div>

            <div class="field">
              <label class="lbl">source_attribute</label>
              <input class="in" type="text" .value=${t.source_attribute ?? ""} @input=${(e) => this.emit({ ...t, source_attribute: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">source_time_key</label>
            <input class="in" type="text" .value=${t.source_time_key ?? "Stunde"} @input=${(e) => this.emit({ ...t, source_time_key: e.target.value })} />
          </div>
        </div>
      </div>
    `;
  }
  renderRows() {
    if (!this._config) return g``;
    const t = this._config, e = t.days ?? [];
    return g`
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

      ${(t.rows ?? []).map((i, r) => {
      const s = S(i), n = s ? `Pause · ${i.time ?? ""}` : `Stunde · ${i.time ?? ""}`, c = s ? i.label ?? "Pause" : "", l = i;
      return g`
          <details class="rowPanel" ?open=${this._ui.rowOpen[r] ?? !1} @toggle=${(a) => this._ui.rowOpen[r] = !!a.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${n || `Zeile ${r + 1}`}</div>
                <div class="rowHeadMeta">${s ? c : `${(l.start ?? "") || "Start?"} – ${(l.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${i.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(a) => this.updateRowTime(r, a.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(s, (a) => this.toggleBreak(r, a))}
                  </div>
                </div>
              </div>

              ${s ? g`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${i.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(a) => this.updateBreakLabel(r, a.target.value)} />
                    </div>
                  ` : g`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${l.start ?? ""} placeholder="z.B. 07:45" @input=${(a) => this.updateRowStart(r, a.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${l.end ?? ""} placeholder="z.B. 08:30" @input=${(a) => this.updateRowEnd(r, a.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((a, d) => {
        var w, C;
        const h = (((w = l.cells) == null ? void 0 : w[d]) ?? "").toString(), u = ((C = l.cell_styles) == null ? void 0 : C[d]) ?? null, _ = u != null && u.bg && u.bg.startsWith("#") ? u.bg : "#3b82f6", m = typeof (u == null ? void 0 : u.bg_alpha) == "number" ? $(u.bg_alpha) : 0.18, b = Math.round(m * 100), p = u != null && u.color && u.color.startsWith("#") ? u.color : "#ffffff", y = `sp-cell-${r}-${d}`, v = ct(u, "1px solid var(--divider-color)");
        return g`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${a}</div>
                              <div class="cellMiniPreview" style=${v} title="Zellvorschau">${h || "…"}</div>
                            </div>

                            <input id=${y} class="in" type="text" .value=${h} placeholder="Fach" @input=${(x) => this.updateRowCell(r, d, x.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${_} @input=${(x) => this.updateCellStyle(r, d, { bg: x.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(b)} @input=${(x) => this.updateCellStyle(r, d, { bg_alpha: Number(x.target.value) / 100 })} />
                                  <div class="pct">${b}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${p} @input=${(x) => this.updateCellStyle(r, d, { color: x.target.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowActions">
                <button class="btn" @click=${() => this.addLessonRow(r)}>+ Stunde darunter</button>
                <button class="btn" @click=${() => this.addBreakRow(r)}>+ Pause darunter</button>
                <button class="btn danger" @click=${() => this.removeRow(r)}>Löschen</button>
              </div>
            </div>
          </details>
        `;
    })}
    `;
  }
  render() {
    return this._config ? g`
      ${this.renderEditorPreview()}
      ${this.panel("Allgemein", this._ui.openGeneral, (t) => this._ui.openGeneral = t, this.renderGeneral())}
      ${this.panel("Highlights", this._ui.openHighlight, (t) => this._ui.openHighlight = t, this.renderHighlighting())}
      ${this.panel("Farben", this._ui.openColors, (t) => this._ui.openColors = t, this.renderColors())}
      ${this.panel("Datenquellen", this._ui.openSources, (t) => this._ui.openSources = t, this.renderSources())}
      ${this.panel("Zeilen & Fächer", this._ui.openRows, (t) => this._ui.openRows = t, this.renderRows())}
    ` : g``;
  }
};
et.properties = {
  hass: {},
  _config: { state: !0 }
}, et.styles = Ht`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 0;
    }

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
let ht = et;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", tt);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", ht);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor (ohne Stundenplan24 XML)",
  preview: !0
});
export {
  tt as StundenplanCard,
  ht as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
