import"../chunks/index-asrmc5g1.js";import{ht}from"../chunks/index-xmtc9qnk.js";import{oe}from"../chunks/index-wkjncmhg.js";import"../chunks/index-4axm0q86.js";import"../chunks/index-5zfrsmpa.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${oe.slice(oe.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){ht(e),t(e)}export{m as default};
