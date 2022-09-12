import{d as M,r as _,k as D,o as r,c as i,a as e,t as c,u,e as C,F as x,j as N,w as k,m as z,v as Y,f as L,b as I,g as q,n as V,p as B,q as T,s as F,x as O,_ as R,y as U,z as A}from"./index.47f635d3.js";import{D as K,C as E,c as G,P}from"./shared.e7e049c1.js";var s=(t=>(t[t.artist=0]="artist",t[t.name=1]="name",t[t.score=2]="score",t[t.type=3]="type",t[t.year=4]="year",t[t.genre=5]="genre",t[t.comments=6]="comments",t))(s||{});const H={class:"tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"},J={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},Q={class:"flex max-w-full gap-1"},W={class:"flex-auto overflow-hidden whitespace-nowrap text-ellipsis"},X={class:"flex-none"},Z={id:"releaseModal",class:"text-neutral-300 bg-[#383838]"},ee={class:"flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"},te={class:"whitespace-nowrap"},se=["d"],ae={class:"flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"},le={class:"mb-4"},re=C("No comments for this release."),oe={class:"flex justify-between p-4 items-center"},ne=M({__name:"MusicRelease",props:{index:null,release:null},setup(t){const b=t,h=_();D(async()=>{if(!h.value){console.error("Release Modal does not exist: ",h.value);return}await K([h.value]),E(h.value)});function f(){navigator.clipboard.writeText(` ${b.release[s.artist]} - ${b.release[s.name]}: ${b.release[s.score]}`)}return(y,n)=>(r(),i(x,null,[e("div",{class:"tw-card bg-neutral-500 text-center m-2 cursor-pointer w-80 h-24 rounded",onClick:n[0]||(n[0]=o=>{var m;return(m=h.value)==null?void 0:m.showModal()})},[e("div",H,[e("div",J,c(t.release[u(s).artist]),1),e("div",Q,[e("div",W,c(t.release[u(s).name]),1),e("div",X,"("+c(t.release[u(s).score])+"/10)",1)])])]),e("dialog",{ref_key:"releaseModal",ref:h,class:"bg-transparent p-0 w-[88vw] max-w-xl"},[e("div",Z,[e("div",ee,[e("h5",null,[C(c(t.release[u(s).artist])+" - "+c(t.release[u(s).name])+" ",1),e("span",te," ( "+c(t.release[u(s).score])+"/10 ) ",1)]),(r(),i("svg",{class:"w-6 min-w-[24px] cursor-pointer",viewBox:"0 0 24 24",onClick:n[1]||(n[1]=o=>{var m;return(m=h.value)==null?void 0:m.close()})},[e("path",{fill:"currentColor",d:u(G)},null,8,se)]))]),e("div",ae,[e("div",le,"Genres: "+c(t.release[u(s).genre]),1),t.release.length===7?(r(),i(x,{key:0},[C(c(t.release[u(s).comments]),1)],64)):(r(),i(x,{key:1},[re],64))]),e("div",oe,[C(" ("+c(t.release[u(s).year])+" "+c(t.release[u(s).type])+") ",1),e("div",null,[e("button",{class:"tw-button mr-2",onClick:f},"Copy"),e("button",{type:"button",class:"tw-button",onClick:n[2]||(n[2]=o=>{var m;return(m=h.value)==null?void 0:m.close()})}," Close ")])])])],512)],64))}}),ue={id:"searchContent",class:"w-full"},ce=e("h3",{class:"mb-2"},"Search by:",-1),ie=["value"],de=["value"],ve=["value"],he=["value"],fe=["value"],me={class:"m-4 flex justify-center"},ye={key:0,class:"flex flex-col"},pe={class:"mb-1"},be={key:1,class:"flex flex-col"},_e={for:"customRange1",class:"form-label"},we=["placeholder","min","max"],xe=["onKeyup"],ge=["disabled"],Se={key:0,ref:"releases",class:"m-2 mt-4 mb-2 flex flex-wrap justify-center"},$e={key:1},ke=M({__name:"Search",props:{search:null},setup(t){const b=t,h=V(),f=B();let y=!0;const n=_([[""]]),o=_(s.artist),m=_(!1),g=_(!1),a=_("");N(o,()=>{if(!(y&&f.query.term)){switch(o.value){case s.score:a.value="7";break;case s.type:a.value="Album";break;case s.year:a.value=String(b.search.currentYear);break;default:a.value=""}h.replace({query:{tab:"Search",term:a.value,type:s[o.value]}})}}),D(()=>{if(f.query.term){a.value=f.query.term,o.value=s[f.query.type];const l=setInterval(()=>{b.search.initializing||(w(),clearInterval(l),y=!1)},250)}else f.query.type&&(o.value=s[f.query.type]),y=!1});function w(){m.value=!1,g.value=!1,a.value=a.value.trim();let l=!1;switch(o.value){case s.score:l=!0;break;case s.type:l=!0;break;case s.year:l=!0;break}n.value=p(o.value,l),n.value.length>0?m.value=!0:g.value=!0,h.replace({query:{tab:"Search",term:a.value,type:s[o.value]}})}function p(l,v){return b.search.releasesArray.filter(d=>v?d[l].toLowerCase()===a.value.toLowerCase():d[l].toLowerCase().includes(a.value.toLowerCase()))}return(l,v)=>(r(),i("div",ue,[ce,k(e("select",{"onUpdate:modelValue":v[0]||(v[0]=d=>o.value=d),class:"text-black pl-4 py-2 rounded w-72"},[e("option",{selected:"",value:u(s).artist},"Artist",8,ie),e("option",{value:u(s).name},"Release Name",8,de),e("option",{value:u(s).score},"Score",8,ve),e("option",{value:u(s).year},"Year",8,he),e("option",{value:u(s).genre},"Genre",8,fe)],512),[[z,o.value]]),e("div",me,[o.value===u(s).score?(r(),i("div",ye,[e("div",pe,c(a.value),1),k(e("input",{"onUpdate:modelValue":v[1]||(v[1]=d=>a.value=d),placeholder:"10",type:"range",class:"w-64 bg-transparent h-2",min:"0",max:"10",step:"0.5"},null,512),[[Y,a.value]])])):o.value===u(s).year?(r(),i("div",be,[e("label",_e,c(a.value),1),k(e("input",{"onUpdate:modelValue":v[2]||(v[2]=d=>a.value=d),placeholder:String(t.search.currentYear),type:"range",class:"w-64 bg-transparent h-2",min:t.search.earliestYear,max:t.search.currentYear,step:"1"},null,8,we),[[Y,a.value]])])):k((r(),i("input",{key:2,"onUpdate:modelValue":v[3]||(v[3]=d=>a.value=d),class:"w-64 py-2 px-3 text-black rounded",placeholder:"Search input",onKeyup:L(w,["enter"])},null,40,xe)),[[Y,a.value]]),e("button",{disabled:t.search.initializing||a.value.length<1,class:"ml-4 tw-button",onClick:w}," Search ",8,ge)]),m.value?(r(),i("div",Se,[(r(!0),i(x,null,I(n.value,(d,S)=>(r(),T(ne,{key:S,index:S,release:d},null,8,["index","release"]))),128))],512)):q("",!0),g.value?(r(),i("div",$e,"No results from your search.")):q("",!0)]))}}),$=t=>(F("data-v-b72f9c04"),t=t(),O(),t),Ce={id:"statsContent",class:"w-full flex justify-center"},qe={class:"table-auto text-white w-96 border-collapse bg-[#212529]"},Me=$(()=>e("thead",{class:"border-solid p-2"},[e("tr",null,[e("th",null,"Stat"),e("th",null,"Value")])],-1)),Ye=$(()=>e("th",null,"Number of releases",-1)),Te=$(()=>e("th",null,"Number of artists",-1)),je=$(()=>e("th",null,"Average Year",-1)),Ae=$(()=>e("th",null,"Average Score",-1)),Pe={key:0},De={key:1},Ie=M({__name:"Stats",props:{stats:null},setup(t){return(b,h)=>(r(),i("div",Ce,[e("table",qe,[Me,e("tbody",null,[e("tr",null,[Ye,e("td",null,c(t.stats.numberOfReleases),1)]),e("tr",null,[Te,e("td",null,c(t.stats.numberOfArtists),1)]),e("tr",null,[je,e("td",null,c(t.stats.averageYear),1)]),e("tr",null,[Ae,e("td",null,c(t.stats.averageScore),1)]),(r(!0),i(x,null,I(t.stats.releasesPerYear,(f,y)=>(r(),i("tr",{key:y},[y>0?(r(),i("th",Pe," Releases in the "+c(`${1950+y*10}s`),1)):(r(),i("th",De,"Releases before 1960")),e("td",null,c(f),1)]))),128))])])]))}});const Ve=R(Ie,[["__scopeId","data-v-b72f9c04"]]),Be={class:"tw-flex-col-center gap-4"},Ne=e("h1",{class:"mt-4 text-2xl font-semibold"},"My Music Page",-1),Fe=M({__name:"Music",setup(t){const b=B(),h=V(),f=_(!0),y=_([[""]]),n=_("Stats"),o=_();U(()=>{const p=b.query.tab;p==="Search"?a(p):w("Stats");let l=0;function v(){l>2&&console.error("Can't get the data :("),Promise.all([m(),g()]).then(d=>{const S=d[0],j=d[1];S&&j?(y.value=S,o.value=j,f.value=!1):setTimeout(()=>{v(),l++},5e3)}).catch(d=>{console.error(`Error in Music.vue promise.all(): ${d}`)})}v()});async function m(){return await P("https://api.danielturcich.com/Releases")}async function g(){return await P("https://api.danielturcich.com/Stats")}function a(p){n.value=p}function w(p){const l={query:{tab:p}};p==="Search"&&(l.query.type="artist"),h.replace(l),a(p)}return(p,l)=>(r(),i("div",Be,[Ne,e("div",null,[e("button",{class:A(["tw-tab-button",{"bg-white":n.value==="Stats","text-neutral-600":n.value==="Stats"}]),type:"button",onClick:l[0]||(l[0]=v=>w("Stats"))}," Stats ",2),e("button",{class:A(["tw-tab-button",{"bg-white":n.value==="Search","text-neutral-600":n.value==="Search"}]),type:"button",onClick:l[1]||(l[1]=v=>w("Search"))}," Search ",2)]),f.value?q("",!0):(r(),i(x,{key:0},[n.value==="Stats"?(r(),T(Ve,{key:0,stats:o.value},null,8,["stats"])):n.value==="Search"?(r(),T(ke,{key:1,search:{currentYear:o.value.currentYear,earliestYear:o.value.earliestYear,releasesArray:y.value,initializing:f.value}},null,8,["search"])):q("",!0)],64))]))}});export{Fe as default};
