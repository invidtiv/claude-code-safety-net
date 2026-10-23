import"../chunks/index-x08az823.js";import{vt}from"../chunks/index-wsatc8ny.js";import{ie}from"../chunks/index-fpxp8rvc.js";import"../chunks/index-20ychw09.js";import"../chunks/index-twyxp0fs.js";var o="cc-safety-net",r="Operate CC Safety Net: explain blocks, rules, integrations, diagnostics",s="Help me with CC Safety Net.";function t(e){e.registerCommand(o,{description:r,handler:async(n,i)=>{e.sendUserMessage(a(n),i.isIdle()?void 0:{deliverAs:"followUp"})}})}function a(e){return`${ie.slice(ie.indexOf("# CC Safety Net")).trimEnd()}

## User request

${e.trim()||s}`}function m(e){vt(e),t(e)}export{m as default};
