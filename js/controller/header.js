!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}({1:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var o="http://diseasedatabase.ml:3000"},8:function(e,t,n){"use strict";n.r(t);var o=n(1);console.log("in header.js"),document.getElementById("search").onclick=function(e){console.log("click on search"),e.preventDefault(),document.getElementById("search").className.includes("menu_item_selected")||(location.href="../index.html")},document.getElementById("browse").onclick=function(e){console.log("click on browse"),e.preventDefault(),document.getElementById("browse").className.includes("menu_item_selected")||(location.href.includes("pages")?location.href="browse.html":location.href="../pages/browse.html")},document.getElementById("about").onclick=function(e){console.log("click on about"),e.preventDefault(),document.getElementById("about").className.includes("menu_item_selected")||(location.href.includes("pages")?location.href="about.html":location.href="../pages/about.html")},document.getElementById("add_disease").onclick=function(e){console.log("click on add_disease"),e.preventDefault(),document.getElementById("add_disease").className.includes("menu_item_selected")||(localStorage.setItem("lastpage",location.href.replace(o.a+"/")),location.href.includes("pages")?location.href="add_disease_info.html":location.href="../pages/add_disease_info.html")}}});
//# sourceMappingURL=header.js.map