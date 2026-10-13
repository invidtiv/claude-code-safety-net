import"../chunks/index-7d3z0k0b.js";import{ft}from"../chunks/index-fgm8n50a.js";import{re}from"../chunks/index-5ht7pdm3.js";import"../chunks/index-jw4yd2zg.js";import"../chunks/index-4z8zy2hc.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${re.slice(re.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){ft(e),t(e)}export{m as default};
