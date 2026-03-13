const bt = globalThis, Bt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zt = /* @__PURE__ */ Symbol(), Yt = /* @__PURE__ */ new WeakMap();
let ae = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Bt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Yt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Yt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Se = (e) => new ae(typeof e == "string" ? e : e + "", void 0, zt), oe = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new ae(i, e, zt);
}, ke = (e, t) => {
  if (Bt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = bt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Jt = Bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Se(i);
})(e) : e, { is: Ae, defineProperty: Ee, getOwnPropertyDescriptor: Me, getOwnPropertyNames: De, getOwnPropertySymbols: Ce, getPrototypeOf: Te } = Object, U = globalThis, Gt = U.trustedTypes, je = Gt ? Gt.emptyScript : "", Ne = U.reactiveElementPolyfillSupport, ot = (e, t) => e, Mt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? je : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Wt = (e, t) => !Ae(e, t), Zt = { attribute: !0, type: String, converter: Mt, reflect: !1, useDefault: !1, hasChanged: Wt };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), U.litPropertyMetadata ?? (U.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let q = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Zt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Ee(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: n } = Me(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      n?.call(this, r), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ot("elementProperties"))) return;
    const e = Te(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ot("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ot("properties"))) {
      const t = this.properties, i = [...De(t), ...Ce(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(Jt(s));
    } else e !== void 0 && t.push(Jt(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ke(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Mt).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Mt;
      this._$Em = s;
      const a = r.fromAttribute(t, n.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[e]), i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? Wt)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: n }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: r } = n, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[ot("elementProperties")] = /* @__PURE__ */ new Map(), q[ot("finalized")] = /* @__PURE__ */ new Map(), Ne?.({ ReactiveElement: q }), (U.reactiveElementVersions ?? (U.reactiveElementVersions = [])).push("2.1.2");
const lt = globalThis, Kt = (e) => e, Dt = lt.trustedTypes, qt = Dt ? Dt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, le = "$lit$", W = `lit$${Math.random().toFixed(9).slice(2)}$`, ce = "?" + W, Pe = `<${ce}>`, J = document, ht = () => J.createComment(""), ut = (e) => e === null || typeof e != "object" && typeof e != "function", Ht = Array.isArray, Re = (e) => Ht(e) || typeof e?.[Symbol.iterator] == "function", Nt = `[ 	
\f\r]`, nt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qt = /-->/g, Xt = />/g, V = RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), te = /'/g, ee = /"/g, he = /^(?:script|style|textarea|title)$/i, Oe = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = Oe(1), X = /* @__PURE__ */ Symbol.for("lit-noChange"), $ = /* @__PURE__ */ Symbol.for("lit-nothing"), ie = /* @__PURE__ */ new WeakMap(), Y = J.createTreeWalker(J, 129);
function ue(e, t) {
  if (!Ht(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qt !== void 0 ? qt.createHTML(t) : t;
}
const Be = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = nt;
  for (let o = 0; o < i; o++) {
    const l = e[o];
    let u, d, g = -1, _ = 0;
    for (; _ < l.length && (a.lastIndex = _, d = a.exec(l), d !== null); ) _ = a.lastIndex, a === nt ? d[1] === "!--" ? a = Qt : d[1] !== void 0 ? a = Xt : d[2] !== void 0 ? (he.test(d[2]) && (n = RegExp("</" + d[2], "g")), a = V) : d[3] !== void 0 && (a = V) : a === V ? d[0] === ">" ? (a = n ?? nt, g = -1) : d[1] === void 0 ? g = -2 : (g = a.lastIndex - d[2].length, u = d[1], a = d[3] === void 0 ? V : d[3] === '"' ? ee : te) : a === ee || a === te ? a = V : a === Qt || a === Xt ? a = nt : (a = V, n = void 0);
    const m = a === V && e[o + 1].startsWith("/>") ? " " : "";
    r += a === nt ? l + Pe : g >= 0 ? (s.push(u), l.slice(0, g) + le + l.slice(g) + W + m) : l + W + (g === -2 ? o : m);
  }
  return [ue(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class dt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [u, d] = Be(t, i);
    if (this.el = dt.createElement(u, s), Y.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (n = Y.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const g of n.getAttributeNames()) if (g.endsWith(le)) {
          const _ = d[a++], m = n.getAttribute(g).split(W), f = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: r, name: f[2], strings: m, ctor: f[1] === "." ? We : f[1] === "?" ? He : f[1] === "@" ? Ue : Ct }), n.removeAttribute(g);
        } else g.startsWith(W) && (l.push({ type: 6, index: r }), n.removeAttribute(g));
        if (he.test(n.tagName)) {
          const g = n.textContent.split(W), _ = g.length - 1;
          if (_ > 0) {
            n.textContent = Dt ? Dt.emptyScript : "";
            for (let m = 0; m < _; m++) n.append(g[m], ht()), Y.nextNode(), l.push({ type: 2, index: ++r });
            n.append(g[_], ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ce) l.push({ type: 2, index: r });
      else {
        let g = -1;
        for (; (g = n.data.indexOf(W, g + 1)) !== -1; ) l.push({ type: 7, index: r }), g += W.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = J.createElement("template");
    return s.innerHTML = t, s;
  }
}
function tt(e, t, i = e, s) {
  if (t === X) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = ut(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = tt(e, n._$AS(e, t.values), n, s)), t;
}
class ze {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? J).importNode(i, !0);
    Y.currentNode = n;
    let r = Y.nextNode(), a = 0, o = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new gt(r, r.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (u = new Le(r, this, t)), this._$AV.push(u), l = s[++o];
      }
      a !== l?.index && (r = Y.nextNode(), a++);
    }
    return Y.currentNode = J, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class gt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = tt(this, t, i), ut(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== X && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Re(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && ut(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = dt.createElement(ue(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new ze(n, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = ie.get(t.strings);
    return i === void 0 && ie.set(t.strings, i = new dt(t)), i;
  }
  k(t) {
    Ht(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new gt(this.O(ht()), this.O(ht()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = Kt(t).nextSibling;
      Kt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ct {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, r) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = $;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = tt(this, t, i, 0), a = !ut(t) || t !== this._$AH && t !== X, a && (this._$AH = t);
    else {
      const o = t;
      let l, u;
      for (t = r[0], l = 0; l < r.length - 1; l++) u = tt(this, o[s + l], i, l), u === X && (u = this._$AH[l]), a || (a = !ut(u) || u !== this._$AH[l]), u === $ ? t = $ : t !== $ && (t += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class We extends Ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class He extends Ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Ue extends Ct {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = tt(this, t, i, 0) ?? $) === X) return;
    const s = this._$AH, n = t === $ && s !== $ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== $ && (s === $ || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Le {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    tt(this, t);
  }
}
const Fe = lt.litHtmlPolyfillSupport;
Fe?.(dt, gt), (lt.litHtmlVersions ?? (lt.litHtmlVersions = [])).push("3.3.2");
const Ie = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new gt(t.insertBefore(ht(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
}, ct = globalThis;
class Q extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ie(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return X;
  }
}
Q._$litElement$ = !0, Q.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: Q });
const Ve = ct.litElementPolyfillSupport;
Ve?.({ LitElement: Q });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.2");
const Ye = { attribute: !0, type: String, converter: Mt, reflect: !1, hasChanged: Wt }, Je = (e = Ye, t, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, e, o), o;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function de(e) {
  return (t, i) => typeof i == "object" ? Je(e, t, i) : ((s, n, r) => {
    const a = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), a ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
function L(e) {
  return de({ ...e, state: !0, attribute: !1 });
}
var Ge = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, ge = (e) => {
  throw TypeError(e);
}, T = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ze(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Ge(t, i, n), n;
}, pe = (e, t, i) => t.has(e) || ge("Cannot " + i), O = (e, t, i) => (pe(e, t, "read from private field"), i ? i.call(e) : t.get(e)), B = (e, t, i) => t.has(e) ? ge("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), z = (e, t, i, s) => (pe(e, t, "write to private field"), t.set(e, i), i), wt, vt, xt, $t, St, kt, At, Et;
function H(e) {
  return !!e && e.break === !0;
}
function Ut(e) {
  return Math.min(1, Math.max(0, e));
}
function fe(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
  return [i, s, n].some((r) => Number.isNaN(r)) ? null : { r: i, g: s, b: n };
}
function Ke(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Ut(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function qe(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = fe(t);
  if (!i) return t;
  const s = typeof e.bg_alpha == "number" ? Ut(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
}
function Qe(e, t) {
  const i = [], s = qe(e);
  return s && i.push(`background:${s}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function se(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const s = fe(i);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${Ut(t)})` : i;
  }
  return i;
}
function rt(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function Rt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Xe(e) {
  switch (e) {
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
function ne(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const s = t.getUTCFullYear(), n = new Date(Date.UTC(s, 0, 1)), r = n.getUTCDay() === 0 ? 7 : n.getUTCDay(), a = new Date(n);
  a.setUTCDate(n.getUTCDate() + (4 - r));
  const o = t.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(o / (10080 * 60 * 1e3)), isoYear: s };
}
function re(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function yt(e) {
  const t = (e ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "—" || /^(—|\-|–|\s)+$/.test(t));
}
function ti(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), s = i.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const n = i.match(/^stundenplan_woche_(.+)$/i);
  return n?.[1] ? `number.${n[1]}_woche_offset` : "";
}
function Pt(e) {
  const t = Rt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var at;
const j = (at = class extends Q {
  constructor() {
    super(...arguments), B(this, wt), B(this, vt), B(this, xt, []), B(this, $t, !1), B(this, St, ""), B(this, kt, null), B(this, At, "idle"), B(this, Et, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return O(this, wt);
  }
  set hass(e) {
    z(this, wt, e);
    try {
      const t = this.config;
      if ((t?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (t?.view_mode ?? "week").toString(), u = Number(t?.days_ahead), d = Number.isFinite(u) ? Math.max(0, Math.min(6, Math.floor(u))) : 0;
          if (l === "rolling" && d === 0) {
            const g = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (g && e?.states?.[g]) {
              const _ = Number(e.states[g].state);
              Number.isFinite(_) && _ !== 0 && (e.callService("number", "set_value", { entity_id: g, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const m = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim();
                  m && this.hass?.callService("homeassistant", "update_entity", { entity_id: m });
                } catch {
                }
              }, 400));
            }
          }
        } catch {
        }
        const s = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim(), n = e, a = (s ? n?.states?.[s] : void 0)?.attributes ?? {}, o = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (s && o) {
          let l = ((t?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = s.replace(/^sensor\./, "number.") + "_offset");
          const u = l && n?.states && l in n.states, d = s + "|" + l;
          if (u && this.__autokickSig !== d) {
            this.__autokickSig = d;
            const g = n.states[l]?.state, _ = Number(g), m = Number.isFinite(_) ? _ : 0;
            n.callService("number", "set_value", { entity_id: l, value: m }).catch?.(() => {
            }), window.setTimeout(() => {
              try {
                this.hass?.callService("homeassistant", "update_entity", { entity_id: s });
              } catch {
              }
            }, 600);
          }
        }
      }
    } catch {
    }
  }
  get config() {
    return O(this, vt);
  }
  set config(e) {
    z(this, vt, e);
  }
  get _rowsCache() {
    return O(this, xt);
  }
  set _rowsCache(e) {
    z(this, xt, e);
  }
  get _noData() {
    return O(this, $t);
  }
  set _noData(e) {
    z(this, $t, e);
  }
  get _noDataMsg() {
    return O(this, St);
  }
  set _noDataMsg(e) {
    z(this, St, e);
  }
  get _jsonRows() {
    return O(this, kt);
  }
  set _jsonRows(e) {
    z(this, kt, e);
  }
  get _jsonStatus() {
    return O(this, At);
  }
  set _jsonStatus(e) {
    z(this, At, e);
  }
  get _jsonError() {
    return O(this, Et);
  }
  set _jsonError(e) {
    z(this, Et, e);
  }
  getWatchedEntities(e) {
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      const n = (s ?? "").toString().trim();
      n && t.add(n);
    };
    return i(e.week_offset_entity), i(e.source_entity), i(e.source_entity_integration), i(e.source_entity_legacy), i(e.source_entity_a), i(e.source_entity_b), i(e.week_map_entity), Array.from(t);
  }
  getEntitySig(e) {
    const t = this.hass?.states?.[e];
    if (!t) return `${e}:<missing>`;
    const i = t.last_updated ?? "", s = t.last_changed ?? "", n = t.state ?? "", r = t.attributes ?? {}, a = r.plan ?? r.rows ?? r.rows_table ?? r.rows_json ?? r.rows_ha, o = Array.isArray(a) || typeof a == "string" ? a.length : 0;
    return `${e}|${i}|${s}|${n}|rowsLen=${o}`;
  }
  computeWatchSig(e) {
    const t = this.getWatchedEntities(e).map((n) => this.getEntitySig(n)), i = e.week_mode !== "off" ? this.getActiveWeek(e) : "off", s = this.getWeekOffsetValue(e);
    return `week=${i}|off=${s ?? "null"}::` + t.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const e = this.computeWatchSig(this.config);
    e !== this._lastWatchSig && (this._lastWatchSig = e, this.recomputeRows());
  }
  getWeekOffsetValue(e) {
    const t = (e.week_offset_entity ?? "").trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t], s = (e.week_offset_attribute ?? "").trim(), n = s ? i.attributes?.[s] : i.state, r = Number(n);
    return Number.isFinite(r) ? r : null;
  }
  async setWeekOffset(e, t) {
    const i = (e.week_offset_entity ?? "").trim();
    if (!i) return;
    const s = this.hass?.states?.[i], n = s?.attributes?.min, r = s?.attributes?.max, a = Number.isFinite(Number(n)) ? Number(n) : -52, o = Number.isFinite(Number(r)) ? Number(r) : 52;
    let l = t;
    l = Math.max(a, l), l = Math.min(o, l);
    const u = i.split(".")[0] === "input_number" ? "input_number" : "number";
    await this.hass.callService(u, "set_value", { entity_id: i, value: l });
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this.requestUpdate();
    }, 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  updated(e) {
    if (super.updated(e), e.has("config")) {
      this.recomputeRows(), this._lastWatchSig = null;
      return;
    }
    if (e.has("hass")) {
      if (this.config) {
        const t = this.getWeekOffsetValue(this.config);
        this._uiWeekOffset != null && t === this._uiWeekOffset && (this._uiWeekOffset = null), t !== this._lastWeekOffset && (this._lastWeekOffset = t);
      }
      this.recomputeRowsIfWatchedChanged();
    }
  }
  static getStubConfig() {
    return {
      type: "custom:stundenplan-card",
      title: "Mein Stundenplan",
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      view_mode: "week",
      days_ahead: 0,
      next_day_jump_mode: "midnight",
      rolling_cutoff_time: "",
      highlight_next_day_after_last_time: !1,
      show_header_date: !0,
      font_family: "",
      font_size: 14,
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
      source_entity_integration: "",
      source_entity_legacy: "",
      source_attribute: "rows_table",
      source_time_key: "time",
      source_type: "manual",
      json_url: "",
      no_data_text: "Keine Daten für diesen Zeitraum (Ferien/Feiertag).",
      week_offset_entity: "",
      week_offset_attribute: "",
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
      filter_main_only: !0,
      filter_allow_prefixes: [],
      filter_exclude: [],
      rows: []
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(e) {
    const t = at.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
    if (!(i === "custom:stundenplan-card" || i === "stundenplan-card")) {
      this.config = this.normalizeConfig(t), this.recomputeRows();
      return;
    }
    this.config = this.normalizeConfig({ ...t, ...e, type: i }), this.recomputeRows(), this._lastWatchSig = null;
  }
  getCardSize() {
    const e = this.config?.rows?.length ?? 3;
    return Math.max(3, e);
  }
  normalizeConfig(e) {
    const t = at.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((b) => (b ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(e.rows) ? e.rows : []).map((b) => {
      if (H(b))
        return { break: !0, time: (b.time ?? "").toString(), label: (b.label ?? "Pause").toString() };
      const k = Array.isArray(b?.cells) ? b.cells : [], F = Array.from({ length: i.length }, (E, C) => (k[C] ?? "").toString()), I = Array.isArray(b?.cell_styles) ? b.cell_styles : [], et = Array.from({ length: i.length }, (E, C) => Ke(I[C])), it = (b?.time ?? "").toString(), pt = rt(it), y = (b?.start ?? "").toString().trim(), w = (b?.end ?? "").toString().trim(), N = {
        time: it,
        start: y || pt.start || void 0,
        end: w || pt.end || void 0,
        cells: F
      };
      return et.some((E) => !!E) && (N.cell_styles = et), N;
    }), n = ((e.view_mode ?? "week") + "").toString().trim(), r = n === "rolling" ? "rolling" : "week", a = Number(e.days_ahead), o = Number.isFinite(a) ? Math.max(0, Math.min(6, Math.floor(a))) : 0, l = (e.font_family ?? t.font_family ?? "").toString().trim(), u = {
      "var(--ha-card-header-font-family, var(--primary-font-family, inherit))": "system",
      '"Segoe UI", Arial, sans-serif': "segoe",
      "Arial, Helvetica, sans-serif": "arial",
      "Verdana, Geneva, sans-serif": "verdana",
      '"Trebuchet MS", Arial, sans-serif': "trebuchet",
      '"Gill Sans", "Gill Sans MT", Calibri, sans-serif': "gillsans",
      'Georgia, "Times New Roman", serif': "georgia",
      '"Palatino Linotype", "Book Antiqua", Palatino, serif': "palatino",
      '"Courier New", Courier, monospace': "courier"
    }, d = u[l] ?? l, g = ((e.next_day_jump_mode ?? "") + "").toString().trim(), _ = g === "after_last_lesson" || g === "fixed_time" || g === "midnight" ? g : e.highlight_next_day_after_last_time ? "after_last_lesson" : (e.rolling_cutoff_time ?? "").toString().trim() ? "fixed_time" : "midnight", m = ((e.week_mode ?? t.week_mode) + "").toString().trim(), f = m === "kw_parity" || m === "week_map" || m === "off" ? m : "off", c = (() => {
      const b = ((e.source_type ?? "") + "").toString().trim();
      if (b === "manual" || b === "entity" || b === "json" || b === "sensor") return b;
      const k = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (k) {
        const F = ((e.source_attribute ?? "") + "").toString().trim(), I = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(k) && (F === "" || F === "rows_table") && (I === "" || I === "time")) && (F || I) ? "legacy" : "entity";
      }
      return "manual";
    })(), p = (e.source_entity ?? t.source_entity).toString().trim(), x = (e.source_entity_integration ?? "").toString().trim(), S = (e.source_entity_legacy ?? "").toString().trim(), D = c === "sensor" ? S || p : c === "entity" && x || p, v = (e.week_offset_entity ?? "").toString().trim() || ti(D);
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      days: i,
      view_mode: r,
      days_ahead: o,
      next_day_jump_mode: _,
      rolling_cutoff_time: (e.rolling_cutoff_time ?? t.rolling_cutoff_time ?? "").toString(),
      highlight_next_day_after_last_time: e.highlight_next_day_after_last_time ?? t.highlight_next_day_after_last_time,
      show_header_date: e.show_header_date ?? t.show_header_date,
      font_family: d,
      font_size: Number.isFinite(Number(e.font_size)) ? Math.max(10, Math.min(28, Number(e.font_size))) : t.font_size,
      highlight_today: e.highlight_today ?? t.highlight_today,
      highlight_current: e.highlight_current ?? t.highlight_current,
      highlight_breaks: e.highlight_breaks ?? t.highlight_breaks,
      free_only_column_highlight: e.free_only_column_highlight ?? t.free_only_column_highlight,
      highlight_today_color: (e.highlight_today_color ?? t.highlight_today_color).toString(),
      highlight_current_color: (e.highlight_current_color ?? t.highlight_current_color).toString(),
      highlight_current_text: e.highlight_current_text ?? t.highlight_current_text,
      highlight_current_text_color: (e.highlight_current_text_color ?? t.highlight_current_text_color).toString(),
      highlight_current_time_text: e.highlight_current_time_text ?? t.highlight_current_time_text,
      highlight_current_time_text_color: (e.highlight_current_time_text_color ?? t.highlight_current_time_text_color).toString(),
      source_entity: D,
      source_entity_integration: x || "",
      source_entity_legacy: S || "",
      source_attribute: c === "entity" ? "rows_table" : ((e.source_attribute ?? t.source_attribute ?? "plan") + "").toString(),
      source_time_key: c === "entity" ? "time" : ((e.source_time_key ?? t.source_time_key ?? "Stunde") + "").toString(),
      source_type: c,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: v,
      week_offset_attribute: (e.week_offset_attribute ?? "").toString(),
      week_mode: f,
      week_a_is_even_kw: e.week_a_is_even_kw ?? t.week_a_is_even_kw,
      week_map_entity: (e.week_map_entity ?? t.week_map_entity).toString(),
      week_map_attribute: (e.week_map_attribute ?? t.week_map_attribute).toString(),
      source_entity_a: (e.source_entity_a ?? t.source_entity_a).toString(),
      source_attribute_a: (e.source_attribute_a ?? t.source_attribute_a).toString(),
      source_entity_b: (e.source_entity_b ?? t.source_entity_b).toString(),
      source_attribute_b: (e.source_attribute_b ?? t.source_attribute_b).toString(),
      filter_main_only: e.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(e.filter_allow_prefixes) ? e.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(e.filter_exclude) ? e.filter_exclude.map(String) : [],
      rows: s
    };
  }
  toYmd(e) {
    return `${e.getFullYear()}${String(e.getMonth() + 1).padStart(2, "0")}${String(e.getDate()).padStart(2, "0")}`;
  }
  parseClockToMinutes(e) {
    const t = (e ?? "").toString().trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!t) return null;
    const i = Number(t[1]), s = Number(t[2]);
    return Number.isFinite(i) && Number.isFinite(s) && i >= 0 && i <= 23 && s >= 0 && s <= 59 ? i * 60 + s : null;
  }
  getRollingAnchorDate(e, t = this._rowsCache ?? []) {
    return (this.getWeekOffsetValue(e) ?? 0) !== 0 ? this.mondayOfWeek(this.getBaseDate(e)) : this.getEffectiveDaySwitchDate(e, t);
  }
  getDataIndexForDate(e, t, i) {
    const s = this.toYmd(i);
    if (Array.isArray(t) && t.length) {
      const a = t.map((o) => {
        if (o instanceof Date && !Number.isNaN(o.getTime())) return this.toYmd(o);
        const l = (o ?? "").toString().trim(), u = l.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return u ? `${u[1]}${u[2]}${u[3]}` : l;
      }).indexOf(s);
      if (a >= 0) return { dataIndex: a, exactMatch: !0 };
    }
    const n = i.getDay() === 0 ? 7 : i.getDay();
    for (let r = 0; r < (e ?? []).length; r++)
      if (Pt(e[r]) === n) return { dataIndex: r, exactMatch: !1 };
    return { dataIndex: -1, exactMatch: !1 };
  }
  getTodayIndex(e, t, i = /* @__PURE__ */ new Date()) {
    const s = this.toYmd(i);
    if (Array.isArray(t) && t.length) {
      const l = t.map((u) => {
        if (u instanceof Date && !Number.isNaN(u.getTime())) return this.toYmd(u);
        const d = (u ?? "").toString().trim(), g = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return g ? `${g[1]}${g[2]}${g[3]}` : d;
      }).indexOf(s);
      return l >= 0 ? l : -1;
    }
    const n = i.getDay(), r = new Set(Xe(n).map(Rt));
    if (!r.size) return -1;
    const a = (e ?? []).map((o) => Rt(o));
    for (let o = 0; o < a.length; o++) if (r.has(a[o])) return o;
    return -1;
  }
  getVisibleDayEntries(e, t) {
    const i = e.days ?? [], s = (e.view_mode ?? "week").toString(), n = Number(e.days_ahead), r = Number.isFinite(n) ? Math.max(0, Math.min(14, Math.floor(n))) : 0;
    if (s !== "rolling")
      return i.map((l, u) => ({ label: l, dataIndex: u, headerDate: null }));
    const a = [], o = this.getRollingAnchorDate(e);
    for (let l = 0; l < 21 && a.length < r + 1; l++) {
      const u = new Date(o);
      u.setDate(o.getDate() + l);
      const d = this.getDataIndexForDate(i, t, u);
      d.dataIndex >= 0 && a.push({ label: i[d.dataIndex], dataIndex: d.dataIndex, headerDate: u, exactMatch: d.exactMatch });
    }
    return a.length ? a : i.map((l, u) => ({ label: l, dataIndex: u, headerDate: null, exactMatch: !0 }));
  }
  toMinutes(e) {
    if (!e) return null;
    const [t, i] = e.split(":").map((s) => Number(s));
    return [t, i].some((s) => Number.isNaN(s)) ? null : t * 60 + i;
  }
  isNowBetween(e, t) {
    const i = this.toMinutes(e), s = this.toMinutes(t);
    if (i == null || s == null) return !1;
    const n = /* @__PURE__ */ new Date(), r = n.getHours() * 60 + n.getMinutes();
    return r >= i && r < s;
  }
  parseAnyJson(e) {
    if (e == null) return null;
    if (typeof e == "string") {
      const t = e.trim();
      if (!t) return null;
      try {
        return JSON.parse(t);
      } catch {
        return null;
      }
    }
    return e;
  }
  readEntityJson(e, t) {
    const i = (e ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const s = this.hass.states[i], n = (t ?? "").toString().trim(), r = n ? s.attributes?.[n] : s.state;
    return this.parseAnyJson(r);
  }
  buildRowsFromArray(e, t) {
    if (!Array.isArray(t)) return null;
    const i = e.days ?? [], s = (e.source_time_key ?? "time").toString().trim(), n = "Stunde", r = "time", a = t.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o?.time ?? o?.[s] ?? o?.[n] ?? o?.[r] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[s] ?? o?.[n] ?? o?.[r] ?? "").toString(), u = rt(l), d = Array.from({ length: i.length }, (m, f) => {
        const c = (i[f] ?? "").toString();
        return (o?.[c] ?? "").toString();
      }), g = (o?.start ?? "").toString().trim() || u.start, _ = (o?.end ?? "").toString().trim() || u.end;
      return { time: l, start: g || void 0, end: _ || void 0, cells: d };
    });
    return a.length ? a : null;
  }
  getRowsFromEntity(e, t, i) {
    let s = this.readEntityJson(t, i);
    if (s == null && i && (i + "").toString().trim() && (i + "").toString().trim() !== "plan" && (s = this.readEntityJson(t, "plan")), s == null && (s = this.readEntityJson(t, "rows_ha")), s == null && (s = this.readEntityJson(t, "rows")), s == null && (s = this.readEntityJson(t, "rows_table")), s == null && (s = this.readEntityJson(t, "rows_json")), s && typeof s == "object" && !Array.isArray(s)) {
      const n = s.plan, r = s.rows;
      Array.isArray(n) ? s = n : Array.isArray(r) && (s = r);
    }
    return Array.isArray(s) ? this.buildRowsFromArray(e, s) : null;
  }
  async loadJsonRows(e, t) {
    const i = (t ?? "").toString().trim();
    if (!i) {
      this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = "";
      return;
    }
    this._jsonStatus = "loading", this._jsonError = "";
    try {
      const s = await fetch(i, { cache: "no-store" });
      if (!s.ok) throw new Error(`HTTP ${s.status}`);
      const n = await s.json(), r = Array.isArray(n) ? n : Array.isArray(n?.rows) ? n.rows : null, a = r ? this.buildRowsFromArray(e, r) : null;
      this._jsonRows = a ?? [], this._jsonStatus = "ok";
    } catch (s) {
      this._jsonRows = [], this._jsonStatus = "error", this._jsonError = (s?.message ?? "JSON konnte nicht geladen werden").toString();
    } finally {
      this.requestUpdate();
    }
  }
  ensureJsonLoaded(e) {
    const t = (e.json_url ?? "").toString().trim();
    t === this._jsonUrlLast && this._jsonStatus !== "error" || (t !== this._jsonUrlLast && (this._jsonUrlLast = t, this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = ""), this._jsonStatus === "idle" && t && this.loadJsonRows(e, t));
  }
  weekFromParity(e) {
    const { isoWeek: t } = ne(/* @__PURE__ */ new Date()), i = t % 2 === 0, s = !!e.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(t, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: n, isoYear: r } = ne(/* @__PURE__ */ new Date()), a = String(n), o = String(r);
    if (s?.[o] && typeof s[o] == "object") {
      const u = re(s[o][a]);
      if (u) return u;
    }
    return re(s?.[a]) || null;
  }
  getActiveWeek(e) {
    return e.week_mode === "week_map" ? this.weekFromMap(e) ?? this.weekFromParity(e) : e.week_mode === "kw_parity" ? this.weekFromParity(e) : "A";
  }
  filterCellText(e, t) {
    return (e ?? "").toString().trim();
  }
  getBaseDate(e) {
    const t = this.getWeekOffsetValue(e) ?? 0, i = /* @__PURE__ */ new Date();
    return i.setHours(12, 0, 0, 0), i.setDate(i.getDate() + t * 7), i;
  }
  mondayOfWeek(e) {
    const t = new Date(e), i = t.getDay() === 0 ? 7 : t.getDay();
    return t.setDate(t.getDate() - (i - 1)), t.setHours(12, 0, 0, 0), t;
  }
  fmtDDMMYYYY(e) {
    const t = String(e.getDate()).padStart(2, "0"), i = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getFullYear());
    return `${t}.${i}.${s}`;
  }
  getCardInlineStyle(e) {
    const t = this.resolveFontFamily((e.font_family ?? "").toString().trim()), i = Number(e.font_size), s = Number.isFinite(i) ? Math.max(10, Math.min(28, i)) : 14, n = s / 14, r = [];
    return t && r.push(`--sp-font-family:${t}`), r.push(`--sp-font-size:${s}px`), r.push(`--sp-font-scale:${n}`), r.join(";");
  }
  resolveFontFamily(e) {
    const t = (e ?? "").toString().trim(), i = {
      "": "",
      system: "var(--ha-card-header-font-family, var(--primary-font-family, inherit))",
      segoe: '"Segoe UI", Arial, sans-serif',
      arial: "Arial, Helvetica, sans-serif",
      verdana: "Verdana, Geneva, sans-serif",
      trebuchet: '"Trebuchet MS", Arial, sans-serif',
      gillsans: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      georgia: 'Georgia, "Times New Roman", serif',
      palatino: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      courier: '"Courier New", Courier, monospace'
    };
    return t in i ? i[t] : t;
  }
  getSourceMeta(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? e.entity ?? "" ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? e.entity ?? "" ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {};
    return i?.meta_ha ?? i?.meta ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json) : null) ?? null;
  }
  getVplanHintForDate(e, t) {
    const i = this.getSourceMeta(e);
    if (!i || !t?.headerDate) return "";
    const s = this.toYmd(t.headerDate), n = i?.vplan_available_by_date?.[s];
    return typeof n == "boolean" ? n ? "" : "(noch keine Vp-Daten vorhanden)" : "";
  }
  getExactCellForDate(e, t, i) {
    const s = this.getSourceMeta(e);
    if (!s || !t?.headerDate || !i?.time) return null;
    const n = this.toYmd(t.headerDate), r = s?.exact_cells_by_date_time?.[n];
    if (!r || typeof r != "object") return null;
    const a = r?.[i.time];
    return typeof a == "string" ? a : null;
  }
  getExactUpdatedForDate(e, t) {
    const i = this.getSourceMeta(e);
    if (!i || !t?.headerDate) return "";
    const s = this.toYmd(t.headerDate), n = i?.exact_updated_by_date?.[s];
    return typeof n == "string" ? n : "";
  }
  getCurrentVisibleIndex(e, t = /* @__PURE__ */ new Date()) {
    const i = this.toYmd(t);
    for (let s = 0; s < (e ?? []).length; s++) {
      const n = e[s];
      if (n?.headerDate && this.toYmd(n.headerDate) === i) return s;
    }
    return -1;
  }
  getLastLessonEndMinutes(e) {
    let t = null;
    for (const i of e ?? []) {
      if (H(i)) continue;
      const s = this.toMinutes(i?.end ?? "") ?? this.toMinutes(rt(i?.time ?? "").end);
      s != null && (t = t == null ? s : Math.max(t, s));
    }
    return t;
  }
  getNextConfiguredSchoolDate(e, t) {
    for (let i = 1; i <= 14; i++) {
      const s = new Date(t);
      s.setDate(t.getDate() + i);
      const n = s.getDay() === 0 ? 7 : s.getDay();
      for (const r of e ?? [])
        if (Pt(r) === n) return s;
    }
    return t;
  }
  getEffectiveDaySwitchDate(e, t) {
    const i = /* @__PURE__ */ new Date();
    i.setSeconds(0, 0);
    const s = ((e?.next_day_jump_mode ?? "midnight") + "").toString().trim();
    if (s === "fixed_time") {
      const a = this.parseClockToMinutes(e?.rolling_cutoff_time ?? "");
      return a == null ? i : i.getHours() * 60 + i.getMinutes() >= a ? this.getNextConfiguredSchoolDate(e?.days ?? [], i) : i;
    }
    if (s !== "after_last_lesson") return i;
    const n = this.getLastLessonEndMinutes(t);
    return n == null || i.getHours() * 60 + i.getMinutes() < n ? i : this.getNextConfiguredSchoolDate(e?.days ?? [], i);
  }
  getEffectiveHighlightDate(e, t) {
    return this.getEffectiveDaySwitchDate(e, t);
  }
  getLastMetaDate(e) {
    if (!Array.isArray(e) || !e.length) return null;
    let t = null;
    for (const i of e) {
      let s = null;
      if (i instanceof Date && !Number.isNaN(i.getTime()))
        s = new Date(i);
      else {
        const n = (i ?? "").toString().trim(), r = n.match(/^(\d{4})(\d{2})(\d{2})$/) ?? n.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        r && (s = new Date(Number(r[1]), Number(r[2]) - 1, Number(r[3]), 12, 0, 0, 0));
      }
      s && !Number.isNaN(s.getTime()) && (!t || s.getTime() > t.getTime()) && (t = s);
    }
    return t;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? e.entity ?? "" ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? e.entity ?? "" ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, s = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
    if (!Array.isArray(s) || s.length < 3) return null;
    const n = [];
    for (const r of s) {
      const a = (r ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const o = Number(a[1]), l = Number(a[2]), u = Number(a[3]), d = new Date(o, l - 1, u, 12, 0, 0, 0);
      Number.isNaN(d.getTime()) || n.push(d);
    }
    return n.length ? n : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? e.entity ?? "" ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? e.entity ?? "" ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, s = i?.meta_ha ?? i?.meta ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json) : null) ?? null;
    if (!s) return null;
    const n = (e.days?.length ?? 0) || 5, r = s?.updated_days;
    if (Array.isArray(r) && r.length) {
      const o = (r[0] ?? "").toString().trim();
      return Array.from({ length: n }, (u, d) => (r[d] ?? o ?? "").toString().trim());
    }
    const a = (s?.updated_raw ?? s?.updated ?? "").toString().trim();
    return a ? Array.from({ length: n }, () => a) : null;
  }
  getHeaderVplanMissingTextFromEntity(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? e.entity ?? "" ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? e.entity ?? "" ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, s = i?.meta_ha ?? i?.meta ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json) : null) ?? null;
    if (!s) return null;
    const n = (e.days?.length ?? 0) || 5, r = s?.vplan_missing_text_days ?? s?.vplan_missing_days_text ?? null;
    if (Array.isArray(r) && r.length)
      return Array.from({ length: n }, (o, l) => (r[l] ?? "").toString());
    if (typeof r == "string" && r.trim()) {
      const o = r.toString();
      return Array.from({ length: n }, () => o);
    }
    const a = s?.vplan_missing_days ?? null;
    return Array.isArray(a) && a.length ? Array.from({ length: n }, (o, l) => a[l] ? "(noch keine Vp-Daten vorhanden)" : "") : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const n = this.getActiveWeek(e), r = (e.source_entity_a ?? "").trim(), a = (e.source_entity_b ?? "").trim(), o = (e.source_attribute_a ?? "").trim(), l = (e.source_attribute_b ?? "").trim();
      if (n === "A" && r)
        return this.getRowsFromEntity(e, r, o) ?? [];
      if (n === "B" && a)
        return this.getRowsFromEntity(e, a, l) ?? [];
      const u = i;
      return u ? this.getRowsFromEntity(e, u, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
    }
    const s = i;
    return s ? this.getRowsFromEntity(e, s, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
  }
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [], this._noData = !1, this._noDataMsg = "";
      return;
    }
    const e = this.config, t = e.source_type ?? "manual", i = this.getRowsResolved(e);
    if (this._rowsCache = i, t === "manual") {
      this._noData = !1, this._noDataMsg = "";
      return;
    }
    const s = "Keine Daten für diesen Zeitraum (Ferien/Feiertag).";
    !i || i.length === 0 ? (this._noData = !0, t === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || s}` : t === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = s) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(e) {
    const t = (e ?? "").toString().replace(/\r/g, "").trim();
    if (!t) return null;
    const i = t.split(`
`).map((c) => c.trim()).filter((c) => c.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const n = i[0];
    if (/^(—|\-|–|---)$/.test(n)) return null;
    const r = (c) => {
      const p = (c ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(p) || /\bfällt\s+aus\b/i.test(p) || /\bverlegt\b/i.test(p) || /\bentfällt\b/i.test(p) || /\bvertretung\b/i.test(p) || /\bstatt\b/i.test(p) || /\bgehalten\b/i.test(p) || /\bAufgaben\b/i.test(p) || /^für\b/i.test(p);
    }, a = (c) => {
      const p = (c ?? "").toString().trim();
      return /^\d{1,4}$/.test(p) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(p) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(p);
    }, o = i.slice(1);
    let l = -1;
    for (let c = 0; c < o.length; c++)
      if (!r(o[c]) && a(o[c])) {
        l = c;
        break;
      }
    if (l < 0) {
      for (let c = o.length - 1; c >= 0; c--)
        if (a(o[c])) {
          l = c;
          break;
        }
    }
    if (l < 0) return null;
    const u = o[l];
    let d;
    for (let c = l + 1; c < o.length; c++) {
      const p = o[c];
      if (!r(p) && !a(p)) {
        d = p;
        break;
      }
    }
    if (!d) {
      const c = o.filter((p) => !r(p) && !a(p));
      d = c.length ? c[c.length - 1] : void 0;
    }
    const g = i.slice(1).filter((c) => r(c)), _ = (c) => (c ?? "").toString().replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/u, "").replace(/\b(Frau|Herr)\s+[\p{L}\-]+\b/giu, "").replace(/\b[A-ZÄÖÜ]{2,4}\b/g, "").replace(/\s+/g, " ").trim().toLowerCase(), m = [], f = /* @__PURE__ */ new Set();
    for (const c of g) {
      const p = _(c);
      p && (f.has(p) || (f.add(p), m.push(c)));
    }
    return { fach: n, raum: u, lehrer: d, notes: m.length ? m : void 0 };
  }
  renderCell(e, t) {
    const i = (e ?? "").toString(), s = this.filterCellText(i, t);
    if (yt(s)) return h``;
    const n = (() => {
      let f = s.replace(/\r/g, "").split(`
`).map((p) => (p ?? "").toString().trim());
      for (; f.length && /^(—|–|-)$/.test(f[0]); ) f.shift();
      const c = [];
      for (const p of f) {
        const x = p.length === 0;
        if (!/^(—|–|-)$/.test(p)) {
          if (x) {
            if (c.length === 0 || c[c.length - 1] === "") continue;
            c.push("");
            continue;
          }
          c.push(p);
        }
      }
      for (; c.length && c[c.length - 1] === ""; ) c.pop();
      return c.join(`
`);
    })();
    if (yt(n)) return h``;
    const r = n.split(/\n\s*\n/).map((f) => f.trim()).filter(Boolean), a = this.parseCellTriplet(n), o = (f) => {
      if (f.startsWith("🔴")) return "note noteRed";
      if (f.startsWith("🟠")) return "note noteOrange";
      if (f.startsWith("🟡")) return "note noteYellow";
      const c = f;
      return /\bfällt\s+aus\b/i.test(c) || /\bverlegt\b/i.test(c) || /\bstatt\b/i.test(c) || /\bgehalten\b/i.test(c) || /\bentfällt\b/i.test(c) ? "note noteRed" : "note";
    }, l = (f) => (f ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim();
    if (r.length === 1 && a?.fach && a?.raum && a?.lehrer)
      return h`
        <div class="cellWrap">
          <div class="fach">${a.fach}</div>
          <div class="lehrer">${a.lehrer}</div>
          <div class="raum">${a.raum}</div>

          ${a.notes?.length ? h`
                <div class="notes">
                  ${a.notes.map((f) => {
        const c = o(f), p = l(f) || f;
        return h`<div class=${c}><span class="txt">${p}</span></div>`;
      })}
                </div>
              ` : h``}
        </div>
      `;
    const u = (f) => {
      const c = (f ?? "").toString().trim();
      if (!c) return h``;
      const p = this.parseCellTriplet(c);
      if (p?.fach && p?.raum && p?.lehrer)
        return h`
          <div class="cellWrap">
            <div class="fach">${p.fach}</div>
            <div class="lehrer">${p.lehrer}</div>
            <div class="raum">${p.raum}</div>

            ${p.notes?.length ? h`
                  <div class="notes">
                    ${p.notes.map((v) => {
          const b = o(v), k = l(v) || v;
          return h`<div class=${b}><span class="txt">${k}</span></div>`;
        })}
                  </div>
                ` : h``}
          </div>
        `;
      const x = c.split(`
`).map((v) => v.trim()).filter(Boolean), S = (x[0] ?? "").trim(), D = x.slice(1);
      return S && D.length ? h`
          <div class="cellWrap">
            <div class="fach">${S}</div>
            <div class="notes">
              ${D.map((v) => {
        const b = o(v), k = l(v) || v;
        return h`<div class=${b}><span class="txt">${k}</span></div>`;
      })}
            </div>
          </div>
        ` : h`<span class="cellText">${c}</span>`;
    };
    if (r.length > 1)
      return h`<div class="cellMulti">${r.map((f) => u(f))}</div>`;
    const d = (n ?? "").split(`
`).map((f) => f.trim()).filter(Boolean), g = /^\d{1,4}$/, _ = /^[A-ZÄÖÜ]{2,6}$/, m = (f) => {
      const c = (f ?? "").trim();
      if (!c || g.test(c) || _.test(c)) return !1;
      const p = c.toLowerCase();
      return p.startsWith("statt ") || p.includes("fällt aus") || p.includes("verlegt") || p.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(c) ? !1 : /[a-z0-9äöü]/i.test(c);
    };
    if (d.length >= 6 && d.length % 3 === 0) {
      const f = [];
      for (let c = 0; c < d.length; c += 3) {
        const p = d[c] ?? "", x = d[c + 1] ?? "", S = d[c + 2] ?? "";
        if (!m(p) || !g.test(x) || !_.test(S)) {
          f.length = 0;
          break;
        }
        f.push([p, x, S].join(`
`));
      }
      if (f.length >= 2)
        return h`<div class="cellMulti">${f.map((c) => u(c))}</div>`;
    }
    return u(n);
  }
  render() {
    if (!this.config) return h``;
    const e = this.config, t = this._rowsCache, i = this.getHeaderDaysFromEntity(e), s = this.getEffectiveHighlightDate(e, t), n = this.getRollingAnchorDate(e, t), r = this.getTodayIndex(e.days ?? [], i, (e.view_mode ?? "week") === "rolling" ? n : s), a = this.getVisibleDayEntries(e, i), o = this.getCurrentVisibleIndex(a, s), l = a.map((y) => y.label), u = "1px solid var(--divider-color)", d = se(e.highlight_today_color ?? "", 0.12), g = se(e.highlight_current_color ?? "", 0.18), _ = (e.highlight_current_text_color ?? "").toString().trim(), m = (e.highlight_current_time_text_color ?? "").toString().trim(), f = e.week_mode !== "off", c = f ? this.getActiveWeek(e) : null, p = this.getWeekOffsetValue(e), x = this._uiWeekOffset != null ? this._uiWeekOffset : p, S = (e.source_type ?? "manual").toString(), D = M(e.show_header_date, !0), v = (e.week_offset_entity ?? "").trim().length > 0, b = v && (S === "entity" || S === "sensor" && (e.week_mode ?? "off") !== "off"), k = i && i.length >= (e.days?.length ?? 0) ? i : null, F = this.getHeaderUpdatedFromEntity(e), I = this.getHeaderVplanMissingTextFromEntity(e), et = this.getBaseDate(e), it = this.mondayOfWeek(et), pt = this.getCardInlineStyle(e);
    return h`
      <ha-card style=${pt}>
        <div class="headerRow">
          <div class="title">${e.title ?? ""}</div>

          <div class="headRight">
            ${f ? h`<div class="weekBadgeInline">Woche <b>${c}</b></div>` : h``}

            ${b ? h`
                  <div class="offsetInline">
                    <button class="btnMini ${x === 0 ? "active" : ""}" ?disabled=${x == null} @click=${async (y) => {
      if (y?.preventDefault?.(), y?.stopPropagation?.(), x != null)
        try {
          this._uiWeekOffset = 0, this.requestUpdate(), await this.setWeekOffset(e, 0), this.requestUpdate();
        } catch (w) {
          console.warn("[stundenplan-card] setWeekOffset(0) failed", w);
        }
    }}>Aktuelle Woche</button>
                    <button class="btnMini ${x === 1 ? "active" : ""}" ?disabled=${x == null} @click=${async (y) => {
      if (y?.preventDefault?.(), y?.stopPropagation?.(), x != null)
        try {
          this._uiWeekOffset = 1, this.requestUpdate(), await this.setWeekOffset(e, 1), this.requestUpdate();
        } catch (w) {
          console.warn("[stundenplan-card] setWeekOffset(+1) failed", w);
        }
    }}>Nächste Woche</button>
                  </div>
                ` : h``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${a.map((y, w) => {
      const N = y.label, E = y.dataIndex, C = e.highlight_today && (y?.headerDate && o === w || !y?.headerDate && E === r) ? "today" : "", G = this.getExactUpdatedForDate(e, y) || (y.exactMatch ? F?.[E] ?? "" : ""), st = this.getVplanHintForDate(e, y) || (y.exactMatch ? I?.[E] ?? "" : "");
      let P = "";
      if (D)
        if (y.headerDate)
          P = this.fmtDDMMYYYY(y.headerDate);
        else if (k && k[E])
          P = this.fmtDDMMYYYY(k[E]);
        else {
          const ft = Pt(N);
          if (ft) {
            const _t = new Date(it);
            _t.setDate(it.getDate() + (ft - 1)), P = this.fmtDDMMYYYY(_t);
          }
        }
      return h`
                    <th class=${C} style=${`--sp-hl:${d};`}>
                      <div>${N}</div>
                      ${P ? h`<div class="thDate">${P}</div>` : h``}
                      ${G ? h`<div class="thUpdated">(aktualisiert: ${G})</div>` : h``}
                      ${st ? h`<div class="thVpHint">${st}</div>` : h``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? h`<tr class="nodata"><td class="nodataCell" colspan=${l.length + 1}>${this._noDataMsg}</td></tr>` : t.map((y) => {
      if (H(y)) {
        const A = rt(y.time), mt = !!A.start && !!A.end && this.isNowBetween(A.start, A.end), R = !!e.highlight_breaks && mt;
        let Z = `--sp-hl:${g};`, K = "";
        return R && (Z += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", K += `--sp-hl:${g}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), R && e.highlight_current_time_text && m && (Z += `color:${m};`), h`
                    <tr class="break">
                      <td class="time" style=${Z}>${y.time}</td>
                      <td colspan=${l.length} style=${K}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const w = y, N = w.cells ?? [], E = w.cell_styles ?? [], C = !!w.start && !!w.end && this.isNowBetween(w.start, w.end), G = o >= 0 ? a[o] : null, st = G ? this.getExactCellForDate(e, G, w) : null, P = G?.dataIndex ?? -1, ft = st ?? (P >= 0 ? N[P] ?? "" : ""), _t = o >= 0 ? this.filterCellText(ft, e) : "", ye = o >= 0 ? yt(_t) : !1, Tt = !(e.free_only_column_highlight && ye), Lt = rt(w.time), be = !!(Lt.start && Lt.end), Ft = !be && w.start && w.end ? `${w.start}–${w.end}` : "";
      let jt = `--sp-hl:${g};`;
      return Tt && e.highlight_current && C && (jt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), Tt && C && e.highlight_current_time_text && m && (jt += `color:${m};`), h`
                  <tr>
                    <td class="time" style=${jt}>
                      <div class="timeWrap">
                        <div class="timeSt">${w.time}</div>
                        ${Ft ? h`<div class="timeHm">${Ft}</div>` : h``}
                      </div>
                    </td>

                    ${a.map((A, mt) => {
        A.label;
        const R = A.dataIndex, Z = !(S === "entity" && R < 0), K = this.getExactCellForDate(e, A, w), we = K ?? (Z ? N[R] ?? "" : ""), It = this.filterCellText(we, e), ve = K != null ? null : Z ? E[R] ?? null : null, xe = e.highlight_today && (A?.headerDate && o === mt || !A?.headerDate && R === r) ? "today" : "";
        let Vt = `--sp-hl:${d};` + Qe(ve, u);
        const $e = !yt(It);
        return Tt && $e && C && e.highlight_current_text && _ && (A?.headerDate && o === mt || !A?.headerDate && r >= 0 && R === r) && (Vt += `color:${_};`), h`<td class=${xe} style=${Vt}>${this.renderCell(It, e)}</td>`;
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
}, at.styles = oe`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      font-family: var(--sp-font-family, inherit);
      font-size: var(--sp-font-size, 14px);
    }
    ha-card {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: inherit;
    }
    .card,
    table,
    th,
    td,
    .weekBadgeInline,
    .offsetInline,
    .btnMini,
    .timeWrap,
    .cellWrap,
    .cellText,
    .fach,
    .raum,
    .lehrer,
    .notes,
    .note {
      font-family: var(--sp-font-family, inherit);
    }

    .headerRow {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 14px 8px 14px;
    }
    .title {
      font-family: var(--primary-font-family, inherit);
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }
    .headRight {
      display: flex;
      align-items: start;
      gap: 10px;
      flex-wrap: nowrap;
    }

    .weekBadgeInline {
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      font-size: calc(13px * var(--sp-font-scale, 1));
      opacity: 0.95;
      white-space: nowrap;
    }

    .offsetInline {
      display: flex;
      gap: 8px;
      align-items: start;
      padding: 6px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
    }
    .btnMini {
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 6px 10px;
      cursor: pointer;
    }
        .btnMini.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
.btnMini:hover {
      filter: brightness(1.06);
    }
    .offsetVal {
      min-width: 30px;
      text-align: center;
      font-weight: 800;
    }

    .card {
      padding: 12px 12px 14px 12px;
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: max-content;
      min-width: 100%;
      border-collapse: collapse;
      font-size: inherit;
    }
    th,
    td {
      padding: 6px;
      text-align: center;
      border: 1px solid var(--divider-color);
      vertical-align: middle;
      word-break: normal;
      overflow-wrap: anywhere;
    }
    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }

    .thDate {
      font-size: calc(11px * var(--sp-font-scale, 1));
      opacity: 0.75;
      margin-top: 2px;
      font-weight: 600;
      white-space: nowrap;
    }
    .thUpdated {
      font-size: calc(10px * var(--sp-font-scale, 1));
      opacity: 0.7;
      margin-top: 1px;
      white-space: nowrap;
    }

    .thVpHint {
      font-size: calc(11px * var(--sp-font-scale, 1));
      margin-top: 2px;
      color: var(--error-color);
      font-style: italic;
      font-weight: 600;
      white-space: nowrap;
      text-align: center;
    }


    .time {
      font-weight: 700;
      white-space: nowrap;
      width: 125px;
    }
    .timeWrap {
      display: grid;
      gap: 2px;
      justify-items: center;
      line-height: 1.1;
    }
    .timeSt {
      font-size: calc(13px * var(--sp-font-scale, 1));
      font-weight: 800;
    }
    .timeHm {
      font-size: calc(11px * var(--sp-font-scale, 1));
      font-weight: 650;
      opacity: 0.85;
    }

    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }

    .break {
      font-style: italic;
      opacity: 0.75;
    }

    .cellWrap {
      display: grid;
      gap: 2px;
      justify-items: center;
      line-height: 1.15;
    }
    .cellMulti {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: flex-start;
    }
    .cellMulti > * + * {
      border-left: 1px solid var(--divider-color);
      padding-left: 10px;
    }
    .cellMulti .cellWrap {
      flex: 1 1 0;
      min-width: 0;
    }
    .fach {
      font-weight: 800;
      font-size: calc(14px * var(--sp-font-scale, 1));
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
    .raum,
    .lehrer {
      font-size: calc(12px * var(--sp-font-scale, 1));
      opacity: 0.9;
      white-space: nowrap;
    }

    .notes {
      margin-top: 4px;
      display: grid;
      gap: 3px;
      justify-items: center;
      width: 100%;
      text-align: center;
    }
    .note {
      display: block;
      text-align: center;
      font-size: calc(11px * var(--sp-font-scale, 1));
      line-height: 1.25;
      opacity: 0.92;
      padding: 3px 4px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.04);
    }
    .noteRed {
      background: rgba(244, 67, 54, 0.12);
    }
    .noteOrange {
      background: rgba(255, 152, 0, 0.12);
    }
    .noteYellow {
      background: rgba(255, 235, 59, 0.14);
    }
    .dot {
      font-size: calc(12px * var(--sp-font-scale, 1));
      line-height: 1;
      margin-top: 1px;
      opacity: 0.95;
    }
    .txt {
      white-space: pre-line;
      overflow-wrap: anywhere;
    }

    .cellText {
      white-space: pre-line;
      display: inline-block;
      font-size: calc(14px * var(--sp-font-scale, 1));
      font-weight: 700;
      line-height: 1.2;
    }
  

    tr.nodata td {
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
    }
    .nodataCell {
      text-align: center;
      padding: 18px 10px;
      opacity: 0.85;
      font-style: italic;
      white-space: normal;
    }
`, at);
wt = /* @__PURE__ */ new WeakMap();
vt = /* @__PURE__ */ new WeakMap();
xt = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
St = /* @__PURE__ */ new WeakMap();
kt = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakMap();
T([
  de({ attribute: !1 })
], j.prototype, "hass", 1);
T([
  L()
], j.prototype, "config", 1);
T([
  L()
], j.prototype, "_rowsCache", 1);
T([
  L()
], j.prototype, "_noData", 1);
T([
  L()
], j.prototype, "_noDataMsg", 1);
T([
  L()
], j.prototype, "_jsonRows", 1);
T([
  L()
], j.prototype, "_jsonStatus", 1);
T([
  L()
], j.prototype, "_jsonError", 1);
let _e = j;
function ei(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function M(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function ii(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function si(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Ot = class extends Q {
  constructor() {
    super(...arguments), this._unsubEntities = null, this._didSubEntities = !1, this._open = {
      general: !1,
      highlights: !1,
      colors: !1,
      sources: !1,
      manual: !1
    }, this._uiLoaded = !1, this._stopEvent = (t) => {
      try {
        t?.stopPropagation?.();
      } catch {
      }
    }, this._rowOpen = {}, this._showCellStyles = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.ensureUiLoaded(), this.ensureEntitySubscription();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    try {
      this._unsubEntities?.();
    } catch {
    }
    this._unsubEntities = null, this._didSubEntities = !1;
  }
  async ensureEntitySubscription() {
    if (this._didSubEntities) return;
    const t = this.hass;
    if (!(!t || !t.connection))
      try {
        const i = t.connection.subscribeEntities;
        typeof i == "function" && (this._didSubEntities = !0, this._unsubEntities = await i(() => {
        }));
      } catch {
        this._didSubEntities = !0, this._unsubEntities = null;
      }
  }
  async ensureUiLoaded() {
    if (!this._uiLoaded) {
      this._uiLoaded = !0;
      try {
        await window.loadCardHelpers?.();
      } catch {
      }
      setTimeout(() => this.requestUpdate(), 0), this.ensureEntitySubscription();
    }
  }
  setConfig(t) {
    this.ensureUiLoaded();
    const i = ((t?.type ?? "") + "").toString();
    if (i !== "custom:stundenplan-card" && i !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${i}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  normalizeConfig(t) {
    return new _e().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, ei(this, "config-changed", { config: t });
  }
  setValue(t, i) {
    this._config && this.emit({ ...this._config, [t]: i });
  }
  toggleOpen(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  findBestRowsAttribute(t) {
    const i = this.hass?.states?.[t]?.attributes ?? {};
    return i.rows_ha != null ? { attr: "rows_ha", timeKey: "time" } : i.rows != null ? { attr: "rows", timeKey: "time" } : i.rows_table != null ? { attr: "rows_table", timeKey: "time" } : i.rows_json != null ? { attr: "rows_json", timeKey: "time" } : { attr: "rows_ha", timeKey: "time" };
  }
  setSourceType(t) {
    if (!this._config) return;
    const i = t === "entity" || t === "json" || t === "manual" || t === "sensor" ? t : "manual", s = { ...this._config, source_type: i };
    i === "json" && s.json_url == null && (s.json_url = ""), i === "entity" && (s.source_entity == null && (s.source_entity = ""), s.source_attribute = "rows_table", s.source_time_key = "time"), i === "sensor" && (s.source_entity == null && (s.source_entity = ""), s.source_entity_integration = "", s.source_attribute = (s.source_attribute ?? "").toString().trim() || "plan", s.source_time_key = (s.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(s);
  }
  setSourceEntity(t) {
    if (!this._config) return;
    const i = (t ?? "").toString().trim(), s = (this._config.source_type ?? "manual").toString();
    if (s === "sensor") {
      this.emit({
        ...this._config,
        source_type: "legacy",
        source_entity: i,
        source_entity_legacy: i
      });
      return;
    }
    if (s === "entity") {
      const n = (i ?? "").toString().trim();
      let r = "";
      n && (r = n.replace(/^sensor\./, "number.") + "_offset"), this.emit({
        ...this._config,
        source_type: "entity",
        source_entity: i,
        source_entity_integration: i,
        source_attribute: "rows_table",
        source_time_key: "time",
        week_offset_entity: r
      });
      return;
    }
    this.emit({
      ...this._config,
      source_entity: i
    });
  }
  setJsonUrl(t) {
    this._config && this.emit({
      ...this._config,
      source_type: "json",
      json_url: (t ?? "").toString()
    });
  }
  renderSection(t, i, s) {
    const n = !!this._open[i];
    return h`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(i)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${n ? "▾" : "▸"}</div>
        </div>
        ${n ? h`<div class="sectionBody">${s}</div>` : h``}
      </div>
    `;
  }
  renderSubsection(t, i, s) {
    return h`
      <div class="subSection">
        <div class="subSectionTitle">${t}</div>
        ${i ? h`<div class="subSectionHint">${i}</div>` : h``}
        <div class="subSectionBody">${s}</div>
      </div>
    `;
  }
  onToggle(t, i) {
    const s = !!t?.target?.checked;
    this.setValue(i, s);
  }
  onText(t, i) {
    if (!this._config) return;
    const s = t?.detail?.value ?? t?.target?.value ?? t?.currentTarget?.value ?? t?.target?.checked ?? "";
    this.emit({
      ...this._config,
      [i]: s
    });
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], s = { time: `${i.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    i.push(s), this.emit({ ...this._config, rows: i });
  }
  insertManualRowBelow(t) {
    if (!this._config) return;
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = { time: `${t + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    s.splice(t + 1, 0, n), this.emit({ ...this._config, rows: s });
  }
  insertManualBreakBelow(t) {
    if (!this._config) return;
    const i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    i.splice(t + 1, 0, { break: !0, time: "", label: "Pause" }), this.emit({ ...this._config, rows: i });
  }
  removeManualRow(t) {
    if (!this._config) return;
    const i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    i.splice(t, 1), this.emit({ ...this._config, rows: i });
  }
  updateManualRow(t, i) {
    if (!this._config) return;
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = s[t];
    s[t] = { ...n, ...i }, this.emit({ ...this._config, rows: s });
  }
  updateManualCell(t, i, s) {
    if (!this._config) return;
    const n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = n[t];
    if (!r || H(r)) return;
    const a = r, o = Array.isArray(a.cells) ? a.cells.slice() : [];
    o[i] = s, n[t] = { ...a, cells: o }, this.emit({ ...this._config, rows: n });
  }
  addLessonRow() {
    this.addManualRow();
  }
  addBreakRow() {
    if (!this._config) return;
    const t = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    t.push({ break: !0, time: "", label: "Pause" }), this.emit({ ...this._config, rows: t });
  }
  toggleManualBreak(t, i) {
    if (!this._config) return;
    const s = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = n[t];
    if (r) {
      if (i) {
        const a = (r.time ?? "").toString(), o = (r.label ?? "Pause").toString();
        n[t] = { break: !0, time: a, label: o };
      } else {
        const a = (r.time ?? "").toString();
        n[t] = { time: a, start: "", end: "", cells: Array.from({ length: s.length }, () => "") };
      }
      this.emit({ ...this._config, rows: n });
    }
  }
  updateManualCellStyle(t, i, s) {
    if (!this._config) return;
    const n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = n[t];
    if (!r || H(r)) return;
    const a = r, o = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = o[i] ?? {};
    o[i] = { ...l, ...s }, n[t] = { ...a, cell_styles: o }, this.emit({ ...this._config, rows: n });
  }
  focusManualCell(t, i) {
    try {
      this._rowOpen = { ...this._rowOpen ?? {}, [t]: !0 }, this.requestUpdate(), window.setTimeout(() => {
        try {
          const s = this.renderRoot ?? this.shadowRoot, n = `textarea[data-row="${t}"][data-col="${i}"]`, r = s?.querySelector?.(n);
          if (r) {
            r.focus();
            const a = (r.value ?? "").length;
            r.setSelectionRange?.(a, a), r.scrollIntoView?.({ block: "center", behavior: "smooth" });
          }
        } catch {
        }
      }, 50);
    } catch {
    }
  }
  renderManualPreview(t, i) {
    return i.filter((n) => !H(n)).length ? h`
      <div class="manualPreviewWrap">
        <div class="manualPreviewTitle">Vorschau</div>
        <div class="manualPreviewHint">Klicke auf eine Zelle, um direkt das passende Eingabefeld zu öffnen.</div>
        <div class="manualPreviewTableWrap">
          <table class="manualPreviewTable">
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.map((n) => h`<th>${n}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${i.map((n, r) => {
      if (H(n))
        return h`
                    <tr class="manualPreviewBreak">
                      <td class="time">${(n.time ?? "").toString()}</td>
                      <td colspan=${t.length}>${(n.label ?? "Pause").toString()}</td>
                    </tr>
                  `;
      const a = Array.isArray(n.cells) ? n.cells : [];
      return h`
                  <tr>
                    <td class="time">${(n.time ?? "").toString()}</td>
                    ${t.map((o, l) => {
        const u = (a[l] ?? "").toString().trim(), d = u ? u.split(/\r?\n/).slice(0, 3) : [];
        return h`
                        <td>
                          <button
                            type="button"
                            class="manualPreviewCellBtn"
                            @click=${() => this.focusManualCell(r, l)}
                          >
                            ${d.length ? h`
                                  <span class="manualPreviewLines">
                                    ${d.map((g, _) => h`<span class=${_ === 0 ? "manualPreviewMain" : "manualPreviewSub"}>${g}</span>`)}
                                  </span>
                                ` : h`<span class="manualPreviewEmpty">Leer</span>`}
                          </button>
                        </td>
                      `;
      })}
                  </tr>
                `;
    })}
            </tbody>
          </table>
        </div>
      </div>
    ` : h``;
  }
  renderManualRows() {
    if (!this._config) return h``;
    const t = this._config, i = t.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(t.rows) ? t.rows : [];
    return h`
      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan (Zeilen)</div>
      </div>

      <div class="sub" style="margin-bottom:10px;">
        Pro Zeile: Zeit + optional Start/Ende. Per Klick in der Vorschau springst du zur passenden Zelle.
      </div>

      ${this.renderManualPreview(i, s)}

      <div class="btnBar btnBarManual">
        <div class="toggleInline">
          <div class="toggleText">Cell-Styles</div>
          <ha-switch
            .checked=${!!this._showCellStyles}
            @change=${(n) => {
      this._showCellStyles = !!n?.target?.checked, this.requestUpdate();
    }}
          ></ha-switch>
        </div>

        <button type="button" class="spBtn spBtnPrimary" @click=${this.addLessonRow}>+ Stunde</button>
        <button type="button" class="spBtn" @click=${this.addBreakRow}>+ Pause</button>
      </div>

      ${s.map((n, r) => {
      const a = H(n), o = a ? `Pause · ${(n.time ?? "").toString()}` : `Stunde · ${(n.time ?? "").toString()}`, l = n, u = (l.start ?? "").toString(), d = (l.end ?? "").toString(), g = (n.label ?? "Pause").toString();
      return h`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[r] ?? !1}
            @toggle=${(_) => {
        try {
          this._rowOpen[r] = !!_?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${o || `Zeile ${r + 1}`}</div>
                <div class="rowHeadMeta">${a ? g : `${u || "Start?"} – ${d || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-textfield
                  label="Zeit / Stunde"
                  .value=${(n.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(_) => this.updateManualRow(r, { time: _?.target?.value ?? "" })}
                ></ha-textfield>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${a} @change=${(_) => this.toggleManualBreak(r, !!_?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${a ? h`
                    <ha-textfield
                      label="Pausentext"
                      .value=${g}
                      placeholder="z. B. Große Pause"
                      @input=${(_) => this.updateManualRow(r, { label: _?.target?.value ?? "" })}
                    ></ha-textfield>
                  ` : h`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-textfield
                        label="Start (HH:MM)"
                        .value=${u}
                        @input=${(_) => this.updateManualRow(r, { start: _?.target?.value ?? "" })}
                      ></ha-textfield>
                      <ha-textfield
                        label="Ende (HH:MM)"
                        .value=${d}
                        @input=${(_) => this.updateManualRow(r, { end: _?.target?.value ?? "" })}
                      ></ha-textfield>
                    </div>

                    <div class="cellsGrid" style=${`grid-template-columns: repeat(${i.length}, minmax(220px, 1fr));`}>
                      ${i.map((_, m) => {
        const f = (l.cells?.[m] ?? "").toString(), c = (Array.isArray(l.cell_styles) ? l.cell_styles?.[m] : void 0) ?? {}, p = (c?.bg ?? "#000000").toString(), x = typeof c?.bg_alpha == "number" && !Number.isNaN(c.bg_alpha) ? c.bg_alpha : 0.18, S = Math.round(x * 100), D = (c?.color ?? "#ffffff").toString();
        return h`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${_}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              data-row=${String(r)}
                              data-col=${String(m)}
                              .value=${f}
                              @input=${(v) => this.updateManualCell(r, m, v?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${p} @input=${(v) => this.updateManualCellStyle(r, m, { bg: v?.target?.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String(S)}
                                    @input=${(v) => this.updateManualCellStyle(r, m, { bg_alpha: Number(v?.target?.value ?? 0) / 100 })}
                                  />
                                  <div class="pct">${S}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${D} @input=${(v) => this.updateManualCellStyle(r, m, { color: v?.target?.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowFoot">
                <div class="rowActions">
                  <button type="button" class="spBtn" @click=${() => this.insertManualRowBelow(r)}>+ Stunde darunter</button>
                  <button type="button" class="spBtn" @click=${() => this.insertManualBreakBelow(r)}>+ Pause darunter</button>
                </div>
                <button type="button" class="spBtn spBtnDanger" @click=${() => this.removeManualRow(r)}>Löschen</button>
              </div>
            </div>
          </details>
        `;
    })}
    `;
  }
  isHaEntityPickerAvailable() {
    return typeof customElements < "u" && !!customElements.get("ha-entity-picker");
  }
  render() {
    if (!this._config) return h``;
    const t = this._config;
    return h`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      h`
            <div class="hintBox">Lege hier zuerst Titel, Schultage und den gewünschten Ansichtsmodus fest. Diese Einstellungen bestimmen, wie die Karte später aufgebaut wird.</div>
            <div class="grid2">
              <ha-textfield label="Titel der Karte" .value=${t.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-textfield>

              <ha-textfield
                label="Schultage (CSV)"
                .value=${si(t.days ?? [])}
                @input=${(i) => this.setValue("days", ii(i.target.value))}
                helper="Beispiel: Mo, Di, Mi, Do, Fr"
              ></ha-textfield>
            </div>

            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{ view_mode: t.view_mode ?? "week" }}
                .schema=${[
        {
          name: "view_mode",
          selector: {
            select: {
              options: [
                { value: "week", label: "Ganze Woche" },
                { value: "rolling", label: "Ab heute (rolling)" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "view_mode" ? "Ansichtsmodus" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).view_mode ?? "week";
          this.setValue("view_mode", s);
        } catch (s) {
          console.error("stundenplan-card editor: view_mode change failed", s);
        }
      }}
              ></ha-form>

              ${(t.view_mode ?? "week") === "rolling" ? h`
                <ha-textfield
                  label="Zusätzliche Tage im Voraus"
                  type="number"
                  .value=${String(t.days_ahead ?? 0)}
                  helper="0 = nur Starttag, 1 = Starttag + nächster Schultag"
                  @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("days_ahead", Number.isFinite(s) ? Math.max(0, Math.min(6, Math.floor(s))) : 0);
      }}
                ></ha-textfield>
                <ha-form
                  .hass=${this.hass}
                  .data=${{ next_day_jump_mode: t.next_day_jump_mode ?? "midnight" }}
                  .schema=${[
        {
          name: "next_day_jump_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "midnight", label: "Ab 00:00 Uhr" },
                { value: "after_last_lesson", label: "Nach der letzten Stunde" },
                { value: "fixed_time", label: "Feste Umschaltzeit" }
              ]
            }
          }
        }
      ]}
                  .computeLabel=${(i) => i?.name === "next_day_jump_mode" ? "Auf nächsten Tag springen" : i?.name}
                  @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).next_day_jump_mode ?? "midnight";
          this.setValue("next_day_jump_mode", s);
        } catch (s) {
          console.error("stundenplan-card editor: next_day_jump_mode change failed", s);
        }
      }}
                ></ha-form>
                ${(t.next_day_jump_mode ?? "midnight") === "fixed_time" ? h`
                  <ha-textfield
                    label="Umschaltzeit"
                    .value=${(t.rolling_cutoff_time ?? "").toString()}
                    placeholder="z. B. 15:00"
                    helper="Ab dieser Uhrzeit springt Rolling auf den nächsten Schultag."
                    @input=${(i) => this.setValue("rolling_cutoff_time", i?.target?.value ?? "")}
                  ></ha-textfield>
                ` : h`<div class="hintBox">${(t.next_day_jump_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung erfolgt automatisch nach der letzten Endzeit aus deinem Stundenplan." : "Der Sprung auf den nächsten Schultag erfolgt direkt ab Mitternacht."}</div>`}
              ` : h``}
            </div>

            <div class="hint">„Ab heute (rolling)“ zeigt ab dem Starttag die nächsten passenden Schultage. Beim Blättern in andere Wochen beginnt die Ansicht automatisch am Montag.</div>
          `
    )}

        ${this.renderSection(
      "Highlights & Anzeige",
      "highlights",
      h`
            ${this.renderSubsection(
        "Hintergrund & Markierungen",
        "Diese Optionen steuern, welche Bereiche farbig hinterlegt werden. Die passende Hintergrundfarbe kannst du jeweils direkt daneben festlegen.",
        h`
                <div class="grid3">
                  <ha-switch .checked=${M(t.highlight_today, !0)} @change=${(i) => this.onToggle(i, "highlight_today")}></ha-switch>
                  <div class="switchLabel">Aktuellen Tag im Hintergrund markieren</div>
                  <ha-textfield label="Tagesfarbe" helper="z. B. rgba(...) oder #RRGGBB" .value=${t.highlight_today_color ?? ""} @input=${(i) => this.onText(i, "highlight_today_color")}></ha-textfield>

                  <ha-switch .checked=${M(t.highlight_current, !0)} @change=${(i) => this.onToggle(i, "highlight_current")}></ha-switch>
                  <div class="switchLabel">Laufende Stunde im Hintergrund hervorheben</div>
                  <ha-textfield label="Stundenfarbe" helper="z. B. rgba(...) oder #RRGGBB" .value=${t.highlight_current_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_color")}></ha-textfield>

                  <ha-switch .checked=${M(t.highlight_breaks, !1)} @change=${(i) => this.onToggle(i, "highlight_breaks")}></ha-switch>
                  <div class="switchLabel">Pausenzeilen ebenfalls hinterlegen</div>
                  <div class="switchMeta">Sinnvoll, wenn du Pausen als eigene Zeilen eingetragen hast.</div>

                  <ha-switch
                    .checked=${M(t.free_only_column_highlight, !0)}
                    @change=${(i) => this.onToggle(i, "free_only_column_highlight")}
                  ></ha-switch>
                  <div class="switchLabel">Nur markieren, wenn die Spalte nicht komplett frei ist</div>
                  <div class="switchMeta">Verhindert eine farbige Leerspalte.</div>
                </div>
              `
      )}

            ${this.renderSubsection(
        "Text & Zusatzinfos",
        "Diese Optionen betreffen nur Textdarstellung und Kopfzeile, nicht die Hintergrundfarben.",
        h`
                <div class="grid3">
                  <ha-switch .checked=${M(t.show_header_date, !0)} @change=${(i) => this.onToggle(i, "show_header_date")}></ha-switch>
                  <div class="switchLabel">Datum unter dem Wochentag anzeigen</div>
                  <div class="switchMeta">Hilfreich bei Rolling und beim Wochenwechsel.</div>

                  <ha-switch .checked=${M(t.highlight_current_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_text")}></ha-switch>
                  <div class="switchLabel">Text in der aktuellen Stunde einfärben</div>
                  <ha-textfield label="Textfarbe" helper="#RRGGBB oder CSS-Farbe" .value=${t.highlight_current_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_text_color")}></ha-textfield>

                  <ha-switch .checked=${M(t.highlight_current_time_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_time_text")}></ha-switch>
                  <div class="switchLabel">Zeitspalte der aktuellen Stunde einfärben</div>
                  <ha-textfield label="Zeitfarbe" helper="#RRGGBB oder CSS-Farbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_time_text_color")}></ha-textfield>
                </div>
              `
      )}
          `
    )}

        ${this.renderSection(
      "Typografie",
      "type",
      h`
            <div class="hintBox">Diese Einstellungen gelten für Tabellenkopf, Zeitspalte und Zellen. Der Kartentitel bleibt bewusst unverändert, damit er immer stabil lesbar bleibt.</div>
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{ font_family: (t.font_family ?? "").toString() }}
                .schema=${[
        {
          name: "font_family",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "system", label: "Home Assistant Standard" },
                { value: "segoe", label: "Segoe UI" },
                { value: "arial", label: "Arial" },
                { value: "verdana", label: "Verdana" },
                { value: "trebuchet", label: "Trebuchet MS" },
                { value: "gillsans", label: "Gill Sans" },
                { value: "georgia", label: "Georgia" },
                { value: "palatino", label: "Palatino" },
                { value: "courier", label: "Courier New" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "font_family" ? "Schriftart" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).font_family ?? "";
          this.setValue("font_family", s);
        } catch (s) {
          console.error("stundenplan-card editor: font_family change failed", s);
        }
      }}
              ></ha-form>
              <ha-textfield
                label="Schriftgröße (px)"
                type="number"
                .value=${String(t.font_size ?? 14)}
                helper="Erlaubter Bereich: 10 bis 28 px"
                @input=${(i) => {
        const s = Number(i?.target?.value);
        this.setValue("font_size", Number.isFinite(s) ? Math.max(10, Math.min(28, Math.floor(s))) : 14);
      }}
              ></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Datenquellen",
      "sources",
      h`
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{
        source_type: t.source_type ?? "manual"
      }}
                .schema=${[
        {
          name: "source_type",
          selector: {
            select: {
              options: [
                { value: "manual", label: "Manuell (rows)" },
                { value: "entity", label: "Stundenplan24 (Integration)" },
                ...(t.source_type ?? "manual") === "json" ? [{ value: "json", label: "JSON-Datei (deprecated)" }] : [],
                { value: "sensor", label: "Beliebiger Sensor (JSON)" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "source_type" ? "Quelle" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).source_type ?? t.source_type ?? "manual";
          s !== (t.source_type ?? "manual") && this.setSourceType(s);
        } catch (s) {
          console.error("stundenplan-card editor: ha-form value-changed failed", s);
        }
      }}
              ></ha-form>
            </div>

            ${(t.source_type ?? "manual") === "entity" ? h`
                  <div class="hint">Stundenplan24: bitte einen <code>sensor.*_woche</code> auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? h`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), s = i.filter((n) => /^sensor\./.test(n) && /_woche$/i.test(n));
        return i.length < 5 || s.length === 0 ? h`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : h``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const n = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !n || /_woche$/i.test(n);
      }}
                      .label=${"Stundenplan24 Sensor"}
                      @value-changed=${(i) => {
        try {
          const s = i.detail?.value ?? i.target?.value, n = typeof s == "string" ? s : s && typeof s == "object" ? s.entity_id : void 0;
          this.setSourceEntity(n);
        } catch (s) {
          console.error("stundenplan-card editor: setSourceEntity failed", s);
        }
      }}
                    ></ha-entity-picker>
                  ` : h``}

                  <ha-textfield
                    label="Stundenplan24 Entity-ID (manuell)"
                    .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-textfield>
                ` : h``}

            ${(t.source_type ?? "manual") === "sensor" ? h`
                  <div class="hint">Beliebiger Sensor (JSON): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? h`
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const n = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !n || /^sensor\./.test(n);
      }}
                      .label=${"Sensor (JSON)"}
                      @value-changed=${(i) => {
        try {
          const s = i.detail?.value ?? i.target?.value, n = typeof s == "string" ? s : s && typeof s == "object" ? s.entity_id : void 0;
          this.setSourceEntity(n);
        } catch (s) {
          console.error("stundenplan-card editor: setSourceEntity failed", s);
        }
      }}
                    ></ha-entity-picker>
                  ` : h``}

                  <ha-textfield
                    label="Sensor Entity-ID (manuell)"
                    .value=${t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-textfield>

                  <div class="grid2">
                    <ha-textfield label="Attribut" .value=${t.source_attribute ?? ""} @input=${(i) => this.onText(i, "source_attribute")} @change=${(i) => this.onText(i, "source_attribute")} @value-changed=${(i) => this.onText(i, "source_attribute")} placeholder="plan"></ha-textfield>
                    <ha-textfield label="Time-Key" .value=${t.source_time_key ?? ""} @input=${(i) => this.onText(i, "source_time_key")} @change=${(i) => this.onText(i, "source_time_key")} @value-changed=${(i) => this.onText(i, "source_time_key")} placeholder="Stunde"></ha-textfield>
                  </div>
                  <div class="hint">Sensor (JSON): REST-Sensor + JSON-Attribut (z.B. <code>plan</code>) und Zeit-Key (z.B. <code>Stunde</code>).</div>

                  <div class="hint" style="margin-top:10px;">
                    Wechselwochen (A/B) gehört zu „Single-Source (Legacy / einfach)“.
                  </div>

                  <div class="grid2">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
        week_mode: t.week_mode ?? "off",
        week_a_is_even_kw: M(t.week_a_is_even_kw, !0)
      }}
                      .schema=${[
        {
          name: "week_mode",
          selector: {
            select: {
              mode: "list",
              options: [
                { value: "off", label: "off (deaktiviert)" },
                { value: "kw_parity", label: "A/B nach Kalenderwoche" }
              ]
            }
          }
        },
        {
          name: "week_a_is_even_kw",
          selector: {
            select: {
              mode: "list",
              options: [
                { value: !0, label: "Woche A = gerade KW" },
                { value: !1, label: "Woche A = ungerade KW" }
              ]
            }
          }
        }
      ]}
                      .computeLabel=${(i) => i?.name === "week_mode" ? "Wechselwochen (A/B)" : i?.name === "week_a_is_even_kw" ? "Woche A" : i?.name}
                      @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = i?.detail?.value ?? {}, n = s.week_mode ?? t.week_mode ?? "off";
          n !== (t.week_mode ?? "off") && this.setValue("week_mode", n);
          const r = s.week_a_is_even_kw;
          typeof r == "boolean" && r !== M(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
        } catch (s) {
          console.error("stundenplan-card editor: week settings change failed", s);
        }
      }}
                    ></ha-form>
                  </div>
` : h``}

          `
    )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }
};
Ot.properties = {
  hass: {},
  _config: { state: !0 }
}, Ot.styles = oe`
    .wrap {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .section {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    .sectionHead {
      padding: 12px 12px;
      cursor: pointer;
      display: flex;
      align-items: start;
      justify-content: space-between;
      background: var(--secondary-background-color);
      user-select: none;
    }
    .sectionTitle {
      font-weight: 700;
    }
    .chev {
      opacity: 0.8;
    }
    .sectionBody {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .subSection {
      display: grid;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
    }
    .subSectionTitle {
      font-weight: 700;
      line-height: 1.2;
    }
    .subSectionHint {
      font-size: 12px;
      line-height: 1.45;
      opacity: 0.82;
    }
    .subSectionBody {
      display: grid;
      gap: 10px;
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      align-items: start;
    }
    .grid3 {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      gap: 10px;
      align-items: start;
    }
    .switchLabel {
      opacity: 0.95;
      line-height: 1.35;
    }
    .switchMeta {
      font-size: 12px;
      opacity: 0.72;
      line-height: 1.35;
    }
    .hint {
      font-size: 12px;
      opacity: 0.85;
      line-height: 1.4;
    }
    .hintBox {
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(0, 163, 255, 0.16);
      background: rgba(0, 163, 255, 0.07);
      font-size: 12px;
      line-height: 1.45;
      color: var(--primary-text-color);
    }
    code {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
    }

    .rowActions {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
    }
    .rowCard {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      display: grid;
      gap: 10px;
      background: var(--secondary-background-color);
    }
    .rowHead {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 10px;
    }
    .rowTitle {
      font-weight: 700;
    }
    .rowHeadBtns {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .cellsGrid {
      display: grid;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 6px;
    }
    .cellEditor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: var(--card-background-color);
      display: grid;
      gap: 8px;
      min-width: 220px;
      box-sizing: border-box;
    }
    .cellEditorHead {
      font-weight: 700;
      opacity: 0.9;
      font-size: 12px;
    }

    .manualPreviewWrap {
      display: grid;
      gap: 10px;
      margin-bottom: 16px;
      padding: 14px;
      border: 1px solid var(--divider-color);
      border-radius: 16px;
      background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    }
    .manualPreviewTitle {
      font-weight: 700;
      font-size: 14px;
    }
    .manualPreviewHint {
      font-size: 12px;
      opacity: 0.8;
    }
    .manualPreviewTableWrap {
      overflow-x: auto;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(0,0,0,0.14);
    }
    .manualPreviewTable {
      width: max-content;
      min-width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .manualPreviewTable th,
    .manualPreviewTable td {
      border: 1px solid rgba(255,255,255,0.06);
      padding: 0;
      vertical-align: stretch;
      text-align: center;
    }
    .manualPreviewTable th {
      background: rgba(255,255,255,0.05);
      font-weight: 700;
      padding: 10px 8px;
    }
    .manualPreviewTable .time {
      width: 96px;
      min-width: 96px;
      white-space: nowrap;
      background: rgba(255,255,255,0.03);
      font-weight: 700;
      font-size: 12px;
      padding: 10px 8px;
    }
    .manualPreviewCellBtn {
      width: 100%;
      min-height: 92px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.03));
      color: var(--primary-text-color);
      padding: 10px 8px;
      cursor: pointer;
      text-align: center;
      transition: background 120ms ease, box-shadow 120ms ease;
    }
    .manualPreviewCellBtn:hover {
      background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08));
      box-shadow: inset 0 0 0 9999px rgba(255,255,255,0.02);
    }
    .manualPreviewCellBtn:focus-visible {
      outline: 2px solid rgba(33,150,243,0.6);
      outline-offset: 2px;
    }
    .manualPreviewLines {
      display: grid;
      gap: 4px;
      font-size: 12px;
      line-height: 1.2;
      justify-items: center;
      width: 100%;
    }
    .manualPreviewMain {
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.2px;
    }
    .manualPreviewSub {
      opacity: 0.9;
      font-size: 11px;
    }
    .manualPreviewEmpty {
      display: block;
      text-align: center;
      opacity: 0.55;
      font-style: italic;
      font-size: 12px;
      line-height: 1.25;
    }
    .manualPreviewBreak td {
      opacity: 0.75;
      font-style: italic;
      padding: 10px 8px;
      background: rgba(255,255,255,0.03);
    }

    .lessonArea {
      width: 100%;
      min-height: 44px;
      resize: vertical;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: rgba(0,0,0,0.12);
      color: var(--primary-text-color);
      font-family: inherit;
      font-size: 14px;
      box-sizing: border-box;
    }

    @media (max-width: 900px) {
      .grid2 {
        grid-template-columns: 1fr;
      }
      .grid3 {
        grid-template-columns: 1fr;
      }
    }

    /* ---- Manual Rows Editor (classic accordion UI) ---- */
    .rowsTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 6px;
    }
    .rowsTitle {
      font-weight: 700;
      font-size: 14px;
    }
    .btnBar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .btnBarManual {
      margin: 0 0 14px;
      justify-content: flex-start;
    }
    .toggleInline {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .toggleText {
      font-size: 12px;
      opacity: 0.9;
    }

    details.rowPanel {
      margin: 6px 0;
      border-radius: 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      overflow: hidden;
    }
    details.rowPanel > summary {
      list-style: none;
      cursor: pointer;
      padding: 12px 14px;
      user-select: none;
    }
    details.rowPanel > summary::-webkit-details-marker {
      display: none;
    }
    .rowHead {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .rowHeadTitle {
      font-weight: 700;
    }
    .rowHeadMeta {
      opacity: 0.75;
      font-size: 12px;
      white-space: nowrap;
    }
    .rowBody {
      padding: 12px 14px 14px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .optRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
    }
    .optTitle {
      font-weight: 700;
      margin-bottom: 2px;
    }
    .cellsGrid {
      margin-top: 12px;
      display: grid;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 4px;
      align-items: start;
    }
    .cellEditor {
      border-radius: 14px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .cellEditorHead {
      font-weight: 700;
      font-size: 12px;
      opacity: 0.9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cellStyles {
      margin-top: 2px;
      padding-top: 8px;
      border-top: 1px dashed rgba(255,255,255,0.10);
      display: grid;
      gap: 8px;
    }
    .cellStyles--hidden { display: none !important; }
    .styleLine {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .styleLbl {
      font-size: 12px;
      opacity: 0.8;
      min-width: 84px;
    }
    input.col {
      width: 44px;
      height: 28px;
      border: none;
      background: transparent;
      padding: 0;
    }
    .range {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      justify-content: flex-start;
    }
    .range input[type="range"] {
      flex: 1;
      width: 100%;
      min-width: 140px;
    }
    .pct {
      width: 42px;
      text-align: right;
      opacity: 0.85;
      font-size: 12px;
    }
    .rowFoot {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .rowActions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .spBtn{
      appearance:none;
      border:1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.04);
      color: var(--primary-text-color);
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 13px;
      line-height: 1.2;
      cursor: pointer;
      user-select: none;
      transition: background 120ms ease, border-color 120ms ease, transform 80ms ease;
    }
    .spBtn:hover{
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.28);
    }
    .spBtn:active{
      transform: translateY(1px);
    }
    .spBtn:focus-visible{
      outline: 2px solid rgba(33,150,243,0.6);
      outline-offset: 2px;
    }
    .spBtnDanger{
      border-color: rgba(219,68,55,0.55);
      background: rgba(219,68,55,0.12);
    }
    .spBtnDanger:hover{
      border-color: rgba(219,68,55,0.8);
      background: rgba(219,68,55,0.18);
    }
  `;
let me = Ot;
T([
  L()
], me.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", _e);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", me);
window.__STUNDENPLAN_CARD_VERSION = "v2026-02-16.2";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v2026-02-24.2 (marker: STUNDENPLAN_CARD_v2026-02-24.2)",
  preview: !0
});
export {
  _e as StundenplanCard,
  me as StundenplanCardEditor
};
