const J = globalThis, gt = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ft = /* @__PURE__ */ Symbol(), xt = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Yt = (n) => new zt(typeof n == "string" ? n : n + "", void 0, ft), Bt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new zt(e, n, ft);
}, Xt = (n, t) => {
  if (gt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, kt = gt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Yt(e);
})(n) : n;
const { is: Qt, defineProperty: te, getOwnPropertyDescriptor: ee, getOwnPropertyNames: ie, getOwnPropertySymbols: se, getPrototypeOf: re } = Object, st = globalThis, St = st.trustedTypes, ne = St ? St.emptyScript : "", oe = st.reactiveElementPolyfillSupport, L = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ne : null;
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
} }, mt = (n, t) => !Qt(n, t), At = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), st.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let N = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = At) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && te(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = ee(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const l = s?.call(this);
      r?.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? At;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const t = re(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const e = this.properties, i = [...ie(e), ...se(e)];
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Q).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Q;
      this._$Em = s;
      const l = o.fromAttribute(e, r.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? mt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
        const { wrapped: o } = r, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
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
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[L("elementProperties")] = /* @__PURE__ */ new Map(), N[L("finalized")] = /* @__PURE__ */ new Map(), oe?.({ ReactiveElement: N }), (st.reactiveElementVersions ??= []).push("2.1.2");
const yt = globalThis, Ct = (n) => n, tt = yt.trustedTypes, Et = tt ? tt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ut = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Ft = "?" + C, ae = `<${Ft}>`, P = document, I = () => P.createComment(""), j = (n) => n === null || typeof n != "object" && typeof n != "function", bt = Array.isArray, le = (n) => bt(n) || typeof n?.[Symbol.iterator] == "function", lt = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, Mt = />/g, M = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Pt = /"/g, Lt = /^(?:script|style|textarea|title)$/i, ce = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), p = ce(1), W = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), R = P.createTreeWalker(P, 129);
function It(n, t) {
  if (!bt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Et !== void 0 ? Et.createHTML(t) : t;
}
const he = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = F;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, h, d = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, h = o.exec(a), h !== null); ) u = o.lastIndex, o === F ? h[1] === "!--" ? o = Tt : h[1] !== void 0 ? o = Mt : h[2] !== void 0 ? (Lt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = M) : h[3] !== void 0 && (o = M) : o === M ? h[0] === ">" ? (o = s ?? F, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? M : h[3] === '"' ? Pt : Rt) : o === Pt || o === Rt ? o = M : o === Tt || o === Mt ? o = F : (o = M, s = void 0);
    const _ = o === M && n[l + 1].startsWith("/>") ? " " : "";
    r += o === F ? a + ae : d >= 0 ? (i.push(c), a.slice(0, d) + Ut + a.slice(d) + C + _) : a + C + (d === -2 ? l : _);
  }
  return [It(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class V {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, h] = he(t, e);
    if (this.el = V.createElement(c, i), R.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = R.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Ut)) {
          const u = h[o++], _ = s.getAttribute(d).split(C), y = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: y[2], strings: _, ctor: y[1] === "." ? ue : y[1] === "?" ? pe : y[1] === "@" ? _e : rt }), s.removeAttribute(d);
        } else d.startsWith(C) && (a.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Lt.test(s.tagName)) {
          const d = s.textContent.split(C), u = d.length - 1;
          if (u > 0) {
            s.textContent = tt ? tt.emptyScript : "";
            for (let _ = 0; _ < u; _++) s.append(d[_], I()), R.nextNode(), a.push({ type: 2, index: ++r });
            s.append(d[u], I());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ft) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(C, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += C.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function z(n, t, e = n, i) {
  if (t === W) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = j(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = z(n, s._$AS(n, t.values), s, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? P).importNode(e, !0);
    R.currentNode = s;
    let r = R.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new Z(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new ge(r, this, t)), this._$AV.push(c), a = i[++l];
      }
      o !== a?.index && (r = R.nextNode(), o++);
    }
    return R.currentNode = P, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = z(this, t, e), j(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : le(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = V.createElement(It(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const r = new de(s, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ot.get(t.strings);
    return e === void 0 && Ot.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new Z(this.O(I()), this.O(I()), this, this.options)) : i = e[s], i._$AI(r), s++;
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
class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = z(this, t, e, 0), o = !j(t) || t !== this._$AH && t !== W, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = z(this, l[i + a], e, a), c === W && (c = this._$AH[a]), o ||= !j(c) || c !== this._$AH[a], c === m ? t = m : t !== m && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ue extends rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class pe extends rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class _e extends rt {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = z(this, t, e, 0) ?? m) === W) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ge {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const fe = yt.litHtmlPolyfillSupport;
fe?.(V, Z), (yt.litHtmlVersions ??= []).push("3.3.2");
const me = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = s = new Z(t.insertBefore(I(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const vt = globalThis;
class H extends N {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = me(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return W;
  }
}
H._$litElement$ = !0, H.finalized = !0, vt.litElementHydrateSupport?.({ LitElement: H });
const ye = vt.litElementPolyfillSupport;
ye?.({ LitElement: H });
(vt.litElementVersions ??= []).push("4.2.2");
const be = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: mt }, ve = (n = be, t, e) => {
  const { kind: i, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function jt(n) {
  return (t, e) => typeof e == "object" ? ve(n, t, e) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, t, e);
}
function Vt(n) {
  return jt({ ...n, state: !0, attribute: !1 });
}
var we = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, Zt = (n) => {
  throw TypeError(n);
}, wt = (n, t, e, i) => {
  for (var s = $e(t, e), r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = o(t, e, s) || s);
  return s && we(t, e, s), s;
}, qt = (n, t, e) => t.has(n) || Zt("Cannot " + e), ct = (n, t, e) => (qt(n, t, "read from private field"), e ? e.call(n) : t.get(n)), ht = (n, t, e) => t.has(n) ? Zt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), dt = (n, t, e, i) => (qt(n, t, "write to private field"), t.set(n, e), e), K, G, Y;
function x(n) {
  return !!n && n.break === !0;
}
function v(n) {
  return Math.min(1, Math.max(0, n));
}
function et(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function X(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = v(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function xe(n) {
  if (!n?.bg) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = et(t);
  if (!e) return t;
  const i = typeof n.bg_alpha == "number" ? v(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function ut(n, t) {
  const e = [], i = xe(n);
  return i && e.push(`background:${i}`), n?.color && e.push(`color:${n.color}`), e.push(`border:${n?.border ?? t}`), e.join(";") + ";";
}
function Nt(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = et(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${v(t)})` : e;
  }
  return e;
}
function D(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function pt(n) {
  return (n ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ke(n) {
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
function Ht(n) {
  const t = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const i = t.getUTCFullYear(), s = new Date(Date.UTC(i, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), o = new Date(s);
  o.setUTCDate(s.getUTCDate() + (4 - r));
  const l = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(l / (10080 * 60 * 1e3)), isoYear: i };
}
function Dt(n) {
  const t = (n ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function Wt(n) {
  const t = (n ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || t.startsWith("---") || t.toUpperCase().startsWith("AUSFALL"));
}
function Se(n) {
  const t = pt(n);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
var E;
const nt = (E = class extends H {
  constructor() {
    super(...arguments), ht(this, K), ht(this, G), ht(this, Y, []), this._lastWeekOffset = null, this._lastWatchSig = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return ct(this, K);
  }
  set hass(t) {
    dt(this, K, t);
  }
  get config() {
    return ct(this, G);
  }
  set config(t) {
    dt(this, G, t);
  }
  get _rowsCache() {
    return ct(this, Y);
  }
  set _rowsCache(t) {
    dt(this, Y, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), i = (s) => {
      const r = (s ?? "").toString().trim();
      r && e.add(r);
    };
    return i(t.week_offset_entity), i(t.source_entity), i(t.source_entity_a), i(t.source_entity_b), i(t.week_map_entity), i(t.splan24_entity), Array.from(e);
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
    const s = this.hass?.states?.[i], r = s?.attributes?.min, o = s?.attributes?.max, l = Number.isFinite(Number(t.week_offset_min)) ? Number(t.week_offset_min) : Number(r), a = Number.isFinite(Number(t.week_offset_max)) ? Number(t.week_offset_max) : Number(o);
    let c = e;
    Number.isFinite(l) && (c = Math.max(l, c)), Number.isFinite(a) && (c = Math.min(a, c)), await this.hass.callService("number", "set_value", { entity_id: i, value: c });
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const i = e.last_updated ?? "", s = e.last_changed ?? "", r = e.state ?? "", o = e.attributes ?? {}, l = o.rows ?? o.rows_json ?? o.rows_ha, a = Array.isArray(l) || typeof l == "string" ? l.length : 0, c = o.week ?? o.kw ?? "";
    return `${t}|${i}|${s}|${r}|rowsLen=${a}|wk=${c}`;
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
      this.recomputeRows();
      return;
    }
    if (t.has("hass")) {
      if (this.config) {
        const e = this.getWeekOffsetValue(this.config);
        e !== this._lastWeekOffset && (this._lastWeekOffset = e, this.requestUpdate());
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
      source_time_key: "Stunde",
      splan24_entity: "",
      splan24_attribute: "rows",
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      week_offset_entity: "",
      week_offset_attribute: "",
      week_offset_step: 1,
      week_offset_min: void 0,
      week_offset_max: void 0,
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
      // Filter defaults
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
    const e = E.getStubConfig(), i = ((t?.type ?? e.type) + "").toString();
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
    const e = E.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((a) => (a ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((a) => {
      if (x(a))
        return {
          break: !0,
          time: (a.time ?? "").toString(),
          label: (a.label ?? "Pause").toString()
        };
      const c = Array.isArray(a?.cells) ? a.cells : [], h = Array.from({ length: i.length }, ($, f) => (c[f] ?? "").toString()), d = Array.isArray(a?.cell_styles) ? a.cell_styles : [], u = Array.from({ length: i.length }, ($, f) => X(d[f])), _ = (a?.time ?? "").toString(), y = D(_), g = (a?.start ?? "").toString().trim(), b = (a?.end ?? "").toString().trim(), w = {
        time: _,
        start: g || y.start || void 0,
        end: b || y.end || void 0,
        cells: h
      };
      return u.some(($) => !!$) && (w.cell_styles = u), w;
    }), o = ((t.week_mode ?? e.week_mode) + "").toString().trim(), l = o === "kw_parity" || o === "week_map" || o === "off" ? o : "off";
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
      source_entity: (t.source_entity ?? e.source_entity).toString(),
      source_attribute: (t.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (t.source_time_key ?? e.source_time_key).toString(),
      splan24_entity: (t.splan24_entity ?? "").toString(),
      splan24_attribute: (t.splan24_attribute ?? "rows").toString(),
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
      week_offset_entity: (t.week_offset_entity ?? "").toString(),
      week_offset_attribute: (t.week_offset_attribute ?? "").toString(),
      week_offset_step: Number.isFinite(Number(t.week_offset_step)) ? Number(t.week_offset_step) : 1,
      week_offset_min: t.week_offset_min,
      week_offset_max: t.week_offset_max,
      rows: r
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(ke(e).map(pt));
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
    const i = t.days ?? [], s = (t.source_time_key ?? "Stunde").toString(), r = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o.time ?? o[s] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[s] ?? "").toString(), a = D(l), c = Array.from({ length: i.length }, (d, u) => {
        const _ = (i[u] ?? "").toString();
        return (o?.[_] ?? "").toString();
      });
      return { time: l, start: a.start, end: a.end, cells: c };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, i) {
    let s = this.readEntityJson(e, i);
    return s == null && (s == null && (s = this.readEntityJson(e, "rows")), s == null && (s = this.readEntityJson(e, "rows_json")), s == null && (s = this.readEntityJson(e, "rows_ha"))), Array.isArray(s) ? this.buildRowsFromArray(t, s) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = Ht(/* @__PURE__ */ new Date()), i = e % 2 === 0, s = !!t.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(e, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: o } = Ht(/* @__PURE__ */ new Date()), l = String(r), a = String(o);
    if (s?.[a] && typeof s[a] == "object") {
      const h = Dt(s[a][l]);
      if (h) return h;
    }
    const c = Dt(s?.[l]);
    return c || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  // ✅ Textfilter gegen "zu viele Kurse"
  filterCellText(t, e) {
    const i = (t ?? "").toString().trim();
    if (!i) return "";
    const s = i.split("/").map((u) => u.trim()).filter((u) => u.length > 0 && u !== "---" && u !== "—"), r = (e.filter_exclude ?? []).map((u) => u.trim()).filter(Boolean), o = (u) => r.some((_) => {
      try {
        return new RegExp(_, "i").test(u);
      } catch {
        return u.toLowerCase().includes(_.toLowerCase());
      }
    }), l = s.filter((u) => !o(u)), a = e.filter_main_only !== !1 ? l.filter((u) => !/^\d/.test(u)) : l, c = (e.filter_allow_prefixes ?? []).map((u) => u.toLowerCase()).filter(Boolean), h = l.filter((u) => {
      const _ = u.match(/^(\d+[a-z]+)/i);
      if (!_) return !1;
      const y = _[1].toLowerCase();
      return c.some((g) => y.startsWith(g));
    });
    return Array.from(/* @__PURE__ */ new Set([...a, ...h])).join(" / ");
  }
  getWeekOffset(t) {
    const e = this.getWeekOffsetValue(t);
    return e == null ? 0 : Math.max(-52, Math.min(52, Math.trunc(e)));
  }
  getBaseDate(t) {
    const e = this.getWeekOffset(t), i = /* @__PURE__ */ new Date();
    return i.setHours(12, 0, 0, 0), i.setDate(i.getDate() + e * 7), i;
  }
  mondayOfWeek(t) {
    const e = new Date(t), i = e.getDay() === 0 ? 7 : e.getDay();
    return e.setDate(e.getDate() - (i - 1)), e.setHours(12, 0, 0, 0), e;
  }
  fmtDDMM(t) {
    const e = String(t.getDate()).padStart(2, "0"), i = String(t.getMonth() + 1).padStart(2, "0");
    return `${e}.${i}.`;
  }
  getRowsResolved(t) {
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), s = (t.source_entity_a ?? "").trim(), r = (t.source_entity_b ?? "").trim(), o = (t.source_attribute_a ?? "").trim(), l = (t.source_attribute_b ?? "").trim();
      if (i === "A" && s) {
        const c = this.getRowsFromEntity(t, s, o);
        if (c) return c;
      }
      if (i === "B" && r) {
        const c = this.getRowsFromEntity(t, r, l);
        if (c) return c;
      }
      const a = (t.source_entity ?? "").trim();
      if (a) {
        const c = this.getRowsFromEntity(t, a, (t.source_attribute ?? "").trim());
        if (c) return c;
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
  render() {
    if (!this.config) return p``;
    const t = this.config, e = this._rowsCache, i = this.getTodayIndex(t.days ?? []), s = "1px solid var(--divider-color)", r = Nt(t.highlight_today_color ?? "", 0.12), o = Nt(t.highlight_current_color ?? "", 0.18), l = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), c = t.week_mode !== "off", h = c ? this.getActiveWeek(t) : null, d = this.getWeekOffsetValue(t), u = (t.week_offset_entity ?? "").trim().length > 0, _ = Number(t.week_offset_step ?? 1) || 1, y = d ?? 0;
    return p`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          <div class="topBar">
            <div class="leftPills">
              ${c ? p`<div class="pillBox">Woche: <b>${h}</b></div>` : p``}
            </div>

            ${u ? p`
                  <div class="offsetBar">
                    <button class="btnMini" @click=${() => this.setWeekOffset(t, y - _)}>&lt;</button>
                    <div class="offsetVal" title="week_offset_entity">${d ?? 0}</div>
                    <button class="btnMini" @click=${() => this.setWeekOffset(t, y + _)}>&gt;</button>
                  </div>
                ` : p``}
          </div>

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((g, b) => {
      const w = t.highlight_today && b === i ? "today" : "", $ = this.getBaseDate(t), f = this.mondayOfWeek($), k = Se(g);
      let S = "";
      if (k) {
        const A = new Date(f);
        A.setDate(f.getDate() + (k - 1)), S = this.fmtDDMM(A);
      }
      return p`
                    <th class=${w} style=${`--sp-hl:${r};`}>
                      <div>${g}</div>
                      <div class="thDate">${S}</div>
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((g) => {
      if (x(g)) {
        const T = D(g.time), O = !!T.start && !!T.end && this.isNowBetween(T.start, T.end), B = !!t.highlight_breaks && O;
        let U = `--sp-hl:${o};`, q = "";
        return B && (U += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", q += `--sp-hl:${o}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), B && t.highlight_current_time_text && a && (U += `color:${a};`), p`
                    <tr class="break">
                      <td class="time" style=${U}>${g.time}</td>
                      <td colspan=${t.days.length} style=${q}>${g.label ?? ""}</td>
                    </tr>
                  `;
      }
      const b = g, w = b.cells ?? [], $ = b.cell_styles ?? [], f = w.map((T) => this.filterCellText(T, t)), k = !!b.start && !!b.end && this.isNowBetween(b.start, b.end), S = i >= 0 ? w[i] ?? "" : "", A = i >= 0 ? this.filterCellText(S, t) : "", Kt = i >= 0 ? Wt(A) : !1, ot = !(!!t.free_only_column_highlight && Kt);
      let at = `--sp-hl:${o};`;
      return ot && t.highlight_current && k && (at += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), ot && k && t.highlight_current_time_text && a && (at += `color:${a};`), p`
                  <tr>
                    <td class="time" style=${at}>${b.time}</td>

                    ${t.days.map((T, O) => {
        const B = f[O] ?? "", U = $[O] ?? null, q = t.highlight_today && O === i ? "today" : "";
        let $t = `--sp-hl:${r};` + ut(U, s);
        const Gt = !Wt(B);
        return ot && Gt && k && t.highlight_current_text && l && i >= 0 && O === i && ($t += `color:${l};`), p`<td class=${q} style=${$t}><span class="cellText">${B}</span></td>`;
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
}, E.styles = Bt`
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
      display: grid;
      gap: 10px;
    }

    /* ✅ Fix: Offset-Bar liegt NICHT mehr über der Tabelle */
    .topBar {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .leftPills {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    .pillBox {
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      font-size: 13px;
      opacity: 0.95;
      white-space: nowrap;
    }

    .offsetBar {
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
      min-width: 34px;
      text-align: center;
      font-weight: 700;
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
    .thDate {
      font-size: 11px;
      opacity: 0.75;
      margin-top: 2px;
      font-weight: 600;
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
    .cellText {
      white-space: pre-line;
      display: inline-block;
    }
  `, E);
K = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
wt([
  jt({ attribute: !1 })
], nt.prototype, "hass");
wt([
  Vt()
], nt.prototype, "config");
wt([
  Vt()
], nt.prototype, "_rowsCache");
let Jt = nt;
const it = class it extends H {
  constructor() {
    super(...arguments), this._ui = {
      openGeneral: !1,
      openHighlight: !1,
      openColors: !1,
      openSources: !1,
      openRows: !1,
      openSplan24: !1,
      showCellStyles: !0,
      rowOpen: {}
    };
  }
  setConfig(t) {
    const e = ((t?.type ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    const i = !!this._config;
    this._config = this.normalizeConfig(this.clone(t)), i || (this._ui.rowOpen = {});
  }
  normalizeConfig(t) {
    const e = Jt.getStubConfig(), i = { ...e, ...t, type: (t.type ?? e.type).toString() }, s = Array.isArray(i.days) && i.days.length ? i.days.map((d) => (d ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], o = (Array.isArray(i.rows) ? i.rows : []).map((d) => {
      if (x(d))
        return { break: !0, time: (d.time ?? "").toString(), label: (d.label ?? "Pause").toString() };
      const u = Array.isArray(d?.cells) ? d.cells : [], _ = Array.from({ length: s.length }, (S, A) => (u[A] ?? "").toString()), y = Array.isArray(d?.cell_styles) ? d.cell_styles : [], g = Array.from({ length: s.length }, (S, A) => X(y[A])), b = (d?.time ?? "").toString(), w = D(b), $ = (d?.start ?? "").toString().trim(), f = (d?.end ?? "").toString().trim(), k = {
        time: b,
        start: $ || w.start || void 0,
        end: f || w.end || void 0,
        cells: _
      };
      return g.some((S) => !!S) && (k.cell_styles = g), k;
    }), l = ((i.week_mode ?? e.week_mode) + "").toString().trim(), a = l === "kw_parity" || l === "week_map" || l === "off" ? l : "off", c = Number(i.week_offset_step ?? 1), h = Number.isFinite(c) ? c : 1;
    return {
      type: (i.type ?? e.type).toString(),
      title: (i.title ?? e.title).toString(),
      days: s,
      highlight_today: i.highlight_today ?? e.highlight_today,
      highlight_current: i.highlight_current ?? e.highlight_current,
      highlight_breaks: i.highlight_breaks ?? e.highlight_breaks,
      free_only_column_highlight: i.free_only_column_highlight ?? e.free_only_column_highlight,
      highlight_today_color: (i.highlight_today_color ?? e.highlight_today_color).toString(),
      highlight_current_color: (i.highlight_current_color ?? e.highlight_current_color).toString(),
      highlight_current_text: i.highlight_current_text ?? e.highlight_current_text,
      highlight_current_text_color: (i.highlight_current_text_color ?? e.highlight_current_text_color).toString(),
      highlight_current_time_text: i.highlight_current_time_text ?? e.highlight_current_time_text,
      highlight_current_time_text_color: (i.highlight_current_time_text_color ?? e.highlight_current_time_text_color).toString(),
      source_entity: (i.source_entity ?? e.source_entity).toString(),
      source_attribute: (i.source_attribute ?? e.source_attribute).toString(),
      source_time_key: (i.source_time_key ?? e.source_time_key).toString(),
      splan24_entity: (i.splan24_entity ?? "").toString(),
      splan24_attribute: (i.splan24_attribute ?? "rows").toString(),
      week_mode: a,
      week_a_is_even_kw: i.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (i.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (i.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (i.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (i.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (i.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (i.source_attribute_b ?? e.source_attribute_b).toString(),
      filter_main_only: i.filter_main_only ?? !0,
      filter_allow_prefixes: Array.isArray(i.filter_allow_prefixes) ? i.filter_allow_prefixes.map(String) : [],
      filter_exclude: Array.isArray(i.filter_exclude) ? i.filter_exclude.map(String) : [],
      week_offset_entity: (i.week_offset_entity ?? "").toString(),
      week_offset_attribute: (i.week_offset_attribute ?? "").toString(),
      week_offset_step: h,
      week_offset_min: i.week_offset_min,
      week_offset_max: i.week_offset_max,
      rows: o
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
    const e = (t ?? "").toString().trim(), i = "rows";
    this.emit({
      ...this._config,
      splan24_entity: e,
      splan24_attribute: i,
      source_entity: e,
      source_attribute: i,
      source_time_key: "time"
    });
  }
  shiftRowOpenAfterInsert(t) {
    const e = {};
    for (const [i, s] of Object.entries(this._ui.rowOpen)) {
      const r = Number(i);
      Number.isNaN(r) || (e[r >= t ? r + 1 : r] = s);
    }
    this._ui.rowOpen = e;
  }
  shiftRowOpenAfterRemove(t) {
    const e = {};
    for (const [i, s] of Object.entries(this._ui.rowOpen)) {
      const r = Number(i);
      Number.isNaN(r) || r === t || (e[r > t ? r - 1 : r] = s);
    }
    this._ui.rowOpen = e;
  }
  rgbaFromHex(t, e) {
    const i = et(t);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${v(e)})` : `rgba(0,0,0,${v(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const s = (t ?? "").toString().trim();
    if (s.startsWith("#"))
      return et(s) ? { hex: s, alpha: v(i) } : { hex: e, alpha: v(i) };
    const r = s.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const l = Math.max(0, Math.min(255, Number(r[1]))), a = Math.max(0, Math.min(255, Number(r[2]))), c = Math.max(0, Math.min(255, Number(r[3]))), h = v(Number(r[4])), d = (u) => u.toString(16).padStart(2, "0");
      return { hex: `#${d(l)}${d(a)}${d(c)}`, alpha: h };
    }
    const o = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (o) {
      const l = Math.max(0, Math.min(255, Number(o[1]))), a = Math.max(0, Math.min(255, Number(o[2]))), c = Math.max(0, Math.min(255, Number(o[3]))), h = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${h(l)}${h(a)}${h(c)}`, alpha: v(i) };
    }
    return { hex: e, alpha: v(i) };
  }
  setHighlightRgba(t, e, i) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, i) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((r) => r.trim()).filter((r) => r.length), i = (this._config.rows ?? []).map((r) => {
      if (x(r)) return r;
      const o = r, l = Array.from({ length: e.length }, (c, h) => (o.cells?.[h] ?? "").toString()), a = Array.from({ length: e.length }, (c, h) => X(o.cell_styles?.[h]));
      return { ...o, cells: l, cell_styles: a };
    });
    this.emit({ ...this._config, days: e, rows: i });
    const s = {};
    Object.entries(this._ui.rowOpen).forEach(([r, o]) => {
      const l = Number(r);
      !Number.isNaN(l) && l >= 0 && l < i.length && (s[l] = o);
    }), this._ui.rowOpen = s;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => {
      if (r !== t) return s;
      if (x(s)) return { ...s, time: e };
      const o = s, l = D(o.time), a = D(e), c = (o.start ?? "").toString().trim(), h = (o.end ?? "").toString().trim(), d = !c || !!l.start && c === l.start, u = !h || !!l.end && h === l.end;
      return {
        ...o,
        time: e,
        start: d ? a.start ?? o.start : o.start,
        end: u ? a.end ?? o.end : o.end
      };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map(
      (s, r) => r !== t || x(s) ? s : { ...s, start: e || void 0 }
    );
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map(
      (s, r) => r !== t || x(s) ? s : { ...s, end: e || void 0 }
    );
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || x(r)) return r;
      const l = r, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = i, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, o) => {
      if (o !== t || x(r)) return r;
      const l = r, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), h = { ...a[e] ? { ...a[e] } : {}, ...i };
      return typeof h.bg_alpha == "number" && (h.bg_alpha = v(h.bg_alpha)), a[e] = X(h), { ...l, cell_styles: a };
    });
    this.emit({ ...this._config, rows: s });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t ? s : e ? { break: !0, time: s.time ?? "", label: s.label ?? "Pause" } : {
      time: s.time ?? "",
      start: void 0,
      end: void 0,
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    });
    this.emit({ ...this._config, rows: i });
  }
  updateBreakLabel(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r === t ? { ...s, label: e } : s);
    this.emit({ ...this._config, rows: i });
  }
  addLessonRow(t) {
    if (!this._config) return;
    const e = {
      time: "",
      start: "",
      end: "",
      cells: Array.from({ length: this._config.days.length }, () => ""),
      cell_styles: Array.from({ length: this._config.days.length }, () => null)
    }, i = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < i.length) {
      const s = t + 1;
      this.shiftRowOpenAfterInsert(s), i.splice(s, 0, e);
    } else
      i.push(e);
    this.emit({ ...this._config, rows: i });
  }
  addBreakRow(t) {
    if (!this._config) return;
    const e = { break: !0, time: "", label: "Pause" }, i = [...this._config.rows];
    if (typeof t == "number" && t >= 0 && t < i.length) {
      const s = t + 1;
      this.shiftRowOpenAfterInsert(s), i.splice(s, 0, e);
    } else
      i.push(e);
    this.emit({ ...this._config, rows: i });
  }
  removeRow(t) {
    if (!this._config) return;
    const e = this._config.rows.filter((i, s) => s !== t);
    this.shiftRowOpenAfterRemove(t), this.emit({ ...this._config, rows: e });
  }
  async jumpToCell(t, e) {
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((r) => requestAnimationFrame(() => r(null))), await new Promise((r) => requestAnimationFrame(() => r(null)));
    const i = `sp-cell-${t}-${e}`, s = this.renderRoot?.getElementById(i);
    s && (s.scrollIntoView({ behavior: "smooth", block: "center" }), s.focus?.());
  }
  uiSwitch(t, e) {
    return p`
      <label class="switch">
        <input type="checkbox" .checked=${t} @change=${(i) => e(!!i.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }
  panel(t, e, i, s) {
    return p`
      <details class="panel" ?open=${e} @toggle=${(r) => i(!!r.target.open)}>
        <summary>
          <div class="panelTitle">${t}</div>
        </summary>
        <div class="panelBody">${s}</div>
      </details>
    `;
  }
  renderEditorPreview() {
    if (!this._config) return p``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], i = this._config.rows ?? [];
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
              ${e.map((s) => p`<th>${s}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${i.map((s, r) => {
      if (x(s))
        return p`
                  <tr class="p-break">
                    <td class="p-time">${s.time}</td>
                    <td colspan=${e.length}>${s.label ?? ""}</td>
                  </tr>
                `;
      const o = s;
      return p`
                <tr>
                  <td class="p-time">${o.time}</td>
                  ${e.map((l, a) => {
        const c = (o.cells?.[a] ?? "").toString(), h = o.cell_styles?.[a] ?? null;
        return p`
                      <td
                        class="p-cell"
                        style=${ut(h, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(r, a)}
                      >
                        ${c}
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
          <input class="in" type="text" .value=${(this._config.days ?? []).join(", ")} @input=${(t) => this.setDaysFromString(t.target.value)} />
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
            <div class="sub">Unterdrückt „Aktuell“-Highlights, wenn die heutige Zelle leer ist oder "-" / "---".</div>
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
  colorRow(t, e, i, s, r, o) {
    const l = Math.round(v(i.alpha) * 100);
    return p`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${i.hex} @input=${(a) => s(a.target.value)} />
          <div class="range">
            <input type="range" min="0" max="100" .value=${String(l)} @input=${(a) => r(Number(a.target.value) / 100)} />
            <div class="pct">${l}%</div>
          </div>
        </div>

        <div class="mono">${o}</div>
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
      (i) => this.setHighlightRgba("highlight_today_color", i, t.alpha),
      (i) => this.setHighlightRgba("highlight_today_color", t.hex, i),
      this._config.highlight_today_color
    )}

        ${this.colorRow(
      "Highlight-Farbe: Aktuelle Stunde (Hintergrund)",
      "Zeitspalten-Overlay (und optional Pausen).",
      e,
      (i) => this.setHighlightRgba("highlight_current_color", i, e.alpha),
      (i) => this.setHighlightRgba("highlight_current_color", e.hex, i),
      this._config.highlight_current_color
    )}

        <div class="divider"></div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">Textfarbe: Aktuelles Fach</label>
            <div class="inRow">
              <input class="col" type="color" .value=${(this._config.highlight_current_text_color ?? "#ff1744").toString()} @input=${(i) => this.setHighlightHexOnly("highlight_current_text_color", i.target.value)} />
              <input class="in" type="text" .value=${this._config.highlight_current_text_color ?? "#ff1744"} @input=${(i) => this.emit({ ...this._config, highlight_current_text_color: i.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Textfarbe: Zeitspalte (aktuelle Stunde)</label>
            <div class="inRow">
              <input class="col" type="color" .value=${(this._config.highlight_current_time_text_color ?? "#ff9100").toString()} @input=${(i) => this.setHighlightHexOnly("highlight_current_time_text_color", i.target.value)} />
              <input class="in" type="text" .value=${this._config.highlight_current_time_text_color ?? "#ff9100"} @input=${(i) => this.emit({ ...this._config, highlight_current_time_text_color: i.target.value })} />
            </div>
          </div>
        </div>

        <div class="sub">Tipp: Du kannst auch <span class="mono">rgb()/rgba()</span> oder <span class="mono">var(--...)</span> direkt in YAML setzen.</div>
      </div>
    `;
  }
  renderSplan24() {
    if (!this._config) return p``;
    const t = this._config, e = Object.keys(this.hass?.states ?? {}).filter((i) => i.startsWith("sensor.stundenplan_woche_")).sort((i, s) => i.localeCompare(s));
    return p`
      <div class="stack">
        <div class="panelMinor">
          <div class="minorTitle">Stundenplan24 Sensor (Entity-rows)</div>

          <div class="field">
            <label class="lbl">Stundenplan24 Woche</label>
            <select class="in" .value=${t.splan24_entity ?? ""} @change=${(i) => this.setSplan24Entity(i.target.value)} ?disabled=${e.length === 0}>
              <option value="">– auswählen –</option>
              ${e.map((i) => {
      const r = (this.hass?.states?.[i]?.attributes?.friendly_name ?? "").toString().trim(), o = r ? `${r} (${i})` : i;
      return p`<option value=${i}>${o}</option>`;
    })}
            </select>

            <div class="sub" style="margin-top:6px;">
              Auswahl setzt automatisch <span class="mono">source_entity</span> / <span class="mono">source_attribute</span>.
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
      <div class="panelMinor">
        <div class="minorTitle">Blättern (Woche Offset)</div>

        <div class="grid2">
          <div class="field">
            <label class="lbl">week_offset_entity</label>
            <input
              class="in"
              type="text"
              .value=${t.week_offset_entity ?? ""}
              placeholder="z.B. number.05b_woche_offset"
              @input=${(e) => this.emit({ ...t, week_offset_entity: e.target.value })}
            />
          </div>

          <div class="field">
            <label class="lbl">Schrittweite</label>
            <input class="in" type="number" .value=${String(t.week_offset_step ?? 1)} @input=${(e) => this.emit({ ...t, week_offset_step: Number(e.target.value) })} />
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
            ${this.uiSwitch(!!this._ui.showCellStyles, (i) => {
      this._ui.showCellStyles = i, this.requestUpdate();
    })}
          </div>

          <button class="btn" @click=${() => this.addLessonRow()}>+ Stunde</button>
          <button class="btn" @click=${() => this.addBreakRow()}>+ Pause</button>
        </div>
      </div>

      <div class="sub" style="margin-bottom:10px;">Pro Zeile: Zeit + optional Start/Ende. Per Klick in der Vorschau springst du zur passenden Zelle.</div>

      ${(t.rows ?? []).map((i, s) => {
      const r = x(i), o = r ? `Pause · ${i.time ?? ""}` : `Stunde · ${i.time ?? ""}`, l = r ? i.label ?? "Pause" : "", a = i;
      return p`
          <details class="rowPanel" ?open=${this._ui.rowOpen[s] ?? !1} @toggle=${(c) => this._ui.rowOpen[s] = !!c.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${o || `Zeile ${s + 1}`}</div>
                <div class="rowHeadMeta">${r ? l : `${(a.start ?? "") || "Start?"} – ${(a.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${i.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(c) => this.updateRowTime(s, c.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(r, (c) => this.toggleBreak(s, c))}
                  </div>
                </div>
              </div>

              ${r ? p`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${i.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(c) => this.updateBreakLabel(s, c.target.value)} />
                    </div>
                  ` : p`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${a.start ?? ""} placeholder="z.B. 07:45" @input=${(c) => this.updateRowStart(s, c.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${a.end ?? ""} placeholder="z.B. 08:30" @input=${(c) => this.updateRowEnd(s, c.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((c, h) => {
        const d = (a.cells?.[h] ?? "").toString(), u = a.cell_styles?.[h] ?? null, _ = u?.bg && u.bg.startsWith("#") ? u.bg : "#3b82f6", y = typeof u?.bg_alpha == "number" ? v(u.bg_alpha) : 0.18, g = Math.round(y * 100), b = u?.color && u.color.startsWith("#") ? u.color : "#ffffff", w = `sp-cell-${s}-${h}`, $ = ut(u, "1px solid var(--divider-color)");
        return p`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${c}</div>
                              <div class="cellMiniPreview" style=${$} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${w} class="in" type="text" .value=${d} placeholder="Fach" @input=${(f) => this.updateRowCell(s, h, f.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${_} @input=${(f) => this.updateCellStyle(s, h, { bg: f.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(g)} @input=${(f) => this.updateCellStyle(s, h, { bg_alpha: Number(f.target.value) / 100 })} />
                                  <div class="pct">${g}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${b} @input=${(f) => this.updateCellStyle(s, h, { color: f.target.value })} />
                              </div>
                            </div>
                          </div>
                        `;
      })}
                    </div>
                  `}

              <div class="rowActions">
                <button class="btn" @click=${() => this.addLessonRow(s)}>+ Stunde darunter</button>
                <button class="btn" @click=${() => this.addBreakRow(s)}>+ Pause darunter</button>
                <button class="btn danger" @click=${() => this.removeRow(s)}>Löschen</button>
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
it.properties = {
  hass: {},
  _config: { state: !0 }
}, it.styles = Bt`
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
let _t = it;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Jt);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", _t);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + Woche blättern (week_offset_entity). Ohne XML.",
  preview: !0
});
export {
  Jt as StundenplanCard,
  _t as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
