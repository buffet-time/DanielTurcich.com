import{d as r,r as i,e as v,f as e,w as c,n as p,q as h,v as f,t as _,x,b}from"./vendor.994369a4.js";const m={class:"flex flex-col gap-4 mt-4"},g=e("h1",{class:"tw-h1"},"Discord Max Message Generator",-1),w={class:"flex flex-col justify-center items-center"},k={class:"flex items-center gap-2"},y=["onKeyup"],C={class:"flex gap-1"},B=e("label",{class:"inline-block",for:"flexCheckDefault"}," Nitro? ",-1),D=["disabled"],M={class:"m-4"},V=r({setup(T){const o=i(""),n=i(!1),s=i("");function d(){const l=n.value?4e3:2e3,t=o.value.trim()+" ";if(s.value="",o.value.length<l)for(;t.length<l&&!(s.value.length+t.length>l);)s.value=s.value+t}function u(){navigator.clipboard.writeText(s.value)}return(l,t)=>(b(),v("div",m,[g,e("div",w,[e("div",k,[c(e("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>o.value=a),class:"tw-input w-64",placeholder:"Type a word here",onKeyup:h(d,["enter"])},null,40,y),[[p,o.value]]),e("div",C,[c(e("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>n.value=a),class:"tw-checkbox",type:"checkbox"},null,512),[[f,n.value]]),B])]),e("button",{class:"mt-3 tw-button",disabled:o.value.length<1,onClick:d}," Generate ",8,D)]),e("div",null,[e("div",M,_(s.value),1),c(e("button",{class:"tw-button",onClick:u}," Copy ",512),[[x,s.value.length>0]])])]))}});export{V as default};
