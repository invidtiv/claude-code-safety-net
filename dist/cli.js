import{a,s,Ne,tt,T,ht,nt,c,n,rt,P,S,pe,bt,m,_e,x,it,l,o,w,i,se,r,g,me,H,vt,St,p,ge,he,wt,L,Z,ae,C,Ct,I,h,Pe,W,u,A,X,st,at,M,E,O,ye,be,Me,Et,d,e,Fe,Ie,$e,xe,ct,lt,ce,Ae,le,je,Q,B,Ue,ve,z,ut,V,ee,te,ue,dt,pt,k,F,Ge,We,Be,R,ze,Oe,Ve,y,t,ne,Se,b,v,D,kt,qe,Ke,f,q}from"./chunks/index-babcfevy.js";import{Xe}from"./chunks/index-zn9jbem8.js";import{Je,Ce}from"./chunks/index-xgqj6wdm.js";import{Qe}from"./chunks/index-kbfn9m3a.js";import"./chunks/index-1cn93587.js";import{oe,K,et,U,G}from"./chunks/index-s9erk9vr.js";var Wp=["-h","--help"];function mn(_,N){let j=Object.entries(_.booleans??{}),J=Object.entries(_.values??{}),Y=Object.entries(_.lists??{}),re=Object.fromEntries(j.map(([Te])=>[Te,!1])),ie={},de=Object.fromEntries(Y.map(([Te])=>[Te,[]])),fe=[],we=[],ke=!1,Re=-1;for(let[Te,Ee]of N.entries()){if(Te<=Re)continue;if(Ee==="--"){fe.push(...N.slice(Te+1));break}if(Wp.includes(Ee)){ke=!0;continue}let De=j.find(([,Ye])=>Ye.includes(Ee));if(De){re[De[0]]=!0;continue}let He=J.find(([,Ye])=>Ye.includes(Ee));if(He){let Ye=N[Te+1];if(Ye===void 0||Ye.startsWith("-")){we.push(`${Ee} requires a value`);continue}ie[He[0]]=Ye,Re=Te+1;continue}let Le=Y.find(([,Ye])=>Ye.includes(Ee));if(Le){let Ye=N.slice(Te+1),tn=Ye.findIndex((on)=>on.startsWith("-")),rn=Ye.slice(0,tn===-1?Ye.length:tn);if(rn.length===0){we.push(`${Ee} requires at least one value`);continue}de[Le[0]]=[...de[Le[0]]??[],...rn],Re=Te+rn.length;continue}if(Ee.startsWith("-")){we.push(`Unknown option for ${_.label}: ${Ee}`);continue}if(_.positionals==="tail"){fe.push(...N.slice(Te));break}fe.push(Ee)}if(_.positionals!=="list"&&_.positionals!=="tail")we.push(...fe.map((Te)=>`Unexpected argument for ${_.label}: ${Te}`));return{flags:re,values:ie,lists:de,positionals:fe,help:ke,errors:we}}function $n(_){for(let N of _)console.error(N);return _.length>0}import{readdirSync as nf,statSync as qs,unlinkSync as tf}from"node:fs";import{basename as Vs,dirname as rf,isAbsolute as of,join as sf,relative as af,resolve as lf,sep as cf}from"node:path";var Us=(_)=>{let N=Date.now()-new Date(_).getTime();if(!Number.isFinite(N))return"";let j=Math.floor(N/60000),J=Math.floor(j/60),Y=Math.floor(J/24);if(Y>0)return`${Y}d ago`;if(J>0)return`${J}h ago`;if(j>0)return`${j}m ago`;return"just now"},Mo=(_)=>{let N=(_??"").trim().split(/\s+/).filter((Y)=>Y&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(Y)),j=N[0]?.split("/").pop();if(!j)return null;let J=N[1];return J&&/^[a-z][a-z0-9-]*$/.test(J)?`${j} ${J}`:j};function Gs(_){let N=(Y)=>`${Y.sessionId}
${Mo(Y.segment||Y.command)}`,j=_.filter((Y)=>Y.decision!=="allow"),J=j.filter((Y)=>Y.sessionId).reduce((Y,re)=>Y.set(N(re),(Y.get(N(re))??0)+1),new Map);return new Set(j.filter((Y)=>Y.failureStage||(J.get(N(Y))??0)>=2))}import{existsSync as zp,readdirSync as Yp,readFileSync as Zp}from"node:fs";import{join as Xp}from"node:path";function zn(_,N){try{return Yp(_,{withFileTypes:!0,encoding:"utf8"}).flatMap((j)=>{let J=Xp(_,j.name);if(j.isDirectory())return zn(J,N);if(j.name.endsWith(".jsonl"))return[J];return[]})}catch{if(N&&zp(_))N.count++;return[]}}var Qp=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function ef(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let N=_;if(typeof N.ts!=="string"||typeof N.command!=="string")return!1;return Qp.every((j)=>N[j]===void 0||typeof N[j]==="string")}function $t(_,N){try{return Zp(_,"utf-8").split(`
`).filter(Boolean).flatMap((j)=>{try{let J=JSON.parse(j);if(!ef(J)){if(N)N.count++;return[]}return[J]}catch{if(N)N.count++;return[]}})}catch{if(N)N.count++;return[]}}function gn(_){return Array.from(_,(N)=>{let j=N.charCodeAt(0);if(j<=31||j>=127&&j<=159)return`\\x${j.toString(16).padStart(2,"0")}`;return N}).join("")}function df(_,N){let j=oe(_),J=mn({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},N);if($n(J.errors))return null;if(J.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(J.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let Y=J.values.limit===void 0?20:Bs(J.values.limit);if(Y===null)return console.error("--limit must be a positive number"),null;let re=J.values.since===void 0?Math.min(30,j):Bs(J.values.since);if(re===null||re>j)return console.error(`--since must be a positive number of days no greater than ${j}`),null;let ie={limit:Y,limitExplicit:J.values.limit!==void 0,since:re,sinceExplicit:J.values.since!==void 0,all:J.flags.all,json:J.flags.json,suspect:J.flags.suspect,pruneLegacy:J.flags.pruneLegacy,dryRun:J.flags.dryRun,id:J.values.id,agent:J.values.agent,rule:J.values.rule,session:J.values.session,project:J.values.project===void 0?void 0:lf(J.values.project)};if(ie.id&&(ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.sinceExplicit||ie.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ie.pruneLegacy&&(ie.id!==void 0||ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.all||ie.sinceExplicit||ie.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ie.dryRun&&!ie.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ie}async function Ks(_,N,j={}){let J=df(_,N);if(!J)return 1;let Y=j.logsDir??U(_);if(J.pruneLegacy)return uf(Y,J.json,J.dryRun);if(!Y)return console.log(J.json?"[]":J.id?`No retained audit log entry found for id ${gn(J.id)}.`:"No audit log entries found."),0;K(_,Y);let re={count:0},ie=zn(Y,re).flatMap((Re)=>$t(Re,re).map((Te)=>({entry:Te,file:Re})));if(re.count>0)console.error(`warning: ${re.count} audit log ${re.count===1?"source":"sources"} could not be read; these results are incomplete`);if(J.id)return gf(ie,J,j.timeZone);let de=Date.now()-J.since*24*60*60*1000,fe=ie.filter((Re)=>yf(Re,J,Y,de)),we=J.suspect?Gs(fe.map((Re)=>Re.entry)):null,ke=(we?fe.filter((Re)=>we.has(Re.entry)):fe).sort((Re,Te)=>Date.parse(Te.entry.ts)-Date.parse(Re.entry.ts)).slice(0,J.limit);if(J.json)return console.log(JSON.stringify(ke.map((Re)=>Re.entry),null,2)),0;if(ke.length===0)return console.log("No audit log entries found."),0;for(let Re of ke)console.log(bf(Re.entry,j.timeZone));return 0}function uf(_,N,j){let J=_?ff(_).map((de)=>sf(_,de)):[];if(j)return pf(J,N);let Y=[],re=0,ie=0;for(let de of J){let fe=qs(de,{throwIfNoEntry:!1})?.size??0,we=mf(de);if(we){Y.push(`${Vs(de)}: ${we}`);continue}re++,ie+=fe}if(N)return console.log(JSON.stringify({removedFiles:re,removedBytes:ie,failedFiles:Y.length})),Y.length===0?0:1;console.log(re===0&&Y.length===0?"No legacy audit log files found.":`Removed ${re} legacy audit log ${re===1?"file":"files"} (${Js(ie)}).`);for(let de of Y)console.error(`Could not remove ${gn(de)}`);if(console.log("Nested v2 audit logs were not changed."),re>0)console.log("This deletion cannot be undone.");return Y.length===0?0:1}function pf(_,N){let j=_.reduce((J,Y)=>J+(qs(Y,{throwIfNoEntry:!1})?.size??0),0);if(N)return console.log(JSON.stringify({dryRun:!0,files:_.length,bytes:j})),0;if(console.log(_.length===0?"No legacy audit log files found.":`Would remove ${_.length} legacy audit log ${_.length===1?"file":"files"} (${Js(j)}).`),console.log("Nested v2 audit logs are not included."),_.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function ff(_){try{return nf(_,{withFileTypes:!0}).filter((N)=>N.isFile()&&N.name.endsWith(".jsonl")).map((N)=>N.name)}catch{return[]}}function mf(_){try{return tf(_),null}catch(N){return N instanceof Error?N.message:String(N)}}function Js(_){let N=["B","KiB","MiB","GiB"],j=Math.min(Math.floor(Math.log2(Math.max(_,1))/10),N.length-1);return`${Math.round(_/1024**j*10)/10} ${N[j]}`}function gf(_,N,j){let J=_.filter((re)=>re.entry.id===N.id);if(J.length>1)return console.error(`Multiple audit log entries found for id ${gn(N.id??"")}.`),1;if(N.json)return console.log(JSON.stringify(J.map((re)=>re.entry),null,2)),0;let Y=J[0];if(!Y)return console.log(`No retained audit log entry found for id ${gn(N.id??"")}.`),0;return console.log(wf(Y.entry,j)),0}function yf(_,N,j,J){if(!N.all&&_.entry.decision==="allow")return!1;if(Date.parse(_.entry.ts)<J)return!1;if(N.agent!==void 0&&_.entry.agent!==N.agent)return!1;if(N.rule!==void 0&&_.entry.ruleId!==N.rule)return!1;if(N.session!==void 0&&!hf(_,j,N.session))return!1;if(N.project!==void 0&&!vf(_.entry.cwd,N.project))return!1;return!0}function hf(_,N,j){if(_.entry.sessionId===j)return!0;return rf(_.file)===N&&Vs(_.file,".jsonl")===j}function vf(_,N){if(!_)return!1;let j=af(N,_);return j!==".."&&!j.startsWith(`..${cf}`)&&!of(j)}function bf(_,N){let j=gn(_.id??"-"),J=gn(_.decision??"deny"),Y=_.cwd?`  [${gn(_.cwd)}]`:"",re=_.segment||_.command,ie=re===_.command?"":"↳ ",de=re.length>50?`${re.slice(0,50)}…`:re;return`${j.padEnd(16)}  ${gn(Ws(_.ts,N))}  ${J.padEnd(5)}  ${gn(_.agent??"-").padEnd(15)}  ${gn(_.ruleId??"-").padEnd(20)}  ${ie}${gn(de)}${Y}`}function wf(_,N){let j=(Y)=>gn(Y===void 0||Y===null||Y===""?"-":Y),J=_.shape?`${_.agent??"-"} (shape: ${_.shape})`:_.agent??"-";return[`id:        ${j(_.id)}`,`ts:        ${j(Ws(_.ts,N))}`,`decision:  ${j(_.decision)}`,`agent:     ${j(J)}`,`level:     ${j(_.level)}`,`tool:      ${j(_.toolName)}`,`rule:      ${j(_.ruleId)}`,`intent:    ${j(_.intent)}`,`stage:     ${j(_.failureStage)}`,`error:     ${j(_.errorCode)}`,`session:   ${j(_.sessionId)}`,`cwd:       ${j(_.cwd)}`,`version:   ${j(_.v)}`,`truncated: ${j(_.truncated===!0?"yes":void 0)}`,`reason:    ${j(_.reason)}`,`command:   ${j(_.command)}`,`segment:   ${j(_.segment)}`].join(`
`)}function Ws(_,N){let j=new Date(_);if(Number.isNaN(j.getTime()))return _;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:N}).format(j)}function Bs(_){let N=Number(_);return Number.isFinite(N)&&N>0?N:null}var zs={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var Ys={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var Zs={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var Uo=["npx","--offline","--no-install","@deepseek-ai/dsh","--version"],Xs=["cursor-agent","--version"],Rr=[{id:"antigravity-cli",displayName:"Antigravity CLI",doctorOrder:3,runtime:{order:1,flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:2,flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",doctorOrder:1,runtime:{order:2,displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{order:3,flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",doctorOrder:4,runtime:{order:3,flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{order:4,flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",doctorOrder:10,runtime:{order:8,flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{order:10,flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",doctorOrder:9,runtime:{order:7,flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{order:9,flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",doctorOrder:11,runtime:{order:9,flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{order:11,flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",doctorOrder:12,runtime:{order:10,flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{order:12,flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",doctorOrder:13,runtime:{order:11,flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{order:13,flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",doctorOrder:14,install:{order:14,flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",doctorOrder:15,install:{order:15,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",doctorOrder:16,install:{order:16,flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",doctorOrder:5,runtime:{order:4,flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{order:5,flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"deepseek-harness",displayName:"DeepSeek Harness",doctorOrder:6,install:{order:6,flag:"--deepseek-harness",artifactKind:"package",probeCommand:Uo}},{id:"devin",displayName:"Devin CLI",doctorOrder:7,runtime:{order:5,flags:["-dv","--devin"],description:"Run as Devin CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:7,flag:"--devin",artifactKind:"hook config",probeCommand:["devin","--version"]}},{id:"droid",displayName:"Factory Droid",doctorOrder:8,runtime:{order:6,flags:["-fd","--droid"],description:"Run as Factory Droid PreToolUse hook",legacyTopLevelFlags:[]},install:{order:8,flag:"--droid",artifactKind:"hook config",probeCommand:["droid","--version"]}},{id:"amp",displayName:"Amp Code",doctorOrder:2,install:{order:1,flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],Er=Rr.slice().sort((_,N)=>_.doctorOrder-N.doctorOrder).map((_)=>_.id),Zt=Rr.filter((_)=>("runtime"in _)).slice().sort((_,N)=>_.runtime.order-N.runtime.order).map((_)=>({id:_.id,displayName:"displayName"in _.runtime?_.runtime.displayName:_.displayName,flags:_.runtime.flags,legacyFlags:"legacyFlags"in _.runtime?_.runtime.legacyFlags:[],description:_.runtime.description,legacyTopLevelFlags:_.runtime.legacyTopLevelFlags})),Pn=Rr.slice().sort((_,N)=>_.install.order-N.install.order).map((_)=>({id:_.id,..._.install})).map(({order:_,...N})=>N),kf=Object.fromEntries(Rr.map((_)=>[_.id,_.displayName]));function ln(_){return kf[_]}var Cf=Zt.map((_)=>({flags:_.flags.join(", "),description:_.description})),xf=Zt.flatMap((_)=>_.flags.map((N)=>`cc-safety-net hook ${N}`)),Qs={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...Cf,{flags:"-h, --help",description:"Show this help"}],examples:xf};var ea={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...Pn.map((_)=>({flags:_.flag,description:`Install ${ln(_.id)} ${_.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...Pn.map((_)=>`cc-safety-net install ${_.flag}`)]},na={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...Pn.map((_)=>({flags:_.flag,description:`Uninstall ${ln(_.id)} ${_.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...Pn.map((_)=>`cc-safety-net uninstall ${_.flag}`)]},ta={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var ra={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var _r={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Go=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],Bo=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],Dt={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"tool add <name...> [--cwd-arg <name>] [--project]",description:"Analyze community shell tools (user scope by default)"},{usage:"tool remove <name...> [--project]",description:"Stop analyzing declared tools"},{usage:"tool list",description:"List declared command tools in both scopes"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},{flags:"--project",description:"Use project-scope rule config with rule tool"},{flags:"--cwd-arg",argument:"<name>",description:"Name the working-directory argument with rule tool add"},...Go.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk","cc-safety-net rule tool add ops_bash","cc-safety-net rule tool add ops_run_background --cwd-arg cwd --project",...Bo,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var oa={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var ia={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var Tr=[oa,zs,ra,Ys,Dt,_r,ea,ta,na,Qs,Zs,ia];function Sf(_){return _.aliases??[]}function Ar(_){let N=_.toLowerCase();return Tr.find((j)=>j.name.toLowerCase()===N||Sf(j).some((J)=>J.toLowerCase()===N))}import{existsSync as ph}from"node:fs";import{basename as Pf}from"node:path";function Or(_,N=7,j=U(_)){let J=Date.now()-N*24*60*60*1000,Y=[],re=new Set,ie=0,de,fe,we,ke;if(j)K(_,j);let Re={count:0},Te=j?zn(j,Re):[];for(let De of Te)for(let He of $t(De,Re)){if(He.decision==="allow")continue;let Le=new Date(He.ts).getTime();if(Le>=J){if(ie++,re.add(He.sessionId??Pf(De,".jsonl")),fe===void 0||Le<=fe)de=He.ts,fe=Le;if(ke===void 0||Le>ke)we=He.ts,ke=Le;Rf(Y,He,Le)}}let Ee=Y.map((De)=>({timestamp:De.ts,command:De.command,reason:De.reason,relativeTime:Us(new Date(De.ts))}));return{totalBlocked:ie,sessionCount:re.size,recentEntries:Ee,oldestEntry:de,newestEntry:we,unreadable:Re.count}}function Rf(_,N,j){let J=_.findIndex((Y)=>j>new Date(Y.ts).getTime());if(J===-1){if(_.length<3)_.push(N);return}if(_.splice(J,0,N),_.length>3)_.pop()}import{dirname as Hf}from"node:path";import{dirname as Ef,join as _f,resolve as Tf}from"node:path";var Af="config.json";function vn(_,N,j,J){g(Of(_),`${JSON.stringify(N,null,2)}
`,j,J)}function Of(_){return typeof _==="string"?se(_):_}function Vo(_){return{errors:ce($f(_),": "," "),ruleNames:new Set(je(_).map((N)=>N.toLowerCase()))}}var If="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",sa="must match pattern (letters, numbers, hyphens, underscores)";function $f(_){if(!aa(_))return[e([],"Config must be an object")];return[..._.version===1?[]:[e(["version"],"must be 1")],...Df(_.rules)]}function Df(_){if(_===void 0)return[];if(!Array.isArray(_))return[e(["rules"],"must be an array")];return[..._.flatMap((N,j)=>aa(N)?Lf(N,["rules",j]):[e(["rules",j],"must be an object")]),...Fe(_)]}function Lf(_,N){return[...qo(_.name,[...N,"name"],"required string",p,If),...qo(_.command,[...N,"command"],"required string",E,sa),..._.subcommand===void 0?[]:qo(_.subcommand,[...N,"subcommand"],"must be a string if provided",E,sa),...Nf(_.block_args,[...N,"block_args"]),...jf(_.reason,[...N,"reason"]),..._.intent===void 0||Ae(_.intent)?[]:[e([...N,"intent"],Ie)]]}function qo(_,N,j,J,Y){if(typeof _!=="string")return[e(N,j)];return J.test(_)?[]:[e(N,Y)]}function Nf(_,N){if(!Array.isArray(_))return[e(N,"required array")];if(_.length===0)return[e(N,"must have at least one element")];return _.flatMap((j,J)=>{if(typeof j!=="string")return[e([...N,J],"must be a string")];return j===""?[e([...N,J],"must not be empty")]:[]})}function jf(_,N){if(typeof _!=="string")return[e(N,"required string")];if(_==="")return[e(N,"must not be empty")];return _.length>O?[e(N,`must be at most ${O} characters`)]:[]}function aa(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function Ko(_){let N=la(_);if(!N.ok)return N.result;return Vo(N.parsed)}function la(_){let N=[],j=new Set;try{let J=typeof _==="string"?se(_):_,Y=r(J);if(Y===null)return N.push(`File not found: ${J.path}`),{ok:!1,result:{errors:N,ruleNames:j}};if(!Y.trim())return N.push("Config file is empty"),{ok:!1,result:{errors:N,ruleNames:j}};return{ok:!0,parsed:JSON.parse(Y)}}catch(J){if(J instanceof o)return N.push(J.message),{ok:!1,result:{errors:N,ruleNames:j}};let Y=J instanceof Error?J.message:String(J);return N.push(J instanceof SyntaxError?"Invalid JSON":Y),{ok:!1,result:{errors:N,ruleNames:j}}}}function Ir(_){return Tf(_,".safety-net.json")}function Un(_){let N=la(_);if(!N.ok)return N.result;let j=ct(N.parsed);return{errors:j.errors,ruleNames:j.sources}}function Lt(_,N={}){return _f(Ef(Pe(_,N)),Af)}function ca(_,N,j){let J;try{if(r(N)===null)return{path:_,exists:!1,valid:!1,ruleCount:0};J=Un(N),J.errors.push(...B(_,j))}catch(Y){if(!(Y instanceof o))throw Y;J={errors:[Y.message],ruleNames:new Set}}return{path:_,exists:!0,valid:J.errors.length===0,ruleCount:J.ruleNames.size,...J.errors.length>0?{errors:J.errors}:{}}}function Ff(_,N){return{source:N,name:_.name,command:_.command,subcommand:_.subcommand,blockArgs:[..._.block_args],reason:_.reason}}function da(_,N){let j=W(_),J=I(N),Y=Hf(j),re=Q(_,{cwd:N,userConfigPath:j,projectConfigPath:J,userConfigDir:Y}),ie=X(_,{cwd:N,userConfigPath:j,projectConfigPath:J,userConfigDir:Y}),de=new Map(re.rulebooks.flatMap((fe)=>fe.rules.map((we)=>[we,fe.source])));return{userConfig:ca(j,ie.userConfigTarget,ie.userScope),projectConfig:ca(J,ie.projectConfigTarget,ie.projectScope),effectiveRules:re.rules.map((fe)=>Ff(fe,de.get(fe.name)??"project"))}}var Mf=[{flag:n.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:n.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:n.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:n.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:n.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:n.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:n.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:n.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"},{flag:n.projectTightenOnly,description:"Ignore project policy settings that weaken the user policy",defaultBehavior:"off"}];function ua(_){return[...Mf.map((N)=>({name:N.flag.name,value:pe(N.flag,_.env),isSet:bt(N.flag,_.env),legacyName:N.flag.legacyName,legacyValue:N.flag.legacyName?_.env.get(N.flag.legacyName):void 0,legacyIsSet:N.flag.legacyName?_.env.get(N.flag.legacyName)!==void 0:void 0,description:N.description,defaultBehavior:N.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:_.env.get("CC_SAFETY_NET_HOME"),isSet:_.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var pa={error:0,warning:1,info:2},Uf=["policy","config","audit"];function Gf(_){return _.map((N)=>{if(N==="ownership")return"is not owned by the current user";if(N==="permissions")return"has unsafe permissions";if(N==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var Bf=[{derive:(_)=>_.hooks.length>0&&_.hooks.every((N)=>!N.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(_)=>_.hooks.filter((N)=>N.inspectionStatus==="failed").map((N)=>{let j=ln(N.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${j} inspection failed`,detail:`Doctor could not verify the ${j} integration configuration.`,fixHint:`Correct the reported ${j} configuration error, then run \`cc-safety-net doctor\` again.`,integration:N.platform}})},{derive:(_)=>_.userConfig.exists&&!_.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.userConfig.path}]:[]},{derive:(_)=>_.projectConfig.exists&&!_.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.projectConfig.path}]:[]},{derive:(_)=>_.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${_.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(_)=>_.v2Leftovers&&_.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${_.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(_)=>_.legacyConfigs&&_.legacyConfigs.length>0?[{checkId:"config.legacy-ignored",severity:"warning",title:"Legacy inline rule configs are ignored",detail:`CC Safety Net no longer loads these files, so their rules enforce nothing: ${_.legacyConfigs.join(", ")}.`,fixHint:"Run `cc-safety-net rule migrate` to convert them (add `--cleanup` to delete each file once it is converted), then rerun doctor."}]:[]},{derive:(_)=>{let N=_.environment.find((j)=>j.name==="CC_SAFETY_NET_AUDIT_SCOPE");return rt(N?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Uf.map((_)=>({derive:(N)=>N.posture.directories.filter((j)=>j.kind===_&&j.status==="unsafe").map((j)=>({checkId:`posture.${_}-directory-unsafe`,severity:"error",title:`${_[0]?.toUpperCase()}${_.slice(1)} directory is unsafe`,detail:`The ${_} directory ${Gf(j.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...j.path?{path:j.path}:{}}))})),{derive:(_)=>{let N=[..._.effectiveSafety.weakenedRuleOverrides].sort();return N.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${N.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${N.join(", ")}.`}]:[]}}];function fa(_){return Bf.flatMap((N,j)=>N.derive(_).map((J,Y)=>({finding:J,catalogOrder:j,occurrence:Y}))).sort((N,j)=>pa[N.finding.severity]-pa[j.finding.severity]||N.catalogOrder-j.catalogOrder||N.occurrence-j.occurrence).map((N)=>N.finding)}function Dn(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var qf=(_)=>Dn()?`\x1B[32m${_}\x1B[0m`:_,Vf=(_)=>Dn()?`\x1B[33m${_}\x1B[0m`:_,Kf=(_)=>Dn()?`\x1B[34m${_}\x1B[0m`:_,Jf=(_)=>Dn()?`\x1B[36m${_}\x1B[0m`:_,Wf=(_)=>Dn()?`\x1B[31m${_}\x1B[0m`:_,zf=(_)=>Dn()?`\x1B[2m${_}\x1B[0m`:_,Yf=(_)=>Dn()?`\x1B[1m${_}\x1B[0m`:_,Ze={green:qf,yellow:Vf,blue:Kf,cyan:Jf,red:Wf,dim:zf,bold:Yf},Zf="\x1B[0m",Xf=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function Qf(_){let N=_;return()=>(N=(N*1664525+1013904223)%4294967296,N/4294967296)}function em(_){let N=[...Xf],j=Qf(_);for(let J=N.length-1;J>0;J--){let Y=Math.floor(j()*(J+1)),re=N[J];N[J]=N[Y],N[Y]=re}return N}function nm(_,N=0){if(!Dn())return"";let j=em(N);return`\x1B[38;5;${j[_%j.length]}m`}function ma(_,N,j=0){if(!Dn())return`"${_}"`;return`${nm(N,j)}"${_}"${Zf}`}function $r(_){return _==="default"?"built-in default":`${_} policy`}var tm=new RegExp("\x1B\\[[0-9;]*m","g"),Jo=(_)=>_.replace(tm,"").length;function Yn(_){let N=(_.headers??_.rows[0]??[]).map((ie,de)=>{let fe=Math.max(..._.rows.map((we)=>Jo(we[de]??"")));return Math.max(Jo(ie),fe)}),j=(ie,de)=>ie+" ".repeat(Math.max(0,de-Jo(ie))),J=(ie,de)=>de[0]+N.map((fe)=>ie.repeat(fe+2)).join(de[1])+de[2],Y=(ie)=>`│ ${ie.map((de,fe)=>j(de,N[fe]??0)).join(" │ ")} │`,re=_.headers?[`   ${Y(_.headers)}`,`   ${J("─",["├","┼","┤"])}`]:[];return[`   ${J("─",["┌","┬","┐"])}`,...re,..._.rows.map((ie)=>`   ${Y(ie)}`),`   ${J("─",["└","┴","┘"])}`].join(`
`)}function ga(_){let N=[];N.push("Hook Integration"),N.push(rm(_));let j=[],J=[];for(let Y of _){let re=ln(Y.platform);if(Y.errors&&Y.errors.length>0)for(let ie of Y.errors)if(Y.configured)j.push({platform:re,message:ie});else J.push({platform:re,message:ie})}for(let Y of j)N.push(`   Warning (${Y.platform}): ${Y.message}`);for(let Y of J)N.push(Ze.red(`   Error (${Y.platform}): ${Y.message}`));return N.join(`
`)}function rm(_){let N=["Platform","Discovery","Configuration","Inspection"],j=_.map((J)=>{let Y=ln(J.platform);if(J.inspectionStatus==="not-inspected"){let fe=Ze.dim("Not inspected");return[Y,fe,fe,fe]}let re=J.detected?Ze.green("Detected"):J.inspectionStatus==="failed"?Ze.red("Unknown"):Ze.dim("Not detected"),ie=J.configured?Ze.green("Configured"):J.detected?Ze.yellow("Not configured"):J.inspectionStatus==="failed"?Ze.red("Unknown"):Ze.dim("Not applicable"),de=J.inspectionStatus==="verified"?Ze.green("Verified"):J.inspectionStatus==="failed"?Ze.red("Failed"):Ze.dim("Not applicable");return[Y,re,ie,de]});return Yn({headers:N,rows:j})}function ya(_){let j=["Guard Engine Verification",`   Synthetic self-test: ${_.failed>0?Ze.red(`${_.passed}/${_.total} FAIL`):Ze.green(`${_.passed}/${_.total} passed`)}`],J=_.results.filter((Y)=>!Y.passed);if(J.length>0){j.push(""),j.push(Ze.red("   Failures:"));for(let Y of J)j.push(Ze.red(`   • ${Y.description}`)),j.push(Ze.red(`     expected ${Y.expected}, got ${Y.actual}`))}return j.join(`
`)}function om(_){if(_.length===0)return"   (no custom rules)";let N=["Source","Name","Command","Block Args"],j=_.map((J)=>[J.source,J.name,J.subcommand?`${J.command} ${J.subcommand}`:J.command,J.blockArgs.join(", ")]);return Yn({headers:N,rows:j})}function ha(_){let N=[];if(N.push("Configuration"),N.push(im(_.userConfig,_.projectConfig)),N.push(""),_.effectiveRules.length>0)N.push(`   Effective rules (${_.effectiveRules.length} total):`),N.push(om(_.effectiveRules));else N.push("   Effective rules: (none - using built-in rules only)");return N.join(`
`)}function im(_,N){let j=["Scope","Status"],J=(re)=>{if(!re.exists)return Ze.dim("N/A");if(!re.valid)return Ze.red(`Invalid (${re.errors?.[0]??"unknown error"})`);return Ze.green("Configured")},Y=[["User",J(_)],["Project",J(N)]];return Yn({headers:j,rows:Y})}function va(_){let N=[];return N.push("Environment"),N.push(sm(_)),N.join(`
`)}function ba(_){let N=_.effectiveSafety.policyScopes,j=["Effective Safety",`   Selected preset: ${_.effectiveSafety.selectedPreset}${N?` (${$r(N.levelScope)})`:""}`,`   Effective: ${_.effectiveSafety.level}`],J=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[Y,re]of J){let ie=_.effectiveSafety.capabilities[Y],de=ie.enabled?Ze.green("ON"):Ze.dim("OFF"),fe=ie.sources.length>0?` (${ie.sources.join(", ")})`:"";j.push(`   ${re}: ${de} via ${ie.source}${fe}`)}if(N&&N.weakenings.length>0){j.push(`   Project policy deltas${N.weakeningsIgnored?" (ignored)":""}:`);for(let Y of N.weakenings)j.push(`      ${Y}`)}j.push(`   Stored rule customizations: ${_.effectiveSafety.ruleCounts.stored}`),j.push(`   Effective rule customizations: ${_.effectiveSafety.ruleCounts.effective}`);for(let[Y,re]of Object.entries(_.effectiveSafety.ruleOverrides))j.push(`   ${Y}: ${re}`);return j.join(`
`)}function wa(_){let N=["Findings"];if(_.length===0)return N.push("   No findings from inspected doctor facts."),N.join(`
`);for(let j of _){let J=`[${j.severity.toUpperCase()}] ${j.checkId}: ${gn(j.title)}`,Y=j.severity==="error"?Ze.red:j.severity==="warning"?Ze.yellow:Ze.blue;if(N.push(`   ${Y(J)}`),N.push(`      ${gn(j.detail)}`),j.path)N.push(`      Path: ${gn(j.path)}`);if(j.fixHint)N.push(`      Fix: ${gn(j.fixHint)}`)}return N.join(`
`)}function sm(_){let N=["Variable","Status","Legacy"],j=_.map((J)=>{let Y=J.isSet?Ze.green("✓"):Ze.dim("✗"),re=J.legacyName&&J.legacyIsSet?`${J.legacyName} ${Ze.green("✓")}`:J.legacyName??"";return[J.name,Y,re]});return Yn({headers:N,rows:j})}function ka(_){let N=[];if(_.totalBlocked===0)N.push("Recent Activity"),N.push("   No blocked commands in the last 7 days"),N.push("   Tip: This is normal for new installations");else N.push(`Recent Activity · last 7 days (${_.totalBlocked} blocked / ${_.sessionCount} sessions)`),N.push(am(_.recentEntries));if(_.unreadable>0)N.push(`   Warning: ${_.unreadable} audit log ${_.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return N.join(`
`)}function am(_){let N=["Time","Command"],j=_.map((J)=>{let Y=gn(J.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),re=Y.length>40?`${Y.slice(0,37)}...`:Y;return[J.relativeTime,re]});return Yn({headers:N,rows:j})}function Ca(_){let N=[];if(N.push("Update Check"),_.latestVersion===null&&!_.error)return N.push(Dr([["Status",Ze.dim("Skipped")],["Installed",_.currentVersion]])),N.join(`
`);if(_.error)return N.push(Dr([["Status",`${Ze.yellow("⚠")} Error`],["Installed",_.currentVersion],["Error",Ze.dim(_.error)]])),N.join(`
`);if(_.updateAvailable)return N.push(Dr([["Status",`${Ze.yellow("⚠")} Update Available`],["Current",_.currentVersion],["Latest",Ze.green(_.latestVersion??"")]])),N.push(""),N.push("   Run: bunx cc-safety-net@latest doctor"),N.push("   Or:  npx cc-safety-net@latest doctor"),N.join(`
`);return N.push(Dr([["Status",`${Ze.green("✓")} Up to date`],["Version",_.currentVersion]])),N.join(`
`)}function Dr(_){return Yn({rows:_})}function xa(_){let N=[];return N.push("System Info"),N.push(lm(_)),N.join(`
`)}function lm(_){let N=["Component","Version"],j=(re)=>{if(re===null)return Ze.dim("not found");return re},Y=[{label:"cc-safety-net",value:_.version},...Er.map((re)=>({label:ln(re),value:_.versions[re]??null})),{label:"Node.js",value:_.nodeVersion},{label:"npm",value:_.npmVersion},{label:"Bun",value:_.bunVersion},{label:"Platform",value:_.platform}].map((re)=>[re.label,j(re.value)]);return Yn({headers:N,rows:Y})}function Sa(_){if(_.findings.length===0)return Ze.green(`
No findings from inspected doctor facts.`);let N={error:_.findings.filter((re)=>re.severity==="error").length,warning:_.findings.filter((re)=>re.severity==="warning").length,info:_.findings.filter((re)=>re.severity==="info").length},j=["error","warning","info"].filter((re)=>N[re]>0).map((re)=>`${N[re]} ${re}`),J=_.findings.length===1?"finding":"findings",Y=`
${_.findings.length} ${J}: ${j.join(", ")}.`;if(N.error>0)return Ze.red(Y);if(N.warning>0)return Ze.yellow(Y);return Ze.blue(Y)}import{lstatSync as cm}from"node:fs";import{dirname as Wo}from"node:path";function zo(_,N){try{let j=cm(N);if(j.isSymbolicLink())return{kind:_,path:N,status:"unsafe",issues:["symlink"]};if(!j.isDirectory())return{kind:_,path:N,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:_,path:N,status:"unknown",issues:[]};let J=[...j.uid!==process.getuid()?["ownership"]:[],...(j.mode&18)!==0?["permissions"]:[]];return{kind:_,path:N,status:J.length>0?"unsafe":"safe",issues:J}}catch(j){if(typeof j==="object"&&j!==null&&"code"in j&&j.code==="ENOENT")return{kind:_,path:N,status:"not-applicable",issues:[]};return{kind:_,path:N,status:"unknown",issues:[]}}}function Pa(_,N){let j=U(_);return{directories:[zo("policy",Wo(Wo(N))),zo("config",Wo(N)),...j?[zo("audit",j)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as dm}from"node:child_process";import{existsSync as Ra}from"node:fs";import{delimiter as um,extname as pm,join as fm}from"node:path";import{stripVTControlCharacters as Ea}from"node:util";var Ta="2.6.10",mm=5000,gm="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function un(){return Ta}function Yo(_,N){let j=_[N];if(j)return j;let J=Object.keys(_).find((Y)=>Y.toLowerCase()===N.toLowerCase()&&!!_[Y]);return J?_[J]:j}function ym(_){return(Yo(_,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((N)=>N.length>0)}function hm(_,N){let j=pm(_)?[_]:[...ym(N).map((J)=>`${_}${J}`),_];if(_.includes("/")||_.includes("\\"))return j.find((J)=>Ra(J))??_;return(Yo(N,"PATH")??"").split(um).flatMap((J)=>j.map((Y)=>fm(J,Y))).find((J)=>Ra(J))??_}function _a(_){if(!/[\s"&|<>^]/.test(_))return _;return`"${_.replace(/"/g,'""')}"`}function Zn(_,N){let[j,...J]=_,Y=N[gm]==="win32"?"win32":process.platform;if(!j||Y!=="win32")return{cmd:j??"",args:J};let re=hm(j,N);if(!/\.(?:bat|cmd)$/i.test(re))return{cmd:re,args:J};return{cmd:Yo(N,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",_a(re),...J.map(_a)].join(" ")]}}var Nt=async(_,N=mm)=>{let j=await vm(_,{timeoutMs:N});if(j.code!==0)return null;return Ea(j.stdout).trim()||Ea(j.stderr).trim()||null};function vm(_,N){let[j,...J]=_;if(!j)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((Y)=>{try{let re=Zn([j,...J],process.env),ie=dm(re.cmd,re.args,{stdio:["ignore","pipe","pipe"]}),de=!1,fe="",we="";ie.stdout.on("data",(Te)=>{fe+=Te.toString()}),ie.stderr.on("data",(Te)=>{we+=Te.toString()});let ke=(Te)=>{if(de)return;de=!0,clearTimeout(Re),Y(Te)},Re=setTimeout(()=>{ie.kill(),ke({code:null,stdout:fe,stderr:we})},N.timeoutMs);ie.on("close",(Te)=>{ke({code:Te,stdout:fe,stderr:we})}),ie.on("error",()=>{ke({code:null,stdout:fe,stderr:we})})}catch{Y({code:null,stdout:"",stderr:""})}})}function Lr(_){if(!_)return null;let N=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(_);if(N)return N[1]??null;let j=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(_);if(j)return j[1]??null;return _.split(`
`)[0]?.trim()||null}async function Nr(_,N=Nt,j=process.cwd()){let J=Promise.all(Pn.map(async(Re)=>[Re.id,Lr(await N([...Re.probeCommand]))])),[Y,re,ie,de,fe,we,ke]=await Promise.all([J,J.then(async(Re)=>{let Te=Re.find(([He])=>He==="opencode")?.[1];if(!Te?.startsWith("2.")||!_(Te))return null;let Ee=["--param",`location[directory]=${j}`],De=["opencode","api","integration.list",...Ee];return await N(De,30000),N(["opencode","api","plugin.list",...Ee],30000)}),N(["codex","plugin","list"],30000),N(["amp","plugins","list"],30000),N(["node","--version"]),N(["npm","--version"]),N(["bun","--version"])]);return{version:Ta,versions:Object.fromEntries(Y),codexPluginListOutput:ie,ampPluginListOutput:de,openCodePluginListOutput:re,nodeVersion:Lr(fe),npmVersion:Lr(we),bunVersion:Lr(ke),platform:`${process.platform} ${process.arch}`}}function Zo(_,N){if(N==="dev")return!1;let j=_.split(".").map(Number),J=N.split(".").map(Number),[Y=0,re=0,ie=0]=j,[de=0,fe=0,we=0]=J;if(Y!==de)return Y>de;if(re!==fe)return re>fe;return ie>we}async function Gn(){let _=un(),N=new AbortController,j=setTimeout(()=>N.abort(),3000);try{let J=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:N.signal});if(!J.ok)return{currentVersion:_,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${J.status}`};let Y=await J.json(),re=Zo(Y.version,_);return{currentVersion:_,latestVersion:Y.version,updateAvailable:re}}catch(J){return{currentVersion:_,latestVersion:null,updateAvailable:!1,error:J instanceof Error?J.message:"Network error"}}finally{clearTimeout(j)}}import*as ja from"node:readline";var $a=(_)=>`\x1B[${_}B`,bm=(_)=>`\x1B[${_}A`;var Aa=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function wm(_){return new Promise((N)=>setTimeout(N,_))}function km(_,N,j){if(!j)return N(_);if(j.aborted)return Promise.resolve();return new Promise((J,Y)=>{let re=()=>j.removeEventListener("abort",ie),ie=()=>{re(),J()};j.addEventListener("abort",ie,{once:!0}),N(_).then(()=>{re(),J()},(de)=>{re(),Y(de)})})}function jr(_){return Math.max(0,Math.min(1,_))}function jt(_){return Math.max(0,Math.min(255,Math.round(_)))}function Xo(_){return _<=0.0031308?12.92*_:1.055*_**0.4166666666666667-0.055}function Cm(_,N,j){let J=j*Math.PI/180,Y=N*Math.cos(J),re=N*Math.sin(J),ie=(_+0.3963377774*Y+0.2158037573*re)**3,de=(_-0.1055613458*Y-0.0638541728*re)**3,fe=(_-0.0894841775*Y-1.291485548*re)**3;return{blue:jt(Xo(jr(-0.0041960863*ie-0.7034186147*de+1.707614701*fe))*255),green:jt(Xo(jr(-1.2684380046*ie+2.6097574011*de-0.3413193965*fe))*255),red:jt(Xo(jr(4.0767416621*ie-3.3077115913*de+0.2309699292*fe))*255)}}function Qo(_,N){let j=(N*_*180/Math.PI%360+360)%360;return Cm(0.72,0.15,j)}function Da(_,N=0.1){let j=Qo(N,_);return`\x1B[38;2;${j.red};${j.green};${j.blue}m`}function xm(_,N){return{blue:jt(_.blue+(255-_.blue)*N),green:jt(_.green+(255-_.green)*N),red:jt(_.red+(255-_.red)*N)}}function La(_,N,j){let J=Math.imul(_+2654435769,2246822507)^Math.imul(N+3266489909,668265263)^Math.imul(j+374761393,2654435761),Y=J^J>>>15,re=Math.imul(Y,739982445),ie=re^re>>>12,de=Math.imul(ie,695872825);return((de^de>>>15)>>>0)/4294967296}function Sm(_,N,j){let J=Math.floor(La(_,N,j)*Aa.length);return Aa[J]??"░"}function Oa(_){let N=jr(_);return N*N*N*(N*(N*6-15)+10)}function Pm(_){if(_.length===0)return"";let N=[],j=!1,J="";for(let Y of _){let re=`${Y.red};${Y.green};${Y.blue}`;if(Y.bold!==j)N.push(Y.bold?"\x1B[1m":"\x1B[22m"),j=Y.bold;if(re!==J)N.push(`\x1B[38;2;${re}m`),J=re;N.push(Y.character)}return`${N.join("")}\x1B[22m\x1B[39m`}function Rm(_,N,j,J,Y){return _.map((re,ie)=>({...Qo(j,J+N+ie/Y),bold:!1,character:re}))}function Em(_,N,j,J,Y,re,ie,de){let fe=Math.max(1,J*0.75),we=Math.min(1,j/fe),ke=Y*Oa(we),Re=Math.max(0,(j-fe)/Math.max(1,J-fe)),Te=(1-Oa(j/J))*de*2,Ee=0.35*Math.max(0,1-Re*2),De=we>=1,He=Math.min(_.length,Math.ceil(ke+2+1));return _.slice(0,He).map((Le,Ye)=>{let tn=Qo(re,ie+N+Ye/de+Te),rn=Ye+La(N,Ye,7919)*2-1;if(rn>ke+2)return{...tn,bold:!1,character:" "};let on=ke-rn,nn=0.8*Math.exp(-(on*on)/12.5),pn=Math.min(0.9,nn+Ee),In=!De&&rn>ke-4;return{...xm(tn,pn),bold:pn>0.3,character:In?Sm(N,Ye,j):Le}})}function Ia(_){return`\x1B[?2026h${_.map((N,j)=>`\x1B8${j>0?$a(j):""}${Pm(N)}`).join("")}\x1B[?2026l`}async function ei(_,N={}){if(!_)return;let j=N.output??process.stdout,J=N.sleep??wm,Y=N.seed??0,re=_.split(`
`).map((ke)=>Array.from(ke)),ie=Math.max(...re.map((ke)=>ke.length)),de=12000*re.filter((ke)=>ke.length>0).length/40,fe=ie>0?Math.max(1,Math.ceil(de/16.666666666666668)):0,we=fe>0?de/fe:0;j.write(`\x1B[?25l${re.length>1?`${`
`.repeat(re.length-1)}${bm(re.length-1)}`:""}\x1B7`);try{for(let ke=1;ke<=fe;ke+=1){if(N.signal?.aborted)break;j.write(Ia(re.map((Re,Te)=>Em(Re,Te,ke,fe,ie,0.1,Y,3)))),await km(we,J,N.signal)}}finally{if(j.write(Ia(re.map((ke,Re)=>Rm(ke,Re,0.1,Y,3)))),j.write("\x1B8"),re.length>1)j.write($a(re.length-1));j.write(`
\x1B[0m\x1B[?25h`)}}var Na=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function _m(_){return Boolean(_.isTTY)}async function Xt(_={}){let N=_.output??process.stdout;if(!_m(N))return;let j=_.input??process.stdin,J={output:N,seed:_.seed??Math.random()*8192,sleep:_.sleep};if(!j.isTTY||typeof j.setRawMode!=="function"){await ei(Na,J);return}let Y=new AbortController,re=j.readableFlowing===!0,ie=j.isRaw===!0,de=!1,fe=(we,ke)=>{if(ke.ctrl&&ke.name==="c")de=!0;if(de||ke.name==="return"||ke.name==="enter")Y.abort()};ja.emitKeypressEvents(j),j.on("keypress",fe),j.setRawMode(!0),j.resume();try{await ei(Na,{...J,signal:Y.signal})}finally{if(j.off("keypress",fe),j.setRawMode(ie),!re)j.pause()}if(!de)return;if(_.onInterrupt){_.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as $m}from"node:crypto";import{existsSync as Ma}from"node:fs";import{dirname as Hr,join as Ua}from"node:path";import{dirname as Ha,join as Tm,resolve as Am}from"node:path";var Om="rule.lock";function Im(_){return Tm(Ha(_),Om)}function Fa(_={}){return Am(_.cwd??process.cwd(),".safety-net.json")}function hn(_,N){let j=N.global?N.userConfigPath??W(_,N):N.projectConfigPath??I(N.cwd??process.cwd()),J=N.global?st(_,N):at(j,N.cwd??process.cwd()),Y=Im(j);return{configDir:Ha(j),configPath:j,lockPath:Y,filesystemScope:J,configTarget:i(J,j),lockTarget:i(J,Y)}}var Dm="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Lm="cache",Nm="rulebooks";function Ga(_,N={}){let j=hn(_,N),J=i(j.filesystemScope,qa(j.configDir)),Y=r(j.lockTarget);if(console.log(Dm),Y===null&&!Ma(J.path))return console.log(`No v2 lock or cache leftovers found in ${Hr(j.configDir)}; nothing to migrate.`),0;let re=Um(Y),ie=d(j.configTarget);if(!ie.config&&(r(j.configTarget)!==null||re.size>0))return console.error(`Cannot migrate: the rules config in ${Hr(j.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let de=ie.config?.rules??[];for(let fe of de.flatMap((we)=>jm(we,re,j,J,N.global===!0)))console.log(fe);return H(j.lockTarget),vt(J),console.log(`Removed the v2 lock and cache under ${Hr(j.configDir)}.`),0}function Ba(_,N){return[...new Set([{cwd:N},{cwd:N,global:!0}].flatMap((j)=>{let J=hn(_,j);return[J.lockPath,qa(J.configDir)]}))].filter((j)=>Ma(j))}function jm(_,N,j,J,Y){if(!C(_))return[];let re=L(_).name,ie=i(j.filesystemScope,M(j.configDir,re)),de=r(ie);if(de!==null&&Hm(de,re))return[];let fe=N.get(_),we=fe?Fm(fe,re,J.path,j.filesystemScope):null;if(we===null)return[`Could not migrate ${_} from the v2 cache. Run \`cc-safety-net rule update ${_}${Y?" --global":""}\` to vendor it.`];if(g(ie,we),de!==null)return[`Restored ${_} from the v2 cache over an invalid file.`];return[`Vendored ${_} from the v2 cache.`]}function Hm(_,N){let j=ve(_);return!("problem"in j)&&j.rulebook.name===N}function Fm(_,N,j,J){let Y=Ua(j,Nm,`${Mm(_)}--${_.digest.replace("sha256:","").slice(0,12)}`,ge),re=r(i(J,Y));if(re===null||qm(re)!==_.digest)return null;let ie=ve(re);if("problem"in ie||ie.rulebook.name!==N)return null;return re}function qa(_){return Ua(Hr(_),Lm)}function Mm(_){return([_.owner,_.repo,_.display_ref,_.name].every((J)=>typeof J==="string"&&J!=="")?`${_.owner}/${_.repo}#${_.display_ref}/${_.name}`:_.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Um(_){let N=_===null?null:Bm(_),j=Va(N)&&Array.isArray(N.rulebooks)?N.rulebooks:[];return new Map(j.filter(Gm).map((J)=>[J.spec,J]))}function Gm(_){return Va(_)&&typeof _.spec==="string"&&typeof _.digest==="string"}function Va(_){return!!_&&typeof _==="object"}function Bm(_){try{return JSON.parse(_)}catch{return null}}function qm(_){return`sha256:${$m("sha256").update(_).digest("hex")}`}var Ka="\r\x1B[2K",Vm="\x1B[?25l",Km="\x1B[39m",Jm="\x1B[?25h",Wm=100,zm=0.55,Ym=80,Ja=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Zm(_){return new Promise((N)=>setTimeout(N,_))}async function Fr(_,N={}){let j=N.output??process.stdout;if(!j.isTTY)return _;let J=N.sleep??Zm,Y=!1,re=_.then((de)=>(Y=!0,de),(de)=>{throw Y=!0,de});if(await Promise.race([re.then(()=>!0),J(Wm).then(()=>!1)]))return re;j.write(Vm);try{for(let de=0;!Y;de+=1)j.write(`${Ka}${Da(de*zm)}${Ja[de%Ja.length]}${Km} ${N.loadingMessage??"Loading…"}`),await Promise.race([re,J(Ym)]);return await re}finally{j.write(`${Ka}${Jm}`)}}async function Qt(_,N,j,J={}){let Y=N();if(_)await j();if(_&&Y.ready)await Fr(Y.ready,J);return Y.finish()}import{stripVTControlCharacters as Xm}from"node:util";var Mr="amp plugins list",Qm=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function Wa(_){if(!_.ampPluginListOutput)return{platform:"amp",status:"n/a"};let N=Xm(_.ampPluginListOutput).split(`
`).map((j)=>Qm.exec(j)?.[1]).find((j)=>j!==void 0);if(!N)return{platform:"amp",status:"n/a"};if(N!=="active")return{platform:"amp",status:"disabled",method:Mr,configPath:Mr,errors:[`Amp personal plugin cc-safety-net is ${N}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:Mr,configPath:Mr}}import{existsSync as ag,readFileSync as lg}from"node:fs";import{isAbsolute as Mx,join as sg}from"node:path";function er(_){return sg(_,".gemini","config","hooks.json")}var za=new Map([["run_command","auto"]]),Ya="manage_task";var cg=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function dg(_){if(!_||typeof _!=="object"||Array.isArray(_))return[];return Object.values(_).flatMap((N)=>{if(!N||typeof N!=="object"||Array.isArray(N))return[];let j=N,J=j.PreToolUse;if(!Array.isArray(J))return[];return J.flatMap((Y)=>{if(!Y||typeof Y!=="object"||Array.isArray(Y))return[];let re=Y.hooks;if(!Array.isArray(re))return[];return re.flatMap((ie)=>{if(!ie||typeof ie!=="object"||Array.isArray(ie))return[];let de=ie.command;if(typeof de!=="string"||!cg.test(de))return[];return[{command:de,enabled:j.enabled!==!1}]})})})}function Za(_){let N=er(_.environment.home);if(!ag(N))return{platform:"antigravity-cli",status:"n/a",configPath:N};let j;try{j=dg(JSON.parse(lg(N,"utf-8")))}catch(J){return{platform:"antigravity-cli",status:"n/a",configPath:N,errors:[`Failed to parse Antigravity hooks config ${N}: ${J instanceof Error?J.message:String(J)}`]}}if(j.some((J)=>J.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:N};if(j.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:N};return{platform:"antigravity-cli",status:"n/a",configPath:N}}import{existsSync as gg}from"node:fs";import{join as Nn}from"node:path";import{existsSync as ug,lstatSync as pg,readFileSync as fg}from"node:fs";import{join as mg}from"node:path";function wn(_,N=(j)=>j){if(!ug(_))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(N(fg(_,"utf-8")))}}catch{return{kind:"unreadable"}}}function Ln(_,N){if(_==="~")return N;if(_.startsWith("~/")||_.startsWith("~\\"))return mg(N,_.slice(2));return _}function cn(_){try{return pg(_)}catch{return}}function qr(_,N){let j=cn(N);if(!j)return{platform:_,status:"n/a",configPath:N};if(!j.isSymbolicLink()&&j.isDirectory())return;return{platform:_,status:"n/a",configPath:N,errors:[`${N} is a symlink or not a directory; move or remove it before installing`]}}function en(_,N){return typeof _==="object"&&_!==null?_[N]:void 0}var Vr="cc-safety-net@cc-marketplace";function Kr(_){return _.env.get("CLAUDE_CONFIG_DIR")||Nn(_.home,".claude")}function Xa(_){return Nn(_.env.get("CLAUDE_CODE_PLUGIN_CACHE_DIR")||Nn(Kr(_),"plugins"),"installed_plugins.json")}function Qa(_,N){let j=en(en(_,"plugins"),N);return Array.isArray(j)&&j.length>0}function Jr(_,N){let j=wn(Xa(_));return j.kind==="ok"&&Qa(j.value,N)}function ri(_){return el(Xa(_),Nn(Kr(_),"settings.json"))}function el(_,N){let j=wn(_);if(j.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(j.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!Qa(j.value,Vr))return{platform:"claude-code",status:"n/a"};let J=wn(N);if(J.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(J.kind==="ok"&&en(en(J.value,"enabledPlugins"),Vr)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:N,errors:[`${Vr} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:_}}function nl(_){let N=Nn(_.home,".claude"),j=Nn(N,"plugins","installed_plugins.json");if(el(j,Nn(N,"settings.json")).status!=="configured")return;let J=wn(j),Y=J.kind==="ok"?en(en(J.value,"plugins"),Vr):void 0,re=(Array.isArray(Y)?Y:[]).filter((we)=>en(we,"scope")==="user").map((we)=>en(we,"installPath")).find((we)=>typeof we==="string");if(!re)return;let ie=Nn(re,".cursor-plugin","plugin.json"),de=wn(ie),fe=de.kind==="ok"?en(de.value,"hooks"):void 0;return typeof fe==="string"&&gg(Nn(re,fe))?ie:void 0}function tl(_){return ri(_.environment)}var rl="Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it.";function ol(_){if(!_.codexPluginListOutput)return{platform:"codex",status:"n/a"};let N=_.codexPluginListOutput.split(`
`).find((j)=>j.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!N)return{platform:"codex",status:"n/a"};if(!N.includes("installed,"))return{platform:"codex",status:"n/a"};if(!N.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex runs only trusted hooks, and doctor cannot check trust. Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."]}}import{existsSync as Zr,readdirSync as yg,readFileSync as hg}from"node:fs";import{join as bn}from"node:path";function yn(_){let N="",j=0,J=!1,Y=!1,re=-1;while(j<_.length){let ie=_[j],de=_[j+1];if(Y){N+=ie,Y=!1,j++;continue}if(ie==='"'&&!J){J=!0,re=-1,N+=ie,j++;continue}if(ie==='"'&&J){J=!1,N+=ie,j++;continue}if(ie==="\\"&&J){Y=!0,N+=ie,j++;continue}if(J){N+=ie,j++;continue}if(ie==="/"&&de==="/"){while(j<_.length&&_[j]!==`
`)j++;continue}if(ie==="/"&&de==="*"){j+=2;while(j<_.length-1){if(_[j]==="*"&&_[j+1]==="/"){j+=2;break}j++}continue}if(ie===","){re=N.length,N+=ie,j++;continue}if(ie==="}"||ie==="]"){if(re!==-1){let fe=N.slice(re+1);if(/^\s*$/.test(fe))N=N.slice(0,re)+fe}re=-1,N+=ie,j++;continue}if(!/\s/.test(ie))re=-1;N+=ie,j++}return N}function sl(_,N,j){let J=N+1,Y=!1;while(J<_.length){if(Y){Y=!1,J++;continue}if(_[J]==="\\"){Y=!0,J++;continue}if(_[J]==='"')return J+1;J++}throw Error(j)}function ii(_,N,j){let J=_[N],Y=J==="["?"]":"}",re=0,ie=N;while(ie<_.length){let de=j.skipComment?.(_,ie)??ie;if(de!==ie){ie=de;continue}if(_[ie]==='"'){ie=sl(_,ie,j.stringError);continue}if(_[ie]===J)re++;if(_[ie]===Y){if(re--,re===0)return ie}ie++}throw Error(j.bracketError)}function al(_,N){let j=_.lastIndexOf(`
`,N)+1;return/^[ \t]*/.exec(_.slice(j))?.[0]??""}function ll(_,N){let j=N.end+(/^\s*/.exec(_.slice(N.end))?.[0].length??0);if(_[j]===","){let ie=_[j+1]===`
`?j+2:j+1;return`${_.slice(0,N.start)}${_.slice(ie)}`}let J=_.slice(0,N.start).search(/\s*$/)-1;if(_[J]!==",")return`${_.slice(0,N.start)}${_.slice(N.end)}`;let Y=_.lastIndexOf(`
`,J-1),re=Y!==-1&&/^\s*$/.test(_.slice(Y+1,J))?Y:J;return`${_.slice(0,re)}${_.slice(N.end)}`}function oi(_,N){if(_.startsWith("//",N)){let j=_.indexOf(`
`,N+2);return j===-1?_.length:j+1}if(_.startsWith("/*",N)){let j=_.indexOf("*/",N+2);return j===-1?_.length:j+2}return N}function il(_,N){let j=N;while(j<_.length){if(/\s/.test(_[j]??"")){j++;continue}let J=oi(_,j);if(J===j)return j;j=J}return j}function cl(_,N,j){let J=0,Y=0;while(Y<_.length){let re=oi(_,Y);if(re!==Y){Y=re;continue}if(_[Y]==='"'){let ie=sl(_,Y,j.stringError);if(J===1&&JSON.parse(_.slice(Y,ie))===N){let de=il(_,ie),fe=il(_,de+1);if(_[de]===":"&&_[fe]==="[")return{start:fe,end:ii(_,fe,{skipComment:oi,...j})}}Y=ie;continue}if(_[Y]==="{"||_[Y]==="[")J++;if(_[Y]==="}"||_[Y]==="]")J--;Y++}return}var _n="cc-safety-net@cc-marketplace",Wr=["cc-marketplace","cc-safety-net"],dl=["_direct","copilot-safety-net"],ul=["cc-marketplace","safety-net"],pl="safety-net@cc-marketplace";function zr(_,N){let j=N.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${j}([^a-z0-9-]|$)`,"m").test(_??"")}function fl(_){return zr(_,"cc-safety-net@cc-marketplace")}function ml(_){return zr(_,"cc-marketplace")}function gl(_){return zr(_,"copilot-safety-net")}function yl(_){return zr(_,"safety-net@cc-marketplace")}function Yr(_){if(!_?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(_)}function vl(_,N){if(!_)return null;let j=_.match(/(\d+)\.(\d+)\.(\d+)/);if(!j)return null;let J=[Number(j[1]),Number(j[2]),Number(j[3])];for(let Y=0;Y<N.length;Y++){let re=J[Y]??0,ie=N[Y]??0;if(re!==ie)return re>ie}return!0}function vg(_){return vl(_,[0,0,422])}function bg(_){return vl(_,[1,0,8])}function tr(_){return _.env.get("COPILOT_HOME")||bn(_.home,".copilot")}function si(_){return(_.hooks?.preToolUse??[]).some((j)=>{if(j.type!==void 0&&j.type!=="command")return!1;return Yr(j.command)||Yr(j.bash)||Yr(j.powershell)||Yr(j.exec&&[j.exec,...j.args??[]].join(" "))})}function nr(_){return _===void 0||typeof _==="string"}function wg(_){return _===void 0||Array.isArray(_)&&_.every((N)=>typeof N==="string")}function kg(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let N=_;if(N.disableAllHooks!==void 0&&typeof N.disableAllHooks!=="boolean")return!1;if(N.hooks===void 0)return!0;if(!N.hooks||typeof N.hooks!=="object"||Array.isArray(N.hooks))return!1;let j=N.hooks.preToolUse;if(j===void 0)return!0;return Array.isArray(j)&&j.every((J)=>J!==null&&typeof J==="object"&&!Array.isArray(J)&&nr(J.type)&&nr(J.command)&&nr(J.bash)&&nr(J.powershell)&&nr(J.exec)&&wg(J.args))}function ai(_,N){try{let j=JSON.parse(yn(hg(_,"utf-8")));if(!kg(j)){N?.push(`Invalid hook config ${_}: hooks.preToolUse must be an array of hook objects`);return}return j}catch(j){N?.push(`Failed to parse ${_}: ${j instanceof Error?j.message:String(j)}`);return}}function bl(_,N){try{return yg(_).filter((j)=>j.endsWith(".json")).sort((j,J)=>j.localeCompare(J))}catch(j){return N?.push(`Failed to read ${_}: ${j instanceof Error?j.message:String(j)}`),[]}}function Cg(_,N){if(!Zr(_))return[];let j=[];for(let J of bl(_,N)){let Y=bn(_,J),re=ai(Y,N);if(re&&si(re))j.push(Y)}return j}function Ht(_,N){if(!Zr(_))return;let j=ai(_,N);if(!j)return;return{path:_,config:j}}function hl(_,N,j,J){if(N){_.push(`GitHub Copilot CLI ${N} does not support ${j}; requires ${J}+`);return}_.push(`GitHub Copilot CLI version unavailable; skipping ${j} because it requires ${J}+`)}function xg(_){for(let N of _){if(N?.config.disableAllHooks===!0)return N.path;if(N?.config.disableAllHooks===!1)return}return}function Sg(_,N,j,J){let Y=tr(_),re=bn(N,".github","hooks"),ie=bn(Y,"hooks"),de=bn(N,".github","copilot"),fe=bn(N,".claude"),we=bg(j),ke=we===!0?J:void 0,Re=[Ht(bn(de,"settings.local.json"),ke),Ht(bn(de,"settings.json"),ke),Ht(bn(fe,"settings.local.json"),ke),Ht(bn(fe,"settings.json"),ke)],Te=[Ht(bn(Y,"settings.json"),ke),Ht(bn(Y,"config.json"),ke)];if(we!==!1){let on=xg([...Re,...Te]);if(on){if(we===null)J.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${on} as active`);return{activeConfigPaths:[],repoInlineSources:Re,disabledBy:on}}}let Ee=Cg(re,J),De=vg(j),He=De===!0?J:void 0,Le=Zr(ie)?bl(ie,He):[],Ye=[];for(let on of Le){let nn=bn(ie,on),pn=ai(nn,He);if(pn&&si(pn))Ye.push(nn)}if(De!==!0&&Ye.length>0)hl(J,j,`user hook files in ${ie}`,"0.0.422"),Ye.length=0;let tn=[];for(let on of[...Re,...Te]){if(!on)continue;if(!si(on.config))continue;if(we===!0){tn.push(on);continue}hl(J,j,"inline hook definitions in Copilot config files","1.0.8");break}let rn=(on)=>on.filter((nn)=>!!nn&&tn.includes(nn)).map((nn)=>nn.path);return{activeConfigPaths:[...rn(Re),...Ee,...rn(Te),...Ye],repoInlineSources:Re}}function wl(_){let N=[],j=Sg(_.environment,_.cwd,_.copilotCliVersion,N);if(j.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:j.disabledBy,configPaths:[j.disabledBy],errors:N.length>0?N:void 0};let J=tr(_.environment),Y=bn(J,"installed-plugins",...Wr),re=Zr(Y),ie=bn(J,"settings.json"),de=wn(ie,yn),fe=(Ee)=>en(en(Ee,"enabledPlugins"),_n),we=j.repoInlineSources.find((Ee)=>typeof fe(Ee?.config)==="boolean"),ke=we??(de.kind==="ok"?{path:ie,config:de.value}:void 0);if(re&&!we&&de.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};let Re=re&&ke!==void 0&&fe(ke.config)===!1;if(Re&&j.activeConfigPaths.length===0)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:ke.path,errors:[`${_n} is installed but not enabled in Copilot CLI`]};let Te=re&&!Re;if(Te||j.activeConfigPaths.length>0){let Ee=j.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:Te?"plugin config":"hook config",configPath:Ee??(Te?Y:void 0),configPaths:j.activeConfigPaths.length>0?j.activeConfigPaths:void 0,errors:N.length>0?N:void 0}}return{platform:"copilot-cli",status:"n/a",errors:N.length>0?N:void 0}}import{existsSync as gi,readdirSync as Hg,readFileSync as Fg}from"node:fs";import{join as mi}from"node:path";import{existsSync as pi,mkdirSync as Og,readFileSync as Ig,rmSync as $g}from"node:fs";import{dirname as Dg,join as Xr}from"node:path";import{existsSync as Pg,renameSync as Rg,statSync as Eg,writeFileSync as _g}from"node:fs";function an(_,N){let j=`${_}.${process.pid}.tmp`;_g(j,N,Pg(_)?{mode:Eg(_).mode&511}:{}),Rg(j,_)}import{spawn as Tg}from"node:child_process";function Ag(_){return _.join(" ")}function li(_,N,j){return[`Failed to run ${Ag(_)}${N===null?"":` (exit ${N})`}.`,j.trim()].filter(Boolean).join(`
`)}function ci(_){let N={stdout:"",stderr:""};return _.stdout.setEncoding("utf-8"),_.stderr.setEncoding("utf-8"),_.stdout.on("data",(j)=>{N.stdout+=j}),_.stderr.on("data",(j)=>{N.stderr+=j}),N}function fn(_,N){return new Promise((j,J)=>{let Y=Zn([..._],process.env),re=Tg(Y.cmd,Y.args,{stdio:["ignore","pipe","pipe"]}),ie=ci(re),de=()=>[ie.stdout,ie.stderr].filter(Boolean).join(`
`),fe=N?.timeoutMs??120000,we=setTimeout(()=>{re.kill(),J(Error(li(_,null,`Timed out after ${fe}ms.
${de()}`.trim())))},fe);re.on("error",(ke)=>{clearTimeout(we),J(Error(li(_,null,`${ke.message}
${de()}`.trim())))}),re.on("close",(ke)=>{if(clearTimeout(we),ke!==0){J(Error(li(_,ke,de())));return}j(N?.stdoutOnly?ie.stdout:de())})})}async function di(_){for(let N of _)await fn(N)}async function kl(_){for(let N of _)try{await fn(N)}catch(j){console.warn(j instanceof Error?j.message:String(j))}}var kn=Object.fromEntries(Zt.map((_)=>[_.id,`npx -y cc-safety-net hook ${_.flags[1]}`]));var or=kn.cursor,Cl=30;function eo(_){return Xr(_.home,".cursor","hooks.json")}var rr="cc-safety-net";function fi(_){let N=Xr(_.home,".cursor","plugins");return{cache:Xr(N,"cache",rr),marketplaceClone:Xr(N,"marketplaces","github.com","kenryu42","cc-safety-net")}}async function xl(_){let N=Object.values(fi(_));if(!N.some((J)=>pi(J)))return;let j="No marketplace matches";return await fn(["cursor-agent","plugin","marketplace","remove",rr]).catch((J)=>{if(!(J instanceof Error&&J.message.includes(j)))throw J}),N.forEach((J)=>$g(J,{recursive:!0,force:!0})),[`Removed the ${rr} marketplace from your Cursor account.`,"If /plugins in cursor-agent still lists CC Safety Net as installed, uninstall it there."].join(`
`)}function Qn(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function ui(){return{command:or,timeout:Cl,failClosed:!0}}function Qr(_){return Qn(_)&&_.command===or}function Lg(_){return Object.keys(_).length===3&&_.command===or&&_.timeout===Cl&&_.failClosed===!0}function Ng(_){try{return JSON.parse(Ig(_,"utf-8"))}catch(N){if(N instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${_}: ${N.message}`);throw N}}function Sl(_){let N=Ng(_);if(!Qn(N))throw Error(`Cursor hooks config ${_} must be a JSON object`);if(N.version!==1)throw Error(`Cursor hooks config ${_} must set "version": 1`);if(N.hooks!==void 0&&!Qn(N.hooks))throw Error(`Cursor hooks config ${_} "hooks" must be an object`);let j=Qn(N.hooks)?N.hooks.preToolUse:void 0;if(j!==void 0&&!Array.isArray(j))throw Error(`Cursor hooks config ${_} "hooks.preToolUse" must be an array`);return N}function Pl(_){let N=Qn(_.hooks)?_.hooks.preToolUse:void 0;return Array.isArray(N)?N:[]}function jg(_){if(!_.some(Qr))return[..._,ui()];return _.reduce((N,j)=>{if(!Qr(j))return N.result.push(j),N;if(!N.inserted)N.result.push(ui()),N.inserted=!0;return N},{result:[],inserted:!1}).result}function Rl(_,N,j){let J=Qn(N.hooks)?N.hooks:{},Y={...N,hooks:{...J,preToolUse:j}};an(_,`${JSON.stringify(Y,null,2)}
`)}function El(_){let N=eo(_);if(!pi(N))return Og(Dg(N),{recursive:!0}),an(N,`${JSON.stringify({version:1,hooks:{preToolUse:[ui()]}},null,2)}
`),{path:N,alreadyInstalled:!1};let j=Sl(N),J=Pl(j),Y=J.filter(Qr);if(Qn(j.hooks)&&Array.isArray(j.hooks.preToolUse)&&Y.length===1&&Y[0]!==void 0&&Lg(Y[0]))return{path:N,alreadyInstalled:!0};return Rl(N,j,jg(J)),{path:N,alreadyInstalled:!1}}function _l(_){let N=eo(_);if(!pi(N))return{path:N,alreadyInstalled:!1};let j=Sl(N),J=Pl(j),Y=J.filter((re)=>!Qr(re));if(Y.length===J.length)return{path:N,alreadyInstalled:!1};return Rl(N,j,Y),{path:N,alreadyInstalled:!0}}function Mg(_){if(!_||typeof _!=="object"||Array.isArray(_))return[];let N=_.hooks;if(!N||typeof N!=="object"||Array.isArray(N))return[];let j=N.preToolUse;if(!Array.isArray(j))return[];return j.filter((J)=>!!J&&typeof J==="object"&&!Array.isArray(J)&&J.command===or)}function Ug(_){let N=[];if(_.length>1)N.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let j=_[0];if(j&&j.failClosed!==!0)N.push('Managed hook is missing "failClosed": true; reinstall to repair');if(j&&j.timeout!==30)N.push('Managed hook "timeout" is not 30; reinstall to repair');return N}var no="Claude Code plugin",yi="Cursor plugin";function Gg(_){let N=mi(fi(_).cache,rr);if(!gi(N))return{};try{return{version:Hg(N).map((j)=>mi(N,j)).find((j)=>gi(mi(j,".cache-complete")))}}catch{return{unreadable:N}}}function Bg(_,N){if(N){let Y=["Cursor records enabled plugins on your Cursor account, which doctor cannot check, and keeps a plugin's files after it is uninstalled.","Cursor pins marketplace plugins to the commit they were added at, so `cc-safety-net update` cannot update this plugin, while the npx hook (`cc-safety-net install --cursor`) stays current."].join(" ");return{method:yi,configPath:N,duplicate:`The Cursor plugin also runs this check, so every tool call is checked twice. ${Y} If the plugin is installed, run \`cc-safety-net uninstall --cursor\`, uninstall CC Safety Net from /plugins in cursor-agent, then run \`cc-safety-net install --cursor\`.`,alone:`${Y} If /plugins in cursor-agent does not list CC Safety Net as installed, run \`cc-safety-net install --cursor\`.`}}let j=nl(_);if(!j)return;let J="Cursor runs the Claude Code plugin only while it imports Claude Code plugins, which doctor cannot check.";return{method:no,configPath:j,duplicate:`The Claude Code plugin also runs this check in Cursor, so every tool call is checked twice. ${J} If Cursor runs it, run \`cc-safety-net uninstall --cursor\` to remove this hook.`,alone:`${J} If it stops, run \`cc-safety-net install --cursor\`.`}}function Tl(_){let N=qg(_),j=Gg(_.environment);if(j.unreadable)return N.status==="configured"?{...N,errors:[...N.errors??[],`Cannot read ${j.unreadable}, so doctor cannot tell whether the Cursor plugin also runs this check.`]}:{platform:"cursor",status:"not-inspected"};let J=Bg(_.environment,j.version);if(!J)return N;if(N.status==="configured")return{...N,errors:[...N.errors??[],J.duplicate]};return{platform:"cursor",status:"configured",method:J.method,configPath:J.configPath,errors:[...N.errors??[],J.alone]}}function qg(_){let N=eo(_.environment);if(!gi(N))return{platform:"cursor",status:"n/a",configPath:N};let j;try{j=JSON.parse(Fg(N,"utf-8"))}catch(re){return{platform:"cursor",status:"n/a",configPath:N,errors:[`Failed to parse Cursor hooks config ${N}: ${re instanceof Error?re.message:String(re)}`]}}let J=Mg(j);if(J.length===0)return{platform:"cursor",status:"n/a",configPath:N};let Y=Ug(J);return{platform:"cursor",status:"configured",method:"hook config",configPath:N,errors:Y.length>0?Y:void 0}}import{readdirSync as Vg}from"node:fs";import{join as hi,resolve as Kg}from"node:path";var vi="cc-safety-net";function bi(_){let N=_.env.get("DSH_HOME");return hi(N?.trim()?Kg(Ln(N,_.home)):hi(_.home,".dsh"),"profiles")}function Al(_){let N=bi(_),j=cn(N)?.isDirectory()?Vg(N,{withFileTypes:!0}).filter((Y)=>Y.isDirectory()&&Y.name!=="node_modules").map((Y)=>{let re=hi(N,Y.name,"package.json");return{name:Y.name,configPath:re,manifest:wn(re)}}):[];return{installed:j.flatMap((Y)=>{if(Y.manifest.kind!=="ok")return[];let re=Y.manifest.value;if(en(en(re,"dependencies"),vi)===void 0)return[];let ie=en(en(en(re,"dsh"),"profile"),"bundles");return[{name:Y.name,configPath:Y.configPath,enabled:Array.isArray(ie)&&ie.includes(vi)}]}),unreadable:j.some((Y)=>Y.manifest.kind==="unreadable")}}function wi(_){return Al(_).installed}function Ol(_){let N=Al(_.environment),j=N.installed.filter((re)=>re.enabled),J=N.installed.filter((re)=>!re.enabled),Y=J.map((re)=>`${vi} is installed in the ${re.name} profile but its bundle is disabled`);if(j.length>0)return{platform:"deepseek-harness",status:"configured",method:"dsh bundle",configPaths:j.map((re)=>re.configPath),...Y.length>0?{errors:Y}:{}};if(J.length>0)return{platform:"deepseek-harness",status:"disabled",method:"dsh bundle",configPaths:J.map((re)=>re.configPath),errors:Y};return N.unreadable?{platform:"deepseek-harness",status:"not-inspected"}:{platform:"deepseek-harness",status:"n/a"}}import{existsSync as Xg}from"node:fs";import{existsSync as Dl,mkdirSync as Jg,readFileSync as Wg}from"node:fs";import{dirname as zg,join as xi}from"node:path";function ki(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Ci(_,N){return ki(_)&&_.command===N}function Il(_,N){return ki(_)&&Array.isArray(_.hooks)&&_.hooks.some((j)=>Ci(j,N))}function ot(_,N){return{hooks:[{type:"command",command:_,timeout:N}]}}function jn(_,N){return _.flatMap((j)=>{if(!ki(j)||!Array.isArray(j.hooks))return[j];let J=j.hooks.filter((Y)=>!Ci(Y,N));if(J.length===j.hooks.length)return[j];return J.length===0?[]:[{...j,hooks:J}]})}function Ft(_,N,j){let J=_.filter((Y)=>Il(Y,N));return J.length===1&&JSON.stringify(J[0])===JSON.stringify(ot(N,j))}function Mt(_,N){return _.find((j)=>Il(j,N))}function Ut(_,N,j){let J=Array.isArray(_.hooks)?_.hooks.find((Y)=>Ci(Y,N)):void 0;return[..._.matcher===void 0||_.matcher===""||_.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...J?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...J?.timeout===j?[]:[`Managed hook "timeout" is not ${j}; reinstall to repair`]]}var ft=kn.devin,to=30,Yg={config:{},hooks:{},preToolUse:[]};function ro(_,N=process.platform){let j=N==="win32"?_.env.get("APPDATA")||xi(_.home,"AppData","Roaming"):_.env.get("XDG_CONFIG_HOME")||xi(_.home,".config");return xi(j,"devin","config.json")}function $l(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Zg(_){try{return{ok:!0,value:JSON.parse(yn(Wg(_,"utf-8")))}}catch(N){return{ok:!1,message:N instanceof Error?N.message:String(N)}}}function Si(_){let N=Zg(_);if(!N.ok)return`Failed to parse Devin CLI config ${_}: ${N.message}`;let j=N.value;if(!$l(j))return`Devin CLI config ${_} must be a JSON object`;let J=j.hooks===void 0?{}:j.hooks;if(!$l(J))return`Devin CLI config ${_} "hooks" must be an object`;let Y=J.PreToolUse===void 0?[]:J.PreToolUse;if(!Array.isArray(Y))return`Devin CLI config ${_} "hooks.PreToolUse" must be an array`;return{config:j,hooks:J,preToolUse:Y}}function Ll(_){let N=Si(_);if(typeof N==="string")throw Error(N);return N}function Nl(_,N,j){let J={...N.config,hooks:{...N.hooks,PreToolUse:j}};an(_,`${JSON.stringify(J,null,2)}
`)}function jl(_){let N=ro(_),j=Dl(N)?Ll(N):Yg;if(Ft(j.preToolUse,ft,to))return{path:N,alreadyInstalled:!0};return Jg(zg(N),{recursive:!0}),Nl(N,j,[...jn(j.preToolUse,ft),ot(ft,to)]),{path:N,alreadyInstalled:!1}}function Hl(_){let N=ro(_);if(!Dl(N))return{path:N,alreadyInstalled:!1};let j=Ll(N),J=jn(j.preToolUse,ft);if(JSON.stringify(J)===JSON.stringify(j.preToolUse))return{path:N,alreadyInstalled:!1};return Nl(N,j,J),{path:N,alreadyInstalled:!0}}function Fl(_){let N=ro(_.environment);if(!Xg(N))return{platform:"devin",status:"n/a",configPath:N};let j=Si(N);if(typeof j==="string")return{platform:"devin",status:"n/a",configPath:N,errors:[j]};let J=Mt(j.preToolUse,ft);if(!J)return{platform:"devin",status:"n/a",configPath:N};let Y=Ut(J,ft,to);return{platform:"devin",status:"configured",method:"hook config",configPath:N,errors:Y.length>0?Y:void 0}}import{existsSync as sy,readFileSync as ay}from"node:fs";import{existsSync as ir,mkdirSync as Qg,readFileSync as ey,rmSync as ny}from"node:fs";import{dirname as ty,join as Ri}from"node:path";var mt=kn.droid,oo=30;function io(_){return Ri(_.home,".factory","hooks.json")}function Ml(_){return Ri(_.home,".factory","settings.json")}function ry(_){return Ri(_.home,".factory","hooks","hooks.json")}function Pi(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Ul(_){try{return JSON.parse(yn(ey(_,"utf-8")))}catch(N){if(N instanceof SyntaxError)throw Error(`Failed to parse Factory Droid hooks config ${_}: ${N.message}`);throw N}}function Ei(_){let N=Ul(_);if(!Pi(N))throw Error(`Factory Droid hooks config ${_} must be a JSON object`);if(N.PreToolUse===void 0||Array.isArray(N.PreToolUse))return N;throw Error(`Factory Droid hooks config ${_} "PreToolUse" must be an array`)}function oy(_){if(!ir(_))return{};let N=Ul(_);return Pi(N)&&Pi(N.hooks)&&N.hooks.PreToolUse!==void 0?{PreToolUse:N.hooks.PreToolUse}:{}}function iy(_){let N=ry(_);return{...oy(Ml(_)),...ir(N)?Ei(N):{}}}function Gl(_){return Array.isArray(_.PreToolUse)?_.PreToolUse:[]}function Bl(_,N,j){an(_,`${JSON.stringify({...N,PreToolUse:j},null,2)}
`)}function ql(_){let N=io(_),j=ir(N),J=j?Ei(N):iy(_),Y=Gl(J);if(j&&Ft(Y,mt,oo))return{path:N,alreadyInstalled:!0};return Qg(ty(N),{recursive:!0}),Bl(N,J,[...jn(Y,mt),ot(mt,oo)]),{path:N,alreadyInstalled:!1}}function Vl(_){let N=io(_);if(!ir(N))return{path:N,alreadyInstalled:!1};let j=Ei(N),J=Gl(j),Y=jn(J,mt);if(JSON.stringify(Y)===JSON.stringify(J))return{path:N,alreadyInstalled:!1};let re=ir(Ml(_));if(Y.length===0&&Object.keys(j).length===1&&!re)return ny(N),{path:N,alreadyInstalled:!0};return Bl(N,j,Y),{path:N,alreadyInstalled:!0}}function Kl(_){let N=io(_.environment);if(!sy(N))return{platform:"droid",status:"n/a",configPath:N};let j;try{j=JSON.parse(yn(ay(N,"utf-8")))}catch(ie){return{platform:"droid",status:"n/a",configPath:N,errors:[`Failed to parse Factory Droid hooks config ${N}: ${ie instanceof Error?ie.message:String(ie)}`]}}let J=typeof j==="object"&&j!==null&&"PreToolUse"in j?j.PreToolUse:void 0,Y=Mt(Array.isArray(J)?J:[],mt);if(!Y)return{platform:"droid",status:"n/a",configPath:N};let re=[...Y.commandRegex===void 0||Y.commandRegex===""?[]:['Managed hook has a "commandRegex" that narrows coverage; reinstall to repair'],...Ut(Y,mt,oo)];return{platform:"droid",status:"configured",method:"hook config",configPath:N,errors:re.length>0?re:void 0}}import{existsSync as ly}from"node:fs";import{join as _i}from"node:path";var Ti="gemini-safety-net";function Ai(_){let N=_i(_.home,".gemini","extensions"),j=_i(N,Ti);if(!ly(j))return{platform:"gemini-cli",status:"n/a"};let J=_i(N,"extension-enablement.json"),Y=wn(J);if(Y.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let re=Y.kind==="ok"?en(en(Y.value,Ti),"overrides"):void 0;if(Array.isArray(re)&&re.some((de)=>typeof de==="string"&&de.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:J,errors:[`${Ti} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:j}}function Jl(_){return Ai(_.environment)}import{existsSync as py,readFileSync as fy}from"node:fs";import{existsSync as zl,mkdirSync as cy,readFileSync as Yl,rmSync as dy}from"node:fs";import{dirname as uy,join as Wl}from"node:path";var gt=kn["grok-build"],ao=30,Oi=ot(gt,ao);function lo(_){return Wl(_.env.get("GROK_HOME")??Wl(_.home,".grok"),"hooks","cc-safety-net.json")}function co(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Zl(_){try{let N=JSON.parse(_);return co(N)?N:null}catch{return null}}function Xl(_){let N=co(_.hooks)?_.hooks.PreToolUse:void 0;return Array.isArray(N)?N:[]}function so(_,N,j){let J=co(N.hooks)?N.hooks:{};an(_,`${JSON.stringify({...N,hooks:{...J,PreToolUse:j}},null,2)}
`)}function Ql(_){let N=lo(_);if(!zl(N))return cy(uy(N),{recursive:!0}),so(N,{},[Oi]),{path:N,alreadyInstalled:!1};let j=Zl(Yl(N,"utf-8"));if(!j)return so(N,{},[Oi]),{path:N,alreadyInstalled:!1};let J=Xl(j);if(Ft(J,gt,ao))return{path:N,alreadyInstalled:!0};return so(N,j,[...jn(J,gt),Oi]),{path:N,alreadyInstalled:!1}}function ec(_){let N=lo(_);if(!zl(N))return{path:N,alreadyInstalled:!1};let j=Zl(Yl(N,"utf-8"));if(!j)return{path:N,alreadyInstalled:!1};let J=Xl(j),Y=jn(J,gt);if(JSON.stringify(Y)===JSON.stringify(J))return{path:N,alreadyInstalled:!1};let re=co(j.hooks)?j.hooks:{};if(Y.length===0&&Object.keys(j).length===1&&Object.keys(re).length===1)return dy(N),{path:N,alreadyInstalled:!0};return so(N,j,Y),{path:N,alreadyInstalled:!0}}function nc(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function tc(_){let N=lo(_.environment);if(!py(N))return{platform:"grok-build",status:"n/a",configPath:N};let j;try{j=JSON.parse(fy(N,"utf-8"))}catch(ie){return{platform:"grok-build",status:"n/a",configPath:N,errors:[`Failed to parse Grok Build hooks config ${N}: ${ie instanceof Error?ie.message:String(ie)}`]}}let J=nc(j)&&nc(j.hooks)?j.hooks.PreToolUse:void 0,Y=Mt(Array.isArray(J)?J:[],gt);if(!Y)return{platform:"grok-build",status:"n/a",configPath:N};let re=Ut(Y,gt,ao);return{platform:"grok-build",status:"configured",method:"hook config",configPath:N,errors:re.length>0?re:void 0}}import{readFileSync as uc}from"node:fs";import{join as pc}from"node:path";var Sn="cc-safety-net",Ii="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",my=30;function rc(_){return`${Ii}
# version: ${_}
`}function gy(_){return`${rc(_)}name: ${Sn}
version: "${_}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function yy(_){return`${rc(_)}"""CC Safety Net guard for Hermes Agent.

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
ANALYZER = [${kn["hermes-agent"].split(" ").map((N)=>`"${N}"`).join(", ")}]
TIMEOUT_SECONDS = ${my}


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
`}function sr(_){return[{name:"__init__.py",content:yy(_)},{name:"plugin.yaml",content:gy(_)}]}import{mkdirSync as hy,readdirSync as vy,readFileSync as oc,rmSync as $i}from"node:fs";import{basename as by,dirname as wy,join as Hn}from"node:path";var ky="__pycache__",Cy=/^[a-z0-9][a-z0-9_-]{0,63}$/;function xy(_){try{return oc(_,"utf-8").trim()}catch{return}}function Di(_){let N=_.env.get("HERMES_HOME")?.trim();if(N&&by(wy(N))==="profiles")return N;let j=N||Hn(_.home,".hermes"),J=Hn(j,"active_profile"),Y=xy(J),re=Y?.toLowerCase();if(!re||re==="default")return j;if(!Cy.test(re))throw Error(`Invalid Hermes profile name "${Y}" in ${J}; run \`hermes profile use <name>\` with a valid profile.`);return Hn(j,"profiles",re)}function Li(_){return Hn(Di(_),"plugins",Sn)}function Ni(_){return _.startsWith(Ii)}function ji(_,N){let j=Li(_),J=cn(j);if(J&&(J.isSymbolicLink()||!J.isDirectory()))throw Error(`Refusing to ${N} ${j}: not a regular directory. Move or remove it and rerun ${N==="install"?"install":"uninstall"} --hermes-agent.`);return j}function ic(_,N){let j=cn(_);if(!j)return;if(j.isSymbolicLink()||!j.isFile())throw Error(`Refusing to ${N} ${_}: not a regular file. Move or remove it.`);let J=oc(_,"utf-8");if(!Ni(J))throw Error(`Refusing to ${N} unmanaged file at ${_}. Move or remove it.`);return J}function sc(_){let N=ji(_,"install"),j=sr(un());if(j.map((Y)=>ic(Hn(N,Y.name),"overwrite")).every((Y,re)=>Y===j[re]?.content))return{path:N,alreadyInstalled:!0};return hy(N,{recursive:!0}),j.forEach((Y)=>{an(Hn(N,Y.name),Y.content)}),{path:N,alreadyInstalled:!1}}function Hi(_){let N=ji(_,"remove");if(!cn(N))return[];return sr(un()).filter((j)=>ic(Hn(N,j.name),"remove")!==void 0)}function ac(_){let N=ji(_,"remove");if(!cn(N))return{path:N,alreadyInstalled:!1};let j=Hi(_);if(j.forEach((J)=>{$i(Hn(N,J.name))}),$i(Hn(N,ky),{recursive:!0,force:!0}),vy(N).length===0)$i(N,{recursive:!0});return{path:N,alreadyInstalled:j.length>0}}var ar="hermes-agent",lc=/^([^\s#][^:]*):/,Sy=/^\s+([A-Za-z_][\w-]*):/,cc=/^\s+-\s*(.*)$/;function Py(_){return _.trim().replace(/^(["'])(.*)\1$/,"$2")}function Ry(_){let N=_.split(/\r?\n/),j=N.findIndex((re)=>lc.exec(re)?.[1]?.trim()==="plugins");if(j===-1)return[];let J=N.slice(j+1),Y=J.findIndex((re)=>lc.test(re));return Y===-1?J:J.slice(0,Y)}function dc(_,N){let j=Ry(_),J=j.findIndex((ie)=>Sy.exec(ie)?.[1]===N);if(J===-1)return[];let Y=j.slice(J+1),re=Y.findIndex((ie)=>!cc.test(ie));return(re===-1?Y:Y.slice(0,re)).map((ie)=>Py(cc.exec(ie)?.[1]??""))}function Ey(_){try{return uc(pc(Di(_),"config.yaml"),"utf-8")}catch{return}}function Fi(_){let N=Ey(_)??"";return dc(N,"enabled").includes(Sn)&&!dc(N,"disabled").includes(Sn)}function fc(_){return/^# version:\s*(.+)$/m.exec(_)?.[1]?.trim()}function _y(_,N){let j=cn(_);if(!j)return{error:`${N.name} is missing from ${_}; run install --hermes-agent`};if(j.isSymbolicLink()||!j.isFile())return{error:`${_} is a symlink or not a regular file; move or remove it`};try{let J=uc(_,"utf-8");if(!Ni(J))return{error:`Unmanaged ${N.name} occupies ${_}; move or remove it`};if(fc(J)===un()&&J!==N.content)return{error:`Modified ${N.name} occupies ${_}; run install --hermes-agent to restore it`};return{content:J}}catch(J){return{error:`Failed to read ${_}: ${J instanceof Error?J.message:String(J)}`}}}function Ty(_){try{return{path:Li(_)}}catch(N){return{error:N instanceof Error?N.message:String(N)}}}function mc(_){let N=Ty(_.environment);if("error"in N)return{platform:ar,status:"n/a",errors:[N.error]};let j=N.path,J=qr(ar,j);if(J)return J;let Y=sr(un()).map((fe)=>_y(pc(j,fe.name),fe)),re=Y.flatMap((fe)=>("error"in fe)?[fe.error]:[]);if(re.length>0)return{platform:ar,status:"n/a",configPath:j,errors:re};let ie=Y.some((fe)=>("content"in fe)&&fc(fe.content)!==un()),de=ie?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!Fi(_.environment))return{platform:ar,status:"disabled",method:"plugin directory",configPath:j,errors:[`${Sn} is not enabled in Hermes; run \`hermes plugins enable ${Sn}\``,...de]};return{platform:ar,status:"configured",method:"plugin directory",configPath:j,errors:ie?de:void 0}}import{existsSync as Ay,readFileSync as Oy}from"node:fs";import{join as gc}from"node:path";var Iy=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/;function $y(_){return gc(_.env.get("KIMI_CODE_HOME")||gc(_.home,".kimi-code"),"config.toml")}function lr(_){let N=$y(_.environment);if(!Ay(N))return{platform:"kimi-code",status:"n/a",configPath:N};try{if(!Iy.test(Oy(N,"utf-8")))return{platform:"kimi-code",status:"n/a",configPath:N}}catch(j){return{platform:"kimi-code",status:"n/a",configPath:N,errors:[`Failed to read ${N}: ${j instanceof Error?j.message:String(j)}`]}}return{platform:"kimi-code",status:"configured",method:"hook config",configPath:N}}import{readFileSync as Sc}from"node:fs";import{join as dr}from"node:path";var dn="cc-safety-net",xn="index.js",Gt="openclaw.plugin.json",Bt="package.json";var uo="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as Dy,lstatSync as Ly,readdirSync as Ny,readFileSync as jy}from"node:fs";import{dirname as yc,join as Bn}from"node:path";import{fileURLToPath as Hy}from"node:url";var Mi=Bn("openclaw",dn),yt=`run \`openclaw plugins enable ${dn}\``,Fy="config reload superseded by a newer runtime config source",My=[xn,Gt,Bt];function hc(_){let N=_.env.get("OPENCLAW_HOME")?.trim();return N?Ln(N,_.home):_.home}function vc(_){let N=hc(_),j=_.env.get("OPENCLAW_STATE_DIR")?.trim();if(j)return Ln(j,N);let J=_.env.get("OPENCLAW_CONFIG_PATH")?.trim();return J?yc(Ln(J,N)):Bn(N,".openclaw")}function bc(_){let N=_.env.get("OPENCLAW_CONFIG_PATH")?.trim();return N?Ln(N,hc(_)):Bn(vc(_),"openclaw.json")}function cr(_){return Bn(vc(_),"extensions",dn)}function Uy(_){let N=Ny(_);if(N.length===0)return!0;if(N.some((Y)=>!My.includes(Y)))return!1;let j=Bn(_,xn),J=cn(j);return J!==void 0&&!J.isSymbolicLink()&&J.isFile()&&jy(j,"utf-8").startsWith(uo)}function Ui(_){let N=cr(_),j=cn(N);if(!j)return;if(!j.isSymbolicLink()&&j.isDirectory()&&Uy(N))return;throw Error(`Refusing to modify ${N}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function wc(){let _=yc(Hy(import.meta.url));return[Bn(_,Mi),Bn(_,"..",Mi),Bn(_,"..","..","..","dist",Mi)]}function Gi(_=wc()){return _.find((N)=>Dy(N)&&Ly(N).isDirectory())}function Gy(_=wc()){let N=Gi(_);if(!N)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return N}function kc(_=Gy()){return[["openclaw","plugins","install",_,"--force","--accept-capabilities"]]}function By(_){let N=(()=>{try{return JSON.parse(_)}catch{return}})(),j=en(en(N,"plugin"),"status");return typeof j==="string"?j:void 0}async function qy(){await fn(["openclaw","plugins","enable",dn]).catch((_)=>{if(!(_ instanceof Error&&_.message.includes(Fy)))throw _})}async function Cc(_){let N=async()=>By(await fn(["openclaw","plugins","inspect",dn,"--runtime","--json"],{stdoutOnly:!0})),j=await N(),J=j==="disabled"&&_;if(J)await qy();let Y=J?await N():j;if(Y==="loaded")return;throw Error(`${Y===void 0?`The ${dn} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:Y==="disabled"?`OpenClaw reports the ${dn} plugin with status "disabled"; ${yt}.`:`OpenClaw reports the ${dn} plugin with status "${Y}".`} Run \`openclaw plugins inspect ${dn} --runtime\` for details.`)}var po="openclaw";function qt(_,N){let j=dr(_,N),J=cn(j);if(!J)return{error:`${N} is missing from ${j}; run install --openclaw`};if(J.isSymbolicLink()||!J.isFile())return{error:`${j} is a symlink or not a regular file; move or remove it`};try{return{content:Sc(j,"utf-8")}}catch(Y){return{error:`Failed to read ${j}: ${Y instanceof Error?Y.message:String(Y)}`}}}function Pc(_){try{return JSON.parse(yn(_))}catch{return}}function Vy(_){let N=qt(_,Gt);if("error"in N)return N.error;if(en(Pc(N.content),"id")===dn)return;return`${dr(_,Gt)} is not a valid ${dn} manifest; run install --openclaw`}function Ky(_){let N=qt(_,Bt);if("error"in N)return N.error;let j=en(en(Pc(N.content),"openclaw"),"extensions");if(Array.isArray(j)&&j.includes(`./${xn}`))return;return`${dr(_,Bt)} does not point OpenClaw at ${xn}; run install --openclaw`}function xc(_){return Array.isArray(_)?_.filter((N)=>typeof N==="string"):[]}function Jy(_){let N=bc(_);if(!cn(N))return`${dn} is not enabled; ${yt}`;let j=(()=>{try{return JSON.parse(yn(Sc(N,"utf-8")))}catch{return}})();if(j===void 0)return`Failed to read ${N}; fix it, then ${yt}`;let J=en(j,"plugins");if(en(J,"enabled")===!1)return`plugins.enabled is false in ${N}; no OpenClaw plugin loads`;let Y=en(en(en(J,"entries"),dn),"enabled");if(xc(en(J,"deny")).includes(dn)||Y===!1)return`${dn} is disabled in ${N}; ${yt}`;let re=xc(en(J,"allow"));if(re.length>0&&!re.includes(dn))return`plugins.allow in ${N} does not list ${dn}; add it, then ${yt}`;if(re.includes(dn)||Y===!0)return;return`${dn} is not enabled; ${yt}`}function Rc(_){return/^\/\/ version:\s*(.+)$/m.exec(_)?.[1]?.trim()}function Wy(_,N,j){if(j===void 0)return[];let J=qt(j,xn);if(!(("content"in J)&&Rc(J.content)===N))return[];return[xn,Gt,Bt].flatMap((re)=>{let ie=qt(_,re),de=qt(j,re);if("error"in ie||"error"in de||ie.content===de.content)return[];return[`Modified ${re} occupies ${dr(_,re)}; run install --openclaw to restore it`]})}function Ec(_){let N=cr(_.environment),j=qr(po,N);if(j)return j;let J=qt(N,xn),re=["error"in J?J.error:J.content.startsWith(uo)?void 0:`Unmanaged ${xn} occupies ${dr(N,xn)}; move or remove it`,Vy(N),Ky(N)].filter((ke)=>ke!==void 0),ie="content"in J?Rc(J.content):void 0,de=re.length>0?re:Wy(N,ie,Gi());if(de.length>0)return{platform:po,status:"n/a",configPath:N,errors:de};let fe=ie===un()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],we=Jy(_.environment);if(we)return{platform:po,status:"disabled",method:"plugin directory",configPath:N,errors:[we,...fe]};return{platform:po,status:"configured",method:"plugin directory",configPath:N,errors:fe.length>0?fe:void 0}}import{existsSync as rh,readFileSync as oh}from"node:fs";import{basename as ih}from"node:path";import{existsSync as fo,readFileSync as qi,rmSync as zy}from"node:fs";import{join as Tn}from"node:path";import{pathToFileURL as Yy}from"node:url";var ur="cc-safety-net",xt=`${ur}@latest`,Vi=["opencode.json","opencode.jsonc"],Zy=60,Xy=250,_c="CCSafetyNetPlugin",Qy={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function Tc(_){return Tn(_.env.get("XDG_CONFIG_HOME")||Tn(_.home,".config"),"opencode")}function Ki(_){return _.env.get("OPENCODE_CONFIG_DIR")||Tc(_)}function Ji(_){return Vi.map((N)=>Tn(Ki(_),N))}function Wi(_){return[...new Set([Ki(_),Tc(_)])].flatMap((N)=>Vi.map((j)=>Tn(N,j)))}function Ac(_){return Tn(_.env.get("XDG_CACHE_HOME")||Tn(_.home,".cache"),"opencode","packages",xt)}function Oc(_){zy(Ac(_),{recursive:!0,force:!0})}async function Ic(_){let N=(await fn(["opencode","--version"],{stdoutOnly:!0})).trim(),j=/^(?:opencode\s+)?v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(N),J=Number(j?.[1]),Y=Number(j?.[2]),re=Number(j?.[3]);if(!j||J!==1&&J!==2||J===1&&(Y<18||Y===18&&re<29)||J===2&&Y===0&&re<6)throw Error(`OpenCode 1.18.29+ or 2.0.6+ is required; found ${N||"an unknown version"}.`);if(J===2){for(let ie of Ji(_)){if(!fo(ie))continue;let de=Yi(qi(ie,"utf-8"),ie);if(["plugin","plugins"].some((we)=>{let ke=en(de,we);return Array.isArray(ke)&&ke.some((Re)=>mo(Re)&&(typeof Re==="string"?Re:en(Re,"package"))!==xt)}))throw Error(`Change the cc-safety-net package spec in ${ie} to ${xt}, preserving its options, then retry. Adding another spec would create a duplicate plugin ID.`)}return{commands:[],afterInstall:async()=>{if((await fn(["opencode","plugin","add",xt],{stdoutOnly:!0})).includes("is already configured in"))await Bi(),await fn(["opencode","plugin","update",xt]);let de=await Bi();if(!/^cc-safety-net\s+\S+\s+cc-safety-net@latest\s*$/m.test(de))throw Error("OpenCode did not load cc-safety-net from cc-safety-net@latest. Run `opencode plugin list` for details.");let fe=["--param",`location[directory]=${process.cwd()}`];await fn(["opencode","api","integration.list",...fe]);let we=await fn(["opencode","api","plugin.list",...fe],{stdoutOnly:!0}),ke=zi(we);if(ke)throw Error(ke);if(!$c(we).some(Dc))throw Error("OpenCode lists no active cc-safety-net for this directory. Run `opencode api plugin.list` for details.")}}}return Oc(_),{commands:[["opencode","plugin","-g","-f",xt]],afterInstall:()=>nh(_)}}function $c(_){return eh(_).filter((N)=>en(N,"id")===ur||mo(en(en(N,"source"),"target"))).map((N)=>en(N,"state"))}function Dc(_){return en(_,"status")==="active"}function zi(_){let N=$c(_);if(N.some(Dc))return;let j=N.find((J)=>en(J,"status")==="failed");if(!j)return;return`OpenCode reports cc-safety-net failed: ${String(en(j,"error")).split(`
`)[0]}`}function eh(_){if(!_)return[];try{let N=en(JSON.parse(_),"data");return Array.isArray(N)?N:[]}catch{return[]}}async function Bi(_=1){let N=await fn(["opencode","plugin","list"],{stdoutOnly:!0});if(/^cc-safety-net\s|\scc-safety-net@latest\s*$/m.test(N)||_===Zy)return N;return await new Promise((j)=>setTimeout(j,Xy)),Bi(_+1)}async function nh(_){let N=Tn(Ac(_),"node_modules",ur),j=Tn(N,"package.json");if(!fo(j))throw Error(`The OpenCode plugin cache at ${N} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${xt}\` for details.`);let J=en(JSON.parse(qi(j,"utf-8")),"main");if(typeof J!=="string")throw Error(`The cached OpenCode plugin at ${N} declares no "main" entry.`);let Y=Tn(N,J);if(typeof(await import(Yy(Y).href))[_c]==="function")return;throw Error(`The cached OpenCode plugin at ${Y} does not export a callable ${_c}, so OpenCode would load nothing and fail open.`)}function Yi(_,N){try{return JSON.parse(yn(_))}catch(j){if(j instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${N}: ${j.message}`);throw j}}function mo(_){let N=typeof _==="string"?_:en(_,"package");return typeof N==="string"&&(N===ur||N.startsWith(`${ur}@`))}function Zi(_){return["plugin","plugins"].some((N)=>{let j=en(_,N);return Array.isArray(j)&&j.some(mo)})}function th(_,N){let J=["plugin","plugins"].flatMap((Y)=>{let re=cl(_,Y,Qy);if(!re)return[];let ie=[],de=0,fe=re.start+1,we=_.slice(re.start+1,re.end).matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|[^"\s{}[\],/]+|[{}[\],]/g);for(let ke of we){if(ke[0].startsWith("//")||ke[0].startsWith("/*"))continue;let Re=re.start+1+ke.index;if(de===0)fe=Re;if(ke[0]==="{"||ke[0]==="[")de++;if(ke[0]==="}"||ke[0]==="]")de--;if(de!==0||ke[0]===",")continue;let Te=Re+ke[0].length;if(mo(JSON.parse(yn(_.slice(fe,Te)))))ie.push({start:fe,end:Te})}return ie}).sort((Y,re)=>Y.start-re.start).reverse().reduce((Y,re)=>{let ie=/^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*,/.exec(Y.slice(re.end));if(ie?.[0].includes("/")){let de=re.end+ie[0].length-1;return Y.slice(0,re.start)+Y.slice(re.end,de)+Y.slice(de+1)}return ll(Y,re)},_);return Yi(J,N),J}function Lc(_){Oc(_);let N=Wi(_),j=N.find((re)=>fo(re)),J=[],Y=[];for(let re of N){if(!fo(re))continue;try{let ie=qi(re,"utf-8");if(!Zi(Yi(ie,re)))continue;an(re,th(ie,re)),Y.push(re)}catch(ie){J.push(ie instanceof Error?ie.message:String(ie))}}if(J.length>0)throw Error(J.join(`
`));return{path:Y[0]??j??Tn(Ki(_),Vi[0]),alreadyInstalled:Y.length>0}}function Vt(_){let N=[];for(let j of _.openCodeVersion?.startsWith("2.")?Ji(_.environment):Wi(_.environment))if(rh(j))try{let J=oh(j,"utf-8"),Y=yn(J),re=JSON.parse(Y);if(Zi(re)){let ie=zi(_.openCodePluginListOutput);if(ie)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:j,errors:[...N,ie]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:j,errors:N.length>0?N:void 0}}}catch(J){N.push(`Failed to parse ${ih(j)}: ${J instanceof Error?J.message:String(J)}`)}return{platform:"opencode",status:"n/a",errors:N.length>0?N:void 0}}import{join as Nc}from"node:path";function Xi(_){let N=_.env.get("PI_CODING_AGENT_DIR");return Nc(N?Ln(N,_.home):Nc(_.home,".pi","agent"),"settings.json")}function Qi(_){if(typeof _!=="string")return!1;return _==="npm:cc-safety-net"||_.startsWith("npm:cc-safety-net@")}function jc(_){let N=Xi(_.environment),j=wn(N);if(j.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(j.kind==="missing")return{platform:"pi",status:"n/a"};let J=en(j.value,"packages");if(!Array.isArray(J))return{platform:"pi",status:"n/a"};let Y=J.find((de)=>Qi(typeof de==="string"?de:en(de,"source")));if(Y===void 0)return{platform:"pi",status:"n/a"};let re=en(Y,"extensions");if(Array.isArray(re)&&re.some((de)=>typeof de==="string"&&de.startsWith("-")))return{platform:"pi",status:"disabled",method:"package config",configPath:N,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:N}}var sh={amp:Wa,"antigravity-cli":Za,"claude-code":tl,codex:ol,"copilot-cli":wl,cursor:Tl,"deepseek-harness":Ol,devin:Fl,droid:Kl,"gemini-cli":Jl,"grok-build":tc,"hermes-agent":mc,"kimi-code":lr,openclaw:Ec,opencode:Vt,pi:jc};function Kt(_,N,j){let J={...j,cwd:N,environment:_};return Er.map((Y)=>ah(sh[Y](J)))}function ah(_){if(_.status==="not-inspected")return{platform:_.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:_.platform,detected:_.status!=="n/a",configured:_.status==="configured",inspectionStatus:_.status!=="n/a"?"verified":_.errors&&_.errors.length>0?"failed":"not-applicable",method:_.method,configPath:_.configPath,configPaths:_.configPaths,errors:_.errors}}import{join as lh}from"node:path";var ch=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),dh=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),commandTools:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),uh={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function Hc(_){let N=lh(_.tmpdir,"cc-safety-net-self-test"),j=ch.map((J)=>{let Y=G(_,l("self-test",{command:J.command},{kind:"command",shell:"auto"},{configCwd:N,executionCwd:N},J.command),{guard:{dependencies:{loadPolicySnapshot:()=>dh,getModes:()=>uh,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),re=J.expectBlocked?"blocked":"allowed",ie=Y.decision.kind==="deny"?"blocked":"allowed";return{command:J.command,description:J.description,expected:re,actual:ie,passed:re===ie,reason:Y.decision.kind==="deny"?Y.decision.reason:void 0,ruleId:Y.decision.kind==="deny"?Y.decision.ruleId:void 0}});return{passed:j.filter((J)=>J.passed).length,failed:j.filter((J)=>!J.passed).length,total:j.length,results:j}}function es(_){let N=mn({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},_);if($n(N.errors))return null;return{json:N.flags.json,skipUpdateCheck:N.flags.skipUpdateCheck}}async function Fc(_,N={}){let j=await Qt(!N.json,()=>{let J=fh(_,N);return{ready:J,finish:()=>J}},()=>Xt(),{loadingMessage:"Checking system status…"});if(N.json)console.log(JSON.stringify(j,null,2));else mh(j);return j.engineSelfTest.failed>0||j.findings.some((J)=>J.severity==="error")?1:0}async function fh(_,N){let j=N.cwd??process.cwd(),J=await Nr((Le)=>Vt({environment:_,cwd:j,openCodeVersion:Le}).status!=="n/a",void 0,j),Y=Kt(_,j,{ampPluginListOutput:J.ampPluginListOutput,codexPluginListOutput:J.codexPluginListOutput,copilotCliVersion:J.versions["copilot-cli"],openCodeVersion:J.versions.opencode,openCodePluginListOutput:J.openCodePluginListOutput}),re=da(_,j),ie=ua(_),de=R(_,{cwd:j}),fe=de.policy,we=P(fe,_.env),ke=V(fe,we.capabilities),Re=Or(_,7),Te=Ba(_,j),Ee=[Ir(j),Lt(_)].filter((Le)=>ph(Le)),De=N.skipUpdateCheck?{currentVersion:un(),latestVersion:null,updateAvailable:!1}:await Gn(),He={hooks:Y,engineSelfTest:Hc(_),userConfig:re.userConfig,projectConfig:re.projectConfig,configState:ze(de),effectiveRules:re.effectiveRules,environment:ie,effectiveSafety:{selectedPreset:fe.safety.level??"standard",level:we.effectiveLevel,capabilities:we.capabilities,ruleOverrides:fe.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(ke).filter(([,Le])=>Le.source==="rule_override"&&Le.override==="off"&&Le.inheritedEnabled&&Le.changesInherited).map(([Le])=>Le),ruleCounts:{stored:Object.keys(fe.destructiveCommandRuleOverrides).length,effective:Object.values(ke).filter((Le)=>Le.changesInherited).length},...de.policyScopes?{policyScopes:de.policyScopes}:{}},...Te.length>0?{v2Leftovers:Te}:{},...Ee.length>0?{legacyConfigs:Ee}:{},posture:Pa(_,re.userConfig.path),activity:Re,update:De,system:J};return{...He,findings:fa(He)}}function mh(_){console.log(),console.log(ga(_.hooks)),console.log(),console.log(ya(_.engineSelfTest)),console.log(),console.log(ha(_)),console.log(),console.log(va(_.environment)),console.log(),console.log(ba(_)),console.log(),console.log(wa(_.findings)),console.log(),console.log(ka(_.activity)),console.log(),console.log(xa(_.system)),console.log(),console.log(Ca(_.update)),console.log(Sa(_))}import{existsSync as gh}from"node:fs";var yh=/^[A-Za-z0-9_@%+=:,./-]+$/,Mc="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function ns(_){let N=mn({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},_);if($n(N.errors))return console.error(Mc),console.error("Pass -- before a command that starts with dashes."),null;if(N.values.cwd!==void 0&&!gh(N.values.cwd))return console.error(`Error: --cwd path does not exist: ${N.values.cwd}`),null;let j=N.positionals.length===1?N.positionals[0]:N.positionals.map((J)=>yh.test(J)?J:`'${J.replaceAll("'","'\\''")}'`).join(" ");if(!j)return console.error("Error: No command provided"),console.error(Mc),null;return{json:N.flags.json,cwd:N.values.cwd,command:j}}function Uc(_){if(_)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function Gc(_,N){let J=N-18;return[`${_.dtl}${_.dh.repeat(N)}${_.dtr}`,`${_.dv}  Command Analysis${" ".repeat(J)}${_.dv}`,`${_.dbl}${_.dh.repeat(N)}${_.dbr}`]}function ts(_){return JSON.stringify(_)}function Bc(_,N=0){return`[${_.map((J,Y)=>ma(J,Y,N)).join(",")}]`}function pr(_,N,j=70){let J=_.split(" "),Y=[],re="";for(let ie of J)if(re&&re.length+ie.length+1>j)Y.push(re),re=ie;else re=re?`${re} ${ie}`:ie;if(re)Y.push(re);return Y.map((ie,de)=>de===0?ie:`${N}${ie}`)}function qc(_,N,j){let J=[];switch(_.type){case"parse":return null;case"env-strip":return J.push(""),J.push(`STEP ${N} ${j.h} Strip environment variables`),J.push(`  Removed: ${_.envVars.map((Y)=>`${Y}=<redacted>`).join(", ")}`),J.push(`  Tokens:  ${ts(_.output)}`),{lines:J,incrementStep:!0};case"leading-tokens-stripped":return J.push(""),J.push(`STEP ${N} ${j.h} Strip wrappers`),J.push(`  Removed: ${_.removed.join(", ")}`),J.push(`  Tokens:  ${ts(_.output)}`),{lines:J,incrementStep:!0};case"shell-wrapper":return J.push(""),J.push(`STEP ${N} ${j.h} Detect shell wrapper`),J.push(`  Wrapper: ${_.wrapper} -c`),J.push(`  Inner:   ${_.innerCommand}`),{lines:J,incrementStep:!0};case"interpreter":{if(J.push(""),J.push(`STEP ${N} ${j.h} Detect interpreter`),J.push(`  Interpreter: ${_.interpreter}`),J.push(`  Code:        ${_.codeArg}`),_.paranoidBlocked)J.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:J,incrementStep:!0}}case"busybox":return J.push(""),J.push(`STEP ${N} ${j.h} Busybox wrapper`),J.push(`  Subcommand: ${_.subcommand}`),{lines:J,incrementStep:!0};case"transparent-wrapper":return J.push(""),J.push(`STEP ${N} ${j.h} Transparent wrapper`),J.push(`  Wrapper: ${_.wrapper}`),J.push(`  Tokens:  ${ts(_.output)}`),{lines:J,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(J.push(""),J.push(`STEP ${N} ${j.h} Match rules`),J.push(`  Rule:   ${_.rule}()`),_.matched)J.push("  Result: MATCHED");else J.push("  Result: No match");return{lines:J,incrementStep:!0}}case"worktree-relaxation":return J.push(""),J.push(`STEP ${N} ${j.h} Worktree relaxation`),J.push(`  Mode:   ${n.worktree.name}`),J.push(`  Git cwd: ${_.gitCwd}`),J.push("  Result: Allowed local discard in linked worktree"),{lines:J,incrementStep:!0};case"temp-root-relaxation":return J.push(""),J.push(`STEP ${N} ${j.h} Temp-root relaxation`),J.push(`  Git cwd: ${_.gitCwd}`),J.push("  Result: Allowed git discard in a temp-root repository"),{lines:J,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(_.embeddedCommandFound)return J.push(""),J.push(`STEP ${N} ${j.h} Fallback scan`),J.push(`  Found: ${_.embeddedCommandFound}`),{lines:J,incrementStep:!0};return null}case"custom-rules-check":{if(_.rulesChecked){if(J.push(""),J.push(`STEP ${N} ${j.h} Custom rules`),_.matched)J.push("  Result: MATCHED");else J.push("  Result: No match");return{lines:J,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(_.matched)return J.push(""),J.push(`STEP ${N} ${j.h} Dangerous text check`),J.push(`  Token:  ${_.token}`),J.push("  Result: MATCHED"),{lines:J,incrementStep:!0};return null}case"strict-unparseable":return J.push(""),J.push(`STEP ${N} ${j.h} Strict mode check`),J.push(`  Command: ${_.rawCommand}`),J.push("  Result:  ✗ UNPARSEABLE"),{lines:J,incrementStep:!0};case"segment-skipped":return null;case"error":return J.push(""),J.push(`ERROR: ${_.message}`),{lines:J,incrementStep:!1};default:return _}}function rs(_,N){let j=Uc(N?.asciiOnly??!1),J=58,Y=[],re=1;Y.push(...Gc(j,58)),Y.push("");let ie=_.trace.steps.find((De)=>De.type==="error");if(ie&&ie.type==="error"){Y.push("ERROR"),Y.push(`  ${ie.message}`),Y.push(""),Y.push("RESULT"),Y.push(`  Status: ${_.result==="blocked"?Ze.red("BLOCKED"):Ze.green("ALLOWED")}`),Y.push(""),Y.push("CONFIG");let De=_.configSource??"none";return Y.push(`  Path: ${De}`),Y.join(`
`)}let de=_.trace.steps.find((De)=>De.type==="parse");if(de&&de.type==="parse"){Y.push("INPUT"),Y.push(`  ${de.input}`),Y.push(""),Y.push(`STEP ${re} ${j.h} Split shell commands`),re++;for(let De=0;De<de.segments.length;De++){let He=de.segments[De];if(He){let Le=Math.random();Y.push(`  Segment ${De+1}: ${Bc(He,Le)}`)}}}let fe=_.trace.segments,we=fe.length>1;for(let De of fe){if(we){Y.push("");let tn="";if(de&&de.type==="parse"){let Fo=de.segments[De.index];if(Fo)tn=Fo.join(" ")}let rn=54,on=tn,nn=` Segment ${De.index+1}: `,pn=" ";if(tn){if(nn.length+tn.length+pn.length>rn){let Jp=rn-nn.length-pn.length;on=`${tn.substring(0,Jp-1)}…`}}let In=tn?`${nn}${on}${pn}`:` Segment ${De.index+1} `,Vp=tn?`${nn}${Ze.cyan(on)}${pn}`:In,Fs=58-In.length,Ms=Math.floor(Fs/2),Kp=Fs-Ms;Y.push(`${j.sh.repeat(Ms)}${Vp}${j.sh.repeat(Kp)}`)}if(De.steps.find((tn)=>tn.type==="segment-skipped")){Y.push(""),Y.push("  (skipped — prior segment blocked)");continue}let Le=!1,Ye=!1;for(let tn of De.steps){let rn=qc(tn,re,j);if(rn){if(Ye=!0,tn.type==="recurse"){Y.push("");let on=" RECURSING ",nn=58-on.length-4;Y.push(`  ${j.tl}${j.h}${on}${j.h.repeat(nn)}`),Y.push(`  ${j.v}`),Le=!0;continue}for(let on of rn.lines)if(Le)Y.push(`  ${j.v} ${on}`);else Y.push(on);if(rn.incrementStep)re++}}if(Le)Y.push(`  ${j.v}`),Y.push(`  ${j.bl}${j.h.repeat(56)}`);if(!Ye)Y.push(""),Y.push(`  ${Ze.green("✓")} Allowed (no matching rules)`)}if(Y.push(""),Y.push("RESULT"),_.result==="blocked"){if(Y.push(`  Status: ${Ze.red("BLOCKED")}`),_.customRule){if(Y.push(`  Rule: ${_.customRule.id}`),_.customRule.rulebook)Y.push(`  Rulebook: ${_.customRule.rulebook.name} ${_.customRule.rulebook.version}`);if(_.customRule.source)Y.push(`  Source: ${_.customRule.source}`);if(_.customRule.override)Y.push(`  Override: reason ${_.customRule.override.reason}`)}if(_.reason){let De=pr(_.reason,"          ");Y.push(`  Reason: ${De[0]}`);for(let He=1;He<De.length;He++)Y.push(De[He]??"")}}else Y.push(`  Status: ${Ze.green("ALLOWED")}`);Y.push(""),Y.push("CONFIG");let ke=_.configSource??"none",Re=_.configValid?"":" (invalid)";Y.push(`  Path: ${ke}${Re}`);let Te=_.safetyPresetScope;Y.push(`  Safety preset: ${_.selectedPreset??"standard"}${Te?` (${$r(Te)})`:""}`),Y.push(`  Effective capabilities: ${_.effectiveLevel}`);let Ee=Object.entries(_.destructiveCommandRuleOverrides??{});if(Y.push(`  Rule customizations: ${Ee.length}`),_.ruleActivation)Y.push(`  Rule activation: ${_.ruleActivation.id} — ${_.ruleActivation.enabled?"on":"off"} via ${_.ruleActivation.source}`);return Y.join(`
`)}function os(_){return JSON.stringify(_,null,2)}import{resolve as kh}from"node:path";var hh=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function Vc(_){let N=0,j={allocateSegment(){return N++},getNextSegmentIndex(){return N},recordGlobal(J){_.record({kind:"step",scope:"global",step:J})},recordSegment(J,Y=j.currentSegmentIndex){if(Y===void 0)return;_.record({kind:"step",scope:"segment",segmentIndex:Y,step:J})}};return j}function Kc(_={}){let N=[],j=_.maxEvents??512,J={maxTextLength:_.maxTextLength??2048,maxListLength:_.maxListLength??128,maxObjectProperties:_.maxObjectProperties??_.maxListLength??128,maxDepth:_.maxDepth??16},Y,re=new Set;return{record(ie){if(Y)return;if(!ie||N.length>=j)return;try{N.push(as(vh(ie,J,re)))}catch{}},finish(){if(Y)return Y;return Y=as({events:Object.freeze(N)}),Y}}}function vh(_,N,j){if(_.kind!=="step")throw TypeError("invalid trace event");let{scope:J,step:Y}=_;go(Y,j,N);let re=is(Y,N,j);if(J==="global")return{kind:"step",scope:"global",step:re};if(J!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:_.segmentIndex,step:re}}function go(_,N,j,J=0,Y=new WeakSet){if(typeof _==="string"){let de=_.slice(0,j.maxTextLength);if(!nt(de))return;for(let fe of ht(de))for(let we of fe.match(/[^\s"'()$]+/g)??[])N.add(Jc(we));return}if(!_||typeof _!=="object"||J>=j.maxDepth||Y.has(_))return;if(Y.add(_),Array.isArray(_)){let de=Math.min(_.length,j.maxListLength);for(let fe=0;fe<de;fe++)go(_[fe],N,j,J+1,Y);return}let re=0,ie=new Set;for(let de in _){if(!Object.hasOwn(_,de))continue;if(re>=j.maxObjectProperties)break;re++,go(de,N,j);let fe=ss(de,j,N);if(ie.has(fe))continue;ie.add(fe),go(_[de],N,j,J+1,Y)}}function is(_,N,j,J=0,Y=new WeakSet){if(typeof _==="string")return ss(_,N,j);if(!_||typeof _!=="object")return _;if(J>=N.maxDepth)return;if(Y.has(_))return;if(Y.add(_),Array.isArray(_)){let de=[],fe=Math.min(_.length,N.maxListLength);for(let we=0;we<fe;we++)de.push(is(_[we],N,j,J+1,Y));return de}let re={},ie=0;for(let de in _){if(!Object.hasOwn(_,de))continue;if(ie>=N.maxObjectProperties)break;ie++;let fe=ss(de,N,j);if(Object.hasOwn(re,fe))continue;Object.defineProperty(re,fe,{value:is(_[de],N,j,J+1,Y),enumerable:!0,configurable:!0,writable:!0})}return re}function ss(_,N,j){let J=_.slice(0,N.maxTextLength),Y=nt(J)?tt(J):J,re=j.size>0?wh(Y,j):Y;return(bh(re)?Ne(re):re).slice(0,N.maxTextLength)}function bh(_){return _.includes("PRIVATE KEY")||_.includes("://")||_.includes("eyJ")||_.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(_)||_.length>=14&&hh.some((N)=>_.includes(N))||_.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(_)}function wh(_,N){return _.replace(/[^\s"'()$]+/g,(j)=>N.has(Jc(j))?"<redacted>":j)}function Jc(_){let N=2166136261,j=2166136261;for(let J=0;J<_.length;J++)N=Math.imul(N^_.charCodeAt(J),16777619),j=Math.imul(j^_.charCodeAt(_.length-J-1),16777619);return`${N>>>0}:${j>>>0}:${_.length}`}function as(_){if(_&&typeof _==="object"&&!Object.isFrozen(_)){for(let N of Object.values(_))as(N);Object.freeze(_)}return _}function fr(_,N={},j){let J=kh(N.cwd??process.cwd()),Y=N.policySnapshot??R(j,{cwd:J,userConfigDir:N.userConfigDir}),re=P(Y.policy,j.env),ie=Ve({policySnapshot:Y,effectiveCapabilities:re.capabilities,strict:re.strict,paranoidRm:re.paranoidRm,paranoidInterpreters:re.paranoidInterpreters,worktreeMode:re.worktreeMode}),de={effectiveLevel:ie.effectiveLevel,selectedPreset:Y.policy.safety.level??"standard",...Y.policyScopes?{safetyPresetScope:Y.policyScopes.levelScope}:{},effectiveCapabilities:ie.effectiveCapabilities,destructiveCommandRuleOverrides:Y.policy.destructiveCommandRuleOverrides},{configSource:fe,configValid:we}=xh(j,{cwd:J,userConfigDir:N.userConfigDir});if(!_||!_.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:fe,configValid:we,...de};let ke=y(_,"auto");if(ke.status==="limited")throw new b;let Re=ke.dialect==="powershell"?y(_,"posix"):ke,Te=kt(Re),Ee=Kc(),De=Vc(Ee);De.recordGlobal({type:"parse",input:_,segments:Te.map((In)=>[...In])});let He=l("Bash",{command:_},{kind:"command",shell:"auto"},{configCwd:J,executionCwd:J},_),Le=q(He,{environment:j,trace:De,dependencies:{loadPolicySnapshot:()=>Y}}),Ye=Le.decision.kind==="deny"?Le.decision:null;if(Ye&&(Le.stage==="policy-protection"||Le.stage==="secret-protection"))return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:Ch(Ye),matched:!0,reason:Ye.reason}]}]},result:"blocked",reason:T(Ye.reason),segment:T(Wc(Ye,_)),ruleId:T(Ye.ruleId),configSource:fe,configValid:we,...de};let tn=De.getNextSegmentIndex();if(Ye&&tn>0&&tn<Te.length)De.recordSegment({type:"segment-skipped",index:tn,reason:"prior-segment-blocked"},tn);let rn=Ee.finish(),on=Ye?.ruleId??Sh(He,Y,re,j),nn=z.find((In)=>In.id===on&&In.activationCapability),pn=nn?ie.policy.effectiveDestructiveCommandRules[nn.id]:void 0;return{trace:Rh(rn),result:Ye?"blocked":"allowed",reason:Ye?T(Ye.reason):void 0,segment:Ye?T(Wc(Ye,_)):void 0,ruleId:Ye?T(Ye.ruleId):void 0,customRule:Ph(Eh(Ye?.ruleId,Y)),configSource:fe,configValid:we,...de,...nn&&pn?{ruleActivation:{id:nn.id,...pn}}:{}}}function Wc(_,N){return _.evidence?.segment??N}function Ch(_){if(_.reason===Ke)return"policy-protection:findPolicyConfigMutationTargetInSemanticFacts";if(_.reason===qe)return"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts";if(_.reason===v)return"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts";return"secret-protection:findSensitiveTargetInSemanticFacts"}function xh(_,N){let j=I(N.cwd),J=W(_,N),Y=X(_,{cwd:N.cwd,userConfigDir:N.userConfigDir});try{if(r(Y.projectConfigTarget)!==null){if(Un(Y.projectConfigTarget).errors.length===0)return{configSource:j,configValid:!0};return{configSource:j,configValid:!1}}}catch(re){if(re instanceof o)return{configSource:j,configValid:!1};throw re}try{if(r(Y.userConfigTarget)!==null){let re=Un(Y.userConfigTarget);return{configSource:J,configValid:re.errors.length===0}}return{configSource:null,configValid:!0}}catch(re){if(re instanceof o)return{configSource:J,configValid:!1};throw re}}function Sh(_,N,j,J){let Y=N.policy,re=Oe({...Y,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...Y.destructiveCommandRuleOverrides,...Object.fromEntries(z.flatMap((de)=>de.activationCapability?[[de.id,"on"]]:[]))}},N.state==="degraded"?{diagnostics:N.diagnostics,reason:N.reason}:void 0),ie=q(_,{environment:J,dependencies:{loadPolicySnapshot:()=>re,getModes:()=>({...j,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return ie.decision.kind==="deny"?ie.decision.ruleId:void 0}function Ph(_){if(!_)return;return{id:T(_.id),..._.rulebook?{rulebook:{name:T(_.rulebook.name),version:T(_.rulebook.version)}}:{},..._.source?{source:T(_.source)}:{},..._.override?{override:{type:"reason",reason:T(_.override.reason)}}:{}}}function Rh(_){let N=_.events.flatMap((J)=>J.kind==="step"&&J.scope==="global"?[J.step]:[]),j=new Map;for(let J of _.events){if(J.kind!=="step"||J.scope!=="segment")continue;let Y=j.get(J.segmentIndex)??{index:J.segmentIndex,steps:[]};Y.steps.push(J.step),j.set(J.segmentIndex,Y)}return{steps:N,segments:[...j.values()]}}function Eh(_,N){let j=_?.replace(/^custom\./,"");if(!j||!N.policy.rules.some((J)=>J.name===j))return;return N.ruleMetadata[j]??Object.freeze({id:j})}function zc(_){return new Promise((N)=>{process.stdout.write(`${_}
`,()=>N())})}async function Yc(_,N){let j=ns(N);if(!j)return 1;try{let J=fr(j.command,{cwd:j.cwd},_),Y=!!process.env.NO_COLOR||!process.stdout.isTTY;return await zc(j.json?os(J):rs(J,{asciiOnly:Y})),0}catch(J){let Y=_h(J instanceof f?J.cause:J);if(Y===void 0)throw J;if(j.json)return await zc(JSON.stringify({error:Y})),1;return console.error(Y),1}}function _h(_){if(_ instanceof b)return _.message;if(_ instanceof m)return _.message;if(_ instanceof s&&a[_.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Zc="2.6.10",Rn="  ",Pt="cc-safety-net";function Xc(_){return _.argument?`${_.flags} ${_.argument}`:_.flags}function Th(_){return Math.max(..._.map((N)=>Xc(N).length))}function Ah(_){return Math.max(..._.map((N)=>N.usage.length))}function Oh(_){return Math.max(..._.map((N)=>`${Pt} ${N.usage}`.length))}function Ih(_,N){let j=`${Pt} ${_.usage}`;return`${Rn}${j.padEnd(N+2)}${_.description}`}function An(_,N){return`${Rn}${_.padEnd(Math.max(40,_.length+2))}${N}`}function Jt(_,N=console.log){let j=[];if(j.push(`${Pt} ${_.name}`),j.push(""),j.push(`${Rn}${_.description}`),j.push(""),j.push("USAGE:"),j.push(`${Rn}${Pt} ${_.usage}`),j.push(""),_.subcommands&&_.subcommands.length>0){j.push("SUBCOMMANDS:");let J=Ah(_.subcommands);for(let Y of _.subcommands)j.push(`${Rn}${Y.usage.padEnd(J+2)}${Y.description}`);j.push("")}if(_.options.length>0){j.push("OPTIONS:");let J=Th(_.options);for(let Y of _.options){let re=Xc(Y),ie=Y.default?`${Y.description} (default: ${Y.default})`:Y.description;j.push(`${Rn}${re.padEnd(J+2)}${ie}`)}j.push("")}if(_.examples&&_.examples.length>0){j.push("EXAMPLES:");for(let J of _.examples)j.push(`${Rn}${J}`)}N(j.join(`
`))}function ls(){let _=Oh(Tr),N=[];N.push(`${Pt} v${Zc}`),N.push(""),N.push("Blocks destructive commands and secret access."),N.push(""),N.push("COMMANDS:");for(let j of Tr)N.push(Ih(j,_));N.push(""),N.push("GLOBAL OPTIONS:"),N.push(`${Rn}-h, --help       Show help (use with command for command-specific help)`),N.push(`${Rn}-V, --version    Show version`),N.push(""),N.push("HELP:"),N.push(`${Rn}${Pt} help <command>     Show help for a specific command`),N.push(`${Rn}${Pt} <command> --help   Show help for a specific command`),N.push(""),N.push("ENVIRONMENT VARIABLES:"),N.push(An(`${n.level.name}=standard|strict|paranoid`,"Set session safety level")),N.push(An(`${n.worktree.name}=1`,"Allow local git discards in linked worktrees")),N.push(An(`${n.debug.name}=1`,"Print diagnostic messages to stderr")),N.push(An(`${n.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),N.push(An(`${n.projectTightenOnly.name}=1`,"Ignore project policy settings that weaken the user policy")),N.push(An("CC_SAFETY_NET_HOME","Override rule config home directory")),N.push(""),N.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),N.push(An(`${n.strict.name}=1`,"Force safety.overrides.fail_closed on")),N.push(An(`${n.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),N.push(An(`${n.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),N.push(An(`${n.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),N.push(""),N.push("Documentation:        https://ccsafetynet.com/docs"),console.log(N.join(`
`))}function Qc(){console.log(Zc)}function mr(_,N=console.log){let j=Ar(_);if(!j)return!1;if(j.name.toLowerCase()!==_.toLowerCase())return!1;return Jt(j,N),!0}import{existsSync as xo,readFileSync as iu}from"node:fs";import{join as Co}from"node:path";import*as qn from"node:readline";function $h(_){return _==="install"?"Install":"Uninstall"}function Dh(_){return _==="install"?"Installing":"Uninstalling"}function Lh(_){return _==="install"?"into":"from"}function td(_){return _?.available===!0}function Nh(_,N){let j=new Set(N);return _.filter((J)=>j.has(J.target)).map((J)=>J.target)}function ed(_,N,j){if(_.every((J)=>!J.available))return N;return Array.from({length:_.length},(J,Y)=>Y+1).map((J)=>(N+J*j+_.length)%_.length).find((J)=>td(_[J]))}function jh(_,N,j){if(j.ctrl&&j.name==="c")return"interrupt";if(j.name==="escape"||N==="q")return"abort";if(_==="install"&&(N==="u"||N==="U"))return"update";if(j.name==="up"||N==="k")return"up";if(j.name==="down"||N==="j")return"down";if(j.name==="space"||N===" ")return"toggle";if(j.name==="return"||j.name==="enter")return"confirm";return null}function Hh(_){return{cursor:_.findIndex((N)=>N.available),selected:[]}}function Fh(_,N,j){if(j==="confirm"||j==="update"||j==="abort"||j==="interrupt")return{state:_,done:j};if(j==="up")return{state:{..._,cursor:ed(N,_.cursor,-1)}};if(j==="down")return{state:{..._,cursor:ed(N,_.cursor,1)}};let J=N[_.cursor];if(!td(J))return{state:_};let Y=_.selected.includes(J.target)?_.selected.filter((re)=>re!==J.target):Nh(N,[..._.selected,J.target]);return{state:{..._,selected:Y}}}var rd="◉",od="◯",id=">",sd=" ";function Mh(_,N,j){return["",`${$h(_)} CC Safety Net ${Lh(_)}:`,"",...N.map((J,Y)=>{let re=j.selected.includes(J.target),ie=Y===j.cursor,de=re?rd:od,fe=ie?id:sd,we=J.available?"":` (${J.unavailableReason??"not installed"})`,ke=`${de} ${J.label}${we}`,Re=!J.available?Ze.dim(ke):re?Ze.green(ke):ie?Ze.bold(ke):ke;return`${fe} ${Re}`}),"",_==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":N.some((J)=>J.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${_}. q/Esc: close`].join(`
`)}var nd=["global-hook","plugin"];function Uh(_,N,j={}){let J=j.color!==!1?Ze.bold:(re)=>re;return["","Install the Kimi Code integration as:","",...[`Global hook — ${N?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((re,ie)=>{let de=ie===_,fe=`${de?rd:od} ${re}`;return`${de?id:sd} ${de?J(fe):fe}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function ad(_){let{input:N,output:j}=_;qn.emitKeypressEvents(N);let J=N.isRaw===!0;N.setRawMode(!0),N.resume();let Y=0,re=()=>{if(Y===0)return;qn.moveCursor(j,0,-Y),qn.cursorTo(j,0),qn.clearScreenDown(j)},ie=()=>{re();let de=_.render();j.write(`${de}
`),Y=de.split(`
`).length};return new Promise((de)=>{let fe=(ke)=>{N.off("keypress",we),N.setRawMode(J),N.pause(),re(),de(ke)};function we(ke,Re){_.onKey(ke,Re,{finish:fe,draw:ie})}N.on("keypress",we),ie()})}function ld(_={}){let N=0;return ad({input:_.input??process.stdin,output:_.output??process.stdout,render:()=>Uh(N,_.globalHookInstalled===!0),onKey:(j,J,Y)=>{if(J.ctrl&&J.name==="c"){Y.finish(null),(_.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(J.name==="escape"||j==="q")return Y.finish(null);if(J.name==="return"||J.name==="enter")return Y.finish(nd[N]);if(J.name==="up"||J.name==="down"||j==="k"||j==="j")N=(N+1)%nd.length,Y.draw()}})}function cs(_=process.stdin,N=process.stdout){return Boolean(_.isTTY&&N.isTTY&&typeof _.setRawMode==="function")}function cd(_,N,j={}){let J=j.output??process.stdout,Y=Hh(N);return ad({input:j.input??process.stdin,output:J,render:()=>Mh(_,N,Y),onKey:(re,ie,de)=>{let fe=jh(_,re,ie);if(!fe)return;let we=Fh(Y,N,fe);if(Y=we.state,we.done==="interrupt"){de.finish(null),(j.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(we.done==="abort")return de.finish(null);if(we.done==="update")return de.finish("update");if(we.done==="confirm"){if(Y.selected.length===0){J.write("\x07"),de.draw();return}de.finish([...Y.selected]),J.write(`${Dh(_)} selected integrations...
`);return}de.draw()}})}import{existsSync as dd,lstatSync as Bh,mkdirSync as qh,mkdtempSync as Vh,readdirSync as Kh,readFileSync as zt,rmSync as ho}from"node:fs";import{basename as Jh,dirname as Wh,join as Cn}from"node:path";import{fileURLToPath as zh}from"node:url";var ds="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",Rt="cc-safety-net",_t="cc-safety-net/index.ts";import{spawn as Gh}from"node:child_process";var us=(_,N)=>{let j=Zn([..._],process.env);return new Promise((J)=>{let Y=Gh(j.cmd,j.args,{cwd:N,stdio:["ignore","pipe","pipe"]}),re=ci(Y),ie=!1,de=setTimeout(()=>{ie=!0,Y.kill()},120000);Y.on("error",(fe)=>{clearTimeout(de),J({status:null,errorCode:fe.code,stdout:re.stdout,stderr:[fe.message,re.stderr].filter(Boolean).join(`
`)})}),Y.on("close",(fe)=>{clearTimeout(de),J({status:ie?null:fe,errorCode:ie?"ETIMEDOUT":void 0,stdout:re.stdout,stderr:re.stderr})})})};var Wt="cc-safety-net.ts",ps=Cn("amp",_t);function Yh(_){return Cn(_.home,".config","amp","plugins","cc-safety-net.ts")}function Zh(){let _=Wh(zh(import.meta.url)),N=Cn(_,ps),j=Cn(_,"..",ps),J=Cn(_,"..","..","..","dist",ps);return[N,j,J]}function Xh(_=Zh()){let N=_.find((j)=>dd(j)&&Bh(j).isFile());if(!N)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return N}function ud(_){try{return JSON.parse(_)}catch{return}}function vo(_){return _.subarray(0,Buffer.byteLength(ds)).toString("utf-8")===ds}async function gr(_,N,j){let J=await _(N,j);if(J.status===0)return J;throw Error([`Failed to run ${N.join(" ")}${J.status===null?"":` (exit ${J.status})`}.`,[J.stdout,J.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function pd(_){let N=await _(["amp","plugins","repositories","--json"]);if(N.status===null)throw Error(`${N.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${N.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${N.stderr}`.trim());if(N.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${N.status}). Sign in with "amp login" and rerun install --amp.
${[N.stdout,N.stderr].filter(Boolean).join(`
`)}`.trim());let j=ud(N.stdout),J=(Array.isArray(j)?j:[]).filter((Y)=>en(Y,"scope")==="user"&&en(Y,"exists")===!0&&en(Y,"viewerCanWrite")===!0).map((Y)=>en(Y,"cloneRef")).find((Y)=>typeof Y==="string"&&Y.length>0);if(!J)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return J}async function fd(_,N,j){let J=Vh(Cn(N.tmpdir,"cc-safety-net-amp-"));try{return await gr(_,["amp","clone","user-plugins",J]),await j(J)}finally{ho(J,{recursive:!0,force:!0})}}function fs(_){return`rerun ${_==="overwrite"?"install":"uninstall"} --amp`}function md(_,N,j){let J=Cn(_,N),Y=cn(J);if(!Y)return;if(Y.isSymbolicLink()||!Y.isFile())throw Error(`Refusing to ${j} ${N} in your Amp personal plugins repository: not a regular file. Remove it there and ${fs(j)}.`);let re=zt(J);if(vo(re))return re;throw Error(`Refusing to ${j} unmanaged file ${N} in your Amp personal plugins repository. Remove it there and ${fs(j)}.`)}function gd(_,N){let j=Cn(_,Rt),J=cn(j);if(!J)return;if(J.isSymbolicLink()||!J.isDirectory())throw Error(`Refusing to ${N} ${Rt} in your Amp personal plugins repository: not a regular directory. Remove it there and ${fs(N)}.`);return md(_,_t,N)}function Qh(_){let N=Cn(_,Wt),j=cn(N);if(!j||j.isSymbolicLink()||!j.isFile())return;let J=zt(N);return vo(J)?J:void 0}async function yd(_,N,j,J){if(await gr(_,j,N),(await gr(_,["git","status","--porcelain"],N)).stdout.trim()==="")return!1;return await gr(_,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",J],N),await gr(_,["git","push","origin","HEAD"],N),!0}function yo(_,N){ev(_,N),nv(_,N)}function hd(_,N){if(N==="keep")return;throw Error(`Local Amp plugin ${_} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function ev(_,N){let j=Yh(_),J=cn(j);if(!J)return;if(!J.isSymbolicLink()&&J.isFile()&&vo(zt(j))){ho(j);return}hd(j,N)}function nv(_,N){let j=Cn(_.home,".config","amp","plugins",Rt),J=cn(j);if(!J)return;if(!J.isSymbolicLink()&&J.isDirectory()&&tv(j)){ho(j,{recursive:!0});return}hd(j,N)}function tv(_){let N=Jh(_t);if(Kh(_).join("\x00")!==N)return!1;let j=Cn(_,N),J=cn(j);return!!J&&!J.isSymbolicLink()&&J.isFile()&&vo(zt(j))}function rv(_){let N=u(_);if(!dd(N))return"";let j=ud(zt(N,"utf-8"));if(!j||typeof j!=="object"||Array.isArray(j))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(k(j,_.home))};
`}async function vd(_,N=Xh(),j=us){let J=Buffer.concat([zt(N),Buffer.from(rv(_),"utf-8")]),Y=await pd(j);return fd(j,_,async(re)=>{let ie=`${Y}/${Rt}`,de=gd(re,"overwrite"),fe=md(re,Wt,"overwrite");if(de?.equals(J)&&!fe)return yo(_,"fail"),{path:ie,alreadyInstalled:!0};if(qh(Cn(re,Rt),{recursive:!0}),an(Cn(re,_t),J),fe)ho(Cn(re,Wt));let we=await yd(j,re,["git","add","--",_t,...fe?[Wt]:[]],`chore: update cc-safety-net plugin to v${un()}`);return yo(_,"fail"),{path:ie,alreadyInstalled:!we}})}async function bd(_,N=us){let j=await pd(N);return fd(N,_,async(J)=>{let Y=gd(J,"remove"),re=Qh(J),ie=`${j}/${re&&!Y?Wt:Rt}`;if(!Y&&!re)return yo(_,"keep"),{path:ie,alreadyInstalled:!1};return await yd(N,J,["git","rm","--",...Y?[_t]:[],...re?[Wt]:[]],`chore: remove cc-safety-net plugin v${un()}`),yo(_,"keep"),{path:ie,alreadyInstalled:!0}})}import{existsSync as wd,mkdirSync as ov,readFileSync as iv}from"node:fs";import{dirname as sv}from"node:path";var ms=kn["antigravity-cli"],Tt="cc-safety-net";function At(_){return Boolean(_)&&typeof _==="object"&&!Array.isArray(_)}function wo(){return{PreToolUse:[{hooks:[{type:"command",command:ms,timeout:30}]}]}}function kd(_){try{let N=JSON.parse(iv(_,"utf-8"));if(!N||typeof N!=="object"||Array.isArray(N))throw Error("Antigravity hooks config must be a JSON object");return N}catch(N){if(N instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${_}: ${N.message}`);throw N}}function Cd(_){let N=_[Tt];if(N===void 0){let J=wo();return _[Tt]=J,{definition:J,preToolUse:J.PreToolUse??[]}}if(!At(N))throw Error(`Antigravity hooks config entry "${Tt}" must be an object`);let j=Array.isArray(N.PreToolUse)?N.PreToolUse:[];return N.PreToolUse=j,{definition:N,preToolUse:j}}function xd(_){if(!Array.isArray(_.PreToolUse))return!1;return _.PreToolUse.some((N)=>At(N)&&Array.isArray(N.hooks)&&N.hooks.some((j)=>At(j)&&j.command===ms))}function av(_){return Object.values(_).some((N)=>At(N)&&N.enabled!==!1&&xd(N))}function lv(_){if(_[Tt]===void 0)return!1;let N=Cd(_);if(N.definition.enabled!==!1||!xd(N.definition))return!1;return N.definition.enabled=!0,!0}function cv(_){if(_[Tt]===void 0){_[Tt]=wo();return}let N=Cd(_);N.definition.enabled=!0,N.preToolUse.push(wo().PreToolUse?.[0]??{hooks:[]})}function dv(_){let N=!1;for(let j of Object.values(_)){if(!At(j)||!Array.isArray(j.PreToolUse))continue;j.PreToolUse=j.PreToolUse.flatMap((J)=>{if(!At(J)||!Array.isArray(J.hooks))return[J];let Y=J.hooks.filter((re)=>!At(re)||re.command!==ms);if(Y.length!==J.hooks.length)N=!0;return Y.length===0?[]:[{...J,hooks:Y}]})}return N}function bo(_,N){an(_,`${JSON.stringify(N,null,2)}
`)}function Sd(_){let N=er(_.home);if(ov(sv(N),{recursive:!0}),!wd(N))return bo(N,{[Tt]:wo()}),{path:N,alreadyInstalled:!1};let j=kd(N);if(av(j))return{path:N,alreadyInstalled:!0};if(lv(j))return bo(N,j),{path:N,alreadyInstalled:!1};return cv(j),bo(N,j),{path:N,alreadyInstalled:!1}}function Pd(_){let N=er(_.home);if(!wd(N))return{path:N,alreadyInstalled:!1};let j=kd(N);if(!dv(j))return{path:N,alreadyInstalled:!1};return bo(N,j),{path:N,alreadyInstalled:!0}}import{existsSync as hs,readlinkSync as fv}from"node:fs";import{join as Vn}from"node:path";import{spawn as uv}from"node:child_process";var On=Pn.map((_)=>({target:_.id,flag:_.flag,label:ln(_.id),probeCommand:_.probeCommand}));function gs(_){let N=new Set(_);return On.map((j)=>j.target).filter((j)=>N.has(j))}async function Rd(_,N){for(let j of _)await N(j)}var pv=5000;function yr(_,N=pv){return new Promise((j)=>{let J=Zn([..._],process.env),Y=uv(J.cmd,J.args,{env:process.env,stdio:"ignore"}),re=!1,ie=(fe)=>{if(re)return;re=!0,clearTimeout(de),j(fe)},de=setTimeout(()=>{Y.kill(),ie(!1)},N);Y.on("error",()=>ie(!1)),Y.on("close",(fe)=>ie(fe===0))})}function Ed(_=yr,N={}){let j=new Set(N.configuredTargets??[]);return Promise.all(On.map(async(J)=>({target:J.target,flag:J.flag,label:J.label,...Td(N.action,await _(J.probeCommand)||J.target==="cursor"&&await _(Xs),j.has(J.target))})))}function _d(_,N){let j=new Set(N.configuredTargets??[]);return _.map((J)=>({...J,...Td(N.action,J.available,j.has(J.target))}))}function Td(_,N,j){if(_==="uninstall")return j?{available:!0}:{available:!1,unavailableReason:"not installed"};if(_==="install"&&j)return{available:!1,unavailableReason:"already installed"};if(!N)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}var Kn="cc-safety-net",$d=["npx","-y","@deepseek-ai/dsh"],Ad="DeepSeek Harness",Od=["@deepseek-ai","dsh-desktop"],Dd="Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.",ys=(_)=>`DeepSeek Harness Desktop is not in its default location, so ${_} ${Kn} from its Plugins page.`,Ld=(_,N)=>hs(Vn(bi(_),N,"package.json"));function vs(_,N){let j=N.platform??process.platform,J=Ld(_,"desktop"),Y=j==="darwin"?[Vn(_.home,"Applications"),N.systemApplications??"/Applications"].map((re)=>Vn(re,`${Ad}.app`,"Contents","Resources","runtime","cli","bin","dsh")):j==="win32"?[Vn(_.env.get("LOCALAPPDATA")||Vn(_.home,"AppData","Local"),"Programs",Ad,"resources","runtime","cli","bin","dsh.cmd")]:[];return{profile:J,cli:J?Y.find((re)=>hs(re)):void 0}}function Nd(_,N=process.platform){if(N==="win32")return hs(Vn(_.env.get("APPDATA")||Vn(_.home,"AppData","Roaming"),...Od,"lockfile"));let j=mv(Vn(_.home,"Library","Application Support",...Od,"SingletonLock")),J=Number(/-(\d+)$/.exec(j??"")?.[1]);return Number.isInteger(J)&&J>0&&gv(J)}function mv(_){try{return fv(_)}catch{return}}function gv(_){try{return process.kill(_,0),!0}catch(N){return N.code==="EPERM"}}async function jd(_,N={}){let j=vs(_,N);if(j.cli&&Nd(_,N.platform))throw Error(Dd);let J=!j.cli||Ld(_,"web")||await(N.probe??yr)(Uo),Y=[...j.cli?[{profile:"desktop",label:"Desktop",dsh:[j.cli]}]:[],...J?[{profile:"web",label:"web",dsh:$d}]:[]];return{commands:Y.map((re)=>[...re.dsh,"plugin","--profile",re.profile,"add",`${Kn}@${un()}`]),afterInstall:async()=>{let re=new Set(wi(_).filter((de)=>de.enabled).map((de)=>de.name)),ie=Y.filter((de)=>!re.has(de.profile));if(ie.length>0)throw Error(`DeepSeek Harness installed ${Kn} in the ${Id(ie)} but did not enable it. Enable it from the Plugins page.`)},message:[`Added ${Kn} to the DeepSeek Harness ${Id(Y)}.`,...j.profile&&!j.cli?[ys("add")]:[]].join(`
`)}}function Id(_){return`${_.map((N)=>N.label).join(" and ")} profile${_.length>1?"s":""}`}function Hd(_,N={}){let j=new Set(wi(_).map((re)=>re.name));if(!j.has("desktop")&&!j.has("web"))throw Error(`${Kn} is not installed in the DeepSeek Harness web or Desktop profile`);let J=j.has("desktop")?vs(_,N).cli:void 0,Y=j.has("desktop")&&!J;if(Y&&!j.has("web"))throw Error(ys("remove"));if(J&&Nd(_,N.platform))throw Error(Dd);return{commands:[...J?[[J,"plugin","--profile","desktop","remove",Kn]]:[],...j.has("web")?[[...$d,"plugin","--profile","web","remove",Kn]]:[]],...Y?{afterUninstall:()=>{throw Error(`Removed ${Kn} from the DeepSeek Harness web profile, but ${ys("remove")}`)}}:{}}}function Fd(_,N,j={}){let J=vs(N,j).cli!==void 0;return _.map((Y)=>Y.target==="deepseek-harness"&&J?{...Y,available:!0,unavailableReason:void 0}:Y)}import{existsSync as yv,readdirSync as hv,rmSync as vv}from"node:fs";import{join as bv}from"node:path";function Md(_,N=process.platform,j){if(!yv(_))return;let J=N==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);hv(_).filter((Y)=>Y!==j&&J.test(Y)).forEach((Y)=>{vv(bv(_,Y),{recursive:!0,force:!0})})}import{existsSync as Ud,readdirSync as wv,rmSync as kv}from"node:fs";import{join as Yt}from"node:path";function ko(_,N=process.platform){let j=Yt(_.env.get("npm_config_cache")||(N==="win32"?Yt(_.env.get("LOCALAPPDATA")||Yt(_.home,"AppData","Local"),"npm-cache"):Yt(_.home,".npm")),"_npx");if(!Ud(j))return;wv(j).filter((J)=>Ud(Yt(j,J,"node_modules","cc-safety-net"))).forEach((J)=>{kv(Yt(j,J),{recursive:!0,force:!0})})}import{existsSync as Jd,mkdirSync as xv,readFileSync as Wd}from"node:fs";import{dirname as Sv,join as Kd}from"node:path";function Cv(_,N){if(_[N]!=="#")return N;let j=_.indexOf(`
`,N+1);return j===-1?_.length:j+1}function bs(_,N,j){let J=new RegExp(`^(\\s*)${N}\\s*=\\s*\\[`),Y=0;for(let re of _.split(`
`)){if(/^\s*\[/.test(re))return;let ie=J.exec(re);if(ie){let de=Y+ie[0].lastIndexOf("[");return{start:de,end:ii(_,de,{skipComment:Cv,...j})}}Y+=re.length+1}return}function Gd(_,N,j){let J=_.slice(0,N.end).trimEnd(),Y=al(_,N.end),re=Y===""?"     ":`${Y}  `,ie=!J.endsWith("[")&&!J.endsWith(",");return`${J}${ie?",":""}
${re}${j}${_.slice(N.end)}`}function Bd(_,N,j){let J=_.indexOf(j,N.start);if(J===-1||J>N.end)return _;return`${_.slice(0,J)}${_.slice(J+j.length).replace(/^\s*,/,"")}`}function qd(_,N){let j=new RegExp(`^\\s*${N}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),J=_.split(`
`),Y=J.findIndex((de)=>/^\s*\[/.test(de)),re=Y===-1?J:J.slice(0,Y),ie=Y===-1?[]:J.slice(Y);return[...re.filter((de)=>!j.test(de)),...ie].join(`
`)}function Vd(_,N,j){let J=new RegExp(`^\\s*\\[\\[${N}]]\\s*$`,"m");return _.split(/(?=^\s*\[)/m).filter((Y)=>!J.test(Y)||!Y.includes(j)).join("").trimEnd()}var hr=kn["kimi-code"],ws=`[[hooks]]
event = "PreToolUse"
command = "${hr}"`,zd=`{ event = "PreToolUse", command = "${hr}" }`,Yd={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function Zd(_){return Kd(_.env.get("KIMI_CODE_HOME")??Kd(_.home,".kimi-code"),"config.toml")}function Pv(_){let N=bs(_,"hooks",Yd);if(N&&_.slice(N.start+1,N.end).trim())return Gd(_,N,zd);let j=qd(_,"hooks").trimEnd();if(j==="")return`${ws}
`;return`${j}

${ws}
`}function Xd(_){let N=Zd(_);if(xv(Sv(N),{recursive:!0}),!Jd(N))return an(N,`${ws}
`),{path:N,alreadyInstalled:!1};let j=Wd(N,"utf-8");if(j.includes(hr))return{path:N,alreadyInstalled:!0};return an(N,Pv(j)),{path:N,alreadyInstalled:!1}}function Qd(_){let N=Zd(_);if(!Jd(N))return{path:N,alreadyInstalled:!1};let j=Wd(N,"utf-8");if(!j.includes(hr))return{path:N,alreadyInstalled:!1};let J=bs(j,"hooks",Yd),Y=J?Bd(j,J,zd):`${Vd(j,"hooks",hr)}
`;return an(N,Y),{path:N,alreadyInstalled:!0}}var ks="safety-net@cc-marketplace",eu=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),nu=new Set(["antigravity-cli","cursor","devin","droid","grok-build","hermes-agent","kimi-code"]);function Cs(_){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(_??"")}function su(_){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(_??"")}function Rv(_){return/^Marketplace `cc-marketplace`\s*$/m.test(_??"")}var au={"claude-code":{installCommands:(_)=>{let N=Jr(_,"cc-safety-net@cc-marketplace");return{commands:[...N?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...ri(_).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:Jr(_,ks)?[["claude","plugin","uninstall",ks]]:[],update:N}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(_,N)=>{let j=N??await fn(["codex","plugin","list"]),J=su(j);return{commands:[J||Rv(j)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:Cs(j)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:J}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:rl},"copilot-cli":{installCommands:async()=>{let _=await fn(["copilot","plugin","list"]),N=[...gl(_)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...yl(_)?[["copilot","plugin","uninstall",pl]]:[]];if(fl(_))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",_n]],cleanupCommands:N,update:!0};return{commands:[ml(await fn(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",_n]],cleanupCommands:N}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(_)=>{let N=Ai(_);if(N.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(N.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:Ui,installCommands:(_)=>{let N=!xo(Co(cr(_),xn));return{commands:kc(),afterInstall:()=>Cc(N)}},uninstallCommands:[["openclaw","plugins","uninstall",dn,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{installCommands:Ic},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]},"deepseek-harness":{installCommands:(_)=>jd(_),uninstallCommands:(_)=>Hd(_)}};function lu(_,N=(j)=>j){try{let j=JSON.parse(N(iu(_,"utf-8")));if(!j||typeof j!=="object"||Array.isArray(j))throw Error(`Settings file ${_} must be a JSON object`);return j}catch(j){if(j instanceof SyntaxError)throw Error(`Failed to parse ${_}: ${j.message}`);throw j}}function Ev(_){let N=Co(tr(_),"settings.json");if(!xo(N))return;let j=lu(N,yn),J=j.enabledPlugins;if(!J||typeof J!=="object"||Array.isArray(J))return;if(J[_n]!==!1)return;let Y=iu(N,"utf-8"),re=Y.replace(new RegExp(`("${_n}"\\s*:\\s*)false`),"$1true");return J[_n]=!0,an(N,re!==Y?re:`${JSON.stringify(j,null,2)}
`),`Enabled ${_n} plugin in ${N}`}function _v(_){let N=Xi(_);if(!xo(N))return;let j=lu(N);if(!Array.isArray(j.packages))return;let J=j.packages.find((Y)=>!!Y&&typeof Y==="object"&&!Array.isArray(Y)&&Qi(Y.source)&&("extensions"in Y));if(!J)return;return delete J.extensions,an(N,`${JSON.stringify(j,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${N}`}function tu(_,N){let j=mn({label:N,booleans:Object.fromEntries(On.map((re)=>[re.target,[re.flag]]))},_),J=j.errors[0];if(J)throw Error(J);let Y=On.filter((re)=>j.flags[re.target]).map((re)=>re.target);if(Y.length!==1)throw Error(`Choose exactly one ${N} target: ${On.map((re)=>re.flag).join(", ")}`);return Y[0]}async function cu(_,N=Nt){let[j,J,Y]=await Promise.all([N(["amp","plugins","list"],30000),N(["codex","plugin","list"],30000),N(["copilot","--binary-version"])]);return{codexPluginListOutput:J,hooks:Kt(_,process.cwd(),{ampPluginListOutput:j,codexPluginListOutput:J,copilotCliVersion:Y})}}async function Tv(_,N,j=Nt){let J=await cu(_,j);return J.hooks.filter((Y)=>N==="install"?Y.configured:Y.detected&&Y.method!==no||Y.inspectionStatus==="not-inspected").filter((Y)=>Y.platform!=="codex"||!Cs(J.codexPluginListOutput)||su(J.codexPluginListOutput)).map((Y)=>Y.platform)}function Av(_,N,j,J){if(j.length>0)return{finish:async()=>[tu(j,N)]};if(!J.selectTargets&&!cs(J.input,J.output))return{finish:async()=>[tu(j,N)]};let Y=J.detectConfiguredTargets??(()=>Tv(_,N,J.fetchVersion)),re=Promise.all([Ed(J.probeTargets).then((ie)=>Fd(ie,_)),Y()]);return{ready:re,finish:async()=>{let[ie,de]=await re,fe=_d(ie,{action:N,configuredTargets:de}),we=J.selectTargets?await J.selectTargets(N,ou(N,fe)):await cd(N,ou(N,fe),{input:J.input,output:J.output});if(we==="update")return we;if(!we||we.length===0)return null;return gs(we)}}}async function Ov(_,N,j=!1,J){let Y=au[_];Y.beforeInstall?.(N);let re=typeof Y.installCommands==="function"?await Y.installCommands(N,J):{commands:Y.installCommands};return await di(re.commands),await kl(re.cleanupCommands??[]),await re.afterInstall?.(),[`${re.update||j?"Updated":"Installed"} ${ln(_)} integration`,re.message??Y.postInstallMessage].filter(Boolean).join(`
`)}async function Iv(_,N){let j=au[_];if(!j.uninstallCommands)throw Error(`${ln(_)} uninstall is not supported`);let J=typeof j.uninstallCommands==="function"?j.uninstallCommands(N):{commands:j.uninstallCommands};return await di(J.commands),J.afterUninstall?.(),`Uninstalled ${ln(_)} integration`}function $v(_){let N=Lc(_);return N.alreadyInstalled?`Uninstalled OpenCode plugin from ${N.path}`:`OpenCode plugin not installed in ${N.path}`}var du={"antigravity-cli":{install:Sd,uninstall:Pd},cursor:{install:El,uninstall:_l},devin:{install:jl,uninstall:Hl},droid:{install:ql,uninstall:Vl},"grok-build":{install:Ql,uninstall:ec},"kimi-code":{install:Xd,uninstall:Qd}};function Dv(_,N,j,J=!1){if(_==="install"&&!J)ko(j);let Y=du[N][_](j),re=ln(N),ie=_!=="install"?"Uninstalled":J?"Updated":"Installed";return _==="install"&&Y.alreadyInstalled?J?`${re} hook up to date in ${Y.path}`:`${re} hook already installed in ${Y.path}`:_==="uninstall"&&!Y.alreadyInstalled?`${re} hook not installed in ${Y.path}`:`${ie} ${re} hook ${_==="install"?"in":"from"} ${Y.path}`}var uu={amp:{install:vd,uninstall:bd,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:sc,uninstall:ac,afterInstall:async(_)=>{let N=Fi(_);return await fn(["hermes","plugins","enable",Sn,"--no-allow-tool-override"]),!N},beforeUninstall:async(_)=>{Hi(_);try{await fn(["hermes","plugins","disable",Sn])}catch(N){console.warn(`${N instanceof Error?N.message:String(N)}
Removing the plugin files anyway; ${Sn} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Lv(_,N,j,J=!1){let Y=uu[N];if(_==="uninstall")await Y.beforeUninstall?.(j);let re=_==="install"?await Y.install(j):await Y.uninstall(j),ie=_==="install"&&await Y.afterInstall?.(j),de=ln(N),fe=!ie&&(_==="install"&&re.alreadyInstalled||_==="uninstall"&&!re.alreadyInstalled);return[fe?_==="install"?`${de} plugin ${J?"up to date":"already installed"} at ${re.path}`:`${de} plugin not installed at ${re.path}`:`${_!=="install"?"Uninstalled":J?"Updated":"Installed"} ${de} plugin ${_==="install"?"at":"from"} ${re.path}`,fe?void 0:Y.restartNote].filter(Boolean).join(`
`)}var Nv={"copilot-cli":{afterInstall:Ev},cursor:{afterUninstall:xl},"hermes-agent":{beforeInstall:(_,N)=>{if(!N)ko(_)}},openclaw:{beforeUninstall:Ui},pi:{afterInstall:_v}};function jv(_){return _ in du}function Hv(_){return _ in uu}var ru=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net/tree/plugin","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function Fv(_){if(lr({environment:_,cwd:process.cwd()}).status!=="configured")return ru;return[ru,"",Ze.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function ou(_,N){return N.map((j)=>_==="install"&&j.target==="kimi-code"&&j.unavailableReason==="already installed"?{...j,available:!0,unavailableReason:void 0,label:`${j.label} (global hook installed)`}:j)}function Mv(_,N){if(_.selectKimiInstallMethod)return _.selectKimiInstallMethod();if(!cs(_.input,_.output))return Promise.resolve("global-hook");return ld({input:_.input,output:_.output,globalHookInstalled:lr({environment:N,cwd:process.cwd()}).status==="configured"})}async function pu(_,N,j,J=!1,Y){let re=Nv[N];if(_==="install")re?.beforeInstall?.(j,J);if(_==="uninstall")re?.beforeUninstall?.(j);if(jv(N))return[Dv(_,N,j,J),_==="uninstall"?await re?.afterUninstall?.(j):void 0].filter(Boolean).join(`
`);if(Hv(N))return Lv(_,N,j,J);if(_==="uninstall")return N==="opencode"?$v(j):Iv(N,j);return[await Ov(N,j,J,Y),await re?.afterInstall?.(j)].filter(Boolean).join(`
`)}function Uv(_){let N=mn({label:"update"},_).errors[0];if(N)throw Error(N)}async function Gv(_,N=Nt){let j=await cu(_,N),J=Co(tr(_),"installed-plugins");return{targets:gs([...j.hooks.filter((re)=>re.platform!=="copilot-cli"&&re.detected&&re.method!==no&&re.method!==yi).map((re)=>re.platform),...[Wr,ul,dl].flatMap((re)=>xo(Co(J,...re))?["copilot-cli"]:[]),...Jr(_,ks)?["claude-code"]:[],...Cs(j.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:j.codexPluginListOutput}}async function Bv(_){let N=c(),j=_.output??process.stdout,J=(_.scriptPath??process.argv[1]??"").split(/[\\/]/),Y=J.find((Ee)=>/^bunx-\d+-/.test(Ee)),re=Y!==void 0||J.includes("_npx")?null:(_.checkLatestVersion??Gn)(),ie=async()=>{let Ee=re&&await re;if(Ee?.updateAvailable)j.write(`
Update available: cc-safety-net ${Ee.currentVersion} → ${Ee.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},de=Gv(N,_.fetchVersion??Nt).then(async(Ee)=>{let De=new Set(Ee.targets);return{targets:Ee.targets,codexPluginListOutput:Ee.codexPluginListOutput,available:new Map(await Promise.all(On.filter((He)=>De.has(He.target)&&eu.has(He.target)).map(async(He)=>[He.target,await yr(He.probeCommand)])))}}),fe=await Qt(_.showBanner??!0,()=>({ready:de,finish:()=>de}),()=>Xt({input:_.input??process.stdin,output:j}),{loadingMessage:"Checking installed integrations…",output:j}),we=await Promise.resolve().then(()=>(Md(N.tmpdir,process.platform,Y),null)).catch((Ee)=>vr(Ee));if(fe.targets.length===0){if(j.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),we!==null)console.error(we);return await ie(),we===null?0:1}let ke=fe.targets.some((Ee)=>nu.has(Ee))?await Promise.resolve().then(()=>(ko(N),null)).catch((Ee)=>vr(Ee)):null,Re=await Fr(Promise.all(fe.targets.map((Ee)=>{if(eu.has(Ee)&&!fe.available.get(Ee))return Promise.resolve({message:`${ln(Ee)} not found; skipped`,failed:!1});if(ke!==null&&nu.has(Ee))return Promise.resolve({message:ke,failed:!0});return pu("install",Ee,N,!0,fe.codexPluginListOutput).then((De)=>({message:De,failed:!1}),(De)=>({message:vr(De),failed:!0}))})),{loadingMessage:`Updating ${fe.targets.length} integration${fe.targets.length===1?"":"s"}…`,output:j}),Te=we===null?Re:[...Re,{message:we,failed:!0}];return Te.forEach((Ee)=>Ee.failed?console.error(Ee.message):j.write(`${Ee.message}
`)),await ie(),Te.some((Ee)=>Ee.failed)?1:0}function xs(_,N={}){return Promise.resolve().then(()=>Uv(_)).then(()=>Bv(N)).catch((j)=>(console.error(vr(j)),1))}async function br(_,N,j={}){try{let J=c(),Y=await Qt(!0,()=>Av(J,_,N,j),()=>Xt({input:j.input??process.stdin,output:j.output??process.stdout}),{loadingMessage:_==="install"?"Checking available integrations…":"Checking installed integrations…",output:j.output??process.stdout});if(!Y)return(j.output??process.stdout).write(`Cancelled: nothing was ${_}ed.
`),0;if(Y==="update")return(j.runUpdate??(()=>xs([],{fetchVersion:j.fetchVersion,input:j.input,output:j.output,showBanner:!1})))();let re=j.output??process.stdout;return await Rd(Y,async(ie)=>{if(ie==="kimi-code"&&_==="install"){let fe=await Mv(j,J);if(fe===null){re.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(fe==="plugin"){re.write(`${Fv(J)}
`);return}}let de=await Fr(pu(_,ie,J),{loadingMessage:`${_==="install"?"Installing":"Uninstalling"} ${ln(ie)} integration…`,output:re});re.write(`${de}
`)}),0}catch(J){return console.error(vr(J)),1}}function vr(_){let N=_ instanceof Error?_.message:String(_),j=typeof _==="object"&&_!==null&&"code"in _?_.code:null;if(j==="EACCES"||j==="EPERM")return`${N}
Check file permissions for the target config file and parent directory.`;if(j==="ENOENT")return`${N}
Check that the target config path and parent directory exist.`;if(j==="ENOTDIR")return`${N}
Check that every parent path component is a directory.`;return N}import{mkdirSync as zv}from"node:fs";import{dirname as Yv}from"node:path";import{createInterface as Zv}from"node:readline";import{existsSync as mu,readFileSync as qv}from"node:fs";function Ot(_,N){let j=pt(_,N);return{policy:j.policy,errors:ce(lt(j.issues,dt,(J)=>J.kind==="custom")," "," ")}}function wr(_,N){return Ot(_,N).errors}function fu(_,N){return{"safety.level":_.safety.level,...Ss("safety.overrides",_.safety.overrides),"workflow.worktree_mode":String(_.workflow.worktree_mode),"destructive_command_protection.enabled":String(_.destructive_command_protection.enabled),...Ss("destructive_command_protection.overrides",_.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":Ps(_.destructive_command_protection.allow_paths),"secret_protection.enabled":String(_.secret_protection.enabled),...Ss("secret_protection.overrides",_.secret_protection.overrides),"secret_protection.deny_paths":Ps(_.secret_protection.deny_paths),"secret_protection.allow_paths":Ps(_.secret_protection.allow_paths),...N?{"audit.retention_days":String(_.audit.retention_days)}:{}}}function So(_,N,j){let J=fu(_,j),Y=fu(N,j);return[...new Set([...Object.keys(J),...Object.keys(Y)])].flatMap((re)=>J[re]===Y[re]?[]:[{field:re,before:J[re],after:Y[re]}])}function kr(_,N){let j=u(_,N);if(!mu(j))return{baseline:k(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,_.home),diagnostics:[]};let J=It(j),Y=Ot(J.value,_.home);return{baseline:Y.policy,diagnostics:J.errors.length>0?J.errors:Y.errors}}function It(_){if(!mu(_))return{errors:[`${_}: file not found`]};try{return{value:JSON.parse(qv(_,"utf-8")),errors:[]}}catch(N){let j=N instanceof Error?N.message:String(N);return{errors:[`${_}: ${N instanceof SyntaxError?`Invalid JSON: ${j}`:j}`]}}}function Po(_,N){let j=Vv(_)?_:{};return{version:N.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((J)=>j[J]!==void 0).map((J)=>[J,j[J]]))}}function Ss(_,N){return Object.fromEntries(Object.entries(N).flatMap(([j,J])=>J===void 0?[]:[[`${_}.${j}`,String(J)]]))}function Ps(_){return _.length===0?"(none)":_.join(", ")}function Vv(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{chmodSync as Kv,existsSync as gu,mkdirSync as Jv,readFileSync as yu}from"node:fs";import{dirname as Wv}from"node:path";function hu(_,N={}){let j=u(_,N);if(!gu(j))return{path:j,exists:!1,raw:"",policy:F(),errors:[]};let J=yu(j,"utf-8");if(!J.trim())return{path:j,exists:!0,raw:J,policy:F(),errors:["Config file is empty"]};try{let Y=Ot(JSON.parse(J),_.home);return{path:j,exists:!0,raw:J,policy:Y.policy,errors:Y.errors}}catch(Y){return{path:j,exists:!0,raw:J,policy:F(),errors:[`Invalid JSON: ${Y instanceof Error?Y.message:String(Y)}`]}}}function Fn(_,N,j={}){let J=u(_,j),Y=Ot(N,_.home);if(Y.errors.length>0)return{path:J,policy:F(),errors:Y.errors};let re=Y.policy;return Jv(Wv(J),{recursive:!0,mode:448}),g(se(J),`${JSON.stringify(re,null,2)}
`,384),Kv(J,384),{path:J,policy:re,errors:[]}}function vu(_,N){let j=Ot(N,_.home);if(j.errors.length>0)return{errors:j.errors};return{preview:Ge(j.policy,_.env),errors:[]}}function bu(_,N={}){let j=u(_,N);if(!gu(j))return Fn(_,te,N);let J=yu(j,"utf-8");if(!J.trim())return Fn(_,te,N);try{return Fn(_,k(JSON.parse(J),_.home),N)}catch{return Fn(_,te,N)}}var wu=new Set(["check","apply"]),ku="(unset)";async function xu(_,N,j={}){let J=mn({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},N),Y=J.positionals[0],re=[...J.errors,...Y&&!wu.has(Y)?[`Unknown policy subcommand: ${Y}`]:[],...Y&&wu.has(Y)&&!J.positionals[1]?[`policy ${Y} requires a file`]:[],...J.positionals.slice(2).map((He)=>`Unexpected policy argument: ${He}`)];if(re.length>0){for(let He of re)console.error(He);return 1}let ie=J.positionals[1];if(!Y||!ie)return Jt(_r,console.error),1;let de=j.cwd??process.cwd(),fe=J.flags.global?u(_):h(de);if(!J.flags.global&&A(_,{cwd:de}))return console.error(`${fe} is the user policy, not a project policy; use --global for the user scope, or run from a project directory`),1;let we=It(ie),ke=[...we.errors,...wr(we.value,_.home).map((He)=>`${ie}: ${He}`),...!J.flags.global&&eb(we.value)&&we.value.audit!==void 0?[`${ie}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(ke.length>0){for(let He of ke)console.error(He);return 1}let Re=k(we.value,_.home);if(console.log(`Scope: ${J.flags.global?"user":"project"} (${fe})`),console.log(`Proposal: ${ie}`),J.flags.global)Cu(k(It(fe).value,_.home),Re,!0);if(!J.flags.global){let He=kr(_).baseline;console.log("Effective policy (user + project merged):"),Cu(ee(He,ue(It(fe).value,_.home).policy).policy,ee(He,ue(we.value,_.home).policy).policy,!1)}if(Y==="check")return 0;let Te=j.input??process.stdin,Ee=j.output??process.stdout;if(!Te.isTTY||!Ee.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ie}${J.flags.global?" --global":""}`),1;if(!await Xv(`Apply this policy to ${fe}? [y/N] `,Te,Ee))return console.log("Cancelled; nothing was written."),0;return Qv(_,fe,we.value,Re,J.flags.global),console.log(`Policy applied: ${fe}`),0}function Xv(_,N,j){let J=Zv({input:N,output:j,terminal:!1});return new Promise((Y)=>{J.once("close",()=>Y(!1)),J.question(_,(re)=>{Y(/^y(es)?$/i.test(re.trim())),J.close()})})}function Qv(_,N,j,J,Y){if(Y){Fn(_,J);return}zv(Yv(N),{recursive:!0}),vn(N,Po(j,J))}function Cu(_,N,j){let J=So(_,N,j);if(J.length===0){console.log("No changes.");return}console.log(`Changes (${J.length}):`);for(let Y of J)console.log(`  ${Y.field}: ${Y.before??ku} -> ${Y.after??ku}`)}function eb(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{join as yw}from"node:path";var Su="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- `caffeinate`, `exec`, `nice`, `nohup`, `setsid`, `stdbuf`, `time`, and `timeout` are built-in transparent wrappers and need no configuration. Configure only other wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n- `command_tools`: Optional array of shell tools that a plugin adds to an agent and that CC Safety Net does not know. Each entry is a tool name such as `\"ops_bash\"`, or `{ \"name\": \"ops_run_background\", \"cwd\": \"cwd\" }` when the tool takes its working directory in a named argument (otherwise `workdir`, `cwd`, or `working_directory` is read). A call to a declared tool with a non-empty string `command` is analyzed like a built-in shell command. User and project lists merge; the user entry wins a name declared in both.\n- Built-in shell and file tools are already analyzed and cannot be declared; `rule verify` reports one declared by hand.\n- Use `cc-safety-net rule tool add ops_bash ops_run_background` to declare tools in the user config, or add `--project` for the project config.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function Ro(_,N){if(!_.ok){Au(_);return}Eu(_,N)}function Ru(_,N,j){if(_.ok)console.log(j);if(!_.add){Ro(_,`Added rulebook source: ${N}`);return}if(!_.ok){Au(_);return}if(_.add.added.length>0)console.log(`Added ${_.add.added.length} ${_.add.added.length===1?"rulebook":"rulebooks"} from ${_.add.source} at ${_.add.ref}:`),_.add.added.forEach((J)=>{console.log(`  - ${J}`)});if(_.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${_.add.source} at ${_.add.ref}: ${_.add.alreadyConfigured.join(", ")}`);if(_.add.commits.length>0)console.log(`Vendored at ${_.add.commits.map((J)=>J.slice(0,7)).join(", ")}.`);Eu(_,"Rule config updated.")}function Eu(_,N){for(let j of _.changes??[])console.log(j);console.log(N),console.log(""),nb(_.entries)}function nb(_){if(_.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${_.length}):`);for(let N of _)console.log(`  - ${N.name} ${N.version} (${tb(N.ruleCount)})`),console.log(`    Source: ${N.spec}`)}function tb(_){return`${_} ${_===1?"rule":"rules"}`}function _u(_){Jn("Active sources",_.rulebooks,(N)=>[`[${N.source}] ${N.name} ${N.version}`,`  Source: ${N.spec}`]),Jn("Active rules",_.rules,(N)=>[`[${ob(_,N.name)}] ${N.name}`,...rb(N),`  Reason: ${N.reason}`]),Jn("Disabled rules",Pu(_,"off"),(N)=>[N.key]),Jn("Reason overrides",Pu(_,"reason"),(N)=>[N.key,`  Reason: ${N.value.reason}`]),Jn("Transparent wrappers",_.transparent_wrappers,(N)=>[N]),Jn("Issues",_.errors,(N)=>[N]),Jn("Warnings",_.warnings,(N)=>[N])}function Tu(_){Jn("Command tools",_,(N)=>typeof N.tool==="string"?[`[${N.scope}] ${N.tool}`]:[`[${N.scope}] ${N.tool.name}`,...N.tool.cwd===void 0?[]:[`  Cwd argument: ${N.tool.cwd}`]])}function Jn(_,N,j){if(N.length===0){console.log(`${_}: (none)`);return}console.log(`${_} (${N.length}):`);for(let J of N){let[Y,...re]=j(J);console.log(`  - ${Y}`);for(let ie of re)console.log(`    ${ie}`)}}function rb(_){if(!_.match)return[`  Command: ${_.subcommand?`${_.command} ${_.subcommand}`:_.command}`,`  Block args: ${_.block_args.join(", ")}`];return[`  Command: ${[_.command,..._.match.command_path].join(" ")}`,..._.match.any_args?[`  Any args: ${_.match.any_args.join(", ")}`]:[],..._.match.exclude_args?[`  Exclude args: ${_.match.exclude_args.join(", ")}`]:[]]}function ob(_,N){return _.rulebooks.find((j)=>j.rules.includes(N))?.source??"project"}function Pu(_,N){return Object.entries({..._.userConfig?.overrides,..._.projectConfig?.overrides}).filter((j)=>{if(N==="off")return j[1]==="off";return!!j[1]&&typeof j[1]==="object"}).map(([j,J])=>({key:j,value:J}))}function Au(_){for(let N of _.errors)console.error(N)}import{dirname as Qu,join as Do}from"node:path";import{join as Ts,resolve as yb}from"node:path";function Cr(_){let N=d(_);if(N.errors.length>0)return{ok:!1,result:{ok:!1,errors:N.errors,entries:[]}};return{ok:!0,config:N.config??Et}}function Ou(_){vn(_,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function Iu(_){vn(_,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Ao}from"node:path";var ib="custom.";function Eo(_){if(_.rulebook_version!==2)return[];let N=_.rules.map((j)=>({name:j.name,command:j.command,block_args:[],match:j.match,reason:j.reason,intent:j.intent}));return(_.tests??[]).flatMap((j,J)=>{let Y=Rs(y(j.command));if(Y.length===0)return[`tests[${J}]: could not parse fixture command: ${j.command}`];let re=Y.reduce((ie,de)=>ie??D(de,N)?.id.slice(ib.length),void 0);if(j.expect==="blocked"){if(re===j.rule)return[];let ie=re?`"${re}" matched first`:"no rule matched";return[`tests[${J}]: expected "${j.rule}" to block "${j.command}" but ${ie}`]}return re?[`tests[${J}]: expected "${j.command}" to be allowed but "${re}" matched`]:[]})}function Rs(_){return _.nodes.flatMap((N)=>{if(N.kind==="group"||N.kind==="function")return Rs(N.body);if(N.kind!=="command")return[];let j=Se(ne(N.dialect,N.words)).words.map(t);return[...j.length>0?[j]:[],...N.nested.flatMap((J)=>Rs(J))]})}var _o=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function To(_={}){return{requests:0,responseBytes:0,maxRequests:_.maxRequests??_o.maxRequests,maxResponseBytes:_.maxResponseBytes??_o.maxResponseBytes}}function Mn(_){return{controller:new AbortController,budget:To(),resolveUrl:_}}function $u(_){return _ instanceof Error&&_.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function Du(_){if(_.requests>=_.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.requests++}function Lu(_,N){if(N>_.maxResponseBytes-_.responseBytes)throw _.responseBytes+=N,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.responseBytes+=N}var Hu=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function Nu(_,N,j=w(Ao(Ao(N)),"rules policy"),J=Mn()){if(C(_))return cb(_,J);return lb(_,N,j)}async function Fu(_,N,j,J,Y,re){if(!C(_))return Nu(_,N,j,J);let ie=Y?null:sb(_,N,j);if(ie)return ie;if(!Y&&!re)throw Error(`${_} is not vendored; run rule update ${_} to vendor it`);return Nu(_,N,j,J)}function sb(_,N,j=w(Ao(Ao(N)),"rules policy")){let J=L(_),Y=M(N,J.name),re=r(i(j,Y));if(re===null)return null;let ie=le(Es(re,`Invalid rulebook ${Y}.`));if(ie.name!==J.name)throw Error(`rulebook name "${ie.name}" in ${Y} must match "${J.name}"`);return{spec:_,rulebook:ie,content:re}}async function Mu(_,N={}){if(!Z(_))throw Error(`Invalid GitHub repository source: ${_}`);let[j,J]=_.split("/");if(!j||!J)throw Error(`Invalid GitHub repository source: ${_}`);if(N.ref!==void 0&&!ae(N.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${N.ref}`);let Y=N.operation??Mn(),re=N.ref??await ab(j,J,_,Y),ie=await Gu(j,J,re,_,Y),de=await Oo(`https://api.github.com/repos/${j}/${J}/git/trees/${ie}?recursive=1`,"tree",Y),fe=de.response;if(!fe.ok)throw Error(`Failed to inspect ${_}: GitHub tree returned ${fe.status}`);let we=JSON.parse(de.content);if(!Array.isArray(we?.tree))throw Error(`Failed to inspect ${_}: unexpected GitHub tree response`);let ke=we.tree,Re=[...new Set(ke.flatMap((Te)=>{if(!Te||typeof Te!=="object")return[];let Ee=Te;if(Ee.type!=="blob"||typeof Ee.path!=="string")return[];let De=Ee.path.match(wt);return De?.[1]?[De[1]]:[]}))].sort();if(Re.length===0)throw Error(`No rulebooks found in ${_} under ${he}/`);return{source:_,owner:j,repo:J,ref:re,commit:ie,names:Re}}async function ab(_,N,j,J){let Y=await Oo(`https://api.github.com/repos/${_}/${N}`,"metadata",J),re=Y.response;if(!re.ok)throw Error(`Failed to inspect ${j}: GitHub returned ${re.status}`);let de=JSON.parse(Y.content)?.default_branch;if(typeof de!=="string"||de==="")throw Error(`Failed to inspect ${j}: missing default branch`);if(!ae(de))throw Error(`GitHub returned an invalid default branch: ${de}`);return de}function lb(_,N,j){Ct(_);let J=M(N,_),Y=r(i(j,J));if(Y===null)throw Error(`Rulebook source not found: ${_}`);let re=Uu(Es(Y,"Invalid local rulebook source."));if(re.name!==_)throw Error(`rulebook name "${re.name}" must match local source "${_}"`);return{spec:_,rulebook:re,content:Y}}async function cb(_,N){let j=L(_),J=await Gu(j.owner,j.repo,j.ref,_,N),Y=await Oo(`https://raw.githubusercontent.com/${j.owner}/${j.repo}/${J}/${j.path}`,"raw",N),re=Y.response;if(!re.ok)throw Error(`Failed to fetch ${_}: GitHub raw returned ${re.status}`);let ie=Y.content,de=Uu(Es(ie,"Invalid GitHub rulebook response."));if(de.name!==j.name)throw Error(`rulebook name "${de.name}" must match GitHub source "${j.name}"`);return{spec:_,rulebook:de,content:ie}}function Uu(_){let N=le(_),j=Eo(N);if(j.length>0)throw Error(j.join("; "));return N}function Es(_,N){try{return JSON.parse(_)}catch{throw Error(N)}}async function Gu(_,N,j,J,Y){let re=await Oo(`https://api.github.com/repos/${_}/${N}/commits/${encodeURIComponent(j)}`,"commit",Y),ie=re.response;if(!ie.ok)throw Error(`Failed to resolve ${J}: GitHub returned ${ie.status}`);let de=JSON.parse(re.content);if(typeof de?.sha!=="string"||de.sha==="")throw Error(`Failed to resolve commit for ${J}`);return de.sha}async function db(_,N,j={}){if(j.signal?.aborted)throw j.signal.reason;let J=j.budget??To(),Y=new AbortController,re=()=>Y.abort(j.signal?.reason);j.signal?.addEventListener("abort",re,{once:!0});let ie=!1,de=setTimeout(()=>{if(Y.signal.aborted)return;ie=!0,Y.abort()},j.timeoutMs??Hu.timeoutMs);try{if(j.signal?.aborted)throw j.signal.reason;Du(J);let fe=await fetch(_,{signal:Y.signal,redirect:"error"});if(!fe.ok)return Bu(fe),{response:fe,content:""};return{response:fe,content:await ub(fe,N,J,()=>Y.abort())}}catch(fe){if(ie)throw Error("GitHub request timed out",{cause:fe});if(j.signal?.aborted)throw j.signal.reason;throw fe}finally{clearTimeout(de),j.signal?.removeEventListener("abort",re)}}function Oo(_,N,j){return db(j.resolveUrl?.(_)??_,N,{budget:j.budget,signal:j.controller.signal})}async function ub(_,N,j=To(),J){let Y=Hu[`${N}Bytes`],re=Number(_.headers.get("content-length"));if(Number.isFinite(re)&&re>Y)throw Bu(_),Error(`GitHub ${N} response exceeds ${Y} bytes`);if(!_.body)return"";let ie=_.body.getReader(),de=[],fe=0;while(!0){let we=await ie.read();if(we.done)break;try{Lu(j,we.value.byteLength)}catch(ke){throw J?.(),ju(ie),ke}if(fe+=we.value.byteLength,fe>Y)throw J?.(),ju(ie),Error(`GitHub ${N} response exceeds ${Y} bytes`);de.push(Buffer.from(we.value))}return Buffer.concat(de,fe).toString("utf-8")}function Bu(_){if(!_.body)return;qu(()=>_.body?.cancel())}function ju(_){qu(()=>_.cancel())}function qu(_){try{Promise.resolve(_()).catch(()=>{})}catch{}}var pb=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function Vu(_,N){let j=Wu(_.rules,N);if(j.length>0)return{ok:!0,specs:j};return Ju(_.rules,N)}function Ku(_,N){let j=Wu(_,N);if(j.length>0)return{ok:!0,specs:j};let J=mb(_,N);if(J.length>0)return{ok:!0,specs:J};let Y=gb(_,N);if(!Y.ok)return Y;if(Y.specs.length>0)return{ok:!0,specs:Y.specs};return Ju(_,N)}function Ju(_,N){let j=_.filter((J)=>_s(J)?.name===N);if(j.length===1)return{ok:!0,specs:j};return fb(N,j)}function fb(_,N){return{ok:!1,result:{ok:!1,errors:N.length===0?[`No configured rulebook matches ${_}`]:[`Ambiguous rulebook match ${_}: ${N.join(", ")}`],entries:[]}}}function Wu(_,N){return _.filter((j)=>j===N)}function mb(_,N){let j=N.match(pb),J=j?.[1],Y=j?.[2],re=j?.[3];if(!J||!Y||!re||!ae(re))return[];return zu(_,(ie)=>ie.owner===J&&ie.repo===Y&&ie.ref===re)}function gb(_,N){if(!Z(N))return{ok:!0,specs:[]};let[j,J]=N.split("/"),Y=zu(_,(ie)=>ie.owner===j&&ie.repo===J);if(new Set(Y.map((ie)=>_s(ie)?.ref).filter((ie)=>!!ie)).size<2)return{ok:!0,specs:Y};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${N}. Use an explicit ref:`,`  cc-safety-net rule remove ${N}#<ref>`],entries:[]}}}function _s(_){try{return L(_)}catch{return null}}function zu(_,N){return _.filter((j)=>{let J=_s(j);return J?N(J):!1})}async function $o(_,N={}){let j=As(N);return hb(_,j,await Io(_,j,Mn()))}function hb(_,N,j){if(!j.ok)return j;let J=hn(_,N),Y=[...new Set(B(J.configPath,J.filesystemScope))];if(Y.length===0)return j;return{ok:!1,errors:Y,entries:j.entries}}async function Io(_,N,j,J={},Y=new Set,re=new Set){try{let ie=hn(_,N),de=Cr(ie.configTarget);if(!de.ok)return de.result;let fe=de.config,we=N.only?Vu(fe,N.only):{ok:!0,specs:fe.rules};if(!we.ok)return we.result;let ke=new Set([...N.refresh?we.specs:[],...Y]),Re=(nn)=>Fu(nn,ie.configDir,ie.filesystemScope,j,ke.has(nn),!N.refresh||ke.has(nn)),Te=await _b(fe.rules,N.refresh?(nn)=>Re(nn).then((pn)=>({ok:!0,item:pn})).catch((pn)=>{if($u(pn))throw pn;return{ok:!1,spec:nn,message:pn instanceof Error?pn.message:String(pn)}}):async(nn)=>({ok:!0,item:await Re(nn)}),j),Ee=Te.filter((nn)=>!nn.ok),De=Te.filter((nn)=>nn.ok).map((nn)=>nn.item),He=De.flatMap((nn)=>vb(nn,fe.rules)),Le=De.flatMap((nn)=>bb(nn,re,ie)),Ye=new Set([...He,...Le].map((nn)=>nn.spec)),tn=[...Ee,...He,...Le],rn=[],on=kb(rn,()=>De.flatMap((nn)=>Ye.has(nn.spec)||tn.length>0&&re.has(nn.spec)?[]:wb(nn,ie,J,rn)));return{ok:tn.length===0,errors:tn.map((nn)=>`Failed to update ${nn.spec}: ${nn.message}`),entries:De.map(xb),changes:on}}catch(ie){return Sr(ie)}}function vb(_,N){if(!C(_.spec))return[];let j=Ue(_.spec),J=N.filter((Y)=>Y!==_.spec&&Ue(Y).toLowerCase()===j.toLowerCase());if(J.length===0)return[];return[{ok:!1,spec:_.spec,message:`rulebook name "${j}" is also claimed by ${J.join(", ")}; rename one of them`}]}function bb(_,N,j){if(!N.has(_.spec)||!C(_.spec))return[];let J=M(j.configDir,_.rulebook.name),Y=r(i(j.filesystemScope,J));if(Y===null||Y===_.content)return[];return[{ok:!1,spec:_.spec,message:`${J} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function wb(_,N,j,J){if(!C(_.spec))return[];let Y=M(N.configDir,_.rulebook.name),re=i(N.filesystemScope,Y),ie=r(re);if(ie===_.content)return[];return J?.push({target:re,previous:ie}),g(re,_.content,void 0,j._testAfterPolicyRename),Cb(_,ie)}function kb(_,N){try{return N()}catch(j){for(let J of[..._].reverse()){if(J.previous===null){H(J.target);continue}g(J.target,J.previous)}throw j}}function Cb(_,N){if(N===null)return[`Vendored ${_.spec} (${_.rulebook.version})`];let j=ve(N),J="problem"in j?null:j.rulebook,Y=new Map(J?.rules.map((ie)=>[ie.name,JSON.stringify(ie)])??[]),re=new Set(_.rulebook.rules.map((ie)=>ie.name));return[`Updated ${_.spec} (${J?.version??"unreadable"} -> ${_.rulebook.version})`,...[...re].filter((ie)=>!Y.has(ie)).map((ie)=>`  + ${ie}`),...[...Y.keys()].filter((ie)=>!re.has(ie)).map((ie)=>`  - ${ie}`),..._.rulebook.rules.filter((ie)=>{let de=Y.get(ie.name);return de!==void 0&&de!==JSON.stringify(ie)}).map((ie)=>`  ~ ${ie.name}`)]}function xb(_){return{spec:_.spec,name:_.rulebook.name,version:_.rulebook.version,ruleCount:_.rulebook.rules.length}}async function Yu(_,N,j={}){return Sb(_,N,Ab(j),Mn())}async function Sb(_,N,j,J,Y={}){let re=null,ie=!1;try{let de=hn(_,j),fe=r(de.configTarget);re={target:de.configTarget,content:fe};let we=Cr(de.configTarget);if(!we.ok)return we.result;let ke=we.config,Re=Z(N);Pb(N,j,Re);let Te=Re?await Mu(N,{ref:j.ref,operation:J}):null,Ee=Te?Rb(Te,j.rulebooks):[],De=Te?Ee.map((rn)=>Eb(ke.rules,Te,rn)??`${N}#${Te.ref}/${rn}`):[N],He=De.filter((rn)=>!ke.rules.includes(rn)),Le=[...ke.rules,...He];if(Le.length>ye)return Tb();if(Le.length!==ke.rules.length)ie=!0,vn(de.configTarget,{...ke,rules:Le},void 0,Y._testAfterPolicyRename);let Ye=await Io(_,j,J,Y,new Set(He),new Set(He));if(!Ye.ok)xr(de.configTarget,fe);if(!Ye.ok||!Te)return Ye;let tn=Ee.filter((rn,on)=>He.includes(De[on]??""));return{...Ye,add:{source:N,ref:Te.ref,selected:Ee,added:tn,alreadyConfigured:Ee.filter((rn)=>!tn.includes(rn)),commits:He.length>0?[Te.commit]:[]}}}catch(de){if(ie&&re)try{xr(re.target,re.content)}catch(fe){return Sr(fe)}return Sr(de)}}function Pb(_,N,j){if(!j&&N.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!j&&N.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${_}`);if(N.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let J=N.rulebooks?.filter((Y)=>!p.test(Y))??[];if(J.length>0)throw Error(`Invalid rulebook names: ${J.join(", ")}`)}function Rb(_,N){let j=N?[...new Set(N)]:_.names,J=j.filter((Y)=>!_.names.includes(Y));if(J.length>0)throw Error(`Rulebooks not found in ${_.source} at ${_.ref}: ${J.join(", ")}
Available rulebooks: ${_.names.join(", ")}`);return j}function Eb(_,N,j){let J=`${N.source}#${N.ref}/${j}`;if(_.includes(J))return J;let Y=`${N.source}#${N.commit}/${j}`;return _.find((re)=>re===Y)}async function _b(_,N,j=Mn()){if(_.length>ye)throw Error(be);let J=[],Y=0,re,ie=Array.from({length:Math.min(_.length,_o.concurrency)},async()=>{while(!re){let de=Y;if(de>=_.length)return;Y++;try{J[de]=await N(_[de],de,j.controller.signal)}catch(fe){if(!re)re={value:fe},Y=_.length,j.controller.abort(fe);return}}});if(await Promise.all(ie),re)throw re.value;return J}function Tb(){return{ok:!1,errors:[be],entries:[]}}function As(_){return{cwd:_.cwd,userConfigDir:_.userConfigDir,userConfigPath:_.userConfigPath,projectConfigPath:_.projectConfigPath,global:_.global,only:_.only,refresh:_.refresh}}function Ab(_){return{...As(_),ref:_.ref,rulebooks:_.rulebooks}}function Ob(_){return{...As(_),deleteSource:_.deleteSource}}async function Zu(_,N,j={}){try{return await Ib(_,N,Ob(j),{})}catch(J){return Sr(J)}}async function Ib(_,N,j,J){let Y=hn(_,j),re=d(Y.configTarget);if(re.errors.length>0)return{ok:!1,errors:re.errors,entries:[]};if(!re.config)return{ok:!1,errors:[`No config found at ${Y.configPath}`],entries:[]};let ie=Ku(re.config.rules,N);if(!ie.ok)return ie.result;let de=j.deleteSource?$b(Y.configDir,ie.specs,Y.filesystemScope):{ok:!0,dirs:[]};if(!de.ok)return de.result;let fe=r(Y.configTarget);if(fe===null)return Sr(Error("Rules config is unavailable."));try{vn(Y.configTarget,{...re.config,rules:re.config.rules.filter((Re)=>!ie.specs.includes(Re))},void 0,J._testAfterPolicyRename)}catch(Re){throw xr(Y.configTarget,fe),Re}let we=await Io(_,j,Mn(),J);if(!we.ok)return xr(Y.configTarget,fe),we;let ke=Db(de.dirs,J,Y.filesystemScope);if(!ke.ok){xr(Y.configTarget,fe);let Re=await Io(_,j,Mn(),J);if(!Re.ok)return{ok:!1,errors:[...ke.result.errors,...Re.errors],entries:Re.entries};return ke.result}return we}function $b(_,N,j){let J=N.flatMap((de)=>p.test(de)?[]:["--delete-source can only delete local rulebook sources"]),Y=N.map((de)=>Ts(_,de)),re=J.length>0?[]:Y.flatMap((de)=>Xu(de,j)),ie=[...J,...re];return ie.length>0?{ok:!1,result:{ok:!1,errors:ie,entries:[]}}:{ok:!0,dirs:Y}}function Xu(_,N){let j=yb(_),J=i(N,j),Y=me(J);if(!Y)return[`Local rulebook source directory not found: ${_}`];let re=Y.find((ie)=>ie.name==="rulebook.json");if(!re)return[`Local rulebook source directory is missing rulebook.json: ${_}`];if(re.kind!=="file")throw new o(N.label);if(r(i(N,Ts(j,"rulebook.json"))),Y.length>1)return[`Local rulebook source directory contains extra files: ${_}. delete manually if you really want to remove the directory.`];return[]}function Db(_,N,j){let J=_.flatMap((Y)=>{try{if(!me(i(j,Y)))return[];let re=Xu(Y,j);if(re.length>0)return re;return Lb(Y,N,j),[]}catch(re){return[`Failed to delete local rulebook source ${Y}: ${re instanceof Error?re.message:String(re)}`]}});return J.length>0?{ok:!1,result:{ok:!1,errors:J,entries:[]}}:{ok:!0}}function Lb(_,N,j){if(N._testDeleteLocalSourceDir){N._testDeleteLocalSourceDir(_);return}H(i(j,Ts(_,ge))),St(i(j,_))}function xr(_,N){if(N===null){H(_);return}g(_,N)}function Sr(_){return{ok:!1,errors:[_ instanceof Error?_.message:String(_)],entries:[]}}var Nb=".safety-net.json",jb="~/.cc-safety-net/config.json";async function tp(_,N){let j=A(_,{cwd:N.cwd});if(j)console.log(`Skipped the project scope: ${I(N.cwd)} is the user rule config, not a project rule config`);return[j||await ep(_,{legacyPath:Fa({cwd:N.cwd}),configPath:I(N.cwd),defaultRulebookName:"project-rules",migratedFrom:Nb,cleanup:N.cleanup,syncOptions:{cwd:N.cwd}}),await ep(_,{legacyPath:Lt(_),configPath:W(_),defaultRulebookName:"user-rules",migratedFrom:jb,cleanup:N.cleanup,syncOptions:{cwd:N.cwd,global:!0}})].every((Y)=>Y)?0:1}async function ep(_,N){let j=hn(_,N.syncOptions),J=i(j.filesystemScope,N.legacyPath),Y=r(J);if(Y===null)return console.log(`No legacy config found at ${N.legacyPath}`),!0;let re=Fb(Y);if(!re.ok){for(let Ee of re.errors)console.error(Ee);return!1}let ie=d(j.configTarget);if(ie.errors.length>0){for(let Ee of ie.errors)console.error(Ee);return!1}let de=ie.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},fe=Mb(Qu(N.configPath),de.rules,N.defaultRulebookName,N.migratedFrom,j.filesystemScope),we=Do(Qu(N.configPath),fe,"rulebook.json"),ke=i(j.filesystemScope,we),Re=[np(j.configTarget),np(ke)],Te=await Hb(_,N,j.configTarget,ke,fe,re.config.rules,{...de,rules:de.rules.includes(fe)?de.rules:[...de.rules,fe]});if(!Te.ok){Bb(Re);for(let Ee of Te.errors)console.error(Ee);return!1}if(!N.cleanup)return console.log(`Migrated legacy config at ${N.legacyPath}. Legacy file is no longer used.`),!0;if(!Gb(j.configTarget,ke,fe,N.migratedFrom,re.config.rules))return console.error(`Migration cleanup verification failed for ${N.legacyPath}`),!1;return H(J),console.log(`Deleted legacy config at ${N.legacyPath}`),!0}async function Hb(_,N,j,J,Y,re,ie){try{return vn(j,ie),vn(J,Ub(Y,N.migratedFrom,re)),await $o(_,N.syncOptions)}catch(de){return{ok:!1,errors:[de instanceof Error?de.message:String(de)]}}}function Fb(_){try{let N=JSON.parse(_),j=Vo(N);if(j.errors.length>0)return{ok:!1,errors:j.errors};return{ok:!0,config:{version:1,rules:N.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function Mb(_,N,j,J,Y){let re=N.find((ie)=>qb(i(Y,Do(_,ie,"rulebook.json")))===J);if(re)return re;if(r(i(Y,Do(_,j,"rulebook.json")))===null)return j;for(let ie=2;;ie++){let de=`${j}-${ie}`;if(r(i(Y,Do(_,de,"rulebook.json")))===null)return de}}function Ub(_,N,j){return{rulebook_version:1,name:_,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:N,allowed_commands:[...new Set(j.map((J)=>J.command))],rules:j,tests:j.map((J)=>({command:[J.command,J.subcommand,J.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:J.name}))}}function Gb(_,N,j,J,Y){if(!d(_).config?.rules.includes(j))return!1;try{let ie=r(N);if(ie===null)return!1;let de=JSON.parse(ie);return de.migrated_from===J&&JSON.stringify(de.rules)===JSON.stringify(Y)}catch{return!1}}function np(_){return{target:_,content:r(_)}}function Bb(_){for(let N of _){if(N.content===null){H(N.target);continue}g(N.target,N.content)}}function qb(_){let N=r(_);if(N===null)return null;try{let j=JSON.parse(N);return typeof j.migrated_from==="string"?j.migrated_from:null}catch{return null}}import{mkdir as Vb,readFile as Kb,writeFile as Jb}from"node:fs/promises";import{dirname as Wb,join as zb}from"node:path";var Yb=86400000,Zb=604800000;async function op(_,N=Date.now()){if(_.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let j=et(_);if(!j)return null;let J=zb(j,".cc-safety-net","update-check.json"),Y=await Xb(J,N);if(!Y.lastCheck||N-Y.lastCheck>Yb){let de=await Gn();if(Y.lastCheck=N,de.latestVersion)Y.latestVersion=de.latestVersion;if(!await rp(J,Y))return null;if(de.error)return null}let re=Y.latestVersion,ie=un();if(!re||!Zo(re,ie))return null;if(Y.notifiedVersion===re&&Y.notifiedAt!==void 0&&N-Y.notifiedAt<Zb)return null;if(Y.notifiedVersion=re,Y.notifiedAt=N,!await rp(J,Y))return null;return`UPDATE_AVAILABLE: cc-safety-net v${re} is available (running v${ie}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function Xb(_,N){let j=await Kb(_,"utf8").then((re)=>JSON.parse(re)).catch(()=>{return});if(!j||typeof j!=="object"||Array.isArray(j))return{};let J=j,Y=(re)=>typeof re==="number"&&Number.isFinite(re)&&re<=N?re:void 0;return{lastCheck:Y(J.lastCheck),latestVersion:typeof J.latestVersion==="string"?J.latestVersion:void 0,notifiedVersion:typeof J.notifiedVersion==="string"?J.notifiedVersion:void 0,notifiedAt:Y(J.notifiedAt)}}async function rp(_,N){return Vb(Wb(_),{recursive:!0,mode:448}).then(()=>Jb(_,JSON.stringify(N),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as tw,resolve as Is}from"node:path";var sp=new Map([["Bash","posix"],["PowerShell","powershell"],["Monitor","posix"]]);var ap=new Map([["Bash","auto"]]);var lp=new Map([["bash","auto"],["Bash","auto"],["powershell","powershell"],["PowerShell","powershell"]]);var cp=new Map([["Shell","auto"]]);var up=new Map([["exec","auto"]]),pp="write_to_process";var fp=new Map([["Execute","auto"]]);var mp=new Map([["run_shell_command","auto"]]);var gp=new Map([["run_terminal_command","auto"],["run_terminal_cmd","auto"],["monitor","auto"],["bash","auto"],["Shell","auto"]]);var yp=new Map([["terminal","posix"]]);var hp=new Map([["Bash","posix"]]);var vp="exec";var ew=[["antigravity-cli",[...za.keys(),Ya]],["claude-code",[...sp.keys()]],["codex",[...ap.keys()]],["copilot-cli",[...lp.keys()]],["cursor",[...cp.keys()]],["deepseek-harness",[...Qe.keys()]],["devin",[...up.keys(),pp]],["droid",[...fp.keys()]],["gemini-cli",[...mp.keys()]],["grok-build",[...gp.keys()]],["hermes-agent",[...yp.keys()]],["kimi-code",[...hp.keys()]],["openclaw",[vp]],["opencode",[Je,Ce]],["pi",[...Xe.keys()]]].flatMap(([_,N])=>N.map((j)=>({name:j,integration:ln(_)}))),bp="and is already analyzed. Built-in tools cannot be declared.";function Lo(_){let N=_e(_),j=[...new Set(ew.filter((J)=>_e(J.name)===N).map((J)=>J.integration))].sort((J,Y)=>J.localeCompare(Y));if(j.length>0)return`"${_}" is a built-in shell tool of ${nw(j)}, ${bp}`;if(x(_)!=="unknown")return`"${_}" is a built-in file tool, ${bp}`;return}function nw(_){return _.length===1?_[0]??"":`${_.slice(0,-1).join(", ")} and ${_.at(-1)}`}var kp="CC Safety Net Config",rw="═".repeat(kp.length),ow="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",iw=new Set(["rule.json","rule.lock","cache"]);function Cp(_,N={}){try{return sw(_,N)}catch(j){if(j instanceof o)return console.error(j.message),1;throw j}}function sw(_,N){let j=N.cwd??process.cwd(),J=X(_,{cwd:j}),Y=Lt(_),re=Ir(j),ie=Is(j,he),de=i(J.userScope,Y),fe=i(J.projectScope,re),we=!1,ke=!1,Re=[],Te=[],Ee=aw(i(J.projectScope,ie));if(cw(),r(J.userConfigTarget)!==null){let De=Un(J.userConfigTarget);if(De.errors.push(...B(J.userConfigPath,J.userScope),...wp(J.userConfigTarget)),Re.push({scope:"User",path:J.userConfigPath,result:De,schema:"rules",target:J.userConfigTarget}),De.errors.length>0)we=!0}if(r(de)!==null)if(ke=!0,r(J.userConfigTarget)!==null)Te.push(No("user","cleanup"));else{let De=Ko(de);if(Re.push({scope:"User",path:Y,result:De,schema:"legacy",inactive:!0,target:de}),Te.push(No("user",De.errors.length>0?"fix-or-delete":"migrate")),De.errors.length>0)we=!0}if(r(J.projectConfigTarget)!==null){let De=Un(J.projectConfigTarget);if(De.errors.push(...B(J.projectConfigPath,J.projectScope),...wp(J.projectConfigTarget)),Re.push({scope:"Project",path:Is(J.projectConfigPath),result:De,schema:"rules",target:J.projectConfigTarget}),De.errors.length>0)we=!0;if(r(fe)!==null)ke=!0,Te.push(No("project","cleanup"))}else if(r(fe)!==null){ke=!0,we=!0;let De=Ko(fe);Re.push({scope:"Project",path:Is(re),result:De,schema:"legacy",inactive:!0,target:fe}),Te.push(No("project",De.errors.length>0?"fix-or-delete":"migrate"))}if(Ee?.result.errors.length)we=!0;if(Re.length===0&&!Ee)return console.log(`
No config files found. Using built-in rules only.`),0;for(let De of Re)if(De.inactive)uw(De.scope,De.path,De.result);else if(De.result.errors.length>0)pw(De.scope,De.path,De.result.errors);else{if(De.schema==="rules"&&gw(De.target))console.log(`
Added $schema to ${De.scope.toLowerCase()} config.`);dw(De.scope,De.path,De.result,De.schema)}for(let De of Te)console.error(`
${Ze.red(De)}`);if(Ee)if(Ee.result.errors.length>0)mw(Ee.path,Ee.result.errors);else fw(Ee.path,Ee.result);if(we)return console.error(`
Config validation failed.`),1;return console.log(ke?`
Configs valid with warnings.`:`
All configs valid.`),0}function wp(_){return(d(_).config?.command_tools??[]).flatMap((N)=>Lo(typeof N==="string"?N:N.name)??[])}function No(_,N){let j=`legacy ${_} config`;if(N==="cleanup")return`Warning: Legacy ${_} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(N==="migrate")return`Warning: Legacy ${_} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${_} config is no longer supported. Fix or delete the ${j}, then run \`npx -y cc-safety-net rule migrate\`.`}function aw(_){if(me(_)===null)return null;let N=lw(_);if(N.ruleNames.size===0&&N.errors.length===0)return null;return{path:_.path,result:N}}function lw(_){let N=[],j=new Set,J=(me(_)??[]).filter((Y)=>!iw.has(Y.name)).sort((Y,re)=>Y.name.localeCompare(re.name));if(J.length===0)return{errors:N,ruleNames:j};for(let Y of J){if(!p.test(Y.name)){N.push(`rulebook directory names must match ${p}: ${Y.name}`);continue}if(Y.kind!=="directory"){N.push(`${Y.name} must be a rulebook directory`);continue}let re=i(_.scope,tw(_.path,Y.name,"rulebook.json")),ie=r(re);if(ie===null){N.push(`${Y.name}/rulebook.json is required`);continue}try{let de;try{de=JSON.parse(ie)}catch{N.push(`${Y.name}/rulebook.json: invalid JSON`);continue}let fe=le(de);if(fe.name!==Y.name){N.push(`rulebook name "${fe.name}" must match folder "${Y.name}"`);continue}let we=Eo(fe);if(we.length>0){N.push(...we.map((ke)=>`${Y.name}/rulebook.json: ${ke}`));continue}j.add(Y.name)}catch(de){N.push(de instanceof Error?`${Y.name}/rulebook.json: ${de.message}`:`${Y.name}/rulebook.json: ${String(de)}`)}}return{errors:N,ruleNames:j}}function cw(){console.log(kp),console.log(rw)}function dw(_,N,j,J){if(console.log(`
✓ ${_} config: ${N}`),console.log(`  Schema: ${J==="rules"?"rulebook sources":"legacy inline rules"}`),j.ruleNames.size>0){console.log(`  ${J==="rules"?"Sources":"Rules"}:`);let Y=1;for(let re of j.ruleNames)console.log(`    ${Y}. ${re}`),Y++}else console.log(`  ${J==="rules"?"Sources":"Rules"}: (none)`)}function uw(_,N,j){if(console.error(`
✗ Legacy ${_.toLowerCase()} config: ${N}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),j.errors.length>0){console.error("  Errors:");let J=1;for(let Y of j.errors)for(let re of Y.split("; "))console.error(`    ${J}. ${re}`),J++;return}if(j.ruleNames.size>0){console.error("  Rules:");let J=1;for(let Y of j.ruleNames)console.error(`    ${J}. ${Y}`),J++;return}console.error("  Rules: (none)")}function pw(_,N,j){xp(`${_} config`,N,j)}function fw(_,N){console.log(`
✓ GitHub source rules: ${_}`),console.log("  Rulebooks:");let j=1;for(let J of N.ruleNames)console.log(`    ${j}. ${J}`),j++}function mw(_,N){xp("GitHub source rules",_,N)}function xp(_,N,j){console.error(`
✗ ${_}: ${N}`),console.error("  Errors:");let J=1;for(let Y of j)for(let re of Y.split("; "))console.error(`    ${J}. ${re}`),J++}function gw(_){try{let N=r(_);if(N===null)return!1;let j=JSON.parse(N);if(j.$schema)return!1;return g(_,JSON.stringify({$schema:ow,...j},null,2)),!0}catch(N){if(N instanceof o)throw N;return!1}}var Sp=new Set(["init","add","remove","update","sync","list","wrapper","tool","migrate","doc","verify"]),hw=new Set(["init","add","remove","update","sync","wrapper"]),Rp=new Set(["add","remove","list"]),vw="cc-safety-net/rulebooks";async function Ep(_,N){try{return await bw(_,N)}catch(j){if(j instanceof o)return console.error(j.message),1;throw j}}async function bw(_,N){let j=kw(N),J=j.help?ww(j.positionals):null;if(J)return Jt(J),0;if(j.errors.length>0){for(let we of j.errors)console.error(we);return 1}let Y=j.positionals[0];if(!Y)return Jt(Dt,console.error),1;let re=j.positionals[1],ie={global:j.global},de=process.cwd();if((Y==="tool"?j.project:!j.global&&hw.has(Y)&&!(Y==="wrapper"&&re==="list"))&&A(_,{cwd:de}))return console.error(`${I(de)} is the user rule config, not a project rule config; ${Y==="tool"?"drop --project":"use --global"} for the user scope, or run from a project directory`),1;if(Y==="init"){let we=hn(_,ie);Sw(we.configTarget);let ke=yw(we.configDir,"example-rules","rulebook.json"),Re=i(we.filesystemScope,ke);if(j.example&&r(Re)===null)Iu(Re);let Te=B(we.configPath,we.filesystemScope);for(let Ee of Te)console.error(Ee);if(Te.length>0)return 1;return console.log("Rule config initialized."),0}if(Y==="add"){let we=_p(j);if(!we)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let ke=hn(_,ie),Re=await Yu(_,we,{...ie,ref:j.ref,rulebooks:j.only.length>0?j.only:void 0});return Ru(Re,we,`Scope: ${j.global?"user":"project"} (${ke.configDir})`),Re.ok?0:1}if(Y==="remove"){if(!re)return console.error("rule remove requires a source"),1;let we=await Zu(_,re,{...ie,deleteSource:j.deleteSource});return Ro(we,`Removed rulebook source: ${re}`),we.ok?0:1}if(Y==="update"){let we=await $o(_,{...ie,only:re,refresh:!0});return Ro(we,"Rule config updated."),we.ok?0:1}if(Y==="sync")return Ga(_,{global:j.global});if(Y==="list"){let we=Q(_,{cwd:de});return _u(we),we.errors.length>0?1:0}if(Y==="wrapper")return Pw(_,j);if(Y==="tool")return Ew(_,j,de);if(Y==="migrate")return tp(_,{cleanup:j.cleanup,cwd:de});if(Y==="doc"){console.log(Su);let we=await op(_);if(we)console.error(we);return 0}if(Y==="verify")return Cp(_);return 1}function ww(_){if(_.length===0)return Dt;let N=Dt.subcommands.filter((J)=>J.usage.split(" ")[0]===_[0]);if(N.length===0)return null;if(_.length===1&&N.length>1)return{name:`rule ${_[0]}`,description:`Subcommands of rule ${_[0]}`,usage:`rule ${_[0]} <subcommand>`,subcommands:N,options:[]};let j=_.length===1?N[0]:N.find((J)=>J.usage.split(" ")[1]===_[1]);if(!j)return null;return{name:`rule ${_[0]}`,description:j.description,usage:`rule ${j.usage}`,options:_[0]==="add"?Go:[],examples:_[0]==="add"?Bo:void 0}}function kw(_){let N=mn({label:"rule",booleans:{global:["-g","--global"],project:["--project"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"],cwdArg:["--cwd-arg"]},lists:{only:["--only"]},positionals:"list"},_),j={...N.flags,ref:N.values.ref,cwdArg:N.values.cwdArg,only:N.lists.only??[],help:N.help,positionals:N.positionals,errors:N.errors};return Cw(j),j}function Cw(_){let[N]=_.positionals;if(N&&!Sp.has(N))_.errors.push(`Unknown rule subcommand: ${N}`);if(_.deleteSource&&N!=="remove")if(N&&Sp.has(N))_.errors.push(`Unknown option for rule ${N}: --delete-source`);else _.errors.push("--delete-source is only valid with 'rule remove'");if(_.cleanup&&N!=="migrate")_.errors.push(Wn(N,"--cleanup"));if(_.example&&N!=="init")_.errors.push(Wn(N,"--example"));if(_.ref&&N!=="add")_.errors.push(Wn(N,"--ref"));if(_.only.length>0&&N!=="add")_.errors.push(Wn(N,"--only"));let j=N==="tool"?_.positionals[1]:void 0,J=j&&Rp.has(j)?`tool ${j}`:N;if(_.project&&j!=="add"&&j!=="remove")_.errors.push(Wn(J,"--project"));if(_.cwdArg!==void 0&&j!=="add")_.errors.push(Wn(J,"--cwd-arg"));if(N==="tool"&&_.global)_.errors.push(Wn(N,"--global"));if(N==="add")xw(_);if(N==="migrate"){if(_.global)_.errors.push(Wn(N,"--global"));if(_.positionals.length>1)_.errors.push(`Unexpected rule migrate argument: ${_.positionals[1]}`)}else if(N==="wrapper")Pp(_,"a command");else if(N==="tool")Pp(_,"a tool name");else if(_.positionals.length>2)_.errors.push(`Unexpected rule argument: ${_.positionals[2]}`);if(N==="list"&&_.global)_.errors.push("Unknown option for rule list: --global")}function _p(_){if(_.positionals[1])return _.positionals[1];if(_.ref||_.only.length>0)return vw;return}function xw(_){let N=_p(_);if(!N)return;if((_.ref||_.only.length>0)&&!Z(N)){if(_.ref)_.errors.push(`--ref can only select a ref for an owner/repo source: ${N}`);if(_.only.length>0)_.errors.push("--only can only select rulebooks from an owner/repo source");return}if(_.ref&&!ae(_.ref))_.errors.push(`--ref must use valid path segments: ${_.ref}`);let j=_.only.filter((J)=>!p.test(J));if(j.length>0)_.errors.push(`Invalid rulebook names: ${j.join(", ")}`)}function Wn(_,N){return _?`Unknown option for rule ${_}: ${N}`:`Unknown option for rule: ${N}`}function Pp(_,N){let j=_.positionals[0],J=_.positionals[1],Y=_.positionals[2];if(!J){_.errors.push(`rule ${j} requires add, remove, or list`);return}if(!Rp.has(J)){_.errors.push(`Unknown rule ${j} action: ${J}`);return}if(J==="list"){if(Y)_.errors.push(`Unexpected rule ${j} argument: ${Y}`);return}if(!Y){_.errors.push(`rule ${j} ${J} requires ${N}`);return}if(j!=="tool"&&_.positionals.length>3)_.errors.push(`Unexpected rule ${j} argument: ${_.positionals[3]}`)}function Sw(_){if(r(_)===null){Ou(_);return}let N=d(_);if(!N.config)return;vn(_,N.config)}async function Pw(_,N){let j=N.positionals[1],J=N.positionals[2],Y=hn(_,{global:N.global}).configTarget;if(j==="list"){let fe=d(Y);if(fe.errors.length>0){for(let we of fe.errors)console.error(we);return 1}return Rw(fe.config?.transparent_wrappers??[]),0}if(!J||!E.test(J))return console.error("transparent wrapper must match command pattern"),1;if(Me(J))return console.error(`reserved command "${J}" cannot be a wrapper`),1;let re=d(Y);if(re.errors.length>0){for(let fe of re.errors)console.error(fe);return 1}let ie=re.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},de=j==="add"?[...new Set([...ie.transparent_wrappers??[],J])]:(ie.transparent_wrappers??[]).filter((fe)=>fe!==J);return vn(Y,{...ie,transparent_wrappers:de}),console.log(j==="add"?`Added transparent wrapper: ${J}`:`Removed transparent wrapper: ${J}`),0}function Rw(_){if(_.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${_.length}):`);for(let N of _)console.log(`  - ${N}`)}function Ew(_,N,j){let J=N.positionals[1],Y=[...new Set(N.positionals.slice(2))];if(J==="list")return _w(_,j);let re=[...Y.flatMap((we)=>{if(!$e.test(we))return[`"${we}" is not a tool name: ${xe}.`];let ke=J==="add"?Lo(we):void 0;return ke?[ke]:[]}),...N.cwdArg!==void 0&&!$e.test(N.cwdArg)?[`"${N.cwdArg}" is not an argument name: ${xe}.`]:[]];if(re.length>0){for(let we of re)console.error(Ze.red(`Error: ${we}`));return 1}let ie=hn(_,{global:!N.project}),de=Cr(ie.configTarget);if(!de.ok){for(let we of de.result.errors)console.error(we);return 1}let fe=Y.reduce((we,ke)=>{let Re=N.cwdArg===void 0?ke:{name:ke,cwd:N.cwdArg},Te=(Ee)=>(typeof Ee==="string"?Ee:Ee.name)===ke;if(J==="remove")return we.filter((Ee)=>!Te(Ee));return we.some(Te)?we.map((Ee)=>Te(Ee)?Re:Ee):[...we,Re]},de.config.command_tools??[]);vn(ie.configTarget,{...de.config,command_tools:fe});for(let we of Y)console.log(J==="add"?`Added command tool: ${we}${N.cwdArg===void 0?"":` (cwd argument: ${N.cwdArg})`}`:`Removed command tool: ${we}`);return console.log(`Scope: ${N.project?"project":"user"} (${ie.configPath})`),0}function _w(_,N){let j=(A(_,{cwd:N})?["user"]:["user","project"]).map((Y)=>{let re=hn(_,{global:Y==="user"});return{scope:Y,path:re.configPath,...d(re.configTarget)}}),J=j.flatMap((Y)=>Y.errors.map((re)=>`${Y.path}: ${re}`));if(J.length>0){for(let Y of J)console.error(Y);return 1}return Tu(j.flatMap((Y)=>(Y.config?.command_tools??[]).map((re)=>({scope:Y.scope,tool:re})))),0}import{sep as Dw}from"node:path";import{existsSync as Tw,readFileSync as Aw}from"node:fs";import{join as Ow}from"node:path";async function Iw(_){if(_.isTTY)return null;return(await it(_).catch(()=>null))?.trim()||null}function $w(_){let N=_.env.get("CLAUDE_SETTINGS_PATH");if(N)return N;return Ow(Kr(_),"settings.json")}function $s(_){let N=$w(_);if(!Tw(N))return!1;try{let j=Aw(N,"utf-8"),J=JSON.parse(j);if(!J.enabledPlugins)return!1;let Y="cc-safety-net@cc-marketplace";if(!(Y in J.enabledPlugins))return!1;return J.enabledPlugins[Y]===!0}catch(j){if(S(n.debug,_.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${N}: ${j instanceof Error?j.message:String(j)}`);return!1}}async function Ds(_,N=process.stdin){let j=$s(_),J;if(!j)J="\uD83D\uDEE1️ CC Safety Net ❌";else{let re=R(_,{cwd:process.cwd()}),ie=re.policy,de=P(ie,_.env),fe=Object.values(V(ie,de.capabilities)).some((Re)=>Re.changesInherited),we={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[fe?"custom":de.effectiveLevel],ke=re.policyScopes&&!re.policyScopes.weakeningsIgnored&&re.policyScopes.weakenings.length>0?"\uD83D\uDD3B":"";J=`\uD83D\uDEE1️ CC Safety Net ${we}${de.worktreeMode?"\uD83C\uDF33":""}${ke}${re.state==="degraded"?"⚠️":""}`}let Y=await Iw(N);if(Y&&!Y.startsWith("{"))console.log(`${Y} | ${J}`);else console.log(J)}function Tp(_){let N=R(_,{cwd:process.cwd()}),j=N.policy,J=P(j,_.env),Y=!!process.env.NO_COLOR||!process.stdout.isTTY,re=Math.min(process.stdout.columns||80,100),ie=Y?"ok":"✔",de=Y?"OFF":"✘",fe=(He,Le)=>{let Ye=`  ${He.padEnd(13)}${Le}`;return(Ye.length>re?`${Ye.slice(0,re-1)}…`:Ye).replaceAll(de,Ze.red(de))},we=Object.values(V(j,J.capabilities)).some((He)=>He.changesInherited),ke=(He)=>He===_.home||He.startsWith(`${_.home}${Dw}`)?`~${He.slice(_.home.length)}`:He,Re={ready:Ze.green,degraded:Ze.yellow}[N.state],Te=N.policyScopes?.weakenings??[],Ee=[...$s(_)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...N.diagnostics],De=Y?"-":"·";console.log([`${Y?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Re(N.state)}`,"",fe("Protection",`destructive ${j.destructiveCommandProtectionEnabled?ie:de}   secrets ${j.secretProtection.enabled?ie:de}`),fe("Level",we?`${J.effectiveLevel} (customised)`:J.effectiveLevel),fe("Rules",j.rules.length===0?"none active":`${j.rules.length} active`),fe("Policy",ke(u(_))),...N.policyScopes?[fe("Project",ke(h(process.cwd())))]:[],...J.worktreeMode?[fe("Worktree","relaxations active")]:[],"",...Te.length===0?[]:[N.policyScopes?.weakeningsIgnored?"  Project policy (ignored)":"  Project policy",...Te.flatMap((He)=>pr(He,"      ",re-6).map((Le,Ye)=>Ye===0?`    ${Le}`:Le)),""],...Ee.length===0?["  Everything configured is active."]:["  Not active",...Ee.flatMap((He)=>pr(He,"      ",re-6).map((Le,Ye)=>Ye===0?`    ${De} ${Le}`:Le)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as Mp}from"node:child_process";import{randomBytes as qw}from"node:crypto";import{existsSync as Vw}from"node:fs";import{createServer as Kw}from"node:http";import{Writable as Jw}from"node:stream";var jo=500;function Lw(_){let N=_.filter((Y)=>Y.decision!=="allow"),j=_.filter((Y)=>Y.decision==="allow"),J=Math.min(N.length,Math.max(jo-j.length,Math.ceil(jo/2)));return[...N.slice(0,J),...j.slice(0,jo-J)]}function Ap(_,N,j=U(_)){if(j)K(_,j);let J=(Le)=>new Date(Le.getFullYear(),Le.getMonth(),Le.getDate()).getTime(),Y=J(new Date),re=new Date(Y);re.setDate(re.getDate()-(N-1));let ie=re.getTime(),de=[],fe={count:0};for(let Le of j?zn(j,fe):[])for(let Ye of $t(Le,fe)){let tn=new Date(Ye.ts).getTime();if(!Number.isFinite(tn))continue;if(tn>=ie)de.push(Ye)}de.sort((Le,Ye)=>new Date(Ye.ts).getTime()-new Date(Le.ts).getTime());let we=Array.from({length:N},()=>0),ke=Array.from({length:N},()=>0),Re={},Te={},Ee={},De=0,He=0;for(let Le of de){let Ye=Le.agent||"unknown";Re[Ye]=(Re[Ye]??0)+1;let tn=Math.round((Y-J(new Date(Le.ts)))/86400000),rn=N-1-tn,on=tn>=0&&tn<N;if(on)ke[rn]=(ke[rn]??0)+1;if(Le.decision!=="allow"){if(De++,Le.ruleId)Te[Le.ruleId]=(Te[Le.ruleId]??0)+1;let nn=Mo(Le.segment||Le.command);if(nn)Ee[nn]=(Ee[nn]??0)+1;if(Le.failureStage)He++;if(on)we[rn]=(we[rn]??0)+1}}return{days:N,logsDir:j,homeDir:_.home,totalInWindow:de.length,truncated:de.length>jo,unreadable:fe.count,counts:{blocked:De,allowed:de.length-De,agents:Re,blockedByDay:we,analyzedByDay:ke,rules:Te,commands:Ee,errors:He},entries:Lw(de).sort((Le,Ye)=>new Date(Ye.ts).getTime()-new Date(Le.ts).getTime())}}import{spawn as Nw}from"node:child_process";import{existsSync as jw,statSync as Op}from"node:fs";import{delimiter as Hw,join as Fw}from"node:path";var Mw=120000,Ho="Choose the project folder",Uw=`try
  return POSIX path of (choose folder with prompt "${Ho}")
on error number -128
  return ""
end try`,Gw=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Ho}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Ip=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Ho}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Ho]}],$p=(_,N)=>(N.PATH??"").split(Hw).some((j)=>{if(j.length===0)return!1;try{let J=Op(Fw(j,_));return J.isFile()&&(J.mode&73)!==0}catch{return!1}});function Ls(_,N){if(_==="darwin"||_==="win32")return!0;if(_!=="linux")return!1;if(!N.DISPLAY&&!N.WAYLAND_DISPLAY)return!1;return Ip.some((j)=>$p(j.binary,N))}function Bw(_,N){if(_==="darwin")return{cmd:"osascript",args:["-e",Uw]};if(_==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",Gw]};let j=Ip.find((J)=>$p(J.binary,N));return j?{cmd:j.binary,args:j.args}:null}function Ns(_=process.platform,N=process.env){let j=Bw(_,N);if(!j)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((J)=>{let Y=Nw(j.cmd,j.args,{env:N,stdio:["ignore","pipe","pipe"]}),re="",ie=!1,de=(we)=>{if(ie)return;ie=!0,clearTimeout(fe),J(we)},fe=setTimeout(()=>{Y.kill(),de({error:"The folder dialog timed out"})},Mw);Y.stdout.on("data",(we)=>{re+=we.toString()}),Y.on("error",()=>de({error:`Could not open the folder dialog (${j.cmd})`})),Y.on("close",()=>{let we=re.trim().replace(/\/+$/,"");if(!we)return de({cancelled:!0});if(!jw(we)||!Op(we).isDirectory())return de({error:"That selection is not a folder on disk"});de({path:we})})})}var Dp=`<!doctype html>
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

  --bg: light-dark(#f2f2f3, #0f0f10);
  --surface: light-dark(#ffffff, #19191b);
  --sidebar: light-dark(#fafafa, #121213);
  --field-bg: light-dark(#ffffff, #141414);
  --fill: light-dark(rgb(0 0 0 / 4%), rgb(255 255 255 / 6%));
  --hover: light-dark(rgb(0 0 0 / 4.5%), rgb(255 255 255 / 5%));
  --selected: light-dark(rgb(0 0 0 / 7%), rgb(255 255 255 / 9%));
  --pill-on: light-dark(#ffffff, #444448);
  --line: light-dark(rgb(0 0 0 / 8%), rgb(255 255 255 / 8%));
  --line-strong: light-dark(rgb(0 0 0 / 14%), rgb(255 255 255 / 13%));
  --ring: light-dark(rgb(0 0 0 / 10%), rgb(255 255 255 / 10%));

  --ink: light-dark(#18181b, #f0f0f0);
  --muted: light-dark(#5c5f66, #b3b3b3);
  --faint: light-dark(#7c8088, #8c8c8c);
  --on-ink: light-dark(#ffffff, #141414);

  --switch-off: light-dark(#c4c7cc, #4a4a4a);
  --switch-on: light-dark(#16a34a, #22c55e);
  --focus-ring: light-dark(#2563eb, #6ea2ff);
  --accent: light-dark(#16a34a, #22c55e);
  --danger: light-dark(#b91c1c, #dc2626);
  --danger-hover: light-dark(#991b1b, #b91c1c);
  --star: light-dark(#b7791f, #f2c94c);

  --ok-fg: light-dark(#15803d, #4ade80);
  --ok-bg: light-dark(#effaf3, rgb(74 222 128 / 10%));
  --ok-border: light-dark(#bfe6cc, rgb(74 222 128 / 25%));
  --err-fg: light-dark(#b42318, #ff8a80);
  --err-bg: light-dark(#fef3f2, rgb(255 138 128 / 10%));
  --err-border: light-dark(#f4cdc8, rgb(255 138 128 / 25%));
  --warn-fg: light-dark(#a14a06, #fbbf24);
  --warn-bg: light-dark(#fffaeb, rgb(251 191 36 / 10%));
  --warn-border: light-dark(#f3dfb0, rgb(251 191 36 / 25%));
  --info-fg: light-dark(#1d4ed8, #93c5fd);
  --info-bg: light-dark(#eff5ff, rgb(147 197 253 / 10%));
  --info-border: light-dark(#c8d9f7, rgb(147 197 253 / 25%));
  --paranoid-fg: light-dark(#7e22ce, #d8b4fe);
  --paranoid-bg: light-dark(#faf5ff, rgb(216 180 254 / 10%));
  --paranoid-border: light-dark(#e6d1f5, rgb(216 180 254 / 25%));

  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;
  --control-h: 32px;
  --row-x: 12px;
  --card-x: 16px;
  --shadow-float: 0 0 0 1px var(--line-strong), 0 8px 24px rgb(0 0 0 / 16%);

  font-family: var(--font-sans);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

[hidden] {
  display: none !important;
}

a {
  color: inherit;
}

p,
h1,
h2,
h3,
h4,
ul,
dl,
dd {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
}

code,
.mono {
  font-family: var(--font-mono);
  font-size: 13px;
}

p code,
small code,
.empty code {
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--fill);
  font-size: 12.5px;
}

strong {
  font-weight: 600;
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

.muted {
  color: var(--muted);
}

.count {
  color: var(--faint);
  font-size: 13px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}

:where(a, button, summary, [tabindex], input[type='checkbox'], input[type='radio']):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

:where(input[type='search'], input[type='text'], input[type='number'], textarea, select):focus {
  border-color: var(--focus-ring);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 20%, transparent);
}

.app-shell {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 18px 10px;
  border-right: 1px solid var(--line);
  background: var(--sidebar);
}

.brand {
  padding: 0 10px;
}

.brand-logo {
  display: flex;
  color: light-dark(#17161b, #f5f4f0);
}

.brand-home {
  display: flex;
}

.brand-logo svg {
  width: auto;
  height: 28px;
}

.sidenav {
  display: grid;
  gap: 1px;
}

.sidenav a {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 32px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  color: var(--muted);
  font-weight: 500;
  text-decoration: none;
}

.sidenav a:hover {
  background: var(--hover);
  color: var(--ink);
}

.sidenav a[aria-current='page'] {
  background: var(--selected);
  color: var(--ink);
}

.sidenav svg {
  width: 16px;
  height: 16px;
  flex: none;
}

.nav-dirty {
  margin-left: auto;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}

.sidebar-foot {
  margin-top: auto;
  display: grid;
  gap: 4px;
  padding: 0 10px;
  font-size: 13px;
}

.sidebar-foot a,
.app-foot a {
  color: var(--faint);
  text-decoration: none;
}

.sidebar-foot a:hover,
.app-foot a:hover {
  color: var(--ink);
}

.app-foot {
  display: none;
}

.content {
  min-width: 0;
}

main {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 36px 40px 72px;
  display: grid;
  gap: 28px;
}

.view {
  display: grid;
  gap: 28px;
  min-width: 0;
}

.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.page-head:has(> .icon-button) {
  flex-wrap: nowrap;
  align-items: flex-start;
}

.page-head h2 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 30px;
}

.page-head p {
  margin-top: 2px;
  color: var(--muted);
}

.section {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  min-height: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.section-sub {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card {
  min-width: 0;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--ring);
}

.card.pad {
  padding: var(--card-x);
}

.card.list {
  display: grid;
  padding: 4px;
}

.card.rows {
  padding: 0 var(--card-x);
}

.panel {
  display: grid;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  padding: 14px var(--card-x) 14px 20px;
  border-bottom: 1px solid var(--line);
}

.panel-head > div:first-child {
  flex: 1 1 0;
  min-width: 0;
}

.panel-list {
  display: grid;
  padding: 4px;
}

.panel-rows {
  padding: 0 var(--card-x) 0 20px;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  padding: 6px var(--row-x);
  border-radius: var(--radius);
  color: inherit;
  text-decoration: none;
}

a.list-row:hover,
button.list-row:hover:not(:disabled) {
  background: var(--hover);
}

.setting-row {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 56px;
  padding: 12px 0;
}

.setting-row + .setting-row,
#safety-overrides + #workflow,
.path-list + .path-list {
  border-top: 1px solid var(--line);
}

#safety-overrides .setting-row:first-child {
  border-top: 0;
}

.setting-row.info {
  align-items: baseline;
  min-height: 48px;
}

.setting-text {
  display: grid;
  flex: 1;
  gap: 1px;
  min-width: 0;
}

label.setting-text {
  cursor: pointer;
}

.setting-text strong {
  font-weight: 500;
}

.setting-text small {
  color: var(--muted);
  font-size: 13px;
}

.setting-label {
  flex: none;
  width: 140px;
  color: var(--muted);
}

.setting-row.info code {
  flex: 1;
  min-width: 0;
}

.setting-row.info button {
  align-self: center;
}

.path-part {
  display: inline-block;
  max-width: 100%;
  overflow-wrap: anywhere;
}

.icon-button {
  width: var(--control-h);
  padding: 0;
}

.icon-button svg {
  width: 16px;
  height: 16px;
}

.banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 16px;
  padding: 12px 16px;
  border: 1px solid var(--err-border);
  border-radius: var(--radius);
  background: var(--err-bg);
  color: var(--err-fg);
}

.banner p {
  flex: 1 1 100%;
}

.banner a {
  font-weight: 600;
}

button,
.star-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: var(--control-h);
  padding: 0 12px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--ink);
  font: inherit;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
}

button:hover:not(:disabled),
.star-cta:hover {
  background: var(--hover);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button svg {
  width: 15px;
  height: 15px;
  flex: none;
}

button.primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--on-ink);
}

button.primary:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--ink) 85%, var(--bg));
  background: color-mix(in srgb, var(--ink) 85%, var(--bg));
}

button.danger {
  border-color: var(--danger);
  background: var(--danger);
  color: #fff;
}

button.danger:hover:not(:disabled) {
  border-color: var(--danger-hover);
  background: var(--danger-hover);
}

button.danger-quiet {
  color: var(--err-fg);
}

button.danger-quiet:hover:not(:disabled) {
  border-color: var(--err-border);
  background: var(--err-bg);
}

button.quiet {
  border-color: transparent;
  color: var(--muted);
}

button.quiet:hover:not(:disabled) {
  color: var(--ink);
}

button.small {
  height: 26px;
  padding: 0 8px;
  font-size: 13px;
}

button.icon-only {
  width: 28px;
  height: 28px;
  padding: 0;
}

.link-button,
.row-action {
  flex: none;
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.link-button::after,
.row-action::after {
  content: ' →';
}

.link-button:hover,
.list-row:hover .row-action {
  color: var(--ink);
}

input[type='search'],
input[type='text'],
input[type='number'],
textarea,
select {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
}

input[type='search'],
input[type='text'],
input[type='number'],
select {
  height: var(--control-h);
}

input[type='search'],
input[type='text'],
textarea {
  width: 100%;
  padding: 0 10px;
}

input.mono {
  font-family: var(--font-mono);
  font-size: 13px;
}

textarea {
  min-height: 96px;
  padding: 8px 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.55;
  resize: vertical;
}

select {
  padding: 0 8px;
  cursor: pointer;
}

input::placeholder,
textarea::placeholder {
  color: var(--faint);
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[readonly] {
  color: var(--muted);
}

.input-row {
  display: flex;
  gap: 8px;
}

.input-row input {
  flex: 1 1 auto;
  min-width: 0;
}

.switch {
  appearance: none;
  position: relative;
  flex: none;
  width: 34px;
  height: 20px;
  margin: 0;
  border-radius: 999px;
  background: var(--switch-off);
  cursor: pointer;
}

.switch::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
}

.switch:checked {
  background: var(--switch-on);
}

.switch:checked::before {
  transform: translateX(14px);
}

.switch:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pills {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 3px;
  border-radius: var(--radius);
  background: var(--fill);
  box-shadow: inset 0 0 0 1px var(--line);
}

.pills button {
  height: 26px;
  padding: 0 10px;
  border: 0;
  border-radius: var(--radius-sm);
  color: var(--muted);
  font-size: 13px;
}

.pills button:hover:not(:disabled) {
  background: transparent;
  color: var(--ink);
}

.pills button[aria-pressed='true'],
.pills button[aria-pressed='true']:hover:not(:disabled) {
  background: var(--pill-on);
  color: var(--ink);
  box-shadow:
    0 0 0 1px var(--line-strong),
    0 1px 2px rgb(0 0 0 / 12%);
}

.pills button[aria-pressed='true'] .count {
  color: var(--muted);
}

.pills .count {
  margin-left: 2px;
  font-size: 12.5px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.toolbar-spacer {
  flex: 1;
}

.toolbar-search {
  position: relative;
  flex: 0 1 300px;
  min-width: 200px;
}

.toolbar-search svg {
  position: absolute;
  top: 50%;
  left: 11px;
  width: 16px;
  height: 16px;
  color: var(--muted);
  pointer-events: none;
  transform: translateY(-50%);
}

.toolbar-search input[type='search'] {
  padding-left: 34px;
  border-color: var(--line-strong);
  background: var(--surface);
}

.toolbar-search input::placeholder {
  color: var(--muted);
}

.toolbar-search:focus-within svg {
  color: var(--ink);
}

.primary-search {
  flex: 1 1 420px;
  max-width: 560px;
}

.primary-search input[type='search'] {
  height: 36px;
  font-size: 14px;
}

.policy-toolbar .pills button {
  height: 30px;
}

.policy-toolbar {
  position: sticky;
  top: 0;
  z-index: 20;
  margin: -12px -8px;
  padding: 12px 8px;
  background: var(--bg);
}

.filter-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -16px;
  color: var(--muted);
  font-size: 13px;
}

.notice {
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--fill);
  white-space: pre-wrap;
}

.notice.ok {
  border-color: var(--ok-border);
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.notice.error {
  border-color: var(--err-border);
  background: var(--err-bg);
  color: var(--err-fg);
}

.notice.warn {
  border-color: var(--warn-border);
  background: var(--warn-bg);
  color: var(--warn-fg);
}

.notice a {
  font-weight: 500;
}

.notices {
  display: grid;
  gap: 8px;
}

.field-error {
  color: var(--err-fg);
  font-size: 13px;
  overflow-wrap: anywhere;
}

.empty {
  padding: 24px 16px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-lg);
  color: var(--muted);
  text-align: center;
}

.card .empty {
  border: 0;
}

.footnote {
  margin-top: -16px;
  color: var(--faint);
  font-size: 13px;
}

.footnote:empty {
  display: none;
}

.status-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
}

.status-headline {
  font-size: 17px;
  font-weight: 600;
}

.status-facts {
  margin-top: 2px;
  color: var(--muted);
}

.attention-row {
  justify-content: space-between;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.tiles:empty {
  display: none;
}

.tile {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--ring);
}

.tile span {
  color: var(--muted);
  font-size: 13px;
}

.tile strong {
  display: block;
  margin-top: 4px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.tile-spark {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  width: min(45%, 160px);
  height: 34px;
}

.spark-bar {
  flex: 1 1 0;
  border-radius: 2px;
  background: var(--accent);
}

.spark-bar.spark-zero {
  background: var(--line-strong);
}

.compact-row,
.rule-count-row {
  align-content: center;
  align-items: baseline;
}

.compact-row {
  display: grid;
  grid-template-columns: 80px 110px minmax(0, 3fr) minmax(0, 2fr);
}

.compact-row time {
  color: var(--faint);
  font-size: 13px;
  white-space: nowrap;
}

.rule-count-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 72px;
}

.rule-count-row .count {
  text-align: right;
}

.rule-label {
  font-weight: 500;
}

.feed-agent {
  overflow: hidden;
  color: var(--muted);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-command {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-rule {
  max-width: 30ch;
  overflow: hidden;
  color: var(--faint);
  font-family: var(--font-mono);
  font-size: 12.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.day-heading {
  padding: 12px var(--row-x) 4px;
  color: var(--faint);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.day-heading:first-child {
  padding-top: 8px;
}

.feed-row {
  border-radius: var(--radius);
}

.feed-row:has(> [aria-expanded='true']) {
  background: var(--fill);
}

.feed-summary {
  display: grid;
  grid-template-columns: 16px 68px 76px 112px minmax(0, 3fr) minmax(0, 2fr);
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 40px;
  padding: 0 var(--row-x);
  border: 0;
  border-radius: var(--radius);
  font-weight: 400;
  text-align: left;
}

.feed-summary time {
  color: var(--faint);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.decision {
  justify-self: start;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}

.decision.deny {
  background: var(--err-bg);
  color: var(--err-fg);
}

.decision.allow {
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.decision.error {
  background: var(--warn-bg);
  color: var(--warn-fg);
}

.feed-detail {
  display: grid;
  gap: 12px;
  padding: 4px var(--row-x) 14px;
}

code.block {
  display: block;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.detail-rows {
  display: grid;
  gap: 4px;
}

.detail-rows div {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 12px;
}

.detail-rows dt {
  color: var(--faint);
}

.detail-rows dd {
  overflow-wrap: anywhere;
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-actions button:not(.primary) {
  background: var(--surface);
}

.rule-id {
  color: var(--faint);
  font-family: var(--font-mono);
  font-size: 12.5px;
}

a.rule-id {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 3px;
}

a.rule-id:hover {
  text-decoration-color: currentColor;
}

.project-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: -12px;
  padding: 12px 16px;
  border: 1px solid var(--info-border);
  border-radius: var(--radius);
  background: var(--info-bg);
}

.project-bar code {
  overflow-wrap: anywhere;
}

.project-bar p {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
}

.project-chip {
  flex: none;
  height: 22px;
  padding: 0 8px;
  border: 0;
  border-radius: 999px;
  background: var(--info-bg);
  color: var(--info-fg);
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
}

button.project-chip:hover:not(:disabled) {
  background: var(--info-bg);
  text-decoration: line-through;
}

.project-chip.inherited {
  background: var(--fill);
  color: var(--faint);
  font-weight: 400;
}

.project-chip-slot:empty {
  display: none;
}

.recovery {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--err-border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.recovery p {
  margin-top: 4px;
}

.page-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.tester-dialog {
  width: min(600px, calc(100vw - 32px));
}

.prompt-field {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  height: var(--control-h);
  padding-left: 10px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: var(--field-bg);
  cursor: text;
}

.prompt-field:focus-within {
  border-color: var(--focus-ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus-ring) 20%, transparent);
}

.prompt {
  color: var(--faint);
  font-family: var(--font-mono);
  font-size: 13px;
}

.prompt-field input[type='text'] {
  height: 100%;
  padding: 0 10px 0 8px;
  border: 0;
  background: transparent;
}

.prompt-field input[type='text']:focus {
  box-shadow: none;
}

.tester-segment {
  margin-top: 6px;
}

.preset-status {
  margin-left: auto;
  color: var(--info-fg);
  font-size: 13px;
  font-weight: 500;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.preset-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-content: start;
  gap: 2px 10px;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--ring);
  cursor: pointer;
}

.preset-card:hover {
  box-shadow: 0 0 0 1px var(--line-strong);
}

.preset-card input {
  margin: 4px 0 0;
  accent-color: var(--preset-fg);
}

.preset-name {
  font-weight: 600;
}

.preset-description {
  grid-column: 2;
  color: var(--muted);
  font-size: 13px;
}

.preset-standard {
  --preset-fg: var(--ok-fg);
  --preset-bg: var(--ok-bg);
  --preset-border: var(--ok-border);
}

.preset-strict {
  --preset-fg: var(--info-fg);
  --preset-bg: var(--info-bg);
  --preset-border: var(--info-border);
}

.preset-paranoid {
  --preset-fg: var(--paranoid-fg);
  --preset-bg: var(--paranoid-bg);
  --preset-border: var(--paranoid-border);
}

.preset-card:has(input:checked) {
  background: var(--preset-bg);
  box-shadow: 0 0 0 1px var(--preset-border);
}

.preset-card:has(input:checked) .preset-name {
  color: var(--preset-fg);
}

details > summary {
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  list-style: none;
  cursor: pointer;
}

details > summary::-webkit-details-marker {
  display: none;
}

details > summary::before,
.chevron::before {
  content: '';
  width: 6px;
  height: 6px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateX(-1px) rotate(-45deg);
}

details > summary::before {
  flex: none;
  margin: 0 4px;
}

details[open] > summary::before,
[aria-expanded='true'] > .chevron::before {
  transform: translateY(-1px) rotate(45deg);
}

.disclosure > summary {
  gap: 10px;
  width: auto;
  min-height: 48px;
  padding: 0 var(--card-x) 0 calc(var(--row-x) + 4px);
  border-radius: var(--radius-lg);
  font-weight: 600;
}

.disclosure > summary:hover {
  background: var(--hover);
}

.disclosure > summary::before {
  color: var(--faint);
}

.disclosure[open] > summary {
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.disclosure-sub {
  overflow: hidden;
  color: var(--faint);
  font-size: 13px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.disclosure-body {
  padding: 0 var(--card-x) 4px 38px;
  border-top: 1px solid var(--line);
}

#environment-overrides {
  font-size: 13px;
}

.master-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.master-state::after {
  content: 'Off';
  color: var(--err-fg);
  font-size: 13px;
  font-weight: 500;
}

.master-switch:has(:checked) .master-state::after {
  content: 'On';
  color: var(--muted);
}

.is-off .section-sub {
  color: var(--err-fg);
}

.rule-group + .rule-group {
  margin-top: 2px;
}

.rule-group-head {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 var(--row-x);
  border-radius: var(--radius);
}

.rule-group-head:hover {
  background: var(--hover);
}

.group-toggle {
  flex: 1;
  align-self: stretch;
  justify-content: flex-start;
  gap: 8px;
  height: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  font-weight: 600;
  text-align: left;
}

.group-toggle:hover:not(:disabled) {
  background: transparent;
}

.group-counts {
  margin-left: auto;
  color: var(--faint);
  font-size: 13px;
  font-weight: 400;
}

.off-count {
  color: var(--warn-fg);
}

.chevron {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--faint);
}

.rule-list {
  padding-bottom: 4px;
}

.rule-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px var(--row-x) 10px calc(var(--row-x) + 24px);
  border-radius: var(--radius);
}

.rule-row > .switch {
  margin-top: 1px;
}

.rule-row:hover {
  background: var(--hover);
}

.rule-row.row-disabled .rule-body {
  opacity: 0.5;
}

.rule-body {
  flex: 1;
  min-width: 0;
}

.rule-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px 10px;
  min-height: 22px;
}

.rule-line .quiet.small {
  height: 22px;
  margin-left: -4px;
  padding: 0 6px;
}

.rule-name {
  font-weight: 500;
}

.rule-description {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
}

.tier-badge {
  align-self: center;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}

.tier-badge.strict {
  background: var(--info-bg);
  color: var(--info-fg);
}

.tier-badge.paranoid {
  background: var(--paranoid-bg);
  color: var(--paranoid-fg);
}

.rule-note {
  color: var(--faint);
  font-size: 13px;
}

.rule-note::before {
  content: '· ';
}

.rule-note.changed {
  color: var(--warn-fg);
}

.rule-note.strict {
  color: var(--info-fg);
}

.rule-note.paranoid {
  color: var(--paranoid-fg);
}

.rule-note:empty {
  display: none;
}

.lock {
  display: inline-flex;
  flex: none;
  justify-content: center;
  width: 34px;
  height: 22px;
  align-items: center;
  color: var(--faint);
}

.lock svg {
  width: 15px;
  height: 15px;
}

.info-button,
.info-spacer {
  flex: none;
  width: 26px;
  height: 26px;
}

.info-button {
  margin: -2px -4px 0 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--faint);
}

.info-button:hover:not(:disabled) {
  background: var(--hover);
  color: var(--ink);
}

.info-button svg {
  width: 16px;
  height: 16px;
}

.path-list {
  display: grid;
  gap: 8px;
  padding: 16px 0;
}

.path-list-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.path-list-head strong {
  font-weight: 500;
}

.path-list-help {
  margin-top: -6px;
  color: var(--muted);
  font-size: 13px;
}

.paths {
  display: grid;
  gap: 4px;
}

.paths:empty {
  display: none;
}

.path-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: var(--control-h);
  padding: 0 2px 0 10px;
  border-radius: var(--radius-sm);
  background: var(--fill);
}

.path-item code {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.path-item.row-disabled code {
  opacity: 0.5;
}

.json-body {
  position: relative;
  display: grid;
  padding: var(--card-x);
}

.json-body button {
  position: absolute;
  top: calc(var(--card-x) + 6px);
  right: calc(var(--card-x) + 6px);
  height: 28px;
  padding: 0 8px;
}

#raw {
  min-height: 300px;
}

.savebar {
  position: sticky;
  bottom: 16px;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 10px 10px 18px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-float);
}

.savebar-text {
  display: grid;
  min-width: 0;
}

.savebar-text strong {
  font-weight: 500;
}

.savebar-text span {
  overflow: hidden;
  color: var(--muted);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.savebar-actions {
  display: flex;
  gap: 8px;
}

.rulebook {
  display: grid;
  gap: 8px;
}

.rulebook + .rulebook {
  margin-top: 16px;
}

.rulebook-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 12px;
  color: var(--muted);
  font-size: 13px;
}

.rulebook-head strong {
  color: var(--ink);
  font-size: 14px;
}

.rulebook-rule {
  display: grid;
  gap: 4px;
}

.rulebook-rule.focused {
  margin: 0 calc(-1 * var(--card-x));
  padding-right: var(--card-x);
  padding-left: calc(var(--card-x) - 3px);
  border-left: 3px solid var(--focus-ring);
  background: var(--fill);
}

.rulebook-rule-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
}

.rulebook-rule .command {
  font-weight: 600;
}

.rulebook-rule p.muted {
  font-size: 13px;
}

.form-grid {
  display: grid;
  gap: 18px;
}

.field {
  display: grid;
  gap: 6px;
}

.field-label {
  font-weight: 500;
}

.field .pills {
  justify-self: start;
}

.field small {
  color: var(--muted);
  font-size: 13px;
}

#rules-composer-input {
  font-family: var(--font-sans);
  font-size: 14px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}

.chip-row-label {
  color: var(--faint);
  font-size: 13px;
}

button.chip {
  height: 26px;
  padding: 0 10px;
  border: 0;
  border-radius: 999px;
  background: var(--fill);
  color: var(--muted);
  font-size: 13px;
}

button.chip:hover:not(:disabled) {
  background: var(--selected);
  color: var(--ink);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.agent-groups {
  display: grid;
  gap: 28px;
}

.agent-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 200px) 130px 96px;
  align-items: baseline;
  gap: 4px 16px;
}

.agent-name {
  font-weight: 500;
}

.agent-version {
  overflow: hidden;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 12.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.agent-status {
  color: var(--muted);
  font-size: 13px;
}

.agent-status.active {
  color: var(--ok-fg);
}

.agent-status.disabled {
  color: var(--warn-fg);
}

.agent-action {
  justify-self: end;
}

.agent-row .notice {
  grid-column: 1 / -1;
}

.missing-agents summary {
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
}

.missing-agents summary:hover {
  color: var(--ink);
}

.retention-input {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.retention-input input {
  width: 72px;
  padding: 0 8px;
  text-align: right;
}

#project-policy-notice {
  font-size: 13px;
}

.toast {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: min(400px, calc(100vw - 32px));
  padding: 12px 8px 12px 14px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-float);
}

.toast::before {
  content: '';
  flex: none;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--faint);
}

.toast.ok::before {
  background: var(--ok-fg);
}

.toast.error::before {
  background: var(--err-fg);
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-text strong {
  font-weight: 500;
}

.toast-text p {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.toast .icon-only {
  margin-top: -3px;
  border: 0;
  color: var(--faint);
}

.rule-example-popover,
.confirm-dialog {
  border: 0;
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--ink);
}

.rule-example-popover {
  position: fixed;
  inset: auto;
  width: min(380px, calc(100vw - 24px));
  margin: 0;
  padding: 14px;
  box-shadow: var(--shadow-float);
}

.rule-example-popover::backdrop {
  background: transparent;
}

.rule-example-popover > * {
  display: block;
}

.rule-example-label {
  color: var(--faint);
  font-size: 12px;
}

.rule-example-popover strong {
  margin-top: 2px;
  font-weight: 500;
}

.rule-example-popover p {
  margin: 2px 0 10px;
  color: var(--muted);
  font-size: 13px;
}

.rule-example-popover code {
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  background: var(--fill);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.rule-example-popover p + code {
  margin-top: 0;
}

.confirm-dialog {
  width: min(440px, calc(100vw - 32px));
  padding: 0;
  box-shadow:
    0 0 0 1px var(--line-strong),
    0 16px 48px rgb(0 0 0 / 24%);
}

.confirm-dialog::backdrop {
  background: rgb(0 0 0 / 45%);
}

.confirm-dialog form {
  display: grid;
  gap: 12px;
  padding: 20px;
}

.confirm-dialog h2 {
  font-size: 16px;
  font-weight: 600;
}

.confirm-dialog form > p {
  color: var(--muted);
}

.confirm-dialog:has(.dialog-rows:not([hidden])) {
  width: min(640px, calc(100vw - 32px));
}

.report-dialog {
  width: min(680px, calc(100vw - 32px));
}

.dialog-detail {
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  background: var(--fill);
  overflow-wrap: anywhere;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}

.dialog-rows {
  display: grid;
  gap: 8px;
  max-height: 46vh;
  overflow: auto;
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.diff-table th {
  padding: 4px 8px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-weight: 500;
}

.diff-table td {
  padding: 6px 8px;
  border-bottom: 1px solid var(--line);
  overflow-wrap: anywhere;
  vertical-align: top;
}

.diff-before {
  color: var(--muted);
  text-decoration: line-through;
}

.diff-after {
  font-weight: 500;
}

.report-field {
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 12px 16px;
  border-radius: var(--radius-lg);
  box-shadow: 0 0 0 1px var(--line);
}

.star-pitch {
  flex: 1;
  min-width: 0;
  color: var(--muted);
  font-size: 13px;
}

.star-pitch strong {
  color: var(--ink);
}

.star-cta {
  gap: 8px;
  text-decoration: none;
}

.star-icon {
  display: inline-flex;
  color: var(--star);
}

.star-icon svg {
  width: 15px;
  height: 15px;
}

.star-count {
  padding-left: 8px;
  border-left: 1px solid var(--line-strong);
  color: var(--muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
}

.star-cta.starred:disabled {
  opacity: 1;
  cursor: default;
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
  }

  .sidebar {
    z-index: 100;
    height: auto;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .brand {
    padding: 0;
  }

  .brand-logo svg {
    height: 22px;
  }

  .sidenav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  .sidenav a {
    position: relative;
    padding: 0 8px;
  }

  .sr-only-collapse {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .nav-dirty {
    position: absolute;
    top: 3px;
    right: 2px;
    width: 7px;
    height: 7px;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    background: var(--warn-fg);
    color: transparent;
  }

  .sidebar-foot {
    display: none;
  }

  .app-foot {
    display: flex;
    justify-content: center;
    gap: 28px;
    padding: 16px;
    border-top: 1px solid var(--line);
    font-size: 13px;
  }

  .preset-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .feed-summary {
    grid-template-columns: 16px 64px 72px minmax(0, 1fr);
  }

  .feed-summary .feed-agent,
  .feed-summary .feed-rule,
  .compact-row .feed-agent,
  .compact-row .feed-rule {
    display: none;
  }

  .compact-row {
    grid-template-columns: 72px minmax(0, 1fr);
  }

  .rule-count-row {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .agent-row {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .agent-status:empty {
    display: none;
  }

  .agent-version {
    display: none;
  }
}

@media (max-width: 640px) {
  main {
    padding: 24px 16px 56px;
  }

  .tiles {
    grid-template-columns: minmax(0, 1fr);
  }

  .panel-head {
    flex-direction: column;
    align-items: stretch;
  }

  .panel-head .section-actions {
    justify-content: space-between;
  }

  .panel-head .section-actions > .quiet {
    margin-left: -13px;
  }

  .setting-row.info button {
    align-self: flex-start;
    margin-left: -9px;
  }

  .toolbar-search {
    flex: 1 1 100%;
  }

  .rule-row {
    padding-left: var(--row-x);
  }

  .status-card,
  .savebar,
  .project-bar,
  .recovery,
  .setting-row {
    flex-direction: column;
    align-items: stretch;
  }

  .setting-label {
    width: auto;
  }

  .detail-rows div {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
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
        <a href="#policy" data-nav="policy" title="Protections"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"></path></svg><span class="sr-only-collapse">Protections</span><span class="nav-dirty" id="nav-dirty" hidden>Unsaved</span></a>
        <a href="#rules" data-nav="rules" title="Custom rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4"></path><path d="M9 12h6M9 16h4"></path></svg><span class="sr-only-collapse">Custom rules</span></a>
        <a href="#integrations" data-nav="integrations" title="Agents"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"></path></svg><span class="sr-only-collapse">Agents</span></a>
        <a href="#settings" data-nav="settings" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"></path><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle></svg><span class="sr-only-collapse">Settings</span></a>
      </nav>
      <div class="sidebar-foot">
        <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
      </div>
    </aside>
    <div class="content">
      <main>
        <div class="banner" id="protection-banner" role="alert" hidden></div>

        <section class="view" data-view="overview">
          <header class="page-head">
            <div>
              <h2>Overview</h2>
              <p>What CC Safety Net has been doing on this machine.</p>
            </div>
          </header>
          <div class="card status-card" id="status-card" aria-live="polite"><p class="muted">Loading…</p></div>
          <section class="section" id="attention" hidden>
            <div class="section-head"><h3 class="section-title">Needs attention</h3></div>
            <ul class="card list" id="attention-list"></ul>
          </section>
          <div class="tiles" id="overview-tiles"></div>
          <section class="section">
            <div class="section-head">
              <h3 class="section-title">Recent blocks</h3>
              <a class="link-button" href="#activity">All activity</a>
            </div>
            <div id="recent-blocks"></div>
          </section>
          <section class="section">
            <div class="section-head">
              <h3 class="section-title" id="top-rules-title">Most-triggered rules</h3>
            </div>
            <div id="top-rules"></div>
          </section>
          <div class="star-row" id="star-row" hidden>
            <p class="star-pitch"><span id="star-pitch-text"></span></p>
            <span id="star-slot"></span>
          </div>
        </section>

        <section class="view" data-view="activity" hidden>
          <header class="page-head">
            <div>
              <h2>Activity</h2>
              <p>Commands your agents ran, newest first. Commands are secret-redacted when they are logged.</p>
            </div>
            <button type="button" class="quiet icon-button" id="activity-refresh" aria-label="Refresh activity" title="Refresh activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"></path><path d="M20 4v7h-7"></path></svg></button>
          </header>
          <div class="toolbar">
            <div class="pills" id="activity-decision" role="group" aria-label="Decision"></div>
            <span class="toolbar-spacer"></span>
            <label class="toolbar-search"><span class="sr-only">Search activity</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg><input type="search" id="activity-search" autocomplete="off" placeholder="Search commands or rule IDs"></label>
            <label class="toolbar-select"><span class="sr-only">Agent</span><select id="activity-agent"></select></label>
            <label class="toolbar-select"><span class="sr-only">Time window</span><select id="activity-days"></select></label>
          </div>
          <div class="filter-line" id="activity-command-filter" hidden></div>
          <div class="card list" id="activity-feed"><p class="empty">Loading activity…</p></div>
          <p class="footnote" id="activity-count"></p>
        </section>

        <section class="view" data-view="policy" hidden>
          <header class="page-head">
            <div>
              <h2>Protections</h2>
              <p>Choose what CC Safety Net blocks. Changes apply after you save.</p>
            </div>
            <div class="page-actions">
              <div class="pills" role="group" aria-label="Policy you are editing">
                <button type="button" id="scope-user" aria-pressed="true">My policy</button>
                <button type="button" id="project-draft-enter" aria-pressed="false">Project policy</button>
              </div>
              <button type="button" id="tester-open" aria-haspopup="dialog">Test a command</button>
            </div>
          </header>
          <div class="project-bar" id="project-draft-bar" hidden>
            <div>
              <strong>Editing the project policy</strong> <code id="project-draft-path"></code>
              <p>Only settings tagged <span class="project-chip">Project</span> are written. Everything else keeps following each person's own policy. Click a Project tag to stop setting that field.</p>
            </div>
            <button type="button" id="project-draft-change" hidden>Change folder…</button>
          </div>
          <p class="notice error" id="project-draft-diagnostics" hidden></p>
          <div class="recovery" id="recovery" hidden>
            <div>
              <strong>Your policy file needs repair</strong>
              <p>Repair keeps every valid setting and rewrites the file. If the JSON cannot be read at all, defaults are restored.</p>
              <p class="notice error" id="policy-errors"></p>
            </div>
            <button class="primary" id="repair" type="button">Repair</button>
          </div>

          <section class="section">
            <div class="section-head">
              <div>
                <h3 class="section-title">Safety preset</h3>
                <p class="section-sub">Each preset includes everything in the one before it.</p>
              </div>
              <span class="preset-status" id="safety-preset-status"></span>
              <span class="project-chip-slot" id="safety-level-chip"></span>
            </div>
            <div class="preset-grid" id="safety-level"></div>
            <p class="notice" id="environment-overrides" hidden></p>
            <details class="card disclosure">
              <summary><span class="disclosure-title">Advanced settings</span><span class="disclosure-sub">Preset checks and linked worktrees</span></summary>
              <div class="disclosure-body">
                <div id="safety-overrides"></div>
                <div id="workflow"></div>
              </div>
            </details>
          </section>

          <div class="toolbar policy-toolbar">
            <label class="toolbar-search primary-search"><span class="sr-only">Search protections</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg><input type="search" id="policy-search" autocomplete="off" aria-keyshortcuts="/" placeholder="Type / to search by name, path or rule ID"></label>
            <div class="pills" role="group" aria-label="Which protections to show">
              <button type="button" data-policy-show="all" aria-pressed="true">All</button>
              <button type="button" data-policy-show="changed" aria-pressed="false">Changed from default <span class="count" id="changed-count"></span></button>
            </div>
          </div>

          <section class="card panel" id="destructive-panel">
            <div class="panel-head">
              <div>
                <h3 class="section-title" id="destructive-label">Command protection</h3>
                <p class="section-sub" id="destructive-command-summary"></p>
              </div>
              <div class="section-actions">
                <button type="button" class="quiet" id="reset-rule-customizations">Reset all</button>
                <span class="project-chip-slot" id="destructive-enabled-chip"></span>
                <label class="master-switch"><span class="master-state"></span><input type="checkbox" class="switch" id="destructive-enabled" aria-labelledby="destructive-label"></label>
              </div>
            </div>
            <div class="panel-list" id="destructive-command-rules"></div>
          </section>

          <section class="card panel" id="secret-panel">
            <div class="panel-head">
              <div>
                <h3 class="section-title" id="secret-label">Secret protection</h3>
                <p class="section-sub" id="secret-summary"></p>
              </div>
              <div class="section-actions">
                <button type="button" class="quiet" id="reset-secret-customizations">Reset all</button>
                <span class="project-chip-slot" id="secret-enabled-chip"></span>
                <label class="master-switch"><span class="master-state"></span><input type="checkbox" class="switch" id="secret-enabled" aria-labelledby="secret-label"></label>
              </div>
            </div>
            <div class="panel-list" id="secret-patterns"></div>
          </section>

          <section class="card panel">
            <div class="panel-head">
              <div>
                <h3 class="section-title">Exceptions and extra paths</h3>
                <p class="section-sub">Paths can be absolute or start with <code>~/</code>. Paste several lines to add many at once. Paths that cover your home directory are rejected.</p>
              </div>
            </div>
            <div class="panel-rows">
              <div class="path-list">
                <div class="path-list-head"><strong id="allow-paths-label">Allow recursive deletes in</strong><span class="count" id="allow-paths-count"></span><span class="project-chip-slot" id="allow-paths-chip"></span></div>
                <p class="path-list-help">Recursive deletes inside these paths are not blocked, like a scratch folder under <code>/tmp</code>.</p>
                <div class="input-row"><input type="text" class="mono" id="allow-paths-input" data-path-input="allow-paths" autocomplete="off" spellcheck="false" placeholder="/absolute/path or ~/path" aria-labelledby="allow-paths-label"><button type="button" id="allow-paths-add-button" data-path-add="allow-paths">Add</button></div>
                <p class="field-error" id="allow-paths-hint" hidden></p>
                <ul class="paths" id="allow-paths-list"></ul>
              </div>
              <div class="path-list">
                <div class="path-list-head"><strong id="deny-paths-label">Always block access to</strong><span class="count" id="deny-paths-count"></span><span class="project-chip-slot" id="deny-paths-chip"></span></div>
                <p class="path-list-help">These paths and everything inside them are blocked while secret protection is on.</p>
                <div class="input-row"><input type="text" class="mono" id="deny-paths-input" data-path-input="deny-paths" autocomplete="off" spellcheck="false" placeholder="path/to/protect" aria-labelledby="deny-paths-label"><button type="button" id="deny-paths-add-button" data-path-add="deny-paths">Add</button></div>
                <p class="field-error" id="deny-paths-hint" hidden></p>
                <ul class="paths" id="deny-paths-list"></ul>
              </div>
              <div class="path-list">
                <div class="path-list-head"><strong id="secret-allow-paths-label">Exempt from secret patterns</strong><span class="count" id="secret-allow-paths-count"></span><span class="project-chip-slot" id="secret-allow-paths-chip"></span></div>
                <p class="path-list-help">Files, folders, or one file name under a folder such as <code>~/code/**/.env.local</code>. Deny paths and coding agent credentials still apply.</p>
                <div class="input-row"><input type="text" class="mono" id="secret-allow-paths-input" data-path-input="secret-allow-paths" autocomplete="off" spellcheck="false" placeholder="~/code/**/.env.local" aria-labelledby="secret-allow-paths-label"><button type="button" id="secret-allow-paths-add-button" data-path-add="secret-allow-paths">Add</button></div>
                <p class="field-error" id="secret-allow-paths-hint" hidden></p>
                <ul class="paths" id="secret-allow-paths-list"></ul>
              </div>
            </div>
          </section>

          <details class="card disclosure">
            <summary><span class="disclosure-title">Policy JSON</span><span class="disclosure-sub" id="raw-source">Read-only. Mirrors the settings above.</span></summary>
            <div class="disclosure-body json-body">
              <button type="button" class="quiet" id="raw-copy"></button>
              <textarea id="raw" aria-label="Policy JSON" aria-describedby="raw-source" readonly></textarea>
            </div>
          </details>

          <div class="savebar" id="policy-savebar" hidden>
            <div class="savebar-text">
              <strong id="savebar-title">Unsaved changes</strong>
              <span id="savebar-summary"></span>
            </div>
            <div class="savebar-actions">
              <button type="button" id="discard-changes">Discard</button>
              <button type="button" class="primary" id="save">Save</button>
            </div>
          </div>
        </section>

        <section class="view" data-view="rules" hidden>
          <header class="page-head">
            <div>
              <h2>Custom rules</h2>
              <p>Your own blocking rules from rulebooks, enforced on top of the built-in protections.</p>
            </div>
            <button type="button" class="quiet icon-button" id="rules-refresh" aria-label="Refresh custom rules" title="Refresh custom rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"></path><path d="M20 4v7h-7"></path></svg></button>
          </header>
          <section class="section" id="rules-diagnostics-panel" hidden>
            <div class="section-head">
              <div>
                <h3 class="section-title">Problems</h3>
                <p class="section-sub">An error means a rulebook was skipped and none of its rules are enforced.</p>
              </div>
            </div>
            <div class="notices" id="rules-diagnostics"></div>
          </section>
          <section class="section">
            <div class="section-head">
              <div>
                <h3 class="section-title">Rulebooks</h3>
                <p class="section-sub">Read-only. Rules are shown as they are enforced.</p>
              </div>
            </div>
            <div id="rules-list"><p class="empty">Loading rules…</p></div>
          </section>
          <section class="section" id="rules-composer-panel">
            <div class="section-head">
              <div>
                <h3 class="section-title">Create a rule</h3>
                <p class="section-sub">Describe the rule and copy a ready-made prompt for your coding agent. CC Safety Net does not write rulebooks itself.</p>
              </div>
            </div>
            <div class="card pad">
              <div class="form-grid">
                <div class="field">
                  <span class="field-label">Applies to</span>
                  <div class="pills" role="group" aria-label="Rule scope">
                    <button type="button" data-rules-scope="project" aria-pressed="true">This project</button>
                    <button type="button" data-rules-scope="user" aria-pressed="false">All projects</button>
                  </div>
                </div>
                <div class="field" id="rules-project-path-field">
                  <label class="field-label" id="rules-project-path-label" for="rules-project-path">Project folder</label>
                  <div class="input-row">
                    <input type="text" class="mono" id="rules-project-path" spellcheck="false" autocomplete="off" aria-describedby="rules-project-path-hint">
                    <button type="button" id="rules-choose-directory" hidden>Choose…</button>
                  </div>
                  <small id="rules-project-path-hint">Where the rulebook is written. Defaults to the folder this GUI was started from.</small>
                </div>
                <div class="field">
                  <label class="field-label" id="rules-composer-label" for="rules-composer-input">What should be blocked?</label>
                  <textarea id="rules-composer-input" spellcheck="false" placeholder="Block terraform destroy in this project" aria-describedby="rules-composer-hint"></textarea>
                  <small id="rules-composer-hint">Rules match a command, its subcommands, and exact arguments, not file paths or patterns.</small>
                  <div class="chip-row">
                    <span class="chip-row-label">Try:</span>
                    <button type="button" class="chip" data-rules-example="read my package.json and suggest blocking rules">Suggest rules</button>
                    <button type="button" class="chip" data-rules-example="set up rules to block all terraform destroy commands">Block a command</button>
                    <button type="button" class="chip" data-rules-example="verify my rules and fix any errors">Verify rules</button>
                  </div>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="primary" id="rules-copy-prompt">Copy prompt</button>
              </div>
            </div>
          </section>
        </section>

        <section class="view" data-view="integrations" hidden>
          <header class="page-head">
            <div>
              <h2>Agents</h2>
              <p>Install or remove the CC Safety Net hook for each coding agent on this machine.</p>
            </div>
            <button type="button" class="quiet icon-button" id="integrations-refresh" aria-label="Refresh agents" title="Refresh agents"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"></path><path d="M20 4v7h-7"></path></svg></button>
          </header>
          <div class="agent-groups" id="integrations-list"><p class="empty">Checking agents…</p></div>
        </section>

        <section class="view" data-view="settings" hidden>
          <header class="page-head">
            <div>
              <h2>Settings</h2>
              <p>Appearance, log retention, file locations, and maintenance.</p>
            </div>
          </header>
          <section class="section">
            <div class="section-head"><h3 class="section-title">Appearance</h3></div>
            <div class="card rows">
              <div class="setting-row">
                <div class="setting-text"><strong>Theme</strong><small>Saved in this browser.</small></div>
                <div class="pills" id="settings-theme" role="group" aria-label="Theme">
                  <button type="button" data-theme-choice="auto" aria-pressed="true">Auto</button>
                  <button type="button" data-theme-choice="light" aria-pressed="false">Light</button>
                  <button type="button" data-theme-choice="dark" aria-pressed="false">Dark</button>
                </div>
              </div>
            </div>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title">Audit log</h3></div>
            <div class="card rows">
              <div class="setting-row">
                <div class="setting-text"><label for="retention-days"><strong>Keep logs for</strong></label><small id="retention-note">Every checked command is logged. Lowering this deletes older entries, and Activity can only look back this far.</small></div>
                <span class="retention-input"><input type="number" id="retention-days" min="1" max="365" step="1" inputmode="numeric" aria-describedby="retention-note"><span id="retention-unit">days</span></span>
              </div>
              <div class="setting-row info"><span class="setting-label">Log folder</span><code id="logs-path"></code><button type="button" class="quiet small" data-copy-path="logs-path" aria-label="Copy the log folder path"></button></div>
            </div>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title">Files</h3></div>
            <div class="card rows">
              <div class="setting-row info"><span class="setting-label">Policy file</span><code id="policy-path"></code><button type="button" class="quiet small" data-copy-path="policy-path" aria-label="Copy the policy file path"></button></div>
              <div class="setting-row info" id="project-policy-row" hidden><span class="setting-label">Project policy</span><code id="project-policy-path"></code><button type="button" class="quiet small" data-copy-path="project-policy-path" aria-label="Copy the project policy path"></button></div>
            </div>
            <p class="notice" id="project-policy-notice" hidden></p>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title">About</h3></div>
            <div class="card rows">
              <div class="setting-row info"><span class="setting-label">CC Safety Net</span><code id="app-version"></code></div>
              <div class="setting-row info"><span class="setting-label">Node.js</span><code id="integrations-node-version"></code></div>
              <div class="setting-row info"><span class="setting-label">Platform</span><code id="integrations-platform"></code></div>
            </div>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title">Danger zone</h3></div>
            <div class="card rows">
              <div class="setting-row">
                <div class="setting-text"><strong>Reset policy</strong><small>Replace your policy file with the defaults. This cannot be undone.</small></div>
                <button type="button" class="danger-quiet" id="reset">Reset policy</button>
              </div>
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
  <div class="toast" id="toast" role="status" aria-live="polite" hidden>
    <div class="toast-text">
      <strong id="toast-title"></strong>
      <p id="toast-detail" hidden></p>
    </div>
    <button type="button" class="quiet icon-only" id="toast-close" aria-label="Dismiss message">✕</button>
  </div>
  <div class="rule-example-popover" id="rule-example-popover" popover="auto" role="dialog" aria-labelledby="rule-example-title" aria-describedby="rule-example-command">
    <span class="rule-example-label" id="rule-example-label"></span>
    <strong id="rule-example-title"></strong>
    <p id="rule-example-description"></p>
    <code id="rule-example-command"></code>
  </div>
  <dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-body confirm-dialog-detail">
    <form method="dialog">
      <h2 id="confirm-dialog-title"></h2>
      <p id="confirm-dialog-body"></p>
      <div class="dialog-rows" id="confirm-dialog-rows" hidden></div>
      <p class="dialog-detail"><code id="confirm-dialog-detail"></code></p>
      <div class="dialog-actions">
        <button type="submit" id="confirm-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="danger" id="confirm-dialog-confirm" value="confirm"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog tester-dialog" id="tester-dialog" aria-labelledby="tester-label" aria-describedby="tester-help">
    <form id="tester-form">
      <h2 id="tester-label">Test a command</h2>
      <p id="tester-help">Checks a command against the Protections settings, including unsaved changes and custom rules. Nothing is run.</p>
      <div class="input-row">
        <label class="prompt-field"><span class="prompt" aria-hidden="true">$</span><input type="text" id="tester-input" class="mono" autocomplete="off" spellcheck="false" placeholder="git push --force" aria-labelledby="tester-label"></label>
        <button type="submit" class="primary" id="tester-run">Test</button>
      </div>
      <div id="tester-result" class="notice" aria-live="polite" hidden></div>
      <div class="dialog-actions">
        <button type="button" id="tester-close">Close</button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog report-dialog" id="report-dialog" aria-labelledby="report-dialog-title" aria-describedby="report-dialog-body">
    <form method="dialog">
      <h2 id="report-dialog-title">Report a false positive</h2>
      <p id="report-dialog-body">This opens a prefilled public GitHub issue form. Nothing is sent until you submit it there. Paths were replaced with <code>&lt;project&gt;</code> and <code>~</code>; edit anything else you would rather not publish.</p>
      <label class="report-field"><span>Why should it have been allowed? (optional)</span><textarea id="report-why" placeholder="What was the agent trying to do, and what makes the command safe there?"></textarea></label>
      <label class="report-field"><span>Title</span><input id="report-title" type="text" spellcheck="false"></label>
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

// src/gui/frontend/ui.ts
var agentLabels = integrationDisplayNames;
var shared = {
  policy: undefined,
  dirty: false,
  drafting: false
};
var emit = (name) => document.dispatchEvent(new Event(\`ccsn:\${name}\`));
var on = (name, listener) => document.addEventListener(\`ccsn:\${name}\`, listener);
var qs = (id) => document.getElementById(id);
var sessionToken = () => JSON.parse(qs("ccsn-data").textContent).token;
var requestJson = async (path, init = {}) => {
  const token = sessionToken();
  try {
    const response = await fetch(\`\${path}\${path.includes("?") ? "&" : "?"}token=\${encodeURIComponent(token)}\`, {
      ...init,
      headers: {
        "content-type": "application/json",
        "x-cc-safety-net-token": token,
        ...init.headers
      }
    });
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
var escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char] ?? char);
var notifyTimer;
var notify = (title, kind = "info", detail = "") => {
  clearTimeout(notifyTimer);
  qs("toast").hidden = title === "";
  qs("toast").className = \`toast \${kind}\`;
  qs("toast-title").textContent = title;
  qs("toast-detail").textContent = detail;
  qs("toast-detail").hidden = detail === "";
  if (kind === "ok")
    notifyTimer = setTimeout(() => notify(""), 4000);
};
var icons = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>'
};
var showingCopied = new WeakSet;
var copyText = async (button, text) => {
  const copied = await navigator.clipboard.writeText(text).then(() => true, () => false);
  if (!copied) {
    notify("Copy failed", "error");
    return;
  }
  if (showingCopied.has(button))
    return;
  showingCopied.add(button);
  const label = button.innerHTML;
  button.innerHTML = \`\${icons.check}<span>Copied</span>\`;
  setTimeout(() => {
    button.innerHTML = label;
    showingCopied.delete(button);
  }, 1500);
};
var showPath = (id, path, suffix = "") => {
  const element = qs(id);
  element.dataset.path = path;
  element.innerHTML = path.split(/(?<=[\\\\/])/).map((part) => \`<span class="path-part">\${escapeHtml(part)}</span>\`).join("") + escapeHtml(suffix);
  document.querySelector(\`[data-copy-path="\${id}"]\`)?.toggleAttribute("hidden", path === "");
};
var runRefresh = async (button, reload) => {
  if (button.disabled)
    return;
  button.disabled = true;
  await reload();
  button.disabled = false;
};
var resolvePendingConfirm = null;
var initConfirmDialog = () => {
  const dialog = qs("confirm-dialog");
  dialog.addEventListener("close", () => {
    if (!resolvePendingConfirm)
      return;
    resolvePendingConfirm(dialog.returnValue === "confirm");
    resolvePendingConfirm = null;
  });
  dialog.addEventListener("cancel", () => {
    dialog.returnValue = "cancel";
  });
};
var confirmDialog = (options) => new Promise((resolve) => {
  if (resolvePendingConfirm) {
    resolve(false);
    return;
  }
  const dialog = qs("confirm-dialog");
  const confirm = qs("confirm-dialog-confirm");
  qs("confirm-dialog-title").textContent = options.title;
  qs("confirm-dialog-body").textContent = options.body;
  qs("confirm-dialog-detail").textContent = options.detail ?? "";
  qs("confirm-dialog-detail").parentElement.hidden = !options.detail;
  qs("confirm-dialog-rows").innerHTML = options.rowsHtml ?? "";
  qs("confirm-dialog-rows").hidden = !options.rowsHtml;
  confirm.textContent = options.confirmLabel;
  confirm.className = options.confirmClass ?? "danger";
  dialog.returnValue = "cancel";
  resolvePendingConfirm = resolve;
  dialog.showModal();
  qs("confirm-dialog-cancel").focus();
});

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

// src/gui/frontend/format.ts
var repoUrl = "https://github.com/kenryu42/cc-safety-net";
var formatCount = (value) => value.toLocaleString("en-US");
var plural = (count, noun, pluralNoun = \`\${noun}s\`) => \`\${formatCount(count)} \${count === 1 ? noun : pluralNoun}\`;
var dayCount = (days) => plural(days, "day");
var viewHash = (view, fields) => {
  const params = new URLSearchParams(fields.filter(([, value, fallback]) => value !== fallback).map(([key, value]) => [key, value]));
  return params.size > 0 ? \`\${view}?\${params}\` : view;
};

// src/gui/frontend/activity-filter.ts
var initialActivityFilters = () => ({
  days: 7,
  decision: "deny",
  agent: "all",
  query: "",
  command: ""
});
var decisions = new Set(["all", "deny", "allow", "error", "suspect"]);
var activityFiltersFromParams = (params) => {
  const defaults = initialActivityFilters();
  const days = Number(params.get("days"));
  const decision = params.get("decision") ?? "";
  return {
    days: Number.isInteger(days) && days > 0 ? days : defaults.days,
    decision: decisions.has(decision) ? decision : defaults.decision,
    agent: params.get("agent") ?? defaults.agent,
    query: params.get("q") ?? defaults.query,
    command: params.get("command") ?? defaults.command
  };
};
var activityHash = (filters) => {
  const defaults = initialActivityFilters();
  return viewHash("activity", [
    ["days", String(filters.days), String(defaults.days)],
    ["decision", filters.decision, defaults.decision],
    ["agent", filters.agent, defaults.agent],
    ["q", filters.query, defaults.query],
    ["command", filters.command, defaults.command]
  ]);
};
var visibleEntries = (entries, filters, suspects) => entries.filter((entry) => {
  const decisionMatches = {
    all: true,
    deny: entry.decision !== "allow",
    allow: entry.decision === "allow",
    error: Boolean(entry.failureStage),
    suspect: suspects.has(entry)
  }[filters.decision];
  if (!decisionMatches)
    return false;
  if (filters.agent !== "all" && (entry.agent || "unknown") !== filters.agent)
    return false;
  if (filters.command)
    return commandSignature(entry.segment || entry.command) === filters.command;
  return [entry.ruleId, entry.segment || entry.command].filter(Boolean).join(" ").toLowerCase().includes(filters.query.trim().toLowerCase());
});

// src/gui/frontend/report.ts
var reportIssueUrl = "https://github.com/kenryu42/cc-safety-net/issues/new?template=false_positive.yml";
var reportUrlLimit = 8000;
var titleCommandLimit = 80;
var reportTitle = (ruleId, command) => {
  const firstLine = command.trim().split(\`
\`)[0] ?? "";
  const shown = firstLine.length > titleCommandLimit ? \`\${firstLine.slice(0, titleCommandLimit)}…\` : firstLine;
  return \`[False Positive]: \${ruleId ? \`\${ruleId} \` : ""}blocked \\\`\${shown}\\\`\`;
};
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

// src/core/policy/safety-level.ts
var SAFETY_LEVEL_CAPABILITIES = {
  standard: { fail_closed: false, paranoid_rm: false, paranoid_interpreters: false },
  strict: { fail_closed: true, paranoid_rm: false, paranoid_interpreters: false },
  paranoid: { fail_closed: true, paranoid_rm: true, paranoid_interpreters: true }
};

// src/gui/frontend/health.ts
var groupIntegrations = (rows) => ({
  installed: rows.filter((row) => row.status === "active"),
  available: rows.filter((row) => row.status !== "active" && row.version !== null),
  missing: rows.filter((row) => row.status !== "active" && row.version === null)
});
var attentionItems = (facts) => [
  ...(facts.targets ?? []).filter((row) => row.status === "disabled").map((row) => ({
    text: \`\${row.label} is detected but its hook is disabled.\`,
    href: "#integrations"
  })),
  facts.suspects > 0 ? {
    text: \`\${plural(facts.suspects, "block")} in the last \${dayCount(facts.days)} \${facts.suspects === 1 ? "looks" : "look"} like a false positive.\`,
    href: "#activity?decision=suspect"
  } : null,
  facts.errors > 0 ? {
    text: \`\${plural(facts.errors, "guard error")} in the last \${dayCount(facts.days)}: commands blocked because evaluation failed, not by policy.\`,
    href: "#activity?decision=error"
  } : null,
  facts.update?.updateAvailable ? { text: \`Version \${facts.update.latestVersion} is available.\`, href: \`\${repoUrl}/releases\` } : null
].filter((item) => item !== null);

// src/gui/frontend/views/integrations.ts
var targets = null;
var busy = new Set;
var integrationTargets = () => targets;
var statusText = (row) => ({
  active: "Hook installed",
  disabled: "Hook disabled",
  "not-installed": "",
  "not-inspected": "Status unknown: its settings file could not be read"
})[row.status];
var rowHtml = (row) => {
  const uninstall = row.status === "active";
  const action = row.version === null ? "" : \`<button type="button" data-integration-action="\${uninstall ? "uninstall" : "install"}" data-integration-target="\${escapeHtml(row.target)}"\${busy.has(row.target) ? " disabled" : ""}>\${busy.has(row.target) ? uninstall ? "Uninstalling…" : "Installing…" : uninstall ? "Uninstall" : row.status === "disabled" ? "Enable" : "Install"}</button>\`;
  return \`<li class="setting-row agent-row">
    <span class="agent-name">\${escapeHtml(row.label)}</span>
    <span class="agent-version"\${row.version === null ? "" : \` title="v\${escapeHtml(row.version)}"\`}>\${row.version === null ? "Not detected" : \`v\${escapeHtml(row.version)}\`}</span>
    <span class="agent-status \${row.status}">\${statusText(row)}</span>
    <span class="agent-action">\${action}</span>
    \${row.note ? \`<p class="notice \${row.note.kind}">\${escapeHtml(row.note.text)}</p>\` : ""}
  </li>\`;
};
var groupHtml = (title, rows, sub = "") => rows.length === 0 ? "" : \`<section class="section"><div class="section-head"><div><h3 class="section-title">\${title} <span class="count">\${rows.length}</span></h3>\${sub ? \`<p class="section-sub">\${sub}</p>\` : ""}</div></div><ul class="card rows">\${rows.map(rowHtml).join("")}</ul></section>\`;
var render = () => {
  if (!targets)
    return;
  const groups = groupIntegrations(targets);
  qs("integrations-list").innerHTML = groupHtml("Installed", groups.installed) + groupHtml("Detected on this machine", groups.available, groups.installed.length === 0 ? "No agent has the hook yet. Install it for each agent you use; until then its commands are not checked." : "") + (groups.missing.length === 0 ? "" : \`<details class="section missing-agents"><summary>Not detected on this machine <span class="count">\${groups.missing.length}</span></summary><ul class="card rows">\${groups.missing.map(rowHtml).join("")}</ul></details>\`);
};
var loadIntegrations = async () => {
  const result = await requestJson("/api/integrations");
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs("integrations-list").innerHTML = \`<p class="empty">Could not check agents: \${escapeHtml(errorText(result))}</p>\`;
    return;
  }
  targets = result.data.targets;
  qs("integrations-node-version").textContent = result.data.system.nodeVersion ?? "unknown";
  qs("integrations-platform").textContent = result.data.system.platform;
  render();
  emit("integrations");
};
var runAction = async (button) => {
  const target = button.dataset.integrationTarget;
  const action = button.dataset.integrationAction;
  if (!target || busy.has(target))
    return;
  busy.add(target);
  render();
  const result = await requestJson(\`/api/\${action}\`, {
    method: "POST",
    body: JSON.stringify({ target })
  });
  busy.delete(target);
  const row = targets?.find((entry) => entry.target === target);
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
    notify(action === "install" ? "Install failed" : "Uninstall failed", "error");
  render();
  emit("integrations");
};
var initIntegrations = () => {
  qs("integrations-refresh").addEventListener("click", (event) => {
    runRefresh(event.currentTarget, loadIntegrations);
  });
  qs("integrations-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-integration-action]");
    if (button)
      runAction(button);
  });
};

// src/gui/frontend/views/overview.ts
var OVERVIEW_DAYS = 7;
var feed = null;
var update = null;
var renderStatusCard = () => {
  const loaded = shared.policy;
  if (!loaded)
    return;
  const targets = integrationTargets();
  const active = (targets ?? []).filter((row) => row.status === "active");
  const policy = loaded.policy;
  const off = [
    policy.destructive_command_protection.enabled ? null : "Command protection is off",
    policy.secret_protection.enabled ? null : "Secret protection is off"
  ].filter((text) => text !== null);
  const headline = loaded.errors.length > 0 ? "Your policy file needs repair" : !targets ? "Checking your agents…" : active.length === 0 ? "Not checking any agent yet" : off.length > 0 ? "Partly protected" : "Protected";
  const customized = (loaded.preview?.counts.effectiveCustomizations ?? 0) > 0 || Object.entries(policy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[policy.safety.level][key]);
  const level = policy.safety.level[0]?.toUpperCase() + policy.safety.level.slice(1);
  const facts = [
    \`\${level} preset\${customized ? ", customized" : ""}\`,
    ...off.length > 0 ? off : [
      loaded.preview ? \`\${loaded.preview.counts.enabled} command rules on\` : null,
      "Secret protection on"
    ],
    active.length > 0 ? \`Hook active in \${active.length <= 3 ? active.map((row) => row.label).join(", ") : plural(active.length, "agent")}\` : null
  ].filter((text) => text !== null);
  const [actionHref, actionLabel] = headline === "Not checking any agent yet" ? ["#integrations", "Install a hook"] : ["#policy", loaded.errors.length > 0 ? "Repair" : "Configure"];
  qs("status-card").innerHTML = \`<div>
      <p class="status-headline">\${escapeHtml(headline)}</p>
      <p class="status-facts">\${facts.map(escapeHtml).join(" · ")}</p>
    </div>
    <a class="link-button" href="\${actionHref}">\${actionLabel}</a>\`;
};
var renderAttention = () => {
  const items = attentionItems({
    targets: integrationTargets(),
    update,
    errors: feed?.counts.errors ?? 0,
    suspects: feed ? findSuspectEntries(feed.entries).size : 0,
    days: feed?.days ?? OVERVIEW_DAYS
  });
  qs("attention").hidden = items.length === 0;
  qs("attention-list").innerHTML = items.map((item) => \`<li><a class="list-row attention-row" href="\${escapeHtml(item.href)}"\${item.href.startsWith("#") ? "" : ' target="_blank" rel="noopener"'}><span>\${escapeHtml(item.text)}</span><span class="row-action">\${item.href.startsWith("#activity") ? "Review" : item.href.startsWith("#") ? "Fix" : "Release notes"}</span></a></li>\`).join("");
};
var sparkline = (byDay, noun) => {
  const max = Math.max(...byDay, 1);
  return \`<div class="tile-spark" role="img" aria-label="\${escapeHtml(\`\${noun} per day, oldest to newest: \${byDay.join(", ")}\`)}">\${byDay.map((count) => \`<span class="spark-bar\${count === 0 ? " spark-zero" : ""}" style="height:\${count === 0 ? 2 : Math.max(3, Math.round(count / max * 36))}px" title="\${formatCount(count)}"></span>\`).join("")}</div>\`;
};
var ruleHref = (ruleId) => ruleId.startsWith("custom.") ? \`#rules?focus=\${encodeURIComponent(ruleId)}\` : \`#activity?q=\${encodeURIComponent(ruleId)}\`;
var renderActivity = () => {
  if (!feed)
    return;
  const loaded = feed;
  qs("overview-tiles").innerHTML = [
    [loaded.counts.blocked, "Blocked", loaded.counts.blockedByDay],
    [loaded.totalInWindow, "Commands checked", loaded.counts.analyzedByDay]
  ].map(([value, label, byDay]) => \`<div class="tile"><div><strong>\${formatCount(value)}</strong><span>\${label} · last \${dayCount(loaded.days)}</span></div>\${sparkline(byDay, label)}</div>\`).join("");
  const blocks = loaded.entries.filter((entry) => entry.decision !== "allow").slice(0, 8);
  qs("recent-blocks").innerHTML = blocks.length === 0 ? \`<p class="empty">Nothing was blocked in the last \${dayCount(loaded.days)}.</p>\` : \`<ul class="card list">\${blocks.map((entry) => \`<li><a class="list-row compact-row" href="\${entry.ruleId ? ruleHref(entry.ruleId) : "#activity"}">
              <time datetime="\${escapeHtml(entry.ts)}">\${escapeHtml(formatRelativeTime(entry.ts))}</time>
              <span class="feed-agent">\${escapeHtml(entry.agent && entry.agent !== "unknown" ? agentLabels[entry.agent] ?? entry.agent : "")}</span>
              <code class="feed-command">\${escapeHtml(entry.segment || entry.command || "(no command recorded)")}</code>
              <span class="feed-rule">\${escapeHtml(entry.failureStage ? "guard error" : entry.ruleId ?? "")}</span>
            </a></li>\`).join("")}</ul>\`;
  const top = Object.entries(loaded.counts.rules).sort((a, b) => b[1] - a[1]).slice(0, 5);
  qs("top-rules-title").textContent = \`Most-triggered rules · last \${dayCount(loaded.days)}\`;
  qs("top-rules").innerHTML = top.length === 0 ? '<p class="empty">No rule has blocked anything yet.</p>' : \`<ul class="card list">\${top.map(([ruleId, count]) => \`<li><a class="list-row rule-count-row" href="\${ruleHref(ruleId)}">
              <code class="rule-label">\${escapeHtml(ruleId)}</code>
              <span class="count">\${plural(count, "block")}</span>
            </a></li>\`).join("")}</ul>\`;
};
var loadOverview = async () => {
  const result = await requestJson(\`/api/activity?days=\${Math.min(OVERVIEW_DAYS, retentionDays())}\`);
  if (!result.ok || !result.data) {
    qs("recent-blocks").innerHTML = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    return;
  }
  feed = result.data;
  renderActivity();
  renderAttention();
};
var loadHealth = async () => {
  const result = await requestJson("/api/health");
  update = result.ok ? result.data?.update ?? null : null;
  renderAttention();
};
var starIcons = {
  outline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
  filled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>'
};
var starContext = { starCount: null, blockedTotal: 0 };
var starCountHtml = (count) => typeof count === "number" ? \`<span class="star-count">\${count >= 1000 ? \`\${(count / 1000).toFixed(1).replace(/\\.0$/, "")}k\` : count}</span>\` : "";
var renderStarPitch = (starred) => {
  const evidence = starContext.blockedTotal > 0 ? \`CC Safety Net has blocked <strong>\${formatCount(starContext.blockedTotal)}</strong> risky \${starContext.blockedTotal === 1 ? "command" : "commands"} on this machine in the last \${escapeHtml(dayCount(retentionDays()))}.\` : "";
  qs("star-pitch-text").innerHTML = starred ? evidence : evidence ? \`\${evidence} If it saved your work, star it on GitHub.\` : "If CC Safety Net is useful to you, star it on GitHub.";
};
var renderStarLink = (href) => {
  qs("star-slot").innerHTML = \`<a class="star-cta" href="\${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="Star CC Safety Net on GitHub (opens github.com)"><span class="star-icon" aria-hidden="true">\${starIcons.outline}</span><span class="star-label">Star on GitHub</span>\${starCountHtml(starContext.starCount)}</a>\`;
  qs("star-row").hidden = false;
};
var loadStarContext = async () => {
  const result = await requestJson("/api/star/context");
  starContext = result.ok && result.data ? result.data : { starCount: null, blockedTotal: 0 };
  renderStarPitch(false);
  qs("star-slot").innerHTML = \`<button type="button" class="star-cta" aria-label="Star CC Safety Net on GitHub"><span class="star-icon" aria-hidden="true">\${starIcons.outline}</span><span class="star-label">Star on GitHub</span>\${starCountHtml(starContext.starCount)}</button>\`;
  qs("star-row").hidden = false;
};
var starRepo = async (button) => {
  button.disabled = true;
  const result = await requestJson("/api/star", { method: "POST" });
  if (!(result.ok && result.data?.ok === true)) {
    renderStarLink(result.data?.fallbackUrl ?? repoUrl);
    return;
  }
  button.querySelector(".star-icon").innerHTML = starIcons.filled;
  button.querySelector(".star-label").textContent = "Starred. Thank you.";
  button.setAttribute("aria-label", "CC Safety Net starred on GitHub");
  button.classList.add("starred");
  renderStarPitch(true);
};
var initOverview = () => {
  on("policy", renderStatusCard);
  on("integrations", () => {
    renderStatusCard();
    renderAttention();
  });
  qs("star-slot").addEventListener("click", (event) => {
    const button = event.target.closest(".star-cta");
    if (button instanceof HTMLButtonElement)
      starRepo(button);
  });
};

// src/gui/frontend/views/activity.ts
var filters = initialActivityFilters();
var activity = null;
var suspects = new Set;
var renderedEntries = [];
var queryTimer;
var syncHash = () => {
  if (document.body.dataset.view === "activity")
    history.replaceState(null, "", \`#\${activityHash(filters)}\`);
};
var retentionDays = () => shared.policy?.policy.audit.retention_days ?? DEFAULT_AUDIT_RETENTION_DAYS;
var knownRuleIds = () => new Set([
  ...shared.policy?.destructiveCommandRules ?? [],
  ...shared.policy?.secretPatterns ?? []
].map((rule) => rule.id));
var decisionLabel = (entry) => entry.failureStage ? "Error" : entry.decision === "allow" ? "Allowed" : "Blocked";
var timeLabel = (ts) => new Date(ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
var dayLabel = (ts) => {
  const date = new Date(ts).toDateString();
  if (date === new Date().toDateString())
    return "Today";
  if (date === new Date(Date.now() - 86400000).toDateString())
    return "Yesterday";
  return new Date(ts).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
};
var ruleLink = (ruleId) => ruleId.startsWith("custom.") ? \`<a class="rule-id" href="#rules?focus=\${encodeURIComponent(ruleId)}" title="Show this custom rule">\${escapeHtml(ruleId)}</a>\` : knownRuleIds().has(ruleId) ? \`<a class="rule-id" href="#policy?q=\${encodeURIComponent(ruleId)}" title="Show this protection">\${escapeHtml(ruleId)}</a>\` : \`<code class="rule-id">\${escapeHtml(ruleId)}</code>\`;
var entryCommand = (entry) => entry.segment || entry.command || "";
var feedRowHtml = (entry, index) => {
  const blocked = entry.decision !== "allow";
  const command = entryCommand(entry);
  const agent = entry.agent && entry.agent !== "unknown" ? agentLabels[entry.agent] ?? entry.agent : "";
  const detailRows = [
    entry.command && entry.command !== command ? ["Full command", \`<code class="block">\${escapeHtml(entry.command)}</code>\`] : null,
    entry.reason && entry.reason !== "allowed" ? ["Reason", escapeHtml(entry.reason)] : null,
    entry.ruleId ? ["Rule", ruleLink(entry.ruleId)] : null,
    entry.cwd ? ["Folder", \`<code>\${escapeHtml(entry.cwd)}</code>\`] : null,
    [
      "Time",
      \`\${escapeHtml(new Date(entry.ts).toLocaleString("en-US"))} (\${formatRelativeTime(entry.ts)})\`
    ]
  ].filter((row) => row !== null);
  return \`<li class="feed-row">
    <button type="button" class="feed-summary" aria-expanded="false" aria-controls="feed-detail-\${index}">
      <span class="chevron" aria-hidden="true"></span>
      <time datetime="\${escapeHtml(entry.ts)}">\${escapeHtml(timeLabel(entry.ts))}</time>
      <span class="decision \${entry.failureStage ? "error" : blocked ? "deny" : "allow"}">\${decisionLabel(entry)}</span>
      <span class="feed-agent">\${escapeHtml(agent)}</span>
      <code class="feed-command">\${escapeHtml(command || "(no command recorded)")}</code>
      <span class="feed-rule">\${escapeHtml(entry.ruleId ?? "")}</span>
    </button>
    <div class="feed-detail" id="feed-detail-\${index}" hidden>
      <code class="block detail-command">\${escapeHtml(command || "(no command recorded)")}</code>
      <div class="detail-actions">
        \${blocked ? \`<button type="button" class="primary" data-report-fp="\${index}">Report false positive</button>\` : \`<button type="button" class="primary" data-block-future="\${index}">Block this in future</button>\`}
        <button type="button" data-log-copy="\${index}">\${icons.copy}<span>Copy log entry</span></button>
      </div>
      <dl class="detail-rows">\${detailRows.map(([term, value]) => \`<div><dt>\${term}</dt><dd>\${value}</dd></div>\`).join("")}</dl>
    </div>
  </li>\`;
};
var renderControls = () => {
  if (!activity)
    return;
  const loaded = activity;
  const segment = (value, label, count) => \`<button type="button" data-activity-decision="\${value}" aria-pressed="\${filters.decision === value}">\${label} <span class="count">\${formatCount(count)}</span></button>\`;
  qs("activity-decision").innerHTML = [
    segment("deny", "Blocked", loaded.counts.blocked),
    segment("allow", "Allowed", loaded.counts.allowed),
    ...loaded.counts.errors > 0 ? [segment("error", "Errors", loaded.counts.errors)] : [],
    ...suspects.size > 0 ? [segment("suspect", "Likely false positive", suspects.size)] : [],
    segment("all", "All", loaded.totalInWindow)
  ].join("");
  const agentNames = Object.keys(loaded.counts.agents).filter((name) => name !== "unknown").sort();
  qs("activity-agent").innerHTML = [
    '<option value="all">All agents</option>',
    ...agentNames.map((name) => \`<option value="\${escapeHtml(name)}">\${escapeHtml(agentLabels[name] ?? name)} (\${formatCount(loaded.counts.agents[name] ?? 0)})</option>\`)
  ].join("");
  qs("activity-agent").value = filters.agent;
  qs("activity-agent").parentElement?.toggleAttribute("hidden", agentNames.length < 2);
  const retained = retentionDays();
  qs("activity-days").innerHTML = [
    ...new Set([...[7, 30, 90, 180, 365].filter((days) => days < retained), retained, loaded.days])
  ].sort((left, right) => left - right).map((days) => \`<option value="\${days}">Last \${dayCount(days)}</option>\`).join("");
  qs("activity-days").value = String(loaded.days);
  qs("activity-command-filter").hidden = !filters.command;
  qs("activity-command-filter").innerHTML = filters.command ? \`Showing blocks of <code>\${escapeHtml(filters.command)}</code> <button type="button" class="quiet" data-clear-command>Show all blocks</button>\` : "";
};
var emptyMessage = () => {
  if (filters.query || filters.command || filters.agent !== "all")
    return "Nothing matches these filters.";
  if (filters.decision === "deny")
    return \`Nothing was blocked in the last \${dayCount(activity?.days ?? filters.days)}. <button type="button" class="quiet" data-activity-decision="all">Show all activity</button>\`;
  return "No audit log entries match.";
};
var renderFeed = () => {
  if (!activity)
    return;
  const entries = visibleEntries(activity.entries, filters, suspects);
  renderedEntries = entries;
  qs("activity-feed").innerHTML = entries.length === 0 ? \`<p class="empty">\${emptyMessage()}</p>\` : entries.map((entry, index) => {
    const label = dayLabel(entry.ts);
    const previous = entries[index - 1];
    const heading = previous && dayLabel(previous.ts) === label ? "" : \`\${index === 0 ? "" : "</ul>"}<h4 class="day-heading">\${escapeHtml(label)}</h4><ul class="feed-list">\`;
    return heading + feedRowHtml(entry, index);
  }).join("") + "</ul>";
  qs("activity-count").textContent = [
    \`Showing \${formatCount(entries.length)} of \${plural(activity.totalInWindow, "entry", "entries")} from the last \${dayCount(activity.days)}.\`,
    activity.truncated ? "Only the newest 500 entries of each decision are loaded; narrow the time window to see older ones." : "",
    activity.unreadable > 0 ? \`\${plural(activity.unreadable, "log file")} could not be read, so this list is incomplete.\` : ""
  ].filter(Boolean).join(" ");
};
var loadActivity = async () => {
  const result = await requestJson(\`/api/activity?days=\${filters.days}\`);
  if (!result.ok || !result.data) {
    qs("activity-feed").innerHTML = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("activity-count").textContent = "";
    return;
  }
  activity = result.data;
  suspects = findSuspectEntries(activity.entries);
  showPath("logs-path", activity.logsDir ?? "", activity.logsDir ? "" : "Not available");
  if (filters.agent !== "all" && !(filters.agent in activity.counts.agents))
    filters.agent = "all";
  if (filters.decision === "error" && activity.counts.errors === 0)
    filters.decision = "deny";
  if (filters.decision === "suspect" && suspects.size === 0)
    filters.decision = "deny";
  renderControls();
  renderFeed();
  syncHash();
};
var limitActivityDays = (days) => {
  filters.days = Math.min(filters.days, days);
};
var rerender = () => {
  renderControls();
  renderFeed();
  syncHash();
};
var showActivity = (params) => {
  const next = activityFiltersFromParams(params);
  if (shared.policy)
    next.days = Math.min(next.days, retentionDays());
  if (activityHash(next) === activityHash(filters))
    return;
  const reload = next.days !== filters.days;
  Object.assign(filters, next);
  qs("activity-search").value = filters.query;
  if (reload && activity) {
    loadActivity();
    return;
  }
  rerender();
};
var openReportDialog = (entry) => {
  const scrub = (text) => scrubReportPaths(text, entry.cwd, activity?.homeDir);
  qs("report-command").value = scrub(entry.command || entry.segment || "");
  qs("report-title").value = reportTitle(entry.ruleId, scrub(entry.segment || entry.command || ""));
  qs("report-why").value = "";
  qs("report-entry").value = JSON.stringify(entry, (_key, value) => typeof value === "string" ? scrub(value) : value, 2);
  qs("report-dialog").returnValue = "cancel";
  qs("report-dialog").showModal();
};
var openFalsePositiveForm = async () => {
  const fields = {
    title: qs("report-title").value,
    expected: qs("report-why").value.trim(),
    command: qs("report-command").value,
    entry: qs("report-entry").value
  };
  const request = buildReportRequest(fields);
  const copying = request.dropped.length ? navigator.clipboard.writeText(request.dropped.map((field) => \`### \${field}
\${fields[field]}\`).join(\`

\`)).then(() => true, () => false) : null;
  window.open(request.url, "_blank", "noopener");
  if (!copying)
    return;
  const names = request.dropped.join(" and ");
  notify("Report too long to prefill", "error", await copying ? \`The \${names} was copied to your clipboard. Paste it into the form on GitHub.\` : \`The \${names} was left out. Copy the log entry from Activity and paste it into the form on GitHub.\`);
};
var initActivity = () => {
  on("policy", () => {
    if (activity)
      rerender();
  });
  qs("activity-search").addEventListener("input", (event) => {
    filters.query = event.target.value;
    if (filters.command) {
      filters.command = "";
      renderControls();
    }
    clearTimeout(queryTimer);
    queryTimer = setTimeout(() => {
      renderFeed();
      syncHash();
    }, 120);
  });
  qs("activity-agent").addEventListener("change", (event) => {
    filters.agent = event.target.value;
    renderFeed();
    syncHash();
  });
  qs("activity-days").addEventListener("change", (event) => {
    filters.days = Number(event.target.value);
    loadActivity();
  });
  qs("activity-refresh").addEventListener("click", (event) => {
    runRefresh(event.currentTarget, () => Promise.all([loadOverview(), loadActivity()]));
  });
  qs("report-dialog").addEventListener("close", () => {
    if (qs("report-dialog").returnValue === "report")
      openFalsePositiveForm();
  });
  qs("activity-command-filter").addEventListener("click", (event) => {
    if (!event.target.closest("[data-clear-command]"))
      return;
    filters.command = "";
    rerender();
  });
  qs("activity-decision").addEventListener("click", (event) => {
    const button = event.target.closest("[data-activity-decision]");
    if (!button)
      return;
    filters.decision = button.dataset.activityDecision;
    filters.command = "";
    rerender();
  });
  qs("activity-feed").addEventListener("click", (event) => {
    const target = event.target;
    const showAll = target.closest("[data-activity-decision]");
    if (showAll) {
      filters.decision = showAll.dataset.activityDecision;
      rerender();
      return;
    }
    const summary = target.closest(".feed-summary");
    if (summary) {
      const expanded = summary.getAttribute("aria-expanded") !== "true";
      summary.setAttribute("aria-expanded", String(expanded));
      const detail = qs(summary.getAttribute("aria-controls") ?? "");
      const summaryCommand = summary.querySelector(".feed-command");
      detail.querySelector(".detail-command").hidden = !summaryCommand.textContent?.includes(\`
\`) && summaryCommand.scrollWidth <= summaryCommand.clientWidth;
      detail.hidden = !expanded;
      return;
    }
    const copy = target.closest("[data-log-copy]");
    const copyEntry = renderedEntries[Number(copy?.dataset.logCopy)];
    if (copy && copyEntry) {
      copyText(copy, JSON.stringify(copyEntry, null, 2));
      return;
    }
    const report = renderedEntries[Number(target.closest("[data-report-fp]")?.dataset.reportFp)];
    if (report) {
      openReportDialog(report);
      return;
    }
    const block = renderedEntries[Number(target.closest("[data-block-future]")?.dataset.blockFuture)];
    if (block)
      location.hash = \`rules?compose=\${encodeURIComponent(entryCommand(block))}\`;
  });
};

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

// src/gui/frontend/policy-summary.ts
var safetyLevels = {
  standard: [
    "Standard",
    "Blocks recognizable destructive commands and reading sensitive files. Recommended for normal coding."
  ],
  strict: [
    "Strict",
    "Also blocks commands it cannot fully parse and listing sensitive paths. Occasional false positives on advanced shell."
  ],
  paranoid: [
    "Paranoid",
    "Also blocks rm -rf inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos."
  ]
};
var capabilityNames = {
  fail_closed: ["Fail closed", "Block commands the parser cannot fully understand."],
  paranoid_rm: ["Paranoid rm -rf checks", "Block rm -rf inside the project, except temp paths."],
  paranoid_interpreters: [
    "Paranoid interpreters",
    "Block interpreter one-liners such as python -c."
  ]
};
var levelName = (level) => safetyLevels[level][0];
var tierForRule = (rule) => !rule.activationCapability ? "normal" : rule.activationCapability === "fail_closed" ? "strict" : "paranoid";
var commandRuleGroups = (rules) => {
  const alwaysOn = rules.filter((rule) => rule.catastrophic);
  const configurable = rules.filter((rule) => !rule.catastrophic);
  return [
    ...alwaysOn.length > 0 ? [{ key: "always-on", title: "Always on", rules: alwaysOn }] : [],
    ...[...new Set(configurable.map((rule) => rule.category))].map((category) => ({
      key: category,
      title: category,
      rules: configurable.filter((rule) => rule.category === category)
    }))
  ];
};
var policyFiltersFromParams = (params) => ({
  query: params.get("q") ?? "",
  changedOnly: params.get("show") === "changed"
});
var policyHash = (filters) => viewHash("policy", [
  ["q", filters.query, ""],
  ["show", filters.changedOnly ? "changed" : "all", "all"]
]);
var ruleNote = (rule, effective, capabilities) => {
  const capability = rule.activationCapability;
  if (effective.source === "rule_override")
    return "Changed by you";
  if (effective.source === "capability_override" && capability)
    return \`\${capabilityNames[capability][0]} forced \${effective.enabled ? "on" : "off"} in Advanced\`;
  if (effective.source === "environment") {
    const source = [...capability ? capabilities[capability]?.sources ?? [] : []].reverse().find((item) => item.startsWith("env "));
    return source ? \`Set by environment: \${source.slice(4)}\` : "Set by environment";
  }
  if (effective.enabled || effective.source === "master_disabled")
    return null;
  return \`Needs the \${tierForRule(rule) === "strict" ? "Strict" : "Paranoid"} preset\`;
};
var policyChanges = (saved, draft, labels) => {
  const onOff = (value) => value ? "on" : "off";
  const overrideChanges = (before, after) => [...new Set([...Object.keys(before), ...Object.keys(after)])].filter((id) => before[id] !== after[id]).map((id) => \`\${labels[id] ?? id}: \${after[id] ?? "default"}\`);
  const pathChanges = (name, before, after) => {
    const added = after.filter((path) => !before.includes(path)).length;
    const removed = before.filter((path) => !after.includes(path)).length;
    if (added === 0 && removed === 0)
      return null;
    return \`\${name}: \${[added ? \`\${added} added\` : "", removed ? \`\${removed} removed\` : ""].filter(Boolean).join(", ")}\`;
  };
  return [
    saved.safety.level === draft.safety.level ? null : \`Preset: \${levelName(saved.safety.level)} → \${levelName(draft.safety.level)}\`,
    ...Object.keys(capabilityNames).filter((key) => saved.safety.overrides[key] !== draft.safety.overrides[key]).map((key) => {
      const value = draft.safety.overrides[key];
      return \`\${capabilityNames[key][0]}: \${value === undefined ? "from preset" : value ? "forced on" : "forced off"}\`;
    }),
    saved.workflow.worktree_mode === draft.workflow.worktree_mode ? null : \`Discarding changes in linked worktrees: \${draft.workflow.worktree_mode ? "allowed" : "blocked"}\`,
    saved.destructive_command_protection.enabled === draft.destructive_command_protection.enabled ? null : \`Command protection: \${onOff(draft.destructive_command_protection.enabled)}\`,
    saved.secret_protection.enabled === draft.secret_protection.enabled ? null : \`Secret protection: \${onOff(draft.secret_protection.enabled)}\`,
    ...overrideChanges(saved.destructive_command_protection.overrides, draft.destructive_command_protection.overrides),
    ...overrideChanges(saved.secret_protection.overrides, draft.secret_protection.overrides),
    pathChanges("Allowed delete paths", saved.destructive_command_protection.allow_paths, draft.destructive_command_protection.allow_paths),
    pathChanges("Always-blocked paths", saved.secret_protection.deny_paths, draft.secret_protection.deny_paths),
    pathChanges("Secret pattern exemptions", saved.secret_protection.allow_paths, draft.secret_protection.allow_paths)
  ].filter((change) => change !== null);
};

// src/gui/frontend/shortcuts.ts
var textEntryTags = new Set(["INPUT", "TEXTAREA", "SELECT"]);
var isSearchShortcut = (event, target) => event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !textEntryTags.has(target.tagName) && !target.isContentEditable;

// src/gui/frontend/views/policy.ts
var secretCategoryNames = {
  Basename: "Sensitive file names",
  Pattern: "Sensitive file name patterns",
  "Home path": "Sensitive home folders",
  Variant: "Key file name variants",
  Extension: "Sensitive file extensions",
  "Extension pattern": "Sensitive extension patterns",
  "Coding CLI credential": "Coding agent credentials",
  "Coding CLI config": "Coding agent settings"
};
var state;
var draftPolicy;
var preview = null;
var previewRequestId = 0;
var testerRequestId = 0;
var projectDraft = null;
var markedFields = new Set;
var busy2 = false;
var showChangedOnly = false;
var groupExpanded = new Map;
var searchQuery = () => qs("policy-search").value.trim().toLowerCase();
var filtering = () => searchQuery() !== "" || showChangedOnly;
var currentFilters = () => ({
  query: qs("policy-search").value,
  changedOnly: showChangedOnly
});
var syncHash2 = () => {
  if (document.body.dataset.view === "policy")
    history.replaceState(null, "", \`#\${policyHash(currentFilters())}\`);
};
var setChangedOnly = (changedOnly) => {
  showChangedOnly = changedOnly;
  document.querySelectorAll("[data-policy-show]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-policy-show") === "changed" === changedOnly));
  });
};
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
var effectivePreviewPolicy = (policy) => {
  const baseline = projectDraft?.baseline;
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
var requestPolicyPreview = (policy) => requestJson("/api/policy/preview", { method: "POST", body: JSON.stringify(policy) });
var projectFieldChip = (field) => {
  if (!projectDraft)
    return "";
  if (!markedFields.has(field))
    return '<span class="project-chip inherited">Inherited</span>';
  return \`<button type="button" class="project-chip" data-unmark-field="\${escapeHtml(field)}" title="Set by this project. Click to stop setting it." aria-label="Set by project: \${escapeHtml(field)}. Activate to inherit again.">Project</button>\`;
};
var projectChipSlots = [
  ["destructive-enabled-chip", "destructive_command_protection.enabled"],
  ["secret-enabled-chip", "secret_protection.enabled"],
  ["allow-paths-chip", "destructive_command_protection.allow_paths"],
  ["deny-paths-chip", "secret_protection.deny_paths"],
  ["secret-allow-paths-chip", "secret_protection.allow_paths"],
  ["safety-level-chip", "safety.level"]
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
  syncProjectChips();
};
var unmarkProjectField = (field) => {
  if (!projectDraft || !markedFields.has(field))
    return;
  markedFields.delete(field);
  draftPolicy = overlayProjectProposal(projectDraft.baseline, collectProjectProposal(markedFields, draftPolicy));
  renderPolicySections();
  refreshPolicyPreview();
};
var markProjectOverride = (section, ruleId) => {
  if (projectDraft)
    markedFields.add(\`\${section}.overrides.\${ruleId}\`);
};
var ruleLabels = () => Object.fromEntries([...state?.destructiveCommandRules ?? [], ...state?.secretPatterns ?? []].map((rule) => [
  rule.id,
  rule.label
]));
var setBanner = () => {
  const saved = state;
  const notices = [
    saved && !saved.policy.destructive_command_protection.enabled ? "Command protection is off: built-in destructive command rules are not enforced. Catastrophic and custom rules still apply." : null,
    saved && !saved.policy.secret_protection.enabled ? "Secret protection is off: sensitive files and deny paths are not blocked." : null,
    saved?.configState && saved.configState.state !== "ready" ? \`A fallback configuration is being enforced: \${saved.configState.reason}\` : null
  ].filter((notice) => notice !== null);
  qs("protection-banner").innerHTML = notices.map((notice) => \`<p>\${escapeHtml(notice)}</p>\`).concat(notices.length > 0 && !location.hash.startsWith("#policy") ? ['<a href="#policy">Open Protections</a>'] : []).join("");
  qs("protection-banner").hidden = notices.length === 0;
};
var savedComparisonPolicy = () => projectDraft ? overlayProjectProposal(projectDraft.baseline, JSON.parse(projectDraft.snapshot)) : state?.policy;
var renderSavebar = () => {
  qs("policy-savebar").hidden = !shared.dirty;
  qs("save").textContent = projectDraft ? "Review and apply" : "Save";
  if (!shared.dirty || !state)
    return;
  const changes = policyChanges(savedComparisonPolicy(), draftPolicy, ruleLabels());
  qs("savebar-title").textContent = changes.length === 0 ? "Unsaved changes" : plural(changes.length, "unsaved change");
  qs("savebar-summary").textContent = changes.slice(0, 3).join("; ") + (changes.length > 3 ? \`; and \${changes.length - 3} more\` : "");
};
var syncRawFromForm = () => {
  if (state?.errors.length)
    return;
  qs("raw").value = \`\${JSON.stringify(projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy(), null, 2)}
\`;
  qs("raw-source").textContent = projectDraft ? \`Only the fields set by this project. Written to \${projectDraft.path}.\` : "Read-only. Mirrors the settings above.";
};
var updateDirtyStatus = () => {
  if (!state || state.errors.length)
    return;
  const wasDirty = shared.dirty;
  if (projectDraft) {
    shared.dirty = JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== projectDraft.snapshot;
  }
  if (!projectDraft) {
    const draftJson = JSON.stringify(collectFormPolicy());
    shared.dirty = draftJson !== JSON.stringify(state.policy);
    if (shared.dirty)
      sessionStorage.setItem("cc-safety-net-draft", draftJson);
    if (!shared.dirty)
      sessionStorage.removeItem("cc-safety-net-draft");
  }
  renderSavebar();
  updateActions();
  if (wasDirty !== shared.dirty)
    emit("dirty");
};
var afterEdit = (refreshPreview = true) => {
  syncRawFromForm();
  updateDirtyStatus();
  if (refreshPreview)
    refreshPolicyPreview();
};
var updateActions = () => {
  const hasErrors = (state?.errors.length ?? 0) > 0;
  qs("save").disabled = busy2 || !state || hasErrors;
  qs("repair").disabled = busy2 || !hasErrors;
  qs("reset").disabled = busy2;
  qs("retention-days").disabled = busy2;
};
var runExclusive = async (pendingText, fn) => {
  if (busy2)
    return;
  busy2 = true;
  updateActions();
  notify(pendingText);
  await fn().finally(() => {
    busy2 = false;
    updateActions();
  });
};
var groupRules = (rules) => [...new Set(rules.map((rule) => rule.category))].map((category) => ({
  category,
  rules: rules.filter((rule) => rule.category === category)
}));
var matches = (query, fields) => fields.join(" ").toLowerCase().includes(query);
var secretRuleIsActive = (rule, overrides) => overrides[rule.id] ? overrides[rule.id] === "on" : !rule.defaultOff;
var destructiveChanged = (rule) => draftPolicy.destructive_command_protection.overrides[rule.id] !== undefined || ["rule_override", "capability_override", "environment"].includes(preview?.rules[rule.id]?.source ?? "");
var secretChanged = (rule) => draftPolicy.secret_protection.overrides[rule.id] !== undefined;
var categoryHtml = (options) => {
  const expanded = groupExpanded.get(options.key) ?? filtering();
  const contentId = \`group-\${options.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`;
  return \`<section class="rule-group">
    <div class="rule-group-head">
      <button type="button" class="group-toggle" data-group-toggle="\${escapeHtml(options.key)}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
        <span class="chevron" aria-hidden="true"></span>
        <span class="group-title">\${escapeHtml(options.title)}</span>
        <span class="group-counts">\${options.counts}</span>
      </button>
      \${options.bulkSwitch}
    </div>
    <ul class="rule-list" id="\${contentId}" \${expanded ? "" : "hidden"}>\${options.rowsHtml}</ul>
  </section>\`;
};
var ruleRowHtml = (row) => \`<li class="rule-row\${row.disabled ? " row-disabled" : ""}" data-rule-row="\${escapeHtml(row.id)}">
    \${row.control}
    <div class="rule-body">
      <div class="rule-line">\${row.heading}\${row.note ? \`<span class="rule-note \${row.noteTone}">\${escapeHtml(row.note)}</span>\` : ""}\${row.actions}</div>
      \${row.description ? \`<p class="rule-description">\${escapeHtml(row.description)}</p>\` : ""}
    </div>
    \${row.info}
  </li>\`;
var offCount = (off) => off > 0 ? \` · <span class="off-count">\${off} off</span>\` : "";
var renderDestructiveCommands = () => {
  if (!state || !preview)
    return;
  const effectiveState = preview;
  const query = searchQuery();
  const disabled = !draftPolicy.destructive_command_protection.enabled;
  const catastrophicCount = state.destructiveCommandRules.filter((rule) => rule.catastrophic).length;
  qs("destructive-command-summary").textContent = disabled ? "Off. Built-in rules are not enforced; catastrophic and custom rules still apply. Your rule settings are kept." : \`\${preview.counts.enabled} on · \${preview.counts.disabled} off · \${catastrophicCount} always on\`;
  qs("destructive-panel").classList.toggle("is-off", disabled);
  const visible = state.destructiveCommandRules.filter((rule) => matches(query, [rule.category, rule.label, rule.id, rule.description]) && (!showChangedOnly || destructiveChanged(rule)));
  const rowHtml = (rule) => {
    const info = \`<button type="button" class="info-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`About \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">\${icons.info}</button>\`;
    const heading = \`<span class="rule-name">\${escapeHtml(rule.label)}</span><code class="rule-id">\${escapeHtml(rule.id)}</code>\${tierForRule(rule) === "normal" ? "" : \`<span class="tier-badge \${tierForRule(rule)}">\${tierForRule(rule) === "strict" ? "Strict" : "Paranoid"}</span>\`}\`;
    if (rule.catastrophic)
      return ruleRowHtml({
        id: rule.id,
        control: \`<span class="lock" title="Always on">\${icons.lock}</span>\`,
        heading,
        note: null,
        noteTone: "",
        actions: "",
        description: rule.description,
        info,
        disabled: false
      });
    const effective = effectiveState.rules[rule.id];
    if (!effective)
      return "";
    const override = draftPolicy.destructive_command_protection.overrides[rule.id] !== undefined;
    return ruleRowHtml({
      id: rule.id,
      control: \`<input type="checkbox" class="switch" data-destructive-command-active="\${escapeHtml(rule.id)}" \${effective.enabled ? "checked" : ""} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(rule.label)}">\`,
      heading,
      note: ruleNote(rule, effective, effectiveState.capabilities),
      noteTone: effective.source === "rule_override" ? "changed" : effective.source === "capability_override" || effective.source === "environment" ? "" : tierForRule(rule),
      actions: \`\${override ? \`<button type="button" class="quiet small" data-use-inherited="\${escapeHtml(rule.id)}">Reset</button>\` : ""}\${projectFieldChip(\`destructive_command_protection.overrides.\${rule.id}\`)}\`,
      description: rule.description,
      info,
      disabled
    });
  };
  qs("destructive-command-rules").innerHTML = visible.length === 0 ? '<p class="empty">No command protections match.</p>' : commandRuleGroups(visible).map((group) => {
    const all = commandRuleGroups(state?.destructiveCommandRules ?? []).find((entry) => entry.key === group.key)?.rules ?? [];
    const off = all.filter((rule) => effectiveState.rules[rule.id]?.enabled === false).length;
    return categoryHtml({
      key: \`destructive:\${group.key}\`,
      title: group.title,
      counts: group.key === "always-on" ? \`\${plural(all.length, "rule")} · can't be turned off\` : \`\${plural(all.length, "rule")}\${offCount(off)}\`,
      bulkSwitch: "",
      rowsHtml: group.rules.map(rowHtml).join("")
    });
  }).join("");
};
var renderSecretPatterns = () => {
  if (!state)
    return;
  const loaded = state;
  const query = searchQuery();
  const overrides = draftPolicy.secret_protection.overrides;
  const disabled = !draftPolicy.secret_protection.enabled;
  const offTotal = loaded.secretPatterns.filter((rule) => !secretRuleIsActive(rule, overrides)).length;
  qs("secret-summary").textContent = disabled ? "Off. Sensitive files and deny paths are not blocked. Your rule settings and paths are kept." : \`\${loaded.secretPatterns.length - offTotal} on · \${offTotal} off\`;
  qs("secret-panel").classList.toggle("is-off", disabled);
  const visible = loaded.secretPatterns.filter((rule) => matches(query, [
    rule.category,
    secretCategoryNames[rule.category],
    rule.label,
    rule.id,
    rule.description,
    ...rule.paths ?? []
  ]) && (!showChangedOnly || secretChanged(rule)));
  const rowHtml = (rule) => {
    const active = secretRuleIsActive(rule, overrides);
    const override = overrides[rule.id] !== undefined;
    return ruleRowHtml({
      id: rule.id,
      control: \`<input type="checkbox" class="switch" data-secret-active="\${escapeHtml(rule.id)}" \${active ? "checked" : ""} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(rule.label)}">\`,
      heading: \`<span class="rule-name">\${escapeHtml(rule.label)}</span>\`,
      note: override ? "Changed by you" : rule.defaultOff ? "Off by default" : null,
      noteTone: override ? "changed" : "",
      actions: \`\${override ? \`<button type="button" class="quiet small" data-secret-reset="\${escapeHtml(rule.id)}">Reset</button>\` : ""}\${projectFieldChip(\`secret_protection.overrides.\${rule.id}\`)}\`,
      description: rule.description ?? (rule.paths ? plural(rule.paths.length, "path") : ""),
      info: rule.paths ? \`<button type="button" class="info-button" data-secret-paths="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Protected paths for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">\${icons.info}</button>\` : '<span class="info-spacer"></span>',
      disabled
    });
  };
  qs("secret-patterns").innerHTML = visible.length === 0 ? '<p class="empty">No secret protections match.</p>' : groupRules(visible).map((group) => {
    const all = loaded.secretPatterns.filter((rule) => rule.category === group.category);
    const on = all.filter((rule) => secretRuleIsActive(rule, overrides)).length;
    const title = secretCategoryNames[group.category] ?? group.category;
    return categoryHtml({
      key: \`secret:\${group.category}\`,
      title,
      counts: \`\${plural(all.length, "rule")}\${offCount(on === 0 ? 0 : all.length - on)}\`,
      bulkSwitch: \`<input type="checkbox" class="switch" data-secret-group-active="\${escapeHtml(group.category)}" \${on > 0 ? "checked" : ""} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`Turn all \${title} on or off\`)}" title="Turn all on or off">\`,
      rowsHtml: group.rules.map(rowHtml).join("")
    });
  }).join("");
};
var renderChangedCount = () => {
  if (!state)
    return;
  const changed = state.destructiveCommandRules.filter((rule) => !rule.catastrophic && destructiveChanged(rule)).length + state.secretPatterns.filter(secretChanged).length;
  qs("changed-count").textContent = changed > 0 ? String(changed) : "";
};
var renderRules = () => {
  renderDestructiveCommands();
  renderSecretPatterns();
  renderChangedCount();
};
var renderSafety = () => {
  const environmentSources = preview ? [
    ...new Set(Object.values(preview.capabilities).filter((capability) => capability.source === "environment").flatMap((capability) => capability.sources.filter((source) => source.startsWith("env "))))
  ] : [];
  qs("environment-overrides").hidden = environmentSources.length === 0;
  qs("environment-overrides").textContent = environmentSources.length ? \`An environment variable raises protection beyond these settings: \${environmentSources.map((source) => source.slice(4)).join(", ")}\` : "";
  qs("safety-level").innerHTML = Object.entries(safetyLevels).map(([level, meta]) => \`<label class="preset-card preset-\${level}"><input type="radio" name="safety-level" value="\${level}" \${draftPolicy.safety.level === level ? "checked" : ""}><span class="preset-name">\${meta[0]}</span><span class="preset-description">\${meta[1]}</span></label>\`).join("");
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs("safety-overrides").innerHTML = Object.entries(capabilityNames).map(([key, meta]) => {
    const value = draftPolicy.safety.overrides[key];
    return \`<div class="setting-row"><label class="setting-text" for="override-\${key}"><strong>\${meta[0]}</strong><small>\${meta[1]}</small></label>\${projectFieldChip(\`safety.overrides.\${key}\`)}<select id="override-\${key}" data-safety-override="\${key}">
      <option value="inherit" \${value === undefined ? "selected" : ""}>From preset (\${inherited[key] ? "on" : "off"})</option>
      <option value="true" \${value === true ? "selected" : ""}>Always on</option>
      <option value="false" \${value === false ? "selected" : ""}>Always off</option>
    </select></div>\`;
  }).join("");
  qs("workflow").innerHTML = \`<div class="setting-row"><label class="setting-text" for="workflow-worktree"><strong>Allow discarding local changes in linked git worktrees</strong><small>Only relaxes the discard checks inside linked worktrees.</small></label>\${projectFieldChip("workflow.worktree_mode")}<input type="checkbox" class="switch" id="workflow-worktree" data-workflow-worktree \${draftPolicy.workflow.worktree_mode ? "checked" : ""}></div>\`;
  const customized = (preview?.counts.effectiveCustomizations ?? 0) > 0 || Object.entries(draftPolicy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key]);
  qs("safety-preset-status").textContent = customized ? \`\${levelName(draftPolicy.safety.level)}, customized\` : "";
};
var showRulePopover = (button, options) => {
  const popover = qs("rule-example-popover");
  qs("rule-example-label").textContent = options.label;
  qs("rule-example-title").textContent = options.title;
  qs("rule-example-description").textContent = options.description;
  qs("rule-example-description").hidden = options.description === "";
  qs("rule-example-command").textContent = options.body;
  if (!popover.matches(":popover-open"))
    popover.showPopover();
  const buttonRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const below = buttonRect.bottom + 8;
  popover.style.top = \`\${below + popoverRect.height <= window.innerHeight - 12 ? below : Math.max(12, buttonRect.top - 8 - popoverRect.height)}px\`;
  popover.style.left = \`\${Math.min(window.innerWidth - popoverRect.width - 12, Math.max(12, buttonRect.right - popoverRect.width))}px\`;
};
var validatePathAdditions = async (patch) => {
  const candidate = collectFormPolicy();
  patch(candidate);
  const result = await requestPolicyPreview(candidate);
  return result.ok && result.data?.preview ? null : errorText(result);
};
var createPathList = (prefix, config) => {
  const setHint = (text) => {
    qs(\`\${prefix}-hint\`).textContent = text;
    qs(\`\${prefix}-hint\`).hidden = !text;
  };
  const render = () => {
    const paths = config.getPaths();
    const disabled = config.isDisabled();
    qs(\`\${prefix}-count\`).textContent = paths.length > 0 ? String(paths.length) : "";
    qs(\`\${prefix}-input\`).disabled = disabled;
    qs(\`\${prefix}-add-button\`).disabled = disabled;
    qs(\`\${prefix}-list\`).innerHTML = paths.map((path, index) => \`<li class="path-item\${disabled ? " row-disabled" : ""}">
          <code>\${escapeHtml(path)}</code>
          <button type="button" class="quiet icon-only" data-path-list="\${prefix}" data-path-remove="\${index}" \${disabled ? "disabled" : ""} aria-label="Remove \${escapeHtml(path)}">\${icons.remove}</button>
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
    const entries = [
      ...new Set(value.split(\`
\`).map((line) => line.trim()).filter(Boolean))
    ];
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
      const error = await validatePathAdditions((candidate) => config.patch(candidate, [...config.getPaths(), ...additions])).finally(() => {
        adding = false;
      });
      if (projectDraft !== scope)
        return;
      if (error) {
        setHint(\`Not added: \${additions.join(", ")}. \${error}\`);
        if (claimed) {
          markedFields.delete(config.field);
          config.setPaths(previousPaths);
          syncProjectChips();
        }
        return;
      }
    }
    const current = config.getPaths();
    const duplicates = entries.filter((entry) => current.includes(entry));
    config.setPaths([...current, ...additions.filter((entry) => !current.includes(entry))]);
    if (qs(\`\${prefix}-input\`).value === submitted)
      qs(\`\${prefix}-input\`).value = "";
    setHint(duplicates.length ? \`Already listed: \${duplicates.join(", ")}\` : "");
    render();
    afterEdit(false);
    qs(\`\${prefix}-input\`).focus();
  };
  const remove = (index) => {
    claimForProject();
    config.setPaths(config.getPaths().filter((_, position) => position !== index));
    setHint("");
    render();
    afterEdit(false);
  };
  return { render, add, remove };
};
var pathLists = {
  "allow-paths": createPathList("allow-paths", {
    field: "destructive_command_protection.allow_paths",
    getPaths: () => draftPolicy.destructive_command_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.destructive_command_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.destructive_command_protection.enabled,
    patch: (candidate, paths) => {
      candidate.destructive_command_protection = {
        ...candidate.destructive_command_protection,
        allow_paths: paths
      };
    }
  }),
  "deny-paths": createPathList("deny-paths", {
    field: "secret_protection.deny_paths",
    getPaths: () => draftPolicy.secret_protection.deny_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.deny_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    patch: (candidate, paths) => {
      candidate.secret_protection = { ...candidate.secret_protection, deny_paths: paths };
    }
  }),
  "secret-allow-paths": createPathList("secret-allow-paths", {
    field: "secret_protection.allow_paths",
    getPaths: () => draftPolicy.secret_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    patch: (candidate, paths) => {
      candidate.secret_protection = { ...candidate.secret_protection, allow_paths: paths };
    }
  })
};
var pathListFor = (name) => name === "deny-paths" || name === "allow-paths" || name === "secret-allow-paths" ? pathLists[name] : null;
var renderPathLists = () => {
  Object.values(pathLists).forEach((list) => {
    list.render();
  });
};
var syncMasterSwitches = () => {
  qs("destructive-enabled").checked = draftPolicy.destructive_command_protection.enabled;
  qs("secret-enabled").checked = draftPolicy.secret_protection.enabled;
};
function renderPolicySections() {
  syncMasterSwitches();
  renderSafety();
  renderRules();
  renderPathLists();
  syncProjectChips();
  syncRawFromForm();
  updateDirtyStatus();
}
var refreshPolicyPreview = async () => {
  const requestId = ++previewRequestId;
  const result = await requestPolicyPreview(effectivePreviewPolicy(collectFormPolicy()));
  if (requestId !== previewRequestId)
    return;
  if (!result.ok || !result.data?.preview) {
    notify("Preview failed", "error", errorText(result));
    return;
  }
  preview = result.data.preview;
  renderSafety();
  renderRules();
  runCommandTest();
};
var runCommandTest = async () => {
  const command = qs("tester-input").value.trim();
  if (!command) {
    qs("tester-result").hidden = true;
    return;
  }
  const requestId = ++testerRequestId;
  const result = await requestJson("/api/policy/explain", {
    method: "POST",
    body: JSON.stringify({ command, policy: effectivePreviewPolicy(collectFormPolicy()) })
  });
  if (requestId !== testerRequestId)
    return;
  const el = qs("tester-result");
  el.hidden = false;
  if (!result.ok) {
    el.className = "notice error";
    el.textContent = \`Could not test this command: \${errorText(result)}\`;
    return;
  }
  if (result.data.result === "allowed") {
    el.className = "notice ok";
    el.innerHTML = \`<strong>Allowed.</strong> No rule blocks this command. <a href="#rules?compose=\${encodeURIComponent(command)}">Create a rule to block it</a>\`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleHtml = !ruleId ? "" : result.data.customRule ? \` by <a class="rule-id" href="#rules?focus=\${encodeURIComponent(ruleId)}">\${escapeHtml(ruleId)}</a>\` : \` by <a class="rule-id" href="#policy?q=\${encodeURIComponent(ruleId)}">\${escapeHtml(ruleId)}</a>\`;
  el.className = "notice error";
  el.innerHTML = \`<strong>Blocked</strong>\${ruleHtml}. \${escapeHtml(result.data.reason || "")}\${result.data.segment && result.data.segment !== command ? \`<div class="tester-segment">Blocked part: <code>\${escapeHtml(result.data.segment)}</code></div>\` : ""}\`;
};
var render2 = () => {
  if (!state)
    return;
  const loaded = state;
  draftPolicy = clonePolicy(loaded.policy);
  preview = loaded.preview;
  shared.dirty = false;
  qs("policy-savebar").hidden = true;
  showPath("policy-path", loaded.path, loaded.exists ? "" : " (not created yet)");
  const projectPolicy = loaded.projectPolicy;
  qs("project-policy-row").hidden = !projectPolicy;
  showPath("project-policy-path", projectPolicy?.path ?? "");
  qs("project-policy-notice").hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs("project-policy-notice").textContent = projectPolicy ? ["The project policy changes these settings:", ...projectPolicy.weakenings].join(\`
\`) : "";
  qs("app-version").textContent = loaded.version;
  qs("raw").value = loaded.errors.length ? loaded.raw : \`\${JSON.stringify(draftPolicy, null, 2)}
\`;
  qs("recovery").hidden = loaded.errors.length === 0;
  qs("policy-errors").textContent = loaded.errors.join(\`
\`);
  syncMasterSwitches();
  renderSafety();
  renderRules();
  renderPathLists();
  syncProjectChips();
  syncRawFromForm();
  if (loaded.errors.length)
    qs("raw-source").textContent = "The file as it is on disk.";
  updateActions();
  setBanner();
  emit("dirty");
  emit("policy");
  if (loaded.errors.length && !location.hash.startsWith("#policy"))
    location.hash = "policy";
};
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
  notify("Restored your unsaved changes", "ok");
};
var loadPolicy = async () => {
  const result = await requestJson("/api/policy");
  if (!result.ok || !result.data) {
    notify("Could not load your policy", "error", errorText(result));
    return false;
  }
  state = result.data;
  shared.policy = state;
  render2();
  restoreDraft();
  if (state.errors.length)
    notify("Your policy file needs repair", "error");
  return true;
};
var writePolicy = async (path, body, failureTitle) => {
  const result = await requestJson(path, { method: "POST", body });
  if (isWriteSuccess(result))
    return result;
  notify(failureTitle, "error", errorText(result));
  return null;
};
var reloadAfterWrite = async () => {
  sessionStorage.removeItem("cc-safety-net-draft");
  return loadPolicy();
};
var renderProjectDraftBar = () => {
  shared.drafting = projectDraft !== null;
  qs("scope-user").setAttribute("aria-pressed", String(projectDraft === null));
  qs("project-draft-enter").setAttribute("aria-pressed", String(projectDraft !== null));
  qs("project-draft-bar").hidden = projectDraft === null;
  qs("save").textContent = projectDraft ? "Review and apply" : "Save";
  if (!projectDraft)
    return;
  qs("project-draft-path").textContent = projectDraft.path;
  qs("project-draft-change").hidden = !projectDraft.canPickDirectory;
};
var setProjectDraftDiagnostics = (messages) => {
  qs("project-draft-diagnostics").textContent = messages.join(\`
\`);
  qs("project-draft-diagnostics").hidden = messages.length === 0;
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
    notify("Project policy unavailable", "error", errorText(result));
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await loadPolicy();
    notify("Repair your policy first", "error", [
      "Your own policy file must be repaired before you can edit a project policy.",
      ...Array.isArray(result.data.userPolicyDiagnostics) ? result.data.userPolicyDiagnostics : []
    ].join(\`
\`));
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
  notify(okStatus, "ok");
  return true;
};
var enterProjectDraft = async () => {
  if (projectDraft)
    return;
  if (!state) {
    notify("Your policy has not loaded yet", "error", "Reload the page.");
    return;
  }
  if (state.errors.length) {
    notify("Repair your policy first", "error");
    return;
  }
  if (shared.dirty) {
    if (!await confirmDialog({
      title: "Discard unsaved changes?",
      body: "A project policy starts from your saved policy. Save your changes first, or discard them here.",
      confirmLabel: "Discard changes",
      confirmClass: ""
    }))
      return;
    sessionStorage.removeItem("cc-safety-net-draft");
    if (!await loadPolicy())
      return;
  }
  await ingestProjectState("Editing the project policy");
};
var confirmDiscardProjectDraft = async (body) => !shared.dirty || await confirmDialog({
  title: "Discard this project draft?",
  body,
  confirmLabel: "Discard draft",
  confirmClass: ""
});
var changeProjectDirectory = async () => {
  if (!await confirmDiscardProjectDraft("Switching folders discards this draft."))
    return;
  const result = await requestJson("/api/policy/project/choose-directory", { method: "POST" });
  if (!result.ok) {
    notify("Could not open the folder picker", "error", errorText(result));
    return;
  }
  if (result.data.error) {
    notify(result.data.error, "error");
    return;
  }
  if (result.data.cancelled)
    return;
  await ingestProjectState("Editing the project policy");
};
var leaveProjectDraft = async () => {
  if (!projectDraft)
    return;
  if (!await confirmDiscardProjectDraft("Your project changes have not been written anywhere yet."))
    return;
  exitProjectDraft();
  if (await loadPolicy())
    notify("Back to your own policy", "ok");
};
var discardProjectDraft = async (draft) => {
  if (!await confirmDialog({
    title: "Discard changes to this draft?",
    body: "The draft goes back to the settings this project already has.",
    confirmLabel: "Discard changes",
    confirmClass: ""
  }))
    return;
  const snapshot = JSON.parse(draft.snapshot);
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  refreshPolicyPreview();
  notify("Changes discarded", "ok");
};
var handleStaleProjectDraft = async () => {
  if (!await ingestProjectState("Project draft reloaded"))
    return;
  notify("The project folder changed", "error", "The draft was reloaded for the new folder. Review it again before applying.");
};
var projectDiffHtml = (data) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...data.existingFileDiagnostics?.length ? ["The existing project policy file is invalid and will be replaced."] : [],
    ...data.weakenings ?? []
  ];
  return (rows.length === 0 ? '<p class="empty">No change to the effective policy.</p>' : \`<table class="diff-table"><thead><tr><th>Setting</th><th>Now</th><th>After</th></tr></thead><tbody>\${rows.map((row) => \`<tr><td><code>\${escapeHtml(row.field)}</code></td><td class="diff-before">\${escapeHtml(row.before ?? "(unset)")}</td><td class="diff-after">\${escapeHtml(row.after ?? "(unset)")}</td></tr>\`).join("")}</tbody></table>\`) + warnings.map((text) => \`<p class="notice warn">\${escapeHtml(text)}</p>\`).join("");
};
var reviewProjectDraft = async (draft) => {
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
    notify("Review failed", "error", errorText(diff));
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    notify("Review again", "error", "The draft changed while the review was loading.");
    return;
  }
  if (!await confirmDialog({
    title: "Apply this project policy?",
    body: "Everyone who works in this project gets these settings on top of their own policy.",
    detail: draft.path,
    rowsHtml: projectDiffHtml(diff.data),
    confirmLabel: "Apply project policy",
    confirmClass: "primary"
  }))
    return;
  await runExclusive("Applying…", async () => {
    const applied = await requestJson("/api/policy/project/apply", { method: "POST", body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      notify("Apply failed", "error", errorText(applied));
      return;
    }
    exitProjectDraft();
    if (await loadPolicy())
      notify("Project policy applied", "ok", applied.data.path);
  });
};
var save = () => {
  if (!state) {
    notify("Your policy has not loaded yet", "error", "Reload the page.");
    return;
  }
  if (state.errors.length) {
    notify("Repair your policy before saving", "error");
    return;
  }
  if (projectDraft) {
    reviewProjectDraft(projectDraft);
    return;
  }
  if (!shared.dirty)
    return;
  const policy = collectFormPolicy();
  runExclusive("Saving…", async () => {
    const result = await writePolicy("/api/policy", JSON.stringify(policy), "Save failed");
    if (result && await reloadAfterWrite())
      notify("Policy saved", "ok", result.data.path);
  });
};
var discard = async () => {
  if (projectDraft) {
    await discardProjectDraft(projectDraft);
    return;
  }
  if (!await confirmDialog({
    title: "Discard unsaved changes?",
    body: "Every change since your last save will be undone.",
    confirmLabel: "Discard changes",
    confirmClass: ""
  }))
    return;
  await runExclusive("Discarding…", async () => {
    sessionStorage.removeItem("cc-safety-net-draft");
    if (await loadPolicy())
      notify("Changes discarded", "ok");
  });
};
var repair = async () => {
  if (!state?.errors.length)
    return;
  if (!await confirmDialog({
    title: "Repair your policy file?",
    body: "Valid settings are kept and invalid ones are dropped. If the JSON cannot be read at all, defaults are restored.",
    detail: state.path,
    confirmLabel: "Repair",
    confirmClass: "primary"
  }))
    return;
  await runExclusive("Repairing…", async () => {
    const result = await writePolicy("/api/repair", "{}", "Repair failed");
    if (result && await reloadAfterWrite())
      notify("Policy repaired", "ok", result.data.path);
  });
};
var resetOverrides = async (section) => {
  if (Object.keys(draftPolicy[section].overrides).length === 0) {
    notify("Nothing to reset: every rule already uses its default", "ok");
    return;
  }
  if (!await confirmDialog({
    title: "Reset every rule to its default?",
    body: \`All \${section === "secret_protection" ? "secret" : "command"} rules go back to the setting their preset gives them. You can still discard before saving.\`,
    confirmLabel: "Reset rules"
  }))
    return;
  markedFields = new Set([...markedFields].filter((field) => !field.startsWith(\`\${section}.overrides.\`)));
  if (projectDraft) {
    draftPolicy = overlayProjectProposal(projectDraft.baseline, collectProjectProposal(markedFields, draftPolicy));
    renderPolicySections();
    refreshPolicyPreview();
    return;
  }
  draftPolicy[section].overrides = {};
  renderRules();
  afterEdit();
};
var setDestructiveOverride = (ruleId, active) => {
  if (!projectDraft && active === preview?.rules[ruleId]?.inheritedEnabled) {
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    return;
  }
  draftPolicy.destructive_command_protection.overrides[ruleId] = active ? "on" : "off";
  markProjectOverride("destructive_command_protection", ruleId);
};
var setSecretOverride = (rule, active) => {
  if (!projectDraft && active === !rule.defaultOff) {
    delete draftPolicy.secret_protection.overrides[rule.id];
    return;
  }
  draftPolicy.secret_protection.overrides[rule.id] = active ? "on" : "off";
  markProjectOverride("secret_protection", rule.id);
};
var toggleProtection = async (input) => {
  const secret = input.id === "secret-enabled";
  if (!input.checked && !await confirmDialog({
    title: secret ? "Turn off secret protection?" : "Turn off command protection?",
    body: secret ? "Sensitive files, coding agent credentials, and deny paths stop being blocked until you turn this back on." : "Built-in destructive git, filesystem, and execution rules stop blocking commands until you turn this back on.",
    detail: secret ? undefined : "Catastrophic and custom rules still apply.",
    confirmLabel: "Turn off"
  })) {
    input.checked = true;
    return;
  }
  if (secret)
    draftPolicy.secret_protection.enabled = input.checked;
  if (!secret)
    draftPolicy.destructive_command_protection.enabled = input.checked;
  markProjectField(secret ? "secret_protection.enabled" : "destructive_command_protection.enabled");
  renderRules();
  renderPathLists();
  afterEdit(!secret);
};
var handleChange = (control) => {
  if (control.name === "safety-level") {
    draftPolicy.safety.level = control.value;
    markProjectField("safety.level");
    renderSafety();
    afterEdit();
    return;
  }
  if (control.dataset.safetyOverride) {
    const capability = control.dataset.safetyOverride;
    if (control.value === "inherit" && !projectDraft)
      delete draftPolicy.safety.overrides[capability];
    if (control.value !== "inherit")
      draftPolicy.safety.overrides[capability] = control.value === "true";
    if (control.value === "inherit")
      unmarkProjectField(\`safety.overrides.\${capability}\`);
    if (control.value !== "inherit")
      markProjectField(\`safety.overrides.\${capability}\`);
    afterEdit();
    return;
  }
  if (!(control instanceof HTMLInputElement))
    return;
  if ("workflowWorktree" in control.dataset) {
    draftPolicy.workflow.worktree_mode = control.checked;
    markProjectField("workflow.worktree_mode");
    afterEdit(false);
    return;
  }
  if (control.id === "destructive-enabled" || control.id === "secret-enabled") {
    toggleProtection(control);
    return;
  }
  const destructiveId = control.dataset.destructiveCommandActive;
  if (destructiveId) {
    setDestructiveOverride(destructiveId, control.checked);
    afterEdit();
    return;
  }
  const secretGroup = control.dataset.secretGroupActive;
  if (secretGroup) {
    state?.secretPatterns.filter((rule) => rule.category === secretGroup).forEach((rule) => {
      setSecretOverride(rule, control.checked);
    });
    renderRules();
    afterEdit(false);
    return;
  }
  const secretRule = state?.secretPatterns.find((rule) => rule.id === control.dataset.secretActive);
  if (secretRule) {
    setSecretOverride(secretRule, control.checked);
    renderRules();
    afterEdit(false);
  }
};
var handleClick = (target) => {
  const unmark = target.closest("[data-unmark-field]");
  if (unmark) {
    unmarkProjectField(unmark.dataset.unmarkField ?? "");
    return;
  }
  const groupToggle = target.closest("[data-group-toggle]");
  if (groupToggle) {
    groupExpanded.set(groupToggle.dataset.groupToggle ?? "", groupToggle.getAttribute("aria-expanded") !== "true");
    renderRules();
    return;
  }
  const show = target.closest("[data-policy-show]");
  if (show) {
    setChangedOnly(show.dataset.policyShow === "changed");
    groupExpanded.clear();
    renderRules();
    syncHash2();
    return;
  }
  const example = state?.destructiveCommandRules.find((rule) => rule.id === target.closest("[data-rule-example]")?.dataset.ruleExample);
  if (example) {
    showRulePopover(target.closest("[data-rule-example]"), {
      label: example.catastrophic ? "Always on" : example.category,
      title: example.label,
      description: example.description,
      body: example.example
    });
    return;
  }
  const secretPaths = state?.secretPatterns.find((rule) => rule.id === target.closest("[data-secret-paths]")?.dataset.secretPaths);
  if (secretPaths?.paths) {
    showRulePopover(target.closest("[data-secret-paths]"), {
      label: "Protected paths",
      title: secretPaths.label,
      description: "",
      body: secretPaths.paths.join(\`
\`)
    });
    return;
  }
  const inherited = target.closest("[data-use-inherited]");
  if (inherited) {
    const ruleId = inherited.dataset.useInherited ?? "";
    if (projectDraft) {
      unmarkProjectField(\`destructive_command_protection.overrides.\${ruleId}\`);
      return;
    }
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    afterEdit();
    return;
  }
  const secretReset = target.closest("[data-secret-reset]");
  if (secretReset) {
    const ruleId = secretReset.dataset.secretReset ?? "";
    if (projectDraft) {
      unmarkProjectField(\`secret_protection.overrides.\${ruleId}\`);
      return;
    }
    delete draftPolicy.secret_protection.overrides[ruleId];
    renderRules();
    afterEdit(false);
    return;
  }
  const addButton = target.closest("[data-path-add]");
  if (addButton) {
    pathListFor(addButton.dataset.pathAdd)?.add(qs(\`\${addButton.dataset.pathAdd}-input\`).value);
    return;
  }
  const removeButton = target.closest("[data-path-remove]");
  if (removeButton)
    pathListFor(removeButton.dataset.pathList)?.remove(Number(removeButton.dataset.pathRemove));
};
var showPolicy = (params) => {
  const next = policyFiltersFromParams(params);
  if (policyHash(next) !== policyHash(currentFilters())) {
    qs("policy-search").value = next.query;
    setChangedOnly(next.changedOnly);
    groupExpanded.clear();
    renderRules();
  }
  if (!next.query)
    return;
  document.querySelector(\`[data-rule-row="\${CSS.escape(next.query)}"]\`)?.scrollIntoView({ block: "center" });
};
var setRawCopyLabel = () => {
  qs("raw-copy").innerHTML = \`\${icons.copy}<span>Copy</span>\`;
};
var initPolicy = () => {
  setRawCopyLabel();
  const view = qs("policy-search").closest("[data-view]");
  view.addEventListener("change", (event) => {
    const control = event.target;
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement)
      handleChange(control);
  });
  view.addEventListener("click", (event) => {
    if (event.target instanceof Element)
      handleClick(event.target);
  });
  document.addEventListener("keydown", (event) => {
    if (view.hidden || document.querySelector("dialog[open]"))
      return;
    if (!(event.target instanceof HTMLElement) || !isSearchShortcut(event, event.target))
      return;
    event.preventDefault();
    qs("policy-search").focus();
  });
  qs("policy-search").addEventListener("input", () => {
    groupExpanded.clear();
    renderRules();
    syncHash2();
  });
  view.addEventListener("keydown", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || event.key !== "Enter")
      return;
    const list = pathListFor(input.dataset.pathInput);
    if (!list)
      return;
    event.preventDefault();
    list.add(input.value);
  });
  view.addEventListener("paste", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement))
      return;
    const list = pathListFor(input.dataset.pathInput);
    const text = event.clipboardData?.getData("text") ?? "";
    if (!list || !text.includes(\`
\`))
      return;
    event.preventDefault();
    list.add(\`\${input.value}
\${text}\`);
  });
  const testerDialog = qs("tester-dialog");
  qs("tester-open").addEventListener("click", () => {
    testerDialog.showModal();
    qs("tester-input").select();
    runCommandTest();
  });
  qs("tester-form").addEventListener("submit", (event) => {
    event.preventDefault();
    runCommandTest();
  });
  qs("tester-close").addEventListener("click", () => testerDialog.close());
  qs("tester-result").addEventListener("click", (event) => {
    if (event.target.closest("a"))
      testerDialog.close();
  });
  qs("scope-user").addEventListener("click", () => {
    leaveProjectDraft();
  });
  qs("project-draft-enter").addEventListener("click", () => {
    enterProjectDraft();
  });
  qs("project-draft-change").addEventListener("click", () => {
    changeProjectDirectory();
  });
  qs("reset-rule-customizations").addEventListener("click", () => {
    resetOverrides("destructive_command_protection");
  });
  qs("reset-secret-customizations").addEventListener("click", () => {
    resetOverrides("secret_protection");
  });
  qs("save").addEventListener("click", save);
  qs("discard-changes").addEventListener("click", () => {
    discard();
  });
  qs("repair").addEventListener("click", () => {
    repair();
  });
  qs("raw-copy").addEventListener("click", (event) => {
    copyText(event.currentTarget, qs("raw").value);
  });
  window.addEventListener("hashchange", setBanner);
  window.addEventListener("beforeunload", (event) => {
    if (!shared.dirty)
      return;
    event.preventDefault();
    event.returnValue = "";
  });
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

// src/gui/frontend/views/rules.ts
var rulesData = null;
var requested = false;
var scope = "project";
var pendingFocus = null;
var directoryPickerFailed = false;
var showPathEnd = () => {
  const input = qs("rules-project-path");
  input.title = input.value;
  if (document.activeElement !== input)
    input.scrollLeft = input.scrollWidth;
};
var render3 = () => {
  const loaded = rulesData;
  if (!loaded)
    return;
  const pathInput = qs("rules-project-path");
  if (!pathInput.value)
    pathInput.value = loaded.projectPath;
  const canPick = loaded.canPickDirectory && !directoryPickerFailed;
  pathInput.readOnly = canPick;
  qs("rules-choose-directory").hidden = !canPick;
  showPathEnd();
  qs("rules-list").innerHTML = loaded.rulebooks.length === 0 ? loaded.errors.length > 0 ? '<p class="empty">Every rulebook was skipped because of errors, so no custom rule is enforced. See Problems above.</p>' : '<p class="empty">No custom rules yet. Use <strong>Create a rule</strong> below, or run <code>npx -y cc-safety-net rule init</code>.</p>' : loaded.rulebooks.map((rulebook) => \`<section class="rulebook">
    <div class="rulebook-head">
      <strong>\${escapeHtml(rulebook.name)}</strong>
      <span class="count">v\${escapeHtml(rulebook.version)}</span>
      <span>\${rulebook.source === "user" ? "All projects" : "This project"}</span>
      <span>\${plural(rulebook.rules.length, "rule")}</span>
      \${rulebook.spec === rulebook.name ? "" : \`<code>\${escapeHtml(rulebook.spec)}</code>\`}
    </div>
    <ul class="card rows">\${rulebook.rules.map((rule) => \`<li class="setting-row rulebook-rule\${pendingFocus === rule.name ? " focused" : ""}">
      <div class="rulebook-rule-head"><code class="command">\${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(" "))}</code><code class="rule-id">custom.\${escapeHtml(rule.name)}</code></div>
      <p>\${escapeHtml(rule.reason)}</p>
      <p class="muted">Blocks when any of these arguments is present: \${rule.block_args.map((arg) => \`<code>\${escapeHtml(arg)}</code>\`).join(" ")}</p>
    </li>\`).join("")}</ul>
  </section>\`).join("");
  const diagnostics = [
    ...loaded.errors.map((text) => \`<p class="notice error">\${escapeHtml(text)}</p>\`),
    ...loaded.warnings.map((text) => \`<p class="notice warn">\${escapeHtml(text)}</p>\`)
  ];
  qs("rules-diagnostics").innerHTML = diagnostics.join("");
  qs("rules-diagnostics-panel").hidden = diagnostics.length === 0;
  if (!pendingFocus)
    return;
  const focused = qs("rules-list").querySelector(".focused");
  if (focused)
    focused.scrollIntoView({ block: "center" });
  if (!focused)
    notify(\`custom.\${pendingFocus} is not in any rulebook\`, "error");
  pendingFocus = null;
};
var loadRules = async () => {
  requested = true;
  const result = await requestJson("/api/rules");
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs("rules-list").innerHTML = \`<p class="empty">Could not load rules: \${escapeHtml(errorText(result))}</p>\`;
    rulesData = null;
    requested = false;
    qs("rules-diagnostics-panel").hidden = true;
    return;
  }
  rulesData = result.data;
  render3();
};
var showRules = (params) => {
  const focus = params.get("focus");
  const compose = params.get("compose");
  if (focus)
    pendingFocus = focus.replace(/^custom\\./, "");
  if (compose) {
    qs("rules-composer-input").value = compose;
    qs("rules-composer-panel").scrollIntoView({ block: "start" });
    qs("rules-composer-input").focus();
  }
  showPathEnd();
  if (!requested) {
    loadRules();
    return;
  }
  if (focus)
    render3();
};
var setScope = (next) => {
  scope = next;
  document.querySelectorAll("[data-rules-scope]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.rulesScope === next));
  });
  qs("rules-project-path-field").hidden = next !== "project";
  showPathEnd();
};
var chooseProjectDirectory = async (button) => {
  if (button.disabled)
    return;
  button.disabled = true;
  const result = await requestJson("/api/rules/choose-directory", { method: "POST" });
  button.disabled = false;
  if (result.ok && result.data.path) {
    qs("rules-project-path").value = result.data.path;
    showPathEnd();
    return;
  }
  if (result.ok && result.data.cancelled)
    return;
  directoryPickerFailed = true;
  qs("rules-project-path").readOnly = false;
  button.hidden = true;
  notify("The folder picker is not available", "error", \`\${result.ok ? result.data.error : errorText(result)}. Type the project folder instead.\`);
};
var copyRulePrompt = async (button) => {
  const request = qs("rules-composer-input").value;
  const projectPath = qs("rules-project-path").value;
  if (!rulesData) {
    notify("Rules have not loaded yet", "error", "Click Refresh and try again.");
    return;
  }
  if (!request.trim()) {
    notify("Describe what should be blocked first", "error");
    return;
  }
  if (scope === "project" && !projectPath.trim()) {
    notify("Enter the project folder the rule belongs to", "error");
    return;
  }
  button.disabled = true;
  const copied = await navigator.clipboard.writeText(rulePromptText({ rulesData, rulesScope: scope, projectPath, request })).then(() => true, () => false);
  button.disabled = false;
  if (!copied) {
    notify("Copy failed", "error");
    return;
  }
  qs("rules-composer-input").value = "";
  notify("Prompt copied", "ok", "Paste it into your coding agent.");
};
var initRules = () => {
  qs("rules-refresh").addEventListener("click", (event) => {
    runRefresh(event.currentTarget, loadRules);
  });
  qs("rules-project-path").addEventListener("blur", showPathEnd);
  qs("rules-choose-directory").addEventListener("click", (event) => {
    chooseProjectDirectory(event.currentTarget);
  });
  qs("rules-copy-prompt").addEventListener("click", (event) => {
    copyRulePrompt(event.currentTarget);
  });
  qs("rules-composer-panel").addEventListener("click", (event) => {
    const target = event.target;
    const scopeButton = target.closest("[data-rules-scope]");
    if (scopeButton) {
      setScope(scopeButton.dataset.rulesScope ?? "project");
      return;
    }
    const example = target.closest("[data-rules-example]");
    if (example)
      qs("rules-composer-input").value = example.dataset.rulesExample ?? "";
  });
};

// src/gui/frontend/views/settings.ts
var themes = ["auto", "light", "dark"];
var applyTheme = (theme) => {
  document.documentElement.style.colorScheme = theme === "auto" ? "light dark" : theme;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
};
var renderRetention = () => {
  const days = shared.policy?.policy.audit.retention_days;
  if (days === undefined)
    return;
  qs("retention-days").value = String(days);
  qs("retention-unit").textContent = days === 1 ? "day" : "days";
};
var blockedBy = () => (shared.policy?.errors.length ?? 0) > 0 ? "Repair your policy file in Protections first." : shared.drafting ? "Apply or leave your project policy draft first." : shared.dirty ? "Save or discard your unsaved Protections changes first." : null;
var saveRetentionDays = async (days) => {
  const saved = shared.policy;
  if (!saved)
    return;
  const current = saved.policy.audit.retention_days;
  const problem = !Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS ? \`Enter a whole number of days from \${MIN_AUDIT_RETENTION_DAYS} to \${MAX_AUDIT_RETENTION_DAYS}.\` : blockedBy();
  if (problem) {
    renderRetention();
    notify("Retention unchanged", "error", problem);
    return;
  }
  if (days === current)
    return;
  if (days < current && !await confirmDialog({
    title: \`Keep logs for only \${dayCount(days)}?\`,
    body: \`Log entries older than \${dayCount(days)} are deleted on the next cleanup and cannot be recovered.\`,
    detail: qs("logs-path").textContent ?? "",
    confirmLabel: "Shorten retention"
  })) {
    renderRetention();
    return;
  }
  await runExclusive("Saving…", async () => {
    const policy = clonePolicy(saved.policy);
    policy.audit.retention_days = days;
    const result = await requestJson("/api/policy", {
      method: "POST",
      body: JSON.stringify(policy)
    });
    if (!isWriteSuccess(result)) {
      renderRetention();
      notify("Save failed", "error", errorText(result));
      return;
    }
    if (!await loadPolicy())
      return;
    limitActivityDays(days);
    await Promise.all([loadOverview(), loadActivity()]);
    notify(\`Logs are now kept for \${dayCount(days)}\`, "ok");
  });
};
var resetPolicy = async () => {
  const saved = shared.policy;
  if (!saved)
    return;
  if (shared.drafting) {
    notify("Reset unavailable", "error", "Apply or leave your project policy draft first.");
    return;
  }
  if (!await confirmDialog({
    title: "Reset your policy?",
    body: "Your policy file is replaced with the defaults. Every customization is lost.",
    detail: saved.path,
    confirmLabel: "Reset policy"
  }))
    return;
  await runExclusive("Resetting…", async () => {
    const result = await requestJson("/api/reset", { method: "POST", body: "{}" });
    if (!isWriteSuccess(result)) {
      notify("Reset failed", "error", errorText(result));
      return;
    }
    sessionStorage.removeItem("cc-safety-net-draft");
    if (await loadPolicy())
      notify("Policy reset to the defaults", "ok", result.data.path);
  });
};
var initSettings = () => {
  document.querySelectorAll("[data-copy-path]").forEach((button) => {
    button.innerHTML = \`\${icons.copy}<span>Copy</span>\`;
    button.addEventListener("click", () => {
      copyText(button, qs(button.dataset.copyPath ?? "").dataset.path ?? "");
    });
  });
  const stored = localStorage.getItem("cc-safety-net-theme");
  applyTheme(themes.includes(stored) ? stored : "auto");
  qs("settings-theme").addEventListener("click", (event) => {
    const theme = event.target.closest("[data-theme-choice]")?.dataset.themeChoice;
    if (!theme)
      return;
    if (theme === "auto")
      localStorage.removeItem("cc-safety-net-theme");
    if (theme !== "auto")
      localStorage.setItem("cc-safety-net-theme", theme);
    applyTheme(theme);
  });
  qs("retention-days").addEventListener("change", (event) => {
    saveRetentionDays(Number(event.target.value));
  });
  qs("reset").addEventListener("click", () => {
    resetPolicy();
  });
  on("policy", renderRetention);
};

// src/gui/frontend/main.ts
var views = {
  overview: ["Overview", () => {
    return;
  }],
  activity: ["Activity", showActivity],
  policy: ["Protections", showPolicy],
  rules: ["Custom rules", showRules],
  integrations: ["Agents", () => {
    return;
  }],
  settings: ["Settings", () => {
    return;
  }]
};
var applyView = () => {
  const [hashName = "", query = ""] = location.hash.slice(1).split("?");
  const view = hashName in views ? hashName : "overview";
  document.body.dataset.view = view;
  document.title = \`\${views[view][0]} · CC Safety Net\`;
  document.querySelectorAll("[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.removeAttribute("aria-current");
    if (link.dataset.nav === view)
      link.setAttribute("aria-current", "page");
  });
  window.scrollTo({ top: 0 });
  views[view][1](new URLSearchParams(query));
};
initConfirmDialog();
initOverview();
initActivity();
initPolicy();
initRules();
initIntegrations();
initSettings();
qs("toast-close").addEventListener("click", () => notify(""));
on("dirty", () => {
  qs("nav-dirty").hidden = !shared.dirty;
});
window.addEventListener("hashchange", applyView);
applyView();
Promise.all([loadIntegrations(), loadHealth()]);
loadPolicy().then((loaded) => {
  if (location.hash.startsWith("#policy?"))
    applyView();
  if (loaded)
    loadStarContext();
  limitActivityDays(retentionDays());
  loadOverview();
  loadActivity();
});

  </script>
</body>
</html>
`;var Lp='<script id="ccsn-data" type="application/json">';function Np(_,N=Dp){return N.replace(Lp,()=>Lp+JSON.stringify({token:_}).replaceAll("<","\\u003c"))}var Hs="kenryu42/cc-safety-net",Ww=`https://github.com/${Hs}`,Up=1e4,zw=7,Yw="The project draft directory changed; reload the draft before applying.",Zw="audit settings are user scope only; remove the audit section from a project proposal";async function Gp(_,N={}){let j=mn({label:"gui",booleans:{noOpen:["--no-open"]}},_),J=N.log??console.log,Y=N.error??console.error;if(j.errors.length>0){for(let ie of j.errors)Y(ie);return Y("Usage: cc-safety-net gui [--no-open]"),1}let re=await Xw(c,N);if(J(`CC Safety Net policy GUI: ${re.url}`),!j.flags.noOpen)try{await(N.openBrowser??ck)(re.url)}catch(ie){Y(`Failed to open browser: ${ie instanceof Error?ie.message:String(ie)}`),Y(`Open this URL manually: ${re.url}`)}if(N.keepAlive===!1)return await re.close(),0;return await lk(re),0}async function Xw(_,N={}){let j=qw(24).toString("base64url"),J={dir:null,revision:0},Y=Kw((de,fe)=>{Qw(_,de,fe,j,N,J)});await new Promise((de,fe)=>{Y.once("error",fe),Y.listen(0,"127.0.0.1",()=>{Y.off("error",fe),de()})});let ie=`http://127.0.0.1:${Y.address().port}`;return{origin:ie,token:j,url:`${ie}/?token=${encodeURIComponent(j)}`,close:()=>ak(Y)}}async function Qw(_,N,j,J,Y,re){let ie=_(),de=new URL(N.url??"/","http://127.0.0.1");if(N.method==="GET"&&de.pathname==="/favicon.ico"){j.writeHead(204,{"cache-control":"no-store"}),j.end();return}if(!ok(N,de,J)){sn(j,403,{error:"Forbidden"});return}if(N.method==="GET"&&de.pathname==="/"){await Promise.resolve(Y.buildDocument?.()).then((fe)=>sk(j,Np(J,fe)),(fe)=>sn(j,500,{error:fe instanceof Error?fe.message:String(fe)}));return}if(N.method==="GET"&&de.pathname==="/api/policy"){let fe=hu(ie,Y),we=R(ie,js(Y));sn(j,200,{...fe,configState:ze(we),...we.policyScopes?{projectPolicy:{path:h(Y.cwd??process.cwd()),weakenings:we.policyScopes.weakeningsIgnored?[]:we.policyScopes.weakenings}}:{},destructiveCommandRules:z,secretPatterns:ut,version:un(),preview:fe.errors.length>0?null:Ge(fe.policy,ie.env)});return}if(N.method==="POST"&&de.pathname==="/api/policy/preview"){let fe=await Pr(N);if(!fe.ok){sn(j,fe.status,{errors:[fe.error]});return}let we=vu(ie,fe.value);sn(j,we.errors.length>0?400:200,we);return}if(N.method==="POST"&&de.pathname==="/api/policy/explain"){let fe=await Pr(N);if(!fe.ok){sn(j,fe.status,{errors:[fe.error]});return}let we=fe.value;if(we===null||typeof we.command!=="string"){sn(j,400,{errors:["command must be a string"]});return}let ke=wr(we.policy,ie.home);if(ke.length>0){sn(j,400,{errors:ke});return}sn(j,200,tk(ie,we.command,we.policy,Y));return}if(N.method==="POST"&&de.pathname==="/api/policy"){let fe=await Pr(N);if(!fe.ok){sn(j,fe.status,{errors:[fe.error]});return}let we=Fn(ie,fe.value,Y);sn(j,we.errors.length>0?400:200,we);return}if(N.method==="POST"&&de.pathname==="/api/reset"){sn(j,200,Fn(ie,te,Y));return}if(N.method==="POST"&&de.pathname==="/api/repair"){sn(j,200,bu(ie,Y));return}if(N.method==="POST"&&de.pathname==="/api/policy/project/choose-directory"){let fe=await(Y.chooseDirectory??Ns)();if("path"in fe)re.dir=fe.path,re.revision+=1;sn(j,200,{cancelled:"cancelled"in fe,..."error"in fe?{error:fe.error}:{}});return}if(N.method==="GET"&&de.pathname==="/api/policy/project"){let fe=Bp(re,Y),we=qp(ie,fe,Y),ke=we?{projection:{},diagnostics:[we]}:jp(fe,ie.home),Re=kr(ie,Y);sn(j,200,{path:h(fe),revision:re.revision,baseline:Re.baseline,userPolicyDiagnostics:Re.diagnostics,projection:ke.projection,projectionDiagnostics:ke.diagnostics,canPickDirectory:Ls(process.platform,process.env)});return}if(N.method==="POST"&&de.pathname==="/api/policy/project/diff"){let fe=await Hp(ie,N,j,re,Y);if(!fe)return;let we=jp(fe.dir,ie.home),ke=kr(ie,Y).baseline,Re=ee(ke,ue(fe.proposal,ie.home).policy);sn(j,200,{rows:So(ee(ke,we.projection).policy,Re.policy,!1),weakenings:Re.weakenings,existingFileDiagnostics:we.diagnostics});return}if(N.method==="POST"&&de.pathname==="/api/policy/project/apply"){let fe=await Hp(ie,N,j,re,Y);if(!fe)return;let we=nk(fe.dir,fe.proposal,ie.home);sn(j,we.errors.length>0?500:200,we);return}if(N.method==="GET"&&de.pathname==="/api/activity"){let fe=oe(ie,Y),we=rk(de.searchParams.get("days"),fe);if(we===null){sn(j,400,{error:`days must be an integer between 1 and ${fe}`});return}sn(j,200,Ap(ie,we,Y.activityLogsDir));return}if(N.method==="POST"&&de.pathname==="/api/rules/choose-directory"){sn(j,200,await Ns());return}if(N.method==="GET"&&de.pathname==="/api/rules"){let fe=Q(ie,js(Y)),we=new Map(fe.rules.map((ke)=>[ke.name,ke]));sn(j,200,{projectPath:Y.cwd??process.cwd(),canPickDirectory:Ls(process.platform,process.env),rulebooks:fe.rulebooks.map((ke)=>({source:ke.source,spec:ke.spec,name:ke.name,version:ke.version,rules:ke.rules.flatMap((Re)=>{let Te=we.get(Re);if(!Te)return[];return[{name:Te.name,command:Te.command,subcommand:Te.subcommand,block_args:Te.block_args,reason:Te.reason}]})})),errors:fe.errors,warnings:fe.warnings});return}if(N.method==="GET"&&de.pathname==="/api/star/context"){sn(j,200,await(Y.fetchStarContext??(()=>gk(ie,{logsDir:Y.activityLogsDir})))());return}if(N.method==="POST"&&de.pathname==="/api/star"){let fe=await(Y.starRepo??dk)();sn(j,200,fe.ok?{ok:!0}:{ok:!1,fallbackUrl:Ww});return}if(N.method==="GET"&&de.pathname==="/api/integrations"){sn(j,200,await(Y.fetchIntegrations??(()=>uk(ie)))());return}if(N.method==="GET"&&de.pathname==="/api/health"){sn(j,200,await(Y.fetchHealth??fk)());return}if(N.method==="POST"&&(de.pathname==="/api/install"||de.pathname==="/api/uninstall")){let fe=await Pr(N);if(!fe.ok){sn(j,fe.status,{errors:[fe.error]});return}let we=fe.value?.target;if(typeof we!=="string"||!On.some((Re)=>Re.target===we)){sn(j,400,{error:"unknown target"});return}let ke=de.pathname==="/api/install"?"install":"uninstall";sn(j,200,await(Y.runIntegration??mk)(ke,we));return}sn(j,404,{error:"Not found"})}function js(_){return{..._,cwd:_.cwd??process.cwd()}}function Bp(_,N){return _.dir??N.cwd??process.cwd()}function qp(_,N,j){if(!A(_,{...j,cwd:N}))return null;return`${h(N)} is the user policy, not a project policy; choose a project directory, or run the GUI from one`}function jp(_,N){let j=h(_),J=Vw(j)?It(j):{value:void 0,errors:[]},Y=ue(J.value,N);return{projection:Y.policy,diagnostics:[...J.errors,...Y.diagnostics]}}async function Hp(_,N,j,J,Y){let re=Bp(J,Y),ie=J.revision,de=await Pr(N);if(!de.ok)return sn(j,de.status,{errors:[de.error]}),null;let fe=de.value;if(typeof fe?.revision!=="number")return sn(j,400,{errors:["revision must be a number"]}),null;if(fe.revision!==ie)return sn(j,409,{errors:[Yw]}),null;let we=qp(_,re,Y);if(we)return sn(j,400,{errors:[we]}),null;let ke=ek(fe.proposal,_.home);if(ke.length>0)return sn(j,400,{errors:ke}),null;return{dir:re,proposal:fe.proposal}}function ek(_,N){let j=wr(_,N);if(j.length>0)return j;return _?.audit===void 0?[]:[Zw]}function nk(_,N,j){let J=h(_),Y=Po(N,k(N,j));try{return g(i(w(_,"project policy"),J),`${JSON.stringify(Y,null,2)}
`),{path:J,errors:[]}}catch(re){return{path:J,errors:[re instanceof Error?re.message:String(re)]}}}function tk(_,N,j,J){let Y=k(j,_.home),re=R(_,js(J)),ie=Oe({rules:re.policy.rules,transparentWrappers:re.policy.transparentWrappers,commandTools:re.policy.commandTools,safety:Be(Y.safety),worktreeMode:Y.workflow.worktree_mode,destructiveCommandProtectionEnabled:Y.destructive_command_protection.enabled,destructiveCommandRuleOverrides:Y.destructive_command_protection.overrides,destructiveCommandAllowPaths:Y.destructive_command_protection.allow_paths,secretProtection:{enabled:Y.secret_protection.enabled,disabledRules:We(Y.secret_protection.overrides),denyPaths:Y.secret_protection.deny_paths,allowPaths:Y.secret_protection.allow_paths}});return fr(N,{policySnapshot:ie,cwd:J.cwd,userConfigDir:J.userConfigDir},_)}function rk(_,N){if(_===null)return Math.min(zw,N);let j=Number(_);if(!Number.isInteger(j)||j<1||j>N)return null;return j}function ok(_,N,j){if(N.searchParams.get("token")!==j)return!1;if(_.method!=="POST")return!0;return _.headers["x-cc-safety-net-token"]===j}var ik=1048576;async function Pr(_){let N=[],j=0;for await(let J of _){let Y=J;if(j+=Y.byteLength,j>ik)return{ok:!1,status:413,error:"Request body is too large"};N.push(Y)}try{return{ok:!0,value:JSON.parse(Buffer.concat(N).toString("utf-8")||"{}")}}catch(J){return{ok:!1,status:400,error:`Invalid JSON: ${J instanceof Error?J.message:String(J)}`}}}function sk(_,N){_.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),_.end(N)}function sn(_,N,j){_.writeHead(N,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),_.end(JSON.stringify(j))}function ak(_){return new Promise((N,j)=>{_.close((J)=>J?j(J):N())})}function lk(_){return new Promise((N)=>{let j=()=>{process.off("SIGINT",J),process.off("SIGTERM",J)},J=()=>{j(),_.close().then(N)};process.once("SIGINT",J),process.once("SIGTERM",J)})}function ck(_){let N=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",j=process.platform==="win32"?["/c","start","",_]:[_];return new Promise((J,Y)=>{let re=Mp(N,j,{detached:!0,stdio:"ignore"}),ie=(fe)=>{re.off("spawn",de),Y(fe)},de=()=>{re.off("error",ie),re.unref(),J()};re.once("error",ie),re.once("spawn",de)})}async function dk(_="gh",N=Up){return{ok:await yk(_,["api","-X","PUT",`/user/starred/${Hs}`],N)===0}}async function uk(_,N={}){let j=await Nr((Y)=>Vt({environment:_,cwd:process.cwd(),openCodeVersion:Y}).status!=="n/a",N.fetcher),J=pk(_,j);return{targets:Pn.map((Y)=>{let re=J.find((ie)=>ie.platform===Y.id);return{target:Y.id,label:ln(Y.id),version:j.versions[Y.id]??null,status:re?.configured?"active":re?.detected?"disabled":re?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:j.version,nodeVersion:j.nodeVersion,platform:j.platform}}}function pk(_,N){return Kt(_,process.cwd(),{ampPluginListOutput:N.ampPluginListOutput,codexPluginListOutput:N.codexPluginListOutput,copilotCliVersion:N.versions["copilot-cli"],openCodeVersion:N.versions.opencode,openCodePluginListOutput:N.openCodePluginListOutput})}async function fk(_={}){let N=await(_.checkUpdates??Gn)();return{update:{latestVersion:N.latestVersion??null,updateAvailable:N.updateAvailable}}}var Fp=Promise.resolve();function mk(_,N,j={}){let J=async()=>{let re=[],{log:ie,error:de}=console;console.log=(...fe)=>re.push(fe.map(String).join(" ")),console.error=console.log;try{return{ok:await br(_,[],{selectTargets:async()=>[N],output:new Jw({write(we,ke,Re){re.push(String(we).replace(/\n$/,"")),Re()}}),...j})===0,output:re.join(`
`)}}finally{console.log=ie,console.error=de}},Y=Fp.then(J);return Fp=Y.then(()=>{return},()=>{return}),Y}async function gk(_,N={}){let[j,J]=await Promise.all([hk(N.fetchRepo),Promise.resolve(Or(_,oe(_),N.logsDir).totalBlocked)]);return{starCount:j,blockedTotal:J}}function yk(_,N,j){return new Promise((J)=>{let Y=Mp(_,N,{stdio:"ignore",windowsHide:!0}),re=!1,ie=setTimeout(()=>{Y.kill(),de(null)},j),de=(fe)=>{if(re)return;re=!0,clearTimeout(ie),J(fe)};Y.once("error",()=>de(null)),Y.once("close",de)})}async function hk(_=fetch){try{let N=await _(`https://api.github.com/repos/${Hs}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(Up)});if(!N.ok)return null;let j=await N.json();return typeof j.stargazers_count==="number"?j.stargazers_count:null}catch{return null}}function vk(_){if(_[0]!=="help")return!1;let N=_[1];if(!N)ls(),process.exit(0);if(mr(N))process.exit(0);console.error(`Unknown command: ${N}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var bk={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),mr("hook",console.error),process.exit(1)},install:async(_)=>{process.exit(await br("install",_))},update:async(_)=>{process.exit(await xs(_))},uninstall:async(_)=>{process.exit(await br("uninstall",_))},rule:async(_)=>{process.exit(await Ep(c(),_))},policy:async(_)=>{process.exit(await xu(c(),_))},status:async(_)=>{if($n(mn({label:"status"},_).errors))process.exit(1);Tp(c())},statusline:async(_)=>{let N=mn({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},_);if(N.errors.length===0&&N.flags.claudeCode){await Ds(c());return}if($n(N.errors),!N.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");mr("statusline",console.error),process.exit(1)},doctor:async(_)=>{let N=es(_);if(!N)process.exit(1);let j=await Fc(c(),{json:N.json,skipUpdateCheck:N.skipUpdateCheck});process.exit(j)},logs:async(_)=>{process.exit(await Ks(c(),_))},gui:async(_)=>{process.exit(await Gp(_))},explain:async(_)=>{process.exit(await Yc(c(),_))}};async function wk(_){let N=mn({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},_);if(vk(_))return;let j=_[0],J=j?Ar(j):void 0;if(N.help&&J&&J.name!=="rule")mr(J.name),process.exit(0);if(!j||N.help&&!J)ls(),process.exit(0);if(N.flags.version)Qc(),process.exit(0);if(J){await bk[J.name](_.slice(1));return}if(j==="--statusline"){await Ds(c());return}console.error(j.startsWith("-")?`Unknown option: ${j}`:`Unknown command: ${j}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{wk as runCli};
