import{d as M,r as b,f as D,o as r,c as i,a as e,t as c,u,e as $,F as w,k as N,w as C,m as z,v as Y,g as L,b as I,h as q,n as V,p as B,q as T,s as F,x as O,y as R,z as U,A as P}from"./index-4c070e4e.js";import{D as K,C as G,c as E,P as j}from"./shared-a8eb8048.js";var s=(t=>(t[t.artist=0]="artist",t[t.name=1]="name",t[t.score=2]="score",t[t.type=3]="type",t[t.year=4]="year",t[t.genre=5]="genre",t[t.comments=6]="comments",t))(s||{});const H={class:"tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"},J={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},Q={class:"flex max-w-full gap-1"},W={class:"flex-auto overflow-hidden whitespace-nowrap text-ellipsis"},X={class:"flex-none"},Z={id:"releaseModal",class:"text-neutral-300 bg-[#383838]"},ee={class:"flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"},te={class:"whitespace-nowrap"},se=["d"],ae={class:"flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"},le={class:"mb-4"},re={class:"flex justify-between p-4 items-center"},ne=M({__name:"MusicRelease",props:{index:null,release:null},setup(t){const p=t,h=b();D(async()=>{if(!h.value){console.error("Release Modal does not exist: ",h.value);return}await K([h.value]),G(h.value)});function f(){navigator.clipboard.writeText(` ${p.release[s.artist]} - ${p.release[s.name]}: ${p.release[s.score]}`)}return(m,o)=>(r(),i(w,null,[e("div",{class:"tw-card bg-neutral-500 text-center m-2 cursor-pointer w-80 h-24 rounded",onClick:o[0]||(o[0]=n=>h.value?.showModal())},[e("div",H,[e("div",J,c(t.release[u(s).artist]),1),e("div",Q,[e("div",W,c(t.release[u(s).name]),1),e("div",X,"("+c(t.release[u(s).score])+"/10)",1)])])]),e("dialog",{ref_key:"releaseModal",ref:h,class:"bg-transparent p-0 w-[88vw] max-w-xl"},[e("div",Z,[e("div",ee,[e("h5",null,[$(c(t.release[u(s).artist])+" - "+c(t.release[u(s).name])+" ",1),e("span",te," ( "+c(t.release[u(s).score])+"/10 ) ",1)]),(r(),i("svg",{class:"w-6 min-w-[24px] cursor-pointer",viewBox:"0 0 24 24",onClick:o[1]||(o[1]=n=>h.value?.close())},[e("path",{fill:"currentColor",d:u(E)},null,8,se)]))]),e("div",ae,[e("div",le,"Genres: "+c(t.release[u(s).genre]),1),t.release.length===7?(r(),i(w,{key:0},[$(c(t.release[u(s).comments]),1)],64)):(r(),i(w,{key:1},[$("No comments for this release.")],64))]),e("div",re,[$(" ("+c(t.release[u(s).year])+" "+c(t.release[u(s).type])+") ",1),e("div",null,[e("button",{class:"tw-button mr-2",onClick:f},"Copy"),e("button",{type:"button",class:"tw-button",onClick:o[2]||(o[2]=n=>h.value?.close())}," Close ")])])])],512)],64))}}),oe={id:"searchContent",class:"w-full"},ue=e("h3",{class:"mb-2"},"Search by:",-1),ce=["value"],ie=["value"],de=["value"],ve=["value"],he=["value"],fe={class:"m-4 flex justify-center"},me={key:0,class:"flex flex-col"},ye={class:"mb-1"},pe={key:1,class:"flex flex-col"},be={for:"customRange1",class:"form-label"},_e=["placeholder","min","max"],we=["onKeyup"],xe=["disabled"],ge={key:0,ref:"releases",class:"m-2 mt-4 mb-2 flex flex-wrap justify-center"},Se={key:1},ke=M({__name:"Search",props:{search:null},setup(t){const p=t,h=V(),f=B();let m=!0;const o=b([[""]]),n=b(s.artist),x=b(!1),g=b(!1),a=b("");N(n,()=>{if(!(m&&f.query.term)){switch(n.value){case s.score:a.value="7";break;case s.type:a.value="Album";break;case s.year:a.value=String(p.search.currentYear);break;default:a.value=""}h.replace({query:{tab:"Search",term:a.value,type:s[n.value]}})}}),D(()=>{if(f.query.term){a.value=f.query.term,n.value=s[f.query.type];const l=setInterval(()=>{p.search.initializing||(_(),clearInterval(l),m=!1)},250)}else f.query.type&&(n.value=s[f.query.type]),m=!1});function _(){x.value=!1,g.value=!1,a.value=a.value.trim();let l=!1;switch(n.value){case s.score:l=!0;break;case s.type:l=!0;break;case s.year:l=!0;break}o.value=y(n.value,l),o.value.length>0?x.value=!0:g.value=!0,h.replace({query:{tab:"Search",term:a.value,type:s[n.value]}})}function y(l,d){return p.search.releasesArray.filter(v=>d?v[l].toLowerCase()===a.value.toLowerCase():v[l].toLowerCase().includes(a.value.toLowerCase()))}return(l,d)=>(r(),i("div",oe,[ue,C(e("select",{"onUpdate:modelValue":d[0]||(d[0]=v=>n.value=v),class:"text-black pl-4 py-2 rounded w-72"},[e("option",{selected:"",value:u(s).artist},"Artist",8,ce),e("option",{value:u(s).name},"Release Name",8,ie),e("option",{value:u(s).score},"Score",8,de),e("option",{value:u(s).year},"Year",8,ve),e("option",{value:u(s).genre},"Genre",8,he)],512),[[z,n.value]]),e("div",fe,[n.value===u(s).score?(r(),i("div",me,[e("div",ye,c(a.value),1),C(e("input",{"onUpdate:modelValue":d[1]||(d[1]=v=>a.value=v),placeholder:"10",type:"range",class:"w-64 bg-transparent h-2",min:"0",max:"10",step:"0.5"},null,512),[[Y,a.value]])])):n.value===u(s).year?(r(),i("div",pe,[e("label",be,c(a.value),1),C(e("input",{"onUpdate:modelValue":d[2]||(d[2]=v=>a.value=v),placeholder:String(t.search.currentYear),type:"range",class:"w-64 bg-transparent h-2",min:t.search.earliestYear,max:t.search.currentYear,step:"1"},null,8,_e),[[Y,a.value]])])):C((r(),i("input",{key:2,"onUpdate:modelValue":d[3]||(d[3]=v=>a.value=v),class:"w-64 py-2 px-3 text-black rounded",placeholder:"Search input",onKeyup:L(_,["enter"])},null,40,we)),[[Y,a.value]]),e("button",{disabled:t.search.initializing||a.value.length<1,class:"ml-4 tw-button",onClick:_}," Search ",8,xe)]),x.value?(r(),i("div",ge,[(r(!0),i(w,null,I(o.value,(v,S)=>(r(),T(ne,{key:S,index:S,release:v},null,8,["index","release"]))),128))],512)):q("",!0),g.value?(r(),i("div",Se,"No results from your search.")):q("",!0)]))}}),k=t=>(F("data-v-1c2f6801"),t=t(),O(),t),$e={id:"statsContent",class:"w-full flex justify-center"},Ce={class:"table-auto text-white w-96 border-collapse bg-[#212529]"},qe=k(()=>e("thead",{class:"border-solid p-2"},[e("tr",null,[e("th",null,"Stat"),e("th",null,"Value")])],-1)),Me=k(()=>e("th",null,"Number of releases",-1)),Ye=k(()=>e("th",null,"Number of artists",-1)),Te=k(()=>e("th",null,"Average Year",-1)),Ae=k(()=>e("th",null,"Average Score",-1)),Pe={key:0},je={key:1},De=M({__name:"Stats",props:{stats:null},setup(t){return(p,h)=>(r(),i("div",$e,[e("table",Ce,[qe,e("tbody",null,[e("tr",null,[Me,e("td",null,c(t.stats.numberOfReleases),1)]),e("tr",null,[Ye,e("td",null,c(t.stats.numberOfArtists),1)]),e("tr",null,[Te,e("td",null,c(t.stats.averageYear),1)]),e("tr",null,[Ae,e("td",null,c(t.stats.averageScore),1)]),(r(!0),i(w,null,I(t.stats.releasesPerYear,(f,m)=>(r(),i("tr",{key:m},[m>0?(r(),i("th",Pe," Releases in the "+c(`${1950+m*10}s`),1)):(r(),i("th",je,"Releases before 1960")),e("td",null,c(f),1)]))),128))])])]))}});const Ie=R(De,[["__scopeId","data-v-1c2f6801"]]),Ve={class:"tw-flex-col-center gap-4"},Be=e("h1",{class:"mt-4 text-2xl font-semibold"},"My Music Page",-1),Le=M({__name:"Music",setup(t){const p=B(),h=V(),f=b(!0),m=b([[""]]),o=b("Stats"),n=b();U(()=>{const y=p.query.tab;y==="Search"?a(y):_("Stats");let l=0;async function d(){l>2&&console.error("Can't get the data :(");const v=await Promise.all([x(),g()]),S=v[0],A=v[1];S&&A?(m.value=S,n.value=A,f.value=!1):setTimeout(()=>{d(),l++},5e3)}d()});async function x(){return await j("https://api.danielturcich.com/Releases")}async function g(){return await j("https://api.danielturcich.com/Stats")}function a(y){o.value=y}function _(y){const l={query:{tab:y}};y==="Search"&&(l.query.type="artist"),h.replace(l),a(y)}return(y,l)=>(r(),i("div",Ve,[Be,e("div",null,[e("button",{class:P(["tw-tab-button",{"bg-white":o.value==="Stats","text-neutral-600":o.value==="Stats"}]),type:"button",onClick:l[0]||(l[0]=d=>_("Stats"))}," Stats ",2),e("button",{class:P(["tw-tab-button",{"bg-white":o.value==="Search","text-neutral-600":o.value==="Search"}]),type:"button",onClick:l[1]||(l[1]=d=>_("Search"))}," Search ",2)]),f.value?q("",!0):(r(),i(w,{key:0},[o.value==="Stats"?(r(),T(Ie,{key:0,stats:n.value},null,8,["stats"])):o.value==="Search"?(r(),T(ke,{key:1,search:{currentYear:n.value.currentYear,earliestYear:n.value.earliestYear,releasesArray:m.value,initializing:f.value}},null,8,["search"])):q("",!0)],64))]))}});export{Le as default};
