/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, wt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Ct = /* @__PURE__ */ new WeakMap();
let Kt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (wt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gt = (o) => new Kt(typeof o == "string" ? o : o + "", void 0, $t), Zt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new Kt(e, o, $t);
}, Qt = (o, t) => {
  if (wt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = st.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, Mt = wt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Gt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: te, defineProperty: ee, getOwnPropertyDescriptor: se, getOwnPropertyNames: ie, getOwnPropertySymbols: ne, getPrototypeOf: re } = Object, H = globalThis, Tt = H.trustedTypes, oe = Tt ? Tt.emptyScript : "", dt = H.reactiveElementPolyfillSupport, V = (o, t) => o, bt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? oe : null;
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
} }, Xt = (o, t) => !te(o, t), Et = { attribute: !0, type: String, converter: bt, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ee(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = se(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties"))) return;
    const t = re(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const e = this.properties, s = [...ie(e), ...ne(e)];
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
      for (const i of s) e.unshift(Mt(i));
    } else t !== void 0 && e.push(Mt(t));
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Qt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : bt).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : bt;
      this._$Em = i;
      const c = a.fromAttribute(e, l.type);
      this[i] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var r;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? Xt)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: l } = r, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[V("elementProperties")] = /* @__PURE__ */ new Map(), F[V("finalized")] = /* @__PURE__ */ new Map(), dt == null || dt({ ReactiveElement: F }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Rt = (o) => o, rt = j.trustedTypes, Pt = rt ? rt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Vt = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, jt = "?" + L, ae = `<${jt}>`, W = document, J = () => W.createComment(""), G = (o) => o === null || typeof o != "object" && typeof o != "function", xt = Array.isArray, le = (o) => xt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", ht = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, Lt = />/g, z = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Dt = /'/g, Ht = /"/g, Yt = /^(?:script|style|textarea|title)$/i, ce = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), g = ce(1), I = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), B = W.createTreeWalker(W, 129);
