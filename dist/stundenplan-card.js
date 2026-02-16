const rt = globalThis, At = rt.ShadowRoot && (rt.ShadyCSS === void 0 || rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = /* @__PURE__ */ Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let qt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (At && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Nt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Nt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const de = (e) => new qt(typeof e == "string" ? e : e + "", void 0, Et), Gt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new qt(i, e, Et);
}, ge = (e, t) => {
  if (At) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), r = rt.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, e.appendChild(s);
  }
}, Pt = At ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return de(i);
})(e) : e, { is: _e, defineProperty: pe, getOwnPropertyDescriptor: fe, getOwnPropertyNames: me, getOwnPropertySymbols: ye, getPrototypeOf: we } = Object, ft = globalThis, Ut = ft.trustedTypes, be = Ut ? Ut.emptyScript : "", ve = ft.reactiveElementPolyfillSupport, I = (e, t) => e, gt = { toAttribute(e, t) {
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
} }, Ct = (e, t) => !_e(e, t), Ht = { attribute: !0, type: String, converter: gt, reflect: !1, useDefault: !1, hasChanged: Ct };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ft.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let W = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ht) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && pe(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = fe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const o = s?.call(this);
      r?.call(this, n), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = we(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const t = this.properties, i = [...me(t), ...ye(t)];
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
      for (const s of i) t.unshift(Pt(s));
    } else e !== void 0 && t.push(Pt(e));
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
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
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
    return ge(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : gt).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : gt;
      this._$Em = s;
      const o = n.fromAttribute(t, r.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[e]), i ??= n.getPropertyOptions(e), !((i.hasChanged ?? Ct)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: n } = r, o = this[s];
        n !== !0 || this._$AL.has(s) || o === void 0 || this.C(s, void 0, r, o);
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
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[I("elementProperties")] = /* @__PURE__ */ new Map(), W[I("finalized")] = /* @__PURE__ */ new Map(), ve?.({ ReactiveElement: W }), (ft.reactiveElementVersions ??= []).push("2.1.2");
const Mt = globalThis, Lt = (e) => e, _t = Mt.trustedTypes, zt = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + A, $e = `<${Xt}>`, j = document, V = () => j.createComment(""), Y = (e) => e === null || typeof e != "object" && typeof e != "function", Tt = Array.isArray, xe = (e) => Tt(e) || typeof e?.[Symbol.iterator] == "function", $t = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Bt = />/g, M = RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Jt = /'/g, It = /"/g, te = /^(?:script|style|textarea|title)$/i, ke = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = ke(1), P = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Vt = /* @__PURE__ */ new WeakMap(), T = j.createTreeWalker(j, 129);
function ee(e, t) {
  if (!Tt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(t) : t;
}
const Se = (e, t) => {
  const i = e.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = B;
  for (let l = 0; l < i; l++) {
    const a = e[l];
    let g, u, _ = -1, h = 0;
    for (; h < a.length && (o.lastIndex = h, u = o.exec(a), u !== null); ) h = o.lastIndex, o === B ? u[1] === "!--" ? o = Ft : u[1] !== void 0 ? o = Bt : u[2] !== void 0 ? (te.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = M) : u[3] !== void 0 && (o = M) : o === M ? u[0] === ">" ? (o = r ?? B, _ = -1) : u[1] === void 0 ? _ = -2 : (_ = o.lastIndex - u[2].length, g = u[1], o = u[3] === void 0 ? M : u[3] === '"' ? It : Jt) : o === It || o === Jt ? o = M : o === Ft || o === Bt ? o = B : (o = M, r = void 0);
    const d = o === M && e[l + 1].startsWith("/>") ? " " : "";
    n += o === B ? a + $e : _ >= 0 ? (s.push(g), a.slice(0, _) + Qt + a.slice(_) + A + d) : a + A + (_ === -2 ? l : d);
  }
  return [ee(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class K {
  constructor({ strings: t, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [g, u] = Se(t, i);
    if (this.el = K.createElement(g, s), T.currentNode = this.el.content, i === 2 || i === 3) {
      const _ = this.el.content.firstChild;
      _.replaceWith(..._.childNodes);
    }
    for (; (r = T.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const _ of r.getAttributeNames()) if (_.endsWith(Qt)) {
          const h = u[o++], d = r.getAttribute(_).split(A), y = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: n, name: y[2], strings: d, ctor: y[1] === "." ? Ee : y[1] === "?" ? Ce : y[1] === "@" ? Me : mt }), r.removeAttribute(_);
        } else _.startsWith(A) && (a.push({ type: 6, index: n }), r.removeAttribute(_));
        if (te.test(r.tagName)) {
          const _ = r.textContent.split(A), h = _.length - 1;
          if (h > 0) {
            r.textContent = _t ? _t.emptyScript : "";
            for (let d = 0; d < h; d++) r.append(_[d], V()), T.nextNode(), a.push({ type: 2, index: ++n });
            r.append(_[h], V());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Xt) a.push({ type: 2, index: n });
      else {
        let _ = -1;
        for (; (_ = r.data.indexOf(A, _ + 1)) !== -1; ) a.push({ type: 7, index: n }), _ += A.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = j.createElement("template");
    return s.innerHTML = t, s;
  }
}
function U(e, t, i = e, s) {
  if (t === P) return t;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = Y(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (t = U(e, r._$AS(e, t.values), r, s)), t;
}
class Ae {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (t?.creationScope ?? j).importNode(i, !0);
    T.currentNode = r;
    let n = T.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let g;
        a.type === 2 ? g = new Z(n, n.nextSibling, this, t) : a.type === 1 ? g = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (g = new Te(n, this, t)), this._$AV.push(g), a = s[++l];
      }
      o !== a?.index && (n = T.nextNode(), o++);
    }
    return T.currentNode = j, r;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = U(this, t, i), Y(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Y(this._$AH) ? this._$AA.nextSibling.data = t : this.T(j.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = K.createElement(ee(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Ae(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Vt.get(t.strings);
    return i === void 0 && Vt.set(t.strings, i = new K(t)), i;
  }
  k(t) {
    Tt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of t) r === i.length ? i.push(s = new Z(this.O(V()), this.O(V()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = Lt(t).nextSibling;
      Lt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, r, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = U(this, t, i, 0), o = !Y(t) || t !== this._$AH && t !== P, o && (this._$AH = t);
    else {
      const l = t;
      let a, g;
      for (t = n[0], a = 0; a < n.length - 1; a++) g = U(this, l[s + a], i, a), g === P && (g = this._$AH[a]), o ||= !Y(g) || g !== this._$AH[a], g === f ? t = f : t !== f && (t += (g ?? "") + n[a + 1]), this._$AH[a] = g;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ee extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Ce extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Me extends mt {
  constructor(t, i, s, r, n) {
    super(t, i, s, r, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = U(this, t, i, 0) ?? f) === P) return;
    const s = this._$AH, r = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== f && (s === f || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Te {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const je = Mt.litHtmlPolyfillSupport;
je?.(K, Z), (Mt.litHtmlVersions ??= []).push("3.3.2");
const De = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new Z(t.insertBefore(V(), n), n, void 0, i ?? {});
  }
  return r._$AI(e), r;
}, jt = globalThis;
class N extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = De(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
N._$litElement$ = !0, N.finalized = !0, jt.litElementHydrateSupport?.({ LitElement: N });
const Re = jt.litElementPolyfillSupport;
Re?.({ LitElement: N });
(jt.litElementVersions ??= []).push("4.2.2");
const Oe = { attribute: !0, type: String, converter: gt, reflect: !1, hasChanged: Ct }, We = (e = Oe, t, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ie(e) {
  return (t, i) => typeof i == "object" ? We(e, t, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, i);
}
function E(e) {
  return ie({ ...e, state: !0, attribute: !1 });
}
var Ne = Object.defineProperty, Pe = Object.getOwnPropertyDescriptor, se = (e) => {
  throw TypeError(e);
}, b = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Pe(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && Ne(t, i, r), r;
}, re = (e, t, i) => t.has(e) || se("Cannot " + i), $ = (e, t, i) => (re(e, t, "read from private field"), i ? i.call(e) : t.get(e)), x = (e, t, i) => t.has(e) ? se("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), k = (e, t, i, s) => (re(e, t, "write to private field"), t.set(e, i), i), nt, ot, at, lt, ht, ct, ut, dt;
function pt(e) {
  return !!e && e.break === !0;
}
function Dt(e) {
  return Math.min(1, Math.max(0, e));
}
function ne(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return [i, s, r].some((n) => Number.isNaN(n)) ? null : { r: i, g: s, b: r };
}
function Ue(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Dt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function He(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = ne(t);
  if (!i) return t;
  const s = typeof e.bg_alpha == "number" ? Dt(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
}
function Le(e, t) {
  const i = [], s = He(e);
  return s && i.push(`background:${s}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function Yt(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const s = ne(i);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${Dt(t)})` : i;
  }
  return i;
}
function st(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function kt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ze(e) {
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
function Kt(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const s = t.getUTCFullYear(), r = new Date(Date.UTC(s, 0, 1)), n = r.getUTCDay() === 0 ? 7 : r.getUTCDay(), o = new Date(r);
  o.setUTCDate(r.getUTCDate() + (4 - n));
  const l = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(l / (10080 * 60 * 1e3)), isoYear: s };
}
function Zt(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function xt(e) {
  const t = (e ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || /^(—|\-|–|---|\s)+$/.test(t));
}
function Fe(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), s = i.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const r = i.match(/^stundenplan_woche_(.+)$/i);
  return r?.[1] ? `number.${r[1]}_woche_offset` : "";
}
function Be(e) {
  const t = kt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var J;
const v = (J = class extends N {
  constructor() {
    super(...arguments), x(this, nt), x(this, ot), x(this, at, []), x(this, lt, !1), x(this, ht, ""), x(this, ct, null), x(this, ut, "idle"), x(this, dt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return $(this, nt);
  }
  set hass(e) {
    k(this, nt, e);
  }
  get config() {
    return $(this, ot);
  }
  set config(e) {
    k(this, ot, e);
  }
  get _rowsCache() {
    return $(this, at);
  }
  set _rowsCache(e) {
    k(this, at, e);
  }
  get _noData() {
    return $(this, lt);
  }
  set _noData(e) {
    k(this, lt, e);
  }
  get _noDataMsg() {
    return $(this, ht);
  }
  set _noDataMsg(e) {
    k(this, ht, e);
  }
  get _jsonRows() {
    return $(this, ct);
  }
  set _jsonRows(e) {
    k(this, ct, e);
  }
  get _jsonStatus() {
    return $(this, ut);
  }
  set _jsonStatus(e) {
    k(this, ut, e);
  }
  get _jsonError() {
    return $(this, dt);
  }
  set _jsonError(e) {
    k(this, dt, e);
  }
  getWatchedEntities(e) {
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      const r = (s ?? "").toString().trim();
      r && t.add(r);
    };
    return i(e.week_offset_entity), i(e.source_entity), i(e.source_entity_a), i(e.source_entity_b), i(e.week_map_entity), Array.from(t);
  }
  getEntitySig(e) {
    const t = this.hass?.states?.[e];
    if (!t) return `${e}:<missing>`;
    const i = t.last_updated ?? "", s = t.last_changed ?? "", r = t.state ?? "", n = t.attributes ?? {}, o = n.rows ?? n.rows_table ?? n.rows_json ?? n.rows_ha, l = Array.isArray(o) || typeof o == "string" ? o.length : 0;
    return `${e}|${i}|${s}|${r}|rowsLen=${l}`;
  }
  computeWatchSig(e) {
    const t = this.getWatchedEntities(e).map((r) => this.getEntitySig(r)), i = e.week_mode !== "off" ? this.getActiveWeek(e) : "off", s = this.getWeekOffsetValue(e);
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
    const i = this.hass.states[t], s = (e.week_offset_attribute ?? "").trim(), r = s ? i.attributes?.[s] : i.state, n = Number(r);
    return Number.isFinite(n) ? n : null;
  }
  async setWeekOffset(e, t) {
    const i = (e.week_offset_entity ?? "").trim();
    if (!i) return;
    const s = this.hass?.states?.[i], r = s?.attributes?.min, n = s?.attributes?.max, o = Number.isFinite(Number(r)) ? Number(r) : -52, l = Number.isFinite(Number(n)) ? Number(n) : 52;
    let a = t;
    a = Math.max(o, a), a = Math.min(l, a), await this.hass.callService("number", "set_value", { entity_id: i, value: a });
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
    const t = J.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
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
    const t = J.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((d) => (d ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(e.rows) ? e.rows : []).map((d) => {
      if (pt(d))
        return { break: !0, time: (d.time ?? "").toString(), label: (d.label ?? "Pause").toString() };
      const y = Array.isArray(d?.cells) ? d.cells : [], w = Array.from({ length: i.length }, (m, p) => (y[p] ?? "").toString()), H = Array.isArray(d?.cell_styles) ? d.cell_styles : [], q = Array.from({ length: i.length }, (m, p) => Ue(H[p])), G = (d?.time ?? "").toString(), D = st(G), Q = (d?.start ?? "").toString().trim(), yt = (d?.end ?? "").toString().trim(), L = {
        time: G,
        start: Q || D.start || void 0,
        end: yt || D.end || void 0,
        cells: w
      };
      return q.some((m) => !!m) && (L.cell_styles = q), L;
    }), r = ((e.view_mode ?? "week") + "").toString().trim(), n = r === "rolling" ? "rolling" : "week", o = Number(e.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, a = ((e.week_mode ?? t.week_mode) + "").toString().trim(), g = a === "kw_parity" || a === "week_map" || a === "off" ? a : "off", u = (e.source_entity ?? t.source_entity).toString().trim(), _ = (e.week_offset_entity ?? "").toString().trim() || Fe(u), h = (() => {
      const d = ((e.source_type ?? "") + "").toString().trim();
      if (d === "manual" || d === "entity" || d === "json" || d === "legacy") return d;
      if (u) {
        const y = ((e.source_attribute ?? "") + "").toString().trim(), w = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(u) && (y === "" || y === "rows_table") && (w === "" || w === "time")) && (y || w) ? "legacy" : "entity";
      }
      return "manual";
    })();
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      days: i,
      view_mode: n,
      days_ahead: l,
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
      source_entity: u,
      source_attribute: (h === "entity" ? "rows_table" : h === "legacy" ? ((e.source_attribute ?? "") + "").toString().trim() || "plan" : e.source_attribute ?? t.source_attribute).toString(),
      source_time_key: (h === "entity" ? "time" : h === "legacy" ? ((e.source_time_key ?? "") + "").toString().trim() || "Stunde" : e.source_time_key ?? t.source_time_key).toString(),
      source_type: h,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: _,
      week_offset_attribute: (e.week_offset_attribute ?? "").toString(),
      week_mode: g,
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
  getTodayIndex(e) {
    const t = (/* @__PURE__ */ new Date()).getDay(), i = new Set(ze(t).map(kt));
    if (!i.size) return -1;
    const s = (e ?? []).map((r) => kt(r));
    for (let r = 0; r < s.length; r++) if (i.has(s[r])) return r;
    return -1;
  }
  toMinutes(e) {
    if (!e) return null;
    const [t, i] = e.split(":").map((s) => Number(s));
    return [t, i].some((s) => Number.isNaN(s)) ? null : t * 60 + i;
  }
  isNowBetween(e, t) {
    const i = this.toMinutes(e), s = this.toMinutes(t);
    if (i == null || s == null) return !1;
    const r = /* @__PURE__ */ new Date(), n = r.getHours() * 60 + r.getMinutes();
    return n >= i && n < s;
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
    const s = this.hass.states[i], r = (t ?? "").toString().trim(), n = r ? s.attributes?.[r] : s.state;
    return this.parseAnyJson(n);
  }
  buildRowsFromArray(e, t) {
    if (!Array.isArray(t)) return null;
    const i = e.days ?? [], s = (e.source_time_key ?? "time").toString(), r = t.map((n) => {
      if (n?.break === !0)
        return {
          break: !0,
          time: (n.time ?? n[s] ?? "").toString(),
          label: (n.label ?? "Pause").toString()
        };
      const o = (n?.time ?? n?.[s] ?? "").toString(), l = st(o), a = Array.from({ length: i.length }, (_, h) => {
        const d = (i[h] ?? "").toString();
        return (n?.[d] ?? "").toString();
      }), g = (n?.start ?? "").toString().trim() || l.start, u = (n?.end ?? "").toString().trim() || l.end;
      return { time: o, start: g || void 0, end: u || void 0, cells: a };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(e, t, i) {
    let s = this.readEntityJson(t, i);
    return s == null && (s = this.readEntityJson(t, "rows_ha")), s == null && (s = this.readEntityJson(t, "rows")), s == null && (s = this.readEntityJson(t, "rows_table")), s == null && (s = this.readEntityJson(t, "rows_json")), Array.isArray(s) ? this.buildRowsFromArray(e, s) : null;
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
      const r = await s.json(), n = Array.isArray(r) ? r : Array.isArray(r?.rows) ? r.rows : null, o = n ? this.buildRowsFromArray(e, n) : null;
      this._jsonRows = o ?? [], this._jsonStatus = "ok";
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
    const { isoWeek: t } = Kt(/* @__PURE__ */ new Date()), i = t % 2 === 0, s = !!e.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(t, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: n } = Kt(/* @__PURE__ */ new Date()), o = String(r), l = String(n);
    if (s?.[l] && typeof s[l] == "object") {
      const g = Zt(s[l][o]);
      if (g) return g;
    }
    return Zt(s?.[o]) || null;
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
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(e) {
    const t = (e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, s = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
    if (!Array.isArray(s) || s.length < 3) return null;
    const r = [];
    for (const n of s) {
      const o = (n ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!o) continue;
      const l = Number(o[1]), a = Number(o[2]), g = Number(o[3]), u = new Date(l, a - 1, g, 12, 0, 0, 0);
      Number.isNaN(u.getTime()) || r.push(u);
    }
    return r.length ? r : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual";
    if (t === "manual")
      return e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const s = this.getActiveWeek(e), r = (e.source_entity_a ?? "").trim(), n = (e.source_entity_b ?? "").trim(), o = (e.source_attribute_a ?? "").trim(), l = (e.source_attribute_b ?? "").trim();
      if (s === "A" && r)
        return this.getRowsFromEntity(e, r, o) ?? [];
      if (s === "B" && n)
        return this.getRowsFromEntity(e, n, l) ?? [];
      const a = (e.source_entity ?? "").trim();
      return a ? this.getRowsFromEntity(e, a, (e.source_attribute ?? "").trim()) ?? [] : [];
    }
    const i = (e.source_entity ?? "").toString().trim();
    return i ? this.getRowsFromEntity(e, i, (e.source_attribute ?? "").toString().trim()) ?? [] : [];
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
`).map((h) => h.trim()).filter((h) => h.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const r = i[0];
    if (/^(—|\-|–|---)$/.test(r)) return null;
    const n = (h) => /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(h) || /\bfällt\s+aus\b/i.test(h) || /\bverlegt\b/i.test(h) || /\bentfällt\b/i.test(h) || /\bvertretung\b/i.test(h), o = (h) => /^\d{1,4}$/.test(h) || /^[A-ZÄÖÜ]{1,4}\d{1,3}$/i.test(h), l = i.slice(1);
    let a = -1;
    for (let h = 0; h < l.length; h++)
      if (!n(l[h]) && o(l[h])) {
        a = h;
        break;
      }
    if (a < 0) {
      for (let h = l.length - 1; h >= 0; h--)
        if (o(l[h])) {
          a = h;
          break;
        }
    }
    if (a < 0) return null;
    const g = l[a];
    let u;
    for (let h = a + 1; h < l.length; h++) {
      const d = l[h];
      if (!n(d) && !o(d)) {
        u = d;
        break;
      }
    }
    if (!u) {
      const h = l.filter((d) => !n(d) && !o(d));
      u = h.length ? h[h.length - 1] : void 0;
    }
    const _ = i.slice(1).filter((h) => n(h));
    return { fach: r, raum: g, lehrer: u, notes: _.length ? _ : void 0 };
  }
  renderCell(e, t) {
    const i = (e ?? "").toString(), s = this.filterCellText(i, t);
    if (xt(s)) return c``;
    const r = this.parseCellTriplet(s);
    if (r?.fach && r?.raum && r?.lehrer)
      return c`
        <div class="cellWrap">
          <div class="fach">${r.fach}</div>
          <div class="lehrer">${r.lehrer}</div>
          <div class="raum">${r.raum}</div>

          ${r.notes?.length ? c`
                <div class="notes">
                  ${r.notes.map((a) => {
        const g = a.startsWith("🔴") ? "note noteRed" : a.startsWith("🟠") ? "note noteOrange" : a.startsWith("🟡") ? "note noteYellow" : "note", u = a.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
        return c`<div class=${g}><span class="dot">${a.slice(0, 2).trim()}</span><span class="txt">${u}</span></div>`;
      })}
                </div>
              ` : c``}
        </div>
      `;
    const n = s.replace(/\r/g, "").split(`
`).map((a) => a.trim()).filter(Boolean), o = (n[0] ?? "").trim(), l = n.slice(1);
    return o && l.length ? c`
        <div class="cellWrap">
          <div class="fach">${o}</div>
          <div class="notes">
            ${l.map((a) => {
      const g = a.startsWith("🔴") ? "note noteRed" : a.startsWith("🟠") ? "note noteOrange" : a.startsWith("🟡") ? "note noteYellow" : "note", u = a.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim(), _ = /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(a) ? a.slice(0, 2).trim() : "•";
      return c`<div class=${g}><span class="dot">${_}</span><span class="txt">${u || a}</span></div>`;
    })}
          </div>
        </div>
      ` : c`<span class="cellText">${s}</span>`;
  }
  render() {
    if (!this.config) return c``;
    const e = this.config, t = this._rowsCache, i = this.getTodayIndex(e.days ?? []), s = (e.view_mode ?? "week").toString(), r = Number(e.days_ahead), n = Number.isFinite(r) ? Math.max(0, Math.min(6, Math.floor(r))) : 0, o = s === "rolling" && i >= 0 ? Array.from({ length: Math.min((e.days?.length ?? 0) - i, n + 1) }, (m, p) => i + p) : Array.from({ length: e.days?.length ?? 0 }, (m, p) => p), l = o.map((m) => e.days[m]), a = "1px solid var(--divider-color)", g = Yt(e.highlight_today_color ?? "", 0.12), u = Yt(e.highlight_current_color ?? "", 0.18), _ = (e.highlight_current_text_color ?? "").toString().trim(), h = (e.highlight_current_time_text_color ?? "").toString().trim(), d = e.week_mode !== "off", y = d ? this.getActiveWeek(e) : null, w = this.getWeekOffsetValue(e), H = (e.source_type ?? "manual").toString(), q = (e.week_offset_entity ?? "").trim().length > 0, G = q && (H === "entity" || H === "legacy" && (e.week_mode ?? "off") !== "off"), D = this.getHeaderDaysFromEntity(e), Q = D && D.length >= (e.days?.length ?? 0) ? D : null, yt = this.getBaseDate(e), L = this.mondayOfWeek(yt);
    return c`
      <ha-card>
        <div class="headerRow">
          <div class="title">${e.title ?? ""}</div>

          <div class="headRight">
            ${d ? c`<div class="weekBadgeInline">Woche <b>${y}</b></div>` : c``}

            ${G ? c`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => w != null && this.setWeekOffset(e, w - 1)}>&lt;</button>
                    <div class="offsetVal">${w ?? "?"}</div>
                    <button class="btnMini" @click=${() => w != null && this.setWeekOffset(e, w + 1)}>&gt;</button>
                  </div>
                ` : c``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${l.map((m, p) => {
      const z = o[p], wt = e.highlight_today && z === i ? "today" : "";
      let C = "";
      if (Q)
        C = this.fmtDDMMYYYY(Q[z]);
      else {
        const X = Be(m);
        if (X) {
          const tt = new Date(L);
          tt.setDate(L.getDate() + (X - 1)), C = this.fmtDDMMYYYY(tt);
        }
      }
      return c`
                    <th class=${wt} style=${`--sp-hl:${g};`}>
                      <div>${m}</div>
                      <div class="thDate">${C}</div>
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${l.length + 1}>${this._noDataMsg}</td></tr>` : t.map((m) => {
      if (pt(m)) {
        const F = st(m.time), et = !!F.start && !!F.end && this.isNowBetween(F.start, F.end), R = !!e.highlight_breaks && et;
        let O = `--sp-hl:${u};`, it = "";
        return R && (O += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", it += `--sp-hl:${u}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), R && e.highlight_current_time_text && h && (O += `color:${h};`), c`
                    <tr class="break">
                      <td class="time" style=${O}>${m.time}</td>
                      <td colspan=${l.length} style=${it}>${m.label ?? ""}</td>
                    </tr>
                  `;
      }
      const p = m, z = p.cells ?? [], wt = p.cell_styles ?? [], C = !!p.start && !!p.end && this.isNowBetween(p.start, p.end), X = i >= 0 ? z[i] ?? "" : "", tt = i >= 0 ? this.filterCellText(X, e) : "", le = i >= 0 ? xt(tt) : !1, bt = !(e.free_only_column_highlight && le), Rt = st(p.time), he = !!(Rt.start && Rt.end), Ot = !he && p.start && p.end ? `${p.start}–${p.end}` : "";
      let vt = `--sp-hl:${u};`;
      return bt && e.highlight_current && C && (vt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), bt && C && e.highlight_current_time_text && h && (vt += `color:${h};`), c`
                  <tr>
                    <td class="time" style=${vt}>
                      <div class="timeWrap">
                        <div class="timeSt">${p.time}</div>
                        ${Ot ? c`<div class="timeHm">${Ot}</div>` : c``}
                      </div>
                    </td>

                    ${l.map((F, et) => {
        const R = o[et], O = this.filterCellText(z[R] ?? "", e), it = wt[R] ?? null, ce = e.highlight_today && R === i ? "today" : "";
        let Wt = `--sp-hl:${g};` + Le(it, a);
        const ue = !xt(O);
        return bt && ue && C && e.highlight_current_text && _ && i >= 0 && et === i && (Wt += `color:${_};`), c`<td class=${ce} style=${Wt}>${this.renderCell(O, e)}</td>`;
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
}, J.styles = Gt`
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
`, J);
nt = /* @__PURE__ */ new WeakMap();
ot = /* @__PURE__ */ new WeakMap();
at = /* @__PURE__ */ new WeakMap();
lt = /* @__PURE__ */ new WeakMap();
ht = /* @__PURE__ */ new WeakMap();
ct = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakMap();
b([
  ie({ attribute: !1 })
], v.prototype, "hass", 1);
b([
  E()
], v.prototype, "config", 1);
b([
  E()
], v.prototype, "_rowsCache", 1);
b([
  E()
], v.prototype, "_noData", 1);
b([
  E()
], v.prototype, "_noDataMsg", 1);
b([
  E()
], v.prototype, "_jsonRows", 1);
b([
  E()
], v.prototype, "_jsonStatus", 1);
b([
  E()
], v.prototype, "_jsonError", 1);
let oe = v;
function Je(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function S(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function Ie(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ve(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const St = class extends N {
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
    const i = ((t?.type ?? "") + "").toString();
    if (i !== "custom:stundenplan-card" && i !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${i}`);
    this._config = this.normalizeConfig(this.clone(t));
  }
  normalizeConfig(t) {
    return new oe().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Je(this, "config-changed", { config: t });
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
    const i = t === "entity" || t === "json" || t === "manual" || t === "legacy" ? t : "manual", s = { ...this._config, source_type: i };
    i === "json" && s.json_url == null && (s.json_url = ""), i === "entity" && (s.source_entity == null && (s.source_entity = ""), s.source_attribute = "rows_table", s.source_time_key = "time"), i === "legacy" && (s.source_entity == null && (s.source_entity = ""), s.source_attribute = (s.source_attribute ?? "").toString().trim() || "plan", s.source_time_key = (s.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(s);
  }
  setSourceEntity(t) {
    if (!this._config) return;
    const i = (t ?? "").toString().trim();
    if ((this._config.source_type ?? "entity").toString() === "legacy") {
      this.emit({
        ...this._config,
        source_type: "legacy",
        source_entity: i
      });
      return;
    }
    this.emit({
      ...this._config,
      source_type: "entity",
      source_entity: i,
      source_attribute: "rows_table",
      source_time_key: "time"
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
    const r = !!this._open[i];
    return c`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(i)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${r ? "▾" : "▸"}</div>
        </div>
        ${r ? c`<div class="sectionBody">${s}</div>` : c``}
      </div>
    `;
  }
  onToggle(t, i) {
    const s = !!t?.target?.checked;
    this.setValue(i, s);
  }
  onText(t, i) {
    const s = (t?.target?.value ?? "").toString();
    this.setValue(i, s);
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], s = { time: `${i.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    i.push(s), this.emit({ ...this._config, rows: i });
  }
  removeManualRow(t) {
    if (!this._config) return;
    const i = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [];
    i.splice(t, 1), this.emit({ ...this._config, rows: i });
  }
  updateManualRow(t, i) {
    if (!this._config) return;
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = s[t];
    s[t] = { ...r, ...i }, this.emit({ ...this._config, rows: s });
  }
  updateManualCell(t, i, s) {
    if (!this._config) return;
    const r = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = r[t];
    if (!n || pt(n)) return;
    const o = n, l = Array.isArray(o.cells) ? o.cells.slice() : [];
    l[i] = s, r[t] = { ...o, cells: l }, this.emit({ ...this._config, rows: r });
  }
  renderManualRows() {
    if (!this._config) return c``;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = Array.isArray(this._config.rows) ? this._config.rows : [];
    return c`
      <div class="rowActions">
        <mwc-button outlined @click=${this.addManualRow}>+ Zeile</mwc-button>
      </div>

      ${i.map((s, r) => {
      if (pt(s))
        return c`
            <div class="rowCard">
              <div class="rowHead">
                <div class="rowTitle">Pause</div>
                <mwc-button dense @click=${() => this.removeManualRow(r)}>Entfernen</mwc-button>
              </div>
              <div class="grid2">
                <ha-textfield label="Zeit" .value=${s.time ?? ""} @input=${(o) => this.updateManualRow(r, { time: o.target.value })}></ha-textfield>
                <ha-textfield
                  label="Label"
                  .value=${s.label ?? "Pause"}
                  @input=${(o) => this.updateManualRow(r, { label: o.target.value })}
                ></ha-textfield>
              </div>
            </div>
          `;
      const n = s;
      return c`
          <div class="rowCard">
            <div class="rowHead">
              <div class="rowTitle">Zeile ${r + 1}</div>
              <div class="rowHeadBtns">
                <mwc-button dense @click=${() => this.updateManualRow(r, { ...n, break: !0, label: "Pause" })}
                  >Als Pause</mwc-button
                >
                <mwc-button dense @click=${() => this.removeManualRow(r)}>Entfernen</mwc-button>
              </div>
            </div>

            <div class="grid3">
              <ha-textfield label="Stunde" .value=${n.time ?? ""} @input=${(o) => this.updateManualRow(r, { time: o.target.value })}></ha-textfield>
              <ha-textfield label="Start" .value=${n.start ?? ""} @input=${(o) => this.updateManualRow(r, { start: o.target.value })}></ha-textfield>
              <ha-textfield label="Ende" .value=${n.end ?? ""} @input=${(o) => this.updateManualRow(r, { end: o.target.value })}></ha-textfield>
            </div>

            <div class="cellsGrid" style=${`grid-template-columns: repeat(${t.length}, minmax(0, 1fr));`}>
              ${t.map(
        (o, l) => c`
                  <div class="cellEditor">
                    <div class="cellEditorHead">${o}</div>
                    <ha-textarea
                      .value=${(n.cells?.[l] ?? "").toString()}
                      @input=${(a) => this.updateManualCell(r, l, a.target.value)}
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
    if (!this._config) return c``;
    const t = this._config;
    return c`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      c`
            <div class="grid2">
              <ha-textfield label="Titel" .value=${t.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-textfield>

              <ha-textfield
                label="Tage (CSV)"
                .value=${Ve(t.days ?? [])}
                @input=${(i) => this.setValue("days", Ie(i.target.value))}
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
                .computeLabel=${(i) => i?.name === "view_mode" ? "Ansicht" : i?.name}
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

              ${(t.view_mode ?? "week") === "rolling" ? c`
                <ha-textfield
                  label="Tage im Voraus (0=heute)"
                  type="number"
                  .value=${String(t.days_ahead ?? 0)}
                  @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("days_ahead", Number.isFinite(s) ? Math.max(0, Math.min(6, Math.floor(s))) : 0);
      }}
                ></ha-textfield>
              ` : c``}
            </div>

            <div class="hint">„Ab heute“ zeigt nur heute + X Folgetage (innerhalb der konfigurierten Wochenspalten).</div>
          `
    )}

        ${this.renderSection(
      "Highlights",
      "highlights",
      c`
            <div class="grid3">
              <ha-switch .checked=${S(t.highlight_today, !0)} @change=${(i) => this.onToggle(i, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${S(t.highlight_current, !0)} @change=${(i) => this.onToggle(i, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${S(t.highlight_breaks, !1)} @change=${(i) => this.onToggle(i, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${S(t.free_only_column_highlight, !0)}
                @change=${(i) => this.onToggle(i, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${S(t.highlight_current_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${S(t.highlight_current_time_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-textfield label="Zeitfarbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_time_text_color")}></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      c`
            <div class="grid2">
              <ha-textfield label="Heute Overlay" .value=${t.highlight_today_color ?? ""} @input=${(i) => this.onText(i, "highlight_today_color")}></ha-textfield>
              <ha-textfield label="Aktuell Overlay" .value=${t.highlight_current_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_color")}></ha-textfield>
            </div>
          `
    )}
        ${this.renderSection(
      "Datenquellen",
      "sources",
      c`
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

            ${["entity", "legacy"].includes(t.source_type ?? "manual") ? c`
                  ${(t.source_type ?? "manual") === "entity" && this.isHaEntityPickerAvailable() ? c`
                        ${(() => {
        const i = t.source_type ?? "manual", s = Object.keys(this.hass?.states ?? {}), r = i === "entity" ? s.filter((o) => /^sensor\./.test(o) && /_woche$/i.test(o)) : s.filter((o) => /^sensor\./.test(o)), n = s.length;
        return i === "entity" && (n < 20 || n > 0 && r.length === 0) ? c`<div class="hint">Lade Stundenplan-Sensoren…</div>` : c``;
      })()}
                        <ha-entity-picker
                          .hass=${this.hass}
                          .value=${t.source_entity ?? ""}
                          .includeDomains=${["sensor"]}
                          .entityFilter=${(i) => {
        const r = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return r && (t.source_type ?? "manual") === "integration" ? /_woche$/i.test(r) : !0;
      }}
                          .label=${"Sensor auswählen"}
                          @value-changed=${(i) => {
        try {
          const s = i.detail?.value ?? i.target?.value, r = typeof s == "string" ? s : s && typeof s == "object" ? s.entity_id : void 0;
          this.setSourceEntity(r);
        } catch (s) {
          console.error("stundenplan-card editor: setSourceEntity failed", s);
        }
      }}
                        ></ha-entity-picker>
                      ` : c``}
                      <ha-textfield
                        label="…oder Entity-ID manuell"
                        .value=${t.source_entity ?? ""}
                        @input=${(i) => this.setSourceEntity(i.target.value)}
                        placeholder=${(t.source_type ?? "manual") === "legacy" ? "sensor.stundenplan" : "sensor.05b_woche"}
                      ></ha-textfield>

                      ${(t.source_type ?? "manual") === "legacy" ? c`
                        <div class="grid2">
                          <ha-textfield label="Attribut" .value=${t.source_attribute ?? ""} @input=${(i) => this.onText(i, "source_attribute")} placeholder="plan"></ha-textfield>
                          <ha-textfield label="Time-Key" .value=${t.source_time_key ?? ""} @input=${(i) => this.onText(i, "source_time_key")} placeholder="Stunde"></ha-textfield>
                        </div>
                        <div class="hint">Legacy: REST-Sensor + JSON-Attribut (z.B. <code>plan</code>) und Zeit-Key (z.B. <code>Stunde</code>).</div>
                      ` : c``}
                ` : c``}

            ${(t.source_type ?? "manual") === "json" ? c`
                  <div class="hint">
                    JSON kann z.B. aus <code>/config/www/</code> kommen → im UI als <code>/local/deinplan.json</code>.
                    Unterstützt: Array von Rows oder Objekt mit <code>rows</code>.
                  </div>
                  <ha-textfield
                    label="JSON-URL / Pfad"
                    .value=${t.json_url ?? ""}
                    @input=${(i) => this.setJsonUrl(i.target.value)}
                    placeholder="/local/stundenplan.json"
                  ></ha-textfield>
                ` : c``}

                        ${t.source_type === "legacy" ? c`
            <div class="hint" style="margin-top:10px;">
                          Wechselwochen (A/B) gehört zu „Single-Source (Legacy / einfach)“. 
                        </div>

                        <div class="grid2">
                          <ha-form
                            .hass=${this.hass}
                            .data=${{
        week_mode: t.week_mode ?? "off",
        week_a_is_even_kw: S(t.week_a_is_even_kw, !0)
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
          const s = i?.detail?.value ?? {}, r = s.week_mode ?? t.week_mode ?? "off";
          r !== (t.week_mode ?? "off") && this.setValue("week_mode", r);
          const n = s.week_a_is_even_kw;
          typeof n == "boolean" && n !== S(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", n);
        } catch (s) {
          console.error("stundenplan-card editor: week settings change failed", s);
        }
      }}
                          ></ha-form>
                        </div>${t.week_mode === "week_map" ? c`
                              <div class="grid2">
                                <ha-textfield
                                  label="week_map_entity (entity_id)"
                                  .value=${t.week_map_entity ?? ""}
                                  @input=${(i) => this.onText(i, "week_map_entity")}
                                  placeholder="sensor.week_map"
                                ></ha-textfield>

                                <ha-textfield label="week_map_attribute" .value=${t.week_map_attribute ?? ""} @input=${(i) => this.onText(i, "week_map_attribute")}></ha-textfield>
                              </div>
                            ` : c``}

                        ${t.week_mode !== "off" ? c`
                              <div class="grid2">
                                <ha-textfield
                                  label="source_entity_a (entity_id)"
                                  .value=${t.source_entity_a ?? ""}
                                  @input=${(i) => this.onText(i, "source_entity_a")}
                                  placeholder="sensor.05b_woche_a"
                                ></ha-textfield>
                                <ha-textfield label="source_attribute_a" .value=${t.source_attribute_a ?? ""} @input=${(i) => this.onText(i, "source_attribute_a")}></ha-textfield>

                                <ha-textfield
                                  label="source_entity_b (entity_id)"
                                  .value=${t.source_entity_b ?? ""}
                                  @input=${(i) => this.onText(i, "source_entity_b")}
                                  placeholder="sensor.05b_woche_b"
                                ></ha-textfield>
                                <ha-textfield label="source_attribute_b" .value=${t.source_attribute_b ?? ""} @input=${(i) => this.onText(i, "source_attribute_b")}></ha-textfield>
                              </div>
                            ` : c``}
            ` : c``}

          `
    )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }
};
St.properties = {
  hass: {},
  _config: { state: !0 }
}, St.styles = Gt`
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
let ae = St;
b([
  E()
], ae.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", oe);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", ae);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit Wochenblättern (Offset Helper auto) + Stundenplan24 Notes-Layout + Zeiten",
  preview: !0
});
export {
  oe as StundenplanCard,
  ae as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
