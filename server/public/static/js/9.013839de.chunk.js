(this.webpackJsonpshare=this.webpackJsonpshare||[]).push([[9],{1016:function(e,t,a){"use strict";a.r(t),a(140);var c=a(99),n=a(67),l=a(0),i=a.n(l),s=a(15),r=a(411),m=a.n(r),d=a(1015),u=a(1012);function o(e){var t=e.value;return i.a.createElement(d.a,{language:"",style:u.a},t)}function E(e){var t=e.md,a=(e.classify,Object(l.useState)()),c=Object(n.a)(a,2);return c[0],c[1],i.a.createElement(m.a,{source:t,escapeHtml:!1,renderers:{code:o}})}var p=a(145);a(761),t.default=function(){var e=Object(l.useState)(!0),t=Object(n.a)(e,2),a=t[0],r=t[1],m=Object(l.useState)({}),d=Object(n.a)(m,2),u=d[0],o=d[1],f=Object(l.useState)(!0),h=Object(n.a)(f,2),b=h[0],v=h[1],j=Object(s.h)(),y=j.search,O=j.state,N=void 0===O?{}:O,g=y.indexOf("?id"),x=y.slice(g).split("=")[1],S=N.id||x,k=parseInt(9*Math.random())+1;if(Object(l.useEffect)((function(){800<document.body.clientWidth?r(!0):r(!1),S&&w()}),[j]),!S)return i.a.createElement("h3",{style:{padding:50,textAlign:"center"}},"\u6682\u65e0\u6570\u636e");var w=function(){try{Object(p.a)("/api/admin/detail",{data:{id:S}}).then((function(e){v(!1),e&&200===e.code&&o(e.data[0])}))}catch(e){}};return i.a.createElement(c.a,{spinning:b},i.a.createElement("div",{className:"detailBox"},a?i.a.createElement("div",{className:"haderTitle",style:{backgroundImage:"url(/img/".concat(k,".jpg)")}},i.a.createElement("div",{className:"titleBox"},i.a.createElement("h1",{className:"title"},u.title),i.a.createElement("div",null,i.a.createElement("time",{className:"time"},u.time)),i.a.createElement("span",{className:"type"},u.type))):i.a.createElement("div",{className:"haderTitle2"},i.a.createElement("h1",{className:"title"},u.title),i.a.createElement("div",null,i.a.createElement("time",{className:"time"},u.time)),i.a.createElement("span",{className:"type"},u.type)),i.a.createElement("div",{className:"detail"},i.a.createElement("article",null,i.a.createElement(E,{md:u.text,classify:u.classify})))))}},530:function(e,t){},761:function(e,t,a){}}]);