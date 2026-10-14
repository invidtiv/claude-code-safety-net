import"../chunks/index-eaf4p5es.js";import{gt}from"../chunks/index-gq2pjhwy.js";import{re}from"../chunks/index-5ht7pdm3.js";import"../chunks/index-me6wtv7d.js";import"../chunks/index-c3d8e2as.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${re.slice(re.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){gt(e),t(e)}export{m as default};
