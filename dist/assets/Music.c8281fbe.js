import{d as N,r as f,o as F,b as o,e as v,f as t,t as d,u as a,l as j,F as $,y as U,z as H,x as Q,w as q,A as V,m as P,g as B,n as Z,B as L,q as z,p as E,h as G,C as I}from"./vendor.ff821898.js";import{d as R,c as ee}from"./dialog-polyfill.esm.c4f433fc.js";import{_ as K}from"./index.f58048fd.js";var s=(e=>(e[e.artist=0]="artist",e[e.name=1]="name",e[e.score=2]="score",e[e.type=3]="type",e[e.year=4]="year",e[e.genre=5]="genre",e[e.comments=6]="comments",e))(s||{}),T=(e=>(e[e["1950s"]=0]="1950s",e[e["1960s"]=1]="1960s",e[e["1970s"]=2]="1970s",e[e["1980s"]=3]="1980s",e[e["1990s"]=4]="1990s",e[e["2000s"]=5]="2000s",e[e["2010s"]=6]="2010s",e[e["2020s"]=7]="2020s",e))(T||{});const te={class:"tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"},se={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},ae={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},le={id:"releaseModal",class:"text-neutral-300 bg-[#383838] w-96"},re={class:"flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"},oe={class:"whitespace-nowrap"},ne=["d"],ue={class:"flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"},ie={class:"mb-4"},ce=j("No comments for this release."),de={class:"flex justify-between p-4 items-center"},ve=N({props:{index:null,release:null},setup(e){const m=e;let _;const i=f();F(()=>{R.registerDialog(i.value),_=document.querySelector("#releaseModal")});function b(){navigator.clipboard.writeText(` ${m.release[s.artist]} - ${m.release[s.name]}: ${m.release[s.score]}`)}function x(){i.value.showModal(),setTimeout(()=>{document.addEventListener("click",n)},0)}function p(){document.removeEventListener("click",n),i.value.close()}function n(g){g.composedPath().includes(_)||p()}return(g,w)=>(o(),v($,null,[t("div",{class:"tw-card bg-neutral-500 text-center m-2 cursor-pointer w-80 h-24 rounded",onClick:x},[t("div",te,[t("h5",se,d(e.release[a(s).artist]),1),t("h6",ae,d(e.release[a(s).name])+" ("+d(e.release[a(s).score])+"/10) ",1)])]),t("dialog",{ref_key:"releaseModal",ref:i,class:"bg-transparent"},[t("div",le,[t("div",re,[t("h5",null,[j(d(e.release[a(s).artist])+" - "+d(e.release[a(s).name])+" ",1),t("span",oe," ( "+d(e.release[a(s).score])+"/10 ) ",1)]),(o(),v("svg",{class:"w-6 min-w-[24px] cursor-pointer",viewBox:"0 0 24 24",onClick:p},[t("path",{fill:"currentColor",d:a(ee)},null,8,ne)]))]),t("div",ue,[t("div",ie,"Genres: "+d(e.release[a(s).genre]),1),e.release.length===7?(o(),v($,{key:0},[j(d(e.release[a(s).comments]),1)],64)):(o(),v($,{key:1},[ce],64))]),t("div",de,[j(" ("+d(e.release[a(s).year])+" "+d(e.release[a(s).type])+") ",1),t("div",null,[t("button",{class:"tw-button mr-2",onClick:b},"Copy"),t("button",{type:"button",class:"tw-button",onClick:p}," Close ")])])])],512)],64))}});const he=e=>(E("data-v-491b3606"),e=e(),G(),e),me={id:"searchContent",class:"w-full"},ye=he(()=>t("h3",{class:"mb-2"},"Search by:",-1)),pe=["value"],fe=["value"],be=["value"],_e=["value"],ge=["value"],we=["value"],xe={class:"m-4 flex justify-center"},ke={key:0,class:"flex flex-col"},Se={class:"mb-1"},$e={key:1},Ae=["value"],Ce={key:2,class:"flex flex-col"},Ye={for:"customRange1",class:"form-label"},qe=["placeholder","min","max"],Me=["onKeyup"],je=["disabled"],Te={key:0,ref:"releases",class:"m-2 mt-4 mb-2 flex flex-wrap justify-center"},Ne={key:1},Oe=N({props:{currentYear:null,earliestYear:null,releasesArray:null,initializing:{type:Boolean}},setup(e){const m=e,_=U(),i=H();let b=!0;const x=m.currentYear,p=f([[""]]),n=f(s.artist),g=f(!1),w=f(!1),l=f(""),A=["Album","EP","Live Album","Soundtrack","Remix Album","Compilation","Demo Album"];Q(n,()=>{if(!(b&&i.query.term))switch(_.replace({query:{tab:"Search",term:l.value,type:s[n.value]}}),n.value){case s.score:l.value="7";break;case s.type:l.value="Album";break;case s.year:l.value=String(x);break;default:l.value=""}}),F(()=>{if(i.query.term){l.value=i.query.term,n.value=s[i.query.type];const y=setInterval(()=>{m.initializing||(C(),clearInterval(y),b=!1)},250)}else i.query.type&&(n.value=s[i.query.type])});function C(){g.value=!1,w.value=!1,l.value=l.value.trim();let y=!1;switch(n.value){case s.score:y=!0;break;case s.type:y=!0;break;case s.year:y=!0;break}p.value=Y(n.value,y),p.value.length>0?g.value=!0:w.value=!0,_.replace({query:{tab:"Search",term:l.value,type:s[n.value]}})}function Y(y,h){return m.releasesArray.filter(u=>h?u[y].toLowerCase()===l.value.toLowerCase():u[y].toLowerCase().includes(l.value.toLowerCase()))}return(y,h)=>(o(),v("div",me,[ye,q(t("select",{"onUpdate:modelValue":h[0]||(h[0]=u=>n.value=u),class:"text-black pl-4 py-2 rounded w-72"},[t("option",{selected:"",value:a(s).artist},"Artist",8,pe),t("option",{value:a(s).name},"Release Name",8,fe),t("option",{value:a(s).score},"Score",8,be),t("option",{value:a(s).type},"Type",8,_e),t("option",{value:a(s).year},"Year",8,ge),t("option",{value:a(s).genre},"Genre",8,we)],512),[[V,n.value]]),t("div",xe,[n.value===a(s).score?(o(),v("div",ke,[t("div",Se,d(l.value),1),q(t("input",{"onUpdate:modelValue":h[1]||(h[1]=u=>l.value=u),placeholder:"10",type:"range",class:"w-64 bg-transparent h-2",min:"0",max:"10",step:"0.5"},null,512),[[P,l.value]])])):n.value===a(s).type?(o(),v("div",$e,[q(t("select",{"onUpdate:modelValue":h[2]||(h[2]=u=>l.value=u),class:"text-black pl-4 py-2 rounded w-64"},[(o(),v($,null,B(A,(u,k)=>t("option",{key:k,value:u},d(u),9,Ae)),64))],512),[[V,l.value]])])):n.value===a(s).year?(o(),v("div",Ce,[t("label",Ye,d(l.value),1),q(t("input",{"onUpdate:modelValue":h[3]||(h[3]=u=>l.value=u),placeholder:String(a(x)),type:"range",class:"w-64 bg-transparent h-2",min:e.earliestYear,max:a(x),step:"1"},null,8,qe),[[P,l.value]])])):q((o(),v("input",{key:3,"onUpdate:modelValue":h[4]||(h[4]=u=>l.value=u),class:"w-64 py-2 px-3 text-black rounded",placeholder:"Search input",onKeyup:Z(C,["enter"])},null,40,Me)),[[P,l.value]]),t("button",{disabled:e.initializing||l.value.length<1,class:"ml-4 tw-button",onClick:C}," Search ",8,je)]),g.value?(o(),v("div",Te,[(o(!0),v($,null,B(p.value,(u,k)=>(o(),L(ve,{key:k,index:k,release:u},null,8,["index","release"]))),128))],512)):z("",!0),w.value?(o(),v("div",Ne,"No results from your search.")):z("",!0)]))}}),Pe=K(Oe,[["__scopeId","data-v-491b3606"]]);const M=e=>(E("data-v-5ad3b9c3"),e=e(),G(),e),Be={id:"statsContent",class:"w-full flex justify-center"},Le={class:"table-auto text-white w-96 border-collapse bg-[#212529]"},ze=M(()=>t("thead",{class:"border-solid p-2"},[t("tr",null,[t("th",null,"Stat"),t("th",null,"Value")])],-1)),De=M(()=>t("th",null,"Number of releases",-1)),Ve=M(()=>t("th",null,"Number of artists",-1)),Fe=M(()=>t("th",null,"Average Year",-1)),Ue=M(()=>t("th",null,"Average Score",-1)),He={key:0},Ee={key:1},Ge=N({props:{statsObject:null},setup(e){return(m,_)=>(o(),v("div",Be,[t("table",Le,[ze,t("tbody",null,[t("tr",null,[De,t("td",null,d(e.statsObject.numberOfReleases),1)]),t("tr",null,[Ve,t("td",null,d(e.statsObject.numberOfArtists),1)]),t("tr",null,[Fe,t("td",null,d(e.statsObject.averageYear),1)]),t("tr",null,[Ue,t("td",null,d(e.statsObject.averageScore),1)]),(o(!0),v($,null,B(e.statsObject.releasesPerYear,(i,b)=>(o(),v("tr",{key:b},[b>0?(o(),v("th",He," Releases in the "+d(`${1950+b*10}s`),1)):(o(),v("th",Ee,"Releases before 1960")),t("td",null,d(i),1)]))),128))])])]))}}),Ke=K(Ge,[["__scopeId","data-v-5ad3b9c3"]]),We={class:"tw-flex-col-center gap-4"},Xe=t("h1",{class:"mt-4 text-2xl font-semibold"},"My Music Page",-1),Ie=N({setup(e){const m="loading...",_=new Date().getFullYear(),i=[],b=U(),x=H();for(let r=0;r<T["2020s"]+1;r++)i.push(0);const p=f("Stats"),n=f([[""]]),g=f(!0),w=f(_),l=f({numberOfReleases:m,averageYear:m,averageScore:m,numberOfArtists:m,releasesPerYear:i}),A=[],C=[{id:"1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk",range:"Main!A2:F"},{id:"1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w",range:"Main!A2:F"},{id:"18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M",range:"Main!A2:G"},{id:"1lyFD7uLMT0mRdGkKwvbIm_2pqk2YJU7rtRQVhHq-nwU",range:"Main!A2:G"}];let Y=0,y=0,h=0,u=0,k=0;I(async()=>{const r=x.query.tab;r==="Search"?D(r):O("Stats"),await W(),g.value=!1,n.value.forEach(c=>{A.includes(c[s.artist])||A.push(c[s.artist]);const S=Number(c[s.year]);S<w.value&&(w.value=S),k+=S,h++,J(c[s.score])?(u+=Number(c[s.score]),Y++):c[s.score]=="?"&&y++,S>1959?i[T[c[s.year].slice(0,3)+"0s"]]++:i[T["1950s"]]++}),l.value={averageScore:(u/Y).toFixed(2),numberOfArtists:A.length,averageYear:(k/h).toFixed(2),numberOfReleases:Y+y,releasesPerYear:i}});async function W(){n.value=(await Promise.all(C.map(r=>X(r.id,r.range)))).flat().filter(r=>(r.forEach(c=>{c.trim()}),r.length>5))}async function X(r,c){return(await fetch(`https://api.danielturcich.com/Sheets?id=${r}&range=${c}`)).json()}function J(r){return!isNaN(Number(r))}function D(r){p.value=r}function O(r){const c={query:{tab:r}};r==="Search"&&(c.query.type="artist"),b.replace(c),D(r)}return(r,c)=>(o(),v("div",We,[Xe,t("div",null,[t("button",{class:"tw-tab-button",type:"button",onClick:c[0]||(c[0]=S=>O("Stats"))}," Stats "),t("button",{class:"tw-tab-button",type:"button",onClick:c[1]||(c[1]=S=>O("Search"))}," Search ")]),a(p)==="Stats"?(o(),L(Ke,{key:0,"stats-object":a(l)},null,8,["stats-object"])):a(p)==="Search"?(o(),L(Pe,{key:1,"current-year":a(_),"earliest-year":w.value,"releases-array":n.value,initializing:g.value},null,8,["current-year","earliest-year","releases-array","initializing"])):z("",!0)]))}});export{Ie as default};
