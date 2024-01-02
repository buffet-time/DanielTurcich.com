import{d as Y,r as _,f as L,o as n,c,a as e,t as m,u as a,e as A,F as $,k as N,w as S,m as q,v as P,b as V,g as F,h as M,n as U,p as z,q as j,s as E,x as G,y as K,z as T,A as B}from"./index-LifHkACd.js";import{D as H,C as J,c as Q,P as I}from"./shared-UQEP7bSl.js";var O=(t=>(t[t.Album=0]="Album",t[t.EP=1]="EP",t[t["Live Album"]=2]="Live Album",t[t["Remix Album"]=3]="Remix Album",t[t.Soundtrack=4]="Soundtrack",t[t.Compilation=5]="Compilation",t[t["Demo Album"]=6]="Demo Album",t))(O||{}),s=(t=>(t[t.artist=0]="artist",t[t.name=1]="name",t[t.score=2]="score",t[t.type=3]="type",t[t.year=4]="year",t[t.genre=5]="genre",t[t.comments=6]="comments",t))(s||{});const W={class:"tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"},X={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},Z={class:"flex max-w-full gap-1"},R={class:"flex-auto overflow-hidden whitespace-nowrap text-ellipsis"},ee={class:"flex-none"},te={id:"releaseModal",class:"text-neutral-300 bg-[#383838]"},se={class:"flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"},ae={class:"whitespace-nowrap"},le=["d"],oe={class:"flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"},re={class:"mb-4"},ne={class:"flex justify-between p-4 items-center"},ue=Y({__name:"MusicRelease",props:{release:{}},setup(t){const d=_();L(async()=>{if(!d.value){console.error("Release Modal does not exist: ",d.value);return}await H([d.value]),J(d.value)});async function y(){await navigator.clipboard.writeText(` ${t.release[s.artist]} - ${t.release[s.name]}: ${t.release[s.score]}`)}return(v,h)=>(n(),c($,null,[e("div",{class:"tw-card bg-neutral-500 text-center m-2 cursor-pointer w-80 h-24 rounded",onClick:h[0]||(h[0]=l=>d.value?.showModal())},[e("div",W,[e("div",X,m(v.release[a(s).artist]),1),e("div",Z,[e("div",R,m(v.release[a(s).name]),1),e("div",ee,"("+m(v.release[a(s).score])+"/10)",1)])])]),e("dialog",{ref_key:"releaseModal",ref:d,class:"bg-transparent p-0 w-[88vw] max-w-xl"},[e("div",te,[e("div",se,[e("h5",null,[A(m(v.release[a(s).artist])+" - "+m(v.release[a(s).name])+" ",1),e("span",ae," ( "+m(v.release[a(s).score])+"/10 ) ",1)]),(n(),c("svg",{class:"w-6 min-w-[24px] cursor-pointer",viewBox:"0 0 24 24",onClick:h[1]||(h[1]=l=>d.value?.close())},[e("path",{fill:"currentColor",d:a(Q)},null,8,le)]))]),e("div",oe,[e("div",re,"Genres: "+m(v.release[a(s).genre]),1),v.release.length===7?(n(),c($,{key:0},[A(m(v.release[a(s).comments]),1)],64)):(n(),c($,{key:1},[A("No comments for this release.")],64))]),e("div",ne,[A(" ("+m(v.release[a(s).year])+" "+m(v.release[a(s).type])+") ",1),e("div",null,[e("button",{class:"tw-button mr-2",onClick:y},"Copy"),e("button",{type:"button",class:"tw-button",onClick:h[2]||(h[2]=l=>d.value?.close())}," Close ")])])])],512)],64))}}),ie={id:"searchContent",class:"w-full flex flex-col gap-2"},ce={class:"tw-select-container"},de=e("h3",{class:"tw-music-search-label"},"Search by",-1),ve=["value"],he=["value"],me=["value"],pe=["value"],fe=["value"],_e=["value"],be={class:"tw-select-container"},ye=e("h3",{class:"tw-music-search-label"},"Sort by",-1),we=["value"],ge=["value"],ke=["value"],Se=["value"],$e=["value"],xe=["value"],Ce={class:"tw-select-container"},Ae=e("h3",{class:"tw-music-search-label"},"Order",-1),qe=e("option",{value:!0},"Ascending",-1),Me=e("option",{value:!1},"Descending",-1),Ye=[qe,Me],De={class:"mt-2 flex justify-center"},Ne={key:0,class:"flex flex-col"},Pe={class:"mb-1"},Ve={key:1},je=["value"],Be={key:2,class:"flex flex-col"},Ie={for:"customRange1",class:"form-label"},Le=["placeholder","min","max"],Ue=["disabled"],ze={key:0,ref:"releases",class:"m-2 mt-4 mb-2 flex flex-wrap justify-center"},Oe={key:1},Fe=Y({__name:"Search",props:{search:{}},setup(t){const d=U(),y=z(),v=Object.keys(O).filter(u=>Number.isNaN(Number(u))),h=_([[""]]),l=_(s.artist),g=_(!1),x=_(!1),o=_("Daft Punk"),b=_(s.score),w=_(!0);N(l,async()=>{switch(l.value){case s.score:o.value="7";break;case s.type:o.value="Live Album";break;case s.year:o.value=String(t.search.currentYear);break;default:o.value=""}await d.replace({query:{tab:"Search",term:o.value,type:s[l.value]}})}),N(b,()=>{switch(b.value){case s.score:case s.year:w.value=!0;break;default:w.value=!1;break}k()}),N(w,()=>k()),L(()=>{if(y.query.term){o.value=y.query.term,l.value=s[y.query.type];const u=setInterval(()=>async()=>{t.search.initializing||(await p(),clearInterval(u))},250)}else y.query.type&&(l.value=s[y.query.type])});async function p(){g.value=!1,x.value=!1,o.value=o.value.trim();let u=!1;switch(l.value){case s.score:u=!0;break;case s.type:u=!0;break;case s.year:u=!0;break}h.value=f(l.value,u),k(),h.value.length>0?g.value=!0:x.value=!0,await d.replace({query:{tab:"Search",term:o.value,type:s[l.value]}})}function f(u,i){return t.search.releasesArray.filter(r=>i?r[u].toLowerCase()===o.value.toLowerCase():r[u].toLowerCase().includes(o.value.toLowerCase()))}function k(){if(w.value){h.value.sort((u,i)=>i[b.value]-u[b.value]);return}h.value.sort((u,i)=>u[b.value]-i[b.value])}return(u,i)=>(n(),c("div",ie,[e("div",ce,[de,S(e("select",{"onUpdate:modelValue":i[0]||(i[0]=r=>l.value=r),class:"tw-music-select"},[e("option",{value:a(s).artist},"Artist",8,ve),e("option",{value:a(s).name},"Release Name",8,he),e("option",{value:a(s).score},"Score",8,me),e("option",{value:a(s).type},"Type",8,pe),e("option",{value:a(s).year},"Year",8,fe),e("option",{value:a(s).genre},"Genre",8,_e)],512),[[q,l.value]])]),e("div",be,[ye,S(e("select",{"onUpdate:modelValue":i[1]||(i[1]=r=>b.value=r),class:"tw-music-select"},[e("option",{value:a(s).artist},"Artist",8,we),e("option",{value:a(s).name},"Release Name",8,ge),e("option",{value:a(s).score},"Score",8,ke),e("option",{value:a(s).type},"Type",8,Se),e("option",{value:a(s).year},"Year",8,$e),e("option",{value:a(s).genre},"Genre",8,xe)],512),[[q,b.value]])]),e("div",Ce,[Ae,S(e("select",{"onUpdate:modelValue":i[2]||(i[2]=r=>w.value=r),class:"tw-music-select"},Ye,512),[[q,w.value]])]),e("div",De,[l.value===a(s).score?(n(),c("div",Ne,[e("div",Pe,m(o.value),1),S(e("input",{"onUpdate:modelValue":i[3]||(i[3]=r=>o.value=r),placeholder:"10",type:"range",class:"w-64 bg-transparent h-2",min:"0",max:"10",step:"0.5"},null,512),[[P,o.value]])])):l.value===a(s).type?(n(),c("div",Ve,[S(e("select",{"onUpdate:modelValue":i[4]||(i[4]=r=>o.value=r),class:"text-black pl-4 py-2 rounded w-64"},[(n(!0),c($,null,V(a(v),(r,D)=>(n(),c("option",{key:D,value:r},m(r),9,je))),128))],512),[[q,o.value]])])):l.value===a(s).year?(n(),c("div",Be,[e("label",Ie,m(o.value),1),S(e("input",{"onUpdate:modelValue":i[5]||(i[5]=r=>o.value=r),placeholder:String(u.search.currentYear),type:"range",class:"w-64 bg-transparent h-2",min:u.search.earliestYear,max:u.search.currentYear,step:"1"},null,8,Le),[[P,o.value]])])):S((n(),c("input",{key:3,"onUpdate:modelValue":i[6]||(i[6]=r=>o.value=r),class:"w-64 py-2 px-3 text-black rounded",placeholder:"Search input",onKeyup:F(p,["enter"])},null,544)),[[P,o.value]]),e("button",{disabled:u.search.initializing||o.value.length<1,class:"ml-4 tw-button",onClick:p}," Search ",8,Ue)]),g.value?(n(),c("div",ze,[(n(!0),c($,null,V(h.value,(r,D)=>(n(),j(ue,{key:D,release:r},null,8,["release"]))),128))],512)):M("",!0),x.value?(n(),c("div",Oe,"No results from your search.")):M("",!0)]))}}),C=t=>(E("data-v-1c2f6801"),t=t(),G(),t),Ee={id:"statsContent",class:"w-full flex justify-center"},Ge={class:"table-auto text-white w-96 border-collapse bg-[#212529]"},Ke=C(()=>e("thead",{class:"border-solid p-2"},[e("tr",null,[e("th",null,"Stat"),e("th",null,"Value")])],-1)),Te=C(()=>e("th",null,"Number of releases",-1)),He=C(()=>e("th",null,"Number of artists",-1)),Je=C(()=>e("th",null,"Average Year",-1)),Qe=C(()=>e("th",null,"Average Score",-1)),We={key:0},Xe={key:1},Ze=Y({__name:"Stats",props:{stats:{}},setup(t){return(d,y)=>(n(),c("div",Ee,[e("table",Ge,[Ke,e("tbody",null,[e("tr",null,[Te,e("td",null,m(d.stats.numberOfReleases),1)]),e("tr",null,[He,e("td",null,m(d.stats.numberOfArtists),1)]),e("tr",null,[Je,e("td",null,m(d.stats.averageYear),1)]),e("tr",null,[Qe,e("td",null,m(d.stats.averageScore),1)]),(n(!0),c($,null,V(d.stats.releasesPerYear,(v,h)=>(n(),c("tr",{key:h},[h>0?(n(),c("th",We," Releases in the "+m(`${1950+h*10}s`),1)):(n(),c("th",Xe,"Releases before 1960")),e("td",null,m(v),1)]))),128))])])]))}}),Re=K(Ze,[["__scopeId","data-v-1c2f6801"]]),et={class:"tw-flex-col-center gap-4"},tt=e("h1",{class:"mt-4 text-2xl font-semibold"},"My Music Page",-1),lt=Y({__name:"Music",setup(t){const d=z(),y=U(),v=_(!0),h=_([[""]]),l=_("Search"),g=_();T(async()=>{const p=d.query.tab;p==="Stats"?b(p):await w("Search");let f=0;async function k(){f>2&&console.error("Can't get the data :(");const u=await Promise.all([x(),o()]),i=u[0],r=u[1];i&&r?(h.value=i,g.value=r,v.value=!1):setTimeout(()=>async()=>{await k(),f++},5e3)}await k()});async function x(){return await I("https://api.danielturcich.com/Releases")}async function o(){return await I("https://api.danielturcich.com/Stats")}function b(p){l.value=p}async function w(p){const f={query:{tab:p}};p==="Search"&&(f.query.type="artist"),await y.replace(f),b(p)}return(p,f)=>(n(),c("div",et,[tt,e("div",null,[e("button",{class:B(["tw-tab-button",{"bg-white":l.value==="Search","text-neutral-600":l.value==="Search"}]),type:"button",onClick:f[0]||(f[0]=k=>w("Search"))}," Search ",2),e("button",{class:B(["tw-tab-button",{"bg-white":l.value==="Stats","text-neutral-600":l.value==="Stats"}]),type:"button",onClick:f[1]||(f[1]=k=>w("Stats"))}," Stats ",2)]),v.value?M("",!0):(n(),c($,{key:0},[l.value==="Search"?(n(),j(Fe,{key:0,search:{currentYear:g.value.currentYear,earliestYear:g.value.earliestYear,releasesArray:h.value,initializing:v.value}},null,8,["search"])):l.value==="Stats"?(n(),j(Re,{key:1,stats:g.value},null,8,["stats"])):M("",!0)],64))]))}});export{lt as default};
//# sourceMappingURL=Music-U4EbZ7zJ.js.map
