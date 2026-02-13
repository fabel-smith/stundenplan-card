const ut = globalThis, Dt = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Rt = /* @__PURE__ */ Symbol(), Ot = /* @__PURE__ */ new WeakMap();
let ee = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Dt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (o) => new ee(typeof o == "string" ? o : o + "", void 0, Rt), se = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, r) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[r + 1], o[0]);
  return new ee(e, o, Rt);
}, ge = (o, t) => {
  if (Dt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = ut.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, Bt = Dt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return _e(e);
})(o) : o;
const { is: me, defineProperty: fe, getOwnPropertyDescriptor: be, getOwnPropertyNames: ye, getOwnPropertySymbols: we, getPrototypeOf: ve } = Object, $t = globalThis, zt = $t.trustedTypes, $e = zt ? zt.emptyScript : "", xe = $t.reactiveElementPolyfillSupport, st = (o, t) => o, bt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? $e : null;
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
} }, Nt = (o, t) => !me(o, t), Ft = { attribute: !0, type: String, converter: bt, reflect: !1, useDefault: !1, hasChanged: Nt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), $t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && fe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = be(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const a = i?.call(this);
      r?.call(this, n), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(st("elementProperties"))) return;
    const t = ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(st("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(st("properties"))) {
      const e = this.properties, s = [...ye(e), ...we(e)];
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
      for (const i of s) e.unshift(Bt(i));
    } else t !== void 0 && e.push(Bt(t));
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
    return ge(t, this.constructor.elementStyles), t;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : bt).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : bt;
      this._$Em = i;
      const a = n.fromAttribute(e, r.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? Nt)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
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
        const { wrapped: n } = r, a = this[i];
        n !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, r, a);
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
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[st("elementProperties")] = /* @__PURE__ */ new Map(), Z[st("finalized")] = /* @__PURE__ */ new Map(), xe?.({ ReactiveElement: Z }), ($t.reactiveElementVersions ??= []).push("2.1.2");
const Pt = globalThis, Ut = (o) => o, yt = Pt.trustedTypes, jt = yt ? yt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ie = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, re = "?" + B, Se = `<${re}>`, I = document, it = () => I.createComment(""), rt = (o) => o === null || typeof o != "object" && typeof o != "function", Lt = Array.isArray, ke = (o) => Lt(o) || typeof o?.[Symbol.iterator] == "function", At = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, It = /-->/g, qt = />/g, U = RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Zt = /'/g, Kt = /"/g, ne = /^(?:script|style|textarea|title)$/i, Ae = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), p = Ae(1), V = /* @__PURE__ */ Symbol.for("lit-noChange"), T = /* @__PURE__ */ Symbol.for("lit-nothing"), Vt = /* @__PURE__ */ new WeakMap(), j = I.createTreeWalker(I, 129);
function oe(o, t) {
  if (!Lt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const Ce = (o, t) => {
  const e = o.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = G;
  for (let a = 0; a < e; a++) {
    const l = o[a];
    let u, c, d = -1, h = 0;
    for (; h < l.length && (n.lastIndex = h, c = n.exec(l), c !== null); ) h = n.lastIndex, n === G ? c[1] === "!--" ? n = It : c[1] !== void 0 ? n = qt : c[2] !== void 0 ? (ne.test(c[2]) && (i = RegExp("</" + c[2], "g")), n = U) : c[3] !== void 0 && (n = U) : n === U ? c[0] === ">" ? (n = i ?? G, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, u = c[1], n = c[3] === void 0 ? U : c[3] === '"' ? Kt : Zt) : n === Kt || n === Zt ? n = U : n === It || n === qt ? n = G : (n = U, i = void 0);
    const _ = n === U && o[a + 1].startsWith("/>") ? " " : "";
    r += n === G ? l + Se : d >= 0 ? (s.push(u), l.slice(0, d) + ie + l.slice(d) + B + _) : l + B + (d === -2 ? a : _);
  }
  return [oe(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class nt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [u, c] = Ce(t, e);
    if (this.el = nt.createElement(u, s), j.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = j.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ie)) {
          const h = c[n++], _ = i.getAttribute(d).split(B), f = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: r, name: f[2], strings: _, ctor: f[1] === "." ? Ee : f[1] === "?" ? Te : f[1] === "@" ? De : xt }), i.removeAttribute(d);
        } else d.startsWith(B) && (l.push({ type: 6, index: r }), i.removeAttribute(d));
        if (ne.test(i.tagName)) {
          const d = i.textContent.split(B), h = d.length - 1;
          if (h > 0) {
            i.textContent = yt ? yt.emptyScript : "";
            for (let _ = 0; _ < h; _++) i.append(d[_], it()), j.nextNode(), l.push({ type: 2, index: ++r });
            i.append(d[h], it());
          }
        }
      } else if (i.nodeType === 8) if (i.data === re) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(B, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += B.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = I.createElement("template");
    return s.innerHTML = t, s;
  }
}
function J(o, t, e = o, s) {
  if (t === V) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = rt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = J(o, i._$AS(o, t.values), i, s)), t;
}
class Me {
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
    j.currentNode = i;
    let r = j.nextNode(), n = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let u;
        l.type === 2 ? u = new ot(r, r.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (u = new Re(r, this, t)), this._$AV.push(u), l = s[++a];
      }
      n !== l?.index && (r = j.nextNode(), n++);
    }
    return j.currentNode = I, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class ot {
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
    t = J(this, t, e), rt(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ke(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && rt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(I.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = nt.createElement(oe(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new Me(i, this), n = r.u(this.options);
      r.p(e), this.T(n), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Vt.get(t.strings);
    return e === void 0 && Vt.set(t.strings, e = new nt(t)), e;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new ot(this.O(it()), this.O(it()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ut(t).nextSibling;
      Ut(t).remove(), t = s;
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
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = J(this, t, e, 0), n = !rt(t) || t !== this._$AH && t !== V, n && (this._$AH = t);
    else {
      const a = t;
      let l, u;
      for (t = r[0], l = 0; l < r.length - 1; l++) u = J(this, a[s + l], e, l), u === V && (u = this._$AH[l]), n ||= !rt(u) || u !== this._$AH[l], u === T ? t = T : t !== T && (t += (u ?? "") + r[l + 1]), this._$AH[l] = u;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ee extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class Te extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class De extends xt {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = J(this, t, e, 0) ?? T) === V) return;
    const s = this._$AH, i = t === T && s !== T || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== T && (s === T || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Re {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const Ne = Pt.litHtmlPolyfillSupport;
Ne?.(nt, ot), (Pt.litHtmlVersions ??= []).push("3.3.2");
const Pe = (o, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new ot(t.insertBefore(it(), r), r, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
const Wt = globalThis;
class K extends Z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pe(e, this.renderRoot, this.renderOptions);
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
K._$litElement$ = !0, K.finalized = !0, Wt.litElementHydrateSupport?.({ LitElement: K });
const Le = Wt.litElementPolyfillSupport;
Le?.({ LitElement: K });
(Wt.litElementVersions ??= []).push("4.2.2");
const We = { attribute: !0, type: String, converter: bt, reflect: !1, hasChanged: Nt }, He = (o = We, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), r.set(e.name, o), s === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, o, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, o, a), a;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, o, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ae(o) {
  return (t, e) => typeof e == "object" ? He(o, t, e) : ((s, i, r) => {
    const n = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), n ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(o, t, e);
}
function St(o) {
  return ae({ ...o, state: !0, attribute: !1 });
}
var Oe = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, le = (o) => {
  throw TypeError(o);
}, at = (o, t, e, s) => {
  for (var i = Be(t, e), r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (i = n(t, e, i) || i);
  return i && Oe(t, e, i), i;
}, ce = (o, t, e) => t.has(o) || le("Cannot " + e), Y = (o, t, e) => (ce(o, t, "read from private field"), e ? e.call(o) : t.get(o)), Q = (o, t, e) => t.has(o) ? le("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e), tt = (o, t, e, s) => (ce(o, t, "write to private field"), t.set(o, e), e), ht, dt, pt, _t, gt;
function P(o) {
  return !!o && o.break === !0;
}
function W(o) {
  return Math.min(1, Math.max(0, o));
}
function wt(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((r) => Number.isNaN(r)) ? null : { r: e, g: s, b: i };
}
function mt(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = W(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function ze(o) {
  if (!o?.bg) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = wt(t);
  if (!e) return t;
  const s = typeof o.bg_alpha == "number" ? W(o.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function Mt(o, t) {
  const e = [], s = ze(o);
  return s && e.push(`background:${s}`), o?.color && e.push(`color:${o.color}`), e.push(`border:${o?.border ?? t}`), e.join(";") + ";";
}
function Jt(o, t) {
  const e = (o ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const s = wt(e);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${W(t)})` : e;
  }
  return e;
}
function z(o) {
  const e = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function Et(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Fe(o) {
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
function Xt(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const s = t.getUTCFullYear(), i = new Date(Date.UTC(s, 0, 1)), r = i.getUTCDay() === 0 ? 7 : i.getUTCDay(), n = new Date(i);
  n.setUTCDate(i.getUTCDate() + (4 - r));
  const a = t.getTime() - n.getTime();
  return { isoWeek: 1 + Math.round(a / (10080 * 60 * 1e3)), isoYear: s };
}
function ft(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function lt(o) {
  const t = (o ?? "").toString().trim();
  return !!(!t || t === "-" || t === "–" || t === "---" || t.startsWith("---") || t.toUpperCase().startsWith("AUSFALL"));
}
function Ue(o) {
  return (o ?? "").toString().trim().toLowerCase().split("?")[0].endsWith(".json");
}
function je(o) {
  const e = (o ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), r = Number(e[3]);
  return [s, i, r].some((n) => Number.isNaN(n)) ? null : new Date(s, i - 1, r, 12, 0, 0);
}
function Ie(o) {
  const t = je(o);
  if (!t) return null;
  const e = t.getDay();
  return e === 0 ? 7 : e;
}
function qe(o, t) {
  const e = (o ?? "").toString().trim(), s = (t ?? "").toString().trim();
  return !e || e.toUpperCase() === "AUSFALL" ? s ? `---
${s}` : "---" : s ? `${e}
${s}` : e;
}
function Ct(o) {
  const t = Et(o);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
function Gt(o) {
  const t = (o ?? "").trim(), e = t.match(/^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/) || t.match(/^\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\s*$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), r = Number(e[3]);
  return [s, i, r].some((n) => Number.isNaN(n)) ? null : new Date(r, i - 1, s, 12, 0, 0);
}
function Ze(o) {
  const t = o.getFullYear(), e = String(o.getMonth() + 1).padStart(2, "0"), s = String(o.getDate()).padStart(2, "0");
  return `${t}${e}${s}`;
}
function Ke(o) {
  const t = (o ?? "").toString().trim();
  if (t.split("?")[0].toLowerCase().endsWith(".xml")) {
    const n = t.replace(/\/[^/]*$/u, "");
    return { basisUrl: t, baseDir: n };
  }
  const i = t.replace(/\/+$/u, "");
  return { basisUrl: `${i}/SPlanKl_Basis.xml`, baseDir: i };
}
async function ct(o) {
  const t = `${o}${o.includes("?") ? "&" : "?"}_ts=${Date.now()}`, e = await fetch(t, { cache: "no-store" });
  if (!e.ok) throw new Error(`HTTP ${e.status} (${e.statusText}) bei ${o}`);
  return await e.text();
}
function Ve(o) {
  const t = Array.from(o.querySelectorAll("Klassen > Kl > Kurz")).map((s) => (s.textContent ?? "").trim()).filter((s) => !!s), e = Array.from(o.querySelectorAll("Schulwochen > Sw")).map((s) => {
    const i = (s.textContent ?? "").trim(), r = (s.getAttribute("SwDatumVon") ?? "").trim(), n = (s.getAttribute("SwDatumBis") ?? "").trim(), a = ft(s.getAttribute("SwWo"));
    return { sw: i, from: r, to: n, wo: a ?? void 0 };
  });
  return { classes: t, weeks: e };
}
function Yt(o, t) {
  const e = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0).getTime();
  for (const s of o.weeks) {
    const i = Gt(s.from), r = Gt(s.to);
    if (!i || !r) continue;
    const n = i.getTime(), a = r.getTime();
    if (e >= n && e <= a) return { sw: s.sw, wo: s.wo };
  }
  return null;
}
function Je(o) {
  const t = (o ?? "").toString().trim();
  return t && (t.length === 1 ? `0${t}` : t);
}
function Xe(o, t) {
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
      const a = Number(n[1]), l = n[2].toLowerCase().charCodeAt(0), u = Number(n[3]), c = n[4].toLowerCase().charCodeAt(0), d = e.match(/^(\d+)([a-z])$/i);
      if (!d) continue;
      const h = Number(d[1]), _ = d[2].toLowerCase().charCodeAt(0);
      if (a === u && h === a) {
        const f = Math.min(l, c), y = Math.max(l, c);
        if (_ >= f && _ <= y) return !0;
      }
    }
  }
  return s.includes(e);
}
function et(o, t) {
  return (o?.querySelector(t)?.textContent ?? "").replace(/\u00a0/g, " ").trim();
}
function Qt(o, t) {
  const e = Number((o?.querySelector(t)?.textContent ?? "").trim());
  return Number.isFinite(e) ? e : 0;
}
function Ge(o, t) {
  const e = Array.from(o.querySelectorAll("Pl > Std, Std")), s = t.splan_plan_art ?? "class", i = (t.splan_class ?? "").trim(), r = [];
  for (const n of e) {
    const a = Qt(n, "PlTg"), l = Qt(n, "PlSt");
    if (!a || !l) continue;
    const u = et(n, "PlFa"), c = et(n, "PlLe"), d = et(n, "PlRa"), h = (et(n, "PlWo") || "").toUpperCase(), _ = h === "A" || h === "B" ? h : "";
    if (s === "class") {
      const f = et(n, "PlKl");
      if (f && i && !Xe(f, i)) continue;
    } else if (s === "teacher") {
      if (i && c.toLowerCase() !== i.toLowerCase()) continue;
    } else if (s === "room" && i && d.toLowerCase() !== i.toLowerCase())
      continue;
    !u && !c && !d || r.push({ day: a, hour: l, subject: u, teacher: c, room: d, week: _ });
  }
  return r;
}
function Ye(o) {
  const t = Array.from(o.querySelectorAll("Std")), e = [];
  for (const s of t) {
    const i = Number((s.querySelector("St")?.textContent ?? "").trim());
    if (!Number.isFinite(i) || i <= 0) continue;
    const r = s.querySelector("Fa"), n = s.querySelector("Le"), a = s.querySelector("Ra"), l = (r?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, u = (n?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, c = (a?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0, d = (r?.getAttribute("FaAe") ?? "").toLowerCase().includes("geaendert"), h = (n?.getAttribute("LeAe") ?? "").toLowerCase().includes("geaendert"), _ = (a?.getAttribute("RaAe") ?? "").toLowerCase().includes("geaendert"), f = (s.querySelector("If")?.textContent ?? "").replace(/\u00a0/g, " ").trim() || void 0;
    e.push({
      day: 0,
      // wird beim Merge gesetzt (Datei=Tag)
      hour: i,
      subject: l,
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
function te(o) {
  const t = o.getDay();
  return t === 0 ? 7 : t;
}
var F;
const X = (F = class extends K {
  constructor() {
    super(...arguments), Q(this, ht), Q(this, dt), Q(this, pt, null), Q(this, _t, !1), Q(this, gt, []), this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._lastWatchSig = null, this._splanMobilWeek = null;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return Y(this, ht);
  }
  set hass(t) {
    tt(this, ht, t);
  }
  get config() {
    return Y(this, dt);
  }
  set config(t) {
    tt(this, dt, t);
  }
  get _splanErr() {
    return Y(this, pt);
  }
  set _splanErr(t) {
    tt(this, pt, t);
  }
  get _splanLoading() {
    return Y(this, _t);
  }
  set _splanLoading(t) {
    tt(this, _t, t);
  }
  get _rowsCache() {
    return Y(this, gt);
  }
  set _rowsCache(t) {
    tt(this, gt, t);
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
    const s = e.last_updated ?? "", i = e.last_changed ?? "", r = e.state ?? "", n = e.attributes ?? {}, a = n.rows ?? n.rows_json ?? n.rows_ha, l = Array.isArray(a) || typeof a == "string" ? a.length : 0, u = n.week ?? n.kw ?? "";
    return `${t}|${s}|${i}|${r}|rowsLen=${l}|wk=${u}`;
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
    if (t.has("hass")) {
      if (this.config) {
        const e = this.getWeekOffset(this.config);
        e !== this._lastWeekOffset && (this._lastWeekOffset = e, this.reloadSplanIfNeeded(!0));
      }
      this.recomputeRows();
    }
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
    const r = Ue(s);
    if (!(!t && (r && this._splanMobilWeek && !this._splanErr || !r && this._splanBasis && this._splanWeekLessons && !this._splanErr))) {
      this._splanLoading = !0, this._splanErr = null;
      try {
        if (r) {
          const $ = await ct(s), w = JSON.parse($);
          this._splanMobilWeek = w, this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanErr = null;
          return;
        }
        this._splanMobilWeek = null;
        const { basisUrl: n, baseDir: a } = Ke(s), l = await ct(n), u = new DOMParser().parseFromString(l, "text/xml"), c = Ve(u);
        this._splanBasis = c;
        const d = Yt(c, /* @__PURE__ */ new Date());
        if (!d?.sw) throw new Error("Schulwoche (Sw) in Basis nicht für heutiges Datum gefunden.");
        const h = d.sw.trim(), _ = [`${a}/SPlanKl_Sw${h}.xml`, `${a}/SPlanKl_Sw${Je(h)}.xml`];
        let f = null, y = null;
        for (const $ of _)
          try {
            f = await ct($);
            break;
          } catch (w) {
            y = w;
          }
        if (!f)
          throw new Error(
            `Wochenplan-Datei nicht gefunden (versucht: ${_.join(", ")}). ${y?.message ?? ""}`
          );
        const m = new DOMParser().parseFromString(f, "text/xml");
        if (this._splanWeekLessons = Ge(m, e), this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), e.splan_sub_enabled) {
          const $ = Math.max(1, Math.min(14, Number(e.splan_sub_days ?? 3)));
          for (let w = 0; w < $; w++) {
            const b = /* @__PURE__ */ new Date();
            b.setDate(b.getDate() + w);
            const x = te(b);
            if (x === 6 || x === 7) continue;
            const C = `${a}/WPlanKl_${Ze(b)}.xml`;
            try {
              const D = await ct(C), E = new DOMParser().parseFromString(D, "text/xml"), A = Ye(E).map((k) => ({ ...k, day: x }));
              this._splanSubLessonsByDay.set(x, A);
            } catch {
            }
          }
        }
        this._splanErr = null;
      } catch (n) {
        this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanMobilWeek = null, this._splanErr = n?.message ? String(n.message) : String(n);
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
      week_offset_entity: "",
      week_offset_attribute: "",
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
    const e = F.getStubConfig(), s = ((t?.type ?? e.type) + "").toString();
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
    const e = F.getStubConfig(), s = Array.isArray(t.days) && t.days.length ? t.days.map((f) => (f ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(t.rows) ? t.rows : []).map((f) => {
      if (P(f))
        return {
          break: !0,
          time: (f.time ?? "").toString(),
          label: (f.label ?? "Pause").toString()
        };
      const y = Array.isArray(f?.cells) ? f.cells : [], m = Array.from({ length: s.length }, (A, k) => (y[k] ?? "").toString()), $ = Array.isArray(f?.cell_styles) ? f.cell_styles : [], w = Array.from({ length: s.length }, (A, k) => mt($[k])), b = (f?.time ?? "").toString(), x = z(b), C = (f?.start ?? "").toString().trim(), D = (f?.end ?? "").toString().trim(), E = {
        time: b,
        start: C || x.start || void 0,
        end: D || x.end || void 0,
        cells: m
      };
      return w.some((A) => !!A) && (E.cell_styles = w), E;
    }), n = ((t.week_mode ?? e.week_mode) + "").toString().trim(), a = n === "kw_parity" || n === "week_map" || n === "off" ? n : "off", l = ((t.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), u = l === "a" ? "A" : l === "b" ? "B" : "auto", c = ((t.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), d = c === "teacher" ? "teacher" : c === "room" ? "room" : "class", h = Number(t.splan_sub_days ?? e.splan_sub_days), _ = Number.isFinite(h) ? Math.max(1, Math.min(14, h)) : e.splan_sub_days;
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
      week_mode: a,
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
    const e = (/* @__PURE__ */ new Date()).getDay(), s = new Set(Fe(e).map(Et));
    if (!s.size) return -1;
    const i = (t ?? []).map((r) => Et(r));
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
      const a = (n?.time ?? n?.[i] ?? "").toString(), l = z(a), u = Array.from({ length: s.length }, (d, h) => {
        const _ = (s[h] ?? "").toString();
        return (n?.[_] ?? "").toString();
      });
      return { time: a, start: l.start, end: l.end, cells: u };
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
    const { isoWeek: e } = Xt(/* @__PURE__ */ new Date()), s = e % 2 === 0, i = !!t.week_a_is_even_kw;
    return s === i ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const s = (t.week_map_attribute ?? "").toString().trim(), i = this.readEntityJson(e, s);
    if (!i || typeof i != "object") return null;
    const { isoWeek: r, isoYear: n } = Xt(/* @__PURE__ */ new Date()), a = String(r), l = String(n);
    if (i?.[l] && typeof i[l] == "object") {
      const c = ft(i[l][a]);
      if (c) return c;
    }
    const u = ft(i?.[a]);
    return u || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    const e = this.getRowsFromSplanXml(t);
    if (e) return e;
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), n = (t.source_entity_b ?? "").trim(), a = (t.source_attribute_a ?? "").trim(), l = (t.source_attribute_b ?? "").trim();
      if (i === "A" && r) {
        const c = this.getRowsFromEntity(t, r, a);
        if (c) return c;
      }
      if (i === "B" && n) {
        const c = this.getRowsFromEntity(t, n, l);
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
      const r = i, n = (r.time ?? "").match(/^\s*(\d+)\s*\./);
      if (!n || parseInt(n[1], 10) !== e) continue;
      const l = z(r.time), u = (r.start ?? "").toString().trim() || l.start, c = (r.end ?? "").toString().trim() || l.end;
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
      const r = i, n = this.parseHourNumberFromTimeLabel(r.time);
      if (!n) continue;
      const a = z(r.time), l = (r.start ?? "").toString().trim() || a.start, u = (r.end ?? "").toString().trim() || a.end;
      (l || u) && e.set(n, { start: l || void 0, end: u || void 0 });
    }
    return e;
  }
  normalizeSequentialTimes(t, e) {
    const s = new Map(e);
    let i = null;
    const r = (n) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
    for (const n of t) {
      const a = s.get(n);
      if (!a) continue;
      const l = this.toMinutes(a.start), u = this.toMinutes(a.end);
      if (i != null && l != null && l < i) {
        const h = i;
        let _ = u;
        const f = l != null && u != null ? Math.max(0, u - l) : null;
        _ != null && _ <= h && (f != null && f > 0 ? _ = h + f : _ = h + 45), s.set(n, { start: r(h), end: _ != null ? r(_) : a.end });
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
    }), a = i.filter((h) => !n(h)), l = e.filter_main_only !== !1 ? a.filter((h) => !/^\d/.test(h)) : a, u = (e.filter_allow_prefixes ?? []).map((h) => h.toLowerCase()).filter(Boolean), c = a.filter((h) => {
      const _ = h.match(/^(\d+[a-z]+)/i);
      if (!_) return !1;
      const f = _[1].toLowerCase();
      return u.some((y) => f.startsWith(y));
    });
    return Array.from(/* @__PURE__ */ new Set([...l, ...c])).join(" / ");
  }
  getWeekOffset(t) {
    const e = (t.week_offset_entity ?? "").trim();
    if (!e) return 0;
    const s = (t.week_offset_attribute ?? "").trim(), i = this.hass?.states?.[e];
    if (!i) return 0;
    const r = s ? i.attributes?.[s] : i.state, n = Number(r);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  getBaseDate(t) {
    const e = this.getWeekOffset(t), s = /* @__PURE__ */ new Date();
    return s.setHours(12, 0, 0, 0), s.setDate(s.getDate() + e * 7), s;
  }
  mondayOfWeek(t) {
    const e = new Date(t), s = e.getDay() === 0 ? 7 : e.getDay();
    return e.setDate(e.getDate() - (s - 1)), e.setHours(12, 0, 0, 0), e;
  }
  fmtDDMM(t) {
    const e = String(t.getDate()).padStart(2, "0"), s = String(t.getMonth() + 1).padStart(2, "0");
    return `${e}.${s}.`;
  }
  getRowsFromSplanXml(t) {
    if (!this.isSplanXmlActive(t)) return null;
    if (this._splanMobilWeek?.days?.length) {
      const m = t.days ?? [], $ = m.map((g) => Ct(g)), w = /* @__PURE__ */ new Map();
      for (const g of this._splanMobilWeek.days ?? []) {
        const v = Ie(g.date ?? "");
        v && w.set(v, Array.isArray(g.lessons) ? g.lessons : []);
      }
      const b = /* @__PURE__ */ new Set();
      for (const g of w.values())
        for (const v of g) {
          const M = Number((v.stunde ?? "").toString().trim());
          Number.isFinite(M) && M > 0 && b.add(M);
        }
      const x = this.getManualHourTimeMap(t);
      for (const g of x.keys()) b.add(g);
      const C = Array.from(b).sort((g, v) => g - v);
      if (!C.length) return null;
      const D = /* @__PURE__ */ new Map();
      for (const g of C) {
        let v, M;
        for (const N of w.values()) {
          const O = N.find((q) => Number(q.stunde) === g);
          if (O?.start || O?.end) {
            v = (O.start ?? "").trim() || void 0, M = (O.end ?? "").trim() || void 0;
            break;
          }
        }
        const S = x.get(g);
        D.set(g, {
          start: v ?? S?.start,
          end: M ?? S?.end
        });
      }
      const E = this.normalizeSequentialTimes(C, D), A = !!t.splan_show_room, k = !!t.splan_show_teacher, R = (g) => {
        if (!g) return "";
        const v = qe(g.fach, g.info);
        if (v.startsWith("---")) return v;
        const M = (g.raum ?? "").toString().trim(), S = (g.lehrer ?? "").toString().trim(), N = [];
        if (A && M && N.push(M), k && S && N.push(S), N.length) {
          const [O, ...q] = v.split(`
`), kt = `${O} (${N.join(" · ")})`;
          return q.length ? `${kt}
${q.join(`
`)}` : kt;
        }
        return v;
      }, H = C.map((g) => {
        const v = E.get(g) ?? this.getFallbackTimesFromManual(t, g) ?? {}, M = (v.start ?? "").trim(), S = (v.end ?? "").trim(), N = `${g}.`, O = M && S ? `${N} ${M}–${S}` : `${N}`, q = m.map((kt, he) => {
          const Ht = $[he];
          if (!Ht) return "";
          const de = (w.get(Ht) ?? []).find((pe) => Number(pe.stunde) === g) ?? null;
          return R(de);
        });
        return {
          time: O,
          start: M || void 0,
          end: S || void 0,
          cells: q
        };
      }).filter((g) => {
        if (P(g)) return !0;
        const v = g, M = this.parseHourNumberFromTimeLabel(v.time), S = !!(M && x.has(M));
        return (v.cells ?? []).some((O) => !lt(O)) || S;
      });
      return H.length ? H : null;
    }
    if (!this._splanWeekLessons || !this._splanWeekLessons.length) return null;
    const e = t.days ?? [], s = e.map((m) => Ct(m)), i = !!t.splan_show_room, r = !!t.splan_show_teacher;
    let n = null;
    if (t.splan_week === "A") n = "A";
    else if (t.splan_week === "B") n = "B";
    else {
      const m = this._splanBasis ? Yt(this._splanBasis, /* @__PURE__ */ new Date())?.wo ?? null : null;
      m ? n = m : t.week_mode !== "off" ? n = this.getActiveWeek(t) : n = null;
    }
    const a = this.getManualHourTimeMap(t), l = this._splanWeekLessons.map((m) => m.hour).filter((m) => Number.isFinite(m)), u = Array.from(a.keys()), c = Array.from(/* @__PURE__ */ new Set([...l, ...u])).sort((m, $) => m - $);
    if (!c.length) return null;
    const d = this.normalizeSequentialTimes(c, a), h = te(/* @__PURE__ */ new Date()), _ = (m, $, w, b, x) => {
      const C = (m ?? "").trim(), D = ($ ?? "").trim(), E = (w ?? "").trim(), A = [];
      i && D && A.push(D), r && E && A.push(E);
      let k = A.length ? `${C} (${A.join(" · ")})` : C;
      return (x?.s || x?.r || x?.t) && (k = `🔁 ${k}`), t.splan_sub_show_info && b && (k = `${k}
${b}`), k.trim();
    }, y = c.map((m) => {
      const $ = d.get(m) ?? this.getFallbackTimesFromManual(t, m) ?? {}, w = ($.start ?? "").trim(), b = ($.end ?? "").trim(), x = `${m}.`, C = w && b ? `${x} ${w}–${b}` : `${x}`, E = e.map((A, k) => {
        const R = s[k];
        if (!R) return "";
        const L = this._splanWeekLessons.filter((S) => {
          if (S.hour !== m || S.day !== R) return !1;
          const N = ft(S.week);
          return !N || !n ? !0 : N === n;
        }), g = (this._splanSubLessonsByDay.get(R) ?? []).find((S) => S.hour === m) ?? null, v = [];
        if (g && R === h)
          v.push(
            _(
              g.subject ?? L[0]?.subject ?? "",
              g.room ?? L[0]?.room ?? "",
              g.teacher ?? L[0]?.teacher ?? "",
              g.info,
              { s: !!g.changed_subject, r: !!g.changed_room, t: !!g.changed_teacher }
            )
          );
        else
          for (const S of L) v.push(_(S.subject, S.room, S.teacher));
        return Array.from(new Set(v.filter((S) => S.trim().length > 0))).join(" / ");
      }).map((A) => this.filterCellText(A, t));
      return {
        time: C,
        start: w || void 0,
        end: b || void 0,
        cells: E
      };
    }).filter((m) => {
      if (P(m)) return !0;
      const $ = m, w = this.parseHourNumberFromTimeLabel($.time), b = !!(w && a.has(w));
      return ($.cells ?? []).some((C) => !lt(C)) || b;
    });
    return y.length ? y : null;
  }
  render() {
    if (!this.config) return p``;
    const t = this.config, e = this._rowsCache, s = this.getTodayIndex(t.days ?? []), i = "1px solid var(--divider-color)", r = Jt(t.highlight_today_color ?? "", 0.12), n = Jt(t.highlight_current_color ?? "", 0.18), a = (t.highlight_current_text_color ?? "").toString().trim(), l = (t.highlight_current_time_text_color ?? "").toString().trim(), u = t.week_mode !== "off", c = u ? this.getActiveWeek(t) : null, d = this.isSplanXmlActive(t), h = (t.splan_class ?? "").trim(), _ = t.splan_week === "auto" ? "auto" : t.splan_week, f = (t.splan_plan_art ?? "class").toString();
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
    ${t.days.map((y, m) => {
      const $ = t.highlight_today && m === s ? "today" : "", w = /* @__PURE__ */ new Date();
      w.setHours(12, 0, 0, 0);
      const b = new Date(w), x = b.getDay(), C = x === 0 ? -6 : 1 - x;
      b.setDate(b.getDate() + C);
      const D = Ct(y);
      let E = "";
      if (D) {
        const A = new Date(b);
        A.setDate(b.getDate() + (D - 1));
        const k = String(A.getDate()).padStart(2, "0"), R = String(A.getMonth() + 1).padStart(2, "0");
        E = `${k}.${R}.`;
      }
      return p`
        <th class=${$} style=${`--sp-hl:${r};`}>
          <div>${y}</div>
          <div class="thDate">${E}</div>
        </th>
      `;
    })}
  </tr>
</thead>


            <tbody>
              ${e.map((y) => {
      if (P(y)) {
        const L = z(y.time), H = !!L.start && !!L.end && this.isNowBetween(L.start, L.end), g = !!t.highlight_breaks && H;
        let v = `--sp-hl:${n};`, M = "";
        return g && (v += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", M += `--sp-hl:${n}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), g && t.highlight_current_time_text && l && (v += `color:${l};`), p`
                    <tr class="break">
                      <td class="time" style=${v}>${y.time}</td>
                      <td colspan=${t.days.length} style=${M}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = y, $ = m.cells ?? [], w = m.cell_styles ?? [], b = $.map((L) => this.filterCellText(L, t)), x = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), C = s >= 0 ? $[s] ?? "" : "", D = s >= 0 ? this.filterCellText(C, t) : "", E = s >= 0 ? lt(D) : !1, k = !(!!t.free_only_column_highlight && E);
      let R = `--sp-hl:${n};`;
      return k && t.highlight_current && x && (R += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), k && x && t.highlight_current_time_text && l && (R += `color:${l};`), p`
                  <tr>
                    <td class="time" style=${R}>${m.time}</td>

                    ${t.days.map((L, H) => {
        const g = b[H] ?? "", v = w[H] ?? null, M = t.highlight_today && H === s ? "today" : "";
        let S = `--sp-hl:${r};` + Mt(v, i);
        const N = !lt(g);
        return k && N && x && t.highlight_current_text && a && s >= 0 && H === s && (S += `color:${a};`), p`<td class=${M} style=${S}><span class="cellText">${g}</span></td>`;
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
}, F.styles = se`
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
  `, F);
ht = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakMap();
_t = /* @__PURE__ */ new WeakMap();
gt = /* @__PURE__ */ new WeakMap();
at([
  ae({ attribute: !1 })
], X.prototype, "hass");
at([
  St()
], X.prototype, "config");
at([
  St()
], X.prototype, "_splanErr");
at([
  St()
], X.prototype, "_splanLoading");
at([
  St()
], X.prototype, "_rowsCache");
let ue = X;
const vt = class vt extends K {
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
    const e = ue.getStubConfig(), s = { ...e, ...t, type: (t.type ?? e.type).toString() }, i = Array.isArray(s.days) && s.days.length ? s.days.map((y) => (y ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(s.rows) ? s.rows : []).map((y) => {
      if (P(y))
        return { break: !0, time: (y.time ?? "").toString(), label: (y.label ?? "Pause").toString() };
      const m = Array.isArray(y?.cells) ? y.cells : [], $ = Array.from({ length: i.length }, (k, R) => (m[R] ?? "").toString()), w = Array.isArray(y?.cell_styles) ? y.cell_styles : [], b = Array.from({ length: i.length }, (k, R) => mt(w[R])), x = (y?.time ?? "").toString(), C = z(x), D = (y?.start ?? "").toString().trim(), E = (y?.end ?? "").toString().trim(), A = {
        time: x,
        start: D || C.start || void 0,
        end: E || C.end || void 0,
        cells: $
      };
      return b.some((k) => !!k) && (A.cell_styles = b), A;
    }), a = ((s.week_mode ?? e.week_mode) + "").toString().trim(), l = a === "kw_parity" || a === "week_map" || a === "off" ? a : "off", u = ((s.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), c = u === "a" ? "A" : u === "b" ? "B" : "auto", d = ((s.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), h = d === "teacher" ? "teacher" : d === "room" ? "room" : "class", _ = Number(s.splan_sub_days ?? e.splan_sub_days), f = Number.isFinite(_) ? Math.max(1, Math.min(14, _)) : e.splan_sub_days;
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
      week_mode: l,
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
    const s = wt(t);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${W(e)})` : `rgba(0,0,0,${W(e)})`;
  }
  parseColorToHexAlpha(t, e, s) {
    const i = (t ?? "").toString().trim();
    if (i.startsWith("#"))
      return wt(i) ? { hex: i, alpha: W(s) } : { hex: e, alpha: W(s) };
    const r = i.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const a = Math.max(0, Math.min(255, Number(r[1]))), l = Math.max(0, Math.min(255, Number(r[2]))), u = Math.max(0, Math.min(255, Number(r[3]))), c = W(Number(r[4])), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(a)}${d(l)}${d(u)}`, alpha: c };
    }
    const n = i.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (n) {
      const a = Math.max(0, Math.min(255, Number(n[1]))), l = Math.max(0, Math.min(255, Number(n[2]))), u = Math.max(0, Math.min(255, Number(n[3]))), c = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${c(a)}${c(l)}${c(u)}`, alpha: W(s) };
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
      const n = r, a = Array.from({ length: e.length }, (u, c) => (n.cells?.[c] ?? "").toString()), l = Array.from({ length: e.length }, (u, c) => mt(n.cell_styles?.[c]));
      return { ...n, cells: a, cell_styles: l };
    });
    this.emit({ ...this._config, days: e, rows: s });
    const i = {};
    Object.entries(this._ui.rowOpen).forEach(([r, n]) => {
      const a = Number(r);
      !Number.isNaN(a) && a >= 0 && a < s.length && (i[a] = n);
    }), this._ui.rowOpen = i;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, r) => {
      if (r !== t) return i;
      if (P(i)) return { ...i, time: e };
      const n = i, a = z(n.time), l = z(e), u = (n.start ?? "").toString().trim(), c = (n.end ?? "").toString().trim(), d = !u || !!a.start && u === a.start, h = !c || !!a.end && c === a.end;
      return {
        ...n,
        time: e,
        start: d ? l.start ?? n.start : n.start,
        end: h ? l.end ?? n.end : n.end
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
    const i = this._config.rows.map((r, n) => {
      if (n !== t || P(r)) return r;
      const a = r, l = Array.isArray(a.cells) ? [...a.cells] : [];
      return l[e] = s, { ...a, cells: l };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateCellStyle(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((r, n) => {
      if (n !== t || P(r)) return r;
      const a = r, l = Array.isArray(a.cell_styles) ? [...a.cell_styles] : Array.from({ length: this._config.days.length }, () => null), c = { ...l[e] ? { ...l[e] } : {}, ...s };
      return typeof c.bg_alpha == "number" && (c.bg_alpha = W(c.bg_alpha)), l[e] = mt(c), { ...a, cell_styles: l };
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
      if (P(i))
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
                  ${e.map((a, l) => {
        const u = (n.cells?.[l] ?? "").toString(), c = n.cell_styles?.[l] ?? null;
        return p`
                      <td
                        class="p-cell"
                        style=${Mt(c, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(r, l)}
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
    const a = Math.round(W(s.alpha) * 100);
    return p`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${s.hex} @input=${(l) => i(l.target.value)} />
          <div class="range">
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(a)}
              @input=${(l) => r(Number(l.target.value) / 100)}
            />
            <div class="pct">${a}%</div>
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
    const t = this._config, e = Object.keys(this.hass?.states ?? {}).filter((s) => s.startsWith("sensor.stundenplan_woche_")).sort((s, i) => s.localeCompare(i));
    return p`
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
      const r = (this.hass?.states?.[s]?.attributes?.friendly_name ?? "").toString().trim(), n = r ? `${r} (${s})` : s;
      return p`<option value=${s}>${n}</option>`;
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
      const r = P(s), n = r ? `Pause · ${s.time ?? ""}` : `Stunde · ${s.time ?? ""}`, a = r ? s.label ?? "Pause" : "", l = s;
      return p`
          <details class="rowPanel" ?open=${this._ui.rowOpen[i] ?? !1} @toggle=${(u) => this._ui.rowOpen[i] = !!u.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${n || `Zeile ${i + 1}`}</div>
                <div class="rowHeadMeta">${r ? a : `${(l.start ?? "") || "Start?"} – ${(l.end ?? "") || "Ende?"}`}</div>
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
                        <input class="in" type="text" .value=${l.start ?? ""} placeholder="z.B. 07:45" @input=${(u) => this.updateRowStart(i, u.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${l.end ?? ""} placeholder="z.B. 08:30" @input=${(u) => this.updateRowEnd(i, u.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((u, c) => {
        const d = (l.cells?.[c] ?? "").toString(), h = l.cell_styles?.[c] ?? null, _ = h?.bg && h.bg.startsWith("#") ? h.bg : "#3b82f6", f = typeof h?.bg_alpha == "number" ? W(h.bg_alpha) : 0.18, y = Math.round(f * 100), m = h?.color && h.color.startsWith("#") ? h.color : "#ffffff", $ = `sp-cell-${i}-${c}`, w = Mt(h, "1px solid var(--divider-color)");
        return p`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${u}</div>
                              <div class="cellMiniPreview" style=${w} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${$} class="in" type="text" .value=${d} placeholder="Fach" @input=${(b) => this.updateRowCell(i, c, b.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${_} @input=${(b) => this.updateCellStyle(i, c, { bg: b.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(y)} @input=${(b) => this.updateCellStyle(i, c, { bg_alpha: Number(b.target.value) / 100 })} />
                                  <div class="pct">${y}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${m} @input=${(b) => this.updateCellStyle(i, c, { color: b.target.value })} />
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
vt.properties = {
  hass: {},
  _config: { state: !0 }
}, vt.styles = se`
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
let Tt = vt;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", ue);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", Tt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + XML (Stundenplan24)",
  preview: !0
});
export {
  ue as StundenplanCard,
  Tt as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
