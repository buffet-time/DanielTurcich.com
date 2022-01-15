import{d as b,r as c,e as u,f as e,t as r,w as n,n as v,F as _,g as w,x as g,b as f,v as y}from"./vendor.4e48f4c9.js";const k={class:"flex flex-col justify-center items-center"},j=e("h1",{class:"m-4 text-2xl font-semibold"},"Password Generator",-1),C={class:"flex flex-col justify-center items-center"},L={class:"flex flex-col justify-center items-center mb-2"},E={class:"inline-block",for:"range-1"},P={class:"flex flex-col items-center justify-center"},M=["onUpdate:modelValue"],S={for:"lowercase"},T={class:"m-4 flex flex-col justify-center items-center"},U={class:"mb-4"},D=b({setup(V){const a=c(16),d=c(""),l=c(""),i={lowercase:{exclude:!1,characters:"abcdefghijklmnopqrstuvwxyz",label:"Exclude Lowercase Letters"},uppercase:{exclude:!1,characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",label:"Exclude Uppercase Letters"},numbers:{exclude:!1,characters:"0123456789",label:"Exclude Numbers"},symbols:{exclude:!1,characters:"!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",label:"Exclude Symbols"}};function x(){l.value="";let o="";for(const[t,s]of Object.entries(i))s.exclude||(o+=s.characters);for(let t=0;t<a.value;t++)l.value+=o[Math.floor(Math.random()*o.length)];d.value=l.value}function h(){navigator.clipboard.writeText(l.value)}return(o,t)=>(f(),u("div",k,[j,e("div",C,[e("div",L,[e("label",E," Password Length: "+r(a.value),1),n(e("input",{id:"range-1","onUpdate:modelValue":t[0]||(t[0]=s=>a.value=s),class:"w-64 h-6 bg-transparent",type:"range",min:"1",max:"128"},null,512),[[v,a.value]])]),e("div",P,[(f(),u(_,null,w(i,(s,m)=>e("div",{key:m,class:"pl-6"},[n(e("input",{id:"lowercase","onUpdate:modelValue":p=>s.exclude=p,class:"rounded w-4 h-4 bg-white",type:"checkbox"},null,8,M),[[y,s.exclude]]),e("label",S,r(s.label),1)])),64))]),e("button",{class:"mt-4 tw-button",onClick:x},"Generate")]),e("div",T,[e("div",U,r(d.value),1),n(e("button",{class:"tw-button",onClick:h}," Copy ",512),[[g,l.value.length>0]])])]))}});export{D as default};
