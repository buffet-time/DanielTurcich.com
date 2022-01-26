import{d as j,r as p,o as P,b as i,e as u,f as t,t as d,u as n,m as B,F as x,y as W,w as A,z as V,n as E,g as L,q as X,A as J,s as z,p as D,h as q,B as Q,i as F}from"./vendor.994369a4.js";import{d as Z,c as I}from"./dialog-polyfill.esm.c4f433fc.js";import{_ as U}from"./index.173630ef.js";var s;(function(e){e[e.artist=0]="artist",e[e.name=1]="name",e[e.score=2]="score",e[e.type=3]="type",e[e.year=4]="year",e[e.genre=5]="genre",e[e.comments=6]="comments"})(s||(s={}));var C;(function(e){e[e["1950s"]=0]="1950s",e[e["1960s"]=1]="1960s",e[e["1970s"]=2]="1970s",e[e["1980s"]=3]="1980s",e[e["1990s"]=4]="1990s",e[e["2000s"]=5]="2000s",e[e["2010s"]=6]="2010s",e[e["2020s"]=7]="2020s"})(C||(C={}));const R={class:"tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"},ee={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},te={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},se={id:"releaseModal",class:"text-neutral-300 bg-[#383838] w-96"},ae={class:"flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"},le={class:"whitespace-nowrap"},oe=["d"],re={class:"flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"},ne={class:"mb-4"},ie=B("No comments for this release."),ce={class:"flex justify-between p-4 items-center"},ue=j({props:{index:null,release:null},setup(e){const h=e;let y;const l=p();P(()=>{Z.registerDialog(l.value),y=document.querySelector("#releaseModal")});function f(){navigator.clipboard.writeText(` ${h.release[s.artist]} - ${h.release[s.name]}: ${h.release[s.score]}`)}function _(){l.value.showModal(),setTimeout(()=>{document.addEventListener("click",a)},0)}function b(){document.removeEventListener("click",a),l.value.close()}function a(g){g.composedPath().includes(y)||b()}return(g,S)=>(i(),u(x,null,[t("div",{class:"tw-card bg-neutral-500 text-center m-2 cursor-pointer w-80 h-24 rounded",onClick:_},[t("div",R,[t("h5",ee,d(e.release[n(s).artist]),1),t("h6",te,d(e.release[n(s).name])+" ("+d(e.release[n(s).score])+"/10) ",1)])]),t("dialog",{ref_key:"releaseModal",ref:l,class:"bg-transparent"},[t("div",se,[t("div",ae,[t("h5",null,[B(d(e.release[n(s).artist])+" - "+d(e.release[n(s).name])+" ",1),t("span",le," ( "+d(e.release[n(s).score])+"/10 ) ",1)]),(i(),u("svg",{class:"w-6 min-w-[24px] cursor-pointer",viewBox:"0 0 24 24",onClick:b},[t("path",{fill:"currentColor",d:n(I)},null,8,oe)]))]),t("div",re,[t("div",ne,"Genres: "+d(e.release[n(s).genre]),1),e.release.length===7?(i(),u(x,{key:0},[B(d(e.release[n(s).comments]),1)],64)):(i(),u(x,{key:1},[ie],64))]),t("div",ce,[B(" ("+d(e.release[n(s).year])+" "+d(e.release[n(s).type])+") ",1),t("div",null,[t("button",{class:"tw-button mr-2",onClick:f},"Copy"),t("button",{type:"button",class:"tw-button",onClick:b}," Close ")])])])],512)],64))}});const de=e=>(D("data-v-1ce8f9e6"),e=e(),q(),e),ve={id:"searchContent",class:"tabcontent hidden"},me=de(()=>t("h3",{class:"mb-2"},"Search by:",-1)),he=["value"],fe=["value"],be=["value"],pe=["value"],ye=["value"],_e=["value"],ge={class:"m-4 flex"},we={key:0,class:"flex flex-col"},ke={class:"mb-1"},xe={key:1},Se=["value"],$e={key:2,class:"flex flex-col"},Ae={for:"customRange1",class:"form-label"},Ce=["placeholder","min","max"],Ne=["onKeyup"],Ye=["disabled"],Me={key:0,ref:"releases",class:"m-2 mt-4 mb-2 flex flex-wrap justify-center"},je={key:1},Be=j({props:{currentYear:null,earliestYear:null,releasesArray:null,initializing:{type:Boolean}},setup(e){const h=e,y=p([[""]]),l=p(s.artist),f=p(!1),_=p(h.currentYear),b=p(!1),a=p(""),g=["Album","EP","Live Album","Soundtrack","Remix Album","Compilation","Demo Album"];W(l,()=>{switch(l.value){case s.score:a.value="7";break;case s.type:a.value="Album";break;case s.year:a.value=String(_.value);break;default:a.value=""}}),P(()=>window.addEventListener("keydown",c=>{if(c.key==="ArrowLeft"||c.key==="ArrowRight")switch(l.value){case s.score:S(c.key,.5,0,10);break;case s.year:S(c.key,1,h.earliestYear,_.value);break}}));function S(c,v,r,w){c==="ArrowLeft"&&Number(a.value)>r?a.value=String(a.value+-v):c==="ArrowRight"&&Number(a.value)<w&&(a.value=String(a.value+v))}function k(){f.value=!1,b.value=!1,a.value=a.value.trim();let c=!1;switch(l.value){case s.score:c=!0;break;case s.type:c=!0;break;case s.year:c=!0;break}y.value=Y(l.value,c),y.value.length>0?f.value=!0:b.value=!0}function Y(c,v){return h.releasesArray.filter(r=>v?r[c].toLowerCase()===a.value.toLowerCase():r[c].toLowerCase().includes(a.value.toLowerCase()))}return(c,v)=>(i(),u("div",ve,[me,A(t("select",{"onUpdate:modelValue":v[0]||(v[0]=r=>l.value=r),class:"text-black pl-4 py-2 rounded w-72"},[t("option",{selected:"",value:n(s).artist},"Artist",8,he),t("option",{value:n(s).name},"Release Name",8,fe),t("option",{value:n(s).score},"Score",8,be),t("option",{value:n(s).type},"Type",8,pe),t("option",{value:n(s).year},"Year",8,ye),t("option",{value:n(s).genre},"Genre",8,_e)],512),[[V,l.value]]),t("div",ge,[l.value===n(s).score?(i(),u("div",we,[t("div",ke,d(a.value),1),A(t("input",{"onUpdate:modelValue":v[1]||(v[1]=r=>a.value=r),placeholder:"10",type:"range",class:"w-64 bg-transparent h-2",min:"0",max:"10",step:"0.5"},null,512),[[E,a.value]])])):l.value===n(s).type?(i(),u("div",xe,[A(t("select",{"onUpdate:modelValue":v[2]||(v[2]=r=>a.value=r),class:"form-select mb-3"},[(i(),u(x,null,L(g,(r,w)=>t("option",{key:w,value:r},d(r),9,Se)),64))],512),[[V,a.value]])])):l.value===n(s).year?(i(),u("div",$e,[t("label",Ae,d(a.value),1),A(t("input",{"onUpdate:modelValue":v[3]||(v[3]=r=>a.value=r),placeholder:String(_.value),type:"range",class:"w-64 bg-transparent h-2",min:e.earliestYear,max:_.value,step:"1"},null,8,Ce),[[E,a.value]])])):A((i(),u("input",{key:3,"onUpdate:modelValue":v[4]||(v[4]=r=>a.value=r),class:"w-64 py-2 px-3 text-black rounded",placeholder:"Search input",onKeyup:X(k,["enter"])},null,40,Ne)),[[E,a.value]]),t("button",{disabled:e.initializing||a.value.length<1,class:"ml-4 tw-button",onClick:k}," Search ",8,Ye)]),f.value?(i(),u("div",Me,[(i(!0),u(x,null,L(y.value,(r,w)=>(i(),J(ue,{key:w,index:w,release:r},null,8,["index","release"]))),128))],512)):z("",!0),b.value?(i(),u("div",je,"No results from your search.")):z("",!0)]))}}),Ee=U(Be,[["__scopeId","data-v-1ce8f9e6"]]);const N=e=>(D("data-v-2ad3a08c"),e=e(),q(),e),Le={id:"statsContent",class:"tabcontent w-96"},Oe={class:"table-auto text-white w-full border-collapse bg-[#212529]"},Te=N(()=>t("thead",{class:"border-solid p-2"},[t("tr",null,[t("th",null,"Stat"),t("th",null,"Value")])],-1)),Pe=N(()=>t("th",null,"Number of releases",-1)),Ve=N(()=>t("th",null,"Number of artists",-1)),ze=N(()=>t("th",null,"Average Year",-1)),De=N(()=>t("th",null,"Average Score",-1)),qe={key:0},Fe={key:1},Ue=j({props:{statsObject:null},setup(e){return(h,y)=>(i(),u("div",Le,[t("table",Oe,[Te,t("tbody",null,[t("tr",null,[Pe,t("td",null,d(e.statsObject.numberOfReleases),1)]),t("tr",null,[Ve,t("td",null,d(e.statsObject.numberOfArtists),1)]),t("tr",null,[ze,t("td",null,d(e.statsObject.averageYear),1)]),t("tr",null,[De,t("td",null,d(e.statsObject.averageScore),1)]),(i(!0),u(x,null,L(e.statsObject.releasesPerYear,(l,f)=>(i(),u("tr",{key:f},[f>0?(i(),u("th",qe," Releases in the "+d(`${1950+f*10}s`),1)):(i(),u("th",Fe,"Releases before 1960")),t("td",null,d(l),1)]))),128))])])]))}}),He=U(Ue,[["__scopeId","data-v-2ad3a08c"]]),Ge={class:"tw-flex-col-center gap-4"},Ke=t("h1",{class:"mt-4 text-2xl font-semibold"},"My Music Page",-1),Qe=j({setup(e){const h="loading...",y=2021,l=[];for(let o=0;o<C["2020s"]+1;o++)l.push(0);const f=p([[""]]),_=p(!0),b=p(y),a=p({numberOfReleases:h,averageYear:h,averageScore:h,numberOfArtists:h,releasesPerYear:l}),g=[],S=[{id:"1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk",range:"Main!A2:F"},{id:"1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w",range:"Main!A2:F"},{id:"18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M",range:"Main!A2:G"},{id:"1lyFD7uLMT0mRdGkKwvbIm_2pqk2YJU7rtRQVhHq-nwU",range:"Main!A2:G"}];let k=0,Y=0,c=0,v=0,r=0;Q(async()=>{await w(),_.value=!1,f.value.forEach(o=>{g.includes(o[s.artist])||g.push(o[s.artist]);const m=Number(o[s.year]);m<b.value&&(b.value=m),r+=m,c++,G(o[s.score])?(v+=Number(o[s.score]),k++):o[s.score]=="?"&&Y++,m>1959?l[C[o[s.year].slice(0,3)+"0s"]]++:l[C["1950s"]]++}),a.value={averageScore:(v/k).toFixed(2),numberOfArtists:g.length,averageYear:(r/c).toFixed(2),numberOfReleases:k+Y,releasesPerYear:l}});async function w(){f.value=(await Promise.all(S.map(o=>H(o.id,o.range)))).flat().filter(o=>(o.forEach(m=>{m.trim()}),o.length>5))}async function H(o,m){return(await fetch(`https://api.danielturcich.com/Sheets?id=${o}&range=${m}`)).json()}function G(o){return!isNaN(Number(o))}function O(o,m){const $=Array.from(document.getElementsByClassName("tabcontent")),K=Array.from(document.getElementsByClassName("tablinks"));$.forEach(M=>{M.style.display="none"}),K.forEach(M=>{M.className=M.className.replace(" active","")});const T=document.getElementById(m);if(!T){console.log("Error in switchtab");return}T.style.display="block",o.currentTarget.tabName+=" active"}return(o,m)=>(i(),u("div",Ge,[Ke,t("div",null,[t("button",{class:"tablinks active tw-tab-button",type:"button",onClick:m[0]||(m[0]=$=>O($,"statsContent"))}," Stats "),t("button",{class:"tablinks tw-tab-button",type:"button",onClick:m[1]||(m[1]=$=>O($,"searchContent"))}," Search ")]),F(He,{"stats-object":n(a)},null,8,["stats-object"]),F(Ee,{"current-year":y,"earliest-year":b.value,"releases-array":f.value,initializing:_.value},null,8,["earliest-year","releases-array","initializing"])]))}});export{Qe as default};
