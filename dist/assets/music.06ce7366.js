import{d as j,r as p,o as V,b as c,e as i,f as t,t as u,u as n,m as M,F as $,y as K,w as N,z,n as L,g as O,q as W,A as X,s as D,p as q,h as E,B as J,j as F}from"./vendor.4e48f4c9.js";import{d as Q,c as Z}from"./dialog-polyfill.esm.c4f433fc.js";import{_ as U}from"./index.af8cfc71.js";var s;(function(e){e[e.artist=0]="artist",e[e.name=1]="name",e[e.score=2]="score",e[e.type=3]="type",e[e.year=4]="year",e[e.genre=5]="genre",e[e.comments=6]="comments"})(s||(s={}));const I={class:"tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"},R={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},ee={class:"overflow-hidden text-ellipsis max-w-full whitespace-nowrap"},te={id:"releaseModal",class:"text-gray-300 bg-[#383838] w-96"},se={class:"flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"},ae={class:"whitespace-nowrap"},le=["d"],oe={class:"flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"},re={class:"mb-4"},ne=M("No comments for this release."),ce={class:"flex justify-between p-4 items-center"},ie=j({props:{index:null,release:null},setup(e){const f=e;let y;const l=p();V(()=>{Q.registerDialog(l.value),y=document.querySelector("#releaseModal")});function h(){navigator.clipboard.writeText(` ${f.release[s.artist]} - ${f.release[s.name]}: ${f.release[s.score]}`)}function _(){l.value.showModal(),setTimeout(()=>{document.addEventListener("click",a)},0)}function b(){document.removeEventListener("click",a),l.value.close()}function a(g){g.composedPath().includes(y)||b()}return(g,S)=>(c(),i($,null,[t("div",{class:"tw-card bg-zinc-500 text-center m-2 cursor-pointer w-80 h-24 rounded",onClick:_},[t("div",I,[t("h5",R,u(e.release[n(s).artist]),1),t("h6",ee,u(e.release[n(s).name])+" ("+u(e.release[n(s).score])+"/10) ",1)])]),t("dialog",{ref_key:"releaseModal",ref:l,class:"bg-transparent"},[t("div",te,[t("div",se,[t("h5",null,[M(u(e.release[n(s).artist])+" - "+u(e.release[n(s).name])+" ",1),t("span",ae," ( "+u(e.release[n(s).score])+"/10 ) ",1)]),(c(),i("svg",{class:"w-6 min-w-[24px] cursor-pointer",viewBox:"0 0 24 24",onClick:b},[t("path",{fill:"currentColor",d:n(Z)},null,8,le)]))]),t("div",oe,[t("div",re,"Genres: "+u(e.release[n(s).genre]),1),e.release.length===7?(c(),i($,{key:0},[M(u(e.release[n(s).comments]),1)],64)):(c(),i($,{key:1},[ne],64))]),t("div",ce,[M(" ("+u(e.release[n(s).year])+" "+u(e.release[n(s).type])+") ",1),t("div",null,[t("button",{class:"tw-button mr-2",onClick:h},"Copy"),t("button",{type:"button",class:"tw-button",onClick:b}," Close ")])])])],512)],64))}});const ue=e=>(q("data-v-4e0d1ccf"),e=e(),E(),e),de={class:"flex flex-col justify-center items-center"},ve=ue(()=>t("h3",{class:"mb-2"},"Search by:",-1)),me=["value"],fe=["value"],he=["value"],be=["value"],pe=["value"],ye=["value"],_e={class:"m-4 flex"},ge={key:0,class:"flex flex-col"},we={for:"customRange1",class:"mb-1"},xe={key:1},ke=["value"],$e={key:2,class:"flex flex-col"},Se={for:"customRange1",class:"form-label"},Ce=["placeholder","min","max"],Ae=["onKeyup"],Ne=["disabled"],Ye={key:0,class:"m-2 mt-4 mb-2"},je={ref:"releases",class:"flex flex-wrap justify-center"},Me={key:1},Be=j({props:{currentYear:null,earliestYear:null,releasesArray:null,initializing:{type:Boolean}},setup(e){const f=e,y=p([[""]]),l=p(s.artist),h=p(!1),_=p(f.currentYear),b=p(!1),a=p(""),g=["Album","EP","Live Album","Soundtrack","Remix Album","Compilation","Demo Album"];K(l,()=>{switch(l.value){case s.score:a.value="7";break;case s.type:a.value="Album";break;case s.year:a.value=String(_.value);break;default:a.value=""}}),V(()=>window.addEventListener("keydown",v=>{l.value===s.score?A(v.key,.5,0,10):l.value===s.year&&A(v.key,1,f.earliestYear,_.value)}));function S(){console.log(1),h.value=!1,b.value=!1,a.value=a.value.trim();let v=!1;switch(l.value){case s.score:v=!0;break;case s.type:v=!0;break;case s.year:v=!0;break}y.value=C(l.value,v),y.value.length>0?h.value=!0:b.value=!0}function C(v,d){return f.releasesArray.filter(r=>d?r[v].toLowerCase()===a.value.toLowerCase():r[v].toLowerCase().includes(a.value.toLowerCase()))}function A(v,d,r,w){v==="ArrowLeft"&&Number(a.value)>r?a.value=String(a.value+-d):v==="ArrowRight"&&Number(a.value)<w&&(a.value=String(a.value+d))}return(v,d)=>(c(),i("div",de,[ve,N(t("select",{"onUpdate:modelValue":d[0]||(d[0]=r=>l.value=r),class:"text-black pl-4 py-2 rounded w-72"},[t("option",{selected:"",value:n(s).artist},"Artist",8,me),t("option",{value:n(s).name},"Release Name",8,fe),t("option",{value:n(s).score},"Score",8,he),t("option",{value:n(s).type},"Type",8,be),t("option",{value:n(s).year},"Year",8,pe),t("option",{value:n(s).genre},"Genre",8,ye)],512),[[z,l.value]]),t("div",_e,[l.value===n(s).score?(c(),i("div",ge,[t("label",we,u(a.value),1),N(t("input",{"onUpdate:modelValue":d[1]||(d[1]=r=>a.value=r),placeholder:"10",type:"range",class:"w-64 bg-transparent h-2",min:"0",max:"10",step:"0.5"},null,512),[[L,a.value]])])):l.value===n(s).type?(c(),i("div",xe,[N(t("select",{"onUpdate:modelValue":d[2]||(d[2]=r=>a.value=r),class:"form-select mb-3"},[(c(),i($,null,O(g,(r,w)=>t("option",{key:w,value:r},u(r),9,ke)),64))],512),[[z,a.value]])])):l.value===n(s).year?(c(),i("div",$e,[t("label",Se,u(a.value),1),N(t("input",{"onUpdate:modelValue":d[3]||(d[3]=r=>a.value=r),placeholder:String(_.value),type:"range",class:"w-64 bg-transparent h-2",min:e.earliestYear,max:_.value,step:"1"},null,8,Ce),[[L,a.value]])])):N((c(),i("input",{key:3,"onUpdate:modelValue":d[4]||(d[4]=r=>a.value=r),class:"w-64 py-2 px-3 text-black rounded",placeholder:"Search input",onKeyup:W(S,["enter"])},null,40,Ae)),[[L,a.value]]),t("button",{disabled:e.initializing||a.value.length<1,class:"ml-4 tw-button",onClick:S}," Search ",8,Ne)]),h.value?(c(),i("div",Ye,[t("div",je,[(c(!0),i($,null,O(y.value,(r,w)=>(c(),X(ie,{key:w,index:w,release:r},null,8,["index","release"]))),128))],512)])):D("",!0),b.value?(c(),i("div",Me,"No results from your search.")):D("",!0)]))}}),Le=U(Be,[["__scopeId","data-v-4e0d1ccf"]]);const Y=e=>(q("data-v-b1b1501e"),e=e(),E(),e),Oe={class:"w-96"},Te={class:"table-auto text-white w-full border-collapse bg-[#212529]"},Pe=Y(()=>t("thead",{class:"border-solid p-2"},[t("tr",null,[t("th",null,"Stat"),t("th",null,"Value")])],-1)),Ve=Y(()=>t("th",null,"Number of releases",-1)),ze=Y(()=>t("th",null,"Number of artists",-1)),De=Y(()=>t("th",null,"Average Year",-1)),qe=Y(()=>t("th",null,"Average Score",-1)),Ee={key:0},Fe={key:1},Ue=j({props:{statsObject:null},setup(e){return(f,y)=>(c(),i("div",Oe,[t("table",Te,[Pe,t("tbody",null,[t("tr",null,[Ve,t("td",null,u(e.statsObject.numberOfReleases),1)]),t("tr",null,[ze,t("td",null,u(e.statsObject.numberOfArtists),1)]),t("tr",null,[De,t("td",null,u(e.statsObject.averageYear),1)]),t("tr",null,[qe,t("td",null,u(e.statsObject.averageScore),1)]),(c(!0),i($,null,O(e.statsObject.releasesPerYear,(l,h)=>(c(),i("tr",{key:h},[h>0?(c(),i("th",Ee," Releases in the "+u(`${1950+h*10}s`),1)):(c(),i("th",Fe,"Releases before 1960")),t("td",null,u(l),1)]))),128))])])]))}}),He=U(Ue,[["__scopeId","data-v-b1b1501e"]]),Ge={class:"flex flex-col justify-center items-center gap-4"},Ke=t("h1",{class:"mt-4 text-2xl font-semibold"},"My Music Page",-1),We={class:"flex justify-center"},Xe={id:"statsContent",class:"tabcontent"},Je={id:"searchContent",class:"tabcontent hidden"};var T;(function(e){e[e["1950s"]=0]="1950s",e[e["1960s"]=1]="1960s",e[e["1970s"]=2]="1970s",e[e["1980s"]=3]="1980s",e[e["1990s"]=4]="1990s",e[e["2000s"]=5]="2000s",e[e["2010s"]=6]="2010s",e[e["2020s"]=7]="2020s"})(T||(T={}));const Re=j({setup(e){const f="loading...",y=2021,l=[];for(let o=0;o<7+1;o++)l.push(0);const h=p([[""]]),_=p(!0),b=p(y),a=p({numberOfReleases:f,averageYear:f,averageScore:f,numberOfArtists:f,releasesPerYear:l}),g=[],S=[{id:"1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk",range:"Main!A2:F"},{id:"1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w",range:"Main!A2:F"},{id:"18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M",range:"Main!A2:G"},{id:"1lyFD7uLMT0mRdGkKwvbIm_2pqk2YJU7rtRQVhHq-nwU",range:"Main!A2:G"}];let C=0,A=0,v=0,d=0,r=0;J(async()=>{await w(),_.value=!1;for(const o of h.value){g.includes(o[s.artist])||g.push(o[s.artist]);const m=Number(o[s.year]);m<b.value&&(b.value=m),r+=m,v++,G(o[s.score])?(d+=Number(o[s.score]),C++):o[s.score]=="?"&&A++,m>1959?l[T[o[s.year].slice(0,3)+"0s"]]++:l[0]++}a.value={averageScore:(d/C).toFixed(2),numberOfArtists:g.length,averageYear:(r/v).toFixed(2),numberOfReleases:C+A,releasesPerYear:l}});async function w(){h.value=(await Promise.all(S.map(o=>H(o.id,o.range)))).flat().filter(o=>{for(const m of o)m.trim();return o.length>5})}async function H(o,m){return(await fetch(`https://api.danielturcich.com/Sheets?id=${o}&range=${m}`)).json()}function G(o){return!isNaN(Number(o))}function P(o,m){const k=document.getElementsByClassName("tabcontent"),B=document.getElementsByClassName("tablinks");for(let x=0;x<k.length;x++)k[x].style.display="none";for(let x=0;x<B.length;x++)B[x].className=B[x].className.replace(" active","");document.getElementById(m).style.display="block",o.currentTarget.tabName+=" active"}return(o,m)=>(c(),i("div",Ge,[Ke,t("div",We,[t("button",{class:"tablinks active tw-tab-button",type:"button",onClick:m[0]||(m[0]=k=>P(k,"statsContent"))}," Stats "),t("button",{class:"tablinks tw-tab-button",type:"button",onClick:m[1]||(m[1]=k=>P(k,"searchContent"))}," Search ")]),t("div",Xe,[F(He,{"stats-object":n(a)},null,8,["stats-object"])]),t("div",Je,[F(Le,{"current-year":y,"earliest-year":b.value,"releases-array":h.value,initializing:_.value},null,8,["earliest-year","releases-array","initializing"])])]))}});export{Re as default};