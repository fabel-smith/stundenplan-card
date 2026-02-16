const at = globalThis, Et = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = /* @__PURE__ */ Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Et && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Pt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Pt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ge = (e) => new Gt(typeof e == "string" ? e : e + "", void 0, Ct), Qt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Gt(s, e, Ct);
}, _e = (e, t) => {
  if (Et) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), n = at.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = s.cssText, e.appendChild(r);
  }
}, Ut = Et ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return ge(s);
})(e) : e, { is: pe, defineProperty: fe, getOwnPropertyDescriptor: me, getOwnPropertyNames: ye, getOwnPropertySymbols: we, getPrototypeOf: ve } = Object, wt = globalThis, Ht = wt.trustedTypes, be = Ht ? Ht.emptyScript : "", $e = wt.reactiveElementPolyfillSupport, q = (e, t) => e, ft = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? be : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, Mt = (e, t) => !pe(e, t), Lt = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), wt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let F = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Lt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && fe(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: n } = me(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const a = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const e = ve(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const t = this.properties, s = [...ye(t), ...we(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(Ut(r));
    } else e !== void 0 && t.push(Ut(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return _e(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : ft).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ft;
      this._$Em = r;
      const a = o.fromAttribute(t, n.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Mt)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, a = this[r];
        o !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
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
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[q("elementProperties")] = /* @__PURE__ */ new Map(), F[q("finalized")] = /* @__PURE__ */ new Map(), $e?.({ ReactiveElement: F }), (wt.reactiveElementVersions ??= []).push("2.1.2");
const Dt = globalThis, zt = (e) => e, mt = Dt.trustedTypes, Ft = mt ? mt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Xt = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + T, Se = `<${te}>`, P = document, G = () => P.createComment(""), Q = (e) => e === null || typeof e != "object" && typeof e != "function", Tt = Array.isArray, xe = (e) => Tt(e) || typeof e?.[Symbol.iterator] == "function", St = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bt = /-->/g, Jt = />/g, O = RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, It = /"/g, ee = /^(?:script|style|textarea|title)$/i, ke = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), u = ke(1), J = /* @__PURE__ */ Symbol.for("lit-noChange"), y = /* @__PURE__ */ Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), N = P.createTreeWalker(P, 129);
function ie(e, t) {
  if (!Tt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const Ae = (e, t) => {
  const s = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = K;
  for (let c = 0; c < s; c++) {
    const l = e[c];
    let _, d, g = -1, h = 0;
    for (; h < l.length && (a.lastIndex = h, d = a.exec(l), d !== null); ) h = a.lastIndex, a === K ? d[1] === "!--" ? a = Bt : d[1] !== void 0 ? a = Jt : d[2] !== void 0 ? (ee.test(d[2]) && (n = RegExp("</" + d[2], "g")), a = O) : d[3] !== void 0 && (a = O) : a === O ? d[0] === ">" ? (a = n ?? K, g = -1) : d[1] === void 0 ? g = -2 : (g = a.lastIndex - d[2].length, _ = d[1], a = d[3] === void 0 ? O : d[3] === '"' ? It : Vt) : a === It || a === Vt ? a = O : a === Bt || a === Jt ? a = K : (a = O, n = void 0);
    const p = a === O && e[c + 1].startsWith("/>") ? " " : "";
    o += a === K ? l + Se : g >= 0 ? (r.push(_), l.slice(0, g) + Xt + l.slice(g) + T + p) : l + T + (g === -2 ? c : p);
  }
  return [ie(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class X {
  constructor({ strings: t, _$litType$: s }, r) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const c = t.length - 1, l = this.parts, [_, d] = Ae(t, s);
    if (this.el = X.createElement(_, r), N.currentNode = this.el.content, s === 2 || s === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (n = N.nextNode()) !== null && l.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const g of n.getAttributeNames()) if (g.endsWith(Xt)) {
          const h = d[a++], p = n.getAttribute(g).split(T), v = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: v[2], strings: p, ctor: v[1] === "." ? Ce : v[1] === "?" ? Me : v[1] === "@" ? De : vt }), n.removeAttribute(g);
        } else g.startsWith(T) && (l.push({ type: 6, index: o }), n.removeAttribute(g));
        if (ee.test(n.tagName)) {
          const g = n.textContent.split(T), h = g.length - 1;
          if (h > 0) {
            n.textContent = mt ? mt.emptyScript : "";
            for (let p = 0; p < h; p++) n.append(g[p], G()), N.nextNode(), l.push({ type: 2, index: ++o });
            n.append(g[h], G());
          }
        }
      } else if (n.nodeType === 8) if (n.data === te) l.push({ type: 2, index: o });
      else {
        let g = -1;
        for (; (g = n.data.indexOf(T, g + 1)) !== -1; ) l.push({ type: 7, index: o }), g += T.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const r = P.createElement("template");
    return r.innerHTML = t, r;
  }
}
function V(e, t, s = e, r) {
  if (t === J) return t;
  let n = r !== void 0 ? s._$Co?.[r] : s._$Cl;
  const o = Q(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, s, r)), r !== void 0 ? (s._$Co ??= [])[r] = n : s._$Cl = n), n !== void 0 && (t = V(e, n._$AS(e, t.values), n, r)), t;
}
class Ee {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: r } = this._$AD, n = (t?.creationScope ?? P).importNode(s, !0);
    N.currentNode = n;
    let o = N.nextNode(), a = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let _;
        l.type === 2 ? _ = new tt(o, o.nextSibling, this, t) : l.type === 1 ? _ = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (_ = new Te(o, this, t)), this._$AV.push(_), l = r[++c];
      }
      a !== l?.index && (o = N.nextNode(), a++);
    }
    return N.currentNode = P, n;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class tt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, r, n) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = V(this, t, s), Q(t) ? t === y || t == null || t === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : t !== this._$AH && t !== J && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== y && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = X.createElement(ie(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(s);
    else {
      const o = new Ee(n, this), a = o.u(this.options);
      o.p(s), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = Yt.get(t.strings);
    return s === void 0 && Yt.set(t.strings, s = new X(t)), s;
  }
  k(t) {
    Tt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, n = 0;
    for (const o of t) n === s.length ? s.push(r = new tt(this.O(G()), this.O(G()), this, this.options)) : r = s[n], r._$AI(o), n++;
    n < s.length && (this._$AR(r && r._$AB.nextSibling, n), s.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const r = zt(t).nextSibling;
      zt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, n, o) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = t, this.name = s, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = y;
  }
  _$AI(t, s = this, r, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = V(this, t, s, 0), a = !Q(t) || t !== this._$AH && t !== J, a && (this._$AH = t);
    else {
      const c = t;
      let l, _;
      for (t = o[0], l = 0; l < o.length - 1; l++) _ = V(this, c[r + l], s, l), _ === J && (_ = this._$AH[l]), a ||= !Q(_) || _ !== this._$AH[l], _ === y ? t = y : t !== y && (t += (_ ?? "") + o[l + 1]), this._$AH[l] = _;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ce extends vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === y ? void 0 : t;
  }
}
class Me extends vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== y);
  }
}
class De extends vt {
  constructor(t, s, r, n, o) {
    super(t, s, r, n, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = V(this, t, s, 0) ?? y) === J) return;
    const r = this._$AH, n = t === y && r !== y || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== y && (r === y || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Te {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const je = Dt.litHtmlPolyfillSupport;
je?.(X, tt), (Dt.litHtmlVersions ??= []).push("3.3.2");
const Re = (e, t, s) => {
  const r = s?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = s?.renderBefore ?? null;
    r._$litPart$ = n = new tt(t.insertBefore(G(), o), o, void 0, s ?? {});
  }
  return n._$AI(e), n;
}, jt = globalThis;
class B extends F {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Re(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return J;
  }
}
B._$litElement$ = !0, B.finalized = !0, jt.litElementHydrateSupport?.({ LitElement: B });
const We = jt.litElementPolyfillSupport;
We?.({ LitElement: B });
(jt.litElementVersions ??= []).push("4.2.2");
const Oe = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: Mt }, Ne = (e = Oe, t, s) => {
  const { kind: r, metadata: n } = s;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), r === "accessor") {
    const { name: a } = s;
    return { set(c) {
      const l = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, l, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: a } = s;
    return function(c) {
      const l = this[a];
      t.call(this, c), this.requestUpdate(a, l, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function se(e) {
  return (t, s) => typeof s == "object" ? Ne(e, t, s) : ((r, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, s);
}
function j(e) {
  return se({ ...e, state: !0, attribute: !1 });
}
var Pe = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, re = (e) => {
  throw TypeError(e);
}, x = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? Ue(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && Pe(t, s, n), n;
}, ne = (e, t, s) => t.has(e) || re("Cannot " + s), E = (e, t, s) => (ne(e, t, "read from private field"), s ? s.call(e) : t.get(e)), C = (e, t, s) => t.has(e) ? re("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), M = (e, t, s, r) => (ne(e, t, "write to private field"), t.set(e, s), s), lt, ct, ht, ut, dt, gt, _t, pt;
function yt(e) {
  return !!e && e.break === !0;
}
function Rt(e) {
  return Math.min(1, Math.max(0, e));
}
function oe(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const s = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
  return [s, r, n].some((o) => Number.isNaN(o)) ? null : { r: s, g: r, b: n };
}
function He(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Rt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function Le(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const s = oe(t);
  if (!s) return t;
  const r = typeof e.bg_alpha == "number" ? Rt(e.bg_alpha) : 0.18;
  return `rgba(${s.r}, ${s.g}, ${s.b}, ${r})`;
}
function ze(e, t) {
  const s = [], r = Le(e);
  return r && s.push(`background:${r}`), e?.color && s.push(`color:${e.color}`), s.push(`border:${e?.border ?? t}`), s.join(";") + ";";
}
function Kt(e, t) {
  const s = (e ?? "").toString().trim();
  if (!s) return `rgba(0,0,0,${t})`;
  if (s.startsWith("rgba(") || s.startsWith("rgb(") || s.startsWith("var(")) return s;
  if (s.startsWith("#")) {
    const r = oe(s);
    return r ? `rgba(${r.r}, ${r.g}, ${r.b}, ${Rt(t)})` : s;
  }
  return s;
}
function ot(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function kt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Fe(e) {
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
function Zt(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), s = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - s);
  const r = t.getUTCFullYear(), n = new Date(Date.UTC(r, 0, 1)), o = n.getUTCDay() === 0 ? 7 : n.getUTCDay(), a = new Date(n);
  a.setUTCDate(n.getUTCDate() + (4 - o));
  const c = t.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(c / (10080 * 60 * 1e3)), isoYear: r };
}
function qt(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function xt(e) {
  const t = (e ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || /^(—|\-|–|---|\s)+$/.test(t));
}
function Be(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const s = t.slice(7), r = s.match(/^(.+)_woche$/i);
  if (r?.[1]) return `number.${r[1]}_woche_offset`;
  const n = s.match(/^stundenplan_woche_(.+)$/i);
  return n?.[1] ? `number.${n[1]}_woche_offset` : "";
}
function Je(e) {
  const t = kt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var Z;
const k = (Z = class extends B {
  constructor() {
    super(...arguments), C(this, lt), C(this, ct), C(this, ht, []), C(this, ut, !1), C(this, dt, ""), C(this, gt, null), C(this, _t, "idle"), C(this, pt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return E(this, lt);
  }
  set hass(e) {
    M(this, lt, e);
  }
  get config() {
    return E(this, ct);
  }
  set config(e) {
    M(this, ct, e);
  }
  get _rowsCache() {
    return E(this, ht);
  }
  set _rowsCache(e) {
    M(this, ht, e);
  }
  get _noData() {
    return E(this, ut);
  }
  set _noData(e) {
    M(this, ut, e);
  }
  get _noDataMsg() {
    return E(this, dt);
  }
  set _noDataMsg(e) {
    M(this, dt, e);
  }
  get _jsonRows() {
    return E(this, gt);
  }
  set _jsonRows(e) {
    M(this, gt, e);
  }
  get _jsonStatus() {
    return E(this, _t);
  }
  set _jsonStatus(e) {
    M(this, _t, e);
  }
  get _jsonError() {
    return E(this, pt);
  }
  set _jsonError(e) {
    M(this, pt, e);
  }
  getWatchedEntities(e) {
    const t = /* @__PURE__ */ new Set(), s = (r) => {
      const n = (r ?? "").toString().trim();
      n && t.add(n);
    };
    return s(e.week_offset_entity), s(e.source_entity), s(e.source_entity_a), s(e.source_entity_b), s(e.week_map_entity), Array.from(t);
  }
  getEntitySig(e) {
    const t = this.hass?.states?.[e];
    if (!t) return `${e}:<missing>`;
    const s = t.last_updated ?? "", r = t.last_changed ?? "", n = t.state ?? "", o = t.attributes ?? {}, a = o.rows ?? o.rows_table ?? o.rows_json ?? o.rows_ha, c = Array.isArray(a) || typeof a == "string" ? a.length : 0;
    return `${e}|${s}|${r}|${n}|rowsLen=${c}`;
  }
  computeWatchSig(e) {
    const t = this.getWatchedEntities(e).map((n) => this.getEntitySig(n)), s = e.week_mode !== "off" ? this.getActiveWeek(e) : "off", r = this.getWeekOffsetValue(e);
    return `week=${s}|off=${r ?? "null"}::` + t.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const e = this.computeWatchSig(this.config);
    e !== this._lastWatchSig && (this._lastWatchSig = e, this.recomputeRows());
  }
  getWeekOffsetValue(e) {
    const t = (e.week_offset_entity ?? "").trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const s = this.hass.states[t], r = (e.week_offset_attribute ?? "").trim(), n = r ? s.attributes?.[r] : s.state, o = Number(n);
    return Number.isFinite(o) ? o : null;
  }
  async setWeekOffset(e, t) {
    const s = (e.week_offset_entity ?? "").trim();
    if (!s) return;
    const r = this.hass?.states?.[s], n = r?.attributes?.min, o = r?.attributes?.max, a = Number.isFinite(Number(n)) ? Number(n) : -52, c = Number.isFinite(Number(o)) ? Number(o) : 52;
    let l = t;
    l = Math.max(a, l), l = Math.min(c, l), await this.hass.callService("number", "set_value", { entity_id: s, value: l });
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
        t !== this._lastWeekOffset && (this._lastWeekOffset = t);
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
    const t = Z.getStubConfig(), s = ((e?.type ?? t.type) + "").toString();
    if (!(s === "custom:stundenplan-card" || s === "stundenplan-card")) {
      this.config = this.normalizeConfig(t), this.recomputeRows();
      return;
    }
    this.config = this.normalizeConfig({ ...t, ...e, type: s }), this.recomputeRows(), this._lastWatchSig = null;
  }
  getCardSize() {
    const e = this.config?.rows?.length ?? 3;
    return Math.max(3, e);
  }
  normalizeConfig(e) {
    const t = Z.getStubConfig(), s = Array.isArray(e.days) && e.days.length ? e.days.map((f) => (f ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(e.rows) ? e.rows : []).map((f) => {
      if (yt(f))
        return { break: !0, time: (f.time ?? "").toString(), label: (f.label ?? "Pause").toString() };
      const U = Array.isArray(f?.cells) ? f.cells : [], R = Array.from({ length: s.length }, (W, b) => (U[b] ?? "").toString()), S = Array.isArray(f?.cell_styles) ? f.cell_styles : [], H = Array.from({ length: s.length }, (W, b) => He(S[b])), et = (f?.time ?? "").toString(), I = ot(et), w = (f?.start ?? "").toString().trim(), m = (f?.end ?? "").toString().trim(), A = {
        time: et,
        start: w || I.start || void 0,
        end: m || I.end || void 0,
        cells: R
      };
      return H.some((W) => !!W) && (A.cell_styles = H), A;
    }), n = ((e.view_mode ?? "week") + "").toString().trim(), o = n === "rolling" ? "rolling" : "week", a = Number(e.days_ahead), c = Number.isFinite(a) ? Math.max(0, Math.min(6, Math.floor(a))) : 0, l = ((e.week_mode ?? t.week_mode) + "").toString().trim(), _ = l === "kw_parity" || l === "week_map" || l === "off" ? l : "off", d = (() => {
      const f = ((e.source_type ?? "") + "").toString().trim();
      if (f === "manual" || f === "entity" || f === "json" || f === "legacy") return f;
      const U = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (U) {
        const R = ((e.source_attribute_legacy ?? "") + "").toString().trim(), S = ((e.source_time_key_legacy ?? "") + "").toString().trim();
        return !(/_woche$/i.test(U) && (R === "" || R === "rows_table") && (S === "" || S === "time")) && (R || S) ? "legacy" : "entity";
      }
      return "manual";
    })(), g = (e.source_entity ?? t.source_entity).toString().trim(), h = (e.source_entity_integration ?? "").toString().trim(), p = (e.source_entity_legacy ?? "").toString().trim(), v = d === "legacy" ? p || g : d === "entity" && h || g, $ = (e.week_offset_entity ?? "").toString().trim() || Be(v);
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      days: s,
      view_mode: o,
      days_ahead: c,
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
      source_entity: v,
      source_entity_integration: h || "",
      source_entity_legacy: p || "",
      source_attribute: d === "entity" ? "rows_table" : ((e.source_attribute_legacy ?? e.source_attribute ?? "") + "").toString().trim() || "plan",
      source_time_key: d === "entity" ? "time" : ((e.source_time_key_legacy ?? e.source_time_key ?? "") + "").toString().trim() || "Stunde",
      source_type: d,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: $,
      week_offset_attribute: (e.week_offset_attribute ?? "").toString(),
      week_mode: _,
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
      rows: r
    };
  }
  getTodayIndex(e) {
    const t = (/* @__PURE__ */ new Date()).getDay(), s = new Set(Fe(t).map(kt));
    if (!s.size) return -1;
    const r = (e ?? []).map((n) => kt(n));
    for (let n = 0; n < r.length; n++) if (s.has(r[n])) return n;
    return -1;
  }
  toMinutes(e) {
    if (!e) return null;
    const [t, s] = e.split(":").map((r) => Number(r));
    return [t, s].some((r) => Number.isNaN(r)) ? null : t * 60 + s;
  }
  isNowBetween(e, t) {
    const s = this.toMinutes(e), r = this.toMinutes(t);
    if (s == null || r == null) return !1;
    const n = /* @__PURE__ */ new Date(), o = n.getHours() * 60 + n.getMinutes();
    return o >= s && o < r;
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
    const s = (e ?? "").toString().trim();
    if (!s || !this.hass?.states?.[s]) return null;
    const r = this.hass.states[s], n = (t ?? "").toString().trim(), o = n ? r.attributes?.[n] : r.state;
    return this.parseAnyJson(o);
  }
  buildRowsFromArray(e, t) {
    if (!Array.isArray(t)) return null;
    const s = e.days ?? [], r = (e.source_time_key ?? "time").toString().trim(), n = "Stunde", o = "time", a = t.map((c) => {
      if (c?.break === !0)
        return {
          break: !0,
          time: (c.time ?? c[i] ?? "").toString(),
          label: (c.label ?? "Pause").toString()
        };
      const l = (c?.time ?? c?.[r] ?? c?.[n] ?? c?.[o] ?? "").toString(), _ = ot(l), d = Array.from({ length: s.length }, (p, v) => {
        const $ = (s[v] ?? "").toString();
        return (c?.[$] ?? "").toString();
      }), g = (c?.start ?? "").toString().trim() || _.start, h = (c?.end ?? "").toString().trim() || _.end;
      return { time: l, start: g || void 0, end: h || void 0, cells: d };
    });
    return a.length ? a : null;
  }
  getRowsFromEntity(e, t, s) {
    let r = this.readEntityJson(t, s);
    if (r == null && s && (s + "").toString().trim() && (s + "").toString().trim() !== "plan" && (r = this.readEntityJson(t, "plan")), r == null && (r = this.readEntityJson(t, "rows_ha")), r == null && (r = this.readEntityJson(t, "rows")), r == null && (r = this.readEntityJson(t, "rows_table")), r == null && (r = this.readEntityJson(t, "rows_json")), r && typeof r == "object" && !Array.isArray(r)) {
      const n = r.plan, o = r.rows;
      Array.isArray(n) ? r = n : Array.isArray(o) && (r = o);
    }
    return Array.isArray(r) ? this.buildRowsFromArray(e, r) : null;
  }
  async loadJsonRows(e, t) {
    const s = (t ?? "").toString().trim();
    if (!s) {
      this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = "";
      return;
    }
    this._jsonStatus = "loading", this._jsonError = "";
    try {
      const r = await fetch(s, { cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const n = await r.json(), o = Array.isArray(n) ? n : Array.isArray(n?.rows) ? n.rows : null, a = o ? this.buildRowsFromArray(e, o) : null;
      this._jsonRows = a ?? [], this._jsonStatus = "ok";
    } catch (r) {
      this._jsonRows = [], this._jsonStatus = "error", this._jsonError = (r?.message ?? "JSON konnte nicht geladen werden").toString();
    } finally {
      this.requestUpdate();
    }
  }
  ensureJsonLoaded(e) {
    const t = (e.json_url ?? "").toString().trim();
    t === this._jsonUrlLast && this._jsonStatus !== "error" || (t !== this._jsonUrlLast && (this._jsonUrlLast = t, this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = ""), this._jsonStatus === "idle" && t && this.loadJsonRows(e, t));
  }
  weekFromParity(e) {
    const { isoWeek: t } = Zt(/* @__PURE__ */ new Date()), s = t % 2 === 0, r = !!e.week_a_is_even_kw;
    return s === r ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const s = (e.week_map_attribute ?? "").toString().trim(), r = this.readEntityJson(t, s);
    if (!r || typeof r != "object") return null;
    const { isoWeek: n, isoYear: o } = Zt(/* @__PURE__ */ new Date()), a = String(n), c = String(o);
    if (r?.[c] && typeof r[c] == "object") {
      const _ = qt(r[c][a]);
      if (_) return _;
    }
    return qt(r?.[a]) || null;
  }
  getActiveWeek(e) {
    return e.week_mode === "week_map" ? this.weekFromMap(e) ?? this.weekFromParity(e) : e.week_mode === "kw_parity" ? this.weekFromParity(e) : "A";
  }
  filterCellText(e, t) {
    return (e ?? "").toString().trim();
  }
  getBaseDate(e) {
    const t = this.getWeekOffsetValue(e) ?? 0, s = /* @__PURE__ */ new Date();
    return s.setHours(12, 0, 0, 0), s.setDate(s.getDate() + t * 7), s;
  }
  mondayOfWeek(e) {
    const t = new Date(e), s = t.getDay() === 0 ? 7 : t.getDay();
    return t.setDate(t.getDate() - (s - 1)), t.setHours(12, 0, 0, 0), t;
  }
  fmtDDMMYYYY(e) {
    const t = String(e.getDate()).padStart(2, "0"), s = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getFullYear());
    return `${t}.${s}.${r}`;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(e) {
    const t = (e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const s = this.hass.states[t].attributes ?? {}, r = s?.meta_ha?.days ?? s?.meta?.days ?? s?.days ?? (typeof s?.meta_json == "string" ? this.parseAnyJson(s.meta_json)?.days : null) ?? null;
    if (!Array.isArray(r) || r.length < 3) return null;
    const n = [];
    for (const o of r) {
      const a = (o ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const c = Number(a[1]), l = Number(a[2]), _ = Number(a[3]), d = new Date(c, l - 1, _, 12, 0, 0, 0);
      Number.isNaN(d.getTime()) || n.push(d);
    }
    return n.length ? n : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual";
    if (t === "manual")
      return e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const r = this.getActiveWeek(e), n = (e.source_entity_a ?? "").trim(), o = (e.source_entity_b ?? "").trim(), a = (e.source_attribute_a ?? "").trim(), c = (e.source_attribute_b ?? "").trim();
      if (r === "A" && n)
        return this.getRowsFromEntity(e, n, a) ?? [];
      if (r === "B" && o)
        return this.getRowsFromEntity(e, o, c) ?? [];
      const l = (e.source_entity ?? "").trim();
      return l ? this.getRowsFromEntity(e, l, (e.source_attribute_legacy ?? "").trim()) ?? [] : [];
    }
    const s = (e.source_entity ?? "").toString().trim();
    return s ? this.getRowsFromEntity(e, s, (e.source_attribute_legacy ?? "").toString().trim()) ?? [] : [];
  }
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [], this._noData = !1, this._noDataMsg = "";
      return;
    }
    const e = this.config, t = e.source_type ?? "manual", s = this.getRowsResolved(e);
    if (this._rowsCache = s, t === "manual") {
      this._noData = !1, this._noDataMsg = "";
      return;
    }
    const r = "Keine Daten für diesen Zeitraum (Ferien/Feiertag).";
    !s || s.length === 0 ? (this._noData = !0, t === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || r}` : t === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = r) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(e) {
    const t = (e ?? "").toString().replace(/\r/g, "").trim();
    if (!t) return null;
    const s = t.split(`
`).map((h) => h.trim()).filter((h) => h.length > 0);
    if (!s.length) return null;
    const r = s.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(r)) return null;
    const n = s[0];
    if (/^(—|\-|–|---)$/.test(n)) return null;
    const o = (h) => /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(h) || /\bfällt\s+aus\b/i.test(h) || /\bverlegt\b/i.test(h) || /\bentfällt\b/i.test(h) || /\bvertretung\b/i.test(h), a = (h) => /^\d{1,4}$/.test(h) || /^[A-ZÄÖÜ]{1,4}\d{1,3}$/i.test(h), c = s.slice(1);
    let l = -1;
    for (let h = 0; h < c.length; h++)
      if (!o(c[h]) && a(c[h])) {
        l = h;
        break;
      }
    if (l < 0) {
      for (let h = c.length - 1; h >= 0; h--)
        if (a(c[h])) {
          l = h;
          break;
        }
    }
    if (l < 0) return null;
    const _ = c[l];
    let d;
    for (let h = l + 1; h < c.length; h++) {
      const p = c[h];
      if (!o(p) && !a(p)) {
        d = p;
        break;
      }
    }
    if (!d) {
      const h = c.filter((p) => !o(p) && !a(p));
      d = h.length ? h[h.length - 1] : void 0;
    }
    const g = s.slice(1).filter((h) => o(h));
    return { fach: n, raum: _, lehrer: d, notes: g.length ? g : void 0 };
  }
  renderCell(e, t) {
    const s = (e ?? "").toString(), r = this.filterCellText(s, t);
    if (xt(r)) return u``;
    const n = this.parseCellTriplet(r);
    if (n?.fach && n?.raum && n?.lehrer)
      return u`
        <div class="cellWrap">
          <div class="fach">${n.fach}</div>
          <div class="lehrer">${n.lehrer}</div>
          <div class="raum">${n.raum}</div>

          ${n.notes?.length ? u`
                <div class="notes">
                  ${n.notes.map((l) => {
        const _ = l.startsWith("🔴") ? "note noteRed" : l.startsWith("🟠") ? "note noteOrange" : l.startsWith("🟡") ? "note noteYellow" : "note", d = l.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
        return u`<div class=${_}><span class="dot">${l.slice(0, 2).trim()}</span><span class="txt">${d}</span></div>`;
      })}
                </div>
              ` : u``}
        </div>
      `;
    const o = r.replace(/\r/g, "").split(`
`).map((l) => l.trim()).filter(Boolean), a = (o[0] ?? "").trim(), c = o.slice(1);
    return a && c.length ? u`
        <div class="cellWrap">
          <div class="fach">${a}</div>
          <div class="notes">
            ${c.map((l) => {
      const _ = l.startsWith("🔴") ? "note noteRed" : l.startsWith("🟠") ? "note noteOrange" : l.startsWith("🟡") ? "note noteYellow" : "note", d = l.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim(), g = /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(l) ? l.slice(0, 2).trim() : "•";
      return u`<div class=${_}><span class="dot">${g}</span><span class="txt">${d || l}</span></div>`;
    })}
          </div>
        </div>
      ` : u`<span class="cellText">${r}</span>`;
  }
  render() {
    if (!this.config) return u``;
    const e = this.config, t = this._rowsCache, s = this.getTodayIndex(e.days ?? []), r = (e.view_mode ?? "week").toString(), n = Number(e.days_ahead), o = Number.isFinite(n) ? Math.max(0, Math.min(6, Math.floor(n))) : 0, a = r === "rolling" && s >= 0 ? Array.from({ length: Math.min((e.days?.length ?? 0) - s, o + 1) }, (w, m) => s + m) : Array.from({ length: e.days?.length ?? 0 }, (w, m) => m), c = a.map((w) => e.days[w]), l = "1px solid var(--divider-color)", _ = Kt(e.highlight_today_color ?? "", 0.12), d = Kt(e.highlight_current_color ?? "", 0.18), g = (e.highlight_current_text_color ?? "").toString().trim(), h = (e.highlight_current_time_text_color ?? "").toString().trim(), p = e.week_mode !== "off", v = p ? this.getActiveWeek(e) : null, $ = this.getWeekOffsetValue(e), f = (e.source_type ?? "manual").toString(), U = (e.week_offset_entity ?? "").trim().length > 0, R = U && (f === "entity" || f === "legacy" && (e.week_mode ?? "off") !== "off"), S = this.getHeaderDaysFromEntity(e), H = S && S.length >= (e.days?.length ?? 0) ? S : null, et = this.getBaseDate(e), I = this.mondayOfWeek(et);
    return u`
      <ha-card>
        <div class="headerRow">
          <div class="title">${e.title ?? ""}</div>

          <div class="headRight">
            ${p ? u`<div class="weekBadgeInline">Woche <b>${v}</b></div>` : u``}

            ${R ? u`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => $ != null && this.setWeekOffset(e, $ - 1)}>&lt;</button>
                    <div class="offsetVal">${$ ?? "?"}</div>
                    <button class="btnMini" @click=${() => $ != null && this.setWeekOffset(e, $ + 1)}>&gt;</button>
                  </div>
                ` : u``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${c.map((w, m) => {
      const A = a[m], W = e.highlight_today && A === s ? "today" : "";
      let b = "";
      if (H)
        b = this.fmtDDMMYYYY(H[A]);
      else {
        const it = Je(w);
        if (it) {
          const st = new Date(I);
          st.setDate(I.getDate() + (it - 1)), b = this.fmtDDMMYYYY(st);
        }
      }
      return u`
                    <th class=${W} style=${`--sp-hl:${_};`}>
                      <div>${w}</div>
                      <div class="thDate">${b}</div>
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? u`<tr class="nodata"><td class="nodataCell" colspan=${c.length + 1}>${this._noDataMsg}</td></tr>` : t.map((w) => {
      if (yt(w)) {
        const Y = ot(w.time), rt = !!Y.start && !!Y.end && this.isNowBetween(Y.start, Y.end), L = !!e.highlight_breaks && rt;
        let z = `--sp-hl:${d};`, nt = "";
        return L && (z += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", nt += `--sp-hl:${d}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), L && e.highlight_current_time_text && h && (z += `color:${h};`), u`
                    <tr class="break">
                      <td class="time" style=${z}>${w.time}</td>
                      <td colspan=${c.length} style=${nt}>${w.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = w, A = m.cells ?? [], W = m.cell_styles ?? [], b = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), it = s >= 0 ? A[s] ?? "" : "", st = s >= 0 ? this.filterCellText(it, e) : "", ce = s >= 0 ? xt(st) : !1, bt = !(e.free_only_column_highlight && ce), Wt = ot(m.time), he = !!(Wt.start && Wt.end), Ot = !he && m.start && m.end ? `${m.start}–${m.end}` : "";
      let $t = `--sp-hl:${d};`;
      return bt && e.highlight_current && b && ($t += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), bt && b && e.highlight_current_time_text && h && ($t += `color:${h};`), u`
                  <tr>
                    <td class="time" style=${$t}>
                      <div class="timeWrap">
                        <div class="timeSt">${m.time}</div>
                        ${Ot ? u`<div class="timeHm">${Ot}</div>` : u``}
                      </div>
                    </td>

                    ${c.map((Y, rt) => {
        const L = a[rt], z = this.filterCellText(A[L] ?? "", e), nt = W[L] ?? null, ue = e.highlight_today && L === s ? "today" : "";
        let Nt = `--sp-hl:${_};` + ze(nt, l);
        const de = !xt(z);
        return bt && de && b && e.highlight_current_text && g && s >= 0 && rt === s && (Nt += `color:${g};`), u`<td class=${ue} style=${Nt}>${this.renderCell(z, e)}</td>`;
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
}, Z.styles = Qt`
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

    .headerRow {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 14px 8px 14px;
    }
    .title {
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
      font-size: 13px;
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
      font-size: 11px;
      opacity: 0.75;
      margin-top: 2px;
      font-weight: 600;
      white-space: nowrap;
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
      font-size: 13px;
      font-weight: 800;
    }
    .timeHm {
      font-size: 11px;
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
    .fach {
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
    .raum,
    .lehrer {
      font-size: 12px;
      opacity: 0.9;
      white-space: nowrap;
    }

    .notes {
      margin-top: 4px;
      display: grid;
      gap: 3px;
      justify-items: stretch;
      width: 100%;
      text-align: left;
    }
    .note {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 6px;
      align-items: start;
      font-size: 11px;
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
      font-size: 12px;
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
`, Z);
lt = /* @__PURE__ */ new WeakMap();
ct = /* @__PURE__ */ new WeakMap();
ht = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakMap();
gt = /* @__PURE__ */ new WeakMap();
_t = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakMap();
x([
  se({ attribute: !1 })
], k.prototype, "hass", 1);
x([
  j()
], k.prototype, "config", 1);
x([
  j()
], k.prototype, "_rowsCache", 1);
x([
  j()
], k.prototype, "_noData", 1);
x([
  j()
], k.prototype, "_noDataMsg", 1);
x([
  j()
], k.prototype, "_jsonRows", 1);
x([
  j()
], k.prototype, "_jsonStatus", 1);
x([
  j()
], k.prototype, "_jsonError", 1);
let ae = k;
function Ve(e, t, s) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: s,
      bubbles: !0,
      composed: !0
    })
  );
}
function D(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const s = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(s) ? !0 : ["0", "false", "no", "off"].includes(s) ? !1 : t;
}
function Ie(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ye(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const At = class extends B {
  constructor() {
    super(...arguments), this._open = {
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
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.ensureUiLoaded();
  }
  async ensureUiLoaded() {
    if (!this._uiLoaded) {
      this._uiLoaded = !0;
      try {
        await window.loadCardHelpers?.();
      } catch {
      }
      setTimeout(() => this.requestUpdate(), 0);
    }
  }
  setConfig(t) {
    this.ensureUiLoaded();
    const s = ((t?.type ?? "") + "").toString();
    if (s !== "custom:stundenplan-card" && s !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${s}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  normalizeConfig(t) {
    return new ae().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Ve(this, "config-changed", { config: t });
  }
  setValue(t, s) {
    this._config && this.emit({ ...this._config, [t]: s });
  }
  toggleOpen(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  findBestRowsAttribute(t) {
    const s = this.hass?.states?.[t]?.attributes ?? {};
    return s.rows_ha != null ? { attr: "rows_ha", timeKey: "time" } : s.rows != null ? { attr: "rows", timeKey: "time" } : s.rows_table != null ? { attr: "rows_table", timeKey: "time" } : s.rows_json != null ? { attr: "rows_json", timeKey: "time" } : { attr: "rows_ha", timeKey: "time" };
  }
  setSourceType(t) {
    if (!this._config) return;
    const s = t === "entity" || t === "json" || t === "manual" || t === "legacy" ? t : "manual", r = { ...this._config, source_type: s };
    s === "json" && r.json_url == null && (r.json_url = ""), s === "entity" && (r.source_entity == null && (r.source_entity = ""), r.source_attribute = "rows_table", r.source_time_key = "time"), s === "legacy" && (r.source_entity == null && (r.source_entity = ""), r.source_attribute = (r.source_attribute ?? "").toString().trim() || "plan", r.source_time_key = (r.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(r);
  }
  setSourceEntity(t) {
    if (!this._config) return;
    const s = (t ?? "").toString().trim(), r = (this._config.source_type ?? "manual").toString();
    if (r === "legacy") {
      this.emit({
        ...this._config,
        source_type: "legacy",
        source_entity: s,
        source_entity_legacy: s
      });
      return;
    }
    if (r === "entity") {
      this.emit({
        ...this._config,
        source_type: "entity",
        source_entity: s,
        source_entity_integration: s,
        source_attribute: "rows_table",
        source_time_key: "time"
      });
      return;
    }
    this.emit({
      ...this._config,
      source_entity: s
    });
  }
  setJsonUrl(t) {
    this._config && this.emit({
      ...this._config,
      source_type: "json",
      json_url: (t ?? "").toString()
    });
  }
  renderSection(t, s, r) {
    const n = !!this._open[s];
    return u`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(s)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${n ? "▾" : "▸"}</div>
        </div>
        ${n ? u`<div class="sectionBody">${r}</div>` : u``}
      </div>
    `;
  }
  onToggle(t, s) {
    const r = !!t?.target?.checked;
    this.setValue(s, r);
  }
  onText(t, s) {
    const r = (t?.detail?.value ?? t?.target?.value ?? t?.currentTarget?.value ?? "").toString();
    this.setValue(s, r);
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = { time: `${s.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    s.push(r), this.emit({ ...this._config, rows: s });
  }
  removeManualRow(t) {
    if (!this._config) return;
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    s.splice(t, 1), this.emit({ ...this._config, rows: s });
  }
  updateManualRow(t, s) {
    if (!this._config) return;
    const r = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = r[t];
    r[t] = { ...n, ...s }, this.emit({ ...this._config, rows: r });
  }
  updateManualCell(t, s, r) {
    if (!this._config) return;
    const n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], o = n[t];
    if (!o || yt(o)) return;
    const a = o, c = Array.isArray(a.cells) ? a.cells.slice() : [];
    c[s] = r, n[t] = { ...a, cells: c }, this.emit({ ...this._config, rows: n });
  }
  renderManualRows() {
    if (!this._config) return u``;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(this._config.rows) ? this._config.rows : [];
    return u`
      <div class="rowActions">
        <mwc-button outlined @click=${this.addManualRow}>+ Zeile</mwc-button>
      </div>

      ${s.map((r, n) => {
      if (yt(r))
        return u`
            <div class="rowCard">
              <div class="rowHead">
                <div class="rowTitle">Pause</div>
                <mwc-button dense @click=${() => this.removeManualRow(n)}>Entfernen</mwc-button>
              </div>
              <div class="grid2">
                <ha-textfield label="Zeit" .value=${r.time ?? ""} @input=${(a) => this.updateManualRow(n, { time: a.target.value })}></ha-textfield>
                <ha-textfield
                  label="Label"
                  .value=${r.label ?? "Pause"}
                  @input=${(a) => this.updateManualRow(n, { label: a.target.value })}
                ></ha-textfield>
              </div>
            </div>
          `;
      const o = r;
      return u`
          <div class="rowCard">
            <div class="rowHead">
              <div class="rowTitle">Zeile ${n + 1}</div>
              <div class="rowHeadBtns">
                <mwc-button dense @click=${() => this.updateManualRow(n, { ...o, break: !0, label: "Pause" })}
                  >Als Pause</mwc-button
                >
                <mwc-button dense @click=${() => this.removeManualRow(n)}>Entfernen</mwc-button>
              </div>
            </div>

            <div class="grid3">
              <ha-textfield label="Stunde" .value=${o.time ?? ""} @input=${(a) => this.updateManualRow(n, { time: a.target.value })}></ha-textfield>
              <ha-textfield label="Start" .value=${o.start ?? ""} @input=${(a) => this.updateManualRow(n, { start: a.target.value })}></ha-textfield>
              <ha-textfield label="Ende" .value=${o.end ?? ""} @input=${(a) => this.updateManualRow(n, { end: a.target.value })}></ha-textfield>
            </div>

            <div class="cellsGrid" style=${`grid-template-columns: repeat(${t.length}, minmax(0, 1fr));`}>
              ${t.map(
        (a, c) => u`
                  <div class="cellEditor">
                    <div class="cellEditorHead">${a}</div>
                    <ha-textarea
                      .value=${(o.cells?.[c] ?? "").toString()}
                      @input=${(l) => this.updateManualCell(n, c, l.target.value)}
                      placeholder="Fach\nRaum\nLehrer + Info-Zeilen"
                      autosize
                    ></ha-textarea>
                  </div>
                `
      )}
            </div>
          </div>
        `;
    })}
    `;
  }
  isHaEntityPickerAvailable() {
    return typeof customElements < "u" && !!customElements.get("ha-entity-picker");
  }
  render() {
    if (!this._config) return u``;
    const t = this._config;
    return u`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      u`
            <div class="grid2">
              <ha-textfield label="Titel" .value=${t.title ?? ""} @input=${(s) => this.onText(s, "title")}></ha-textfield>

              <ha-textfield
                label="Tage (CSV)"
                .value=${Ye(t.days ?? [])}
                @input=${(s) => this.setValue("days", Ie(s.target.value))}
                helper="z.B. Mo, Di, Mi, Do, Fr"
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
                .computeLabel=${(s) => s?.name === "view_mode" ? "Ansicht" : s?.name}
                @value-changed=${(s) => {
        try {
          s?.stopPropagation?.();
          const r = (s?.detail?.value ?? {}).view_mode ?? "week";
          this.setValue("view_mode", r);
        } catch (r) {
          console.error("stundenplan-card editor: view_mode change failed", r);
        }
      }}
              ></ha-form>

              ${(t.view_mode ?? "week") === "rolling" ? u`
                <ha-textfield
                  label="Tage im Voraus (0=heute)"
                  type="number"
                  .value=${String(t.days_ahead ?? 0)}
                  @input=${(s) => {
        const r = Number(s.target.value);
        this.setValue("days_ahead", Number.isFinite(r) ? Math.max(0, Math.min(6, Math.floor(r))) : 0);
      }}
                ></ha-textfield>
              ` : u``}
            </div>

            <div class="hint">„Ab heute“ zeigt nur heute + X Folgetage (innerhalb der konfigurierten Wochenspalten).</div>
          `
    )}

        ${this.renderSection(
      "Highlights",
      "highlights",
      u`
            <div class="grid3">
              <ha-switch .checked=${D(t.highlight_today, !0)} @change=${(s) => this.onToggle(s, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${D(t.highlight_current, !0)} @change=${(s) => this.onToggle(s, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${D(t.highlight_breaks, !1)} @change=${(s) => this.onToggle(s, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${D(t.free_only_column_highlight, !0)}
                @change=${(s) => this.onToggle(s, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${D(t.highlight_current_text, !1)} @change=${(s) => this.onToggle(s, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${D(t.highlight_current_time_text, !1)} @change=${(s) => this.onToggle(s, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-textfield label="Zeitfarbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_time_text_color")}></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      u`
            <div class="grid2">
              <ha-textfield label="Heute Overlay" .value=${t.highlight_today_color ?? ""} @input=${(s) => this.onText(s, "highlight_today_color")}></ha-textfield>
              <ha-textfield label="Aktuell Overlay" .value=${t.highlight_current_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_color")}></ha-textfield>
            </div>
          `
    )}
        ${this.renderSection(
      "Datenquellen",
      "sources",
      u`
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
                { value: "legacy", label: "Single-Source (Legacy / einfach)" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(s) => s?.name === "source_type" ? "Quelle" : s?.name}
                @value-changed=${(s) => {
        try {
          s?.stopPropagation?.();
          const r = (s?.detail?.value ?? {}).source_type ?? t.source_type ?? "manual";
          r !== (t.source_type ?? "manual") && this.setSourceType(r);
        } catch (r) {
          console.error("stundenplan-card editor: ha-form value-changed failed", r);
        }
      }}
              ></ha-form>
            </div>

            ${(t.source_type ?? "manual") === "entity" ? u`
                  <div class="hint">Stundenplan24: bitte einen <code>sensor.*_woche</code> auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? u`
                    ${(() => {
        const s = Object.keys(this.hass?.states ?? {}), r = s.filter((n) => /^sensor\./.test(n) && /_woche$/i.test(n));
        return s.length < 5 || r.length === 0 ? u`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : u``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(s) => {
        const n = ((typeof s == "string" ? s : s && typeof s == "object" && "entity_id" in s ? s.entity_id : "") ?? "").toString();
        return !n || /_woche$/i.test(n);
      }}
                      .label=${"Stundenplan24 Sensor"}
                      @value-changed=${(s) => {
        try {
          const r = s.detail?.value ?? s.target?.value, n = typeof r == "string" ? r : r && typeof r == "object" ? r.entity_id : void 0;
          this.setSourceEntity(n);
        } catch (r) {
          console.error("stundenplan-card editor: setSourceEntity failed", r);
        }
      }}
                    ></ha-entity-picker>
                  ` : u``}

                  <ha-textfield
                    label="Stundenplan24 Entity-ID (manuell)"
                    .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                    @value-changed=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-textfield>
                ` : u``}

            ${(t.source_type ?? "manual") === "legacy" ? u`
                  <div class="hint">Single-Source (Legacy): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? u`
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_legacy ?? t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(s) => {
        const n = ((typeof s == "string" ? s : s && typeof s == "object" && "entity_id" in s ? s.entity_id : "") ?? "").toString();
        return !n || /^sensor\./.test(n);
      }}
                      .label=${"Legacy Sensor"}
                      @value-changed=${(s) => {
        try {
          const r = s.detail?.value ?? s.target?.value, n = typeof r == "string" ? r : r && typeof r == "object" ? r.entity_id : void 0;
          this.setSourceEntity(n);
        } catch (r) {
          console.error("stundenplan-card editor: setSourceEntity failed", r);
        }
      }}
                    ></ha-entity-picker>
                  ` : u``}

                  <ha-textfield
                    label="Single-Source Entity-ID (manuell)"
                    .value=${t.source_entity_legacy ?? t.source_entity ?? ""}
                    @value-changed=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-textfield>

                  <div class="grid2">
                    <ha-textfield label="Attribut" .value=${t.source_attribute_legacy ?? ""} @value-changed=${(s) => this.onText(s, "source_attribute_legacy")} placeholder="plan"></ha-textfield>
                    <ha-textfield label="Time-Key" .value=${t.source_time_key_legacy ?? ""} @value-changed=${(s) => this.onText(s, "source_time_key_legacy")} placeholder="Stunde"></ha-textfield>
                  </div>
                  <div class="hint">Legacy: REST-Sensor + JSON-Attribut (z.B. <code>plan</code>) und Zeit-Key (z.B. <code>Stunde</code>).</div>

                  <div class="hint" style="margin-top:10px;">
                    Wechselwochen (A/B) gehört zu „Single-Source (Legacy / einfach)“.
                  </div>

                  <div class="grid2">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
        week_mode: t.week_mode ?? "off",
        week_a_is_even_kw: D(t.week_a_is_even_kw, !0)
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
                      .computeLabel=${(s) => s?.name === "week_mode" ? "Wechselwochen (A/B)" : s?.name === "week_a_is_even_kw" ? "Woche A" : s?.name}
                      @value-changed=${(s) => {
        try {
          s?.stopPropagation?.();
          const r = s?.detail?.value ?? {}, n = r.week_mode ?? t.week_mode ?? "off";
          n !== (t.week_mode ?? "off") && this.setValue("week_mode", n);
          const o = r.week_a_is_even_kw;
          typeof o == "boolean" && o !== D(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", o);
        } catch (r) {
          console.error("stundenplan-card editor: week settings change failed", r);
        }
      }}
                    ></ha-form>
                  </div>
` : u``}

          `
    )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }
};
At.properties = {
  hass: {},
  _config: { state: !0 }
}, At.styles = Qt`
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
      opacity: 0.9;
    }
    .hint {
      font-size: 12px;
      opacity: 0.85;
      line-height: 1.4;
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
    }
    .cellEditor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: var(--card-background-color);
      display: grid;
      gap: 8px;
    }
    .cellEditorHead {
      font-weight: 700;
      opacity: 0.9;
      font-size: 12px;
    }

    @media (max-width: 900px) {
      .grid2 {
        grid-template-columns: 1fr;
      }
      .grid3 {
        grid-template-columns: 1fr;
      }
    }
  `;
let le = At;
x([
  j()
], le.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", ae);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", le);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit Wochenblättern (Offset Helper auto) + Stundenplan24 Notes-Layout + Zeiten",
  preview: !0
});
export {
  ae as StundenplanCard,
  le as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
