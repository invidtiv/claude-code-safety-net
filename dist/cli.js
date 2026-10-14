import{a,s,Le,tt,T,yt,nt,c,n,rt,P,S,fe,xt,m,Pe,x,it,l,o,w,i,se,r,g,ge,H,St,wt,p,he,ye,Ct,M,Z,ae,C,Et,I,h,Ie,W,u,O,X,st,at,F,E,D,be,xe,Fe,ce,d,e,$e,Ae,Ue,ve,ct,lt,le,Oe,ue,je,Q,B,Ge,Se,z,ut,V,ee,te,de,dt,pt,k,A,He,ft,Be,R,ze,De,Ve,y,t,ne,we,b,v,N,kt,qe,Ke,f,q}from"./chunks/index-fndd4mn1.js";import{Xe}from"./chunks/index-qk8wjyxs.js";import{Je,Ee}from"./chunks/index-apjc6n0e.js";import{Qe}from"./chunks/index-atehy4af.js";import"./chunks/index-nffhn8hh.js";import{oe,K,et,j,G}from"./chunks/index-q156h1vc.js";var af=["-h","--help"];function mn(_,L){let U=Object.entries(_.booleans??{}),J=Object.entries(_.values??{}),Y=Object.entries(_.lists??{}),re=Object.fromEntries(U.map(([Ne])=>[Ne,!1])),ie={},pe=Object.fromEntries(Y.map(([Ne])=>[Ne,[]])),me=[],ke=[],Ce=!1,Re=-1;for(let[Ne,_e]of L.entries()){if(Ne<=Re)continue;if(_e==="--"){me.push(...L.slice(Ne+1));break}if(af.includes(_e)){Ce=!0;continue}let Te=U.find(([,Ye])=>Ye.includes(_e));if(Te){re[Te[0]]=!0;continue}let We=J.find(([,Ye])=>Ye.includes(_e));if(We){let Ye=L[Ne+1];if(Ye===void 0||Ye.startsWith("-")){ke.push(`${_e} requires a value`);continue}ie[We[0]]=Ye,Re=Ne+1;continue}let Me=Y.find(([,Ye])=>Ye.includes(_e));if(Me){let Ye=L.slice(Ne+1),tn=Ye.findIndex((an)=>an.startsWith("-")),on=Ye.slice(0,tn===-1?Ye.length:tn);if(on.length===0){ke.push(`${_e} requires at least one value`);continue}pe[Me[0]]=[...pe[Me[0]]??[],...on],Re=Ne+on.length;continue}if(_e.startsWith("-")){ke.push(`Unknown option for ${_.label}: ${_e}`);continue}if(_.positionals==="tail"){me.push(...L.slice(Ne));break}me.push(_e)}if(_.positionals!=="list"&&_.positionals!=="tail")ke.push(...me.map((Ne)=>`Unexpected argument for ${_.label}: ${Ne}`));return{flags:re,values:ie,lists:pe,positionals:me,help:Ce,errors:ke}}function $n(_){for(let L of _)console.error(L);return _.length>0}import{readdirSync as mf,statSync as Js,unlinkSync as gf}from"node:fs";import{basename as Ws,dirname as yf,isAbsolute as hf,join as vf,relative as bf,resolve as wf,sep as kf}from"node:path";var qs=(_)=>{let L=Date.now()-new Date(_).getTime();if(!Number.isFinite(L))return"";let U=Math.floor(L/60000),J=Math.floor(U/60),Y=Math.floor(J/24);if(Y>0)return`${Y}d ago`;if(J>0)return`${J}h ago`;if(U>0)return`${U}m ago`;return"just now"},Uo=(_)=>{let L=(_??"").trim().split(/\s+/).filter((Y)=>Y&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(Y)),U=L[0]?.split("/").pop();if(!U)return null;let J=L[1];return J&&/^[a-z][a-z0-9-]*$/.test(J)?`${U} ${J}`:U};function Vs(_){let L=(Y)=>`${Y.sessionId}
${Uo(Y.segment||Y.command)}`,U=_.filter((Y)=>Y.decision!=="allow"),J=U.filter((Y)=>Y.sessionId).reduce((Y,re)=>Y.set(L(re),(Y.get(L(re))??0)+1),new Map);return new Set(U.filter((Y)=>Y.failureStage||(J.get(L(Y))??0)>=2))}import{existsSync as lf,readdirSync as cf,readFileSync as df}from"node:fs";import{join as uf}from"node:path";function Yn(_,L){try{return cf(_,{withFileTypes:!0,encoding:"utf8"}).flatMap((U)=>{let J=uf(_,U.name);if(U.isDirectory())return Yn(J,L);if(U.name.endsWith(".jsonl"))return[J];return[]})}catch{if(L&&lf(_))L.count++;return[]}}var pf=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function ff(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let L=_;if(typeof L.ts!=="string"||typeof L.command!=="string")return!1;return pf.every((U)=>L[U]===void 0||typeof L[U]==="string")}function $t(_,L){try{return df(_,"utf-8").split(`
`).filter(Boolean).flatMap((U)=>{try{let J=JSON.parse(U);if(!ff(J)){if(L)L.count++;return[]}return[J]}catch{if(L)L.count++;return[]}})}catch{if(L)L.count++;return[]}}function gn(_){return Array.from(_,(L)=>{let U=L.charCodeAt(0);if(U<=31||U>=127&&U<=159)return`\\x${U.toString(16).padStart(2,"0")}`;return L}).join("")}function Cf(_,L){let U=oe(_),J=mn({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},L);if($n(J.errors))return null;if(J.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(J.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let Y=J.values.limit===void 0?20:Ks(J.values.limit);if(Y===null)return console.error("--limit must be a positive number"),null;let re=J.values.since===void 0?Math.min(30,U):Ks(J.values.since);if(re===null||re>U)return console.error(`--since must be a positive number of days no greater than ${U}`),null;let ie={limit:Y,limitExplicit:J.values.limit!==void 0,since:re,sinceExplicit:J.values.since!==void 0,all:J.flags.all,json:J.flags.json,suspect:J.flags.suspect,pruneLegacy:J.flags.pruneLegacy,dryRun:J.flags.dryRun,id:J.values.id,agent:J.values.agent,rule:J.values.rule,session:J.values.session,project:J.values.project===void 0?void 0:wf(J.values.project)};if(ie.id&&(ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.sinceExplicit||ie.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ie.pruneLegacy&&(ie.id!==void 0||ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.all||ie.sinceExplicit||ie.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ie.dryRun&&!ie.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ie}async function zs(_,L,U={}){let J=Cf(_,L);if(!J)return 1;let Y=U.logsDir??j(_);if(J.pruneLegacy)return xf(Y,J.json,J.dryRun);if(!Y)return console.log(J.json?"[]":J.id?`No retained audit log entry found for id ${gn(J.id)}.`:"No audit log entries found."),0;K(_,Y);let re={count:0},ie=Yn(Y,re).flatMap((Re)=>$t(Re,re).map((Ne)=>({entry:Ne,file:Re})));if(re.count>0)console.error(`warning: ${re.count} audit log ${re.count===1?"source":"sources"} could not be read; these results are incomplete`);if(J.id)return Rf(ie,J,U.timeZone);let pe=Date.now()-J.since*24*60*60*1000,me=ie.filter((Re)=>_f(Re,J,Y,pe)),ke=J.suspect?Vs(me.map((Re)=>Re.entry)):null,Ce=(ke?me.filter((Re)=>ke.has(Re.entry)):me).sort((Re,Ne)=>Date.parse(Ne.entry.ts)-Date.parse(Re.entry.ts)).slice(0,J.limit);if(J.json)return console.log(JSON.stringify(Ce.map((Re)=>Re.entry),null,2)),0;if(Ce.length===0)return console.log("No audit log entries found."),0;for(let Re of Ce)console.log(Af(Re.entry,U.timeZone));return 0}function xf(_,L,U){let J=_?Pf(_).map((pe)=>vf(_,pe)):[];if(U)return Sf(J,L);let Y=[],re=0,ie=0;for(let pe of J){let me=Js(pe,{throwIfNoEntry:!1})?.size??0,ke=Ef(pe);if(ke){Y.push(`${Ws(pe)}: ${ke}`);continue}re++,ie+=me}if(L)return console.log(JSON.stringify({removedFiles:re,removedBytes:ie,failedFiles:Y.length})),Y.length===0?0:1;console.log(re===0&&Y.length===0?"No legacy audit log files found.":`Removed ${re} legacy audit log ${re===1?"file":"files"} (${Ys(ie)}).`);for(let pe of Y)console.error(`Could not remove ${gn(pe)}`);if(console.log("Nested v2 audit logs were not changed."),re>0)console.log("This deletion cannot be undone.");return Y.length===0?0:1}function Sf(_,L){let U=_.reduce((J,Y)=>J+(Js(Y,{throwIfNoEntry:!1})?.size??0),0);if(L)return console.log(JSON.stringify({dryRun:!0,files:_.length,bytes:U})),0;if(console.log(_.length===0?"No legacy audit log files found.":`Would remove ${_.length} legacy audit log ${_.length===1?"file":"files"} (${Ys(U)}).`),console.log("Nested v2 audit logs are not included."),_.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function Pf(_){try{return mf(_,{withFileTypes:!0}).filter((L)=>L.isFile()&&L.name.endsWith(".jsonl")).map((L)=>L.name)}catch{return[]}}function Ef(_){try{return gf(_),null}catch(L){return L instanceof Error?L.message:String(L)}}function Ys(_){let L=["B","KiB","MiB","GiB"],U=Math.min(Math.floor(Math.log2(Math.max(_,1))/10),L.length-1);return`${Math.round(_/1024**U*10)/10} ${L[U]}`}function Rf(_,L,U){let J=_.filter((re)=>re.entry.id===L.id);if(J.length>1)return console.error(`Multiple audit log entries found for id ${gn(L.id??"")}.`),1;if(L.json)return console.log(JSON.stringify(J.map((re)=>re.entry),null,2)),0;let Y=J[0];if(!Y)return console.log(`No retained audit log entry found for id ${gn(L.id??"")}.`),0;return console.log(Of(Y.entry,U)),0}function _f(_,L,U,J){if(!L.all&&_.entry.decision==="allow")return!1;if(Date.parse(_.entry.ts)<J)return!1;if(L.agent!==void 0&&_.entry.agent!==L.agent)return!1;if(L.rule!==void 0&&_.entry.ruleId!==L.rule)return!1;if(L.session!==void 0&&!Tf(_,U,L.session))return!1;if(L.project!==void 0&&!If(_.entry.cwd,L.project))return!1;return!0}function Tf(_,L,U){if(_.entry.sessionId===U)return!0;return yf(_.file)===L&&Ws(_.file,".jsonl")===U}function If(_,L){if(!_)return!1;let U=bf(L,_);return U!==".."&&!U.startsWith(`..${kf}`)&&!hf(U)}function Af(_,L){let U=gn(_.id??"-"),J=gn(_.decision??"deny"),Y=_.cwd?`  [${gn(_.cwd)}]`:"",re=_.segment||_.command,ie=re===_.command?"":"↳ ",pe=re.length>50?`${re.slice(0,50)}…`:re;return`${U.padEnd(16)}  ${gn(Zs(_.ts,L))}  ${J.padEnd(5)}  ${gn(_.agent??"-").padEnd(15)}  ${gn(_.ruleId??"-").padEnd(20)}  ${ie}${gn(pe)}${Y}`}function Of(_,L){let U=(Y)=>gn(Y===void 0||Y===null||Y===""?"-":Y),J=_.shape?`${_.agent??"-"} (shape: ${_.shape})`:_.agent??"-";return[`id:        ${U(_.id)}`,`ts:        ${U(Zs(_.ts,L))}`,`decision:  ${U(_.decision)}`,`agent:     ${U(J)}`,`level:     ${U(_.level)}`,`tool:      ${U(_.toolName)}`,`rule:      ${U(_.ruleId)}`,`intent:    ${U(_.intent)}`,`stage:     ${U(_.failureStage)}`,`error:     ${U(_.errorCode)}`,`session:   ${U(_.sessionId)}`,`cwd:       ${U(_.cwd)}`,`version:   ${U(_.v)}`,`truncated: ${U(_.truncated===!0?"yes":void 0)}`,`reason:    ${U(_.reason)}`,`command:   ${U(_.command)}`,`segment:   ${U(_.segment)}`].join(`
`)}function Zs(_,L){let U=new Date(_);if(Number.isNaN(U.getTime()))return _;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:L}).format(U)}function Ks(_){let L=Number(_);return Number.isFinite(L)&&L>0?L:null}var Xs={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var Qs={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var ea={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var Go=["npx","--offline","--no-install","@deepseek-ai/dsh","--version"],na=["cursor-agent","--version"],ta=[{id:"antigravity-cli",displayName:"Antigravity CLI",runtime:{flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",runtime:{displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",runtime:{flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",runtime:{flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",runtime:{flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",runtime:{flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",runtime:{flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",runtime:{flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",install:{flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",install:{flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",install:{flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",runtime:{flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"deepseek-harness",displayName:"DeepSeek Harness",install:{flag:"--deepseek-harness",artifactKind:"package",probeCommand:Go}},{id:"devin",displayName:"Devin CLI",runtime:{flags:["-dv","--devin"],description:"Run as Devin CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--devin",artifactKind:"hook config",probeCommand:["devin","--version"]}},{id:"droid",displayName:"Factory Droid",runtime:{flags:["-fd","--droid"],description:"Run as Factory Droid PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--droid",artifactKind:"hook config",probeCommand:["droid","--version"]}},{id:"amp",displayName:"Amp Code",install:{flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],Bo=ta.slice().sort((_,L)=>_.displayName.localeCompare(L.displayName,"en")),Er=Bo.map((_)=>_.id).sort((_,L)=>Number(L==="claude-code")-Number(_==="claude-code")),Xt=Bo.filter((_)=>("runtime"in _)).map((_)=>({id:_.id,displayName:"displayName"in _.runtime?_.runtime.displayName:_.displayName,flags:_.runtime.flags,legacyFlags:"legacyFlags"in _.runtime?_.runtime.legacyFlags:[],description:_.runtime.description,legacyTopLevelFlags:_.runtime.legacyTopLevelFlags})),En=Bo.map((_)=>({id:_.id,..._.install})),$f=Object.fromEntries(ta.map((_)=>[_.id,_.displayName]));function cn(_){return $f[_]}var Df=Xt.map((_)=>({flags:_.flags.join(", "),description:_.description})),Nf=Xt.flatMap((_)=>_.flags.map((L)=>`cc-safety-net hook ${L}`)),ra={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...Df,{flags:"-h, --help",description:"Show this help"}],examples:Nf};var oa={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...En.map((_)=>({flags:_.flag,description:`Install ${cn(_.id)} ${_.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...En.map((_)=>`cc-safety-net install ${_.flag}`)]},ia={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...En.map((_)=>({flags:_.flag,description:`Uninstall ${cn(_.id)} ${_.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...En.map((_)=>`cc-safety-net uninstall ${_.flag}`)]},sa={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var aa={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var Rr={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var qo=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],Vo=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],Dt={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"tool add <name...> [--cwd-arg <name>] [--project]",description:"Analyze community shell tools (user scope by default)"},{usage:"tool remove <name...> [--project]",description:"Stop analyzing declared tools"},{usage:"tool list",description:"List declared command tools in both scopes"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},{flags:"--project",description:"Use project-scope rule config with rule tool"},{flags:"--cwd-arg",argument:"<name>",description:"Name the working-directory argument with rule tool add"},...qo.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk","cc-safety-net rule tool add ops_bash","cc-safety-net rule tool add ops_run_background --cwd-arg cwd --project",...Vo,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var la={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var ca={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var _r=[la,Xs,aa,Qs,Dt,Rr,oa,sa,ia,ra,ea,ca];function Lf(_){return _.aliases??[]}function Tr(_){let L=_.toLowerCase();return _r.find((U)=>U.name.toLowerCase()===L||Lf(U).some((J)=>J.toLowerCase()===L))}import{existsSync as Th}from"node:fs";import{basename as jf}from"node:path";function Ir(_,L=7,U=j(_)){let J=Date.now()-L*24*60*60*1000,Y=[],re=new Set,ie=0,pe,me,ke,Ce;if(U)K(_,U);let Re={count:0},Ne=U?Yn(U,Re):[];for(let Te of Ne)for(let We of $t(Te,Re)){if(We.decision==="allow")continue;let Me=new Date(We.ts).getTime();if(Me>=J){if(ie++,re.add(We.sessionId??jf(Te,".jsonl")),me===void 0||Me<=me)pe=We.ts,me=Me;if(Ce===void 0||Me>Ce)ke=We.ts,Ce=Me;Hf(Y,We,Me)}}let _e=Y.map((Te)=>({timestamp:Te.ts,command:Te.command,reason:Te.reason,relativeTime:qs(new Date(Te.ts))}));return{totalBlocked:ie,sessionCount:re.size,recentEntries:_e,oldestEntry:pe,newestEntry:ke,unreadable:Re.count}}function Hf(_,L,U){let J=_.findIndex((Y)=>U>new Date(Y.ts).getTime());if(J===-1){if(_.length<3)_.push(L);return}if(_.splice(J,0,L),_.length>3)_.pop()}import{dirname as Yf}from"node:path";import{dirname as Ff,join as Mf,resolve as Uf}from"node:path";var Gf="config.json";function bn(_,L,U,J){g(Bf(_),`${JSON.stringify(L,null,2)}
`,U,J)}function Bf(_){return typeof _==="string"?se(_):_}function Jo(_){return{errors:le(Vf(_),": "," "),ruleNames:new Set(je(_).map((L)=>L.toLowerCase()))}}var qf="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",da="must match pattern (letters, numbers, hyphens, underscores)";function Vf(_){if(!ua(_))return[e([],"Config must be an object")];return[..._.version===1?[]:[e(["version"],"must be 1")],...Kf(_.rules)]}function Kf(_){if(_===void 0)return[];if(!Array.isArray(_))return[e(["rules"],"must be an array")];return[..._.flatMap((L,U)=>ua(L)?Jf(L,["rules",U]):[e(["rules",U],"must be an object")]),...$e(_)]}function Jf(_,L){return[...Ko(_.name,[...L,"name"],"required string",p,qf),...Ko(_.command,[...L,"command"],"required string",E,da),..._.subcommand===void 0?[]:Ko(_.subcommand,[...L,"subcommand"],"must be a string if provided",E,da),...Wf(_.block_args,[...L,"block_args"]),...zf(_.reason,[...L,"reason"]),..._.intent===void 0||Oe(_.intent)?[]:[e([...L,"intent"],Ae)]]}function Ko(_,L,U,J,Y){if(typeof _!=="string")return[e(L,U)];return J.test(_)?[]:[e(L,Y)]}function Wf(_,L){if(!Array.isArray(_))return[e(L,"required array")];if(_.length===0)return[e(L,"must have at least one element")];return _.flatMap((U,J)=>{if(typeof U!=="string")return[e([...L,J],"must be a string")];return U===""?[e([...L,J],"must not be empty")]:[]})}function zf(_,L){if(typeof _!=="string")return[e(L,"required string")];if(_==="")return[e(L,"must not be empty")];return _.length>D?[e(L,`must be at most ${D} characters`)]:[]}function ua(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function Wo(_){let L=pa(_);if(!L.ok)return L.result;return Jo(L.parsed)}function pa(_){let L=[],U=new Set;try{let J=typeof _==="string"?se(_):_,Y=r(J);if(Y===null)return L.push(`File not found: ${J.path}`),{ok:!1,result:{errors:L,ruleNames:U}};if(!Y.trim())return L.push("Config file is empty"),{ok:!1,result:{errors:L,ruleNames:U}};return{ok:!0,parsed:JSON.parse(Y)}}catch(J){if(J instanceof o)return L.push(J.message),{ok:!1,result:{errors:L,ruleNames:U}};let Y=J instanceof Error?J.message:String(J);return L.push(J instanceof SyntaxError?"Invalid JSON":Y),{ok:!1,result:{errors:L,ruleNames:U}}}}function Nt(_){return Uf(_,".safety-net.json")}function Un(_){let L=pa(_);if(!L.ok)return L.result;let U=ct(L.parsed);return{errors:U.errors,ruleNames:U.sources}}function Lt(_,L={}){return Mf(Ff(Ie(_,L)),Gf)}function fa(_,L,U){let J;try{if(r(L)===null)return{path:_,exists:!1,valid:!1,ruleCount:0};J=Un(L),J.errors.push(...B(_,U))}catch(Y){if(!(Y instanceof o))throw Y;J={errors:[Y.message],ruleNames:new Set}}return{path:_,exists:!0,valid:J.errors.length===0,ruleCount:J.ruleNames.size,...J.errors.length>0?{errors:J.errors}:{}}}function Zf(_,L){return{source:L,name:_.name,command:_.command,subcommand:_.subcommand,blockArgs:[..._.block_args],reason:_.reason}}function ma(_,L){let U=W(_),J=I(L),Y=Yf(U),re=Q(_,{cwd:L,userConfigPath:U,projectConfigPath:J,userConfigDir:Y}),ie=X(_,{cwd:L,userConfigPath:U,projectConfigPath:J,userConfigDir:Y}),pe=new Map(re.rulebooks.flatMap((me)=>me.rules.map((ke)=>[ke,me.source])));return{userConfig:fa(U,ie.userConfigTarget,ie.userScope),projectConfig:fa(J,ie.projectConfigTarget,ie.projectScope),effectiveRules:re.rules.map((me)=>Zf(me,pe.get(me.name)??"project"))}}var Xf=[{flag:n.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:n.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:n.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:n.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:n.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:n.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:n.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:n.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"},{flag:n.projectTightenOnly,description:"Ignore project policy settings that weaken the user policy",defaultBehavior:"off"}];function ga(_){return[...Xf.map((L)=>({name:L.flag.name,value:fe(L.flag,_.env),isSet:xt(L.flag,_.env),legacyName:L.flag.legacyName,legacyValue:L.flag.legacyName?_.env.get(L.flag.legacyName):void 0,legacyIsSet:L.flag.legacyName?_.env.get(L.flag.legacyName)!==void 0:void 0,description:L.description,defaultBehavior:L.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:_.env.get("CC_SAFETY_NET_HOME"),isSet:_.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var ya={error:0,warning:1,info:2},Qf=["policy","config","audit"];function em(_){return _.map((L)=>{if(L==="ownership")return"is not owned by the current user";if(L==="permissions")return"has unsafe permissions";if(L==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var nm=[{derive:(_)=>_.hooks.length>0&&_.hooks.every((L)=>!L.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(_)=>_.hooks.filter((L)=>L.inspectionStatus==="failed").map((L)=>{let U=cn(L.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${U} inspection failed`,detail:`Doctor could not verify the ${U} integration configuration.`,fixHint:`Correct the reported ${U} configuration error, then run \`cc-safety-net doctor\` again.`,integration:L.platform}})},{derive:(_)=>_.userConfig.exists&&!_.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.userConfig.path}]:[]},{derive:(_)=>_.projectConfig.exists&&!_.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.projectConfig.path}]:[]},{derive:(_)=>_.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${_.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(_)=>_.v2Leftovers&&_.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${_.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(_)=>_.legacyConfigs&&_.legacyConfigs.length>0?[{checkId:"config.legacy-ignored",severity:"warning",title:"Legacy inline rule configs are ignored",detail:`CC Safety Net no longer loads these files, so their rules enforce nothing: ${_.legacyConfigs.join(", ")}.`,fixHint:"Run `cc-safety-net rule migrate` to convert them (add `--cleanup` to delete each file once it is converted), then rerun doctor."}]:[]},{derive:(_)=>{let L=_.environment.find((U)=>U.name==="CC_SAFETY_NET_AUDIT_SCOPE");return rt(L?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Qf.map((_)=>({derive:(L)=>L.posture.directories.filter((U)=>U.kind===_&&U.status==="unsafe").map((U)=>({checkId:`posture.${_}-directory-unsafe`,severity:"error",title:`${_[0]?.toUpperCase()}${_.slice(1)} directory is unsafe`,detail:`The ${_} directory ${em(U.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...U.path?{path:U.path}:{}}))})),{derive:(_)=>{let L=[..._.effectiveSafety.weakenedRuleOverrides].sort();return L.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${L.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${L.join(", ")}.`}]:[]}}];function ha(_){return nm.flatMap((L,U)=>L.derive(_).map((J,Y)=>({finding:J,catalogOrder:U,occurrence:Y}))).sort((L,U)=>ya[L.finding.severity]-ya[U.finding.severity]||L.catalogOrder-U.catalogOrder||L.occurrence-U.occurrence).map((L)=>L.finding)}function Dn(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var tm=(_)=>Dn()?`\x1B[32m${_}\x1B[0m`:_,rm=(_)=>Dn()?`\x1B[33m${_}\x1B[0m`:_,om=(_)=>Dn()?`\x1B[34m${_}\x1B[0m`:_,im=(_)=>Dn()?`\x1B[36m${_}\x1B[0m`:_,sm=(_)=>Dn()?`\x1B[31m${_}\x1B[0m`:_,am=(_)=>Dn()?`\x1B[2m${_}\x1B[0m`:_,lm=(_)=>Dn()?`\x1B[1m${_}\x1B[0m`:_,en={green:tm,yellow:rm,blue:om,cyan:im,red:sm,dim:am,bold:lm},cm="\x1B[0m",dm=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function um(_){let L=_;return()=>(L=(L*1664525+1013904223)%4294967296,L/4294967296)}function pm(_){let L=[...dm],U=um(_);for(let J=L.length-1;J>0;J--){let Y=Math.floor(U()*(J+1)),re=L[J];L[J]=L[Y],L[Y]=re}return L}function fm(_,L=0){if(!Dn())return"";let U=pm(L);return`\x1B[38;5;${U[_%U.length]}m`}function va(_,L,U=0){if(!Dn())return`"${_}"`;return`${fm(L,U)}"${_}"${cm}`}function Ar(_){return _==="default"?"built-in default":`${_} policy`}var mm=new RegExp("\x1B\\[[0-9;]*m","g"),zo=(_)=>_.replace(mm,"").length;function Zn(_){let L=(_.headers??_.rows[0]??[]).map((ie,pe)=>{let me=Math.max(..._.rows.map((ke)=>zo(ke[pe]??"")));return Math.max(zo(ie),me)}),U=(ie,pe)=>ie+" ".repeat(Math.max(0,pe-zo(ie))),J=(ie,pe)=>pe[0]+L.map((me)=>ie.repeat(me+2)).join(pe[1])+pe[2],Y=(ie)=>`│ ${ie.map((pe,me)=>U(pe,L[me]??0)).join(" │ ")} │`,re=_.headers?[`   ${Y(_.headers)}`,`   ${J("─",["├","┼","┤"])}`]:[];return[`   ${J("─",["┌","┬","┐"])}`,...re,..._.rows.map((ie)=>`   ${Y(ie)}`),`   ${J("─",["└","┴","┘"])}`].join(`
`)}function ba(_){let L=[];L.push("Hook Integration"),L.push(gm(_));let U=[],J=[];for(let Y of _){let re=cn(Y.platform);if(Y.errors&&Y.errors.length>0)for(let ie of Y.errors)if(Y.configured)U.push({platform:re,message:ie});else J.push({platform:re,message:ie})}for(let Y of U)L.push(`   Warning (${Y.platform}): ${Y.message}`);for(let Y of J)L.push(en.red(`   Error (${Y.platform}): ${Y.message}`));return L.join(`
`)}function gm(_){let L=["Platform","Discovery","Configuration","Inspection"],U=_.map((J)=>{let Y=cn(J.platform);if(J.inspectionStatus==="not-inspected"){let me=en.dim("Not inspected");return[Y,me,me,me]}let re=J.detected?en.green("Detected"):J.inspectionStatus==="failed"?en.red("Unknown"):en.dim("Not detected"),ie=J.configured?en.green("Configured"):J.detected?en.yellow("Not configured"):J.inspectionStatus==="failed"?en.red("Unknown"):en.dim("Not applicable"),pe=J.inspectionStatus==="verified"?en.green("Verified"):J.inspectionStatus==="failed"?en.red("Failed"):en.dim("Not applicable");return[Y,re,ie,pe]});return Zn({headers:L,rows:U})}function wa(_){let U=["Guard Engine Verification",`   Synthetic self-test: ${_.failed>0?en.red(`${_.passed}/${_.total} FAIL`):en.green(`${_.passed}/${_.total} passed`)}`],J=_.results.filter((Y)=>!Y.passed);if(J.length>0){U.push(""),U.push(en.red("   Failures:"));for(let Y of J)U.push(en.red(`   • ${Y.description}`)),U.push(en.red(`     expected ${Y.expected}, got ${Y.actual}`))}return U.join(`
`)}function ym(_){if(_.length===0)return"   (no custom rules)";let L=["Source","Name","Command","Block Args"],U=_.map((J)=>[J.source,J.name,J.subcommand?`${J.command} ${J.subcommand}`:J.command,J.blockArgs.join(", ")]);return Zn({headers:L,rows:U})}function ka(_){let L=[];if(L.push("Configuration"),L.push(hm(_.userConfig,_.projectConfig)),L.push(""),_.effectiveRules.length>0)L.push(`   Effective rules (${_.effectiveRules.length} total):`),L.push(ym(_.effectiveRules));else L.push("   Effective rules: (none - using built-in rules only)");return L.join(`
`)}function hm(_,L){let U=["Scope","Status"],J=(re)=>{if(!re.exists)return en.dim("N/A");if(!re.valid)return en.red(`Invalid (${re.errors?.[0]??"unknown error"})`);return en.green("Configured")},Y=[["User",J(_)],["Project",J(L)]];return Zn({headers:U,rows:Y})}function Ca(_){let L=[];return L.push("Environment"),L.push(vm(_)),L.join(`
`)}function xa(_){let L=_.effectiveSafety.policyScopes,U=["Effective Safety",`   Selected preset: ${_.effectiveSafety.selectedPreset}${L?` (${Ar(L.levelScope)})`:""}`,`   Effective: ${_.effectiveSafety.level}`],J=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[Y,re]of J){let ie=_.effectiveSafety.capabilities[Y],pe=ie.enabled?en.green("ON"):en.dim("OFF"),me=ie.sources.length>0?` (${ie.sources.join(", ")})`:"";U.push(`   ${re}: ${pe} via ${ie.source}${me}`)}if(L&&L.weakenings.length>0){U.push(`   Project policy deltas${L.weakeningsIgnored?" (ignored)":""}:`);for(let Y of L.weakenings)U.push(`      ${Y}`)}U.push(`   Stored rule customizations: ${_.effectiveSafety.ruleCounts.stored}`),U.push(`   Effective rule customizations: ${_.effectiveSafety.ruleCounts.effective}`);for(let[Y,re]of Object.entries(_.effectiveSafety.ruleOverrides))U.push(`   ${Y}: ${re}`);return U.join(`
`)}function Sa(_){let L=["Findings"];if(_.length===0)return L.push("   No findings from inspected doctor facts."),L.join(`
`);for(let U of _){let J=`[${U.severity.toUpperCase()}] ${U.checkId}: ${gn(U.title)}`,Y=U.severity==="error"?en.red:U.severity==="warning"?en.yellow:en.blue;if(L.push(`   ${Y(J)}`),L.push(`      ${gn(U.detail)}`),U.path)L.push(`      Path: ${gn(U.path)}`);if(U.fixHint)L.push(`      Fix: ${gn(U.fixHint)}`)}return L.join(`
`)}function vm(_){let L=["Variable","Status","Legacy"],U=_.map((J)=>{let Y=J.isSet?en.green("✓"):en.dim("✗"),re=J.legacyName&&J.legacyIsSet?`${J.legacyName} ${en.green("✓")}`:J.legacyName??"";return[J.name,Y,re]});return Zn({headers:L,rows:U})}function Pa(_){let L=[];if(_.totalBlocked===0)L.push("Recent Activity"),L.push("   No blocked commands in the last 7 days"),L.push("   Tip: This is normal for new installations");else L.push(`Recent Activity · last 7 days (${_.totalBlocked} blocked / ${_.sessionCount} sessions)`),L.push(bm(_.recentEntries));if(_.unreadable>0)L.push(`   Warning: ${_.unreadable} audit log ${_.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return L.join(`
`)}function bm(_){let L=["Time","Command"],U=_.map((J)=>{let Y=gn(J.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),re=Y.length>40?`${Y.slice(0,37)}...`:Y;return[J.relativeTime,re]});return Zn({headers:L,rows:U})}function Ea(_){let L=[];if(L.push("Update Check"),_.latestVersion===null&&!_.error)return L.push(Or([["Status",en.dim("Skipped")],["Installed",_.currentVersion]])),L.join(`
`);if(_.error)return L.push(Or([["Status",`${en.yellow("⚠")} Error`],["Installed",_.currentVersion],["Error",en.dim(_.error)]])),L.join(`
`);if(_.updateAvailable)return L.push(Or([["Status",`${en.yellow("⚠")} Update Available`],["Current",_.currentVersion],["Latest",en.green(_.latestVersion??"")]])),L.push(""),L.push("   Run: bunx cc-safety-net@latest doctor"),L.push("   Or:  npx cc-safety-net@latest doctor"),L.join(`
`);return L.push(Or([["Status",`${en.green("✓")} Up to date`],["Version",_.currentVersion]])),L.join(`
`)}function Or(_){return Zn({rows:_})}function Ra(_){let L=[];return L.push("System Info"),L.push(wm(_)),L.join(`
`)}function wm(_){let L=["Component","Version"],U=(re)=>{if(re===null)return en.dim("not found");return re},Y=[{label:"cc-safety-net",value:_.version},...Er.map((re)=>({label:cn(re),value:_.versions[re]??null})),{label:"Node.js",value:_.nodeVersion},{label:"npm",value:_.npmVersion},{label:"Bun",value:_.bunVersion},{label:"Platform",value:_.platform}].map((re)=>[re.label,U(re.value)]);return Zn({headers:L,rows:Y})}function _a(_){if(_.findings.length===0)return en.green(`
No findings from inspected doctor facts.`);let L={error:_.findings.filter((re)=>re.severity==="error").length,warning:_.findings.filter((re)=>re.severity==="warning").length,info:_.findings.filter((re)=>re.severity==="info").length},U=["error","warning","info"].filter((re)=>L[re]>0).map((re)=>`${L[re]} ${re}`),J=_.findings.length===1?"finding":"findings",Y=`
${_.findings.length} ${J}: ${U.join(", ")}.`;if(L.error>0)return en.red(Y);if(L.warning>0)return en.yellow(Y);return en.blue(Y)}import{lstatSync as km}from"node:fs";import{dirname as Yo}from"node:path";function Zo(_,L){try{let U=km(L);if(U.isSymbolicLink())return{kind:_,path:L,status:"unsafe",issues:["symlink"]};if(!U.isDirectory())return{kind:_,path:L,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:_,path:L,status:"unknown",issues:[]};let J=[...U.uid!==process.getuid()?["ownership"]:[],...(U.mode&18)!==0?["permissions"]:[]];return{kind:_,path:L,status:J.length>0?"unsafe":"safe",issues:J}}catch(U){if(typeof U==="object"&&U!==null&&"code"in U&&U.code==="ENOENT")return{kind:_,path:L,status:"not-applicable",issues:[]};return{kind:_,path:L,status:"unknown",issues:[]}}}function Ta(_,L){let U=j(_);return{directories:[Zo("policy",Yo(Yo(L))),Zo("config",Yo(L)),...U?[Zo("audit",U)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as Cm}from"node:child_process";import{existsSync as Ia}from"node:fs";import{delimiter as xm,extname as Sm,join as Pm}from"node:path";import{stripVTControlCharacters as Aa}from"node:util";var $a="2.6.11",Em=5000,Rm="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function pn(){return $a}function Xo(_,L){let U=_[L];if(U)return U;let J=Object.keys(_).find((Y)=>Y.toLowerCase()===L.toLowerCase()&&!!_[Y]);return J?_[J]:U}function _m(_){return(Xo(_,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((L)=>L.length>0)}function Tm(_,L){let U=Sm(_)?[_]:[..._m(L).map((J)=>`${_}${J}`),_];if(_.includes("/")||_.includes("\\"))return U.find((J)=>Ia(J))??_;return(Xo(L,"PATH")??"").split(xm).flatMap((J)=>U.map((Y)=>Pm(J,Y))).find((J)=>Ia(J))??_}function Oa(_){if(!/[\s"&|<>^]/.test(_))return _;return`"${_.replace(/"/g,'""')}"`}function Xn(_,L){let[U,...J]=_,Y=L[Rm]==="win32"?"win32":process.platform;if(!U||Y!=="win32")return{cmd:U??"",args:J};let re=Tm(U,L);if(!/\.(?:bat|cmd)$/i.test(re))return{cmd:re,args:J};return{cmd:Xo(L,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",Oa(re),...J.map(Oa)].join(" ")]}}var jt=async(_,L=Em)=>{let U=await Im(_,{timeoutMs:L});if(U.code!==0)return null;return Aa(U.stdout).trim()||Aa(U.stderr).trim()||null};function Im(_,L){let[U,...J]=_;if(!U)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((Y)=>{try{let re=Xn([U,...J],process.env),ie=Cm(re.cmd,re.args,{stdio:["ignore","pipe","pipe"]}),pe=!1,me="",ke="";ie.stdout.on("data",(Ne)=>{me+=Ne.toString()}),ie.stderr.on("data",(Ne)=>{ke+=Ne.toString()});let Ce=(Ne)=>{if(pe)return;pe=!0,clearTimeout(Re),Y(Ne)},Re=setTimeout(()=>{ie.kill(),Ce({code:null,stdout:me,stderr:ke})},L.timeoutMs);ie.on("close",(Ne)=>{Ce({code:Ne,stdout:me,stderr:ke})}),ie.on("error",()=>{Ce({code:null,stdout:me,stderr:ke})})}catch{Y({code:null,stdout:"",stderr:""})}})}function $r(_){if(!_)return null;let L=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(_);if(L)return L[1]??null;let U=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(_);if(U)return U[1]??null;return _.split(`
`)[0]?.trim()||null}async function Dr(_,L=jt,U=process.cwd()){let J=Promise.all(En.map(async(Re)=>[Re.id,$r(await L([...Re.probeCommand]))])),[Y,re,ie,pe,me,ke,Ce]=await Promise.all([J,J.then(async(Re)=>{let Ne=Re.find(([We])=>We==="opencode")?.[1];if(!Ne?.startsWith("2.")||!_(Ne))return null;let _e=["--param",`location[directory]=${U}`],Te=["opencode","api","integration.list",..._e];return await L(Te,30000),L(["opencode","api","plugin.list",..._e],30000)}),L(["codex","plugin","list"],30000),L(["amp","plugins","list"],30000),L(["node","--version"]),L(["npm","--version"]),L(["bun","--version"])]);return{version:$a,versions:Object.fromEntries(Y),codexPluginListOutput:ie,ampPluginListOutput:pe,openCodePluginListOutput:re,nodeVersion:$r(me),npmVersion:$r(ke),bunVersion:$r(Ce),platform:`${process.platform} ${process.arch}`}}function Qo(_,L){if(L==="dev")return!1;let U=_.split(".").map(Number),J=L.split(".").map(Number),[Y=0,re=0,ie=0]=U,[pe=0,me=0,ke=0]=J;if(Y!==pe)return Y>pe;if(re!==me)return re>me;return ie>ke}async function Gn(){let _=pn(),L=new AbortController,U=setTimeout(()=>L.abort(),3000);try{let J=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:L.signal});if(!J.ok)return{currentVersion:_,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${J.status}`};let Y=await J.json(),re=Qo(Y.version,_);return{currentVersion:_,latestVersion:Y.version,updateAvailable:re}}catch(J){return{currentVersion:_,latestVersion:null,updateAvailable:!1,error:J instanceof Error?J.message:"Network error"}}finally{clearTimeout(U)}}import*as Ua from"node:readline";var ja=(_)=>`\x1B[${_}B`,Am=(_)=>`\x1B[${_}A`;var Da=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function Om(_){return new Promise((L)=>setTimeout(L,_))}function $m(_,L,U){if(!U)return L(_);if(U.aborted)return Promise.resolve();return new Promise((J,Y)=>{let re=()=>U.removeEventListener("abort",ie),ie=()=>{re(),J()};U.addEventListener("abort",ie,{once:!0}),L(_).then(()=>{re(),J()},(pe)=>{re(),Y(pe)})})}function Nr(_){return Math.max(0,Math.min(1,_))}function Ht(_){return Math.max(0,Math.min(255,Math.round(_)))}function ei(_){return _<=0.0031308?12.92*_:1.055*_**0.4166666666666667-0.055}function Dm(_,L,U){let J=U*Math.PI/180,Y=L*Math.cos(J),re=L*Math.sin(J),ie=(_+0.3963377774*Y+0.2158037573*re)**3,pe=(_-0.1055613458*Y-0.0638541728*re)**3,me=(_-0.0894841775*Y-1.291485548*re)**3;return{blue:Ht(ei(Nr(-0.0041960863*ie-0.7034186147*pe+1.707614701*me))*255),green:Ht(ei(Nr(-1.2684380046*ie+2.6097574011*pe-0.3413193965*me))*255),red:Ht(ei(Nr(4.0767416621*ie-3.3077115913*pe+0.2309699292*me))*255)}}function ni(_,L){let U=(L*_*180/Math.PI%360+360)%360;return Dm(0.72,0.15,U)}function Ha(_,L=0.1){let U=ni(L,_);return`\x1B[38;2;${U.red};${U.green};${U.blue}m`}function Nm(_,L){return{blue:Ht(_.blue+(255-_.blue)*L),green:Ht(_.green+(255-_.green)*L),red:Ht(_.red+(255-_.red)*L)}}function Fa(_,L,U){let J=Math.imul(_+2654435769,2246822507)^Math.imul(L+3266489909,668265263)^Math.imul(U+374761393,2654435761),Y=J^J>>>15,re=Math.imul(Y,739982445),ie=re^re>>>12,pe=Math.imul(ie,695872825);return((pe^pe>>>15)>>>0)/4294967296}function Lm(_,L,U){let J=Math.floor(Fa(_,L,U)*Da.length);return Da[J]??"░"}function Na(_){let L=Nr(_);return L*L*L*(L*(L*6-15)+10)}function jm(_){if(_.length===0)return"";let L=[],U=!1,J="";for(let Y of _){let re=`${Y.red};${Y.green};${Y.blue}`;if(Y.bold!==U)L.push(Y.bold?"\x1B[1m":"\x1B[22m"),U=Y.bold;if(re!==J)L.push(`\x1B[38;2;${re}m`),J=re;L.push(Y.character)}return`${L.join("")}\x1B[22m\x1B[39m`}function Hm(_,L,U,J,Y){return _.map((re,ie)=>({...ni(U,J+L+ie/Y),bold:!1,character:re}))}function Fm(_,L,U,J,Y,re,ie,pe){let me=Math.max(1,J*0.75),ke=Math.min(1,U/me),Ce=Y*Na(ke),Re=Math.max(0,(U-me)/Math.max(1,J-me)),Ne=(1-Na(U/J))*pe*2,_e=0.35*Math.max(0,1-Re*2),Te=ke>=1,We=Math.min(_.length,Math.ceil(Ce+2+1));return _.slice(0,We).map((Me,Ye)=>{let tn=ni(re,ie+L+Ye/pe+Ne),on=Ye+Fa(L,Ye,7919)*2-1;if(on>Ce+2)return{...tn,bold:!1,character:" "};let an=Ce-on,nn=0.8*Math.exp(-(an*an)/12.5),sn=Math.min(0.9,nn+_e),Sn=!Te&&on>Ce-4;return{...Nm(tn,sn),bold:sn>0.3,character:Sn?Lm(L,Ye,U):Me}})}function La(_){return`\x1B[?2026h${_.map((L,U)=>`\x1B8${U>0?ja(U):""}${jm(L)}`).join("")}\x1B[?2026l`}async function ti(_,L={}){if(!_)return;let U=L.output??process.stdout,J=L.sleep??Om,Y=L.seed??0,re=_.split(`
`).map((Ce)=>Array.from(Ce)),ie=Math.max(...re.map((Ce)=>Ce.length)),pe=12000*re.filter((Ce)=>Ce.length>0).length/40,me=ie>0?Math.max(1,Math.ceil(pe/16.666666666666668)):0,ke=me>0?pe/me:0;U.write(`\x1B[?25l${re.length>1?`${`
`.repeat(re.length-1)}${Am(re.length-1)}`:""}\x1B7`);try{for(let Ce=1;Ce<=me;Ce+=1){if(L.signal?.aborted)break;U.write(La(re.map((Re,Ne)=>Fm(Re,Ne,Ce,me,ie,0.1,Y,3)))),await $m(ke,J,L.signal)}}finally{if(U.write(La(re.map((Ce,Re)=>Hm(Ce,Re,0.1,Y,3)))),U.write("\x1B8"),re.length>1)U.write(ja(re.length-1));U.write(`
\x1B[0m\x1B[?25h`)}}var Ma=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function Mm(_){return Boolean(_.isTTY)}async function Qt(_={}){let L=_.output??process.stdout;if(!Mm(L))return;let U=_.input??process.stdin,J={output:L,seed:_.seed??Math.random()*8192,sleep:_.sleep};if(!U.isTTY||typeof U.setRawMode!=="function"){await ti(Ma,J);return}let Y=new AbortController,re=U.readableFlowing===!0,ie=U.isRaw===!0,pe=!1,me=(ke,Ce)=>{if(Ce.ctrl&&Ce.name==="c")pe=!0;if(pe||Ce.name==="return"||Ce.name==="enter")Y.abort()};Ua.emitKeypressEvents(U),U.on("keypress",me),U.setRawMode(!0),U.resume();try{await ti(Ma,{...J,signal:Y.signal})}finally{if(U.off("keypress",me),U.setRawMode(ie),!re)U.pause()}if(!pe)return;if(_.onInterrupt){_.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as qm}from"node:crypto";import{existsSync as Ba}from"node:fs";import{dirname as Lr,join as qa}from"node:path";import{dirname as Ga,join as Um}from"node:path";var Gm="rule.lock";function Bm(_){return Um(Ga(_),Gm)}function hn(_,L){let U=L.global?L.userConfigPath??W(_,L):L.projectConfigPath??I(L.cwd??process.cwd()),J=L.global?st(_,L):at(U,L.cwd??process.cwd()),Y=Bm(U);return{configDir:Ga(U),configPath:U,lockPath:Y,filesystemScope:J,configTarget:i(J,U),lockTarget:i(J,Y)}}var Vm="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Km="cache",Jm="rulebooks";function Va(_,L={}){let U=hn(_,L),J=i(U.filesystemScope,Ja(U.configDir)),Y=r(U.lockTarget);if(console.log(Vm),Y===null&&!Ba(J.path))return console.log(`No v2 lock or cache leftovers found in ${Lr(U.configDir)}; nothing to migrate.`),0;let re=Xm(Y),ie=d(U.configTarget);if(!ie.config&&(r(U.configTarget)!==null||re.size>0))return console.error(`Cannot migrate: the rules config in ${Lr(U.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let pe=ie.config?.rules??[];for(let me of pe.flatMap((ke)=>Wm(ke,re,U,J,L.global===!0)))console.log(me);return H(U.lockTarget),St(J),console.log(`Removed the v2 lock and cache under ${Lr(U.configDir)}.`),0}function Ka(_,L){return[...new Set([{cwd:L},{cwd:L,global:!0}].flatMap((U)=>{let J=hn(_,U);return[J.lockPath,Ja(J.configDir)]}))].filter((U)=>Ba(U))}function Wm(_,L,U,J,Y){if(!C(_))return[];let re=M(_).name,ie=i(U.filesystemScope,F(U.configDir,re)),pe=r(ie);if(pe!==null&&zm(pe,re))return[];let me=L.get(_),ke=me?Ym(me,re,J.path,U.filesystemScope):null;if(ke===null)return[`Could not migrate ${_} from the v2 cache. Run \`cc-safety-net rule update ${_}${Y?" --global":""}\` to vendor it.`];if(g(ie,ke),pe!==null)return[`Restored ${_} from the v2 cache over an invalid file.`];return[`Vendored ${_} from the v2 cache.`]}function zm(_,L){let U=Se(_);return!("problem"in U)&&U.rulebook.name===L}function Ym(_,L,U,J){let Y=qa(U,Jm,`${Zm(_)}--${_.digest.replace("sha256:","").slice(0,12)}`,he),re=r(i(J,Y));if(re===null||ng(re)!==_.digest)return null;let ie=Se(re);if("problem"in ie||ie.rulebook.name!==L)return null;return re}function Ja(_){return qa(Lr(_),Km)}function Zm(_){return([_.owner,_.repo,_.display_ref,_.name].every((J)=>typeof J==="string"&&J!=="")?`${_.owner}/${_.repo}#${_.display_ref}/${_.name}`:_.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Xm(_){let L=_===null?null:eg(_),U=Wa(L)&&Array.isArray(L.rulebooks)?L.rulebooks:[];return new Map(U.filter(Qm).map((J)=>[J.spec,J]))}function Qm(_){return Wa(_)&&typeof _.spec==="string"&&typeof _.digest==="string"}function Wa(_){return!!_&&typeof _==="object"}function eg(_){try{return JSON.parse(_)}catch{return null}}function ng(_){return`sha256:${qm("sha256").update(_).digest("hex")}`}var za="\r\x1B[2K",tg="\x1B[?25l",rg="\x1B[39m",og="\x1B[?25h",ig=100,sg=0.55,ag=80,Ya=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function lg(_){return new Promise((L)=>setTimeout(L,_))}async function jr(_,L={}){let U=L.output??process.stdout;if(!U.isTTY)return _;let J=L.sleep??lg,Y=!1,re=_.then((pe)=>(Y=!0,pe),(pe)=>{throw Y=!0,pe});if(await Promise.race([re.then(()=>!0),J(ig).then(()=>!1)]))return re;U.write(tg);try{for(let pe=0;!Y;pe+=1)U.write(`${za}${Ha(pe*sg)}${Ya[pe%Ya.length]}${rg} ${L.loadingMessage??"Loading…"}`),await Promise.race([re,J(ag)]);return await re}finally{U.write(`${za}${og}`)}}async function er(_,L,U,J={}){let Y=L();if(_)await U();if(_&&Y.ready)await jr(Y.ready,J);return Y.finish()}import{stripVTControlCharacters as cg}from"node:util";var Hr="amp plugins list",dg=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function Za(_){if(!_.ampPluginListOutput)return{platform:"amp",status:"n/a"};let L=cg(_.ampPluginListOutput).split(`
`).map((U)=>dg.exec(U)?.[1]).find((U)=>U!==void 0);if(!L)return{platform:"amp",status:"n/a"};if(L!=="active")return{platform:"amp",status:"disabled",method:Hr,configPath:Hr,errors:[`Amp personal plugin cc-safety-net is ${L}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:Hr,configPath:Hr}}import{existsSync as hg,readFileSync as vg}from"node:fs";import{isAbsolute as nS,join as yg}from"node:path";function nr(_){return yg(_,".gemini","config","hooks.json")}var Qa=new Map([["run_command","auto"]]),el="manage_task";var bg=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function wg(_){if(!_||typeof _!=="object"||Array.isArray(_))return[];return Object.values(_).flatMap((L)=>{if(!L||typeof L!=="object"||Array.isArray(L))return[];let U=L,J=U.PreToolUse;if(!Array.isArray(J))return[];return J.flatMap((Y)=>{if(!Y||typeof Y!=="object"||Array.isArray(Y))return[];let re=Y.hooks;if(!Array.isArray(re))return[];return re.flatMap((ie)=>{if(!ie||typeof ie!=="object"||Array.isArray(ie))return[];let pe=ie.command;if(typeof pe!=="string"||!bg.test(pe))return[];return[{command:pe,enabled:U.enabled!==!1}]})})})}function nl(_){let L=nr(_.environment.home);if(!hg(L))return{platform:"antigravity-cli",status:"n/a",configPath:L};let U;try{U=wg(JSON.parse(vg(L,"utf-8")))}catch(J){return{platform:"antigravity-cli",status:"n/a",configPath:L,errors:[`Failed to parse Antigravity hooks config ${L}: ${J instanceof Error?J.message:String(J)}`]}}if(U.some((J)=>J.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:L};if(U.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:L};return{platform:"antigravity-cli",status:"n/a",configPath:L}}import{existsSync as Pg}from"node:fs";import{join as Ln}from"node:path";import{existsSync as kg,lstatSync as Cg,readFileSync as xg}from"node:fs";import{join as Sg}from"node:path";function vn(_,L=(U)=>U){if(!kg(_))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(L(xg(_,"utf-8")))}}catch{return{kind:"unreadable"}}}function Nn(_,L){if(_==="~")return L;if(_.startsWith("~/")||_.startsWith("~\\"))return Sg(L,_.slice(2));return _}function dn(_){try{return Cg(_)}catch{return}}function Gr(_,L){let U=dn(L);if(!U)return{platform:_,status:"n/a",configPath:L};if(!U.isSymbolicLink()&&U.isDirectory())return;return{platform:_,status:"n/a",configPath:L,errors:[`${L} is a symlink or not a directory; move or remove it before installing`]}}function Ze(_,L){return typeof _==="object"&&_!==null?_[L]:void 0}var Br="cc-safety-net@cc-marketplace";function qr(_){return _.env.get("CLAUDE_CONFIG_DIR")||Ln(_.home,".claude")}function tl(_){return Ln(_.env.get("CLAUDE_CODE_PLUGIN_CACHE_DIR")||Ln(qr(_),"plugins"),"installed_plugins.json")}function rl(_,L){let U=Ze(Ze(_,"plugins"),L);return Array.isArray(U)&&U.length>0}function Vr(_,L){let U=vn(tl(_));return U.kind==="ok"&&rl(U.value,L)}function oi(_){return ol(tl(_),Ln(qr(_),"settings.json"))}function ol(_,L){let U=vn(_);if(U.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(U.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!rl(U.value,Br))return{platform:"claude-code",status:"n/a"};let J=vn(L);if(J.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(J.kind==="ok"&&Ze(Ze(J.value,"enabledPlugins"),Br)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:L,errors:[`${Br} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:_}}function il(_){let L=Ln(_.home,".claude"),U=Ln(L,"plugins","installed_plugins.json");if(ol(U,Ln(L,"settings.json")).status!=="configured")return;let J=vn(U),Y=J.kind==="ok"?Ze(Ze(J.value,"plugins"),Br):void 0,re=(Array.isArray(Y)?Y:[]).filter((ke)=>Ze(ke,"scope")==="user").map((ke)=>Ze(ke,"installPath")).find((ke)=>typeof ke==="string");if(!re)return;let ie=Ln(re,".cursor-plugin","plugin.json"),pe=vn(ie),me=pe.kind==="ok"?Ze(pe.value,"hooks"):void 0;return typeof me==="string"&&Pg(Ln(re,me))?ie:void 0}function sl(_){return oi(_.environment)}var al="Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it.";function ll(_){if(!_.codexPluginListOutput)return{platform:"codex",status:"n/a"};let L=_.codexPluginListOutput.split(`
`).find((U)=>U.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!L)return{platform:"codex",status:"n/a"};if(!L.includes("installed,"))return{platform:"codex",status:"n/a"};if(!L.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex runs only trusted hooks, and doctor cannot check trust. Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."]}}import{existsSync as zr,readdirSync as Eg,readFileSync as Rg}from"node:fs";import{join as wn}from"node:path";function yn(_){let L="",U=0,J=!1,Y=!1,re=-1;while(U<_.length){let ie=_[U],pe=_[U+1];if(Y){L+=ie,Y=!1,U++;continue}if(ie==='"'&&!J){J=!0,re=-1,L+=ie,U++;continue}if(ie==='"'&&J){J=!1,L+=ie,U++;continue}if(ie==="\\"&&J){Y=!0,L+=ie,U++;continue}if(J){L+=ie,U++;continue}if(ie==="/"&&pe==="/"){while(U<_.length&&_[U]!==`
`)U++;continue}if(ie==="/"&&pe==="*"){U+=2;while(U<_.length-1){if(_[U]==="*"&&_[U+1]==="/"){U+=2;break}U++}continue}if(ie===","){re=L.length,L+=ie,U++;continue}if(ie==="}"||ie==="]"){if(re!==-1){let me=L.slice(re+1);if(/^\s*$/.test(me))L=L.slice(0,re)+me}re=-1,L+=ie,U++;continue}if(!/\s/.test(ie))re=-1;L+=ie,U++}return L}function dl(_,L,U){let J=L+1,Y=!1;while(J<_.length){if(Y){Y=!1,J++;continue}if(_[J]==="\\"){Y=!0,J++;continue}if(_[J]==='"')return J+1;J++}throw Error(U)}function si(_,L,U){let J=_[L],Y=J==="["?"]":"}",re=0,ie=L;while(ie<_.length){let pe=U.skipComment?.(_,ie)??ie;if(pe!==ie){ie=pe;continue}if(_[ie]==='"'){ie=dl(_,ie,U.stringError);continue}if(_[ie]===J)re++;if(_[ie]===Y){if(re--,re===0)return ie}ie++}throw Error(U.bracketError)}function ul(_,L){let U=_.lastIndexOf(`
`,L)+1;return/^[ \t]*/.exec(_.slice(U))?.[0]??""}function pl(_,L){let U=L.end+(/^\s*/.exec(_.slice(L.end))?.[0].length??0);if(_[U]===","){let ie=_[U+1]===`
`?U+2:U+1;return`${_.slice(0,L.start)}${_.slice(ie)}`}let J=_.slice(0,L.start).search(/\s*$/)-1;if(_[J]!==",")return`${_.slice(0,L.start)}${_.slice(L.end)}`;let Y=_.lastIndexOf(`
`,J-1),re=Y!==-1&&/^\s*$/.test(_.slice(Y+1,J))?Y:J;return`${_.slice(0,re)}${_.slice(L.end)}`}function ii(_,L){if(_.startsWith("//",L)){let U=_.indexOf(`
`,L+2);return U===-1?_.length:U+1}if(_.startsWith("/*",L)){let U=_.indexOf("*/",L+2);return U===-1?_.length:U+2}return L}function cl(_,L){let U=L;while(U<_.length){if(/\s/.test(_[U]??"")){U++;continue}let J=ii(_,U);if(J===U)return U;U=J}return U}function fl(_,L,U){let J=0,Y=0;while(Y<_.length){let re=ii(_,Y);if(re!==Y){Y=re;continue}if(_[Y]==='"'){let ie=dl(_,Y,U.stringError);if(J===1&&JSON.parse(_.slice(Y,ie))===L){let pe=cl(_,ie),me=cl(_,pe+1);if(_[pe]===":"&&_[me]==="[")return{start:me,end:si(_,me,{skipComment:ii,...U})}}Y=ie;continue}if(_[Y]==="{"||_[Y]==="[")J++;if(_[Y]==="}"||_[Y]==="]")J--;Y++}return}var Tn="cc-safety-net@cc-marketplace",Kr=["cc-marketplace","cc-safety-net"],ml=["_direct","copilot-safety-net"],gl=["cc-marketplace","safety-net"],yl="safety-net@cc-marketplace";function Jr(_,L){let U=L.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${U}([^a-z0-9-]|$)`,"m").test(_??"")}function hl(_){return Jr(_,"cc-safety-net@cc-marketplace")}function vl(_){return Jr(_,"cc-marketplace")}function bl(_){return Jr(_,"copilot-safety-net")}function wl(_){return Jr(_,"safety-net@cc-marketplace")}function Wr(_){if(!_?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(_)}function Cl(_,L){if(!_)return null;let U=_.match(/(\d+)\.(\d+)\.(\d+)/);if(!U)return null;let J=[Number(U[1]),Number(U[2]),Number(U[3])];for(let Y=0;Y<L.length;Y++){let re=J[Y]??0,ie=L[Y]??0;if(re!==ie)return re>ie}return!0}function _g(_){return Cl(_,[0,0,422])}function Tg(_){return Cl(_,[1,0,8])}function or(_){return _.env.get("COPILOT_HOME")||wn(_.home,".copilot")}function xl(_){return _.disableAllHooks!==!0&&Sl(_)}function Sl(_){return(_.hooks?.preToolUse??[]).some((U)=>{if(U.type!==void 0&&U.type!=="command")return!1;return Wr(U.command)||Wr(U.bash)||Wr(U.powershell)||Wr(U.exec&&[U.exec,...U.args??[]].join(" "))})}function tr(_){return _===void 0||typeof _==="string"}function Ig(_){return _===void 0||Array.isArray(_)&&_.every((L)=>typeof L==="string")}function Ag(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let L=_;if(L.disableAllHooks!==void 0&&typeof L.disableAllHooks!=="boolean")return!1;if(L.hooks===void 0)return!0;if(!L.hooks||typeof L.hooks!=="object"||Array.isArray(L.hooks))return!1;let U=L.hooks.preToolUse;if(U===void 0)return!0;return Array.isArray(U)&&U.every((J)=>J!==null&&typeof J==="object"&&!Array.isArray(J)&&tr(J.type)&&tr(J.command)&&tr(J.bash)&&tr(J.powershell)&&tr(J.exec)&&Ig(J.args))}function ai(_,L){try{let U=JSON.parse(yn(Rg(_,"utf-8")));if(!Ag(U)){L?.push(`Invalid hook config ${_}: hooks.preToolUse must be an array of hook objects`);return}return U}catch(U){L?.push(`Failed to parse ${_}: ${U instanceof Error?U.message:String(U)}`);return}}function Pl(_,L){try{return Eg(_).filter((U)=>U.endsWith(".json")).sort((U,J)=>U.localeCompare(J))}catch(U){return L?.push(`Failed to read ${_}: ${U instanceof Error?U.message:String(U)}`),[]}}function Og(_,L){if(!zr(_))return[];let U=[];for(let J of Pl(_,L)){let Y=wn(_,J),re=ai(Y,L);if(re&&xl(re))U.push(Y)}return U}function rr(_,L){if(!zr(_))return;let U=ai(_,L);if(!U)return;return{path:_,config:U}}function kl(_,L,U,J){if(L){_.push(`GitHub Copilot CLI ${L} does not support ${U}; requires ${J}+`);return}_.push(`GitHub Copilot CLI version unavailable; skipping ${U} because it requires ${J}+`)}function $g(_){for(let L of _){if(L?.config.disableAllHooks===!0)return L.path;if(L?.config.disableAllHooks===!1)return}return}function Dg(_,L,U,J){let Y=or(_),re=wn(L,".github","hooks"),ie=wn(Y,"hooks"),pe=wn(L,".github","copilot"),me=wn(L,".claude"),ke=Tg(U),Ce=ke===!0?J:void 0,Re=[rr(wn(pe,"settings.local.json"),Ce),rr(wn(pe,"settings.json"),Ce),rr(wn(me,"settings.local.json"),Ce),rr(wn(me,"settings.json"),Ce)],Ne=rr(wn(Y,"settings.json"),Ce),_e=[Ne?.config.disableAllHooks===!0?void 0:Ne];if(ke!==!1){let nn=$g(Re);if(nn){if(ke===null)J.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${nn} as active`);return{activeConfigPaths:[],repoInlineSources:Re,disabledBy:nn}}}let Te=Og(re,J),We=_g(U),Me=We===!0?J:void 0,Ye=zr(ie)?Pl(ie,Me):[],tn=[];for(let nn of Ye){let sn=wn(ie,nn),Sn=ai(sn,Me);if(Sn&&xl(Sn))tn.push(sn)}if(We!==!0&&tn.length>0)kl(J,U,`user hook files in ${ie}`,"0.0.422"),tn.length=0;let on=[];for(let nn of[...Re,..._e]){if(!nn)continue;if(!Sl(nn.config))continue;if(ke===!0){on.push(nn);continue}kl(J,U,"inline hook definitions in Copilot config files","1.0.8");break}let an=(nn)=>nn.filter((sn)=>!!sn&&on.includes(sn)).map((sn)=>sn.path);return{activeConfigPaths:[...an(Re),...Te,...an(_e),...tn],repoInlineSources:Re}}function El(_){let L=[],U=Dg(_.environment,_.cwd,_.copilotCliVersion,L);if(U.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:U.disabledBy,configPaths:[U.disabledBy],errors:L.length>0?L:void 0};let J=or(_.environment),Y=wn(J,"installed-plugins",...Kr),re=zr(Y),ie=wn(J,"settings.json"),pe=vn(ie,yn),me=(_e)=>Ze(Ze(_e,"enabledPlugins"),Tn),ke=U.repoInlineSources.find((_e)=>typeof me(_e?.config)==="boolean"),Ce=ke??(pe.kind==="ok"?{path:ie,config:pe.value}:void 0);if(re&&!ke&&pe.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};let Re=re&&Ce!==void 0&&me(Ce.config)===!1;if(Re&&U.activeConfigPaths.length===0)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:Ce.path,errors:[`${Tn} is installed but not enabled in Copilot CLI`]};let Ne=re&&!Re;if(Ne||U.activeConfigPaths.length>0){let _e=U.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:Ne?"plugin config":"hook config",configPath:_e??(Ne?Y:void 0),configPaths:U.activeConfigPaths.length>0?U.activeConfigPaths:void 0,errors:L.length>0?L:void 0}}return{platform:"copilot-cli",status:"n/a",errors:L.length>0?L:void 0}}import{existsSync as gi,readdirSync as Wg,readFileSync as zg}from"node:fs";import{join as mi}from"node:path";import{existsSync as pi,mkdirSync as Ug,readFileSync as Gg,rmSync as Bg}from"node:fs";import{dirname as qg,join as Yr}from"node:path";import{existsSync as Ng,renameSync as Lg,statSync as jg,writeFileSync as Hg}from"node:fs";function ln(_,L){let U=`${_}.${process.pid}.tmp`;Hg(U,L,Ng(_)?{mode:jg(_).mode&511}:{}),Lg(U,_)}import{spawn as Fg}from"node:child_process";function Mg(_){return _.join(" ")}function li(_,L,U){return[`Failed to run ${Mg(_)}${L===null?"":` (exit ${L})`}.`,U.trim()].filter(Boolean).join(`
`)}function ci(_){let L={stdout:"",stderr:""};return _.stdout.setEncoding("utf-8"),_.stderr.setEncoding("utf-8"),_.stdout.on("data",(U)=>{L.stdout+=U}),_.stderr.on("data",(U)=>{L.stderr+=U}),L}function fn(_,L){return new Promise((U,J)=>{let Y=Xn([..._],process.env),re=Fg(Y.cmd,Y.args,{stdio:["ignore","pipe","pipe"]}),ie=ci(re),pe=()=>[ie.stdout,ie.stderr].filter(Boolean).join(`
`),me=L?.timeoutMs??120000,ke=setTimeout(()=>{re.kill(),J(Error(li(_,null,`Timed out after ${me}ms.
${pe()}`.trim())))},me);re.on("error",(Ce)=>{clearTimeout(ke),J(Error(li(_,null,`${Ce.message}
${pe()}`.trim())))}),re.on("close",(Ce)=>{if(clearTimeout(ke),Ce!==0){J(Error(li(_,Ce,pe())));return}U(L?.stdoutOnly?ie.stdout:pe())})})}async function di(_){for(let L of _)await fn(L)}async function Rl(_){for(let L of _)try{await fn(L)}catch(U){console.warn(U instanceof Error?U.message:String(U))}}var kn=Object.fromEntries(Xt.map((_)=>[_.id,`npx -y cc-safety-net hook ${_.flags[1]}`]));var sr=kn.cursor,_l=30;function Xr(_){return Yr(_.home,".cursor","hooks.json")}var ir="cc-safety-net";function fi(_){let L=Yr(_.home,".cursor","plugins");return{cache:Yr(L,"cache",ir),marketplaceClone:Yr(L,"marketplaces","github.com","kenryu42","cc-safety-net")}}async function Tl(_){let L=Object.values(fi(_));if(!L.some((J)=>pi(J)))return;let U="No marketplace matches";return await fn(["cursor-agent","plugin","marketplace","remove",ir]).catch((J)=>{if(!(J instanceof Error&&J.message.includes(U)))throw J}),L.forEach((J)=>Bg(J,{recursive:!0,force:!0})),[`Removed the ${ir} marketplace from your Cursor account.`,"If /plugins in cursor-agent still lists CC Safety Net as installed, uninstall it there."].join(`
`)}function ot(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function ui(){return{command:sr,timeout:_l,failClosed:!0}}function Zr(_){return ot(_)&&_.command===sr}function Vg(_){return Object.keys(_).length===3&&_.command===sr&&_.timeout===_l&&_.failClosed===!0}function Kg(_){try{return JSON.parse(Gg(_,"utf-8"))}catch(L){if(L instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${_}: ${L.message}`);throw L}}function Il(_){let L=Kg(_);if(!ot(L))throw Error(`Cursor hooks config ${_} must be a JSON object`);if(L.version!==1)throw Error(`Cursor hooks config ${_} must set "version": 1`);if(L.hooks!==void 0&&!ot(L.hooks))throw Error(`Cursor hooks config ${_} "hooks" must be an object`);let U=ot(L.hooks)?L.hooks.preToolUse:void 0;if(U!==void 0&&!Array.isArray(U))throw Error(`Cursor hooks config ${_} "hooks.preToolUse" must be an array`);return L}function Al(_){let L=ot(_.hooks)?_.hooks.preToolUse:void 0;return Array.isArray(L)?L:[]}function Jg(_){if(!_.some(Zr))return[..._,ui()];return _.reduce((L,U)=>{if(!Zr(U))return L.result.push(U),L;if(!L.inserted)L.result.push(ui()),L.inserted=!0;return L},{result:[],inserted:!1}).result}function Ol(_,L,U){let J=ot(L.hooks)?L.hooks:{},Y={...L,hooks:{...J,preToolUse:U}};ln(_,`${JSON.stringify(Y,null,2)}
`)}function $l(_){let L=Xr(_);if(!pi(L))return Ug(qg(L),{recursive:!0}),ln(L,`${JSON.stringify({version:1,hooks:{preToolUse:[ui()]}},null,2)}
`),{path:L,alreadyInstalled:!1};let U=Il(L),J=Al(U),Y=J.filter(Zr);if(ot(U.hooks)&&Array.isArray(U.hooks.preToolUse)&&Y.length===1&&Y[0]!==void 0&&Vg(Y[0]))return{path:L,alreadyInstalled:!0};return Ol(L,U,Jg(J)),{path:L,alreadyInstalled:!1}}function Dl(_){let L=Xr(_);if(!pi(L))return{path:L,alreadyInstalled:!1};let U=Il(L),J=Al(U),Y=J.filter((re)=>!Zr(re));if(Y.length===J.length)return{path:L,alreadyInstalled:!1};return Ol(L,U,Y),{path:L,alreadyInstalled:!0}}function Yg(_){if(!_||typeof _!=="object"||Array.isArray(_))return[];let L=_.hooks;if(!L||typeof L!=="object"||Array.isArray(L))return[];let U=L.preToolUse;if(!Array.isArray(U))return[];return U.filter((J)=>!!J&&typeof J==="object"&&!Array.isArray(J)&&J.command===sr)}function Zg(_){let L=[];if(_.length>1)L.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let U=_[0];if(U&&U.failClosed!==!0)L.push('Managed hook is missing "failClosed": true; reinstall to repair');if(U&&U.timeout!==30)L.push('Managed hook "timeout" is not 30; reinstall to repair');return L}var Qr="Claude Code plugin",yi="Cursor plugin";function Xg(_){let L=mi(fi(_).cache,ir);if(!gi(L))return{};try{return{version:Wg(L).map((U)=>mi(L,U)).find((U)=>gi(mi(U,".cache-complete")))}}catch{return{unreadable:L}}}function Qg(_,L){if(L){let Y=["Cursor records enabled plugins on your Cursor account, which doctor cannot check, and keeps a plugin's files after it is uninstalled.","Cursor pins marketplace plugins to the commit they were added at, so `cc-safety-net update` cannot update this plugin, while the npx hook (`cc-safety-net install --cursor`) stays current."].join(" ");return{method:yi,configPath:L,duplicate:`The Cursor plugin also runs this check, so every tool call is checked twice. ${Y} If the plugin is installed, run \`cc-safety-net uninstall --cursor\`, uninstall CC Safety Net from /plugins in cursor-agent, then run \`cc-safety-net install --cursor\`.`,alone:`${Y} If /plugins in cursor-agent does not list CC Safety Net as installed, run \`cc-safety-net install --cursor\`.`}}let U=il(_);if(!U)return;let J="Cursor runs the Claude Code plugin only while it imports Claude Code plugins, which doctor cannot check.";return{method:Qr,configPath:U,duplicate:`The Claude Code plugin also runs this check in Cursor, so every tool call is checked twice. ${J} If Cursor runs it, run \`cc-safety-net uninstall --cursor\` to remove this hook.`,alone:`${J} If it stops, run \`cc-safety-net install --cursor\`.`}}function Nl(_){let L=ey(_),U=Xg(_.environment);if(U.unreadable)return L.status==="configured"?{...L,errors:[...L.errors??[],`Cannot read ${U.unreadable}, so doctor cannot tell whether the Cursor plugin also runs this check.`]}:{platform:"cursor",status:"not-inspected"};let J=Qg(_.environment,U.version);if(!J)return L;if(L.status==="configured")return{...L,errors:[...L.errors??[],J.duplicate]};return{platform:"cursor",status:"configured",method:J.method,configPath:J.configPath,errors:[...L.errors??[],J.alone]}}function ey(_){let L=Xr(_.environment);if(!gi(L))return{platform:"cursor",status:"n/a",configPath:L};let U;try{U=JSON.parse(zg(L,"utf-8"))}catch(re){return{platform:"cursor",status:"n/a",configPath:L,errors:[`Failed to parse Cursor hooks config ${L}: ${re instanceof Error?re.message:String(re)}`]}}let J=Yg(U);if(J.length===0)return{platform:"cursor",status:"n/a",configPath:L};let Y=Zg(J);return{platform:"cursor",status:"configured",method:"hook config",configPath:L,errors:Y.length>0?Y:void 0}}import{readdirSync as ny}from"node:fs";import{join as hi,resolve as ty}from"node:path";var vi="cc-safety-net";function bi(_){let L=_.env.get("DSH_HOME");return hi(L?.trim()?ty(Nn(L,_.home)):hi(_.home,".dsh"),"profiles")}function Ll(_){let L=bi(_),U=dn(L)?.isDirectory()?ny(L,{withFileTypes:!0}).filter((Y)=>Y.isDirectory()&&Y.name!=="node_modules").map((Y)=>{let re=hi(L,Y.name,"package.json");return{name:Y.name,configPath:re,manifest:vn(re)}}):[];return{installed:U.flatMap((Y)=>{if(Y.manifest.kind!=="ok")return[];let re=Y.manifest.value;if(Ze(Ze(re,"dependencies"),vi)===void 0)return[];let ie=Ze(Ze(Ze(re,"dsh"),"profile"),"bundles");return[{name:Y.name,configPath:Y.configPath,enabled:Array.isArray(ie)&&ie.includes(vi)}]}),unreadable:U.some((Y)=>Y.manifest.kind==="unreadable")}}function wi(_){return Ll(_).installed}function jl(_){let L=Ll(_.environment),U=L.installed.filter((re)=>re.enabled),J=L.installed.filter((re)=>!re.enabled),Y=J.map((re)=>`${vi} is installed in the ${re.name} profile but its bundle is disabled`);if(U.length>0)return{platform:"deepseek-harness",status:"configured",method:"dsh bundle",configPaths:U.map((re)=>re.configPath),...Y.length>0?{errors:Y}:{}};if(J.length>0)return{platform:"deepseek-harness",status:"disabled",method:"dsh bundle",configPaths:J.map((re)=>re.configPath),errors:Y};return L.unreadable?{platform:"deepseek-harness",status:"not-inspected"}:{platform:"deepseek-harness",status:"n/a"}}import{existsSync as ly}from"node:fs";import{existsSync as Ml,mkdirSync as ry,readFileSync as oy}from"node:fs";import{dirname as iy,join as xi}from"node:path";function ki(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Ci(_,L){return ki(_)&&_.command===L}function Hl(_,L){return ki(_)&&Array.isArray(_.hooks)&&_.hooks.some((U)=>Ci(U,L))}function mt(_,L){return{hooks:[{type:"command",command:_,timeout:L}]}}function jn(_,L){return _.flatMap((U)=>{if(!ki(U)||!Array.isArray(U.hooks))return[U];let J=U.hooks.filter((Y)=>!Ci(Y,L));if(J.length===U.hooks.length)return[U];return J.length===0?[]:[{...U,hooks:J}]})}function Ft(_,L,U){let J=_.filter((Y)=>Hl(Y,L));return J.length===1&&JSON.stringify(J[0])===JSON.stringify(mt(L,U))}function Mt(_,L){return _.find((U)=>Hl(U,L))}function Ut(_,L,U){let J=Array.isArray(_.hooks)?_.hooks.find((Y)=>Ci(Y,L)):void 0;return[..._.matcher===void 0||_.matcher===""||_.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...J?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...J?.timeout===U?[]:[`Managed hook "timeout" is not ${U}; reinstall to repair`]]}var gt=kn.devin,eo=30,sy={config:{},hooks:{},preToolUse:[]};function no(_,L=process.platform){let U=L==="win32"?_.env.get("APPDATA")||xi(_.home,"AppData","Roaming"):_.env.get("XDG_CONFIG_HOME")||xi(_.home,".config");return xi(U,"devin","config.json")}function Fl(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function ay(_){try{return{ok:!0,value:JSON.parse(yn(oy(_,"utf-8")))}}catch(L){return{ok:!1,message:L instanceof Error?L.message:String(L)}}}function Si(_){let L=ay(_);if(!L.ok)return`Failed to parse Devin CLI config ${_}: ${L.message}`;let U=L.value;if(!Fl(U))return`Devin CLI config ${_} must be a JSON object`;let J=U.hooks===void 0?{}:U.hooks;if(!Fl(J))return`Devin CLI config ${_} "hooks" must be an object`;let Y=J.PreToolUse===void 0?[]:J.PreToolUse;if(!Array.isArray(Y))return`Devin CLI config ${_} "hooks.PreToolUse" must be an array`;return{config:U,hooks:J,preToolUse:Y}}function Ul(_){let L=Si(_);if(typeof L==="string")throw Error(L);return L}function Gl(_,L,U){let J={...L.config,hooks:{...L.hooks,PreToolUse:U}};ln(_,`${JSON.stringify(J,null,2)}
`)}function Bl(_){let L=no(_),U=Ml(L)?Ul(L):sy;if(Ft(U.preToolUse,gt,eo))return{path:L,alreadyInstalled:!0};return ry(iy(L),{recursive:!0}),Gl(L,U,[...jn(U.preToolUse,gt),mt(gt,eo)]),{path:L,alreadyInstalled:!1}}function ql(_){let L=no(_);if(!Ml(L))return{path:L,alreadyInstalled:!1};let U=Ul(L),J=jn(U.preToolUse,gt);if(JSON.stringify(J)===JSON.stringify(U.preToolUse))return{path:L,alreadyInstalled:!1};return Gl(L,U,J),{path:L,alreadyInstalled:!0}}function Vl(_){let L=no(_.environment);if(!ly(L))return{platform:"devin",status:"n/a",configPath:L};let U=Si(L);if(typeof U==="string")return{platform:"devin",status:"n/a",configPath:L,errors:[U]};let J=Mt(U.preToolUse,gt);if(!J)return{platform:"devin",status:"n/a",configPath:L};let Y=Ut(J,gt,eo);return{platform:"devin",status:"configured",method:"hook config",configPath:L,errors:Y.length>0?Y:void 0}}import{existsSync as gy,readFileSync as yy}from"node:fs";import{existsSync as Gt,mkdirSync as cy,readFileSync as dy,rmSync as uy}from"node:fs";import{dirname as py,join as Ei}from"node:path";var ht=kn.droid,to=30;function ro(_){return Ei(_.home,".factory","hooks.json")}function Kl(_){return Ei(_.home,".factory","settings.json")}function Jl(_){return Ei(_.home,".factory","hooks","hooks.json")}function Pi(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Wl(_){try{return JSON.parse(yn(dy(_,"utf-8")))}catch(L){if(L instanceof SyntaxError)throw Error(`Failed to parse Factory Droid hooks config ${_}: ${L.message}`);throw L}}function Ri(_){let L=Wl(_);if(!Pi(L))throw Error(`Factory Droid hooks config ${_} must be a JSON object`);if(L.PreToolUse===void 0||Array.isArray(L.PreToolUse))return L;throw Error(`Factory Droid hooks config ${_} "PreToolUse" must be an array`)}function fy(_){if(!Gt(_))return{};let L=Wl(_);return Pi(L)&&Pi(L.hooks)&&L.hooks.PreToolUse!==void 0?{PreToolUse:L.hooks.PreToolUse}:{}}function my(_){let L=Jl(_);return{...fy(Kl(_)),...Gt(L)?Ri(L):{}}}function zl(_){return Array.isArray(_.PreToolUse)?_.PreToolUse:[]}function Yl(_,L,U){ln(_,`${JSON.stringify({...L,PreToolUse:U},null,2)}
`)}function Zl(_){let L=ro(_),U=Gt(L),J=U?Ri(L):my(_),Y=zl(J);if(U&&Ft(Y,ht,to))return{path:L,alreadyInstalled:!0};return cy(py(L),{recursive:!0}),Yl(L,J,[...jn(Y,ht),mt(ht,to)]),{path:L,alreadyInstalled:!1}}function Xl(_){let L=ro(_);if(!Gt(L))return{path:L,alreadyInstalled:!1};let U=Ri(L),J=zl(U),Y=jn(J,ht);if(JSON.stringify(Y)===JSON.stringify(J))return{path:L,alreadyInstalled:!1};let re=Gt(Kl(_))||Gt(Jl(_));if(Y.length===0&&Object.keys(U).length===1&&!re)return uy(L),{path:L,alreadyInstalled:!0};return Yl(L,U,Y),{path:L,alreadyInstalled:!0}}function Ql(_){let L=ro(_.environment);if(!gy(L))return{platform:"droid",status:"n/a",configPath:L};let U;try{U=JSON.parse(yn(yy(L,"utf-8")))}catch(ie){return{platform:"droid",status:"n/a",configPath:L,errors:[`Failed to parse Factory Droid hooks config ${L}: ${ie instanceof Error?ie.message:String(ie)}`]}}let J=typeof U==="object"&&U!==null&&"PreToolUse"in U?U.PreToolUse:void 0,Y=Mt(Array.isArray(J)?J:[],ht);if(!Y)return{platform:"droid",status:"n/a",configPath:L};let re=[...Y.commandRegex===void 0||Y.commandRegex===""?[]:['Managed hook has a "commandRegex" that narrows coverage; reinstall to repair'],...Ut(Y,ht,to)];return{platform:"droid",status:"configured",method:"hook config",configPath:L,errors:re.length>0?re:void 0}}import{existsSync as hy}from"node:fs";import{join as _i}from"node:path";var Ti="gemini-safety-net";function Ii(_){let L=_i(_.home,".gemini","extensions"),U=_i(L,Ti);if(!hy(U))return{platform:"gemini-cli",status:"n/a"};let J=_i(L,"extension-enablement.json"),Y=vn(J);if(Y.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let re=Y.kind==="ok"?Ze(Ze(Y.value,Ti),"overrides"):void 0;if(Array.isArray(re)&&re.some((pe)=>typeof pe==="string"&&pe.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:J,errors:[`${Ti} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:U}}function ec(_){return Ii(_.environment)}import{existsSync as ky,readFileSync as cc,statSync as Cy}from"node:fs";import{dirname as lc,join as xy}from"node:path";import{existsSync as tc,mkdirSync as vy,readFileSync as rc,rmSync as by}from"node:fs";import{dirname as wy,join as nc}from"node:path";var Bn=kn["grok-build"],io=30,Ai=mt(Bn,io);function so(_){return nc(_.env.get("GROK_HOME")??nc(_.home,".grok"),"hooks","cc-safety-net.json")}function ao(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function oc(_){try{let L=JSON.parse(_);return ao(L)?L:null}catch{return null}}function ic(_){let L=ao(_.hooks)?_.hooks.PreToolUse:void 0;return Array.isArray(L)?L:[]}function oo(_,L,U){let J=ao(L.hooks)?L.hooks:{};ln(_,`${JSON.stringify({...L,hooks:{...J,PreToolUse:U}},null,2)}
`)}function sc(_){let L=so(_);if(!tc(L))return vy(wy(L),{recursive:!0}),oo(L,{},[Ai]),{path:L,alreadyInstalled:!1};let U=oc(rc(L,"utf-8"));if(!U)return oo(L,{},[Ai]),{path:L,alreadyInstalled:!1};let J=ic(U);if(Ft(J,Bn,io))return{path:L,alreadyInstalled:!0};return oo(L,U,[...jn(J,Bn),Ai]),{path:L,alreadyInstalled:!1}}function ac(_){let L=so(_);if(!tc(L))return{path:L,alreadyInstalled:!1};let U=oc(rc(L,"utf-8"));if(!U)return{path:L,alreadyInstalled:!1};let J=ic(U),Y=jn(J,Bn);if(JSON.stringify(Y)===JSON.stringify(J))return{path:L,alreadyInstalled:!1};let re=ao(U.hooks)?U.hooks:{};if(Y.length===0&&Object.keys(U).length===1&&Object.keys(re).length===1)return by(L),{path:L,alreadyInstalled:!0};return oo(L,U,Y),{path:L,alreadyInstalled:!0}}function Oi(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function Sy(_){try{return Cy(_,{throwIfNoEntry:!1})?.isFile()===!0?cc(_,"utf-8"):""}catch{return}}function dc(_){let L=so(_.environment);if(!ky(L))return{platform:"grok-build",status:"n/a",configPath:L};let U;try{U=JSON.parse(cc(L,"utf-8"))}catch(Re){return{platform:"grok-build",status:"n/a",configPath:L,errors:[`Failed to parse Grok Build hooks config ${L}: ${Re instanceof Error?Re.message:String(Re)}`]}}let J=Oi(U)&&Oi(U.hooks)&&Array.isArray(U.hooks.PreToolUse)?U.hooks.PreToolUse:[],Y=Mt(J,Bn);if(!Y)return{platform:"grok-build",status:"n/a",configPath:L};let re=Array.isArray(Y.hooks)?Y.hooks.findIndex((Re)=>Oi(Re)&&Re.command===Bn):-1,ie=`global/cc-safety-net:pre_tool_use[${J.indexOf(Y)}].hooks[${re}]`,pe=xy(lc(lc(L)),"disabled-hooks"),me=Sy(pe),ke=me?.split(`
`).some((Re)=>Re.trim()===ie)===!0,Ce=[...me===void 0?[`Cannot read ${pe}, so doctor cannot tell whether Grok Build skips the hook`]:[],...ke?[`Grok Build skips the hook: ${ie} is listed in ${pe}; enable it in /hooks`]:[],...Ut(Y,Bn,io)];return{platform:"grok-build",status:ke?"disabled":"configured",method:"hook config",configPath:L,errors:Ce.length>0?Ce:void 0}}import{readFileSync as bc}from"node:fs";import{join as wc}from"node:path";var Pn="cc-safety-net",$i="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",Py=30;function uc(_){return`${$i}
# version: ${_}
`}function Ey(_){return`${uc(_)}name: ${Pn}
version: "${_}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function Ry(_){return`${uc(_)}"""CC Safety Net guard for Hermes Agent.

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
ANALYZER = [${kn["hermes-agent"].split(" ").map((L)=>`"${L}"`).join(", ")}]
TIMEOUT_SECONDS = ${Py}


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
`}function ar(_){return[{name:"__init__.py",content:Ry(_)},{name:"plugin.yaml",content:Ey(_)}]}import{mkdirSync as _y,readdirSync as Ty,readFileSync as pc,rmSync as Di}from"node:fs";import{basename as Iy,dirname as Ay,join as Hn}from"node:path";var Oy="__pycache__",$y=/^[a-z0-9][a-z0-9_-]{0,63}$/;function Dy(_){try{return pc(_,"utf-8").trim()}catch{return}}function Ni(_){let L=_.env.get("HERMES_HOME")?.trim();if(L&&Iy(Ay(L))==="profiles")return L;let U=L||Hn(_.home,".hermes"),J=Hn(U,"active_profile"),Y=Dy(J),re=Y?.toLowerCase();if(!re||re==="default")return U;if(!$y.test(re))throw Error(`Invalid Hermes profile name "${Y}" in ${J}; run \`hermes profile use <name>\` with a valid profile.`);return Hn(U,"profiles",re)}function Li(_){return Hn(Ni(_),"plugins",Pn)}function ji(_){return _.startsWith($i)}function Hi(_,L){let U=Li(_),J=dn(U);if(J&&(J.isSymbolicLink()||!J.isDirectory()))throw Error(`Refusing to ${L} ${U}: not a regular directory. Move or remove it and rerun ${L==="install"?"install":"uninstall"} --hermes-agent.`);return U}function fc(_,L){let U=dn(_);if(!U)return;if(U.isSymbolicLink()||!U.isFile())throw Error(`Refusing to ${L} ${_}: not a regular file. Move or remove it.`);let J=pc(_,"utf-8");if(!ji(J))throw Error(`Refusing to ${L} unmanaged file at ${_}. Move or remove it.`);return J}function mc(_){let L=Hi(_,"install"),U=ar(pn());if(U.map((Y)=>fc(Hn(L,Y.name),"overwrite")).every((Y,re)=>Y===U[re]?.content))return{path:L,alreadyInstalled:!0};return _y(L,{recursive:!0}),U.forEach((Y)=>{ln(Hn(L,Y.name),Y.content)}),{path:L,alreadyInstalled:!1}}function Fi(_){let L=Hi(_,"remove");if(!dn(L))return[];return ar(pn()).filter((U)=>fc(Hn(L,U.name),"remove")!==void 0)}function gc(_){let L=Hi(_,"remove");if(!dn(L))return{path:L,alreadyInstalled:!1};let U=Fi(_);if(U.forEach((J)=>{Di(Hn(L,J.name))}),Di(Hn(L,Oy),{recursive:!0,force:!0}),Ty(L).length===0)Di(L,{recursive:!0});return{path:L,alreadyInstalled:U.length>0}}var lr="hermes-agent",yc=/^([^\s#][^:]*):/,Ny=/^\s+([A-Za-z_][\w-]*):/,hc=/^\s+-\s*(.*)$/;function Ly(_){return _.trim().replace(/^(["'])(.*)\1$/,"$2")}function jy(_){let L=_.split(/\r?\n/),U=L.findIndex((re)=>yc.exec(re)?.[1]?.trim()==="plugins");if(U===-1)return[];let J=L.slice(U+1),Y=J.findIndex((re)=>yc.test(re));return Y===-1?J:J.slice(0,Y)}function vc(_,L){let U=jy(_),J=U.findIndex((ie)=>Ny.exec(ie)?.[1]===L);if(J===-1)return[];let Y=U.slice(J+1),re=Y.findIndex((ie)=>!hc.test(ie));return(re===-1?Y:Y.slice(0,re)).map((ie)=>Ly(hc.exec(ie)?.[1]??""))}function Hy(_){try{return bc(wc(Ni(_),"config.yaml"),"utf-8")}catch{return}}function Mi(_){let L=Hy(_)??"";return vc(L,"enabled").includes(Pn)&&!vc(L,"disabled").includes(Pn)}function kc(_){return/^# version:\s*(.+)$/m.exec(_)?.[1]?.trim()}function Fy(_,L){let U=dn(_);if(!U)return{error:`${L.name} is missing from ${_}; run install --hermes-agent`};if(U.isSymbolicLink()||!U.isFile())return{error:`${_} is a symlink or not a regular file; move or remove it`};try{let J=bc(_,"utf-8");if(!ji(J))return{error:`Unmanaged ${L.name} occupies ${_}; move or remove it`};if(kc(J)===pn()&&J!==L.content)return{error:`Modified ${L.name} occupies ${_}; run install --hermes-agent to restore it`};return{content:J}}catch(J){return{error:`Failed to read ${_}: ${J instanceof Error?J.message:String(J)}`}}}function My(_){try{return{path:Li(_)}}catch(L){return{error:L instanceof Error?L.message:String(L)}}}function Cc(_){let L=My(_.environment);if("error"in L)return{platform:lr,status:"n/a",errors:[L.error]};let U=L.path,J=Gr(lr,U);if(J)return J;let Y=ar(pn()).map((me)=>Fy(wc(U,me.name),me)),re=Y.flatMap((me)=>("error"in me)?[me.error]:[]);if(re.length>0)return{platform:lr,status:"n/a",configPath:U,errors:re};let ie=Y.some((me)=>("content"in me)&&kc(me.content)!==pn()),pe=ie?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!Mi(_.environment))return{platform:lr,status:"disabled",method:"plugin directory",configPath:U,errors:[`${Pn} is not enabled in Hermes; run \`hermes plugins enable ${Pn}\``,...pe]};return{platform:lr,status:"configured",method:"plugin directory",configPath:U,errors:ie?pe:void 0}}import{existsSync as Uy,readFileSync as Gy}from"node:fs";import{join as Bi}from"node:path";var By=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/,Ui="cc-safety-net",co="plugin config",qy=new Set(["event","matcher","command","timeout"]),Vy=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionResult","UserPromptSubmit","UserPromptQueued","TurnStarted","Stop","StopFailure","Interrupt","SessionStart","SessionEnd","SessionHeartbeat","SubagentStart","SubagentStop","TaskStarted","PreCompact","PostCompact","Notification"]);function xc(_){return _.env.get("KIMI_CODE_HOME")||Bi(_.home,".kimi-code")}function lo(_,L){let U=[""],J="",Y=0;for(let re=0;re<_.length;re++){let ie=_[re];if(J!==""){let pe=J==='"'&&ie==="\\"?_[++re]??"":"";if(U[U.length-1]+=ie+pe,pe===""&&ie===J)J="";continue}if(ie==="#"){let pe=_.indexOf(`
`,re);re=(pe===-1?_.length:pe)-1;continue}if(ie===L&&Y===0){U.push("");continue}if(ie==='"'||ie==="'")J=ie;if(ie==="["||ie==="{")Y++;if(ie==="]"||ie==="}")Y--;U[U.length-1]+=ie}return U.map((re)=>re.trim()).filter((re)=>re!=="")}function Sc(_){let L=/^(?:"([^"]*)"|'([^']*)'|([^\s="']+))\s*=\s*([\s\S]+)$/.exec(_);return L?{key:L[1]??L[2]??L[3]??"",value:L[4]??""}:void 0}function Gi(_){return _===void 0?void 0:/^("""|'''|"|')([\s\S]*)\1$/.exec(_)?.[2]}function Ky(_){let L=_.split(/(?=^\s*\[)/m),U=L.filter((J)=>!/^\s*\[/.test(J)).flatMap((J)=>lo(J,`
`)).map(Sc).find((J)=>J?.key==="hooks")?.value;if(U!==void 0)return lo(U.slice(1,-1),",").map((J)=>lo(J.slice(1,-1),","));return L.filter((J)=>/^\s*\[\[hooks]]/.test(J)).map((J)=>lo(J.replace(/^\s*\[\[hooks]]/,""),`
`))}function Jy(_){let L=_.map(Sc),U=_.find((Ce,Re)=>L[Re]===void 0),J=L.find((Ce)=>Ce!==void 0&&!qy.has(Ce.key))?.key,Y=L.find((Ce,Re)=>Ce!==void 0&&L.findIndex((Ne)=>Ne?.key===Ce.key)<Re)?.key,re=(Ce)=>L.find((Re)=>Re?.key===Ce)?.value,ie=re("matcher"),pe=re("timeout"),me=Number(pe?.replace(/(?<=[\da-f])_(?=[\da-f])/gi,""));return[[U!==void 0,`"${U}" is not a key = value pair`],[J!==void 0,`unknown key "${J}"`],[Y!==void 0,`duplicate key "${Y}"`],[!Vy.has(Gi(re("event"))??""),'"event" is not a Kimi Code hook event'],[ie!==void 0&&Gi(ie)===void 0,'"matcher" is not a string'],[!Gi(re("command")),'"command" is missing or empty'],[pe!==void 0&&!(Number.isInteger(me)&&me>=1&&me<=600),'"timeout" is not an integer from 1 to 600']].find(([Ce])=>Ce)?.[1]}function Wy(_){let L=Bi(xc(_),"plugins","installed.json"),U=vn(L);if(U.kind==="missing")return;let J=U.kind==="ok"?Ze(U.value,"plugins"):void 0;if(!Array.isArray(J))return{platform:"kimi-code",status:"n/a",configPath:L,errors:[`Cannot read ${L}, so doctor cannot tell whether the Kimi Code plugin is installed`]};let Y=J.find((re)=>Ze(re,"id")===Ui);if(Y===void 0)return;if(Ze(Y,"enabled")!==!0)return{platform:"kimi-code",status:"disabled",method:co,configPath:L,errors:[`${Ui} is installed but not enabled in Kimi Code; run /plugins enable ${Ui}`]};return{platform:"kimi-code",status:"configured",method:co,configPath:L}}function uo(_){let L=Bi(xc(_.environment),"config.toml"),U=()=>Wy(_.environment)??{platform:"kimi-code",status:"n/a",configPath:L};if(!Uy(L))return U();let J;try{J=Gy(L,"utf-8")}catch(ie){return{platform:"kimi-code",status:"n/a",configPath:L,errors:[`Failed to read ${L}: ${ie instanceof Error?ie.message:String(ie)}`]}}if(!By.test(J))return U();let re=(/"""|'''/.test(J)?[]:Ky(J)).flatMap((ie,pe)=>{let me=Jy(ie);return me===void 0?[]:[`Kimi Code ignores every hook because hooks entry ${pe+1} is invalid (${me}); fix it in ${L}`]});return{platform:"kimi-code",status:re.length>0?"disabled":"configured",method:"hook config",configPath:L,errors:re.length>0?re:void 0}}import{readFileSync as $c}from"node:fs";import{join as dr}from"node:path";var un="cc-safety-net",xn="index.js",Bt="openclaw.plugin.json",qt="package.json";var po="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as zy,lstatSync as Yy,readdirSync as Zy,readFileSync as Xy}from"node:fs";import{dirname as Pc,join as qn}from"node:path";import{fileURLToPath as Qy}from"node:url";var qi=qn("openclaw",un),vt=`run \`openclaw plugins enable ${un}\``,eh="config reload superseded by a newer runtime config source",nh=[xn,Bt,qt];function Ec(_){let L=_.env.get("OPENCLAW_HOME")?.trim();return L?Nn(L,_.home):_.home}function Rc(_){let L=Ec(_),U=_.env.get("OPENCLAW_STATE_DIR")?.trim();if(U)return Nn(U,L);let J=_.env.get("OPENCLAW_CONFIG_PATH")?.trim();return J?Pc(Nn(J,L)):qn(L,".openclaw")}function _c(_){let L=_.env.get("OPENCLAW_CONFIG_PATH")?.trim();return L?Nn(L,Ec(_)):qn(Rc(_),"openclaw.json")}function cr(_){return qn(Rc(_),"extensions",un)}function th(_){let L=Zy(_);if(L.length===0)return!0;if(L.some((Y)=>!nh.includes(Y)))return!1;let U=qn(_,xn),J=dn(U);return J!==void 0&&!J.isSymbolicLink()&&J.isFile()&&Xy(U,"utf-8").startsWith(po)}function Vi(_){let L=cr(_),U=dn(L);if(!U)return;if(!U.isSymbolicLink()&&U.isDirectory()&&th(L))return;throw Error(`Refusing to modify ${L}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function Tc(){let _=Pc(Qy(import.meta.url));return[qn(_,qi),qn(_,"..",qi),qn(_,"..","..","..","dist",qi)]}function Ki(_=Tc()){return _.find((L)=>zy(L)&&Yy(L).isDirectory())}function rh(_=Tc()){let L=Ki(_);if(!L)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return L}function Ic(_=rh()){return[["openclaw","plugins","install",_,"--force","--accept-capabilities"]]}function oh(_){let L=(()=>{try{return JSON.parse(_)}catch{return}})(),U=Ze(Ze(L,"plugin"),"status");return typeof U==="string"?U:void 0}async function ih(){await fn(["openclaw","plugins","enable",un]).catch((_)=>{if(!(_ instanceof Error&&_.message.includes(eh)))throw _})}async function Ac(_){let L=async()=>oh(await fn(["openclaw","plugins","inspect",un,"--runtime","--json"],{stdoutOnly:!0})),U=await L(),J=U==="disabled"&&_;if(J)await ih();let Y=J?await L():U;if(Y==="loaded")return;throw Error(`${Y===void 0?`The ${un} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:Y==="disabled"?`OpenClaw reports the ${un} plugin with status "disabled"; ${vt}.`:`OpenClaw reports the ${un} plugin with status "${Y}".`} Run \`openclaw plugins inspect ${un} --runtime\` for details.`)}var fo="openclaw";function Vt(_,L){let U=dr(_,L),J=dn(U);if(!J)return{error:`${L} is missing from ${U}; run install --openclaw`};if(J.isSymbolicLink()||!J.isFile())return{error:`${U} is a symlink or not a regular file; move or remove it`};try{return{content:$c(U,"utf-8")}}catch(Y){return{error:`Failed to read ${U}: ${Y instanceof Error?Y.message:String(Y)}`}}}function Dc(_){try{return JSON.parse(yn(_))}catch{return}}function sh(_){let L=Vt(_,Bt);if("error"in L)return L.error;if(Ze(Dc(L.content),"id")===un)return;return`${dr(_,Bt)} is not a valid ${un} manifest; run install --openclaw`}function ah(_){let L=Vt(_,qt);if("error"in L)return L.error;let U=Ze(Ze(Dc(L.content),"openclaw"),"extensions");if(Array.isArray(U)&&U.includes(`./${xn}`))return;return`${dr(_,qt)} does not point OpenClaw at ${xn}; run install --openclaw`}function Oc(_){return Array.isArray(_)?_.filter((L)=>typeof L==="string"):[]}function lh(_){let L=_c(_);if(!dn(L))return`${un} is not enabled; ${vt}`;let U=(()=>{try{return JSON.parse(yn($c(L,"utf-8")))}catch{return}})();if(U===void 0)return`Failed to read ${L}; fix it, then ${vt}`;let J=Ze(U,"plugins");if(Ze(J,"enabled")===!1)return`plugins.enabled is false in ${L}; no OpenClaw plugin loads`;let Y=Ze(Ze(Ze(J,"entries"),un),"enabled");if(Oc(Ze(J,"deny")).includes(un)||Y===!1)return`${un} is disabled in ${L}; ${vt}`;let re=Oc(Ze(J,"allow"));if(re.length>0&&!re.includes(un))return`plugins.allow in ${L} does not list ${un}; add it, then ${vt}`;if(re.includes(un)||Y===!0)return;return`${un} is not enabled; ${vt}`}function Nc(_){return/^\/\/ version:\s*(.+)$/m.exec(_)?.[1]?.trim()}function ch(_,L,U){if(U===void 0)return[];let J=Vt(U,xn);if(!(("content"in J)&&Nc(J.content)===L))return[];return[xn,Bt,qt].flatMap((re)=>{let ie=Vt(_,re),pe=Vt(U,re);if("error"in ie||"error"in pe||ie.content===pe.content)return[];return[`Modified ${re} occupies ${dr(_,re)}; run install --openclaw to restore it`]})}function Lc(_){let L=cr(_.environment),U=Gr(fo,L);if(U)return U;let J=Vt(L,xn),re=["error"in J?J.error:J.content.startsWith(po)?void 0:`Unmanaged ${xn} occupies ${dr(L,xn)}; move or remove it`,sh(L),ah(L)].filter((Ce)=>Ce!==void 0),ie="content"in J?Nc(J.content):void 0,pe=re.length>0?re:ch(L,ie,Ki());if(pe.length>0)return{platform:fo,status:"n/a",configPath:L,errors:pe};let me=ie===pn()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],ke=lh(_.environment);if(ke)return{platform:fo,status:"disabled",method:"plugin directory",configPath:L,errors:[ke,...me]};return{platform:fo,status:"configured",method:"plugin directory",configPath:L,errors:me.length>0?me:void 0}}import{existsSync as vh,readFileSync as bh}from"node:fs";import{basename as wh}from"node:path";import{existsSync as mo,readFileSync as Wi,rmSync as dh}from"node:fs";import{join as In}from"node:path";import{pathToFileURL as uh}from"node:url";var ur="cc-safety-net",bt=`${ur}@latest`,zi=["opencode.json","opencode.jsonc"],ph=60,fh=250,jc="CCSafetyNetPlugin",mh={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function Hc(_){return In(_.env.get("XDG_CONFIG_HOME")||In(_.home,".config"),"opencode")}function Yi(_){return _.env.get("OPENCODE_CONFIG_DIR")||Hc(_)}function Zi(_){return zi.map((L)=>In(Yi(_),L))}function Xi(_){return[...new Set([Yi(_),Hc(_)])].flatMap((L)=>zi.map((U)=>In(L,U)))}function Fc(_){return In(_.env.get("XDG_CACHE_HOME")||In(_.home,".cache"),"opencode","packages",bt)}function Mc(_){dh(Fc(_),{recursive:!0,force:!0})}async function Uc(_){let L=(await fn(["opencode","--version"],{stdoutOnly:!0})).trim(),U=/^(?:opencode\s+)?v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(L),J=Number(U?.[1]),Y=Number(U?.[2]),re=Number(U?.[3]);if(!U||J!==1&&J!==2||J===1&&(Y<18||Y===18&&re<29)||J===2&&Y===0&&re<6)throw Error(`OpenCode 1.18.29+ or 2.0.6+ is required; found ${L||"an unknown version"}.`);if(J===2){for(let ie of Zi(_)){if(!mo(ie))continue;let pe=es(Wi(ie,"utf-8"),ie);if(["plugin","plugins"].some((ke)=>{let Ce=Ze(pe,ke);return Array.isArray(Ce)&&Ce.some((Re)=>go(Re)&&(typeof Re==="string"?Re:Ze(Re,"package"))!==bt)}))throw Error(`Change the cc-safety-net package spec in ${ie} to ${bt}, preserving its options, then retry. Adding another spec would create a duplicate plugin ID.`)}return{commands:[],afterInstall:async()=>{if((await fn(["opencode","plugin","add",bt],{stdoutOnly:!0})).includes("is already configured in"))await Ji(),await fn(["opencode","plugin","update",bt]);let pe=await Ji();if(!/^cc-safety-net\s+\S+\s+cc-safety-net@latest\s*$/m.test(pe))throw Error("OpenCode did not load cc-safety-net from cc-safety-net@latest. Run `opencode plugin list` for details.");let me=["--param",`location[directory]=${process.cwd()}`];await fn(["opencode","api","integration.list",...me]);let ke=await fn(["opencode","api","plugin.list",...me],{stdoutOnly:!0}),Ce=Qi(ke);if(Ce)throw Error(Ce);if(!Gc(ke).some(Bc))throw Error("OpenCode lists no active cc-safety-net for this directory. Run `opencode api plugin.list` for details.")}}}return Mc(_),{commands:[["opencode","plugin","-g","-f",bt]],afterInstall:()=>yh(_)}}function Gc(_){return gh(_).filter((L)=>Ze(L,"id")===ur||go(Ze(Ze(L,"source"),"target"))).map((L)=>Ze(L,"state"))}function Bc(_){return Ze(_,"status")==="active"}function Qi(_){let L=Gc(_);if(L.some(Bc))return;let U=L.find((J)=>Ze(J,"status")==="failed");if(!U)return;return`OpenCode reports cc-safety-net failed: ${String(Ze(U,"error")).split(`
`)[0]}`}function gh(_){if(!_)return[];try{let L=Ze(JSON.parse(_),"data");return Array.isArray(L)?L:[]}catch{return[]}}async function Ji(_=1){let L=await fn(["opencode","plugin","list"],{stdoutOnly:!0});if(/^cc-safety-net\s|\scc-safety-net@latest\s*$/m.test(L)||_===ph)return L;return await new Promise((U)=>setTimeout(U,fh)),Ji(_+1)}async function yh(_){let L=In(Fc(_),"node_modules",ur),U=In(L,"package.json");if(!mo(U))throw Error(`The OpenCode plugin cache at ${L} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${bt}\` for details.`);let J=Ze(JSON.parse(Wi(U,"utf-8")),"main");if(typeof J!=="string")throw Error(`The cached OpenCode plugin at ${L} declares no "main" entry.`);let Y=In(L,J);if(typeof(await import(uh(Y).href))[jc]==="function")return;throw Error(`The cached OpenCode plugin at ${Y} does not export a callable ${jc}, so OpenCode would load nothing and fail open.`)}function es(_,L){try{return JSON.parse(yn(_))}catch(U){if(U instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${L}: ${U.message}`);throw U}}function go(_){let L=typeof _==="string"?_:Ze(_,"package");return typeof L==="string"&&(L===ur||L.startsWith(`${ur}@`))}function ns(_){return["plugin","plugins"].some((L)=>{let U=Ze(_,L);return Array.isArray(U)&&U.some(go)})}function hh(_,L){let J=["plugin","plugins"].flatMap((Y)=>{let re=fl(_,Y,mh);if(!re)return[];let ie=[],pe=0,me=re.start+1,ke=_.slice(re.start+1,re.end).matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|[^"\s{}[\],/]+|[{}[\],]/g);for(let Ce of ke){if(Ce[0].startsWith("//")||Ce[0].startsWith("/*"))continue;let Re=re.start+1+Ce.index;if(pe===0)me=Re;if(Ce[0]==="{"||Ce[0]==="[")pe++;if(Ce[0]==="}"||Ce[0]==="]")pe--;if(pe!==0||Ce[0]===",")continue;let Ne=Re+Ce[0].length;if(go(JSON.parse(yn(_.slice(me,Ne)))))ie.push({start:me,end:Ne})}return ie}).sort((Y,re)=>Y.start-re.start).reverse().reduce((Y,re)=>{let ie=/^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*,/.exec(Y.slice(re.end));if(ie?.[0].includes("/")){let pe=re.end+ie[0].length-1;return Y.slice(0,re.start)+Y.slice(re.end,pe)+Y.slice(pe+1)}return pl(Y,re)},_);return es(J,L),J}function qc(_){Mc(_);let L=Xi(_),U=L.find((re)=>mo(re)),J=[],Y=[];for(let re of L){if(!mo(re))continue;try{let ie=Wi(re,"utf-8");if(!ns(es(ie,re)))continue;ln(re,hh(ie,re)),Y.push(re)}catch(ie){J.push(ie instanceof Error?ie.message:String(ie))}}if(J.length>0)throw Error(J.join(`
`));return{path:Y[0]??U??In(Yi(_),zi[0]),alreadyInstalled:Y.length>0}}function Kt(_){let L=[];for(let U of _.openCodeVersion?.startsWith("2.")?Zi(_.environment):Xi(_.environment))if(vh(U))try{let J=bh(U,"utf-8"),Y=yn(J),re=JSON.parse(Y);if(ns(re)){let ie=Qi(_.openCodePluginListOutput);if(ie)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:U,errors:[...L,ie]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:U,errors:L.length>0?L:void 0}}}catch(J){L.push(`Failed to parse ${wh(U)}: ${J instanceof Error?J.message:String(J)}`)}return{platform:"opencode",status:"n/a",errors:L.length>0?L:void 0}}import{join as Vc}from"node:path";var Jc="dist/pi/index.js",Kc=new Set([Jc,"index.js"]),kh=/[*?[\]{}]/;function ts(_){let L=_.env.get("PI_CODING_AGENT_DIR");return Vc(L?Nn(L,_.home):Vc(_.home,".pi","agent"),"settings.json")}function rs(_){if(typeof _!=="string")return!1;return _==="npm:cc-safety-net"||_.startsWith("npm:cc-safety-net@")}function Ch(_){if(!Array.isArray(_)||_.length===0)return!1;if(!_.every((J)=>typeof J==="string"))return!1;let L=(J)=>_.some((Y)=>Y.startsWith(J)&&Y.slice(1).replace(/^\.[/\\]/,"")===Jc);if(L("-"))return!1;if(L("+"))return!0;let U=_.filter((J)=>!/^[-+!]/.test(J));return(U.length===0||U.some((J)=>Kc.has(J)))&&!_.some((J)=>J.startsWith("!")&&(Kc.has(J.slice(1))||kh.test(J)))}function Wc(_){let L=ts(_.environment),U=vn(L);if(U.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(U.kind==="missing")return{platform:"pi",status:"n/a"};let J=Ze(U.value,"packages");if(!Array.isArray(J))return{platform:"pi",status:"n/a"};let Y=J.find((ie)=>rs(typeof ie==="string"?ie:Ze(ie,"source")));if(Y===void 0)return{platform:"pi",status:"n/a"};let re=Ze(Y,"extensions");if(re!==void 0&&!Ch(re))return{platform:"pi",status:"disabled",method:"package config",configPath:L,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:L}}var xh={amp:Za,"antigravity-cli":nl,"claude-code":sl,codex:ll,"copilot-cli":El,cursor:Nl,"deepseek-harness":jl,devin:Vl,droid:Ql,"gemini-cli":ec,"grok-build":dc,"hermes-agent":Cc,"kimi-code":uo,openclaw:Lc,opencode:Kt,pi:Wc};function Jt(_,L,U){let J={...U,cwd:L,environment:_};return Er.map((Y)=>Sh(xh[Y](J)))}function Sh(_){if(_.status==="not-inspected")return{platform:_.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:_.platform,detected:_.status!=="n/a",configured:_.status==="configured",inspectionStatus:_.status!=="n/a"?"verified":_.errors&&_.errors.length>0?"failed":"not-applicable",method:_.method,configPath:_.configPath,configPaths:_.configPaths,errors:_.errors}}import{join as Ph}from"node:path";var Eh=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),Rh=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),commandTools:Object.freeze([]),safety:Object.freeze({level:"standard"}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),_h={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function zc(_){let L=Ph(_.tmpdir,"cc-safety-net-self-test"),U=Eh.map((J)=>{let Y=G(_,l("self-test",{command:J.command},{kind:"command",shell:"auto"},{configCwd:L,executionCwd:L},J.command),{guard:{dependencies:{loadPolicySnapshot:()=>Rh,getModes:()=>_h,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),re=J.expectBlocked?"blocked":"allowed",ie=Y.decision.kind==="deny"?"blocked":"allowed";return{command:J.command,description:J.description,expected:re,actual:ie,passed:re===ie,reason:Y.decision.kind==="deny"?Y.decision.reason:void 0,ruleId:Y.decision.kind==="deny"?Y.decision.ruleId:void 0}});return{passed:U.filter((J)=>J.passed).length,failed:U.filter((J)=>!J.passed).length,total:U.length,results:U}}function os(_){let L=mn({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},_);if($n(L.errors))return null;return{json:L.flags.json,skipUpdateCheck:L.flags.skipUpdateCheck}}async function Yc(_,L={}){let U=await er(!L.json,()=>{let J=Ih(_,L);return{ready:J,finish:()=>J}},()=>Qt(),{loadingMessage:"Checking system status…"});if(L.json)console.log(JSON.stringify(U,null,2));else Ah(U);return U.engineSelfTest.failed>0||U.findings.some((J)=>J.severity==="error")?1:0}async function Ih(_,L){let U=L.cwd??process.cwd(),J=await Dr((Me)=>Kt({environment:_,cwd:U,openCodeVersion:Me}).status!=="n/a",void 0,U),Y=Jt(_,U,{ampPluginListOutput:J.ampPluginListOutput,codexPluginListOutput:J.codexPluginListOutput,copilotCliVersion:J.versions["copilot-cli"],openCodeVersion:J.versions.opencode,openCodePluginListOutput:J.openCodePluginListOutput}),re=ma(_,U),ie=ga(_),pe=R(_,{cwd:U}),me=pe.policy,ke=P(me,_.env),Ce=V(me,ke.capabilities),Re=Ir(_,7),Ne=Ka(_,U),_e=[Nt(U),Lt(_)].filter((Me)=>Th(Me)),Te=L.skipUpdateCheck?{currentVersion:pn(),latestVersion:null,updateAvailable:!1}:await Gn(),We={hooks:Y,engineSelfTest:zc(_),userConfig:re.userConfig,projectConfig:re.projectConfig,configState:ze(pe),effectiveRules:re.effectiveRules,environment:ie,effectiveSafety:{selectedPreset:me.safety.level,level:ke.effectiveLevel,capabilities:ke.capabilities,ruleOverrides:me.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(Ce).filter(([,Me])=>Me.source==="rule_override"&&Me.override==="off"&&Me.inheritedEnabled&&Me.changesInherited).map(([Me])=>Me),ruleCounts:{stored:Object.keys(me.destructiveCommandRuleOverrides).length,effective:Object.values(Ce).filter((Me)=>Me.changesInherited).length},...pe.policyScopes?{policyScopes:pe.policyScopes}:{}},...Ne.length>0?{v2Leftovers:Ne}:{},..._e.length>0?{legacyConfigs:_e}:{},posture:Ta(_,re.userConfig.path),activity:Re,update:Te,system:J};return{...We,findings:ha(We)}}function Ah(_){console.log(),console.log(ba(_.hooks)),console.log(),console.log(wa(_.engineSelfTest)),console.log(),console.log(ka(_)),console.log(),console.log(Ca(_.environment)),console.log(),console.log(xa(_)),console.log(),console.log(Sa(_.findings)),console.log(),console.log(Pa(_.activity)),console.log(),console.log(Ra(_.system)),console.log(),console.log(Ea(_.update)),console.log(_a(_))}import{existsSync as Oh}from"node:fs";var $h=/^[A-Za-z0-9_@%+=:,./-]+$/,Zc="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function is(_){let L=mn({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},_);if($n(L.errors))return console.error(Zc),console.error("Pass -- before a command that starts with dashes."),null;if(L.values.cwd!==void 0&&!Oh(L.values.cwd))return console.error(`Error: --cwd path does not exist: ${L.values.cwd}`),null;let U=L.positionals.length===1?L.positionals[0]:L.positionals.map((J)=>$h.test(J)?J:`'${J.replaceAll("'","'\\''")}'`).join(" ");if(!U)return console.error("Error: No command provided"),console.error(Zc),null;return{json:L.flags.json,cwd:L.values.cwd,command:U}}function Xc(_){if(_)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function Qc(_,L){let J=L-18;return[`${_.dtl}${_.dh.repeat(L)}${_.dtr}`,`${_.dv}  Command Analysis${" ".repeat(J)}${_.dv}`,`${_.dbl}${_.dh.repeat(L)}${_.dbr}`]}function ss(_){return JSON.stringify(_)}function ed(_,L=0){return`[${_.map((J,Y)=>va(J,Y,L)).join(",")}]`}function pr(_,L,U=70){let J=_.split(" "),Y=[],re="";for(let ie of J)if(re&&re.length+ie.length+1>U)Y.push(re),re=ie;else re=re?`${re} ${ie}`:ie;if(re)Y.push(re);return Y.map((ie,pe)=>pe===0?ie:`${L}${ie}`)}function nd(_,L,U){let J=[];switch(_.type){case"parse":return null;case"env-strip":return J.push(""),J.push(`STEP ${L} ${U.h} Strip environment variables`),J.push(`  Removed: ${_.envVars.map((Y)=>`${Y}=<redacted>`).join(", ")}`),J.push(`  Tokens:  ${ss(_.output)}`),{lines:J,incrementStep:!0};case"leading-tokens-stripped":return J.push(""),J.push(`STEP ${L} ${U.h} Strip wrappers`),J.push(`  Removed: ${_.removed.join(", ")}`),J.push(`  Tokens:  ${ss(_.output)}`),{lines:J,incrementStep:!0};case"shell-wrapper":return J.push(""),J.push(`STEP ${L} ${U.h} Detect shell wrapper`),J.push(`  Wrapper: ${_.wrapper} -c`),J.push(`  Inner:   ${_.innerCommand}`),{lines:J,incrementStep:!0};case"interpreter":{if(J.push(""),J.push(`STEP ${L} ${U.h} Detect interpreter`),J.push(`  Interpreter: ${_.interpreter}`),J.push(`  Code:        ${_.codeArg}`),_.paranoidBlocked)J.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:J,incrementStep:!0}}case"busybox":return J.push(""),J.push(`STEP ${L} ${U.h} Busybox wrapper`),J.push(`  Subcommand: ${_.subcommand}`),{lines:J,incrementStep:!0};case"transparent-wrapper":return J.push(""),J.push(`STEP ${L} ${U.h} Transparent wrapper`),J.push(`  Wrapper: ${_.wrapper}`),J.push(`  Tokens:  ${ss(_.output)}`),{lines:J,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(J.push(""),J.push(`STEP ${L} ${U.h} Match rules`),J.push(`  Rule:   ${_.rule}()`),_.matched)J.push("  Result: MATCHED");else J.push("  Result: No match");return{lines:J,incrementStep:!0}}case"worktree-relaxation":return J.push(""),J.push(`STEP ${L} ${U.h} Worktree relaxation`),J.push(`  Mode:   ${n.worktree.name}`),J.push(`  Git cwd: ${_.gitCwd}`),J.push("  Result: Allowed local discard in linked worktree"),{lines:J,incrementStep:!0};case"temp-root-relaxation":return J.push(""),J.push(`STEP ${L} ${U.h} Temp-root relaxation`),J.push(`  Git cwd: ${_.gitCwd}`),J.push("  Result: Allowed git discard in a temp-root repository"),{lines:J,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(_.embeddedCommandFound)return J.push(""),J.push(`STEP ${L} ${U.h} Fallback scan`),J.push(`  Found: ${_.embeddedCommandFound}`),{lines:J,incrementStep:!0};return null}case"custom-rules-check":{if(_.rulesChecked){if(J.push(""),J.push(`STEP ${L} ${U.h} Custom rules`),_.matched)J.push("  Result: MATCHED");else J.push("  Result: No match");return{lines:J,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(_.matched)return J.push(""),J.push(`STEP ${L} ${U.h} Dangerous text check`),J.push(`  Token:  ${_.token}`),J.push("  Result: MATCHED"),{lines:J,incrementStep:!0};return null}case"strict-unparseable":return J.push(""),J.push(`STEP ${L} ${U.h} Strict mode check`),J.push(`  Command: ${_.rawCommand}`),J.push("  Result:  ✗ UNPARSEABLE"),{lines:J,incrementStep:!0};case"segment-skipped":return null;case"error":return J.push(""),J.push(`ERROR: ${_.message}`),{lines:J,incrementStep:!1};default:return _}}function as(_,L){let U=Xc(L?.asciiOnly??!1),J=58,Y=[],re=1;Y.push(...Qc(U,58)),Y.push("");let ie=_.trace.steps.find((Te)=>Te.type==="error");if(ie&&ie.type==="error"){Y.push("ERROR"),Y.push(`  ${ie.message}`),Y.push(""),Y.push("RESULT"),Y.push(`  Status: ${_.result==="blocked"?en.red("BLOCKED"):en.green("ALLOWED")}`),Y.push(""),Y.push("CONFIG");let Te=_.configSource??"none";return Y.push(`  Path: ${Te}`),Y.join(`
`)}let pe=_.trace.steps.find((Te)=>Te.type==="parse");if(pe&&pe.type==="parse"){Y.push("INPUT"),Y.push(`  ${pe.input}`),Y.push(""),Y.push(`STEP ${re} ${U.h} Split shell commands`),re++;for(let Te=0;Te<pe.segments.length;Te++){let We=pe.segments[Te];if(We){let Me=Math.random();Y.push(`  Segment ${Te+1}: ${ed(We,Me)}`)}}}let me=_.trace.segments,ke=me.length>1;for(let Te of me){if(ke){Y.push("");let tn="";if(pe&&pe.type==="parse"){let Mo=pe.segments[Te.index];if(Mo)tn=Mo.join(" ")}let on=54,an=tn,nn=` Segment ${Te.index+1}: `,sn=" ";if(tn){if(nn.length+tn.length+sn.length>on){let sf=on-nn.length-sn.length;an=`${tn.substring(0,sf-1)}…`}}let Sn=tn?`${nn}${an}${sn}`:` Segment ${Te.index+1} `,rf=tn?`${nn}${en.cyan(an)}${sn}`:Sn,Gs=58-Sn.length,Bs=Math.floor(Gs/2),of=Gs-Bs;Y.push(`${U.sh.repeat(Bs)}${rf}${U.sh.repeat(of)}`)}if(Te.steps.find((tn)=>tn.type==="segment-skipped")){Y.push(""),Y.push("  (skipped — prior segment blocked)");continue}let Me=!1,Ye=!1;for(let tn of Te.steps){let on=nd(tn,re,U);if(on){if(Ye=!0,tn.type==="recurse"){Y.push("");let an=" RECURSING ",nn=58-an.length-4;Y.push(`  ${U.tl}${U.h}${an}${U.h.repeat(nn)}`),Y.push(`  ${U.v}`),Me=!0;continue}for(let an of on.lines)if(Me)Y.push(`  ${U.v} ${an}`);else Y.push(an);if(on.incrementStep)re++}}if(Me)Y.push(`  ${U.v}`),Y.push(`  ${U.bl}${U.h.repeat(56)}`);if(!Ye)Y.push(""),Y.push(`  ${en.green("✓")} Allowed (no matching rules)`)}if(Y.push(""),Y.push("RESULT"),_.result==="blocked"){if(Y.push(`  Status: ${en.red("BLOCKED")}`),_.customRule){if(Y.push(`  Rule: ${_.customRule.id}`),_.customRule.rulebook)Y.push(`  Rulebook: ${_.customRule.rulebook.name} ${_.customRule.rulebook.version}`);if(_.customRule.source)Y.push(`  Source: ${_.customRule.source}`);if(_.customRule.override)Y.push(`  Override: reason ${_.customRule.override.reason}`)}if(_.reason){let Te=pr(_.reason,"          ");Y.push(`  Reason: ${Te[0]}`);for(let We=1;We<Te.length;We++)Y.push(Te[We]??"")}}else Y.push(`  Status: ${en.green("ALLOWED")}`);Y.push(""),Y.push("CONFIG");let Ce=_.configSource??"none",Re=_.configValid?"":" (invalid)";Y.push(`  Path: ${Ce}${Re}`);let Ne=_.safetyPresetScope;Y.push(`  Safety preset: ${_.selectedPreset??"standard"}${Ne?` (${Ar(Ne)})`:""}`),Y.push(`  Effective capabilities: ${_.effectiveLevel}`);let _e=Object.entries(_.destructiveCommandRuleOverrides??{});if(Y.push(`  Rule customizations: ${_e.length}`),_.ruleActivation)Y.push(`  Rule activation: ${_.ruleActivation.id} — ${_.ruleActivation.enabled?"on":"off"} via ${_.ruleActivation.source}`);return Y.join(`
`)}function ls(_){return JSON.stringify(_,null,2)}import{resolve as Hh}from"node:path";var Dh=512,td={maxTextLength:2048,maxListLength:128,maxObjectProperties:128,maxDepth:16},Nh=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function rd(_){let L=0,U={allocateSegment(){return L++},getNextSegmentIndex(){return L},recordGlobal(J){_.record({scope:"global",step:J})},recordSegment(J,Y=U.currentSegmentIndex){if(Y===void 0)return;_.record({scope:"segment",segmentIndex:Y,step:J})}};return U}function od(){let _=[],L=new Set;return{record(U){if(_.length>=Dh)return;yo(U.step,L,td),_.push({...U,step:cs(U.step,td,L)})},finish(){return{events:_}}}}function yo(_,L,U,J=0,Y=new WeakSet){if(typeof _==="string"){let pe=_.slice(0,U.maxTextLength);if(!nt(pe))return;for(let me of yt(pe))for(let ke of me.match(/[^\s"'()$]+/g)??[])L.add(id(ke));return}if(!_||typeof _!=="object"||J>=U.maxDepth||Y.has(_))return;if(Y.add(_),Array.isArray(_)){let pe=Math.min(_.length,U.maxListLength);for(let me=0;me<pe;me++)yo(_[me],L,U,J+1,Y);return}let re=0,ie=new Set;for(let pe in _){if(!Object.hasOwn(_,pe))continue;if(re>=U.maxObjectProperties)break;re++,yo(pe,L,U);let me=ds(pe,U,L);if(ie.has(me))continue;ie.add(me),yo(_[pe],L,U,J+1,Y)}}function cs(_,L,U,J=0,Y=new WeakSet){if(typeof _==="string")return ds(_,L,U);if(!_||typeof _!=="object")return _;if(J>=L.maxDepth)return;if(Y.has(_))return;if(Y.add(_),Array.isArray(_)){let pe=[],me=Math.min(_.length,L.maxListLength);for(let ke=0;ke<me;ke++)pe.push(cs(_[ke],L,U,J+1,Y));return pe}let re={},ie=0;for(let pe in _){if(!Object.hasOwn(_,pe))continue;if(ie>=L.maxObjectProperties)break;ie++;let me=ds(pe,L,U);if(Object.hasOwn(re,me))continue;Object.defineProperty(re,me,{value:cs(_[pe],L,U,J+1,Y),enumerable:!0,configurable:!0,writable:!0})}return re}function ds(_,L,U){let J=_.slice(0,L.maxTextLength),Y=nt(J)?tt(J):J,re=U.size>0?jh(Y,U):Y;return(Lh(re)?Le(re):re).slice(0,L.maxTextLength)}function Lh(_){return _.includes("PRIVATE KEY")||_.includes("://")||_.includes("eyJ")||_.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(_)||_.length>=14&&Nh.some((L)=>_.includes(L))||_.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(_)}function jh(_,L){return _.replace(/[^\s"'()$]+/g,(U)=>L.has(id(U))?"<redacted>":U)}function id(_){let L=2166136261,U=2166136261;for(let J=0;J<_.length;J++)L=Math.imul(L^_.charCodeAt(J),16777619),U=Math.imul(U^_.charCodeAt(_.length-J-1),16777619);return`${L>>>0}:${U>>>0}:${_.length}`}function fr(_,L={},U){let J=Hh(L.cwd??process.cwd()),Y=L.policySnapshot??R(U,{cwd:J,userConfigDir:L.userConfigDir}),re=P(Y.policy,U.env),ie=Ve({policySnapshot:Y,effectiveCapabilities:re.capabilities,worktreeMode:re.worktreeMode}),pe={effectiveLevel:ie.effectiveLevel,selectedPreset:Y.policy.safety.level,...Y.policyScopes?{safetyPresetScope:Y.policyScopes.levelScope}:{},effectiveCapabilities:ie.effectiveCapabilities,destructiveCommandRuleOverrides:Y.policy.destructiveCommandRuleOverrides},{configSource:me,configValid:ke}=Mh(U,{cwd:J,userConfigDir:L.userConfigDir});if(!_||!_.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:me,configValid:ke,...pe};let Ce=y(_,"auto");if(Ce.status==="limited")throw new b;let Re=Ce.dialect==="powershell"?y(_,"posix"):Ce,Ne=kt(Re),_e=od(),Te=rd(_e);Te.recordGlobal({type:"parse",input:_,segments:Ne.map((Sn)=>[...Sn])});let We=l("Bash",{command:_},{kind:"command",shell:"auto"},{configCwd:J,executionCwd:J},_),Me=q(We,{environment:U,trace:Te,dependencies:{loadPolicySnapshot:()=>Y}}),Ye=Me.decision.kind==="deny"?Me.decision:null;if(Ye&&(Me.stage==="policy-protection"||Me.stage==="secret-protection"))return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:Fh(Ye),matched:!0,reason:Ye.reason}]}]},result:"blocked",reason:T(Ye.reason),segment:T(sd(Ye,_)),ruleId:T(Ye.ruleId),configSource:me,configValid:ke,...pe};let tn=Te.getNextSegmentIndex();if(Ye&&tn>0&&tn<Ne.length)Te.recordSegment({type:"segment-skipped",index:tn,reason:"prior-segment-blocked"},tn);let on=_e.finish(),an=Ye?.ruleId??Uh(We,Y,re,U),nn=z.find((Sn)=>Sn.id===an&&Sn.activationCapability),sn=nn?ie.policy.effectiveDestructiveCommandRules[nn.id]:void 0;return{trace:Bh(on),result:Ye?"blocked":"allowed",reason:Ye?T(Ye.reason):void 0,segment:Ye?T(sd(Ye,_)):void 0,ruleId:Ye?T(Ye.ruleId):void 0,customRule:Gh(qh(Ye?.ruleId,Y)),configSource:me,configValid:ke,...pe,...nn&&sn?{ruleActivation:{id:nn.id,...sn}}:{}}}function sd(_,L){return _.evidence?.segment??L}function Fh(_){if(_.reason===Ke)return"policy-protection:findPolicyConfigMutationTargetInSemanticFacts";if(_.reason===qe)return"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts";if(_.reason===v)return"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts";return"secret-protection:findSensitiveTargetInSemanticFacts"}function Mh(_,L){let U=I(L.cwd),J=W(_,L),Y=X(_,{cwd:L.cwd,userConfigDir:L.userConfigDir});try{if(r(Y.projectConfigTarget)!==null){if(Un(Y.projectConfigTarget).errors.length===0)return{configSource:U,configValid:!0};return{configSource:U,configValid:!1}}}catch(re){if(re instanceof o)return{configSource:U,configValid:!1};throw re}try{if(r(Y.userConfigTarget)!==null){let re=Un(Y.userConfigTarget);return{configSource:J,configValid:re.errors.length===0}}return{configSource:null,configValid:!0}}catch(re){if(re instanceof o)return{configSource:J,configValid:!1};throw re}}function Uh(_,L,U,J){let Y=L.policy,re=De({...Y,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...Y.destructiveCommandRuleOverrides,...Object.fromEntries(z.flatMap((pe)=>pe.activationCapability?[[pe.id,"on"]]:[]))}},L.state==="degraded"?{diagnostics:L.diagnostics,reason:L.reason}:void 0),ie=q(_,{environment:J,dependencies:{loadPolicySnapshot:()=>re,getModes:()=>({...U,strict:!0,paranoidRm:!0,paranoidInterpreters:!0,capabilities:{fail_closed:{...U.capabilities.fail_closed,enabled:!0},paranoid_rm:{...U.capabilities.paranoid_rm,enabled:!0},paranoid_interpreters:{...U.capabilities.paranoid_interpreters,enabled:!0}}}),findSensitiveTarget:()=>null}});return ie.decision.kind==="deny"?ie.decision.ruleId:void 0}function Gh(_){if(!_)return;return{id:T(_.id),..._.rulebook?{rulebook:{name:T(_.rulebook.name),version:T(_.rulebook.version)}}:{},..._.source?{source:T(_.source)}:{},..._.override?{override:{type:"reason",reason:T(_.override.reason)}}:{}}}function Bh(_){let L=_.events.flatMap((J)=>J.scope==="global"?[J.step]:[]),U=new Map;for(let J of _.events){if(J.scope!=="segment")continue;let Y=U.get(J.segmentIndex)??{index:J.segmentIndex,steps:[]};Y.steps.push(J.step),U.set(J.segmentIndex,Y)}return{steps:L,segments:[...U.values()]}}function qh(_,L){let U=_?.replace(/^custom\./,"");if(!U||!L.policy.rules.some((J)=>J.name===U))return;return L.ruleMetadata[U]??Object.freeze({id:U})}function ad(_){return new Promise((L)=>{process.stdout.write(`${_}
`,()=>L())})}async function ld(_,L){let U=is(L);if(!U)return 1;try{let J=fr(U.command,{cwd:U.cwd},_),Y=!!process.env.NO_COLOR||!process.stdout.isTTY;return await ad(U.json?ls(J):as(J,{asciiOnly:Y})),0}catch(J){let Y=Vh(J instanceof f?J.cause:J);if(Y===void 0)throw J;if(U.json)return await ad(JSON.stringify({error:Y})),1;return console.error(Y),1}}function Vh(_){if(_ instanceof b)return _.message;if(_ instanceof m)return _.message;if(_ instanceof s&&a[_.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var cd="2.6.11",Rn="  ",Pt="cc-safety-net";function dd(_){return _.argument?`${_.flags} ${_.argument}`:_.flags}function Kh(_){return Math.max(..._.map((L)=>dd(L).length))}function Jh(_){return Math.max(..._.map((L)=>L.usage.length))}function Wh(_){return Math.max(..._.map((L)=>`${Pt} ${L.usage}`.length))}function zh(_,L){let U=`${Pt} ${_.usage}`;return`${Rn}${U.padEnd(L+2)}${_.description}`}function An(_,L){return`${Rn}${_.padEnd(Math.max(40,_.length+2))}${L}`}function Wt(_,L=console.log){let U=[];if(U.push(`${Pt} ${_.name}`),U.push(""),U.push(`${Rn}${_.description}`),U.push(""),U.push("USAGE:"),U.push(`${Rn}${Pt} ${_.usage}`),U.push(""),_.subcommands&&_.subcommands.length>0){U.push("SUBCOMMANDS:");let J=Jh(_.subcommands);for(let Y of _.subcommands)U.push(`${Rn}${Y.usage.padEnd(J+2)}${Y.description}`);U.push("")}if(_.options.length>0){U.push("OPTIONS:");let J=Kh(_.options);for(let Y of _.options){let re=dd(Y),ie=Y.default?`${Y.description} (default: ${Y.default})`:Y.description;U.push(`${Rn}${re.padEnd(J+2)}${ie}`)}U.push("")}if(_.examples&&_.examples.length>0){U.push("EXAMPLES:");for(let J of _.examples)U.push(`${Rn}${J}`)}L(U.join(`
`))}function us(){let _=Wh(_r),L=[];L.push(`${Pt} v${cd}`),L.push(""),L.push("Blocks destructive commands and secret access."),L.push(""),L.push("COMMANDS:");for(let U of _r)L.push(zh(U,_));L.push(""),L.push("GLOBAL OPTIONS:"),L.push(`${Rn}-h, --help       Show help (use with command for command-specific help)`),L.push(`${Rn}-V, --version    Show version`),L.push(""),L.push("HELP:"),L.push(`${Rn}${Pt} help <command>     Show help for a specific command`),L.push(`${Rn}${Pt} <command> --help   Show help for a specific command`),L.push(""),L.push("ENVIRONMENT VARIABLES:"),L.push(An(`${n.level.name}=standard|strict|paranoid`,"Set session safety level")),L.push(An(`${n.worktree.name}=1`,"Allow local git discards in linked worktrees")),L.push(An(`${n.debug.name}=1`,"Print diagnostic messages to stderr")),L.push(An(`${n.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),L.push(An(`${n.projectTightenOnly.name}=1`,"Ignore project policy settings that weaken the user policy")),L.push(An("CC_SAFETY_NET_HOME","Override rule config home directory")),L.push(""),L.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),L.push(An(`${n.strict.name}=1`,"Force safety.overrides.fail_closed on")),L.push(An(`${n.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),L.push(An(`${n.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),L.push(An(`${n.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),L.push(""),L.push("Documentation:        https://ccsafetynet.com/docs"),console.log(L.join(`
`))}function ud(){console.log(cd)}function mr(_,L=console.log){let U=Tr(_);if(!U)return!1;if(U.name.toLowerCase()!==_.toLowerCase())return!1;return Wt(U,L),!0}import{existsSync as So,readFileSync as hu}from"node:fs";import{join as xo}from"node:path";import*as Vn from"node:readline";function Yh(_){return _==="install"?"Install":"Uninstall"}function Zh(_){return _==="install"?"Installing":"Uninstalling"}function Xh(_){return _==="install"?"into":"from"}function md(_){return _?.available===!0}function Qh(_,L){let U=new Set(L);return _.filter((J)=>U.has(J.target)).map((J)=>J.target)}function pd(_,L,U){if(_.every((J)=>!J.available))return L;return Array.from({length:_.length},(J,Y)=>Y+1).map((J)=>(L+J*U+_.length)%_.length).find((J)=>md(_[J]))}function ev(_,L,U){if(U.ctrl&&U.name==="c")return"interrupt";if(U.name==="escape"||L==="q")return"abort";if(_==="install"&&(L==="u"||L==="U"))return"update";if(U.name==="up"||L==="k")return"up";if(U.name==="down"||L==="j")return"down";if(U.name==="space"||L===" ")return"toggle";if(U.name==="return"||U.name==="enter")return"confirm";return null}function nv(_){return{cursor:_.findIndex((L)=>L.available),selected:[]}}function tv(_,L,U){if(U==="confirm"||U==="update"||U==="abort"||U==="interrupt")return{state:_,done:U};if(U==="up")return{state:{..._,cursor:pd(L,_.cursor,-1)}};if(U==="down")return{state:{..._,cursor:pd(L,_.cursor,1)}};let J=L[_.cursor];if(!md(J))return{state:_};let Y=_.selected.includes(J.target)?_.selected.filter((re)=>re!==J.target):Qh(L,[..._.selected,J.target]);return{state:{..._,selected:Y}}}var gd="◉",yd="◯",hd=">",vd=" ";function rv(_,L,U){return["",`${Yh(_)} CC Safety Net ${Xh(_)}:`,"",...L.map((J,Y)=>{let re=U.selected.includes(J.target),ie=Y===U.cursor,pe=re?gd:yd,me=ie?hd:vd,ke=J.available?"":` (${J.unavailableReason??"not installed"})`,Ce=`${pe} ${J.label}${ke}`,Re=!J.available?en.dim(Ce):re?en.green(Ce):ie?en.bold(Ce):Ce;return`${me} ${Re}`}),"",_==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":L.some((J)=>J.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${_}. q/Esc: close`].join(`
`)}var fd=["global-hook","plugin"];function ov(_,L,U={}){let J=U.color!==!1?en.bold:(re)=>re;return["","Install the Kimi Code integration as:","",...[`Global hook — ${L?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((re,ie)=>{let pe=ie===_,me=`${pe?gd:yd} ${re}`;return`${pe?hd:vd} ${pe?J(me):me}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function bd(_){let{input:L,output:U}=_;Vn.emitKeypressEvents(L);let J=L.isRaw===!0;L.setRawMode(!0),L.resume();let Y=0,re=()=>{if(Y===0)return;Vn.moveCursor(U,0,-Y),Vn.cursorTo(U,0),Vn.clearScreenDown(U)},ie=()=>{re();let pe=_.render();U.write(`${pe}
`),Y=pe.split(`
`).length};return new Promise((pe)=>{let me=(Ce)=>{L.off("keypress",ke),L.setRawMode(J),L.pause(),re(),pe(Ce)};function ke(Ce,Re){_.onKey(Ce,Re,{finish:me,draw:ie})}L.on("keypress",ke),ie()})}function wd(_={}){let L=0;return bd({input:_.input??process.stdin,output:_.output??process.stdout,render:()=>ov(L,_.globalHookInstalled===!0),onKey:(U,J,Y)=>{if(J.ctrl&&J.name==="c"){Y.finish(null),(_.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(J.name==="escape"||U==="q")return Y.finish(null);if(J.name==="return"||J.name==="enter")return Y.finish(fd[L]);if(J.name==="up"||J.name==="down"||U==="k"||U==="j")L=(L+1)%fd.length,Y.draw()}})}function ps(_=process.stdin,L=process.stdout){return Boolean(_.isTTY&&L.isTTY&&typeof _.setRawMode==="function")}function kd(_,L,U={}){let J=U.output??process.stdout,Y=nv(L);return bd({input:U.input??process.stdin,output:J,render:()=>rv(_,L,Y),onKey:(re,ie,pe)=>{let me=ev(_,re,ie);if(!me)return;let ke=tv(Y,L,me);if(Y=ke.state,ke.done==="interrupt"){pe.finish(null),(U.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(ke.done==="abort")return pe.finish(null);if(ke.done==="update")return pe.finish("update");if(ke.done==="confirm"){if(Y.selected.length===0){J.write("\x07"),pe.draw();return}pe.finish([...Y.selected]),J.write(`${Zh(_)} selected integrations...
`);return}pe.draw()}})}import{existsSync as Cd,lstatSync as sv,mkdirSync as av,mkdtempSync as lv,readdirSync as cv,readFileSync as Yt,rmSync as vo}from"node:fs";import{basename as dv,dirname as uv,join as Cn}from"node:path";import{fileURLToPath as pv}from"node:url";var fs="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",Rt="cc-safety-net",_t="cc-safety-net/index.ts";import{spawn as iv}from"node:child_process";var ms=(_,L)=>{let U=Xn([..._],process.env);return new Promise((J)=>{let Y=iv(U.cmd,U.args,{cwd:L,stdio:["ignore","pipe","pipe"]}),re=ci(Y),ie=!1,pe=setTimeout(()=>{ie=!0,Y.kill()},120000);Y.on("error",(me)=>{clearTimeout(pe),J({status:null,errorCode:me.code,stdout:re.stdout,stderr:[me.message,re.stderr].filter(Boolean).join(`
`)})}),Y.on("close",(me)=>{clearTimeout(pe),J({status:ie?null:me,errorCode:ie?"ETIMEDOUT":void 0,stdout:re.stdout,stderr:re.stderr})})})};var zt="cc-safety-net.ts",gs=Cn("amp",_t);function fv(_){return Cn(_.home,".config","amp","plugins","cc-safety-net.ts")}function mv(){let _=uv(pv(import.meta.url)),L=Cn(_,gs),U=Cn(_,"..",gs),J=Cn(_,"..","..","..","dist",gs);return[L,U,J]}function gv(_=mv()){let L=_.find((U)=>Cd(U)&&sv(U).isFile());if(!L)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return L}function xd(_){try{return JSON.parse(_)}catch{return}}function bo(_){return _.subarray(0,Buffer.byteLength(fs)).toString("utf-8")===fs}async function gr(_,L,U){let J=await _(L,U);if(J.status===0)return J;throw Error([`Failed to run ${L.join(" ")}${J.status===null?"":` (exit ${J.status})`}.`,[J.stdout,J.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function Sd(_){let L=await _(["amp","plugins","repositories","--json"]);if(L.status===null)throw Error(`${L.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${L.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${L.stderr}`.trim());if(L.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${L.status}). Sign in with "amp login" and rerun install --amp.
${[L.stdout,L.stderr].filter(Boolean).join(`
`)}`.trim());let U=xd(L.stdout),J=(Array.isArray(U)?U:[]).filter((Y)=>Ze(Y,"scope")==="user"&&Ze(Y,"exists")===!0&&Ze(Y,"viewerCanWrite")===!0).map((Y)=>Ze(Y,"cloneRef")).find((Y)=>typeof Y==="string"&&Y.length>0);if(!J)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return J}async function Pd(_,L,U){let J=lv(Cn(L.tmpdir,"cc-safety-net-amp-"));try{return await gr(_,["amp","clone","user-plugins",J]),await U(J)}finally{vo(J,{recursive:!0,force:!0})}}function ys(_){return`rerun ${_==="overwrite"?"install":"uninstall"} --amp`}function Ed(_,L,U){let J=Cn(_,L),Y=dn(J);if(!Y)return;if(Y.isSymbolicLink()||!Y.isFile())throw Error(`Refusing to ${U} ${L} in your Amp personal plugins repository: not a regular file. Remove it there and ${ys(U)}.`);let re=Yt(J);if(bo(re))return re;throw Error(`Refusing to ${U} unmanaged file ${L} in your Amp personal plugins repository. Remove it there and ${ys(U)}.`)}function Rd(_,L){let U=Cn(_,Rt),J=dn(U);if(!J)return;if(J.isSymbolicLink()||!J.isDirectory())throw Error(`Refusing to ${L} ${Rt} in your Amp personal plugins repository: not a regular directory. Remove it there and ${ys(L)}.`);return Ed(_,_t,L)}function yv(_){let L=Cn(_,zt),U=dn(L);if(!U||U.isSymbolicLink()||!U.isFile())return;let J=Yt(L);return bo(J)?J:void 0}async function _d(_,L,U,J){if(await gr(_,U,L),(await gr(_,["git","status","--porcelain"],L)).stdout.trim()==="")return!1;return await gr(_,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",J],L),await gr(_,["git","push","origin","HEAD"],L),!0}function ho(_,L){hv(_,L),vv(_,L)}function Td(_,L){if(L==="keep")return;throw Error(`Local Amp plugin ${_} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function hv(_,L){let U=fv(_),J=dn(U);if(!J)return;if(!J.isSymbolicLink()&&J.isFile()&&bo(Yt(U))){vo(U);return}Td(U,L)}function vv(_,L){let U=Cn(_.home,".config","amp","plugins",Rt),J=dn(U);if(!J)return;if(!J.isSymbolicLink()&&J.isDirectory()&&bv(U)){vo(U,{recursive:!0});return}Td(U,L)}function bv(_){let L=dv(_t);if(cv(_).join("\x00")!==L)return!1;let U=Cn(_,L),J=dn(U);return!!J&&!J.isSymbolicLink()&&J.isFile()&&bo(Yt(U))}function wv(_){let L=u(_);if(!Cd(L))return"";let U=xd(Yt(L,"utf-8"));if(!U||typeof U!=="object"||Array.isArray(U))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(k(U,_.home))};
`}async function Id(_,L=gv(),U=ms){let J=Buffer.concat([Yt(L),Buffer.from(wv(_),"utf-8")]),Y=await Sd(U);return Pd(U,_,async(re)=>{let ie=`${Y}/${Rt}`,pe=Rd(re,"overwrite"),me=Ed(re,zt,"overwrite");if(pe?.equals(J)&&!me)return ho(_,"fail"),{path:ie,alreadyInstalled:!0};if(av(Cn(re,Rt),{recursive:!0}),ln(Cn(re,_t),J),me)vo(Cn(re,zt));let ke=await _d(U,re,["git","add","--",_t,...me?[zt]:[]],`chore: update cc-safety-net plugin to v${pn()}`);return ho(_,"fail"),{path:ie,alreadyInstalled:!ke}})}async function Ad(_,L=ms){let U=await Sd(L);return Pd(L,_,async(J)=>{let Y=Rd(J,"remove"),re=yv(J),ie=`${U}/${re&&!Y?zt:Rt}`;if(!Y&&!re)return ho(_,"keep"),{path:ie,alreadyInstalled:!1};return await _d(L,J,["git","rm","--",...Y?[_t]:[],...re?[zt]:[]],`chore: remove cc-safety-net plugin v${pn()}`),ho(_,"keep"),{path:ie,alreadyInstalled:!0}})}import{existsSync as Od,mkdirSync as kv,readFileSync as Cv}from"node:fs";import{dirname as xv}from"node:path";var hs=kn["antigravity-cli"],Tt="cc-safety-net";function It(_){return Boolean(_)&&typeof _==="object"&&!Array.isArray(_)}function ko(){return{PreToolUse:[{hooks:[{type:"command",command:hs,timeout:30}]}]}}function $d(_){try{let L=JSON.parse(Cv(_,"utf-8"));if(!L||typeof L!=="object"||Array.isArray(L))throw Error("Antigravity hooks config must be a JSON object");return L}catch(L){if(L instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${_}: ${L.message}`);throw L}}function Dd(_){let L=_[Tt];if(L===void 0){let J=ko();return _[Tt]=J,{definition:J,preToolUse:J.PreToolUse??[]}}if(!It(L))throw Error(`Antigravity hooks config entry "${Tt}" must be an object`);let U=Array.isArray(L.PreToolUse)?L.PreToolUse:[];return L.PreToolUse=U,{definition:L,preToolUse:U}}function Nd(_){if(!Array.isArray(_.PreToolUse))return!1;return _.PreToolUse.some((L)=>It(L)&&Array.isArray(L.hooks)&&L.hooks.some((U)=>It(U)&&U.command===hs))}function Sv(_){return Object.values(_).some((L)=>It(L)&&L.enabled!==!1&&Nd(L))}function Pv(_){if(_[Tt]===void 0)return!1;let L=Dd(_);if(L.definition.enabled!==!1||!Nd(L.definition))return!1;return L.definition.enabled=!0,!0}function Ev(_){if(_[Tt]===void 0){_[Tt]=ko();return}let L=Dd(_);L.definition.enabled=!0,L.preToolUse.push(ko().PreToolUse?.[0]??{hooks:[]})}function Rv(_){let L=!1;for(let U of Object.values(_)){if(!It(U)||!Array.isArray(U.PreToolUse))continue;U.PreToolUse=U.PreToolUse.flatMap((J)=>{if(!It(J)||!Array.isArray(J.hooks))return[J];let Y=J.hooks.filter((re)=>!It(re)||re.command!==hs);if(Y.length!==J.hooks.length)L=!0;return Y.length===0?[]:[{...J,hooks:Y}]})}return L}function wo(_,L){ln(_,`${JSON.stringify(L,null,2)}
`)}function Ld(_){let L=nr(_.home);if(kv(xv(L),{recursive:!0}),!Od(L))return wo(L,{[Tt]:ko()}),{path:L,alreadyInstalled:!1};let U=$d(L);if(Sv(U))return{path:L,alreadyInstalled:!0};if(Pv(U))return wo(L,U),{path:L,alreadyInstalled:!1};return Ev(U),wo(L,U),{path:L,alreadyInstalled:!1}}function jd(_){let L=nr(_.home);if(!Od(L))return{path:L,alreadyInstalled:!1};let U=$d(L);if(!Rv(U))return{path:L,alreadyInstalled:!1};return wo(L,U),{path:L,alreadyInstalled:!0}}import{existsSync as ws,readlinkSync as Iv}from"node:fs";import{join as Kn}from"node:path";import{spawn as _v}from"node:child_process";var On=En.map((_)=>({target:_.id,flag:_.flag,label:cn(_.id),probeCommand:_.probeCommand}));function vs(_){let L=new Set(_);return On.map((U)=>U.target).filter((U)=>L.has(U))}async function Hd(_,L){for(let U of _)await L(U)}var Tv=5000;function yr(_,L=Tv){return new Promise((U)=>{let J=Xn([..._],process.env),Y=_v(J.cmd,J.args,{env:process.env,stdio:"ignore"}),re=!1,ie=(me)=>{if(re)return;re=!0,clearTimeout(pe),U(me)},pe=setTimeout(()=>{Y.kill(),ie(!1)},L);Y.on("error",()=>ie(!1)),Y.on("close",(me)=>ie(me===0))})}function Fd(_=yr,L={}){let U=new Set(L.configuredTargets??[]);return Promise.all(On.map(async(J)=>({target:J.target,flag:J.flag,label:J.label,...Ud(L.action,await _(J.probeCommand)||J.target==="cursor"&&await _(na),U.has(J.target))})))}function Md(_,L){let U=new Set(L.configuredTargets??[]);return _.map((J)=>({...J,...Ud(L.action,J.available,U.has(J.target))}))}function Ud(_,L,U){if(_==="uninstall")return U?{available:!0}:{available:!1,unavailableReason:"not installed"};if(_==="install"&&U)return{available:!1,unavailableReason:"already installed"};if(!L)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}var Jn="cc-safety-net",Vd=["npx","-y","@deepseek-ai/dsh"],Gd="DeepSeek Harness",Bd=["@deepseek-ai","dsh-desktop"],Kd="Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.",bs=(_)=>`DeepSeek Harness Desktop is not in its default location, so ${_} ${Jn} from its Plugins page.`,Jd=(_,L)=>ws(Kn(bi(_),L,"package.json"));function ks(_,L){let U=L.platform??process.platform,J=Jd(_,"desktop"),Y=U==="darwin"?[Kn(_.home,"Applications"),L.systemApplications??"/Applications"].map((re)=>Kn(re,`${Gd}.app`,"Contents","Resources","runtime","cli","bin","dsh")):U==="win32"?[Kn(_.env.get("LOCALAPPDATA")||Kn(_.home,"AppData","Local"),"Programs",Gd,"resources","runtime","cli","bin","dsh.cmd")]:[];return{profile:J,cli:J?Y.find((re)=>ws(re)):void 0}}function Wd(_,L=process.platform){if(L==="win32")return ws(Kn(_.env.get("APPDATA")||Kn(_.home,"AppData","Roaming"),...Bd,"lockfile"));let U=Av(Kn(_.home,"Library","Application Support",...Bd,"SingletonLock")),J=Number(/-(\d+)$/.exec(U??"")?.[1]);return Number.isInteger(J)&&J>0&&Ov(J)}function Av(_){try{return Iv(_)}catch{return}}function Ov(_){try{return process.kill(_,0),!0}catch(L){return L.code==="EPERM"}}async function zd(_,L={}){let U=ks(_,L);if(U.cli&&Wd(_,L.platform))throw Error(Kd);let J=!U.cli||Jd(_,"web")||await(L.probe??yr)(Go),Y=[...U.cli?[{profile:"desktop",label:"Desktop",dsh:[U.cli]}]:[],...J?[{profile:"web",label:"web",dsh:Vd}]:[]];return{commands:Y.map((re)=>[...re.dsh,"plugin","--profile",re.profile,"add",`${Jn}@${pn()}`]),afterInstall:async()=>{let re=new Set(wi(_).filter((pe)=>pe.enabled).map((pe)=>pe.name)),ie=Y.filter((pe)=>!re.has(pe.profile));if(ie.length>0)throw Error(`DeepSeek Harness installed ${Jn} in the ${qd(ie)} but did not enable it. Enable it from the Plugins page.`)},message:[`Added ${Jn} to the DeepSeek Harness ${qd(Y)}.`,...U.profile&&!U.cli?[bs("add")]:[]].join(`
`)}}function qd(_){return`${_.map((L)=>L.label).join(" and ")} profile${_.length>1?"s":""}`}function Yd(_,L={}){let U=new Set(wi(_).map((re)=>re.name));if(!U.has("desktop")&&!U.has("web"))throw Error(`${Jn} is not installed in the DeepSeek Harness web or Desktop profile`);let J=U.has("desktop")?ks(_,L).cli:void 0,Y=U.has("desktop")&&!J;if(Y&&!U.has("web"))throw Error(bs("remove"));if(J&&Wd(_,L.platform))throw Error(Kd);return{commands:[...J?[[J,"plugin","--profile","desktop","remove",Jn]]:[],...U.has("web")?[[...Vd,"plugin","--profile","web","remove",Jn]]:[]],...Y?{afterUninstall:()=>{throw Error(`Removed ${Jn} from the DeepSeek Harness web profile, but ${bs("remove")}`)}}:{}}}function Zd(_,L,U={}){let J=ks(L,U).cli!==void 0;return _.map((Y)=>Y.target==="deepseek-harness"&&J?{...Y,available:!0,unavailableReason:void 0}:Y)}import{existsSync as $v,readdirSync as Dv,rmSync as Nv}from"node:fs";import{join as Lv}from"node:path";function Xd(_,L=process.platform,U){if(!$v(_))return;let J=L==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);Dv(_).filter((Y)=>Y!==U&&J.test(Y)).forEach((Y)=>{Nv(Lv(_,Y),{recursive:!0,force:!0})})}import{existsSync as Qd,readdirSync as jv,rmSync as Hv}from"node:fs";import{join as Zt}from"node:path";function Co(_,L=process.platform){let U=Zt(_.env.get("npm_config_cache")||(L==="win32"?Zt(_.env.get("LOCALAPPDATA")||Zt(_.home,"AppData","Local"),"npm-cache"):Zt(_.home,".npm")),"_npx");if(!Qd(U))return;jv(U).filter((J)=>Qd(Zt(U,J,"node_modules","cc-safety-net"))).forEach((J)=>{Hv(Zt(U,J),{recursive:!0,force:!0})})}import{existsSync as iu,mkdirSync as Mv,readFileSync as su}from"node:fs";import{dirname as Uv,join as ou}from"node:path";function Fv(_,L){if(_[L]!=="#")return L;let U=_.indexOf(`
`,L+1);return U===-1?_.length:U+1}function Cs(_,L,U){let J=new RegExp(`^(\\s*)${L}\\s*=\\s*\\[`),Y=0;for(let re of _.split(`
`)){if(/^\s*\[/.test(re))return;let ie=J.exec(re);if(ie){let pe=Y+ie[0].lastIndexOf("[");return{start:pe,end:si(_,pe,{skipComment:Fv,...U})}}Y+=re.length+1}return}function eu(_,L,U){let J=_.slice(0,L.end).trimEnd(),Y=ul(_,L.end),re=Y===""?"     ":`${Y}  `,ie=!J.endsWith("[")&&!J.endsWith(",");return`${J}${ie?",":""}
${re}${U}${_.slice(L.end)}`}function nu(_,L,U){let J=_.indexOf(U,L.start);if(J===-1||J>L.end)return _;return`${_.slice(0,J)}${_.slice(J+U.length).replace(/^\s*,/,"")}`}function tu(_,L){let U=new RegExp(`^\\s*${L}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),J=_.split(`
`),Y=J.findIndex((pe)=>/^\s*\[/.test(pe)),re=Y===-1?J:J.slice(0,Y),ie=Y===-1?[]:J.slice(Y);return[...re.filter((pe)=>!U.test(pe)),...ie].join(`
`)}function ru(_,L,U){let J=new RegExp(`^\\s*\\[\\[${L}]]\\s*$`,"m");return _.split(/(?=^\s*\[)/m).filter((Y)=>!J.test(Y)||!Y.includes(U)).join("").trimEnd()}var hr=kn["kimi-code"],xs=`[[hooks]]
event = "PreToolUse"
command = "${hr}"`,au=`{ event = "PreToolUse", command = "${hr}" }`,lu={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function cu(_){return ou(_.env.get("KIMI_CODE_HOME")??ou(_.home,".kimi-code"),"config.toml")}function Gv(_){let L=Cs(_,"hooks",lu);if(L&&_.slice(L.start+1,L.end).trim())return eu(_,L,au);let U=tu(_,"hooks").trimEnd();if(U==="")return`${xs}
`;return`${U}

${xs}
`}function du(_){let L=cu(_);if(Mv(Uv(L),{recursive:!0}),!iu(L))return ln(L,`${xs}
`),{path:L,alreadyInstalled:!1};let U=su(L,"utf-8");if(U.includes(hr))return{path:L,alreadyInstalled:!0};return ln(L,Gv(U)),{path:L,alreadyInstalled:!1}}function uu(_){let L=cu(_);if(!iu(L))return{path:L,alreadyInstalled:!1};let U=su(L,"utf-8");if(!U.includes(hr))return{path:L,alreadyInstalled:!1};let J=Cs(U,"hooks",lu),Y=J?nu(U,J,au):`${ru(U,"hooks",hr)}
`;return ln(L,Y),{path:L,alreadyInstalled:!0}}var Ss="safety-net@cc-marketplace",pu=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),fu=new Set(["antigravity-cli","cursor","devin","droid","grok-build","hermes-agent","kimi-code"]);function Ps(_){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(_??"")}function vu(_){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(_??"")}function Bv(_){return/^Marketplace `cc-marketplace`\s*$/m.test(_??"")}var bu={"claude-code":{installCommands:(_)=>{let L=Vr(_,"cc-safety-net@cc-marketplace");return{commands:[...L?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...oi(_).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:Vr(_,Ss)?[["claude","plugin","uninstall",Ss]]:[],update:L}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(_,L)=>{let U=L??await fn(["codex","plugin","list"]),J=vu(U);return{commands:[J||Bv(U)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:Ps(U)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:J}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:al},"copilot-cli":{installCommands:async()=>{let _=await fn(["copilot","plugin","list"]),L=[...bl(_)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...wl(_)?[["copilot","plugin","uninstall",yl]]:[]];if(hl(_))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",Tn]],cleanupCommands:L,update:!0};return{commands:[vl(await fn(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",Tn]],cleanupCommands:L}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(_)=>{let L=Ii(_);if(L.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(L.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:Vi,installCommands:(_)=>{let L=!So(xo(cr(_),xn));return{commands:Ic(),afterInstall:()=>Ac(L)}},uninstallCommands:[["openclaw","plugins","uninstall",un,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{installCommands:Uc},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]},"deepseek-harness":{installCommands:(_)=>zd(_),uninstallCommands:(_)=>Yd(_)}};function wu(_,L=(U)=>U){try{let U=JSON.parse(L(hu(_,"utf-8")));if(!U||typeof U!=="object"||Array.isArray(U))throw Error(`Settings file ${_} must be a JSON object`);return U}catch(U){if(U instanceof SyntaxError)throw Error(`Failed to parse ${_}: ${U.message}`);throw U}}function qv(_){let L=xo(or(_),"settings.json");if(!So(L))return;let U=wu(L,yn),J=U.enabledPlugins;if(!J||typeof J!=="object"||Array.isArray(J))return;if(J[Tn]!==!1)return;let Y=hu(L,"utf-8"),re=Y.replace(new RegExp(`("${Tn}"\\s*:\\s*)false`),"$1true");return J[Tn]=!0,ln(L,re!==Y?re:`${JSON.stringify(U,null,2)}
`),`Enabled ${Tn} plugin in ${L}`}function Vv(_){let L=ts(_);if(!So(L))return;let U=wu(L);if(!Array.isArray(U.packages))return;let J=U.packages.find((Y)=>!!Y&&typeof Y==="object"&&!Array.isArray(Y)&&rs(Y.source)&&("extensions"in Y));if(!J)return;return delete J.extensions,ln(L,`${JSON.stringify(U,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${L}`}function mu(_,L){let U=mn({label:L,booleans:Object.fromEntries(On.map((re)=>[re.target,[re.flag]]))},_),J=U.errors[0];if(J)throw Error(J);let Y=On.filter((re)=>U.flags[re.target]).map((re)=>re.target);if(Y.length!==1)throw Error(`Choose exactly one ${L} target: ${On.map((re)=>re.flag).join(", ")}`);return Y[0]}async function ku(_,L=jt){let[U,J,Y]=await Promise.all([L(["amp","plugins","list"],30000),L(["codex","plugin","list"],30000),L(["copilot","--binary-version"])]);return{codexPluginListOutput:J,hooks:Jt(_,process.cwd(),{ampPluginListOutput:U,codexPluginListOutput:J,copilotCliVersion:Y})}}async function Kv(_,L,U=jt){let J=await ku(_,U);return J.hooks.filter((Y)=>L==="install"?Y.configured:Y.detected&&Y.method!==Qr||Y.inspectionStatus==="not-inspected").filter((Y)=>!Su(Y)).filter((Y)=>Y.platform!=="codex"||!Ps(J.codexPluginListOutput)||vu(J.codexPluginListOutput)).map((Y)=>Y.platform)}function Jv(_,L,U,J){if(U.length>0)return{finish:async()=>[mu(U,L)]};if(!J.selectTargets&&!ps(J.input,J.output))return{finish:async()=>[mu(U,L)]};let Y=J.detectConfiguredTargets??(()=>Kv(_,L,J.fetchVersion)),re=Promise.all([Fd(J.probeTargets).then((ie)=>Zd(ie,_)),Y()]);return{ready:re,finish:async()=>{let[ie,pe]=await re,me=Md(ie,{action:L,configuredTargets:pe}),ke=J.selectTargets?await J.selectTargets(L,yu(L,me)):await kd(L,yu(L,me),{input:J.input,output:J.output});if(ke==="update")return ke;if(!ke||ke.length===0)return null;return vs(ke)}}}async function Wv(_,L,U=!1,J){let Y=bu[_];Y.beforeInstall?.(L);let re=typeof Y.installCommands==="function"?await Y.installCommands(L,J):{commands:Y.installCommands};return await di(re.commands),await Rl(re.cleanupCommands??[]),await re.afterInstall?.(),[`${re.update||U?"Updated":"Installed"} ${cn(_)} integration`,re.message??Y.postInstallMessage].filter(Boolean).join(`
`)}async function zv(_,L){let U=bu[_];if(!U.uninstallCommands)throw Error(`${cn(_)} uninstall is not supported`);let J=typeof U.uninstallCommands==="function"?U.uninstallCommands(L):{commands:U.uninstallCommands};return await di(J.commands),J.afterUninstall?.(),`Uninstalled ${cn(_)} integration`}function Yv(_){let L=qc(_);return L.alreadyInstalled?`Uninstalled OpenCode plugin from ${L.path}`:`OpenCode plugin not installed in ${L.path}`}var Cu={"antigravity-cli":{install:Ld,uninstall:jd},cursor:{install:$l,uninstall:Dl},devin:{install:Bl,uninstall:ql},droid:{install:Zl,uninstall:Xl},"grok-build":{install:sc,uninstall:ac},"kimi-code":{install:du,uninstall:uu}};function Zv(_,L,U,J=!1){if(_==="install"&&!J)Co(U);let Y=Cu[L][_](U),re=cn(L),ie=_!=="install"?"Uninstalled":J?"Updated":"Installed";return _==="install"&&Y.alreadyInstalled?J?`${re} hook up to date in ${Y.path}`:`${re} hook already installed in ${Y.path}`:_==="uninstall"&&!Y.alreadyInstalled?`${re} hook not installed in ${Y.path}`:`${ie} ${re} hook ${_==="install"?"in":"from"} ${Y.path}`}var xu={amp:{install:Id,uninstall:Ad,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:mc,uninstall:gc,afterInstall:async(_)=>{let L=Mi(_);return await fn(["hermes","plugins","enable",Pn,"--no-allow-tool-override"]),!L},beforeUninstall:async(_)=>{Fi(_);try{await fn(["hermes","plugins","disable",Pn])}catch(L){console.warn(`${L instanceof Error?L.message:String(L)}
Removing the plugin files anyway; ${Pn} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Xv(_,L,U,J=!1){let Y=xu[L];if(_==="uninstall")await Y.beforeUninstall?.(U);let re=_==="install"?await Y.install(U):await Y.uninstall(U),ie=_==="install"&&await Y.afterInstall?.(U),pe=cn(L),me=!ie&&(_==="install"&&re.alreadyInstalled||_==="uninstall"&&!re.alreadyInstalled);return[me?_==="install"?`${pe} plugin ${J?"up to date":"already installed"} at ${re.path}`:`${pe} plugin not installed at ${re.path}`:`${_!=="install"?"Uninstalled":J?"Updated":"Installed"} ${pe} plugin ${_==="install"?"at":"from"} ${re.path}`,me?void 0:Y.restartNote].filter(Boolean).join(`
`)}var Qv={"copilot-cli":{afterInstall:qv},cursor:{afterUninstall:Tl},"hermes-agent":{beforeInstall:(_,L)=>{if(!L)Co(_)}},openclaw:{beforeUninstall:Vi},pi:{afterInstall:Vv}};function eb(_){return _ in Cu}function nb(_){return _ in xu}var gu=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net/tree/plugin","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function Su(_){return _.platform==="kimi-code"&&_.method===co}function Pu(_){return uo({environment:_,cwd:process.cwd()}).method==="hook config"}function tb(_){if(!Pu(_))return gu;return[gu,"",en.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function yu(_,L){return L.map((U)=>_==="install"&&U.target==="kimi-code"&&U.unavailableReason==="already installed"?{...U,available:!0,unavailableReason:void 0,label:`${U.label} (global hook installed)`}:U)}function rb(_,L){if(_.selectKimiInstallMethod)return _.selectKimiInstallMethod();if(!ps(_.input,_.output))return Promise.resolve("global-hook");return wd({input:_.input,output:_.output,globalHookInstalled:Pu(L)})}async function Eu(_,L,U,J=!1,Y){let re=Qv[L];if(_==="install")re?.beforeInstall?.(U,J);if(_==="uninstall")re?.beforeUninstall?.(U);if(eb(L))return[Zv(_,L,U,J),_==="uninstall"?await re?.afterUninstall?.(U):void 0].filter(Boolean).join(`
`);if(nb(L))return Xv(_,L,U,J);if(_==="uninstall")return L==="opencode"?Yv(U):zv(L,U);return[await Wv(L,U,J,Y),await re?.afterInstall?.(U)].filter(Boolean).join(`
`)}function ob(_){let L=mn({label:"update"},_).errors[0];if(L)throw Error(L)}async function ib(_,L=jt){let U=await ku(_,L),J=xo(or(_),"installed-plugins");return{targets:vs([...U.hooks.filter((re)=>re.platform!=="copilot-cli"&&re.detected&&re.method!==Qr&&re.method!==yi).map((re)=>re.platform),...[Kr,gl,ml].flatMap((re)=>So(xo(J,...re))?["copilot-cli"]:[]),...Vr(_,Ss)?["claude-code"]:[],...Ps(U.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:U.codexPluginListOutput,kimiPlugin:U.hooks.some(Su)}}async function sb(_){let L=c(),U=_.output??process.stdout,J=(_.scriptPath??process.argv[1]??"").split(/[\\/]/),Y=J.find((_e)=>/^bunx-\d+-/.test(_e)),re=Y!==void 0||J.includes("_npx")?null:(_.checkLatestVersion??Gn)(),ie=async()=>{let _e=re&&await re;if(_e?.updateAvailable)U.write(`
Update available: cc-safety-net ${_e.currentVersion} → ${_e.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},pe=ib(L,_.fetchVersion??jt).then(async(_e)=>{let Te=new Set(_e.targets);return{targets:_e.targets,codexPluginListOutput:_e.codexPluginListOutput,kimiPlugin:_e.kimiPlugin,available:new Map(await Promise.all(On.filter((We)=>Te.has(We.target)&&pu.has(We.target)).map(async(We)=>[We.target,await yr(We.probeCommand)])))}}),me=await er(_.showBanner??!0,()=>({ready:pe,finish:()=>pe}),()=>Qt({input:_.input??process.stdin,output:U}),{loadingMessage:"Checking installed integrations…",output:U}),ke=await Promise.resolve().then(()=>(Xd(L.tmpdir,process.platform,Y),null)).catch((_e)=>vr(_e));if(me.targets.length===0){if(U.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),ke!==null)console.error(ke);return await ie(),ke===null?0:1}let Ce=me.targets.some((_e)=>fu.has(_e))?await Promise.resolve().then(()=>(Co(L),null)).catch((_e)=>vr(_e)):null,Re=await jr(Promise.all(me.targets.map((_e)=>{if(_e==="kimi-code"&&me.kimiPlugin)return Promise.resolve({message:"Kimi Code plugin skipped: update it in Kimi Code from /plugins (Installed tab, select cc-safety-net, press Enter)",failed:!1});if(pu.has(_e)&&!me.available.get(_e))return Promise.resolve({message:`${cn(_e)} not found; skipped`,failed:!1});if(Ce!==null&&fu.has(_e))return Promise.resolve({message:Ce,failed:!0});return Eu("install",_e,L,!0,me.codexPluginListOutput).then((Te)=>({message:Te,failed:!1}),(Te)=>({message:vr(Te),failed:!0}))})),{loadingMessage:`Updating ${me.targets.length} integration${me.targets.length===1?"":"s"}…`,output:U}),Ne=ke===null?Re:[...Re,{message:ke,failed:!0}];return Ne.forEach((_e)=>_e.failed?console.error(_e.message):U.write(`${_e.message}
`)),await ie(),Ne.some((_e)=>_e.failed)?1:0}function Es(_,L={}){return Promise.resolve().then(()=>ob(_)).then(()=>sb(L)).catch((U)=>(console.error(vr(U)),1))}async function br(_,L,U={}){try{let J=c(),Y=await er(!0,()=>Jv(J,_,L,U),()=>Qt({input:U.input??process.stdin,output:U.output??process.stdout}),{loadingMessage:_==="install"?"Checking available integrations…":"Checking installed integrations…",output:U.output??process.stdout});if(!Y)return(U.output??process.stdout).write(`Cancelled: nothing was ${_}ed.
`),0;if(Y==="update")return(U.runUpdate??(()=>Es([],{fetchVersion:U.fetchVersion,input:U.input,output:U.output,showBanner:!1})))();let re=U.output??process.stdout;return await Hd(Y,async(ie)=>{if(ie==="kimi-code"&&_==="install"){let me=await rb(U,J);if(me===null){re.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(me==="plugin"){re.write(`${tb(J)}
`);return}}let pe=await jr(Eu(_,ie,J),{loadingMessage:`${_==="install"?"Installing":"Uninstalling"} ${cn(ie)} integration…`,output:re});re.write(`${pe}
`)}),0}catch(J){return console.error(vr(J)),1}}function vr(_){let L=_ instanceof Error?_.message:String(_),U=typeof _==="object"&&_!==null&&"code"in _?_.code:null;if(U==="EACCES"||U==="EPERM")return`${L}
Check file permissions for the target config file and parent directory.`;if(U==="ENOENT")return`${L}
Check that the target config path and parent directory exist.`;if(U==="ENOTDIR")return`${L}
Check that every parent path component is a directory.`;return L}import{mkdirSync as pb}from"node:fs";import{dirname as fb}from"node:path";import{createInterface as mb}from"node:readline";import{existsSync as _u,readFileSync as ab}from"node:fs";function At(_,L){let U=pt(_,L);return{policy:U.policy,errors:le(lt(U.issues,dt,(J)=>J.kind==="custom")," "," ")}}function wr(_,L){return At(_,L).errors}function Ru(_,L){return{"safety.level":_.safety.level,...Rs("safety.overrides",_.safety.overrides),"workflow.worktree_mode":String(_.workflow.worktree_mode),"destructive_command_protection.enabled":String(_.destructive_command_protection.enabled),...Rs("destructive_command_protection.overrides",_.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":_s(_.destructive_command_protection.allow_paths),"secret_protection.enabled":String(_.secret_protection.enabled),...Rs("secret_protection.overrides",_.secret_protection.overrides),"secret_protection.deny_paths":_s(_.secret_protection.deny_paths),"secret_protection.allow_paths":_s(_.secret_protection.allow_paths),...L?{"audit.retention_days":String(_.audit.retention_days)}:{}}}function Po(_,L,U){let J=Ru(_,U),Y=Ru(L,U);return[...new Set([...Object.keys(J),...Object.keys(Y)])].flatMap((re)=>J[re]===Y[re]?[]:[{field:re,before:J[re],after:Y[re]}])}function kr(_,L){let U=u(_,L);if(!_u(U))return{baseline:k(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,_.home),diagnostics:[]};let J=Ot(U),Y=At(J.value,_.home);return{baseline:Y.policy,diagnostics:J.errors.length>0?J.errors:Y.errors}}function Ot(_){if(!_u(_))return{errors:[`${_}: file not found`]};try{return{value:JSON.parse(ab(_,"utf-8")),errors:[]}}catch(L){let U=L instanceof Error?L.message:String(L);return{errors:[`${_}: ${L instanceof SyntaxError?`Invalid JSON: ${U}`:U}`]}}}function Eo(_,L){let U=lb(_)?_:{};return{version:L.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((J)=>U[J]!==void 0).map((J)=>[J,U[J]]))}}function Rs(_,L){return Object.fromEntries(Object.entries(L).flatMap(([U,J])=>J===void 0?[]:[[`${_}.${U}`,String(J)]]))}function _s(_){return _.length===0?"(none)":_.join(", ")}function lb(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{chmodSync as cb,existsSync as Tu,mkdirSync as db,readFileSync as Iu}from"node:fs";import{dirname as ub}from"node:path";function Au(_,L={}){let U=u(_,L);if(!Tu(U))return{path:U,exists:!1,raw:"",policy:A(),errors:[]};let J=Iu(U,"utf-8");if(!J.trim())return{path:U,exists:!0,raw:J,policy:A(),errors:["Config file is empty"]};try{let Y=At(JSON.parse(J),_.home);return{path:U,exists:!0,raw:J,policy:Y.policy,errors:Y.errors}}catch(Y){return{path:U,exists:!0,raw:J,policy:A(),errors:[`Invalid JSON: ${Y instanceof Error?Y.message:String(Y)}`]}}}function Fn(_,L,U={}){let J=u(_,U),Y=At(L,_.home);if(Y.errors.length>0)return{path:J,policy:A(),errors:Y.errors};let re=Y.policy;return db(ub(J),{recursive:!0,mode:448}),g(se(J),`${JSON.stringify(re,null,2)}
`,384),cb(J,384),{path:J,policy:re,errors:[]}}function Ou(_,L){let U=At(L,_.home);if(U.errors.length>0)return{errors:U.errors};return{preview:He(U.policy,_.env),errors:[]}}function $u(_,L={}){let U=u(_,L);if(!Tu(U))return Fn(_,te,L);let J=Iu(U,"utf-8");if(!J.trim())return Fn(_,te,L);try{return Fn(_,k(JSON.parse(J),_.home),L)}catch{return Fn(_,te,L)}}var Du=new Set(["check","apply"]),Nu="(unset)";async function ju(_,L,U={}){let J=mn({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},L),Y=J.positionals[0],re=[...J.errors,...Y&&!Du.has(Y)?[`Unknown policy subcommand: ${Y}`]:[],...Y&&Du.has(Y)&&!J.positionals[1]?[`policy ${Y} requires a file`]:[],...J.positionals.slice(2).map((We)=>`Unexpected policy argument: ${We}`)];if(re.length>0){for(let We of re)console.error(We);return 1}let ie=J.positionals[1];if(!Y||!ie)return Wt(Rr,console.error),1;let pe=U.cwd??process.cwd(),me=J.flags.global?u(_):h(pe);if(!J.flags.global&&O(_,{cwd:pe}))return console.error(`${me} is the user policy, not a project policy; use --global for the user scope, or run from a project directory`),1;let ke=Ot(ie),Ce=[...ke.errors,...wr(ke.value,_.home).map((We)=>`${ie}: ${We}`),...!J.flags.global&&hb(ke.value)&&ke.value.audit!==void 0?[`${ie}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(Ce.length>0){for(let We of Ce)console.error(We);return 1}let Re=k(ke.value,_.home);if(console.log(`Scope: ${J.flags.global?"user":"project"} (${me})`),console.log(`Proposal: ${ie}`),J.flags.global)Lu(k(Ot(me).value,_.home),Re,!0);if(!J.flags.global){let We=kr(_).baseline;console.log("Effective policy (user + project merged):"),Lu(ee(We,de(Ot(me).value,_.home).policy).policy,ee(We,de(ke.value,_.home).policy).policy,!1)}if(Y==="check")return 0;let Ne=U.input??process.stdin,_e=U.output??process.stdout;if(!Ne.isTTY||!_e.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ie}${J.flags.global?" --global":""}`),1;if(!await gb(`Apply this policy to ${me}? [y/N] `,Ne,_e))return console.log("Cancelled; nothing was written."),0;return yb(_,me,ke.value,Re,J.flags.global),console.log(`Policy applied: ${me}`),0}function gb(_,L,U){let J=mb({input:L,output:U,terminal:!1});return new Promise((Y)=>{J.once("close",()=>Y(!1)),J.question(_,(re)=>{Y(/^y(es)?$/i.test(re.trim())),J.close()})})}function yb(_,L,U,J,Y){if(Y){Fn(_,J);return}pb(fb(L),{recursive:!0}),bn(L,Eo(U,J))}function Lu(_,L,U){let J=Po(_,L,U);if(J.length===0){console.log("No changes.");return}console.log(`Changes (${J.length}):`);for(let Y of J)console.log(`  ${Y.field}: ${Y.before??Nu} -> ${Y.after??Nu}`)}function hb(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{join as Aw}from"node:path";var Hu="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- `caffeinate`, `exec`, `nice`, `nohup`, `setsid`, `stdbuf`, `time`, and `timeout` are built-in transparent wrappers and need no configuration. Configure only other wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n- `command_tools`: Optional array of shell tools that a plugin adds to an agent and that CC Safety Net does not know. Each entry is a tool name such as `\"ops_bash\"`, or `{ \"name\": \"ops_run_background\", \"cwd\": \"cwd\" }` when the tool takes its working directory in a named argument (otherwise `workdir`, `cwd`, or `working_directory` is read). A call to a declared tool with a non-empty string `command` is analyzed like a built-in shell command. User and project lists merge; the user entry wins a name declared in both.\n- Built-in shell and file tools are already analyzed and cannot be declared; `rule verify` reports one declared by hand.\n- Use `cc-safety-net rule tool add ops_bash ops_run_background` to declare tools in the user config, or add `--project` for the project config.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function Ro(_,L){if(!_.ok){qu(_);return}Uu(_,L)}function Mu(_,L,U){if(_.ok)console.log(U);if(!_.add){Ro(_,`Added rulebook source: ${L}`);return}if(!_.ok){qu(_);return}if(_.add.added.length>0)console.log(`Added ${_.add.added.length} ${_.add.added.length===1?"rulebook":"rulebooks"} from ${_.add.source} at ${_.add.ref}:`),_.add.added.forEach((J)=>{console.log(`  - ${J}`)});if(_.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${_.add.source} at ${_.add.ref}: ${_.add.alreadyConfigured.join(", ")}`);if(_.add.commits.length>0)console.log(`Vendored at ${_.add.commits.map((J)=>J.slice(0,7)).join(", ")}.`);Uu(_,"Rule config updated.")}function Uu(_,L){for(let U of _.changes??[])console.log(U);console.log(L),console.log(""),vb(_.entries)}function vb(_){if(_.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${_.length}):`);for(let L of _)console.log(`  - ${L.name} ${L.version} (${bb(L.ruleCount)})`),console.log(`    Source: ${L.spec}`)}function bb(_){return`${_} ${_===1?"rule":"rules"}`}function Gu(_){Wn("Active sources",_.rulebooks,(L)=>[`[${L.source}] ${L.name} ${L.version}`,`  Source: ${L.spec}`]),Wn("Active rules",_.rules,(L)=>[`[${kb(_,L.name)}] ${L.name}`,...wb(L),`  Reason: ${L.reason}`]),Wn("Disabled rules",Fu(_,"off"),(L)=>[L.key]),Wn("Reason overrides",Fu(_,"reason"),(L)=>[L.key,`  Reason: ${L.value.reason}`]),Wn("Transparent wrappers",_.transparent_wrappers,(L)=>[L]),Wn("Issues",_.errors,(L)=>[L]),Wn("Warnings",_.warnings,(L)=>[L])}function Bu(_){Wn("Command tools",_,(L)=>typeof L.tool==="string"?[`[${L.scope}] ${L.tool}`]:[`[${L.scope}] ${L.tool.name}`,...L.tool.cwd===void 0?[]:[`  Cwd argument: ${L.tool.cwd}`]])}function Wn(_,L,U){if(L.length===0){console.log(`${_}: (none)`);return}console.log(`${_} (${L.length}):`);for(let J of L){let[Y,...re]=U(J);console.log(`  - ${Y}`);for(let ie of re)console.log(`    ${ie}`)}}function wb(_){if(!_.match)return[`  Command: ${_.subcommand?`${_.command} ${_.subcommand}`:_.command}`,`  Block args: ${_.block_args.join(", ")}`];return[`  Command: ${[_.command,..._.match.command_path].join(" ")}`,..._.match.any_args?[`  Any args: ${_.match.any_args.join(", ")}`]:[],..._.match.exclude_args?[`  Exclude args: ${_.match.exclude_args.join(", ")}`]:[]]}function kb(_,L){return _.rulebooks.find((U)=>U.rules.includes(L))?.source??"project"}function Fu(_,L){return Object.entries({..._.userConfig?.overrides,..._.projectConfig?.overrides}).filter((U)=>{if(L==="off")return U[1]==="off";return!!U[1]&&typeof U[1]==="object"}).map(([U,J])=>({key:U,value:J}))}function qu(_){for(let L of _.errors)console.error(L)}import{dirname as fp,join as No}from"node:path";import{join as Os,resolve as $b}from"node:path";function Cr(_){let L=d(_);if(L.errors.length>0)return{ok:!1,result:{ok:!1,errors:L.errors,entries:[]}};return{ok:!0,config:L.config??ce}}function Vu(_){bn(_,ce)}function Ku(_){bn(_,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Ao}from"node:path";var Cb="custom.";function _o(_){if(_.rulebook_version!==2)return[];let L=_.rules.map((U)=>({name:U.name,command:U.command,block_args:[],match:U.match,reason:U.reason,intent:U.intent}));return(_.tests??[]).flatMap((U,J)=>{let Y=Ts(y(U.command));if(Y.length===0)return[`tests[${J}]: could not parse fixture command: ${U.command}`];let re=Y.reduce((ie,pe)=>ie??N(pe,L)?.id.slice(Cb.length),void 0);if(U.expect==="blocked"){if(re===U.rule)return[];let ie=re?`"${re}" matched first`:"no rule matched";return[`tests[${J}]: expected "${U.rule}" to block "${U.command}" but ${ie}`]}return re?[`tests[${J}]: expected "${U.command}" to be allowed but "${re}" matched`]:[]})}function Ts(_){return _.nodes.flatMap((L)=>{if(L.kind==="group"||L.kind==="function")return Ts(L.body);if(L.kind!=="command")return[];let U=we(ne(L.dialect,L.words)).words.map(t);return[...U.length>0?[U]:[],...L.nested.flatMap((J)=>Ts(J))]})}var To=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function Io(_={}){return{requests:0,responseBytes:0,maxRequests:_.maxRequests??To.maxRequests,maxResponseBytes:_.maxResponseBytes??To.maxResponseBytes}}function Mn(_){return{controller:new AbortController,budget:Io(),resolveUrl:_}}function Ju(_){return _ instanceof Error&&_.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function Wu(_){if(_.requests>=_.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.requests++}function zu(_,L){if(L>_.maxResponseBytes-_.responseBytes)throw _.responseBytes+=L,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.responseBytes+=L}var Xu=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function Yu(_,L,U=w(Ao(Ao(L)),"rules policy"),J=Mn()){if(C(_))return Eb(_,J);return Pb(_,L,U)}async function Qu(_,L,U,J,Y,re){if(!C(_))return Yu(_,L,U,J);let ie=Y?null:xb(_,L,U);if(ie)return ie;if(!Y&&!re)throw Error(`${_} is not vendored; run rule update ${_} to vendor it`);return Yu(_,L,U,J)}function xb(_,L,U=w(Ao(Ao(L)),"rules policy")){let J=M(_),Y=F(L,J.name),re=r(i(U,Y));if(re===null)return null;let ie=ue(Is(re,`Invalid rulebook ${Y}.`));if(ie.name!==J.name)throw Error(`rulebook name "${ie.name}" in ${Y} must match "${J.name}"`);return{spec:_,rulebook:ie,content:re}}async function ep(_,L={}){if(!Z(_))throw Error(`Invalid GitHub repository source: ${_}`);let[U,J]=_.split("/");if(!U||!J)throw Error(`Invalid GitHub repository source: ${_}`);if(L.ref!==void 0&&!ae(L.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${L.ref}`);let Y=L.operation??Mn(),re=L.ref??await Sb(U,J,_,Y),ie=await tp(U,J,re,_,Y),pe=await Oo(`https://api.github.com/repos/${U}/${J}/git/trees/${ie}?recursive=1`,"tree",Y),me=pe.response;if(!me.ok)throw Error(`Failed to inspect ${_}: GitHub tree returned ${me.status}`);let ke=JSON.parse(pe.content);if(!Array.isArray(ke?.tree))throw Error(`Failed to inspect ${_}: unexpected GitHub tree response`);let Ce=ke.tree,Re=[...new Set(Ce.flatMap((Ne)=>{if(!Ne||typeof Ne!=="object")return[];let _e=Ne;if(_e.type!=="blob"||typeof _e.path!=="string")return[];let Te=_e.path.match(Ct);return Te?.[1]?[Te[1]]:[]}))].sort();if(Re.length===0)throw Error(`No rulebooks found in ${_} under ${ye}/`);return{source:_,owner:U,repo:J,ref:re,commit:ie,names:Re}}async function Sb(_,L,U,J){let Y=await Oo(`https://api.github.com/repos/${_}/${L}`,"metadata",J),re=Y.response;if(!re.ok)throw Error(`Failed to inspect ${U}: GitHub returned ${re.status}`);let pe=JSON.parse(Y.content)?.default_branch;if(typeof pe!=="string"||pe==="")throw Error(`Failed to inspect ${U}: missing default branch`);if(!ae(pe))throw Error(`GitHub returned an invalid default branch: ${pe}`);return pe}function Pb(_,L,U){Et(_);let J=F(L,_),Y=r(i(U,J));if(Y===null)throw Error(`Rulebook source not found: ${_}`);let re=np(Is(Y,"Invalid local rulebook source."));if(re.name!==_)throw Error(`rulebook name "${re.name}" must match local source "${_}"`);return{spec:_,rulebook:re,content:Y}}async function Eb(_,L){let U=M(_),J=await tp(U.owner,U.repo,U.ref,_,L),Y=await Oo(`https://raw.githubusercontent.com/${U.owner}/${U.repo}/${J}/${U.path}`,"raw",L),re=Y.response;if(!re.ok)throw Error(`Failed to fetch ${_}: GitHub raw returned ${re.status}`);let ie=Y.content,pe=np(Is(ie,"Invalid GitHub rulebook response."));if(pe.name!==U.name)throw Error(`rulebook name "${pe.name}" must match GitHub source "${U.name}"`);return{spec:_,rulebook:pe,content:ie}}function np(_){let L=ue(_),U=_o(L);if(U.length>0)throw Error(U.join("; "));return L}function Is(_,L){try{return JSON.parse(_)}catch{throw Error(L)}}async function tp(_,L,U,J,Y){let re=await Oo(`https://api.github.com/repos/${_}/${L}/commits/${encodeURIComponent(U)}`,"commit",Y),ie=re.response;if(!ie.ok)throw Error(`Failed to resolve ${J}: GitHub returned ${ie.status}`);let pe=JSON.parse(re.content);if(typeof pe?.sha!=="string"||pe.sha==="")throw Error(`Failed to resolve commit for ${J}`);return pe.sha}async function Rb(_,L,U={}){if(U.signal?.aborted)throw U.signal.reason;let J=U.budget??Io(),Y=new AbortController,re=()=>Y.abort(U.signal?.reason);U.signal?.addEventListener("abort",re,{once:!0});let ie=!1,pe=setTimeout(()=>{if(Y.signal.aborted)return;ie=!0,Y.abort()},U.timeoutMs??Xu.timeoutMs);try{if(U.signal?.aborted)throw U.signal.reason;Wu(J);let me=await fetch(_,{signal:Y.signal,redirect:"error"});if(!me.ok)return rp(me),{response:me,content:""};return{response:me,content:await _b(me,L,J,()=>Y.abort())}}catch(me){if(ie)throw Error("GitHub request timed out",{cause:me});if(U.signal?.aborted)throw U.signal.reason;throw me}finally{clearTimeout(pe),U.signal?.removeEventListener("abort",re)}}function Oo(_,L,U){return Rb(U.resolveUrl?.(_)??_,L,{budget:U.budget,signal:U.controller.signal})}async function _b(_,L,U=Io(),J){let Y=Xu[`${L}Bytes`],re=Number(_.headers.get("content-length"));if(Number.isFinite(re)&&re>Y)throw rp(_),Error(`GitHub ${L} response exceeds ${Y} bytes`);if(!_.body)return"";let ie=_.body.getReader(),pe=[],me=0;while(!0){let ke=await ie.read();if(ke.done)break;try{zu(U,ke.value.byteLength)}catch(Ce){throw J?.(),Zu(ie),Ce}if(me+=ke.value.byteLength,me>Y)throw J?.(),Zu(ie),Error(`GitHub ${L} response exceeds ${Y} bytes`);pe.push(Buffer.from(ke.value))}return Buffer.concat(pe,me).toString("utf-8")}function rp(_){if(!_.body)return;op(()=>_.body?.cancel())}function Zu(_){op(()=>_.cancel())}function op(_){try{Promise.resolve(_()).catch(()=>{})}catch{}}var Tb=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function ip(_,L){let U=lp(_.rules,L);if(U.length>0)return{ok:!0,specs:U};return ap(_.rules,L)}function sp(_,L){let U=lp(_,L);if(U.length>0)return{ok:!0,specs:U};let J=Ab(_,L);if(J.length>0)return{ok:!0,specs:J};let Y=Ob(_,L);if(!Y.ok)return Y;if(Y.specs.length>0)return{ok:!0,specs:Y.specs};return ap(_,L)}function ap(_,L){let U=_.filter((J)=>As(J)?.name===L);if(U.length===1)return{ok:!0,specs:U};return Ib(L,U)}function Ib(_,L){return{ok:!1,result:{ok:!1,errors:L.length===0?[`No configured rulebook matches ${_}`]:[`Ambiguous rulebook match ${_}: ${L.join(", ")}`],entries:[]}}}function lp(_,L){return _.filter((U)=>U===L)}function Ab(_,L){let U=L.match(Tb),J=U?.[1],Y=U?.[2],re=U?.[3];if(!J||!Y||!re||!ae(re))return[];return cp(_,(ie)=>ie.owner===J&&ie.repo===Y&&ie.ref===re)}function Ob(_,L){if(!Z(L))return{ok:!0,specs:[]};let[U,J]=L.split("/"),Y=cp(_,(ie)=>ie.owner===U&&ie.repo===J);if(new Set(Y.map((ie)=>As(ie)?.ref).filter((ie)=>!!ie)).size<2)return{ok:!0,specs:Y};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${L}. Use an explicit ref:`,`  cc-safety-net rule remove ${L}#<ref>`],entries:[]}}}function As(_){try{return M(_)}catch{return null}}function cp(_,L){return _.filter((U)=>{let J=As(U);return J?L(J):!1})}async function Do(_,L={}){return Db(_,L,await $o(_,L,Mn()))}function Db(_,L,U){if(!U.ok)return U;let J=hn(_,L),Y=[...new Set(B(J.configPath,J.filesystemScope))];if(Y.length===0)return U;return{ok:!1,errors:Y,entries:U.entries}}async function $o(_,L,U,J={},Y=new Set,re=new Set){try{let ie=hn(_,L),pe=Cr(ie.configTarget);if(!pe.ok)return pe.result;let me=pe.config,ke=L.only?ip(me,L.only):{ok:!0,specs:me.rules};if(!ke.ok)return ke.result;let Ce=new Set([...L.refresh?ke.specs:[],...Y]),Re=(nn)=>Qu(nn,ie.configDir,ie.filesystemScope,U,Ce.has(nn),!L.refresh||Ce.has(nn)),Ne=await qb(me.rules,L.refresh?(nn)=>Re(nn).then((sn)=>({ok:!0,item:sn})).catch((sn)=>{if(Ju(sn))throw sn;return{ok:!1,spec:nn,message:sn instanceof Error?sn.message:String(sn)}}):async(nn)=>({ok:!0,item:await Re(nn)}),U),_e=Ne.filter((nn)=>!nn.ok),Te=Ne.filter((nn)=>nn.ok).map((nn)=>nn.item),We=Te.flatMap((nn)=>Nb(nn,me.rules)),Me=Te.flatMap((nn)=>Lb(nn,re,ie)),Ye=new Set([...We,...Me].map((nn)=>nn.spec)),tn=[..._e,...We,...Me],on=[],an=Hb(on,()=>Te.flatMap((nn)=>Ye.has(nn.spec)||tn.length>0&&re.has(nn.spec)?[]:jb(nn,ie,J,on)));return{ok:tn.length===0,errors:tn.map((nn)=>`Failed to update ${nn.spec}: ${nn.message}`),entries:Te.map(Mb),changes:an}}catch(ie){return Sr(ie)}}function Nb(_,L){if(!C(_.spec))return[];let U=Ge(_.spec),J=L.filter((Y)=>Y!==_.spec&&Ge(Y).toLowerCase()===U.toLowerCase());if(J.length===0)return[];return[{ok:!1,spec:_.spec,message:`rulebook name "${U}" is also claimed by ${J.join(", ")}; rename one of them`}]}function Lb(_,L,U){if(!L.has(_.spec)||!C(_.spec))return[];let J=F(U.configDir,_.rulebook.name),Y=r(i(U.filesystemScope,J));if(Y===null||Y===_.content)return[];return[{ok:!1,spec:_.spec,message:`${J} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function jb(_,L,U,J){if(!C(_.spec))return[];let Y=F(L.configDir,_.rulebook.name),re=i(L.filesystemScope,Y),ie=r(re);if(ie===_.content)return[];return J?.push({target:re,previous:ie}),g(re,_.content,void 0,U._testAfterPolicyRename),Fb(_,ie)}function Hb(_,L){try{return L()}catch(U){for(let J of[..._].reverse()){if(J.previous===null){H(J.target);continue}g(J.target,J.previous)}throw U}}function Fb(_,L){if(L===null)return[`Vendored ${_.spec} (${_.rulebook.version})`];let U=Se(L),J="problem"in U?null:U.rulebook,Y=new Map(J?.rules.map((ie)=>[ie.name,JSON.stringify(ie)])??[]),re=new Set(_.rulebook.rules.map((ie)=>ie.name));return[`Updated ${_.spec} (${J?.version??"unreadable"} -> ${_.rulebook.version})`,...[...re].filter((ie)=>!Y.has(ie)).map((ie)=>`  + ${ie}`),...[...Y.keys()].filter((ie)=>!re.has(ie)).map((ie)=>`  - ${ie}`),..._.rulebook.rules.filter((ie)=>{let pe=Y.get(ie.name);return pe!==void 0&&pe!==JSON.stringify(ie)}).map((ie)=>`  ~ ${ie.name}`)]}function Mb(_){return{spec:_.spec,name:_.rulebook.name,version:_.rulebook.version,ruleCount:_.rulebook.rules.length}}async function dp(_,L,U={}){return Ub(_,L,U,Mn())}async function Ub(_,L,U,J,Y={}){let re=null,ie=!1;try{let pe=hn(_,U),me=r(pe.configTarget);re={target:pe.configTarget,content:me};let ke=Cr(pe.configTarget);if(!ke.ok)return ke.result;let Ce=ke.config,Re=Z(L)?await ep(L,{ref:U.ref,operation:J}):null,Ne=Re?Gb(Re,U.rulebooks):[],_e=Re?Ne.map((tn)=>Bb(Ce.rules,Re,tn)??`${L}#${Re.ref}/${tn}`):[L],Te=_e.filter((tn)=>!Ce.rules.includes(tn)),We=[...Ce.rules,...Te];if(We.length>be)return Vb();if(We.length!==Ce.rules.length)ie=!0,bn(pe.configTarget,{...Ce,rules:We},void 0,Y._testAfterPolicyRename);let Me=await $o(_,U,J,Y,new Set(Te),new Set(Te));if(!Me.ok)xr(pe.configTarget,me);if(!Me.ok||!Re)return Me;let Ye=Ne.filter((tn,on)=>Te.includes(_e[on]??""));return{...Me,add:{source:L,ref:Re.ref,selected:Ne,added:Ye,alreadyConfigured:Ne.filter((tn)=>!Ye.includes(tn)),commits:Te.length>0?[Re.commit]:[]}}}catch(pe){if(ie&&re)try{xr(re.target,re.content)}catch(me){return Sr(me)}return Sr(pe)}}function Gb(_,L){let U=L?[...new Set(L)]:_.names,J=U.filter((Y)=>!_.names.includes(Y));if(J.length>0)throw Error(`Rulebooks not found in ${_.source} at ${_.ref}: ${J.join(", ")}
Available rulebooks: ${_.names.join(", ")}`);return U}function Bb(_,L,U){let J=`${L.source}#${L.ref}/${U}`;if(_.includes(J))return J;let Y=`${L.source}#${L.commit}/${U}`;return _.find((re)=>re===Y)}async function qb(_,L,U=Mn()){if(_.length>be)throw Error(xe);let J=[],Y=0,re,ie=Array.from({length:Math.min(_.length,To.concurrency)},async()=>{while(!re){let pe=Y;if(pe>=_.length)return;Y++;try{J[pe]=await L(_[pe],pe,U.controller.signal)}catch(me){if(!re)re={value:me},Y=_.length,U.controller.abort(me);return}}});if(await Promise.all(ie),re)throw re.value;return J}function Vb(){return{ok:!1,errors:[xe],entries:[]}}async function up(_,L,U={}){try{return await Kb(_,L,U,{})}catch(J){return Sr(J)}}async function Kb(_,L,U,J){let Y=hn(_,U),re=d(Y.configTarget);if(re.errors.length>0)return{ok:!1,errors:re.errors,entries:[]};if(!re.config)return{ok:!1,errors:[`No config found at ${Y.configPath}`],entries:[]};let ie=sp(re.config.rules,L);if(!ie.ok)return ie.result;let pe=U.deleteSource?Jb(Y.configDir,ie.specs,Y.filesystemScope):{ok:!0,dirs:[]};if(!pe.ok)return pe.result;let me=r(Y.configTarget);if(me===null)return Sr(Error("Rules config is unavailable."));try{bn(Y.configTarget,{...re.config,rules:re.config.rules.filter((Re)=>!ie.specs.includes(Re))},void 0,J._testAfterPolicyRename)}catch(Re){throw xr(Y.configTarget,me),Re}let ke=await $o(_,U,Mn(),J);if(!ke.ok)return xr(Y.configTarget,me),ke;let Ce=Wb(pe.dirs,J,Y.filesystemScope);if(!Ce.ok){xr(Y.configTarget,me);let Re=await $o(_,U,Mn(),J);if(!Re.ok)return{ok:!1,errors:[...Ce.result.errors,...Re.errors],entries:Re.entries};return Ce.result}return ke}function Jb(_,L,U){let J=L.flatMap((pe)=>p.test(pe)?[]:["--delete-source can only delete local rulebook sources"]),Y=L.map((pe)=>Os(_,pe)),re=J.length>0?[]:Y.flatMap((pe)=>pp(pe,U)),ie=[...J,...re];return ie.length>0?{ok:!1,result:{ok:!1,errors:ie,entries:[]}}:{ok:!0,dirs:Y}}function pp(_,L){let U=$b(_),J=i(L,U),Y=ge(J);if(!Y)return[`Local rulebook source directory not found: ${_}`];let re=Y.find((ie)=>ie.name==="rulebook.json");if(!re)return[`Local rulebook source directory is missing rulebook.json: ${_}`];if(re.kind!=="file")throw new o(L.label);if(r(i(L,Os(U,"rulebook.json"))),Y.length>1)return[`Local rulebook source directory contains extra files: ${_}. delete manually if you really want to remove the directory.`];return[]}function Wb(_,L,U){let J=_.flatMap((Y)=>{try{if(!ge(i(U,Y)))return[];let re=pp(Y,U);if(re.length>0)return re;return zb(Y,L,U),[]}catch(re){return[`Failed to delete local rulebook source ${Y}: ${re instanceof Error?re.message:String(re)}`]}});return J.length>0?{ok:!1,result:{ok:!1,errors:J,entries:[]}}:{ok:!0}}function zb(_,L,U){if(L._testDeleteLocalSourceDir){L._testDeleteLocalSourceDir(_);return}H(i(U,Os(_,he))),wt(i(U,_))}function xr(_,L){if(L===null){H(_);return}g(_,L)}function Sr(_){return{ok:!1,errors:[_ instanceof Error?_.message:String(_)],entries:[]}}var Yb=".safety-net.json",Zb="~/.cc-safety-net/config.json";async function yp(_,L){let U=O(_,{cwd:L.cwd});if(U)console.log(`Skipped the project scope: ${I(L.cwd)} is the user rule config, not a project rule config`);return[U||await mp(_,{legacyPath:Nt(L.cwd),configPath:I(L.cwd),defaultRulebookName:"project-rules",migratedFrom:Yb,cleanup:L.cleanup,syncOptions:{cwd:L.cwd}}),await mp(_,{legacyPath:Lt(_),configPath:W(_),defaultRulebookName:"user-rules",migratedFrom:Zb,cleanup:L.cleanup,syncOptions:{cwd:L.cwd,global:!0}})].every((Y)=>Y)?0:1}async function mp(_,L){let U=hn(_,L.syncOptions),J=i(U.filesystemScope,L.legacyPath),Y=r(J);if(Y===null)return console.log(`No legacy config found at ${L.legacyPath}`),!0;let re=Qb(Y);if(!re.ok){for(let _e of re.errors)console.error(_e);return!1}let ie=d(U.configTarget);if(ie.errors.length>0){for(let _e of ie.errors)console.error(_e);return!1}let pe=ie.config??ce,me=ew(fp(L.configPath),pe.rules,L.defaultRulebookName,L.migratedFrom,U.filesystemScope),ke=No(fp(L.configPath),me,"rulebook.json"),Ce=i(U.filesystemScope,ke),Re=[gp(U.configTarget),gp(Ce)],Ne=await Xb(_,L,U.configTarget,Ce,me,re.config.rules,{...pe,rules:pe.rules.includes(me)?pe.rules:[...pe.rules,me]});if(!Ne.ok){rw(Re);for(let _e of Ne.errors)console.error(_e);return!1}if(!L.cleanup)return console.log(`Migrated legacy config at ${L.legacyPath}. Legacy file is no longer used.`),!0;if(!tw(U.configTarget,Ce,me,L.migratedFrom,re.config.rules))return console.error(`Migration cleanup verification failed for ${L.legacyPath}`),!1;return H(J),console.log(`Deleted legacy config at ${L.legacyPath}`),!0}async function Xb(_,L,U,J,Y,re,ie){try{return bn(U,ie),bn(J,nw(Y,L.migratedFrom,re)),await Do(_,L.syncOptions)}catch(pe){return{ok:!1,errors:[pe instanceof Error?pe.message:String(pe)]}}}function Qb(_){try{let L=JSON.parse(_),U=Jo(L);if(U.errors.length>0)return{ok:!1,errors:U.errors};return{ok:!0,config:{version:1,rules:L.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function ew(_,L,U,J,Y){let re=L.find((ie)=>ow(i(Y,No(_,ie,"rulebook.json")))===J);if(re)return re;if(r(i(Y,No(_,U,"rulebook.json")))===null)return U;for(let ie=2;;ie++){let pe=`${U}-${ie}`;if(r(i(Y,No(_,pe,"rulebook.json")))===null)return pe}}function nw(_,L,U){return{rulebook_version:1,name:_,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:L,allowed_commands:[...new Set(U.map((J)=>J.command))],rules:U,tests:U.map((J)=>({command:[J.command,J.subcommand,J.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:J.name}))}}function tw(_,L,U,J,Y){if(!d(_).config?.rules.includes(U))return!1;try{let ie=r(L);if(ie===null)return!1;let pe=JSON.parse(ie);return pe.migrated_from===J&&JSON.stringify(pe.rules)===JSON.stringify(Y)}catch{return!1}}function gp(_){return{target:_,content:r(_)}}function rw(_){for(let L of _){if(L.content===null){H(L.target);continue}g(L.target,L.content)}}function ow(_){let L=r(_);if(L===null)return null;try{let U=JSON.parse(L);return typeof U.migrated_from==="string"?U.migrated_from:null}catch{return null}}import{mkdir as iw,readFile as sw,writeFile as aw}from"node:fs/promises";import{dirname as lw,join as cw}from"node:path";var dw=86400000,uw=604800000;async function vp(_,L=Date.now()){if(_.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let U=et(_);if(!U)return null;let J=cw(U,".cc-safety-net","update-check.json"),Y=await pw(J,L);if(!Y.lastCheck||L-Y.lastCheck>dw){let pe=await Gn();if(Y.lastCheck=L,pe.latestVersion)Y.latestVersion=pe.latestVersion;if(!await hp(J,Y))return null;if(pe.error)return null}let re=Y.latestVersion,ie=pn();if(!re||!Qo(re,ie))return null;if(Y.notifiedVersion===re&&Y.notifiedAt!==void 0&&L-Y.notifiedAt<uw)return null;if(Y.notifiedVersion=re,Y.notifiedAt=L,!await hp(J,Y))return null;return`UPDATE_AVAILABLE: cc-safety-net v${re} is available (running v${ie}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function pw(_,L){let U=await sw(_,"utf8").then((re)=>JSON.parse(re)).catch(()=>{return});if(!U||typeof U!=="object"||Array.isArray(U))return{};let J=U,Y=(re)=>typeof re==="number"&&Number.isFinite(re)&&re<=L?re:void 0;return{lastCheck:Y(J.lastCheck),latestVersion:typeof J.latestVersion==="string"?J.latestVersion:void 0,notifiedVersion:typeof J.notifiedVersion==="string"?J.notifiedVersion:void 0,notifiedAt:Y(J.notifiedAt)}}async function hp(_,L){return iw(lw(_),{recursive:!0,mode:448}).then(()=>aw(_,JSON.stringify(L),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as hw,resolve as Ns}from"node:path";var bp=new Map([["Bash","posix"],["PowerShell","powershell"],["Monitor","posix"]]);var wp=new Map([["Bash","auto"]]);var kp=new Map([["bash","auto"],["Bash","auto"],["powershell","powershell"],["PowerShell","powershell"]]);var Cp=new Map([["Shell","auto"]]);var xp=new Map([["exec","auto"]]),Sp="write_to_process";var Pp=new Map([["Execute","auto"]]);var Ep=new Map([["run_shell_command","auto"]]);var Rp=new Map([["run_terminal_command","auto"],["run_terminal_cmd","auto"],["monitor","auto"],["bash","auto"],["Shell","auto"]]);var _p=new Map([["terminal","posix"]]);var Tp=new Map([["Bash","posix"]]);var Ip="exec";var gw=[["antigravity-cli",[...Qa.keys(),el]],["claude-code",[...bp.keys()]],["codex",[...wp.keys()]],["copilot-cli",[...kp.keys()]],["cursor",[...Cp.keys()]],["deepseek-harness",[...Qe.keys()]],["devin",[...xp.keys(),Sp]],["droid",[...Pp.keys()]],["gemini-cli",[...Ep.keys()]],["grok-build",[...Rp.keys()]],["hermes-agent",[..._p.keys()]],["kimi-code",[...Tp.keys()]],["openclaw",[Ip]],["opencode",[Je,Ee]],["pi",[...Xe.keys()]]].flatMap(([_,L])=>L.map((U)=>({name:U,integration:cn(_)}))),Ap="and is already analyzed. Built-in tools cannot be declared.";function Lo(_){let L=Pe(_),U=[...new Set(gw.filter((J)=>Pe(J.name)===L).map((J)=>J.integration))].sort((J,Y)=>J.localeCompare(Y));if(U.length>0)return`"${_}" is a built-in shell tool of ${yw(U)}, ${Ap}`;if(x(_)!=="unknown")return`"${_}" is a built-in file tool, ${Ap}`;return}function yw(_){return _.length===1?_[0]??"":`${_.slice(0,-1).join(", ")} and ${_.at(-1)}`}var $p="CC Safety Net Config",vw="═".repeat($p.length),bw="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",ww=new Set(["rule.json","rule.lock","cache"]);function Dp(_,L={}){try{return kw(_,L)}catch(U){if(U instanceof o)return console.error(U.message),1;throw U}}function kw(_,L){let U=L.cwd??process.cwd(),J=X(_,{cwd:U}),Y=Lt(_),re=Nt(U),ie=Ns(U,ye),pe=i(J.userScope,Y),me=i(J.projectScope,re),ke=!1,Ce=!1,Re=[],Ne=[],_e=Cw(i(J.projectScope,ie));if(Sw(),r(J.userConfigTarget)!==null){let Te=Un(J.userConfigTarget);if(Te.errors.push(...B(J.userConfigPath,J.userScope),...Op(J.userConfigTarget)),Re.push({scope:"User",path:J.userConfigPath,result:Te,schema:"rules",target:J.userConfigTarget}),Te.errors.length>0)ke=!0}if(r(pe)!==null)if(Ce=!0,r(J.userConfigTarget)!==null)Ne.push(jo("user","cleanup"));else{let Te=Wo(pe);if(Re.push({scope:"User",path:Y,result:Te,schema:"legacy",inactive:!0,target:pe}),Ne.push(jo("user",Te.errors.length>0?"fix-or-delete":"migrate")),Te.errors.length>0)ke=!0}if(r(J.projectConfigTarget)!==null){let Te=Un(J.projectConfigTarget);if(Te.errors.push(...B(J.projectConfigPath,J.projectScope),...Op(J.projectConfigTarget)),Re.push({scope:"Project",path:Ns(J.projectConfigPath),result:Te,schema:"rules",target:J.projectConfigTarget}),Te.errors.length>0)ke=!0;if(r(me)!==null)Ce=!0,Ne.push(jo("project","cleanup"))}else if(r(me)!==null){Ce=!0,ke=!0;let Te=Wo(me);Re.push({scope:"Project",path:Ns(re),result:Te,schema:"legacy",inactive:!0,target:me}),Ne.push(jo("project",Te.errors.length>0?"fix-or-delete":"migrate"))}if(_e?.result.errors.length)ke=!0;if(Re.length===0&&!_e)return console.log(`
No config files found. Using built-in rules only.`),0;for(let Te of Re)if(Te.inactive)Ew(Te.scope,Te.path,Te.result);else if(Te.result.errors.length>0)Rw(Te.scope,Te.path,Te.result.errors);else{if(Te.schema==="rules"&&Iw(Te.target))console.log(`
Added $schema to ${Te.scope.toLowerCase()} config.`);Pw(Te.scope,Te.path,Te.result,Te.schema)}for(let Te of Ne)console.error(`
${en.red(Te)}`);if(_e)if(_e.result.errors.length>0)Tw(_e.path,_e.result.errors);else _w(_e.path,_e.result);if(ke)return console.error(`
Config validation failed.`),1;return console.log(Ce?`
Configs valid with warnings.`:`
All configs valid.`),0}function Op(_){return(d(_).config?.command_tools??[]).flatMap((L)=>Lo(typeof L==="string"?L:L.name)??[])}function jo(_,L){let U=`legacy ${_} config`;if(L==="cleanup")return`Warning: Legacy ${_} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(L==="migrate")return`Warning: Legacy ${_} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${_} config is no longer supported. Fix or delete the ${U}, then run \`npx -y cc-safety-net rule migrate\`.`}function Cw(_){if(ge(_)===null)return null;let L=xw(_);if(L.ruleNames.size===0&&L.errors.length===0)return null;return{path:_.path,result:L}}function xw(_){let L=[],U=new Set,J=(ge(_)??[]).filter((Y)=>!ww.has(Y.name)).sort((Y,re)=>Y.name.localeCompare(re.name));if(J.length===0)return{errors:L,ruleNames:U};for(let Y of J){if(!p.test(Y.name)){L.push(`rulebook directory names must match ${p}: ${Y.name}`);continue}if(Y.kind!=="directory"){L.push(`${Y.name} must be a rulebook directory`);continue}let re=i(_.scope,hw(_.path,Y.name,"rulebook.json")),ie=r(re);if(ie===null){L.push(`${Y.name}/rulebook.json is required`);continue}try{let pe;try{pe=JSON.parse(ie)}catch{L.push(`${Y.name}/rulebook.json: invalid JSON`);continue}let me=ue(pe);if(me.name!==Y.name){L.push(`rulebook name "${me.name}" must match folder "${Y.name}"`);continue}let ke=_o(me);if(ke.length>0){L.push(...ke.map((Ce)=>`${Y.name}/rulebook.json: ${Ce}`));continue}U.add(Y.name)}catch(pe){L.push(pe instanceof Error?`${Y.name}/rulebook.json: ${pe.message}`:`${Y.name}/rulebook.json: ${String(pe)}`)}}return{errors:L,ruleNames:U}}function Sw(){console.log($p),console.log(vw)}function Pw(_,L,U,J){if(console.log(`
✓ ${_} config: ${L}`),console.log(`  Schema: ${J==="rules"?"rulebook sources":"legacy inline rules"}`),U.ruleNames.size>0){console.log(`  ${J==="rules"?"Sources":"Rules"}:`);let Y=1;for(let re of U.ruleNames)console.log(`    ${Y}. ${re}`),Y++}else console.log(`  ${J==="rules"?"Sources":"Rules"}: (none)`)}function Ew(_,L,U){if(console.error(`
✗ Legacy ${_.toLowerCase()} config: ${L}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),U.errors.length>0){console.error("  Errors:");let J=1;for(let Y of U.errors)for(let re of Y.split("; "))console.error(`    ${J}. ${re}`),J++;return}if(U.ruleNames.size>0){console.error("  Rules:");let J=1;for(let Y of U.ruleNames)console.error(`    ${J}. ${Y}`),J++;return}console.error("  Rules: (none)")}function Rw(_,L,U){Np(`${_} config`,L,U)}function _w(_,L){console.log(`
✓ GitHub source rules: ${_}`),console.log("  Rulebooks:");let U=1;for(let J of L.ruleNames)console.log(`    ${U}. ${J}`),U++}function Tw(_,L){Np("GitHub source rules",_,L)}function Np(_,L,U){console.error(`
✗ ${_}: ${L}`),console.error("  Errors:");let J=1;for(let Y of U)for(let re of Y.split("; "))console.error(`    ${J}. ${re}`),J++}function Iw(_){try{let L=r(_);if(L===null)return!1;let U=JSON.parse(L);if(U.$schema)return!1;return g(_,JSON.stringify({$schema:bw,...U},null,2)),!0}catch(L){if(L instanceof o)throw L;return!1}}var Lp=new Set(["init","add","remove","update","sync","list","wrapper","tool","migrate","doc","verify"]),Ow=new Set(["init","add","remove","update","sync","wrapper"]),Hp=new Set(["add","remove","list"]),$w="cc-safety-net/rulebooks";async function Fp(_,L){try{return await Dw(_,L)}catch(U){if(U instanceof o)return console.error(U.message),1;throw U}}async function Dw(_,L){let U=Lw(L),J=U.help?Nw(U.positionals):null;if(J)return Wt(J),0;if(U.errors.length>0){for(let ke of U.errors)console.error(ke);return 1}let Y=U.positionals[0];if(!Y)return Wt(Dt,console.error),1;let re=U.positionals[1],ie={global:U.global},pe=process.cwd();if((Y==="tool"?U.project:!U.global&&Ow.has(Y)&&!(Y==="wrapper"&&re==="list"))&&O(_,{cwd:pe}))return console.error(`${I(pe)} is the user rule config, not a project rule config; ${Y==="tool"?"drop --project":"use --global"} for the user scope, or run from a project directory`),1;if(Y==="init"){let ke=hn(_,ie);Fw(ke.configTarget);let Ce=Aw(ke.configDir,"example-rules","rulebook.json"),Re=i(ke.filesystemScope,Ce);if(U.example&&r(Re)===null)Ku(Re);let Ne=B(ke.configPath,ke.filesystemScope);for(let _e of Ne)console.error(_e);if(Ne.length>0)return 1;return console.log("Rule config initialized."),0}if(Y==="add"){let ke=Mp(U);if(!ke)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let Ce=hn(_,ie),Re=await dp(_,ke,{...ie,ref:U.ref,rulebooks:U.only.length>0?U.only:void 0});return Mu(Re,ke,`Scope: ${U.global?"user":"project"} (${Ce.configDir})`),Re.ok?0:1}if(Y==="remove"){if(!re)return console.error("rule remove requires a source"),1;let ke=await up(_,re,{...ie,deleteSource:U.deleteSource});return Ro(ke,`Removed rulebook source: ${re}`),ke.ok?0:1}if(Y==="update"){let ke=await Do(_,{...ie,only:re,refresh:!0});return Ro(ke,"Rule config updated."),ke.ok?0:1}if(Y==="sync")return Va(_,{global:U.global});if(Y==="list"){let ke=Q(_,{cwd:pe});return Gu(ke),ke.errors.length>0?1:0}if(Y==="wrapper")return Mw(_,U);if(Y==="tool")return Gw(_,U,pe);if(Y==="migrate")return yp(_,{cleanup:U.cleanup,cwd:pe});if(Y==="doc"){console.log(Hu);let ke=await vp(_);if(ke)console.error(ke);return 0}if(Y==="verify")return Dp(_);return 1}function Nw(_){if(_.length===0)return Dt;let L=Dt.subcommands.filter((J)=>J.usage.split(" ")[0]===_[0]);if(L.length===0)return null;if(_.length===1&&L.length>1)return{name:`rule ${_[0]}`,description:`Subcommands of rule ${_[0]}`,usage:`rule ${_[0]} <subcommand>`,subcommands:L,options:[]};let U=_.length===1?L[0]:L.find((J)=>J.usage.split(" ")[1]===_[1]);if(!U)return null;return{name:`rule ${_[0]}`,description:U.description,usage:`rule ${U.usage}`,options:_[0]==="add"?qo:[],examples:_[0]==="add"?Vo:void 0}}function Lw(_){let L=mn({label:"rule",booleans:{global:["-g","--global"],project:["--project"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"],cwdArg:["--cwd-arg"]},lists:{only:["--only"]},positionals:"list"},_),U={...L.flags,ref:L.values.ref,cwdArg:L.values.cwdArg,only:L.lists.only??[],help:L.help,positionals:L.positionals,errors:L.errors};return jw(U),U}function jw(_){let[L]=_.positionals;if(L&&!Lp.has(L))_.errors.push(`Unknown rule subcommand: ${L}`);if(_.deleteSource&&L!=="remove")if(L&&Lp.has(L))_.errors.push(`Unknown option for rule ${L}: --delete-source`);else _.errors.push("--delete-source is only valid with 'rule remove'");if(_.cleanup&&L!=="migrate")_.errors.push(zn(L,"--cleanup"));if(_.example&&L!=="init")_.errors.push(zn(L,"--example"));if(_.ref&&L!=="add")_.errors.push(zn(L,"--ref"));if(_.only.length>0&&L!=="add")_.errors.push(zn(L,"--only"));let U=L==="tool"?_.positionals[1]:void 0,J=U&&Hp.has(U)?`tool ${U}`:L;if(_.project&&U!=="add"&&U!=="remove")_.errors.push(zn(J,"--project"));if(_.cwdArg!==void 0&&U!=="add")_.errors.push(zn(J,"--cwd-arg"));if(L==="tool"&&_.global)_.errors.push(zn(L,"--global"));if(L==="add")Hw(_);if(L==="migrate"){if(_.global)_.errors.push(zn(L,"--global"));if(_.positionals.length>1)_.errors.push(`Unexpected rule migrate argument: ${_.positionals[1]}`)}else if(L==="wrapper")jp(_,"a command");else if(L==="tool")jp(_,"a tool name");else if(_.positionals.length>2)_.errors.push(`Unexpected rule argument: ${_.positionals[2]}`);if(L==="list"&&_.global)_.errors.push("Unknown option for rule list: --global")}function Mp(_){if(_.positionals[1])return _.positionals[1];if(_.ref||_.only.length>0)return $w;return}function Hw(_){let L=Mp(_);if(!L)return;if((_.ref||_.only.length>0)&&!Z(L)){if(_.ref)_.errors.push(`--ref can only select a ref for an owner/repo source: ${L}`);if(_.only.length>0)_.errors.push("--only can only select rulebooks from an owner/repo source");return}if(_.ref&&!ae(_.ref))_.errors.push(`--ref must use valid path segments: ${_.ref}`);let U=_.only.filter((J)=>!p.test(J));if(U.length>0)_.errors.push(`Invalid rulebook names: ${U.join(", ")}`)}function zn(_,L){return _?`Unknown option for rule ${_}: ${L}`:`Unknown option for rule: ${L}`}function jp(_,L){let U=_.positionals[0],J=_.positionals[1],Y=_.positionals[2];if(!J){_.errors.push(`rule ${U} requires add, remove, or list`);return}if(!Hp.has(J)){_.errors.push(`Unknown rule ${U} action: ${J}`);return}if(J==="list"){if(Y)_.errors.push(`Unexpected rule ${U} argument: ${Y}`);return}if(!Y){_.errors.push(`rule ${U} ${J} requires ${L}`);return}if(U!=="tool"&&_.positionals.length>3)_.errors.push(`Unexpected rule ${U} argument: ${_.positionals[3]}`)}function Fw(_){if(r(_)===null){Vu(_);return}let L=d(_);if(!L.config)return;bn(_,L.config)}async function Mw(_,L){let U=L.positionals[1],J=L.positionals[2],Y=hn(_,{global:L.global}).configTarget;if(U==="list"){let me=d(Y);if(me.errors.length>0){for(let ke of me.errors)console.error(ke);return 1}return Uw(me.config?.transparent_wrappers??[]),0}if(!J||!E.test(J))return console.error("transparent wrapper must match command pattern"),1;if(Fe(J))return console.error(`reserved command "${J}" cannot be a wrapper`),1;let re=d(Y);if(re.errors.length>0){for(let me of re.errors)console.error(me);return 1}let ie=re.config??ce,pe=U==="add"?[...new Set([...ie.transparent_wrappers??[],J])]:(ie.transparent_wrappers??[]).filter((me)=>me!==J);return bn(Y,{...ie,transparent_wrappers:pe}),console.log(U==="add"?`Added transparent wrapper: ${J}`:`Removed transparent wrapper: ${J}`),0}function Uw(_){if(_.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${_.length}):`);for(let L of _)console.log(`  - ${L}`)}function Gw(_,L,U){let J=L.positionals[1],Y=[...new Set(L.positionals.slice(2))];if(J==="list")return Bw(_,U);let re=[...Y.flatMap((ke)=>{if(!Ue.test(ke))return[`"${ke}" is not a tool name: ${ve}.`];let Ce=J==="add"?Lo(ke):void 0;return Ce?[Ce]:[]}),...L.cwdArg!==void 0&&!Ue.test(L.cwdArg)?[`"${L.cwdArg}" is not an argument name: ${ve}.`]:[]];if(re.length>0){for(let ke of re)console.error(en.red(`Error: ${ke}`));return 1}let ie=hn(_,{global:!L.project}),pe=Cr(ie.configTarget);if(!pe.ok){for(let ke of pe.result.errors)console.error(ke);return 1}let me=Y.reduce((ke,Ce)=>{let Re=L.cwdArg===void 0?Ce:{name:Ce,cwd:L.cwdArg},Ne=(_e)=>(typeof _e==="string"?_e:_e.name)===Ce;if(J==="remove")return ke.filter((_e)=>!Ne(_e));return ke.some(Ne)?ke.map((_e)=>Ne(_e)?Re:_e):[...ke,Re]},pe.config.command_tools??[]);bn(ie.configTarget,{...pe.config,command_tools:me});for(let ke of Y)console.log(J==="add"?`Added command tool: ${ke}${L.cwdArg===void 0?"":` (cwd argument: ${L.cwdArg})`}`:`Removed command tool: ${ke}`);return console.log(`Scope: ${L.project?"project":"user"} (${ie.configPath})`),0}function Bw(_,L){let U=(O(_,{cwd:L})?["user"]:["user","project"]).map((Y)=>{let re=hn(_,{global:Y==="user"});return{scope:Y,path:re.configPath,...d(re.configTarget)}}),J=U.flatMap((Y)=>Y.errors.map((re)=>`${Y.path}: ${re}`));if(J.length>0){for(let Y of J)console.error(Y);return 1}return Bu(U.flatMap((Y)=>(Y.config?.command_tools??[]).map((re)=>({scope:Y.scope,tool:re})))),0}import{sep as zw}from"node:path";import{existsSync as qw,readFileSync as Vw}from"node:fs";import{join as Kw}from"node:path";async function Jw(_){if(_.isTTY)return null;return(await it(_).catch(()=>null))?.trim()||null}function Ww(_){let L=_.env.get("CLAUDE_SETTINGS_PATH");if(L)return L;return Kw(qr(_),"settings.json")}function Ls(_){let L=Ww(_);if(!qw(L))return!1;try{let U=Vw(L,"utf-8"),J=JSON.parse(U);if(!J.enabledPlugins)return!1;let Y="cc-safety-net@cc-marketplace";if(!(Y in J.enabledPlugins))return!1;return J.enabledPlugins[Y]===!0}catch(U){if(S(n.debug,_.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${L}: ${U instanceof Error?U.message:String(U)}`);return!1}}async function js(_,L=process.stdin){let U=Ls(_),J;if(!U)J="\uD83D\uDEE1️ CC Safety Net ❌";else{let re=R(_,{cwd:process.cwd()}),ie=re.policy,pe=P(ie,_.env),me=Object.values(V(ie,pe.capabilities)).some((Re)=>Re.changesInherited),ke={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[me?"custom":pe.effectiveLevel],Ce=re.policyScopes&&!re.policyScopes.weakeningsIgnored&&re.policyScopes.weakenings.length>0?"\uD83D\uDD3B":"";J=`\uD83D\uDEE1️ CC Safety Net ${ke}${pe.worktreeMode?"\uD83C\uDF33":""}${Ce}${re.state==="degraded"?"⚠️":""}`}let Y=await Jw(L);if(Y&&!Y.startsWith("{"))console.log(`${Y} | ${J}`);else console.log(J)}function Up(_){let L=R(_,{cwd:process.cwd()}),U=L.policy,J=P(U,_.env),Y=!!process.env.NO_COLOR||!process.stdout.isTTY,re=Math.min(process.stdout.columns||80,100),ie=Y?"ok":"✔",pe=Y?"OFF":"✘",me=(We,Me)=>{let Ye=`  ${We.padEnd(13)}${Me}`;return(Ye.length>re?`${Ye.slice(0,re-1)}…`:Ye).replaceAll(pe,en.red(pe))},ke=Object.values(V(U,J.capabilities)).some((We)=>We.changesInherited),Ce=(We)=>We===_.home||We.startsWith(`${_.home}${zw}`)?`~${We.slice(_.home.length)}`:We,Re={ready:en.green,degraded:en.yellow}[L.state],Ne=L.policyScopes?.weakenings??[],_e=[...Ls(_)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...L.diagnostics],Te=Y?"-":"·";console.log([`${Y?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Re(L.state)}`,"",me("Protection",`destructive ${U.destructiveCommandProtectionEnabled?ie:pe}   secrets ${U.secretProtection.enabled?ie:pe}`),me("Level",ke?`${J.effectiveLevel} (customised)`:J.effectiveLevel),me("Rules",U.rules.length===0?"none active":`${U.rules.length} active`),me("Policy",Ce(u(_))),...L.policyScopes?[me("Project",Ce(h(process.cwd())))]:[],...J.worktreeMode?[me("Worktree","relaxations active")]:[],"",...Ne.length===0?[]:[L.policyScopes?.weakeningsIgnored?"  Project policy (ignored)":"  Project policy",...Ne.flatMap((We)=>pr(We,"      ",re-6).map((Me,Ye)=>Ye===0?`    ${Me}`:Me)),""],..._e.length===0?["  Everything configured is active."]:["  Not active",..._e.flatMap((We)=>pr(We,"      ",re-6).map((Me,Ye)=>Ye===0?`    ${Te} ${Me}`:Me)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as Xp}from"node:child_process";import{randomBytes as ik}from"node:crypto";import{existsSync as sk}from"node:fs";import{createServer as ak}from"node:http";import{Writable as lk}from"node:stream";var Ho=500;function Yw(_){let L=_.filter((Y)=>Y.decision!=="allow"),U=_.filter((Y)=>Y.decision==="allow"),J=Math.min(L.length,Math.max(Ho-U.length,Math.ceil(Ho/2)));return[...L.slice(0,J),...U.slice(0,Ho-J)]}function Gp(_,L,U=j(_)){if(U)K(_,U);let J=(Me)=>new Date(Me.getFullYear(),Me.getMonth(),Me.getDate()).getTime(),Y=J(new Date),re=new Date(Y);re.setDate(re.getDate()-(L-1));let ie=re.getTime(),pe=[],me={count:0};for(let Me of U?Yn(U,me):[])for(let Ye of $t(Me,me)){let tn=new Date(Ye.ts).getTime();if(!Number.isFinite(tn))continue;if(tn>=ie)pe.push(Ye)}pe.sort((Me,Ye)=>new Date(Ye.ts).getTime()-new Date(Me.ts).getTime());let ke=Array.from({length:L},()=>0),Ce=Array.from({length:L},()=>0),Re={},Ne={},_e={},Te=0,We=0;for(let Me of pe){let Ye=Me.agent||"unknown";Re[Ye]=(Re[Ye]??0)+1;let tn=Math.round((Y-J(new Date(Me.ts)))/86400000),on=L-1-tn,an=tn>=0&&tn<L;if(an)Ce[on]=(Ce[on]??0)+1;if(Me.decision!=="allow"){if(Te++,Me.ruleId)Ne[Me.ruleId]=(Ne[Me.ruleId]??0)+1;let nn=Uo(Me.segment||Me.command);if(nn)_e[nn]=(_e[nn]??0)+1;if(Me.failureStage)We++;if(an)ke[on]=(ke[on]??0)+1}}return{days:L,logsDir:U,homeDir:_.home,totalInWindow:pe.length,truncated:pe.length>Ho,unreadable:me.count,counts:{blocked:Te,allowed:pe.length-Te,agents:Re,blockedByDay:ke,analyzedByDay:Ce,rules:Ne,commands:_e,errors:We},entries:Yw(pe).sort((Me,Ye)=>new Date(Ye.ts).getTime()-new Date(Me.ts).getTime())}}import{spawn as Zw}from"node:child_process";import{existsSync as Xw,statSync as Bp}from"node:fs";import{delimiter as Qw,join as ek}from"node:path";var nk=120000,Fo="Choose the project folder",tk=`try
  return POSIX path of (choose folder with prompt "${Fo}")
on error number -128
  return ""
end try`,rk=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Fo}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,qp=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Fo}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Fo]}],Vp=(_,L)=>(L.PATH??"").split(Qw).some((U)=>{if(U.length===0)return!1;try{let J=Bp(ek(U,_));return J.isFile()&&(J.mode&73)!==0}catch{return!1}});function Hs(_,L){if(_==="darwin"||_==="win32")return!0;if(_!=="linux")return!1;if(!L.DISPLAY&&!L.WAYLAND_DISPLAY)return!1;return qp.some((U)=>Vp(U.binary,L))}function ok(_,L){if(_==="darwin")return{cmd:"osascript",args:["-e",tk]};if(_==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",rk]};let U=qp.find((J)=>Vp(J.binary,L));return U?{cmd:U.binary,args:U.args}:null}function Fs(_=process.platform,L=process.env){let U=ok(_,L);if(!U)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((J)=>{let Y=Zw(U.cmd,U.args,{env:L,stdio:["ignore","pipe","pipe"]}),re="",ie=!1,pe=(ke)=>{if(ie)return;ie=!0,clearTimeout(me),J(ke)},me=setTimeout(()=>{Y.kill(),pe({error:"The folder dialog timed out"})},nk);Y.stdout.on("data",(ke)=>{re+=ke.toString()}),Y.on("error",()=>pe({error:`Could not open the folder dialog (${U.cmd})`})),Y.on("close",()=>{let ke=re.trim().replace(/\/+$/,"");if(!ke)return pe({cancelled:!0});if(!Xw(ke)||!Bp(ke).isDirectory())return pe({error:"That selection is not a folder on disk"});pe({path:ke})})})}var Kp=`<!doctype html>
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
`;var Jp='<script id="ccsn-data" type="application/json">';function Wp(_,L=Kp){return L.replace(Jp,()=>Jp+JSON.stringify({token:_}).replaceAll("<","\\u003c"))}var Us="kenryu42/cc-safety-net",ck=`https://github.com/${Us}`,Qp=1e4,dk=7,uk="The project draft directory changed; reload the draft before applying.",pk="audit settings are user scope only; remove the audit section from a project proposal";async function ef(_,L={}){let U=mn({label:"gui",booleans:{noOpen:["--no-open"]}},_),J=L.log??console.log,Y=L.error??console.error;if(U.errors.length>0){for(let ie of U.errors)Y(ie);return Y("Usage: cc-safety-net gui [--no-open]"),1}let re=await fk(c,L);if(J(`CC Safety Net policy GUI: ${re.url}`),!U.flags.noOpen)try{await(L.openBrowser??Sk)(re.url)}catch(ie){Y(`Failed to open browser: ${ie instanceof Error?ie.message:String(ie)}`),Y(`Open this URL manually: ${re.url}`)}if(L.keepAlive===!1)return await re.close(),0;return await xk(re),0}async function fk(_,L={}){let U=ik(24).toString("base64url"),J={dir:null,revision:0},Y=ak((pe,me)=>{mk(_,pe,me,U,L,J)});await new Promise((pe,me)=>{Y.once("error",me),Y.listen(0,"127.0.0.1",()=>{Y.off("error",me),pe()})});let ie=`http://127.0.0.1:${Y.address().port}`;return{origin:ie,token:U,url:`${ie}/?token=${encodeURIComponent(U)}`,close:()=>Ck(Y)}}async function mk(_,L,U,J,Y,re){let ie=_(),pe=new URL(L.url??"/","http://127.0.0.1");if(L.method==="GET"&&pe.pathname==="/favicon.ico"){U.writeHead(204,{"cache-control":"no-store"}),U.end();return}if(!bk(L,pe,J)){rn(U,403,{error:"Forbidden"});return}if(L.method==="GET"&&pe.pathname==="/"){await Promise.resolve(Y.buildDocument?.()).then((me)=>kk(U,Wp(J,me)),(me)=>rn(U,500,{error:me instanceof Error?me.message:String(me)}));return}if(L.method==="GET"&&pe.pathname==="/api/policy"){let me=Au(ie,Y),ke=R(ie,Ms(Y));rn(U,200,{...me,configState:ze(ke),...ke.policyScopes?{projectPolicy:{path:h(Y.cwd??process.cwd()),weakenings:ke.policyScopes.weakeningsIgnored?[]:ke.policyScopes.weakenings}}:{},destructiveCommandRules:z,secretPatterns:ut,version:pn(),preview:me.errors.length>0?null:He(me.policy,ie.env)});return}if(L.method==="POST"&&pe.pathname==="/api/policy/preview"){let me=await Pr(L);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=Ou(ie,me.value);rn(U,ke.errors.length>0?400:200,ke);return}if(L.method==="POST"&&pe.pathname==="/api/policy/explain"){let me=await Pr(L);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=me.value;if(ke===null||typeof ke.command!=="string"){rn(U,400,{errors:["command must be a string"]});return}let Ce=wr(ke.policy,ie.home);if(Ce.length>0){rn(U,400,{errors:Ce});return}rn(U,200,hk(ie,ke.command,ke.policy,Y));return}if(L.method==="POST"&&pe.pathname==="/api/policy"){let me=await Pr(L);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=Fn(ie,me.value,Y);rn(U,ke.errors.length>0?400:200,ke);return}if(L.method==="POST"&&pe.pathname==="/api/reset"){rn(U,200,Fn(ie,te,Y));return}if(L.method==="POST"&&pe.pathname==="/api/repair"){rn(U,200,$u(ie,Y));return}if(L.method==="POST"&&pe.pathname==="/api/policy/project/choose-directory"){let me=await(Y.chooseDirectory??Fs)();if("path"in me)re.dir=me.path,re.revision+=1;rn(U,200,{cancelled:"cancelled"in me,..."error"in me?{error:me.error}:{}});return}if(L.method==="GET"&&pe.pathname==="/api/policy/project"){let me=nf(re,Y),ke=tf(ie,me,Y),Ce=ke?{projection:{},diagnostics:[ke]}:zp(me,ie.home),Re=kr(ie,Y);rn(U,200,{path:h(me),revision:re.revision,baseline:Re.baseline,userPolicyDiagnostics:Re.diagnostics,projection:Ce.projection,projectionDiagnostics:Ce.diagnostics,canPickDirectory:Hs(process.platform,process.env)});return}if(L.method==="POST"&&pe.pathname==="/api/policy/project/diff"){let me=await Yp(ie,L,U,re,Y);if(!me)return;let ke=zp(me.dir,ie.home),Ce=kr(ie,Y).baseline,Re=ee(Ce,de(me.proposal,ie.home).policy);rn(U,200,{rows:Po(ee(Ce,ke.projection).policy,Re.policy,!1),weakenings:Re.weakenings,existingFileDiagnostics:ke.diagnostics});return}if(L.method==="POST"&&pe.pathname==="/api/policy/project/apply"){let me=await Yp(ie,L,U,re,Y);if(!me)return;let ke=yk(me.dir,me.proposal,ie.home);rn(U,ke.errors.length>0?500:200,ke);return}if(L.method==="GET"&&pe.pathname==="/api/activity"){let me=oe(ie,Y),ke=vk(pe.searchParams.get("days"),me);if(ke===null){rn(U,400,{error:`days must be an integer between 1 and ${me}`});return}rn(U,200,Gp(ie,ke,Y.activityLogsDir));return}if(L.method==="POST"&&pe.pathname==="/api/rules/choose-directory"){rn(U,200,await Fs());return}if(L.method==="GET"&&pe.pathname==="/api/rules"){let me=Q(ie,Ms(Y)),ke=new Map(me.rules.map((Ce)=>[Ce.name,Ce]));rn(U,200,{projectPath:Y.cwd??process.cwd(),canPickDirectory:Hs(process.platform,process.env),rulebooks:me.rulebooks.map((Ce)=>({source:Ce.source,spec:Ce.spec,name:Ce.name,version:Ce.version,rules:Ce.rules.flatMap((Re)=>{let Ne=ke.get(Re);if(!Ne)return[];return[{name:Ne.name,command:Ne.command,subcommand:Ne.subcommand,block_args:Ne.block_args,reason:Ne.reason}]})})),errors:me.errors,warnings:me.warnings});return}if(L.method==="GET"&&pe.pathname==="/api/star/context"){rn(U,200,await(Y.fetchStarContext??(()=>Ik(ie,{logsDir:Y.activityLogsDir})))());return}if(L.method==="POST"&&pe.pathname==="/api/star"){let me=await(Y.starRepo??Pk)();rn(U,200,me.ok?{ok:!0}:{ok:!1,fallbackUrl:ck});return}if(L.method==="GET"&&pe.pathname==="/api/integrations"){rn(U,200,await(Y.fetchIntegrations??(()=>Ek(ie)))());return}if(L.method==="GET"&&pe.pathname==="/api/health"){rn(U,200,await(Y.fetchHealth??_k)());return}if(L.method==="POST"&&(pe.pathname==="/api/install"||pe.pathname==="/api/uninstall")){let me=await Pr(L);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=me.value?.target;if(typeof ke!=="string"||!On.some((Re)=>Re.target===ke)){rn(U,400,{error:"unknown target"});return}let Ce=pe.pathname==="/api/install"?"install":"uninstall";rn(U,200,await(Y.runIntegration??Tk)(Ce,ke));return}rn(U,404,{error:"Not found"})}function Ms(_){return{..._,cwd:_.cwd??process.cwd()}}function nf(_,L){return _.dir??L.cwd??process.cwd()}function tf(_,L,U){if(!O(_,{...U,cwd:L}))return null;return`${h(L)} is the user policy, not a project policy; choose a project directory, or run the GUI from one`}function zp(_,L){let U=h(_),J=sk(U)?Ot(U):{value:void 0,errors:[]},Y=de(J.value,L);return{projection:Y.policy,diagnostics:[...J.errors,...Y.diagnostics]}}async function Yp(_,L,U,J,Y){let re=nf(J,Y),ie=J.revision,pe=await Pr(L);if(!pe.ok)return rn(U,pe.status,{errors:[pe.error]}),null;let me=pe.value;if(typeof me?.revision!=="number")return rn(U,400,{errors:["revision must be a number"]}),null;if(me.revision!==ie)return rn(U,409,{errors:[uk]}),null;let ke=tf(_,re,Y);if(ke)return rn(U,400,{errors:[ke]}),null;let Ce=gk(me.proposal,_.home);if(Ce.length>0)return rn(U,400,{errors:Ce}),null;return{dir:re,proposal:me.proposal}}function gk(_,L){let U=wr(_,L);if(U.length>0)return U;return _?.audit===void 0?[]:[pk]}function yk(_,L,U){let J=h(_),Y=Eo(L,k(L,U));try{return g(i(w(_,"project policy"),J),`${JSON.stringify(Y,null,2)}
`),{path:J,errors:[]}}catch(re){return{path:J,errors:[re instanceof Error?re.message:String(re)]}}}function hk(_,L,U,J){let Y=k(U,_.home),re=R(_,Ms(J)),ie=De({rules:re.policy.rules,transparentWrappers:re.policy.transparentWrappers,commandTools:re.policy.commandTools,safety:Be(Y.safety),worktreeMode:Y.workflow.worktree_mode,destructiveCommandProtectionEnabled:Y.destructive_command_protection.enabled,destructiveCommandRuleOverrides:Y.destructive_command_protection.overrides,destructiveCommandAllowPaths:Y.destructive_command_protection.allow_paths,secretProtection:{enabled:Y.secret_protection.enabled,disabledRules:ft(Y.secret_protection.overrides),denyPaths:Y.secret_protection.deny_paths,allowPaths:Y.secret_protection.allow_paths}});return fr(L,{policySnapshot:ie,cwd:J.cwd,userConfigDir:J.userConfigDir},_)}function vk(_,L){if(_===null)return Math.min(dk,L);let U=Number(_);if(!Number.isInteger(U)||U<1||U>L)return null;return U}function bk(_,L,U){if(L.searchParams.get("token")!==U)return!1;if(_.method!=="POST")return!0;return _.headers["x-cc-safety-net-token"]===U}var wk=1048576;async function Pr(_){let L=[],U=0;for await(let J of _){let Y=J;if(U+=Y.byteLength,U>wk)return{ok:!1,status:413,error:"Request body is too large"};L.push(Y)}try{return{ok:!0,value:JSON.parse(Buffer.concat(L).toString("utf-8")||"{}")}}catch(J){return{ok:!1,status:400,error:`Invalid JSON: ${J instanceof Error?J.message:String(J)}`}}}function kk(_,L){_.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),_.end(L)}function rn(_,L,U){_.writeHead(L,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),_.end(JSON.stringify(U))}function Ck(_){return new Promise((L,U)=>{_.close((J)=>J?U(J):L())})}function xk(_){return new Promise((L)=>{let U=()=>{process.off("SIGINT",J),process.off("SIGTERM",J)},J=()=>{U(),_.close().then(L)};process.once("SIGINT",J),process.once("SIGTERM",J)})}function Sk(_){let L=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",U=process.platform==="win32"?["/c","start","",_]:[_];return new Promise((J,Y)=>{let re=Xp(L,U,{detached:!0,stdio:"ignore"}),ie=(me)=>{re.off("spawn",pe),Y(me)},pe=()=>{re.off("error",ie),re.unref(),J()};re.once("error",ie),re.once("spawn",pe)})}async function Pk(_="gh",L=Qp){return{ok:await Ak(_,["api","-X","PUT",`/user/starred/${Us}`],L)===0}}async function Ek(_,L={}){let U=await Dr((Y)=>Kt({environment:_,cwd:process.cwd(),openCodeVersion:Y}).status!=="n/a",L.fetcher),J=Rk(_,U);return{targets:En.map((Y)=>{let re=J.find((ie)=>ie.platform===Y.id);return{target:Y.id,label:cn(Y.id),version:U.versions[Y.id]??null,status:re?.configured?"active":re?.detected?"disabled":re?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:U.version,nodeVersion:U.nodeVersion,platform:U.platform}}}function Rk(_,L){return Jt(_,process.cwd(),{ampPluginListOutput:L.ampPluginListOutput,codexPluginListOutput:L.codexPluginListOutput,copilotCliVersion:L.versions["copilot-cli"],openCodeVersion:L.versions.opencode,openCodePluginListOutput:L.openCodePluginListOutput})}async function _k(_={}){let L=await(_.checkUpdates??Gn)();return{update:{latestVersion:L.latestVersion??null,updateAvailable:L.updateAvailable}}}var Zp=Promise.resolve();function Tk(_,L,U={}){let J=async()=>{let re=[],{log:ie,error:pe}=console;console.log=(...me)=>re.push(me.map(String).join(" ")),console.error=console.log;try{return{ok:await br(_,[],{selectTargets:async()=>[L],output:new lk({write(ke,Ce,Re){re.push(String(ke).replace(/\n$/,"")),Re()}}),...U})===0,output:re.join(`
`)}}finally{console.log=ie,console.error=pe}},Y=Zp.then(J);return Zp=Y.then(()=>{return},()=>{return}),Y}async function Ik(_,L={}){let[U,J]=await Promise.all([Ok(L.fetchRepo),Promise.resolve(Ir(_,oe(_),L.logsDir).totalBlocked)]);return{starCount:U,blockedTotal:J}}function Ak(_,L,U){return new Promise((J)=>{let Y=Xp(_,L,{stdio:"ignore",windowsHide:!0}),re=!1,ie=setTimeout(()=>{Y.kill(),pe(null)},U),pe=(me)=>{if(re)return;re=!0,clearTimeout(ie),J(me)};Y.once("error",()=>pe(null)),Y.once("close",pe)})}async function Ok(_=fetch){try{let L=await _(`https://api.github.com/repos/${Us}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(Qp)});if(!L.ok)return null;let U=await L.json();return typeof U.stargazers_count==="number"?U.stargazers_count:null}catch{return null}}function $k(_){if(_[0]!=="help")return!1;let L=_[1];if(!L)us(),process.exit(0);if(mr(L))process.exit(0);console.error(`Unknown command: ${L}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var Dk={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),mr("hook",console.error),process.exit(1)},install:async(_)=>{process.exit(await br("install",_))},update:async(_)=>{process.exit(await Es(_))},uninstall:async(_)=>{process.exit(await br("uninstall",_))},rule:async(_)=>{process.exit(await Fp(c(),_))},policy:async(_)=>{process.exit(await ju(c(),_))},status:async(_)=>{if($n(mn({label:"status"},_).errors))process.exit(1);Up(c())},statusline:async(_)=>{let L=mn({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},_);if(L.errors.length===0&&L.flags.claudeCode){await js(c());return}if($n(L.errors),!L.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");mr("statusline",console.error),process.exit(1)},doctor:async(_)=>{let L=os(_);if(!L)process.exit(1);let U=await Yc(c(),{json:L.json,skipUpdateCheck:L.skipUpdateCheck});process.exit(U)},logs:async(_)=>{process.exit(await zs(c(),_))},gui:async(_)=>{process.exit(await ef(_))},explain:async(_)=>{process.exit(await ld(c(),_))}};async function Nk(_){let L=mn({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},_);if($k(_))return;let U=_[0],J=U?Tr(U):void 0;if(L.help&&J&&J.name!=="rule")mr(J.name),process.exit(0);if(!U||L.help&&!J)us(),process.exit(0);if(L.flags.version)ud(),process.exit(0);if(J){await Dk[J.name](_.slice(1));return}if(U==="--statusline"){await js(c());return}console.error(U.startsWith("-")?`Unknown option: ${U}`:`Unknown command: ${U}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{Nk as runCli};
