const bt = globalThis, Ut = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = /* @__PURE__ */ Symbol(), ee = /* @__PURE__ */ new WeakMap();
let fe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ut && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ee.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ee.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ye = (e) => new fe(typeof e == "string" ? e : e + "", void 0, Ht), ye = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new fe(i, e, Ht);
}, Ke = (e, t) => {
  if (Ut) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = bt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, ie = Ut ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Ye(i);
})(e) : e, { is: Je, defineProperty: Ze, getOwnPropertyDescriptor: qe, getOwnPropertyNames: Ge, getOwnPropertySymbols: Qe, getPrototypeOf: Xe } = Object, B = globalThis, se = B.trustedTypes, ti = se ? se.emptyScript : "", ei = B.reactiveElementPolyfillSupport, ot = (e, t) => e, Dt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ti : null;
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
} }, Ft = (e, t) => !Je(e, t), ne = { attribute: !0, type: String, converter: Dt, reflect: !1, useDefault: !1, hasChanged: Ft };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), B.litPropertyMetadata ?? (B.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let q = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ne) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Ze(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: n } = qe(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ot("elementProperties"))) return;
    const e = Xe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ot("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ot("properties"))) {
      const t = this.properties, i = [...Ge(t), ...Qe(t)];
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
      for (const s of i) t.unshift(ie(s));
    } else e !== void 0 && t.push(ie(e));
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
    return Ke(e, this.constructor.elementStyles), e;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Dt).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Dt;
      this._$Em = s;
      const a = r.fromAttribute(t, n.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[ot("elementProperties")] = /* @__PURE__ */ new Map(), q[ot("finalized")] = /* @__PURE__ */ new Map(), ei?.({ ReactiveElement: q }), (B.reactiveElementVersions ?? (B.reactiveElementVersions = [])).push("2.1.2");
const lt = globalThis, re = (e) => e, Ct = lt.trustedTypes, ae = Ct ? Ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, we = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, be = "?" + O, ii = `<${be}>`, I = document, ht = () => I.createComment(""), ut = (e) => e === null || typeof e != "object" && typeof e != "function", Lt = Array.isArray, si = (e) => Lt(e) || typeof e?.[Symbol.iterator] == "function", Wt = `[ 	
\f\r]`, nt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oe = /-->/g, le = />/g, L = RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, he = /"/g, ve = /^(?:script|style|textarea|title)$/i, ni = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = ni(1), X = /* @__PURE__ */ Symbol.for("lit-noChange"), x = /* @__PURE__ */ Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), V = I.createTreeWalker(I, 129);
function $e(e, t) {
  if (!Lt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ae !== void 0 ? ae.createHTML(t) : t;
}
const ri = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = nt;
  for (let o = 0; o < i; o++) {
    const l = e[o];
    let u, g, p = -1, d = 0;
    for (; d < l.length && (a.lastIndex = d, g = a.exec(l), g !== null); ) d = a.lastIndex, a === nt ? g[1] === "!--" ? a = oe : g[1] !== void 0 ? a = le : g[2] !== void 0 ? (ve.test(g[2]) && (n = RegExp("</" + g[2], "g")), a = L) : g[3] !== void 0 && (a = L) : a === L ? g[0] === ">" ? (a = n ?? nt, p = -1) : g[1] === void 0 ? p = -2 : (p = a.lastIndex - g[2].length, u = g[1], a = g[3] === void 0 ? L : g[3] === '"' ? he : ce) : a === he || a === ce ? a = L : a === oe || a === le ? a = nt : (a = L, n = void 0);
    const _ = a === L && e[o + 1].startsWith("/>") ? " " : "";
    r += a === nt ? l + ii : p >= 0 ? (s.push(u), l.slice(0, p) + we + l.slice(p) + O + _) : l + O + (p === -2 ? o : _);
  }
  return [$e(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class dt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [u, g] = ri(t, i);
    if (this.el = dt.createElement(u, s), V.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = V.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(we)) {
          const d = g[a++], _ = n.getAttribute(p).split(O), h = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: r, name: h[2], strings: _, ctor: h[1] === "." ? oi : h[1] === "?" ? li : h[1] === "@" ? ci : Tt }), n.removeAttribute(p);
        } else p.startsWith(O) && (l.push({ type: 6, index: r }), n.removeAttribute(p));
        if (ve.test(n.tagName)) {
          const p = n.textContent.split(O), d = p.length - 1;
          if (d > 0) {
            n.textContent = Ct ? Ct.emptyScript : "";
            for (let _ = 0; _ < d; _++) n.append(p[_], ht()), V.nextNode(), l.push({ type: 2, index: ++r });
            n.append(p[d], ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === be) l.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(O, p + 1)) !== -1; ) l.push({ type: 7, index: r }), p += O.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = I.createElement("template");
    return s.innerHTML = t, s;
  }
}
function tt(e, t, i = e, s) {
  if (t === X) return t;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = ut(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = tt(e, n._$AS(e, t.values), n, s)), t;
}
class ai {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (t?.creationScope ?? I).importNode(i, !0);
    V.currentNode = n;
    let r = V.nextNode(), a = 0, o = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new pt(r, r.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (u = new hi(r, this, t)), this._$AV.push(u), l = s[++o];
      }
      a !== l?.index && (r = V.nextNode(), a++);
    }
    return V.currentNode = I, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class pt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = tt(this, t, i), ut(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== X && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : si(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== x && ut(this._$AH) ? this._$AA.nextSibling.data = t : this.T(I.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = dt.createElement($e(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new ai(n, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = ue.get(t.strings);
    return i === void 0 && ue.set(t.strings, i = new dt(t)), i;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new pt(this.O(ht()), this.O(ht()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = re(t).nextSibling;
      re(t).remove(), t = s;
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
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = x;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = tt(this, t, i, 0), a = !ut(t) || t !== this._$AH && t !== X, a && (this._$AH = t);
    else {
      const o = t;
      let l, u;
      for (t = r[0], l = 0; l < r.length - 1; l++) u = tt(this, o[s + l], i, l), u === X && (u = this._$AH[l]), a || (a = !ut(u) || u !== this._$AH[l]), u === x ? t = x : t !== x && (t += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class oi extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }
}
class li extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== x);
  }
}
class ci extends Tt {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = tt(this, t, i, 0) ?? x) === X) return;
    const s = this._$AH, n = t === x && s !== x || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== x && (s === x || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class hi {
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
const ui = lt.litHtmlPolyfillSupport;
ui?.(dt, pt), (lt.litHtmlVersions ?? (lt.litHtmlVersions = [])).push("3.3.2");
const di = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new pt(t.insertBefore(ht(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
}, ct = globalThis;
class G extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = di(i, this.renderRoot, this.renderOptions);
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
G._$litElement$ = !0, G.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: G });
const pi = ct.litElementPolyfillSupport;
pi?.({ LitElement: G });
(ct.litElementVersions ?? (ct.litElementVersions = [])).push("4.2.2");
const gi = { attribute: !0, type: String, converter: Dt, reflect: !1, hasChanged: Ft }, _i = (e = gi, t, i) => {
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
function xe(e) {
  return (t, i) => typeof i == "object" ? _i(e, t, i) : ((s, n, r) => {
    const a = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), a ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
function U(e) {
  return xe({ ...e, state: !0, attribute: !1 });
}
var mi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, Se = (e) => {
  throw TypeError(e);
}, R = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? fi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && mi(t, i, n), n;
}, ke = (e, t, i) => t.has(e) || Se("Cannot " + i), P = (e, t, i) => (ke(e, t, "read from private field"), i ? i.call(e) : t.get(e)), W = (e, t, i) => t.has(e) ? Se("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), z = (e, t, i, s) => (ke(e, t, "write to private field"), t.set(e, i), i), vt, $t, xt, St, kt, At, Mt, Et;
function T(e) {
  return !!e && e.break === !0;
}
function Vt(e) {
  return Math.min(1, Math.max(0, e));
}
function Ae(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), n = parseInt(t.slice(4, 6), 16);
  return [i, s, n].some((r) => Number.isNaN(r)) ? null : { r: i, g: s, b: n };
}
function Me(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Vt(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function de(e, t) {
  return (Array.isArray(e) ? e : []).map((i) => {
    if (T(i))
      return { break: !0, time: (i.time ?? "").toString(), label: (i.label ?? "Pause").toString() };
    const s = Array.isArray(i?.cells) ? i.cells : [], n = Array.from({ length: t.length }, (_, h) => (s[h] ?? "").toString()), r = Array.isArray(i?.cell_styles) ? i.cell_styles : [], a = Array.from({ length: t.length }, (_, h) => Me(r[h])), o = Array.isArray(i?.cell_times) ? Array.from({ length: t.length }, (_, h) => Ee(i.cell_times[h])) : [], l = (i?.time ?? "").toString(), u = Q(l), g = (i?.start ?? "").toString().trim(), p = (i?.end ?? "").toString().trim(), d = {
      time: l,
      start: g || u.start || void 0,
      end: p || u.end || void 0,
      cells: n
    };
    return a.some((_) => !!_) && (d.cell_styles = a), o.some((_) => !!_) && (d.cell_times = o), d;
  });
}
function yi(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = Ae(t);
  if (!i) return t;
  const s = typeof e.bg_alpha == "number" ? Vt(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${s})`;
}
function wi(e, t) {
  const i = [], s = yi(e);
  return s && i.push(`background:${s}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function pe(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const s = Ae(i);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${Vt(t)})` : i;
  }
  return i;
}
function Q(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function Ee(e) {
  if (e == null) return null;
  if (typeof e == "string") {
    const r = e.trim(), a = Q(r);
    return r ? { time: r, start: a.start, end: a.end } : null;
  }
  if (typeof e != "object") return null;
  const t = (e.time ?? "").toString().trim(), i = Q(t), s = (e.start ?? "").toString().trim() || i.start, n = (e.end ?? "").toString().trim() || i.end;
  return t || s || n ? { time: t || (s && n ? `${s}-${n}` : ""), start: s || void 0, end: n || void 0 } : null;
}
function zt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function bi(e) {
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
function ge(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const s = t.getUTCFullYear(), n = new Date(Date.UTC(s, 0, 1)), r = n.getUTCDay() === 0 ? 7 : n.getUTCDay(), a = new Date(n);
  a.setUTCDate(n.getUTCDate() + (4 - r));
  const o = t.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(o / (10080 * 60 * 1e3)), isoYear: s };
}
function _e(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function at(e) {
  const t = (e ?? "").toString().trim();
  return !t || t === "-" || t === "–" || t === "—";
}
function vi(e, t, i = (s, n, r) => s?.cells?.[r] ?? "") {
  const s = Array.isArray(e) ? e : [], n = Array.isArray(t) ? t : [];
  let r = -1;
  return s.forEach((a, o) => {
    T(a) || n.some((l, u) => !at(i(a, o, l, u))) && (r = o);
  }), r >= 0 ? s.slice(0, r + 1) : [];
}
function De(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), s = i.match(/^(.+)_woche$/i);
  if (s?.[1]) return `number.${s[1]}_woche_offset`;
  const n = i.match(/^stundenplan_woche_(.+)$/i);
  return n?.[1] ? `number.${n[1]}_woche_offset` : "";
}
function me(e) {
  const t = zt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var rt;
const j = (rt = class extends G {
  constructor() {
    super(...arguments), W(this, vt), W(this, $t), W(this, xt, []), W(this, St, !1), W(this, kt, ""), W(this, At, null), W(this, Mt, "idle"), W(this, Et, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
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
          const l = (t?.view_mode ?? "week").toString(), u = Number(t?.days_ahead), g = Number.isFinite(u) ? Math.max(0, Math.min(6, Math.floor(u))) : 0;
          if (l === "rolling" && g === 0) {
            const p = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (p && e?.states?.[p]) {
              const d = Number(e.states[p].state);
              Number.isFinite(d) && d !== 0 && (e.callService("number", "set_value", { entity_id: p, value: 0 }).catch?.(() => {
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
        const s = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim(), n = e, a = (s ? n?.states?.[s] : void 0)?.attributes ?? {}, o = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (s && o) {
          let l = ((t?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = s.replace(/^sensor\./, "number.") + "_offset");
          const u = l && n?.states && l in n.states, g = s + "|" + l;
          if (u && this.__autokickSig !== g) {
            this.__autokickSig = g;
            const p = n.states[l]?.state, d = Number(p), _ = Number.isFinite(d) ? d : 0;
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
    return P(this, Mt);
  }
  set _jsonStatus(e) {
    z(this, Mt, e);
  }
  get _jsonError() {
    return P(this, Et);
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
    l = Math.max(a, l), l = Math.min(o, l), await this.hass.callService("number", "set_value", { entity_id: i, value: l });
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
      rows: [],
      rows_b: []
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(e) {
    const t = rt.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
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
    const t = rt.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((b) => (b ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = de(e.rows, i), n = de(e.rows_b, i), r = ((e.view_mode ?? "week") + "").toString().trim(), a = r === "rolling" ? "rolling" : "week", o = ((e.display_mode ?? "default") + "").toString().trim(), l = o === "compact" ? "compact" : "default", u = Number(e.days_ahead), g = Number.isFinite(u) ? Math.max(0, Math.min(6, Math.floor(u))) : 0, p = ((e.rolling_switch_mode ?? t.rolling_switch_mode ?? "midnight") + "").toString().trim(), d = p === "after_last_lesson" || p === "fixed_time" ? p : "midnight", _ = ((e.rolling_switch_time ?? t.rolling_switch_time ?? "") + "").toString().trim(), h = ((e.week_mode ?? t.week_mode) + "").toString().trim(), m = h === "kw_parity" || h === "week_map" || h === "off" ? h : "off", f = (() => {
      const b = ((e.source_type ?? "") + "").toString().trim();
      if (b === "manual" || b === "entity" || b === "json" || b === "sensor") return b;
      const gt = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (gt) {
        const Y = ((e.source_attribute ?? "") + "").toString().trim(), et = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(gt) && (Y === "" || Y === "rows_table") && (et === "" || et === "time")) && (Y || et) ? "legacy" : "entity";
      }
      return "manual";
    })(), w = (e.source_entity ?? t.source_entity).toString().trim(), $ = (e.source_entity_integration ?? "").toString().trim(), D = (e.source_entity_legacy ?? "").toString().trim(), v = f === "sensor" ? D || w : f === "entity" && $ || w, M = (e.week_offset_entity ?? "").toString().trim() || De(v);
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      show_title: e.show_title ?? t.show_title,
      title_font_size: Number.isFinite(Number(e.title_font_size)) ? Math.max(0, Math.min(40, Number(e.title_font_size))) : t.title_font_size,
      title_font_family: (e.title_font_family ?? t.title_font_family ?? "").toString(),
      show_header_date: e.show_header_date ?? t.show_header_date,
      show_time_column: e.show_time_column ?? t.show_time_column,
      trim_empty_rows: e.trim_empty_rows ?? t.trim_empty_rows,
      days: i,
      view_mode: a,
      display_mode: l,
      days_ahead: g,
      rolling_switch_mode: d,
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
      source_entity: v,
      source_entity_integration: $ || "",
      source_entity_legacy: D || "",
      source_attribute: f === "entity" ? "rows_table" : ((e.source_attribute ?? t.source_attribute ?? "plan") + "").toString(),
      source_time_key: f === "entity" ? "time" : ((e.source_time_key ?? t.source_time_key ?? "Stunde") + "").toString(),
      source_type: f,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: M,
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
      const l = t.map((u) => {
        if (u instanceof Date && !Number.isNaN(u.getTime()))
          return `${u.getFullYear()}${String(u.getMonth() + 1).padStart(2, "0")}${String(u.getDate()).padStart(2, "0")}`;
        const g = (u ?? "").toString().trim(), p = g.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return p ? `${p[1]}${p[2]}${p[3]}` : g;
      }).indexOf(s);
      return l >= 0 ? l : -1;
    }
    const n = i.getDay(), r = new Set(bi(n).map(zt));
    if (!r.size) return -1;
    const a = (e ?? []).map((o) => zt(o));
    for (let o = 0; o < a.length; o++) if (r.has(a[o])) return o;
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
    const i = e.days ?? [], s = (e.source_time_key ?? "time").toString().trim(), n = "Stunde", r = "time", a = t.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o?.time ?? o?.[s] ?? o?.[n] ?? o?.[r] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[s] ?? o?.[n] ?? o?.[r] ?? "").toString(), u = Q(l), g = Array.isArray(o?.cells) ? Array.from({ length: i.length }, (f, w) => (o?.cells?.[w] ?? "").toString()) : Array.from({ length: i.length }, (f, w) => {
        const $ = (i[w] ?? "").toString();
        return (o?.[$] ?? "").toString();
      }), p = Array.isArray(o?.cell_styles) ? Array.from({ length: i.length }, (f, w) => Me(o?.cell_styles?.[w])) : [], d = Array.isArray(o?.cell_times) ? Array.from({ length: i.length }, (f, w) => Ee(o.cell_times[w])) : [], _ = (o?.start ?? "").toString().trim() || u.start, h = (o?.end ?? "").toString().trim() || u.end, m = { time: l, start: _ || void 0, end: h || void 0, cells: g };
      return p.some((f) => !!f) && (m.cell_styles = p), d.some((f) => !!f) && (m.cell_times = d), m;
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
    return this.weekFromParityAtDate(e, /* @__PURE__ */ new Date());
  }
  weekFromParityAtDate(e, t) {
    const { isoWeek: i } = ge(t), s = i % 2 === 0, n = !!e.week_a_is_even_kw;
    return s === n ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(t, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: n, isoYear: r } = ge(/* @__PURE__ */ new Date()), a = String(n), o = String(r);
    if (s?.[o] && typeof s[o] == "object") {
      const u = _e(s[o][a]);
      if (u) return u;
    }
    return _e(s?.[a]) || null;
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
    return (t ?? []).findIndex((s) => me(s) === i);
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
      if (!T(i) && i?.end) return (i.end + "").toString().trim();
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
    const r = [], a = Math.max(0, Math.min(6, t));
    let o = new Date(n);
    for (let l = 0; l <= a; l++) {
      const u = this.findConfiguredDayIndexForDate(o, i);
      u >= 0 && r.push({ orig: u, date: new Date(o) }), o = this.nextConfiguredSchoolday(o, i);
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
        history.pushState(null, "", n), Ot(window, "location-changed", { replace: !1 });
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
        Ot(this, "hass-more-info", { entityId: n });
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
      const a = (r ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const o = Number(a[1]), l = Number(a[2]), u = Number(a[3]), g = new Date(o, l - 1, u, 12, 0, 0, 0);
      Number.isNaN(g.getTime()) || n.push(g);
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
    const r = (e.days?.length ?? 0) || 5, a = n?.updated_days;
    if (Array.isArray(a) && a.length) {
      const l = (a[0] ?? "").toString().trim();
      return Array.from({ length: r }, (g, p) => (a[p] ?? l ?? "").toString().trim());
    }
    const o = (n?.updated_raw ?? n?.updated ?? "").toString().trim();
    return o ? Array.from({ length: r }, () => o) : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.week_mode === "kw_parity" && this.getActiveWeek(e) === "B" ? Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : e.rows ?? [] : e.rows ?? [];
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
  getManualRowForDate(e, t, i, s) {
    if ((e.source_type ?? "manual") !== "manual" || e.week_mode !== "kw_parity" || !(s instanceof Date)) return t;
    const n = this.weekFromParityAtDate(e, s), r = n === "B" && Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : e.rows ?? [], a = (t?.time ?? "").toString();
    return r.find((l) => T(l) === T(t) && (l?.time ?? "").toString() === a) ?? r[i] ?? t;
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
`).map((d) => d.trim()).filter((d) => d.length > 0);
    if (!i.length) return null;
    const s = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(s)) return null;
    const n = i[0];
    if (/^(—|\-|–|---)$/.test(n)) return null;
    const r = (d) => {
      const _ = (d ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(_) || /\bfällt\s+aus\b/i.test(_) || /\bverlegt\b/i.test(_) || /\bentfällt\b/i.test(_) || /\bvertretung\b/i.test(_) || /\bstatt\b/i.test(_) || /\bgehalten\b/i.test(_) || /\bAufgaben\b/i.test(_) || /^für\b/i.test(_);
    }, a = (d) => {
      const _ = (d ?? "").toString().trim();
      return /^\d{1,4}$/.test(_) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(_) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(_);
    }, o = i.slice(1);
    let l = -1;
    for (let d = 0; d < o.length; d++)
      if (!r(o[d]) && a(o[d])) {
        l = d;
        break;
      }
    if (l < 0) {
      for (let d = o.length - 1; d >= 0; d--)
        if (a(o[d])) {
          l = d;
          break;
        }
    }
    if (l < 0) return null;
    const u = o[l];
    let g;
    for (let d = l + 1; d < o.length; d++) {
      const _ = o[d];
      if (!r(_) && !a(_)) {
        g = _;
        break;
      }
    }
    if (!g) {
      const d = o.filter((_) => !r(_) && !a(_));
      g = d.length ? d[d.length - 1] : void 0;
    }
    const p = i.slice(1).filter((d) => r(d));
    return { fach: n, raum: u, lehrer: g, notes: p.length ? p : void 0 };
  }
  renderCell(e, t) {
    const i = (e ?? "").toString(), s = this.filterCellText(i, t);
    if (at(s)) return c``;
    const n = (() => {
      let h = s.replace(/\r/g, "").split(`
`).map((f) => (f ?? "").toString().trim());
      for (; h.length && /^(—|–|-)$/.test(h[0]); ) h.shift();
      const m = [];
      for (const f of h) {
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
    if (at(n)) return c``;
    const r = n.split(/\n\s*\n/).map((h) => h.trim()).filter(Boolean), a = this.parseCellTriplet(n), o = (h) => {
      if (h.startsWith("🔴")) return "note noteRed";
      if (h.startsWith("🟠")) return "note noteOrange";
      if (h.startsWith("🟡")) return "note noteYellow";
      const m = h;
      return /\bfällt\s+aus\b/i.test(m) || /\bverlegt\b/i.test(m) || /\bstatt\b/i.test(m) || /\bgehalten\b/i.test(m) || /\bentfällt\b/i.test(m) ? "note noteRed" : "note";
    }, l = (h) => (h ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim();
    if (r.length === 1 && a?.fach && a?.raum && a?.lehrer)
      return c`
        <div class="cellWrap">
          <div class="fach">${a.fach}</div>
          <div class="lehrer">${a.lehrer}</div>
          <div class="raum">${a.raum}</div>

          ${a.notes?.length ? c`
                <div class="notes">
                  ${a.notes.map((h) => {
        const m = o(h), f = l(h) || h;
        return c`<div class=${m}><span class="txt">${f}</span></div>`;
      })}
                </div>
              ` : c``}
        </div>
      `;
    const u = (h) => {
      const m = (h ?? "").toString().trim();
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
                    ${f.notes.map((v) => {
          const M = o(v), b = l(v) || v;
          return c`<div class=${M}><span class="txt">${b}</span></div>`;
        })}
                  </div>
                ` : c``}
          </div>
        `;
      const w = m.split(`
`).map((v) => v.trim()).filter(Boolean), $ = (w[0] ?? "").trim(), D = w.slice(1);
      return $ && D.length ? c`
          <div class="cellWrap">
            <div class="fach">${$}</div>
            <div class="notes">
              ${D.map((v) => {
        const M = o(v), b = l(v) || v;
        return c`<div class=${M}><span class="txt">${b}</span></div>`;
      })}
            </div>
          </div>
        ` : c`<span class="cellText">${m}</span>`;
    };
    if (r.length > 1)
      return c`<div class="cellMulti">${r.map((h) => u(h))}</div>`;
    const g = (n ?? "").split(`
`).map((h) => h.trim()).filter(Boolean), p = /^\d{1,4}$/, d = /^[A-ZÄÖÜ]{2,6}$/, _ = (h) => {
      const m = (h ?? "").trim();
      if (!m || p.test(m) || d.test(m)) return !1;
      const f = m.toLowerCase();
      return f.startsWith("statt ") || f.includes("fällt aus") || f.includes("verlegt") || f.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(m) ? !1 : /[a-z0-9äöü]/i.test(m);
    };
    if (g.length >= 6 && g.length % 3 === 0) {
      const h = [];
      for (let m = 0; m < g.length; m += 3) {
        const f = g[m] ?? "", w = g[m + 1] ?? "", $ = g[m + 2] ?? "";
        if (!_(f) || !p.test(w) || !d.test($)) {
          h.length = 0;
          break;
        }
        h.push([f, w, $].join(`
`));
      }
      if (h.length >= 2)
        return c`<div class="cellMulti">${h.map((m) => u(m))}</div>`;
    }
    return u(n);
  }
  renderCardLayout(e, t = null, i = !1) {
    const s = this._rowsCache, n = this.getHeaderDaysFromEntity(e), r = this.getTodayIndex(e.days ?? [], n), a = ((t ?? this._uiViewMode ?? e.view_mode ?? "week") + "").toString(), o = Number(e.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, u = "1px solid var(--divider-color)", g = pe(e.highlight_today_color ?? "", 0.12), p = pe(e.highlight_current_color ?? "", 0.18), d = (e.highlight_current_text_color ?? "").toString().trim(), _ = (e.highlight_current_time_text_color ?? "").toString().trim(), h = e.week_mode !== "off", m = h ? this.getActiveWeek(e) : null, f = this.getWeekOffsetValue(e), w = (e.source_type ?? "manual").toString(), $ = e.show_time_column !== !1, D = !i && (e.week_offset_entity ?? "").trim().length > 0, v = D && (w === "entity" || w === "sensor" && (e.week_mode ?? "off") !== "off"), M = n && n.length >= (e.days?.length ?? 0) ? n : null, b = this.getHeaderUpdatedFromEntity(e), gt = this.getBaseDate(e), Y = this.mondayOfWeek(gt), et = this.normalizeTapAction(e.tap_action), It = i ? "default" : e.display_mode ?? "default", Re = `${It === "compact" ? "compact" : ""}${!i && et.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}`, Yt = e.show_title !== !1 && (e.title ?? "").toString().trim().length > 0, je = this.getTitleStyle(e), Ne = Yt || h || v, Pe = a === "rolling" && (i || !v || (f ?? 0) === 0), it = Pe ? this.getRollingVisibleSlots(e, l) : [], K = it.length ? it.map((y) => y.orig) : Array.from({ length: e.days?.length ?? 0 }, (y, S) => S), _t = K.map((y) => e.days[y]), E = it.length ? it.map((y) => y.date) : null, Kt = it.length ? 0 : Math.max(0, K.indexOf(r)), Jt = K[Kt] ?? 0, Rt = E?.[Kt] ?? null, We = Rt instanceof Date ? this.fmtYMD(Rt) === this.fmtYMD(/* @__PURE__ */ new Date()) : Jt === r, ze = e.trim_empty_rows ? vi(s, K, (y, S, k, C) => {
      const N = this.getManualRowForDate(e, y, S, E?.[C]);
      return this.filterCellText((N?.cells ?? y?.cells ?? [])[k] ?? "", e);
    }) : s, Zt = (() => {
      const y = /* @__PURE__ */ new Map();
      return !M || !b || M.forEach((S, k) => {
        const C = b[k];
        S instanceof Date && C && y.set(this.fmtYMD(S), C);
      }), y;
    })();
    return c`
      <ha-card class=${Re} @click=${i ? (y) => this.closeWeekPopup(y) : (y) => this.handleCardAction(e, y)}>
        ${Ne ? c`<div class="headerRow">
          ${Yt ? c`<div class="title" style=${je}>${e.title ?? ""}</div>` : c`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${h ? c`<div class="weekBadgeInline">Woche <b>${m}</b></div>` : c``}

            ${v ? c`
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
          <table>
            <thead>
              <tr>
                ${$ ? c`<th class="time">Stunde</th>` : c``}
                ${_t.map((y, S) => {
      const k = K[S], C = e.highlight_today && (E ? this.fmtYMD(E[S]) === this.fmtYMD(/* @__PURE__ */ new Date()) : k === r) ? "today" : "";
      let N = "";
      if (E?.[S] instanceof Date)
        N = this.fmtDDMMYYYY(E[S]);
      else if (M)
        N = this.fmtDDMMYYYY(M[k]);
      else {
        const H = me(y);
        if (H) {
          const J = new Date(Y);
          J.setDate(Y.getDate() + (H - 1)), N = this.fmtDDMMYYYY(J);
        }
      }
      return c`
                    <th class=${C} style=${`--sp-hl:${g};`}>
                      <div>${y}</div>
                      ${e.show_header_date !== !1 ? c`<div class="thDate">${N}</div>` : c``}
                      ${E?.[S] ? Zt.get(this.fmtYMD(E[S])) ? c`<div class="thUpdated">(aktualisiert: ${Zt.get(this.fmtYMD(E[S]))})</div>` : c`` : b?.[k] ? c`<div class="thUpdated">(aktualisiert: ${b[k]})</div>` : c``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${_t.length + ($ ? 1 : 0)}>${this._noDataMsg}</td></tr>` : ze.map((y, S) => {
      if (T(y)) {
        const st = Q(y.time), yt = !!st.start && !!st.end && this.isNowBetween(st.start, st.end), F = !!e.highlight_breaks && yt;
        let Z = `--sp-hl:${p};`, wt = "";
        return F && (Z += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", wt += `--sp-hl:${p}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), F && e.highlight_current_time_text && _ && (Z += `color:${_};`), c`
                    <tr class="break">
                      ${$ ? c`<td class="time" style=${Z}>${y.time}</td>` : c``}
                      <td colspan=${_t.length} style=${wt}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const k = y, C = k.cells ?? [], N = k.cell_styles ?? [], H = this.getManualRowForDate(e, k, S, Rt), J = (H?.cell_times ?? k.cell_times)?.[Jt] ?? null, qt = J?.time || H?.time || k.time, mt = J?.start || H?.start || k.start, ft = J?.end || H?.end || k.end, jt = We && !!mt && !!ft && this.isNowBetween(mt, ft), Oe = r >= 0 ? C[r] ?? "" : "", Be = r >= 0 ? this.filterCellText(Oe, e) : "", Ue = r >= 0 ? at(Be) : !1, Nt = !(e.free_only_column_highlight && Ue), Gt = Q(qt), He = !!(Gt.start && Gt.end), Qt = !He && mt && ft ? `${mt}–${ft}` : "";
      let Pt = `--sp-hl:${p};`;
      return Nt && e.highlight_current && jt && (Pt += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), Nt && jt && e.highlight_current_time_text && _ && (Pt += `color:${_};`), c`
                  <tr>
                    ${$ ? c`<td class="time" style=${Pt}>
                      <div class="timeWrap">
                        <div class="timeSt">${qt}</div>
                        ${Qt ? c`<div class="timeHm">${Qt}</div>` : c``}
                      </div>
                    </td>` : c``}

                    ${_t.map((st, yt) => {
        const F = K[yt], Z = this.getManualRowForDate(e, k, S, E?.[yt]), wt = Z?.cells ?? C, Fe = Z?.cell_styles ?? N, Xt = this.filterCellText(wt[F] ?? "", e), Le = Fe[F] ?? null, Ve = e.highlight_today && F === r ? "today" : "";
        let te = `--sp-hl:${g};` + wi(Le, u);
        const Ie = !at(Xt);
        return Nt && Ie && jt && e.highlight_current_text && d && r >= 0 && F === r && (te += `color:${d};`), c`<td class=${Ve} style=${te}>${this.renderCell(Xt, e)}</td>`;
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
}, rt.styles = ye`
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
`, rt);
vt = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
xt = /* @__PURE__ */ new WeakMap();
St = /* @__PURE__ */ new WeakMap();
kt = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
Mt = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakMap();
R([
  xe({ attribute: !1 })
], j.prototype, "hass", 1);
R([
  U()
], j.prototype, "config", 1);
R([
  U()
], j.prototype, "_rowsCache", 1);
R([
  U()
], j.prototype, "_noData", 1);
R([
  U()
], j.prototype, "_noDataMsg", 1);
R([
  U()
], j.prototype, "_jsonRows", 1);
R([
  U()
], j.prototype, "_jsonStatus", 1);
R([
  U()
], j.prototype, "_jsonError", 1);
let Ce = j;
function Ot(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function A(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function $i(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function xi(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const Bt = class extends G {
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
    return new Ce().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Ot(this, "config-changed", { config: t });
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
      n && (r = this.hass?.states?.[n]?.attributes?.week_offset_entity || De(n)), this.emit({
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
    if (!r || T(r)) return;
    const a = r, o = Array.isArray(a.cells) ? a.cells.slice() : [];
    o[i] = s, n[t] = { ...a, cells: o }, this.emitManualRows(n);
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
        const a = (r.time ?? "").toString(), o = (r.label ?? "Pause").toString();
        n[t] = { break: !0, time: a, label: o };
      } else {
        const a = (r.time ?? "").toString();
        n[t] = { time: a, start: "", end: "", cells: Array.from({ length: s.length }, () => "") };
      }
      this.emitManualRows(n);
    }
  }
  updateManualCellStyle(t, i, s) {
    if (!this._config) return;
    const n = this.getManualRows(), r = n[t];
    if (!r || T(r)) return;
    const a = r, o = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = o[i] ?? {};
    o[i] = { ...l, ...s }, n[t] = { ...a, cell_styles: o }, this.emitManualRows(n);
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
            @change=${(a) => {
      const o = !!a?.target?.checked, l = Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : this.clone(t.rows ?? []);
      this._manualWeek = "A", this._rowOpen = {}, this.emit({ ...t, week_mode: o ? "kw_parity" : "off", rows_b: l });
    }}
          ></ha-switch>
        </div>

        ${s ? c`
          <ha-form
            .hass=${this.hass}
            .data=${{ week_a_is_even_kw: A(t.week_a_is_even_kw, !0) }}
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
            @value-changed=${(a) => {
      const o = a?.detail?.value?.week_a_is_even_kw;
      typeof o == "boolean" && this.setValue("week_a_is_even_kw", o);
    }}
          ></ha-form>

          <div class="manualWeekTabs">
            ${["A", "B"].map((a) => c`
              <button
                type="button"
                class=${`spBtn ${n === a ? "spBtnActive" : ""}`}
                @click=${() => {
      this._manualWeek = a, this._rowOpen = {}, this.requestUpdate();
    }}
              >Woche ${a} bearbeiten</button>
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
              @change=${(a) => {
      this._showCellStyles = !!a?.target?.checked, this.requestUpdate();
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

      ${r.map((a, o) => {
      const l = T(a), u = l ? `Pause · ${(a.time ?? "").toString()}` : `Stunde · ${(a.time ?? "").toString()}`, g = a, p = (g.start ?? "").toString(), d = (g.end ?? "").toString(), _ = (a.label ?? "Pause").toString();
      return c`
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
                <div class="rowHeadTitle">${u || `Zeile ${o + 1}`}</div>
                <div class="rowHeadMeta">${l ? _ : `${p || "Start?"} – ${d || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-input
                  label="Zeit / Stunde"
                  .value=${(a.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(h) => this.updateManualRow(o, { time: h?.target?.value ?? "" })}
                ></ha-input>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${l} @change=${(h) => this.toggleManualBreak(o, !!h?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${l ? c`
                    <ha-input
                      label="Pausentext"
                      .value=${_}
                      placeholder="z. B. Große Pause"
                      @input=${(h) => this.updateManualRow(o, { label: h?.target?.value ?? "" })}
                    ></ha-input>
                  ` : c`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-input
                        label="Start (HH:MM)"
                        .value=${p}
                        @input=${(h) => this.updateManualRow(o, { start: h?.target?.value ?? "" })}
                      ></ha-input>
                      <ha-input
                        label="Ende (HH:MM)"
                        .value=${d}
                        @input=${(h) => this.updateManualRow(o, { end: h?.target?.value ?? "" })}
                      ></ha-input>
                    </div>

                    <div class="cellsGrid" style=${`grid-template-columns: repeat(${i.length}, minmax(220px, 1fr));`}>
                      ${i.map((h, m) => {
        const f = (g.cells?.[m] ?? "").toString(), w = (Array.isArray(g.cell_styles) ? g.cell_styles?.[m] : void 0) ?? {}, $ = (w?.bg ?? "#000000").toString(), D = typeof w?.bg_alpha == "number" && !Number.isNaN(w.bg_alpha) ? w.bg_alpha : 0.18, v = Math.round(D * 100), M = (w?.color ?? "#ffffff").toString();
        return c`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${h}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${f}
                              @input=${(b) => this.updateManualCell(o, m, b?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${$} @input=${(b) => this.updateManualCellStyle(o, m, { bg: b?.target?.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    .value=${String(v)}
                                    @input=${(b) => this.updateManualCellStyle(o, m, { bg_alpha: Number(b?.target?.value ?? 0) / 100 })}
                                  />
                                  <div class="pct">${v}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${M} @input=${(b) => this.updateManualCellStyle(o, m, { color: b?.target?.value })} />
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
                .value=${xi(t.days ?? [])}
                @input=${(i) => this.setValue("days", $i(i.target.value))}
                hint="Beispiel: Mo, Di, Mi, Do, Fr"
              ></ha-input>
            </div>

            <div class="generalDivider">Titel & Kopfzeile</div>
            <div class="grid3">
              <ha-switch .checked=${A(t.show_title, !0)} @change=${(i) => this.onToggle(i, "show_title")}></ha-switch>
              <div class="switchLabel">Titelzeile anzeigen</div>
              <div></div>

              <ha-switch .checked=${A(t.show_header_date, !0)} @change=${(i) => this.onToggle(i, "show_header_date")}></ha-switch>
              <div class="switchLabel">Datum anzeigen</div>
              <div></div>

              <ha-switch .checked=${A(t.show_time_column, !0)} @change=${(i) => this.onToggle(i, "show_time_column")}></ha-switch>
              <div class="switchLabel">Spalte „Stunde“ anzeigen</div>
              <div></div>

              <div></div>
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

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Leere Endstunden ausblenden</div>
                  <div class="sub">Kürzt die Tabelle nach der letzten belegten Stunde der sichtbaren Tage.</div>
                </div>
                <ha-switch .checked=${A(t.trim_empty_rows, !1)} @change=${(i) => this.onToggle(i, "trim_empty_rows")}></ha-switch>
              </div>

              ${(t.view_mode ?? "week") === "rolling" ? c`
                <div class="generalDivider gridFull">Rolling</div>
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
                  <ha-input
                    label="Umschaltzeit (HH:MM)"
                    .value=${t.rolling_switch_time ?? ""}
                    @input=${(i) => this.onText(i, "rolling_switch_time")}
                    hint="Beispiel: 15:00"
                  ></ha-input>
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
              <ha-switch .checked=${A(t.highlight_today, !0)} @change=${(i) => this.onToggle(i, "highlight_today")}></ha-switch>
              <div class="switchLabel">Heute-Spalte hervorheben</div>
              <div></div>

              <ha-switch .checked=${A(t.highlight_current, !0)} @change=${(i) => this.onToggle(i, "highlight_current")}></ha-switch>
              <div class="switchLabel">Aktuelle Stunde hervorheben</div>
              <div></div>

              <ha-switch .checked=${A(t.highlight_breaks, !1)} @change=${(i) => this.onToggle(i, "highlight_breaks")}></ha-switch>
              <div class="switchLabel">Pause hervorheben</div>
              <div></div>

              <ha-switch
                .checked=${A(t.free_only_column_highlight, !0)}
                @change=${(i) => this.onToggle(i, "free_only_column_highlight")}
              ></ha-switch>
              <div class="switchLabel">Nur wenn heute-Spalte nicht frei</div>
              <div></div>

              <ha-switch .checked=${A(t.highlight_current_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_text")}></ha-switch>
              <div class="switchLabel">Textfarbe in aktueller Stunde</div>
              <ha-input label="Textfarbe" .value=${t.highlight_current_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_text_color")}></ha-input>

              <ha-switch .checked=${A(t.highlight_current_time_text, !1)} @change=${(i) => this.onToggle(i, "highlight_current_time_text")}></ha-switch>
              <div class="switchLabel">Zeitspalte Textfarbe (aktuell)</div>
              <ha-input label="Zeitfarbe" .value=${t.highlight_current_time_text_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_time_text_color")}></ha-input>
            </div>
          `
    )}

        ${this.renderSection(
      "Farben",
      "colors",
      c`
            <div class="grid2">
              <ha-input label="Heute Overlay" .value=${t.highlight_today_color ?? ""} @input=${(i) => this.onText(i, "highlight_today_color")}></ha-input>
              <ha-input label="Aktuell Overlay" .value=${t.highlight_current_color ?? ""} @input=${(i) => this.onText(i, "highlight_current_color")}></ha-input>
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

                  <ha-input
                    label="Stundenplan24 Entity-ID (manuell)"
                    .value=${t.source_entity_integration ?? t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-input>
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

                  <ha-input
                    label="Sensor Entity-ID (manuell)"
                    .value=${t.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-input>

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
        week_a_is_even_kw: A(t.week_a_is_even_kw, !0)
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
          typeof r == "boolean" && r !== A(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
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
Bt.properties = {
  hass: {},
  _config: { state: !0 }
}, Bt.styles = ye`
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
let Te = Bt;
R([
  U()
], Te.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Ce);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", Te);
window.__STUNDENPLAN_CARD_VERSION = "v3.2.6";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v3.2.6 (marker: STUNDENPLAN_CARD_v3.2.6)",
  preview: !0
});
export {
  Ce as StundenplanCard,
  Te as StundenplanCardEditor
};
