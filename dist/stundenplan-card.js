const J = globalThis, _t = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ft = /* @__PURE__ */ Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Xt = (n) => new Ut(typeof n == "string" ? n : n + "", void 0, ft), Bt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new Ut(e, n, ft);
}, te = (n, t) => {
  if (_t) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, St = _t ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Xt(e);
})(n) : n;
const { is: ee, defineProperty: ie, getOwnPropertyDescriptor: se, getOwnPropertyNames: re, getOwnPropertySymbols: ne, getPrototypeOf: oe } = Object, st = globalThis, At = st.trustedTypes, ae = At ? At.emptyScript : "", le = st.reactiveElementPolyfillSupport, z = (n, t) => n, X = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ae : null;
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
} }, mt = (n, t) => !ee(n, t), Ct = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), st.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && ie(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = se(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const c = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = oe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, i = [...re(e), ...ne(e)];
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
      for (const s of i) e.unshift(St(s));
    } else t !== void 0 && e.push(St(t));
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
    return te(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : X).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : X;
      this._$Em = s;
      const c = r.fromAttribute(e, o.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? mt)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, c = this[s];
        r !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, o, c);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[z("elementProperties")] = /* @__PURE__ */ new Map(), D[z("finalized")] = /* @__PURE__ */ new Map(), le?.({ ReactiveElement: D }), (st.reactiveElementVersions ??= []).push("2.1.2");
