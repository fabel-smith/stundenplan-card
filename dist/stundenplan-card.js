const bt = globalThis, Bt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Lt = /* @__PURE__ */ Symbol(), qt = /* @__PURE__ */ new WeakMap();
let de = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Bt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = qt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && qt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ee = (e) => new de(typeof e == "string" ? e : e + "", void 0, Lt), ue = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new de(i, e, Lt);
}, Me = (e, t) => {
  if (Bt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = bt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Gt = Bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Ee(i);
})(e) : e, { is: Ce, defineProperty: De, getOwnPropertyDescriptor: Te, getOwnPropertyNames: Ne, getOwnPropertySymbols: je, getPrototypeOf: Pe } = Object, W = globalThis, Qt = W.trustedTypes, Re = Qt ? Qt.emptyScript : "", ze = W.reactiveElementPolyfillSupport, rt = (e, t) => e, Ct = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Re : null;
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
} }, Ft = (e, t) => !Ce(e, t), Xt = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: Ft };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), W.litPropertyMetadata ?? (W.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Xt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && De(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: n } = Te(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Xt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(rt("elementProperties"))) return;
    const e = Pe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(rt("properties"))) {
      const t = this.properties, i = [...Ne(t), ...je(t)];
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
      for (const s of i) t.unshift(Gt(s));
    } else e !== void 0 && t.push(Gt(e));
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
    return Me(e, this.constructor.elementStyles), e;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ct).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ct;
      this._$Em = s;
      const o = r.fromAttribute(t, n.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, n) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[e]), i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? Ft)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
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
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[rt("elementProperties")] = /* @__PURE__ */ new Map(), Z[rt("finalized")] = /* @__PURE__ */ new Map(), ze?.({ ReactiveElement: Z }), (W.reactiveElementVersions ?? (W.reactiveElementVersions = [])).push("2.1.2");
const ot = globalThis, te = (e) => e, Dt = ot.trustedTypes, ee = Dt ? Dt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ge = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + O, Oe = `<${pe}>`, Y = document, lt = () => Y.createComment(""), ct = (e) => e === null || typeof e != "object" && typeof e != "function", It = Array.isArray, We = (e) => It(e) || typeof e?.[Symbol.iterator] == "function", Ot = `[ 	
\f\r]`, st = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, se = />/g, I = RegExp(`>|${Ot}(?:([^\\s"'>=/]+)(${Ot}*=${Ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ne = /'/g, re = /"/g, _e = /^(?:script|style|textarea|title)$/i, Ue = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = Ue(1), Q = /* @__PURE__ */ Symbol.for("lit-noChange"), $ = /* @__PURE__ */ Symbol.for("lit-nothing"), oe = /* @__PURE__ */ new WeakMap(), V = Y.createTreeWalker(Y, 129);
function fe(e, t) {
  if (!It(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ee !== void 0 ? ee.createHTML(t) : t;
}
const He = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = st;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, _, u = -1, h = 0;
    for (; h < l.length && (o.lastIndex = h, _ = o.exec(l), _ !== null); ) h = o.lastIndex, o === st ? _[1] === "!--" ? o = ie : _[1] !== void 0 ? o = se : _[2] !== void 0 ? (_e.test(_[2]) && (n = RegExp("</" + _[2], "g")), o = I) : _[3] !== void 0 && (o = I) : o === I ? _[0] === ">" ? (o = n ?? st, u = -1) : _[1] === void 0 ? u = -2 : (u = o.lastIndex - _[2].length, d = _[1], o = _[3] === void 0 ? I : _[3] === '"' ? re : ne) : o === re || o === ne ? o = I : o === ie || o === se ? o = st : (o = I, n = void 0);
    const g = o === I && e[a + 1].startsWith("/>") ? " " : "";
    r += o === st ? l + Oe : u >= 0 ? (s.push(d), l.slice(0, u) + ge + l.slice(u) + O + g) : l + O + (u === -2 ? a : g);
  }
  return [fe(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class ht {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [d, _] = He(t, i);
    if (this.el = ht.createElement(d, s), V.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = V.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(ge)) {
          const h = _[o++], g = n.getAttribute(u).split(O), f = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: r, name: f[2], strings: g, ctor: f[1] === "." ? Le : f[1] === "?" ? Fe : f[1] === "@" ? Ie : Tt }), n.removeAttribute(u);
        } else u.startsWith(O) && (l.push({ type: 6, index: r }), n.removeAttribute(u));
        if (_e.test(n.tagName)) {
          const u = n.textContent.split(O), h = u.length - 1;
          if (h > 0) {
            n.textContent = Dt ? Dt.emptyScript : "";
            for (let g = 0; g < h; g++) n.append(u[g], lt()), V.nextNode(), l.push({ type: 2, index: ++r });
            n.append(u[h], lt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === pe) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(O, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += O.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = Y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function X(e, t, i = e, s) {
  if (t === Q) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = ct(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = X(e, n._$AS(e, t.values), n, s)), t;
}
class Be {
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
    V.currentNode = n;
    let r = V.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new dt(r, r.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (d = new Ve(r, this, t)), this._$AV.push(d), l = s[++a];
      }
      o !== l?.index && (r = V.nextNode(), o++);
    }
    return V.currentNode = Y, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class dt {
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
    t = X(this, t, i), ct(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== Q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : We(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && ct(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = ht.createElement(fe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new Be(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = oe.get(t.strings);
    return i === void 0 && oe.set(t.strings, i = new ht(t)), i;
  }
  k(t) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new dt(this.O(lt()), this.O(lt()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = te(t).nextSibling;
      te(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Tt {
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
    let o = !1;
    if (r === void 0) t = X(this, t, i, 0), o = !ct(t) || t !== this._$AH && t !== Q, o && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = r[0], l = 0; l < r.length - 1; l++) d = X(this, a[s + l], i, l), d === Q && (d = this._$AH[l]), o || (o = !ct(d) || d !== this._$AH[l]), d === $ ? t = $ : t !== $ && (t += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Le extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Fe extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Ie extends Tt {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = X(this, t, i, 0) ?? $) === Q) return;
    const s = this._$AH, n = t === $ && s !== $ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== $ && (s === $ || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ve {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    X(this, t);
  }
}
const Ye = ot.litHtmlPolyfillSupport;
Ye?.(ht, dt), (ot.litHtmlVersions ?? (ot.litHtmlVersions = [])).push("3.3.2");
const Je = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new dt(t.insertBefore(lt(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
}, at = globalThis;
class q extends Z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Je(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Q;
  }
}
q._$litElement$ = !0, q.finalized = !0, at.litElementHydrateSupport?.({ LitElement: q });
const Ke = at.litElementPolyfillSupport;
Ke?.({ LitElement: q });
(at.litElementVersions ?? (at.litElementVersions = [])).push("4.2.2");
const Ze = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: Ft }, qe = (e = Ze, t, i) => {
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
function me(e) {
  return (t, i) => typeof i == "object" ? qe(e, t, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
function U(e) {
  return me({ ...e, state: !0, attribute: !1 });
}
var Ge = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, ye = (e) => {
  throw TypeError(e);
}, C = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Qe(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Ge(t, i, n), n;
}, we = (e, t, i) => t.has(e) || ye("Cannot " + i), P = (e, t, i) => (we(e, t, "read from private field"), i ? i.call(e) : t.get(e)), R = (e, t, i) => t.has(e) ? ye("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), z = (e, t, i, s) => (we(e, t, "write to private field"), t.set(e, i), i), vt, $t, xt, St, kt, At, Et, Mt;
function G(e) {
  return !!e && e.break === !0;
}
function Vt(e) {
  return Math.min(1, Math.max(0, e));
}
function be(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
  return [i, s, n].some((r) => Number.isNaN(r)) ? null : { r: i, g: s, b: n };
}
function Xe(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Vt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function ti(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = be(t);
  if (!i) return t;
  const s = typeof e.bg_alpha == "number" ? Vt(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
}
function ei(e, t) {
  const i = [], s = ti(e);
  return s && i.push(`background:${s}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function ae(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const s = be(i);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${Vt(t)})` : i;
  }
  return i;
}
function yt(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function Wt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ii(e) {
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
function le(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const s = t.getUTCFullYear(), n = new Date(Date.UTC(s, 0, 1)), r = n.getUTCDay() === 0 ? 7 : n.getUTCDay(), o = new Date(n);
  o.setUTCDate(n.getUTCDate() + (4 - r));
  const a = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(a / (10080 * 60 * 1e3)), isoYear: s };
}
function ce(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function wt(e) {
  const t = (e ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "—" || /^(—|\-|–|\s)+$/.test(t));
}
function si(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), s = i.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const n = i.match(/^stundenplan_woche_(.+)$/i);
  return n?.[1] ? `number.${n[1]}_woche_offset` : "";
}
function he(e) {
  const t = Wt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var nt;
const D = (nt = class extends q {
  constructor() {
    super(...arguments), R(this, vt), R(this, $t), R(this, xt, []), R(this, St, !1), R(this, kt, ""), R(this, At, null), R(this, Et, "idle"), R(this, Mt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return P(this, vt);
  }
  set hass(e) {
    z(this, vt, e);
    try {
      const t = this.config;
      if ((t?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (t?.view_mode ?? "week").toString(), d = Number(t?.days_ahead), _ = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0;
          if (l === "rolling" && _ === 0) {
            const u = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (u && e?.states?.[u]) {
              const h = Number(e.states[u].state);
              Number.isFinite(h) && h !== 0 && (e.callService("number", "set_value", { entity_id: u, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const g = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim();
                  g && this.hass?.callService("homeassistant", "update_entity", { entity_id: g });
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
          const d = l && n?.states && l in n.states, _ = s + "|" + l;
          if (d && this.__autokickSig !== _) {
            this.__autokickSig = _;
            const u = n.states[l]?.state, h = Number(u), g = Number.isFinite(h) ? h : 0;
            n.callService("number", "set_value", { entity_id: l, value: g }).catch?.(() => {
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
    return P(this, $t);
  }
  set config(e) {
    z(this, $t, e);
  }
  get _rowsCache() {
    return P(this, xt);
  }
  set _rowsCache(e) {
    z(this, xt, e);
  }
  get _noData() {
    return P(this, St);
  }
  set _noData(e) {
    z(this, St, e);
  }
  get _noDataMsg() {
    return P(this, kt);
  }
  set _noDataMsg(e) {
    z(this, kt, e);
  }
  get _jsonRows() {
    return P(this, At);
  }
  set _jsonRows(e) {
    z(this, At, e);
  }
  get _jsonStatus() {
    return P(this, Et);
  }
  set _jsonStatus(e) {
    z(this, Et, e);
  }
  get _jsonError() {
    return P(this, Mt);
  }
  set _jsonError(e) {
    z(this, Mt, e);
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
      days: ["Mo", "Di", "Mi", "Do", "Fr"],
      view_mode: "week",
      display_mode: "default",
      days_ahead: 0,
      rolling_switch_mode: "midnight",
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
      rows: []
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(e) {
    const t = nt.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
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
    const t = nt.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((y) => (y ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(e.rows) ? e.rows : []).map((y) => {
      if (G(y))
        return { break: !0, time: (y.time ?? "").toString(), label: (y.label ?? "Pause").toString() };
      const A = Array.isArray(y?.cells) ? y.cells : [], T = Array.from({ length: i.length }, (N, B) => (A[B] ?? "").toString()), H = Array.isArray(y?.cell_styles) ? y.cell_styles : [], tt = Array.from({ length: i.length }, (N, B) => Xe(H[B])), ut = (y?.time ?? "").toString(), et = yt(ut), Nt = (y?.start ?? "").toString().trim(), jt = (y?.end ?? "").toString().trim(), gt = {
        time: ut,
        start: Nt || et.start || void 0,
        end: jt || et.end || void 0,
        cells: T
      };
      return tt.some((N) => !!N) && (gt.cell_styles = tt), gt;
    }), n = ((e.view_mode ?? "week") + "").toString().trim(), r = n === "rolling" ? "rolling" : "week", o = ((e.display_mode ?? "default") + "").toString().trim(), a = o === "compact" ? "compact" : "default", l = Number(e.days_ahead), d = Number.isFinite(l) ? Math.max(0, Math.min(6, Math.floor(l))) : 0, _ = ((e.rolling_switch_mode ?? t.rolling_switch_mode ?? "midnight") + "").toString().trim(), u = _ === "after_last_lesson" || _ === "fixed_time" ? _ : "midnight", h = ((e.rolling_switch_time ?? t.rolling_switch_time ?? "") + "").toString().trim(), g = ((e.week_mode ?? t.week_mode) + "").toString().trim(), f = g === "kw_parity" || g === "week_map" || g === "off" ? g : "off", p = (() => {
      const y = ((e.source_type ?? "") + "").toString().trim();
      if (y === "manual" || y === "entity" || y === "json" || y === "sensor") return y;
      const A = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (A) {
        const T = ((e.source_attribute ?? "") + "").toString().trim(), H = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(A) && (T === "" || T === "rows_table") && (H === "" || H === "time")) && (T || H) ? "legacy" : "entity";
      }
      return "manual";
    })(), m = (e.source_entity ?? t.source_entity).toString().trim(), x = (e.source_entity_integration ?? "").toString().trim(), S = (e.source_entity_legacy ?? "").toString().trim(), k = p === "sensor" ? S || m : p === "entity" && x || m, v = (e.week_offset_entity ?? "").toString().trim() || si(k);
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      show_title: e.show_title ?? t.show_title,
      title_font_size: Number.isFinite(Number(e.title_font_size)) ? Math.max(0, Math.min(40, Number(e.title_font_size))) : t.title_font_size,
      title_font_family: (e.title_font_family ?? t.title_font_family ?? "").toString(),
      show_header_date: e.show_header_date ?? t.show_header_date,
      days: i,
      view_mode: r,
      display_mode: a,
      days_ahead: d,
      rolling_switch_mode: u,
      rolling_switch_time: h,
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
      source_entity: k,
      source_entity_integration: x || "",
      source_entity_legacy: S || "",
      source_attribute: p === "entity" ? "rows_table" : ((e.source_attribute ?? t.source_attribute ?? "plan") + "").toString(),
      source_time_key: p === "entity" ? "time" : ((e.source_time_key ?? t.source_time_key ?? "Stunde") + "").toString(),
      source_type: p,
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
  getTodayIndex(e, t) {
    const i = /* @__PURE__ */ new Date(), s = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(t) && t.length) {
      const l = t.map((d) => {
        if (d instanceof Date && !Number.isNaN(d.getTime()))
          return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
        const _ = (d ?? "").toString().trim(), u = _.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return u ? `${u[1]}${u[2]}${u[3]}` : _;
      }).indexOf(s);
      return l >= 0 ? l : -1;
    }
    const n = i.getDay(), r = new Set(ii(n).map(Wt));
    if (!r.size) return -1;
    const o = (e ?? []).map((a) => Wt(a));
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
      const l = (a?.time ?? a?.[s] ?? a?.[n] ?? a?.[r] ?? "").toString(), d = yt(l), _ = Array.from({ length: i.length }, (g, f) => {
        const p = (i[f] ?? "").toString();
        return (a?.[p] ?? "").toString();
      }), u = (a?.start ?? "").toString().trim() || d.start, h = (a?.end ?? "").toString().trim() || d.end;
      return { time: l, start: u || void 0, end: h || void 0, cells: _ };
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
    const { isoWeek: t } = le(/* @__PURE__ */ new Date()), i = t % 2 === 0, s = !!e.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(t, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: n, isoYear: r } = le(/* @__PURE__ */ new Date()), o = String(n), a = String(r);
    if (s?.[a] && typeof s[a] == "object") {
      const d = ce(s[a][o]);
      if (d) return d;
    }
    return ce(s?.[o]) || null;
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
    return (t ?? []).findIndex((s) => he(s) === i);
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
      if (!G(i) && i?.end) return (i.end + "").toString().trim();
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
  getRollingVisibleSlots(e, t) {
    const i = e.days ?? [];
    if (!i.length) return [];
    const s = /* @__PURE__ */ new Date();
    let n = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 12, 0, 0, 0);
    this.isConfiguredSchoolday(n, i) ? this.shouldAdvanceRollingDay(e, s) && (n = this.nextConfiguredSchoolday(n, i)) : n = this.nextConfiguredSchoolday(n, i);
    const r = [], o = Math.max(0, Math.min(6, t));
    let a = new Date(n);
    for (let l = 0; l <= o; l++) {
      const d = this.findConfiguredDayIndexForDate(a, i);
      d >= 0 && r.push({ orig: d, date: new Date(a) }), a = this.nextConfiguredSchoolday(a, i);
    }
    return r;
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
        history.pushState(null, "", n), Ut(window, "location-changed", { replace: !1 });
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
        Ut(this, "hass-more-info", { entityId: n });
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
      const a = Number(o[1]), l = Number(o[2]), d = Number(o[3]), _ = new Date(a, l - 1, d, 12, 0, 0, 0);
      Number.isNaN(_.getTime()) || n.push(_);
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
      return Array.from({ length: r }, (_, u) => (o[u] ?? l ?? "").toString().trim());
    }
    const a = (n?.updated_raw ?? n?.updated ?? "").toString().trim();
    return a ? Array.from({ length: r }, () => a) : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const n = this.getActiveWeek(e), r = (e.source_entity_a ?? "").trim(), o = (e.source_entity_b ?? "").trim(), a = (e.source_attribute_a ?? "").trim(), l = (e.source_attribute_b ?? "").trim();
      if (n === "A" && r)
        return this.getRowsFromEntity(e, r, a) ?? [];
      if (n === "B" && o)
        return this.getRowsFromEntity(e, o, l) ?? [];
      const d = i;
      return d ? this.getRowsFromEntity(e, d, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
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
`).map((h) => h.trim()).filter((h) => h.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const n = i[0];
    if (/^(—|\-|–|---)$/.test(n)) return null;
    const r = (h) => {
      const g = (h ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(g) || /\bfällt\s+aus\b/i.test(g) || /\bverlegt\b/i.test(g) || /\bentfällt\b/i.test(g) || /\bvertretung\b/i.test(g) || /\bstatt\b/i.test(g) || /\bgehalten\b/i.test(g) || /\bAufgaben\b/i.test(g) || /^für\b/i.test(g);
    }, o = (h) => {
      const g = (h ?? "").toString().trim();
      return /^\d{1,4}$/.test(g) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(g) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(g);
    }, a = i.slice(1);
    let l = -1;
    for (let h = 0; h < a.length; h++)
      if (!r(a[h]) && o(a[h])) {
        l = h;
        break;
      }
    if (l < 0) {
      for (let h = a.length - 1; h >= 0; h--)
        if (o(a[h])) {
          l = h;
          break;
        }
    }
    if (l < 0) return null;
    const d = a[l];
    let _;
    for (let h = l + 1; h < a.length; h++) {
      const g = a[h];
      if (!r(g) && !o(g)) {
        _ = g;
        break;
      }
    }
    if (!_) {
      const h = a.filter((g) => !r(g) && !o(g));
      _ = h.length ? h[h.length - 1] : void 0;
    }
    const u = i.slice(1).filter((h) => r(h));
    return { fach: n, raum: d, lehrer: _, notes: u.length ? u : void 0 };
  }
  renderCell(e, t) {
    const i = (e ?? "").toString(), s = this.filterCellText(i, t);
    if (wt(s)) return c``;
    const n = (() => {
      let f = s.replace(/\r/g, "").split(`
`).map((m) => (m ?? "").toString().trim());
      for (; f.length && /^(—|–|-)$/.test(f[0]); ) f.shift();
      const p = [];
      for (const m of f) {
        const x = m.length === 0;
        if (!/^(—|–|-)$/.test(m)) {
          if (x) {
            if (p.length === 0 || p[p.length - 1] === "") continue;
            p.push("");
            continue;
          }
          p.push(m);
        }
      }
      for (; p.length && p[p.length - 1] === ""; ) p.pop();
      return p.join(`
`);
    })();
    if (wt(n)) return c``;
    const r = n.split(/\n\s*\n/).map((f) => f.trim()).filter(Boolean), o = this.parseCellTriplet(n), a = (f) => {
      if (f.startsWith("🔴")) return "note noteRed";
      if (f.startsWith("🟠")) return "note noteOrange";
      if (f.startsWith("🟡")) return "note noteYellow";
      const p = f;
      return /\bfällt\s+aus\b/i.test(p) || /\bverlegt\b/i.test(p) || /\bstatt\b/i.test(p) || /\bgehalten\b/i.test(p) || /\bentfällt\b/i.test(p) ? "note noteRed" : "note";
    }, l = (f) => (f ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim();
    if (r.length === 1 && o?.fach && o?.raum && o?.lehrer)
      return c`
        <div class="cellWrap">
          <div class="fach">${o.fach}</div>
          <div class="lehrer">${o.lehrer}</div>
          <div class="raum">${o.raum}</div>

          ${o.notes?.length ? c`
                <div class="notes">
                  ${o.notes.map((f) => {
        const p = a(f), m = l(f) || f;
        return c`<div class=${p}><span class="txt">${m}</span></div>`;
      })}
                </div>
              ` : c``}
        </div>
      `;
    const d = (f) => {
      const p = (f ?? "").toString().trim();
      if (!p) return c``;
      const m = this.parseCellTriplet(p);
      if (m?.fach && m?.raum && m?.lehrer)
        return c`
          <div class="cellWrap">
            <div class="fach">${m.fach}</div>
            <div class="lehrer">${m.lehrer}</div>
            <div class="raum">${m.raum}</div>

            ${m.notes?.length ? c`
                  <div class="notes">
                    ${m.notes.map((v) => {
          const y = a(v), A = l(v) || v;
          return c`<div class=${y}><span class="txt">${A}</span></div>`;
        })}
                  </div>
                ` : c``}
          </div>
        `;
      const x = p.split(`
`).map((v) => v.trim()).filter(Boolean), S = (x[0] ?? "").trim(), k = x.slice(1);
      return S && k.length ? c`
          <div class="cellWrap">
            <div class="fach">${S}</div>
            <div class="notes">
              ${k.map((v) => {
        const y = a(v), A = l(v) || v;
        return c`<div class=${y}><span class="txt">${A}</span></div>`;
      })}
            </div>
          </div>
        ` : c`<span class="cellText">${p}</span>`;
    };
    if (r.length > 1)
      return c`<div class="cellMulti">${r.map((f) => d(f))}</div>`;
    const _ = (n ?? "").split(`
`).map((f) => f.trim()).filter(Boolean), u = /^\d{1,4}$/, h = /^[A-ZÄÖÜ]{2,6}$/, g = (f) => {
      const p = (f ?? "").trim();
      if (!p || u.test(p) || h.test(p)) return !1;
      const m = p.toLowerCase();
      return m.startsWith("statt ") || m.includes("fällt aus") || m.includes("verlegt") || m.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(p) ? !1 : /[a-z0-9äöü]/i.test(p);
    };
    if (_.length >= 6 && _.length % 3 === 0) {
      const f = [];
      for (let p = 0; p < _.length; p += 3) {
        const m = _[p] ?? "", x = _[p + 1] ?? "", S = _[p + 2] ?? "";
        if (!g(m) || !u.test(x) || !h.test(S)) {
          f.length = 0;
          break;
        }
        f.push([m, x, S].join(`
`));
      }
      if (f.length >= 2)
        return c`<div class="cellMulti">${f.map((p) => d(p))}</div>`;
    }
    return d(n);
  }
  renderCardLayout(e, t = null, i = !1) {
    const s = this._rowsCache, n = this.getHeaderDaysFromEntity(e), r = this.getTodayIndex(e.days ?? [], n), o = ((t ?? this._uiViewMode ?? e.view_mode ?? "week") + "").toString(), a = Number(e.days_ahead), l = Number.isFinite(a) ? Math.max(0, Math.min(6, Math.floor(a))) : 0, d = "1px solid var(--divider-color)", _ = ae(e.highlight_today_color ?? "", 0.12), u = ae(e.highlight_current_color ?? "", 0.18), h = (e.highlight_current_text_color ?? "").toString().trim(), g = (e.highlight_current_time_text_color ?? "").toString().trim(), f = e.week_mode !== "off", p = f ? this.getActiveWeek(e) : null, m = this.getWeekOffsetValue(e), x = (e.source_type ?? "manual").toString(), S = !i && (e.week_offset_entity ?? "").trim().length > 0, k = S && (x === "entity" || x === "sensor" && (e.week_mode ?? "off") !== "off"), v = n && n.length >= (e.days?.length ?? 0) ? n : null, y = this.getHeaderUpdatedFromEntity(e), A = this.getBaseDate(e), T = this.mondayOfWeek(A), H = this.normalizeTapAction(e.tap_action), tt = i ? "default" : e.display_mode ?? "default", ut = `${tt === "compact" ? "compact" : ""}${!i && H.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}`, et = e.show_title !== !1 && (e.title ?? "").toString().trim().length > 0, Nt = this.getTitleStyle(e), jt = et || f || k, gt = o === "rolling" && (i || !k || (m ?? 0) === 0), N = gt ? this.getRollingVisibleSlots(e, l) : [], B = N.length ? N.map((w) => w.orig) : Array.from({ length: e.days?.length ?? 0 }, (w, b) => b), pt = B.map((w) => e.days[w]), L = N.length ? N.map((w) => w.date) : null, Yt = (() => {
      const w = /* @__PURE__ */ new Map();
      return !v || !y || v.forEach((b, M) => {
        const J = y[M];
        b instanceof Date && J && w.set(this.fmtYMD(b), J);
      }), w;
    })();
    return c`
      <ha-card class=${ut} @click=${i ? (w) => this.closeWeekPopup(w) : (w) => this.handleCardAction(e, w)}>
        ${jt ? c`<div class="headerRow">
          ${et ? c`<div class="title" style=${Nt}>${e.title ?? ""}</div>` : c`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${f ? c`<div class="weekBadgeInline">Woche <b>${p}</b></div>` : c``}

            ${k ? c`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${(w) => {
      w.stopPropagation(), m != null && this.setWeekOffset(e, m - 1);
    }}>&lt;</button>
                    <div class="offsetVal">${m ?? "?"}</div>
                    <button class="btnMini" @click=${(w) => {
      w.stopPropagation(), m != null && this.setWeekOffset(e, m + 1);
    }}>&gt;</button>
                  </div>
                ` : c``}
          </div>
        </div>` : c``}

        <div class="card">
          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${pt.map((w, b) => {
      const M = B[b], J = e.highlight_today && (L ? this.fmtYMD(L[b]) === this.fmtYMD(/* @__PURE__ */ new Date()) : M === r) ? "today" : "";
      let j = "";
      if (L?.[b] instanceof Date)
        j = this.fmtDDMMYYYY(L[b]);
      else if (v)
        j = this.fmtDDMMYYYY(v[M]);
      else {
        const _t = he(w);
        if (_t) {
          const ft = new Date(T);
          ft.setDate(T.getDate() + (_t - 1)), j = this.fmtDDMMYYYY(ft);
        }
      }
      return c`
                    <th class=${J} style=${`--sp-hl:${_};`}>
                      <div>${w}</div>
                      ${e.show_header_date !== !1 ? c`<div class="thDate">${j}</div>` : c``}
                      ${L?.[b] ? Yt.get(this.fmtYMD(L[b])) ? c`<div class="thUpdated">(aktualisiert: ${Yt.get(this.fmtYMD(L[b]))})</div>` : c`` : y?.[M] ? c`<div class="thUpdated">(aktualisiert: ${y[M]})</div>` : c``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${pt.length + 1}>${this._noDataMsg}</td></tr>` : s.map((w) => {
      if (G(w)) {
        const it = yt(w.time), zt = !!it.start && !!it.end && this.isNowBetween(it.start, it.end), F = !!e.highlight_breaks && zt;
        let K = `--sp-hl:${u};`, mt = "";
        return F && (K += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", mt += `--sp-hl:${u}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), F && e.highlight_current_time_text && g && (K += `color:${g};`), c`
                    <tr class="break">
                      <td class="time" style=${K}>${w.time}</td>
                      <td colspan=${pt.length} style=${mt}>${w.label ?? ""}</td>
                    </tr>
                  `;
      }
      const b = w, M = b.cells ?? [], J = b.cell_styles ?? [], j = !!b.start && !!b.end && this.isNowBetween(b.start, b.end), _t = r >= 0 ? M[r] ?? "" : "", ft = r >= 0 ? this.filterCellText(_t, e) : "", xe = r >= 0 ? wt(ft) : !1, Pt = !(e.free_only_column_highlight && xe), Jt = yt(b.time), Se = !!(Jt.start && Jt.end), Kt = !Se && b.start && b.end ? `${b.start}–${b.end}` : "";
      let Rt = `--sp-hl:${u};`;
      return Pt && e.highlight_current && j && (Rt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), Pt && j && e.highlight_current_time_text && g && (Rt += `color:${g};`), c`
                  <tr>
                    <td class="time" style=${Rt}>
                      <div class="timeWrap">
                        <div class="timeSt">${b.time}</div>
                        ${Kt ? c`<div class="timeHm">${Kt}</div>` : c``}
                      </div>
                    </td>

                    ${pt.map((it, zt) => {
        const F = B[zt], K = this.filterCellText(M[F] ?? "", e), mt = J[F] ?? null, ke = e.highlight_today && F === r ? "today" : "";
        let Zt = `--sp-hl:${_};` + ei(mt, d);
        const Ae = !wt(K);
        return Pt && Ae && j && e.highlight_current_text && h && r >= 0 && F === r && (Zt += `color:${h};`), c`<td class=${ke} style=${Zt}>${this.renderCell(K, e)}</td>`;
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
}, nt.styles = ue`
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
`, nt);
vt = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
xt = /* @__PURE__ */ new WeakMap();
St = /* @__PURE__ */ new WeakMap();
kt = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakMap();
Mt = /* @__PURE__ */ new WeakMap();
C([
  me({ attribute: !1 })
], D.prototype, "hass", 1);
C([
  U()
], D.prototype, "config", 1);
C([
  U()
], D.prototype, "_rowsCache", 1);
C([
  U()
], D.prototype, "_noData", 1);
C([
  U()
], D.prototype, "_noDataMsg", 1);
C([
  U()
], D.prototype, "_jsonRows", 1);
C([
  U()
], D.prototype, "_jsonStatus", 1);
C([
  U()
], D.prototype, "_jsonError", 1);
let ve = D;
function Ut(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function E(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function ni(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function ri(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Ht = class extends q {
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
    return new ve().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Ut(this, "config-changed", { config: t });
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
    if (!r || G(r)) return;
    const o = r, a = Array.isArray(o.cells) ? o.cells.slice() : [];
    a[i] = s, n[t] = { ...o, cells: a }, this.emit({ ...this._config, rows: n });
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
        const o = (r.time ?? "").toString(), a = (r.label ?? "Pause").toString();
        n[t] = { break: !0, time: o, label: a };
      } else {
        const o = (r.time ?? "").toString();
        n[t] = { time: o, start: "", end: "", cells: Array.from({ length: s.length }, () => "") };
      }
      this.emit({ ...this._config, rows: n });
    }
  }
  updateManualCellStyle(t, i, s) {
    if (!this._config) return;
    const n = Array.isArray(this._config.rows) ? this.clone(this._config.rows) : [], r = n[t];
    if (!r || G(r)) return;
    const o = r, a = Array.isArray(o.cell_styles) ? o.cell_styles.slice() : [], l = a[i] ?? {};
    a[i] = { ...l, ...s }, n[t] = { ...o, cell_styles: a }, this.emit({ ...this._config, rows: n });
  }
  renderManualRows() {
    if (!this._config) return c``;
    const t = this._config, i = t.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = Array.isArray(t.rows) ? t.rows : [];
    return c`
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

      ${s.map((n, r) => {
      const o = G(n), a = o ? `Pause · ${(n.time ?? "").toString()}` : `Stunde · ${(n.time ?? "").toString()}`, l = n, d = (l.start ?? "").toString(), _ = (l.end ?? "").toString(), u = (n.label ?? "Pause").toString();
      return c`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[r] ?? !1}
            @toggle=${(h) => {
        try {
          this._rowOpen[r] = !!h?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${a || `Zeile ${r + 1}`}</div>
                <div class="rowHeadMeta">${o ? u : `${d || "Start?"} – ${_ || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-textfield
                  label="Zeit / Stunde"
                  .value=${(n.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(h) => this.updateManualRow(r, { time: h?.target?.value ?? "" })}
                ></ha-textfield>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${o} @change=${(h) => this.toggleManualBreak(r, !!h?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${o ? c`
                    <ha-textfield
                      label="Pausentext"
                      .value=${u}
                      placeholder="z. B. Große Pause"
                      @input=${(h) => this.updateManualRow(r, { label: h?.target?.value ?? "" })}
                    ></ha-textfield>
                  ` : c`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-textfield
                        label="Start (HH:MM)"
                        .value=${d}
                        @input=${(h) => this.updateManualRow(r, { start: h?.target?.value ?? "" })}
                      ></ha-textfield>
                      <ha-textfield
                        label="Ende (HH:MM)"
                        .value=${_}
                        @input=${(h) => this.updateManualRow(r, { end: h?.target?.value ?? "" })}
                      ></ha-textfield>
                    </div>

                    <div class="cellsGrid" style=${`grid-template-columns: repeat(${i.length}, minmax(220px, 1fr));`}>
                      ${i.map((h, g) => {
        const f = (l.cells?.[g] ?? "").toString(), p = (Array.isArray(l.cell_styles) ? l.cell_styles?.[g] : void 0) ?? {}, m = (p?.bg ?? "#000000").toString(), x = typeof p?.bg_alpha == "number" && !Number.isNaN(p.bg_alpha) ? p.bg_alpha : 0.18, S = Math.round(x * 100), k = (p?.color ?? "#ffffff").toString();
        return c`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${h}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${f}
                              @input=${(v) => this.updateManualCell(r, g, v?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${m} @input=${(v) => this.updateManualCellStyle(r, g, { bg: v?.target?.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String(S)}
                                    @input=${(v) => this.updateManualCellStyle(r, g, { bg_alpha: Number(v?.target?.value ?? 0) / 100 })}
                                  />
                                  <div class="pct">${S}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${k} @input=${(v) => this.updateManualCellStyle(r, g, { color: v?.target?.value })} />
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
              <ha-textfield label="Titel der Karte" .value=${t.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-textfield>

              <ha-textfield
                label="Schultage (CSV)"
                .value=${ri(t.days ?? [])}
                @input=${(i) => this.setValue("days", ni(i.target.value))}
                helper="Beispiel: Mo, Di, Mi, Do, Fr"
              ></ha-textfield>
            </div>

            <div class="generalDivider">Titel & Kopfzeile</div>
            <div class="grid3">
              <ha-switch .checked=${E(t.show_title, !0)} @change=${(i) => this.onToggle(i, "show_title")}></ha-switch>
              <div class="switchLabel">Titelzeile anzeigen</div>
              <div></div>

              <ha-switch .checked=${E(t.show_header_date, !0)} @change=${(i) => this.onToggle(i, "show_header_date")}></ha-switch>
              <div class="switchLabel">Datum anzeigen</div>
              <div></div>

              <div></div>
              <ha-textfield
                label="Titelgröße (px)"
                type="number"
                .value=${String(t.title_font_size ?? 20)}
                @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("title_font_size", Number.isFinite(s) ? Math.max(10, Math.min(40, Math.floor(s))) : 20);
      }}
              ></ha-textfield>
              <ha-textfield
                label="Titel-Schriftfamilie (optional)"
                .value=${t.title_font_family ?? ""}
                @input=${(i) => this.onText(i, "title_font_family")}
              ></ha-textfield>
            </div>

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

              ${(t.view_mode ?? "week") === "rolling" ? c`
                <div class="generalDivider gridFull">Rolling</div>
                <ha-textfield
                  label="Zusätzliche Tage im Voraus"
                  type="number"
                  .value=${String(t.days_ahead ?? 0)}
                  @input=${(i) => {
        const s = Number(i.target.value);
        this.setValue("days_ahead", Number.isFinite(s) ? Math.max(0, Math.min(6, Math.floor(s))) : 0);
      }}
                  helper="0 = nur Starttag, 1 = Starttag + nächster Schultag"
                ></ha-textfield>

                <ha-form
                  .hass=${this.hass}
                  .data=${{ rolling_switch_mode: t.rolling_switch_mode ?? "midnight" }}
                  .schema=${[
        {
          name: "rolling_switch_mode",
          selector: {
            select: {
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
                  <ha-textfield
                    label="Umschaltzeit (HH:MM)"
                    .value=${t.rolling_switch_time ?? ""}
                    @input=${(i) => this.onText(i, "rolling_switch_time")}
                    helper="Beispiel: 15:00"
                  ></ha-textfield>
                ` : c`<div class="infoBox slim gridFull">${(t.rolling_switch_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung auf den nächsten Schultag folgt nach der letzten Endzeit aus deinem Plan." : "Der Sprung auf den nächsten Schultag folgt direkt ab Mitternacht."}</div>`}
              ` : c``}
            </div>

            <div class="hint">„Ab heute (rolling)“ zeigt ab dem Starttag die nächsten passenden Schultage. Beim Blättern in andere Wochen beginnt die Ansicht automatisch am Montag.</div>

            <div class="generalDivider">Tap-Aktion</div>
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{ tap_action_action: ((t.tap_action?.action ?? "none") + "").toString() }}
                .schema=${[
        {
          name: "tap_action_action",
          selector: {
            select: {
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
            <div class="grid3">
              <ha-switch .checked=${E(t.highlight_today, !0)} @change=${(i) => this.onToggle(i, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${E(t.highlight_current, !0)} @change=${(i) => this.onToggle(i, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${E(t.highlight_breaks, !1)} @change=${(i) => this.onToggle(i, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${E(t.free_only_column_highlight, !0)}
                @change=${(i) => this.onToggle(i, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${E(t.highlight_current_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-textfield label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_text_color")}></ha-textfield>

              <ha-switch .checked=${E(t.highlight_current_time_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_time_text")}></ha-switch>
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
                  <div class="hint">Stundenplan24: bitte einen <code>sensor.*_woche</code> auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), s = i.filter((n) => /^sensor\./.test(n) && /_woche$/i.test(n));
        return i.length < 5 || s.length === 0 ? c`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : c``;
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
                  ` : c``}

                  <ha-textfield
                    label="Stundenplan24 Entity-ID (manuell)"
                    .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-textfield>
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
        week_a_is_even_kw: E(t.week_a_is_even_kw, !0)
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
          typeof r == "boolean" && r !== E(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
        } catch (s) {
          console.error("stundenplan-card editor: week settings change failed", s);
        }
      }}
                    ></ha-form>
                  </div>
` : c``}

          `
    )}

        ${this.renderSection("Manuell (rows)", "manual", this.renderManualRows())}
      </div>
    `;
  }
};
Ht.properties = {
  hass: {},
  _config: { state: !0 }
}, Ht.styles = ue`
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
    .infoBox {
      padding: 12px 14px;
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
      min-height: 56px;
    }
    .generalDivider {
      margin: 18px 0 8px;
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
let $e = Ht;
C([
  U()
], $e.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", ve);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", $e);
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
  ve as StundenplanCard,
  $e as StundenplanCardEditor
};
