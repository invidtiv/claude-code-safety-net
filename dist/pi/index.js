import"../chunks/index-babcfevy.js";import{mt}from"../chunks/index-6hppa0dh.js";import{re}from"../chunks/index-5ht7pdm3.js";import"../chunks/index-1wd9cpbg.js";import"../chunks/index-7h15fjs7.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${re.slice(re.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){mt(e),t(e)}export{m as default};
