import{d as h,r as u,f as w,_ as f,c as p,a as t,w as g,v as x,g as A,t as b,h as T,o as m}from"./index-l9dh7dr-.js";const C={class:"tw-flex-col-center gap-4"},k=t("h1",{class:"mt-4 tw-h1"},"Acronym Generator",-1),B={class:"flex gap-4"},D={class:"tw-flex-col-center gap-4"},I={class:"capitalize"},P=h({__name:"Acronym",setup(M){const a=u(""),n=u(!1),s=u("");let c,l="";async function y(){await navigator.clipboard.writeText(l)}function i(){if(!a.value)return;const e=a.value.trim().replace(/ /g,""),o=/^[a-zA-Z]+$/.test(e);switch(!0){case e.length<1:n.value=!1,s.value="There can not be spaces in the input.";return;case!o:n.value=!1,s.value="You can only input letters A-Z.";default:l=_(e),n.value=!0,s.value=l}}function _(e){return e.toLowerCase().split("").reduce((o,d)=>{const v=Math.floor(Math.random()*c[d].length);return`${o} ${c[d][v]}`},"")}return w(async()=>{try{const{default:e}=await f(()=>import("./acronymWords-EBNY6PqB.js"),__vite__mapDeps([]));c=e}catch{console.error("You need to update your browser.")}}),(e,r)=>(m(),p("div",C,[k,t("div",B,[g(t("input",{"onUpdate:modelValue":r[0]||(r[0]=o=>a.value=o),class:"tw-input",placeholder:"Type a word here",onKeyup:A(i,["enter"])},null,544),[[x,a.value]]),t("button",{class:"tw-button w-24",onClick:i}," Generate ")]),t("div",D,[t("div",I,b(s.value),1),n.value?(m(),p("button",{key:0,class:"tw-button w-24",onClick:y}," Copy ")):T("",!0)])]))}});export{P as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
//# sourceMappingURL=Acronym-jx8GnfdM.js.map