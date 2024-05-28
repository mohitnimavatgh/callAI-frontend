import{_ as W}from"./DX7fHSrm.js";import{_ as X,a as Y}from"./DNl09rS6.js";import{_ as Z}from"./r7gvbwgk.js";import{_ as ee}from"./CUT5Z0q2.js";import{_ as te}from"./D_S4Iaa4.js";import{_ as se}from"./C8daf2Og.js";import{n as ae,r as p,v as oe,B as ne,C as ie,o as _,c as N,a,b as T,u as s,F as ce,E as le,H as $,w as ue,I as S,x as re}from"./-26k3Kfm.js";import{u as de}from"./DII67Ipf.js";import{c as U,r as F,u as me}from"./Dw3NAe37.js";import{u as pe}from"./Dq2eM7QD.js";import"./D81Fu6OS.js";import"./lPBNpYtl.js";import"./DYk6i2Lg.js";const _e={class:"mt-5"},fe=a("div",null,[a("h4",{class:"text-lg font-semibold text-gray-600 dark:text-white"},"Manage Quick Questions"),a("p",{class:"text-xs font-normal text-gray-500 mt-0.5"},"Customize your Quick Questions")],-1),ge={class:"box mt-3 lg:w-2/3 w-full bg-white dark:bg-gray-800"},ke={class:"mt-3"},ve=a("label",{class:"text-sm font-medium text-gray-500"},"Quick Question Access",-1),Qe={class:"grid w-full gap-3 md:grid-cols-2"},he={class:"my-4 flex justify-end"},ye={class:"box mt-5 bg-white dark:bg-gray-800"},xe={class:"flex justify-start"},be=["onClick"],qe=["onClick"],je=ae({__name:"quick-questions",setup(we){const o=pe(),C=p(!1),P=p([]),f=de(),{$toast:c}=re(),g=p({page:1,search:""}),I=[{value:"private",icon:"fas fa-lock",labelText:"Private Access",description:"Restrict visibility to admins only, hiding it from team members."},{value:"public",icon:"fas fa-user-group",labelText:"Team Access",description:"Grant team members access, making the folder visible to all."}],j=[{title:"Name",value:"name"},{title:"Access",value:"access_type"},{title:"Action",value:"action"}],V=p(!1),l=oe(()=>{let e=f.quickQuestions;return P.value=e==null?void 0:e.data,e}),A=p(null),u=p({name:"",access_type:"private"}),E={quickQuestion:{name:{required:U.withMessage("The Name field is required",F)},access_type:{required:U.withMessage("The Quick Question Access field is required",F)}}},i=me(E,{quickQuestion:u}),m=()=>{o.loading=!0,f.list(g.value).then(e=>{o.loading=!1}).catch(e=>{o.loading=!1,Q(e)})},L=()=>{document.getElementById("mainBody").scrollTo({top:0,behavior:"smooth"})};ne(async()=>{await ie(),await m()});const M=async()=>{await i.value.$validate()&&(o.loading=!0,f.create(u.value).then(t=>{o.loading=!1,c.success("Quick Question Create Successfully",{duration:1e4}),m(),R()}).catch(t=>{o.loading=!1,Q(t)}))},R=()=>{u.value.name="",u.value.access_type="private",i.value.$reset()},D=e=>{C.value=!0;let t=P.value[e];u.value.id=t.id,u.value.name=t.name,u.value.access_type=t.access_type,L()},H=e=>{var t;V.value=!0,A.value=(t=P.value[e])==null?void 0:t.id},z=async()=>{await i.value.$validate()&&(o.loading=!0,f.update(u.value).then(t=>{C.value=!1,o.loading=!1,c.success("Quick Question Updated Successfully",{duration:1e4}),R(),m()}).catch(t=>{o.loading=!1,Q(t)}))},Q=e=>{var t,h,y,x,k,b,q,w,v,n,d;if(((t=e==null?void 0:e.response)==null?void 0:t.status)==422){let r=(y=(h=e==null?void 0:e.response)==null?void 0:h.data)==null?void 0:y.data;if(r){let B=Object.keys(r)[0],K=r[B];c.error(K[0],{duration:5e3})}else(k=(x=e==null?void 0:e.response)==null?void 0:x.data)!=null&&k.success?c.error("something went wrong...!",{duration:5e3}):c.error((q=(b=e==null?void 0:e.response)==null?void 0:b.data)==null?void 0:q.message,{duration:5e3})}else(v=(w=e==null?void 0:e.response)==null?void 0:w.data)!=null&&v.success?c.error("something went wrong...!",{duration:5e3}):c.error((d=(n=e==null?void 0:e.response)==null?void 0:n.data)==null?void 0:d.message,{duration:5e3})},G=e=>{g.value.page=1,g.value.search=e,m()},O=e=>{g.value.page=e,m()},J=e=>{V.value=!1,e&&(o.loading=!0,f.delete(A.value).then(t=>{o.loading=!1,c.success("Quick Question Deleted Successfully",{duration:1e4}),m()}).catch(t=>{o.loading=!1,Q(t)}))};return(e,t)=>{var v;const h=W,y=X,x=Y,k=Z,b=ee,q=te,w=se;return _(),N("div",_e,[fe,a("div",ge,[T(h,{id:"Title",class:"mt-4",label:"Title",name:"Title",type:"text",placeholder:"Enter Title",modelValue:s(i).quickQuestion.name.$model,"onUpdate:modelValue":t[0]||(t[0]=n=>s(i).quickQuestion.name.$model=n),errors:s(i).quickQuestion.name.$errors},null,8,["modelValue","errors"]),a("div",ke,[ve,a("ul",Qe,[(_(),N(ce,null,le(I,(n,d)=>a("li",{key:d,class:"mt-2"},[T(y,{id:`radio-${d}`,name:"access",value:n.value,modelValue:s(i).quickQuestion.access_type.$model,"onUpdate:modelValue":t[1]||(t[1]=r=>s(i).quickQuestion.access_type.$model=r),errors:s(i).quickQuestion.access_type.$errors},null,8,["id","value","modelValue","errors"]),T(x,{icon:n.icon,id:`radio-${d}`,labelText:n.labelText,description:n.description},null,8,["icon","id","labelText","description"])])),64))])]),a("div",he,[s(C)?(_(),$(k,{key:1,text:"Update Quick Question",onClick:z,frontIcon:"fas fa-plus",class:"m-0"})):(_(),$(k,{key:0,text:"Add Quick Question",onClick:M,frontIcon:"fas fa-plus",class:"m-0"}))])]),a("div",ye,[T(b,{headings:j,data:(v=s(l))==null?void 0:v.data,isSearchable:!0,title:"Quick Questions",onSearch:G},{action:ue(({item:n,value:d,index:r})=>[a("div",xe,[a("i",{onClick:B=>D(r),class:"fas fa-pen cursor-pointer text-blue-400 mr-3"},null,8,be),a("i",{onClick:B=>H(r),class:"fas fa-trash cursor-pointer text-red-400"},null,8,qe)])]),_:1},8,["data"]),s(l)&&s(l).total&&s(l).per_page&&s(l).total>s(l).per_page?(_(),$(q,{key:0,class:"mt-4 flex justify-end",totalRecords:s(l).total,currentPage:s(g).page,recordsPerPage:s(l).per_page,onPageChange:O},null,8,["totalRecords","currentPage","recordsPerPage"])):S("",!0)]),s(V)?(_(),$(w,{key:0,onConfirmation:J})):S("",!0)])}}});export{je as default};