const yt = globalThis, Et = (n) => n, tt = yt.trustedTypes, Tt = tt ? tt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, zt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Ft = "?" + v, ce = `<${Ft}>`, C = document, L = () => C.createComment(""), I = (n) => n === null || typeof n != "object" && typeof n != "function", wt = Array.isArray, he = (n) => wt(n) || typeof n?.[Symbol.iterator] == "function", lt = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Mt = /-->/g, Dt = />/g, k = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Pt = /"/g, Lt = /^(?:script|style|textarea|title)$/i, ue = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), d = ue(1), P = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), A = C.createTreeWalker(C, 129);
function It(n, t) {
  if (!wt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const de = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = B;
  for (let c = 0; c < e; c++) {
    const a = n[c];
    let l, p, h = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, p = r.exec(a), p !== null); ) g = r.lastIndex, r === B ? p[1] === "!--" ? r = Mt : p[1] !== void 0 ? r = Dt : p[2] !== void 0 ? (Lt.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = k) : p[3] !== void 0 && (r = k) : r === k ? p[0] === ">" ? (r = s ?? B, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, l = p[1], r = p[3] === void 0 ? k : p[3] === '"' ? Pt : Rt) : r === Pt || r === Rt ? r = k : r === Mt || r === Dt ? r = B : (r = k, s = void 0);
    const u = r === k && n[c + 1].startsWith("/>") ? " " : "";
    o += r === B ? a + ce : h >= 0 ? (i.push(l), a.slice(0, h) + zt + a.slice(h) + v + u) : a + v + (h === -2 ? c : u);
  }
  return [It(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, p] = de(t, e);
    if (this.el = j.createElement(l, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = A.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(zt)) {
          const g = p[r++], u = s.getAttribute(h).split(v), _ = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: _[2], strings: u, ctor: _[1] === "." ? ge : _[1] === "?" ? _e : _[1] === "@" ? fe : rt }), s.removeAttribute(h);
        } else h.startsWith(v) && (a.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Lt.test(s.tagName)) {
          const h = s.textContent.split(v), g = h.length - 1;
          if (g > 0) {
            s.textContent = tt ? tt.emptyScript : "";
            for (let u = 0; u < g; u++) s.append(h[u], L()), A.nextNode(), a.push({ type: 2, index: ++o });
            s.append(h[g], L());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ft) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(v, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function O(n, t, e = n, i) {
  if (t === P) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = I(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = O(n, s._$AS(n, t.values), s, i)), t;
}
class pe {
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
    let o = A.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new V(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new me(o, this, t)), this._$AV.push(l), a = i[++c];
      }
      r !== a?.index && (o = A.nextNode(), r++);
    }
    return A.currentNode = C, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = O(this, t, e), I(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : he(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = j.createElement(It(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new pe(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ot.get(t.strings);
    return e === void 0 && Ot.set(t.strings, e = new j(t)), e;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new V(this.O(L()), this.O(L()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Et(t).nextSibling;
      Et(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = O(this, t, e, 0), r = !I(t) || t !== this._$AH && t !== P, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = O(this, c[i + a], e, a), l === P && (l = this._$AH[a]), r ||= !I(l) || l !== this._$AH[a], l === f ? t = f : t !== f && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ge extends rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class _e extends rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class fe extends rt {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? f) === P) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class me {
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
const ye = yt.litHtmlPolyfillSupport;
ye?.(j, V), (yt.litHtmlVersions ??= []).push("3.3.2");
const we = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new V(t.insertBefore(L(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const $t = globalThis;
class R extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = we(e, this.renderRoot, this.renderOptions);
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
R._$litElement$ = !0, R.finalized = !0, $t.litElementHydrateSupport?.({ LitElement: R });
const $e = $t.litElementPolyfillSupport;
$e?.({ LitElement: R });
($t.litElementVersions ??= []).push("4.2.2");
const be = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: mt }, ve = (n = be, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, n, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, n, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, n, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function jt(n) {
  return (t, e) => typeof e == "object" ? ve(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function nt(n) {
  return jt({ ...n, state: !0, attribute: !1 });
}
var xe = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, Vt = (n) => {
  throw TypeError(n);
}, Y = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ke(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && xe(t, e, s), s;
}, Yt = (n, t, e) => t.has(n) || Vt("Cannot " + e), ct = (n, t, e) => (Yt(n, t, "read from private field"), e ? e.call(n) : t.get(n)), ht = (n, t, e) => t.has(n) ? Vt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), ut = (n, t, e, i) => (Yt(n, t, "write to private field"), t.set(n, e), e), Z, G, Q;
function F(n) {
  return !!n && n.break === !0;
}
function bt(n) {
  return Math.min(1, Math.max(0, n));
}
function Kt(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((o) => Number.isNaN(o)) ? null : { r: e, g: i, b: s };
}
function Se(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = bt(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Ae(n) {
  if (!n?.bg) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = Kt(t);
  if (!e) return t;
  const i = typeof n.bg_alpha == "number" ? bt(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function Ce(n, t) {
  const e = [], i = Ae(n);
  return i && e.push(`background:${i}`), n?.color && e.push(`color:${n.color}`), e.push(`border:${n?.border ?? t}`), e.join(";") + ";";
}
function Wt(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = Kt(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${bt(t)})` : e;
  }
  return e;
}
function dt(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function gt(n) {
  return (n ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Ee(n) {
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
  const i = t.getUTCFullYear(), s = new Date(Date.UTC(i, 0, 1)), o = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), r = new Date(s);
  r.setUTCDate(s.getUTCDate() + (4 - o));
  const c = t.getTime() - r.getTime();
  return { isoWeek: 1 + Math.round(c / (10080 * 60 * 1e3)), isoYear: i };
}
function Ht(n) {
  const t = (n ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function pt(n) {
  const t = (n ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || /^(—|\-|–|---|\s)+$/.test(t));
}
function qt(n) {
  const t = (n ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const e = t.slice(7), i = e.match(/^(.+)_woche$/i);
  if (i?.[1]) return `number.${i[1]}_woche_offset`;
  const s = e.match(/^stundenplan_woche_(.+)$/i);
  return s?.[1] ? `number.${s[1]}_woche_offset` : "";
}
function Te(n) {
  const t = gt(n);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var x;
const K = (x = class extends R {
  constructor() {
    super(...arguments), this._pendingManualFocus = null, ht(this, Z), ht(this, G), ht(this, Q, []), this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return ct(this, Z);
  }
  set hass(t) {
    ut(this, Z, t);
  }
  get config() {
    return ct(this, G);
  }
  set config(t) {
    ut(this, G, t);
  }
  get _rowsCache() {
    return ct(this, Q);
  }
  set _rowsCache(t) {
    ut(this, Q, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), i = (s) => {
      const o = (s ?? "").toString().trim();
      o && e.add(o);
    };
    return i(t.week_offset_entity), i(t.source_entity), i(t.source_entity_a), i(t.source_entity_b), i(t.week_map_entity), i(t.splan24_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const i = e.last_updated ?? "", s = e.last_changed ?? "", o = e.state ?? "", r = e.attributes ?? {}, c = r.rows ?? r.rows_table ?? r.rows_json ?? r.rows_ha, a = Array.isArray(c) || typeof c == "string" ? c.length : 0;
    return `${t}|${i}|${s}|${o}|rowsLen=${a}`;
  }
  computeWatchSig(t) {
    const i = this.getWatchedEntities(t).map((r) => this.getEntitySig(r)), s = t.week_mode !== "off" ? this.getActiveWeek(t) : "off", o = this.getWeekOffsetValue(t);
    return `week=${s}|off=${o ?? "null"}::` + i.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const t = this.computeWatchSig(this.config);
    t !== this._lastWatchSig && (this._lastWatchSig = t, this.recomputeRows());
  }
  getWeekOffsetValue(t) {
    const e = (t.week_offset_entity ?? "").trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e], s = (t.week_offset_attribute ?? "").trim(), o = s ? i.attributes?.[s] : i.state, r = Number(o);
    return Number.isFinite(r) ? r : null;
  }
  async setWeekOffset(t, e) {
    const i = (t.week_offset_entity ?? "").trim();
    if (!i) return;
    const s = this.hass?.states?.[i], o = s?.attributes?.min, r = s?.attributes?.max, c = Number.isFinite(Number(o)) ? Number(o) : -52, a = Number.isFinite(Number(r)) ? Number(r) : 52;
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
    if (this._pendingManualFocus) {
      const { row: e, day: i } = this._pendingManualFocus;
      if (this._pendingManualFocus = null, this.shadowRoot?.getElementById(`manual-row-${e}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }), i) {
        const o = this.shadowRoot?.getElementById(`manual-cell-${e}-${i}`);
        try {
          o?.focus?.(), o?.shadowRoot?.querySelector("input")?.focus?.(), o?.shadowRoot?.querySelector("textarea")?.focus?.();
        } catch {
        }
      }
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
      splan24_attribute: "rows_ha",
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
    const e = x.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((h) => (h ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], o = (Array.isArray(t.rows) ? t.rows : []).map((h) => {
      if (F(h))
        return { break: !0, time: (h.time ?? "").toString(), label: (h.label ?? "Pause").toString() };
      const g = Array.isArray(h?.cells) ? h.cells : [], u = Array.from({ length: i.length }, (w, b) => (g[b] ?? "").toString()), _ = Array.isArray(h?.cell_styles) ? h.cell_styles : [], E = Array.from({ length: i.length }, (w, b) => Se(_[b])), W = (h?.time ?? "").toString(), y = dt(W), m = (h?.start ?? "").toString().trim(), T = (h?.end ?? "").toString().trim(), $ = {
        time: W,
        start: m || y.start || void 0,
        end: T || y.end || void 0,
        cells: u
      };
      return E.some((w) => !!w) && ($.cell_styles = E), $;
    }), r = ((t.week_mode ?? e.week_mode) + "").toString().trim(), c = r === "kw_parity" || r === "week_map" || r === "off" ? r : "off", a = (t.source_entity ?? e.source_entity).toString().trim(), p = (t.week_offset_entity ?? "").toString().trim() || qt(a);
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
      splan24_attribute: (t.splan24_attribute ?? "rows_ha").toString(),
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
      rows: o
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(Ee(e).map(gt));
    if (!i.size) return -1;
    const s = (t ?? []).map((o) => gt(o));
    for (let o = 0; o < s.length; o++) if (i.has(s[o])) return o;
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
    const o = /* @__PURE__ */ new Date(), r = o.getHours() * 60 + o.getMinutes();
    return r >= i && r < s;
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
    const s = this.hass.states[i], o = (e ?? "").toString().trim(), r = o ? s.attributes?.[o] : s.state;
    return this.parseAnyJson(r);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], s = (t.source_time_key ?? "time").toString(), o = e.map((r) => {
      if (r?.break === !0)
        return {
          break: !0,
          time: (r.time ?? r[s] ?? "").toString(),
          label: (r.label ?? "Pause").toString()
        };
      const c = (r?.time ?? r?.[s] ?? "").toString(), a = dt(c), l = Array.from({ length: i.length }, (u, _) => {
        const E = (i[_] ?? "").toString();
        return (r?.[E] ?? "").toString();
      }), p = (r?.start ?? "").toString().trim() || a.start, h = (r?.end ?? "").toString().trim() || a.end;
      return { time: c, start: p || void 0, end: h || void 0, cells: l };
    });
    return o.length ? o : null;
  }
  getRowsFromEntity(t, e, i) {
    let s = this.readEntityJson(e, i);
    return s == null && (s = this.readEntityJson(e, "rows_ha")), s == null && (s = this.readEntityJson(e, "rows")), s == null && (s = this.readEntityJson(e, "rows_table")), s == null && (s = this.readEntityJson(e, "rows_json")), Array.isArray(s) ? this.buildRowsFromArray(t, s) : null;
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
    const { isoWeek: o, isoYear: r } = Nt(/* @__PURE__ */ new Date()), c = String(o), a = String(r);
    if (s?.[a] && typeof s[a] == "object") {
      const p = Ht(s[a][c]);
      if (p) return p;
    }
    const l = Ht(s?.[c]);
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
    const s = this.hass.states[e].attributes ?? {}, o = s?.meta_ha?.days ?? s?.meta?.days ?? s?.days ?? (typeof s?.meta_json == "string" ? this.parseAnyJson(s.meta_json)?.days : null) ?? null;
    if (!Array.isArray(o) || o.length < 3) return null;
    const r = [];
    for (const c of o) {
      const l = (c ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!l) continue;
      const p = Number(l[1]), h = Number(l[2]), g = Number(l[3]), u = new Date(p, h - 1, g, 12, 0, 0, 0);
      Number.isNaN(u.getTime()) || r.push(u);
    }
    return r.length ? r : null;
  }
  getRowsResolved(t) {
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), s = (t.source_entity_a ?? "").trim(), o = (t.source_entity_b ?? "").trim(), r = (t.source_attribute_a ?? "").trim(), c = (t.source_attribute_b ?? "").trim();
      if (i === "A" && s) {
        const l = this.getRowsFromEntity(t, s, r);
        if (l) return l;
      }
      if (i === "B" && o) {
        const l = this.getRowsFromEntity(t, o, c);
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
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(t) {
    const e = (t ?? "").toString().replace(/\r/g, "").trim();
    if (!e) return null;
    const i = e.split(`
`).map((u) => u.trim()).filter((u) => u.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const o = i[0];
    if (/^(—|\-|–|---)$/.test(o)) return null;
    const r = (u) => /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(u) || /\bfällt\s+aus\b/i.test(u) || /\bverlegt\b/i.test(u) || /\bentfällt\b/i.test(u) || /\bvertretung\b/i.test(u), c = (u) => /^\d{1,4}$/.test(u) || /^[A-ZÄÖÜ]{1,4}\d{1,3}$/i.test(u), a = i.slice(1);
    let l = -1;
    for (let u = 0; u < a.length; u++)
      if (!r(a[u]) && c(a[u])) {
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
      const _ = a[u];
      if (!r(_) && !c(_)) {
        h = _;
        break;
      }
    }
    if (!h) {
      const u = a.filter((_) => !r(_) && !c(_));
      h = u.length ? u[u.length - 1] : void 0;
    }
    const g = i.slice(1).filter((u) => r(u));
    return { fach: o, raum: p, lehrer: h, notes: g.length ? g : void 0 };
  }
  renderCell(t, e) {
    const i = (t ?? "").toString(), s = this.filterCellText(i, e);
    if (pt(s)) return d``;
    const o = this.parseCellTriplet(s);
    if (o?.fach && o?.raum && o?.lehrer)
      return d`
        <div class="cellWrap">
          <div class="fach">${o.fach}</div>
          <div class="lehrer">${o.lehrer}</div>
          <div class="raum">${o.raum}</div>

          ${o.notes?.length ? d`
                <div class="notes">
                  ${o.notes.map((l) => {
        const p = l.startsWith("🔴") ? "note noteRed" : l.startsWith("🟠") ? "note noteOrange" : l.startsWith("🟡") ? "note noteYellow" : "note", h = l.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim();
        return d`<div class=${p}><span class="dot">${l.slice(0, 2).trim()}</span><span class="txt">${h}</span></div>`;
      })}
                </div>
              ` : d``}
        </div>
      `;
    const r = s.replace(/\r/g, "").split(`
`).map((l) => l.trim()).filter(Boolean), c = (r[0] ?? "").trim(), a = r.slice(1);
    return c && a.length ? d`
        <div class="cellWrap">
          <div class="fach">${c}</div>
          <div class="notes">
            ${a.map((l) => {
      const p = l.startsWith("🔴") ? "note noteRed" : l.startsWith("🟠") ? "note noteOrange" : l.startsWith("🟡") ? "note noteYellow" : "note", h = l.replace(/^[🟠🔴🟡🟢⚪️🟣🟤]\s*/g, "").trim(), g = /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(l) ? l.slice(0, 2).trim() : "•";
      return d`<div class=${p}><span class="dot">${g}</span><span class="txt">${h || l}</span></div>`;
    })}
          </div>
        </div>
      ` : d`<span class="cellText">${s}</span>`;
  }
  render() {
    if (!this.config) return d``;
    const t = this.config, e = this._rowsCache, i = this.getTodayIndex(t.days ?? []), s = "1px solid var(--divider-color)", o = Wt(t.highlight_today_color ?? "", 0.12), r = Wt(t.highlight_current_color ?? "", 0.18), c = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), l = t.week_mode !== "off", p = l ? this.getActiveWeek(t) : null, h = this.getWeekOffsetValue(t), g = (t.week_offset_entity ?? "").trim().length > 0, u = this.getHeaderDaysFromEntity(t), _ = u && u.length >= (t.days?.length ?? 0) ? u : null, E = this.getBaseDate(t), W = this.mondayOfWeek(E);
    return d`
      <ha-card>
        <div class="headerRow">
          <div class="title">${t.title ?? ""}</div>

          <div class="headRight">
            ${l ? d`<div class="weekBadgeInline">Woche <b>${p}</b></div>` : d``}

            ${g ? d`
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
      const T = t.highlight_today && m === i ? "today" : "";
      let $ = "";
      if (_)
        $ = this.fmtDDMMYYYY(_[m]);
      else {
        const w = Te(y);
        if (w) {
          const b = new Date(W);
          b.setDate(W.getDate() + (w - 1)), $ = this.fmtDDMMYYYY(b);
        }
      }
      return d`
                    <th class=${T} style=${`--sp-hl:${o};`}>
                      <div>${y}</div>
                      <div class="thDate">${$}</div>
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((y) => {
      if (F(y)) {
        const N = dt(y.time), M = !!N.start && !!N.end && this.isNowBetween(N.start, N.end), H = !!t.highlight_breaks && M;
        let U = `--sp-hl:${r};`, q = "";
        return H && (U += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", q += `--sp-hl:${r}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), H && t.highlight_current_time_text && a && (U += `color:${a};`), d`
                    <tr class="break">
                      <td class="time" style=${U}>${y.time}</td>
                      <td colspan=${t.days.length} style=${q}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = y, T = m.cells ?? [], $ = m.cell_styles ?? [], w = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), b = i >= 0 ? T[i] ?? "" : "", Zt = i >= 0 ? this.filterCellText(b, t) : "", Gt = i >= 0 ? pt(Zt) : !1, ot = !(!!t.free_only_column_highlight && Gt), vt = m.start && m.end ? `${m.start}–${m.end}` : "";
      let at = `--sp-hl:${r};`;
      return ot && t.highlight_current && w && (at += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), ot && w && t.highlight_current_time_text && a && (at += `color:${a};`), d`
                  <tr>
                    <td class="time" style=${at}>
                      <div class="timeWrap">
                        <div class="timeSt">${m.time}</div>
                        ${vt ? d`<div class="timeHm">${vt}</div>` : d``}
                      </div>
                    </td>

                    ${t.days.map((N, M) => {
        const H = this.filterCellText(T[M] ?? "", t), U = $[M] ?? null, q = t.highlight_today && M === i ? "today" : "";
        let xt = `--sp-hl:${o};` + Ce(U, s);
        const Qt = !pt(H);
        return ot && Qt && w && t.highlight_current_text && c && i >= 0 && M === i && (xt += `color:${c};`), d`<td class=${q} style=${xt}>${this.renderCell(H, t)}</td>`;
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
}, x.styles = Bt`
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
  `, x);
Z = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakMap();
Y([
  nt()
], K.prototype, "_pendingManualFocus", 2);
Y([
  jt({ attribute: !1 })
], K.prototype, "hass", 1);
Y([
  nt()
], K.prototype, "config", 1);
Y([
  nt()
], K.prototype, "_rowsCache", 1);
let Jt = K;
function Me(n, t, e) {
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
function De(n) {
  return (n ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Re(n) {
  return (n ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const it = class it extends R {
  constructor() {
    super(...arguments), this._open = {
      general: !0,
      highlights: !1,
      colors: !1,
      splan24: !0,
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
    return new Jt().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Me(this, "config-changed", { config: t });
  }
  setValue(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  toggleOpen(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  findBestRowsAttribute(t) {
    const i = this.hass?.states?.[t]?.attributes ?? {};
    return i.rows_ha != null ? { attr: "rows_ha", timeKey: "time" } : i.rows != null ? { attr: "rows", timeKey: "time" } : i.rows_table != null ? { attr: "rows_table", timeKey: "time" } : i.rows_json != null ? { attr: "rows_json", timeKey: "time" } : { attr: "rows_ha", timeKey: "time" };
  }
  setSplan24Entity(t) {
    if (!this._config) return;
    const e = (t ?? "").toString().trim(), i = e ? this.findBestRowsAttribute(e) : { attr: "rows_ha", timeKey: "time" };
    this.emit({
      ...this._config,
      splan24_entity: e,
      splan24_attribute: i.attr,
      source_entity: e,
      source_attribute: i.attr,
      source_time_key: i.timeKey
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
  addManualPause() {
    if (!this._config) return;
    const t = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], e = { time: "Pause", label: "Pause", is_break: !0 };
    t.push(e), this.setValue("rows", t);
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
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], o = s[t];
    if (!o || F(o)) return;
    const r = o, c = Array.isArray(r.cells) ? r.cells.slice() : [];
    c[e] = i, s[t] = { ...r, cells: c }, this.emit({ ...this._config, rows: s });
  }
  jumpToManual(t, e) {
    this._pendingManualFocus = { row: t, day: e }, this.requestUpdate();
  }
  renderManualPreview(t, e) {
    return d`
      <div class="manualPreview">
        <div class="manualPreviewHint">Vorschau – Klick auf ein Fach springt zur passenden Zeile im Editor.</div>
        <table class="previewTable">
          <thead>
            <tr>
              <th>Stunde</th>
              ${t.map((i) => d`<th>${i}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${e.map((i, s) => {
      if (F(i))
        return d`
                  <tr class="previewBreak" @click=${() => this.jumpToManual(s)}>
                    <td class="pTime">${(i.time ?? "").toString()}</td>
                    <td class="pBreak" colspan=${t.length}>${(i.label ?? "Pause").toString()}</td>
                  </tr>
                `;
      const o = i;
      return d`
                <tr>
                  <td class="pTime" @click=${() => this.jumpToManual(s)}>${(o.time ?? "").toString()}</td>
                  ${t.map((r, c) => {
        const a = (o.cells?.[c] ?? "").toString().trim();
        return d`
                      <td class="pCell" @click=${() => this.jumpToManual(s, r)} title="Klicken zum Bearbeiten">
                        ${a || d`<span class="pEmpty">–</span>`}
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
  renderManualRows() {
    if (!this._config) return d``;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], e = Array.isArray(this._config.rows) ? this._config.rows : [];
    return d`
      ${e.length ? this.renderManualPreview(t, e) : d``}

      <div class="rowActions">
        <mwc-button outlined @click=${this.addManualRow}>+ Stunde</mwc-button>
        <mwc-button outlined @click=${this.addManualPause}>+ Pause</mwc-button>
      </div>

      ${e.map((i, s) => {
      if (F(i))
        return d`
            <div class="rowCard" id=${`manual-row-${s}`}>
              <div class="rowHead">
                <div class="rowTitle">Pause</div>
                <mwc-button dense @click=${() => this.removeManualRow(s)}>Entfernen</mwc-button>
              </div>
              <div class="grid2">
                <ha-textfield label="Zeit" .value=${i.time ?? ""} @input=${(r) => this.updateManualRow(s, { time: r.target.value })}></ha-textfield>
                <ha-textfield
                  label="Label"
                  .value=${i.label ?? "Pause"}
                  @input=${(r) => this.updateManualRow(s, { label: r.target.value })}
                ></ha-textfield>
              </div>
            </div>
          `;
      const o = i;
      return d`
          <div class="rowCard" id=${`manual-row-${s}`}>
            <div class="rowHead">
              <div class="rowTitle">Zeile ${s + 1}</div>
              <div class="rowHeadBtns">
                <mwc-button dense @click=${() => this.updateManualRow(s, { ...o, break: !0, label: "Pause" })}
                  >Als Pause</mwc-button
                >
                <mwc-button dense @click=${() => this.removeManualRow(s)}>Entfernen</mwc-button>
              </div>
            </div>

            <div class="grid3">
              <ha-textfield label="Stunde" .value=${o.time ?? ""} @input=${(r) => this.updateManualRow(s, { time: r.target.value })}></ha-textfield>
              <ha-textfield label="Start" .value=${o.start ?? ""} @input=${(r) => this.updateManualRow(s, { start: r.target.value })}></ha-textfield>
              <ha-textfield label="Ende" .value=${o.end ?? ""} @input=${(r) => this.updateManualRow(s, { end: r.target.value })}></ha-textfield>
            </div>

            <div class="cellsGrid" style=${`grid-template-columns: repeat(${t.length}, minmax(0, 1fr));`}>
              ${t.map(
        (r, c) => d`
                  <div class="cellEditor">
                    <div class="cellEditorHead">${r}</div>
                    <ha-textarea
                      id=${`manual-cell-${s}-${r}`}
                      .value=${(o.cells?.[c] ?? "").toString()}
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
  isHaEntityPickerAvailable() {
    return typeof customElements < "u" && !!customElements.get("ha-entity-picker");
  }
  render() {
    if (!this._config) return d``;
    const t = this._config, e = (t.splan24_entity ?? "").toString().trim(), i = e ? qt(e) : "", s = i || (t.week_offset_entity ?? "").toString().trim(), o = this.isHaEntityPickerAvailable();
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
                .value=${Re(t.days ?? [])}
                @input=${(r) => this.setValue("days", De(r.target.value))}
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
              Wähle hier deinen <b>sensor.&lt;klasse&gt;_woche</b>. Dadurch werden Datenquelle automatisch gesetzt und der Offset-Helper im Hintergrund erkannt
              (<code>${s || "—"}</code>).
            </div>

            ${o ? d`
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${t.splan24_entity ?? ""}
                    .includeDomains=${["sensor"]}
                    .label=${"Stundenplan24 Woche Sensor"}
                    @value-changed=${(r) => this.setSplan24Entity(r.detail.value)}
                  ></ha-entity-picker>
                ` : d`
                  <div class="hint" style="opacity:0.9">
                    (Deine HA-Version lädt <code>ha-entity-picker</code> hier nicht. Fallback: Entity-ID manuell eintragen.)
                  </div>
                  <ha-textfield
                    label="Stundenplan24 Woche Sensor (entity_id)"
                    .value=${t.splan24_entity ?? ""}
                    @input=${(r) => this.setSplan24Entity(r.target.value)}
                    placeholder="sensor.05b_woche"
                  ></ha-textfield>
                `}

            <div class="sub" style="margin-top:6px;">
              Attribut automatisch: <code>${t.source_attribute || "rows_ha"}</code>
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
                    <ha-textfield
                      label="week_map_entity (entity_id)"
                      .value=${t.week_map_entity ?? ""}
                      @input=${(r) => this.onText(r, "week_map_entity")}
                      placeholder="sensor.week_map"
                    ></ha-textfield>

                    <ha-textfield label="week_map_attribute" .value=${t.week_map_attribute ?? ""} @input=${(r) => this.onText(r, "week_map_attribute")}></ha-textfield>
                  </div>
                ` : d``}

            ${t.week_mode !== "off" ? d`
                  <div class="grid2">
                    <ha-textfield
                      label="source_entity_a (entity_id)"
                      .value=${t.source_entity_a ?? ""}
                      @input=${(r) => this.onText(r, "source_entity_a")}
                      placeholder="sensor.05b_woche_a"
                    ></ha-textfield>
                    <ha-textfield label="source_attribute_a" .value=${t.source_attribute_a ?? ""} @input=${(r) => this.onText(r, "source_attribute_a")}></ha-textfield>

                    <ha-textfield
                      label="source_entity_b (entity_id)"
                      .value=${t.source_entity_b ?? ""}
                      @input=${(r) => this.onText(r, "source_entity_b")}
                      placeholder="sensor.05b_woche_b"
                    ></ha-textfield>
                    <ha-textfield label="source_attribute_b" .value=${t.source_attribute_b ?? ""} @input=${(r) => this.onText(r, "source_attribute_b")}></ha-textfield>
                  </div>
                ` : d``}
          `
    )}

        ${(t.source_type ?? "manual") === "manual" ? this.renderSection("Zeilen & Fächer", "manual", this.renderManualRows()) : d``}
      </div>
    `;
  }
};
it.properties = {
  hass: {},
  _config: { state: !0 }
}, it.styles = Bt`
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
  
    .manualPreview {
      padding: 10px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      overflow: auto;
    }
    .manualPreviewHint {
      font-size: 12px;
      opacity: 0.85;
      margin-bottom: 8px;
    }
    table.previewTable {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      min-width: 520px;
    }
    .previewTable th,
    .previewTable td {
      border: 1px solid rgba(255,255,255,0.08);
      padding: 6px 8px;
      vertical-align: middle;
    }
    .previewTable th {
      font-weight: 600;
      opacity: 0.9;
      background: rgba(255,255,255,0.03);
    }
    .pTime {
      white-space: nowrap;
      font-weight: 600;
      opacity: 0.95;
      cursor: pointer;
    }
    .pCell {
      cursor: pointer;
      white-space: pre-line;
    }
    .pCell:hover {
      background: rgba(255,255,255,0.04);
    }
    .pEmpty {
      opacity: 0.45;
    }
    .previewBreak td {
      cursor: pointer;
    }
    .pBreak {
      text-align: center;
      opacity: 0.7;
      font-style: italic;
    }

`;
let et = it;
Y([
  nt()
], et.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Jt);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", et);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit Wochenblättern (Offset Helper auto) + Stundenplan24 Notes-Layout + Zeiten",
  preview: !0
});
export {
  Jt as StundenplanCard,
  et as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
