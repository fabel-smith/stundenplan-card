const Q = globalThis, $t = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = /* @__PURE__ */ Symbol(), Dt = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if ($t && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ie = (r) => new zt(typeof r == "string" ? r : r + "", void 0, vt), It = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new zt(e, r, vt);
}, re = (r, t) => {
  if ($t) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = Q.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, Mt = $t ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ie(e);
})(r) : r;
const { is: ne, defineProperty: oe, getOwnPropertyDescriptor: ae, getOwnPropertyNames: le, getOwnPropertySymbols: he, getPrototypeOf: ce } = Object, dt = globalThis, Tt = dt.trustedTypes, ue = Tt ? Tt.emptyScript : "", de = dt.reactiveElementPolyfillSupport, V = (r, t) => r, at = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ue : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, bt = (r, t) => !ne(r, t), Rt = { attribute: !0, type: String, converter: at, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Rt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && oe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = ae(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties"))) return;
    const t = ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const e = this.properties, s = [...le(e), ...he(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(Mt(i));
    } else t !== void 0 && e.push(Mt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return re(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : at).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : at;
      this._$Em = i;
      const l = o.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? bt)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[V("elementProperties")] = /* @__PURE__ */ new Map(), U[V("finalized")] = /* @__PURE__ */ new Map(), de?.({ ReactiveElement: U }), (dt.reactiveElementVersions ??= []).push("2.1.2");
const xt = globalThis, Ot = (r) => r, lt = xt.trustedTypes, jt = lt ? lt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Jt = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Vt = "?" + E, _e = `<${Vt}>`, O = document, Y = () => O.createComment(""), K = (r) => r === null || typeof r != "object" && typeof r != "function", St = Array.isArray, pe = (r) => St(r) || typeof r?.[Symbol.iterator] == "function", ft = `[ 	
\f\r]`, J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, Nt = />/g, M = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ut = /'/g, Pt = /"/g, Yt = /^(?:script|style|textarea|title)$/i, ge = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), d = ge(1), H = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), R = O.createTreeWalker(O, 129);
function Kt(r, t) {
  if (!St(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const fe = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = J;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, _, c = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, _ = o.exec(a), _ !== null); ) p = o.lastIndex, o === J ? _[1] === "!--" ? o = Wt : _[1] !== void 0 ? o = Nt : _[2] !== void 0 ? (Yt.test(_[2]) && (i = RegExp("</" + _[2], "g")), o = M) : _[3] !== void 0 && (o = M) : o === M ? _[0] === ">" ? (o = i ?? J, c = -1) : _[1] === void 0 ? c = -2 : (c = o.lastIndex - _[2].length, h = _[1], o = _[3] === void 0 ? M : _[3] === '"' ? Pt : Ut) : o === Pt || o === Ut ? o = M : o === Wt || o === Nt ? o = J : (o = M, i = void 0);
    const u = o === M && r[l + 1].startsWith("/>") ? " " : "";
    n += o === J ? a + _e : c >= 0 ? (s.push(h), a.slice(0, c) + Jt + a.slice(c) + E + u) : a + E + (c === -2 ? l : u);
  }
  return [Kt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, _] = fe(t, e);
    if (this.el = Z.createElement(h, s), R.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = R.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Jt)) {
          const p = _[o++], u = i.getAttribute(c).split(E), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: g[2], strings: u, ctor: g[1] === "." ? ye : g[1] === "?" ? we : g[1] === "@" ? $e : _t }), i.removeAttribute(c);
        } else c.startsWith(E) && (a.push({ type: 6, index: n }), i.removeAttribute(c));
        if (Yt.test(i.tagName)) {
          const c = i.textContent.split(E), p = c.length - 1;
          if (p > 0) {
            i.textContent = lt ? lt.emptyScript : "";
            for (let u = 0; u < p; u++) i.append(c[u], Y()), R.nextNode(), a.push({ type: 2, index: ++n });
            i.append(c[p], Y());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Vt) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(E, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += E.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = O.createElement("template");
    return s.innerHTML = t, s;
  }
}
function L(r, t, e = r, s) {
  if (t === H) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = K(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = L(r, i._$AS(r, t.values), i, s)), t;
}
class me {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? O).importNode(e, !0);
    R.currentNode = i;
    let n = R.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new q(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new ve(n, this, t)), this._$AV.push(h), a = s[++l];
      }
      o !== a?.index && (n = R.nextNode(), o++);
    }
    return R.currentNode = O, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = L(this, t, e), K(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && K(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Z.createElement(Kt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new me(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new Z(t)), e;
  }
  k(t) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new q(this.O(Y()), this.O(Y()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ot(t).nextSibling;
      Ot(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class _t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = L(this, t, e, 0), o = !K(t) || t !== this._$AH && t !== H, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = L(this, l[s + a], e, a), h === H && (h = this._$AH[a]), o ||= !K(h) || h !== this._$AH[a], h === f ? t = f : t !== f && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ye extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class we extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class $e extends _t {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = L(this, t, e, 0) ?? f) === H) return;
    const s = this._$AH, i = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ve {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    L(this, t);
  }
}
const be = xt.litHtmlPolyfillSupport;
be?.(Z, q), (xt.litHtmlVersions ??= []).push("3.3.2");
const xe = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new q(t.insertBefore(Y(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const kt = globalThis;
class P extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return H;
  }
}
P._$litElement$ = !0, P.finalized = !0, kt.litElementHydrateSupport?.({ LitElement: P });
const Se = kt.litElementPolyfillSupport;
Se?.({ LitElement: P });
(kt.litElementVersions ??= []).push("4.2.2");
const ke = { attribute: !0, type: String, converter: at, reflect: !1, hasChanged: bt }, Ae = (r = ke, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Zt(r) {
  return (t, e) => typeof e == "object" ? Ae(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
function D(r) {
  return Zt({ ...r, state: !0, attribute: !1 });
}
var Ee = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, qt = (r) => {
  throw TypeError(r);
}, $ = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ce(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Ee(t, e, i), i;
}, Gt = (r, t, e) => t.has(r) || qt("Cannot " + e), S = (r, t, e) => (Gt(r, t, "read from private field"), e ? e.call(r) : t.get(r)), k = (r, t, e) => t.has(r) ? qt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), A = (r, t, e, s) => (Gt(r, t, "write to private field"), t.set(r, e), e), X, tt, et, st, it, rt, nt, ot;
function ht(r) {
  return !!r && r.break === !0;
}
function At(r) {
  return Math.min(1, Math.max(0, r));
}
function Qt(r) {
  if (!r) return null;
  const t = r.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((n) => Number.isNaN(n)) ? null : { r: e, g: s, b: i };
}
function De(r) {
  if (!r || typeof r != "object") return null;
  const t = {};
  return typeof r.bg == "string" && r.bg.trim() && (t.bg = r.bg.trim()), typeof r.color == "string" && r.color.trim() && (t.color = r.color.trim()), typeof r.border == "string" && r.border.trim() && (t.border = r.border.trim()), typeof r.bg_alpha == "number" && !Number.isNaN(r.bg_alpha) && (t.bg_alpha = At(r.bg_alpha)), Object.keys(t).length ? t : null;
}
function Me(r) {
  if (!r?.bg) return null;
  const t = r.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = Qt(t);
  if (!e) return t;
  const s = typeof r.bg_alpha == "number" ? At(r.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function Te(r, t) {
  const e = [], s = Me(r);
  return s && e.push(`background:${s}`), r?.color && e.push(`color:${r.color}`), e.push(`border:${r?.border ?? t}`), e.join(";") + ";";
}
function Lt(r, t) {
  const e = (r ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const s = Qt(e);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${At(t)})` : e;
  }
  return e;
}
function mt(r) {
  const e = (r ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function wt(r) {
  return (r ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Re(r) {
  switch (r) {
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
function Bt(r) {
  const t = new Date(Date.UTC(r.getFullYear(), r.getMonth(), r.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const s = t.getUTCFullYear(), i = new Date(Date.UTC(s, 0, 1)), n = i.getUTCDay() === 0 ? 7 : i.getUTCDay(), o = new Date(i);
  o.setUTCDate(i.getUTCDate() + (4 - n));
  const l = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(l / (10080 * 60 * 1e3)), isoYear: s };
}
function Ft(r) {
  const t = (r ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function yt(r) {
  const t = (r ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || /^(—|\-|–|---|\s)+$/.test(t));
}
function Oe(r) {
  const t = (r ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const e = t.slice(7), s = e.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const i = e.match(/^stundenplan_woche_(.+)$/i);
  return i?.[1] ? `number.${i[1]}_woche_offset` : "";
}
function je(r) {
  const t = wt(r);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var C;
const v = (C = class extends P {
  constructor() {
    super(...arguments), k(this, X), k(this, tt), k(this, et, []), k(this, st, !1), k(this, it, ""), k(this, rt, null), k(this, nt, "idle"), k(this, ot, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return S(this, X);
  }
  set hass(t) {
    A(this, X, t);
  }
  get config() {
    return S(this, tt);
  }
  set config(t) {
    A(this, tt, t);
  }
  get _rowsCache() {
    return S(this, et);
  }
  set _rowsCache(t) {
    A(this, et, t);
  }
  get _noData() {
    return S(this, st);
  }
  set _noData(t) {
    A(this, st, t);
  }
  get _noDataMsg() {
    return S(this, it);
  }
  set _noDataMsg(t) {
    A(this, it, t);
  }
  get _jsonRows() {
    return S(this, rt);
  }
  set _jsonRows(t) {
    A(this, rt, t);
  }
  get _jsonStatus() {
    return S(this, nt);
  }
  set _jsonStatus(t) {
    A(this, nt, t);
  }
  get _jsonError() {
    return S(this, ot);
  }
  set _jsonError(t) {
    A(this, ot, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), s = (i) => {
      const n = (i ?? "").toString().trim();
      n && e.add(n);
    };
    return s(t.week_offset_entity), s(t.source_entity), s(t.source_entity_a), s(t.source_entity_b), s(t.week_map_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const s = e.last_updated ?? "", i = e.last_changed ?? "", n = e.state ?? "", o = e.attributes ?? {}, l = o.rows ?? o.rows_table ?? o.rows_json ?? o.rows_ha, a = Array.isArray(l) || typeof l == "string" ? l.length : 0;
    return `${t}|${s}|${i}|${n}|rowsLen=${a}`;
  }
  computeWatchSig(t) {
    const s = this.getWatchedEntities(t).map((o) => this.getEntitySig(o)), i = t.week_mode !== "off" ? this.getActiveWeek(t) : "off", n = this.getWeekOffsetValue(t);
    return `week=${i}|off=${n ?? "null"}::` + s.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const t = this.computeWatchSig(this.config);
    t !== this._lastWatchSig && (this._lastWatchSig = t, this.recomputeRows());
  }
  getWeekOffsetValue(t) {
    const e = (t.week_offset_entity ?? "").trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const s = this.hass.states[e], i = (t.week_offset_attribute ?? "").trim(), n = i ? s.attributes?.[i] : s.state, o = Number(n);
    return Number.isFinite(o) ? o : null;
  }
  async setWeekOffset(t, e) {
    const s = (t.week_offset_entity ?? "").trim();
    if (!s) return;
    const i = this.hass?.states?.[s], n = i?.attributes?.min, o = i?.attributes?.max, l = Number.isFinite(Number(n)) ? Number(n) : -52, a = Number.isFinite(Number(o)) ? Number(o) : 52;
    let h = e;
    h = Math.max(l, h), h = Math.min(a, h), await this.hass.callService("number", "set_value", { entity_id: s, value: h });
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
  setConfig(t) {
    const e = C.getStubConfig(), s = ((t?.type ?? e.type) + "").toString();
    if (!(s === "custom:stundenplan-card" || s === "stundenplan-card")) {
      this.config = this.normalizeConfig(e), this.recomputeRows();
      return;
    }
    this.config = this.normalizeConfig({ ...e, ...t, type: s }), this.recomputeRows(), this._lastWatchSig = null;
  }
  getCardSize() {
    const t = this.config?.rows?.length ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = C.getStubConfig(), s = Array.isArray(t.days) && t.days.length ? t.days.map((c) => (c ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(t.rows) ? t.rows : []).map((c) => {
      if (ht(c))
        return { break: !0, time: (c.time ?? "").toString(), label: (c.label ?? "Pause").toString() };
      const p = Array.isArray(c?.cells) ? c.cells : [], u = Array.from({ length: s.length }, (w, x) => (p[x] ?? "").toString()), g = Array.isArray(c?.cell_styles) ? c.cell_styles : [], j = Array.from({ length: s.length }, (w, x) => De(g[x])), B = (c?.time ?? "").toString(), y = mt(B), m = (c?.start ?? "").toString().trim(), W = (c?.end ?? "").toString().trim(), b = {
        time: B,
        start: m || y.start || void 0,
        end: W || y.end || void 0,
        cells: u
      };
      return j.some((w) => !!w) && (b.cell_styles = j), b;
    }), o = ((t.week_mode ?? e.week_mode) + "").toString().trim(), l = o === "kw_parity" || o === "week_map" || o === "off" ? o : "off", a = (t.source_entity ?? e.source_entity).toString().trim(), _ = (t.week_offset_entity ?? "").toString().trim() || Oe(a);
    return {
      type: (t.type ?? e.type).toString(),
      title: (t.title ?? e.title).toString(),
      days: s,
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
      source_type: ((t.source_type ?? (a ? "entity" : "manual")) + "").toString().trim(),
      json_url: (t.json_url ?? "").toString(),
      no_data_text: (t.no_data_text ?? "Keine Daten für diesen Zeitraum (Ferien/Feiertag).").toString(),
      week_offset_entity: _,
      week_offset_attribute: (t.week_offset_attribute ?? "").toString(),
      week_mode: l,
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
      rows: n
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), s = new Set(Re(e).map(wt));
    if (!s.size) return -1;
    const i = (t ?? []).map((n) => wt(n));
    for (let n = 0; n < i.length; n++) if (s.has(i[n])) return n;
    return -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [e, s] = t.split(":").map((i) => Number(i));
    return [e, s].some((i) => Number.isNaN(i)) ? null : e * 60 + s;
  }
  isNowBetween(t, e) {
    const s = this.toMinutes(t), i = this.toMinutes(e);
    if (s == null || i == null) return !1;
    const n = /* @__PURE__ */ new Date(), o = n.getHours() * 60 + n.getMinutes();
    return o >= s && o < i;
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
    const s = (t ?? "").toString().trim();
    if (!s || !this.hass?.states?.[s]) return null;
    const i = this.hass.states[s], n = (e ?? "").toString().trim(), o = n ? i.attributes?.[n] : i.state;
    return this.parseAnyJson(o);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const s = t.days ?? [], i = (t.source_time_key ?? "time").toString(), n = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o.time ?? o[i] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[i] ?? "").toString(), a = mt(l), h = Array.from({ length: s.length }, (u, g) => {
        const j = (s[g] ?? "").toString();
        return (o?.[j] ?? "").toString();
      }), _ = (o?.start ?? "").toString().trim() || a.start, c = (o?.end ?? "").toString().trim() || a.end;
      return { time: l, start: _ || void 0, end: c || void 0, cells: h };
    });
    return n.length ? n : null;
  }
  getRowsFromEntity(t, e, s) {
    let i = this.readEntityJson(e, s);
    return i == null && (i = this.readEntityJson(e, "rows_ha")), i == null && (i = this.readEntityJson(e, "rows")), i == null && (i = this.readEntityJson(e, "rows_table")), i == null && (i = this.readEntityJson(e, "rows_json")), Array.isArray(i) ? this.buildRowsFromArray(t, i) : null;
  }
  async loadJsonRows(t, e) {
    const s = (e ?? "").toString().trim();
    if (!s) {
      this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = "";
      return;
    }
    this._jsonStatus = "loading", this._jsonError = "";
    try {
      const i = await fetch(s, { cache: "no-store" });
      if (!i.ok) throw new Error(`HTTP ${i.status}`);
      const n = await i.json(), o = Array.isArray(n) ? n : Array.isArray(n?.rows) ? n.rows : null, l = o ? this.buildRowsFromArray(t, o) : null;
      this._jsonRows = l ?? [], this._jsonStatus = "ok";
    } catch (i) {
      this._jsonRows = [], this._jsonStatus = "error", this._jsonError = (i?.message ?? "JSON konnte nicht geladen werden").toString();
    } finally {
      this.requestUpdate();
    }
  }
  ensureJsonLoaded(t) {
    const e = (t.json_url ?? "").toString().trim();
    e === this._jsonUrlLast && this._jsonStatus !== "error" || (e !== this._jsonUrlLast && (this._jsonUrlLast = e, this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = ""), this._jsonStatus === "idle" && e && this.loadJsonRows(t, e));
  }
  weekFromParity(t) {
    const { isoWeek: e } = Bt(/* @__PURE__ */ new Date()), s = e % 2 === 0, i = !!t.week_a_is_even_kw;
    return s === i ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const s = (t.week_map_attribute ?? "").toString().trim(), i = this.readEntityJson(e, s);
    if (!i || typeof i != "object") return null;
    const { isoWeek: n, isoYear: o } = Bt(/* @__PURE__ */ new Date()), l = String(n), a = String(o);
    if (i?.[a] && typeof i[a] == "object") {
      const _ = Ft(i[a][l]);
      if (_) return _;
    }
    const h = Ft(i?.[l]);
    return h || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  filterCellText(t, e) {
    return (t ?? "").toString().trim();
  }
  getBaseDate(t) {
    const e = this.getWeekOffsetValue(t) ?? 0, s = /* @__PURE__ */ new Date();
    return s.setHours(12, 0, 0, 0), s.setDate(s.getDate() + e * 7), s;
  }
  mondayOfWeek(t) {
    const e = new Date(t), s = e.getDay() === 0 ? 7 : e.getDay();
    return e.setDate(e.getDate() - (s - 1)), e.setHours(12, 0, 0, 0), e;
  }
  fmtDDMMYYYY(t) {
    const e = String(t.getDate()).padStart(2, "0"), s = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getFullYear());
    return `${e}.${s}.${i}`;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(t) {
    const e = (t.source_entity ?? "").toString().trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e].attributes ?? {}, n = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
    if (!Array.isArray(n) || n.length < 3) return null;
    const o = [];
    for (const l of n) {
      const h = (l ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!h) continue;
      const _ = Number(h[1]), c = Number(h[2]), p = Number(h[3]), u = new Date(_, c - 1, p, 12, 0, 0, 0);
      Number.isNaN(u.getTime()) || o.push(u);
    }
    return o.length ? o : null;
  }
  getRowsResolved(t) {
    const e = t.source_type ?? "manual";
    if (e === "manual")
      return t.rows ?? [];
    if (e === "json")
      return this.ensureJsonLoaded(t), this._jsonRows ?? [];
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), n = (t.source_entity_a ?? "").trim(), o = (t.source_entity_b ?? "").trim(), l = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (i === "A" && n)
        return this.getRowsFromEntity(t, n, l) ?? [];
      if (i === "B" && o)
        return this.getRowsFromEntity(t, o, a) ?? [];
      const h = (t.source_entity ?? "").trim();
      return h ? this.getRowsFromEntity(t, h, (t.source_attribute ?? "").trim()) ?? [] : [];
    }
    const s = (t.source_entity ?? "").toString().trim();
    return s ? this.getRowsFromEntity(t, s, (t.source_attribute ?? "").toString().trim()) ?? [] : [];
  }
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [], this._noData = !1, this._noDataMsg = "";
      return;
    }
    const t = this.config, e = t.source_type ?? "manual", s = this.getRowsResolved(t);
    if (this._rowsCache = s, e === "manual") {
      this._noData = !1, this._noDataMsg = "";
      return;
    }
    const i = (t.no_data_text ?? "Keine Daten für diesen Zeitraum (Ferien/Feiertag).").toString();
    !s || s.length === 0 ? (this._noData = !0, e === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || i}` : e === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = i) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(t) {
    const e = (t ?? "").toString().replace(/\r/g, "").trim();
    if (!e) return null;
    const s = e.split(`
`).map((u) => u.trim()).filter((u) => u.length > 0);
    if (!s.length) return null;
    const i = s.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(i)) return null;
    const n = s[0];
    if (/^(—|\-|–|---)$/.test(n)) return null;
    const o = (u) => /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(u) || /\bfällt\s+aus\b/i.test(u) || /\bverlegt\b/i.test(u) || /\bentfällt\b/i.test(u) || /\bvertretung\b/i.test(u), l = (u) => /^\d{1,4}$/.test(u) || /^[A-ZÄÖÜ]{1,4}\d{1,3}$/i.test(u), a = s.slice(1);
    let h = -1;
    for (let u = 0; u < a.length; u++)
      if (!o(a[u]) && l(a[u])) {
        h = u;
        break;
      }
    if (h < 0) {
      for (let u = a.length - 1; u >= 0; u--)
        if (l(a[u])) {
          h = u;
          break;
        }
    }
    if (h < 0) return null;
    const _ = a[h];
    let c;
    for (let u = h + 1; u < a.length; u++) {
      const g = a[u];
      if (!o(g) && !l(g)) {
        c = g;
        break;
      }
    }
    if (!c) {
      const u = a.filter((g) => !o(g) && !l(g));
      c = u.length ? u[u.length - 1] : void 0;
    }
    const p = s.slice(1).filter((u) => o(u));
    return { fach: n, raum: _, lehrer: c, notes: p.length ? p : void 0 };
  }
  renderCell(t, e) {
    const s = (t ?? "").toString(), i = this.filterCellText(s, e);
    if (yt(i)) return d``;
    const n = this.parseCellTriplet(i);
    if (n?.fach && n?.raum && n?.lehrer)
      return d`
        <div class="cellWrap">
          <div class="fach">${n.fach}</div>
          <div class="lehrer">${n.lehrer}</div>
          <div class="raum">${n.raum}</div>

          ${n.notes?.length ? d`
                <div class="notes">
                  ${n.notes.map((h) => {
        const _ = h.startsWith("🔴") ? "note noteRed" : h.startsWith("🟠") ? "note noteOrange" : h.startsWith("🟡") ? "note noteYellow" : "note", c = h.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
        return d`<div class=${_}><span class="dot">${h.slice(0, 2).trim()}</span><span class="txt">${c}</span></div>`;
      })}
                </div>
              ` : d``}
        </div>
      `;
    const o = i.replace(/\r/g, "").split(`
`).map((h) => h.trim()).filter(Boolean), l = (o[0] ?? "").trim(), a = o.slice(1);
    return l && a.length ? d`
        <div class="cellWrap">
          <div class="fach">${l}</div>
          <div class="notes">
            ${a.map((h) => {
      const _ = h.startsWith("🔴") ? "note noteRed" : h.startsWith("🟠") ? "note noteOrange" : h.startsWith("🟡") ? "note noteYellow" : "note", c = h.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim(), p = /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(h) ? h.slice(0, 2).trim() : "•";
      return d`<div class=${_}><span class="dot">${p}</span><span class="txt">${c || h}</span></div>`;
    })}
          </div>
        </div>
      ` : d`<span class="cellText">${i}</span>`;
  }
  render() {
    if (!this.config) return d``;
    const t = this.config, e = this._rowsCache, s = this.getTodayIndex(t.days ?? []), i = "1px solid var(--divider-color)", n = Lt(t.highlight_today_color ?? "", 0.12), o = Lt(t.highlight_current_color ?? "", 0.18), l = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), h = t.week_mode !== "off", _ = h ? this.getActiveWeek(t) : null, c = this.getWeekOffsetValue(t), p = (t.week_offset_entity ?? "").trim().length > 0, u = this.getHeaderDaysFromEntity(t), g = u && u.length >= (t.days?.length ?? 0) ? u : null, j = this.getBaseDate(t), B = this.mondayOfWeek(j);
    return d`
      <ha-card>
        <div class="headerRow">
          <div class="title">${t.title ?? ""}</div>

          <div class="headRight">
            ${h ? d`<div class="weekBadgeInline">Woche <b>${_}</b></div>` : d``}

            ${p ? d`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => c != null && this.setWeekOffset(t, c - 1)}>&lt;</button>
                    <div class="offsetVal">${c ?? "?"}</div>
                    <button class="btnMini" @click=${() => c != null && this.setWeekOffset(t, c + 1)}>&gt;</button>
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
      const W = t.highlight_today && m === s ? "today" : "";
      let b = "";
      if (g)
        b = this.fmtDDMMYYYY(g[m]);
      else {
        const w = je(y);
        if (w) {
          const x = new Date(B);
          x.setDate(B.getDate() + (w - 1)), b = this.fmtDDMMYYYY(x);
        }
      }
      return d`
                    <th class=${W} style=${`--sp-hl:${n};`}>
                      <div>${y}</div>
                      <div class="thDate">${b}</div>
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? d`<tr class="nodata"><td class="nodataCell" colspan=${(t.days?.length ?? 0) + 1}>${this._noDataMsg}</td></tr>` : e.map((y) => {
      if (ht(y)) {
        const F = mt(y.time), N = !!F.start && !!F.end && this.isNowBetween(F.start, F.end), z = !!t.highlight_breaks && N;
        let I = `--sp-hl:${o};`, G = "";
        return z && (I += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", G += `--sp-hl:${o}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), z && t.highlight_current_time_text && a && (I += `color:${a};`), d`
                    <tr class="break">
                      <td class="time" style=${I}>${y.time}</td>
                      <td colspan=${t.days.length} style=${G}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = y, W = m.cells ?? [], b = m.cell_styles ?? [], w = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), x = s >= 0 ? W[s] ?? "" : "", te = s >= 0 ? this.filterCellText(x, t) : "", ee = s >= 0 ? yt(te) : !1, pt = !(!!t.free_only_column_highlight && ee), Et = m.start && m.end ? `${m.start}–${m.end}` : "";
      let gt = `--sp-hl:${o};`;
      return pt && t.highlight_current && w && (gt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), pt && w && t.highlight_current_time_text && a && (gt += `color:${a};`), d`
                  <tr>
                    <td class="time" style=${gt}>
                      <div class="timeWrap">
                        <div class="timeSt">${m.time}</div>
                        ${Et ? d`<div class="timeHm">${Et}</div>` : d``}
                      </div>
                    </td>

                    ${t.days.map((F, N) => {
        const z = this.filterCellText(W[N] ?? "", t), I = b[N] ?? null, G = t.highlight_today && N === s ? "today" : "";
        let Ct = `--sp-hl:${n};` + Te(I, i);
        const se = !yt(z);
        return pt && se && w && t.highlight_current_text && l && s >= 0 && N === s && (Ct += `color:${l};`), d`<td class=${G} style=${Ct}>${this.renderCell(z, t)}</td>`;
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
}, C.styles = It`
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
`, C);
X = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakMap();
it = /* @__PURE__ */ new WeakMap();
rt = /* @__PURE__ */ new WeakMap();
nt = /* @__PURE__ */ new WeakMap();
ot = /* @__PURE__ */ new WeakMap();
$([
  Zt({ attribute: !1 })
], v.prototype, "hass", 1);
$([
  D()
], v.prototype, "config", 1);
$([
  D()
], v.prototype, "_rowsCache", 1);
$([
  D()
], v.prototype, "_noData", 1);
$([
  D()
], v.prototype, "_noDataMsg", 1);
$([
  D()
], v.prototype, "_jsonRows", 1);
$([
  D()
], v.prototype, "_jsonStatus", 1);
$([
  D()
], v.prototype, "_jsonError", 1);
let Xt = v;
function We(r, t, e) {
  r.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function T(r, t = !1) {
  if (typeof r == "boolean") return r;
  if (r == null) return t;
  const e = String(r).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(e) ? !0 : ["0", "false", "no", "off"].includes(e) ? !1 : t;
}
function Ne(r) {
  return (r ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ue(r) {
  return (r ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const ut = class ut extends P {
  constructor() {
    super(...arguments), this._open = {
      general: !0,
      highlights: !1,
      colors: !1,
      sources: !0,
      manual: !1
    }, this._uiLoaded = !1;
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
    const e = ((t?.type ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  normalizeConfig(t) {
    return new Xt().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, We(this, "config-changed", { config: t });
  }
  setValue(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
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
    const e = { ...this._config, source_type: t };
    t === "manual" || t === "json" && (e.json_url || (e.json_url = "")), this.emit(e);
  }
  setSourceEntity(t) {
    if (!this._config) return;
    const e = (t ?? "").toString().trim(), s = e ? this.findBestRowsAttribute(e) : { attr: "rows_ha", timeKey: "time" };
    this.emit({
      ...this._config,
      source_type: "manual",
      source_entity: e,
      source_attribute: s.attr,
      source_time_key: s.timeKey
    });
  }
  setJsonUrl(t) {
    this._config && this.emit({
      ...this._config,
      source_type: "json",
      json_url: (t ?? "").toString()
    });
  }
  renderSection(t, e, s) {
    const i = !!this._open[e];
    return d`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(e)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${i ? "▾" : "▸"}</div>
        </div>
        ${i ? d`<div class="sectionBody">${s}</div>` : d``}
      </div>
    `;
  }
  onToggle(t, e) {
    const s = !!t?.target?.checked;
    this.setValue(e, s);
  }
  onText(t, e) {
    const s = (t?.target?.value ?? "").toString();
    this.setValue(e, s);
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], e = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], s = { time: `${e.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    e.push(s), this.emit({ ...this._config, rows: e });
  }
  removeManualRow(t) {
    if (!this._config) return;
    const e = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    e.splice(t, 1), this.emit({ ...this._config, rows: e });
  }
  updateManualRow(t, e) {
    if (!this._config) return;
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], i = s[t];
    s[t] = { ...i, ...e }, this.emit({ ...this._config, rows: s });
  }
  updateManualCell(t, e, s) {
    if (!this._config) return;
    const i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = i[t];
    if (!n || ht(n)) return;
    const o = n, l = Array.isArray(o.cells) ? o.cells.slice() : [];
    l[e] = s, i[t] = { ...o, cells: l }, this.emit({ ...this._config, rows: i });
  }
  renderManualRows() {
    if (!this._config) return d``;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], e = Array.isArray(this._config.rows) ? this._config.rows : [];
    return d`
      <div class="rowActions">
        <mwc-button outlined @click=${this.addManualRow}>+ Zeile</mwc-button>
      </div>

      ${e.map((s, i) => {
      if (ht(s))
        return d`
            <div class="rowCard">
              <div class="rowHead">
                <div class="rowTitle">Pause</div>
                <mwc-button dense @click=${() => this.removeManualRow(i)}>Entfernen</mwc-button>
              </div>
              <div class="grid2">
                <ha-textfield label="Zeit" .value=${s.time ?? ""} @input=${(o) => this.updateManualRow(i, { time: o.target.value })}></ha-textfield>
                <ha-textfield
                  label="Label"
                  .value=${s.label ?? "Pause"}
                  @input=${(o) => this.updateManualRow(i, { label: o.target.value })}
                ></ha-textfield>
              </div>
            </div>
          `;
      const n = s;
      return d`
          <div class="rowCard">
            <div class="rowHead">
              <div class="rowTitle">Zeile ${i + 1}</div>
              <div class="rowHeadBtns">
                <mwc-button dense @click=${() => this.updateManualRow(i, { ...n, break: !0, label: "Pause" })}
                  >Als Pause</mwc-button
                >
                <mwc-button dense @click=${() => this.removeManualRow(i)}>Entfernen</mwc-button>
              </div>
            </div>

            <div class="grid3">
              <ha-textfield label="Stunde" .value=${n.time ?? ""} @input=${(o) => this.updateManualRow(i, { time: o.target.value })}></ha-textfield>
              <ha-textfield label="Start" .value=${n.start ?? ""} @input=${(o) => this.updateManualRow(i, { start: o.target.value })}></ha-textfield>
              <ha-textfield label="Ende" .value=${n.end ?? ""} @input=${(o) => this.updateManualRow(i, { end: o.target.value })}></ha-textfield>
            </div>

            <div class="cellsGrid" style=${`grid-template-columns: repeat(${t.length}, minmax(0, 1fr));`}>
              ${t.map(
        (o, l) => d`
                  <div class="cellEditor">
                    <div class="cellEditorHead">${o}</div>
                    <ha-textarea
                      .value=${(n.cells?.[l] ?? "").toString()}
                      @input=${(a) => this.updateManualCell(i, l, a.target.value)}
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
    if (!this._config) return d``;
    const t = this._config, e = this.isHaEntityPickerAvailable();
    return d`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      d`
            <div class="grid2">
              <ha-textfield label="Titel" .value=${t.title ?? ""} @input=${(s) => this.onText(s, "title")}></ha-textfield>

              <ha-textfield
                label="Tage (CSV)"
                .value=${Ue(t.days ?? [])}
                @input=${(s) => this.setValue("days", Ne(s.target.value))}
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
              <ha-switch .checked=${T(t.highlight_today, !0)} @change=${(s) => this.onToggle(s, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${T(t.highlight_current, !0)} @change=${(s) => this.onToggle(s, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${T(t.highlight_breaks, !1)} @change=${(s) => this.onToggle(s, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${T(t.free_only_column_highlight, !0)}
                @change=${(s) => this.onToggle(s, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${T(t.highlight_current_text, !1)} @change=${(s) => this.onToggle(s, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${T(t.highlight_current_time_text, !1)} @change=${(s) => this.onToggle(s, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-textfield label="Zeitfarbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_time_text_color")}></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      d`
            <div class="grid2">
              <ha-textfield label="Heute Overlay" .value=${t.highlight_today_color ?? ""} @input=${(s) => this.onText(s, "highlight_today_color")}></ha-textfield>
              <ha-textfield label="Aktuell Overlay" .value=${t.highlight_current_color ?? ""} @input=${(s) => this.onText(s, "highlight_current_color")}></ha-textfield>
            </div>
          `
    )}
        ${this.renderSection(
      "Datenquellen",
      "sources",
      d`
            <div class="grid2">
              <ha-select
                .label=${"Quelle"}
                .value=${t.source_type ?? "manual"}
                @selected=${(s) => this.setSourceType(s.detail?.value ?? s.target?.value)}
              >
                <mwc-list-item value="entity">Stundenplan24 (Integration)</mwc-list-item>
                <mwc-list-item value="json">JSON-Datei (URL / /local/...)</mwc-list-item>
                <mwc-list-item value="manual">Manuell (rows)</mwc-list-item>
              </ha-select>

              <ha-textfield
                label="Text bei fehlenden Daten"
                .value=${t.no_data_text ?? "Keine Daten für diesen Zeitraum (Ferien/Feiertag)."}
                @input=${(s) => this.onText(s, "no_data_text")}
              ></ha-textfield>
            </div>

            ${(t.source_type ?? "manual") === "entity" ? d`
                  ${e ? d`
                        <ha-entity-picker
                          .hass=${this.hass}
                          .value=${t.source_entity ?? ""}
                          .includeDomains=${["sensor"]}
                          .label=${"Sensor auswählen"}
                          @value-changed=${(s) => this.setSourceEntity(s.detail.value)}
                        ></ha-entity-picker>
                      ` : d`
                        <div class="hint" style="opacity:0.9">
                          (Deine HA-Version lädt <code>ha-entity-picker</code> hier nicht. Fallback: Entity-ID manuell eintragen.)
                        </div>
                        <ha-textfield
                          label="Sensor (entity_id)"
                          .value=${t.source_entity ?? ""}
                          @input=${(s) => this.setSourceEntity(s.target.value)}
                          placeholder="sensor.05b_woche"
                        ></ha-textfield>
                      `}
                  <div class="grid2" style="margin-top:8px;">
                    <ha-textfield
                      label="Attribut (auto)"
                      .value=${t.source_attribute ?? "rows_ha"}
                      @input=${(s) => this.onText(s, "source_attribute")}
                      placeholder="rows_ha / rows_table / rows"
                    ></ha-textfield>
                    <ha-textfield
                      label="Time-Key"
                      .value=${t.source_time_key ?? "time"}
                      @input=${(s) => this.onText(s, "source_time_key")}
                    ></ha-textfield>
                  </div>
                ` : d``}

            ${(t.source_type ?? "manual") === "json" ? d`
                  <div class="hint">
                    JSON kann z.B. aus <code>/config/www/</code> kommen → im UI als <code>/local/deinplan.json</code>.
                    Unterstützt: Array von Rows oder Objekt mit <code>rows</code>.
                  </div>
                  <ha-textfield
                    label="JSON-URL / Pfad"
                    .value=${t.json_url ?? ""}
                    @input=${(s) => this.setJsonUrl(s.target.value)}
                    placeholder="/local/stundenplan.json"
                  ></ha-textfield>
                ` : d``}

            <div class="hint" style="margin-top:10px;">
              Wechselwochen (A/B) ist optional – funktioniert nur mit Entities (A/B-Sensoren).
            </div>

            <div class="grid2">
              <ha-select .label=${"Wechselwochen (A/B)"} .value=${t.week_mode ?? "off"} @selected=${(s) => this.setValue("week_mode", s.detail?.value ?? s.target?.value)}>
                <mwc-list-item value="off">off (deaktiviert)</mwc-list-item>
                <mwc-list-item value="kw_parity">kw_parity (KW gerade/ungerade)</mwc-list-item>
                <mwc-list-item value="week_map">week_map (Mapping Entity)</mwc-list-item>
              </ha-select>

              <ha-switch .checked=${T(t.week_a_is_even_kw, !0)} @change=${(s) => this.onToggle(s, "week_a_is_even_kw")}></ha-switch>
              <div class="switchLabel">Woche A = gerade KW</div>
              <div></div>
            </div>

            ${t.week_mode === "week_map" ? d`
                  <div class="grid2">
                    <ha-textfield
                      label="week_map_entity (entity_id)"
                      .value=${t.week_map_entity ?? ""}
                      @input=${(s) => this.onText(s, "week_map_entity")}
                      placeholder="sensor.week_map"
                    ></ha-textfield>

                    <ha-textfield label="week_map_attribute" .value=${t.week_map_attribute ?? ""} @input=${(s) => this.onText(s, "week_map_attribute")}></ha-textfield>
                  </div>
                ` : d``}

            ${t.week_mode !== "off" ? d`
                  <div class="grid2">
                    <ha-textfield
                      label="source_entity_a (entity_id)"
                      .value=${t.source_entity_a ?? ""}
                      @input=${(s) => this.onText(s, "source_entity_a")}
                      placeholder="sensor.05b_woche_a"
                    ></ha-textfield>
                    <ha-textfield label="source_attribute_a" .value=${t.source_attribute_a ?? ""} @input=${(s) => this.onText(s, "source_attribute_a")}></ha-textfield>

                    <ha-textfield
                      label="source_entity_b (entity_id)"
                      .value=${t.source_entity_b ?? ""}
                      @input=${(s) => this.onText(s, "source_entity_b")}
                      placeholder="sensor.05b_woche_b"
                    ></ha-textfield>
                    <ha-textfield label="source_attribute_b" .value=${t.source_attribute_b ?? ""} @input=${(s) => this.onText(s, "source_attribute_b")}></ha-textfield>
                  </div>
                ` : d``}
          `
    )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }
};
ut.properties = {
  hass: {},
  _config: { state: !0 }
}, ut.styles = It`
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
let ct = ut;
$([
  D()
], ct.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Xt);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", ct);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit Wochenblättern (Offset Helper auto) + Stundenplan24 Notes-Layout + Zeiten",
  preview: !0
});
export {
  Xt as StundenplanCard,
  ct as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
