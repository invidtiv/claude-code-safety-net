import"../chunks/index-x5mt300g.js";import{vt}from"../chunks/index-jf1zs2j0.js";import{oe}from"../chunks/index-wkjncmhg.js";import"../chunks/index-23awfgr7.js";import"../chunks/index-m9q5byy2.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${oe.slice(oe.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){vt(e),t(e)}export{m as default};
