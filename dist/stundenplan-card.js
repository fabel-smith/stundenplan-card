const ct = globalThis, kt = ct.ShadowRoot && (ct.ShadyCSS === void 0 || ct.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = /* @__PURE__ */ Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let Xt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (kt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ge = (n) => new Xt(typeof n == "string" ? n : n + "", void 0, At), Yt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Xt(e, n, At);
}, me = (n, t) => {
  if (kt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = ct.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, Pt = kt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ge(e);
})(n) : n;
const { is: fe, defineProperty: be, getOwnPropertyDescriptor: ye, getOwnPropertyNames: we, getOwnPropertySymbols: ve, getPrototypeOf: $e } = Object, mt = globalThis, Dt = mt.trustedTypes, xe = Dt ? Dt.emptyScript : "", Se = mt.reactiveElementPolyfillSupport, tt = (n, t) => n, dt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? xe : null;
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
} }, Ct = (n, t) => !fe(n, t), Lt = { attribute: !0, type: String, converter: dt, reflect: !1, useDefault: !1, hasChanged: Ct };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), mt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let V = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && be(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = ye(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      r?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = $e(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const e = this.properties, s = [...we(e), ...ve(e)];
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
      for (const i of s) e.unshift(Pt(i));
    } else t !== void 0 && e.push(Pt(t));
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
    return me(t, this.constructor.elementStyles), t;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : dt).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : dt;
      this._$Em = i;
      const l = o.fromAttribute(e, r.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (r = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Ct)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: o } = r, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, r, l);
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
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[tt("elementProperties")] = /* @__PURE__ */ new Map(), V[tt("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: V }), (mt.reactiveElementVersions ??= []).push("2.1.2");
const Mt = globalThis, Ht = (n) => n, pt = Mt.trustedTypes, Wt = pt ? pt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Gt = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, Qt = "?" + F, ke = `<${Qt}>`, Z = document, et = () => Z.createComment(""), st = (n) => n === null || typeof n != "object" && typeof n != "function", Et = Array.isArray, Ae = (n) => Et(n) || typeof n?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bt = /-->/g, zt = />/g, I = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Ft = /"/g, te = /^(?:script|style|textarea|title)$/i, Ce = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), g = Ce(1), X = /* @__PURE__ */ Symbol.for("lit-noChange"), E = /* @__PURE__ */ Symbol.for("lit-nothing"), Ut = /* @__PURE__ */ new WeakMap(), q = Z.createTreeWalker(Z, 129);
function ee(n, t) {
  if (!Et(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(t) : t;
}
const Me = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = G;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let u, c, d = -1, h = 0;
    for (; h < a.length && (o.lastIndex = h, c = o.exec(a), c !== null); ) h = o.lastIndex, o === G ? c[1] === "!--" ? o = Bt : c[1] !== void 0 ? o = zt : c[2] !== void 0 ? (te.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = I) : c[3] !== void 0 && (o = I) : o === I ? c[0] === ">" ? (o = i ?? G, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, u = c[1], o = c[3] === void 0 ? I : c[3] === '"' ? Ft : Ot) : o === Ft || o === Ot ? o = I : o === Bt || o === zt ? o = G : (o = I, i = void 0);
    const p = o === I && n[l + 1].startsWith("/>") ? " " : "";
    r += o === G ? a + ke : d >= 0 ? (s.push(u), a.slice(0, d) + Gt + a.slice(d) + F + p) : a + F + (d === -2 ? l : p);
  }
  return [ee(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class it {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [u, c] = Me(t, e);
    if (this.el = it.createElement(u, s), q.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = q.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Gt)) {
          const h = c[o++], p = i.getAttribute(d).split(F), f = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: r, name: f[2], strings: p, ctor: f[1] === "." ? Te : f[1] === "?" ? Re : f[1] === "@" ? Ne : ft }), i.removeAttribute(d);
        } else d.startsWith(F) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (te.test(i.tagName)) {
          const d = i.textContent.split(F), h = d.length - 1;
          if (h > 0) {
            i.textContent = pt ? pt.emptyScript : "";
            for (let p = 0; p < h; p++) i.append(d[p], et()), q.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[h], et());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Qt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(F, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += F.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = Z.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Y(n, t, e = n, s) {
  if (t === X) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = st(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = Y(n, i._$AS(n, t.values), i, s)), t;
}
class Ee {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? Z).importNode(e, !0);
    q.currentNode = i;
    let r = q.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new rt(r, r.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (u = new Pe(r, this, t)), this._$AV.push(u), a = s[++l];
      }
      o !== a?.index && (r = q.nextNode(), o++);
    }
    return q.currentNode = Z, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class rt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = Y(this, t, e), st(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== X && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ae(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && st(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = it.createElement(ee(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new Ee(i, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ut.get(t.strings);
    return e === void 0 && Ut.set(t.strings, e = new it(t)), e;
  }
  k(t) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new rt(this.O(et()), this.O(et()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ht(t).nextSibling;
      Ht(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = E;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Y(this, t, e, 0), o = !st(t) || t !== this._$AH && t !== X, o && (this._$AH = t);
    else {
      const l = t;
      let a, u;
      for (t = r[0], a = 0; a < r.length - 1; a++) u = Y(this, l[s + a], e, a), u === X && (u = this._$AH[a]), o ||= !st(u) || u !== this._$AH[a], u === E ? t = E : t !== E && (t += (u ?? "") + r[a + 1]), this._$AH[a] = u;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
class Re extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== E);
  }
}
class Ne extends ft {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Y(this, t, e, 0) ?? E) === X) return;
    const s = this._$AH, i = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== E && (s === E || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pe {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const De = Mt.litHtmlPolyfillSupport;
De?.(it, rt), (Mt.litHtmlVersions ??= []).push("3.3.2");
const Le = (n, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new rt(t.insertBefore(et(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
const Tt = globalThis;
class J extends V {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Le(e, this.renderRoot, this.renderOptions);
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
J._$litElement$ = !0, J.finalized = !0, Tt.litElementHydrateSupport?.({ LitElement: J });
const He = Tt.litElementPolyfillSupport;
He?.({ LitElement: J });
(Tt.litElementVersions ??= []).push("4.2.2");
const We = { attribute: !0, type: String, converter: dt, reflect: !1, hasChanged: Ct }, Be = (n = We, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, n, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function se(n) {
  return (t, e) => typeof e == "object" ? Be(n, t, e) : ((s, i, r) => {
    const o = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
function ot(n) {
  return se({ ...n, state: !0, attribute: !1 });
}
var ze = Object.create, Oe = Object.defineProperty, ie = (n, t) => (t = Symbol[n]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + n), re = (n) => {
  throw TypeError(n);
}, Fe = (n, t, e) => t in n ? Oe(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, Ue = (n) => [, , , ze(n?.[ie("metadata")] ?? null)], je = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], ne = (n) => n !== void 0 && typeof n != "function" ? re("Function expected") : n, Ie = (n, t, e, s, i) => ({ kind: je[n], name: t, metadata: s, addInitializer: (r) => e._ ? re("Already initialized") : i.push(ne(r || null)) }), qe = (n, t) => Fe(t, ie("metadata"), n[3]), O = (n, t, e, s) => {
  for (var i = 0, r = n[t >> 1], o = r && r.length; i < o; i++) t & 1 ? r[i].call(e) : s = r[i].call(e, s);
  return s;
}, nt = (n, t, e, s, i, r) => {
  var o, l, a, u, c = t & 7, d = !1, h = !1, p = n.length + 1, f = n[p - 1] = [], b = n[p] || (n[p] = []);
  i = i.prototype, c < 5;
  for (var _ = s.length - 1; _ >= 0; _--)
    a = Ie(c, e, l = {}, n[3], b), a.static = d, a.private = h, u = a.access = { has: (y) => e in y }, u.get = (y) => y[e], u.set = (y, v) => y[e] = v, o = (0, s[_])(void 0, a), l._ = 1, ne(o) && f.unshift(o);
  return i;
}, oe, ae, le, ce, ue, wt, T;
function P(n) {
  return !!n && n.break === !0;
}
function W(n) {
  return Math.min(1, Math.max(0, n));
}
function _t(n) {
  if (!n) return null;
  const t = n.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((r) => Number.isNaN(r)) ? null : { r: e, g: s, b: i };
}
function ut(n) {
  if (!n || typeof n != "object") return null;
  const t = {};
  return typeof n.bg == "string" && n.bg.trim() && (t.bg = n.bg.trim()), typeof n.color == "string" && n.color.trim() && (t.color = n.color.trim()), typeof n.border == "string" && n.border.trim() && (t.border = n.border.trim()), typeof n.bg_alpha == "number" && !Number.isNaN(n.bg_alpha) && (t.bg_alpha = W(n.bg_alpha)), Object.keys(t).length ? t : null;
}
function Ze(n) {
  if (!n?.bg) return null;
  const t = n.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = _t(t);
  if (!e) return t;
  const s = typeof n.bg_alpha == "number" ? W(n.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function vt(n, t) {
  const e = [], s = Ze(n);
  return s && e.push(`background:${s}`), n?.color && e.push(`color:${n.color}`), e.push(`border:${n?.border ?? t}`), e.join(";") + ";";
}
function jt(n, t) {
  const e = (n ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const s = _t(e);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${W(t)})` : e;
  }
  return e;
}
function U(n) {
  const e = (n ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function $t(n) {
  return (n ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Ke(n) {
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
function It(n) {
  const t = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const s = t.getUTCFullYear(), i = new Date(Date.UTC(s, 0, 1)), r = i.getUTCDay() === 0 ? 7 : i.getUTCDay(), o = new Date(i);
  o.setUTCDate(i.getUTCDate() + (4 - r));
  const l = t.getTime() - o.getTime();
  return { isoWeek: 1 + Math.round(l / (10080 * 60 * 1e3)), isoYear: s };
}
function ht(n) {
  const t = (n ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function at(n) {
  const t = (n ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || t.startsWith("---") || t.toUpperCase().startsWith("AUSFALL"));
}
function Ve(n) {
  return (n ?? "").toString().trim().toLowerCase().split("?")[0].endsWith(".json");
}
function Je(n) {
  const e = (n ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), r = Number(e[3]);
  return [s, i, r].some((o) => Number.isNaN(o)) ? null : new Date(s, i - 1, r, 12, 0, 0);
}
function Xe(n) {
  const t = Je(n);
  if (!t) return null;
  const e = t.getDay();
  return e === 0 ? 7 : e;
}
function Ye(n, t) {
  const e = (n ?? "").toString().trim(), s = (t ?? "").toString().trim();
  return !e || e.toUpperCase() === "AUSFALL" ? s ? `---
${s}` : "---" : s ? `${e}
${s}` : e;
}
function qt(n) {
  const t = $t(n);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
function Zt(n) {
  const t = (n ?? "").trim(), e = t.match(/^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/) || t.match(/^\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\s*$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), r = Number(e[3]);
  return [s, i, r].some((o) => Number.isNaN(o)) ? null : new Date(r, i - 1, s, 12, 0, 0);
}
function Ge(n) {
  const t = n.getFullYear(), e = String(n.getMonth() + 1).padStart(2, "0"), s = String(n.getDate()).padStart(2, "0");
  return `${t}${e}${s}`;
}
function Qe(n) {
  const t = (n ?? "").toString().trim();
  if (t.split("?")[0].toLowerCase().endsWith(".xml")) {
    const o = t.replace(/\/[^/]*$/u, "");
    return { basisUrl: t, baseDir: o };
  }
  const i = t.replace(/\/+$/u, "");
  return { basisUrl: `${i}/SPlanKl_Basis.xml`, baseDir: i };
}
async function lt(n) {
  const t = `${n}${n.includes("?") ? "&" : "?"}_ts=${Date.now()}`, e = await fetch(t, { cache: "no-store" });
  if (!e.ok) throw new Error(`HTTP ${e.status} (${e.statusText}) bei ${n}`);
  return await e.text();
}
function ts(n) {
  const t = Array.from(n.querySelectorAll("Klassen > Kl > Kurz")).map((s) => (s.textContent ?? "").trim()).filter((s) => !!s), e = Array.from(n.querySelectorAll("Schulwochen > Sw")).map((s) => {
    const i = (s.textContent ?? "").trim(), r = (s.getAttribute("SwDatumVon") ?? "").trim(), o = (s.getAttribute("SwDatumBis") ?? "").trim(), l = ht(s.getAttribute("SwWo"));
    return { sw: i, from: r, to: o, wo: l ?? void 0 };
  });
  return { classes: t, weeks: e };
}
function Kt(n, t) {
  const e = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0).getTime();
  for (const s of n.weeks) {
    const i = Zt(s.from), r = Zt(s.to);
    if (!i || !r) continue;
    const o = i.getTime(), l = r.getTime();
    if (e >= o && e <= l) return { sw: s.sw, wo: s.wo };
  }
  return null;
}
function es(n) {
  const t = (n ?? "").toString().trim();
  return t && (t.length === 1 ? `0${t}` : t);
}
function ss(n, t) {
  const e = (t ?? "").trim().toLowerCase();
  if (!e) return !1;
  const s = (n ?? "").replace(/\u00a0/g, " ").trim().toLowerCase();
  if (!s) return !1;
  if (s === e) return !0;
  const i = s.split(/[,/;|\s]+/u).map((r) => r.trim()).filter((r) => !!r);
  for (const r of i) {
    if (r === e) return !0;
    const o = r.match(/^(\d+)([a-z])\s*-\s*(\d+)([a-z])$/i);
    if (o) {
      const l = Number(o[1]), a = o[2].toLowerCase().charCodeAt(0), u = Number(o[3]), c = o[4].toLowerCase().charCodeAt(0), d = e.match(/^(\d+)([a-z])$/i);
      if (!d) continue;
      const h = Number(d[1]), p = d[2].toLowerCase().charCodeAt(0);
      if (l === u && h === l) {
        const f = Math.min(a, c), b = Math.max(a, c);
        if (p >= f && p <= b) return !0;
      }
    }
  }
  return s.includes(e);
}
function Q(n, t) {
  return (n?.querySelector(t)?.textContent ?? "").replace(/\u00a0/g, " ").trim();
}
function Vt(n, t) {
  const e = Number((n?.querySelector(t)?.textContent ?? "").trim());
  return Number.isFinite(e) ? e : 0;
}
function is(n, t) {
  const e = Array.from(n.querySelectorAll("Pl > Std, Std")), s = t.splan_plan_art ?? "class", i = (t.splan_class ?? "").trim(), r = [];
  for (const o of e) {
    const l = Vt(o, "PlTg"), a = Vt(o, "PlSt");
    if (!l || !a) continue;
    const u = Q(o, "PlFa"), c = Q(o, "PlLe"), d = Q(o, "PlRa"), h = (Q(o, "PlWo") || "").toUpperCase(), p = h === "A" || h === "B" ? h : "";
    if (s === "class") {
      const f = Q(o, "PlKl");
      if (f && i && !ss(f, i)) continue;
    } else if (s === "teacher") {
      if (i && c.toLowerCase() !== i.toLowerCase()) continue;
    } else if (s === "room" && i && d.toLowerCase() !== i.toLowerCase())
      continue;
    !u && !c && !d || r.push({ day: l, hour: a, subject: u, teacher: c, room: d, week: p });
  }
  return r;
}
function rs(n) {
  const t = Array.from(n.querySelectorAll("Std")), e = [];
  for (const s of t) {
    const i = Number((s.querySelector("St")?.textContent ?? "").trim());
    if (!Number.isFinite(i) || i <= 0) continue;
    const r = s.querySelector("Fa"), o = s.querySelector("Le"), l = s.querySelector("Ra"), a = (r?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, u = (o?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, c = (l?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, d = (r?.getAttribute("FaAe") ?? "").toLowerCase().includes("geaendert"), h = (o?.getAttribute("LeAe") ?? "").toLowerCase().includes("geaendert"), p = (l?.getAttribute("RaAe") ?? "").toLowerCase().includes("geaendert"), f = (s.querySelector("If")?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0;
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
      changed_room: p
    });
  }
  return e;
}
function Jt(n) {
  const t = n.getDay();
  return t === 0 ? 7 : t;
}
const j = class xt extends (wt = J, ue = [se({ attribute: !1 })], ce = [ot()], le = [ot()], ae = [ot()], oe = [ot()], wt) {
  constructor() {
    super(...arguments), this.hass = O(T, 8, this), O(T, 11, this), this.config = O(T, 12, this), O(T, 15, this), this._splanErr = O(T, 16, this, null), O(T, 19, this), this._splanLoading = O(T, 20, this, !1), O(T, 23, this), this._rowsCache = O(T, 24, this, []), O(T, 27, this), this._tick = void 0, this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._lastWatchSig = null, this._splanMobilWeek = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), s = (i) => {
      const r = (i ?? "").toString().trim();
      r && e.add(r);
    };
    return s(t.source_entity), s(t.source_entity_a), s(t.source_entity_b), s(t.week_map_entity), s(t.splan24_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const s = e.last_updated ?? "", i = e.last_changed ?? "", r = e.state ?? "", o = e.attributes ?? {}, l = o.rows ?? o.rows_json ?? o.rows_ha, a = Array.isArray(l) || typeof l == "string" ? l.length : 0, u = o.week ?? o.kw ?? "";
    return `${t}|${s}|${i}|${r}|rowsLen=${a}|wk=${u}`;
  }
  computeWatchSig(t) {
    const s = this.getWatchedEntities(t).map((r) => this.getEntitySig(r));
    return `week=${t.week_mode !== "off" ? this.getActiveWeek(t) : "off"}::` + s.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const t = this.computeWatchSig(this.config);
    t !== this._lastWatchSig && (this._lastWatchSig = t, this.recomputeRows());
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
    if (super.updated(t), t.has("config")) {
      this.reloadSplanIfNeeded(!0), this.recomputeRows();
      return;
    }
    t.has("hass") && this.recomputeRowsIfWatchedChanged();
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
    const r = Ve(s);
    if (!(!t && (r && this._splanMobilWeek && !this._splanErr || !r && this._splanBasis && this._splanWeekLessons && !this._splanErr))) {
      this._splanLoading = !0, this._splanErr = null;
      try {
        if (r) {
          const y = await lt(s), v = JSON.parse(y);
          this._splanMobilWeek = v, this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanErr = null;
          return;
        }
        this._splanMobilWeek = null;
        const { basisUrl: o, baseDir: l } = Qe(s), a = await lt(o), u = new DOMParser().parseFromString(a, "text/xml"), c = ts(u);
        this._splanBasis = c;
        const d = Kt(c, /* @__PURE__ */ new Date());
        if (!d?.sw) throw new Error("Schulwoche (Sw) in Basis nicht für heutiges Datum gefunden.");
        const h = d.sw.trim(), p = [`${l}/SPlanKl_Sw${h}.xml`, `${l}/SPlanKl_Sw${es(h)}.xml`];
        let f = null, b = null;
        for (const y of p)
          try {
            f = await lt(y);
            break;
          } catch (v) {
            b = v;
          }
        if (!f)
          throw new Error(
            `Wochenplan-Datei nicht gefunden (versucht: ${p.join(", ")}). ${b?.message ?? ""}`
          );
        const _ = new DOMParser().parseFromString(f, "text/xml");
        if (this._splanWeekLessons = is(_, e), this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), e.splan_sub_enabled) {
          const y = Math.max(1, Math.min(14, Number(e.splan_sub_days ?? 3)));
          for (let v = 0; v < y; v++) {
            const w = /* @__PURE__ */ new Date();
            w.setDate(w.getDate() + v);
            const x = Jt(w);
            if (x === 6 || x === 7) continue;
            const C = `${l}/WPlanKl_${Ge(w)}.xml`;
            try {
              const D = await lt(C), R = new DOMParser().parseFromString(D, "text/xml"), M = rs(R).map((k) => ({ ...k, day: x }));
              this._splanSubLessonsByDay.set(x, M);
            } catch {
            }
          }
        }
        this._splanErr = null;
      } catch (o) {
        this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanMobilWeek = null, this._splanErr = o?.message ? String(o.message) : String(o);
      } finally {
        this._splanLoading = !1, this.recomputeRows();
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
      splan24_attribute: "rows",
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
      splan_xml_enabled: !1,
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
    const e = xt.getStubConfig(), s = ((t?.type ?? e.type) + "").toString();
    if (!(s === "custom:stundenplan-card" || s === "stundenplan-card")) {
      this.config = this.normalizeConfig(e), this.reloadSplanIfNeeded(!0), this.recomputeRows();
      return;
    }
    this.config = this.normalizeConfig({ ...e, ...t, type: s }), this.reloadSplanIfNeeded(!0), this.recomputeRows(), this._lastWatchSig = null;
  }
  getCardSize() {
    const t = this.config?.rows?.length ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = xt.getStubConfig(), s = Array.isArray(t.days) && t.days.length ? t.days.map((f) => (f ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((f) => {
      if (P(f))
        return {
          break: !0,
          time: (f.time ?? "").toString(),
          label: (f.label ?? "Pause").toString()
        };
      const b = Array.isArray(f?.cells) ? f.cells : [], _ = Array.from({ length: s.length }, (M, k) => (b[k] ?? "").toString()), y = Array.isArray(f?.cell_styles) ? f.cell_styles : [], v = Array.from({ length: s.length }, (M, k) => ut(y[k])), w = (f?.time ?? "").toString(), x = U(w), C = (f?.start ?? "").toString().trim(), D = (f?.end ?? "").toString().trim(), R = {
        time: w,
        start: C || x.start || void 0,
        end: D || x.end || void 0,
        cells: _
      };
      return v.some((M) => !!M) && (R.cell_styles = v), R;
    }), o = ((t.week_mode ?? e.week_mode) + "").toString().trim(), l = o === "kw_parity" || o === "week_map" || o === "off" ? o : "off", a = ((t.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), u = a === "a" ? "A" : a === "b" ? "B" : "auto", c = ((t.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), d = c === "teacher" ? "teacher" : c === "room" ? "room" : "class", h = Number(t.splan_sub_days ?? e.splan_sub_days), p = Number.isFinite(h) ? Math.max(1, Math.min(14, h)) : e.splan_sub_days;
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
      splan24_attribute: (t.splan24_attribute ?? "rows").toString(),
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
      splan_sub_days: p,
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
    const e = (/* @__PURE__ */ new Date()).getDay(), s = new Set(Ke(e).map($t));
    if (!s.size) return -1;
    const i = (t ?? []).map((r) => $t(r));
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
    const r = /* @__PURE__ */ new Date(), o = r.getHours() * 60 + r.getMinutes();
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
    const i = this.hass.states[s], r = (e ?? "").toString().trim(), o = r ? i.attributes?.[r] : i.state;
    return this.parseAnyJson(o);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const s = t.days ?? [], i = (t.source_time_key ?? "Stunde").toString(), r = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o.time ?? o[i] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[i] ?? "").toString(), a = U(l), u = Array.from({ length: s.length }, (d, h) => {
        const p = (s[h] ?? "").toString();
        return (o?.[p] ?? "").toString();
      });
      return { time: l, start: a.start, end: a.end, cells: u };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, s) {
    let i = this.readEntityJson(e, s);
    if (i == null) {
      const r = (s ?? "").toString().trim();
      r === "rows" && (i = this.readEntityJson(e, "rows_json")), i == null && r === "rows_ha" && (i = this.readEntityJson(e, "rows")), i == null && r === "rows_ha" && (i = this.readEntityJson(e, "rows_json"));
    }
    return Array.isArray(i) ? this.buildRowsFromArray(t, i) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = It(/* @__PURE__ */ new Date()), s = e % 2 === 0, i = !!t.week_a_is_even_kw;
    return s === i ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const s = (t.week_map_attribute ?? "").toString().trim(), i = this.readEntityJson(e, s);
    if (!i || typeof i != "object") return null;
    const { isoWeek: r, isoYear: o } = It(/* @__PURE__ */ new Date()), l = String(r), a = String(o);
    if (i?.[a] && typeof i[a] == "object") {
      const c = ht(i[a][l]);
      if (c) return c;
    }
    const u = ht(i?.[l]);
    return u || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    const e = this.getRowsFromSplanXml(t);
    if (e) return e;
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), o = (t.source_entity_b ?? "").trim(), l = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (i === "A" && r) {
        const c = this.getRowsFromEntity(t, r, l);
        if (c) return c;
      }
      if (i === "B" && o) {
        const c = this.getRowsFromEntity(t, o, a);
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
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [];
      return;
    }
    this._rowsCache = this.getRowsResolved(this.config);
  }
  /**
   * Fix: Fallback für Zeiten aus manuellen cfg.rows, wenn XML Stundenzeiten nicht liefert
   */
  getFallbackTimesFromManual(t, e) {
    const s = t.rows ?? [];
    for (const i of s) {
      if (P(i)) continue;
      const r = i, o = (r.time ?? "").match(/^\s*(\d+)\s*\./);
      if (!o || parseInt(o[1], 10) !== e) continue;
      const a = U(r.time), u = (r.start ?? "").toString().trim() || a.start, c = (r.end ?? "").toString().trim() || a.end;
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
      if (P(i)) continue;
      const r = i, o = this.parseHourNumberFromTimeLabel(r.time);
      if (!o) continue;
      const l = U(r.time), a = (r.start ?? "").toString().trim() || l.start, u = (r.end ?? "").toString().trim() || l.end;
      (a || u) && e.set(o, { start: a || void 0, end: u || void 0 });
    }
    return e;
  }
  normalizeSequentialTimes(t, e) {
    const s = new Map(e);
    let i = null;
    const r = (o) => `${String(Math.floor(o / 60)).padStart(2, "0")}:${String(o % 60).padStart(2, "0")}`;
    for (const o of t) {
      const l = s.get(o);
      if (!l) continue;
      const a = this.toMinutes(l.start), u = this.toMinutes(l.end);
      if (i != null && a != null && a < i) {
        const h = i;
        let p = u;
        const f = a != null && u != null ? Math.max(0, u - a) : null;
        p != null && p <= h && (f != null && f > 0 ? p = h + f : p = h + 45), s.set(o, { start: r(h), end: p != null ? r(p) : l.end });
      }
      const c = s.get(o)?.end, d = this.toMinutes(c);
      d != null && (i = d);
    }
    return s;
  }
  // ✅ NEU: Textfilter gegen "zu viele Kurse"
  filterCellText(t, e) {
    const s = (t ?? "").toString().trim();
    if (!s) return "";
    const i = s.split("/").map((h) => h.trim()).filter((h) => h.length > 0 && h !== "---" && h !== "—"), r = (e.filter_exclude ?? []).map((h) => h.trim()).filter(Boolean), o = (h) => r.some((p) => {
      try {
        return new RegExp(p, "i").test(h);
      } catch {
        return h.toLowerCase().includes(p.toLowerCase());
      }
    }), l = i.filter((h) => !o(h)), a = e.filter_main_only !== !1 ? l.filter((h) => !/^\d/.test(h)) : l, u = (e.filter_allow_prefixes ?? []).map((h) => h.toLowerCase()).filter(Boolean), c = l.filter((h) => {
      const p = h.match(/^(\d+[a-z]+)/i);
      if (!p) return !1;
      const f = p[1].toLowerCase();
      return u.some((b) => f.startsWith(b));
    });
    return Array.from(/* @__PURE__ */ new Set([...a, ...c])).join(" / ");
  }
  getRowsFromSplanXml(t) {
    if (!this.isSplanXmlActive(t)) return null;
    if (this._splanMobilWeek?.days?.length) {
      const _ = t.days ?? [], y = _.map((m) => qt(m)), v = /* @__PURE__ */ new Map();
      for (const m of this._splanMobilWeek.days ?? []) {
        const $ = Xe(m.date ?? "");
        $ && v.set($, Array.isArray(m.lessons) ? m.lessons : []);
      }
      const w = /* @__PURE__ */ new Set();
      for (const m of v.values())
        for (const $ of m) {
          const A = Number(($.stunde ?? "").toString().trim());
          Number.isFinite(A) && A > 0 && w.add(A);
        }
      const x = this.getManualHourTimeMap(t);
      for (const m of x.keys()) w.add(m);
      const C = Array.from(w).sort((m, $) => m - $);
      if (!C.length) return null;
      const D = /* @__PURE__ */ new Map();
      for (const m of C) {
        let $, A;
        for (const N of v.values()) {
          const z = N.find((K) => Number(K.stunde) === m);
          if (z?.start || z?.end) {
            $ = (z.start ?? "").trim() || void 0, A = (z.end ?? "").trim() || void 0;
            break;
          }
        }
        const S = x.get(m);
        D.set(m, {
          start: $ ?? S?.start,
          end: A ?? S?.end
        });
      }
      const R = this.normalizeSequentialTimes(C, D), M = !!t.splan_show_room, k = !!t.splan_show_teacher, L = (m) => {
        if (!m) return "";
        const $ = Ye(m.fach, m.info);
        if ($.startsWith("---")) return $;
        const A = (m.raum ?? "").toString().trim(), S = (m.lehrer ?? "").toString().trim(), N = [];
        if (M && A && N.push(A), k && S && N.push(S), N.length) {
          const [z, ...K] = $.split(`
`), bt = `${z} (${N.join(" · ")})`;
          return K.length ? `${bt}
${K.join(`
`)}` : bt;
        }
        return $;
      }, B = C.map((m) => {
        const $ = R.get(m) ?? this.getFallbackTimesFromManual(t, m) ?? {}, A = ($.start ?? "").trim(), S = ($.end ?? "").trim(), N = `${m}.`, z = A && S ? `${N} ${A}–${S}` : `${N}`, K = _.map((bt, de) => {
          const Rt = y[de];
          if (!Rt) return "";
          const pe = (v.get(Rt) ?? []).find((_e) => Number(_e.stunde) === m) ?? null;
          return L(pe);
        });
        return {
          time: z,
          start: A || void 0,
          end: S || void 0,
          cells: K
        };
      }).filter((m) => {
        if (P(m)) return !0;
        const $ = m, A = this.parseHourNumberFromTimeLabel($.time), S = !!(A && x.has(A));
        return ($.cells ?? []).some((z) => !at(z)) || S;
      });
      return B.length ? B : null;
    }
    if (!this._splanWeekLessons || !this._splanWeekLessons.length) return null;
    const e = t.days ?? [], s = e.map((_) => qt(_)), i = !!t.splan_show_room, r = !!t.splan_show_teacher;
    let o = null;
    if (t.splan_week === "A") o = "A";
    else if (t.splan_week === "B") o = "B";
    else {
      const _ = this._splanBasis ? Kt(this._splanBasis, /* @__PURE__ */ new Date())?.wo ?? null : null;
      _ ? o = _ : t.week_mode !== "off" ? o = this.getActiveWeek(t) : o = null;
    }
    const l = this.getManualHourTimeMap(t), a = this._splanWeekLessons.map((_) => _.hour).filter((_) => Number.isFinite(_)), u = Array.from(l.keys()), c = Array.from(/* @__PURE__ */ new Set([...a, ...u])).sort((_, y) => _ - y);
    if (!c.length) return null;
    const d = this.normalizeSequentialTimes(c, l), h = Jt(/* @__PURE__ */ new Date()), p = (_, y, v, w, x) => {
      const C = (_ ?? "").trim(), D = (y ?? "").trim(), R = (v ?? "").trim(), M = [];
      i && D && M.push(D), r && R && M.push(R);
      let k = M.length ? `${C} (${M.join(" · ")})` : C;
      return (x?.s || x?.r || x?.t) && (k = `🔁 ${k}`), t.splan_sub_show_info && w && (k = `${k}
${w}`), k.trim();
    }, b = c.map((_) => {
      const y = d.get(_) ?? this.getFallbackTimesFromManual(t, _) ?? {}, v = (y.start ?? "").trim(), w = (y.end ?? "").trim(), x = `${_}.`, C = v && w ? `${x} ${v}–${w}` : `${x}`, R = e.map((M, k) => {
        const L = s[k];
        if (!L) return "";
        const H = this._splanWeekLessons.filter((S) => {
          if (S.hour !== _ || S.day !== L) return !1;
          const N = ht(S.week);
          return !N || !o ? !0 : N === o;
        }), m = (this._splanSubLessonsByDay.get(L) ?? []).find((S) => S.hour === _) ?? null, $ = [];
        if (m && L === h)
          $.push(
            p(
              m.subject ?? H[0]?.subject ?? "",
              m.room ?? H[0]?.room ?? "",
              m.teacher ?? H[0]?.teacher ?? "",
              m.info,
              { s: !!m.changed_subject, r: !!m.changed_room, t: !!m.changed_teacher }
            )
          );
        else
          for (const S of H) $.push(p(S.subject, S.room, S.teacher));
        return Array.from(new Set($.filter((S) => S.trim().length > 0))).join(" / ");
      }).map((M) => this.filterCellText(M, t));
      return {
        time: C,
        start: v || void 0,
        end: w || void 0,
        cells: R
      };
    }).filter((_) => {
      if (P(_)) return !0;
      const y = _, v = this.parseHourNumberFromTimeLabel(y.time), w = !!(v && l.has(v));
      return (y.cells ?? []).some((C) => !at(C)) || w;
    });
    return b.length ? b : null;
  }
  render() {
    if (!this.config) return g``;
    const t = this.config, e = this._rowsCache, s = this.getTodayIndex(t.days ?? []), i = "1px solid var(--divider-color)", r = jt(t.highlight_today_color ?? "", 0.12), o = jt(t.highlight_current_color ?? "", 0.18), l = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), u = t.week_mode !== "off", c = u ? this.getActiveWeek(t) : null, d = this.isSplanXmlActive(t), h = (t.splan_class ?? "").trim(), p = t.splan_week === "auto" ? "auto" : t.splan_week, f = (t.splan_plan_art ?? "class").toString();
    return g`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${u ? g`<div class="weekBadge">Woche: <b>${c}</b></div>` : g``}

          ${d ? g`
                <div class="xmlBadge">
                  <div class="xmlLine">
                    <b>XML</b>
                    <span class="mono">${f}</span>
                    <span class="mono">${h}</span>
                    <span class="mono">${p}</span>
                    ${t.splan_sub_enabled ? g`<span class="pill">Vertretung an</span>` : g``}
                    ${this._splanLoading ? g`<span class="pill">lädt…</span>` : g``}
                    ${this._splanErr ? g`<span class="pill err">Fehler</span>` : g``}
                  </div>
                  ${this._splanErr ? g`<div class="xmlErr">${this._splanErr}</div>` : g``}
                </div>
              ` : g``}

          <table>
            <thead>
              <tr>
                <th class="time">Stunde</th>
                ${t.days.map((b, _) => {
      const y = t.highlight_today && _ === s ? "today" : "";
      return g`<th class=${y} style=${`--sp-hl:${r};`}>${b}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((b) => {
      if (P(b)) {
        const H = U(b.time), B = !!H.start && !!H.end && this.isNowBetween(H.start, H.end), m = !!t.highlight_breaks && B;
        let $ = `--sp-hl:${o};`, A = "";
        return m && ($ += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", A += `--sp-hl:${o}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), m && t.highlight_current_time_text && a && ($ += `color:${a};`), g`
                    <tr class="break">
                      <td class="time" style=${$}>${b.time}</td>
                      <td colspan=${t.days.length} style=${A}>${b.label ?? ""}</td>
                    </tr>
                  `;
      }
      const _ = b, y = _.cells ?? [], v = _.cell_styles ?? [], w = y.map((H) => this.filterCellText(H, t)), x = !!_.start && !!_.end && this.isNowBetween(_.start, _.end), C = s >= 0 ? y[s] ?? "" : "", D = s >= 0 ? this.filterCellText(C, t) : "", R = s >= 0 ? at(D) : !1, k = !(!!t.free_only_column_highlight && R);
      let L = `--sp-hl:${o};`;
      return k && t.highlight_current && x && (L += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), k && x && t.highlight_current_time_text && a && (L += `color:${a};`), g`
                  <tr>
                    <td class="time" style=${L}>${_.time}</td>

                    ${t.days.map((H, B) => {
        const m = w[B] ?? "", $ = v[B] ?? null, A = t.highlight_today && B === s ? "today" : "";
        let S = `--sp-hl:${r};` + vt($, i);
        const N = !at(m);
        return k && N && x && t.highlight_current_text && l && s >= 0 && B === s && (S += `color:${l};`), g`<td class=${A} style=${S}><span class="cellText">${m}</span></td>`;
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
T = Ue(wt);
nt(T, 5, "hass", ue, j);
nt(T, 5, "config", ce, j);
nt(T, 5, "_splanErr", le, j);
nt(T, 5, "_splanLoading", ae, j);
nt(T, 5, "_rowsCache", oe, j);
qe(T, j);
j.styles = Yt`
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
let he = j;
const gt = class gt extends J {
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
    const e = he.getStubConfig(), s = { ...e, ...t, type: (t.type ?? e.type).toString() }, i = Array.isArray(s.days) && s.days.length ? s.days.map((b) => (b ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], o = (Array.isArray(s.rows) ? s.rows : []).map((b) => {
      if (P(b))
        return { break: !0, time: (b.time ?? "").toString(), label: (b.label ?? "Pause").toString() };
      const _ = Array.isArray(b?.cells) ? b.cells : [], y = Array.from({ length: i.length }, (k, L) => (_[L] ?? "").toString()), v = Array.isArray(b?.cell_styles) ? b.cell_styles : [], w = Array.from({ length: i.length }, (k, L) => ut(v[L])), x = (b?.time ?? "").toString(), C = U(x), D = (b?.start ?? "").toString().trim(), R = (b?.end ?? "").toString().trim(), M = {
        time: x,
        start: D || C.start || void 0,
        end: R || C.end || void 0,
        cells: y
      };
      return w.some((k) => !!k) && (M.cell_styles = w), M;
    }), l = ((s.week_mode ?? e.week_mode) + "").toString().trim(), a = l === "kw_parity" || l === "week_map" || l === "off" ? l : "off", u = ((s.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), c = u === "a" ? "A" : u === "b" ? "B" : "auto", d = ((s.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), h = d === "teacher" ? "teacher" : d === "room" ? "room" : "class", p = Number(s.splan_sub_days ?? e.splan_sub_days), f = Number.isFinite(p) ? Math.max(1, Math.min(14, p)) : e.splan_sub_days;
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
      splan24_attribute: (s.splan24_attribute ?? "rows").toString(),
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
    const e = (t ?? "").toString().trim(), s = "rows";
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
    const s = _t(t);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${W(e)})` : `rgba(0,0,0,${W(e)})`;
  }
  parseColorToHexAlpha(t, e, s) {
    const i = (t ?? "").toString().trim();
    if (i.startsWith("#"))
      return _t(i) ? { hex: i, alpha: W(s) } : { hex: e, alpha: W(s) };
    const r = i.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const l = Math.max(0, Math.min(255, Number(r[1]))), a = Math.max(0, Math.min(255, Number(r[2]))), u = Math.max(0, Math.min(255, Number(r[3]))), c = W(Number(r[4])), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(l)}${d(a)}${d(u)}`, alpha: c };
    }
    const o = i.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (o) {
      const l = Math.max(0, Math.min(255, Number(o[1]))), a = Math.max(0, Math.min(255, Number(o[2]))), u = Math.max(0, Math.min(255, Number(o[3]))), c = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${c(l)}${c(a)}${c(u)}`, alpha: W(s) };
    }
    return { hex: e, alpha: W(s) };
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
      if (P(r)) return r;
      const o = r, l = Array.from({ length: e.length }, (u, c) => (o.cells?.[c] ?? "").toString()), a = Array.from({ length: e.length }, (u, c) => ut(o.cell_styles?.[c]));
      return { ...o, cells: l, cell_styles: a };
    });
    this.emit({ ...this._config, days: e, rows: s });
    const i = {};
    Object.entries(this._ui.rowOpen).forEach(([r, o]) => {
      const l = Number(r);
      !Number.isNaN(l) && l >= 0 && l < s.length && (i[l] = o);
    }), this._ui.rowOpen = i;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => {
      if (r !== t) return i;
      if (P(i)) return { ...i, time: e };
      const o = i, l = U(o.time), a = U(e), u = (o.start ?? "").toString().trim(), c = (o.end ?? "").toString().trim(), d = !u || !!l.start && u === l.start, h = !c || !!l.end && c === l.end;
      return {
        ...o,
        time: e,
        start: d ? a.start ?? o.start : o.start,
        end: h ? a.end ?? o.end : o.end
      };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map(
      (i, r) => r !== t || P(i) ? i : { ...i, start: e || void 0 }
    );
    this.emit({ ...this._config, rows: s });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map(
      (i, r) => r !== t || P(i) ? i : { ...i, end: e || void 0 }
    );
    this.emit({ ...this._config, rows: s });
  }
  updateRowCell(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, o) => {
      if (o !== t || P(r)) return r;
      const l = r, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = s, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateCellStyle(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, o) => {
      if (o !== t || P(r)) return r;
      const l = r, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), c = { ...a[e] ? { ...a[e] } : {}, ...s };
      return typeof c.bg_alpha == "number" && (c.bg_alpha = W(c.bg_alpha)), a[e] = ut(c), { ...l, cell_styles: a };
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
    return g`
      <label class="switch">
        <input type="checkbox" .checked=${t} @change=${(s) => e(!!s.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }
  panel(t, e, s, i) {
    return g`
      <details class="panel" ?open=${e} @toggle=${(r) => s(!!r.target.open)}>
        <summary>
          <div class="panelTitle">${t}</div>
        </summary>
        <div class="panelBody">${i}</div>
      </details>
    `;
  }
  renderEditorPreview() {
    if (!this._config) return g``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], s = this._config.rows ?? [];
    return g`
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
              ${e.map((i) => g`<th>${i}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${s.map((i, r) => {
      if (P(i))
        return g`
                  <tr class="p-break">
                    <td class="p-time">${i.time}</td>
                    <td colspan=${e.length}>${i.label ?? ""}</td>
                  </tr>
                `;
      const o = i;
      return g`
                <tr>
                  <td class="p-time">${o.time}</td>
                  ${e.map((l, a) => {
        const u = (o.cells?.[a] ?? "").toString(), c = o.cell_styles?.[a] ?? null;
        return g`
                      <td
                        class="p-cell"
                        style=${vt(c, t)}
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
    return this._config ? g`
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
    ` : g``;
  }
  renderHighlighting() {
    if (!this._config) return g``;
    const t = this._config;
    return g`
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
  colorRow(t, e, s, i, r, o) {
    const l = Math.round(W(s.alpha) * 100);
    return g`
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

        <div class="mono">${o}</div>
      </div>
    `;
  }
  renderColors() {
    if (!this._config) return g``;
    const t = this.parseColorToHexAlpha(this._config.highlight_today_color, "#0096ff", 0.12), e = this.parseColorToHexAlpha(this._config.highlight_current_color, "#4caf50", 0.18);
    return g`
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
    if (!this._config) return g``;
    const t = this._config, e = Object.keys(this.hass?.states ?? {}).filter((s) => s.startsWith("sensor.stundenplan_woche_")).sort((s, i) => s.localeCompare(i));
    return g`
    <div class="stack">
      <div class="panelMinor">
        <div class="minorTitle">Stundenplan24 Sensor</div>

        <div class="field">
          <label class="lbl">Stundenplan24 Woche</label>
          <select
            class="in"
            .value=${t.splan24_entity ?? ""}
            @change=${(s) => this.setSplan24Entity(s.target.value)}
            ?disabled=${e.length === 0}
          >
            <option value="">– auswählen –</option>
            ${e.map((s) => {
      const r = (this.hass?.states?.[s]?.attributes?.friendly_name ?? "").toString().trim(), o = r ? `${r} (${s})` : s;
      return g`<option value=${s}>${o}</option>`;
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
    if (!this._config) return g``;
    const t = this._config;
    return g`



<div class="panelMinor">
  <div class="minorTitle">Single-Source (Legacy / einfach)</div>

  <div class="grid2">
    <div class="field">
      <label class="lbl">source_entity</label>
      <input
        class="in"
        type="text"
        .value=${t.source_entity ?? ""}
        @input=${(e) => this.emit({ ...t, source_entity: e.target.value })}
      />
    </div>

    <div class="field">
      <label class="lbl">source_attribute</label>
      <input
        class="in"
        type="text"
        .value=${t.source_attribute ?? ""}
        @input=${(e) => this.emit({ ...t, source_attribute: e.target.value })}
      />
    </div>
  </div>

  <div class="field">
    <label class="lbl">source_time_key</label>
    <input
      class="in"
      type="text"
      .value=${t.source_time_key ?? "Stunde"}
      @input=${(e) => this.emit({ ...t, source_time_key: e.target.value })}
    />
  </div>
</div>

<div class="panelMinor">
  <div class="minorTitle">Wechselwochen (A/B)</div>

  <div class="field">
    <label class="lbl">week_mode</label>
    <select
      class="in"
      .value=${t.week_mode ?? "off"}
      @change=${(e) => this.emit({ ...t, week_mode: e.target.value })}
    >
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
      <input
        class="in"
        type="text"
        .value=${t.week_map_entity ?? ""}
        placeholder="z.B. sensor.wechselwochen_map"
        @input=${(e) => this.emit({ ...t, week_map_entity: e.target.value })}
      />
    </div>

    <div class="field">
      <label class="lbl">week_map_attribute</label>
      <input
        class="in"
        type="text"
        .value=${t.week_map_attribute ?? ""}
        placeholder="z.B. map (leer = state)"
        @input=${(e) => this.emit({ ...t, week_map_attribute: e.target.value })}
      />
    </div>
  </div>

  <div class="sub">
    Mapping: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span>
  </div>

  <div class="divider"></div>

  <div class="grid2">
    <div class="field">
      <label class="lbl">source_entity_a</label>
      <input
        class="in"
        type="text"
        .value=${t.source_entity_a ?? ""}
        @input=${(e) => this.emit({ ...t, source_entity_a: e.target.value })}
      />
    </div>
    <div class="field">
      <label class="lbl">source_attribute_a</label>
      <input
        class="in"
        type="text"
        .value=${t.source_attribute_a ?? ""}
        @input=${(e) => this.emit({ ...t, source_attribute_a: e.target.value })}
      />
    </div>
    <div class="field">
      <label class="lbl">source_entity_b</label>
      <input
        class="in"
        type="text"
        .value=${t.source_entity_b ?? ""}
        @input=${(e) => this.emit({ ...t, source_entity_b: e.target.value })}
      />
    </div>
    <div class="field">
      <label class="lbl">source_attribute_b</label>
      <input
        class="in"
        type="text"
        .value=${t.source_attribute_b ?? ""}
        @input=${(e) => this.emit({ ...t, source_attribute_b: e.target.value })}
      />
    </div>
  </div>
</div>
`;
  }
  renderRows() {
    if (!this._config) return g``;
    const t = this._config, e = t.days ?? [];
    return g`
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
      const r = P(s), o = r ? `Pause · ${s.time ?? ""}` : `Stunde · ${s.time ?? ""}`, l = r ? s.label ?? "Pause" : "", a = s;
      return g`
          <details class="rowPanel" ?open=${this._ui.rowOpen[i] ?? !1} @toggle=${(u) => this._ui.rowOpen[i] = !!u.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${o || `Zeile ${i + 1}`}</div>
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

              ${r ? g`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${s.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(u) => this.updateBreakLabel(i, u.target.value)} />
                    </div>
                  ` : g`
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
        const d = (a.cells?.[c] ?? "").toString(), h = a.cell_styles?.[c] ?? null, p = h?.bg && h.bg.startsWith("#") ? h.bg : "#3b82f6", f = typeof h?.bg_alpha == "number" ? W(h.bg_alpha) : 0.18, b = Math.round(f * 100), _ = h?.color && h.color.startsWith("#") ? h.color : "#ffffff", y = `sp-cell-${i}-${c}`, v = vt(h, "1px solid var(--divider-color)");
        return g`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${u}</div>
                              <div class="cellMiniPreview" style=${v} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${y} class="in" type="text" .value=${d} placeholder="Fach" @input=${(w) => this.updateRowCell(i, c, w.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${p} @input=${(w) => this.updateCellStyle(i, c, { bg: w.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(b)} @input=${(w) => this.updateCellStyle(i, c, { bg_alpha: Number(w.target.value) / 100 })} />
                                  <div class="pct">${b}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${_} @input=${(w) => this.updateCellStyle(i, c, { color: w.target.value })} />
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
    return this._config ? g`
      ${this.renderEditorPreview()}
      ${this.panel("Allgemein", this._ui.openGeneral, (t) => this._ui.openGeneral = t, this.renderGeneral())}
      ${this.panel("Highlights", this._ui.openHighlight, (t) => this._ui.openHighlight = t, this.renderHighlighting())}
      ${this.panel("Farben", this._ui.openColors, (t) => this._ui.openColors = t, this.renderColors())}
      ${this.panel("Stundenplan24", this._ui.openSplan24, (t) => this._ui.openSplan24 = t, this.renderSplan24())}	
      ${this.panel("Datenquellen", this._ui.openSources, (t) => this._ui.openSources = t, this.renderSources())}
      ${this.panel("Zeilen & Fächer", this._ui.openRows, (t) => this._ui.openRows = t, this.renderRows())}
    ` : g``;
  }
};
gt.properties = {
  hass: {},
  _config: { state: !0 }
}, gt.styles = Yt`
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
let St = gt;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", he);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", St);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + XML (Stundenplan24)",
  preview: !0
});
export {
  he as StundenplanCard,
  St as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
