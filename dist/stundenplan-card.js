const ht = globalThis, Mt = ht.ShadowRoot && (ht.ShadyCSS === void 0 || ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = /* @__PURE__ */ Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let Qt = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Mt && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Ut.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ut.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const pe = (e) => new Qt(typeof e == "string" ? e : e + "", void 0, Ct), Xt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Qt(s, e, Ct);
}, _e = (e, t) => {
  if (Mt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), n = ht.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = s.cssText, e.appendChild(r);
  }
}, Ht = Mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return pe(s);
})(e) : e, { is: fe, defineProperty: me, getOwnPropertyDescriptor: ye, getOwnPropertyNames: be, getOwnPropertySymbols: we, getPrototypeOf: ve } = Object, vt = globalThis, Bt = vt.trustedTypes, $e = Bt ? Bt.emptyScript : "", xe = vt.reactiveElementPolyfillSupport, G = (e, t) => e, bt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? $e : null;
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
} }, Tt = (e, t) => !fe(e, t), zt = { attribute: !0, type: String, converter: bt, reflect: !1, useDefault: !1, hasChanged: Tt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), vt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let J = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = zt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && me(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: n } = ye(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = ve(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const t = this.properties, s = [...be(t), ...we(t)];
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
      for (const r of s) t.unshift(Ht(r));
    } else e !== void 0 && t.push(Ht(e));
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : bt).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : bt;
      this._$Em = r;
      const a = o.fromAttribute(t, n.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Tt)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[G("elementProperties")] = /* @__PURE__ */ new Map(), J[G("finalized")] = /* @__PURE__ */ new Map(), xe?.({ ReactiveElement: J }), (vt.reactiveElementVersions ??= []).push("2.1.2");
