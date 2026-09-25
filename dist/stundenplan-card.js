/*!
MIT License

Copyright (c) 2026 Fabian Schmidt (fabel-smith)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Lit (reactive-element, lit-html and lit-element)

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
const Ce = globalThis, nt = Ce.ShadowRoot && (Ce.ShadyCSS === void 0 || Ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = /* @__PURE__ */ Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Bt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (nt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const pi = (t) => new Bt(typeof t == "string" ? t : t + "", void 0, st), Ot = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, s, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new Bt(i, t, st);
}, gi = (t, e) => {
  if (nt) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), s = Ce.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, kt = nt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return pi(i);
})(t) : t, { is: _i, defineProperty: fi, getOwnPropertyDescriptor: mi, getOwnPropertyNames: yi, getOwnPropertySymbols: bi, getPrototypeOf: wi } = Object, H = globalThis, St = H.trustedTypes, vi = St ? St.emptyScript : "", $i = H.reactiveElementPolyfillSupport, _e = (t, e) => t, Oe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? vi : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, rt = (t, e) => !_i(t, e), At = { attribute: !0, type: String, converter: Oe, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ie = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = At) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && fi(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: s } = mi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? At;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const t = wi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const e = this.properties, i = [...yi(e), ...bi(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(kt(n));
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
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
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
    return gi(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
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
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Oe).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Oe;
      this._$Em = n;
      const a = r.fromAttribute(e, s.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (s = this[t]), i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? rt)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: s }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: r } = s, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, s, a);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ie.elementStyles = [], ie.shadowRootOptions = { mode: "open" }, ie[_e("elementProperties")] = /* @__PURE__ */ new Map(), ie[_e("finalized")] = /* @__PURE__ */ new Map(), $i?.({ ReactiveElement: ie }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
const fe = globalThis, Mt = (t) => t, He = fe.trustedTypes, Ct = He ? He.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ht = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, Ut = "?" + O, xi = `<${Ut}>`, G = document, ye = () => G.createComment(""), be = (t) => t === null || typeof t != "object" && typeof t != "function", at = Array.isArray, ki = (t) => at(t) || typeof t?.[Symbol.iterator] == "function", Ze = `[ 	
\f\r]`, pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Et = /-->/g, Dt = />/g, K = RegExp(`>|${Ze}(?:([^\\s"'>=/]+)(${Ze}*=${Ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tt = /'/g, zt = /"/g, Lt = /^(?:script|style|textarea|title)$/i, Si = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), c = Si(1), ae = /* @__PURE__ */ Symbol.for("lit-noChange"), b = /* @__PURE__ */ Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), q = G.createTreeWalker(G, 129);
function It(t, e) {
  if (!at(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(e) : e;
}
const Ai = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = pe;
  for (let o = 0; o < i; o++) {
    const l = t[o];
    let d, u, h = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, u = a.exec(l), u !== null); ) g = a.lastIndex, a === pe ? u[1] === "!--" ? a = Et : u[1] !== void 0 ? a = Dt : u[2] !== void 0 ? (Lt.test(u[2]) && (s = RegExp("</" + u[2], "g")), a = K) : u[3] !== void 0 && (a = K) : a === K ? u[0] === ">" ? (a = s ?? pe, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? K : u[3] === '"' ? zt : Tt) : a === zt || a === Tt ? a = K : a === Et || a === Dt ? a = pe : (a = K, s = void 0);
    const _ = a === K && t[o + 1].startsWith("/>") ? " " : "";
    r += a === pe ? l + xi : h >= 0 ? (n.push(d), l.slice(0, h) + Ht + l.slice(h) + O + _) : l + O + (h === -2 ? o : _);
  }
  return [It(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class we {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, l = this.parts, [d, u] = Ai(e, i);
    if (this.el = we.createElement(d, n), q.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = q.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ht)) {
          const g = u[a++], _ = s.getAttribute(h).split(O), p = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: p[2], strings: _, ctor: p[1] === "." ? Ci : p[1] === "?" ? Ei : p[1] === "@" ? Di : Ue }), s.removeAttribute(h);
        } else h.startsWith(O) && (l.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Lt.test(s.tagName)) {
          const h = s.textContent.split(O), g = h.length - 1;
          if (g > 0) {
            s.textContent = He ? He.emptyScript : "";
            for (let _ = 0; _ < g; _++) s.append(h[_], ye()), q.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[g], ye());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ut) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(O, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += O.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = G.createElement("template");
    return n.innerHTML = e, n;
  }
}
function oe(t, e, i = t, n) {
  if (e === ae) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = be(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (e = oe(t, s._$AS(t, e.values), s, n)), e;
}
class Mi {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? G).importNode(i, !0);
    q.currentNode = s;
    let r = q.nextNode(), a = 0, o = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new ve(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new Ti(r, this, e)), this._$AV.push(d), l = n[++o];
      }
      a !== l?.index && (r = q.nextNode(), a++);
    }
    return q.currentNode = G, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class ve {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = oe(this, e, i), be(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== ae && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ki(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && be(this._$AH) ? this._$AA.nextSibling.data = e : this.T(G.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = we.createElement(It(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new Mi(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = Rt.get(e.strings);
    return i === void 0 && Rt.set(e.strings, i = new we(e)), i;
  }
  k(e) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new ve(this.O(ye()), this.O(ye()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = Mt(e).nextSibling;
      Mt(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = oe(this, e, i, 0), a = !be(e) || e !== this._$AH && e !== ae, a && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = oe(this, o[n + l], i, l), d === ae && (d = this._$AH[l]), a || (a = !be(d) || d !== this._$AH[l]), d === b ? e = b : e !== b && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ci extends Ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class Ei extends Ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class Di extends Ue {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = oe(this, e, i, 0) ?? b) === ae) return;
    const n = this._$AH, s = e === b && n !== b || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== b && (n === b || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ti {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    oe(this, e);
  }
}
const zi = fe.litHtmlPolyfillSupport;
zi?.(we, ve), (fe.litHtmlVersions ?? (fe.litHtmlVersions = [])).push("3.3.2");
const Ri = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new ve(e.insertBefore(ye(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
}, me = globalThis;
class se extends ie {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ri(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ae;
  }
}
se._$litElement$ = !0, se.finalized = !0, me.litElementHydrateSupport?.({ LitElement: se });
const ji = me.litElementPolyfillSupport;
ji?.({ LitElement: se });
(me.litElementVersions ?? (me.litElementVersions = [])).push("4.2.2");
const Pi = { attribute: !0, type: String, converter: Oe, reflect: !1, hasChanged: rt }, Ni = (t = Pi, e, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), n === "accessor") {
    const { name: a } = i;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, t, o), o;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Vt(t) {
  return (e, i) => typeof i == "object" ? Ni(t, e, i) : ((n, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
function U(t) {
  return Vt({ ...t, state: !0, attribute: !1 });
}
var Fi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, Kt = (t) => {
  throw TypeError(t);
}, T = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Wi(e, i) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (n ? a(e, i, s) : a(s)) || s);
  return n && s && Fi(e, i, s), s;
}, Yt = (t, e, i) => e.has(t) || Kt("Cannot " + i), F = (t, e, i) => (Yt(t, e, "read from private field"), i ? i.call(t) : e.get(t)), W = (t, e, i) => e.has(t) ? Kt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), B = (t, e, i, n) => (Yt(t, e, "write to private field"), e.set(t, i), i), Ee, De, Te, ze, Re, je, Pe, Ne;
function C(t) {
  return !!t && t.break === !0;
}
function Le(t) {
  return Math.min(1, Math.max(0, t));
}
function ot(t) {
  if (!t) return null;
  const e = t.replace("#", "").trim();
  if (e.length !== 6) return null;
  const i = parseInt(e.slice(0, 2), 16), n = parseInt(e.slice(2, 4), 16), s = parseInt(e.slice(4, 6), 16);
  return [i, n, s].some((r) => Number.isNaN(r)) ? null : { r: i, g: n, b: s };
}
function lt(t) {
  if (!t || typeof t != "object") return null;
  const e = {};
  return typeof t.bg == "string" && t.bg.trim() && (e.bg = t.bg.trim()), typeof t.color == "string" && t.color.trim() && (e.color = t.color.trim()), typeof t.border == "string" && t.border.trim() && (e.border = t.border.trim()), typeof t.bg_alpha == "number" && !Number.isNaN(t.bg_alpha) && (e.bg_alpha = Le(t.bg_alpha)), Object.keys(e).length ? e : null;
}
function jt(t, e) {
  return (Array.isArray(t) ? t : []).map((i) => {
    if (C(i))
      return { break: !0, time: (i.time ?? "").toString(), label: (i.label ?? "Pause").toString() };
    const n = Array.isArray(i?.cells) ? i.cells : [], s = Array.from({ length: e.length }, (_, p) => (n[p] ?? "").toString()), r = Array.isArray(i?.cell_styles) ? i.cell_styles : [], a = Array.from({ length: e.length }, (_, p) => lt(r[p])), o = Array.isArray(i?.cell_times) ? Array.from({ length: e.length }, (_, p) => qt(i.cell_times[p])) : [], l = (i?.time ?? "").toString(), d = re(l), u = (i?.start ?? "").toString().trim(), h = (i?.end ?? "").toString().trim(), g = {
      time: l,
      start: u || d.start || void 0,
      end: h || d.end || void 0,
      cells: s
    };
    return a.some((_) => !!_) && (g.cell_styles = a), o.some((_) => !!_) && (g.cell_times = o), g;
  });
}
function Jt(t) {
  if (!t?.bg) return null;
  const e = t.bg.trim();
  if (e.startsWith("rgba(") || e.startsWith("rgb(") || e.startsWith("var(")) return e;
  const i = ot(e);
  if (!i) return e;
  const n = typeof t.bg_alpha == "number" ? Le(t.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${n})`;
}
function Ge(t, e = "#2196f3", i = 1) {
  const n = String(t ?? "").trim();
  if (n.toLowerCase() === "transparent") return { hex: e, alpha: 0 };
  const s = n.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (s) {
    const a = s[1].length === 3 ? [...s[1]].map((o) => o + o).join("") : s[1];
    return { hex: "#" + a.slice(0, 6), alpha: a.length === 8 ? parseInt(a.slice(6), 16) / 255 : i };
  }
  const r = n.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  return r ? {
    hex: "#" + r.slice(1, 4).map((a) => Math.min(255, Number(a)).toString(16).padStart(2, "0")).join(""),
    alpha: r[4] == null ? 1 : Le(Number(r[4]))
  } : { hex: e, alpha: i };
}
function Bi(t, e) {
  const i = [], n = Jt(t);
  return n && i.push(`background:${n}`), t?.color && i.push(`color:${t.color}`), i.push(`border:${t?.border ?? e}`), i.join(";") + ";";
}
function Pt(t, e) {
  const i = (t ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${e})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const n = ot(i);
    return n ? `rgba(${n.r}, ${n.g}, ${n.b}, ${Le(e)})` : i;
  }
  return i;
}
function re(t) {
  const e = (t ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return e ? { start: e[1], end: e[2] } : {};
}
function qt(t) {
  if (t == null) return null;
  if (typeof t == "string") {
    const r = t.trim(), a = re(r);
    return r ? { time: r, start: a.start, end: a.end } : null;
  }
  if (typeof t != "object") return null;
  const e = (t.time ?? "").toString().trim(), i = re(e), n = (t.start ?? "").toString().trim() || i.start, s = (t.end ?? "").toString().trim() || i.end;
  return e || n || s ? { time: e || (n && s ? `${n}-${s}` : ""), start: n || void 0, end: s || void 0 } : null;
}
function Qe(t) {
  return (t ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Oi(t) {
  switch (t) {
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
function Nt(t) {
  const e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())), i = e.getUTCDay() === 0 ? 7 : e.getUTCDay();
  e.setUTCDate(e.getUTCDate() + 4 - i);
  const n = e.getUTCFullYear(), s = new Date(Date.UTC(n, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), a = new Date(s);
  a.setUTCDate(s.getUTCDate() + (4 - r));
  const o = e.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(o / (10080 * 60 * 1e3)), isoYear: n };
}
function Ft(t) {
  const e = (t ?? "").toString().trim().toUpperCase();
  return e === "A" || e === "B" ? e : null;
}
function J(t) {
  const e = (t ?? "").toString().trim();
  return !e || e === "-" || e === "–" || e === "—";
}
function Z(t) {
  return t.trim().replace(/\s+/g, " ").toLocaleLowerCase("de");
}
function Fe(t) {
  const e = Array.isArray(t) ? t : [], i = /* @__PURE__ */ new Map();
  for (const n of e) {
    if (typeof n != "string") continue;
    const s = n.trim().replace(/\s+/g, " ");
    s && i.set(Z(s), s);
  }
  return [...i.values()];
}
function Zt(t) {
  return t.trim().split(/\r?\n/, 1)[0].trim();
}
function Hi(t, e) {
  if (!e?.length) return t;
  const i = new Set(e.map(Z));
  return t.split(/\r?\n\s*\r?\n/).filter((n) => !i.has(Z(Zt(n)))).join(`

`).trim();
}
function Ui(t, e, i = (n, s, r) => n?.cells?.[r] ?? "") {
  const n = Array.isArray(t) ? t : [], s = Array.isArray(e) ? e : [];
  let r = -1;
  return n.forEach((a, o) => {
    C(a) || s.some((l, d) => !J(i(a, o, l, d))) && (r = o);
  }), r >= 0 ? n.slice(0, r + 1) : [];
}
function Li(t) {
  const e = (t ?? "").toString().replace(/\r/g, "").split(`
`).map((n) => n.trim()), i = [];
  for (const n of e)
    if (!/^(—|–|-)$/.test(n)) {
      if (!n) {
        i.length && i[i.length - 1] !== "" && i.push("");
        continue;
      }
      i.push(n.replace(/\s+/g, " "));
    }
  for (; i[i.length - 1] === ""; ) i.pop();
  return i.join(`
`);
}
function Ii(t) {
  const e = lt(t);
  if (!e) return "";
  const i = {};
  return e.bg && (i.bg = e.bg, i.bg_alpha = typeof e.bg_alpha == "number" ? e.bg_alpha : 0.18), e.color && (i.color = e.color), e.border && (i.border = e.border), Object.keys(i).length ? JSON.stringify(i) : "";
}
function Vi(t, e, i) {
  const n = Array.isArray(t) ? t : [];
  if (e < 0 || e >= n.length || C(n[e])) return { covered: !1, span: 1 };
  const s = (o) => {
    if (o < 0 || o >= n.length || C(n[o])) return null;
    const l = i(n[o], o) ?? {}, d = Li(l.text);
    return J(d) ? null : JSON.stringify([d, Ii(l.style)]);
  }, r = s(e);
  if (!r) return { covered: !1, span: 1 };
  if (s(e - 1) === r) return { covered: !0, span: 0 };
  let a = 1;
  for (; s(e + a) === r; ) a += 1;
  return { covered: !1, span: a };
}
function Gt(t) {
  const e = (t ?? "").toString().trim();
  if (!e.startsWith("sensor.")) return "";
  const i = e.slice(7), n = i.match(/^(.+)_woche$/i);
  if (n?.[1]) return `number.${n[1]}_woche_offset`;
  const s = i.match(/^stundenplan_woche_(.+)$/i);
  return s?.[1] ? `number.${s[1]}_woche_offset` : "";
}
function Wt(t) {
  const e = Qe(t);
  return ["mo", "montag", "mon", "monday"].includes(e) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(e) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(e) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(e) ? 4 : ["fr", "freitag", "fri", "friday"].includes(e) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(e) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(e) ? 7 : null;
}
const ct = [
  { key: "card_background", variable: "--stundenplan-card-background", label: "Kartenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "header_background", variable: "--stundenplan-header-background", label: "Tabellenkopf & Navigation", theme: "--secondary-background-color", fallback: "#eeeeee" },
  { key: "row_background", variable: "--stundenplan-row-background", label: "Zeilenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "divider_color", variable: "--stundenplan-divider-color", label: "Trennlinien", theme: "--divider-color", fallback: "#e0e0e0" }
];
function Xe(t) {
  const e = {};
  for (const { key: i } of ct) {
    const n = typeof t[i] == "string" ? t[i].trim() : "";
    n && !/[;{}]/.test(n) && CSS.supports("color", n) && (e[i] = n);
  }
  return e;
}
const ne = [
  { key: "font_size_subject", variable: "--stundenplan-font-size-subject", label: "Fächer (px)", min: 8, max: 64 },
  { key: "font_size_time", variable: "--stundenplan-font-size-time", label: "Stunden & Uhrzeiten (px)", min: 8, max: 64 },
  { key: "font_size_header", variable: "--stundenplan-font-size-header", label: "Wochentage / Tabellenkopf (px)", min: 8, max: 64 },
  { key: "font_size_details", variable: "--stundenplan-font-size-details", label: "Raum, Lehrer & Hinweise (px)", min: 8, max: 64 },
  { key: "row_height", variable: "--stundenplan-row-height", label: "Mindesthöhe der Stundenzeilen (px)", min: 24, max: 240 },
  { key: "header_table_gap", variable: "--stundenplan-header-table-gap", label: "Abstand Kopfzeile / Tabelle (px)", min: 0, max: 64 },
  { key: "font_size_title_compact", variable: "--stundenplan-font-size-title-compact", label: "Titelgröße kompakt (px)", min: 8, max: 64 }
];
function et(t) {
  const e = {};
  for (const { key: i, min: n, max: s } of ne) {
    const r = t[i];
    if (typeof r != "number" && typeof r != "string" || String(r).trim() === "") continue;
    const a = Number(r);
    Number.isFinite(a) && (a > 0 || n === 0 && a === 0) && (e[i] = Math.max(n, Math.min(s, a)));
  }
  return e;
}
var ge;
const z = (ge = class extends se {
  constructor() {
    super(...arguments), W(this, Ee), W(this, De), W(this, Te, []), W(this, ze, !1), W(this, Re, ""), W(this, je, null), W(this, Pe, "idle"), W(this, Ne, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return F(this, Ee);
  }
  set hass(t) {
    B(this, Ee, t);
    try {
      const e = this.config;
      if ((e?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (e?.view_mode ?? "week").toString(), d = Number(e?.days_ahead), u = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0;
          if (l === "rolling" && u === 0) {
            const h = ((e?.week_offset_entity ?? "") + "").toString().trim();
            if (h && t?.states?.[h]) {
              const g = Number(t.states[h].state);
              Number.isFinite(g) && g !== 0 && (t.callService("number", "set_value", { entity_id: h, value: 0 }).catch?.(() => {
              }), window.setTimeout(() => {
                try {
                  const _ = ((e?.source_entity_integration ?? e?.source_entity ?? "") + "").toString().trim();
                  _ && this.hass?.callService("homeassistant", "update_entity", { entity_id: _ });
                } catch {
                }
              }, 400));
            }
          }
        } catch {
        }
        const n = ((e?.source_entity_integration ?? e?.source_entity ?? "") + "").toString().trim(), s = t, a = (n ? s?.states?.[n] : void 0)?.attributes ?? {}, o = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (n && o) {
          let l = ((e?.week_offset_entity ?? "") + "").toString().trim();
          l || (l = n.replace(/^sensor\./, "number.") + "_offset");
          const d = l && s?.states && l in s.states, u = n + "|" + l;
          if (d && this.__autokickSig !== u) {
            this.__autokickSig = u;
            const h = s.states[l]?.state, g = Number(h), _ = Number.isFinite(g) ? g : 0;
            s.callService("number", "set_value", { entity_id: l, value: _ }).catch?.(() => {
            }), window.setTimeout(() => {
              try {
                this.hass?.callService("homeassistant", "update_entity", { entity_id: n });
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
    return F(this, De);
  }
  set config(t) {
    B(this, De, t);
  }
  get _rowsCache() {
    return F(this, Te);
  }
  set _rowsCache(t) {
    B(this, Te, t);
  }
  get _noData() {
    return F(this, ze);
  }
  set _noData(t) {
    B(this, ze, t);
  }
  get _noDataMsg() {
    return F(this, Re);
  }
  set _noDataMsg(t) {
    B(this, Re, t);
  }
  get _jsonRows() {
    return F(this, je);
  }
  set _jsonRows(t) {
    B(this, je, t);
  }
  get _jsonStatus() {
    return F(this, Pe);
  }
  set _jsonStatus(t) {
    B(this, Pe, t);
  }
  get _jsonError() {
    return F(this, Ne);
  }
  set _jsonError(t) {
    B(this, Ne, t);
  }
  getWatchedEntities(t) {
    const e = /* @__PURE__ */ new Set(), i = (n) => {
      const s = (n ?? "").toString().trim();
      s && e.add(s);
    };
    return i(t.week_offset_entity), i(t.source_entity), i(t.source_entity_integration), i(t.source_entity_legacy), i(t.source_entity_a), i(t.source_entity_b), i(t.week_map_entity), Array.from(e);
  }
  getEntitySig(t) {
    const e = this.hass?.states?.[t];
    if (!e) return `${t}:<missing>`;
    const i = e.last_updated ?? "", n = e.last_changed ?? "", s = e.state ?? "", r = e.attributes ?? {}, a = r.plan ?? r.rows ?? r.rows_table ?? r.rows_json ?? r.rows_ha, o = Array.isArray(a) || typeof a == "string" ? a.length : 0;
    return `${t}|${i}|${n}|${s}|rowsLen=${o}`;
  }
  computeWatchSig(t) {
    const e = this.getWatchedEntities(t).map((s) => this.getEntitySig(s)), i = t.week_mode !== "off" ? this.getActiveWeek(t) : "off", n = this.getWeekOffsetValue(t);
    return `week=${i}|off=${n ?? "null"}::` + e.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const t = this.computeWatchSig(this.config);
    t !== this._lastWatchSig && (this._lastWatchSig = t, this.recomputeRows());
  }
  getWeekOffsetValue(t) {
    const e = (t.week_offset_entity ?? "").trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e], n = (t.week_offset_attribute ?? "").trim(), s = n ? i.attributes?.[n] : i.state, r = Number(s);
    return Number.isFinite(r) ? r : null;
  }
  async setWeekOffset(t, e) {
    const i = (t.week_offset_entity ?? "").trim();
    if (!i) return;
    const n = this.hass?.states?.[i], s = n?.attributes?.min, r = n?.attributes?.max, a = Number.isFinite(Number(s)) ? Number(s) : -52, o = Number.isFinite(Number(r)) ? Number(r) : 52;
    let l = e;
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
  updated(t) {
    if (super.updated(t), t.has("config")) {
      this.recomputeRows(), this._lastWatchSig = null;
      return;
    }
    if (t.has("hass")) {
      if (this.config) {
        const e = this.getWeekOffsetValue(this.config);
        e !== this._lastWeekOffset && (this._lastWeekOffset = e);
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
      show_week_navigation: !0,
      trim_empty_rows: !1,
      hidden_subjects: [],
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
  setConfig(t) {
    const e = ge.getStubConfig(), i = ((t?.type ?? e.type) + "").toString();
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
  normalizeTapAction(t) {
    const e = typeof t == "object" && t ? t : {}, i = ((e.action ?? "none") + "").toString().trim();
    return {
      action: i === "toggle_view" || i === "popup_week" || i === "navigate" || i === "url" || i === "more-info" ? i : "none",
      navigation_path: (e.navigation_path ?? "").toString(),
      url_path: (e.url_path ?? "").toString(),
      entity: (e.entity ?? "").toString(),
      target: (e.target ?? "").toString()
    };
  }
  normalizeConfig(t) {
    const e = ge.getStubConfig(), i = Array.isArray(t.days) && t.days.length ? t.days.map((S) => (S ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = jt(t.rows, i), s = jt(t.rows_b, i), r = ((t.view_mode ?? "week") + "").toString().trim(), a = r === "rolling" ? "rolling" : "week", o = ((t.display_mode ?? "default") + "").toString().trim(), l = o === "compact" ? "compact" : "default", d = Number(t.days_ahead), u = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0, h = ((t.rolling_switch_mode ?? e.rolling_switch_mode ?? "midnight") + "").toString().trim(), g = h === "after_last_lesson" || h === "fixed_time" ? h : "midnight", _ = ((t.rolling_switch_time ?? e.rolling_switch_time ?? "") + "").toString().trim(), p = ((t.week_mode ?? e.week_mode) + "").toString().trim(), f = p === "kw_parity" || p === "week_map" || p === "off" ? p : "off", m = (() => {
      const S = ((t.source_type ?? "") + "").toString().trim();
      if (S === "manual" || S === "entity" || S === "json" || S === "sensor") return S;
      const L = ((t.source_entity ?? e.source_entity) + "").toString().trim();
      if (L) {
        const le = ((t.source_attribute ?? "") + "").toString().trim(), Q = ((t.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(L) && (le === "" || le === "rows_table") && (Q === "" || Q === "time")) && (le || Q) ? "legacy" : "entity";
      }
      return "manual";
    })(), w = (t.source_entity ?? e.source_entity).toString().trim(), $ = (t.source_entity_integration ?? "").toString().trim(), A = (t.source_entity_legacy ?? "").toString().trim(), k = m === "sensor" ? A || w : m === "entity" && $ || w, R = (t.week_offset_entity ?? "").toString().trim() || Gt(k);
    return {
      type: (t.type ?? e.type).toString(),
      title: (t.title ?? e.title).toString(),
      show_title: t.show_title ?? e.show_title,
      title_font_size: Number.isFinite(Number(t.title_font_size)) ? Math.max(0, Math.min(40, Number(t.title_font_size))) : e.title_font_size,
      title_font_family: (t.title_font_family ?? e.title_font_family ?? "").toString(),
      ...et(t),
      ...Xe(t),
      show_header_date: t.show_header_date ?? e.show_header_date,
      show_time_column: t.show_time_column ?? e.show_time_column,
      show_week_navigation: t.show_week_navigation ?? e.show_week_navigation,
      trim_empty_rows: t.trim_empty_rows ?? e.trim_empty_rows,
      hidden_subjects: Fe(t.hidden_subjects),
      merge_double_lessons: t.merge_double_lessons ?? e.merge_double_lessons,
      equal_column_widths: t.equal_column_widths ?? e.equal_column_widths,
      days: i,
      view_mode: a,
      display_mode: l,
      days_ahead: u,
      rolling_switch_mode: g,
      rolling_week_only: t.rolling_week_only === !0,
      rolling_switch_time: _,
      tap_action: this.normalizeTapAction(t.tap_action ?? e.tap_action),
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
      source_entity: k,
      source_entity_integration: $ || "",
      source_entity_legacy: A || "",
      source_attribute: m === "entity" ? "rows_table" : ((t.source_attribute ?? e.source_attribute ?? "plan") + "").toString(),
      source_time_key: m === "entity" ? "time" : ((t.source_time_key ?? e.source_time_key ?? "Stunde") + "").toString(),
      source_type: m,
      json_url: (t.json_url ?? "").toString(),
      week_offset_entity: R,
      week_offset_attribute: (t.week_offset_attribute ?? "").toString(),
      week_mode: f,
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
      rows: n,
      rows_b: s
    };
  }
  getTodayIndex(t, e) {
    const i = /* @__PURE__ */ new Date(), n = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(e) && e.length) {
      const l = e.map((d) => {
        if (d instanceof Date && !Number.isNaN(d.getTime()))
          return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
        const u = (d ?? "").toString().trim(), h = u.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return h ? `${h[1]}${h[2]}${h[3]}` : u;
      }).indexOf(n);
      return l >= 0 ? l : -1;
    }
    const s = i.getDay(), r = new Set(Oi(s).map(Qe));
    if (!r.size) return -1;
    const a = (t ?? []).map((o) => Qe(o));
    for (let o = 0; o < a.length; o++) if (r.has(a[o])) return o;
    return -1;
  }
  toMinutes(t) {
    if (!t) return null;
    const [e, i] = t.split(":").map((n) => Number(n));
    return [e, i].some((n) => Number.isNaN(n)) ? null : e * 60 + i;
  }
  isNowBetween(t, e) {
    const i = this.toMinutes(t), n = this.toMinutes(e);
    if (i == null || n == null) return !1;
    const s = /* @__PURE__ */ new Date(), r = s.getHours() * 60 + s.getMinutes();
    return r >= i && r < n;
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
    const n = this.hass.states[i], s = (e ?? "").toString().trim(), r = s ? n.attributes?.[s] : n.state;
    return this.parseAnyJson(r);
  }
  buildRowsFromArray(t, e) {
    if (!Array.isArray(e)) return null;
    const i = t.days ?? [], n = (t.source_time_key ?? "time").toString().trim(), s = "Stunde", r = "time", a = e.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o?.time ?? o?.[n] ?? o?.[s] ?? o?.[r] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[n] ?? o?.[s] ?? o?.[r] ?? "").toString(), d = re(l), u = Array.isArray(o?.cells) ? Array.from({ length: i.length }, (m, w) => (o?.cells?.[w] ?? "").toString()) : Array.from({ length: i.length }, (m, w) => {
        const $ = (i[w] ?? "").toString();
        return (o?.[$] ?? "").toString();
      }), h = Array.isArray(o?.cell_styles) ? Array.from({ length: i.length }, (m, w) => lt(o?.cell_styles?.[w])) : [], g = Array.isArray(o?.cell_times) ? Array.from({ length: i.length }, (m, w) => qt(o.cell_times[w])) : [], _ = (o?.start ?? "").toString().trim() || d.start, p = (o?.end ?? "").toString().trim() || d.end, f = { time: l, start: _ || void 0, end: p || void 0, cells: u };
      return h.some((m) => !!m) && (f.cell_styles = h), g.some((m) => !!m) && (f.cell_times = g), f;
    });
    return a.length ? a : null;
  }
  getRowsFromEntity(t, e, i) {
    let n = this.readEntityJson(e, i);
    if (n == null && i && (i + "").toString().trim() && (i + "").toString().trim() !== "plan" && (n = this.readEntityJson(e, "plan")), n == null && (n = this.readEntityJson(e, "rows_ha")), n == null && (n = this.readEntityJson(e, "rows")), n == null && (n = this.readEntityJson(e, "rows_table")), n == null && (n = this.readEntityJson(e, "rows_json")), n && typeof n == "object" && !Array.isArray(n)) {
      const s = n.plan, r = n.rows;
      Array.isArray(s) ? n = s : Array.isArray(r) && (n = r);
    }
    return Array.isArray(n) ? this.buildRowsFromArray(t, n) : null;
  }
  async loadJsonRows(t, e) {
    const i = (e ?? "").toString().trim();
    if (!i) {
      this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = "";
      return;
    }
    this._jsonStatus = "loading", this._jsonError = "";
    try {
      const n = await fetch(i, { cache: "no-store" });
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const s = await n.json(), r = Array.isArray(s) ? s : Array.isArray(s?.rows) ? s.rows : null, a = r ? this.buildRowsFromArray(t, r) : null;
      this._jsonRows = a ?? [], this._jsonStatus = "ok";
    } catch (n) {
      this._jsonRows = [], this._jsonStatus = "error", this._jsonError = (n?.message ?? "JSON konnte nicht geladen werden").toString();
    } finally {
      this.requestUpdate();
    }
  }
  ensureJsonLoaded(t) {
    const e = (t.json_url ?? "").toString().trim();
    e === this._jsonUrlLast && this._jsonStatus !== "error" || (e !== this._jsonUrlLast && (this._jsonUrlLast = e, this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = ""), this._jsonStatus === "idle" && e && this.loadJsonRows(t, e));
  }
  weekFromParity(t) {
    return this.weekFromParityAtDate(t, /* @__PURE__ */ new Date());
  }
  weekFromParityAtDate(t, e) {
    const { isoWeek: i } = Nt(e), n = i % 2 === 0, s = !!t.week_a_is_even_kw;
    return n === s ? "A" : "B";
  }
  weekFromMap(t) {
    const e = (t.week_map_entity ?? "").toString().trim();
    if (!e) return null;
    const i = (t.week_map_attribute ?? "").toString().trim(), n = this.readEntityJson(e, i);
    if (!n || typeof n != "object") return null;
    const { isoWeek: s, isoYear: r } = Nt(/* @__PURE__ */ new Date()), a = String(s), o = String(r);
    if (n?.[o] && typeof n[o] == "object") {
      const d = Ft(n[o][a]);
      if (d) return d;
    }
    return Ft(n?.[a]) || null;
  }
  getActiveWeek(t) {
    return t.week_mode === "week_map" ? this.weekFromMap(t) ?? this.weekFromParity(t) : t.week_mode === "kw_parity" ? this.weekFromParity(t) : "A";
  }
  filterCellText(t, e) {
    return Hi((t ?? "").toString().trim(), e.hidden_subjects);
  }
  getTitleStyle(t) {
    const e = [], i = Number(t.title_font_size);
    Number.isFinite(i) && i > 0 && e.push(`font-size:${Math.max(10, Math.min(40, i))}px`);
    const n = (t.title_font_family ?? "").toString().trim();
    return n && e.push(`font-family:${n}`), e.join(";");
  }
  getTypographyStyle(t) {
    const e = et(t);
    return ne.filter(({ key: i }) => e[i] != null).map(({ key: i, variable: n }) => `${n}:${e[i]}px`).join(";");
  }
  getAppearanceStyle(t) {
    const e = Xe(t);
    return ct.filter(({ key: i }) => e[i] != null).map(({ key: i, variable: n }) => `${n}:${e[i]}`).join(";");
  }
  fmtYMD(t) {
    return `${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, "0")}${String(t.getDate()).padStart(2, "0")}`;
  }
  findConfiguredDayIndexForDate(t, e) {
    const i = t.getDay() === 0 ? 7 : t.getDay();
    return (e ?? []).findIndex((n) => Wt(n) === i);
  }
  isConfiguredSchoolday(t, e) {
    return this.findConfiguredDayIndexForDate(t, e) >= 0;
  }
  nextConfiguredSchoolday(t, e) {
    const i = new Date(t);
    for (let n = 0; n < 14; n++)
      if (i.setDate(i.getDate() + 1), this.isConfiguredSchoolday(i, e)) return i;
    return i;
  }
  getLastLessonEnd(t = this.config, e = /* @__PURE__ */ new Date()) {
    const i = this._rowsCache ?? [];
    if (t?.hidden_subjects?.length) {
      const n = this.findConfiguredDayIndexForDate(e, t.days);
      if (n < 0) return "";
      let s = "";
      for (let r = 0; r < i.length; r++) {
        const a = this.getManualRowForDate(t, i[r], r, e);
        if (C(a) || J(this.filterCellText(a?.cells?.[n], t))) continue;
        const o = a?.cell_times?.[n]?.end || a?.end;
        if (!/^\d{1,2}:\d{2}$/.test(o ?? "")) return "";
        const [l, d] = o.split(":").map(Number);
        if (l > 23 || d > 59) return "";
        const u = `${String(l).padStart(2, "0")}:${String(d).padStart(2, "0")}`;
        u > s && (s = u);
      }
      return s;
    }
    for (let n = i.length - 1; n >= 0; n--) {
      const s = i[n];
      if (!C(s) && s?.end) return (s.end + "").toString().trim();
    }
    return "";
  }
  shouldAdvanceRollingDay(t, e) {
    if (!this.isConfiguredSchoolday(e, t.days ?? [])) return !0;
    const i = ((t.rolling_switch_mode ?? "midnight") + "").toString();
    if (i === "after_last_lesson") {
      const n = this.getLastLessonEnd(t, e);
      if (!n) return !1;
      const [s, r] = n.split(":").map(Number);
      return Number.isFinite(s) && Number.isFinite(r) ? e.getHours() > s || e.getHours() === s && e.getMinutes() >= r : !1;
    }
    if (i === "fixed_time") {
      const n = ((t.rolling_switch_time ?? "") + "").toString().trim(), [s, r] = n.split(":").map(Number);
      return Number.isFinite(s) && Number.isFinite(r) ? e.getHours() > s || e.getHours() === s && e.getMinutes() >= r : !1;
    }
    return !1;
  }
  getRollingVisibleSlots(t, e, i = /* @__PURE__ */ new Date()) {
    const n = t.days ?? [];
    if (!n.length) return [];
    const s = i;
    let r = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 12, 0, 0, 0);
    this.isConfiguredSchoolday(r, n) ? this.shouldAdvanceRollingDay(t, s) && (r = this.nextConfiguredSchoolday(r, n)) : r = this.nextConfiguredSchoolday(r, n);
    const a = [], o = Math.max(0, Math.min(6, e));
    let l = new Date(r);
    const d = new Date(r);
    d.setDate(r.getDate() + (7 - (r.getDay() || 7))), d.setHours(23, 59, 59, 999);
    for (let u = 0; u <= o && !(t.rolling_week_only && l > d); u++) {
      const h = this.findConfiguredDayIndexForDate(l, n);
      h >= 0 && a.push({ orig: h, date: new Date(l) }), l = this.nextConfiguredSchoolday(l, n);
    }
    return a;
  }
  async handleCardAction(t, e) {
    if (!e || e.defaultPrevented || tt(this) || (e.composedPath?.() ?? []).some((s) => s instanceof HTMLElement && (s.closest?.(".offsetInline") || s.closest?.(".btnMini")))) return;
    const n = this.normalizeTapAction(t.tap_action);
    if (!(!n || n.action === "none")) {
      if (n.action === "toggle_view") {
        const s = ((this._uiViewMode ?? t.view_mode ?? "week") + "").toString();
        this._uiViewMode = s === "rolling" ? "week" : "rolling", this.requestUpdate();
        return;
      }
      if (n.action === "popup_week") {
        this._uiPopupOpen = !0, this.requestUpdate();
        return;
      }
      if (n.action === "navigate") {
        const s = (n.navigation_path ?? "").toString().trim();
        if (!s) return;
        history.pushState(null, "", s), Be(window, "location-changed", { replace: !1 });
        return;
      }
      if (n.action === "url") {
        const s = (n.url_path ?? "").toString().trim();
        if (!s) return;
        window.open(s, n.target || "_blank");
        return;
      }
      if (n.action === "more-info") {
        const s = (n.entity ?? t.source_entity ?? t.source_entity_integration ?? "").toString().trim();
        if (!s) return;
        Be(this, "hass-more-info", { entityId: s });
      }
    }
  }
  closeWeekPopup(t) {
    t?.stopPropagation?.(), this._uiPopupOpen = !1, this.requestUpdate();
  }
  handlePreviewCell(t, e, i, n, s, r = 1) {
    if (!tt(this) || (e.stopPropagation(), t.source_type !== "manual")) return;
    let a = e.currentTarget.parentElement;
    for (let h = 1; h < r && (a = a?.nextElementSibling, a && e.clientY >= a.getBoundingClientRect().top); h++)
      i++;
    let o = t.week_mode === "kw_parity" ? s instanceof Date ? this.weekFromParityAtDate(t, s) : this.getActiveWeek(t) : "A";
    o === "B" && !t.rows_b?.length && (o = "A");
    const l = o === "B" ? t.rows_b : t.rows, d = this.getManualRowForDate(t, this._rowsCache[i], i, s), u = l.indexOf(d);
    u < 0 || Be(this, "stundenplan-edit-cell", { config: this.config, rowIndex: u, dayIndex: n, week: o });
  }
  getBaseDate(t) {
    const e = this.getWeekOffsetValue(t) ?? 0, i = /* @__PURE__ */ new Date();
    return i.setHours(12, 0, 0, 0), i.setDate(i.getDate() + e * 7), i;
  }
  mondayOfWeek(t) {
    const e = new Date(t), i = e.getDay() === 0 ? 7 : e.getDay();
    return e.setDate(e.getDate() - (i - 1)), e.setHours(12, 0, 0, 0), e;
  }
  fmtDDMMYYYY(t) {
    const e = String(t.getDate()).padStart(2, "0"), i = String(t.getMonth() + 1).padStart(2, "0"), n = String(t.getFullYear());
    return `${e}.${i}.${n}`;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(t) {
    const e = ((t.source_type ?? "manual") === "entity" ? t.source_entity_integration ?? t.source_entity ?? "" : (t.source_type ?? "manual") === "sensor" ? t.source_entity_legacy ?? t.source_entity ?? "" : t.source_entity ?? "").toString().trim();
    if (!e || !this.hass?.states?.[e]) return null;
    const i = this.hass.states[e].attributes ?? {}, n = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
    if (!Array.isArray(n) || n.length < 3) return null;
    const s = [];
    for (const r of n) {
      const a = (r ?? "").toString().trim().match(/^(\d{4})(\d{2})(\d{2})$/);
      if (!a) continue;
      const o = Number(a[1]), l = Number(a[2]), d = Number(a[3]), u = new Date(o, l - 1, d, 12, 0, 0, 0);
      Number.isNaN(u.getTime()) || s.push(u);
    }
    return s.length ? s : null;
  }
  // Extract "aktualisiert" timestamps from Stundenplan24 integration (wplan HTML),
  // exposed via sensor attributes meta / meta_ha / meta_json.
  // Returns either one value per day (Mo..Fr) or null.
  getHeaderUpdatedFromEntity(t) {
    const e = ((t.source_type ?? "manual") + "").toString().trim();
    if (e !== "entity" && e !== "sensor") return null;
    const i = (e === "entity" ? t.source_entity_integration ?? t.source_entity ?? "" : e === "sensor" ? t.source_entity_legacy ?? t.source_entity ?? "" : t.source_entity ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const n = this.hass.states[i].attributes ?? {}, s = n?.meta_ha ?? n?.meta ?? (typeof n?.meta_json == "string" ? this.parseAnyJson(n.meta_json) : null) ?? null;
    if (!s) return null;
    const r = (t.days?.length ?? 0) || 5, a = s?.updated_days;
    if (Array.isArray(a) && a.length) {
      const l = (a[0] ?? "").toString().trim();
      return Array.from({ length: r }, (u, h) => (a[h] ?? l ?? "").toString().trim());
    }
    const o = (s?.updated_raw ?? s?.updated ?? "").toString().trim();
    return o ? Array.from({ length: r }, () => o) : null;
  }
  getRowsResolved(t) {
    const e = t.source_type ?? "manual", i = (e === "entity" ? t.source_entity_integration ?? t.source_entity ?? "" : e === "sensor" ? t.source_entity_legacy ?? t.source_entity ?? "" : t.source_entity ?? "").toString().trim();
    if (e === "manual")
      return t.week_mode === "kw_parity" && this.getActiveWeek(t) === "B" ? Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : t.rows ?? [] : t.rows ?? [];
    if (e === "json")
      return this.ensureJsonLoaded(t), this._jsonRows ?? [];
    if (t.week_mode !== "off") {
      const s = this.getActiveWeek(t), r = (t.source_entity_a ?? "").trim(), a = (t.source_entity_b ?? "").trim(), o = (t.source_attribute_a ?? "").trim(), l = (t.source_attribute_b ?? "").trim();
      if (s === "A" && r)
        return this.getRowsFromEntity(t, r, o) ?? [];
      if (s === "B" && a)
        return this.getRowsFromEntity(t, a, l) ?? [];
      const d = i;
      return d ? this.getRowsFromEntity(t, d, ((t.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
    }
    const n = i;
    return n ? this.getRowsFromEntity(t, n, ((t.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
  }
  getManualRowForDate(t, e, i, n) {
    if ((t.source_type ?? "manual") !== "manual" || t.week_mode !== "kw_parity" || !(n instanceof Date)) return e;
    const s = this.weekFromParityAtDate(t, n), r = s === "B" && Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : t.rows ?? [], a = (e?.time ?? "").toString();
    return r.find((l) => C(l) === C(e) && (l?.time ?? "").toString() === a) ?? r[i] ?? e;
  }
  recomputeRows() {
    if (!this.config) {
      this._rowsCache = [], this._noData = !1, this._noDataMsg = "";
      return;
    }
    const t = this.config, e = t.source_type ?? "manual", i = this.getRowsResolved(t);
    if (this._rowsCache = i, e === "manual") {
      this._noData = !1, this._noDataMsg = "";
      return;
    }
    const n = "Keine Daten für diesen Zeitraum (Ferien/Feiertag).";
    !i || i.length === 0 ? (this._noData = !0, e === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || n}` : e === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = n) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(t) {
    const e = (t ?? "").toString().replace(/\r/g, "").trim();
    if (!e) return null;
    const i = e.split(`
`).map((g) => g.trim()).filter((g) => g.length > 0);
    if (!i.length) return null;
    const n = i.join(" ").trim();
    if (/^(—|\-|–|---|\s)+$/.test(n)) return null;
    const s = i[0];
    if (/^(—|\-|–|---)$/.test(s)) return null;
    const r = (g) => {
      const _ = (g ?? "").toString().trim();
      return /^[🟠🔴🟡🟢⚪️🟣🟤]/.test(_) || /\bfällt\s+aus\b/i.test(_) || /\bverlegt\b/i.test(_) || /\bentfällt\b/i.test(_) || /\bvertretung\b/i.test(_) || /\bstatt\b/i.test(_) || /\bgehalten\b/i.test(_) || /\bAufgaben\b/i.test(_) || /^für\b/i.test(_);
    }, a = (g) => {
      const _ = (g ?? "").toString().trim();
      return /^\d{1,4}$/.test(_) || /^[A-ZÄÖÜ]{1,4}\d{0,3}[-/][A-ZÄÖÜ0-9]{1,4}$/i.test(_) || /^\d{1,4}\s+[A-Za-zÄÖÜäöüß]{2,12}$/.test(_);
    }, o = i.slice(1);
    let l = -1;
    for (let g = 0; g < o.length; g++)
      if (!r(o[g]) && a(o[g])) {
        l = g;
        break;
      }
    if (l < 0) {
      for (let g = o.length - 1; g >= 0; g--)
        if (a(o[g])) {
          l = g;
          break;
        }
    }
    if (l < 0) return null;
    const d = o[l];
    let u;
    for (let g = l + 1; g < o.length; g++) {
      const _ = o[g];
      if (!r(_) && !a(_)) {
        u = _;
        break;
      }
    }
    if (!u) {
      const g = o.filter((_) => !r(_) && !a(_));
      u = g.length ? g[g.length - 1] : void 0;
    }
    const h = i.slice(1).filter((g) => r(g));
    return { fach: s, raum: d, lehrer: u, notes: h.length ? h : void 0 };
  }
  renderCell(t, e) {
    const i = (t ?? "").toString(), n = this.filterCellText(i, e);
    if (J(n)) return c``;
    const s = (() => {
      let p = n.replace(/\r/g, "").split(`
`).map((m) => (m ?? "").toString().trim());
      for (; p.length && /^(—|–|-)$/.test(p[0]); ) p.shift();
      const f = [];
      for (const m of p) {
        const w = m.length === 0;
        if (!/^(—|–|-)$/.test(m)) {
          if (w) {
            if (f.length === 0 || f[f.length - 1] === "") continue;
            f.push("");
            continue;
          }
          f.push(m);
        }
      }
      for (; f.length && f[f.length - 1] === ""; ) f.pop();
      return f.join(`
`);
    })();
    if (J(s)) return c``;
    const r = s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean), a = this.parseCellTriplet(s), o = (p) => {
      if (p.startsWith("🔴")) return "note noteRed";
      if (p.startsWith("🟠")) return "note noteOrange";
      if (p.startsWith("🟡")) return "note noteYellow";
      const f = p;
      return /\bfällt\s+aus\b/i.test(f) || /\bverlegt\b/i.test(f) || /\bstatt\b/i.test(f) || /\bgehalten\b/i.test(f) || /\bentfällt\b/i.test(f) ? "note noteRed" : "note";
    }, l = (p) => (p ?? "").toString().replace(/^\p{Extended_Pictographic}+\s*/u, "").replace(/^[�]+\s*/, "").trim();
    if (r.length === 1 && a?.fach && a?.raum && a?.lehrer)
      return c`
        <div class="cellWrap">
          <div class="fach">${a.fach}</div>
          <div class="lehrer">${a.lehrer}</div>
          <div class="raum">${a.raum}</div>

          ${a.notes?.length ? c`
                <div class="notes">
                  ${a.notes.map((p) => {
        const f = o(p), m = l(p) || p;
        return c`<div class=${f}><span class="txt">${m}</span></div>`;
      })}
                </div>
              ` : c``}
        </div>
      `;
    const d = (p) => {
      const f = (p ?? "").toString().trim();
      if (!f) return c``;
      const m = this.parseCellTriplet(f);
      if (m?.fach && m?.raum && m?.lehrer)
        return c`
          <div class="cellWrap">
            <div class="fach">${m.fach}</div>
            <div class="lehrer">${m.lehrer}</div>
            <div class="raum">${m.raum}</div>

            ${m.notes?.length ? c`
                  <div class="notes">
                    ${m.notes.map((k) => {
          const R = o(k), S = l(k) || k;
          return c`<div class=${R}><span class="txt">${S}</span></div>`;
        })}
                  </div>
                ` : c``}
          </div>
        `;
      const w = f.split(`
`).map((k) => k.trim()).filter(Boolean), $ = (w[0] ?? "").trim(), A = w.slice(1);
      return $ && A.length ? c`
          <div class="cellWrap">
            <div class="fach">${$}</div>
            <div class="notes">
              ${A.map((k) => {
        const R = o(k), S = l(k) || k;
        return c`<div class=${R}><span class="txt">${S}</span></div>`;
      })}
            </div>
          </div>
        ` : c`<span class="cellText">${f}</span>`;
    };
    if (r.length > 1)
      return c`<div class="cellMulti">${r.map((p) => d(p))}</div>`;
    const u = (s ?? "").split(`
`).map((p) => p.trim()).filter(Boolean), h = /^\d{1,4}$/, g = /^[A-ZÄÖÜ]{2,6}$/, _ = (p) => {
      const f = (p ?? "").trim();
      if (!f || h.test(f) || g.test(f)) return !1;
      const m = f.toLowerCase();
      return m.startsWith("statt ") || m.includes("fällt aus") || m.includes("verlegt") || m.includes("gehalten") || /^[🔴🟠🟡🟢🟣🟤🟦🟥🟧🟨🟩🟪🟫]/.test(f) ? !1 : /[a-z0-9äöü]/i.test(f);
    };
    if (u.length >= 6 && u.length % 3 === 0) {
      const p = [];
      for (let f = 0; f < u.length; f += 3) {
        const m = u[f] ?? "", w = u[f + 1] ?? "", $ = u[f + 2] ?? "";
        if (!_(m) || !h.test(w) || !g.test($)) {
          p.length = 0;
          break;
        }
        p.push([m, w, $].join(`
`));
      }
      if (p.length >= 2)
        return c`<div class="cellMulti">${p.map((f) => d(f))}</div>`;
    }
    return d(s);
  }
  renderCardLayout(t, e = null, i = !1) {
    const n = this._rowsCache, s = this.getHeaderDaysFromEntity(t), r = this.getTodayIndex(t.days ?? [], s), a = ((e ?? this._uiViewMode ?? t.view_mode ?? "week") + "").toString(), o = Number(t.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, d = "1px solid var(--stundenplan-divider-color, var(--divider-color))", u = Pt(t.highlight_today_color ?? "", 0.12), h = Pt(t.highlight_current_color ?? "", 0.18), g = (t.highlight_current_text_color ?? "").toString().trim(), _ = (t.highlight_current_time_text_color ?? "").toString().trim(), p = t.week_mode !== "off", f = p ? this.getActiveWeek(t) : null, m = this.getWeekOffsetValue(t), w = (t.source_type ?? "manual").toString(), $ = t.show_time_column !== !1, A = !i && (t.week_offset_entity ?? "").trim().length > 0, k = A && (w === "entity" || w === "sensor" && (t.week_mode ?? "off") !== "off"), R = k && t.show_week_navigation !== !1, S = s && s.length >= (t.days?.length ?? 0) ? s : null, L = this.getHeaderUpdatedFromEntity(t), le = this.getBaseDate(t), Q = this.mondayOfWeek(le), dt = this.normalizeTapAction(t.tap_action), Xt = i ? "default" : t.display_mode ?? "default", ei = `${Xt === "compact" ? "compact" : ""}${!i && dt.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}${t.header_table_gap != null ? " customHeaderGap" : ""}`, ht = t.show_title !== !1 && (t.title ?? "").toString().trim().length > 0, ti = this.getTitleStyle(t), ii = ht || p || R, ni = a === "rolling" && (i || !k || (m ?? 0) === 0), ce = ni ? this.getRollingVisibleSlots(t, l) : [], X = ce.length ? ce.map((y) => y.orig) : Array.from({ length: t.days?.length ?? 0 }, (y, v) => v), de = X.map((y) => t.days[y]), M = ce.length ? ce.map((y) => y.date) : null, ut = ce.length ? 0 : Math.max(0, X.indexOf(r)), Ie = X[ut] ?? 0, $e = M?.[ut] ?? null, pt = $e instanceof Date ? this.fmtYMD($e) === this.fmtYMD(/* @__PURE__ */ new Date()) : Ie === r, xe = t.trim_empty_rows || t.hidden_subjects?.length ? Ui(n, X, (y, v, x, D) => {
      const j = this.getManualRowForDate(t, y, v, M?.[D]);
      return this.filterCellText((j?.cells ?? y?.cells ?? [])[x] ?? "", t);
    }) : n, gt = (() => {
      const y = /* @__PURE__ */ new Map();
      return !S || !L || S.forEach((v, x) => {
        const D = L[x];
        v instanceof Date && D && y.set(this.fmtYMD(v), D);
      }), y;
    })();
    return c`
      <ha-card class=${ei} style=${[this.getTypographyStyle(t), this.getAppearanceStyle(t)].filter(Boolean).join(";")} @click=${i ? (y) => this.closeWeekPopup(y) : (y) => this.handleCardAction(t, y)}>
        ${ii ? c`<div class="headerRow">
          ${ht ? c`<div class="title" style=${ti}>${t.title ?? ""}</div>` : c`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${p ? c`<div class="weekBadgeInline">Woche <b>${f}</b></div>` : c``}

            ${R ? c`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), m != null && this.setWeekOffset(t, m - 1);
    }}>&lt;</button>
                    <div class="offsetVal">${m ?? "?"}</div>
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), m != null && this.setWeekOffset(t, m + 1);
    }}>&gt;</button>
                  </div>
                ` : c``}
          </div>
        </div>` : c``}

        <div class="card">
          <table class=${t.equal_column_widths ? "equalColumns" : ""}>
            <thead>
              <tr>
                ${$ ? c`<th class="time">Stunde</th>` : c``}
                ${de.map((y, v) => {
      const x = X[v], D = t.highlight_today && (M ? this.fmtYMD(M[v]) === this.fmtYMD(/* @__PURE__ */ new Date()) : x === r) ? "today" : "";
      let j = "";
      if (M?.[v] instanceof Date)
        j = this.fmtDDMMYYYY(M[v]);
      else if (S)
        j = this.fmtDDMMYYYY(S[x]);
      else {
        const I = Wt(y);
        if (I) {
          const ee = new Date(Q);
          ee.setDate(Q.getDate() + (I - 1)), j = this.fmtDDMMYYYY(ee);
        }
      }
      return c`
                    <th class=${D} style=${`--sp-hl:${u};`}>
                      <div>${y}</div>
                      ${t.show_header_date !== !1 ? c`<div class="thDate">${j}</div>` : c``}
                      ${M?.[v] ? gt.get(this.fmtYMD(M[v])) ? c`<div class="thUpdated">(aktualisiert: ${gt.get(this.fmtYMD(M[v]))})</div>` : c`` : L?.[x] ? c`<div class="thUpdated">(aktualisiert: ${L[x]})</div>` : c``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${de.length + ($ ? 1 : 0)}>${this._noDataMsg}</td></tr>` : t.hidden_subjects?.length && n.length && !xe.length ? c`<tr class="nodata"><td class="nodataCell" colspan=${de.length + ($ ? 1 : 0)}>Keine Einträge nach Filterung.</td></tr>` : xe.map((y, v) => {
      if (C(y)) {
        const he = re(y.time), P = !!he.start && !!he.end && this.isNowBetween(he.start, he.end), E = !!t.highlight_breaks && P;
        let N = `--sp-hl:${h};`, Ae = "";
        return E && (N += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", Ae += `--sp-hl:${h}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), E && t.highlight_current_time_text && _ && (N += `color:${_};`), c`
                    <tr class="break">
                      ${$ ? c`<td class="time" style=${N}>${y.time}</td>` : c``}
                      <td colspan=${de.length} style=${Ae} @click=${(Je) => this.handlePreviewCell(t, Je, v, -1, $e)}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const x = y, D = x.cells ?? [], j = x.cell_styles ?? [], I = this.getManualRowForDate(t, x, v, $e), ee = (I?.cell_times ?? x.cell_times)?.[Ie] ?? null, _t = ee?.time || I?.time || x.time, ke = ee?.start || I?.start || x.start, Se = ee?.end || I?.end || x.end, Ve = pt && !!ke && !!Se && this.isNowBetween(ke, Se), si = r >= 0 ? D[r] ?? "" : "", ri = r >= 0 ? this.filterCellText(si, t) : "", ai = r >= 0 ? J(ri) : !1, Ke = !(t.free_only_column_highlight && ai), ft = re(_t), oi = !!(ft.start && ft.end), mt = !oi && ke && Se ? `${ke}–${Se}` : "";
      let Ye = `--sp-hl:${h};`;
      return Ke && t.highlight_current && Ve && (Ye += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), Ke && Ve && t.highlight_current_time_text && _ && (Ye += `color:${_};`), c`
                  <tr>
                    ${$ ? c`<td class="time" style=${Ye}>
                      <div class="timeWrap">
                        <div class="timeSt">${_t}</div>
                        ${mt ? c`<div class="timeHm">${mt}</div>` : c``}
                      </div>
                    </td>` : c``}

                    ${de.map((he, P) => {
        const E = X[P], N = this.getManualRowForDate(t, x, v, M?.[P]), Ae = N?.cells ?? D, Je = N?.cell_styles ?? j, qe = M ? this.fmtYMD(M[P]) === this.fmtYMD(/* @__PURE__ */ new Date()) : E === r, yt = this.filterCellText(Ae[E] ?? "", t), li = Je[E] ?? null, ci = t.highlight_today && qe ? "today" : "", ue = t.merge_double_lessons ? Vi(xe, v, (V, Me) => {
          const te = this.getManualRowForDate(t, V, Me, M?.[P]);
          return { text: this.filterCellText((te?.cells ?? V?.cells ?? [])[E] ?? "", t), style: (te?.cell_styles ?? V?.cell_styles ?? [])[E] ?? null };
        }) : { covered: !1, span: 1 };
        if (ue.covered) return b;
        let bt = `--sp-hl:${u};` + Bi(li, d);
        const di = !J(yt), hi = (() => {
          if (!qe || !pt || E !== Ie || ue.span <= 1) return !1;
          const V = (N?.cell_times ?? x.cell_times)?.[E] ?? null, Me = v + ue.span - 1, te = xe[Me], wt = this.getManualRowForDate(t, te, Me, M?.[P]), ui = (wt?.cell_times ?? te?.cell_times)?.[E] ?? null, vt = V?.start || N?.start || x.start, $t = ui?.end || wt?.end || te?.end;
          return !!vt && !!$t && this.isNowBetween(vt, $t);
        })();
        return Ke && di && (qe && (Ve || hi)) && t.highlight_current_text && g && r >= 0 && E === r && (bt += `color:${g};`), c`<td class=${ci} style=${bt} rowspan=${ue.span} @click=${(V) => this.handlePreviewCell(t, V, v, E, M?.[P], ue.span)}>${this.renderCell(yt, t)}</td>`;
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
    const t = this.config;
    return c`
      ${this.renderCardLayout(t)}
      ${this._uiPopupOpen ? c`
        <div class="popupBackdrop" @click=${(e) => this.closeWeekPopup(e)}>
          <div class="popupShell">
            ${this.renderCardLayout(t, "week", !0)}
          </div>
        </div>
      ` : c``}
    `;
  }
}, ge.styles = Ot`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
    }
    ha-card {
      display: block;
      background: var(--stundenplan-card-background, var(--ha-card-background, var(--card-background-color, white)));
      border-color: var(--stundenplan-divider-color, var(--ha-card-border-color, var(--divider-color, #e0e0e0)));
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
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      border-radius: 12px;
      background: var(--stundenplan-header-background, var(--secondary-background-color));
      font-size: 13px;
      opacity: 0.95;
      white-space: nowrap;
    }

    .offsetInline {
      display: flex;
      gap: 8px;
      align-items: start;
      padding: 6px 8px;
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      border-radius: 12px;
      background: var(--stundenplan-header-background, var(--secondary-background-color));
    }
    .btnMini {
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      background: var(--stundenplan-card-background, var(--card-background-color));
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
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      vertical-align: middle;
      word-break: normal;
      overflow-wrap: anywhere;
    }
    th {
      background: var(--stundenplan-header-background, var(--secondary-background-color));
      font-weight: 700;
      font-size: var(--stundenplan-font-size-header, inherit);
    }
    td {
      background: var(--stundenplan-row-background, transparent);
    }
    /* A table row's height is a minimum; wrapped content can still grow. */
    tbody tr:not(.break):not(.nodata) {
      height: var(--stundenplan-row-height, auto);
    }
    .break .time {
      font-size: var(--stundenplan-font-size-time, inherit);
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
      font-size: var(--stundenplan-font-size-time, 13px);
      font-weight: 800;
    }
    .timeHm {
      font-size: var(--stundenplan-font-size-time, 11px);
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
      border-left: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      padding-left: 10px;
    }
    .cellMulti .cellWrap {
      flex: 1 1 0;
      min-width: 0;
    }
    .fach {
      font-weight: 800;
      font-size: var(--stundenplan-font-size-subject, 14px);
      letter-spacing: 0.2px;
      white-space: nowrap;
    }
    table.equalColumns .fach {
      white-space: normal;
    }
    .raum,
    .lehrer {
      font-size: var(--stundenplan-font-size-details, 12px);
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
      font-size: var(--stundenplan-font-size-details, 11px);
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
      font-size: var(--stundenplan-font-size-subject, inherit);
    }
  

    tr.nodata td {
      border: 1px solid var(--stundenplan-divider-color, var(--divider-color));
      background: var(--stundenplan-row-background, var(--secondary-background-color));
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
      font-size: var(--stundenplan-font-size-title-compact, 16px) !important;
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
      font-size: var(--stundenplan-font-size-time, 12px);
    }
    ha-card.compact .timeHm {
      font-size: var(--stundenplan-font-size-time, 10px);
    }
    ha-card.compact .cellWrap {
      gap: 1px;
      line-height: 1.08;
    }
    ha-card.compact .fach {
      font-size: var(--stundenplan-font-size-subject, 12px);
    }
    ha-card.compact .raum,
    ha-card.compact .lehrer {
      font-size: var(--stundenplan-font-size-details, 11px);
    }
    ha-card.compact .notes {
      margin-top: 2px;
      gap: 2px;
    }
    ha-card.compact .note {
      font-size: var(--stundenplan-font-size-details, 10px);
      padding: 2px 4px;
      border-radius: 7px;
    }
    ha-card.compact .dot {
      font-size: 11px;
    }
    ha-card.customHeaderGap .headerRow {
      padding-bottom: var(--stundenplan-header-table-gap);
    }
    ha-card.customHeaderGap .headerRow + .card {
      padding-top: 0;
    }
`, ge);
Ee = /* @__PURE__ */ new WeakMap();
De = /* @__PURE__ */ new WeakMap();
Te = /* @__PURE__ */ new WeakMap();
ze = /* @__PURE__ */ new WeakMap();
Re = /* @__PURE__ */ new WeakMap();
je = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakMap();
Ne = /* @__PURE__ */ new WeakMap();
T([
  Vt({ attribute: !1 })
], z.prototype, "hass", 1);
T([
  U()
], z.prototype, "config", 1);
T([
  U()
], z.prototype, "_rowsCache", 1);
T([
  U()
], z.prototype, "_noData", 1);
T([
  U()
], z.prototype, "_noDataMsg", 1);
T([
  U()
], z.prototype, "_jsonRows", 1);
T([
  U()
], z.prototype, "_jsonStatus", 1);
T([
  U()
], z.prototype, "_jsonError", 1);
let We = z;
function tt(t) {
  for (let e = t; e; e = e.parentNode ?? e.host)
    if (e.localName === "hui-dialog-edit-card") return e;
  return null;
}
function Be(t, e, i) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function Y(t, e = !1) {
  if (typeof t == "boolean") return t;
  if (t == null) return e;
  const i = String(t).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : e;
}
function Ki(t) {
  return (t ?? "").split(",").map((e) => e.trim()).filter((e) => e.length > 0);
}
function Yi(t) {
  return (t ?? []).map((e) => (e ?? "").toString().trim()).filter(Boolean).join(", ");
}
const it = class extends se {
  constructor() {
    super(...arguments), this._unsubEntities = null, this._didSubEntities = !1, this._open = {
      general: !1,
      rolling: !1,
      filters: !1,
      typography: !1,
      appearance: !1,
      highlights: !1,
      colors: !1,
      sources: !1,
      manual: !1
    }, this._uiLoaded = !1, this._stopEvent = (e) => {
      try {
        e?.stopPropagation?.();
      } catch {
      }
    }, this._rowOpen = {}, this._showCellStyles = !1, this._manualWeek = "A", this._onPreviewCell = (e) => this.openPreviewCell(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._previewDialog = tt(this), this._previewDialog?.addEventListener("stundenplan-edit-cell", this._onPreviewCell), this.ensureUiLoaded(), this.ensureEntitySubscription();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._previewDialog?.removeEventListener("stundenplan-edit-cell", this._onPreviewCell), this._previewDialog = null;
    try {
      this._unsubEntities?.();
    } catch {
    }
    this._unsubEntities = null, this._didSubEntities = !1;
  }
  async openPreviewCell(e) {
    const { config: i, rowIndex: n, dayIndex: s, week: r } = e.detail ?? {};
    if (!this._config || this._config.source_type !== "manual" || JSON.stringify(i) !== JSON.stringify(this._config)) return;
    const o = (r === "B" ? this._config.rows_b : this._config.rows)?.[n];
    if (!o || !Number.isInteger(n) || !C(o) && (!Number.isInteger(s) || s < 0 || s >= this._config.days.length) || (e.stopPropagation(), this._manualWeek = r === "B" ? "B" : "A", this._open = { ...this._open, manual: !0 }, this._rowOpen = { [n]: !0 }, this.requestUpdate(), await this.updateComplete, !this.isConnected)) return;
    const l = this.shadowRoot.querySelectorAll(".rowPanel")[n], d = C(o) ? l?.querySelector('ha-input[label="Pausentext"]') : l?.querySelectorAll(".lessonArea")[s];
    d?.scrollIntoView({ block: "nearest", inline: "nearest" }), d?.focus({ preventScroll: !0 });
  }
  async ensureEntitySubscription() {
    if (this._didSubEntities) return;
    const e = this.hass;
    if (!(!e || !e.connection))
      try {
        const i = e.connection.subscribeEntities;
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
  setConfig(e) {
    this.ensureUiLoaded();
    const i = ((e?.type ?? "") + "").toString();
    if (i !== "custom:stundenplan-card" && i !== "stundenplan-card")
      throw new Error(`Unsupported editor type: ${i}`);
    this._config = this.normalizeConfig(this.clone(e));
  }
  normalizeConfig(e) {
    return new We().normalizeConfig(e);
  }
  clone(e) {
    try {
      return structuredClone(e);
    } catch {
      return JSON.parse(JSON.stringify(e));
    }
  }
  emit(e) {
    this._config = e, Be(this, "config-changed", { config: e });
  }
  setValue(e, i) {
    this._config && this.emit({ ...this._config, [e]: i });
  }
  toggleOpen(e) {
    this._open = { ...this._open, [e]: !this._open[e] };
  }
  findBestRowsAttribute(e) {
    const i = this.hass?.states?.[e]?.attributes ?? {};
    return i.rows_ha != null ? { attr: "rows_ha", timeKey: "time" } : i.rows != null ? { attr: "rows", timeKey: "time" } : i.rows_table != null ? { attr: "rows_table", timeKey: "time" } : i.rows_json != null ? { attr: "rows_json", timeKey: "time" } : { attr: "rows_ha", timeKey: "time" };
  }
  setSourceType(e) {
    if (!this._config) return;
    const i = e === "entity" || e === "json" || e === "manual" || e === "sensor" ? e : "manual", n = { ...this._config, source_type: i };
    i === "json" && n.json_url == null && (n.json_url = ""), i === "entity" && (n.source_entity == null && (n.source_entity = ""), n.source_attribute = "rows_table", n.source_time_key = "time"), i === "sensor" && (n.source_entity == null && (n.source_entity = ""), n.source_entity_integration = "", n.source_attribute = (n.source_attribute ?? "").toString().trim() || "plan", n.source_time_key = (n.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(n);
  }
  setSourceEntity(e) {
    if (!this._config) return;
    const i = (e ?? "").toString().trim(), n = (this._config.source_type ?? "manual").toString();
    if (n === "sensor") {
      this.emit({
        ...this._config,
        source_type: "sensor",
        source_entity: i,
        source_entity_legacy: i
      });
      return;
    }
    if (n === "entity") {
      const s = (i ?? "").toString().trim();
      let r = "";
      s && (r = this.hass?.states?.[s]?.attributes?.week_offset_entity || Gt(s)), this.emit({
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
  setJsonUrl(e) {
    this._config && this.emit({
      ...this._config,
      source_type: "json",
      json_url: (e ?? "").toString()
    });
  }
  renderSection(e, i, n) {
    const s = !!this._open[i], r = {
      general: ["Titel, Schultage und die grundlegende Ansicht.", "M4 5h16M4 12h16M4 19h16M8 3v4M16 10v4M10 17v4"],
      sources: ["Woher dein Stundenplan kommt.", "M4 4h16v5H4zM4 15h16v5H4zM8 9v6M16 9v6"],
      manual: ["Fächer, Zeiten und Pausen selbst eintragen.", "M4 4h16v16H4zM4 9h16M9 4v16M9 14h11"],
      filters: ["Fächer/Angebote gezielt ausblenden.", "M3 4h18l-7 8v7l-4 2v-9z"],
      rolling: ["Welche kommenden Schultage angezeigt werden.", "M4 5h16v16H4zM8 3v4M16 3v4M4 10h16M9 15h6M13 13l2 2-2 2"],
      typography: ["Textgrößen und Abstände deiner Karte.", "M3 5h12M9 5v15M6 20h6M15 12h6M18 12v8"],
      highlights: ["Heute, aktuellen Unterricht und Pausen hervorheben.", "M12 3l3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1z"],
      colors: ["Farben und Transparenz der Hervorhebungen.", "M12 3C8 8 5 11 5 15a7 7 0 0 0 14 0c0-4-3-7-7-12zM8 15a4 4 0 0 0 4 4"],
      appearance: ["Kartenflächen, Tabellenlinien und Transparenz.", "M3 4h18v16H3zM3 9h18M3 14h18M9 9v11"]
    }, [a, o] = r[i] ?? ["", "M4 4h16v16H4z"];
    return c`
      <div class="section" data-section=${i}>
        <button type="button" class="sectionHead" aria-expanded=${String(s)} aria-controls=${`section-${i}`} @click=${() => this.toggleOpen(i)}>
          <svg class="sectionIcon" viewBox="0 0 24 24" aria-hidden="true"><path d=${o}></path></svg>
          <span class="sectionLabels"><span class="sectionTitle">${e}</span><span class="sectionDescription">${a}</span></span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d=${s ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"}></path></svg>
        </button>
        ${s ? c`<div class="sectionBody" id=${`section-${i}`}>${n}</div>` : c``}
      </div>
    `;
  }
  getFilterSubjects() {
    const e = this._config;
    let i = [];
    if ((e.source_type ?? "manual") === "manual")
      i = [...e.rows ?? [], ...e.week_mode === "kw_parity" ? e.rows_b ?? [] : []];
    else if (e.source_type !== "json") {
      const s = new We();
      s.hass = this.hass, i = s.getRowsResolved(e);
    }
    const n = [...e.hidden_subjects ?? []];
    for (const s of i ?? [])
      if (!C(s))
        for (const r of s.cells ?? [])
          for (const a of String(r).split(/\r?\n\s*\r?\n/)) {
            const o = Zt(a);
            o && !/^[\s—–-]+$/.test(o) && n.push(o);
          }
    return Fe(n).sort((s, r) => s.localeCompare(r, "de"));
  }
  renderFilterSettings() {
    if (!this._open.filters) return this.renderSection("Inhalte filtern", "filters", b);
    const e = this._config.hidden_subjects ?? [], i = this.getFilterSubjects();
    return this.renderSection("Inhalte filtern", "filters", c`
      <div class="hint">Wähle die Fächer/Angebote aus, an denen dein Kind nicht teilnimmt. Nur diese Karte wird gefiltert; die Quelldaten bleiben unverändert.</div>
      ${i.length ? c`<div class="subjectChoices" role="group" aria-label="Zum Ausblenden auswählen">
        ${i.map((n) => c`<label class="subjectChoice">
          <input type="checkbox" .checked=${e.some((s) => Z(s) === Z(n))}
            @change=${(s) => this.setValue("hidden_subjects", s.target.checked ? Fe([...e, n]) : e.filter((r) => Z(r) !== Z(n)))}>
          <span>${n}</span>
        </label>`)}
      </div>` : c`<div class="hint">Keine Fächer/Angebote in der aktuellen Quelle gefunden. Du kannst sie unten selbst ergänzen.</div>`}
      <form class="subjectAdd" @submit=${(n) => {
      n.preventDefault();
      const s = n.currentTarget.elements.namedItem("subject");
      s.value.trim() && (this.setValue("hidden_subjects", Fe([...e, s.value])), s.value = "");
    }}>
        <label>Fächer/Angebote ergänzen<input name="subject" type="text" placeholder="z. B. Ess/Spi GT" autocomplete="off"></label>
        <button type="submit" class="spBtn">Hinzufügen</button>
      </form>
      <div class="hint">Verglichen wird der vollständige Fachname in der ersten Zeile, nicht Raum, Lehrkraft oder Hinweise. Groß-/Kleinschreibung spielt keine Rolle. Neue Namen werden nicht automatisch ausgewählt.</div>
      ${e.length ? c`<div class="infoBox slim">${e.length} Fächer/Angebote ausgeblendet. Vollständig leere Endzeilen werden gekürzt. „Nach der letzten Stunde“ berücksichtigt nur die verbleibenden Einträge des jeweiligen Tages.</div>
        <button type="button" class="spBtn" @click=${() => this.setValue("hidden_subjects", [])}>Alle Einträge wieder anzeigen</button>` : b}
    `);
  }
  onToggle(e, i) {
    const n = !!e?.target?.checked;
    this.setValue(i, n);
  }
  onText(e, i) {
    if (!this._config) return;
    const n = e?.detail?.value ?? e?.target?.value ?? e?.currentTarget?.value ?? e?.target?.checked ?? "";
    this.emit({
      ...this._config,
      [i]: n
    });
  }
  getManualRowsKey() {
    return this._config?.week_mode === "kw_parity" && this._manualWeek === "B" ? "rows_b" : "rows";
  }
  getManualRows() {
    const e = this.getManualRowsKey();
    return Array.isArray(this._config?.[e]) ? this.clone(this._config[e]) : [];
  }
  emitManualRows(e) {
    if (!this._config) return;
    const i = this.getManualRowsKey();
    this.emit({ ...this._config, [i]: e });
  }
  addManualRow() {
    if (!this._config) return;
    const e = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = this.getManualRows(), n = { time: `${i.length + 1}.`, cells: Array.from({ length: e.length }, () => "") };
    i.push(n), this.emitManualRows(i);
  }
  insertManualRowBelow(e) {
    if (!this._config) return;
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = this.getManualRows(), s = { time: `${e + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    n.splice(e + 1, 0, s), this.emitManualRows(n);
  }
  insertManualBreakBelow(e) {
    if (!this._config) return;
    const i = this.getManualRows();
    i.splice(e + 1, 0, { break: !0, time: "", label: "Pause" }), this.emitManualRows(i);
  }
  removeManualRow(e) {
    if (!this._config) return;
    const i = this.getManualRows();
    i.splice(e, 1), this.emitManualRows(i);
  }
  updateManualRow(e, i) {
    if (!this._config) return;
    const n = this.getManualRows(), s = n[e];
    n[e] = { ...s, ...i }, this.emitManualRows(n);
  }
  updateManualCell(e, i, n) {
    if (!this._config) return;
    const s = this.getManualRows(), r = s[e];
    if (!r || C(r)) return;
    const a = r, o = Array.isArray(a.cells) ? a.cells.slice() : [];
    o[i] = n, s[e] = { ...a, cells: o }, this.emitManualRows(s);
  }
  addLessonRow() {
    this.addManualRow();
  }
  addBreakRow() {
    if (!this._config) return;
    const e = this.getManualRows();
    e.push({ break: !0, time: "", label: "Pause" }), this.emitManualRows(e);
  }
  toggleManualBreak(e, i) {
    if (!this._config) return;
    const n = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = this.getManualRows(), r = s[e];
    if (r) {
      if (i) {
        const a = (r.time ?? "").toString(), o = (r.label ?? "Pause").toString();
        s[e] = { break: !0, time: a, label: o };
      } else {
        const a = (r.time ?? "").toString();
        s[e] = { time: a, start: "", end: "", cells: Array.from({ length: n.length }, () => "") };
      }
      this.emitManualRows(s);
    }
  }
  updateManualCellStyle(e, i, n) {
    if (!this._config) return;
    const s = this.getManualRows(), r = s[e];
    if (!r || C(r)) return;
    const a = r, o = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = o[i] ?? {};
    o[i] = { ...l, ...n }, s[e] = { ...a, cell_styles: o }, this.emitManualRows(s);
  }
  renderManualRows() {
    if (!this._config) return c``;
    const e = this._config, i = e.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = e.week_mode === "kw_parity", s = n && this._manualWeek === "B" ? "B" : "A", r = s === "B" && Array.isArray(e.rows_b) ? e.rows_b : Array.isArray(e.rows) ? e.rows : [];
    return c`
      <div class="manualWeekBox">
        <div class="optRow">
          <div>
            <div class="optTitle">Wechselwochen A/B</div>
            <div class="sub">Zwei manuelle Pläne automatisch nach Kalenderwoche wechseln.</div>
          </div>
          <ha-switch
            .checked=${n}
            @change=${(a) => {
      const o = !!a?.target?.checked, l = Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : this.clone(e.rows ?? []);
      this._manualWeek = "A", this._rowOpen = {}, this.emit({ ...e, week_mode: o ? "kw_parity" : "off", rows_b: l });
    }}
          ></ha-switch>
        </div>

        ${n ? c`
          <ha-form
            .hass=${this.hass}
            .data=${{ week_a_is_even_kw: Y(e.week_a_is_even_kw, !0) }}
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
                class=${`spBtn ${s === a ? "spBtnActive" : ""}`}
                @click=${() => {
      this._manualWeek = a, this._rowOpen = {}, this.requestUpdate();
    }}
              >Woche ${a} bearbeiten</button>
            `)}
          </div>
          <div class="hint">Aktuell bearbeitest du Woche ${s}. Die Karte zeigt automatisch den zur Kalenderwoche passenden Plan.</div>
        ` : c``}
      </div>

      <div class="rowsTop">
        <div class="rowsTitle">Stundenplan${n ? ` · Woche ${s}` : ""}</div>

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
      const l = C(a), d = l ? `Pause · ${(a.time ?? "").toString()}` : `Stunde · ${(a.time ?? "").toString()}`, u = a, h = (u.start ?? "").toString(), g = (u.end ?? "").toString(), _ = (a.label ?? "Pause").toString();
      return c`
          <details
            class="rowPanel"
            ?open=${this._rowOpen?.[o] ?? !1}
            @toggle=${(p) => {
        try {
          this._rowOpen[o] = !!p?.target?.open;
        } catch {
        }
      }}
          >
            <summary>
              <div class="rowHead">
                <div class="rowHeadTitle">${d || `Zeile ${o + 1}`}</div>
                <div class="rowHeadMeta">${l ? _ : `${h || "Start?"} – ${g || "Ende?"}`}</div>
              </div>
            </summary>

            <div class="rowBody">
              <div class="grid2">
                <ha-input
                  label="Zeit / Stunde"
                  .value=${(a.time ?? "").toString()}
                  placeholder="z. B. 1. 08:00–08:45"
                  @input=${(p) => this.updateManualRow(o, { time: p?.target?.value ?? "" })}
                ></ha-input>

                <div class="optRow">
                  <div>
                    <div class="optTitle">Pause</div>
                    <div class="sub">Zeile als Pause rendern (colspan).</div>
                  </div>
                  <ha-switch .checked=${l} @change=${(p) => this.toggleManualBreak(o, !!p?.target?.checked)}></ha-switch>
                </div>
              </div>

              ${l ? c`
                    <ha-input
                      label="Pausentext"
                      .value=${_}
                      placeholder="z. B. Große Pause"
                      @input=${(p) => this.updateManualRow(o, { label: p?.target?.value ?? "" })}
                    ></ha-input>
                  ` : c`
                    <div class="grid2" style="margin-top:10px;">
                      <ha-input
                        label="Start (HH:MM)"
                        .value=${h}
                        @input=${(p) => this.updateManualRow(o, { start: p?.target?.value ?? "" })}
                      ></ha-input>
                      <ha-input
                        label="Ende (HH:MM)"
                        .value=${g}
                        @input=${(p) => this.updateManualRow(o, { end: p?.target?.value ?? "" })}
                      ></ha-input>
                    </div>

                    <div class="cellsGrid">
                      ${i.map((p, f) => {
        const m = (u.cells?.[f] ?? "").toString(), w = (Array.isArray(u.cell_styles) ? u.cell_styles?.[f] : void 0) ?? {}, $ = typeof w?.bg_alpha == "number" && !Number.isNaN(w.bg_alpha) ? w.bg_alpha : 0.18;
        return c`
                          <div class="cellEditor">
                            <div class="cellEditorHead">${p}</div>

                            <textarea
                              class="lessonArea" rows="2"
                              .value=${m}
                              @input=${(A) => this.updateManualCell(o, f, A?.target?.value ?? "")}
                              placeholder="Fach&#10;Raum&#10;Lehrer + Info-Zeilen"
                            ></textarea>

                            <div class=${this._showCellStyles ? "cellStyles" : "cellStyles cellStyles--hidden"}>
                              ${this.renderColorPicker("Hintergrund", Jt(w) ?? "", (A) => {
          const k = Ge(A);
          this.updateManualCellStyle(o, f, A ? { bg: A, bg_alpha: k.alpha } : { bg: "", bg_alpha: 0.18 });
        }, "#2196f3", $)}
                              ${this.renderColorPicker("Text", w.color ?? "", (A) => this.updateManualCellStyle(o, f, { color: A }), "#ffffff")}
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
  renderToggle(e, i, n = !1) {
    return c`<label class="toggleRow"><span>${i}</span><ha-switch
      .checked=${Y(this._config[e], n)}
      @change=${(s) => this.onToggle(s, e)}></ha-switch></label>`;
  }
  renderColorPicker(e, i, n, s = "#2196f3", r = 1) {
    const a = Ge(i, s, r), o = [
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
    ], l = (d, u) => {
      const h = ot(d);
      h && n(`rgba(${h.r}, ${h.g}, ${h.b}, ${Math.round(u * 100) / 100})`);
    };
    return c`<fieldset class="colorPicker">
      <legend>${e}</legend>
      <div class="palette">
        ${o.map(([d, u]) => c`<button type="button" class="swatch"
          style=${`--swatch:${d}`} title=${u} aria-label=${`${e}: ${u}`}
          aria-pressed=${a.hex.toLowerCase() === d}
          @click=${() => l(d, a.alpha)}></button>`)}
        <input type="color" class="customColor" aria-label=${`${e}: eigene Farbe`}
          title="Eigene Farbe" .value=${a.hex} @input=${(d) => l(d.target.value, a.alpha)} />
      </div>
      <label class="opacityControl"><span>Transparenz</span>
        <input type="range" min="0" max="100" aria-label=${`${e}: Transparenz`}
          .value=${String(Math.round((1 - a.alpha) * 100))}
          @input=${(d) => l(a.hex, 1 - Number(d.target.value) / 100)} />
        <output>${Math.round((1 - a.alpha) * 100)}%</output>
      </label>
      <div class="colorFooter"><span class="colorPreview" style=${`background:${i || s}`}></span>
        <button type="button" class="resetColor" @click=${() => n("")}>Zurücksetzen</button>
        <details class="colorAdvanced"><summary>Farbcode</summary>
          <input aria-label=${`${e}: Farbcode`} .value=${i ?? ""}
            @change=${(d) => n(d.target.value)} />
        </details>
      </div>
    </fieldset>`;
  }
  renderConfigColor(e, i, n, s = 1) {
    return this.renderColorPicker(e, this._config[i], (r) => {
      this.setValue(i, r || We.getStubConfig()[i]);
    }, n, s);
  }
  renderAppearanceColor(e) {
    const i = getComputedStyle(this).getPropertyValue(e.theme).trim(), n = Ge(i, e.fallback).hex;
    return this.renderColorPicker(e.label, this._config[e.key] ?? "", (s) => {
      const r = { ...this._config }, a = Xe({ [e.key]: s })[e.key];
      a ? r[e.key] = a : delete r[e.key], this.emit(r);
    }, n);
  }
  renderTypographyInput(e) {
    return c`<ha-input
      label=${e.label} type="number" min=${e.min} max=${e.max} step="1"
      placeholder="Standard" .value=${String(this._config[e.key] ?? "")}
      @change=${(i) => {
      const n = et({ [e.key]: i.target.value })[e.key], s = { ...this._config };
      n == null ? delete s[e.key] : s[e.key] = n, this.emit(s);
    }}
    ></ha-input>`;
  }
  resetTypography() {
    const e = { ...this._config, title_font_size: 20 };
    for (const { key: i } of ne) delete e[i];
    this.emit(e);
  }
  renderSourceSettings() {
    const e = this._config;
    return this.renderSection(
      "Datenquellen",
      "sources",
      c`
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{
        source_type: e.source_type ?? "manual"
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
                ...(e.source_type ?? "manual") === "json" ? [{ value: "json", label: "JSON-Datei (deprecated)" }] : [],
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
          const n = (i?.detail?.value ?? {}).source_type ?? e.source_type ?? "manual";
          n !== (e.source_type ?? "manual") && this.setSourceType(n);
        } catch (n) {
          console.error("stundenplan-card editor: ha-form value-changed failed", n);
        }
      }}
              ></ha-form>
            </div>

            ${(e.source_type ?? "manual") === "entity" ? c`
                  <div class="hint">Stundenplan Suite: Wochensensor für Stundenplan24 oder Schulmanager auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), n = i.filter((s) => /^sensor\./.test(s) && (/_woche$/i.test(s) || this.hass?.states?.[s]?.attributes?.rows_table != null));
        return i.length < 5 || n.length === 0 ? c`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : c``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.source_entity_integration ?? e.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const s = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !s || /_woche$/i.test(s) || this.hass?.states?.[s]?.attributes?.rows_table != null;
      }}
                      .label=${"Stundenplan Suite Sensor"}
                      @value-changed=${(i) => {
        try {
          const n = i.detail?.value ?? i.target?.value, s = typeof n == "string" ? n : n && typeof n == "object" ? n.entity_id : void 0;
          this.setSourceEntity(s);
        } catch (n) {
          console.error("stundenplan-card editor: setSourceEntity failed", n);
        }
      }}
                    ></ha-entity-picker>
                  ` : c``}

                  ${this.isHaEntityPickerAvailable() ? b : c`<ha-input
                    label="Stundenplan Suite Entity-ID"
                    .value=${e.source_entity_integration ?? e.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.05b_woche"
                  ></ha-input>`}
                ` : c``}

            ${(e.source_type ?? "manual") === "sensor" ? c`
                  <div class="hint">Beliebiger Sensor (JSON): beliebiger <code>sensor.*</code> (z.B. REST-Sensor). Attribut/Time-Key nach Datenformat.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${e.source_entity ?? ""}
                      .includeDomains=${["sensor"]}
                      .entityFilter=${(i) => {
        const s = ((typeof i == "string" ? i : i && typeof i == "object" && "entity_id" in i ? i.entity_id : "") ?? "").toString();
        return !s || /^sensor\./.test(s);
      }}
                      .label=${"Sensor (JSON)"}
                      @value-changed=${(i) => {
        try {
          const n = i.detail?.value ?? i.target?.value, s = typeof n == "string" ? n : n && typeof n == "object" ? n.entity_id : void 0;
          this.setSourceEntity(s);
        } catch (n) {
          console.error("stundenplan-card editor: setSourceEntity failed", n);
        }
      }}
                    ></ha-entity-picker>
                  ` : c``}

                  ${this.isHaEntityPickerAvailable() ? b : c`<ha-input
                    label="Sensor Entity-ID (manuell)"
                    .value=${e.source_entity ?? ""}
                    @input=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @change=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)} @value-changed=${(i) => this.setSourceEntity(i?.detail?.value ?? i?.target?.value ?? i?.currentTarget?.value)}
placeholder="sensor.stundenplan"
                  ></ha-input>`}

                  <div class="grid2">
                    <ha-input label="Attribut" .value=${e.source_attribute ?? ""} @input=${(i) => this.onText(i, "source_attribute")} @change=${(i) => this.onText(i, "source_attribute")} @value-changed=${(i) => this.onText(i, "source_attribute")} placeholder="plan"></ha-input>
                    <ha-input label="Time-Key" .value=${e.source_time_key ?? ""} @input=${(i) => this.onText(i, "source_time_key")} @change=${(i) => this.onText(i, "source_time_key")} @value-changed=${(i) => this.onText(i, "source_time_key")} placeholder="Stunde"></ha-input>
                  </div>
                  <div class="hint">Sensor (JSON): REST-Sensor + JSON-Attribut (z.B. <code>plan</code>) und Zeit-Key (z.B. <code>Stunde</code>).</div>

                  <div class="hint" style="margin-top:10px;">
                    Wechselwochen (A/B) gehört zu „Single-Source (Legacy / einfach)“.
                  </div>

                  <div class="grid2">
                    <ha-form
                      .hass=${this.hass}
                      .data=${{
        week_mode: e.week_mode ?? "off",
        week_a_is_even_kw: Y(e.week_a_is_even_kw, !0)
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
          const n = i?.detail?.value ?? {}, s = n.week_mode ?? e.week_mode ?? "off";
          s !== (e.week_mode ?? "off") && this.setValue("week_mode", s);
          const r = n.week_a_is_even_kw;
          typeof r == "boolean" && r !== Y(e.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
        } catch (n) {
          console.error("stundenplan-card editor: week settings change failed", n);
        }
      }}
                    ></ha-form>
                  </div>
` : c``}

          `
    );
  }
  renderRollingSettings() {
    const e = this._config;
    return this.renderSection("Rolling", "rolling", c`
      <div class="grid2">
        <div class="gridFull">${this.renderToggle("rolling_week_only", "Auf Kalenderwoche begrenzen")}</div>
        ${e.rolling_week_only ? c`<div class="hint gridFull">Endet am Sonntag der Startwoche. Am Wochenende beginnt die Ansicht beim nächsten Schultag; auch „Nach der letzten Stunde“ bleibt wirksam.</div>` : b}
        <ha-input
          label="Zusätzliche Tage im Voraus"
          type="number"
          .value=${String(e.days_ahead ?? 0)}
          @input=${(i) => {
      const n = Number(i.target.value);
      this.setValue("days_ahead", Number.isFinite(n) ? Math.max(0, Math.min(6, Math.floor(n))) : 0);
    }}
          hint="0 = nur Starttag, 1 = Starttag + nächster Schultag"
        ></ha-input>
        <ha-form
          .hass=${this.hass}
          .data=${{ rolling_switch_mode: e.rolling_switch_mode ?? "midnight" }}
          .schema=${[{
      name: "rolling_switch_mode",
      selector: { select: { mode: "dropdown", options: [
        { value: "midnight", label: "Ab 00:00 Uhr" },
        { value: "after_last_lesson", label: "Nach der letzten Stunde" },
        { value: "fixed_time", label: "Feste Umschaltzeit" }
      ] } }
    }]}
          .computeLabel=${(i) => i?.name === "rolling_switch_mode" ? "Auf nächsten Tag springen" : i?.name}
          @value-changed=${(i) => {
      try {
        i?.stopPropagation?.();
        const n = (i?.detail?.value ?? {}).rolling_switch_mode ?? "midnight";
        this.setValue("rolling_switch_mode", n);
      } catch (n) {
        console.error("stundenplan-card editor: rolling_switch_mode change failed", n);
      }
    }}
        ></ha-form>
        ${(e.rolling_switch_mode ?? "midnight") === "fixed_time" ? c`
          <ha-input class="gridFull"
            label="Umschaltzeit (HH:MM)"
            .value=${e.rolling_switch_time ?? ""}
            @input=${(i) => this.onText(i, "rolling_switch_time")}
            hint="Beispiel: 15:00"
          ></ha-input>
        ` : c`<div class="infoBox slim gridFull">${(e.rolling_switch_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung auf den nächsten Schultag folgt nach der letzten Endzeit aus deinem Plan." : "Der Sprung auf den nächsten Schultag folgt direkt ab Mitternacht."}</div>`}
      </div>
      <div class="hint">Ab dem Starttag werden die nächsten passenden Schultage angezeigt. Beim Blättern in andere Wochen beginnt die Ansicht am Montag.</div>
    `);
  }
  render() {
    if (!this._config) return c``;
    const e = this._config;
    return c`
      <div class="wrap">
        ${this.renderSection(
      "Allgemein",
      "general",
      c`
<div class="generalDivider first">Grunddaten</div>
            <div class="grid2">
              <ha-input label="Titel der Karte" .value=${e.title ?? ""} @input=${(i) => this.onText(i, "title")}></ha-input>

              <ha-input
                label="Schultage (CSV)"
                .value=${Yi(e.days ?? [])}
                @input=${(i) => this.setValue("days", Ki(i.target.value))}
                hint="Beispiel: Mo, Di, Mi, Do, Fr"
              ></ha-input>
            </div>

            <div class="generalDivider">Titel & Kopfzeile</div>
            <div class="toggleGroup">
              ${this.renderToggle("show_title", "Titelzeile anzeigen", !0)}
              ${this.renderToggle("show_header_date", "Datum anzeigen", !0)}
              ${this.renderToggle("show_time_column", "Spalte „Stunde“ anzeigen", !0)}
              ${this.renderToggle("show_week_navigation", "Wochennavigation anzeigen", !0)}
            </div>
            <div class="generalDivider">Ansicht</div>
            <div class="grid2">
              <ha-form
                .hass=${this.hass}
                .data=${{ view_mode: e.view_mode ?? "week" }}
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
          const n = (i?.detail?.value ?? {}).view_mode ?? "week";
          this.setValue("view_mode", n);
        } catch (n) {
          console.error("stundenplan-card editor: view_mode change failed", n);
        }
      }}
              ></ha-form>

              <ha-form
                .hass=${this.hass}
                .data=${{ display_mode: e.display_mode ?? "default" }}
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
          const n = (i?.detail?.value ?? {}).display_mode ?? "default";
          this.setValue("display_mode", n);
        } catch (n) {
          console.error("stundenplan-card editor: display_mode change failed", n);
        }
      }}
              ></ha-form>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Leere Endstunden ausblenden</div>
                  <div class="sub">Nur bis zur letzten belegten Stunde anzeigen.</div>
                </div>
                <ha-switch .checked=${Y(e.trim_empty_rows, !1)} @change=${(i) => this.onToggle(i, "trim_empty_rows")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleiche Folgestunden verbinden</div>
                  <div class="sub">Identische Fächer ohne Pausenzeile zusammenfassen.</div>
                </div>
                <ha-switch .checked=${Y(e.merge_double_lessons, !1)} @change=${(i) => this.onToggle(i, "merge_double_lessons")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleichmäßige Spaltenbreiten</div>
                  <div class="sub">Für mehrere gleich breite Karten untereinander.</div>
                </div>
                <ha-switch .checked=${Y(e.equal_column_widths, !1)} @change=${(i) => this.onToggle(i, "equal_column_widths")}></ha-switch>
              </div>

            </div>

            <div class="generalDivider">Beim Antippen</div>
            <div class="stack">
              <ha-form
                .hass=${this.hass}
                .data=${{ tap_action_action: ((e.tap_action?.action ?? "none") + "").toString() }}
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
          const n = (i?.detail?.value ?? {}).tap_action_action ?? "none";
          this.setValue("tap_action", { ...e.tap_action ?? {}, action: n });
        } catch (n) {
          console.error("stundenplan-card editor: tap_action change failed", n);
        }
      }}
              ></ha-form>

              ${((e.tap_action?.action ?? "none") + "").toString() === "toggle_view" ? c`
                <div class="hint">Ein Tipp auf die Karte wechselt zwischen „Ganze Woche“ und „Ab heute (rolling)“.</div>
              ` : ((e.tap_action?.action ?? "none") + "").toString() === "popup_week" ? c`
                <div class="hint">Ein Tipp auf die Karte öffnet ein Popup mit der aktuellen ganzen Woche. Ein weiterer Tipp auf das Popup schließt es wieder.</div>
              ` : c`<div class="hint">Für Wallpanels sind meist „Ansicht umschalten“ oder „Wochen-Popup“ die sinnvollsten Varianten.</div>`}
            </div>
          `
    )}

        ${this.renderSourceSettings()}
        ${(e.source_type ?? "manual") === "manual" ? this.renderSection("Manueller Stundenplan", "manual", this.renderManualRows()) : b}
        ${this.renderFilterSettings()}
        ${(e.view_mode ?? "week") === "rolling" ? this.renderRollingSettings() : b}

        ${this.renderSection("Schrift & Abstände", "typography", c`
          <div class="hint">Alle Größen in Pixeln. Leere Felder verwenden die bisherigen Vorgaben der normalen oder kompakten Ansicht.</div>
          ${e.show_title !== !1 ? c`
            <div class="generalDivider first">Kartentitel</div>
            <div class="grid2">
              <ha-input label="Titelgröße normal (px)" type="number" min="10" max="40" step="1"
                placeholder="Standard: 20" .value=${String(e.title_font_size ?? 20)}
                @change=${(i) => {
      const n = i.target.value, s = n === "" ? 20 : Number(n);
      this.setValue("title_font_size", Number.isFinite(s) ? Math.max(10, Math.min(40, s)) : 20);
    }}></ha-input>
              ${this.renderTypographyInput(ne.find(({ key: i }) => i === "font_size_title_compact"))}
              <ha-input class="gridFull" label="Titel-Schriftfamilie (optional)"
                .value=${e.title_font_family ?? ""}
                @input=${(i) => this.onText(i, "title_font_family")}></ha-input>
            </div>
          ` : b}
          <div class=${e.show_title !== !1 ? "generalDivider" : "generalDivider first"}>Kopfzeile & Tabelle</div>
          <div class="grid2">
            ${["header_table_gap", "font_size_header"].map((i) => this.renderTypographyInput(ne.find((n) => n.key === i)))}
            <div class="hint gridFull">Der Abstand gilt unterhalb von Titel und Navigation: leer = bisheriger Abstand, 0 = kein zusätzlicher Abstand.</div>
          </div>
          <div class="generalDivider">Stunden & Inhalte</div>
          <div class="grid2">
            ${["font_size_time", "font_size_subject", "font_size_details", "row_height"].map((i) => this.renderTypographyInput(ne.find((n) => n.key === i)))}
            <div class="hint gridFull">Die Mindesthöhe gilt pro Stundenzeile. Mehrzeilige Inhalte dürfen die Zeile vergrößern; Pausenzeilen bleiben kompakt.</div>
          </div>
          <button type="button" class="spBtn" @click=${() => this.resetTypography()}>Größen zurücksetzen</button>
        `)}

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
              ${e.show_time_column !== !1 ? this.renderToggle("highlight_current_time_text", "Aktuelle Zeit farbig anzeigen") : b}
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
              ${e.highlight_current_text ? this.renderConfigColor("Aktuelles Fach: Text", "highlight_current_text_color", "#ff1744") : b}
              ${e.highlight_current_time_text && e.show_time_column !== !1 ? this.renderConfigColor("Aktuelle Zeit: Text", "highlight_current_time_text_color", "#ff9100") : b}
            </div>
          `
    )}
        ${this.renderSection(
      "Hintergründe & Linien",
      "appearance",
      c`
        <div class="hint">Optional für transparente Dashboards. Zurücksetzen verwendet wieder Theme oder CSS-Vorgaben. Eigene Fachfarben und Highlights bleiben erhalten.</div>
        <div class="stack">
          ${ct.map((i) => this.renderAppearanceColor(i))}
        </div>
      `
    )}
      </div>
    `;
  }
};
it.properties = {
  hass: {},
  _config: { state: !0 }
}, it.styles = Ot`
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
      gap: 10px;
    }
    .section {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    .sectionHead {
      width: 100%;
      padding: 10px;
      border: 0;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: center;
      background: transparent;
      user-select: none;
    }
    .sectionHead:hover { background: var(--secondary-background-color); }
    .sectionHead:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -3px; }
    .sectionLabels { flex: 1; min-width: 0; }
    .sectionTitle {
      display: block;
      font-size: 13px;
      line-height: 1.4;
      font-weight: 700;
    }
    .sectionDescription {
      display: block;
      font-size: 12px;
      line-height: 1.35;
      color: var(--secondary-text-color, var(--primary-text-color));
      overflow-wrap: anywhere;
    }
    .sectionIcon, .chev { width: 22px; height: 22px; flex: 0 0 auto; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    .chev { width: 18px; height: 18px; opacity: 0.8; }
    .sectionBody {
      padding: 12px;
      display: grid;
      gap: 10px;
    }
    .sectionBody > *, .grid2 > *, .optRow > div { min-width: 0; }
    .subjectChoices { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 4px; }
    .subjectChoice { display: flex; align-items: center; gap: 8px; padding: 6px; cursor: pointer; min-width: 0; }
    .subjectChoice span { overflow-wrap: anywhere; }
    .subjectChoice input { width: 18px; height: 18px; flex: 0 0 auto; accent-color: var(--primary-color); }
    .subjectAdd { display: flex; gap: 8px; align-items: end; flex-wrap: wrap; }
    .subjectAdd label { flex: 1 1 170px; min-width: 0; font-size: 12px; }
    .subjectAdd input { display: block; width: 100%; padding: 10px; margin-top: 4px; border: 1px solid var(--divider-color); border-radius: 6px; background: var(--secondary-background-color); color: inherit; font: inherit; }
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
let Qt = it;
T([
  U()
], Qt.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", We);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", Qt);
window.__STUNDENPLAN_CARD_VERSION = "v3.8.0";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v3.8.0 (marker: STUNDENPLAN_CARD_v3.8.0)",
  preview: !0
});
export {
  We as StundenplanCard,
  Qt as StundenplanCardEditor
};
