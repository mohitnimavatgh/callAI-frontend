import{v as M,o as h,c as v,a as u,G as b,S as k,F as B,I as T,E as _,t as L}from"./-26k3Kfm.js";const z={"aria-label":"Page navigation example"},H={class:"flex items-center -space-x-px h-8 text-sm"},X=u("span",{class:"sr-only"},"Previous",-1),J=u("svg",{class:"w-2.5 h-2.5 rtl:rotate-180","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10"},[u("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 1 1 5l4 4"})],-1),K=[X,J],Q={key:0},Y=["onClick"],Z={key:1},ee={key:2},te=u("span",{class:"sr-only"},"Next",-1),re=u("svg",{class:"w-2.5 h-2.5 rtl:rotate-180","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10"},[u("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 9 4-4-4-4"})],-1),ne=[te,re],l=5,ae={__name:"Pagination",props:{totalRecords:{type:Number,required:!0},currentPage:{type:Number,required:!0},recordsPerPage:{type:Number,required:!0}},emits:["page-change"],setup(e,{emit:t}){const s=e,r=M(()=>Math.ceil(s.totalRecords/s.recordsPerPage)),d=t;function g(o){d("page-change",o)}function f(){let o,n;return r.value<=l?(o=1,n=r.value):s.currentPage<=Math.ceil(l/2)?(o=1,n=l):s.currentPage>=r.value-Math.floor(l/2)?(o=r.value-l+1,n=r.value):(o=s.currentPage-Math.floor(l/2),n=o+l-1),Array.from({length:n-o+1},(c,y)=>o+y)}const i=M(()=>({flex:!0,"items-center":!0,"justify-center":!0,"px-3":!0,"h-8":!0,"leading-tight":!0,"bg-white":!0,border:!0,"border-gray-300":!0,"hover:bg-gray-100":!0,"hover:text-gray-700":!0,"dark:bg-gray-800":!0,"dark:border-gray-700":!0,"dark:text-gray-400":!0,"dark:hover:bg-gray-700":!0,"dark:hover:text-white":!0}));return(o,n)=>(h(),v("nav",z,[u("ul",H,[u("li",{class:b(e.currentPage>1?"cursor-pointer":"pointer-events-none opacity-60")},[u("a",{href:"#",onClick:n[0]||(n[0]=k(c=>g(e.currentPage-1),["prevent"])),class:"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"},K)],2),e.currentPage>=l?(h(),v(B,{key:0},[u("li",null,[u("a",{href:"#",onClick:n[1]||(n[1]=k(c=>g(1),["prevent"])),class:b([i.value,{"text-primary-500 bg-gray-100 dark:text-primary-500":e.currentPage===1,"text-gray-500":e.currentPage!==1}])},"1",2)]),e.currentPage>l+3?(h(),v("li",Q,[u("span",{class:b(["flex items-center justify-center px-3 h-8 leading-tight text-gray-500",i.value])},"...",2)])):T("",!0)],64)):T("",!0),(h(!0),v(B,null,_(f(),c=>(h(),v("li",{key:c},[u("a",{href:"#",onClick:k(y=>g(c),["prevent"]),class:b([i.value,{"text-primary-500 bg-gray-100 dark:text-primary-500":e.currentPage===c,"text-gray-500":e.currentPage!==c}])},L(c),11,Y)]))),128)),e.currentPage<r.value-l-2&&r.value>l+1?(h(),v("li",Z,[u("span",{class:b(["flex items-center justify-center px-3 h-8 leading-tight text-gray-500",i.value])},"...",2)])):T("",!0),e.currentPage<r.value-3&&r.value>l+3?(h(),v("li",ee,[u("a",{href:"#",onClick:n[2]||(n[2]=k(c=>g(r.value),["prevent"])),class:b([i.value,{"text-primary-500 bg-gray-100 dark:text-primary-500":e.currentPage===r.value,"text-gray-500":e.currentPage!==r.value}])},L(r.value),3)])):T("",!0),u("li",{class:b(e.currentPage<r.value?"cursor-pointer":"pointer-events-none opacity-60")},[u("a",{href:"#",onClick:n[3]||(n[3]=k(c=>g(e.currentPage+1),["prevent"])),class:"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"},ne)],2)])]))}},Ne=ae;var ie=typeof global=="object"&&global&&global.Object===Object&&global,oe=typeof self=="object"&&self&&self.Object===Object&&self,F=ie||oe||Function("return this")(),j=F.Symbol,q=Object.prototype,se=q.hasOwnProperty,ue=q.toString,p=j?j.toStringTag:void 0;function ce(e){var t=se.call(e,p),s=e[p];try{e[p]=void 0;var r=!0}catch{}var d=ue.call(e);return r&&(t?e[p]=s:delete e[p]),d}var le=Object.prototype,ge=le.toString;function de(e){return ge.call(e)}var fe="[object Null]",ye="[object Undefined]",R=j?j.toStringTag:void 0;function me(e){return e==null?e===void 0?ye:fe:R&&R in Object(e)?ce(e):de(e)}function he(e){return e!=null&&typeof e=="object"}var ve="[object Symbol]";function be(e){return typeof e=="symbol"||he(e)&&me(e)==ve}var xe=/\s/;function ke(e){for(var t=e.length;t--&&xe.test(e.charAt(t)););return t}var pe=/^\s+/;function Pe(e){return e&&e.slice(0,ke(e)+1).replace(pe,"")}function I(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var W=NaN,Te=/^[-+]0x[0-9a-f]+$/i,je=/^0b[01]+$/i,we=/^0o[0-7]+$/i,Se=parseInt;function A(e){if(typeof e=="number")return e;if(be(e))return W;if(I(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=I(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Pe(e);var s=je.test(e);return s||we.test(e)?Se(e.slice(2),s?2:8):Te.test(e)?W:+e}var C=function(){return F.Date.now()},Oe="Expected a function",Ce=Math.max,Ie=Math.min;function Ee(e,t,s){var r,d,g,f,i,o,n=0,c=!1,y=!1,w=!0;if(typeof e!="function")throw new TypeError(Oe);t=A(t)||0,I(s)&&(c=!!s.leading,y="maxWait"in s,g=y?Ce(A(s.maxWait)||0,t):g,w="trailing"in s?!!s.trailing:w);function S(a){var m=r,x=d;return r=d=void 0,n=a,f=e.apply(x,m),f}function G(a){return n=a,i=setTimeout(P,t),c?S(a):f}function V(a){var m=a-o,x=a-n,E=t-m;return y?Ie(E,g-x):E}function $(a){var m=a-o,x=a-n;return o===void 0||m>=t||m<0||y&&x>=g}function P(){var a=C();if($(a))return N(a);i=setTimeout(P,V(a))}function N(a){return i=void 0,w&&r?S(a):(r=d=void 0,f)}function D(){i!==void 0&&clearTimeout(i),n=0,r=o=d=i=void 0}function U(){return i===void 0?f:N(C())}function O(){var a=C(),m=$(a);if(r=arguments,d=this,o=a,m){if(i===void 0)return G(o);if(y)return clearTimeout(i),i=setTimeout(P,t),S(o)}return i===void 0&&(i=setTimeout(P,t)),f}return O.cancel=D,O.flush=U,O}export{Ne as _,Ee as d};