const Dt = globalThis, Lt = (e) => e, wt = Dt.trustedTypes, Ft = wt ? wt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, te = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, ee = "?" + P, Se = `<${ee}>`, z = document, X = () => z.createComment(""), tt = (e) => e === null || typeof e != "object" && typeof e != "function", jt = Array.isArray, ke = (e) => jt(e) || typeof e?.[Symbol.iterator] == "function", kt = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Jt = /-->/g, It = />/g, H = RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Yt = /"/g, ie = /^(?:script|style|textarea|title)$/i, Ae = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), u = Ae(1), V = /* @__PURE__ */ Symbol.for("lit-noChange"), v = /* @__PURE__ */ Symbol.for("lit-nothing"), Zt = /* @__PURE__ */ new WeakMap(), B = z.createTreeWalker(z, 129);
function se(e, t) {
  if (!jt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const Ee = (e, t) => {
  const s = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = K;
  for (let c = 0; c < s; c++) {
    const l = e[c];
    let d, g, p = -1, h = 0;
    for (; h < l.length && (a.lastIndex = h, g = a.exec(l), g !== null); ) h = a.lastIndex, a === K ? g[1] === "!--" ? a = Jt : g[1] !== void 0 ? a = It : g[2] !== void 0 ? (ie.test(g[2]) && (n = RegExp("</" + g[2], "g")), a = H) : g[3] !== void 0 && (a = H) : a === H ? g[0] === ">" ? (a = n ?? K, p = -1) : g[1] === void 0 ? p = -2 : (p = a.lastIndex - g[2].length, d = g[1], a = g[3] === void 0 ? H : g[3] === '"' ? Yt : Vt) : a === Yt || a === Vt ? a = H : a === Jt || a === It ? a = K : (a = H, n = void 0);
    const _ = a === H && e[c + 1].startsWith("/>") ? " " : "";
    o += a === K ? l + Se : p >= 0 ? (r.push(d), l.slice(0, p) + te + l.slice(p) + P + _) : l + P + (p === -2 ? c : _);
  }
  return [se(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class et {
  constructor({ strings: t, _$litType$: s }, r) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const c = t.length - 1, l = this.parts, [d, g] = Ee(t, s);
    if (this.el = et.createElement(d, r), B.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = B.nextNode()) !== null && l.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(te)) {
          const h = g[a++], _ = n.getAttribute(p).split(P), y = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: y[2], strings: _, ctor: y[1] === "." ? Ce : y[1] === "?" ? Te : y[1] === "@" ? De : $t }), n.removeAttribute(p);
        } else p.startsWith(P) && (l.push({ type: 6, index: o }), n.removeAttribute(p));
        if (ie.test(n.tagName)) {
          const p = n.textContent.split(P), h = p.length - 1;
          if (h > 0) {
            n.textContent = wt ? wt.emptyScript : "";
            for (let _ = 0; _ < h; _++) n.append(p[_], X()), B.nextNode(), l.push({ type: 2, index: ++o });
            n.append(p[h], X());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ee) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(P, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += P.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const r = z.createElement("template");
    return r.innerHTML = t, r;
  }
}
function Y(e, t, s = e, r) {
  if (t === V) return t;
  let n = r !== void 0 ? s._$Co?.[r] : s._$Cl;
  const o = tt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, s, r)), r !== void 0 ? (s._$Co ??= [])[r] = n : s._$Cl = n), n !== void 0 && (t = Y(e, n._$AS(e, t.values), n, r)), t;
}
class Me {
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
    const { el: { content: s }, parts: r } = this._$AD, n = (t?.creationScope ?? z).importNode(s, !0);
    B.currentNode = n;
    let o = B.nextNode(), a = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new it(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new je(o, this, t)), this._$AV.push(d), l = r[++c];
      }
      a !== l?.index && (o = B.nextNode(), a++);
    }
    return B.currentNode = z, n;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class it {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, r, n) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Y(this, t, s), tt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ke(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = et.createElement(se(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(s);
    else {
      const o = new Me(n, this), a = o.u(this.options);
      o.p(s), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = Zt.get(t.strings);
    return s === void 0 && Zt.set(t.strings, s = new et(t)), s;
  }
  k(t) {
    jt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, n = 0;
    for (const o of t) n === s.length ? s.push(r = new it(this.O(X()), this.O(X()), this, this.options)) : r = s[n], r._$AI(o), n++;
    n < s.length && (this._$AR(r && r._$AB.nextSibling, n), s.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const r = Lt(t).nextSibling;
      Lt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, n, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = s, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = v;
  }
  _$AI(t, s = this, r, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = Y(this, t, s, 0), a = !tt(t) || t !== this._$AH && t !== V, a && (this._$AH = t);
    else {
      const c = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = Y(this, c[r + l], s, l), d === V && (d = this._$AH[l]), a ||= !tt(d) || d !== this._$AH[l], d === v ? t = v : t !== v && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ce extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Te extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class De extends $t {
  constructor(t, s, r, n, o) {
    super(t, s, r, n, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = Y(this, t, s, 0) ?? v) === V) return;
    const r = this._$AH, n = t === v && r !== v || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== v && (r === v || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class je {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const Re = Dt.litHtmlPolyfillSupport;
Re?.(et, it), (Dt.litHtmlVersions ??= []).push("3.3.2");
const Ne = (e, t, s) => {
  const r = s?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = s?.renderBefore ?? null;
    r._$litPart$ = n = new it(t.insertBefore(X(), o), o, void 0, s ?? {});
  }
  return n._$AI(e), n;
}, Rt = globalThis;
class I extends J {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ne(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
}
I._$litElement$ = !0, I.finalized = !0, Rt.litElementHydrateSupport?.({ LitElement: I });
const Pe = Rt.litElementPolyfillSupport;
Pe?.({ LitElement: I });
(Rt.litElementVersions ??= []).push("4.2.2");
const Oe = { attribute: !0, type: String, converter: bt, reflect: !1, hasChanged: Tt }, We = (e = Oe, t, s) => {
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
function re(e) {
  return (t, s) => typeof s == "object" ? We(e, t, s) : ((r, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, s);
}
function O(e) {
  return re({ ...e, state: !0, attribute: !1 });
}
var Ue = Object.defineProperty, He = Object.getOwnPropertyDescriptor, ne = (e) => {
  throw TypeError(e);
}, M = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? He(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, s, n) : a(n)) || n);
  return r && n && Ue(t, s, n), n;
}, oe = (e, t, s) => t.has(e) || ne("Cannot " + s), D = (e, t, s) => (oe(e, t, "read from private field"), s ? s.call(e) : t.get(e)), j = (e, t, s) => t.has(e) ? ne("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), R = (e, t, s, r) => (oe(e, t, "write to private field"), t.set(e, s), s), ut, dt, gt, pt, _t, ft, mt, yt;
function Q(e) {
  return !!e && e.break === !0;
}
function Nt(e) {
  return Math.min(1, Math.max(0, e));
}
function ae(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const s = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
  return [s, r, n].some((o) => Number.isNaN(o)) ? null : { r: s, g: r, b: n };
}
function Be(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Nt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function ze(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const s = ae(t);
  if (!s) return t;
  const r = typeof e.bg_alpha == "number" ? Nt(e.bg_alpha) : 0.18;
  return `rgba(${s.r}, ${s.g}, ${s.b}, ${r})`;
}
function Le(e, t) {
  const s = [], r = ze(e);
  return r && s.push(`background:${r}`), e?.color && s.push(`color:${e.color}`), s.push(`border:${e?.border ?? t}`), s.join(";") + ";";
}
function Kt(e, t) {
  const s = (e ?? "").toString().trim();
  if (!s) return `rgba(0,0,0,${t})`;
  if (s.startsWith("rgba(") || s.startsWith("rgb(") || s.startsWith("var(")) return s;
  if (s.startsWith("#")) {
    const r = ae(s);
    return r ? `rgba(${r.r}, ${r.g}, ${r.b}, ${Nt(t)})` : s;
  }
  return s;
}
function lt(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function At(e) {
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
function qt(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), s = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - s);
  const r = t.getUTCFullYear(), n = new Date(Date.UTC(r, 0, 1)), o = n.getUTCDay() === 0 ? 7 : n.getUTCDay(), a = new Date(n);
  a.setUTCDate(n.getUTCDate() + (4 - o));
  const c = t.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(c / (10080 * 60 * 1e3)), isoYear: r };
}
function Gt(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function ct(e) {
  const t = (e ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "—" || /^(—|\-|–|\s)+$/.test(t));
}
function Je(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const s = t.slice(7), r = s.match(/^(.+)_woche$/i);
  if (r?.[1]) return `number.${r[1]}_woche_offset`;
  const n = s.match(/^stundenplan_woche_(.+)$/i);
  return n?.[1] ? `number.${n[1]}_woche_offset` : "";
}
function Ie(e) {
  const t = At(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var q;
const C = (q = class extends I {
  constructor() {
    super(...arguments), j(this, ut), j(this, dt), j(this, gt, []), j(this, pt, !1), j(this, _t, ""), j(this, ft, null), j(this, mt, "idle"), j(this, yt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return D(this, ut);
  }
  set hass(e) {
    R(this, ut, e);
    try {
      const t = this.config;
      if ((t?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (t?.view_mode ?? "week").toString(), d = Number(t?.days_ahead), g = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0;
          if (l === "rolling" && g === 0) {
            const p = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (p && e?.states?.[p]) {
              const h = Number(e.states[p].state);
              Number.isFinite(h) && h !== 0 && (e.callService("number", "set_value", { entity_id: p, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const _ = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim();
                  _ && this.hass?.callService("homeassistant", "update_entity", { entity_id: _ });
                } catch {
                }
              }, 400));
            }
          }
        } catch {
        }
        const r = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim(), n = e, a = (r ? n?.states?.[r] : void 0)?.attributes ?? {}, c = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (r && c) {
          let l = ((t?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = r.replace(/^sensor\./, "number.") + "_offset");
          const d = l && n?.states && l in n.states, g = r + "|" + l;
          if (d && this.__autokickSig !== g) {
            this.__autokickSig = g;
            const p = n.states[l]?.state, h = Number(p), _ = Number.isFinite(h) ? h : 0;
            n.callService("number", "set_value", { entity_id: l, value: _ }).catch?.(() => {
            }), window.setTimeout(() => {
              try {
                this.hass?.callService("homeassistant", "update_entity", { entity_id: r });
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
    return D(this, dt);
  }
  set config(e) {
    R(this, dt, e);
  }
  get _rowsCache() {
    return D(this, gt);
  }
  set _rowsCache(e) {
    R(this, gt, e);
  }
  get _noData() {
    return D(this, pt);
  }
  set _noData(e) {
    R(this, pt, e);
  }
  get _noDataMsg() {
    return D(this, _t);
  }
  set _noDataMsg(e) {
    R(this, _t, e);
  }
  get _jsonRows() {
    return D(this, ft);
  }
  set _jsonRows(e) {
    R(this, ft, e);
  }
  get _jsonStatus() {
    return D(this, mt);
  }
  set _jsonStatus(e) {
    R(this, mt, e);
  }
  get _jsonError() {
    return D(this, yt);
  }
  set _jsonError(e) {
    R(this, yt, e);
  }
  getWatchedEntities(e) {
    const t = /* @__PURE__ */ new Set(), s = (r) => {
      const n = (r ?? "").toString().trim();
      n && t.add(n);
    };
    return s(e.week_offset_entity), s(e.source_entity), s(e.source_entity_integration), s(e.source_entity_legacy), s(e.source_entity_a), s(e.source_entity_b), s(e.week_map_entity), Array.from(t);
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
    const t = q.getStubConfig(), s = ((e?.type ?? t.type) + "").toString();
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
    const t = q.getStubConfig(), s = Array.isArray(e.days) && e.days.length ? e.days.map((f) => (f ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(e.rows) ? e.rows : []).map((f) => {
      if (Q(f))
        return { break: !0, time: (f.time ?? "").toString(), label: (f.label ?? "Pause").toString() };
      const $ = Array.isArray(f?.cells) ? f.cells : [], x = Array.from({ length: s.length }, (A, W) => ($[W] ?? "").toString()), k = Array.isArray(f?.cell_styles) ? f.cell_styles : [], b = Array.from({ length: s.length }, (A, W) => Be(k[W])), E = (f?.time ?? "").toString(), T = lt(E), st = (f?.start ?? "").toString().trim(), S = (f?.end ?? "").toString().trim(), w = {
        time: E,
        start: st || T.start || void 0,
        end: S || T.end || void 0,
        cells: x
      };
      return b.some((A) => !!A) && (w.cell_styles = b), w;
    }), n = ((e.view_mode ?? "week") + "").toString().trim(), o = n === "rolling" ? "rolling" : "week", a = Number(e.days_ahead), c = Number.isFinite(a) ? Math.max(0, Math.min(6, Math.floor(a))) : 0, l = ((e.week_mode ?? t.week_mode) + "").toString().trim(), d = l === "kw_parity" || l === "week_map" || l === "off" ? l : "off", g = (() => {
      const f = ((e.source_type ?? "") + "").toString().trim();
      if (f === "manual" || f === "entity" || f === "json" || f === "sensor") return f;
      const $ = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if ($) {
        const x = ((e.source_attribute ?? "") + "").toString().trim(), k = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test($) && (x === "" || x === "rows_table") && (k === "" || k === "time")) && (x || k) ? "legacy" : "entity";
      }
      return "manual";
    })(), p = (e.source_entity ?? t.source_entity).toString().trim(), h = (e.source_entity_integration ?? "").toString().trim(), _ = (e.source_entity_legacy ?? "").toString().trim(), y = g === "sensor" ? _ || p : g === "entity" && h || p, m = (e.week_offset_entity ?? "").toString().trim() || Je(y);
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
      source_entity: y,
      source_entity_integration: h || "",
      source_entity_legacy: _ || "",
      source_attribute: g === "entity" ? "rows_table" : ((e.source_attribute ?? "") + "").toString().trim() || "plan",
      source_time_key: g === "entity" ? "time" : ((e.source_time_key ?? "") + "").toString().trim() || "Stunde",
      source_type: g,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: m,
      week_offset_attribute: (e.week_offset_attribute ?? "").toString(),
      week_mode: d,
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
  getTodayIndex(e, t) {
    const s = /* @__PURE__ */ new Date(), r = `${s.getFullYear()}${String(s.getMonth() + 1).padStart(2, "0")}${String(s.getDate()).padStart(2, "0")}`;
    if (Array.isArray(t) && t.length) {
      const l = t.map((d) => {
        if (d instanceof Date && !Number.isNaN(d.getTime()))
          return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
        const g = (d ?? "").toString().trim(), p = g.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return p ? `${p[1]}${p[2]}${p[3]}` : g;
      }).indexOf(r);
      return l >= 0 ? l : -1;
    }
    const n = s.getDay(), o = new Set(Fe(n).map(At));
    if (!o.size) return -1;
    const a = (e ?? []).map((c) => At(c));
    for (let c = 0; c < a.length; c++) if (o.has(a[c])) return c;
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
      const l = (c?.time ?? c?.[r] ?? c?.[n] ?? c?.[o] ?? "").toString(), d = lt(l), g = Array.from({ length: s.length }, (_, y) => {
        const m = (s[y] ?? "").toString();
        return (c?.[m] ?? "").toString();
      }), p = (c?.start ?? "").toString().trim() || d.start, h = (c?.end ?? "").toString().trim() || d.end;
      return { time: l, start: p || void 0, end: h || void 0, cells: g };
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
    const { isoWeek: t } = qt(/* @__PURE__ */ new Date()), s = t % 2 === 0, r = !!e.week_a_is_even_kw;
    return s === r ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const s = (e.week_map_attribute ?? "").toString().trim(), r = this.readEntityJson(t, s);
    if (!r || typeof r != "object") return null;
    const { isoWeek: n, isoYear: o } = qt(/* @__PURE__ */ new Date()), a = String(n), c = String(o);
    if (r?.[c] && typeof r[c] == "object") {
      const d = Gt(r[c][a]);
      if (d) return d;
    }
    return Gt(r?.[a]) || null;
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
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const s = this.hass.states[t].attributes ?? {}, r = s?.meta_ha?.days ?? s?.meta?.days ?? s?.days ?? (typeof s?.meta_json == "string" ? this.parseAnyJson(s.meta_json)?.days : null) ?? null;
    if (!Array.isArray(r) || r.length < 3) return null;
    const n = [];
    for (const o of r) {
      const a = (o ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const c = Number(a[1]), l = Number(a[2]), d = Number(a[3]), g = new Date(c, l - 1, d, 12, 0, 0, 0);
      Number.isNaN(g.getTime()) || n.push(g);
    }
    return n.length ? n : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const s = this.hass.states[t].attributes ?? {}, r = s?.meta_ha ?? s?.meta ?? (typeof s?.meta_json == "string" ? this.parseAnyJson(s.meta_json) : null) ?? null;
    if (!r) return null;
    const n = (e.days?.length ?? 0) || 5, o = r?.updated_days;
    if (Array.isArray(o) && o.length) {
      const c = (o[0] ?? "").toString().trim();
      return Array.from({ length: n }, (d, g) => (o[g] ?? c ?? "").toString().trim());
    }
    const a = (r?.updated_raw ?? r?.updated ?? "").toString().trim();
    return a ? Array.from({ length: n }, () => a) : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", s = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const n = this.getActiveWeek(e), o = (e.source_entity_a ?? "").trim(), a = (e.source_entity_b ?? "").trim(), c = (e.source_attribute_a ?? "").trim(), l = (e.source_attribute_b ?? "").trim();
      if (n === "A" && o)
        return this.getRowsFromEntity(e, o, c) ?? [];
      if (n === "B" && a)
        return this.getRowsFromEntity(e, a, l) ?? [];
      const d = s;
      return d ? this.getRowsFromEntity(e, d, (e.source_attribute ?? "").toString().trim()) ?? [] : [];
    }
    const r = s;
    return r ? this.getRowsFromEntity(e, r, (e.source_attribute ?? "").toString().trim()) ?? [] : [];
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
    const o = (h) => {
      const _ = (h ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(_) || /\bfällt\s+aus\b/i.test(_) || /\bverlegt\b/i.test(_) || /\bentfällt\b/i.test(_) || /\bvertretung\b/i.test(_) || /\bstatt\b/i.test(_) || /\bgehalten\b/i.test(_) || /\bAufgaben\b/i.test(_) || /^für\b/i.test(_);
    }, a = (h) => {
      const _ = (h ?? "").toString().trim();
      return /^\d{1,4}$/.test(_) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(_) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(_);
    }, c = s.slice(1);
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
    const d = c[l];
    let g;
    for (let h = l + 1; h < c.length; h++) {
      const _ = c[h];
      if (!o(_) && !a(_)) {
        g = _;
        break;
      }
    }
    if (!g) {
      const h = c.filter((_) => !o(_) && !a(_));
      g = h.length ? h[h.length - 1] : void 0;
    }
    const p = s.slice(1).filter((h) => o(h));
    return { fach: n, raum: d, lehrer: g, notes: p.length ? p : void 0 };
  }
  renderCell(e, t) {
    const s = (e ?? "").toString(), r = this.filterCellText(s, t);
    if (ct(r)) return u``;
    const n = (() => {
      let y = r.replace(/\r/g, "").split(`
`).map((f) => (f ?? "").toString().trim());
      for (; y.length && /^(—|–|-)$/.test(y[0]); ) y.shift();
      const m = [];
      for (const f of y) {
        const $ = f.length === 0;
        if (!/^(—|–|-)$/.test(f)) {
          if ($) {
            if (m.length === 0 || m[m.length - 1] === "") continue;
            m.push("");
            continue;
          }
          m.push(f);
        }
      }
      for (; m.length && m[m.length - 1] === ""; ) m.pop();
      return m.join(`
`);
    })();
    if (ct(n)) return u``;
    const o = n.split(/\n\s*\n/).map((y) => y.trim()).filter(Boolean), a = this.parseCellTriplet(n), c = (y) => {
      if (y.startsWith("🔴")) return "note noteRed";
      if (y.startsWith("🟠")) return "note noteOrange";
      if (y.startsWith("🟡")) return "note noteYellow";
      const m = y;
      return /\bfällt\s+aus\b/i.test(m) || /\bverlegt\b/i.test(m) || /\bstatt\b/i.test(m) || /\bgehalten\b/i.test(m) || /\bentfällt\b/i.test(m) ? "note noteRed" : "note";
    }, l = (y) => (y ?? "").toString().replace(new RegExp("^\\p{Extended_Pictographic}+\\s*", "u"), "").replace(/^[�]+\s*/, "").trim();
    if (o.length === 1 && a?.fach && a?.raum && a?.lehrer)
      return u`
        <div class="cellWrap">
          <div class="fach">${a.fach}</div>
          <div class="lehrer">${a.lehrer}</div>
          <div class="raum">${a.raum}</div>

          ${a.notes?.length ? u`
                <div class="notes">
                  ${a.notes.map((y) => {
        const m = c(y), f = l(y) || y;
        return u`<div class=${m}><span class="txt">${f}</span></div>`;
      })}
                </div>
              ` : u``}
        </div>
      `;
    const d = (y) => {
      const m = (y ?? "").toString().trim();
      if (!m) return u``;
      const f = this.parseCellTriplet(m);
      if (f?.fach && f?.raum && f?.lehrer)
        return u`
          <div class="cellWrap">
            <div class="fach">${f.fach}</div>
            <div class="lehrer">${f.lehrer}</div>
            <div class="raum">${f.raum}</div>

            ${f.notes?.length ? u`
                  <div class="notes">
                    ${f.notes.map((b) => {
          const E = c(b), T = l(b) || b;
          return u`<div class=${E}><span class="txt">${T}</span></div>`;
        })}
                  </div>
                ` : u``}
          </div>
        `;
      const $ = m.split(`
`).map((b) => b.trim()).filter(Boolean), x = ($[0] ?? "").trim(), k = $.slice(1);
      return x && k.length ? u`
          <div class="cellWrap">
            <div class="fach">${x}</div>
            <div class="notes">
              ${k.map((b) => {
        const E = c(b), T = l(b) || b;
        return u`<div class=${E}><span class="txt">${T}</span></div>`;
      })}
            </div>
          </div>
        ` : u`<span class="cellText">${m}</span>`;
    };
    if (o.length > 1)
      return u`<div class="cellMulti">${o.map((y) => d(y))}</div>`;
    const g = (n ?? "").split(`
`).map((y) => y.trim()).filter(Boolean), p = /^\d{1,4}$/, h = /^[A-ZÄÖÜ]{2,6}$/, _ = (y) => {
      const m = (y ?? "").trim();
      if (!m || p.test(m) || h.test(m)) return !1;
      const f = m.toLowerCase();
      return f.startsWith("statt ") || f.includes("fällt aus") || f.includes("verlegt") || f.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(m) ? !1 : /[a-z0-9äöü]/i.test(m);
    };
    if (g.length >= 6 && g.length % 3 === 0) {
      const y = [];
      for (let m = 0; m < g.length; m += 3) {
        const f = g[m] ?? "", $ = g[m + 1] ?? "", x = g[m + 2] ?? "";
        if (!_(f) || !p.test($) || !h.test(x)) {
          y.length = 0;
          break;
        }
        y.push([f, $, x].join(`
`));
      }
      if (y.length >= 2)
        return u`<div class="cellMulti">${y.map((m) => d(m))}</div>`;
    }
    return d(n);
  }
  render() {
    if (!this.config) return u``;
    const e = this.config, t = this._rowsCache, s = this.getHeaderDaysFromEntity(e), r = this.getTodayIndex(e.days ?? [], s), n = (e.view_mode ?? "week").toString(), o = Number(e.days_ahead), a = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, c = n === "rolling" && r >= 0 ? Array.from({ length: Math.min((e.days?.length ?? 0) - r, a + 1) }, (S, w) => r + w) : Array.from({ length: e.days?.length ?? 0 }, (S, w) => w), l = c.map((S) => e.days[S]), d = "1px solid var(--divider-color)", g = Kt(e.highlight_today_color ?? "", 0.12), p = Kt(e.highlight_current_color ?? "", 0.18), h = (e.highlight_current_text_color ?? "").toString().trim(), _ = (e.highlight_current_time_text_color ?? "").toString().trim(), y = e.week_mode !== "off", m = y ? this.getActiveWeek(e) : null, f = this.getWeekOffsetValue(e), $ = (e.source_type ?? "manual").toString(), x = (e.week_offset_entity ?? "").trim().length > 0, k = x && ($ === "entity" || $ === "sensor" && (e.week_mode ?? "off") !== "off"), b = s && s.length >= (e.days?.length ?? 0) ? s : null, E = this.getHeaderUpdatedFromEntity(e), T = this.getBaseDate(e), st = this.mondayOfWeek(T);
    return u`
      <ha-card>
        <div class="headerRow">
          <div class="title">${e.title ?? ""}</div>

          <div class="headRight">
            ${y ? u`<div class="weekBadgeInline">Woche <b>${m}</b></div>` : u``}

            ${k ? u`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => f != null && this.setWeekOffset(e, f - 1)}>&lt;</button>
                    <div class="offsetVal">${f ?? "?"}</div>
                    <button class="btnMini" @click=${() => f != null && this.setWeekOffset(e, f + 1)}>&gt;</button>
                  </div>
                ` : u``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${l.map((S, w) => {
      const A = c[w], W = e.highlight_today && A === r ? "today" : "";
      let U = "";
      if (b)
        U = this.fmtDDMMYYYY(b[A]);
      else {
        const rt = Ie(S);
        if (rt) {
          const nt = new Date(st);
          nt.setDate(st.getDate() + (rt - 1)), U = this.fmtDDMMYYYY(nt);
        }
      }
      return u`
                    <th class=${W} style=${`--sp-hl:${g};`}>
                      <div>${S}</div>
                      <div class="thDate">${U}</div>
                      ${E?.[A] ? u`<div class="thUpdated">(aktualisiert: ${E[A]})</div>` : u``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? u`<tr class="nodata"><td class="nodataCell" colspan=${l.length + 1}>${this._noDataMsg}</td></tr>` : t.map((S) => {
      if (Q(S)) {
        const Z = lt(S.time), ot = !!Z.start && !!Z.end && this.isNowBetween(Z.start, Z.end), L = !!e.highlight_breaks && ot;
        let F = `--sp-hl:${p};`, at = "";
        return L && (F += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", at += `--sp-hl:${p}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), L && e.highlight_current_time_text && _ && (F += `color:${_};`), u`
                    <tr class="break">
                      <td class="time" style=${F}>${S.time}</td>
                      <td colspan=${l.length} style=${at}>${S.label ?? ""}</td>
                    </tr>
                  `;
      }
      const w = S, A = w.cells ?? [], W = w.cell_styles ?? [], U = !!w.start && !!w.end && this.isNowBetween(w.start, w.end), rt = r >= 0 ? A[r] ?? "" : "", nt = r >= 0 ? this.filterCellText(rt, e) : "", he = r >= 0 ? ct(nt) : !1, xt = !(e.free_only_column_highlight && he), Pt = lt(w.time), ue = !!(Pt.start && Pt.end), Ot = !ue && w.start && w.end ? `${w.start}–${w.end}` : "";
      let St = `--sp-hl:${p};`;
      return xt && e.highlight_current && U && (St += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), xt && U && e.highlight_current_time_text && _ && (St += `color:${_};`), u`
                  <tr>
                    <td class="time" style=${St}>
                      <div class="timeWrap">
                        <div class="timeSt">${w.time}</div>
                        ${Ot ? u`<div class="timeHm">${Ot}</div>` : u``}
                      </div>
                    </td>

                    ${l.map((Z, ot) => {
        const L = c[ot], F = this.filterCellText(A[L] ?? "", e), at = W[L] ?? null, de = e.highlight_today && L === r ? "today" : "";
        let Wt = `--sp-hl:${g};` + Le(at, d);
        const ge = !ct(F);
        return xt && ge && U && e.highlight_current_text && h && r >= 0 && ot === r && (Wt += `color:${h};`), u`<td class=${de} style=${Wt}>${this.renderCell(F, e)}</td>`;
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
}, q.styles = Xt`
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
    .thUpdated {
      font-size: 10px;
      opacity: 0.7;
      margin-top: 1px;
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
      justify-items: center;
      width: 100%;
      text-align: center;
    }
    .note {
      display: block;
      text-align: center;
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
`, q);
ut = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakMap();
gt = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakMap();
_t = /* @__PURE__ */ new WeakMap();
ft = /* @__PURE__ */ new WeakMap();
mt = /* @__PURE__ */ new WeakMap();
yt = /* @__PURE__ */ new WeakMap();
M([
  re({ attribute: !1 })
], C.prototype, "hass", 1);
M([
  O()
], C.prototype, "config", 1);
M([
  O()
], C.prototype, "_rowsCache", 1);
M([
  O()
], C.prototype, "_noData", 1);
M([
  O()
], C.prototype, "_noDataMsg", 1);
M([
  O()
], C.prototype, "_jsonRows", 1);
M([
  O()
], C.prototype, "_jsonStatus", 1);
M([
  O()
], C.prototype, "_jsonError", 1);
let le = C;
function Ve(e, t, s) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: s,
      bubbles: !0,
      composed: !0
    })
  );
}
function N(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const s = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(s) ? !0 : ["0", "false", "no", "off"].includes(s) ? !1 : t;
}
function Ye(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ze(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Et = class extends I {
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
        const s = t.connection.subscribeEntities;
        typeof s == "function" && (this._didSubEntities = !0, this._unsubEntities = await s(() => {
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
    const s = ((t?.type ?? "") + "").toString();
    if (s !== "custom:stundenplan-card" && s !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${s}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  normalizeConfig(t) {
    return new le().normalizeConfig(t);
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
    const s = t === "entity" || t === "json" || t === "manual" || t === "sensor" ? t : "manual", r = { ...this._config, source_type: s };
    s === "json" && r.json_url == null && (r.json_url = ""), s === "entity" && (r.source_entity == null && (r.source_entity = ""), r.source_attribute = "rows_table", r.source_time_key = "time"), s === "sensor" && (r.source_entity == null && (r.source_entity = ""), r.source_entity_integration = "", r.source_attribute = (r.source_attribute ?? "").toString().trim() || "plan", r.source_time_key = (r.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(r);
  }
  setSourceEntity(t) {
    if (!this._config) return;
    const s = (t ?? "").toString().trim(), r = (this._config.source_type ?? "manual").toString();
    if (r === "sensor") {
      this.emit({
        ...this._config,
        source_type: "legacy",
        source_entity: s,
        source_entity_legacy: s
      });
      return;
    }
    if (r === "entity") {
      const n = (s ?? "").toString().trim();
      let o = "";
      n && (o = n.replace(/^sensor\./, "number.") + "_offset"), this.emit({
        ...this._config,
        source_type: "entity",
        source_entity: s,
        source_entity_integration: s,
        source_attribute: "rows_table",
        source_time_key: "time",
        week_offset_entity: o
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
    if (!this._config) return;
    const r = t?.detail?.value ?? t?.target?.value ?? t?.currentTarget?.value ?? t?.target?.checked ?? "";
    this.emit({
      ...this._config,
      [s]: r
    });
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = { time: `${s.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    s.push(r), this.emit({ ...this._config, rows: s });
  }
  insertManualRowBelow(t) {
    if (!this._config) return;
    const s = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], r = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = { time: `${t + 2}.`, start: "", end: "", cells: Array.from({ length: s.length }, () => "") };
    r.splice(t + 1, 0, n), this.emit({ ...this._config, rows: r });
  }
  insertManualBreakBelow(t) {
    if (!this._config) return;
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    s.splice(t + 1, 0, { break: !0, time: "", label: "Pause" }), this.emit({ ...this._config, rows: s });
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
    if (!o || Q(o)) return;
    const a = o, c = Array.isArray(a.cells) ? a.cells.slice() : [];
    c[s] = r, n[t] = { ...a, cells: c }, this.emit({ ...this._config, rows: n });
  }
  addLessonRow() {
    this.addManualRow();
  }
  addBreakRow() {
    if (!this._config) return;
    const t = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    t.push({ break: !0, time: "", label: "Pause" }), this.emit({ ...this._config, rows: t });
  }
  toggleManualBreak(t, s) {
    if (!this._config) return;
    const r = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], o = n[t];
    if (o) {
      if (s) {
        const a = (o.time ?? "").toString(), c = (o.label ?? "Pause").toString();
        n[t] = { break: !0, time: a, label: c };
      } else {
        const a = (o.time ?? "").toString();
        n[t] = { time: a, start: "", end: "", cells: Array.from({ length: r.length }, () => "") };
      }
      this.emit({ ...this._config, rows: n });
    }
  }
  updateManualCellStyle(t, s, r) {
    if (!this._config) return;
    const n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], o = n[t];
    if (!o || Q(o)) return;
    const a = o, c = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = c[s] ?? {};
    c[s] = { ...l, ...r }, n[t] = { ...a, cell_styles: c }, this.emit({ ...this._config, rows: n });
  }
  renderManualRows() {
    if (!this._config) return u``;
    const t = this._config, s = t.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], r = Array.isArray(t.rows) ? t.rows : [];
    return u`
      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan (Zeilen)</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Cell-Styles</div>
            <ha-switch
              .checked=${!!this._showCellStyles}
              @change=${(n) => {
      this._showCellStyles = !!n?.target?.checked, this.requestUpdate();
    }}
            ></ha-switch>
          </div>

          <mwc-button outlined @click=${this.addLessonRow}>+ Stunde</mwc-button>
          <mwc-button outlined @click=${this.addBreakRow}>+ Pause</mwc-button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">
        Pro Zeile: Zeit + optional Start/Ende. Per Klick in der Vorschau springst du zur passenden Zelle.
      </div>

      ${r.map((n, o) => {
      const a = Q(n), c = a ? `Pause · ${(n.time ?? "").toString()}` : `Stunde · ${(n.time ?? "").toString()}`, l = n, d = (l.start ?? "").toString(), g = (l.end ?? "").toString(), p = (n.label ?? "Pause").toString();
      return u`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[o] ?? !1}
            @toggle=${(h) => {
        try {
          this._rowOpen[o] = !!h?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${c || `Zeile ${o + 1}`}</div>
                <div class="rowHeadMeta">${a ? p : `${d || "Start?"} – ${g || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-textfield
                  label="Zeit / Stunde"
                  .value=${(n.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(h) => this.updateManualRow(o, { time: h?.target?.value ?? "" })}
                ></ha-textfield>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${a} @change=${(h) => this.toggleManualBreak(o, !!h?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${a ? u`
                    <ha-textfield
                      label="Pausentext"
                      .value=${p}
                      placeholder="z. B. Große Pause"
                      @input=${(h) => this.updateManualRow(o, { label: h?.target?.value ?? "" })}
                    ></ha-textfield>
                  ` : u`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-textfield
                        label="Start (HH:MM)"
                        .value=${d}
                        @input=${(h) => this.updateManualRow(o, { start: h?.target?.value ?? "" })}
                      ></ha-textfield>
                      <ha-textfield
                        label="Ende (HH:MM)"
                        .value=${g}
                        @input=${(h) => this.updateManualRow(o, { end: h?.target?.value ?? "" })}
                      ></ha-textfield>
                    </div>

                    <div class="cellsGrid" style=${`grid-template-columns: repeat(${s.length}, minmax(220px, 1fr));`}>
                      ${s.map((h, _) => {
        const y = (l.cells?.[_] ?? "").toString(), m = (Array.isArray(l.cell_styles) ? l.cell_styles?.[_] : void 0) ?? {}, f = (m?.bg ?? "#000000").toString(), $ = typeof m?.bg_alpha == "number" && !Number.isNaN(m.bg_alpha) ? m.bg_alpha : 0.18, x = Math.round($ * 100), k = (m?.color ?? "#ffffff").toString();
        return u`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${h}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${y}
                              @input=${(b) => this.updateManualCell(o, _, b?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${f} @input=${(b) => this.updateManualCellStyle(o, _, { bg: b?.target?.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String(x)}
                                    @input=${(b) => this.updateManualCellStyle(o, _, { bg_alpha: Number(b?.target?.value ?? 0) / 100 })}
                                  />
                                  <div class="pct">${x}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${k} @input=${(b) => this.updateManualCellStyle(o, _, { color: b?.target?.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowFoot">
                <div class="rowActions">
                  <button type="button" class="spBtn" @click=${() => this.insertManualRowBelow(o)}>+ Stunde darunter</button>
                  <button type="button" class="spBtn" @click=${() => this.insertManualBreakBelow(o)}>+ Pause darunter</button>
                </div>
                <button type="button" class="spBtn spBtnDanger" @click=${() => this.removeManualRow(o)}>Löschen</button>
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
                .value=${Ze(t.days ?? [])}
                @input=${(s) => this.setValue("days", Ye(s.target.value))}
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
              <ha-switch .checked=${N(t.highlight_today, !0)} @change=${(s) => this.onToggle(s, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${N(t.highlight_current, !0)} @change=${(s) => this.onToggle(s, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${N(t.highlight_breaks, !1)} @change=${(s) => this.onToggle(s, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${N(t.free_only_column_highlight, !0)}
                @change=${(s) => this.onToggle(s, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${N(t.highlight_current_text, !1)} @change=${(s) => this.onToggle(s, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${N(t.highlight_current_time_text, !1)} @change=${(s) => this.onToggle(s, "highlight_current_time_text")}></ha-switch>
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
                { value: "sensor", label: "Beliebiger Sensor (JSON)" }
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
                    @input=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)} @change=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)} @value-changed=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-textfield>
                ` : u``}

            ${(t.source_type ?? "manual") === "sensor" ? u`
                  <div class="hint">Beliebiger Sensor (JSON): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? u`
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(s) => {
        const n = ((typeof s == "string" ? s : s && typeof s == "object" && "entity_id" in s ? s.entity_id : "") ?? "").toString();
        return !n || /^sensor\./.test(n);
      }}
                      .label=${"Sensor (JSON)"}
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
                    label="Sensor Entity-ID (manuell)"
                    .value=${t.source_entity ?? ""}
                    @input=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)} @change=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)} @value-changed=${(s) => this.setSourceEntity(s?.detail?.value ?? s?.target?.value ?? s?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-textfield>

                  <div class="grid2">
                    <ha-textfield label="Attribut" .value=${t.source_attribute ?? ""} @input=${(s) => this.onText(s, "source_attribute")} @change=${(s) => this.onText(s, "source_attribute")} @value-changed=${(s) => this.onText(s, "source_attribute")} placeholder="plan"></ha-textfield>
                    <ha-textfield label="Time-Key" .value=${t.source_time_key ?? ""} @input=${(s) => this.onText(s, "source_time_key")} @change=${(s) => this.onText(s, "source_time_key")} @value-changed=${(s) => this.onText(s, "source_time_key")} placeholder="Stunde"></ha-textfield>
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
        week_a_is_even_kw: N(t.week_a_is_even_kw, !0)
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
          typeof o == "boolean" && o !== N(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", o);
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
Et.properties = {
  hass: {},
  _config: { state: !0 }
}, Et.styles = Xt`
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
let ce = Et;
M([
  O()
], ce.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", le);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", ce);
window.__STUNDENPLAN_CARD_VERSION = "v2026-02-16.2";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v2026-02-16.2 (marker: STUNDENPLAN_CARD_v2026-02-16.2)",
  preview: !0
});
export {
  le as StundenplanCard,
  ce as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
