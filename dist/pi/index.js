import"../chunks/index-91n30nfh.js";import{vt}from"../chunks/index-mvd3qd7n.js";import{ie}from"../chunks/index-fpxp8rvc.js";import"../chunks/index-j9xd2g1q.js";import"../chunks/index-91x5y07h.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${ie.slice(ie.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){vt(e),t(e)}export{m as default};
