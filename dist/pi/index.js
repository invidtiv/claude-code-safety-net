import"../chunks/index-z14g58a6.js";import{ht}from"../chunks/index-gj5qkg3c.js";import{oe}from"../chunks/index-wkjncmhg.js";import"../chunks/index-rwp0taf5.js";import"../chunks/index-pgmgvnyg.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${oe.slice(oe.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){ht(e),t(e)}export{m as default};
