import{d as w,r as c,e as i,f as e,m as p,t as r,w as n,n as _,F as h,g,x as y,b as x,v as k}from"./vendor.994369a4.js";const C=e("h1",{class:"m-4 text-2xl font-semibold"},"Password Generator",-1),L={class:"tw-flex-col-center mb-2"},E={class:"flex flex-col items-center justify-center"},P=["onUpdate:modelValue"],T={class:"m-4"},V={class:"mb-4"},U=w({setup(M){const l=c(16),d=c(""),a=c(""),u={lowercase:{exclude:!1,characters:"abcdefghijklmnopqrstuvwxyz",label:"Exclude Lowercase Letters"},uppercase:{exclude:!1,characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",label:"Exclude Uppercase Letters"},numbers:{exclude:!1,characters:"0123456789",label:"Exclude Numbers"},symbols:{exclude:!1,characters:"!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",label:"Exclude Symbols"}};function m(){a.value="";let o="";for(const[t,s]of Object.entries(u))s.exclude||(o+=s.characters);for(let t=0;t<l.value;t++)a.value+=o[Math.floor(Math.random()*o.length)];d.value=a.value}function v(){navigator.clipboard.writeText(a.value)}return(o,t)=>(x(),i(h,null,[C,e("div",null,[e("div",L,[p(" Password Length: "+r(l.value)+" ",1),n(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>l.value=s),class:"w-64 h-6 bg-transparent",type:"range",min:"1",max:"128"},null,512),[[_,l.value]])]),e("div",E,[(x(),i(h,null,g(u,(s,b)=>e("div",{key:b,class:"pl-6"},[n(e("input",{"onUpdate:modelValue":f=>s.exclude=f,class:"rounded w-4 h-4 bg-white",type:"checkbox"},null,8,P),[[k,s.exclude]]),p(" "+r(s.label),1)])),64))]),e("button",{class:"mt-4 tw-button",onClick:m},"Generate")]),e("div",T,[e("div",V,r(d.value),1),n(e("button",{class:"tw-button",onClick:v}," Copy ",512),[[y,a.value.length>0]])])],64))}});export{U as default};
