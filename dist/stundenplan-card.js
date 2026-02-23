const dt = globalThis, Ct = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = /* @__PURE__ */ Symbol(), Wt = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ct && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Wt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Wt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ge = (e) => new Gt(typeof e == "string" ? e : e + "", void 0, Tt), Qt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Gt(i, e, Tt);
}, pe = (e, t) => {
  if (Ct) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), r = dt.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, e.appendChild(s);
  }
}, Ut = Ct ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return ge(i);
})(e) : e, { is: _e, defineProperty: fe, getOwnPropertyDescriptor: me, getOwnPropertyNames: ye, getOwnPropertySymbols: be, getPrototypeOf: we } = Object, P = globalThis, Ht = P.trustedTypes, ve = Ht ? Ht.emptyScript : "", $e = P.reactiveElementPolyfillSupport, G = (e, t) => e, vt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ve : null;
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
} }, Dt = (e, t) => !_e(e, t), Bt = { attribute: !0, type: String, converter: vt, reflect: !1, useDefault: !1, hasChanged: Dt };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let J = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Bt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && fe(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = me(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = we(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const t = this.properties, i = [...ye(t), ...be(t)];
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
      for (const s of i) t.unshift(Ut(s));
    } else e !== void 0 && t.push(Ut(e));
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
    return pe(e, this.constructor.elementStyles), e;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : vt).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : vt;
      this._$Em = s;
      const o = n.fromAttribute(t, r.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (r = this[e]), i ?? (i = n.getPropertyOptions(e)), !((i.hasChanged ?? Dt)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[G("elementProperties")] = /* @__PURE__ */ new Map(), J[G("finalized")] = /* @__PURE__ */ new Map(), $e?.({ ReactiveElement: J }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.2");
const Q = globalThis, zt = (e) => e, $t = Q.trustedTypes, Lt = $t ? $t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Xt = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + N, xe = `<${te}>`, z = document, et = () => z.createComment(""), it = (e) => e === null || typeof e != "object" && typeof e != "function", jt = Array.isArray, Se = (e) => jt(e) || typeof e?.[Symbol.iterator] == "function", At = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Jt = />/g, H = RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), It = /'/g, Vt = /"/g, ee = /^(?:script|style|textarea|title)$/i, ke = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = ke(1), V = /* @__PURE__ */ Symbol.for("lit-noChange"), w = /* @__PURE__ */ Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), B = z.createTreeWalker(z, 129);
function ie(e, t) {
  if (!jt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lt !== void 0 ? Lt.createHTML(t) : t;
}
const Ae = (e, t) => {
  const i = e.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Z;
  for (let l = 0; l < i; l++) {
    const a = e[l];
    let u, d, g = -1, c = 0;
    for (; c < a.length && (o.lastIndex = c, d = o.exec(a), d !== null); ) c = o.lastIndex, o === Z ? d[1] === "!--" ? o = Ft : d[1] !== void 0 ? o = Jt : d[2] !== void 0 ? (ee.test(d[2]) && (r = RegExp("</" + d[2], "g")), o = H) : d[3] !== void 0 && (o = H) : o === H ? d[0] === ">" ? (o = r ?? Z, g = -1) : d[1] === void 0 ? g = -2 : (g = o.lastIndex - d[2].length, u = d[1], o = d[3] === void 0 ? H : d[3] === '"' ? Vt : It) : o === Vt || o === It ? o = H : o === Ft || o === Jt ? o = Z : (o = H, r = void 0);
    const p = o === H && e[l + 1].startsWith("/>") ? " " : "";
    n += o === Z ? a + xe : g >= 0 ? (s.push(u), a.slice(0, g) + Xt + a.slice(g) + N + p) : a + N + (g === -2 ? l : p);
  }
  return [ie(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class st {
  constructor({ strings: t, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [u, d] = Ae(t, i);
    if (this.el = st.createElement(u, s), B.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = B.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Xt)) {
          const c = d[o++], p = r.getAttribute(g).split(N), m = /([.?@])?(.*)/.exec(c);
          a.push({ type: 1, index: n, name: m[2], strings: p, ctor: m[1] === "." ? Me : m[1] === "?" ? Ce : m[1] === "@" ? Te : xt }), r.removeAttribute(g);
        } else g.startsWith(N) && (a.push({ type: 6, index: n }), r.removeAttribute(g));
        if (ee.test(r.tagName)) {
          const g = r.textContent.split(N), c = g.length - 1;
          if (c > 0) {
            r.textContent = $t ? $t.emptyScript : "";
            for (let p = 0; p < c; p++) r.append(g[p], et()), B.nextNode(), a.push({ type: 2, index: ++n });
            r.append(g[c], et());
          }
        }
      } else if (r.nodeType === 8) if (r.data === te) a.push({ type: 2, index: n });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(N, g + 1)) !== -1; ) a.push({ type: 7, index: n }), g += N.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = z.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Y(e, t, i = e, s) {
  if (t === V) return t;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = it(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = r : i._$Cl = r), r !== void 0 && (t = Y(e, r._$AS(e, t.values), r, s)), t;
}
class Ee {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (t?.creationScope ?? z).importNode(i, !0);
    B.currentNode = r;
    let n = B.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new rt(n, n.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (u = new De(n, this, t)), this._$AV.push(u), a = s[++l];
      }
      o !== a?.index && (n = B.nextNode(), o++);
    }
    return B.currentNode = z, r;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class rt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, r) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = Y(this, t, i), it(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Se(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && it(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = st.createElement(ie(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Ee(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Yt.get(t.strings);
    return i === void 0 && Yt.set(t.strings, i = new st(t)), i;
  }
  k(t) {
    jt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of t) r === i.length ? i.push(s = new rt(this.O(et()), this.O(et()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = zt(t).nextSibling;
      zt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class xt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, r, n) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }
  _$AI(t, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = Y(this, t, i, 0), o = !it(t) || t !== this._$AH && t !== V, o && (this._$AH = t);
    else {
      const l = t;
      let a, u;
      for (t = n[0], a = 0; a < n.length - 1; a++) u = Y(this, l[s + a], i, a), u === V && (u = this._$AH[a]), o || (o = !it(u) || u !== this._$AH[a]), u === w ? t = w : t !== w && (t += (u ?? "") + n[a + 1]), this._$AH[a] = u;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Me extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Ce extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class Te extends xt {
  constructor(t, i, s, r, n) {
    super(t, i, s, r, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Y(this, t, i, 0) ?? w) === V) return;
    const s = this._$AH, r = t === w && s !== w || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== w && (s === w || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class De {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const je = Q.litHtmlPolyfillSupport;
je?.(st, rt), (Q.litHtmlVersions ?? (Q.litHtmlVersions = [])).push("3.3.2");
const Re = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new rt(t.insertBefore(et(), n), n, void 0, i ?? {});
  }
  return r._$AI(e), r;
}, X = globalThis;
class I extends J {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Re(i, this.renderRoot, this.renderOptions);
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
I._$litElement$ = !0, I.finalized = !0, X.litElementHydrateSupport?.({ LitElement: I });
const Ne = X.litElementPolyfillSupport;
Ne?.({ LitElement: I });
(X.litElementVersions ?? (X.litElementVersions = [])).push("4.2.2");
const Pe = { attribute: !0, type: String, converter: vt, reflect: !1, hasChanged: Dt }, Oe = (e = Pe, t, i) => {
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
function se(e) {
  return (t, i) => typeof i == "object" ? Oe(e, t, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, i);
}
function O(e) {
  return se({ ...e, state: !0, attribute: !1 });
}
var We = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, re = (e) => {
  throw TypeError(e);
}, E = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ue(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && We(t, i, r), r;
}, ne = (e, t, i) => t.has(e) || re("Cannot " + i), T = (e, t, i) => (ne(e, t, "read from private field"), i ? i.call(e) : t.get(e)), D = (e, t, i) => t.has(e) ? re("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), j = (e, t, i, s) => (ne(e, t, "write to private field"), t.set(e, i), i), gt, pt, _t, ft, mt, yt, bt, wt;
function tt(e) {
  return !!e && e.break === !0;
}
function Rt(e) {
  return Math.min(1, Math.max(0, e));
}
function oe(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return [i, s, r].some((n) => Number.isNaN(n)) ? null : { r: i, g: s, b: r };
}
function He(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Rt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function Be(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = oe(t);
  if (!i) return t;
  const s = typeof e.bg_alpha == "number" ? Rt(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
}
function ze(e, t) {
  const i = [], s = Be(e);
  return s && i.push(`background:${s}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function Kt(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const s = oe(i);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${Rt(t)})` : i;
  }
  return i;
}
function ht(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function Et(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Le(e) {
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
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const s = t.getUTCFullYear(), r = new Date(Date.UTC(s, 0, 1)), n = r.getUTCDay() === 0 ? 7 : r.getUTCDay(), o = new Date(r);
  o.setUTCDate(r.getUTCDate() + (4 - n));
  const l = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(l / (10080 * 60 * 1e3)), isoYear: s };
}
function qt(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function ut(e) {
  const t = (e ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "—" || /^(—|\-|–|\s)+$/.test(t));
}
function Fe(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), s = i.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const r = i.match(/^stundenplan_woche_(.+)$/i);
  return r?.[1] ? `number.${r[1]}_woche_offset` : "";
}
function Je(e) {
  const t = Et(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var q;
const M = (q = class extends I {
  constructor() {
    super(...arguments), D(this, gt), D(this, pt), D(this, _t, []), D(this, ft, !1), D(this, mt, ""), D(this, yt, null), D(this, bt, "idle"), D(this, wt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return T(this, gt);
  }
  set hass(e) {
    j(this, gt, e);
    try {
      const t = this.config;
      if ((t?.source_type ?? "manual").toString() === "entity") {
        try {
          const a = (t?.view_mode ?? "week").toString(), u = Number(t?.days_ahead), d = Number.isFinite(u) ? Math.max(0, Math.min(6, Math.floor(u))) : 0;
          if (a === "rolling" && d === 0) {
            const g = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (g && e?.states?.[g]) {
              const c = Number(e.states[g].state);
              Number.isFinite(c) && c !== 0 && (e.callService("number", "set_value", { entity_id: g, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const p = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim();
                  p && this.hass?.callService("homeassistant", "update_entity", { entity_id: p });
                } catch {
                }
              }, 400));
            }
          }
        } catch {
        }
        const s = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim(), r = e, o = (s ? r?.states?.[s] : void 0)?.attributes ?? {}, l = o?.no_plan === !0 || Array.isArray(o?.rows_table_json) && o.rows_table_json.length === 0 || Array.isArray(o?.rows_json) && o.rows_json.length === 0;
        if (s && l) {
          let a = ((t?.week_offset_entity ?? "") + "").toString().trim();
          a || (a = s.replace(/^sensor\./, "number.") + "_offset");
          const u = a && r?.states && a in r.states, d = s + "|" + a;
          if (u && this.__autokickSig !== d) {
            this.__autokickSig = d;
            const g = r.states[a]?.state, c = Number(g), p = Number.isFinite(c) ? c : 0;
            r.callService("number", "set_value", { entity_id: a, value: p }).catch?.(() => {
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
    return T(this, pt);
  }
  set config(e) {
    j(this, pt, e);
  }
  get _rowsCache() {
    return T(this, _t);
  }
  set _rowsCache(e) {
    j(this, _t, e);
  }
  get _noData() {
    return T(this, ft);
  }
  set _noData(e) {
    j(this, ft, e);
  }
  get _noDataMsg() {
    return T(this, mt);
  }
  set _noDataMsg(e) {
    j(this, mt, e);
  }
  get _jsonRows() {
    return T(this, yt);
  }
  set _jsonRows(e) {
    j(this, yt, e);
  }
  get _jsonStatus() {
    return T(this, bt);
  }
  set _jsonStatus(e) {
    j(this, bt, e);
  }
  get _jsonError() {
    return T(this, wt);
  }
  set _jsonError(e) {
    j(this, wt, e);
  }
  getWatchedEntities(e) {
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      const r = (s ?? "").toString().trim();
      r && t.add(r);
    };
    return i(e.week_offset_entity), i(e.source_entity), i(e.source_entity_integration), i(e.source_entity_legacy), i(e.source_entity_a), i(e.source_entity_b), i(e.week_map_entity), Array.from(t);
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
    const t = q.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
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
    const t = q.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((_) => (_ ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(e.rows) ? e.rows : []).map((_) => {
      if (tt(_))
        return { break: !0, time: (_.time ?? "").toString(), label: (_.label ?? "Pause").toString() };
      const v = Array.isArray(_?.cells) ? _.cells : [], $ = Array.from({ length: i.length }, (k, W) => (v[W] ?? "").toString()), S = Array.isArray(_?.cell_styles) ? _.cell_styles : [], y = Array.from({ length: i.length }, (k, W) => He(S[W])), A = (_?.time ?? "").toString(), C = ht(A), nt = (_?.start ?? "").toString().trim(), x = (_?.end ?? "").toString().trim(), b = {
        time: A,
        start: nt || C.start || void 0,
        end: x || C.end || void 0,
        cells: $
      };
      return y.some((k) => !!k) && (b.cell_styles = y), b;
    }), r = ((e.view_mode ?? "week") + "").toString().trim(), n = r === "rolling" ? "rolling" : "week", o = Number(e.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, a = ((e.week_mode ?? t.week_mode) + "").toString().trim(), u = a === "kw_parity" || a === "week_map" || a === "off" ? a : "off", d = (() => {
      const _ = ((e.source_type ?? "") + "").toString().trim();
      if (_ === "manual" || _ === "entity" || _ === "json" || _ === "sensor") return _;
      const v = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (v) {
        const $ = ((e.source_attribute ?? "") + "").toString().trim(), S = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(v) && ($ === "" || $ === "rows_table") && (S === "" || S === "time")) && ($ || S) ? "legacy" : "entity";
      }
      return "manual";
    })(), g = (e.source_entity ?? t.source_entity).toString().trim(), c = (e.source_entity_integration ?? "").toString().trim(), p = (e.source_entity_legacy ?? "").toString().trim(), m = d === "sensor" ? p || g : d === "entity" && c || g, f = (e.week_offset_entity ?? "").toString().trim() || Fe(m);
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
      source_entity: m,
      source_entity_integration: c || "",
      source_entity_legacy: p || "",
      source_attribute: d === "entity" ? "rows_table" : ((e.source_attribute ?? "") + "").toString().trim() || "plan",
      source_time_key: d === "entity" ? "time" : ((e.source_time_key ?? "") + "").toString().trim() || "Stunde",
      source_type: d,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: f,
      week_offset_attribute: (e.week_offset_attribute ?? "").toString(),
      week_mode: u,
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
  getTodayIndex(e, t) {
    const i = /* @__PURE__ */ new Date(), s = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(t) && t.length) {
      const a = t.map((u) => {
        if (u instanceof Date && !Number.isNaN(u.getTime()))
          return `${u.getFullYear()}${String(u.getMonth() + 1).padStart(2, "0")}${String(u.getDate()).padStart(2, "0")}`;
        const d = (u ?? "").toString().trim(), g = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return g ? `${g[1]}${g[2]}${g[3]}` : d;
      }).indexOf(s);
      return a >= 0 ? a : -1;
    }
    const r = i.getDay(), n = new Set(Le(r).map(Et));
    if (!n.size) return -1;
    const o = (e ?? []).map((l) => Et(l));
    for (let l = 0; l < o.length; l++) if (n.has(o[l])) return l;
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
    const i = e.days ?? [], s = (e.source_time_key ?? "time").toString().trim(), r = "Stunde", n = "time", o = t.map((l) => {
      if (l?.break === !0)
        return {
          break: !0,
          time: (l?.time ?? l?.[s] ?? l?.[r] ?? l?.[n] ?? "").toString(),
          label: (l?.label ?? "Pause").toString()
        };
      const a = (l?.time ?? l?.[s] ?? l?.[r] ?? l?.[n] ?? "").toString(), u = ht(a), d = Array.from({ length: i.length }, (p, m) => {
        const f = (i[m] ?? "").toString();
        return (l?.[f] ?? "").toString();
      }), g = (l?.start ?? "").toString().trim() || u.start, c = (l?.end ?? "").toString().trim() || u.end;
      return { time: a, start: g || void 0, end: c || void 0, cells: d };
    });
    return o.length ? o : null;
  }
  getRowsFromEntity(e, t, i) {
    let s = this.readEntityJson(t, i);
    if (s == null && i && (i + "").toString().trim() && (i + "").toString().trim() !== "plan" && (s = this.readEntityJson(t, "plan")), s == null && (s = this.readEntityJson(t, "rows_ha")), s == null && (s = this.readEntityJson(t, "rows")), s == null && (s = this.readEntityJson(t, "rows_table")), s == null && (s = this.readEntityJson(t, "rows_json")), s && typeof s == "object" && !Array.isArray(s)) {
      const r = s.plan, n = s.rows;
      Array.isArray(r) ? s = r : Array.isArray(n) && (s = n);
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
    const { isoWeek: t } = Zt(/* @__PURE__ */ new Date()), i = t % 2 === 0, s = !!e.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(t, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: n } = Zt(/* @__PURE__ */ new Date()), o = String(r), l = String(n);
    if (s?.[l] && typeof s[l] == "object") {
      const u = qt(s[l][o]);
      if (u) return u;
    }
    return qt(s?.[o]) || null;
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
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, s = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
    if (!Array.isArray(s) || s.length < 3) return null;
    const r = [];
    for (const n of s) {
      const o = (n ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!o) continue;
      const l = Number(o[1]), a = Number(o[2]), u = Number(o[3]), d = new Date(l, a - 1, u, 12, 0, 0, 0);
      Number.isNaN(d.getTime()) || r.push(d);
    }
    return r.length ? r : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, s = i?.meta_ha ?? i?.meta ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json) : null) ?? null;
    if (!s) return null;
    const r = (e.days?.length ?? 0) || 5, n = s?.updated_days;
    if (Array.isArray(n) && n.length) {
      const l = (n[0] ?? "").toString().trim();
      return Array.from({ length: r }, (u, d) => (n[d] ?? l ?? "").toString().trim());
    }
    const o = (s?.updated_raw ?? s?.updated ?? "").toString().trim();
    return o ? Array.from({ length: r }, () => o) : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const r = this.getActiveWeek(e), n = (e.source_entity_a ?? "").trim(), o = (e.source_entity_b ?? "").trim(), l = (e.source_attribute_a ?? "").trim(), a = (e.source_attribute_b ?? "").trim();
      if (r === "A" && n)
        return this.getRowsFromEntity(e, n, l) ?? [];
      if (r === "B" && o)
        return this.getRowsFromEntity(e, o, a) ?? [];
      const u = i;
      return u ? this.getRowsFromEntity(e, u, (e.source_attribute ?? "").toString().trim()) ?? [] : [];
    }
    const s = i;
    return s ? this.getRowsFromEntity(e, s, (e.source_attribute ?? "").toString().trim()) ?? [] : [];
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
    const r = i[0];
    if (/^(—|\-|–|---)$/.test(r)) return null;
    const n = (c) => {
      const p = (c ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(p) || /\bfällt\s+aus\b/i.test(p) || /\bverlegt\b/i.test(p) || /\bentfällt\b/i.test(p) || /\bvertretung\b/i.test(p) || /\bstatt\b/i.test(p) || /\bgehalten\b/i.test(p) || /\bAufgaben\b/i.test(p) || /^für\b/i.test(p);
    }, o = (c) => {
      const p = (c ?? "").toString().trim();
      return /^\d{1,4}$/.test(p) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(p) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(p);
    }, l = i.slice(1);
    let a = -1;
    for (let c = 0; c < l.length; c++)
      if (!n(l[c]) && o(l[c])) {
        a = c;
        break;
      }
    if (a < 0) {
      for (let c = l.length - 1; c >= 0; c--)
        if (o(l[c])) {
          a = c;
          break;
        }
    }
    if (a < 0) return null;
    const u = l[a];
    let d;
    for (let c = a + 1; c < l.length; c++) {
      const p = l[c];
      if (!n(p) && !o(p)) {
        d = p;
        break;
      }
    }
    if (!d) {
      const c = l.filter((p) => !n(p) && !o(p));
      d = c.length ? c[c.length - 1] : void 0;
    }
    const g = i.slice(1).filter((c) => n(c));
    return { fach: r, raum: u, lehrer: d, notes: g.length ? g : void 0 };
  }
  renderCell(e, t) {
    const i = (e ?? "").toString(), s = this.filterCellText(i, t);
    if (ut(s)) return h``;
    const r = (() => {
      let m = s.replace(/\r/g, "").split(`
`).map((_) => (_ ?? "").toString().trim());
      for (; m.length && /^(—|–|-)$/.test(m[0]); ) m.shift();
      const f = [];
      for (const _ of m) {
        const v = _.length === 0;
        if (!/^(—|–|-)$/.test(_)) {
          if (v) {
            if (f.length === 0 || f[f.length - 1] === "") continue;
            f.push("");
            continue;
          }
          f.push(_);
        }
      }
      for (; f.length && f[f.length - 1] === ""; ) f.pop();
      return f.join(`
`);
    })();
    if (ut(r)) return h``;
    const n = r.split(/\n\s*\n/).map((m) => m.trim()).filter(Boolean), o = this.parseCellTriplet(r), l = (m) => {
      if (m.startsWith("🔴")) return "note noteRed";
      if (m.startsWith("🟠")) return "note noteOrange";
      if (m.startsWith("🟡")) return "note noteYellow";
      const f = m;
      return /\bfällt\s+aus\b/i.test(f) || /\bverlegt\b/i.test(f) || /\bstatt\b/i.test(f) || /\bgehalten\b/i.test(f) || /\bentfällt\b/i.test(f) ? "note noteRed" : "note";
    }, a = (m) => (m ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim();
    if (n.length === 1 && o?.fach && o?.raum && o?.lehrer)
      return h`
        <div class="cellWrap">
          <div class="fach">${o.fach}</div>
          <div class="lehrer">${o.lehrer}</div>
          <div class="raum">${o.raum}</div>

          ${o.notes?.length ? h`
                <div class="notes">
                  ${o.notes.map((m) => {
        const f = l(m), _ = a(m) || m;
        return h`<div class=${f}><span class="txt">${_}</span></div>`;
      })}
                </div>
              ` : h``}
        </div>
      `;
    const u = (m) => {
      const f = (m ?? "").toString().trim();
      if (!f) return h``;
      const _ = this.parseCellTriplet(f);
      if (_?.fach && _?.raum && _?.lehrer)
        return h`
          <div class="cellWrap">
            <div class="fach">${_.fach}</div>
            <div class="lehrer">${_.lehrer}</div>
            <div class="raum">${_.raum}</div>

            ${_.notes?.length ? h`
                  <div class="notes">
                    ${_.notes.map((y) => {
          const A = l(y), C = a(y) || y;
          return h`<div class=${A}><span class="txt">${C}</span></div>`;
        })}
                  </div>
                ` : h``}
          </div>
        `;
      const v = f.split(`
`).map((y) => y.trim()).filter(Boolean), $ = (v[0] ?? "").trim(), S = v.slice(1);
      return $ && S.length ? h`
          <div class="cellWrap">
            <div class="fach">${$}</div>
            <div class="notes">
              ${S.map((y) => {
        const A = l(y), C = a(y) || y;
        return h`<div class=${A}><span class="txt">${C}</span></div>`;
      })}
            </div>
          </div>
        ` : h`<span class="cellText">${f}</span>`;
    };
    if (n.length > 1)
      return h`<div class="cellMulti">${n.map((m) => u(m))}</div>`;
    const d = (r ?? "").split(`
`).map((m) => m.trim()).filter(Boolean), g = /^\d{1,4}$/, c = /^[A-ZÄÖÜ]{2,6}$/, p = (m) => {
      const f = (m ?? "").trim();
      if (!f || g.test(f) || c.test(f)) return !1;
      const _ = f.toLowerCase();
      return _.startsWith("statt ") || _.includes("fällt aus") || _.includes("verlegt") || _.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(f) ? !1 : /[a-z0-9äöü]/i.test(f);
    };
    if (d.length >= 6 && d.length % 3 === 0) {
      const m = [];
      for (let f = 0; f < d.length; f += 3) {
        const _ = d[f] ?? "", v = d[f + 1] ?? "", $ = d[f + 2] ?? "";
        if (!p(_) || !g.test(v) || !c.test($)) {
          m.length = 0;
          break;
        }
        m.push([_, v, $].join(`
`));
      }
      if (m.length >= 2)
        return h`<div class="cellMulti">${m.map((f) => u(f))}</div>`;
    }
    return u(r);
  }
  render() {
    if (!this.config) return h``;
    const e = this.config, t = this._rowsCache, i = this.getHeaderDaysFromEntity(e), s = this.getTodayIndex(e.days ?? [], i), r = (e.view_mode ?? "week").toString(), n = Number(e.days_ahead), o = Number.isFinite(n) ? Math.max(0, Math.min(6, Math.floor(n))) : 0, l = r === "rolling" && s >= 0 ? Array.from({ length: Math.min((e.days?.length ?? 0) - s, o + 1) }, (x, b) => s + b) : Array.from({ length: e.days?.length ?? 0 }, (x, b) => b), a = l.map((x) => e.days[x]), u = "1px solid var(--divider-color)", d = Kt(e.highlight_today_color ?? "", 0.12), g = Kt(e.highlight_current_color ?? "", 0.18), c = (e.highlight_current_text_color ?? "").toString().trim(), p = (e.highlight_current_time_text_color ?? "").toString().trim(), m = e.week_mode !== "off", f = m ? this.getActiveWeek(e) : null, _ = this.getWeekOffsetValue(e), v = (e.source_type ?? "manual").toString(), $ = (e.week_offset_entity ?? "").trim().length > 0, S = $ && (v === "entity" || v === "sensor" && (e.week_mode ?? "off") !== "off"), y = i && i.length >= (e.days?.length ?? 0) ? i : null, A = this.getHeaderUpdatedFromEntity(e), C = this.getBaseDate(e), nt = this.mondayOfWeek(C);
    return h`
      <ha-card>
        <div class="headerRow">
          <div class="title">${e.title ?? ""}</div>

          <div class="headRight">
            ${m ? h`<div class="weekBadgeInline">Woche <b>${f}</b></div>` : h``}

            ${S ? h`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${() => _ != null && this.setWeekOffset(e, _ - 1)}>&lt;</button>
                    <div class="offsetVal">${_ ?? "?"}</div>
                    <button class="btnMini" @click=${() => _ != null && this.setWeekOffset(e, _ + 1)}>&gt;</button>
                  </div>
                ` : h``}
          </div>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${a.map((x, b) => {
      const k = l[b], W = e.highlight_today && k === s ? "today" : "";
      let U = "";
      if (y)
        U = this.fmtDDMMYYYY(y[k]);
      else {
        const ot = Je(x);
        if (ot) {
          const at = new Date(nt);
          at.setDate(nt.getDate() + (ot - 1)), U = this.fmtDDMMYYYY(at);
        }
      }
      return h`
                    <th class=${W} style=${`--sp-hl:${d};`}>
                      <div>${x}</div>
                      <div class="thDate">${U}</div>
                      ${A?.[k] ? h`<div class="thUpdated">(aktualisiert: ${A[k]})</div>` : h``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? h`<tr class="nodata"><td class="nodataCell" colspan=${a.length + 1}>${this._noDataMsg}</td></tr>` : t.map((x) => {
      if (tt(x)) {
        const K = ht(x.time), lt = !!K.start && !!K.end && this.isNowBetween(K.start, K.end), L = !!e.highlight_breaks && lt;
        let F = `--sp-hl:${g};`, ct = "";
        return L && (F += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", ct += `--sp-hl:${g}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), L && e.highlight_current_time_text && p && (F += `color:${p};`), h`
                    <tr class="break">
                      <td class="time" style=${F}>${x.time}</td>
                      <td colspan=${a.length} style=${ct}>${x.label ?? ""}</td>
                    </tr>
                  `;
      }
      const b = x, k = b.cells ?? [], W = b.cell_styles ?? [], U = !!b.start && !!b.end && this.isNowBetween(b.start, b.end), ot = s >= 0 ? k[s] ?? "" : "", at = s >= 0 ? this.filterCellText(ot, e) : "", ce = s >= 0 ? ut(at) : !1, St = !(e.free_only_column_highlight && ce), Nt = ht(b.time), he = !!(Nt.start && Nt.end), Pt = !he && b.start && b.end ? `${b.start}–${b.end}` : "";
      let kt = `--sp-hl:${g};`;
      return St && e.highlight_current && U && (kt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), St && U && e.highlight_current_time_text && p && (kt += `color:${p};`), h`
                  <tr>
                    <td class="time" style=${kt}>
                      <div class="timeWrap">
                        <div class="timeSt">${b.time}</div>
                        ${Pt ? h`<div class="timeHm">${Pt}</div>` : h``}
                      </div>
                    </td>

                    ${a.map((K, lt) => {
        const L = l[lt], F = this.filterCellText(k[L] ?? "", e), ct = W[L] ?? null, ue = e.highlight_today && L === s ? "today" : "";
        let Ot = `--sp-hl:${d};` + ze(ct, u);
        const de = !ut(F);
        return St && de && U && e.highlight_current_text && c && s >= 0 && lt === s && (Ot += `color:${c};`), h`<td class=${ue} style=${Ot}>${this.renderCell(F, e)}</td>`;
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
}, q.styles = Qt`
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
gt = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakMap();
_t = /* @__PURE__ */ new WeakMap();
ft = /* @__PURE__ */ new WeakMap();
mt = /* @__PURE__ */ new WeakMap();
yt = /* @__PURE__ */ new WeakMap();
bt = /* @__PURE__ */ new WeakMap();
wt = /* @__PURE__ */ new WeakMap();
E([
  se({ attribute: !1 })
], M.prototype, "hass", 1);
E([
  O()
], M.prototype, "config", 1);
E([
  O()
], M.prototype, "_rowsCache", 1);
E([
  O()
], M.prototype, "_noData", 1);
E([
  O()
], M.prototype, "_noDataMsg", 1);
E([
  O()
], M.prototype, "_jsonRows", 1);
E([
  O()
], M.prototype, "_jsonStatus", 1);
E([
  O()
], M.prototype, "_jsonError", 1);
let ae = M;
function Ie(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function R(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function Ve(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ye(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Mt = class extends I {
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
    this._config = t, Ie(this, "config-changed", { config: t });
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
      const r = (i ?? "").toString().trim();
      let n = "";
      r && (n = r.replace(/^sensor\./, "number.") + "_offset"), this.emit({
        ...this._config,
        source_type: "entity",
        source_entity: i,
        source_entity_integration: i,
        source_attribute: "rows_table",
        source_time_key: "time",
        week_offset_entity: n
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
    const r = !!this._open[i];
    return h`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(i)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${r ? "▾" : "▸"}</div>
        </div>
        ${r ? h`<div class="sectionBody">${s}</div>` : h``}
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
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = { time: `${t + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    s.splice(t + 1, 0, r), this.emit({ ...this._config, rows: s });
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
    const s = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = s[t];
    s[t] = { ...r, ...i }, this.emit({ ...this._config, rows: s });
  }
  updateManualCell(t, i, s) {
    if (!this._config) return;
    const r = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = r[t];
    if (!n || tt(n)) return;
    const o = n, l = Array.isArray(o.cells) ? o.cells.slice() : [];
    l[i] = s, r[t] = { ...o, cells: l }, this.emit({ ...this._config, rows: r });
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
    const s = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], r = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = r[t];
    if (n) {
      if (i) {
        const o = (n.time ?? "").toString(), l = (n.label ?? "Pause").toString();
        r[t] = { break: !0, time: o, label: l };
      } else {
        const o = (n.time ?? "").toString();
        r[t] = { time: o, start: "", end: "", cells: Array.from({ length: s.length }, () => "") };
      }
      this.emit({ ...this._config, rows: r });
    }
  }
  updateManualCellStyle(t, i, s) {
    if (!this._config) return;
    const r = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], n = r[t];
    if (!n || tt(n)) return;
    const o = n, l = Array.isArray(o.cell_styles) ? o.cell_styles.slice() : [], a = l[i] ?? {};
    l[i] = { ...a, ...s }, r[t] = { ...o, cell_styles: l }, this.emit({ ...this._config, rows: r });
  }
  renderManualRows() {
    if (!this._config) return h``;
    const t = this._config, i = t.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(t.rows) ? t.rows : [];
    return h`
      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan (Zeilen)</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Cell-Styles</div>
            <ha-switch
              .checked=${!!this._showCellStyles}
              @change=${(r) => {
      this._showCellStyles = !!r?.target?.checked, this.requestUpdate();
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

      ${s.map((r, n) => {
      const o = tt(r), l = o ? `Pause · ${(r.time ?? "").toString()}` : `Stunde · ${(r.time ?? "").toString()}`, a = r, u = (a.start ?? "").toString(), d = (a.end ?? "").toString(), g = (r.label ?? "Pause").toString();
      return h`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[n] ?? !1}
            @toggle=${(c) => {
        try {
          this._rowOpen[n] = !!c?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${l || `Zeile ${n + 1}`}</div>
                <div class="rowHeadMeta">${o ? g : `${u || "Start?"} – ${d || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-textfield
                  label="Zeit / Stunde"
                  .value=${(r.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(c) => this.updateManualRow(n, { time: c?.target?.value ?? "" })}
                ></ha-textfield>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${o} @change=${(c) => this.toggleManualBreak(n, !!c?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${o ? h`
                    <ha-textfield
                      label="Pausentext"
                      .value=${g}
                      placeholder="z. B. Große Pause"
                      @input=${(c) => this.updateManualRow(n, { label: c?.target?.value ?? "" })}
                    ></ha-textfield>
                  ` : h`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-textfield
                        label="Start (HH:MM)"
                        .value=${u}
                        @input=${(c) => this.updateManualRow(n, { start: c?.target?.value ?? "" })}
                      ></ha-textfield>
                      <ha-textfield
                        label="Ende (HH:MM)"
                        .value=${d}
                        @input=${(c) => this.updateManualRow(n, { end: c?.target?.value ?? "" })}
                      ></ha-textfield>
                    </div>

                    <div class="cellsGrid" style=${`grid-template-columns: repeat(${i.length}, minmax(220px, 1fr));`}>
                      ${i.map((c, p) => {
        const m = (a.cells?.[p] ?? "").toString(), f = (Array.isArray(a.cell_styles) ? a.cell_styles?.[p] : void 0) ?? {}, _ = (f?.bg ?? "#000000").toString(), v = typeof f?.bg_alpha == "number" && !Number.isNaN(f.bg_alpha) ? f.bg_alpha : 0.18, $ = Math.round(v * 100), S = (f?.color ?? "#ffffff").toString();
        return h`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${c}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${m}
                              @input=${(y) => this.updateManualCell(n, p, y?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${_} @input=${(y) => this.updateManualCellStyle(n, p, { bg: y?.target?.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String($)}
                                    @input=${(y) => this.updateManualCellStyle(n, p, { bg_alpha: Number(y?.target?.value ?? 0) / 100 })}
                                  />
                                  <div class="pct">${$}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${S} @input=${(y) => this.updateManualCellStyle(n, p, { color: y?.target?.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowFoot">
                <div class="rowActions">
                  <button type="button" class="spBtn" @click=${() => this.insertManualRowBelow(n)}>+ Stunde darunter</button>
                  <button type="button" class="spBtn" @click=${() => this.insertManualBreakBelow(n)}>+ Pause darunter</button>
                </div>
                <button type="button" class="spBtn spBtnDanger" @click=${() => this.removeManualRow(n)}>Löschen</button>
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
            <div class="grid2">
              <ha-textfield label="Titel" .value=${t.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-textfield>

              <ha-textfield
                label="Tage (CSV)"
                .value=${Ye(t.days ?? [])}
                @input=${(i) => this.setValue("days", Ve(i.target.value))}
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

              ${(t.view_mode ?? "week") === "rolling" ? h`
                <ha-textfield
                  label="Tage im Voraus (0=heute)"
                  type="number"
                  .value=${String(t.days_ahead ?? 0)}
                  @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("days_ahead", Number.isFinite(s) ? Math.max(0, Math.min(6, Math.floor(s))) : 0);
      }}
                ></ha-textfield>
              ` : h``}
            </div>

            <div class="hint">„Ab heute“ zeigt nur heute + X Folgetage (innerhalb der konfigurierten Wochenspalten).</div>
          `
    )}

        ${this.renderSection(
      "Highlights",
      "highlights",
      h`
            <div class="grid3">
              <ha-switch .checked=${R(t.highlight_today, !0)} @change=${(i) => this.onToggle(i, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${R(t.highlight_current, !0)} @change=${(i) => this.onToggle(i, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${R(t.highlight_breaks, !1)} @change=${(i) => this.onToggle(i, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${R(t.free_only_column_highlight, !0)}
                @change=${(i) => this.onToggle(i, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${R(t.highlight_current_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${R(t.highlight_current_time_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-textfield label="Zeitfarbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_time_text_color")}></ha-textfield>
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      h`
            <div class="grid2">
              <ha-textfield label="Heute Overlay" .value=${t.highlight_today_color ?? ""} @input=${(i) => this.onText(i, "highlight_today_color")}></ha-textfield>
              <ha-textfield label="Aktuell Overlay" .value=${t.highlight_current_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_color")}></ha-textfield>
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
        const i = Object.keys(this.hass?.states ?? {}), s = i.filter((r) => /^sensor\./.test(r) && /_woche$/i.test(r));
        return i.length < 5 || s.length === 0 ? h`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : h``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const r = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !r || /_woche$/i.test(r);
      }}
                      .label=${"Stundenplan24 Sensor"}
                      @value-changed=${(i) => {
        try {
          const s = i.detail?.value ?? i.target?.value, r = typeof s == "string" ? s : s && typeof s == "object" ? s.entity_id : void 0;
          this.setSourceEntity(r);
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
        const r = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !r || /^sensor\./.test(r);
      }}
                      .label=${"Sensor (JSON)"}
                      @value-changed=${(i) => {
        try {
          const s = i.detail?.value ?? i.target?.value, r = typeof s == "string" ? s : s && typeof s == "object" ? s.entity_id : void 0;
          this.setSourceEntity(r);
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
        week_a_is_even_kw: R(t.week_a_is_even_kw, !0)
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
          typeof n == "boolean" && n !== R(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", n);
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
Mt.properties = {
  hass: {},
  _config: { state: !0 }
}, Mt.styles = Qt`
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
let le = Mt;
E([
  O()
], le.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", ae);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", le);
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
  ae as StundenplanCard,
  le as StundenplanCardEditor
};
