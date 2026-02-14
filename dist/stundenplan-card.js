const Y = globalThis, _t = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = /* @__PURE__ */ Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Qt = (n) => new Ut(typeof n == "string" ? n : n + "", void 0, gt), Ht = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new Ut(e, n, gt);
}, Xt = (n, t) => {
  if (_t) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = Y.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, kt = _t ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Qt(e);
})(n) : n;
const { is: te, defineProperty: ee, getOwnPropertyDescriptor: ie, getOwnPropertyNames: se, getOwnPropertySymbols: re, getPrototypeOf: ne } = Object, et = globalThis, St = et.trustedTypes, oe = St ? St.emptyScript : "", ae = et.reactiveElementPolyfillSupport, z = (n, t) => n, Z = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? oe : null;
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
} }, ft = (n, t) => !te(n, t), At = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), et.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let M = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = At) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && ee(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = ie(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const c = s?.call(this);
      r?.call(this, o), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? At;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = ne(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, i = [...se(e), ...re(e)];
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
      for (const s of i) e.unshift(kt(s));
    } else t !== void 0 && e.push(kt(t));
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
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Xt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Z).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Z;
      this._$Em = s;
      const c = o.fromAttribute(e, r.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? ft)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: o } = r, c = this[s];
        o !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, r, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[z("elementProperties")] = /* @__PURE__ */ new Map(), M[z("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: M }), (et.reactiveElementVersions ??= []).push("2.1.2");
const mt = globalThis, Ct = (n) => n, G = mt.trustedTypes, Et = G ? G.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, zt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Bt = "?" + v, le = `<${Bt}>`, C = document, B = () => C.createComment(""), L = (n) => n === null || typeof n != "object" && typeof n != "function", yt = Array.isArray, ce = (n) => yt(n) || typeof n?.[Symbol.iterator] == "function", at = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, Mt = />/g, k = RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Dt = /'/g, Rt = /"/g, Lt = /^(?:script|style|textarea|title)$/i, he = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), d = he(1), R = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), A = C.createTreeWalker(C, 129);
function Ft(n, t) {
  if (!yt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Et !== void 0 ? Et.createHTML(t) : t;
}
const ue = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = H;
  for (let c = 0; c < e; c++) {
    const a = n[c];
    let l, p, h = -1, _ = 0;
    for (; _ < a.length && (o.lastIndex = _, p = o.exec(a), p !== null); ) _ = o.lastIndex, o === H ? p[1] === "!--" ? o = Tt : p[1] !== void 0 ? o = Mt : p[2] !== void 0 ? (Lt.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = k) : p[3] !== void 0 && (o = k) : o === k ? p[0] === ">" ? (o = s ?? H, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, l = p[1], o = p[3] === void 0 ? k : p[3] === '"' ? Rt : Dt) : o === Rt || o === Dt ? o = k : o === Tt || o === Mt ? o = H : (o = k, s = void 0);
    const u = o === k && n[c + 1].startsWith("/>") ? " " : "";
    r += o === H ? a + le : h >= 0 ? (i.push(l), a.slice(0, h) + zt + a.slice(h) + v + u) : a + v + (h === -2 ? c : u);
  }
  return [Ft(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class F {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const c = t.length - 1, a = this.parts, [l, p] = ue(t, e);
    if (this.el = F.createElement(l, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = A.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(zt)) {
          const _ = p[o++], u = s.getAttribute(h).split(v), f = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: r, name: f[2], strings: u, ctor: f[1] === "." ? pe : f[1] === "?" ? _e : f[1] === "@" ? ge : it }), s.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Lt.test(s.tagName)) {
          const h = s.textContent.split(v), _ = h.length - 1;
          if (_ > 0) {
            s.textContent = G ? G.emptyScript : "";
            for (let u = 0; u < _; u++) s.append(h[u], B()), A.nextNode(), a.push({ type: 2, index: ++r });
            s.append(h[_], B());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Bt) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += v.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function O(n, t, e = n, i) {
  if (t === R) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = L(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = O(n, s._$AS(n, t.values), s, i)), t;
}
class de {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? C).importNode(e, !0);
    A.currentNode = s;
    let r = A.nextNode(), o = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new I(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new fe(r, this, t)), this._$AV.push(l), a = i[++c];
      }
      o !== a?.index && (r = A.nextNode(), o++);
    }
    return A.currentNode = C, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), L(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && L(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = F.createElement(Ft(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const r = new de(s, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ot.get(t.strings);
    return e === void 0 && Ot.set(t.strings, e = new F(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new I(this.O(B()), this.O(B()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Ct(t).nextSibling;
      Ct(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class it {
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
    if (r === void 0) t = O(this, t, e, 0), o = !L(t) || t !== this._$AH && t !== R, o && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = O(this, c[i + a], e, a), l === R && (l = this._$AH[a]), o ||= !L(l) || l !== this._$AH[a], l === g ? t = g : t !== g && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pe extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class _e extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class ge extends it {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? g) === R) return;
    const i = this._$AH, s = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== g && (i === g || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class fe {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const me = mt.litHtmlPolyfillSupport;
me?.(F, I), (mt.litHtmlVersions ??= []).push("3.3.2");
const ye = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = s = new I(t.insertBefore(B(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const wt = globalThis;
class D extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ye(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return R;
  }
}
D._$litElement$ = !0, D.finalized = !0, wt.litElementHydrateSupport?.({ LitElement: D });
const we = wt.litElementPolyfillSupport;
we?.({ LitElement: D });
(wt.litElementVersions ??= []).push("4.2.2");
const $e = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: ft }, be = (n = $e, t, e) => {
  const { kind: i, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: o } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, n, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, n, c), c;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, n, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function It(n) {
  return (t, e) => typeof e == "object" ? be(n, t, e) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, t, e);
}
function $t(n) {
  return It({ ...n, state: !0, attribute: !1 });
}
var ve = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, jt = (n) => {
  throw TypeError(n);
}, st = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? xe(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && ve(t, e, s), s;
}, Vt = (n, t, e) => t.has(n) || jt("Cannot " + e), lt = (n, t, e) => (Vt(n, t, "read from private field"), e ? e.call(n) : t.get(n)), ct = (n, t, e) => t.has(n) ? jt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), ht = (n, t, e, i) => (Vt(n, t, "write to private field"), t.set(n, e), e), J, K, q;
function Q(n) {
  return !!n && n.break === !0;
}
function bt(n) {
  return Math.min(1, Math.max(0, n));
}
function Yt(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function ke(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = bt(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Se(n) {
  if (!n?.bg) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = Yt(t);
  if (!e) return t;
  const i = typeof n.bg_alpha == "number" ? bt(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function Ae(n, t) {
  const e = [], i = Se(n);
  return i && e.push(`background:${i}`), n?.color && e.push(`color:${n.color}`), e.push(`border:${n?.border ?? t}`), e.join(";") + ";";
}
function Wt(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = Yt(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${bt(t)})` : e;
  }
  return e;
}
function ut(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function pt(n) {
  return (n ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Ce(n) {
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
function Nt(n) {
  const t = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const i = t.getUTCFullYear(), s = new Date(Date.UTC(i, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), o = new Date(s);
  o.setUTCDate(s.getUTCDate() + (4 - r));
  const c = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(c / (10080 * 60 * 1e3)), isoYear: i };
}
function Pt(n) {
  const t = (n ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function dt(n) {
  const t = (n ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || /^(—|\-|–|---|\s)+$/.test(t));
}
function Jt(n) {
  const t = (n ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const e = t.slice(7), i = e.match(/^(.+)_woche$/i);
  if (i?.[1]) return `number.${i[1]}_woche_offset`;
  const s = e.match(/^stundenplan_woche_(.+)$/i);
  return s?.[1] ? `number.${s[1]}_woche_offset` : "";
}
function Ee(n) {
  const t = pt(n);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var x;
const rt = (x = class extends D {
  constructor() {
    super(...arguments), ct(this, J), ct(this, K), ct(this, q, []), this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return lt(this, J);
  }
  set hass(t) {
    ht(this, J, t);
  }
  get config() {
    return lt(this, K);
  }
  set config(t) {
    ht(this, K, t);
  }
  get _rowsCache() {
    return lt(this, q);
  }
  set _rowsCache(t) {
    ht(this, q, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), i = (s) => {
      const r = (s ?? "").toString().trim();
      r && e.add(r);
    };
    return i(t.week_offset_entity), i(t.source_entity), i(t.source_entity_a), i(t.source_entity_b), i(t.week_map_entity), i(t.splan24_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const i = e.last_updated ?? "", s = e.last_changed ?? "", r = e.state ?? "", o = e.attributes ?? {}, c = o.rows ?? o.rows_table ?? o.rows_json ?? o.rows_ha, a = Array.isArray(c) || typeof c == "string" ? c.length : 0;
    return `${t}|${i}|${s}|${r}|rowsLen=${a}`;
  }
  computeWatchSig(t) {
    const i = this.getWatchedEntities(t).map((o) => this.getEntitySig(o)), s = t.week_mode !== "off" ? this.getActiveWeek(t) : "off", r = this.getWeekOffsetValue(t);
    return `week=${s}|off=${r ?? "null"}::` + i.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const t = this.computeWatchSig(this.config);
    t !== this._lastWatchSig && (this._lastWatchSig = t, this.recomputeRows());
  }
  getWeekOffsetValue(t) {
    const e = (t.week_offset_entity ?? "").trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e], s = (t.week_offset_attribute ?? "").trim(), r = s ? i.attributes?.[s] : i.state, o = Number(r);
    return Number.isFinite(o) ? o : null;
  }
  async setWeekOffset(t, e) {
    const i = (t.week_offset_entity ?? "").trim();
    if (!i) return;
    const s = this.hass?.states?.[i], r = s?.attributes?.min, o = s?.attributes?.max, c = Number.isFinite(Number(r)) ? Number(r) : -52, a = Number.isFinite(Number(o)) ? Number(o) : 52;
    let l = e;
    l = Math.max(c, l), l = Math.min(a, l), await this.hass.callService("number", "set_value", { entity_id: i, value: l });
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this.requestUpdate();
    }, 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  updated(t) {
    if (super.updated(t), t.has("config")) {
      this.recomputeRows(), this._lastWatchSig = null;
      return;
    }
    if (t.has("hass")) {
      if (this.config) {
        const e = this.getWeekOffsetValue(this.config);
        e !== this._lastWeekOffset && (this._lastWeekOffset = e);
      }
      this.recomputeRowsIfWatchedChanged();
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
      source_time_key: "time",
      week_offset_entity: "",
      week_offset_attribute: "",
      splan24_entity: "",
      splan24_attribute: "rows_table",
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
  setConfig(t) {
    const e = x.getStubConfig(), i = ((t?.type ?? e.type) + "").toString();
    if (!(i === "custom:stundenplan-card" || i === "stundenplan-card")) {
      this.config = this.normalizeConfig(e), this.recomputeRows();
      return;
    }
    this.config = this.normalizeConfig({ ...e, ...t, type: i }), this.recomputeRows(), this._lastWatchSig = null;
  }
  getCardSize() {
    const t = this.config?.rows?.length ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = x.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((h) => (h ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((h) => {
      if (Q(h))
        return { break: !0, time: (h.time ?? "").toString(), label: (h.label ?? "Pause").toString() };
      const _ = Array.isArray(h?.cells) ? h.cells : [], u = Array.from({ length: i.length }, (w, b) => (_[b] ?? "").toString()), f = Array.isArray(h?.cell_styles) ? h.cell_styles : [], j = Array.from({ length: i.length }, (w, b) => ke(f[b])), W = (h?.time ?? "").toString(), y = ut(W), m = (h?.start ?? "").toString().trim(), E = (h?.end ?? "").toString().trim(), $ = {
        time: W,
        start: m || y.start || void 0,
        end: E || y.end || void 0,
        cells: u
      };
      return j.some((w) => !!w) && ($.cell_styles = j), $;
    }), o = ((t.week_mode ?? e.week_mode) + "").toString().trim(), c = o === "kw_parity" || o === "week_map" || o === "off" ? o : "off", a = (t.source_entity ?? e.source_entity).toString().trim(), p = (t.week_offset_entity ?? "").toString().trim() || Jt(a);
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
      source_entity: a,
      source_attribute: (t.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (t.source_time_key ?? e.source_time_key).toString(),
      week_offset_entity: p,
      week_offset_attribute: (t.week_offset_attribute ?? "").toString(),
      splan24_entity: (t.splan24_entity ?? "").toString(),
      splan24_attribute: (t.splan24_attribute ?? "rows_table").toString(),
      week_mode: c,
      week_a_is_even_kw: t.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (t.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (t.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (t.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (t.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (t.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (t.source_attribute_b ?? e.source_attribute_b).toString(),
      filter_main_only: t.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(t.filter_allow_prefixes) ? t.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(t.filter_exclude) ? t.filter_exclude.map(String) : [],
      rows: r
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(Ce(e).map(pt));
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
    const i = (t ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const s = this.hass.states[i], r = (e ?? "").toString().trim(), o = r ? s.attributes?.[r] : s.state;
    return this.parseAnyJson(o);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], s = (t.source_time_key ?? "time").toString(), r = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o.time ?? o[s] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const c = (o?.time ?? o?.[s] ?? "").toString(), a = ut(c), l = Array.from({ length: i.length }, (h, _) => {
        const u = (i[_] ?? "").toString();
        return (o?.[u] ?? "").toString();
      });
      return { time: c, start: a.start, end: a.end, cells: l };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, i) {
    let s = this.readEntityJson(e, i);
    return s == null && (s = this.readEntityJson(e, "rows_table")), s == null && (s = this.readEntityJson(e, "rows")), s == null && (s = this.readEntityJson(e, "rows_json")), s == null && (s = this.readEntityJson(e, "rows_ha")), Array.isArray(s) ? this.buildRowsFromArray(t, s) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = Nt(/* @__PURE__ */ new Date()), i = e % 2 === 0, s = !!t.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(e, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: o } = Nt(/* @__PURE__ */ new Date()), c = String(r), a = String(o);
    if (s?.[a] && typeof s[a] == "object") {
      const p = Pt(s[a][c]);
      if (p) return p;
    }
    const l = Pt(s?.[c]);
    return l || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  filterCellText(t, e) {
    return (t ?? "").toString().trim();
  }
  getBaseDate(t) {
    const e = this.getWeekOffsetValue(t) ?? 0, i = /* @__PURE__ */ new Date();
    return i.setHours(12, 0, 0, 0), i.setDate(i.getDate() + e * 7), i;
  }
  mondayOfWeek(t) {
    const e = new Date(t), i = e.getDay() === 0 ? 7 : e.getDay();
    return e.setDate(e.getDate() - (i - 1)), e.setHours(12, 0, 0, 0), e;
  }
  fmtDDMMYYYY(t) {
    const e = String(t.getDate()).padStart(2, "0"), i = String(t.getMonth() + 1).padStart(2, "0"), s = String(t.getFullYear());
    return `${e}.${i}.${s}`;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(t) {
    const e = (t.source_entity ?? "").toString().trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const s = this.hass.states[e].attributes ?? {}, r = s?.meta_ha?.days ?? s?.meta?.days ?? s?.days ?? (typeof s?.meta_json == "string" ? this.parseAnyJson(s.meta_json)?.days : null) ?? null;
    if (!Array.isArray(r) || r.length < 3) return null;
    const o = [];
    for (const c of r) {
      const l = (c ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!l) continue;
      const p = Number(l[1]), h = Number(l[2]), _ = Number(l[3]), u = new Date(p, h - 1, _, 12, 0, 0, 0);
      Number.isNaN(u.getTime()) || o.push(u);
    }
    return o.length ? o : null;
  }
  getRowsResolved(t) {
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), s = (t.source_entity_a ?? "").trim(), r = (t.source_entity_b ?? "").trim(), o = (t.source_attribute_a ?? "").trim(), c = (t.source_attribute_b ?? "").trim();
      if (i === "A" && s) {
        const l = this.getRowsFromEntity(t, s, o);
        if (l) return l;
      }
      if (i === "B" && r) {
        const l = this.getRowsFromEntity(t, r, c);
        if (l) return l;
      }
      const a = (t.source_entity ?? "").trim();
      if (a) {
        const l = this.getRowsFromEntity(t, a, (t.source_attribute ?? "").trim());
        if (l) return l;
      }
      return t.rows ?? [];
    }
    const e = (t.source_entity ?? "").toString().trim();
    return e ? this.getRowsFromEntity(t, e, (t.source_attribute ?? "").toString().trim()) ?? t.rows ?? [] : t.rows ?? [];
  }
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [];
      return;
    }
    this._rowsCache = this.getRowsResolved(this.config);
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes  ✅ order like screenshot
  parseCellTriplet(t) {
    const e = (t ?? "").toString().replace(/\r/g, "").trim();
    if (!e) return null;
    const i = e.split(`
`).map((u) => u.trim()).filter((u) => u.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const r = i[0];
    if (/^(—|\-|–|---)$/.test(r)) return null;
    const o = (u) => /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(u) || /\bfällt\s+aus\b/i.test(u) || /\bverlegt\b/i.test(u) || /\bentfällt\b/i.test(u) || /\bvertretung\b/i.test(u), c = (u) => /^\d{1,4}$/.test(u) || /^[A-ZÄÖÜ]{1,4}\d{1,3}$/i.test(u), a = i.slice(1);
    let l = -1;
    for (let u = 0; u < a.length; u++)
      if (!o(a[u]) && c(a[u])) {
        l = u;
        break;
      }
    if (l < 0) {
      for (let u = a.length - 1; u >= 0; u--)
        if (c(a[u])) {
          l = u;
          break;
        }
    }
    if (l < 0) return null;
    const p = a[l];
    let h;
    for (let u = l + 1; u < a.length; u++) {
      const f = a[u];
      if (!o(f) && !c(f)) {
        h = f;
        break;
      }
    }
    if (!h) {
      const u = a.filter((f) => !o(f) && !c(f));
      h = u.length ? u[u.length - 1] : void 0;
    }
    const _ = i.slice(1).filter((u) => o(u));
    return { fach: r, raum: p, lehrer: h, notes: _.length ? _ : void 0 };
  }
  renderCell(t, e) {
    const i = (t ?? "").toString(), s = this.filterCellText(i, e);
    if (dt(s)) return d``;
    const r = this.parseCellTriplet(s);
    if (r?.fach && r?.raum && r?.lehrer)
      return d`
        <div class="cellWrap">
          <div class="fach">${r.fach}</div>
          <div class="lehrer">${r.lehrer}</div>
          <div class="raum">${r.raum}</div>

          ${r.notes?.length ? d`
                <div class="notes">
                  ${r.notes.map((l) => {
        const p = l.startsWith("🔴") ? "note noteRed" : l.startsWith("🟠") ? "note noteOrange" : l.startsWith("🟡") ? "note noteYellow" : "note", h = l.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
        return d`<div class=${p}><span class="dot">${l.slice(0, 2).trim()}</span><span class="txt">${h}</span></div>`;
      })}
                </div>
              ` : d``}
        </div>
      `;
    const o = s.replace(/\r/g, "").split(`
`).map((l) => l.trim()).filter(Boolean), c = (o[0] ?? "").trim(), a = o.slice(1);
    return c && a.length ? d`
        <div class="cellWrap">
          <div class="fach">${c}</div>
          <div class="notes">
            ${a.map((l) => {
      const p = l.startsWith("🔴") ? "note noteRed" : l.startsWith("🟠") ? "note noteOrange" : l.startsWith("🟡") ? "note noteYellow" : "note", h = l.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim(), _ = /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(l) ? l.slice(0, 2).trim() : "•";
      return d`<div class=${p}><span class="dot">${_}</span><span class="txt">${h || l}</span></div>`;
    })}
          </div>
        </div>
      ` : d`<span class="cellText">${s}</span>`;
  }
  render() {
    if (!this.config) return d``;
    const t = this.config, e = this._rowsCache, i = this.getTodayIndex(t.days ?? []), s = "1px solid var(--divider-color)", r = Wt(t.highlight_today_color ?? "", 0.12), o = Wt(t.highlight_current_color ?? "", 0.18), c = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), l = t.week_mode !== "off", p = l ? this.getActiveWeek(t) : null, h = this.getWeekOffsetValue(t), _ = (t.week_offset_entity ?? "").trim().length > 0, u = this.getHeaderDaysFromEntity(t), f = u && u.length >= (t.days?.length ?? 0) ? u : null, j = this.getBaseDate(t), W = this.mondayOfWeek(j);
    return d`
      <ha-card>
        <div class="headerRow">
          <div class="title">${t.title ?? ""}</div>

          <div class="headRight">
            ${l ? d`<div class="weekBadgeInline">Woche <b>${p}</b></div>` : d``}

            ${_ ? d`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => h != null && this.setWeekOffset(t, h - 1)}>&lt;</button>
                    <div class="offsetVal">${h ?? "?"}</div>
                    <button class="btnMini" @click=${() => h != null && this.setWeekOffset(t, h + 1)}>&gt;</button>
                  </div>
                ` : d``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((y, m) => {
      const E = t.highlight_today && m === i ? "today" : "";
      let $ = "";
      if (f)
        $ = this.fmtDDMMYYYY(f[m]);
      else {
        const w = Ee(y);
        if (w) {
          const b = new Date(W);
          b.setDate(W.getDate() + (w - 1)), $ = this.fmtDDMMYYYY(b);
        }
      }
      return d`
                    <th class=${E} style=${`--sp-hl:${r};`}>
                      <div>${y}</div>
                      <div class="thDate">${$}</div>
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((y) => {
      if (Q(y)) {
        const N = ut(y.time), T = !!N.start && !!N.end && this.isNowBetween(N.start, N.end), P = !!t.highlight_breaks && T;
        let U = `--sp-hl:${o};`, V = "";
        return P && (U += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", V += `--sp-hl:${o}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), P && t.highlight_current_time_text && a && (U += `color:${a};`), d`
                    <tr class="break">
                      <td class="time" style=${U}>${y.time}</td>
                      <td colspan=${t.days.length} style=${V}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = y, E = m.cells ?? [], $ = m.cell_styles ?? [], w = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), b = i >= 0 ? E[i] ?? "" : "", qt = i >= 0 ? this.filterCellText(b, t) : "", Zt = i >= 0 ? dt(qt) : !1, nt = !(!!t.free_only_column_highlight && Zt);
      let ot = `--sp-hl:${o};`;
      return nt && t.highlight_current && w && (ot += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), nt && w && t.highlight_current_time_text && a && (ot += `color:${a};`), d`
                  <tr>
                    <td class="time" style=${ot}>${m.time}</td>

                    ${t.days.map((N, T) => {
        const P = this.filterCellText(E[T] ?? "", t), U = $[T] ?? null, V = t.highlight_today && T === i ? "today" : "";
        let vt = `--sp-hl:${r};` + Ae(U, s);
        const Gt = !dt(P);
        return nt && Gt && w && t.highlight_current_text && c && i >= 0 && T === i && (vt += `color:${c};`), d`<td class=${V} style=${vt}>${this.renderCell(P, t)}</td>`;
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
}, x.styles = Ht`
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
      align-items: center;
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
      align-items: center;
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
      align-items: center;
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
      width: 110px;
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

    /* Notes like Stundenplan24: smaller, left aligned, indented */
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
  `, x);
J = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
st([
  It({ attribute: !1 })
], rt.prototype, "hass", 1);
st([
  $t()
], rt.prototype, "config", 1);
st([
  $t()
], rt.prototype, "_rowsCache", 1);
let Kt = rt;
function Te(n, t, e) {
  n.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function S(n, t = !1) {
  if (typeof n == "boolean") return n;
  if (n == null) return t;
  const e = String(n).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(e) ? !0 : ["0", "false", "no", "off"].includes(e) ? !1 : t;
}
function Me(n) {
  return (n ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function De(n) {
  return (n ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const tt = class tt extends D {
  constructor() {
    super(...arguments), this._open = {
      general: !0,
      highlights: !1,
      colors: !1,
      splan24: !0,
      sources: !0,
      manual: !1
    };
  }
  setConfig(t) {
    const e = ((t?.type ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  normalizeConfig(t) {
    return new Kt().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Te(this, "config-changed", { config: t });
  }
  setValue(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  toggleOpen(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  findBestRowsAttribute(t) {
    const i = this.hass?.states?.[t]?.attributes ?? {};
    return i.rows_table != null ? { attr: "rows_table", timeKey: "time" } : i.rows != null ? { attr: "rows", timeKey: "time" } : i.rows_json != null ? { attr: "rows_json", timeKey: "time" } : i.rows_ha != null ? { attr: "rows_ha", timeKey: "time" } : { attr: "rows_table", timeKey: "time" };
  }
  setSplan24Entity(t) {
    if (!this._config) return;
    const e = (t ?? "").toString().trim(), i = "rows_ha";
    this.emit({
      ...this._config,
      splan24_entity: e,
      splan24_attribute: i,
      source_entity: e,
      source_attribute: i,
      source_time_key: "time"
    });
  }
  renderSection(t, e, i) {
    const s = !!this._open[e];
    return d`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(e)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${s ? "▾" : "▸"}</div>
        </div>
        ${s ? d`<div class="sectionBody">${i}</div>` : d``}
      </div>
    `;
  }
  onToggle(t, e) {
    const i = !!t?.target?.checked;
    this.setValue(e, i);
  }
  onText(t, e) {
    const i = (t?.target?.value ?? "").toString();
    this.setValue(e, i);
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], e = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], i = { time: `${e.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    e.push(i), this.emit({ ...this._config, rows: e });
  }
  removeManualRow(t) {
    if (!this._config) return;
    const e = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    e.splice(t, 1), this.emit({ ...this._config, rows: e });
  }
  updateManualRow(t, e) {
    if (!this._config) return;
    const i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], s = i[t];
    i[t] = { ...s, ...e }, this.emit({ ...this._config, rows: i });
  }
  updateManualCell(t, e, i) {
    if (!this._config) return;
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = s[t];
    if (!r || Q(r)) return;
    const o = r, c = Array.isArray(o.cells) ? o.cells.slice() : [];
    c[e] = i, s[t] = { ...o, cells: c }, this.emit({ ...this._config, rows: s });
  }
  renderManualRows() {
    if (!this._config) return d``;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], e = Array.isArray(this._config.rows) ? this._config.rows : [];
    return d`
      <div class="rowActions">
        <mwc-button outlined @click=${this.addManualRow}>+ Zeile</mwc-button>
      </div>

      ${e.map((i, s) => {
      if (Q(i))
        return d`
            <div class="rowCard">
              <div class="rowHead">
                <div class="rowTitle">Pause</div>
                <mwc-button dense @click=${() => this.removeManualRow(s)}>Entfernen</mwc-button>
              </div>
              <div class="grid2">
                <ha-textfield label="Zeit" .value=${i.time ?? ""} @input=${(o) => this.updateManualRow(s, { time: o.target.value })}></ha-textfield>
                <ha-textfield
                  label="Label"
                  .value=${i.label ?? "Pause"}
                  @input=${(o) => this.updateManualRow(s, { label: o.target.value })}
                ></ha-textfield>
              </div>
            </div>
          `;
      const r = i;
      return d`
          <div class="rowCard">
            <div class="rowHead">
              <div class="rowTitle">Zeile ${s + 1}</div>
              <div class="rowHeadBtns">
                <mwc-button dense @click=${() => this.updateManualRow(s, { ...r, break: !0, label: "Pause" })}
                  >Als Pause</mwc-button
                >
                <mwc-button dense @click=${() => this.removeManualRow(s)}>Entfernen</mwc-button>
              </div>
            </div>

            <div class="grid3">
              <ha-textfield label="Stunde" .value=${r.time ?? ""} @input=${(o) => this.updateManualRow(s, { time: o.target.value })}></ha-textfield>
              <ha-textfield label="Start" .value=${r.start ?? ""} @input=${(o) => this.updateManualRow(s, { start: o.target.value })}></ha-textfield>
              <ha-textfield label="Ende" .value=${r.end ?? ""} @input=${(o) => this.updateManualRow(s, { end: o.target.value })}></ha-textfield>
            </div>

            <div class="cellsGrid" style=${`grid-template-columns: repeat(${t.length}, minmax(0, 1fr));`}>
              ${t.map(
        (o, c) => d`
                  <div class="cellEditor">
                    <div class="cellEditorHead">${o}</div>
                    <ha-textarea
                      .value=${(r.cells?.[c] ?? "").toString()}
                      @input=${(a) => this.updateManualCell(s, c, a.target.value)}
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
  render() {
    if (!this._config) return d``;
    const t = this._config, e = (t.splan24_entity ?? "").toString().trim(), i = e ? Jt(e) : "", s = i || (t.week_offset_entity ?? "").toString().trim();
    return d`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      d`
            <div class="grid2">
              <ha-textfield label="Titel" .value=${t.title ?? ""} @input=${(r) => this.onText(r, "title")}></ha-textfield>

              <ha-textfield
                label="Tage (CSV)"
                .value=${De(t.days ?? [])}
                @input=${(r) => this.setValue("days", Me(r.target.value))}
                helper="z.B. Mo, Di, Mi, Do, Fr"
              ></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Highlights",
      "highlights",
      d`
            <div class="grid3">
              <ha-switch .checked=${S(t.highlight_today, !0)} @change=${(r) => this.onToggle(r, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${S(t.highlight_current, !0)} @change=${(r) => this.onToggle(r, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${S(t.highlight_breaks, !1)} @change=${(r) => this.onToggle(r, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${S(t.free_only_column_highlight, !0)}
                @change=${(r) => this.onToggle(r, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${S(t.highlight_current_text, !1)} @change=${(r) => this.onToggle(r, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(r) => this.onText(r, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${S(t.highlight_current_time_text, !1)} @change=${(r) => this.onToggle(r, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-textfield label="Zeitfarbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(r) => this.onText(r, "highlight_current_time_text_color")}></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      d`
            <div class="grid2">
              <ha-textfield label="Heute Overlay" .value=${t.highlight_today_color ?? ""} @input=${(r) => this.onText(r, "highlight_today_color")}></ha-textfield>
              <ha-textfield label="Aktuell Overlay" .value=${t.highlight_current_color ?? ""} @input=${(r) => this.onText(r, "highlight_current_color")}></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Stundenplan24",
      "splan24",
      d`
            <div class="hint">
              Wähle hier deinen <b>sensor.&lt;klasse&gt;_woche</b>. Dadurch werden Datenquelle + Attribut automatisch gesetzt und der Offset-Helper im Hintergrund erkannt
              (<code>${s || "—"}</code>).
            </div>

            <div class="grid2">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${t.splan24_entity ?? ""}
                .includeDomains=${["sensor"]}
                .label=${"Stundenplan24 Woche Sensor (Entity-rows)"}
                @value-changed=${(r) => this.setSplan24Entity(r.detail.value)}
              ></ha-entity-picker>

              <ha-select
                .label=${"Attribut"}
                .value=${t.splan24_attribute ?? "rows_table"}
                @selected=${(r) => this.setValue("splan24_attribute", r.target.value)}
              >
                <mwc-list-item value="rows_table">rows_table</mwc-list-item>
                <mwc-list-item value="rows">rows</mwc-list-item>
                <mwc-list-item value="rows_ha">rows_ha</mwc-list-item>
                <mwc-list-item value="rows_json">rows_json</mwc-list-item>
              </ha-select>
            </div>
          `
    )}

        ${this.renderSection(
      "Datenquellen",
      "sources",
      d`
            <div class="grid2">
              <ha-textfield label="source_entity (Legacy / intern)" .value=${t.source_entity ?? ""} @input=${(r) => this.onText(r, "source_entity")}></ha-textfield>
              <ha-textfield label="source_attribute (Legacy / intern)" .value=${t.source_attribute ?? ""} @input=${(r) => this.onText(r, "source_attribute")}></ha-textfield>
            </div>

            <div class="hint">
              Hinweis: <code>week_offset_entity</code> wird automatisch aus <code>sensor.&lt;klasse&gt;_woche</code> abgeleitet und nicht mehr im UI angezeigt.
            </div>

            <div class="grid2">
              <ha-select .label=${"Wechselwochen (A/B)"} .value=${t.week_mode ?? "off"} @selected=${(r) => this.setValue("week_mode", r.target.value)}>
                <mwc-list-item value="off">off (deaktiviert)</mwc-list-item>
                <mwc-list-item value="kw_parity">kw_parity (KW gerade/ungerade)</mwc-list-item>
                <mwc-list-item value="week_map">week_map (Mapping Entity)</mwc-list-item>
              </ha-select>

              <ha-switch .checked=${S(t.week_a_is_even_kw, !0)} @change=${(r) => this.onToggle(r, "week_a_is_even_kw")}></ha-switch>
              <div class="switchLabel">Woche A = gerade KW</div>
              <div></div>
            </div>

            ${t.week_mode === "week_map" ? d`
                  <div class="grid2">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.week_map_entity ?? ""}
                      .includeDomains=${["sensor", "input_text"]}
                      .label=${"week_map_entity"}
                      @value-changed=${(r) => this.setValue("week_map_entity", r.detail.value)}
                    ></ha-entity-picker>

                    <ha-textfield label="week_map_attribute" .value=${t.week_map_attribute ?? ""} @input=${(r) => this.onText(r, "week_map_attribute")}></ha-textfield>
                  </div>
                ` : d``}

            ${t.week_mode !== "off" ? d`
                  <div class="grid2">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_a ?? ""}
                      .includeDomains=${["sensor"]}
                      .label=${"source_entity_a"}
                      @value-changed=${(r) => this.setValue("source_entity_a", r.detail.value)}
                    ></ha-entity-picker>
                    <ha-textfield label="source_attribute_a" .value=${t.source_attribute_a ?? ""} @input=${(r) => this.onText(r, "source_attribute_a")}></ha-textfield>

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_b ?? ""}
                      .includeDomains=${["sensor"]}
                      .label=${"source_entity_b"}
                      @value-changed=${(r) => this.setValue("source_entity_b", r.detail.value)}
                    ></ha-entity-picker>
                    <ha-textfield label="source_attribute_b" .value=${t.source_attribute_b ?? ""} @input=${(r) => this.onText(r, "source_attribute_b")}></ha-textfield>
                  </div>
                ` : d``}
          `
    )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }
};
tt.properties = {
  hass: {},
  _config: { state: !0 }
}, tt.styles = Ht`
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
      align-items: center;
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
      align-items: center;
    }
    .grid3 {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      gap: 10px;
      align-items: center;
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
      align-items: center;
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
let X = tt;
st([
  $t()
], X.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Kt);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", X);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit Wochenblättern (Offset Helper auto) + Stundenplan24 Notes-Layout",
  preview: !0
});
export {
  Kt as StundenplanCard,
  X as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
