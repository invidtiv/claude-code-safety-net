import"../chunks/index-j1nzn1zm.js";import{vt}from"../chunks/index-nc2s1erg.js";import{ie}from"../chunks/index-fpxp8rvc.js";import"../chunks/index-nyk0tjdb.js";import"../chunks/index-yjy0570p.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${ie.slice(ie.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){vt(e),t(e)}export{m as default};
