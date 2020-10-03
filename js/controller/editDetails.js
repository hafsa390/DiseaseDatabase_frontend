!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return l}));var r=n(1),a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=r.a+e+(n.length>0?"?":"")+n,i={method:"GET"};c(a,i,t)},i=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/x-www-form-urlencoded",i=r.a+e,o={method:"POST"};"EMPTY"!==a&&(o.headers={"Content-Type":a}),null!==n&&(o.body=n),c(i,o,t)},o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/x-www-form-urlencoded",i=r.a+e,o={method:"PUT"};"EMPTY"!==a&&(o.headers={"Content-Type":a}),null!==n&&(o.body=n),c(i,o,t)},l=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/x-www-form-urlencoded",i=r.a+e,o={method:"DELETE"};"EMPTY"!==a&&(o.headers={"Content-Type":a}),null!==n&&(o.body=n),c(i,o,t)},c=function(e,t,n){fetch(e,t).then((function(e){return e.json()})).then((function(e){n(e)})).catch((function(e){console.error(e),n(null)}))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r="http://diseasedatabase.ml:3000"},function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"a",(function(){return l})),n.d(t,"f",(function(){return c})),n.d(t,"d",(function(){return u}));var r=n(0),a=function(e){Object(r.b)("/categories",e)},i=function(e,t){var n="category="+e;Object(r.c)("/categories",t,n)},o=function(e,t,n){var a="searchStr="+e+"&searchBy="+t;Object(r.c)("/",n,a)},l=function(e,t){var n="orpha_code="+e.orphaCode+"&name="+e.name+"&abbreviation="+e.abbreviation+"&sub_category="+e.subCategory+"&gene_name="+e.geneName+"&gene_ref="+e.geneRef;e.uploadedFiles?n+="&files="+JSON.stringify(e.uploadedFiles):n+="&files=[]",e.refs?n+="&refs="+JSON.stringify(e.refs):n+="&refs=[]",Object(r.c)("/disease",t,n)},c=function(e,t){var n="id="+e.id+"&orpha_code="+e.orphaCode+"&name="+e.name+"&abbreviation="+e.abbreviation+"&sub_category="+e.subCategory+"&gene_name="+e.geneName+"&gene_ref="+e.geneRef;e.uploadedFiles?n+="&files="+JSON.stringify(e.uploadedFiles):n+="&files=[]",e.refs?n+="&refs="+JSON.stringify(e.refs):n+="&refs=[]",e.filesToDelete?n+="&filesToDelete="+JSON.stringify(e.filesToDelete):n+="&filesToDelete=[]",Object(r.d)("/disease",t,n)},u=function(e,t){var n=new FormData;n.append("id",e),Object(r.a)("/disease",t,n,"EMPTY")}},function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var r=n(0),a=function(e,t){var n=new FormData;if(void 0!==e&&e.length>0)for(var a=0;a<e.length;a++)n.append("files[]",e[a]);else n=null;Object(r.c)("/images",t,n,"EMPTY")},i=function(e,t){var n="disease_id="+e;Object(r.b)("/images",t,n)}},,,,function(e,t,n){"use strict";n.r(t);var r=n(3),a=n(1),i=n(2),o=JSON.parse(localStorage.getItem("disease"));document.getElementById("orphaCode_field").value=o.orpha_code,document.getElementById("name_field").value=o.name,document.getElementById("abbr_field").value=o.abbreviation,document.getElementById("subcategory_field").value=o.sub_category,document.getElementById("gene_field").value=o.gene_name,document.getElementById("gene_ref_field").value=o.gene_reference;var l=document.getElementById("disease_images_holder"),c=[];Object(r.a)(o.id,(function(e){null!==e?"true"===e.success?null!==e.images&&e.images.length>0&&e.images.forEach((function(e){var t=document.createElement("li");t.className="image",t.innerHTML='<img id="img-'.concat(e.id,'" src="').concat(a.a,"/static/").concat(e.image_url,'" class="image" />')+'<button class="btn" id="removeImg-'.concat(e.id,'" style="margin-bottom: 30px">Remove</button>'),l.appendChild(t),document.getElementById("removeImg-".concat(e.id)).addEventListener("click",(function(){var t=document.getElementById("img-".concat(e.id)),n=document.getElementById("removeImg-".concat(e.id)),r=t.style.opacity;"1"===r||""===r?(t.style.opacity="0.5",n.innerHTML="Cancel",c.push(e.id)):(t.style.opacity="1",n.innerHTML="Remove",c=c.filter((function(t){return t!==e.id})))}))})):alert(e.message):alert("Something went wrong. Could not load image.")}));var u=[];document.querySelector("#imageSelector").addEventListener("change",(function(e){e.preventDefault();var t=e.target.files,n=document.getElementById("new_disease_images_holder");Object.keys(t).forEach((function(e){var r=new FileReader,a=t[e];u.push(a),r.readAsDataURL(t[e]),r.onload=function(e){var t=document.createElement("li");t.className="full-width",t.innerHTML='<div><img src="'.concat(e.target.result,'" class="thumbnil" style="margin-right: 30px" />')+'<input id="input-'.concat(a.name,'" placeholder="Add reference" class="textBox"/></div>'),n.appendChild(t)}}))})),document.getElementById("confirmBtnId").addEventListener("click",(function(){var e=document.getElementById("orphaCode_field").value.trim(),t=document.getElementById("name_field").value.trim(),n=document.getElementById("abbr_field").value.trim(),a=document.getElementById("subcategory_field").value.trim(),l=document.getElementById("gene_field").value.trim(),d=document.getElementById("gene_ref_field").value.trim();if(0===t.length)alert("Name is required");else{var s={id:o.id,orphaCode:e,name:t,abbreviation:n,subCategory:a,geneName:l,geneRef:d,filesToDelete:c};if(void 0!==u&&u.length>0){var f=[],m=[];Object.keys(u).forEach((function(e){var t=u[e],n=document.getElementById("input-".concat(t.name)).value;f.push(t),m.push(n)})),function(e,t){void 0!==e?Object(r.b)(e,(function(e){null!==e?"true"===e.success?t("true",e.uploaded_files):(alert(e.message),t("false",null)):alert("Something went wrong. Please try again later.")})):t("false")}(f,(function(e,t){if("true"===e){var n={uploadedFiles:t,refs:m};Object.assign(n,s),Object(i.f)(n,(function(e){null!==e?"true"===e.success?(alert(e.message),location.href="browse.html"):alert(e.message):alert("Something went wrong. Please try again later.")}))}else alert("Only png and jpg image files are accepted")}))}else Object(i.f)(s,(function(e){"true"===e.success?(alert(e.message),location.href="browse.html"):alert(e.message)}))}})),document.getElementById("cancelBtnId").addEventListener("click",(function(){location.href="disease_details.html"}))}]);
//# sourceMappingURL=editDetails.js.map