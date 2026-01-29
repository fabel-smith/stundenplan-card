/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, _t = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mt = Symbol(), bt = /* @__PURE__ */ new WeakMap();
let Nt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = bt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && bt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ft = (o) => new Nt(typeof o == "string" ? o : o + "", void 0, mt), zt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new Nt(e, o, mt);
}, Wt = (o, t) => {
  if (_t) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = Y.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, yt = _t ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ft(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: It, defineProperty: qt, getOwnPropertyDescriptor: Zt, getOwnPropertyNames: Kt, getOwnPropertySymbols: Vt, getPrototypeOf: Xt } = Object, M = globalThis, wt = M.trustedTypes, jt = wt ? wt.emptyScript : "", ot = M.reactiveElementPolyfillSupport, q = (o, t) => o, ht = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? jt : null;
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
} }, Ot = (o, t) => !It(o, t), $t = { attribute: !0, type: String, converter: ht, reflect: !1, useDefault: !1, hasChanged: Ot };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && qt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Zt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const c = s == null ? void 0 : s.call(this);
      r == null || r.call(this, n), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const e = this.properties, i = [...Kt(e), ...Vt(e)];
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
      for (const s of i) e.unshift(yt(s));
    } else t !== void 0 && e.push(yt(t));
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
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : ht).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, n;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const c = i.getPropertyOptions(s), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : ht;
      this._$Em = s;
      const l = a.fromAttribute(e, c.type);
      this[s] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var n;
    if (t !== void 0) {
      const c = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? Ot)(r, e) || i.useDefault && i.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), r !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: c } = n, a = this[r];
        c !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[q("elementProperties")] = /* @__PURE__ */ new Map(), L[q("finalized")] = /* @__PURE__ */ new Map(), ot == null || ot({ ReactiveElement: L }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, xt = (o) => o, tt = Z.trustedTypes, St = tt ? tt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Bt = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, Dt = "?" + T, Jt = `<${Dt}>`, O = document, K = () => O.createComment(""), V = (o) => o === null || typeof o != "object" && typeof o != "function", ft = Array.isArray, Gt = (o) => ft(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", at = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, kt = /-->/g, At = />/g, P = RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ct = /'/g, Et = /"/g, Lt = /^(?:script|style|textarea|title)$/i, Yt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), g = Yt(1), F = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), H = O.createTreeWalker(O, 129);
