import{a,s,Te,We,k,tt,Be,c,o,ze,R,L,Ce,rt,f,qe,l,r,v,i,ie,n,g,pe,j,it,st,u,fe,me,at,O,Y,se,S,ct,U,b,Ee,G,d,Z,Ke,Je,D,w,_,ge,he,Pe,lt,m,e,Ae,ke,Ye,Ze,ae,Re,ce,Ie,X,H,Oe,ye,W,Xe,B,Q,ee,le,Qe,et,C,z,De,Fe,Me,E,$e,Le,je,h,t,te,be,y,x,P,ut,Ue,Ge,p,V}from"./chunks/index-5fcd0taj.js";import{re,q,He,F,M}from"./chunks/index-2tqmwpdf.js";var bu=["-h","--help"];function xt(A,T){let I=Object.entries(A.booleans??{}),N=Object.entries(A.values??{}),J=Object.entries(A.lists??{}),K=Object.fromEntries(I.map(([Se])=>[Se,!1])),ne={},oe=Object.fromEntries(J.map(([Se])=>[Se,[]])),de=[],ue=[],ve=!1,xe=-1;for(let[Se,_e]of T.entries()){if(Se<=xe)continue;if(_e==="--"){de.push(...T.slice(Se+1));break}if(bu.includes(_e)){ve=!0;continue}let we=I.find(([,Ve])=>Ve.includes(_e));if(we){K[we[0]]=!0;continue}let Ne=N.find(([,Ve])=>Ve.includes(_e));if(Ne){let Ve=T[Se+1];if(Ve===void 0||Ve.startsWith("-")){ue.push(`${_e} requires a value`);continue}ne[Ne[0]]=Ve,xe=Se+1;continue}let nt=J.find(([,Ve])=>Ve.includes(_e));if(nt){let Ve=T.slice(Se+1),ft=Ve.findIndex((gt)=>gt.startsWith("-")),mt=Ve.slice(0,ft===-1?Ve.length:ft);if(mt.length===0){ue.push(`${_e} requires at least one value`);continue}oe[nt[0]]=[...oe[nt[0]]??[],...mt],xe=Se+mt.length;continue}if(_e.startsWith("-")){ue.push(`Unknown option for ${A.label}: ${_e}`);continue}if(A.positionals==="tail"){de.push(...T.slice(Se));break}de.push(_e)}if(A.positionals!=="list"&&A.positionals!=="tail")ue.push(...de.map((Se)=>`Unexpected argument for ${A.label}: ${Se}`));return{flags:K,values:ne,lists:oe,positionals:de,help:ve,errors:ue}}function Ut(A){for(let T of A)console.error(T);return A.length>0}import{readdirSync as Ru,statSync as es,unlinkSync as Pu}from"node:fs";import{basename as ts,dirname as Eu,isAbsolute as Du,join as Au,relative as _u,resolve as Tu,sep as Iu}from"node:path";var Xi=(A)=>{let T=Date.now()-new Date(A).getTime();if(!Number.isFinite(T))return"";let I=Math.floor(T/60000),N=Math.floor(I/60),J=Math.floor(N/24);if(J>0)return`${J}d ago`;if(N>0)return`${N}h ago`;if(I>0)return`${I}m ago`;return"just now"},co=(A)=>{let T=(A??"").trim().split(/\s+/).filter((J)=>J&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(J)),I=T[0]?.split("/").pop();if(!I)return null;let N=T[1];return N&&/^[a-z][a-z0-9-]*$/.test(N)?`${I} ${N}`:I};function Zi(A){let T=(J)=>`${J.sessionId}
${co(J.segment||J.command)}`,I=A.filter((J)=>J.decision!=="allow"),N=I.filter((J)=>J.sessionId).reduce((J,K)=>J.set(T(K),(J.get(T(K))??0)+1),new Map);return new Set(I.filter((J)=>J.failureStage||(N.get(T(J))??0)>=2))}import{existsSync as Lu,readdirSync as wu,readFileSync as ku}from"node:fs";import{join as xu}from"node:path";function en(A,T){try{return wu(A,{withFileTypes:!0,encoding:"utf8"}).flatMap((I)=>{let N=xu(A,I.name);if(I.isDirectory())return en(N,T);if(I.name.endsWith(".jsonl"))return[N];return[]})}catch{if(T&&Lu(A))T.count++;return[]}}var Cu=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function Su(A){if(!A||typeof A!=="object"||Array.isArray(A))return!1;let T=A;if(typeof T.ts!=="string"||typeof T.command!=="string")return!1;return Cu.every((I)=>T[I]===void 0||typeof T[I]==="string")}function hn(A,T){try{return ku(A,"utf-8").split(`
`).filter(Boolean).flatMap((I)=>{try{let N=JSON.parse(I);if(!Su(N)){if(T)T.count++;return[]}return[N]}catch{if(T)T.count++;return[]}})}catch{if(T)T.count++;return[]}}function Ct(A){return Array.from(A,(T)=>{let I=T.charCodeAt(0);if(I<=31||I>=127&&I<=159)return`\\x${I.toString(16).padStart(2,"0")}`;return T}).join("")}function $u(A,T){let I=re(A),N=xt({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},T);if(Ut(N.errors))return null;if(N.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(N.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let J=N.values.limit===void 0?20:Qi(N.values.limit);if(J===null)return console.error("--limit must be a positive number"),null;let K=N.values.since===void 0?Math.min(30,I):Qi(N.values.since);if(K===null||K>I)return console.error(`--since must be a positive number of days no greater than ${I}`),null;let ne={limit:J,limitExplicit:N.values.limit!==void 0,since:K,sinceExplicit:N.values.since!==void 0,all:N.flags.all,json:N.flags.json,suspect:N.flags.suspect,pruneLegacy:N.flags.pruneLegacy,dryRun:N.flags.dryRun,id:N.values.id,agent:N.values.agent,rule:N.values.rule,session:N.values.session,project:N.values.project===void 0?void 0:Tu(N.values.project)};if(ne.id&&(ne.agent!==void 0||ne.rule!==void 0||ne.session!==void 0||ne.project!==void 0||ne.suspect||ne.sinceExplicit||ne.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ne.pruneLegacy&&(ne.id!==void 0||ne.agent!==void 0||ne.rule!==void 0||ne.session!==void 0||ne.project!==void 0||ne.suspect||ne.all||ne.sinceExplicit||ne.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ne.dryRun&&!ne.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ne}async function ns(A,T,I={}){let N=$u(A,T);if(!N)return 1;let J=I.logsDir??F(A);if(N.pruneLegacy)return Ou(J,N.json,N.dryRun);if(!J)return console.log(N.json?"[]":N.id?`No retained audit log entry found for id ${Ct(N.id)}.`:"No audit log entries found."),0;q(A,J);let K={count:0},ne=en(J,K).flatMap((xe)=>hn(xe,K).map((Se)=>({entry:Se,file:xe})));if(K.count>0)console.error(`warning: ${K.count} audit log ${K.count===1?"source":"sources"} could not be read; these results are incomplete`);if(N.id)return Mu(ne,N,I.timeZone);let oe=Date.now()-N.since*24*60*60*1000,de=ne.filter((xe)=>Hu(xe,N,J,oe)),ue=N.suspect?Zi(de.map((xe)=>xe.entry)):null,ve=(ue?de.filter((xe)=>ue.has(xe.entry)):de).sort((xe,Se)=>Date.parse(Se.entry.ts)-Date.parse(xe.entry.ts)).slice(0,N.limit);if(N.json)return console.log(JSON.stringify(ve.map((xe)=>xe.entry),null,2)),0;if(ve.length===0)return console.log("No audit log entries found."),0;for(let xe of ve)console.log(Bu(xe.entry,I.timeZone));return 0}function Ou(A,T,I){let N=A?Fu(A).map((oe)=>Au(A,oe)):[];if(I)return Nu(N,T);let J=[],K=0,ne=0;for(let oe of N){let de=es(oe,{throwIfNoEntry:!1})?.size??0,ue=ju(oe);if(ue){J.push(`${ts(oe)}: ${ue}`);continue}K++,ne+=de}if(T)return console.log(JSON.stringify({removedFiles:K,removedBytes:ne,failedFiles:J.length})),J.length===0?0:1;console.log(K===0&&J.length===0?"No legacy audit log files found.":`Removed ${K} legacy audit log ${K===1?"file":"files"} (${rs(ne)}).`);for(let oe of J)console.error(`Could not remove ${Ct(oe)}`);if(console.log("Nested v2 audit logs were not changed."),K>0)console.log("This deletion cannot be undone.");return J.length===0?0:1}function Nu(A,T){let I=A.reduce((N,J)=>N+(es(J,{throwIfNoEntry:!1})?.size??0),0);if(T)return console.log(JSON.stringify({dryRun:!0,files:A.length,bytes:I})),0;if(console.log(A.length===0?"No legacy audit log files found.":`Would remove ${A.length} legacy audit log ${A.length===1?"file":"files"} (${rs(I)}).`),console.log("Nested v2 audit logs are not included."),A.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function Fu(A){try{return Ru(A,{withFileTypes:!0}).filter((T)=>T.isFile()&&T.name.endsWith(".jsonl")).map((T)=>T.name)}catch{return[]}}function ju(A){try{return Pu(A),null}catch(T){return T instanceof Error?T.message:String(T)}}function rs(A){let T=["B","KiB","MiB","GiB"],I=Math.min(Math.floor(Math.log2(Math.max(A,1))/10),T.length-1);return`${Math.round(A/1024**I*10)/10} ${T[I]}`}function Mu(A,T,I){let N=A.filter((K)=>K.entry.id===T.id);if(N.length>1)return console.error(`Multiple audit log entries found for id ${Ct(T.id??"")}.`),1;if(T.json)return console.log(JSON.stringify(N.map((K)=>K.entry),null,2)),0;let J=N[0];if(!J)return console.log(`No retained audit log entry found for id ${Ct(T.id??"")}.`),0;return console.log(qu(J.entry,I)),0}function Hu(A,T,I,N){if(!T.all&&A.entry.decision==="allow")return!1;if(Date.parse(A.entry.ts)<N)return!1;if(T.agent!==void 0&&A.entry.agent!==T.agent)return!1;if(T.rule!==void 0&&A.entry.ruleId!==T.rule)return!1;if(T.session!==void 0&&!Uu(A,I,T.session))return!1;if(T.project!==void 0&&!Gu(A.entry.cwd,T.project))return!1;return!0}function Uu(A,T,I){if(A.entry.sessionId===I)return!0;return Eu(A.file)===T&&ts(A.file,".jsonl")===I}function Gu(A,T){if(!A)return!1;let I=_u(T,A);return I!==".."&&!I.startsWith(`..${Iu}`)&&!Du(I)}function Bu(A,T){let I=Ct(A.id??"-"),N=Ct(A.decision??"deny"),J=A.cwd?`  [${Ct(A.cwd)}]`:"",K=A.segment||A.command,ne=K===A.command?"":"↳ ",oe=K.length>50?`${K.slice(0,50)}…`:K;return`${I.padEnd(16)}  ${Ct(os(A.ts,T))}  ${N.padEnd(5)}  ${Ct(A.agent??"-").padEnd(15)}  ${Ct(A.ruleId??"-").padEnd(20)}  ${ne}${Ct(oe)}${J}`}function qu(A,T){let I=(J)=>Ct(J===void 0||J===null||J===""?"-":J),N=A.shape?`${A.agent??"-"} (shape: ${A.shape})`:A.agent??"-";return[`id:        ${I(A.id)}`,`ts:        ${I(os(A.ts,T))}`,`decision:  ${I(A.decision)}`,`agent:     ${I(N)}`,`level:     ${I(A.level)}`,`tool:      ${I(A.toolName)}`,`rule:      ${I(A.ruleId)}`,`intent:    ${I(A.intent)}`,`stage:     ${I(A.failureStage)}`,`error:     ${I(A.errorCode)}`,`session:   ${I(A.sessionId)}`,`cwd:       ${I(A.cwd)}`,`version:   ${I(A.v)}`,`truncated: ${I(A.truncated===!0?"yes":void 0)}`,`reason:    ${I(A.reason)}`,`command:   ${I(A.command)}`,`segment:   ${I(A.segment)}`].join(`
`)}function os(A,T){let I=new Date(A);if(Number.isNaN(I.getTime()))return A;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:T}).format(I)}function Qi(A){let T=Number(A);return Number.isFinite(T)&&T>0?T:null}var is={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var ss={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var as={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var uo=["npx","--offline","--no-install","@deepseek-ai/dsh","--version"],ir=[{id:"antigravity-cli",displayName:"Antigravity CLI",doctorOrder:3,runtime:{order:1,flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:2,flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",doctorOrder:1,runtime:{order:2,displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{order:3,flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",doctorOrder:4,runtime:{order:3,flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{order:4,flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",doctorOrder:8,runtime:{order:6,flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{order:8,flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",doctorOrder:7,runtime:{order:5,flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{order:7,flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",doctorOrder:9,runtime:{order:7,flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{order:9,flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",doctorOrder:10,runtime:{order:8,flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{order:10,flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",doctorOrder:11,runtime:{order:9,flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{order:11,flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",doctorOrder:12,install:{order:12,flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",doctorOrder:13,install:{order:13,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",doctorOrder:14,install:{order:14,flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",doctorOrder:5,runtime:{order:4,flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{order:5,flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"deepseek-harness",displayName:"DeepSeek Harness",doctorOrder:6,install:{order:6,flag:"--deepseek-harness",artifactKind:"package",probeCommand:uo}},{id:"amp",displayName:"Amp Code",doctorOrder:2,install:{order:1,flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],sr=ir.slice().sort((A,T)=>A.doctorOrder-T.doctorOrder).map((A)=>A.id),An=ir.filter((A)=>("runtime"in A)).slice().sort((A,T)=>A.runtime.order-T.runtime.order).map((A)=>({id:A.id,displayName:"displayName"in A.runtime?A.runtime.displayName:A.displayName,flags:A.runtime.flags,legacyFlags:"legacyFlags"in A.runtime?A.runtime.legacyFlags:[],description:A.runtime.description,legacyTopLevelFlags:A.runtime.legacyTopLevelFlags})),Ot=ir.slice().sort((A,T)=>A.install.order-T.install.order).map((A)=>({id:A.id,...A.install})).map(({order:A,...T})=>T),Vu=Object.fromEntries(ir.map((A)=>[A.id,A.displayName]));function Lt(A){return Vu[A]}var zu=An.map((A)=>({flags:A.flags.join(", "),description:A.description})),Ju=An.flatMap((A)=>A.flags.map((T)=>`cc-safety-net hook ${T}`)),ls={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...zu,{flags:"-h, --help",description:"Show this help"}],examples:Ju};var cs={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...Ot.map((A)=>({flags:A.flag,description:`Install ${Lt(A.id)} ${A.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...Ot.map((A)=>`cc-safety-net install ${A.flag}`)]},ds={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...Ot.map((A)=>({flags:A.flag,description:`Uninstall ${Lt(A.id)} ${A.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...Ot.map((A)=>`cc-safety-net uninstall ${A.flag}`)]},us={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var ps={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var ar={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var po=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],fo=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],yn={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...po.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...fo,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var fs={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var ms={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var lr=[fs,is,ps,ss,yn,ar,cs,us,ds,ls,as,ms];function Wu(A){return A.aliases??[]}function cr(A){let T=A.toLowerCase();return lr.find((I)=>I.name.toLowerCase()===T||Wu(I).some((N)=>N.toLowerCase()===T))}import{basename as Ku}from"node:path";function dr(A,T=7,I=F(A)){let N=Date.now()-T*24*60*60*1000,J=[],K=new Set,ne=0,oe,de,ue,ve;if(I)q(A,I);let xe={count:0},Se=I?en(I,xe):[];for(let we of Se)for(let Ne of hn(we,xe)){if(Ne.decision==="allow")continue;let nt=new Date(Ne.ts).getTime();if(nt>=N){if(ne++,K.add(Ne.sessionId??Ku(we,".jsonl")),de===void 0||nt<=de)oe=Ne.ts,de=nt;if(ve===void 0||nt>ve)ue=Ne.ts,ve=nt;Yu(J,Ne,nt)}}let _e=J.map((we)=>({timestamp:we.ts,command:we.command,reason:we.reason,relativeTime:Xi(new Date(we.ts))}));return{totalBlocked:ne,sessionCount:K.size,recentEntries:_e,oldestEntry:oe,newestEntry:ue,unreadable:xe.count}}function Yu(A,T,I){let N=A.findIndex((J)=>I>new Date(J.ts).getTime());if(N===-1){if(A.length<3)A.push(T);return}if(A.splice(N,0,T),A.length>3)A.pop()}import{dirname as lp}from"node:path";import{dirname as Xu,join as Zu,resolve as Qu}from"node:path";var ep="config.json";function Pt(A,T,I,N){g(tp(A),`${JSON.stringify(T,null,2)}
`,I,N)}function tp(A){return typeof A==="string"?ie(A):A}function go(A){return{errors:ae(rp(A),": "," "),ruleNames:new Set(Ie(A).map((T)=>T.toLowerCase()))}}var np="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",gs="must match pattern (letters, numbers, hyphens, underscores)";function rp(A){if(!hs(A))return[e([],"Config must be an object")];return[...A.version===1?[]:[e(["version"],"must be 1")],...op(A.rules)]}function op(A){if(A===void 0)return[];if(!Array.isArray(A))return[e(["rules"],"must be an array")];return[...A.flatMap((T,I)=>hs(T)?ip(T,["rules",I]):[e(["rules",I],"must be an object")]),...Ae(A)]}function ip(A,T){return[...mo(A.name,[...T,"name"],"required string",u,np),...mo(A.command,[...T,"command"],"required string",w,gs),...A.subcommand===void 0?[]:mo(A.subcommand,[...T,"subcommand"],"must be a string if provided",w,gs),...sp(A.block_args,[...T,"block_args"]),...ap(A.reason,[...T,"reason"]),...A.intent===void 0||Re(A.intent)?[]:[e([...T,"intent"],ke)]]}function mo(A,T,I,N,J){if(typeof A!=="string")return[e(T,I)];return N.test(A)?[]:[e(T,J)]}function sp(A,T){if(!Array.isArray(A))return[e(T,"required array")];if(A.length===0)return[e(T,"must have at least one element")];return A.flatMap((I,N)=>{if(typeof I!=="string")return[e([...T,N],"must be a string")];return I===""?[e([...T,N],"must not be empty")]:[]})}function ap(A,T){if(typeof A!=="string")return[e(T,"required string")];if(A==="")return[e(T,"must not be empty")];return A.length>_?[e(T,`must be at most ${_} characters`)]:[]}function hs(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}function ho(A){let T=ys(A);if(!T.ok)return T.result;return go(T.parsed)}function ys(A){let T=[],I=new Set;try{let N=typeof A==="string"?ie(A):A,J=n(N);if(J===null)return T.push(`File not found: ${N.path}`),{ok:!1,result:{errors:T,ruleNames:I}};if(!J.trim())return T.push("Config file is empty"),{ok:!1,result:{errors:T,ruleNames:I}};return{ok:!0,parsed:JSON.parse(J)}}catch(N){if(N instanceof r)return T.push(N.message),{ok:!1,result:{errors:T,ruleNames:I}};let J=N instanceof Error?N.message:String(N);return T.push(N instanceof SyntaxError?"Invalid JSON":J),{ok:!1,result:{errors:T,ruleNames:I}}}}function vs(A){return Qu(A,".safety-net.json")}function Wt(A){let T=ys(A);if(!T.ok)return T.result;let I=Ye(T.parsed);return{errors:I.errors,ruleNames:I.sources}}function ur(A,T={}){return Zu(Xu(Ee(A,T)),ep)}function bs(A,T,I){let N;try{if(n(T)===null)return{path:A,exists:!1,valid:!1,ruleCount:0};N=Wt(T),N.errors.push(...H(A,I))}catch(J){if(!(J instanceof r))throw J;N={errors:[J.message],ruleNames:new Set}}return{path:A,exists:!0,valid:N.errors.length===0,ruleCount:N.ruleNames.size,...N.errors.length>0?{errors:N.errors}:{}}}function cp(A,T){return{source:T,name:A.name,command:A.command,subcommand:A.subcommand,blockArgs:[...A.block_args],reason:A.reason}}function Ls(A,T){let I=G(A),N=U(T),J=lp(I),K=X(A,{cwd:T,userConfigPath:I,projectConfigPath:N,userConfigDir:J}),ne=Z(A,{cwd:T,userConfigPath:I,projectConfigPath:N,userConfigDir:J}),oe=new Map(K.rulebooks.flatMap((de)=>de.rules.map((ue)=>[ue,de.source])));return{userConfig:bs(I,ne.userConfigTarget,ne.userScope),projectConfig:bs(N,ne.projectConfigTarget,ne.projectScope),effectiveRules:K.rules.map((de)=>cp(de,oe.get(de.name)??"project"))}}var dp=[{flag:o.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:o.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:o.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:o.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:o.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:o.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:o.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:o.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"}];function ws(A){return[...dp.map((T)=>({name:T.flag.name,value:Ce(T.flag,A.env),isSet:rt(T.flag,A.env),legacyName:T.flag.legacyName,legacyValue:T.flag.legacyName?A.env.get(T.flag.legacyName):void 0,legacyIsSet:T.flag.legacyName?A.env.get(T.flag.legacyName)!==void 0:void 0,description:T.description,defaultBehavior:T.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:A.env.get("CC_SAFETY_NET_HOME"),isSet:A.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var ks={error:0,warning:1,info:2},up=["policy","config","audit"];function pp(A){return A.map((T)=>{if(T==="ownership")return"is not owned by the current user";if(T==="permissions")return"has unsafe permissions";if(T==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var fp=[{derive:(A)=>A.hooks.length>0&&A.hooks.every((T)=>!T.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(A)=>A.hooks.filter((T)=>T.inspectionStatus==="failed").map((T)=>{let I=Lt(T.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${I} inspection failed`,detail:`Doctor could not verify the ${I} integration configuration.`,fixHint:`Correct the reported ${I} configuration error, then run \`cc-safety-net doctor\` again.`,integration:T.platform}})},{derive:(A)=>A.userConfig.exists&&!A.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:A.userConfig.path}]:[]},{derive:(A)=>A.projectConfig.exists&&!A.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:A.projectConfig.path}]:[]},{derive:(A)=>A.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${A.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(A)=>A.v2Leftovers&&A.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${A.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(A)=>{let T=A.environment.find((I)=>I.name==="CC_SAFETY_NET_AUDIT_SCOPE");return ze(T?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...up.map((A)=>({derive:(T)=>T.posture.directories.filter((I)=>I.kind===A&&I.status==="unsafe").map((I)=>({checkId:`posture.${A}-directory-unsafe`,severity:"error",title:`${A[0]?.toUpperCase()}${A.slice(1)} directory is unsafe`,detail:`The ${A} directory ${pp(I.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...I.path?{path:I.path}:{}}))})),{derive:(A)=>{let T=[...A.effectiveSafety.weakenedRuleOverrides].sort();return T.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${T.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${T.join(", ")}.`}]:[]}}];function xs(A){return fp.flatMap((T,I)=>T.derive(A).map((N,J)=>({finding:N,catalogOrder:I,occurrence:J}))).sort((T,I)=>ks[T.finding.severity]-ks[I.finding.severity]||T.catalogOrder-I.catalogOrder||T.occurrence-I.occurrence).map((T)=>T.finding)}function Gt(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var mp=(A)=>Gt()?`\x1B[32m${A}\x1B[0m`:A,gp=(A)=>Gt()?`\x1B[33m${A}\x1B[0m`:A,hp=(A)=>Gt()?`\x1B[34m${A}\x1B[0m`:A,yp=(A)=>Gt()?`\x1B[36m${A}\x1B[0m`:A,vp=(A)=>Gt()?`\x1B[31m${A}\x1B[0m`:A,bp=(A)=>Gt()?`\x1B[2m${A}\x1B[0m`:A,Lp=(A)=>Gt()?`\x1B[1m${A}\x1B[0m`:A,ot={green:mp,yellow:gp,blue:hp,cyan:yp,red:vp,dim:bp,bold:Lp},wp="\x1B[0m",kp=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function xp(A){let T=A;return()=>(T=(T*1664525+1013904223)%4294967296,T/4294967296)}function Cp(A){let T=[...kp],I=xp(A);for(let N=T.length-1;N>0;N--){let J=Math.floor(I()*(N+1)),K=T[N];T[N]=T[J],T[J]=K}return T}function Sp(A,T=0){if(!Gt())return"";let I=Cp(T);return`\x1B[38;5;${I[A%I.length]}m`}function Cs(A,T,I=0){if(!Gt())return`"${A}"`;return`${Sp(T,I)}"${A}"${wp}`}function pr(A){return A==="default"?"built-in default":`${A} policy`}var Rp=new RegExp("\x1B\\[[0-9;]*m","g"),yo=(A)=>A.replace(Rp,"").length;function tn(A){let T=(A.headers??A.rows[0]??[]).map((ne,oe)=>{let de=Math.max(...A.rows.map((ue)=>yo(ue[oe]??"")));return Math.max(yo(ne),de)}),I=(ne,oe)=>ne+" ".repeat(Math.max(0,oe-yo(ne))),N=(ne,oe)=>oe[0]+T.map((de)=>ne.repeat(de+2)).join(oe[1])+oe[2],J=(ne)=>`│ ${ne.map((oe,de)=>I(oe,T[de]??0)).join(" │ ")} │`,K=A.headers?[`   ${J(A.headers)}`,`   ${N("─",["├","┼","┤"])}`]:[];return[`   ${N("─",["┌","┬","┐"])}`,...K,...A.rows.map((ne)=>`   ${J(ne)}`),`   ${N("─",["└","┴","┘"])}`].join(`
`)}function Ss(A){let T=[];T.push("Hook Integration"),T.push(Pp(A));let I=[],N=[];for(let J of A){let K=Lt(J.platform);if(J.errors&&J.errors.length>0)for(let ne of J.errors)if(J.configured)I.push({platform:K,message:ne});else N.push({platform:K,message:ne})}for(let J of I)T.push(`   Warning (${J.platform}): ${J.message}`);for(let J of N)T.push(ot.red(`   Error (${J.platform}): ${J.message}`));return T.join(`
`)}function Pp(A){let T=["Platform","Discovery","Configuration","Inspection"],I=A.map((N)=>{let J=Lt(N.platform);if(N.inspectionStatus==="not-inspected"){let de=ot.dim("Not inspected");return[J,de,de,de]}let K=N.detected?ot.green("Detected"):N.inspectionStatus==="failed"?ot.red("Unknown"):ot.dim("Not detected"),ne=N.configured?ot.green("Configured"):N.detected?ot.yellow("Not configured"):N.inspectionStatus==="failed"?ot.red("Unknown"):ot.dim("Not applicable"),oe=N.inspectionStatus==="verified"?ot.green("Verified"):N.inspectionStatus==="failed"?ot.red("Failed"):ot.dim("Not applicable");return[J,K,ne,oe]});return tn({headers:T,rows:I})}function Rs(A){let I=["Guard Engine Verification",`   Synthetic self-test: ${A.failed>0?ot.red(`${A.passed}/${A.total} FAIL`):ot.green(`${A.passed}/${A.total} passed`)}`],N=A.results.filter((J)=>!J.passed);if(N.length>0){I.push(""),I.push(ot.red("   Failures:"));for(let J of N)I.push(ot.red(`   • ${J.description}`)),I.push(ot.red(`     expected ${J.expected}, got ${J.actual}`))}return I.join(`
`)}function Ep(A){if(A.length===0)return"   (no custom rules)";let T=["Source","Name","Command","Block Args"],I=A.map((N)=>[N.source,N.name,N.subcommand?`${N.command} ${N.subcommand}`:N.command,N.blockArgs.join(", ")]);return tn({headers:T,rows:I})}function Ps(A){let T=[];if(T.push("Configuration"),T.push(Dp(A.userConfig,A.projectConfig)),T.push(""),A.effectiveRules.length>0)T.push(`   Effective rules (${A.effectiveRules.length} total):`),T.push(Ep(A.effectiveRules));else T.push("   Effective rules: (none - using built-in rules only)");return T.join(`
`)}function Dp(A,T){let I=["Scope","Status"],N=(K)=>{if(!K.exists)return ot.dim("N/A");if(!K.valid)return ot.red(`Invalid (${K.errors?.[0]??"unknown error"})`);return ot.green("Configured")},J=[["User",N(A)],["Project",N(T)]];return tn({headers:I,rows:J})}function Es(A){let T=[];return T.push("Environment"),T.push(Ap(A)),T.join(`
`)}function Ds(A){let T=A.effectiveSafety.policyScopes,I=["Effective Safety",`   Selected preset: ${A.effectiveSafety.selectedPreset}${T?` (${pr(T.levelScope)})`:""}`,`   Effective: ${A.effectiveSafety.level}`],N=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[J,K]of N){let ne=A.effectiveSafety.capabilities[J],oe=ne.enabled?ot.green("ON"):ot.dim("OFF"),de=ne.sources.length>0?` (${ne.sources.join(", ")})`:"";I.push(`   ${K}: ${oe} via ${ne.source}${de}`)}if(T&&T.weakenings.length>0){I.push("   Project policy deltas:");for(let J of T.weakenings)I.push(`      ${J}`)}I.push(`   Stored rule customizations: ${A.effectiveSafety.ruleCounts.stored}`),I.push(`   Effective rule customizations: ${A.effectiveSafety.ruleCounts.effective}`);for(let[J,K]of Object.entries(A.effectiveSafety.ruleOverrides))I.push(`   ${J}: ${K}`);return I.join(`
`)}function As(A){let T=["Findings"];if(A.length===0)return T.push("   No findings from inspected doctor facts."),T.join(`
`);for(let I of A){let N=`[${I.severity.toUpperCase()}] ${I.checkId}: ${Ct(I.title)}`,J=I.severity==="error"?ot.red:I.severity==="warning"?ot.yellow:ot.blue;if(T.push(`   ${J(N)}`),T.push(`      ${Ct(I.detail)}`),I.path)T.push(`      Path: ${Ct(I.path)}`);if(I.fixHint)T.push(`      Fix: ${Ct(I.fixHint)}`)}return T.join(`
`)}function Ap(A){let T=["Variable","Status","Legacy"],I=A.map((N)=>{let J=N.isSet?ot.green("✓"):ot.dim("✗"),K=N.legacyName&&N.legacyIsSet?`${N.legacyName} ${ot.green("✓")}`:N.legacyName??"";return[N.name,J,K]});return tn({headers:T,rows:I})}function _s(A){let T=[];if(A.totalBlocked===0)T.push("Recent Activity"),T.push("   No blocked commands in the last 7 days"),T.push("   Tip: This is normal for new installations");else T.push(`Recent Activity · last 7 days (${A.totalBlocked} blocked / ${A.sessionCount} sessions)`),T.push(_p(A.recentEntries));if(A.unreadable>0)T.push(`   Warning: ${A.unreadable} audit log ${A.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return T.join(`
`)}function _p(A){let T=["Time","Command"],I=A.map((N)=>{let J=Ct(N.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),K=J.length>40?`${J.slice(0,37)}...`:J;return[N.relativeTime,K]});return tn({headers:T,rows:I})}function Ts(A){let T=[];if(T.push("Update Check"),A.latestVersion===null&&!A.error)return T.push(fr([["Status",ot.dim("Skipped")],["Installed",A.currentVersion]])),T.join(`
`);if(A.error)return T.push(fr([["Status",`${ot.yellow("⚠")} Error`],["Installed",A.currentVersion],["Error",ot.dim(A.error)]])),T.join(`
`);if(A.updateAvailable)return T.push(fr([["Status",`${ot.yellow("⚠")} Update Available`],["Current",A.currentVersion],["Latest",ot.green(A.latestVersion??"")]])),T.push(""),T.push("   Run: bunx cc-safety-net@latest doctor"),T.push("   Or:  npx cc-safety-net@latest doctor"),T.join(`
`);return T.push(fr([["Status",`${ot.green("✓")} Up to date`],["Version",A.currentVersion]])),T.join(`
`)}function fr(A){return tn({rows:A})}function Is(A){let T=[];return T.push("System Info"),T.push(Tp(A)),T.join(`
`)}function Tp(A){let T=["Component","Version"],I=(K)=>{if(K===null)return ot.dim("not found");return K},J=[{label:"cc-safety-net",value:A.version},...sr.map((K)=>({label:Lt(K),value:A.versions[K]??null})),{label:"Node.js",value:A.nodeVersion},{label:"npm",value:A.npmVersion},{label:"Bun",value:A.bunVersion},{label:"Platform",value:A.platform}].map((K)=>[K.label,I(K.value)]);return tn({headers:T,rows:J})}function $s(A){if(A.findings.length===0)return ot.green(`
No findings from inspected doctor facts.`);let T={error:A.findings.filter((K)=>K.severity==="error").length,warning:A.findings.filter((K)=>K.severity==="warning").length,info:A.findings.filter((K)=>K.severity==="info").length},I=["error","warning","info"].filter((K)=>T[K]>0).map((K)=>`${T[K]} ${K}`),N=A.findings.length===1?"finding":"findings",J=`
${A.findings.length} ${N}: ${I.join(", ")}.`;if(T.error>0)return ot.red(J);if(T.warning>0)return ot.yellow(J);return ot.blue(J)}import{lstatSync as Ip}from"node:fs";import{dirname as vo}from"node:path";function bo(A,T){try{let I=Ip(T);if(I.isSymbolicLink())return{kind:A,path:T,status:"unsafe",issues:["symlink"]};if(!I.isDirectory())return{kind:A,path:T,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:A,path:T,status:"unknown",issues:[]};let N=[...I.uid!==process.getuid()?["ownership"]:[],...(I.mode&18)!==0?["permissions"]:[]];return{kind:A,path:T,status:N.length>0?"unsafe":"safe",issues:N}}catch(I){if(typeof I==="object"&&I!==null&&"code"in I&&I.code==="ENOENT")return{kind:A,path:T,status:"not-applicable",issues:[]};return{kind:A,path:T,status:"unknown",issues:[]}}}function Os(A,T){let I=F(A);return{directories:[bo("policy",vo(vo(T))),bo("config",vo(T)),...I?[bo("audit",I)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as $p}from"node:child_process";import{existsSync as Ns}from"node:fs";import{delimiter as Op,extname as Np,join as Fp}from"node:path";import{stripVTControlCharacters as Fs}from"node:util";var Ms="2.4.15",jp=5000,Mp="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function wt(){return Ms}function Lo(A,T){let I=A[T];if(I)return I;let N=Object.keys(A).find((J)=>J.toLowerCase()===T.toLowerCase()&&!!A[J]);return N?A[N]:I}function Hp(A){return(Lo(A,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((T)=>T.length>0)}function Up(A,T){let I=Np(A)?[A]:[...Hp(T).map((N)=>`${A}${N}`),A];if(A.includes("/")||A.includes("\\"))return I.find((N)=>Ns(N))??A;return(Lo(T,"PATH")??"").split(Op).flatMap((N)=>I.map((J)=>Fp(N,J))).find((N)=>Ns(N))??A}function js(A){if(!/[\s"&|<>^]/.test(A))return A;return`"${A.replace(/"/g,'""')}"`}function nn(A,T){let[I,...N]=A,J=T[Mp]==="win32"?"win32":process.platform;if(!I||J!=="win32")return{cmd:I??"",args:N};let K=Up(I,T);if(!/\.(?:bat|cmd)$/i.test(K))return{cmd:K,args:N};return{cmd:Lo(T,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",js(K),...N.map(js)].join(" ")]}}var vn=async(A,T=jp)=>{let I=await Gp(A,{timeoutMs:T});if(I.code!==0)return null;return Fs(I.stdout).trim()||Fs(I.stderr).trim()||null};function Gp(A,T){let[I,...N]=A;if(!I)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((J)=>{try{let K=nn([I,...N],process.env),ne=$p(K.cmd,K.args,{stdio:["ignore","pipe","pipe"]}),oe=!1,de="",ue="";ne.stdout.on("data",(Se)=>{de+=Se.toString()}),ne.stderr.on("data",(Se)=>{ue+=Se.toString()});let ve=(Se)=>{if(oe)return;oe=!0,clearTimeout(xe),J(Se)},xe=setTimeout(()=>{ne.kill(),ve({code:null,stdout:de,stderr:ue})},T.timeoutMs);ne.on("close",(Se)=>{ve({code:Se,stdout:de,stderr:ue})}),ne.on("error",()=>{ve({code:null,stdout:de,stderr:ue})})}catch{J({code:null,stdout:"",stderr:""})}})}function mr(A){if(!A)return null;let T=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(A);if(T)return T[1]??null;let I=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(A);if(I)return I[1]??null;return A.split(`
`)[0]?.trim()||null}async function gr(A,T=vn,I=process.cwd()){let N=Promise.all(Ot.map(async(xe)=>[xe.id,mr(await T([...xe.probeCommand]))])),[J,K,ne,oe,de,ue,ve]=await Promise.all([N,N.then(async(xe)=>{let Se=xe.find(([Ne])=>Ne==="opencode")?.[1];if(!Se?.startsWith("2.")||!A(Se))return null;let _e=["--param",`location[directory]=${I}`],we=["opencode","api","integration.list",..._e];return await T(we,30000),T(["opencode","api","plugin.list",..._e],30000)}),T(["codex","plugin","list"],30000),T(["amp","plugins","list"],30000),T(["node","--version"]),T(["npm","--version"]),T(["bun","--version"])]);return{version:Ms,versions:Object.fromEntries(J),codexPluginListOutput:ne,ampPluginListOutput:oe,openCodePluginListOutput:K,nodeVersion:mr(de),npmVersion:mr(ue),bunVersion:mr(ve),platform:`${process.platform} ${process.arch}`}}function wo(A,T){if(T==="dev")return!1;let I=A.split(".").map(Number),N=T.split(".").map(Number),[J=0,K=0,ne=0]=I,[oe=0,de=0,ue=0]=N;if(J!==oe)return J>oe;if(K!==de)return K>de;return ne>ue}async function Kt(){let A=wt(),T=new AbortController,I=setTimeout(()=>T.abort(),3000);try{let N=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:T.signal});if(!N.ok)return{currentVersion:A,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${N.status}`};let J=await N.json(),K=wo(J.version,A);return{currentVersion:A,latestVersion:J.version,updateAvailable:K}}catch(N){return{currentVersion:A,latestVersion:null,updateAvailable:!1,error:N instanceof Error?N.message:"Network error"}}finally{clearTimeout(I)}}import*as Js from"node:readline";var Bs=(A)=>`\x1B[${A}B`,Bp=(A)=>`\x1B[${A}A`;var Hs=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function qp(A){return new Promise((T)=>setTimeout(T,A))}function Vp(A,T,I){if(!I)return T(A);if(I.aborted)return Promise.resolve();return new Promise((N,J)=>{let K=()=>I.removeEventListener("abort",ne),ne=()=>{K(),N()};I.addEventListener("abort",ne,{once:!0}),T(A).then(()=>{K(),N()},(oe)=>{K(),J(oe)})})}function hr(A){return Math.max(0,Math.min(1,A))}function bn(A){return Math.max(0,Math.min(255,Math.round(A)))}function ko(A){return A<=0.0031308?12.92*A:1.055*A**0.4166666666666667-0.055}function zp(A,T,I){let N=I*Math.PI/180,J=T*Math.cos(N),K=T*Math.sin(N),ne=(A+0.3963377774*J+0.2158037573*K)**3,oe=(A-0.1055613458*J-0.0638541728*K)**3,de=(A-0.0894841775*J-1.291485548*K)**3;return{blue:bn(ko(hr(-0.0041960863*ne-0.7034186147*oe+1.707614701*de))*255),green:bn(ko(hr(-1.2684380046*ne+2.6097574011*oe-0.3413193965*de))*255),red:bn(ko(hr(4.0767416621*ne-3.3077115913*oe+0.2309699292*de))*255)}}function xo(A,T){let I=(T*A*180/Math.PI%360+360)%360;return zp(0.72,0.15,I)}function qs(A,T=0.1){let I=xo(T,A);return`\x1B[38;2;${I.red};${I.green};${I.blue}m`}function Jp(A,T){return{blue:bn(A.blue+(255-A.blue)*T),green:bn(A.green+(255-A.green)*T),red:bn(A.red+(255-A.red)*T)}}function Vs(A,T,I){let N=Math.imul(A+2654435769,2246822507)^Math.imul(T+3266489909,668265263)^Math.imul(I+374761393,2654435761),J=N^N>>>15,K=Math.imul(J,739982445),ne=K^K>>>12,oe=Math.imul(ne,695872825);return((oe^oe>>>15)>>>0)/4294967296}function Wp(A,T,I){let N=Math.floor(Vs(A,T,I)*Hs.length);return Hs[N]??"░"}function Us(A){let T=hr(A);return T*T*T*(T*(T*6-15)+10)}function Kp(A){if(A.length===0)return"";let T=[],I=!1,N="";for(let J of A){let K=`${J.red};${J.green};${J.blue}`;if(J.bold!==I)T.push(J.bold?"\x1B[1m":"\x1B[22m"),I=J.bold;if(K!==N)T.push(`\x1B[38;2;${K}m`),N=K;T.push(J.character)}return`${T.join("")}\x1B[22m\x1B[39m`}function Yp(A,T,I,N,J){return A.map((K,ne)=>({...xo(I,N+T+ne/J),bold:!1,character:K}))}function Xp(A,T,I,N,J,K,ne,oe){let de=Math.max(1,N*0.75),ue=Math.min(1,I/de),ve=J*Us(ue),xe=Math.max(0,(I-de)/Math.max(1,N-de)),Se=(1-Us(I/N))*oe*2,_e=0.35*Math.max(0,1-xe*2),we=ue>=1,Ne=Math.min(A.length,Math.ceil(ve+2+1));return A.slice(0,Ne).map((nt,Ve)=>{let ft=xo(K,ne+T+Ve/oe+Se),mt=Ve+Vs(T,Ve,7919)*2-1;if(mt>ve+2)return{...ft,bold:!1,character:" "};let gt=ve-mt,pt=0.8*Math.exp(-(gt*gt)/12.5),bt=Math.min(0.9,pt+_e),At=!we&&mt>ve-4;return{...Jp(ft,bt),bold:bt>0.3,character:At?Wp(T,Ve,I):nt}})}function Gs(A){return`\x1B[?2026h${A.map((T,I)=>`\x1B8${I>0?Bs(I):""}${Kp(T)}`).join("")}\x1B[?2026l`}async function Co(A,T={}){if(!A)return;let I=T.output??process.stdout,N=T.sleep??qp,J=T.seed??0,K=A.split(`
`).map((ve)=>Array.from(ve)),ne=Math.max(...K.map((ve)=>ve.length)),oe=12000*K.filter((ve)=>ve.length>0).length/40,de=ne>0?Math.max(1,Math.ceil(oe/16.666666666666668)):0,ue=de>0?oe/de:0;I.write(`\x1B[?25l${K.length>1?`${`
`.repeat(K.length-1)}${Bp(K.length-1)}`:""}\x1B7`);try{for(let ve=1;ve<=de;ve+=1){if(T.signal?.aborted)break;I.write(Gs(K.map((xe,Se)=>Xp(xe,Se,ve,de,ne,0.1,J,3)))),await Vp(ue,N,T.signal)}}finally{if(I.write(Gs(K.map((ve,xe)=>Yp(ve,xe,0.1,J,3)))),I.write("\x1B8"),K.length>1)I.write(Bs(K.length-1));I.write(`
\x1B[0m\x1B[?25h`)}}var zs=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function Zp(A){return Boolean(A.isTTY)}async function _n(A={}){let T=A.output??process.stdout;if(!Zp(T))return;let I=A.input??process.stdin,N={output:T,seed:A.seed??Math.random()*8192,sleep:A.sleep};if(!I.isTTY||typeof I.setRawMode!=="function"){await Co(zs,N);return}let J=new AbortController,K=I.readableFlowing===!0,ne=I.isRaw===!0,oe=!1,de=(ue,ve)=>{if(ve.ctrl&&ve.name==="c")oe=!0;if(oe||ve.name==="return"||ve.name==="enter")J.abort()};Js.emitKeypressEvents(I),I.on("keypress",de),I.setRawMode(!0),I.resume();try{await Co(zs,{...N,signal:J.signal})}finally{if(I.off("keypress",de),I.setRawMode(ne),!K)I.pause()}if(!oe)return;if(A.onInterrupt){A.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as r2}from"node:crypto";import{existsSync as Ys}from"node:fs";import{dirname as yr,join as Xs}from"node:path";import{dirname as Ws,join as Qp,resolve as e2}from"node:path";var t2="rule.lock";function n2(A){return Qp(Ws(A),t2)}function Ks(A={}){return e2(A.cwd??process.cwd(),".safety-net.json")}function Et(A,T){let I=T.global?T.userConfigPath??G(A,T):T.projectConfigPath??U(T.cwd??process.cwd()),N=T.global?Ke(A,T):Je(I,T.cwd??process.cwd()),J=n2(I);return{configDir:Ws(I),configPath:I,lockPath:J,filesystemScope:N,configTarget:i(N,I),lockTarget:i(N,J)}}var o2="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",i2="cache",s2="rulebooks";function Zs(A,T={}){let I=Et(A,T),N=i(I.filesystemScope,ea(I.configDir)),J=n(I.lockTarget);if(console.log(o2),J===null&&!Ys(N.path))return console.log(`No v2 lock or cache leftovers found in ${yr(I.configDir)}; nothing to migrate.`),0;let K=u2(J),ne=m(I.configTarget);if(!ne.config&&(n(I.configTarget)!==null||K.size>0))return console.error(`Cannot migrate: the rules config in ${yr(I.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let oe=ne.config?.rules??[];for(let de of oe.flatMap((ue)=>a2(ue,K,I,N,T.global===!0)))console.log(de);return j(I.lockTarget),it(N),console.log(`Removed the v2 lock and cache under ${yr(I.configDir)}.`),0}function Qs(A,T){return[...new Set([{cwd:T},{cwd:T,global:!0}].flatMap((I)=>{let N=Et(A,I);return[N.lockPath,ea(N.configDir)]}))].filter((I)=>Ys(I))}function a2(A,T,I,N,J){if(!S(A))return[];let K=O(A).name,ne=i(I.filesystemScope,D(I.configDir,K)),oe=n(ne);if(oe!==null&&l2(oe,K))return[];let de=T.get(A),ue=de?c2(de,K,N.path,I.filesystemScope):null;if(ue===null)return[`Could not migrate ${A} from the v2 cache. Run \`cc-safety-net rule update ${A}${J?" --global":""}\` to vendor it.`];if(g(ne,ue),oe!==null)return[`Restored ${A} from the v2 cache over an invalid file.`];return[`Vendored ${A} from the v2 cache.`]}function l2(A,T){let I=ye(A);return!("problem"in I)&&I.rulebook.name===T}function c2(A,T,I,N){let J=Xs(I,s2,`${d2(A)}--${A.digest.replace("sha256:","").slice(0,12)}`,fe),K=n(i(N,J));if(K===null||m2(K)!==A.digest)return null;let ne=ye(K);if("problem"in ne||ne.rulebook.name!==T)return null;return K}function ea(A){return Xs(yr(A),i2)}function d2(A){return([A.owner,A.repo,A.display_ref,A.name].every((N)=>typeof N==="string"&&N!=="")?`${A.owner}/${A.repo}#${A.display_ref}/${A.name}`:A.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function u2(A){let T=A===null?null:f2(A),I=ta(T)&&Array.isArray(T.rulebooks)?T.rulebooks:[];return new Map(I.filter(p2).map((N)=>[N.spec,N]))}function p2(A){return ta(A)&&typeof A.spec==="string"&&typeof A.digest==="string"}function ta(A){return!!A&&typeof A==="object"}function f2(A){try{return JSON.parse(A)}catch{return null}}function m2(A){return`sha256:${r2("sha256").update(A).digest("hex")}`}var na="\r\x1B[2K",g2="\x1B[?25l",h2="\x1B[39m",y2="\x1B[?25h",v2=100,b2=0.55,L2=80,ra=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function w2(A){return new Promise((T)=>setTimeout(T,A))}async function vr(A,T={}){let I=T.output??process.stdout;if(!I.isTTY)return A;let N=T.sleep??w2,J=!1,K=A.then((oe)=>(J=!0,oe),(oe)=>{throw J=!0,oe});if(await Promise.race([K.then(()=>!0),N(v2).then(()=>!1)]))return K;I.write(g2);try{for(let oe=0;!J;oe+=1)I.write(`${na}${qs(oe*b2)}${ra[oe%ra.length]}${h2} ${T.loadingMessage??"Loading…"}`),await Promise.race([K,N(L2)]);return await K}finally{I.write(`${na}${y2}`)}}async function Tn(A,T,I,N={}){let J=T();if(A)await I();if(A&&J.ready)await vr(J.ready,N);return J.finish()}import{stripVTControlCharacters as k2}from"node:util";var br="amp plugins list",x2=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function oa(A){if(!A.ampPluginListOutput)return{platform:"amp",status:"n/a"};let T=k2(A.ampPluginListOutput).split(`
`).map((I)=>x2.exec(I)?.[1]).find((I)=>I!==void 0);if(!T)return{platform:"amp",status:"n/a"};if(T!=="active")return{platform:"amp",status:"disabled",method:br,configPath:br,errors:[`Amp personal plugin cc-safety-net is ${T}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:br,configPath:br}}import{existsSync as E2,readFileSync as D2}from"node:fs";import{isAbsolute as Wv,join as P2}from"node:path";function In(A){return P2(A,".gemini","config","hooks.json")}var A2=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function _2(A){if(!A||typeof A!=="object"||Array.isArray(A))return[];return Object.values(A).flatMap((T)=>{if(!T||typeof T!=="object"||Array.isArray(T))return[];let I=T,N=I.PreToolUse;if(!Array.isArray(N))return[];return N.flatMap((J)=>{if(!J||typeof J!=="object"||Array.isArray(J))return[];let K=J.hooks;if(!Array.isArray(K))return[];return K.flatMap((ne)=>{if(!ne||typeof ne!=="object"||Array.isArray(ne))return[];let oe=ne.command;if(typeof oe!=="string"||!A2.test(oe))return[];return[{command:oe,enabled:I.enabled!==!1}]})})})}function ia(A){let T=In(A.environment.home);if(!E2(T))return{platform:"antigravity-cli",status:"n/a",configPath:T};let I;try{I=_2(JSON.parse(D2(T,"utf-8")))}catch(N){return{platform:"antigravity-cli",status:"n/a",configPath:T,errors:[`Failed to parse Antigravity hooks config ${T}: ${N instanceof Error?N.message:String(N)}`]}}if(I.some((N)=>N.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:T};if(I.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:T};return{platform:"antigravity-cli",status:"n/a",configPath:T}}import{join as Ro}from"node:path";import{existsSync as T2,lstatSync as I2,readFileSync as $2}from"node:fs";import{join as O2}from"node:path";function It(A,T=(I)=>I){if(!T2(A))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(T($2(A,"utf-8")))}}catch{return{kind:"unreadable"}}}function Bt(A,T){if(A==="~")return T;if(A.startsWith("~/")||A.startsWith("~\\"))return O2(T,A.slice(2));return A}function yt(A){try{return I2(A)}catch{return}}function Lr(A,T){let I=yt(T);if(!I)return{platform:A,status:"n/a",configPath:T};if(!I.isSymbolicLink()&&I.isDirectory())return;return{platform:A,status:"n/a",configPath:T,errors:[`${T} is a symlink or not a directory; move or remove it before installing`]}}function dt(A,T){return typeof A==="object"&&A!==null?A[T]:void 0}var So="cc-safety-net@cc-marketplace";function wr(A){return A.env.get("CLAUDE_CONFIG_DIR")||Ro(A.home,".claude")}function sa(A){return Ro(wr(A),"plugins","installed_plugins.json")}function aa(A,T){let I=dt(dt(A,"plugins"),T);return Array.isArray(I)&&I.length>0}function kr(A,T){let I=It(sa(A));return I.kind==="ok"&&aa(I.value,T)}function Po(A){let T=sa(A),I=It(T);if(I.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(I.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!aa(I.value,So))return{platform:"claude-code",status:"n/a"};let N=Ro(wr(A),"settings.json"),J=It(N);if(J.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(J.kind==="ok"&&dt(dt(J.value,"enabledPlugins"),So)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:N,errors:[`${So} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:T}}function la(A){return Po(A.environment)}var ca="Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it.";function da(A){if(!A.codexPluginListOutput)return{platform:"codex",status:"n/a"};let T=A.codexPluginListOutput.split(`
`).find((I)=>I.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!T)return{platform:"codex",status:"n/a"};if(!T.includes("installed,"))return{platform:"codex",status:"n/a"};if(!T.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex runs only trusted hooks, and doctor cannot check trust. Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."]}}import{existsSync as Pr,readdirSync as N2,readFileSync as F2}from"node:fs";import{join as Rt}from"node:path";function _t(A){let T="",I=0,N=!1,J=!1,K=-1;while(I<A.length){let ne=A[I],oe=A[I+1];if(J){T+=ne,J=!1,I++;continue}if(ne==='"'&&!N){N=!0,K=-1,T+=ne,I++;continue}if(ne==='"'&&N){N=!1,T+=ne,I++;continue}if(ne==="\\"&&N){J=!0,T+=ne,I++;continue}if(N){T+=ne,I++;continue}if(ne==="/"&&oe==="/"){while(I<A.length&&A[I]!==`
`)I++;continue}if(ne==="/"&&oe==="*"){I+=2;while(I<A.length-1){if(A[I]==="*"&&A[I+1]==="/"){I+=2;break}I++}continue}if(ne===","){K=T.length,T+=ne,I++;continue}if(ne==="}"||ne==="]"){if(K!==-1){let de=T.slice(K+1);if(/^\s*$/.test(de))T=T.slice(0,K)+de}K=-1,T+=ne,I++;continue}if(!/\s/.test(ne))K=-1;T+=ne,I++}return T}function pa(A,T,I){let N=T+1,J=!1;while(N<A.length){if(J){J=!1,N++;continue}if(A[N]==="\\"){J=!0,N++;continue}if(A[N]==='"')return N+1;N++}throw Error(I)}function Do(A,T,I){let N=A[T],J=N==="["?"]":"}",K=0,ne=T;while(ne<A.length){let oe=I.skipComment?.(A,ne)??ne;if(oe!==ne){ne=oe;continue}if(A[ne]==='"'){ne=pa(A,ne,I.stringError);continue}if(A[ne]===N)K++;if(A[ne]===J){if(K--,K===0)return ne}ne++}throw Error(I.bracketError)}function fa(A,T){let I=A.lastIndexOf(`
`,T)+1;return/^[ \t]*/.exec(A.slice(I))?.[0]??""}function xr(A,T){let I=T.end+(/^\s*/.exec(A.slice(T.end))?.[0].length??0);if(A[I]===","){let ne=A[I+1]===`
`?I+2:I+1;return`${A.slice(0,T.start)}${A.slice(ne)}`}let N=A.slice(0,T.start).search(/\s*$/)-1;if(A[N]!==",")return`${A.slice(0,T.start)}${A.slice(T.end)}`;let J=A.lastIndexOf(`
`,N-1),K=J!==-1&&/^\s*$/.test(A.slice(J+1,N))?J:N;return`${A.slice(0,K)}${A.slice(T.end)}`}function Eo(A,T){if(A.startsWith("//",T)){let I=A.indexOf(`
`,T+2);return I===-1?A.length:I+1}if(A.startsWith("/*",T)){let I=A.indexOf("*/",T+2);return I===-1?A.length:I+2}return T}function ua(A,T){let I=T;while(I<A.length){if(/\s/.test(A[I]??"")){I++;continue}let N=Eo(A,I);if(N===I)return I;I=N}return I}function ma(A,T,I){let N=0,J=0;while(J<A.length){let K=Eo(A,J);if(K!==J){J=K;continue}if(A[J]==='"'){let ne=pa(A,J,I.stringError);if(N===1&&JSON.parse(A.slice(J,ne))===T){let oe=ua(A,ne),de=ua(A,oe+1);if(A[oe]===":"&&A[de]==="[")return{start:de,end:Do(A,de,{skipComment:Eo,...I})}}J=ne;continue}if(A[J]==="{"||A[J]==="[")N++;if(A[J]==="}"||A[J]==="]")N--;J++}return}var Ft="cc-safety-net@cc-marketplace",Cr=["cc-marketplace","cc-safety-net"],ga=["_direct","copilot-safety-net"],ha=["cc-marketplace","safety-net"],ya="safety-net@cc-marketplace";function Sr(A,T){let I=T.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${I}([^a-z0-9-]|$)`,"m").test(A??"")}function va(A){return Sr(A,"cc-safety-net@cc-marketplace")}function ba(A){return Sr(A,"cc-marketplace")}function La(A){return Sr(A,"copilot-safety-net")}function wa(A){return Sr(A,"safety-net@cc-marketplace")}function Rr(A){if(!A?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(A)}function xa(A,T){if(!A)return null;let I=A.match(/(\d+)\.(\d+)\.(\d+)/);if(!I)return null;let N=[Number(I[1]),Number(I[2]),Number(I[3])];for(let J=0;J<T.length;J++){let K=N[J]??0,ne=T[J]??0;if(K!==ne)return K>ne}return!0}function j2(A){return xa(A,[0,0,422])}function M2(A){return xa(A,[1,0,8])}function On(A){return A.env.get("COPILOT_HOME")||Rt(A.home,".copilot")}function Ao(A){return(A.hooks?.preToolUse??[]).some((I)=>{if(I.type!==void 0&&I.type!=="command")return!1;return Rr(I.command)||Rr(I.bash)||Rr(I.powershell)||Rr(I.exec&&[I.exec,...I.args??[]].join(" "))})}function $n(A){return A===void 0||typeof A==="string"}function H2(A){return A===void 0||Array.isArray(A)&&A.every((T)=>typeof T==="string")}function U2(A){if(!A||typeof A!=="object"||Array.isArray(A))return!1;let T=A;if(T.disableAllHooks!==void 0&&typeof T.disableAllHooks!=="boolean")return!1;if(T.hooks===void 0)return!0;if(!T.hooks||typeof T.hooks!=="object"||Array.isArray(T.hooks))return!1;let I=T.hooks.preToolUse;if(I===void 0)return!0;return Array.isArray(I)&&I.every((N)=>N!==null&&typeof N==="object"&&!Array.isArray(N)&&$n(N.type)&&$n(N.command)&&$n(N.bash)&&$n(N.powershell)&&$n(N.exec)&&H2(N.args))}function _o(A,T){try{let I=JSON.parse(_t(F2(A,"utf-8")));if(!U2(I)){T?.push(`Invalid hook config ${A}: hooks.preToolUse must be an array of hook objects`);return}return I}catch(I){T?.push(`Failed to parse ${A}: ${I instanceof Error?I.message:String(I)}`);return}}function Ca(A,T){try{return N2(A).filter((I)=>I.endsWith(".json")).sort((I,N)=>I.localeCompare(N))}catch(I){return T?.push(`Failed to read ${A}: ${I instanceof Error?I.message:String(I)}`),[]}}function G2(A,T){if(!Pr(A))return[];let I=[];for(let N of Ca(A,T)){let J=Rt(A,N),K=_o(J,T);if(K&&Ao(K))I.push(J)}return I}function Ln(A,T){if(!Pr(A))return;let I=_o(A,T);if(!I)return;return{path:A,config:I}}function ka(A,T,I,N){if(T){A.push(`GitHub Copilot CLI ${T} does not support ${I}; requires ${N}+`);return}A.push(`GitHub Copilot CLI version unavailable; skipping ${I} because it requires ${N}+`)}function B2(A){for(let T of A){if(T?.config.disableAllHooks===!0)return T.path;if(T?.config.disableAllHooks===!1)return}return}function q2(A,T,I,N){let J=On(A),K=Rt(T,".github","hooks"),ne=Rt(J,"hooks"),oe=Rt(T,".github","copilot"),de=Rt(T,".claude"),ue=M2(I),ve=ue===!0?N:void 0,xe=[Ln(Rt(oe,"settings.local.json"),ve),Ln(Rt(oe,"settings.json"),ve),Ln(Rt(de,"settings.local.json"),ve),Ln(Rt(de,"settings.json"),ve)],Se=[Ln(Rt(J,"settings.json"),ve),Ln(Rt(J,"config.json"),ve)];if(ue!==!1){let gt=B2([...xe,...Se]);if(gt){if(ue===null)N.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${gt} as active`);return{activeConfigPaths:[],repoInlineSources:xe,disabledBy:gt}}}let _e=G2(K,N),we=j2(I),Ne=we===!0?N:void 0,nt=Pr(ne)?Ca(ne,Ne):[],Ve=[];for(let gt of nt){let pt=Rt(ne,gt),bt=_o(pt,Ne);if(bt&&Ao(bt))Ve.push(pt)}if(we!==!0&&Ve.length>0)ka(N,I,`user hook files in ${ne}`,"0.0.422"),Ve.length=0;let ft=[];for(let gt of[...xe,...Se]){if(!gt)continue;if(!Ao(gt.config))continue;if(ue===!0){ft.push(gt);continue}ka(N,I,"inline hook definitions in Copilot config files","1.0.8");break}let mt=(gt)=>gt.filter((pt)=>!!pt&&ft.includes(pt)).map((pt)=>pt.path);return{activeConfigPaths:[...mt(xe),..._e,...mt(Se),...Ve],repoInlineSources:xe}}function Sa(A){let T=[],I=q2(A.environment,A.cwd,A.copilotCliVersion,T);if(I.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:I.disabledBy,configPaths:[I.disabledBy],errors:T.length>0?T:void 0};let N=On(A.environment),J=Rt(N,"installed-plugins",...Cr),K=Pr(J),ne=Rt(N,"settings.json"),oe=It(ne,_t),de=(_e)=>dt(dt(_e,"enabledPlugins"),Ft),ue=I.repoInlineSources.find((_e)=>typeof de(_e?.config)==="boolean"),ve=ue??(oe.kind==="ok"?{path:ne,config:oe.value}:void 0);if(K&&!ue&&oe.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};let xe=K&&ve!==void 0&&de(ve.config)===!1;if(xe&&I.activeConfigPaths.length===0)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:ve.path,errors:[`${Ft} is installed but not enabled in Copilot CLI`]};let Se=K&&!xe;if(Se||I.activeConfigPaths.length>0){let _e=I.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:Se?"plugin config":"hook config",configPath:_e??(Se?J:void 0),configPaths:I.activeConfigPaths.length>0?I.activeConfigPaths:void 0,errors:T.length>0?T:void 0}}return{platform:"copilot-cli",status:"n/a",errors:T.length>0?T:void 0}}import{existsSync as ef,readFileSync as tf}from"node:fs";import{existsSync as Ra,mkdirSync as J2,readFileSync as W2}from"node:fs";import{dirname as K2,join as Y2}from"node:path";import{renameSync as V2,writeFileSync as z2}from"node:fs";function kt(A,T){let I=`${A}.${process.pid}.tmp`;z2(I,T),V2(I,A)}var jt=Object.fromEntries(An.map((A)=>[A.id,`npx -y cc-safety-net hook ${A.flags[1]}`]));var Nn=jt.cursor,Pa=30;function Dr(A){return Y2(A.home,".cursor","hooks.json")}function rn(A){return typeof A==="object"&&A!==null&&!Array.isArray(A)}function To(){return{command:Nn,timeout:Pa,failClosed:!0}}function Er(A){return rn(A)&&A.command===Nn}function X2(A){return Object.keys(A).length===3&&A.command===Nn&&A.timeout===Pa&&A.failClosed===!0}function Z2(A){try{return JSON.parse(W2(A,"utf-8"))}catch(T){if(T instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${A}: ${T.message}`);throw T}}function Ea(A){let T=Z2(A);if(!rn(T))throw Error(`Cursor hooks config ${A} must be a JSON object`);if(T.version!==1)throw Error(`Cursor hooks config ${A} must set "version": 1`);if(T.hooks!==void 0&&!rn(T.hooks))throw Error(`Cursor hooks config ${A} "hooks" must be an object`);let I=rn(T.hooks)?T.hooks.preToolUse:void 0;if(I!==void 0&&!Array.isArray(I))throw Error(`Cursor hooks config ${A} "hooks.preToolUse" must be an array`);return T}function Da(A){let T=rn(A.hooks)?A.hooks.preToolUse:void 0;return Array.isArray(T)?T:[]}function Q2(A){if(!A.some(Er))return[...A,To()];return A.reduce((T,I)=>{if(!Er(I))return T.result.push(I),T;if(!T.inserted)T.result.push(To()),T.inserted=!0;return T},{result:[],inserted:!1}).result}function Aa(A,T,I){let N=rn(T.hooks)?T.hooks:{},J={...T,hooks:{...N,preToolUse:I}};kt(A,`${JSON.stringify(J,null,2)}
`)}function _a(A){let T=Dr(A);if(!Ra(T))return J2(K2(T),{recursive:!0}),kt(T,`${JSON.stringify({version:1,hooks:{preToolUse:[To()]}},null,2)}
`),{path:T,alreadyInstalled:!1};let I=Ea(T),N=Da(I),J=N.filter(Er);if(rn(I.hooks)&&Array.isArray(I.hooks.preToolUse)&&J.length===1&&J[0]!==void 0&&X2(J[0]))return{path:T,alreadyInstalled:!0};return Aa(T,I,Q2(N)),{path:T,alreadyInstalled:!1}}function Ta(A){let T=Dr(A);if(!Ra(T))return{path:T,alreadyInstalled:!1};let I=Ea(T),N=Da(I),J=N.filter((K)=>!Er(K));if(J.length===N.length)return{path:T,alreadyInstalled:!1};return Aa(T,I,J),{path:T,alreadyInstalled:!0}}function nf(A){if(!A||typeof A!=="object"||Array.isArray(A))return[];let T=A.hooks;if(!T||typeof T!=="object"||Array.isArray(T))return[];let I=T.preToolUse;if(!Array.isArray(I))return[];return I.filter((N)=>!!N&&typeof N==="object"&&!Array.isArray(N)&&N.command===Nn)}function rf(A){let T=[];if(A.length>1)T.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let I=A[0];if(I&&I.failClosed!==!0)T.push('Managed hook is missing "failClosed": true; reinstall to repair');if(I&&I.timeout!==30)T.push('Managed hook "timeout" is not 30; reinstall to repair');return T}function Ia(A){let T=Dr(A.environment);if(!ef(T))return{platform:"cursor",status:"n/a",configPath:T};let I;try{I=JSON.parse(tf(T,"utf-8"))}catch(K){return{platform:"cursor",status:"n/a",configPath:T,errors:[`Failed to parse Cursor hooks config ${T}: ${K instanceof Error?K.message:String(K)}`]}}let N=nf(I);if(N.length===0)return{platform:"cursor",status:"n/a",configPath:T};let J=rf(N);return{platform:"cursor",status:"configured",method:"hook config",configPath:T,errors:J.length>0?J:void 0}}import{readdirSync as of}from"node:fs";import{join as Io,resolve as sf}from"node:path";var $o="cc-safety-net";function Oo(A){let T=A.env.get("DSH_HOME");return Io(T?.trim()?sf(Bt(T,A.home)):Io(A.home,".dsh"),"profiles")}function $a(A){let T=Oo(A),I=yt(T)?.isDirectory()?of(T,{withFileTypes:!0}).filter((J)=>J.isDirectory()&&J.name!=="node_modules").map((J)=>{let K=Io(T,J.name,"package.json");return{name:J.name,configPath:K,manifest:It(K)}}):[];return{installed:I.flatMap((J)=>{if(J.manifest.kind!=="ok")return[];let K=J.manifest.value;if(dt(dt(K,"dependencies"),$o)===void 0)return[];let ne=dt(dt(dt(K,"dsh"),"profile"),"bundles");return[{name:J.name,configPath:J.configPath,enabled:Array.isArray(ne)&&ne.includes($o)}]}),unreadable:I.some((J)=>J.manifest.kind==="unreadable")}}function No(A){return $a(A).installed}function Oa(A){let T=$a(A.environment),I=T.installed.filter((K)=>K.enabled),N=T.installed.filter((K)=>!K.enabled),J=N.map((K)=>`${$o} is installed in the ${K.name} profile but its bundle is disabled`);if(I.length>0)return{platform:"deepseek-harness",status:"configured",method:"dsh bundle",configPaths:I.map((K)=>K.configPath),...J.length>0?{errors:J}:{}};if(N.length>0)return{platform:"deepseek-harness",status:"disabled",method:"dsh bundle",configPaths:N.map((K)=>K.configPath),errors:J};return T.unreadable?{platform:"deepseek-harness",status:"not-inspected"}:{platform:"deepseek-harness",status:"n/a"}}import{existsSync as af}from"node:fs";import{join as Fo}from"node:path";var jo="gemini-safety-net";function Mo(A){let T=Fo(A.home,".gemini","extensions"),I=Fo(T,jo);if(!af(I))return{platform:"gemini-cli",status:"n/a"};let N=Fo(T,"extension-enablement.json"),J=It(N);if(J.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let K=J.kind==="ok"?dt(dt(J.value,jo),"overrides"):void 0;if(Array.isArray(K)&&K.some((oe)=>typeof oe==="string"&&oe.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:N,errors:[`${jo} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:I}}function Na(A){return Mo(A.environment)}import{existsSync as uf,readFileSync as pf}from"node:fs";import{existsSync as ja,mkdirSync as lf,readFileSync as Ma,rmSync as cf}from"node:fs";import{dirname as df,join as Fa}from"node:path";var Fn=jt["grok-build"],Tr=30;function Ir(A){return Fa(A.env.get("GROK_HOME")??Fa(A.home,".grok"),"hooks","cc-safety-net.json")}function on(A){return typeof A==="object"&&A!==null&&!Array.isArray(A)}function Ar(){return{hooks:[{type:"command",command:Fn,timeout:Tr}]}}function Ha(A){return on(A)&&A.command===Fn}function Ua(A){return A.flatMap((T)=>{if(!on(T)||!Array.isArray(T.hooks))return[T];let I=T.hooks.filter((N)=>!Ha(N));if(I.length===T.hooks.length)return[T];return I.length===0?[]:[{...T,hooks:I}]})}function Ga(A){try{let T=JSON.parse(A);return on(T)?T:null}catch{return null}}function Ba(A){let T=on(A.hooks)?A.hooks.PreToolUse:void 0;return Array.isArray(T)?T:[]}function _r(A,T,I){let N=on(T.hooks)?T.hooks:{};kt(A,`${JSON.stringify({...T,hooks:{...N,PreToolUse:I}},null,2)}
`)}function qa(A){let T=Ir(A);if(!ja(T))return lf(df(T),{recursive:!0}),_r(T,{},[Ar()]),{path:T,alreadyInstalled:!1};let I=Ga(Ma(T,"utf-8"));if(!I)return _r(T,{},[Ar()]),{path:T,alreadyInstalled:!1};let N=Ba(I),J=N.filter((K)=>on(K)&&Array.isArray(K.hooks)&&K.hooks.some(Ha));if(J.length===1&&JSON.stringify(J[0])===JSON.stringify(Ar()))return{path:T,alreadyInstalled:!0};return _r(T,I,[...Ua(N),Ar()]),{path:T,alreadyInstalled:!1}}function Va(A){let T=Ir(A);if(!ja(T))return{path:T,alreadyInstalled:!1};let I=Ga(Ma(T,"utf-8"));if(!I)return{path:T,alreadyInstalled:!1};let N=Ba(I),J=Ua(N);if(JSON.stringify(J)===JSON.stringify(N))return{path:T,alreadyInstalled:!1};let K=on(I.hooks)?I.hooks:{};if(J.length===0&&Object.keys(I).length===1&&Object.keys(K).length===1)return cf(T),{path:T,alreadyInstalled:!0};return _r(T,I,J),{path:T,alreadyInstalled:!0}}function jn(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}function ff(A){if(!jn(A)||!jn(A.hooks))return[];let T=A.hooks.PreToolUse;if(!Array.isArray(T))return[];return T.filter((I)=>jn(I)&&Array.isArray(I.hooks)&&I.hooks.some((N)=>jn(N)&&N.command===Fn))}function mf(A){let I=(Array.isArray(A.hooks)?A.hooks.filter(jn):[]).find((N)=>N.command===Fn);return[...A.matcher===void 0||A.matcher===""||A.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...I?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...I?.timeout===Tr?[]:[`Managed hook "timeout" is not ${Tr}; reinstall to repair`]]}function za(A){let T=Ir(A.environment);if(!uf(T))return{platform:"grok-build",status:"n/a",configPath:T};let I;try{I=JSON.parse(pf(T,"utf-8"))}catch(K){return{platform:"grok-build",status:"n/a",configPath:T,errors:[`Failed to parse Grok Build hooks config ${T}: ${K instanceof Error?K.message:String(K)}`]}}let N=ff(I)[0];if(!N)return{platform:"grok-build",status:"n/a",configPath:T};let J=mf(N);return{platform:"grok-build",status:"configured",method:"hook config",configPath:T,errors:J.length>0?J:void 0}}import{readFileSync as tl}from"node:fs";import{join as nl}from"node:path";var $t="cc-safety-net",Ho="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",gf=30;function Ja(A){return`${Ho}
# version: ${A}
`}function hf(A){return`${Ja(A)}name: ${$t}
version: "${A}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function yf(A){return`${Ja(A)}"""CC Safety Net guard for Hermes Agent.

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
ANALYZER = [${jt["hermes-agent"].split(" ").map((T)=>`"${T}"`).join(", ")}]
TIMEOUT_SECONDS = ${gf}


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
`}function Mn(A){return[{name:"__init__.py",content:yf(A)},{name:"plugin.yaml",content:hf(A)}]}import{mkdirSync as vf,readdirSync as bf,readFileSync as Wa,rmSync as Uo}from"node:fs";import{basename as Lf,dirname as wf,join as qt}from"node:path";var kf="__pycache__",xf=/^[a-z0-9][a-z0-9_-]{0,63}$/;function Cf(A){try{return Wa(A,"utf-8").trim()}catch{return}}function Go(A){let T=A.env.get("HERMES_HOME")?.trim();if(T&&Lf(wf(T))==="profiles")return T;let I=T||qt(A.home,".hermes"),N=qt(I,"active_profile"),J=Cf(N),K=J?.toLowerCase();if(!K||K==="default")return I;if(!xf.test(K))throw Error(`Invalid Hermes profile name "${J}" in ${N}; run \`hermes profile use <name>\` with a valid profile.`);return qt(I,"profiles",K)}function Bo(A){return qt(Go(A),"plugins",$t)}function qo(A){return A.startsWith(Ho)}function Vo(A,T){let I=Bo(A),N=yt(I);if(N&&(N.isSymbolicLink()||!N.isDirectory()))throw Error(`Refusing to ${T} ${I}: not a regular directory. Move or remove it and rerun ${T==="install"?"install":"uninstall"} --hermes-agent.`);return I}function Ka(A,T){let I=yt(A);if(!I)return;if(I.isSymbolicLink()||!I.isFile())throw Error(`Refusing to ${T} ${A}: not a regular file. Move or remove it.`);let N=Wa(A,"utf-8");if(!qo(N))throw Error(`Refusing to ${T} unmanaged file at ${A}. Move or remove it.`);return N}function Ya(A){let T=Vo(A,"install"),I=Mn(wt());if(I.map((J)=>Ka(qt(T,J.name),"overwrite")).every((J,K)=>J===I[K]?.content))return{path:T,alreadyInstalled:!0};return vf(T,{recursive:!0}),I.forEach((J)=>{kt(qt(T,J.name),J.content)}),{path:T,alreadyInstalled:!1}}function zo(A){let T=Vo(A,"remove");if(!yt(T))return[];return Mn(wt()).filter((I)=>Ka(qt(T,I.name),"remove")!==void 0)}function Xa(A){let T=Vo(A,"remove");if(!yt(T))return{path:T,alreadyInstalled:!1};let I=zo(A);if(I.forEach((N)=>{Uo(qt(T,N.name))}),Uo(qt(T,kf),{recursive:!0,force:!0}),bf(T).length===0)Uo(T,{recursive:!0});return{path:T,alreadyInstalled:I.length>0}}var Hn="hermes-agent",Za=/^([^\s#][^:]*):/,Sf=/^\s+([A-Za-z_][\w-]*):/,Qa=/^\s+-\s*(.*)$/;function Rf(A){return A.trim().replace(/^(["'])(.*)\1$/,"$2")}function Pf(A){let T=A.split(/\r?\n/),I=T.findIndex((K)=>Za.exec(K)?.[1]?.trim()==="plugins");if(I===-1)return[];let N=T.slice(I+1),J=N.findIndex((K)=>Za.test(K));return J===-1?N:N.slice(0,J)}function el(A,T){let I=Pf(A),N=I.findIndex((ne)=>Sf.exec(ne)?.[1]===T);if(N===-1)return[];let J=I.slice(N+1),K=J.findIndex((ne)=>!Qa.test(ne));return(K===-1?J:J.slice(0,K)).map((ne)=>Rf(Qa.exec(ne)?.[1]??""))}function Ef(A){try{return tl(nl(Go(A),"config.yaml"),"utf-8")}catch{return}}function Jo(A){let T=Ef(A)??"";return el(T,"enabled").includes($t)&&!el(T,"disabled").includes($t)}function rl(A){return/^# version:\s*(.+)$/m.exec(A)?.[1]?.trim()}function Df(A,T){let I=yt(A);if(!I)return{error:`${T.name} is missing from ${A}; run install --hermes-agent`};if(I.isSymbolicLink()||!I.isFile())return{error:`${A} is a symlink or not a regular file; move or remove it`};try{let N=tl(A,"utf-8");if(!qo(N))return{error:`Unmanaged ${T.name} occupies ${A}; move or remove it`};if(rl(N)===wt()&&N!==T.content)return{error:`Modified ${T.name} occupies ${A}; run install --hermes-agent to restore it`};return{content:N}}catch(N){return{error:`Failed to read ${A}: ${N instanceof Error?N.message:String(N)}`}}}function Af(A){try{return{path:Bo(A)}}catch(T){return{error:T instanceof Error?T.message:String(T)}}}function ol(A){let T=Af(A.environment);if("error"in T)return{platform:Hn,status:"n/a",errors:[T.error]};let I=T.path,N=Lr(Hn,I);if(N)return N;let J=Mn(wt()).map((de)=>Df(nl(I,de.name),de)),K=J.flatMap((de)=>("error"in de)?[de.error]:[]);if(K.length>0)return{platform:Hn,status:"n/a",configPath:I,errors:K};let ne=J.some((de)=>("content"in de)&&rl(de.content)!==wt()),oe=ne?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!Jo(A.environment))return{platform:Hn,status:"disabled",method:"plugin directory",configPath:I,errors:[`${$t} is not enabled in Hermes; run \`hermes plugins enable ${$t}\``,...oe]};return{platform:Hn,status:"configured",method:"plugin directory",configPath:I,errors:ne?oe:void 0}}import{existsSync as _f,readFileSync as Tf}from"node:fs";import{join as il}from"node:path";var If=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/;function $f(A){return il(A.env.get("KIMI_CODE_HOME")||il(A.home,".kimi-code"),"config.toml")}function Un(A){let T=$f(A.environment);if(!_f(T))return{platform:"kimi-code",status:"n/a",configPath:T};try{if(!If.test(Tf(T,"utf-8")))return{platform:"kimi-code",status:"n/a",configPath:T}}catch(I){return{platform:"kimi-code",status:"n/a",configPath:T,errors:[`Failed to read ${T}: ${I instanceof Error?I.message:String(I)}`]}}return{platform:"kimi-code",status:"configured",method:"hook config",configPath:T}}import{readFileSync as gl}from"node:fs";import{join as Bn}from"node:path";var vt="cc-safety-net",Tt="index.js",wn="openclaw.plugin.json",kn="package.json";var $r="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as Ff,lstatSync as jf,readdirSync as Mf,readFileSync as Hf}from"node:fs";import{dirname as al,join as Yt}from"node:path";import{fileURLToPath as Uf}from"node:url";import{spawn as Of}from"node:child_process";function Nf(A){return A.join(" ")}function Wo(A,T,I){return[`Failed to run ${Nf(A)}${T===null?"":` (exit ${T})`}.`,I.trim()].filter(Boolean).join(`
`)}function Ko(A){let T={stdout:"",stderr:""};return A.stdout.setEncoding("utf-8"),A.stderr.setEncoding("utf-8"),A.stdout.on("data",(I)=>{T.stdout+=I}),A.stderr.on("data",(I)=>{T.stderr+=I}),T}function St(A,T){return new Promise((I,N)=>{let J=nn([...A],process.env),K=Of(J.cmd,J.args,{stdio:["ignore","pipe","pipe"]}),ne=Ko(K),oe=()=>[ne.stdout,ne.stderr].filter(Boolean).join(`
`),de=T?.timeoutMs??120000,ue=setTimeout(()=>{K.kill(),N(Error(Wo(A,null,`Timed out after ${de}ms.
${oe()}`.trim())))},de);K.on("error",(ve)=>{clearTimeout(ue),N(Error(Wo(A,null,`${ve.message}
${oe()}`.trim())))}),K.on("close",(ve)=>{if(clearTimeout(ue),ve!==0){N(Error(Wo(A,ve,oe())));return}I(T?.stdoutOnly?ne.stdout:oe())})})}async function Yo(A){for(let T of A)await St(T)}async function sl(A){for(let T of A)try{await St(T)}catch(I){console.warn(I instanceof Error?I.message:String(I))}}var Xo=Yt("openclaw",vt),sn=`run \`openclaw plugins enable ${vt}\``,Gf="config reload superseded by a newer runtime config source",Bf=[Tt,wn,kn];function ll(A){let T=A.env.get("OPENCLAW_HOME")?.trim();return T?Bt(T,A.home):A.home}function cl(A){let T=ll(A),I=A.env.get("OPENCLAW_STATE_DIR")?.trim();if(I)return Bt(I,T);let N=A.env.get("OPENCLAW_CONFIG_PATH")?.trim();return N?al(Bt(N,T)):Yt(T,".openclaw")}function dl(A){let T=A.env.get("OPENCLAW_CONFIG_PATH")?.trim();return T?Bt(T,ll(A)):Yt(cl(A),"openclaw.json")}function Gn(A){return Yt(cl(A),"extensions",vt)}function qf(A){let T=Mf(A);if(T.length===0)return!0;if(T.some((J)=>!Bf.includes(J)))return!1;let I=Yt(A,Tt),N=yt(I);return N!==void 0&&!N.isSymbolicLink()&&N.isFile()&&Hf(I,"utf-8").startsWith($r)}function Zo(A){let T=Gn(A),I=yt(T);if(!I)return;if(!I.isSymbolicLink()&&I.isDirectory()&&qf(T))return;throw Error(`Refusing to modify ${T}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function ul(){let A=al(Uf(import.meta.url));return[Yt(A,Xo),Yt(A,"..",Xo),Yt(A,"..","..","..","dist",Xo)]}function Qo(A=ul()){return A.find((T)=>Ff(T)&&jf(T).isDirectory())}function Vf(A=ul()){let T=Qo(A);if(!T)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return T}function pl(A=Vf()){return[["openclaw","plugins","install",A,"--force","--accept-capabilities"]]}function zf(A){let T=(()=>{try{return JSON.parse(A)}catch{return}})(),I=dt(dt(T,"plugin"),"status");return typeof I==="string"?I:void 0}async function Jf(){await St(["openclaw","plugins","enable",vt]).catch((A)=>{if(!(A instanceof Error&&A.message.includes(Gf)))throw A})}async function fl(A){let T=async()=>zf(await St(["openclaw","plugins","inspect",vt,"--runtime","--json"],{stdoutOnly:!0})),I=await T(),N=I==="disabled"&&A;if(N)await Jf();let J=N?await T():I;if(J==="loaded")return;throw Error(`${J===void 0?`The ${vt} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:J==="disabled"?`OpenClaw reports the ${vt} plugin with status "disabled"; ${sn}.`:`OpenClaw reports the ${vt} plugin with status "${J}".`} Run \`openclaw plugins inspect ${vt} --runtime\` for details.`)}var Or="openclaw";function xn(A,T){let I=Bn(A,T),N=yt(I);if(!N)return{error:`${T} is missing from ${I}; run install --openclaw`};if(N.isSymbolicLink()||!N.isFile())return{error:`${I} is a symlink or not a regular file; move or remove it`};try{return{content:gl(I,"utf-8")}}catch(J){return{error:`Failed to read ${I}: ${J instanceof Error?J.message:String(J)}`}}}function hl(A){try{return JSON.parse(_t(A))}catch{return}}function Wf(A){let T=xn(A,wn);if("error"in T)return T.error;if(dt(hl(T.content),"id")===vt)return;return`${Bn(A,wn)} is not a valid ${vt} manifest; run install --openclaw`}function Kf(A){let T=xn(A,kn);if("error"in T)return T.error;let I=dt(dt(hl(T.content),"openclaw"),"extensions");if(Array.isArray(I)&&I.includes(`./${Tt}`))return;return`${Bn(A,kn)} does not point OpenClaw at ${Tt}; run install --openclaw`}function ml(A){return Array.isArray(A)?A.filter((T)=>typeof T==="string"):[]}function Yf(A){let T=dl(A);if(!yt(T))return`${vt} is not enabled; ${sn}`;let I=(()=>{try{return JSON.parse(_t(gl(T,"utf-8")))}catch{return}})();if(I===void 0)return`Failed to read ${T}; fix it, then ${sn}`;let N=dt(I,"plugins");if(dt(N,"enabled")===!1)return`plugins.enabled is false in ${T}; no OpenClaw plugin loads`;let J=dt(dt(dt(N,"entries"),vt),"enabled");if(ml(dt(N,"deny")).includes(vt)||J===!1)return`${vt} is disabled in ${T}; ${sn}`;let K=ml(dt(N,"allow"));if(K.length>0&&!K.includes(vt))return`plugins.allow in ${T} does not list ${vt}; add it, then ${sn}`;if(K.includes(vt)||J===!0)return;return`${vt} is not enabled; ${sn}`}function yl(A){return/^\/\/ version:\s*(.+)$/m.exec(A)?.[1]?.trim()}function Xf(A,T,I){if(I===void 0)return[];let N=xn(I,Tt);if(!(("content"in N)&&yl(N.content)===T))return[];return[Tt,wn,kn].flatMap((K)=>{let ne=xn(A,K),oe=xn(I,K);if("error"in ne||"error"in oe||ne.content===oe.content)return[];return[`Modified ${K} occupies ${Bn(A,K)}; run install --openclaw to restore it`]})}function vl(A){let T=Gn(A.environment),I=Lr(Or,T);if(I)return I;let N=xn(T,Tt),K=["error"in N?N.error:N.content.startsWith($r)?void 0:`Unmanaged ${Tt} occupies ${Bn(T,Tt)}; move or remove it`,Wf(T),Kf(T)].filter((ve)=>ve!==void 0),ne="content"in N?yl(N.content):void 0,oe=K.length>0?K:Xf(T,ne,Qo());if(oe.length>0)return{platform:Or,status:"n/a",configPath:T,errors:oe};let de=ne===wt()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],ue=Yf(A.environment);if(ue)return{platform:Or,status:"disabled",method:"plugin directory",configPath:T,errors:[ue,...de]};return{platform:Or,status:"configured",method:"plugin directory",configPath:T,errors:de.length>0?de:void 0}}import{existsSync as sm,readFileSync as am}from"node:fs";import{basename as lm}from"node:path";import{existsSync as Nr,readFileSync as ei,rmSync as Zf}from"node:fs";import{join as Mt}from"node:path";import{pathToFileURL as Qf}from"node:url";var qn="cc-safety-net",an=`${qn}@latest`,ti=["opencode.json","opencode.jsonc"],em=60,tm=250,bl="CCSafetyNetPlugin",nm={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function Ll(A){return Mt(A.env.get("XDG_CONFIG_HOME")||Mt(A.home,".config"),"opencode")}function ni(A){return A.env.get("OPENCODE_CONFIG_DIR")||Ll(A)}function ri(A){return ti.map((T)=>Mt(ni(A),T))}function oi(A){return[...new Set([ni(A),Ll(A)])].flatMap((T)=>ti.map((I)=>Mt(T,I)))}function wl(A){return Mt(A.env.get("XDG_CACHE_HOME")||Mt(A.home,".cache"),"opencode","packages",an)}function kl(A){Zf(wl(A),{recursive:!0,force:!0})}async function xl(A){let T=(await St(["opencode","--version"],{stdoutOnly:!0})).trim(),I=/^(?:opencode\s+)?v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(T),N=Number(I?.[1]),J=Number(I?.[2]),K=Number(I?.[3]);if(!I||N!==1&&N!==2||N===1&&(J<18||J===18&&K<29)||N===2&&J===0&&K<6)throw Error(`OpenCode 1.18.29+ or 2.0.6+ is required; found ${T||"an unknown version"}.`);if(N===2){for(let ne of ri(A)){if(!Nr(ne))continue;let oe=si(ei(ne,"utf-8"),ne);if(["plugin","plugins"].some((ue)=>{let ve=dt(oe,ue);return Array.isArray(ve)&&ve.some((xe)=>Fr(xe)&&(typeof xe==="string"?xe:dt(xe,"package"))!==an)}))throw Error(`Change the cc-safety-net package spec in ${ne} to ${an}, preserving its options, then retry. Adding another spec would create a duplicate plugin ID.`)}return{commands:[],afterInstall:async()=>{if((await St(["opencode","plugin","add",an],{stdoutOnly:!0})).includes("is already configured in"))await St(["opencode","plugin","update",an]);let oe=await Rl();if(!/^cc-safety-net\s+\S+\s+cc-safety-net@latest\s*$/m.test(oe))throw Error("OpenCode did not load cc-safety-net from cc-safety-net@latest. Run `opencode plugin list` for details.");let de=["--param",`location[directory]=${process.cwd()}`];await St(["opencode","api","integration.list",...de]);let ue=await St(["opencode","api","plugin.list",...de],{stdoutOnly:!0}),ve=ii(ue);if(ve)throw Error(ve);if(!Cl(ue).some(Sl))throw Error("OpenCode lists no active cc-safety-net for this directory. Run `opencode api plugin.list` for details.")}}}return kl(A),{commands:[["opencode","plugin","-g","-f",an]],afterInstall:()=>om(A)}}function Cl(A){return rm(A).filter((T)=>dt(T,"id")===qn||Fr(dt(dt(T,"source"),"target"))).map((T)=>dt(T,"state"))}function Sl(A){return dt(A,"status")==="active"}function ii(A){let T=Cl(A);if(T.some(Sl))return;let I=T.find((N)=>dt(N,"status")==="failed");if(!I)return;return`OpenCode reports cc-safety-net failed: ${String(dt(I,"error")).split(`
`)[0]}`}function rm(A){if(!A)return[];try{let T=dt(JSON.parse(A),"data");return Array.isArray(T)?T:[]}catch{return[]}}async function Rl(A=1){let T=await St(["opencode","plugin","list"],{stdoutOnly:!0});if(/^cc-safety-net\s|\scc-safety-net@latest\s*$/m.test(T)||A===em)return T;return await new Promise((I)=>setTimeout(I,tm)),Rl(A+1)}async function om(A){let T=Mt(wl(A),"node_modules",qn),I=Mt(T,"package.json");if(!Nr(I))throw Error(`The OpenCode plugin cache at ${T} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${an}\` for details.`);let N=dt(JSON.parse(ei(I,"utf-8")),"main");if(typeof N!=="string")throw Error(`The cached OpenCode plugin at ${T} declares no "main" entry.`);let J=Mt(T,N);if(typeof(await import(Qf(J).href))[bl]==="function")return;throw Error(`The cached OpenCode plugin at ${J} does not export a callable ${bl}, so OpenCode would load nothing and fail open.`)}function si(A,T){try{return JSON.parse(_t(A))}catch(I){if(I instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${T}: ${I.message}`);throw I}}function Fr(A){let T=typeof A==="string"?A:dt(A,"package");return typeof T==="string"&&(T===qn||T.startsWith(`${qn}@`))}function ai(A){return["plugin","plugins"].some((T)=>{let I=dt(A,T);return Array.isArray(I)&&I.some(Fr)})}function im(A,T){let N=["plugin","plugins"].flatMap((J)=>{let K=ma(A,J,nm);if(!K)return[];let ne=[],oe=0,de=K.start+1,ue=A.slice(K.start+1,K.end).matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|[^"\s{}[\],/]+|[{}[\],]/g);for(let ve of ue){if(ve[0].startsWith("//")||ve[0].startsWith("/*"))continue;let xe=K.start+1+ve.index;if(oe===0)de=xe;if(ve[0]==="{"||ve[0]==="[")oe++;if(ve[0]==="}"||ve[0]==="]")oe--;if(oe!==0||ve[0]===",")continue;let Se=xe+ve[0].length;if(Fr(JSON.parse(_t(A.slice(de,Se)))))ne.push({start:de,end:Se})}return ne}).sort((J,K)=>J.start-K.start).reverse().reduce((J,K)=>{let ne=/^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*,/.exec(J.slice(K.end));if(ne?.[0].includes("/")){let oe=K.end+ne[0].length-1;return J.slice(0,K.start)+J.slice(K.end,oe)+J.slice(oe+1)}return xr(J,K)},A);return si(N,T),N}function Pl(A){kl(A);let T=oi(A),I=T.find((K)=>Nr(K)),N=[],J=[];for(let K of T){if(!Nr(K))continue;try{let ne=ei(K,"utf-8");if(!ai(si(ne,K)))continue;kt(K,im(ne,K)),J.push(K)}catch(ne){N.push(ne instanceof Error?ne.message:String(ne))}}if(N.length>0)throw Error(N.join(`
`));return{path:J[0]??I??Mt(ni(A),ti[0]),alreadyInstalled:J.length>0}}function Cn(A){let T=[];for(let I of A.openCodeVersion?.startsWith("2.")?ri(A.environment):oi(A.environment))if(sm(I))try{let N=am(I,"utf-8"),J=_t(N),K=JSON.parse(J);if(ai(K)){let ne=ii(A.openCodePluginListOutput);if(ne)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:I,errors:[...T,ne]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:I,errors:T.length>0?T:void 0}}}catch(N){T.push(`Failed to parse ${lm(I)}: ${N instanceof Error?N.message:String(N)}`)}return{platform:"opencode",status:"n/a",errors:T.length>0?T:void 0}}import{join as El}from"node:path";function li(A){let T=A.env.get("PI_CODING_AGENT_DIR");return El(T?Bt(T,A.home):El(A.home,".pi","agent"),"settings.json")}function ci(A){if(typeof A!=="string")return!1;return A==="npm:cc-safety-net"||A.startsWith("npm:cc-safety-net@")}function Dl(A){let T=li(A.environment),I=It(T);if(I.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(I.kind==="missing")return{platform:"pi",status:"n/a"};let N=dt(I.value,"packages");if(!Array.isArray(N))return{platform:"pi",status:"n/a"};let J=N.find((oe)=>ci(typeof oe==="string"?oe:dt(oe,"source")));if(J===void 0)return{platform:"pi",status:"n/a"};let K=dt(J,"extensions");if(Array.isArray(K)&&K.some((oe)=>typeof oe==="string"&&oe.startsWith("-")))return{platform:"pi",status:"disabled",method:"package config",configPath:T,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:T}}var cm={amp:oa,"antigravity-cli":ia,"claude-code":la,codex:da,"copilot-cli":Sa,cursor:Ia,"deepseek-harness":Oa,"gemini-cli":Na,"grok-build":za,"hermes-agent":ol,"kimi-code":Un,openclaw:vl,opencode:Cn,pi:Dl};function Sn(A,T,I){let N={...I,cwd:T,environment:A};return sr.map((J)=>dm(cm[J](N)))}function dm(A){if(A.status==="not-inspected")return{platform:A.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:A.platform,detected:A.status!=="n/a",configured:A.status==="configured",inspectionStatus:A.status!=="n/a"?"verified":A.errors&&A.errors.length>0?"failed":"not-applicable",method:A.method,configPath:A.configPath,configPaths:A.configPaths,errors:A.errors}}import{join as um}from"node:path";var pm=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),fm=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),mm={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function Al(A){let T=um(A.tmpdir,"cc-safety-net-self-test"),I=pm.map((N)=>{let J=M(A,l("self-test",{command:N.command},{kind:"command",shell:"auto"},{configCwd:T,executionCwd:T},N.command),{guard:{dependencies:{loadPolicySnapshot:()=>fm,getModes:()=>mm,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),K=N.expectBlocked?"blocked":"allowed",ne=J.decision.kind==="deny"?"blocked":"allowed";return{command:N.command,description:N.description,expected:K,actual:ne,passed:K===ne,reason:J.decision.kind==="deny"?J.decision.reason:void 0,ruleId:J.decision.kind==="deny"?J.decision.ruleId:void 0}});return{passed:I.filter((N)=>N.passed).length,failed:I.filter((N)=>!N.passed).length,total:I.length,results:I}}function di(A){let T=xt({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},A);if(Ut(T.errors))return null;return{json:T.flags.json,skipUpdateCheck:T.flags.skipUpdateCheck}}async function _l(A,T={}){let I=await Tn(!T.json,()=>{let N=gm(A,T);return{ready:N,finish:()=>N}},()=>_n(),{loadingMessage:"Checking system status…"});if(T.json)console.log(JSON.stringify(I,null,2));else hm(I);return I.engineSelfTest.failed>0||I.findings.some((N)=>N.severity==="error")?1:0}async function gm(A,T){let I=T.cwd??process.cwd(),N=await gr((Ne)=>Cn({environment:A,cwd:I,openCodeVersion:Ne}).status!=="n/a",void 0,I),J=Sn(A,I,{ampPluginListOutput:N.ampPluginListOutput,codexPluginListOutput:N.codexPluginListOutput,copilotCliVersion:N.versions["copilot-cli"],openCodeVersion:N.versions.opencode,openCodePluginListOutput:N.openCodePluginListOutput}),K=Ls(A,I),ne=ws(A),oe=E(A,{cwd:I}),de=oe.policy,ue=R(de,A.env),ve=B(de,ue.capabilities),xe=dr(A,7),Se=Qs(A,I),_e=T.skipUpdateCheck?{currentVersion:wt(),latestVersion:null,updateAvailable:!1}:await Kt(),we={hooks:J,engineSelfTest:Al(A),userConfig:K.userConfig,projectConfig:K.projectConfig,configState:$e(oe),effectiveRules:K.effectiveRules,environment:ne,effectiveSafety:{selectedPreset:de.safety.level??"standard",level:ue.effectiveLevel,capabilities:ue.capabilities,ruleOverrides:de.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(ve).filter(([,Ne])=>Ne.source==="rule_override"&&Ne.override==="off"&&Ne.inheritedEnabled&&Ne.changesInherited).map(([Ne])=>Ne),ruleCounts:{stored:Object.keys(de.destructiveCommandRuleOverrides).length,effective:Object.values(ve).filter((Ne)=>Ne.changesInherited).length},...oe.policyScopes?{policyScopes:oe.policyScopes}:{}},...Se.length>0?{v2Leftovers:Se}:{},posture:Os(A,K.userConfig.path),activity:xe,update:_e,system:N};return{...we,findings:xs(we)}}function hm(A){console.log(),console.log(Ss(A.hooks)),console.log(),console.log(Rs(A.engineSelfTest)),console.log(),console.log(Ps(A)),console.log(),console.log(Es(A.environment)),console.log(),console.log(Ds(A)),console.log(),console.log(As(A.findings)),console.log(),console.log(_s(A.activity)),console.log(),console.log(Is(A.system)),console.log(),console.log(Ts(A.update)),console.log($s(A))}import{existsSync as ym}from"node:fs";var vm=/^[A-Za-z0-9_@%+=:,./-]+$/,Tl="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function ui(A){let T=xt({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},A);if(Ut(T.errors))return console.error(Tl),console.error("Pass -- before a command that starts with dashes."),null;if(T.values.cwd!==void 0&&!ym(T.values.cwd))return console.error(`Error: --cwd path does not exist: ${T.values.cwd}`),null;let I=T.positionals.length===1?T.positionals[0]:T.positionals.map((N)=>vm.test(N)?N:`'${N.replaceAll("'","'\\''")}'`).join(" ");if(!I)return console.error("Error: No command provided"),console.error(Tl),null;return{json:T.flags.json,cwd:T.values.cwd,command:I}}function Il(A){if(A)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function $l(A,T){let N=T-18;return[`${A.dtl}${A.dh.repeat(T)}${A.dtr}`,`${A.dv}  Command Analysis${" ".repeat(N)}${A.dv}`,`${A.dbl}${A.dh.repeat(T)}${A.dbr}`]}function pi(A){return JSON.stringify(A)}function Ol(A,T=0){return`[${A.map((N,J)=>Cs(N,J,T)).join(",")}]`}function Vn(A,T,I=70){let N=A.split(" "),J=[],K="";for(let ne of N)if(K&&K.length+ne.length+1>I)J.push(K),K=ne;else K=K?`${K} ${ne}`:ne;if(K)J.push(K);return J.map((ne,oe)=>oe===0?ne:`${T}${ne}`)}function Nl(A,T,I){let N=[];switch(A.type){case"parse":return null;case"env-strip":return N.push(""),N.push(`STEP ${T} ${I.h} Strip environment variables`),N.push(`  Removed: ${A.envVars.map((J)=>`${J}=<redacted>`).join(", ")}`),N.push(`  Tokens:  ${pi(A.output)}`),{lines:N,incrementStep:!0};case"leading-tokens-stripped":return N.push(""),N.push(`STEP ${T} ${I.h} Strip wrappers`),N.push(`  Removed: ${A.removed.join(", ")}`),N.push(`  Tokens:  ${pi(A.output)}`),{lines:N,incrementStep:!0};case"shell-wrapper":return N.push(""),N.push(`STEP ${T} ${I.h} Detect shell wrapper`),N.push(`  Wrapper: ${A.wrapper} -c`),N.push(`  Inner:   ${A.innerCommand}`),{lines:N,incrementStep:!0};case"interpreter":{if(N.push(""),N.push(`STEP ${T} ${I.h} Detect interpreter`),N.push(`  Interpreter: ${A.interpreter}`),N.push(`  Code:        ${A.codeArg}`),A.paranoidBlocked)N.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:N,incrementStep:!0}}case"busybox":return N.push(""),N.push(`STEP ${T} ${I.h} Busybox wrapper`),N.push(`  Subcommand: ${A.subcommand}`),{lines:N,incrementStep:!0};case"transparent-wrapper":return N.push(""),N.push(`STEP ${T} ${I.h} Transparent wrapper`),N.push(`  Wrapper: ${A.wrapper}`),N.push(`  Tokens:  ${pi(A.output)}`),{lines:N,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(N.push(""),N.push(`STEP ${T} ${I.h} Match rules`),N.push(`  Rule:   ${A.rule}()`),A.matched)N.push("  Result: MATCHED");else N.push("  Result: No match");return{lines:N,incrementStep:!0}}case"worktree-relaxation":return N.push(""),N.push(`STEP ${T} ${I.h} Worktree relaxation`),N.push(`  Mode:   ${o.worktree.name}`),N.push(`  Git cwd: ${A.gitCwd}`),N.push("  Result: Allowed local discard in linked worktree"),{lines:N,incrementStep:!0};case"temp-root-relaxation":return N.push(""),N.push(`STEP ${T} ${I.h} Temp-root relaxation`),N.push(`  Git cwd: ${A.gitCwd}`),N.push("  Result: Allowed git discard in a temp-root repository"),{lines:N,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(A.embeddedCommandFound)return N.push(""),N.push(`STEP ${T} ${I.h} Fallback scan`),N.push(`  Found: ${A.embeddedCommandFound}`),{lines:N,incrementStep:!0};return null}case"custom-rules-check":{if(A.rulesChecked){if(N.push(""),N.push(`STEP ${T} ${I.h} Custom rules`),A.matched)N.push("  Result: MATCHED");else N.push("  Result: No match");return{lines:N,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(A.matched)return N.push(""),N.push(`STEP ${T} ${I.h} Dangerous text check`),N.push(`  Token:  ${A.token}`),N.push("  Result: MATCHED"),{lines:N,incrementStep:!0};return null}case"strict-unparseable":return N.push(""),N.push(`STEP ${T} ${I.h} Strict mode check`),N.push(`  Command: ${A.rawCommand}`),N.push("  Result:  ✗ UNPARSEABLE"),{lines:N,incrementStep:!0};case"segment-skipped":return null;case"error":return N.push(""),N.push(`ERROR: ${A.message}`),{lines:N,incrementStep:!1};default:return A}}function fi(A,T){let I=Il(T?.asciiOnly??!1),N=58,J=[],K=1;J.push(...$l(I,58)),J.push("");let ne=A.trace.steps.find((we)=>we.type==="error");if(ne&&ne.type==="error"){J.push("ERROR"),J.push(`  ${ne.message}`),J.push(""),J.push("RESULT"),J.push(`  Status: ${A.result==="blocked"?ot.red("BLOCKED"):ot.green("ALLOWED")}`),J.push(""),J.push("CONFIG");let we=A.configSource??"none";return J.push(`  Path: ${we}`),J.join(`
`)}let oe=A.trace.steps.find((we)=>we.type==="parse");if(oe&&oe.type==="parse"){J.push("INPUT"),J.push(`  ${oe.input}`),J.push(""),J.push(`STEP ${K} ${I.h} Split shell commands`),K++;for(let we=0;we<oe.segments.length;we++){let Ne=oe.segments[we];if(Ne){let nt=Math.random();J.push(`  Segment ${we+1}: ${Ol(Ne,nt)}`)}}}let de=A.trace.segments,ue=de.length>1;for(let we of de){if(ue){J.push("");let ft="";if(oe&&oe.type==="parse"){let lo=oe.segments[we.index];if(lo)ft=lo.join(" ")}let mt=54,gt=ft,pt=` Segment ${we.index+1}: `,bt=" ";if(ft){if(pt.length+ft.length+bt.length>mt){let vu=mt-pt.length-bt.length;gt=`${ft.substring(0,vu-1)}…`}}let At=ft?`${pt}${gt}${bt}`:` Segment ${we.index+1} `,hu=ft?`${pt}${ot.cyan(gt)}${bt}`:At,Ki=58-At.length,Yi=Math.floor(Ki/2),yu=Ki-Yi;J.push(`${I.sh.repeat(Yi)}${hu}${I.sh.repeat(yu)}`)}if(we.steps.find((ft)=>ft.type==="segment-skipped")){J.push(""),J.push("  (skipped — prior segment blocked)");continue}let nt=!1,Ve=!1;for(let ft of we.steps){let mt=Nl(ft,K,I);if(mt){if(Ve=!0,ft.type==="recurse"){J.push("");let gt=" RECURSING ",pt=58-gt.length-4;J.push(`  ${I.tl}${I.h}${gt}${I.h.repeat(pt)}`),J.push(`  ${I.v}`),nt=!0;continue}for(let gt of mt.lines)if(nt)J.push(`  ${I.v} ${gt}`);else J.push(gt);if(mt.incrementStep)K++}}if(nt)J.push(`  ${I.v}`),J.push(`  ${I.bl}${I.h.repeat(56)}`);if(!Ve)J.push(""),J.push(`  ${ot.green("✓")} Allowed (no matching rules)`)}if(J.push(""),J.push("RESULT"),A.result==="blocked"){if(J.push(`  Status: ${ot.red("BLOCKED")}`),A.customRule){if(J.push(`  Rule: ${A.customRule.id}`),A.customRule.rulebook)J.push(`  Rulebook: ${A.customRule.rulebook.name} ${A.customRule.rulebook.version}`);if(A.customRule.source)J.push(`  Source: ${A.customRule.source}`);if(A.customRule.override)J.push(`  Override: reason ${A.customRule.override.reason}`)}if(A.reason){let we=Vn(A.reason,"          ");J.push(`  Reason: ${we[0]}`);for(let Ne=1;Ne<we.length;Ne++)J.push(we[Ne]??"")}}else J.push(`  Status: ${ot.green("ALLOWED")}`);J.push(""),J.push("CONFIG");let ve=A.configSource??"none",xe=A.configValid?"":" (invalid)";J.push(`  Path: ${ve}${xe}`);let Se=A.safetyPresetScope;J.push(`  Safety preset: ${A.selectedPreset??"standard"}${Se?` (${pr(Se)})`:""}`),J.push(`  Effective capabilities: ${A.effectiveLevel}`);let _e=Object.entries(A.destructiveCommandRuleOverrides??{});if(J.push(`  Rule customizations: ${_e.length}`),A.ruleActivation)J.push(`  Rule activation: ${A.ruleActivation.id} — ${A.ruleActivation.enabled?"on":"off"} via ${A.ruleActivation.source}`);return J.join(`
`)}function mi(A){return JSON.stringify(A,null,2)}import{resolve as xm}from"node:path";var bm=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function Fl(A){let T=0,I={allocateSegment(){return T++},getNextSegmentIndex(){return T},recordGlobal(N){A.record({kind:"step",scope:"global",step:N})},recordSegment(N,J=I.currentSegmentIndex){if(J===void 0)return;A.record({kind:"step",scope:"segment",segmentIndex:J,step:N})}};return I}function jl(A={}){let T=[],I=A.maxEvents??512,N={maxTextLength:A.maxTextLength??2048,maxListLength:A.maxListLength??128,maxObjectProperties:A.maxObjectProperties??A.maxListLength??128,maxDepth:A.maxDepth??16},J,K=new Set;return{record(ne){if(J)return;if(!ne||T.length>=I)return;try{T.push(yi(Lm(ne,N,K)))}catch{}},finish(){if(J)return J;return J=yi({events:Object.freeze(T)}),J}}}function Lm(A,T,I){if(A.kind!=="step")throw TypeError("invalid trace event");let{scope:N,step:J}=A;jr(J,I,T);let K=gi(J,T,I);if(N==="global")return{kind:"step",scope:"global",step:K};if(N!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:A.segmentIndex,step:K}}function jr(A,T,I,N=0,J=new WeakSet){if(typeof A==="string"){let oe=A.slice(0,I.maxTextLength);if(!Be(oe))return;for(let de of tt(oe))for(let ue of de.match(/[^\s"'()$]+/g)??[])T.add(Ml(ue));return}if(!A||typeof A!=="object"||N>=I.maxDepth||J.has(A))return;if(J.add(A),Array.isArray(A)){let oe=Math.min(A.length,I.maxListLength);for(let de=0;de<oe;de++)jr(A[de],T,I,N+1,J);return}let K=0,ne=new Set;for(let oe in A){if(!Object.hasOwn(A,oe))continue;if(K>=I.maxObjectProperties)break;K++,jr(oe,T,I);let de=hi(oe,I,T);if(ne.has(de))continue;ne.add(de),jr(A[oe],T,I,N+1,J)}}function gi(A,T,I,N=0,J=new WeakSet){if(typeof A==="string")return hi(A,T,I);if(!A||typeof A!=="object")return A;if(N>=T.maxDepth)return;if(J.has(A))return;if(J.add(A),Array.isArray(A)){let oe=[],de=Math.min(A.length,T.maxListLength);for(let ue=0;ue<de;ue++)oe.push(gi(A[ue],T,I,N+1,J));return oe}let K={},ne=0;for(let oe in A){if(!Object.hasOwn(A,oe))continue;if(ne>=T.maxObjectProperties)break;ne++;let de=hi(oe,T,I);if(Object.hasOwn(K,de))continue;Object.defineProperty(K,de,{value:gi(A[oe],T,I,N+1,J),enumerable:!0,configurable:!0,writable:!0})}return K}function hi(A,T,I){let N=A.slice(0,T.maxTextLength),J=Be(N)?We(N):N,K=I.size>0?km(J,I):J;return(wm(K)?Te(K):K).slice(0,T.maxTextLength)}function wm(A){return A.includes("PRIVATE KEY")||A.includes("://")||A.includes("eyJ")||A.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(A)||A.length>=14&&bm.some((T)=>A.includes(T))||A.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(A)}function km(A,T){return A.replace(/[^\s"'()$]+/g,(I)=>T.has(Ml(I))?"<redacted>":I)}function Ml(A){let T=2166136261,I=2166136261;for(let N=0;N<A.length;N++)T=Math.imul(T^A.charCodeAt(N),16777619),I=Math.imul(I^A.charCodeAt(A.length-N-1),16777619);return`${T>>>0}:${I>>>0}:${A.length}`}function yi(A){if(A&&typeof A==="object"&&!Object.isFrozen(A)){for(let T of Object.values(A))yi(T);Object.freeze(A)}return A}function zn(A,T={},I){let N=xm(T.cwd??process.cwd()),J=T.policySnapshot??E(I,{cwd:N,userConfigDir:T.userConfigDir}),K=R(J.policy,I.env),ne=je({policySnapshot:J,effectiveCapabilities:K.capabilities,strict:K.strict,paranoidRm:K.paranoidRm,paranoidInterpreters:K.paranoidInterpreters,worktreeMode:K.worktreeMode}),oe={effectiveLevel:ne.effectiveLevel,selectedPreset:J.policy.safety.level??"standard",...J.policyScopes?{safetyPresetScope:J.policyScopes.levelScope}:{},effectiveCapabilities:ne.effectiveCapabilities,destructiveCommandRuleOverrides:J.policy.destructiveCommandRuleOverrides},{configSource:de,configValid:ue}=Sm(I,{cwd:N,userConfigDir:T.userConfigDir});if(!A||!A.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:de,configValid:ue,...oe};let ve=h(A,"auto");if(ve.status==="limited")throw new y;let xe=ve.dialect==="powershell"?h(A,"posix"):ve,Se=ut(xe),_e=jl(),we=Fl(_e);we.recordGlobal({type:"parse",input:A,segments:Se.map((At)=>[...At])});let Ne=l("Bash",{command:A},{kind:"command",shell:"auto"},{configCwd:N,executionCwd:N},A),nt=V(Ne,{environment:I,trace:we,dependencies:{loadPolicySnapshot:()=>J}}),Ve=nt.decision.kind==="deny"?nt.decision:null;if(Ve&&(nt.stage==="policy-protection"||nt.stage==="secret-protection")){let At=Cm(Ve);return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:At.rule,matched:!0,reason:Ve.reason}]}]},result:"blocked",reason:k(Ve.reason),segment:k(Hl(Ve,A)),...At.ruleId?{ruleId:k(At.ruleId)}:{},configSource:de,configValid:ue,...oe}}let ft=we.getNextSegmentIndex();if(Ve&&ft>0&&ft<Se.length)we.recordSegment({type:"segment-skipped",index:ft,reason:"prior-segment-blocked"},ft);let mt=_e.finish(),gt=Ve?.ruleId??Rm(Ne,J,K,I),pt=W.find((At)=>At.id===gt&&At.activationCapability),bt=pt?ne.policy.effectiveDestructiveCommandRules[pt.id]:void 0;return{trace:Em(mt),result:Ve?"blocked":"allowed",reason:Ve?k(Ve.reason):void 0,segment:Ve?k(Hl(Ve,A)):void 0,ruleId:Ve?.ruleId?k(Ve.ruleId):void 0,customRule:Pm(Dm(Ve?.ruleId,J)),configSource:de,configValid:ue,...oe,...pt&&bt?{ruleActivation:{id:pt.id,...bt}}:{}}}function Hl(A,T){return A.evidence?.segment??T}function Cm(A){if(A.reason===Ge)return{ruleId:"policy-protection",rule:"policy-protection:findPolicyConfigMutationTargetInSemanticFacts"};if(A.reason===Ue)return{ruleId:"policy-apply-protection",rule:"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts"};if(A.reason===x)return{ruleId:"git-metadata-protection",rule:"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts"};return{ruleId:A.ruleId,rule:"secret-protection:findSensitiveTargetInSemanticFacts"}}function Sm(A,T){let I=U(T.cwd),N=G(A,T),J=Z(A,{cwd:T.cwd,userConfigDir:T.userConfigDir});try{if(n(J.projectConfigTarget)!==null){if(Wt(J.projectConfigTarget).errors.length===0)return{configSource:I,configValid:!0};return{configSource:I,configValid:!1}}}catch(K){if(K instanceof r)return{configSource:I,configValid:!1};throw K}try{if(n(J.userConfigTarget)!==null){let K=Wt(J.userConfigTarget);return{configSource:N,configValid:K.errors.length===0}}return{configSource:null,configValid:!0}}catch(K){if(K instanceof r)return{configSource:N,configValid:!1};throw K}}function Rm(A,T,I,N){let J=T.policy,K=Le({...J,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...J.destructiveCommandRuleOverrides,...Object.fromEntries(W.flatMap((oe)=>oe.activationCapability?[[oe.id,"on"]]:[]))}},T.state==="degraded"?{diagnostics:T.diagnostics,reason:T.reason}:void 0),ne=V(A,{environment:N,dependencies:{loadPolicySnapshot:()=>K,getModes:()=>({...I,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return ne.decision.kind==="deny"?ne.decision.ruleId:void 0}function Pm(A){if(!A)return;return{id:k(A.id),...A.rulebook?{rulebook:{name:k(A.rulebook.name),version:k(A.rulebook.version)}}:{},...A.source?{source:k(A.source)}:{},...A.override?{override:{type:"reason",reason:k(A.override.reason)}}:{}}}function Em(A){let T=A.events.flatMap((N)=>N.kind==="step"&&N.scope==="global"?[N.step]:[]),I=new Map;for(let N of A.events){if(N.kind!=="step"||N.scope!=="segment")continue;let J=I.get(N.segmentIndex)??{index:N.segmentIndex,steps:[]};J.steps.push(N.step),I.set(N.segmentIndex,J)}return{steps:T,segments:[...I.values()]}}function Dm(A,T){let I=A?.replace(/^custom\./,"");if(!I||!T.policy.rules.some((N)=>N.name===I))return;return T.ruleMetadata[I]??Object.freeze({id:I})}function Ul(A){return new Promise((T)=>{process.stdout.write(`${A}
`,()=>T())})}async function Gl(A,T){let I=ui(T);if(!I)return 1;try{let N=zn(I.command,{cwd:I.cwd},A),J=!!process.env.NO_COLOR||!process.stdout.isTTY;return await Ul(I.json?mi(N):fi(N,{asciiOnly:J})),0}catch(N){let J=Am(N instanceof p?N.cause:N);if(J===void 0)throw N;if(I.json)return await Ul(JSON.stringify({error:J})),1;return console.error(J),1}}function Am(A){if(A instanceof y)return A.message;if(A instanceof f)return A.message;if(A instanceof s&&a[A.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Bl="2.4.15",Nt="  ",ln="cc-safety-net";function ql(A){return A.argument?`${A.flags} ${A.argument}`:A.flags}function _m(A){return Math.max(...A.map((T)=>ql(T).length))}function Tm(A){return Math.max(...A.map((T)=>T.usage.length))}function Im(A){return Math.max(...A.map((T)=>`${ln} ${T.usage}`.length))}function $m(A,T){let I=`${ln} ${A.usage}`;return`${Nt}${I.padEnd(T+2)}${A.description}`}function Vt(A,T){return`${Nt}${A.padEnd(Math.max(40,A.length+2))}${T}`}function Rn(A,T=console.log){let I=[];if(I.push(`${ln} ${A.name}`),I.push(""),I.push(`${Nt}${A.description}`),I.push(""),I.push("USAGE:"),I.push(`${Nt}${ln} ${A.usage}`),I.push(""),A.subcommands&&A.subcommands.length>0){I.push("SUBCOMMANDS:");let N=Tm(A.subcommands);for(let J of A.subcommands)I.push(`${Nt}${J.usage.padEnd(N+2)}${J.description}`);I.push("")}if(A.options.length>0){I.push("OPTIONS:");let N=_m(A.options);for(let J of A.options){let K=ql(J),ne=J.default?`${J.description} (default: ${J.default})`:J.description;I.push(`${Nt}${K.padEnd(N+2)}${ne}`)}I.push("")}if(A.examples&&A.examples.length>0){I.push("EXAMPLES:");for(let N of A.examples)I.push(`${Nt}${N}`)}T(I.join(`
`))}function vi(){let A=Im(lr),T=[];T.push(`${ln} v${Bl}`),T.push(""),T.push("Blocks destructive commands and secret access."),T.push(""),T.push("COMMANDS:");for(let I of lr)T.push($m(I,A));T.push(""),T.push("GLOBAL OPTIONS:"),T.push(`${Nt}-h, --help       Show help (use with command for command-specific help)`),T.push(`${Nt}-V, --version    Show version`),T.push(""),T.push("HELP:"),T.push(`${Nt}${ln} help <command>     Show help for a specific command`),T.push(`${Nt}${ln} <command> --help   Show help for a specific command`),T.push(""),T.push("ENVIRONMENT VARIABLES:"),T.push(Vt(`${o.level.name}=standard|strict|paranoid`,"Set session safety level")),T.push(Vt(`${o.worktree.name}=1`,"Allow local git discards in linked worktrees")),T.push(Vt(`${o.debug.name}=1`,"Print diagnostic messages to stderr")),T.push(Vt(`${o.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),T.push(Vt("CC_SAFETY_NET_HOME","Override rule config home directory")),T.push(""),T.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),T.push(Vt(`${o.strict.name}=1`,"Force safety.overrides.fail_closed on")),T.push(Vt(`${o.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),T.push(Vt(`${o.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),T.push(Vt(`${o.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),T.push(""),T.push("Documentation:        https://ccsafetynet.com/docs"),console.log(T.join(`
`))}function Vl(){console.log(Bl)}function Jn(A,T=console.log){let I=cr(A);if(!I)return!1;if(I.name.toLowerCase()!==A.toLowerCase())return!1;return Rn(I,T),!0}import{existsSync as zr,readFileSync as Xc}from"node:fs";import{join as Vr}from"node:path";import*as Xt from"node:readline";function Om(A){return A==="install"?"Install":"Uninstall"}function Nm(A){return A==="install"?"Installing":"Uninstalling"}function Fm(A){return A==="install"?"into":"from"}function Wl(A){return A?.available===!0}function jm(A,T){let I=new Set(T);return A.filter((N)=>I.has(N.target)).map((N)=>N.target)}function zl(A,T,I){if(A.every((N)=>!N.available))return T;return Array.from({length:A.length},(N,J)=>J+1).map((N)=>(T+N*I+A.length)%A.length).find((N)=>Wl(A[N]))}function Mm(A,T,I){if(I.ctrl&&I.name==="c")return"interrupt";if(I.name==="escape"||T==="q")return"abort";if(A==="install"&&(T==="u"||T==="U"))return"update";if(I.name==="up"||T==="k")return"up";if(I.name==="down"||T==="j")return"down";if(I.name==="space"||T===" ")return"toggle";if(I.name==="return"||I.name==="enter")return"confirm";return null}function Hm(A){return{cursor:A.findIndex((T)=>T.available),selected:[]}}function Um(A,T,I){if(I==="confirm"||I==="update"||I==="abort"||I==="interrupt")return{state:A,done:I};if(I==="up")return{state:{...A,cursor:zl(T,A.cursor,-1)}};if(I==="down")return{state:{...A,cursor:zl(T,A.cursor,1)}};let N=T[A.cursor];if(!Wl(N))return{state:A};let J=A.selected.includes(N.target)?A.selected.filter((K)=>K!==N.target):jm(T,[...A.selected,N.target]);return{state:{...A,selected:J}}}var Kl="◉",Yl="◯",Xl=">",Zl=" ";function Gm(A,T,I,N={}){let J=N.color!==!1,K=J?ot.dim:(de)=>de,ne=J?ot.green:(de)=>de,oe=J?ot.bold:(de)=>de;return["",`${Om(A)} CC Safety Net ${Fm(A)}:`,"",...T.map((de,ue)=>{let ve=I.selected.includes(de.target),xe=ue===I.cursor,Se=ve?Kl:Yl,_e=xe?Xl:Zl,we=de.available?"":` (${de.unavailableReason??"not installed"})`,Ne=`${Se} ${de.label}${we}`,nt=!de.available?K(Ne):ve?ne(Ne):xe?oe(Ne):Ne;return`${_e} ${nt}`}),"",A==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":T.some((de)=>de.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${A}. q/Esc: close`].join(`
`)}var Jl=["global-hook","plugin"];function Bm(A,T,I={}){let N=I.color!==!1?ot.bold:(K)=>K;return["","Install the Kimi Code integration as:","",...[`Global hook — ${T?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((K,ne)=>{let oe=ne===A,de=`${oe?Kl:Yl} ${K}`;return`${oe?Xl:Zl} ${oe?N(de):de}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function Ql(A){let{input:T,output:I}=A;Xt.emitKeypressEvents(T);let N=T.isRaw===!0;T.setRawMode(!0),T.resume();let J=0,K=()=>{if(J===0)return;Xt.moveCursor(I,0,-J),Xt.cursorTo(I,0),Xt.clearScreenDown(I)},ne=()=>{K();let oe=A.render();I.write(`${oe}
`),J=oe.split(`
`).length};return new Promise((oe)=>{let de=(ve)=>{T.off("keypress",ue),T.setRawMode(N),T.pause(),K(),oe(ve)};function ue(ve,xe){A.onKey(ve,xe,{finish:de,draw:ne})}T.on("keypress",ue),ne()})}function ec(A={}){let T=0;return Ql({input:A.input??process.stdin,output:A.output??process.stdout,render:()=>Bm(T,A.globalHookInstalled===!0),onKey:(I,N,J)=>{if(N.ctrl&&N.name==="c"){J.finish(null),(A.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(N.name==="escape"||I==="q")return J.finish(null);if(N.name==="return"||N.name==="enter")return J.finish(Jl[T]);if(N.name==="up"||N.name==="down"||I==="k"||I==="j")T=(T+1)%Jl.length,J.draw()}})}function bi(A=process.stdin,T=process.stdout){return Boolean(A.isTTY&&T.isTTY&&typeof A.setRawMode==="function")}function tc(A,T,I={}){let N=I.output??process.stdout,J=Hm(T);return Ql({input:I.input??process.stdin,output:N,render:()=>Gm(A,T,J),onKey:(K,ne,oe)=>{let de=Mm(A,K,ne);if(!de)return;let ue=Um(J,T,de);if(J=ue.state,ue.done==="interrupt"){oe.finish(null),(I.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(ue.done==="abort")return oe.finish(null);if(ue.done==="update")return oe.finish("update");if(ue.done==="confirm"){if(J.selected.length===0){N.write("\x07"),oe.draw();return}oe.finish([...J.selected]),N.write(`${Nm(A)} selected integrations...
`);return}oe.draw()}})}import{existsSync as nc,lstatSync as Vm,mkdirSync as zm,mkdtempSync as Jm,readdirSync as Wm,readFileSync as En,rmSync as Hr}from"node:fs";import{basename as Km,dirname as Ym,join as Dt}from"node:path";import{fileURLToPath as Xm}from"node:url";var Li="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",cn="cc-safety-net",dn="cc-safety-net/index.ts";import{spawn as qm}from"node:child_process";var wi=(A,T)=>{let I=nn([...A],process.env);return new Promise((N)=>{let J=qm(I.cmd,I.args,{cwd:T,stdio:["ignore","pipe","pipe"]}),K=Ko(J),ne=!1,oe=setTimeout(()=>{ne=!0,J.kill()},120000);J.on("error",(de)=>{clearTimeout(oe),N({status:null,errorCode:de.code,stdout:K.stdout,stderr:[de.message,K.stderr].filter(Boolean).join(`
`)})}),J.on("close",(de)=>{clearTimeout(oe),N({status:ne?null:de,errorCode:ne?"ETIMEDOUT":void 0,stdout:K.stdout,stderr:K.stderr})})})};var Pn="cc-safety-net.ts",ki=Dt("amp",dn);function Zm(A){return Dt(A.home,".config","amp","plugins","cc-safety-net.ts")}function Qm(){let A=Ym(Xm(import.meta.url)),T=Dt(A,ki),I=Dt(A,"..",ki),N=Dt(A,"..","..","..","dist",ki);return[T,I,N]}function eg(A=Qm()){let T=A.find((I)=>nc(I)&&Vm(I).isFile());if(!T)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return T}function rc(A){try{return JSON.parse(A)}catch{return}}function Ur(A){return A.subarray(0,Buffer.byteLength(Li)).toString("utf-8")===Li}async function Wn(A,T,I){let N=await A(T,I);if(N.status===0)return N;throw Error([`Failed to run ${T.join(" ")}${N.status===null?"":` (exit ${N.status})`}.`,[N.stdout,N.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function oc(A){let T=await A(["amp","plugins","repositories","--json"]);if(T.status===null)throw Error(`${T.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${T.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${T.stderr}`.trim());if(T.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${T.status}). Sign in with "amp login" and rerun install --amp.
${[T.stdout,T.stderr].filter(Boolean).join(`
`)}`.trim());let I=rc(T.stdout),N=(Array.isArray(I)?I:[]).filter((J)=>dt(J,"scope")==="user"&&dt(J,"exists")===!0&&dt(J,"viewerCanWrite")===!0).map((J)=>dt(J,"cloneRef")).find((J)=>typeof J==="string"&&J.length>0);if(!N)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return N}async function ic(A,T,I){let N=Jm(Dt(T.tmpdir,"cc-safety-net-amp-"));try{return await Wn(A,["amp","clone","user-plugins",N]),await I(N)}finally{Hr(N,{recursive:!0,force:!0})}}function xi(A){return`rerun ${A==="overwrite"?"install":"uninstall"} --amp`}function sc(A,T,I){let N=Dt(A,T),J=yt(N);if(!J)return;if(J.isSymbolicLink()||!J.isFile())throw Error(`Refusing to ${I} ${T} in your Amp personal plugins repository: not a regular file. Remove it there and ${xi(I)}.`);let K=En(N);if(Ur(K))return K;throw Error(`Refusing to ${I} unmanaged file ${T} in your Amp personal plugins repository. Remove it there and ${xi(I)}.`)}function ac(A,T){let I=Dt(A,cn),N=yt(I);if(!N)return;if(N.isSymbolicLink()||!N.isDirectory())throw Error(`Refusing to ${T} ${cn} in your Amp personal plugins repository: not a regular directory. Remove it there and ${xi(T)}.`);return sc(A,dn,T)}function tg(A){let T=Dt(A,Pn),I=yt(T);if(!I||I.isSymbolicLink()||!I.isFile())return;let N=En(T);return Ur(N)?N:void 0}async function lc(A,T,I,N){if(await Wn(A,I,T),(await Wn(A,["git","status","--porcelain"],T)).stdout.trim()==="")return!1;return await Wn(A,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",N],T),await Wn(A,["git","push","origin","HEAD"],T),!0}function Mr(A,T){ng(A,T),rg(A,T)}function cc(A,T){if(T==="keep")return;throw Error(`Local Amp plugin ${A} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function ng(A,T){let I=Zm(A),N=yt(I);if(!N)return;if(!N.isSymbolicLink()&&N.isFile()&&Ur(En(I))){Hr(I);return}cc(I,T)}function rg(A,T){let I=Dt(A.home,".config","amp","plugins",cn),N=yt(I);if(!N)return;if(!N.isSymbolicLink()&&N.isDirectory()&&og(I)){Hr(I,{recursive:!0});return}cc(I,T)}function og(A){let T=Km(dn);if(Wm(A).join("\x00")!==T)return!1;let I=Dt(A,T),N=yt(I);return!!N&&!N.isSymbolicLink()&&N.isFile()&&Ur(En(I))}function ig(A){let T=d(A);if(!nc(T))return"";let I=rc(En(T,"utf-8"));if(!I||typeof I!=="object"||Array.isArray(I))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(C(I,A.home))};
`}async function dc(A,T=eg(),I=wi){let N=Buffer.concat([En(T),Buffer.from(ig(A),"utf-8")]),J=await oc(I);return ic(I,A,async(K)=>{let ne=`${J}/${cn}`,oe=ac(K,"overwrite"),de=sc(K,Pn,"overwrite");if(oe?.equals(N)&&!de)return Mr(A,"fail"),{path:ne,alreadyInstalled:!0};if(zm(Dt(K,cn),{recursive:!0}),kt(Dt(K,dn),N),de)Hr(Dt(K,Pn));let ue=await lc(I,K,["git","add","--",dn,...de?[Pn]:[]],`chore: update cc-safety-net plugin to v${wt()}`);return Mr(A,"fail"),{path:ne,alreadyInstalled:!ue}})}async function uc(A,T=wi){let I=await oc(T);return ic(T,A,async(N)=>{let J=ac(N,"remove"),K=tg(N),ne=`${I}/${K&&!J?Pn:cn}`;if(!J&&!K)return Mr(A,"keep"),{path:ne,alreadyInstalled:!1};return await lc(T,N,["git","rm","--",...J?[dn]:[],...K?[Pn]:[]],`chore: remove cc-safety-net plugin v${wt()}`),Mr(A,"keep"),{path:ne,alreadyInstalled:!0}})}import{existsSync as pc,mkdirSync as sg,readFileSync as ag}from"node:fs";import{dirname as lg}from"node:path";var Ci=jt["antigravity-cli"],un="cc-safety-net";function pn(A){return Boolean(A)&&typeof A==="object"&&!Array.isArray(A)}function Br(){return{PreToolUse:[{hooks:[{type:"command",command:Ci,timeout:30}]}]}}function fc(A){try{let T=JSON.parse(ag(A,"utf-8"));if(!T||typeof T!=="object"||Array.isArray(T))throw Error("Antigravity hooks config must be a JSON object");return T}catch(T){if(T instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${A}: ${T.message}`);throw T}}function mc(A){let T=A[un];if(T===void 0){let N=Br();return A[un]=N,{definition:N,preToolUse:N.PreToolUse??[]}}if(!pn(T))throw Error(`Antigravity hooks config entry "${un}" must be an object`);let I=Array.isArray(T.PreToolUse)?T.PreToolUse:[];return T.PreToolUse=I,{definition:T,preToolUse:I}}function gc(A){if(!Array.isArray(A.PreToolUse))return!1;return A.PreToolUse.some((T)=>pn(T)&&Array.isArray(T.hooks)&&T.hooks.some((I)=>pn(I)&&I.command===Ci))}function cg(A){return Object.values(A).some((T)=>pn(T)&&T.enabled!==!1&&gc(T))}function dg(A){if(A[un]===void 0)return!1;let T=mc(A);if(T.definition.enabled!==!1||!gc(T.definition))return!1;return T.definition.enabled=!0,!0}function ug(A){if(A[un]===void 0){A[un]=Br();return}let T=mc(A);T.definition.enabled=!0,T.preToolUse.push(Br().PreToolUse?.[0]??{hooks:[]})}function pg(A){let T=!1;for(let I of Object.values(A)){if(!pn(I)||!Array.isArray(I.PreToolUse))continue;I.PreToolUse=I.PreToolUse.flatMap((N)=>{if(!pn(N)||!Array.isArray(N.hooks))return[N];let J=N.hooks.filter((K)=>!pn(K)||K.command!==Ci);if(J.length!==N.hooks.length)T=!0;return J.length===0?[]:[{...N,hooks:J}]})}return T}function Gr(A,T){kt(A,`${JSON.stringify(T,null,2)}
`)}function hc(A){let T=In(A.home);if(sg(lg(T),{recursive:!0}),!pc(T))return Gr(T,{[un]:Br()}),{path:T,alreadyInstalled:!1};let I=fc(T);if(cg(I))return{path:T,alreadyInstalled:!0};if(dg(I))return Gr(T,I),{path:T,alreadyInstalled:!1};return ug(I),Gr(T,I),{path:T,alreadyInstalled:!1}}function yc(A){let T=In(A.home);if(!pc(T))return{path:T,alreadyInstalled:!1};let I=fc(T);if(!pg(I))return{path:T,alreadyInstalled:!1};return Gr(T,I),{path:T,alreadyInstalled:!0}}import{existsSync as Ri,readlinkSync as gg}from"node:fs";import{join as Zt}from"node:path";import{spawn as fg}from"node:child_process";var Ht=Ot.map((A)=>({target:A.id,flag:A.flag,label:Lt(A.id),probeCommand:A.probeCommand}));function Si(A){let T=new Set(A);return Ht.map((I)=>I.target).filter((I)=>T.has(I))}async function vc(A,T){for(let I of A)await T(I)}var mg=5000;function Kn(A,T=mg){return new Promise((I)=>{let N=nn([...A],process.env),J=fg(N.cmd,N.args,{env:process.env,stdio:"ignore"}),K=!1,ne=(de)=>{if(K)return;K=!0,clearTimeout(oe),I(de)},oe=setTimeout(()=>{J.kill(),ne(!1)},T);J.on("error",()=>ne(!1)),J.on("close",(de)=>ne(de===0))})}function bc(A=Kn,T={}){let I=new Set(T.configuredTargets??[]);return Promise.all(Ht.map(async(N)=>({target:N.target,flag:N.flag,label:N.label,...wc(T.action,await A(N.probeCommand),I.has(N.target))})))}function Lc(A,T){let I=new Set(T.configuredTargets??[]);return A.map((N)=>({...N,...wc(T.action,N.available,I.has(N.target))}))}function wc(A,T,I){if(A==="uninstall")return I?{available:!0}:{available:!1,unavailableReason:"not installed"};if(A==="install"&&I)return{available:!1,unavailableReason:"already installed"};if(!T)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}var Qt="cc-safety-net",Sc=["npx","-y","@deepseek-ai/dsh"],kc="DeepSeek Harness",xc=["@deepseek-ai","dsh-desktop"],Rc="Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.",Pc=(A)=>`DeepSeek Harness Desktop is not in its default location, so ${A} ${Qt} from its Plugins page.`;function Pi(A,T){let I=T.platform??process.platform,N=Ri(Zt(Oo(A),"desktop","package.json")),J=I==="darwin"?[Zt(A.home,"Applications"),T.systemApplications??"/Applications"].map((K)=>Zt(K,`${kc}.app`,"Contents","Resources","runtime","cli","bin","dsh")):I==="win32"?[Zt(A.env.get("LOCALAPPDATA")||Zt(A.home,"AppData","Local"),"Programs",kc,"resources","runtime","cli","bin","dsh.cmd")]:[];return{profile:N,cli:N?J.find((K)=>Ri(K)):void 0}}function Ec(A,T=process.platform){if(T==="win32")return Ri(Zt(A.env.get("APPDATA")||Zt(A.home,"AppData","Roaming"),...xc,"lockfile"));let I=hg(Zt(A.home,"Library","Application Support",...xc,"SingletonLock")),N=Number(/-(\d+)$/.exec(I??"")?.[1]);return Number.isInteger(N)&&N>0&&yg(N)}function hg(A){try{return gg(A)}catch{return}}function yg(A){try{return process.kill(A,0),!0}catch(T){return T.code==="EPERM"}}async function Dc(A,T={}){let I=Pi(A,T);if(I.cli&&Ec(A,T.platform))throw Error(Rc);let N=!I.cli||await(T.probe??Kn)(uo),J=[...I.cli?[{profile:"desktop",label:"Desktop",dsh:[I.cli]}]:[],...N?[{profile:"web",label:"web",dsh:Sc}]:[]];return{commands:J.map((K)=>[...K.dsh,"plugin","--profile",K.profile,"add",Qt]),afterInstall:async()=>{let K=new Set(No(A).filter((oe)=>oe.enabled).map((oe)=>oe.name)),ne=J.filter((oe)=>!K.has(oe.profile));if(ne.length>0)throw Error(`DeepSeek Harness installed ${Qt} in the ${Cc(ne)} but did not enable it. Enable it from the Plugins page, or update ${Qt} if your registry served a release without DeepSeek Harness support.`)},message:[`Added ${Qt} to the DeepSeek Harness ${Cc(J)}.`,...I.profile&&!I.cli?[Pc("add")]:[]].join(`
`)}}function Cc(A){return`${A.map((T)=>T.label).join(" and ")} profile${A.length>1?"s":""}`}function Ac(A,T={}){let I=new Set(No(A).map((J)=>J.name));if(!I.has("desktop")&&!I.has("web"))throw Error(`${Qt} is not installed in the DeepSeek Harness web or Desktop profile`);let N=I.has("desktop")?Pi(A,T).cli:void 0;if(I.has("desktop")&&!N)throw Error(Pc("remove"));if(N&&Ec(A,T.platform))throw Error(Rc);return[...N?[[N,"plugin","--profile","desktop","remove",Qt]]:[],...I.has("web")?[[...Sc,"plugin","--profile","web","remove",Qt]]:[]]}function _c(A,T,I={}){let N=Pi(T,I).cli!==void 0;return A.map((J)=>J.target==="deepseek-harness"&&N?{...J,available:!0,unavailableReason:void 0}:J)}import{existsSync as vg,readdirSync as bg,rmSync as Lg}from"node:fs";import{join as wg}from"node:path";function Tc(A,T=process.platform,I){if(!vg(A))return;let N=T==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);bg(A).filter((J)=>J!==I&&N.test(J)).forEach((J)=>{Lg(wg(A,J),{recursive:!0,force:!0})})}import{existsSync as Ic,readdirSync as kg,rmSync as xg}from"node:fs";import{join as Dn}from"node:path";function qr(A,T=process.platform){let I=Dn(A.env.get("npm_config_cache")||(T==="win32"?Dn(A.env.get("LOCALAPPDATA")||Dn(A.home,"AppData","Local"),"npm-cache"):Dn(A.home,".npm")),"_npx");if(!Ic(I))return;kg(I).filter((N)=>Ic(Dn(I,N,"node_modules","cc-safety-net"))).forEach((N)=>{xg(Dn(I,N),{recursive:!0,force:!0})})}import{existsSync as Mc,mkdirSync as Sg,readFileSync as Hc}from"node:fs";import{dirname as Rg,join as jc}from"node:path";function Cg(A,T){if(A[T]!=="#")return T;let I=A.indexOf(`
`,T+1);return I===-1?A.length:I+1}function Ei(A,T,I){let N=new RegExp(`^(\\s*)${T}\\s*=\\s*\\[`),J=0;for(let K of A.split(`
`)){if(/^\s*\[/.test(K))return;let ne=N.exec(K);if(ne){let oe=J+ne[0].lastIndexOf("[");return{start:oe,end:Do(A,oe,{skipComment:Cg,...I})}}J+=K.length+1}return}function $c(A,T,I){let N=A.slice(0,T.end).trimEnd(),J=fa(A,T.end),K=J===""?"     ":`${J}  `,ne=!N.endsWith("[")&&!N.endsWith(",");return`${N}${ne?",":""}
${K}${I}${A.slice(T.end)}`}function Oc(A,T,I){let N=A.indexOf(I,T.start);if(N===-1||N>T.end)return A;return xr(A,{start:N,end:N+I.length})}function Nc(A,T){let I=new RegExp(`^\\s*${T}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),N=A.split(`
`),J=N.findIndex((oe)=>/^\s*\[/.test(oe)),K=J===-1?N:N.slice(0,J),ne=J===-1?[]:N.slice(J);return[...K.filter((oe)=>!I.test(oe)),...ne].join(`
`)}function Fc(A,T,I){let N=new RegExp(`^\\s*\\[\\[${T}]]\\s*$`,"m");return A.split(/(?=^\s*\[)/m).filter((J)=>!N.test(J)||!J.includes(I)).join("").trimEnd()}var Yn=jt["kimi-code"],Di=`[[hooks]]
event = "PreToolUse"
command = "${Yn}"`,Uc=`{ event = "PreToolUse", command = "${Yn}" }`,Gc={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function Bc(A){return jc(A.env.get("KIMI_CODE_HOME")??jc(A.home,".kimi-code"),"config.toml")}function Pg(A){let T=Ei(A,"hooks",Gc);if(T&&A.slice(T.start+1,T.end).trim())return $c(A,T,Uc);let I=Nc(A,"hooks").trimEnd();if(I==="")return`${Di}
`;return`${I}

${Di}
`}function qc(A){let T=Bc(A);if(Sg(Rg(T),{recursive:!0}),!Mc(T))return kt(T,`${Di}
`),{path:T,alreadyInstalled:!1};let I=Hc(T,"utf-8");if(I.includes(Yn))return{path:T,alreadyInstalled:!0};return kt(T,Pg(I)),{path:T,alreadyInstalled:!1}}function Vc(A){let T=Bc(A);if(!Mc(T))return{path:T,alreadyInstalled:!1};let I=Hc(T,"utf-8");if(!I.includes(Yn))return{path:T,alreadyInstalled:!1};let N=Ei(I,"hooks",Gc),J=N?Oc(I,N,Uc):`${Fc(I,"hooks",Yn)}
`;return kt(T,J),{path:T,alreadyInstalled:!0}}var Ai="safety-net@cc-marketplace",zc=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),Jc=new Set(["antigravity-cli","cursor","grok-build","hermes-agent","kimi-code"]);function _i(A){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(A??"")}function Zc(A){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(A??"")}function Eg(A){return/^Marketplace `cc-marketplace`\s*$/m.test(A??"")}var Qc={"claude-code":{installCommands:(A)=>{let T=kr(A,"cc-safety-net@cc-marketplace");return{commands:[...T?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...Po(A).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:kr(A,Ai)?[["claude","plugin","uninstall",Ai]]:[],update:T}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(A,T)=>{let I=T??await St(["codex","plugin","list"]),N=Zc(I);return{commands:[N||Eg(I)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:_i(I)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:N}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:ca},"copilot-cli":{installCommands:async()=>{let A=await St(["copilot","plugin","list"]),T=[...La(A)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...wa(A)?[["copilot","plugin","uninstall",ya]]:[]];if(va(A))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",Ft]],cleanupCommands:T,update:!0};return{commands:[ba(await St(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",Ft]],cleanupCommands:T}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(A)=>{let T=Mo(A);if(T.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(T.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:Zo,installCommands:(A)=>{let T=!zr(Vr(Gn(A),Tt));return{commands:pl(),afterInstall:()=>fl(T)}},uninstallCommands:[["openclaw","plugins","uninstall",vt,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{installCommands:xl},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]},"deepseek-harness":{installCommands:(A)=>Dc(A),uninstallCommands:(A)=>Ac(A)}};function ed(A,T=(I)=>I){try{let I=JSON.parse(T(Xc(A,"utf-8")));if(!I||typeof I!=="object"||Array.isArray(I))throw Error(`Settings file ${A} must be a JSON object`);return I}catch(I){if(I instanceof SyntaxError)throw Error(`Failed to parse ${A}: ${I.message}`);throw I}}function Dg(A){let T=Vr(On(A),"settings.json");if(!zr(T))return;let I=ed(T,_t),N=I.enabledPlugins;if(!N||typeof N!=="object"||Array.isArray(N))return;if(N[Ft]!==!1)return;let J=Xc(T,"utf-8"),K=J.replace(new RegExp(`("${Ft}"\\s*:\\s*)false`),"$1true");return N[Ft]=!0,kt(T,K!==J?K:`${JSON.stringify(I,null,2)}
`),`Enabled ${Ft} plugin in ${T}`}function Ag(A){let T=li(A);if(!zr(T))return;let I=ed(T);if(!Array.isArray(I.packages))return;let N=I.packages.find((J)=>!!J&&typeof J==="object"&&!Array.isArray(J)&&ci(J.source)&&("extensions"in J));if(!N)return;return delete N.extensions,kt(T,`${JSON.stringify(I,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${T}`}function Wc(A,T){let I=xt({label:T,booleans:Object.fromEntries(Ht.map((K)=>[K.target,[K.flag]]))},A),N=I.errors[0];if(N)throw Error(N);let J=Ht.filter((K)=>I.flags[K.target]).map((K)=>K.target);if(J.length!==1)throw Error(`Choose exactly one ${T} target: ${Ht.map((K)=>K.flag).join(", ")}`);return J[0]}async function td(A,T=vn){let[I,N,J]=await Promise.all([T(["amp","plugins","list"],30000),T(["codex","plugin","list"],30000),T(["copilot","--binary-version"])]);return{codexPluginListOutput:N,hooks:Sn(A,process.cwd(),{ampPluginListOutput:I,codexPluginListOutput:N,copilotCliVersion:J})}}async function _g(A,T,I=vn){let N=await td(A,I);return N.hooks.filter((J)=>T==="install"?J.configured:J.detected||J.inspectionStatus==="not-inspected").filter((J)=>J.platform!=="codex"||!_i(N.codexPluginListOutput)||Zc(N.codexPluginListOutput)).map((J)=>J.platform)}function Tg(A,T,I,N){if(I.length>0)return{finish:async()=>[Wc(I,T)]};if(!N.selectTargets&&!bi(N.input,N.output))return{finish:async()=>[Wc(I,T)]};let J=N.detectConfiguredTargets??(()=>_g(A,T,N.fetchVersion)),K=Promise.all([bc(N.probeTargets).then((ne)=>_c(ne,A)),J()]);return{ready:K,finish:async()=>{let[ne,oe]=await K,de=Lc(ne,{action:T,configuredTargets:oe}),ue=N.selectTargets?await N.selectTargets(T,Yc(T,de)):await tc(T,Yc(T,de),{input:N.input,output:N.output});if(ue==="update")return ue;if(!ue||ue.length===0)return null;return Si(ue)}}}async function Ig(A,T,I=!1,N){let J=Qc[A];J.beforeInstall?.(T);let K=typeof J.installCommands==="function"?await J.installCommands(T,N):{commands:J.installCommands};return await Yo(K.commands),await sl(K.cleanupCommands??[]),await K.afterInstall?.(),[`${K.update||I?"Updated":"Installed"} ${Lt(A)} integration`,K.message??J.postInstallMessage].filter(Boolean).join(`
`)}async function $g(A,T){let I=Qc[A];if(!I.uninstallCommands)throw Error(`${Lt(A)} uninstall is not supported`);return await Yo(typeof I.uninstallCommands==="function"?I.uninstallCommands(T):I.uninstallCommands),`Uninstalled ${Lt(A)} integration`}function Og(A){let T=Pl(A);return T.alreadyInstalled?`Uninstalled OpenCode plugin from ${T.path}`:`OpenCode plugin not installed in ${T.path}`}var nd={"antigravity-cli":{install:hc,uninstall:yc},cursor:{install:_a,uninstall:Ta},"grok-build":{install:qa,uninstall:Va},"kimi-code":{install:qc,uninstall:Vc}};function Ng(A,T,I,N=!1){if(A==="install"&&!N)qr(I);let J=nd[T][A](I),K=Lt(T),ne=A!=="install"?"Uninstalled":N?"Updated":"Installed";return A==="install"&&J.alreadyInstalled?N?`${K} hook up to date in ${J.path}`:`${K} hook already installed in ${J.path}`:A==="uninstall"&&!J.alreadyInstalled?`${K} hook not installed in ${J.path}`:`${ne} ${K} hook ${A==="install"?"in":"from"} ${J.path}`}var rd={amp:{install:dc,uninstall:uc,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:Ya,uninstall:Xa,afterInstall:async(A)=>{let T=Jo(A);return await St(["hermes","plugins","enable",$t,"--no-allow-tool-override"]),!T},beforeUninstall:async(A)=>{zo(A);try{await St(["hermes","plugins","disable",$t])}catch(T){console.warn(`${T instanceof Error?T.message:String(T)}
Removing the plugin files anyway; ${$t} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Fg(A,T,I,N=!1){let J=rd[T];if(A==="uninstall")await J.beforeUninstall?.(I);let K=A==="install"?await J.install(I):await J.uninstall(I),ne=A==="install"&&await J.afterInstall?.(I),oe=Lt(T),de=!ne&&(A==="install"&&K.alreadyInstalled||A==="uninstall"&&!K.alreadyInstalled);return[de?A==="install"?`${oe} plugin ${N?"up to date":"already installed"} at ${K.path}`:`${oe} plugin not installed at ${K.path}`:`${A!=="install"?"Uninstalled":N?"Updated":"Installed"} ${oe} plugin ${A==="install"?"at":"from"} ${K.path}`,de?void 0:J.restartNote].filter(Boolean).join(`
`)}var jg={"copilot-cli":{afterInstall:Dg},"hermes-agent":{beforeInstall:(A,T)=>{if(!T)qr(A)}},openclaw:{beforeUninstall:Zo},pi:{afterInstall:Ag}};function Mg(A){return A in nd}function Hg(A){return A in rd}var Kc=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function Ug(A){if(Un({environment:A,cwd:process.cwd()}).status!=="configured")return Kc;return[Kc,"",ot.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function Yc(A,T){return T.map((I)=>A==="install"&&I.target==="kimi-code"&&I.unavailableReason==="already installed"?{...I,available:!0,unavailableReason:void 0,label:`${I.label} (global hook installed)`}:I)}function Gg(A,T){if(A.selectKimiInstallMethod)return A.selectKimiInstallMethod();if(!bi(A.input,A.output))return Promise.resolve("global-hook");return ec({input:A.input,output:A.output,globalHookInstalled:Un({environment:T,cwd:process.cwd()}).status==="configured"})}async function od(A,T,I,N=!1,J){let K=jg[T];if(A==="install")K?.beforeInstall?.(I,N);if(A==="uninstall")K?.beforeUninstall?.(I);if(Mg(T))return Ng(A,T,I,N);if(Hg(T))return Fg(A,T,I,N);if(A==="uninstall")return T==="opencode"?Og(I):$g(T,I);return[await Ig(T,I,N,J),await K?.afterInstall?.(I)].filter(Boolean).join(`
`)}function Bg(A){let T=xt({label:"update"},A).errors[0];if(T)throw Error(T)}async function qg(A,T=vn){let I=await td(A,T),N=Vr(On(A),"installed-plugins");return{targets:Si([...I.hooks.filter((K)=>K.platform!=="copilot-cli"&&K.detected).map((K)=>K.platform),...[Cr,ha,ga].flatMap((K)=>zr(Vr(N,...K))?["copilot-cli"]:[]),...kr(A,Ai)?["claude-code"]:[],..._i(I.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:I.codexPluginListOutput}}async function Vg(A){let T=c(),I=A.output??process.stdout,N=(A.scriptPath??process.argv[1]??"").split(/[\\/]/),J=N.find((_e)=>/^bunx-\d+-/.test(_e)),K=J!==void 0||N.includes("_npx")?null:(A.checkLatestVersion??Kt)(),ne=async()=>{let _e=K&&await K;if(_e?.updateAvailable)I.write(`
Update available: cc-safety-net ${_e.currentVersion} → ${_e.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},oe=qg(T,A.fetchVersion??vn).then(async(_e)=>{let we=new Set(_e.targets);return{targets:_e.targets,codexPluginListOutput:_e.codexPluginListOutput,available:new Map(await Promise.all(Ht.filter((Ne)=>we.has(Ne.target)&&zc.has(Ne.target)).map(async(Ne)=>[Ne.target,await Kn(Ne.probeCommand)])))}}),de=await Tn(A.showBanner??!0,()=>({ready:oe,finish:()=>oe}),()=>_n({input:A.input??process.stdin,output:I}),{loadingMessage:"Checking installed integrations…",output:I}),ue=await Promise.resolve().then(()=>(Tc(T.tmpdir,process.platform,J),null)).catch((_e)=>Xn(_e));if(de.targets.length===0){if(I.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),ue!==null)console.error(ue);return await ne(),ue===null?0:1}let ve=de.targets.some((_e)=>Jc.has(_e))?await Promise.resolve().then(()=>(qr(T),null)).catch((_e)=>Xn(_e)):null,xe=await vr(Promise.all(de.targets.map((_e)=>{if(zc.has(_e)&&!de.available.get(_e))return Promise.resolve({message:`${Lt(_e)} not found; skipped`,failed:!1});if(ve!==null&&Jc.has(_e))return Promise.resolve({message:ve,failed:!0});return od("install",_e,T,!0,de.codexPluginListOutput).then((we)=>({message:we,failed:!1}),(we)=>({message:Xn(we),failed:!0}))})),{loadingMessage:`Updating ${de.targets.length} integration${de.targets.length===1?"":"s"}…`,output:I}),Se=ue===null?xe:[...xe,{message:ue,failed:!0}];return Se.forEach((_e)=>_e.failed?console.error(_e.message):I.write(`${_e.message}
`)),await ne(),Se.some((_e)=>_e.failed)?1:0}function Ti(A,T={}){return Promise.resolve().then(()=>Bg(A)).then(()=>Vg(T)).catch((I)=>(console.error(Xn(I)),1))}async function Zn(A,T,I={}){try{let N=c(),J=await Tn(!0,()=>Tg(N,A,T,I),()=>_n({input:I.input??process.stdin,output:I.output??process.stdout}),{loadingMessage:A==="install"?"Checking available integrations…":"Checking installed integrations…",output:I.output??process.stdout});if(!J)return(I.output??process.stdout).write(`Cancelled: nothing was ${A}ed.
`),0;if(J==="update")return(I.runUpdate??(()=>Ti([],{fetchVersion:I.fetchVersion,input:I.input,output:I.output,showBanner:!1})))();let K=I.output??process.stdout;return await vc(J,async(ne)=>{if(ne==="kimi-code"&&A==="install"){let de=await Gg(I,N);if(de===null){K.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(de==="plugin"){K.write(`${Ug(N)}
`);return}}let oe=await vr(od(A,ne,N),{loadingMessage:`${A==="install"?"Installing":"Uninstalling"} ${Lt(ne)} integration…`,output:K});K.write(`${oe}
`)}),0}catch(N){return console.error(Xn(N)),1}}function Xn(A){let T=A instanceof Error?A.message:String(A),I=typeof A==="object"&&A!==null&&"code"in A?A.code:null;if(I==="EACCES"||I==="EPERM")return`${T}
Check file permissions for the target config file and parent directory.`;if(I==="ENOENT")return`${T}
Check that the target config path and parent directory exist.`;if(I==="ENOTDIR")return`${T}
Check that every parent path component is a directory.`;return T}import{mkdirSync as Xg}from"node:fs";import{dirname as Zg}from"node:path";import{createInterface as Qg}from"node:readline";import{existsSync as sd,readFileSync as zg}from"node:fs";function fn(A,T){let I=et(A,T);return{policy:I.policy,errors:ae(Ze(I.issues,Qe,(N)=>N.kind==="custom")," "," ")}}function Qn(A,T){return fn(A,T).errors}function id(A,T){return{"safety.level":A.safety.level,...Ii("safety.overrides",A.safety.overrides),"workflow.worktree_mode":String(A.workflow.worktree_mode),"destructive_command_protection.enabled":String(A.destructive_command_protection.enabled),...Ii("destructive_command_protection.overrides",A.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":$i(A.destructive_command_protection.allow_paths),"secret_protection.enabled":String(A.secret_protection.enabled),...Ii("secret_protection.overrides",A.secret_protection.overrides),"secret_protection.deny_paths":$i(A.secret_protection.deny_paths),"secret_protection.allow_paths":$i(A.secret_protection.allow_paths),...T?{"audit.retention_days":String(A.audit.retention_days)}:{}}}function Jr(A,T,I){let N=id(A,I),J=id(T,I);return[...new Set([...Object.keys(N),...Object.keys(J)])].flatMap((K)=>N[K]===J[K]?[]:[{field:K,before:N[K],after:J[K]}])}function er(A,T){let I=d(A,T);if(!sd(I))return{baseline:C(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,A.home),diagnostics:[]};let N=mn(I),J=fn(N.value,A.home);return{baseline:J.policy,diagnostics:N.errors.length>0?N.errors:J.errors}}function mn(A){if(!sd(A))return{errors:[`${A}: file not found`]};try{return{value:JSON.parse(zg(A,"utf-8")),errors:[]}}catch(T){let I=T instanceof Error?T.message:String(T);return{errors:[`${A}: ${T instanceof SyntaxError?`Invalid JSON: ${I}`:I}`]}}}function Wr(A,T){let I=Jg(A)?A:{};return{version:T.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((N)=>I[N]!==void 0).map((N)=>[N,I[N]]))}}function Ii(A,T){return Object.fromEntries(Object.entries(T).flatMap(([I,N])=>N===void 0?[]:[[`${A}.${I}`,String(N)]]))}function $i(A){return A.length===0?"(none)":A.join(", ")}function Jg(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}import{chmodSync as Wg,existsSync as ad,mkdirSync as Kg,readFileSync as ld}from"node:fs";import{dirname as Yg}from"node:path";function cd(A,T={}){let I=d(A,T);if(!ad(I))return{path:I,exists:!1,raw:"",policy:z(),errors:[]};let N=ld(I,"utf-8");if(!N.trim())return{path:I,exists:!0,raw:N,policy:z(),errors:["Config file is empty"]};try{let J=fn(JSON.parse(N),A.home);return{path:I,exists:!0,raw:N,policy:J.policy,errors:J.errors}}catch(J){return{path:I,exists:!0,raw:N,policy:z(),errors:[`Invalid JSON: ${J instanceof Error?J.message:String(J)}`]}}}function zt(A,T,I={}){let N=d(A,I),J=fn(T,A.home);if(J.errors.length>0)return{path:N,policy:z(),errors:J.errors};let K=J.policy;return Kg(Yg(N),{recursive:!0,mode:448}),g(ie(N),`${JSON.stringify(K,null,2)}
`,384),Wg(N,384),{path:N,policy:K,errors:[]}}function dd(A,T){let I=fn(T,A.home);if(I.errors.length>0)return{errors:I.errors};return{preview:De(I.policy,A.env),errors:[]}}function ud(A,T={}){let I=d(A,T);if(!ad(I))return zt(A,ee,T);let N=ld(I,"utf-8");if(!N.trim())return zt(A,ee,T);try{return zt(A,C(JSON.parse(N),A.home),T)}catch{return zt(A,ee,T)}}var pd=new Set(["check","apply"]),fd="(unset)";async function gd(A,T,I={}){let N=xt({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},T),J=N.positionals[0],K=[...N.errors,...J&&!pd.has(J)?[`Unknown policy subcommand: ${J}`]:[],...J&&pd.has(J)&&!N.positionals[1]?[`policy ${J} requires a file`]:[],...N.positionals.slice(2).map((we)=>`Unexpected policy argument: ${we}`)];if(K.length>0){for(let we of K)console.error(we);return 1}let ne=N.positionals[1];if(!J||!ne)return Rn(ar,console.error),1;let oe=N.flags.global?d(A):b(I.cwd??process.cwd()),de=mn(ne),ue=[...de.errors,...Qn(de.value,A.home).map((we)=>`${ne}: ${we}`),...!N.flags.global&&nh(de.value)&&de.value.audit!==void 0?[`${ne}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(ue.length>0){for(let we of ue)console.error(we);return 1}let ve=C(de.value,A.home);if(console.log(`Scope: ${N.flags.global?"user":"project"} (${oe})`),console.log(`Proposal: ${ne}`),N.flags.global)md(C(mn(oe).value,A.home),ve,!0);if(!N.flags.global){let we=er(A).baseline;console.log("Effective policy (user + project merged):"),md(Q(we,le(mn(oe).value,A.home).policy).policy,Q(we,le(de.value,A.home).policy).policy,!1)}if(J==="check")return 0;let xe=I.input??process.stdin,Se=I.output??process.stdout;if(!xe.isTTY||!Se.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ne}${N.flags.global?" --global":""}`),1;if(!await eh(`Apply this policy to ${oe}? [y/N] `,xe,Se))return console.log("Cancelled; nothing was written."),0;return th(A,oe,de.value,ve,N.flags.global),console.log(`Policy applied: ${oe}`),0}function eh(A,T,I){let N=Qg({input:T,output:I,terminal:!1});return new Promise((J)=>{N.once("close",()=>J(!1)),N.question(A,(K)=>{J(/^y(es)?$/i.test(K.trim())),N.close()})})}function th(A,T,I,N,J){if(J){zt(A,N);return}Xg(Zg(T),{recursive:!0}),Pt(T,Wr(I,N))}function md(A,T,I){let N=Jr(A,T,I);if(N.length===0){console.log("No changes.");return}console.log(`Changes (${N.length}):`);for(let J of N)console.log(`  ${J.field}: ${J.before??fd} -> ${J.after??fd}`)}function nh(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}import{join as gy}from"node:path";var hd="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- `exec`, `nice`, `nohup`, `setsid`, `stdbuf`, `time`, and `timeout` are built-in transparent wrappers and need no configuration. Configure only other wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function Kr(A,T){if(!A.ok){wd(A);return}bd(A,T)}function vd(A,T,I){if(A.ok)console.log(I);if(!A.add){Kr(A,`Added rulebook source: ${T}`);return}if(!A.ok){wd(A);return}if(A.add.added.length>0)console.log(`Added ${A.add.added.length} ${A.add.added.length===1?"rulebook":"rulebooks"} from ${A.add.source} at ${A.add.ref}:`),A.add.added.forEach((N)=>{console.log(`  - ${N}`)});if(A.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${A.add.source} at ${A.add.ref}: ${A.add.alreadyConfigured.join(", ")}`);if(A.add.commits.length>0)console.log(`Vendored at ${A.add.commits.map((N)=>N.slice(0,7)).join(", ")}.`);bd(A,"Rule config updated.")}function bd(A,T){for(let I of A.changes??[])console.log(I);console.log(T),console.log(""),rh(A.entries)}function rh(A){if(A.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${A.length}):`);for(let T of A)console.log(`  - ${T.name} ${T.version} (${oh(T.ruleCount)})`),console.log(`    Source: ${T.spec}`)}function oh(A){return`${A} ${A===1?"rule":"rules"}`}function Ld(A){gn("Active sources",A.rulebooks,(T)=>[`[${T.source}] ${T.name} ${T.version}`,`  Source: ${T.spec}`]),gn("Active rules",A.rules,(T)=>[`[${sh(A,T.name)}] ${T.name}`,...ih(T),`  Reason: ${T.reason}`]),gn("Disabled rules",yd(A,"off"),(T)=>[T.key]),gn("Reason overrides",yd(A,"reason"),(T)=>[T.key,`  Reason: ${T.value.reason}`]),gn("Transparent wrappers",A.transparent_wrappers,(T)=>[T]),gn("Issues",A.errors,(T)=>[T]),gn("Warnings",A.warnings,(T)=>[T])}function gn(A,T,I){if(T.length===0){console.log(`${A}: (none)`);return}console.log(`${A} (${T.length}):`);for(let N of T){let[J,...K]=I(N);console.log(`  - ${J}`);for(let ne of K)console.log(`    ${ne}`)}}function ih(A){if(!A.match)return[`  Command: ${A.subcommand?`${A.command} ${A.subcommand}`:A.command}`,`  Block args: ${A.block_args.join(", ")}`];return[`  Command: ${[A.command,...A.match.command_path].join(" ")}`,...A.match.any_args?[`  Any args: ${A.match.any_args.join(", ")}`]:[],...A.match.exclude_args?[`  Exclude args: ${A.match.exclude_args.join(", ")}`]:[]]}function sh(A,T){return A.rulebooks.find((I)=>I.rules.includes(T))?.source??"project"}function yd(A,T){return Object.entries({...A.userConfig?.overrides,...A.projectConfig?.overrides}).filter((I)=>{if(T==="off")return I[1]==="off";return!!I[1]&&typeof I[1]==="object"}).map(([I,N])=>({key:I,value:N}))}function wd(A){for(let T of A.errors)console.error(T)}import{dirname as qd,join as ro}from"node:path";import{join as Mi,resolve as vh}from"node:path";function Oi(A){let T=m(A);if(T.errors.length>0)return{ok:!1,result:{ok:!1,errors:T.errors,entries:[]}};return{ok:!0,config:T.config??lt}}function kd(A){Pt(A,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function xd(A){Pt(A,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Qr}from"node:path";var ah="custom.";function Yr(A){if(A.rulebook_version!==2)return[];let T=A.rules.map((I)=>({name:I.name,command:I.command,block_args:[],match:I.match,reason:I.reason,intent:I.intent}));return(A.tests??[]).flatMap((I,N)=>{let J=Ni(h(I.command));if(J.length===0)return[`tests[${N}]: could not parse fixture command: ${I.command}`];let K=J.reduce((ne,oe)=>ne??P(oe,T)?.id.slice(ah.length),void 0);if(I.expect==="blocked"){if(K===I.rule)return[];let ne=K?`"${K}" matched first`:"no rule matched";return[`tests[${N}]: expected "${I.rule}" to block "${I.command}" but ${ne}`]}return K?[`tests[${N}]: expected "${I.command}" to be allowed but "${K}" matched`]:[]})}function Ni(A){return A.nodes.flatMap((T)=>{if(T.kind==="group"||T.kind==="function")return Ni(T.body);if(T.kind!=="command")return[];let I=be(te(T.dialect,T.words)).words.map(t);return[...I.length>0?[I]:[],...T.nested.flatMap((N)=>Ni(N))]})}var Xr=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function Zr(A={}){return{requests:0,responseBytes:0,maxRequests:A.maxRequests??Xr.maxRequests,maxResponseBytes:A.maxResponseBytes??Xr.maxResponseBytes}}function Jt(A){return{controller:new AbortController,budget:Zr(),resolveUrl:A}}function Cd(A){return A instanceof Error&&A.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function Sd(A){if(A.requests>=A.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");A.requests++}function Rd(A,T){if(T>A.maxResponseBytes-A.responseBytes)throw A.responseBytes+=T,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");A.responseBytes+=T}var Dd=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function Pd(A,T,I=v(Qr(Qr(T)),"rules policy"),N=Jt()){if(S(A))return uh(A,N);return dh(A,T,I)}async function Ad(A,T,I,N,J,K){if(!S(A))return Pd(A,T,I,N);let ne=J?null:lh(A,T,I);if(ne)return ne;if(!J&&!K)throw Error(`${A} is not vendored; run rule update ${A} to vendor it`);return Pd(A,T,I,N)}function lh(A,T,I=v(Qr(Qr(T)),"rules policy")){let N=O(A),J=D(T,N.name),K=n(i(I,J));if(K===null)return null;let ne=ce(Fi(K,`Invalid rulebook ${J}.`));if(ne.name!==N.name)throw Error(`rulebook name "${ne.name}" in ${J} must match "${N.name}"`);return{spec:A,rulebook:ne,content:K}}async function _d(A,T={}){if(!Y(A))throw Error(`Invalid GitHub repository source: ${A}`);let[I,N]=A.split("/");if(!I||!N)throw Error(`Invalid GitHub repository source: ${A}`);if(T.ref!==void 0&&!se(T.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${T.ref}`);let J=T.operation??Jt(),K=T.ref??await ch(I,N,A,J),ne=await Id(I,N,K,A,J),oe=await eo(`https://api.github.com/repos/${I}/${N}/git/trees/${ne}?recursive=1`,"tree",J),de=oe.response;if(!de.ok)throw Error(`Failed to inspect ${A}: GitHub tree returned ${de.status}`);let ue=JSON.parse(oe.content);if(!Array.isArray(ue?.tree))throw Error(`Failed to inspect ${A}: unexpected GitHub tree response`);let ve=ue.tree,xe=[...new Set(ve.flatMap((Se)=>{if(!Se||typeof Se!=="object")return[];let _e=Se;if(_e.type!=="blob"||typeof _e.path!=="string")return[];let we=_e.path.match(at);return we?.[1]?[we[1]]:[]}))].sort();if(xe.length===0)throw Error(`No rulebooks found in ${A} under ${me}/`);return{source:A,owner:I,repo:N,ref:K,commit:ne,names:xe}}async function ch(A,T,I,N){let J=await eo(`https://api.github.com/repos/${A}/${T}`,"metadata",N),K=J.response;if(!K.ok)throw Error(`Failed to inspect ${I}: GitHub returned ${K.status}`);let oe=JSON.parse(J.content)?.default_branch;if(typeof oe!=="string"||oe==="")throw Error(`Failed to inspect ${I}: missing default branch`);if(!se(oe))throw Error(`GitHub returned an invalid default branch: ${oe}`);return oe}function dh(A,T,I){ct(A);let N=D(T,A),J=n(i(I,N));if(J===null)throw Error(`Rulebook source not found: ${A}`);let K=Td(Fi(J,"Invalid local rulebook source."));if(K.name!==A)throw Error(`rulebook name "${K.name}" must match local source "${A}"`);return{spec:A,rulebook:K,content:J}}async function uh(A,T){let I=O(A),N=await Id(I.owner,I.repo,I.ref,A,T),J=await eo(`https://raw.githubusercontent.com/${I.owner}/${I.repo}/${N}/${I.path}`,"raw",T),K=J.response;if(!K.ok)throw Error(`Failed to fetch ${A}: GitHub raw returned ${K.status}`);let ne=J.content,oe=Td(Fi(ne,"Invalid GitHub rulebook response."));if(oe.name!==I.name)throw Error(`rulebook name "${oe.name}" must match GitHub source "${I.name}"`);return{spec:A,rulebook:oe,content:ne}}function Td(A){let T=ce(A),I=Yr(T);if(I.length>0)throw Error(I.join("; "));return T}function Fi(A,T){try{return JSON.parse(A)}catch{throw Error(T)}}async function Id(A,T,I,N,J){let K=await eo(`https://api.github.com/repos/${A}/${T}/commits/${encodeURIComponent(I)}`,"commit",J),ne=K.response;if(!ne.ok)throw Error(`Failed to resolve ${N}: GitHub returned ${ne.status}`);let oe=JSON.parse(K.content);if(typeof oe?.sha!=="string"||oe.sha==="")throw Error(`Failed to resolve commit for ${N}`);return oe.sha}async function ph(A,T,I={}){if(I.signal?.aborted)throw I.signal.reason;let N=I.budget??Zr(),J=new AbortController,K=()=>J.abort(I.signal?.reason);I.signal?.addEventListener("abort",K,{once:!0});let ne=!1,oe=setTimeout(()=>{if(J.signal.aborted)return;ne=!0,J.abort()},I.timeoutMs??Dd.timeoutMs);try{if(I.signal?.aborted)throw I.signal.reason;Sd(N);let de=await fetch(A,{signal:J.signal,redirect:"error"});if(!de.ok)return $d(de),{response:de,content:""};return{response:de,content:await fh(de,T,N,()=>J.abort())}}catch(de){if(ne)throw Error("GitHub request timed out",{cause:de});if(I.signal?.aborted)throw I.signal.reason;throw de}finally{clearTimeout(oe),I.signal?.removeEventListener("abort",K)}}function eo(A,T,I){return ph(I.resolveUrl?.(A)??A,T,{budget:I.budget,signal:I.controller.signal})}async function fh(A,T,I=Zr(),N){let J=Dd[`${T}Bytes`],K=Number(A.headers.get("content-length"));if(Number.isFinite(K)&&K>J)throw $d(A),Error(`GitHub ${T} response exceeds ${J} bytes`);if(!A.body)return"";let ne=A.body.getReader(),oe=[],de=0;while(!0){let ue=await ne.read();if(ue.done)break;try{Rd(I,ue.value.byteLength)}catch(ve){throw N?.(),Ed(ne),ve}if(de+=ue.value.byteLength,de>J)throw N?.(),Ed(ne),Error(`GitHub ${T} response exceeds ${J} bytes`);oe.push(Buffer.from(ue.value))}return Buffer.concat(oe,de).toString("utf-8")}function $d(A){if(!A.body)return;Od(()=>A.body?.cancel())}function Ed(A){Od(()=>A.cancel())}function Od(A){try{Promise.resolve(A()).catch(()=>{})}catch{}}var mh=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function Nd(A,T){let I=Md(A.rules,T);if(I.length>0)return{ok:!0,specs:I};return jd(A.rules,T)}function Fd(A,T){let I=Md(A,T);if(I.length>0)return{ok:!0,specs:I};let N=hh(A,T);if(N.length>0)return{ok:!0,specs:N};let J=yh(A,T);if(!J.ok)return J;if(J.specs.length>0)return{ok:!0,specs:J.specs};return jd(A,T)}function jd(A,T){let I=A.filter((N)=>ji(N)?.name===T);if(I.length===1)return{ok:!0,specs:I};return gh(T,I)}function gh(A,T){return{ok:!1,result:{ok:!1,errors:T.length===0?[`No configured rulebook matches ${A}`]:[`Ambiguous rulebook match ${A}: ${T.join(", ")}`],entries:[]}}}function Md(A,T){return A.filter((I)=>I===T)}function hh(A,T){let I=T.match(mh),N=I?.[1],J=I?.[2],K=I?.[3];if(!N||!J||!K||!se(K))return[];return Hd(A,(ne)=>ne.owner===N&&ne.repo===J&&ne.ref===K)}function yh(A,T){if(!Y(T))return{ok:!0,specs:[]};let[I,N]=T.split("/"),J=Hd(A,(ne)=>ne.owner===I&&ne.repo===N);if(new Set(J.map((ne)=>ji(ne)?.ref).filter((ne)=>!!ne)).size<2)return{ok:!0,specs:J};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${T}. Use an explicit ref:`,`  cc-safety-net rule remove ${T}#<ref>`],entries:[]}}}function ji(A){try{return O(A)}catch{return null}}function Hd(A,T){return A.filter((I)=>{let N=ji(I);return N?T(N):!1})}async function no(A,T={}){let I=Hi(T);return bh(A,I,await to(A,I,Jt()))}function bh(A,T,I){if(!I.ok)return I;let N=Et(A,T),J=[...new Set(H(N.configPath,N.filesystemScope))];if(J.length===0)return I;return{ok:!1,errors:J,entries:I.entries}}async function to(A,T,I,N={},J=new Set,K=new Set){try{let ne=Et(A,T),oe=Oi(ne.configTarget);if(!oe.ok)return oe.result;let de=oe.config,ue=T.only?Nd(de,T.only):{ok:!0,specs:de.rules};if(!ue.ok)return ue.result;let ve=new Set([...T.refresh?ue.specs:[],...J]),xe=(pt)=>Ad(pt,ne.configDir,ne.filesystemScope,I,ve.has(pt),!T.refresh||ve.has(pt)),Se=await Ah(de.rules,T.refresh?(pt)=>xe(pt).then((bt)=>({ok:!0,item:bt})).catch((bt)=>{if(Cd(bt))throw bt;return{ok:!1,spec:pt,message:bt instanceof Error?bt.message:String(bt)}}):async(pt)=>({ok:!0,item:await xe(pt)}),I),_e=Se.filter((pt)=>!pt.ok),we=Se.filter((pt)=>pt.ok).map((pt)=>pt.item),Ne=we.flatMap((pt)=>Lh(pt,de.rules)),nt=we.flatMap((pt)=>wh(pt,K,ne)),Ve=new Set([...Ne,...nt].map((pt)=>pt.spec)),ft=[..._e,...Ne,...nt],mt=[],gt=xh(mt,()=>we.flatMap((pt)=>Ve.has(pt.spec)||ft.length>0&&K.has(pt.spec)?[]:kh(pt,ne,N,mt)));return{ok:ft.length===0,errors:ft.map((pt)=>`Failed to update ${pt.spec}: ${pt.message}`),entries:we.map(Sh),changes:gt}}catch(ne){return nr(ne)}}function Lh(A,T){if(!S(A.spec))return[];let I=Oe(A.spec),N=T.filter((J)=>J!==A.spec&&Oe(J).toLowerCase()===I.toLowerCase());if(N.length===0)return[];return[{ok:!1,spec:A.spec,message:`rulebook name "${I}" is also claimed by ${N.join(", ")}; rename one of them`}]}function wh(A,T,I){if(!T.has(A.spec)||!S(A.spec))return[];let N=D(I.configDir,A.rulebook.name),J=n(i(I.filesystemScope,N));if(J===null||J===A.content)return[];return[{ok:!1,spec:A.spec,message:`${N} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function kh(A,T,I,N){if(!S(A.spec))return[];let J=D(T.configDir,A.rulebook.name),K=i(T.filesystemScope,J),ne=n(K);if(ne===A.content)return[];return N?.push({target:K,previous:ne}),g(K,A.content,void 0,I._testAfterPolicyRename),Ch(A,ne)}function xh(A,T){try{return T()}catch(I){for(let N of[...A].reverse()){if(N.previous===null){j(N.target);continue}g(N.target,N.previous)}throw I}}function Ch(A,T){if(T===null)return[`Vendored ${A.spec} (${A.rulebook.version})`];let I=ye(T),N="problem"in I?null:I.rulebook,J=new Map(N?.rules.map((ne)=>[ne.name,JSON.stringify(ne)])??[]),K=new Set(A.rulebook.rules.map((ne)=>ne.name));return[`Updated ${A.spec} (${N?.version??"unreadable"} -> ${A.rulebook.version})`,...[...K].filter((ne)=>!J.has(ne)).map((ne)=>`  + ${ne}`),...[...J.keys()].filter((ne)=>!K.has(ne)).map((ne)=>`  - ${ne}`),...A.rulebook.rules.filter((ne)=>{let oe=J.get(ne.name);return oe!==void 0&&oe!==JSON.stringify(ne)}).map((ne)=>`  ~ ${ne.name}`)]}function Sh(A){return{spec:A.spec,name:A.rulebook.name,version:A.rulebook.version,ruleCount:A.rulebook.rules.length}}async function Ud(A,T,I={}){return Rh(A,T,Th(I),Jt())}async function Rh(A,T,I,N,J={}){let K=null,ne=!1;try{let oe=Et(A,I),de=n(oe.configTarget);K={target:oe.configTarget,content:de};let ue=Oi(oe.configTarget);if(!ue.ok)return ue.result;let ve=ue.config,xe=Y(T);Ph(T,I,xe);let Se=xe?await _d(T,{ref:I.ref,operation:N}):null,_e=Se?Eh(Se,I.rulebooks):[],we=Se?_e.map((mt)=>Dh(ve.rules,Se,mt)??`${T}#${Se.ref}/${mt}`):[T],Ne=we.filter((mt)=>!ve.rules.includes(mt)),nt=[...ve.rules,...Ne];if(nt.length>ge)return _h();if(nt.length!==ve.rules.length)ne=!0,Pt(oe.configTarget,{version:1,rules:nt,overrides:ve.overrides??{},transparent_wrappers:ve.transparent_wrappers??[]},void 0,J._testAfterPolicyRename);let Ve=await to(A,I,N,J,new Set(Ne),new Set(Ne));if(!Ve.ok)tr(oe.configTarget,de);if(!Ve.ok||!Se)return Ve;let ft=_e.filter((mt,gt)=>Ne.includes(we[gt]??""));return{...Ve,add:{source:T,ref:Se.ref,selected:_e,added:ft,alreadyConfigured:_e.filter((mt)=>!ft.includes(mt)),commits:Ne.length>0?[Se.commit]:[]}}}catch(oe){if(ne&&K)try{tr(K.target,K.content)}catch(de){return nr(de)}return nr(oe)}}function Ph(A,T,I){if(!I&&T.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!I&&T.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${A}`);if(T.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let N=T.rulebooks?.filter((J)=>!u.test(J))??[];if(N.length>0)throw Error(`Invalid rulebook names: ${N.join(", ")}`)}function Eh(A,T){let I=T?[...new Set(T)]:A.names,N=I.filter((J)=>!A.names.includes(J));if(N.length>0)throw Error(`Rulebooks not found in ${A.source} at ${A.ref}: ${N.join(", ")}
Available rulebooks: ${A.names.join(", ")}`);return I}function Dh(A,T,I){let N=`${T.source}#${T.ref}/${I}`;if(A.includes(N))return N;let J=`${T.source}#${T.commit}/${I}`;return A.find((K)=>K===J)}async function Ah(A,T,I=Jt()){if(A.length>ge)throw Error(he);let N=[],J=0,K,ne=Array.from({length:Math.min(A.length,Xr.concurrency)},async()=>{while(!K){let oe=J;if(oe>=A.length)return;J++;try{N[oe]=await T(A[oe],oe,I.controller.signal)}catch(de){if(!K)K={value:de},J=A.length,I.controller.abort(de);return}}});if(await Promise.all(ne),K)throw K.value;return N}function _h(){return{ok:!1,errors:[he],entries:[]}}function Hi(A){return{cwd:A.cwd,userConfigDir:A.userConfigDir,userConfigPath:A.userConfigPath,projectConfigPath:A.projectConfigPath,global:A.global,only:A.only,refresh:A.refresh}}function Th(A){return{...Hi(A),ref:A.ref,rulebooks:A.rulebooks}}function Ih(A){return{...Hi(A),deleteSource:A.deleteSource}}async function Gd(A,T,I={}){try{return await $h(A,T,Ih(I),{})}catch(N){return nr(N)}}async function $h(A,T,I,N){let J=Et(A,I),K=m(J.configTarget);if(K.errors.length>0)return{ok:!1,errors:K.errors,entries:[]};if(!K.config)return{ok:!1,errors:[`No config found at ${J.configPath}`],entries:[]};let ne=Fd(K.config.rules,T);if(!ne.ok)return ne.result;let oe=I.deleteSource?Oh(J.configDir,ne.specs,J.filesystemScope):{ok:!0,dirs:[]};if(!oe.ok)return oe.result;let de=n(J.configTarget);if(de===null)return nr(Error("Rules config is unavailable."));try{Pt(J.configTarget,{version:1,rules:K.config.rules.filter((xe)=>!ne.specs.includes(xe)),overrides:K.config.overrides??{},transparent_wrappers:K.config.transparent_wrappers??[]},void 0,N._testAfterPolicyRename)}catch(xe){throw tr(J.configTarget,de),xe}let ue=await to(A,I,Jt(),N);if(!ue.ok)return tr(J.configTarget,de),ue;let ve=Nh(oe.dirs,N,J.filesystemScope);if(!ve.ok){tr(J.configTarget,de);let xe=await to(A,I,Jt(),N);if(!xe.ok)return{ok:!1,errors:[...ve.result.errors,...xe.errors],entries:xe.entries};return ve.result}return ue}function Oh(A,T,I){let N=T.flatMap((oe)=>u.test(oe)?[]:["--delete-source can only delete local rulebook sources"]),J=T.map((oe)=>Mi(A,oe)),K=N.length>0?[]:J.flatMap((oe)=>Bd(oe,I)),ne=[...N,...K];return ne.length>0?{ok:!1,result:{ok:!1,errors:ne,entries:[]}}:{ok:!0,dirs:J}}function Bd(A,T){let I=vh(A),N=i(T,I),J=pe(N);if(!J)return[`Local rulebook source directory not found: ${A}`];let K=J.find((ne)=>ne.name==="rulebook.json");if(!K)return[`Local rulebook source directory is missing rulebook.json: ${A}`];if(K.kind!=="file")throw new r(T.label);if(n(i(T,Mi(I,"rulebook.json"))),J.length>1)return[`Local rulebook source directory contains extra files: ${A}. delete manually if you really want to remove the directory.`];return[]}function Nh(A,T,I){let N=A.flatMap((J)=>{try{if(!pe(i(I,J)))return[];let K=Bd(J,I);if(K.length>0)return K;return Fh(J,T,I),[]}catch(K){return[`Failed to delete local rulebook source ${J}: ${K instanceof Error?K.message:String(K)}`]}});return N.length>0?{ok:!1,result:{ok:!1,errors:N,entries:[]}}:{ok:!0}}function Fh(A,T,I){if(T._testDeleteLocalSourceDir){T._testDeleteLocalSourceDir(A);return}j(i(I,Mi(A,fe))),st(i(I,A))}function tr(A,T){if(T===null){j(A);return}g(A,T)}function nr(A){return{ok:!1,errors:[A instanceof Error?A.message:String(A)],entries:[]}}var jh=".safety-net.json",Mh="~/.cc-safety-net/config.json";async function Jd(A,T){return[await Vd(A,{legacyPath:Ks({cwd:T.cwd}),configPath:U(T.cwd),defaultRulebookName:"project-rules",migratedFrom:jh,cleanup:T.cleanup,syncOptions:{cwd:T.cwd}}),await Vd(A,{legacyPath:ur(A),configPath:G(A),defaultRulebookName:"user-rules",migratedFrom:Mh,cleanup:T.cleanup,syncOptions:{cwd:T.cwd,global:!0}})].every((N)=>N)?0:1}async function Vd(A,T){let I=Et(A,T.syncOptions),N=i(I.filesystemScope,T.legacyPath),J=n(N);if(J===null)return console.log(`No legacy config found at ${T.legacyPath}`),!0;let K=Uh(J);if(!K.ok){for(let _e of K.errors)console.error(_e);return!1}let ne=m(I.configTarget);if(ne.errors.length>0){for(let _e of ne.errors)console.error(_e);return!1}let oe=ne.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},de=Gh(qd(T.configPath),oe.rules,T.defaultRulebookName,T.migratedFrom,I.filesystemScope),ue=ro(qd(T.configPath),de,"rulebook.json"),ve=i(I.filesystemScope,ue),xe=[zd(I.configTarget),zd(ve)],Se=await Hh(A,T,I.configTarget,ve,de,K.config.rules,oe.rules.includes(de)?oe.rules:[...oe.rules,de],oe.overrides??{},oe.transparent_wrappers??[]);if(!Se.ok){Vh(xe);for(let _e of Se.errors)console.error(_e);return!1}if(!T.cleanup)return console.log(`Migrated legacy config at ${T.legacyPath}. Legacy file is no longer used.`),!0;if(!qh(I.configTarget,ve,de,T.migratedFrom,K.config.rules))return console.error(`Migration cleanup verification failed for ${T.legacyPath}`),!1;return j(N),console.log(`Deleted legacy config at ${T.legacyPath}`),!0}async function Hh(A,T,I,N,J,K,ne,oe,de){try{return Pt(I,{version:1,rules:ne,overrides:oe,transparent_wrappers:de}),Pt(N,Bh(J,T.migratedFrom,K)),await no(A,T.syncOptions)}catch(ue){return{ok:!1,errors:[ue instanceof Error?ue.message:String(ue)]}}}function Uh(A){try{let T=JSON.parse(A),I=go(T);if(I.errors.length>0)return{ok:!1,errors:I.errors};return{ok:!0,config:{version:1,rules:T.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function Gh(A,T,I,N,J){let K=T.find((ne)=>zh(i(J,ro(A,ne,"rulebook.json")))===N);if(K)return K;if(n(i(J,ro(A,I,"rulebook.json")))===null)return I;for(let ne=2;;ne++){let oe=`${I}-${ne}`;if(n(i(J,ro(A,oe,"rulebook.json")))===null)return oe}}function Bh(A,T,I){return{rulebook_version:1,name:A,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:T,allowed_commands:[...new Set(I.map((N)=>N.command))],rules:I,tests:I.map((N)=>({command:[N.command,N.subcommand,N.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:N.name}))}}function qh(A,T,I,N,J){if(!m(A).config?.rules.includes(I))return!1;try{let ne=n(T);if(ne===null)return!1;let oe=JSON.parse(ne);return oe.migrated_from===N&&JSON.stringify(oe.rules)===JSON.stringify(J)}catch{return!1}}function zd(A){return{target:A,content:n(A)}}function Vh(A){for(let T of A){if(T.content===null){j(T.target);continue}g(T.target,T.content)}}function zh(A){let T=n(A);if(T===null)return null;try{let I=JSON.parse(T);return typeof I.migrated_from==="string"?I.migrated_from:null}catch{return null}}import{mkdir as Jh,readFile as Wh,writeFile as Kh}from"node:fs/promises";import{dirname as Yh,join as Xh}from"node:path";var Zh=86400000,Qh=604800000;async function Kd(A,T=Date.now()){if(A.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let I=He(A);if(!I)return null;let N=Xh(I,".cc-safety-net","update-check.json"),J=await ey(N,T);if(!J.lastCheck||T-J.lastCheck>Zh){let oe=await Kt();if(J.lastCheck=T,oe.latestVersion)J.latestVersion=oe.latestVersion;if(!await Wd(N,J))return null;if(oe.error)return null}let K=J.latestVersion,ne=wt();if(!K||!wo(K,ne))return null;if(J.notifiedVersion===K&&J.notifiedAt!==void 0&&T-J.notifiedAt<Qh)return null;if(J.notifiedVersion=K,J.notifiedAt=T,!await Wd(N,J))return null;return`UPDATE_AVAILABLE: cc-safety-net v${K} is available (running v${ne}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function ey(A,T){let I=await Wh(A,"utf8").then((K)=>JSON.parse(K)).catch(()=>{return});if(!I||typeof I!=="object"||Array.isArray(I))return{};let N=I,J=(K)=>typeof K==="number"&&Number.isFinite(K)&&K<=T?K:void 0;return{lastCheck:J(N.lastCheck),latestVersion:typeof N.latestVersion==="string"?N.latestVersion:void 0,notifiedVersion:typeof N.notifiedVersion==="string"?N.notifiedVersion:void 0,notifiedAt:J(N.notifiedAt)}}async function Wd(A,T){return Jh(Yh(A),{recursive:!0,mode:448}).then(()=>Kh(A,JSON.stringify(T),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as ty,resolve as Ui}from"node:path";var Yd="CC Safety Net Config",ny="═".repeat(Yd.length),ry="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",oy=new Set(["rule.json","rule.lock","cache"]);function Xd(A,T={}){try{return iy(A,T)}catch(I){if(I instanceof r)return console.error(I.message),1;throw I}}function iy(A,T){let I=T.cwd??process.cwd(),N=Z(A,{cwd:I}),J=ur(A),K=vs(I),ne=Ui(I,me),oe=i(N.userScope,J),de=i(N.projectScope,K),ue=!1,ve=!1,xe=[],Se=[],_e=sy(i(N.projectScope,ne));if(ly(),n(N.userConfigTarget)!==null){let we=Wt(N.userConfigTarget);if(we.errors.push(...H(N.userConfigPath,N.userScope)),xe.push({scope:"User",path:N.userConfigPath,result:we,schema:"rules",target:N.userConfigTarget}),we.errors.length>0)ue=!0}if(n(oe)!==null)if(ve=!0,n(N.userConfigTarget)!==null)Se.push(oo("user","cleanup"));else{let we=ho(oe);if(xe.push({scope:"User",path:J,result:we,schema:"legacy",inactive:!0,target:oe}),Se.push(oo("user",we.errors.length>0?"fix-or-delete":"migrate")),we.errors.length>0)ue=!0}if(n(N.projectConfigTarget)!==null){let we=Wt(N.projectConfigTarget);if(we.errors.push(...H(N.projectConfigPath,N.projectScope)),xe.push({scope:"Project",path:Ui(N.projectConfigPath),result:we,schema:"rules",target:N.projectConfigTarget}),we.errors.length>0)ue=!0;if(n(de)!==null)ve=!0,Se.push(oo("project","cleanup"))}else if(n(de)!==null){ve=!0,ue=!0;let we=ho(de);xe.push({scope:"Project",path:Ui(K),result:we,schema:"legacy",inactive:!0,target:de}),Se.push(oo("project",we.errors.length>0?"fix-or-delete":"migrate"))}if(_e?.result.errors.length)ue=!0;if(xe.length===0&&!_e)return console.log(`
No config files found. Using built-in rules only.`),0;for(let we of xe)if(we.inactive)dy(we.scope,we.path,we.result);else if(we.result.errors.length>0)uy(we.scope,we.path,we.result.errors);else{if(we.schema==="rules"&&my(we.target))console.log(`
Added $schema to ${we.scope.toLowerCase()} config.`);cy(we.scope,we.path,we.result,we.schema)}for(let we of Se)console.error(`
${ot.red(we)}`);if(_e)if(_e.result.errors.length>0)fy(_e.path,_e.result.errors);else py(_e.path,_e.result);if(ue)return console.error(`
Config validation failed.`),1;return console.log(ve?`
Configs valid with warnings.`:`
All configs valid.`),0}function oo(A,T){let I=`legacy ${A} config`;if(T==="cleanup")return`Warning: Legacy ${A} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(T==="migrate")return`Warning: Legacy ${A} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${A} config is no longer supported. Fix or delete the ${I}, then run \`npx -y cc-safety-net rule migrate\`.`}function sy(A){if(pe(A)===null)return null;let T=ay(A);if(T.ruleNames.size===0&&T.errors.length===0)return null;return{path:A.path,result:T}}function ay(A){let T=[],I=new Set,N=(pe(A)??[]).filter((J)=>!oy.has(J.name)).sort((J,K)=>J.name.localeCompare(K.name));if(N.length===0)return{errors:T,ruleNames:I};for(let J of N){if(!u.test(J.name)){T.push(`rulebook directory names must match ${u}: ${J.name}`);continue}if(J.kind!=="directory"){T.push(`${J.name} must be a rulebook directory`);continue}let K=i(A.scope,ty(A.path,J.name,"rulebook.json")),ne=n(K);if(ne===null){T.push(`${J.name}/rulebook.json is required`);continue}try{let oe;try{oe=JSON.parse(ne)}catch{T.push(`${J.name}/rulebook.json: invalid JSON`);continue}let de=ce(oe);if(de.name!==J.name){T.push(`rulebook name "${de.name}" must match folder "${J.name}"`);continue}let ue=Yr(de);if(ue.length>0){T.push(...ue.map((ve)=>`${J.name}/rulebook.json: ${ve}`));continue}I.add(J.name)}catch(oe){T.push(oe instanceof Error?`${J.name}/rulebook.json: ${oe.message}`:`${J.name}/rulebook.json: ${String(oe)}`)}}return{errors:T,ruleNames:I}}function ly(){console.log(Yd),console.log(ny)}function cy(A,T,I,N){if(console.log(`
✓ ${A} config: ${T}`),console.log(`  Schema: ${N==="rules"?"rulebook sources":"legacy inline rules"}`),I.ruleNames.size>0){console.log(`  ${N==="rules"?"Sources":"Rules"}:`);let J=1;for(let K of I.ruleNames)console.log(`    ${J}. ${K}`),J++}else console.log(`  ${N==="rules"?"Sources":"Rules"}: (none)`)}function dy(A,T,I){if(console.error(`
✗ Legacy ${A.toLowerCase()} config: ${T}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),I.errors.length>0){console.error("  Errors:");let N=1;for(let J of I.errors)for(let K of J.split("; "))console.error(`    ${N}. ${K}`),N++;return}if(I.ruleNames.size>0){console.error("  Rules:");let N=1;for(let J of I.ruleNames)console.error(`    ${N}. ${J}`),N++;return}console.error("  Rules: (none)")}function uy(A,T,I){Zd(`${A} config`,T,I)}function py(A,T){console.log(`
✓ GitHub source rules: ${A}`),console.log("  Rulebooks:");let I=1;for(let N of T.ruleNames)console.log(`    ${I}. ${N}`),I++}function fy(A,T){Zd("GitHub source rules",A,T)}function Zd(A,T,I){console.error(`
✗ ${A}: ${T}`),console.error("  Errors:");let N=1;for(let J of I)for(let K of J.split("; "))console.error(`    ${N}. ${K}`),N++}function my(A){try{let T=n(A);if(T===null)return!1;let I=JSON.parse(T);if(I.$schema)return!1;return g(A,JSON.stringify({$schema:ry,...I},null,2)),!0}catch(T){if(T instanceof r)throw T;return!1}}var Qd=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),hy=new Set(["add","remove","list"]),yy="cc-safety-net/rulebooks";async function eu(A,T){try{return await vy(A,T)}catch(I){if(I instanceof r)return console.error(I.message),1;throw I}}async function vy(A,T){let I=Ly(T),N=I.help?by(I.positionals):null;if(N)return Rn(N),0;if(I.errors.length>0){for(let oe of I.errors)console.error(oe);return 1}let J=I.positionals[0];if(!J)return Rn(yn,console.error),1;let K=I.positionals[1],ne={global:I.global};if(J==="init"){let oe=Et(A,ne);Cy(oe.configTarget);let de=gy(oe.configDir,"example-rules","rulebook.json"),ue=i(oe.filesystemScope,de);if(I.example&&n(ue)===null)xd(ue);let ve=H(oe.configPath,oe.filesystemScope);for(let xe of ve)console.error(xe);if(ve.length>0)return 1;return console.log("Rule config initialized."),0}if(J==="add"){let oe=tu(I);if(!oe)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let de=Et(A,ne),ue=await Ud(A,oe,{...ne,ref:I.ref,rulebooks:I.only.length>0?I.only:void 0});return vd(ue,oe,`Scope: ${I.global?"user":"project"} (${de.configDir})`),ue.ok?0:1}if(J==="remove"){if(!K)return console.error("rule remove requires a source"),1;let oe=await Gd(A,K,{...ne,deleteSource:I.deleteSource});return Kr(oe,`Removed rulebook source: ${K}`),oe.ok?0:1}if(J==="update"){let oe=await no(A,{...ne,only:K,refresh:!0});return Kr(oe,"Rule config updated."),oe.ok?0:1}if(J==="sync")return Zs(A,{global:I.global});if(J==="list"){let oe=X(A,{cwd:process.cwd()});return Ld(oe),oe.errors.length>0?1:0}if(J==="wrapper")return Sy(A,I);if(J==="migrate")return Jd(A,{cleanup:I.cleanup,cwd:process.cwd()});if(J==="doc"){console.log(hd);let oe=await Kd(A);if(oe)console.error(oe);return 0}if(J==="verify")return Xd(A);return 1}function by(A){if(A.length===0)return yn;let T=yn.subcommands.filter((N)=>N.usage.split(" ")[0]===A[0]);if(T.length===0)return null;if(A.length===1&&T.length>1)return{name:`rule ${A[0]}`,description:`Subcommands of rule ${A[0]}`,usage:`rule ${A[0]} <subcommand>`,subcommands:T,options:[]};let I=A.length===1?T[0]:T.find((N)=>N.usage.split(" ")[1]===A[1]);if(!I)return null;return{name:`rule ${A[0]}`,description:I.description,usage:`rule ${I.usage}`,options:A[0]==="add"?po:[],examples:A[0]==="add"?fo:void 0}}function Ly(A){let T=xt({label:"rule",booleans:{global:["-g","--global"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},A),I={...T.flags,ref:T.values.ref,only:T.lists.only??[],help:T.help,positionals:T.positionals,errors:T.errors};return wy(I),I}function wy(A){let[T]=A.positionals;if(T&&!Qd.has(T))A.errors.push(`Unknown rule subcommand: ${T}`);if(A.deleteSource&&T!=="remove")if(T&&Qd.has(T))A.errors.push(`Unknown option for rule ${T}: --delete-source`);else A.errors.push("--delete-source is only valid with 'rule remove'");if(A.cleanup&&T!=="migrate")A.errors.push(rr(T,"--cleanup"));if(A.example&&T!=="init")A.errors.push(rr(T,"--example"));if(A.ref&&T!=="add")A.errors.push(rr(T,"--ref"));if(A.only.length>0&&T!=="add")A.errors.push(rr(T,"--only"));if(T==="add")ky(A);if(T==="migrate"){if(A.global)A.errors.push(rr(T,"--global"));if(A.positionals.length>1)A.errors.push(`Unexpected rule migrate argument: ${A.positionals[1]}`)}else if(T==="wrapper")xy(A);else if(A.positionals.length>2)A.errors.push(`Unexpected rule argument: ${A.positionals[2]}`);if(T==="list"&&A.global)A.errors.push("Unknown option for rule list: --global")}function tu(A){if(A.positionals[1])return A.positionals[1];if(A.ref||A.only.length>0)return yy;return}function ky(A){let T=tu(A);if(!T)return;if((A.ref||A.only.length>0)&&!Y(T)){if(A.ref)A.errors.push(`--ref can only select a ref for an owner/repo source: ${T}`);if(A.only.length>0)A.errors.push("--only can only select rulebooks from an owner/repo source");return}if(A.ref&&!se(A.ref))A.errors.push(`--ref must use valid path segments: ${A.ref}`);let I=A.only.filter((N)=>!u.test(N));if(I.length>0)A.errors.push(`Invalid rulebook names: ${I.join(", ")}`)}function rr(A,T){return A?`Unknown option for rule ${A}: ${T}`:`Unknown option for rule: ${T}`}function xy(A){let T=A.positionals[1],I=A.positionals[2];if(!T){A.errors.push("rule wrapper requires add, remove, or list");return}if(!hy.has(T)){A.errors.push(`Unknown rule wrapper action: ${T}`);return}if(T==="list"){if(I)A.errors.push(`Unexpected rule wrapper argument: ${I}`);return}if(!I){A.errors.push(`rule wrapper ${T} requires a command`);return}if(A.positionals.length>3)A.errors.push(`Unexpected rule wrapper argument: ${A.positionals[3]}`)}function Cy(A){if(n(A)===null){kd(A);return}let T=m(A);if(!T.config)return;Pt(A,{version:1,rules:T.config.rules,overrides:T.config.overrides??{},transparent_wrappers:T.config.transparent_wrappers??[]})}async function Sy(A,T){let I=T.positionals[1],N=T.positionals[2],J=Et(A,{global:T.global}).configTarget;if(I==="list"){let de=m(J);if(de.errors.length>0){for(let ue of de.errors)console.error(ue);return 1}return Ry(de.config?.transparent_wrappers??[]),0}if(!N||!w.test(N))return console.error("transparent wrapper must match command pattern"),1;if(Pe(N))return console.error(`reserved command "${N}" cannot be a wrapper`),1;let K=m(J);if(K.errors.length>0){for(let de of K.errors)console.error(de);return 1}let ne=K.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},oe=I==="add"?[...new Set([...ne.transparent_wrappers??[],N])]:(ne.transparent_wrappers??[]).filter((de)=>de!==N);return Pt(J,{version:1,rules:ne.rules,overrides:ne.overrides??{},transparent_wrappers:oe}),console.log(I==="add"?`Added transparent wrapper: ${N}`:`Removed transparent wrapper: ${N}`),0}function Ry(A){if(A.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${A.length}):`);for(let T of A)console.log(`  - ${T}`)}import{sep as Ty}from"node:path";import{existsSync as Py,readFileSync as Ey}from"node:fs";import{join as Dy}from"node:path";async function Ay(A){if(A.isTTY)return null;return(await qe(A).catch(()=>null))?.trim()||null}function _y(A){let T=A.env.get("CLAUDE_SETTINGS_PATH");if(T)return T;return Dy(wr(A),"settings.json")}function Gi(A){let T=_y(A);if(!Py(T))return!1;try{let I=Ey(T,"utf-8"),N=JSON.parse(I);if(!N.enabledPlugins)return!1;let J="cc-safety-net@cc-marketplace";if(!(J in N.enabledPlugins))return!1;return N.enabledPlugins[J]===!0}catch(I){if(L(o.debug,A.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${T}: ${I instanceof Error?I.message:String(I)}`);return!1}}async function Bi(A,T=process.stdin){let I=Gi(A),N;if(!I)N="\uD83D\uDEE1️ CC Safety Net ❌";else{let K=E(A,{cwd:process.cwd()}),ne=K.policy,oe=R(ne,A.env),de=Object.values(B(ne,oe.capabilities)).some((xe)=>xe.changesInherited),ue={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[de?"custom":oe.effectiveLevel],ve=(K.policyScopes?.weakenings.length??0)>0?"\uD83D\uDD3B":"";N=`\uD83D\uDEE1️ CC Safety Net ${ue}${oe.worktreeMode?"\uD83C\uDF33":""}${ve}${K.state==="degraded"?"⚠️":""}`}let J=await Ay(T);if(J&&!J.startsWith("{"))console.log(`${J} | ${N}`);else console.log(N)}function nu(A){let T=E(A,{cwd:process.cwd()}),I=T.policy,N=R(I,A.env),J=!!process.env.NO_COLOR||!process.stdout.isTTY,K=Math.min(process.stdout.columns||80,100),ne=J?"ok":"✔",oe=J?"OFF":"✘",de=(Ne,nt)=>{let Ve=`  ${Ne.padEnd(13)}${nt}`;return(Ve.length>K?`${Ve.slice(0,K-1)}…`:Ve).replaceAll(oe,ot.red(oe))},ue=Object.values(B(I,N.capabilities)).some((Ne)=>Ne.changesInherited),ve=(Ne)=>Ne===A.home||Ne.startsWith(`${A.home}${Ty}`)?`~${Ne.slice(A.home.length)}`:Ne,xe={ready:ot.green,degraded:ot.yellow}[T.state],Se=T.policyScopes?.weakenings??[],_e=[...Gi(A)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...T.diagnostics],we=J?"-":"·";console.log([`${J?"":"\uD83D\uDEE1️  "}CC Safety Net — ${xe(T.state)}`,"",de("Protection",`destructive ${I.destructiveCommandProtectionEnabled?ne:oe}   secrets ${I.secretProtection.enabled?ne:oe}`),de("Level",ue?`${N.effectiveLevel} (customised)`:N.effectiveLevel),de("Rules",I.rules.length===0?"none active":`${I.rules.length} active`),de("Policy",ve(d(A))),...T.policyScopes?[de("Project",ve(b(process.cwd())))]:[],...N.worktreeMode?[de("Worktree","relaxations active")]:[],"",...Se.length===0?[]:["  Project policy",...Se.flatMap((Ne)=>Vn(Ne,"      ",K-6).map((nt,Ve)=>Ve===0?`    ${nt}`:nt)),""],..._e.length===0?["  Everything configured is active."]:["  Not active",..._e.flatMap((Ne)=>Vn(Ne,"      ",K-6).map((nt,Ve)=>Ve===0?`    ${we} ${nt}`:nt)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as fu}from"node:child_process";import{randomBytes as Gy}from"node:crypto";import{existsSync as By}from"node:fs";import{createServer as qy}from"node:http";import{Writable as Vy}from"node:stream";var io=500;function Iy(A){let T=A.filter((J)=>J.decision!=="allow"),I=A.filter((J)=>J.decision==="allow"),N=Math.min(T.length,Math.max(io-I.length,Math.ceil(io/2)));return[...T.slice(0,N),...I.slice(0,io-N)]}function ru(A,T,I=F(A)){if(I)q(A,I);let N=(nt)=>new Date(nt.getFullYear(),nt.getMonth(),nt.getDate()).getTime(),J=N(new Date),K=new Date(J);K.setDate(K.getDate()-(T-1));let ne=K.getTime(),oe=[],de={count:0};for(let nt of I?en(I,de):[])for(let Ve of hn(nt,de)){let ft=new Date(Ve.ts).getTime();if(!Number.isFinite(ft))continue;if(ft>=ne)oe.push(Ve)}oe.sort((nt,Ve)=>new Date(Ve.ts).getTime()-new Date(nt.ts).getTime());let ue=Array.from({length:T},()=>0),ve=Array.from({length:T},()=>0),xe={},Se={},_e={},we=0,Ne=0;for(let nt of oe){let Ve=nt.agent||"unknown";xe[Ve]=(xe[Ve]??0)+1;let ft=Math.round((J-N(new Date(nt.ts)))/86400000),mt=T-1-ft,gt=ft>=0&&ft<T;if(gt)ve[mt]=(ve[mt]??0)+1;if(nt.decision!=="allow"){if(we++,nt.ruleId)Se[nt.ruleId]=(Se[nt.ruleId]??0)+1;let pt=co(nt.segment||nt.command);if(pt)_e[pt]=(_e[pt]??0)+1;if(nt.failureStage)Ne++;if(gt)ue[mt]=(ue[mt]??0)+1}}return{days:T,logsDir:I,homeDir:A.home,totalInWindow:oe.length,truncated:oe.length>io,unreadable:de.count,counts:{blocked:we,allowed:oe.length-we,agents:xe,blockedByDay:ue,analyzedByDay:ve,rules:Se,commands:_e,errors:Ne},entries:Iy(oe).sort((nt,Ve)=>new Date(Ve.ts).getTime()-new Date(nt.ts).getTime())}}import{spawn as $y}from"node:child_process";import{existsSync as Oy,statSync as ou}from"node:fs";import{delimiter as Ny,join as Fy}from"node:path";var jy=120000,so="Choose the project folder",My=`try
  return POSIX path of (choose folder with prompt "${so}")
on error number -128
  return ""
end try`,Hy=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${so}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,iu=[{binary:"zenity",args:["--file-selection","--directory",`--title=${so}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",so]}],su=(A,T)=>(T.PATH??"").split(Ny).some((I)=>{if(I.length===0)return!1;try{let N=ou(Fy(I,A));return N.isFile()&&(N.mode&73)!==0}catch{return!1}});function qi(A,T){if(A==="darwin"||A==="win32")return!0;if(A!=="linux")return!1;if(!T.DISPLAY&&!T.WAYLAND_DISPLAY)return!1;return iu.some((I)=>su(I.binary,T))}function Uy(A,T){if(A==="darwin")return{cmd:"osascript",args:["-e",My]};if(A==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",Hy]};let I=iu.find((N)=>su(N.binary,T));return I?{cmd:I.binary,args:I.args}:null}function Vi(A=process.platform,T=process.env){let I=Uy(A,T);if(!I)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((N)=>{let J=$y(I.cmd,I.args,{env:T,stdio:["ignore","pipe","pipe"]}),K="",ne=!1,oe=(ue)=>{if(ne)return;ne=!0,clearTimeout(de),N(ue)},de=setTimeout(()=>{J.kill(),oe({error:"The folder dialog timed out"})},jy);J.stdout.on("data",(ue)=>{K+=ue.toString()}),J.on("error",()=>oe({error:`Could not open the folder dialog (${I.cmd})`})),J.on("close",()=>{let ue=K.trim().replace(/\/+$/,"");if(!ue)return oe({cancelled:!0});if(!Oy(ue)||!ou(ue).isDirectory())return oe({error:"That selection is not a folder on disk"});oe({path:ue})})})}var au=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CC Safety Net</title>
  <link rel="icon" href="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221254%22%20height%3D%221254%22%20viewBox%3D%2254%2023%201140%201140%22%20role%3D%22img%22%20aria-label%3D%22Safety%20net%20logo%20mesh%20variant%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-0%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.68%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-1%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.58%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-2%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-3%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.38%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22edge%22%20x1%3D%2214%25%22%20y1%3D%228%25%22%20x2%3D%2288%25%22%20y2%3D%2294%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23bae6fd%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%231e293b%22%20stop-opacity%3D%220.86%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cmask%20id%3D%22net-mask%22%20maskUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fmask%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Cg%20mask%3D%22url(%23net-mask)%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22%2307090d%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22360%22%20cy%3D%22240%22%20r%3D%22430%22%20fill%3D%22url(%23spot-0)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22820%22%20cy%3D%22300%22%20r%3D%22430%22%20fill%3D%22url(%23spot-1)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22760%22%20cy%3D%22830%22%20r%3D%22500%22%20fill%3D%22url(%23spot-2)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22780%22%20r%3D%22390%22%20fill%3D%22url(%23spot-3)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22url(%23edge)%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22url(%23edge)%22%20stroke-width%3D%2214%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.2%22%20stroke-width%3D%225%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate(-10%20-14)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
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
  color: var(--ink);
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
        <h1 class="brand-logo"><a class="brand-home" href="#overview" title="Overview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 512" role="img" aria-label="CC Safety Net">
  <path d="M 1439 165 L 1411 165 L 1409 166 L 1408 168 L 1403 173 L 1403 174 L 1398 179 L 1398 180 L 1395 183 L 1394 183 L 1394 184 L 1385 194 L 1385 195 L 1381 199 L 1381 200 L 1378 202 L 1378 203 L 1374 207 L 1374 208 L 1367 215 L 1367 216 L 1358 226 L 1358 227 L 1352 233 L 1352 234 L 1347 239 L 1347 240 L 1341 246 L 1341 247 L 1336 252 L 1336 253 L 1332 257 L 1332 258 L 1325 265 L 1325 266 L 1319 272 L 1319 273 L 1314 278 L 1314 279 L 1309 284 L 1309 285 L 1303 291 L 1303 292 L 1299 296 L 1299 297 L 1294 302 L 1291 299 L 1290 300 L 1290 301 L 1293 301 L 1294 302 L 1288 309 L 1287 308 L 1288 309 L 1286 312 L 1285 311 L 1285 306 L 1286 305 L 1286 303 L 1288 299 L 1288 296 L 1289 295 L 1289 292 L 1290 291 L 1290 287 L 1291 286 L 1291 284 L 1293 280 L 1293 277 L 1294 276 L 1294 272 L 1295 271 L 1295 269 L 1297 265 L 1297 262 L 1298 261 L 1298 258 L 1299 257 L 1299 253 L 1300 252 L 1300 250 L 1301 249 L 1301 247 L 1303 243 L 1303 238 L 1304 237 L 1304 235 L 1305 234 L 1305 232 L 1307 228 L 1307 224 L 1308 223 L 1308 221 L 1309 220 L 1309 217 L 1310 216 L 1310 214 L 1312 210 L 1312 205 L 1314 202 L 1314 199 L 1316 195 L 1317 188 L 1318 187 L 1318 185 L 1319 184 L 1319 182 L 1321 178 L 1321 173 L 1323 169 L 1323 166 L 1296 166 L 1296 168 L 1294 171 L 1294 174 L 1293 175 L 1293 178 L 1292 179 L 1291 186 L 1290 187 L 1290 189 L 1289 190 L 1289 192 L 1287 196 L 1287 200 L 1285 204 L 1285 207 L 1283 211 L 1283 215 L 1282 216 L 1282 218 L 1281 219 L 1281 222 L 1279 226 L 1279 229 L 1278 230 L 1278 234 L 1277 235 L 1277 237 L 1276 238 L 1276 240 L 1274 244 L 1274 249 L 1273 250 L 1273 252 L 1271 256 L 1271 259 L 1270 260 L 1270 263 L 1269 264 L 1269 268 L 1268 269 L 1268 271 L 1266 275 L 1266 278 L 1265 279 L 1265 284 L 1264 285 L 1264 287 L 1262 291 L 1262 294 L 1261 295 L 1261 298 L 1260 299 L 1259 306 L 1258 307 L 1258 309 L 1257 310 L 1257 313 L 1256 314 L 1256 318 L 1254 322 L 1254 325 L 1273 325 L 1274 327 L 1273 328 L 1272 327 L 1273 328 L 1269 332 L 1269 333 L 1265 337 L 1265 338 L 1261 341 L 1261 342 L 1252 352 L 1252 353 L 1247 358 L 1247 359 L 1242 364 L 1242 365 L 1239 367 L 1239 368 L 1224 385 L 1224 386 L 1220 390 L 1220 391 L 1216 395 L 1216 396 L 1214 397 L 1214 399 L 1247 399 L 1249 397 L 1249 396 L 1259 385 L 1259 384 L 1263 380 L 1263 379 L 1265 377 L 1266 377 L 1266 376 L 1271 371 L 1271 370 L 1278 363 L 1278 362 L 1283 357 L 1283 356 L 1294 344 L 1294 343 L 1298 339 L 1298 338 L 1305 331 L 1305 330 L 1309 326 L 1309 325 L 1312 323 L 1313 320 L 1315 319 L 1316 317 L 1321 312 L 1322 312 L 1321 311 L 1330 301 L 1330 300 L 1335 295 L 1335 294 L 1337 292 L 1338 292 L 1339 289 L 1342 287 L 1342 286 L 1346 282 L 1346 281 L 1352 275 L 1352 274 L 1361 264 L 1361 263 L 1370 253 L 1370 252 L 1375 247 L 1375 246 L 1380 241 L 1380 240 L 1387 233 L 1387 232 L 1402 215 L 1402 214 L 1406 210 L 1406 209 L 1408 207 L 1409 207 L 1409 206 L 1413 202 L 1413 201 L 1418 196 L 1418 195 L 1422 191 L 1422 190 L 1427 185 L 1427 184 L 1431 180 L 1431 179 L 1440 169 L 1441 167 Z
M 1129 179 L 1126 178 L 1125 176 L 1124 176 L 1116 170 L 1114 170 L 1107 166 L 1105 166 L 1104 165 L 1101 165 L 1100 164 L 1096 164 L 1095 163 L 1091 163 L 1090 162 L 1081 162 L 1080 161 L 1076 161 L 1075 162 L 1066 162 L 1065 163 L 1061 163 L 1060 164 L 1057 164 L 1056 165 L 1051 165 L 1050 166 L 1045 167 L 1040 170 L 1038 170 L 1028 175 L 1023 179 L 1021 179 L 1017 183 L 1016 183 L 1012 187 L 1011 187 L 999 199 L 999 200 L 996 203 L 996 204 L 994 205 L 993 208 L 990 211 L 981 229 L 981 231 L 980 232 L 980 234 L 979 235 L 979 237 L 977 241 L 977 244 L 976 245 L 976 254 L 975 255 L 975 265 L 976 266 L 976 273 L 977 274 L 977 277 L 980 283 L 981 288 L 984 292 L 985 295 L 988 298 L 989 301 L 998 310 L 1001 311 L 1004 314 L 1007 315 L 1009 317 L 1013 319 L 1015 319 L 1018 321 L 1020 321 L 1024 323 L 1027 323 L 1028 324 L 1035 324 L 1036 325 L 1054 325 L 1055 324 L 1062 324 L 1063 323 L 1067 323 L 1068 322 L 1071 322 L 1077 319 L 1080 319 L 1087 315 L 1089 315 L 1093 313 L 1095 311 L 1098 310 L 1103 306 L 1106 305 L 1116 296 L 1117 296 L 1115 292 L 1113 290 L 1112 290 L 1111 288 L 1109 286 L 1108 286 L 1107 284 L 1100 278 L 1098 279 L 1090 286 L 1089 286 L 1086 289 L 1074 295 L 1072 295 L 1068 297 L 1065 297 L 1064 298 L 1061 298 L 1060 299 L 1041 299 L 1040 298 L 1037 298 L 1036 297 L 1031 296 L 1028 294 L 1026 294 L 1024 292 L 1020 290 L 1010 280 L 1008 275 L 1006 273 L 1005 271 L 1005 268 L 1004 267 L 1004 264 L 1003 263 L 1003 248 L 1004 247 L 1005 238 L 1008 233 L 1008 231 L 1010 227 L 1012 225 L 1013 222 L 1018 216 L 1018 215 L 1030 203 L 1031 203 L 1044 194 L 1046 194 L 1053 190 L 1056 190 L 1057 189 L 1060 189 L 1061 188 L 1064 188 L 1065 187 L 1071 187 L 1072 186 L 1076 186 L 1077 187 L 1083 187 L 1084 188 L 1087 188 L 1088 189 L 1090 189 L 1091 190 L 1096 191 L 1100 194 L 1103 195 L 1106 198 L 1107 198 L 1109 200 L 1109 201 L 1114 206 L 1114 207 L 1116 209 L 1118 213 L 1118 216 L 1120 220 L 1120 225 L 1116 227 L 1111 227 L 1110 228 L 1103 228 L 1102 229 L 1097 229 L 1096 230 L 1091 230 L 1090 231 L 1086 231 L 1085 232 L 1077 232 L 1076 233 L 1072 233 L 1071 234 L 1066 234 L 1065 235 L 1061 235 L 1060 236 L 1053 236 L 1052 237 L 1047 237 L 1047 240 L 1046 241 L 1046 243 L 1045 244 L 1045 247 L 1044 248 L 1044 250 L 1043 251 L 1043 254 L 1042 255 L 1042 260 L 1041 261 L 1041 263 L 1044 263 L 1045 262 L 1050 262 L 1051 261 L 1058 261 L 1059 260 L 1063 260 L 1064 259 L 1068 259 L 1069 258 L 1073 258 L 1074 257 L 1080 257 L 1081 256 L 1086 256 L 1087 255 L 1092 255 L 1093 254 L 1097 254 L 1098 253 L 1103 253 L 1104 252 L 1111 252 L 1112 251 L 1116 251 L 1117 250 L 1121 250 L 1122 249 L 1126 249 L 1127 248 L 1133 248 L 1134 247 L 1139 247 L 1140 246 L 1144 246 L 1146 243 L 1146 240 L 1147 239 L 1147 231 L 1148 230 L 1148 220 L 1147 219 L 1147 211 L 1146 210 L 1146 207 L 1144 204 L 1144 202 L 1143 201 L 1143 199 L 1141 195 L 1139 193 L 1138 190 L 1134 186 L 1133 183 L 1132 183 L 1129 180 Z
M 1779 171 L 1767 165 L 1765 165 L 1764 164 L 1762 164 L 1758 162 L 1755 162 L 1754 161 L 1747 161 L 1746 160 L 1729 160 L 1728 161 L 1722 161 L 1721 162 L 1718 162 L 1717 163 L 1715 163 L 1711 165 L 1707 165 L 1687 175 L 1685 177 L 1681 179 L 1672 187 L 1671 187 L 1661 197 L 1661 198 L 1657 202 L 1657 203 L 1652 209 L 1651 212 L 1649 214 L 1644 224 L 1643 229 L 1640 235 L 1640 238 L 1639 239 L 1639 244 L 1638 245 L 1638 250 L 1637 251 L 1637 267 L 1638 268 L 1638 273 L 1639 274 L 1639 278 L 1640 279 L 1640 282 L 1648 298 L 1652 302 L 1652 303 L 1655 306 L 1657 307 L 1657 308 L 1659 310 L 1660 310 L 1663 313 L 1669 316 L 1671 318 L 1673 319 L 1675 319 L 1676 320 L 1678 320 L 1684 323 L 1688 323 L 1689 324 L 1696 324 L 1697 325 L 1715 325 L 1716 324 L 1723 324 L 1724 323 L 1728 323 L 1729 322 L 1732 322 L 1738 319 L 1741 319 L 1748 315 L 1750 315 L 1754 313 L 1758 310 L 1759 311 L 1760 309 L 1761 309 L 1764 306 L 1765 306 L 1771 301 L 1772 301 L 1778 295 L 1761 278 L 1760 278 L 1756 282 L 1755 282 L 1751 286 L 1750 286 L 1745 290 L 1737 294 L 1732 295 L 1729 297 L 1726 297 L 1725 298 L 1721 298 L 1720 299 L 1703 299 L 1702 298 L 1698 298 L 1697 297 L 1692 296 L 1684 292 L 1682 290 L 1681 290 L 1673 282 L 1671 278 L 1668 275 L 1668 273 L 1667 272 L 1667 270 L 1666 269 L 1666 267 L 1664 263 L 1664 246 L 1665 245 L 1665 242 L 1666 241 L 1666 239 L 1668 235 L 1668 232 L 1670 228 L 1672 226 L 1673 224 L 1673 222 L 1680 214 L 1680 213 L 1690 203 L 1691 203 L 1694 200 L 1695 200 L 1700 196 L 1712 190 L 1715 190 L 1716 189 L 1718 189 L 1722 187 L 1725 187 L 1726 186 L 1744 186 L 1745 187 L 1747 187 L 1748 188 L 1750 188 L 1751 189 L 1756 190 L 1758 191 L 1761 194 L 1764 195 L 1773 204 L 1773 205 L 1777 210 L 1777 212 L 1778 213 L 1778 215 L 1780 219 L 1780 223 L 1781 225 L 1780 226 L 1775 226 L 1774 227 L 1768 227 L 1767 228 L 1759 228 L 1758 229 L 1753 229 L 1752 230 L 1747 230 L 1746 231 L 1742 231 L 1741 232 L 1733 232 L 1732 233 L 1727 233 L 1726 234 L 1722 234 L 1721 235 L 1717 235 L 1716 236 L 1709 236 L 1707 238 L 1707 241 L 1706 242 L 1706 246 L 1705 247 L 1705 250 L 1703 254 L 1703 258 L 1702 259 L 1702 262 L 1706 262 L 1707 261 L 1714 261 L 1715 260 L 1724 259 L 1725 258 L 1728 258 L 1729 257 L 1735 257 L 1736 256 L 1742 256 L 1743 255 L 1747 255 L 1748 254 L 1752 254 L 1753 253 L 1757 253 L 1758 252 L 1765 252 L 1766 251 L 1771 251 L 1772 250 L 1776 250 L 1777 249 L 1781 249 L 1782 248 L 1789 248 L 1790 247 L 1794 247 L 1795 246 L 1804 245 L 1805 243 L 1805 240 L 1806 239 L 1807 240 L 1807 243 L 1809 244 L 1809 241 L 1808 241 L 1806 238 L 1806 232 L 1807 231 L 1807 217 L 1806 216 L 1806 210 L 1805 209 L 1805 206 L 1802 200 L 1802 198 L 1800 194 L 1798 192 L 1797 189 L 1790 181 L 1790 180 L 1788 179 Z
M 714 187 L 712 189 L 712 190 L 708 193 L 708 194 L 704 198 L 704 199 L 700 203 L 700 204 L 695 210 L 695 212 L 693 214 L 690 220 L 690 222 L 686 229 L 686 233 L 684 237 L 684 240 L 683 241 L 683 245 L 682 246 L 682 268 L 683 269 L 683 273 L 684 274 L 684 276 L 686 280 L 686 283 L 692 295 L 699 303 L 699 304 L 701 306 L 702 306 L 704 308 L 704 309 L 707 310 L 711 314 L 716 316 L 718 318 L 720 319 L 722 319 L 725 321 L 730 322 L 731 323 L 734 323 L 735 324 L 740 324 L 741 325 L 749 325 L 750 326 L 759 326 L 760 325 L 767 325 L 768 324 L 775 324 L 776 323 L 780 323 L 788 319 L 791 319 L 792 318 L 794 318 L 798 315 L 800 315 L 810 309 L 812 310 L 812 313 L 811 314 L 811 319 L 810 320 L 809 325 L 836 325 L 839 319 L 839 316 L 840 315 L 840 310 L 841 309 L 841 307 L 842 306 L 842 303 L 844 299 L 844 295 L 845 294 L 846 287 L 847 286 L 847 284 L 849 280 L 849 275 L 850 274 L 850 271 L 851 270 L 851 268 L 853 264 L 854 255 L 855 254 L 855 252 L 856 251 L 856 248 L 857 247 L 857 244 L 858 243 L 858 217 L 857 216 L 857 212 L 854 206 L 853 201 L 851 197 L 849 195 L 849 193 L 846 190 L 844 186 L 835 177 L 834 177 L 831 174 L 830 174 L 825 170 L 823 170 L 814 165 L 811 165 L 808 163 L 805 163 L 804 162 L 800 162 L 799 161 L 793 161 L 792 160 L 773 160 L 772 161 L 765 161 L 764 162 L 757 163 L 753 165 L 750 165 L 743 169 L 741 169 L 735 172 L 733 174 L 730 175 L 728 177 L 724 179 L 715 187 Z
M 806 192 L 808 194 L 811 195 L 815 199 L 816 199 L 822 206 L 822 207 L 824 209 L 827 215 L 827 217 L 829 221 L 829 226 L 830 227 L 830 240 L 829 241 L 829 246 L 828 247 L 828 250 L 827 251 L 827 253 L 825 256 L 825 258 L 823 262 L 821 264 L 820 267 L 817 270 L 817 271 L 808 281 L 807 281 L 803 285 L 799 287 L 796 290 L 794 290 L 788 294 L 786 294 L 785 295 L 783 295 L 782 296 L 780 296 L 776 298 L 773 298 L 772 299 L 748 299 L 747 298 L 744 298 L 743 297 L 738 296 L 735 294 L 733 294 L 731 292 L 727 290 L 717 280 L 717 279 L 715 277 L 712 271 L 712 269 L 710 265 L 710 262 L 709 261 L 709 245 L 710 244 L 710 240 L 711 239 L 711 237 L 712 236 L 713 231 L 717 223 L 719 221 L 720 218 L 724 214 L 724 213 L 734 203 L 735 203 L 739 199 L 742 198 L 744 196 L 756 190 L 758 190 L 762 188 L 765 188 L 766 187 L 769 187 L 770 186 L 788 186 L 789 187 L 792 187 L 796 189 L 799 189 L 800 190 L 802 190 Z
M 1192 121 L 1190 122 L 1190 124 L 1189 125 L 1189 129 L 1188 130 L 1188 132 L 1186 136 L 1186 139 L 1185 140 L 1184 147 L 1183 148 L 1183 150 L 1181 154 L 1181 157 L 1180 158 L 1180 162 L 1179 163 L 1179 165 L 1178 166 L 1178 168 L 1176 172 L 1176 176 L 1175 177 L 1175 179 L 1173 183 L 1173 186 L 1172 187 L 1171 194 L 1170 195 L 1170 197 L 1168 201 L 1168 204 L 1167 205 L 1167 209 L 1166 210 L 1166 212 L 1164 216 L 1164 219 L 1163 220 L 1162 227 L 1160 231 L 1160 234 L 1159 235 L 1158 242 L 1157 243 L 1157 245 L 1155 249 L 1155 252 L 1154 253 L 1154 259 L 1153 260 L 1153 276 L 1154 277 L 1154 282 L 1155 283 L 1155 286 L 1158 292 L 1158 294 L 1161 298 L 1162 301 L 1173 313 L 1174 313 L 1182 319 L 1184 319 L 1189 322 L 1191 322 L 1195 324 L 1199 324 L 1200 325 L 1236 325 L 1236 323 L 1237 322 L 1237 319 L 1238 318 L 1238 315 L 1239 314 L 1239 311 L 1240 310 L 1240 307 L 1241 306 L 1241 303 L 1242 302 L 1242 300 L 1241 299 L 1209 299 L 1208 298 L 1205 298 L 1195 293 L 1187 285 L 1186 282 L 1183 278 L 1183 275 L 1182 274 L 1182 271 L 1181 270 L 1181 257 L 1182 256 L 1182 253 L 1183 252 L 1183 248 L 1184 247 L 1184 245 L 1186 241 L 1186 238 L 1187 237 L 1187 233 L 1188 232 L 1188 230 L 1189 229 L 1189 227 L 1191 223 L 1191 220 L 1192 219 L 1192 215 L 1193 214 L 1193 211 L 1195 207 L 1195 204 L 1196 203 L 1196 199 L 1197 198 L 1197 195 L 1198 194 L 1198 192 L 1200 190 L 1278 190 L 1279 189 L 1279 187 L 1281 183 L 1281 180 L 1282 179 L 1282 177 L 1283 176 L 1283 174 L 1285 170 L 1285 166 L 1286 165 L 1285 164 L 1269 164 L 1268 165 L 1239 165 L 1238 164 L 1221 164 L 1220 165 L 1210 165 L 1209 164 L 1207 164 L 1206 163 L 1207 162 L 1207 159 L 1209 155 L 1209 152 L 1210 151 L 1210 147 L 1211 146 L 1211 144 L 1213 140 L 1214 133 L 1216 129 L 1217 122 L 1216 121 Z
M 997 121 L 978 121 L 977 122 L 960 122 L 959 123 L 952 124 L 948 126 L 945 126 L 938 130 L 936 130 L 931 134 L 928 135 L 925 138 L 922 139 L 917 144 L 916 144 L 907 153 L 907 154 L 903 158 L 903 159 L 897 166 L 888 184 L 888 186 L 886 190 L 886 193 L 884 197 L 884 200 L 882 204 L 882 209 L 881 210 L 881 213 L 880 214 L 880 216 L 878 220 L 878 224 L 877 225 L 876 232 L 875 233 L 875 235 L 873 239 L 873 244 L 871 248 L 871 251 L 869 255 L 869 259 L 868 260 L 868 263 L 867 264 L 867 266 L 866 267 L 866 270 L 864 274 L 864 279 L 863 280 L 863 282 L 862 283 L 862 285 L 860 289 L 860 294 L 859 295 L 859 298 L 857 301 L 857 304 L 856 305 L 856 308 L 855 309 L 855 313 L 854 314 L 854 316 L 853 317 L 853 320 L 851 324 L 852 325 L 878 325 L 879 324 L 879 322 L 880 321 L 880 317 L 881 316 L 881 314 L 883 310 L 883 307 L 884 306 L 885 299 L 887 295 L 887 292 L 888 291 L 889 284 L 891 280 L 891 277 L 892 276 L 892 273 L 893 272 L 894 265 L 896 261 L 896 258 L 897 257 L 897 254 L 898 253 L 898 249 L 899 248 L 899 246 L 901 242 L 901 239 L 902 238 L 903 231 L 905 227 L 905 224 L 906 223 L 906 219 L 907 218 L 908 211 L 910 207 L 910 204 L 911 203 L 911 199 L 912 198 L 912 196 L 914 194 L 980 194 L 982 192 L 982 188 L 983 187 L 984 180 L 986 176 L 986 173 L 988 172 L 987 170 L 987 168 L 930 168 L 929 167 L 937 159 L 938 159 L 941 156 L 942 156 L 944 154 L 946 154 L 948 152 L 952 150 L 955 150 L 956 149 L 959 149 L 960 148 L 964 148 L 965 147 L 992 147 L 993 146 L 993 144 L 995 140 L 995 136 L 996 135 L 996 130 L 998 126 L 998 122 Z
M 1844 120 L 1842 124 L 1842 127 L 1841 128 L 1841 131 L 1840 132 L 1840 136 L 1839 137 L 1839 140 L 1838 141 L 1838 144 L 1837 145 L 1837 149 L 1835 153 L 1835 157 L 1834 158 L 1834 161 L 1832 165 L 1832 168 L 1831 169 L 1831 173 L 1830 174 L 1830 177 L 1828 181 L 1828 184 L 1827 185 L 1827 188 L 1826 189 L 1826 193 L 1824 197 L 1824 200 L 1823 201 L 1823 204 L 1822 205 L 1822 209 L 1821 210 L 1821 213 L 1820 214 L 1820 216 L 1819 217 L 1819 220 L 1818 221 L 1818 224 L 1817 225 L 1817 230 L 1815 234 L 1815 237 L 1813 241 L 1813 245 L 1812 246 L 1812 249 L 1811 250 L 1811 253 L 1810 254 L 1810 259 L 1809 260 L 1809 275 L 1810 276 L 1810 280 L 1811 281 L 1811 284 L 1812 285 L 1812 287 L 1813 288 L 1814 293 L 1817 297 L 1818 300 L 1821 303 L 1821 304 L 1831 314 L 1834 315 L 1839 319 L 1841 319 L 1849 323 L 1852 323 L 1853 324 L 1858 324 L 1859 325 L 1890 325 L 1891 324 L 1891 321 L 1892 320 L 1892 317 L 1893 316 L 1893 313 L 1894 312 L 1894 309 L 1895 308 L 1896 299 L 1865 299 L 1864 298 L 1861 298 L 1854 294 L 1852 294 L 1848 290 L 1847 290 L 1846 288 L 1842 284 L 1841 281 L 1839 279 L 1837 275 L 1837 270 L 1836 269 L 1836 258 L 1837 257 L 1837 250 L 1838 249 L 1838 246 L 1840 242 L 1840 239 L 1841 238 L 1841 235 L 1842 234 L 1842 230 L 1844 226 L 1844 223 L 1845 222 L 1845 219 L 1846 218 L 1846 214 L 1847 213 L 1847 210 L 1848 209 L 1848 207 L 1849 206 L 1849 203 L 1850 202 L 1850 199 L 1851 198 L 1851 193 L 1853 189 L 1924 189 L 1925 188 L 1925 185 L 1926 184 L 1926 180 L 1927 179 L 1927 176 L 1928 175 L 1928 172 L 1929 171 L 1930 164 L 1929 163 L 1860 163 L 1859 162 L 1860 161 L 1861 154 L 1862 153 L 1862 151 L 1863 150 L 1863 147 L 1864 146 L 1864 141 L 1865 140 L 1865 138 L 1866 137 L 1866 134 L 1868 130 L 1868 126 L 1869 125 L 1869 120 Z
M 675 120 L 575 120 L 574 121 L 567 121 L 566 122 L 563 122 L 562 123 L 559 123 L 558 124 L 556 124 L 555 125 L 550 126 L 538 132 L 536 134 L 532 136 L 528 140 L 527 140 L 526 142 L 522 145 L 522 146 L 518 150 L 516 154 L 513 157 L 513 159 L 508 168 L 508 173 L 507 174 L 507 177 L 506 178 L 506 194 L 507 195 L 508 202 L 510 205 L 510 207 L 512 209 L 514 214 L 517 217 L 517 218 L 520 221 L 521 221 L 522 223 L 523 223 L 529 228 L 533 230 L 535 230 L 538 232 L 543 233 L 544 234 L 551 234 L 552 235 L 615 235 L 616 234 L 618 234 L 619 235 L 624 235 L 625 236 L 627 236 L 635 240 L 641 247 L 643 251 L 643 253 L 644 254 L 644 267 L 643 268 L 643 271 L 642 272 L 642 274 L 641 276 L 639 278 L 637 282 L 630 289 L 629 289 L 627 291 L 626 291 L 622 294 L 620 294 L 616 296 L 613 296 L 612 297 L 487 297 L 485 299 L 485 302 L 483 306 L 483 310 L 482 311 L 482 314 L 481 315 L 481 319 L 480 320 L 480 325 L 607 325 L 608 324 L 614 324 L 615 323 L 619 323 L 627 319 L 630 319 L 634 317 L 636 315 L 638 315 L 640 313 L 641 313 L 649 306 L 650 306 L 653 303 L 654 301 L 655 301 L 655 300 L 662 292 L 662 290 L 664 288 L 667 282 L 667 280 L 668 279 L 668 277 L 670 273 L 670 270 L 671 269 L 671 248 L 670 247 L 670 244 L 669 243 L 668 238 L 665 232 L 662 229 L 661 226 L 655 220 L 654 220 L 648 215 L 640 211 L 638 211 L 637 210 L 633 210 L 632 209 L 627 209 L 626 208 L 553 208 L 552 207 L 550 207 L 544 204 L 537 197 L 535 193 L 534 188 L 533 187 L 533 180 L 534 179 L 534 176 L 537 170 L 537 168 L 539 166 L 539 165 L 549 155 L 554 153 L 558 150 L 561 150 L 562 149 L 565 149 L 566 148 L 570 148 L 571 147 L 670 147 L 671 146 L 671 141 L 672 140 L 672 137 L 674 133 L 674 129 L 675 128 L 675 124 L 676 123 L 676 121 Z
M 333 132 L 331 134 L 328 135 L 326 137 L 321 139 L 311 148 L 310 148 L 296 163 L 296 164 L 290 172 L 288 177 L 286 179 L 286 181 L 282 188 L 281 193 L 279 196 L 279 198 L 277 202 L 277 206 L 276 207 L 276 212 L 275 213 L 275 220 L 274 221 L 274 237 L 275 238 L 275 244 L 276 245 L 277 254 L 278 255 L 279 260 L 281 263 L 282 268 L 286 276 L 288 278 L 289 281 L 294 287 L 294 288 L 305 300 L 306 300 L 311 305 L 315 307 L 318 310 L 320 310 L 323 313 L 327 315 L 329 315 L 336 319 L 339 319 L 340 320 L 342 320 L 343 321 L 345 321 L 349 323 L 353 323 L 354 324 L 363 324 L 364 325 L 434 325 L 435 324 L 435 319 L 436 318 L 436 309 L 437 308 L 437 301 L 438 300 L 438 298 L 437 297 L 364 297 L 363 296 L 354 295 L 348 292 L 346 292 L 340 289 L 338 287 L 335 286 L 332 283 L 331 283 L 322 275 L 322 274 L 315 266 L 312 260 L 310 258 L 310 256 L 306 249 L 306 245 L 305 244 L 305 241 L 304 240 L 304 237 L 303 236 L 303 216 L 304 215 L 304 211 L 305 210 L 306 203 L 315 185 L 317 183 L 319 179 L 324 174 L 324 173 L 326 172 L 329 168 L 330 168 L 334 164 L 337 163 L 340 160 L 345 158 L 347 156 L 351 154 L 356 153 L 359 151 L 361 151 L 362 150 L 367 150 L 368 149 L 373 149 L 374 148 L 445 148 L 447 144 L 447 136 L 448 135 L 448 124 L 449 122 L 447 120 L 378 120 L 377 121 L 367 121 L 366 122 L 362 122 L 361 123 L 358 123 L 357 124 L 350 125 L 342 129 L 340 129 L 337 131 L 335 131 Z
M 181 132 L 179 134 L 174 136 L 172 138 L 168 140 L 165 143 L 164 143 L 159 148 L 158 148 L 156 150 L 156 151 L 154 152 L 152 154 L 152 155 L 147 160 L 147 161 L 143 165 L 143 166 L 139 171 L 138 174 L 136 176 L 130 188 L 130 190 L 129 191 L 129 193 L 128 194 L 128 196 L 126 200 L 126 203 L 125 204 L 125 208 L 124 209 L 124 213 L 123 214 L 123 222 L 122 223 L 122 232 L 123 233 L 123 241 L 124 242 L 124 246 L 125 247 L 125 252 L 126 253 L 126 256 L 129 262 L 130 267 L 135 277 L 137 279 L 138 282 L 144 289 L 144 290 L 156 302 L 157 302 L 160 305 L 164 307 L 167 310 L 167 311 L 169 310 L 174 314 L 176 315 L 178 315 L 185 319 L 188 319 L 189 320 L 191 320 L 195 322 L 198 322 L 199 323 L 204 323 L 205 324 L 214 324 L 215 325 L 286 325 L 287 324 L 287 319 L 288 318 L 288 302 L 289 301 L 289 298 L 288 297 L 214 297 L 213 296 L 208 296 L 207 295 L 200 294 L 195 291 L 193 291 L 189 289 L 187 287 L 184 286 L 178 281 L 177 281 L 168 272 L 168 271 L 164 267 L 163 264 L 159 259 L 159 257 L 155 250 L 155 248 L 154 247 L 154 243 L 152 239 L 152 233 L 151 232 L 151 221 L 152 220 L 152 214 L 153 213 L 153 210 L 154 209 L 154 205 L 157 199 L 157 197 L 159 194 L 159 192 L 163 187 L 163 185 L 167 181 L 168 178 L 170 177 L 171 175 L 184 163 L 185 163 L 190 159 L 200 154 L 202 154 L 205 152 L 207 152 L 210 150 L 215 150 L 216 149 L 222 149 L 223 148 L 295 148 L 296 147 L 296 140 L 297 139 L 297 128 L 298 127 L 298 121 L 297 120 L 227 120 L 226 121 L 215 121 L 214 122 L 209 122 L 208 123 L 205 123 L 201 125 L 198 125 L 197 126 L 192 127 L 185 131 L 183 131 Z
M 1506 121 L 1499 127 L 1497 131 L 1497 138 L 1496 139 L 1496 143 L 1495 144 L 1495 147 L 1494 148 L 1494 151 L 1493 152 L 1493 155 L 1492 156 L 1491 163 L 1489 167 L 1489 170 L 1488 171 L 1488 175 L 1487 176 L 1487 179 L 1485 183 L 1485 186 L 1484 187 L 1484 190 L 1483 191 L 1483 195 L 1482 196 L 1482 199 L 1481 200 L 1481 202 L 1480 203 L 1480 206 L 1479 207 L 1479 212 L 1478 213 L 1478 216 L 1476 220 L 1476 223 L 1475 224 L 1475 227 L 1474 228 L 1474 232 L 1473 233 L 1472 240 L 1470 244 L 1470 249 L 1469 250 L 1468 257 L 1466 261 L 1466 265 L 1465 266 L 1465 270 L 1464 271 L 1464 274 L 1463 275 L 1463 277 L 1462 278 L 1462 281 L 1461 282 L 1461 287 L 1460 288 L 1460 290 L 1459 291 L 1459 294 L 1457 298 L 1456 307 L 1455 308 L 1455 311 L 1454 312 L 1454 314 L 1453 315 L 1453 318 L 1452 319 L 1452 325 L 1478 325 L 1479 324 L 1479 321 L 1481 317 L 1481 312 L 1482 311 L 1482 308 L 1483 307 L 1483 304 L 1484 303 L 1484 300 L 1485 299 L 1485 296 L 1486 295 L 1486 290 L 1488 286 L 1488 283 L 1489 282 L 1489 279 L 1490 278 L 1490 274 L 1491 273 L 1491 270 L 1492 269 L 1492 267 L 1493 266 L 1493 263 L 1494 262 L 1495 253 L 1496 252 L 1496 249 L 1497 248 L 1497 245 L 1498 244 L 1498 241 L 1499 240 L 1499 235 L 1500 234 L 1500 232 L 1502 228 L 1502 225 L 1503 224 L 1503 220 L 1504 219 L 1504 216 L 1506 212 L 1506 209 L 1507 208 L 1507 205 L 1508 204 L 1508 199 L 1509 198 L 1509 195 L 1511 191 L 1511 188 L 1512 187 L 1512 183 L 1513 182 L 1513 179 L 1515 175 L 1516 168 L 1517 167 L 1519 169 L 1519 171 L 1520 172 L 1521 170 L 1521 167 L 1519 165 L 1518 167 L 1517 166 L 1518 159 L 1520 156 L 1522 159 L 1522 162 L 1523 163 L 1524 170 L 1525 171 L 1525 173 L 1527 177 L 1527 180 L 1528 181 L 1528 183 L 1530 187 L 1530 190 L 1532 194 L 1532 197 L 1533 198 L 1533 200 L 1534 201 L 1534 203 L 1536 207 L 1536 211 L 1537 212 L 1537 215 L 1538 216 L 1538 218 L 1539 219 L 1539 221 L 1541 225 L 1541 229 L 1542 230 L 1542 232 L 1543 233 L 1543 235 L 1545 239 L 1546 246 L 1547 247 L 1547 249 L 1548 250 L 1548 252 L 1550 256 L 1550 261 L 1551 262 L 1551 264 L 1552 265 L 1552 267 L 1554 271 L 1555 278 L 1556 279 L 1556 281 L 1558 285 L 1558 288 L 1559 289 L 1560 296 L 1561 297 L 1561 299 L 1563 303 L 1563 307 L 1564 308 L 1564 310 L 1566 314 L 1568 316 L 1568 317 L 1570 319 L 1571 319 L 1573 321 L 1577 323 L 1579 323 L 1580 324 L 1595 324 L 1596 323 L 1598 323 L 1606 318 L 1610 310 L 1610 306 L 1612 302 L 1612 299 L 1613 298 L 1613 296 L 1614 295 L 1614 292 L 1615 291 L 1615 287 L 1616 286 L 1616 284 L 1617 283 L 1617 280 L 1619 276 L 1619 272 L 1620 271 L 1620 269 L 1621 268 L 1621 265 L 1623 261 L 1623 258 L 1624 257 L 1624 253 L 1625 252 L 1625 250 L 1627 246 L 1627 243 L 1628 242 L 1628 238 L 1629 237 L 1629 235 L 1631 231 L 1631 228 L 1632 227 L 1632 223 L 1633 222 L 1633 220 L 1634 219 L 1634 216 L 1635 215 L 1635 213 L 1637 209 L 1637 205 L 1638 204 L 1638 202 L 1639 201 L 1639 198 L 1641 194 L 1641 190 L 1642 189 L 1642 186 L 1643 185 L 1643 183 L 1645 179 L 1646 172 L 1647 171 L 1647 169 L 1648 168 L 1648 165 L 1650 161 L 1650 157 L 1651 156 L 1651 154 L 1652 153 L 1652 151 L 1654 147 L 1654 144 L 1655 143 L 1655 139 L 1656 138 L 1656 136 L 1657 135 L 1657 133 L 1659 129 L 1659 125 L 1661 122 L 1661 120 L 1660 119 L 1635 119 L 1632 123 L 1632 125 L 1631 126 L 1631 129 L 1630 130 L 1630 134 L 1629 135 L 1629 137 L 1627 141 L 1627 144 L 1626 145 L 1626 149 L 1625 150 L 1625 152 L 1624 153 L 1624 155 L 1622 159 L 1622 162 L 1621 163 L 1621 167 L 1620 168 L 1620 170 L 1618 174 L 1618 177 L 1617 178 L 1617 182 L 1616 183 L 1616 185 L 1614 189 L 1614 192 L 1612 196 L 1612 200 L 1611 201 L 1611 203 L 1610 204 L 1610 207 L 1608 211 L 1608 215 L 1606 219 L 1606 222 L 1604 226 L 1604 229 L 1603 230 L 1602 237 L 1600 241 L 1600 244 L 1599 245 L 1599 249 L 1598 250 L 1598 253 L 1597 254 L 1597 256 L 1595 260 L 1595 264 L 1594 265 L 1594 268 L 1592 272 L 1592 275 L 1590 278 L 1588 274 L 1587 274 L 1587 277 L 1590 281 L 1590 284 L 1588 288 L 1586 287 L 1586 285 L 1585 284 L 1585 281 L 1583 277 L 1583 273 L 1582 272 L 1582 270 L 1581 269 L 1581 267 L 1579 263 L 1579 260 L 1578 259 L 1578 256 L 1577 255 L 1577 253 L 1575 249 L 1575 246 L 1574 245 L 1573 238 L 1572 237 L 1572 235 L 1570 231 L 1569 224 L 1568 223 L 1568 221 L 1566 217 L 1565 210 L 1564 209 L 1564 207 L 1562 203 L 1562 200 L 1561 199 L 1560 192 L 1559 191 L 1559 189 L 1557 185 L 1557 182 L 1556 181 L 1556 179 L 1555 178 L 1555 176 L 1553 172 L 1552 165 L 1550 161 L 1550 158 L 1548 154 L 1548 151 L 1547 150 L 1547 147 L 1545 143 L 1545 140 L 1544 139 L 1543 134 L 1541 130 L 1534 123 L 1530 121 L 1528 121 L 1524 119 L 1513 119 L 1512 120 L 1509 120 L 1508 121 Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>
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
    doctorOrder: 8,
    runtime: {
      order: 6,
      flags: ["-cp", "--copilot-cli"],
      description: "Run as GitHub Copilot CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cp", "--copilot-cli"]
    },
    install: {
      order: 8,
      flag: "--copilot-cli",
      artifactKind: "plugin",
      probeCommand: ["copilot", "--binary-version"]
    }
  },
  {
    id: "gemini-cli",
    displayName: "Gemini CLI",
    doctorOrder: 7,
    runtime: {
      order: 5,
      flags: ["-gc", "--gemini-cli"],
      description: "Run as Gemini CLI BeforeTool hook",
      legacyTopLevelFlags: ["-gc", "--gemini-cli"]
    },
    install: {
      order: 7,
      flag: "--gemini-cli",
      artifactKind: "extension",
      probeCommand: ["gemini", "--version"]
    }
  },
  {
    id: "grok-build",
    displayName: "Grok Build",
    doctorOrder: 9,
    runtime: {
      order: 7,
      flags: ["-gb", "--grok-build"],
      description: "Run as Grok Build PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 9,
      flag: "--grok-build",
      artifactKind: "hook config",
      probeCommand: ["grok", "--version"]
    }
  },
  {
    id: "hermes-agent",
    displayName: "Hermes Agent",
    doctorOrder: 10,
    runtime: {
      order: 8,
      flags: ["-ha", "--hermes-agent"],
      description: "Run as Hermes Agent pre_tool_call hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 10,
      flag: "--hermes-agent",
      artifactKind: "plugin",
      probeCommand: ["hermes", "--version"]
    }
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    doctorOrder: 11,
    runtime: {
      order: 9,
      flags: ["-kc", "--kimi-code"],
      description: "Run as Kimi Code PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 11,
      flag: "--kimi-code",
      artifactKind: "hook config",
      probeCommand: ["kimi", "--version"]
    }
  },
  {
    id: "openclaw",
    displayName: "OpenClaw",
    doctorOrder: 12,
    install: {
      order: 12,
      flag: "--openclaw",
      artifactKind: "plugin",
      probeCommand: ["openclaw", "--version"]
    }
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    doctorOrder: 13,
    install: {
      order: 13,
      flag: "--opencode",
      artifactKind: "plugin",
      probeCommand: ["opencode", "--version"]
    }
  },
  {
    id: "pi",
    displayName: "Pi",
    doctorOrder: 14,
    install: {
      order: 14,
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
`;var lu='<script id="ccsn-data" type="application/json">';function cu(A){return au.replace(lu,()=>lu+JSON.stringify({token:A}).replaceAll("<","\\u003c"))}var ao="kenryu42/cc-safety-net",zy=`https://github.com/${ao}`,Wi=1e4,Jy=7,Wy="The project draft directory changed; reload the draft before applying.",Ky="audit settings are user scope only; remove the audit section from a project proposal";async function mu(A,T={}){let I=xt({label:"gui",booleans:{noOpen:["--no-open"]}},A),N=T.log??console.log,J=T.error??console.error;if(I.errors.length>0){for(let ne of I.errors)J(ne);return J("Usage: cc-safety-net gui [--no-open]"),1}let K=await Yy(c,T);if(N(`CC Safety Net policy GUI: ${K.url}`),!I.flags.noOpen)try{await(T.openBrowser??a0)(K.url)}catch(ne){J(`Failed to open browser: ${ne instanceof Error?ne.message:String(ne)}`),J(`Open this URL manually: ${K.url}`)}if(T.keepAlive===!1)return await K.close(),0;return await s0(K),0}async function Yy(A,T={}){let I=Gy(24).toString("base64url"),N={dir:null,revision:0},J=qy((oe,de)=>{Xy(A,oe,de,I,T,N)});await new Promise((oe,de)=>{J.once("error",de),J.listen(0,"127.0.0.1",()=>{J.off("error",de),oe()})});let ne=`http://127.0.0.1:${J.address().port}`;return{origin:ne,token:I,url:`${ne}/?token=${encodeURIComponent(I)}`,close:()=>i0(J)}}async function Xy(A,T,I,N,J,K){let ne=A(),oe=new URL(T.url??"/","http://127.0.0.1");if(T.method==="GET"&&oe.pathname==="/favicon.ico"){I.writeHead(204,{"cache-control":"no-store"}),I.end();return}if(!n0(T,oe,N)){ht(I,403,{error:"Forbidden"});return}if(T.method==="GET"&&oe.pathname==="/"){o0(I,cu(N));return}if(T.method==="GET"&&oe.pathname==="/api/policy"){let de=cd(ne,J),ue=E(ne,zi(J));ht(I,200,{...de,configState:$e(ue),...ue.policyScopes?{projectPolicy:{path:b(J.cwd??process.cwd()),weakenings:ue.policyScopes.weakenings}}:{},destructiveCommandRules:W,secretPatterns:Xe,version:wt(),preview:de.errors.length>0?null:De(de.policy,ne.env)});return}if(T.method==="POST"&&oe.pathname==="/api/policy/preview"){let de=await or(T);if(!de.ok){ht(I,de.status,{errors:[de.error]});return}let ue=dd(ne,de.value);ht(I,ue.errors.length>0?400:200,ue);return}if(T.method==="POST"&&oe.pathname==="/api/policy/explain"){let de=await or(T);if(!de.ok){ht(I,de.status,{errors:[de.error]});return}let ue=de.value;if(ue===null||typeof ue.command!=="string"){ht(I,400,{errors:["command must be a string"]});return}let ve=Qn(ue.policy,ne.home);if(ve.length>0){ht(I,400,{errors:ve});return}ht(I,200,e0(ne,ue.command,ue.policy,J));return}if(T.method==="POST"&&oe.pathname==="/api/policy"){let de=await or(T);if(!de.ok){ht(I,de.status,{errors:[de.error]});return}let ue=zt(ne,de.value,J);ht(I,ue.errors.length>0?400:200,ue);return}if(T.method==="POST"&&oe.pathname==="/api/reset"){ht(I,200,zt(ne,ee,J));return}if(T.method==="POST"&&oe.pathname==="/api/repair"){ht(I,200,ud(ne,J));return}if(T.method==="POST"&&oe.pathname==="/api/policy/project/choose-directory"){let de=await(J.chooseDirectory??Vi)();if("path"in de)K.dir=de.path,K.revision+=1;ht(I,200,{cancelled:"cancelled"in de,..."error"in de?{error:de.error}:{}});return}if(T.method==="GET"&&oe.pathname==="/api/policy/project"){let de=gu(K,J),ue=du(de,ne.home),ve=er(ne,J);ht(I,200,{path:b(de),revision:K.revision,baseline:ve.baseline,userPolicyDiagnostics:ve.diagnostics,projection:ue.projection,projectionDiagnostics:ue.diagnostics,canPickDirectory:qi(process.platform,process.env)});return}if(T.method==="POST"&&oe.pathname==="/api/policy/project/diff"){let de=await uu(ne,T,I,K,J);if(!de)return;let ue=du(de.dir,ne.home),ve=er(ne,J).baseline,xe=Q(ve,le(de.proposal,ne.home).policy);ht(I,200,{rows:Jr(Q(ve,ue.projection).policy,xe.policy,!1),weakenings:xe.weakenings,existingFileDiagnostics:ue.diagnostics});return}if(T.method==="POST"&&oe.pathname==="/api/policy/project/apply"){let de=await uu(ne,T,I,K,J);if(!de)return;let ue=Qy(de.dir,de.proposal,ne.home);ht(I,ue.errors.length>0?500:200,ue);return}if(T.method==="GET"&&oe.pathname==="/api/activity"){let de=re(ne,J),ue=t0(oe.searchParams.get("days"),de);if(ue===null){ht(I,400,{error:`days must be an integer between 1 and ${de}`});return}ht(I,200,ru(ne,ue,J.activityLogsDir));return}if(T.method==="POST"&&oe.pathname==="/api/rules/choose-directory"){ht(I,200,await Vi());return}if(T.method==="GET"&&oe.pathname==="/api/rules"){let de=X(ne,zi(J)),ue=new Map(de.rules.map((ve)=>[ve.name,ve]));ht(I,200,{projectPath:J.cwd??process.cwd(),canPickDirectory:qi(process.platform,process.env),rulebooks:de.rulebooks.map((ve)=>({source:ve.source,spec:ve.spec,name:ve.name,version:ve.version,rules:ve.rules.flatMap((xe)=>{let Se=ue.get(xe);if(!Se)return[];return[{name:Se.name,command:Se.command,subcommand:Se.subcommand,block_args:Se.block_args,reason:Se.reason}]})})),errors:de.errors,warnings:de.warnings});return}if(T.method==="GET"&&oe.pathname==="/api/star/context"){ht(I,200,await(J.fetchStarContext??(()=>f0(ne,{logsDir:J.activityLogsDir})))());return}if(T.method==="POST"&&oe.pathname==="/api/star"){let de=await(J.starRepo??l0)();ht(I,200,de.ok?{ok:!0}:{ok:!1,fallbackUrl:zy});return}if(T.method==="GET"&&oe.pathname==="/api/integrations"){ht(I,200,await(J.fetchIntegrations??(()=>c0(ne)))());return}if(T.method==="GET"&&oe.pathname==="/api/health"){ht(I,200,await(J.fetchHealth??u0)());return}if(T.method==="POST"&&(oe.pathname==="/api/install"||oe.pathname==="/api/uninstall")){let de=await or(T);if(!de.ok){ht(I,de.status,{errors:[de.error]});return}let ue=de.value?.target;if(typeof ue!=="string"||!Ht.some((xe)=>xe.target===ue)){ht(I,400,{error:"unknown target"});return}let ve=oe.pathname==="/api/install"?"install":"uninstall";ht(I,200,await(J.runIntegration??p0)(ve,ue));return}ht(I,404,{error:"Not found"})}function zi(A){return{...A,cwd:A.cwd??process.cwd()}}function gu(A,T){return A.dir??T.cwd??process.cwd()}function du(A,T){let I=b(A),N=By(I)?mn(I):{value:void 0,errors:[]},J=le(N.value,T);return{projection:J.policy,diagnostics:[...N.errors,...J.diagnostics]}}async function uu(A,T,I,N,J){let K=gu(N,J),ne=N.revision,oe=await or(T);if(!oe.ok)return ht(I,oe.status,{errors:[oe.error]}),null;let de=oe.value;if(typeof de?.revision!=="number")return ht(I,400,{errors:["revision must be a number"]}),null;if(de.revision!==ne)return ht(I,409,{errors:[Wy]}),null;let ue=Zy(de.proposal,A.home);if(ue.length>0)return ht(I,400,{errors:ue}),null;return{dir:K,proposal:de.proposal}}function Zy(A,T){let I=Qn(A,T);if(I.length>0)return I;return A?.audit===void 0?[]:[Ky]}function Qy(A,T,I){let N=b(A),J=Wr(T,C(T,I));try{return g(i(v(A,"project policy"),N),`${JSON.stringify(J,null,2)}
`),{path:N,errors:[]}}catch(K){return{path:N,errors:[K instanceof Error?K.message:String(K)]}}}function e0(A,T,I,N){let J=C(I,A.home),K=E(A,zi(N)),ne=Le({rules:K.policy.rules,transparentWrappers:K.policy.transparentWrappers,safety:Me(J.safety),worktreeMode:J.workflow.worktree_mode,destructiveCommandProtectionEnabled:J.destructive_command_protection.enabled,destructiveCommandRuleOverrides:J.destructive_command_protection.overrides,destructiveCommandAllowPaths:J.destructive_command_protection.allow_paths,secretProtection:{enabled:J.secret_protection.enabled,disabledRules:Fe(J.secret_protection.overrides),denyPaths:J.secret_protection.deny_paths,allowPaths:J.secret_protection.allow_paths}});return zn(T,{policySnapshot:ne,cwd:N.cwd,userConfigDir:N.userConfigDir},A)}function t0(A,T){if(A===null)return Math.min(Jy,T);let I=Number(A);if(!Number.isInteger(I)||I<1||I>T)return null;return I}function n0(A,T,I){if(T.searchParams.get("token")!==I)return!1;if(A.method!=="POST")return!0;return A.headers["x-cc-safety-net-token"]===I}var r0=1048576;async function or(A){let T=[],I=0;for await(let N of A){let J=N;if(I+=J.byteLength,I>r0)return{ok:!1,status:413,error:"Request body is too large"};T.push(J)}try{return{ok:!0,value:JSON.parse(Buffer.concat(T).toString("utf-8")||"{}")}}catch(N){return{ok:!1,status:400,error:`Invalid JSON: ${N instanceof Error?N.message:String(N)}`}}}function o0(A,T){A.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),A.end(T)}function ht(A,T,I){A.writeHead(T,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),A.end(JSON.stringify(I))}function i0(A){return new Promise((T,I)=>{A.close((N)=>N?I(N):T())})}function s0(A){return new Promise((T)=>{let I=()=>{process.off("SIGINT",N),process.off("SIGTERM",N)},N=()=>{I(),A.close().then(T)};process.once("SIGINT",N),process.once("SIGTERM",N)})}function a0(A){let T=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",I=process.platform==="win32"?["/c","start","",A]:[A];return new Promise((N,J)=>{let K=fu(T,I,{detached:!0,stdio:"ignore"}),ne=(de)=>{K.off("spawn",oe),J(de)},oe=()=>{K.off("error",ne),K.unref(),N()};K.once("error",ne),K.once("spawn",oe)})}async function l0(A="gh",T=Wi){return{ok:await Ji(A,["api","-X","PUT",`/user/starred/${ao}`],T)===0}}async function c0(A,T={}){let I=await gr((J)=>Cn({environment:A,cwd:process.cwd(),openCodeVersion:J}).status!=="n/a",T.fetcher),N=d0(A,I);return{targets:Ot.map((J)=>{let K=N.find((ne)=>ne.platform===J.id);return{target:J.id,label:Lt(J.id),version:I.versions[J.id]??null,status:K?.configured?"active":K?.detected?"disabled":K?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:I.version,nodeVersion:I.nodeVersion,platform:I.platform}}}function d0(A,T){return Sn(A,process.cwd(),{ampPluginListOutput:T.ampPluginListOutput,codexPluginListOutput:T.codexPluginListOutput,copilotCliVersion:T.versions["copilot-cli"],openCodeVersion:T.versions.opencode,openCodePluginListOutput:T.openCodePluginListOutput})}async function u0(A={}){let T=await(A.checkUpdates??Kt)();return{update:{latestVersion:T.latestVersion??null,updateAvailable:T.updateAvailable}}}var pu=Promise.resolve();function p0(A,T,I={}){let N=async()=>{let K=[],{log:ne,error:oe}=console;console.log=(...de)=>K.push(de.map(String).join(" ")),console.error=console.log;try{return{ok:await Zn(A,[],{selectTargets:async()=>[T],output:new Vy({write(ue,ve,xe){K.push(String(ue).replace(/\n$/,"")),xe()}}),...I})===0,output:K.join(`
`)}}finally{console.log=ne,console.error=oe}},J=pu.then(N);return pu=J.then(()=>{return},()=>{return}),J}async function f0(A,T={}){let[I,N,J]=await Promise.all([m0(T.command),g0(T.fetchRepo),Promise.resolve(dr(A,re(A),T.logsDir).totalBlocked)]);return{starred:I,starCount:N,blockedTotal:J}}async function m0(A="gh",T=Wi){if(await Ji(A,["auth","status"],T)!==0)return null;let I=await Ji(A,["api",`/user/starred/${ao}`],T);if(I===0)return!0;if(I===null)return null;return!1}function Ji(A,T,I){return new Promise((N)=>{let J=fu(A,T,{stdio:"ignore",windowsHide:!0}),K=!1,ne=setTimeout(()=>{J.kill(),oe(null)},I),oe=(de)=>{if(K)return;K=!0,clearTimeout(ne),N(de)};J.once("error",()=>oe(null)),J.once("close",oe)})}async function g0(A=fetch){try{let T=await A(`https://api.github.com/repos/${ao}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(Wi)});if(!T.ok)return null;let I=await T.json();return typeof I.stargazers_count==="number"?I.stargazers_count:null}catch{return null}}function h0(A){if(A[0]!=="help")return!1;let T=A[1];if(!T)vi(),process.exit(0);if(Jn(T))process.exit(0);console.error(`Unknown command: ${T}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var y0={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),Jn("hook",console.error),process.exit(1)},install:async(A)=>{process.exit(await Zn("install",A))},update:async(A)=>{process.exit(await Ti(A))},uninstall:async(A)=>{process.exit(await Zn("uninstall",A))},rule:async(A)=>{process.exit(await eu(c(),A))},policy:async(A)=>{process.exit(await gd(c(),A))},status:async(A)=>{if(Ut(xt({label:"status"},A).errors))process.exit(1);nu(c())},statusline:async(A)=>{let T=xt({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},A);if(T.errors.length===0&&T.flags.claudeCode){await Bi(c());return}if(Ut(T.errors),!T.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");Jn("statusline",console.error),process.exit(1)},doctor:async(A)=>{let T=di(A);if(!T)process.exit(1);let I=await _l(c(),{json:T.json,skipUpdateCheck:T.skipUpdateCheck});process.exit(I)},logs:async(A)=>{process.exit(await ns(c(),A))},gui:async(A)=>{process.exit(await mu(A))},explain:async(A)=>{process.exit(await Gl(c(),A))}};async function v0(A){let T=xt({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},A);if(h0(A))return;let I=A[0],N=I?cr(I):void 0;if(T.help&&N&&N.name!=="rule")Jn(N.name),process.exit(0);if(!I||T.help&&!N)vi(),process.exit(0);if(T.flags.version)Vl(),process.exit(0);if(N){await y0[N.name](A.slice(1));return}if(I==="--statusline"){await Bi(c());return}console.error(I.startsWith("-")?`Unknown option: ${I}`:`Unknown command: ${I}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{v0 as runCli};
