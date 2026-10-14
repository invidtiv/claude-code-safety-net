import"../chunks/index-42dwxb6y.js";import{gt}from"../chunks/index-296263pg.js";import{re}from"../chunks/index-5ht7pdm3.js";import"../chunks/index-85q54zga.js";import"../chunks/index-a9wxj0ns.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${re.slice(re.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){gt(e),t(e)}export{m as default};