function Jt(o, t) {
  if (!xt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const ue = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Z;
  for (let l = 0; l < e; l++) {
    const a = o[l];
    let c, u, d = -1, h = 0;
    for (; h < a.length && (r.lastIndex = h, u = r.exec(a), u !== null); ) h = r.lastIndex, r === Z ? u[1] === "!--" ? r = Nt : u[1] !== void 0 ? r = Lt : u[2] !== void 0 ? (Yt.test(u[2]) && (i = RegExp("</" + u[2], "g")), r = z) : u[3] !== void 0 && (r = z) : r === z ? u[0] === ">" ? (r = i ?? Z, d = -1) : u[1] === void 0 ? d = -2 : (d = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? z : u[3] === '"' ? Ht : Dt) : r === Ht || r === Dt ? r = z : r === Nt || r === Lt ? r = Z : (r = z, i = void 0);
    const b = r === z && o[l + 1].startsWith("/>") ? " " : "";
    n += r === Z ? a + ae : d >= 0 ? (s.push(c), a.slice(0, d) + Vt + a.slice(d) + L + b) : a + L + (d === -2 ? l : b);
  }
  return [Jt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Q {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, u] = ue(t, e);
    if (this.el = Q.createElement(c, s), B.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = B.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Vt)) {
          const h = u[r++], b = i.getAttribute(d).split(L), p = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: n, name: p[2], strings: b, ctor: p[1] === "." ? he : p[1] === "?" ? pe : p[1] === "@" ? _e : ct }), i.removeAttribute(d);
        } else d.startsWith(L) && (a.push({ type: 6, index: n }), i.removeAttribute(d));
        if (Yt.test(i.tagName)) {
          const d = i.textContent.split(L), h = d.length - 1;
          if (h > 0) {
            i.textContent = rt ? rt.emptyScript : "";
            for (let b = 0; b < h; b++) i.append(d[b], J()), B.nextNode(), a.push({ type: 2, index: ++n });
            i.append(d[h], J());
          }
        }
      } else if (i.nodeType === 8) if (i.data === jt) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(L, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += L.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = W.createElement("template");
    return s.innerHTML = t, s;
  }
}
function q(o, t, e = o, s) {
  var r, l;
  if (t === I) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = G(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = q(o, i._$AS(o, t.values), i, s)), t;
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? W).importNode(e, !0);
    B.currentNode = i;
    let n = B.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new tt(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new ge(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = B.nextNode(), r++);
    }
    return B.currentNode = W, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class tt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = q(this, t, e), G(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : le(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && G(this._$AH) ? this._$AA.nextSibling.data = t : this.T(W.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Q.createElement(Jt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new de(i, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = zt.get(t.strings);
    return e === void 0 && zt.set(t.strings, e = new Q(t)), e;
  }
  k(t) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new tt(this.O(J()), this.O(J()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Rt(t).nextSibling;
      Rt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ct {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = k;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = q(this, t, e, 0), r = !G(t) || t !== this._$AH && t !== I, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = q(this, l[s + a], e, a), c === I && (c = this._$AH[a]), r || (r = !G(c) || c !== this._$AH[a]), c === k ? t = k : t !== k && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class he extends ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class pe extends ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class _e extends ct {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = q(this, t, e, 0) ?? k) === I) return;
    const s = this._$AH, i = t === k && s !== k || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== k && (s === k || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ge {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    q(this, t);
  }
}
const pt = j.litHtmlPolyfillSupport;
pt == null || pt(Q, tt), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.3.2");
const me = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new tt(t.insertBefore(J(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class U extends F {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = me(e, this.renderRoot, this.renderOptions);
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
    return I;
  }
}
var qt;
U._$litElement$ = !0, U.finalized = !0, (qt = O.litElementHydrateSupport) == null || qt.call(O, { LitElement: U });
const _t = O.litElementPolyfillSupport;
_t == null || _t({ LitElement: U });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.2");
function T(o) {
  return !!o && o.break === !0;
}
function E(o) {
  return Math.min(1, Math.max(0, o));
}
function ot(o) {
  if (!o) return null;
  const t = o.replace("#", "").trim();
  if (t.length !== 6) return null;
  const e = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), i = parseInt(t.slice(4, 6), 16);
  return [e, s, i].some((n) => Number.isNaN(n)) ? null : { r: e, g: s, b: i };
}
function it(o) {
  if (!o || typeof o != "object") return null;
  const t = {};
  return typeof o.bg == "string" && o.bg.trim() && (t.bg = o.bg.trim()), typeof o.color == "string" && o.color.trim() && (t.color = o.color.trim()), typeof o.border == "string" && o.border.trim() && (t.border = o.border.trim()), typeof o.bg_alpha == "number" && !Number.isNaN(o.bg_alpha) && (t.bg_alpha = E(o.bg_alpha)), Object.keys(t).length ? t : null;
}
function be(o) {
  if (!(o != null && o.bg)) return null;
  const t = o.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const e = ot(t);
  if (!e) return t;
  const s = typeof o.bg_alpha == "number" ? E(o.bg_alpha) : 0.18;
  return `rgba(${e.r}, ${e.g}, ${e.b}, ${s})`;
}
function ft(o, t) {
  const e = [], s = be(o);
  return s && e.push(`background:${s}`), o != null && o.color && e.push(`color:${o.color}`), e.push(`border:${(o == null ? void 0 : o.border) ?? t}`), e.join(";") + ";";
}
function Bt(o, t) {
  const e = (o ?? "").toString().trim();
  if (!e) return `rgba(0,0,0,${t})`;
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  if (e.startsWith("#")) {
    const s = ot(e);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${E(t)})` : e;
  }
  return e;
}
function D(o) {
  const e = (o ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function vt(o) {
  return (o ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function fe(o) {
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
function Ot(o) {
  const t = new Date(Date.UTC(o.getFullYear(), o.getMonth(), o.getDate())), e = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - e);
  const s = t.getUTCFullYear(), i = new Date(Date.UTC(s, 0, 1)), n = i.getUTCDay() === 0 ? 7 : i.getUTCDay(), r = new Date(i);
  r.setUTCDate(i.getUTCDate() + (4 - n));
  const l = t.getTime() - r.getTime();
  return { isoWeek: 1 + Math.round(l / (7 * 24 * 60 * 60 * 1e3)), isoYear: s };
}
function nt(o) {
  const t = (o ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function gt(o) {
  const t = (o ?? "").toString().trim();
  return t ? t === "-" || t === "–" || t === "---" : !0;
}
function ve(o) {
  const t = vt(o);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday", "sonntag"].includes(t) ? 7 : null;
}
function Wt(o) {
  const t = (o ?? "").trim(), e = t.match(/^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/) || t.match(/^\s*(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\s*$/);
  if (!e) return null;
  const s = Number(e[1]), i = Number(e[2]), n = Number(e[3]);
  return [s, i, n].some((r) => Number.isNaN(r)) ? null : new Date(n, i - 1, s, 12, 0, 0);
}
function ye(o) {
  const t = o.getFullYear(), e = String(o.getMonth() + 1).padStart(2, "0"), s = String(o.getDate()).padStart(2, "0");
  return `${t}${e}${s}`;
}
function we(o) {
  const t = (o ?? "").toString().trim();
  if (t.split("?")[0].toLowerCase().endsWith(".xml")) {
    const r = t.replace(/\/[^/]*$/u, "");
    return { basisUrl: t, baseDir: r };
  }
  const i = t.replace(/\/+$/u, "");
  return { basisUrl: `${i}/SPlanKl_Basis.xml`, baseDir: i };
}
async function mt(o) {
  const t = `${o}${o.includes("?") ? "&" : "?"}_ts=${Date.now()}`, e = await fetch(t, { cache: "no-store" });
  if (!e.ok) throw new Error(`HTTP ${e.status} (${e.statusText}) bei ${o}`);
  return await e.text();
}
function $e(o) {
  const t = Array.from(o.querySelectorAll("Klassen > Kl > Kurz")).map((s) => (s.textContent ?? "").trim()).filter((s) => !!s), e = Array.from(o.querySelectorAll("Schulwochen > Sw")).map((s) => {
    const i = (s.textContent ?? "").trim(), n = (s.getAttribute("SwDatumVon") ?? "").trim(), r = (s.getAttribute("SwDatumBis") ?? "").trim(), l = nt(s.getAttribute("SwWo"));
    return { sw: i, from: n, to: r, wo: l ?? void 0 };
  });
  return { classes: t, weeks: e };
}
function Ft(o, t) {
  const e = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12, 0, 0).getTime();
  for (const s of o.weeks) {
    const i = Wt(s.from), n = Wt(s.to);
    if (!i || !n) continue;
    const r = i.getTime(), l = n.getTime();
    if (e >= r && e <= l) return { sw: s.sw, wo: s.wo };
  }
  return null;
}
function xe(o) {
  const t = (o ?? "").toString().trim();
  return t && (t.length === 1 ? `0${t}` : t);
}
function Se(o, t) {
  const e = (t ?? "").trim().toLowerCase();
  if (!e) return !1;
  const s = (o ?? "").replace(/\u00a0/g, " ").trim().toLowerCase();
  if (!s) return !1;
  if (s === e) return !0;
  const i = s.split(/[,/;|\s]+/u).map((n) => n.trim()).filter((n) => !!n);
  for (const n of i) {
    if (n === e) return !0;
    const r = n.match(/^(\d+)([a-z])\s*-\s*(\d+)([a-z])$/i);
    if (r) {
      const l = Number(r[1]), a = r[2].toLowerCase().charCodeAt(0), c = Number(r[3]), u = r[4].toLowerCase().charCodeAt(0), d = e.match(/^(\d+)([a-z])$/i);
      if (!d) continue;
      const h = Number(d[1]), b = d[2].toLowerCase().charCodeAt(0);
      if (l === c && h === l) {
        const p = Math.min(a, u), _ = Math.max(a, u);
        if (b >= p && b <= _) return !0;
      }
    }
  }
  return s.includes(e);
}
function X(o, t) {
  var e;
  return (((e = o == null ? void 0 : o.querySelector(t)) == null ? void 0 : e.textContent) ?? "").replace(/\u00a0/g, " ").trim();
}
function Ut(o, t) {
  var s;
  const e = Number((((s = o == null ? void 0 : o.querySelector(t)) == null ? void 0 : s.textContent) ?? "").trim());
  return Number.isFinite(e) ? e : 0;
}
function ke(o, t) {
  const e = Array.from(o.querySelectorAll("Pl > Std, Std")), s = t.splan_plan_art ?? "class", i = (t.splan_class ?? "").trim(), n = [];
  for (const r of e) {
    const l = Ut(r, "PlTg"), a = Ut(r, "PlSt");
    if (!l || !a) continue;
    const c = X(r, "PlFa"), u = X(r, "PlLe"), d = X(r, "PlRa"), h = (X(r, "PlWo") || "").toUpperCase(), b = h === "A" || h === "B" ? h : "";
    if (s === "class") {
      const p = X(r, "PlKl");
      if (p && i && !Se(p, i)) continue;
    } else if (s === "teacher") {
      if (i && u.toLowerCase() !== i.toLowerCase()) continue;
    } else if (s === "room" && i && d.toLowerCase() !== i.toLowerCase())
      continue;
    !c && !u && !d || n.push({ day: l, hour: a, subject: c, teacher: u, room: d, week: b });
  }
  return n;
}
function Ae(o) {
  var s, i;
  const t = Array.from(o.querySelectorAll("Std")), e = [];
  for (const n of t) {
    const r = Number((((s = n.querySelector("St")) == null ? void 0 : s.textContent) ?? "").trim());
    if (!Number.isFinite(r) || r <= 0) continue;
    const l = n.querySelector("Fa"), a = n.querySelector("Le"), c = n.querySelector("Ra"), u = ((l == null ? void 0 : l.textContent) ?? "").replace(/\u00a0/g, " ").trim() || void 0, d = ((a == null ? void 0 : a.textContent) ?? "").replace(/\u00a0/g, " ").trim() || void 0, h = ((c == null ? void 0 : c.textContent) ?? "").replace(/\u00a0/g, " ").trim() || void 0, b = ((l == null ? void 0 : l.getAttribute("FaAe")) ?? "").toLowerCase().includes("geaendert"), p = ((a == null ? void 0 : a.getAttribute("LeAe")) ?? "").toLowerCase().includes("geaendert"), _ = ((c == null ? void 0 : c.getAttribute("RaAe")) ?? "").toLowerCase().includes("geaendert"), m = (((i = n.querySelector("If")) == null ? void 0 : i.textContent) ?? "").replace(/\u00a0/g, " ").trim() || void 0;
    e.push({
      day: 0,
      // wird beim Merge gesetzt (Datei=Tag)
      hour: r,
      subject: u,
      teacher: d,
      room: h,
      info: m,
      changed_subject: b,
      changed_teacher: p,
      changed_room: _
    });
  }
  return e;
}
function It(o) {
  const t = o.getDay();
  return t === 0 ? 7 : t;
}
const Y = class Y extends U {
  constructor() {
    super(...arguments), this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanErr = null, this._splanLoading = !1;
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
    const s = (e.splan_school_id ?? "").toString().trim();
    let i = (e.splan_xml_url ?? "").toString().trim();
    !i && s && (i = `https://www.stundenplan24.de/${s}/wplan/wdatenk`);
    const n = (e.splan_class ?? "").toString().trim();
    if (!i || !n) {
      this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanErr = "XML aktiv, aber URL/Schulnummer oder Klasse fehlt.", this.requestUpdate();
      return;
    }
    if (!this._splanLoading && !(!t && this._splanBasis && this._splanWeekLessons && !this._splanErr)) {
      this._splanLoading = !0, this._splanErr = null;
      try {
        const { basisUrl: r, baseDir: l } = we(i), a = await mt(r), c = new DOMParser().parseFromString(a, "text/xml"), u = $e(c);
        this._splanBasis = u;
        const d = Ft(u, /* @__PURE__ */ new Date());
        if (!(d != null && d.sw)) throw new Error("Schulwoche (Sw) in Basis nicht für heutiges Datum gefunden.");
        const h = d.sw.trim(), b = [`${l}/SPlanKl_Sw${h}.xml`, `${l}/SPlanKl_Sw${xe(h)}.xml`];
        let p = null, _ = null;
        for (const v of b)
          try {
            p = await mt(v);
            break;
          } catch ($) {
            _ = $;
          }
        if (!p)
          throw new Error(
            `Wochenplan-Datei nicht gefunden (versucht: ${b.join(", ")}). ${(_ == null ? void 0 : _.message) ?? ""}`
          );
        const m = new DOMParser().parseFromString(p, "text/xml");
        if (this._splanWeekLessons = ke(m, e), this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), e.splan_sub_enabled) {
          const v = Math.max(1, Math.min(14, Number(e.splan_sub_days ?? 3)));
          for (let $ = 0; $ < v; $++) {
            const y = /* @__PURE__ */ new Date();
            y.setDate(y.getDate() + $);
            const f = It(y);
            if (f === 6 || f === 7) continue;
            const x = `${l}/WPlanKl_${ye(y)}.xml`;
            try {
              const R = await mt(x), C = new DOMParser().parseFromString(R, "text/xml"), S = Ae(C).map((w) => ({ ...w, day: f }));
              this._splanSubLessonsByDay.set(f, S);
            } catch {
            }
          }
        }
        this._splanErr = null;
      } catch (r) {
        this._splanBasis = null, this._splanWeekLessons = null, this._splanSubLessonsByDay = /* @__PURE__ */ new Map(), this._splanErr = r != null && r.message ? String(r.message) : String(r);
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
      splan_xml_url: "/local/splan/sdaten",
      splan_school_id: "",
      splan_class: "5a",
      splan_week: "auto",
      splan_show_room: !0,
      splan_show_teacher: !1,
      splan_sub_enabled: !1,
      splan_sub_days: 3,
      splan_sub_show_info: !0,
      splan_plan_art: "class",
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
    const e = Y.getStubConfig(), s = (((t == null ? void 0 : t.type) ?? e.type) + "").toString();
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
    var e, s;
    const t = ((s = (e = this.config) == null ? void 0 : e.rows) == null ? void 0 : s.length) ?? 3;
    return Math.max(3, t);
  }
  normalizeConfig(t) {
    const e = Y.getStubConfig(), s = Array.isArray(t.days) && t.days.length ? t.days.map((p) => (p ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = (Array.isArray(t.rows) ? t.rows : []).map((p) => {
      if (T(p))
        return {
          break: !0,
          time: (p.time ?? "").toString(),
          label: (p.label ?? "Pause").toString()
        };
      const _ = Array.isArray(p == null ? void 0 : p.cells) ? p.cells : [], m = Array.from({ length: s.length }, (S, w) => (_[w] ?? "").toString()), v = Array.isArray(p == null ? void 0 : p.cell_styles) ? p.cell_styles : [], $ = Array.from({ length: s.length }, (S, w) => it(v[w])), y = ((p == null ? void 0 : p.time) ?? "").toString(), f = D(y), x = ((p == null ? void 0 : p.start) ?? "").toString().trim(), R = ((p == null ? void 0 : p.end) ?? "").toString().trim(), C = {
        time: y,
        start: x || f.start || void 0,
        end: R || f.end || void 0,
        cells: m
      };
      return $.some((S) => !!S) && (C.cell_styles = $), C;
    }), r = ((t.week_mode ?? e.week_mode) + "").toString().trim(), l = r === "kw_parity" || r === "week_map" || r === "off" ? r : "off", a = ((t.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), c = a === "a" ? "A" : a === "b" ? "B" : "auto", u = ((t.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), d = u === "teacher" ? "teacher" : u === "room" ? "room" : "class", h = Number(t.splan_sub_days ?? e.splan_sub_days), b = Number.isFinite(h) ? Math.max(1, Math.min(14, h)) : e.splan_sub_days;
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
      week_mode: l,
      week_a_is_even_kw: t.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (t.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (t.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (t.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (t.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (t.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (t.source_attribute_b ?? e.source_attribute_b).toString(),
      // XML
      splan_xml_enabled: t.splan_xml_enabled ?? e.splan_xml_enabled,
      splan_xml_url: (t.splan_xml_url ?? e.splan_xml_url).toString(),
      splan_school_id: (t.splan_school_id ?? "").toString(),
      splan_class: (t.splan_class ?? e.splan_class).toString(),
      splan_week: c,
      splan_show_room: t.splan_show_room ?? e.splan_show_room,
      splan_show_teacher: t.splan_show_teacher ?? e.splan_show_teacher,
      // Vertretung
      splan_sub_enabled: t.splan_sub_enabled ?? e.splan_sub_enabled,
      splan_sub_days: b,
      splan_sub_show_info: t.splan_sub_show_info ?? e.splan_sub_show_info,
      // Planart
      splan_plan_art: d,
      rows: n
    };
  }
  getTodayIndex(t) {
    const e = (/* @__PURE__ */ new Date()).getDay(), s = new Set(fe(e).map(vt));
    if (!s.size) return -1;
    const i = (t ?? []).map((n) => vt(n));
    for (let n = 0; n < i.length; n++) if (s.has(i[n])) return n;
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
    const n = /* @__PURE__ */ new Date(), r = n.getHours() * 60 + n.getMinutes();
    return r >= s && r < i;
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
    var l, a, c;
    const s = (t ?? "").toString().trim();
    if (!s || !((a = (l = this.hass) == null ? void 0 : l.states) != null && a[s])) return null;
    const i = this.hass.states[s], n = (e ?? "").toString().trim(), r = n ? (c = i.attributes) == null ? void 0 : c[n] : i.state;
    return this.parseAnyJson(r);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const s = t.days ?? [], i = (t.source_time_key ?? "Stunde").toString(), n = e.map((r) => {
      if ((r == null ? void 0 : r.break) === !0)
        return {
          break: !0,
          time: (r.time ?? r[i] ?? "").toString(),
          label: (r.label ?? "Pause").toString()
        };
      const l = ((r == null ? void 0 : r.time) ?? (r == null ? void 0 : r[i]) ?? "").toString(), a = D(l), c = Array.from({ length: s.length }, (d, h) => {
        const b = (s[h] ?? "").toString();
        return ((r == null ? void 0 : r[b]) ?? "").toString();
      });
      return { time: l, start: a.start, end: a.end, cells: c };
    });
    return n.length ? n : null;
  }
  getRowsFromEntity(t, e, s) {
    const i = this.readEntityJson(e, s);
    return Array.isArray(i) ? this.buildRowsFromArray(t, i) : null;
  }
  weekFromParity(t) {
    const { isoWeek: e } = Ot(/* @__PURE__ */ new Date()), s = e % 2 === 0, i = !!t.week_a_is_even_kw;
    return s === i ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const s = (t.week_map_attribute ?? "").toString().trim(), i = this.readEntityJson(e, s);
    if (!i || typeof i != "object") return null;
    const { isoWeek: n, isoYear: r } = Ot(/* @__PURE__ */ new Date()), l = String(n), a = String(r);
    if (i != null && i[a] && typeof i[a] == "object") {
      const u = nt(i[a][l]);
      if (u) return u;
    }
    const c = nt(i == null ? void 0 : i[l]);
    return c || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  getRowsResolved(t) {
    const e = this.getRowsFromSplanXml(t);
    if (e) return e;
    if (t.week_mode !== "off") {
      const i = this.getActiveWeek(t), n = (t.source_entity_a ?? "").trim(), r = (t.source_entity_b ?? "").trim(), l = (t.source_attribute_a ?? "").trim(), a = (t.source_attribute_b ?? "").trim();
      if (i === "A" && n) {
        const u = this.getRowsFromEntity(t, n, l);
        if (u) return u;
      }
      if (i === "B" && r) {
        const u = this.getRowsFromEntity(t, r, a);
        if (u) return u;
      }
      const c = (t.source_entity ?? "").trim();
      if (c) {
        const u = this.getRowsFromEntity(t, c, (t.source_attribute ?? "").trim());
        if (u) return u;
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
      if (T(i)) continue;
      const n = i, r = (n.time ?? "").match(/^\s*(\d+)\s*\./);
      if (!r || parseInt(r[1], 10) !== e) continue;
      const a = D(n.time), c = (n.start ?? "").toString().trim() || a.start, u = (n.end ?? "").toString().trim() || a.end;
      return { start: c || void 0, end: u || void 0 };
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
      if (T(i)) continue;
      const n = i, r = this.parseHourNumberFromTimeLabel(n.time);
      if (!r) continue;
      const l = D(n.time), a = (n.start ?? "").toString().trim() || l.start, c = (n.end ?? "").toString().trim() || l.end;
      (a || c) && e.set(r, { start: a || void 0, end: c || void 0 });
    }
    return e;
  }
  normalizeSequentialTimes(t, e) {
    var r;
    const s = new Map(e);
    let i = null;
    const n = (l) => `${String(Math.floor(l / 60)).padStart(2, "0")}:${String(l % 60).padStart(2, "0")}`;
    for (const l of t) {
      const a = s.get(l);
      if (!a) continue;
      const c = this.toMinutes(a.start), u = this.toMinutes(a.end);
      if (i != null && c != null && c < i) {
        const b = i;
        let p = u;
        const _ = c != null && u != null ? Math.max(0, u - c) : null;
        p != null && p <= b && (_ != null && _ > 0 ? p = b + _ : p = b + 45), s.set(l, { start: n(b), end: p != null ? n(p) : a.end });
      }
      const d = (r = s.get(l)) == null ? void 0 : r.end, h = this.toMinutes(d);
      h != null && (i = h);
    }
    return s;
  }
  getRowsFromSplanXml(t) {
    if (!t.splan_xml_enabled || !this._splanWeekLessons || !this._splanWeekLessons.length) return null;
    const e = t.days ?? [], s = e.map((m) => ve(m)), i = !!t.splan_show_room, n = !!t.splan_show_teacher;
    let r = null;
    if (t.splan_week === "A") r = "A";
    else if (t.splan_week === "B") r = "B";
    else {
      const m = (() => {
        if (!this._splanBasis) return null;
        const v = Ft(this._splanBasis, /* @__PURE__ */ new Date());
        return (v == null ? void 0 : v.wo) ?? null;
      })();
      m ? r = m : t.week_mode !== "off" ? r = this.getActiveWeek(t) : r = null;
    }
    const l = this.getManualHourTimeMap(t), a = this._splanWeekLessons.map((m) => m.hour).filter((m) => Number.isFinite(m)), c = Array.from(l.keys()), u = Array.from(/* @__PURE__ */ new Set([...a, ...c])).sort((m, v) => m - v);
    if (!u.length) return null;
    const d = this.normalizeSequentialTimes(u, l), h = It(/* @__PURE__ */ new Date()), b = (m, v, $, y, f) => {
      const x = (m ?? "").trim(), R = (v ?? "").trim(), C = ($ ?? "").trim(), S = [];
      i && R && S.push(R), n && C && S.push(C);
      let w = S.length ? `${x} (${S.join(" · ")})` : x;
      return (f != null && f.s || f != null && f.r || f != null && f.t) && (w = `🔁 ${w}`), t.splan_sub_show_info && y && (w = `${w}
${y}`), w.trim();
    }, _ = u.map((m) => {
      const v = d.get(m) ?? this.getFallbackTimesFromManual(t, m) ?? {}, $ = (v.start ?? "").trim(), y = (v.end ?? "").trim(), f = `${m}.`, x = $ && y ? `${f} ${$}–${y}` : `${f}`, R = e.map((C, S) => {
        var et, St, kt;
        const w = s[S];
        if (!w) return "";
        const A = this._splanWeekLessons.filter((P) => {
          if (P.hour !== m || P.day !== w) return !1;
          const At = nt(P.week);
          return !At || !r ? !0 : At === r;
        }), M = (this._splanSubLessonsByDay.get(w) ?? []).find((P) => P.hour === m) ?? null, N = [];
        if (M && w === h)
          N.push(
            b(
              M.subject ?? ((et = A[0]) == null ? void 0 : et.subject) ?? "",
              M.room ?? ((St = A[0]) == null ? void 0 : St.room) ?? "",
              M.teacher ?? ((kt = A[0]) == null ? void 0 : kt.teacher) ?? "",
              M.info,
              { s: !!M.changed_subject, r: !!M.changed_room, t: !!M.changed_teacher }
            )
          );
        else
          for (const P of A) N.push(b(P.subject, P.room, P.teacher));
        return Array.from(new Set(N.filter((P) => P.trim().length > 0))).join(" / ");
      });
      return {
        time: x,
        start: $ || void 0,
        end: y || void 0,
        cells: R
      };
    }).filter((m) => {
      if (T(m)) return !0;
      const v = m, $ = this.parseHourNumberFromTimeLabel(v.time), y = !!($ && l.has($));
      return (v.cells ?? []).some((x) => !gt(x)) || y;
    });
    return _.length ? _ : null;
  }
  render() {
    if (!this.config) return g``;
    const t = this.config, e = this.getRowsResolved(t), s = this.getTodayIndex(t.days ?? []), i = "1px solid var(--divider-color)", n = Bt(t.highlight_today_color ?? "", 0.12), r = Bt(t.highlight_current_color ?? "", 0.18), l = (t.highlight_current_text_color ?? "").toString().trim(), a = (t.highlight_current_time_text_color ?? "").toString().trim(), c = t.week_mode !== "off", u = c ? this.getActiveWeek(t) : null, d = t.splan_xml_enabled, h = (t.splan_class ?? "").trim(), b = t.splan_week === "auto" ? "auto" : t.splan_week, p = (t.splan_plan_art ?? "class").toString();
    return g`
      <ha-card header=${t.title ?? ""}>
        <div class="card">
          ${c ? g`<div class="weekBadge">Woche: <b>${u}</b></div>` : g``}

          ${d ? g`
                <div class="xmlBadge">
                  <div class="xmlLine">
                    <b>XML</b>
                    <span class="mono">${p}</span>
                    <span class="mono">${h}</span>
                    <span class="mono">${b}</span>
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
                ${t.days.map((_, m) => {
      const v = t.highlight_today && m === s ? "today" : "";
      return g`<th class=${v} style=${`--sp-hl:${n};`}>${_}</th>`;
    })}
              </tr>
            </thead>

            <tbody>
              ${e.map((_) => {
      if (T(_)) {
        const w = D(_.time), A = !!w.start && !!w.end && this.isNowBetween(w.start, w.end), K = !!t.highlight_current && !!t.highlight_breaks && A;
        let M = `--sp-hl:${r};`, N = "";
        return K && (M += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", N += `--sp-hl:${r}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), A && t.highlight_current_time_text && a && (M += `color:${a};`), g`
                    <tr class="break">
                      <td class="time" style=${M}>${_.time}</td>
                      <td colspan=${t.days.length} style=${N}>${_.label ?? ""}</td>
                    </tr>
                  `;
      }
      const m = _, v = m.cells ?? [], $ = m.cell_styles ?? [], y = !!m.start && !!m.end && this.isNowBetween(m.start, m.end), f = s >= 0 ? v[s] ?? "" : "", x = s >= 0 ? gt(f) : !1, C = !(!!t.free_only_column_highlight && x);
      let S = `--sp-hl:${r};`;
      return C && t.highlight_current && y && (S += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), C && y && t.highlight_current_time_text && a && (S += `color:${a};`), g`
                  <tr>
                    <td class="time" style=${S}>${m.time}</td>

                    ${t.days.map((w, A) => {
        const K = v[A] ?? "", M = $[A] ?? null, N = t.highlight_today && A === s ? "today" : "";
        let ut = `--sp-hl:${n};` + ft(M, i);
        const et = !gt(K);
        return C && et && y && t.highlight_current_text && l && s >= 0 && A === s && (ut += `color:${l};`), g`<td class=${N} style=${ut}><span class="cellText">${K}</span></td>`;
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
Y.styles = Zt`
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
let at = Y;
const lt = class lt extends U {
  constructor() {
    super(...arguments), this._ui = {
      openGeneral: !1,
      openHighlight: !1,
      openColors: !1,
      openSources: !1,
      openRows: !1,
      showCellStyles: !0,
      rowOpen: {}
    };
  }
  setConfig(t) {
    const e = (((t == null ? void 0 : t.type) ?? "") + "").toString();
    if (e !== "custom:stundenplan-card" && e !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${e}`);
    const s = !!this._config;
    this._config = this.normalizeConfig(this.clone(t)), s || (this._ui.rowOpen = {});
  }
  normalizeConfig(t) {
    const e = at.getStubConfig(), s = { ...e, ...t, type: (t.type ?? e.type).toString() }, i = Array.isArray(s.days) && s.days.length ? s.days.map((_) => (_ ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], r = (Array.isArray(s.rows) ? s.rows : []).map((_) => {
      if (T(_))
        return { break: !0, time: (_.time ?? "").toString(), label: (_.label ?? "Pause").toString() };
      const m = Array.isArray(_ == null ? void 0 : _.cells) ? _.cells : [], v = Array.from({ length: i.length }, (w, A) => (m[A] ?? "").toString()), $ = Array.isArray(_ == null ? void 0 : _.cell_styles) ? _.cell_styles : [], y = Array.from({ length: i.length }, (w, A) => it($[A])), f = ((_ == null ? void 0 : _.time) ?? "").toString(), x = D(f), R = ((_ == null ? void 0 : _.start) ?? "").toString().trim(), C = ((_ == null ? void 0 : _.end) ?? "").toString().trim(), S = {
        time: f,
        start: R || x.start || void 0,
        end: C || x.end || void 0,
        cells: v
      };
      return y.some((w) => !!w) && (S.cell_styles = y), S;
    }), l = ((s.week_mode ?? e.week_mode) + "").toString().trim(), a = l === "kw_parity" || l === "week_map" || l === "off" ? l : "off", c = ((s.splan_week ?? e.splan_week) + "").toString().trim().toLowerCase(), u = c === "a" ? "A" : c === "b" ? "B" : "auto", d = ((s.splan_plan_art ?? e.splan_plan_art) + "").toString().trim().toLowerCase(), h = d === "teacher" ? "teacher" : d === "room" ? "room" : "class", b = Number(s.splan_sub_days ?? e.splan_sub_days), p = Number.isFinite(b) ? Math.max(1, Math.min(14, b)) : e.splan_sub_days;
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
      week_mode: a,
      week_a_is_even_kw: s.week_a_is_even_kw ?? e.week_a_is_even_kw,
      week_map_entity: (s.week_map_entity ?? e.week_map_entity).toString(),
      week_map_attribute: (s.week_map_attribute ?? e.week_map_attribute).toString(),
      source_entity_a: (s.source_entity_a ?? e.source_entity_a).toString(),
      source_attribute_a: (s.source_attribute_a ?? e.source_attribute_a).toString(),
      source_entity_b: (s.source_entity_b ?? e.source_entity_b).toString(),
      source_attribute_b: (s.source_attribute_b ?? e.source_attribute_b).toString(),
      splan_xml_enabled: s.splan_xml_enabled ?? e.splan_xml_enabled,
      splan_xml_url: (s.splan_xml_url ?? e.splan_xml_url).toString(),
      splan_school_id: (s.splan_school_id ?? "").toString(),
      splan_class: (s.splan_class ?? e.splan_class).toString(),
      splan_week: u,
      splan_show_room: s.splan_show_room ?? e.splan_show_room,
      splan_show_teacher: s.splan_show_teacher ?? e.splan_show_teacher,
      splan_sub_enabled: s.splan_sub_enabled ?? e.splan_sub_enabled,
      splan_sub_days: p,
      splan_sub_show_info: s.splan_sub_show_info ?? e.splan_sub_show_info,
      splan_plan_art: h,
      rows: r
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
  shiftRowOpenAfterInsert(t) {
    const e = {};
    for (const [s, i] of Object.entries(this._ui.rowOpen)) {
      const n = Number(s);
      Number.isNaN(n) || (e[n >= t ? n + 1 : n] = i);
    }
    this._ui.rowOpen = e;
  }
  shiftRowOpenAfterRemove(t) {
    const e = {};
    for (const [s, i] of Object.entries(this._ui.rowOpen)) {
      const n = Number(s);
      Number.isNaN(n) || n === t || (e[n > t ? n - 1 : n] = i);
    }
    this._ui.rowOpen = e;
  }
  rgbaFromHex(t, e) {
    const s = ot(t);
    return s ? `rgba(${s.r}, ${s.g}, ${s.b}, ${E(e)})` : `rgba(0,0,0,${E(e)})`;
  }
  parseColorToHexAlpha(t, e, s) {
    const i = (t ?? "").toString().trim();
    if (i.startsWith("#"))
      return ot(i) ? { hex: i, alpha: E(s) } : { hex: e, alpha: E(s) };
    const n = i.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/i);
    if (n) {
      const l = Math.max(0, Math.min(255, Number(n[1]))), a = Math.max(0, Math.min(255, Number(n[2]))), c = Math.max(0, Math.min(255, Number(n[3]))), u = E(Number(n[4])), d = (h) => h.toString(16).padStart(2, "0");
      return { hex: `#${d(l)}${d(a)}${d(c)}`, alpha: u };
    }
    const r = i.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (r) {
      const l = Math.max(0, Math.min(255, Number(r[1]))), a = Math.max(0, Math.min(255, Number(r[2]))), c = Math.max(0, Math.min(255, Number(r[3]))), u = (d) => d.toString(16).padStart(2, "0");
      return { hex: `#${u(l)}${u(a)}${u(c)}`, alpha: E(s) };
    }
    return { hex: e, alpha: E(s) };
  }
  setHighlightRgba(t, e, s) {
    this._config && this.emit({ ...this._config, [t]: this.rgbaFromHex(e, s) });
  }
  setHighlightHexOnly(t, e) {
    this._config && this.emit({ ...this._config, [t]: e });
  }
  setDaysFromString(t) {
    if (!this._config) return;
    const e = t.split(",").map((n) => n.trim()).filter((n) => n.length), s = (this._config.rows ?? []).map((n) => {
      if (T(n)) return n;
      const r = n, l = Array.from({ length: e.length }, (c, u) => {
        var d;
        return (((d = r.cells) == null ? void 0 : d[u]) ?? "").toString();
      }), a = Array.from({ length: e.length }, (c, u) => {
        var d;
        return it((d = r.cell_styles) == null ? void 0 : d[u]);
      });
      return { ...r, cells: l, cell_styles: a };
    });
    this.emit({ ...this._config, days: e, rows: s });
    const i = {};
    Object.entries(this._ui.rowOpen).forEach(([n, r]) => {
      const l = Number(n);
      !Number.isNaN(l) && l >= 0 && l < s.length && (i[l] = r);
    }), this._ui.rowOpen = i;
  }
  updateRowTime(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, n) => {
      if (n !== t) return i;
      if (T(i)) return { ...i, time: e };
      const r = i, l = D(r.time), a = D(e), c = (r.start ?? "").toString().trim(), u = (r.end ?? "").toString().trim(), d = !c || !!l.start && c === l.start, h = !u || !!l.end && u === l.end;
      return {
        ...r,
        time: e,
        start: d ? a.start ?? r.start : r.start,
        end: h ? a.end ?? r.end : r.end
      };
    });
    this.emit({ ...this._config, rows: s });
  }
  updateRowStart(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map(
      (i, n) => n !== t || T(i) ? i : { ...i, start: e || void 0 }
    );
    this.emit({ ...this._config, rows: s });
  }
  updateRowEnd(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map(
      (i, n) => n !== t || T(i) ? i : { ...i, end: e || void 0 }
    );
    this.emit({ ...this._config, rows: s });
  }
  updateRowCell(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((n, r) => {
      if (r !== t || T(n)) return n;
      const l = n, a = Array.isArray(l.cells) ? [...l.cells] : [];
      return a[e] = s, { ...l, cells: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  updateCellStyle(t, e, s) {
    if (!this._config) return;
    const i = this._config.rows.map((n, r) => {
      if (r !== t || T(n)) return n;
      const l = n, a = Array.isArray(l.cell_styles) ? [...l.cell_styles] : Array.from({ length: this._config.days.length }, () => null), u = { ...a[e] ? { ...a[e] } : {}, ...s };
      return typeof u.bg_alpha == "number" && (u.bg_alpha = E(u.bg_alpha)), a[e] = it(u), { ...l, cell_styles: a };
    });
    this.emit({ ...this._config, rows: i });
  }
  toggleBreak(t, e) {
    if (!this._config) return;
    const s = this._config.rows.map((i, n) => n !== t ? i : e ? { break: !0, time: i.time ?? "", label: i.label ?? "Pause" } : {
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
    const s = this._config.rows.map((i, n) => n === t ? { ...i, label: e } : i);
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
    var n, r;
    this._ui.openRows = !0, this._ui.rowOpen[t] = !0, this.requestUpdate(), await this.updateComplete, await new Promise((l) => requestAnimationFrame(() => l(null))), await new Promise((l) => requestAnimationFrame(() => l(null)));
    const s = `sp-cell-${t}-${e}`, i = (n = this.renderRoot) == null ? void 0 : n.getElementById(s);
    i && (i.scrollIntoView({ behavior: "smooth", block: "center" }), (r = i.focus) == null || r.call(i));
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
      <details class="panel" ?open=${e} @toggle=${(n) => s(!!n.target.open)}>
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
            ${s.map((i, n) => {
      if (T(i))
        return g`
                  <tr class="p-break">
                    <td class="p-time">${i.time}</td>
                    <td colspan=${e.length}>${i.label ?? ""}</td>
                  </tr>
                `;
      const r = i;
      return g`
                <tr>
                  <td class="p-time">${r.time}</td>
                  ${e.map((l, a) => {
        var d, h;
        const c = (((d = r.cells) == null ? void 0 : d[a]) ?? "").toString(), u = ((h = r.cell_styles) == null ? void 0 : h[a]) ?? null;
        return g`
                      <td
                        class="p-cell"
                        style=${ft(u, t)}
                        title="Klicken zum Bearbeiten"
                        @click=${() => this.jumpToCell(n, a)}
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
  colorRow(t, e, s, i, n, r) {
    const l = Math.round(E(s.alpha) * 100);
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
              @input=${(a) => n(Number(a.target.value) / 100)}
            />
            <div class="pct">${l}%</div>
          </div>
        </div>

        <div class="mono">${r}</div>
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
  renderSources() {
    if (!this._config) return g``;
    const t = this._config;
    return g`
      <div class="stack">
        <div class="sub">Datenquelle: XML (Stundenplan24) hat Priorität wenn aktiv. Sonst Entity (JSON) oder manuell.</div>

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
                placeholder="/local/splan/sdaten"
                @input=${(e) => this.emit({ ...t, splan_xml_url: e.target.value })}
              />
              <div class="sub">Wichtig: in HA immer <span class="mono">/local/...</span></div>
            </div>

<div class="field">
  <label class="lbl">Schulnummer (stundenplan24)</label>
  <input
    class="in"
    type="text"
    .value=${t.splan_school_id ?? ""}
    placeholder="z.B. 10000000"
    @input=${(e) => this.emit({ ...t, splan_school_id: e.target.value })}
  />
  <div class="sub">Wird genutzt, wenn die Karte die XML direkt von stundenplan24.de laden soll.</div>
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
      const n = T(s), r = n ? `Pause · ${s.time ?? ""}` : `Stunde · ${s.time ?? ""}`, l = n ? s.label ?? "Pause" : "", a = s;
      return g`
          <details class="rowPanel" ?open=${this._ui.rowOpen[i] ?? !1} @toggle=${(c) => this._ui.rowOpen[i] = !!c.target.open}>
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${r || `Zeile ${i + 1}`}</div>
                <div class="rowHeadMeta">${n ? l : `${(a.start ?? "") || "Start?"} – ${(a.end ?? "") || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <div class="field">
                  <label class="lbl">Zeit / Stunde</label>
                  <input class="in" type="text" .value=${s.time ?? ""} placeholder="z. B. 1. 08:00–08:45" @input=${(c) => this.updateRowTime(i, c.target.value)} />
                </div>

                <div class="field">
                  <label class="lbl">Typ</label>
                  <div class="optRow" style="padding:8px 10px;">
                    <div>
                      <div class="optTitle">Pause</div>
                      <div class="sub">Zeile als Pause rendern (colspan).</div>
                    </div>
                    ${this.uiSwitch(n, (c) => this.toggleBreak(i, c))}
                  </div>
                </div>
              </div>

              ${n ? g`
                    <div class="field">
                      <label class="lbl">Pausentext</label>
                      <input class="in" type="text" .value=${s.label ?? "Pause"} placeholder="z. B. Große Pause" @input=${(c) => this.updateBreakLabel(i, c.target.value)} />
                    </div>
                  ` : g`
                    <div class="grid2">
                      <div class="field">
                        <label class="lbl">Start (HH:MM)</label>
                        <input class="in" type="text" .value=${a.start ?? ""} placeholder="z.B. 07:45" @input=${(c) => this.updateRowStart(i, c.target.value)} />
                      </div>
                      <div class="field">
                        <label class="lbl">Ende (HH:MM)</label>
                        <input class="in" type="text" .value=${a.end ?? ""} placeholder="z.B. 08:30" @input=${(c) => this.updateRowEnd(i, c.target.value)} />
                      </div>
                    </div>

                    <div class="cellsGrid">
                      ${e.map((c, u) => {
        var y, f;
        const d = (((y = a.cells) == null ? void 0 : y[u]) ?? "").toString(), h = ((f = a.cell_styles) == null ? void 0 : f[u]) ?? null, b = h != null && h.bg && h.bg.startsWith("#") ? h.bg : "#3b82f6", p = typeof (h == null ? void 0 : h.bg_alpha) == "number" ? E(h.bg_alpha) : 0.18, _ = Math.round(p * 100), m = h != null && h.color && h.color.startsWith("#") ? h.color : "#ffffff", v = `sp-cell-${i}-${u}`, $ = ft(h, "1px solid var(--divider-color)");
        return g`
                          <div class="cell">
                            <div class="cellTop">
                              <div class="cellDay">${c}</div>
                              <div class="cellMiniPreview" style=${$} title="Zellvorschau">${d || "…"}</div>
                            </div>

                            <input id=${v} class="in" type="text" .value=${d} placeholder="Fach" @input=${(x) => this.updateRowCell(i, u, x.target.value)} />

                            <div class="cellStyles" ?hidden=${!this._ui.showCellStyles}>
                              <div class="styleLine">
                                <div class="styleLbl">Hintergrund</div>
                                <input class="col" type="color" .value=${b} @input=${(x) => this.updateCellStyle(i, u, { bg: x.target.value })} />
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Transparenz</div>
                                <div class="range">
                                  <input type="range" min="0" max="100" .value=${String(_)} @input=${(x) => this.updateCellStyle(i, u, { bg_alpha: Number(x.target.value) / 100 })} />
                                  <div class="pct">${_}%</div>
                                </div>
                              </div>

                              <div class="styleLine">
                                <div class="styleLbl">Text</div>
                                <input class="col" type="color" .value=${m} @input=${(x) => this.updateCellStyle(i, u, { color: x.target.value })} />
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
      ${this.panel("Datenquellen", this._ui.openSources, (t) => this._ui.openSources = t, this.renderSources())}
      ${this.panel("Zeilen & Fächer", this._ui.openRows, (t) => this._ui.openRows = t, this.renderRows())}
    ` : g``;
  }
};
lt.properties = {
  hass: {},
  _config: { state: !0 }
}, lt.styles = Zt`
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
let yt = lt;
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", at);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", yt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan mit visuellem Editor + XML (Stundenplan24)",
  preview: !0
});
export {
  at as StundenplanCard,
  yt as StundenplanCardEditor
};
//# sourceMappingURL=stundenplan-card.js.map
