import"../chunks/index-rdxjms22.js";import{ht}from"../chunks/index-e25d8rb4.js";import{oe}from"../chunks/index-wkjncmhg.js";import"../chunks/index-q29jqk43.js";import"../chunks/index-x95aj0ja.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${oe.slice(oe.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){ht(e),t(e)}export{m as default};
