import{a,s,_e,Be,R,nt,ze,c,n,Ve,T,v,de,ot,f,Ke,u,o,x,i,ie,r,g,fe,U,st,at,d,me,ge,ct,D,Y,se,S,lt,G,b,Ee,H,l,Ae,Z,Je,Ye,N,w,P,he,ye,Ie,ut,m,e,Oe,ke,Ze,Xe,ae,Re,ce,De,X,W,Ne,be,B,Qe,z,Q,ee,le,et,tt,C,L,Le,Me,$e,E,je,Te,Ue,h,t,te,ve,y,k,A,dt,Ge,He,p,V}from"./chunks/index-8dhrv3gf.js";import{re,q,We,M,j}from"./chunks/index-db61mrrg.js";var Qu=["-h","--help"];function gn(I,_){let O=Object.entries(I.booleans??{}),F=Object.entries(I.values??{}),J=Object.entries(I.lists??{}),K=Object.fromEntries(O.map(([Se])=>[Se,!1])),ne={},oe=Object.fromEntries(J.map(([Se])=>[Se,[]])),ue=[],pe=[],we=!1,xe=-1;for(let[Se,Pe]of _.entries()){if(Se<=xe)continue;if(Pe==="--"){ue.push(..._.slice(Se+1));break}if(Qu.includes(Pe)){we=!0;continue}let Ce=O.find(([,en])=>en.includes(Pe));if(Ce){K[Ce[0]]=!0;continue}let qe=F.find(([,en])=>en.includes(Pe));if(qe){let en=_[Se+1];if(en===void 0||en.startsWith("-")){pe.push(`${Pe} requires a value`);continue}ne[qe[0]]=en,xe=Se+1;continue}let Fe=J.find(([,en])=>en.includes(Pe));if(Fe){let en=_.slice(Se+1),on=en.findIndex((an)=>an.startsWith("-")),sn=en.slice(0,on===-1?en.length:on);if(sn.length===0){pe.push(`${Pe} requires at least one value`);continue}oe[Fe[0]]=[...oe[Fe[0]]??[],...sn],xe=Se+sn.length;continue}if(Pe.startsWith("-")){pe.push(`Unknown option for ${I.label}: ${Pe}`);continue}if(I.positionals==="tail"){ue.push(..._.slice(Se));break}ue.push(Pe)}if(I.positionals!=="list"&&I.positionals!=="tail")pe.push(...ue.map((Se)=>`Unexpected argument for ${I.label}: ${Se}`));return{flags:K,values:ne,lists:oe,positionals:ue,help:we,errors:pe}}function Dn(I){for(let _ of I)console.error(_);return I.length>0}import{readdirSync as sp,statSync as vs,unlinkSync as ap}from"node:fs";import{basename as bs,dirname as lp,isAbsolute as cp,join as dp,relative as up,resolve as pp,sep as fp}from"node:path";var gs=(I)=>{let _=Date.now()-new Date(I).getTime();if(!Number.isFinite(_))return"";let O=Math.floor(_/60000),F=Math.floor(O/60),J=Math.floor(F/24);if(J>0)return`${J}d ago`;if(F>0)return`${F}h ago`;if(O>0)return`${O}m ago`;return"just now"},ko=(I)=>{let _=(I??"").trim().split(/\s+/).filter((J)=>J&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(J)),O=_[0]?.split("/").pop();if(!O)return null;let F=_[1];return F&&/^[a-z][a-z0-9-]*$/.test(F)?`${O} ${F}`:O};function hs(I){let _=(J)=>`${J.sessionId}
${ko(J.segment||J.command)}`,O=I.filter((J)=>J.decision!=="allow"),F=O.filter((J)=>J.sessionId).reduce((J,K)=>J.set(_(K),(J.get(_(K))??0)+1),new Map);return new Set(O.filter((J)=>J.failureStage||(F.get(_(J))??0)>=2))}import{existsSync as ep,readdirSync as np,readFileSync as tp}from"node:fs";import{join as rp}from"node:path";function zn(I,_){try{return np(I,{withFileTypes:!0,encoding:"utf8"}).flatMap((O)=>{let F=rp(I,O.name);if(O.isDirectory())return zn(F,_);if(O.name.endsWith(".jsonl"))return[F];return[]})}catch{if(_&&ep(I))_.count++;return[]}}var op=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function ip(I){if(!I||typeof I!=="object"||Array.isArray(I))return!1;let _=I;if(typeof _.ts!=="string"||typeof _.command!=="string")return!1;return op.every((O)=>_[O]===void 0||typeof _[O]==="string")}function kt(I,_){try{return tp(I,"utf-8").split(`
`).filter(Boolean).flatMap((O)=>{try{let F=JSON.parse(O);if(!ip(F)){if(_)_.count++;return[]}return[F]}catch{if(_)_.count++;return[]}})}catch{if(_)_.count++;return[]}}function hn(I){return Array.from(I,(_)=>{let O=_.charCodeAt(0);if(O<=31||O>=127&&O<=159)return`\\x${O.toString(16).padStart(2,"0")}`;return _}).join("")}function mp(I,_){let O=re(I),F=gn({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},_);if(Dn(F.errors))return null;if(F.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(F.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let J=F.values.limit===void 0?20:ys(F.values.limit);if(J===null)return console.error("--limit must be a positive number"),null;let K=F.values.since===void 0?Math.min(30,O):ys(F.values.since);if(K===null||K>O)return console.error(`--since must be a positive number of days no greater than ${O}`),null;let ne={limit:J,limitExplicit:F.values.limit!==void 0,since:K,sinceExplicit:F.values.since!==void 0,all:F.flags.all,json:F.flags.json,suspect:F.flags.suspect,pruneLegacy:F.flags.pruneLegacy,dryRun:F.flags.dryRun,id:F.values.id,agent:F.values.agent,rule:F.values.rule,session:F.values.session,project:F.values.project===void 0?void 0:pp(F.values.project)};if(ne.id&&(ne.agent!==void 0||ne.rule!==void 0||ne.session!==void 0||ne.project!==void 0||ne.suspect||ne.sinceExplicit||ne.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ne.pruneLegacy&&(ne.id!==void 0||ne.agent!==void 0||ne.rule!==void 0||ne.session!==void 0||ne.project!==void 0||ne.suspect||ne.all||ne.sinceExplicit||ne.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ne.dryRun&&!ne.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ne}async function ws(I,_,O={}){let F=mp(I,_);if(!F)return 1;let J=O.logsDir??M(I);if(F.pruneLegacy)return gp(J,F.json,F.dryRun);if(!J)return console.log(F.json?"[]":F.id?`No retained audit log entry found for id ${hn(F.id)}.`:"No audit log entries found."),0;q(I,J);let K={count:0},ne=zn(J,K).flatMap((xe)=>kt(xe,K).map((Se)=>({entry:Se,file:xe})));if(K.count>0)console.error(`warning: ${K.count} audit log ${K.count===1?"source":"sources"} could not be read; these results are incomplete`);if(F.id)return bp(ne,F,O.timeZone);let oe=Date.now()-F.since*24*60*60*1000,ue=ne.filter((xe)=>wp(xe,F,J,oe)),pe=F.suspect?hs(ue.map((xe)=>xe.entry)):null,we=(pe?ue.filter((xe)=>pe.has(xe.entry)):ue).sort((xe,Se)=>Date.parse(Se.entry.ts)-Date.parse(xe.entry.ts)).slice(0,F.limit);if(F.json)return console.log(JSON.stringify(we.map((xe)=>xe.entry),null,2)),0;if(we.length===0)return console.log("No audit log entries found."),0;for(let xe of we)console.log(Cp(xe.entry,O.timeZone));return 0}function gp(I,_,O){let F=I?yp(I).map((oe)=>dp(I,oe)):[];if(O)return hp(F,_);let J=[],K=0,ne=0;for(let oe of F){let ue=vs(oe,{throwIfNoEntry:!1})?.size??0,pe=vp(oe);if(pe){J.push(`${bs(oe)}: ${pe}`);continue}K++,ne+=ue}if(_)return console.log(JSON.stringify({removedFiles:K,removedBytes:ne,failedFiles:J.length})),J.length===0?0:1;console.log(K===0&&J.length===0?"No legacy audit log files found.":`Removed ${K} legacy audit log ${K===1?"file":"files"} (${ks(ne)}).`);for(let oe of J)console.error(`Could not remove ${hn(oe)}`);if(console.log("Nested v2 audit logs were not changed."),K>0)console.log("This deletion cannot be undone.");return J.length===0?0:1}function hp(I,_){let O=I.reduce((F,J)=>F+(vs(J,{throwIfNoEntry:!1})?.size??0),0);if(_)return console.log(JSON.stringify({dryRun:!0,files:I.length,bytes:O})),0;if(console.log(I.length===0?"No legacy audit log files found.":`Would remove ${I.length} legacy audit log ${I.length===1?"file":"files"} (${ks(O)}).`),console.log("Nested v2 audit logs are not included."),I.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function yp(I){try{return sp(I,{withFileTypes:!0}).filter((_)=>_.isFile()&&_.name.endsWith(".jsonl")).map((_)=>_.name)}catch{return[]}}function vp(I){try{return ap(I),null}catch(_){return _ instanceof Error?_.message:String(_)}}function ks(I){let _=["B","KiB","MiB","GiB"],O=Math.min(Math.floor(Math.log2(Math.max(I,1))/10),_.length-1);return`${Math.round(I/1024**O*10)/10} ${_[O]}`}function bp(I,_,O){let F=I.filter((K)=>K.entry.id===_.id);if(F.length>1)return console.error(`Multiple audit log entries found for id ${hn(_.id??"")}.`),1;if(_.json)return console.log(JSON.stringify(F.map((K)=>K.entry),null,2)),0;let J=F[0];if(!J)return console.log(`No retained audit log entry found for id ${hn(_.id??"")}.`),0;return console.log(Sp(J.entry,O)),0}function wp(I,_,O,F){if(!_.all&&I.entry.decision==="allow")return!1;if(Date.parse(I.entry.ts)<F)return!1;if(_.agent!==void 0&&I.entry.agent!==_.agent)return!1;if(_.rule!==void 0&&I.entry.ruleId!==_.rule)return!1;if(_.session!==void 0&&!kp(I,O,_.session))return!1;if(_.project!==void 0&&!xp(I.entry.cwd,_.project))return!1;return!0}function kp(I,_,O){if(I.entry.sessionId===O)return!0;return lp(I.file)===_&&bs(I.file,".jsonl")===O}function xp(I,_){if(!I)return!1;let O=up(_,I);return O!==".."&&!O.startsWith(`..${fp}`)&&!cp(O)}function Cp(I,_){let O=hn(I.id??"-"),F=hn(I.decision??"deny"),J=I.cwd?`  [${hn(I.cwd)}]`:"",K=I.segment||I.command,ne=K===I.command?"":"↳ ",oe=K.length>50?`${K.slice(0,50)}…`:K;return`${O.padEnd(16)}  ${hn(xs(I.ts,_))}  ${F.padEnd(5)}  ${hn(I.agent??"-").padEnd(15)}  ${hn(I.ruleId??"-").padEnd(20)}  ${ne}${hn(oe)}${J}`}function Sp(I,_){let O=(J)=>hn(J===void 0||J===null||J===""?"-":J),F=I.shape?`${I.agent??"-"} (shape: ${I.shape})`:I.agent??"-";return[`id:        ${O(I.id)}`,`ts:        ${O(xs(I.ts,_))}`,`decision:  ${O(I.decision)}`,`agent:     ${O(F)}`,`level:     ${O(I.level)}`,`tool:      ${O(I.toolName)}`,`rule:      ${O(I.ruleId)}`,`intent:    ${O(I.intent)}`,`stage:     ${O(I.failureStage)}`,`error:     ${O(I.errorCode)}`,`session:   ${O(I.sessionId)}`,`cwd:       ${O(I.cwd)}`,`version:   ${O(I.v)}`,`truncated: ${O(I.truncated===!0?"yes":void 0)}`,`reason:    ${O(I.reason)}`,`command:   ${O(I.command)}`,`segment:   ${O(I.segment)}`].join(`
`)}function xs(I,_){let O=new Date(I);if(Number.isNaN(O.getTime()))return I;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:_}).format(O)}function ys(I){let _=Number(I);return Number.isFinite(_)&&_>0?_:null}var Cs={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var Ss={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var Rs={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var xo=["npx","--offline","--no-install","@deepseek-ai/dsh","--version"],pr=[{id:"antigravity-cli",displayName:"Antigravity CLI",doctorOrder:3,runtime:{order:1,flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:2,flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",doctorOrder:1,runtime:{order:2,displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{order:3,flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",doctorOrder:4,runtime:{order:3,flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{order:4,flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",doctorOrder:10,runtime:{order:8,flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{order:10,flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",doctorOrder:9,runtime:{order:7,flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{order:9,flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",doctorOrder:11,runtime:{order:9,flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{order:11,flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",doctorOrder:12,runtime:{order:10,flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{order:12,flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",doctorOrder:13,runtime:{order:11,flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{order:13,flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",doctorOrder:14,install:{order:14,flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",doctorOrder:15,install:{order:15,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",doctorOrder:16,install:{order:16,flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",doctorOrder:5,runtime:{order:4,flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{order:5,flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"deepseek-harness",displayName:"DeepSeek Harness",doctorOrder:6,install:{order:6,flag:"--deepseek-harness",artifactKind:"package",probeCommand:xo}},{id:"devin",displayName:"Devin CLI",doctorOrder:7,runtime:{order:5,flags:["-dv","--devin"],description:"Run as Devin CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:7,flag:"--devin",artifactKind:"hook config",probeCommand:["devin","--version"]}},{id:"droid",displayName:"Factory Droid",doctorOrder:8,runtime:{order:6,flags:["-fd","--droid"],description:"Run as Factory Droid PreToolUse hook",legacyTopLevelFlags:[]},install:{order:8,flag:"--droid",artifactKind:"hook config",probeCommand:["droid","--version"]}},{id:"amp",displayName:"Amp Code",doctorOrder:2,install:{order:1,flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],fr=pr.slice().sort((I,_)=>I.doctorOrder-_.doctorOrder).map((I)=>I.id),Ht=pr.filter((I)=>("runtime"in I)).slice().sort((I,_)=>I.runtime.order-_.runtime.order).map((I)=>({id:I.id,displayName:"displayName"in I.runtime?I.runtime.displayName:I.displayName,flags:I.runtime.flags,legacyFlags:"legacyFlags"in I.runtime?I.runtime.legacyFlags:[],description:I.runtime.description,legacyTopLevelFlags:I.runtime.legacyTopLevelFlags})),En=pr.slice().sort((I,_)=>I.install.order-_.install.order).map((I)=>({id:I.id,...I.install})).map(({order:I,..._})=>_),Rp=Object.fromEntries(pr.map((I)=>[I.id,I.displayName]));function mn(I){return Rp[I]}var Pp=Ht.map((I)=>({flags:I.flags.join(", "),description:I.description})),Ep=Ht.flatMap((I)=>I.flags.map((_)=>`cc-safety-net hook ${_}`)),Ps={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...Pp,{flags:"-h, --help",description:"Show this help"}],examples:Ep};var Es={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...En.map((I)=>({flags:I.flag,description:`Install ${mn(I.id)} ${I.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...En.map((I)=>`cc-safety-net install ${I.flag}`)]},As={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...En.map((I)=>({flags:I.flag,description:`Uninstall ${mn(I.id)} ${I.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...En.map((I)=>`cc-safety-net uninstall ${I.flag}`)]},Is={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var _s={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var mr={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Co=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],So=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],xt={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...Co.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...So,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var Ts={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var $s={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var gr=[Ts,Cs,_s,Ss,xt,mr,Es,Is,As,Ps,Rs,$s];function Ap(I){return I.aliases??[]}function hr(I){let _=I.toLowerCase();return gr.find((O)=>O.name.toLowerCase()===_||Ap(O).some((F)=>F.toLowerCase()===_))}import{existsSync as lh}from"node:fs";import{basename as Ip}from"node:path";function yr(I,_=7,O=M(I)){let F=Date.now()-_*24*60*60*1000,J=[],K=new Set,ne=0,oe,ue,pe,we;if(O)q(I,O);let xe={count:0},Se=O?zn(O,xe):[];for(let Ce of Se)for(let qe of kt(Ce,xe)){if(qe.decision==="allow")continue;let Fe=new Date(qe.ts).getTime();if(Fe>=F){if(ne++,K.add(qe.sessionId??Ip(Ce,".jsonl")),ue===void 0||Fe<=ue)oe=qe.ts,ue=Fe;if(we===void 0||Fe>we)pe=qe.ts,we=Fe;_p(J,qe,Fe)}}let Pe=J.map((Ce)=>({timestamp:Ce.ts,command:Ce.command,reason:Ce.reason,relativeTime:gs(new Date(Ce.ts))}));return{totalBlocked:ne,sessionCount:K.size,recentEntries:Pe,oldestEntry:oe,newestEntry:pe,unreadable:xe.count}}function _p(I,_,O){let F=I.findIndex((J)=>O>new Date(J.ts).getTime());if(F===-1){if(I.length<3)I.push(_);return}if(I.splice(F,0,_),I.length>3)I.pop()}import{dirname as Gp}from"node:path";import{dirname as Tp,join as $p,resolve as Op}from"node:path";var Dp="config.json";function wn(I,_,O,F){g(Lp(I),`${JSON.stringify(_,null,2)}
`,O,F)}function Lp(I){return typeof I==="string"?ie(I):I}function Po(I){return{errors:ae(jp(I),": "," "),ruleNames:new Set(De(I).map((_)=>_.toLowerCase()))}}var Np="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",Os="must match pattern (letters, numbers, hyphens, underscores)";function jp(I){if(!Ds(I))return[e([],"Config must be an object")];return[...I.version===1?[]:[e(["version"],"must be 1")],...Fp(I.rules)]}function Fp(I){if(I===void 0)return[];if(!Array.isArray(I))return[e(["rules"],"must be an array")];return[...I.flatMap((_,O)=>Ds(_)?Hp(_,["rules",O]):[e(["rules",O],"must be an object")]),...Oe(I)]}function Hp(I,_){return[...Ro(I.name,[..._,"name"],"required string",d,Np),...Ro(I.command,[..._,"command"],"required string",w,Os),...I.subcommand===void 0?[]:Ro(I.subcommand,[..._,"subcommand"],"must be a string if provided",w,Os),...Mp(I.block_args,[..._,"block_args"]),...Up(I.reason,[..._,"reason"]),...I.intent===void 0||Re(I.intent)?[]:[e([..._,"intent"],ke)]]}function Ro(I,_,O,F,J){if(typeof I!=="string")return[e(_,O)];return F.test(I)?[]:[e(_,J)]}function Mp(I,_){if(!Array.isArray(I))return[e(_,"required array")];if(I.length===0)return[e(_,"must have at least one element")];return I.flatMap((O,F)=>{if(typeof O!=="string")return[e([..._,F],"must be a string")];return O===""?[e([..._,F],"must not be empty")]:[]})}function Up(I,_){if(typeof I!=="string")return[e(_,"required string")];if(I==="")return[e(_,"must not be empty")];return I.length>P?[e(_,`must be at most ${P} characters`)]:[]}function Ds(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}function Eo(I){let _=Ls(I);if(!_.ok)return _.result;return Po(_.parsed)}function Ls(I){let _=[],O=new Set;try{let F=typeof I==="string"?ie(I):I,J=r(F);if(J===null)return _.push(`File not found: ${F.path}`),{ok:!1,result:{errors:_,ruleNames:O}};if(!J.trim())return _.push("Config file is empty"),{ok:!1,result:{errors:_,ruleNames:O}};return{ok:!0,parsed:JSON.parse(J)}}catch(F){if(F instanceof o)return _.push(F.message),{ok:!1,result:{errors:_,ruleNames:O}};let J=F instanceof Error?F.message:String(F);return _.push(F instanceof SyntaxError?"Invalid JSON":J),{ok:!1,result:{errors:_,ruleNames:O}}}}function vr(I){return Op(I,".safety-net.json")}function Un(I){let _=Ls(I);if(!_.ok)return _.result;let O=Ze(_.parsed);return{errors:O.errors,ruleNames:O.sources}}function Ct(I,_={}){return $p(Tp(Ee(I,_)),Dp)}function Ns(I,_,O){let F;try{if(r(_)===null)return{path:I,exists:!1,valid:!1,ruleCount:0};F=Un(_),F.errors.push(...W(I,O))}catch(J){if(!(J instanceof o))throw J;F={errors:[J.message],ruleNames:new Set}}return{path:I,exists:!0,valid:F.errors.length===0,ruleCount:F.ruleNames.size,...F.errors.length>0?{errors:F.errors}:{}}}function Bp(I,_){return{source:_,name:I.name,command:I.command,subcommand:I.subcommand,blockArgs:[...I.block_args],reason:I.reason}}function js(I,_){let O=H(I),F=G(_),J=Gp(O),K=X(I,{cwd:_,userConfigPath:O,projectConfigPath:F,userConfigDir:J}),ne=Z(I,{cwd:_,userConfigPath:O,projectConfigPath:F,userConfigDir:J}),oe=new Map(K.rulebooks.flatMap((ue)=>ue.rules.map((pe)=>[pe,ue.source])));return{userConfig:Ns(O,ne.userConfigTarget,ne.userScope),projectConfig:Ns(F,ne.projectConfigTarget,ne.projectScope),effectiveRules:K.rules.map((ue)=>Bp(ue,oe.get(ue.name)??"project"))}}var qp=[{flag:n.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:n.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:n.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:n.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:n.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:n.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:n.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:n.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"},{flag:n.projectTightenOnly,description:"Ignore project policy settings that weaken the user policy",defaultBehavior:"off"}];function Fs(I){return[...qp.map((_)=>({name:_.flag.name,value:de(_.flag,I.env),isSet:ot(_.flag,I.env),legacyName:_.flag.legacyName,legacyValue:_.flag.legacyName?I.env.get(_.flag.legacyName):void 0,legacyIsSet:_.flag.legacyName?I.env.get(_.flag.legacyName)!==void 0:void 0,description:_.description,defaultBehavior:_.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:I.env.get("CC_SAFETY_NET_HOME"),isSet:I.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var Hs={error:0,warning:1,info:2},Vp=["policy","config","audit"];function Jp(I){return I.map((_)=>{if(_==="ownership")return"is not owned by the current user";if(_==="permissions")return"has unsafe permissions";if(_==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var zp=[{derive:(I)=>I.hooks.length>0&&I.hooks.every((_)=>!_.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(I)=>I.hooks.filter((_)=>_.inspectionStatus==="failed").map((_)=>{let O=mn(_.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${O} inspection failed`,detail:`Doctor could not verify the ${O} integration configuration.`,fixHint:`Correct the reported ${O} configuration error, then run \`cc-safety-net doctor\` again.`,integration:_.platform}})},{derive:(I)=>I.userConfig.exists&&!I.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:I.userConfig.path}]:[]},{derive:(I)=>I.projectConfig.exists&&!I.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:I.projectConfig.path}]:[]},{derive:(I)=>I.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${I.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(I)=>I.v2Leftovers&&I.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${I.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(I)=>I.legacyConfigs&&I.legacyConfigs.length>0?[{checkId:"config.legacy-ignored",severity:"warning",title:"Legacy inline rule configs are ignored",detail:`CC Safety Net no longer loads these files, so their rules enforce nothing: ${I.legacyConfigs.join(", ")}.`,fixHint:"Run `cc-safety-net rule migrate` to convert them (add `--cleanup` to delete each file once it is converted), then rerun doctor."}]:[]},{derive:(I)=>{let _=I.environment.find((O)=>O.name==="CC_SAFETY_NET_AUDIT_SCOPE");return Ve(_?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Vp.map((I)=>({derive:(_)=>_.posture.directories.filter((O)=>O.kind===I&&O.status==="unsafe").map((O)=>({checkId:`posture.${I}-directory-unsafe`,severity:"error",title:`${I[0]?.toUpperCase()}${I.slice(1)} directory is unsafe`,detail:`The ${I} directory ${Jp(O.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...O.path?{path:O.path}:{}}))})),{derive:(I)=>{let _=[...I.effectiveSafety.weakenedRuleOverrides].sort();return _.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${_.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${_.join(", ")}.`}]:[]}}];function Ms(I){return zp.flatMap((_,O)=>_.derive(I).map((F,J)=>({finding:F,catalogOrder:O,occurrence:J}))).sort((_,O)=>Hs[_.finding.severity]-Hs[O.finding.severity]||_.catalogOrder-O.catalogOrder||_.occurrence-O.occurrence).map((_)=>_.finding)}function Ln(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var Kp=(I)=>Ln()?`\x1B[32m${I}\x1B[0m`:I,Wp=(I)=>Ln()?`\x1B[33m${I}\x1B[0m`:I,Yp=(I)=>Ln()?`\x1B[34m${I}\x1B[0m`:I,Zp=(I)=>Ln()?`\x1B[36m${I}\x1B[0m`:I,Xp=(I)=>Ln()?`\x1B[31m${I}\x1B[0m`:I,Qp=(I)=>Ln()?`\x1B[2m${I}\x1B[0m`:I,ef=(I)=>Ln()?`\x1B[1m${I}\x1B[0m`:I,nn={green:Kp,yellow:Wp,blue:Yp,cyan:Zp,red:Xp,dim:Qp,bold:ef},nf="\x1B[0m",tf=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function rf(I){let _=I;return()=>(_=(_*1664525+1013904223)%4294967296,_/4294967296)}function of(I){let _=[...tf],O=rf(I);for(let F=_.length-1;F>0;F--){let J=Math.floor(O()*(F+1)),K=_[F];_[F]=_[J],_[J]=K}return _}function sf(I,_=0){if(!Ln())return"";let O=of(_);return`\x1B[38;5;${O[I%O.length]}m`}function Us(I,_,O=0){if(!Ln())return`"${I}"`;return`${sf(_,O)}"${I}"${nf}`}function br(I){return I==="default"?"built-in default":`${I} policy`}var af=new RegExp("\x1B\\[[0-9;]*m","g"),Ao=(I)=>I.replace(af,"").length;function Kn(I){let _=(I.headers??I.rows[0]??[]).map((ne,oe)=>{let ue=Math.max(...I.rows.map((pe)=>Ao(pe[oe]??"")));return Math.max(Ao(ne),ue)}),O=(ne,oe)=>ne+" ".repeat(Math.max(0,oe-Ao(ne))),F=(ne,oe)=>oe[0]+_.map((ue)=>ne.repeat(ue+2)).join(oe[1])+oe[2],J=(ne)=>`│ ${ne.map((oe,ue)=>O(oe,_[ue]??0)).join(" │ ")} │`,K=I.headers?[`   ${J(I.headers)}`,`   ${F("─",["├","┼","┤"])}`]:[];return[`   ${F("─",["┌","┬","┐"])}`,...K,...I.rows.map((ne)=>`   ${J(ne)}`),`   ${F("─",["└","┴","┘"])}`].join(`
`)}function Gs(I){let _=[];_.push("Hook Integration"),_.push(lf(I));let O=[],F=[];for(let J of I){let K=mn(J.platform);if(J.errors&&J.errors.length>0)for(let ne of J.errors)if(J.configured)O.push({platform:K,message:ne});else F.push({platform:K,message:ne})}for(let J of O)_.push(`   Warning (${J.platform}): ${J.message}`);for(let J of F)_.push(nn.red(`   Error (${J.platform}): ${J.message}`));return _.join(`
`)}function lf(I){let _=["Platform","Discovery","Configuration","Inspection"],O=I.map((F)=>{let J=mn(F.platform);if(F.inspectionStatus==="not-inspected"){let ue=nn.dim("Not inspected");return[J,ue,ue,ue]}let K=F.detected?nn.green("Detected"):F.inspectionStatus==="failed"?nn.red("Unknown"):nn.dim("Not detected"),ne=F.configured?nn.green("Configured"):F.detected?nn.yellow("Not configured"):F.inspectionStatus==="failed"?nn.red("Unknown"):nn.dim("Not applicable"),oe=F.inspectionStatus==="verified"?nn.green("Verified"):F.inspectionStatus==="failed"?nn.red("Failed"):nn.dim("Not applicable");return[J,K,ne,oe]});return Kn({headers:_,rows:O})}function Bs(I){let O=["Guard Engine Verification",`   Synthetic self-test: ${I.failed>0?nn.red(`${I.passed}/${I.total} FAIL`):nn.green(`${I.passed}/${I.total} passed`)}`],F=I.results.filter((J)=>!J.passed);if(F.length>0){O.push(""),O.push(nn.red("   Failures:"));for(let J of F)O.push(nn.red(`   • ${J.description}`)),O.push(nn.red(`     expected ${J.expected}, got ${J.actual}`))}return O.join(`
`)}function cf(I){if(I.length===0)return"   (no custom rules)";let _=["Source","Name","Command","Block Args"],O=I.map((F)=>[F.source,F.name,F.subcommand?`${F.command} ${F.subcommand}`:F.command,F.blockArgs.join(", ")]);return Kn({headers:_,rows:O})}function qs(I){let _=[];if(_.push("Configuration"),_.push(df(I.userConfig,I.projectConfig)),_.push(""),I.effectiveRules.length>0)_.push(`   Effective rules (${I.effectiveRules.length} total):`),_.push(cf(I.effectiveRules));else _.push("   Effective rules: (none - using built-in rules only)");return _.join(`
`)}function df(I,_){let O=["Scope","Status"],F=(K)=>{if(!K.exists)return nn.dim("N/A");if(!K.valid)return nn.red(`Invalid (${K.errors?.[0]??"unknown error"})`);return nn.green("Configured")},J=[["User",F(I)],["Project",F(_)]];return Kn({headers:O,rows:J})}function Vs(I){let _=[];return _.push("Environment"),_.push(uf(I)),_.join(`
`)}function Js(I){let _=I.effectiveSafety.policyScopes,O=["Effective Safety",`   Selected preset: ${I.effectiveSafety.selectedPreset}${_?` (${br(_.levelScope)})`:""}`,`   Effective: ${I.effectiveSafety.level}`],F=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[J,K]of F){let ne=I.effectiveSafety.capabilities[J],oe=ne.enabled?nn.green("ON"):nn.dim("OFF"),ue=ne.sources.length>0?` (${ne.sources.join(", ")})`:"";O.push(`   ${K}: ${oe} via ${ne.source}${ue}`)}if(_&&_.weakenings.length>0){O.push(`   Project policy deltas${_.weakeningsIgnored?" (ignored)":""}:`);for(let J of _.weakenings)O.push(`      ${J}`)}O.push(`   Stored rule customizations: ${I.effectiveSafety.ruleCounts.stored}`),O.push(`   Effective rule customizations: ${I.effectiveSafety.ruleCounts.effective}`);for(let[J,K]of Object.entries(I.effectiveSafety.ruleOverrides))O.push(`   ${J}: ${K}`);return O.join(`
`)}function zs(I){let _=["Findings"];if(I.length===0)return _.push("   No findings from inspected doctor facts."),_.join(`
`);for(let O of I){let F=`[${O.severity.toUpperCase()}] ${O.checkId}: ${hn(O.title)}`,J=O.severity==="error"?nn.red:O.severity==="warning"?nn.yellow:nn.blue;if(_.push(`   ${J(F)}`),_.push(`      ${hn(O.detail)}`),O.path)_.push(`      Path: ${hn(O.path)}`);if(O.fixHint)_.push(`      Fix: ${hn(O.fixHint)}`)}return _.join(`
`)}function uf(I){let _=["Variable","Status","Legacy"],O=I.map((F)=>{let J=F.isSet?nn.green("✓"):nn.dim("✗"),K=F.legacyName&&F.legacyIsSet?`${F.legacyName} ${nn.green("✓")}`:F.legacyName??"";return[F.name,J,K]});return Kn({headers:_,rows:O})}function Ks(I){let _=[];if(I.totalBlocked===0)_.push("Recent Activity"),_.push("   No blocked commands in the last 7 days"),_.push("   Tip: This is normal for new installations");else _.push(`Recent Activity · last 7 days (${I.totalBlocked} blocked / ${I.sessionCount} sessions)`),_.push(pf(I.recentEntries));if(I.unreadable>0)_.push(`   Warning: ${I.unreadable} audit log ${I.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return _.join(`
`)}function pf(I){let _=["Time","Command"],O=I.map((F)=>{let J=hn(F.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),K=J.length>40?`${J.slice(0,37)}...`:J;return[F.relativeTime,K]});return Kn({headers:_,rows:O})}function Ws(I){let _=[];if(_.push("Update Check"),I.latestVersion===null&&!I.error)return _.push(wr([["Status",nn.dim("Skipped")],["Installed",I.currentVersion]])),_.join(`
`);if(I.error)return _.push(wr([["Status",`${nn.yellow("⚠")} Error`],["Installed",I.currentVersion],["Error",nn.dim(I.error)]])),_.join(`
`);if(I.updateAvailable)return _.push(wr([["Status",`${nn.yellow("⚠")} Update Available`],["Current",I.currentVersion],["Latest",nn.green(I.latestVersion??"")]])),_.push(""),_.push("   Run: bunx cc-safety-net@latest doctor"),_.push("   Or:  npx cc-safety-net@latest doctor"),_.join(`
`);return _.push(wr([["Status",`${nn.green("✓")} Up to date`],["Version",I.currentVersion]])),_.join(`
`)}function wr(I){return Kn({rows:I})}function Ys(I){let _=[];return _.push("System Info"),_.push(ff(I)),_.join(`
`)}function ff(I){let _=["Component","Version"],O=(K)=>{if(K===null)return nn.dim("not found");return K},J=[{label:"cc-safety-net",value:I.version},...fr.map((K)=>({label:mn(K),value:I.versions[K]??null})),{label:"Node.js",value:I.nodeVersion},{label:"npm",value:I.npmVersion},{label:"Bun",value:I.bunVersion},{label:"Platform",value:I.platform}].map((K)=>[K.label,O(K.value)]);return Kn({headers:_,rows:J})}function Zs(I){if(I.findings.length===0)return nn.green(`
No findings from inspected doctor facts.`);let _={error:I.findings.filter((K)=>K.severity==="error").length,warning:I.findings.filter((K)=>K.severity==="warning").length,info:I.findings.filter((K)=>K.severity==="info").length},O=["error","warning","info"].filter((K)=>_[K]>0).map((K)=>`${_[K]} ${K}`),F=I.findings.length===1?"finding":"findings",J=`
${I.findings.length} ${F}: ${O.join(", ")}.`;if(_.error>0)return nn.red(J);if(_.warning>0)return nn.yellow(J);return nn.blue(J)}import{lstatSync as mf}from"node:fs";import{dirname as Io}from"node:path";function _o(I,_){try{let O=mf(_);if(O.isSymbolicLink())return{kind:I,path:_,status:"unsafe",issues:["symlink"]};if(!O.isDirectory())return{kind:I,path:_,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:I,path:_,status:"unknown",issues:[]};let F=[...O.uid!==process.getuid()?["ownership"]:[],...(O.mode&18)!==0?["permissions"]:[]];return{kind:I,path:_,status:F.length>0?"unsafe":"safe",issues:F}}catch(O){if(typeof O==="object"&&O!==null&&"code"in O&&O.code==="ENOENT")return{kind:I,path:_,status:"not-applicable",issues:[]};return{kind:I,path:_,status:"unknown",issues:[]}}}function Xs(I,_){let O=M(I);return{directories:[_o("policy",Io(Io(_))),_o("config",Io(_)),...O?[_o("audit",O)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as gf}from"node:child_process";import{existsSync as Qs}from"node:fs";import{delimiter as hf,extname as yf,join as vf}from"node:path";import{stripVTControlCharacters as ea}from"node:util";var ta="2.5.2",bf=5000,wf="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function pn(){return ta}function To(I,_){let O=I[_];if(O)return O;let F=Object.keys(I).find((J)=>J.toLowerCase()===_.toLowerCase()&&!!I[J]);return F?I[F]:O}function kf(I){return(To(I,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((_)=>_.length>0)}function xf(I,_){let O=yf(I)?[I]:[...kf(_).map((F)=>`${I}${F}`),I];if(I.includes("/")||I.includes("\\"))return O.find((F)=>Qs(F))??I;return(To(_,"PATH")??"").split(hf).flatMap((F)=>O.map((J)=>vf(F,J))).find((F)=>Qs(F))??I}function na(I){if(!/[\s"&|<>^]/.test(I))return I;return`"${I.replace(/"/g,'""')}"`}function Wn(I,_){let[O,...F]=I,J=_[wf]==="win32"?"win32":process.platform;if(!O||J!=="win32")return{cmd:O??"",args:F};let K=xf(O,_);if(!/\.(?:bat|cmd)$/i.test(K))return{cmd:K,args:F};return{cmd:To(_,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",na(K),...F.map(na)].join(" ")]}}var St=async(I,_=bf)=>{let O=await Cf(I,{timeoutMs:_});if(O.code!==0)return null;return ea(O.stdout).trim()||ea(O.stderr).trim()||null};function Cf(I,_){let[O,...F]=I;if(!O)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((J)=>{try{let K=Wn([O,...F],process.env),ne=gf(K.cmd,K.args,{stdio:["ignore","pipe","pipe"]}),oe=!1,ue="",pe="";ne.stdout.on("data",(Se)=>{ue+=Se.toString()}),ne.stderr.on("data",(Se)=>{pe+=Se.toString()});let we=(Se)=>{if(oe)return;oe=!0,clearTimeout(xe),J(Se)},xe=setTimeout(()=>{ne.kill(),we({code:null,stdout:ue,stderr:pe})},_.timeoutMs);ne.on("close",(Se)=>{we({code:Se,stdout:ue,stderr:pe})}),ne.on("error",()=>{we({code:null,stdout:ue,stderr:pe})})}catch{J({code:null,stdout:"",stderr:""})}})}function kr(I){if(!I)return null;let _=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(I);if(_)return _[1]??null;let O=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(I);if(O)return O[1]??null;return I.split(`
`)[0]?.trim()||null}async function xr(I,_=St,O=process.cwd()){let F=Promise.all(En.map(async(xe)=>[xe.id,kr(await _([...xe.probeCommand]))])),[J,K,ne,oe,ue,pe,we]=await Promise.all([F,F.then(async(xe)=>{let Se=xe.find(([qe])=>qe==="opencode")?.[1];if(!Se?.startsWith("2.")||!I(Se))return null;let Pe=["--param",`location[directory]=${O}`],Ce=["opencode","api","integration.list",...Pe];return await _(Ce,30000),_(["opencode","api","plugin.list",...Pe],30000)}),_(["codex","plugin","list"],30000),_(["amp","plugins","list"],30000),_(["node","--version"]),_(["npm","--version"]),_(["bun","--version"])]);return{version:ta,versions:Object.fromEntries(J),codexPluginListOutput:ne,ampPluginListOutput:oe,openCodePluginListOutput:K,nodeVersion:kr(ue),npmVersion:kr(pe),bunVersion:kr(we),platform:`${process.platform} ${process.arch}`}}function $o(I,_){if(_==="dev")return!1;let O=I.split(".").map(Number),F=_.split(".").map(Number),[J=0,K=0,ne=0]=O,[oe=0,ue=0,pe=0]=F;if(J!==oe)return J>oe;if(K!==ue)return K>ue;return ne>pe}async function Gn(){let I=pn(),_=new AbortController,O=setTimeout(()=>_.abort(),3000);try{let F=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:_.signal});if(!F.ok)return{currentVersion:I,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${F.status}`};let J=await F.json(),K=$o(J.version,I);return{currentVersion:I,latestVersion:J.version,updateAvailable:K}}catch(F){return{currentVersion:I,latestVersion:null,updateAvailable:!1,error:F instanceof Error?F.message:"Network error"}}finally{clearTimeout(O)}}import*as da from"node:readline";var sa=(I)=>`\x1B[${I}B`,Sf=(I)=>`\x1B[${I}A`;var ra=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function Rf(I){return new Promise((_)=>setTimeout(_,I))}function Pf(I,_,O){if(!O)return _(I);if(O.aborted)return Promise.resolve();return new Promise((F,J)=>{let K=()=>O.removeEventListener("abort",ne),ne=()=>{K(),F()};O.addEventListener("abort",ne,{once:!0}),_(I).then(()=>{K(),F()},(oe)=>{K(),J(oe)})})}function Cr(I){return Math.max(0,Math.min(1,I))}function Rt(I){return Math.max(0,Math.min(255,Math.round(I)))}function Oo(I){return I<=0.0031308?12.92*I:1.055*I**0.4166666666666667-0.055}function Ef(I,_,O){let F=O*Math.PI/180,J=_*Math.cos(F),K=_*Math.sin(F),ne=(I+0.3963377774*J+0.2158037573*K)**3,oe=(I-0.1055613458*J-0.0638541728*K)**3,ue=(I-0.0894841775*J-1.291485548*K)**3;return{blue:Rt(Oo(Cr(-0.0041960863*ne-0.7034186147*oe+1.707614701*ue))*255),green:Rt(Oo(Cr(-1.2684380046*ne+2.6097574011*oe-0.3413193965*ue))*255),red:Rt(Oo(Cr(4.0767416621*ne-3.3077115913*oe+0.2309699292*ue))*255)}}function Do(I,_){let O=(_*I*180/Math.PI%360+360)%360;return Ef(0.72,0.15,O)}function aa(I,_=0.1){let O=Do(_,I);return`\x1B[38;2;${O.red};${O.green};${O.blue}m`}function Af(I,_){return{blue:Rt(I.blue+(255-I.blue)*_),green:Rt(I.green+(255-I.green)*_),red:Rt(I.red+(255-I.red)*_)}}function la(I,_,O){let F=Math.imul(I+2654435769,2246822507)^Math.imul(_+3266489909,668265263)^Math.imul(O+374761393,2654435761),J=F^F>>>15,K=Math.imul(J,739982445),ne=K^K>>>12,oe=Math.imul(ne,695872825);return((oe^oe>>>15)>>>0)/4294967296}function If(I,_,O){let F=Math.floor(la(I,_,O)*ra.length);return ra[F]??"░"}function oa(I){let _=Cr(I);return _*_*_*(_*(_*6-15)+10)}function _f(I){if(I.length===0)return"";let _=[],O=!1,F="";for(let J of I){let K=`${J.red};${J.green};${J.blue}`;if(J.bold!==O)_.push(J.bold?"\x1B[1m":"\x1B[22m"),O=J.bold;if(K!==F)_.push(`\x1B[38;2;${K}m`),F=K;_.push(J.character)}return`${_.join("")}\x1B[22m\x1B[39m`}function Tf(I,_,O,F,J){return I.map((K,ne)=>({...Do(O,F+_+ne/J),bold:!1,character:K}))}function $f(I,_,O,F,J,K,ne,oe){let ue=Math.max(1,F*0.75),pe=Math.min(1,O/ue),we=J*oa(pe),xe=Math.max(0,(O-ue)/Math.max(1,F-ue)),Se=(1-oa(O/F))*oe*2,Pe=0.35*Math.max(0,1-xe*2),Ce=pe>=1,qe=Math.min(I.length,Math.ceil(we+2+1));return I.slice(0,qe).map((Fe,en)=>{let on=Do(K,ne+_+en/oe+Se),sn=en+la(_,en,7919)*2-1;if(sn>we+2)return{...on,bold:!1,character:" "};let an=we-sn,rn=0.8*Math.exp(-(an*an)/12.5),fn=Math.min(0.9,rn+Pe),On=!Ce&&sn>we-4;return{...Af(on,fn),bold:fn>0.3,character:On?If(_,en,O):Fe}})}function ia(I){return`\x1B[?2026h${I.map((_,O)=>`\x1B8${O>0?sa(O):""}${_f(_)}`).join("")}\x1B[?2026l`}async function Lo(I,_={}){if(!I)return;let O=_.output??process.stdout,F=_.sleep??Rf,J=_.seed??0,K=I.split(`
`).map((we)=>Array.from(we)),ne=Math.max(...K.map((we)=>we.length)),oe=12000*K.filter((we)=>we.length>0).length/40,ue=ne>0?Math.max(1,Math.ceil(oe/16.666666666666668)):0,pe=ue>0?oe/ue:0;O.write(`\x1B[?25l${K.length>1?`${`
`.repeat(K.length-1)}${Sf(K.length-1)}`:""}\x1B7`);try{for(let we=1;we<=ue;we+=1){if(_.signal?.aborted)break;O.write(ia(K.map((xe,Se)=>$f(xe,Se,we,ue,ne,0.1,J,3)))),await Pf(pe,F,_.signal)}}finally{if(O.write(ia(K.map((we,xe)=>Tf(we,xe,0.1,J,3)))),O.write("\x1B8"),K.length>1)O.write(sa(K.length-1));O.write(`
\x1B[0m\x1B[?25h`)}}var ca=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function Of(I){return Boolean(I.isTTY)}async function Mt(I={}){let _=I.output??process.stdout;if(!Of(_))return;let O=I.input??process.stdin,F={output:_,seed:I.seed??Math.random()*8192,sleep:I.sleep};if(!O.isTTY||typeof O.setRawMode!=="function"){await Lo(ca,F);return}let J=new AbortController,K=O.readableFlowing===!0,ne=O.isRaw===!0,oe=!1,ue=(pe,we)=>{if(we.ctrl&&we.name==="c")oe=!0;if(oe||we.name==="return"||we.name==="enter")J.abort()};da.emitKeypressEvents(O),O.on("keypress",ue),O.setRawMode(!0),O.resume();try{await Lo(ca,{...F,signal:J.signal})}finally{if(O.off("keypress",ue),O.setRawMode(ne),!K)O.pause()}if(!oe)return;if(I.onInterrupt){I.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as Ff}from"node:crypto";import{existsSync as fa}from"node:fs";import{dirname as Sr,join as ma}from"node:path";import{dirname as ua,join as Df,resolve as Lf}from"node:path";var Nf="rule.lock";function jf(I){return Df(ua(I),Nf)}function pa(I={}){return Lf(I.cwd??process.cwd(),".safety-net.json")}function kn(I,_){let O=_.global?_.userConfigPath??H(I,_):_.projectConfigPath??G(_.cwd??process.cwd()),F=_.global?Je(I,_):Ye(O,_.cwd??process.cwd()),J=jf(O);return{configDir:ua(O),configPath:O,lockPath:J,filesystemScope:F,configTarget:i(F,O),lockTarget:i(F,J)}}var Hf="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Mf="cache",Uf="rulebooks";function ga(I,_={}){let O=kn(I,_),F=i(O.filesystemScope,ya(O.configDir)),J=r(O.lockTarget);if(console.log(Hf),J===null&&!fa(F.path))return console.log(`No v2 lock or cache leftovers found in ${Sr(O.configDir)}; nothing to migrate.`),0;let K=Jf(J),ne=m(O.configTarget);if(!ne.config&&(r(O.configTarget)!==null||K.size>0))return console.error(`Cannot migrate: the rules config in ${Sr(O.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let oe=ne.config?.rules??[];for(let ue of oe.flatMap((pe)=>Gf(pe,K,O,F,_.global===!0)))console.log(ue);return U(O.lockTarget),st(F),console.log(`Removed the v2 lock and cache under ${Sr(O.configDir)}.`),0}function ha(I,_){return[...new Set([{cwd:_},{cwd:_,global:!0}].flatMap((O)=>{let F=kn(I,O);return[F.lockPath,ya(F.configDir)]}))].filter((O)=>fa(O))}function Gf(I,_,O,F,J){if(!S(I))return[];let K=D(I).name,ne=i(O.filesystemScope,N(O.configDir,K)),oe=r(ne);if(oe!==null&&Bf(oe,K))return[];let ue=_.get(I),pe=ue?qf(ue,K,F.path,O.filesystemScope):null;if(pe===null)return[`Could not migrate ${I} from the v2 cache. Run \`cc-safety-net rule update ${I}${J?" --global":""}\` to vendor it.`];if(g(ne,pe),oe!==null)return[`Restored ${I} from the v2 cache over an invalid file.`];return[`Vendored ${I} from the v2 cache.`]}function Bf(I,_){let O=be(I);return!("problem"in O)&&O.rulebook.name===_}function qf(I,_,O,F){let J=ma(O,Uf,`${Vf(I)}--${I.digest.replace("sha256:","").slice(0,12)}`,me),K=r(i(F,J));if(K===null||Wf(K)!==I.digest)return null;let ne=be(K);if("problem"in ne||ne.rulebook.name!==_)return null;return K}function ya(I){return ma(Sr(I),Mf)}function Vf(I){return([I.owner,I.repo,I.display_ref,I.name].every((F)=>typeof F==="string"&&F!=="")?`${I.owner}/${I.repo}#${I.display_ref}/${I.name}`:I.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Jf(I){let _=I===null?null:Kf(I),O=va(_)&&Array.isArray(_.rulebooks)?_.rulebooks:[];return new Map(O.filter(zf).map((F)=>[F.spec,F]))}function zf(I){return va(I)&&typeof I.spec==="string"&&typeof I.digest==="string"}function va(I){return!!I&&typeof I==="object"}function Kf(I){try{return JSON.parse(I)}catch{return null}}function Wf(I){return`sha256:${Ff("sha256").update(I).digest("hex")}`}var ba="\r\x1B[2K",Yf="\x1B[?25l",Zf="\x1B[39m",Xf="\x1B[?25h",Qf=100,em=0.55,nm=80,wa=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function tm(I){return new Promise((_)=>setTimeout(_,I))}async function Rr(I,_={}){let O=_.output??process.stdout;if(!O.isTTY)return I;let F=_.sleep??tm,J=!1,K=I.then((oe)=>(J=!0,oe),(oe)=>{throw J=!0,oe});if(await Promise.race([K.then(()=>!0),F(Qf).then(()=>!1)]))return K;O.write(Yf);try{for(let oe=0;!J;oe+=1)O.write(`${ba}${aa(oe*em)}${wa[oe%wa.length]}${Zf} ${_.loadingMessage??"Loading…"}`),await Promise.race([K,F(nm)]);return await K}finally{O.write(`${ba}${Xf}`)}}async function Ut(I,_,O,F={}){let J=_();if(I)await O();if(I&&J.ready)await Rr(J.ready,F);return J.finish()}import{stripVTControlCharacters as rm}from"node:util";var Pr="amp plugins list",om=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function ka(I){if(!I.ampPluginListOutput)return{platform:"amp",status:"n/a"};let _=rm(I.ampPluginListOutput).split(`
`).map((O)=>om.exec(O)?.[1]).find((O)=>O!==void 0);if(!_)return{platform:"amp",status:"n/a"};if(_!=="active")return{platform:"amp",status:"disabled",method:Pr,configPath:Pr,errors:[`Amp personal plugin cc-safety-net is ${_}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:Pr,configPath:Pr}}import{existsSync as cm,readFileSync as dm}from"node:fs";import{isAbsolute as Gx,join as lm}from"node:path";function Gt(I){return lm(I,".gemini","config","hooks.json")}var um=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function pm(I){if(!I||typeof I!=="object"||Array.isArray(I))return[];return Object.values(I).flatMap((_)=>{if(!_||typeof _!=="object"||Array.isArray(_))return[];let O=_,F=O.PreToolUse;if(!Array.isArray(F))return[];return F.flatMap((J)=>{if(!J||typeof J!=="object"||Array.isArray(J))return[];let K=J.hooks;if(!Array.isArray(K))return[];return K.flatMap((ne)=>{if(!ne||typeof ne!=="object"||Array.isArray(ne))return[];let oe=ne.command;if(typeof oe!=="string"||!um.test(oe))return[];return[{command:oe,enabled:O.enabled!==!1}]})})})}function xa(I){let _=Gt(I.environment.home);if(!cm(_))return{platform:"antigravity-cli",status:"n/a",configPath:_};let O;try{O=pm(JSON.parse(dm(_,"utf-8")))}catch(F){return{platform:"antigravity-cli",status:"n/a",configPath:_,errors:[`Failed to parse Antigravity hooks config ${_}: ${F instanceof Error?F.message:String(F)}`]}}if(O.some((F)=>F.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:_};if(O.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:_};return{platform:"antigravity-cli",status:"n/a",configPath:_}}import{join as jo}from"node:path";import{existsSync as fm,lstatSync as mm,readFileSync as gm}from"node:fs";import{join as hm}from"node:path";function Rn(I,_=(O)=>O){if(!fm(I))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(_(gm(I,"utf-8")))}}catch{return{kind:"unreadable"}}}function Nn(I,_){if(I==="~")return _;if(I.startsWith("~/")||I.startsWith("~\\"))return hm(_,I.slice(2));return I}function dn(I){try{return mm(I)}catch{return}}function Er(I,_){let O=dn(_);if(!O)return{platform:I,status:"n/a",configPath:_};if(!O.isSymbolicLink()&&O.isDirectory())return;return{platform:I,status:"n/a",configPath:_,errors:[`${_} is a symlink or not a directory; move or remove it before installing`]}}function tn(I,_){return typeof I==="object"&&I!==null?I[_]:void 0}var No="cc-safety-net@cc-marketplace";function Ar(I){return I.env.get("CLAUDE_CONFIG_DIR")||jo(I.home,".claude")}function Ca(I){return jo(Ar(I),"plugins","installed_plugins.json")}function Sa(I,_){let O=tn(tn(I,"plugins"),_);return Array.isArray(O)&&O.length>0}function Ir(I,_){let O=Rn(Ca(I));return O.kind==="ok"&&Sa(O.value,_)}function Fo(I){let _=Ca(I),O=Rn(_);if(O.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(O.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!Sa(O.value,No))return{platform:"claude-code",status:"n/a"};let F=jo(Ar(I),"settings.json"),J=Rn(F);if(J.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(J.kind==="ok"&&tn(tn(J.value,"enabledPlugins"),No)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:F,errors:[`${No} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:_}}function Ra(I){return Fo(I.environment)}var Pa="Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it.";function Ea(I){if(!I.codexPluginListOutput)return{platform:"codex",status:"n/a"};let _=I.codexPluginListOutput.split(`
`).find((O)=>O.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!_)return{platform:"codex",status:"n/a"};if(!_.includes("installed,"))return{platform:"codex",status:"n/a"};if(!_.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex runs only trusted hooks, and doctor cannot check trust. Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."]}}import{existsSync as Or,readdirSync as ym,readFileSync as vm}from"node:fs";import{join as bn}from"node:path";function vn(I){let _="",O=0,F=!1,J=!1,K=-1;while(O<I.length){let ne=I[O],oe=I[O+1];if(J){_+=ne,J=!1,O++;continue}if(ne==='"'&&!F){F=!0,K=-1,_+=ne,O++;continue}if(ne==='"'&&F){F=!1,_+=ne,O++;continue}if(ne==="\\"&&F){J=!0,_+=ne,O++;continue}if(F){_+=ne,O++;continue}if(ne==="/"&&oe==="/"){while(O<I.length&&I[O]!==`
`)O++;continue}if(ne==="/"&&oe==="*"){O+=2;while(O<I.length-1){if(I[O]==="*"&&I[O+1]==="/"){O+=2;break}O++}continue}if(ne===","){K=_.length,_+=ne,O++;continue}if(ne==="}"||ne==="]"){if(K!==-1){let ue=_.slice(K+1);if(/^\s*$/.test(ue))_=_.slice(0,K)+ue}K=-1,_+=ne,O++;continue}if(!/\s/.test(ne))K=-1;_+=ne,O++}return _}function Ia(I,_,O){let F=_+1,J=!1;while(F<I.length){if(J){J=!1,F++;continue}if(I[F]==="\\"){J=!0,F++;continue}if(I[F]==='"')return F+1;F++}throw Error(O)}function Mo(I,_,O){let F=I[_],J=F==="["?"]":"}",K=0,ne=_;while(ne<I.length){let oe=O.skipComment?.(I,ne)??ne;if(oe!==ne){ne=oe;continue}if(I[ne]==='"'){ne=Ia(I,ne,O.stringError);continue}if(I[ne]===F)K++;if(I[ne]===J){if(K--,K===0)return ne}ne++}throw Error(O.bracketError)}function _a(I,_){let O=I.lastIndexOf(`
`,_)+1;return/^[ \t]*/.exec(I.slice(O))?.[0]??""}function Ta(I,_){let O=_.end+(/^\s*/.exec(I.slice(_.end))?.[0].length??0);if(I[O]===","){let ne=I[O+1]===`
`?O+2:O+1;return`${I.slice(0,_.start)}${I.slice(ne)}`}let F=I.slice(0,_.start).search(/\s*$/)-1;if(I[F]!==",")return`${I.slice(0,_.start)}${I.slice(_.end)}`;let J=I.lastIndexOf(`
`,F-1),K=J!==-1&&/^\s*$/.test(I.slice(J+1,F))?J:F;return`${I.slice(0,K)}${I.slice(_.end)}`}function Ho(I,_){if(I.startsWith("//",_)){let O=I.indexOf(`
`,_+2);return O===-1?I.length:O+1}if(I.startsWith("/*",_)){let O=I.indexOf("*/",_+2);return O===-1?I.length:O+2}return _}function Aa(I,_){let O=_;while(O<I.length){if(/\s/.test(I[O]??"")){O++;continue}let F=Ho(I,O);if(F===O)return O;O=F}return O}function $a(I,_,O){let F=0,J=0;while(J<I.length){let K=Ho(I,J);if(K!==J){J=K;continue}if(I[J]==='"'){let ne=Ia(I,J,O.stringError);if(F===1&&JSON.parse(I.slice(J,ne))===_){let oe=Aa(I,ne),ue=Aa(I,oe+1);if(I[oe]===":"&&I[ue]==="[")return{start:ue,end:Mo(I,ue,{skipComment:Ho,...O})}}J=ne;continue}if(I[J]==="{"||I[J]==="[")F++;if(I[J]==="}"||I[J]==="]")F--;J++}return}var In="cc-safety-net@cc-marketplace",_r=["cc-marketplace","cc-safety-net"],Oa=["_direct","copilot-safety-net"],Da=["cc-marketplace","safety-net"],La="safety-net@cc-marketplace";function Tr(I,_){let O=_.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${O}([^a-z0-9-]|$)`,"m").test(I??"")}function Na(I){return Tr(I,"cc-safety-net@cc-marketplace")}function ja(I){return Tr(I,"cc-marketplace")}function Fa(I){return Tr(I,"copilot-safety-net")}function Ha(I){return Tr(I,"safety-net@cc-marketplace")}function $r(I){if(!I?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(I)}function Ua(I,_){if(!I)return null;let O=I.match(/(\d+)\.(\d+)\.(\d+)/);if(!O)return null;let F=[Number(O[1]),Number(O[2]),Number(O[3])];for(let J=0;J<_.length;J++){let K=F[J]??0,ne=_[J]??0;if(K!==ne)return K>ne}return!0}function bm(I){return Ua(I,[0,0,422])}function wm(I){return Ua(I,[1,0,8])}function qt(I){return I.env.get("COPILOT_HOME")||bn(I.home,".copilot")}function Uo(I){return(I.hooks?.preToolUse??[]).some((O)=>{if(O.type!==void 0&&O.type!=="command")return!1;return $r(O.command)||$r(O.bash)||$r(O.powershell)||$r(O.exec&&[O.exec,...O.args??[]].join(" "))})}function Bt(I){return I===void 0||typeof I==="string"}function km(I){return I===void 0||Array.isArray(I)&&I.every((_)=>typeof _==="string")}function xm(I){if(!I||typeof I!=="object"||Array.isArray(I))return!1;let _=I;if(_.disableAllHooks!==void 0&&typeof _.disableAllHooks!=="boolean")return!1;if(_.hooks===void 0)return!0;if(!_.hooks||typeof _.hooks!=="object"||Array.isArray(_.hooks))return!1;let O=_.hooks.preToolUse;if(O===void 0)return!0;return Array.isArray(O)&&O.every((F)=>F!==null&&typeof F==="object"&&!Array.isArray(F)&&Bt(F.type)&&Bt(F.command)&&Bt(F.bash)&&Bt(F.powershell)&&Bt(F.exec)&&km(F.args))}function Go(I,_){try{let O=JSON.parse(vn(vm(I,"utf-8")));if(!xm(O)){_?.push(`Invalid hook config ${I}: hooks.preToolUse must be an array of hook objects`);return}return O}catch(O){_?.push(`Failed to parse ${I}: ${O instanceof Error?O.message:String(O)}`);return}}function Ga(I,_){try{return ym(I).filter((O)=>O.endsWith(".json")).sort((O,F)=>O.localeCompare(F))}catch(O){return _?.push(`Failed to read ${I}: ${O instanceof Error?O.message:String(O)}`),[]}}function Cm(I,_){if(!Or(I))return[];let O=[];for(let F of Ga(I,_)){let J=bn(I,F),K=Go(J,_);if(K&&Uo(K))O.push(J)}return O}function Pt(I,_){if(!Or(I))return;let O=Go(I,_);if(!O)return;return{path:I,config:O}}function Ma(I,_,O,F){if(_){I.push(`GitHub Copilot CLI ${_} does not support ${O}; requires ${F}+`);return}I.push(`GitHub Copilot CLI version unavailable; skipping ${O} because it requires ${F}+`)}function Sm(I){for(let _ of I){if(_?.config.disableAllHooks===!0)return _.path;if(_?.config.disableAllHooks===!1)return}return}function Rm(I,_,O,F){let J=qt(I),K=bn(_,".github","hooks"),ne=bn(J,"hooks"),oe=bn(_,".github","copilot"),ue=bn(_,".claude"),pe=wm(O),we=pe===!0?F:void 0,xe=[Pt(bn(oe,"settings.local.json"),we),Pt(bn(oe,"settings.json"),we),Pt(bn(ue,"settings.local.json"),we),Pt(bn(ue,"settings.json"),we)],Se=[Pt(bn(J,"settings.json"),we),Pt(bn(J,"config.json"),we)];if(pe!==!1){let an=Sm([...xe,...Se]);if(an){if(pe===null)F.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${an} as active`);return{activeConfigPaths:[],repoInlineSources:xe,disabledBy:an}}}let Pe=Cm(K,F),Ce=bm(O),qe=Ce===!0?F:void 0,Fe=Or(ne)?Ga(ne,qe):[],en=[];for(let an of Fe){let rn=bn(ne,an),fn=Go(rn,qe);if(fn&&Uo(fn))en.push(rn)}if(Ce!==!0&&en.length>0)Ma(F,O,`user hook files in ${ne}`,"0.0.422"),en.length=0;let on=[];for(let an of[...xe,...Se]){if(!an)continue;if(!Uo(an.config))continue;if(pe===!0){on.push(an);continue}Ma(F,O,"inline hook definitions in Copilot config files","1.0.8");break}let sn=(an)=>an.filter((rn)=>!!rn&&on.includes(rn)).map((rn)=>rn.path);return{activeConfigPaths:[...sn(xe),...Pe,...sn(Se),...en],repoInlineSources:xe}}function Ba(I){let _=[],O=Rm(I.environment,I.cwd,I.copilotCliVersion,_);if(O.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:O.disabledBy,configPaths:[O.disabledBy],errors:_.length>0?_:void 0};let F=qt(I.environment),J=bn(F,"installed-plugins",..._r),K=Or(J),ne=bn(F,"settings.json"),oe=Rn(ne,vn),ue=(Pe)=>tn(tn(Pe,"enabledPlugins"),In),pe=O.repoInlineSources.find((Pe)=>typeof ue(Pe?.config)==="boolean"),we=pe??(oe.kind==="ok"?{path:ne,config:oe.value}:void 0);if(K&&!pe&&oe.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};let xe=K&&we!==void 0&&ue(we.config)===!1;if(xe&&O.activeConfigPaths.length===0)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:we.path,errors:[`${In} is installed but not enabled in Copilot CLI`]};let Se=K&&!xe;if(Se||O.activeConfigPaths.length>0){let Pe=O.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:Se?"plugin config":"hook config",configPath:Pe??(Se?J:void 0),configPaths:O.activeConfigPaths.length>0?O.activeConfigPaths:void 0,errors:_.length>0?_:void 0}}return{platform:"copilot-cli",status:"n/a",errors:_.length>0?_:void 0}}import{existsSync as jm,readFileSync as Fm}from"node:fs";import{existsSync as qa,mkdirSync as _m,readFileSync as Tm}from"node:fs";import{dirname as $m,join as Om}from"node:path";import{existsSync as Pm,renameSync as Em,statSync as Am,writeFileSync as Im}from"node:fs";function cn(I,_){let O=`${I}.${process.pid}.tmp`;Im(O,_,Pm(I)?{mode:Am(I).mode&511}:{}),Em(O,I)}var xn=Object.fromEntries(Ht.map((I)=>[I.id,`npx -y cc-safety-net hook ${I.flags[1]}`]));var Vt=xn.cursor,Va=30;function Lr(I){return Om(I.home,".cursor","hooks.json")}function Yn(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function Bo(){return{command:Vt,timeout:Va,failClosed:!0}}function Dr(I){return Yn(I)&&I.command===Vt}function Dm(I){return Object.keys(I).length===3&&I.command===Vt&&I.timeout===Va&&I.failClosed===!0}function Lm(I){try{return JSON.parse(Tm(I,"utf-8"))}catch(_){if(_ instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${I}: ${_.message}`);throw _}}function Ja(I){let _=Lm(I);if(!Yn(_))throw Error(`Cursor hooks config ${I} must be a JSON object`);if(_.version!==1)throw Error(`Cursor hooks config ${I} must set "version": 1`);if(_.hooks!==void 0&&!Yn(_.hooks))throw Error(`Cursor hooks config ${I} "hooks" must be an object`);let O=Yn(_.hooks)?_.hooks.preToolUse:void 0;if(O!==void 0&&!Array.isArray(O))throw Error(`Cursor hooks config ${I} "hooks.preToolUse" must be an array`);return _}function za(I){let _=Yn(I.hooks)?I.hooks.preToolUse:void 0;return Array.isArray(_)?_:[]}function Nm(I){if(!I.some(Dr))return[...I,Bo()];return I.reduce((_,O)=>{if(!Dr(O))return _.result.push(O),_;if(!_.inserted)_.result.push(Bo()),_.inserted=!0;return _},{result:[],inserted:!1}).result}function Ka(I,_,O){let F=Yn(_.hooks)?_.hooks:{},J={..._,hooks:{...F,preToolUse:O}};cn(I,`${JSON.stringify(J,null,2)}
`)}function Wa(I){let _=Lr(I);if(!qa(_))return _m($m(_),{recursive:!0}),cn(_,`${JSON.stringify({version:1,hooks:{preToolUse:[Bo()]}},null,2)}
`),{path:_,alreadyInstalled:!1};let O=Ja(_),F=za(O),J=F.filter(Dr);if(Yn(O.hooks)&&Array.isArray(O.hooks.preToolUse)&&J.length===1&&J[0]!==void 0&&Dm(J[0]))return{path:_,alreadyInstalled:!0};return Ka(_,O,Nm(F)),{path:_,alreadyInstalled:!1}}function Ya(I){let _=Lr(I);if(!qa(_))return{path:_,alreadyInstalled:!1};let O=Ja(_),F=za(O),J=F.filter((K)=>!Dr(K));if(J.length===F.length)return{path:_,alreadyInstalled:!1};return Ka(_,O,J),{path:_,alreadyInstalled:!0}}function Hm(I){if(!I||typeof I!=="object"||Array.isArray(I))return[];let _=I.hooks;if(!_||typeof _!=="object"||Array.isArray(_))return[];let O=_.preToolUse;if(!Array.isArray(O))return[];return O.filter((F)=>!!F&&typeof F==="object"&&!Array.isArray(F)&&F.command===Vt)}function Mm(I){let _=[];if(I.length>1)_.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let O=I[0];if(O&&O.failClosed!==!0)_.push('Managed hook is missing "failClosed": true; reinstall to repair');if(O&&O.timeout!==30)_.push('Managed hook "timeout" is not 30; reinstall to repair');return _}function Za(I){let _=Lr(I.environment);if(!jm(_))return{platform:"cursor",status:"n/a",configPath:_};let O;try{O=JSON.parse(Fm(_,"utf-8"))}catch(K){return{platform:"cursor",status:"n/a",configPath:_,errors:[`Failed to parse Cursor hooks config ${_}: ${K instanceof Error?K.message:String(K)}`]}}let F=Hm(O);if(F.length===0)return{platform:"cursor",status:"n/a",configPath:_};let J=Mm(F);return{platform:"cursor",status:"configured",method:"hook config",configPath:_,errors:J.length>0?J:void 0}}import{readdirSync as Um}from"node:fs";import{join as qo,resolve as Gm}from"node:path";var Vo="cc-safety-net";function Jo(I){let _=I.env.get("DSH_HOME");return qo(_?.trim()?Gm(Nn(_,I.home)):qo(I.home,".dsh"),"profiles")}function Xa(I){let _=Jo(I),O=dn(_)?.isDirectory()?Um(_,{withFileTypes:!0}).filter((J)=>J.isDirectory()&&J.name!=="node_modules").map((J)=>{let K=qo(_,J.name,"package.json");return{name:J.name,configPath:K,manifest:Rn(K)}}):[];return{installed:O.flatMap((J)=>{if(J.manifest.kind!=="ok")return[];let K=J.manifest.value;if(tn(tn(K,"dependencies"),Vo)===void 0)return[];let ne=tn(tn(tn(K,"dsh"),"profile"),"bundles");return[{name:J.name,configPath:J.configPath,enabled:Array.isArray(ne)&&ne.includes(Vo)}]}),unreadable:O.some((J)=>J.manifest.kind==="unreadable")}}function zo(I){return Xa(I).installed}function Qa(I){let _=Xa(I.environment),O=_.installed.filter((K)=>K.enabled),F=_.installed.filter((K)=>!K.enabled),J=F.map((K)=>`${Vo} is installed in the ${K.name} profile but its bundle is disabled`);if(O.length>0)return{platform:"deepseek-harness",status:"configured",method:"dsh bundle",configPaths:O.map((K)=>K.configPath),...J.length>0?{errors:J}:{}};if(F.length>0)return{platform:"deepseek-harness",status:"disabled",method:"dsh bundle",configPaths:F.map((K)=>K.configPath),errors:J};return _.unreadable?{platform:"deepseek-harness",status:"not-inspected"}:{platform:"deepseek-harness",status:"n/a"}}import{existsSync as Km}from"node:fs";import{existsSync as tl,mkdirSync as Bm,readFileSync as qm}from"node:fs";import{dirname as Vm,join as Yo}from"node:path";function Ko(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function Wo(I,_){return Ko(I)&&I.command===_}function el(I,_){return Ko(I)&&Array.isArray(I.hooks)&&I.hooks.some((O)=>Wo(O,_))}function Zn(I,_){return{hooks:[{type:"command",command:I,timeout:_}]}}function jn(I,_){return I.flatMap((O)=>{if(!Ko(O)||!Array.isArray(O.hooks))return[O];let F=O.hooks.filter((J)=>!Wo(J,_));if(F.length===O.hooks.length)return[O];return F.length===0?[]:[{...O,hooks:F}]})}function Et(I,_,O){let F=I.filter((J)=>el(J,_));return F.length===1&&JSON.stringify(F[0])===JSON.stringify(Zn(_,O))}function At(I,_){return I.find((O)=>el(O,_))}function It(I,_,O){let F=Array.isArray(I.hooks)?I.hooks.find((J)=>Wo(J,_)):void 0;return[...I.matcher===void 0||I.matcher===""||I.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...F?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...F?.timeout===O?[]:[`Managed hook "timeout" is not ${O}; reinstall to repair`]]}var Xn=xn.devin,Nr=30,Jm={config:{},hooks:{},preToolUse:[]};function jr(I,_=process.platform){let O=_==="win32"?I.env.get("APPDATA")||Yo(I.home,"AppData","Roaming"):I.env.get("XDG_CONFIG_HOME")||Yo(I.home,".config");return Yo(O,"devin","config.json")}function nl(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function zm(I){try{return{ok:!0,value:JSON.parse(vn(qm(I,"utf-8")))}}catch(_){return{ok:!1,message:_ instanceof Error?_.message:String(_)}}}function Zo(I){let _=zm(I);if(!_.ok)return`Failed to parse Devin CLI config ${I}: ${_.message}`;let O=_.value;if(!nl(O))return`Devin CLI config ${I} must be a JSON object`;let F=O.hooks===void 0?{}:O.hooks;if(!nl(F))return`Devin CLI config ${I} "hooks" must be an object`;let J=F.PreToolUse===void 0?[]:F.PreToolUse;if(!Array.isArray(J))return`Devin CLI config ${I} "hooks.PreToolUse" must be an array`;return{config:O,hooks:F,preToolUse:J}}function rl(I){let _=Zo(I);if(typeof _==="string")throw Error(_);return _}function ol(I,_,O){let F={..._.config,hooks:{..._.hooks,PreToolUse:O}};cn(I,`${JSON.stringify(F,null,2)}
`)}function il(I){let _=jr(I),O=tl(_)?rl(_):Jm;if(Et(O.preToolUse,Xn,Nr))return{path:_,alreadyInstalled:!0};return Bm(Vm(_),{recursive:!0}),ol(_,O,[...jn(O.preToolUse,Xn),Zn(Xn,Nr)]),{path:_,alreadyInstalled:!1}}function sl(I){let _=jr(I);if(!tl(_))return{path:_,alreadyInstalled:!1};let O=rl(_),F=jn(O.preToolUse,Xn);if(JSON.stringify(F)===JSON.stringify(O.preToolUse))return{path:_,alreadyInstalled:!1};return ol(_,O,F),{path:_,alreadyInstalled:!0}}function al(I){let _=jr(I.environment);if(!Km(_))return{platform:"devin",status:"n/a",configPath:_};let O=Zo(_);if(typeof O==="string")return{platform:"devin",status:"n/a",configPath:_,errors:[O]};let F=At(O.preToolUse,Xn);if(!F)return{platform:"devin",status:"n/a",configPath:_};let J=It(F,Xn,Nr);return{platform:"devin",status:"configured",method:"hook config",configPath:_,errors:J.length>0?J:void 0}}import{existsSync as eg,readFileSync as ng}from"node:fs";import{existsSync as Fr,mkdirSync as Wm,readFileSync as Ym,rmSync as Zm}from"node:fs";import{dirname as Xm,join as ll}from"node:path";var Qn=xn.droid,Hr=30;function Mr(I){return ll(I.home,".factory","hooks.json")}function cl(I){return ll(I.home,".factory","settings.json")}function Xo(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function dl(I){try{return JSON.parse(Ym(I,"utf-8"))}catch(_){if(_ instanceof SyntaxError)throw Error(`Failed to parse Factory Droid hooks config ${I}: ${_.message}`);throw _}}function ul(I){let _=dl(I);if(!Xo(_))throw Error(`Factory Droid hooks config ${I} must be a JSON object`);if(_.PreToolUse===void 0||Array.isArray(_.PreToolUse))return _;throw Error(`Factory Droid hooks config ${I} "PreToolUse" must be an array`)}function Qm(I){if(!Fr(I))return{};let _=dl(I);return Xo(_)&&Xo(_.hooks)?_.hooks:{}}function pl(I){return Array.isArray(I.PreToolUse)?I.PreToolUse:[]}function fl(I,_,O){cn(I,`${JSON.stringify({..._,PreToolUse:O},null,2)}
`)}function ml(I){let _=Mr(I),O=Fr(_),F=O?ul(_):Qm(cl(I)),J=pl(F);if(O&&Et(J,Qn,Hr))return{path:_,alreadyInstalled:!0};return Wm(Xm(_),{recursive:!0}),fl(_,F,[...jn(J,Qn),Zn(Qn,Hr)]),{path:_,alreadyInstalled:!1}}function gl(I){let _=Mr(I);if(!Fr(_))return{path:_,alreadyInstalled:!1};let O=ul(_),F=pl(O),J=jn(F,Qn);if(JSON.stringify(J)===JSON.stringify(F))return{path:_,alreadyInstalled:!1};let K=Fr(cl(I));if(J.length===0&&Object.keys(O).length===1&&!K)return Zm(_),{path:_,alreadyInstalled:!0};return fl(_,O,J),{path:_,alreadyInstalled:!0}}function hl(I){let _=Mr(I.environment);if(!eg(_))return{platform:"droid",status:"n/a",configPath:_};let O;try{O=JSON.parse(ng(_,"utf-8"))}catch(ne){return{platform:"droid",status:"n/a",configPath:_,errors:[`Failed to parse Factory Droid hooks config ${_}: ${ne instanceof Error?ne.message:String(ne)}`]}}let F=typeof O==="object"&&O!==null&&"PreToolUse"in O?O.PreToolUse:void 0,J=At(Array.isArray(F)?F:[],Qn);if(!J)return{platform:"droid",status:"n/a",configPath:_};let K=[...J.commandRegex===void 0||J.commandRegex===""?[]:['Managed hook has a "commandRegex" that narrows coverage; reinstall to repair'],...It(J,Qn,Hr)];return{platform:"droid",status:"configured",method:"hook config",configPath:_,errors:K.length>0?K:void 0}}import{existsSync as tg}from"node:fs";import{join as Qo}from"node:path";var ei="gemini-safety-net";function ni(I){let _=Qo(I.home,".gemini","extensions"),O=Qo(_,ei);if(!tg(O))return{platform:"gemini-cli",status:"n/a"};let F=Qo(_,"extension-enablement.json"),J=Rn(F);if(J.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let K=J.kind==="ok"?tn(tn(J.value,ei),"overrides"):void 0;if(Array.isArray(K)&&K.some((oe)=>typeof oe==="string"&&oe.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:F,errors:[`${ei} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:O}}function yl(I){return ni(I.environment)}import{existsSync as sg,readFileSync as ag}from"node:fs";import{existsSync as bl,mkdirSync as rg,readFileSync as wl,rmSync as og}from"node:fs";import{dirname as ig,join as vl}from"node:path";var rt=xn["grok-build"],Gr=30,ti=Zn(rt,Gr);function Br(I){return vl(I.env.get("GROK_HOME")??vl(I.home,".grok"),"hooks","cc-safety-net.json")}function qr(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function kl(I){try{let _=JSON.parse(I);return qr(_)?_:null}catch{return null}}function xl(I){let _=qr(I.hooks)?I.hooks.PreToolUse:void 0;return Array.isArray(_)?_:[]}function Ur(I,_,O){let F=qr(_.hooks)?_.hooks:{};cn(I,`${JSON.stringify({..._,hooks:{...F,PreToolUse:O}},null,2)}
`)}function Cl(I){let _=Br(I);if(!bl(_))return rg(ig(_),{recursive:!0}),Ur(_,{},[ti]),{path:_,alreadyInstalled:!1};let O=kl(wl(_,"utf-8"));if(!O)return Ur(_,{},[ti]),{path:_,alreadyInstalled:!1};let F=xl(O);if(Et(F,rt,Gr))return{path:_,alreadyInstalled:!0};return Ur(_,O,[...jn(F,rt),ti]),{path:_,alreadyInstalled:!1}}function Sl(I){let _=Br(I);if(!bl(_))return{path:_,alreadyInstalled:!1};let O=kl(wl(_,"utf-8"));if(!O)return{path:_,alreadyInstalled:!1};let F=xl(O),J=jn(F,rt);if(JSON.stringify(J)===JSON.stringify(F))return{path:_,alreadyInstalled:!1};let K=qr(O.hooks)?O.hooks:{};if(J.length===0&&Object.keys(O).length===1&&Object.keys(K).length===1)return og(_),{path:_,alreadyInstalled:!0};return Ur(_,O,J),{path:_,alreadyInstalled:!0}}function Rl(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}function Pl(I){let _=Br(I.environment);if(!sg(_))return{platform:"grok-build",status:"n/a",configPath:_};let O;try{O=JSON.parse(ag(_,"utf-8"))}catch(ne){return{platform:"grok-build",status:"n/a",configPath:_,errors:[`Failed to parse Grok Build hooks config ${_}: ${ne instanceof Error?ne.message:String(ne)}`]}}let F=Rl(O)&&Rl(O.hooks)?O.hooks.PreToolUse:void 0,J=At(Array.isArray(F)?F:[],rt);if(!J)return{platform:"grok-build",status:"n/a",configPath:_};let K=It(J,rt,Gr);return{platform:"grok-build",status:"configured",method:"hook config",configPath:_,errors:K.length>0?K:void 0}}import{readFileSync as Ll}from"node:fs";import{join as Nl}from"node:path";var Pn="cc-safety-net",ri="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",lg=30;function El(I){return`${ri}
# version: ${I}
`}function cg(I){return`${El(I)}name: ${Pn}
version: "${I}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function dg(I){return`${El(I)}"""CC Safety Net guard for Hermes Agent.

Registers pre_tool_call and forwards the tool call to the packaged CC Safety Net
adapter (cc-safety-net hook --hermes-agent) over JSON stdin. The adapter prints nothing
when the call is allowed and an {"action": "block", ...} directive when it is denied.
Every transport and analysis failure is returned as a block that names its cause.
"""

import json
import os
import shutil
import signal
import subprocess

HOOK_EVENT = "pre_tool_call"
SUPPORTED_TOOLS = ("patch", "read_file", "terminal", "write_file")
ANALYZER = [${xn["hermes-agent"].split(" ").map((_)=>`"${_}"`).join(", ")}]
TIMEOUT_SECONDS = ${lg}


def _block(detail):
    return {"action": "block", "message": "CC Safety Net failed closed: " + detail}


def _terminal_cwd(task_id):
    """Return the directory Hermes will run this terminal command in.

    A \`terminal\` call without \`workdir\` runs in the session's own cwd RECORD, not in the
    Hermes process directory: \`_resolve_command_cwd\` in tools/terminal_tool.py returns
    \`workdir or get_session_cwd(session_key) or default_cwd\`, and that record is rewritten
    after every completed command, so it IS the session's \`cd\` state. The session key is
    derived exactly as terminal_tool derives it: the contextvar when set, the raw task_id
    otherwise. No record yet (first command of a session) means \`default_cwd\`, which the local
    terminal backend reads from \`TERMINAL_CWD\` (\`hermes_cli/config.py\` bridges the configured
    \`terminal.cwd\` into it) and only then falls back to the process directory.
    """
    from tools.approval import get_current_session_key
    from tools.terminal_tool import get_session_cwd

    return (
        get_session_cwd(get_current_session_key(default="") or (task_id or ""))
        or os.environ.get("TERMINAL_CWD")
        or os.getcwd()
    )


def _file_tool_cwd(task_id):
    """Return the directory Hermes resolves this file tool's relative paths against.

    tools/file_tools.py passes \`task_id or "default"\` to \`_resolve_base_dir\`, which walks the
    session's cwd record, the task's cwd override, \`TERMINAL_CWD\`, then the process directory.
    tools.file_tools defines it up to v2026.8.31 and re-exports it from tools.file_tools_paths since.
    """
    from tools.file_tools import _resolve_base_dir

    return str(_resolve_base_dir(task_id or "default"))


def _pre_tool_call(tool_name="", args=None, session_id="", task_id="", **_):
    if tool_name not in SUPPORTED_TOOLS:
        return None

    executable = shutil.which(ANALYZER[0])
    if executable is None:
        return _block(ANALYZER[0] + " was not found on PATH.")

    try:
        cwd = _terminal_cwd(task_id) if tool_name == "terminal" else _file_tool_cwd(task_id)
    except OSError as error:
        return _block("the working directory could not be resolved (%s)." % error)
    except ImportError as error:
        # Without Hermes' own directory lookup we cannot tell which directory the call acts in,
        # and analysing the wrong one clears every path-scoped protection.
        return _block(
            "the Hermes %s directory could not be read (%s). Update cc-safety-net and "
            "reinstall the plugin with: npx -y cc-safety-net install --hermes-agent."
            % ("session" if tool_name == "terminal" else "file tool", error)
        )

    payload = json.dumps(
        {
            "hook_event_name": HOOK_EVENT,
            "tool_name": tool_name,
            "tool_input": args if isinstance(args, dict) else None,
            "session_id": session_id if isinstance(session_id, str) else "",
            "cwd": cwd,
        }
    )

    try:
        if os.name == "nt":
            launch_options = {}
        else:
            launch_options = {"start_new_session": True}
        process = subprocess.Popen(
            [executable] + ANALYZER[1:],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            # Decode explicitly: the analyzer writes UTF-8, and a locale decoder would raise
            # UnicodeDecodeError on output it cannot read. "replace" turns that into unreadable
            # output, which blocks with its cause named.
            encoding="utf-8",
            errors="replace",
            # Resolve the analyzer from a neutral directory: npx prefers a repository-local
            # node_modules/.bin/cc-safety-net, so inheriting Hermes' working directory would
            # let workspace contents stand in for the analyzer. The payload's "cwd" above is
            # still the real Hermes working directory, which the analysis needs.
            cwd=os.path.expanduser("~"),
            # Own process group so the timeout below can kill the whole tree: npx's descendants
            # outlive a kill aimed at npx alone and keep holding the pipes captured here. Windows
            # uses taskkill's process-tree traversal instead because sessions are POSIX-only.
            **launch_options,
        )
    except OSError as error:
        return _block("analysis could not start (%s)." % error)

    try:
        stdout, _ = process.communicate(payload, timeout=TIMEOUT_SECONDS)
    except subprocess.TimeoutExpired:
        try:
            if os.name == "nt":
                system_root = os.environ.get("SystemRoot")
                if not system_root:
                    raise OSError("SystemRoot is unavailable")
                subprocess.run(
                    [
                        os.path.join(system_root, "System32", "taskkill.exe"),
                        "/PID",
                        str(process.pid),
                        "/T",
                        "/F",
                    ],
                    stdin=subprocess.DEVNULL,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    timeout=1,
                    check=False,
                )
            else:
                os.killpg(process.pid, signal.SIGKILL)
        except (OSError, subprocess.SubprocessError):
            pass
        try:
            process.communicate(timeout=1)
        except (OSError, subprocess.SubprocessError):
            pass
        return _block("analysis timed out after %ss." % TIMEOUT_SECONDS)

    if process.returncode != 0:
        return _block("analysis exited with status %s." % process.returncode)

    directive = (stdout or "").strip()
    if not directive:
        return None

    try:
        parsed = json.loads(directive)
    except ValueError:
        return _block("analysis returned unreadable output.")

    if isinstance(parsed, dict) and parsed.get("action") == "block":
        message = parsed.get("message")
        if isinstance(message, str) and message:
            return parsed
    return _block("analysis returned an unexpected directive.")


def register(ctx):
    ctx.register_hook("pre_tool_call", _pre_tool_call)
`}function Jt(I){return[{name:"__init__.py",content:dg(I)},{name:"plugin.yaml",content:cg(I)}]}import{mkdirSync as ug,readdirSync as pg,readFileSync as Al,rmSync as oi}from"node:fs";import{basename as fg,dirname as mg,join as Fn}from"node:path";var gg="__pycache__",hg=/^[a-z0-9][a-z0-9_-]{0,63}$/;function yg(I){try{return Al(I,"utf-8").trim()}catch{return}}function ii(I){let _=I.env.get("HERMES_HOME")?.trim();if(_&&fg(mg(_))==="profiles")return _;let O=_||Fn(I.home,".hermes"),F=Fn(O,"active_profile"),J=yg(F),K=J?.toLowerCase();if(!K||K==="default")return O;if(!hg.test(K))throw Error(`Invalid Hermes profile name "${J}" in ${F}; run \`hermes profile use <name>\` with a valid profile.`);return Fn(O,"profiles",K)}function si(I){return Fn(ii(I),"plugins",Pn)}function ai(I){return I.startsWith(ri)}function li(I,_){let O=si(I),F=dn(O);if(F&&(F.isSymbolicLink()||!F.isDirectory()))throw Error(`Refusing to ${_} ${O}: not a regular directory. Move or remove it and rerun ${_==="install"?"install":"uninstall"} --hermes-agent.`);return O}function Il(I,_){let O=dn(I);if(!O)return;if(O.isSymbolicLink()||!O.isFile())throw Error(`Refusing to ${_} ${I}: not a regular file. Move or remove it.`);let F=Al(I,"utf-8");if(!ai(F))throw Error(`Refusing to ${_} unmanaged file at ${I}. Move or remove it.`);return F}function _l(I){let _=li(I,"install"),O=Jt(pn());if(O.map((J)=>Il(Fn(_,J.name),"overwrite")).every((J,K)=>J===O[K]?.content))return{path:_,alreadyInstalled:!0};return ug(_,{recursive:!0}),O.forEach((J)=>{cn(Fn(_,J.name),J.content)}),{path:_,alreadyInstalled:!1}}function ci(I){let _=li(I,"remove");if(!dn(_))return[];return Jt(pn()).filter((O)=>Il(Fn(_,O.name),"remove")!==void 0)}function Tl(I){let _=li(I,"remove");if(!dn(_))return{path:_,alreadyInstalled:!1};let O=ci(I);if(O.forEach((F)=>{oi(Fn(_,F.name))}),oi(Fn(_,gg),{recursive:!0,force:!0}),pg(_).length===0)oi(_,{recursive:!0});return{path:_,alreadyInstalled:O.length>0}}var zt="hermes-agent",$l=/^([^\s#][^:]*):/,vg=/^\s+([A-Za-z_][\w-]*):/,Ol=/^\s+-\s*(.*)$/;function bg(I){return I.trim().replace(/^(["'])(.*)\1$/,"$2")}function wg(I){let _=I.split(/\r?\n/),O=_.findIndex((K)=>$l.exec(K)?.[1]?.trim()==="plugins");if(O===-1)return[];let F=_.slice(O+1),J=F.findIndex((K)=>$l.test(K));return J===-1?F:F.slice(0,J)}function Dl(I,_){let O=wg(I),F=O.findIndex((ne)=>vg.exec(ne)?.[1]===_);if(F===-1)return[];let J=O.slice(F+1),K=J.findIndex((ne)=>!Ol.test(ne));return(K===-1?J:J.slice(0,K)).map((ne)=>bg(Ol.exec(ne)?.[1]??""))}function kg(I){try{return Ll(Nl(ii(I),"config.yaml"),"utf-8")}catch{return}}function di(I){let _=kg(I)??"";return Dl(_,"enabled").includes(Pn)&&!Dl(_,"disabled").includes(Pn)}function jl(I){return/^# version:\s*(.+)$/m.exec(I)?.[1]?.trim()}function xg(I,_){let O=dn(I);if(!O)return{error:`${_.name} is missing from ${I}; run install --hermes-agent`};if(O.isSymbolicLink()||!O.isFile())return{error:`${I} is a symlink or not a regular file; move or remove it`};try{let F=Ll(I,"utf-8");if(!ai(F))return{error:`Unmanaged ${_.name} occupies ${I}; move or remove it`};if(jl(F)===pn()&&F!==_.content)return{error:`Modified ${_.name} occupies ${I}; run install --hermes-agent to restore it`};return{content:F}}catch(F){return{error:`Failed to read ${I}: ${F instanceof Error?F.message:String(F)}`}}}function Cg(I){try{return{path:si(I)}}catch(_){return{error:_ instanceof Error?_.message:String(_)}}}function Fl(I){let _=Cg(I.environment);if("error"in _)return{platform:zt,status:"n/a",errors:[_.error]};let O=_.path,F=Er(zt,O);if(F)return F;let J=Jt(pn()).map((ue)=>xg(Nl(O,ue.name),ue)),K=J.flatMap((ue)=>("error"in ue)?[ue.error]:[]);if(K.length>0)return{platform:zt,status:"n/a",configPath:O,errors:K};let ne=J.some((ue)=>("content"in ue)&&jl(ue.content)!==pn()),oe=ne?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!di(I.environment))return{platform:zt,status:"disabled",method:"plugin directory",configPath:O,errors:[`${Pn} is not enabled in Hermes; run \`hermes plugins enable ${Pn}\``,...oe]};return{platform:zt,status:"configured",method:"plugin directory",configPath:O,errors:ne?oe:void 0}}import{existsSync as Sg,readFileSync as Rg}from"node:fs";import{join as Hl}from"node:path";var Pg=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/;function Eg(I){return Hl(I.env.get("KIMI_CODE_HOME")||Hl(I.home,".kimi-code"),"config.toml")}function Kt(I){let _=Eg(I.environment);if(!Sg(_))return{platform:"kimi-code",status:"n/a",configPath:_};try{if(!Pg.test(Rg(_,"utf-8")))return{platform:"kimi-code",status:"n/a",configPath:_}}catch(O){return{platform:"kimi-code",status:"n/a",configPath:_,errors:[`Failed to read ${_}: ${O instanceof Error?O.message:String(O)}`]}}return{platform:"kimi-code",status:"configured",method:"hook config",configPath:_}}import{readFileSync as Wl}from"node:fs";import{join as Yt}from"node:path";var un="cc-safety-net",Sn="index.js",_t="openclaw.plugin.json",Tt="package.json";var Vr="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as _g,lstatSync as Tg,readdirSync as $g,readFileSync as Og}from"node:fs";import{dirname as Ul,join as Bn}from"node:path";import{fileURLToPath as Dg}from"node:url";import{spawn as Ag}from"node:child_process";function Ig(I){return I.join(" ")}function ui(I,_,O){return[`Failed to run ${Ig(I)}${_===null?"":` (exit ${_})`}.`,O.trim()].filter(Boolean).join(`
`)}function pi(I){let _={stdout:"",stderr:""};return I.stdout.setEncoding("utf-8"),I.stderr.setEncoding("utf-8"),I.stdout.on("data",(O)=>{_.stdout+=O}),I.stderr.on("data",(O)=>{_.stderr+=O}),_}function yn(I,_){return new Promise((O,F)=>{let J=Wn([...I],process.env),K=Ag(J.cmd,J.args,{stdio:["ignore","pipe","pipe"]}),ne=pi(K),oe=()=>[ne.stdout,ne.stderr].filter(Boolean).join(`
`),ue=_?.timeoutMs??120000,pe=setTimeout(()=>{K.kill(),F(Error(ui(I,null,`Timed out after ${ue}ms.
${oe()}`.trim())))},ue);K.on("error",(we)=>{clearTimeout(pe),F(Error(ui(I,null,`${we.message}
${oe()}`.trim())))}),K.on("close",(we)=>{if(clearTimeout(pe),we!==0){F(Error(ui(I,we,oe())));return}O(_?.stdoutOnly?ne.stdout:oe())})})}async function fi(I){for(let _ of I)await yn(_)}async function Ml(I){for(let _ of I)try{await yn(_)}catch(O){console.warn(O instanceof Error?O.message:String(O))}}var mi=Bn("openclaw",un),it=`run \`openclaw plugins enable ${un}\``,Lg="config reload superseded by a newer runtime config source",Ng=[Sn,_t,Tt];function Gl(I){let _=I.env.get("OPENCLAW_HOME")?.trim();return _?Nn(_,I.home):I.home}function Bl(I){let _=Gl(I),O=I.env.get("OPENCLAW_STATE_DIR")?.trim();if(O)return Nn(O,_);let F=I.env.get("OPENCLAW_CONFIG_PATH")?.trim();return F?Ul(Nn(F,_)):Bn(_,".openclaw")}function ql(I){let _=I.env.get("OPENCLAW_CONFIG_PATH")?.trim();return _?Nn(_,Gl(I)):Bn(Bl(I),"openclaw.json")}function Wt(I){return Bn(Bl(I),"extensions",un)}function jg(I){let _=$g(I);if(_.length===0)return!0;if(_.some((J)=>!Ng.includes(J)))return!1;let O=Bn(I,Sn),F=dn(O);return F!==void 0&&!F.isSymbolicLink()&&F.isFile()&&Og(O,"utf-8").startsWith(Vr)}function gi(I){let _=Wt(I),O=dn(_);if(!O)return;if(!O.isSymbolicLink()&&O.isDirectory()&&jg(_))return;throw Error(`Refusing to modify ${_}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function Vl(){let I=Ul(Dg(import.meta.url));return[Bn(I,mi),Bn(I,"..",mi),Bn(I,"..","..","..","dist",mi)]}function hi(I=Vl()){return I.find((_)=>_g(_)&&Tg(_).isDirectory())}function Fg(I=Vl()){let _=hi(I);if(!_)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return _}function Jl(I=Fg()){return[["openclaw","plugins","install",I,"--force","--accept-capabilities"]]}function Hg(I){let _=(()=>{try{return JSON.parse(I)}catch{return}})(),O=tn(tn(_,"plugin"),"status");return typeof O==="string"?O:void 0}async function Mg(){await yn(["openclaw","plugins","enable",un]).catch((I)=>{if(!(I instanceof Error&&I.message.includes(Lg)))throw I})}async function zl(I){let _=async()=>Hg(await yn(["openclaw","plugins","inspect",un,"--runtime","--json"],{stdoutOnly:!0})),O=await _(),F=O==="disabled"&&I;if(F)await Mg();let J=F?await _():O;if(J==="loaded")return;throw Error(`${J===void 0?`The ${un} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:J==="disabled"?`OpenClaw reports the ${un} plugin with status "disabled"; ${it}.`:`OpenClaw reports the ${un} plugin with status "${J}".`} Run \`openclaw plugins inspect ${un} --runtime\` for details.`)}var Jr="openclaw";function $t(I,_){let O=Yt(I,_),F=dn(O);if(!F)return{error:`${_} is missing from ${O}; run install --openclaw`};if(F.isSymbolicLink()||!F.isFile())return{error:`${O} is a symlink or not a regular file; move or remove it`};try{return{content:Wl(O,"utf-8")}}catch(J){return{error:`Failed to read ${O}: ${J instanceof Error?J.message:String(J)}`}}}function Yl(I){try{return JSON.parse(vn(I))}catch{return}}function Ug(I){let _=$t(I,_t);if("error"in _)return _.error;if(tn(Yl(_.content),"id")===un)return;return`${Yt(I,_t)} is not a valid ${un} manifest; run install --openclaw`}function Gg(I){let _=$t(I,Tt);if("error"in _)return _.error;let O=tn(tn(Yl(_.content),"openclaw"),"extensions");if(Array.isArray(O)&&O.includes(`./${Sn}`))return;return`${Yt(I,Tt)} does not point OpenClaw at ${Sn}; run install --openclaw`}function Kl(I){return Array.isArray(I)?I.filter((_)=>typeof _==="string"):[]}function Bg(I){let _=ql(I);if(!dn(_))return`${un} is not enabled; ${it}`;let O=(()=>{try{return JSON.parse(vn(Wl(_,"utf-8")))}catch{return}})();if(O===void 0)return`Failed to read ${_}; fix it, then ${it}`;let F=tn(O,"plugins");if(tn(F,"enabled")===!1)return`plugins.enabled is false in ${_}; no OpenClaw plugin loads`;let J=tn(tn(tn(F,"entries"),un),"enabled");if(Kl(tn(F,"deny")).includes(un)||J===!1)return`${un} is disabled in ${_}; ${it}`;let K=Kl(tn(F,"allow"));if(K.length>0&&!K.includes(un))return`plugins.allow in ${_} does not list ${un}; add it, then ${it}`;if(K.includes(un)||J===!0)return;return`${un} is not enabled; ${it}`}function Zl(I){return/^\/\/ version:\s*(.+)$/m.exec(I)?.[1]?.trim()}function qg(I,_,O){if(O===void 0)return[];let F=$t(O,Sn);if(!(("content"in F)&&Zl(F.content)===_))return[];return[Sn,_t,Tt].flatMap((K)=>{let ne=$t(I,K),oe=$t(O,K);if("error"in ne||"error"in oe||ne.content===oe.content)return[];return[`Modified ${K} occupies ${Yt(I,K)}; run install --openclaw to restore it`]})}function Xl(I){let _=Wt(I.environment),O=Er(Jr,_);if(O)return O;let F=$t(_,Sn),K=["error"in F?F.error:F.content.startsWith(Vr)?void 0:`Unmanaged ${Sn} occupies ${Yt(_,Sn)}; move or remove it`,Ug(_),Gg(_)].filter((we)=>we!==void 0),ne="content"in F?Zl(F.content):void 0,oe=K.length>0?K:qg(_,ne,hi());if(oe.length>0)return{platform:Jr,status:"n/a",configPath:_,errors:oe};let ue=ne===pn()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],pe=Bg(I.environment);if(pe)return{platform:Jr,status:"disabled",method:"plugin directory",configPath:_,errors:[pe,...ue]};return{platform:Jr,status:"configured",method:"plugin directory",configPath:_,errors:ue.length>0?ue:void 0}}import{existsSync as Qg,readFileSync as eh}from"node:fs";import{basename as nh}from"node:path";import{existsSync as zr,readFileSync as yi,rmSync as Vg}from"node:fs";import{join as _n}from"node:path";import{pathToFileURL as Jg}from"node:url";var Zt="cc-safety-net",pt=`${Zt}@latest`,vi=["opencode.json","opencode.jsonc"],zg=60,Kg=250,Ql="CCSafetyNetPlugin",Wg={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function ec(I){return _n(I.env.get("XDG_CONFIG_HOME")||_n(I.home,".config"),"opencode")}function bi(I){return I.env.get("OPENCODE_CONFIG_DIR")||ec(I)}function wi(I){return vi.map((_)=>_n(bi(I),_))}function ki(I){return[...new Set([bi(I),ec(I)])].flatMap((_)=>vi.map((O)=>_n(_,O)))}function nc(I){return _n(I.env.get("XDG_CACHE_HOME")||_n(I.home,".cache"),"opencode","packages",pt)}function tc(I){Vg(nc(I),{recursive:!0,force:!0})}async function rc(I){let _=(await yn(["opencode","--version"],{stdoutOnly:!0})).trim(),O=/^(?:opencode\s+)?v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(_),F=Number(O?.[1]),J=Number(O?.[2]),K=Number(O?.[3]);if(!O||F!==1&&F!==2||F===1&&(J<18||J===18&&K<29)||F===2&&J===0&&K<6)throw Error(`OpenCode 1.18.29+ or 2.0.6+ is required; found ${_||"an unknown version"}.`);if(F===2){for(let ne of wi(I)){if(!zr(ne))continue;let oe=Ci(yi(ne,"utf-8"),ne);if(["plugin","plugins"].some((pe)=>{let we=tn(oe,pe);return Array.isArray(we)&&we.some((xe)=>Kr(xe)&&(typeof xe==="string"?xe:tn(xe,"package"))!==pt)}))throw Error(`Change the cc-safety-net package spec in ${ne} to ${pt}, preserving its options, then retry. Adding another spec would create a duplicate plugin ID.`)}return{commands:[],afterInstall:async()=>{if((await yn(["opencode","plugin","add",pt],{stdoutOnly:!0})).includes("is already configured in"))await yn(["opencode","plugin","update",pt]);let oe=await sc();if(!/^cc-safety-net\s+\S+\s+cc-safety-net@latest\s*$/m.test(oe))throw Error("OpenCode did not load cc-safety-net from cc-safety-net@latest. Run `opencode plugin list` for details.");let ue=["--param",`location[directory]=${process.cwd()}`];await yn(["opencode","api","integration.list",...ue]);let pe=await yn(["opencode","api","plugin.list",...ue],{stdoutOnly:!0}),we=xi(pe);if(we)throw Error(we);if(!oc(pe).some(ic))throw Error("OpenCode lists no active cc-safety-net for this directory. Run `opencode api plugin.list` for details.")}}}return tc(I),{commands:[["opencode","plugin","-g","-f",pt]],afterInstall:()=>Zg(I)}}function oc(I){return Yg(I).filter((_)=>tn(_,"id")===Zt||Kr(tn(tn(_,"source"),"target"))).map((_)=>tn(_,"state"))}function ic(I){return tn(I,"status")==="active"}function xi(I){let _=oc(I);if(_.some(ic))return;let O=_.find((F)=>tn(F,"status")==="failed");if(!O)return;return`OpenCode reports cc-safety-net failed: ${String(tn(O,"error")).split(`
`)[0]}`}function Yg(I){if(!I)return[];try{let _=tn(JSON.parse(I),"data");return Array.isArray(_)?_:[]}catch{return[]}}async function sc(I=1){let _=await yn(["opencode","plugin","list"],{stdoutOnly:!0});if(/^cc-safety-net\s|\scc-safety-net@latest\s*$/m.test(_)||I===zg)return _;return await new Promise((O)=>setTimeout(O,Kg)),sc(I+1)}async function Zg(I){let _=_n(nc(I),"node_modules",Zt),O=_n(_,"package.json");if(!zr(O))throw Error(`The OpenCode plugin cache at ${_} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${pt}\` for details.`);let F=tn(JSON.parse(yi(O,"utf-8")),"main");if(typeof F!=="string")throw Error(`The cached OpenCode plugin at ${_} declares no "main" entry.`);let J=_n(_,F);if(typeof(await import(Jg(J).href))[Ql]==="function")return;throw Error(`The cached OpenCode plugin at ${J} does not export a callable ${Ql}, so OpenCode would load nothing and fail open.`)}function Ci(I,_){try{return JSON.parse(vn(I))}catch(O){if(O instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${_}: ${O.message}`);throw O}}function Kr(I){let _=typeof I==="string"?I:tn(I,"package");return typeof _==="string"&&(_===Zt||_.startsWith(`${Zt}@`))}function Si(I){return["plugin","plugins"].some((_)=>{let O=tn(I,_);return Array.isArray(O)&&O.some(Kr)})}function Xg(I,_){let F=["plugin","plugins"].flatMap((J)=>{let K=$a(I,J,Wg);if(!K)return[];let ne=[],oe=0,ue=K.start+1,pe=I.slice(K.start+1,K.end).matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|[^"\s{}[\],/]+|[{}[\],]/g);for(let we of pe){if(we[0].startsWith("//")||we[0].startsWith("/*"))continue;let xe=K.start+1+we.index;if(oe===0)ue=xe;if(we[0]==="{"||we[0]==="[")oe++;if(we[0]==="}"||we[0]==="]")oe--;if(oe!==0||we[0]===",")continue;let Se=xe+we[0].length;if(Kr(JSON.parse(vn(I.slice(ue,Se)))))ne.push({start:ue,end:Se})}return ne}).sort((J,K)=>J.start-K.start).reverse().reduce((J,K)=>{let ne=/^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*,/.exec(J.slice(K.end));if(ne?.[0].includes("/")){let oe=K.end+ne[0].length-1;return J.slice(0,K.start)+J.slice(K.end,oe)+J.slice(oe+1)}return Ta(J,K)},I);return Ci(F,_),F}function ac(I){tc(I);let _=ki(I),O=_.find((K)=>zr(K)),F=[],J=[];for(let K of _){if(!zr(K))continue;try{let ne=yi(K,"utf-8");if(!Si(Ci(ne,K)))continue;cn(K,Xg(ne,K)),J.push(K)}catch(ne){F.push(ne instanceof Error?ne.message:String(ne))}}if(F.length>0)throw Error(F.join(`
`));return{path:J[0]??O??_n(bi(I),vi[0]),alreadyInstalled:J.length>0}}function Ot(I){let _=[];for(let O of I.openCodeVersion?.startsWith("2.")?wi(I.environment):ki(I.environment))if(Qg(O))try{let F=eh(O,"utf-8"),J=vn(F),K=JSON.parse(J);if(Si(K)){let ne=xi(I.openCodePluginListOutput);if(ne)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:O,errors:[..._,ne]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:O,errors:_.length>0?_:void 0}}}catch(F){_.push(`Failed to parse ${nh(O)}: ${F instanceof Error?F.message:String(F)}`)}return{platform:"opencode",status:"n/a",errors:_.length>0?_:void 0}}import{join as lc}from"node:path";function Ri(I){let _=I.env.get("PI_CODING_AGENT_DIR");return lc(_?Nn(_,I.home):lc(I.home,".pi","agent"),"settings.json")}function Pi(I){if(typeof I!=="string")return!1;return I==="npm:cc-safety-net"||I.startsWith("npm:cc-safety-net@")}function cc(I){let _=Ri(I.environment),O=Rn(_);if(O.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(O.kind==="missing")return{platform:"pi",status:"n/a"};let F=tn(O.value,"packages");if(!Array.isArray(F))return{platform:"pi",status:"n/a"};let J=F.find((oe)=>Pi(typeof oe==="string"?oe:tn(oe,"source")));if(J===void 0)return{platform:"pi",status:"n/a"};let K=tn(J,"extensions");if(Array.isArray(K)&&K.some((oe)=>typeof oe==="string"&&oe.startsWith("-")))return{platform:"pi",status:"disabled",method:"package config",configPath:_,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:_}}var th={amp:ka,"antigravity-cli":xa,"claude-code":Ra,codex:Ea,"copilot-cli":Ba,cursor:Za,"deepseek-harness":Qa,devin:al,droid:hl,"gemini-cli":yl,"grok-build":Pl,"hermes-agent":Fl,"kimi-code":Kt,openclaw:Xl,opencode:Ot,pi:cc};function Dt(I,_,O){let F={...O,cwd:_,environment:I};return fr.map((J)=>rh(th[J](F)))}function rh(I){if(I.status==="not-inspected")return{platform:I.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:I.platform,detected:I.status!=="n/a",configured:I.status==="configured",inspectionStatus:I.status!=="n/a"?"verified":I.errors&&I.errors.length>0?"failed":"not-applicable",method:I.method,configPath:I.configPath,configPaths:I.configPaths,errors:I.errors}}import{join as oh}from"node:path";var ih=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),sh=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),ah={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function dc(I){let _=oh(I.tmpdir,"cc-safety-net-self-test"),O=ih.map((F)=>{let J=j(I,u("self-test",{command:F.command},{kind:"command",shell:"auto"},{configCwd:_,executionCwd:_},F.command),{guard:{dependencies:{loadPolicySnapshot:()=>sh,getModes:()=>ah,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),K=F.expectBlocked?"blocked":"allowed",ne=J.decision.kind==="deny"?"blocked":"allowed";return{command:F.command,description:F.description,expected:K,actual:ne,passed:K===ne,reason:J.decision.kind==="deny"?J.decision.reason:void 0,ruleId:J.decision.kind==="deny"?J.decision.ruleId:void 0}});return{passed:O.filter((F)=>F.passed).length,failed:O.filter((F)=>!F.passed).length,total:O.length,results:O}}function Ei(I){let _=gn({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},I);if(Dn(_.errors))return null;return{json:_.flags.json,skipUpdateCheck:_.flags.skipUpdateCheck}}async function uc(I,_={}){let O=await Ut(!_.json,()=>{let F=ch(I,_);return{ready:F,finish:()=>F}},()=>Mt(),{loadingMessage:"Checking system status…"});if(_.json)console.log(JSON.stringify(O,null,2));else dh(O);return O.engineSelfTest.failed>0||O.findings.some((F)=>F.severity==="error")?1:0}async function ch(I,_){let O=_.cwd??process.cwd(),F=await xr((Fe)=>Ot({environment:I,cwd:O,openCodeVersion:Fe}).status!=="n/a",void 0,O),J=Dt(I,O,{ampPluginListOutput:F.ampPluginListOutput,codexPluginListOutput:F.codexPluginListOutput,copilotCliVersion:F.versions["copilot-cli"],openCodeVersion:F.versions.opencode,openCodePluginListOutput:F.openCodePluginListOutput}),K=js(I,O),ne=Fs(I),oe=E(I,{cwd:O}),ue=oe.policy,pe=T(ue,I.env),we=z(ue,pe.capabilities),xe=yr(I,7),Se=ha(I,O),Pe=[vr(O),Ct(I)].filter((Fe)=>lh(Fe)),Ce=_.skipUpdateCheck?{currentVersion:pn(),latestVersion:null,updateAvailable:!1}:await Gn(),qe={hooks:J,engineSelfTest:dc(I),userConfig:K.userConfig,projectConfig:K.projectConfig,configState:je(oe),effectiveRules:K.effectiveRules,environment:ne,effectiveSafety:{selectedPreset:ue.safety.level??"standard",level:pe.effectiveLevel,capabilities:pe.capabilities,ruleOverrides:ue.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(we).filter(([,Fe])=>Fe.source==="rule_override"&&Fe.override==="off"&&Fe.inheritedEnabled&&Fe.changesInherited).map(([Fe])=>Fe),ruleCounts:{stored:Object.keys(ue.destructiveCommandRuleOverrides).length,effective:Object.values(we).filter((Fe)=>Fe.changesInherited).length},...oe.policyScopes?{policyScopes:oe.policyScopes}:{}},...Se.length>0?{v2Leftovers:Se}:{},...Pe.length>0?{legacyConfigs:Pe}:{},posture:Xs(I,K.userConfig.path),activity:xe,update:Ce,system:F};return{...qe,findings:Ms(qe)}}function dh(I){console.log(),console.log(Gs(I.hooks)),console.log(),console.log(Bs(I.engineSelfTest)),console.log(),console.log(qs(I)),console.log(),console.log(Vs(I.environment)),console.log(),console.log(Js(I)),console.log(),console.log(zs(I.findings)),console.log(),console.log(Ks(I.activity)),console.log(),console.log(Ys(I.system)),console.log(),console.log(Ws(I.update)),console.log(Zs(I))}import{existsSync as uh}from"node:fs";var ph=/^[A-Za-z0-9_@%+=:,./-]+$/,pc="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function Ai(I){let _=gn({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},I);if(Dn(_.errors))return console.error(pc),console.error("Pass -- before a command that starts with dashes."),null;if(_.values.cwd!==void 0&&!uh(_.values.cwd))return console.error(`Error: --cwd path does not exist: ${_.values.cwd}`),null;let O=_.positionals.length===1?_.positionals[0]:_.positionals.map((F)=>ph.test(F)?F:`'${F.replaceAll("'","'\\''")}'`).join(" ");if(!O)return console.error("Error: No command provided"),console.error(pc),null;return{json:_.flags.json,cwd:_.values.cwd,command:O}}function fc(I){if(I)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function mc(I,_){let F=_-18;return[`${I.dtl}${I.dh.repeat(_)}${I.dtr}`,`${I.dv}  Command Analysis${" ".repeat(F)}${I.dv}`,`${I.dbl}${I.dh.repeat(_)}${I.dbr}`]}function Ii(I){return JSON.stringify(I)}function gc(I,_=0){return`[${I.map((F,J)=>Us(F,J,_)).join(",")}]`}function Xt(I,_,O=70){let F=I.split(" "),J=[],K="";for(let ne of F)if(K&&K.length+ne.length+1>O)J.push(K),K=ne;else K=K?`${K} ${ne}`:ne;if(K)J.push(K);return J.map((ne,oe)=>oe===0?ne:`${_}${ne}`)}function hc(I,_,O){let F=[];switch(I.type){case"parse":return null;case"env-strip":return F.push(""),F.push(`STEP ${_} ${O.h} Strip environment variables`),F.push(`  Removed: ${I.envVars.map((J)=>`${J}=<redacted>`).join(", ")}`),F.push(`  Tokens:  ${Ii(I.output)}`),{lines:F,incrementStep:!0};case"leading-tokens-stripped":return F.push(""),F.push(`STEP ${_} ${O.h} Strip wrappers`),F.push(`  Removed: ${I.removed.join(", ")}`),F.push(`  Tokens:  ${Ii(I.output)}`),{lines:F,incrementStep:!0};case"shell-wrapper":return F.push(""),F.push(`STEP ${_} ${O.h} Detect shell wrapper`),F.push(`  Wrapper: ${I.wrapper} -c`),F.push(`  Inner:   ${I.innerCommand}`),{lines:F,incrementStep:!0};case"interpreter":{if(F.push(""),F.push(`STEP ${_} ${O.h} Detect interpreter`),F.push(`  Interpreter: ${I.interpreter}`),F.push(`  Code:        ${I.codeArg}`),I.paranoidBlocked)F.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:F,incrementStep:!0}}case"busybox":return F.push(""),F.push(`STEP ${_} ${O.h} Busybox wrapper`),F.push(`  Subcommand: ${I.subcommand}`),{lines:F,incrementStep:!0};case"transparent-wrapper":return F.push(""),F.push(`STEP ${_} ${O.h} Transparent wrapper`),F.push(`  Wrapper: ${I.wrapper}`),F.push(`  Tokens:  ${Ii(I.output)}`),{lines:F,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(F.push(""),F.push(`STEP ${_} ${O.h} Match rules`),F.push(`  Rule:   ${I.rule}()`),I.matched)F.push("  Result: MATCHED");else F.push("  Result: No match");return{lines:F,incrementStep:!0}}case"worktree-relaxation":return F.push(""),F.push(`STEP ${_} ${O.h} Worktree relaxation`),F.push(`  Mode:   ${n.worktree.name}`),F.push(`  Git cwd: ${I.gitCwd}`),F.push("  Result: Allowed local discard in linked worktree"),{lines:F,incrementStep:!0};case"temp-root-relaxation":return F.push(""),F.push(`STEP ${_} ${O.h} Temp-root relaxation`),F.push(`  Git cwd: ${I.gitCwd}`),F.push("  Result: Allowed git discard in a temp-root repository"),{lines:F,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(I.embeddedCommandFound)return F.push(""),F.push(`STEP ${_} ${O.h} Fallback scan`),F.push(`  Found: ${I.embeddedCommandFound}`),{lines:F,incrementStep:!0};return null}case"custom-rules-check":{if(I.rulesChecked){if(F.push(""),F.push(`STEP ${_} ${O.h} Custom rules`),I.matched)F.push("  Result: MATCHED");else F.push("  Result: No match");return{lines:F,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(I.matched)return F.push(""),F.push(`STEP ${_} ${O.h} Dangerous text check`),F.push(`  Token:  ${I.token}`),F.push("  Result: MATCHED"),{lines:F,incrementStep:!0};return null}case"strict-unparseable":return F.push(""),F.push(`STEP ${_} ${O.h} Strict mode check`),F.push(`  Command: ${I.rawCommand}`),F.push("  Result:  ✗ UNPARSEABLE"),{lines:F,incrementStep:!0};case"segment-skipped":return null;case"error":return F.push(""),F.push(`ERROR: ${I.message}`),{lines:F,incrementStep:!1};default:return I}}function _i(I,_){let O=fc(_?.asciiOnly??!1),F=58,J=[],K=1;J.push(...mc(O,58)),J.push("");let ne=I.trace.steps.find((Ce)=>Ce.type==="error");if(ne&&ne.type==="error"){J.push("ERROR"),J.push(`  ${ne.message}`),J.push(""),J.push("RESULT"),J.push(`  Status: ${I.result==="blocked"?nn.red("BLOCKED"):nn.green("ALLOWED")}`),J.push(""),J.push("CONFIG");let Ce=I.configSource??"none";return J.push(`  Path: ${Ce}`),J.join(`
`)}let oe=I.trace.steps.find((Ce)=>Ce.type==="parse");if(oe&&oe.type==="parse"){J.push("INPUT"),J.push(`  ${oe.input}`),J.push(""),J.push(`STEP ${K} ${O.h} Split shell commands`),K++;for(let Ce=0;Ce<oe.segments.length;Ce++){let qe=oe.segments[Ce];if(qe){let Fe=Math.random();J.push(`  Segment ${Ce+1}: ${gc(qe,Fe)}`)}}}let ue=I.trace.segments,pe=ue.length>1;for(let Ce of ue){if(pe){J.push("");let on="";if(oe&&oe.type==="parse"){let wo=oe.segments[Ce.index];if(wo)on=wo.join(" ")}let sn=54,an=on,rn=` Segment ${Ce.index+1}: `,fn=" ";if(on){if(rn.length+on.length+fn.length>sn){let Xu=sn-rn.length-fn.length;an=`${on.substring(0,Xu-1)}…`}}let On=on?`${rn}${an}${fn}`:` Segment ${Ce.index+1} `,Yu=on?`${rn}${nn.cyan(an)}${fn}`:On,fs=58-On.length,ms=Math.floor(fs/2),Zu=fs-ms;J.push(`${O.sh.repeat(ms)}${Yu}${O.sh.repeat(Zu)}`)}if(Ce.steps.find((on)=>on.type==="segment-skipped")){J.push(""),J.push("  (skipped — prior segment blocked)");continue}let Fe=!1,en=!1;for(let on of Ce.steps){let sn=hc(on,K,O);if(sn){if(en=!0,on.type==="recurse"){J.push("");let an=" RECURSING ",rn=58-an.length-4;J.push(`  ${O.tl}${O.h}${an}${O.h.repeat(rn)}`),J.push(`  ${O.v}`),Fe=!0;continue}for(let an of sn.lines)if(Fe)J.push(`  ${O.v} ${an}`);else J.push(an);if(sn.incrementStep)K++}}if(Fe)J.push(`  ${O.v}`),J.push(`  ${O.bl}${O.h.repeat(56)}`);if(!en)J.push(""),J.push(`  ${nn.green("✓")} Allowed (no matching rules)`)}if(J.push(""),J.push("RESULT"),I.result==="blocked"){if(J.push(`  Status: ${nn.red("BLOCKED")}`),I.customRule){if(J.push(`  Rule: ${I.customRule.id}`),I.customRule.rulebook)J.push(`  Rulebook: ${I.customRule.rulebook.name} ${I.customRule.rulebook.version}`);if(I.customRule.source)J.push(`  Source: ${I.customRule.source}`);if(I.customRule.override)J.push(`  Override: reason ${I.customRule.override.reason}`)}if(I.reason){let Ce=Xt(I.reason,"          ");J.push(`  Reason: ${Ce[0]}`);for(let qe=1;qe<Ce.length;qe++)J.push(Ce[qe]??"")}}else J.push(`  Status: ${nn.green("ALLOWED")}`);J.push(""),J.push("CONFIG");let we=I.configSource??"none",xe=I.configValid?"":" (invalid)";J.push(`  Path: ${we}${xe}`);let Se=I.safetyPresetScope;J.push(`  Safety preset: ${I.selectedPreset??"standard"}${Se?` (${br(Se)})`:""}`),J.push(`  Effective capabilities: ${I.effectiveLevel}`);let Pe=Object.entries(I.destructiveCommandRuleOverrides??{});if(J.push(`  Rule customizations: ${Pe.length}`),I.ruleActivation)J.push(`  Rule activation: ${I.ruleActivation.id} — ${I.ruleActivation.enabled?"on":"off"} via ${I.ruleActivation.source}`);return J.join(`
`)}function Ti(I){return JSON.stringify(I,null,2)}import{resolve as yh}from"node:path";var fh=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function yc(I){let _=0,O={allocateSegment(){return _++},getNextSegmentIndex(){return _},recordGlobal(F){I.record({kind:"step",scope:"global",step:F})},recordSegment(F,J=O.currentSegmentIndex){if(J===void 0)return;I.record({kind:"step",scope:"segment",segmentIndex:J,step:F})}};return O}function vc(I={}){let _=[],O=I.maxEvents??512,F={maxTextLength:I.maxTextLength??2048,maxListLength:I.maxListLength??128,maxObjectProperties:I.maxObjectProperties??I.maxListLength??128,maxDepth:I.maxDepth??16},J,K=new Set;return{record(ne){if(J)return;if(!ne||_.length>=O)return;try{_.push(Di(mh(ne,F,K)))}catch{}},finish(){if(J)return J;return J=Di({events:Object.freeze(_)}),J}}}function mh(I,_,O){if(I.kind!=="step")throw TypeError("invalid trace event");let{scope:F,step:J}=I;Wr(J,O,_);let K=$i(J,_,O);if(F==="global")return{kind:"step",scope:"global",step:K};if(F!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:I.segmentIndex,step:K}}function Wr(I,_,O,F=0,J=new WeakSet){if(typeof I==="string"){let oe=I.slice(0,O.maxTextLength);if(!ze(oe))return;for(let ue of nt(oe))for(let pe of ue.match(/[^\s"'()$]+/g)??[])_.add(bc(pe));return}if(!I||typeof I!=="object"||F>=O.maxDepth||J.has(I))return;if(J.add(I),Array.isArray(I)){let oe=Math.min(I.length,O.maxListLength);for(let ue=0;ue<oe;ue++)Wr(I[ue],_,O,F+1,J);return}let K=0,ne=new Set;for(let oe in I){if(!Object.hasOwn(I,oe))continue;if(K>=O.maxObjectProperties)break;K++,Wr(oe,_,O);let ue=Oi(oe,O,_);if(ne.has(ue))continue;ne.add(ue),Wr(I[oe],_,O,F+1,J)}}function $i(I,_,O,F=0,J=new WeakSet){if(typeof I==="string")return Oi(I,_,O);if(!I||typeof I!=="object")return I;if(F>=_.maxDepth)return;if(J.has(I))return;if(J.add(I),Array.isArray(I)){let oe=[],ue=Math.min(I.length,_.maxListLength);for(let pe=0;pe<ue;pe++)oe.push($i(I[pe],_,O,F+1,J));return oe}let K={},ne=0;for(let oe in I){if(!Object.hasOwn(I,oe))continue;if(ne>=_.maxObjectProperties)break;ne++;let ue=Oi(oe,_,O);if(Object.hasOwn(K,ue))continue;Object.defineProperty(K,ue,{value:$i(I[oe],_,O,F+1,J),enumerable:!0,configurable:!0,writable:!0})}return K}function Oi(I,_,O){let F=I.slice(0,_.maxTextLength),J=ze(F)?Be(F):F,K=O.size>0?hh(J,O):J;return(gh(K)?_e(K):K).slice(0,_.maxTextLength)}function gh(I){return I.includes("PRIVATE KEY")||I.includes("://")||I.includes("eyJ")||I.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(I)||I.length>=14&&fh.some((_)=>I.includes(_))||I.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(I)}function hh(I,_){return I.replace(/[^\s"'()$]+/g,(O)=>_.has(bc(O))?"<redacted>":O)}function bc(I){let _=2166136261,O=2166136261;for(let F=0;F<I.length;F++)_=Math.imul(_^I.charCodeAt(F),16777619),O=Math.imul(O^I.charCodeAt(I.length-F-1),16777619);return`${_>>>0}:${O>>>0}:${I.length}`}function Di(I){if(I&&typeof I==="object"&&!Object.isFrozen(I)){for(let _ of Object.values(I))Di(_);Object.freeze(I)}return I}function Qt(I,_={},O){let F=yh(_.cwd??process.cwd()),J=_.policySnapshot??E(O,{cwd:F,userConfigDir:_.userConfigDir}),K=T(J.policy,O.env),ne=Ue({policySnapshot:J,effectiveCapabilities:K.capabilities,strict:K.strict,paranoidRm:K.paranoidRm,paranoidInterpreters:K.paranoidInterpreters,worktreeMode:K.worktreeMode}),oe={effectiveLevel:ne.effectiveLevel,selectedPreset:J.policy.safety.level??"standard",...J.policyScopes?{safetyPresetScope:J.policyScopes.levelScope}:{},effectiveCapabilities:ne.effectiveCapabilities,destructiveCommandRuleOverrides:J.policy.destructiveCommandRuleOverrides},{configSource:ue,configValid:pe}=bh(O,{cwd:F,userConfigDir:_.userConfigDir});if(!I||!I.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:ue,configValid:pe,...oe};let we=h(I,"auto");if(we.status==="limited")throw new y;let xe=we.dialect==="powershell"?h(I,"posix"):we,Se=dt(xe),Pe=vc(),Ce=yc(Pe);Ce.recordGlobal({type:"parse",input:I,segments:Se.map((On)=>[...On])});let qe=u("Bash",{command:I},{kind:"command",shell:"auto"},{configCwd:F,executionCwd:F},I),Fe=V(qe,{environment:O,trace:Ce,dependencies:{loadPolicySnapshot:()=>J}}),en=Fe.decision.kind==="deny"?Fe.decision:null;if(en&&(Fe.stage==="policy-protection"||Fe.stage==="secret-protection"))return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:vh(en),matched:!0,reason:en.reason}]}]},result:"blocked",reason:R(en.reason),segment:R(wc(en,I)),ruleId:R(en.ruleId),configSource:ue,configValid:pe,...oe};let on=Ce.getNextSegmentIndex();if(en&&on>0&&on<Se.length)Ce.recordSegment({type:"segment-skipped",index:on,reason:"prior-segment-blocked"},on);let sn=Pe.finish(),an=en?.ruleId??wh(qe,J,K,O),rn=B.find((On)=>On.id===an&&On.activationCapability),fn=rn?ne.policy.effectiveDestructiveCommandRules[rn.id]:void 0;return{trace:xh(sn),result:en?"blocked":"allowed",reason:en?R(en.reason):void 0,segment:en?R(wc(en,I)):void 0,ruleId:en?R(en.ruleId):void 0,customRule:kh(Ch(en?.ruleId,J)),configSource:ue,configValid:pe,...oe,...rn&&fn?{ruleActivation:{id:rn.id,...fn}}:{}}}function wc(I,_){return I.evidence?.segment??_}function vh(I){if(I.reason===He)return"policy-protection:findPolicyConfigMutationTargetInSemanticFacts";if(I.reason===Ge)return"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts";if(I.reason===k)return"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts";return"secret-protection:findSensitiveTargetInSemanticFacts"}function bh(I,_){let O=G(_.cwd),F=H(I,_),J=Z(I,{cwd:_.cwd,userConfigDir:_.userConfigDir});try{if(r(J.projectConfigTarget)!==null){if(Un(J.projectConfigTarget).errors.length===0)return{configSource:O,configValid:!0};return{configSource:O,configValid:!1}}}catch(K){if(K instanceof o)return{configSource:O,configValid:!1};throw K}try{if(r(J.userConfigTarget)!==null){let K=Un(J.userConfigTarget);return{configSource:F,configValid:K.errors.length===0}}return{configSource:null,configValid:!0}}catch(K){if(K instanceof o)return{configSource:F,configValid:!1};throw K}}function wh(I,_,O,F){let J=_.policy,K=Te({...J,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...J.destructiveCommandRuleOverrides,...Object.fromEntries(B.flatMap((oe)=>oe.activationCapability?[[oe.id,"on"]]:[]))}},_.state==="degraded"?{diagnostics:_.diagnostics,reason:_.reason}:void 0),ne=V(I,{environment:F,dependencies:{loadPolicySnapshot:()=>K,getModes:()=>({...O,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return ne.decision.kind==="deny"?ne.decision.ruleId:void 0}function kh(I){if(!I)return;return{id:R(I.id),...I.rulebook?{rulebook:{name:R(I.rulebook.name),version:R(I.rulebook.version)}}:{},...I.source?{source:R(I.source)}:{},...I.override?{override:{type:"reason",reason:R(I.override.reason)}}:{}}}function xh(I){let _=I.events.flatMap((F)=>F.kind==="step"&&F.scope==="global"?[F.step]:[]),O=new Map;for(let F of I.events){if(F.kind!=="step"||F.scope!=="segment")continue;let J=O.get(F.segmentIndex)??{index:F.segmentIndex,steps:[]};J.steps.push(F.step),O.set(F.segmentIndex,J)}return{steps:_,segments:[...O.values()]}}function Ch(I,_){let O=I?.replace(/^custom\./,"");if(!O||!_.policy.rules.some((F)=>F.name===O))return;return _.ruleMetadata[O]??Object.freeze({id:O})}function kc(I){return new Promise((_)=>{process.stdout.write(`${I}
`,()=>_())})}async function xc(I,_){let O=Ai(_);if(!O)return 1;try{let F=Qt(O.command,{cwd:O.cwd},I),J=!!process.env.NO_COLOR||!process.stdout.isTTY;return await kc(O.json?Ti(F):_i(F,{asciiOnly:J})),0}catch(F){let J=Sh(F instanceof p?F.cause:F);if(J===void 0)throw F;if(O.json)return await kc(JSON.stringify({error:J})),1;return console.error(J),1}}function Sh(I){if(I instanceof y)return I.message;if(I instanceof f)return I.message;if(I instanceof s&&a[I.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Cc="2.5.2",An="  ",ft="cc-safety-net";function Sc(I){return I.argument?`${I.flags} ${I.argument}`:I.flags}function Rh(I){return Math.max(...I.map((_)=>Sc(_).length))}function Ph(I){return Math.max(...I.map((_)=>_.usage.length))}function Eh(I){return Math.max(...I.map((_)=>`${ft} ${_.usage}`.length))}function Ah(I,_){let O=`${ft} ${I.usage}`;return`${An}${O.padEnd(_+2)}${I.description}`}function Tn(I,_){return`${An}${I.padEnd(Math.max(40,I.length+2))}${_}`}function Lt(I,_=console.log){let O=[];if(O.push(`${ft} ${I.name}`),O.push(""),O.push(`${An}${I.description}`),O.push(""),O.push("USAGE:"),O.push(`${An}${ft} ${I.usage}`),O.push(""),I.subcommands&&I.subcommands.length>0){O.push("SUBCOMMANDS:");let F=Ph(I.subcommands);for(let J of I.subcommands)O.push(`${An}${J.usage.padEnd(F+2)}${J.description}`);O.push("")}if(I.options.length>0){O.push("OPTIONS:");let F=Rh(I.options);for(let J of I.options){let K=Sc(J),ne=J.default?`${J.description} (default: ${J.default})`:J.description;O.push(`${An}${K.padEnd(F+2)}${ne}`)}O.push("")}if(I.examples&&I.examples.length>0){O.push("EXAMPLES:");for(let F of I.examples)O.push(`${An}${F}`)}_(O.join(`
`))}function Li(){let I=Eh(gr),_=[];_.push(`${ft} v${Cc}`),_.push(""),_.push("Blocks destructive commands and secret access."),_.push(""),_.push("COMMANDS:");for(let O of gr)_.push(Ah(O,I));_.push(""),_.push("GLOBAL OPTIONS:"),_.push(`${An}-h, --help       Show help (use with command for command-specific help)`),_.push(`${An}-V, --version    Show version`),_.push(""),_.push("HELP:"),_.push(`${An}${ft} help <command>     Show help for a specific command`),_.push(`${An}${ft} <command> --help   Show help for a specific command`),_.push(""),_.push("ENVIRONMENT VARIABLES:"),_.push(Tn(`${n.level.name}=standard|strict|paranoid`,"Set session safety level")),_.push(Tn(`${n.worktree.name}=1`,"Allow local git discards in linked worktrees")),_.push(Tn(`${n.debug.name}=1`,"Print diagnostic messages to stderr")),_.push(Tn(`${n.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),_.push(Tn(`${n.projectTightenOnly.name}=1`,"Ignore project policy settings that weaken the user policy")),_.push(Tn("CC_SAFETY_NET_HOME","Override rule config home directory")),_.push(""),_.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),_.push(Tn(`${n.strict.name}=1`,"Force safety.overrides.fail_closed on")),_.push(Tn(`${n.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),_.push(Tn(`${n.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),_.push(Tn(`${n.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),_.push(""),_.push("Documentation:        https://ccsafetynet.com/docs"),console.log(_.join(`
`))}function Rc(){console.log(Cc)}function er(I,_=console.log){let O=hr(I);if(!O)return!1;if(O.name.toLowerCase()!==I.toLowerCase())return!1;return Lt(O,_),!0}import{existsSync as ro,readFileSync as Td}from"node:fs";import{join as to}from"node:path";import*as qn from"node:readline";function Ih(I){return I==="install"?"Install":"Uninstall"}function _h(I){return I==="install"?"Installing":"Uninstalling"}function Th(I){return I==="install"?"into":"from"}function Ac(I){return I?.available===!0}function $h(I,_){let O=new Set(_);return I.filter((F)=>O.has(F.target)).map((F)=>F.target)}function Pc(I,_,O){if(I.every((F)=>!F.available))return _;return Array.from({length:I.length},(F,J)=>J+1).map((F)=>(_+F*O+I.length)%I.length).find((F)=>Ac(I[F]))}function Oh(I,_,O){if(O.ctrl&&O.name==="c")return"interrupt";if(O.name==="escape"||_==="q")return"abort";if(I==="install"&&(_==="u"||_==="U"))return"update";if(O.name==="up"||_==="k")return"up";if(O.name==="down"||_==="j")return"down";if(O.name==="space"||_===" ")return"toggle";if(O.name==="return"||O.name==="enter")return"confirm";return null}function Dh(I){return{cursor:I.findIndex((_)=>_.available),selected:[]}}function Lh(I,_,O){if(O==="confirm"||O==="update"||O==="abort"||O==="interrupt")return{state:I,done:O};if(O==="up")return{state:{...I,cursor:Pc(_,I.cursor,-1)}};if(O==="down")return{state:{...I,cursor:Pc(_,I.cursor,1)}};let F=_[I.cursor];if(!Ac(F))return{state:I};let J=I.selected.includes(F.target)?I.selected.filter((K)=>K!==F.target):$h(_,[...I.selected,F.target]);return{state:{...I,selected:J}}}var Ic="◉",_c="◯",Tc=">",$c=" ";function Nh(I,_,O){return["",`${Ih(I)} CC Safety Net ${Th(I)}:`,"",..._.map((F,J)=>{let K=O.selected.includes(F.target),ne=J===O.cursor,oe=K?Ic:_c,ue=ne?Tc:$c,pe=F.available?"":` (${F.unavailableReason??"not installed"})`,we=`${oe} ${F.label}${pe}`,xe=!F.available?nn.dim(we):K?nn.green(we):ne?nn.bold(we):we;return`${ue} ${xe}`}),"",I==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":_.some((F)=>F.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${I}. q/Esc: close`].join(`
`)}var Ec=["global-hook","plugin"];function jh(I,_,O={}){let F=O.color!==!1?nn.bold:(K)=>K;return["","Install the Kimi Code integration as:","",...[`Global hook — ${_?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((K,ne)=>{let oe=ne===I,ue=`${oe?Ic:_c} ${K}`;return`${oe?Tc:$c} ${oe?F(ue):ue}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function Oc(I){let{input:_,output:O}=I;qn.emitKeypressEvents(_);let F=_.isRaw===!0;_.setRawMode(!0),_.resume();let J=0,K=()=>{if(J===0)return;qn.moveCursor(O,0,-J),qn.cursorTo(O,0),qn.clearScreenDown(O)},ne=()=>{K();let oe=I.render();O.write(`${oe}
`),J=oe.split(`
`).length};return new Promise((oe)=>{let ue=(we)=>{_.off("keypress",pe),_.setRawMode(F),_.pause(),K(),oe(we)};function pe(we,xe){I.onKey(we,xe,{finish:ue,draw:ne})}_.on("keypress",pe),ne()})}function Dc(I={}){let _=0;return Oc({input:I.input??process.stdin,output:I.output??process.stdout,render:()=>jh(_,I.globalHookInstalled===!0),onKey:(O,F,J)=>{if(F.ctrl&&F.name==="c"){J.finish(null),(I.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(F.name==="escape"||O==="q")return J.finish(null);if(F.name==="return"||F.name==="enter")return J.finish(Ec[_]);if(F.name==="up"||F.name==="down"||O==="k"||O==="j")_=(_+1)%Ec.length,J.draw()}})}function Ni(I=process.stdin,_=process.stdout){return Boolean(I.isTTY&&_.isTTY&&typeof I.setRawMode==="function")}function Lc(I,_,O={}){let F=O.output??process.stdout,J=Dh(_);return Oc({input:O.input??process.stdin,output:F,render:()=>Nh(I,_,J),onKey:(K,ne,oe)=>{let ue=Oh(I,K,ne);if(!ue)return;let pe=Lh(J,_,ue);if(J=pe.state,pe.done==="interrupt"){oe.finish(null),(O.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(pe.done==="abort")return oe.finish(null);if(pe.done==="update")return oe.finish("update");if(pe.done==="confirm"){if(J.selected.length===0){F.write("\x07"),oe.draw();return}oe.finish([...J.selected]),F.write(`${_h(I)} selected integrations...
`);return}oe.draw()}})}import{existsSync as Nc,lstatSync as Hh,mkdirSync as Mh,mkdtempSync as Uh,readdirSync as Gh,readFileSync as jt,rmSync as Zr}from"node:fs";import{basename as Bh,dirname as qh,join as Cn}from"node:path";import{fileURLToPath as Vh}from"node:url";var ji="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",mt="cc-safety-net",gt="cc-safety-net/index.ts";import{spawn as Fh}from"node:child_process";var Fi=(I,_)=>{let O=Wn([...I],process.env);return new Promise((F)=>{let J=Fh(O.cmd,O.args,{cwd:_,stdio:["ignore","pipe","pipe"]}),K=pi(J),ne=!1,oe=setTimeout(()=>{ne=!0,J.kill()},120000);J.on("error",(ue)=>{clearTimeout(oe),F({status:null,errorCode:ue.code,stdout:K.stdout,stderr:[ue.message,K.stderr].filter(Boolean).join(`
`)})}),J.on("close",(ue)=>{clearTimeout(oe),F({status:ne?null:ue,errorCode:ne?"ETIMEDOUT":void 0,stdout:K.stdout,stderr:K.stderr})})})};var Nt="cc-safety-net.ts",Hi=Cn("amp",gt);function Jh(I){return Cn(I.home,".config","amp","plugins","cc-safety-net.ts")}function zh(){let I=qh(Vh(import.meta.url)),_=Cn(I,Hi),O=Cn(I,"..",Hi),F=Cn(I,"..","..","..","dist",Hi);return[_,O,F]}function Kh(I=zh()){let _=I.find((O)=>Nc(O)&&Hh(O).isFile());if(!_)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return _}function jc(I){try{return JSON.parse(I)}catch{return}}function Xr(I){return I.subarray(0,Buffer.byteLength(ji)).toString("utf-8")===ji}async function nr(I,_,O){let F=await I(_,O);if(F.status===0)return F;throw Error([`Failed to run ${_.join(" ")}${F.status===null?"":` (exit ${F.status})`}.`,[F.stdout,F.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function Fc(I){let _=await I(["amp","plugins","repositories","--json"]);if(_.status===null)throw Error(`${_.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${_.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${_.stderr}`.trim());if(_.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${_.status}). Sign in with "amp login" and rerun install --amp.
${[_.stdout,_.stderr].filter(Boolean).join(`
`)}`.trim());let O=jc(_.stdout),F=(Array.isArray(O)?O:[]).filter((J)=>tn(J,"scope")==="user"&&tn(J,"exists")===!0&&tn(J,"viewerCanWrite")===!0).map((J)=>tn(J,"cloneRef")).find((J)=>typeof J==="string"&&J.length>0);if(!F)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return F}async function Hc(I,_,O){let F=Uh(Cn(_.tmpdir,"cc-safety-net-amp-"));try{return await nr(I,["amp","clone","user-plugins",F]),await O(F)}finally{Zr(F,{recursive:!0,force:!0})}}function Mi(I){return`rerun ${I==="overwrite"?"install":"uninstall"} --amp`}function Mc(I,_,O){let F=Cn(I,_),J=dn(F);if(!J)return;if(J.isSymbolicLink()||!J.isFile())throw Error(`Refusing to ${O} ${_} in your Amp personal plugins repository: not a regular file. Remove it there and ${Mi(O)}.`);let K=jt(F);if(Xr(K))return K;throw Error(`Refusing to ${O} unmanaged file ${_} in your Amp personal plugins repository. Remove it there and ${Mi(O)}.`)}function Uc(I,_){let O=Cn(I,mt),F=dn(O);if(!F)return;if(F.isSymbolicLink()||!F.isDirectory())throw Error(`Refusing to ${_} ${mt} in your Amp personal plugins repository: not a regular directory. Remove it there and ${Mi(_)}.`);return Mc(I,gt,_)}function Wh(I){let _=Cn(I,Nt),O=dn(_);if(!O||O.isSymbolicLink()||!O.isFile())return;let F=jt(_);return Xr(F)?F:void 0}async function Gc(I,_,O,F){if(await nr(I,O,_),(await nr(I,["git","status","--porcelain"],_)).stdout.trim()==="")return!1;return await nr(I,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",F],_),await nr(I,["git","push","origin","HEAD"],_),!0}function Yr(I,_){Yh(I,_),Zh(I,_)}function Bc(I,_){if(_==="keep")return;throw Error(`Local Amp plugin ${I} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function Yh(I,_){let O=Jh(I),F=dn(O);if(!F)return;if(!F.isSymbolicLink()&&F.isFile()&&Xr(jt(O))){Zr(O);return}Bc(O,_)}function Zh(I,_){let O=Cn(I.home,".config","amp","plugins",mt),F=dn(O);if(!F)return;if(!F.isSymbolicLink()&&F.isDirectory()&&Xh(O)){Zr(O,{recursive:!0});return}Bc(O,_)}function Xh(I){let _=Bh(gt);if(Gh(I).join("\x00")!==_)return!1;let O=Cn(I,_),F=dn(O);return!!F&&!F.isSymbolicLink()&&F.isFile()&&Xr(jt(O))}function Qh(I){let _=l(I);if(!Nc(_))return"";let O=jc(jt(_,"utf-8"));if(!O||typeof O!=="object"||Array.isArray(O))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(C(O,I.home))};
`}async function qc(I,_=Kh(),O=Fi){let F=Buffer.concat([jt(_),Buffer.from(Qh(I),"utf-8")]),J=await Fc(O);return Hc(O,I,async(K)=>{let ne=`${J}/${mt}`,oe=Uc(K,"overwrite"),ue=Mc(K,Nt,"overwrite");if(oe?.equals(F)&&!ue)return Yr(I,"fail"),{path:ne,alreadyInstalled:!0};if(Mh(Cn(K,mt),{recursive:!0}),cn(Cn(K,gt),F),ue)Zr(Cn(K,Nt));let pe=await Gc(O,K,["git","add","--",gt,...ue?[Nt]:[]],`chore: update cc-safety-net plugin to v${pn()}`);return Yr(I,"fail"),{path:ne,alreadyInstalled:!pe}})}async function Vc(I,_=Fi){let O=await Fc(_);return Hc(_,I,async(F)=>{let J=Uc(F,"remove"),K=Wh(F),ne=`${O}/${K&&!J?Nt:mt}`;if(!J&&!K)return Yr(I,"keep"),{path:ne,alreadyInstalled:!1};return await Gc(_,F,["git","rm","--",...J?[gt]:[],...K?[Nt]:[]],`chore: remove cc-safety-net plugin v${pn()}`),Yr(I,"keep"),{path:ne,alreadyInstalled:!0}})}import{existsSync as Jc,mkdirSync as ey,readFileSync as ny}from"node:fs";import{dirname as ty}from"node:path";var Ui=xn["antigravity-cli"],ht="cc-safety-net";function yt(I){return Boolean(I)&&typeof I==="object"&&!Array.isArray(I)}function eo(){return{PreToolUse:[{hooks:[{type:"command",command:Ui,timeout:30}]}]}}function zc(I){try{let _=JSON.parse(ny(I,"utf-8"));if(!_||typeof _!=="object"||Array.isArray(_))throw Error("Antigravity hooks config must be a JSON object");return _}catch(_){if(_ instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${I}: ${_.message}`);throw _}}function Kc(I){let _=I[ht];if(_===void 0){let F=eo();return I[ht]=F,{definition:F,preToolUse:F.PreToolUse??[]}}if(!yt(_))throw Error(`Antigravity hooks config entry "${ht}" must be an object`);let O=Array.isArray(_.PreToolUse)?_.PreToolUse:[];return _.PreToolUse=O,{definition:_,preToolUse:O}}function Wc(I){if(!Array.isArray(I.PreToolUse))return!1;return I.PreToolUse.some((_)=>yt(_)&&Array.isArray(_.hooks)&&_.hooks.some((O)=>yt(O)&&O.command===Ui))}function ry(I){return Object.values(I).some((_)=>yt(_)&&_.enabled!==!1&&Wc(_))}function oy(I){if(I[ht]===void 0)return!1;let _=Kc(I);if(_.definition.enabled!==!1||!Wc(_.definition))return!1;return _.definition.enabled=!0,!0}function iy(I){if(I[ht]===void 0){I[ht]=eo();return}let _=Kc(I);_.definition.enabled=!0,_.preToolUse.push(eo().PreToolUse?.[0]??{hooks:[]})}function sy(I){let _=!1;for(let O of Object.values(I)){if(!yt(O)||!Array.isArray(O.PreToolUse))continue;O.PreToolUse=O.PreToolUse.flatMap((F)=>{if(!yt(F)||!Array.isArray(F.hooks))return[F];let J=F.hooks.filter((K)=>!yt(K)||K.command!==Ui);if(J.length!==F.hooks.length)_=!0;return J.length===0?[]:[{...F,hooks:J}]})}return _}function Qr(I,_){cn(I,`${JSON.stringify(_,null,2)}
`)}function Yc(I){let _=Gt(I.home);if(ey(ty(_),{recursive:!0}),!Jc(_))return Qr(_,{[ht]:eo()}),{path:_,alreadyInstalled:!1};let O=zc(_);if(ry(O))return{path:_,alreadyInstalled:!0};if(oy(O))return Qr(_,O),{path:_,alreadyInstalled:!1};return iy(O),Qr(_,O),{path:_,alreadyInstalled:!1}}function Zc(I){let _=Gt(I.home);if(!Jc(_))return{path:_,alreadyInstalled:!1};let O=zc(_);if(!sy(O))return{path:_,alreadyInstalled:!1};return Qr(_,O),{path:_,alreadyInstalled:!0}}import{existsSync as qi,readlinkSync as cy}from"node:fs";import{join as Vn}from"node:path";import{spawn as ay}from"node:child_process";var $n=En.map((I)=>({target:I.id,flag:I.flag,label:mn(I.id),probeCommand:I.probeCommand}));function Gi(I){let _=new Set(I);return $n.map((O)=>O.target).filter((O)=>_.has(O))}async function Xc(I,_){for(let O of I)await _(O)}var ly=5000;function tr(I,_=ly){return new Promise((O)=>{let F=Wn([...I],process.env),J=ay(F.cmd,F.args,{env:process.env,stdio:"ignore"}),K=!1,ne=(ue)=>{if(K)return;K=!0,clearTimeout(oe),O(ue)},oe=setTimeout(()=>{J.kill(),ne(!1)},_);J.on("error",()=>ne(!1)),J.on("close",(ue)=>ne(ue===0))})}function Qc(I=tr,_={}){let O=new Set(_.configuredTargets??[]);return Promise.all($n.map(async(F)=>({target:F.target,flag:F.flag,label:F.label,...nd(_.action,await I(F.probeCommand),O.has(F.target))})))}function ed(I,_){let O=new Set(_.configuredTargets??[]);return I.map((F)=>({...F,...nd(_.action,F.available,O.has(F.target))}))}function nd(I,_,O){if(I==="uninstall")return O?{available:!0}:{available:!1,unavailableReason:"not installed"};if(I==="install"&&O)return{available:!1,unavailableReason:"already installed"};if(!_)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}var Jn="cc-safety-net",id=["npx","-y","@deepseek-ai/dsh"],td="DeepSeek Harness",rd=["@deepseek-ai","dsh-desktop"],sd="Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.",Bi=(I)=>`DeepSeek Harness Desktop is not in its default location, so ${I} ${Jn} from its Plugins page.`,ad=(I,_)=>qi(Vn(Jo(I),_,"package.json"));function Vi(I,_){let O=_.platform??process.platform,F=ad(I,"desktop"),J=O==="darwin"?[Vn(I.home,"Applications"),_.systemApplications??"/Applications"].map((K)=>Vn(K,`${td}.app`,"Contents","Resources","runtime","cli","bin","dsh")):O==="win32"?[Vn(I.env.get("LOCALAPPDATA")||Vn(I.home,"AppData","Local"),"Programs",td,"resources","runtime","cli","bin","dsh.cmd")]:[];return{profile:F,cli:F?J.find((K)=>qi(K)):void 0}}function ld(I,_=process.platform){if(_==="win32")return qi(Vn(I.env.get("APPDATA")||Vn(I.home,"AppData","Roaming"),...rd,"lockfile"));let O=dy(Vn(I.home,"Library","Application Support",...rd,"SingletonLock")),F=Number(/-(\d+)$/.exec(O??"")?.[1]);return Number.isInteger(F)&&F>0&&uy(F)}function dy(I){try{return cy(I)}catch{return}}function uy(I){try{return process.kill(I,0),!0}catch(_){return _.code==="EPERM"}}async function cd(I,_={}){let O=Vi(I,_);if(O.cli&&ld(I,_.platform))throw Error(sd);let F=!O.cli||ad(I,"web")||await(_.probe??tr)(xo),J=[...O.cli?[{profile:"desktop",label:"Desktop",dsh:[O.cli]}]:[],...F?[{profile:"web",label:"web",dsh:id}]:[]];return{commands:J.map((K)=>[...K.dsh,"plugin","--profile",K.profile,"add",`${Jn}@${pn()}`]),afterInstall:async()=>{let K=new Set(zo(I).filter((oe)=>oe.enabled).map((oe)=>oe.name)),ne=J.filter((oe)=>!K.has(oe.profile));if(ne.length>0)throw Error(`DeepSeek Harness installed ${Jn} in the ${od(ne)} but did not enable it. Enable it from the Plugins page.`)},message:[`Added ${Jn} to the DeepSeek Harness ${od(J)}.`,...O.profile&&!O.cli?[Bi("add")]:[]].join(`
`)}}function od(I){return`${I.map((_)=>_.label).join(" and ")} profile${I.length>1?"s":""}`}function dd(I,_={}){let O=new Set(zo(I).map((K)=>K.name));if(!O.has("desktop")&&!O.has("web"))throw Error(`${Jn} is not installed in the DeepSeek Harness web or Desktop profile`);let F=O.has("desktop")?Vi(I,_).cli:void 0,J=O.has("desktop")&&!F;if(J&&!O.has("web"))throw Error(Bi("remove"));if(F&&ld(I,_.platform))throw Error(sd);return{commands:[...F?[[F,"plugin","--profile","desktop","remove",Jn]]:[],...O.has("web")?[[...id,"plugin","--profile","web","remove",Jn]]:[]],...J?{afterUninstall:()=>{throw Error(`Removed ${Jn} from the DeepSeek Harness web profile, but ${Bi("remove")}`)}}:{}}}function ud(I,_,O={}){let F=Vi(_,O).cli!==void 0;return I.map((J)=>J.target==="deepseek-harness"&&F?{...J,available:!0,unavailableReason:void 0}:J)}import{existsSync as py,readdirSync as fy,rmSync as my}from"node:fs";import{join as gy}from"node:path";function pd(I,_=process.platform,O){if(!py(I))return;let F=_==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);fy(I).filter((J)=>J!==O&&F.test(J)).forEach((J)=>{my(gy(I,J),{recursive:!0,force:!0})})}import{existsSync as fd,readdirSync as hy,rmSync as yy}from"node:fs";import{join as Ft}from"node:path";function no(I,_=process.platform){let O=Ft(I.env.get("npm_config_cache")||(_==="win32"?Ft(I.env.get("LOCALAPPDATA")||Ft(I.home,"AppData","Local"),"npm-cache"):Ft(I.home,".npm")),"_npx");if(!fd(O))return;hy(O).filter((F)=>fd(Ft(O,F,"node_modules","cc-safety-net"))).forEach((F)=>{yy(Ft(O,F),{recursive:!0,force:!0})})}import{existsSync as bd,mkdirSync as by,readFileSync as wd}from"node:fs";import{dirname as wy,join as vd}from"node:path";function vy(I,_){if(I[_]!=="#")return _;let O=I.indexOf(`
`,_+1);return O===-1?I.length:O+1}function Ji(I,_,O){let F=new RegExp(`^(\\s*)${_}\\s*=\\s*\\[`),J=0;for(let K of I.split(`
`)){if(/^\s*\[/.test(K))return;let ne=F.exec(K);if(ne){let oe=J+ne[0].lastIndexOf("[");return{start:oe,end:Mo(I,oe,{skipComment:vy,...O})}}J+=K.length+1}return}function md(I,_,O){let F=I.slice(0,_.end).trimEnd(),J=_a(I,_.end),K=J===""?"     ":`${J}  `,ne=!F.endsWith("[")&&!F.endsWith(",");return`${F}${ne?",":""}
${K}${O}${I.slice(_.end)}`}function gd(I,_,O){let F=I.indexOf(O,_.start);if(F===-1||F>_.end)return I;return`${I.slice(0,F)}${I.slice(F+O.length).replace(/^\s*,/,"")}`}function hd(I,_){let O=new RegExp(`^\\s*${_}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),F=I.split(`
`),J=F.findIndex((oe)=>/^\s*\[/.test(oe)),K=J===-1?F:F.slice(0,J),ne=J===-1?[]:F.slice(J);return[...K.filter((oe)=>!O.test(oe)),...ne].join(`
`)}function yd(I,_,O){let F=new RegExp(`^\\s*\\[\\[${_}]]\\s*$`,"m");return I.split(/(?=^\s*\[)/m).filter((J)=>!F.test(J)||!J.includes(O)).join("").trimEnd()}var rr=xn["kimi-code"],zi=`[[hooks]]
event = "PreToolUse"
command = "${rr}"`,kd=`{ event = "PreToolUse", command = "${rr}" }`,xd={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function Cd(I){return vd(I.env.get("KIMI_CODE_HOME")??vd(I.home,".kimi-code"),"config.toml")}function ky(I){let _=Ji(I,"hooks",xd);if(_&&I.slice(_.start+1,_.end).trim())return md(I,_,kd);let O=hd(I,"hooks").trimEnd();if(O==="")return`${zi}
`;return`${O}

${zi}
`}function Sd(I){let _=Cd(I);if(by(wy(_),{recursive:!0}),!bd(_))return cn(_,`${zi}
`),{path:_,alreadyInstalled:!1};let O=wd(_,"utf-8");if(O.includes(rr))return{path:_,alreadyInstalled:!0};return cn(_,ky(O)),{path:_,alreadyInstalled:!1}}function Rd(I){let _=Cd(I);if(!bd(_))return{path:_,alreadyInstalled:!1};let O=wd(_,"utf-8");if(!O.includes(rr))return{path:_,alreadyInstalled:!1};let F=Ji(O,"hooks",xd),J=F?gd(O,F,kd):`${yd(O,"hooks",rr)}
`;return cn(_,J),{path:_,alreadyInstalled:!0}}var Ki="safety-net@cc-marketplace",Pd=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),Ed=new Set(["antigravity-cli","cursor","devin","droid","grok-build","hermes-agent","kimi-code"]);function Wi(I){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(I??"")}function $d(I){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(I??"")}function xy(I){return/^Marketplace `cc-marketplace`\s*$/m.test(I??"")}var Od={"claude-code":{installCommands:(I)=>{let _=Ir(I,"cc-safety-net@cc-marketplace");return{commands:[..._?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...Fo(I).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:Ir(I,Ki)?[["claude","plugin","uninstall",Ki]]:[],update:_}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(I,_)=>{let O=_??await yn(["codex","plugin","list"]),F=$d(O);return{commands:[F||xy(O)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:Wi(O)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:F}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:Pa},"copilot-cli":{installCommands:async()=>{let I=await yn(["copilot","plugin","list"]),_=[...Fa(I)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...Ha(I)?[["copilot","plugin","uninstall",La]]:[]];if(Na(I))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",In]],cleanupCommands:_,update:!0};return{commands:[ja(await yn(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",In]],cleanupCommands:_}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(I)=>{let _=ni(I);if(_.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(_.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:gi,installCommands:(I)=>{let _=!ro(to(Wt(I),Sn));return{commands:Jl(),afterInstall:()=>zl(_)}},uninstallCommands:[["openclaw","plugins","uninstall",un,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{installCommands:rc},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]},"deepseek-harness":{installCommands:(I)=>cd(I),uninstallCommands:(I)=>dd(I)}};function Dd(I,_=(O)=>O){try{let O=JSON.parse(_(Td(I,"utf-8")));if(!O||typeof O!=="object"||Array.isArray(O))throw Error(`Settings file ${I} must be a JSON object`);return O}catch(O){if(O instanceof SyntaxError)throw Error(`Failed to parse ${I}: ${O.message}`);throw O}}function Cy(I){let _=to(qt(I),"settings.json");if(!ro(_))return;let O=Dd(_,vn),F=O.enabledPlugins;if(!F||typeof F!=="object"||Array.isArray(F))return;if(F[In]!==!1)return;let J=Td(_,"utf-8"),K=J.replace(new RegExp(`("${In}"\\s*:\\s*)false`),"$1true");return F[In]=!0,cn(_,K!==J?K:`${JSON.stringify(O,null,2)}
`),`Enabled ${In} plugin in ${_}`}function Sy(I){let _=Ri(I);if(!ro(_))return;let O=Dd(_);if(!Array.isArray(O.packages))return;let F=O.packages.find((J)=>!!J&&typeof J==="object"&&!Array.isArray(J)&&Pi(J.source)&&("extensions"in J));if(!F)return;return delete F.extensions,cn(_,`${JSON.stringify(O,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${_}`}function Ad(I,_){let O=gn({label:_,booleans:Object.fromEntries($n.map((K)=>[K.target,[K.flag]]))},I),F=O.errors[0];if(F)throw Error(F);let J=$n.filter((K)=>O.flags[K.target]).map((K)=>K.target);if(J.length!==1)throw Error(`Choose exactly one ${_} target: ${$n.map((K)=>K.flag).join(", ")}`);return J[0]}async function Ld(I,_=St){let[O,F,J]=await Promise.all([_(["amp","plugins","list"],30000),_(["codex","plugin","list"],30000),_(["copilot","--binary-version"])]);return{codexPluginListOutput:F,hooks:Dt(I,process.cwd(),{ampPluginListOutput:O,codexPluginListOutput:F,copilotCliVersion:J})}}async function Ry(I,_,O=St){let F=await Ld(I,O);return F.hooks.filter((J)=>_==="install"?J.configured:J.detected||J.inspectionStatus==="not-inspected").filter((J)=>J.platform!=="codex"||!Wi(F.codexPluginListOutput)||$d(F.codexPluginListOutput)).map((J)=>J.platform)}function Py(I,_,O,F){if(O.length>0)return{finish:async()=>[Ad(O,_)]};if(!F.selectTargets&&!Ni(F.input,F.output))return{finish:async()=>[Ad(O,_)]};let J=F.detectConfiguredTargets??(()=>Ry(I,_,F.fetchVersion)),K=Promise.all([Qc(F.probeTargets).then((ne)=>ud(ne,I)),J()]);return{ready:K,finish:async()=>{let[ne,oe]=await K,ue=ed(ne,{action:_,configuredTargets:oe}),pe=F.selectTargets?await F.selectTargets(_,_d(_,ue)):await Lc(_,_d(_,ue),{input:F.input,output:F.output});if(pe==="update")return pe;if(!pe||pe.length===0)return null;return Gi(pe)}}}async function Ey(I,_,O=!1,F){let J=Od[I];J.beforeInstall?.(_);let K=typeof J.installCommands==="function"?await J.installCommands(_,F):{commands:J.installCommands};return await fi(K.commands),await Ml(K.cleanupCommands??[]),await K.afterInstall?.(),[`${K.update||O?"Updated":"Installed"} ${mn(I)} integration`,K.message??J.postInstallMessage].filter(Boolean).join(`
`)}async function Ay(I,_){let O=Od[I];if(!O.uninstallCommands)throw Error(`${mn(I)} uninstall is not supported`);let F=typeof O.uninstallCommands==="function"?O.uninstallCommands(_):{commands:O.uninstallCommands};return await fi(F.commands),F.afterUninstall?.(),`Uninstalled ${mn(I)} integration`}function Iy(I){let _=ac(I);return _.alreadyInstalled?`Uninstalled OpenCode plugin from ${_.path}`:`OpenCode plugin not installed in ${_.path}`}var Nd={"antigravity-cli":{install:Yc,uninstall:Zc},cursor:{install:Wa,uninstall:Ya},devin:{install:il,uninstall:sl},droid:{install:ml,uninstall:gl},"grok-build":{install:Cl,uninstall:Sl},"kimi-code":{install:Sd,uninstall:Rd}};function _y(I,_,O,F=!1){if(I==="install"&&!F)no(O);let J=Nd[_][I](O),K=mn(_),ne=I!=="install"?"Uninstalled":F?"Updated":"Installed";return I==="install"&&J.alreadyInstalled?F?`${K} hook up to date in ${J.path}`:`${K} hook already installed in ${J.path}`:I==="uninstall"&&!J.alreadyInstalled?`${K} hook not installed in ${J.path}`:`${ne} ${K} hook ${I==="install"?"in":"from"} ${J.path}`}var jd={amp:{install:qc,uninstall:Vc,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:_l,uninstall:Tl,afterInstall:async(I)=>{let _=di(I);return await yn(["hermes","plugins","enable",Pn,"--no-allow-tool-override"]),!_},beforeUninstall:async(I)=>{ci(I);try{await yn(["hermes","plugins","disable",Pn])}catch(_){console.warn(`${_ instanceof Error?_.message:String(_)}
Removing the plugin files anyway; ${Pn} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Ty(I,_,O,F=!1){let J=jd[_];if(I==="uninstall")await J.beforeUninstall?.(O);let K=I==="install"?await J.install(O):await J.uninstall(O),ne=I==="install"&&await J.afterInstall?.(O),oe=mn(_),ue=!ne&&(I==="install"&&K.alreadyInstalled||I==="uninstall"&&!K.alreadyInstalled);return[ue?I==="install"?`${oe} plugin ${F?"up to date":"already installed"} at ${K.path}`:`${oe} plugin not installed at ${K.path}`:`${I!=="install"?"Uninstalled":F?"Updated":"Installed"} ${oe} plugin ${I==="install"?"at":"from"} ${K.path}`,ue?void 0:J.restartNote].filter(Boolean).join(`
`)}var $y={"copilot-cli":{afterInstall:Cy},"hermes-agent":{beforeInstall:(I,_)=>{if(!_)no(I)}},openclaw:{beforeUninstall:gi},pi:{afterInstall:Sy}};function Oy(I){return I in Nd}function Dy(I){return I in jd}var Id=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function Ly(I){if(Kt({environment:I,cwd:process.cwd()}).status!=="configured")return Id;return[Id,"",nn.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function _d(I,_){return _.map((O)=>I==="install"&&O.target==="kimi-code"&&O.unavailableReason==="already installed"?{...O,available:!0,unavailableReason:void 0,label:`${O.label} (global hook installed)`}:O)}function Ny(I,_){if(I.selectKimiInstallMethod)return I.selectKimiInstallMethod();if(!Ni(I.input,I.output))return Promise.resolve("global-hook");return Dc({input:I.input,output:I.output,globalHookInstalled:Kt({environment:_,cwd:process.cwd()}).status==="configured"})}async function Fd(I,_,O,F=!1,J){let K=$y[_];if(I==="install")K?.beforeInstall?.(O,F);if(I==="uninstall")K?.beforeUninstall?.(O);if(Oy(_))return _y(I,_,O,F);if(Dy(_))return Ty(I,_,O,F);if(I==="uninstall")return _==="opencode"?Iy(O):Ay(_,O);return[await Ey(_,O,F,J),await K?.afterInstall?.(O)].filter(Boolean).join(`
`)}function jy(I){let _=gn({label:"update"},I).errors[0];if(_)throw Error(_)}async function Fy(I,_=St){let O=await Ld(I,_),F=to(qt(I),"installed-plugins");return{targets:Gi([...O.hooks.filter((K)=>K.platform!=="copilot-cli"&&K.detected).map((K)=>K.platform),...[_r,Da,Oa].flatMap((K)=>ro(to(F,...K))?["copilot-cli"]:[]),...Ir(I,Ki)?["claude-code"]:[],...Wi(O.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:O.codexPluginListOutput}}async function Hy(I){let _=c(),O=I.output??process.stdout,F=(I.scriptPath??process.argv[1]??"").split(/[\\/]/),J=F.find((Pe)=>/^bunx-\d+-/.test(Pe)),K=J!==void 0||F.includes("_npx")?null:(I.checkLatestVersion??Gn)(),ne=async()=>{let Pe=K&&await K;if(Pe?.updateAvailable)O.write(`
Update available: cc-safety-net ${Pe.currentVersion} → ${Pe.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},oe=Fy(_,I.fetchVersion??St).then(async(Pe)=>{let Ce=new Set(Pe.targets);return{targets:Pe.targets,codexPluginListOutput:Pe.codexPluginListOutput,available:new Map(await Promise.all($n.filter((qe)=>Ce.has(qe.target)&&Pd.has(qe.target)).map(async(qe)=>[qe.target,await tr(qe.probeCommand)])))}}),ue=await Ut(I.showBanner??!0,()=>({ready:oe,finish:()=>oe}),()=>Mt({input:I.input??process.stdin,output:O}),{loadingMessage:"Checking installed integrations…",output:O}),pe=await Promise.resolve().then(()=>(pd(_.tmpdir,process.platform,J),null)).catch((Pe)=>or(Pe));if(ue.targets.length===0){if(O.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),pe!==null)console.error(pe);return await ne(),pe===null?0:1}let we=ue.targets.some((Pe)=>Ed.has(Pe))?await Promise.resolve().then(()=>(no(_),null)).catch((Pe)=>or(Pe)):null,xe=await Rr(Promise.all(ue.targets.map((Pe)=>{if(Pd.has(Pe)&&!ue.available.get(Pe))return Promise.resolve({message:`${mn(Pe)} not found; skipped`,failed:!1});if(we!==null&&Ed.has(Pe))return Promise.resolve({message:we,failed:!0});return Fd("install",Pe,_,!0,ue.codexPluginListOutput).then((Ce)=>({message:Ce,failed:!1}),(Ce)=>({message:or(Ce),failed:!0}))})),{loadingMessage:`Updating ${ue.targets.length} integration${ue.targets.length===1?"":"s"}…`,output:O}),Se=pe===null?xe:[...xe,{message:pe,failed:!0}];return Se.forEach((Pe)=>Pe.failed?console.error(Pe.message):O.write(`${Pe.message}
`)),await ne(),Se.some((Pe)=>Pe.failed)?1:0}function Yi(I,_={}){return Promise.resolve().then(()=>jy(I)).then(()=>Hy(_)).catch((O)=>(console.error(or(O)),1))}async function ir(I,_,O={}){try{let F=c(),J=await Ut(!0,()=>Py(F,I,_,O),()=>Mt({input:O.input??process.stdin,output:O.output??process.stdout}),{loadingMessage:I==="install"?"Checking available integrations…":"Checking installed integrations…",output:O.output??process.stdout});if(!J)return(O.output??process.stdout).write(`Cancelled: nothing was ${I}ed.
`),0;if(J==="update")return(O.runUpdate??(()=>Yi([],{fetchVersion:O.fetchVersion,input:O.input,output:O.output,showBanner:!1})))();let K=O.output??process.stdout;return await Xc(J,async(ne)=>{if(ne==="kimi-code"&&I==="install"){let ue=await Ny(O,F);if(ue===null){K.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(ue==="plugin"){K.write(`${Ly(F)}
`);return}}let oe=await Rr(Fd(I,ne,F),{loadingMessage:`${I==="install"?"Installing":"Uninstalling"} ${mn(ne)} integration…`,output:K});K.write(`${oe}
`)}),0}catch(F){return console.error(or(F)),1}}function or(I){let _=I instanceof Error?I.message:String(I),O=typeof I==="object"&&I!==null&&"code"in I?I.code:null;if(O==="EACCES"||O==="EPERM")return`${_}
Check file permissions for the target config file and parent directory.`;if(O==="ENOENT")return`${_}
Check that the target config path and parent directory exist.`;if(O==="ENOTDIR")return`${_}
Check that every parent path component is a directory.`;return _}import{mkdirSync as Vy}from"node:fs";import{dirname as Jy}from"node:path";import{createInterface as zy}from"node:readline";import{existsSync as Md,readFileSync as My}from"node:fs";function vt(I,_){let O=tt(I,_);return{policy:O.policy,errors:ae(Xe(O.issues,et,(F)=>F.kind==="custom")," "," ")}}function sr(I,_){return vt(I,_).errors}function Hd(I,_){return{"safety.level":I.safety.level,...Zi("safety.overrides",I.safety.overrides),"workflow.worktree_mode":String(I.workflow.worktree_mode),"destructive_command_protection.enabled":String(I.destructive_command_protection.enabled),...Zi("destructive_command_protection.overrides",I.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":Xi(I.destructive_command_protection.allow_paths),"secret_protection.enabled":String(I.secret_protection.enabled),...Zi("secret_protection.overrides",I.secret_protection.overrides),"secret_protection.deny_paths":Xi(I.secret_protection.deny_paths),"secret_protection.allow_paths":Xi(I.secret_protection.allow_paths),..._?{"audit.retention_days":String(I.audit.retention_days)}:{}}}function oo(I,_,O){let F=Hd(I,O),J=Hd(_,O);return[...new Set([...Object.keys(F),...Object.keys(J)])].flatMap((K)=>F[K]===J[K]?[]:[{field:K,before:F[K],after:J[K]}])}function ar(I,_){let O=l(I,_);if(!Md(O))return{baseline:C(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,I.home),diagnostics:[]};let F=bt(O),J=vt(F.value,I.home);return{baseline:J.policy,diagnostics:F.errors.length>0?F.errors:J.errors}}function bt(I){if(!Md(I))return{errors:[`${I}: file not found`]};try{return{value:JSON.parse(My(I,"utf-8")),errors:[]}}catch(_){let O=_ instanceof Error?_.message:String(_);return{errors:[`${I}: ${_ instanceof SyntaxError?`Invalid JSON: ${O}`:O}`]}}}function io(I,_){let O=Uy(I)?I:{};return{version:_.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((F)=>O[F]!==void 0).map((F)=>[F,O[F]]))}}function Zi(I,_){return Object.fromEntries(Object.entries(_).flatMap(([O,F])=>F===void 0?[]:[[`${I}.${O}`,String(F)]]))}function Xi(I){return I.length===0?"(none)":I.join(", ")}function Uy(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}import{chmodSync as Gy,existsSync as Ud,mkdirSync as By,readFileSync as Gd}from"node:fs";import{dirname as qy}from"node:path";function Bd(I,_={}){let O=l(I,_);if(!Ud(O))return{path:O,exists:!1,raw:"",policy:L(),errors:[]};let F=Gd(O,"utf-8");if(!F.trim())return{path:O,exists:!0,raw:F,policy:L(),errors:["Config file is empty"]};try{let J=vt(JSON.parse(F),I.home);return{path:O,exists:!0,raw:F,policy:J.policy,errors:J.errors}}catch(J){return{path:O,exists:!0,raw:F,policy:L(),errors:[`Invalid JSON: ${J instanceof Error?J.message:String(J)}`]}}}function Hn(I,_,O={}){let F=l(I,O),J=vt(_,I.home);if(J.errors.length>0)return{path:F,policy:L(),errors:J.errors};let K=J.policy;return By(qy(F),{recursive:!0,mode:448}),g(ie(F),`${JSON.stringify(K,null,2)}
`,384),Gy(F,384),{path:F,policy:K,errors:[]}}function qd(I,_){let O=vt(_,I.home);if(O.errors.length>0)return{errors:O.errors};return{preview:Le(O.policy,I.env),errors:[]}}function Vd(I,_={}){let O=l(I,_);if(!Ud(O))return Hn(I,ee,_);let F=Gd(O,"utf-8");if(!F.trim())return Hn(I,ee,_);try{return Hn(I,C(JSON.parse(F),I.home),_)}catch{return Hn(I,ee,_)}}var Jd=new Set(["check","apply"]),zd="(unset)";async function Wd(I,_,O={}){let F=gn({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},_),J=F.positionals[0],K=[...F.errors,...J&&!Jd.has(J)?[`Unknown policy subcommand: ${J}`]:[],...J&&Jd.has(J)&&!F.positionals[1]?[`policy ${J} requires a file`]:[],...F.positionals.slice(2).map((qe)=>`Unexpected policy argument: ${qe}`)];if(K.length>0){for(let qe of K)console.error(qe);return 1}let ne=F.positionals[1];if(!J||!ne)return Lt(mr,console.error),1;let oe=O.cwd??process.cwd(),ue=F.flags.global?l(I):b(oe);if(!F.flags.global&&Ae(I,{cwd:oe}))return console.error(`${ue} is the user policy, not a project policy; use --global for the user scope, or run from a project directory`),1;let pe=bt(ne),we=[...pe.errors,...sr(pe.value,I.home).map((qe)=>`${ne}: ${qe}`),...!F.flags.global&&Yy(pe.value)&&pe.value.audit!==void 0?[`${ne}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(we.length>0){for(let qe of we)console.error(qe);return 1}let xe=C(pe.value,I.home);if(console.log(`Scope: ${F.flags.global?"user":"project"} (${ue})`),console.log(`Proposal: ${ne}`),F.flags.global)Kd(C(bt(ue).value,I.home),xe,!0);if(!F.flags.global){let qe=ar(I).baseline;console.log("Effective policy (user + project merged):"),Kd(Q(qe,le(bt(ue).value,I.home).policy).policy,Q(qe,le(pe.value,I.home).policy).policy,!1)}if(J==="check")return 0;let Se=O.input??process.stdin,Pe=O.output??process.stdout;if(!Se.isTTY||!Pe.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ne}${F.flags.global?" --global":""}`),1;if(!await Ky(`Apply this policy to ${ue}? [y/N] `,Se,Pe))return console.log("Cancelled; nothing was written."),0;return Wy(I,ue,pe.value,xe,F.flags.global),console.log(`Policy applied: ${ue}`),0}function Ky(I,_,O){let F=zy({input:_,output:O,terminal:!1});return new Promise((J)=>{F.once("close",()=>J(!1)),F.question(I,(K)=>{J(/^y(es)?$/i.test(K.trim())),F.close()})})}function Wy(I,_,O,F,J){if(J){Hn(I,F);return}Vy(Jy(_),{recursive:!0}),wn(_,io(O,F))}function Kd(I,_,O){let F=oo(I,_,O);if(F.length===0){console.log("No changes.");return}console.log(`Changes (${F.length}):`);for(let J of F)console.log(`  ${J.field}: ${J.before??zd} -> ${J.after??zd}`)}function Yy(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}import{join as cb}from"node:path";var Yd="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- `caffeinate`, `exec`, `nice`, `nohup`, `setsid`, `stdbuf`, `time`, and `timeout` are built-in transparent wrappers and need no configuration. Configure only other wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function so(I,_){if(!I.ok){nu(I);return}Qd(I,_)}function Xd(I,_,O){if(I.ok)console.log(O);if(!I.add){so(I,`Added rulebook source: ${_}`);return}if(!I.ok){nu(I);return}if(I.add.added.length>0)console.log(`Added ${I.add.added.length} ${I.add.added.length===1?"rulebook":"rulebooks"} from ${I.add.source} at ${I.add.ref}:`),I.add.added.forEach((F)=>{console.log(`  - ${F}`)});if(I.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${I.add.source} at ${I.add.ref}: ${I.add.alreadyConfigured.join(", ")}`);if(I.add.commits.length>0)console.log(`Vendored at ${I.add.commits.map((F)=>F.slice(0,7)).join(", ")}.`);Qd(I,"Rule config updated.")}function Qd(I,_){for(let O of I.changes??[])console.log(O);console.log(_),console.log(""),Zy(I.entries)}function Zy(I){if(I.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${I.length}):`);for(let _ of I)console.log(`  - ${_.name} ${_.version} (${Xy(_.ruleCount)})`),console.log(`    Source: ${_.spec}`)}function Xy(I){return`${I} ${I===1?"rule":"rules"}`}function eu(I){wt("Active sources",I.rulebooks,(_)=>[`[${_.source}] ${_.name} ${_.version}`,`  Source: ${_.spec}`]),wt("Active rules",I.rules,(_)=>[`[${ev(I,_.name)}] ${_.name}`,...Qy(_),`  Reason: ${_.reason}`]),wt("Disabled rules",Zd(I,"off"),(_)=>[_.key]),wt("Reason overrides",Zd(I,"reason"),(_)=>[_.key,`  Reason: ${_.value.reason}`]),wt("Transparent wrappers",I.transparent_wrappers,(_)=>[_]),wt("Issues",I.errors,(_)=>[_]),wt("Warnings",I.warnings,(_)=>[_])}function wt(I,_,O){if(_.length===0){console.log(`${I}: (none)`);return}console.log(`${I} (${_.length}):`);for(let F of _){let[J,...K]=O(F);console.log(`  - ${J}`);for(let ne of K)console.log(`    ${ne}`)}}function Qy(I){if(!I.match)return[`  Command: ${I.subcommand?`${I.command} ${I.subcommand}`:I.command}`,`  Block args: ${I.block_args.join(", ")}`];return[`  Command: ${[I.command,...I.match.command_path].join(" ")}`,...I.match.any_args?[`  Any args: ${I.match.any_args.join(", ")}`]:[],...I.match.exclude_args?[`  Exclude args: ${I.match.exclude_args.join(", ")}`]:[]]}function ev(I,_){return I.rulebooks.find((O)=>O.rules.includes(_))?.source??"project"}function Zd(I,_){return Object.entries({...I.userConfig?.overrides,...I.projectConfig?.overrides}).filter((O)=>{if(_==="off")return O[1]==="off";return!!O[1]&&typeof O[1]==="object"}).map(([O,F])=>({key:O,value:F}))}function nu(I){for(let _ of I.errors)console.error(_)}import{dirname as Su,join as go}from"node:path";import{join as rs,resolve as pv}from"node:path";function Qi(I){let _=m(I);if(_.errors.length>0)return{ok:!1,result:{ok:!1,errors:_.errors,entries:[]}};return{ok:!0,config:_.config??ut}}function tu(I){wn(I,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function ru(I){wn(I,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as uo}from"node:path";var nv="custom.";function ao(I){if(I.rulebook_version!==2)return[];let _=I.rules.map((O)=>({name:O.name,command:O.command,block_args:[],match:O.match,reason:O.reason,intent:O.intent}));return(I.tests??[]).flatMap((O,F)=>{let J=es(h(O.command));if(J.length===0)return[`tests[${F}]: could not parse fixture command: ${O.command}`];let K=J.reduce((ne,oe)=>ne??A(oe,_)?.id.slice(nv.length),void 0);if(O.expect==="blocked"){if(K===O.rule)return[];let ne=K?`"${K}" matched first`:"no rule matched";return[`tests[${F}]: expected "${O.rule}" to block "${O.command}" but ${ne}`]}return K?[`tests[${F}]: expected "${O.command}" to be allowed but "${K}" matched`]:[]})}function es(I){return I.nodes.flatMap((_)=>{if(_.kind==="group"||_.kind==="function")return es(_.body);if(_.kind!=="command")return[];let O=ve(te(_.dialect,_.words)).words.map(t);return[...O.length>0?[O]:[],..._.nested.flatMap((F)=>es(F))]})}var lo=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function co(I={}){return{requests:0,responseBytes:0,maxRequests:I.maxRequests??lo.maxRequests,maxResponseBytes:I.maxResponseBytes??lo.maxResponseBytes}}function Mn(I){return{controller:new AbortController,budget:co(),resolveUrl:I}}function ou(I){return I instanceof Error&&I.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function iu(I){if(I.requests>=I.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");I.requests++}function su(I,_){if(_>I.maxResponseBytes-I.responseBytes)throw I.responseBytes+=_,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");I.responseBytes+=_}var cu=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function au(I,_,O=x(uo(uo(_)),"rules policy"),F=Mn()){if(S(I))return iv(I,F);return ov(I,_,O)}async function du(I,_,O,F,J,K){if(!S(I))return au(I,_,O,F);let ne=J?null:tv(I,_,O);if(ne)return ne;if(!J&&!K)throw Error(`${I} is not vendored; run rule update ${I} to vendor it`);return au(I,_,O,F)}function tv(I,_,O=x(uo(uo(_)),"rules policy")){let F=D(I),J=N(_,F.name),K=r(i(O,J));if(K===null)return null;let ne=ce(ns(K,`Invalid rulebook ${J}.`));if(ne.name!==F.name)throw Error(`rulebook name "${ne.name}" in ${J} must match "${F.name}"`);return{spec:I,rulebook:ne,content:K}}async function uu(I,_={}){if(!Y(I))throw Error(`Invalid GitHub repository source: ${I}`);let[O,F]=I.split("/");if(!O||!F)throw Error(`Invalid GitHub repository source: ${I}`);if(_.ref!==void 0&&!se(_.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${_.ref}`);let J=_.operation??Mn(),K=_.ref??await rv(O,F,I,J),ne=await fu(O,F,K,I,J),oe=await po(`https://api.github.com/repos/${O}/${F}/git/trees/${ne}?recursive=1`,"tree",J),ue=oe.response;if(!ue.ok)throw Error(`Failed to inspect ${I}: GitHub tree returned ${ue.status}`);let pe=JSON.parse(oe.content);if(!Array.isArray(pe?.tree))throw Error(`Failed to inspect ${I}: unexpected GitHub tree response`);let we=pe.tree,xe=[...new Set(we.flatMap((Se)=>{if(!Se||typeof Se!=="object")return[];let Pe=Se;if(Pe.type!=="blob"||typeof Pe.path!=="string")return[];let Ce=Pe.path.match(ct);return Ce?.[1]?[Ce[1]]:[]}))].sort();if(xe.length===0)throw Error(`No rulebooks found in ${I} under ${ge}/`);return{source:I,owner:O,repo:F,ref:K,commit:ne,names:xe}}async function rv(I,_,O,F){let J=await po(`https://api.github.com/repos/${I}/${_}`,"metadata",F),K=J.response;if(!K.ok)throw Error(`Failed to inspect ${O}: GitHub returned ${K.status}`);let oe=JSON.parse(J.content)?.default_branch;if(typeof oe!=="string"||oe==="")throw Error(`Failed to inspect ${O}: missing default branch`);if(!se(oe))throw Error(`GitHub returned an invalid default branch: ${oe}`);return oe}function ov(I,_,O){lt(I);let F=N(_,I),J=r(i(O,F));if(J===null)throw Error(`Rulebook source not found: ${I}`);let K=pu(ns(J,"Invalid local rulebook source."));if(K.name!==I)throw Error(`rulebook name "${K.name}" must match local source "${I}"`);return{spec:I,rulebook:K,content:J}}async function iv(I,_){let O=D(I),F=await fu(O.owner,O.repo,O.ref,I,_),J=await po(`https://raw.githubusercontent.com/${O.owner}/${O.repo}/${F}/${O.path}`,"raw",_),K=J.response;if(!K.ok)throw Error(`Failed to fetch ${I}: GitHub raw returned ${K.status}`);let ne=J.content,oe=pu(ns(ne,"Invalid GitHub rulebook response."));if(oe.name!==O.name)throw Error(`rulebook name "${oe.name}" must match GitHub source "${O.name}"`);return{spec:I,rulebook:oe,content:ne}}function pu(I){let _=ce(I),O=ao(_);if(O.length>0)throw Error(O.join("; "));return _}function ns(I,_){try{return JSON.parse(I)}catch{throw Error(_)}}async function fu(I,_,O,F,J){let K=await po(`https://api.github.com/repos/${I}/${_}/commits/${encodeURIComponent(O)}`,"commit",J),ne=K.response;if(!ne.ok)throw Error(`Failed to resolve ${F}: GitHub returned ${ne.status}`);let oe=JSON.parse(K.content);if(typeof oe?.sha!=="string"||oe.sha==="")throw Error(`Failed to resolve commit for ${F}`);return oe.sha}async function sv(I,_,O={}){if(O.signal?.aborted)throw O.signal.reason;let F=O.budget??co(),J=new AbortController,K=()=>J.abort(O.signal?.reason);O.signal?.addEventListener("abort",K,{once:!0});let ne=!1,oe=setTimeout(()=>{if(J.signal.aborted)return;ne=!0,J.abort()},O.timeoutMs??cu.timeoutMs);try{if(O.signal?.aborted)throw O.signal.reason;iu(F);let ue=await fetch(I,{signal:J.signal,redirect:"error"});if(!ue.ok)return mu(ue),{response:ue,content:""};return{response:ue,content:await av(ue,_,F,()=>J.abort())}}catch(ue){if(ne)throw Error("GitHub request timed out",{cause:ue});if(O.signal?.aborted)throw O.signal.reason;throw ue}finally{clearTimeout(oe),O.signal?.removeEventListener("abort",K)}}function po(I,_,O){return sv(O.resolveUrl?.(I)??I,_,{budget:O.budget,signal:O.controller.signal})}async function av(I,_,O=co(),F){let J=cu[`${_}Bytes`],K=Number(I.headers.get("content-length"));if(Number.isFinite(K)&&K>J)throw mu(I),Error(`GitHub ${_} response exceeds ${J} bytes`);if(!I.body)return"";let ne=I.body.getReader(),oe=[],ue=0;while(!0){let pe=await ne.read();if(pe.done)break;try{su(O,pe.value.byteLength)}catch(we){throw F?.(),lu(ne),we}if(ue+=pe.value.byteLength,ue>J)throw F?.(),lu(ne),Error(`GitHub ${_} response exceeds ${J} bytes`);oe.push(Buffer.from(pe.value))}return Buffer.concat(oe,ue).toString("utf-8")}function mu(I){if(!I.body)return;gu(()=>I.body?.cancel())}function lu(I){gu(()=>I.cancel())}function gu(I){try{Promise.resolve(I()).catch(()=>{})}catch{}}var lv=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function hu(I,_){let O=bu(I.rules,_);if(O.length>0)return{ok:!0,specs:O};return vu(I.rules,_)}function yu(I,_){let O=bu(I,_);if(O.length>0)return{ok:!0,specs:O};let F=dv(I,_);if(F.length>0)return{ok:!0,specs:F};let J=uv(I,_);if(!J.ok)return J;if(J.specs.length>0)return{ok:!0,specs:J.specs};return vu(I,_)}function vu(I,_){let O=I.filter((F)=>ts(F)?.name===_);if(O.length===1)return{ok:!0,specs:O};return cv(_,O)}function cv(I,_){return{ok:!1,result:{ok:!1,errors:_.length===0?[`No configured rulebook matches ${I}`]:[`Ambiguous rulebook match ${I}: ${_.join(", ")}`],entries:[]}}}function bu(I,_){return I.filter((O)=>O===_)}function dv(I,_){let O=_.match(lv),F=O?.[1],J=O?.[2],K=O?.[3];if(!F||!J||!K||!se(K))return[];return wu(I,(ne)=>ne.owner===F&&ne.repo===J&&ne.ref===K)}function uv(I,_){if(!Y(_))return{ok:!0,specs:[]};let[O,F]=_.split("/"),J=wu(I,(ne)=>ne.owner===O&&ne.repo===F);if(new Set(J.map((ne)=>ts(ne)?.ref).filter((ne)=>!!ne)).size<2)return{ok:!0,specs:J};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${_}. Use an explicit ref:`,`  cc-safety-net rule remove ${_}#<ref>`],entries:[]}}}function ts(I){try{return D(I)}catch{return null}}function wu(I,_){return I.filter((O)=>{let F=ts(O);return F?_(F):!1})}async function mo(I,_={}){let O=os(_);return fv(I,O,await fo(I,O,Mn()))}function fv(I,_,O){if(!O.ok)return O;let F=kn(I,_),J=[...new Set(W(F.configPath,F.filesystemScope))];if(J.length===0)return O;return{ok:!1,errors:J,entries:O.entries}}async function fo(I,_,O,F={},J=new Set,K=new Set){try{let ne=kn(I,_),oe=Qi(ne.configTarget);if(!oe.ok)return oe.result;let ue=oe.config,pe=_.only?hu(ue,_.only):{ok:!0,specs:ue.rules};if(!pe.ok)return pe.result;let we=new Set([..._.refresh?pe.specs:[],...J]),xe=(rn)=>du(rn,ne.configDir,ne.filesystemScope,O,we.has(rn),!_.refresh||we.has(rn)),Se=await Sv(ue.rules,_.refresh?(rn)=>xe(rn).then((fn)=>({ok:!0,item:fn})).catch((fn)=>{if(ou(fn))throw fn;return{ok:!1,spec:rn,message:fn instanceof Error?fn.message:String(fn)}}):async(rn)=>({ok:!0,item:await xe(rn)}),O),Pe=Se.filter((rn)=>!rn.ok),Ce=Se.filter((rn)=>rn.ok).map((rn)=>rn.item),qe=Ce.flatMap((rn)=>mv(rn,ue.rules)),Fe=Ce.flatMap((rn)=>gv(rn,K,ne)),en=new Set([...qe,...Fe].map((rn)=>rn.spec)),on=[...Pe,...qe,...Fe],sn=[],an=yv(sn,()=>Ce.flatMap((rn)=>en.has(rn.spec)||on.length>0&&K.has(rn.spec)?[]:hv(rn,ne,F,sn)));return{ok:on.length===0,errors:on.map((rn)=>`Failed to update ${rn.spec}: ${rn.message}`),entries:Ce.map(bv),changes:an}}catch(ne){return cr(ne)}}function mv(I,_){if(!S(I.spec))return[];let O=Ne(I.spec),F=_.filter((J)=>J!==I.spec&&Ne(J).toLowerCase()===O.toLowerCase());if(F.length===0)return[];return[{ok:!1,spec:I.spec,message:`rulebook name "${O}" is also claimed by ${F.join(", ")}; rename one of them`}]}function gv(I,_,O){if(!_.has(I.spec)||!S(I.spec))return[];let F=N(O.configDir,I.rulebook.name),J=r(i(O.filesystemScope,F));if(J===null||J===I.content)return[];return[{ok:!1,spec:I.spec,message:`${F} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function hv(I,_,O,F){if(!S(I.spec))return[];let J=N(_.configDir,I.rulebook.name),K=i(_.filesystemScope,J),ne=r(K);if(ne===I.content)return[];return F?.push({target:K,previous:ne}),g(K,I.content,void 0,O._testAfterPolicyRename),vv(I,ne)}function yv(I,_){try{return _()}catch(O){for(let F of[...I].reverse()){if(F.previous===null){U(F.target);continue}g(F.target,F.previous)}throw O}}function vv(I,_){if(_===null)return[`Vendored ${I.spec} (${I.rulebook.version})`];let O=be(_),F="problem"in O?null:O.rulebook,J=new Map(F?.rules.map((ne)=>[ne.name,JSON.stringify(ne)])??[]),K=new Set(I.rulebook.rules.map((ne)=>ne.name));return[`Updated ${I.spec} (${F?.version??"unreadable"} -> ${I.rulebook.version})`,...[...K].filter((ne)=>!J.has(ne)).map((ne)=>`  + ${ne}`),...[...J.keys()].filter((ne)=>!K.has(ne)).map((ne)=>`  - ${ne}`),...I.rulebook.rules.filter((ne)=>{let oe=J.get(ne.name);return oe!==void 0&&oe!==JSON.stringify(ne)}).map((ne)=>`  ~ ${ne.name}`)]}function bv(I){return{spec:I.spec,name:I.rulebook.name,version:I.rulebook.version,ruleCount:I.rulebook.rules.length}}async function ku(I,_,O={}){return wv(I,_,Pv(O),Mn())}async function wv(I,_,O,F,J={}){let K=null,ne=!1;try{let oe=kn(I,O),ue=r(oe.configTarget);K={target:oe.configTarget,content:ue};let pe=Qi(oe.configTarget);if(!pe.ok)return pe.result;let we=pe.config,xe=Y(_);kv(_,O,xe);let Se=xe?await uu(_,{ref:O.ref,operation:F}):null,Pe=Se?xv(Se,O.rulebooks):[],Ce=Se?Pe.map((sn)=>Cv(we.rules,Se,sn)??`${_}#${Se.ref}/${sn}`):[_],qe=Ce.filter((sn)=>!we.rules.includes(sn)),Fe=[...we.rules,...qe];if(Fe.length>he)return Rv();if(Fe.length!==we.rules.length)ne=!0,wn(oe.configTarget,{version:1,rules:Fe,overrides:we.overrides??{},transparent_wrappers:we.transparent_wrappers??[]},void 0,J._testAfterPolicyRename);let en=await fo(I,O,F,J,new Set(qe),new Set(qe));if(!en.ok)lr(oe.configTarget,ue);if(!en.ok||!Se)return en;let on=Pe.filter((sn,an)=>qe.includes(Ce[an]??""));return{...en,add:{source:_,ref:Se.ref,selected:Pe,added:on,alreadyConfigured:Pe.filter((sn)=>!on.includes(sn)),commits:qe.length>0?[Se.commit]:[]}}}catch(oe){if(ne&&K)try{lr(K.target,K.content)}catch(ue){return cr(ue)}return cr(oe)}}function kv(I,_,O){if(!O&&_.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!O&&_.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${I}`);if(_.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let F=_.rulebooks?.filter((J)=>!d.test(J))??[];if(F.length>0)throw Error(`Invalid rulebook names: ${F.join(", ")}`)}function xv(I,_){let O=_?[...new Set(_)]:I.names,F=O.filter((J)=>!I.names.includes(J));if(F.length>0)throw Error(`Rulebooks not found in ${I.source} at ${I.ref}: ${F.join(", ")}
Available rulebooks: ${I.names.join(", ")}`);return O}function Cv(I,_,O){let F=`${_.source}#${_.ref}/${O}`;if(I.includes(F))return F;let J=`${_.source}#${_.commit}/${O}`;return I.find((K)=>K===J)}async function Sv(I,_,O=Mn()){if(I.length>he)throw Error(ye);let F=[],J=0,K,ne=Array.from({length:Math.min(I.length,lo.concurrency)},async()=>{while(!K){let oe=J;if(oe>=I.length)return;J++;try{F[oe]=await _(I[oe],oe,O.controller.signal)}catch(ue){if(!K)K={value:ue},J=I.length,O.controller.abort(ue);return}}});if(await Promise.all(ne),K)throw K.value;return F}function Rv(){return{ok:!1,errors:[ye],entries:[]}}function os(I){return{cwd:I.cwd,userConfigDir:I.userConfigDir,userConfigPath:I.userConfigPath,projectConfigPath:I.projectConfigPath,global:I.global,only:I.only,refresh:I.refresh}}function Pv(I){return{...os(I),ref:I.ref,rulebooks:I.rulebooks}}function Ev(I){return{...os(I),deleteSource:I.deleteSource}}async function xu(I,_,O={}){try{return await Av(I,_,Ev(O),{})}catch(F){return cr(F)}}async function Av(I,_,O,F){let J=kn(I,O),K=m(J.configTarget);if(K.errors.length>0)return{ok:!1,errors:K.errors,entries:[]};if(!K.config)return{ok:!1,errors:[`No config found at ${J.configPath}`],entries:[]};let ne=yu(K.config.rules,_);if(!ne.ok)return ne.result;let oe=O.deleteSource?Iv(J.configDir,ne.specs,J.filesystemScope):{ok:!0,dirs:[]};if(!oe.ok)return oe.result;let ue=r(J.configTarget);if(ue===null)return cr(Error("Rules config is unavailable."));try{wn(J.configTarget,{version:1,rules:K.config.rules.filter((xe)=>!ne.specs.includes(xe)),overrides:K.config.overrides??{},transparent_wrappers:K.config.transparent_wrappers??[]},void 0,F._testAfterPolicyRename)}catch(xe){throw lr(J.configTarget,ue),xe}let pe=await fo(I,O,Mn(),F);if(!pe.ok)return lr(J.configTarget,ue),pe;let we=_v(oe.dirs,F,J.filesystemScope);if(!we.ok){lr(J.configTarget,ue);let xe=await fo(I,O,Mn(),F);if(!xe.ok)return{ok:!1,errors:[...we.result.errors,...xe.errors],entries:xe.entries};return we.result}return pe}function Iv(I,_,O){let F=_.flatMap((oe)=>d.test(oe)?[]:["--delete-source can only delete local rulebook sources"]),J=_.map((oe)=>rs(I,oe)),K=F.length>0?[]:J.flatMap((oe)=>Cu(oe,O)),ne=[...F,...K];return ne.length>0?{ok:!1,result:{ok:!1,errors:ne,entries:[]}}:{ok:!0,dirs:J}}function Cu(I,_){let O=pv(I),F=i(_,O),J=fe(F);if(!J)return[`Local rulebook source directory not found: ${I}`];let K=J.find((ne)=>ne.name==="rulebook.json");if(!K)return[`Local rulebook source directory is missing rulebook.json: ${I}`];if(K.kind!=="file")throw new o(_.label);if(r(i(_,rs(O,"rulebook.json"))),J.length>1)return[`Local rulebook source directory contains extra files: ${I}. delete manually if you really want to remove the directory.`];return[]}function _v(I,_,O){let F=I.flatMap((J)=>{try{if(!fe(i(O,J)))return[];let K=Cu(J,O);if(K.length>0)return K;return Tv(J,_,O),[]}catch(K){return[`Failed to delete local rulebook source ${J}: ${K instanceof Error?K.message:String(K)}`]}});return F.length>0?{ok:!1,result:{ok:!1,errors:F,entries:[]}}:{ok:!0}}function Tv(I,_,O){if(_._testDeleteLocalSourceDir){_._testDeleteLocalSourceDir(I);return}U(i(O,rs(I,me))),at(i(O,I))}function lr(I,_){if(_===null){U(I);return}g(I,_)}function cr(I){return{ok:!1,errors:[I instanceof Error?I.message:String(I)],entries:[]}}var $v=".safety-net.json",Ov="~/.cc-safety-net/config.json";async function Eu(I,_){return[await Ru(I,{legacyPath:pa({cwd:_.cwd}),configPath:G(_.cwd),defaultRulebookName:"project-rules",migratedFrom:$v,cleanup:_.cleanup,syncOptions:{cwd:_.cwd}}),await Ru(I,{legacyPath:Ct(I),configPath:H(I),defaultRulebookName:"user-rules",migratedFrom:Ov,cleanup:_.cleanup,syncOptions:{cwd:_.cwd,global:!0}})].every((F)=>F)?0:1}async function Ru(I,_){let O=kn(I,_.syncOptions),F=i(O.filesystemScope,_.legacyPath),J=r(F);if(J===null)return console.log(`No legacy config found at ${_.legacyPath}`),!0;let K=Lv(J);if(!K.ok){for(let Pe of K.errors)console.error(Pe);return!1}let ne=m(O.configTarget);if(ne.errors.length>0){for(let Pe of ne.errors)console.error(Pe);return!1}let oe=ne.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},ue=Nv(Su(_.configPath),oe.rules,_.defaultRulebookName,_.migratedFrom,O.filesystemScope),pe=go(Su(_.configPath),ue,"rulebook.json"),we=i(O.filesystemScope,pe),xe=[Pu(O.configTarget),Pu(we)],Se=await Dv(I,_,O.configTarget,we,ue,K.config.rules,oe.rules.includes(ue)?oe.rules:[...oe.rules,ue],oe.overrides??{},oe.transparent_wrappers??[]);if(!Se.ok){Hv(xe);for(let Pe of Se.errors)console.error(Pe);return!1}if(!_.cleanup)return console.log(`Migrated legacy config at ${_.legacyPath}. Legacy file is no longer used.`),!0;if(!Fv(O.configTarget,we,ue,_.migratedFrom,K.config.rules))return console.error(`Migration cleanup verification failed for ${_.legacyPath}`),!1;return U(F),console.log(`Deleted legacy config at ${_.legacyPath}`),!0}async function Dv(I,_,O,F,J,K,ne,oe,ue){try{return wn(O,{version:1,rules:ne,overrides:oe,transparent_wrappers:ue}),wn(F,jv(J,_.migratedFrom,K)),await mo(I,_.syncOptions)}catch(pe){return{ok:!1,errors:[pe instanceof Error?pe.message:String(pe)]}}}function Lv(I){try{let _=JSON.parse(I),O=Po(_);if(O.errors.length>0)return{ok:!1,errors:O.errors};return{ok:!0,config:{version:1,rules:_.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function Nv(I,_,O,F,J){let K=_.find((ne)=>Mv(i(J,go(I,ne,"rulebook.json")))===F);if(K)return K;if(r(i(J,go(I,O,"rulebook.json")))===null)return O;for(let ne=2;;ne++){let oe=`${O}-${ne}`;if(r(i(J,go(I,oe,"rulebook.json")))===null)return oe}}function jv(I,_,O){return{rulebook_version:1,name:I,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:_,allowed_commands:[...new Set(O.map((F)=>F.command))],rules:O,tests:O.map((F)=>({command:[F.command,F.subcommand,F.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:F.name}))}}function Fv(I,_,O,F,J){if(!m(I).config?.rules.includes(O))return!1;try{let ne=r(_);if(ne===null)return!1;let oe=JSON.parse(ne);return oe.migrated_from===F&&JSON.stringify(oe.rules)===JSON.stringify(J)}catch{return!1}}function Pu(I){return{target:I,content:r(I)}}function Hv(I){for(let _ of I){if(_.content===null){U(_.target);continue}g(_.target,_.content)}}function Mv(I){let _=r(I);if(_===null)return null;try{let O=JSON.parse(_);return typeof O.migrated_from==="string"?O.migrated_from:null}catch{return null}}import{mkdir as Uv,readFile as Gv,writeFile as Bv}from"node:fs/promises";import{dirname as qv,join as Vv}from"node:path";var Jv=86400000,zv=604800000;async function Iu(I,_=Date.now()){if(I.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let O=We(I);if(!O)return null;let F=Vv(O,".cc-safety-net","update-check.json"),J=await Kv(F,_);if(!J.lastCheck||_-J.lastCheck>Jv){let oe=await Gn();if(J.lastCheck=_,oe.latestVersion)J.latestVersion=oe.latestVersion;if(!await Au(F,J))return null;if(oe.error)return null}let K=J.latestVersion,ne=pn();if(!K||!$o(K,ne))return null;if(J.notifiedVersion===K&&J.notifiedAt!==void 0&&_-J.notifiedAt<zv)return null;if(J.notifiedVersion=K,J.notifiedAt=_,!await Au(F,J))return null;return`UPDATE_AVAILABLE: cc-safety-net v${K} is available (running v${ne}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function Kv(I,_){let O=await Gv(I,"utf8").then((K)=>JSON.parse(K)).catch(()=>{return});if(!O||typeof O!=="object"||Array.isArray(O))return{};let F=O,J=(K)=>typeof K==="number"&&Number.isFinite(K)&&K<=_?K:void 0;return{lastCheck:J(F.lastCheck),latestVersion:typeof F.latestVersion==="string"?F.latestVersion:void 0,notifiedVersion:typeof F.notifiedVersion==="string"?F.notifiedVersion:void 0,notifiedAt:J(F.notifiedAt)}}async function Au(I,_){return Uv(qv(I),{recursive:!0,mode:448}).then(()=>Bv(I,JSON.stringify(_),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as Wv,resolve as is}from"node:path";var _u="CC Safety Net Config",Yv="═".repeat(_u.length),Zv="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",Xv=new Set(["rule.json","rule.lock","cache"]);function Tu(I,_={}){try{return Qv(I,_)}catch(O){if(O instanceof o)return console.error(O.message),1;throw O}}function Qv(I,_){let O=_.cwd??process.cwd(),F=Z(I,{cwd:O}),J=Ct(I),K=vr(O),ne=is(O,ge),oe=i(F.userScope,J),ue=i(F.projectScope,K),pe=!1,we=!1,xe=[],Se=[],Pe=eb(i(F.projectScope,ne));if(tb(),r(F.userConfigTarget)!==null){let Ce=Un(F.userConfigTarget);if(Ce.errors.push(...W(F.userConfigPath,F.userScope)),xe.push({scope:"User",path:F.userConfigPath,result:Ce,schema:"rules",target:F.userConfigTarget}),Ce.errors.length>0)pe=!0}if(r(oe)!==null)if(we=!0,r(F.userConfigTarget)!==null)Se.push(ho("user","cleanup"));else{let Ce=Eo(oe);if(xe.push({scope:"User",path:J,result:Ce,schema:"legacy",inactive:!0,target:oe}),Se.push(ho("user",Ce.errors.length>0?"fix-or-delete":"migrate")),Ce.errors.length>0)pe=!0}if(r(F.projectConfigTarget)!==null){let Ce=Un(F.projectConfigTarget);if(Ce.errors.push(...W(F.projectConfigPath,F.projectScope)),xe.push({scope:"Project",path:is(F.projectConfigPath),result:Ce,schema:"rules",target:F.projectConfigTarget}),Ce.errors.length>0)pe=!0;if(r(ue)!==null)we=!0,Se.push(ho("project","cleanup"))}else if(r(ue)!==null){we=!0,pe=!0;let Ce=Eo(ue);xe.push({scope:"Project",path:is(K),result:Ce,schema:"legacy",inactive:!0,target:ue}),Se.push(ho("project",Ce.errors.length>0?"fix-or-delete":"migrate"))}if(Pe?.result.errors.length)pe=!0;if(xe.length===0&&!Pe)return console.log(`
No config files found. Using built-in rules only.`),0;for(let Ce of xe)if(Ce.inactive)ob(Ce.scope,Ce.path,Ce.result);else if(Ce.result.errors.length>0)ib(Ce.scope,Ce.path,Ce.result.errors);else{if(Ce.schema==="rules"&&lb(Ce.target))console.log(`
Added $schema to ${Ce.scope.toLowerCase()} config.`);rb(Ce.scope,Ce.path,Ce.result,Ce.schema)}for(let Ce of Se)console.error(`
${nn.red(Ce)}`);if(Pe)if(Pe.result.errors.length>0)ab(Pe.path,Pe.result.errors);else sb(Pe.path,Pe.result);if(pe)return console.error(`
Config validation failed.`),1;return console.log(we?`
Configs valid with warnings.`:`
All configs valid.`),0}function ho(I,_){let O=`legacy ${I} config`;if(_==="cleanup")return`Warning: Legacy ${I} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(_==="migrate")return`Warning: Legacy ${I} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${I} config is no longer supported. Fix or delete the ${O}, then run \`npx -y cc-safety-net rule migrate\`.`}function eb(I){if(fe(I)===null)return null;let _=nb(I);if(_.ruleNames.size===0&&_.errors.length===0)return null;return{path:I.path,result:_}}function nb(I){let _=[],O=new Set,F=(fe(I)??[]).filter((J)=>!Xv.has(J.name)).sort((J,K)=>J.name.localeCompare(K.name));if(F.length===0)return{errors:_,ruleNames:O};for(let J of F){if(!d.test(J.name)){_.push(`rulebook directory names must match ${d}: ${J.name}`);continue}if(J.kind!=="directory"){_.push(`${J.name} must be a rulebook directory`);continue}let K=i(I.scope,Wv(I.path,J.name,"rulebook.json")),ne=r(K);if(ne===null){_.push(`${J.name}/rulebook.json is required`);continue}try{let oe;try{oe=JSON.parse(ne)}catch{_.push(`${J.name}/rulebook.json: invalid JSON`);continue}let ue=ce(oe);if(ue.name!==J.name){_.push(`rulebook name "${ue.name}" must match folder "${J.name}"`);continue}let pe=ao(ue);if(pe.length>0){_.push(...pe.map((we)=>`${J.name}/rulebook.json: ${we}`));continue}O.add(J.name)}catch(oe){_.push(oe instanceof Error?`${J.name}/rulebook.json: ${oe.message}`:`${J.name}/rulebook.json: ${String(oe)}`)}}return{errors:_,ruleNames:O}}function tb(){console.log(_u),console.log(Yv)}function rb(I,_,O,F){if(console.log(`
✓ ${I} config: ${_}`),console.log(`  Schema: ${F==="rules"?"rulebook sources":"legacy inline rules"}`),O.ruleNames.size>0){console.log(`  ${F==="rules"?"Sources":"Rules"}:`);let J=1;for(let K of O.ruleNames)console.log(`    ${J}. ${K}`),J++}else console.log(`  ${F==="rules"?"Sources":"Rules"}: (none)`)}function ob(I,_,O){if(console.error(`
✗ Legacy ${I.toLowerCase()} config: ${_}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),O.errors.length>0){console.error("  Errors:");let F=1;for(let J of O.errors)for(let K of J.split("; "))console.error(`    ${F}. ${K}`),F++;return}if(O.ruleNames.size>0){console.error("  Rules:");let F=1;for(let J of O.ruleNames)console.error(`    ${F}. ${J}`),F++;return}console.error("  Rules: (none)")}function ib(I,_,O){$u(`${I} config`,_,O)}function sb(I,_){console.log(`
✓ GitHub source rules: ${I}`),console.log("  Rulebooks:");let O=1;for(let F of _.ruleNames)console.log(`    ${O}. ${F}`),O++}function ab(I,_){$u("GitHub source rules",I,_)}function $u(I,_,O){console.error(`
✗ ${I}: ${_}`),console.error("  Errors:");let F=1;for(let J of O)for(let K of J.split("; "))console.error(`    ${F}. ${K}`),F++}function lb(I){try{let _=r(I);if(_===null)return!1;let O=JSON.parse(_);if(O.$schema)return!1;return g(I,JSON.stringify({$schema:Zv,...O},null,2)),!0}catch(_){if(_ instanceof o)throw _;return!1}}var Ou=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),db=new Set(["add","remove","list"]),ub="cc-safety-net/rulebooks";async function Du(I,_){try{return await pb(I,_)}catch(O){if(O instanceof o)return console.error(O.message),1;throw O}}async function pb(I,_){let O=mb(_),F=O.help?fb(O.positionals):null;if(F)return Lt(F),0;if(O.errors.length>0){for(let oe of O.errors)console.error(oe);return 1}let J=O.positionals[0];if(!J)return Lt(xt,console.error),1;let K=O.positionals[1],ne={global:O.global};if(J==="init"){let oe=kn(I,ne);vb(oe.configTarget);let ue=cb(oe.configDir,"example-rules","rulebook.json"),pe=i(oe.filesystemScope,ue);if(O.example&&r(pe)===null)ru(pe);let we=W(oe.configPath,oe.filesystemScope);for(let xe of we)console.error(xe);if(we.length>0)return 1;return console.log("Rule config initialized."),0}if(J==="add"){let oe=Lu(O);if(!oe)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let ue=kn(I,ne),pe=await ku(I,oe,{...ne,ref:O.ref,rulebooks:O.only.length>0?O.only:void 0});return Xd(pe,oe,`Scope: ${O.global?"user":"project"} (${ue.configDir})`),pe.ok?0:1}if(J==="remove"){if(!K)return console.error("rule remove requires a source"),1;let oe=await xu(I,K,{...ne,deleteSource:O.deleteSource});return so(oe,`Removed rulebook source: ${K}`),oe.ok?0:1}if(J==="update"){let oe=await mo(I,{...ne,only:K,refresh:!0});return so(oe,"Rule config updated."),oe.ok?0:1}if(J==="sync")return ga(I,{global:O.global});if(J==="list"){let oe=X(I,{cwd:process.cwd()});return eu(oe),oe.errors.length>0?1:0}if(J==="wrapper")return bb(I,O);if(J==="migrate")return Eu(I,{cleanup:O.cleanup,cwd:process.cwd()});if(J==="doc"){console.log(Yd);let oe=await Iu(I);if(oe)console.error(oe);return 0}if(J==="verify")return Tu(I);return 1}function fb(I){if(I.length===0)return xt;let _=xt.subcommands.filter((F)=>F.usage.split(" ")[0]===I[0]);if(_.length===0)return null;if(I.length===1&&_.length>1)return{name:`rule ${I[0]}`,description:`Subcommands of rule ${I[0]}`,usage:`rule ${I[0]} <subcommand>`,subcommands:_,options:[]};let O=I.length===1?_[0]:_.find((F)=>F.usage.split(" ")[1]===I[1]);if(!O)return null;return{name:`rule ${I[0]}`,description:O.description,usage:`rule ${O.usage}`,options:I[0]==="add"?Co:[],examples:I[0]==="add"?So:void 0}}function mb(I){let _=gn({label:"rule",booleans:{global:["-g","--global"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},I),O={..._.flags,ref:_.values.ref,only:_.lists.only??[],help:_.help,positionals:_.positionals,errors:_.errors};return gb(O),O}function gb(I){let[_]=I.positionals;if(_&&!Ou.has(_))I.errors.push(`Unknown rule subcommand: ${_}`);if(I.deleteSource&&_!=="remove")if(_&&Ou.has(_))I.errors.push(`Unknown option for rule ${_}: --delete-source`);else I.errors.push("--delete-source is only valid with 'rule remove'");if(I.cleanup&&_!=="migrate")I.errors.push(dr(_,"--cleanup"));if(I.example&&_!=="init")I.errors.push(dr(_,"--example"));if(I.ref&&_!=="add")I.errors.push(dr(_,"--ref"));if(I.only.length>0&&_!=="add")I.errors.push(dr(_,"--only"));if(_==="add")hb(I);if(_==="migrate"){if(I.global)I.errors.push(dr(_,"--global"));if(I.positionals.length>1)I.errors.push(`Unexpected rule migrate argument: ${I.positionals[1]}`)}else if(_==="wrapper")yb(I);else if(I.positionals.length>2)I.errors.push(`Unexpected rule argument: ${I.positionals[2]}`);if(_==="list"&&I.global)I.errors.push("Unknown option for rule list: --global")}function Lu(I){if(I.positionals[1])return I.positionals[1];if(I.ref||I.only.length>0)return ub;return}function hb(I){let _=Lu(I);if(!_)return;if((I.ref||I.only.length>0)&&!Y(_)){if(I.ref)I.errors.push(`--ref can only select a ref for an owner/repo source: ${_}`);if(I.only.length>0)I.errors.push("--only can only select rulebooks from an owner/repo source");return}if(I.ref&&!se(I.ref))I.errors.push(`--ref must use valid path segments: ${I.ref}`);let O=I.only.filter((F)=>!d.test(F));if(O.length>0)I.errors.push(`Invalid rulebook names: ${O.join(", ")}`)}function dr(I,_){return I?`Unknown option for rule ${I}: ${_}`:`Unknown option for rule: ${_}`}function yb(I){let _=I.positionals[1],O=I.positionals[2];if(!_){I.errors.push("rule wrapper requires add, remove, or list");return}if(!db.has(_)){I.errors.push(`Unknown rule wrapper action: ${_}`);return}if(_==="list"){if(O)I.errors.push(`Unexpected rule wrapper argument: ${O}`);return}if(!O){I.errors.push(`rule wrapper ${_} requires a command`);return}if(I.positionals.length>3)I.errors.push(`Unexpected rule wrapper argument: ${I.positionals[3]}`)}function vb(I){if(r(I)===null){tu(I);return}let _=m(I);if(!_.config)return;wn(I,{version:1,rules:_.config.rules,overrides:_.config.overrides??{},transparent_wrappers:_.config.transparent_wrappers??[]})}async function bb(I,_){let O=_.positionals[1],F=_.positionals[2],J=kn(I,{global:_.global}).configTarget;if(O==="list"){let ue=m(J);if(ue.errors.length>0){for(let pe of ue.errors)console.error(pe);return 1}return wb(ue.config?.transparent_wrappers??[]),0}if(!F||!w.test(F))return console.error("transparent wrapper must match command pattern"),1;if(Ie(F))return console.error(`reserved command "${F}" cannot be a wrapper`),1;let K=m(J);if(K.errors.length>0){for(let ue of K.errors)console.error(ue);return 1}let ne=K.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},oe=O==="add"?[...new Set([...ne.transparent_wrappers??[],F])]:(ne.transparent_wrappers??[]).filter((ue)=>ue!==F);return wn(J,{version:1,rules:ne.rules,overrides:ne.overrides??{},transparent_wrappers:oe}),console.log(O==="add"?`Added transparent wrapper: ${F}`:`Removed transparent wrapper: ${F}`),0}function wb(I){if(I.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${I.length}):`);for(let _ of I)console.log(`  - ${_}`)}import{sep as Pb}from"node:path";import{existsSync as kb,readFileSync as xb}from"node:fs";import{join as Cb}from"node:path";async function Sb(I){if(I.isTTY)return null;return(await Ke(I).catch(()=>null))?.trim()||null}function Rb(I){let _=I.env.get("CLAUDE_SETTINGS_PATH");if(_)return _;return Cb(Ar(I),"settings.json")}function ss(I){let _=Rb(I);if(!kb(_))return!1;try{let O=xb(_,"utf-8"),F=JSON.parse(O);if(!F.enabledPlugins)return!1;let J="cc-safety-net@cc-marketplace";if(!(J in F.enabledPlugins))return!1;return F.enabledPlugins[J]===!0}catch(O){if(v(n.debug,I.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${_}: ${O instanceof Error?O.message:String(O)}`);return!1}}async function as(I,_=process.stdin){let O=ss(I),F;if(!O)F="\uD83D\uDEE1️ CC Safety Net ❌";else{let K=E(I,{cwd:process.cwd()}),ne=K.policy,oe=T(ne,I.env),ue=Object.values(z(ne,oe.capabilities)).some((xe)=>xe.changesInherited),pe={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[ue?"custom":oe.effectiveLevel],we=K.policyScopes&&!K.policyScopes.weakeningsIgnored&&K.policyScopes.weakenings.length>0?"\uD83D\uDD3B":"";F=`\uD83D\uDEE1️ CC Safety Net ${pe}${oe.worktreeMode?"\uD83C\uDF33":""}${we}${K.state==="degraded"?"⚠️":""}`}let J=await Sb(_);if(J&&!J.startsWith("{"))console.log(`${J} | ${F}`);else console.log(F)}function Nu(I){let _=E(I,{cwd:process.cwd()}),O=_.policy,F=T(O,I.env),J=!!process.env.NO_COLOR||!process.stdout.isTTY,K=Math.min(process.stdout.columns||80,100),ne=J?"ok":"✔",oe=J?"OFF":"✘",ue=(qe,Fe)=>{let en=`  ${qe.padEnd(13)}${Fe}`;return(en.length>K?`${en.slice(0,K-1)}…`:en).replaceAll(oe,nn.red(oe))},pe=Object.values(z(O,F.capabilities)).some((qe)=>qe.changesInherited),we=(qe)=>qe===I.home||qe.startsWith(`${I.home}${Pb}`)?`~${qe.slice(I.home.length)}`:qe,xe={ready:nn.green,degraded:nn.yellow}[_.state],Se=_.policyScopes?.weakenings??[],Pe=[...ss(I)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],..._.diagnostics],Ce=J?"-":"·";console.log([`${J?"":"\uD83D\uDEE1️  "}CC Safety Net — ${xe(_.state)}`,"",ue("Protection",`destructive ${O.destructiveCommandProtectionEnabled?ne:oe}   secrets ${O.secretProtection.enabled?ne:oe}`),ue("Level",pe?`${F.effectiveLevel} (customised)`:F.effectiveLevel),ue("Rules",O.rules.length===0?"none active":`${O.rules.length} active`),ue("Policy",we(l(I))),..._.policyScopes?[ue("Project",we(b(process.cwd())))]:[],...F.worktreeMode?[ue("Worktree","relaxations active")]:[],"",...Se.length===0?[]:[_.policyScopes?.weakeningsIgnored?"  Project policy (ignored)":"  Project policy",...Se.flatMap((qe)=>Xt(qe,"      ",K-6).map((Fe,en)=>en===0?`    ${Fe}`:Fe)),""],...Pe.length===0?["  Everything configured is active."]:["  Not active",...Pe.flatMap((qe)=>Xt(qe,"      ",K-6).map((Fe,en)=>en===0?`    ${Ce} ${Fe}`:Fe)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as zu}from"node:child_process";import{randomBytes as Nb}from"node:crypto";import{existsSync as jb}from"node:fs";import{createServer as Fb}from"node:http";import{Writable as Hb}from"node:stream";var yo=500;function Eb(I){let _=I.filter((J)=>J.decision!=="allow"),O=I.filter((J)=>J.decision==="allow"),F=Math.min(_.length,Math.max(yo-O.length,Math.ceil(yo/2)));return[..._.slice(0,F),...O.slice(0,yo-F)]}function ju(I,_,O=M(I)){if(O)q(I,O);let F=(Fe)=>new Date(Fe.getFullYear(),Fe.getMonth(),Fe.getDate()).getTime(),J=F(new Date),K=new Date(J);K.setDate(K.getDate()-(_-1));let ne=K.getTime(),oe=[],ue={count:0};for(let Fe of O?zn(O,ue):[])for(let en of kt(Fe,ue)){let on=new Date(en.ts).getTime();if(!Number.isFinite(on))continue;if(on>=ne)oe.push(en)}oe.sort((Fe,en)=>new Date(en.ts).getTime()-new Date(Fe.ts).getTime());let pe=Array.from({length:_},()=>0),we=Array.from({length:_},()=>0),xe={},Se={},Pe={},Ce=0,qe=0;for(let Fe of oe){let en=Fe.agent||"unknown";xe[en]=(xe[en]??0)+1;let on=Math.round((J-F(new Date(Fe.ts)))/86400000),sn=_-1-on,an=on>=0&&on<_;if(an)we[sn]=(we[sn]??0)+1;if(Fe.decision!=="allow"){if(Ce++,Fe.ruleId)Se[Fe.ruleId]=(Se[Fe.ruleId]??0)+1;let rn=ko(Fe.segment||Fe.command);if(rn)Pe[rn]=(Pe[rn]??0)+1;if(Fe.failureStage)qe++;if(an)pe[sn]=(pe[sn]??0)+1}}return{days:_,logsDir:O,homeDir:I.home,totalInWindow:oe.length,truncated:oe.length>yo,unreadable:ue.count,counts:{blocked:Ce,allowed:oe.length-Ce,agents:xe,blockedByDay:pe,analyzedByDay:we,rules:Se,commands:Pe,errors:qe},entries:Eb(oe).sort((Fe,en)=>new Date(en.ts).getTime()-new Date(Fe.ts).getTime())}}import{spawn as Ab}from"node:child_process";import{existsSync as Ib,statSync as Fu}from"node:fs";import{delimiter as _b,join as Tb}from"node:path";var $b=120000,vo="Choose the project folder",Ob=`try
  return POSIX path of (choose folder with prompt "${vo}")
on error number -128
  return ""
end try`,Db=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${vo}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Hu=[{binary:"zenity",args:["--file-selection","--directory",`--title=${vo}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",vo]}],Mu=(I,_)=>(_.PATH??"").split(_b).some((O)=>{if(O.length===0)return!1;try{let F=Fu(Tb(O,I));return F.isFile()&&(F.mode&73)!==0}catch{return!1}});function ls(I,_){if(I==="darwin"||I==="win32")return!0;if(I!=="linux")return!1;if(!_.DISPLAY&&!_.WAYLAND_DISPLAY)return!1;return Hu.some((O)=>Mu(O.binary,_))}function Lb(I,_){if(I==="darwin")return{cmd:"osascript",args:["-e",Ob]};if(I==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",Db]};let O=Hu.find((F)=>Mu(F.binary,_));return O?{cmd:O.binary,args:O.args}:null}function cs(I=process.platform,_=process.env){let O=Lb(I,_);if(!O)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((F)=>{let J=Ab(O.cmd,O.args,{env:_,stdio:["ignore","pipe","pipe"]}),K="",ne=!1,oe=(pe)=>{if(ne)return;ne=!0,clearTimeout(ue),F(pe)},ue=setTimeout(()=>{J.kill(),oe({error:"The folder dialog timed out"})},$b);J.stdout.on("data",(pe)=>{K+=pe.toString()}),J.on("error",()=>oe({error:`Could not open the folder dialog (${O.cmd})`})),J.on("close",()=>{let pe=K.trim().replace(/\/+$/,"");if(!pe)return oe({cancelled:!0});if(!Ib(pe)||!Fu(pe).isDirectory())return oe({error:"That selection is not a folder on disk"});oe({path:pe})})})}var Uu=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CC Safety Net</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22512%22%20height%3D%22512%22%20viewBox%3D%220%200%20512%20512%22%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20rx%3D%22112%22%20fill%3D%22%2317161b%22%2F%3E%3Csvg%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22432%22%20height%3D%22432%22%20viewBox%3D%22-172.38%20-172.38%20824.77%20824.77%22%3E%3Cg%20transform%3D%22rotate(45%20240%20240)%22%3E%3Crect%20x%3D%22-30%22%20y%3D%2214%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22315%22%20y%3D%2214%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22-30%22%20y%3D%2294%22%20width%3D%22115%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22235%22%20y%3D%2294%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22155%22%20y%3D%22174%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%2275%22%20y%3D%22254%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22395%22%20y%3D%22254%22%20width%3D%22115%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22-30%22%20y%3D%22334%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22315%22%20y%3D%22334%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22-30%22%20y%3D%22414%22%20width%3D%22115%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22235%22%20y%3D%22414%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%2214%22%20y%3D%22155%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%2294%22%20y%3D%2275%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%2294%22%20y%3D%22395%22%20width%3D%2252%22%20height%3D%22115%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22174%22%20y%3D%22-30%22%20width%3D%2252%22%20height%3D%22195%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22174%22%20y%3D%22315%22%20width%3D%2252%22%20height%3D%22195%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22254%22%20y%3D%22-30%22%20width%3D%2252%22%20height%3D%22115%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22254%22%20y%3D%22235%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22334%22%20y%3D%22155%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22414%22%20y%3D%2275%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22414%22%20y%3D%22395%22%20width%3D%2252%22%20height%3D%22115%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%3C%2Fsvg%3E%0A">
  <script>
    (() => {
      const stored = localStorage.getItem('cc-safety-net-theme');
      if (stored === 'light' || stored === 'dark') document.documentElement.style.colorScheme = stored;
    })();
  </script>
  <style>
:root {
  color-scheme: light dark;

  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --bg: light-dark(#f3f4f6, #0c0e11);
  --surface: light-dark(#ffffff, #16191d);
  --surface-2: light-dark(#f6f7f9, #1c2025);
  --btn-hover-fill: light-dark(#e9ebef, #282c33);
  --field-bg: light-dark(#ffffff, #101317);

  --ink: light-dark(#171a1f, #e7eaed);
  --muted: light-dark(#5b626c, #99a1ac);
  --meta: light-dark(#6b7280, #838b95);

  --border: light-dark(#e3e6ea, #292d33);
  --border-strong: light-dark(#cfd4da, #363b42);

  --switch-track: light-dark(#8b929c, #626973);
  --switch-track-hover: #767d87;
  --switch-knob: #ffffff;

  --focus-ring: var(--ink);

  --accent: light-dark(#166534, #3fb950);
  --safe: #14532d;
  --safe-hover: #0f3d20;
  --danger: #7f1d1d;
  --danger-hover: #641414;

  --star: light-dark(#b7791f, #f2c94c);

  --ok-fg: light-dark(#15803d, #4ade80);
  --ok-bg: light-dark(#edfaf1, #10251a);
  --ok-border: light-dark(#b7e4c7, #1f5133);

  --err-fg: light-dark(#b42318, #ff8078);
  --err-bg: light-dark(#fef2f1, #2b1512);
  --err-border: light-dark(#f2c9c4, #5c2620);

  --warn-fg: light-dark(#b45309, #fbbf24);
  --warn-bg: light-dark(#fefaf0, #2a2008);
  --warn-border: light-dark(#f2ddb0, #5c4a1d);

  --master: light-dark(#1d4ed8, #4c8dff);
  --master-fg: light-dark(#1e40af, #9ec3ff);
  --master-bg: light-dark(#eef4fe, #101a2b);
  --master-border: light-dark(#c5d6f6, #23446e);

  --strict-fg: light-dark(#1e40af, #9ec3ff);
  --strict-bg: light-dark(#eef4fe, #101a2b);
  --strict-border: light-dark(#c5d6f6, #23446e);
  --paranoid-fg: light-dark(#6b21a8, #d8b4fe);
  --paranoid-bg: light-dark(#faf5ff, #21152c);
  --paranoid-border: light-dark(#e4ccf4, #513064);

  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;

  --topbar-h: 58px;

  font-family: var(--font-sans);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 14px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.brand {
  padding: 0 10px;
}

h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-logo {
  display: flex;
  color: light-dark(#17161b, #f5f4f0);
}

.brand-home {
  display: flex;
  color: inherit;
}

.brand-logo svg {
  width: auto;
  height: 30px;
}

.sidenav {
  display: grid;
  gap: 2px;
}

.sidenav a {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.sidenav a:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.sidenav a[aria-current='page'] {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.sidenav svg {
  width: 15px;
  height: 15px;
  flex: none;
}

.sidebar-foot {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding: 0 10px;
}

.sidebar-links {
  display: grid;
  gap: 5px;
  font-size: 12px;
}

.sidebar-links a {
  color: var(--meta);
  text-decoration: none;
}

.sidebar-links a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sidebar-links a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

.content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.app-foot {
  display: none;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  min-height: var(--topbar-h);
  padding: 12px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.topbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  max-width: 1040px;
  margin: 0 auto;
}

.topbar-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.app-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.25;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.app-status:empty {
  display: none;
}

.app-status.ok {
  color: var(--ok-fg);
  border-color: var(--ok-border);
  background: var(--ok-bg);
}

.app-status.error {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.dirty-chip {
  padding: 6px 12px;
  border: 1px solid var(--warn-border);
  border-radius: 999px;
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.view-search {
  display: flex;
  align-items: center;
  flex: 1 1 240px;
  min-width: 180px;
  max-width: 380px;
}

.topbar-search {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 440px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

button:not(:disabled),
select,
label.row:not(.row-disabled),
label.rule-control,
input[type='checkbox']:not(:disabled),
input[type='radio']:not(:disabled) {
  cursor: pointer;
}

button {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 14px;
  background: var(--surface);
  color: var(--ink);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

button:hover:not(:disabled) {
  background: var(--surface-2);
  border-color: var(--muted);
}

#theme-toggle,
#raw-copy,
#activity-refresh,
#integrations-refresh,
#rules-refresh,
#tester-run,
#reset-rule-customizations,
#reset-secret-customizations,
.rule-example-button {
  border-color: transparent;
}

#theme-toggle:hover:not(:disabled),
#raw-copy:hover:not(:disabled),
#activity-refresh:hover:not(:disabled),
#integrations-refresh:hover:not(:disabled),
#rules-refresh:hover:not(:disabled),
#tester-run:hover:not(:disabled),
#reset-rule-customizations:hover:not(:disabled),
#reset-secret-customizations:hover:not(:disabled),
.rule-example-button:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

button:disabled {
  opacity: 0.6;
  cursor: progress;
}

button.primary {
  background: var(--safe);
  border-color: var(--safe);
  color: #fff;
}

button.primary:hover:not(:disabled) {
  background: var(--safe-hover);
  border-color: var(--safe-hover);
}

button.danger {
  background: var(--danger);
  border-color: var(--danger);
  color: #fff;
}

button.danger:hover:not(:disabled) {
  background: var(--danger-hover);
  border-color: var(--danger-hover);
}

#theme-toggle {
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 7px;
  color: var(--muted);
}

#theme-toggle:hover {
  color: var(--ink);
}

#theme-toggle svg {
  width: 15px;
  height: 15px;
}

button.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--muted);
}

button.icon-button:hover:not(:disabled) {
  color: var(--ink);
}

button.icon-button.copied {
  color: var(--ok-fg);
}

button.icon-button.copied:hover:not(:disabled) {
  color: var(--ok-fg);
}

button.icon-button svg {
  width: 16px;
  height: 16px;
}

:where(button, input, textarea):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

main {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 28px 48px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.view {
  display: grid;
  gap: 18px;
}

.view[hidden] {
  display: none;
}

.view-head .panel-sub {
  margin-top: 0;
}

.policy-savebar {
  position: sticky;
  top: var(--topbar-h);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.savebar-actions {
  display: flex;
  gap: 8px;
}

.retention-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12.5px;
  font-weight: 600;
}

.retention-row input {
  width: 84px;
  text-align: right;
}

.retention-note {
  margin: 8px 0 0;
  font-size: 12px;
}

.tiles-window {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
}

.tiles-window:empty {
  display: none;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.tiles:empty {
  display: none;
}

.tile {
  display: grid;
  grid-template-columns: 1fr minmax(0, 168px);
  grid-template-areas:
    'value spark'
    'label spark';
  align-items: center;
  gap: 3px 16px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.tile strong {
  grid-area: value;
  align-self: end;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.tile span {
  grid-area: label;
  align-self: start;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
}

.view-all-link {
  align-self: center;
  padding: 8px 14px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.view-all-link:hover {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.protection-warning {
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

.dual-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

@media (max-width: 720px) {
  .dual-panels {
    grid-template-columns: 1fr;
  }
}

#top-rules,
#top-commands {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
}

.top-rule,
.top-command {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 7px 10px;
  border-color: transparent;
  background: transparent;
  border-radius: var(--radius-sm);
  text-align: left;
}

.top-rule:hover:not(:disabled),
.top-command:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

.top-rule .rule-id,
.top-command .rule-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.guard-errors {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--warn-border);
  border-radius: var(--radius);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12.5px;
  font-weight: 600;
  text-align: left;
}

.activity-controls {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.activity-controls-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.activity-days {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 650;
  color: var(--muted);
}

.activity-refresh {
  margin-left: auto;
}

@keyframes activity-refresh-spin {
  to {
    transform: rotate(360deg);
  }
}

.activity-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

.integrations-refresh,
.rules-refresh {
  margin-left: auto;
}

.integrations-refresh.spinning svg,
.rules-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

#integrations-list {
  display: grid;
  gap: 8px;
}

.integration-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.integration-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.integration-row .status {
  grid-column: 1 / -1;
}

.integration-row button.primary,
.integration-row button.danger {
  min-width: 88px;
  background: transparent;
  border-color: transparent;
  color: var(--ink);
}

.integration-row button.primary:hover:not(:disabled),
.integration-row button.danger:hover:not(:disabled) {
  color: #fff;
}

#rules-composer-panel .field + .field,
.rules-composer-actions {
  margin-top: 14px;
}

.rules-path-row {
  display: flex;
  gap: 8px;
}

.rules-path-row input {
  flex: 1 1 auto;
  min-width: 0;
}

.rules-path-row button {
  flex: none;
}

#rules-project-path[readonly] {
  border-color: var(--border);
  color: var(--muted);
}

.rules-composer-actions {
  display: flex;
  justify-content: flex-end;
}

#rules-list,
#rules-diagnostics {
  display: grid;
  gap: 8px;
}

.rulebook-card {
  display: grid;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.rulebook-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.rulebook-head code,
.rulebook-rule code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.rulebook-rule .rule-id {
  color: var(--muted);
}

.rulebook-rule p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule.rules-focus {
  margin: 0 -8px;
  padding: 10px 8px;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
}

select {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 10px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
}

.chip-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.chip-row:empty {
  display: none;
}

button.chip {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

button.chip[aria-pressed='true'] {
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

.chip-count {
  font-variant-numeric: tabular-nums;
}

button.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

button.filter-pill code {
  font-family: var(--font-mono);
}

.filter-pill-x {
  opacity: 0.7;
}

.feed-list {
  display: grid;
  gap: 8px;
}

.feed-item {
  display: grid;
  gap: 7px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.feed-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--meta);
}

.feed-meta time {
  margin-left: auto;
  white-space: nowrap;
}

.feed-copy,
.feed-report {
  width: 26px;
  height: 26px;
  margin: -4px 0;
  border: 0;
  background: transparent;
}

.feed-copy:hover:not(:disabled),
.feed-report:hover:not(:disabled) {
  background: transparent;
}

.feed-copy svg,
.feed-report svg {
  width: 14px;
  height: 14px;
}

.feed-copy.copied svg {
  width: 12px;
  height: 12px;
}

.feed-meta .rule-id {
  font-family: var(--font-mono);
  color: var(--muted);
  overflow-wrap: anywhere;
}

#tester-result .rule-id {
  font-family: var(--font-mono);
}

button.rule-id {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
}

button.rule-id:hover {
  color: var(--ink);
  text-decoration: underline;
}

.decision-badge {
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.decision-badge.deny {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.decision-badge.allow {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.decision-badge.error {
  color: var(--warn-fg);
  background: var(--warn-bg);
  border-color: var(--warn-border);
}

.agent-badge {
  padding: 1px 8px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  color: var(--muted);
  font-weight: 600;
}

.feed-command,
.rule-example-popover code {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 12px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.feed-command {
  padding: 8px 10px;
  max-width: 85ch;
  max-height: 7.2em;
  overflow: hidden;
}

.feed-command.clamped {
  mask-image: linear-gradient(180deg, #000 calc(100% - 1.6em), transparent);
}

.feed-command.expanded {
  max-height: none;
  mask-image: none;
}

.feed-toggle {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.feed-block {
  align-self: center;
  font-size: 11px;
}

.feed-day-sep {
  padding-top: 6px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.tile-spark {
  grid-area: spark;
  display: flex;
  align-items: stretch;
  gap: 2px;
  width: 100%;
  height: 40px;
}

.spark-col {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex: 1 1 0;
  min-width: 1px;
}

.spark-bar {
  width: 100%;
  background: var(--accent);
  border-radius: 1px;
}

.spark-bar.spark-zero {
  background: var(--border-strong);
}

.spark-col::after {
  content: attr(data-count);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease;
}

.spark-col:hover::after,
.spark-col:focus-visible::after {
  opacity: 1;
}

.spark-col:focus-visible {
  border-radius: var(--radius-sm);
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.feed-reason {
  margin: 0;
  max-width: 85ch;
  font-size: 12px;
}

.activity-count {
  margin: 12px 0 0;
  font-size: 12px;
}

.activity-count:empty {
  display: none;
}

.info-rows {
  display: grid;
  gap: 10px;
}

.info-row {
  display: grid;
  gap: 3px;
}

.info-row > span {
  font-size: 12px;
  font-weight: 650;
  color: var(--muted);
}

.info-row code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.danger-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.danger-row strong {
  font-size: 13px;
}

.danger-row p {
  margin: 4px 0 0;
  font-size: 12px;
}

.status {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-size: 13px;
  line-height: 1.45;
  white-space: pre-wrap;
}

.status:empty {
  display: none;
}

.protection-banner {
  padding: 10px 14px;
  border: 1px solid var(--err-fg);
  border-radius: var(--radius);
  background: var(--err-bg);
  color: var(--err-fg);
  font-weight: 600;
}

.status.ok {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.status.error {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.health-strip strong {
  color: var(--ink);
  font-weight: 650;
}

.recovery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border: 1px solid var(--err-border);
  border-radius: var(--radius);
  background: var(--surface);
}

.recovery[hidden] {
  display: none;
}

.recovery strong {
  display: block;
  font-size: 13px;
}

.recovery p {
  margin: 4px 0 0;
}

.muted {
  color: var(--muted);
  line-height: 1.45;
}

.confirm-dialog {
  width: min(420px, calc(100vw - 32px));
  padding: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--ink);
}

.rule-example-popover {
  position: fixed;
  inset: auto;
  width: min(360px, calc(100vw - 24px));
  margin: 0;
  padding: 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 4px 8px rgb(0 0 0 / 18%);
}

.rule-example-popover::backdrop {
  background: transparent;
}

.rule-example-popover > * {
  display: block;
}

.rule-example-label {
  margin-bottom: 3px;
  color: var(--muted);
  font-size: 11px;
}

.rule-example-popover strong {
  margin-bottom: 10px;
  font-size: 13px;
}

.rule-example-popover code {
  padding: 9px 10px;
}

.confirm-dialog::backdrop {
  background: rgb(0 0 0 / 48%);
}

.confirm-dialog form {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.confirm-dialog h2 {
  margin: 0;
}

.confirm-dialog p {
  margin: 0;
}

.dialog-detail {
  padding: 9px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  overflow-wrap: anywhere;
}

.dialog-detail code {
  font-family: var(--font-mono);
  font-size: 12px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}

.report-dialog {
  width: min(680px, calc(100vw - 32px));
}

.confirm-dialog:has(.dialog-rows:not([hidden])) {
  width: min(620px, calc(100vw - 32px));
}

.dialog-rows {
  max-height: 46vh;
  overflow: auto;
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
}

.diff-table th {
  padding: 4px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-weight: 600;
}

.diff-table td {
  padding: 5px 8px;
  border-bottom: 1px solid var(--border);
  overflow-wrap: anywhere;
  vertical-align: top;
}

.diff-table code {
  font-family: var(--font-mono);
  font-size: 11.5px;
}

.diff-before {
  color: var(--muted);
  text-decoration: line-through;
}

.diff-after {
  color: var(--ink);
  font-weight: 650;
}

.diff-warning {
  margin: 8px 0 0;
  padding: 7px 10px;
  border-left: 3px solid var(--warn-border);
  border-radius: var(--radius-sm);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
}

.view-head-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.project-draft-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid var(--master-border);
  border-radius: var(--radius);
  background: var(--master-bg);
}

.project-draft-bar[hidden] {
  display: none;
}

.project-draft-target strong {
  display: block;
  font-size: 13px;
}

.project-draft-target code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.project-draft-target p {
  margin: 4px 0 0;
  font-size: 12px;
}

.project-chip {
  flex: none;
  align-self: center;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--master-border);
  border-radius: 999px;
  background: var(--master-bg);
  color: var(--master-fg);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.project-chip.inherited {
  border-color: var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 600;
}

.rule-row > .project-chip {
  grid-column: 1 / -1;
  justify-self: end;
  margin-left: 0;
}

.project-field-line {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.project-chip-slot:empty {
  display: none;
}

.row:has(.project-chip.inherited) strong {
  color: var(--muted);
}

.report-field {
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.panel-title {
  min-width: 0;
}

.raw-json-head {
  flex-wrap: nowrap;
}

.raw-json-head .panel-title {
  flex: 1 1 auto;
}

.raw-json-head #raw-copy {
  flex: none;
}

.panel-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: -4px 0;
  padding: 4px 6px 4px 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.panel-toggle:hover {
  background: transparent;
  color: var(--ink);
}

.panel-chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  transition: transform 0.15s ease;
}

.panel-toggle[aria-expanded='false'] .panel-chevron,
:is(.rule-tier-head, .tier-collapse)[aria-expanded='false'] .panel-chevron {
  transform: rotate(-45deg);
}

h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.panel-sub {
  margin: 4px 0 0;
  font-size: 12.5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 8px;
}

label.row {
  display: flex;
  gap: 12px;
}

label.row,
.rule-row {
  align-items: flex-start;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

label.row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

label.row.row-disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

label.row.row-disabled:hover {
  border-color: var(--border);
  background: var(--surface);
}

:is(label.row, .rule-control) input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  margin: 1px 0 0;
  width: 34px;
  height: 20px;
  flex: none;
  border: 1px solid var(--switch-track);
  border-radius: 999px;
  background: var(--switch-track);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

:is(label.row, .rule-control) input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

:is(label.row, .rule-control) input[type='checkbox']:checked {
  background: var(--accent);
  border-color: var(--accent);
}

:is(label.row, .rule-control) input[type='checkbox']:checked::before {
  transform: translateX(14px);
}

:is(label.row, .rule-control):hover input[type='checkbox']:not(:checked) {
  border-color: var(--switch-track-hover);
  background: var(--switch-track-hover);
}

label.row.safety-override-row {
  display: grid;
  gap: 8px;
}

label.row.safety-override-row select {
  width: 100%;
}

:is(label.row, .rule-control) span {
  display: block;
  min-width: 0;
}

:is(label.row, .rule-control) strong {
  font-weight: 650;
  font-size: 13px;
}

:is(label.row, .rule-control) .rule-id {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
  word-break: break-all;
}

:is(label.row, .rule-control) small {
  display: block;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
}

#destructive-command > label.row {
  margin-bottom: 16px;
}

.preset-status {
  margin-bottom: 10px;
  font-weight: 700;
}

#safety-preset-status:empty {
  display: none;
}

.preset-status.customized {
  color: var(--master-fg);
}

.preset-standard {
  --preset-fg: var(--ok-fg);
  --preset-bg: var(--ok-bg);
  --preset-border: var(--ok-border);
}

.preset-strict {
  --preset-fg: var(--strict-fg);
  --preset-bg: var(--strict-bg);
  --preset-border: var(--strict-border);
}

.preset-paranoid {
  --preset-fg: var(--paranoid-fg);
  --preset-bg: var(--paranoid-bg);
  --preset-border: var(--paranoid-border);
}

#safety-level label.row:has(input:checked),
#safety-level label.row:has(input:checked):hover {
  border-color: var(--preset-border);
  background: var(--preset-bg);
  accent-color: var(--preset-fg);
}

#safety-level label.row:has(input:checked) strong {
  color: var(--preset-fg);
}

.panel-head-action {
  flex: none;
}

.rule-tier {
  overflow: clip;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
}

.rule-tier + .rule-tier,
#destructive-command-rules + .rule-tier {
  margin-top: 10px;
}

.rule-tier-enforced {
  border-color: var(--ok-border);
}

.rule-tier-strict {
  border-color: var(--strict-border);
}

.rule-tier-paranoid {
  border-color: var(--paranoid-border);
}

.rule-tier-head {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: var(--surface-2);
  color: var(--ink);
  text-align: left;
}

.rule-tier-head:hover:not(:disabled) {
  background: var(--surface-2);
}

.tier-collapse {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 12px;
  margin: -9px -10px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  text-align: left;
}

.tier-switch {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 30px;
  height: 16px;
  flex: none;
  padding: 0;
  border: 0;
  background: none;
}

.tier-switch::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: var(--switch-track);
  transition: background-color 0.18s ease;
}

.tier-switch::before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

.tier-switch:checked::after {
  background: color-mix(in srgb, var(--accent) 45%, transparent);
}

.tier-switch:checked::before {
  transform: translateX(14px);
  background: var(--accent);
}

.rule-tier-enforced .rule-tier-head,
.rule-tier-enforced .rule-tier-head:hover:not(:disabled) {
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.rule-tier-strict .rule-tier-head,
.rule-tier-strict .rule-tier-head:hover:not(:disabled) {
  background: var(--strict-bg);
  color: var(--strict-fg);
}

.rule-tier-paranoid .rule-tier-head,
.rule-tier-paranoid .rule-tier-head:hover:not(:disabled) {
  background: var(--paranoid-bg);
  color: var(--paranoid-fg);
}

.tier-label {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 1px;
}

.tier-label small,
.tier-counts {
  color: inherit;
  font-size: 11px;
}

.tier-counts {
  flex: none;
  font-weight: 500;
  text-align: right;
}

.tier-counts .count-off {
  color: var(--warn-fg);
}

.tier-content {
  padding: 12px;
  border-top: 1px solid var(--border);
}

.rule-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.rule-row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

.rule-row.row-disabled {
  background: var(--surface);
}

.rule-control {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: flex-start;
  gap: 12px;
}

.rule-row.row-disabled .rule-control {
  cursor: not-allowed;
  opacity: 0.62;
}

.rule-example-button {
  position: relative;
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  line-height: 1;
}

.rule-example-button::before {
  content: '';
  position: absolute;
  inset: -9px;
}

.rule-example-button:hover:not(:disabled) {
  color: var(--ink);
}

.inherit-button {
  grid-column: 1 / -1;
  justify-self: end;
  padding: 5px 8px;
  font-size: 11px;
}

label.row.master {
  align-items: center;
  padding: 12px 14px;
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

label.row.master:hover {
  border-color: color-mix(in srgb, var(--err-fg) 34%, var(--err-border));
  background: var(--err-bg);
}

label.row.master:not(:has(input:checked)) {
  border-left: 3px solid var(--err-fg);
}

label.row.master:has(input:checked) {
  border-color: var(--master-border);
  background: color-mix(in srgb, var(--master-bg) 72%, var(--surface));
}

label.row.master:has(input:checked):hover {
  border-color: color-mix(in srgb, var(--master) 42%, var(--master-border));
  background: var(--master-bg);
}

label.row.master strong {
  font-size: 15px;
}

label.row.master input[type='checkbox'] {
  margin: 0;
  width: 44px;
  height: 24px;
}

label.row.master input[type='checkbox']:checked {
  background: var(--master);
  border-color: var(--master);
}

label.row.master input[type='checkbox']::before {
  width: 18px;
  height: 18px;
}

label.row.master input[type='checkbox']:checked::before {
  transform: translateX(20px);
}

.master-badge {
  flex: none;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--err-border);
  border-radius: 999px;
  background: var(--err-bg);
  color: var(--err-fg);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

label.row.master:has(input:checked) .master-badge {
  border-color: var(--master-border);
  background: var(--master-bg);
  color: var(--master-fg);
}

.state-active {
  color: var(--ok-fg);
  font-weight: 700;
}

.state-disabled {
  color: var(--err-fg);
  font-weight: 700;
}

.destructive-command-group + .destructive-command-group {
  margin-top: 24px;
}

.destructive-command-group h3 {
  margin: 0 0 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

.empty {
  margin: 0;
  padding: 16px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  color: var(--muted);
  text-align: center;
}

#secret {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 4px;
}

.field-toggle .panel-toggle {
  justify-self: start;
  margin: -2px 0;
  padding: 2px 6px 2px 0;
  font-weight: 650;
}

#safety-level + .field,
.foldable-field-content + .field {
  margin-top: 14px;
}

#safety-overrides,
#workflow {
  margin-top: 4px;
}

.foldable-field-content {
  display: grid;
  gap: 4px;
}

.foldable-field-content > p {
  margin: 0;
  font-size: 12px;
}

.paths-content:not([hidden]) {
  display: grid;
  gap: 10px;
}

.paths-content > p.muted {
  margin: 0;
  font-size: 12px;
}

.field > span {
  font-size: 13px;
  font-weight: 650;
}

.field small {
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 400;
  line-height: 1.45;
}

input[type='search'],
input[type='text'],
textarea {
  width: 100%;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 9px 11px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
  transition: border-color 0.15s ease;
}

input[type='search']:hover,
input[type='text']:hover,
textarea:hover {
  border-color: var(--muted);
}

input[type='search']:focus,
input[type='text']:focus,
textarea:focus {
  border-color: var(--muted);
  outline: none;
}

input[type='text']:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.tester-row {
  display: flex;
  gap: 8px;
}

.tester-row input[type='text'] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.tester-row button {
  flex: none;
  align-self: center;
}

#tester-result {
  margin-top: 12px;
}

.tester-segment {
  margin-top: 6px;
}

.paths-add {
  display: flex;
  gap: 8px;
}

.paths-add input[type='text'] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.paths-add button {
  flex: none;
  align-self: center;
}

.paths-hint {
  margin: -6px 0 0;
  color: var(--err-fg);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.paths-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.path-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.path-item code {
  flex: 1 1 auto;
  min-width: 0;
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 12.5px;
  overflow-wrap: anywhere;
}

.path-item button:hover:not(:disabled) {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.path-item.row-disabled {
  opacity: 0.62;
}

.path-item.row-disabled button {
  cursor: not-allowed;
}

.path-item button {
  flex: none;
}

textarea {
  min-height: 96px;
  resize: vertical;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.55;
}

#raw {
  min-height: 280px;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.star-pitch {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  color: var(--ink);
  font-size: 12.5px;
  line-height: 1.45;
}

.star-pitch strong {
  font-variant-numeric: tabular-nums;
}

.star-mechanism {
  display: block;
  margin-top: 2px;
  color: var(--meta);
  font-size: 11.5px;
}

#star-slot {
  display: inline-flex;
  flex: none;
}

.star-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: none;
  white-space: nowrap;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--muted);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.star-cta:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--star) 45%, var(--border-strong));
  background: var(--surface-2);
  color: var(--ink);
}

.star-cta:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.star-icon {
  display: inline-flex;
  width: 15px;
  height: 15px;
  color: var(--star);
}

.star-icon svg {
  width: 15px;
  height: 15px;
}

.star-count {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  border-left: 1px solid var(--border-strong);
  padding-left: 8px;
  color: var(--muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.star-cta.starred:disabled {
  opacity: 1;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* !important: reduced-motion must win over every class-level transition */
    transition: none !important;
  }

  .activity-refresh.spinning svg,
  .integrations-refresh.spinning svg,
  .rules-refresh.spinning svg {
    animation: none;
  }
}

@media (max-width: 900px) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    z-index: 100;
    height: var(--topbar-h);
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 0 16px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .brand-logo svg {
    height: 20px;
  }

  .topbar {
    position: static;
    z-index: auto;
  }

  .topbar.has-search {
    position: sticky;
    top: var(--topbar-h);
    z-index: 95;
  }

  .policy-savebar {
    top: calc(var(--topbar-h) * 2);
  }

  .brand {
    flex: none;
    padding: 0;
  }

  main {
    flex: 1;
  }

  .app-foot {
    display: flex;
    justify-content: center;
    gap: 28px;
    padding: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
  }

  .app-foot a {
    color: var(--meta);
    text-decoration: none;
  }

  .app-foot a:hover {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .sidenav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 2px;
  }

  .sidenav a {
    padding: 15px 7px;
  }

  .sr-only-collapse {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .sidebar-foot {
    display: none;
  }
}

@media (max-width: 640px) {
  .topbar {
    padding: 10px 16px;
  }

  .topbar-row {
    flex-wrap: wrap;
  }

  .topbar.has-search .topbar-row {
    flex-wrap: nowrap;
  }

  main {
    padding: 18px 16px 40px;
  }

  .topbar-search {
    max-width: none;
  }

  .panel {
    padding: 16px;
  }

  .star-row {
    flex-wrap: wrap;
  }

  .star-row .star-cta,
  .star-row #star-slot {
    flex: 1 1 100%;
    justify-content: center;
  }

  .panel-head {
    flex-direction: column;
  }

  .raw-json-head,
  .panel-head:has(.view-all-link) {
    flex-direction: row;
    align-items: center;
  }

  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .rule-tier-head,
  .tier-collapse {
    flex-wrap: wrap;
  }

  .rule-row {
    align-items: start;
  }

  .tier-counts {
    flex: 1 1 100%;
    padding-left: 20px;
    text-align: left;
  }

  .inherit-button {
    align-self: flex-start;
  }
}

@media (min-width: 1440px) {
  body[data-view='overview'] main,
  body[data-view='overview'] .topbar-row {
    max-width: 1200px;
  }
}

[hidden] {
  display: none;
}

  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <h1 class="brand-logo"><a class="brand-home" href="#overview" title="Overview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 476.62 104" role="img" aria-label="CC Safety Net"><defs><style>@font-face{font-family:'Exo 2 Kit';font-style:italic;font-weight:700;src:url(data:font/woff2;base64,d09GMgABAAAAAAbUAA8AAAAADAQAAAZ7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGjYbgyQcVgZgP1NUQVRAAGwRCAqJMIdOCxgAATYCJAMsBCAFhDAHIBsHClEU84FMI2Xh/P0gqJpmz2glW7tm2AMGEwsNLDMfvC6JFAYQpPIEwhmU0xSaCF+QTsL/fr9W/1uXRBItlZA9tc/Z9Yv5Q0SSmDWGUAhNRJtlK9FLKKzDiVzMJj0vnDSdSSQEYLKYQBuCGLPALmhtxAISi2ZWHkV0ILcjDR6rs5GDaEcLyx1kdcyODZDVPebrJ2ugbWKILNkBQClYW9HvGxsiWjnNmOQ2JJovesQSRNmQRxoiskig7/FcAHZApkhZYgQ4vYi+qS95Gzs6m+iq/1ig/tdrUQqZrv4fjgwrgfpH/e7GW5n6Rzb9rL5X3/AAgsmcGyQaVq7JNiJbGiDQZxuRxpooiyzIdHCygPSC5IIkIFKwSFffp0/wUjYjKS5NoogLGOjtbnM8VaGhpYcTCWfSUjvZhhtRk4XySaxdpF961G+UqQ3YJJrZLFYS7HMtUh3GLHs+p7KqsoDrMJm1fKF2iC7aKbHDRFwSXCG+l/fnQdB25gYOKUdhafl0d8/Ev9X3TrQNCAYogYfEsePJ6XcDIkE+aQUGZDElS2BgChoenkQCb1eZHKGSOtroYoLZtB/wLvNdq75WT6sH1b3qBnWtukCdgz+U6igQShF/JUOyNCFZJfr1MiFZOyaLnIwFRmUW0AYPWrx061Lb+kxrvDXVyMy0tjTqLbHTwJjYnJjGp/YHQi8tc9z88su6/9Vng45g6C0jENnhfDGo+8Nhd0R+6HTjpbfquv/2rPrLr8/ST16b4dFbrrjDMAK3ZXovuy/TuPyG7Ib+QKjAcXM4rPsfvPHSjEsvu22Z87X3QmZQ3Fv3h13ul0IvGYFX7si+4vLbl7tefz+cf0NEFHQHQnb9D3+x/633mtcGb1txyzsfbFh3r8g+Gpy3czo9uns56BDzymeDRx1u9y2P/CLj4aXwT+UEQ48ZgUhkhfPGoK9H9QdeemmZQ/c/mtMY8MztbiPwRH5LJOJ0xLjd/Z4PFZ3Y2KYtKytYWYfM1o6jlwQ37O/v73Ps7++bmI0fbR0JDx8dmWNZVmJjm1AeGdoMne0IeN3GBh0HOR0H+47/9ql9Gn1m9n0WfSBpVlAV3nVM7PeauM3NbuRAaYXWwDZF2iOE1W3gy8gAWmccde8oddY6wmQ8F/50bf1ARjA/aBkrVUGtQ+mZVuBZ+mCJQ80mLVFUYBErNUGtRWlVmmNbxhaHh8ssJZYHzOfEQnHscF1eNIA2YKd06v4TI/YqqooRdgvH13JC60gb+dNZsyZgaeLjeTeYQgsIuaV6ZFg9EyySJdSi8LVsPNg1lNjs8IDyH5UCXAnVyeKiH6gIaBlPziUdcoFCeEFDY1VLvZSGhaPgkAJURRI/Etcax4TPRV3ADq+EqBCtdBkM8acG8n/WTmyMOum+94aU9/8kWIZ7JE1cEmziR2Lb9NVzFDEYBVzFT24KZagafAljfa6Nr4tkcvaRZg7DmKF1uBxVxJzJgMw2SeOKCqmtJbuMhakeWlnf0JhSETFCaifPzmNurIelamAwcovrEIBtbQEH3GHKZ1LEtMpIF1YNYgJVNa16jW9UBq5DCLa1PRzIPwZQuTI6s1ix6NIKmnp7RwtrwvDMtBSp1iS1Vk95QpnScY0vOaMZCCXYHVzJ/0V0Z4D0CrFjsjCpnT67jIWJMkZZz9CYUhExQmon72HF3qK6I/aC6qrHjZTrXjya2uRdsdfj2G8/WlVdm3VQeyi1af/KvcV1++0F1dUPfBzTGtEbvBoA6lkEIOU5eY+UL7TE7/0t2mL5EuCta2OSAD5Zdv4v/7v//0j7WSvBQguGTaGAOu3L1vj/3f/9qf1s+ZKzaorXNGQla2UJS+Vb5MgC4mUNGXIrGeJcdZG4FFMWsEz+oS7iw/pscwadRDFAVM3j1AUG/mu6Zh/brxcaWorkv2WoJI1PQy1s5V5RFi3mbBlqJYuJUBt5uArj2F4Xi9IvegbJKZJp8mhKaDVeephhBuikhAnaGKCXDtz46KWbHib2nScYYZzdbBj5hnWdjyG6RkVDTIDxdtE4PtYzzBjdFDCjVt/MOmzmahhjnF7zk0w2s56NbGKjCd5SzeVkczwA9lf2UEkVlRSwx9UIUAa4oSOESmYZI4wAOPjqFkwc9ODD9Cu/mrFxQx8+OoD8EJM8gfj645is5Ix30xt51CTtrKeDYQYD+g8zTDcD+NgsGmeDm+R1RP2rWpqtqT9BXclmNgA=) format('woff2')}</style></defs><svg x="0" y="0" width="96" height="96" viewBox="-172.38 -172.38 824.77 824.77"><g transform="rotate(45 240 240)"><rect x="-30" y="14" width="195" height="52" rx="9" fill="currentColor"/><rect x="315" y="14" width="195" height="52" rx="9" fill="currentColor"/><rect x="-30" y="94" width="115" height="52" rx="9" fill="currentColor"/><rect x="235" y="94" width="170" height="52" rx="9" fill="currentColor"/><rect x="155" y="174" width="170" height="52" rx="9" fill="currentColor"/><rect x="75" y="254" width="170" height="52" rx="9" fill="currentColor"/><rect x="395" y="254" width="115" height="52" rx="9" fill="currentColor"/><rect x="-30" y="334" width="195" height="52" rx="9" fill="currentColor"/><rect x="315" y="334" width="195" height="52" rx="9" fill="currentColor"/><rect x="-30" y="414" width="115" height="52" rx="9" fill="currentColor"/><rect x="235" y="414" width="170" height="52" rx="9" fill="currentColor"/><rect x="14" y="155" width="52" height="170" rx="9" fill="#e5602a"/><rect x="94" y="75" width="52" height="170" rx="9" fill="#e5602a"/><rect x="94" y="395" width="52" height="115" rx="9" fill="#e5602a"/><rect x="174" y="-30" width="52" height="195" rx="9" fill="#e5602a"/><rect x="174" y="315" width="52" height="195" rx="9" fill="#e5602a"/><rect x="254" y="-30" width="52" height="115" rx="9" fill="#e5602a"/><rect x="254" y="235" width="52" height="170" rx="9" fill="#e5602a"/><rect x="334" y="155" width="52" height="170" rx="9" fill="#e5602a"/><rect x="414" y="75" width="52" height="170" rx="9" fill="#e5602a"/><rect x="414" y="395" width="52" height="115" rx="9" fill="#e5602a"/></g></svg><text x="115.98" y="62.42" font-family="'Exo 2 Kit','Exo 2',sans-serif" font-style="italic" font-weight="700" font-size="56" letter-spacing="-0.56" fill="currentColor">CC Safety Net</text></svg>
</a></h1>
      </div>
      <nav class="sidenav" aria-label="Sections">
        <a href="#overview" data-nav="overview" title="Overview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="16" width="7" height="5" rx="1.5"></rect></svg><span class="sr-only-collapse">Overview</span></a>
        <a href="#activity" data-nav="activity" title="Activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"></path></svg><span class="sr-only-collapse">Activity</span></a>
        <a href="#policy" data-nav="policy" title="Policy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"></path></svg><span class="sr-only-collapse">Policy</span></a>
        <a href="#rules" data-nav="rules" title="Rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4"></path><path d="M9 12h6M9 16h4"></path></svg><span class="sr-only-collapse">Rules</span></a>
        <a href="#integrations" data-nav="integrations" title="Integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"></path></svg><span class="sr-only-collapse">Integrations</span></a>
        <a href="#settings" data-nav="settings" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"></path><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle></svg><span class="sr-only-collapse">Settings</span></a>
      </nav>
      <div class="sidebar-foot">
        <div class="sidebar-links">
          <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
          <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
        </div>
      </div>
    </aside>
    <div class="content">
      <header class="topbar" id="topbar">
        <div class="topbar-row">
          <h2 class="topbar-title" id="topbar-title">Overview</h2>
          <label class="view-search topbar-search" data-search-view="activity" hidden>
            <span class="sr-only">Filter activity</span>
            <input type="search" id="activity-search" autocomplete="off" placeholder="Filter by rule or command">
          </label>
          <label class="view-search topbar-search" data-search-view="policy" hidden>
            <span class="sr-only">Search all protections</span>
            <input type="search" id="policy-search" autocomplete="off" placeholder="Filter by name, category, or rule ID">
          </label>
          <div class="topbar-actions">
            <div class="app-status" id="app-status" role="status" aria-live="polite">Loading...</div>
            <button type="button" class="dirty-chip" id="dirty-chip" hidden>Unsaved policy changes · Review</button>
          </div>
        </div>
      </header>
      <main>
        <div class="protection-banner" id="protection-banner" role="alert" hidden></div>
        <div class="status" id="status" role="status" aria-live="polite"></div>

        <section class="view" data-view="overview">
          <div class="view-head">
            <p class="panel-sub muted">What CC Safety Net has been doing on this machine.</p>
          </div>
          <div class="status health-strip" id="health-strip" hidden></div>
          <p class="tiles-window" id="overview-window"></p>
          <div class="tiles" id="overview-tiles"></div>
          <div class="star-row" id="star-row" hidden>
            <p class="star-pitch"><span id="star-pitch-text"></span> <span class="star-mechanism" id="star-mechanism" hidden>One click via your GitHub CLI. No redirect.</span></p>
            <span id="star-slot"></span>
          </div>
          <section class="panel" id="protection-card" hidden></section>
          <div class="dual-panels">
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked commands</h2>
                </div>
              </div>
              <div id="top-commands"></div>
            </section>
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked rules</h2>
                </div>
              </div>
              <div id="top-rules"></div>
            </section>
          </div>
          <button type="button" class="guard-errors" id="guard-errors" hidden></button>
        </section>

        <section class="view" data-view="activity" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Audited commands from the local log, newest first. Commands are secret-redacted at write time.</p>
          </div>
          <section class="panel">
            <div class="activity-controls">
              <div class="activity-controls-row">
                <label class="activity-days"><span>Window</span>
                  <select id="activity-days"></select>
                </label>
                <button type="button" class="icon-button activity-refresh" id="activity-refresh" aria-label="Refresh activity" title="Refresh activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
              </div>
              <div class="chip-row" id="activity-decision" role="group" aria-label="Filter by decision"></div>
              <div class="chip-row" id="activity-agents" role="group" aria-label="Filter by agent"></div>
              <div class="chip-row" id="activity-command-filter"></div>
            </div>
            <div id="activity-feed"></div>
            <p class="muted activity-count" id="activity-count"></p>
          </section>
        </section>

        <section class="view" data-view="policy" hidden>
          <div class="view-head view-head-actions">
            <p class="panel-sub muted">Choose what CC Safety Net blocks. Changes apply after you save.</p>
            <button type="button" id="project-draft-enter">Draft project policy</button>
          </div>
          <div class="project-draft-bar" id="project-draft-bar" hidden>
            <div class="project-draft-target">
              <strong>Project policy draft</strong>
              <code id="project-draft-path"></code>
              <p class="muted">Only the fields you mark are written here; everything else keeps inheriting from each member's own policy.</p>
            </div>
            <div class="savebar-actions">
              <button type="button" id="project-draft-change" hidden>Change…</button>
              <button type="button" id="project-draft-exit">Exit draft</button>
            </div>
          </div>
          <p class="status error" id="project-draft-diagnostics" hidden></p>
          <div class="policy-savebar" id="policy-savebar" hidden><span>Unsaved changes</span><div class="savebar-actions"><button type="button" id="discard-changes">Discard</button><button class="primary" id="save">Save</button></div></div>
          <div class="recovery" id="recovery" hidden>
            <div>
              <strong>Policy repair available</strong>
              <p class="muted">Repair writes canonical JSON by preserving valid settings. If the JSON cannot be parsed, defaults are restored.</p>
            </div>
            <button class="primary" id="repair" type="button">Repair</button>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2 id="tester-label">Test a command</h2>
                <p class="panel-sub muted">Paste a shell command to see whether it is blocked under your current unsaved edits. Custom rulebook rules are enforced here too.</p>
              </div>
            </div>
            <div class="tester-row">
              <input type="text" id="tester-input" autocomplete="off" spellcheck="false" placeholder="Paste a shell command and press Enter" aria-labelledby="tester-label">
              <button type="button" id="tester-run">Test</button>
            </div>
            <div id="tester-result" class="status" hidden></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Safety preset</h2>
                <p class="panel-sub muted">Choose inherited protection defaults, then customize only what this workspace needs.</p>
              </div>
            </div>
            <div id="safety-preset-status" class="preset-status"></div>
            <div id="environment-overrides" class="status" hidden></div>
            <div class="grid" id="safety-level"></div>
            <div class="field field-toggle">
              <button class="panel-toggle" type="button" aria-expanded="false" aria-controls="safety-overrides-content"><span class="panel-chevron" aria-hidden="true"></span><span>Advanced overrides</span></button>
            </div>
            <div class="foldable-field-content" id="safety-overrides-content" hidden>
              <p class="muted">Inherit from the selected level unless a capability needs an explicit exception.</p>
              <div class="grid" id="safety-overrides"></div>
            </div>
            <div class="field">
              <span>Workflow</span>
              <small>Workflow exceptions are separate from safety level.</small>
            </div>
            <div class="grid" id="workflow"></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Destructive Command Protection</h2>
                <p class="panel-sub muted" id="destructive-command-summary"></p>
              </div>
              <button type="button" id="reset-rule-customizations" class="panel-head-action">Restore defaults</button>
            </div>
            <div id="destructive-command"></div>
          </section>
          <section class="panel">
            <header class="panel-head">
              <div class="panel-title">
                <h2>Secret Protection</h2>
                <p class="panel-sub muted" id="secret-summary">Default sensitive paths and coding CLI credential locations can be disabled individually. Deny paths are blocked while Secret protection is on.</p>
              </div>
              <button type="button" id="reset-secret-customizations" class="panel-head-action">Restore defaults</button>
            </header>
            <div id="secret"></div>
          </section>
          <section class="panel">
            <div class="panel-head raw-json-head">
              <div class="panel-title">
                <h2>Policy JSON</h2>
                <p class="panel-sub muted" id="raw-source">Read-only mirror of the policy controls.</p>
              </div>
              <button class="icon-button" id="raw-copy" type="button" aria-label="Copy raw JSON to clipboard"></button>
            </div>
            <textarea id="raw" aria-label="Raw policy JSON" aria-describedby="raw-source" readonly></textarea>
          </section>
        </section>

        <section class="view" data-view="rules" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Custom rulebook rules enforced on this machine, and a prompt to hand rule authoring to your coding agent.</p>
          </div>
          <section class="panel" id="rules-composer-panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Create a rule</h2>
                <p class="panel-sub muted">CC Safety Net never writes rulebooks from here. Copy the prompt and paste it into your coding agent.</p>
              </div>
            </div>
            <div class="field">
              <span>Scope</span>
              <div class="chip-row" role="group" aria-label="Rule scope">
                <button type="button" class="chip" data-rules-scope="project" aria-pressed="true">Project</button>
                <button type="button" class="chip" data-rules-scope="user" aria-pressed="false">All projects</button>
              </div>
            </div>
            <div class="field" id="rules-project-path-field">
              <span id="rules-project-path-label">Project path</span>
              <div class="rules-path-row">
                <input type="text" id="rules-project-path" spellcheck="false" autocomplete="off" aria-labelledby="rules-project-path-label" aria-describedby="rules-project-path-hint">
                <button type="button" id="rules-choose-directory" hidden>Choose…</button>
              </div>
              <small id="rules-project-path-hint">Where the rulebook is written. Defaults to the directory this GUI was launched from.</small>
            </div>
            <div class="field">
              <span id="rules-composer-label">Request</span>
              <textarea id="rules-composer-input" spellcheck="false" placeholder="Describe the custom rules you want..." aria-labelledby="rules-composer-label" aria-describedby="rules-composer-hint"></textarea>
              <small id="rules-composer-hint">Rules match a command, its subcommand path, and exact arguments - not file paths or patterns.</small>
            </div>
            <div class="field">
              <span>Examples</span>
              <div class="chip-row">
                <button type="button" class="chip" data-rules-example="read my package.json and suggest blocking rules">Suggest rules</button>
                <button type="button" class="chip" data-rules-example="set up rules to block all terraform destroy commands">Block a command</button>
                <button type="button" class="chip" data-rules-example="verify my rules and fix any errors">Verify rules</button>
              </div>
            </div>
            <div class="rules-composer-actions">
              <button type="button" class="primary" id="rules-copy-prompt">Copy prompt</button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Rulebooks</h2>
                <p class="panel-sub muted">Read-only. Rules are shown as enforced, after overrides.</p>
              </div>
              <button type="button" class="icon-button rules-refresh" id="rules-refresh" aria-label="Refresh rules" title="Refresh rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="rules-list"><p class="empty">Loading rules…</p></div>
          </section>
          <section class="panel" id="rules-diagnostics-panel" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>Diagnostics</h2>
                <p class="panel-sub muted">Errors mean a rulebook was dropped and its rules are not enforced.</p>
              </div>
            </div>
            <div id="rules-diagnostics"></div>
          </section>
        </section>

        <section class="view" data-view="settings" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Appearance, file locations, and maintenance.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Appearance</h2>
                <p class="panel-sub muted">Theme preference is stored in this browser.</p>
              </div>
              <button type="button" id="theme-toggle"></button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Files</h2>
                <p class="panel-sub muted">Where CC Safety Net reads and writes on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>Policy file</span><code id="policy-path"></code></div>
              <div class="info-row" id="project-policy-row" hidden><span>Project policy</span><code id="project-policy-path"></code></div>
              <div class="info-row"><span>Audit logs</span><code id="logs-path"></code></div>
            </div>
            <p class="status" id="project-policy-notice" hidden></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Audit log retention</h2>
                <p class="panel-sub muted">How long decisions are kept before the sweep deletes them. Every analyzed command is recorded, so a long window grows the log.</p>
              </div>
            </div>
            <label class="retention-row">
              <span>Keep for</span>
              <input type="number" id="retention-days" min="1" max="365" step="1" inputmode="numeric" aria-describedby="retention-note">
              <span id="retention-unit">days</span>
            </label>
            <p class="muted retention-note" id="retention-note"></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Version</h2>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><code id="app-version"></code></div>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Danger zone</h2>
                <p class="panel-sub muted">Actions that discard saved configuration.</p>
              </div>
            </div>
            <div class="danger-row">
              <div>
                <strong>Reset policy</strong>
                <p class="muted">Restore the default policy JSON at the configured path.</p>
              </div>
              <button class="danger" id="reset">Reset</button>
            </div>
          </section>
        </section>

        <section class="view" data-view="integrations" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Install or remove the cc-safety-net hook for each coding agent on this machine.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Agents</h2>
                <p class="panel-sub muted">Detected CLIs and hook status.</p>
              </div>
              <button type="button" class="icon-button integrations-refresh" id="integrations-refresh" aria-label="Refresh integrations" title="Refresh integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="integrations-list"><p class="empty">Checking integrations…</p></div>
          </section>
          <section class="panel" id="integrations-system" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>System</h2>
                <p class="panel-sub muted">Runtime detected on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>cc-safety-net</span><code id="integrations-pkg-version"></code></div>
              <div class="info-row"><span>Node.js</span><code id="integrations-node-version"></code></div>
              <div class="info-row"><span>Platform</span><code id="integrations-platform"></code></div>
            </div>
          </section>
        </section>
      </main>
      <footer class="app-foot">
        <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
      </footer>
    </div>
  </div>
  <div class="rule-example-popover" id="rule-example-popover" popover="auto" role="dialog" aria-labelledby="rule-example-title" aria-describedby="rule-example-command">
    <span class="rule-example-label" id="rule-example-label">Blocked command example</span>
    <strong id="rule-example-title"></strong>
    <code id="rule-example-command"></code>
  </div>
  <dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-body confirm-dialog-detail">
    <form method="dialog">
      <h2 id="confirm-dialog-title"></h2>
      <p class="muted" id="confirm-dialog-body"></p>
      <div class="dialog-rows" id="confirm-dialog-rows" hidden></div>
      <p class="dialog-detail"><code id="confirm-dialog-detail"></code></p>
      <div class="dialog-actions">
        <button type="submit" id="confirm-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="danger" id="confirm-dialog-confirm" value="confirm"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog report-dialog" id="report-dialog" aria-labelledby="report-dialog-title" aria-describedby="report-dialog-body">
    <form method="dialog">
      <h2 id="report-dialog-title">Report false positive</h2>
      <p class="muted" id="report-dialog-body">This opens a prefilled GitHub issue form — it is public, and nothing is submitted until you submit it there. Paths were replaced with <code>&lt;project&gt;</code> and <code>~</code>; edit anything else you would rather not publish.</p>
      <label class="report-field"><span>Blocked command</span><textarea id="report-command" spellcheck="false"></textarea></label>
      <label class="report-field"><span>Audit log entry</span><textarea id="report-entry" spellcheck="false"></textarea></label>
      <div class="dialog-actions">
        <button type="submit" id="report-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="primary" id="report-dialog-open" value="report">Open GitHub form</button>
      </div>
    </form>
  </dialog>
  <script id="ccsn-data" type="application/json"></script>
  <script>
// src/audit/display.ts
var formatRelativeTime = (value) => {
  const diff = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(diff))
    return "";
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0)
    return \`\${days}d ago\`;
  if (hours > 0)
    return \`\${hours}h ago\`;
  if (minutes > 0)
    return \`\${minutes}m ago\`;
  return "just now";
};
var commandSignature = (source) => {
  const tokens = (source ?? "").trim().split(/\\s+/).filter((token) => token && !/^[A-Za-z_][A-Za-z0-9_]*=/.test(token));
  const binary = tokens[0]?.split("/").pop();
  if (!binary)
    return null;
  const next = tokens[1];
  return next && /^[a-z][a-z0-9-]*$/.test(next) ? \`\${binary} \${next}\` : binary;
};
function findSuspectEntries(entries) {
  const signatureKey = (entry) => \`\${entry.sessionId}
\${commandSignature(entry.segment || entry.command)}\`;
  const denials = entries.filter((entry) => entry.decision !== "allow");
  const repeats = denials.filter((entry) => entry.sessionId).reduce((counts, entry) => counts.set(signatureKey(entry), (counts.get(signatureKey(entry)) ?? 0) + 1), new Map);
  return new Set(denials.filter((entry) => entry.failureStage || (repeats.get(signatureKey(entry)) ?? 0) >= 2));
}

// src/core/policy/audit-retention-days.ts
var DEFAULT_AUDIT_RETENTION_DAYS = 30;
var MIN_AUDIT_RETENTION_DAYS = 1;
var MAX_AUDIT_RETENTION_DAYS = 365;

// src/core/policy/safety-level.ts
var SAFETY_LEVEL_CAPABILITIES = {
  standard: { fail_closed: false, paranoid_rm: false, paranoid_interpreters: false },
  strict: { fail_closed: true, paranoid_rm: false, paranoid_interpreters: false },
  paranoid: { fail_closed: true, paranoid_rm: true, paranoid_interpreters: true }
};

// src/hosts/catalog.ts
var DEEPSEEK_HARNESS_NPM_PROBE = [
  "npx",
  "--offline",
  "--no-install",
  "@deepseek-ai/dsh",
  "--version"
];
var catalog = [
  {
    id: "antigravity-cli",
    displayName: "Antigravity CLI",
    doctorOrder: 3,
    runtime: {
      order: 1,
      flags: ["-ac", "--agy-cli"],
      description: "Run as Antigravity CLI PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 2,
      flag: "--agy-cli",
      artifactKind: "hook config",
      probeCommand: ["agy", "--version"]
    }
  },
  {
    id: "claude-code",
    displayName: "Claude Code",
    doctorOrder: 1,
    runtime: {
      order: 2,
      displayName: "Coding CLI",
      flags: ["-cc", "--coding-cli"],
      legacyFlags: ["--claude-code"],
      description: "Run as Coding CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cc", "--claude-code"]
    },
    install: {
      order: 3,
      flag: "--claude-code",
      artifactKind: "plugin",
      probeCommand: ["claude", "--version"]
    }
  },
  {
    id: "codex",
    displayName: "Codex",
    doctorOrder: 4,
    runtime: {
      order: 3,
      flags: ["-cx", "--codex"],
      description: "Run as a Codex PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 4,
      flag: "--codex",
      artifactKind: "plugin",
      probeCommand: ["codex", "--version"]
    }
  },
  {
    id: "copilot-cli",
    displayName: "GitHub Copilot CLI",
    doctorOrder: 10,
    runtime: {
      order: 8,
      flags: ["-cp", "--copilot-cli"],
      description: "Run as GitHub Copilot CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cp", "--copilot-cli"]
    },
    install: {
      order: 10,
      flag: "--copilot-cli",
      artifactKind: "plugin",
      probeCommand: ["copilot", "--binary-version"]
    }
  },
  {
    id: "gemini-cli",
    displayName: "Gemini CLI",
    doctorOrder: 9,
    runtime: {
      order: 7,
      flags: ["-gc", "--gemini-cli"],
      description: "Run as Gemini CLI BeforeTool hook",
      legacyTopLevelFlags: ["-gc", "--gemini-cli"]
    },
    install: {
      order: 9,
      flag: "--gemini-cli",
      artifactKind: "extension",
      probeCommand: ["gemini", "--version"]
    }
  },
  {
    id: "grok-build",
    displayName: "Grok Build",
    doctorOrder: 11,
    runtime: {
      order: 9,
      flags: ["-gb", "--grok-build"],
      description: "Run as Grok Build PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 11,
      flag: "--grok-build",
      artifactKind: "hook config",
      probeCommand: ["grok", "--version"]
    }
  },
  {
    id: "hermes-agent",
    displayName: "Hermes Agent",
    doctorOrder: 12,
    runtime: {
      order: 10,
      flags: ["-ha", "--hermes-agent"],
      description: "Run as Hermes Agent pre_tool_call hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 12,
      flag: "--hermes-agent",
      artifactKind: "plugin",
      probeCommand: ["hermes", "--version"]
    }
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    doctorOrder: 13,
    runtime: {
      order: 11,
      flags: ["-kc", "--kimi-code"],
      description: "Run as Kimi Code PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 13,
      flag: "--kimi-code",
      artifactKind: "hook config",
      probeCommand: ["kimi", "--version"]
    }
  },
  {
    id: "openclaw",
    displayName: "OpenClaw",
    doctorOrder: 14,
    install: {
      order: 14,
      flag: "--openclaw",
      artifactKind: "plugin",
      probeCommand: ["openclaw", "--version"]
    }
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    doctorOrder: 15,
    install: {
      order: 15,
      flag: "--opencode",
      artifactKind: "plugin",
      probeCommand: ["opencode", "--version"]
    }
  },
  {
    id: "pi",
    displayName: "Pi",
    doctorOrder: 16,
    install: {
      order: 16,
      flag: "--pi",
      artifactKind: "package",
      probeCommand: ["pi", "--version"]
    }
  },
  {
    id: "cursor",
    displayName: "Cursor",
    doctorOrder: 5,
    runtime: {
      order: 4,
      flags: ["-cu", "--cursor"],
      description: "Run as Cursor preToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 5,
      flag: "--cursor",
      artifactKind: "hook config",
      probeCommand: ["cursor", "--version"]
    }
  },
  {
    id: "deepseek-harness",
    displayName: "DeepSeek Harness",
    doctorOrder: 6,
    install: {
      order: 6,
      flag: "--deepseek-harness",
      artifactKind: "package",
      probeCommand: DEEPSEEK_HARNESS_NPM_PROBE
    }
  },
  {
    id: "devin",
    displayName: "Devin CLI",
    doctorOrder: 7,
    runtime: {
      order: 5,
      flags: ["-dv", "--devin"],
      description: "Run as Devin CLI PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 7,
      flag: "--devin",
      artifactKind: "hook config",
      probeCommand: ["devin", "--version"]
    }
  },
  {
    id: "droid",
    displayName: "Factory Droid",
    doctorOrder: 8,
    runtime: {
      order: 6,
      flags: ["-fd", "--droid"],
      description: "Run as Factory Droid PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 8,
      flag: "--droid",
      artifactKind: "hook config",
      probeCommand: ["droid", "--version"]
    }
  },
  {
    id: "amp",
    displayName: "Amp Code",
    doctorOrder: 2,
    install: {
      order: 1,
      flag: "--amp",
      artifactKind: "plugin",
      probeCommand: ["amp", "--version"]
    }
  }
];
var doctorIntegrationOrder = catalog.slice().sort((a, b) => a.doctorOrder - b.doctorOrder).map((integration) => integration.id);
var runtimeHookIntegrationMetadata = catalog.filter((integration) => ("runtime" in integration)).slice().sort((a, b) => a.runtime.order - b.runtime.order).map((integration) => ({
  id: integration.id,
  displayName: "displayName" in integration.runtime ? integration.runtime.displayName : integration.displayName,
  flags: integration.runtime.flags,
  legacyFlags: "legacyFlags" in integration.runtime ? integration.runtime.legacyFlags : [],
  description: integration.runtime.description,
  legacyTopLevelFlags: integration.runtime.legacyTopLevelFlags
}));
var installIntegrationMetadata = catalog.slice().sort((a, b) => a.install.order - b.install.order).map((integration) => ({ id: integration.id, ...integration.install })).map(({ order: _, ...integration }) => integration);
var integrationDisplayNames = Object.fromEntries(catalog.map((integration) => [integration.id, integration.displayName]));

// src/gui/frontend/project-draft.ts
var clonePolicy = (policy) => JSON.parse(JSON.stringify(policy));
var markedOverrides = (marked, section, overrides) => Object.fromEntries(Object.entries(overrides).filter(([key, value]) => value !== undefined && marked.has(\`\${section}.overrides.\${key}\`)));
var withOverrides = (overrides) => Object.keys(overrides).length > 0 ? { overrides } : {};
var collectProjectProposal = (marked, policy) => {
  const sections = {
    safety: {
      ...marked.has("safety.level") ? { level: policy.safety.level } : {},
      ...withOverrides(markedOverrides(marked, "safety", policy.safety.overrides))
    },
    workflow: marked.has("workflow.worktree_mode") ? { worktree_mode: policy.workflow.worktree_mode } : {},
    destructive_command_protection: {
      ...marked.has("destructive_command_protection.enabled") ? { enabled: policy.destructive_command_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "destructive_command_protection", policy.destructive_command_protection.overrides)),
      ...marked.has("destructive_command_protection.allow_paths") ? { allow_paths: policy.destructive_command_protection.allow_paths } : {}
    },
    secret_protection: {
      ...marked.has("secret_protection.enabled") ? { enabled: policy.secret_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "secret_protection", policy.secret_protection.overrides)),
      ...marked.has("secret_protection.deny_paths") ? { deny_paths: policy.secret_protection.deny_paths } : {},
      ...marked.has("secret_protection.allow_paths") ? { allow_paths: policy.secret_protection.allow_paths } : {}
    }
  };
  return {
    version: 1,
    ...Object.fromEntries(Object.entries(sections).filter(([, fields]) => Object.keys(fields).length > 0))
  };
};
var projectMarkedFields = (projection) => {
  const destructive = projection.destructive_command_protection ?? {};
  const secret = projection.secret_protection ?? {};
  return [
    ...projection.safety?.level === undefined ? [] : ["safety.level"],
    ...Object.keys(projection.safety?.overrides ?? {}).map((key) => \`safety.overrides.\${key}\`),
    ...projection.workflow?.worktree_mode === undefined ? [] : ["workflow.worktree_mode"],
    ...destructive.enabled === undefined ? [] : ["destructive_command_protection.enabled"],
    ...Object.keys(destructive.overrides ?? {}).map((id) => \`destructive_command_protection.overrides.\${id}\`),
    ...destructive.allow_paths === undefined ? [] : ["destructive_command_protection.allow_paths"],
    ...secret.enabled === undefined ? [] : ["secret_protection.enabled"],
    ...Object.keys(secret.overrides ?? {}).map((id) => \`secret_protection.overrides.\${id}\`),
    ...secret.deny_paths === undefined ? [] : ["secret_protection.deny_paths"],
    ...secret.allow_paths === undefined ? [] : ["secret_protection.allow_paths"]
  ];
};
var overlayProjectProposal = (baseline, proposal) => {
  const displayed = clonePolicy(baseline);
  const destructive = proposal.destructive_command_protection ?? {};
  const secret = proposal.secret_protection ?? {};
  if (proposal.safety?.level)
    displayed.safety.level = proposal.safety.level;
  Object.assign(displayed.safety.overrides, proposal.safety?.overrides ?? {});
  if (proposal.workflow?.worktree_mode !== undefined)
    displayed.workflow.worktree_mode = proposal.workflow.worktree_mode;
  if (destructive.enabled !== undefined)
    displayed.destructive_command_protection.enabled = destructive.enabled;
  Object.assign(displayed.destructive_command_protection.overrides, destructive.overrides ?? {});
  if (destructive.allow_paths)
    displayed.destructive_command_protection.allow_paths = destructive.allow_paths;
  if (secret.enabled !== undefined)
    displayed.secret_protection.enabled = secret.enabled;
  Object.assign(displayed.secret_protection.overrides, secret.overrides ?? {});
  if (secret.deny_paths)
    displayed.secret_protection.deny_paths = secret.deny_paths;
  if (secret.allow_paths)
    displayed.secret_protection.allow_paths = secret.allow_paths;
  return displayed;
};
var seedProjectDraft = (data) => {
  if (!data.baseline)
    return null;
  if (!Array.isArray(data.userPolicyDiagnostics) || data.userPolicyDiagnostics.length > 0)
    return null;
  const marked = new Set(projectMarkedFields(data.projection ?? {}));
  const policy = overlayProjectProposal(data.baseline, data.projection ?? {});
  return {
    baseline: data.baseline,
    marked,
    policy,
    snapshot: JSON.stringify(collectProjectProposal(marked, policy))
  };
};

// src/gui/frontend/report.ts
var reportIssueUrl = "https://github.com/kenryu42/cc-safety-net/issues/new?template=false_positive.yml";
var reportUrlLimit = 8000;
var endsAtPathBoundary = (following) => following === "" || /^[/\\\\\\s'"]/.test(following);
var scrubReportPaths = (text, cwd, home) => [
  [cwd, "<project>"],
  [home, "~"]
].reduce((scrubbed, [from, to]) => from ? scrubbed.split(from).reduce((joined, part) => joined + (endsAtPathBoundary(part) ? to : from) + part) : scrubbed, text);
var buildReportUrl = (fields) => {
  const url = new URL(reportIssueUrl);
  Object.entries(fields).filter(([, value]) => value).forEach(([field, value]) => {
    url.searchParams.set(field, value);
  });
  return url.toString();
};
var buildReportRequest = (fields, dropped = []) => {
  const url = buildReportUrl(fields);
  if (url.length <= reportUrlLimit)
    return { url, dropped };
  const largest = Object.entries(fields).filter(([, value]) => value).sort((left, right) => right[1].length - left[1].length)[0];
  if (!largest)
    return { url, dropped };
  return buildReportRequest({ ...fields, [largest[0]]: "" }, [...dropped, largest[0]]);
};

// src/gui/frontend/rule-prompt.ts
var rulePromptText = (prompt) => {
  const names = prompt.rulesData?.rulebooks.map((rulebook) => rulebook.name) ?? [];
  return [
    "Use the cc-safety-net skill for this request.",
    "If that skill is not available, run \`npx -y cc-safety-net rule doc\` first and treat its output as the source of truth for schema, paths, and validation.",
    "",
    prompt.rulesScope === "project" ? \`Scope: this project - \${prompt.projectPath.trim()}\` : "Scope: all projects (user scope)",
    \`Existing rulebooks (names must stay unique across both scopes): \${names.length > 0 ? names.join(", ") : "none"}\`,
    "",
    prompt.request.trim()
  ].join(\`
\`);
};

// src/gui/frontend/main.ts
var token = JSON.parse(document.getElementById("ccsn-data").textContent).token;
var fallbackRepoUrl = "https://github.com/kenryu42/cc-safety-net";
var safetyLevels = {
  standard: [
    "Standard",
    "Blocks recognizable destructive commands and sensitive content access while allowing metadata-only sensitive-path checks. Recommended for normal coding."
  ],
  strict: [
    "Strict",
    "Standard, plus blocks dynamic or unparseable commands and metadata-only sensitive-path discovery. Occasional false positives on advanced shell."
  ],
  paranoid: [
    "Paranoid",
    "Strict, plus blocks rm -rf inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos."
  ]
};
var safetyOverrides = {
  fail_closed: ["Fail closed", "Block commands the parser cannot fully understand."],
  paranoid_rm: ["Paranoid rm -rf checks", "Block non-temp rm -rf inside the project."],
  paranoid_interpreters: ["Paranoid interpreters", "Block interpreter one-liners."]
};
var rawCopyIcons = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>'
};
var starIcons = {
  outline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
  filled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>'
};
var reportIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><path d="M4 22v-7"></path></svg>';
var pathListIcons = {
  add: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M10 11v6M14 11v6"></path></svg>'
};
var state;
var draftPolicy;
var projectDraft = null;
var markedFields = new Set;
var preview;
var previewRequestId = 0;
var dirty = false;
var searchActive = false;
var OVERVIEW_DAYS = 7;
var overview = null;
var activity = null;
var knownRuleIds = new Set;
var activityFilters = { days: 7, decision: "all", agent: "all", query: "", command: "" };
var tierExpanded = new Map([
  ["enforced", false],
  ["normal", false],
  ["strict", false],
  ["paranoid", false]
]);
var searchCollapsedTiers = new Set;
var secretGroupExpanded = new Map;
var searchCollapsedSecretGroups = new Set;
var rawCopyResetTimer = null;
var feedCopyResetTimer = null;
var activityQueryTimer;
var renderedFeedEntries = [];
var suspects = new Set;
var activeStarContext = { starred: null, starCount: null, blockedTotal: 0 };
var integrations = null;
var integrationBusy = new Set;
var rulesData = null;
var rulesRequested = false;
var rulesScope = "project";
var pendingRuleFocus = null;
var directoryPickerFailed = false;
var api = (path, init = {}) => fetch(\`\${path}\${path.includes("?") ? "&" : "?"}token=\${encodeURIComponent(token)}\`, {
  ...init,
  headers: {
    "content-type": "application/json",
    "x-cc-safety-net-token": token,
    ...init.headers
  }
});
var requestJson = async (path, init) => {
  try {
    const response = await api(path, init);
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      data: text ? JSON.parse(text) : {},
      error: undefined
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: undefined,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var errorText = (result) => result.error ?? (Array.isArray(result.data?.errors) && result.data.errors.length ? result.data.errors.join(\`
\`) : null) ?? result.data?.error ?? \`Request failed (status \${result.status}).\`;
var isWriteSuccess = (result) => result.ok && !(Array.isArray(result.data?.errors) && result.data.errors.length > 0);
var qs = (id) => document.getElementById(id);
var setDetailStatus = (text, kind = "") => {
  qs("status").textContent = text;
  qs("status").className = \`status \${kind}\`;
};
var appStatusTimer;
var setAppStatus = (text, kind = "") => {
  qs("app-status").textContent = text;
  qs("app-status").className = \`app-status \${kind}\`;
  clearTimeout(appStatusTimer);
  if (kind === "ok")
    appStatusTimer = setTimeout(() => setAppStatus(""), 4000);
};
var busy = false;
var updateActions = () => {
  const hasErrors = (state?.errors.length ?? 0) > 0;
  qs("save").disabled = busy || !state || hasErrors;
  qs("reset").disabled = busy || !state;
  qs("repair").disabled = busy || !hasErrors;
};
var runExclusive = async (pendingText, fn) => {
  if (busy)
    return;
  busy = true;
  updateActions();
  setAppStatus(pendingText);
  setDetailStatus("");
  try {
    await fn();
  } finally {
    busy = false;
    updateActions();
  }
};
var checkbox = (checked) => checked ? "checked" : "";
var dayCount = (days) => \`\${days} day\${days === 1 ? "" : "s"}\`;
var syncMasterBadges = () => {
  document.querySelectorAll("label.row.master input").forEach((input) => {
    const badge = input.closest("label")?.querySelector(".master-badge");
    if (badge)
      badge.textContent = input.checked ? "On" : "Off";
  });
};
var escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char] ?? char);
var pathLines = (value) => value.split(\`
\`).map((line) => line.trim()).filter(Boolean);
var formatPolicy = (policy) => \`\${JSON.stringify(policy, null, 2)}
\`;
var collectFormPolicy = () => ({
  version: 1,
  safety: {
    level: draftPolicy.safety.level,
    overrides: Object.fromEntries(Object.entries(draftPolicy.safety.overrides).filter(([, value]) => typeof value === "boolean"))
  },
  workflow: draftPolicy.workflow,
  destructive_command_protection: draftPolicy.destructive_command_protection,
  secret_protection: {
    enabled: draftPolicy.secret_protection.enabled,
    overrides: draftPolicy.secret_protection.overrides,
    deny_paths: draftPolicy.secret_protection.deny_paths,
    allow_paths: draftPolicy.secret_protection.allow_paths
  },
  audit: draftPolicy.audit
});
var effectivePreviewPolicy = (policy, baseline) => {
  if (!baseline)
    return policy;
  const union = (user, project) => [...new Set([...user, ...project])];
  return {
    ...policy,
    destructive_command_protection: {
      ...policy.destructive_command_protection,
      allow_paths: union(baseline.destructive_command_protection.allow_paths, policy.destructive_command_protection.allow_paths)
    },
    secret_protection: {
      ...policy.secret_protection,
      deny_paths: union(baseline.secret_protection.deny_paths, policy.secret_protection.deny_paths),
      allow_paths: union(baseline.secret_protection.allow_paths, policy.secret_protection.allow_paths)
    }
  };
};
var requestPolicyPreview = (policy = collectFormPolicy()) => requestJson("/api/policy/preview", {
  method: "POST",
  body: JSON.stringify(policy)
});
var policyScopeMode = () => projectDraft ? "project" : "user";
var projectFieldChip = (field, compact = false) => {
  if (policyScopeMode() !== "project")
    return "";
  if (!markedFields.has(field))
    return '<span class="project-chip inherited">Inherited</span>';
  return \`<button type="button" class="project-chip" data-unmark-field="\${escapeHtml(field)}" title="Set by project - click to inherit again" aria-label="Set by project: \${escapeHtml(field)}. Activate to inherit again.">\${compact ? "Project" : "Set by project"}</button>\`;
};
var projectFieldLine = (field) => {
  const chip = projectFieldChip(field);
  return chip ? \`<div class="project-field-line">\${chip}</div>\` : "";
};
var projectChipSlots = [
  ["destructive-enabled-chip", "destructive_command_protection.enabled"],
  ["secret-enabled-chip", "secret_protection.enabled"],
  ["allow-paths-chip", "destructive_command_protection.allow_paths"],
  ["deny-paths-chip", "secret_protection.deny_paths"],
  ["secret-allow-paths-chip", "secret_protection.allow_paths"]
];
var syncProjectChips = () => {
  projectChipSlots.forEach(([id, field]) => {
    qs(id).innerHTML = projectFieldChip(field);
  });
};
var markProjectField = (field) => {
  if (!projectDraft || markedFields.has(field))
    return;
  markedFields.add(field);
  renderSafety();
  syncProjectChips();
};
var rebuildProjectDisplay = () => {
  if (!projectDraft)
    return;
  draftPolicy = overlayProjectProposal(projectDraft.baseline, collectProjectProposal(markedFields, draftPolicy));
  renderPolicySections();
  refreshPolicyPreview();
};
var unmarkProjectField = (field) => {
  if (!projectDraft || !markedFields.has(field))
    return;
  markedFields.delete(field);
  rebuildProjectDisplay();
};
var viewNames = ["overview", "activity", "policy", "rules", "integrations", "settings"];
var viewTitles = {
  overview: "Overview",
  activity: "Activity",
  policy: "Policy",
  rules: "Rules",
  integrations: "Integrations",
  settings: "Settings"
};
var currentView = () => {
  const hash = location.hash.replace("#", "");
  return viewNames.includes(hash) ? hash : "overview";
};
var applyView = () => {
  const view = currentView();
  document.body.dataset.view = view;
  const hasSearch = view === "activity" || view === "policy";
  qs("topbar-title").textContent = viewTitles[view];
  qs("topbar-title").classList.toggle("sr-only", hasSearch);
  document.querySelectorAll(".topbar-search").forEach((el) => {
    el.hidden = el.dataset.searchView !== view;
  });
  qs("topbar").classList.toggle("has-search", hasSearch);
  document.title = \`\${viewTitles[view]} · CC Safety Net\`;
  document.querySelectorAll("[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === view)
      link.setAttribute("aria-current", "page");
    else
      link.removeAttribute("aria-current");
  });
  qs("dirty-chip").hidden = !dirty || view === "policy";
  if (view === "activity")
    applyFeedClamps(qs("activity-feed"));
  if (view === "rules" && !rulesRequested) {
    rulesRequested = true;
    loadRules();
  }
  if (view === "rules" && rulesData && pendingRuleFocus)
    renderRules();
};
var agentLabels = integrationDisplayNames;
var tierCountHtml = (segments) => {
  const parts = segments.filter(([count]) => count > 0).map(([count, label, tone]) => tone ? \`<span class="count-\${tone}">\${count} \${label}</span>\` : \`\${count} \${label}\`);
  return parts.length > 0 ? parts.join(" · ") : "0 on";
};
var feedItemHtml = (entry, index) => {
  const deny = entry.decision !== "allow";
  const badgeClass = entry.failureStage ? "error" : deny ? "deny" : "allow";
  const badgeLabel = entry.failureStage ? "Error" : deny ? "Blocked" : "Allowed";
  return \`<article class="feed-item">
    <div class="feed-meta">
      <span class="decision-badge \${badgeClass}">\${badgeLabel}</span>
      \${entry.agent && entry.agent !== "unknown" ? \`<span class="agent-badge">\${escapeHtml(agentLabels[entry.agent] ?? entry.agent)}</span>\` : ""}
      \${entry.ruleId ? knownRuleIds.has(entry.ruleId) ? \`<button type="button" class="rule-id" data-jump-rule="\${escapeHtml(entry.ruleId)}" title="Show this rule in Policy">\${escapeHtml(entry.ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(entry.ruleId)}</code>\` : ""}
      <time datetime="\${escapeHtml(entry.ts)}" title="\${escapeHtml(entry.ts)}">\${formatRelativeTime(entry.ts)}</time>
      <button type="button" class="icon-button feed-copy" data-log-copy="\${index}" aria-label="Copy log entry as JSON">\${rawCopyIcons.copy}</button>
      \${deny ? \`<button type="button" class="icon-button feed-report" data-report-fp="\${index}" aria-label="Report false positive" title="Report false positive">\${reportIcon}</button>\` : \`<button type="button" class="feed-toggle feed-block" data-block-future="\${index}">Block this in future</button>\`}
    </div>
    <code class="feed-command">\${escapeHtml(entry.segment || entry.command || "(no command recorded)")}</code>
    \${entry.reason && entry.reason !== "allowed" ? \`<p class="feed-reason muted">\${escapeHtml(entry.reason)}</p>\` : ""}
  </article>\`;
};
var applyFeedClamps = (root) => {
  const overflowing = [...root.querySelectorAll(".feed-command")].filter((command) => !command.classList.contains("clamped") && command.scrollHeight > command.clientHeight + 1);
  overflowing.forEach((command) => {
    command.classList.add("clamped");
    command.insertAdjacentHTML("afterend", '<button type="button" class="feed-toggle" data-feed-toggle aria-expanded="false">Show more</button>');
  });
};
var dayLabel = (ts) => {
  const date = new Date(ts);
  if (date.toDateString() === new Date().toDateString())
    return "Today";
  if (date.toDateString() === new Date(Date.now() - 86400000).toDateString())
    return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
var renderOverviewActivity = () => {
  if (!overview)
    return;
  const tile = (value, label, extra) => \`<div class="tile"><strong>\${escapeHtml(value.toLocaleString("en-US"))}</strong><span>\${escapeHtml(label)}</span>\${extra}</div>\`;
  const dayAgoLabel = (daysAgo) => daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : \`\${daysAgo} days ago\`;
  const sparkline = (byDay, noun) => {
    const max = Math.max(...byDay, 1);
    return \`<div class="tile-spark" role="group" aria-label="Commands \${noun} per day, most recent \${dayCount(byDay.length)}">\${byDay.map((count, index) => {
      const label = \`\${dayAgoLabel(byDay.length - 1 - index)}: \${count.toLocaleString("en-US")} \${noun}\`;
      return \`<div class="spark-col" role="img" tabindex="0" data-count="\${count.toLocaleString("en-US")}" aria-label="\${escapeHtml(label)}"><div class="spark-bar\${count === 0 ? " spark-zero" : ""}" aria-hidden="true" style="height:\${count === 0 ? 2 : Math.max(2, Math.round(count / max * 40))}px"></div></div>\`;
    }).join("")}</div>\`;
  };
  qs("overview-window").textContent = \`Last \${dayCount(overview.days)}\`;
  qs("overview-tiles").innerHTML = [
    tile(overview.counts.blocked, "Blocked", sparkline(overview.counts.blockedByDay, "blocked")),
    tile(overview.totalInWindow, "Analyzed", sparkline(overview.counts.analyzedByDay, "analyzed"))
  ].join("");
};
var retentionDays = () => state?.policy?.audit?.retention_days ?? DEFAULT_AUDIT_RETENTION_DAYS;
var overviewDays = () => Math.min(OVERVIEW_DAYS, retentionDays());
var renderRetention = (loaded) => {
  qs("retention-days").value = String(loaded.policy.audit.retention_days);
  qs("retention-unit").textContent = loaded.policy.audit.retention_days === 1 ? "day" : "days";
  qs("retention-note").textContent = "Saved on change. Lowering this deletes anything already older than the new window; the Activity tab can only look back as far as it.";
};
var activityWindowOptions = () => {
  const retained = retentionDays();
  const windows = [7, 30, 90, 180, 365].filter((days) => days < retained);
  return [...windows, retained];
};
var configStateNotice = () => {
  const configState = state?.configState;
  if (!configState || configState.state === "ready")
    return null;
  return \`A fallback configuration is being enforced: \${configState.reason}\`;
};
var setProtectionBanner = (notices) => {
  const text = notices.filter(Boolean).join(" ");
  qs("protection-banner").textContent = text;
  qs("protection-banner").hidden = text === "";
};
var renderProtectionCard = () => {
  const configNotice = configStateNotice();
  if (!state?.preview) {
    qs("protection-card").hidden = true;
    setProtectionBanner([configNotice]);
    return;
  }
  const policy = state.policy;
  const customized = state.preview.counts.effectiveCustomizations > 0 || Object.entries(policy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[policy.safety.level][key]);
  const commandsOn = policy.destructive_command_protection.enabled;
  const secretsOn = policy.secret_protection.enabled;
  const off = [
    commandsOn ? null : "Destructive command protection is off — configurable destructive command rules are not being enforced (catastrophic and custom rules remain active)",
    secretsOn ? null : "Secret protection is off — sensitive paths and deny paths are not being blocked"
  ].filter(Boolean);
  setProtectionBanner([
    off.length > 0 ? \`\${off.join(". ")}. Re-enable \${off.length > 1 ? "them" : "it"} in Policy.\` : null,
    configNotice
  ]);
  qs("protection-card").hidden = false;
  qs("protection-card").classList.toggle("protection-warning", !commandsOn || !secretsOn);
  qs("protection-card").innerHTML = \`<div class="panel-head"><div class="panel-title"><h2>Protection status</h2></div><a class="panel-head-action view-all-link" href="#policy">Configure</a></div>\` + \`<p>\${escapeHtml(safetyLevels[policy.safety.level][0])}\${customized ? " · Customized" : ""}</p>\` + \`<p\${commandsOn ? "" : ' class="state-disabled"'}>\${commandsOn ? \`\${state.preview.counts.enabled} rules active\` : "Destructive command protection is OFF"}</p>\` + \`<p\${secretsOn ? "" : ' class="state-disabled"'}>\${secretsOn ? "Secret protection on" : "Secret protection is OFF"}</p>\`;
};
var renderTopList = (containerId, counts, className, dataAttr) => {
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  qs(containerId).innerHTML = top.length === 0 ? '<p class="empty">No blocked commands in this window.</p>' : top.map(([key, count]) => \`<button type="button" class="\${className}" \${dataAttr}="\${escapeHtml(key)}"><code class="rule-id">\${escapeHtml(key)}</code><span class="chip-count">\${count.toLocaleString("en-US")}</span></button>\`).join("");
};
var renderTopLists = () => {
  if (!overview)
    return;
  renderTopList("top-commands", overview.counts.commands, "top-command", "data-command");
  renderTopList("top-rules", overview.counts.rules, "top-rule", "data-rule-id");
};
var clearCommandFilter = () => {
  if (!activityFilters.command)
    return false;
  activityFilters.command = "";
  return true;
};
var jumpToActivityRule = (ruleId) => {
  activityFilters.command = "";
  activityFilters.query = ruleId.toLowerCase();
  qs("activity-search").value = ruleId;
  if (activity) {
    renderActivityControls();
    renderActivityFeed();
  }
  location.hash = "activity";
};
var renderGuardErrors = () => {
  if (!overview)
    return;
  qs("guard-errors").hidden = overview.counts.errors === 0;
  if (overview.counts.errors === 0)
    return;
  qs("guard-errors").textContent = \`\${overview.counts.errors.toLocaleString("en-US")} guard error\${overview.counts.errors === 1 ? "" : "s"} in the last \${dayCount(overview.days)} — commands blocked because evaluation failed, not by policy. Click to view.\`;
};
var renderActivityControls = () => {
  if (!activity)
    return;
  const agentCounts = activity.counts.agents;
  const chipHtml = (kind, value, label, count) => \`<button type="button" class="chip" data-activity-chip="\${kind}" data-chip-value="\${escapeHtml(value)}" aria-pressed="\${activityFilters[kind] === value}">\${escapeHtml(label)}\${count === undefined ? "" : \` <span class="chip-count">\${count.toLocaleString("en-US")}</span>\`}</button>\`;
  qs("activity-decision").innerHTML = [
    chipHtml("decision", "all", "All", activity.totalInWindow),
    chipHtml("decision", "deny", "Blocked", activity.counts.blocked),
    chipHtml("decision", "allow", "Allowed", activity.counts.allowed),
    ...activity.counts.errors > 0 ? [chipHtml("decision", "error", "Errors", activity.counts.errors)] : [],
    ...suspects.size > 0 ? [chipHtml("decision", "suspect", "Likely false positive", suspects.size)] : []
  ].join("");
  const agentNames = Object.keys(agentCounts).filter((name) => name !== "unknown").sort();
  qs("activity-agents").innerHTML = agentNames.length < 2 ? "" : [
    chipHtml("agent", "all", "All agents"),
    ...agentNames.map((name) => chipHtml("agent", name, agentLabels[name] ?? name, agentCounts[name]))
  ].join("");
  qs("activity-command-filter").innerHTML = activityFilters.command ? \`<button type="button" class="filter-pill" data-clear-command aria-label="Clear command filter">Command: <code>\${escapeHtml(activityFilters.command)}</code><span class="filter-pill-x" aria-hidden="true">✕</span></button>\` : "";
  qs("activity-days").innerHTML = activityWindowOptions().map((days) => \`<option value="\${days}">Last \${dayCount(days)}</option>\`).join("");
  qs("activity-days").value = String(activity.days);
};
var renderActivityFeed = () => {
  if (!activity)
    return;
  const matchesFilters = (entry) => {
    if (activityFilters.decision === "deny" && entry.decision === "allow")
      return false;
    if (activityFilters.decision === "allow" && entry.decision !== "allow")
      return false;
    if (activityFilters.decision === "error" && !entry.failureStage)
      return false;
    if (activityFilters.decision === "suspect" && !suspects.has(entry))
      return false;
    if (activityFilters.agent !== "all" && (entry.agent || "unknown") !== activityFilters.agent)
      return false;
    if (activityFilters.command) {
      if (entry.decision === "allow")
        return false;
      return commandSignature(entry.segment || entry.command) === activityFilters.command;
    }
    if (!activityFilters.query)
      return true;
    return [entry.ruleId, entry.segment || entry.command].filter(Boolean).join(" ").toLowerCase().includes(activityFilters.query);
  };
  const entries = activity.entries.filter(matchesFilters);
  renderedFeedEntries = entries;
  qs("activity-feed").innerHTML = entries.length === 0 ? '<p class="empty">No audit log entries match.</p>' : \`<div class="feed-list">\${entries.map((entry, index) => {
    const label = dayLabel(entry.ts);
    const previous = entries[index - 1];
    const separator = previous && label === dayLabel(previous.ts) ? "" : \`<div class="feed-day-sep">\${escapeHtml(label)}</div>\`;
    return separator + feedItemHtml(entry, index);
  }).join("")}</div>\`;
  applyFeedClamps(qs("activity-feed"));
  qs("activity-count").textContent = \`Showing \${entries.length.toLocaleString("en-US")} of \${activity.totalInWindow.toLocaleString("en-US")} entries from the last \${dayCount(activity.days)}\${activity.truncated ? " (capped at 500, newest of each decision)" : ""}.\${activity.unreadable > 0 ? \` \${activity.unreadable.toLocaleString("en-US")} audit log source\${activity.unreadable === 1 ? "" : "s"} could not be read, so this list is incomplete.\` : ""}\`;
};
var loadOverview = async () => {
  const result = await requestJson(\`/api/activity?days=\${overviewDays()}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("overview-window").textContent = "";
    qs("overview-tiles").innerHTML = "";
    qs("top-rules").innerHTML = message;
    qs("guard-errors").hidden = true;
    return;
  }
  const feed = result.data;
  overview = feed;
  qs("logs-path").textContent = overview.logsDir ?? "Not available";
  renderOverviewActivity();
  renderTopLists();
  renderGuardErrors();
};
var loadActivity = async () => {
  const result = await requestJson(\`/api/activity?days=\${activityFilters.days}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("activity-feed").innerHTML = message;
    qs("activity-count").textContent = "";
    return;
  }
  const feed = result.data;
  activity = feed;
  suspects = findSuspectEntries(activity.entries);
  if (activityFilters.agent !== "all" && !(activityFilters.agent in activity.counts.agents)) {
    activityFilters.agent = "all";
  }
  if (activityFilters.decision === "error" && activity.counts.errors === 0) {
    activityFilters.decision = "all";
  }
  if (activityFilters.decision === "suspect" && suspects.size === 0) {
    activityFilters.decision = "all";
  }
  renderActivityControls();
  renderActivityFeed();
};
var runRefresh = async (buttonId, reload) => {
  const button = qs(buttonId);
  if (button.disabled)
    return;
  button.disabled = true;
  button.classList.add("spinning");
  try {
    await Promise.all([reload(), new Promise((resolve) => setTimeout(resolve, 600))]);
  } finally {
    button.classList.remove("spinning");
    button.disabled = false;
  }
};
var refreshActivity = () => runRefresh("activity-refresh", () => Promise.all([loadOverview(), loadActivity()]));
var renderIntegrations = () => {
  const loaded = integrations;
  if (!loaded)
    return;
  qs("integrations-list").innerHTML = loaded.targets.map((row) => {
    const busy = integrationBusy.has(row.target);
    const version = row.version === null ? '<span class="muted">not detected</span>' : \`<span class="agent-badge">v\${escapeHtml(row.version)}</span>\`;
    const status = row.status === "active" ? '<span class="state-active">Installed</span>' : row.status === "disabled" ? '<span class="state-disabled">Disabled</span>' : row.status === "not-inspected" ? \`<span class="muted" title="This runtime's state file could not be read, so its status is unknown.">Not inspected</span>\` : '<span class="muted">Not installed</span>';
    const uninstall = row.status === "active";
    const busyLabel = uninstall ? "Uninstalling…" : "Installing…";
    const action = row.version === null ? "" : \`<button type="button" class="\${uninstall ? "danger" : "primary"}" data-integration-action="\${uninstall ? "uninstall" : "install"}" data-integration-target="\${escapeHtml(row.target)}"\${busy ? " disabled" : ""}>\${busy ? busyLabel : uninstall ? "Uninstall" : row.status === "disabled" ? "Enable" : "Install"}</button>\`;
    const note = row.note ? \`<div class="status \${row.note.kind}">\${escapeHtml(row.note.text)}</div>\` : "";
    return \`<div class="integration-row">
        <span class="integration-info"><strong>\${escapeHtml(row.label)}</strong> \${version} \${status}</span>
        \${action}
        \${note}
      </div>\`;
  }).join("");
};
var renderHealthStrip = (health) => {
  const loaded = integrations;
  if (!loaded || !health.ok)
    return;
  const detected = loaded.targets.filter((row) => row.status === "active" || row.status === "disabled");
  const active = detected.filter((row) => row.status === "active");
  const inactive = detected.filter((row) => row.status === "disabled");
  const attention = inactive.length > 0 || active.length === 0;
  const parts = [];
  const labelHtml = (row) => \`<strong>\${escapeHtml(row.label)}</strong>\`;
  if (active.length)
    parts.push(\`Hook active in \${active.map(labelHtml).join(", ")}\`);
  if (inactive.length)
    parts.push(\`\${inactive.map(labelHtml).join(", ")} detected without an active hook\`);
  if (!parts.length)
    parts.push("No agent hooks detected");
  if (health.data?.update?.updateAvailable)
    parts.push(\`v\${escapeHtml(health.data.update.latestVersion)} available\`);
  const link = attention ? ' <a class="view-all-link" href="#integrations">Fix in Integrations</a>' : "";
  const el = qs("health-strip");
  el.className = attention ? "status health-strip error" : "status health-strip ok";
  el.innerHTML = parts.join(" · ") + link;
  el.hidden = false;
};
var loadIntegrations = async () => {
  const result = await requestJson("/api/integrations");
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs("integrations-list").innerHTML = \`<p class="empty">Could not load integrations: \${escapeHtml(errorText(result))}</p>\`;
    return;
  }
  integrations = result.data;
  renderIntegrations();
  qs("integrations-pkg-version").textContent = result.data.system.version;
  qs("integrations-node-version").textContent = result.data.system.nodeVersion ?? "unknown";
  qs("integrations-platform").textContent = result.data.system.platform;
  qs("integrations-system").hidden = false;
};
var refreshIntegrations = () => runRefresh("integrations-refresh", loadIntegrations);
var renderRules = () => {
  const loaded = rulesData;
  if (!loaded)
    return;
  if (!qs("rules-project-path").value)
    qs("rules-project-path").value = loaded.projectPath;
  const canPick = loaded.canPickDirectory && !directoryPickerFailed;
  qs("rules-project-path").readOnly = canPick;
  qs("rules-choose-directory").hidden = !canPick;
  qs("rules-list").innerHTML = loaded.rulebooks.length === 0 ? loaded.errors.length > 0 ? '<p class="empty">Every configured rulebook was dropped, so no custom rule is enforced. See Diagnostics below.</p>' : '<p class="empty">No custom rulebooks. Run <code>npx -y cc-safety-net rule init</code> to create one, or see the <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">documentation</a>.</p>' : loaded.rulebooks.map((rulebook) => \`<div class="rulebook-card">
    <div class="rulebook-head">
      <strong>\${escapeHtml(rulebook.name)}</strong>
      <span class="agent-badge">v\${escapeHtml(rulebook.version)}</span>
      \${rulebook.spec === rulebook.name ? "" : \`<code>\${escapeHtml(rulebook.spec)}</code>\`}
      <span>\${rulebook.source === "user" ? "All projects" : "This project"}</span>
      <span>\${rulebook.rules.length} rule\${rulebook.rules.length === 1 ? "" : "s"}</span>
    </div>
    \${rulebook.rules.map((rule) => \`<div class="rulebook-rule\${pendingRuleFocus === rule.name ? " rules-focus" : ""}">
      <code class="rule-id">custom.\${escapeHtml(rule.name)}</code>
      <code>\${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(" "))}</code>
      <p>Blocked arguments (any one matches): \${rule.block_args.map((arg) => \`<code>\${escapeHtml(arg)}</code>\`).join(" ")}</p>
      <p>\${escapeHtml(rule.reason)}</p>
    </div>\`).join("")}
  </div>\`).join("");
  const diagnostics = [
    ...loaded.errors.map((text) => \`<div class="status error">\${escapeHtml(text)}</div>\`),
    ...loaded.warnings.map((text) => \`<div class="status">\${escapeHtml(text)}</div>\`)
  ];
  qs("rules-diagnostics").innerHTML = diagnostics.join("");
  qs("rules-diagnostics-panel").hidden = diagnostics.length === 0;
  if (!pendingRuleFocus)
    return;
  const focused = qs("rules-list").querySelector(".rules-focus");
  if (focused)
    focused.scrollIntoView({ block: "center" });
  if (!focused)
    setAppStatus(\`custom.\${pendingRuleFocus} is not in any rulebook\`, "error");
  pendingRuleFocus = null;
};
var loadRules = async () => {
  const result = await requestJson("/api/rules");
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs("rules-list").innerHTML = \`<p class="empty">Could not load rules: \${escapeHtml(errorText(result))}</p>\`;
    rulesData = null;
    qs("rules-diagnostics-panel").hidden = true;
    rulesRequested = false;
    return;
  }
  rulesData = result.data;
  renderRules();
};
var refreshRules = () => runRefresh("rules-refresh", () => {
  rulesRequested = true;
  return loadRules();
});
var jumpToRulesRule = (ruleId) => {
  pendingRuleFocus = ruleId.replace(/^custom\\./, "");
  location.hash = "rules";
};
var openRuleComposer = (command) => {
  qs("rules-composer-input").value = command;
  location.hash = "rules";
};
var setRulesScope = (scope) => {
  rulesScope = scope;
  document.querySelectorAll("[data-rules-scope]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.rulesScope === scope));
  });
  qs("rules-project-path-field").hidden = scope !== "project";
};
var chooseProjectDirectory = async () => {
  const button = qs("rules-choose-directory");
  if (button.disabled)
    return;
  button.disabled = true;
  const result = await requestJson("/api/rules/choose-directory", { method: "POST" });
  button.disabled = false;
  if (result.ok && result.data.path) {
    qs("rules-project-path").value = result.data.path;
    return;
  }
  if (result.ok && result.data.cancelled)
    return;
  directoryPickerFailed = true;
  qs("rules-project-path").readOnly = false;
  button.hidden = true;
  setAppStatus(\`\${result.ok ? result.data.error : errorText(result)} - type the project path instead\`, "error");
};
var copyRulePrompt = async () => {
  if (!rulesData) {
    setAppStatus("Rules have not loaded yet - refresh the Rulebooks panel", "error");
    return;
  }
  if (!qs("rules-composer-input").value.trim()) {
    setAppStatus("Describe what you want first", "error");
    return;
  }
  if (rulesScope === "project" && !qs("rules-project-path").value.trim()) {
    setAppStatus("Enter the project path the rule belongs to", "error");
    return;
  }
  qs("rules-copy-prompt").disabled = true;
  try {
    await navigator.clipboard.writeText(rulePromptText({
      rulesData,
      rulesScope,
      projectPath: qs("rules-project-path").value,
      request: qs("rules-composer-input").value
    }));
    qs("rules-composer-input").value = "";
    setAppStatus("Prompt copied - paste it into your coding CLI", "ok");
  } catch {
    setAppStatus("Copy failed", "error");
  } finally {
    qs("rules-copy-prompt").disabled = false;
  }
};
var runIntegrationAction = async (button) => {
  const target = button.dataset.integrationTarget;
  if (!target || integrationBusy.has(target))
    return;
  integrationBusy.add(target);
  const action = button.dataset.integrationAction;
  renderIntegrations();
  const result = await requestJson(\`/api/\${action}\`, {
    method: "POST",
    body: JSON.stringify({ target })
  });
  integrationBusy.delete(target);
  const row = integrations?.targets.find((entry) => entry.target === target);
  if (!row)
    return;
  const ok = result.ok && result.data.ok === true;
  if (ok)
    row.status = action === "install" ? "active" : "not-installed";
  row.note = {
    kind: ok ? "ok" : "error",
    text: ok ? result.data.output : result.data?.output || errorText(result)
  };
  if (!ok)
    setAppStatus(action === "install" ? "Install failed" : "Uninstall failed", "error");
  renderIntegrations();
};
var confirmDialog = (() => {
  const dialog = qs("confirm-dialog");
  const confirm = qs("confirm-dialog-confirm");
  const cancel = qs("confirm-dialog-cancel");
  let resolvePending = null;
  dialog.addEventListener("close", () => {
    if (!resolvePending)
      return;
    resolvePending(dialog.returnValue === "confirm");
    resolvePending = null;
  });
  dialog.addEventListener("cancel", () => {
    dialog.returnValue = "cancel";
  });
  return (options) => new Promise((resolve) => {
    if (resolvePending) {
      resolve(false);
      return;
    }
    qs("confirm-dialog-title").textContent = options.title;
    qs("confirm-dialog-body").textContent = options.body;
    qs("confirm-dialog-detail").textContent = options.detail ?? "";
    const detailRow = qs("confirm-dialog-detail").parentElement;
    if (detailRow)
      detailRow.hidden = !options.detail;
    qs("confirm-dialog-rows").innerHTML = options.rowsHtml ?? "";
    qs("confirm-dialog-rows").hidden = !options.rowsHtml;
    confirm.textContent = options.confirmLabel;
    confirm.className = options.confirmClass ?? "danger";
    dialog.returnValue = "cancel";
    resolvePending = resolve;
    dialog.showModal();
    cancel.focus();
  });
})();
var confirmProtectionDisable = (options) => confirmDialog({
  title: options.title,
  body: options.body,
  detail: options.detail,
  confirmLabel: "Disable protection"
});
var togglePanel = (button) => {
  const controls = button.getAttribute("aria-controls");
  if (!controls)
    return;
  const expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(expanded));
  qs(controls).hidden = !expanded;
};
var syncSearchState = () => {
  const active = qs("policy-search").value.trim().length > 0;
  if (active === searchActive)
    return;
  searchActive = active;
  if (active)
    return;
  searchCollapsedTiers.clear();
  searchCollapsedSecretGroups.clear();
};
var updateRawSource = () => {
  if (projectDraft) {
    qs("raw-source").textContent = \`Only the fields marked for this project. Writes to \${projectDraft.path}.\`;
    return;
  }
  qs("raw-source").textContent = state?.errors.length ? "Read-only original policy JSON. Repair preserves valid settings and writes canonical JSON." : "Read-only mirror of the controls.";
};
var setRawCopyCopied = (copied) => {
  qs("raw-copy").innerHTML = copied ? rawCopyIcons.check : rawCopyIcons.copy;
  qs("raw-copy").classList.toggle("copied", copied);
  qs("raw-copy").setAttribute("aria-label", copied ? "Copied raw JSON" : "Copy raw JSON to clipboard");
};
var resetFeedCopy = () => {
  document.querySelectorAll(".feed-copy.copied").forEach((button) => {
    button.classList.remove("copied");
    button.innerHTML = rawCopyIcons.copy;
    button.setAttribute("aria-label", "Copy log entry as JSON");
  });
};
var openReportDialog = (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.reportFp)];
  if (!entry)
    return;
  const scrub = (text) => scrubReportPaths(text, entry.cwd, activity?.homeDir);
  qs("report-command").value = scrub(entry.command || entry.segment || "");
  qs("report-entry").value = JSON.stringify(entry, (_key, value) => typeof value === "string" ? scrub(value) : value, 2);
  qs("report-dialog").returnValue = "cancel";
  qs("report-dialog").showModal();
};
var openFalsePositiveForm = async () => {
  const fields = {
    command: qs("report-command").value,
    entry: qs("report-entry").value
  };
  const request = buildReportRequest(fields);
  const copying = request.dropped.length ? navigator.clipboard.writeText(request.dropped.map((field) => \`### \${field}
\${fields[field]}\`).join(\`

\`)) : null;
  window.open(request.url, "_blank", "noopener");
  if (!copying)
    return;
  const names = request.dropped.join(" and ");
  setAppStatus(await copying.then(() => true).catch(() => false) ? \`Report too long to prefill — \${names} copied to your clipboard. Paste into the form on GitHub.\` : \`Report too long to prefill — \${names} left out. Copy the entry from the feed and paste it into the form on GitHub.\`, "error");
};
qs("report-dialog").addEventListener("close", () => {
  if (qs("report-dialog").returnValue === "report")
    openFalsePositiveForm();
});
var copyFeedEntry = async (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.logCopy)];
  if (!entry)
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
    if (feedCopyResetTimer)
      clearTimeout(feedCopyResetTimer);
    resetFeedCopy();
    button.classList.add("copied");
    button.innerHTML = rawCopyIcons.check;
    button.setAttribute("aria-label", "Copied log entry");
    feedCopyResetTimer = setTimeout(resetFeedCopy, 2000);
  } catch {
    setAppStatus("Copy failed", "error");
  }
};
var copyRawToClipboard = async () => {
  qs("raw-copy").disabled = true;
  try {
    await navigator.clipboard.writeText(qs("raw").value);
    setRawCopyCopied(true);
    if (rawCopyResetTimer)
      clearTimeout(rawCopyResetTimer);
    rawCopyResetTimer = setTimeout(() => setRawCopyCopied(false), 2000);
  } catch (error) {
    setAppStatus("Copy failed", "error");
    setDetailStatus(\`Error: Could not copy Raw JSON: \${error instanceof Error ? error.message : String(error)}\`, "error");
  } finally {
    qs("raw-copy").disabled = false;
  }
};
var formatStarCount = (count) => {
  if (typeof count !== "number")
    return "";
  if (count >= 1000)
    return \`\${(count / 1000).toFixed(1).replace(/\\.0$/, "")}k\`;
  return String(count);
};
var starCountHtml = (count) => {
  const formatted = formatStarCount(count);
  return formatted ? \`<span class="star-count">\${escapeHtml(formatted)}</span>\` : "";
};
var hideStarCta = () => {
  qs("star-row").hidden = true;
  qs("star-slot").innerHTML = "";
};
var renderStarPitch = (context, starred = false) => {
  const evidence = context.blockedTotal > 0 ? \`CC Safety Net has blocked <strong>\${escapeHtml(context.blockedTotal.toLocaleString("en-US"))}</strong> risky command\${context.blockedTotal === 1 ? "" : "s"} on this machine in its retained \${escapeHtml(dayCount(retentionDays()))} history.\` : "";
  if (starred) {
    qs("star-pitch-text").innerHTML = evidence;
    return;
  }
  qs("star-pitch-text").innerHTML = evidence ? \`\${evidence} If it saved your work, star it on GitHub.\` : "If CC Safety Net is useful to you, star it on GitHub.";
};
var renderStarLink = (context, href = fallbackRepoUrl) => {
  qs("star-slot").innerHTML = \`<a class="star-cta" href="\${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="Star CC Safety Net on GitHub (opens github.com)">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </a>\`;
  qs("star-row").hidden = false;
};
var renderStarCta = (context) => {
  activeStarContext = context;
  if (context.starred === true) {
    hideStarCta();
    return;
  }
  renderStarPitch(context);
  qs("star-mechanism").hidden = context.starred !== false;
  if (context.starred === null) {
    renderStarLink(context);
    return;
  }
  qs("star-slot").innerHTML = \`<button type="button" class="star-cta" aria-label="Star CC Safety Net on GitHub. One click via your GitHub CLI.">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </button>\`;
  qs("star-row").hidden = false;
};
var starRepo = async (button) => {
  button.disabled = true;
  const result = await requestJson("/api/star", { method: "POST" });
  if (result.ok && result.data?.ok === true) {
    const icon = button.querySelector(".star-icon");
    const label = button.querySelector(".star-label");
    if (icon)
      icon.innerHTML = starIcons.filled;
    if (label)
      label.textContent = "Starred. Thank you.";
    button.setAttribute("aria-label", "CC Safety Net starred on GitHub");
    button.classList.add("starred");
    qs("star-mechanism").hidden = true;
    renderStarPitch(activeStarContext, true);
    setAppStatus("Starred on GitHub", "ok");
    setDetailStatus("");
    return;
  }
  qs("star-mechanism").hidden = true;
  renderStarLink(activeStarContext, result.data?.fallbackUrl ?? fallbackRepoUrl);
};
var loadStarContext = async () => {
  const result = await requestJson("/api/star/context");
  renderStarCta(result.ok && result.data ? result.data : { starred: null, starCount: null, blockedTotal: 0 });
};
var syncRawFromForm = () => {
  if (state?.errors.length)
    return;
  qs("raw").value = formatPolicy(projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy());
  updateRawSource();
};
var updateDirtyStatus = () => {
  if (!state || state.errors.length)
    return;
  if (projectDraft) {
    dirty = JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== projectDraft.snapshot;
    qs("policy-savebar").hidden = !dirty;
    qs("dirty-chip").hidden = !dirty || currentView() === "policy";
    setDetailStatus("");
    updateActions();
    return;
  }
  const draftJson = JSON.stringify(collectFormPolicy());
  dirty = draftJson !== JSON.stringify(state.policy);
  qs("policy-savebar").hidden = !dirty;
  qs("dirty-chip").hidden = !dirty || currentView() === "policy";
  if (dirty)
    sessionStorage.setItem("cc-safety-net-draft", draftJson);
  if (!dirty)
    sessionStorage.removeItem("cc-safety-net-draft");
  setDetailStatus("");
  updateActions();
};
var createPathList = (prefix, config) => {
  const setHint = (text) => {
    qs(\`\${prefix}-hint\`).textContent = text;
    qs(\`\${prefix}-hint\`).hidden = !text;
  };
  const render = () => {
    const paths = config.getPaths();
    const disabled = config.isDisabled();
    qs(\`\${prefix}-count\`).textContent = \`\${paths.length} path\${paths.length === 1 ? "" : "s"}\`;
    qs(\`\${prefix}-input\`).disabled = disabled;
    qs(\`\${prefix}-add-button\`).disabled = disabled;
    qs(\`\${prefix}-list\`).innerHTML = paths.length === 0 ? \`<li class="empty">No \${config.itemLabel}s configured.</li>\` : paths.map((path, index) => \`<li class="path-item \${disabled ? "row-disabled" : ""}">
          <code>\${escapeHtml(path)}</code>
          <button type="button" class="icon-button" data-path-list="\${prefix}" data-path-remove="\${index}" \${disabled ? "disabled" : ""} aria-label="Remove \${config.itemLabel} \${escapeHtml(path)}">\${pathListIcons.remove}</button>
        </li>\`).join("");
  };
  const claimForProject = () => {
    if (!projectDraft || markedFields.has(config.field))
      return;
    markedFields.add(config.field);
    config.setPaths([]);
    syncProjectChips();
  };
  let adding = false;
  const add = async (value) => {
    if (adding)
      return;
    const entries = [...new Set(pathLines(value))];
    if (entries.length === 0)
      return;
    const scope = projectDraft;
    const claimed = projectDraft !== null && !markedFields.has(config.field);
    const previousPaths = config.getPaths();
    claimForProject();
    const submitted = qs(\`\${prefix}-input\`).value;
    const additions = entries.filter((entry) => !config.getPaths().includes(entry));
    if (additions.length) {
      adding = true;
      try {
        const error = await config.validateAdditions([...config.getPaths(), ...additions]);
        if (projectDraft !== scope)
          return;
        if (error) {
          setHint(\`Not added: \${additions.join(", ")} — \${error}\`);
          if (claimed) {
            markedFields.delete(config.field);
            config.setPaths(previousPaths);
            syncProjectChips();
          }
          return;
        }
      } finally {
        adding = false;
      }
    }
    const current = config.getPaths();
    const duplicates = entries.filter((entry) => current.includes(entry));
    config.setPaths([...current, ...additions.filter((entry) => !current.includes(entry))]);
    if (qs(\`\${prefix}-input\`).value === submitted)
      qs(\`\${prefix}-input\`).value = "";
    setHint(duplicates.length ? \`Already listed: \${duplicates.join(", ")}\` : "");
    render();
    syncRawFromForm();
    updateDirtyStatus();
    qs(\`\${prefix}-input\`).focus();
  };
  const remove = (index) => {
    claimForProject();
    config.setPaths(config.getPaths().filter((_, position) => position !== index));
    setHint("");
    render();
    syncRawFromForm();
    updateDirtyStatus();
  };
  return { render, add, remove };
};
var validatePathAdditions = async (patch) => {
  const candidate = collectFormPolicy();
  patch(candidate);
  const result = await requestPolicyPreview(candidate);
  if (result.ok && result.data?.preview)
    return null;
  return errorText(result);
};
var pathLists = {
  "deny-paths": createPathList("deny-paths", {
    field: "secret_protection.deny_paths",
    getPaths: () => draftPolicy.secret_protection.deny_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.deny_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "deny path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, deny_paths: paths };
    })
  }),
  "secret-allow-paths": createPathList("secret-allow-paths", {
    field: "secret_protection.allow_paths",
    getPaths: () => draftPolicy.secret_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, allow_paths: paths };
    })
  }),
  "allow-paths": createPathList("allow-paths", {
    field: "destructive_command_protection.allow_paths",
    getPaths: () => draftPolicy.destructive_command_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.destructive_command_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.destructive_command_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.destructive_command_protection = {
        ...candidate.destructive_command_protection,
        allow_paths: paths
      };
    })
  })
};
var pathListFor = (name) => name === "deny-paths" || name === "allow-paths" || name === "secret-allow-paths" ? pathLists[name] : null;
var secretRuleIsActive = (rule, overrides) => overrides[rule.id] ? overrides[rule.id] === "on" : !rule.defaultOff;
var markProjectOverride = (section, ruleId) => {
  if (!projectDraft)
    return;
  markedFields.add(\`\${section}.overrides.\${ruleId}\`);
};
var clearProjectOverrideMarks = (section) => {
  markedFields = new Set([...markedFields].filter((field) => !field.startsWith(\`\${section}.overrides.\`)));
};
var setSecretOverride = (rule, active) => {
  if (!projectDraft && active === !rule.defaultOff) {
    delete draftPolicy.secret_protection.overrides[rule.id];
    return;
  }
  draftPolicy.secret_protection.overrides[rule.id] = active ? "on" : "off";
  markProjectOverride("secret_protection", rule.id);
};
var setDestructiveOverride = (ruleId, active, inheritedEnabled) => {
  if (!projectDraft && active === inheritedEnabled) {
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    return;
  }
  draftPolicy.destructive_command_protection.overrides[ruleId] = active ? "on" : "off";
  markProjectOverride("destructive_command_protection", ruleId);
};
var groupRules = (rules) => rules.reduce((groups, rule) => {
  const group = groups.find((item) => item.category === rule.category);
  if (group) {
    group.rules.push(rule);
    return groups;
  }
  groups.push({ category: rule.category, rules: [rule] });
  return groups;
}, []);
var renderSecretPatterns = () => {
  if (!state)
    return;
  const loaded = state;
  const query = qs("policy-search").value.trim().toLowerCase();
  const rules = state.secretPatterns.filter((rule) => [rule.category, rule.label, rule.id, rule.description, ...rule.paths ?? []].join(" ").toLowerCase().includes(query));
  const overrides = draftPolicy.secret_protection.overrides;
  const disabled = !draftPolicy.secret_protection.enabled;
  const disabledCount = state.secretPatterns.filter((rule) => !secretRuleIsActive(rule, overrides)).length;
  qs("secret-summary").textContent = disabled ? "Protection disabled. Saved rule settings and deny paths are preserved." : \`\${state.secretPatterns.length - disabledCount} active, \${disabledCount} disabled\`;
  qs("secret-patterns").innerHTML = rules.length === 0 ? '<p class="empty">No secret protections match the search.</p>' : groupRules(rules).map((group) => {
    const expanded = secretGroupExpanded.get(group.category) || searchActive && !searchCollapsedSecretGroups.has(group.category);
    const contentId = \`secret-group-\${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`;
    const allGroupRules = loaded.secretPatterns.filter((rule) => rule.category === group.category);
    const onCount = disabled ? 0 : allGroupRules.filter((rule) => secretRuleIsActive(rule, overrides)).length;
    return \`
      <section class="rule-tier">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-secret-group-toggle="\${escapeHtml(group.category)}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${escapeHtml(group.category)}</strong></span>
            <span class="tier-counts">\${tierCountHtml([
      [onCount, "on"],
      [allGroupRules.length - onCount, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-secret-group-active="\${escapeHtml(group.category)}" \${checkbox(allGroupRules.some((rule) => secretRuleIsActive(rule, overrides)))} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${group.category} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
        <div class="grid">\${group.rules.map((rule) => {
      const active = secretRuleIsActive(rule, overrides);
      const ruleState = active && !disabled ? { label: "Active", className: "state-active" } : { label: "Disabled", className: "state-disabled" };
      const control = \`<input type="checkbox" data-secret-active="\${escapeHtml(rule.id)}" \${checkbox(active)} \${disabled ? "disabled" : ""}>
            <span>
              <strong>\${escapeHtml(rule.label)}</strong>
              <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
              <small><span class="\${ruleState.className}">\${ruleState.label}</span> \${escapeHtml(rule.description ?? "")}</small>
            </span>\`;
      const chip = projectFieldChip(\`secret_protection.overrides.\${rule.id}\`, true);
      if (!rule.paths) {
        return \`<label class="row \${disabled ? "row-disabled" : ""}">\${control}\${chip}</label>\`;
      }
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
            <label class="rule-control">\${control}</label>
            <button type="button" class="rule-example-button" data-secret-paths="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show protected paths for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
            \${chip}
          </div>\`;
    }).join("")}</div>
        </div>
      </section>
    \`;
  }).join("");
};
var presetName = () => safetyLevels[draftPolicy.safety.level][0];
var renderPresetStatus = () => {
  if (!preview)
    return;
  const customized = preview.counts.effectiveCustomizations > 0 || Object.entries(draftPolicy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key]);
  qs("safety-preset-status").textContent = customized ? \`\${presetName()} · Customized\` : "";
  qs("safety-preset-status").classList.toggle("customized", customized);
};
var renderSafety = () => {
  const environmentSources = preview ? [
    ...new Set(Object.values(preview.capabilities).filter((capability) => capability.source === "environment").flatMap((capability) => capability.sources.filter((source) => source.startsWith("env "))))
  ] : [];
  qs("environment-overrides").hidden = environmentSources.length === 0;
  qs("environment-overrides").textContent = environmentSources.length ? \`Environment-raised protection: \${environmentSources.join(", ")}\` : "";
  qs("safety-level").innerHTML = projectFieldLine("safety.level") + Object.entries(safetyLevels).map(([level, meta]) => \`<label class="row preset-\${level}"><input type="radio" name="safety-level" value="\${level}" \${checkbox(draftPolicy.safety.level === level)}><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span></label>\`).join("");
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs("safety-overrides").innerHTML = Object.entries(safetyOverrides).map(([key, meta]) => {
    const value = draftPolicy.safety.overrides[key];
    const inheritedText = inherited[key] ? "on" : "off";
    return \`<label class="row safety-override-row"><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span><select data-safety-override="\${key}">
      <option value="inherit" \${value === undefined ? "selected" : ""}>Inherit from preset (\${inheritedText})</option>
      <option value="true" \${value === true ? "selected" : ""}>Force on</option>
      <option value="false" \${value === false ? "selected" : ""}>Force off</option>
    </select>\${projectFieldChip(\`safety.overrides.\${key}\`, true)}</label>\`;
  }).join("");
  qs("workflow").innerHTML = \`<label class="row"><input type="checkbox" data-workflow-worktree \${checkbox(draftPolicy.workflow.worktree_mode)}><span><strong>Allow discarding local changes in linked git worktrees</strong><small>Only relaxes linked worktree discard checks.</small></span>\${projectFieldChip("workflow.worktree_mode")}</label>\`;
  renderPresetStatus();
};
var tierForRule = (rule) => {
  if (!rule.activationCapability)
    return "normal";
  return rule.activationCapability === "fail_closed" ? "strict" : "paranoid";
};
var tierMeta = {
  normal: ["Available in every preset", "No additional capability required"],
  strict: ["Strict tier", "Inherits from Fail closed"],
  paranoid: ["Paranoid tier", "Inherits from Paranoid rm or Paranoid interpreters"]
};
var ruleStateText = (rule, effective, capabilities) => {
  const capability = rule.activationCapability;
  if (effective.source === "master_disabled")
    return "Off — destructive-command protection disabled";
  if (effective.source === "rule_override")
    return \`\${effective.enabled ? "On" : "Off"} — user rule override\`;
  if (effective.source === "built_in_default")
    return "On — available in every preset";
  if (effective.source === "environment") {
    const sources = capability ? capabilities[capability]?.sources ?? [] : [];
    const source = [...sources].reverse().find((item) => item.startsWith("env "));
    return \`\${effective.enabled ? "On" : "Off"} — environment\${source ? \`; \${source.slice(4)}\` : ""}\`;
  }
  if (effective.source === "capability_override" && capability) {
    return \`\${effective.enabled ? "On" : "Off"} — capability override; \${safetyOverrides[capability][0]} forced \${effective.enabled ? "on" : "off"}\`;
  }
  if (effective.enabled)
    return \`On — \${presetName()} preset\`;
  return \`Off — \${presetName()} preset; requires \${tierForRule(rule) === "strict" ? "Strict" : "Paranoid"}\`;
};
var showRulePopover = (button, label, title, body) => {
  const popover = qs("rule-example-popover");
  qs("rule-example-label").textContent = label;
  qs("rule-example-title").textContent = title;
  qs("rule-example-command").textContent = body;
  if (!popover.matches(":popover-open"))
    popover.showPopover();
  const buttonRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const gap = 8;
  const edge = 12;
  const below = buttonRect.bottom + gap;
  const top = below + popoverRect.height <= window.innerHeight - edge ? below : Math.max(edge, buttonRect.top - gap - popoverRect.height);
  const left = Math.min(window.innerWidth - popoverRect.width - edge, Math.max(edge, buttonRect.right - popoverRect.width));
  popover.style.top = \`\${top}px\`;
  popover.style.left = \`\${left}px\`;
};
var openRuleExample = (button) => {
  const rule = state?.destructiveCommandRules.find((item) => item.id === button.dataset.ruleExample);
  if (!rule)
    return;
  showRulePopover(button, "Blocked command example", rule.label, rule.example);
};
var openSecretPaths = (button) => {
  const rule = state?.secretPatterns.find((item) => item.id === button.dataset.secretPaths);
  if (!rule?.paths)
    return;
  showRulePopover(button, "Protected paths", rule.label, rule.paths.join(\`
\`));
};
var renderDestructiveCommands = () => {
  if (!state || !preview)
    return;
  const loaded = state;
  const effectiveState = preview;
  const query = qs("policy-search").value.trim().toLowerCase();
  const matchingRules = state.destructiveCommandRules.filter((rule) => [rule.category, rule.label, rule.id, rule.description, tierMeta[tierForRule(rule)][0]].join(" ").toLowerCase().includes(query));
  qs("destructive-command-summary").textContent = draftPolicy.destructive_command_protection.enabled ? \`\${preview.counts.enabled} active, \${preview.counts.disabled} disabled\` : "Configurable protection disabled. Catastrophic protections remain active; saved rule settings and allow paths are preserved.";
  const enforcedRules = matchingRules.filter((rule) => rule.catastrophic);
  const configurableRules = matchingRules.filter((rule) => !rule.catastrophic);
  const enforcedExpanded = tierExpanded.get("enforced") || searchActive && !searchCollapsedTiers.has("enforced");
  const enforcedSection = enforcedRules.length === 0 ? "" : \`<section class="rule-tier rule-tier-enforced">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="enforced" aria-expanded="\${enforcedExpanded}" aria-controls="destructive-tier-enforced">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>Always enforced</strong><small>Cannot be disabled by any preset, rule override, or allow path</small></span>
            <span class="tier-counts">\${enforcedRules.length} protection\${enforcedRules.length === 1 ? "" : "s"}</span>
          </button>
        </div>
        <div id="destructive-tier-enforced" class="tier-content" \${enforcedExpanded ? "" : "hidden"}>
          \${groupRules(enforcedRules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => \`<div class="row rule-row">
                <span class="rule-control">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="state-active">Always enforced</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </span>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
              </div>\`).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  qs("destructive-command-rules").innerHTML = matchingRules.length === 0 ? '<p class="empty">No built-in protections match the search.</p>' : enforcedSection + Object.keys(tierMeta).map((tier) => {
    const rules = configurableRules.filter((rule) => tierForRule(rule) === tier);
    if (rules.length === 0)
      return "";
    const allTierRules = loaded.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === tier);
    const tierStates = allTierRules.flatMap((rule) => effectiveState.rules[rule.id] ?? []);
    const expanded = tierExpanded.get(tier) || searchActive && !searchCollapsedTiers.has(tier);
    const contentId = \`destructive-tier-\${tier}\`;
    return \`<section class="rule-tier rule-tier-\${tier}">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="\${tier}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${tierMeta[tier][0]}</strong><small>\${tierMeta[tier][1]}</small></span>
            <span class="tier-counts">\${tierCountHtml([
      [tierStates.filter((item) => item.enabled).length, "on"],
      [tierStates.filter((item) => !item.enabled).length, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-destructive-tier-active="\${tier}" \${checkbox(tierStates.some((item) => item.enabled))} \${!draftPolicy.destructive_command_protection.enabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${tierMeta[tier][0]} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
          \${groupRules(rules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => {
      const effective = effectiveState.rules[rule.id];
      if (!effective)
        return "";
      const override = draftPolicy.destructive_command_protection.overrides[rule.id];
      const status = ruleStateText(rule, effective, effectiveState.capabilities);
      const disabled = !draftPolicy.destructive_command_protection.enabled;
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
                <label class="rule-control">
                  <input type="checkbox" data-destructive-command-active="\${escapeHtml(rule.id)}" \${checkbox(effective.enabled)} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`\${rule.label}: \${status}\`)}">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="\${effective.enabled ? "state-active" : "state-disabled"}">\${escapeHtml(status)}</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </label>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
                \${override && !effective.changesInherited ? \`<button type="button" class="inherit-button" data-use-inherited="\${escapeHtml(rule.id)}">Use inherited setting</button>\` : ""}
                \${projectFieldChip(\`destructive_command_protection.overrides.\${rule.id}\`, true)}
              </div>\`;
    }).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  }).join("");
};
var refreshPolicyPreview = async () => {
  const requestId = ++previewRequestId;
  const result = await requestPolicyPreview(effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null));
  if (requestId !== previewRequestId)
    return false;
  if (!result.ok || !result.data?.preview) {
    setAppStatus("Preview failed", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  preview = result.data.preview;
  renderProtectionCard();
  renderSafety();
  renderDestructiveCommands();
  runCommandTest();
  return true;
};
var testerRequestId = 0;
var runCommandTest = async () => {
  const command = qs("tester-input").value.trim();
  if (!command) {
    qs("tester-result").hidden = true;
    return;
  }
  const requestId = ++testerRequestId;
  const result = await requestJson("/api/policy/explain", {
    method: "POST",
    body: JSON.stringify({
      command,
      policy: effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null)
    })
  });
  if (requestId !== testerRequestId)
    return;
  const el = qs("tester-result");
  el.hidden = false;
  if (!result.ok) {
    el.className = "status error";
    el.textContent = \`Could not evaluate: \${errorText(result)}\`;
    return;
  }
  if (result.data.result === "allowed") {
    el.className = "status ok";
    el.innerHTML = \`Allowed — no rule blocks this command under the current draft policy. <button type="button" class="feed-toggle" data-create-rule="\${escapeHtml(command)}">Create a rule for this</button>\`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleIdHtml = result.data.customRule ? \`<button type="button" class="rule-id" data-jump-custom-rule="\${escapeHtml(ruleId)}" title="Show this rule in Rules">\${escapeHtml(ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(ruleId)}</code>\`;
  const segment = result.data.segment && result.data.segment !== command ? \`<div class="tester-segment">Segment: <code>\${escapeHtml(result.data.segment)}</code></div>\` : "";
  el.className = "status error";
  el.innerHTML = \`Blocked\${ruleId ? \` by \${ruleIdHtml}\` : ""} — \${escapeHtml(result.data.reason || "")}\${segment}\`;
};
function render() {
  if (!state)
    return;
  draftPolicy = clonePolicy(state.policy);
  preview = state.preview;
  knownRuleIds = new Set([...state.destructiveCommandRules, ...state.secretPatterns].map((rule) => rule.id));
  dirty = false;
  qs("policy-savebar").hidden = true;
  qs("dirty-chip").hidden = true;
  qs("policy-path").textContent = state.path + (state.exists ? "" : " (not created yet)");
  const projectPolicy = state.projectPolicy;
  qs("project-policy-row").hidden = !projectPolicy;
  qs("project-policy-path").textContent = projectPolicy?.path ?? "";
  qs("project-policy-notice").hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs("project-policy-notice").textContent = projectPolicy ? ["Merged on top of this file:", ...projectPolicy.weakenings].join(\`
\`) : "";
  qs("app-version").textContent = state.version;
  renderSafety();
  qs("destructive-command").innerHTML = '<label class="row master"><input type="checkbox" data-destructive-command-enabled ' + checkbox(state.policy.destructive_command_protection.enabled) + '><span><strong>Destructive command protection</strong><small>Block configurable destructive git, filesystem, and execution patterns. Catastrophic and custom rules remain active when disabled.</small></span><span class="master-badge">' + (state.policy.destructive_command_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="destructive-enabled-chip"></span></label>' + '<div id="destructive-command-rules"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="allow-paths-label">Allow paths</strong><small>Recursive deletes targeting these paths are not blocked, like /tmp. The home directory, or any path containing it, is rejected.</small></span><span class="tier-counts" id="allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="allow-paths-content" hidden>' + '<p class="muted">Use an absolute path or a ~/ path. Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="allow-paths-input" data-path-input="allow-paths" autocomplete="off" spellcheck="false" placeholder="/absolute/path or ~/path" aria-labelledby="allow-paths-label"><button type="button" class="icon-button" id="allow-paths-add-button" data-path-add="allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="allow-paths-chip"></span>' + '<ul class="paths-list" id="allow-paths-list"></ul>' + "</div></section>";
  qs("secret").innerHTML = '<label class="row master"><input type="checkbox" id="secret-enabled" ' + checkbox(state.policy.secret_protection.enabled) + '><span><strong>Secret protection</strong><small>Block default sensitive paths, coding CLI credential locations, and configured deny paths.</small></span><span class="master-badge">' + (state.policy.secret_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="secret-enabled-chip"></span></label>' + '<div id="secret-patterns"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="deny-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="deny-paths-label">Deny paths</strong><small>Configured paths and everything inside them are blocked while Secret protection is on.</small></span><span class="tier-counts" id="deny-paths-count"></span></button>' + '<div class="tier-content paths-content" id="deny-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="deny-paths-input" data-path-input="deny-paths" autocomplete="off" spellcheck="false" placeholder="path/to/protect" aria-labelledby="deny-paths-label"><button type="button" class="icon-button" id="deny-paths-add-button" data-path-add="deny-paths" aria-label="Add deny path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="deny-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="deny-paths-chip"></span>' + '<ul class="paths-list" id="deny-paths-list"></ul>' + "</div></section>" + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="secret-allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="secret-allow-paths-label">Allow paths</strong><small>Exact files, subtrees, or one file name under a folder like ~/code/**/.env.local are exempt from pattern rules. Entries covering the home directory are rejected. Deny paths and coding CLI protections still apply.</small></span><span class="tier-counts" id="secret-allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="secret-allow-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="secret-allow-paths-input" data-path-input="secret-allow-paths" autocomplete="off" spellcheck="false" placeholder="~/code/**/.env.local or ~/project/fixtures" aria-labelledby="secret-allow-paths-label"><button type="button" class="icon-button" id="secret-allow-paths-add-button" data-path-add="secret-allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="secret-allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="secret-allow-paths-chip"></span>' + '<ul class="paths-list" id="secret-allow-paths-list"></ul>' + "</div></section>";
  qs("raw").value = state.errors.length ? state.raw : formatPolicy(draftPolicy);
  qs("policy-search").value = "";
  syncSearchState();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  updateRawSource();
  renderRetention(state);
  qs("recovery").hidden = state.errors.length === 0;
  updateActions();
  renderProtectionCard();
  if (state.errors.length) {
    if (currentView() !== "policy")
      location.hash = "policy";
    setAppStatus("Repair required", "error");
    setDetailStatus(\`Error: \${state.errors.join(\`
\`)}\`, "error");
    return;
  }
  setAppStatus("");
  setDetailStatus("");
}
var restoreDraft = () => {
  if (!state || state.errors.length)
    return;
  const stored = sessionStorage.getItem("cc-safety-net-draft");
  if (!stored)
    return;
  const parsed = (() => {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  })();
  const isRecordField = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
  const isOptionalPathList = (value) => value === undefined || Array.isArray(value) && value.every((item) => typeof item === "string");
  const isPolicyShape = isRecordField(parsed) && isRecordField(parsed.safety) && typeof parsed.safety.level === "string" && Object.hasOwn(safetyLevels, parsed.safety.level) && isRecordField(parsed.safety.overrides) && isRecordField(parsed.workflow) && isRecordField(parsed.destructive_command_protection) && isRecordField(parsed.destructive_command_protection.overrides) && isOptionalPathList(parsed.destructive_command_protection.allow_paths) && isRecordField(parsed.secret_protection) && isRecordField(parsed.secret_protection.overrides) && isOptionalPathList(parsed.secret_protection.deny_paths) && isOptionalPathList(parsed.secret_protection.allow_paths) && isRecordField(parsed.audit);
  if (!isPolicyShape || stored === JSON.stringify(state.policy)) {
    sessionStorage.removeItem("cc-safety-net-draft");
    return;
  }
  const draft = parsed;
  draft.destructive_command_protection.allow_paths ??= [];
  draft.secret_protection.deny_paths ??= [];
  draft.secret_protection.allow_paths ??= [];
  draftPolicy = draft;
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Restored unsaved draft", "ok");
};
function renderPolicySections() {
  const masterToggle = document.querySelector("[data-destructive-command-enabled]");
  if (masterToggle)
    masterToggle.checked = draftPolicy.destructive_command_protection.enabled;
  qs("secret-enabled").checked = draftPolicy.secret_protection.enabled;
  syncMasterBadges();
  renderSafety();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  syncRawFromForm();
  updateDirtyStatus();
}
async function load() {
  const result = await requestJson("/api/policy");
  if (!result.ok || !result.data) {
    setAppStatus("Load failed", "error");
    setDetailStatus(\`Error: Could not load policy: \${errorText(result)}\`, "error");
    return false;
  }
  state = result.data;
  render();
  restoreDraft();
  return true;
}
var targetInput = (event) => event.target instanceof HTMLInputElement ? event.target : null;
var targetElement = (event) => event.target instanceof Element ? event.target : null;
document.addEventListener("input", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "policy-search") {
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    return;
  }
  if (input.id === "activity-search" && activity) {
    if (clearCommandFilter())
      renderActivityControls();
    activityFilters.query = input.value.trim().toLowerCase();
    clearTimeout(activityQueryTimer);
    activityQueryTimer = setTimeout(renderActivityFeed, 120);
  }
});
document.addEventListener("keydown", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "tester-input" && event.key === "Enter") {
    event.preventDefault();
    runCommandTest();
    return;
  }
  const list = pathListFor(input.dataset.pathInput);
  if (!list || event.key !== "Enter")
    return;
  event.preventDefault();
  list.add(input.value);
});
document.addEventListener("paste", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  const list = pathListFor(input.dataset.pathInput);
  if (!list)
    return;
  const text = event.clipboardData?.getData("text") ?? "";
  if (!text.includes(\`
\`))
    return;
  event.preventDefault();
  list.add(\`\${input.value}
\${text}\`);
});
var writePolicy = async (path, body, failureStatus) => {
  const result = await requestJson(path, { method: "POST", body });
  if (isWriteSuccess(result))
    return result;
  setAppStatus(failureStatus, "error");
  setDetailStatus(\`Error: \${errorText(result)}\`, "error");
  return null;
};
var reloadAfterWrite = async () => {
  sessionStorage.removeItem("cc-safety-net-draft");
  if (!await load())
    return false;
  dirty = false;
  setDetailStatus("");
  return true;
};
var setProjectDraftDiagnostics = (messages) => {
  qs("project-draft-diagnostics").textContent = messages.join(\`
\`);
  qs("project-draft-diagnostics").hidden = messages.length === 0;
};
var renderProjectDraftBar = () => {
  qs("project-draft-enter").hidden = projectDraft !== null;
  qs("project-draft-bar").hidden = projectDraft === null;
  qs("save").textContent = projectDraft ? "Review & apply" : "Save";
  if (!projectDraft)
    return;
  qs("project-draft-path").textContent = projectDraft.path;
  qs("project-draft-change").hidden = !projectDraft.canPickDirectory;
};
var exitProjectDraft = () => {
  projectDraft = null;
  markedFields = new Set;
  setProjectDraftDiagnostics([]);
  if (state)
    draftPolicy = clonePolicy(state.policy);
  renderProjectDraftBar();
  renderPolicySections();
};
var ingestProjectState = async (okStatus) => {
  const result = await requestJson("/api/policy/project");
  if (!result.ok || !result.data) {
    setAppStatus("Project draft unavailable", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await load();
    setAppStatus("Repair required", "error");
    setDetailStatus([
      "Error: repair your user policy before drafting a project policy.",
      ...Array.isArray(result.data.userPolicyDiagnostics) ? result.data.userPolicyDiagnostics : []
    ].join(\`
\`), "error");
    return false;
  }
  projectDraft = {
    path: result.data.path,
    revision: result.data.revision,
    canPickDirectory: result.data.canPickDirectory === true,
    baseline: seeded.baseline,
    snapshot: seeded.snapshot
  };
  markedFields = seeded.marked;
  draftPolicy = seeded.policy;
  setProjectDraftDiagnostics(Array.isArray(result.data.projectionDiagnostics) ? result.data.projectionDiagnostics : []);
  renderProjectDraftBar();
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus(okStatus, "ok");
  return true;
};
var enterProjectDraft = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: repair your user policy before drafting a project policy.", "error");
    return;
  }
  if (dirty) {
    if (!await confirmDialog({
      title: "Discard unsaved policy changes?",
      body: "A project draft starts from your saved user policy. Save your changes first, or discard them here.",
      confirmLabel: "Discard changes",
      confirmClass: ""
    }))
      return;
    sessionStorage.removeItem("cc-safety-net-draft");
    if (!await load())
      return;
  }
  await ingestProjectState("Drafting a project policy.");
};
var confirmDiscardProjectDraft = async (body) => !dirty || await confirmDialog({
  title: "Discard this project draft?",
  body,
  confirmLabel: "Discard draft",
  confirmClass: ""
});
var changeProjectDirectory = async () => {
  if (!await confirmDiscardProjectDraft("Switching projects discards this draft."))
    return;
  const result = await requestJson("/api/policy/project/choose-directory", { method: "POST" });
  if (!result.ok) {
    setAppStatus("Could not open the folder picker", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return;
  }
  if (result.data.error) {
    setAppStatus(result.data.error, "error");
    return;
  }
  if (result.data.cancelled)
    return;
  await ingestProjectState("Drafting a project policy.");
};
var leaveProjectDraft = async () => {
  if (!await confirmDiscardProjectDraft("The fields you marked are not written anywhere yet."))
    return;
  exitProjectDraft();
  if (await load())
    setAppStatus("Left the project draft.", "ok");
};
var discardProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  if (!await confirmDialog({
    title: "Discard changes to this draft?",
    body: "The draft returns to the fields this project already sets.",
    confirmLabel: "Discard changes",
    confirmClass: ""
  }))
    return;
  const snapshot = JSON.parse(draft.snapshot);
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Changes discarded.", "ok");
};
var handleStaleProjectDraft = async () => {
  if (!await ingestProjectState("Project draft reloaded."))
    return;
  setAppStatus("Project target changed", "error");
  setDetailStatus("Error: the project directory changed, so this draft was reloaded for the new target. Review it again before applying.", "error");
};
var projectDiffHtml = (data) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...data.existingFileDiagnostics?.length ? ["The existing project policy file is invalid and will be replaced."] : [],
    ...data.weakenings ?? []
  ];
  const table = rows.length === 0 ? '<p class="empty">No change to the effective policy.</p>' : \`<table class="diff-table"><thead><tr><th>Setting</th><th>Now</th><th>After</th></tr></thead><tbody>\${rows.map((row) => \`<tr><td><code>\${escapeHtml(row.field)}</code></td><td class="diff-before">\${escapeHtml(row.before ?? "(unset)")}</td><td class="diff-after">\${escapeHtml(row.after ?? "(unset)")}</td></tr>\`).join("")}</tbody></table>\`;
  return table + warnings.map((text) => \`<p class="diff-warning">\${escapeHtml(text)}</p>\`).join("");
};
var reviewProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  const proposal = collectProjectProposal(markedFields, draftPolicy);
  const serialized = JSON.stringify(proposal);
  const body = JSON.stringify({ revision: draft.revision, proposal });
  const diff = await requestJson("/api/policy/project/diff", { method: "POST", body });
  if (projectDraft !== draft)
    return;
  if (diff.status === 409) {
    await handleStaleProjectDraft();
    return;
  }
  if (!diff.ok) {
    setAppStatus("Review failed", "error");
    setDetailStatus(\`Error: \${errorText(diff)}\`, "error");
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    setAppStatus("Review again", "error");
    setDetailStatus("Error: the draft changed while the review was loading. Review it again.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Apply this project policy?",
    body: "Everyone who works in this project gets these changes on top of their own user policy.",
    detail: draft.path,
    rowsHtml: projectDiffHtml(diff.data),
    confirmLabel: "Apply project policy",
    confirmClass: "primary"
  }))
    return;
  await runExclusive("Applying...", async () => {
    const applied = await requestJson("/api/policy/project/apply", { method: "POST", body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      setAppStatus("Apply failed", "error");
      setDetailStatus(\`Error: \${errorText(applied)}\`, "error");
      return;
    }
    const path = applied.data.path;
    exitProjectDraft();
    if (await load())
      setAppStatus(\`Applied \${path}.\`, "ok");
  });
};
var saveRetentionDays = async (days) => {
  const saved = state;
  if (!saved)
    return;
  const current = saved.policy.audit.retention_days;
  if (!Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus(\`Error: retention must be a whole number of days from \${MIN_AUDIT_RETENTION_DAYS} to \${MAX_AUDIT_RETENTION_DAYS}.\`, "error");
    return;
  }
  if (days === current)
    return;
  if (projectDraft) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (dirty) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: save or discard your unsaved Policy changes first.", "error");
    return;
  }
  if (days < current && !await confirmDialog({
    title: \`Shorten retention to \${dayCount(days)}?\`,
    body: \`Audit entries older than \${dayCount(days)} are deleted on the next sweep and cannot be recovered. The Activity tab will only look back \${dayCount(days)}.\`,
    detail: overview?.logsDir ?? "",
    confirmLabel: "Shorten",
    confirmClass: "danger"
  })) {
    qs("retention-days").value = String(current);
    return;
  }
  await runExclusive("Saving...", async () => {
    const policy = clonePolicy(saved.policy);
    policy.audit.retention_days = days;
    if (!await writePolicy("/api/policy", JSON.stringify(policy), "Save failed")) {
      qs("retention-days").value = String(current);
      return;
    }
    if (!await load())
      return;
    activityFilters.days = Math.min(activityFilters.days, days);
    await Promise.all([loadOverview(), loadActivity()]);
    setAppStatus(\`Retention set to \${dayCount(days)}.\`, "ok");
    setDetailStatus("");
  });
};
document.addEventListener("change", (event) => {
  const control = event.target;
  if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement))
    return;
  if (control.id === "activity-days") {
    activityFilters.days = Number(control.value);
    loadActivity();
    return;
  }
  if (control.id === "retention-days") {
    saveRetentionDays(Number(control.value));
    return;
  }
  if (control.name === "safety-level") {
    draftPolicy.safety.level = control.value;
    markProjectField("safety.level");
    renderSafety();
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (control.dataset?.safetyOverride) {
    if (control.value === "inherit" && !projectDraft)
      delete draftPolicy.safety.overrides[control.dataset.safetyOverride];
    if (control.value === "true")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = true;
    if (control.value === "false")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = false;
    if (control.value === "inherit")
      unmarkProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    if (control.value !== "inherit")
      markProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  const input = control instanceof HTMLInputElement ? control : null;
  if (!input)
    return;
  if ("workflowWorktree" in input.dataset) {
    draftPolicy.workflow.worktree_mode = input.checked;
    markProjectField("workflow.worktree_mode");
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if ("destructiveCommandEnabled" in input.dataset) {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable destructive command protection?",
        body: "Built-in destructive git, filesystem, and execution protections will stop blocking commands until you turn this back on.",
        detail: "Custom rules remain active."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.destructive_command_protection.enabled = input.checked;
      markProjectField("destructive_command_protection.enabled");
      syncMasterBadges();
      pathLists["allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (input.dataset?.destructiveTierActive) {
    const effectiveState = preview;
    if (!effectiveState)
      return;
    state?.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === input.dataset.destructiveTierActive).forEach((rule) => {
      setDestructiveOverride(rule.id, input.checked, effectiveState.rules[rule.id]?.inheritedEnabled);
    });
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.destructiveCommandActive) {
    const ruleId = input.dataset.destructiveCommandActive;
    setDestructiveOverride(ruleId, input.checked, preview?.rules[ruleId]?.inheritedEnabled);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.secretGroupActive) {
    state?.secretPatterns.filter((rule) => rule.category === input.dataset.secretGroupActive).forEach((rule) => {
      setSecretOverride(rule, input.checked);
    });
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.dataset?.secretActive) {
    const rule = state?.secretPatterns.find((item) => item.id === input.dataset.secretActive);
    if (!rule)
      return;
    setSecretOverride(rule, input.checked);
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.id === "secret-enabled") {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable secret protection?",
        body: "Default sensitive paths, coding CLI credential locations, and deny paths will stop blocking access until you turn this back on."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.secret_protection.enabled = input.checked;
      markProjectField("secret_protection.enabled");
      syncMasterBadges();
      renderSecretPatterns();
      pathLists["deny-paths"].render();
      pathLists["secret-allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
    })();
  }
});
document.addEventListener("click", (event) => {
  const target = targetElement(event);
  if (!target)
    return;
  if (target.closest("#tester-run")) {
    runCommandTest();
    return;
  }
  if (target.closest("#project-draft-enter")) {
    enterProjectDraft();
    return;
  }
  if (target.closest("#project-draft-change")) {
    changeProjectDirectory();
    return;
  }
  if (target.closest("#project-draft-exit")) {
    leaveProjectDraft();
    return;
  }
  const unmarkButton = target.closest("[data-unmark-field]");
  if (unmarkButton) {
    unmarkProjectField(unmarkButton.dataset.unmarkField ?? "");
    return;
  }
  const createRule = target.closest("[data-create-rule]");
  if (createRule) {
    openRuleComposer(createRule.dataset.createRule ?? "");
    return;
  }
  const feedToggle = target.closest("[data-feed-toggle]");
  if (feedToggle) {
    const command = feedToggle.previousElementSibling;
    if (!command)
      return;
    const expanded = command.classList.toggle("expanded");
    feedToggle.setAttribute("aria-expanded", String(expanded));
    feedToggle.textContent = expanded ? "Show less" : "Show more";
    return;
  }
  const feedCopy = target.closest("[data-log-copy]");
  if (feedCopy) {
    copyFeedEntry(feedCopy);
    return;
  }
  const feedReport = target.closest("[data-report-fp]");
  if (feedReport) {
    openReportDialog(feedReport);
    return;
  }
  const blockFuture = target.closest("[data-block-future]");
  if (blockFuture) {
    const entry = renderedFeedEntries[Number(blockFuture.dataset.blockFuture)];
    if (entry?.segment || entry?.command)
      openRuleComposer(entry.segment || entry.command || "");
    return;
  }
  const topRule = target.closest(".top-rule");
  if (topRule) {
    const ruleId = topRule.dataset.ruleId ?? "";
    (ruleId.startsWith("custom.") ? jumpToRulesRule : jumpToActivityRule)(ruleId);
    return;
  }
  const ruleActivity = target.closest("[data-rule-activity]");
  if (ruleActivity) {
    jumpToActivityRule(ruleActivity.dataset.ruleActivity ?? "");
    return;
  }
  const jumpRule = target.closest("[data-jump-rule]");
  if (jumpRule) {
    qs("policy-search").value = jumpRule.dataset.jumpRule ?? "";
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    location.hash = "policy";
    return;
  }
  const jumpCustom = target.closest("[data-jump-custom-rule]");
  if (jumpCustom) {
    jumpToRulesRule(jumpCustom.dataset.jumpCustomRule ?? "");
    return;
  }
  const topCommand = target.closest(".top-command");
  if (topCommand) {
    activityFilters.command = topCommand.dataset.command ?? "";
    activityFilters.decision = "deny";
    activityFilters.query = "";
    qs("activity-search").value = "";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  if (target.closest("[data-clear-command]")) {
    clearCommandFilter();
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#guard-errors")) {
    clearCommandFilter();
    activityFilters.decision = "error";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  const chip = target.closest("[data-activity-chip]");
  if (chip && activity) {
    clearCommandFilter();
    activityFilters[chip.dataset.activityChip] = chip.dataset.chipValue ?? "";
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#activity-refresh")) {
    refreshActivity();
    return;
  }
  if (target.closest("#integrations-refresh")) {
    refreshIntegrations();
    return;
  }
  if (target.closest("#rules-refresh")) {
    refreshRules();
    return;
  }
  const scopeChip = target.closest("[data-rules-scope]");
  if (scopeChip) {
    setRulesScope(scopeChip.dataset.rulesScope ?? "");
    return;
  }
  const exampleChip = target.closest("[data-rules-example]");
  if (exampleChip) {
    qs("rules-composer-input").value = exampleChip.dataset.rulesExample ?? "";
    return;
  }
  if (target.closest("#rules-choose-directory")) {
    chooseProjectDirectory();
    return;
  }
  if (target.closest("#rules-copy-prompt")) {
    copyRulePrompt();
    return;
  }
  const integrationButton = target.closest("[data-integration-action]");
  if (integrationButton) {
    runIntegrationAction(integrationButton);
    return;
  }
  const ruleExampleButton = target.closest("[data-rule-example]");
  if (ruleExampleButton) {
    openRuleExample(ruleExampleButton);
    return;
  }
  const secretPathsButton = target.closest("[data-secret-paths]");
  if (secretPathsButton) {
    openSecretPaths(secretPathsButton);
    return;
  }
  const tierButton = target.closest("[data-tier-toggle]");
  if (tierButton) {
    const tier = tierButton.dataset.tierToggle ?? "";
    const expanded = tierButton.getAttribute("aria-expanded") === "true";
    tierExpanded.set(tier, !expanded);
    if (searchActive && expanded)
      searchCollapsedTiers.add(tier);
    if (!expanded)
      searchCollapsedTiers.delete(tier);
    renderDestructiveCommands();
    return;
  }
  const secretGroupButton = target.closest("[data-secret-group-toggle]");
  if (secretGroupButton) {
    const category = secretGroupButton.dataset.secretGroupToggle ?? "";
    const expanded = secretGroupButton.getAttribute("aria-expanded") === "true";
    secretGroupExpanded.set(category, !expanded);
    if (searchActive && expanded)
      searchCollapsedSecretGroups.add(category);
    if (!expanded)
      searchCollapsedSecretGroups.delete(category);
    renderSecretPatterns();
    return;
  }
  if (target.closest("[data-secret-group-active], [data-destructive-tier-active]"))
    return;
  const button = target.closest(".panel-toggle, .rule-tier-head");
  if (button) {
    togglePanel(button);
    return;
  }
  const inheritedButton = target.closest("[data-use-inherited]");
  if (inheritedButton) {
    const ruleId = inheritedButton.dataset.useInherited ?? "";
    if (projectDraft) {
      unmarkProjectField(\`destructive_command_protection.overrides.\${ruleId}\`);
      return;
    }
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (target.closest("#reset-rule-customizations")) {
    if (Object.keys(draftPolicy.destructive_command_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in destructive-command rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("destructive_command_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.destructive_command_protection.overrides = {};
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#reset-secret-customizations")) {
    if (Object.keys(draftPolicy.secret_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in secret rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("secret_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.secret_protection.overrides = {};
      renderSecretPatterns();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#discard-changes")) {
    if (projectDraft) {
      discardProjectDraft();
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Discard unsaved changes?",
        body: "All changes since your last save will be reverted.",
        confirmLabel: "Discard changes",
        confirmClass: ""
      }))
        return;
      runExclusive("Discarding...", async () => {
        sessionStorage.removeItem("cc-safety-net-draft");
        if (await load())
          setAppStatus("Changes discarded.", "ok");
      });
    })();
    return;
  }
  const addButton = target.closest("[data-path-add]");
  if (addButton) {
    const list = pathListFor(addButton.dataset.pathAdd);
    if (list)
      list.add(qs(\`\${addButton.dataset.pathAdd}-input\`).value);
    return;
  }
  const removeButton = target.closest("[data-path-remove]");
  if (removeButton)
    pathListFor(removeButton.dataset.pathList)?.remove(Number(removeButton.dataset.pathRemove));
  const starButton = target.closest(".star-cta");
  if (starButton instanceof HTMLButtonElement) {
    starRepo(starButton);
    return;
  }
});
qs("dirty-chip").onclick = () => {
  location.hash = "policy";
};
qs("save").onclick = () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: Repair policy before saving changes.", "error");
    return;
  }
  if (projectDraft) {
    reviewProjectDraft();
    return;
  }
  if (!dirty) {
    setAppStatus("No changes to save", "ok");
    setDetailStatus("");
    return;
  }
  const policy = collectFormPolicy();
  runExclusive("Saving...", async () => {
    const result = await writePolicy("/api/policy", JSON.stringify(policy), "Save failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Saved \${result.data.path}.\`, "ok");
  });
};
qs("repair").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length === 0) {
    setAppStatus("");
    setDetailStatus("");
    return;
  }
  if (!await confirmDialog({
    title: "Repair policy?",
    body: "This will write canonical policy JSON. Valid settings are preserved; invalid fields are discarded. If the JSON cannot be parsed, defaults are restored.",
    detail: state.path,
    confirmLabel: "Repair",
    confirmClass: "primary"
  })) {
    return;
  }
  runExclusive("Repairing...", async () => {
    const result = await writePolicy("/api/repair", "{}", "Repair failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Repaired \${result.data.path}.\`, "ok");
  });
};
qs("reset").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (projectDraft) {
    setAppStatus("Reset unavailable", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Reset policy?",
    body: "This will restore the default policy JSON at this path.",
    detail: state.path,
    confirmLabel: "Reset policy"
  })) {
    return;
  }
  runExclusive("Resetting...", async () => {
    const result = await writePolicy("/api/reset", "{}", "Reset failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Reset \${result.data.path} to defaults.\`, "ok");
  });
};
setRawCopyCopied(false);
qs("raw-copy").onclick = () => {
  copyRawToClipboard();
};
var themeOrder = ["auto", "light", "dark"];
var themeIcons = {
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"></rect><path d="M8 20h8M12 16v4"></path></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"></path></svg>',
  dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>'
};
var themeLabels = { auto: "Auto", light: "Light", dark: "Dark" };
var applyTheme = (pref) => {
  document.documentElement.style.colorScheme = pref === "auto" ? "light dark" : pref;
  qs("theme-toggle").innerHTML = \`\${themeIcons[pref]}<span>\${themeLabels[pref]}</span>\`;
  qs("theme-toggle").setAttribute("aria-label", \`Color theme: \${themeLabels[pref]}. Click to change.\`);
};
var themePref = themeOrder.includes(localStorage.getItem("cc-safety-net-theme")) ? localStorage.getItem("cc-safety-net-theme") : "auto";
applyTheme(themePref);
qs("theme-toggle").onclick = () => {
  themePref = themeOrder[(themeOrder.indexOf(themePref) + 1) % themeOrder.length] ?? "auto";
  if (themePref === "auto")
    localStorage.removeItem("cc-safety-net-theme");
  else
    localStorage.setItem("cc-safety-net-theme", themePref);
  applyTheme(themePref);
};
window.addEventListener("beforeunload", (event) => {
  if (!dirty)
    return;
  event.preventDefault();
  event.returnValue = "";
});
window.addEventListener("hashchange", applyView);
applyView();
Promise.all([loadIntegrations(), requestJson("/api/health")]).then(([, health]) => renderHealthStrip(health));
load().then((loaded) => {
  if (loaded)
    loadStarContext();
  activityFilters.days = Math.min(activityFilters.days, retentionDays());
  loadOverview();
  loadActivity();
}).catch((error) => {
  setAppStatus("Load failed", "error");
  setDetailStatus(String(error), "error");
});

  </script>
</body>
</html>
`;var Gu='<script id="ccsn-data" type="application/json">';function Bu(I){return Uu.replace(Gu,()=>Gu+JSON.stringify({token:I}).replaceAll("<","\\u003c"))}var bo="kenryu42/cc-safety-net",Mb=`https://github.com/${bo}`,ps=1e4,Ub=7,Gb="The project draft directory changed; reload the draft before applying.",Bb="audit settings are user scope only; remove the audit section from a project proposal";async function Ku(I,_={}){let O=gn({label:"gui",booleans:{noOpen:["--no-open"]}},I),F=_.log??console.log,J=_.error??console.error;if(O.errors.length>0){for(let ne of O.errors)J(ne);return J("Usage: cc-safety-net gui [--no-open]"),1}let K=await qb(c,_);if(F(`CC Safety Net policy GUI: ${K.url}`),!O.flags.noOpen)try{await(_.openBrowser??nw)(K.url)}catch(ne){J(`Failed to open browser: ${ne instanceof Error?ne.message:String(ne)}`),J(`Open this URL manually: ${K.url}`)}if(_.keepAlive===!1)return await K.close(),0;return await ew(K),0}async function qb(I,_={}){let O=Nb(24).toString("base64url"),F={dir:null,revision:0},J=Fb((oe,ue)=>{Vb(I,oe,ue,O,_,F)});await new Promise((oe,ue)=>{J.once("error",ue),J.listen(0,"127.0.0.1",()=>{J.off("error",ue),oe()})});let ne=`http://127.0.0.1:${J.address().port}`;return{origin:ne,token:O,url:`${ne}/?token=${encodeURIComponent(O)}`,close:()=>Qb(J)}}async function Vb(I,_,O,F,J,K){let ne=I(),oe=new URL(_.url??"/","http://127.0.0.1");if(_.method==="GET"&&oe.pathname==="/favicon.ico"){O.writeHead(204,{"cache-control":"no-store"}),O.end();return}if(!Yb(_,oe,F)){ln(O,403,{error:"Forbidden"});return}if(_.method==="GET"&&oe.pathname==="/"){Xb(O,Bu(F));return}if(_.method==="GET"&&oe.pathname==="/api/policy"){let ue=Bd(ne,J),pe=E(ne,ds(J));ln(O,200,{...ue,configState:je(pe),...pe.policyScopes?{projectPolicy:{path:b(J.cwd??process.cwd()),weakenings:pe.policyScopes.weakeningsIgnored?[]:pe.policyScopes.weakenings}}:{},destructiveCommandRules:B,secretPatterns:Qe,version:pn(),preview:ue.errors.length>0?null:Le(ue.policy,ne.env)});return}if(_.method==="POST"&&oe.pathname==="/api/policy/preview"){let ue=await ur(_);if(!ue.ok){ln(O,ue.status,{errors:[ue.error]});return}let pe=qd(ne,ue.value);ln(O,pe.errors.length>0?400:200,pe);return}if(_.method==="POST"&&oe.pathname==="/api/policy/explain"){let ue=await ur(_);if(!ue.ok){ln(O,ue.status,{errors:[ue.error]});return}let pe=ue.value;if(pe===null||typeof pe.command!=="string"){ln(O,400,{errors:["command must be a string"]});return}let we=sr(pe.policy,ne.home);if(we.length>0){ln(O,400,{errors:we});return}ln(O,200,Kb(ne,pe.command,pe.policy,J));return}if(_.method==="POST"&&oe.pathname==="/api/policy"){let ue=await ur(_);if(!ue.ok){ln(O,ue.status,{errors:[ue.error]});return}let pe=Hn(ne,ue.value,J);ln(O,pe.errors.length>0?400:200,pe);return}if(_.method==="POST"&&oe.pathname==="/api/reset"){ln(O,200,Hn(ne,ee,J));return}if(_.method==="POST"&&oe.pathname==="/api/repair"){ln(O,200,Vd(ne,J));return}if(_.method==="POST"&&oe.pathname==="/api/policy/project/choose-directory"){let ue=await(J.chooseDirectory??cs)();if("path"in ue)K.dir=ue.path,K.revision+=1;ln(O,200,{cancelled:"cancelled"in ue,..."error"in ue?{error:ue.error}:{}});return}if(_.method==="GET"&&oe.pathname==="/api/policy/project"){let ue=Wu(K,J),pe=qu(ue,ne.home),we=ar(ne,J);ln(O,200,{path:b(ue),revision:K.revision,baseline:we.baseline,userPolicyDiagnostics:we.diagnostics,projection:pe.projection,projectionDiagnostics:pe.diagnostics,canPickDirectory:ls(process.platform,process.env)});return}if(_.method==="POST"&&oe.pathname==="/api/policy/project/diff"){let ue=await Vu(ne,_,O,K,J);if(!ue)return;let pe=qu(ue.dir,ne.home),we=ar(ne,J).baseline,xe=Q(we,le(ue.proposal,ne.home).policy);ln(O,200,{rows:oo(Q(we,pe.projection).policy,xe.policy,!1),weakenings:xe.weakenings,existingFileDiagnostics:pe.diagnostics});return}if(_.method==="POST"&&oe.pathname==="/api/policy/project/apply"){let ue=await Vu(ne,_,O,K,J);if(!ue)return;let pe=zb(ue.dir,ue.proposal,ne.home);ln(O,pe.errors.length>0?500:200,pe);return}if(_.method==="GET"&&oe.pathname==="/api/activity"){let ue=re(ne,J),pe=Wb(oe.searchParams.get("days"),ue);if(pe===null){ln(O,400,{error:`days must be an integer between 1 and ${ue}`});return}ln(O,200,ju(ne,pe,J.activityLogsDir));return}if(_.method==="POST"&&oe.pathname==="/api/rules/choose-directory"){ln(O,200,await cs());return}if(_.method==="GET"&&oe.pathname==="/api/rules"){let ue=X(ne,ds(J)),pe=new Map(ue.rules.map((we)=>[we.name,we]));ln(O,200,{projectPath:J.cwd??process.cwd(),canPickDirectory:ls(process.platform,process.env),rulebooks:ue.rulebooks.map((we)=>({source:we.source,spec:we.spec,name:we.name,version:we.version,rules:we.rules.flatMap((xe)=>{let Se=pe.get(xe);if(!Se)return[];return[{name:Se.name,command:Se.command,subcommand:Se.subcommand,block_args:Se.block_args,reason:Se.reason}]})})),errors:ue.errors,warnings:ue.warnings});return}if(_.method==="GET"&&oe.pathname==="/api/star/context"){ln(O,200,await(J.fetchStarContext??(()=>aw(ne,{logsDir:J.activityLogsDir})))());return}if(_.method==="POST"&&oe.pathname==="/api/star"){let ue=await(J.starRepo??tw)();ln(O,200,ue.ok?{ok:!0}:{ok:!1,fallbackUrl:Mb});return}if(_.method==="GET"&&oe.pathname==="/api/integrations"){ln(O,200,await(J.fetchIntegrations??(()=>rw(ne)))());return}if(_.method==="GET"&&oe.pathname==="/api/health"){ln(O,200,await(J.fetchHealth??iw)());return}if(_.method==="POST"&&(oe.pathname==="/api/install"||oe.pathname==="/api/uninstall")){let ue=await ur(_);if(!ue.ok){ln(O,ue.status,{errors:[ue.error]});return}let pe=ue.value?.target;if(typeof pe!=="string"||!$n.some((xe)=>xe.target===pe)){ln(O,400,{error:"unknown target"});return}let we=oe.pathname==="/api/install"?"install":"uninstall";ln(O,200,await(J.runIntegration??sw)(we,pe));return}ln(O,404,{error:"Not found"})}function ds(I){return{...I,cwd:I.cwd??process.cwd()}}function Wu(I,_){return I.dir??_.cwd??process.cwd()}function qu(I,_){let O=b(I),F=jb(O)?bt(O):{value:void 0,errors:[]},J=le(F.value,_);return{projection:J.policy,diagnostics:[...F.errors,...J.diagnostics]}}async function Vu(I,_,O,F,J){let K=Wu(F,J),ne=F.revision,oe=await ur(_);if(!oe.ok)return ln(O,oe.status,{errors:[oe.error]}),null;let ue=oe.value;if(typeof ue?.revision!=="number")return ln(O,400,{errors:["revision must be a number"]}),null;if(ue.revision!==ne)return ln(O,409,{errors:[Gb]}),null;let pe=Jb(ue.proposal,I.home);if(pe.length>0)return ln(O,400,{errors:pe}),null;return{dir:K,proposal:ue.proposal}}function Jb(I,_){let O=sr(I,_);if(O.length>0)return O;return I?.audit===void 0?[]:[Bb]}function zb(I,_,O){let F=b(I),J=io(_,C(_,O));try{return g(i(x(I,"project policy"),F),`${JSON.stringify(J,null,2)}
`),{path:F,errors:[]}}catch(K){return{path:F,errors:[K instanceof Error?K.message:String(K)]}}}function Kb(I,_,O,F){let J=C(O,I.home),K=E(I,ds(F)),ne=Te({rules:K.policy.rules,transparentWrappers:K.policy.transparentWrappers,safety:$e(J.safety),worktreeMode:J.workflow.worktree_mode,destructiveCommandProtectionEnabled:J.destructive_command_protection.enabled,destructiveCommandRuleOverrides:J.destructive_command_protection.overrides,destructiveCommandAllowPaths:J.destructive_command_protection.allow_paths,secretProtection:{enabled:J.secret_protection.enabled,disabledRules:Me(J.secret_protection.overrides),denyPaths:J.secret_protection.deny_paths,allowPaths:J.secret_protection.allow_paths}});return Qt(_,{policySnapshot:ne,cwd:F.cwd,userConfigDir:F.userConfigDir},I)}function Wb(I,_){if(I===null)return Math.min(Ub,_);let O=Number(I);if(!Number.isInteger(O)||O<1||O>_)return null;return O}function Yb(I,_,O){if(_.searchParams.get("token")!==O)return!1;if(I.method!=="POST")return!0;return I.headers["x-cc-safety-net-token"]===O}var Zb=1048576;async function ur(I){let _=[],O=0;for await(let F of I){let J=F;if(O+=J.byteLength,O>Zb)return{ok:!1,status:413,error:"Request body is too large"};_.push(J)}try{return{ok:!0,value:JSON.parse(Buffer.concat(_).toString("utf-8")||"{}")}}catch(F){return{ok:!1,status:400,error:`Invalid JSON: ${F instanceof Error?F.message:String(F)}`}}}function Xb(I,_){I.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),I.end(_)}function ln(I,_,O){I.writeHead(_,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),I.end(JSON.stringify(O))}function Qb(I){return new Promise((_,O)=>{I.close((F)=>F?O(F):_())})}function ew(I){return new Promise((_)=>{let O=()=>{process.off("SIGINT",F),process.off("SIGTERM",F)},F=()=>{O(),I.close().then(_)};process.once("SIGINT",F),process.once("SIGTERM",F)})}function nw(I){let _=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",O=process.platform==="win32"?["/c","start","",I]:[I];return new Promise((F,J)=>{let K=zu(_,O,{detached:!0,stdio:"ignore"}),ne=(ue)=>{K.off("spawn",oe),J(ue)},oe=()=>{K.off("error",ne),K.unref(),F()};K.once("error",ne),K.once("spawn",oe)})}async function tw(I="gh",_=ps){return{ok:await us(I,["api","-X","PUT",`/user/starred/${bo}`],_)===0}}async function rw(I,_={}){let O=await xr((J)=>Ot({environment:I,cwd:process.cwd(),openCodeVersion:J}).status!=="n/a",_.fetcher),F=ow(I,O);return{targets:En.map((J)=>{let K=F.find((ne)=>ne.platform===J.id);return{target:J.id,label:mn(J.id),version:O.versions[J.id]??null,status:K?.configured?"active":K?.detected?"disabled":K?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:O.version,nodeVersion:O.nodeVersion,platform:O.platform}}}function ow(I,_){return Dt(I,process.cwd(),{ampPluginListOutput:_.ampPluginListOutput,codexPluginListOutput:_.codexPluginListOutput,copilotCliVersion:_.versions["copilot-cli"],openCodeVersion:_.versions.opencode,openCodePluginListOutput:_.openCodePluginListOutput})}async function iw(I={}){let _=await(I.checkUpdates??Gn)();return{update:{latestVersion:_.latestVersion??null,updateAvailable:_.updateAvailable}}}var Ju=Promise.resolve();function sw(I,_,O={}){let F=async()=>{let K=[],{log:ne,error:oe}=console;console.log=(...ue)=>K.push(ue.map(String).join(" ")),console.error=console.log;try{return{ok:await ir(I,[],{selectTargets:async()=>[_],output:new Hb({write(pe,we,xe){K.push(String(pe).replace(/\n$/,"")),xe()}}),...O})===0,output:K.join(`
`)}}finally{console.log=ne,console.error=oe}},J=Ju.then(F);return Ju=J.then(()=>{return},()=>{return}),J}async function aw(I,_={}){let[O,F,J]=await Promise.all([lw(_.command),cw(_.fetchRepo),Promise.resolve(yr(I,re(I),_.logsDir).totalBlocked)]);return{starred:O,starCount:F,blockedTotal:J}}async function lw(I="gh",_=ps){if(await us(I,["auth","status"],_)!==0)return null;let O=await us(I,["api",`/user/starred/${bo}`],_);if(O===0)return!0;if(O===null)return null;return!1}function us(I,_,O){return new Promise((F)=>{let J=zu(I,_,{stdio:"ignore",windowsHide:!0}),K=!1,ne=setTimeout(()=>{J.kill(),oe(null)},O),oe=(ue)=>{if(K)return;K=!0,clearTimeout(ne),F(ue)};J.once("error",()=>oe(null)),J.once("close",oe)})}async function cw(I=fetch){try{let _=await I(`https://api.github.com/repos/${bo}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(ps)});if(!_.ok)return null;let O=await _.json();return typeof O.stargazers_count==="number"?O.stargazers_count:null}catch{return null}}function dw(I){if(I[0]!=="help")return!1;let _=I[1];if(!_)Li(),process.exit(0);if(er(_))process.exit(0);console.error(`Unknown command: ${_}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var uw={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),er("hook",console.error),process.exit(1)},install:async(I)=>{process.exit(await ir("install",I))},update:async(I)=>{process.exit(await Yi(I))},uninstall:async(I)=>{process.exit(await ir("uninstall",I))},rule:async(I)=>{process.exit(await Du(c(),I))},policy:async(I)=>{process.exit(await Wd(c(),I))},status:async(I)=>{if(Dn(gn({label:"status"},I).errors))process.exit(1);Nu(c())},statusline:async(I)=>{let _=gn({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},I);if(_.errors.length===0&&_.flags.claudeCode){await as(c());return}if(Dn(_.errors),!_.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");er("statusline",console.error),process.exit(1)},doctor:async(I)=>{let _=Ei(I);if(!_)process.exit(1);let O=await uc(c(),{json:_.json,skipUpdateCheck:_.skipUpdateCheck});process.exit(O)},logs:async(I)=>{process.exit(await ws(c(),I))},gui:async(I)=>{process.exit(await Ku(I))},explain:async(I)=>{process.exit(await xc(c(),I))}};async function pw(I){let _=gn({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},I);if(dw(I))return;let O=I[0],F=O?hr(O):void 0;if(_.help&&F&&F.name!=="rule")er(F.name),process.exit(0);if(!O||_.help&&!F)Li(),process.exit(0);if(_.flags.version)Rc(),process.exit(0);if(F){await uw[F.name](I.slice(1));return}if(O==="--statusline"){await as(c());return}console.error(O.startsWith("-")?`Unknown option: ${O}`:`Unknown command: ${O}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{pw as runCli};
