const nt = globalThis, vt = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = /* @__PURE__ */ Symbol(), At = /* @__PURE__ */ new WeakMap();
let jt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (vt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = At.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && At.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const te = (o) => new jt(typeof o == "string" ? o : o + "", void 0, wt), qt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new jt(e, o, wt);
}, ee = (o, t) => {
  if (vt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = nt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, Ct = vt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return te(e);
})(o) : o;
const { is: se, defineProperty: ie, getOwnPropertyDescriptor: re, getOwnPropertyNames: ne, getOwnPropertySymbols: oe, getPrototypeOf: ae } = Object, dt = globalThis, Mt = dt.trustedTypes, le = Mt ? Mt.emptyScript : "", ce = dt.reactiveElementPolyfillSupport, J = (o, t) => o, mt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? le : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, Kt = (o, t) => !se(o, t), Tt = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: Kt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ie(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = re(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const l = i?.call(this);
      r?.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const t = ae(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const e = this.properties, s = [...ne(e), ...oe(e)];
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
      for (const i of s) e.unshift(Ct(i));
    } else t !== void 0 && e.push(Ct(t));
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
    return ee(t, this.constructor.elementStyles), t;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : mt).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : mt;
      this._$Em = i;
      const l = n.fromAttribute(e, r.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? Kt)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: n } = r, l = this[i];
        n !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, r, l);
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[J("elementProperties")] = /* @__PURE__ */ new Map(), q[J("finalized")] = /* @__PURE__ */ new Map(), ce?.({ ReactiveElement: q }), (dt.reactiveElementVersions ??= []).push("2.1.2");
const $t = globalThis, Et = (o) => o, lt = $t.trustedTypes, Rt = lt ? lt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Zt = "$lit$", W = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + W, ue = `<${Xt}>`, I = document, Q = () => I.createComment(""), tt = (o) => o === null || typeof o != "object" && typeof o != "function", xt = Array.isArray, he = (o) => xt(o) || typeof o?.[Symbol.iterator] == "function", gt = `[ 	
\f\r]`, V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, Lt = />/g, O = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Dt = /'/g, Pt = /"/g, Vt = /^(?:script|style|textarea|title)$/i, de = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), p = de(1), Z = /* @__PURE__ */ Symbol.for("lit-noChange"), T = /* @__PURE__ */ Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), U = I.createTreeWalker(I, 129);
function Yt(o, t) {
  if (!xt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rt !== void 0 ? Rt.createHTML(t) : t;
}
const pe = (o, t) => {
  const e = o.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = V;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let u, c, d = -1, h = 0;
    for (; h < a.length && (n.lastIndex = h, c = n.exec(a), c !== null); ) h = n.lastIndex, n === V ? c[1] === "!--" ? n = Nt : c[1] !== void 0 ? n = Lt : c[2] !== void 0 ? (Vt.test(c[2]) && (i = RegExp("</" + c[2], "g")), n = O) : c[3] !== void 0 && (n = O) : n === O ? c[0] === ">" ? (n = i ?? V, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, u = c[1], n = c[3] === void 0 ? O : c[3] === '"' ? Pt : Dt) : n === Pt || n === Dt ? n = O : n === Nt || n === Lt ? n = V : (n = O, i = void 0);
    const _ = n === O && o[l + 1].startsWith("/>") ? " " : "";
    r += n === V ? a + ue : d >= 0 ? (s.push(u), a.slice(0, d) + Zt + a.slice(d) + W + _) : a + W + (d === -2 ? l : _);
  }
  return [Yt(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class et {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const l = t.length - 1, a = this.parts, [u, c] = pe(t, e);
    if (this.el = et.createElement(u, s), U.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = U.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Zt)) {
          const h = c[n++], _ = i.getAttribute(d).split(W), f = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: r, name: f[2], strings: _, ctor: f[1] === "." ? ge : f[1] === "?" ? me : f[1] === "@" ? fe : pt }), i.removeAttribute(d);
        } else d.startsWith(W) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (Vt.test(i.tagName)) {
          const d = i.textContent.split(W), h = d.length - 1;
          if (h > 0) {
            i.textContent = lt ? lt.emptyScript : "";
            for (let _ = 0; _ < h; _++) i.append(d[_], Q()), U.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[h], Q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Xt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(W, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += W.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = I.createElement("template");
    return s.innerHTML = t, s;
  }
}
function X(o, t, e = o, s) {
  if (t === Z) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = tt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = X(o, i._$AS(o, t.values), i, s)), t;
}
class _e {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? I).importNode(e, !0);
    U.currentNode = i;
    let r = U.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let u;
        a.type === 2 ? u = new st(r, r.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (u = new be(r, this, t)), this._$AV.push(u), a = s[++l];
      }
      n !== a?.index && (r = U.nextNode(), n++);
    }
    return U.currentNode = I, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class st {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = X(this, t, e), tt(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== Z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : he(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(I.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = et.createElement(Yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new _e(i, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new et(t)), e;
  }
  k(t) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new st(this.O(Q()), this.O(Q()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Et(t).nextSibling;
      Et(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = X(this, t, e, 0), n = !tt(t) || t !== this._$AH && t !== Z, n && (this._$AH = t);
    else {
      const l = t;
      let a, u;
      for (t = r[0], a = 0; a < r.length - 1; a++) u = X(this, l[s + a], e, a), u === Z && (u = this._$AH[a]), n ||= !tt(u) || u !== this._$AH[a], u === T ? t = T : t !== T && (t += (u ?? "") + r[a + 1]), this._$AH[a] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ge extends pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class me extends pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class fe extends pt {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = X(this, t, e, 0) ?? T) === Z) return;
    const s = this._$AH, i = t === T && s !== T || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== T && (s === T || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class be {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    X(this, t);
  }
}
const ye = $t.litHtmlPolyfillSupport;
ye?.(et, st), ($t.litHtmlVersions ??= []).push("3.3.2");
const ve = (o, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new st(t.insertBefore(Q(), r), r, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
const St = globalThis;
class K extends q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ve(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Z;
  }
}
K._$litElement$ = !0, K.finalized = !0, St.litElementHydrateSupport?.({ LitElement: K });
const we = St.litElementPolyfillSupport;
we?.({ LitElement: K });
(St.litElementVersions ??= []).push("4.2.2");
function N(o) {
  return !!o && o.break === !0;
}
function H(o) {
  return Math.min(1, Math.max(0, o));
}
function ct(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((r) => Number.isNaN(r)) ? null : { r: e, g: s, b: i };
}
function ot(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = H(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function $e(o) {
  if (!o?.bg) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = ct(t);
  if (!e) return t;
  const s = typeof o.bg_alpha == "number" ? H(o.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function ft(o, t) {
  const e = [], s = $e(o);
  return s && e.push(`background:${s}`), o?.color && e.push(`color:${o.color}`), e.push(`border:${o?.border ?? t}`), e.join(";") + ";";
}
function Bt(o, t) {
  const e = (o ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const s = ct(e);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${H(t)})` : e;
  }
  return e;
}
function F(o) {
  const e = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function bt(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function xe(o) {
  switch (o) {
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
function zt(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const s = t.getUTCFullYear(), i = new Date(Date.UTC(s, 0, 1)), r = i.getUTCDay() === 0 ? 7 : i.getUTCDay(), n = new Date(i);
  n.setUTCDate(i.getUTCDate() + (4 - r));
  const l = t.getTime() - n.getTime();
  return { isoWeek: 1 + Math.round(l / (10080 * 60 * 1e3)), isoYear: s };
}
function at(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function it(o) {
  const t = (o ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || t.startsWith("---") || t.toUpperCase().startsWith("AUSFALL"));
}
function Se(o) {
  return (o ?? "").toString().trim().toLowerCase().split("?")[0].endsWith(".json");
}
function ke(o) {
  const e = (o ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), r = Number(e[3]);
  return [s, i, r].some((n) => Number.isNaN(n)) ? null : new Date(s, i - 1, r, 12, 0, 0);
}
function Ae(o) {
  const t = ke(o);
  if (!t) return null;
  const e = t.getDay();
  return e === 0 ? 7 : e;
}
function Ce(o, t) {
  const e = (o ?? "").toString().trim(), s = (t ?? "").toString().trim();
  return !e || e.toUpperCase() === "AUSFALL" ? s ? `---
${s}` : "---" : s ? `${e}
${s}` : e;
}
function Wt(o) {
  const t = bt(o);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
function Ft(o) {
  const t = (o ?? "").trim(), e = t.match(/^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/) || t.match(/^\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\s*$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), r = Number(e[3]);
  return [s, i, r].some((n) => Number.isNaN(n)) ? null : new Date(r, i - 1, s, 12, 0, 0);
}
function Me(o) {
  const t = o.getFullYear(), e = String(o.getMonth() + 1).padStart(2, "0"), s = String(o.getDate()).padStart(2, "0");
  return `${t}${e}${s}`;
}
function Te(o) {
  const t = (o ?? "").toString().trim();
  if (t.split("?")[0].toLowerCase().endsWith(".xml")) {
    const n = t.replace(/\/[^/]*$/u, "");
    return { basisUrl: t, baseDir: n };
  }
  const i = t.replace(/\/+$/u, "");
  return { basisUrl: `${i}/SPlanKl_Basis.xml`, baseDir: i };
}
async function rt(o) {
  const t = `${o}${o.includes("?") ? "&" : "?"}_ts=${Date.now()}`, e = await fetch(t, { cache: "no-store" });
  if (!e.ok) throw new Error(`HTTP ${e.status} (${e.statusText}) bei ${o}`);
  return await e.text();
}
function Ee(o) {
  const t = Array.from(o.querySelectorAll("Klassen > Kl > Kurz")).map((s) => (s.textContent ?? "").trim()).filter((s) => !!s), e = Array.from(o.querySelectorAll("Schulwochen > Sw")).map((s) => {
    const i = (s.textContent ?? "").trim(), r = (s.getAttribute("SwDatumVon") ?? "").trim(), n = (s.getAttribute("SwDatumBis") ?? "").trim(), l = at(s.getAttribute("SwWo"));
    return { sw: i, from: r, to: n, wo: l ?? void 0 };
  });
  return { classes: t, weeks: e };
}
function Ot(o, t) {
  const e = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0).getTime();
  for (const s of o.weeks) {
    const i = Ft(s.from), r = Ft(s.to);
    if (!i || !r) continue;
    const n = i.getTime(), l = r.getTime();
    if (e >= n && e <= l) return { sw: s.sw, wo: s.wo };
  }
  return null;
}
function Re(o) {
  const t = (o ?? "").toString().trim();
  return t && (t.length === 1 ? `0${t}` : t);
}
function Ne(o, t) {
  const e = (t ?? "").trim().toLowerCase();
  if (!e) return !1;
  const s = (o ?? "").replace(/\u00a0/g, " ").trim().toLowerCase();
  if (!s) return !1;
  if (s === e) return !0;
  const i = s.split(/[,/;|\s]+/u).map((r) => r.trim()).filter((r) => !!r);
  for (const r of i) {
    if (r === e) return !0;
    const n = r.match(/^(\d+)([a-z])\s*-\s*(\d+)([a-z])$/i);
    if (n) {
      const l = Number(n[1]), a = n[2].toLowerCase().charCodeAt(0), u = Number(n[3]), c = n[4].toLowerCase().charCodeAt(0), d = e.match(/^(\d+)([a-z])$/i);
      if (!d) continue;
      const h = Number(d[1]), _ = d[2].toLowerCase().charCodeAt(0);
      if (l === u && h === l) {
        const f = Math.min(a, c), b = Math.max(a, c);
        if (_ >= f && _ <= b) return !0;
      }
    }
  }
  return s.includes(e);
}
function Y(o, t) {
  return (o?.querySelector(t)?.textContent ?? "").replace(/\u00a0/g, " ").trim();
}
function Ut(o, t) {
  const e = Number((o?.querySelector(t)?.textContent ?? "").trim());
  return Number.isFinite(e) ? e : 0;
}
function Le(o, t) {
  const e = Array.from(o.querySelectorAll("Pl > Std, Std")), s = t.splan_plan_art ?? "class", i = (t.splan_class ?? "").trim(), r = [];
  for (const n of e) {
    const l = Ut(n, "PlTg"), a = Ut(n, "PlSt");
    if (!l || !a) continue;
    const u = Y(n, "PlFa"), c = Y(n, "PlLe"), d = Y(n, "PlRa"), h = (Y(n, "PlWo") || "").toUpperCase(), _ = h === "A" || h === "B" ? h : "";
    if (s === "class") {
      const f = Y(n, "PlKl");
      if (f && i && !Ne(f, i)) continue;
    } else if (s === "teacher") {
      if (i && c.toLowerCase() !== i.toLowerCase()) continue;
    } else if (s === "room" && i && d.toLowerCase() !== i.toLowerCase())
      continue;
    !u && !c && !d || r.push({ day: l, hour: a, subject: u, teacher: c, room: d, week: _ });
  }
  return r;
}
function De(o) {
  const t = Array.from(o.querySelectorAll("Std")), e = [];
  for (const s of t) {
    const i = Number((s.querySelector("St")?.textContent ?? "").trim());
    if (!Number.isFinite(i) || i <= 0) continue;
    const r = s.querySelector("Fa"), n = s.querySelector("Le"), l = s.querySelector("Ra"), a = (r?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, u = (n?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, c = (l?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, d = (r?.getAttribute("FaAe") ?? "").toLowerCase().includes("geaendert"), h = (n?.getAttribute("LeAe") ?? "").toLowerCase().includes("geaendert"), _ = (l?.getAttribute("RaAe") ?? "").toLowerCase().includes("geaendert"), f = (s.querySelector("If")?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0;
    e.push({
      day: 0,
      // wird beim Merge gesetzt (Datei=Tag)
      hour: i,
      subject: a,
      teacher: u,
      room: c,
      info: f,
      changed_subject: d,
      changed_teacher: h,
      changed_room: _
    });
  }
  return e;
}
function It(o) {
  const t = o.getDay();
  return t === 0 ? 7 : t;
}
const G = class G extends K {
  constructor() {
    super(...arguments), this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanMobilWeek = null, this._splanErr = null, this._splanLoading = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  /**
   * XML gilt als "aktiv", sobald eine Quelle (URL) und ein Ziel (Klasse/Lehrer/Raum) gesetzt sind.
   * Optional kann per YAML noch deaktiviert werden (splan_xml_enabled: false), der Editor-Schalter ist entfernt.
   */
  isSplanXmlActive(t) {
    const e = (t.splan_xml_url ?? "").toString().trim(), s = (t.splan_class ?? "").toString().trim();
    return !!e && !!s && t.splan_xml_enabled !== !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.reloadSplanIfNeeded(!0), this._tick = window.setInterval(() => {
      this.requestUpdate(), this.config && this.isSplanXmlActive(this.config) && Date.now() % (600 * 1e3) < 3e4 && this.reloadSplanIfNeeded(!1);
    }, 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tick && window.clearInterval(this._tick), this._tick = void 0;
  }
  updated(t) {
    super.updated(t), t.has("config") && this.reloadSplanIfNeeded(!0);
  }
  async reloadSplanIfNeeded(t) {
    const e = this.config;
    if (!e || !this.isSplanXmlActive(e)) return;
    const s = (e.splan_xml_url ?? "").toString().trim(), i = (e.splan_class ?? "").toString().trim();
    if (!s || !i) {
      this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanMobilWeek = null, this._splanErr = "Quelle aktiv, aber URL oder Klasse fehlt.", this.requestUpdate();
      return;
    }
    if (this._splanLoading) return;
    const r = Se(s);
    if (!(!t && (r && this._splanMobilWeek && !this._splanErr || !r && this._splanBasis && this._splanWeekLessons && !this._splanErr))) {
      this._splanLoading = !0, this._splanErr = null;
      try {
        if (r) {
          const $ = await rt(s), v = JSON.parse($);
          this._splanMobilWeek = v, this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanErr = null;
          return;
        }
        this._splanMobilWeek = null;
        const { basisUrl: n, baseDir: l } = Te(s), a = await rt(n), u = new DOMParser().parseFromString(a, "text/xml"), c = Ee(u);
        this._splanBasis = c;
        const d = Ot(c, /* @__PURE__ */ new Date());
        if (!d?.sw) throw new Error("Schulwoche (Sw) in Basis nicht für heutiges Datum gefunden.");
        const h = d.sw.trim(), _ = [`${l}/SPlanKl_Sw${h}.xml`, `${l}/SPlanKl_Sw${Re(h)}.xml`];
        let f = null, b = null;
        for (const $ of _)
          try {
            f = await rt($);
            break;
          } catch (v) {
            b = v;
          }
        if (!f)
          throw new Error(
            `Wochenplan-Datei nicht gefunden (versucht: ${_.join(", ")}). ${b?.message ?? ""}`
          );
        const m = new DOMParser().parseFromString(f, "text/xml");
        if (this._splanWeekLessons = Le(m, e), this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), e.splan_sub_enabled) {
          const $ = Math.max(1, Math.min(14, Number(e.splan_sub_days ?? 3)));
          for (let v = 0; v < $; v++) {
            const y = /* @__PURE__ */ new Date();
            y.setDate(y.getDate() + v);
            const x = It(y);
            if (x === 6 || x === 7) continue;
            const C = `${l}/WPlanKl_${Me(y)}.xml`;
            try {
              const L = await rt(C), E = new DOMParser().parseFromString(L, "text/xml"), M = De(E).map((k) => ({ ...k, day: x }));
              this._splanSubLessonsByDay.set(x, M);
            } catch {
            }
          }
        }
        this._splanErr = null;
      } catch (n) {
        this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanMobilWeek = null, this._splanErr = n?.message ? String(n.message) : String(n);
      } finally {
        this._splanLoading = !1, this.requestUpdate();
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
      source_time_key: "Stunde",
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
      splan_xml_enabled: !0,
      splan_xml_url: "/local/splan/sdaten",
      splan_class: "5a",
      splan_week: "auto",
      splan_show_room: !0,
      splan_show_teacher: !1,
      splan_sub_enabled: !1,
      splan_sub_days: 3,
      splan_sub_show_info: !0,
      splan_plan_art: "class",
      // ✅ Filter defaults
      filter_main_only: !0,
      filter_allow_prefixes: [],
      filter_exclude: [],
      rows: [
        {
          time: "1. 08:00–08:45",
          start: "08:00",
          end: "08:45",
          cells: ["D", "M", "E", "D", "S"],
          cell_styles: [
            { bg: "#3b82f6", bg_alpha: 0.18, color: "#ffffff" },
            { bg: "#22c55e", bg_alpha: 0.18, color: "#ffffff" },
            null,
            null,
            { bg: "#a855f7", bg_alpha: 0.18, color: "#ffffff" }
          ]
        },
        {
          time: "2. 08:50–09:35",
          start: "08:50",
          end: "09:35",
          cells: ["M", "M", "D", "E", "S"],
          cell_styles: [null, null, null, null, null]
        },
        { break: !0, time: "09:35–09:55", label: "Pause" }
      ]
    };
  }
  static getConfigElement() {
    return document.createElement("stundenplan-card-editor");
  }
  setConfig(t) {
    const e = G.getStubConfig(), s = ((t?.type ?? e.type) + "").toString();
    if (!(s === "custom:stundenplan-card" || s === "stundenplan-card")) {
      this.config = this.normalizeConfig(e);
      return;
    }
    this.config = this.normalizeConfig({
      ...e,
      ...t,
      type: s
    });
  }
  getCardSize() {
    const t = this.config?.rows?.length ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = G.getStubConfig(), s = Array.isArray(t.days) && t.days.length ? t.days.map((f) => (f ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((f) => {
      if (N(f))
        return {
          break: !0,
          time: (f.time ?? "").toString(),
          label: (f.label ?? "Pause").toString()
        };
      const b = Array.isArray(f?.cells) ? f.cells : [], m = Array.from({ length: s.length }, (M, k) => (b[k] ?? "").toString()), $ = Array.isArray(f?.cell_styles) ? f.cell_styles : [], v = Array.from({ length: s.length }, (M, k) => ot($[k])), y = (f?.time ?? "").toString(), x = F(y), C = (f?.start ?? "").toString().trim(), L = (f?.end ?? "").toString().trim(), E = {
        time: y,
        start: C || x.start || void 0,
        end: L || x.end || void 0,
        cells: m
      };
      return v.some((M) => !!M) && (E.cell_styles = v), E;
    }), n = ((t.week_mode ?? e.week_mode) + "").toString().trim(), l = n === "kw_parity" || n === "week_map" || n === "off" ? n : "off", a = ((t.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), u = a === "a" ? "A" : a === "b" ? "B" : "auto", c = ((t.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), d = c === "teacher" ? "teacher" : c === "room" ? "room" : "class", h = Number(t.splan_sub_days ?? e.splan_sub_days), _ = Number.isFinite(h) ? Math.max(1, Math.min(14, h)) : e.splan_sub_days;
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
      source_entity: (t.source_entity ?? e.source_entity).toString(),
      source_attribute: (t.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (t.source_time_key ?? e.source_time_key).toString(),
      splan24_entity: (t.splan24_entity ?? "").toString(),
      splan24_attribute: (t.splan24_attribute ?? "rows_ha").toString(),
      week_mode: l,
      week_a_is_even_kw: t.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (t.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (t.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (t.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (t.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (t.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (t.source_attribute_b ?? e.source_attribute_b).toString(),
      // XML
      splan_xml_enabled: t.splan_xml_enabled ?? !0,
      splan_xml_url: (t.splan_xml_url ?? e.splan_xml_url).toString(),
      splan_class: (t.splan_class ?? e.splan_class).toString(),
      splan_week: u,
      splan_show_room: t.splan_show_room ?? e.splan_show_room,
      splan_show_teacher: t.splan_show_teacher ?? e.splan_show_teacher,
      // Vertretung
      splan_sub_enabled: t.splan_sub_enabled ?? e.splan_sub_enabled,
      splan_sub_days: _,
      splan_sub_show_info: t.splan_sub_show_info ?? e.splan_sub_show_info,
      // Planart
      splan_plan_art: d,
      // ✅ Filter
      filter_main_only: t.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(t.filter_allow_prefixes) ? t.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(t.filter_exclude) ? t.filter_exclude.map(String) : [],
      rows: r
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), s = new Set(xe(e).map(bt));
    if (!s.size) return -1;
    const i = (t ?? []).map((r) => bt(r));
    for (let r = 0; r < i.length; r++) if (s.has(i[r])) return r;
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
    const r = /* @__PURE__ */ new Date(), n = r.getHours() * 60 + r.getMinutes();
    return n >= s && n < i;
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
    const i = this.hass.states[s], r = (e ?? "").toString().trim(), n = r ? i.attributes?.[r] : i.state;
    return this.parseAnyJson(n);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const s = t.days ?? [], i = (t.source_time_key ?? "Stunde").toString(), r = e.map((n) => {
      if (n?.break === !0)
        return {
          break: !0,
          time: (n.time ?? n[i] ?? "").toString(),
          label: (n.label ?? "Pause").toString()
        };
      const l = (n?.time ?? n?.[i] ?? "").toString(), a = F(l), u = Array.from({ length: s.length }, (d, h) => {
        const _ = (s[h] ?? "").toString();
        return (n?.[_] ?? "").toString();
      });
      return { time: l, start: a.start, end: a.end, cells: u };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, s) {
    const i = this.readEntityJson(e, s);
    return Array.isArray(i) ? this.buildRowsFromArray(t, i) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = zt(/* @__PURE__ */ new Date()), s = e % 2 === 0, i = !!t.week_a_is_even_kw;
    return s === i ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const s = (t.week_map_attribute ?? "").toString().trim(), i = this.readEntityJson(e, s);
    if (!i || typeof i != "object") return null;
    const { isoWeek: r, isoYear: n } = zt(/* @__PURE__ */ new Date()), l = String(r), a = String(n);
    if (i?.[a] && typeof i[a] == "object") {
      const c = at(i[a][l]);
      if (c) return c;
    }
    const u = at(i?.[l]);
    return u || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    const e = this.getRowsFromSplanXml(t);
    if (e) return e;
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), n = (t.source_entity_b ?? "").trim(), l = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (i === "A" && r) {
        const c = this.getRowsFromEntity(t, r, l);
        if (c) return c;
      }
      if (i === "B" && n) {
        const c = this.getRowsFromEntity(t, n, a);
        if (c) return c;
      }
      const u = (t.source_entity ?? "").trim();
      if (u) {
        const c = this.getRowsFromEntity(t, u, (t.source_attribute ?? "").trim());
        if (c) return c;
      }
      return t.rows ?? [];
    }
    const s = (t.source_entity ?? "").toString().trim();
    return s ? this.getRowsFromEntity(t, s, (t.source_attribute ?? "").toString().trim()) ?? t.rows ?? [] : t.rows ?? [];
  }
  /**
   * Fix: Fallback für Zeiten aus manuellen cfg.rows, wenn XML Stundenzeiten nicht liefert
   */
  getFallbackTimesFromManual(t, e) {
    const s = t.rows ?? [];
    for (const i of s) {
      if (N(i)) continue;
      const r = i, n = (r.time ?? "").match(/^\s*(\d+)\s*\./);
      if (!n || parseInt(n[1], 10) !== e) continue;
      const a = F(r.time), u = (r.start ?? "").toString().trim() || a.start, c = (r.end ?? "").toString().trim() || a.end;
      return { start: u || void 0, end: c || void 0 };
    }
    return {};
  }
  parseHourNumberFromTimeLabel(t) {
    const s = (t ?? "").toString().match(/^\s*(\d{1,2})\s*\./);
    if (!s) return null;
    const i = parseInt(s[1], 10);
    return Number.isFinite(i) ? i : null;
  }
  getManualHourTimeMap(t) {
    const e = /* @__PURE__ */ new Map(), s = t.rows ?? [];
    for (const i of s) {
      if (N(i)) continue;
      const r = i, n = this.parseHourNumberFromTimeLabel(r.time);
      if (!n) continue;
      const l = F(r.time), a = (r.start ?? "").toString().trim() || l.start, u = (r.end ?? "").toString().trim() || l.end;
      (a || u) && e.set(n, { start: a || void 0, end: u || void 0 });
    }
    return e;
  }
  normalizeSequentialTimes(t, e) {
    const s = new Map(e);
    let i = null;
    const r = (n) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
    for (const n of t) {
      const l = s.get(n);
      if (!l) continue;
      const a = this.toMinutes(l.start), u = this.toMinutes(l.end);
      if (i != null && a != null && a < i) {
        const h = i;
        let _ = u;
        const f = a != null && u != null ? Math.max(0, u - a) : null;
        _ != null && _ <= h && (f != null && f > 0 ? _ = h + f : _ = h + 45), s.set(n, { start: r(h), end: _ != null ? r(_) : l.end });
      }
      const c = s.get(n)?.end, d = this.toMinutes(c);
      d != null && (i = d);
    }
    return s;
  }
  // ✅ NEU: Textfilter gegen "zu viele Kurse"
  filterCellText(t, e) {
    const s = (t ?? "").toString().trim();
    if (!s) return "";
    const i = s.split("/").map((h) => h.trim()).filter((h) => h.length > 0 && h !== "---" && h !== "—"), r = (e.filter_exclude ?? []).map((h) => h.trim()).filter(Boolean), n = (h) => r.some((_) => {
      try {
        return new RegExp(_, "i").test(h);
      } catch {
        return h.toLowerCase().includes(_.toLowerCase());
      }
    }), l = i.filter((h) => !n(h)), a = e.filter_main_only !== !1 ? l.filter((h) => !/^\d/.test(h)) : l, u = (e.filter_allow_prefixes ?? []).map((h) => h.toLowerCase()).filter(Boolean), c = l.filter((h) => {
      const _ = h.match(/^(\d+[a-z]+)/i);
      if (!_) return !1;
      const f = _[1].toLowerCase();
      return u.some((b) => f.startsWith(b));
    });
    return Array.from(/* @__PURE__ */ new Set([...a, ...c])).join(" / ");
  }
  getRowsFromSplanXml(t) {
    if (!this.isSplanXmlActive(t)) return null;
    if (this._splanMobilWeek?.days?.length) {
      const m = t.days ?? [], $ = m.map((g) => Wt(g)), v = /* @__PURE__ */ new Map();
      for (const g of this._splanMobilWeek.days ?? []) {
        const w = Ae(g.date ?? "");
        w && v.set(w, Array.isArray(g.lessons) ? g.lessons : []);
      }
      const y = /* @__PURE__ */ new Set();
      for (const g of v.values())
        for (const w of g) {
          const A = Number((w.stunde ?? "").toString().trim());
          Number.isFinite(A) && A > 0 && y.add(A);
        }
      const x = this.getManualHourTimeMap(t);
      for (const g of x.keys()) y.add(g);
      const C = Array.from(y).sort((g, w) => g - w);
      if (!C.length) return null;
      const L = /* @__PURE__ */ new Map();
      for (const g of C) {
        let w, A;
        for (const R of v.values()) {
          const z = R.find((j) => Number(j.stunde) === g);
          if (z?.start || z?.end) {
            w = (z.start ?? "").trim() || void 0, A = (z.end ?? "").trim() || void 0;
            break;
          }
        }
        const S = x.get(g);
        L.set(g, {
          start: w ?? S?.start,
          end: A ?? S?.end
        });
      }
      const E = this.normalizeSequentialTimes(C, L), M = !!t.splan_show_room, k = !!t.splan_show_teacher, D = (g) => {
        if (!g) return "";
        const w = Ce(g.fach, g.info);
        if (w.startsWith("---")) return w;
        const A = (g.raum ?? "").toString().trim(), S = (g.lehrer ?? "").toString().trim(), R = [];
        if (M && A && R.push(A), k && S && R.push(S), R.length) {
          const [z, ...j] = w.split(`
`), _t = `${z} (${R.join(" · ")})`;
          return j.length ? `${_t}
${j.join(`
`)}` : _t;
        }
        return w;
      }, B = C.map((g) => {
        const w = E.get(g) ?? this.getFallbackTimesFromManual(t, g) ?? {}, A = (w.start ?? "").trim(), S = (w.end ?? "").trim(), R = `${g}.`, z = A && S ? `${R} ${A}–${S}` : `${R}`, j = m.map((_t, Jt) => {
          const kt = $[Jt];
          if (!kt) return "";
          const Gt = (v.get(kt) ?? []).find((Qt) => Number(Qt.stunde) === g) ?? null;
          return D(Gt);
        });
        return {
          time: z,
          start: A || void 0,
          end: S || void 0,
          cells: j
        };
      }).filter((g) => {
        if (N(g)) return !0;
        const w = g, A = this.parseHourNumberFromTimeLabel(w.time), S = !!(A && x.has(A));
        return (w.cells ?? []).some((z) => !it(z)) || S;
      });
      return B.length ? B : null;
    }
    if (!this._splanWeekLessons || !this._splanWeekLessons.length) return null;
    const e = t.days ?? [], s = e.map((m) => Wt(m)), i = !!t.splan_show_room, r = !!t.splan_show_teacher;
    let n = null;
    if (t.splan_week === "A") n = "A";
    else if (t.splan_week === "B") n = "B";
    else {
      const m = this._splanBasis ? Ot(this._splanBasis, /* @__PURE__ */ new Date())?.wo ?? null : null;
      m ? n = m : t.week_mode !== "off" ? n = this.getActiveWeek(t) : n = null;
    }
    const l = this.getManualHourTimeMap(t), a = this._splanWeekLessons.map((m) => m.hour).filter((m) => Number.isFinite(m)), u = Array.from(l.keys()), c = Array.from(/* @__PURE__ */ new Set([...a, ...u])).sort((m, $) => m - $);
    if (!c.length) return null;
    const d = this.normalizeSequentialTimes(c, l), h = It(/* @__PURE__ */ new Date()), _ = (m, $, v, y, x) => {
      const C = (m ?? "").trim(), L = ($ ?? "").trim(), E = (v ?? "").trim(), M = [];
      i && L && M.push(L), r && E && M.push(E);
      let k = M.length ? `${C} (${M.join(" · ")})` : C;
      return (x?.s || x?.r || x?.t) && (k = `🔁 ${k}`), t.splan_sub_show_info && y && (k = `${k}
${y}`), k.trim();
    }, b = c.map((m) => {
      const $ = d.get(m) ?? this.getFallbackTimesFromManual(t, m) ?? {}, v = ($.start ?? "").trim(), y = ($.end ?? "").trim(), x = `${m}.`, C = v && y ? `${x} ${v}–${y}` : `${x}`, E = e.map((M, k) => {
        const D = s[k];
        if (!D) return "";
        const P = this._splanWeekLessons.filter((S) => {
          if (S.hour !== m || S.day !== D) return !1;
          const R = at(S.week);
          return !R || !n ? !0 : R === n;
        }), g = (this._splanSubLessonsByDay.get(D) ?? []).find((S) => S.hour === m) ?? null, w = [];
        if (g && D === h)
          w.push(
            _(
              g.subject ?? P[0]?.subject ?? "",
              g.room ?? P[0]?.room ?? "",
              g.teacher ?? P[0]?.teacher ?? "",
              g.info,
              { s: !!g.changed_subject, r: !!g.changed_room, t: !!g.changed_teacher }
            )
          );
        else
          for (const S of P) w.push(_(S.subject, S.room, S.teacher));
        return Array.from(new Set(w.filter((S) => S.trim().length > 0))).join(" / ");
      }).map((M) => this.filterCellText(M, t));
      return {
        time: C,
        start: v || void 0,
        end: y || void 0,
        cells: E
      };
    }).filter((m) => {
      if (N(m)) return !0;
      const $ = m, v = this.parseHourNumberFromTimeLabel($.time), y = !!(v && l.has(v));
      return ($.cells ?? []).some((C) => !it(C)) || y;
    });
    return b.length ? b : null;
  }
  render() {
    if (!this.config) return p``;
    const t = this.config, e = this.getRowsResolved(t), s = this.getTodayIndex(t.days ?? []), i = "1px solid var(--divider-color)", r = Bt(t.highlight_today_color ?? "", 0.12), n = Bt(t.highlight_current_color ?? "", 0.18), l = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), u = t.week_mode !== "off", c = u ? this.getActiveWeek(t) : null, d = this.isSplanXmlActive(t), h = (t.splan_class ?? "").trim(), _ = t.splan_week === "auto" ? "auto" : t.splan_week, f = (t.splan_plan_art ?? "class").toString();
    return p`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${u ? p`<div class="weekBadge">Woche: <b>${c}</b></div>` : p``}

          ${d ? p`
                <div class="xmlBadge">
                  <div class="xmlLine">
                    <b>XML</b>
                    <span class="mono">${f}</span>
                    <span class="mono">${h}</span>
                    <span class="mono">${_}</span>
                    ${t.splan_sub_enabled ? p`<span class="pill">Vertretung an</span>` : p``}
                    ${this._splanLoading ? p`<span class="pill">lädt…</span>` : p``}
                    ${this._splanErr ? p`<span class="pill err">Fehler</span>` : p``}
                  </div>
                  ${this._splanErr ? p`<div class="xmlErr">${this._splanErr}</div>` : p``}
                </div>
              ` : p``}

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((b, m) => {
      const $ = t.highlight_today && m === s ? "today" : "";
      return p`<th class=${$} style=${`--sp-hl:${r};`}>${b}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((b) => {
      if (N(b)) {
        const P = F(b.time), B = !!P.start && !!P.end && this.isNowBetween(P.start, P.end), g = !!t.highlight_breaks && B;
        let w = `--sp-hl:${n};`, A = "";
        return g && (w += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", A += `--sp-hl:${n}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), g && t.highlight_current_time_text && a && (w += `color:${a};`), p`
                    <tr class="break">
                      <td class="time" style=${w}>${b.time}</td>
                      <td colspan=${t.days.length} style=${A}>${b.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = b, $ = m.cells ?? [], v = m.cell_styles ?? [], y = $.map((P) => this.filterCellText(P, t)), x = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), C = s >= 0 ? $[s] ?? "" : "", L = s >= 0 ? this.filterCellText(C, t) : "", E = s >= 0 ? it(L) : !1, k = !(!!t.free_only_column_highlight && E);
      let D = `--sp-hl:${n};`;
      return k && t.highlight_current && x && (D += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), k && x && t.highlight_current_time_text && a && (D += `color:${a};`), p`
                  <tr>
                    <td class="time" style=${D}>${m.time}</td>

                    ${t.days.map((P, B) => {
        const g = y[B] ?? "", w = v[B] ?? null, A = t.highlight_today && B === s ? "today" : "";
        let S = `--sp-hl:${r};` + ft(w, i);
        const R = !it(g);
        return k && R && x && t.highlight_current_text && l && s >= 0 && B === s && (S += `color:${l};`), p`<td class=${A} style=${S}><span class="cellText">${g}</span></td>`;
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
};
G.styles = qt`
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
    .card {
      padding: 12px;
    }
    .weekBadge {
      margin: 0 0 10px 0;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      font-size: 13px;
      opacity: 0.95;
    }
    .xmlBadge {
      margin: 0 0 10px 0;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
      font-size: 13px;
      opacity: 0.95;
    }
    .xmlLine {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .pill {
      padding: 2px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      font-size: 12px;
      opacity: 0.9;
      background: var(--secondary-background-color);
    }
    .pill.err {
      background: rgba(255, 0, 0, 0.08);
    }
    .xmlErr {
      margin-top: 6px;
      font-size: 12px;
      opacity: 0.8;
      color: var(--error-color, #ff5252);
      word-break: break-word;
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
      word-break: break-word;
    }
    th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }
    .time {
      font-weight: 700;
      white-space: nowrap;
    }
    td.today,
    th.today {
      box-shadow: inset 0 0 0 9999px var(--sp-hl, rgba(0, 150, 255, 0.12));
    }
    .break {
      font-style: italic;
      opacity: 0.75;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      opacity: 0.85;
      word-break: break-word;
    }
    .cellText {
      white-space: pre-line; /* wichtig für Vertretungs-Info \n */
      display: inline-block;
    }
  `;
let ut = G;
const ht = class ht extends K {
  constructor() {
    super(...arguments), this._ui = {
      openGeneral: !1,
      openHighlight: !1,
      openColors: !1,
      openSources: !1,
      openRows: !1,
      openSplan24: !1,
      splan24Query: "",
      showCellStyles: !0,
      rowOpen: {}
    };
  }
  setConfig(t) {
    const e = ((t?.type ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    const s = !!this._config;
    this._config = this.normalizeConfig(this.clone(t)), s || (this._ui.rowOpen = {});
  }
  normalizeConfig(t) {
    const e = ut.getStubConfig(), s = { ...e, ...t, type: (t.type ?? e.type).toString() }, i = Array.isArray(s.days) && s.days.length ? s.days.map((b) => (b ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(s.rows) ? s.rows : []).map((b) => {
      if (N(b))
        return { break: !0, time: (b.time ?? "").toString(), label: (b.label ?? "Pause").toString() };
      const m = Array.isArray(b?.cells) ? b.cells : [], $ = Array.from({ length: i.length }, (k, D) => (m[D] ?? "").toString()), v = Array.isArray(b?.cell_styles) ? b.cell_styles : [], y = Array.from({ length: i.length }, (k, D) => ot(v[D])), x = (b?.time ?? "").toString(), C = F(x), L = (b?.start ?? "").toString().trim(), E = (b?.end ?? "").toString().trim(), M = {
        time: x,
        start: L || C.start || void 0,
        end: E || C.end || void 0,
        cells: $
      };
      return y.some((k) => !!k) && (M.cell_styles = y), M;
    }), l = ((s.week_mode ?? e.week_mode) + "").toString().trim(), a = l === "kw_parity" || l === "week_map" || l === "off" ? l : "off", u = ((s.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), c = u === "a" ? "A" : u === "b" ? "B" : "auto", d = ((s.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), h = d === "teacher" ? "teacher" : d === "room" ? "room" : "class", _ = Number(s.splan_sub_days ?? e.splan_sub_days), f = Number.isFinite(_) ? Math.max(1, Math.min(14, _)) : e.splan_sub_days;
    return {
      type: (s.type ?? e.type).toString(),
      title: (s.title ?? e.title).toString(),
      days: i,
      highlight_today: s.highlight_today ?? e.highlight_today,
      highlight_current: s.highlight_current ?? e.highlight_current,
      highlight_breaks: s.highlight_breaks ?? e.highlight_breaks,
      free_only_column_highlight: s.free_only_column_highlight ?? e.free_only_column_highlight,
      highlight_today_color: (s.highlight_today_color ?? e.highlight_today_color).toString(),
      highlight_current_color: (s.highlight_current_color ?? e.highlight_current_color).toString(),
      highlight_current_text: s.highlight_current_text ?? e.highlight_current_text,
      highlight_current_text_color: (s.highlight_current_text_color ?? e.highlight_current_text_color).toString(),
      highlight_current_time_text: s.highlight_current_time_text ?? e.highlight_current_time_text,
      highlight_current_time_text_color: (s.highlight_current_time_text_color ?? e.highlight_current_time_text_color).toString(),
      source_entity: (s.source_entity ?? e.source_entity).toString(),
      source_attribute: (s.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (s.source_time_key ?? e.source_time_key).toString(),
      splan24_entity: (s.splan24_entity ?? "").toString(),
      splan24_attribute: (s.splan24_attribute ?? "rows_ha").toString(),
      week_mode: a,
      week_a_is_even_kw: s.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (s.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (s.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (s.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (s.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (s.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (s.source_attribute_b ?? e.source_attribute_b).toString(),
      // XML: Default aktiv (Editor-Schalter entfernt). Per YAML kann noch deaktiviert werden.
      splan_xml_enabled: s.splan_xml_enabled ?? !0,
      splan_xml_url: (s.splan_xml_url ?? e.splan_xml_url).toString(),
      splan_class: (s.splan_class ?? e.splan_class).toString(),
      splan_week: c,
      splan_show_room: s.splan_show_room ?? e.splan_show_room,
      splan_show_teacher: s.splan_show_teacher ?? e.splan_show_teacher,
      splan_sub_enabled: s.splan_sub_enabled ?? e.splan_sub_enabled,
      splan_sub_days: f,
      splan_sub_show_info: s.splan_sub_show_info ?? e.splan_sub_show_info,
      // ✅ Filter (Editor muss es mitführen)
      filter_main_only: s.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(s.filter_allow_prefixes) ? s.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(s.filter_exclude) ? s.filter_exclude.map(String) : [],
      splan_plan_art: h,
      rows: n
    };
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 }));
  }
  setSplan24Entity(t) {
    if (!this._config) return;
    const e = (t ?? "").toString().trim(), s = "rows_ha";
    this.emit({
      ...this._config,
      splan24_entity: e,
      splan24_attribute: s,
      source_entity: e,
      source_attribute: s,
      source_time_key: "time"
    });
  }
  shiftRowOpenAfterInsert(t) {
    const e = {};
    for (const [s, i] of Object.entries(this._ui.rowOpen)) {
      const r = Number(s);
      Number.isNaN(r) || (e[r >= t ? r + 1 : r] = i);
    }
    this._ui.rowOpen = e;
  }
  shiftRowOpenAfterRemove(t) {
    const e = {};
    for (const [s, i] of Object.entries(this._ui.rowOpen)) {
      const r = Number(s);
      Number.isNaN(r) || r === t || (e[r > t ? r - 1 : r] = i);
    }
    this._ui.rowOpen = e;
  }
  rgbaFromHex(t, e) {
    const s = ct(t);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${H(e)})` : `rgba(0,0,0,${H(e)})`;
  }
  parseColorToHexAlpha(t, e, s) {
    const i = (t ?? "").toString().trim();
    if (i.startsWith("#"))
      return ct(i) ? { hex: i, alpha: H(s) } : { hex: e, alpha: H(s) };
    const r = i.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const l = Math.max(0, Math.min(255, Number(r[1]))), a = Math.max(0, Math.min(255, Number(r[2]))), u = Math.max(0, Math.min(255, Number(r[3]))), c = H(Number(r[4])), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(l)}${d(a)}${d(u)}`, alpha: c };
    }
    const n = i.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (n) {
      const l = Math.max(0, Math.min(255, Number(n[1]))), a = Math.max(0, Math.min(255, Number(n[2]))), u = Math.max(0, Math.min(255, Number(n[3]))), c = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${c(l)}${c(a)}${c(u)}`, alpha: H(s) };
    }
    return { hex: e, alpha: H(s) };
  }
  setHighlightRgba(t, e, s) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, s) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((r) => r.trim()).filter((r) => r.length), s = (this._config.rows ?? []).map((r) => {
      if (N(r)) return r;
      const n = r, l = Array.from({ length: e.length }, (u, c) => (n.cells?.[c] ?? "").toString()), a = Array.from({ length: e.length }, (u, c) => ot(n.cell_styles?.[c]));
      return { ...n, cells: l, cell_styles: a };
    });
    this.emit({ ...this._config, days: e, rows: s });
    const i = {};
    Object.entries(this._ui.rowOpen).forEach(([r, n]) => {
      const l = Number(r);
      !Number.isNaN(l) && l >= 0 && l < s.length && (i[l] = n);
    }), this._ui.rowOpen = i;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => {
      if (r !== t) return i;
      if (N(i)) return { ...i, time: e };
      const n = i, l = F(n.time), a = F(e), u = (n.start ?? "").toString().trim(), c = (n.end ?? "").toString().trim(), d = !u || !!l.start && u === l.start, h = !c || !!l.end && c === l.end;
      return {
        ...n,
        time: e,
        start: d ? a.start ?? n.start : n.start,
        end: h ? a.end ?? n.end : n.end
      };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map(
      (i, r) => r !== t || N(i) ? i : { ...i, start: e || void 0 }
    );
    this.emit({ ...this._config, rows: s });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map(
      (i, r) => r !== t || N(i) ? i : { ...i, end: e || void 0 }
    );
    this.emit({ ...this._config, rows: s });
  }
  updateRowCell(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, n) => {
      if (n !== t || N(r)) return r;
      const l = r, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = s, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateCellStyle(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, n) => {
      if (n !== t || N(r)) return r;
      const l = r, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), c = { ...a[e] ? { ...a[e] } : {}, ...s };
      return typeof c.bg_alpha == "number" && (c.bg_alpha = H(c.bg_alpha)), a[e] = ot(c), { ...l, cell_styles: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => r !== t ? i : e ? { break: !0, time: i.time ?? "", label: i.label ?? "Pause" } : {
      time: i.time ?? "",
      start: void 0,
      end: void 0,
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    });
    this.emit({ ...this._config, rows: s });
  }
  updateBreakLabel(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => r === t ? { ...i, label: e } : i);
    this.emit({ ...this._config, rows: s });
  }
  addLessonRow(t) {
    if (!this._config) return;
    const e = {
      time: "",
      start: "",
      end: "",
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    }, s = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < s.length) {
      const i = t + 1;
      this.shiftRowOpenAfterInsert(i), s.splice(i, 0, e);
    } else
      s.push(e);
    this.emit({ ...this._config, rows: s });
  }
  addBreakRow(t) {
    if (!this._config) return;
    const e = { break: !0, time: "", label: "Pause" }, s = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < s.length) {
      const i = t + 1;
      this.shiftRowOpenAfterInsert(i), s.splice(i, 0, e);
    } else
      s.push(e);
    this.emit({ ...this._config, rows: s });
  }
  removeRow(t) {
    if (!this._config) return;
    const e = this._config.rows.filter((s, i) => i !== t);
    this.shiftRowOpenAfterRemove(t), this.emit({ ...this._config, rows: e });
  }
  async jumpToCell(t, e) {
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((r) => requestAnimationFrame(() => r(null))), await new Promise((r) => requestAnimationFrame(() => r(null)));
    const s = `sp-cell-${t}-${e}`, i = this.renderRoot?.getElementById(s);
    i && (i.scrollIntoView({ behavior: "smooth", block: "center" }), i.focus?.());
  }
  uiSwitch(t, e) {
    return p`
      <label class="switch">
        <input type="checkbox" .checked=${t} @change=${(s) => e(!!s.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }
  panel(t, e, s, i) {
    return p`
      <details class="panel" ?open=${e} @toggle=${(r) => s(!!r.target.open)}>
        <summary>
          <div class="panelTitle">${t}</div>
        </summary>
        <div class="panelBody">${i}</div>
      </details>
    `;
  }
  renderEditorPreview() {
    if (!this._config) return p``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], s = this._config.rows ?? [];
    return p`
      <div class="previewWrap">
        <div class="previewTop">
          <div>
            <div class="previewTitle">Vorschau</div>
            <div class="previewHint">Klick auf ein Fach springt zur passenden Zelle im Editor.</div>
          </div>
        </div>

        <table class="previewTable">
          <thead>
            <tr>
              <th class="p-time">Stunde</th>
              ${e.map((i) => p`<th>${i}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${s.map((i, r) => {
      if (N(i))
        return p`
                  <tr class="p-break">
                    <td class="p-time">${i.time}</td>
                    <td colspan=${e.length}>${i.label ?? ""}</td>
                  </tr>
                `;
      const n = i;
      return p`
                <tr>
                  <td class="p-time">${n.time}</td>
                  ${e.map((l, a) => {
        const u = (n.cells?.[a] ?? "").toString(), c = n.cell_styles?.[a] ?? null;
        return p`
                      <td
                        class="p-cell"
                        style=${ft(c, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(r, a)}
                      >
                        ${u}
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
  renderGeneral() {
    return this._config ? p`
      <div class="grid2">
        <div class="field">
          <label class="lbl">Titel</label>
          <input
            class="in"
            type="text"
            .value=${this._config.title ?? ""}
            @input=${(t) => this.emit({ ...this._config, title: t.target.value })}
          />
        </div>

        <div class="field">
          <label class="lbl">Tage (Komma getrennt)</label>
          <input
            class="in"
            type="text"
            .value=${(this._config.days ?? []).join(", ")}
            @input=${(t) => this.setDaysFromString(t.target.value)}
          />
          <div class="sub">Beispiel: Mo, Di, Mi, Do, Fr</div>
        </div>
      </div>
    ` : p``;
  }
  renderHighlighting() {
    if (!this._config) return p``;
    const t = this._config;
    return p`
      <div class="stack">
        <div class="optRow">
          <div>
            <div class="optTitle">Heute hervorheben</div>
            <div class="sub">Hintergrund für die heutige Spalte.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_today, (e) => this.emit({ ...t, highlight_today: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelle Stunde hervorheben</div>
            <div class="sub">Hintergrund in der Zeitspalte (Zeile bleibt neutral).</div>
          </div>
          ${this.uiSwitch(!!t.highlight_current, (e) => this.emit({ ...t, highlight_current: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Pausen als aktuell markieren</div>
            <div class="sub">Wenn die Pause „jetzt“ ist, wird sie wie eine aktuelle Stunde behandelt.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_breaks, (e) => this.emit({ ...t, highlight_breaks: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Freistunden: nur Tag hervorheben</div>
            <div class="sub">
              Unterdrückt „Aktuell“-Highlights, wenn die heutige Zelle in der aktuellen Stunde leer ist, oder "-" bzw.
              "---" eingetragen wird.
            </div>
          </div>
          ${this.uiSwitch(!!t.free_only_column_highlight, (e) => this.emit({ ...t, free_only_column_highlight: e }))}
        </div>

        <div class="divider"></div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelles Fach (Textfarbe)</div>
            <div class="sub">Nur am heutigen Tag, nur wenn Zelle nicht leer ist.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_current_text, (e) => this.emit({ ...t, highlight_current_text: e }))}
        </div>

        <div class="optRow">
          <div>
            <div class="optTitle">Aktuelle Stunde (Zeitspalte Textfarbe)</div>
            <div class="sub">Zusätzlich zur Zeitspalten-Hinterlegung.</div>
          </div>
          ${this.uiSwitch(!!t.highlight_current_time_text, (e) => this.emit({ ...t, highlight_current_time_text: e }))}
        </div>
      </div>
    `;
  }
  colorRow(t, e, s, i, r, n) {
    const l = Math.round(H(s.alpha) * 100);
    return p`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${s.hex} @input=${(a) => i(a.target.value)} />
          <div class="range">
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(l)}
              @input=${(a) => r(Number(a.target.value) / 100)}
            />
            <div class="pct">${l}%</div>
          </div>
        </div>

        <div class="mono">${n}</div>
      </div>
    `;
  }
  renderColors() {
    if (!this._config) return p``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), e = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return p`
      <div class="stack">
        ${this.colorRow(
      "Highlight-Farbe: Heute (Hintergrund)",
      "Spalten-Overlay für den aktuellen Wochentag.",
      t,
      (s) => this.setHighlightRgba("highlight_today_color", s, t.alpha),
      (s) => this.setHighlightRgba("highlight_today_color", t.hex, s),
      this._config.highlight_today_color
    )}

        ${this.colorRow(
      "Highlight-Farbe: Aktuelle Stunde (Hintergrund)",
      "Zeitspalten-Overlay (und optional Pausen).",
      e,
      (s) => this.setHighlightRgba("highlight_current_color", s, e.alpha),
      (s) => this.setHighlightRgba("highlight_current_color", e.hex, s),
      this._config.highlight_current_color
    )}

        <div class="divider"></div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">Textfarbe: Aktuelles Fach</label>
            <div class="inRow">
              <input
                class="col"
                type="color"
                .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()}
                @input=${(s) => this.setHighlightHexOnly("highlight_current_text_color", s.target.value)}
              />
              <input
                class="in"
                type="text"
                .value=${this._config.highlight_current_text_color ?? "#ff1744"}
                @input=${(s) => this.emit({ ...this._config, highlight_current_text_color: s.target.value })}
              />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Textfarbe: Zeitspalte (aktuelle Stunde)</label>
            <div class="inRow">
              <input
                class="col"
                type="color"
                .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()}
                @input=${(s) => this.setHighlightHexOnly("highlight_current_time_text_color", s.target.value)}
              />
              <input
                class="in"
                type="text"
                .value=${this._config.highlight_current_time_text_color ?? "#ff9100"}
                @input=${(s) => this.emit({ ...this._config, highlight_current_time_text_color: s.target.value })}
              />
            </div>
          </div>
        </div>

        <div class="sub">
          Tipp: Du kannst auch <span class="mono">rgb()/rgba()</span> oder <span class="mono">var(--...)</span> Werte
          direkt in YAML setzen – der Editor hält es kompatibel.
        </div>
      </div>
    `;
  }
  renderSplan24() {
    if (!this._config) return p``;
    const t = this._config, e = Object.keys(this.hass?.states ?? {}).filter((r) => r.startsWith("sensor.stundenplan_woche_")).sort((r, n) => r.localeCompare(n)), s = (this._ui.splan24Query ?? "").toString().trim().toLowerCase(), i = s ? e.filter((r) => {
      const l = (this.hass?.states?.[r]?.attributes?.friendly_name ?? "").toString().toLowerCase();
      return r.toLowerCase().includes(s) || l.includes(s);
    }) : e;
    return p`
    <div class="stack">
      <div class="panelMinor">
        <div class="minorTitle">Stundenplan24 Sensor</div>

        <div class="field">
          <label class="lbl">Suche</label>
          <input
            class="in"
            type="text"
            .value=${this._ui.splan24Query ?? ""}
            placeholder="z.B. 09c oder 'Lina'…"
            @input=${(r) => {
      this._ui.splan24Query = r.target.value, this.requestUpdate();
    }}
          />
          <div class="sub">Filtert nach Entity-ID und friendly_name.</div>
        </div>

        <div class="field">
          <label class="lbl">Stundenplan24 Woche</label>
          <select
            class="in"
            .value=${t.splan24_entity ?? ""}
            @change=${(r) => this.setSplan24Entity(r.target.value)}
            ?disabled=${i.length === 0}
          >
            <option value="">– auswählen –</option>
            ${i.map((r) => {
      const l = (this.hass?.states?.[r]?.attributes?.friendly_name ?? "").toString().trim(), a = l ? `${r} — ${l}` : r;
      return p`<option value=${r}>${a}</option>`;
    })}
          </select>

          ${i.length === 0 ? p`<div class="sub" style="margin-top:6px;">Kein Treffer für „${this._ui.splan24Query}“.</div>` : p`<div class="sub" style="margin-top:6px;">${i.length} Treffer.</div>`}

          <div class="sub" style="margin-top:6px;">
            Wähle deinen Stundenplan-Sensor (z.B. <span class="mono">sensor.stundenplan_woche_09c</span>).
            Die Karte übernimmt automatisch alle Einstellungen.
          </div>
        </div>
      </div>
    </div>
  `;
  }
  renderSources() {
    if (!this._config) return p``;
    const t = this._config;
    return p`
      <div class="stack">
        <div class="sub">Datenquelle: XML (Stundenplan24) hat Priorität wenn konfiguriert. Sonst Entity (JSON) oder manuell.</div>

        <div class="panelMinor">
          <div class="minorTitle">✅ Stundenplan24 XML</div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">XML URL</label>
              <input
                class="in"
                type="text"
                .value=${t.splan_xml_url ?? ""}
                placeholder="/local/splan/sdaten"
                @input=${(e) => this.emit({ ...t, splan_xml_url: e.target.value })}
              />
              <div class="sub">Wichtig: in HA immer <span class="mono">/local/...</span></div>
            </div>
            <div class="field">
              <label class="lbl">Klasse (Kurz)</label>
              <input
                class="in"
                type="text"
                .value=${t.splan_class ?? ""}
                placeholder="z.B. 5a"
                @input=${(e) => this.emit({ ...t, splan_class: e.target.value })}
              />
            </div>
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">Woche (XML)</label>
              <select class="in" .value=${t.splan_week ?? "auto"} @change=${(e) => this.emit({ ...t, splan_week: e.target.value })}>
                <option value="auto">auto (Basis/Week-Mode, sonst alle)</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              <div class="sub">Wenn im XML keine Woche steht: gilt immer.</div>
            </div>

            <div class="field">
              <label class="lbl">Anzeige</label>
              <div class="optRow" style="padding:8px 10px;">
                <div>
                  <div class="optTitle">Raum anzeigen</div>
                  <div class="sub">z.B. Mathe (R101)</div>
                </div>
                ${this.uiSwitch(!!t.splan_show_room, (e) => this.emit({ ...t, splan_show_room: e }))}
              </div>
              <div class="optRow" style="padding:8px 10px; margin-top:8px;">
                <div>
                  <div class="optTitle">Lehrer anzeigen</div>
                  <div class="sub">z.B. Mathe (R101 · MU)</div>
                </div>
                ${this.uiSwitch(!!t.splan_show_teacher, (e) => this.emit({ ...t, splan_show_teacher: e }))}
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="optRow">
            <div>
              <div class="optTitle">Vertretungsplan aktivieren</div>
              <div class="sub">Lädt WPlanKl_YYYYMMDD.xml (heute + X Tage). Anzeige nur für „heute“ in der Tabelle.</div>
            </div>
            ${this.uiSwitch(!!t.splan_sub_enabled, (e) => this.emit({ ...t, splan_sub_enabled: e }))}
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">Vertretung: Tage</label>
              <input
                class="in"
                type="number"
                min="1"
                max="14"
                .value=${String(t.splan_sub_days ?? 3)}
                @input=${(e) => this.emit({ ...t, splan_sub_days: Number(e.target.value) })}
              />
              <div class="sub">1..14 (Default 3)</div>
            </div>

            <div class="field">
              <label class="lbl">Info anzeigen</label>
              <div class="optRow" style="padding:8px 10px;">
                <div>
                  <div class="optTitle">Zusatztext (If)</div>
                  <div class="sub">Zeilenumbruch wird unterstützt.</div>
                </div>
                ${this.uiSwitch(!!t.splan_sub_show_info, (e) => this.emit({ ...t, splan_sub_show_info: e }))}
              </div>
            </div>
          </div>
        </div>

        <div class="panelMinor">
          <div class="minorTitle">Wechselwochen (A/B)</div>

          <div class="field">
            <label class="lbl">week_mode</label>
            <select class="in" .value=${t.week_mode ?? "off"} @change=${(e) => this.emit({ ...t, week_mode: e.target.value })}>
              <option value="off">off (deaktiviert)</option>
              <option value="kw_parity">kw_parity (gerade/ungerade ISO-KW)</option>
              <option value="week_map">week_map (Mapping-Entity, Fallback Parität)</option>
            </select>
          </div>

          <div class="optRow">
            <div>
              <div class="optTitle">A-Woche = gerade Kalenderwoche</div>
              <div class="sub">Wenn deaktiviert: A-Woche = ungerade KW.</div>
            </div>
            ${this.uiSwitch(!!t.week_a_is_even_kw, (e) => this.emit({ ...t, week_a_is_even_kw: e }))}
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">week_map_entity (optional)</label>
              <input class="in" type="text" .value=${t.week_map_entity ?? ""} placeholder="z.B. sensor.wechselwochen_map" @input=${(e) => this.emit({ ...t, week_map_entity: e.target.value })} />
            </div>

            <div class="field">
              <label class="lbl">week_map_attribute</label>
              <input class="in" type="text" .value=${t.week_map_attribute ?? ""} placeholder="z.B. map (leer = state)" @input=${(e) => this.emit({ ...t, week_map_attribute: e.target.value })} />
            </div>
          </div>

          <div class="sub">Mapping: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span></div>

          <div class="divider"></div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity_a</label>
              <input class="in" type="text" .value=${t.source_entity_a ?? ""} @input=${(e) => this.emit({ ...t, source_entity_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_a</label>
              <input class="in" type="text" .value=${t.source_attribute_a ?? ""} @input=${(e) => this.emit({ ...t, source_attribute_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_entity_b</label>
              <input class="in" type="text" .value=${t.source_entity_b ?? ""} @input=${(e) => this.emit({ ...t, source_entity_b: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_b</label>
              <input class="in" type="text" .value=${t.source_attribute_b ?? ""} @input=${(e) => this.emit({ ...t, source_attribute_b: e.target.value })} />
            </div>
          </div>
        </div>

        <div class="panelMinor">
          <div class="minorTitle">Single-Source (Legacy / einfach)</div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity</label>
              <input class="in" type="text" .value=${t.source_entity ?? ""} @input=${(e) => this.emit({ ...t, source_entity: e.target.value })} />
            </div>

            <div class="field">
              <label class="lbl">source_attribute</label>
              <input class="in" type="text" .value=${t.source_attribute ?? ""} @input=${(e) => this.emit({ ...t, source_attribute: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">source_time_key</label>
            <input class="in" type="text" .value=${t.source_time_key ?? "Stunde"} @input=${(e) => this.emit({ ...t, source_time_key: e.target.value })} />
          </div>
        </div>
      </div>
    `;
  }
  renderRows() {
    if (!this._config) return p``;
    const t = this._config, e = t.days ?? [];
    return p`
      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan (Zeilen)</div>

        <div class="btnBar">
          <div class="toggleInline">
            <div class="toggleText">Cell-Styles</div>
            ${this.uiSwitch(!!this._ui.showCellStyles, (s) => {
      this._ui.showCellStyles = s, this.requestUpdate();
    })}
          </div>

          <button class="btn" @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button class="btn" @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">
        Pro Zeile: Zeit + optional Start/Ende. Per Klick in der Vorschau springst du zur passenden Zelle.
        <br />
        Hinweis: Wenn XML aktiv ist, werden diese Zeilen nur als Fallback genutzt (z.B. fehlende Zeiten).
      </div>

      ${(t.rows ?? []).map((s, i) => {
      const r = N(s), n = r ? `Pause · ${s.time ?? ""}` : `Stunde · ${s.time ?? ""}`, l = r ? s.label ?? "Pause" : "", a = s;
      return p`
          <details class="rowPanel" ?open=${this._ui.rowOpen[i] ?? !1} @toggle=${(u) => this._ui.rowOpen[i] = !!u.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${n || `Zeile ${i + 1}`}</div>
                <div class="rowHeadMeta">${r ? l : `${(a.start ?? "") || "Start?"} – ${(a.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${s.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(u) => this.updateRowTime(i, u.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(r, (u) => this.toggleBreak(i, u))}
                  </div>
                </div>
              </div>

              ${r ? p`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${s.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(u) => this.updateBreakLabel(i, u.target.value)} />
                    </div>
                  ` : p`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${a.start ?? ""} placeholder="z.B. 07:45" @input=${(u) => this.updateRowStart(i, u.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${a.end ?? ""} placeholder="z.B. 08:30" @input=${(u) => this.updateRowEnd(i, u.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((u, c) => {
        const d = (a.cells?.[c] ?? "").toString(), h = a.cell_styles?.[c] ?? null, _ = h?.bg && h.bg.startsWith("#") ? h.bg : "#3b82f6", f = typeof h?.bg_alpha == "number" ? H(h.bg_alpha) : 0.18, b = Math.round(f * 100), m = h?.color && h.color.startsWith("#") ? h.color : "#ffffff", $ = `sp-cell-${i}-${c}`, v = ft(h, "1px solid var(--divider-color)");
        return p`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${u}</div>
                              <div class="cellMiniPreview" style=${v} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${$} class="in" type="text" .value=${d} placeholder="Fach" @input=${(y) => this.updateRowCell(i, c, y.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${_} @input=${(y) => this.updateCellStyle(i, c, { bg: y.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(b)} @input=${(y) => this.updateCellStyle(i, c, { bg_alpha: Number(y.target.value) / 100 })} />
                                  <div class="pct">${b}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${m} @input=${(y) => this.updateCellStyle(i, c, { color: y.target.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowActions">
                <button class="btn" @click=${() => this.addLessonRow(i)}>+ Stunde darunter</button>
                <button class="btn" @click=${() => this.addBreakRow(i)}>+ Pause darunter</button>
                <button class="btn danger" @click=${() => this.removeRow(i)}>Löschen</button>
              </div>
            </div>
          </details>
        `;
    })}
    `;
  }
  render() {
    return this._config ? p`
      ${this.renderEditorPreview()}
      ${this.panel("Allgemein", this._ui.openGeneral, (t) => this._ui.openGeneral = t, this.renderGeneral())}
      ${this.panel("Highlights", this._ui.openHighlight, (t) => this._ui.openHighlight = t, this.renderHighlighting())}
      ${this.panel("Farben", this._ui.openColors, (t) => this._ui.openColors = t, this.renderColors())}
      ${this.panel("Stundenplan24", this._ui.openSplan24, (t) => this._ui.openSplan24 = t, this.renderSplan24())}	
      ${this.panel("Datenquellen", this._ui.openSources, (t) => this._ui.openSources = t, this.renderSources())}
      ${this.panel("Zeilen & Fächer", this._ui.openRows, (t) => this._ui.openRows = t, this.renderRows())}
    ` : p``;
  }
};
ht.properties = {
  hass: {},
  _config: { state: !0 }
}, ht.styles = qt`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 0;
    }

    .previewWrap {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 14px;
      background: var(--card-background-color);
    }
    .previewTop {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;
    }
    .previewTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }
    .previewHint {
      margin-top: 2px;
      font-size: 12px;
      opacity: 0.7;
    }
    .previewTable {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .previewTable th,
    .previewTable td {
      border: 1px solid var(--divider-color);
      padding: 6px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
    .previewTable th {
      background: var(--secondary-background-color);
      font-weight: 700;
    }
    .p-time {
      font-weight: 700;
      white-space: nowrap;
      width: 110px;
    }
    .p-break {
      font-style: italic;
      opacity: 0.8;
    }
    .p-cell {
      cursor: pointer;
      user-select: none;
    }
    .p-cell:hover {
      filter: brightness(1.06);
    }

    .panel {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--card-background-color);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .panel summary {
      list-style: none;
      cursor: pointer;
      padding: 12px 12px;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      user-select: none;
    }
    .panel summary::-webkit-details-marker {
      display: none;
    }
    .panelTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }
    .panelBody {
      padding: 12px;
    }

    .stack {
      display: grid;
      gap: 12px;
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 800px) {
      .grid2 {
        grid-template-columns: 1fr;
      }
    }
    .field {
      display: grid;
      gap: 6px;
    }
    .lbl {
      font-size: 13px;
      opacity: 0.85;
    }
    .sub {
      font-size: 12px;
      opacity: 0.7;
      line-height: 1.35;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      opacity: 0.85;
      word-break: break-word;
    }
    .divider {
      height: 1px;
      background: var(--divider-color);
      opacity: 0.55;
      margin: 2px 0;
    }

    .in {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      outline: none;
    }
    .in:focus {
      box-shadow: 0 0 0 2px rgba(100, 160, 255, 0.25);
    }
    .inRow {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 10px;
      align-items: center;
    }
    .btnBar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
    }
    .toggleInline {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--secondary-background-color);
    }
    .toggleText {
      font-size: 12px;
      font-weight: 700;
      opacity: 0.85;
      white-space: nowrap;
    }

    .btn {
      border: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn:hover {
      filter: brightness(1.05);
    }
    .btn.danger {
      background: rgba(255, 0, 0, 0.08);
    }
    select.in {
      padding: 10px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 26px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(120, 120, 120, 0.35);
      transition: 0.2s;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--card-background-color);
      transition: 0.2s;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
    }
    .switch input:checked + .slider {
      background: rgba(90, 160, 255, 0.45);
    }
    .switch input:checked + .slider:before {
      transform: translate(18px, -50%);
    }

    .optRow {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
    }
    .optTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.9;
      margin-bottom: 2px;
    }

    .colorRow {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      display: grid;
      gap: 10px;
      background: rgba(255, 255, 255, 0.02);
    }
    .colorControls {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 10px;
      align-items: center;
    }
    .col {
      width: 44px;
      height: 34px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--card-background-color);
      cursor: pointer;
      box-sizing: border-box;
    }
    .range {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
    }
    .pct {
      min-width: 44px;
      text-align: right;
      font-size: 12px;
      opacity: 0.75;
    }

    .panelMinor {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.02);
      display: grid;
      gap: 10px;
    }
    .minorTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.9;
    }

    .rowsTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    .rowsTitle {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.9;
    }

    .rowPanel {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: var(--card-background-color);
      margin-bottom: 12px;
      overflow: hidden;
    }
    .rowPanel summary {
      list-style: none;
      cursor: pointer;
      padding: 12px;
      background: var(--secondary-background-color);
      user-select: none;
    }
    .rowPanel summary::-webkit-details-marker {
      display: none;
    }
    .rowHead {
      display: grid;
      gap: 4px;
    }
    .rowHeadTitle {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.95;
    }
    .rowHeadMeta {
      font-size: 12px;
      opacity: 0.7;
    }
    .rowBody {
      padding: 12px;
      display: grid;
      gap: 12px;
    }
    .rowActions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .cellsGrid {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
    .cell {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.02);
      display: grid;
      gap: 8px;
    }
    .cellTop {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
    }
    .cellDay {
      font-size: 12px;
      opacity: 0.75;
      font-weight: 700;
    }
    .cellMiniPreview {
      border-radius: 10px;
      padding: 6px 8px;
      font-size: 12px;
      opacity: 0.9;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cellStyles {
      display: grid;
      gap: 10px;
      margin-top: 2px;
    }
    .cellStyles[hidden] {
      display: none;
    }
    .styleLine {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 10px;
      align-items: center;
    }
    .styleLbl {
      font-size: 12px;
      opacity: 0.75;
    }
    input[type="range"] {
      width: 100%;
    }
  `;
let yt = ht;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", ut);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", yt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + XML (Stundenplan24)",
  preview: !0
});
export {
  ut as StundenplanCard,
  yt as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
