(this.webpackJsonpshare=this.webpackJsonpshare||[]).push([[10],{1035:function(e,t,a){"use strict";function n(e){var t=e.item,a=t.id,n=t.type,c=t.time,s=t.title,m=Object(o.g)();return r.a.createElement("div",{className:"homeItem",onClick:function(){m.push("/Detail/".concat(a))}},r.a.createElement("div",{className:"homeHaderTitle"},r.a.createElement("time",{className:"time"},c),r.a.createElement("span",{className:"type"},n)),r.a.createElement("h2",{className:"text"},s))}a.r(t),a(310);var c=a(406),s=(a(312),a(314)),m=(a(313),a(317)),i=a(67),l=a(0),r=a.n(l),o=a(15),p=(a(414),a(141)),f={span:24,offset:0},u={span:12,offset:0},h={span:12,offset:0},b={span:8,offset:0},d={span:6,offset:0},j={span:6,offset:0};t.default=function(){var e=Object(l.useState)([]),t=Object(i.a)(e,2),a=t[0],E=t[1],O=Object(l.useState)(1),g=Object(i.a)(O,2),N=g[0],v=g[1],x=Object(l.useState)(10),S=Object(i.a)(x,2),y=S[0],k=S[1],w=Object(l.useState)(0),z=Object(i.a)(w,2),C=z[0],D=z[1],H=Object(o.h)(),J="/"===H.pathname||"/Home"===H.pathname?"":H.pathname.replace("/","");Object(l.useEffect)((function(){q(1,10)}),[H]);var q=function(e,t){Object(p.a)("/api/admin/query",{data:{classify:J,pageNumber:e,pageSize:t}}).then((function(e){e&&e.data&&(E(e.data),D(e.total))}))};return r.a.createElement("div",{className:"home"},r.a.createElement(s.a,{className:"rowList"},a.length<1?r.a.createElement("h3",{className:"noneData"},"\u6682\u65e0\u6570\u636e"):a.map((function(e){return r.a.createElement(m.a,{key:e.id,xs:f,sm:u,md:h,lg:b,xl:d,xxl:j},r.a.createElement(n,{item:e}))}))),10<C&&r.a.createElement(c.a,{style:{padding:"40px 20px"},current:N,pageSize:y,total:C,showSizeChanger:!0,onChange:function(e,t){v(e),k(t),q(e,t)}}))}},414:function(e,t,a){}}]);