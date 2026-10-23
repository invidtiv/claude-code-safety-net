import{a,s,$e,ot,T,xt,it,c,n,st,_,S,he,wt,m,De,x,ct,l,o,w,i,ce,r,h,ve,B,Et,kt,p,be,xe,Rt,L,Q,le,C,Tt,A,y,ue,W,u,O,ee,lt,ut,M,E,D,Se,we,Ue,de,d,e,He,Ne,Ge,Ce,dt,pt,pe,Le,fe,Be,te,z,We,Ee,V,ft,q,ne,re,me,mt,gt,k,I,ze,ht,qe,R,Ke,Me,Je,v,t,oe,ke,b,F,g,N,Pt,Ye,Ze,f,j}from"./chunks/index-x08az823.js";import{tt}from"./chunks/index-wsatc8ny.js";import{Xe,Te}from"./chunks/index-16jrp9t1.js";import{nt}from"./chunks/index-19wjc84f.js";import"./chunks/index-20ychw09.js";import{se,J,rt,U,H}from"./chunks/index-twyxp0fs.js";var Cf=["-h","--help"];function fn(P,G){let K=Object.entries(P.booleans??{}),Y=Object.entries(P.values??{}),Z=Object.entries(P.lists??{}),X=Object.fromEntries(K.map(([_e])=>[_e,!1])),ie={},ae=Object.fromEntries(Z.map(([_e])=>[_e,[]])),ge=[],ye=[],Pe=!1,Re=-1;for(let[_e,Ae]of G.entries()){if(_e<=Re)continue;if(Ae==="--"){ge.push(...G.slice(_e+1));break}if(Cf.includes(Ae)){Pe=!0;continue}let Ie=K.find(([,Ve])=>Ve.includes(Ae));if(Ie){X[Ie[0]]=!0;continue}let je=Y.find(([,Ve])=>Ve.includes(Ae));if(je){let Ve=G[_e+1];if(Ve===void 0||Ve.startsWith("-")){ye.push(`${Ae} requires a value`);continue}ie[je[0]]=Ve,Re=_e+1;continue}let Oe=Z.find(([,Ve])=>Ve.includes(Ae));if(Oe){let Ve=G.slice(_e+1),nn=Ve.findIndex((an)=>an.startsWith("-")),rn=Ve.slice(0,nn===-1?Ve.length:nn);if(rn.length===0){ye.push(`${Ae} requires at least one value`);continue}ae[Oe[0]]=[...ae[Oe[0]]??[],...rn],Re=_e+rn.length;continue}if(Ae.startsWith("-")){ye.push(`Unknown option for ${P.label}: ${Ae}`);continue}if(P.positionals==="tail"){ge.push(...G.slice(_e));break}ge.push(Ae)}if(P.positionals!=="list"&&P.positionals!=="tail")ye.push(...ge.map((_e)=>`Unexpected argument for ${P.label}: ${_e}`));return{flags:X,values:ie,lists:ae,positionals:ge,help:Pe,errors:ye}}function $n(P){for(let G of P)console.error(G);return P.length>0}import{readdirSync as Af,statSync as Xs,unlinkSync as _f}from"node:fs";import{basename as Qs,dirname as If,isAbsolute as Of,join as $f,relative as Df,resolve as Nf,sep as Lf}from"node:path";var Ws=(P)=>{let G=Date.now()-new Date(P).getTime();if(!Number.isFinite(G))return"";let K=Math.floor(G/60000),Y=Math.floor(K/60),Z=Math.floor(Y/24);if(Z>0)return`${Z}d ago`;if(Y>0)return`${Y}h ago`;if(K>0)return`${K}m ago`;return"just now"},Go=(P)=>{let G=(P??"").trim().split(/\s+/).filter((Z)=>Z&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(Z)),K=G[0]?.split("/").pop();if(!K)return null;let Y=G[1];return Y&&/^[a-z][a-z0-9-]*$/.test(Y)?`${K} ${Y}`:K};function Ys(P){let G=(Z)=>`${Z.sessionId}
${Go(Z.segment||Z.command)}`,K=P.filter((Z)=>Z.decision!=="allow"),Y=K.filter((Z)=>Z.sessionId).reduce((Z,X)=>Z.set(G(X),(Z.get(G(X))??0)+1),new Map);return new Set(K.filter((Z)=>Z.failureStage||(Y.get(G(Z))??0)>=2))}import{existsSync as xf,readdirSync as Pf,readFileSync as Sf}from"node:fs";import{join as Rf}from"node:path";function Wn(P,G){try{return Pf(P,{withFileTypes:!0,encoding:"utf8"}).flatMap((K)=>{let Y=Rf(P,K.name);if(K.isDirectory())return Wn(Y,G);if(K.name.endsWith(".jsonl"))return[Y];return[]})}catch{if(G&&xf(P))G.count++;return[]}}var Ef=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function Tf(P){if(!P||typeof P!=="object"||Array.isArray(P))return!1;let G=P;if(typeof G.ts!=="string"||typeof G.command!=="string")return!1;return Ef.every((K)=>G[K]===void 0||typeof G[K]==="string")}function Dt(P,G){try{return Sf(P,"utf-8").split(`
`).filter(Boolean).flatMap((K)=>{try{let Y=JSON.parse(K);if(!Tf(Y)){if(G)G.count++;return[]}return[Y]}catch{if(G)G.count++;return[]}})}catch{if(G)G.count++;return[]}}function mn(P){return Array.from(P,(G)=>{let K=G.charCodeAt(0);if(K<=31||K>=127&&K<=159)return`\\x${K.toString(16).padStart(2,"0")}`;return G}).join("")}function jf(P,G){let K=se(P),Y=fn({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},G);if($n(Y.errors))return null;if(Y.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(Y.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let Z=Y.values.limit===void 0?20:Zs(Y.values.limit);if(Z===null)return console.error("--limit must be a positive number"),null;let X=Y.values.since===void 0?Math.min(30,K):Zs(Y.values.since);if(X===null||X>K)return console.error(`--since must be a positive number of days no greater than ${K}`),null;let ie={limit:Z,limitExplicit:Y.values.limit!==void 0,since:X,sinceExplicit:Y.values.since!==void 0,all:Y.flags.all,json:Y.flags.json,suspect:Y.flags.suspect,pruneLegacy:Y.flags.pruneLegacy,dryRun:Y.flags.dryRun,id:Y.values.id,agent:Y.values.agent,rule:Y.values.rule,session:Y.values.session,project:Y.values.project===void 0?void 0:Nf(Y.values.project)};if(ie.id&&(ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.sinceExplicit||ie.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ie.pruneLegacy&&(ie.id!==void 0||ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.all||ie.sinceExplicit||ie.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ie.dryRun&&!ie.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ie}async function ea(P,G,K={}){let Y=jf(P,G);if(!Y)return 1;let Z=K.logsDir??U(P);if(Y.pruneLegacy)return Ff(Z,Y.json,Y.dryRun);if(!Z)return console.log(Y.json?"[]":Y.id?`No retained audit log entry found for id ${mn(Y.id)}.`:"No audit log entries found."),0;J(P,Z);let X={count:0},ie=Wn(Z,X).flatMap((Re)=>Dt(Re,X).map((_e)=>({entry:_e,file:Re})));if(X.count>0)console.error(`warning: ${X.count} audit log ${X.count===1?"source":"sources"} could not be read; these results are incomplete`);if(Y.id)return Bf(ie,Y,K.timeZone);let ae=Date.now()-Y.since*24*60*60*1000,ge=ie.filter((Re)=>Gf(Re,Y,Z,ae)),ye=Y.suspect?Ys(ge.map((Re)=>Re.entry)):null,Pe=(ye?ge.filter((Re)=>ye.has(Re.entry)):ge).sort((Re,_e)=>Date.parse(_e.entry.ts)-Date.parse(Re.entry.ts)).slice(0,Y.limit);if(Y.json)return console.log(JSON.stringify(Pe.map((Re)=>Re.entry),null,2)),0;if(Pe.length===0)return console.log("No audit log entries found."),0;for(let Re of Pe)console.log(Kf(Re.entry,K.timeZone));return 0}function Ff(P,G,K){let Y=P?Mf(P).map((ae)=>$f(P,ae)):[];if(K)return Hf(Y,G);let Z=[],X=0,ie=0;for(let ae of Y){let ge=Xs(ae,{throwIfNoEntry:!1})?.size??0,ye=Uf(ae);if(ye){Z.push(`${Qs(ae)}: ${ye}`);continue}X++,ie+=ge}if(G)return console.log(JSON.stringify({removedFiles:X,removedBytes:ie,failedFiles:Z.length})),Z.length===0?0:1;console.log(X===0&&Z.length===0?"No legacy audit log files found.":`Removed ${X} legacy audit log ${X===1?"file":"files"} (${na(ie)}).`);for(let ae of Z)console.error(`Could not remove ${mn(ae)}`);if(console.log("Nested v2 audit logs were not changed."),X>0)console.log("This deletion cannot be undone.");return Z.length===0?0:1}function Hf(P,G){let K=P.reduce((Y,Z)=>Y+(Xs(Z,{throwIfNoEntry:!1})?.size??0),0);if(G)return console.log(JSON.stringify({dryRun:!0,files:P.length,bytes:K})),0;if(console.log(P.length===0?"No legacy audit log files found.":`Would remove ${P.length} legacy audit log ${P.length===1?"file":"files"} (${na(K)}).`),console.log("Nested v2 audit logs are not included."),P.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function Mf(P){try{return Af(P,{withFileTypes:!0}).filter((G)=>G.isFile()&&G.name.endsWith(".jsonl")).map((G)=>G.name)}catch{return[]}}function Uf(P){try{return _f(P),null}catch(G){return G instanceof Error?G.message:String(G)}}function na(P){let G=["B","KiB","MiB","GiB"],K=Math.min(Math.floor(Math.log2(Math.max(P,1))/10),G.length-1);return`${Math.round(P/1024**K*10)/10} ${G[K]}`}function Bf(P,G,K){let Y=P.filter((X)=>X.entry.id===G.id);if(Y.length>1)return console.error(`Multiple audit log entries found for id ${mn(G.id??"")}.`),1;if(G.json)return console.log(JSON.stringify(Y.map((X)=>X.entry),null,2)),0;let Z=Y[0];if(!Z)return console.log(`No retained audit log entry found for id ${mn(G.id??"")}.`),0;return console.log(Jf(Z.entry,K)),0}function Gf(P,G,K,Y){if(!G.all&&P.entry.decision==="allow")return!1;if(Date.parse(P.entry.ts)<Y)return!1;if(G.agent!==void 0&&P.entry.agent!==G.agent)return!1;if(G.rule!==void 0&&P.entry.ruleId!==G.rule)return!1;if(G.session!==void 0&&!qf(P,K,G.session))return!1;if(G.project!==void 0&&!Vf(P.entry.cwd,G.project))return!1;return!0}function qf(P,G,K){if(P.entry.sessionId===K)return!0;return If(P.file)===G&&Qs(P.file,".jsonl")===K}function Vf(P,G){if(!P)return!1;let K=Df(G,P);return K!==".."&&!K.startsWith(`..${Lf}`)&&!Of(K)}function Kf(P,G){let K=mn(P.id??"-"),Y=mn(P.decision??"deny"),Z=P.cwd?`  [${mn(P.cwd)}]`:"",X=P.segment||P.command,ie=X===P.command?"":"↳ ",ae=X.length>50?`${X.slice(0,50)}…`:X;return`${K.padEnd(16)}  ${mn(ta(P.ts,G))}  ${Y.padEnd(5)}  ${mn(P.agent??"-").padEnd(15)}  ${mn(P.ruleId??"-").padEnd(20)}  ${ie}${mn(ae)}${Z}`}function Jf(P,G){let K=(Z)=>mn(Z===void 0||Z===null||Z===""?"-":Z),Y=P.shape?`${P.agent??"-"} (shape: ${P.shape})`:P.agent??"-";return[`id:        ${K(P.id)}`,`ts:        ${K(ta(P.ts,G))}`,`decision:  ${K(P.decision)}`,`agent:     ${K(Y)}`,`level:     ${K(P.level)}`,`tool:      ${K(P.toolName)}`,`rule:      ${K(P.ruleId)}`,`intent:    ${K(P.intent)}`,`stage:     ${K(P.failureStage)}`,`error:     ${K(P.errorCode)}`,`session:   ${K(P.sessionId)}`,`cwd:       ${K(P.cwd)}`,`version:   ${K(P.v)}`,`truncated: ${K(P.truncated===!0?"yes":void 0)}`,`reason:    ${K(P.reason)}`,`command:   ${K(P.command)}`,`segment:   ${K(P.segment)}`].join(`
`)}function ta(P,G){let K=new Date(P);if(Number.isNaN(K.getTime()))return P;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:G}).format(K)}function Zs(P){let G=Number(P);return Number.isFinite(G)&&G>0?G:null}var ra={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var oa={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var ia={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var qo=["npx","--offline","--no-install","@deepseek-ai/dsh","--version"],sa=["cursor-agent","--version"],aa=[{id:"antigravity-cli",displayName:"Antigravity CLI",runtime:{flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",runtime:{displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",runtime:{flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",runtime:{flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",runtime:{flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",runtime:{flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",runtime:{flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",runtime:{flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",install:{flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",install:{flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",install:{flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",runtime:{flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"deepseek-harness",displayName:"DeepSeek Harness",install:{flag:"--deepseek-harness",artifactKind:"package",probeCommand:qo}},{id:"devin",displayName:"Devin CLI",runtime:{flags:["-dv","--devin"],description:"Run as Devin CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--devin",artifactKind:"hook config",probeCommand:["devin","--version"]}},{id:"droid",displayName:"Factory Droid",runtime:{flags:["-fd","--droid"],description:"Run as Factory Droid PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--droid",artifactKind:"hook config",probeCommand:["droid","--version"]}},{id:"amp",displayName:"Amp Code",install:{flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],Vo=aa.slice().sort((P,G)=>P.displayName.localeCompare(G.displayName,"en")),Er=Vo.map((P)=>P.id).sort((P,G)=>Number(G==="claude-code")-Number(P==="claude-code")),er=Vo.filter((P)=>("runtime"in P)).map((P)=>({id:P.id,displayName:"displayName"in P.runtime?P.runtime.displayName:P.displayName,flags:P.runtime.flags,legacyFlags:"legacyFlags"in P.runtime?P.runtime.legacyFlags:[],description:P.runtime.description,legacyTopLevelFlags:P.runtime.legacyTopLevelFlags})),Sn=Vo.map((P)=>({id:P.id,...P.install})),zf=Object.fromEntries(aa.map((P)=>[P.id,P.displayName]));function ln(P){return zf[P]}var Wf=er.map((P)=>({flags:P.flags.join(", "),description:P.description})),Yf=er.flatMap((P)=>P.flags.map((G)=>`cc-safety-net hook ${G}`)),la={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...Wf,{flags:"-h, --help",description:"Show this help"}],examples:Yf};var ca={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...Sn.map((P)=>({flags:P.flag,description:`Install ${ln(P.id)} ${P.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...Sn.map((P)=>`cc-safety-net install ${P.flag}`)]},da={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...Sn.map((P)=>({flags:P.flag,description:`Uninstall ${ln(P.id)} ${P.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...Sn.map((P)=>`cc-safety-net uninstall ${P.flag}`)]},ua={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var pa={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var Tr={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Ko=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],Jo=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],Nt={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"tool add <name...> [--cwd-arg <name>] [--project]",description:"Analyze community shell tools (user scope by default)"},{usage:"tool remove <name...> [--project]",description:"Stop analyzing declared tools"},{usage:"tool list",description:"List declared command tools in both scopes"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},{flags:"--project",description:"Use project-scope rule config with rule tool"},{flags:"--cwd-arg",argument:"<name>",description:"Name the working-directory argument with rule tool add"},...Ko.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk","cc-safety-net rule tool add ops_bash","cc-safety-net rule tool add ops_run_background --cwd-arg cwd --project",...Jo,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var fa={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var ma={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var Ar=[fa,ra,pa,oa,Nt,Tr,ca,ua,da,la,ia,ma];function Zf(P){return P.aliases??[]}function _r(P){let G=P.toLowerCase();return Ar.find((K)=>K.name.toLowerCase()===G||Zf(K).some((Y)=>Y.toLowerCase()===G))}import{existsSync as qh}from"node:fs";import{basename as Xf}from"node:path";function Ir(P,G=7,K=U(P)){let Y=Date.now()-G*24*60*60*1000,Z=[],X=new Set,ie=0,ae,ge,ye,Pe;if(K)J(P,K);let Re={count:0},_e=K?Wn(K,Re):[];for(let Ie of _e)for(let je of Dt(Ie,Re)){if(je.decision==="allow")continue;let Oe=new Date(je.ts).getTime();if(Oe>=Y){if(ie++,X.add(je.sessionId??Xf(Ie,".jsonl")),ge===void 0||Oe<=ge)ae=je.ts,ge=Oe;if(Pe===void 0||Oe>Pe)ye=je.ts,Pe=Oe;Qf(Z,je,Oe)}}let Ae=Z.map((Ie)=>({timestamp:Ie.ts,command:Ie.command,reason:Ie.reason,relativeTime:Ws(new Date(Ie.ts))}));return{totalBlocked:ie,sessionCount:X.size,recentEntries:Ae,oldestEntry:ae,newestEntry:ye,unreadable:Re.count}}function Qf(P,G,K){let Y=P.findIndex((Z)=>K>new Date(Z.ts).getTime());if(Y===-1){if(P.length<3)P.push(G);return}if(P.splice(Y,0,G),P.length>3)P.pop()}import{dirname as um}from"node:path";import{dirname as em,join as nm,resolve as tm}from"node:path";var rm="config.json";function vn(P,G,K,Y){h(om(P),`${JSON.stringify(G,null,2)}
`,K,Y)}function om(P){return typeof P==="string"?ce(P):P}function Wo(P){return{errors:pe(sm(P),": "," "),ruleNames:new Set(Be(P).map((G)=>G.toLowerCase()))}}var im="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",ga="must match pattern (letters, numbers, hyphens, underscores)";function sm(P){if(!ya(P))return[e([],"Config must be an object")];return[...P.version===1?[]:[e(["version"],"must be 1")],...am(P.rules)]}function am(P){if(P===void 0)return[];if(!Array.isArray(P))return[e(["rules"],"must be an array")];return[...P.flatMap((G,K)=>ya(G)?lm(G,["rules",K]):[e(["rules",K],"must be an object")]),...He(P)]}function lm(P,G){return[...zo(P.name,[...G,"name"],"required string",p,im),...zo(P.command,[...G,"command"],"required string",E,ga),...P.subcommand===void 0?[]:zo(P.subcommand,[...G,"subcommand"],"must be a string if provided",E,ga),...cm(P.block_args,[...G,"block_args"]),...dm(P.reason,[...G,"reason"]),...P.intent===void 0||Le(P.intent)?[]:[e([...G,"intent"],Ne)]]}function zo(P,G,K,Y,Z){if(typeof P!=="string")return[e(G,K)];return Y.test(P)?[]:[e(G,Z)]}function cm(P,G){if(!Array.isArray(P))return[e(G,"required array")];if(P.length===0)return[e(G,"must have at least one element")];return P.flatMap((K,Y)=>{if(typeof K!=="string")return[e([...G,Y],"must be a string")];return K===""?[e([...G,Y],"must not be empty")]:[]})}function dm(P,G){if(typeof P!=="string")return[e(G,"required string")];if(P==="")return[e(G,"must not be empty")];return P.length>D?[e(G,`must be at most ${D} characters`)]:[]}function ya(P){return!!P&&typeof P==="object"&&!Array.isArray(P)}function Yo(P){let G=ha(P);if(!G.ok)return G.result;return Wo(G.parsed)}function ha(P){let G=[],K=new Set;try{let Y=typeof P==="string"?ce(P):P,Z=r(Y);if(Z===null)return G.push(`File not found: ${Y.path}`),{ok:!1,result:{errors:G,ruleNames:K}};if(!Z.trim())return G.push("Config file is empty"),{ok:!1,result:{errors:G,ruleNames:K}};return{ok:!0,parsed:JSON.parse(Z)}}catch(Y){if(Y instanceof o)return G.push(Y.message),{ok:!1,result:{errors:G,ruleNames:K}};let Z=Y instanceof Error?Y.message:String(Y);return G.push(Y instanceof SyntaxError?"Invalid JSON":Z),{ok:!1,result:{errors:G,ruleNames:K}}}}function Lt(P){return tm(P,".safety-net.json")}function Un(P){let G=ha(P);if(!G.ok)return G.result;let K=dt(G.parsed);return{errors:K.errors,ruleNames:K.sources}}function jt(P,G={}){return nm(em(ue(P,G)),rm)}function va(P,G,K){let Y;try{if(r(G)===null)return{path:P,exists:!1,valid:!1,ruleCount:0};Y=Un(G),Y.errors.push(...z(P,K))}catch(Z){if(!(Z instanceof o))throw Z;Y={errors:[Z.message],ruleNames:new Set}}return{path:P,exists:!0,valid:Y.errors.length===0,ruleCount:Y.ruleNames.size,...Y.errors.length>0?{errors:Y.errors}:{}}}function pm(P,G){return{source:G,name:P.name,command:P.command,subcommand:P.subcommand,blockArgs:[...P.block_args],reason:P.reason}}function ba(P,G){let K=W(P),Y=A(G),Z=um(K),X=te(P,{cwd:G,userConfigPath:K,projectConfigPath:Y,userConfigDir:Z}),ie=ee(P,{cwd:G,userConfigPath:K,projectConfigPath:Y,userConfigDir:Z}),ae=new Map(X.rulebooks.flatMap((ge)=>ge.rules.map((ye)=>[ye,ge.source])));return{userConfig:va(K,ie.userConfigTarget,ie.userScope),projectConfig:va(Y,ie.projectConfigTarget,ie.projectScope),effectiveRules:X.rules.map((ge)=>pm(ge,ae.get(ge.name)??"project"))}}var fm=[{flag:n.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:n.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:n.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:n.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:n.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:n.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:n.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:n.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"},{flag:n.projectTightenOnly,description:"Ignore project policy settings that weaken the user policy",defaultBehavior:"off"}];function wa(P){return[...fm.map((G)=>({name:G.flag.name,value:he(G.flag,P.env),isSet:wt(G.flag,P.env),legacyName:G.flag.legacyName,legacyValue:G.flag.legacyName?P.env.get(G.flag.legacyName):void 0,legacyIsSet:G.flag.legacyName?P.env.get(G.flag.legacyName)!==void 0:void 0,description:G.description,defaultBehavior:G.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:P.env.get("CC_SAFETY_NET_HOME"),isSet:P.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var ka={error:0,warning:1,info:2},mm=["policy","config","audit"];function gm(P){return P.map((G)=>{if(G==="ownership")return"is not owned by the current user";if(G==="permissions")return"has unsafe permissions";if(G==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var ym=[{derive:(P)=>P.hooks.length>0&&P.hooks.every((G)=>!G.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(P)=>P.hooks.filter((G)=>G.inspectionStatus==="failed").map((G)=>{let K=ln(G.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${K} inspection failed`,detail:`Doctor could not verify the ${K} integration configuration.`,fixHint:`Correct the reported ${K} configuration error, then run \`cc-safety-net doctor\` again.`,integration:G.platform}})},{derive:(P)=>P.userConfig.exists&&!P.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:P.userConfig.path}]:[]},{derive:(P)=>P.projectConfig.exists&&!P.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:P.projectConfig.path}]:[]},{derive:(P)=>P.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${P.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(P)=>P.v2Leftovers&&P.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${P.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(P)=>P.legacyConfigs&&P.legacyConfigs.length>0?[{checkId:"config.legacy-ignored",severity:"warning",title:"Legacy inline rule configs are ignored",detail:`CC Safety Net no longer loads these files, so their rules enforce nothing: ${P.legacyConfigs.join(", ")}.`,fixHint:"Run `cc-safety-net rule migrate` to convert them (add `--cleanup` to delete each file once it is converted), then rerun doctor."}]:[]},{derive:(P)=>{let G=P.environment.find((K)=>K.name==="CC_SAFETY_NET_AUDIT_SCOPE");return st(G?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...mm.map((P)=>({derive:(G)=>G.posture.directories.filter((K)=>K.kind===P&&K.status==="unsafe").map((K)=>({checkId:`posture.${P}-directory-unsafe`,severity:"error",title:`${P[0]?.toUpperCase()}${P.slice(1)} directory is unsafe`,detail:`The ${P} directory ${gm(K.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...K.path?{path:K.path}:{}}))})),{derive:(P)=>{let G=[...P.effectiveSafety.weakenedRuleOverrides].sort();return G.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${G.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${G.join(", ")}.`}]:[]}}];function Ca(P){return ym.flatMap((G,K)=>G.derive(P).map((Y,Z)=>({finding:Y,catalogOrder:K,occurrence:Z}))).sort((G,K)=>ka[G.finding.severity]-ka[K.finding.severity]||G.catalogOrder-K.catalogOrder||G.occurrence-K.occurrence).map((G)=>G.finding)}function Dn(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var hm=(P)=>Dn()?`\x1B[32m${P}\x1B[0m`:P,vm=(P)=>Dn()?`\x1B[33m${P}\x1B[0m`:P,bm=(P)=>Dn()?`\x1B[34m${P}\x1B[0m`:P,wm=(P)=>Dn()?`\x1B[36m${P}\x1B[0m`:P,km=(P)=>Dn()?`\x1B[31m${P}\x1B[0m`:P,Cm=(P)=>Dn()?`\x1B[2m${P}\x1B[0m`:P,xm=(P)=>Dn()?`\x1B[1m${P}\x1B[0m`:P,Qe={green:hm,yellow:vm,blue:bm,cyan:wm,red:km,dim:Cm,bold:xm},Pm="\x1B[0m",Sm=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function Rm(P){let G=P;return()=>(G=(G*1664525+1013904223)%4294967296,G/4294967296)}function Em(P){let G=[...Sm],K=Rm(P);for(let Y=G.length-1;Y>0;Y--){let Z=Math.floor(K()*(Y+1)),X=G[Y];G[Y]=G[Z],G[Z]=X}return G}function Tm(P,G=0){if(!Dn())return"";let K=Em(G);return`\x1B[38;5;${K[P%K.length]}m`}function xa(P,G,K=0){if(!Dn())return`"${P}"`;return`${Tm(G,K)}"${P}"${Pm}`}function Or(P){return P==="default"?"built-in default":`${P} policy`}var Am=new RegExp("\x1B\\[[0-9;]*m","g"),Zo=(P)=>P.replace(Am,"").length;function Yn(P){let G=(P.headers??P.rows[0]??[]).map((ie,ae)=>{let ge=Math.max(...P.rows.map((ye)=>Zo(ye[ae]??"")));return Math.max(Zo(ie),ge)}),K=(ie,ae)=>ie+" ".repeat(Math.max(0,ae-Zo(ie))),Y=(ie,ae)=>ae[0]+G.map((ge)=>ie.repeat(ge+2)).join(ae[1])+ae[2],Z=(ie)=>`│ ${ie.map((ae,ge)=>K(ae,G[ge]??0)).join(" │ ")} │`,X=P.headers?[`   ${Z(P.headers)}`,`   ${Y("─",["├","┼","┤"])}`]:[];return[`   ${Y("─",["┌","┬","┐"])}`,...X,...P.rows.map((ie)=>`   ${Z(ie)}`),`   ${Y("─",["└","┴","┘"])}`].join(`
`)}function Pa(P){let G=[];G.push("Hook Integration"),G.push(_m(P));let K=[],Y=[];for(let Z of P){let X=ln(Z.platform);if(Z.errors&&Z.errors.length>0)for(let ie of Z.errors)if(Z.configured)K.push({platform:X,message:ie});else Y.push({platform:X,message:ie})}for(let Z of K)G.push(`   Warning (${Z.platform}): ${Z.message}`);for(let Z of Y)G.push(Qe.red(`   Error (${Z.platform}): ${Z.message}`));return G.join(`
`)}function _m(P){let G=["Platform","Discovery","Configuration","Inspection"],K=P.map((Y)=>{let Z=ln(Y.platform);if(Y.inspectionStatus==="not-inspected"){let ge=Qe.dim("Not inspected");return[Z,ge,ge,ge]}let X=Y.detected?Qe.green("Detected"):Y.inspectionStatus==="failed"?Qe.red("Unknown"):Qe.dim("Not detected"),ie=Y.configured?Qe.green("Configured"):Y.detected?Qe.yellow("Not configured"):Y.inspectionStatus==="failed"?Qe.red("Unknown"):Qe.dim("Not applicable"),ae=Y.inspectionStatus==="verified"?Qe.green("Verified"):Y.inspectionStatus==="failed"?Qe.red("Failed"):Qe.dim("Not applicable");return[Z,X,ie,ae]});return Yn({headers:G,rows:K})}function Sa(P){let K=["Guard Engine Verification",`   Synthetic self-test: ${P.failed>0?Qe.red(`${P.passed}/${P.total} FAIL`):Qe.green(`${P.passed}/${P.total} passed`)}`],Y=P.results.filter((Z)=>!Z.passed);if(Y.length>0){K.push(""),K.push(Qe.red("   Failures:"));for(let Z of Y)K.push(Qe.red(`   • ${Z.description}`)),K.push(Qe.red(`     expected ${Z.expected}, got ${Z.actual}`))}return K.join(`
`)}function Im(P){if(P.length===0)return"   (no custom rules)";let G=["Source","Name","Command","Block Args"],K=P.map((Y)=>[Y.source,Y.name,Y.subcommand?`${Y.command} ${Y.subcommand}`:Y.command,Y.blockArgs.join(", ")]);return Yn({headers:G,rows:K})}function Ra(P){let G=[];if(G.push("Configuration"),G.push(Om(P.userConfig,P.projectConfig)),G.push(""),P.effectiveRules.length>0)G.push(`   Effective rules (${P.effectiveRules.length} total):`),G.push(Im(P.effectiveRules));else G.push("   Effective rules: (none - using built-in rules only)");return G.join(`
`)}function Om(P,G){let K=["Scope","Status"],Y=(X)=>{if(!X.exists)return Qe.dim("N/A");if(!X.valid)return Qe.red(`Invalid (${X.errors?.[0]??"unknown error"})`);return Qe.green("Configured")},Z=[["User",Y(P)],["Project",Y(G)]];return Yn({headers:K,rows:Z})}function Ea(P){let G=[];return G.push("Environment"),G.push($m(P)),G.join(`
`)}function Ta(P){let G=P.effectiveSafety.policyScopes,K=["Effective Safety",`   Selected preset: ${P.effectiveSafety.selectedPreset}${G?` (${Or(G.levelScope)})`:""}`,`   Effective: ${P.effectiveSafety.level}`],Y=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[Z,X]of Y){let ie=P.effectiveSafety.capabilities[Z],ae=ie.enabled?Qe.green("ON"):Qe.dim("OFF"),ge=ie.sources.length>0?` (${ie.sources.join(", ")})`:"";K.push(`   ${X}: ${ae} via ${ie.source}${ge}`)}if(G&&G.weakenings.length>0){K.push(`   Project policy deltas${G.weakeningsIgnored?" (ignored)":""}:`);for(let Z of G.weakenings)K.push(`      ${Z}`)}K.push(`   Stored rule customizations: ${P.effectiveSafety.ruleCounts.stored}`),K.push(`   Effective rule customizations: ${P.effectiveSafety.ruleCounts.effective}`);for(let[Z,X]of Object.entries(P.effectiveSafety.ruleOverrides))K.push(`   ${Z}: ${X}`);return K.join(`
`)}function Aa(P){let G=["Findings"];if(P.length===0)return G.push("   No findings from inspected doctor facts."),G.join(`
`);for(let K of P){let Y=`[${K.severity.toUpperCase()}] ${K.checkId}: ${mn(K.title)}`,Z=K.severity==="error"?Qe.red:K.severity==="warning"?Qe.yellow:Qe.blue;if(G.push(`   ${Z(Y)}`),G.push(`      ${mn(K.detail)}`),K.path)G.push(`      Path: ${mn(K.path)}`);if(K.fixHint)G.push(`      Fix: ${mn(K.fixHint)}`)}return G.join(`
`)}function $m(P){let G=["Variable","Status","Legacy"],K=P.map((Y)=>{let Z=Y.isSet?Qe.green("✓"):Qe.dim("✗"),X=Y.legacyName&&Y.legacyIsSet?`${Y.legacyName} ${Qe.green("✓")}`:Y.legacyName??"";return[Y.name,Z,X]});return Yn({headers:G,rows:K})}function _a(P){let G=[];if(P.totalBlocked===0)G.push("Recent Activity"),G.push("   No blocked commands in the last 7 days"),G.push("   Tip: This is normal for new installations");else G.push(`Recent Activity · last 7 days (${P.totalBlocked} blocked / ${P.sessionCount} sessions)`),G.push(Dm(P.recentEntries));if(P.unreadable>0)G.push(`   Warning: ${P.unreadable} audit log ${P.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return G.join(`
`)}function Dm(P){let G=["Time","Command"],K=P.map((Y)=>{let Z=mn(Y.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),X=Z.length>40?`${Z.slice(0,37)}...`:Z;return[Y.relativeTime,X]});return Yn({headers:G,rows:K})}function Ia(P){let G=[];if(G.push("Update Check"),P.latestVersion===null&&!P.error)return G.push($r([["Status",Qe.dim("Skipped")],["Installed",P.currentVersion]])),G.join(`
`);if(P.error)return G.push($r([["Status",`${Qe.yellow("⚠")} Error`],["Installed",P.currentVersion],["Error",Qe.dim(P.error)]])),G.join(`
`);if(P.updateAvailable)return G.push($r([["Status",`${Qe.yellow("⚠")} Update Available`],["Current",P.currentVersion],["Latest",Qe.green(P.latestVersion??"")]])),G.push(""),G.push("   Run: bunx cc-safety-net@latest doctor"),G.push("   Or:  npx cc-safety-net@latest doctor"),G.join(`
`);return G.push($r([["Status",`${Qe.green("✓")} Up to date`],["Version",P.currentVersion]])),G.join(`
`)}function $r(P){return Yn({rows:P})}function Oa(P){let G=[];return G.push("System Info"),G.push(Nm(P)),G.join(`
`)}function Nm(P){let G=["Component","Version"],K=(X)=>{if(X===null)return Qe.dim("not found");return X},Z=[{label:"cc-safety-net",value:P.version},...Er.map((X)=>({label:ln(X),value:P.versions[X]??null})),{label:"Node.js",value:P.nodeVersion},{label:"npm",value:P.npmVersion},{label:"Bun",value:P.bunVersion},{label:"Platform",value:P.platform}].map((X)=>[X.label,K(X.value)]);return Yn({headers:G,rows:Z})}function $a(P){if(P.findings.length===0)return Qe.green(`
No findings from inspected doctor facts.`);let G={error:P.findings.filter((X)=>X.severity==="error").length,warning:P.findings.filter((X)=>X.severity==="warning").length,info:P.findings.filter((X)=>X.severity==="info").length},K=["error","warning","info"].filter((X)=>G[X]>0).map((X)=>`${G[X]} ${X}`),Y=P.findings.length===1?"finding":"findings",Z=`
${P.findings.length} ${Y}: ${K.join(", ")}.`;if(G.error>0)return Qe.red(Z);if(G.warning>0)return Qe.yellow(Z);return Qe.blue(Z)}import{lstatSync as Lm}from"node:fs";import{dirname as Xo}from"node:path";function Qo(P,G){try{let K=Lm(G);if(K.isSymbolicLink())return{kind:P,path:G,status:"unsafe",issues:["symlink"]};if(!K.isDirectory())return{kind:P,path:G,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:P,path:G,status:"unknown",issues:[]};let Y=[...K.uid!==process.getuid()?["ownership"]:[],...(K.mode&18)!==0?["permissions"]:[]];return{kind:P,path:G,status:Y.length>0?"unsafe":"safe",issues:Y}}catch(K){if(typeof K==="object"&&K!==null&&"code"in K&&K.code==="ENOENT")return{kind:P,path:G,status:"not-applicable",issues:[]};return{kind:P,path:G,status:"unknown",issues:[]}}}function Da(P,G){let K=U(P);return{directories:[Qo("policy",Xo(Xo(G))),Qo("config",Xo(G)),...K?[Qo("audit",K)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as jm}from"node:child_process";import{existsSync as Na}from"node:fs";import{delimiter as Fm,extname as Hm,join as Mm}from"node:path";import{stripVTControlCharacters as La}from"node:util";var Fa="2.6.18",Um=5000,Bm="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function un(){return Fa}function ei(P,G){let K=P[G];if(K)return K;let Y=Object.keys(P).find((Z)=>Z.toLowerCase()===G.toLowerCase()&&!!P[Z]);return Y?P[Y]:K}function Gm(P){return(ei(P,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((G)=>G.length>0)}function qm(P,G){let K=Hm(P)?[P]:[...Gm(G).map((Y)=>`${P}${Y}`),P];if(P.includes("/")||P.includes("\\"))return K.find((Y)=>Na(Y))??P;return(ei(G,"PATH")??"").split(Fm).flatMap((Y)=>K.map((Z)=>Mm(Y,Z))).find((Y)=>Na(Y))??P}function ja(P){if(!/[\s"&|<>^]/.test(P))return P;return`"${P.replace(/"/g,'""')}"`}function Zn(P,G){let[K,...Y]=P,Z=G[Bm]==="win32"?"win32":process.platform;if(!K||Z!=="win32")return{cmd:K??"",args:Y};let X=qm(K,G);if(!/\.(?:bat|cmd)$/i.test(X))return{cmd:X,args:Y};return{cmd:ei(G,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",ja(X),...Y.map(ja)].join(" ")]}}var Ft=async(P,G=Um)=>{let K=await Vm(P,{timeoutMs:G});if(K.code!==0)return null;return La(K.stdout).trim()||La(K.stderr).trim()||null};function Vm(P,G){let[K,...Y]=P;if(!K)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((Z)=>{try{let X=Zn([K,...Y],process.env),ie=jm(X.cmd,X.args,{stdio:["ignore","pipe","pipe"]}),ae=!1,ge="",ye="";ie.stdout.on("data",(_e)=>{ge+=_e.toString()}),ie.stderr.on("data",(_e)=>{ye+=_e.toString()});let Pe=(_e)=>{if(ae)return;ae=!0,clearTimeout(Re),Z(_e)},Re=setTimeout(()=>{ie.kill(),Pe({code:null,stdout:ge,stderr:ye})},G.timeoutMs);ie.on("close",(_e)=>{Pe({code:_e,stdout:ge,stderr:ye})}),ie.on("error",()=>{Pe({code:null,stdout:ge,stderr:ye})})}catch{Z({code:null,stdout:"",stderr:""})}})}function Dr(P){if(!P)return null;let G=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(P);if(G)return G[1]??null;let K=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(P);if(K)return K[1]??null;return P.split(`
`)[0]?.trim()||null}async function Nr(P,G=Ft,K=process.cwd()){let Y=Promise.all(Sn.map(async(Re)=>[Re.id,Dr(await G([...Re.probeCommand]))])),[Z,X,ie,ae,ge,ye,Pe]=await Promise.all([Y,Y.then(async(Re)=>{let _e=Re.find(([je])=>je==="opencode")?.[1];if(!_e?.startsWith("2.")||!P(_e))return null;let Ae=["--param",`location[directory]=${K}`],Ie=["opencode","api","integration.list",...Ae];return await G(Ie,30000),G(["opencode","api","plugin.list",...Ae],30000)}),G(["codex","plugin","list"],30000),G(["amp","plugins","list"],30000),G(["node","--version"]),G(["npm","--version"]),G(["bun","--version"])]);return{version:Fa,versions:Object.fromEntries(Z),codexPluginListOutput:ie,ampPluginListOutput:ae,openCodePluginListOutput:X,nodeVersion:Dr(ge),npmVersion:Dr(ye),bunVersion:Dr(Pe),platform:`${process.platform} ${process.arch}`}}function ni(P,G){if(G==="dev")return!1;let K=P.split(".").map(Number),Y=G.split(".").map(Number),[Z=0,X=0,ie=0]=K,[ae=0,ge=0,ye=0]=Y;if(Z!==ae)return Z>ae;if(X!==ge)return X>ge;return ie>ye}async function Bn(){let P=un(),G=new AbortController,K=setTimeout(()=>G.abort(),3000);try{let Y=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:G.signal});if(!Y.ok)return{currentVersion:P,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${Y.status}`};let Z=await Y.json(),X=ni(Z.version,P);return{currentVersion:P,latestVersion:Z.version,updateAvailable:X}}catch(Y){return{currentVersion:P,latestVersion:null,updateAvailable:!1,error:Y instanceof Error?Y.message:"Network error"}}finally{clearTimeout(K)}}import*as Ka from"node:readline";var Ba=(P)=>`\x1B[${P}B`,Km=(P)=>`\x1B[${P}A`;var Ha=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function Jm(P){return new Promise((G)=>setTimeout(G,P))}function zm(P,G,K){if(!K)return G(P);if(K.aborted)return Promise.resolve();return new Promise((Y,Z)=>{let X=()=>K.removeEventListener("abort",ie),ie=()=>{X(),Y()};K.addEventListener("abort",ie,{once:!0}),G(P).then(()=>{X(),Y()},(ae)=>{X(),Z(ae)})})}function Lr(P){return Math.max(0,Math.min(1,P))}function Ht(P){return Math.max(0,Math.min(255,Math.round(P)))}function ti(P){return P<=0.0031308?12.92*P:1.055*P**0.4166666666666667-0.055}function Wm(P,G,K){let Y=K*Math.PI/180,Z=G*Math.cos(Y),X=G*Math.sin(Y),ie=(P+0.3963377774*Z+0.2158037573*X)**3,ae=(P-0.1055613458*Z-0.0638541728*X)**3,ge=(P-0.0894841775*Z-1.291485548*X)**3;return{blue:Ht(ti(Lr(-0.0041960863*ie-0.7034186147*ae+1.707614701*ge))*255),green:Ht(ti(Lr(-1.2684380046*ie+2.6097574011*ae-0.3413193965*ge))*255),red:Ht(ti(Lr(4.0767416621*ie-3.3077115913*ae+0.2309699292*ge))*255)}}function ri(P,G){let K=(G*P*180/Math.PI%360+360)%360;return Wm(0.72,0.15,K)}function Ga(P,G=0.1){let K=ri(G,P);return`\x1B[38;2;${K.red};${K.green};${K.blue}m`}function Ym(P,G){return{blue:Ht(P.blue+(255-P.blue)*G),green:Ht(P.green+(255-P.green)*G),red:Ht(P.red+(255-P.red)*G)}}function qa(P,G,K){let Y=Math.imul(P+2654435769,2246822507)^Math.imul(G+3266489909,668265263)^Math.imul(K+374761393,2654435761),Z=Y^Y>>>15,X=Math.imul(Z,739982445),ie=X^X>>>12,ae=Math.imul(ie,695872825);return((ae^ae>>>15)>>>0)/4294967296}function Zm(P,G,K){let Y=Math.floor(qa(P,G,K)*Ha.length);return Ha[Y]??"░"}function Ma(P){let G=Lr(P);return G*G*G*(G*(G*6-15)+10)}function Xm(P){if(P.length===0)return"";let G=[],K=!1,Y="";for(let Z of P){let X=`${Z.red};${Z.green};${Z.blue}`;if(Z.bold!==K)G.push(Z.bold?"\x1B[1m":"\x1B[22m"),K=Z.bold;if(X!==Y)G.push(`\x1B[38;2;${X}m`),Y=X;G.push(Z.character)}return`${G.join("")}\x1B[22m\x1B[39m`}function Qm(P,G,K,Y,Z){return P.map((X,ie)=>({...ri(K,Y+G+ie/Z),bold:!1,character:X}))}function eg(P,G,K,Y,Z,X,ie,ae){let ge=Math.max(1,Y*0.75),ye=Math.min(1,K/ge),Pe=Z*Ma(ye),Re=Math.max(0,(K-ge)/Math.max(1,Y-ge)),_e=(1-Ma(K/Y))*ae*2,Ae=0.35*Math.max(0,1-Re*2),Ie=ye>=1,je=Math.min(P.length,Math.ceil(Pe+2+1));return P.slice(0,je).map((Oe,Ve)=>{let nn=ri(X,ie+G+Ve/ae+_e),rn=Ve+qa(G,Ve,7919)*2-1;if(rn>Pe+2)return{...nn,bold:!1,character:" "};let an=Pe-rn,en=0.8*Math.exp(-(an*an)/12.5),on=Math.min(0.9,en+Ae),xn=!Ie&&rn>Pe-4;return{...Ym(nn,on),bold:on>0.3,character:xn?Zm(G,Ve,K):Oe}})}function Ua(P){return`\x1B[?2026h${P.map((G,K)=>`\x1B8${K>0?Ba(K):""}${Xm(G)}`).join("")}\x1B[?2026l`}async function oi(P,G={}){if(!P)return;let K=G.output??process.stdout,Y=G.sleep??Jm,Z=G.seed??0,X=P.split(`
`).map((Pe)=>Array.from(Pe)),ie=Math.max(...X.map((Pe)=>Pe.length)),ae=12000*X.filter((Pe)=>Pe.length>0).length/40,ge=ie>0?Math.max(1,Math.ceil(ae/16.666666666666668)):0,ye=ge>0?ae/ge:0;K.write(`\x1B[?25l${X.length>1?`${`
`.repeat(X.length-1)}${Km(X.length-1)}`:""}\x1B7`);try{for(let Pe=1;Pe<=ge;Pe+=1){if(G.signal?.aborted)break;K.write(Ua(X.map((Re,_e)=>eg(Re,_e,Pe,ge,ie,0.1,Z,3)))),await zm(ye,Y,G.signal)}}finally{if(K.write(Ua(X.map((Pe,Re)=>Qm(Pe,Re,0.1,Z,3)))),K.write("\x1B8"),X.length>1)K.write(Ba(X.length-1));K.write(`
\x1B[0m\x1B[?25h`)}}var Va=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function ng(P){return Boolean(P.isTTY)}async function nr(P={}){let G=P.output??process.stdout;if(!ng(G))return;let K=P.input??process.stdin,Y={output:G,seed:P.seed??Math.random()*8192,sleep:P.sleep};if(!K.isTTY||typeof K.setRawMode!=="function"){await oi(Va,Y);return}let Z=new AbortController,X=K.readableFlowing===!0,ie=K.isRaw===!0,ae=!1,ge=(ye,Pe)=>{if(Pe.ctrl&&Pe.name==="c")ae=!0;if(ae||Pe.name==="return"||Pe.name==="enter")Z.abort()};Ka.emitKeypressEvents(K),K.on("keypress",ge),K.setRawMode(!0),K.resume();try{await oi(Va,{...Y,signal:Z.signal})}finally{if(K.off("keypress",ge),K.setRawMode(ie),!X)K.pause()}if(!ae)return;if(P.onInterrupt){P.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as ig}from"node:crypto";import{existsSync as za}from"node:fs";import{dirname as jr,join as Wa}from"node:path";import{dirname as Ja,join as tg}from"node:path";var rg="rule.lock";function og(P){return tg(Ja(P),rg)}function hn(P,G){let K=G.global?G.userConfigPath??W(P,G):G.projectConfigPath??A(G.cwd??process.cwd()),Y=G.global?lt(P,G):ut(K,G.cwd??process.cwd()),Z=og(K);return{configDir:Ja(K),configPath:K,lockPath:Z,filesystemScope:Y,configTarget:i(Y,K),lockTarget:i(Y,Z)}}var sg="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",ag="cache",lg="rulebooks";function Ya(P,G={}){let K=hn(P,G),Y=i(K.filesystemScope,Xa(K.configDir)),Z=r(K.lockTarget);if(console.log(sg),Z===null&&!za(Y.path))return console.log(`No v2 lock or cache leftovers found in ${jr(K.configDir)}; nothing to migrate.`),0;let X=fg(Z),ie=d(K.configTarget);if(!ie.config&&(r(K.configTarget)!==null||X.size>0))return console.error(`Cannot migrate: the rules config in ${jr(K.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let ae=ie.config?.rules??[];for(let ge of ae.flatMap((ye)=>cg(ye,X,K,Y,G.global===!0)))console.log(ge);return B(K.lockTarget),Et(Y),console.log(`Removed the v2 lock and cache under ${jr(K.configDir)}.`),0}function Za(P,G){return[...new Set([{cwd:G},{cwd:G,global:!0}].flatMap((K)=>{let Y=hn(P,K);return[Y.lockPath,Xa(Y.configDir)]}))].filter((K)=>za(K))}function cg(P,G,K,Y,Z){if(!C(P))return[];let X=L(P).name,ie=i(K.filesystemScope,M(K.configDir,X)),ae=r(ie);if(ae!==null&&dg(ae,X))return[];let ge=G.get(P),ye=ge?ug(ge,X,Y.path,K.filesystemScope):null;if(ye===null)return[`Could not migrate ${P} from the v2 cache. Run \`cc-safety-net rule update ${P}${Z?" --global":""}\` to vendor it.`];if(h(ie,ye),ae!==null)return[`Restored ${P} from the v2 cache over an invalid file.`];return[`Vendored ${P} from the v2 cache.`]}function dg(P,G){let K=Ee(P);return!("problem"in K)&&K.rulebook.name===G}function ug(P,G,K,Y){let Z=Wa(K,lg,`${pg(P)}--${P.digest.replace("sha256:","").slice(0,12)}`,be),X=r(i(Y,Z));if(X===null||yg(X)!==P.digest)return null;let ie=Ee(X);if("problem"in ie||ie.rulebook.name!==G)return null;return X}function Xa(P){return Wa(jr(P),ag)}function pg(P){return([P.owner,P.repo,P.display_ref,P.name].every((Y)=>typeof Y==="string"&&Y!=="")?`${P.owner}/${P.repo}#${P.display_ref}/${P.name}`:P.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function fg(P){let G=P===null?null:gg(P),K=Qa(G)&&Array.isArray(G.rulebooks)?G.rulebooks:[];return new Map(K.filter(mg).map((Y)=>[Y.spec,Y]))}function mg(P){return Qa(P)&&typeof P.spec==="string"&&typeof P.digest==="string"}function Qa(P){return!!P&&typeof P==="object"}function gg(P){try{return JSON.parse(P)}catch{return null}}function yg(P){return`sha256:${ig("sha256").update(P).digest("hex")}`}var el="\r\x1B[2K",hg="\x1B[?25l",vg="\x1B[39m",bg="\x1B[?25h",wg=100,kg=0.55,Cg=80,nl=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function xg(P){return new Promise((G)=>setTimeout(G,P))}async function Fr(P,G={}){let K=G.output??process.stdout;if(!K.isTTY)return P;let Y=G.sleep??xg,Z=!1,X=P.then((ae)=>(Z=!0,ae),(ae)=>{throw Z=!0,ae});if(await Promise.race([X.then(()=>!0),Y(wg).then(()=>!1)]))return X;K.write(hg);try{for(let ae=0;!Z;ae+=1)K.write(`${el}${Ga(ae*kg)}${nl[ae%nl.length]}${vg} ${G.loadingMessage??"Loading…"}`),await Promise.race([X,Y(Cg)]);return await X}finally{K.write(`${el}${bg}`)}}async function tr(P,G,K,Y={}){let Z=G();if(P)await K();if(P&&Z.ready)await Fr(Z.ready,Y);return Z.finish()}import{stripVTControlCharacters as Pg}from"node:util";var Hr="amp plugins list",Sg=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function tl(P){if(!P.ampPluginListOutput)return{platform:"amp",status:"n/a"};let G=Pg(P.ampPluginListOutput).split(`
`).map((K)=>Sg.exec(K)?.[1]).find((K)=>K!==void 0);if(!G)return{platform:"amp",status:"n/a"};if(G!=="active")return{platform:"amp",status:"disabled",method:Hr,configPath:Hr,errors:[`Amp personal plugin cc-safety-net is ${G}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:Hr,configPath:Hr}}import{existsSync as Og,readFileSync as $g}from"node:fs";import{isAbsolute as bP,join as Ig}from"node:path";function rr(P){return Ig(P,".gemini","config","hooks.json")}var ol=new Map([["run_command","auto"]]),il="manage_task";var Dg=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function Ng(P){if(!P||typeof P!=="object"||Array.isArray(P))return[];return Object.values(P).flatMap((G)=>{if(!G||typeof G!=="object"||Array.isArray(G))return[];let K=G,Y=K.PreToolUse;if(!Array.isArray(Y))return[];return Y.flatMap((Z)=>{if(!Z||typeof Z!=="object"||Array.isArray(Z))return[];let X=Z.hooks;if(!Array.isArray(X))return[];return X.flatMap((ie)=>{if(!ie||typeof ie!=="object"||Array.isArray(ie))return[];let ae=ie.command;if(typeof ae!=="string"||!Dg.test(ae))return[];return[{command:ae,enabled:K.enabled!==!1}]})})})}function sl(P){let G=rr(P.environment.home);if(!Og(G))return{platform:"antigravity-cli",status:"n/a",configPath:G};let K;try{K=Ng(JSON.parse($g(G,"utf-8")))}catch(Y){return{platform:"antigravity-cli",status:"n/a",configPath:G,errors:[`Failed to parse Antigravity hooks config ${G}: ${Y instanceof Error?Y.message:String(Y)}`]}}if(K.some((Y)=>Y.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:G};if(K.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:G};return{platform:"antigravity-cli",status:"n/a",configPath:G}}import{existsSync as Mg}from"node:fs";import{join as Ln}from"node:path";import{existsSync as Lg,lstatSync as jg,readFileSync as Fg}from"node:fs";import{join as Hg}from"node:path";function yn(P,G=(K)=>K){if(!Lg(P))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(G(Fg(P,"utf-8")))}}catch{return{kind:"unreadable"}}}function Nn(P,G){if(P==="~")return G;if(P.startsWith("~/")||P.startsWith("~\\"))return Hg(G,P.slice(2));return P}function cn(P){try{return jg(P)}catch{return}}function Gr(P,G){let K=cn(G);if(!K)return{platform:P,status:"n/a",configPath:G};if(!K.isSymbolicLink()&&K.isDirectory())return;return{platform:P,status:"n/a",configPath:G,errors:[`${G} is a symlink or not a directory; move or remove it before installing`]}}function Fe(P,G){return typeof P==="object"&&P!==null?P[G]:void 0}var qr="cc-safety-net@cc-marketplace";function Vr(P){return P.env.get("CLAUDE_CONFIG_DIR")||Ln(P.home,".claude")}function al(P){return Ln(P.env.get("CLAUDE_CODE_PLUGIN_CACHE_DIR")||Ln(Vr(P),"plugins"),"installed_plugins.json")}function ll(P,G){let K=Fe(Fe(P,"plugins"),G);return Array.isArray(K)&&K.length>0}function Kr(P,G){let K=yn(al(P));return K.kind==="ok"&&ll(K.value,G)}function ai(P){return cl(al(P),Ln(Vr(P),"settings.json"))}function cl(P,G){let K=yn(P);if(K.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(K.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!ll(K.value,qr))return{platform:"claude-code",status:"n/a"};let Y=yn(G);if(Y.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(Y.kind==="ok"&&Fe(Fe(Y.value,"enabledPlugins"),qr)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:G,errors:[`${qr} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:P}}function dl(P){let G=Ln(P.home,".claude"),K=Ln(G,"plugins","installed_plugins.json");if(cl(K,Ln(G,"settings.json")).status!=="configured")return;let Y=yn(K),Z=Y.kind==="ok"?Fe(Fe(Y.value,"plugins"),qr):void 0,X=(Array.isArray(Z)?Z:[]).filter((ye)=>Fe(ye,"scope")==="user").map((ye)=>Fe(ye,"installPath")).find((ye)=>typeof ye==="string");if(!X)return;let ie=Ln(X,".cursor-plugin","plugin.json"),ae=yn(ie),ge=ae.kind==="ok"?Fe(ae.value,"hooks"):void 0;return typeof ge==="string"&&Mg(Ln(X,ge))?ie:void 0}function ul(P){return ai(P.environment)}var pl="Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it.";function fl(P){if(!P.codexPluginListOutput)return{platform:"codex",status:"n/a"};let G=P.codexPluginListOutput.split(`
`).find((K)=>K.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!G)return{platform:"codex",status:"n/a"};if(!G.includes("installed,"))return{platform:"codex",status:"n/a"};if(!G.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex runs only trusted hooks, and doctor cannot check trust. Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."]}}import{existsSync as Yr,readdirSync as Ug,readFileSync as Bg}from"node:fs";import{join as bn}from"node:path";function gn(P){let G="",K=0,Y=!1,Z=!1,X=-1;while(K<P.length){let ie=P[K],ae=P[K+1];if(Z){G+=ie,Z=!1,K++;continue}if(ie==='"'&&!Y){Y=!0,X=-1,G+=ie,K++;continue}if(ie==='"'&&Y){Y=!1,G+=ie,K++;continue}if(ie==="\\"&&Y){Z=!0,G+=ie,K++;continue}if(Y){G+=ie,K++;continue}if(ie==="/"&&ae==="/"){while(K<P.length&&P[K]!==`
`)K++;continue}if(ie==="/"&&ae==="*"){K+=2;while(K<P.length-1){if(P[K]==="*"&&P[K+1]==="/"){K+=2;break}K++}continue}if(ie===","){X=G.length,G+=ie,K++;continue}if(ie==="}"||ie==="]"){if(X!==-1){let ge=G.slice(X+1);if(/^\s*$/.test(ge))G=G.slice(0,X)+ge}X=-1,G+=ie,K++;continue}if(!/\s/.test(ie))X=-1;G+=ie,K++}return G}function gl(P,G,K){let Y=G+1,Z=!1;while(Y<P.length){if(Z){Z=!1,Y++;continue}if(P[Y]==="\\"){Z=!0,Y++;continue}if(P[Y]==='"')return Y+1;Y++}throw Error(K)}function ci(P,G,K){let Y=P[G],Z=Y==="["?"]":"}",X=0,ie=G;while(ie<P.length){let ae=K.skipComment?.(P,ie)??ie;if(ae!==ie){ie=ae;continue}if(P[ie]==='"'){ie=gl(P,ie,K.stringError);continue}if(P[ie]===Y)X++;if(P[ie]===Z){if(X--,X===0)return ie}ie++}throw Error(K.bracketError)}function yl(P,G){let K=P.lastIndexOf(`
`,G)+1;return/^[ \t]*/.exec(P.slice(K))?.[0]??""}function hl(P,G){let K=G.end+(/^\s*/.exec(P.slice(G.end))?.[0].length??0);if(P[K]===","){let ie=P[K+1]===`
`?K+2:K+1;return`${P.slice(0,G.start)}${P.slice(ie)}`}let Y=P.slice(0,G.start).search(/\s*$/)-1;if(P[Y]!==",")return`${P.slice(0,G.start)}${P.slice(G.end)}`;let Z=P.lastIndexOf(`
`,Y-1),X=Z!==-1&&/^\s*$/.test(P.slice(Z+1,Y))?Z:Y;return`${P.slice(0,X)}${P.slice(G.end)}`}function li(P,G){if(P.startsWith("//",G)){let K=P.indexOf(`
`,G+2);return K===-1?P.length:K+1}if(P.startsWith("/*",G)){let K=P.indexOf("*/",G+2);return K===-1?P.length:K+2}return G}function ml(P,G){let K=G;while(K<P.length){if(/\s/.test(P[K]??"")){K++;continue}let Y=li(P,K);if(Y===K)return K;K=Y}return K}function vl(P,G,K){let Y=0,Z=0;while(Z<P.length){let X=li(P,Z);if(X!==Z){Z=X;continue}if(P[Z]==='"'){let ie=gl(P,Z,K.stringError);if(Y===1&&JSON.parse(P.slice(Z,ie))===G){let ae=ml(P,ie),ge=ml(P,ae+1);if(P[ae]===":"&&P[ge]==="[")return{start:ge,end:ci(P,ge,{skipComment:li,...K})}}Z=ie;continue}if(P[Z]==="{"||P[Z]==="[")Y++;if(P[Z]==="}"||P[Z]==="]")Y--;Z++}return}var An="cc-safety-net@cc-marketplace",Jr=["cc-marketplace","cc-safety-net"],bl=["_direct","copilot-safety-net"],wl=["cc-marketplace","safety-net"],kl="safety-net@cc-marketplace";function zr(P,G){let K=G.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${K}([^a-z0-9-]|$)`,"m").test(P??"")}function Cl(P){return zr(P,"cc-safety-net@cc-marketplace")}function xl(P){return zr(P,"cc-marketplace")}function Pl(P){return zr(P,"copilot-safety-net")}function Sl(P){return zr(P,"safety-net@cc-marketplace")}function Wr(P){if(!P?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(P)}function El(P,G){if(!P)return null;let K=P.match(/(\d+)\.(\d+)\.(\d+)/);if(!K)return null;let Y=[Number(K[1]),Number(K[2]),Number(K[3])];for(let Z=0;Z<G.length;Z++){let X=Y[Z]??0,ie=G[Z]??0;if(X!==ie)return X>ie}return!0}function Gg(P){return El(P,[0,0,422])}function qg(P){return El(P,[1,0,8])}function sr(P){return P.env.get("COPILOT_HOME")||bn(P.home,".copilot")}function Tl(P){return P.disableAllHooks!==!0&&Al(P)}function Al(P){return(P.hooks?.preToolUse??[]).some((K)=>{if(K.type!==void 0&&K.type!=="command")return!1;return Wr(K.command)||Wr(K.bash)||Wr(K.powershell)||Wr(K.exec&&[K.exec,...K.args??[]].join(" "))})}function or(P){return P===void 0||typeof P==="string"}function Vg(P){return P===void 0||Array.isArray(P)&&P.every((G)=>typeof G==="string")}function Kg(P){if(!P||typeof P!=="object"||Array.isArray(P))return!1;let G=P;if(G.disableAllHooks!==void 0&&typeof G.disableAllHooks!=="boolean")return!1;if(G.hooks===void 0)return!0;if(!G.hooks||typeof G.hooks!=="object"||Array.isArray(G.hooks))return!1;let K=G.hooks.preToolUse;if(K===void 0)return!0;return Array.isArray(K)&&K.every((Y)=>Y!==null&&typeof Y==="object"&&!Array.isArray(Y)&&or(Y.type)&&or(Y.command)&&or(Y.bash)&&or(Y.powershell)&&or(Y.exec)&&Vg(Y.args))}function di(P,G){try{let K=JSON.parse(gn(Bg(P,"utf-8")));if(!Kg(K)){G?.push(`Invalid hook config ${P}: hooks.preToolUse must be an array of hook objects`);return}return K}catch(K){G?.push(`Failed to parse ${P}: ${K instanceof Error?K.message:String(K)}`);return}}function _l(P,G){try{return Ug(P).filter((K)=>K.endsWith(".json")).sort((K,Y)=>K.localeCompare(Y))}catch(K){return G?.push(`Failed to read ${P}: ${K instanceof Error?K.message:String(K)}`),[]}}function Jg(P,G){if(!Yr(P))return[];let K=[];for(let Y of _l(P,G)){let Z=bn(P,Y),X=di(Z,G);if(X&&Tl(X))K.push(Z)}return K}function ir(P,G){if(!Yr(P))return;let K=di(P,G);if(!K)return;return{path:P,config:K}}function Rl(P,G,K,Y){if(G){P.push(`GitHub Copilot CLI ${G} does not support ${K}; requires ${Y}+`);return}P.push(`GitHub Copilot CLI version unavailable; skipping ${K} because it requires ${Y}+`)}function zg(P){for(let G of P){if(G?.config.disableAllHooks===!0)return G.path;if(G?.config.disableAllHooks===!1)return}return}function Wg(P,G,K,Y){let Z=sr(P),X=bn(G,".github","hooks"),ie=bn(Z,"hooks"),ae=bn(G,".github","copilot"),ge=bn(G,".claude"),ye=qg(K),Pe=ye===!0?Y:void 0,Re=[ir(bn(ae,"settings.local.json"),Pe),ir(bn(ae,"settings.json"),Pe),ir(bn(ge,"settings.local.json"),Pe),ir(bn(ge,"settings.json"),Pe)],_e=ir(bn(Z,"settings.json"),Pe),Ae=[_e?.config.disableAllHooks===!0?void 0:_e];if(ye!==!1){let en=zg(Re);if(en){if(ye===null)Y.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${en} as active`);return{activeConfigPaths:[],repoInlineSources:Re,disabledBy:en}}}let Ie=Jg(X,Y),je=Gg(K),Oe=je===!0?Y:void 0,Ve=Yr(ie)?_l(ie,Oe):[],nn=[];for(let en of Ve){let on=bn(ie,en),xn=di(on,Oe);if(xn&&Tl(xn))nn.push(on)}if(je!==!0&&nn.length>0)Rl(Y,K,`user hook files in ${ie}`,"0.0.422"),nn.length=0;let rn=[];for(let en of[...Re,...Ae]){if(!en)continue;if(!Al(en.config))continue;if(ye===!0){rn.push(en);continue}Rl(Y,K,"inline hook definitions in Copilot config files","1.0.8");break}let an=(en)=>en.filter((on)=>!!on&&rn.includes(on)).map((on)=>on.path);return{activeConfigPaths:[...an(Re),...Ie,...an(Ae),...nn],repoInlineSources:Re}}function Il(P){let G=[],K=Wg(P.environment,P.cwd,P.copilotCliVersion,G);if(K.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:K.disabledBy,configPaths:[K.disabledBy],errors:G.length>0?G:void 0};let Y=sr(P.environment),Z=bn(Y,"installed-plugins",...Jr),X=Yr(Z),ie=bn(Y,"settings.json"),ae=yn(ie,gn),ge=(Ae)=>Fe(Fe(Ae,"enabledPlugins"),An),ye=K.repoInlineSources.find((Ae)=>typeof ge(Ae?.config)==="boolean"),Pe=ye??(ae.kind==="ok"?{path:ie,config:ae.value}:void 0);if(X&&!ye&&ae.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};let Re=X&&Pe!==void 0&&ge(Pe.config)===!1;if(Re&&K.activeConfigPaths.length===0)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:Pe.path,errors:[`${An} is installed but not enabled in Copilot CLI`]};let _e=X&&!Re;if(_e||K.activeConfigPaths.length>0){let Ae=K.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:_e?"plugin config":"hook config",configPath:Ae??(_e?Z:void 0),configPaths:K.activeConfigPaths.length>0?K.activeConfigPaths:void 0,errors:G.length>0?G:void 0}}return{platform:"copilot-cli",status:"n/a",errors:G.length>0?G:void 0}}import{existsSync as vi,readdirSync as cy,readFileSync as dy}from"node:fs";import{join as hi}from"node:path";import{existsSync as gi,mkdirSync as ty,readFileSync as ry,rmSync as oy}from"node:fs";import{dirname as iy,join as Zr}from"node:path";import{existsSync as Yg,renameSync as Zg,statSync as Xg,writeFileSync as Qg}from"node:fs";function sn(P,G){let K=`${P}.${process.pid}.tmp`;Qg(K,G,Yg(P)?{mode:Xg(P).mode&511}:{}),Zg(K,P)}import{spawn as ey}from"node:child_process";function ny(P){return P.join(" ")}function ui(P,G,K){return[`Failed to run ${ny(P)}${G===null?"":` (exit ${G})`}.`,K.trim()].filter(Boolean).join(`
`)}function pi(P){let G={stdout:"",stderr:""};return P.stdout.setEncoding("utf-8"),P.stderr.setEncoding("utf-8"),P.stdout.on("data",(K)=>{G.stdout+=K}),P.stderr.on("data",(K)=>{G.stderr+=K}),G}function pn(P,G){return new Promise((K,Y)=>{let Z=Zn([...P],process.env),X=ey(Z.cmd,Z.args,{stdio:["ignore","pipe","pipe"]}),ie=pi(X),ae=()=>[ie.stdout,ie.stderr].filter(Boolean).join(`
`),ge=G?.timeoutMs??120000,ye=setTimeout(()=>{X.kill(),Y(Error(ui(P,null,`Timed out after ${ge}ms.
${ae()}`.trim())))},ge);X.on("error",(Pe)=>{clearTimeout(ye),Y(Error(ui(P,null,`${Pe.message}
${ae()}`.trim())))}),X.on("close",(Pe)=>{if(clearTimeout(ye),Pe!==0){Y(Error(ui(P,Pe,ae())));return}K(G?.stdoutOnly?ie.stdout:ae())})})}async function fi(P){for(let G of P)await pn(G)}async function Ol(P){for(let G of P)try{await pn(G)}catch(K){console.warn(K instanceof Error?K.message:String(K))}}var wn=Object.fromEntries(er.map((P)=>[P.id,`npx -y cc-safety-net hook ${P.flags[1]}`]));var lr=wn.cursor,$l=30;function Qr(P){return Zr(P.home,".cursor","hooks.json")}var ar="cc-safety-net";function yi(P){let G=Zr(P.home,".cursor","plugins");return{cache:Zr(G,"cache",ar),marketplaceClone:Zr(G,"marketplaces","github.com","kenryu42","cc-safety-net")}}async function Dl(P){let G=Object.values(yi(P));if(!G.some((Y)=>gi(Y)))return;let K="No marketplace matches";return await pn(["cursor-agent","plugin","marketplace","remove",ar]).catch((Y)=>{if(!(Y instanceof Error&&Y.message.includes(K)))throw Y}),G.forEach((Y)=>oy(Y,{recursive:!0,force:!0})),[`Removed the ${ar} marketplace from your Cursor account.`,"If /plugins in cursor-agent still lists CC Safety Net as installed, uninstall it there."].join(`
`)}function Qn(P){return typeof P==="object"&&P!==null&&!Array.isArray(P)}function mi(){return{command:lr,timeout:$l,failClosed:!0}}function Xr(P){return Qn(P)&&P.command===lr}function sy(P){return Object.keys(P).length===3&&P.command===lr&&P.timeout===$l&&P.failClosed===!0}function ay(P){try{return JSON.parse(ry(P,"utf-8"))}catch(G){if(G instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${P}: ${G.message}`);throw G}}function Nl(P){let G=ay(P);if(!Qn(G))throw Error(`Cursor hooks config ${P} must be a JSON object`);if(G.version!==1)throw Error(`Cursor hooks config ${P} must set "version": 1`);if(G.hooks!==void 0&&!Qn(G.hooks))throw Error(`Cursor hooks config ${P} "hooks" must be an object`);let K=Qn(G.hooks)?G.hooks.preToolUse:void 0;if(K!==void 0&&!Array.isArray(K))throw Error(`Cursor hooks config ${P} "hooks.preToolUse" must be an array`);return G}function Ll(P){let G=Qn(P.hooks)?P.hooks.preToolUse:void 0;return Array.isArray(G)?G:[]}function ly(P){if(!P.some(Xr))return[...P,mi()];return P.reduce((G,K)=>{if(!Xr(K))return G.result.push(K),G;if(!G.inserted)G.result.push(mi()),G.inserted=!0;return G},{result:[],inserted:!1}).result}function jl(P,G,K){let Y=Qn(G.hooks)?G.hooks:{},Z={...G,hooks:{...Y,preToolUse:K}};sn(P,`${JSON.stringify(Z,null,2)}
`)}function Fl(P){let G=Qr(P);if(!gi(G))return ty(iy(G),{recursive:!0}),sn(G,`${JSON.stringify({version:1,hooks:{preToolUse:[mi()]}},null,2)}
`),{path:G,alreadyInstalled:!1};let K=Nl(G),Y=Ll(K),Z=Y.filter(Xr);if(Qn(K.hooks)&&Array.isArray(K.hooks.preToolUse)&&Z.length===1&&Z[0]!==void 0&&sy(Z[0]))return{path:G,alreadyInstalled:!0};return jl(G,K,ly(Y)),{path:G,alreadyInstalled:!1}}function Hl(P){let G=Qr(P);if(!gi(G))return{path:G,alreadyInstalled:!1};let K=Nl(G),Y=Ll(K),Z=Y.filter((X)=>!Xr(X));if(Z.length===Y.length)return{path:G,alreadyInstalled:!1};return jl(G,K,Z),{path:G,alreadyInstalled:!0}}function uy(P){if(!P||typeof P!=="object"||Array.isArray(P))return[];let G=P.hooks;if(!G||typeof G!=="object"||Array.isArray(G))return[];let K=G.preToolUse;if(!Array.isArray(K))return[];return K.filter((Y)=>!!Y&&typeof Y==="object"&&!Array.isArray(Y)&&Y.command===lr)}function py(P){let G=[];if(P.length>1)G.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let K=P[0];if(K&&K.failClosed!==!0)G.push('Managed hook is missing "failClosed": true; reinstall to repair');if(K&&K.timeout!==30)G.push('Managed hook "timeout" is not 30; reinstall to repair');return G}var eo="Claude Code plugin",bi="Cursor plugin";function fy(P){let G=hi(yi(P).cache,ar);if(!vi(G))return{};try{return{version:cy(G).map((K)=>hi(G,K)).find((K)=>vi(hi(K,".cache-complete")))}}catch{return{unreadable:G}}}function my(P,G){if(G){let Z=["Cursor records enabled plugins on your Cursor account, which doctor cannot check, and keeps a plugin's files after it is uninstalled.","Cursor pins marketplace plugins to the commit they were added at, so `cc-safety-net update` cannot update this plugin, while the npx hook (`cc-safety-net install --cursor`) stays current."].join(" ");return{method:bi,configPath:G,duplicate:`The Cursor plugin also runs this check, so every tool call is checked twice. ${Z} If the plugin is installed, run \`cc-safety-net uninstall --cursor\`, uninstall CC Safety Net from /plugins in cursor-agent, then run \`cc-safety-net install --cursor\`.`,alone:`${Z} If /plugins in cursor-agent does not list CC Safety Net as installed, run \`cc-safety-net install --cursor\`.`}}let K=dl(P);if(!K)return;let Y="Cursor runs the Claude Code plugin only while it imports Claude Code plugins, which doctor cannot check.";return{method:eo,configPath:K,duplicate:`The Claude Code plugin also runs this check in Cursor, so every tool call is checked twice. ${Y} If Cursor runs it, run \`cc-safety-net uninstall --cursor\` to remove this hook.`,alone:`${Y} If it stops, run \`cc-safety-net install --cursor\`.`}}function Ml(P){let G=gy(P),K=fy(P.environment);if(K.unreadable)return G.status==="configured"?{...G,errors:[...G.errors??[],`Cannot read ${K.unreadable}, so doctor cannot tell whether the Cursor plugin also runs this check.`]}:{platform:"cursor",status:"not-inspected"};let Y=my(P.environment,K.version);if(!Y)return G;if(G.status==="configured")return{...G,errors:[...G.errors??[],Y.duplicate]};return{platform:"cursor",status:"configured",method:Y.method,configPath:Y.configPath,errors:[...G.errors??[],Y.alone]}}function gy(P){let G=Qr(P.environment);if(!vi(G))return{platform:"cursor",status:"n/a",configPath:G};let K;try{K=JSON.parse(dy(G,"utf-8"))}catch(X){return{platform:"cursor",status:"n/a",configPath:G,errors:[`Failed to parse Cursor hooks config ${G}: ${X instanceof Error?X.message:String(X)}`]}}let Y=uy(K);if(Y.length===0)return{platform:"cursor",status:"n/a",configPath:G};let Z=py(Y);return{platform:"cursor",status:"configured",method:"hook config",configPath:G,errors:Z.length>0?Z:void 0}}import{readdirSync as yy}from"node:fs";import{join as wi,resolve as hy}from"node:path";var ki="cc-safety-net";function Ci(P){let G=P.env.get("DSH_HOME");return wi(G?.trim()?hy(Nn(G,P.home)):wi(P.home,".dsh"),"profiles")}function Ul(P){let G=Ci(P),K=cn(G)?.isDirectory()?yy(G,{withFileTypes:!0}).filter((Z)=>Z.isDirectory()&&Z.name!=="node_modules").map((Z)=>{let X=wi(G,Z.name,"package.json");return{name:Z.name,configPath:X,manifest:yn(X)}}):[];return{installed:K.flatMap((Z)=>{if(Z.manifest.kind!=="ok")return[];let X=Z.manifest.value;if(Fe(Fe(X,"dependencies"),ki)===void 0)return[];let ie=Fe(Fe(Fe(X,"dsh"),"profile"),"bundles");return[{name:Z.name,configPath:Z.configPath,enabled:Array.isArray(ie)&&ie.includes(ki)}]}),unreadable:K.some((Z)=>Z.manifest.kind==="unreadable")}}function xi(P){return Ul(P).installed}function Bl(P){let G=Ul(P.environment),K=G.installed.filter((X)=>X.enabled),Y=G.installed.filter((X)=>!X.enabled),Z=Y.map((X)=>`${ki} is installed in the ${X.name} profile but its bundle is disabled`);if(K.length>0)return{platform:"deepseek-harness",status:"configured",method:"dsh bundle",configPaths:K.map((X)=>X.configPath),...Z.length>0?{errors:Z}:{}};if(Y.length>0)return{platform:"deepseek-harness",status:"disabled",method:"dsh bundle",configPaths:Y.map((X)=>X.configPath),errors:Z};return G.unreadable?{platform:"deepseek-harness",status:"not-inspected"}:{platform:"deepseek-harness",status:"n/a"}}import{existsSync as xy}from"node:fs";import{existsSync as Vl,mkdirSync as vy,readFileSync as by}from"node:fs";import{dirname as wy,join as Ri}from"node:path";function Pi(P){return typeof P==="object"&&P!==null&&!Array.isArray(P)}function Si(P,G){return Pi(P)&&P.command===G}function Gl(P,G){return Pi(P)&&Array.isArray(P.hooks)&&P.hooks.some((K)=>Si(K,G))}function et(P,G){return{hooks:[{type:"command",command:P,timeout:G}]}}function jn(P,G){return P.flatMap((K)=>{if(!Pi(K)||!Array.isArray(K.hooks))return[K];let Y=K.hooks.filter((Z)=>!Si(Z,G));if(Y.length===K.hooks.length)return[K];return Y.length===0?[]:[{...K,hooks:Y}]})}function Mt(P,G,K){let Y=P.filter((Z)=>Gl(Z,G));return Y.length===1&&JSON.stringify(Y[0])===JSON.stringify(et(G,K))}function Ut(P,G){return P.find((K)=>Gl(K,G))}function Bt(P,G,K){let Y=Array.isArray(P.hooks)?P.hooks.find((Z)=>Si(Z,G)):void 0;return[...P.matcher===void 0||P.matcher===""||P.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...Y?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...Y?.timeout===K?[]:[`Managed hook "timeout" is not ${K}; reinstall to repair`]]}var at=wn.devin,no=30,ky={config:{},hooks:{},preToolUse:[]};function to(P,G=process.platform){let K=G==="win32"?P.env.get("APPDATA")||Ri(P.home,"AppData","Roaming"):P.env.get("XDG_CONFIG_HOME")||Ri(P.home,".config");return Ri(K,"devin","config.json")}function ql(P){return typeof P==="object"&&P!==null&&!Array.isArray(P)}function Cy(P){try{return{ok:!0,value:JSON.parse(gn(by(P,"utf-8")))}}catch(G){return{ok:!1,message:G instanceof Error?G.message:String(G)}}}function Ei(P){let G=Cy(P);if(!G.ok)return`Failed to parse Devin CLI config ${P}: ${G.message}`;let K=G.value;if(!ql(K))return`Devin CLI config ${P} must be a JSON object`;let Y=K.hooks===void 0?{}:K.hooks;if(!ql(Y))return`Devin CLI config ${P} "hooks" must be an object`;let Z=Y.PreToolUse===void 0?[]:Y.PreToolUse;if(!Array.isArray(Z))return`Devin CLI config ${P} "hooks.PreToolUse" must be an array`;return{config:K,hooks:Y,preToolUse:Z}}function Kl(P){let G=Ei(P);if(typeof G==="string")throw Error(G);return G}function Jl(P,G,K){let Y={...G.config,hooks:{...G.hooks,PreToolUse:K}};sn(P,`${JSON.stringify(Y,null,2)}
`)}function zl(P){let G=to(P),K=Vl(G)?Kl(G):ky;if(Mt(K.preToolUse,at,no))return{path:G,alreadyInstalled:!0};return vy(wy(G),{recursive:!0}),Jl(G,K,[...jn(K.preToolUse,at),et(at,no)]),{path:G,alreadyInstalled:!1}}function Wl(P){let G=to(P);if(!Vl(G))return{path:G,alreadyInstalled:!1};let K=Kl(G),Y=jn(K.preToolUse,at);if(JSON.stringify(Y)===JSON.stringify(K.preToolUse))return{path:G,alreadyInstalled:!1};return Jl(G,K,Y),{path:G,alreadyInstalled:!0}}function Yl(P){let G=to(P.environment);if(!xy(G))return{platform:"devin",status:"n/a",configPath:G};let K=Ei(G);if(typeof K==="string")return{platform:"devin",status:"n/a",configPath:G,errors:[K]};let Y=Ut(K.preToolUse,at);if(!Y)return{platform:"devin",status:"n/a",configPath:G};let Z=Bt(Y,at,no);return{platform:"devin",status:"configured",method:"hook config",configPath:G,errors:Z.length>0?Z:void 0}}import{existsSync as _y,readFileSync as Iy}from"node:fs";import{existsSync as Gt,mkdirSync as Py,readFileSync as Sy,rmSync as Ry}from"node:fs";import{dirname as Ey,join as Ai}from"node:path";var yt=wn.droid,ro=30;function oo(P){return Ai(P.home,".factory","hooks.json")}function Zl(P){return Ai(P.home,".factory","settings.json")}function Xl(P){return Ai(P.home,".factory","hooks","hooks.json")}function Ti(P){return typeof P==="object"&&P!==null&&!Array.isArray(P)}function Ql(P){try{return JSON.parse(gn(Sy(P,"utf-8")))}catch(G){if(G instanceof SyntaxError)throw Error(`Failed to parse Factory Droid hooks config ${P}: ${G.message}`);throw G}}function _i(P){let G=Ql(P);if(!Ti(G))throw Error(`Factory Droid hooks config ${P} must be a JSON object`);if(G.PreToolUse===void 0||Array.isArray(G.PreToolUse))return G;throw Error(`Factory Droid hooks config ${P} "PreToolUse" must be an array`)}function Ty(P){if(!Gt(P))return{};let G=Ql(P);return Ti(G)&&Ti(G.hooks)&&G.hooks.PreToolUse!==void 0?{PreToolUse:G.hooks.PreToolUse}:{}}function Ay(P){let G=Xl(P);return{...Ty(Zl(P)),...Gt(G)?_i(G):{}}}function ec(P){return Array.isArray(P.PreToolUse)?P.PreToolUse:[]}function nc(P,G,K){sn(P,`${JSON.stringify({...G,PreToolUse:K},null,2)}
`)}function tc(P){let G=oo(P),K=Gt(G),Y=K?_i(G):Ay(P),Z=ec(Y);if(K&&Mt(Z,yt,ro))return{path:G,alreadyInstalled:!0};return Py(Ey(G),{recursive:!0}),nc(G,Y,[...jn(Z,yt),et(yt,ro)]),{path:G,alreadyInstalled:!1}}function rc(P){let G=oo(P);if(!Gt(G))return{path:G,alreadyInstalled:!1};let K=_i(G),Y=ec(K),Z=jn(Y,yt);if(JSON.stringify(Z)===JSON.stringify(Y))return{path:G,alreadyInstalled:!1};let X=Gt(Zl(P))||Gt(Xl(P));if(Z.length===0&&Object.keys(K).length===1&&!X)return Ry(G),{path:G,alreadyInstalled:!0};return nc(G,K,Z),{path:G,alreadyInstalled:!0}}function oc(P){let G=oo(P.environment);if(!_y(G))return{platform:"droid",status:"n/a",configPath:G};let K;try{K=JSON.parse(gn(Iy(G,"utf-8")))}catch(ie){return{platform:"droid",status:"n/a",configPath:G,errors:[`Failed to parse Factory Droid hooks config ${G}: ${ie instanceof Error?ie.message:String(ie)}`]}}let Y=typeof K==="object"&&K!==null&&"PreToolUse"in K?K.PreToolUse:void 0,Z=Ut(Array.isArray(Y)?Y:[],yt);if(!Z)return{platform:"droid",status:"n/a",configPath:G};let X=[...Z.commandRegex===void 0||Z.commandRegex===""?[]:['Managed hook has a "commandRegex" that narrows coverage; reinstall to repair'],...Bt(Z,yt,ro)];return{platform:"droid",status:"configured",method:"hook config",configPath:G,errors:X.length>0?X:void 0}}import{existsSync as Oy}from"node:fs";import{join as Ii}from"node:path";var Oi="gemini-safety-net";function $i(P){let G=Ii(P.home,".gemini","extensions"),K=Ii(G,Oi);if(!Oy(K))return{platform:"gemini-cli",status:"n/a"};let Y=Ii(G,"extension-enablement.json"),Z=yn(Y);if(Z.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let X=Z.kind==="ok"?Fe(Fe(Z.value,Oi),"overrides"):void 0;if(Array.isArray(X)&&X.some((ae)=>typeof ae==="string"&&ae.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:Y,errors:[`${Oi} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:K}}function ic(P){return $i(P.environment)}import{existsSync as Ly,readFileSync as mc,statSync as jy}from"node:fs";import{dirname as fc,join as Fy}from"node:path";import{existsSync as ac,mkdirSync as $y,readFileSync as lc,rmSync as Dy}from"node:fs";import{dirname as Ny,join as sc}from"node:path";var Gn=wn["grok-build"],so=30,Di=et(Gn,so);function ao(P){return sc(P.env.get("GROK_HOME")??sc(P.home,".grok"),"hooks","cc-safety-net.json")}function lo(P){return typeof P==="object"&&P!==null&&!Array.isArray(P)}function cc(P){try{let G=JSON.parse(P);return lo(G)?G:null}catch{return null}}function dc(P){let G=lo(P.hooks)?P.hooks.PreToolUse:void 0;return Array.isArray(G)?G:[]}function io(P,G,K){let Y=lo(G.hooks)?G.hooks:{};sn(P,`${JSON.stringify({...G,hooks:{...Y,PreToolUse:K}},null,2)}
`)}function uc(P){let G=ao(P);if(!ac(G))return $y(Ny(G),{recursive:!0}),io(G,{},[Di]),{path:G,alreadyInstalled:!1};let K=cc(lc(G,"utf-8"));if(!K)return io(G,{},[Di]),{path:G,alreadyInstalled:!1};let Y=dc(K);if(Mt(Y,Gn,so))return{path:G,alreadyInstalled:!0};return io(G,K,[...jn(Y,Gn),Di]),{path:G,alreadyInstalled:!1}}function pc(P){let G=ao(P);if(!ac(G))return{path:G,alreadyInstalled:!1};let K=cc(lc(G,"utf-8"));if(!K)return{path:G,alreadyInstalled:!1};let Y=dc(K),Z=jn(Y,Gn);if(JSON.stringify(Z)===JSON.stringify(Y))return{path:G,alreadyInstalled:!1};let X=lo(K.hooks)?K.hooks:{};if(Z.length===0&&Object.keys(K).length===1&&Object.keys(X).length===1)return Dy(G),{path:G,alreadyInstalled:!0};return io(G,K,Z),{path:G,alreadyInstalled:!0}}function Ni(P){return!!P&&typeof P==="object"&&!Array.isArray(P)}function Hy(P){try{return jy(P,{throwIfNoEntry:!1})?.isFile()===!0?mc(P,"utf-8"):""}catch{return}}function gc(P){let G=ao(P.environment);if(!Ly(G))return{platform:"grok-build",status:"n/a",configPath:G};let K;try{K=JSON.parse(mc(G,"utf-8"))}catch(Re){return{platform:"grok-build",status:"n/a",configPath:G,errors:[`Failed to parse Grok Build hooks config ${G}: ${Re instanceof Error?Re.message:String(Re)}`]}}let Y=Ni(K)&&Ni(K.hooks)&&Array.isArray(K.hooks.PreToolUse)?K.hooks.PreToolUse:[],Z=Ut(Y,Gn);if(!Z)return{platform:"grok-build",status:"n/a",configPath:G};let X=Array.isArray(Z.hooks)?Z.hooks.findIndex((Re)=>Ni(Re)&&Re.command===Gn):-1,ie=`global/cc-safety-net:pre_tool_use[${Y.indexOf(Z)}].hooks[${X}]`,ae=Fy(fc(fc(G)),"disabled-hooks"),ge=Hy(ae),ye=ge?.split(`
`).some((Re)=>Re.trim()===ie)===!0,Pe=[...ge===void 0?[`Cannot read ${ae}, so doctor cannot tell whether Grok Build skips the hook`]:[],...ye?[`Grok Build skips the hook: ${ie} is listed in ${ae}; enable it in /hooks`]:[],...Bt(Z,Gn,so)];return{platform:"grok-build",status:ye?"disabled":"configured",method:"hook config",configPath:G,errors:Pe.length>0?Pe:void 0}}import{readFileSync as Pc}from"node:fs";import{join as Sc}from"node:path";var Pn="cc-safety-net",Li="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",My=30;function yc(P){return`${Li}
# version: ${P}
`}function Uy(P){return`${yc(P)}name: ${Pn}
version: "${P}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function By(P){return`${yc(P)}"""CC Safety Net guard for Hermes Agent.

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
ANALYZER = [${wn["hermes-agent"].split(" ").map((G)=>`"${G}"`).join(", ")}]
TIMEOUT_SECONDS = ${My}


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
`}function cr(P){return[{name:"__init__.py",content:By(P)},{name:"plugin.yaml",content:Uy(P)}]}import{mkdirSync as Gy,readdirSync as qy,readFileSync as hc,rmSync as ji}from"node:fs";import{basename as Vy,dirname as Ky,join as Fn}from"node:path";var Jy="__pycache__",zy=/^[a-z0-9][a-z0-9_-]{0,63}$/;function Wy(P){try{return hc(P,"utf-8").trim()}catch{return}}function Fi(P){let G=P.env.get("HERMES_HOME")?.trim();if(G&&Vy(Ky(G))==="profiles")return G;let K=G||Fn(P.home,".hermes"),Y=Fn(K,"active_profile"),Z=Wy(Y),X=Z?.toLowerCase();if(!X||X==="default")return K;if(!zy.test(X))throw Error(`Invalid Hermes profile name "${Z}" in ${Y}; run \`hermes profile use <name>\` with a valid profile.`);return Fn(K,"profiles",X)}function Hi(P){return Fn(Fi(P),"plugins",Pn)}function Mi(P){return P.startsWith(Li)}function Ui(P,G){let K=Hi(P),Y=cn(K);if(Y&&(Y.isSymbolicLink()||!Y.isDirectory()))throw Error(`Refusing to ${G} ${K}: not a regular directory. Move or remove it and rerun ${G==="install"?"install":"uninstall"} --hermes-agent.`);return K}function vc(P,G){let K=cn(P);if(!K)return;if(K.isSymbolicLink()||!K.isFile())throw Error(`Refusing to ${G} ${P}: not a regular file. Move or remove it.`);let Y=hc(P,"utf-8");if(!Mi(Y))throw Error(`Refusing to ${G} unmanaged file at ${P}. Move or remove it.`);return Y}function bc(P){let G=Ui(P,"install"),K=cr(un());if(K.map((Z)=>vc(Fn(G,Z.name),"overwrite")).every((Z,X)=>Z===K[X]?.content))return{path:G,alreadyInstalled:!0};return Gy(G,{recursive:!0}),K.forEach((Z)=>{sn(Fn(G,Z.name),Z.content)}),{path:G,alreadyInstalled:!1}}function Bi(P){let G=Ui(P,"remove");if(!cn(G))return[];return cr(un()).filter((K)=>vc(Fn(G,K.name),"remove")!==void 0)}function wc(P){let G=Ui(P,"remove");if(!cn(G))return{path:G,alreadyInstalled:!1};let K=Bi(P);if(K.forEach((Y)=>{ji(Fn(G,Y.name))}),ji(Fn(G,Jy),{recursive:!0,force:!0}),qy(G).length===0)ji(G,{recursive:!0});return{path:G,alreadyInstalled:K.length>0}}var dr="hermes-agent",kc=/^([^\s#][^:]*):/,Yy=/^\s+([A-Za-z_][\w-]*):/,Cc=/^\s+-\s*(.*)$/;function Zy(P){return P.trim().replace(/^(["'])(.*)\1$/,"$2")}function Xy(P){let G=P.split(/\r?\n/),K=G.findIndex((X)=>kc.exec(X)?.[1]?.trim()==="plugins");if(K===-1)return[];let Y=G.slice(K+1),Z=Y.findIndex((X)=>kc.test(X));return Z===-1?Y:Y.slice(0,Z)}function xc(P,G){let K=Xy(P),Y=K.findIndex((ie)=>Yy.exec(ie)?.[1]===G);if(Y===-1)return[];let Z=K.slice(Y+1),X=Z.findIndex((ie)=>!Cc.test(ie));return(X===-1?Z:Z.slice(0,X)).map((ie)=>Zy(Cc.exec(ie)?.[1]??""))}function Qy(P){try{return Pc(Sc(Fi(P),"config.yaml"),"utf-8")}catch{return}}function Gi(P){let G=Qy(P)??"";return xc(G,"enabled").includes(Pn)&&!xc(G,"disabled").includes(Pn)}function Rc(P){return/^# version:\s*(.+)$/m.exec(P)?.[1]?.trim()}function eh(P,G){let K=cn(P);if(!K)return{error:`${G.name} is missing from ${P}; run install --hermes-agent`};if(K.isSymbolicLink()||!K.isFile())return{error:`${P} is a symlink or not a regular file; move or remove it`};try{let Y=Pc(P,"utf-8");if(!Mi(Y))return{error:`Unmanaged ${G.name} occupies ${P}; move or remove it`};if(Rc(Y)===un()&&Y!==G.content)return{error:`Modified ${G.name} occupies ${P}; run install --hermes-agent to restore it`};return{content:Y}}catch(Y){return{error:`Failed to read ${P}: ${Y instanceof Error?Y.message:String(Y)}`}}}function nh(P){try{return{path:Hi(P)}}catch(G){return{error:G instanceof Error?G.message:String(G)}}}function Ec(P){let G=nh(P.environment);if("error"in G)return{platform:dr,status:"n/a",errors:[G.error]};let K=G.path,Y=Gr(dr,K);if(Y)return Y;let Z=cr(un()).map((ge)=>eh(Sc(K,ge.name),ge)),X=Z.flatMap((ge)=>("error"in ge)?[ge.error]:[]);if(X.length>0)return{platform:dr,status:"n/a",configPath:K,errors:X};let ie=Z.some((ge)=>("content"in ge)&&Rc(ge.content)!==un()),ae=ie?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!Gi(P.environment))return{platform:dr,status:"disabled",method:"plugin directory",configPath:K,errors:[`${Pn} is not enabled in Hermes; run \`hermes plugins enable ${Pn}\``,...ae]};return{platform:dr,status:"configured",method:"plugin directory",configPath:K,errors:ie?ae:void 0}}import{existsSync as th,readFileSync as rh}from"node:fs";import{join as Ki}from"node:path";var oh=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/,qi="cc-safety-net",uo="plugin config",ih=new Set(["event","matcher","command","timeout"]),sh=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionResult","UserPromptSubmit","UserPromptQueued","TurnStarted","Stop","StopFailure","Interrupt","SessionStart","SessionEnd","SessionHeartbeat","SubagentStart","SubagentStop","TaskStarted","PreCompact","PostCompact","Notification"]);function Tc(P){return P.env.get("KIMI_CODE_HOME")||Ki(P.home,".kimi-code")}function co(P,G){let K=[""],Y="",Z=0;for(let X=0;X<P.length;X++){let ie=P[X];if(Y!==""){let ae=Y==='"'&&ie==="\\"?P[++X]??"":"";if(K[K.length-1]+=ie+ae,ae===""&&ie===Y)Y="";continue}if(ie==="#"){let ae=P.indexOf(`
`,X);X=(ae===-1?P.length:ae)-1;continue}if(ie===G&&Z===0){K.push("");continue}if(ie==='"'||ie==="'")Y=ie;if(ie==="["||ie==="{")Z++;if(ie==="]"||ie==="}")Z--;K[K.length-1]+=ie}return K.map((X)=>X.trim()).filter((X)=>X!=="")}function Ac(P){let G=/^(?:"([^"]*)"|'([^']*)'|([^\s="']+))\s*=\s*([\s\S]+)$/.exec(P);return G?{key:G[1]??G[2]??G[3]??"",value:G[4]??""}:void 0}function Vi(P){return P===void 0?void 0:/^("""|'''|"|')([\s\S]*)\1$/.exec(P)?.[2]}function ah(P){let G=P.split(/(?=^\s*\[)/m),K=G.filter((Y)=>!/^\s*\[/.test(Y)).flatMap((Y)=>co(Y,`
`)).map(Ac).find((Y)=>Y?.key==="hooks")?.value;if(K!==void 0)return co(K.slice(1,-1),",").map((Y)=>co(Y.slice(1,-1),","));return G.filter((Y)=>/^\s*\[\[hooks]]/.test(Y)).map((Y)=>co(Y.replace(/^\s*\[\[hooks]]/,""),`
`))}function lh(P){let G=P.map(Ac),K=P.find((Pe,Re)=>G[Re]===void 0),Y=G.find((Pe)=>Pe!==void 0&&!ih.has(Pe.key))?.key,Z=G.find((Pe,Re)=>Pe!==void 0&&G.findIndex((_e)=>_e?.key===Pe.key)<Re)?.key,X=(Pe)=>G.find((Re)=>Re?.key===Pe)?.value,ie=X("matcher"),ae=X("timeout"),ge=Number(ae?.replace(/(?<=[\da-f])_(?=[\da-f])/gi,""));return[[K!==void 0,`"${K}" is not a key = value pair`],[Y!==void 0,`unknown key "${Y}"`],[Z!==void 0,`duplicate key "${Z}"`],[!sh.has(Vi(X("event"))??""),'"event" is not a Kimi Code hook event'],[ie!==void 0&&Vi(ie)===void 0,'"matcher" is not a string'],[!Vi(X("command")),'"command" is missing or empty'],[ae!==void 0&&!(Number.isInteger(ge)&&ge>=1&&ge<=600),'"timeout" is not an integer from 1 to 600']].find(([Pe])=>Pe)?.[1]}function ch(P){let G=Ki(Tc(P),"plugins","installed.json"),K=yn(G);if(K.kind==="missing")return;let Y=K.kind==="ok"?Fe(K.value,"plugins"):void 0;if(!Array.isArray(Y))return{platform:"kimi-code",status:"n/a",configPath:G,errors:[`Cannot read ${G}, so doctor cannot tell whether the Kimi Code plugin is installed`]};let Z=Y.find((X)=>Fe(X,"id")===qi);if(Z===void 0)return;if(Fe(Z,"enabled")!==!0)return{platform:"kimi-code",status:"disabled",method:uo,configPath:G,errors:[`${qi} is installed but not enabled in Kimi Code; run /plugins enable ${qi}`]};return{platform:"kimi-code",status:"configured",method:uo,configPath:G}}function po(P){let G=Ki(Tc(P.environment),"config.toml"),K=()=>ch(P.environment)??{platform:"kimi-code",status:"n/a",configPath:G};if(!th(G))return K();let Y;try{Y=rh(G,"utf-8")}catch(ie){return{platform:"kimi-code",status:"n/a",configPath:G,errors:[`Failed to read ${G}: ${ie instanceof Error?ie.message:String(ie)}`]}}if(!oh.test(Y))return K();let X=(/"""|'''/.test(Y)?[]:ah(Y)).flatMap((ie,ae)=>{let ge=lh(ie);return ge===void 0?[]:[`Kimi Code ignores every hook because hooks entry ${ae+1} is invalid (${ge}); fix it in ${G}`]});return{platform:"kimi-code",status:X.length>0?"disabled":"configured",method:"hook config",configPath:G,errors:X.length>0?X:void 0}}import{readFileSync as Fc}from"node:fs";import{join as pr}from"node:path";var dn="cc-safety-net",Cn="index.js",qt="openclaw.plugin.json",Vt="package.json";var fo="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as dh,lstatSync as uh,readdirSync as ph,readFileSync as fh}from"node:fs";import{dirname as _c,join as qn}from"node:path";import{fileURLToPath as mh}from"node:url";var Ji=qn("openclaw",dn),vt=`run \`openclaw plugins enable ${dn}\``,gh="config reload superseded by a newer runtime config source",yh=[Cn,qt,Vt];function Ic(P){let G=P.env.get("OPENCLAW_HOME")?.trim();return G?Nn(G,P.home):P.home}function Oc(P){let G=Ic(P),K=P.env.get("OPENCLAW_STATE_DIR")?.trim();if(K)return Nn(K,G);let Y=P.env.get("OPENCLAW_CONFIG_PATH")?.trim();return Y?_c(Nn(Y,G)):qn(G,".openclaw")}function $c(P){let G=P.env.get("OPENCLAW_CONFIG_PATH")?.trim();return G?Nn(G,Ic(P)):qn(Oc(P),"openclaw.json")}function ur(P){return qn(Oc(P),"extensions",dn)}function hh(P){let G=ph(P);if(G.length===0)return!0;if(G.some((Z)=>!yh.includes(Z)))return!1;let K=qn(P,Cn),Y=cn(K);return Y!==void 0&&!Y.isSymbolicLink()&&Y.isFile()&&fh(K,"utf-8").startsWith(fo)}function zi(P){let G=ur(P),K=cn(G);if(!K)return;if(!K.isSymbolicLink()&&K.isDirectory()&&hh(G))return;throw Error(`Refusing to modify ${G}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function Dc(){let P=_c(mh(import.meta.url));return[qn(P,Ji),qn(P,"..",Ji),qn(P,"..","..","..","dist",Ji)]}function Wi(P=Dc()){return P.find((G)=>dh(G)&&uh(G).isDirectory())}function vh(P=Dc()){let G=Wi(P);if(!G)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return G}function Nc(P=vh()){return[["openclaw","plugins","install",P,"--force","--accept-capabilities"]]}function bh(P){let G=(()=>{try{return JSON.parse(P)}catch{return}})(),K=Fe(Fe(G,"plugin"),"status");return typeof K==="string"?K:void 0}async function wh(){await pn(["openclaw","plugins","enable",dn]).catch((P)=>{if(!(P instanceof Error&&P.message.includes(gh)))throw P})}async function Lc(P){let G=async()=>bh(await pn(["openclaw","plugins","inspect",dn,"--runtime","--json"],{stdoutOnly:!0})),K=await G(),Y=K==="disabled"&&P;if(Y)await wh();let Z=Y?await G():K;if(Z==="loaded")return;throw Error(`${Z===void 0?`The ${dn} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:Z==="disabled"?`OpenClaw reports the ${dn} plugin with status "disabled"; ${vt}.`:`OpenClaw reports the ${dn} plugin with status "${Z}".`} Run \`openclaw plugins inspect ${dn} --runtime\` for details.`)}var mo="openclaw";function Kt(P,G){let K=pr(P,G),Y=cn(K);if(!Y)return{error:`${G} is missing from ${K}; run install --openclaw`};if(Y.isSymbolicLink()||!Y.isFile())return{error:`${K} is a symlink or not a regular file; move or remove it`};try{return{content:Fc(K,"utf-8")}}catch(Z){return{error:`Failed to read ${K}: ${Z instanceof Error?Z.message:String(Z)}`}}}function Hc(P){try{return JSON.parse(gn(P))}catch{return}}function kh(P){let G=Kt(P,qt);if("error"in G)return G.error;if(Fe(Hc(G.content),"id")===dn)return;return`${pr(P,qt)} is not a valid ${dn} manifest; run install --openclaw`}function Ch(P){let G=Kt(P,Vt);if("error"in G)return G.error;let K=Fe(Fe(Hc(G.content),"openclaw"),"extensions");if(Array.isArray(K)&&K.includes(`./${Cn}`))return;return`${pr(P,Vt)} does not point OpenClaw at ${Cn}; run install --openclaw`}function jc(P){return Array.isArray(P)?P.filter((G)=>typeof G==="string"):[]}function xh(P){let G=$c(P);if(!cn(G))return`${dn} is not enabled; ${vt}`;let K=(()=>{try{return JSON.parse(gn(Fc(G,"utf-8")))}catch{return}})();if(K===void 0)return`Failed to read ${G}; fix it, then ${vt}`;let Y=Fe(K,"plugins");if(Fe(Y,"enabled")===!1)return`plugins.enabled is false in ${G}; no OpenClaw plugin loads`;let Z=Fe(Fe(Fe(Y,"entries"),dn),"enabled");if(jc(Fe(Y,"deny")).includes(dn)||Z===!1)return`${dn} is disabled in ${G}; ${vt}`;let X=jc(Fe(Y,"allow"));if(X.length>0&&!X.includes(dn))return`plugins.allow in ${G} does not list ${dn}; add it, then ${vt}`;if(X.includes(dn)||Z===!0)return;return`${dn} is not enabled; ${vt}`}function Mc(P){return/^\/\/ version:\s*(.+)$/m.exec(P)?.[1]?.trim()}function Ph(P,G,K){if(K===void 0)return[];let Y=Kt(K,Cn);if(!(("content"in Y)&&Mc(Y.content)===G))return[];return[Cn,qt,Vt].flatMap((X)=>{let ie=Kt(P,X),ae=Kt(K,X);if("error"in ie||"error"in ae||ie.content===ae.content)return[];return[`Modified ${X} occupies ${pr(P,X)}; run install --openclaw to restore it`]})}function Uc(P){let G=ur(P.environment),K=Gr(mo,G);if(K)return K;let Y=Kt(G,Cn),X=["error"in Y?Y.error:Y.content.startsWith(fo)?void 0:`Unmanaged ${Cn} occupies ${pr(G,Cn)}; move or remove it`,kh(G),Ch(G)].filter((Pe)=>Pe!==void 0),ie="content"in Y?Mc(Y.content):void 0,ae=X.length>0?X:Ph(G,ie,Wi());if(ae.length>0)return{platform:mo,status:"n/a",configPath:G,errors:ae};let ge=ie===un()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],ye=xh(P.environment);if(ye)return{platform:mo,status:"disabled",method:"plugin directory",configPath:G,errors:[ye,...ge]};return{platform:mo,status:"configured",method:"plugin directory",configPath:G,errors:ge.length>0?ge:void 0}}import{existsSync as $h,readFileSync as Dh}from"node:fs";import{basename as Nh}from"node:path";import{existsSync as go,readFileSync as Zi,rmSync as Sh}from"node:fs";import{join as _n}from"node:path";import{pathToFileURL as Rh}from"node:url";var fr="cc-safety-net",bt=`${fr}@latest`,Xi=["opencode.json","opencode.jsonc"],Eh=60,Th=250,Bc="CCSafetyNetPlugin",Ah={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function Gc(P){return _n(P.env.get("XDG_CONFIG_HOME")||_n(P.home,".config"),"opencode")}function Qi(P){return P.env.get("OPENCODE_CONFIG_DIR")||Gc(P)}function es(P){return Xi.map((G)=>_n(Qi(P),G))}function ns(P){return[...new Set([Qi(P),Gc(P)])].flatMap((G)=>Xi.map((K)=>_n(G,K)))}function qc(P){return _n(P.env.get("XDG_CACHE_HOME")||_n(P.home,".cache"),"opencode","packages",bt)}function Vc(P){Sh(qc(P),{recursive:!0,force:!0})}async function Kc(P){let G=(await pn(["opencode","--version"],{stdoutOnly:!0})).trim(),K=/^(?:opencode\s+)?v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(G),Y=Number(K?.[1]),Z=Number(K?.[2]),X=Number(K?.[3]);if(!K||Y!==1&&Y!==2||Y===1&&(Z<18||Z===18&&X<29)||Y===2&&Z===0&&X<6)throw Error(`OpenCode 1.18.29+ or 2.0.6+ is required; found ${G||"an unknown version"}.`);if(Y===2){for(let ie of es(P)){if(!go(ie))continue;let ae=rs(Zi(ie,"utf-8"),ie);if(["plugin","plugins"].some((ye)=>{let Pe=Fe(ae,ye);return Array.isArray(Pe)&&Pe.some((Re)=>yo(Re)&&(typeof Re==="string"?Re:Fe(Re,"package"))!==bt)}))throw Error(`Change the cc-safety-net package spec in ${ie} to ${bt}, preserving its options, then retry. Adding another spec would create a duplicate plugin ID.`)}return{commands:[],afterInstall:async()=>{if((await pn(["opencode","plugin","add",bt],{stdoutOnly:!0})).includes("is already configured in"))await Yi(),await pn(["opencode","plugin","update",bt]);let ae=await Yi();if(!/^cc-safety-net\s+\S+\s+cc-safety-net@latest\s*$/m.test(ae))throw Error("OpenCode did not load cc-safety-net from cc-safety-net@latest. Run `opencode plugin list` for details.");let ge=["--param",`location[directory]=${process.cwd()}`];await pn(["opencode","api","integration.list",...ge]);let ye=await pn(["opencode","api","plugin.list",...ge],{stdoutOnly:!0}),Pe=ts(ye);if(Pe)throw Error(Pe);if(!Jc(ye).some(zc))throw Error("OpenCode lists no active cc-safety-net for this directory. Run `opencode api plugin.list` for details.")}}}return Vc(P),{commands:[["opencode","plugin","-g","-f",bt]],afterInstall:()=>Ih(P)}}function Jc(P){return _h(P).filter((G)=>Fe(G,"id")===fr||yo(Fe(Fe(G,"source"),"target"))).map((G)=>Fe(G,"state"))}function zc(P){return Fe(P,"status")==="active"}function ts(P){let G=Jc(P);if(G.some(zc))return;let K=G.find((Y)=>Fe(Y,"status")==="failed");if(!K)return;return`OpenCode reports cc-safety-net failed: ${String(Fe(K,"error")).split(`
`)[0]}`}function _h(P){if(!P)return[];try{let G=Fe(JSON.parse(P),"data");return Array.isArray(G)?G:[]}catch{return[]}}async function Yi(P=1){let G=await pn(["opencode","plugin","list"],{stdoutOnly:!0});if(/^cc-safety-net\s|\scc-safety-net@latest\s*$/m.test(G)||P===Eh)return G;return await new Promise((K)=>setTimeout(K,Th)),Yi(P+1)}async function Ih(P){let G=_n(qc(P),"node_modules",fr),K=_n(G,"package.json");if(!go(K))throw Error(`The OpenCode plugin cache at ${G} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${bt}\` for details.`);let Y=Fe(JSON.parse(Zi(K,"utf-8")),"main");if(typeof Y!=="string")throw Error(`The cached OpenCode plugin at ${G} declares no "main" entry.`);let Z=_n(G,Y);if(typeof(await import(Rh(Z).href))[Bc]==="function")return;throw Error(`The cached OpenCode plugin at ${Z} does not export a callable ${Bc}, so OpenCode would load nothing and fail open.`)}function rs(P,G){try{return JSON.parse(gn(P))}catch(K){if(K instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${G}: ${K.message}`);throw K}}function yo(P){let G=typeof P==="string"?P:Fe(P,"package");return typeof G==="string"&&(G===fr||G.startsWith(`${fr}@`))}function os(P){return["plugin","plugins"].some((G)=>{let K=Fe(P,G);return Array.isArray(K)&&K.some(yo)})}function Oh(P,G){let Y=["plugin","plugins"].flatMap((Z)=>{let X=vl(P,Z,Ah);if(!X)return[];let ie=[],ae=0,ge=X.start+1,ye=P.slice(X.start+1,X.end).matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|[^"\s{}[\],/]+|[{}[\],]/g);for(let Pe of ye){if(Pe[0].startsWith("//")||Pe[0].startsWith("/*"))continue;let Re=X.start+1+Pe.index;if(ae===0)ge=Re;if(Pe[0]==="{"||Pe[0]==="[")ae++;if(Pe[0]==="}"||Pe[0]==="]")ae--;if(ae!==0||Pe[0]===",")continue;let _e=Re+Pe[0].length;if(yo(JSON.parse(gn(P.slice(ge,_e)))))ie.push({start:ge,end:_e})}return ie}).sort((Z,X)=>Z.start-X.start).reverse().reduce((Z,X)=>{let ie=/^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*,/.exec(Z.slice(X.end));if(ie?.[0].includes("/")){let ae=X.end+ie[0].length-1;return Z.slice(0,X.start)+Z.slice(X.end,ae)+Z.slice(ae+1)}return hl(Z,X)},P);return rs(Y,G),Y}function Wc(P){Vc(P);let G=ns(P),K=G.find((X)=>go(X)),Y=[],Z=[];for(let X of G){if(!go(X))continue;try{let ie=Zi(X,"utf-8");if(!os(rs(ie,X)))continue;sn(X,Oh(ie,X)),Z.push(X)}catch(ie){Y.push(ie instanceof Error?ie.message:String(ie))}}if(Y.length>0)throw Error(Y.join(`
`));return{path:Z[0]??K??_n(Qi(P),Xi[0]),alreadyInstalled:Z.length>0}}function Jt(P){let G=[];for(let K of P.openCodeVersion?.startsWith("2.")?es(P.environment):ns(P.environment))if($h(K))try{let Y=Dh(K,"utf-8"),Z=gn(Y),X=JSON.parse(Z);if(os(X)){let ie=ts(P.openCodePluginListOutput);if(ie)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:K,errors:[...G,ie]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:K,errors:G.length>0?G:void 0}}}catch(Y){G.push(`Failed to parse ${Nh(K)}: ${Y instanceof Error?Y.message:String(Y)}`)}return{platform:"opencode",status:"n/a",errors:G.length>0?G:void 0}}import{join as Yc}from"node:path";var Xc="dist/pi/index.js",Zc=new Set([Xc,"index.js"]),Lh=/[*?[\]{}]/;function is(P){let G=P.env.get("PI_CODING_AGENT_DIR");return Yc(G?Nn(G,P.home):Yc(P.home,".pi","agent"),"settings.json")}function ss(P){if(typeof P!=="string")return!1;return P==="npm:cc-safety-net"||P.startsWith("npm:cc-safety-net@")}function jh(P){if(!Array.isArray(P)||P.length===0)return!1;if(!P.every((Y)=>typeof Y==="string"))return!1;let G=(Y)=>P.some((Z)=>Z.startsWith(Y)&&Z.slice(1).replace(/^\.[/\\]/,"")===Xc);if(G("-"))return!1;if(G("+"))return!0;let K=P.filter((Y)=>!/^[-+!]/.test(Y));return(K.length===0||K.some((Y)=>Zc.has(Y)))&&!P.some((Y)=>Y.startsWith("!")&&(Zc.has(Y.slice(1))||Lh.test(Y)))}function Qc(P){let G=is(P.environment),K=yn(G);if(K.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(K.kind==="missing")return{platform:"pi",status:"n/a"};let Y=Fe(K.value,"packages");if(!Array.isArray(Y))return{platform:"pi",status:"n/a"};let Z=Y.find((ie)=>ss(typeof ie==="string"?ie:Fe(ie,"source")));if(Z===void 0)return{platform:"pi",status:"n/a"};let X=Fe(Z,"extensions");if(X!==void 0&&!jh(X))return{platform:"pi",status:"disabled",method:"package config",configPath:G,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:G}}var Fh={amp:tl,"antigravity-cli":sl,"claude-code":ul,codex:fl,"copilot-cli":Il,cursor:Ml,"deepseek-harness":Bl,devin:Yl,droid:oc,"gemini-cli":ic,"grok-build":gc,"hermes-agent":Ec,"kimi-code":po,openclaw:Uc,opencode:Jt,pi:Qc};function zt(P,G,K){let Y={...K,cwd:G,environment:P};return Er.map((Z)=>Hh(Fh[Z](Y)))}function Hh(P){if(P.status==="not-inspected")return{platform:P.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:P.platform,detected:P.status!=="n/a",configured:P.status==="configured",inspectionStatus:P.status!=="n/a"?"verified":P.errors&&P.errors.length>0?"failed":"not-applicable",method:P.method,configPath:P.configPath,configPaths:P.configPaths,errors:P.errors}}import{join as Mh}from"node:path";var Uh=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),Bh=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),commandTools:Object.freeze([]),safety:Object.freeze({level:"standard"}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),Gh={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function ed(P){let G=Mh(P.tmpdir,"cc-safety-net-self-test"),K=Uh.map((Y)=>{let Z=H(P,l("self-test",{command:Y.command},{kind:"command",shell:"auto"},{configCwd:G,executionCwd:G},Y.command),{guard:{dependencies:{loadPolicySnapshot:()=>Bh,getModes:()=>Gh,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),X=Y.expectBlocked?"blocked":"allowed",ie=Z.decision.kind==="deny"?"blocked":"allowed";return{command:Y.command,description:Y.description,expected:X,actual:ie,passed:X===ie,reason:Z.decision.kind==="deny"?Z.decision.reason:void 0,ruleId:Z.decision.kind==="deny"?Z.decision.ruleId:void 0}});return{passed:K.filter((Y)=>Y.passed).length,failed:K.filter((Y)=>!Y.passed).length,total:K.length,results:K}}function as(P){let G=fn({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},P);if($n(G.errors))return null;return{json:G.flags.json,skipUpdateCheck:G.flags.skipUpdateCheck}}async function nd(P,G={}){let K=await tr(!G.json,()=>{let Y=Vh(P,G);return{ready:Y,finish:()=>Y}},()=>nr(),{loadingMessage:"Checking system status…"});if(G.json)console.log(JSON.stringify(K,null,2));else Kh(K);return K.engineSelfTest.failed>0||K.findings.some((Y)=>Y.severity==="error")?1:0}async function Vh(P,G){let K=G.cwd??process.cwd(),Y=await Nr((Oe)=>Jt({environment:P,cwd:K,openCodeVersion:Oe}).status!=="n/a",void 0,K),Z=zt(P,K,{ampPluginListOutput:Y.ampPluginListOutput,codexPluginListOutput:Y.codexPluginListOutput,copilotCliVersion:Y.versions["copilot-cli"],openCodeVersion:Y.versions.opencode,openCodePluginListOutput:Y.openCodePluginListOutput}),X=ba(P,K),ie=wa(P),ae=R(P,{cwd:K}),ge=ae.policy,ye=_(ge,P.env),Pe=q(ge,ye.capabilities),Re=Ir(P,7),_e=Za(P,K),Ae=[Lt(K),jt(P)].filter((Oe)=>qh(Oe)),Ie=G.skipUpdateCheck?{currentVersion:un(),latestVersion:null,updateAvailable:!1}:await Bn(),je={hooks:Z,engineSelfTest:ed(P),userConfig:X.userConfig,projectConfig:X.projectConfig,configState:Ke(ae),effectiveRules:X.effectiveRules,environment:ie,effectiveSafety:{selectedPreset:ge.safety.level,level:ye.effectiveLevel,capabilities:ye.capabilities,ruleOverrides:ge.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(Pe).filter(([,Oe])=>Oe.source==="rule_override"&&Oe.override==="off"&&Oe.inheritedEnabled&&Oe.changesInherited).map(([Oe])=>Oe),ruleCounts:{stored:Object.keys(ge.destructiveCommandRuleOverrides).length,effective:Object.values(Pe).filter((Oe)=>Oe.changesInherited).length},...ae.policyScopes?{policyScopes:ae.policyScopes}:{}},..._e.length>0?{v2Leftovers:_e}:{},...Ae.length>0?{legacyConfigs:Ae}:{},posture:Da(P,X.userConfig.path),activity:Re,update:Ie,system:Y};return{...je,findings:Ca(je)}}function Kh(P){console.log(),console.log(Pa(P.hooks)),console.log(),console.log(Sa(P.engineSelfTest)),console.log(),console.log(Ra(P)),console.log(),console.log(Ea(P.environment)),console.log(),console.log(Ta(P)),console.log(),console.log(Aa(P.findings)),console.log(),console.log(_a(P.activity)),console.log(),console.log(Oa(P.system)),console.log(),console.log(Ia(P.update)),console.log($a(P))}import{existsSync as Jh}from"node:fs";var zh=/^[A-Za-z0-9_@%+=:,./-]+$/,td="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function ls(P){let G=fn({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},P);if($n(G.errors))return console.error(td),console.error("Pass -- before a command that starts with dashes."),null;if(G.values.cwd!==void 0&&!Jh(G.values.cwd))return console.error(`Error: --cwd path does not exist: ${G.values.cwd}`),null;let K=G.positionals.length===1?G.positionals[0]:G.positionals.map((Y)=>zh.test(Y)?Y:`'${Y.replaceAll("'","'\\''")}'`).join(" ");if(!K)return console.error("Error: No command provided"),console.error(td),null;return{json:G.flags.json,cwd:G.values.cwd,command:K}}function rd(P){if(P)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function od(P,G){let Y=G-18;return[`${P.dtl}${P.dh.repeat(G)}${P.dtr}`,`${P.dv}  Command Analysis${" ".repeat(Y)}${P.dv}`,`${P.dbl}${P.dh.repeat(G)}${P.dbr}`]}function cs(P){return JSON.stringify(P)}function id(P,G=0){return`[${P.map((Y,Z)=>xa(Y,Z,G)).join(",")}]`}function mr(P,G,K=70){let Y=P.split(" "),Z=[],X="";for(let ie of Y)if(X&&X.length+ie.length+1>K)Z.push(X),X=ie;else X=X?`${X} ${ie}`:ie;if(X)Z.push(X);return Z.map((ie,ae)=>ae===0?ie:`${G}${ie}`)}function sd(P,G,K){let Y=[];switch(P.type){case"parse":return null;case"env-strip":return Y.push(""),Y.push(`STEP ${G} ${K.h} Strip environment variables`),Y.push(`  Removed: ${P.envVars.map((Z)=>`${Z}=<redacted>`).join(", ")}`),Y.push(`  Tokens:  ${cs(P.output)}`),{lines:Y,incrementStep:!0};case"leading-tokens-stripped":return Y.push(""),Y.push(`STEP ${G} ${K.h} Strip wrappers`),Y.push(`  Removed: ${P.removed.join(", ")}`),Y.push(`  Tokens:  ${cs(P.output)}`),{lines:Y,incrementStep:!0};case"shell-wrapper":return Y.push(""),Y.push(`STEP ${G} ${K.h} Detect shell wrapper`),Y.push(`  Wrapper: ${P.wrapper} -c`),Y.push(`  Inner:   ${P.innerCommand}`),{lines:Y,incrementStep:!0};case"interpreter":{if(Y.push(""),Y.push(`STEP ${G} ${K.h} Detect interpreter`),Y.push(`  Interpreter: ${P.interpreter}`),Y.push(`  Code:        ${P.codeArg}`),P.paranoidBlocked)Y.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:Y,incrementStep:!0}}case"busybox":return Y.push(""),Y.push(`STEP ${G} ${K.h} Busybox wrapper`),Y.push(`  Subcommand: ${P.subcommand}`),{lines:Y,incrementStep:!0};case"transparent-wrapper":return Y.push(""),Y.push(`STEP ${G} ${K.h} Transparent wrapper`),Y.push(`  Wrapper: ${P.wrapper}`),Y.push(`  Tokens:  ${cs(P.output)}`),{lines:Y,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(Y.push(""),Y.push(`STEP ${G} ${K.h} Match rules`),Y.push(`  Rule:   ${P.rule}()`),P.matched)Y.push("  Result: MATCHED");else Y.push("  Result: No match");return{lines:Y,incrementStep:!0}}case"worktree-relaxation":return Y.push(""),Y.push(`STEP ${G} ${K.h} Worktree relaxation`),Y.push(`  Mode:   ${n.worktree.name}`),Y.push(`  Git cwd: ${P.gitCwd}`),Y.push("  Result: Allowed local discard in linked worktree"),{lines:Y,incrementStep:!0};case"temp-root-relaxation":return Y.push(""),Y.push(`STEP ${G} ${K.h} Temp-root relaxation`),Y.push(`  Git cwd: ${P.gitCwd}`),Y.push("  Result: Allowed git discard in a temp-root repository"),{lines:Y,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(P.embeddedCommandFound)return Y.push(""),Y.push(`STEP ${G} ${K.h} Fallback scan`),Y.push(`  Found: ${P.embeddedCommandFound}`),{lines:Y,incrementStep:!0};return null}case"custom-rules-check":{if(P.rulesChecked){if(Y.push(""),Y.push(`STEP ${G} ${K.h} Custom rules`),P.matched)Y.push("  Result: MATCHED");else Y.push("  Result: No match");return{lines:Y,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(P.matched)return Y.push(""),Y.push(`STEP ${G} ${K.h} Dangerous text check`),Y.push(`  Token:  ${P.token}`),Y.push("  Result: MATCHED"),{lines:Y,incrementStep:!0};return null}case"strict-unparseable":return Y.push(""),Y.push(`STEP ${G} ${K.h} Strict mode check`),Y.push(`  Command: ${P.rawCommand}`),Y.push("  Result:  ✗ UNPARSEABLE"),{lines:Y,incrementStep:!0};case"segment-skipped":return null;case"error":return Y.push(""),Y.push(`ERROR: ${P.message}`),{lines:Y,incrementStep:!1};default:return P}}function ds(P,G){let K=rd(G?.asciiOnly??!1),Y=58,Z=[],X=1;Z.push(...od(K,58)),Z.push("");let ie=P.trace.steps.find((Ie)=>Ie.type==="error");if(ie&&ie.type==="error"){Z.push("ERROR"),Z.push(`  ${ie.message}`),Z.push(""),Z.push("RESULT"),Z.push(`  Status: ${P.result==="blocked"?Qe.red("BLOCKED"):Qe.green("ALLOWED")}`),Z.push(""),Z.push("CONFIG");let Ie=P.configSource??"none";return Z.push(`  Path: ${Ie}`),Z.join(`
`)}let ae=P.trace.steps.find((Ie)=>Ie.type==="parse");if(ae&&ae.type==="parse"){Z.push("INPUT"),Z.push(`  ${ae.input}`),Z.push(""),Z.push(`STEP ${X} ${K.h} Split shell commands`),X++;for(let Ie=0;Ie<ae.segments.length;Ie++){let je=ae.segments[Ie];if(je){let Oe=Math.random();Z.push(`  Segment ${Ie+1}: ${id(je,Oe)}`)}}}let ge=P.trace.segments,ye=ge.length>1;for(let Ie of ge){if(ye){Z.push("");let nn="";if(ae&&ae.type==="parse"){let Bo=ae.segments[Ie.index];if(Bo)nn=Bo.join(" ")}let rn=54,an=nn,en=` Segment ${Ie.index+1}: `,on=" ";if(nn){if(en.length+nn.length+on.length>rn){let kf=rn-en.length-on.length;an=`${nn.substring(0,kf-1)}…`}}let xn=nn?`${en}${an}${on}`:` Segment ${Ie.index+1} `,bf=nn?`${en}${Qe.cyan(an)}${on}`:xn,Js=58-xn.length,zs=Math.floor(Js/2),wf=Js-zs;Z.push(`${K.sh.repeat(zs)}${bf}${K.sh.repeat(wf)}`)}if(Ie.steps.find((nn)=>nn.type==="segment-skipped")){Z.push(""),Z.push("  (skipped — prior segment blocked)");continue}let Oe=!1,Ve=!1;for(let nn of Ie.steps){let rn=sd(nn,X,K);if(rn){if(Ve=!0,nn.type==="recurse"){Z.push("");let an=" RECURSING ",en=58-an.length-4;Z.push(`  ${K.tl}${K.h}${an}${K.h.repeat(en)}`),Z.push(`  ${K.v}`),Oe=!0;continue}for(let an of rn.lines)if(Oe)Z.push(`  ${K.v} ${an}`);else Z.push(an);if(rn.incrementStep)X++}}if(Oe)Z.push(`  ${K.v}`),Z.push(`  ${K.bl}${K.h.repeat(56)}`);if(!Ve)Z.push(""),Z.push(`  ${Qe.green("✓")} Allowed (no matching rules)`)}if(Z.push(""),Z.push("RESULT"),P.result==="blocked"){if(Z.push(`  Status: ${Qe.red("BLOCKED")}`),P.customRule){if(Z.push(`  Rule: ${P.customRule.id}`),P.customRule.rulebook)Z.push(`  Rulebook: ${P.customRule.rulebook.name} ${P.customRule.rulebook.version}`);if(P.customRule.source)Z.push(`  Source: ${P.customRule.source}`);if(P.customRule.override)Z.push(`  Override: reason ${P.customRule.override.reason}`)}if(P.reason){let Ie=mr(P.reason,"          ");Z.push(`  Reason: ${Ie[0]}`);for(let je=1;je<Ie.length;je++)Z.push(Ie[je]??"")}}else Z.push(`  Status: ${Qe.green("ALLOWED")}`);Z.push(""),Z.push("CONFIG");let Pe=P.configSource??"none",Re=P.configValid?"":" (invalid)";Z.push(`  Path: ${Pe}${Re}`);let _e=P.safetyPresetScope;Z.push(`  Safety preset: ${P.selectedPreset??"standard"}${_e?` (${Or(_e)})`:""}`),Z.push(`  Effective capabilities: ${P.effectiveLevel}`);let Ae=Object.entries(P.destructiveCommandRuleOverrides??{});if(Z.push(`  Rule customizations: ${Ae.length}`),P.ruleActivation)Z.push(`  Rule activation: ${P.ruleActivation.id} — ${P.ruleActivation.enabled?"on":"off"} via ${P.ruleActivation.source}`);return Z.join(`
`)}function us(P){return JSON.stringify(P,null,2)}import{resolve as Xh}from"node:path";var ad=512,ld={maxTextLength:2048,maxListLength:128,maxObjectProperties:128,maxDepth:16},Wh=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function ms(P){let G=0,K={allocateSegment(){return G++},getNextSegmentIndex(){return G},branch(){let Y=P.fork(),Z=ms(Y);return{trace:Z,adopt(){P.replaceSegmentEvents(Y.finish().events),G=Z.getNextSegmentIndex()}}},recordGlobal(Y){P.record({scope:"global",step:Y})},recordSegment(Y,Z=K.currentSegmentIndex){if(Z===void 0)return;P.record({scope:"segment",segmentIndex:Z,step:Y})}};return K}function gs(P=new Set){let G=[];return{record(K){if(G.length>=ad)return;ho(K.step,P,ld),G.push({...K,step:ps(K.step,ld,P)})},fork(){return gs(P)},replaceSegmentEvents(K){G.splice(0,G.length,...[...G.filter((Y)=>Y.scope==="global"),...K].slice(0,ad))},finish(){return{events:G}}}}function ho(P,G,K,Y=0,Z=new WeakSet){if(typeof P==="string"){let ae=P.slice(0,K.maxTextLength);if(!it(ae))return;for(let ge of xt(ae))for(let ye of ge.match(/[^\s"'()$]+/g)??[])G.add(cd(ye));return}if(!P||typeof P!=="object"||Y>=K.maxDepth||Z.has(P))return;if(Z.add(P),Array.isArray(P)){let ae=Math.min(P.length,K.maxListLength);for(let ge=0;ge<ae;ge++)ho(P[ge],G,K,Y+1,Z);return}let X=0,ie=new Set;for(let ae in P){if(!Object.hasOwn(P,ae))continue;if(X>=K.maxObjectProperties)break;X++,ho(ae,G,K);let ge=fs(ae,K,G);if(ie.has(ge))continue;ie.add(ge),ho(P[ae],G,K,Y+1,Z)}}function ps(P,G,K,Y=0,Z=new WeakSet){if(typeof P==="string")return fs(P,G,K);if(!P||typeof P!=="object")return P;if(Y>=G.maxDepth)return;if(Z.has(P))return;if(Z.add(P),Array.isArray(P)){let ae=[],ge=Math.min(P.length,G.maxListLength);for(let ye=0;ye<ge;ye++)ae.push(ps(P[ye],G,K,Y+1,Z));return ae}let X={},ie=0;for(let ae in P){if(!Object.hasOwn(P,ae))continue;if(ie>=G.maxObjectProperties)break;ie++;let ge=fs(ae,G,K);if(Object.hasOwn(X,ge))continue;Object.defineProperty(X,ge,{value:ps(P[ae],G,K,Y+1,Z),enumerable:!0,configurable:!0,writable:!0})}return X}function fs(P,G,K){let Y=P.slice(0,G.maxTextLength),Z=it(Y)?ot(Y):Y,X=K.size>0?Zh(Z,K):Z;return(Yh(X)?$e(X):X).slice(0,G.maxTextLength)}function Yh(P){return P.includes("PRIVATE KEY")||P.includes("://")||P.includes("eyJ")||P.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(P)||P.length>=14&&Wh.some((G)=>P.includes(G))||P.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(P)}function Zh(P,G){return P.replace(/[^\s"'()$]+/g,(K)=>G.has(cd(K))?"<redacted>":K)}function cd(P){let G=2166136261,K=2166136261;for(let Y=0;Y<P.length;Y++)G=Math.imul(G^P.charCodeAt(Y),16777619),K=Math.imul(K^P.charCodeAt(P.length-Y-1),16777619);return`${G>>>0}:${K>>>0}:${P.length}`}function gr(P,G={},K){let Y=Xh(G.cwd??process.cwd()),Z=G.policySnapshot??R(K,{cwd:Y,userConfigDir:G.userConfigDir}),X=_(Z.policy,K.env),ie=Je({policySnapshot:Z,effectiveCapabilities:X.capabilities,worktreeMode:X.worktreeMode}),ae={effectiveLevel:ie.effectiveLevel,selectedPreset:Z.policy.safety.level,...Z.policyScopes?{safetyPresetScope:Z.policyScopes.levelScope}:{},effectiveCapabilities:ie.effectiveCapabilities,destructiveCommandRuleOverrides:Z.policy.destructiveCommandRuleOverrides},{configSource:ge,configValid:ye}=ev(K,{cwd:Y,userConfigDir:G.userConfigDir});if(!P||!P.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:ge,configValid:ye,...ae};let Pe=v(P,"auto");if(Pe.status==="limited")throw new b;let Re=Pe.dialect==="powershell"?v(P,"posix"):Pe,_e=Pt(Re),Ae=gs(),Ie=ms(Ae);Ie.recordGlobal({type:"parse",input:P,segments:_e.map((xn)=>[...xn])});let je=l("Bash",{command:P},{kind:"command",shell:"auto"},{configCwd:Y,executionCwd:Y},P),Oe=j(je,{environment:K,trace:Ie,dependencies:{loadPolicySnapshot:()=>Z}}),Ve=Oe.decision.kind==="deny"?Oe.decision:null;if(Ve&&(Oe.stage==="policy-protection"||Oe.stage==="secret-protection"))return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:Qh(Ve),matched:!0,reason:Ve.reason}]}]},result:"blocked",reason:T(Ve.reason),segment:T(dd(Ve,P)),ruleId:T(Ve.ruleId),configSource:ge,configValid:ye,...ae};let nn=Ie.getNextSegmentIndex();if(Ve&&nn>0&&nn<_e.length)Ie.recordSegment({type:"segment-skipped",index:nn,reason:"prior-segment-blocked"},nn);let rn=Ae.finish(),an=Ve?.ruleId??nv(je,Z,X,K),en=V.find((xn)=>xn.id===an&&xn.activationCapability),on=en?ie.policy.effectiveDestructiveCommandRules[en.id]:void 0;return{trace:rv(rn),result:Ve?"blocked":"allowed",reason:Ve?T(Ve.reason):void 0,segment:Ve?T(dd(Ve,P)):void 0,ruleId:Ve?T(Ve.ruleId):void 0,customRule:tv(ov(Ve?.ruleId,Z)),configSource:ge,configValid:ye,...ae,...en&&on?{ruleActivation:{id:en.id,...on}}:{}}}function dd(P,G){return P.evidence?.segment??G}function Qh(P){if(P.reason===Ze)return"policy-protection:findPolicyConfigMutationTargetInSemanticFacts";if(P.reason===Ye)return"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts";if(P.reason===g)return"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts";return"secret-protection:findSensitiveTargetInSemanticFacts"}function ev(P,G){let K=A(G.cwd),Y=W(P,G),Z=ee(P,{cwd:G.cwd,userConfigDir:G.userConfigDir});try{if(r(Z.projectConfigTarget)!==null){if(Un(Z.projectConfigTarget).errors.length===0)return{configSource:K,configValid:!0};return{configSource:K,configValid:!1}}}catch(X){if(X instanceof o)return{configSource:K,configValid:!1};throw X}try{if(r(Z.userConfigTarget)!==null){let X=Un(Z.userConfigTarget);return{configSource:Y,configValid:X.errors.length===0}}return{configSource:null,configValid:!0}}catch(X){if(X instanceof o)return{configSource:Y,configValid:!1};throw X}}function nv(P,G,K,Y){let Z=G.policy,X=Me({...Z,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...Z.destructiveCommandRuleOverrides,...Object.fromEntries(V.flatMap((ae)=>ae.activationCapability?[[ae.id,"on"]]:[]))}},G.state==="degraded"?{diagnostics:G.diagnostics,reason:G.reason}:void 0),ie=j(P,{environment:Y,dependencies:{loadPolicySnapshot:()=>X,getModes:()=>({...K,strict:!0,paranoidRm:!0,paranoidInterpreters:!0,capabilities:{fail_closed:{...K.capabilities.fail_closed,enabled:!0},paranoid_rm:{...K.capabilities.paranoid_rm,enabled:!0},paranoid_interpreters:{...K.capabilities.paranoid_interpreters,enabled:!0}}}),findSensitiveTarget:()=>null}});return ie.decision.kind==="deny"?ie.decision.ruleId:void 0}function tv(P){if(!P)return;return{id:T(P.id),...P.rulebook?{rulebook:{name:T(P.rulebook.name),version:T(P.rulebook.version)}}:{},...P.source?{source:T(P.source)}:{},...P.override?{override:{type:"reason",reason:T(P.override.reason)}}:{}}}function rv(P){let G=P.events.flatMap((Y)=>Y.scope==="global"?[Y.step]:[]),K=new Map;for(let Y of P.events){if(Y.scope!=="segment")continue;let Z=K.get(Y.segmentIndex)??{index:Y.segmentIndex,steps:[]};Z.steps.push(Y.step),K.set(Y.segmentIndex,Z)}return{steps:G,segments:[...K.values()]}}function ov(P,G){let K=P?.replace(/^custom\./,"");if(!K||!G.policy.rules.some((Y)=>Y.name===K))return;return G.ruleMetadata[K]??Object.freeze({id:K})}function ud(P){return new Promise((G)=>{process.stdout.write(`${P}
`,()=>G())})}async function pd(P,G){let K=ls(G);if(!K)return 1;try{let Y=gr(K.command,{cwd:K.cwd},P),Z=!!process.env.NO_COLOR||!process.stdout.isTTY;return await ud(K.json?us(Y):ds(Y,{asciiOnly:Z})),0}catch(Y){let Z=iv(Y instanceof f?Y.cause:Y);if(Z===void 0)throw Y;if(K.json)return await ud(JSON.stringify({error:Z})),1;return console.error(Z),1}}function iv(P){if(P instanceof b)return P.message;if(P instanceof F)return P.message;if(P instanceof m)return P.message;if(P instanceof s&&a[P.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var fd="2.6.18",Rn="  ",Ct="cc-safety-net";function md(P){return P.argument?`${P.flags} ${P.argument}`:P.flags}function sv(P){return Math.max(...P.map((G)=>md(G).length))}function av(P){return Math.max(...P.map((G)=>G.usage.length))}function lv(P){return Math.max(...P.map((G)=>`${Ct} ${G.usage}`.length))}function cv(P,G){let K=`${Ct} ${P.usage}`;return`${Rn}${K.padEnd(G+2)}${P.description}`}function In(P,G){return`${Rn}${P.padEnd(Math.max(40,P.length+2))}${G}`}function Wt(P,G=console.log){let K=[];if(K.push(`${Ct} ${P.name}`),K.push(""),K.push(`${Rn}${P.description}`),K.push(""),K.push("USAGE:"),K.push(`${Rn}${Ct} ${P.usage}`),K.push(""),P.subcommands&&P.subcommands.length>0){K.push("SUBCOMMANDS:");let Y=av(P.subcommands);for(let Z of P.subcommands)K.push(`${Rn}${Z.usage.padEnd(Y+2)}${Z.description}`);K.push("")}if(P.options.length>0){K.push("OPTIONS:");let Y=sv(P.options);for(let Z of P.options){let X=md(Z),ie=Z.default?`${Z.description} (default: ${Z.default})`:Z.description;K.push(`${Rn}${X.padEnd(Y+2)}${ie}`)}K.push("")}if(P.examples&&P.examples.length>0){K.push("EXAMPLES:");for(let Y of P.examples)K.push(`${Rn}${Y}`)}G(K.join(`
`))}function ys(){let P=lv(Ar),G=[];G.push(`${Ct} v${fd}`),G.push(""),G.push("Blocks destructive commands and secret access."),G.push(""),G.push("COMMANDS:");for(let K of Ar)G.push(cv(K,P));G.push(""),G.push("GLOBAL OPTIONS:"),G.push(`${Rn}-h, --help       Show help (use with command for command-specific help)`),G.push(`${Rn}-V, --version    Show version`),G.push(""),G.push("HELP:"),G.push(`${Rn}${Ct} help <command>     Show help for a specific command`),G.push(`${Rn}${Ct} <command> --help   Show help for a specific command`),G.push(""),G.push("ENVIRONMENT VARIABLES:"),G.push(In(`${n.level.name}=standard|strict|paranoid`,"Set session safety level")),G.push(In(`${n.worktree.name}=1`,"Allow local git discards in linked worktrees")),G.push(In(`${n.debug.name}=1`,"Print diagnostic messages to stderr")),G.push(In(`${n.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),G.push(In(`${n.projectTightenOnly.name}=1`,"Ignore project policy settings that weaken the user policy")),G.push(In("CC_SAFETY_NET_HOME","Override rule config home directory")),G.push(""),G.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),G.push(In(`${n.strict.name}=1`,"Force safety.overrides.fail_closed on")),G.push(In(`${n.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),G.push(In(`${n.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),G.push(In(`${n.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),G.push(""),G.push("Documentation:        https://ccsafetynet.com/docs"),console.log(G.join(`
`))}function gd(){console.log(fd)}function yr(P,G=console.log){let K=_r(P);if(!K)return!1;if(K.name.toLowerCase()!==P.toLowerCase())return!1;return Wt(K,G),!0}import{existsSync as So,readFileSync as Cu}from"node:fs";import{join as Po}from"node:path";import*as Vn from"node:readline";function dv(P){return P==="install"?"Install":"Uninstall"}function uv(P){return P==="install"?"Installing":"Uninstalling"}function pv(P){return P==="install"?"into":"from"}function vd(P){return P?.available===!0}function fv(P,G){let K=new Set(G);return P.filter((Y)=>K.has(Y.target)).map((Y)=>Y.target)}function yd(P,G,K){if(P.every((Y)=>!Y.available))return G;return Array.from({length:P.length},(Y,Z)=>Z+1).map((Y)=>(G+Y*K+P.length)%P.length).find((Y)=>vd(P[Y]))}function mv(P,G,K){if(K.ctrl&&K.name==="c")return"interrupt";if(K.name==="escape"||G==="q")return"abort";if(P==="install"&&(G==="u"||G==="U"))return"update";if(K.name==="up"||G==="k")return"up";if(K.name==="down"||G==="j")return"down";if(K.name==="space"||G===" ")return"toggle";if(K.name==="return"||K.name==="enter")return"confirm";return null}function gv(P){return{cursor:P.findIndex((G)=>G.available),selected:[]}}function yv(P,G,K){if(K==="confirm"||K==="update"||K==="abort"||K==="interrupt")return{state:P,done:K};if(K==="up")return{state:{...P,cursor:yd(G,P.cursor,-1)}};if(K==="down")return{state:{...P,cursor:yd(G,P.cursor,1)}};let Y=G[P.cursor];if(!vd(Y))return{state:P};let Z=P.selected.includes(Y.target)?P.selected.filter((X)=>X!==Y.target):fv(G,[...P.selected,Y.target]);return{state:{...P,selected:Z}}}var bd="◉",wd="◯",kd=">",Cd=" ";function hv(P,G,K){return["",`${dv(P)} CC Safety Net ${pv(P)}:`,"",...G.map((Y,Z)=>{let X=K.selected.includes(Y.target),ie=Z===K.cursor,ae=X?bd:wd,ge=ie?kd:Cd,ye=Y.available?"":` (${Y.unavailableReason??"not installed"})`,Pe=`${ae} ${Y.label}${ye}`,Re=!Y.available?Qe.dim(Pe):X?Qe.green(Pe):ie?Qe.bold(Pe):Pe;return`${ge} ${Re}`}),"",P==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":G.some((Y)=>Y.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${P}. q/Esc: close`].join(`
`)}var hd=["global-hook","plugin"];function vv(P,G,K={}){let Y=K.color!==!1?Qe.bold:(X)=>X;return["","Install the Kimi Code integration as:","",...[`Global hook — ${G?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((X,ie)=>{let ae=ie===P,ge=`${ae?bd:wd} ${X}`;return`${ae?kd:Cd} ${ae?Y(ge):ge}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function xd(P){let{input:G,output:K}=P;Vn.emitKeypressEvents(G);let Y=G.isRaw===!0;G.setRawMode(!0),G.resume();let Z=0,X=()=>{if(Z===0)return;Vn.moveCursor(K,0,-Z),Vn.cursorTo(K,0),Vn.clearScreenDown(K)},ie=()=>{X();let ae=P.render();K.write(`${ae}
`),Z=ae.split(`
`).length};return new Promise((ae)=>{let ge=(Pe)=>{G.off("keypress",ye),G.setRawMode(Y),G.pause(),X(),ae(Pe)};function ye(Pe,Re){P.onKey(Pe,Re,{finish:ge,draw:ie})}G.on("keypress",ye),ie()})}function Pd(P={}){let G=0;return xd({input:P.input??process.stdin,output:P.output??process.stdout,render:()=>vv(G,P.globalHookInstalled===!0),onKey:(K,Y,Z)=>{if(Y.ctrl&&Y.name==="c"){Z.finish(null),(P.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(Y.name==="escape"||K==="q")return Z.finish(null);if(Y.name==="return"||Y.name==="enter")return Z.finish(hd[G]);if(Y.name==="up"||Y.name==="down"||K==="k"||K==="j")G=(G+1)%hd.length,Z.draw()}})}function hs(P=process.stdin,G=process.stdout){return Boolean(P.isTTY&&G.isTTY&&typeof P.setRawMode==="function")}function Sd(P,G,K={}){let Y=K.output??process.stdout,Z=gv(G);return xd({input:K.input??process.stdin,output:Y,render:()=>hv(P,G,Z),onKey:(X,ie,ae)=>{let ge=mv(P,X,ie);if(!ge)return;let ye=yv(Z,G,ge);if(Z=ye.state,ye.done==="interrupt"){ae.finish(null),(K.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(ye.done==="abort")return ae.finish(null);if(ye.done==="update")return ae.finish("update");if(ye.done==="confirm"){if(Z.selected.length===0){Y.write("\x07"),ae.draw();return}ae.finish([...Z.selected]),Y.write(`${uv(P)} selected integrations...
`);return}ae.draw()}})}import{existsSync as Rd,lstatSync as wv,mkdirSync as kv,mkdtempSync as Cv,readdirSync as xv,readFileSync as Zt,rmSync as bo}from"node:fs";import{basename as Pv,dirname as Sv,join as kn}from"node:path";import{fileURLToPath as Rv}from"node:url";var vs="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",St="cc-safety-net",At="cc-safety-net/index.ts";import{spawn as bv}from"node:child_process";var bs=(P,G)=>{let K=Zn([...P],process.env);return new Promise((Y)=>{let Z=bv(K.cmd,K.args,{cwd:G,stdio:["ignore","pipe","pipe"]}),X=pi(Z),ie=!1,ae=setTimeout(()=>{ie=!0,Z.kill()},120000);Z.on("error",(ge)=>{clearTimeout(ae),Y({status:null,errorCode:ge.code,stdout:X.stdout,stderr:[ge.message,X.stderr].filter(Boolean).join(`
`)})}),Z.on("close",(ge)=>{clearTimeout(ae),Y({status:ie?null:ge,errorCode:ie?"ETIMEDOUT":void 0,stdout:X.stdout,stderr:X.stderr})})})};var Yt="cc-safety-net.ts",ws=kn("amp",At);function Ev(P){return kn(P.home,".config","amp","plugins","cc-safety-net.ts")}function Tv(){let P=Sv(Rv(import.meta.url)),G=kn(P,ws),K=kn(P,"..",ws),Y=kn(P,"..","..","..","dist",ws);return[G,K,Y]}function Av(P=Tv()){let G=P.find((K)=>Rd(K)&&wv(K).isFile());if(!G)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return G}function Ed(P){try{return JSON.parse(P)}catch{return}}function wo(P){return P.subarray(0,Buffer.byteLength(vs)).toString("utf-8")===vs}async function hr(P,G,K){let Y=await P(G,K);if(Y.status===0)return Y;throw Error([`Failed to run ${G.join(" ")}${Y.status===null?"":` (exit ${Y.status})`}.`,[Y.stdout,Y.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function Td(P){let G=await P(["amp","plugins","repositories","--json"]);if(G.status===null)throw Error(`${G.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${G.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${G.stderr}`.trim());if(G.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${G.status}). Sign in with "amp login" and rerun install --amp.
${[G.stdout,G.stderr].filter(Boolean).join(`
`)}`.trim());let K=Ed(G.stdout),Y=(Array.isArray(K)?K:[]).filter((Z)=>Fe(Z,"scope")==="user"&&Fe(Z,"exists")===!0&&Fe(Z,"viewerCanWrite")===!0).map((Z)=>Fe(Z,"cloneRef")).find((Z)=>typeof Z==="string"&&Z.length>0);if(!Y)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return Y}async function Ad(P,G,K){let Y=Cv(kn(G.tmpdir,"cc-safety-net-amp-"));try{return await hr(P,["amp","clone","user-plugins",Y]),await K(Y)}finally{bo(Y,{recursive:!0,force:!0})}}function ks(P){return`rerun ${P==="overwrite"?"install":"uninstall"} --amp`}function _d(P,G,K){let Y=kn(P,G),Z=cn(Y);if(!Z)return;if(Z.isSymbolicLink()||!Z.isFile())throw Error(`Refusing to ${K} ${G} in your Amp personal plugins repository: not a regular file. Remove it there and ${ks(K)}.`);let X=Zt(Y);if(wo(X))return X;throw Error(`Refusing to ${K} unmanaged file ${G} in your Amp personal plugins repository. Remove it there and ${ks(K)}.`)}function Id(P,G){let K=kn(P,St),Y=cn(K);if(!Y)return;if(Y.isSymbolicLink()||!Y.isDirectory())throw Error(`Refusing to ${G} ${St} in your Amp personal plugins repository: not a regular directory. Remove it there and ${ks(G)}.`);return _d(P,At,G)}function _v(P){let G=kn(P,Yt),K=cn(G);if(!K||K.isSymbolicLink()||!K.isFile())return;let Y=Zt(G);return wo(Y)?Y:void 0}async function Od(P,G,K,Y){if(await hr(P,K,G),(await hr(P,["git","status","--porcelain"],G)).stdout.trim()==="")return!1;return await hr(P,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",Y],G),await hr(P,["git","push","origin","HEAD"],G),!0}function vo(P,G){Iv(P,G),Ov(P,G)}function $d(P,G){if(G==="keep")return;throw Error(`Local Amp plugin ${P} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function Iv(P,G){let K=Ev(P),Y=cn(K);if(!Y)return;if(!Y.isSymbolicLink()&&Y.isFile()&&wo(Zt(K))){bo(K);return}$d(K,G)}function Ov(P,G){let K=kn(P.home,".config","amp","plugins",St),Y=cn(K);if(!Y)return;if(!Y.isSymbolicLink()&&Y.isDirectory()&&$v(K)){bo(K,{recursive:!0});return}$d(K,G)}function $v(P){let G=Pv(At);if(xv(P).join("\x00")!==G)return!1;let K=kn(P,G),Y=cn(K);return!!Y&&!Y.isSymbolicLink()&&Y.isFile()&&wo(Zt(K))}function Dv(P){let G=u(P);if(!Rd(G))return"";let K=Ed(Zt(G,"utf-8"));if(!K||typeof K!=="object"||Array.isArray(K))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(k(K,P.home))};
`}async function Dd(P,G=Av(),K=bs){let Y=Buffer.concat([Zt(G),Buffer.from(Dv(P),"utf-8")]),Z=await Td(K);return Ad(K,P,async(X)=>{let ie=`${Z}/${St}`,ae=Id(X,"overwrite"),ge=_d(X,Yt,"overwrite");if(ae?.equals(Y)&&!ge)return vo(P,"fail"),{path:ie,alreadyInstalled:!0};if(kv(kn(X,St),{recursive:!0}),sn(kn(X,At),Y),ge)bo(kn(X,Yt));let ye=await Od(K,X,["git","add","--",At,...ge?[Yt]:[]],`chore: update cc-safety-net plugin to v${un()}`);return vo(P,"fail"),{path:ie,alreadyInstalled:!ye}})}async function Nd(P,G=bs){let K=await Td(G);return Ad(G,P,async(Y)=>{let Z=Id(Y,"remove"),X=_v(Y),ie=`${K}/${X&&!Z?Yt:St}`;if(!Z&&!X)return vo(P,"keep"),{path:ie,alreadyInstalled:!1};return await Od(G,Y,["git","rm","--",...Z?[At]:[],...X?[Yt]:[]],`chore: remove cc-safety-net plugin v${un()}`),vo(P,"keep"),{path:ie,alreadyInstalled:!0}})}import{existsSync as Ld,mkdirSync as Nv,readFileSync as Lv}from"node:fs";import{dirname as jv}from"node:path";var Cs=wn["antigravity-cli"],_t="cc-safety-net";function It(P){return Boolean(P)&&typeof P==="object"&&!Array.isArray(P)}function Co(){return{PreToolUse:[{hooks:[{type:"command",command:Cs,timeout:30}]}]}}function jd(P){try{let G=JSON.parse(Lv(P,"utf-8"));if(!G||typeof G!=="object"||Array.isArray(G))throw Error("Antigravity hooks config must be a JSON object");return G}catch(G){if(G instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${P}: ${G.message}`);throw G}}function Fd(P){let G=P[_t];if(G===void 0){let Y=Co();return P[_t]=Y,{definition:Y,preToolUse:Y.PreToolUse??[]}}if(!It(G))throw Error(`Antigravity hooks config entry "${_t}" must be an object`);let K=Array.isArray(G.PreToolUse)?G.PreToolUse:[];return G.PreToolUse=K,{definition:G,preToolUse:K}}function Hd(P){if(!Array.isArray(P.PreToolUse))return!1;return P.PreToolUse.some((G)=>It(G)&&Array.isArray(G.hooks)&&G.hooks.some((K)=>It(K)&&K.command===Cs))}function Fv(P){return Object.values(P).some((G)=>It(G)&&G.enabled!==!1&&Hd(G))}function Hv(P){if(P[_t]===void 0)return!1;let G=Fd(P);if(G.definition.enabled!==!1||!Hd(G.definition))return!1;return G.definition.enabled=!0,!0}function Mv(P){if(P[_t]===void 0){P[_t]=Co();return}let G=Fd(P);G.definition.enabled=!0,G.preToolUse.push(Co().PreToolUse?.[0]??{hooks:[]})}function Uv(P){let G=!1;for(let K of Object.values(P)){if(!It(K)||!Array.isArray(K.PreToolUse))continue;K.PreToolUse=K.PreToolUse.flatMap((Y)=>{if(!It(Y)||!Array.isArray(Y.hooks))return[Y];let Z=Y.hooks.filter((X)=>!It(X)||X.command!==Cs);if(Z.length!==Y.hooks.length)G=!0;return Z.length===0?[]:[{...Y,hooks:Z}]})}return G}function ko(P,G){sn(P,`${JSON.stringify(G,null,2)}
`)}function Md(P){let G=rr(P.home);if(Nv(jv(G),{recursive:!0}),!Ld(G))return ko(G,{[_t]:Co()}),{path:G,alreadyInstalled:!1};let K=jd(G);if(Fv(K))return{path:G,alreadyInstalled:!0};if(Hv(K))return ko(G,K),{path:G,alreadyInstalled:!1};return Mv(K),ko(G,K),{path:G,alreadyInstalled:!1}}function Ud(P){let G=rr(P.home);if(!Ld(G))return{path:G,alreadyInstalled:!1};let K=jd(G);if(!Uv(K))return{path:G,alreadyInstalled:!1};return ko(G,K),{path:G,alreadyInstalled:!0}}import{existsSync as Ss,readlinkSync as qv}from"node:fs";import{join as Kn}from"node:path";import{spawn as Bv}from"node:child_process";var On=Sn.map((P)=>({target:P.id,flag:P.flag,label:ln(P.id),probeCommand:P.probeCommand}));function xs(P){let G=new Set(P);return On.map((K)=>K.target).filter((K)=>G.has(K))}async function Bd(P,G){for(let K of P)await G(K)}var Gv=5000;function vr(P,G=Gv){return new Promise((K)=>{let Y=Zn([...P],process.env),Z=Bv(Y.cmd,Y.args,{env:process.env,stdio:"ignore"}),X=!1,ie=(ge)=>{if(X)return;X=!0,clearTimeout(ae),K(ge)},ae=setTimeout(()=>{Z.kill(),ie(!1)},G);Z.on("error",()=>ie(!1)),Z.on("close",(ge)=>ie(ge===0))})}function Gd(P=vr,G={}){let K=new Set(G.configuredTargets??[]);return Promise.all(On.map(async(Y)=>({target:Y.target,flag:Y.flag,label:Y.label,...Vd(G.action,await P(Y.probeCommand)||Y.target==="cursor"&&await P(sa),K.has(Y.target))})))}function qd(P,G){let K=new Set(G.configuredTargets??[]);return P.map((Y)=>({...Y,...Vd(G.action,Y.available,K.has(Y.target))}))}function Vd(P,G,K){if(P==="uninstall")return K?{available:!0}:{available:!1,unavailableReason:"not installed"};if(P==="install"&&K)return{available:!1,unavailableReason:"already installed"};if(!G)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}var En="cc-safety-net",Wd=["npx","-y","@deepseek-ai/dsh"],Kd="DeepSeek Harness",Jd=["@deepseek-ai","dsh-desktop"],Yd="Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.",Ps=(P)=>`DeepSeek Harness Desktop is not in its default location, so ${P} ${En} from its Plugins page.`,Zd=(P,G)=>Kn(Ci(P),G,"package.json"),Xd=(P,G)=>Ss(Zd(P,G));function Vv(P,G){let K=yn(Zd(P,G)),Y=Fe(K.kind==="ok"?K.value:void 0,"dependencies");return typeof Y==="object"&&Y!==null?Object.keys(Y).filter((Z)=>Z!==En):[]}function Rs(P,G){let K=G.platform??process.platform,Y=Xd(P,"desktop"),Z=K==="darwin"?[Kn(P.home,"Applications"),G.systemApplications??"/Applications"].map((X)=>Kn(X,`${Kd}.app`,"Contents","Resources","runtime","cli","bin","dsh")):K==="win32"?[Kn(P.env.get("LOCALAPPDATA")||Kn(P.home,"AppData","Local"),"Programs",Kd,"resources","runtime","cli","bin","dsh.cmd")]:[];return{profile:Y,cli:Y?Z.find((X)=>Ss(X)):void 0}}function Qd(P,G=process.platform){if(G==="win32")return Ss(Kn(P.env.get("APPDATA")||Kn(P.home,"AppData","Roaming"),...Jd,"lockfile"));let K=Kv(Kn(P.home,"Library","Application Support",...Jd,"SingletonLock")),Y=Number(/-(\d+)$/.exec(K??"")?.[1]);return Number.isInteger(Y)&&Y>0&&Jv(Y)}function Kv(P){try{return qv(P)}catch{return}}function Jv(P){try{return process.kill(P,0),!0}catch(G){return G.code==="EPERM"}}async function eu(P,G={}){let K=Rs(P,G);if(K.cli&&Qd(P,G.platform))throw Error(Yd);let Y=!K.cli||Xd(P,"web")||await(G.probe??vr)(qo),Z=[...K.cli?[{profile:"desktop",label:"Desktop",dsh:[K.cli]}]:[],...Y?[{profile:"web",label:"web",dsh:Wd}]:[]],X=Z.map((ie)=>({label:ie.label,plugins:Vv(P,ie.profile)})).filter((ie)=>ie.plugins.length>0);return{commands:Z.map((ie)=>[...ie.dsh,"plugin","--profile",ie.profile,"add",`${En}@${un()}`]),afterInstall:async()=>{let ie=new Set(xi(P).filter((ge)=>ge.enabled).map((ge)=>ge.name)),ae=Z.filter((ge)=>!ie.has(ge.profile));if(ae.length>0)throw Error(`DeepSeek Harness installed ${En} in the ${zd(ae)} but did not enable it. Enable it from the Plugins page.`)},message:[`Added ${En} to the DeepSeek Harness ${zd(Z)}.`,...K.profile&&!K.cli?[Ps("add")]:[],...X.length>0?[...X.map((ie)=>`Other plugins in the DeepSeek Harness ${ie.label} profile: ${ie.plugins.join(", ")}.`),`CC Safety Net does not check commands a plugin's own shell tool runs until you declare it: npx -y ${En} rule tool add <tool-name>`,...X.map((ie)=>`DeepSeek Harness ${ie.label} 配置中的其他插件：${ie.plugins.join("、")}。`),`插件自带的 shell 工具需要声明后，CC Safety Net 才会检查它执行的命令：npx -y ${En} rule tool add <工具名>`]:[]].join(`
`)}}function zd(P){return`${P.map((G)=>G.label).join(" and ")} profile${P.length>1?"s":""}`}function nu(P,G={}){let K=new Set(xi(P).map((X)=>X.name));if(!K.has("desktop")&&!K.has("web"))throw Error(`${En} is not installed in the DeepSeek Harness web or Desktop profile`);let Y=K.has("desktop")?Rs(P,G).cli:void 0,Z=K.has("desktop")&&!Y;if(Z&&!K.has("web"))throw Error(Ps("remove"));if(Y&&Qd(P,G.platform))throw Error(Yd);return{commands:[...Y?[[Y,"plugin","--profile","desktop","remove",En]]:[],...K.has("web")?[[...Wd,"plugin","--profile","web","remove",En]]:[]],...Z?{afterUninstall:()=>{throw Error(`Removed ${En} from the DeepSeek Harness web profile, but ${Ps("remove")}`)}}:{}}}function tu(P,G,K={}){let Y=Rs(G,K).cli!==void 0;return P.map((Z)=>Z.target==="deepseek-harness"&&Y?{...Z,available:!0,unavailableReason:void 0}:Z)}import{existsSync as zv,readdirSync as Wv,rmSync as Yv}from"node:fs";import{join as Zv}from"node:path";function ru(P,G=process.platform,K){if(!zv(P))return;let Y=G==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);Wv(P).filter((Z)=>Z!==K&&Y.test(Z)).forEach((Z)=>{Yv(Zv(P,Z),{recursive:!0,force:!0})})}import{existsSync as ou,readdirSync as Xv,rmSync as Qv}from"node:fs";import{join as Xt}from"node:path";function xo(P,G=process.platform){let K=Xt(P.env.get("npm_config_cache")||(G==="win32"?Xt(P.env.get("LOCALAPPDATA")||Xt(P.home,"AppData","Local"),"npm-cache"):Xt(P.home,".npm")),"_npx");if(!ou(K))return;Xv(K).filter((Y)=>ou(Xt(K,Y,"node_modules","cc-safety-net"))).forEach((Y)=>{Qv(Xt(K,Y),{recursive:!0,force:!0})})}import{existsSync as du,mkdirSync as nb,readFileSync as uu}from"node:fs";import{dirname as tb,join as cu}from"node:path";function eb(P,G){if(P[G]!=="#")return G;let K=P.indexOf(`
`,G+1);return K===-1?P.length:K+1}function Es(P,G,K){let Y=new RegExp(`^(\\s*)${G}\\s*=\\s*\\[`),Z=0;for(let X of P.split(`
`)){if(/^\s*\[/.test(X))return;let ie=Y.exec(X);if(ie){let ae=Z+ie[0].lastIndexOf("[");return{start:ae,end:ci(P,ae,{skipComment:eb,...K})}}Z+=X.length+1}return}function iu(P,G,K){let Y=P.slice(0,G.end).trimEnd(),Z=yl(P,G.end),X=Z===""?"     ":`${Z}  `,ie=!Y.endsWith("[")&&!Y.endsWith(",");return`${Y}${ie?",":""}
${X}${K}${P.slice(G.end)}`}function su(P,G,K){let Y=P.indexOf(K,G.start);if(Y===-1||Y>G.end)return P;return`${P.slice(0,Y)}${P.slice(Y+K.length).replace(/^\s*,/,"")}`}function au(P,G){let K=new RegExp(`^\\s*${G}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),Y=P.split(`
`),Z=Y.findIndex((ae)=>/^\s*\[/.test(ae)),X=Z===-1?Y:Y.slice(0,Z),ie=Z===-1?[]:Y.slice(Z);return[...X.filter((ae)=>!K.test(ae)),...ie].join(`
`)}function lu(P,G,K){let Y=new RegExp(`^\\s*\\[\\[${G}]]\\s*$`,"m");return P.split(/(?=^\s*\[)/m).filter((Z)=>!Y.test(Z)||!Z.includes(K)).join("").trimEnd()}var br=wn["kimi-code"],Ts=`[[hooks]]
event = "PreToolUse"
command = "${br}"`,pu=`{ event = "PreToolUse", command = "${br}" }`,fu={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function mu(P){return cu(P.env.get("KIMI_CODE_HOME")??cu(P.home,".kimi-code"),"config.toml")}function rb(P){let G=Es(P,"hooks",fu);if(G&&P.slice(G.start+1,G.end).trim())return iu(P,G,pu);let K=au(P,"hooks").trimEnd();if(K==="")return`${Ts}
`;return`${K}

${Ts}
`}function gu(P){let G=mu(P);if(nb(tb(G),{recursive:!0}),!du(G))return sn(G,`${Ts}
`),{path:G,alreadyInstalled:!1};let K=uu(G,"utf-8");if(K.includes(br))return{path:G,alreadyInstalled:!0};return sn(G,rb(K)),{path:G,alreadyInstalled:!1}}function yu(P){let G=mu(P);if(!du(G))return{path:G,alreadyInstalled:!1};let K=uu(G,"utf-8");if(!K.includes(br))return{path:G,alreadyInstalled:!1};let Y=Es(K,"hooks",fu),Z=Y?su(K,Y,pu):`${lu(K,"hooks",br)}
`;return sn(G,Z),{path:G,alreadyInstalled:!0}}var As="safety-net@cc-marketplace",hu=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),vu=new Set(["antigravity-cli","cursor","devin","droid","grok-build","hermes-agent","kimi-code"]);function _s(P){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(P??"")}function xu(P){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(P??"")}function ob(P){return/^Marketplace `cc-marketplace`\s*$/m.test(P??"")}var Pu={"claude-code":{installCommands:(P)=>{let G=Kr(P,"cc-safety-net@cc-marketplace");return{commands:[...G?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...ai(P).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:Kr(P,As)?[["claude","plugin","uninstall",As]]:[],update:G}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(P,G)=>{let K=G??await pn(["codex","plugin","list"]),Y=xu(K);return{commands:[Y||ob(K)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:_s(K)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:Y}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:pl},"copilot-cli":{installCommands:async()=>{let P=await pn(["copilot","plugin","list"]),G=[...Pl(P)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...Sl(P)?[["copilot","plugin","uninstall",kl]]:[]];if(Cl(P))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",An]],cleanupCommands:G,update:!0};return{commands:[xl(await pn(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",An]],cleanupCommands:G}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(P)=>{let G=$i(P);if(G.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(G.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:zi,installCommands:(P)=>{let G=!So(Po(ur(P),Cn));return{commands:Nc(),afterInstall:()=>Lc(G)}},uninstallCommands:[["openclaw","plugins","uninstall",dn,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{installCommands:Kc},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]},"deepseek-harness":{installCommands:(P)=>eu(P),uninstallCommands:(P)=>nu(P)}};function Su(P,G=(K)=>K){try{let K=JSON.parse(G(Cu(P,"utf-8")));if(!K||typeof K!=="object"||Array.isArray(K))throw Error(`Settings file ${P} must be a JSON object`);return K}catch(K){if(K instanceof SyntaxError)throw Error(`Failed to parse ${P}: ${K.message}`);throw K}}function ib(P){let G=Po(sr(P),"settings.json");if(!So(G))return;let K=Su(G,gn),Y=K.enabledPlugins;if(!Y||typeof Y!=="object"||Array.isArray(Y))return;if(Y[An]!==!1)return;let Z=Cu(G,"utf-8"),X=Z.replace(new RegExp(`("${An}"\\s*:\\s*)false`),"$1true");return Y[An]=!0,sn(G,X!==Z?X:`${JSON.stringify(K,null,2)}
`),`Enabled ${An} plugin in ${G}`}function sb(P){let G=is(P);if(!So(G))return;let K=Su(G);if(!Array.isArray(K.packages))return;let Y=K.packages.find((Z)=>!!Z&&typeof Z==="object"&&!Array.isArray(Z)&&ss(Z.source)&&("extensions"in Z));if(!Y)return;return delete Y.extensions,sn(G,`${JSON.stringify(K,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${G}`}function bu(P,G){let K=fn({label:G,booleans:Object.fromEntries(On.map((X)=>[X.target,[X.flag]]))},P),Y=K.errors[0];if(Y)throw Error(Y);let Z=On.filter((X)=>K.flags[X.target]).map((X)=>X.target);if(Z.length!==1)throw Error(`Choose exactly one ${G} target: ${On.map((X)=>X.flag).join(", ")}`);return Z[0]}async function Ru(P,G=Ft){let[K,Y,Z]=await Promise.all([G(["amp","plugins","list"],30000),G(["codex","plugin","list"],30000),G(["copilot","--binary-version"])]);return{codexPluginListOutput:Y,hooks:zt(P,process.cwd(),{ampPluginListOutput:K,codexPluginListOutput:Y,copilotCliVersion:Z})}}async function ab(P,G,K=Ft){let Y=await Ru(P,K);return Y.hooks.filter((Z)=>G==="install"?Z.configured:Z.detected&&Z.method!==eo||Z.inspectionStatus==="not-inspected").filter((Z)=>!Au(Z)).filter((Z)=>Z.platform!=="codex"||!_s(Y.codexPluginListOutput)||xu(Y.codexPluginListOutput)).map((Z)=>Z.platform)}function lb(P,G,K,Y){if(K.length>0)return{finish:async()=>[bu(K,G)]};if(!Y.selectTargets&&!hs(Y.input,Y.output))return{finish:async()=>[bu(K,G)]};let Z=Y.detectConfiguredTargets??(()=>ab(P,G,Y.fetchVersion)),X=Promise.all([Gd(Y.probeTargets).then((ie)=>tu(ie,P)),Z()]);return{ready:X,finish:async()=>{let[ie,ae]=await X,ge=qd(ie,{action:G,configuredTargets:ae}),ye=Y.selectTargets?await Y.selectTargets(G,ku(G,ge)):await Sd(G,ku(G,ge),{input:Y.input,output:Y.output});if(ye==="update")return ye;if(!ye||ye.length===0)return null;return xs(ye)}}}async function cb(P,G,K=!1,Y){let Z=Pu[P];Z.beforeInstall?.(G);let X=typeof Z.installCommands==="function"?await Z.installCommands(G,Y):{commands:Z.installCommands};return await fi(X.commands),await Ol(X.cleanupCommands??[]),await X.afterInstall?.(),[`${X.update||K?"Updated":"Installed"} ${ln(P)} integration`,X.message??Z.postInstallMessage].filter(Boolean).join(`
`)}async function db(P,G){let K=Pu[P];if(!K.uninstallCommands)throw Error(`${ln(P)} uninstall is not supported`);let Y=typeof K.uninstallCommands==="function"?K.uninstallCommands(G):{commands:K.uninstallCommands};return await fi(Y.commands),Y.afterUninstall?.(),`Uninstalled ${ln(P)} integration`}function ub(P){let G=Wc(P);return G.alreadyInstalled?`Uninstalled OpenCode plugin from ${G.path}`:`OpenCode plugin not installed in ${G.path}`}var Eu={"antigravity-cli":{install:Md,uninstall:Ud},cursor:{install:Fl,uninstall:Hl},devin:{install:zl,uninstall:Wl},droid:{install:tc,uninstall:rc},"grok-build":{install:uc,uninstall:pc},"kimi-code":{install:gu,uninstall:yu}};function pb(P,G,K,Y=!1){if(P==="install"&&!Y)xo(K);let Z=Eu[G][P](K),X=ln(G),ie=P!=="install"?"Uninstalled":Y?"Updated":"Installed";return P==="install"&&Z.alreadyInstalled?Y?`${X} hook up to date in ${Z.path}`:`${X} hook already installed in ${Z.path}`:P==="uninstall"&&!Z.alreadyInstalled?`${X} hook not installed in ${Z.path}`:`${ie} ${X} hook ${P==="install"?"in":"from"} ${Z.path}`}var Tu={amp:{install:Dd,uninstall:Nd,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:bc,uninstall:wc,afterInstall:async(P)=>{let G=Gi(P);return await pn(["hermes","plugins","enable",Pn,"--no-allow-tool-override"]),!G},beforeUninstall:async(P)=>{Bi(P);try{await pn(["hermes","plugins","disable",Pn])}catch(G){console.warn(`${G instanceof Error?G.message:String(G)}
Removing the plugin files anyway; ${Pn} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function fb(P,G,K,Y=!1){let Z=Tu[G];if(P==="uninstall")await Z.beforeUninstall?.(K);let X=P==="install"?await Z.install(K):await Z.uninstall(K),ie=P==="install"&&await Z.afterInstall?.(K),ae=ln(G),ge=!ie&&(P==="install"&&X.alreadyInstalled||P==="uninstall"&&!X.alreadyInstalled);return[ge?P==="install"?`${ae} plugin ${Y?"up to date":"already installed"} at ${X.path}`:`${ae} plugin not installed at ${X.path}`:`${P!=="install"?"Uninstalled":Y?"Updated":"Installed"} ${ae} plugin ${P==="install"?"at":"from"} ${X.path}`,ge?void 0:Z.restartNote].filter(Boolean).join(`
`)}var mb={"copilot-cli":{afterInstall:ib},cursor:{afterUninstall:Dl},"hermes-agent":{beforeInstall:(P,G)=>{if(!G)xo(P)}},openclaw:{beforeUninstall:zi},pi:{afterInstall:sb}};function gb(P){return P in Eu}function yb(P){return P in Tu}var wu=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net/tree/plugin","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function Au(P){return P.platform==="kimi-code"&&P.method===uo}function _u(P){return po({environment:P,cwd:process.cwd()}).method==="hook config"}function hb(P){if(!_u(P))return wu;return[wu,"",Qe.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function ku(P,G){return G.map((K)=>P==="install"&&K.target==="kimi-code"&&K.unavailableReason==="already installed"?{...K,available:!0,unavailableReason:void 0,label:`${K.label} (global hook installed)`}:K)}function vb(P,G){if(P.selectKimiInstallMethod)return P.selectKimiInstallMethod();if(!hs(P.input,P.output))return Promise.resolve("global-hook");return Pd({input:P.input,output:P.output,globalHookInstalled:_u(G)})}async function Iu(P,G,K,Y=!1,Z){let X=mb[G];if(P==="install")X?.beforeInstall?.(K,Y);if(P==="uninstall")X?.beforeUninstall?.(K);if(gb(G))return[pb(P,G,K,Y),P==="uninstall"?await X?.afterUninstall?.(K):void 0].filter(Boolean).join(`
`);if(yb(G))return fb(P,G,K,Y);if(P==="uninstall")return G==="opencode"?ub(K):db(G,K);return[await cb(G,K,Y,Z),await X?.afterInstall?.(K)].filter(Boolean).join(`
`)}function bb(P){let G=fn({label:"update"},P).errors[0];if(G)throw Error(G)}async function wb(P,G=Ft){let K=await Ru(P,G),Y=Po(sr(P),"installed-plugins");return{targets:xs([...K.hooks.filter((X)=>X.platform!=="copilot-cli"&&X.detected&&X.method!==eo&&X.method!==bi).map((X)=>X.platform),...[Jr,wl,bl].flatMap((X)=>So(Po(Y,...X))?["copilot-cli"]:[]),...Kr(P,As)?["claude-code"]:[],..._s(K.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:K.codexPluginListOutput,kimiPlugin:K.hooks.some(Au)}}async function kb(P){let G=c(),K=P.output??process.stdout,Y=(P.scriptPath??process.argv[1]??"").split(/[\\/]/),Z=Y.find((Ae)=>/^bunx-\d+-/.test(Ae)),X=Z!==void 0||Y.includes("_npx")?null:(P.checkLatestVersion??Bn)(),ie=async()=>{let Ae=X&&await X;if(Ae?.updateAvailable)K.write(`
Update available: cc-safety-net ${Ae.currentVersion} → ${Ae.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},ae=wb(G,P.fetchVersion??Ft).then(async(Ae)=>{let Ie=new Set(Ae.targets);return{targets:Ae.targets,codexPluginListOutput:Ae.codexPluginListOutput,kimiPlugin:Ae.kimiPlugin,available:new Map(await Promise.all(On.filter((je)=>Ie.has(je.target)&&hu.has(je.target)).map(async(je)=>[je.target,await vr(je.probeCommand)])))}}),ge=await tr(P.showBanner??!0,()=>({ready:ae,finish:()=>ae}),()=>nr({input:P.input??process.stdin,output:K}),{loadingMessage:"Checking installed integrations…",output:K}),ye=await Promise.resolve().then(()=>(ru(G.tmpdir,process.platform,Z),null)).catch((Ae)=>wr(Ae));if(ge.targets.length===0){if(K.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),ye!==null)console.error(ye);return await ie(),ye===null?0:1}let Pe=ge.targets.some((Ae)=>vu.has(Ae))?await Promise.resolve().then(()=>(xo(G),null)).catch((Ae)=>wr(Ae)):null,Re=await Fr(Promise.all(ge.targets.map((Ae)=>{if(Ae==="kimi-code"&&ge.kimiPlugin)return Promise.resolve({message:"Kimi Code plugin skipped: update it in Kimi Code from /plugins (Installed tab, select cc-safety-net, press Enter)",failed:!1});if(hu.has(Ae)&&!ge.available.get(Ae))return Promise.resolve({message:`${ln(Ae)} not found; skipped`,failed:!1});if(Pe!==null&&vu.has(Ae))return Promise.resolve({message:Pe,failed:!0});return Iu("install",Ae,G,!0,ge.codexPluginListOutput).then((Ie)=>({message:Ie,failed:!1}),(Ie)=>({message:wr(Ie),failed:!0}))})),{loadingMessage:`Updating ${ge.targets.length} integration${ge.targets.length===1?"":"s"}…`,output:K}),_e=ye===null?Re:[...Re,{message:ye,failed:!0}];return _e.forEach((Ae)=>Ae.failed?console.error(Ae.message):K.write(`${Ae.message}
`)),await ie(),_e.some((Ae)=>Ae.failed)?1:0}function Is(P,G={}){return Promise.resolve().then(()=>bb(P)).then(()=>kb(G)).catch((K)=>(console.error(wr(K)),1))}async function kr(P,G,K={}){try{let Y=c(),Z=await tr(!0,()=>lb(Y,P,G,K),()=>nr({input:K.input??process.stdin,output:K.output??process.stdout}),{loadingMessage:P==="install"?"Checking available integrations…":"Checking installed integrations…",output:K.output??process.stdout});if(!Z)return(K.output??process.stdout).write(`Cancelled: nothing was ${P}ed.
`),0;if(Z==="update")return(K.runUpdate??(()=>Is([],{fetchVersion:K.fetchVersion,input:K.input,output:K.output,showBanner:!1})))();let X=K.output??process.stdout;return await Bd(Z,async(ie)=>{if(ie==="kimi-code"&&P==="install"){let ge=await vb(K,Y);if(ge===null){X.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(ge==="plugin"){X.write(`${hb(Y)}
`);return}}let ae=await Fr(Iu(P,ie,Y),{loadingMessage:`${P==="install"?"Installing":"Uninstalling"} ${ln(ie)} integration…`,output:X});X.write(`${ae}
`)}),0}catch(Y){return console.error(wr(Y)),1}}function wr(P){let G=P instanceof Error?P.message:String(P),K=typeof P==="object"&&P!==null&&"code"in P?P.code:null;if(K==="EACCES"||K==="EPERM")return`${G}
Check file permissions for the target config file and parent directory.`;if(K==="ENOENT")return`${G}
Check that the target config path and parent directory exist.`;if(K==="ENOTDIR")return`${G}
Check that every parent path component is a directory.`;return G}import{mkdirSync as Eb}from"node:fs";import{dirname as Tb}from"node:path";import{createInterface as Ab}from"node:readline";import{existsSync as $u,readFileSync as Cb}from"node:fs";function Ot(P,G){let K=gt(P,G);return{policy:K.policy,errors:pe(pt(K.issues,mt,(Y)=>Y.kind==="custom")," "," ")}}function Cr(P,G){return Ot(P,G).errors}function Ou(P,G){return{"safety.level":P.safety.level,...Os("safety.overrides",P.safety.overrides),"workflow.worktree_mode":String(P.workflow.worktree_mode),"destructive_command_protection.enabled":String(P.destructive_command_protection.enabled),...Os("destructive_command_protection.overrides",P.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":$s(P.destructive_command_protection.allow_paths),"secret_protection.enabled":String(P.secret_protection.enabled),...Os("secret_protection.overrides",P.secret_protection.overrides),"secret_protection.deny_paths":$s(P.secret_protection.deny_paths),"secret_protection.allow_paths":$s(P.secret_protection.allow_paths),...G?{"audit.retention_days":String(P.audit.retention_days)}:{}}}function Ro(P,G,K){let Y=Ou(P,K),Z=Ou(G,K);return[...new Set([...Object.keys(Y),...Object.keys(Z)])].flatMap((X)=>Y[X]===Z[X]?[]:[{field:X,before:Y[X],after:Z[X]}])}function xr(P,G){let K=u(P,G);if(!$u(K))return{baseline:k(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,P.home),diagnostics:[]};let Y=$t(K),Z=Ot(Y.value,P.home);return{baseline:Z.policy,diagnostics:Y.errors.length>0?Y.errors:Z.errors}}function $t(P){if(!$u(P))return{errors:[`${P}: file not found`]};try{return{value:JSON.parse(Cb(P,"utf-8")),errors:[]}}catch(G){let K=G instanceof Error?G.message:String(G);return{errors:[`${P}: ${G instanceof SyntaxError?`Invalid JSON: ${K}`:K}`]}}}function Eo(P,G){let K=xb(P)?P:{};return{version:G.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((Y)=>K[Y]!==void 0).map((Y)=>[Y,K[Y]]))}}function Os(P,G){return Object.fromEntries(Object.entries(G).flatMap(([K,Y])=>Y===void 0?[]:[[`${P}.${K}`,String(Y)]]))}function $s(P){return P.length===0?"(none)":P.join(", ")}function xb(P){return!!P&&typeof P==="object"&&!Array.isArray(P)}import{chmodSync as Pb,existsSync as Du,mkdirSync as Sb,readFileSync as Nu}from"node:fs";import{dirname as Rb}from"node:path";function Lu(P,G={}){let K=u(P,G);if(!Du(K))return{path:K,exists:!1,raw:"",policy:I(),errors:[]};let Y=Nu(K,"utf-8");if(!Y.trim())return{path:K,exists:!0,raw:Y,policy:I(),errors:["Config file is empty"]};try{let Z=Ot(JSON.parse(Y),P.home);return{path:K,exists:!0,raw:Y,policy:Z.policy,errors:Z.errors}}catch(Z){return{path:K,exists:!0,raw:Y,policy:I(),errors:[`Invalid JSON: ${Z instanceof Error?Z.message:String(Z)}`]}}}function Hn(P,G,K={}){let Y=u(P,K),Z=Ot(G,P.home);if(Z.errors.length>0)return{path:Y,policy:I(),errors:Z.errors};let X=Z.policy;return Sb(Rb(Y),{recursive:!0,mode:448}),h(ce(Y),`${JSON.stringify(X,null,2)}
`,384),Pb(Y,384),{path:Y,policy:X,errors:[]}}function ju(P,G){let K=Ot(G,P.home);if(K.errors.length>0)return{errors:K.errors};return{preview:ze(K.policy,P.env),errors:[]}}function Fu(P,G={}){let K=u(P,G);if(!Du(K))return Hn(P,re,G);let Y=Nu(K,"utf-8");if(!Y.trim())return Hn(P,re,G);try{return Hn(P,k(JSON.parse(Y),P.home),G)}catch{return Hn(P,re,G)}}var Hu=new Set(["check","apply"]),Mu="(unset)";async function Bu(P,G,K={}){let Y=fn({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},G),Z=Y.positionals[0],X=[...Y.errors,...Z&&!Hu.has(Z)?[`Unknown policy subcommand: ${Z}`]:[],...Z&&Hu.has(Z)&&!Y.positionals[1]?[`policy ${Z} requires a file`]:[],...Y.positionals.slice(2).map((je)=>`Unexpected policy argument: ${je}`)];if(X.length>0){for(let je of X)console.error(je);return 1}let ie=Y.positionals[1];if(!Z||!ie)return Wt(Tr,console.error),1;let ae=K.cwd??process.cwd(),ge=Y.flags.global?u(P):y(ae);if(!Y.flags.global&&O(P,{cwd:ae}))return console.error(`${ge} is the user policy, not a project policy; use --global for the user scope, or run from a project directory`),1;let ye=$t(ie),Pe=[...ye.errors,...Cr(ye.value,P.home).map((je)=>`${ie}: ${je}`),...!Y.flags.global&&Ob(ye.value)&&ye.value.audit!==void 0?[`${ie}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(Pe.length>0){for(let je of Pe)console.error(je);return 1}let Re=k(ye.value,P.home);if(console.log(`Scope: ${Y.flags.global?"user":"project"} (${ge})`),console.log(`Proposal: ${ie}`),Y.flags.global)Uu(k($t(ge).value,P.home),Re,!0);if(!Y.flags.global){let je=xr(P).baseline;console.log("Effective policy (user + project merged):"),Uu(ne(je,me($t(ge).value,P.home).policy).policy,ne(je,me(ye.value,P.home).policy).policy,!1)}if(Z==="check")return 0;let _e=K.input??process.stdin,Ae=K.output??process.stdout;if(!_e.isTTY||!Ae.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ie}${Y.flags.global?" --global":""}`),1;if(!await _b(`Apply this policy to ${ge}? [y/N] `,_e,Ae))return console.log("Cancelled; nothing was written."),0;return Ib(P,ge,ye.value,Re,Y.flags.global),console.log(`Policy applied: ${ge}`),0}function _b(P,G,K){let Y=Ab({input:G,output:K,terminal:!1});return new Promise((Z)=>{Y.once("close",()=>Z(!1)),Y.question(P,(X)=>{Z(/^y(es)?$/i.test(X.trim())),Y.close()})})}function Ib(P,G,K,Y,Z){if(Z){Hn(P,Y);return}Eb(Tb(G),{recursive:!0}),vn(G,Eo(K,Y))}function Uu(P,G,K){let Y=Ro(P,G,K);if(Y.length===0){console.log("No changes.");return}console.log(`Changes (${Y.length}):`);for(let Z of Y)console.log(`  ${Z.field}: ${Z.before??Mu} -> ${Z.after??Mu}`)}function Ob(P){return!!P&&typeof P==="object"&&!Array.isArray(P)}import{join as Kw}from"node:path";var Gu="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- `caffeinate`, `exec`, `nice`, `nohup`, `setsid`, `stdbuf`, `time`, and `timeout` are built-in transparent wrappers and need no configuration. Configure only other wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n- `command_tools`: Optional array of shell tools that a plugin adds to an agent and that CC Safety Net does not know. Each entry is a tool name such as `\"ops_bash\"`, or `{ \"name\": \"ops_run_background\", \"cwd\": \"cwd\" }` when the tool takes its working directory in a named argument (otherwise `workdir`, `cwd`, or `working_directory` is read). A call to a declared tool with a non-empty string `command` is analyzed like a built-in shell command. User and project lists merge; the user entry wins a name declared in both.\n- Built-in shell and file tools are already analyzed and cannot be declared; `rule verify` reports one declared by hand.\n- Use `cc-safety-net rule tool add ops_bash ops_run_background` to declare tools in the user config, or add `--project` for the project config.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function To(P,G){if(!P.ok){Wu(P);return}Ku(P,G)}function Vu(P,G,K){if(P.ok)console.log(K);if(!P.add){To(P,`Added rulebook source: ${G}`);return}if(!P.ok){Wu(P);return}if(P.add.added.length>0)console.log(`Added ${P.add.added.length} ${P.add.added.length===1?"rulebook":"rulebooks"} from ${P.add.source} at ${P.add.ref}:`),P.add.added.forEach((Y)=>{console.log(`  - ${Y}`)});if(P.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${P.add.source} at ${P.add.ref}: ${P.add.alreadyConfigured.join(", ")}`);if(P.add.commits.length>0)console.log(`Vendored at ${P.add.commits.map((Y)=>Y.slice(0,7)).join(", ")}.`);Ku(P,"Rule config updated.")}function Ku(P,G){for(let K of P.changes??[])console.log(K);console.log(G),console.log(""),$b(P.entries)}function $b(P){if(P.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${P.length}):`);for(let G of P)console.log(`  - ${G.name} ${G.version} (${Db(G.ruleCount)})`),console.log(`    Source: ${G.spec}`)}function Db(P){return`${P} ${P===1?"rule":"rules"}`}function Ju(P){Jn("Active sources",P.rulebooks,(G)=>[`[${G.source}] ${G.name} ${G.version}`,`  Source: ${G.spec}`]),Jn("Active rules",P.rules,(G)=>[`[${Lb(P,G.name)}] ${G.name}`,...Nb(G),`  Reason: ${G.reason}`]),Jn("Disabled rules",qu(P,"off"),(G)=>[G.key]),Jn("Reason overrides",qu(P,"reason"),(G)=>[G.key,`  Reason: ${G.value.reason}`]),Jn("Transparent wrappers",P.transparent_wrappers,(G)=>[G]),Jn("Issues",P.errors,(G)=>[G]),Jn("Warnings",P.warnings,(G)=>[G])}function zu(P){Jn("Command tools",P,(G)=>typeof G.tool==="string"?[`[${G.scope}] ${G.tool}`]:[`[${G.scope}] ${G.tool.name}`,...G.tool.cwd===void 0?[]:[`  Cwd argument: ${G.tool.cwd}`]])}function Jn(P,G,K){if(G.length===0){console.log(`${P}: (none)`);return}console.log(`${P} (${G.length}):`);for(let Y of G){let[Z,...X]=K(Y);console.log(`  - ${Z}`);for(let ie of X)console.log(`    ${ie}`)}}function Nb(P){if(!P.match)return[`  Command: ${P.subcommand?`${P.command} ${P.subcommand}`:P.command}`,`  Block args: ${P.block_args.join(", ")}`];return[`  Command: ${[P.command,...P.match.command_path].join(" ")}`,...P.match.any_args?[`  Any args: ${P.match.any_args.join(", ")}`]:[],...P.match.exclude_args?[`  Exclude args: ${P.match.exclude_args.join(", ")}`]:[]]}function Lb(P,G){return P.rulebooks.find((K)=>K.rules.includes(G))?.source??"project"}function qu(P,G){return Object.entries({...P.userConfig?.overrides,...P.projectConfig?.overrides}).filter((K)=>{if(G==="off")return K[1]==="off";return!!K[1]&&typeof K[1]==="object"}).map(([K,Y])=>({key:K,value:Y}))}function Wu(P){for(let G of P.errors)console.error(G)}import{dirname as vp,join as Lo}from"node:path";import{join as js,resolve as zb}from"node:path";function Pr(P){let G=d(P);if(G.errors.length>0)return{ok:!1,result:{ok:!1,errors:G.errors,entries:[]}};return{ok:!0,config:G.config??de}}function Yu(P){vn(P,de)}function Zu(P){vn(P,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Oo}from"node:path";var jb="custom.";function Ao(P){if(P.rulebook_version!==2)return[];let G=P.rules.map((K)=>({name:K.name,command:K.command,block_args:[],match:K.match,reason:K.reason,intent:K.intent}));return(P.tests??[]).flatMap((K,Y)=>{let Z=Ds(v(K.command));if(Z.length===0)return[`tests[${Y}]: could not parse fixture command: ${K.command}`];let X=Z.reduce((ie,ae)=>ie??N(ae,G)?.id.slice(jb.length),void 0);if(K.expect==="blocked"){if(X===K.rule)return[];let ie=X?`"${X}" matched first`:"no rule matched";return[`tests[${Y}]: expected "${K.rule}" to block "${K.command}" but ${ie}`]}return X?[`tests[${Y}]: expected "${K.command}" to be allowed but "${X}" matched`]:[]})}function Ds(P){return P.nodes.flatMap((G)=>{if(G.kind==="group"||G.kind==="function")return Ds(G.body);if(G.kind!=="command")return[];let K=ke(oe(G.dialect,G.words)).words.map(t);return[...K.length>0?[K]:[],...G.nested.flatMap((Y)=>Ds(Y))]})}var _o=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function Io(P={}){return{requests:0,responseBytes:0,maxRequests:P.maxRequests??_o.maxRequests,maxResponseBytes:P.maxResponseBytes??_o.maxResponseBytes}}function Mn(P){return{controller:new AbortController,budget:Io(),resolveUrl:P}}function Xu(P){return P instanceof Error&&P.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function Qu(P){if(P.requests>=P.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");P.requests++}function ep(P,G){if(G>P.maxResponseBytes-P.responseBytes)throw P.responseBytes+=G,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");P.responseBytes+=G}var rp=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function np(P,G,K=w(Oo(Oo(G)),"rules policy"),Y=Mn()){if(C(P))return Ub(P,Y);return Mb(P,G,K)}async function op(P,G,K,Y,Z,X){if(!C(P))return np(P,G,K,Y);let ie=Z?null:Fb(P,G,K);if(ie)return ie;if(!Z&&!X)throw Error(`${P} is not vendored; run rule update ${P} to vendor it`);return np(P,G,K,Y)}function Fb(P,G,K=w(Oo(Oo(G)),"rules policy")){let Y=L(P),Z=M(G,Y.name),X=r(i(K,Z));if(X===null)return null;let ie=fe(Ns(X,`Invalid rulebook ${Z}.`));if(ie.name!==Y.name)throw Error(`rulebook name "${ie.name}" in ${Z} must match "${Y.name}"`);return{spec:P,rulebook:ie,content:X}}async function ip(P,G={}){if(!Q(P))throw Error(`Invalid GitHub repository source: ${P}`);let[K,Y]=P.split("/");if(!K||!Y)throw Error(`Invalid GitHub repository source: ${P}`);if(G.ref!==void 0&&!le(G.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${G.ref}`);let Z=G.operation??Mn(),X=G.ref??await Hb(K,Y,P,Z),ie=await ap(K,Y,X,P,Z),ae=await $o(`https://api.github.com/repos/${K}/${Y}/git/trees/${ie}?recursive=1`,"tree",Z),ge=ae.response;if(!ge.ok)throw Error(`Failed to inspect ${P}: GitHub tree returned ${ge.status}`);let ye=JSON.parse(ae.content);if(!Array.isArray(ye?.tree))throw Error(`Failed to inspect ${P}: unexpected GitHub tree response`);let Pe=ye.tree,Re=[...new Set(Pe.flatMap((_e)=>{if(!_e||typeof _e!=="object")return[];let Ae=_e;if(Ae.type!=="blob"||typeof Ae.path!=="string")return[];let Ie=Ae.path.match(Rt);return Ie?.[1]?[Ie[1]]:[]}))].sort();if(Re.length===0)throw Error(`No rulebooks found in ${P} under ${xe}/`);return{source:P,owner:K,repo:Y,ref:X,commit:ie,names:Re}}async function Hb(P,G,K,Y){let Z=await $o(`https://api.github.com/repos/${P}/${G}`,"metadata",Y),X=Z.response;if(!X.ok)throw Error(`Failed to inspect ${K}: GitHub returned ${X.status}`);let ae=JSON.parse(Z.content)?.default_branch;if(typeof ae!=="string"||ae==="")throw Error(`Failed to inspect ${K}: missing default branch`);if(!le(ae))throw Error(`GitHub returned an invalid default branch: ${ae}`);return ae}function Mb(P,G,K){Tt(P);let Y=M(G,P),Z=r(i(K,Y));if(Z===null)throw Error(`Rulebook source not found: ${P}`);let X=sp(Ns(Z,"Invalid local rulebook source."));if(X.name!==P)throw Error(`rulebook name "${X.name}" must match local source "${P}"`);return{spec:P,rulebook:X,content:Z}}async function Ub(P,G){let K=L(P),Y=await ap(K.owner,K.repo,K.ref,P,G),Z=await $o(`https://raw.githubusercontent.com/${K.owner}/${K.repo}/${Y}/${K.path}`,"raw",G),X=Z.response;if(!X.ok)throw Error(`Failed to fetch ${P}: GitHub raw returned ${X.status}`);let ie=Z.content,ae=sp(Ns(ie,"Invalid GitHub rulebook response."));if(ae.name!==K.name)throw Error(`rulebook name "${ae.name}" must match GitHub source "${K.name}"`);return{spec:P,rulebook:ae,content:ie}}function sp(P){let G=fe(P),K=Ao(G);if(K.length>0)throw Error(K.join("; "));return G}function Ns(P,G){try{return JSON.parse(P)}catch{throw Error(G)}}async function ap(P,G,K,Y,Z){let X=await $o(`https://api.github.com/repos/${P}/${G}/commits/${encodeURIComponent(K)}`,"commit",Z),ie=X.response;if(!ie.ok)throw Error(`Failed to resolve ${Y}: GitHub returned ${ie.status}`);let ae=JSON.parse(X.content);if(typeof ae?.sha!=="string"||ae.sha==="")throw Error(`Failed to resolve commit for ${Y}`);return ae.sha}async function Bb(P,G,K={}){if(K.signal?.aborted)throw K.signal.reason;let Y=K.budget??Io(),Z=new AbortController,X=()=>Z.abort(K.signal?.reason);K.signal?.addEventListener("abort",X,{once:!0});let ie=!1,ae=setTimeout(()=>{if(Z.signal.aborted)return;ie=!0,Z.abort()},K.timeoutMs??rp.timeoutMs);try{if(K.signal?.aborted)throw K.signal.reason;Qu(Y);let ge=await fetch(P,{signal:Z.signal,redirect:"error"});if(!ge.ok)return lp(ge),{response:ge,content:""};return{response:ge,content:await Gb(ge,G,Y,()=>Z.abort())}}catch(ge){if(ie)throw Error("GitHub request timed out",{cause:ge});if(K.signal?.aborted)throw K.signal.reason;throw ge}finally{clearTimeout(ae),K.signal?.removeEventListener("abort",X)}}function $o(P,G,K){return Bb(K.resolveUrl?.(P)??P,G,{budget:K.budget,signal:K.controller.signal})}async function Gb(P,G,K=Io(),Y){let Z=rp[`${G}Bytes`],X=Number(P.headers.get("content-length"));if(Number.isFinite(X)&&X>Z)throw lp(P),Error(`GitHub ${G} response exceeds ${Z} bytes`);if(!P.body)return"";let ie=P.body.getReader(),ae=[],ge=0;while(!0){let ye=await ie.read();if(ye.done)break;try{ep(K,ye.value.byteLength)}catch(Pe){throw Y?.(),tp(ie),Pe}if(ge+=ye.value.byteLength,ge>Z)throw Y?.(),tp(ie),Error(`GitHub ${G} response exceeds ${Z} bytes`);ae.push(Buffer.from(ye.value))}return Buffer.concat(ae,ge).toString("utf-8")}function lp(P){if(!P.body)return;cp(()=>P.body?.cancel())}function tp(P){cp(()=>P.cancel())}function cp(P){try{Promise.resolve(P()).catch(()=>{})}catch{}}var qb=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function dp(P,G){let K=fp(P.rules,G);if(K.length>0)return{ok:!0,specs:K};return pp(P.rules,G)}function up(P,G){let K=fp(P,G);if(K.length>0)return{ok:!0,specs:K};let Y=Kb(P,G);if(Y.length>0)return{ok:!0,specs:Y};let Z=Jb(P,G);if(!Z.ok)return Z;if(Z.specs.length>0)return{ok:!0,specs:Z.specs};return pp(P,G)}function pp(P,G){let K=P.filter((Y)=>Ls(Y)?.name===G);if(K.length===1)return{ok:!0,specs:K};return Vb(G,K)}function Vb(P,G){return{ok:!1,result:{ok:!1,errors:G.length===0?[`No configured rulebook matches ${P}`]:[`Ambiguous rulebook match ${P}: ${G.join(", ")}`],entries:[]}}}function fp(P,G){return P.filter((K)=>K===G)}function Kb(P,G){let K=G.match(qb),Y=K?.[1],Z=K?.[2],X=K?.[3];if(!Y||!Z||!X||!le(X))return[];return mp(P,(ie)=>ie.owner===Y&&ie.repo===Z&&ie.ref===X)}function Jb(P,G){if(!Q(G))return{ok:!0,specs:[]};let[K,Y]=G.split("/"),Z=mp(P,(ie)=>ie.owner===K&&ie.repo===Y);if(new Set(Z.map((ie)=>Ls(ie)?.ref).filter((ie)=>!!ie)).size<2)return{ok:!0,specs:Z};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${G}. Use an explicit ref:`,`  cc-safety-net rule remove ${G}#<ref>`],entries:[]}}}function Ls(P){try{return L(P)}catch{return null}}function mp(P,G){return P.filter((K)=>{let Y=Ls(K);return Y?G(Y):!1})}async function No(P,G={}){return Wb(P,G,await Do(P,G,Mn()))}function Wb(P,G,K){if(!K.ok)return K;let Y=hn(P,G),Z=[...new Set(z(Y.configPath,Y.filesystemScope))];if(Z.length===0)return K;return{ok:!1,errors:Z,entries:K.entries}}async function Do(P,G,K,Y={},Z=new Set,X=new Set){try{let ie=hn(P,G),ae=Pr(ie.configTarget);if(!ae.ok)return ae.result;let ge=ae.config,ye=G.only?dp(ge,G.only):{ok:!0,specs:ge.rules};if(!ye.ok)return ye.result;let Pe=new Set([...G.refresh?ye.specs:[],...Z]),Re=(en)=>op(en,ie.configDir,ie.filesystemScope,K,Pe.has(en),!G.refresh||Pe.has(en)),_e=await iw(ge.rules,G.refresh?(en)=>Re(en).then((on)=>({ok:!0,item:on})).catch((on)=>{if(Xu(on))throw on;return{ok:!1,spec:en,message:on instanceof Error?on.message:String(on)}}):async(en)=>({ok:!0,item:await Re(en)}),K),Ae=_e.filter((en)=>!en.ok),Ie=_e.filter((en)=>en.ok).map((en)=>en.item),je=Ie.flatMap((en)=>Yb(en,ge.rules)),Oe=Ie.flatMap((en)=>Zb(en,X,ie)),Ve=new Set([...je,...Oe].map((en)=>en.spec)),nn=[...Ae,...je,...Oe],rn=[],an=Qb(rn,()=>Ie.flatMap((en)=>Ve.has(en.spec)||nn.length>0&&X.has(en.spec)?[]:Xb(en,ie,Y,rn)));return{ok:nn.length===0,errors:nn.map((en)=>`Failed to update ${en.spec}: ${en.message}`),entries:Ie.map(nw),changes:an}}catch(ie){return Rr(ie)}}function Yb(P,G){if(!C(P.spec))return[];let K=We(P.spec),Y=G.filter((Z)=>Z!==P.spec&&We(Z).toLowerCase()===K.toLowerCase());if(Y.length===0)return[];return[{ok:!1,spec:P.spec,message:`rulebook name "${K}" is also claimed by ${Y.join(", ")}; rename one of them`}]}function Zb(P,G,K){if(!G.has(P.spec)||!C(P.spec))return[];let Y=M(K.configDir,P.rulebook.name),Z=r(i(K.filesystemScope,Y));if(Z===null||Z===P.content)return[];return[{ok:!1,spec:P.spec,message:`${Y} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function Xb(P,G,K,Y){if(!C(P.spec))return[];let Z=M(G.configDir,P.rulebook.name),X=i(G.filesystemScope,Z),ie=r(X);if(ie===P.content)return[];return Y?.push({target:X,previous:ie}),h(X,P.content,void 0,K._testAfterPolicyRename),ew(P,ie)}function Qb(P,G){try{return G()}catch(K){for(let Y of[...P].reverse()){if(Y.previous===null){B(Y.target);continue}h(Y.target,Y.previous)}throw K}}function ew(P,G){if(G===null)return[`Vendored ${P.spec} (${P.rulebook.version})`];let K=Ee(G),Y="problem"in K?null:K.rulebook,Z=new Map(Y?.rules.map((ie)=>[ie.name,JSON.stringify(ie)])??[]),X=new Set(P.rulebook.rules.map((ie)=>ie.name));return[`Updated ${P.spec} (${Y?.version??"unreadable"} -> ${P.rulebook.version})`,...[...X].filter((ie)=>!Z.has(ie)).map((ie)=>`  + ${ie}`),...[...Z.keys()].filter((ie)=>!X.has(ie)).map((ie)=>`  - ${ie}`),...P.rulebook.rules.filter((ie)=>{let ae=Z.get(ie.name);return ae!==void 0&&ae!==JSON.stringify(ie)}).map((ie)=>`  ~ ${ie.name}`)]}function nw(P){return{spec:P.spec,name:P.rulebook.name,version:P.rulebook.version,ruleCount:P.rulebook.rules.length}}async function gp(P,G,K={}){return tw(P,G,K,Mn())}async function tw(P,G,K,Y,Z={}){let X=null,ie=!1;try{let ae=hn(P,K),ge=r(ae.configTarget);X={target:ae.configTarget,content:ge};let ye=Pr(ae.configTarget);if(!ye.ok)return ye.result;let Pe=ye.config,Re=Q(G)?await ip(G,{ref:K.ref,operation:Y}):null,_e=Re?rw(Re,K.rulebooks):[],Ae=Re?_e.map((nn)=>ow(Pe.rules,Re,nn)??`${G}#${Re.ref}/${nn}`):[G],Ie=Ae.filter((nn)=>!Pe.rules.includes(nn)),je=[...Pe.rules,...Ie];if(je.length>Se)return sw();if(je.length!==Pe.rules.length)ie=!0,vn(ae.configTarget,{...Pe,rules:je},void 0,Z._testAfterPolicyRename);let Oe=await Do(P,K,Y,Z,new Set(Ie),new Set(Ie));if(!Oe.ok)Sr(ae.configTarget,ge);if(!Oe.ok||!Re)return Oe;let Ve=_e.filter((nn,rn)=>Ie.includes(Ae[rn]??""));return{...Oe,add:{source:G,ref:Re.ref,selected:_e,added:Ve,alreadyConfigured:_e.filter((nn)=>!Ve.includes(nn)),commits:Ie.length>0?[Re.commit]:[]}}}catch(ae){if(ie&&X)try{Sr(X.target,X.content)}catch(ge){return Rr(ge)}return Rr(ae)}}function rw(P,G){let K=G?[...new Set(G)]:P.names,Y=K.filter((Z)=>!P.names.includes(Z));if(Y.length>0)throw Error(`Rulebooks not found in ${P.source} at ${P.ref}: ${Y.join(", ")}
Available rulebooks: ${P.names.join(", ")}`);return K}function ow(P,G,K){let Y=`${G.source}#${G.ref}/${K}`;if(P.includes(Y))return Y;let Z=`${G.source}#${G.commit}/${K}`;return P.find((X)=>X===Z)}async function iw(P,G,K=Mn()){if(P.length>Se)throw Error(we);let Y=[],Z=0,X,ie=Array.from({length:Math.min(P.length,_o.concurrency)},async()=>{while(!X){let ae=Z;if(ae>=P.length)return;Z++;try{Y[ae]=await G(P[ae],ae,K.controller.signal)}catch(ge){if(!X)X={value:ge},Z=P.length,K.controller.abort(ge);return}}});if(await Promise.all(ie),X)throw X.value;return Y}function sw(){return{ok:!1,errors:[we],entries:[]}}async function yp(P,G,K={}){try{return await aw(P,G,K,{})}catch(Y){return Rr(Y)}}async function aw(P,G,K,Y){let Z=hn(P,K),X=d(Z.configTarget);if(X.errors.length>0)return{ok:!1,errors:X.errors,entries:[]};if(!X.config)return{ok:!1,errors:[`No config found at ${Z.configPath}`],entries:[]};let ie=up(X.config.rules,G);if(!ie.ok)return ie.result;let ae=K.deleteSource?lw(Z.configDir,ie.specs,Z.filesystemScope):{ok:!0,dirs:[]};if(!ae.ok)return ae.result;let ge=r(Z.configTarget);if(ge===null)return Rr(Error("Rules config is unavailable."));try{vn(Z.configTarget,{...X.config,rules:X.config.rules.filter((Re)=>!ie.specs.includes(Re))},void 0,Y._testAfterPolicyRename)}catch(Re){throw Sr(Z.configTarget,ge),Re}let ye=await Do(P,K,Mn(),Y);if(!ye.ok)return Sr(Z.configTarget,ge),ye;let Pe=cw(ae.dirs,Y,Z.filesystemScope);if(!Pe.ok){Sr(Z.configTarget,ge);let Re=await Do(P,K,Mn(),Y);if(!Re.ok)return{ok:!1,errors:[...Pe.result.errors,...Re.errors],entries:Re.entries};return Pe.result}return ye}function lw(P,G,K){let Y=G.flatMap((ae)=>p.test(ae)?[]:["--delete-source can only delete local rulebook sources"]),Z=G.map((ae)=>js(P,ae)),X=Y.length>0?[]:Z.flatMap((ae)=>hp(ae,K)),ie=[...Y,...X];return ie.length>0?{ok:!1,result:{ok:!1,errors:ie,entries:[]}}:{ok:!0,dirs:Z}}function hp(P,G){let K=zb(P),Y=i(G,K),Z=ve(Y);if(!Z)return[`Local rulebook source directory not found: ${P}`];let X=Z.find((ie)=>ie.name==="rulebook.json");if(!X)return[`Local rulebook source directory is missing rulebook.json: ${P}`];if(X.kind!=="file")throw new o(G.label);if(r(i(G,js(K,"rulebook.json"))),Z.length>1)return[`Local rulebook source directory contains extra files: ${P}. delete manually if you really want to remove the directory.`];return[]}function cw(P,G,K){let Y=P.flatMap((Z)=>{try{if(!ve(i(K,Z)))return[];let X=hp(Z,K);if(X.length>0)return X;return dw(Z,G,K),[]}catch(X){return[`Failed to delete local rulebook source ${Z}: ${X instanceof Error?X.message:String(X)}`]}});return Y.length>0?{ok:!1,result:{ok:!1,errors:Y,entries:[]}}:{ok:!0}}function dw(P,G,K){if(G._testDeleteLocalSourceDir){G._testDeleteLocalSourceDir(P);return}B(i(K,js(P,be))),kt(i(K,P))}function Sr(P,G){if(G===null){B(P);return}h(P,G)}function Rr(P){return{ok:!1,errors:[P instanceof Error?P.message:String(P)],entries:[]}}var uw=".safety-net.json",pw="~/.cc-safety-net/config.json";async function kp(P,G){let K=O(P,{cwd:G.cwd});if(K)console.log(`Skipped the project scope: ${A(G.cwd)} is the user rule config, not a project rule config`);return[K||await bp(P,{legacyPath:Lt(G.cwd),configPath:A(G.cwd),defaultRulebookName:"project-rules",migratedFrom:uw,cleanup:G.cleanup,syncOptions:{cwd:G.cwd}}),await bp(P,{legacyPath:jt(P),configPath:W(P),defaultRulebookName:"user-rules",migratedFrom:pw,cleanup:G.cleanup,syncOptions:{cwd:G.cwd,global:!0}})].every((Z)=>Z)?0:1}async function bp(P,G){let K=hn(P,G.syncOptions),Y=i(K.filesystemScope,G.legacyPath),Z=r(Y);if(Z===null)return console.log(`No legacy config found at ${G.legacyPath}`),!0;let X=mw(Z);if(!X.ok){for(let Ae of X.errors)console.error(Ae);return!1}let ie=d(K.configTarget);if(ie.errors.length>0){for(let Ae of ie.errors)console.error(Ae);return!1}let ae=ie.config??de,ge=gw(vp(G.configPath),ae.rules,G.defaultRulebookName,G.migratedFrom,K.filesystemScope),ye=Lo(vp(G.configPath),ge,"rulebook.json"),Pe=i(K.filesystemScope,ye),Re=[wp(K.configTarget),wp(Pe)],_e=await fw(P,G,K.configTarget,Pe,ge,X.config.rules,{...ae,rules:ae.rules.includes(ge)?ae.rules:[...ae.rules,ge]});if(!_e.ok){vw(Re);for(let Ae of _e.errors)console.error(Ae);return!1}if(!G.cleanup)return console.log(`Migrated legacy config at ${G.legacyPath}. Legacy file is no longer used.`),!0;if(!hw(K.configTarget,Pe,ge,G.migratedFrom,X.config.rules))return console.error(`Migration cleanup verification failed for ${G.legacyPath}`),!1;return B(Y),console.log(`Deleted legacy config at ${G.legacyPath}`),!0}async function fw(P,G,K,Y,Z,X,ie){try{return vn(K,ie),vn(Y,yw(Z,G.migratedFrom,X)),await No(P,G.syncOptions)}catch(ae){return{ok:!1,errors:[ae instanceof Error?ae.message:String(ae)]}}}function mw(P){try{let G=JSON.parse(P),K=Wo(G);if(K.errors.length>0)return{ok:!1,errors:K.errors};return{ok:!0,config:{version:1,rules:G.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function gw(P,G,K,Y,Z){let X=G.find((ie)=>bw(i(Z,Lo(P,ie,"rulebook.json")))===Y);if(X)return X;if(r(i(Z,Lo(P,K,"rulebook.json")))===null)return K;for(let ie=2;;ie++){let ae=`${K}-${ie}`;if(r(i(Z,Lo(P,ae,"rulebook.json")))===null)return ae}}function yw(P,G,K){return{rulebook_version:1,name:P,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:G,allowed_commands:[...new Set(K.map((Y)=>Y.command))],rules:K,tests:K.map((Y)=>({command:[Y.command,Y.subcommand,Y.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:Y.name}))}}function hw(P,G,K,Y,Z){if(!d(P).config?.rules.includes(K))return!1;try{let ie=r(G);if(ie===null)return!1;let ae=JSON.parse(ie);return ae.migrated_from===Y&&JSON.stringify(ae.rules)===JSON.stringify(Z)}catch{return!1}}function wp(P){return{target:P,content:r(P)}}function vw(P){for(let G of P){if(G.content===null){B(G.target);continue}h(G.target,G.content)}}function bw(P){let G=r(P);if(G===null)return null;try{let K=JSON.parse(G);return typeof K.migrated_from==="string"?K.migrated_from:null}catch{return null}}import{mkdir as ww,readFile as kw,writeFile as Cw}from"node:fs/promises";import{dirname as xw,join as Pw}from"node:path";var Sw=86400000,Rw=604800000;async function xp(P,G=Date.now()){if(P.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let K=rt(P);if(!K)return null;let Y=Pw(K,".cc-safety-net","update-check.json"),Z=await Ew(Y,G);if(!Z.lastCheck||G-Z.lastCheck>Sw){let ae=await Bn();if(Z.lastCheck=G,ae.latestVersion)Z.latestVersion=ae.latestVersion;if(!await Cp(Y,Z))return null;if(ae.error)return null}let X=Z.latestVersion,ie=un();if(!X||!ni(X,ie))return null;if(Z.notifiedVersion===X&&Z.notifiedAt!==void 0&&G-Z.notifiedAt<Rw)return null;if(Z.notifiedVersion=X,Z.notifiedAt=G,!await Cp(Y,Z))return null;return`UPDATE_AVAILABLE: cc-safety-net v${X} is available (running v${ie}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function Ew(P,G){let K=await kw(P,"utf8").then((X)=>JSON.parse(X)).catch(()=>{return});if(!K||typeof K!=="object"||Array.isArray(K))return{};let Y=K,Z=(X)=>typeof X==="number"&&Number.isFinite(X)&&X<=G?X:void 0;return{lastCheck:Z(Y.lastCheck),latestVersion:typeof Y.latestVersion==="string"?Y.latestVersion:void 0,notifiedVersion:typeof Y.notifiedVersion==="string"?Y.notifiedVersion:void 0,notifiedAt:Z(Y.notifiedAt)}}async function Cp(P,G){return ww(xw(P),{recursive:!0,mode:448}).then(()=>Cw(P,JSON.stringify(G),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as Ow,resolve as Ms}from"node:path";var Pp=new Map([["Bash","posix"],["PowerShell","powershell"],["Monitor","posix"]]);var Sp=new Map([["Bash","auto"]]);var Rp=new Map([["bash","auto"],["Bash","auto"],["powershell","powershell"],["PowerShell","powershell"]]);var Ep=new Map([["Shell","auto"]]);var Tp=new Map([["exec","auto"]]),Ap="write_to_process";var _p=new Map([["Execute","auto"]]);var Ip=new Map([["run_shell_command","auto"]]);var Op=new Map([["run_terminal_command","auto"],["run_terminal_cmd","auto"],["monitor","auto"],["bash","auto"],["Shell","auto"]]);var $p=new Map([["terminal","posix"]]);var Dp=new Map([["Bash","posix"]]);var Np="exec";var _w=[["antigravity-cli",[...ol.keys(),il]],["claude-code",[...Pp.keys()]],["codex",[...Sp.keys()]],["copilot-cli",[...Rp.keys()]],["cursor",[...Ep.keys()]],["deepseek-harness",[...nt.keys()]],["devin",[...Tp.keys(),Ap]],["droid",[..._p.keys()]],["gemini-cli",[...Ip.keys()]],["grok-build",[...Op.keys()]],["hermes-agent",[...$p.keys()]],["kimi-code",[...Dp.keys()]],["openclaw",[Np]],["opencode",[Xe,Te]],["pi",[...tt.keys()]]].flatMap(([P,G])=>G.map((K)=>({name:K,integration:ln(P)}))),Lp="and is already analyzed. Built-in tools cannot be declared.";function jo(P){let G=De(P),K=[...new Set(_w.filter((Y)=>De(Y.name)===G).map((Y)=>Y.integration))].sort((Y,Z)=>Y.localeCompare(Z));if(K.length>0)return`"${P}" is a built-in shell tool of ${Iw(K)}, ${Lp}`;if(x(P)!=="unknown")return`"${P}" is a built-in file tool, ${Lp}`;return}function Iw(P){return P.length===1?P[0]??"":`${P.slice(0,-1).join(", ")} and ${P.at(-1)}`}var Fp="CC Safety Net Config",$w="═".repeat(Fp.length),Dw="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",Nw=new Set(["rule.json","rule.lock","cache"]);function Hp(P,G={}){try{return Lw(P,G)}catch(K){if(K instanceof o)return console.error(K.message),1;throw K}}function Lw(P,G){let K=G.cwd??process.cwd(),Y=ee(P,{cwd:K}),Z=jt(P),X=Lt(K),ie=Ms(K,xe),ae=i(Y.userScope,Z),ge=i(Y.projectScope,X),ye=!1,Pe=!1,Re=[],_e=[],Ae=jw(i(Y.projectScope,ie));if(Hw(),r(Y.userConfigTarget)!==null){let Ie=Un(Y.userConfigTarget);if(Ie.errors.push(...z(Y.userConfigPath,Y.userScope),...jp(Y.userConfigTarget)),Re.push({scope:"User",path:Y.userConfigPath,result:Ie,schema:"rules",target:Y.userConfigTarget}),Ie.errors.length>0)ye=!0}if(r(ae)!==null)if(Pe=!0,r(Y.userConfigTarget)!==null)_e.push(Fo("user","cleanup"));else{let Ie=Yo(ae);if(Re.push({scope:"User",path:Z,result:Ie,schema:"legacy",inactive:!0,target:ae}),_e.push(Fo("user",Ie.errors.length>0?"fix-or-delete":"migrate")),Ie.errors.length>0)ye=!0}if(r(Y.projectConfigTarget)!==null){let Ie=Un(Y.projectConfigTarget);if(Ie.errors.push(...z(Y.projectConfigPath,Y.projectScope),...jp(Y.projectConfigTarget)),Re.push({scope:"Project",path:Ms(Y.projectConfigPath),result:Ie,schema:"rules",target:Y.projectConfigTarget}),Ie.errors.length>0)ye=!0;if(r(ge)!==null)Pe=!0,_e.push(Fo("project","cleanup"))}else if(r(ge)!==null){Pe=!0,ye=!0;let Ie=Yo(ge);Re.push({scope:"Project",path:Ms(X),result:Ie,schema:"legacy",inactive:!0,target:ge}),_e.push(Fo("project",Ie.errors.length>0?"fix-or-delete":"migrate"))}if(Ae?.result.errors.length)ye=!0;if(Re.length===0&&!Ae)return console.log(`
No config files found. Using built-in rules only.`),0;for(let Ie of Re)if(Ie.inactive)Uw(Ie.scope,Ie.path,Ie.result);else if(Ie.result.errors.length>0)Bw(Ie.scope,Ie.path,Ie.result.errors);else{if(Ie.schema==="rules"&&Vw(Ie.target))console.log(`
Added $schema to ${Ie.scope.toLowerCase()} config.`);Mw(Ie.scope,Ie.path,Ie.result,Ie.schema)}for(let Ie of _e)console.error(`
${Qe.red(Ie)}`);if(Ae)if(Ae.result.errors.length>0)qw(Ae.path,Ae.result.errors);else Gw(Ae.path,Ae.result);if(ye)return console.error(`
Config validation failed.`),1;return console.log(Pe?`
Configs valid with warnings.`:`
All configs valid.`),0}function jp(P){return(d(P).config?.command_tools??[]).flatMap((G)=>jo(typeof G==="string"?G:G.name)??[])}function Fo(P,G){let K=`legacy ${P} config`;if(G==="cleanup")return`Warning: Legacy ${P} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(G==="migrate")return`Warning: Legacy ${P} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${P} config is no longer supported. Fix or delete the ${K}, then run \`npx -y cc-safety-net rule migrate\`.`}function jw(P){if(ve(P)===null)return null;let G=Fw(P);if(G.ruleNames.size===0&&G.errors.length===0)return null;return{path:P.path,result:G}}function Fw(P){let G=[],K=new Set,Y=(ve(P)??[]).filter((Z)=>!Nw.has(Z.name)).sort((Z,X)=>Z.name.localeCompare(X.name));if(Y.length===0)return{errors:G,ruleNames:K};for(let Z of Y){if(!p.test(Z.name)){G.push(`rulebook directory names must match ${p}: ${Z.name}`);continue}if(Z.kind!=="directory"){G.push(`${Z.name} must be a rulebook directory`);continue}let X=i(P.scope,Ow(P.path,Z.name,"rulebook.json")),ie=r(X);if(ie===null){G.push(`${Z.name}/rulebook.json is required`);continue}try{let ae;try{ae=JSON.parse(ie)}catch{G.push(`${Z.name}/rulebook.json: invalid JSON`);continue}let ge=fe(ae);if(ge.name!==Z.name){G.push(`rulebook name "${ge.name}" must match folder "${Z.name}"`);continue}let ye=Ao(ge);if(ye.length>0){G.push(...ye.map((Pe)=>`${Z.name}/rulebook.json: ${Pe}`));continue}K.add(Z.name)}catch(ae){G.push(ae instanceof Error?`${Z.name}/rulebook.json: ${ae.message}`:`${Z.name}/rulebook.json: ${String(ae)}`)}}return{errors:G,ruleNames:K}}function Hw(){console.log(Fp),console.log($w)}function Mw(P,G,K,Y){if(console.log(`
✓ ${P} config: ${G}`),console.log(`  Schema: ${Y==="rules"?"rulebook sources":"legacy inline rules"}`),K.ruleNames.size>0){console.log(`  ${Y==="rules"?"Sources":"Rules"}:`);let Z=1;for(let X of K.ruleNames)console.log(`    ${Z}. ${X}`),Z++}else console.log(`  ${Y==="rules"?"Sources":"Rules"}: (none)`)}function Uw(P,G,K){if(console.error(`
✗ Legacy ${P.toLowerCase()} config: ${G}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),K.errors.length>0){console.error("  Errors:");let Y=1;for(let Z of K.errors)for(let X of Z.split("; "))console.error(`    ${Y}. ${X}`),Y++;return}if(K.ruleNames.size>0){console.error("  Rules:");let Y=1;for(let Z of K.ruleNames)console.error(`    ${Y}. ${Z}`),Y++;return}console.error("  Rules: (none)")}function Bw(P,G,K){Mp(`${P} config`,G,K)}function Gw(P,G){console.log(`
✓ GitHub source rules: ${P}`),console.log("  Rulebooks:");let K=1;for(let Y of G.ruleNames)console.log(`    ${K}. ${Y}`),K++}function qw(P,G){Mp("GitHub source rules",P,G)}function Mp(P,G,K){console.error(`
✗ ${P}: ${G}`),console.error("  Errors:");let Y=1;for(let Z of K)for(let X of Z.split("; "))console.error(`    ${Y}. ${X}`),Y++}function Vw(P){try{let G=r(P);if(G===null)return!1;let K=JSON.parse(G);if(K.$schema)return!1;return h(P,JSON.stringify({$schema:Dw,...K},null,2)),!0}catch(G){if(G instanceof o)throw G;return!1}}var Up=new Set(["init","add","remove","update","sync","list","wrapper","tool","migrate","doc","verify"]),Jw=new Set(["init","add","remove","update","sync","wrapper"]),Gp=new Set(["add","remove","list"]),zw="cc-safety-net/rulebooks";async function qp(P,G){try{return await Ww(P,G)}catch(K){if(K instanceof o)return console.error(K.message),1;throw K}}async function Ww(P,G){let K=Zw(G),Y=K.help?Yw(K.positionals):null;if(Y)return Wt(Y),0;if(K.errors.length>0){for(let ye of K.errors)console.error(ye);return 1}let Z=K.positionals[0];if(!Z)return Wt(Nt,console.error),1;let X=K.positionals[1],ie={global:K.global},ae=process.cwd();if((Z==="tool"?K.project:!K.global&&Jw.has(Z)&&!(Z==="wrapper"&&X==="list"))&&O(P,{cwd:ae}))return console.error(`${A(ae)} is the user rule config, not a project rule config; ${Z==="tool"?"drop --project":"use --global"} for the user scope, or run from a project directory`),1;if(Z==="init"){let ye=hn(P,ie);ek(ye.configTarget);let Pe=Kw(ye.configDir,"example-rules","rulebook.json"),Re=i(ye.filesystemScope,Pe);if(K.example&&r(Re)===null)Zu(Re);let _e=z(ye.configPath,ye.filesystemScope);for(let Ae of _e)console.error(Ae);if(_e.length>0)return 1;return console.log("Rule config initialized."),0}if(Z==="add"){let ye=Vp(K);if(!ye)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let Pe=hn(P,ie),Re=await gp(P,ye,{...ie,ref:K.ref,rulebooks:K.only.length>0?K.only:void 0});return Vu(Re,ye,`Scope: ${K.global?"user":"project"} (${Pe.configDir})`),Re.ok?0:1}if(Z==="remove"){if(!X)return console.error("rule remove requires a source"),1;let ye=await yp(P,X,{...ie,deleteSource:K.deleteSource});return To(ye,`Removed rulebook source: ${X}`),ye.ok?0:1}if(Z==="update"){let ye=await No(P,{...ie,only:X,refresh:!0});return To(ye,"Rule config updated."),ye.ok?0:1}if(Z==="sync")return Ya(P,{global:K.global});if(Z==="list"){let ye=te(P,{cwd:ae});return Ju(ye),ye.errors.length>0?1:0}if(Z==="wrapper")return nk(P,K);if(Z==="tool")return rk(P,K,ae);if(Z==="migrate")return kp(P,{cleanup:K.cleanup,cwd:ae});if(Z==="doc"){console.log(Gu);let ye=await xp(P);if(ye)console.error(ye);return 0}if(Z==="verify")return Hp(P);return 1}function Yw(P){if(P.length===0)return Nt;let G=Nt.subcommands.filter((Y)=>Y.usage.split(" ")[0]===P[0]);if(G.length===0)return null;if(P.length===1&&G.length>1)return{name:`rule ${P[0]}`,description:`Subcommands of rule ${P[0]}`,usage:`rule ${P[0]} <subcommand>`,subcommands:G,options:[]};let K=P.length===1?G[0]:G.find((Y)=>Y.usage.split(" ")[1]===P[1]);if(!K)return null;return{name:`rule ${P[0]}`,description:K.description,usage:`rule ${K.usage}`,options:P[0]==="add"?Ko:[],examples:P[0]==="add"?Jo:void 0}}function Zw(P){let G=fn({label:"rule",booleans:{global:["-g","--global"],project:["--project"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"],cwdArg:["--cwd-arg"]},lists:{only:["--only"]},positionals:"list"},P),K={...G.flags,ref:G.values.ref,cwdArg:G.values.cwdArg,only:G.lists.only??[],help:G.help,positionals:G.positionals,errors:G.errors};return Xw(K),K}function Xw(P){let[G]=P.positionals;if(G&&!Up.has(G))P.errors.push(`Unknown rule subcommand: ${G}`);if(P.deleteSource&&G!=="remove")if(G&&Up.has(G))P.errors.push(`Unknown option for rule ${G}: --delete-source`);else P.errors.push("--delete-source is only valid with 'rule remove'");if(P.cleanup&&G!=="migrate")P.errors.push(zn(G,"--cleanup"));if(P.example&&G!=="init")P.errors.push(zn(G,"--example"));if(P.ref&&G!=="add")P.errors.push(zn(G,"--ref"));if(P.only.length>0&&G!=="add")P.errors.push(zn(G,"--only"));let K=G==="tool"?P.positionals[1]:void 0,Y=K&&Gp.has(K)?`tool ${K}`:G;if(P.project&&K!=="add"&&K!=="remove")P.errors.push(zn(Y,"--project"));if(P.cwdArg!==void 0&&K!=="add")P.errors.push(zn(Y,"--cwd-arg"));if(G==="tool"&&P.global)P.errors.push(zn(G,"--global"));if(G==="add")Qw(P);if(G==="migrate"){if(P.global)P.errors.push(zn(G,"--global"));if(P.positionals.length>1)P.errors.push(`Unexpected rule migrate argument: ${P.positionals[1]}`)}else if(G==="wrapper")Bp(P,"a command");else if(G==="tool")Bp(P,"a tool name");else if(P.positionals.length>2)P.errors.push(`Unexpected rule argument: ${P.positionals[2]}`);if(G==="list"&&P.global)P.errors.push("Unknown option for rule list: --global")}function Vp(P){if(P.positionals[1])return P.positionals[1];if(P.ref||P.only.length>0)return zw;return}function Qw(P){let G=Vp(P);if(!G)return;if((P.ref||P.only.length>0)&&!Q(G)){if(P.ref)P.errors.push(`--ref can only select a ref for an owner/repo source: ${G}`);if(P.only.length>0)P.errors.push("--only can only select rulebooks from an owner/repo source");return}if(P.ref&&!le(P.ref))P.errors.push(`--ref must use valid path segments: ${P.ref}`);let K=P.only.filter((Y)=>!p.test(Y));if(K.length>0)P.errors.push(`Invalid rulebook names: ${K.join(", ")}`)}function zn(P,G){return P?`Unknown option for rule ${P}: ${G}`:`Unknown option for rule: ${G}`}function Bp(P,G){let K=P.positionals[0],Y=P.positionals[1],Z=P.positionals[2];if(!Y){P.errors.push(`rule ${K} requires add, remove, or list`);return}if(!Gp.has(Y)){P.errors.push(`Unknown rule ${K} action: ${Y}`);return}if(Y==="list"){if(Z)P.errors.push(`Unexpected rule ${K} argument: ${Z}`);return}if(!Z){P.errors.push(`rule ${K} ${Y} requires ${G}`);return}if(K!=="tool"&&P.positionals.length>3)P.errors.push(`Unexpected rule ${K} argument: ${P.positionals[3]}`)}function ek(P){if(r(P)===null){Yu(P);return}let G=d(P);if(!G.config)return;vn(P,G.config)}async function nk(P,G){let K=G.positionals[1],Y=G.positionals[2],Z=hn(P,{global:G.global}).configTarget;if(K==="list"){let ge=d(Z);if(ge.errors.length>0){for(let ye of ge.errors)console.error(ye);return 1}return tk(ge.config?.transparent_wrappers??[]),0}if(!Y||!E.test(Y))return console.error("transparent wrapper must match command pattern"),1;if(Ue(Y))return console.error(`reserved command "${Y}" cannot be a wrapper`),1;let X=d(Z);if(X.errors.length>0){for(let ge of X.errors)console.error(ge);return 1}let ie=X.config??de,ae=K==="add"?[...new Set([...ie.transparent_wrappers??[],Y])]:(ie.transparent_wrappers??[]).filter((ge)=>ge!==Y);return vn(Z,{...ie,transparent_wrappers:ae}),console.log(K==="add"?`Added transparent wrapper: ${Y}`:`Removed transparent wrapper: ${Y}`),0}function tk(P){if(P.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${P.length}):`);for(let G of P)console.log(`  - ${G}`)}function rk(P,G,K){let Y=G.positionals[1],Z=[...new Set(G.positionals.slice(2))];if(Y==="list")return ok(P,K);let X=[...Z.flatMap((ye)=>{if(!Ge.test(ye))return[`"${ye}" is not a tool name: ${Ce}.`];let Pe=Y==="add"?jo(ye):void 0;return Pe?[Pe]:[]}),...G.cwdArg!==void 0&&!Ge.test(G.cwdArg)?[`"${G.cwdArg}" is not an argument name: ${Ce}.`]:[]];if(X.length>0){for(let ye of X)console.error(Qe.red(`Error: ${ye}`));return 1}let ie=hn(P,{global:!G.project}),ae=Pr(ie.configTarget);if(!ae.ok){for(let ye of ae.result.errors)console.error(ye);return 1}let ge=Z.reduce((ye,Pe)=>{let Re=G.cwdArg===void 0?Pe:{name:Pe,cwd:G.cwdArg},_e=(Ae)=>(typeof Ae==="string"?Ae:Ae.name)===Pe;if(Y==="remove")return ye.filter((Ae)=>!_e(Ae));return ye.some(_e)?ye.map((Ae)=>_e(Ae)?Re:Ae):[...ye,Re]},ae.config.command_tools??[]);vn(ie.configTarget,{...ae.config,command_tools:ge});for(let ye of Z)console.log(Y==="add"?`Added command tool: ${ye}${G.cwdArg===void 0?"":` (cwd argument: ${G.cwdArg})`}`:`Removed command tool: ${ye}`);return console.log(`Scope: ${G.project?"project":"user"} (${ie.configPath})`),0}function ok(P,G){let K=(O(P,{cwd:G})?["user"]:["user","project"]).map((Z)=>{let X=hn(P,{global:Z==="user"});return{scope:Z,path:X.configPath,...d(X.configTarget)}}),Y=K.flatMap((Z)=>Z.errors.map((X)=>`${Z.path}: ${X}`));if(Y.length>0){for(let Z of Y)console.error(Z);return 1}return zu(K.flatMap((Z)=>(Z.config?.command_tools??[]).map((X)=>({scope:Z.scope,tool:X})))),0}import{sep as dk}from"node:path";import{existsSync as ik,readFileSync as sk}from"node:fs";import{join as ak}from"node:path";async function lk(P){if(P.isTTY)return null;return(await ct(P).catch(()=>null))?.trim()||null}function ck(P){let G=P.env.get("CLAUDE_SETTINGS_PATH");if(G)return G;return ak(Vr(P),"settings.json")}function Us(P){let G=ck(P);if(!ik(G))return!1;try{let K=sk(G,"utf-8"),Y=JSON.parse(K);if(!Y.enabledPlugins)return!1;let Z="cc-safety-net@cc-marketplace";if(!(Z in Y.enabledPlugins))return!1;return Y.enabledPlugins[Z]===!0}catch(K){if(S(n.debug,P.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${G}: ${K instanceof Error?K.message:String(K)}`);return!1}}async function Bs(P,G=process.stdin){let K=Us(P),Y;if(!K)Y="\uD83D\uDEE1️ CC Safety Net ❌";else{let X=R(P,{cwd:process.cwd()}),ie=X.policy,ae=_(ie,P.env),ge=Object.values(q(ie,ae.capabilities)).some((Re)=>Re.changesInherited),ye={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[ge?"custom":ae.effectiveLevel],Pe=X.policyScopes&&!X.policyScopes.weakeningsIgnored&&X.policyScopes.weakenings.length>0?"\uD83D\uDD3B":"";Y=`\uD83D\uDEE1️ CC Safety Net ${ye}${ae.worktreeMode?"\uD83C\uDF33":""}${Pe}${X.state==="degraded"?"⚠️":""}`}let Z=await lk(G);if(Z&&!Z.startsWith("{"))console.log(`${Z} | ${Y}`);else console.log(Y)}function Kp(P){let G=R(P,{cwd:process.cwd()}),K=G.policy,Y=_(K,P.env),Z=!!process.env.NO_COLOR||!process.stdout.isTTY,X=Math.min(process.stdout.columns||80,100),ie=Z?"ok":"✔",ae=Z?"OFF":"✘",ge=(je,Oe)=>{let Ve=`  ${je.padEnd(13)}${Oe}`;return(Ve.length>X?`${Ve.slice(0,X-1)}…`:Ve).replaceAll(ae,Qe.red(ae))},ye=Object.values(q(K,Y.capabilities)).some((je)=>je.changesInherited),Pe=(je)=>je===P.home||je.startsWith(`${P.home}${dk}`)?`~${je.slice(P.home.length)}`:je,Re={ready:Qe.green,degraded:Qe.yellow}[G.state],_e=G.policyScopes?.weakenings??[],Ae=[...Us(P)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...G.diagnostics],Ie=Z?"-":"·";console.log([`${Z?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Re(G.state)}`,"",ge("Protection",`destructive ${K.destructiveCommandProtectionEnabled?ie:ae}   secrets ${K.secretProtection.enabled?ie:ae}`),ge("Level",ye?`${Y.effectiveLevel} (customised)`:Y.effectiveLevel),ge("Rules",K.rules.length===0?"none active":`${K.rules.length} active`),ge("Policy",Pe(u(P))),...G.policyScopes?[ge("Project",Pe(y(process.cwd())))]:[],...Y.worktreeMode?[ge("Worktree","relaxations active")]:[],"",..._e.length===0?[]:[G.policyScopes?.weakeningsIgnored?"  Project policy (ignored)":"  Project policy",..._e.flatMap((je)=>mr(je,"      ",X-6).map((Oe,Ve)=>Ve===0?`    ${Oe}`:Oe)),""],...Ae.length===0?["  Everything configured is active."]:["  Not active",...Ae.flatMap((je)=>mr(je,"      ",X-6).map((Oe,Ve)=>Ve===0?`    ${Ie} ${Oe}`:Oe)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as pf}from"node:child_process";import{randomBytes as wk}from"node:crypto";import{existsSync as ff,mkdirSync as kk,readFileSync as Ck}from"node:fs";import{createServer as xk}from"node:http";import{dirname as mf,join as Pk}from"node:path";import{Writable as Sk}from"node:stream";var Ho=500;function uk(P){let G=P.filter((Z)=>Z.decision!=="allow"),K=P.filter((Z)=>Z.decision==="allow"),Y=Math.min(G.length,Math.max(Ho-K.length,Math.ceil(Ho/2)));return[...G.slice(0,Y),...K.slice(0,Ho-Y)]}function Jp(P,G,K=U(P)){if(K)J(P,K);let Y=(Oe)=>new Date(Oe.getFullYear(),Oe.getMonth(),Oe.getDate()).getTime(),Z=Y(new Date),X=new Date(Z);X.setDate(X.getDate()-(G-1));let ie=X.getTime(),ae=[],ge={count:0};for(let Oe of K?Wn(K,ge):[])for(let Ve of Dt(Oe,ge)){let nn=new Date(Ve.ts).getTime();if(!Number.isFinite(nn))continue;if(nn>=ie)ae.push(Ve)}ae.sort((Oe,Ve)=>new Date(Ve.ts).getTime()-new Date(Oe.ts).getTime());let ye=Array.from({length:G},()=>0),Pe=Array.from({length:G},()=>0),Re={},_e={},Ae={},Ie=0,je=0;for(let Oe of ae){let Ve=Oe.agent||"unknown";Re[Ve]=(Re[Ve]??0)+1;let nn=Math.round((Z-Y(new Date(Oe.ts)))/86400000),rn=G-1-nn,an=nn>=0&&nn<G;if(an)Pe[rn]=(Pe[rn]??0)+1;if(Oe.decision!=="allow"){if(Ie++,Oe.ruleId)_e[Oe.ruleId]=(_e[Oe.ruleId]??0)+1;let en=Go(Oe.segment||Oe.command);if(en)Ae[en]=(Ae[en]??0)+1;if(Oe.failureStage)je++;if(an)ye[rn]=(ye[rn]??0)+1}}return{days:G,logsDir:K,homeDir:P.home,totalInWindow:ae.length,truncated:ae.length>Ho,unreadable:ge.count,counts:{blocked:Ie,allowed:ae.length-Ie,agents:Re,blockedByDay:ye,analyzedByDay:Pe,rules:_e,commands:Ae,errors:je},entries:uk(ae).sort((Oe,Ve)=>new Date(Ve.ts).getTime()-new Date(Oe.ts).getTime())}}import{spawn as pk}from"node:child_process";import{existsSync as fk,statSync as zp}from"node:fs";import{delimiter as mk,join as gk}from"node:path";var yk=120000,Mo="Choose the project folder",hk=`try
  return POSIX path of (choose folder with prompt "${Mo}")
on error number -128
  return ""
end try`,vk=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Mo}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Wp=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Mo}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Mo]}],Yp=(P,G)=>(G.PATH??"").split(mk).some((K)=>{if(K.length===0)return!1;try{let Y=zp(gk(K,P));return Y.isFile()&&(Y.mode&73)!==0}catch{return!1}});function Gs(P,G){if(P==="darwin"||P==="win32")return!0;if(P!=="linux")return!1;if(!G.DISPLAY&&!G.WAYLAND_DISPLAY)return!1;return Wp.some((K)=>Yp(K.binary,G))}function bk(P,G){if(P==="darwin")return{cmd:"osascript",args:["-e",hk]};if(P==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",vk]};let K=Wp.find((Y)=>Yp(Y.binary,G));return K?{cmd:K.binary,args:K.args}:null}function qs(P=process.platform,G=process.env){let K=bk(P,G);if(!K)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((Y)=>{let Z=pk(K.cmd,K.args,{env:G,stdio:["ignore","pipe","pipe"]}),X="",ie=!1,ae=(ye)=>{if(ie)return;ie=!0,clearTimeout(ge),Y(ye)},ge=setTimeout(()=>{Z.kill(),ae({error:"The folder dialog timed out"})},yk);Z.stdout.on("data",(ye)=>{X+=ye.toString()}),Z.on("error",()=>ae({error:`Could not open the folder dialog (${K.cmd})`})),Z.on("close",()=>{let ye=X.trim().replace(/\/+$/,"");if(!ye)return ae({cancelled:!0});if(!fk(ye)||!zp(ye).isDirectory())return ae({error:"That selection is not a folder on disk"});ae({path:ye})})})}var Zp=["en","ja","zh-CN"],Xp=["light","dark"],Uo=(P,G)=>P.includes(G),Qp=(P)=>typeof P==="object"&&P!==null&&!Array.isArray(P),ef=(P)=>{let G=Qp(P)?P:{};return{...Uo(Zp,G.language)?{language:G.language}:{},...Uo(Xp,G.theme)?{theme:G.theme}:{}}},nf=(P)=>{if(!Qp(P))return null;let G=Object.keys(P).every((Z)=>Z==="language"||Z==="theme"),K=P.language===void 0||Uo(Zp,P.language),Y=P.theme===void 0||Uo([...Xp,"auto"],P.theme);return G&&K&&Y?P:null},tf=(P,G)=>{let K=G.language??P.language,Y=G.theme==="auto"?void 0:G.theme??P.theme;return{...K?{language:K}:{},...Y?{theme:Y}:{}}};var rf=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CC Safety Net</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22512%22%20height%3D%22512%22%20viewBox%3D%220%200%20512%20512%22%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20rx%3D%22112%22%20fill%3D%22%2317161b%22%2F%3E%3Csvg%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22432%22%20height%3D%22432%22%20viewBox%3D%22-172.38%20-172.38%20824.77%20824.77%22%3E%3Cg%20transform%3D%22rotate(45%20240%20240)%22%3E%3Crect%20x%3D%22-30%22%20y%3D%2214%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22315%22%20y%3D%2214%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22-30%22%20y%3D%2294%22%20width%3D%22115%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22235%22%20y%3D%2294%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22155%22%20y%3D%22174%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%2275%22%20y%3D%22254%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22395%22%20y%3D%22254%22%20width%3D%22115%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22-30%22%20y%3D%22334%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22315%22%20y%3D%22334%22%20width%3D%22195%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22-30%22%20y%3D%22414%22%20width%3D%22115%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%22235%22%20y%3D%22414%22%20width%3D%22170%22%20height%3D%2252%22%20rx%3D%229%22%20fill%3D%22%23f5f4f0%22%2F%3E%3Crect%20x%3D%2214%22%20y%3D%22155%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%2294%22%20y%3D%2275%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%2294%22%20y%3D%22395%22%20width%3D%2252%22%20height%3D%22115%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22174%22%20y%3D%22-30%22%20width%3D%2252%22%20height%3D%22195%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22174%22%20y%3D%22315%22%20width%3D%2252%22%20height%3D%22195%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22254%22%20y%3D%22-30%22%20width%3D%2252%22%20height%3D%22115%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22254%22%20y%3D%22235%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22334%22%20y%3D%22155%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22414%22%20y%3D%2275%22%20width%3D%2252%22%20height%3D%22170%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3Crect%20x%3D%22414%22%20y%3D%22395%22%20width%3D%2252%22%20height%3D%22115%22%20rx%3D%229%22%20fill%3D%22%23e5602a%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%3C%2Fsvg%3E%0A">
  <script id="ccsn-data" type="application/json"></script>
  <script>
// src/gui/frontend/gui-data.ts
var guiData = JSON.parse(document.getElementById("ccsn-data")?.textContent ?? "");

// src/gui/frontend/preferences.ts
var localeByLanguage = new Map([
  ["en", "en"],
  ["ja", "ja"],
  ["zh", "zh-CN"]
]);
var resolveLocale = (saved, languages) => saved ?? languages.map((tag) => localeByLanguage.get(tag.toLowerCase().split("-")[0] ?? "")).find((locale) => locale !== undefined) ?? "en";

// src/gui/frontend/head.ts
document.documentElement.lang = resolveLocale(guiData.preferences.language, navigator.languages);
if (guiData.preferences.theme)
  document.documentElement.style.colorScheme = guiData.preferences.theme;

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

.language-picker {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--faint);
}

.language-picker:hover,
.language-picker:focus-within {
  color: var(--ink);
}

.language-picker svg {
  width: 14px;
  height: 14px;
  flex: none;
}

.language-picker select {
  height: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
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

.link-button {
  flex: none;
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
}

.link-button::after {
  content: ' →';
}

.link-button:hover {
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

.master-state {
  color: var(--err-fg);
  font-size: 13px;
  font-weight: 500;
}

.master-state .state-on,
.master-switch:has(:checked) .master-state .state-off {
  display: none;
}

.master-switch:has(:checked) .master-state {
  color: var(--muted);
}

.master-switch:has(:checked) .master-state .state-on {
  display: inline;
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
        <h1 class="brand-logo"><a class="brand-home" href="#overview" data-i18n-title="navOverview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 476.62 104" role="img" aria-label="CC Safety Net"><defs><style>@font-face{font-family:'Exo 2 Kit';font-style:italic;font-weight:700;src:url(data:font/woff2;base64,d09GMgABAAAAAAbUAA8AAAAADAQAAAZ7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGjYbgyQcVgZgP1NUQVRAAGwRCAqJMIdOCxgAATYCJAMsBCAFhDAHIBsHClEU84FMI2Xh/P0gqJpmz2glW7tm2AMGEwsNLDMfvC6JFAYQpPIEwhmU0xSaCF+QTsL/fr9W/1uXRBItlZA9tc/Z9Yv5Q0SSmDWGUAhNRJtlK9FLKKzDiVzMJj0vnDSdSSQEYLKYQBuCGLPALmhtxAISi2ZWHkV0ILcjDR6rs5GDaEcLyx1kdcyODZDVPebrJ2ugbWKILNkBQClYW9HvGxsiWjnNmOQ2JJovesQSRNmQRxoiskig7/FcAHZApkhZYgQ4vYi+qS95Gzs6m+iq/1ig/tdrUQqZrv4fjgwrgfpH/e7GW5n6Rzb9rL5X3/AAgsmcGyQaVq7JNiJbGiDQZxuRxpooiyzIdHCygPSC5IIkIFKwSFffp0/wUjYjKS5NoogLGOjtbnM8VaGhpYcTCWfSUjvZhhtRk4XySaxdpF961G+UqQ3YJJrZLFYS7HMtUh3GLHs+p7KqsoDrMJm1fKF2iC7aKbHDRFwSXCG+l/fnQdB25gYOKUdhafl0d8/Ev9X3TrQNCAYogYfEsePJ6XcDIkE+aQUGZDElS2BgChoenkQCb1eZHKGSOtroYoLZtB/wLvNdq75WT6sH1b3qBnWtukCdgz+U6igQShF/JUOyNCFZJfr1MiFZOyaLnIwFRmUW0AYPWrx061Lb+kxrvDXVyMy0tjTqLbHTwJjYnJjGp/YHQi8tc9z88su6/9Vng45g6C0jENnhfDGo+8Nhd0R+6HTjpbfquv/2rPrLr8/ST16b4dFbrrjDMAK3ZXovuy/TuPyG7Ib+QKjAcXM4rPsfvPHSjEsvu22Z87X3QmZQ3Fv3h13ul0IvGYFX7si+4vLbl7tefz+cf0NEFHQHQnb9D3+x/633mtcGb1txyzsfbFh3r8g+Gpy3czo9uns56BDzymeDRx1u9y2P/CLj4aXwT+UEQ48ZgUhkhfPGoK9H9QdeemmZQ/c/mtMY8MztbiPwRH5LJOJ0xLjd/Z4PFZ3Y2KYtKytYWYfM1o6jlwQ37O/v73Ps7++bmI0fbR0JDx8dmWNZVmJjm1AeGdoMne0IeN3GBh0HOR0H+47/9ql9Gn1m9n0WfSBpVlAV3nVM7PeauM3NbuRAaYXWwDZF2iOE1W3gy8gAWmccde8oddY6wmQ8F/50bf1ARjA/aBkrVUGtQ+mZVuBZ+mCJQ80mLVFUYBErNUGtRWlVmmNbxhaHh8ssJZYHzOfEQnHscF1eNIA2YKd06v4TI/YqqooRdgvH13JC60gb+dNZsyZgaeLjeTeYQgsIuaV6ZFg9EyySJdSi8LVsPNg1lNjs8IDyH5UCXAnVyeKiH6gIaBlPziUdcoFCeEFDY1VLvZSGhaPgkAJURRI/Etcax4TPRV3ADq+EqBCtdBkM8acG8n/WTmyMOum+94aU9/8kWIZ7JE1cEmziR2Lb9NVzFDEYBVzFT24KZagafAljfa6Nr4tkcvaRZg7DmKF1uBxVxJzJgMw2SeOKCqmtJbuMhakeWlnf0JhSETFCaifPzmNurIelamAwcovrEIBtbQEH3GHKZ1LEtMpIF1YNYgJVNa16jW9UBq5DCLa1PRzIPwZQuTI6s1ix6NIKmnp7RwtrwvDMtBSp1iS1Vk95QpnScY0vOaMZCCXYHVzJ/0V0Z4D0CrFjsjCpnT67jIWJMkZZz9CYUhExQmon72HF3qK6I/aC6qrHjZTrXjya2uRdsdfj2G8/WlVdm3VQeyi1af/KvcV1++0F1dUPfBzTGtEbvBoA6lkEIOU5eY+UL7TE7/0t2mL5EuCta2OSAD5Zdv4v/7v//0j7WSvBQguGTaGAOu3L1vj/3f/9qf1s+ZKzaorXNGQla2UJS+Vb5MgC4mUNGXIrGeJcdZG4FFMWsEz+oS7iw/pscwadRDFAVM3j1AUG/mu6Zh/brxcaWorkv2WoJI1PQy1s5V5RFi3mbBlqJYuJUBt5uArj2F4Xi9IvegbJKZJp8mhKaDVeephhBuikhAnaGKCXDtz46KWbHib2nScYYZzdbBj5hnWdjyG6RkVDTIDxdtE4PtYzzBjdFDCjVt/MOmzmahhjnF7zk0w2s56NbGKjCd5SzeVkczwA9lf2UEkVlRSwx9UIUAa4oSOESmYZI4wAOPjqFkwc9ODD9Cu/mrFxQx8+OoD8EJM8gfj645is5Ix30xt51CTtrKeDYQYD+g8zTDcD+NgsGmeDm+R1RP2rWpqtqT9BXclmNgA=) format('woff2')}</style></defs><svg x="0" y="0" width="96" height="96" viewBox="-172.38 -172.38 824.77 824.77"><g transform="rotate(45 240 240)"><rect x="-30" y="14" width="195" height="52" rx="9" fill="currentColor"/><rect x="315" y="14" width="195" height="52" rx="9" fill="currentColor"/><rect x="-30" y="94" width="115" height="52" rx="9" fill="currentColor"/><rect x="235" y="94" width="170" height="52" rx="9" fill="currentColor"/><rect x="155" y="174" width="170" height="52" rx="9" fill="currentColor"/><rect x="75" y="254" width="170" height="52" rx="9" fill="currentColor"/><rect x="395" y="254" width="115" height="52" rx="9" fill="currentColor"/><rect x="-30" y="334" width="195" height="52" rx="9" fill="currentColor"/><rect x="315" y="334" width="195" height="52" rx="9" fill="currentColor"/><rect x="-30" y="414" width="115" height="52" rx="9" fill="currentColor"/><rect x="235" y="414" width="170" height="52" rx="9" fill="currentColor"/><rect x="14" y="155" width="52" height="170" rx="9" fill="#e5602a"/><rect x="94" y="75" width="52" height="170" rx="9" fill="#e5602a"/><rect x="94" y="395" width="52" height="115" rx="9" fill="#e5602a"/><rect x="174" y="-30" width="52" height="195" rx="9" fill="#e5602a"/><rect x="174" y="315" width="52" height="195" rx="9" fill="#e5602a"/><rect x="254" y="-30" width="52" height="115" rx="9" fill="#e5602a"/><rect x="254" y="235" width="52" height="170" rx="9" fill="#e5602a"/><rect x="334" y="155" width="52" height="170" rx="9" fill="#e5602a"/><rect x="414" y="75" width="52" height="170" rx="9" fill="#e5602a"/><rect x="414" y="395" width="52" height="115" rx="9" fill="#e5602a"/></g></svg><text x="115.98" y="62.42" font-family="'Exo 2 Kit','Exo 2',sans-serif" font-style="italic" font-weight="700" font-size="56" letter-spacing="-0.56" fill="currentColor">CC Safety Net</text></svg>
</a></h1>
      </div>
      <nav class="sidenav" data-i18n-aria-label="navSections">
        <a href="#overview" data-nav="overview" data-i18n-title="navOverview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="16" width="7" height="5" rx="1.5"></rect></svg><span class="sr-only-collapse" data-i18n="navOverview"></span></a>
        <a href="#activity" data-nav="activity" data-i18n-title="navActivity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"></path></svg><span class="sr-only-collapse" data-i18n="navActivity"></span></a>
        <a href="#policy" data-nav="policy" data-i18n-title="navProtections"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"></path></svg><span class="sr-only-collapse" data-i18n="navProtections"></span><span class="nav-dirty" id="nav-dirty" data-i18n="navUnsaved" hidden></span></a>
        <a href="#rules" data-nav="rules" data-i18n-title="navCustomRules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4"></path><path d="M9 12h6M9 16h4"></path></svg><span class="sr-only-collapse" data-i18n="navCustomRules"></span></a>
        <a href="#integrations" data-nav="integrations" data-i18n-title="navAgents"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"></path></svg><span class="sr-only-collapse" data-i18n="navAgents"></span></a>
        <a href="#settings" data-nav="settings" data-i18n-title="navSettings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"></path><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle></svg><span class="sr-only-collapse" data-i18n="navSettings"></span></a>
      </nav>
      <div class="sidebar-foot">
        <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener" data-i18n="documentation"></a>
        <label class="language-picker"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"></path></svg><select data-language-select data-i18n-aria-label="language"><option value="en" lang="en">English</option><option value="ja" lang="ja">日本語</option><option value="zh-CN" lang="zh-CN">简体中文</option></select></label>
      </div>
    </aside>
    <div class="content">
      <main>
        <div class="banner" id="protection-banner" role="alert" hidden></div>

        <section class="view" data-view="overview">
          <header class="page-head">
            <div>
              <h2 data-i18n="navOverview"></h2>
              <p data-i18n="overviewIntro"></p>
            </div>
          </header>
          <div class="card status-card" id="status-card" aria-live="polite"><p class="muted" data-i18n="loading"></p></div>
          <section class="section" id="attention" hidden>
            <div class="section-head"><h3 class="section-title" data-i18n="needsAttention"></h3></div>
            <ul class="card list" id="attention-list"></ul>
          </section>
          <div class="tiles" id="overview-tiles"></div>
          <section class="section">
            <div class="section-head">
              <h3 class="section-title" data-i18n="recentBlocks"></h3>
              <a class="link-button" href="#activity" data-i18n="allActivity"></a>
            </div>
            <div id="recent-blocks"></div>
          </section>
          <section class="section">
            <div class="section-head">
              <h3 class="section-title" id="top-rules-title" data-i18n="topRules"></h3>
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
              <h2 data-i18n="navActivity"></h2>
              <p data-i18n="activityIntro"></p>
            </div>
            <button type="button" class="quiet icon-button" id="activity-refresh" data-i18n-aria-label="refreshActivity" data-i18n-title="refreshActivity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"></path><path d="M20 4v7h-7"></path></svg></button>
          </header>
          <div class="toolbar">
            <div class="pills" id="activity-decision" role="group" data-i18n-aria-label="decisionFilter"></div>
            <span class="toolbar-spacer"></span>
            <label class="toolbar-search"><span class="sr-only" data-i18n="searchActivity"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg><input type="search" id="activity-search" autocomplete="off" data-i18n-placeholder="searchActivityPlaceholder"></label>
            <label class="toolbar-select"><span class="sr-only" data-i18n="agentFilter"></span><select id="activity-agent"></select></label>
            <label class="toolbar-select"><span class="sr-only" data-i18n="timeWindow"></span><select id="activity-days"></select></label>
          </div>
          <div class="filter-line" id="activity-command-filter" hidden></div>
          <div class="card list" id="activity-feed"><p class="empty" data-i18n="loadingActivity"></p></div>
          <p class="footnote" id="activity-count"></p>
        </section>

        <section class="view" data-view="policy" hidden>
          <header class="page-head">
            <div>
              <h2 data-i18n="navProtections"></h2>
              <p data-i18n="policyIntro"></p>
            </div>
            <div class="page-actions">
              <div class="pills" role="group" data-i18n-aria-label="policyScope">
                <button type="button" id="scope-user" aria-pressed="true" data-i18n="myPolicy"></button>
                <button type="button" id="project-draft-enter" aria-pressed="false" data-i18n="projectPolicy"></button>
              </div>
              <button type="button" id="tester-open" aria-haspopup="dialog" data-i18n="testCommand"></button>
            </div>
          </header>
          <div class="project-bar" id="project-draft-bar" hidden>
            <div>
              <strong data-i18n="editingProjectPolicy"></strong> <code id="project-draft-path"></code>
              <p data-i18n-html="projectBarHelp"></p>
            </div>
            <button type="button" id="project-draft-change" data-i18n="changeFolder" hidden></button>
          </div>
          <p class="notice error" id="project-draft-diagnostics" hidden></p>
          <div class="recovery" id="recovery" hidden>
            <div>
              <strong data-i18n="statusRepair"></strong>
              <p data-i18n="repairHelp"></p>
              <p class="notice error" id="policy-errors"></p>
            </div>
            <button class="primary" id="repair" type="button" data-i18n="repair"></button>
          </div>

          <section class="section">
            <div class="section-head">
              <div>
                <h3 class="section-title" data-i18n="safetyPreset"></h3>
                <p class="section-sub" data-i18n="safetyPresetSub"></p>
              </div>
              <span class="preset-status" id="safety-preset-status"></span>
              <span class="project-chip-slot" id="safety-level-chip"></span>
            </div>
            <div class="preset-grid" id="safety-level"></div>
            <p class="notice" id="environment-overrides" hidden></p>
            <details class="card disclosure">
              <summary><span class="disclosure-title" data-i18n="advancedSettings"></span><span class="disclosure-sub" data-i18n="advancedSettingsSub"></span></summary>
              <div class="disclosure-body">
                <div id="safety-overrides"></div>
                <div id="workflow"></div>
              </div>
            </details>
          </section>

          <div class="toolbar policy-toolbar">
            <label class="toolbar-search primary-search"><span class="sr-only" data-i18n="searchProtections"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg><input type="search" id="policy-search" autocomplete="off" aria-keyshortcuts="/" data-i18n-placeholder="searchProtectionsPlaceholder"></label>
            <div class="pills" role="group" data-i18n-aria-label="protectionsShown">
              <button type="button" data-policy-show="all" aria-pressed="true" data-i18n="filterAll"></button>
              <button type="button" data-policy-show="changed" aria-pressed="false"><span data-i18n="showChanged"></span> <span class="count" id="changed-count"></span></button>
            </div>
          </div>

          <section class="card panel" id="destructive-panel">
            <div class="panel-head">
              <div>
                <h3 class="section-title" id="destructive-label" data-i18n="commandProtection"></h3>
                <p class="section-sub" id="destructive-command-summary"></p>
              </div>
              <div class="section-actions">
                <button type="button" class="quiet" id="reset-rule-customizations" data-i18n="resetAll"></button>
                <span class="project-chip-slot" id="destructive-enabled-chip"></span>
                <label class="master-switch"><span class="master-state"><span class="state-on" data-i18n="switchOn"></span><span class="state-off" data-i18n="switchOff"></span></span><input type="checkbox" class="switch" id="destructive-enabled" aria-labelledby="destructive-label"></label>
              </div>
            </div>
            <div class="panel-list" id="destructive-command-rules"></div>
          </section>

          <section class="card panel" id="secret-panel">
            <div class="panel-head">
              <div>
                <h3 class="section-title" id="secret-label" data-i18n="secretProtection"></h3>
                <p class="section-sub" id="secret-summary"></p>
              </div>
              <div class="section-actions">
                <button type="button" class="quiet" id="reset-secret-customizations" data-i18n="resetAll"></button>
                <span class="project-chip-slot" id="secret-enabled-chip"></span>
                <label class="master-switch"><span class="master-state"><span class="state-on" data-i18n="switchOn"></span><span class="state-off" data-i18n="switchOff"></span></span><input type="checkbox" class="switch" id="secret-enabled" aria-labelledby="secret-label"></label>
              </div>
            </div>
            <div class="panel-list" id="secret-patterns"></div>
          </section>

          <section class="card panel">
            <div class="panel-head">
              <div>
                <h3 class="section-title" data-i18n="pathsTitle"></h3>
                <p class="section-sub" data-i18n-html="pathsSub"></p>
              </div>
            </div>
            <div class="panel-rows">
              <div class="path-list">
                <div class="path-list-head"><strong id="allow-paths-label" data-i18n="allowPathsLabel"></strong><span class="count" id="allow-paths-count"></span><span class="project-chip-slot" id="allow-paths-chip"></span></div>
                <p class="path-list-help" data-i18n-html="allowPathsHelp"></p>
                <div class="input-row"><input type="text" class="mono" id="allow-paths-input" data-path-input="allow-paths" autocomplete="off" spellcheck="false" data-i18n-placeholder="allowPathsPlaceholder" aria-labelledby="allow-paths-label"><button type="button" id="allow-paths-add-button" data-path-add="allow-paths" data-i18n="add"></button></div>
                <p class="field-error" id="allow-paths-hint" hidden></p>
                <ul class="paths" id="allow-paths-list"></ul>
              </div>
              <div class="path-list">
                <div class="path-list-head"><strong id="deny-paths-label" data-i18n="denyPathsLabel"></strong><span class="count" id="deny-paths-count"></span><span class="project-chip-slot" id="deny-paths-chip"></span></div>
                <p class="path-list-help" data-i18n="denyPathsHelp"></p>
                <div class="input-row"><input type="text" class="mono" id="deny-paths-input" data-path-input="deny-paths" autocomplete="off" spellcheck="false" data-i18n-placeholder="denyPathsPlaceholder" aria-labelledby="deny-paths-label"><button type="button" id="deny-paths-add-button" data-path-add="deny-paths" data-i18n="add"></button></div>
                <p class="field-error" id="deny-paths-hint" hidden></p>
                <ul class="paths" id="deny-paths-list"></ul>
              </div>
              <div class="path-list">
                <div class="path-list-head"><strong id="secret-allow-paths-label" data-i18n="secretAllowPathsLabel"></strong><span class="count" id="secret-allow-paths-count"></span><span class="project-chip-slot" id="secret-allow-paths-chip"></span></div>
                <p class="path-list-help" data-i18n-html="secretAllowPathsHelp"></p>
                <div class="input-row"><input type="text" class="mono" id="secret-allow-paths-input" data-path-input="secret-allow-paths" autocomplete="off" spellcheck="false" placeholder="~/code/**/.env.local" aria-labelledby="secret-allow-paths-label"><button type="button" id="secret-allow-paths-add-button" data-path-add="secret-allow-paths" data-i18n="add"></button></div>
                <p class="field-error" id="secret-allow-paths-hint" hidden></p>
                <ul class="paths" id="secret-allow-paths-list"></ul>
              </div>
            </div>
          </section>

          <details class="card disclosure">
            <summary><span class="disclosure-title" data-i18n="policyJson"></span><span class="disclosure-sub" id="raw-source" data-i18n="rawReadOnly"></span></summary>
            <div class="disclosure-body json-body">
              <button type="button" class="quiet" id="raw-copy"></button>
              <textarea id="raw" data-i18n-aria-label="policyJson" aria-describedby="raw-source" readonly></textarea>
            </div>
          </details>

          <div class="savebar" id="policy-savebar" hidden>
            <div class="savebar-text">
              <strong id="savebar-title" data-i18n="unsavedChanges"></strong>
              <span id="savebar-summary"></span>
            </div>
            <div class="savebar-actions">
              <button type="button" id="discard-changes" data-i18n="discard"></button>
              <button type="button" class="primary" id="save" data-i18n="save"></button>
            </div>
          </div>
        </section>

        <section class="view" data-view="rules" hidden>
          <header class="page-head">
            <div>
              <h2 data-i18n="navCustomRules"></h2>
              <p data-i18n="rulesIntro"></p>
            </div>
            <button type="button" class="quiet icon-button" id="rules-refresh" data-i18n-aria-label="refreshRules" data-i18n-title="refreshRules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"></path><path d="M20 4v7h-7"></path></svg></button>
          </header>
          <section class="section" id="rules-diagnostics-panel" hidden>
            <div class="section-head">
              <div>
                <h3 class="section-title" data-i18n="problems"></h3>
                <p class="section-sub" data-i18n="problemsSub"></p>
              </div>
            </div>
            <div class="notices" id="rules-diagnostics"></div>
          </section>
          <section class="section">
            <div class="section-head">
              <div>
                <h3 class="section-title" data-i18n="rulebooks"></h3>
                <p class="section-sub" data-i18n="rulebooksSub"></p>
              </div>
            </div>
            <div id="rules-list"><p class="empty" data-i18n="loadingRules"></p></div>
          </section>
          <section class="section" id="rules-composer-panel">
            <div class="section-head">
              <div>
                <h3 class="section-title" data-i18n="createRule"></h3>
                <p class="section-sub" data-i18n="createRuleSub"></p>
              </div>
            </div>
            <div class="card pad">
              <div class="form-grid">
                <div class="field">
                  <span class="field-label" data-i18n="appliesTo"></span>
                  <div class="pills" role="group" data-i18n-aria-label="ruleScope">
                    <button type="button" data-rules-scope="project" aria-pressed="true" data-i18n="thisProject"></button>
                    <button type="button" data-rules-scope="user" aria-pressed="false" data-i18n="allProjects"></button>
                  </div>
                </div>
                <div class="field" id="rules-project-path-field">
                  <label class="field-label" id="rules-project-path-label" for="rules-project-path" data-i18n="projectFolder"></label>
                  <div class="input-row">
                    <input type="text" class="mono" id="rules-project-path" spellcheck="false" autocomplete="off" aria-describedby="rules-project-path-hint">
                    <button type="button" id="rules-choose-directory" data-i18n="chooseFolder" hidden></button>
                  </div>
                  <small id="rules-project-path-hint" data-i18n="projectFolderHint"></small>
                </div>
                <div class="field">
                  <label class="field-label" id="rules-composer-label" for="rules-composer-input" data-i18n="ruleRequest"></label>
                  <textarea id="rules-composer-input" spellcheck="false" data-i18n-placeholder="ruleRequestPlaceholder" aria-describedby="rules-composer-hint"></textarea>
                  <small id="rules-composer-hint" data-i18n="ruleRequestHint"></small>
                  <div class="chip-row">
                    <span class="chip-row-label" data-i18n="tryExamples"></span>
                    <button type="button" class="chip" data-rules-example="suggest" data-i18n="exampleSuggest"></button>
                    <button type="button" class="chip" data-rules-example="block" data-i18n="exampleBlock"></button>
                    <button type="button" class="chip" data-rules-example="verify" data-i18n="exampleVerify"></button>
                  </div>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="primary" id="rules-copy-prompt" data-i18n="copyPrompt"></button>
              </div>
            </div>
          </section>
        </section>

        <section class="view" data-view="integrations" hidden>
          <header class="page-head">
            <div>
              <h2 data-i18n="navAgents"></h2>
              <p data-i18n="agentsIntro"></p>
            </div>
            <button type="button" class="quiet icon-button" id="integrations-refresh" data-i18n-aria-label="refreshAgents" data-i18n-title="refreshAgents"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"></path><path d="M20 4v7h-7"></path></svg></button>
          </header>
          <div class="agent-groups" id="integrations-list"><p class="empty" data-i18n="checkingAgents"></p></div>
        </section>

        <section class="view" data-view="settings" hidden>
          <header class="page-head">
            <div>
              <h2 data-i18n="navSettings"></h2>
              <p data-i18n="settingsIntro"></p>
            </div>
          </header>
          <section class="section">
            <div class="section-head"><h3 class="section-title" data-i18n="appearance"></h3></div>
            <div class="card rows">
              <div class="setting-row">
                <div class="setting-text"><strong data-i18n="theme"></strong><small data-i18n="preferenceHint"></small></div>
                <div class="pills" id="settings-theme" role="group" data-i18n-aria-label="theme">
                  <button type="button" data-theme-choice="auto" aria-pressed="true" data-i18n="themeAuto"></button>
                  <button type="button" data-theme-choice="light" aria-pressed="false" data-i18n="themeLight"></button>
                  <button type="button" data-theme-choice="dark" aria-pressed="false" data-i18n="themeDark"></button>
                </div>
              </div>
            </div>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title" data-i18n="auditLog"></h3></div>
            <div class="card rows">
              <div class="setting-row">
                <div class="setting-text"><label for="retention-days"><strong data-i18n="keepLogsFor"></strong></label><small id="retention-note" data-i18n="retentionNote"></small></div>
                <span class="retention-input"><input type="number" id="retention-days" min="1" max="365" step="1" inputmode="numeric" aria-describedby="retention-note"><span id="retention-unit"></span></span>
              </div>
              <div class="setting-row info"><span class="setting-label" data-i18n="logFolder"></span><code id="logs-path"></code><button type="button" class="quiet small" data-copy-path="logs-path" data-i18n-aria-label="copyLogFolder"></button></div>
            </div>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title" data-i18n="files"></h3></div>
            <div class="card rows">
              <div class="setting-row info"><span class="setting-label" data-i18n="policyFile"></span><code id="policy-path"></code><button type="button" class="quiet small" data-copy-path="policy-path" data-i18n-aria-label="copyPolicyPath"></button></div>
              <div class="setting-row info" id="project-policy-row" hidden><span class="setting-label" data-i18n="projectPolicy"></span><code id="project-policy-path"></code><button type="button" class="quiet small" data-copy-path="project-policy-path" data-i18n-aria-label="copyProjectPolicyPath"></button></div>
            </div>
            <p class="notice" id="project-policy-notice" hidden></p>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title" data-i18n="about"></h3></div>
            <div class="card rows">
              <div class="setting-row info"><span class="setting-label">CC Safety Net</span><code id="app-version"></code></div>
              <div class="setting-row info"><span class="setting-label">Node.js</span><code id="integrations-node-version"></code></div>
              <div class="setting-row info"><span class="setting-label" data-i18n="platform"></span><code id="integrations-platform"></code></div>
            </div>
          </section>
          <section class="section">
            <div class="section-head"><h3 class="section-title" data-i18n="dangerZone"></h3></div>
            <div class="card rows">
              <div class="setting-row">
                <div class="setting-text"><strong data-i18n="resetPolicy"></strong><small data-i18n="resetPolicyHelp"></small></div>
                <button type="button" class="danger-quiet" id="reset" data-i18n="resetPolicy"></button>
              </div>
            </div>
          </section>
        </section>
      </main>
      <footer class="app-foot">
        <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener" data-i18n="documentation"></a>
        <label class="language-picker"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"></path></svg><select data-language-select data-i18n-aria-label="language"><option value="en" lang="en">English</option><option value="ja" lang="ja">日本語</option><option value="zh-CN" lang="zh-CN">简体中文</option></select></label>
      </footer>
    </div>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite" hidden>
    <div class="toast-text">
      <strong id="toast-title"></strong>
      <p id="toast-detail" hidden></p>
    </div>
    <button type="button" class="quiet icon-only" id="toast-close" data-i18n-aria-label="dismissMessage">✕</button>
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
        <button type="submit" id="confirm-dialog-cancel" value="cancel" data-i18n="cancel"></button>
        <button type="submit" class="danger" id="confirm-dialog-confirm" value="confirm"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog tester-dialog" id="tester-dialog" aria-labelledby="tester-label" aria-describedby="tester-help">
    <form id="tester-form">
      <h2 id="tester-label" data-i18n="testCommand"></h2>
      <p id="tester-help" data-i18n="testerHelp"></p>
      <div class="input-row">
        <label class="prompt-field"><span class="prompt" aria-hidden="true">$</span><input type="text" id="tester-input" class="mono" autocomplete="off" spellcheck="false" placeholder="git push --force" aria-labelledby="tester-label"></label>
        <button type="submit" class="primary" id="tester-run" data-i18n="test"></button>
      </div>
      <div id="tester-result" class="notice" aria-live="polite" hidden></div>
      <div class="dialog-actions">
        <button type="button" id="tester-close" data-i18n="close"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog report-dialog" id="report-dialog" aria-labelledby="report-dialog-title" aria-describedby="report-dialog-body">
    <form method="dialog">
      <h2 id="report-dialog-title" data-i18n="reportDialogTitle"></h2>
      <p id="report-dialog-body" data-i18n-html="reportDialogBody"></p>
      <label class="report-field"><span data-i18n="reportWhy"></span><textarea id="report-why" data-i18n-placeholder="reportWhyPlaceholder"></textarea></label>
      <label class="report-field"><span data-i18n="reportTitleField"></span><input id="report-title" type="text" spellcheck="false"></label>
      <label class="report-field"><span data-i18n="reportCommandField"></span><textarea id="report-command" spellcheck="false"></textarea></label>
      <label class="report-field"><span data-i18n="reportEntryField"></span><textarea id="report-entry" spellcheck="false"></textarea></label>
      <div class="dialog-actions">
        <button type="submit" id="report-dialog-cancel" value="cancel" data-i18n="cancel"></button>
        <button type="submit" class="primary" id="report-dialog-open" value="report" data-i18n="openGitHubForm"></button>
      </div>
    </form>
  </dialog>
  <script>
// src/gui/frontend/gui-data.ts
var guiData = JSON.parse(document.getElementById("ccsn-data")?.textContent ?? "");

// src/gui/frontend/locales/en.ts
var count = (value) => value.toLocaleString("en");
var plural = (value, one, many) => \`\${count(value)} \${value === 1 ? one : many}\`;
var days = (value) => plural(value, "day", "days");
var en = {
  navSections: "Sections",
  navOverview: "Overview",
  navActivity: "Activity",
  navProtections: "Protections",
  navCustomRules: "Custom rules",
  navAgents: "Agents",
  navSettings: "Settings",
  navUnsaved: "Unsaved",
  documentation: "Documentation",
  loading: "Loading…",
  dismissMessage: "Dismiss message",
  cancel: "Cancel",
  close: "Close",
  copy: "Copy",
  copied: "Copied",
  copyFailed: "Copy failed",
  add: "Add",
  reset: "Reset",
  resetAll: "Reset all",
  repair: "Repair",
  save: "Save",
  discard: "Discard",
  savingStatus: "Saving…",
  saveFailed: "Save failed",
  reloadPage: "Reload the page.",
  unknownValue: "unknown",
  requestFailed: (status) => \`Request failed (status \${status}).\`,
  switchOn: "On",
  switchOff: "Off",
  stateOn: "on",
  stateOff: "off",
  stateDefault: "default",
  listSeparator: ", ",
  settingChange: (name, value) => \`\${name}: \${value}\`,
  dayUnit: (value) => value === 1 ? "day" : "days",
  dayCount: days,
  lastDays: (value) => \`last \${days(value)}\`,
  lastDaysOption: (value) => \`Last \${days(value)}\`,
  ruleCount: (value) => plural(value, "rule", "rules"),
  blockCount: (value) => plural(value, "block", "blocks"),
  pathCount: (value) => plural(value, "path", "paths"),
  justNow: "just now",
  today: "Today",
  yesterday: "Yesterday",
  overviewIntro: "What CC Safety Net has been doing on this machine.",
  needsAttention: "Needs attention",
  recentBlocks: "Recent blocks",
  allActivity: "All activity",
  topRules: "Most-triggered rules",
  statusRepair: "Your policy file needs repair",
  statusCheckingAgents: "Checking your agents…",
  statusNoAgent: "Not protecting any agent yet",
  statusPartlyProtected: "Partly protected",
  statusProtected: "Protected",
  commandProtectionIsOff: "Command protection is off",
  secretProtectionIsOff: "Secret protection is off",
  secretProtectionIsOn: "Secret protection on",
  presetFact: (preset, customized) => \`\${preset} preset\${customized ? ", customized" : ""}\`,
  commandRulesOn: (value) => \`\${count(value)} command rules on\`,
  hookActiveIn: (agents) => \`Hook active in \${agents}\`,
  agentCount: (value) => plural(value, "agent", "agents"),
  installHook: "Install a hook",
  configure: "Configure",
  review: "Review",
  fix: "Fix",
  releaseNotes: "Release notes",
  hookDisabledAttention: (agent) => \`\${agent} is detected but its hook is disabled.\`,
  suspectAttention: (blocks, window2) => \`\${plural(blocks, "block", "blocks")} in the last \${days(window2)} \${blocks === 1 ? "looks" : "look"} like a false positive.\`,
  guardErrorAttention: (errors, window2) => \`\${plural(errors, "guard error", "guard errors")} in the last \${days(window2)}: commands blocked because evaluation failed, not by policy.\`,
  updateAttention: (version) => \`Version \${version} is available.\`,
  tileBlocked: "Blocked",
  tileChecked: "Commands checked",
  perDayChart: (noun, values) => \`\${noun} per day, oldest to newest: \${values}\`,
  nothingBlocked: (window2) => \`Nothing was blocked in the last \${days(window2)}.\`,
  noCommandRecorded: "(no command recorded)",
  guardError: "guard error",
  noRuleBlocked: "No rule has blocked anything yet.",
  couldNotLoadActivity: (error) => \`Could not load activity: \${error}\`,
  starEvidence: (blocked, window2) => \`CC Safety Net has blocked <strong>\${count(blocked)}</strong> risky \${blocked === 1 ? "command" : "commands"} on this machine in the last \${days(window2)}.\`,
  starIfSaved: "If that saved your work, star the project on GitHub.",
  starIfUseful: "If CC Safety Net is useful to you, star it on GitHub.",
  starOnGitHub: "Star on GitHub",
  starButtonLabel: "Star CC Safety Net on GitHub",
  starLinkLabel: "Star CC Safety Net on GitHub (opens github.com)",
  starred: "Starred. Thank you.",
  starredLabel: "CC Safety Net starred on GitHub",
  activityIntro: "Commands your agents ran, newest first. Commands are secret-redacted when they are logged.",
  refreshActivity: "Refresh activity",
  decisionFilter: "Decision",
  searchActivity: "Search activity",
  searchActivityPlaceholder: "Search commands or rule IDs",
  agentFilter: "Agent",
  timeWindow: "Time window",
  loadingActivity: "Loading activity…",
  decisionBlocked: "Blocked",
  decisionAllowed: "Allowed",
  decisionError: "Error",
  filterErrors: "Errors",
  filterSuspect: "Likely false positive",
  filterAll: "All",
  allAgents: "All agents",
  showingBlocksOf: "Showing blocks of",
  showAllBlocks: "Show all blocks",
  noFilterMatch: "Nothing matches these filters.",
  showAllActivity: "Show all activity",
  noLogEntries: "No audit log entries match.",
  showingEntries: (shown, total, window2) => \`Showing \${count(shown)} of \${plural(total, "entry", "entries")} from the last \${days(window2)}.\`,
  activityTruncated: "Only the newest 500 entries of each decision are listed. Older entries still count toward the totals.",
  unreadableLogs: (files) => \`\${plural(files, "log file", "log files")} could not be read, so this list is incomplete.\`,
  detailFullCommand: "Full command",
  detailReason: "Reason",
  detailRule: "Rule",
  detailFolder: "Folder",
  detailTime: "Time",
  showCustomRule: "Show this custom rule",
  showProtection: "Show this protection",
  reportFalsePositive: "Report false positive",
  blockInFuture: "Block this in future",
  copyLogEntry: "Copy log entry",
  notAvailable: "Not available",
  reportTooLong: "Report too long to prefill",
  reportFieldCopied: (fields, fieldCount) => fieldCount === 1 ? \`The \${fields} was copied to your clipboard. Paste it into the form on GitHub.\` : \`The \${fields} were copied to your clipboard. Paste them into the form on GitHub.\`,
  reportFieldLeftOut: (fields, fieldCount) => \`The \${fields} \${fieldCount === 1 ? "was" : "were"} left out. Copy the log entry from Activity and paste it into the form on GitHub.\`,
  reportFieldJoiner: " and ",
  reportNameTitle: "title",
  reportNameExpected: "explanation",
  reportNameCommand: "command",
  reportNameEntry: "log entry",
  reportDialogTitle: "Report a false positive",
  reportDialogBody: "This opens a prefilled public GitHub issue form. Nothing is sent until you submit it there. Paths were replaced with <code>&lt;project&gt;</code> and <code>~</code>; edit anything else you would rather not publish.",
  reportWhy: "Why should it have been allowed? (optional)",
  reportWhyPlaceholder: "What was the agent trying to do, and what makes the command safe there?",
  reportTitleField: "Title",
  reportCommandField: "Blocked command",
  reportEntryField: "Audit log entry",
  openGitHubForm: "Open GitHub form",
  policyIntro: "Choose what CC Safety Net blocks. Changes apply after you save.",
  policyScope: "Policy you are editing",
  myPolicy: "My policy",
  projectPolicy: "Project policy",
  testCommand: "Test a command",
  editingProjectPolicy: "Editing the project policy",
  projectBarHelp: \`Only settings tagged <span class="project-chip">Project</span> are written. Everything else keeps following each person's own policy. Click a Project tag to stop setting that field.\`,
  changeFolder: "Change folder…",
  repairHelp: "Repair keeps every valid setting and rewrites the file. If the JSON cannot be read at all, defaults are restored.",
  safetyPreset: "Safety preset",
  safetyPresetSub: "Each preset includes everything in the one before it.",
  advancedSettings: "Advanced settings",
  advancedSettingsSub: "Individual checks and linked worktrees",
  searchProtections: "Search protections",
  searchProtectionsPlaceholder: "Type / to search by name, path or rule ID",
  protectionsShown: "Which protections to show",
  showChanged: "Changed from default",
  commandProtection: "Command protection",
  secretProtection: "Secret protection",
  pathsTitle: "Exceptions and extra paths",
  pathsSub: "Paths can be absolute or start with <code>~/</code>. Paste several lines to add many at once. Paths that cover your home directory are rejected.",
  allowPathsLabel: "Allow recursive deletes in",
  allowPathsHelp: "Recursive deletes inside these paths are not blocked, like a scratch folder under <code>/tmp</code>.",
  allowPathsPlaceholder: "/absolute/path or ~/path",
  denyPathsLabel: "Always block access to",
  denyPathsHelp: "These paths and everything inside them are blocked while secret protection is on.",
  denyPathsPlaceholder: "path/to/protect",
  secretAllowPathsLabel: "Paths exempt from secret patterns",
  secretAllowPathsHelp: "Files, folders, or one file name under a folder such as <code>~/code/**/.env.local</code>. Deny paths and coding agent credentials stay protected.",
  policyJson: "Policy JSON",
  rawReadOnly: "Read-only. Mirrors the settings above.",
  rawOnDisk: "The file as it is on disk.",
  rawProjectFields: (path) => \`Only the fields set by this project. Written to \${path}.\`,
  unsavedChanges: "Unsaved changes",
  unsavedChangeCount: (changes) => plural(changes, "unsaved change", "unsaved changes"),
  changeSeparator: "; ",
  moreChanges: (changes) => \`; and \${count(changes)} more\`,
  reviewAndApply: "Review and apply",
  presetStandard: "Standard",
  presetStandardDescription: "Blocks recognizable destructive commands and reading sensitive files. Recommended for normal coding.",
  presetStrict: "Strict",
  presetStrictDescription: "Also blocks commands it cannot fully parse and listing sensitive paths. Occasional false positives on advanced shell.",
  presetParanoid: "Paranoid",
  presetParanoidDescription: "Also blocks rm -rf inside your project and interpreter one-liners. Expect more false positives. Use it for untrusted agents or high-stakes repos.",
  capabilityFailClosed: "Fail closed",
  capabilityFailClosedDescription: "Block commands the parser cannot fully understand.",
  capabilityParanoidRm: "Paranoid rm -rf checks",
  capabilityParanoidRmDescription: "Block rm -rf inside the project, except temp paths.",
  capabilityParanoidInterpreters: "Paranoid interpreters",
  capabilityParanoidInterpretersDescription: "Block interpreter one-liners such as python -c.",
  presetLabel: "Preset",
  presetCustomized: (preset) => \`\${preset}, customized\`,
  fromPresetOption: (enabled) => \`From preset (\${enabled ? "on" : "off"})\`,
  fromPreset: "from preset",
  forcedOn: "forced on",
  forcedOff: "forced off",
  alwaysOn: "Always on",
  alwaysOff: "Always off",
  cannotTurnOff: "can't be turned off",
  worktreeDiscard: "Allow discarding local changes in linked git worktrees",
  worktreeDiscardHelp: "Only relaxes the discard checks inside linked worktrees.",
  worktreeChange: "Discarding changes in linked worktrees",
  allowed: "allowed",
  blocked: "blocked",
  allowPathsChange: "Allowed delete paths",
  denyPathsChange: "Always-blocked paths",
  secretAllowPathsChange: "Secret pattern exemptions",
  pathsAdded: (paths) => \`\${count(paths)} added\`,
  pathsRemoved: (paths) => \`\${count(paths)} removed\`,
  changedByYou: "Changed by you",
  forcedInAdvanced: (capability, enabled) => \`\${capability} forced \${enabled ? "on" : "off"} in Advanced\`,
  setByEnvironment: "Set by environment",
  setByEnvironmentVariable: (variable) => \`Set by environment: \${variable}\`,
  needsPreset: (preset) => \`Needs the \${preset} preset\`,
  offByDefault: "Off by default",
  offCount: (rules) => \`\${count(rules)} off\`,
  commandRuleSummary: (on, off, always) => \`\${count(on)} on · \${count(off)} off · \${count(always)} always on\`,
  commandProtectionOffSummary: "Off. Built-in rules are not enforced; catastrophic and custom rules still apply. Your rule settings are kept.",
  secretRuleSummary: (on, off) => \`\${count(on)} on · \${count(off)} off\`,
  secretProtectionOffSummary: "Off. Sensitive files and deny paths are not blocked. Your rule settings and paths are kept.",
  noCommandProtectionMatch: "No command protections match.",
  noSecretProtectionMatch: "No secret protections match.",
  aboutRule: (rule) => \`About \${rule}\`,
  protectedPaths: "Protected paths",
  protectedPathsFor: (rule) => \`Protected paths for \${rule}\`,
  toggleGroup: (group) => \`Turn all \${group} on or off\`,
  toggleAll: "Turn all on or off",
  secretCategoryBasename: "Sensitive file names",
  secretCategoryPattern: "Sensitive file name patterns",
  secretCategoryHomePath: "Sensitive home folders",
  secretCategoryVariant: "Key file name variants",
  secretCategoryExtension: "Sensitive file extensions",
  secretCategoryExtensionPattern: "Sensitive extension patterns",
  secretCategoryCredential: "Coding agent credentials",
  secretCategoryConfig: "Coding agent settings",
  inheritedChip: "Inherited",
  projectChip: "Project",
  projectChipTitle: "Set by this project. Click to stop setting it.",
  projectChipLabel: (field) => \`Set by project: \${field}. Activate to inherit again.\`,
  commandProtectionOffBanner: "Command protection is off: built-in destructive command rules are not enforced. Catastrophic and custom rules still apply.",
  secretProtectionOffBanner: "Secret protection is off: sensitive files and deny paths are not blocked.",
  fallbackConfigBanner: (reason) => \`A fallback configuration is being enforced: \${reason}\`,
  openProtections: "Open Protections",
  environmentRaises: (variables) => \`An environment variable raises protection beyond these settings: \${variables}\`,
  removePath: (path) => \`Remove \${path}\`,
  notAdded: (paths, error) => \`Not added: \${paths}. \${error}\`,
  alreadyListed: (paths) => \`Already listed: \${paths}\`,
  previewFailed: "Preview failed",
  couldNotTest: (error) => \`Could not test this command: \${error}\`,
  testerAllowed: "<strong>Allowed.</strong> No rule blocks this command.",
  createRuleToBlock: "Create a rule to block it",
  testerBlocked: (rule) => rule ? \`<strong>Blocked</strong> by \${rule}.\` : "<strong>Blocked</strong>.",
  blockedPart: "Blocked part:",
  testerHelp: "Checks a command against the Protections settings, including unsaved changes and custom rules. Nothing is run.",
  test: "Test",
  notCreatedYet: " (not created yet)",
  projectPolicyChanges: "The project policy changes these settings:",
  restoredDraft: "Restored your unsaved changes",
  couldNotLoadPolicy: "Could not load your policy",
  projectPolicyUnavailable: "Project policy unavailable",
  repairFirst: "Repair your policy first",
  repairBeforeProject: "Your own policy file must be repaired before you can edit a project policy.",
  policyNotLoaded: "Your policy has not loaded yet",
  discardUnsavedTitle: "Discard unsaved changes?",
  discardBeforeProject: "A project policy starts from your saved policy. Save your changes first, or discard them here.",
  discardChanges: "Discard changes",
  discardDraftTitle: "Discard this project draft?",
  discardDraft: "Discard draft",
  switchFolderDiscards: "Switching folders discards this draft.",
  folderPickerFailed: "Could not open the folder picker",
  projectChangesUnwritten: "Your project changes have not been written anywhere yet.",
  backToOwnPolicy: "Back to your own policy",
  discardDraftChangesTitle: "Discard changes to this draft?",
  discardDraftChangesBody: "The draft goes back to the settings this project already has.",
  changesDiscarded: "Changes discarded",
  projectDraftReloaded: "Project draft reloaded",
  projectFolderChanged: "The project folder changed",
  projectFolderChangedBody: "The draft was reloaded for the new folder. Review it again before applying.",
  invalidProjectFile: "The existing project policy file is invalid and will be replaced.",
  noEffectiveChange: "No change to the effective policy.",
  diffSetting: "Setting",
  diffNow: "Now",
  diffAfter: "After",
  unset: "(unset)",
  reviewFailed: "Review failed",
  reviewAgain: "Review again",
  draftChangedDuringReview: "The draft changed while the review was loading.",
  applyProjectTitle: "Apply this project policy?",
  applyProjectBody: "Everyone who works in this project gets these settings on top of their own policy.",
  applyProject: "Apply project policy",
  applyingStatus: "Applying…",
  applyFailed: "Apply failed",
  projectApplied: "Project policy applied",
  repairBeforeSaving: "Repair your policy before saving",
  policySaved: "Policy saved",
  discardUnsavedBody: "Every change since your last save will be undone.",
  discardingStatus: "Discarding…",
  repairTitle: "Repair your policy file?",
  repairBody: "Valid settings are kept and invalid ones are dropped. If the JSON cannot be read at all, defaults are restored.",
  repairingStatus: "Repairing…",
  repairFailed: "Repair failed",
  policyRepaired: "Policy repaired",
  nothingToReset: "Nothing to reset: every rule already uses its default",
  resetRulesTitle: "Reset every rule to its default?",
  resetRulesBody: (secret) => \`All \${secret ? "secret" : "command"} rules go back to the setting their preset gives them. You can still discard before saving.\`,
  resetRules: "Reset rules",
  turnOffSecretTitle: "Turn off secret protection?",
  turnOffCommandTitle: "Turn off command protection?",
  turnOffSecretBody: "Sensitive files, coding agent credentials, and deny paths stop being blocked until you turn this back on.",
  turnOffCommandBody: "Built-in destructive git, filesystem, and execution rules stop blocking commands until you turn this back on.",
  catastrophicStillApply: "Catastrophic and custom rules still apply.",
  turnOff: "Turn off",
  rulesIntro: "Your own blocking rules from rulebooks, enforced on top of the built-in protections.",
  refreshRules: "Refresh custom rules",
  problems: "Problems",
  problemsSub: "An error means a rulebook was skipped and none of its rules are enforced.",
  rulebooks: "Rulebooks",
  rulebooksSub: "Read-only. Rules are shown as they are enforced.",
  loadingRules: "Loading rules…",
  createRule: "Create a rule",
  createRuleSub: "Describe the rule and copy a ready-made prompt for your coding agent. CC Safety Net does not write rulebooks itself.",
  appliesTo: "Applies to",
  ruleScope: "Rule scope",
  thisProject: "This project",
  allProjects: "All projects",
  projectFolder: "Project folder",
  chooseFolder: "Choose…",
  projectFolderHint: "Where the rulebook is written. Defaults to the folder this GUI was started from.",
  ruleRequest: "What should be blocked?",
  ruleRequestPlaceholder: "Block terraform destroy in this project",
  ruleRequestHint: "Rules match a command, its subcommands, and exact arguments, not file paths or patterns.",
  tryExamples: "Try:",
  exampleSuggest: "Suggest rules",
  exampleSuggestRequest: "read my package.json and suggest blocking rules",
  exampleBlock: "Block a command",
  exampleBlockRequest: "set up rules to block all terraform destroy commands",
  exampleVerify: "Verify rules",
  exampleVerifyRequest: "verify my rules and fix any errors",
  copyPrompt: "Copy prompt",
  allRulebooksSkipped: "Every rulebook was skipped because of errors, so no custom rule is enforced. See Problems above.",
  noCustomRules: "No custom rules yet. Use <strong>Create a rule</strong> below, or run <code>npx -y cc-safety-net rule init</code>.",
  blocksWhenArgument: "Blocks when any of these arguments is present:",
  customRuleMissing: (rule) => \`\${rule} is not in any rulebook\`,
  couldNotLoadRules: (error) => \`Could not load rules: \${error}\`,
  folderPickerUnavailable: "The folder picker is not available",
  typeFolderInstead: (error) => \`\${error}. Type the project folder instead.\`,
  rulesNotLoaded: "Rules have not loaded yet",
  refreshAndRetry: "Click Refresh and try again.",
  describeRuleFirst: "Describe what should be blocked first",
  enterProjectFolder: "Enter the project folder the rule belongs to",
  promptCopied: "Prompt copied",
  pasteIntoAgent: "Paste it into your coding agent.",
  agentsIntro: "Install or remove the CC Safety Net hook for each coding agent on this machine.",
  refreshAgents: "Refresh agents",
  checkingAgents: "Checking agents…",
  hookInstalled: "Hook installed",
  hookDisabled: "Hook disabled",
  hookStatusUnknown: "Status unknown: its settings file could not be read",
  uninstalling: "Uninstalling…",
  installing: "Installing…",
  uninstall: "Uninstall",
  enable: "Enable",
  install: "Install",
  notDetected: "Not detected",
  installedAgents: "Installed",
  detectedAgents: "Detected on this machine",
  noHookYet: "No agent has the hook yet. Install it for each agent you use; until then its commands are not checked.",
  missingAgents: "Not detected on this machine",
  couldNotCheckAgents: (error) => \`Could not check agents: \${error}\`,
  installFailed: "Install failed",
  uninstallFailed: "Uninstall failed",
  settingsIntro: "Appearance, log retention, file locations, and maintenance.",
  appearance: "Appearance",
  theme: "Theme",
  themeAuto: "Auto",
  themeLight: "Light",
  themeDark: "Dark",
  preferenceHint: "Remembered on this computer.",
  language: "Language",
  preferenceSaveFailed: "Could not save this preference",
  auditLog: "Audit log",
  keepLogsFor: "Keep logs for",
  retentionNote: "Every checked command is logged. Lowering this deletes older entries, and Activity can only look back this far.",
  logFolder: "Log folder",
  copyLogFolder: "Copy the log folder path",
  files: "Files",
  policyFile: "Policy file",
  copyPolicyPath: "Copy the policy file path",
  copyProjectPolicyPath: "Copy the project policy path",
  about: "About",
  platform: "Platform",
  dangerZone: "Danger zone",
  resetPolicy: "Reset policy",
  resetPolicyHelp: "Replace your policy file with the defaults. This cannot be undone.",
  repairInProtectionsFirst: "Repair your policy file in Protections first.",
  leaveProjectDraftFirst: "Apply or leave your project policy draft first.",
  saveProtectionsFirst: "Save or discard your unsaved Protections changes first.",
  retentionRange: (min, max) => \`Enter a whole number of days from \${count(min)} to \${count(max)}.\`,
  retentionUnchanged: "Retention unchanged",
  shortenRetentionTitle: (window2) => \`Keep logs for only \${days(window2)}?\`,
  shortenRetentionBody: (window2) => \`Log entries older than \${days(window2)} are deleted on the next cleanup and cannot be recovered.\`,
  shortenRetention: "Shorten retention",
  retentionSaved: (window2) => \`Logs are now kept for \${days(window2)}\`,
  resetUnavailable: "Reset unavailable",
  resetPolicyTitle: "Reset your policy?",
  resetPolicyBody: "Your policy file is replaced with the defaults. Every customization is lost.",
  resettingStatus: "Resetting…",
  resetFailed: "Reset failed",
  policyReset: "Policy reset to the defaults"
};

// src/gui/frontend/locales/ja.ts
var count2 = (value) => value.toLocaleString("ja");
var days2 = (value) => \`\${count2(value)} 日間\`;
var ja = {
  navSections: "セクション",
  navOverview: "概要",
  navActivity: "アクティビティ",
  navProtections: "保護",
  navCustomRules: "カスタムルール",
  navAgents: "エージェント",
  navSettings: "設定",
  navUnsaved: "未保存",
  documentation: "ドキュメント",
  loading: "読み込み中…",
  dismissMessage: "メッセージを閉じる",
  cancel: "キャンセル",
  close: "閉じる",
  copy: "コピー",
  copied: "コピーしました",
  copyFailed: "コピーできませんでした",
  add: "追加",
  reset: "リセット",
  resetAll: "すべてリセット",
  repair: "修復",
  save: "保存",
  discard: "破棄",
  savingStatus: "保存中…",
  saveFailed: "保存できませんでした",
  reloadPage: "ページを再読み込みしてください。",
  unknownValue: "不明",
  requestFailed: (status) => \`リクエストに失敗しました（ステータス \${status}）。\`,
  switchOn: "オン",
  switchOff: "オフ",
  stateOn: "オン",
  stateOff: "オフ",
  stateDefault: "既定",
  listSeparator: "、",
  settingChange: (name, value) => \`\${name}：\${value}\`,
  dayUnit: () => "日",
  dayCount: days2,
  lastDays: (value) => \`過去 \${days2(value)}\`,
  lastDaysOption: (value) => \`過去 \${days2(value)}\`,
  ruleCount: (value) => \`\${count2(value)} 件のルール\`,
  blockCount: (value) => \`\${count2(value)} 件のブロック\`,
  pathCount: (value) => \`\${count2(value)} 件のパス\`,
  justNow: "たった今",
  today: "今日",
  yesterday: "昨日",
  overviewIntro: "このマシンでの CC Safety Net の動作状況です。",
  needsAttention: "要確認",
  recentBlocks: "最近のブロック",
  allActivity: "すべてのアクティビティ",
  topRules: "ブロックの多いルール",
  statusRepair: "ポリシーファイルの修復が必要です",
  statusCheckingAgents: "エージェントを確認中…",
  statusNoAgent: "まだどのエージェントも保護していません",
  statusPartlyProtected: "一部のみ保護されています",
  statusProtected: "保護されています",
  commandProtectionIsOff: "コマンド保護はオフです",
  secretProtectionIsOff: "シークレット保護はオフです",
  secretProtectionIsOn: "シークレット保護オン",
  presetFact: (preset, customized) => \`\${preset} プリセット\${customized ? "（カスタマイズ済み）" : ""}\`,
  commandRulesOn: (value) => \`コマンドルール \${count2(value)} 件がオン\`,
  hookActiveIn: (agents) => \`\${agents} でフックが有効\`,
  agentCount: (value) => \`\${count2(value)} 個のエージェント\`,
  installHook: "フックをインストール",
  configure: "設定する",
  review: "確認",
  fix: "修正",
  releaseNotes: "リリースノート",
  hookDisabledAttention: (agent) => \`\${agent} を検出しましたが、フックが無効です。\`,
  suspectAttention: (blocks, window2) => \`過去 \${days2(window2)}のブロックのうち \${count2(blocks)} 件は誤検知の可能性があります。\`,
  guardErrorAttention: (errors, window2) => \`過去 \${days2(window2)}にガードエラーが \${count2(errors)} 件ありました。ポリシーではなく、評価の失敗によってブロックされたコマンドです。\`,
  updateAttention: (version) => \`バージョン \${version} が利用可能です。\`,
  tileBlocked: "ブロック",
  tileChecked: "チェックしたコマンド",
  perDayChart: (noun, values) => \`1 日ごとの\${noun}（古い順）：\${values}\`,
  nothingBlocked: (window2) => \`過去 \${days2(window2)}にブロックされたものはありません。\`,
  noCommandRecorded: "（コマンドの記録なし）",
  guardError: "ガードエラー",
  noRuleBlocked: "まだどのルールもブロックしていません。",
  couldNotLoadActivity: (error) => \`アクティビティを読み込めませんでした：\${error}\`,
  starEvidence: (blocked, window2) => \`CC Safety Net は過去 \${days2(window2)}に、このマシンで危険なコマンドを <strong>\${count2(blocked)}</strong> 件ブロックしました。\`,
  starIfSaved: "これで作業が守られたなら、GitHub でスターをお願いします。",
  starIfUseful: "CC Safety Net が役に立ったら、GitHub でスターをお願いします。",
  starOnGitHub: "GitHub でスター",
  starButtonLabel: "GitHub で CC Safety Net にスターを付ける",
  starLinkLabel: "GitHub で CC Safety Net にスターを付ける（github.com を開きます）",
  starred: "スターを付けました。ありがとうございます。",
  starredLabel: "GitHub で CC Safety Net にスター済み",
  activityIntro: "エージェントが実行したコマンドを新しい順に表示します。コマンド内のシークレットは、ログに記録する時点でマスクします。",
  refreshActivity: "アクティビティを更新",
  decisionFilter: "判定",
  searchActivity: "アクティビティを検索",
  searchActivityPlaceholder: "コマンドまたはルール ID で検索",
  agentFilter: "エージェント",
  timeWindow: "期間",
  loadingActivity: "アクティビティを読み込み中…",
  decisionBlocked: "ブロック",
  decisionAllowed: "許可",
  decisionError: "エラー",
  filterErrors: "エラー",
  filterSuspect: "誤検知の可能性",
  filterAll: "すべて",
  allAgents: "すべてのエージェント",
  showingBlocksOf: "次のコマンドのブロックを表示中：",
  showAllBlocks: "すべてのブロックを表示",
  noFilterMatch: "この絞り込み条件に一致する項目はありません。",
  showAllActivity: "すべてのアクティビティを表示",
  noLogEntries: "一致する監査ログのエントリはありません。",
  showingEntries: (shown, total, window2) => \`過去 \${days2(window2)}の \${count2(total)} 件中 \${count2(shown)} 件を表示しています。\`,
  activityTruncated: "判定ごとに新しいほうから 500 件だけを表示します。それより古いエントリも合計には含まれます。",
  unreadableLogs: (files) => \`\${count2(files)} 件のログファイルを読み込めなかったため、この一覧は不完全です。\`,
  detailFullCommand: "コマンド全体",
  detailReason: "理由",
  detailRule: "ルール",
  detailFolder: "フォルダー",
  detailTime: "日時",
  showCustomRule: "このカスタムルールを表示",
  showProtection: "この保護を表示",
  reportFalsePositive: "誤検知を報告",
  blockInFuture: "今後はブロックする",
  copyLogEntry: "ログエントリをコピー",
  notAvailable: "利用できません",
  reportTooLong: "報告が長すぎて事前入力できません",
  reportFieldCopied: (fields) => \`\${fields}をクリップボードにコピーしました。GitHub のフォームに貼り付けてください。\`,
  reportFieldLeftOut: (fields) => \`\${fields}は含めていません。アクティビティからログエントリをコピーし、GitHub のフォームに貼り付けてください。\`,
  reportFieldJoiner: "と",
  reportNameTitle: "タイトル",
  reportNameExpected: "説明",
  reportNameCommand: "コマンド",
  reportNameEntry: "ログエントリ",
  reportDialogTitle: "誤検知を報告",
  reportDialogBody: "入力済みの公開 GitHub Issue フォームを開きます。そこで送信するまで何も送信されません。パスは <code>&lt;project&gt;</code> と <code>~</code> に置き換えてあります。それ以外に公開したくない内容があれば編集してください。",
  reportWhy: "許可されるべきだった理由（任意）",
  reportWhyPlaceholder: "エージェントは何をしようとしていて、なぜその場面ではこのコマンドが安全なのですか？",
  reportTitleField: "タイトル",
  reportCommandField: "ブロックされたコマンド",
  reportEntryField: "監査ログのエントリ",
  openGitHubForm: "GitHub のフォームを開く",
  policyIntro: "CC Safety Net がブロックする対象を選びます。変更は保存後に反映されます。",
  policyScope: "編集中のポリシー",
  myPolicy: "自分のポリシー",
  projectPolicy: "プロジェクトポリシー",
  testCommand: "コマンドをテスト",
  editingProjectPolicy: "プロジェクトポリシーを編集中",
  projectBarHelp: '<span class="project-chip">プロジェクト</span> タグの付いた設定だけが書き込まれます。それ以外の設定は引き続き各自のポリシーに従います。プロジェクトタグをクリックすると、その項目の設定を解除します。',
  changeFolder: "フォルダーを変更…",
  repairHelp: "修復すると、有効な設定をすべて残してファイルを書き直します。JSON をまったく読み取れない場合は既定値に戻します。",
  safetyPreset: "安全プリセット",
  safetyPresetSub: "各プリセットは、1 つ前のプリセットの内容をすべて含みます。",
  advancedSettings: "詳細設定",
  advancedSettingsSub: "個別のチェックとリンクされたワークツリー",
  searchProtections: "保護を検索",
  searchProtectionsPlaceholder: "/ キーで名前・パス・ルール ID を検索",
  protectionsShown: "表示する保護",
  showChanged: "既定から変更",
  commandProtection: "コマンド保護",
  secretProtection: "シークレット保護",
  pathsTitle: "例外と追加のパス",
  pathsSub: "パスは絶対パスか <code>~/</code> で始まるパスで指定します。複数行を貼り付けるとまとめて追加できます。ホームディレクトリ全体を含むパスは受け付けません。",
  allowPathsLabel: "再帰削除を許可する場所",
  allowPathsHelp: "これらのパス内での再帰削除はブロックしません。<code>/tmp</code> 以下の作業用フォルダーなどに使います。",
  allowPathsPlaceholder: "/absolute/path または ~/path",
  denyPathsLabel: "常にアクセスをブロックする場所",
  denyPathsHelp: "シークレット保護がオンの間は、これらのパスとその配下をすべてブロックします。",
  denyPathsPlaceholder: "path/to/protect",
  secretAllowPathsLabel: "シークレットパターンの対象外とするパス",
  secretAllowPathsHelp: "ファイル、フォルダー、または <code>~/code/**/.env.local</code> のようなフォルダー配下のファイル名を指定します。拒否パスとコーディングエージェントの資格情報は引き続き保護されます。",
  policyJson: "ポリシー JSON",
  rawReadOnly: "読み取り専用。上の設定を反映しています。",
  rawOnDisk: "ディスク上のファイルそのままです。",
  rawProjectFields: (path) => \`このプロジェクトが設定する項目だけです。\${path} に書き込みます。\`,
  unsavedChanges: "未保存の変更",
  unsavedChangeCount: (changes) => \`\${count2(changes)} 件の未保存の変更\`,
  changeSeparator: "／",
  moreChanges: (changes) => \`／ほか \${count2(changes)} 件\`,
  reviewAndApply: "確認して適用",
  presetStandard: "Standard",
  presetStandardDescription: "認識できる破壊的コマンドと機密ファイルの読み取りをブロックします。通常の開発におすすめです。",
  presetStrict: "Strict",
  presetStrictDescription: "完全には解析できないコマンドと機密パスの一覧表示もブロックします。高度なシェル操作でときどき誤検知があります。",
  presetParanoid: "Paranoid",
  presetParanoidDescription: "プロジェクト内の rm -rf とインタープリターの 1 行コードもブロックします。誤検知が増えるため、信頼できないエージェントや重要なリポジトリに使ってください。",
  capabilityFailClosed: "フェイルクローズ",
  capabilityFailClosedDescription: "パーサーが完全に理解できないコマンドをブロックします。",
  capabilityParanoidRm: "rm -rf の Paranoid チェック",
  capabilityParanoidRmDescription: "一時パスを除き、プロジェクト内の rm -rf をブロックします。",
  capabilityParanoidInterpreters: "インタープリターの Paranoid チェック",
  capabilityParanoidInterpretersDescription: "python -c などのインタープリターの 1 行コードをブロックします。",
  presetLabel: "安全プリセット",
  presetCustomized: (preset) => \`\${preset}（カスタマイズ済み）\`,
  fromPresetOption: (enabled) => \`プリセットに従う（\${enabled ? "オン" : "オフ"}）\`,
  fromPreset: "プリセットに従う",
  forcedOn: "常にオン",
  forcedOff: "常にオフ",
  alwaysOn: "常にオン",
  alwaysOff: "常にオフ",
  cannotTurnOff: "オフにできません",
  worktreeDiscard: "リンクされた Git ワークツリーでのローカル変更の破棄を許可",
  worktreeDiscardHelp: "リンクされたワークツリー内の破棄チェックだけを緩和します。",
  worktreeChange: "リンクされたワークツリーでの変更の破棄",
  allowed: "許可",
  blocked: "ブロック",
  allowPathsChange: "削除を許可するパス",
  denyPathsChange: "常にブロックするパス",
  secretAllowPathsChange: "シークレットパターンの対象外",
  pathsAdded: (paths) => \`\${count2(paths)} 件追加\`,
  pathsRemoved: (paths) => \`\${count2(paths)} 件削除\`,
  changedByYou: "自分で変更",
  forcedInAdvanced: (capability, enabled) => \`詳細設定で「\${capability}」を常に\${enabled ? "オン" : "オフ"}\`,
  setByEnvironment: "環境変数で設定",
  setByEnvironmentVariable: (variable) => \`環境変数で設定：\${variable}\`,
  needsPreset: (preset) => \`\${preset} プリセットが必要\`,
  offByDefault: "既定でオフ",
  offCount: (rules) => \`\${count2(rules)} 件オフ\`,
  commandRuleSummary: (on, off, always) => \`オン \${count2(on)} 件 · オフ \${count2(off)} 件 · 常にオン \${count2(always)} 件\`,
  commandProtectionOffSummary: "オフ。組み込みルールは適用されません。致命的な操作に対するルールとカスタムルールは引き続き適用されます。ルールの設定は保持されます。",
  secretRuleSummary: (on, off) => \`オン \${count2(on)} 件 · オフ \${count2(off)} 件\`,
  secretProtectionOffSummary: "オフ。機密ファイルと拒否パスはブロックされません。ルールの設定とパスは保持されます。",
  noCommandProtectionMatch: "一致するコマンド保護はありません。",
  noSecretProtectionMatch: "一致するシークレット保護はありません。",
  aboutRule: (rule) => \`\${rule} について\`,
  protectedPaths: "保護されるパス",
  protectedPathsFor: (rule) => \`\${rule} で保護されるパス\`,
  toggleGroup: (group) => \`\${group}をすべてオンまたはオフにする\`,
  toggleAll: "すべてオンまたはオフにする",
  secretCategoryBasename: "機密ファイル名",
  secretCategoryPattern: "機密ファイル名のパターン",
  secretCategoryHomePath: "ホーム内の機密フォルダー",
  secretCategoryVariant: "鍵ファイル名のバリエーション",
  secretCategoryExtension: "機密ファイルの拡張子",
  secretCategoryExtensionPattern: "機密ファイルの拡張子パターン",
  secretCategoryCredential: "コーディングエージェントの資格情報",
  secretCategoryConfig: "コーディングエージェントの設定",
  inheritedChip: "継承",
  projectChip: "プロジェクト",
  projectChipTitle: "このプロジェクトで設定中。クリックすると設定を解除します。",
  projectChipLabel: (field) => \`プロジェクトで設定中：\${field}。選択すると継承に戻ります。\`,
  commandProtectionOffBanner: "コマンド保護はオフです。組み込みの破壊的コマンドのルールは適用されません。致命的な操作に対するルールとカスタムルールは引き続き適用されます。",
  secretProtectionOffBanner: "シークレット保護はオフです。機密ファイルと拒否パスはブロックされません。",
  fallbackConfigBanner: (reason) => \`フォールバックの設定を適用しています：\${reason}\`,
  openProtections: "保護を開く",
  environmentRaises: (variables) => \`環境変数により、これらの設定以上に保護が強化されています：\${variables}\`,
  removePath: (path) => \`\${path} を削除\`,
  notAdded: (paths, error) => \`追加しませんでした：\${paths}。\${error}\`,
  alreadyListed: (paths) => \`すでに登録済み：\${paths}\`,
  previewFailed: "プレビューできませんでした",
  couldNotTest: (error) => \`このコマンドをテストできませんでした：\${error}\`,
  testerAllowed: "<strong>許可。</strong>このコマンドをブロックするルールはありません。",
  createRuleToBlock: "ブロックするルールを作成",
  testerBlocked: (rule) => rule ? \`<strong>ブロック</strong>（\${rule}）。\` : "<strong>ブロック</strong>。",
  blockedPart: "ブロックされた部分：",
  testerHelp: "未保存の変更とカスタムルールを含め、保護の設定に照らしてコマンドをチェックします。何も実行しません。",
  test: "テスト",
  notCreatedYet: "（未作成）",
  projectPolicyChanges: "プロジェクトポリシーにより、次の設定が変わります：",
  restoredDraft: "未保存の変更を復元しました",
  couldNotLoadPolicy: "ポリシーを読み込めませんでした",
  projectPolicyUnavailable: "プロジェクトポリシーを利用できません",
  repairFirst: "先にポリシーを修復してください",
  repairBeforeProject: "プロジェクトポリシーを編集する前に、自分のポリシーファイルを修復する必要があります。",
  policyNotLoaded: "ポリシーがまだ読み込まれていません",
  discardUnsavedTitle: "未保存の変更を破棄しますか？",
  discardBeforeProject: "プロジェクトポリシーは保存済みのポリシーから始まります。先に変更を保存するか、ここで破棄してください。",
  discardChanges: "変更を破棄",
  discardDraftTitle: "このプロジェクトの下書きを破棄しますか？",
  discardDraft: "下書きを破棄",
  switchFolderDiscards: "フォルダーを切り替えると、この下書きは破棄されます。",
  folderPickerFailed: "フォルダー選択を開けませんでした",
  projectChangesUnwritten: "プロジェクトの変更はまだどこにも書き込まれていません。",
  backToOwnPolicy: "自分のポリシーに戻りました",
  discardDraftChangesTitle: "この下書きへの変更を破棄しますか？",
  discardDraftChangesBody: "下書きを、このプロジェクトの現在の設定に戻します。",
  changesDiscarded: "変更を破棄しました",
  projectDraftReloaded: "プロジェクトの下書きを再読み込みしました",
  projectFolderChanged: "プロジェクトフォルダーが変わりました",
  projectFolderChangedBody: "新しいフォルダー用に下書きを再読み込みしました。適用する前にもう一度確認してください。",
  invalidProjectFile: "既存のプロジェクトポリシーファイルは無効なため、置き換えられます。",
  noEffectiveChange: "実効ポリシーに変更はありません。",
  diffSetting: "設定",
  diffNow: "現在",
  diffAfter: "適用後",
  unset: "（未設定）",
  reviewFailed: "確認できませんでした",
  reviewAgain: "もう一度確認してください",
  draftChangedDuringReview: "確認内容の読み込み中に下書きが変更されました。",
  applyProjectTitle: "このプロジェクトポリシーを適用しますか？",
  applyProjectBody: "このプロジェクトで作業する全員に、各自のポリシーに加えてこれらの設定が適用されます。",
  applyProject: "プロジェクトポリシーを適用",
  applyingStatus: "適用中…",
  applyFailed: "適用できませんでした",
  projectApplied: "プロジェクトポリシーを適用しました",
  repairBeforeSaving: "保存する前にポリシーを修復してください",
  policySaved: "ポリシーを保存しました",
  discardUnsavedBody: "最後に保存してからの変更はすべて元に戻ります。",
  discardingStatus: "破棄中…",
  repairTitle: "ポリシーファイルを修復しますか？",
  repairBody: "有効な設定は残し、無効な設定は取り除きます。JSON をまったく読み取れない場合は既定値に戻します。",
  repairingStatus: "修復中…",
  repairFailed: "修復できませんでした",
  policyRepaired: "ポリシーを修復しました",
  nothingToReset: "リセットするものはありません。すべてのルールが既定のままです",
  resetRulesTitle: "すべてのルールを既定に戻しますか？",
  resetRulesBody: (secret) => \`すべての\${secret ? "シークレット" : "コマンド"}ルールがプリセットの設定に戻ります。保存する前なら破棄できます。\`,
  resetRules: "ルールをリセット",
  turnOffSecretTitle: "シークレット保護をオフにしますか？",
  turnOffCommandTitle: "コマンド保護をオフにしますか？",
  turnOffSecretBody: "オンに戻すまで、機密ファイル、コーディングエージェントの資格情報、拒否パスはブロックされなくなります。",
  turnOffCommandBody: "オンに戻すまで、git、ファイルシステム、実行に関する組み込みの破壊的コマンドのルールはコマンドをブロックしなくなります。",
  catastrophicStillApply: "致命的な操作に対するルールとカスタムルールは引き続き適用されます。",
  turnOff: "オフにする",
  rulesIntro: "ルールブックで定義した独自のブロックルールです。組み込みの保護に加えて適用されます。",
  refreshRules: "カスタムルールを更新",
  problems: "問題",
  problemsSub: "エラーのあるルールブックはスキップされ、そのルールは 1 つも適用されません。",
  rulebooks: "ルールブック一覧",
  rulebooksSub: "読み取り専用です。実際に適用される状態でルールを表示します。",
  loadingRules: "ルールを読み込み中…",
  createRule: "ルールを作成",
  createRuleSub: "ルールを説明すると、コーディングエージェント向けのプロンプトをコピーできます。CC Safety Net 自体はルールブックを書きません。",
  appliesTo: "適用範囲",
  ruleScope: "ルールの範囲",
  thisProject: "このプロジェクト",
  allProjects: "すべてのプロジェクト",
  projectFolder: "プロジェクトフォルダー",
  chooseFolder: "選択…",
  projectFolderHint: "ルールブックの書き込み先です。既定ではこの GUI を起動したフォルダーです。",
  ruleRequest: "何をブロックしますか？",
  ruleRequestPlaceholder: "このプロジェクトで terraform destroy をブロック",
  ruleRequestHint: "ルールが照合するのは、コマンド、そのサブコマンド、完全一致の引数です。ファイルパスやパターンは照合しません。",
  tryExamples: "例：",
  exampleSuggest: "ルールを提案",
  exampleSuggestRequest: "package.json を読んで、ブロックすべきルールを提案して",
  exampleBlock: "コマンドをブロック",
  exampleBlockRequest: "terraform destroy コマンドをすべてブロックするルールを設定して",
  exampleVerify: "ルールを検証",
  exampleVerifyRequest: "ルールを検証して、エラーがあれば修正して",
  copyPrompt: "プロンプトをコピー",
  allRulebooksSkipped: "すべてのルールブックがエラーでスキップされたため、カスタムルールは適用されていません。上の「問題」を確認してください。",
  noCustomRules: "カスタムルールはまだありません。下の<strong>ルールを作成</strong>を使うか、<code>npx -y cc-safety-net rule init</code> を実行してください。",
  blocksWhenArgument: "次の引数のいずれかがあるとブロックします：",
  customRuleMissing: (rule) => \`\${rule} はどのルールブックにもありません\`,
  couldNotLoadRules: (error) => \`ルールを読み込めませんでした：\${error}\`,
  folderPickerUnavailable: "フォルダー選択を利用できません",
  typeFolderInstead: (error) => \`\${error}。代わりにプロジェクトフォルダーを入力してください。\`,
  rulesNotLoaded: "ルールがまだ読み込まれていません",
  refreshAndRetry: "更新してからもう一度お試しください。",
  describeRuleFirst: "先にブロックする内容を説明してください",
  enterProjectFolder: "ルールを置くプロジェクトフォルダーを入力してください",
  promptCopied: "プロンプトをコピーしました",
  pasteIntoAgent: "コーディングエージェントに貼り付けてください。",
  agentsIntro: "このマシンの各コーディングエージェントに、CC Safety Net のフックをインストールまたは削除します。",
  refreshAgents: "エージェントを更新",
  checkingAgents: "エージェントを確認中…",
  hookInstalled: "フックをインストール済み",
  hookDisabled: "フック無効",
  hookStatusUnknown: "状態不明。設定ファイルを読み取れませんでした",
  uninstalling: "アンインストール中…",
  installing: "インストール中…",
  uninstall: "アンインストール",
  enable: "有効にする",
  install: "インストール",
  notDetected: "未検出",
  installedAgents: "インストール済み",
  detectedAgents: "このマシンで検出",
  noHookYet: "まだどのエージェントにもフックがありません。使うエージェントごとにインストールしてください。インストールするまで、そのエージェントのコマンドはチェックされません。",
  missingAgents: "このマシンで未検出",
  couldNotCheckAgents: (error) => \`エージェントを確認できませんでした：\${error}\`,
  installFailed: "インストールできませんでした",
  uninstallFailed: "アンインストールできませんでした",
  settingsIntro: "外観、ログの保持期間、ファイルの場所、メンテナンス。",
  appearance: "外観",
  theme: "テーマ",
  themeAuto: "自動",
  themeLight: "ライト",
  themeDark: "ダーク",
  preferenceHint: "このコンピューターに保存されます。",
  language: "言語",
  preferenceSaveFailed: "この設定を保存できませんでした",
  auditLog: "監査ログ",
  keepLogsFor: "ログの保持期間",
  retentionNote: "チェックしたコマンドはすべて記録されます。短くすると古いエントリが削除され、アクティビティもこの期間までしか遡れません。",
  logFolder: "ログフォルダー",
  copyLogFolder: "ログフォルダーのパスをコピー",
  files: "ファイル",
  policyFile: "ポリシーファイル",
  copyPolicyPath: "ポリシーファイルのパスをコピー",
  copyProjectPolicyPath: "プロジェクトポリシーのパスをコピー",
  about: "このアプリについて",
  platform: "プラットフォーム",
  dangerZone: "危険な操作",
  resetPolicy: "ポリシーをリセット",
  resetPolicyHelp: "ポリシーファイルを既定値に置き換えます。元に戻せません。",
  repairInProtectionsFirst: "先に「保護」でポリシーファイルを修復してください。",
  leaveProjectDraftFirst: "先にプロジェクトポリシーの下書きを適用するか、終了してください。",
  saveProtectionsFirst: "先に「保護」の未保存の変更を保存するか、破棄してください。",
  retentionRange: (min, max) => \`\${count2(min)}〜\${count2(max)} の整数で日数を入力してください。\`,
  retentionUnchanged: "保持期間は変更されていません",
  shortenRetentionTitle: (window2) => \`ログの保持期間を \${days2(window2)}に短縮しますか？\`,
  shortenRetentionBody: (window2) => \`\${days2(window2)}より古いログエントリは次回のクリーンアップで削除され、復元できません。\`,
  shortenRetention: "保持期間を短縮",
  retentionSaved: (window2) => \`ログの保持期間を \${days2(window2)}にしました\`,
  resetUnavailable: "リセットできません",
  resetPolicyTitle: "ポリシーをリセットしますか？",
  resetPolicyBody: "ポリシーファイルが既定値に置き換わり、カスタマイズはすべて失われます。",
  resettingStatus: "リセット中…",
  resetFailed: "リセットできませんでした",
  policyReset: "ポリシーを既定値にリセットしました"
};

// src/gui/frontend/locales/zh-CN.ts
var count3 = (value) => value.toLocaleString("zh-CN");
var days3 = (value) => \`\${count3(value)} 天\`;
var zhCN = {
  navSections: "视图",
  navOverview: "概览",
  navActivity: "活动",
  navProtections: "保护",
  navCustomRules: "自定义规则",
  navAgents: "智能体",
  navSettings: "设置",
  navUnsaved: "未保存",
  documentation: "文档",
  loading: "加载中…",
  dismissMessage: "关闭消息",
  cancel: "取消",
  close: "关闭",
  copy: "复制",
  copied: "已复制",
  copyFailed: "复制失败",
  add: "添加",
  reset: "重置",
  resetAll: "全部重置",
  repair: "修复",
  save: "保存",
  discard: "丢弃",
  savingStatus: "保存中…",
  saveFailed: "保存失败",
  reloadPage: "请重新加载页面。",
  unknownValue: "未知",
  requestFailed: (status) => \`请求失败（状态码 \${status}）。\`,
  switchOn: "开",
  switchOff: "关",
  stateOn: "开启",
  stateOff: "关闭",
  stateDefault: "默认",
  listSeparator: "、",
  settingChange: (name, value) => \`\${name}：\${value}\`,
  dayUnit: () => "天",
  dayCount: days3,
  lastDays: (value) => \`最近 \${days3(value)}\`,
  lastDaysOption: (value) => \`最近 \${days3(value)}\`,
  ruleCount: (value) => \`\${count3(value)} 条规则\`,
  blockCount: (value) => \`\${count3(value)} 次阻止\`,
  pathCount: (value) => \`\${count3(value)} 个路径\`,
  justNow: "刚刚",
  today: "今天",
  yesterday: "昨天",
  overviewIntro: "CC Safety Net 在本机上的运行情况。",
  needsAttention: "需要处理",
  recentBlocks: "最近阻止",
  allActivity: "全部活动",
  topRules: "触发最多的规则",
  statusRepair: "策略文件需要修复",
  statusCheckingAgents: "正在检查智能体…",
  statusNoAgent: "尚未保护任何智能体",
  statusPartlyProtected: "部分受保护",
  statusProtected: "已受保护",
  commandProtectionIsOff: "命令保护已关闭",
  secretProtectionIsOff: "机密保护已关闭",
  secretProtectionIsOn: "机密保护已开启",
  presetFact: (preset, customized) => \`\${preset} 预设\${customized ? "（已自定义）" : ""}\`,
  commandRulesOn: (value) => \`已开启 \${count3(value)} 条命令规则\`,
  hookActiveIn: (agents) => \`已在 \${agents} 中启用 hook\`,
  agentCount: (value) => \`\${count3(value)} 个智能体\`,
  installHook: "安装 hook",
  configure: "配置",
  review: "查看",
  fix: "修复",
  releaseNotes: "发布说明",
  hookDisabledAttention: (agent) => \`已检测到 \${agent}，但其 hook 已禁用。\`,
  suspectAttention: (blocks, window2) => \`最近 \${days3(window2)}内有 \${count3(blocks)} 次阻止疑似误报。\`,
  guardErrorAttention: (errors, window2) => \`最近 \${days3(window2)}内有 \${count3(errors)} 个防护错误。这些命令因评估失败被阻止，不是被策略阻止。\`,
  updateAttention: (version) => \`\${version} 版本已发布。\`,
  tileBlocked: "已阻止",
  tileChecked: "已检查命令",
  perDayChart: (noun, values) => \`\${noun}（每日，从旧到新）：\${values}\`,
  nothingBlocked: (window2) => \`最近 \${days3(window2)}内没有阻止记录。\`,
  noCommandRecorded: "（未记录命令）",
  guardError: "防护错误",
  noRuleBlocked: "还没有规则触发过阻止。",
  couldNotLoadActivity: (error) => \`无法加载活动：\${error}\`,
  starEvidence: (blocked, window2) => \`最近 \${days3(window2)}内，CC Safety Net 在本机上阻止了 <strong>\${count3(blocked)}</strong> 条危险命令。\`,
  starIfSaved: "如果这帮你保住了工作，欢迎在 GitHub 上为项目加星。",
  starIfUseful: "如果 CC Safety Net 对你有用，欢迎在 GitHub 上加星。",
  starOnGitHub: "在 GitHub 上加星",
  starButtonLabel: "在 GitHub 上为 CC Safety Net 加星",
  starLinkLabel: "在 GitHub 上为 CC Safety Net 加星（打开 github.com）",
  starred: "已加星，谢谢。",
  starredLabel: "已在 GitHub 上为 CC Safety Net 加星",
  activityIntro: "智能体运行过的命令，最新的在前。命令写入日志前会做机密脱敏。",
  refreshActivity: "刷新活动",
  decisionFilter: "判定",
  searchActivity: "搜索活动",
  searchActivityPlaceholder: "搜索命令或规则 ID",
  agentFilter: "智能体",
  timeWindow: "时间窗口",
  loadingActivity: "正在加载活动…",
  decisionBlocked: "已阻止",
  decisionAllowed: "已允许",
  decisionError: "错误",
  filterErrors: "错误",
  filterSuspect: "疑似误报",
  filterAll: "全部",
  allAgents: "全部智能体",
  showingBlocksOf: "只显示此命令的阻止记录：",
  showAllBlocks: "显示全部阻止记录",
  noFilterMatch: "没有符合过滤条件的记录。",
  showAllActivity: "显示全部活动",
  noLogEntries: "没有匹配的审计日志条目。",
  showingEntries: (shown, total, window2) => \`显示最近 \${days3(window2)}内 \${count3(total)} 个条目中的 \${count3(shown)} 个。\`,
  activityTruncated: "每种判定只列出最新的 500 个条目。更早的条目仍计入总数。",
  unreadableLogs: (files) => \`有 \${count3(files)} 个日志文件无法读取，此列表不完整。\`,
  detailFullCommand: "完整命令",
  detailReason: "原因",
  detailRule: "规则",
  detailFolder: "目录",
  detailTime: "时间",
  showCustomRule: "查看此自定义规则",
  showProtection: "查看此项保护",
  reportFalsePositive: "报告误报",
  blockInFuture: "以后阻止此命令",
  copyLogEntry: "复制日志条目",
  notAvailable: "不可用",
  reportTooLong: "报告过长，无法预填",
  reportFieldCopied: (fields) => \`\${fields}已复制到剪贴板。请粘贴到 GitHub 上的表单中。\`,
  reportFieldLeftOut: (fields) => \`\${fields}已省略。请在活动视图中复制日志条目，粘贴到 GitHub 上的表单中。\`,
  reportFieldJoiner: "和",
  reportNameTitle: "标题",
  reportNameExpected: "说明",
  reportNameCommand: "命令",
  reportNameEntry: "日志条目",
  reportDialogTitle: "报告误报",
  reportDialogBody: "这会打开一个预填好的公开 GitHub issue 表单。在那里提交之前，不会发送任何内容。路径已替换为 <code>&lt;project&gt;</code> 和 <code>~</code>。其他不想公开的内容请自行修改。",
  reportWhy: "为什么应该允许？（可选）",
  reportWhyPlaceholder: "智能体当时想做什么？为什么这条命令在那里是安全的？",
  reportTitleField: "标题",
  reportCommandField: "被阻止的命令",
  reportEntryField: "审计日志条目",
  openGitHubForm: "打开 GitHub 表单",
  policyIntro: "选择 CC Safety Net 要阻止的内容。保存后生效。",
  policyScope: "正在编辑的策略",
  myPolicy: "我的策略",
  projectPolicy: "项目策略",
  testCommand: "测试命令",
  editingProjectPolicy: "正在编辑项目策略",
  projectBarHelp: '只写入标记为 <span class="project-chip">项目</span> 的设置。其余设置仍遵循每个人自己的策略。点击“项目”标记可取消设置该字段。',
  changeFolder: "更改目录…",
  repairHelp: "修复会保留所有有效设置并重写文件。如果 JSON 完全无法读取，则恢复默认值。",
  safetyPreset: "安全预设",
  safetyPresetSub: "每个预设都包含前一个预设的全部内容。",
  advancedSettings: "高级设置",
  advancedSettingsSub: "单项检查和 linked worktree",
  searchProtections: "搜索保护",
  searchProtectionsPlaceholder: "按 / 搜索名称、路径或规则 ID",
  protectionsShown: "要显示的保护",
  showChanged: "与默认值不同",
  commandProtection: "命令保护",
  secretProtection: "机密保护",
  pathsTitle: "例外和额外路径",
  pathsSub: "路径可以是绝对路径，也可以以 <code>~/</code> 开头。粘贴多行可一次添加多个。覆盖主目录的路径会被拒绝。",
  allowPathsLabel: "允许递归删除的路径",
  allowPathsHelp: "这些路径内的递归删除不会被阻止，例如 <code>/tmp</code> 下的临时目录。",
  allowPathsPlaceholder: "/absolute/path 或 ~/path",
  denyPathsLabel: "始终阻止访问的路径",
  denyPathsHelp: "机密保护开启时，这些路径及其下的所有内容都会被阻止。",
  denyPathsPlaceholder: "path/to/protect",
  secretAllowPathsLabel: "不受机密模式约束的路径",
  secretAllowPathsHelp: "文件、目录，或某个目录下的单个文件名，例如 <code>~/code/**/.env.local</code>。拒绝路径和编码智能体凭证的保护仍然生效。",
  policyJson: "策略 JSON",
  rawReadOnly: "只读，与上方设置保持一致。",
  rawOnDisk: "磁盘上的原始文件内容。",
  rawProjectFields: (path) => \`只包含此项目设置的字段，写入 \${path}。\`,
  unsavedChanges: "未保存的更改",
  unsavedChangeCount: (changes) => \`\${count3(changes)} 项未保存的更改\`,
  changeSeparator: "；",
  moreChanges: (changes) => \`；另有 \${count3(changes)} 项\`,
  reviewAndApply: "复核并应用",
  presetStandard: "Standard",
  presetStandardDescription: "阻止可识别的破坏性命令和对敏感文件的读取。推荐日常开发使用。",
  presetStrict: "Strict",
  presetStrictDescription: "还会阻止无法完全解析的命令和列出敏感路径的操作。复杂的 shell 写法偶尔会误报。",
  presetParanoid: "Paranoid",
  presetParanoidDescription: "还会阻止项目内的 rm -rf 和解释器单行命令。误报会更多，适合不受信任的智能体或高风险仓库。",
  capabilityFailClosed: "Fail closed",
  capabilityFailClosedDescription: "阻止解析器无法完全理解的命令。",
  capabilityParanoidRm: "Paranoid rm -rf 检查",
  capabilityParanoidRmDescription: "阻止项目内的 rm -rf，临时路径除外。",
  capabilityParanoidInterpreters: "Paranoid 解释器检查",
  capabilityParanoidInterpretersDescription: "阻止 python -c 等解释器单行命令。",
  presetLabel: "预设",
  presetCustomized: (preset) => \`\${preset}（已自定义）\`,
  fromPresetOption: (enabled) => \`跟随预设（\${enabled ? "开启" : "关闭"}）\`,
  fromPreset: "跟随预设",
  forcedOn: "强制开启",
  forcedOff: "强制关闭",
  alwaysOn: "始终开启",
  alwaysOff: "始终关闭",
  cannotTurnOff: "无法关闭",
  worktreeDiscard: "允许在 git linked worktree 中丢弃本地更改",
  worktreeDiscardHelp: "只放宽 linked worktree 内的丢弃检查。",
  worktreeChange: "在 linked worktree 中丢弃更改",
  allowed: "允许",
  blocked: "阻止",
  allowPathsChange: "允许删除的路径",
  denyPathsChange: "始终阻止的路径",
  secretAllowPathsChange: "机密模式豁免",
  pathsAdded: (paths) => \`添加 \${count3(paths)} 个\`,
  pathsRemoved: (paths) => \`移除 \${count3(paths)} 个\`,
  changedByYou: "由你更改",
  forcedInAdvanced: (capability, enabled) => \`\${capability} 已在高级设置中强制\${enabled ? "开启" : "关闭"}\`,
  setByEnvironment: "由环境变量设置",
  setByEnvironmentVariable: (variable) => \`由环境变量设置：\${variable}\`,
  needsPreset: (preset) => \`需要 \${preset} 预设\`,
  offByDefault: "默认关闭",
  offCount: (rules) => \`\${count3(rules)} 条已关闭\`,
  commandRuleSummary: (on, off, always) => \`开启 \${count3(on)} 条 · 关闭 \${count3(off)} 条 · 始终开启 \${count3(always)} 条\`,
  commandProtectionOffSummary: "已关闭。内置规则不再生效，灾难性规则和自定义规则仍然生效。规则设置会保留。",
  secretRuleSummary: (on, off) => \`开启 \${count3(on)} 条 · 关闭 \${count3(off)} 条\`,
  secretProtectionOffSummary: "已关闭。不再阻止敏感文件和拒绝路径。规则设置和路径会保留。",
  noCommandProtectionMatch: "没有匹配的命令保护规则。",
  noSecretProtectionMatch: "没有匹配的机密保护规则。",
  aboutRule: (rule) => \`关于 \${rule}\`,
  protectedPaths: "受保护的路径",
  protectedPathsFor: (rule) => \`\${rule} 保护的路径\`,
  toggleGroup: (group) => \`开启或关闭“\${group}”中的全部规则\`,
  toggleAll: "全部开启或关闭",
  secretCategoryBasename: "敏感文件名",
  secretCategoryPattern: "敏感文件名模式",
  secretCategoryHomePath: "主目录中的敏感目录",
  secretCategoryVariant: "密钥文件名变体",
  secretCategoryExtension: "敏感文件扩展名",
  secretCategoryExtensionPattern: "敏感扩展名模式",
  secretCategoryCredential: "编码智能体凭证",
  secretCategoryConfig: "编码智能体设置",
  inheritedChip: "继承",
  projectChip: "项目",
  projectChipTitle: "由此项目设置。点击可取消设置。",
  projectChipLabel: (field) => \`由项目设置：\${field}。激活后恢复继承。\`,
  commandProtectionOffBanner: "命令保护已关闭，内置的破坏性命令规则不再生效。灾难性规则和自定义规则仍然生效。",
  secretProtectionOffBanner: "机密保护已关闭，不再阻止敏感文件和拒绝路径。",
  fallbackConfigBanner: (reason) => \`正在执行 fallback 配置：\${reason}\`,
  openProtections: "打开保护视图",
  environmentRaises: (variables) => \`环境变量把保护强度提高到了这些设置之上：\${variables}\`,
  removePath: (path) => \`移除 \${path}\`,
  notAdded: (paths, error) => \`未添加：\${paths}。\${error}\`,
  alreadyListed: (paths) => \`已在列表中：\${paths}\`,
  previewFailed: "预览失败",
  couldNotTest: (error) => \`无法测试此命令：\${error}\`,
  testerAllowed: "<strong>允许。</strong>没有规则阻止此命令。",
  createRuleToBlock: "创建规则阻止它",
  testerBlocked: (rule) => rule ? \`<strong>已阻止</strong>，触发规则 \${rule}。\` : "<strong>已阻止</strong>。",
  blockedPart: "被阻止的部分：",
  testerHelp: "按保护设置检查命令，包括未保存的更改和自定义规则。不会实际运行。",
  test: "测试",
  notCreatedYet: "（尚未创建）",
  projectPolicyChanges: "项目策略会更改以下设置：",
  restoredDraft: "已恢复未保存的更改",
  couldNotLoadPolicy: "无法加载策略",
  projectPolicyUnavailable: "项目策略不可用",
  repairFirst: "请先修复你的策略",
  repairBeforeProject: "编辑项目策略前，必须先修复你自己的策略文件。",
  policyNotLoaded: "策略尚未加载",
  discardUnsavedTitle: "丢弃未保存的更改？",
  discardBeforeProject: "项目策略以你已保存的策略为起点。请先保存更改，或在此丢弃。",
  discardChanges: "丢弃更改",
  discardDraftTitle: "丢弃此项目草稿？",
  discardDraft: "丢弃草稿",
  switchFolderDiscards: "切换目录会丢弃此草稿。",
  folderPickerFailed: "无法打开目录选择器",
  projectChangesUnwritten: "项目更改尚未写入任何文件。",
  backToOwnPolicy: "已返回你自己的策略",
  discardDraftChangesTitle: "丢弃对此草稿的更改？",
  discardDraftChangesBody: "草稿将恢复为此项目现有的设置。",
  changesDiscarded: "已丢弃更改",
  projectDraftReloaded: "已重新加载项目草稿",
  projectFolderChanged: "项目目录已更改",
  projectFolderChangedBody: "已按新目录重新加载草稿。应用前请再次复核。",
  invalidProjectFile: "现有的项目策略文件无效，将被替换。",
  noEffectiveChange: "生效策略没有变化。",
  diffSetting: "设置",
  diffNow: "当前",
  diffAfter: "应用后",
  unset: "（未设置）",
  reviewFailed: "复核失败",
  reviewAgain: "重新复核",
  draftChangedDuringReview: "复核结果加载期间，草稿发生了变化。",
  applyProjectTitle: "应用此项目策略？",
  applyProjectBody: "此项目中的每个人都会在自己策略的基础上叠加这些设置。",
  applyProject: "应用项目策略",
  applyingStatus: "应用中…",
  applyFailed: "应用失败",
  projectApplied: "已应用项目策略",
  repairBeforeSaving: "请先修复策略再保存",
  policySaved: "策略已保存",
  discardUnsavedBody: "自上次保存以来的所有更改都将撤销。",
  discardingStatus: "丢弃中…",
  repairTitle: "修复策略文件？",
  repairBody: "保留有效设置，丢弃无效设置。如果 JSON 完全无法读取，则恢复默认值。",
  repairingStatus: "修复中…",
  repairFailed: "修复失败",
  policyRepaired: "策略已修复",
  nothingToReset: "无需重置，所有规则都已使用默认值",
  resetRulesTitle: "将所有规则重置为默认值？",
  resetRulesBody: (secret) => \`所有\${secret ? "机密" : "命令"}规则都将恢复为预设给出的设置。保存前仍可丢弃。\`,
  resetRules: "重置规则",
  turnOffSecretTitle: "关闭机密保护？",
  turnOffCommandTitle: "关闭命令保护？",
  turnOffSecretBody: "在重新开启之前，不再阻止敏感文件、编码智能体凭证和拒绝路径。",
  turnOffCommandBody: "在重新开启之前，内置的破坏性 git、文件系统和执行规则不再阻止命令。",
  catastrophicStillApply: "灾难性规则和自定义规则仍然生效。",
  turnOff: "关闭",
  rulesIntro: "你在 rulebook 中编写的阻止规则，在内置保护之外额外执行。",
  refreshRules: "刷新自定义规则",
  problems: "问题",
  problemsSub: "出现错误表示该 rulebook 已被跳过，其中的规则都不会执行。",
  rulebooks: "Rulebook",
  rulebooksSub: "只读。按实际执行的方式显示规则。",
  loadingRules: "正在加载规则…",
  createRule: "创建规则",
  createRuleSub: "描述规则，然后复制一段现成的 prompt 交给编码智能体。CC Safety Net 本身不会写入 rulebook。",
  appliesTo: "适用范围",
  ruleScope: "规则范围",
  thisProject: "此项目",
  allProjects: "所有项目",
  projectFolder: "项目目录",
  chooseFolder: "选择…",
  projectFolderHint: "rulebook 的写入位置。默认为启动此 GUI 的目录。",
  ruleRequest: "要阻止什么？",
  ruleRequestPlaceholder: "在此项目中阻止 terraform destroy",
  ruleRequestHint: "规则匹配命令、子命令和精确参数，不匹配文件路径或模式。",
  tryExamples: "试试：",
  exampleSuggest: "推荐规则",
  exampleSuggestRequest: "阅读我的 package.json，推荐要阻止的规则",
  exampleBlock: "阻止命令",
  exampleBlockRequest: "设置规则，阻止所有 terraform destroy 命令",
  exampleVerify: "验证规则",
  exampleVerifyRequest: "验证我的规则并修复所有错误",
  copyPrompt: "复制 prompt",
  allRulebooksSkipped: "所有 rulebook 都因错误被跳过，没有任何自定义规则生效。请查看上方的“问题”。",
  noCustomRules: "还没有自定义规则。使用下方的<strong>创建规则</strong>，或运行 <code>npx -y cc-safety-net rule init</code>。",
  blocksWhenArgument: "出现以下任一参数时阻止：",
  customRuleMissing: (rule) => \`\${rule} 不在任何 rulebook 中\`,
  couldNotLoadRules: (error) => \`无法加载规则：\${error}\`,
  folderPickerUnavailable: "目录选择器不可用",
  typeFolderInstead: (error) => \`\${error}。请手动输入项目目录。\`,
  rulesNotLoaded: "规则尚未加载",
  refreshAndRetry: "请点击刷新后重试。",
  describeRuleFirst: "请先描述要阻止的内容",
  enterProjectFolder: "请输入规则所属的项目目录",
  promptCopied: "已复制 prompt",
  pasteIntoAgent: "请将其粘贴到编码智能体中。",
  agentsIntro: "为本机上的每个编码智能体安装或卸载 CC Safety Net hook。",
  refreshAgents: "刷新智能体",
  checkingAgents: "正在检查智能体…",
  hookInstalled: "已安装 hook",
  hookDisabled: "已禁用 hook",
  hookStatusUnknown: "状态未知，无法读取其设置文件",
  uninstalling: "正在卸载…",
  installing: "正在安装…",
  uninstall: "卸载",
  enable: "启用",
  install: "安装",
  notDetected: "未检测到",
  installedAgents: "已安装",
  detectedAgents: "本机已检测到",
  noHookYet: "还没有智能体安装 hook。请为你使用的每个智能体安装。未安装的智能体，其命令不会受到检查。",
  missingAgents: "本机未检测到",
  couldNotCheckAgents: (error) => \`无法检查智能体：\${error}\`,
  installFailed: "安装失败",
  uninstallFailed: "卸载失败",
  settingsIntro: "外观、日志保留、文件位置和维护。",
  appearance: "外观",
  theme: "主题",
  themeAuto: "自动",
  themeLight: "浅色",
  themeDark: "深色",
  preferenceHint: "保存在本机。",
  language: "语言",
  preferenceSaveFailed: "无法保存此偏好设置",
  auditLog: "审计日志",
  keepLogsFor: "日志保留期",
  retentionNote: "每条检查过的命令都会记入日志。缩短保留期会删除较早的条目，活动视图也只能回溯到这个范围。",
  logFolder: "日志目录",
  copyLogFolder: "复制日志目录路径",
  files: "文件",
  policyFile: "策略文件",
  copyPolicyPath: "复制策略文件路径",
  copyProjectPolicyPath: "复制项目策略路径",
  about: "关于",
  platform: "平台",
  dangerZone: "危险操作",
  resetPolicy: "重置策略",
  resetPolicyHelp: "用默认值替换策略文件。此操作无法撤销。",
  repairInProtectionsFirst: "请先在保护视图中修复策略文件。",
  leaveProjectDraftFirst: "请先应用或退出项目策略草稿。",
  saveProtectionsFirst: "请先保存或丢弃保护视图中未保存的更改。",
  retentionRange: (min, max) => \`请输入 \${count3(min)} 到 \${count3(max)} 之间的整数天数。\`,
  retentionUnchanged: "保留期未更改",
  shortenRetentionTitle: (window2) => \`日志只保留 \${days3(window2)}？\`,
  shortenRetentionBody: (window2) => \`早于 \${days3(window2)}的日志条目将在下次清理时删除，且无法恢复。\`,
  shortenRetention: "缩短保留期",
  retentionSaved: (window2) => \`日志保留期已改为 \${days3(window2)}\`,
  resetUnavailable: "无法重置",
  resetPolicyTitle: "重置策略？",
  resetPolicyBody: "策略文件将替换为默认值，所有自定义设置都会丢失。",
  resettingStatus: "重置中…",
  resetFailed: "重置失败",
  policyReset: "策略已重置为默认值"
};

// src/gui/frontend/preferences.ts
var locales = ["en", "ja", "zh-CN"];
var localeByLanguage = new Map([
  ["en", "en"],
  ["ja", "ja"],
  ["zh", "zh-CN"]
]);
var resolveLocale = (saved, languages) => saved ?? languages.map((tag) => localeByLanguage.get(tag.toLowerCase().split("-")[0] ?? "")).find((locale) => locale !== undefined) ?? "en";

// src/gui/frontend/i18n.ts
var locale = resolveLocale(guiData.preferences.language, navigator.languages);
var t = { en, ja, "zh-CN": zhCN }[locale];
var formatCount = (value) => value.toLocaleString(locale);
var formatDateTime = (ts) => new Date(ts).toLocaleString(locale);
var formatClockTime = (ts) => new Date(ts).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
var relativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
  numeric: "always",
  style: "narrow"
});
var formatRelativeTime = (ts) => {
  const minutes = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (!Number.isFinite(minutes))
    return "";
  if (minutes >= 1440)
    return relativeTimeFormat.format(-Math.floor(minutes / 1440), "day");
  if (minutes >= 60)
    return relativeTimeFormat.format(-Math.floor(minutes / 60), "hour");
  if (minutes >= 1)
    return relativeTimeFormat.format(-minutes, "minute");
  return t.justNow;
};
var formatDayHeading = (ts) => {
  const date = new Date(ts).toDateString();
  if (date === new Date().toDateString())
    return t.today;
  if (date === new Date(Date.now() - 86400000).toDateString())
    return t.yesterday;
  return new Date(ts).toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
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
    runtime: {
      flags: ["-ac", "--agy-cli"],
      description: "Run as Antigravity CLI PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--agy-cli",
      artifactKind: "hook config",
      probeCommand: ["agy", "--version"]
    }
  },
  {
    id: "claude-code",
    displayName: "Claude Code",
    runtime: {
      displayName: "Coding CLI",
      flags: ["-cc", "--coding-cli"],
      legacyFlags: ["--claude-code"],
      description: "Run as Coding CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cc", "--claude-code"]
    },
    install: {
      flag: "--claude-code",
      artifactKind: "plugin",
      probeCommand: ["claude", "--version"]
    }
  },
  {
    id: "codex",
    displayName: "Codex",
    runtime: {
      flags: ["-cx", "--codex"],
      description: "Run as a Codex PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--codex",
      artifactKind: "plugin",
      probeCommand: ["codex", "--version"]
    }
  },
  {
    id: "copilot-cli",
    displayName: "GitHub Copilot CLI",
    runtime: {
      flags: ["-cp", "--copilot-cli"],
      description: "Run as GitHub Copilot CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cp", "--copilot-cli"]
    },
    install: {
      flag: "--copilot-cli",
      artifactKind: "plugin",
      probeCommand: ["copilot", "--binary-version"]
    }
  },
  {
    id: "gemini-cli",
    displayName: "Gemini CLI",
    runtime: {
      flags: ["-gc", "--gemini-cli"],
      description: "Run as Gemini CLI BeforeTool hook",
      legacyTopLevelFlags: ["-gc", "--gemini-cli"]
    },
    install: {
      flag: "--gemini-cli",
      artifactKind: "extension",
      probeCommand: ["gemini", "--version"]
    }
  },
  {
    id: "grok-build",
    displayName: "Grok Build",
    runtime: {
      flags: ["-gb", "--grok-build"],
      description: "Run as Grok Build PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--grok-build",
      artifactKind: "hook config",
      probeCommand: ["grok", "--version"]
    }
  },
  {
    id: "hermes-agent",
    displayName: "Hermes Agent",
    runtime: {
      flags: ["-ha", "--hermes-agent"],
      description: "Run as Hermes Agent pre_tool_call hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--hermes-agent",
      artifactKind: "plugin",
      probeCommand: ["hermes", "--version"]
    }
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    runtime: {
      flags: ["-kc", "--kimi-code"],
      description: "Run as Kimi Code PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--kimi-code",
      artifactKind: "hook config",
      probeCommand: ["kimi", "--version"]
    }
  },
  {
    id: "openclaw",
    displayName: "OpenClaw",
    install: {
      flag: "--openclaw",
      artifactKind: "plugin",
      probeCommand: ["openclaw", "--version"]
    }
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    install: {
      flag: "--opencode",
      artifactKind: "plugin",
      probeCommand: ["opencode", "--version"]
    }
  },
  {
    id: "pi",
    displayName: "Pi",
    install: {
      flag: "--pi",
      artifactKind: "package",
      probeCommand: ["pi", "--version"]
    }
  },
  {
    id: "cursor",
    displayName: "Cursor",
    runtime: {
      flags: ["-cu", "--cursor"],
      description: "Run as Cursor preToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--cursor",
      artifactKind: "hook config",
      probeCommand: ["cursor", "--version"]
    }
  },
  {
    id: "deepseek-harness",
    displayName: "DeepSeek Harness",
    install: {
      flag: "--deepseek-harness",
      artifactKind: "package",
      probeCommand: DEEPSEEK_HARNESS_NPM_PROBE
    }
  },
  {
    id: "devin",
    displayName: "Devin CLI",
    runtime: {
      flags: ["-dv", "--devin"],
      description: "Run as Devin CLI PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--devin",
      artifactKind: "hook config",
      probeCommand: ["devin", "--version"]
    }
  },
  {
    id: "droid",
    displayName: "Factory Droid",
    runtime: {
      flags: ["-fd", "--droid"],
      description: "Run as Factory Droid PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      flag: "--droid",
      artifactKind: "hook config",
      probeCommand: ["droid", "--version"]
    }
  },
  {
    id: "amp",
    displayName: "Amp Code",
    install: {
      flag: "--amp",
      artifactKind: "plugin",
      probeCommand: ["amp", "--version"]
    }
  }
];
var catalogByDisplayName = catalog.slice().sort((a, b) => a.displayName.localeCompare(b.displayName, "en"));
var doctorIntegrationOrder = catalogByDisplayName.map((integration) => integration.id).sort((a, b) => Number(b === "claude-code") - Number(a === "claude-code"));
var runtimeHookIntegrationMetadata = catalogByDisplayName.filter((integration) => ("runtime" in integration)).map((integration) => ({
  id: integration.id,
  displayName: "displayName" in integration.runtime ? integration.runtime.displayName : integration.displayName,
  flags: integration.runtime.flags,
  legacyFlags: "legacyFlags" in integration.runtime ? integration.runtime.legacyFlags : [],
  description: integration.runtime.description,
  legacyTopLevelFlags: integration.runtime.legacyTopLevelFlags
}));
var installIntegrationMetadata = catalogByDisplayName.map((integration) => ({
  id: integration.id,
  ...integration.install
}));
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
var requestJson = async (path, init = {}) => {
  const token = guiData.token;
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
\`) : null) ?? result.data?.error ?? t.requestFailed(result.status);
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
var savePreference = async (update) => {
  const result = await requestJson("/api/preferences", {
    method: "POST",
    body: JSON.stringify(update)
  });
  const saved = isWriteSuccess(result);
  if (!saved)
    notify(t.preferenceSaveFailed, "error", errorText(result));
  return saved;
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
    notify(t.copyFailed, "error");
    return;
  }
  if (showingCopied.has(button))
    return;
  showingCopied.add(button);
  const label = button.innerHTML;
  button.innerHTML = \`\${icons.check}<span>\${escapeHtml(t.copied)}</span>\`;
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
var attentionItems = (facts, t) => [
  ...(facts.targets ?? []).filter((row) => row.status === "disabled").map((row) => ({
    text: t.hookDisabledAttention(row.label),
    href: "#integrations"
  })),
  facts.suspects > 0 ? {
    text: t.suspectAttention(facts.suspects, facts.days),
    href: "#activity?decision=suspect"
  } : null,
  facts.errors > 0 ? {
    text: t.guardErrorAttention(facts.errors, facts.days),
    href: "#activity?decision=error"
  } : null,
  facts.update?.updateAvailable ? {
    text: t.updateAttention(facts.update.latestVersion ?? ""),
    href: \`\${repoUrl}/releases\`
  } : null
].filter((item) => item !== null);

// src/gui/frontend/policy-summary.ts
var safetyLevels = (t) => ({
  standard: [t.presetStandard, t.presetStandardDescription],
  strict: [t.presetStrict, t.presetStrictDescription],
  paranoid: [t.presetParanoid, t.presetParanoidDescription]
});
var capabilityNames = (t) => ({
  fail_closed: [t.capabilityFailClosed, t.capabilityFailClosedDescription],
  paranoid_rm: [t.capabilityParanoidRm, t.capabilityParanoidRmDescription],
  paranoid_interpreters: [
    t.capabilityParanoidInterpreters,
    t.capabilityParanoidInterpretersDescription
  ]
});
var levelName = (level, t) => safetyLevels(t)[level][0];
var tierForRule = (rule) => !rule.activationCapability ? "normal" : rule.activationCapability === "fail_closed" ? "strict" : "paranoid";
var commandRuleGroups = (rules, t) => {
  const alwaysOn = rules.filter((rule) => rule.catastrophic);
  const configurable = rules.filter((rule) => !rule.catastrophic);
  return [
    ...alwaysOn.length > 0 ? [{ key: "always-on", title: t.alwaysOn, rules: alwaysOn }] : [],
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
var ruleNote = (rule, effective, capabilities, t) => {
  const capability = rule.activationCapability;
  if (effective.source === "rule_override")
    return t.changedByYou;
  if (effective.source === "capability_override" && capability)
    return t.forcedInAdvanced(capabilityNames(t)[capability][0], effective.enabled);
  if (effective.source === "environment") {
    const source = [...capability ? capabilities[capability]?.sources ?? [] : []].reverse().find((item) => item.startsWith("env "));
    return source ? t.setByEnvironmentVariable(source.slice(4)) : t.setByEnvironment;
  }
  if (effective.enabled || effective.source === "master_disabled")
    return null;
  return t.needsPreset(tierForRule(rule) === "strict" ? t.presetStrict : t.presetParanoid);
};
var policyChanges = (saved, draft, labels, t) => {
  const onOff = (value) => value ? t.stateOn : t.stateOff;
  const capabilities = capabilityNames(t);
  const overrideChanges = (before, after) => [...new Set([...Object.keys(before), ...Object.keys(after)])].filter((id) => before[id] !== after[id]).map((id) => t.settingChange(labels[id] ?? id, after[id] === undefined ? t.stateDefault : onOff(after[id] === "on")));
  const pathChanges = (name, before, after) => {
    const added = after.filter((path) => !before.includes(path)).length;
    const removed = before.filter((path) => !after.includes(path)).length;
    if (added === 0 && removed === 0)
      return null;
    return t.settingChange(name, [added ? t.pathsAdded(added) : "", removed ? t.pathsRemoved(removed) : ""].filter(Boolean).join(t.listSeparator));
  };
  return [
    saved.safety.level === draft.safety.level ? null : t.settingChange(t.presetLabel, \`\${levelName(saved.safety.level, t)} → \${levelName(draft.safety.level, t)}\`),
    ...Object.keys(capabilities).filter((key) => saved.safety.overrides[key] !== draft.safety.overrides[key]).map((key) => {
      const value = draft.safety.overrides[key];
      return t.settingChange(capabilities[key][0], value === undefined ? t.fromPreset : value ? t.forcedOn : t.forcedOff);
    }),
    saved.workflow.worktree_mode === draft.workflow.worktree_mode ? null : t.settingChange(t.worktreeChange, draft.workflow.worktree_mode ? t.allowed : t.blocked),
    saved.destructive_command_protection.enabled === draft.destructive_command_protection.enabled ? null : t.settingChange(t.commandProtection, onOff(draft.destructive_command_protection.enabled)),
    saved.secret_protection.enabled === draft.secret_protection.enabled ? null : t.settingChange(t.secretProtection, onOff(draft.secret_protection.enabled)),
    ...overrideChanges(saved.destructive_command_protection.overrides, draft.destructive_command_protection.overrides),
    ...overrideChanges(saved.secret_protection.overrides, draft.secret_protection.overrides),
    pathChanges(t.allowPathsChange, saved.destructive_command_protection.allow_paths, draft.destructive_command_protection.allow_paths),
    pathChanges(t.denyPathsChange, saved.secret_protection.deny_paths, draft.secret_protection.deny_paths),
    pathChanges(t.secretAllowPathsChange, saved.secret_protection.allow_paths, draft.secret_protection.allow_paths)
  ].filter((change) => change !== null);
};

// src/gui/frontend/views/integrations.ts
var targets = null;
var busy = new Set;
var integrationTargets = () => targets;
var statusText = (row) => ({
  active: t.hookInstalled,
  disabled: t.hookDisabled,
  "not-installed": "",
  "not-inspected": t.hookStatusUnknown
})[row.status];
var rowHtml = (row) => {
  const uninstall = row.status === "active";
  const action = row.version === null ? "" : \`<button type="button" data-integration-action="\${uninstall ? "uninstall" : "install"}" data-integration-target="\${escapeHtml(row.target)}"\${busy.has(row.target) ? " disabled" : ""}>\${busy.has(row.target) ? uninstall ? t.uninstalling : t.installing : uninstall ? t.uninstall : row.status === "disabled" ? t.enable : t.install}</button>\`;
  return \`<li class="setting-row agent-row">
    <span class="agent-name">\${escapeHtml(row.label)}</span>
    <span class="agent-version"\${row.version === null ? "" : \` title="v\${escapeHtml(row.version)}"\`}>\${row.version === null ? t.notDetected : \`v\${escapeHtml(row.version)}\`}</span>
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
  qs("integrations-list").innerHTML = groupHtml(t.installedAgents, groups.installed) + groupHtml(t.detectedAgents, groups.available, groups.installed.length === 0 ? t.noHookYet : "") + (groups.missing.length === 0 ? "" : \`<details class="section missing-agents"><summary>\${t.missingAgents} <span class="count">\${groups.missing.length}</span></summary><ul class="card rows">\${groups.missing.map(rowHtml).join("")}</ul></details>\`);
};
var loadIntegrations = async () => {
  const result = await requestJson("/api/integrations");
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs("integrations-list").innerHTML = \`<p class="empty">\${escapeHtml(t.couldNotCheckAgents(errorText(result)))}</p>\`;
    return;
  }
  targets = result.data.targets;
  qs("integrations-node-version").textContent = result.data.system.nodeVersion ?? t.unknownValue;
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
    notify(action === "install" ? t.installFailed : t.uninstallFailed, "error");
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
    policy.destructive_command_protection.enabled ? null : t.commandProtectionIsOff,
    policy.secret_protection.enabled ? null : t.secretProtectionIsOff
  ].filter((text) => text !== null);
  const noAgent = loaded.errors.length === 0 && targets !== null && active.length === 0;
  const headline = loaded.errors.length > 0 ? t.statusRepair : !targets ? t.statusCheckingAgents : noAgent ? t.statusNoAgent : off.length > 0 ? t.statusPartlyProtected : t.statusProtected;
  const customized = (loaded.preview?.counts.effectiveCustomizations ?? 0) > 0 || Object.entries(policy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[policy.safety.level][key]);
  const facts = [
    t.presetFact(levelName(policy.safety.level, t), customized),
    ...off.length > 0 ? off : [
      loaded.preview ? t.commandRulesOn(loaded.preview.counts.enabled) : null,
      t.secretProtectionIsOn
    ],
    active.length > 0 ? t.hookActiveIn(active.length <= 3 ? active.map((row) => row.label).join(t.listSeparator) : t.agentCount(active.length)) : null
  ].filter((text) => text !== null);
  const [actionHref, actionLabel] = noAgent ? ["#integrations", t.installHook] : ["#policy", loaded.errors.length > 0 ? t.repair : t.configure];
  qs("status-card").innerHTML = \`<div>
      <p class="status-headline">\${escapeHtml(headline)}</p>
      <p class="status-facts">\${facts.map(escapeHtml).join(" · ")}</p>
    </div>
    <a class="link-button" href="\${actionHref}">\${escapeHtml(actionLabel)}</a>\`;
};
var renderAttention = () => {
  const items = attentionItems({
    targets: integrationTargets(),
    update,
    errors: feed?.counts.errors ?? 0,
    suspects: feed ? findSuspectEntries(feed.entries).size : 0,
    days: feed?.days ?? OVERVIEW_DAYS
  }, t);
  qs("attention").hidden = items.length === 0;
  qs("attention-list").innerHTML = items.map((item) => \`<li class="list-row attention-row"><span>\${escapeHtml(item.text)}</span><a class="link-button" href="\${escapeHtml(item.href)}"\${item.href.startsWith("#") ? "" : ' target="_blank" rel="noopener"'}>\${escapeHtml(item.href.startsWith("#activity") ? t.review : item.href.startsWith("#") ? t.fix : t.releaseNotes)}</a></li>\`).join("");
};
var sparkline = (byDay, noun) => {
  const max = Math.max(...byDay, 1);
  return \`<div class="tile-spark" role="img" aria-label="\${escapeHtml(t.perDayChart(noun, byDay.map(formatCount).join(t.listSeparator)))}">\${byDay.map((count) => \`<span class="spark-bar\${count === 0 ? " spark-zero" : ""}" style="height:\${count === 0 ? 2 : Math.max(3, Math.round(count / max * 36))}px" title="\${formatCount(count)}"></span>\`).join("")}</div>\`;
};
var ruleHref = (ruleId) => ruleId.startsWith("custom.") ? \`#rules?focus=\${encodeURIComponent(ruleId)}\` : \`#activity?q=\${encodeURIComponent(ruleId)}\`;
var renderActivity = () => {
  if (!feed)
    return;
  const loaded = feed;
  qs("overview-tiles").innerHTML = [
    [loaded.counts.blocked, t.tileBlocked, loaded.counts.blockedByDay],
    [loaded.totalInWindow, t.tileChecked, loaded.counts.analyzedByDay]
  ].map(([value, label, byDay]) => \`<div class="tile"><div><strong>\${formatCount(value)}</strong><span>\${escapeHtml(\`\${label} · \${t.lastDays(loaded.days)}\`)}</span></div>\${sparkline(byDay, label)}</div>\`).join("");
  const blocks = loaded.entries.filter((entry) => entry.decision !== "allow").slice(0, 8);
  qs("recent-blocks").innerHTML = blocks.length === 0 ? \`<p class="empty">\${escapeHtml(t.nothingBlocked(loaded.days))}</p>\` : \`<ul class="card list">\${blocks.map((entry) => \`<li><a class="list-row compact-row" href="\${entry.ruleId ? ruleHref(entry.ruleId) : "#activity"}">
              <time datetime="\${escapeHtml(entry.ts)}">\${escapeHtml(formatRelativeTime(entry.ts))}</time>
              <span class="feed-agent">\${escapeHtml(entry.agent && entry.agent !== "unknown" ? agentLabels[entry.agent] ?? entry.agent : "")}</span>
              <code class="feed-command">\${escapeHtml(entry.segment || entry.command || t.noCommandRecorded)}</code>
              <span class="feed-rule">\${escapeHtml(entry.failureStage ? t.guardError : entry.ruleId ?? "")}</span>
            </a></li>\`).join("")}</ul>\`;
  const top = Object.entries(loaded.counts.rules).sort((a, b) => b[1] - a[1]).slice(0, 5);
  qs("top-rules-title").textContent = \`\${t.topRules} · \${t.lastDays(loaded.days)}\`;
  qs("top-rules").innerHTML = top.length === 0 ? \`<p class="empty">\${escapeHtml(t.noRuleBlocked)}</p>\` : \`<ul class="card list">\${top.map(([ruleId, count]) => \`<li><a class="list-row rule-count-row" href="\${ruleHref(ruleId)}">
              <code class="rule-label">\${escapeHtml(ruleId)}</code>
              <span class="count">\${escapeHtml(t.blockCount(count))}</span>
            </a></li>\`).join("")}</ul>\`;
};
var loadOverview = async () => {
  const result = await requestJson(\`/api/activity?days=\${Math.min(OVERVIEW_DAYS, retentionDays())}\`);
  if (!result.ok || !result.data) {
    qs("recent-blocks").innerHTML = \`<p class="empty">\${escapeHtml(t.couldNotLoadActivity(errorText(result)))}</p>\`;
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
  const evidence = starContext.blockedTotal > 0 ? t.starEvidence(starContext.blockedTotal, retentionDays()) : "";
  qs("star-pitch-text").innerHTML = starred ? evidence : evidence ? \`\${evidence} \${t.starIfSaved}\` : t.starIfUseful;
};
var renderStarLink = (href) => {
  qs("star-slot").innerHTML = \`<a class="star-cta" href="\${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="\${escapeHtml(t.starLinkLabel)}"><span class="star-icon" aria-hidden="true">\${starIcons.outline}</span><span class="star-label">\${escapeHtml(t.starOnGitHub)}</span>\${starCountHtml(starContext.starCount)}</a>\`;
  qs("star-row").hidden = false;
};
var loadStarContext = async () => {
  const result = await requestJson("/api/star/context");
  starContext = result.ok && result.data ? result.data : { starCount: null, blockedTotal: 0 };
  renderStarPitch(false);
  qs("star-slot").innerHTML = \`<button type="button" class="star-cta" aria-label="\${escapeHtml(t.starButtonLabel)}"><span class="star-icon" aria-hidden="true">\${starIcons.outline}</span><span class="star-label">\${escapeHtml(t.starOnGitHub)}</span>\${starCountHtml(starContext.starCount)}</button>\`;
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
  button.querySelector(".star-label").textContent = t.starred;
  button.setAttribute("aria-label", t.starredLabel);
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
var decisionLabel = (entry) => entry.failureStage ? t.decisionError : entry.decision === "allow" ? t.decisionAllowed : t.decisionBlocked;
var reportFieldNames = {
  title: t.reportNameTitle,
  expected: t.reportNameExpected,
  command: t.reportNameCommand,
  entry: t.reportNameEntry
};
var ruleLink = (ruleId) => ruleId.startsWith("custom.") ? \`<a class="rule-id" href="#rules?focus=\${encodeURIComponent(ruleId)}" title="\${escapeHtml(t.showCustomRule)}">\${escapeHtml(ruleId)}</a>\` : knownRuleIds().has(ruleId) ? \`<a class="rule-id" href="#policy?q=\${encodeURIComponent(ruleId)}" title="\${escapeHtml(t.showProtection)}">\${escapeHtml(ruleId)}</a>\` : \`<code class="rule-id">\${escapeHtml(ruleId)}</code>\`;
var entryCommand = (entry) => entry.segment || entry.command || "";
var feedRowHtml = (entry, index) => {
  const blocked = entry.decision !== "allow";
  const command = entryCommand(entry);
  const agent = entry.agent && entry.agent !== "unknown" ? agentLabels[entry.agent] ?? entry.agent : "";
  const detailRows = [
    entry.command && entry.command !== command ? [t.detailFullCommand, \`<code class="block">\${escapeHtml(entry.command)}</code>\`] : null,
    entry.reason && entry.reason !== "allowed" ? [t.detailReason, escapeHtml(entry.reason)] : null,
    entry.ruleId ? [t.detailRule, ruleLink(entry.ruleId)] : null,
    entry.cwd ? [t.detailFolder, \`<code>\${escapeHtml(entry.cwd)}</code>\`] : null,
    [
      t.detailTime,
      \`\${escapeHtml(formatDateTime(entry.ts))} (\${escapeHtml(formatRelativeTime(entry.ts))})\`
    ]
  ].filter((row) => row !== null);
  return \`<li class="feed-row">
    <button type="button" class="feed-summary" aria-expanded="false" aria-controls="feed-detail-\${index}">
      <span class="chevron" aria-hidden="true"></span>
      <time datetime="\${escapeHtml(entry.ts)}">\${escapeHtml(formatClockTime(entry.ts))}</time>
      <span class="decision \${entry.failureStage ? "error" : blocked ? "deny" : "allow"}">\${decisionLabel(entry)}</span>
      <span class="feed-agent">\${escapeHtml(agent)}</span>
      <code class="feed-command">\${escapeHtml(command || t.noCommandRecorded)}</code>
      <span class="feed-rule">\${escapeHtml(entry.ruleId ?? "")}</span>
    </button>
    <div class="feed-detail" id="feed-detail-\${index}" hidden>
      <code class="block detail-command">\${escapeHtml(command || t.noCommandRecorded)}</code>
      <div class="detail-actions">
        \${blocked ? \`<button type="button" class="primary" data-report-fp="\${index}">\${escapeHtml(t.reportFalsePositive)}</button>\` : \`<button type="button" class="primary" data-block-future="\${index}">\${escapeHtml(t.blockInFuture)}</button>\`}
        <button type="button" data-log-copy="\${index}">\${icons.copy}<span>\${escapeHtml(t.copyLogEntry)}</span></button>
      </div>
      <dl class="detail-rows">\${detailRows.map(([term, value]) => \`<div><dt>\${escapeHtml(term)}</dt><dd>\${value}</dd></div>\`).join("")}</dl>
    </div>
  </li>\`;
};
var renderControls = () => {
  if (!activity)
    return;
  const loaded = activity;
  const segment = (value, label, count) => \`<button type="button" data-activity-decision="\${value}" aria-pressed="\${filters.decision === value}">\${escapeHtml(label)} <span class="count">\${formatCount(count)}</span></button>\`;
  qs("activity-decision").innerHTML = [
    segment("deny", t.decisionBlocked, loaded.counts.blocked),
    segment("allow", t.decisionAllowed, loaded.counts.allowed),
    ...loaded.counts.errors > 0 ? [segment("error", t.filterErrors, loaded.counts.errors)] : [],
    ...suspects.size > 0 ? [segment("suspect", t.filterSuspect, suspects.size)] : [],
    segment("all", t.filterAll, loaded.totalInWindow)
  ].join("");
  const agentNames = Object.keys(loaded.counts.agents).filter((name) => name !== "unknown").sort();
  qs("activity-agent").innerHTML = [
    \`<option value="all">\${escapeHtml(t.allAgents)}</option>\`,
    ...agentNames.map((name) => \`<option value="\${escapeHtml(name)}">\${escapeHtml(agentLabels[name] ?? name)} (\${formatCount(loaded.counts.agents[name] ?? 0)})</option>\`)
  ].join("");
  qs("activity-agent").value = filters.agent;
  qs("activity-agent").parentElement?.toggleAttribute("hidden", agentNames.length < 2);
  const retained = retentionDays();
  qs("activity-days").innerHTML = [
    ...new Set([...[7, 30, 90, 180, 365].filter((days) => days < retained), retained, loaded.days])
  ].sort((left, right) => left - right).map((days) => \`<option value="\${days}">\${escapeHtml(t.lastDaysOption(days))}</option>\`).join("");
  qs("activity-days").value = String(loaded.days);
  qs("activity-command-filter").hidden = !filters.command;
  qs("activity-command-filter").innerHTML = filters.command ? \`\${escapeHtml(t.showingBlocksOf)} <code>\${escapeHtml(filters.command)}</code> <button type="button" class="quiet" data-clear-command>\${escapeHtml(t.showAllBlocks)}</button>\` : "";
};
var emptyMessage = () => {
  if (filters.query || filters.command || filters.agent !== "all")
    return escapeHtml(t.noFilterMatch);
  if (filters.decision === "deny")
    return \`\${escapeHtml(t.nothingBlocked(activity?.days ?? filters.days))} <button type="button" class="quiet" data-activity-decision="all">\${escapeHtml(t.showAllActivity)}</button>\`;
  return escapeHtml(t.noLogEntries);
};
var renderFeed = () => {
  if (!activity)
    return;
  const entries = visibleEntries(activity.entries, filters, suspects);
  renderedEntries = entries;
  qs("activity-feed").innerHTML = entries.length === 0 ? \`<p class="empty">\${emptyMessage()}</p>\` : entries.map((entry, index) => {
    const label = formatDayHeading(entry.ts);
    const previous = entries[index - 1];
    const heading = previous && formatDayHeading(previous.ts) === label ? "" : \`\${index === 0 ? "" : "</ul>"}<h4 class="day-heading">\${escapeHtml(label)}</h4><ul class="feed-list">\`;
    return heading + feedRowHtml(entry, index);
  }).join("") + "</ul>";
  qs("activity-count").textContent = [
    t.showingEntries(entries.length, activity.totalInWindow, activity.days),
    activity.truncated ? t.activityTruncated : "",
    activity.unreadable > 0 ? t.unreadableLogs(activity.unreadable) : ""
  ].filter(Boolean).join(" ");
};
var loadActivity = async () => {
  const result = await requestJson(\`/api/activity?days=\${filters.days}\`);
  if (!result.ok || !result.data) {
    qs("activity-feed").innerHTML = \`<p class="empty">\${escapeHtml(t.couldNotLoadActivity(errorText(result)))}</p>\`;
    qs("activity-count").textContent = "";
    return;
  }
  activity = result.data;
  suspects = findSuspectEntries(activity.entries);
  showPath("logs-path", activity.logsDir ?? "", activity.logsDir ? "" : t.notAvailable);
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
  const names = request.dropped.map((field) => reportFieldNames[field] ?? field).join(t.reportFieldJoiner);
  notify(t.reportTooLong, "error", await copying ? t.reportFieldCopied(names, request.dropped.length) : t.reportFieldLeftOut(names, request.dropped.length));
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

// src/gui/frontend/shortcuts.ts
var textEntryTags = new Set(["INPUT", "TEXTAREA", "SELECT"]);
var isSearchShortcut = (event, target) => event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !textEntryTags.has(target.tagName) && !target.isContentEditable;

// src/gui/frontend/views/policy.ts
var secretCategoryNames = {
  Basename: t.secretCategoryBasename,
  Pattern: t.secretCategoryPattern,
  "Home path": t.secretCategoryHomePath,
  Variant: t.secretCategoryVariant,
  Extension: t.secretCategoryExtension,
  "Extension pattern": t.secretCategoryExtensionPattern,
  "Coding CLI credential": t.secretCategoryCredential,
  "Coding CLI config": t.secretCategoryConfig
};
var presets = safetyLevels(t);
var capabilities = capabilityNames(t);
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
    return \`<span class="project-chip inherited">\${escapeHtml(t.inheritedChip)}</span>\`;
  return \`<button type="button" class="project-chip" data-unmark-field="\${escapeHtml(field)}" title="\${escapeHtml(t.projectChipTitle)}" aria-label="\${escapeHtml(t.projectChipLabel(field))}">\${escapeHtml(t.projectChip)}</button>\`;
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
    saved && !saved.policy.destructive_command_protection.enabled ? t.commandProtectionOffBanner : null,
    saved && !saved.policy.secret_protection.enabled ? t.secretProtectionOffBanner : null,
    saved?.configState && saved.configState.state !== "ready" ? t.fallbackConfigBanner(saved.configState.reason) : null
  ].filter((notice) => notice !== null);
  qs("protection-banner").innerHTML = notices.map((notice) => \`<p>\${escapeHtml(notice)}</p>\`).concat(notices.length > 0 && !location.hash.startsWith("#policy") ? [\`<a href="#policy">\${escapeHtml(t.openProtections)}</a>\`] : []).join("");
  qs("protection-banner").hidden = notices.length === 0;
};
var savedComparisonPolicy = () => projectDraft ? overlayProjectProposal(projectDraft.baseline, JSON.parse(projectDraft.snapshot)) : state?.policy;
var renderSavebar = () => {
  qs("policy-savebar").hidden = !shared.dirty;
  qs("save").textContent = projectDraft ? t.reviewAndApply : t.save;
  if (!shared.dirty || !state)
    return;
  const changes = policyChanges(savedComparisonPolicy(), draftPolicy, ruleLabels(), t);
  qs("savebar-title").textContent = changes.length === 0 ? t.unsavedChanges : t.unsavedChangeCount(changes.length);
  qs("savebar-summary").textContent = changes.slice(0, 3).join(t.changeSeparator) + (changes.length > 3 ? t.moreChanges(changes.length - 3) : "");
};
var syncRawFromForm = () => {
  if (state?.errors.length)
    return;
  qs("raw").value = \`\${JSON.stringify(projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy(), null, 2)}
\`;
  qs("raw-source").textContent = projectDraft ? t.rawProjectFields(projectDraft.path) : t.rawReadOnly;
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
var offCount = (off) => off > 0 ? \` · <span class="off-count">\${escapeHtml(t.offCount(off))}</span>\` : "";
var renderDestructiveCommands = () => {
  if (!state || !preview)
    return;
  const effectiveState = preview;
  const query = searchQuery();
  const disabled = !draftPolicy.destructive_command_protection.enabled;
  const catastrophicCount = state.destructiveCommandRules.filter((rule) => rule.catastrophic).length;
  qs("destructive-command-summary").textContent = disabled ? t.commandProtectionOffSummary : t.commandRuleSummary(preview.counts.enabled, preview.counts.disabled, catastrophicCount);
  qs("destructive-panel").classList.toggle("is-off", disabled);
  const visible = state.destructiveCommandRules.filter((rule) => matches(query, [rule.category, rule.label, rule.id, rule.description]) && (!showChangedOnly || destructiveChanged(rule)));
  const rowHtml = (rule) => {
    const info = \`<button type="button" class="info-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(t.aboutRule(rule.label))}" aria-haspopup="dialog" aria-controls="rule-example-popover">\${icons.info}</button>\`;
    const heading = \`<span class="rule-name">\${escapeHtml(rule.label)}</span><code class="rule-id">\${escapeHtml(rule.id)}</code>\${tierForRule(rule) === "normal" ? "" : \`<span class="tier-badge \${tierForRule(rule)}">\${escapeHtml(tierForRule(rule) === "strict" ? t.presetStrict : t.presetParanoid)}</span>\`}\`;
    if (rule.catastrophic)
      return ruleRowHtml({
        id: rule.id,
        control: \`<span class="lock" title="\${escapeHtml(t.alwaysOn)}">\${icons.lock}</span>\`,
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
      note: ruleNote(rule, effective, effectiveState.capabilities, t),
      noteTone: effective.source === "rule_override" ? "changed" : effective.source === "capability_override" || effective.source === "environment" ? "" : tierForRule(rule),
      actions: \`\${override ? \`<button type="button" class="quiet small" data-use-inherited="\${escapeHtml(rule.id)}">\${escapeHtml(t.reset)}</button>\` : ""}\${projectFieldChip(\`destructive_command_protection.overrides.\${rule.id}\`)}\`,
      description: rule.description,
      info,
      disabled
    });
  };
  qs("destructive-command-rules").innerHTML = visible.length === 0 ? \`<p class="empty">\${escapeHtml(t.noCommandProtectionMatch)}</p>\` : commandRuleGroups(visible, t).map((group) => {
    const all = commandRuleGroups(state?.destructiveCommandRules ?? [], t).find((entry) => entry.key === group.key)?.rules ?? [];
    const off = all.filter((rule) => effectiveState.rules[rule.id]?.enabled === false).length;
    return categoryHtml({
      key: \`destructive:\${group.key}\`,
      title: group.title,
      counts: group.key === "always-on" ? escapeHtml(\`\${t.ruleCount(all.length)} · \${t.cannotTurnOff}\`) : \`\${escapeHtml(t.ruleCount(all.length))}\${offCount(off)}\`,
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
  qs("secret-summary").textContent = disabled ? t.secretProtectionOffSummary : t.secretRuleSummary(loaded.secretPatterns.length - offTotal, offTotal);
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
      note: override ? t.changedByYou : rule.defaultOff ? t.offByDefault : null,
      noteTone: override ? "changed" : "",
      actions: \`\${override ? \`<button type="button" class="quiet small" data-secret-reset="\${escapeHtml(rule.id)}">\${escapeHtml(t.reset)}</button>\` : ""}\${projectFieldChip(\`secret_protection.overrides.\${rule.id}\`)}\`,
      description: rule.description ?? (rule.paths ? t.pathCount(rule.paths.length) : ""),
      info: rule.paths ? \`<button type="button" class="info-button" data-secret-paths="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(t.protectedPathsFor(rule.label))}" aria-haspopup="dialog" aria-controls="rule-example-popover">\${icons.info}</button>\` : '<span class="info-spacer"></span>',
      disabled
    });
  };
  qs("secret-patterns").innerHTML = visible.length === 0 ? \`<p class="empty">\${escapeHtml(t.noSecretProtectionMatch)}</p>\` : groupRules(visible).map((group) => {
    const all = loaded.secretPatterns.filter((rule) => rule.category === group.category);
    const on = all.filter((rule) => secretRuleIsActive(rule, overrides)).length;
    const title = secretCategoryNames[group.category] ?? group.category;
    return categoryHtml({
      key: \`secret:\${group.category}\`,
      title,
      counts: \`\${escapeHtml(t.ruleCount(all.length))}\${offCount(on === 0 ? 0 : all.length - on)}\`,
      bulkSwitch: \`<input type="checkbox" class="switch" data-secret-group-active="\${escapeHtml(group.category)}" \${on > 0 ? "checked" : ""} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(t.toggleGroup(title))}" title="\${escapeHtml(t.toggleAll)}">\`,
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
  qs("environment-overrides").textContent = environmentSources.length ? t.environmentRaises(environmentSources.map((source) => source.slice(4)).join(", ")) : "";
  qs("safety-level").innerHTML = Object.entries(presets).map(([level, meta]) => \`<label class="preset-card preset-\${level}"><input type="radio" name="safety-level" value="\${level}" \${draftPolicy.safety.level === level ? "checked" : ""}><span class="preset-name">\${escapeHtml(meta[0])}</span><span class="preset-description">\${escapeHtml(meta[1])}</span></label>\`).join("");
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs("safety-overrides").innerHTML = Object.entries(capabilities).map(([key, meta]) => {
    const value = draftPolicy.safety.overrides[key];
    return \`<div class="setting-row"><label class="setting-text" for="override-\${key}"><strong>\${escapeHtml(meta[0])}</strong><small>\${escapeHtml(meta[1])}</small></label>\${projectFieldChip(\`safety.overrides.\${key}\`)}<select id="override-\${key}" data-safety-override="\${key}">
      <option value="inherit" \${value === undefined ? "selected" : ""}>\${escapeHtml(t.fromPresetOption(inherited[key]))}</option>
      <option value="true" \${value === true ? "selected" : ""}>\${escapeHtml(t.alwaysOn)}</option>
      <option value="false" \${value === false ? "selected" : ""}>\${escapeHtml(t.alwaysOff)}</option>
    </select></div>\`;
  }).join("");
  qs("workflow").innerHTML = \`<div class="setting-row"><label class="setting-text" for="workflow-worktree"><strong>\${escapeHtml(t.worktreeDiscard)}</strong><small>\${escapeHtml(t.worktreeDiscardHelp)}</small></label>\${projectFieldChip("workflow.worktree_mode")}<input type="checkbox" class="switch" id="workflow-worktree" data-workflow-worktree \${draftPolicy.workflow.worktree_mode ? "checked" : ""}></div>\`;
  const customized = (preview?.counts.effectiveCustomizations ?? 0) > 0 || Object.entries(draftPolicy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key]);
  qs("safety-preset-status").textContent = customized ? t.presetCustomized(levelName(draftPolicy.safety.level, t)) : "";
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
          <button type="button" class="quiet icon-only" data-path-list="\${prefix}" data-path-remove="\${index}" \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(t.removePath(path))}">\${icons.remove}</button>
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
        setHint(t.notAdded(additions.join(", "), error));
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
    setHint(duplicates.length ? t.alreadyListed(duplicates.join(", ")) : "");
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
    notify(t.previewFailed, "error", errorText(result));
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
    el.textContent = t.couldNotTest(errorText(result));
    return;
  }
  if (result.data.result === "allowed") {
    el.className = "notice ok";
    el.innerHTML = \`\${t.testerAllowed} <a href="#rules?compose=\${encodeURIComponent(command)}">\${escapeHtml(t.createRuleToBlock)}</a>\`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleHtml = !ruleId ? "" : result.data.customRule ? \`<a class="rule-id" href="#rules?focus=\${encodeURIComponent(ruleId)}">\${escapeHtml(ruleId)}</a>\` : \`<a class="rule-id" href="#policy?q=\${encodeURIComponent(ruleId)}">\${escapeHtml(ruleId)}</a>\`;
  el.className = "notice error";
  el.innerHTML = \`\${t.testerBlocked(ruleHtml)} \${escapeHtml(result.data.reason || "")}\${result.data.segment && result.data.segment !== command ? \`<div class="tester-segment">\${escapeHtml(t.blockedPart)} <code>\${escapeHtml(result.data.segment)}</code></div>\` : ""}\`;
};
var render2 = () => {
  if (!state)
    return;
  const loaded = state;
  draftPolicy = clonePolicy(loaded.policy);
  preview = loaded.preview;
  shared.dirty = false;
  qs("policy-savebar").hidden = true;
  showPath("policy-path", loaded.path, loaded.exists ? "" : t.notCreatedYet);
  const projectPolicy = loaded.projectPolicy;
  qs("project-policy-row").hidden = !projectPolicy;
  showPath("project-policy-path", projectPolicy?.path ?? "");
  qs("project-policy-notice").hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs("project-policy-notice").textContent = projectPolicy ? [t.projectPolicyChanges, ...projectPolicy.weakenings].join(\`
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
    qs("raw-source").textContent = t.rawOnDisk;
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
  const isPolicyShape = isRecordField(parsed) && isRecordField(parsed.safety) && typeof parsed.safety.level === "string" && Object.hasOwn(presets, parsed.safety.level) && isRecordField(parsed.safety.overrides) && isRecordField(parsed.workflow) && isRecordField(parsed.destructive_command_protection) && isRecordField(parsed.destructive_command_protection.overrides) && isOptionalPathList(parsed.destructive_command_protection.allow_paths) && isRecordField(parsed.secret_protection) && isRecordField(parsed.secret_protection.overrides) && isOptionalPathList(parsed.secret_protection.deny_paths) && isOptionalPathList(parsed.secret_protection.allow_paths) && isRecordField(parsed.audit);
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
  notify(t.restoredDraft, "ok");
};
var loadPolicy = async () => {
  const result = await requestJson("/api/policy");
  if (!result.ok || !result.data) {
    notify(t.couldNotLoadPolicy, "error", errorText(result));
    return false;
  }
  state = result.data;
  shared.policy = state;
  render2();
  restoreDraft();
  if (state.errors.length)
    notify(t.statusRepair, "error");
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
  qs("save").textContent = projectDraft ? t.reviewAndApply : t.save;
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
    notify(t.projectPolicyUnavailable, "error", errorText(result));
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await loadPolicy();
    notify(t.repairFirst, "error", [
      t.repairBeforeProject,
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
    notify(t.policyNotLoaded, "error", t.reloadPage);
    return;
  }
  if (state.errors.length) {
    notify(t.repairFirst, "error");
    return;
  }
  if (shared.dirty) {
    if (!await confirmDialog({
      title: t.discardUnsavedTitle,
      body: t.discardBeforeProject,
      confirmLabel: t.discardChanges,
      confirmClass: ""
    }))
      return;
    sessionStorage.removeItem("cc-safety-net-draft");
    if (!await loadPolicy())
      return;
  }
  await ingestProjectState(t.editingProjectPolicy);
};
var confirmDiscardProjectDraft = async (body) => !shared.dirty || await confirmDialog({
  title: t.discardDraftTitle,
  body,
  confirmLabel: t.discardDraft,
  confirmClass: ""
});
var changeProjectDirectory = async () => {
  if (!await confirmDiscardProjectDraft(t.switchFolderDiscards))
    return;
  const result = await requestJson("/api/policy/project/choose-directory", { method: "POST" });
  if (!result.ok) {
    notify(t.folderPickerFailed, "error", errorText(result));
    return;
  }
  if (result.data.error) {
    notify(result.data.error, "error");
    return;
  }
  if (result.data.cancelled)
    return;
  await ingestProjectState(t.editingProjectPolicy);
};
var leaveProjectDraft = async () => {
  if (!projectDraft)
    return;
  if (!await confirmDiscardProjectDraft(t.projectChangesUnwritten))
    return;
  exitProjectDraft();
  if (await loadPolicy())
    notify(t.backToOwnPolicy, "ok");
};
var discardProjectDraft = async (draft) => {
  if (!await confirmDialog({
    title: t.discardDraftChangesTitle,
    body: t.discardDraftChangesBody,
    confirmLabel: t.discardChanges,
    confirmClass: ""
  }))
    return;
  const snapshot = JSON.parse(draft.snapshot);
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  refreshPolicyPreview();
  notify(t.changesDiscarded, "ok");
};
var handleStaleProjectDraft = async () => {
  if (!await ingestProjectState(t.projectDraftReloaded))
    return;
  notify(t.projectFolderChanged, "error", t.projectFolderChangedBody);
};
var projectDiffHtml = (data) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...data.existingFileDiagnostics?.length ? [t.invalidProjectFile] : [],
    ...data.weakenings ?? []
  ];
  return (rows.length === 0 ? \`<p class="empty">\${escapeHtml(t.noEffectiveChange)}</p>\` : \`<table class="diff-table"><thead><tr><th>\${escapeHtml(t.diffSetting)}</th><th>\${escapeHtml(t.diffNow)}</th><th>\${escapeHtml(t.diffAfter)}</th></tr></thead><tbody>\${rows.map((row) => \`<tr><td><code>\${escapeHtml(row.field)}</code></td><td class="diff-before">\${escapeHtml(row.before ?? t.unset)}</td><td class="diff-after">\${escapeHtml(row.after ?? t.unset)}</td></tr>\`).join("")}</tbody></table>\`) + warnings.map((text) => \`<p class="notice warn">\${escapeHtml(text)}</p>\`).join("");
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
    notify(t.reviewFailed, "error", errorText(diff));
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    notify(t.reviewAgain, "error", t.draftChangedDuringReview);
    return;
  }
  if (!await confirmDialog({
    title: t.applyProjectTitle,
    body: t.applyProjectBody,
    detail: draft.path,
    rowsHtml: projectDiffHtml(diff.data),
    confirmLabel: t.applyProject,
    confirmClass: "primary"
  }))
    return;
  await runExclusive(t.applyingStatus, async () => {
    const applied = await requestJson("/api/policy/project/apply", { method: "POST", body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      notify(t.applyFailed, "error", errorText(applied));
      return;
    }
    exitProjectDraft();
    if (await loadPolicy())
      notify(t.projectApplied, "ok", applied.data.path);
  });
};
var save = () => {
  if (!state) {
    notify(t.policyNotLoaded, "error", t.reloadPage);
    return;
  }
  if (state.errors.length) {
    notify(t.repairBeforeSaving, "error");
    return;
  }
  if (projectDraft) {
    reviewProjectDraft(projectDraft);
    return;
  }
  if (!shared.dirty)
    return;
  const policy = collectFormPolicy();
  runExclusive(t.savingStatus, async () => {
    const result = await writePolicy("/api/policy", JSON.stringify(policy), t.saveFailed);
    if (result && await reloadAfterWrite())
      notify(t.policySaved, "ok", result.data.path);
  });
};
var discard = async () => {
  if (projectDraft) {
    await discardProjectDraft(projectDraft);
    return;
  }
  if (!await confirmDialog({
    title: t.discardUnsavedTitle,
    body: t.discardUnsavedBody,
    confirmLabel: t.discardChanges,
    confirmClass: ""
  }))
    return;
  await runExclusive(t.discardingStatus, async () => {
    sessionStorage.removeItem("cc-safety-net-draft");
    if (await loadPolicy())
      notify(t.changesDiscarded, "ok");
  });
};
var repair = async () => {
  if (!state?.errors.length)
    return;
  if (!await confirmDialog({
    title: t.repairTitle,
    body: t.repairBody,
    detail: state.path,
    confirmLabel: t.repair,
    confirmClass: "primary"
  }))
    return;
  await runExclusive(t.repairingStatus, async () => {
    const result = await writePolicy("/api/repair", "{}", t.repairFailed);
    if (result && await reloadAfterWrite())
      notify(t.policyRepaired, "ok", result.data.path);
  });
};
var resetOverrides = async (section) => {
  if (Object.keys(draftPolicy[section].overrides).length === 0) {
    notify(t.nothingToReset, "ok");
    return;
  }
  if (!await confirmDialog({
    title: t.resetRulesTitle,
    body: t.resetRulesBody(section === "secret_protection"),
    confirmLabel: t.resetRules
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
    title: secret ? t.turnOffSecretTitle : t.turnOffCommandTitle,
    body: secret ? t.turnOffSecretBody : t.turnOffCommandBody,
    detail: secret ? undefined : t.catastrophicStillApply,
    confirmLabel: t.turnOff
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
      label: example.catastrophic ? t.alwaysOn : example.category,
      title: example.label,
      description: example.description,
      body: example.example
    });
    return;
  }
  const secretPaths = state?.secretPatterns.find((rule) => rule.id === target.closest("[data-secret-paths]")?.dataset.secretPaths);
  if (secretPaths?.paths) {
    showRulePopover(target.closest("[data-secret-paths]"), {
      label: t.protectedPaths,
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
  qs("raw-copy").innerHTML = \`\${icons.copy}<span>\${escapeHtml(t.copy)}</span>\`;
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
var exampleRequests = {
  suggest: t.exampleSuggestRequest,
  block: t.exampleBlockRequest,
  verify: t.exampleVerifyRequest
};
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
  qs("rules-list").innerHTML = loaded.rulebooks.length === 0 ? loaded.errors.length > 0 ? \`<p class="empty">\${escapeHtml(t.allRulebooksSkipped)}</p>\` : \`<p class="empty">\${t.noCustomRules}</p>\` : loaded.rulebooks.map((rulebook) => \`<section class="rulebook">
    <div class="rulebook-head">
      <strong>\${escapeHtml(rulebook.name)}</strong>
      <span class="count">v\${escapeHtml(rulebook.version)}</span>
      <span>\${rulebook.source === "user" ? t.allProjects : t.thisProject}</span>
      <span>\${t.ruleCount(rulebook.rules.length)}</span>
      \${rulebook.spec === rulebook.name ? "" : \`<code>\${escapeHtml(rulebook.spec)}</code>\`}
    </div>
    <ul class="card rows">\${rulebook.rules.map((rule) => \`<li class="setting-row rulebook-rule\${pendingFocus === rule.name ? " focused" : ""}">
      <div class="rulebook-rule-head"><code class="command">\${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(" "))}</code><code class="rule-id">custom.\${escapeHtml(rule.name)}</code></div>
      <p>\${escapeHtml(rule.reason)}</p>
      <p class="muted">\${t.blocksWhenArgument} \${rule.block_args.map((arg) => \`<code>\${escapeHtml(arg)}</code>\`).join(" ")}</p>
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
    notify(t.customRuleMissing(\`custom.\${pendingFocus}\`), "error");
  pendingFocus = null;
};
var loadRules = async () => {
  requested = true;
  const result = await requestJson("/api/rules");
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs("rules-list").innerHTML = \`<p class="empty">\${escapeHtml(t.couldNotLoadRules(errorText(result)))}</p>\`;
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
  notify(t.folderPickerUnavailable, "error", t.typeFolderInstead(result.ok ? result.data.error : errorText(result)));
};
var copyRulePrompt = async (button) => {
  const request = qs("rules-composer-input").value;
  const projectPath = qs("rules-project-path").value;
  if (!rulesData) {
    notify(t.rulesNotLoaded, "error", t.refreshAndRetry);
    return;
  }
  if (!request.trim()) {
    notify(t.describeRuleFirst, "error");
    return;
  }
  if (scope === "project" && !projectPath.trim()) {
    notify(t.enterProjectFolder, "error");
    return;
  }
  button.disabled = true;
  const copied = await navigator.clipboard.writeText(rulePromptText({ rulesData, rulesScope: scope, projectPath, request })).then(() => true, () => false);
  button.disabled = false;
  if (!copied) {
    notify(t.copyFailed, "error");
    return;
  }
  qs("rules-composer-input").value = "";
  notify(t.promptCopied, "ok", t.pasteIntoAgent);
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
      qs("rules-composer-input").value = exampleRequests[example.dataset.rulesExample ?? ""] ?? "";
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
var savedTheme = guiData.preferences.theme ?? "auto";
var chooseTheme = async (theme) => {
  applyTheme(theme);
  if (await savePreference({ theme })) {
    savedTheme = theme;
    return;
  }
  applyTheme(savedTheme);
};
var renderRetention = () => {
  const days = shared.policy?.policy.audit.retention_days;
  if (days === undefined)
    return;
  qs("retention-days").value = String(days);
  qs("retention-unit").textContent = t.dayUnit(days);
};
var blockedBy = () => (shared.policy?.errors.length ?? 0) > 0 ? t.repairInProtectionsFirst : shared.drafting ? t.leaveProjectDraftFirst : shared.dirty ? t.saveProtectionsFirst : null;
var saveRetentionDays = async (days) => {
  const saved = shared.policy;
  if (!saved)
    return;
  const current = saved.policy.audit.retention_days;
  const problem = !Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS ? t.retentionRange(MIN_AUDIT_RETENTION_DAYS, MAX_AUDIT_RETENTION_DAYS) : blockedBy();
  if (problem) {
    renderRetention();
    notify(t.retentionUnchanged, "error", problem);
    return;
  }
  if (days === current)
    return;
  if (days < current && !await confirmDialog({
    title: t.shortenRetentionTitle(days),
    body: t.shortenRetentionBody(days),
    detail: qs("logs-path").textContent ?? "",
    confirmLabel: t.shortenRetention
  })) {
    renderRetention();
    return;
  }
  await runExclusive(t.savingStatus, async () => {
    const policy = clonePolicy(saved.policy);
    policy.audit.retention_days = days;
    const result = await requestJson("/api/policy", {
      method: "POST",
      body: JSON.stringify(policy)
    });
    if (!isWriteSuccess(result)) {
      renderRetention();
      notify(t.saveFailed, "error", errorText(result));
      return;
    }
    if (!await loadPolicy())
      return;
    limitActivityDays(days);
    await Promise.all([loadOverview(), loadActivity()]);
    notify(t.retentionSaved(days), "ok");
  });
};
var resetPolicy = async () => {
  const saved = shared.policy;
  if (!saved)
    return;
  if (shared.drafting) {
    notify(t.resetUnavailable, "error", t.leaveProjectDraftFirst);
    return;
  }
  if (!await confirmDialog({
    title: t.resetPolicyTitle,
    body: t.resetPolicyBody,
    detail: saved.path,
    confirmLabel: t.resetPolicy
  }))
    return;
  await runExclusive(t.resettingStatus, async () => {
    const result = await requestJson("/api/reset", { method: "POST", body: "{}" });
    if (!isWriteSuccess(result)) {
      notify(t.resetFailed, "error", errorText(result));
      return;
    }
    sessionStorage.removeItem("cc-safety-net-draft");
    if (await loadPolicy())
      notify(t.policyReset, "ok", result.data.path);
  });
};
var initSettings = () => {
  document.querySelectorAll("[data-copy-path]").forEach((button) => {
    button.innerHTML = \`\${icons.copy}<span>\${escapeHtml(t.copy)}</span>\`;
    button.addEventListener("click", () => {
      copyText(button, qs(button.dataset.copyPath ?? "").dataset.path ?? "");
    });
  });
  applyTheme(savedTheme);
  qs("settings-theme").addEventListener("click", (event) => {
    const theme = event.target.closest("[data-theme-choice]")?.dataset.themeChoice;
    if (themes.includes(theme))
      chooseTheme(theme);
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
var translatedAttributes = ["title", "aria-label", "placeholder"];
var translatePage = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t[element.dataset.i18nHtml];
  });
  translatedAttributes.forEach((attribute) => {
    document.querySelectorAll(\`[data-i18n-\${attribute}]\`).forEach((element) => {
      element.setAttribute(attribute, t[element.getAttribute(\`data-i18n-\${attribute}\`)]);
    });
  });
};
var views = {
  overview: [t.navOverview, () => {
    return;
  }],
  activity: [t.navActivity, showActivity],
  policy: [t.navProtections, showPolicy],
  rules: [t.navCustomRules, showRules],
  integrations: [t.navAgents, () => {
    return;
  }],
  settings: [t.navSettings, () => {
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
translatePage();
initConfirmDialog();
initOverview();
initActivity();
initPolicy();
initRules();
initIntegrations();
initSettings();
qs("toast-close").addEventListener("click", () => notify(""));
document.querySelectorAll("[data-language-select]").forEach((select) => {
  select.value = locale;
  select.addEventListener("change", () => {
    const language = select.value;
    if (!locales.includes(language) || language === locale)
      return;
    savePreference({ language }).then((saved) => {
      if (saved)
        location.reload();
      select.value = locale;
    });
  });
});
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
`;var of='<script id="ccsn-data" type="application/json">';function sf(P,G=rf){return G.replace(of,()=>of+JSON.stringify(P).replaceAll("<","\\u003c"))}var Ks="kenryu42/cc-safety-net",Rk=`https://github.com/${Ks}`,gf=1e4,Ek=7,Tk="The project draft directory changed; reload the draft before applying.",Ak="audit settings are user scope only; remove the audit section from a project proposal";async function yf(P,G={}){let K=fn({label:"gui",booleans:{noOpen:["--no-open"]}},P),Y=G.log??console.log,Z=G.error??console.error;if(K.errors.length>0){for(let ie of K.errors)Z(ie);return Z("Usage: cc-safety-net gui [--no-open]"),1}let X=await _k(c,G);if(Y(`CC Safety Net policy GUI: ${X.url}`),!K.flags.noOpen)try{await(G.openBrowser??Bk)(X.url)}catch(ie){Z(`Failed to open browser: ${ie instanceof Error?ie.message:String(ie)}`),Z(`Open this URL manually: ${X.url}`)}if(G.keepAlive===!1)return await X.close(),0;return await Uk(X),0}async function _k(P,G={}){let K=wk(24).toString("base64url"),Y={dir:null,revision:0},Z=xk((ae,ge)=>{Ik(P,ae,ge,K,G,Y)});await new Promise((ae,ge)=>{Z.once("error",ge),Z.listen(0,"127.0.0.1",()=>{Z.off("error",ge),ae()})});let ie=`http://127.0.0.1:${Z.address().port}`;return{origin:ie,token:K,url:`${ie}/?token=${encodeURIComponent(K)}`,close:()=>Mk(Z)}}async function Ik(P,G,K,Y,Z,X){let ie=P(),ae=new URL(G.url??"/","http://127.0.0.1");if(G.method==="GET"&&ae.pathname==="/favicon.ico"){K.writeHead(204,{"cache-control":"no-store"}),K.end();return}if(!jk(G,ae,Y)){tn(K,403,{error:"Forbidden"});return}if(G.method==="GET"&&ae.pathname==="/"){let ge=lf(af(ie,Z));await Promise.resolve(Z.buildDocument?.()).then((ye)=>Hk(K,sf({token:Y,preferences:ge},ye)),(ye)=>tn(K,500,{error:ye instanceof Error?ye.message:String(ye)}));return}if(G.method==="POST"&&ae.pathname==="/api/preferences"){let ge=await Qt(G);if(!ge.ok){tn(K,ge.status,{errors:[ge.error]});return}let ye=nf(ge.value);if(!ye){tn(K,400,{errors:["preferences accept only language (en, ja, zh-CN) and theme (auto, light, dark)"]});return}let Pe=af(ie,Z),Re=tf(lf(Pe),ye),_e=Ok(Pe,Re);tn(K,_e?500:200,_e?{errors:[_e]}:{preferences:Re});return}if(G.method==="GET"&&ae.pathname==="/api/policy"){let ge=Lu(ie,Z),ye=R(ie,Vs(Z));tn(K,200,{...ge,configState:Ke(ye),...ye.policyScopes?{projectPolicy:{path:y(Z.cwd??process.cwd()),weakenings:ye.policyScopes.weakeningsIgnored?[]:ye.policyScopes.weakenings}}:{},destructiveCommandRules:V,secretPatterns:ft,version:un(),preview:ge.errors.length>0?null:ze(ge.policy,ie.env)});return}if(G.method==="POST"&&ae.pathname==="/api/policy/preview"){let ge=await Qt(G);if(!ge.ok){tn(K,ge.status,{errors:[ge.error]});return}let ye=ju(ie,ge.value);tn(K,ye.errors.length>0?400:200,ye);return}if(G.method==="POST"&&ae.pathname==="/api/policy/explain"){let ge=await Qt(G);if(!ge.ok){tn(K,ge.status,{errors:[ge.error]});return}let ye=ge.value;if(ye===null||typeof ye.command!=="string"){tn(K,400,{errors:["command must be a string"]});return}let Pe=Cr(ye.policy,ie.home);if(Pe.length>0){tn(K,400,{errors:Pe});return}tn(K,200,Nk(ie,ye.command,ye.policy,Z));return}if(G.method==="POST"&&ae.pathname==="/api/policy"){let ge=await Qt(G);if(!ge.ok){tn(K,ge.status,{errors:[ge.error]});return}let ye=Hn(ie,ge.value,Z);tn(K,ye.errors.length>0?400:200,ye);return}if(G.method==="POST"&&ae.pathname==="/api/reset"){tn(K,200,Hn(ie,re,Z));return}if(G.method==="POST"&&ae.pathname==="/api/repair"){tn(K,200,Fu(ie,Z));return}if(G.method==="POST"&&ae.pathname==="/api/policy/project/choose-directory"){let ge=await(Z.chooseDirectory??qs)();if("path"in ge)X.dir=ge.path,X.revision+=1;tn(K,200,{cancelled:"cancelled"in ge,..."error"in ge?{error:ge.error}:{}});return}if(G.method==="GET"&&ae.pathname==="/api/policy/project"){let ge=hf(X,Z),ye=vf(ie,ge,Z),Pe=ye?{projection:{},diagnostics:[ye]}:cf(ge,ie.home),Re=xr(ie,Z);tn(K,200,{path:y(ge),revision:X.revision,baseline:Re.baseline,userPolicyDiagnostics:Re.diagnostics,projection:Pe.projection,projectionDiagnostics:Pe.diagnostics,canPickDirectory:Gs(process.platform,process.env)});return}if(G.method==="POST"&&ae.pathname==="/api/policy/project/diff"){let ge=await df(ie,G,K,X,Z);if(!ge)return;let ye=cf(ge.dir,ie.home),Pe=xr(ie,Z).baseline,Re=ne(Pe,me(ge.proposal,ie.home).policy);tn(K,200,{rows:Ro(ne(Pe,ye.projection).policy,Re.policy,!1),weakenings:Re.weakenings,existingFileDiagnostics:ye.diagnostics});return}if(G.method==="POST"&&ae.pathname==="/api/policy/project/apply"){let ge=await df(ie,G,K,X,Z);if(!ge)return;let ye=Dk(ge.dir,ge.proposal,ie.home);tn(K,ye.errors.length>0?500:200,ye);return}if(G.method==="GET"&&ae.pathname==="/api/activity"){let ge=se(ie,Z),ye=Lk(ae.searchParams.get("days"),ge);if(ye===null){tn(K,400,{error:`days must be an integer between 1 and ${ge}`});return}tn(K,200,Jp(ie,ye,Z.activityLogsDir));return}if(G.method==="POST"&&ae.pathname==="/api/rules/choose-directory"){tn(K,200,await qs());return}if(G.method==="GET"&&ae.pathname==="/api/rules"){let ge=te(ie,Vs(Z)),ye=new Map(ge.rules.map((Pe)=>[Pe.name,Pe]));tn(K,200,{projectPath:Z.cwd??process.cwd(),canPickDirectory:Gs(process.platform,process.env),rulebooks:ge.rulebooks.map((Pe)=>({source:Pe.source,spec:Pe.spec,name:Pe.name,version:Pe.version,rules:Pe.rules.flatMap((Re)=>{let _e=ye.get(Re);if(!_e)return[];return[{name:_e.name,command:_e.command,subcommand:_e.subcommand,block_args:_e.block_args,reason:_e.reason}]})})),errors:ge.errors,warnings:ge.warnings});return}if(G.method==="GET"&&ae.pathname==="/api/star/context"){tn(K,200,await(Z.fetchStarContext??(()=>zk(ie,{logsDir:Z.activityLogsDir})))());return}if(G.method==="POST"&&ae.pathname==="/api/star"){let ge=await(Z.starRepo??Gk)();tn(K,200,ge.ok?{ok:!0}:{ok:!1,fallbackUrl:Rk});return}if(G.method==="GET"&&ae.pathname==="/api/integrations"){tn(K,200,await(Z.fetchIntegrations??(()=>qk(ie)))());return}if(G.method==="GET"&&ae.pathname==="/api/health"){tn(K,200,await(Z.fetchHealth??Kk)());return}if(G.method==="POST"&&(ae.pathname==="/api/install"||ae.pathname==="/api/uninstall")){let ge=await Qt(G);if(!ge.ok){tn(K,ge.status,{errors:[ge.error]});return}let ye=ge.value?.target;if(typeof ye!=="string"||!On.some((Re)=>Re.target===ye)){tn(K,400,{error:"unknown target"});return}let Pe=ae.pathname==="/api/install"?"install":"uninstall";tn(K,200,await(Z.runIntegration??Jk)(Pe,ye));return}tn(K,404,{error:"Not found"})}function af(P,G){return Pk(mf(ue(P,G)),"gui.json")}function lf(P){if(!ff(P))return{};try{return ef(JSON.parse(Ck(P,"utf-8")))}catch{return{}}}function Ok(P,G){try{return kk(mf(P),{recursive:!0}),sn(P,`${JSON.stringify(G,null,2)}
`),null}catch(K){return K instanceof Error?K.message:String(K)}}function Vs(P){return{...P,cwd:P.cwd??process.cwd()}}function hf(P,G){return P.dir??G.cwd??process.cwd()}function vf(P,G,K){if(!O(P,{...K,cwd:G}))return null;return`${y(G)} is the user policy, not a project policy; choose a project directory, or run the GUI from one`}function cf(P,G){let K=y(P),Y=ff(K)?$t(K):{value:void 0,errors:[]},Z=me(Y.value,G);return{projection:Z.policy,diagnostics:[...Y.errors,...Z.diagnostics]}}async function df(P,G,K,Y,Z){let X=hf(Y,Z),ie=Y.revision,ae=await Qt(G);if(!ae.ok)return tn(K,ae.status,{errors:[ae.error]}),null;let ge=ae.value;if(typeof ge?.revision!=="number")return tn(K,400,{errors:["revision must be a number"]}),null;if(ge.revision!==ie)return tn(K,409,{errors:[Tk]}),null;let ye=vf(P,X,Z);if(ye)return tn(K,400,{errors:[ye]}),null;let Pe=$k(ge.proposal,P.home);if(Pe.length>0)return tn(K,400,{errors:Pe}),null;return{dir:X,proposal:ge.proposal}}function $k(P,G){let K=Cr(P,G);if(K.length>0)return K;return P?.audit===void 0?[]:[Ak]}function Dk(P,G,K){let Y=y(P),Z=Eo(G,k(G,K));try{return h(i(w(P,"project policy"),Y),`${JSON.stringify(Z,null,2)}
`),{path:Y,errors:[]}}catch(X){return{path:Y,errors:[X instanceof Error?X.message:String(X)]}}}function Nk(P,G,K,Y){let Z=k(K,P.home),X=R(P,Vs(Y)),ie=Me({rules:X.policy.rules,transparentWrappers:X.policy.transparentWrappers,commandTools:X.policy.commandTools,safety:qe(Z.safety),worktreeMode:Z.workflow.worktree_mode,destructiveCommandProtectionEnabled:Z.destructive_command_protection.enabled,destructiveCommandRuleOverrides:Z.destructive_command_protection.overrides,destructiveCommandAllowPaths:Z.destructive_command_protection.allow_paths,secretProtection:{enabled:Z.secret_protection.enabled,disabledRules:ht(Z.secret_protection.overrides),denyPaths:Z.secret_protection.deny_paths,allowPaths:Z.secret_protection.allow_paths}});return gr(G,{policySnapshot:ie,cwd:Y.cwd,userConfigDir:Y.userConfigDir},P)}function Lk(P,G){if(P===null)return Math.min(Ek,G);let K=Number(P);if(!Number.isInteger(K)||K<1||K>G)return null;return K}function jk(P,G,K){if(G.searchParams.get("token")!==K)return!1;if(P.method!=="POST")return!0;return P.headers["x-cc-safety-net-token"]===K}var Fk=1048576;async function Qt(P){let G=[],K=0;for await(let Y of P){let Z=Y;if(K+=Z.byteLength,K>Fk)return{ok:!1,status:413,error:"Request body is too large"};G.push(Z)}try{return{ok:!0,value:JSON.parse(Buffer.concat(G).toString("utf-8")||"{}")}}catch(Y){return{ok:!1,status:400,error:`Invalid JSON: ${Y instanceof Error?Y.message:String(Y)}`}}}function Hk(P,G){P.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),P.end(G)}function tn(P,G,K){P.writeHead(G,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),P.end(JSON.stringify(K))}function Mk(P){return new Promise((G,K)=>{P.close((Y)=>Y?K(Y):G())})}function Uk(P){return new Promise((G)=>{let K=()=>{process.off("SIGINT",Y),process.off("SIGTERM",Y)},Y=()=>{K(),P.close().then(G)};process.once("SIGINT",Y),process.once("SIGTERM",Y)})}function Bk(P){let G=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",K=process.platform==="win32"?["/c","start","",P]:[P];return new Promise((Y,Z)=>{let X=pf(G,K,{detached:!0,stdio:"ignore"}),ie=(ge)=>{X.off("spawn",ae),Z(ge)},ae=()=>{X.off("error",ie),X.unref(),Y()};X.once("error",ie),X.once("spawn",ae)})}async function Gk(P="gh",G=gf){return{ok:await Wk(P,["api","-X","PUT",`/user/starred/${Ks}`],G)===0}}async function qk(P,G={}){let K=await Nr((Z)=>Jt({environment:P,cwd:process.cwd(),openCodeVersion:Z}).status!=="n/a",G.fetcher),Y=Vk(P,K);return{targets:Sn.map((Z)=>{let X=Y.find((ie)=>ie.platform===Z.id);return{target:Z.id,label:ln(Z.id),version:K.versions[Z.id]??null,status:X?.configured?"active":X?.detected?"disabled":X?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:K.version,nodeVersion:K.nodeVersion,platform:K.platform}}}function Vk(P,G){return zt(P,process.cwd(),{ampPluginListOutput:G.ampPluginListOutput,codexPluginListOutput:G.codexPluginListOutput,copilotCliVersion:G.versions["copilot-cli"],openCodeVersion:G.versions.opencode,openCodePluginListOutput:G.openCodePluginListOutput})}async function Kk(P={}){let G=await(P.checkUpdates??Bn)();return{update:{latestVersion:G.latestVersion??null,updateAvailable:G.updateAvailable}}}var uf=Promise.resolve();function Jk(P,G,K={}){let Y=async()=>{let X=[],{log:ie,error:ae}=console;console.log=(...ge)=>X.push(ge.map(String).join(" ")),console.error=console.log;try{return{ok:await kr(P,[],{selectTargets:async()=>[G],output:new Sk({write(ye,Pe,Re){X.push(String(ye).replace(/\n$/,"")),Re()}}),...K})===0,output:X.join(`
`)}}finally{console.log=ie,console.error=ae}},Z=uf.then(Y);return uf=Z.then(()=>{return},()=>{return}),Z}async function zk(P,G={}){let[K,Y]=await Promise.all([Yk(G.fetchRepo),Promise.resolve(Ir(P,se(P),G.logsDir).totalBlocked)]);return{starCount:K,blockedTotal:Y}}function Wk(P,G,K){return new Promise((Y)=>{let Z=pf(P,G,{stdio:"ignore",windowsHide:!0}),X=!1,ie=setTimeout(()=>{Z.kill(),ae(null)},K),ae=(ge)=>{if(X)return;X=!0,clearTimeout(ie),Y(ge)};Z.once("error",()=>ae(null)),Z.once("close",ae)})}async function Yk(P=fetch){try{let G=await P(`https://api.github.com/repos/${Ks}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(gf)});if(!G.ok)return null;let K=await G.json();return typeof K.stargazers_count==="number"?K.stargazers_count:null}catch{return null}}function Zk(P){if(P[0]!=="help")return!1;let G=P[1];if(!G)ys(),process.exit(0);if(yr(G))process.exit(0);console.error(`Unknown command: ${G}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var Xk={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),yr("hook",console.error),process.exit(1)},install:async(P)=>{process.exit(await kr("install",P))},update:async(P)=>{process.exit(await Is(P))},uninstall:async(P)=>{process.exit(await kr("uninstall",P))},rule:async(P)=>{process.exit(await qp(c(),P))},policy:async(P)=>{process.exit(await Bu(c(),P))},status:async(P)=>{if($n(fn({label:"status"},P).errors))process.exit(1);Kp(c())},statusline:async(P)=>{let G=fn({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},P);if(G.errors.length===0&&G.flags.claudeCode){await Bs(c());return}if($n(G.errors),!G.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");yr("statusline",console.error),process.exit(1)},doctor:async(P)=>{let G=as(P);if(!G)process.exit(1);let K=await nd(c(),{json:G.json,skipUpdateCheck:G.skipUpdateCheck});process.exit(K)},logs:async(P)=>{process.exit(await ea(c(),P))},gui:async(P)=>{process.exit(await yf(P))},explain:async(P)=>{process.exit(await pd(c(),P))}};async function Qk(P){let G=fn({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},P);if(Zk(P))return;let K=P[0],Y=K?_r(K):void 0;if(G.help&&Y&&Y.name!=="rule")yr(Y.name),process.exit(0);if(!K||G.help&&!Y)ys(),process.exit(0);if(G.flags.version)gd(),process.exit(0);if(Y){await Xk[Y.name](P.slice(1));return}if(K==="--statusline"){await Bs(c());return}console.error(K.startsWith("-")?`Unknown option: ${K}`:`Unknown command: ${K}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{Qk as runCli};