function Ut(o, t) {
  if (!ft(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return St !== void 0 ? St.createHTML(t) : t;
}
const Qt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = I;
  for (let c = 0; c < e; c++) {
    const a = o[c];
    let l, u, d = -1, h = 0;
    for (; h < a.length && (n.lastIndex = h, u = n.exec(a), u !== null); ) h = n.lastIndex, n === I ? u[1] === "!--" ? n = kt : u[1] !== void 0 ? n = At : u[2] !== void 0 ? (Lt.test(u[2]) && (s = RegExp("</" + u[2], "g")), n = P) : u[3] !== void 0 && (n = P) : n === P ? u[0] === ">" ? (n = s ?? I, d = -1) : u[1] === void 0 ? d = -2 : (d = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? P : u[3] === '"' ? Et : Ct) : n === Et || n === Ct ? n = P : n === kt || n === At ? n = I : (n = P, s = void 0);
    const p = n === P && o[c + 1].startsWith("/>") ? " " : "";
    r += n === I ? a + Jt : d >= 0 ? (i.push(l), a.slice(0, d) + Bt + a.slice(d) + T + p) : a + T + (d === -2 ? c : p);
  }
  return [Ut(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class X {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const c = t.length - 1, a = this.parts, [l, u] = Qt(t, e);
    if (this.el = X.createElement(l, i), H.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = H.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Bt)) {
          const h = u[n++], p = s.getAttribute(d).split(T), _ = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: r, name: _[2], strings: p, ctor: _[1] === "." ? ee : _[1] === "?" ? ie : _[1] === "@" ? se : nt }), s.removeAttribute(d);
        } else d.startsWith(T) && (a.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Lt.test(s.tagName)) {
          const d = s.textContent.split(T), h = d.length - 1;
          if (h > 0) {
            s.textContent = tt ? tt.emptyScript : "";
            for (let p = 0; p < h; p++) s.append(d[p], K()), H.nextNode(), a.push({ type: 2, index: ++r });
            s.append(d[h], K());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Dt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(T, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += T.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = O.createElement("template");
    return i.innerHTML = t, i;
  }
}
function W(o, t, e = o, i) {
  var n, c;
  if (t === F) return t;
  let s = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const r = V(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((c = s == null ? void 0 : s._$AO) == null || c.call(s, !1), r === void 0 ? s = void 0 : (s = new r(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = W(o, s._$AS(o, t.values), s, i)), t;
}
class te {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? O).importNode(e, !0);
    H.currentNode = s;
    let r = H.nextNode(), n = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let l;
        a.type === 2 ? l = new j(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new re(r, this, t)), this._$AV.push(l), a = i[++c];
      }
      n !== (a == null ? void 0 : a.index) && (r = H.nextNode(), n++);
    }
    return H.currentNode = O, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = W(this, t, e), V(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== F && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = X.createElement(Ut(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const n = new te(s, this), c = n.u(this.options);
      n.p(e), this.T(c), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Rt.get(t.strings);
    return e === void 0 && Rt.set(t.strings, e = new X(t)), e;
  }
  k(t) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new j(this.O(K()), this.O(K()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = xt(t).nextSibling;
      xt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) t = W(this, t, e, 0), n = !V(t) || t !== this._$AH && t !== F, n && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = W(this, c[i + a], e, a), l === F && (l = this._$AH[a]), n || (n = !V(l) || l !== this._$AH[a]), l === v ? t = v : t !== v && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ee extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class ie extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class se extends nt {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = W(this, t, e, 0) ?? v) === F) return;
    const i = this._$AH, s = t === v && i !== v || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== v && (i === v || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class re {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const lt = Z.litHtmlPolyfillSupport;
lt == null || lt(X, j), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.2");
const ne = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new j(t.insertBefore(K(), r), r, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
class U extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ne(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return F;
  }
}
var Ht;
U._$litElement$ = !0, U.finalized = !0, (Ht = z.litElementHydrateSupport) == null || Ht.call(z, { LitElement: U });
const ct = z.litElementPolyfillSupport;
ct == null || ct({ LitElement: U });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.2");
function x(o) {
  return !!o && o.break === !0;
}
function $(o) {
  return Math.min(1, Math.max(0, o));
}
function et(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [e, i, s].some((r) => Number.isNaN(r)) ? null : { r: e, g: i, b: s };
}
function Q(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = $(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function oe(o) {
  if (!(o != null && o.bg)) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = et(t);
  if (!e) return t;
  const i = typeof o.bg_alpha == "number" ? $(o.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${i})`;
}
function ut(o, t) {
  const e = [], i = oe(o);
  return i && e.push(`background:${i}`), o != null && o.color && e.push(`color:${o.color}`), e.push(`border:${(o == null ? void 0 : o.border) ?? t}`), e.join(";") + ";";
}
function Tt(o, t) {
  const e = (o ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const i = et(e);
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${$(t)})` : e;
  }
  return e;
}
function N(o) {
  const e = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function pt(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function ae(o) {
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
function Mt(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const i = t.getUTCFullYear(), s = new Date(Date.UTC(i, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), n = new Date(s);
  n.setUTCDate(s.getUTCDate() + (4 - r));
  const c = t.getTime() - n.getTime();
  return { isoWeek: 1 + Math.round(c / (7 * 24 * 60 * 60 * 1e3)), isoYear: i };
}
function dt(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function Pt(o) {
  const t = (o ?? "").toString().trim();
  return t ? t === "-" || t === "–" || t === "---" : !0;
}
function le(o) {
  const t = pt(o);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
async function ce(o, t) {
  const e = `${o}${o.includes("?") ? "&" : "?"}_ts=${Date.now()}`, i = await (await fetch(e, { cache: "no-store" })).text(), s = new DOMParser().parseFromString(i, "text/xml"), r = Array.from(s.querySelectorAll("Klassen > Kl")).find(
    (a) => {
      var l;
      return (((l = a.querySelector("Kurz")) == null ? void 0 : l.textContent) ?? "").trim().toLowerCase() === (t ?? "").trim().toLowerCase();
    }
  );
  if (!r) throw new Error(`Klasse "${t}" nicht gefunden`);
  const n = Array.from(r.querySelectorAll("Stunden > St")).map((a) => ({
    hour: parseInt((a.textContent ?? "0").trim(), 10),
    start: (a.getAttribute("StZeit") ?? "").trim(),
    end: (a.getAttribute("StZeitBis") ?? "").trim()
  })).filter((a) => Number.isFinite(a.hour)).sort((a, l) => a.hour - l.hour), c = Array.from(r.querySelectorAll("Pl > Std")).map((a) => {
    var l, u, d, h, p, _, m;
    return {
      sw: (((l = a.querySelector("PlSw")) == null ? void 0 : l.textContent) ?? "").trim(),
      // 01 / 02 / 0102
      day: parseInt((((u = a.querySelector("PlTg")) == null ? void 0 : u.textContent) ?? "0").trim(), 10),
      hour: parseInt((((d = a.querySelector("PlSt")) == null ? void 0 : d.textContent) ?? "0").trim(), 10),
      subject: (((h = a.querySelector("PlFa")) == null ? void 0 : h.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      teacher: (((p = a.querySelector("PlLe")) == null ? void 0 : p.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      room: (((_ = a.querySelector("PlRa")) == null ? void 0 : _.textContent) ?? "").replace(/\u00a0/g, " ").trim(),
      week: (((m = a.querySelector("PlWo")) == null ? void 0 : m.textContent) ?? "").replace(/\u00a0/g, " ").trim().toUpperCase()
      // A/B/leer
    };
  });
  return { times: n, lessons: c };
}
const st = class st extends U {
  constructor() {
    super(...arguments), this._splanData = null, this._splanErr = null, this._splanLoading = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  connectedCallback() {
    super.connectedCallback(), this.reloadSplanIfNeeded(!0), this._tick = window.setInterval(() => {
      var t;
      this.requestUpdate(), (t = this.config) != null && t.splan_xml_enabled && Date.now() % (10 * 60 * 1e3) < 3e4 && this.reloadSplanIfNeeded(!1);
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
    if (!e || !e.splan_xml_enabled) return;
    const i = (e.splan_xml_url ?? "").toString().trim(), s = (e.splan_class ?? "").toString().trim();
    if (!i || !s) {
      this._splanData = null, this._splanErr = "XML aktiv, aber URL oder Klasse fehlt.", this.requestUpdate();
      return;
    }
    if (!this._splanLoading && !(!t && this._splanData && !this._splanErr)) {
      this._splanLoading = !0, this._splanErr = null;
      try {
        const r = await ce(i, s);
        this._splanData = r, this._splanErr = null;
      } catch (r) {
        this._splanData = null, this._splanErr = r != null && r.message ? String(r.message) : String(r);
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
      week_mode: "off",
      week_a_is_even_kw: !0,
      week_map_entity: "",
      week_map_attribute: "",
      source_entity_a: "",
      source_attribute_a: "",
      source_entity_b: "",
      source_attribute_b: "",
      splan_xml_enabled: !1,
      splan_xml_url: "/local/splan/sdaten/splank.xml",
      splan_class: "5a",
      splan_week: "auto",
      splan_show_room: !0,
      splan_show_teacher: !1,
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
    const e = st.getStubConfig(), i = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
    if (!(i === "custom:stundenplan-card" || i === "stundenplan-card")) {
      this.config = this.normalizeConfig(e);
      return;
    }
    this.config = this.normalizeConfig({
      ...e,
      ...t,
      type: i
    });
  }
  getCardSize() {
    var e, i;
    const t = ((i = (e = this.config) == null ? void 0 : e.rows) == null ? void 0 : i.length) ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = Array.isArray(t.days) && t.days.length ? t.days.map((l) => (l ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], s = (Array.isArray(t.rows) ? t.rows : []).map((l) => {
      if (x(l))
        return { break: !0, time: (l.time ?? "").toString(), label: (l.label ?? "Pause").toString() };
      const u = Array.isArray(l == null ? void 0 : l.cells) ? l.cells : [], d = Array.from({ length: e.length }, (A, f) => (u[f] ?? "").toString()), h = Array.isArray(l == null ? void 0 : l.cell_styles) ? l.cell_styles : [], p = Array.from({ length: e.length }, (A, f) => Q(h[f])), _ = ((l == null ? void 0 : l.time) ?? "").toString(), m = N(_), w = ((l == null ? void 0 : l.start) ?? "").toString().trim(), S = ((l == null ? void 0 : l.end) ?? "").toString().trim(), k = {
        time: _,
        start: w || m.start || void 0,
        end: S || m.end || void 0,
        cells: d
      };
      return p.some((A) => !!A) && (k.cell_styles = p), k;
    }), r = ((t.week_mode ?? "off") + "").toString().trim(), n = r === "kw_parity" || r === "week_map" || r === "off" ? r : "off", c = ((t.splan_week ?? "auto") + "").toString().trim().toLowerCase(), a = c === "a" ? "A" : c === "b" ? "B" : "auto";
    return {
      type: (t.type ?? "custom:stundenplan-card").toString(),
      title: (t.title ?? "Mein Stundenplan").toString(),
      days: e,
      highlight_today: t.highlight_today ?? !0,
      highlight_current: t.highlight_current ?? !1,
      highlight_breaks: t.highlight_breaks ?? !1,
      free_only_column_highlight: t.free_only_column_highlight ?? !0,
      highlight_today_color: (t.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (t.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: t.highlight_current_text ?? !1,
      highlight_current_text_color: (t.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: t.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (t.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (t.source_entity ?? "").toString(),
      source_attribute: (t.source_attribute ?? "").toString(),
      source_time_key: (t.source_time_key ?? "Stunde").toString(),
      week_mode: n,
      week_a_is_even_kw: t.week_a_is_even_kw ?? !0,
      week_map_entity: (t.week_map_entity ?? "").toString(),
      week_map_attribute: (t.week_map_attribute ?? "").toString(),
      source_entity_a: (t.source_entity_a ?? "").toString(),
      source_attribute_a: (t.source_attribute_a ?? "").toString(),
      source_entity_b: (t.source_entity_b ?? "").toString(),
      source_attribute_b: (t.source_attribute_b ?? "").toString(),
      splan_xml_enabled: t.splan_xml_enabled ?? !1,
      splan_xml_url: (t.splan_xml_url ?? "/local/splan/sdaten/splank.xml").toString(),
      splan_class: (t.splan_class ?? "5a").toString(),
      splan_week: a,
      splan_show_room: t.splan_show_room ?? !0,
      splan_show_teacher: t.splan_show_teacher ?? !1,
      rows: s
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), i = new Set(ae(e).map(pt));
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
    const r = /* @__PURE__ */ new Date(), n = r.getHours() * 60 + r.getMinutes();
    return n >= i && n < s;
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
    var c, a, l;
    const i = (t ?? "").toString().trim();
    if (!i || !((a = (c = this.hass) == null ? void 0 : c.states) != null && a[i])) return null;
    const s = this.hass.states[i], r = (e ?? "").toString().trim(), n = r ? (l = s.attributes) == null ? void 0 : l[r] : s.state;
    return this.parseAnyJson(n);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], s = (t.source_time_key ?? "Stunde").toString(), r = e.map((n) => {
      if ((n == null ? void 0 : n.break) === !0)
        return { break: !0, time: (n.time ?? n[s] ?? "").toString(), label: (n.label ?? "Pause").toString() };
      const c = ((n == null ? void 0 : n.time) ?? (n == null ? void 0 : n[s]) ?? "").toString(), a = N(c), l = Array.from({ length: i.length }, (d, h) => {
        const p = (i[h] ?? "").toString();
        return ((n == null ? void 0 : n[p]) ?? "").toString();
      });
      return { time: c, start: a.start, end: a.end, cells: l };
    });
    return r.length ? r : null;
  }
  getRowsFromEntity(t, e, i) {
    const s = this.readEntityJson(e, i);
    return Array.isArray(s) ? this.buildRowsFromArray(t, s) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = Mt(/* @__PURE__ */ new Date()), i = e % 2 === 0, s = !!t.week_a_is_even_kw;
    return i === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), s = this.readEntityJson(e, i);
    if (!s || typeof s != "object") return null;
    const { isoWeek: r, isoYear: n } = Mt(/* @__PURE__ */ new Date()), c = String(r), a = String(n);
    if (s != null && s[a] && typeof s[a] == "object") {
      const u = dt(s[a][c]);
      if (u) return u;
    }
    const l = dt(s == null ? void 0 : s[c]);
    return l || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    const e = this.getRowsFromSplanXml(t);
    if (e) return e;
    if (t.week_mode !== "off") {
      const s = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), n = (t.source_entity_b ?? "").trim(), c = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (s === "A" && r) {
        const u = this.getRowsFromEntity(t, r, c);
        if (u) return u;
      }
      if (s === "B" && n) {
        const u = this.getRowsFromEntity(t, n, a);
        if (u) return u;
      }
      const l = (t.source_entity ?? "").trim();
      if (l) {
        const u = this.getRowsFromEntity(t, l, (t.source_attribute ?? "").trim());
        if (u) return u;
      }
      return t.rows ?? [];
    }
    const i = (t.source_entity ?? "").toString().trim();
    return i ? this.getRowsFromEntity(t, i, (t.source_attribute ?? "").toString().trim()) ?? t.rows ?? [] : t.rows ?? [];
  }
  /**
   * ✅ Fix für “aktuelle Stunde wird nicht erkannt” wenn XML-Stundenzeiten fehlen:
   * - wir nehmen Zeiten aus manuellen cfg.rows (wenn vorhanden)
   * - damit funktionieren isNowBetween() + Highlight auch bei Lücken im XML
   */
  getFallbackTimesFromManual(t, e) {
    const i = t.rows ?? [];
    for (const s of i) {
      if (x(s)) continue;
      const r = s, n = (r.time ?? "").match(/^\s*(\d+)\s*\./);
      if (!n || parseInt(n[1], 10) !== e) continue;
      const a = N(r.time), l = (r.start ?? "").toString().trim() || a.start, u = (r.end ?? "").toString().trim() || a.end;
      return { start: l || void 0, end: u || void 0 };
    }
    return {};
  }
  getRowsFromSplanXml(t) {
    if (!t.splan_xml_enabled || !this._splanData) return null;
    const e = t.days ?? [], i = e.map((h) => le(h)), s = !!t.splan_show_room, r = !!t.splan_show_teacher;
    let n = null;
    t.splan_week === "A" ? n = "A" : t.splan_week === "B" ? n = "B" : t.week_mode !== "off" ? n = this.getActiveWeek(t) : n = null;
    const c = (this._splanData.times ?? []).slice().sort((h, p) => h.hour - p.hour), a = Array.from(
      new Set((this._splanData.lessons ?? []).map((h) => h.hour).filter((h) => Number.isFinite(h)))
    ).sort((h, p) => h - p), l = (c.length ? c.map((h) => h.hour) : a).filter((h) => Number.isFinite(h));
    if (!l.length) return null;
    const d = l.map((h) => {
      const p = c.find((f) => f.hour === h);
      let _ = ((p == null ? void 0 : p.start) ?? "").trim(), m = ((p == null ? void 0 : p.end) ?? "").trim();
      if (!_ || !m) {
        const f = this.getFallbackTimesFromManual(t, h);
        _ = _ || (f.start ?? ""), m = m || (f.end ?? "");
      }
      const w = `${h}.`, S = _ && m ? `${w} ${_}–${m}` : `${w}`, k = e.map((f, b) => {
        const E = i[b];
        if (!E) return "";
        const C = (this._splanData.lessons ?? []).filter((y) => {
          if (y.hour !== h || y.day !== E) return !1;
          const R = dt(y.week);
          return !R || !n ? !0 : R === n;
        });
        if (!C.length) return "";
        const B = C.map((y) => {
          const R = (y.subject ?? "").trim(), J = (y.room ?? "").trim(), vt = (y.teacher ?? "").trim(), G = [];
          return s && J && G.push(J), r && vt && G.push(vt), G.length ? `${R} (${G.join(" · ")})` : R;
        });
        return Array.from(new Set(B.filter((y) => y.trim().length > 0))).join(" / ");
      });
      return {
        time: S,
        start: _ || void 0,
        end: m || void 0,
        cells: k
      };
    }).filter((h) => x(h) ? !0 : (h.cells ?? []).some((m) => !Pt(m)));
    return d.length ? d : null;
  }
  render() {
    if (!this.config) return g``;
    const t = this.config, e = this.getRowsResolved(t), i = this.getTodayIndex(t.days ?? []), s = "1px solid var(--divider-color)", r = Tt(t.highlight_today_color ?? "", 0.12), n = Tt(t.highlight_current_color ?? "", 0.18), c = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), l = t.week_mode !== "off", u = l ? this.getActiveWeek(t) : null, d = t.splan_xml_enabled;
    return g`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${l ? g`<div class="weekBadge">Woche: <b>${u}</b></div>` : g``}

          ${d ? g`
                <div class="xmlBadge">
                  <div class="xmlLine">
                    <b>XML</b>
                    <span class="mono">${t.splan_class}</span>
                    <span class="mono">${t.splan_week === "auto" ? "auto" : t.splan_week}</span>
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
                ${t.days.map((h, p) => {
      const _ = t.highlight_today && p === i ? "today" : "";
      return g`<th class=${_} style=${`--sp-hl:${r};`}>${h}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((h) => {
      if (x(h)) {
        const E = N(h.time), C = !!E.start && !!E.end && this.isNowBetween(E.start, E.end), B = !!t.highlight_current && !!t.highlight_breaks && C;
        let D = `--sp-hl:${n};`, y = "";
        return B && (D += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", y += `--sp-hl:${n}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), C && t.highlight_current_time_text && a && (D += `color:${a};`), g`
                    <tr class="break">
                      <td class="time" style=${D}>${h.time}</td>
                      <td colspan=${t.days.length} style=${y}>${h.label ?? ""}</td>
                    </tr>
                  `;
      }
      const p = h, _ = p.cells ?? [], m = p.cell_styles ?? [], w = !!p.start && !!p.end && this.isNowBetween(p.start, p.end), S = i >= 0 ? _[i] ?? "" : "", k = i >= 0 ? Pt(S) : !1, f = !(!!t.free_only_column_highlight && k);
      let b = `--sp-hl:${n};`;
      return f && t.highlight_current && w && (b += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), f && w && t.highlight_current_time_text && a && (b += `color:${a};`), g`
                  <tr>
                    <td class="time" style=${b}>${p.time}</td>

                    ${t.days.map((E, C) => {
        const B = _[C] ?? "", D = m[C] ?? null, y = t.highlight_today && C === i ? "today" : "";
        let R = `--sp-hl:${r};` + ut(D, s);
        const J = (B ?? "").toString().trim().length > 0;
        return f && J && w && t.highlight_current_text && c && i >= 0 && C === i && (R += `color:${c};`), g`<td class=${y} style=${R}>${B}</td>`;
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
st.styles = zt`
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
  `;
let it = st;
const rt = class rt extends U {
  constructor() {
    super(...arguments), this._ui = {
      openGeneral: !1,
      openHighlight: !1,
      openColors: !1,
      openSources: !1,
      openRows: !1,
      showCellStyles: !0,
      rowOpen: {}
      // default: empty => all closed
    };
  }
  setConfig(t) {
    const e = (((t == null ? void 0 : t.type) ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    const i = !!this._config;
    this._config = this.normalizeConfig(this.clone(t)), i || (this._ui.rowOpen = {});
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
    return i ? `rgba(${i.r}, ${i.g}, ${i.b}, ${$(e)})` : `rgba(0,0,0,${$(e)})`;
  }
  parseColorToHexAlpha(t, e, i) {
    const s = (t ?? "").toString().trim();
    if (s.startsWith("#"))
      return et(s) ? { hex: s, alpha: $(i) } : { hex: e, alpha: $(i) };
    const r = s.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (r) {
      const c = Math.max(0, Math.min(255, Number(r[1]))), a = Math.max(0, Math.min(255, Number(r[2]))), l = Math.max(0, Math.min(255, Number(r[3]))), u = $(Number(r[4])), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(c)}${d(a)}${d(l)}`, alpha: u };
    }
    const n = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (n) {
      const c = Math.max(0, Math.min(255, Number(n[1]))), a = Math.max(0, Math.min(255, Number(n[2]))), l = Math.max(0, Math.min(255, Number(n[3]))), u = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${u(c)}${u(a)}${u(l)}`, alpha: $(i) };
    }
    return { hex: e, alpha: $(i) };
  }
  setHighlightRgba(t, e, i) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, i) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  normalizeConfig(t) {
    const i = { ...it.getStubConfig(), ...t }, s = Array.isArray(i.days) && i.days.length ? i.days.map((d) => (d ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(i.rows) ? i.rows : []).map((d) => {
      if (x(d)) return { break: !0, time: (d.time ?? "").toString(), label: (d.label ?? "Pause").toString() };
      const h = Array.isArray(d == null ? void 0 : d.cells) ? d.cells : [], p = Array.from({ length: s.length }, (f, b) => (h[b] ?? "").toString()), _ = Array.isArray(d == null ? void 0 : d.cell_styles) ? d.cell_styles : [], m = Array.from({ length: s.length }, (f, b) => Q(_[b])), w = ((d == null ? void 0 : d.time) ?? "").toString(), S = N(w), k = ((d == null ? void 0 : d.start) ?? "").toString().trim(), A = ((d == null ? void 0 : d.end) ?? "").toString().trim();
      return {
        time: w,
        start: k || S.start || void 0,
        end: A || S.end || void 0,
        cells: p,
        cell_styles: m
      };
    }), c = ((i.week_mode ?? "off") + "").toString().trim(), a = c === "kw_parity" || c === "week_map" || c === "off" ? c : "off", l = ((i.splan_week ?? "auto") + "").toString().trim().toLowerCase(), u = l === "a" ? "A" : l === "b" ? "B" : "auto";
    return {
      type: (i.type ?? "custom:stundenplan-card").toString(),
      title: (i.title ?? "Mein Stundenplan").toString(),
      days: s,
      highlight_today: i.highlight_today ?? !0,
      highlight_current: i.highlight_current ?? !1,
      highlight_breaks: i.highlight_breaks ?? !1,
      free_only_column_highlight: i.free_only_column_highlight ?? !0,
      highlight_today_color: (i.highlight_today_color ?? "rgba(0, 150, 255, 0.12)").toString(),
      highlight_current_color: (i.highlight_current_color ?? "rgba(76, 175, 80, 0.18)").toString(),
      highlight_current_text: i.highlight_current_text ?? !1,
      highlight_current_text_color: (i.highlight_current_text_color ?? "#ff1744").toString(),
      highlight_current_time_text: i.highlight_current_time_text ?? !1,
      highlight_current_time_text_color: (i.highlight_current_time_text_color ?? "#ff9100").toString(),
      source_entity: (i.source_entity ?? "").toString(),
      source_attribute: (i.source_attribute ?? "").toString(),
      source_time_key: (i.source_time_key ?? "Stunde").toString(),
      week_mode: a,
      week_a_is_even_kw: i.week_a_is_even_kw ?? !0,
      week_map_entity: (i.week_map_entity ?? "").toString(),
      week_map_attribute: (i.week_map_attribute ?? "").toString(),
      source_entity_a: (i.source_entity_a ?? "").toString(),
      source_attribute_a: (i.source_attribute_a ?? "").toString(),
      source_entity_b: (i.source_entity_b ?? "").toString(),
      source_attribute_b: (i.source_attribute_b ?? "").toString(),
      splan_xml_enabled: i.splan_xml_enabled ?? !1,
      splan_xml_url: (i.splan_xml_url ?? "/local/splan/sdaten/splank.xml").toString(),
      splan_class: (i.splan_class ?? "5a").toString(),
      splan_week: u,
      splan_show_room: i.splan_show_room ?? !0,
      splan_show_teacher: i.splan_show_teacher ?? !1,
      rows: n
    };
  }
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((r) => r.trim()).filter((r) => r.length), i = (this._config.rows ?? []).map((r) => {
      if (x(r)) return r;
      const n = r, c = Array.from({ length: e.length }, (l, u) => {
        var d;
        return (((d = n.cells) == null ? void 0 : d[u]) ?? "").toString();
      }), a = Array.from({ length: e.length }, (l, u) => {
        var d;
        return Q((d = n.cell_styles) == null ? void 0 : d[u]);
      });
      return { ...n, cells: c, cell_styles: a };
    });
    this.emit({ ...this._config, days: e, rows: i });
    const s = {};
    Object.entries(this._ui.rowOpen).forEach(([r, n]) => {
      const c = Number(r);
      !Number.isNaN(c) && c >= 0 && c < i.length && (s[c] = n);
    }), this._ui.rowOpen = s;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => {
      if (r !== t) return s;
      if (x(s)) return { ...s, time: e };
      const n = s, c = N(n.time), a = N(e), l = (n.start ?? "").toString().trim(), u = (n.end ?? "").toString().trim(), d = !l || !!c.start && l === c.start, h = !u || !!c.end && u === c.end;
      return {
        ...n,
        time: e,
        start: d ? a.start ?? n.start : n.start,
        end: h ? a.end ?? n.end : n.end
      };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || x(s) ? s : { ...s, start: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const i = this._config.rows.map((s, r) => r !== t || x(s) ? s : { ...s, end: e || void 0 });
    this.emit({ ...this._config, rows: i });
  }
  updateRowCell(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, n) => {
      if (n !== t || x(r)) return r;
      const c = r, a = Array.isArray(c.cells) ? [...c.cells] : [];
      return a[e] = i, { ...c, cells: a };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateCellStyle(t, e, i) {
    if (!this._config) return;
    const s = this._config.rows.map((r, n) => {
      if (n !== t || x(r)) return r;
      const c = r, a = Array.isArray(c.cell_styles) ? [...c.cell_styles] : Array.from({ length: this._config.days.length }, () => null), u = { ...a[e] ? { ...a[e] } : {}, ...i };
      return typeof u.bg_alpha == "number" && (u.bg_alpha = $(u.bg_alpha)), a[e] = Q(u), { ...c, cell_styles: a };
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
    var r, n;
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((c) => requestAnimationFrame(() => c(null))), await new Promise((c) => requestAnimationFrame(() => c(null)));
    const i = `sp-cell-${t}-${e}`, s = (r = this.renderRoot) == null ? void 0 : r.getElementById(i);
    s && (s.scrollIntoView({ behavior: "smooth", block: "center" }), (n = s.focus) == null || n.call(s));
  }
  uiSwitch(t, e) {
    return g`
      <label class="switch">
        <input type="checkbox" .checked=${t} @change=${(i) => e(!!i.target.checked)} />
        <span class="slider" aria-hidden="true"></span>
      </label>
    `;
  }
  panel(t, e, i, s) {
    return g`
      <details class="panel" ?open=${e} @toggle=${(r) => i(!!r.target.open)}>
        <summary>
          <div class="panelTitle">${t}</div>
        </summary>
        <div class="panelBody">${s}</div>
      </details>
    `;
  }
  renderEditorPreview() {
    if (!this._config) return g``;
    const t = "1px solid var(--divider-color)", e = this._config.days ?? [], i = this._config.rows ?? [];
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
              ${e.map((s) => g`<th>${s}</th>`)}
            </tr>
          </thead>

          <tbody>
            ${i.map((s, r) => {
      if (x(s))
        return g`
                  <tr class="p-break">
                    <td class="p-time">${s.time}</td>
                    <td colspan=${e.length}>${s.label ?? ""}</td>
                  </tr>
                `;
      const n = s;
      return g`
                <tr>
                  <td class="p-time">${n.time}</td>
                  ${e.map((c, a) => {
        var d, h;
        const l = (((d = n.cells) == null ? void 0 : d[a]) ?? "").toString(), u = ((h = n.cell_styles) == null ? void 0 : h[a]) ?? null;
        return g`
                      <td
                        class="p-cell"
                        style=${ut(u, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(r, a)}
                      >
                        ${l}
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
          <input class="in" type="text" .value=${this._config.title ?? ""} @input=${(t) => this.emit({ ...this._config, title: t.target.value })} />
        </div>

        <div class="field">
          <label class="lbl">Tage (Komma getrennt)</label>
          <input class="in" type="text" .value=${(this._config.days ?? []).join(", ")} @input=${(t) => this.setDaysFromString(t.target.value)} />
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
            <div class="sub">Unterdrückt „Aktuell“-Highlights, wenn die heutige Zelle in der aktuellen Stunde leer ist, oder "-" bzw. "---" eingetragen wird.</div>
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
  colorRow(t, e, i, s, r, n) {
    const c = Math.round($(i.alpha) * 100);
    return g`
      <div class="colorRow">
        <div>
          <div class="optTitle">${t}</div>
          <div class="sub">${e}</div>
        </div>

        <div class="colorControls">
          <input class="col" type="color" .value=${i.hex} @input=${(a) => s(a.target.value)} />
          <div class="range">
            <input type="range" min="0" max="100" .value=${String(c)} @input=${(a) => r(Number(a.target.value) / 100)} />
            <div class="pct">${c}%</div>
          </div>
        </div>

        <div class="mono">${n}</div>
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

        <div class="sub">
          Tipp: Du kannst auch <span class="mono">rgb()/rgba()</span> oder <span class="mono">var(--...)</span> Werte direkt in YAML setzen – der Editor hält es kompatibel.
        </div>
      </div>
    `;
  }
  renderSources() {
    if (!this._config) return g``;
    const t = this._config;
    return g`
      <div class="stack">
        <div class="sub">
          Datenquelle: XML (Stundenplan24) hat Priorität wenn aktiv. Sonst Entity (JSON) oder manueller Plan.
        </div>

        <div class="panelMinor">
          <div class="minorTitle">✅ Stundenplan24 XML</div>

          <div class="optRow">
            <div>
              <div class="optTitle">XML aktivieren</div>
              <div class="sub">Lädt und rendert den Plan automatisch aus deiner XML.</div>
            </div>
            ${this.uiSwitch(!!t.splan_xml_enabled, (e) => this.emit({ ...t, splan_xml_enabled: e }))}
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">XML URL</label>
              <input
                class="in"
                type="text"
                .value=${t.splan_xml_url ?? ""}
                placeholder="/local/splan/sdaten/splank.xml"
                @input=${(e) => this.emit({ ...t, splan_xml_url: e.target.value })}
              />
              <div class="sub">Wichtig: in HA immer <span class="mono">/local/...</span></div>
            </div>

            <div class="field">
              <label class="lbl">Klasse (Kurz)</label>
              <input class="in" type="text" .value=${t.splan_class ?? ""} placeholder="z.B. 5a" @input=${(e) => this.emit({ ...t, splan_class: e.target.value })} />
            </div>
          </div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">Woche (XML)</label>
              <select class="in" .value=${t.splan_week ?? "auto"} @change=${(e) => this.emit({ ...t, splan_week: e.target.value })}>
                <option value="auto">auto (nutzt week_mode, sonst alle)</option>
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

          <div class="sub">
            Mapping-Format: <span class="mono">{"2026":{"1":"A","2":"B"}}</span> oder <span class="mono">{"1":"A","2":"B"}</span>
          </div>

          <div class="divider"></div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity_a</label>
              <input class="in" type="text" .value=${t.source_entity_a ?? ""} placeholder="z.B. sensor.stundenplan_a" @input=${(e) => this.emit({ ...t, source_entity_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_a</label>
              <input class="in" type="text" .value=${t.source_attribute_a ?? ""} placeholder="z.B. plan" @input=${(e) => this.emit({ ...t, source_attribute_a: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_entity_b</label>
              <input class="in" type="text" .value=${t.source_entity_b ?? ""} placeholder="z.B. sensor.stundenplan_b" @input=${(e) => this.emit({ ...t, source_entity_b: e.target.value })} />
            </div>
            <div class="field">
              <label class="lbl">source_attribute_b</label>
              <input class="in" type="text" .value=${t.source_attribute_b ?? ""} placeholder="z.B. plan" @input=${(e) => this.emit({ ...t, source_attribute_b: e.target.value })} />
            </div>
          </div>
        </div>

        <div class="panelMinor">
          <div class="minorTitle">Single-Source (Legacy / einfach)</div>

          <div class="grid2">
            <div class="field">
              <label class="lbl">source_entity</label>
              <input class="in" type="text" .value=${t.source_entity ?? ""} placeholder="z.B. sensor.stundenplan" @input=${(e) => this.emit({ ...t, source_entity: e.target.value })} />
            </div>

            <div class="field">
              <label class="lbl">source_attribute</label>
              <input class="in" type="text" .value=${t.source_attribute ?? ""} placeholder="z.B. plan (leer = state)" @input=${(e) => this.emit({ ...t, source_attribute: e.target.value })} />
            </div>
          </div>

          <div class="field">
            <label class="lbl">source_time_key</label>
            <input class="in" type="text" .value=${t.source_time_key ?? "Stunde"} placeholder='Default: "Stunde"' @input=${(e) => this.emit({ ...t, source_time_key: e.target.value })} />
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
            ${this.uiSwitch(!!this._ui.showCellStyles, (i) => {
      this._ui.showCellStyles = i, this.requestUpdate();
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

      ${t.rows.map((i, s) => {
      const r = x(i), n = r ? `Pause · ${i.time ?? ""}` : `Stunde · ${i.time ?? ""}`, c = r ? i.label ?? "Pause" : "", a = i;
      return g`
          <details class="rowPanel" ?open=${this._ui.rowOpen[s] ?? !1} @toggle=${(l) => this._ui.rowOpen[s] = !!l.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${n || `Zeile ${s + 1}`}</div>
                <div class="rowHeadMeta">${r ? c : `${(a.start ?? "") || "Start?"} – ${(a.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${i.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(l) => this.updateRowTime(s, l.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(r, (l) => this.toggleBreak(s, l))}
                  </div>
                </div>
              </div>

              ${r ? g`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${i.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(l) => this.updateBreakLabel(s, l.target.value)} />
                    </div>
                  ` : g`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${a.start ?? ""} placeholder="z.B. 07:45" @input=${(l) => this.updateRowStart(s, l.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${a.end ?? ""} placeholder="z.B. 08:30" @input=${(l) => this.updateRowEnd(s, l.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((l, u) => {
        var A, f;
        const d = (((A = a.cells) == null ? void 0 : A[u]) ?? "").toString(), h = ((f = a.cell_styles) == null ? void 0 : f[u]) ?? null, p = h != null && h.bg && h.bg.startsWith("#") ? h.bg : "#3b82f6", _ = typeof (h == null ? void 0 : h.bg_alpha) == "number" ? $(h.bg_alpha) : 0.18, m = Math.round(_ * 100), w = h != null && h.color && h.color.startsWith("#") ? h.color : "#ffffff", S = `sp-cell-${s}-${u}`, k = ut(h, "1px solid var(--divider-color)");
        return g`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${l}</div>
                              <div class="cellMiniPreview" style=${k} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${S} class="in" type="text" .value=${d} placeholder="Fach" @input=${(b) => this.updateRowCell(s, u, b.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${p} @input=${(b) => this.updateCellStyle(s, u, { bg: b.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(m)} @input=${(b) => this.updateCellStyle(s, u, { bg_alpha: Number(b.target.value) / 100 })} />
                                  <div class="pct">${m}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${w} @input=${(b) => this.updateCellStyle(s, u, { color: b.target.value })} />
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
    return this._config ? g`
      ${this.renderEditorPreview()}
      ${this.panel("Allgemein", this._ui.openGeneral, (t) => this._ui.openGeneral = t, this.renderGeneral())}
      ${this.panel("Highlights", this._ui.openHighlight, (t) => this._ui.openHighlight = t, this.renderHighlighting())}
      ${this.panel("Farben", this._ui.openColors, (t) => this._ui.openColors = t, this.renderColors())}
      ${this.panel("Datenquellen", this._ui.openSources, (t) => this._ui.openSources = t, this.renderSources())}
      ${this.panel("Zeilen & Fächer", this._ui.openRows, (t) => this._ui.openRows = t, this.renderRows())}
    ` : g``;
  }
};
rt.properties = {
  hass: {},
  _config: { state: !0 }
}, rt.styles = zt`
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
let gt = rt;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", it);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", gt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + XML (Stundenplan24)",
  preview: !0
});
export {
  it as StundenplanCard,
  gt as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
