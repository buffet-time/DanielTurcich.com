import{d as V,r as f,j as q,A as O,o as i,c,a as e,u as N,e as h,t as k,w as F,v as C,g as E,m as z,F as $,B as I,k as P,b as R,q as L}from"./index-48d4f266.js";import{c as D,D as H,C as J,a as K}from"./shared-24148398.js";const Q={class:"tw-card bg-[#424242] p-4 w-4/5"},W=["d"],X={class:"flex flex-col"},Y={class:"m-0 p-4"},Z={key:0},ee={key:1},te={class:"h-6"},ne=e("option",{value:"sawtooth"},"Sawtooth",-1),oe=e("option",{selected:"",value:"sine"},"Sine",-1),se=e("option",{value:"square"},"Square",-1),le=e("option",{value:"triangle"},"Triangle",-1),ae=[ne,oe,se,le],re={class:"flex justify-center"},ie=V({__name:"SoundGenerator",props:{generator:null},emits:["deleteGenerator"],setup(T){const v=T,n=f(.07),l=f(440),d=f("sine"),o=f("A"),u=f(4),s=f(0),g=f(!1);let r,t,_,x=!1,w=0,m=9;const S=2**(1/12),A=440,G=["C","D♭","D","E♭","E","F","G♭","G","A♭","A","B♭","B"];v.generator.generatorType==="Frequency"&&q(l,()=>{x||b(),t.frequency.setValueAtTime(l.value,r.currentTime)}),q(s,(y,a)=>{x||b(),w=y-a,j(),w>0?B("Up"):(w=Math.abs(w),B("Down"))}),q(n,()=>{x||b(),g.value?(t.disconnect(),_.gain.setValueAtTime(n.value,r.currentTime),t.connect(_).connect(r.destination)):_.gain.setValueAtTime(n.value,r.currentTime)}),q(d,()=>{x||b(),g.value?(t.disconnect(),t.type=d.value,t.connect(_).connect(r.destination)):t.type=d.value}),O(()=>{t==null||t.disconnect()});function M(){g.value=!g.value,x||b(),g.value?t.connect(_).connect(r.destination):t.disconnect()}function U(y){return parseFloat((y*2*100).toFixed(1))}function b(){r=new AudioContext,_=new GainNode(r,{gain:n.value}),t=new OscillatorNode(r,{type:d.value,frequency:l.value}),t.start(),t.connect(r.destination),t.disconnect(),x=!0}function B(y){do y==="Up"?m===11?(u.value++,m=0):m++:m===0?(u.value--,m=11):m--,o.value=G[m],w--;while(w>0)}function j(){l.value=parseFloat((A*S**s.value).toFixed(4)),t.frequency.setValueAtTime(l.value,r.currentTime)}return(y,a)=>(i(),c("div",Q,[(i(),c("svg",{class:"h-6 float-right cursor-pointer",viewBox:"0 0 24 24",onClick:a[0]||(a[0]=p=>y.$emit("deleteGenerator"))},[e("path",{fill:"currentColor",d:N(D)},null,8,W)])),e("div",X,[e("div",Y,[T.generator.generatorType==="Frequency"?(i(),c("div",Z,[h(" Frequency: "+k(l.value)+" ",1),F(e("input",{id:"range-1","onUpdate:modelValue":a[1]||(a[1]=p=>l.value=p),class:"w-full h-6 bg-transparent",type:"range",min:"10",max:"22000",step:"10"},null,512),[[C,l.value]])])):T.generator.generatorType==="Note"?(i(),c("div",ee,[e("div",te,[h(" Note/ Frequency: "+k(o.value)+" ",1),e("sub",null,k(u.value),1),h(" / "+k(l.value),1)]),F(e("input",{id:"range-1","onUpdate:modelValue":a[2]||(a[2]=p=>s.value=p),class:"w-full h-6 bg-transparent",type:"range",min:"-57",max:"68",step:"1"},null,512),[[C,s.value]])])):E("",!0),e("div",null,[h(" Volume: "+k(U(n.value))+"% ",1),F(e("input",{"onUpdate:modelValue":a[3]||(a[3]=p=>n.value=p),class:"w-full h-6 bg-transparent",type:"range",min:"0",max:"1",step:"0.0005"},null,512),[[C,n.value]])]),F(e("select",{"onUpdate:modelValue":a[4]||(a[4]=p=>d.value=p),class:"pt-2 pr-9 pb-2 pl-3 text-black border border-solid border-[#ced4da] rounded my-0 mx-auto flex justify-center"},ae,512),[[z,d.value]])]),e("div",re,[e("button",{class:"tw-button",onClick:M},[g.value?(i(),c($,{key:0},[h("Stop")],64)):(i(),c($,{key:1},[h("Start")],64))])])])]))}}),ue={class:"tw-flex-col-center"},ce=e("h1",{class:"m-4 mb-0 text-2xl font-semibold"},"Frequency Generator",-1),de={class:"flex justify-center"},ve=["d"],pe={id:"generatorModal",class:"text-neutral-300 bg-[#383838] w-72"},fe={class:"flex justify-between p-4 border-b border-solid border-[#dee2e6]"},ge=e("h5",null,"Add a new generator",-1),me=["d"],ye={class:"p-4 flex gap-2 justify-center"},we=V({__name:"Frequency",setup(T){const v=I([{id:0,generatorType:"Frequency"},{id:1,generatorType:"Note"}]),n=f();P(async()=>{if(!n.value){console.error("Release Modal does not exist: ",n.value);return}await H([n.value]),J(n.value)});function l(d){var o;v.push({id:v.length>0?v[v.length-1].id+1:0,generatorType:d}),(o=n.value)==null||o.close()}return(d,o)=>(i(),c($,null,[e("div",ue,[ce,(i(!0),c($,null,R(v,(u,s)=>(i(),L(ie,{key:u.id,index:s,generator:u,onDeleteGenerator:g=>v.splice(s,1)},null,8,["index","generator","onDeleteGenerator"]))),128)),e("div",de,[(i(),c("svg",{class:"w-[50px] cursor-pointer tw-button fill-white bg-neutral-500 mt-4 rounded-xl p-[2px]",viewBox:"0 0 20 20",onClick:o[0]||(o[0]=u=>{var s;return(s=n.value)==null?void 0:s.showModal()})},[e("path",{d:N(K)},null,8,ve)]))])]),e("dialog",{ref_key:"generatorModal",ref:n,class:"bg-transparent"},[e("div",pe,[e("div",fe,[ge,(i(),c("svg",{class:"h-6 cursor-pointer",viewBox:"0 0 24 24",onClick:o[1]||(o[1]=u=>{var s;return(s=n.value)==null?void 0:s.close()})},[e("path",{fill:"currentColor",d:N(D)},null,8,me)]))]),e("div",ye,[e("button",{class:"tw-button",onClick:o[2]||(o[2]=u=>l("Frequency"))}," Frequency "),e("button",{class:"tw-button",onClick:o[3]||(o[3]=u=>l("Note"))},"Note")])])],512)],64))}});export{we as default};
