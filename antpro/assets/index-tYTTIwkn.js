import{G as Ze,b as qe,M as oe,c as re,U as Je,e as Qe,f as Xe,L as Ye,D as Re,g as Be,h as fe,S as et,i as tt,j as nt,m as ot,n as at,p as Te,q as lt,r as st,s as it,t as Ke,u as ue,v as be,w as Ue,x as dt,y as ve,z as Ce,B as ke,E as Se,F as rt,H as ut,N as ct,I as pt,J as mt,K as ht,T as yt,O as ft,R as kt,Q as gt}from"./antd-DvZ7CuFl.js";import{f as _t,u as e,d as U,$ as C,a2 as a,k as s,aa as bt,R as ne,a6 as ge,a7 as k,a8 as l,a0 as M,ab as L,E as K,ac as vt,s as q,c as v,r as _e,w as ie,ad as T,ae as $,F as A,P as G,af as P,ag as ee,ah as Ct,ai as ae,G as $t,aj as wt,n as Ae,z as xe,b as St,A as Le,ak as Lt,al as Me}from"./vue-DVTR9RGJ.js";import{_ as Mt,a as Ft,b as Rt}from"./index.vue_vue_type_style_index_0_lang-DQd7YHb5.js";import{u as Bt,a as Pe,b as He,i as We,c as Fe,o as Tt,d as De,e as Kt,f as ze,l as Ut,r as At,g as xt,p as Pt,h as Ht}from"./index-3jYClFkN.js";import{u as Oe,_ as Wt}from"./route-view.vue_vue_type_script_setup_true_lang-CAI98m59.js";function $e(){return new DOMException("The request is not allowed","NotAllowedError")}async function Dt(i){if(!navigator.clipboard)throw $e();return navigator.clipboard.writeText(i)}async function zt(i){const o=document.createElement("span");o.textContent=i,o.style.whiteSpace="pre",o.style.webkitUserSelect="auto",o.style.userSelect="all",document.body.appendChild(o);const t=window.getSelection(),c=window.document.createRange();t.removeAllRanges(),c.selectNode(o),t.addRange(c);let y=!1;try{y=window.document.execCommand("copy")}finally{t.removeAllRanges(),window.document.body.removeChild(o)}if(!y)throw $e()}async function Ot(i){try{await Dt(i)}catch(o){try{await zt(i)}catch(t){throw t||o||$e()}}}var Et=(i=3e3)=>{const o=_t(!1);return{copied:o,copy:c=>{const y=e(c);Ot(y).then(()=>{o.value=!0;const d=setTimeout(()=>{o.value=!1,clearTimeout(d)},i)})}}};function Q(i){return{type:String,default:i}}function pe(i){return{type:Number,default:i}}function I(i){return{type:Boolean,default:i}}function me(i){return{type:Array,default:i}}function de(){return{type:[Function,Array]}}function he(i,...o){if(typeof i=="function")return i(...o);if(Array.isArray(i))return i.map(t=>t(...o))}const Nt={href:"https://github.com/antdv-pro/antdv-pro",target:"_blank",flex:"","items-center":"","h-48px":"","px-12px":"","text-16px":"",class:"transition-all-300"},It=U({__name:"index",setup(i){return(o,t)=>(a(),C("a",Nt,[s(e(Ze))]))}}),Gt={flex:"","items-center":"","h-48px":"","px-12px":"","cursor-pointer":"",class:"transition-all-300"},jt={class:"anticon"},Vt=U({__name:"index",setup(i){const o=Bt(),t=Pe(),c=Oe(),y=He(),d=bt(),{avatar:r,nickname:p}=ne(t);async function m({key:h}){if(h==="logout"){const b=o.loading("退出登录...",0);try{await t.logout()}finally{b(),o.success("退出登录成功",3),d.push({path:"/login"}).then(()=>{c.clear(),y.clear()})}}}return(h,b)=>{const w=qe,_=ge("RouterLink"),g=re,n=Xe,u=oe,f=Re;return a(),k(f,null,{overlay:l(()=>[s(u,{onClick:m},{default:l(()=>[s(g,{key:"0"},{icon:l(()=>[s(e(Je))]),default:l(()=>[s(_,{to:"/account/center"},{default:l(()=>b[0]||(b[0]=[K(" 个人中心 ")])),_:1})]),_:1}),s(g,{key:"1"},{icon:l(()=>[s(e(Qe))]),default:l(()=>[s(_,{to:"/account/settings"},{default:l(()=>b[1]||(b[1]=[K(" 个人设置 ")])),_:1})]),_:1}),s(n),s(g,{key:"logout"},{icon:l(()=>[s(e(Ye))]),default:l(()=>[b[2]||(b[2]=K(" 退出登录 "))]),_:1})]),_:1})]),default:l(()=>[M("span",Gt,[s(w,{src:e(r),"mr-8px":"",size:"small"},null,8,["src"]),M("span",jt,L(e(p)),1)])]),_:1})}}});function Zt(i,o={}){const t=q(!1),c=v(()=>i.logo),y=v(()=>i.title),d=v(()=>i.layout),r=v(()=>i.collapsedWidth),p=v(()=>i.siderWidth),m=v(()=>i.menuData),h=v(()=>i.splitMenus),b=v(()=>i.fixedHeader),w=v(()=>i.fixedSider),_=v(()=>i.collapsed),g=v(()=>i.theme),n=v(()=>i.headerHeight),u=v(()=>i.contentWidth),f=v(()=>i.copyright),R=v(()=>i.isMobile),F=q(!1),V=()=>{F.value=!F.value},W=v(()=>i.header),j=v(()=>i.menu),Z=v(()=>i.footer),S=v(()=>i.menuHeader),x=v(()=>i.leftCollapsed),O=_e(new Map),D=_e({selectedKeys:[]});ie(m,()=>{var B;O.clear(),(B=m.value)==null||B.forEach(H=>{O.set(H.path,H)})},{immediate:!0});const le=v(()=>{var H,N;if(R.value||d.value!=="mix"||!h.value)return m.value;const B=(H=D.selectedKeys)==null?void 0:H[0];return B?((N=O.get(B))==null?void 0:N.children)??[]:[]}),E=B=>{D.selectedKeys=B},te=v(()=>i.openKeys),se=v(()=>i.selectedKeys),Ge=B=>{he(i["onUpdate:openKeys"],B)},je=B=>{he(i["onUpdate:selectedKeys"],B)},Ve=B=>{he(i.onMenuSelect,B)},ce=(B,H,N)=>{for(const z of H??[]){if(z.path===B)return N??z;if(z.children&&z.children.length){const we=ce(B,z.children,N??z);if(we)return we}}};return ie(se,()=>{var B;if(h.value){const H=(B=se.value)==null?void 0:B[0];if(H){const N=ce(H,m.value??[]);N&&(D.selectedKeys=[N.path])}}},{immediate:!0}),ie(h,()=>{var B,H;if(!h.value)D.selectedKeys=[];else{const N=((B=se.value)==null?void 0:B[0])??((H=te.value)==null?void 0:H[0])??"",z=ce(N,m.value??[]);z?D.selectedKeys=[z==null?void 0:z.path]:D.selectedKeys=[]}}),{logo:c,title:y,layout:d,collapsed:_,leftCollapsed:x,collapsedWidth:r,menuData:m,siderWidth:p,fixedHeader:b,fixedSider:w,headerHeight:n,theme:g,isMobile:R,mobileCollapsed:F,contentWidth:u,copyright:f,hasPageContainer:t,splitMenus:h,splitState:D,menuDataMap:O,selectedMenus:le,handleMobileCollapsed:V,header:W,menu:j,footer:Z,openKeys:te,handleOpenKeys:Ge,selectedKeys:se,handleSelectedKeys:je,handleMenuSelect:Ve,handleSplitSelectedKeys:E,menuHeader:S,...o}}const[qt,Jt]=vt(Zt),J=()=>Jt(),Qt={"c-primary":""},Xt=["src"],Yt={key:0},en=U({__name:"global-header-logo",setup(i){const{logo:o,title:t,layout:c,isMobile:y}=J(),d=v(()=>({"ant-pro-global-header-logo":c.value==="mix"||y.value,"ant-pro-top-nav-header-logo":c.value==="top"&&!y.value}));return(r,p)=>(a(),C("div",{class:T(e(d))},[M("a",Qt,[M("img",{src:e(o)},null,8,Xt),e(y)?$("",!0):(a(),C("h1",Yt,L(e(t)),1))])],2))}}),tn=U({__name:"index",setup(i){const{layout:o,isMobile:t,handleMobileCollapsed:c,theme:y,menuHeader:d,collapsed:r,handleCollapsed:p,leftCollapsed:m}=J(),h=q("ant-pro-global-header"),b=v(()=>({[h.value]:!0,[`${h.value}-layout-${o.value}`]:!!o.value,[`${h.value}-inverted`]:y.value==="inverted"&&o.value==="top"}));return(w,_)=>{const g=et;return a(),C("div",{class:T([e(b)])},[e(o)==="side"&&!e(t)&&!e(m)?(a(),C("span",{key:0,class:"ml-0 text-18px",onClick:_[0]||(_[0]=n=>{var u;return(u=e(p))==null?void 0:u(!e(r))})},[e(r)?(a(),k(e(Be),{key:0})):(a(),k(e(fe),{key:1}))])):$("",!0),e(d)?(a(),C(A,{key:1},[e(o)!=="side"||e(t)?(a(),k(en,{key:0})):$("",!0)],64)):$("",!0),e(t)?(a(),C("span",{key:2,class:"ant-pro-global-header-collapsed-button",onClick:_[1]||(_[1]=(...n)=>e(c)&&e(c)(...n))},[s(e(fe))])):$("",!0),M("div",{class:T(["flex-1",e(o)==="top"?`${e(h)}-top`:"overflow-x-auto"])},[G(w.$slots,"headerContent")],2),s(g,{align:"center","flex-shrink-0":""},{default:l(()=>[G(w.$slots,"headerActions")]),_:3})],2)}}}),nn=U({__name:"index",setup(i){const{headerHeight:o,fixedHeader:t,layout:c,isMobile:y,collapsed:d,collapsedWidth:r,siderWidth:p,menu:m,splitMenus:h,selectedMenus:b}=J(),w=v(()=>{const n={height:`${o.value}px`,lineHeight:`${o.value}px`,paddingInline:0};if((t.value||c.value==="mix")&&(n.zIndex=100,n.width="100%",n.right=0),c.value==="side"&&m.value){if(!y.value&&t.value){const u=d.value?r.value:p.value;n.width=`calc(100% - ${u}px)`}n.zIndex=19}return n}),_=v(()=>{const n=[];return(t.value||c.value==="mix")&&n.push("ant-pro-fixed-header"),c.value&&n.push("ant-pro-fixed-header-action"),c.value==="mix"&&n.push("ant-pro-fixed-header-inverted"),n}),g=v(()=>t.value||c.value==="mix"&&(h.value?(b.value??[]).length>0:!0));return(n,u)=>{const f=tt;return a(),C(A,null,[e(g)?(a(),k(f,{key:0,style:P({height:`${e(o)}px`,lineHeight:`${e(o)}px`,background:"transparent"})},null,8,["style"])):$("",!0),s(f,{style:P(e(w)),class:T(e(_))},{default:l(()=>[s(tn,null,ee({_:2},[n.$slots.headerActions?{name:"headerActions",fn:l(()=>[G(n.$slots,"headerActions")]),key:"0"}:void 0,n.$slots.headerContent?{name:"headerContent",fn:l(()=>[G(n.$slots,"headerContent")]),key:"1"}:void 0]),1024)]),_:3},8,["style","class"])],64)}}}),on="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20width='14.4921875px'%20height='15.1881617px'%20viewBox='0%200%2014.4921875%2015.1881617'%3e%3cg%20id='\\u9875\\u9762-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='\\u9996\\u9875\\u5907\\u4EFD-2'%20transform='translate(-381.5195,%20-1154.4486)'%3e%3cg%20id='\\u7F16\\u7EC4-55'%20transform='translate(319,%2048)'%3e%3cg%20id='\\u7F16\\u7EC4-3'%20transform='translate(50,%201102)'%3e%3cg%20id='\\u9996\\u9875\\u5907\\u4EFD-2'%20transform='translate(12.5195,%204.4486)'%3e%3cpath%20d='M13.048378,0.324880442%20C14.1910088,0.984578679%2014.6273774,2.41660692%2014.0468016,3.60140177%20L9.80002154,12.2679078%20C9.75914291,12.3513297%209.7144579,12.4316415%209.66627851,12.5087363%20C9.37581988,14.0065391%208.06786865,15.1426063%206.48996984,15.1681895%20L6.4453125,15.1685523%20L6.4453125,15.1881617%20L2.6171875,15.1881617%20C2.50136889,15.1881617%202.39070124,15.1830107%202.28518454,15.1727088%20C1.62858093,15.1086021%201.14826684,14.5243513%201.21237304,13.8677477%20C1.26012068,13.3786955%201.60247791,12.9687735%202.07519531,12.8346461%20L2.58342734,12.6904418%20C3.13640805,12.5335407%203.55255998,12.0766034%203.65722656,11.5114039%20L3.79120142,10.7879396%20C3.8192857,10.6362846%203.86523463,10.48849%203.92808792,10.3476445%20C4.15955359,9.82896234%204.45186015,9.42485649%204.80500762,9.13532698%20L9.78037794,1.14295359%20C10.4707617,0.0334647782%2011.9166994,-0.328494472%2013.048378,0.324880442%20Z%20M6.46413104,10.1493308%20L6.3928804,10.1496061%20C6.15439525,10.1552821%205.98549205,10.2077492%205.8469925,10.3046639%20L5.83918511,10.3101971%20C5.67019047,10.4314887%205.50586585,10.6462291%205.35495686,10.9843951%20C5.34395753,11.009043%205.33554668,11.0347551%205.32985298,11.0611174%20L5.32757956,11.0724541%20L5.1936047,11.7959183%20C5.05950946,12.5200326%204.6740037,13.1567647%204.12589933,13.6085986%20L4.10494141,13.6256617%20L4.8828125,13.6256617%20L6.46689453,13.6058179%20L6.49284244,13.6052111%20C7.41228937,13.5755256%208.14904568,12.8274137%208.16383583,11.9058787%20L8.1640625,11.8776148%20C8.1640625,10.9325283%207.40557996,10.1645949%206.46413104,10.1493308%20Z%20M11.1144426,1.95671945%20L11.10701,1.96845557%20L7.0675,8.46015388%20L7.10922139,8.4721378%20C7.93330525,8.71541262%208.66564205,9.17140314%209.2431137,9.77624472%20L9.26798828,9.80271247%20L12.6437041,2.91385286%20C12.8604905,2.4714517%2012.7013482,1.93765701%2012.2799769,1.68559671%20L12.267128,1.67804514%20C11.8694071,1.44842089%2011.3623464,1.57206073%2011.1144426,1.95671945%20Z'%20id='\\u5F62\\u72B6\\u7ED3\\u5408'%20fill='%2306f'%3e%3c/path%3e%3cpolygon%20id='\\u661F\\u5F62'%20fill='%23FF9900'%20points='2.90802486%208.3110303%202.1484375%209.69988044%201.38885014%208.3110303%200%207.55144294%201.38885014%206.79185558%202.1484375%205.40300544%202.90802486%206.79185558%204.296875%207.55144294'%3e%3c/polygon%3e%3cpolygon%20id='\\u661F\\u5F62\\u5907\\u4EFD'%20fill='%23FF9900'%20points='6.69214501%203.30608795%206.1328125%204.32878669%205.57347999%203.30608795%204.55078125%202.74675544%205.57347999%202.18742293%206.1328125%201.16472419%206.69214501%202.18742293%207.71484375%202.74675544'%3e%3c/polygon%3e%3cpolygon%20id='\\u661F\\u5F62\\u5907\\u4EFD-2'%20fill='%23FF9900'%20points='13.4694888%2011.5287442%2012.9101562%2012.5514429%2012.3508237%2011.5287442%2011.328125%2010.9694117%2012.3508237%2010.4100792%2012.9101562%209.38738044%2013.4694888%2010.4100792%2014.4921875%2010.9694117'%3e%3c/polygon%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",ye=U({__name:"async-icon",props:{icon:{type:[String,Function]}},setup(i){const o=i,t=v(()=>{if(We(o.icon)){const c=o.icon();if(c)return c}else return nt[o.icon]});return(c,y)=>c.icon?(a(),k(Ct(e(t)),{key:0})):$("",!0)}}),an=["href","target"],ln=["href","target"],Ee=U({__name:"sub-menu",props:{item:{},link:{type:Boolean,default:!0}},setup(i){function o(t){return We(t)?t():t}return(t,c)=>{const y=ge("sub-menu",!0),d=ge("RouterLink"),r=re,p=ot;return t.item.children&&!t.item.hideChildrenInMenu?(a(),k(p,{key:t.item.path},ee({title:l(()=>[K(L(o(t.item.title)),1)]),default:l(()=>[(a(!0),C(A,null,ae(t.item.children,m=>(a(),C(A,null,[m.hideInMenu?$("",!0):(a(),C(A,{key:0},[m.children?(a(),k(y,{key:m.path,item:m},null,8,["item"])):(a(),k(r,{key:m.path},ee({default:l(()=>[e(Fe)(m.path)?(a(),C("a",{key:1,href:m.path,target:m.target??"_blank"},L(o(m.title)),9,an)):(a(),C(A,{key:0},[t.link?(a(),k(d,{key:0,to:m.path},{default:l(()=>[K(L(o(m.title)),1)]),_:2},1032,["to"])):(a(),C(A,{key:1},[K(L(o(m.title)),1)],64))],64))]),_:2},[m.icon?{name:"icon",fn:l(()=>[s(ye,{icon:m.icon},null,8,["icon"])]),key:"0"}:void 0]),1024))],64))],64))),256))]),_:2},[t.item.icon?{name:"icon",fn:l(()=>[s(ye,{icon:t.item.icon},null,8,["icon"])]),key:"0"}:void 0]),1024)):(a(),k(r,{key:t.item.path},ee({default:l(()=>[e(Fe)(t.item.path)?(a(),C("a",{key:1,href:t.item.path,target:t.item.target??"_blank"},L(o(t.item.title)),9,ln)):(a(),C(A,{key:0},[t.link?(a(),k(d,{key:0,to:t.item.path},{default:l(()=>[K(L(o(t.item.title)),1)]),_:1},8,["to"])):(a(),C(A,{key:1},[K(L(o(t.item.title)),1)],64))],64))]),_:2},[t.item.icon?{name:"icon",fn:l(()=>[s(ye,{icon:t.item.icon},null,8,["icon"])]),key:"0"}:void 0]),1024))}}}),Ne=U({__name:"index",setup(i){const{theme:o,collapsed:t,layout:c,isMobile:y,selectedMenus:d,selectedKeys:r,openKeys:p,handleOpenKeys:m,handleSelectedKeys:h,handleMenuSelect:b}=J(),w=v(()=>o.value==="inverted"?"dark":o.value);return(_,g)=>{const n=oe;return a(),k(n,{"selected-keys":e(r),"open-keys":e(t)?[]:e(p),mode:e(c)==="top"&&!e(y)?"horizontal":"inline",theme:e(w),collapsed:e(t),class:"ant-pro-sider-menu","onUpdate:openKeys":e(m),"onUpdate:selectedKeys":e(h),onSelect:e(b)},{default:l(()=>[(a(!0),C(A,null,ae(e(d),u=>(a(),C(A,null,[u.hideInMenu?$("",!0):(a(),k(Ee,{key:u.path,item:u},null,8,["item"]))],64))),256))]),_:1},8,["selected-keys","open-keys","mode","theme","collapsed","onUpdate:openKeys","onUpdate:selectedKeys","onSelect"])}}}),sn=["src"],dn={key:0},rn={class:"flex-1 of-x-hidden of-y-auto scrollbar"},un={key:0},Ie=U({__name:"index",setup(i){const{collapsed:o,leftCollapsed:t,selectedMenus:c,splitMenus:y,layout:d,logo:r,theme:p,title:m,collapsedWidth:h,siderWidth:b,headerHeight:w,fixedSider:_,isMobile:g,header:n}=J(),u=q("ant-pro-sider"),f=v(()=>{const W={paddingTop:`${d.value!=="side"&&!g.value?w.value:0}px`,transition:"background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s",overflow:"hidden"};return d.value==="mix"&&n.value===!1&&(W.paddingTop="0px"),W}),R=v(()=>({[u.value]:!0,[`${u.value}-fixed`]:_.value,[`${u.value}-layout-${d.value}`]:!!d.value})),F=v(()=>(d.value==="side"||g.value)&&d.value!=="mix"),V=v(()=>({"ant-pro-sider-collapsed":o.value&&!g.value,"ant-pro-sider-logo-dark":p.value==="inverted"}));return(W,j)=>{const Z=re,S=oe,x=at;return a(),C(A,null,[e(_)?(a(),C("div",{key:0,style:P({width:e(o)?`${e(h)}px`:`${e(b)}px`,maxWidth:e(o)?`${e(h)}px`:`${e(b)}px`,minWidth:e(o)?`${e(h)}px`:`${e(b)}px`,...e(f)})},null,4)):$("",!0),!e(y)||(e(c)??[]).length>0?(a(),k(x,{key:1,theme:e(p)==="inverted"?"dark":"light",collapsed:e(o)&&!e(g),trigger:null,"collapsed-width":e(h),width:e(b),collapsible:"",class:T(e(R)),style:P(e(f))},{default:l(()=>[e(F)?(a(),C("div",{key:0,class:T(["ant-pro-sider-logo",e(V)])},[M("a",null,[M("img",{src:e(r),alt:"logo"},null,8,sn),!e(o)||e(g)?(a(),C("h1",dn,L(e(m)),1)):$("",!0)])],2)):$("",!0),M("div",rn,[s(Ne)]),!e(g)&&e(t)?(a(),C("div",{key:1,class:T(["w-100% flex-shrink-0 ant-pro-sider-collapsed-button",e(p)==="inverted"?"ant-pro-sider-collapsed-button-inverted":""])},[s(S,{class:"ant-pro-sider-menu themes",theme:e(p)==="inverted"?"dark":"light",selectable:!1},{default:l(()=>[s(Z,{style:P({width:e(o)?"34px":"76px",padding:(e(o),"16px 0 0 0")})},{icon:l(()=>[M("div",{style:P({width:e(o)?"34px":"76px"}),class:"themeIcon"},[j[0]||(j[0]=M("img",{width:"15",height:"15",src:on,alt:""},null,-1)),e(o)?$("",!0):(a(),C("span",un,"换肤"))],4)]),_:1},8,["style"])]),_:1},8,["theme"])],2)):$("",!0)]),_:1},8,["theme","collapsed","collapsed-width","width","class","style"])):$("",!0)],64)}}}),cn=U({__name:"index",setup(i){const{mobileCollapsed:o,siderWidth:t}=J();return(c,y)=>{const d=Te;return a(),k(d,{open:e(o),"onUpdate:open":y[0]||(y[0]=r=>$t(o)?o.value=r:null),closable:!1,placement:"left",width:e(t)},{default:l(()=>[s(Ie)]),_:1},8,["open","width"])}}}),pn=U({__name:"split-menu",setup(i){const{splitState:o,menuData:t,handleSplitSelectedKeys:c}=J(),y=v(()=>{var d;return(d=t.value)==null?void 0:d.map(r=>({...Tt(r,["children"]),childrenCount:(r.children??[]).length}))});return(d,r)=>{const p=oe;return a(),k(p,{mode:"horizontal",theme:"dark",class:"ant-pro-sider-menu-header","selected-keys":e(o).selectedKeys,"onUpdate:selectedKeys":e(c)},{default:l(()=>[(a(!0),C(A,null,ae(e(y),m=>(a(),C(A,null,[m.hideInMenu?$("",!0):(a(),k(Ee,{key:m.path,item:m,link:m.childrenCount<=0},null,8,["item","link"]))],64))),256))]),_:1},8,["selected-keys","onUpdate:selectedKeys"])}}}),mn={"onUpdate:openKeys":de(),"onUpdate:selectedKeys":de(),onMenuSelect:de()},hn={layout:Q("mix"),logo:Q(),title:Q(),collapsedWidth:pe(48),siderWidth:pe(175),headerHeight:pe(48),menuData:me(),fixedHeader:I(!1),fixedSider:I(!0),splitMenus:I(),collapsed:I(!1),leftCollapsed:I(!1),theme:Q("light"),onCollapsed:de(),isMobile:I(),contentWidth:Q(),header:I(!0),footer:I(!0),menu:I(!0),menuHeader:I(!0),openKeys:me(),selectedKeys:me(),copyright:Q(),...mn},yn=["data-theme"],fn=U({name:"BasicLayout",__name:"index",props:hn,emits:["update:collapsed"],setup(i,{emit:o}){const t=i,c=o,y=wt();function d(h){var b;c("update:collapsed",h),(b=t==null?void 0:t.onCollapsed)==null||b.call(t,h)}const{layout:r,contentWidth:p}=qt(t,{handleCollapsed:d}),m=v(()=>p.value==="Fixed"?"ant-pro-basicLayout-content-fixed":"");return(h,b)=>{const w=st,_=Ft,g=it,n=lt;return a(),C("div",{class:"ant-pro-basicLayout","data-theme":h.theme},[s(n,null,{default:l(()=>[h.menu?(a(),C(A,{key:0},[e(r)!=="top"&&!h.isMobile?(a(),k(Ie,{key:0})):$("",!0)],64)):$("",!0),s(n,null,{default:l(()=>[h.header?(a(),k(nn,{key:0},ee({_:2},[y.headerActions?{name:"headerActions",fn:l(()=>[G(h.$slots,"headerActions")]),key:"0"}:void 0,y.headerContent||e(r)==="top"||e(r)==="mix"?{name:"headerContent",fn:l(()=>[G(h.$slots,"headerContent",{},()=>[!h.isMobile&&e(r)==="top"?(a(),k(Ne,{key:0})):$("",!0),!h.isMobile&&e(r)==="mix"&&t.splitMenus?(a(),k(pn,{key:1})):$("",!0)])]),key:"1"}:void 0]),1024)):$("",!0),G(h.$slots,"contentPrefix"),s(w,{class:"ant-pro-basicLayout-content",flex:"","flex-col":""},{default:l(()=>[M("div",{"h-full":"",flex:"","flex-col":"","flex-1":"",class:T(e(m))},[G(h.$slots,"default")],2)]),_:3}),h.footer?(a(),k(g,{key:1,style:{"background-color":"transparent"}},{default:l(()=>[G(h.$slots,"footerRender",{},()=>[s(Mt,{copyright:h.copyright},ee({_:2},[y.renderFooterLinks?{name:"renderFooterLinks",fn:l(()=>[s(_)]),key:"0"}:void 0]),1032,["copyright"])])]),_:3})):$("",!0)]),_:3})]),_:3}),h.menu?(a(),k(cn,{key:0})):$("",!0)],8,yn)}}}),kn={"mb-24px":""},gn={"font-500":"","mb-12px":"","text-14px":"","line-height-22px":""},X=U({__name:"body",props:{title:{}},setup(i){return(o,t)=>(a(),C("div",kn,[M("h3",gn,L(o.title),1),G(o.$slots,"default")]))}}),Y=U({__name:"block-checkbox",props:{theme:{},isDark:{type:Boolean},checked:{type:Boolean},t:{type:Function}},setup(i){const o=i,t=q("ant-pro-drawer-setting-block-checkbox"),c=v(()=>({[`${t.value}-item`]:!0,[`${t.value}-theme-item`]:o.isDark,[`${t.value}-item-${o.theme}`]:!!o.theme,[`${t.value}-theme-item-${o.theme}`]:o.isDark})),{token:y}=De();return(d,r)=>{const p=ue;return a(),k(p,null,{title:l(()=>{var m;return[K(L(d.theme?(m=d.t)==null?void 0:m.call(d,`app.setting.pagestyle.${d.theme}`):""),1)]}),default:l(()=>{var m;return[M("div",{class:T(e(c))},[Ae(s(e(Ke),{style:P({color:(m=e(y))==null?void 0:m.colorPrimary}),class:T(`${e(t)}-selectIcon`)},null,8,["style","class"]),[[xe,d.checked]])],2)]}),_:1})}}}),_n=["onClick"],bn=U({__name:"theme-color",props:{colorList:{},color:{},onChange:{type:Function},t:{type:Function}},setup(i){const o=q("ant-pro-drawer-setting-theme-color");return(t,c)=>{const y=ue;return a(),C("div",{class:T(`${e(o)}`)},[M("div",{class:T(`${e(o)}-content`)},[(a(!0),C(A,null,ae(t.colorList,d=>(a(),k(y,{key:d.color},{title:l(()=>{var r;return[K(L((r=t.t)==null?void 0:r.call(t,`app.setting.themecolor.${d.key}`)),1)]}),default:l(()=>[M("div",{class:T(`${e(o)}-block`),style:P({backgroundColor:d.color}),onClick:r=>{var p;return(p=t.onChange)==null?void 0:p.call(t,d.color)}},[Ae(s(e(Ke),null,null,512),[[xe,t.color===d.color]])],14,_n)]),_:2},1024))),128))],2)],2)}}}),vn=U({__name:"layout-setting",props:{contentWidth:{},layout:{},fixedHeader:{type:Boolean},fixedSider:{type:Boolean},splitMenus:{type:Boolean},keepAlive:{type:Boolean},accordionMode:{type:Boolean},leftCollapsed:{type:Boolean},compactAlgorithm:{type:Boolean},t:{type:Function}},emits:["changeSetting"],setup(i,{emit:o}){const t=i,c=o,y=v(()=>[{title:"内容区域宽度",key:"contentWidth",disabled:!1,disabledReason:""},{title:"固定 Header",key:"fixedHeader",disabled:t.layout==="mix",disabledReason:""},{title:"固定侧边菜单",key:"fixSiderbar",disabled:!1,disabledReason:""},{title:"自动分割菜单",key:"splitMenus",disabled:t.layout!=="mix",disabledReason:""},{title:"缓存功能",key:"keepAlive",disabled:!1,disabledReason:""},{title:"菜单手风琴模式",key:"accordionMode",disabled:!1,disabledReason:""},{title:"侧边菜单折叠 左侧",key:"leftCollapsed",disabled:t.layout!=="side",disabledReason:""},{title:"紧凑模式",key:"compactAlgorithm",disabled:!1,disabledReason:""}]);function d(r,p){c("changeSetting",r,p)}return(r,p)=>{const m=dt,h=Ue,b=ve,w=be,_=ue,g=Ce;return a(),k(g,{"data-source":e(y),split:!1},{renderItem:l(({item:n})=>[s(_,{title:n.disabled?n.disabledReason:"",placement:"left"},{default:l(()=>[s(w,null,{actions:l(()=>[n.key==="contentWidth"?(a(),k(h,{key:0,size:"small",disabled:n.disabled,value:r.contentWidth||"Fluid","onUpdate:value":p[0]||(p[0]=u=>d("contentWidth",u))},{default:l(()=>[r.layout==="top"?(a(),k(m,{key:0,value:"Fixed"},{default:l(()=>{var u;return[K(L(((u=r.t)==null?void 0:u.call(r,"app.setting.content-width.fixed"))??"Fixed"),1)]}),_:1})):$("",!0),s(m,{value:"Fluid"},{default:l(()=>{var u;return[K(L(((u=r.t)==null?void 0:u.call(r,"app.setting.content-width.fluid"))??"Fluid"),1)]}),_:1})]),_:2},1032,["disabled","value"])):$("",!0),n.key==="fixedHeader"?(a(),k(b,{key:1,size:"small",checked:r.fixedHeader,disabled:n.disabled,"onUpdate:checked":p[1]||(p[1]=u=>d("fixedHeader",u))},null,8,["checked","disabled"])):$("",!0),n.key==="fixSiderbar"?(a(),k(b,{key:2,size:"small",checked:r.fixedSider,disabled:n.disabled,"onUpdate:checked":p[2]||(p[2]=u=>d("fixedSider",u))},null,8,["checked","disabled"])):$("",!0),n.key==="splitMenus"?(a(),k(b,{key:3,size:"small",checked:r.splitMenus,disabled:n.disabled,"onUpdate:checked":p[3]||(p[3]=u=>d("splitMenus",u))},null,8,["checked","disabled"])):$("",!0),n.key==="keepAlive"?(a(),k(b,{key:4,size:"small",checked:r.keepAlive,disabled:n.disabled,"onUpdate:checked":p[4]||(p[4]=u=>d("keepAlive",u))},null,8,["checked","disabled"])):$("",!0),n.key==="accordionMode"?(a(),k(b,{key:5,size:"small",checked:r.accordionMode,disabled:n.disabled,"onUpdate:checked":p[5]||(p[5]=u=>d("accordionMode",u))},null,8,["checked","disabled"])):$("",!0),n.key==="leftCollapsed"?(a(),k(b,{key:6,size:"small",checked:r.leftCollapsed,disabled:n.disabled,"onUpdate:checked":p[6]||(p[6]=u=>d("leftCollapsed",u))},null,8,["checked","disabled"])):$("",!0),n.key==="compactAlgorithm"?(a(),k(b,{key:7,size:"small",checked:r.compactAlgorithm,disabled:n.disabled,"onUpdate:checked":p[7]||(p[7]=u=>d("compactAlgorithm",u))},null,8,["checked","disabled"])):$("",!0)]),default:l(()=>{var u;return[M("span",{style:P({opacity:n.disabled?"0.5":"1"})},L(((u=r.t)==null?void 0:u.call(r,`app.setting.content-width.${n.key}`,n.title))??n.title),5)]}),_:2},1024)]),_:2},1032,["title"])]),_:1},8,["data-source"])}}}),Cn=U({__name:"regional-setting",props:{layout:{},header:{type:Boolean},footer:{type:Boolean},menu:{type:Boolean},watermark:{type:Boolean},menuHeader:{type:Boolean},multiTab:{type:Boolean},multiTabFixed:{type:Boolean},animationName:{},animationNameList:{},t:{type:Function}},emits:["changeSetting"],setup(i,{emit:o}){const t=i,c=o,y=v(()=>[{title:"动画",key:"animationName",disabled:!1,disabledReason:""},{title:"水印",key:"watermark",disabled:!1,disabledReason:""},{title:"顶栏",key:"header",disabled:!1,disabledReason:""},{title:"页脚",key:"footer",disabled:!1,disabledReason:""},{title:"菜单",key:"menu",disabled:t.layout==="top",disabledReason:""},{title:"菜单头",key:"menuHeader",disabled:!1,disabledReason:""},{title:"多页签",key:"multiTab",disabled:!1,disabledReason:""},{title:"固定多页签",key:"multiTabFixed",disabled:!1,disabledReason:"多页签开启后功能正常使用"}]);function d(r,p){c("changeSetting",r,p)}return(r,p)=>{const m=ve,h=Ue,b=be,w=ue,_=Ce;return a(),k(_,{"data-source":e(y),split:!1},{renderItem:l(({item:g})=>[s(w,{title:g.disabled?g.disabledReason:"",placement:"left"},{default:l(()=>[s(b,null,{actions:l(()=>[g.key!=="animationName"?(a(),k(m,{key:0,size:"small",checked:t[g.key],disabled:g.disabled,"onUpdate:checked":n=>d(g.key,n)},null,8,["checked","disabled","onUpdate:checked"])):(a(),k(h,{key:1,style:{width:"120px"},value:r.animationName,options:r.animationNameList,size:"small","onUpdate:value":n=>d(g.key,n)},null,8,["value","options","onUpdate:value"]))]),default:l(()=>{var n;return[M("span",{style:P({opacity:g.disabled?"0.5":"1"})},L(((n=r.t)==null?void 0:n.call(r,`app.setting.content-area.${g.key}`,g.title))??g.title),5)]}),_:2},1024)]),_:2},1032,["title"])]),_:1},8,["data-source"])}}}),$n=U({__name:"other-setting",props:{colorWeak:{type:Boolean},colorGray:{type:Boolean},t:{type:Function}},emits:["changeSetting"],setup(i,{emit:o}){const t=i,c=o,y=v(()=>[{title:"weakmode",key:"colorWeak",disabled:!1,disabledReason:""},{title:"graymode",key:"colorGray",disabled:!1,disabledReason:""}]);function d(p,m){c("changeSetting",p,m)}function r(p){return Reflect.get(t,p)}return(p,m)=>{const h=ve,b=be,w=Ce;return a(),k(w,{"data-source":e(y),split:!1},{renderItem:l(({item:_})=>[s(b,null,{actions:l(()=>[s(h,{size:"small",checked:r(_.key),disabled:_.disabled,"onUpdate:checked":g=>d(_.key,g)},null,8,["checked","disabled","onUpdate:checked"])]),default:l(()=>{var g;return[M("span",{style:P({opacity:_.disabled?"0.5":"1"})},L(((g=p.t)==null?void 0:g.call(p,`app.setting.${_.title}`,_.title))??_.title),5)]}),_:2},1024)]),_:1},8,["data-source"])}}}),wn={flex:"","gap-2":"","flex-col":""},Sn=U({name:"SettingDrawer",__name:"index",props:{open:{type:Boolean},theme:{default:"light"},colorPrimary:{},colorList:{default:()=>[{key:"techBlue",color:"#1677FF"},{key:"daybreak",color:"#1890ff"},{key:"dust",color:"#F5222D"},{key:"volcano",color:"#FA541C"},{key:"sunset",color:"#FAAD14"},{key:"cyan",color:"#13C2C2"},{key:"green",color:"#52C41A"},{key:"geekblue",color:"#2F54EB"},{key:"purple",color:"#722ED1"}]},layout:{},contentWidth:{},fixedHeader:{type:Boolean},fixedSider:{type:Boolean},splitMenus:{type:Boolean},keepAlive:{type:Boolean},accordionMode:{type:Boolean},leftCollapsed:{type:Boolean},watermark:{type:Boolean},header:{type:Boolean},footer:{type:Boolean},menu:{type:Boolean},menuHeader:{type:Boolean},colorWeak:{type:Boolean},colorGray:{type:Boolean},multiTab:{type:Boolean},multiTabFixed:{type:Boolean},compactAlgorithm:{type:Boolean},animationName:{},animationNameList:{},layoutSetting:{},t:{}},emits:["update:open","settingChange"],setup(i,{emit:o}){const t=i,c=o,{copy:y}=Et(),d=q("ant-pro-drawer-setting"),{message:r}=Kt();function p(){var n;y(JSON.stringify(t.layoutSetting??{})),r==null||r.success((n=t==null?void 0:t.t)==null?void 0:n.call(t,"app.setting.copyinfo","拷贝成功，请到 config/default-settings.js 中替换默认配置"))}function m(n){c("update:open",n)}function h(n){c("settingChange","theme",n)}function b(n){c("settingChange","colorPrimary",n)}function w(n){c("settingChange","layout",n)}function _(n,u){c("settingChange",n,u)}const{token:g}=De();return(n,u)=>{var W,j,Z;const f=rt,R=ut,F=pt,V=Te;return a(),C(A,null,[M("div",{class:T(`${e(d)}-handle`),style:P({backgroundColor:(W=e(g))==null?void 0:W.colorPrimary,borderEndStartRadius:`${(j=e(g))==null?void 0:j.borderRadius}px`,borderStartStartRadius:`${(Z=e(g))==null?void 0:Z.borderRadius}px`}),onClick:u[0]||(u[0]=S=>m(!n.open))},[n.open?(a(),k(e(ke),{key:0,class:T(`${e(d)}-handle-icon${n.theme==="light"?"":"-dark"}`),style:{"font-size":"20px"}},null,8,["class"])):(a(),k(e(Se),{key:1,class:T(`${e(d)}-handle-icon${n.theme==="light"?"":"-dark"}`),style:{"font-size":"20px"}},null,8,["class"]))],6),s(V,{open:n.open,width:300,placement:"right",closable:!1,"onUpdate:open":m},{handle:l(()=>{var S,x,O;return[M("div",{class:T(`${e(d)}-handle`),style:P({position:"absolute",top:"240px",right:"300px",backgroundColor:(S=e(g))==null?void 0:S.colorPrimary,borderEndStartRadius:`${(x=e(g))==null?void 0:x.borderRadius}px`,borderStartStartRadius:`${(O=e(g))==null?void 0:O.borderRadius}px`}),onClick:u[1]||(u[1]=D=>m(!n.open))},[n.open?(a(),k(e(ke),{key:0,class:T(`${e(d)}-handle-icon${t.theme==="light"?"":"-dark"}`),style:{"font-size":"20px"}},null,8,["class"])):(a(),k(e(Se),{key:1,class:T(`${e(d)}-handle-icon${t.theme==="light"?"":"-dark"}`),style:{"font-size":"20px"}},null,8,["class"]))],6)]}),default:l(()=>{var S,x,O,D,le;return[M("div",{class:T(`${e(d)}-content`)},[s(X,{title:((S=n.t)==null?void 0:S.call(n,"app.setting.pagestyle"))??"整体风格设计"},{default:l(()=>[M("div",{class:T(`${e(d)}-block-checkbox`)},[s(Y,{t:n.t,checked:t.theme==="light",theme:"light","is-dark":t.theme==="dark",onClick:u[2]||(u[2]=E=>h("light"))},null,8,["t","checked","is-dark"]),n.layout!=="mix"?(a(),k(Y,{key:0,t:n.t,checked:t.theme==="inverted",theme:"inverted","is-dark":t.theme==="dark",onClick:u[3]||(u[3]=E=>h("inverted"))},null,8,["t","checked","is-dark"])):$("",!0),s(Y,{t:n.t,checked:t.theme==="dark",theme:"dark","is-dark":t.theme==="dark",onClick:u[4]||(u[4]=E=>h("dark"))},null,8,["t","checked","is-dark"])],2)]),_:1},8,["title"]),s(X,{title:((x=n.t)==null?void 0:x.call(n,"app.setting.themecolor"))??"主题色"},{default:l(()=>[s(bn,{t:n.t,"color-list":n.colorList,color:n.colorPrimary,onChange:b},null,8,["t","color-list","color"])]),_:1},8,["title"]),s(f),s(X,{title:((O=n.t)==null?void 0:O.call(n,"app.setting.pagestyle.mode"))??"导航模式"},{default:l(()=>[M("div",{class:T(`${e(d)}-block-checkbox`)},[s(Y,{t:n.t,theme:"side",checked:n.layout==="side","is-dark":t.theme==="dark",onClick:u[5]||(u[5]=E=>w("side"))},null,8,["t","checked","is-dark"]),s(Y,{t:n.t,theme:"top",checked:n.layout==="top","is-dark":t.theme==="dark",onClick:u[6]||(u[6]=E=>w("top"))},null,8,["t","checked","is-dark"]),s(Y,{t:n.t,theme:"mix",checked:n.layout==="mix","is-dark":t.theme==="dark",onClick:u[7]||(u[7]=E=>w("mix"))},null,8,["t","checked","is-dark"])],2)]),_:1},8,["title"]),s(vn,{layout:n.layout,t:n.t,"content-width":n.contentWidth,"fixed-header":n.fixedHeader,"fixed-sider":n.fixedSider,"split-menus":n.splitMenus,"keep-alive":n.keepAlive,"accordion-mode":n.accordionMode,"left-collapsed":n.leftCollapsed,"compact-algorithm":n.compactAlgorithm,onChangeSetting:_},null,8,["layout","t","content-width","fixed-header","fixed-sider","split-menus","keep-alive","accordion-mode","left-collapsed","compact-algorithm"]),s(f),s(X,{title:((D=n.t)==null?void 0:D.call(n,"app.setting.content-area.title"))??"内容区域"},{default:l(()=>[s(Cn,{t:n.t,layout:n.layout,header:n.header,watermark:n.watermark,"menu-header":n.menuHeader,footer:n.footer,"animation-name":n.animationName,"animation-name-list":n.animationNameList,"multi-tab":n.multiTab,"multi-tab-fixed":n.multiTabFixed,menu:n.menu,onChangeSetting:_},null,8,["t","layout","header","watermark","menu-header","footer","animation-name","animation-name-list","multi-tab","multi-tab-fixed","menu"])]),_:1},8,["title"]),s(f),s(X,{title:((le=n.t)==null?void 0:le.call(n,"app.setting.othersettings"))??"其他设置"},{default:l(()=>[s($n,{t:n.t,"color-weak":n.colorWeak,"color-gray":n.colorGray,onChangeSetting:_},null,8,["t","color-weak","color-gray"])]),_:1},8,["title"]),s(f),s(X,null,{default:l(()=>{var E;return[M("div",wn,[s(R,{type:"warning","show-icon":"",message:((E=n.t)==null?void 0:E.call(n,"app.setting.production.hint"))??"配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件"},{icon:l(()=>[s(e(ct))]),_:1},8,["message"]),s(F,{onClick:p},{default:l(()=>{var te;return[s(e(mt)),K(" "+L((te=n.t)==null?void 0:te.call(n,"app.setting.copy","拷贝设置")),1)]}),_:1})])]}),_:1})],2)]}),_:1},8,["open"])],64)}}}),Ln=["onClick"],Mn=["onClick"],Fn={key:0,class:"w-12px"},Rn={key:1,class:"w-24px"},Bn={class:"w-48px flex item-center justify-center"},Tn=U({__name:"index",setup(i){const o=Oe(),{list:t,activeKey:c}=ne(o),{layoutSetting:y}=ne(ze()),{layout:d,collapsed:r,isMobile:p,handleCollapsed:m}=J(),h=v(()=>{const f={};return y.value.multiTabFixed&&(f.position="sticky",f.top=`${y.value.headerHeight}px`,f.zIndex=3,f.right=0),(y.value.header===!1||d.value!=="mix"&&y.value.fixedHeader===!1)&&(f.top="0px"),f}),b=q();function w({key:f},R){f==="closeCurrent"?o.close(c.value):f==="closeLeft"?o.closeLeft(R):f==="closeRight"?o.closeRight(R):f==="closeOther"?o.closeOther(R):f==="refresh"&&o.refresh(c.value)}const _=v(()=>t.value.length===1||t.value.filter(f=>!f.affix).length<=1);function g(f){return t.value.findIndex(F=>F.fullPath===f)===0||t.value.filter(F=>!F.affix).length<=1}function n(f){return t.value.findIndex(F=>F.fullPath===f)===t.value.length-1||t.value.filter(F=>!F.affix).length<=1}const u=v(()=>t.value.length===1||t.value.filter(f=>!f.affix).length<=1);return Ut(f=>{if(f.fullPath.startsWith("/redirect"))return;const R=t.value.find(F=>F.fullPath===f.fullPath);f.fullPath===c.value&&!(R!=null&&R.loading)||(c.value=f.fullPath,o.addItem(f))},!0),St(()=>{At()}),(f,R)=>{const F=re,V=oe,W=Re,j=ft,Z=yt;return a(),k(Z,{ref_key:"tabsRef",ref:b,"active-key":e(c),style:P(e(h)),class:"dark:bg-#242525 w-100% pro-ant-multi-tab","pt-10px":"",type:"card",size:"small","tab-bar-gutter":5,"onUpdate:activeKey":e(o).switchTab},{leftExtra:l(()=>[e(p)?(a(),C("div",Fn)):$("",!0),e(p)?$("",!0):(a(),C("div",Rn)),e(p)?$("",!0):(a(),C("div",{key:2,class:"collapsedIcon",onClick:R[0]||(R[0]=S=>{var x;return(x=e(m))==null?void 0:x(!e(r))})},[e(r)?(a(),k(e(Be),{key:0})):(a(),k(e(fe),{key:1}))]))]),rightExtra:l(()=>[M("div",Bn,[s(W,{trigger:["hover"]},{overlay:l(()=>[s(V,{onClick:R[1]||(R[1]=S=>w(S,e(c)))},{default:l(()=>[s(F,{key:"closeOther",disabled:e(_)||e(u)},{default:l(()=>[K(L(f.$t("app.multiTab.closeOther")),1)]),_:1},8,["disabled"]),s(F,{key:"refresh"},{default:l(()=>[K(L(f.$t("app.multiTab.refresh")),1)]),_:1})]),_:1})]),default:l(()=>[s(e(ht),{class:"text-16px"})]),_:1})])]),default:l(()=>[(a(!0),C(A,null,ae(e(t),S=>(a(),k(j,{key:S.fullPath},{tab:l(()=>[s(W,{trigger:["contextmenu"]},{overlay:l(()=>[s(V,{onClick:x=>w(x,S.fullPath)},{default:l(()=>[s(F,{key:"closeCurrent",disabled:e(_)||e(c)!==S.fullPath},{default:l(()=>[K(L(f.$t("app.multiTab.closeCurrent")),1)]),_:2},1032,["disabled"]),s(F,{key:"closeLeft",disabled:e(_)||g(S.fullPath)},{default:l(()=>[K(L(f.$t("app.multiTab.closeLeft")),1)]),_:2},1032,["disabled"]),s(F,{key:"closeRight",disabled:e(_)||n(S.fullPath)},{default:l(()=>[K(L(f.$t("app.multiTab.closeRight")),1)]),_:2},1032,["disabled"]),s(F,{key:"closeOther",disabled:e(_)||e(u)},{default:l(()=>[K(L(f.$t("app.multiTab.closeOther")),1)]),_:1},8,["disabled"]),s(F,{key:"refresh",disabled:!e(_)},{default:l(()=>[K(L(f.$t("app.multiTab.refresh")),1)]),_:1},8,["disabled"])]),_:2},1032,["onClick"])]),default:l(()=>[M("div",null,[K(L(S.locale?f.$t(S.locale):S.title)+" ",1),e(c)===S.fullPath?(a(),C("button",{key:0,class:"ant-tabs-tab-remove",style:{margin:"0"},onClick:Le(x=>e(o).refresh(S.fullPath),["stop"])},[s(e(kt),{spin:S.loading},null,8,["spin"])],8,Ln)):$("",!0),!S.affix&&e(t).length>1?(a(),C("button",{key:1,class:"ant-tabs-tab-remove",style:{margin:"0"},onClick:Le(x=>e(o).close(S.fullPath),["stop"])},[s(e(ke))],8,Mn)):$("",!0)])]),_:2},1024)]),_:2},1024))),128))]),_:1},8,["active-key","style","onUpdate:activeKey"])}}}),Kn={xl:1600,lg:1199,md:991,sm:767,xs:575};function Un(){const i=_e(Lt(Kn)),o=i.smaller("sm"),t=i.between("sm","md"),c=i.greater("md");return{breakpoints:i,isMobile:o,isPad:t,isDesktop:c}}const Dn=U({name:"ProLayout",__name:"index",setup(i){const o=ze(),{layoutSetting:t}=ne(o),c=Pe(),y=He(),{t:d}=xt(),{selectedKeys:r,openKeys:p}=ne(y),{isMobile:m,isPad:h}=Un();ie(h,w=>{w?o.toggleCollapsed(!0):o.toggleCollapsed(!1)});const b=v(()=>Pt(o.layoutSetting,["fixedHeader","fixedSider","splitMenus","menuHeader","header","menu","layout","footer","contentWidth","compactAlgorithm"]));return(w,_)=>{const g=Vt,n=Rt,u=It,f=gt;return a(),C(A,null,[s(fn,Me({collapsed:e(t).collapsed,theme:e(t).theme,"menu-data":e(c).menuData},e(b),{"selected-keys":e(r),"open-keys":e(t).layout==="top"?[]:e(p),copyright:e(t).copyright,"is-mobile":e(m),logo:e(t).logo,title:e(t).title,"accordion-mode":e(t).accordionMode,"left-collapsed":e(t).leftCollapsed,"header-height":e(t).headerHeight,"onUpdate:openKeys":e(y).handleOpenKeys,"onUpdate:selectedKeys":e(y).handleSelectedKeys,"onUpdate:collapsed":e(o).toggleCollapsed}),{headerActions:l(()=>[s(g),s(n),s(u)]),contentPrefix:l(()=>[e(t).multiTab?(a(),k(Tn,{key:0})):$("",!0)]),renderFooterLinks:l(()=>_[1]||(_[1]=[])),default:l(()=>[s(f,{class:"h-full w-full flex flex-col flex-1",content:e(t).watermark?e(t).title??"Antdv Pro":" "},{default:l(()=>[s(Wt)]),_:1},8,["content"])]),_:1},16,["collapsed","theme","menu-data","selected-keys","open-keys","copyright","is-mobile","logo","title","accordion-mode","left-collapsed","header-height","onUpdate:openKeys","onUpdate:selectedKeys","onUpdate:collapsed"]),s(Sn,Me({open:e(t).drawerVisible,"onUpdate:open":_[0]||(_[0]=R=>e(t).drawerVisible=R),t:e(d),theme:e(t).theme,"color-primary":e(t).colorPrimary,"color-weak":e(t).colorWeak,"color-gray":e(t).colorGray,"multi-tab":e(t).multiTab,"multi-tab-fixed":e(t).multiTabFixed,"animation-name-list":e(Ht),"animation-name":e(t).animationName,"keep-alive":e(t).keepAlive,"accordion-mode":e(t).accordionMode,"left-collapsed":e(t).leftCollapsed,watermark:e(t).watermark},e(b),{"layout-setting":e(t),onSettingChange:e(o).changeSettingLayout}),null,16,["open","t","theme","color-primary","color-weak","color-gray","multi-tab","multi-tab-fixed","animation-name-list","animation-name","keep-alive","accordion-mode","left-collapsed","watermark","layout-setting","onSettingChange"])],64)}}});export{Dn as default};
