const St = globalThis, Jt = St.ShadowRoot && (St.ShadyCSS === void 0 || St.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qt = /* @__PURE__ */ Symbol(), pe = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== qt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Jt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const si = (e) => new De(typeof e == "string" ? e : e + "", void 0, qt), Te = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new De(i, e, qt);
}, ni = (e, t) => {
  if (Jt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = St.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, ge = Jt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return si(i);
})(e) : e, { is: ri, defineProperty: oi, getOwnPropertyDescriptor: ai, getOwnPropertyNames: li, getOwnPropertySymbols: ci, getPrototypeOf: hi } = Object, F = globalThis, _e = F.trustedTypes, di = _e ? _e.emptyScript : "", ui = F.reactiveElementPolyfillSupport, ht = (e, t) => e, Pt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? di : null;
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
} }, Zt = (e, t) => !ri(e, t), me = { attribute: !0, type: String, converter: Pt, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), F.litPropertyMetadata ?? (F.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Q = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = me) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && oi(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: n } = ai(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: s, set(r) {
      const o = s?.call(this);
      n?.call(this, r), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ht("elementProperties"))) return;
    const e = hi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ht("properties"))) {
      const t = this.properties, i = [...li(t), ...ci(t)];
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
      for (const s of i) t.unshift(ge(s));
    } else e !== void 0 && t.push(ge(e));
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
    return ni(e, this.constructor.elementStyles), e;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Pt).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Pt;
      this._$Em = s;
      const o = r.fromAttribute(t, n.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[e]), i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? Zt)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
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
        const { wrapped: r } = n, o = this[s];
        r !== !0 || this._$AL.has(s) || o === void 0 || this.C(s, void 0, n, o);
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
Q.elementStyles = [], Q.shadowRootOptions = { mode: "open" }, Q[ht("elementProperties")] = /* @__PURE__ */ new Map(), Q[ht("finalized")] = /* @__PURE__ */ new Map(), ui?.({ ReactiveElement: Q }), (F.reactiveElementVersions ?? (F.reactiveElementVersions = [])).push("2.1.2");
const dt = globalThis, fe = (e) => e, Nt = dt.trustedTypes, ye = Nt ? Nt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Re = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, Pe = "?" + B, pi = `<${Pe}>`, Y = document, pt = () => Y.createComment(""), gt = (e) => e === null || typeof e != "object" && typeof e != "function", Gt = Array.isArray, gi = (e) => Gt(e) || typeof e?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, be = />/g, L = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, $e = /"/g, Ne = /^(?:script|style|textarea|title)$/i, _i = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = _i(1), it = /* @__PURE__ */ Symbol.for("lit-noChange"), b = /* @__PURE__ */ Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), I = Y.createTreeWalker(Y, 129);
function je(e, t) {
  if (!Gt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ye !== void 0 ? ye.createHTML(t) : t;
}
const mi = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = lt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let h, p, d = -1, g = 0;
    for (; g < l.length && (o.lastIndex = g, p = o.exec(l), p !== null); ) g = o.lastIndex, o === lt ? p[1] === "!--" ? o = we : p[1] !== void 0 ? o = be : p[2] !== void 0 ? (Ne.test(p[2]) && (n = RegExp("</" + p[2], "g")), o = L) : p[3] !== void 0 && (o = L) : o === L ? p[0] === ">" ? (o = n ?? lt, d = -1) : p[1] === void 0 ? d = -2 : (d = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? L : p[3] === '"' ? $e : ve) : o === $e || o === ve ? o = L : o === we || o === be ? o = lt : (o = L, n = void 0);
    const _ = o === L && e[a + 1].startsWith("/>") ? " " : "";
    r += o === lt ? l + pi : d >= 0 ? (s.push(h), l.slice(0, d) + Re + l.slice(d) + B + _) : l + B + (d === -2 ? a : _);
  }
  return [je(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class _t {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, p] = mi(t, i);
    if (this.el = _t.createElement(h, s), I.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = I.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Re)) {
          const g = p[o++], _ = n.getAttribute(d).split(B), u = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: u[2], strings: _, ctor: u[1] === "." ? yi : u[1] === "?" ? wi : u[1] === "@" ? bi : jt }), n.removeAttribute(d);
        } else d.startsWith(B) && (l.push({ type: 6, index: r }), n.removeAttribute(d));
        if (Ne.test(n.tagName)) {
          const d = n.textContent.split(B), g = d.length - 1;
          if (g > 0) {
            n.textContent = Nt ? Nt.emptyScript : "";
            for (let _ = 0; _ < g; _++) n.append(d[_], pt()), I.nextNode(), l.push({ type: 2, index: ++r });
            n.append(d[g], pt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Pe) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(B, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += B.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = Y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function st(e, t, i = e, s) {
  if (t === it) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = gt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = st(e, n._$AS(e, t.values), n, s)), t;
}
class fi {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? Y).importNode(i, !0);
    I.currentNode = n;
    let r = I.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new mt(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new vi(r, this, t)), this._$AV.push(h), l = s[++a];
      }
      o !== l?.index && (r = I.nextNode(), o++);
    }
    return I.currentNode = Y, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class mt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = st(this, t, i), gt(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : gi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== b && gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = _t.createElement(je(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new fi(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = xe.get(t.strings);
    return i === void 0 && xe.set(t.strings, i = new _t(t)), i;
  }
  k(t) {
    Gt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new mt(this.O(pt()), this.O(pt()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = fe(t).nextSibling;
      fe(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class jt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = b;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = st(this, t, i, 0), o = !gt(t) || t !== this._$AH && t !== it, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = st(this, a[s + l], i, l), h === it && (h = this._$AH[l]), o || (o = !gt(h) || h !== this._$AH[l]), h === b ? t = b : t !== b && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class yi extends jt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
class wi extends jt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== b);
  }
}
class bi extends jt {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = st(this, t, i, 0) ?? b) === it) return;
    const s = this._$AH, n = t === b && s !== b || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== b && (s === b || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class vi {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    st(this, t);
  }
}
const $i = dt.litHtmlPolyfillSupport;
$i?.(_t, mt), (dt.litHtmlVersions ?? (dt.litHtmlVersions = [])).push("3.3.2");
const xi = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new mt(t.insertBefore(pt(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
}, ut = globalThis;
class tt extends Q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return it;
  }
}
tt._$litElement$ = !0, tt.finalized = !0, ut.litElementHydrateSupport?.({ LitElement: tt });
const Si = ut.litElementPolyfillSupport;
Si?.({ LitElement: tt });
(ut.litElementVersions ?? (ut.litElementVersions = [])).push("4.2.2");
const ki = { attribute: !0, type: String, converter: Pt, reflect: !1, hasChanged: Zt }, Ai = (e = ki, t, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ze(e) {
  return (t, i) => typeof i == "object" ? Ai(e, t, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
function U(e) {
  return ze({ ...e, state: !0, attribute: !1 });
}
var Mi = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, We = (e) => {
  throw TypeError(e);
}, R = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ei(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Mi(t, i, n), n;
}, Oe = (e, t, i) => t.has(e) || We("Cannot " + i), z = (e, t, i) => (Oe(e, t, "read from private field"), i ? i.call(e) : t.get(e)), W = (e, t, i) => t.has(e) ? We("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), O = (e, t, i, s) => (Oe(e, t, "write to private field"), t.set(e, i), i), kt, At, Mt, Et, Ct, Dt, Tt, Rt;
function C(e) {
  return !!e && e.break === !0;
}
function zt(e) {
  return Math.min(1, Math.max(0, e));
}
function Qt(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
  return [i, s, n].some((r) => Number.isNaN(r)) ? null : { r: i, g: s, b: n };
}
function Xt(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = zt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function Se(e, t) {
  return (Array.isArray(e) ? e : []).map((i) => {
    if (C(i))
      return { break: !0, time: (i.time ?? "").toString(), label: (i.label ?? "Pause").toString() };
    const s = Array.isArray(i?.cells) ? i.cells : [], n = Array.from({ length: t.length }, (_, u) => (s[u] ?? "").toString()), r = Array.isArray(i?.cell_styles) ? i.cell_styles : [], o = Array.from({ length: t.length }, (_, u) => Xt(r[u])), a = Array.isArray(i?.cell_times) ? Array.from({ length: t.length }, (_, u) => Fe(i.cell_times[u])) : [], l = (i?.time ?? "").toString(), h = et(l), p = (i?.start ?? "").toString().trim(), d = (i?.end ?? "").toString().trim(), g = {
      time: l,
      start: p || h.start || void 0,
      end: d || h.end || void 0,
      cells: n
    };
    return o.some((_) => !!_) && (g.cell_styles = o), a.some((_) => !!_) && (g.cell_times = a), g;
  });
}
function Be(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = Qt(t);
  if (!i) return t;
  const s = typeof e.bg_alpha == "number" ? zt(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
}
function ke(e, t = "#2196f3", i = 1) {
  const s = String(e ?? "").trim(), n = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (n) {
    const o = n[1].length === 3 ? [...n[1]].map((a) => a + a).join("") : n[1];
    return { hex: "#" + o.slice(0, 6), alpha: o.length === 8 ? parseInt(o.slice(6), 16) / 255 : i };
  }
  const r = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  return r ? {
    hex: "#" + r.slice(1, 4).map((o) => Math.min(255, Number(o)).toString(16).padStart(2, "0")).join(""),
    alpha: r[4] == null ? 1 : zt(Number(r[4]))
  } : { hex: t, alpha: i };
}
function Ci(e, t) {
  const i = [], s = Be(e);
  return s && i.push(`background:${s}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function Ae(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const s = Qt(i);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${zt(t)})` : i;
  }
  return i;
}
function et(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function Fe(e) {
  if (e == null) return null;
  if (typeof e == "string") {
    const r = e.trim(), o = et(r);
    return r ? { time: r, start: o.start, end: o.end } : null;
  }
  if (typeof e != "object") return null;
  const t = (e.time ?? "").toString().trim(), i = et(t), s = (e.start ?? "").toString().trim() || i.start, n = (e.end ?? "").toString().trim() || i.end;
  return t || s || n ? { time: t || (s && n ? `${s}-${n}` : ""), start: s || void 0, end: n || void 0 } : null;
}
function Vt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Di(e) {
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
function Me(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const s = t.getUTCFullYear(), n = new Date(Date.UTC(s, 0, 1)), r = n.getUTCDay() === 0 ? 7 : n.getUTCDay(), o = new Date(n);
  o.setUTCDate(n.getUTCDate() + (4 - r));
  const a = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(a / (10080 * 60 * 1e3)), isoYear: s };
}
function Ee(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function X(e) {
  const t = (e ?? "").toString().trim();
  return !t || t === "-" || t === "–" || t === "—";
}
function Ti(e, t, i = (s, n, r) => s?.cells?.[r] ?? "") {
  const s = Array.isArray(e) ? e : [], n = Array.isArray(t) ? t : [];
  let r = -1;
  return s.forEach((o, a) => {
    C(o) || n.some((l, h) => !X(i(o, a, l, h))) && (r = a);
  }), r >= 0 ? s.slice(0, r + 1) : [];
}
function Ri(e) {
  const t = (e ?? "").toString().replace(/\r/g, "").split(`
`).map((s) => s.trim()), i = [];
  for (const s of t)
    if (!/^(—|–|-)$/.test(s)) {
      if (!s) {
        i.length && i[i.length - 1] !== "" && i.push("");
        continue;
      }
      i.push(s.replace(/\s+/g, " "));
    }
  for (; i[i.length - 1] === ""; ) i.pop();
  return i.join(`
`);
}
function Pi(e) {
  const t = Xt(e);
  if (!t) return "";
  const i = {};
  return t.bg && (i.bg = t.bg, i.bg_alpha = typeof t.bg_alpha == "number" ? t.bg_alpha : 0.18), t.color && (i.color = t.color), t.border && (i.border = t.border), Object.keys(i).length ? JSON.stringify(i) : "";
}
function Ni(e, t, i) {
  const s = Array.isArray(e) ? e : [];
  if (t < 0 || t >= s.length || C(s[t])) return { covered: !1, span: 1 };
  const n = (a) => {
    if (a < 0 || a >= s.length || C(s[a])) return null;
    const l = i(s[a], a) ?? {}, h = Ri(l.text);
    return X(h) ? null : JSON.stringify([h, Pi(l.style)]);
  }, r = n(t);
  if (!r) return { covered: !1, span: 1 };
  if (n(t - 1) === r) return { covered: !0, span: 0 };
  let o = 1;
  for (; n(t + o) === r; ) o += 1;
  return { covered: !1, span: o };
}
function Ue(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), s = i.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const n = i.match(/^stundenplan_woche_(.+)$/i);
  return n?.[1] ? `number.${n[1]}_woche_offset` : "";
}
function Ce(e) {
  const t = Vt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var ct;
const P = (ct = class extends tt {
  constructor() {
    super(...arguments), W(this, kt), W(this, At), W(this, Mt, []), W(this, Et, !1), W(this, Ct, ""), W(this, Dt, null), W(this, Tt, "idle"), W(this, Rt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return z(this, kt);
  }
  set hass(e) {
    O(this, kt, e);
    try {
      const t = this.config;
      if ((t?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (t?.view_mode ?? "week").toString(), h = Number(t?.days_ahead), p = Number.isFinite(h) ? Math.max(0, Math.min(6, Math.floor(h))) : 0;
          if (l === "rolling" && p === 0) {
            const d = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (d && e?.states?.[d]) {
              const g = Number(e.states[d].state);
              Number.isFinite(g) && g !== 0 && (e.callService("number", "set_value", { entity_id: d, value: 0 }).catch?.(() => {
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
        const s = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim(), n = e, o = (s ? n?.states?.[s] : void 0)?.attributes ?? {}, a = o?.no_plan === !0 || Array.isArray(o?.rows_table_json) && o.rows_table_json.length === 0 || Array.isArray(o?.rows_json) && o.rows_json.length === 0;
        if (s && a) {
          let l = ((t?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = s.replace(/^sensor\./, "number.") + "_offset");
          const h = l && n?.states && l in n.states, p = s + "|" + l;
          if (h && this.__autokickSig !== p) {
            this.__autokickSig = p;
            const d = n.states[l]?.state, g = Number(d), _ = Number.isFinite(g) ? g : 0;
            n.callService("number", "set_value", { entity_id: l, value: _ }).catch?.(() => {
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
    return z(this, At);
  }
  set config(e) {
    O(this, At, e);
  }
  get _rowsCache() {
    return z(this, Mt);
  }
  set _rowsCache(e) {
    O(this, Mt, e);
  }
  get _noData() {
    return z(this, Et);
  }
  set _noData(e) {
    O(this, Et, e);
  }
  get _noDataMsg() {
    return z(this, Ct);
  }
  set _noDataMsg(e) {
    O(this, Ct, e);
  }
  get _jsonRows() {
    return z(this, Dt);
  }
  set _jsonRows(e) {
    O(this, Dt, e);
  }
  get _jsonStatus() {
    return z(this, Tt);
  }
  set _jsonStatus(e) {
    O(this, Tt, e);
  }
  get _jsonError() {
    return z(this, Rt);
  }
  set _jsonError(e) {
    O(this, Rt, e);
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
    const i = t.last_updated ?? "", s = t.last_changed ?? "", n = t.state ?? "", r = t.attributes ?? {}, o = r.plan ?? r.rows ?? r.rows_table ?? r.rows_json ?? r.rows_ha, a = Array.isArray(o) || typeof o == "string" ? o.length : 0;
    return `${e}|${i}|${s}|${n}|rowsLen=${a}`;
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
    const s = this.hass?.states?.[i], n = s?.attributes?.min, r = s?.attributes?.max, o = Number.isFinite(Number(n)) ? Number(n) : -52, a = Number.isFinite(Number(r)) ? Number(r) : 52;
    let l = t;
    l = Math.max(o, l), l = Math.min(a, l), await this.hass.callService("number", "set_value", { entity_id: i, value: l });
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
      show_title: !0,
      title_font_size: 20,
      title_font_family: "",
      show_header_date: !0,
      show_time_column: !0,
      trim_empty_rows: !1,
      merge_double_lessons: !1,
      equal_column_widths: !1,
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      view_mode: "week",
      display_mode: "default",
      days_ahead: 0,
      rolling_switch_mode: "midnight",
      rolling_week_only: !1,
      rolling_switch_time: "",
      tap_action: { action: "none" },
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
      rows: [],
      rows_b: []
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(e) {
    const t = ct.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
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
  normalizeTapAction(e) {
    const t = typeof e == "object" && e ? e : {}, i = ((t.action ?? "none") + "").toString().trim();
    return {
      action: i === "toggle_view" || i === "popup_week" || i === "navigate" || i === "url" || i === "more-info" ? i : "none",
      navigation_path: (t.navigation_path ?? "").toString(),
      url_path: (t.url_path ?? "").toString(),
      entity: (t.entity ?? "").toString(),
      target: (t.target ?? "").toString()
    };
  }
  normalizeConfig(e) {
    const t = ct.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((k) => (k ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = Se(e.rows, i), n = Se(e.rows_b, i), r = ((e.view_mode ?? "week") + "").toString().trim(), o = r === "rolling" ? "rolling" : "week", a = ((e.display_mode ?? "default") + "").toString().trim(), l = a === "compact" ? "compact" : "default", h = Number(e.days_ahead), p = Number.isFinite(h) ? Math.max(0, Math.min(6, Math.floor(h))) : 0, d = ((e.rolling_switch_mode ?? t.rolling_switch_mode ?? "midnight") + "").toString().trim(), g = d === "after_last_lesson" || d === "fixed_time" ? d : "midnight", _ = ((e.rolling_switch_time ?? t.rolling_switch_time ?? "") + "").toString().trim(), u = ((e.week_mode ?? t.week_mode) + "").toString().trim(), m = u === "kw_parity" || u === "week_map" || u === "off" ? u : "off", f = (() => {
      const k = ((e.source_type ?? "") + "").toString().trim();
      if (k === "manual" || k === "entity" || k === "json" || k === "sensor") return k;
      const ft = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (ft) {
        const K = ((e.source_attribute ?? "") + "").toString().trim(), nt = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(ft) && (K === "" || K === "rows_table") && (nt === "" || nt === "time")) && (K || nt) ? "legacy" : "entity";
      }
      return "manual";
    })(), w = (e.source_entity ?? t.source_entity).toString().trim(), x = (e.source_entity_integration ?? "").toString().trim(), A = (e.source_entity_legacy ?? "").toString().trim(), S = f === "sensor" ? A || w : f === "entity" && x || w, D = (e.week_offset_entity ?? "").toString().trim() || Ue(S);
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      show_title: e.show_title ?? t.show_title,
      title_font_size: Number.isFinite(Number(e.title_font_size)) ? Math.max(0, Math.min(40, Number(e.title_font_size))) : t.title_font_size,
      title_font_family: (e.title_font_family ?? t.title_font_family ?? "").toString(),
      show_header_date: e.show_header_date ?? t.show_header_date,
      show_time_column: e.show_time_column ?? t.show_time_column,
      trim_empty_rows: e.trim_empty_rows ?? t.trim_empty_rows,
      merge_double_lessons: e.merge_double_lessons ?? t.merge_double_lessons,
      equal_column_widths: e.equal_column_widths ?? t.equal_column_widths,
      days: i,
      view_mode: o,
      display_mode: l,
      days_ahead: p,
      rolling_switch_mode: g,
      rolling_week_only: e.rolling_week_only === !0,
      rolling_switch_time: _,
      tap_action: this.normalizeTapAction(e.tap_action ?? t.tap_action),
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
      source_entity: S,
      source_entity_integration: x || "",
      source_entity_legacy: A || "",
      source_attribute: f === "entity" ? "rows_table" : ((e.source_attribute ?? t.source_attribute ?? "plan") + "").toString(),
      source_time_key: f === "entity" ? "time" : ((e.source_time_key ?? t.source_time_key ?? "Stunde") + "").toString(),
      source_type: f,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: D,
      week_offset_attribute: (e.week_offset_attribute ?? "").toString(),
      week_mode: m,
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
      rows: s,
      rows_b: n
    };
  }
  getTodayIndex(e, t) {
    const i = /* @__PURE__ */ new Date(), s = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(t) && t.length) {
      const l = t.map((h) => {
        if (h instanceof Date && !Number.isNaN(h.getTime()))
          return `${h.getFullYear()}${String(h.getMonth() + 1).padStart(2, "0")}${String(h.getDate()).padStart(2, "0")}`;
        const p = (h ?? "").toString().trim(), d = p.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return d ? `${d[1]}${d[2]}${d[3]}` : p;
      }).indexOf(s);
      return l >= 0 ? l : -1;
    }
    const n = i.getDay(), r = new Set(Di(n).map(Vt));
    if (!r.size) return -1;
    const o = (e ?? []).map((a) => Vt(a));
    for (let a = 0; a < o.length; a++) if (r.has(o[a])) return a;
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
    const i = e.days ?? [], s = (e.source_time_key ?? "time").toString().trim(), n = "Stunde", r = "time", o = t.map((a) => {
      if (a?.break === !0)
        return {
          break: !0,
          time: (a?.time ?? a?.[s] ?? a?.[n] ?? a?.[r] ?? "").toString(),
          label: (a.label ?? "Pause").toString()
        };
      const l = (a?.time ?? a?.[s] ?? a?.[n] ?? a?.[r] ?? "").toString(), h = et(l), p = Array.isArray(a?.cells) ? Array.from({ length: i.length }, (f, w) => (a?.cells?.[w] ?? "").toString()) : Array.from({ length: i.length }, (f, w) => {
        const x = (i[w] ?? "").toString();
        return (a?.[x] ?? "").toString();
      }), d = Array.isArray(a?.cell_styles) ? Array.from({ length: i.length }, (f, w) => Xt(a?.cell_styles?.[w])) : [], g = Array.isArray(a?.cell_times) ? Array.from({ length: i.length }, (f, w) => Fe(a.cell_times[w])) : [], _ = (a?.start ?? "").toString().trim() || h.start, u = (a?.end ?? "").toString().trim() || h.end, m = { time: l, start: _ || void 0, end: u || void 0, cells: p };
      return d.some((f) => !!f) && (m.cell_styles = d), g.some((f) => !!f) && (m.cell_times = g), m;
    });
    return o.length ? o : null;
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
      const n = await s.json(), r = Array.isArray(n) ? n : Array.isArray(n?.rows) ? n.rows : null, o = r ? this.buildRowsFromArray(e, r) : null;
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
    return this.weekFromParityAtDate(e, /* @__PURE__ */ new Date());
  }
  weekFromParityAtDate(e, t) {
    const { isoWeek: i } = Me(t), s = i % 2 === 0, n = !!e.week_a_is_even_kw;
    return s === n ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(t, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: n, isoYear: r } = Me(/* @__PURE__ */ new Date()), o = String(n), a = String(r);
    if (s?.[a] && typeof s[a] == "object") {
      const h = Ee(s[a][o]);
      if (h) return h;
    }
    return Ee(s?.[o]) || null;
  }
  getActiveWeek(e) {
    return e.week_mode === "week_map" ? this.weekFromMap(e) ?? this.weekFromParity(e) : e.week_mode === "kw_parity" ? this.weekFromParity(e) : "A";
  }
  filterCellText(e, t) {
    return (e ?? "").toString().trim();
  }
  getTitleStyle(e) {
    const t = [], i = Number(e.title_font_size);
    Number.isFinite(i) && i > 0 && t.push(`font-size:${Math.max(10, Math.min(40, i))}px`);
    const s = (e.title_font_family ?? "").toString().trim();
    return s && t.push(`font-family:${s}`), t.join(";");
  }
  fmtYMD(e) {
    return `${e.getFullYear()}${String(e.getMonth() + 1).padStart(2, "0")}${String(e.getDate()).padStart(2, "0")}`;
  }
  findConfiguredDayIndexForDate(e, t) {
    const i = e.getDay() === 0 ? 7 : e.getDay();
    return (t ?? []).findIndex((s) => Ce(s) === i);
  }
  isConfiguredSchoolday(e, t) {
    return this.findConfiguredDayIndexForDate(e, t) >= 0;
  }
  nextConfiguredSchoolday(e, t) {
    const i = new Date(e);
    for (let s = 0; s < 14; s++)
      if (i.setDate(i.getDate() + 1), this.isConfiguredSchoolday(i, t)) return i;
    return i;
  }
  getLastLessonEnd() {
    const e = this._rowsCache ?? [];
    for (let t = e.length - 1; t >= 0; t--) {
      const i = e[t];
      if (!C(i) && i?.end) return (i.end + "").toString().trim();
    }
    return "";
  }
  shouldAdvanceRollingDay(e, t) {
    if (!this.isConfiguredSchoolday(t, e.days ?? [])) return !0;
    const i = ((e.rolling_switch_mode ?? "midnight") + "").toString();
    if (i === "after_last_lesson") {
      const s = this.getLastLessonEnd();
      if (!s) return !1;
      const [n, r] = s.split(":").map(Number);
      return Number.isFinite(n) && Number.isFinite(r) ? t.getHours() > n || t.getHours() === n && t.getMinutes() >= r : !1;
    }
    if (i === "fixed_time") {
      const s = ((e.rolling_switch_time ?? "") + "").toString().trim(), [n, r] = s.split(":").map(Number);
      return Number.isFinite(n) && Number.isFinite(r) ? t.getHours() > n || t.getHours() === n && t.getMinutes() >= r : !1;
    }
    return !1;
  }
  getRollingVisibleSlots(e, t, i = /* @__PURE__ */ new Date()) {
    const s = e.days ?? [];
    if (!s.length) return [];
    const n = i;
    let r = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, 0);
    this.isConfiguredSchoolday(r, s) ? this.shouldAdvanceRollingDay(e, n) && (r = this.nextConfiguredSchoolday(r, s)) : r = this.nextConfiguredSchoolday(r, s);
    const o = [], a = Math.max(0, Math.min(6, t));
    let l = new Date(r);
    const h = new Date(r);
    h.setDate(r.getDate() + (7 - (r.getDay() || 7))), h.setHours(23, 59, 59, 999);
    for (let p = 0; p <= a && !(e.rolling_week_only && l > h); p++) {
      const d = this.findConfiguredDayIndexForDate(l, s);
      d >= 0 && o.push({ orig: d, date: new Date(l) }), l = this.nextConfiguredSchoolday(l, s);
    }
    return o;
  }
  async handleCardAction(e, t) {
    if (!t || t.defaultPrevented || (t.composedPath?.() ?? []).some((n) => n instanceof HTMLElement && (n.closest?.(".offsetInline") || n.closest?.(".btnMini")))) return;
    const s = this.normalizeTapAction(e.tap_action);
    if (!(!s || s.action === "none")) {
      if (s.action === "toggle_view") {
        const n = ((this._uiViewMode ?? e.view_mode ?? "week") + "").toString();
        this._uiViewMode = n === "rolling" ? "week" : "rolling", this.requestUpdate();
        return;
      }
      if (s.action === "popup_week") {
        this._uiPopupOpen = !0, this.requestUpdate();
        return;
      }
      if (s.action === "navigate") {
        const n = (s.navigation_path ?? "").toString().trim();
        if (!n) return;
        history.pushState(null, "", n), Yt(window, "location-changed", { replace: !1 });
        return;
      }
      if (s.action === "url") {
        const n = (s.url_path ?? "").toString().trim();
        if (!n) return;
        window.open(n, s.target || "_blank");
        return;
      }
      if (s.action === "more-info") {
        const n = (s.entity ?? e.source_entity ?? e.source_entity_integration ?? "").toString().trim();
        if (!n) return;
        Yt(this, "hass-more-info", { entityId: n });
      }
    }
  }
  closeWeekPopup(e) {
    e?.stopPropagation?.(), this._uiPopupOpen = !1, this.requestUpdate();
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
    const n = [];
    for (const r of s) {
      const o = (r ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!o) continue;
      const a = Number(o[1]), l = Number(o[2]), h = Number(o[3]), p = new Date(a, l - 1, h, 12, 0, 0, 0);
      Number.isNaN(p.getTime()) || n.push(p);
    }
    return n.length ? n : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(e) {
    const t = ((e.source_type ?? "manual") + "").toString().trim();
    if (t !== "entity" && t !== "sensor") return null;
    const i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const s = this.hass.states[i].attributes ?? {}, n = s?.meta_ha ?? s?.meta ?? (typeof s?.meta_json == "string" ? this.parseAnyJson(s.meta_json) : null) ?? null;
    if (!n) return null;
    const r = (e.days?.length ?? 0) || 5, o = n?.updated_days;
    if (Array.isArray(o) && o.length) {
      const l = (o[0] ?? "").toString().trim();
      return Array.from({ length: r }, (p, d) => (o[d] ?? l ?? "").toString().trim());
    }
    const a = (n?.updated_raw ?? n?.updated ?? "").toString().trim();
    return a ? Array.from({ length: r }, () => a) : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.week_mode === "kw_parity" && this.getActiveWeek(e) === "B" ? Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : e.rows ?? [] : e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const n = this.getActiveWeek(e), r = (e.source_entity_a ?? "").trim(), o = (e.source_entity_b ?? "").trim(), a = (e.source_attribute_a ?? "").trim(), l = (e.source_attribute_b ?? "").trim();
      if (n === "A" && r)
        return this.getRowsFromEntity(e, r, a) ?? [];
      if (n === "B" && o)
        return this.getRowsFromEntity(e, o, l) ?? [];
      const h = i;
      return h ? this.getRowsFromEntity(e, h, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
    }
    const s = i;
    return s ? this.getRowsFromEntity(e, s, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
  }
  getManualRowForDate(e, t, i, s) {
    if ((e.source_type ?? "manual") !== "manual" || e.week_mode !== "kw_parity" || !(s instanceof Date)) return t;
    const n = this.weekFromParityAtDate(e, s), r = n === "B" && Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : e.rows ?? [], o = (t?.time ?? "").toString();
    return r.find((l) => C(l) === C(t) && (l?.time ?? "").toString() === o) ?? r[i] ?? t;
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
`).map((g) => g.trim()).filter((g) => g.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const n = i[0];
    if (/^(—|\-|–|---)$/.test(n)) return null;
    const r = (g) => {
      const _ = (g ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(_) || /\bfällt\s+aus\b/i.test(_) || /\bverlegt\b/i.test(_) || /\bentfällt\b/i.test(_) || /\bvertretung\b/i.test(_) || /\bstatt\b/i.test(_) || /\bgehalten\b/i.test(_) || /\bAufgaben\b/i.test(_) || /^für\b/i.test(_);
    }, o = (g) => {
      const _ = (g ?? "").toString().trim();
      return /^\d{1,4}$/.test(_) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(_) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(_);
    }, a = i.slice(1);
    let l = -1;
    for (let g = 0; g < a.length; g++)
      if (!r(a[g]) && o(a[g])) {
        l = g;
        break;
      }
    if (l < 0) {
      for (let g = a.length - 1; g >= 0; g--)
        if (o(a[g])) {
          l = g;
          break;
        }
    }
    if (l < 0) return null;
    const h = a[l];
    let p;
    for (let g = l + 1; g < a.length; g++) {
      const _ = a[g];
      if (!r(_) && !o(_)) {
        p = _;
        break;
      }
    }
    if (!p) {
      const g = a.filter((_) => !r(_) && !o(_));
      p = g.length ? g[g.length - 1] : void 0;
    }
    const d = i.slice(1).filter((g) => r(g));
    return { fach: n, raum: h, lehrer: p, notes: d.length ? d : void 0 };
  }
  renderCell(e, t) {
    const i = (e ?? "").toString(), s = this.filterCellText(i, t);
    if (X(s)) return c``;
    const n = (() => {
      let u = s.replace(/\r/g, "").split(`
`).map((f) => (f ?? "").toString().trim());
      for (; u.length && /^(—|–|-)$/.test(u[0]); ) u.shift();
      const m = [];
      for (const f of u) {
        const w = f.length === 0;
        if (!/^(—|–|-)$/.test(f)) {
          if (w) {
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
    if (X(n)) return c``;
    const r = n.split(/\n\s*\n/).map((u) => u.trim()).filter(Boolean), o = this.parseCellTriplet(n), a = (u) => {
      if (u.startsWith("🔴")) return "note noteRed";
      if (u.startsWith("🟠")) return "note noteOrange";
      if (u.startsWith("🟡")) return "note noteYellow";
      const m = u;
      return /\bfällt\s+aus\b/i.test(m) || /\bverlegt\b/i.test(m) || /\bstatt\b/i.test(m) || /\bgehalten\b/i.test(m) || /\bentfällt\b/i.test(m) ? "note noteRed" : "note";
    }, l = (u) => (u ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim();
    if (r.length === 1 && o?.fach && o?.raum && o?.lehrer)
      return c`
        <div class="cellWrap">
          <div class="fach">${o.fach}</div>
          <div class="lehrer">${o.lehrer}</div>
          <div class="raum">${o.raum}</div>

          ${o.notes?.length ? c`
                <div class="notes">
                  ${o.notes.map((u) => {
        const m = a(u), f = l(u) || u;
        return c`<div class=${m}><span class="txt">${f}</span></div>`;
      })}
                </div>
              ` : c``}
        </div>
      `;
    const h = (u) => {
      const m = (u ?? "").toString().trim();
      if (!m) return c``;
      const f = this.parseCellTriplet(m);
      if (f?.fach && f?.raum && f?.lehrer)
        return c`
          <div class="cellWrap">
            <div class="fach">${f.fach}</div>
            <div class="lehrer">${f.lehrer}</div>
            <div class="raum">${f.raum}</div>

            ${f.notes?.length ? c`
                  <div class="notes">
                    ${f.notes.map((S) => {
          const D = a(S), k = l(S) || S;
          return c`<div class=${D}><span class="txt">${k}</span></div>`;
        })}
                  </div>
                ` : c``}
          </div>
        `;
      const w = m.split(`
`).map((S) => S.trim()).filter(Boolean), x = (w[0] ?? "").trim(), A = w.slice(1);
      return x && A.length ? c`
          <div class="cellWrap">
            <div class="fach">${x}</div>
            <div class="notes">
              ${A.map((S) => {
        const D = a(S), k = l(S) || S;
        return c`<div class=${D}><span class="txt">${k}</span></div>`;
      })}
            </div>
          </div>
        ` : c`<span class="cellText">${m}</span>`;
    };
    if (r.length > 1)
      return c`<div class="cellMulti">${r.map((u) => h(u))}</div>`;
    const p = (n ?? "").split(`
`).map((u) => u.trim()).filter(Boolean), d = /^\d{1,4}$/, g = /^[A-ZÄÖÜ]{2,6}$/, _ = (u) => {
      const m = (u ?? "").trim();
      if (!m || d.test(m) || g.test(m)) return !1;
      const f = m.toLowerCase();
      return f.startsWith("statt ") || f.includes("fällt aus") || f.includes("verlegt") || f.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(m) ? !1 : /[a-z0-9äöü]/i.test(m);
    };
    if (p.length >= 6 && p.length % 3 === 0) {
      const u = [];
      for (let m = 0; m < p.length; m += 3) {
        const f = p[m] ?? "", w = p[m + 1] ?? "", x = p[m + 2] ?? "";
        if (!_(f) || !d.test(w) || !g.test(x)) {
          u.length = 0;
          break;
        }
        u.push([f, w, x].join(`
`));
      }
      if (u.length >= 2)
        return c`<div class="cellMulti">${u.map((m) => h(m))}</div>`;
    }
    return h(n);
  }
  renderCardLayout(e, t = null, i = !1) {
    const s = this._rowsCache, n = this.getHeaderDaysFromEntity(e), r = this.getTodayIndex(e.days ?? [], n), o = ((t ?? this._uiViewMode ?? e.view_mode ?? "week") + "").toString(), a = Number(e.days_ahead), l = Number.isFinite(a) ? Math.max(0, Math.min(6, Math.floor(a))) : 0, h = "1px solid var(--divider-color)", p = Ae(e.highlight_today_color ?? "", 0.12), d = Ae(e.highlight_current_color ?? "", 0.18), g = (e.highlight_current_text_color ?? "").toString().trim(), _ = (e.highlight_current_time_text_color ?? "").toString().trim(), u = e.week_mode !== "off", m = u ? this.getActiveWeek(e) : null, f = this.getWeekOffsetValue(e), w = (e.source_type ?? "manual").toString(), x = e.show_time_column !== !1, A = !i && (e.week_offset_entity ?? "").trim().length > 0, S = A && (w === "entity" || w === "sensor" && (e.week_mode ?? "off") !== "off"), D = n && n.length >= (e.days?.length ?? 0) ? n : null, k = this.getHeaderUpdatedFromEntity(e), ft = this.getBaseDate(e), K = this.mondayOfWeek(ft), nt = this.normalizeTapAction(e.tap_action), te = i ? "default" : e.display_mode ?? "default", Le = `${te === "compact" ? "compact" : ""}${!i && nt.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}`, ee = e.show_title !== !1 && (e.title ?? "").toString().trim().length > 0, Ve = this.getTitleStyle(e), Ie = ee || u || S, Ye = o === "rolling" && (i || !S || (f ?? 0) === 0), rt = Ye ? this.getRollingVisibleSlots(e, l) : [], J = rt.length ? rt.map((y) => y.orig) : Array.from({ length: e.days?.length ?? 0 }, (y, v) => v), yt = J.map((y) => e.days[y]), M = rt.length ? rt.map((y) => y.date) : null, ie = rt.length ? 0 : Math.max(0, J.indexOf(r)), Wt = J[ie] ?? 0, Ot = M?.[ie] ?? null, se = Ot instanceof Date ? this.fmtYMD(Ot) === this.fmtYMD(/* @__PURE__ */ new Date()) : Wt === r, Bt = e.trim_empty_rows ? Ti(s, J, (y, v, $, T) => {
      const N = this.getManualRowForDate(e, y, v, M?.[T]);
      return this.filterCellText((N?.cells ?? y?.cells ?? [])[$] ?? "", e);
    }) : s, ne = (() => {
      const y = /* @__PURE__ */ new Map();
      return !D || !k || D.forEach((v, $) => {
        const T = k[$];
        v instanceof Date && T && y.set(this.fmtYMD(v), T);
      }), y;
    })();
    return c`
      <ha-card class=${Le} @click=${i ? (y) => this.closeWeekPopup(y) : (y) => this.handleCardAction(e, y)}>
        ${Ie ? c`<div class="headerRow">
          ${ee ? c`<div class="title" style=${Ve}>${e.title ?? ""}</div>` : c`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${u ? c`<div class="weekBadgeInline">Woche <b>${m}</b></div>` : c``}

            ${S ? c`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), f != null && this.setWeekOffset(e, f - 1);
    }}>&lt;</button>
                    <div class="offsetVal">${f ?? "?"}</div>
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), f != null && this.setWeekOffset(e, f + 1);
    }}>&gt;</button>
                  </div>
                ` : c``}
          </div>
        </div>` : c``}

        <div class="card">
          <table class=${e.equal_column_widths ? "equalColumns" : ""}>
            <thead>
              <tr>
                ${x ? c`<th class="time">Stunde</th>` : c``}
                ${yt.map((y, v) => {
      const $ = J[v], T = e.highlight_today && (M ? this.fmtYMD(M[v]) === this.fmtYMD(/* @__PURE__ */ new Date()) : $ === r) ? "today" : "";
      let N = "";
      if (M?.[v] instanceof Date)
        N = this.fmtDDMMYYYY(M[v]);
      else if (D)
        N = this.fmtDDMMYYYY(D[$]);
      else {
        const H = Ce(y);
        if (H) {
          const q = new Date(K);
          q.setDate(K.getDate() + (H - 1)), N = this.fmtDDMMYYYY(q);
        }
      }
      return c`
                    <th class=${T} style=${`--sp-hl:${p};`}>
                      <div>${y}</div>
                      ${e.show_header_date !== !1 ? c`<div class="thDate">${N}</div>` : c``}
                      ${M?.[v] ? ne.get(this.fmtYMD(M[v])) ? c`<div class="thUpdated">(aktualisiert: ${ne.get(this.fmtYMD(M[v]))})</div>` : c`` : k?.[$] ? c`<div class="thUpdated">(aktualisiert: ${k[$]})</div>` : c``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${yt.length + (x ? 1 : 0)}>${this._noDataMsg}</td></tr>` : Bt.map((y, v) => {
      if (C(y)) {
        const ot = et(y.time), Z = !!ot.start && !!ot.end && this.isNowBetween(ot.start, ot.end), E = !!e.highlight_breaks && Z;
        let j = `--sp-hl:${d};`, vt = "";
        return E && (j += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", vt += `--sp-hl:${d}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), E && e.highlight_current_time_text && _ && (j += `color:${_};`), c`
                    <tr class="break">
                      ${x ? c`<td class="time" style=${j}>${y.time}</td>` : c``}
                      <td colspan=${yt.length} style=${vt}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const $ = y, T = $.cells ?? [], N = $.cell_styles ?? [], H = this.getManualRowForDate(e, $, v, Ot), q = (H?.cell_times ?? $.cell_times)?.[Wt] ?? null, re = q?.time || H?.time || $.time, wt = q?.start || H?.start || $.start, bt = q?.end || H?.end || $.end, Ft = se && !!wt && !!bt && this.isNowBetween(wt, bt), Ke = r >= 0 ? T[r] ?? "" : "", Je = r >= 0 ? this.filterCellText(Ke, e) : "", qe = r >= 0 ? X(Je) : !1, Ut = !(e.free_only_column_highlight && qe), oe = et(re), Ze = !!(oe.start && oe.end), ae = !Ze && wt && bt ? `${wt}–${bt}` : "";
      let Ht = `--sp-hl:${d};`;
      return Ut && e.highlight_current && Ft && (Ht += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), Ut && Ft && e.highlight_current_time_text && _ && (Ht += `color:${_};`), c`
                  <tr>
                    ${x ? c`<td class="time" style=${Ht}>
                      <div class="timeWrap">
                        <div class="timeSt">${re}</div>
                        ${ae ? c`<div class="timeHm">${ae}</div>` : c``}
                      </div>
                    </td>` : c``}

                    ${yt.map((ot, Z) => {
        const E = J[Z], j = this.getManualRowForDate(e, $, v, M?.[Z]), vt = j?.cells ?? T, Ge = j?.cell_styles ?? N, le = this.filterCellText(vt[E] ?? "", e), Qe = Ge[E] ?? null, Xe = e.highlight_today && E === r ? "today" : "", $t = e.merge_double_lessons ? Ni(Bt, v, (at, xt) => {
          const G = this.getManualRowForDate(e, at, xt, M?.[Z]);
          return { text: this.filterCellText((G?.cells ?? at?.cells ?? [])[E] ?? "", e), style: (G?.cell_styles ?? at?.cell_styles ?? [])[E] ?? null };
        }) : { covered: !1, span: 1 };
        if ($t.covered) return b;
        let ce = `--sp-hl:${p};` + Ci(Qe, h);
        const ti = !X(le), ei = (() => {
          if (!se || E !== Wt || $t.span <= 1) return !1;
          const at = (j?.cell_times ?? $.cell_times)?.[E] ?? null, xt = v + $t.span - 1, G = Bt[xt], he = this.getManualRowForDate(e, G, xt, M?.[Z]), ii = (he?.cell_times ?? G?.cell_times)?.[E] ?? null, de = at?.start || j?.start || $.start, ue = ii?.end || he?.end || G?.end;
          return !!de && !!ue && this.isNowBetween(de, ue);
        })();
        return Ut && ti && (Ft || ei) && e.highlight_current_text && g && r >= 0 && E === r && (ce += `color:${g};`), c`<td class=${Xe} style=${ce} rowspan=${$t.span}>${this.renderCell(le, e)}</td>`;
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
  render() {
    if (!this.config) return c``;
    const e = this.config;
    return c`
      ${this.renderCardLayout(e)}
      ${this._uiPopupOpen ? c`
        <div class="popupBackdrop" @click=${(t) => this.closeWeekPopup(t)}>
          <div class="popupShell">
            ${this.renderCardLayout(e, "week", !0)}
          </div>
        </div>
      ` : c``}
    `;
  }
}, ct.styles = Te`
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
    ha-card.tappable {
      cursor: pointer;
    }
    .popupBackdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }
    .popupShell {
      width: min(1400px, calc(100vw - 40px));
      max-height: calc(100vh - 40px);
      overflow: auto;
    }
    ha-card.popupCard {
      cursor: pointer;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
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
    .titleSpacer {
      flex: 1 1 auto;
      min-width: 0;
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
    table.equalColumns {
      width: 100%;
      table-layout: fixed;
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
    table.equalColumns .fach {
      white-space: normal;
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
    ha-card.compact .headerRow {
      padding: 10px 10px 4px 10px;
      gap: 8px;
    }
    ha-card.compact .title {
      font-size: 16px !important;
      line-height: 1.1;
    }
    ha-card.compact .headRight {
      gap: 6px;
    }
    ha-card.compact .weekBadgeInline,
    ha-card.compact .offsetInline {
      padding: 4px 6px;
      border-radius: 10px;
      font-size: 11px;
    }
    ha-card.compact .btnMini {
      padding: 4px 8px;
    }
    ha-card.compact .card {
      padding: 8px 8px 10px 8px;
    }
    ha-card.compact th,
    ha-card.compact td {
      padding: 4px;
    }
    ha-card.compact .time {
      width: 102px;
    }
    ha-card.compact .thDate {
      font-size: 10px;
      margin-top: 1px;
    }
    ha-card.compact .thUpdated {
      font-size: 9px;
      margin-top: 0;
    }
    ha-card.compact .timeSt {
      font-size: 12px;
    }
    ha-card.compact .timeHm {
      font-size: 10px;
    }
    ha-card.compact .cellWrap {
      gap: 1px;
      line-height: 1.08;
    }
    ha-card.compact .fach {
      font-size: 12px;
    }
    ha-card.compact .raum,
    ha-card.compact .lehrer {
      font-size: 11px;
    }
    ha-card.compact .notes {
      margin-top: 2px;
      gap: 2px;
    }
    ha-card.compact .note {
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 7px;
    }
    ha-card.compact .dot {
      font-size: 11px;
    }
`, ct);
kt = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
Mt = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakMap();
Ct = /* @__PURE__ */ new WeakMap();
Dt = /* @__PURE__ */ new WeakMap();
Tt = /* @__PURE__ */ new WeakMap();
Rt = /* @__PURE__ */ new WeakMap();
R([
  ze({ attribute: !1 })
], P.prototype, "hass", 1);
R([
  U()
], P.prototype, "config", 1);
R([
  U()
], P.prototype, "_rowsCache", 1);
R([
  U()
], P.prototype, "_noData", 1);
R([
  U()
], P.prototype, "_noDataMsg", 1);
R([
  U()
], P.prototype, "_jsonRows", 1);
R([
  U()
], P.prototype, "_jsonStatus", 1);
R([
  U()
], P.prototype, "_jsonError", 1);
let It = P;
function Yt(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function V(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function ji(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function zi(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Kt = class extends tt {
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
    }, this._rowOpen = {}, this._showCellStyles = !1, this._manualWeek = "A";
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
    return new It().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Yt(this, "config-changed", { config: t });
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
        source_type: "sensor",
        source_entity: i,
        source_entity_legacy: i
      });
      return;
    }
    if (s === "entity") {
      const n = (i ?? "").toString().trim();
      let r = "";
      n && (r = this.hass?.states?.[n]?.attributes?.week_offset_entity || Ue(n)), this.emit({
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
    return c`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(i)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${n ? "▾" : "▸"}</div>
        </div>
        ${n ? c`<div class="sectionBody">${s}</div>` : c``}
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
  getManualRowsKey() {
    return this._config?.week_mode === "kw_parity" && this._manualWeek === "B" ? "rows_b" : "rows";
  }
  getManualRows() {
    const t = this.getManualRowsKey();
    return Array.isArray(this._config?.[t]) ? this.clone(this._config[t]) : [];
  }
  emitManualRows(t) {
    if (!this._config) return;
    const i = this.getManualRowsKey();
    this.emit({ ...this._config, [i]: t });
  }
  addManualRow() {
    if (!this._config) return;
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = this.getManualRows(), s = { time: `${i.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    i.push(s), this.emitManualRows(i);
  }
  insertManualRowBelow(t) {
    if (!this._config) return;
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = this.getManualRows(), n = { time: `${t + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    s.splice(t + 1, 0, n), this.emitManualRows(s);
  }
  insertManualBreakBelow(t) {
    if (!this._config) return;
    const i = this.getManualRows();
    i.splice(t + 1, 0, { break: !0, time: "", label: "Pause" }), this.emitManualRows(i);
  }
  removeManualRow(t) {
    if (!this._config) return;
    const i = this.getManualRows();
    i.splice(t, 1), this.emitManualRows(i);
  }
  updateManualRow(t, i) {
    if (!this._config) return;
    const s = this.getManualRows(), n = s[t];
    s[t] = { ...n, ...i }, this.emitManualRows(s);
  }
  updateManualCell(t, i, s) {
    if (!this._config) return;
    const n = this.getManualRows(), r = n[t];
    if (!r || C(r)) return;
    const o = r, a = Array.isArray(o.cells) ? o.cells.slice() : [];
    a[i] = s, n[t] = { ...o, cells: a }, this.emitManualRows(n);
  }
  addLessonRow() {
    this.addManualRow();
  }
  addBreakRow() {
    if (!this._config) return;
    const t = this.getManualRows();
    t.push({ break: !0, time: "", label: "Pause" }), this.emitManualRows(t);
  }
  toggleManualBreak(t, i) {
    if (!this._config) return;
    const s = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = this.getManualRows(), r = n[t];
    if (r) {
      if (i) {
        const o = (r.time ?? "").toString(), a = (r.label ?? "Pause").toString();
        n[t] = { break: !0, time: o, label: a };
      } else {
        const o = (r.time ?? "").toString();
        n[t] = { time: o, start: "", end: "", cells: Array.from({ length: s.length }, () => "") };
      }
      this.emitManualRows(n);
    }
  }
  updateManualCellStyle(t, i, s) {
    if (!this._config) return;
    const n = this.getManualRows(), r = n[t];
    if (!r || C(r)) return;
    const o = r, a = Array.isArray(o.cell_styles) ? o.cell_styles.slice() : [], l = a[i] ?? {};
    a[i] = { ...l, ...s }, n[t] = { ...o, cell_styles: a }, this.emitManualRows(n);
  }
  renderManualRows() {
    if (!this._config) return c``;
    const t = this._config, i = t.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = t.week_mode === "kw_parity", n = s && this._manualWeek === "B" ? "B" : "A", r = n === "B" && Array.isArray(t.rows_b) ? t.rows_b : Array.isArray(t.rows) ? t.rows : [];
    return c`
      <div class="manualWeekBox">
        <div class="optRow">
          <div>
            <div class="optTitle">Wechselwochen A/B</div>
            <div class="sub">Zwei manuelle Pläne automatisch nach Kalenderwoche wechseln.</div>
          </div>
          <ha-switch
            .checked=${s}
            @change=${(o) => {
      const a = !!o?.target?.checked, l = Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : this.clone(t.rows ?? []);
      this._manualWeek = "A", this._rowOpen = {}, this.emit({ ...t, week_mode: a ? "kw_parity" : "off", rows_b: l });
    }}
          ></ha-switch>
        </div>

        ${s ? c`
          <ha-form
            .hass=${this.hass}
            .data=${{ week_a_is_even_kw: V(t.week_a_is_even_kw, !0) }}
            .schema=${[{
      name: "week_a_is_even_kw",
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: !0, label: "Woche A = gerade Kalenderwoche" },
            { value: !1, label: "Woche A = ungerade Kalenderwoche" }
          ]
        }
      }
    }]}
            .computeLabel=${() => "Zuordnung der Woche A"}
            @value-changed=${(o) => {
      const a = o?.detail?.value?.week_a_is_even_kw;
      typeof a == "boolean" && this.setValue("week_a_is_even_kw", a);
    }}
          ></ha-form>

          <div class="manualWeekTabs">
            ${["A", "B"].map((o) => c`
              <button
                type="button"
                class=${`spBtn ${n === o ? "spBtnActive" : ""}`}
                @click=${() => {
      this._manualWeek = o, this._rowOpen = {}, this.requestUpdate();
    }}
              >Woche ${o} bearbeiten</button>
            `)}
          </div>
          <div class="hint">Aktuell bearbeitest du Woche ${n}. Die Karte zeigt automatisch den zur Kalenderwoche passenden Plan.</div>
        ` : c``}
      </div>

      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan${s ? ` · Woche ${n}` : ""}</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Cell-Styles</div>
            <ha-switch
              .checked=${!!this._showCellStyles}
              @change=${(o) => {
      this._showCellStyles = !!o?.target?.checked, this.requestUpdate();
    }}
            ></ha-switch>
          </div>

          <mwc-button outlined @click=${this.addLessonRow}>+ Stunde</mwc-button>
          <mwc-button outlined @click=${this.addBreakRow}>+ Pause</mwc-button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">
        Pro Zeile: Zeit sowie optional Start und Ende. Ein Klick in der Vorschau öffnet direkt die passende Zelle.
      </div>

      ${r.map((o, a) => {
      const l = C(o), h = l ? `Pause · ${(o.time ?? "").toString()}` : `Stunde · ${(o.time ?? "").toString()}`, p = o, d = (p.start ?? "").toString(), g = (p.end ?? "").toString(), _ = (o.label ?? "Pause").toString();
      return c`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[a] ?? !1}
            @toggle=${(u) => {
        try {
          this._rowOpen[a] = !!u?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${h || `Zeile ${a + 1}`}</div>
                <div class="rowHeadMeta">${l ? _ : `${d || "Start?"} – ${g || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-input
                  label="Zeit / Stunde"
                  .value=${(o.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(u) => this.updateManualRow(a, { time: u?.target?.value ?? "" })}
                ></ha-input>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${l} @change=${(u) => this.toggleManualBreak(a, !!u?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${l ? c`
                    <ha-input
                      label="Pausentext"
                      .value=${_}
                      placeholder="z. B. Große Pause"
                      @input=${(u) => this.updateManualRow(a, { label: u?.target?.value ?? "" })}
                    ></ha-input>
                  ` : c`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-input
                        label="Start (HH:MM)"
                        .value=${d}
                        @input=${(u) => this.updateManualRow(a, { start: u?.target?.value ?? "" })}
                      ></ha-input>
                      <ha-input
                        label="Ende (HH:MM)"
                        .value=${g}
                        @input=${(u) => this.updateManualRow(a, { end: u?.target?.value ?? "" })}
                      ></ha-input>
                    </div>

                    <div class="cellsGrid">
                      ${i.map((u, m) => {
        const f = (p.cells?.[m] ?? "").toString(), w = (Array.isArray(p.cell_styles) ? p.cell_styles?.[m] : void 0) ?? {}, x = typeof w?.bg_alpha == "number" && !Number.isNaN(w.bg_alpha) ? w.bg_alpha : 0.18;
        return c`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${u}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${f}
                              @input=${(A) => this.updateManualCell(a, m, A?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              ${this.renderColorPicker("Hintergrund", Be(w) ?? "", (A) => {
          const S = ke(A);
          this.updateManualCellStyle(a, m, A ? { bg: A, bg_alpha: S.alpha } : { bg: "", bg_alpha: 0.18 });
        }, "#2196f3", x)}
                              ${this.renderColorPicker("Text", w.color ?? "", (A) => this.updateManualCellStyle(a, m, { color: A }), "#ffffff")}
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowFoot">
                <div class="rowActions">
                  <button type="button" class="spBtn" @click=${() => this.insertManualRowBelow(a)}>+ Stunde darunter</button>
                  <button type="button" class="spBtn" @click=${() => this.insertManualBreakBelow(a)}>+ Pause darunter</button>
                </div>
                <button type="button" class="spBtn spBtnDanger" @click=${() => this.removeManualRow(a)}>Löschen</button>
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
  renderToggle(t, i, s = !1) {
    return c`<label class="toggleRow"><span>${i}</span><ha-switch
      .checked=${V(this._config[t], s)}
      @change=${(n) => this.onToggle(n, t)}></ha-switch></label>`;
  }
  renderColorPicker(t, i, s, n = "#2196f3", r = 1) {
    const o = ke(i, n, r), a = [
      ["#03a9f4", "Blau"],
      ["#009688", "Türkis"],
      ["#4caf50", "Grün"],
      ["#ffeb3b", "Gelb"],
      ["#ff9800", "Orange"],
      ["#f44336", "Rot"],
      ["#e91e63", "Pink"],
      ["#9c27b0", "Violett"],
      ["#ffffff", "Weiß"],
      ["#212121", "Dunkel"]
    ], l = (h, p) => {
      const d = Qt(h);
      d && s(`rgba(${d.r}, ${d.g}, ${d.b}, ${Math.round(p * 100) / 100})`);
    };
    return c`<fieldset class="colorPicker">
      <legend>${t}</legend>
      <div class="palette">
        ${a.map(([h, p]) => c`<button type="button" class="swatch"
          style=${`--swatch:${h}`} title=${p} aria-label=${`${t}: ${p}`}
          aria-pressed=${o.hex.toLowerCase() === h}
          @click=${() => l(h, o.alpha)}></button>`)}
        <input type="color" class="customColor" aria-label=${`${t}: eigene Farbe`}
          title="Eigene Farbe" .value=${o.hex} @input=${(h) => l(h.target.value, o.alpha)} />
      </div>
      <label class="opacityControl"><span>Transparenz</span>
        <input type="range" min="0" max="100" aria-label=${`${t}: Transparenz`}
          .value=${String(Math.round((1 - o.alpha) * 100))}
          @input=${(h) => l(o.hex, 1 - Number(h.target.value) / 100)} />
        <output>${Math.round((1 - o.alpha) * 100)}%</output>
      </label>
      <div class="colorFooter"><span class="colorPreview" style=${`background:${i || n}`}></span>
        <button type="button" class="resetColor" @click=${() => s("")}>Zurücksetzen</button>
        <details class="colorAdvanced"><summary>Farbcode</summary>
          <input aria-label=${`${t}: Farbcode`} .value=${i ?? ""}
            @change=${(h) => s(h.target.value)} />
        </details>
      </div>
    </fieldset>`;
  }
  renderConfigColor(t, i, s, n = 1) {
    return this.renderColorPicker(t, this._config[i], (r) => {
      this.setValue(i, r || It.getStubConfig()[i]);
    }, s, n);
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
<div class="generalDivider first">Grunddaten</div>
            <div class="grid2">
              <ha-input label="Titel der Karte" .value=${t.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-input>

              <ha-input
                label="Schultage (CSV)"
                .value=${zi(t.days ?? [])}
                @input=${(i) => this.setValue("days", ji(i.target.value))}
                hint="Beispiel: Mo, Di, Mi, Do, Fr"
              ></ha-input>
            </div>

            <div class="generalDivider">Titel & Kopfzeile</div>
            <div class="toggleGroup">
              ${this.renderToggle("show_title", "Titelzeile anzeigen", !0)}
              ${this.renderToggle("show_header_date", "Datum anzeigen", !0)}
              ${this.renderToggle("show_time_column", "Spalte „Stunde“ anzeigen", !0)}
            </div>
            ${t.show_title !== !1 ? c`<div class="grid2">
              <ha-input
                label="Titelgröße (px)"
                type="number"
                .value=${String(t.title_font_size ?? 20)}
                @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("title_font_size", Number.isFinite(s) ? Math.max(10, Math.min(40, Math.floor(s))) : 20);
      }}
              ></ha-input>
              <ha-input
                label="Titel-Schriftfamilie (optional)"
                .value=${t.title_font_family ?? ""}
                @input=${(i) => this.onText(i, "title_font_family")}
              ></ha-input>
            </div>` : b}

            <div class="generalDivider">Ansicht</div>
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{ view_mode: t.view_mode ?? "week" }}
                .schema=${[
        {
          name: "view_mode",
          selector: {
            select: {
              mode: "dropdown",
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

              <ha-form
                .hass=${this.hass}
                .data=${{ display_mode: t.display_mode ?? "default" }}
                .schema=${[
        {
          name: "display_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "default", label: "Normal" },
                { value: "compact", label: "Kompakt" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "display_mode" ? "Ansichtsdichte" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).display_mode ?? "default";
          this.setValue("display_mode", s);
        } catch (s) {
          console.error("stundenplan-card editor: display_mode change failed", s);
        }
      }}
              ></ha-form>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Leere Endstunden ausblenden</div>
                  <div class="sub">Nur bis zur letzten belegten Stunde anzeigen.</div>
                </div>
                <ha-switch .checked=${V(t.trim_empty_rows, !1)} @change=${(i) => this.onToggle(i, "trim_empty_rows")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleiche Folgestunden verbinden</div>
                  <div class="sub">Identische Fächer ohne Pausenzeile zusammenfassen.</div>
                </div>
                <ha-switch .checked=${V(t.merge_double_lessons, !1)} @change=${(i) => this.onToggle(i, "merge_double_lessons")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleichmäßige Spaltenbreiten</div>
                  <div class="sub">Für mehrere gleich breite Karten untereinander.</div>
                </div>
                <ha-switch .checked=${V(t.equal_column_widths, !1)} @change=${(i) => this.onToggle(i, "equal_column_widths")}></ha-switch>
              </div>

              ${(t.view_mode ?? "week") === "rolling" ? c`
                <div class="generalDivider gridFull">Rolling</div>
                <div class="gridFull">${this.renderToggle("rolling_week_only", "Auf Kalenderwoche begrenzen")}</div>
                ${t.rolling_week_only ? c`<div class="hint gridFull">Endet am Sonntag der Startwoche. Am Wochenende beginnt die Ansicht beim nächsten Schultag; auch „Nach der letzten Stunde“ bleibt wirksam.</div>` : b}
                <ha-input
                  label="Zusätzliche Tage im Voraus"
                  type="number"
                  .value=${String(t.days_ahead ?? 0)}
                  @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("days_ahead", Number.isFinite(s) ? Math.max(0, Math.min(6, Math.floor(s))) : 0);
      }}
                  hint="0 = nur Starttag, 1 = Starttag + nächster Schultag"
                ></ha-input>

                <ha-form
                  .hass=${this.hass}
                  .data=${{ rolling_switch_mode: t.rolling_switch_mode ?? "midnight" }}
                  .schema=${[
        {
          name: "rolling_switch_mode",
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
                  .computeLabel=${(i) => i?.name === "rolling_switch_mode" ? "Auf nächsten Tag springen" : i?.name}
                  @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).rolling_switch_mode ?? "midnight";
          this.setValue("rolling_switch_mode", s);
        } catch (s) {
          console.error("stundenplan-card editor: rolling_switch_mode change failed", s);
        }
      }}
                ></ha-form>

                ${(t.rolling_switch_mode ?? "midnight") === "fixed_time" ? c`
                  <ha-input class="gridFull"
                    label="Umschaltzeit (HH:MM)"
                    .value=${t.rolling_switch_time ?? ""}
                    @input=${(i) => this.onText(i, "rolling_switch_time")}
                    hint="Beispiel: 15:00"
                  ></ha-input>
                ` : c`<div class="infoBox slim gridFull">${(t.rolling_switch_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung auf den nächsten Schultag folgt nach der letzten Endzeit aus deinem Plan." : "Der Sprung auf den nächsten Schultag folgt direkt ab Mitternacht."}</div>`}
              ` : c``}
            </div>

            ${(t.view_mode ?? "week") === "rolling" ? c`<div class="hint">Ab dem Starttag werden die nächsten passenden Schultage angezeigt. Beim Blättern in andere Wochen beginnt die Ansicht am Montag.</div>` : b}

            <div class="generalDivider">Beim Antippen</div>
            <div class="stack">
              <ha-form
                .hass=${this.hass}
                .data=${{ tap_action_action: ((t.tap_action?.action ?? "none") + "").toString() }}
                .schema=${[
        {
          name: "tap_action_action",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "none", label: "Keine Aktion" },
                { value: "toggle_view", label: "Ansicht umschalten" },
                { value: "popup_week", label: "Wochen-Popup" }
              ]
            }
          }
        }
      ]}
                .computeLabel=${(i) => i?.name === "tap_action_action" ? "Tap-Aktion" : i?.name}
                @value-changed=${(i) => {
        try {
          i?.stopPropagation?.();
          const s = (i?.detail?.value ?? {}).tap_action_action ?? "none";
          this.setValue("tap_action", { ...t.tap_action ?? {}, action: s });
        } catch (s) {
          console.error("stundenplan-card editor: tap_action change failed", s);
        }
      }}
              ></ha-form>

              ${((t.tap_action?.action ?? "none") + "").toString() === "toggle_view" ? c`
                <div class="hint">Ein Tipp auf die Karte wechselt zwischen „Ganze Woche“ und „Ab heute (rolling)“.</div>
              ` : ((t.tap_action?.action ?? "none") + "").toString() === "popup_week" ? c`
                <div class="hint">Ein Tipp auf die Karte öffnet ein Popup mit der aktuellen ganzen Woche. Ein weiterer Tipp auf das Popup schließt es wieder.</div>
              ` : c`<div class="hint">Für Wallpanels sind meist „Ansicht umschalten“ oder „Wochen-Popup“ die sinnvollsten Varianten.</div>`}
            </div>
          `
    )}

        ${this.renderSection(
      "Highlights",
      "highlights",
      c`
            <div class="toggleGroup">
              ${this.renderToggle("highlight_today", "Heute-Spalte hervorheben", !0)}
              ${this.renderToggle("highlight_current", "Aktuelle Stunde hervorheben", !0)}
              ${this.renderToggle("highlight_breaks", "Pause hervorheben")}
              ${this.renderToggle("free_only_column_highlight", "Freistunden nicht hervorheben", !0)}
              ${this.renderToggle("highlight_current_text", "Aktuelles Fach farbig anzeigen")}
              ${t.show_time_column !== !1 ? this.renderToggle("highlight_current_time_text", "Aktuelle Zeit farbig anzeigen") : b}
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      c`
            <div class="stack">
              ${this.renderConfigColor("Heute-Spalte", "highlight_today_color", "#0096ff", 0.12)}
              ${this.renderConfigColor("Aktuelle Stunde / Pause", "highlight_current_color", "#4caf50", 0.18)}
              ${t.highlight_current_text ? this.renderConfigColor("Aktuelles Fach: Text", "highlight_current_text_color", "#ff1744") : b}
              ${t.highlight_current_time_text && t.show_time_column !== !1 ? this.renderConfigColor("Aktuelle Zeit: Text", "highlight_current_time_text_color", "#ff9100") : b}
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
              mode: "dropdown",
              options: [
                { value: "manual", label: "Manuell (rows)" },
                { value: "entity", label: "Stundenplan Suite (Integration)" },
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

            ${(t.source_type ?? "manual") === "entity" ? c`
                  <div class="hint">Stundenplan Suite: Wochensensor für Stundenplan24 oder Schulmanager auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), s = i.filter((n) => /^sensor\./.test(n) && (/_woche$/i.test(n) || this.hass?.states?.[n]?.attributes?.rows_table != null));
        return i.length < 5 || s.length === 0 ? c`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : c``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const n = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !n || /_woche$/i.test(n) || this.hass?.states?.[n]?.attributes?.rows_table != null;
      }}
                      .label=${"Stundenplan Suite Sensor"}
                      @value-changed=${(i) => {
        try {
          const s = i.detail?.value ?? i.target?.value, n = typeof s == "string" ? s : s && typeof s == "object" ? s.entity_id : void 0;
          this.setSourceEntity(n);
        } catch (s) {
          console.error("stundenplan-card editor: setSourceEntity failed", s);
        }
      }}
                    ></ha-entity-picker>
                  ` : c``}

                  ${this.isHaEntityPickerAvailable() ? b : c`<ha-input
                    label="Stundenplan Suite Entity-ID"
                    .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-input>`}
                ` : c``}

            ${(t.source_type ?? "manual") === "sensor" ? c`
                  <div class="hint">Beliebiger Sensor (JSON): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
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
                  ` : c``}

                  ${this.isHaEntityPickerAvailable() ? b : c`<ha-input
                    label="Sensor Entity-ID (manuell)"
                    .value=${t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-input>`}

                  <div class="grid2">
                    <ha-input label="Attribut" .value=${t.source_attribute ?? ""} @input=${(i) => this.onText(i, "source_attribute")} @change=${(i) => this.onText(i, "source_attribute")} @value-changed=${(i) => this.onText(i, "source_attribute")} placeholder="plan"></ha-input>
                    <ha-input label="Time-Key" .value=${t.source_time_key ?? ""} @input=${(i) => this.onText(i, "source_time_key")} @change=${(i) => this.onText(i, "source_time_key")} @value-changed=${(i) => this.onText(i, "source_time_key")} placeholder="Stunde"></ha-input>
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
        week_a_is_even_kw: V(t.week_a_is_even_kw, !0)
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
          typeof r == "boolean" && r !== V(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
        } catch (s) {
          console.error("stundenplan-card editor: week settings change failed", s);
        }
      }}
                    ></ha-form>
                  </div>
` : c``}

          `
    )}

        ${(t.source_type ?? "manual") === "manual" ? this.renderSection("Manueller Stundenplan", "manual", this.renderManualRows()) : b}
      </div>
    `;
  }
};
Kt.properties = {
  hass: {},
  _config: { state: !0 }
}, Kt.styles = Te`
    :host {
      display: block;
      min-width: 0;
      container-type: inline-size;
      color: var(--primary-text-color);
    }
    *, *::before, *::after { box-sizing: border-box; }
    ha-input, ha-form, ha-entity-picker { display: block; min-width: 0; width: 100%; }
    ha-switch { flex: 0 0 auto; }
    .wrap {
      padding: 8px;
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
      gap: 10px;
    }
    .sectionBody > *, .grid2 > *, .optRow > div { min-width: 0; }
    .stack, .toggleGroup { display: grid; gap: 10px; min-width: 0; }
    .toggleGroup { gap: 0; }
    .toggleRow {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 7px 0; font-size: 14px; cursor: pointer;
    }
    .toggleRow span { min-width: 0; overflow-wrap: anywhere; }
    .grid2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
    .sub { font-size: 12px; line-height: 1.4; opacity: 0.75; }
    .hint, .sub, .optTitle { overflow-wrap: anywhere; }
    .infoBox {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(3, 169, 244, 0.10);
      border: 1px solid rgba(3, 169, 244, 0.35);
      line-height: 1.45;
      margin-bottom: 12px;
    }
    .infoBox.slim {
      margin-bottom: 0;
      display: flex;
      align-items: center;
      min-height: 0;
    }
    .generalDivider {
      margin: 8px 0 0;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.02em;
      color: var(--primary-text-color);
    }
    .generalDivider.first {
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }
    .generalDivider.gridFull {
      grid-column: 1 / -1;
      margin-top: 6px;
    }
    .gridFull {
      grid-column: 1 / -1;
    }
    .generalHint {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
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

    @container (max-width: 390px) {
      .grid2 {
        grid-template-columns: minmax(0, 1fr);
      }
      .grid3 {
        grid-template-columns: 1fr;
      }
    }

    /* ---- Manual Rows Editor (classic accordion UI) ---- */
    .manualWeekBox {
      display: grid;
      gap: 10px;
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: rgba(255,255,255,0.02);
    }
    .manualWeekTabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .spBtnActive {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    }
    .rowsTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 6px;
      flex-wrap: wrap;
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
      padding: 8px 10px;
      border-radius: 10px;
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
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
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
    .colorPicker { min-width: 0; margin: 0; padding: 10px; border: 1px solid var(--divider-color); border-radius: 10px; }
    .colorPicker legend { padding: 0 5px; font-size: 13px; font-weight: 600; }
    .palette { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
    .swatch { width: 25px; height: 25px; padding: 0; border: 1px solid var(--divider-color); border-radius: 50%; background: var(--swatch); cursor: pointer; }
    .swatch[aria-pressed="true"] { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .customColor { width: 32px; height: 28px; padding: 1px; border: 1px solid var(--divider-color); border-radius: 5px; background: transparent; cursor: pointer; }
    .opacityControl { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 12px; font-size: 12px; }
    .opacityControl input { min-width: 40px; width: 0; flex: 1; accent-color: var(--primary-color); }
    .opacityControl output { width: 35px; text-align: right; }
    .colorFooter { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 8px; font-size: 12px; }
    .colorPreview { width: 24px; height: 18px; border: 1px solid var(--divider-color); border-radius: 4px; }
    .resetColor { border: 0; background: transparent; color: var(--primary-color); cursor: pointer; font: inherit; padding: 4px 0; }
    .colorAdvanced { flex: 1; min-width: 0; }
    .colorAdvanced summary { cursor: pointer; opacity: 0.75; }
    .colorAdvanced input { width: 100%; min-width: 0; margin-top: 6px; background: var(--secondary-background-color); color: var(--primary-text-color); border: 1px solid var(--divider-color); padding: 6px; border-radius: 4px; }
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
let He = Kt;
R([
  U()
], He.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", It);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", He);
window.__STUNDENPLAN_CARD_VERSION = "v3.4.0";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v3.4.0 (marker: STUNDENPLAN_CARD_v3.4.0)",
  preview: !0
});
export {
  It as StundenplanCard,
  He as StundenplanCardEditor
};
