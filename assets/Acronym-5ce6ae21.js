import{d as h,r as u,f as w,_ as f,c as p,a as t,w as g,v as x,g as b,t as A,h as T,o as m}from"./index-4dead21d.js";const C={class:"tw-flex-col-center gap-4"},k=t("h1",{class:"mt-4 tw-h1"},"Acronym Generator",-1),B={class:"flex gap-4"},D=["onKeyup"],M={class:"tw-flex-col-center gap-4"},P={class:"capitalize"},I=h({__name:"Acronym",setup(V){const e=u(""),a=u(!1),n=u("");let s,r="";async function _(){await navigator.clipboard.writeText(r)}function i(){e.value&&(e.value=e.value.trim(),e.value.length<2?(a.value=!1,n.value="There can not be spaces in the input."):(r=v(e.value),a.value=!0,n.value=r))}function v(o){return o.toLowerCase().split("").reduce((l,d)=>{const y=Math.floor(Math.random()*s[d].length);return`${l} ${s[d][y]}`},"")}return w(async()=>{try{const{default:o}=await f(()=>import("./acronymWords-8c5518b6.js"),[]);s=o}catch{console.error("You need to update your browser.")}}),(o,c)=>(m(),p("div",C,[k,t("div",B,[g(t("input",{"onUpdate:modelValue":c[0]||(c[0]=l=>e.value=l),class:"tw-input",placeholder:"Type a word here",onKeyup:b(i,["enter"])},null,40,D),[[x,e.value]]),t("button",{class:"tw-button w-24",onClick:i}," Generate ")]),t("div",M,[t("div",P,A(n.value),1),a.value?(m(),p("button",{key:0,class:"tw-button w-24",onClick:_}," Copy ")):T("",!0)])]))}});export{I as default};
//# sourceMappingURL=Acronym-5ce6ae21.js.map
