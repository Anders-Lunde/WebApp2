if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,t,s)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const o={uri:location.origin+r.slice(1)};return Promise.all(t.map(r=>{switch(r){case"exports":return i;case"module":return o;default:return e(r)}})).then(e=>{const r=s(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-f130736c"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"favicon.ico",revision:"1ba2ae710d927f13d483fd5d1e548c9b"},{url:"index.html",revision:"2e3d11f9e4be8c07112bbba640fe8a38"}],{})}));
//# sourceMappingURL=sw.js.map
