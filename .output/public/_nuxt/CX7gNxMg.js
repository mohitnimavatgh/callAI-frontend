import{_ as ke}from"./CUT5Z0q2.js";import{_ as Me}from"./D_S4Iaa4.js";import{_ as ye}from"./0YgGQvqb.js";import{_ as xe}from"./r7gvbwgk.js";import{_ as $e}from"./eZAZD6-_.js";import{_ as we}from"./DX7fHSrm.js";import{_ as Pe}from"./C8daf2Og.js";import{n as Te,s as Ve,r as n,B as Re,C as Ue,v as W,o as j,c as Fe,a as o,b as s,w as I,u as a,H as G,I as J,x as Ne}from"./-26k3Kfm.js";import{u as Se}from"./DW01-4ge.js";import{u as qe}from"./BRwq4HAt.js";import{u as Be}from"./Dq2eM7QD.js";import{c as N,r as D,b as Ae,u as X}from"./Dw3NAe37.js";import"./D81Fu6OS.js";import"./lPBNpYtl.js";import"./DYk6i2Lg.js";const Le={class:"w-full h-full"},je={class:"p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-[20px]"},Ie={class:"flex space-x-2"},De=["onClick"],He=["onClick"],Ee={class:"p-3 sm:p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]"},Oe={class:"flex justify-around space-x-2"},Ye=["onClick"],ze=["onClick"],Ge=["onClick"],Je={class:"modal-content p-4 md:p-5"},Ke={class:"col-span-2"},Qe={class:"flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"},We={class:"modal-content p-4 md:p-5"},Xe={class:"col-span-2 mb-3"},Ze={class:"col-span-2 mb-3"},ea={class:"col-span-2"},aa={class:"flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"},ha=Te({__name:"index",setup(ta){const i=Be(),m=Se(),H=qe(),Z=Ve(),{$toast:C}=Ne(),k=n(!1),S=n(!1),E=n(null),q=n([]),O=n([]),Y=n(""),_=n(!1),z=n("Action"),ee=n([{value:"all",label:"All Calls",icon:"fa-regular fa-clock"},{value:"calendar",label:"Calendar Calls",icon:"fas fa-calendar"},{value:"manual",label:"Manual Call",icon:"fas fa-pen-fancy"}]),ae=n([{value:"all",label:"All Calls",icon:"fas fa-people-group"},{value:"your",label:"Your Calls",icon:"fas fa-user"},{value:"teams",label:"Teams Call",icon:"fas fa-user-plus"}]),K=n([{title:"Name",value:"name"},{title:"Type",value:"access_type"},{title:"Record",value:"record"},{title:"Calendar Platform",value:"is_type"},{title:"Date",value:"date"},{title:"Time",value:"time"},{title:"Meeting Platform",value:"platform"},{title:"Folder",value:"folder"},{title:"Action",value:"action"}]),v=n({name:"",folder_id:"",meeting_link:""}),te={bot:{name:{required:N.withMessage("The Name field is required",D)},folder_id:{required:N.withMessage("The Folder field is required",D)},meeting_link:{required:N.withMessage("The Meeting field is required",D),url:N.withMessage("Please Enter a valid Meeting URL",Ae)}}},r=X(te,{bot:v}),oe=e=>{let t=O.value[e];console.log("datr",t),v.value.id=t.id,v.value.name=t.name,v.value.folder_id=t.folder_id,v.value.meeting_link=t.meeting_link,_.value=!0},le=async()=>{await r.value.$validate()&&m.update(v.value).then(t=>{_.value=!1,b()}).catch(t=>{B(t),_.value=!1})},B=e=>{var t,x,$,w,g,P,T,A,V,R,U;if(((t=e==null?void 0:e.response)==null?void 0:t.status)==422){let l=($=(x=e==null?void 0:e.response)==null?void 0:x.data)==null?void 0:$.data;if(l){let F=Object.keys(l)[0],u=l[F];C.error(u[0],{duration:5e3})}else(g=(w=e==null?void 0:e.response)==null?void 0:w.data)!=null&&g.success?C.error("something went wrong...!",{duration:5e3}):C.error((T=(P=e==null?void 0:e.response)==null?void 0:P.data)==null?void 0:T.message,{duration:5e3})}else(V=(A=e==null?void 0:e.response)==null?void 0:A.data)!=null&&V.success?C.error("something went wrong...!",{duration:5e3}):C.error((U=(R=e==null?void 0:e.response)==null?void 0:R.data)==null?void 0:U.message,{duration:5e3})},M=n({page:1,meeting:"upcoming",type:"all",search:null}),p=n({page:1,meeting:"recorded",search:null,type:"all",action:null}),y=n({folder_id:"",meeting_id:null}),ne={folder:{folder_id:{required:N.withMessage("The Folder field is required",D)}}},h=X(ne,{folder:y}),se=n(["Reward","Promote","Activate account","Delete User"]),b=()=>{i.loading=!0,m.upcomingMeeting(M.value).then(e=>{i.loading=!1}).catch(e=>{i.loading=!1,B(e)})},f=()=>{i.loading=!0,m.recordedMeeting(p.value).then(e=>{i.loading=!1}).catch(e=>{i.loading=!1,B(e)})};Re(async()=>{await Ue(),await b(),await f()});const ie=e=>{p.value.type=e.value,f()},re=e=>{M.value.type=e.value,b()},de=e=>{M.value.search=e,b()},ce=e=>{p.value.search=e,f()},ue=e=>{M.value.page=e,b()},me=e=>{p.value.page=e,f()},pe=e=>{e==null?(p.value.action=null,z.value="Action"):(p.value.action=e.id,z.value=e.name),f()},fe=async()=>{await h.value.$validate()&&(i.loading=!0,m.shareMeeting(y.value).then(t=>{ge(),f(),i.loading=!1,k.value=!1}).catch(t=>{i.loading=!1,k.value=!1,B(t)}))},Q=()=>{y.value={folder_id:"",meeting_id:null},h.value.$reset(),k.value=!1},ge=()=>{y.value={folder_id:"",meeting_id:null},h.value.$reset()},_e=e=>{var t;y.value.meeting_id=(t=q.value[e])==null?void 0:t.id,k.value=!0},ve=e=>{var t;Z.push(`call-ai/calls/${(t=q.value[e])==null?void 0:t.id}`)},he=e=>{var t;S.value=!0,Y.value="recorded",E.value=(t=q.value[e])==null?void 0:t.id},be=e=>{var t;S.value=!0,Y.value="upcoming",E.value=(t=O.value[e])==null?void 0:t.id},Ce=e=>{S.value=!1,e&&(i.loading=!0,m.delete(E.value).then(t=>{i.loading=!1,(Y.value="upcoming")?b():f()}))},d=W(()=>{let e=m.upcoming;return O.value=e==null?void 0:e.data,e}),c=W(()=>{let e=m.recorded;return q.value=e==null?void 0:e.data,e});return(e,t)=>{var V,R,U;const x=ke,$=Me,w=ye,g=xe,P=$e,T=we,A=Pe;return j(),Fe("div",Le,[o("div",je,[s(x,{title:"Upcoming Meetings ",isSearchable:!0,filterTab:a(ee),headings:a(K),data:(V=a(d))==null?void 0:V.data,actions:a(se),onSearch:de,onTabClick:re},{action:I(({item:l,value:F,index:u})=>[o("div",Ie,[o("i",{class:"fas fa-pencil text-primary-400 cursor-pointer",onClick:L=>oe(u)},null,8,De),o("i",{onClick:L=>be(u),class:"fas fa-trash text-red-400 cursor-pointer"},null,8,He)])]),_:1},8,["filterTab","headings","data","actions"]),a(d)&&a(d).total&&a(d).per_page&&a(d).total>a(d).per_page?(j(),G($,{key:0,class:"mt-4 flex justify-end",totalRecords:a(d).total,currentPage:a(M).page,recordsPerPage:a(d).per_page,onPageChange:ue},null,8,["totalRecords","currentPage","recordsPerPage"])):J("",!0)]),o("div",Ee,[s(x,{headings:a(K),data:(R=a(c))==null?void 0:R.data,isSearchable:!0,isActionable:!0,actions:(U=a(H))==null?void 0:U.folders,title:"Recorded Meetings",onSearch:ce,filterTab:a(ae),onTabClick:ie,onSelect:pe,actionName:a(z)},{action:I(({item:l,value:F,index:u})=>[o("div",Oe,[o("i",{onClick:L=>_e(u),class:"fas fa-share-nodes cursor-pointer text-primary-400"},null,8,Ye),o("i",{onClick:L=>ve(u),class:"fas fa-eye text-blue-400 cursor-pointer"},null,8,ze),o("i",{onClick:L=>he(u),class:"fas fa-trash text-red-400 cursor-pointer"},null,8,Ge)])]),_:1},8,["headings","data","actions","filterTab","actionName"]),a(c)&&a(c).total&&a(c).per_page&&a(c).total>a(c).per_page?(j(),G($,{key:0,class:"mt-4 flex justify-end",totalRecords:a(c).total,currentPage:a(p).page,recordsPerPage:a(c).per_page,onPageChange:me},null,8,["totalRecords","currentPage","recordsPerPage"])):J("",!0)]),s(P,{title:"Share Meeting",subTitle:"Share call with your team member",show:a(k),onClose:Q},{default:I(()=>{var l;return[o("div",Je,[o("div",Ke,[s(w,{label:"Folder",placeholder:"Select Folder",id:"Folder",name:"folder",modelValue:a(h).folder.folder_id.$model,"onUpdate:modelValue":t[0]||(t[0]=F=>a(h).folder.folder_id.$model=F),errors:a(h).folder.folder_id.$errors,options:(l=a(H))==null?void 0:l.folders},null,8,["modelValue","errors","options"])])]),o("div",Qe,[s(g,{class:"mr-2",text:"Share Meeintg",frontIcon:"fas fa-share-nodes",onClick:fe}),s(g,{text:"Cancel",onClick:Q,outline:""})])]}),_:1},8,["show"]),s(P,{title:"Meeting Bot",subTitle:"Confra will join and record the meeting",show:a(_),onClose:t[5]||(t[5]=l=>_.value=!1)},{default:I(()=>[o("div",We,[o("div",Xe,[s(T,{id:"Name",label:"Meeting Name",name:"Name",type:"text",placeholder:"Name",modelValue:a(r).bot.name.$model,"onUpdate:modelValue":t[1]||(t[1]=l=>a(r).bot.name.$model=l),errors:a(r).bot.name.$errors},null,8,["modelValue","errors"])]),o("div",Ze,[s(w,{label:"Folder",placeholder:"Select Folder",id:"Folder",name:"folder",modelValue:a(r).bot.folder_id.$model,"onUpdate:modelValue":t[2]||(t[2]=l=>a(r).bot.folder_id.$model=l),errors:a(r).bot.folder_id.$errors,options:a(H).folders},null,8,["modelValue","errors","options"])]),o("div",ea,[s(T,{id:"Meeting URL",label:"Meeting URL",name:"Meeting URL",type:"text",placeholder:"Meeting URL",modelValue:a(r).bot.meeting_link.$model,"onUpdate:modelValue":t[3]||(t[3]=l=>a(r).bot.meeting_link.$model=l),errors:a(r).bot.meeting_link.$errors,disabled:!0},null,8,["modelValue","errors"])])]),o("div",aa,[s(g,{class:"mr-2",text:"Update Meeting",frontIcon:"fas fa-plus",onClick:le}),s(g,{text:"Cancel",onClick:t[4]||(t[4]=l=>_.value=!1),outline:""})])]),_:1},8,["show"]),a(S)?(j(),G(A,{key:0,onConfirmation:Ce})):J("",!0)])}}});export{ha as default};
