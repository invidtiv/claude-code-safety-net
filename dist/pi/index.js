import"../chunks/index-1p1q38x4.js";import{vt}from"../chunks/index-8c31a7e4.js";import{ie}from"../chunks/index-fpxp8rvc.js";import"../chunks/index-tz7650sh.js";import"../chunks/index-8m4sxbp8.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${ie.slice(ie.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){vt(e),t(e)}export{m as default};
