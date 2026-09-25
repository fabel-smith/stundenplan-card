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
const At = globalThis, ee = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = /* @__PURE__ */ Symbol(), ve = /* @__PURE__ */ new WeakMap();
let We = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ve.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ve.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const di = (e) => new We(typeof e == "string" ? e : e + "", void 0, ie), Be = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[r + 1], e[0]);
  return new We(i, e, ie);
}, hi = (e, t) => {
  if (ee) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = At.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, $e = ee ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return di(i);
})(e) : e, { is: ui, defineProperty: pi, getOwnPropertyDescriptor: gi, getOwnPropertyNames: _i, getOwnPropertySymbols: fi, getPrototypeOf: mi } = Object, H = globalThis, xe = H.trustedTypes, yi = xe ? xe.emptyScript : "", wi = H.reactiveElementPolyfillSupport, ut = (e, t) => e, jt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? yi : null;
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
} }, ne = (e, t) => !ui(e, t), ke = { attribute: !0, type: String, converter: jt, reflect: !1, useDefault: !1, hasChanged: ne };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let tt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ke) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && pi(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = gi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      s?.call(this, r), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const e = mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const t = this.properties, i = [..._i(t), ...fi(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift($e(n));
    } else e !== void 0 && t.push($e(e));
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
    return hi(e, this.constructor.elementStyles), e;
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
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : jt).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : jt;
      this._$Em = n;
      const a = r.fromAttribute(t, s.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    if (e !== void 0) {
      const r = this.constructor;
      if (n === !1 && (s = this[e]), i ?? (i = r.getPropertyOptions(e)), !((i.hasChanged ?? ne)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), s !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: r } = s, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, s, a);
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
tt.elementStyles = [], tt.shadowRootOptions = { mode: "open" }, tt[ut("elementProperties")] = /* @__PURE__ */ new Map(), tt[ut("finalized")] = /* @__PURE__ */ new Map(), wi?.({ ReactiveElement: tt }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.1.2");
const pt = globalThis, Se = (e) => e, Wt = pt.trustedTypes, Ae = Wt ? Wt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Fe = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, Oe = "?" + O, bi = `<${Oe}>`, q = document, ft = () => q.createComment(""), mt = (e) => e === null || typeof e != "object" && typeof e != "function", se = Array.isArray, vi = (e) => se(e) || typeof e?.[Symbol.iterator] == "function", Yt = `[ 	
\f\r]`, dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, Ce = />/g, K = RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, De = /"/g, He = /^(?:script|style|textarea|title)$/i, $i = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = $i(1), st = /* @__PURE__ */ Symbol.for("lit-noChange"), b = /* @__PURE__ */ Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), J = q.createTreeWalker(q, 129);
function Ue(e, t) {
  if (!se(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ae !== void 0 ? Ae.createHTML(t) : t;
}
const xi = (e, t) => {
  const i = e.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = dt;
  for (let o = 0; o < i; o++) {
    const l = e[o];
    let d, u, h = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, u = a.exec(l), u !== null); ) g = a.lastIndex, a === dt ? u[1] === "!--" ? a = Me : u[1] !== void 0 ? a = Ce : u[2] !== void 0 ? (He.test(u[2]) && (s = RegExp("</" + u[2], "g")), a = K) : u[3] !== void 0 && (a = K) : a === K ? u[0] === ">" ? (a = s ?? dt, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? K : u[3] === '"' ? De : Ee) : a === De || a === Ee ? a = K : a === Me || a === Ce ? a = dt : (a = K, s = void 0);
    const _ = a === K && e[o + 1].startsWith("/>") ? " " : "";
    r += a === dt ? l + bi : h >= 0 ? (n.push(d), l.slice(0, h) + Fe + l.slice(h) + O + _) : l + O + (h === -2 ? o : _);
  }
  return [Ue(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class yt {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [d, u] = xi(t, i);
    if (this.el = yt.createElement(d, n), J.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = J.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Fe)) {
          const g = u[a++], _ = s.getAttribute(h).split(O), p = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: r, name: p[2], strings: _, ctor: p[1] === "." ? Si : p[1] === "?" ? Ai : p[1] === "@" ? Mi : Bt }), s.removeAttribute(h);
        } else h.startsWith(O) && (l.push({ type: 6, index: r }), s.removeAttribute(h));
        if (He.test(s.tagName)) {
          const h = s.textContent.split(O), g = h.length - 1;
          if (g > 0) {
            s.textContent = Wt ? Wt.emptyScript : "";
            for (let _ = 0; _ < g; _++) s.append(h[_], ft()), J.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[g], ft());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Oe) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(O, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += O.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = q.createElement("template");
    return n.innerHTML = t, n;
  }
}
function rt(e, t, i = e, n) {
  if (t === st) return t;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = mt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = rt(e, s._$AS(e, t.values), s, n)), t;
}
class ki {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (t?.creationScope ?? q).importNode(i, !0);
    J.currentNode = s;
    let r = J.nextNode(), a = 0, o = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new wt(r, r.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (d = new Ci(r, this, t)), this._$AV.push(d), l = n[++o];
      }
      a !== l?.index && (r = J.nextNode(), a++);
    }
    return J.currentNode = q, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class wt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = rt(this, t, i), mt(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== b && mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(q.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = yt.createElement(Ue(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new ki(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Te.get(t.strings);
    return i === void 0 && Te.set(t.strings, i = new yt(t)), i;
  }
  k(t) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of t) s === i.length ? i.push(n = new wt(this.O(ft()), this.O(ft()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Se(t).nextSibling;
      Se(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Bt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, r) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = b;
  }
  _$AI(t, i = this, n, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = rt(this, t, i, 0), a = !mt(t) || t !== this._$AH && t !== st, a && (this._$AH = t);
    else {
      const o = t;
      let l, d;
      for (t = r[0], l = 0; l < r.length - 1; l++) d = rt(this, o[n + l], i, l), d === st && (d = this._$AH[l]), a || (a = !mt(d) || d !== this._$AH[l]), d === b ? t = b : t !== b && (t += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Si extends Bt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
class Ai extends Bt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== b);
  }
}
class Mi extends Bt {
  constructor(t, i, n, s, r) {
    super(t, i, n, s, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = rt(this, t, i, 0) ?? b) === st) return;
    const n = this._$AH, s = t === b && n !== b || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== b && (n === b || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ci {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    rt(this, t);
  }
}
const Ei = pt.litHtmlPolyfillSupport;
Ei?.(yt, wt), (pt.litHtmlVersions ?? (pt.litHtmlVersions = [])).push("3.3.2");
const Di = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new wt(t.insertBefore(ft(), r), r, void 0, i ?? {});
  }
  return s._$AI(e), s;
}, gt = globalThis;
class it extends tt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Di(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return st;
  }
}
it._$litElement$ = !0, it.finalized = !0, gt.litElementHydrateSupport?.({ LitElement: it });
const Ti = gt.litElementPolyfillSupport;
Ti?.({ LitElement: it });
(gt.litElementVersions ?? (gt.litElementVersions = [])).push("4.2.2");
const zi = { attribute: !0, type: String, converter: jt, reflect: !1, hasChanged: ne }, Ri = (e = zi, t, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, e, o), o;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Le(e) {
  return (t, i) => typeof i == "object" ? Ri(e, t, i) : ((n, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(e, t, i);
}
function U(e) {
  return Le({ ...e, state: !0, attribute: !1 });
}
var Pi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, Ie = (e) => {
  throw TypeError(e);
}, T = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ni(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && Pi(t, i, s), s;
}, Ve = (e, t, i) => t.has(e) || Ie("Cannot " + i), W = (e, t, i) => (Ve(e, t, "read from private field"), i ? i.call(e) : t.get(e)), B = (e, t, i) => t.has(e) ? Ie("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), F = (e, t, i, n) => (Ve(e, t, "write to private field"), t.set(e, i), i), Mt, Ct, Et, Dt, Tt, zt, Rt, Pt;
function E(e) {
  return !!e && e.break === !0;
}
function Ft(e) {
  return Math.min(1, Math.max(0, e));
}
function re(e) {
  if (!e) return null;
  const t = e.replace("#", "").trim();
  if (t.length !== 6) return null;
  const i = parseInt(t.slice(0, 2), 16), n = parseInt(t.slice(2, 4), 16), s = parseInt(t.slice(4, 6), 16);
  return [i, n, s].some((r) => Number.isNaN(r)) ? null : { r: i, g: n, b: s };
}
function ae(e) {
  if (!e || typeof e != "object") return null;
  const t = {};
  return typeof e.bg == "string" && e.bg.trim() && (t.bg = e.bg.trim()), typeof e.color == "string" && e.color.trim() && (t.color = e.color.trim()), typeof e.border == "string" && e.border.trim() && (t.border = e.border.trim()), typeof e.bg_alpha == "number" && !Number.isNaN(e.bg_alpha) && (t.bg_alpha = Ft(e.bg_alpha)), Object.keys(t).length ? t : null;
}
function ze(e, t) {
  return (Array.isArray(e) ? e : []).map((i) => {
    if (E(i))
      return { break: !0, time: (i.time ?? "").toString(), label: (i.label ?? "Pause").toString() };
    const n = Array.isArray(i?.cells) ? i.cells : [], s = Array.from({ length: t.length }, (_, p) => (n[p] ?? "").toString()), r = Array.isArray(i?.cell_styles) ? i.cell_styles : [], a = Array.from({ length: t.length }, (_, p) => ae(r[p])), o = Array.isArray(i?.cell_times) ? Array.from({ length: t.length }, (_, p) => Ye(i.cell_times[p])) : [], l = (i?.time ?? "").toString(), d = nt(l), u = (i?.start ?? "").toString().trim(), h = (i?.end ?? "").toString().trim(), g = {
      time: l,
      start: u || d.start || void 0,
      end: h || d.end || void 0,
      cells: s
    };
    return a.some((_) => !!_) && (g.cell_styles = a), o.some((_) => !!_) && (g.cell_times = o), g;
  });
}
function Ke(e) {
  if (!e?.bg) return null;
  const t = e.bg.trim();
  if (t.startsWith("rgba(") || t.startsWith("rgb(") || t.startsWith("var(")) return t;
  const i = re(t);
  if (!i) return t;
  const n = typeof e.bg_alpha == "number" ? Ft(e.bg_alpha) : 0.18;
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${n})`;
}
function Jt(e, t = "#2196f3", i = 1) {
  const n = String(e ?? "").trim();
  if (n.toLowerCase() === "transparent") return { hex: t, alpha: 0 };
  const s = n.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (s) {
    const a = s[1].length === 3 ? [...s[1]].map((o) => o + o).join("") : s[1];
    return { hex: "#" + a.slice(0, 6), alpha: a.length === 8 ? parseInt(a.slice(6), 16) / 255 : i };
  }
  const r = n.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  return r ? {
    hex: "#" + r.slice(1, 4).map((a) => Math.min(255, Number(a)).toString(16).padStart(2, "0")).join(""),
    alpha: r[4] == null ? 1 : Ft(Number(r[4]))
  } : { hex: t, alpha: i };
}
function ji(e, t) {
  const i = [], n = Ke(e);
  return n && i.push(`background:${n}`), e?.color && i.push(`color:${e.color}`), i.push(`border:${e?.border ?? t}`), i.join(";") + ";";
}
function Re(e, t) {
  const i = (e ?? "").toString().trim();
  if (!i) return `rgba(0,0,0,${t})`;
  if (i.startsWith("rgba(") || i.startsWith("rgb(") || i.startsWith("var(")) return i;
  if (i.startsWith("#")) {
    const n = re(i);
    return n ? `rgba(${n.r}, ${n.g}, ${n.b}, ${Ft(t)})` : i;
  }
  return i;
}
function nt(e) {
  const t = (e ?? "").toString().match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return t ? { start: t[1], end: t[2] } : {};
}
function Ye(e) {
  if (e == null) return null;
  if (typeof e == "string") {
    const r = e.trim(), a = nt(r);
    return r ? { time: r, start: a.start, end: a.end } : null;
  }
  if (typeof e != "object") return null;
  const t = (e.time ?? "").toString().trim(), i = nt(t), n = (e.start ?? "").toString().trim() || i.start, s = (e.end ?? "").toString().trim() || i.end;
  return t || n || s ? { time: t || (n && s ? `${n}-${s}` : ""), start: n || void 0, end: s || void 0 } : null;
}
function qt(e) {
  return (e ?? "").toString().trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}
function Wi(e) {
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
function Pe(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() === 0 ? 7 : t.getUTCDay();
  t.setUTCDate(t.getUTCDate() + 4 - i);
  const n = t.getUTCFullYear(), s = new Date(Date.UTC(n, 0, 1)), r = s.getUTCDay() === 0 ? 7 : s.getUTCDay(), a = new Date(s);
  a.setUTCDate(s.getUTCDate() + (4 - r));
  const o = t.getTime() - a.getTime();
  return { isoWeek: 1 + Math.round(o / (10080 * 60 * 1e3)), isoYear: n };
}
function Ne(e) {
  const t = (e ?? "").toString().trim().toUpperCase();
  return t === "A" || t === "B" ? t : null;
}
function et(e) {
  const t = (e ?? "").toString().trim();
  return !t || t === "-" || t === "–" || t === "—";
}
function Bi(e, t, i = (n, s, r) => n?.cells?.[r] ?? "") {
  const n = Array.isArray(e) ? e : [], s = Array.isArray(t) ? t : [];
  let r = -1;
  return n.forEach((a, o) => {
    E(a) || s.some((l, d) => !et(i(a, o, l, d))) && (r = o);
  }), r >= 0 ? n.slice(0, r + 1) : [];
}
function Fi(e) {
  const t = (e ?? "").toString().replace(/\r/g, "").split(`
`).map((n) => n.trim()), i = [];
  for (const n of t)
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
function Oi(e) {
  const t = ae(e);
  if (!t) return "";
  const i = {};
  return t.bg && (i.bg = t.bg, i.bg_alpha = typeof t.bg_alpha == "number" ? t.bg_alpha : 0.18), t.color && (i.color = t.color), t.border && (i.border = t.border), Object.keys(i).length ? JSON.stringify(i) : "";
}
function Hi(e, t, i) {
  const n = Array.isArray(e) ? e : [];
  if (t < 0 || t >= n.length || E(n[t])) return { covered: !1, span: 1 };
  const s = (o) => {
    if (o < 0 || o >= n.length || E(n[o])) return null;
    const l = i(n[o], o) ?? {}, d = Fi(l.text);
    return et(d) ? null : JSON.stringify([d, Oi(l.style)]);
  }, r = s(t);
  if (!r) return { covered: !1, span: 1 };
  if (s(t - 1) === r) return { covered: !0, span: 0 };
  let a = 1;
  for (; s(t + a) === r; ) a += 1;
  return { covered: !1, span: a };
}
function Je(e) {
  const t = (e ?? "").toString().trim();
  if (!t.startsWith("sensor.")) return "";
  const i = t.slice(7), n = i.match(/^(.+)_woche$/i);
  if (n?.[1]) return `number.${n[1]}_woche_offset`;
  const s = i.match(/^stundenplan_woche_(.+)$/i);
  return s?.[1] ? `number.${s[1]}_woche_offset` : "";
}
function je(e) {
  const t = qt(e);
  return ["mo", "montag", "mon", "monday"].includes(t) ? 1 : ["di", "dienstag", "tue", "tues", "tuesday"].includes(t) ? 2 : ["mi", "mittwoch", "wed", "wednesday"].includes(t) ? 3 : ["do", "donnerstag", "thu", "thurs", "thursday"].includes(t) ? 4 : ["fr", "freitag", "fri", "friday"].includes(t) ? 5 : ["sa", "samstag", "sat", "saturday"].includes(t) ? 6 : ["so", "sonntag", "sun", "sunday"].includes(t) ? 7 : null;
}
const oe = [
  { key: "card_background", variable: "--stundenplan-card-background", label: "Kartenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "header_background", variable: "--stundenplan-header-background", label: "Tabellenkopf & Navigation", theme: "--secondary-background-color", fallback: "#eeeeee" },
  { key: "row_background", variable: "--stundenplan-row-background", label: "Zeilenhintergrund", theme: "--card-background-color", fallback: "#ffffff" },
  { key: "divider_color", variable: "--stundenplan-divider-color", label: "Trennlinien", theme: "--divider-color", fallback: "#e0e0e0" }
];
function Zt(e) {
  const t = {};
  for (const { key: i } of oe) {
    const n = typeof e[i] == "string" ? e[i].trim() : "";
    n && !/[;{}]/.test(n) && CSS.supports("color", n) && (t[i] = n);
  }
  return t;
}
const _t = [
  { key: "font_size_subject", variable: "--stundenplan-font-size-subject", label: "Fächer (px)", min: 8, max: 64 },
  { key: "font_size_time", variable: "--stundenplan-font-size-time", label: "Stunden & Uhrzeiten (px)", min: 8, max: 64 },
  { key: "font_size_header", variable: "--stundenplan-font-size-header", label: "Wochentage / Tabellenkopf (px)", min: 8, max: 64 },
  { key: "font_size_details", variable: "--stundenplan-font-size-details", label: "Raum, Lehrer & Hinweise (px)", min: 8, max: 64 },
  { key: "row_height", variable: "--stundenplan-row-height", label: "Mindesthöhe der Stundenzeilen (px)", min: 24, max: 240 },
  { key: "header_table_gap", variable: "--stundenplan-header-table-gap", label: "Abstand Kopfzeile / Tabelle (px)", min: 0, max: 64 },
  { key: "font_size_title_compact", variable: "--stundenplan-font-size-title-compact", label: "Titelgröße kompakt (px)", min: 8, max: 64 }
];
function Gt(e) {
  const t = {};
  for (const { key: i, min: n, max: s } of _t) {
    const r = e[i];
    if (typeof r != "number" && typeof r != "string" || String(r).trim() === "") continue;
    const a = Number(r);
    Number.isFinite(a) && (a > 0 || n === 0 && a === 0) && (t[i] = Math.max(n, Math.min(s, a)));
  }
  return t;
}
var ht;
const z = (ht = class extends it {
  constructor() {
    super(...arguments), B(this, Mt), B(this, Ct), B(this, Et, []), B(this, Dt, !1), B(this, Tt, ""), B(this, zt, null), B(this, Rt, "idle"), B(this, Pt, ""), this._jsonUrlLast = "", this._lastWatchSig = null, this._lastWeekOffset = null, this._uiViewMode = null, this._uiPopupOpen = !1;
  }
  getGridOptions() {
    return { columns: "full" };
  }
  get hass() {
    return W(this, Mt);
  }
  set hass(e) {
    F(this, Mt, e);
    try {
      const t = this.config;
      if ((t?.source_type ?? "manual").toString() === "entity") {
        try {
          const l = (t?.view_mode ?? "week").toString(), d = Number(t?.days_ahead), u = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0;
          if (l === "rolling" && u === 0) {
            const h = ((t?.week_offset_entity ?? "") + "").toString().trim();
            if (h && e?.states?.[h]) {
              const g = Number(e.states[h].state);
              Number.isFinite(g) && g !== 0 && (e.callService("number", "set_value", { entity_id: h, value: 0 }).catch?.(() => {
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
        const n = ((t?.source_entity_integration ?? t?.source_entity ?? "") + "").toString().trim(), s = e, a = (n ? s?.states?.[n] : void 0)?.attributes ?? {}, o = a?.no_plan === !0 || Array.isArray(a?.rows_table_json) && a.rows_table_json.length === 0 || Array.isArray(a?.rows_json) && a.rows_json.length === 0;
        if (n && o) {
          let l = ((t?.week_offset_entity ?? "") + "").toString().trim();
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
    return W(this, Ct);
  }
  set config(e) {
    F(this, Ct, e);
  }
  get _rowsCache() {
    return W(this, Et);
  }
  set _rowsCache(e) {
    F(this, Et, e);
  }
  get _noData() {
    return W(this, Dt);
  }
  set _noData(e) {
    F(this, Dt, e);
  }
  get _noDataMsg() {
    return W(this, Tt);
  }
  set _noDataMsg(e) {
    F(this, Tt, e);
  }
  get _jsonRows() {
    return W(this, zt);
  }
  set _jsonRows(e) {
    F(this, zt, e);
  }
  get _jsonStatus() {
    return W(this, Rt);
  }
  set _jsonStatus(e) {
    F(this, Rt, e);
  }
  get _jsonError() {
    return W(this, Pt);
  }
  set _jsonError(e) {
    F(this, Pt, e);
  }
  getWatchedEntities(e) {
    const t = /* @__PURE__ */ new Set(), i = (n) => {
      const s = (n ?? "").toString().trim();
      s && t.add(s);
    };
    return i(e.week_offset_entity), i(e.source_entity), i(e.source_entity_integration), i(e.source_entity_legacy), i(e.source_entity_a), i(e.source_entity_b), i(e.week_map_entity), Array.from(t);
  }
  getEntitySig(e) {
    const t = this.hass?.states?.[e];
    if (!t) return `${e}:<missing>`;
    const i = t.last_updated ?? "", n = t.last_changed ?? "", s = t.state ?? "", r = t.attributes ?? {}, a = r.plan ?? r.rows ?? r.rows_table ?? r.rows_json ?? r.rows_ha, o = Array.isArray(a) || typeof a == "string" ? a.length : 0;
    return `${e}|${i}|${n}|${s}|rowsLen=${o}`;
  }
  computeWatchSig(e) {
    const t = this.getWatchedEntities(e).map((s) => this.getEntitySig(s)), i = e.week_mode !== "off" ? this.getActiveWeek(e) : "off", n = this.getWeekOffsetValue(e);
    return `week=${i}|off=${n ?? "null"}::` + t.join("::");
  }
  recomputeRowsIfWatchedChanged() {
    if (!this.config) return;
    const e = this.computeWatchSig(this.config);
    e !== this._lastWatchSig && (this._lastWatchSig = e, this.recomputeRows());
  }
  getWeekOffsetValue(e) {
    const t = (e.week_offset_entity ?? "").trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t], n = (e.week_offset_attribute ?? "").trim(), s = n ? i.attributes?.[n] : i.state, r = Number(s);
    return Number.isFinite(r) ? r : null;
  }
  async setWeekOffset(e, t) {
    const i = (e.week_offset_entity ?? "").trim();
    if (!i) return;
    const n = this.hass?.states?.[i], s = n?.attributes?.min, r = n?.attributes?.max, a = Number.isFinite(Number(s)) ? Number(s) : -52, o = Number.isFinite(Number(r)) ? Number(r) : 52;
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
      show_week_navigation: !0,
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
    const t = ht.getStubConfig(), i = ((e?.type ?? t.type) + "").toString();
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
    const t = ht.getStubConfig(), i = Array.isArray(e.days) && e.days.length ? e.days.map((S) => (S ?? "").toString()) : ["Mo", "Di", "Mi", "Do", "Fr"], n = ze(e.rows, i), s = ze(e.rows_b, i), r = ((e.view_mode ?? "week") + "").toString().trim(), a = r === "rolling" ? "rolling" : "week", o = ((e.display_mode ?? "default") + "").toString().trim(), l = o === "compact" ? "compact" : "default", d = Number(e.days_ahead), u = Number.isFinite(d) ? Math.max(0, Math.min(6, Math.floor(d))) : 0, h = ((e.rolling_switch_mode ?? t.rolling_switch_mode ?? "midnight") + "").toString().trim(), g = h === "after_last_lesson" || h === "fixed_time" ? h : "midnight", _ = ((e.rolling_switch_time ?? t.rolling_switch_time ?? "") + "").toString().trim(), p = ((e.week_mode ?? t.week_mode) + "").toString().trim(), f = p === "kw_parity" || p === "week_map" || p === "off" ? p : "off", m = (() => {
      const S = ((e.source_type ?? "") + "").toString().trim();
      if (S === "manual" || S === "entity" || S === "json" || S === "sensor") return S;
      const L = ((e.source_entity ?? t.source_entity) + "").toString().trim();
      if (L) {
        const at = ((e.source_attribute ?? "") + "").toString().trim(), Z = ((e.source_time_key ?? "") + "").toString().trim();
        return !(/_woche$/i.test(L) && (at === "" || at === "rows_table") && (Z === "" || Z === "time")) && (at || Z) ? "legacy" : "entity";
      }
      return "manual";
    })(), w = (e.source_entity ?? t.source_entity).toString().trim(), x = (e.source_entity_integration ?? "").toString().trim(), A = (e.source_entity_legacy ?? "").toString().trim(), k = m === "sensor" ? A || w : m === "entity" && x || w, R = (e.week_offset_entity ?? "").toString().trim() || Je(k);
    return {
      type: (e.type ?? t.type).toString(),
      title: (e.title ?? t.title).toString(),
      show_title: e.show_title ?? t.show_title,
      title_font_size: Number.isFinite(Number(e.title_font_size)) ? Math.max(0, Math.min(40, Number(e.title_font_size))) : t.title_font_size,
      title_font_family: (e.title_font_family ?? t.title_font_family ?? "").toString(),
      ...Gt(e),
      ...Zt(e),
      show_header_date: e.show_header_date ?? t.show_header_date,
      show_time_column: e.show_time_column ?? t.show_time_column,
      show_week_navigation: e.show_week_navigation ?? t.show_week_navigation,
      trim_empty_rows: e.trim_empty_rows ?? t.trim_empty_rows,
      merge_double_lessons: e.merge_double_lessons ?? t.merge_double_lessons,
      equal_column_widths: e.equal_column_widths ?? t.equal_column_widths,
      days: i,
      view_mode: a,
      display_mode: l,
      days_ahead: u,
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
      source_entity: k,
      source_entity_integration: x || "",
      source_entity_legacy: A || "",
      source_attribute: m === "entity" ? "rows_table" : ((e.source_attribute ?? t.source_attribute ?? "plan") + "").toString(),
      source_time_key: m === "entity" ? "time" : ((e.source_time_key ?? t.source_time_key ?? "Stunde") + "").toString(),
      source_type: m,
      json_url: (e.json_url ?? "").toString(),
      week_offset_entity: R,
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
      rows: n,
      rows_b: s
    };
  }
  getTodayIndex(e, t) {
    const i = /* @__PURE__ */ new Date(), n = `${i.getFullYear()}${String(i.getMonth() + 1).padStart(2, "0")}${String(i.getDate()).padStart(2, "0")}`;
    if (Array.isArray(t) && t.length) {
      const l = t.map((d) => {
        if (d instanceof Date && !Number.isNaN(d.getTime()))
          return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
        const u = (d ?? "").toString().trim(), h = u.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return h ? `${h[1]}${h[2]}${h[3]}` : u;
      }).indexOf(n);
      return l >= 0 ? l : -1;
    }
    const s = i.getDay(), r = new Set(Wi(s).map(qt));
    if (!r.size) return -1;
    const a = (e ?? []).map((o) => qt(o));
    for (let o = 0; o < a.length; o++) if (r.has(a[o])) return o;
    return -1;
  }
  toMinutes(e) {
    if (!e) return null;
    const [t, i] = e.split(":").map((n) => Number(n));
    return [t, i].some((n) => Number.isNaN(n)) ? null : t * 60 + i;
  }
  isNowBetween(e, t) {
    const i = this.toMinutes(e), n = this.toMinutes(t);
    if (i == null || n == null) return !1;
    const s = /* @__PURE__ */ new Date(), r = s.getHours() * 60 + s.getMinutes();
    return r >= i && r < n;
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
    const n = this.hass.states[i], s = (t ?? "").toString().trim(), r = s ? n.attributes?.[s] : n.state;
    return this.parseAnyJson(r);
  }
  buildRowsFromArray(e, t) {
    if (!Array.isArray(t)) return null;
    const i = e.days ?? [], n = (e.source_time_key ?? "time").toString().trim(), s = "Stunde", r = "time", a = t.map((o) => {
      if (o?.break === !0)
        return {
          break: !0,
          time: (o?.time ?? o?.[n] ?? o?.[s] ?? o?.[r] ?? "").toString(),
          label: (o.label ?? "Pause").toString()
        };
      const l = (o?.time ?? o?.[n] ?? o?.[s] ?? o?.[r] ?? "").toString(), d = nt(l), u = Array.isArray(o?.cells) ? Array.from({ length: i.length }, (m, w) => (o?.cells?.[w] ?? "").toString()) : Array.from({ length: i.length }, (m, w) => {
        const x = (i[w] ?? "").toString();
        return (o?.[x] ?? "").toString();
      }), h = Array.isArray(o?.cell_styles) ? Array.from({ length: i.length }, (m, w) => ae(o?.cell_styles?.[w])) : [], g = Array.isArray(o?.cell_times) ? Array.from({ length: i.length }, (m, w) => Ye(o.cell_times[w])) : [], _ = (o?.start ?? "").toString().trim() || d.start, p = (o?.end ?? "").toString().trim() || d.end, f = { time: l, start: _ || void 0, end: p || void 0, cells: u };
      return h.some((m) => !!m) && (f.cell_styles = h), g.some((m) => !!m) && (f.cell_times = g), f;
    });
    return a.length ? a : null;
  }
  getRowsFromEntity(e, t, i) {
    let n = this.readEntityJson(t, i);
    if (n == null && i && (i + "").toString().trim() && (i + "").toString().trim() !== "plan" && (n = this.readEntityJson(t, "plan")), n == null && (n = this.readEntityJson(t, "rows_ha")), n == null && (n = this.readEntityJson(t, "rows")), n == null && (n = this.readEntityJson(t, "rows_table")), n == null && (n = this.readEntityJson(t, "rows_json")), n && typeof n == "object" && !Array.isArray(n)) {
      const s = n.plan, r = n.rows;
      Array.isArray(s) ? n = s : Array.isArray(r) && (n = r);
    }
    return Array.isArray(n) ? this.buildRowsFromArray(e, n) : null;
  }
  async loadJsonRows(e, t) {
    const i = (t ?? "").toString().trim();
    if (!i) {
      this._jsonRows = null, this._jsonStatus = "idle", this._jsonError = "";
      return;
    }
    this._jsonStatus = "loading", this._jsonError = "";
    try {
      const n = await fetch(i, { cache: "no-store" });
      if (!n.ok) throw new Error(`HTTP ${n.status}`);
      const s = await n.json(), r = Array.isArray(s) ? s : Array.isArray(s?.rows) ? s.rows : null, a = r ? this.buildRowsFromArray(e, r) : null;
      this._jsonRows = a ?? [], this._jsonStatus = "ok";
    } catch (n) {
      this._jsonRows = [], this._jsonStatus = "error", this._jsonError = (n?.message ?? "JSON konnte nicht geladen werden").toString();
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
    const { isoWeek: i } = Pe(t), n = i % 2 === 0, s = !!e.week_a_is_even_kw;
    return n === s ? "A" : "B";
  }
  weekFromMap(e) {
    const t = (e.week_map_entity ?? "").toString().trim();
    if (!t) return null;
    const i = (e.week_map_attribute ?? "").toString().trim(), n = this.readEntityJson(t, i);
    if (!n || typeof n != "object") return null;
    const { isoWeek: s, isoYear: r } = Pe(/* @__PURE__ */ new Date()), a = String(s), o = String(r);
    if (n?.[o] && typeof n[o] == "object") {
      const d = Ne(n[o][a]);
      if (d) return d;
    }
    return Ne(n?.[a]) || null;
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
    const n = (e.title_font_family ?? "").toString().trim();
    return n && t.push(`font-family:${n}`), t.join(";");
  }
  getTypographyStyle(e) {
    const t = Gt(e);
    return _t.filter(({ key: i }) => t[i] != null).map(({ key: i, variable: n }) => `${n}:${t[i]}px`).join(";");
  }
  getAppearanceStyle(e) {
    const t = Zt(e);
    return oe.filter(({ key: i }) => t[i] != null).map(({ key: i, variable: n }) => `${n}:${t[i]}`).join(";");
  }
  fmtYMD(e) {
    return `${e.getFullYear()}${String(e.getMonth() + 1).padStart(2, "0")}${String(e.getDate()).padStart(2, "0")}`;
  }
  findConfiguredDayIndexForDate(e, t) {
    const i = e.getDay() === 0 ? 7 : e.getDay();
    return (t ?? []).findIndex((n) => je(n) === i);
  }
  isConfiguredSchoolday(e, t) {
    return this.findConfiguredDayIndexForDate(e, t) >= 0;
  }
  nextConfiguredSchoolday(e, t) {
    const i = new Date(e);
    for (let n = 0; n < 14; n++)
      if (i.setDate(i.getDate() + 1), this.isConfiguredSchoolday(i, t)) return i;
    return i;
  }
  getLastLessonEnd() {
    const e = this._rowsCache ?? [];
    for (let t = e.length - 1; t >= 0; t--) {
      const i = e[t];
      if (!E(i) && i?.end) return (i.end + "").toString().trim();
    }
    return "";
  }
  shouldAdvanceRollingDay(e, t) {
    if (!this.isConfiguredSchoolday(t, e.days ?? [])) return !0;
    const i = ((e.rolling_switch_mode ?? "midnight") + "").toString();
    if (i === "after_last_lesson") {
      const n = this.getLastLessonEnd();
      if (!n) return !1;
      const [s, r] = n.split(":").map(Number);
      return Number.isFinite(s) && Number.isFinite(r) ? t.getHours() > s || t.getHours() === s && t.getMinutes() >= r : !1;
    }
    if (i === "fixed_time") {
      const n = ((e.rolling_switch_time ?? "") + "").toString().trim(), [s, r] = n.split(":").map(Number);
      return Number.isFinite(s) && Number.isFinite(r) ? t.getHours() > s || t.getHours() === s && t.getMinutes() >= r : !1;
    }
    return !1;
  }
  getRollingVisibleSlots(e, t, i = /* @__PURE__ */ new Date()) {
    const n = e.days ?? [];
    if (!n.length) return [];
    const s = i;
    let r = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 12, 0, 0, 0);
    this.isConfiguredSchoolday(r, n) ? this.shouldAdvanceRollingDay(e, s) && (r = this.nextConfiguredSchoolday(r, n)) : r = this.nextConfiguredSchoolday(r, n);
    const a = [], o = Math.max(0, Math.min(6, t));
    let l = new Date(r);
    const d = new Date(r);
    d.setDate(r.getDate() + (7 - (r.getDay() || 7))), d.setHours(23, 59, 59, 999);
    for (let u = 0; u <= o && !(e.rolling_week_only && l > d); u++) {
      const h = this.findConfiguredDayIndexForDate(l, n);
      h >= 0 && a.push({ orig: h, date: new Date(l) }), l = this.nextConfiguredSchoolday(l, n);
    }
    return a;
  }
  async handleCardAction(e, t) {
    if (!t || t.defaultPrevented || Xt(this) || (t.composedPath?.() ?? []).some((s) => s instanceof HTMLElement && (s.closest?.(".offsetInline") || s.closest?.(".btnMini")))) return;
    const n = this.normalizeTapAction(e.tap_action);
    if (!(!n || n.action === "none")) {
      if (n.action === "toggle_view") {
        const s = ((this._uiViewMode ?? e.view_mode ?? "week") + "").toString();
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
        history.pushState(null, "", s), Nt(window, "location-changed", { replace: !1 });
        return;
      }
      if (n.action === "url") {
        const s = (n.url_path ?? "").toString().trim();
        if (!s) return;
        window.open(s, n.target || "_blank");
        return;
      }
      if (n.action === "more-info") {
        const s = (n.entity ?? e.source_entity ?? e.source_entity_integration ?? "").toString().trim();
        if (!s) return;
        Nt(this, "hass-more-info", { entityId: s });
      }
    }
  }
  closeWeekPopup(e) {
    e?.stopPropagation?.(), this._uiPopupOpen = !1, this.requestUpdate();
  }
  handlePreviewCell(e, t, i, n, s, r = 1) {
    if (!Xt(this) || (t.stopPropagation(), e.source_type !== "manual")) return;
    let a = t.currentTarget.parentElement;
    for (let h = 1; h < r && (a = a?.nextElementSibling, a && t.clientY >= a.getBoundingClientRect().top); h++)
      i++;
    let o = e.week_mode === "kw_parity" ? s instanceof Date ? this.weekFromParityAtDate(e, s) : this.getActiveWeek(e) : "A";
    o === "B" && !e.rows_b?.length && (o = "A");
    const l = o === "B" ? e.rows_b : e.rows, d = this.getManualRowForDate(e, this._rowsCache[i], i, s), u = l.indexOf(d);
    u < 0 || Nt(this, "stundenplan-edit-cell", { config: this.config, rowIndex: u, dayIndex: n, week: o });
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
    const t = String(e.getDate()).padStart(2, "0"), i = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getFullYear());
    return `${t}.${i}.${n}`;
  }
  // Prefer meta.days from source_entity for header dates (YYYYMMDD)
  getHeaderDaysFromEntity(e) {
    const t = ((e.source_type ?? "manual") === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : (e.source_type ?? "manual") === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!t || !this.hass?.states?.[t]) return null;
    const i = this.hass.states[t].attributes ?? {}, n = i?.meta_ha?.days ?? i?.meta?.days ?? i?.days ?? (typeof i?.meta_json == "string" ? this.parseAnyJson(i.meta_json)?.days : null) ?? null;
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
  getHeaderUpdatedFromEntity(e) {
    const t = ((e.source_type ?? "manual") + "").toString().trim();
    if (t !== "entity" && t !== "sensor") return null;
    const i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (!i || !this.hass?.states?.[i]) return null;
    const n = this.hass.states[i].attributes ?? {}, s = n?.meta_ha ?? n?.meta ?? (typeof n?.meta_json == "string" ? this.parseAnyJson(n.meta_json) : null) ?? null;
    if (!s) return null;
    const r = (e.days?.length ?? 0) || 5, a = s?.updated_days;
    if (Array.isArray(a) && a.length) {
      const l = (a[0] ?? "").toString().trim();
      return Array.from({ length: r }, (u, h) => (a[h] ?? l ?? "").toString().trim());
    }
    const o = (s?.updated_raw ?? s?.updated ?? "").toString().trim();
    return o ? Array.from({ length: r }, () => o) : null;
  }
  getRowsResolved(e) {
    const t = e.source_type ?? "manual", i = (t === "entity" ? e.source_entity_integration ?? e.source_entity ?? "" : t === "sensor" ? e.source_entity_legacy ?? e.source_entity ?? "" : e.source_entity ?? "").toString().trim();
    if (t === "manual")
      return e.week_mode === "kw_parity" && this.getActiveWeek(e) === "B" ? Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : e.rows ?? [] : e.rows ?? [];
    if (t === "json")
      return this.ensureJsonLoaded(e), this._jsonRows ?? [];
    if (e.week_mode !== "off") {
      const s = this.getActiveWeek(e), r = (e.source_entity_a ?? "").trim(), a = (e.source_entity_b ?? "").trim(), o = (e.source_attribute_a ?? "").trim(), l = (e.source_attribute_b ?? "").trim();
      if (s === "A" && r)
        return this.getRowsFromEntity(e, r, o) ?? [];
      if (s === "B" && a)
        return this.getRowsFromEntity(e, a, l) ?? [];
      const d = i;
      return d ? this.getRowsFromEntity(e, d, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
    }
    const n = i;
    return n ? this.getRowsFromEntity(e, n, ((e.source_attribute ?? "") + "").toString().trim() || "plan") ?? [] : [];
  }
  getManualRowForDate(e, t, i, n) {
    if ((e.source_type ?? "manual") !== "manual" || e.week_mode !== "kw_parity" || !(n instanceof Date)) return t;
    const s = this.weekFromParityAtDate(e, n), r = s === "B" && Array.isArray(e.rows_b) && e.rows_b.length ? e.rows_b : e.rows ?? [], a = (t?.time ?? "").toString();
    return r.find((l) => E(l) === E(t) && (l?.time ?? "").toString() === a) ?? r[i] ?? t;
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
    const n = "Keine Daten für diesen Zeitraum (Ferien/Feiertag).";
    !i || i.length === 0 ? (this._noData = !0, t === "json" && this._jsonStatus === "error" ? this._noDataMsg = `JSON: ${this._jsonError || n}` : t === "json" && this._jsonStatus === "loading" ? this._noDataMsg = "JSON wird geladen…" : this._noDataMsg = n) : (this._noData = !1, this._noDataMsg = "");
  }
  // Parse to Fach (bold) + Raum + Lehrer + Info/Notes
  parseCellTriplet(e) {
    const t = (e ?? "").toString().replace(/\r/g, "").trim();
    if (!t) return null;
    const i = t.split(`
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
  renderCell(e, t) {
    const i = (e ?? "").toString(), n = this.filterCellText(i, t);
    if (et(n)) return c``;
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
    if (et(s)) return c``;
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
`).map((k) => k.trim()).filter(Boolean), x = (w[0] ?? "").trim(), A = w.slice(1);
      return x && A.length ? c`
          <div class="cellWrap">
            <div class="fach">${x}</div>
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
        const m = u[f] ?? "", w = u[f + 1] ?? "", x = u[f + 2] ?? "";
        if (!_(m) || !h.test(w) || !g.test(x)) {
          p.length = 0;
          break;
        }
        p.push([m, w, x].join(`
`));
      }
      if (p.length >= 2)
        return c`<div class="cellMulti">${p.map((f) => d(f))}</div>`;
    }
    return d(s);
  }
  renderCardLayout(e, t = null, i = !1) {
    const n = this._rowsCache, s = this.getHeaderDaysFromEntity(e), r = this.getTodayIndex(e.days ?? [], s), a = ((t ?? this._uiViewMode ?? e.view_mode ?? "week") + "").toString(), o = Number(e.days_ahead), l = Number.isFinite(o) ? Math.max(0, Math.min(6, Math.floor(o))) : 0, d = "1px solid var(--stundenplan-divider-color, var(--divider-color))", u = Re(e.highlight_today_color ?? "", 0.12), h = Re(e.highlight_current_color ?? "", 0.18), g = (e.highlight_current_text_color ?? "").toString().trim(), _ = (e.highlight_current_time_text_color ?? "").toString().trim(), p = e.week_mode !== "off", f = p ? this.getActiveWeek(e) : null, m = this.getWeekOffsetValue(e), w = (e.source_type ?? "manual").toString(), x = e.show_time_column !== !1, A = !i && (e.week_offset_entity ?? "").trim().length > 0, k = A && (w === "entity" || w === "sensor" && (e.week_mode ?? "off") !== "off"), R = k && e.show_week_navigation !== !1, S = s && s.length >= (e.days?.length ?? 0) ? s : null, L = this.getHeaderUpdatedFromEntity(e), at = this.getBaseDate(e), Z = this.mondayOfWeek(at), le = this.normalizeTapAction(e.tap_action), Ze = i ? "default" : e.display_mode ?? "default", Ge = `${Ze === "compact" ? "compact" : ""}${!i && le.action !== "none" ? " tappable" : ""}${i ? " popupCard" : ""}${e.header_table_gap != null ? " customHeaderGap" : ""}`, ce = e.show_title !== !1 && (e.title ?? "").toString().trim().length > 0, Qe = this.getTitleStyle(e), Xe = ce || p || R, ti = a === "rolling" && (i || !k || (m ?? 0) === 0), ot = ti ? this.getRollingVisibleSlots(e, l) : [], G = ot.length ? ot.map((y) => y.orig) : Array.from({ length: e.days?.length ?? 0 }, (y, v) => v), bt = G.map((y) => e.days[y]), M = ot.length ? ot.map((y) => y.date) : null, de = ot.length ? 0 : Math.max(0, G.indexOf(r)), Ot = G[de] ?? 0, vt = M?.[de] ?? null, he = vt instanceof Date ? this.fmtYMD(vt) === this.fmtYMD(/* @__PURE__ */ new Date()) : Ot === r, Ht = e.trim_empty_rows ? Bi(n, G, (y, v, $, D) => {
      const P = this.getManualRowForDate(e, y, v, M?.[D]);
      return this.filterCellText((P?.cells ?? y?.cells ?? [])[$] ?? "", e);
    }) : n, ue = (() => {
      const y = /* @__PURE__ */ new Map();
      return !S || !L || S.forEach((v, $) => {
        const D = L[$];
        v instanceof Date && D && y.set(this.fmtYMD(v), D);
      }), y;
    })();
    return c`
      <ha-card class=${Ge} style=${[this.getTypographyStyle(e), this.getAppearanceStyle(e)].filter(Boolean).join(";")} @click=${i ? (y) => this.closeWeekPopup(y) : (y) => this.handleCardAction(e, y)}>
        ${Xe ? c`<div class="headerRow">
          ${ce ? c`<div class="title" style=${Qe}>${e.title ?? ""}</div>` : c`<div class="titleSpacer"></div>`}

          <div class="headRight">
            ${p ? c`<div class="weekBadgeInline">Woche <b>${f}</b></div>` : c``}

            ${R ? c`
                  <div class="offsetInline">
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), m != null && this.setWeekOffset(e, m - 1);
    }}>&lt;</button>
                    <div class="offsetVal">${m ?? "?"}</div>
                    <button class="btnMini" @click=${(y) => {
      y.stopPropagation(), m != null && this.setWeekOffset(e, m + 1);
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
                ${bt.map((y, v) => {
      const $ = G[v], D = e.highlight_today && (M ? this.fmtYMD(M[v]) === this.fmtYMD(/* @__PURE__ */ new Date()) : $ === r) ? "today" : "";
      let P = "";
      if (M?.[v] instanceof Date)
        P = this.fmtDDMMYYYY(M[v]);
      else if (S)
        P = this.fmtDDMMYYYY(S[$]);
      else {
        const I = je(y);
        if (I) {
          const Q = new Date(Z);
          Q.setDate(Z.getDate() + (I - 1)), P = this.fmtDDMMYYYY(Q);
        }
      }
      return c`
                    <th class=${D} style=${`--sp-hl:${u};`}>
                      <div>${y}</div>
                      ${e.show_header_date !== !1 ? c`<div class="thDate">${P}</div>` : c``}
                      ${M?.[v] ? ue.get(this.fmtYMD(M[v])) ? c`<div class="thUpdated">(aktualisiert: ${ue.get(this.fmtYMD(M[v]))})</div>` : c`` : L?.[$] ? c`<div class="thUpdated">(aktualisiert: ${L[$]})</div>` : c``}
                    </th>
                  `;
    })}
              </tr>
            </thead>

            <tbody>
              ${this._noData ? c`<tr class="nodata"><td class="nodataCell" colspan=${bt.length + (x ? 1 : 0)}>${this._noDataMsg}</td></tr>` : Ht.map((y, v) => {
      if (E(y)) {
        const lt = nt(y.time), N = !!lt.start && !!lt.end && this.isNowBetween(lt.start, lt.end), C = !!e.highlight_breaks && N;
        let j = `--sp-hl:${h};`, kt = "";
        return C && (j += "box-shadow: inset 0 0 0 9999px var(--sp-hl);", kt += `--sp-hl:${h}; box-shadow: inset 0 0 0 9999px var(--sp-hl);`), C && e.highlight_current_time_text && _ && (j += `color:${_};`), c`
                    <tr class="break">
                      ${x ? c`<td class="time" style=${j}>${y.time}</td>` : c``}
                      <td colspan=${bt.length} style=${kt} @click=${(Vt) => this.handlePreviewCell(e, Vt, v, -1, vt)}>${y.label ?? ""}</td>
                    </tr>
                  `;
      }
      const $ = y, D = $.cells ?? [], P = $.cell_styles ?? [], I = this.getManualRowForDate(e, $, v, vt), Q = (I?.cell_times ?? $.cell_times)?.[Ot] ?? null, pe = Q?.time || I?.time || $.time, $t = Q?.start || I?.start || $.start, xt = Q?.end || I?.end || $.end, Ut = he && !!$t && !!xt && this.isNowBetween($t, xt), ei = r >= 0 ? D[r] ?? "" : "", ii = r >= 0 ? this.filterCellText(ei, e) : "", ni = r >= 0 ? et(ii) : !1, Lt = !(e.free_only_column_highlight && ni), ge = nt(pe), si = !!(ge.start && ge.end), _e = !si && $t && xt ? `${$t}–${xt}` : "";
      let It = `--sp-hl:${h};`;
      return Lt && e.highlight_current && Ut && (It += "box-shadow: inset 0 0 0 9999px var(--sp-hl);"), Lt && Ut && e.highlight_current_time_text && _ && (It += `color:${_};`), c`
                  <tr>
                    ${x ? c`<td class="time" style=${It}>
                      <div class="timeWrap">
                        <div class="timeSt">${pe}</div>
                        ${_e ? c`<div class="timeHm">${_e}</div>` : c``}
                      </div>
                    </td>` : c``}

                    ${bt.map((lt, N) => {
        const C = G[N], j = this.getManualRowForDate(e, $, v, M?.[N]), kt = j?.cells ?? D, Vt = j?.cell_styles ?? P, Kt = M ? this.fmtYMD(M[N]) === this.fmtYMD(/* @__PURE__ */ new Date()) : C === r, fe = this.filterCellText(kt[C] ?? "", e), ri = Vt[C] ?? null, ai = e.highlight_today && Kt ? "today" : "", ct = e.merge_double_lessons ? Hi(Ht, v, (V, St) => {
          const X = this.getManualRowForDate(e, V, St, M?.[N]);
          return { text: this.filterCellText((X?.cells ?? V?.cells ?? [])[C] ?? "", e), style: (X?.cell_styles ?? V?.cell_styles ?? [])[C] ?? null };
        }) : { covered: !1, span: 1 };
        if (ct.covered) return b;
        let me = `--sp-hl:${u};` + ji(ri, d);
        const oi = !et(fe), li = (() => {
          if (!Kt || !he || C !== Ot || ct.span <= 1) return !1;
          const V = (j?.cell_times ?? $.cell_times)?.[C] ?? null, St = v + ct.span - 1, X = Ht[St], ye = this.getManualRowForDate(e, X, St, M?.[N]), ci = (ye?.cell_times ?? X?.cell_times)?.[C] ?? null, we = V?.start || j?.start || $.start, be = ci?.end || ye?.end || X?.end;
          return !!we && !!be && this.isNowBetween(we, be);
        })();
        return Lt && oi && (Kt && (Ut || li)) && e.highlight_current_text && g && r >= 0 && C === r && (me += `color:${g};`), c`<td class=${ai} style=${me} rowspan=${ct.span} @click=${(V) => this.handlePreviewCell(e, V, v, C, M?.[N], ct.span)}>${this.renderCell(fe, e)}</td>`;
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
}, ht.styles = Be`
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
`, ht);
Mt = /* @__PURE__ */ new WeakMap();
Ct = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakMap();
Dt = /* @__PURE__ */ new WeakMap();
Tt = /* @__PURE__ */ new WeakMap();
zt = /* @__PURE__ */ new WeakMap();
Rt = /* @__PURE__ */ new WeakMap();
Pt = /* @__PURE__ */ new WeakMap();
T([
  Le({ attribute: !1 })
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
let Qt = z;
function Xt(e) {
  for (let t = e; t; t = t.parentNode ?? t.host)
    if (t.localName === "hui-dialog-edit-card") return t;
  return null;
}
function Nt(e, t, i) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      composed: !0
    })
  );
}
function Y(e, t = !1) {
  if (typeof e == "boolean") return e;
  if (e == null) return t;
  const i = String(e).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(i) ? !0 : ["0", "false", "no", "off"].includes(i) ? !1 : t;
}
function Ui(e) {
  return (e ?? "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Li(e) {
  return (e ?? []).map((t) => (t ?? "").toString().trim()).filter(Boolean).join(", ");
}
const te = class extends it {
  constructor() {
    super(...arguments), this._unsubEntities = null, this._didSubEntities = !1, this._open = {
      general: !1,
      rolling: !1,
      typography: !1,
      appearance: !1,
      highlights: !1,
      colors: !1,
      sources: !1,
      manual: !1
    }, this._uiLoaded = !1, this._stopEvent = (t) => {
      try {
        t?.stopPropagation?.();
      } catch {
      }
    }, this._rowOpen = {}, this._showCellStyles = !1, this._manualWeek = "A", this._onPreviewCell = (t) => this.openPreviewCell(t);
  }
  connectedCallback() {
    super.connectedCallback(), this._previewDialog = Xt(this), this._previewDialog?.addEventListener("stundenplan-edit-cell", this._onPreviewCell), this.ensureUiLoaded(), this.ensureEntitySubscription();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._previewDialog?.removeEventListener("stundenplan-edit-cell", this._onPreviewCell), this._previewDialog = null;
    try {
      this._unsubEntities?.();
    } catch {
    }
    this._unsubEntities = null, this._didSubEntities = !1;
  }
  async openPreviewCell(t) {
    const { config: i, rowIndex: n, dayIndex: s, week: r } = t.detail ?? {};
    if (!this._config || this._config.source_type !== "manual" || JSON.stringify(i) !== JSON.stringify(this._config)) return;
    const o = (r === "B" ? this._config.rows_b : this._config.rows)?.[n];
    if (!o || !Number.isInteger(n) || !E(o) && (!Number.isInteger(s) || s < 0 || s >= this._config.days.length) || (t.stopPropagation(), this._manualWeek = r === "B" ? "B" : "A", this._open = { ...this._open, manual: !0 }, this._rowOpen = { [n]: !0 }, this.requestUpdate(), await this.updateComplete, !this.isConnected)) return;
    const l = this.shadowRoot.querySelectorAll(".rowPanel")[n], d = E(o) ? l?.querySelector('ha-input[label="Pausentext"]') : l?.querySelectorAll(".lessonArea")[s];
    d?.scrollIntoView({ block: "nearest", inline: "nearest" }), d?.focus({ preventScroll: !0 });
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
    return new Qt().normalizeConfig(t);
  }
  clone(t) {
    try {
      return structuredClone(t);
    } catch {
      return JSON.parse(JSON.stringify(t));
    }
  }
  emit(t) {
    this._config = t, Nt(this, "config-changed", { config: t });
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
    const i = t === "entity" || t === "json" || t === "manual" || t === "sensor" ? t : "manual", n = { ...this._config, source_type: i };
    i === "json" && n.json_url == null && (n.json_url = ""), i === "entity" && (n.source_entity == null && (n.source_entity = ""), n.source_attribute = "rows_table", n.source_time_key = "time"), i === "sensor" && (n.source_entity == null && (n.source_entity = ""), n.source_entity_integration = "", n.source_attribute = (n.source_attribute ?? "").toString().trim() || "plan", n.source_time_key = (n.source_time_key ?? "").toString().trim() || "Stunde"), this.emit(n);
  }
  setSourceEntity(t) {
    if (!this._config) return;
    const i = (t ?? "").toString().trim(), n = (this._config.source_type ?? "manual").toString();
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
      s && (r = this.hass?.states?.[s]?.attributes?.week_offset_entity || Je(s)), this.emit({
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
  renderSection(t, i, n) {
    const s = !!this._open[i];
    return c`
      <div class="section">
        <div class="sectionHead" @click=${() => this.toggleOpen(i)}>
          <div class="sectionTitle">${t}</div>
          <div class="chev">${s ? "▾" : "▸"}</div>
        </div>
        ${s ? c`<div class="sectionBody">${n}</div>` : c``}
      </div>
    `;
  }
  onToggle(t, i) {
    const n = !!t?.target?.checked;
    this.setValue(i, n);
  }
  onText(t, i) {
    if (!this._config) return;
    const n = t?.detail?.value ?? t?.target?.value ?? t?.currentTarget?.value ?? t?.target?.checked ?? "";
    this.emit({
      ...this._config,
      [i]: n
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
    const t = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], i = this.getManualRows(), n = { time: `${i.length + 1}.`, cells: Array.from({ length: t.length }, () => "") };
    i.push(n), this.emitManualRows(i);
  }
  insertManualRowBelow(t) {
    if (!this._config) return;
    const i = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = this.getManualRows(), s = { time: `${t + 2}.`, start: "", end: "", cells: Array.from({ length: i.length }, () => "") };
    n.splice(t + 1, 0, s), this.emitManualRows(n);
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
    const n = this.getManualRows(), s = n[t];
    n[t] = { ...s, ...i }, this.emitManualRows(n);
  }
  updateManualCell(t, i, n) {
    if (!this._config) return;
    const s = this.getManualRows(), r = s[t];
    if (!r || E(r)) return;
    const a = r, o = Array.isArray(a.cells) ? a.cells.slice() : [];
    o[i] = n, s[t] = { ...a, cells: o }, this.emitManualRows(s);
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
    const n = this._config.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], s = this.getManualRows(), r = s[t];
    if (r) {
      if (i) {
        const a = (r.time ?? "").toString(), o = (r.label ?? "Pause").toString();
        s[t] = { break: !0, time: a, label: o };
      } else {
        const a = (r.time ?? "").toString();
        s[t] = { time: a, start: "", end: "", cells: Array.from({ length: n.length }, () => "") };
      }
      this.emitManualRows(s);
    }
  }
  updateManualCellStyle(t, i, n) {
    if (!this._config) return;
    const s = this.getManualRows(), r = s[t];
    if (!r || E(r)) return;
    const a = r, o = Array.isArray(a.cell_styles) ? a.cell_styles.slice() : [], l = o[i] ?? {};
    o[i] = { ...l, ...n }, s[t] = { ...a, cell_styles: o }, this.emitManualRows(s);
  }
  renderManualRows() {
    if (!this._config) return c``;
    const t = this._config, i = t.days ?? ["Mo", "Di", "Mi", "Do", "Fr"], n = t.week_mode === "kw_parity", s = n && this._manualWeek === "B" ? "B" : "A", r = s === "B" && Array.isArray(t.rows_b) ? t.rows_b : Array.isArray(t.rows) ? t.rows : [];
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
      const o = !!a?.target?.checked, l = Array.isArray(t.rows_b) && t.rows_b.length ? t.rows_b : this.clone(t.rows ?? []);
      this._manualWeek = "A", this._rowOpen = {}, this.emit({ ...t, week_mode: o ? "kw_parity" : "off", rows_b: l });
    }}
          ></ha-switch>
        </div>

        ${n ? c`
          <ha-form
            .hass=${this.hass}
            .data=${{ week_a_is_even_kw: Y(t.week_a_is_even_kw, !0) }}
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
      const l = E(a), d = l ? `Pause · ${(a.time ?? "").toString()}` : `Stunde · ${(a.time ?? "").toString()}`, u = a, h = (u.start ?? "").toString(), g = (u.end ?? "").toString(), _ = (a.label ?? "Pause").toString();
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
        const m = (u.cells?.[f] ?? "").toString(), w = (Array.isArray(u.cell_styles) ? u.cell_styles?.[f] : void 0) ?? {}, x = typeof w?.bg_alpha == "number" && !Number.isNaN(w.bg_alpha) ? w.bg_alpha : 0.18;
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
                              ${this.renderColorPicker("Hintergrund", Ke(w) ?? "", (A) => {
          const k = Jt(A);
          this.updateManualCellStyle(o, f, A ? { bg: A, bg_alpha: k.alpha } : { bg: "", bg_alpha: 0.18 });
        }, "#2196f3", x)}
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
  renderToggle(t, i, n = !1) {
    return c`<label class="toggleRow"><span>${i}</span><ha-switch
      .checked=${Y(this._config[t], n)}
      @change=${(s) => this.onToggle(s, t)}></ha-switch></label>`;
  }
  renderColorPicker(t, i, n, s = "#2196f3", r = 1) {
    const a = Jt(i, s, r), o = [
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
      const h = re(d);
      h && n(`rgba(${h.r}, ${h.g}, ${h.b}, ${Math.round(u * 100) / 100})`);
    };
    return c`<fieldset class="colorPicker">
      <legend>${t}</legend>
      <div class="palette">
        ${o.map(([d, u]) => c`<button type="button" class="swatch"
          style=${`--swatch:${d}`} title=${u} aria-label=${`${t}: ${u}`}
          aria-pressed=${a.hex.toLowerCase() === d}
          @click=${() => l(d, a.alpha)}></button>`)}
        <input type="color" class="customColor" aria-label=${`${t}: eigene Farbe`}
          title="Eigene Farbe" .value=${a.hex} @input=${(d) => l(d.target.value, a.alpha)} />
      </div>
      <label class="opacityControl"><span>Transparenz</span>
        <input type="range" min="0" max="100" aria-label=${`${t}: Transparenz`}
          .value=${String(Math.round((1 - a.alpha) * 100))}
          @input=${(d) => l(a.hex, 1 - Number(d.target.value) / 100)} />
        <output>${Math.round((1 - a.alpha) * 100)}%</output>
      </label>
      <div class="colorFooter"><span class="colorPreview" style=${`background:${i || s}`}></span>
        <button type="button" class="resetColor" @click=${() => n("")}>Zurücksetzen</button>
        <details class="colorAdvanced"><summary>Farbcode</summary>
          <input aria-label=${`${t}: Farbcode`} .value=${i ?? ""}
            @change=${(d) => n(d.target.value)} />
        </details>
      </div>
    </fieldset>`;
  }
  renderConfigColor(t, i, n, s = 1) {
    return this.renderColorPicker(t, this._config[i], (r) => {
      this.setValue(i, r || Qt.getStubConfig()[i]);
    }, n, s);
  }
  renderAppearanceColor(t) {
    const i = getComputedStyle(this).getPropertyValue(t.theme).trim(), n = Jt(i, t.fallback).hex;
    return this.renderColorPicker(t.label, this._config[t.key] ?? "", (s) => {
      const r = { ...this._config }, a = Zt({ [t.key]: s })[t.key];
      a ? r[t.key] = a : delete r[t.key], this.emit(r);
    }, n);
  }
  renderTypographyInput(t) {
    return c`<ha-input
      label=${t.label} type="number" min=${t.min} max=${t.max} step="1"
      placeholder="Standard" .value=${String(this._config[t.key] ?? "")}
      @change=${(i) => {
      const n = Gt({ [t.key]: i.target.value })[t.key], s = { ...this._config };
      n == null ? delete s[t.key] : s[t.key] = n, this.emit(s);
    }}
    ></ha-input>`;
  }
  resetTypography() {
    const t = { ...this._config, title_font_size: 20 };
    for (const { key: i } of _t) delete t[i];
    this.emit(t);
  }
  renderRollingSettings() {
    const t = this._config;
    return this.renderSection("Rolling", "rolling", c`
      <div class="grid2">
        <div class="gridFull">${this.renderToggle("rolling_week_only", "Auf Kalenderwoche begrenzen")}</div>
        ${t.rolling_week_only ? c`<div class="hint gridFull">Endet am Sonntag der Startwoche. Am Wochenende beginnt die Ansicht beim nächsten Schultag; auch „Nach der letzten Stunde“ bleibt wirksam.</div>` : b}
        <ha-input
          label="Zusätzliche Tage im Voraus"
          type="number"
          .value=${String(t.days_ahead ?? 0)}
          @input=${(i) => {
      const n = Number(i.target.value);
      this.setValue("days_ahead", Number.isFinite(n) ? Math.max(0, Math.min(6, Math.floor(n))) : 0);
    }}
          hint="0 = nur Starttag, 1 = Starttag + nächster Schultag"
        ></ha-input>
        <ha-form
          .hass=${this.hass}
          .data=${{ rolling_switch_mode: t.rolling_switch_mode ?? "midnight" }}
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
        ${(t.rolling_switch_mode ?? "midnight") === "fixed_time" ? c`
          <ha-input class="gridFull"
            label="Umschaltzeit (HH:MM)"
            .value=${t.rolling_switch_time ?? ""}
            @input=${(i) => this.onText(i, "rolling_switch_time")}
            hint="Beispiel: 15:00"
          ></ha-input>
        ` : c`<div class="infoBox slim gridFull">${(t.rolling_switch_mode ?? "midnight") === "after_last_lesson" ? "Der Sprung auf den nächsten Schultag folgt nach der letzten Endzeit aus deinem Plan." : "Der Sprung auf den nächsten Schultag folgt direkt ab Mitternacht."}</div>`}
      </div>
      <div class="hint">Ab dem Starttag werden die nächsten passenden Schultage angezeigt. Beim Blättern in andere Wochen beginnt die Ansicht am Montag.</div>
    `);
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
                .value=${Li(t.days ?? [])}
                @input=${(i) => this.setValue("days", Ui(i.target.value))}
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
          const n = (i?.detail?.value ?? {}).view_mode ?? "week";
          this.setValue("view_mode", n);
        } catch (n) {
          console.error("stundenplan-card editor: view_mode change failed", n);
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
                <ha-switch .checked=${Y(t.trim_empty_rows, !1)} @change=${(i) => this.onToggle(i, "trim_empty_rows")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleiche Folgestunden verbinden</div>
                  <div class="sub">Identische Fächer ohne Pausenzeile zusammenfassen.</div>
                </div>
                <ha-switch .checked=${Y(t.merge_double_lessons, !1)} @change=${(i) => this.onToggle(i, "merge_double_lessons")}></ha-switch>
              </div>

              <div class="optRow gridFull">
                <div>
                  <div class="optTitle">Gleichmäßige Spaltenbreiten</div>
                  <div class="sub">Für mehrere gleich breite Karten untereinander.</div>
                </div>
                <ha-switch .checked=${Y(t.equal_column_widths, !1)} @change=${(i) => this.onToggle(i, "equal_column_widths")}></ha-switch>
              </div>

            </div>

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
          const n = (i?.detail?.value ?? {}).tap_action_action ?? "none";
          this.setValue("tap_action", { ...t.tap_action ?? {}, action: n });
        } catch (n) {
          console.error("stundenplan-card editor: tap_action change failed", n);
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

        ${(t.view_mode ?? "week") === "rolling" ? this.renderRollingSettings() : b}

        ${this.renderSection("Schrift & Abstände", "typography", c`
          <div class="hint">Alle Größen in Pixeln. Leere Felder verwenden die bisherigen Vorgaben der normalen oder kompakten Ansicht.</div>
          <div class="grid2">
            ${_t.filter(({ key: i }) => i !== "font_size_title_compact").map((i) => this.renderTypographyInput(i))}
            <div class="hint gridFull">Die Mindesthöhe gilt pro Stundenzeile. Mehrzeilige Inhalte dürfen die Zeile vergrößern; Pausenzeilen bleiben kompakt. Der Kopfzeilenabstand gilt unterhalb von Titel und Navigation: leer = bisheriger Abstand, 0 = kein zusätzlicher Abstand.</div>
          </div>
          ${t.show_title !== !1 ? c`
            <div class="generalDivider">Kartentitel</div>
            <div class="grid2">
              <ha-input label="Titelgröße normal (px)" type="number" min="10" max="40" step="1"
                placeholder="Standard: 20" .value=${String(t.title_font_size ?? 20)}
                @change=${(i) => {
      const n = i.target.value, s = n === "" ? 20 : Number(n);
      this.setValue("title_font_size", Number.isFinite(s) ? Math.max(10, Math.min(40, s)) : 20);
    }}></ha-input>
              ${this.renderTypographyInput(_t.find(({ key: i }) => i === "font_size_title_compact"))}
              <ha-input class="gridFull" label="Titel-Schriftfamilie (optional)"
                .value=${t.title_font_family ?? ""}
                @input=${(i) => this.onText(i, "title_font_family")}></ha-input>
            </div>
          ` : b}
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
      "Hintergründe & Linien",
      "appearance",
      c`
        <div class="hint">Optional für transparente Dashboards. Zurücksetzen verwendet wieder Theme oder CSS-Vorgaben. Eigene Fachfarben und Highlights bleiben erhalten.</div>
        <div class="stack">
          ${oe.map((i) => this.renderAppearanceColor(i))}
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
          const n = (i?.detail?.value ?? {}).source_type ?? t.source_type ?? "manual";
          n !== (t.source_type ?? "manual") && this.setSourceType(n);
        } catch (n) {
          console.error("stundenplan-card editor: ha-form value-changed failed", n);
        }
      }}
              ></ha-form>
            </div>

            ${(t.source_type ?? "manual") === "entity" ? c`
                  <div class="hint">Stundenplan Suite: Wochensensor für Stundenplan24 oder Schulmanager auswählen.</div>

                  ${this.isHaEntityPickerAvailable() ? c`
                    ${(() => {
        const i = Object.keys(this.hass?.states ?? {}), n = i.filter((s) => /^sensor\./.test(s) && (/_woche$/i.test(s) || this.hass?.states?.[s]?.attributes?.rows_table != null));
        return i.length < 5 || n.length === 0 ? c`<div class="hint">Keine <code>*_woche</code>-Sensoren gefunden – Integration noch nicht geladen?</div>` : c``;
      })()}

                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${t.source_entity_integration ?? t.source_entity ?? ""}
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
        week_a_is_even_kw: Y(t.week_a_is_even_kw, !0)
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
          const n = i?.detail?.value ?? {}, s = n.week_mode ?? t.week_mode ?? "off";
          s !== (t.week_mode ?? "off") && this.setValue("week_mode", s);
          const r = n.week_a_is_even_kw;
          typeof r == "boolean" && r !== Y(t.week_a_is_even_kw, !0) && this.setValue("week_a_is_even_kw", r);
        } catch (n) {
          console.error("stundenplan-card editor: week settings change failed", n);
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
te.properties = {
  hass: {},
  _config: { state: !0 }
}, te.styles = Be`
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
let qe = te;
T([
  U()
], qe.prototype, "_open", 2);
customElements.get("stundenplan-card") || customElements.define("stundenplan-card", Qt);
customElements.get("stundenplan-card-editor") || customElements.define("stundenplan-card-editor", qe);
window.__STUNDENPLAN_CARD_VERSION = "v3.7.0";
console.info("Stundenplan Card loaded:", window.__STUNDENPLAN_CARD_VERSION);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "stundenplan-card",
  name: "Stundenplan Card",
  description: "Stundenplan Card v3.7.0 (marker: STUNDENPLAN_CARD_v3.7.0)",
  preview: !0
});
export {
  Qt as StundenplanCard,
  qe as StundenplanCardEditor
};
