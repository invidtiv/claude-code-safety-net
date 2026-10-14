import{a,s,Le,tt,T,yt,nt,c,n,rt,P,S,fe,xt,m,Pe,x,it,l,o,w,i,se,r,g,ge,W,St,wt,p,he,ye,Ct,L,X,ae,C,Et,I,h,Ie,B,u,A,Q,st,at,M,E,O,be,xe,Fe,ce,d,e,$e,Ae,je,ve,ct,lt,le,Oe,ue,Ue,ee,z,Ge,Se,V,ut,q,te,F,de,dt,pt,k,j,He,ft,Be,R,ze,De,Ve,y,t,ne,we,b,v,D,kt,qe,Ke,f,K}from"./chunks/index-eaf4p5es.js";import{Xe}from"./chunks/index-gq2pjhwy.js";import{Je,Ee}from"./chunks/index-8nsmbjyq.js";import{Qe}from"./chunks/index-rprdb083.js";import"./chunks/index-me6wtv7d.js";import{oe,J,et,G,H}from"./chunks/index-c3d8e2as.js";var lf=["-h","--help"];function mn(_,N){let U=Object.entries(_.booleans??{}),Y=Object.entries(_.values??{}),Z=Object.entries(_.lists??{}),re=Object.fromEntries(U.map(([Ne])=>[Ne,!1])),ie={},pe=Object.fromEntries(Z.map(([Ne])=>[Ne,[]])),me=[],ke=[],Ce=!1,Re=-1;for(let[Ne,_e]of N.entries()){if(Ne<=Re)continue;if(_e==="--"){me.push(...N.slice(Ne+1));break}if(lf.includes(_e)){Ce=!0;continue}let Te=U.find(([,Ye])=>Ye.includes(_e));if(Te){re[Te[0]]=!0;continue}let We=Y.find(([,Ye])=>Ye.includes(_e));if(We){let Ye=N[Ne+1];if(Ye===void 0||Ye.startsWith("-")){ke.push(`${_e} requires a value`);continue}ie[We[0]]=Ye,Re=Ne+1;continue}let Me=Z.find(([,Ye])=>Ye.includes(_e));if(Me){let Ye=N.slice(Ne+1),tn=Ye.findIndex((an)=>an.startsWith("-")),on=Ye.slice(0,tn===-1?Ye.length:tn);if(on.length===0){ke.push(`${_e} requires at least one value`);continue}pe[Me[0]]=[...pe[Me[0]]??[],...on],Re=Ne+on.length;continue}if(_e.startsWith("-")){ke.push(`Unknown option for ${_.label}: ${_e}`);continue}if(_.positionals==="tail"){me.push(...N.slice(Ne));break}me.push(_e)}if(_.positionals!=="list"&&_.positionals!=="tail")ke.push(...me.map((Ne)=>`Unexpected argument for ${_.label}: ${Ne}`));return{flags:re,values:ie,lists:pe,positionals:me,help:Ce,errors:ke}}function $n(_){for(let N of _)console.error(N);return _.length>0}import{readdirSync as gf,statSync as Ws,unlinkSync as yf}from"node:fs";import{basename as zs,dirname as hf,isAbsolute as vf,join as bf,relative as wf,resolve as kf,sep as Cf}from"node:path";var Vs=(_)=>{let N=Date.now()-new Date(_).getTime();if(!Number.isFinite(N))return"";let U=Math.floor(N/60000),Y=Math.floor(U/60),Z=Math.floor(Y/24);if(Z>0)return`${Z}d ago`;if(Y>0)return`${Y}h ago`;if(U>0)return`${U}m ago`;return"just now"},Go=(_)=>{let N=(_??"").trim().split(/\s+/).filter((Z)=>Z&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(Z)),U=N[0]?.split("/").pop();if(!U)return null;let Y=N[1];return Y&&/^[a-z][a-z0-9-]*$/.test(Y)?`${U} ${Y}`:U};function Ks(_){let N=(Z)=>`${Z.sessionId}
${Go(Z.segment||Z.command)}`,U=_.filter((Z)=>Z.decision!=="allow"),Y=U.filter((Z)=>Z.sessionId).reduce((Z,re)=>Z.set(N(re),(Z.get(N(re))??0)+1),new Map);return new Set(U.filter((Z)=>Z.failureStage||(Y.get(N(Z))??0)>=2))}import{existsSync as cf,readdirSync as df,readFileSync as uf}from"node:fs";import{join as pf}from"node:path";function Yn(_,N){try{return df(_,{withFileTypes:!0,encoding:"utf8"}).flatMap((U)=>{let Y=pf(_,U.name);if(U.isDirectory())return Yn(Y,N);if(U.name.endsWith(".jsonl"))return[Y];return[]})}catch{if(N&&cf(_))N.count++;return[]}}var ff=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function mf(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let N=_;if(typeof N.ts!=="string"||typeof N.command!=="string")return!1;return ff.every((U)=>N[U]===void 0||typeof N[U]==="string")}function $t(_,N){try{return uf(_,"utf-8").split(`
`).filter(Boolean).flatMap((U)=>{try{let Y=JSON.parse(U);if(!mf(Y)){if(N)N.count++;return[]}return[Y]}catch{if(N)N.count++;return[]}})}catch{if(N)N.count++;return[]}}function gn(_){return Array.from(_,(N)=>{let U=N.charCodeAt(0);if(U<=31||U>=127&&U<=159)return`\\x${U.toString(16).padStart(2,"0")}`;return N}).join("")}function xf(_,N){let U=oe(_),Y=mn({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},N);if($n(Y.errors))return null;if(Y.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(Y.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let Z=Y.values.limit===void 0?20:Js(Y.values.limit);if(Z===null)return console.error("--limit must be a positive number"),null;let re=Y.values.since===void 0?Math.min(30,U):Js(Y.values.since);if(re===null||re>U)return console.error(`--since must be a positive number of days no greater than ${U}`),null;let ie={limit:Z,limitExplicit:Y.values.limit!==void 0,since:re,sinceExplicit:Y.values.since!==void 0,all:Y.flags.all,json:Y.flags.json,suspect:Y.flags.suspect,pruneLegacy:Y.flags.pruneLegacy,dryRun:Y.flags.dryRun,id:Y.values.id,agent:Y.values.agent,rule:Y.values.rule,session:Y.values.session,project:Y.values.project===void 0?void 0:kf(Y.values.project)};if(ie.id&&(ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.sinceExplicit||ie.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(ie.pruneLegacy&&(ie.id!==void 0||ie.agent!==void 0||ie.rule!==void 0||ie.session!==void 0||ie.project!==void 0||ie.suspect||ie.all||ie.sinceExplicit||ie.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(ie.dryRun&&!ie.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return ie}async function Ys(_,N,U={}){let Y=xf(_,N);if(!Y)return 1;let Z=U.logsDir??G(_);if(Y.pruneLegacy)return Sf(Z,Y.json,Y.dryRun);if(!Z)return console.log(Y.json?"[]":Y.id?`No retained audit log entry found for id ${gn(Y.id)}.`:"No audit log entries found."),0;J(_,Z);let re={count:0},ie=Yn(Z,re).flatMap((Re)=>$t(Re,re).map((Ne)=>({entry:Ne,file:Re})));if(re.count>0)console.error(`warning: ${re.count} audit log ${re.count===1?"source":"sources"} could not be read; these results are incomplete`);if(Y.id)return _f(ie,Y,U.timeZone);let pe=Date.now()-Y.since*24*60*60*1000,me=ie.filter((Re)=>Tf(Re,Y,Z,pe)),ke=Y.suspect?Ks(me.map((Re)=>Re.entry)):null,Ce=(ke?me.filter((Re)=>ke.has(Re.entry)):me).sort((Re,Ne)=>Date.parse(Ne.entry.ts)-Date.parse(Re.entry.ts)).slice(0,Y.limit);if(Y.json)return console.log(JSON.stringify(Ce.map((Re)=>Re.entry),null,2)),0;if(Ce.length===0)return console.log("No audit log entries found."),0;for(let Re of Ce)console.log(Of(Re.entry,U.timeZone));return 0}function Sf(_,N,U){let Y=_?Ef(_).map((pe)=>bf(_,pe)):[];if(U)return Pf(Y,N);let Z=[],re=0,ie=0;for(let pe of Y){let me=Ws(pe,{throwIfNoEntry:!1})?.size??0,ke=Rf(pe);if(ke){Z.push(`${zs(pe)}: ${ke}`);continue}re++,ie+=me}if(N)return console.log(JSON.stringify({removedFiles:re,removedBytes:ie,failedFiles:Z.length})),Z.length===0?0:1;console.log(re===0&&Z.length===0?"No legacy audit log files found.":`Removed ${re} legacy audit log ${re===1?"file":"files"} (${Zs(ie)}).`);for(let pe of Z)console.error(`Could not remove ${gn(pe)}`);if(console.log("Nested v2 audit logs were not changed."),re>0)console.log("This deletion cannot be undone.");return Z.length===0?0:1}function Pf(_,N){let U=_.reduce((Y,Z)=>Y+(Ws(Z,{throwIfNoEntry:!1})?.size??0),0);if(N)return console.log(JSON.stringify({dryRun:!0,files:_.length,bytes:U})),0;if(console.log(_.length===0?"No legacy audit log files found.":`Would remove ${_.length} legacy audit log ${_.length===1?"file":"files"} (${Zs(U)}).`),console.log("Nested v2 audit logs are not included."),_.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function Ef(_){try{return gf(_,{withFileTypes:!0}).filter((N)=>N.isFile()&&N.name.endsWith(".jsonl")).map((N)=>N.name)}catch{return[]}}function Rf(_){try{return yf(_),null}catch(N){return N instanceof Error?N.message:String(N)}}function Zs(_){let N=["B","KiB","MiB","GiB"],U=Math.min(Math.floor(Math.log2(Math.max(_,1))/10),N.length-1);return`${Math.round(_/1024**U*10)/10} ${N[U]}`}function _f(_,N,U){let Y=_.filter((re)=>re.entry.id===N.id);if(Y.length>1)return console.error(`Multiple audit log entries found for id ${gn(N.id??"")}.`),1;if(N.json)return console.log(JSON.stringify(Y.map((re)=>re.entry),null,2)),0;let Z=Y[0];if(!Z)return console.log(`No retained audit log entry found for id ${gn(N.id??"")}.`),0;return console.log($f(Z.entry,U)),0}function Tf(_,N,U,Y){if(!N.all&&_.entry.decision==="allow")return!1;if(Date.parse(_.entry.ts)<Y)return!1;if(N.agent!==void 0&&_.entry.agent!==N.agent)return!1;if(N.rule!==void 0&&_.entry.ruleId!==N.rule)return!1;if(N.session!==void 0&&!If(_,U,N.session))return!1;if(N.project!==void 0&&!Af(_.entry.cwd,N.project))return!1;return!0}function If(_,N,U){if(_.entry.sessionId===U)return!0;return hf(_.file)===N&&zs(_.file,".jsonl")===U}function Af(_,N){if(!_)return!1;let U=wf(N,_);return U!==".."&&!U.startsWith(`..${Cf}`)&&!vf(U)}function Of(_,N){let U=gn(_.id??"-"),Y=gn(_.decision??"deny"),Z=_.cwd?`  [${gn(_.cwd)}]`:"",re=_.segment||_.command,ie=re===_.command?"":"↳ ",pe=re.length>50?`${re.slice(0,50)}…`:re;return`${U.padEnd(16)}  ${gn(Xs(_.ts,N))}  ${Y.padEnd(5)}  ${gn(_.agent??"-").padEnd(15)}  ${gn(_.ruleId??"-").padEnd(20)}  ${ie}${gn(pe)}${Z}`}function $f(_,N){let U=(Z)=>gn(Z===void 0||Z===null||Z===""?"-":Z),Y=_.shape?`${_.agent??"-"} (shape: ${_.shape})`:_.agent??"-";return[`id:        ${U(_.id)}`,`ts:        ${U(Xs(_.ts,N))}`,`decision:  ${U(_.decision)}`,`agent:     ${U(Y)}`,`level:     ${U(_.level)}`,`tool:      ${U(_.toolName)}`,`rule:      ${U(_.ruleId)}`,`intent:    ${U(_.intent)}`,`stage:     ${U(_.failureStage)}`,`error:     ${U(_.errorCode)}`,`session:   ${U(_.sessionId)}`,`cwd:       ${U(_.cwd)}`,`version:   ${U(_.v)}`,`truncated: ${U(_.truncated===!0?"yes":void 0)}`,`reason:    ${U(_.reason)}`,`command:   ${U(_.command)}`,`segment:   ${U(_.segment)}`].join(`
`)}function Xs(_,N){let U=new Date(_);if(Number.isNaN(U.getTime()))return _;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:N}).format(U)}function Js(_){let N=Number(_);return Number.isFinite(N)&&N>0?N:null}var Qs={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var ea={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var na={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var Bo=["npx","--offline","--no-install","@deepseek-ai/dsh","--version"],ta=["cursor-agent","--version"],ra=[{id:"antigravity-cli",displayName:"Antigravity CLI",runtime:{flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",runtime:{displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",runtime:{flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",runtime:{flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",runtime:{flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",runtime:{flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",runtime:{flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",runtime:{flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",install:{flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",install:{flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",install:{flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",runtime:{flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"deepseek-harness",displayName:"DeepSeek Harness",install:{flag:"--deepseek-harness",artifactKind:"package",probeCommand:Bo}},{id:"devin",displayName:"Devin CLI",runtime:{flags:["-dv","--devin"],description:"Run as Devin CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--devin",artifactKind:"hook config",probeCommand:["devin","--version"]}},{id:"droid",displayName:"Factory Droid",runtime:{flags:["-fd","--droid"],description:"Run as Factory Droid PreToolUse hook",legacyTopLevelFlags:[]},install:{flag:"--droid",artifactKind:"hook config",probeCommand:["droid","--version"]}},{id:"amp",displayName:"Amp Code",install:{flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],qo=ra.slice().sort((_,N)=>_.displayName.localeCompare(N.displayName,"en")),Rr=qo.map((_)=>_.id).sort((_,N)=>Number(N==="claude-code")-Number(_==="claude-code")),Xt=qo.filter((_)=>("runtime"in _)).map((_)=>({id:_.id,displayName:"displayName"in _.runtime?_.runtime.displayName:_.displayName,flags:_.runtime.flags,legacyFlags:"legacyFlags"in _.runtime?_.runtime.legacyFlags:[],description:_.runtime.description,legacyTopLevelFlags:_.runtime.legacyTopLevelFlags})),En=qo.map((_)=>({id:_.id,..._.install})),Df=Object.fromEntries(ra.map((_)=>[_.id,_.displayName]));function cn(_){return Df[_]}var Nf=Xt.map((_)=>({flags:_.flags.join(", "),description:_.description})),Lf=Xt.flatMap((_)=>_.flags.map((N)=>`cc-safety-net hook ${N}`)),oa={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...Nf,{flags:"-h, --help",description:"Show this help"}],examples:Lf};var ia={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...En.map((_)=>({flags:_.flag,description:`Install ${cn(_.id)} ${_.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...En.map((_)=>`cc-safety-net install ${_.flag}`)]},sa={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...En.map((_)=>({flags:_.flag,description:`Uninstall ${cn(_.id)} ${_.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...En.map((_)=>`cc-safety-net uninstall ${_.flag}`)]},aa={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var la={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var _r={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Vo=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],Ko=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],Dt={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"tool add <name...> [--cwd-arg <name>] [--project]",description:"Analyze community shell tools (user scope by default)"},{usage:"tool remove <name...> [--project]",description:"Stop analyzing declared tools"},{usage:"tool list",description:"List declared command tools in both scopes"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},{flags:"--project",description:"Use project-scope rule config with rule tool"},{flags:"--cwd-arg",argument:"<name>",description:"Name the working-directory argument with rule tool add"},...Vo.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk","cc-safety-net rule tool add ops_bash","cc-safety-net rule tool add ops_run_background --cwd-arg cwd --project",...Ko,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var ca={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var da={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var Tr=[ca,Qs,la,ea,Dt,_r,ia,aa,sa,oa,na,da];function jf(_){return _.aliases??[]}function Ir(_){let N=_.toLowerCase();return Tr.find((U)=>U.name.toLowerCase()===N||jf(U).some((Y)=>Y.toLowerCase()===N))}import{existsSync as Ih}from"node:fs";import{basename as Hf}from"node:path";function Ar(_,N=7,U=G(_)){let Y=Date.now()-N*24*60*60*1000,Z=[],re=new Set,ie=0,pe,me,ke,Ce;if(U)J(_,U);let Re={count:0},Ne=U?Yn(U,Re):[];for(let Te of Ne)for(let We of $t(Te,Re)){if(We.decision==="allow")continue;let Me=new Date(We.ts).getTime();if(Me>=Y){if(ie++,re.add(We.sessionId??Hf(Te,".jsonl")),me===void 0||Me<=me)pe=We.ts,me=Me;if(Ce===void 0||Me>Ce)ke=We.ts,Ce=Me;Ff(Z,We,Me)}}let _e=Z.map((Te)=>({timestamp:Te.ts,command:Te.command,reason:Te.reason,relativeTime:Vs(new Date(Te.ts))}));return{totalBlocked:ie,sessionCount:re.size,recentEntries:_e,oldestEntry:pe,newestEntry:ke,unreadable:Re.count}}function Ff(_,N,U){let Y=_.findIndex((Z)=>U>new Date(Z.ts).getTime());if(Y===-1){if(_.length<3)_.push(N);return}if(_.splice(Y,0,N),_.length>3)_.pop()}import{dirname as Zf}from"node:path";import{dirname as Mf,join as Uf,resolve as Gf}from"node:path";var Bf="config.json";function bn(_,N,U,Y){g(qf(_),`${JSON.stringify(N,null,2)}
`,U,Y)}function qf(_){return typeof _==="string"?se(_):_}function Wo(_){return{errors:le(Kf(_),": "," "),ruleNames:new Set(Ue(_).map((N)=>N.toLowerCase()))}}var Vf="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",ua="must match pattern (letters, numbers, hyphens, underscores)";function Kf(_){if(!pa(_))return[e([],"Config must be an object")];return[..._.version===1?[]:[e(["version"],"must be 1")],...Jf(_.rules)]}function Jf(_){if(_===void 0)return[];if(!Array.isArray(_))return[e(["rules"],"must be an array")];return[..._.flatMap((N,U)=>pa(N)?Wf(N,["rules",U]):[e(["rules",U],"must be an object")]),...$e(_)]}function Wf(_,N){return[...Jo(_.name,[...N,"name"],"required string",p,Vf),...Jo(_.command,[...N,"command"],"required string",E,ua),..._.subcommand===void 0?[]:Jo(_.subcommand,[...N,"subcommand"],"must be a string if provided",E,ua),...zf(_.block_args,[...N,"block_args"]),...Yf(_.reason,[...N,"reason"]),..._.intent===void 0||Oe(_.intent)?[]:[e([...N,"intent"],Ae)]]}function Jo(_,N,U,Y,Z){if(typeof _!=="string")return[e(N,U)];return Y.test(_)?[]:[e(N,Z)]}function zf(_,N){if(!Array.isArray(_))return[e(N,"required array")];if(_.length===0)return[e(N,"must have at least one element")];return _.flatMap((U,Y)=>{if(typeof U!=="string")return[e([...N,Y],"must be a string")];return U===""?[e([...N,Y],"must not be empty")]:[]})}function Yf(_,N){if(typeof _!=="string")return[e(N,"required string")];if(_==="")return[e(N,"must not be empty")];return _.length>O?[e(N,`must be at most ${O} characters`)]:[]}function pa(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function zo(_){let N=fa(_);if(!N.ok)return N.result;return Wo(N.parsed)}function fa(_){let N=[],U=new Set;try{let Y=typeof _==="string"?se(_):_,Z=r(Y);if(Z===null)return N.push(`File not found: ${Y.path}`),{ok:!1,result:{errors:N,ruleNames:U}};if(!Z.trim())return N.push("Config file is empty"),{ok:!1,result:{errors:N,ruleNames:U}};return{ok:!0,parsed:JSON.parse(Z)}}catch(Y){if(Y instanceof o)return N.push(Y.message),{ok:!1,result:{errors:N,ruleNames:U}};let Z=Y instanceof Error?Y.message:String(Y);return N.push(Y instanceof SyntaxError?"Invalid JSON":Z),{ok:!1,result:{errors:N,ruleNames:U}}}}function Nt(_){return Gf(_,".safety-net.json")}function Un(_){let N=fa(_);if(!N.ok)return N.result;let U=ct(N.parsed);return{errors:U.errors,ruleNames:U.sources}}function Lt(_,N={}){return Uf(Mf(Ie(_,N)),Bf)}function ma(_,N,U){let Y;try{if(r(N)===null)return{path:_,exists:!1,valid:!1,ruleCount:0};Y=Un(N),Y.errors.push(...z(_,U))}catch(Z){if(!(Z instanceof o))throw Z;Y={errors:[Z.message],ruleNames:new Set}}return{path:_,exists:!0,valid:Y.errors.length===0,ruleCount:Y.ruleNames.size,...Y.errors.length>0?{errors:Y.errors}:{}}}function Xf(_,N){return{source:N,name:_.name,command:_.command,subcommand:_.subcommand,blockArgs:[..._.block_args],reason:_.reason}}function ga(_,N){let U=B(_),Y=I(N),Z=Zf(U),re=ee(_,{cwd:N,userConfigPath:U,projectConfigPath:Y,userConfigDir:Z}),ie=Q(_,{cwd:N,userConfigPath:U,projectConfigPath:Y,userConfigDir:Z}),pe=new Map(re.rulebooks.flatMap((me)=>me.rules.map((ke)=>[ke,me.source])));return{userConfig:ma(U,ie.userConfigTarget,ie.userScope),projectConfig:ma(Y,ie.projectConfigTarget,ie.projectScope),effectiveRules:re.rules.map((me)=>Xf(me,pe.get(me.name)??"project"))}}var Qf=[{flag:n.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:n.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:n.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:n.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:n.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:n.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:n.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:n.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"},{flag:n.projectTightenOnly,description:"Ignore project policy settings that weaken the user policy",defaultBehavior:"off"}];function ya(_){return[...Qf.map((N)=>({name:N.flag.name,value:fe(N.flag,_.env),isSet:xt(N.flag,_.env),legacyName:N.flag.legacyName,legacyValue:N.flag.legacyName?_.env.get(N.flag.legacyName):void 0,legacyIsSet:N.flag.legacyName?_.env.get(N.flag.legacyName)!==void 0:void 0,description:N.description,defaultBehavior:N.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:_.env.get("CC_SAFETY_NET_HOME"),isSet:_.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var ha={error:0,warning:1,info:2},em=["policy","config","audit"];function nm(_){return _.map((N)=>{if(N==="ownership")return"is not owned by the current user";if(N==="permissions")return"has unsafe permissions";if(N==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var tm=[{derive:(_)=>_.hooks.length>0&&_.hooks.every((N)=>!N.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(_)=>_.hooks.filter((N)=>N.inspectionStatus==="failed").map((N)=>{let U=cn(N.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${U} inspection failed`,detail:`Doctor could not verify the ${U} integration configuration.`,fixHint:`Correct the reported ${U} configuration error, then run \`cc-safety-net doctor\` again.`,integration:N.platform}})},{derive:(_)=>_.userConfig.exists&&!_.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.userConfig.path}]:[]},{derive:(_)=>_.projectConfig.exists&&!_.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:_.projectConfig.path}]:[]},{derive:(_)=>_.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${_.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(_)=>_.v2Leftovers&&_.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${_.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(_)=>_.legacyConfigs&&_.legacyConfigs.length>0?[{checkId:"config.legacy-ignored",severity:"warning",title:"Legacy inline rule configs are ignored",detail:`CC Safety Net no longer loads these files, so their rules enforce nothing: ${_.legacyConfigs.join(", ")}.`,fixHint:"Run `cc-safety-net rule migrate` to convert them (add `--cleanup` to delete each file once it is converted), then rerun doctor."}]:[]},{derive:(_)=>{let N=_.environment.find((U)=>U.name==="CC_SAFETY_NET_AUDIT_SCOPE");return rt(N?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...em.map((_)=>({derive:(N)=>N.posture.directories.filter((U)=>U.kind===_&&U.status==="unsafe").map((U)=>({checkId:`posture.${_}-directory-unsafe`,severity:"error",title:`${_[0]?.toUpperCase()}${_.slice(1)} directory is unsafe`,detail:`The ${_} directory ${nm(U.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...U.path?{path:U.path}:{}}))})),{derive:(_)=>{let N=[..._.effectiveSafety.weakenedRuleOverrides].sort();return N.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${N.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${N.join(", ")}.`}]:[]}}];function va(_){return tm.flatMap((N,U)=>N.derive(_).map((Y,Z)=>({finding:Y,catalogOrder:U,occurrence:Z}))).sort((N,U)=>ha[N.finding.severity]-ha[U.finding.severity]||N.catalogOrder-U.catalogOrder||N.occurrence-U.occurrence).map((N)=>N.finding)}function Dn(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var rm=(_)=>Dn()?`\x1B[32m${_}\x1B[0m`:_,om=(_)=>Dn()?`\x1B[33m${_}\x1B[0m`:_,im=(_)=>Dn()?`\x1B[34m${_}\x1B[0m`:_,sm=(_)=>Dn()?`\x1B[36m${_}\x1B[0m`:_,am=(_)=>Dn()?`\x1B[31m${_}\x1B[0m`:_,lm=(_)=>Dn()?`\x1B[2m${_}\x1B[0m`:_,cm=(_)=>Dn()?`\x1B[1m${_}\x1B[0m`:_,en={green:rm,yellow:om,blue:im,cyan:sm,red:am,dim:lm,bold:cm},dm="\x1B[0m",um=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function pm(_){let N=_;return()=>(N=(N*1664525+1013904223)%4294967296,N/4294967296)}function fm(_){let N=[...um],U=pm(_);for(let Y=N.length-1;Y>0;Y--){let Z=Math.floor(U()*(Y+1)),re=N[Y];N[Y]=N[Z],N[Z]=re}return N}function mm(_,N=0){if(!Dn())return"";let U=fm(N);return`\x1B[38;5;${U[_%U.length]}m`}function ba(_,N,U=0){if(!Dn())return`"${_}"`;return`${mm(N,U)}"${_}"${dm}`}function Or(_){return _==="default"?"built-in default":`${_} policy`}var gm=new RegExp("\x1B\\[[0-9;]*m","g"),Yo=(_)=>_.replace(gm,"").length;function Zn(_){let N=(_.headers??_.rows[0]??[]).map((ie,pe)=>{let me=Math.max(..._.rows.map((ke)=>Yo(ke[pe]??"")));return Math.max(Yo(ie),me)}),U=(ie,pe)=>ie+" ".repeat(Math.max(0,pe-Yo(ie))),Y=(ie,pe)=>pe[0]+N.map((me)=>ie.repeat(me+2)).join(pe[1])+pe[2],Z=(ie)=>`│ ${ie.map((pe,me)=>U(pe,N[me]??0)).join(" │ ")} │`,re=_.headers?[`   ${Z(_.headers)}`,`   ${Y("─",["├","┼","┤"])}`]:[];return[`   ${Y("─",["┌","┬","┐"])}`,...re,..._.rows.map((ie)=>`   ${Z(ie)}`),`   ${Y("─",["└","┴","┘"])}`].join(`
`)}function wa(_){let N=[];N.push("Hook Integration"),N.push(ym(_));let U=[],Y=[];for(let Z of _){let re=cn(Z.platform);if(Z.errors&&Z.errors.length>0)for(let ie of Z.errors)if(Z.configured)U.push({platform:re,message:ie});else Y.push({platform:re,message:ie})}for(let Z of U)N.push(`   Warning (${Z.platform}): ${Z.message}`);for(let Z of Y)N.push(en.red(`   Error (${Z.platform}): ${Z.message}`));return N.join(`
`)}function ym(_){let N=["Platform","Discovery","Configuration","Inspection"],U=_.map((Y)=>{let Z=cn(Y.platform);if(Y.inspectionStatus==="not-inspected"){let me=en.dim("Not inspected");return[Z,me,me,me]}let re=Y.detected?en.green("Detected"):Y.inspectionStatus==="failed"?en.red("Unknown"):en.dim("Not detected"),ie=Y.configured?en.green("Configured"):Y.detected?en.yellow("Not configured"):Y.inspectionStatus==="failed"?en.red("Unknown"):en.dim("Not applicable"),pe=Y.inspectionStatus==="verified"?en.green("Verified"):Y.inspectionStatus==="failed"?en.red("Failed"):en.dim("Not applicable");return[Z,re,ie,pe]});return Zn({headers:N,rows:U})}function ka(_){let U=["Guard Engine Verification",`   Synthetic self-test: ${_.failed>0?en.red(`${_.passed}/${_.total} FAIL`):en.green(`${_.passed}/${_.total} passed`)}`],Y=_.results.filter((Z)=>!Z.passed);if(Y.length>0){U.push(""),U.push(en.red("   Failures:"));for(let Z of Y)U.push(en.red(`   • ${Z.description}`)),U.push(en.red(`     expected ${Z.expected}, got ${Z.actual}`))}return U.join(`
`)}function hm(_){if(_.length===0)return"   (no custom rules)";let N=["Source","Name","Command","Block Args"],U=_.map((Y)=>[Y.source,Y.name,Y.subcommand?`${Y.command} ${Y.subcommand}`:Y.command,Y.blockArgs.join(", ")]);return Zn({headers:N,rows:U})}function Ca(_){let N=[];if(N.push("Configuration"),N.push(vm(_.userConfig,_.projectConfig)),N.push(""),_.effectiveRules.length>0)N.push(`   Effective rules (${_.effectiveRules.length} total):`),N.push(hm(_.effectiveRules));else N.push("   Effective rules: (none - using built-in rules only)");return N.join(`
`)}function vm(_,N){let U=["Scope","Status"],Y=(re)=>{if(!re.exists)return en.dim("N/A");if(!re.valid)return en.red(`Invalid (${re.errors?.[0]??"unknown error"})`);return en.green("Configured")},Z=[["User",Y(_)],["Project",Y(N)]];return Zn({headers:U,rows:Z})}function xa(_){let N=[];return N.push("Environment"),N.push(bm(_)),N.join(`
`)}function Sa(_){let N=_.effectiveSafety.policyScopes,U=["Effective Safety",`   Selected preset: ${_.effectiveSafety.selectedPreset}${N?` (${Or(N.levelScope)})`:""}`,`   Effective: ${_.effectiveSafety.level}`],Y=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[Z,re]of Y){let ie=_.effectiveSafety.capabilities[Z],pe=ie.enabled?en.green("ON"):en.dim("OFF"),me=ie.sources.length>0?` (${ie.sources.join(", ")})`:"";U.push(`   ${re}: ${pe} via ${ie.source}${me}`)}if(N&&N.weakenings.length>0){U.push(`   Project policy deltas${N.weakeningsIgnored?" (ignored)":""}:`);for(let Z of N.weakenings)U.push(`      ${Z}`)}U.push(`   Stored rule customizations: ${_.effectiveSafety.ruleCounts.stored}`),U.push(`   Effective rule customizations: ${_.effectiveSafety.ruleCounts.effective}`);for(let[Z,re]of Object.entries(_.effectiveSafety.ruleOverrides))U.push(`   ${Z}: ${re}`);return U.join(`
`)}function Pa(_){let N=["Findings"];if(_.length===0)return N.push("   No findings from inspected doctor facts."),N.join(`
`);for(let U of _){let Y=`[${U.severity.toUpperCase()}] ${U.checkId}: ${gn(U.title)}`,Z=U.severity==="error"?en.red:U.severity==="warning"?en.yellow:en.blue;if(N.push(`   ${Z(Y)}`),N.push(`      ${gn(U.detail)}`),U.path)N.push(`      Path: ${gn(U.path)}`);if(U.fixHint)N.push(`      Fix: ${gn(U.fixHint)}`)}return N.join(`
`)}function bm(_){let N=["Variable","Status","Legacy"],U=_.map((Y)=>{let Z=Y.isSet?en.green("✓"):en.dim("✗"),re=Y.legacyName&&Y.legacyIsSet?`${Y.legacyName} ${en.green("✓")}`:Y.legacyName??"";return[Y.name,Z,re]});return Zn({headers:N,rows:U})}function Ea(_){let N=[];if(_.totalBlocked===0)N.push("Recent Activity"),N.push("   No blocked commands in the last 7 days"),N.push("   Tip: This is normal for new installations");else N.push(`Recent Activity · last 7 days (${_.totalBlocked} blocked / ${_.sessionCount} sessions)`),N.push(wm(_.recentEntries));if(_.unreadable>0)N.push(`   Warning: ${_.unreadable} audit log ${_.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return N.join(`
`)}function wm(_){let N=["Time","Command"],U=_.map((Y)=>{let Z=gn(Y.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),re=Z.length>40?`${Z.slice(0,37)}...`:Z;return[Y.relativeTime,re]});return Zn({headers:N,rows:U})}function Ra(_){let N=[];if(N.push("Update Check"),_.latestVersion===null&&!_.error)return N.push($r([["Status",en.dim("Skipped")],["Installed",_.currentVersion]])),N.join(`
`);if(_.error)return N.push($r([["Status",`${en.yellow("⚠")} Error`],["Installed",_.currentVersion],["Error",en.dim(_.error)]])),N.join(`
`);if(_.updateAvailable)return N.push($r([["Status",`${en.yellow("⚠")} Update Available`],["Current",_.currentVersion],["Latest",en.green(_.latestVersion??"")]])),N.push(""),N.push("   Run: bunx cc-safety-net@latest doctor"),N.push("   Or:  npx cc-safety-net@latest doctor"),N.join(`
`);return N.push($r([["Status",`${en.green("✓")} Up to date`],["Version",_.currentVersion]])),N.join(`
`)}function $r(_){return Zn({rows:_})}function _a(_){let N=[];return N.push("System Info"),N.push(km(_)),N.join(`
`)}function km(_){let N=["Component","Version"],U=(re)=>{if(re===null)return en.dim("not found");return re},Z=[{label:"cc-safety-net",value:_.version},...Rr.map((re)=>({label:cn(re),value:_.versions[re]??null})),{label:"Node.js",value:_.nodeVersion},{label:"npm",value:_.npmVersion},{label:"Bun",value:_.bunVersion},{label:"Platform",value:_.platform}].map((re)=>[re.label,U(re.value)]);return Zn({headers:N,rows:Z})}function Ta(_){if(_.findings.length===0)return en.green(`
No findings from inspected doctor facts.`);let N={error:_.findings.filter((re)=>re.severity==="error").length,warning:_.findings.filter((re)=>re.severity==="warning").length,info:_.findings.filter((re)=>re.severity==="info").length},U=["error","warning","info"].filter((re)=>N[re]>0).map((re)=>`${N[re]} ${re}`),Y=_.findings.length===1?"finding":"findings",Z=`
${_.findings.length} ${Y}: ${U.join(", ")}.`;if(N.error>0)return en.red(Z);if(N.warning>0)return en.yellow(Z);return en.blue(Z)}import{lstatSync as Cm}from"node:fs";import{dirname as Zo}from"node:path";function Xo(_,N){try{let U=Cm(N);if(U.isSymbolicLink())return{kind:_,path:N,status:"unsafe",issues:["symlink"]};if(!U.isDirectory())return{kind:_,path:N,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:_,path:N,status:"unknown",issues:[]};let Y=[...U.uid!==process.getuid()?["ownership"]:[],...(U.mode&18)!==0?["permissions"]:[]];return{kind:_,path:N,status:Y.length>0?"unsafe":"safe",issues:Y}}catch(U){if(typeof U==="object"&&U!==null&&"code"in U&&U.code==="ENOENT")return{kind:_,path:N,status:"not-applicable",issues:[]};return{kind:_,path:N,status:"unknown",issues:[]}}}function Ia(_,N){let U=G(_);return{directories:[Xo("policy",Zo(Zo(N))),Xo("config",Zo(N)),...U?[Xo("audit",U)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as xm}from"node:child_process";import{existsSync as Aa}from"node:fs";import{delimiter as Sm,extname as Pm,join as Em}from"node:path";import{stripVTControlCharacters as Oa}from"node:util";var Da="2.6.11",Rm=5000,_m="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function pn(){return Da}function Qo(_,N){let U=_[N];if(U)return U;let Y=Object.keys(_).find((Z)=>Z.toLowerCase()===N.toLowerCase()&&!!_[Z]);return Y?_[Y]:U}function Tm(_){return(Qo(_,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((N)=>N.length>0)}function Im(_,N){let U=Pm(_)?[_]:[...Tm(N).map((Y)=>`${_}${Y}`),_];if(_.includes("/")||_.includes("\\"))return U.find((Y)=>Aa(Y))??_;return(Qo(N,"PATH")??"").split(Sm).flatMap((Y)=>U.map((Z)=>Em(Y,Z))).find((Y)=>Aa(Y))??_}function $a(_){if(!/[\s"&|<>^]/.test(_))return _;return`"${_.replace(/"/g,'""')}"`}function Xn(_,N){let[U,...Y]=_,Z=N[_m]==="win32"?"win32":process.platform;if(!U||Z!=="win32")return{cmd:U??"",args:Y};let re=Im(U,N);if(!/\.(?:bat|cmd)$/i.test(re))return{cmd:re,args:Y};return{cmd:Qo(N,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",$a(re),...Y.map($a)].join(" ")]}}var jt=async(_,N=Rm)=>{let U=await Am(_,{timeoutMs:N});if(U.code!==0)return null;return Oa(U.stdout).trim()||Oa(U.stderr).trim()||null};function Am(_,N){let[U,...Y]=_;if(!U)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((Z)=>{try{let re=Xn([U,...Y],process.env),ie=xm(re.cmd,re.args,{stdio:["ignore","pipe","pipe"]}),pe=!1,me="",ke="";ie.stdout.on("data",(Ne)=>{me+=Ne.toString()}),ie.stderr.on("data",(Ne)=>{ke+=Ne.toString()});let Ce=(Ne)=>{if(pe)return;pe=!0,clearTimeout(Re),Z(Ne)},Re=setTimeout(()=>{ie.kill(),Ce({code:null,stdout:me,stderr:ke})},N.timeoutMs);ie.on("close",(Ne)=>{Ce({code:Ne,stdout:me,stderr:ke})}),ie.on("error",()=>{Ce({code:null,stdout:me,stderr:ke})})}catch{Z({code:null,stdout:"",stderr:""})}})}function Dr(_){if(!_)return null;let N=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(_);if(N)return N[1]??null;let U=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(_);if(U)return U[1]??null;return _.split(`
`)[0]?.trim()||null}async function Nr(_,N=jt,U=process.cwd()){let Y=Promise.all(En.map(async(Re)=>[Re.id,Dr(await N([...Re.probeCommand]))])),[Z,re,ie,pe,me,ke,Ce]=await Promise.all([Y,Y.then(async(Re)=>{let Ne=Re.find(([We])=>We==="opencode")?.[1];if(!Ne?.startsWith("2.")||!_(Ne))return null;let _e=["--param",`location[directory]=${U}`],Te=["opencode","api","integration.list",..._e];return await N(Te,30000),N(["opencode","api","plugin.list",..._e],30000)}),N(["codex","plugin","list"],30000),N(["amp","plugins","list"],30000),N(["node","--version"]),N(["npm","--version"]),N(["bun","--version"])]);return{version:Da,versions:Object.fromEntries(Z),codexPluginListOutput:ie,ampPluginListOutput:pe,openCodePluginListOutput:re,nodeVersion:Dr(me),npmVersion:Dr(ke),bunVersion:Dr(Ce),platform:`${process.platform} ${process.arch}`}}function ei(_,N){if(N==="dev")return!1;let U=_.split(".").map(Number),Y=N.split(".").map(Number),[Z=0,re=0,ie=0]=U,[pe=0,me=0,ke=0]=Y;if(Z!==pe)return Z>pe;if(re!==me)return re>me;return ie>ke}async function Gn(){let _=pn(),N=new AbortController,U=setTimeout(()=>N.abort(),3000);try{let Y=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:N.signal});if(!Y.ok)return{currentVersion:_,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${Y.status}`};let Z=await Y.json(),re=ei(Z.version,_);return{currentVersion:_,latestVersion:Z.version,updateAvailable:re}}catch(Y){return{currentVersion:_,latestVersion:null,updateAvailable:!1,error:Y instanceof Error?Y.message:"Network error"}}finally{clearTimeout(U)}}import*as Ga from"node:readline";var Ha=(_)=>`\x1B[${_}B`,Om=(_)=>`\x1B[${_}A`;var Na=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function $m(_){return new Promise((N)=>setTimeout(N,_))}function Dm(_,N,U){if(!U)return N(_);if(U.aborted)return Promise.resolve();return new Promise((Y,Z)=>{let re=()=>U.removeEventListener("abort",ie),ie=()=>{re(),Y()};U.addEventListener("abort",ie,{once:!0}),N(_).then(()=>{re(),Y()},(pe)=>{re(),Z(pe)})})}function Lr(_){return Math.max(0,Math.min(1,_))}function Ht(_){return Math.max(0,Math.min(255,Math.round(_)))}function ni(_){return _<=0.0031308?12.92*_:1.055*_**0.4166666666666667-0.055}function Nm(_,N,U){let Y=U*Math.PI/180,Z=N*Math.cos(Y),re=N*Math.sin(Y),ie=(_+0.3963377774*Z+0.2158037573*re)**3,pe=(_-0.1055613458*Z-0.0638541728*re)**3,me=(_-0.0894841775*Z-1.291485548*re)**3;return{blue:Ht(ni(Lr(-0.0041960863*ie-0.7034186147*pe+1.707614701*me))*255),green:Ht(ni(Lr(-1.2684380046*ie+2.6097574011*pe-0.3413193965*me))*255),red:Ht(ni(Lr(4.0767416621*ie-3.3077115913*pe+0.2309699292*me))*255)}}function ti(_,N){let U=(N*_*180/Math.PI%360+360)%360;return Nm(0.72,0.15,U)}function Fa(_,N=0.1){let U=ti(N,_);return`\x1B[38;2;${U.red};${U.green};${U.blue}m`}function Lm(_,N){return{blue:Ht(_.blue+(255-_.blue)*N),green:Ht(_.green+(255-_.green)*N),red:Ht(_.red+(255-_.red)*N)}}function Ma(_,N,U){let Y=Math.imul(_+2654435769,2246822507)^Math.imul(N+3266489909,668265263)^Math.imul(U+374761393,2654435761),Z=Y^Y>>>15,re=Math.imul(Z,739982445),ie=re^re>>>12,pe=Math.imul(ie,695872825);return((pe^pe>>>15)>>>0)/4294967296}function jm(_,N,U){let Y=Math.floor(Ma(_,N,U)*Na.length);return Na[Y]??"░"}function La(_){let N=Lr(_);return N*N*N*(N*(N*6-15)+10)}function Hm(_){if(_.length===0)return"";let N=[],U=!1,Y="";for(let Z of _){let re=`${Z.red};${Z.green};${Z.blue}`;if(Z.bold!==U)N.push(Z.bold?"\x1B[1m":"\x1B[22m"),U=Z.bold;if(re!==Y)N.push(`\x1B[38;2;${re}m`),Y=re;N.push(Z.character)}return`${N.join("")}\x1B[22m\x1B[39m`}function Fm(_,N,U,Y,Z){return _.map((re,ie)=>({...ti(U,Y+N+ie/Z),bold:!1,character:re}))}function Mm(_,N,U,Y,Z,re,ie,pe){let me=Math.max(1,Y*0.75),ke=Math.min(1,U/me),Ce=Z*La(ke),Re=Math.max(0,(U-me)/Math.max(1,Y-me)),Ne=(1-La(U/Y))*pe*2,_e=0.35*Math.max(0,1-Re*2),Te=ke>=1,We=Math.min(_.length,Math.ceil(Ce+2+1));return _.slice(0,We).map((Me,Ye)=>{let tn=ti(re,ie+N+Ye/pe+Ne),on=Ye+Ma(N,Ye,7919)*2-1;if(on>Ce+2)return{...tn,bold:!1,character:" "};let an=Ce-on,nn=0.8*Math.exp(-(an*an)/12.5),sn=Math.min(0.9,nn+_e),Sn=!Te&&on>Ce-4;return{...Lm(tn,sn),bold:sn>0.3,character:Sn?jm(N,Ye,U):Me}})}function ja(_){return`\x1B[?2026h${_.map((N,U)=>`\x1B8${U>0?Ha(U):""}${Hm(N)}`).join("")}\x1B[?2026l`}async function ri(_,N={}){if(!_)return;let U=N.output??process.stdout,Y=N.sleep??$m,Z=N.seed??0,re=_.split(`
`).map((Ce)=>Array.from(Ce)),ie=Math.max(...re.map((Ce)=>Ce.length)),pe=12000*re.filter((Ce)=>Ce.length>0).length/40,me=ie>0?Math.max(1,Math.ceil(pe/16.666666666666668)):0,ke=me>0?pe/me:0;U.write(`\x1B[?25l${re.length>1?`${`
`.repeat(re.length-1)}${Om(re.length-1)}`:""}\x1B7`);try{for(let Ce=1;Ce<=me;Ce+=1){if(N.signal?.aborted)break;U.write(ja(re.map((Re,Ne)=>Mm(Re,Ne,Ce,me,ie,0.1,Z,3)))),await Dm(ke,Y,N.signal)}}finally{if(U.write(ja(re.map((Ce,Re)=>Fm(Ce,Re,0.1,Z,3)))),U.write("\x1B8"),re.length>1)U.write(Ha(re.length-1));U.write(`
\x1B[0m\x1B[?25h`)}}var Ua=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function Um(_){return Boolean(_.isTTY)}async function Qt(_={}){let N=_.output??process.stdout;if(!Um(N))return;let U=_.input??process.stdin,Y={output:N,seed:_.seed??Math.random()*8192,sleep:_.sleep};if(!U.isTTY||typeof U.setRawMode!=="function"){await ri(Ua,Y);return}let Z=new AbortController,re=U.readableFlowing===!0,ie=U.isRaw===!0,pe=!1,me=(ke,Ce)=>{if(Ce.ctrl&&Ce.name==="c")pe=!0;if(pe||Ce.name==="return"||Ce.name==="enter")Z.abort()};Ga.emitKeypressEvents(U),U.on("keypress",me),U.setRawMode(!0),U.resume();try{await ri(Ua,{...Y,signal:Z.signal})}finally{if(U.off("keypress",me),U.setRawMode(ie),!re)U.pause()}if(!pe)return;if(_.onInterrupt){_.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as Vm}from"node:crypto";import{existsSync as qa}from"node:fs";import{dirname as jr,join as Va}from"node:path";import{dirname as Ba,join as Gm}from"node:path";var Bm="rule.lock";function qm(_){return Gm(Ba(_),Bm)}function hn(_,N){let U=N.global?N.userConfigPath??B(_,N):N.projectConfigPath??I(N.cwd??process.cwd()),Y=N.global?st(_,N):at(U,N.cwd??process.cwd()),Z=qm(U);return{configDir:Ba(U),configPath:U,lockPath:Z,filesystemScope:Y,configTarget:i(Y,U),lockTarget:i(Y,Z)}}var Km="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Jm="cache",Wm="rulebooks";function Ka(_,N={}){let U=hn(_,N),Y=i(U.filesystemScope,Wa(U.configDir)),Z=r(U.lockTarget);if(console.log(Km),Z===null&&!qa(Y.path))return console.log(`No v2 lock or cache leftovers found in ${jr(U.configDir)}; nothing to migrate.`),0;let re=Qm(Z),ie=d(U.configTarget);if(!ie.config&&(r(U.configTarget)!==null||re.size>0))return console.error(`Cannot migrate: the rules config in ${jr(U.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let pe=ie.config?.rules??[];for(let me of pe.flatMap((ke)=>zm(ke,re,U,Y,N.global===!0)))console.log(me);return W(U.lockTarget),St(Y),console.log(`Removed the v2 lock and cache under ${jr(U.configDir)}.`),0}function Ja(_,N){return[...new Set([{cwd:N},{cwd:N,global:!0}].flatMap((U)=>{let Y=hn(_,U);return[Y.lockPath,Wa(Y.configDir)]}))].filter((U)=>qa(U))}function zm(_,N,U,Y,Z){if(!C(_))return[];let re=L(_).name,ie=i(U.filesystemScope,M(U.configDir,re)),pe=r(ie);if(pe!==null&&Ym(pe,re))return[];let me=N.get(_),ke=me?Zm(me,re,Y.path,U.filesystemScope):null;if(ke===null)return[`Could not migrate ${_} from the v2 cache. Run \`cc-safety-net rule update ${_}${Z?" --global":""}\` to vendor it.`];if(g(ie,ke),pe!==null)return[`Restored ${_} from the v2 cache over an invalid file.`];return[`Vendored ${_} from the v2 cache.`]}function Ym(_,N){let U=Se(_);return!("problem"in U)&&U.rulebook.name===N}function Zm(_,N,U,Y){let Z=Va(U,Wm,`${Xm(_)}--${_.digest.replace("sha256:","").slice(0,12)}`,he),re=r(i(Y,Z));if(re===null||tg(re)!==_.digest)return null;let ie=Se(re);if("problem"in ie||ie.rulebook.name!==N)return null;return re}function Wa(_){return Va(jr(_),Jm)}function Xm(_){return([_.owner,_.repo,_.display_ref,_.name].every((Y)=>typeof Y==="string"&&Y!=="")?`${_.owner}/${_.repo}#${_.display_ref}/${_.name}`:_.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Qm(_){let N=_===null?null:ng(_),U=za(N)&&Array.isArray(N.rulebooks)?N.rulebooks:[];return new Map(U.filter(eg).map((Y)=>[Y.spec,Y]))}function eg(_){return za(_)&&typeof _.spec==="string"&&typeof _.digest==="string"}function za(_){return!!_&&typeof _==="object"}function ng(_){try{return JSON.parse(_)}catch{return null}}function tg(_){return`sha256:${Vm("sha256").update(_).digest("hex")}`}var Ya="\r\x1B[2K",rg="\x1B[?25l",og="\x1B[39m",ig="\x1B[?25h",sg=100,ag=0.55,lg=80,Za=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function cg(_){return new Promise((N)=>setTimeout(N,_))}async function Hr(_,N={}){let U=N.output??process.stdout;if(!U.isTTY)return _;let Y=N.sleep??cg,Z=!1,re=_.then((pe)=>(Z=!0,pe),(pe)=>{throw Z=!0,pe});if(await Promise.race([re.then(()=>!0),Y(sg).then(()=>!1)]))return re;U.write(rg);try{for(let pe=0;!Z;pe+=1)U.write(`${Ya}${Fa(pe*ag)}${Za[pe%Za.length]}${og} ${N.loadingMessage??"Loading…"}`),await Promise.race([re,Y(lg)]);return await re}finally{U.write(`${Ya}${ig}`)}}async function er(_,N,U,Y={}){let Z=N();if(_)await U();if(_&&Z.ready)await Hr(Z.ready,Y);return Z.finish()}import{stripVTControlCharacters as dg}from"node:util";var Fr="amp plugins list",ug=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function Xa(_){if(!_.ampPluginListOutput)return{platform:"amp",status:"n/a"};let N=dg(_.ampPluginListOutput).split(`
`).map((U)=>ug.exec(U)?.[1]).find((U)=>U!==void 0);if(!N)return{platform:"amp",status:"n/a"};if(N!=="active")return{platform:"amp",status:"disabled",method:Fr,configPath:Fr,errors:[`Amp personal plugin cc-safety-net is ${N}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:Fr,configPath:Fr}}import{existsSync as vg,readFileSync as bg}from"node:fs";import{isAbsolute as nS,join as hg}from"node:path";function tr(_){return hg(_,".gemini","config","hooks.json")}var Qa=new Map([["run_command","auto"]]),el="manage_task";var wg=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function kg(_){if(!_||typeof _!=="object"||Array.isArray(_))return[];return Object.values(_).flatMap((N)=>{if(!N||typeof N!=="object"||Array.isArray(N))return[];let U=N,Y=U.PreToolUse;if(!Array.isArray(Y))return[];return Y.flatMap((Z)=>{if(!Z||typeof Z!=="object"||Array.isArray(Z))return[];let re=Z.hooks;if(!Array.isArray(re))return[];return re.flatMap((ie)=>{if(!ie||typeof ie!=="object"||Array.isArray(ie))return[];let pe=ie.command;if(typeof pe!=="string"||!wg.test(pe))return[];return[{command:pe,enabled:U.enabled!==!1}]})})})}function nl(_){let N=tr(_.environment.home);if(!vg(N))return{platform:"antigravity-cli",status:"n/a",configPath:N};let U;try{U=kg(JSON.parse(bg(N,"utf-8")))}catch(Y){return{platform:"antigravity-cli",status:"n/a",configPath:N,errors:[`Failed to parse Antigravity hooks config ${N}: ${Y instanceof Error?Y.message:String(Y)}`]}}if(U.some((Y)=>Y.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:N};if(U.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:N};return{platform:"antigravity-cli",status:"n/a",configPath:N}}import{existsSync as Eg}from"node:fs";import{join as Ln}from"node:path";import{existsSync as Cg,lstatSync as xg,readFileSync as Sg}from"node:fs";import{join as Pg}from"node:path";function vn(_,N=(U)=>U){if(!Cg(_))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(N(Sg(_,"utf-8")))}}catch{return{kind:"unreadable"}}}function Nn(_,N){if(_==="~")return N;if(_.startsWith("~/")||_.startsWith("~\\"))return Pg(N,_.slice(2));return _}function dn(_){try{return xg(_)}catch{return}}function Br(_,N){let U=dn(N);if(!U)return{platform:_,status:"n/a",configPath:N};if(!U.isSymbolicLink()&&U.isDirectory())return;return{platform:_,status:"n/a",configPath:N,errors:[`${N} is a symlink or not a directory; move or remove it before installing`]}}function Ze(_,N){return typeof _==="object"&&_!==null?_[N]:void 0}var qr="cc-safety-net@cc-marketplace";function Vr(_){return _.env.get("CLAUDE_CONFIG_DIR")||Ln(_.home,".claude")}function tl(_){return Ln(_.env.get("CLAUDE_CODE_PLUGIN_CACHE_DIR")||Ln(Vr(_),"plugins"),"installed_plugins.json")}function rl(_,N){let U=Ze(Ze(_,"plugins"),N);return Array.isArray(U)&&U.length>0}function Kr(_,N){let U=vn(tl(_));return U.kind==="ok"&&rl(U.value,N)}function ii(_){return ol(tl(_),Ln(Vr(_),"settings.json"))}function ol(_,N){let U=vn(_);if(U.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(U.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!rl(U.value,qr))return{platform:"claude-code",status:"n/a"};let Y=vn(N);if(Y.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(Y.kind==="ok"&&Ze(Ze(Y.value,"enabledPlugins"),qr)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:N,errors:[`${qr} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:_}}function il(_){let N=Ln(_.home,".claude"),U=Ln(N,"plugins","installed_plugins.json");if(ol(U,Ln(N,"settings.json")).status!=="configured")return;let Y=vn(U),Z=Y.kind==="ok"?Ze(Ze(Y.value,"plugins"),qr):void 0,re=(Array.isArray(Z)?Z:[]).filter((ke)=>Ze(ke,"scope")==="user").map((ke)=>Ze(ke,"installPath")).find((ke)=>typeof ke==="string");if(!re)return;let ie=Ln(re,".cursor-plugin","plugin.json"),pe=vn(ie),me=pe.kind==="ok"?Ze(pe.value,"hooks"):void 0;return typeof me==="string"&&Eg(Ln(re,me))?ie:void 0}function sl(_){return ii(_.environment)}var al="Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it.";function ll(_){if(!_.codexPluginListOutput)return{platform:"codex",status:"n/a"};let N=_.codexPluginListOutput.split(`
`).find((U)=>U.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!N)return{platform:"codex",status:"n/a"};if(!N.includes("installed,"))return{platform:"codex",status:"n/a"};if(!N.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex runs only trusted hooks, and doctor cannot check trust. Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."]}}import{existsSync as Yr,readdirSync as Rg,readFileSync as _g}from"node:fs";import{join as wn}from"node:path";function yn(_){let N="",U=0,Y=!1,Z=!1,re=-1;while(U<_.length){let ie=_[U],pe=_[U+1];if(Z){N+=ie,Z=!1,U++;continue}if(ie==='"'&&!Y){Y=!0,re=-1,N+=ie,U++;continue}if(ie==='"'&&Y){Y=!1,N+=ie,U++;continue}if(ie==="\\"&&Y){Z=!0,N+=ie,U++;continue}if(Y){N+=ie,U++;continue}if(ie==="/"&&pe==="/"){while(U<_.length&&_[U]!==`
`)U++;continue}if(ie==="/"&&pe==="*"){U+=2;while(U<_.length-1){if(_[U]==="*"&&_[U+1]==="/"){U+=2;break}U++}continue}if(ie===","){re=N.length,N+=ie,U++;continue}if(ie==="}"||ie==="]"){if(re!==-1){let me=N.slice(re+1);if(/^\s*$/.test(me))N=N.slice(0,re)+me}re=-1,N+=ie,U++;continue}if(!/\s/.test(ie))re=-1;N+=ie,U++}return N}function dl(_,N,U){let Y=N+1,Z=!1;while(Y<_.length){if(Z){Z=!1,Y++;continue}if(_[Y]==="\\"){Z=!0,Y++;continue}if(_[Y]==='"')return Y+1;Y++}throw Error(U)}function ai(_,N,U){let Y=_[N],Z=Y==="["?"]":"}",re=0,ie=N;while(ie<_.length){let pe=U.skipComment?.(_,ie)??ie;if(pe!==ie){ie=pe;continue}if(_[ie]==='"'){ie=dl(_,ie,U.stringError);continue}if(_[ie]===Y)re++;if(_[ie]===Z){if(re--,re===0)return ie}ie++}throw Error(U.bracketError)}function ul(_,N){let U=_.lastIndexOf(`
`,N)+1;return/^[ \t]*/.exec(_.slice(U))?.[0]??""}function pl(_,N){let U=N.end+(/^\s*/.exec(_.slice(N.end))?.[0].length??0);if(_[U]===","){let ie=_[U+1]===`
`?U+2:U+1;return`${_.slice(0,N.start)}${_.slice(ie)}`}let Y=_.slice(0,N.start).search(/\s*$/)-1;if(_[Y]!==",")return`${_.slice(0,N.start)}${_.slice(N.end)}`;let Z=_.lastIndexOf(`
`,Y-1),re=Z!==-1&&/^\s*$/.test(_.slice(Z+1,Y))?Z:Y;return`${_.slice(0,re)}${_.slice(N.end)}`}function si(_,N){if(_.startsWith("//",N)){let U=_.indexOf(`
`,N+2);return U===-1?_.length:U+1}if(_.startsWith("/*",N)){let U=_.indexOf("*/",N+2);return U===-1?_.length:U+2}return N}function cl(_,N){let U=N;while(U<_.length){if(/\s/.test(_[U]??"")){U++;continue}let Y=si(_,U);if(Y===U)return U;U=Y}return U}function fl(_,N,U){let Y=0,Z=0;while(Z<_.length){let re=si(_,Z);if(re!==Z){Z=re;continue}if(_[Z]==='"'){let ie=dl(_,Z,U.stringError);if(Y===1&&JSON.parse(_.slice(Z,ie))===N){let pe=cl(_,ie),me=cl(_,pe+1);if(_[pe]===":"&&_[me]==="[")return{start:me,end:ai(_,me,{skipComment:si,...U})}}Z=ie;continue}if(_[Z]==="{"||_[Z]==="[")Y++;if(_[Z]==="}"||_[Z]==="]")Y--;Z++}return}var Tn="cc-safety-net@cc-marketplace",Jr=["cc-marketplace","cc-safety-net"],ml=["_direct","copilot-safety-net"],gl=["cc-marketplace","safety-net"],yl="safety-net@cc-marketplace";function Wr(_,N){let U=N.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${U}([^a-z0-9-]|$)`,"m").test(_??"")}function hl(_){return Wr(_,"cc-safety-net@cc-marketplace")}function vl(_){return Wr(_,"cc-marketplace")}function bl(_){return Wr(_,"copilot-safety-net")}function wl(_){return Wr(_,"safety-net@cc-marketplace")}function zr(_){if(!_?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(_)}function Cl(_,N){if(!_)return null;let U=_.match(/(\d+)\.(\d+)\.(\d+)/);if(!U)return null;let Y=[Number(U[1]),Number(U[2]),Number(U[3])];for(let Z=0;Z<N.length;Z++){let re=Y[Z]??0,ie=N[Z]??0;if(re!==ie)return re>ie}return!0}function Tg(_){return Cl(_,[0,0,422])}function Ig(_){return Cl(_,[1,0,8])}function ir(_){return _.env.get("COPILOT_HOME")||wn(_.home,".copilot")}function xl(_){return _.disableAllHooks!==!0&&Sl(_)}function Sl(_){return(_.hooks?.preToolUse??[]).some((U)=>{if(U.type!==void 0&&U.type!=="command")return!1;return zr(U.command)||zr(U.bash)||zr(U.powershell)||zr(U.exec&&[U.exec,...U.args??[]].join(" "))})}function rr(_){return _===void 0||typeof _==="string"}function Ag(_){return _===void 0||Array.isArray(_)&&_.every((N)=>typeof N==="string")}function Og(_){if(!_||typeof _!=="object"||Array.isArray(_))return!1;let N=_;if(N.disableAllHooks!==void 0&&typeof N.disableAllHooks!=="boolean")return!1;if(N.hooks===void 0)return!0;if(!N.hooks||typeof N.hooks!=="object"||Array.isArray(N.hooks))return!1;let U=N.hooks.preToolUse;if(U===void 0)return!0;return Array.isArray(U)&&U.every((Y)=>Y!==null&&typeof Y==="object"&&!Array.isArray(Y)&&rr(Y.type)&&rr(Y.command)&&rr(Y.bash)&&rr(Y.powershell)&&rr(Y.exec)&&Ag(Y.args))}function li(_,N){try{let U=JSON.parse(yn(_g(_,"utf-8")));if(!Og(U)){N?.push(`Invalid hook config ${_}: hooks.preToolUse must be an array of hook objects`);return}return U}catch(U){N?.push(`Failed to parse ${_}: ${U instanceof Error?U.message:String(U)}`);return}}function Pl(_,N){try{return Rg(_).filter((U)=>U.endsWith(".json")).sort((U,Y)=>U.localeCompare(Y))}catch(U){return N?.push(`Failed to read ${_}: ${U instanceof Error?U.message:String(U)}`),[]}}function $g(_,N){if(!Yr(_))return[];let U=[];for(let Y of Pl(_,N)){let Z=wn(_,Y),re=li(Z,N);if(re&&xl(re))U.push(Z)}return U}function or(_,N){if(!Yr(_))return;let U=li(_,N);if(!U)return;return{path:_,config:U}}function kl(_,N,U,Y){if(N){_.push(`GitHub Copilot CLI ${N} does not support ${U}; requires ${Y}+`);return}_.push(`GitHub Copilot CLI version unavailable; skipping ${U} because it requires ${Y}+`)}function Dg(_){for(let N of _){if(N?.config.disableAllHooks===!0)return N.path;if(N?.config.disableAllHooks===!1)return}return}function Ng(_,N,U,Y){let Z=ir(_),re=wn(N,".github","hooks"),ie=wn(Z,"hooks"),pe=wn(N,".github","copilot"),me=wn(N,".claude"),ke=Ig(U),Ce=ke===!0?Y:void 0,Re=[or(wn(pe,"settings.local.json"),Ce),or(wn(pe,"settings.json"),Ce),or(wn(me,"settings.local.json"),Ce),or(wn(me,"settings.json"),Ce)],Ne=or(wn(Z,"settings.json"),Ce),_e=[Ne?.config.disableAllHooks===!0?void 0:Ne];if(ke!==!1){let nn=Dg(Re);if(nn){if(ke===null)Y.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${nn} as active`);return{activeConfigPaths:[],repoInlineSources:Re,disabledBy:nn}}}let Te=$g(re,Y),We=Tg(U),Me=We===!0?Y:void 0,Ye=Yr(ie)?Pl(ie,Me):[],tn=[];for(let nn of Ye){let sn=wn(ie,nn),Sn=li(sn,Me);if(Sn&&xl(Sn))tn.push(sn)}if(We!==!0&&tn.length>0)kl(Y,U,`user hook files in ${ie}`,"0.0.422"),tn.length=0;let on=[];for(let nn of[...Re,..._e]){if(!nn)continue;if(!Sl(nn.config))continue;if(ke===!0){on.push(nn);continue}kl(Y,U,"inline hook definitions in Copilot config files","1.0.8");break}let an=(nn)=>nn.filter((sn)=>!!sn&&on.includes(sn)).map((sn)=>sn.path);return{activeConfigPaths:[...an(Re),...Te,...an(_e),...tn],repoInlineSources:Re}}function El(_){let N=[],U=Ng(_.environment,_.cwd,_.copilotCliVersion,N);if(U.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:U.disabledBy,configPaths:[U.disabledBy],errors:N.length>0?N:void 0};let Y=ir(_.environment),Z=wn(Y,"installed-plugins",...Jr),re=Yr(Z),ie=wn(Y,"settings.json"),pe=vn(ie,yn),me=(_e)=>Ze(Ze(_e,"enabledPlugins"),Tn),ke=U.repoInlineSources.find((_e)=>typeof me(_e?.config)==="boolean"),Ce=ke??(pe.kind==="ok"?{path:ie,config:pe.value}:void 0);if(re&&!ke&&pe.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};let Re=re&&Ce!==void 0&&me(Ce.config)===!1;if(Re&&U.activeConfigPaths.length===0)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:Ce.path,errors:[`${Tn} is installed but not enabled in Copilot CLI`]};let Ne=re&&!Re;if(Ne||U.activeConfigPaths.length>0){let _e=U.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:Ne?"plugin config":"hook config",configPath:_e??(Ne?Z:void 0),configPaths:U.activeConfigPaths.length>0?U.activeConfigPaths:void 0,errors:N.length>0?N:void 0}}return{platform:"copilot-cli",status:"n/a",errors:N.length>0?N:void 0}}import{existsSync as yi,readdirSync as zg,readFileSync as Yg}from"node:fs";import{join as gi}from"node:path";import{existsSync as fi,mkdirSync as Gg,readFileSync as Bg,rmSync as qg}from"node:fs";import{dirname as Vg,join as Zr}from"node:path";import{existsSync as Lg,renameSync as jg,statSync as Hg,writeFileSync as Fg}from"node:fs";function ln(_,N){let U=`${_}.${process.pid}.tmp`;Fg(U,N,Lg(_)?{mode:Hg(_).mode&511}:{}),jg(U,_)}import{spawn as Mg}from"node:child_process";function Ug(_){return _.join(" ")}function ci(_,N,U){return[`Failed to run ${Ug(_)}${N===null?"":` (exit ${N})`}.`,U.trim()].filter(Boolean).join(`
`)}function di(_){let N={stdout:"",stderr:""};return _.stdout.setEncoding("utf-8"),_.stderr.setEncoding("utf-8"),_.stdout.on("data",(U)=>{N.stdout+=U}),_.stderr.on("data",(U)=>{N.stderr+=U}),N}function fn(_,N){return new Promise((U,Y)=>{let Z=Xn([..._],process.env),re=Mg(Z.cmd,Z.args,{stdio:["ignore","pipe","pipe"]}),ie=di(re),pe=()=>[ie.stdout,ie.stderr].filter(Boolean).join(`
`),me=N?.timeoutMs??120000,ke=setTimeout(()=>{re.kill(),Y(Error(ci(_,null,`Timed out after ${me}ms.
${pe()}`.trim())))},me);re.on("error",(Ce)=>{clearTimeout(ke),Y(Error(ci(_,null,`${Ce.message}
${pe()}`.trim())))}),re.on("close",(Ce)=>{if(clearTimeout(ke),Ce!==0){Y(Error(ci(_,Ce,pe())));return}U(N?.stdoutOnly?ie.stdout:pe())})})}async function ui(_){for(let N of _)await fn(N)}async function Rl(_){for(let N of _)try{await fn(N)}catch(U){console.warn(U instanceof Error?U.message:String(U))}}var kn=Object.fromEntries(Xt.map((_)=>[_.id,`npx -y cc-safety-net hook ${_.flags[1]}`]));var ar=kn.cursor,_l=30;function Qr(_){return Zr(_.home,".cursor","hooks.json")}var sr="cc-safety-net";function mi(_){let N=Zr(_.home,".cursor","plugins");return{cache:Zr(N,"cache",sr),marketplaceClone:Zr(N,"marketplaces","github.com","kenryu42","cc-safety-net")}}async function Tl(_){let N=Object.values(mi(_));if(!N.some((Y)=>fi(Y)))return;let U="No marketplace matches";return await fn(["cursor-agent","plugin","marketplace","remove",sr]).catch((Y)=>{if(!(Y instanceof Error&&Y.message.includes(U)))throw Y}),N.forEach((Y)=>qg(Y,{recursive:!0,force:!0})),[`Removed the ${sr} marketplace from your Cursor account.`,"If /plugins in cursor-agent still lists CC Safety Net as installed, uninstall it there."].join(`
`)}function ot(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function pi(){return{command:ar,timeout:_l,failClosed:!0}}function Xr(_){return ot(_)&&_.command===ar}function Kg(_){return Object.keys(_).length===3&&_.command===ar&&_.timeout===_l&&_.failClosed===!0}function Jg(_){try{return JSON.parse(Bg(_,"utf-8"))}catch(N){if(N instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${_}: ${N.message}`);throw N}}function Il(_){let N=Jg(_);if(!ot(N))throw Error(`Cursor hooks config ${_} must be a JSON object`);if(N.version!==1)throw Error(`Cursor hooks config ${_} must set "version": 1`);if(N.hooks!==void 0&&!ot(N.hooks))throw Error(`Cursor hooks config ${_} "hooks" must be an object`);let U=ot(N.hooks)?N.hooks.preToolUse:void 0;if(U!==void 0&&!Array.isArray(U))throw Error(`Cursor hooks config ${_} "hooks.preToolUse" must be an array`);return N}function Al(_){let N=ot(_.hooks)?_.hooks.preToolUse:void 0;return Array.isArray(N)?N:[]}function Wg(_){if(!_.some(Xr))return[..._,pi()];return _.reduce((N,U)=>{if(!Xr(U))return N.result.push(U),N;if(!N.inserted)N.result.push(pi()),N.inserted=!0;return N},{result:[],inserted:!1}).result}function Ol(_,N,U){let Y=ot(N.hooks)?N.hooks:{},Z={...N,hooks:{...Y,preToolUse:U}};ln(_,`${JSON.stringify(Z,null,2)}
`)}function $l(_){let N=Qr(_);if(!fi(N))return Gg(Vg(N),{recursive:!0}),ln(N,`${JSON.stringify({version:1,hooks:{preToolUse:[pi()]}},null,2)}
`),{path:N,alreadyInstalled:!1};let U=Il(N),Y=Al(U),Z=Y.filter(Xr);if(ot(U.hooks)&&Array.isArray(U.hooks.preToolUse)&&Z.length===1&&Z[0]!==void 0&&Kg(Z[0]))return{path:N,alreadyInstalled:!0};return Ol(N,U,Wg(Y)),{path:N,alreadyInstalled:!1}}function Dl(_){let N=Qr(_);if(!fi(N))return{path:N,alreadyInstalled:!1};let U=Il(N),Y=Al(U),Z=Y.filter((re)=>!Xr(re));if(Z.length===Y.length)return{path:N,alreadyInstalled:!1};return Ol(N,U,Z),{path:N,alreadyInstalled:!0}}function Zg(_){if(!_||typeof _!=="object"||Array.isArray(_))return[];let N=_.hooks;if(!N||typeof N!=="object"||Array.isArray(N))return[];let U=N.preToolUse;if(!Array.isArray(U))return[];return U.filter((Y)=>!!Y&&typeof Y==="object"&&!Array.isArray(Y)&&Y.command===ar)}function Xg(_){let N=[];if(_.length>1)N.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let U=_[0];if(U&&U.failClosed!==!0)N.push('Managed hook is missing "failClosed": true; reinstall to repair');if(U&&U.timeout!==30)N.push('Managed hook "timeout" is not 30; reinstall to repair');return N}var eo="Claude Code plugin",hi="Cursor plugin";function Qg(_){let N=gi(mi(_).cache,sr);if(!yi(N))return{};try{return{version:zg(N).map((U)=>gi(N,U)).find((U)=>yi(gi(U,".cache-complete")))}}catch{return{unreadable:N}}}function ey(_,N){if(N){let Z=["Cursor records enabled plugins on your Cursor account, which doctor cannot check, and keeps a plugin's files after it is uninstalled.","Cursor pins marketplace plugins to the commit they were added at, so `cc-safety-net update` cannot update this plugin, while the npx hook (`cc-safety-net install --cursor`) stays current."].join(" ");return{method:hi,configPath:N,duplicate:`The Cursor plugin also runs this check, so every tool call is checked twice. ${Z} If the plugin is installed, run \`cc-safety-net uninstall --cursor\`, uninstall CC Safety Net from /plugins in cursor-agent, then run \`cc-safety-net install --cursor\`.`,alone:`${Z} If /plugins in cursor-agent does not list CC Safety Net as installed, run \`cc-safety-net install --cursor\`.`}}let U=il(_);if(!U)return;let Y="Cursor runs the Claude Code plugin only while it imports Claude Code plugins, which doctor cannot check.";return{method:eo,configPath:U,duplicate:`The Claude Code plugin also runs this check in Cursor, so every tool call is checked twice. ${Y} If Cursor runs it, run \`cc-safety-net uninstall --cursor\` to remove this hook.`,alone:`${Y} If it stops, run \`cc-safety-net install --cursor\`.`}}function Nl(_){let N=ny(_),U=Qg(_.environment);if(U.unreadable)return N.status==="configured"?{...N,errors:[...N.errors??[],`Cannot read ${U.unreadable}, so doctor cannot tell whether the Cursor plugin also runs this check.`]}:{platform:"cursor",status:"not-inspected"};let Y=ey(_.environment,U.version);if(!Y)return N;if(N.status==="configured")return{...N,errors:[...N.errors??[],Y.duplicate]};return{platform:"cursor",status:"configured",method:Y.method,configPath:Y.configPath,errors:[...N.errors??[],Y.alone]}}function ny(_){let N=Qr(_.environment);if(!yi(N))return{platform:"cursor",status:"n/a",configPath:N};let U;try{U=JSON.parse(Yg(N,"utf-8"))}catch(re){return{platform:"cursor",status:"n/a",configPath:N,errors:[`Failed to parse Cursor hooks config ${N}: ${re instanceof Error?re.message:String(re)}`]}}let Y=Zg(U);if(Y.length===0)return{platform:"cursor",status:"n/a",configPath:N};let Z=Xg(Y);return{platform:"cursor",status:"configured",method:"hook config",configPath:N,errors:Z.length>0?Z:void 0}}import{readdirSync as ty}from"node:fs";import{join as vi,resolve as ry}from"node:path";var bi="cc-safety-net";function wi(_){let N=_.env.get("DSH_HOME");return vi(N?.trim()?ry(Nn(N,_.home)):vi(_.home,".dsh"),"profiles")}function Ll(_){let N=wi(_),U=dn(N)?.isDirectory()?ty(N,{withFileTypes:!0}).filter((Z)=>Z.isDirectory()&&Z.name!=="node_modules").map((Z)=>{let re=vi(N,Z.name,"package.json");return{name:Z.name,configPath:re,manifest:vn(re)}}):[];return{installed:U.flatMap((Z)=>{if(Z.manifest.kind!=="ok")return[];let re=Z.manifest.value;if(Ze(Ze(re,"dependencies"),bi)===void 0)return[];let ie=Ze(Ze(Ze(re,"dsh"),"profile"),"bundles");return[{name:Z.name,configPath:Z.configPath,enabled:Array.isArray(ie)&&ie.includes(bi)}]}),unreadable:U.some((Z)=>Z.manifest.kind==="unreadable")}}function ki(_){return Ll(_).installed}function jl(_){let N=Ll(_.environment),U=N.installed.filter((re)=>re.enabled),Y=N.installed.filter((re)=>!re.enabled),Z=Y.map((re)=>`${bi} is installed in the ${re.name} profile but its bundle is disabled`);if(U.length>0)return{platform:"deepseek-harness",status:"configured",method:"dsh bundle",configPaths:U.map((re)=>re.configPath),...Z.length>0?{errors:Z}:{}};if(Y.length>0)return{platform:"deepseek-harness",status:"disabled",method:"dsh bundle",configPaths:Y.map((re)=>re.configPath),errors:Z};return N.unreadable?{platform:"deepseek-harness",status:"not-inspected"}:{platform:"deepseek-harness",status:"n/a"}}import{existsSync as cy}from"node:fs";import{existsSync as Ml,mkdirSync as oy,readFileSync as iy}from"node:fs";import{dirname as sy,join as Si}from"node:path";function Ci(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function xi(_,N){return Ci(_)&&_.command===N}function Hl(_,N){return Ci(_)&&Array.isArray(_.hooks)&&_.hooks.some((U)=>xi(U,N))}function mt(_,N){return{hooks:[{type:"command",command:_,timeout:N}]}}function jn(_,N){return _.flatMap((U)=>{if(!Ci(U)||!Array.isArray(U.hooks))return[U];let Y=U.hooks.filter((Z)=>!xi(Z,N));if(Y.length===U.hooks.length)return[U];return Y.length===0?[]:[{...U,hooks:Y}]})}function Ft(_,N,U){let Y=_.filter((Z)=>Hl(Z,N));return Y.length===1&&JSON.stringify(Y[0])===JSON.stringify(mt(N,U))}function Mt(_,N){return _.find((U)=>Hl(U,N))}function Ut(_,N,U){let Y=Array.isArray(_.hooks)?_.hooks.find((Z)=>xi(Z,N)):void 0;return[..._.matcher===void 0||_.matcher===""||_.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...Y?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...Y?.timeout===U?[]:[`Managed hook "timeout" is not ${U}; reinstall to repair`]]}var gt=kn.devin,no=30,ay={config:{},hooks:{},preToolUse:[]};function to(_,N=process.platform){let U=N==="win32"?_.env.get("APPDATA")||Si(_.home,"AppData","Roaming"):_.env.get("XDG_CONFIG_HOME")||Si(_.home,".config");return Si(U,"devin","config.json")}function Fl(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function ly(_){try{return{ok:!0,value:JSON.parse(yn(iy(_,"utf-8")))}}catch(N){return{ok:!1,message:N instanceof Error?N.message:String(N)}}}function Pi(_){let N=ly(_);if(!N.ok)return`Failed to parse Devin CLI config ${_}: ${N.message}`;let U=N.value;if(!Fl(U))return`Devin CLI config ${_} must be a JSON object`;let Y=U.hooks===void 0?{}:U.hooks;if(!Fl(Y))return`Devin CLI config ${_} "hooks" must be an object`;let Z=Y.PreToolUse===void 0?[]:Y.PreToolUse;if(!Array.isArray(Z))return`Devin CLI config ${_} "hooks.PreToolUse" must be an array`;return{config:U,hooks:Y,preToolUse:Z}}function Ul(_){let N=Pi(_);if(typeof N==="string")throw Error(N);return N}function Gl(_,N,U){let Y={...N.config,hooks:{...N.hooks,PreToolUse:U}};ln(_,`${JSON.stringify(Y,null,2)}
`)}function Bl(_){let N=to(_),U=Ml(N)?Ul(N):ay;if(Ft(U.preToolUse,gt,no))return{path:N,alreadyInstalled:!0};return oy(sy(N),{recursive:!0}),Gl(N,U,[...jn(U.preToolUse,gt),mt(gt,no)]),{path:N,alreadyInstalled:!1}}function ql(_){let N=to(_);if(!Ml(N))return{path:N,alreadyInstalled:!1};let U=Ul(N),Y=jn(U.preToolUse,gt);if(JSON.stringify(Y)===JSON.stringify(U.preToolUse))return{path:N,alreadyInstalled:!1};return Gl(N,U,Y),{path:N,alreadyInstalled:!0}}function Vl(_){let N=to(_.environment);if(!cy(N))return{platform:"devin",status:"n/a",configPath:N};let U=Pi(N);if(typeof U==="string")return{platform:"devin",status:"n/a",configPath:N,errors:[U]};let Y=Mt(U.preToolUse,gt);if(!Y)return{platform:"devin",status:"n/a",configPath:N};let Z=Ut(Y,gt,no);return{platform:"devin",status:"configured",method:"hook config",configPath:N,errors:Z.length>0?Z:void 0}}import{existsSync as yy,readFileSync as hy}from"node:fs";import{existsSync as Gt,mkdirSync as dy,readFileSync as uy,rmSync as py}from"node:fs";import{dirname as fy,join as Ri}from"node:path";var ht=kn.droid,ro=30;function oo(_){return Ri(_.home,".factory","hooks.json")}function Kl(_){return Ri(_.home,".factory","settings.json")}function Jl(_){return Ri(_.home,".factory","hooks","hooks.json")}function Ei(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function Wl(_){try{return JSON.parse(yn(uy(_,"utf-8")))}catch(N){if(N instanceof SyntaxError)throw Error(`Failed to parse Factory Droid hooks config ${_}: ${N.message}`);throw N}}function _i(_){let N=Wl(_);if(!Ei(N))throw Error(`Factory Droid hooks config ${_} must be a JSON object`);if(N.PreToolUse===void 0||Array.isArray(N.PreToolUse))return N;throw Error(`Factory Droid hooks config ${_} "PreToolUse" must be an array`)}function my(_){if(!Gt(_))return{};let N=Wl(_);return Ei(N)&&Ei(N.hooks)&&N.hooks.PreToolUse!==void 0?{PreToolUse:N.hooks.PreToolUse}:{}}function gy(_){let N=Jl(_);return{...my(Kl(_)),...Gt(N)?_i(N):{}}}function zl(_){return Array.isArray(_.PreToolUse)?_.PreToolUse:[]}function Yl(_,N,U){ln(_,`${JSON.stringify({...N,PreToolUse:U},null,2)}
`)}function Zl(_){let N=oo(_),U=Gt(N),Y=U?_i(N):gy(_),Z=zl(Y);if(U&&Ft(Z,ht,ro))return{path:N,alreadyInstalled:!0};return dy(fy(N),{recursive:!0}),Yl(N,Y,[...jn(Z,ht),mt(ht,ro)]),{path:N,alreadyInstalled:!1}}function Xl(_){let N=oo(_);if(!Gt(N))return{path:N,alreadyInstalled:!1};let U=_i(N),Y=zl(U),Z=jn(Y,ht);if(JSON.stringify(Z)===JSON.stringify(Y))return{path:N,alreadyInstalled:!1};let re=Gt(Kl(_))||Gt(Jl(_));if(Z.length===0&&Object.keys(U).length===1&&!re)return py(N),{path:N,alreadyInstalled:!0};return Yl(N,U,Z),{path:N,alreadyInstalled:!0}}function Ql(_){let N=oo(_.environment);if(!yy(N))return{platform:"droid",status:"n/a",configPath:N};let U;try{U=JSON.parse(yn(hy(N,"utf-8")))}catch(ie){return{platform:"droid",status:"n/a",configPath:N,errors:[`Failed to parse Factory Droid hooks config ${N}: ${ie instanceof Error?ie.message:String(ie)}`]}}let Y=typeof U==="object"&&U!==null&&"PreToolUse"in U?U.PreToolUse:void 0,Z=Mt(Array.isArray(Y)?Y:[],ht);if(!Z)return{platform:"droid",status:"n/a",configPath:N};let re=[...Z.commandRegex===void 0||Z.commandRegex===""?[]:['Managed hook has a "commandRegex" that narrows coverage; reinstall to repair'],...Ut(Z,ht,ro)];return{platform:"droid",status:"configured",method:"hook config",configPath:N,errors:re.length>0?re:void 0}}import{existsSync as vy}from"node:fs";import{join as Ti}from"node:path";var Ii="gemini-safety-net";function Ai(_){let N=Ti(_.home,".gemini","extensions"),U=Ti(N,Ii);if(!vy(U))return{platform:"gemini-cli",status:"n/a"};let Y=Ti(N,"extension-enablement.json"),Z=vn(Y);if(Z.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let re=Z.kind==="ok"?Ze(Ze(Z.value,Ii),"overrides"):void 0;if(Array.isArray(re)&&re.some((pe)=>typeof pe==="string"&&pe.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:Y,errors:[`${Ii} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:U}}function ec(_){return Ai(_.environment)}import{existsSync as Cy,readFileSync as cc,statSync as xy}from"node:fs";import{dirname as lc,join as Sy}from"node:path";import{existsSync as tc,mkdirSync as by,readFileSync as rc,rmSync as wy}from"node:fs";import{dirname as ky,join as nc}from"node:path";var Bn=kn["grok-build"],so=30,Oi=mt(Bn,so);function ao(_){return nc(_.env.get("GROK_HOME")??nc(_.home,".grok"),"hooks","cc-safety-net.json")}function lo(_){return typeof _==="object"&&_!==null&&!Array.isArray(_)}function oc(_){try{let N=JSON.parse(_);return lo(N)?N:null}catch{return null}}function ic(_){let N=lo(_.hooks)?_.hooks.PreToolUse:void 0;return Array.isArray(N)?N:[]}function io(_,N,U){let Y=lo(N.hooks)?N.hooks:{};ln(_,`${JSON.stringify({...N,hooks:{...Y,PreToolUse:U}},null,2)}
`)}function sc(_){let N=ao(_);if(!tc(N))return by(ky(N),{recursive:!0}),io(N,{},[Oi]),{path:N,alreadyInstalled:!1};let U=oc(rc(N,"utf-8"));if(!U)return io(N,{},[Oi]),{path:N,alreadyInstalled:!1};let Y=ic(U);if(Ft(Y,Bn,so))return{path:N,alreadyInstalled:!0};return io(N,U,[...jn(Y,Bn),Oi]),{path:N,alreadyInstalled:!1}}function ac(_){let N=ao(_);if(!tc(N))return{path:N,alreadyInstalled:!1};let U=oc(rc(N,"utf-8"));if(!U)return{path:N,alreadyInstalled:!1};let Y=ic(U),Z=jn(Y,Bn);if(JSON.stringify(Z)===JSON.stringify(Y))return{path:N,alreadyInstalled:!1};let re=lo(U.hooks)?U.hooks:{};if(Z.length===0&&Object.keys(U).length===1&&Object.keys(re).length===1)return wy(N),{path:N,alreadyInstalled:!0};return io(N,U,Z),{path:N,alreadyInstalled:!0}}function $i(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}function Py(_){try{return xy(_,{throwIfNoEntry:!1})?.isFile()===!0?cc(_,"utf-8"):""}catch{return}}function dc(_){let N=ao(_.environment);if(!Cy(N))return{platform:"grok-build",status:"n/a",configPath:N};let U;try{U=JSON.parse(cc(N,"utf-8"))}catch(Re){return{platform:"grok-build",status:"n/a",configPath:N,errors:[`Failed to parse Grok Build hooks config ${N}: ${Re instanceof Error?Re.message:String(Re)}`]}}let Y=$i(U)&&$i(U.hooks)&&Array.isArray(U.hooks.PreToolUse)?U.hooks.PreToolUse:[],Z=Mt(Y,Bn);if(!Z)return{platform:"grok-build",status:"n/a",configPath:N};let re=Array.isArray(Z.hooks)?Z.hooks.findIndex((Re)=>$i(Re)&&Re.command===Bn):-1,ie=`global/cc-safety-net:pre_tool_use[${Y.indexOf(Z)}].hooks[${re}]`,pe=Sy(lc(lc(N)),"disabled-hooks"),me=Py(pe),ke=me?.split(`
`).some((Re)=>Re.trim()===ie)===!0,Ce=[...me===void 0?[`Cannot read ${pe}, so doctor cannot tell whether Grok Build skips the hook`]:[],...ke?[`Grok Build skips the hook: ${ie} is listed in ${pe}; enable it in /hooks`]:[],...Ut(Z,Bn,so)];return{platform:"grok-build",status:ke?"disabled":"configured",method:"hook config",configPath:N,errors:Ce.length>0?Ce:void 0}}import{readFileSync as bc}from"node:fs";import{join as wc}from"node:path";var Pn="cc-safety-net",Di="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",Ey=30;function uc(_){return`${Di}
# version: ${_}
`}function Ry(_){return`${uc(_)}name: ${Pn}
version: "${_}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function _y(_){return`${uc(_)}"""CC Safety Net guard for Hermes Agent.

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
TIMEOUT_SECONDS = ${Ey}


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
`}function lr(_){return[{name:"__init__.py",content:_y(_)},{name:"plugin.yaml",content:Ry(_)}]}import{mkdirSync as Ty,readdirSync as Iy,readFileSync as pc,rmSync as Ni}from"node:fs";import{basename as Ay,dirname as Oy,join as Hn}from"node:path";var $y="__pycache__",Dy=/^[a-z0-9][a-z0-9_-]{0,63}$/;function Ny(_){try{return pc(_,"utf-8").trim()}catch{return}}function Li(_){let N=_.env.get("HERMES_HOME")?.trim();if(N&&Ay(Oy(N))==="profiles")return N;let U=N||Hn(_.home,".hermes"),Y=Hn(U,"active_profile"),Z=Ny(Y),re=Z?.toLowerCase();if(!re||re==="default")return U;if(!Dy.test(re))throw Error(`Invalid Hermes profile name "${Z}" in ${Y}; run \`hermes profile use <name>\` with a valid profile.`);return Hn(U,"profiles",re)}function ji(_){return Hn(Li(_),"plugins",Pn)}function Hi(_){return _.startsWith(Di)}function Fi(_,N){let U=ji(_),Y=dn(U);if(Y&&(Y.isSymbolicLink()||!Y.isDirectory()))throw Error(`Refusing to ${N} ${U}: not a regular directory. Move or remove it and rerun ${N==="install"?"install":"uninstall"} --hermes-agent.`);return U}function fc(_,N){let U=dn(_);if(!U)return;if(U.isSymbolicLink()||!U.isFile())throw Error(`Refusing to ${N} ${_}: not a regular file. Move or remove it.`);let Y=pc(_,"utf-8");if(!Hi(Y))throw Error(`Refusing to ${N} unmanaged file at ${_}. Move or remove it.`);return Y}function mc(_){let N=Fi(_,"install"),U=lr(pn());if(U.map((Z)=>fc(Hn(N,Z.name),"overwrite")).every((Z,re)=>Z===U[re]?.content))return{path:N,alreadyInstalled:!0};return Ty(N,{recursive:!0}),U.forEach((Z)=>{ln(Hn(N,Z.name),Z.content)}),{path:N,alreadyInstalled:!1}}function Mi(_){let N=Fi(_,"remove");if(!dn(N))return[];return lr(pn()).filter((U)=>fc(Hn(N,U.name),"remove")!==void 0)}function gc(_){let N=Fi(_,"remove");if(!dn(N))return{path:N,alreadyInstalled:!1};let U=Mi(_);if(U.forEach((Y)=>{Ni(Hn(N,Y.name))}),Ni(Hn(N,$y),{recursive:!0,force:!0}),Iy(N).length===0)Ni(N,{recursive:!0});return{path:N,alreadyInstalled:U.length>0}}var cr="hermes-agent",yc=/^([^\s#][^:]*):/,Ly=/^\s+([A-Za-z_][\w-]*):/,hc=/^\s+-\s*(.*)$/;function jy(_){return _.trim().replace(/^(["'])(.*)\1$/,"$2")}function Hy(_){let N=_.split(/\r?\n/),U=N.findIndex((re)=>yc.exec(re)?.[1]?.trim()==="plugins");if(U===-1)return[];let Y=N.slice(U+1),Z=Y.findIndex((re)=>yc.test(re));return Z===-1?Y:Y.slice(0,Z)}function vc(_,N){let U=Hy(_),Y=U.findIndex((ie)=>Ly.exec(ie)?.[1]===N);if(Y===-1)return[];let Z=U.slice(Y+1),re=Z.findIndex((ie)=>!hc.test(ie));return(re===-1?Z:Z.slice(0,re)).map((ie)=>jy(hc.exec(ie)?.[1]??""))}function Fy(_){try{return bc(wc(Li(_),"config.yaml"),"utf-8")}catch{return}}function Ui(_){let N=Fy(_)??"";return vc(N,"enabled").includes(Pn)&&!vc(N,"disabled").includes(Pn)}function kc(_){return/^# version:\s*(.+)$/m.exec(_)?.[1]?.trim()}function My(_,N){let U=dn(_);if(!U)return{error:`${N.name} is missing from ${_}; run install --hermes-agent`};if(U.isSymbolicLink()||!U.isFile())return{error:`${_} is a symlink or not a regular file; move or remove it`};try{let Y=bc(_,"utf-8");if(!Hi(Y))return{error:`Unmanaged ${N.name} occupies ${_}; move or remove it`};if(kc(Y)===pn()&&Y!==N.content)return{error:`Modified ${N.name} occupies ${_}; run install --hermes-agent to restore it`};return{content:Y}}catch(Y){return{error:`Failed to read ${_}: ${Y instanceof Error?Y.message:String(Y)}`}}}function Uy(_){try{return{path:ji(_)}}catch(N){return{error:N instanceof Error?N.message:String(N)}}}function Cc(_){let N=Uy(_.environment);if("error"in N)return{platform:cr,status:"n/a",errors:[N.error]};let U=N.path,Y=Br(cr,U);if(Y)return Y;let Z=lr(pn()).map((me)=>My(wc(U,me.name),me)),re=Z.flatMap((me)=>("error"in me)?[me.error]:[]);if(re.length>0)return{platform:cr,status:"n/a",configPath:U,errors:re};let ie=Z.some((me)=>("content"in me)&&kc(me.content)!==pn()),pe=ie?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!Ui(_.environment))return{platform:cr,status:"disabled",method:"plugin directory",configPath:U,errors:[`${Pn} is not enabled in Hermes; run \`hermes plugins enable ${Pn}\``,...pe]};return{platform:cr,status:"configured",method:"plugin directory",configPath:U,errors:ie?pe:void 0}}import{existsSync as Gy,readFileSync as By}from"node:fs";import{join as qi}from"node:path";var qy=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/,Gi="cc-safety-net",uo="plugin config",Vy=new Set(["event","matcher","command","timeout"]),Ky=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionResult","UserPromptSubmit","UserPromptQueued","TurnStarted","Stop","StopFailure","Interrupt","SessionStart","SessionEnd","SessionHeartbeat","SubagentStart","SubagentStop","TaskStarted","PreCompact","PostCompact","Notification"]);function xc(_){return _.env.get("KIMI_CODE_HOME")||qi(_.home,".kimi-code")}function co(_,N){let U=[""],Y="",Z=0;for(let re=0;re<_.length;re++){let ie=_[re];if(Y!==""){let pe=Y==='"'&&ie==="\\"?_[++re]??"":"";if(U[U.length-1]+=ie+pe,pe===""&&ie===Y)Y="";continue}if(ie==="#"){let pe=_.indexOf(`
`,re);re=(pe===-1?_.length:pe)-1;continue}if(ie===N&&Z===0){U.push("");continue}if(ie==='"'||ie==="'")Y=ie;if(ie==="["||ie==="{")Z++;if(ie==="]"||ie==="}")Z--;U[U.length-1]+=ie}return U.map((re)=>re.trim()).filter((re)=>re!=="")}function Sc(_){let N=/^(?:"([^"]*)"|'([^']*)'|([^\s="']+))\s*=\s*([\s\S]+)$/.exec(_);return N?{key:N[1]??N[2]??N[3]??"",value:N[4]??""}:void 0}function Bi(_){return _===void 0?void 0:/^("""|'''|"|')([\s\S]*)\1$/.exec(_)?.[2]}function Jy(_){let N=_.split(/(?=^\s*\[)/m),U=N.filter((Y)=>!/^\s*\[/.test(Y)).flatMap((Y)=>co(Y,`
`)).map(Sc).find((Y)=>Y?.key==="hooks")?.value;if(U!==void 0)return co(U.slice(1,-1),",").map((Y)=>co(Y.slice(1,-1),","));return N.filter((Y)=>/^\s*\[\[hooks]]/.test(Y)).map((Y)=>co(Y.replace(/^\s*\[\[hooks]]/,""),`
`))}function Wy(_){let N=_.map(Sc),U=_.find((Ce,Re)=>N[Re]===void 0),Y=N.find((Ce)=>Ce!==void 0&&!Vy.has(Ce.key))?.key,Z=N.find((Ce,Re)=>Ce!==void 0&&N.findIndex((Ne)=>Ne?.key===Ce.key)<Re)?.key,re=(Ce)=>N.find((Re)=>Re?.key===Ce)?.value,ie=re("matcher"),pe=re("timeout"),me=Number(pe?.replace(/(?<=[\da-f])_(?=[\da-f])/gi,""));return[[U!==void 0,`"${U}" is not a key = value pair`],[Y!==void 0,`unknown key "${Y}"`],[Z!==void 0,`duplicate key "${Z}"`],[!Ky.has(Bi(re("event"))??""),'"event" is not a Kimi Code hook event'],[ie!==void 0&&Bi(ie)===void 0,'"matcher" is not a string'],[!Bi(re("command")),'"command" is missing or empty'],[pe!==void 0&&!(Number.isInteger(me)&&me>=1&&me<=600),'"timeout" is not an integer from 1 to 600']].find(([Ce])=>Ce)?.[1]}function zy(_){let N=qi(xc(_),"plugins","installed.json"),U=vn(N);if(U.kind==="missing")return;let Y=U.kind==="ok"?Ze(U.value,"plugins"):void 0;if(!Array.isArray(Y))return{platform:"kimi-code",status:"n/a",configPath:N,errors:[`Cannot read ${N}, so doctor cannot tell whether the Kimi Code plugin is installed`]};let Z=Y.find((re)=>Ze(re,"id")===Gi);if(Z===void 0)return;if(Ze(Z,"enabled")!==!0)return{platform:"kimi-code",status:"disabled",method:uo,configPath:N,errors:[`${Gi} is installed but not enabled in Kimi Code; run /plugins enable ${Gi}`]};return{platform:"kimi-code",status:"configured",method:uo,configPath:N}}function po(_){let N=qi(xc(_.environment),"config.toml"),U=()=>zy(_.environment)??{platform:"kimi-code",status:"n/a",configPath:N};if(!Gy(N))return U();let Y;try{Y=By(N,"utf-8")}catch(ie){return{platform:"kimi-code",status:"n/a",configPath:N,errors:[`Failed to read ${N}: ${ie instanceof Error?ie.message:String(ie)}`]}}if(!qy.test(Y))return U();let re=(/"""|'''/.test(Y)?[]:Jy(Y)).flatMap((ie,pe)=>{let me=Wy(ie);return me===void 0?[]:[`Kimi Code ignores every hook because hooks entry ${pe+1} is invalid (${me}); fix it in ${N}`]});return{platform:"kimi-code",status:re.length>0?"disabled":"configured",method:"hook config",configPath:N,errors:re.length>0?re:void 0}}import{readFileSync as $c}from"node:fs";import{join as ur}from"node:path";var un="cc-safety-net",xn="index.js",Bt="openclaw.plugin.json",qt="package.json";var fo="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as Yy,lstatSync as Zy,readdirSync as Xy,readFileSync as Qy}from"node:fs";import{dirname as Pc,join as qn}from"node:path";import{fileURLToPath as eh}from"node:url";var Vi=qn("openclaw",un),vt=`run \`openclaw plugins enable ${un}\``,nh="config reload superseded by a newer runtime config source",th=[xn,Bt,qt];function Ec(_){let N=_.env.get("OPENCLAW_HOME")?.trim();return N?Nn(N,_.home):_.home}function Rc(_){let N=Ec(_),U=_.env.get("OPENCLAW_STATE_DIR")?.trim();if(U)return Nn(U,N);let Y=_.env.get("OPENCLAW_CONFIG_PATH")?.trim();return Y?Pc(Nn(Y,N)):qn(N,".openclaw")}function _c(_){let N=_.env.get("OPENCLAW_CONFIG_PATH")?.trim();return N?Nn(N,Ec(_)):qn(Rc(_),"openclaw.json")}function dr(_){return qn(Rc(_),"extensions",un)}function rh(_){let N=Xy(_);if(N.length===0)return!0;if(N.some((Z)=>!th.includes(Z)))return!1;let U=qn(_,xn),Y=dn(U);return Y!==void 0&&!Y.isSymbolicLink()&&Y.isFile()&&Qy(U,"utf-8").startsWith(fo)}function Ki(_){let N=dr(_),U=dn(N);if(!U)return;if(!U.isSymbolicLink()&&U.isDirectory()&&rh(N))return;throw Error(`Refusing to modify ${N}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function Tc(){let _=Pc(eh(import.meta.url));return[qn(_,Vi),qn(_,"..",Vi),qn(_,"..","..","..","dist",Vi)]}function Ji(_=Tc()){return _.find((N)=>Yy(N)&&Zy(N).isDirectory())}function oh(_=Tc()){let N=Ji(_);if(!N)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return N}function Ic(_=oh()){return[["openclaw","plugins","install",_,"--force","--accept-capabilities"]]}function ih(_){let N=(()=>{try{return JSON.parse(_)}catch{return}})(),U=Ze(Ze(N,"plugin"),"status");return typeof U==="string"?U:void 0}async function sh(){await fn(["openclaw","plugins","enable",un]).catch((_)=>{if(!(_ instanceof Error&&_.message.includes(nh)))throw _})}async function Ac(_){let N=async()=>ih(await fn(["openclaw","plugins","inspect",un,"--runtime","--json"],{stdoutOnly:!0})),U=await N(),Y=U==="disabled"&&_;if(Y)await sh();let Z=Y?await N():U;if(Z==="loaded")return;throw Error(`${Z===void 0?`The ${un} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:Z==="disabled"?`OpenClaw reports the ${un} plugin with status "disabled"; ${vt}.`:`OpenClaw reports the ${un} plugin with status "${Z}".`} Run \`openclaw plugins inspect ${un} --runtime\` for details.`)}var mo="openclaw";function Vt(_,N){let U=ur(_,N),Y=dn(U);if(!Y)return{error:`${N} is missing from ${U}; run install --openclaw`};if(Y.isSymbolicLink()||!Y.isFile())return{error:`${U} is a symlink or not a regular file; move or remove it`};try{return{content:$c(U,"utf-8")}}catch(Z){return{error:`Failed to read ${U}: ${Z instanceof Error?Z.message:String(Z)}`}}}function Dc(_){try{return JSON.parse(yn(_))}catch{return}}function ah(_){let N=Vt(_,Bt);if("error"in N)return N.error;if(Ze(Dc(N.content),"id")===un)return;return`${ur(_,Bt)} is not a valid ${un} manifest; run install --openclaw`}function lh(_){let N=Vt(_,qt);if("error"in N)return N.error;let U=Ze(Ze(Dc(N.content),"openclaw"),"extensions");if(Array.isArray(U)&&U.includes(`./${xn}`))return;return`${ur(_,qt)} does not point OpenClaw at ${xn}; run install --openclaw`}function Oc(_){return Array.isArray(_)?_.filter((N)=>typeof N==="string"):[]}function ch(_){let N=_c(_);if(!dn(N))return`${un} is not enabled; ${vt}`;let U=(()=>{try{return JSON.parse(yn($c(N,"utf-8")))}catch{return}})();if(U===void 0)return`Failed to read ${N}; fix it, then ${vt}`;let Y=Ze(U,"plugins");if(Ze(Y,"enabled")===!1)return`plugins.enabled is false in ${N}; no OpenClaw plugin loads`;let Z=Ze(Ze(Ze(Y,"entries"),un),"enabled");if(Oc(Ze(Y,"deny")).includes(un)||Z===!1)return`${un} is disabled in ${N}; ${vt}`;let re=Oc(Ze(Y,"allow"));if(re.length>0&&!re.includes(un))return`plugins.allow in ${N} does not list ${un}; add it, then ${vt}`;if(re.includes(un)||Z===!0)return;return`${un} is not enabled; ${vt}`}function Nc(_){return/^\/\/ version:\s*(.+)$/m.exec(_)?.[1]?.trim()}function dh(_,N,U){if(U===void 0)return[];let Y=Vt(U,xn);if(!(("content"in Y)&&Nc(Y.content)===N))return[];return[xn,Bt,qt].flatMap((re)=>{let ie=Vt(_,re),pe=Vt(U,re);if("error"in ie||"error"in pe||ie.content===pe.content)return[];return[`Modified ${re} occupies ${ur(_,re)}; run install --openclaw to restore it`]})}function Lc(_){let N=dr(_.environment),U=Br(mo,N);if(U)return U;let Y=Vt(N,xn),re=["error"in Y?Y.error:Y.content.startsWith(fo)?void 0:`Unmanaged ${xn} occupies ${ur(N,xn)}; move or remove it`,ah(N),lh(N)].filter((Ce)=>Ce!==void 0),ie="content"in Y?Nc(Y.content):void 0,pe=re.length>0?re:dh(N,ie,Ji());if(pe.length>0)return{platform:mo,status:"n/a",configPath:N,errors:pe};let me=ie===pn()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],ke=ch(_.environment);if(ke)return{platform:mo,status:"disabled",method:"plugin directory",configPath:N,errors:[ke,...me]};return{platform:mo,status:"configured",method:"plugin directory",configPath:N,errors:me.length>0?me:void 0}}import{existsSync as bh,readFileSync as wh}from"node:fs";import{basename as kh}from"node:path";import{existsSync as go,readFileSync as zi,rmSync as uh}from"node:fs";import{join as In}from"node:path";import{pathToFileURL as ph}from"node:url";var pr="cc-safety-net",bt=`${pr}@latest`,Yi=["opencode.json","opencode.jsonc"],fh=60,mh=250,jc="CCSafetyNetPlugin",gh={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function Hc(_){return In(_.env.get("XDG_CONFIG_HOME")||In(_.home,".config"),"opencode")}function Zi(_){return _.env.get("OPENCODE_CONFIG_DIR")||Hc(_)}function Xi(_){return Yi.map((N)=>In(Zi(_),N))}function Qi(_){return[...new Set([Zi(_),Hc(_)])].flatMap((N)=>Yi.map((U)=>In(N,U)))}function Fc(_){return In(_.env.get("XDG_CACHE_HOME")||In(_.home,".cache"),"opencode","packages",bt)}function Mc(_){uh(Fc(_),{recursive:!0,force:!0})}async function Uc(_){let N=(await fn(["opencode","--version"],{stdoutOnly:!0})).trim(),U=/^(?:opencode\s+)?v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(N),Y=Number(U?.[1]),Z=Number(U?.[2]),re=Number(U?.[3]);if(!U||Y!==1&&Y!==2||Y===1&&(Z<18||Z===18&&re<29)||Y===2&&Z===0&&re<6)throw Error(`OpenCode 1.18.29+ or 2.0.6+ is required; found ${N||"an unknown version"}.`);if(Y===2){for(let ie of Xi(_)){if(!go(ie))continue;let pe=ns(zi(ie,"utf-8"),ie);if(["plugin","plugins"].some((ke)=>{let Ce=Ze(pe,ke);return Array.isArray(Ce)&&Ce.some((Re)=>yo(Re)&&(typeof Re==="string"?Re:Ze(Re,"package"))!==bt)}))throw Error(`Change the cc-safety-net package spec in ${ie} to ${bt}, preserving its options, then retry. Adding another spec would create a duplicate plugin ID.`)}return{commands:[],afterInstall:async()=>{if((await fn(["opencode","plugin","add",bt],{stdoutOnly:!0})).includes("is already configured in"))await Wi(),await fn(["opencode","plugin","update",bt]);let pe=await Wi();if(!/^cc-safety-net\s+\S+\s+cc-safety-net@latest\s*$/m.test(pe))throw Error("OpenCode did not load cc-safety-net from cc-safety-net@latest. Run `opencode plugin list` for details.");let me=["--param",`location[directory]=${process.cwd()}`];await fn(["opencode","api","integration.list",...me]);let ke=await fn(["opencode","api","plugin.list",...me],{stdoutOnly:!0}),Ce=es(ke);if(Ce)throw Error(Ce);if(!Gc(ke).some(Bc))throw Error("OpenCode lists no active cc-safety-net for this directory. Run `opencode api plugin.list` for details.")}}}return Mc(_),{commands:[["opencode","plugin","-g","-f",bt]],afterInstall:()=>hh(_)}}function Gc(_){return yh(_).filter((N)=>Ze(N,"id")===pr||yo(Ze(Ze(N,"source"),"target"))).map((N)=>Ze(N,"state"))}function Bc(_){return Ze(_,"status")==="active"}function es(_){let N=Gc(_);if(N.some(Bc))return;let U=N.find((Y)=>Ze(Y,"status")==="failed");if(!U)return;return`OpenCode reports cc-safety-net failed: ${String(Ze(U,"error")).split(`
`)[0]}`}function yh(_){if(!_)return[];try{let N=Ze(JSON.parse(_),"data");return Array.isArray(N)?N:[]}catch{return[]}}async function Wi(_=1){let N=await fn(["opencode","plugin","list"],{stdoutOnly:!0});if(/^cc-safety-net\s|\scc-safety-net@latest\s*$/m.test(N)||_===fh)return N;return await new Promise((U)=>setTimeout(U,mh)),Wi(_+1)}async function hh(_){let N=In(Fc(_),"node_modules",pr),U=In(N,"package.json");if(!go(U))throw Error(`The OpenCode plugin cache at ${N} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${bt}\` for details.`);let Y=Ze(JSON.parse(zi(U,"utf-8")),"main");if(typeof Y!=="string")throw Error(`The cached OpenCode plugin at ${N} declares no "main" entry.`);let Z=In(N,Y);if(typeof(await import(ph(Z).href))[jc]==="function")return;throw Error(`The cached OpenCode plugin at ${Z} does not export a callable ${jc}, so OpenCode would load nothing and fail open.`)}function ns(_,N){try{return JSON.parse(yn(_))}catch(U){if(U instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${N}: ${U.message}`);throw U}}function yo(_){let N=typeof _==="string"?_:Ze(_,"package");return typeof N==="string"&&(N===pr||N.startsWith(`${pr}@`))}function ts(_){return["plugin","plugins"].some((N)=>{let U=Ze(_,N);return Array.isArray(U)&&U.some(yo)})}function vh(_,N){let Y=["plugin","plugins"].flatMap((Z)=>{let re=fl(_,Z,gh);if(!re)return[];let ie=[],pe=0,me=re.start+1,ke=_.slice(re.start+1,re.end).matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|[^"\s{}[\],/]+|[{}[\],]/g);for(let Ce of ke){if(Ce[0].startsWith("//")||Ce[0].startsWith("/*"))continue;let Re=re.start+1+Ce.index;if(pe===0)me=Re;if(Ce[0]==="{"||Ce[0]==="[")pe++;if(Ce[0]==="}"||Ce[0]==="]")pe--;if(pe!==0||Ce[0]===",")continue;let Ne=Re+Ce[0].length;if(yo(JSON.parse(yn(_.slice(me,Ne)))))ie.push({start:me,end:Ne})}return ie}).sort((Z,re)=>Z.start-re.start).reverse().reduce((Z,re)=>{let ie=/^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*,/.exec(Z.slice(re.end));if(ie?.[0].includes("/")){let pe=re.end+ie[0].length-1;return Z.slice(0,re.start)+Z.slice(re.end,pe)+Z.slice(pe+1)}return pl(Z,re)},_);return ns(Y,N),Y}function qc(_){Mc(_);let N=Qi(_),U=N.find((re)=>go(re)),Y=[],Z=[];for(let re of N){if(!go(re))continue;try{let ie=zi(re,"utf-8");if(!ts(ns(ie,re)))continue;ln(re,vh(ie,re)),Z.push(re)}catch(ie){Y.push(ie instanceof Error?ie.message:String(ie))}}if(Y.length>0)throw Error(Y.join(`
`));return{path:Z[0]??U??In(Zi(_),Yi[0]),alreadyInstalled:Z.length>0}}function Kt(_){let N=[];for(let U of _.openCodeVersion?.startsWith("2.")?Xi(_.environment):Qi(_.environment))if(bh(U))try{let Y=wh(U,"utf-8"),Z=yn(Y),re=JSON.parse(Z);if(ts(re)){let ie=es(_.openCodePluginListOutput);if(ie)return{platform:"opencode",status:"disabled",method:"opencode api plugin.list",configPath:U,errors:[...N,ie]};return{platform:"opencode",status:"configured",method:"plugin array",configPath:U,errors:N.length>0?N:void 0}}}catch(Y){N.push(`Failed to parse ${kh(U)}: ${Y instanceof Error?Y.message:String(Y)}`)}return{platform:"opencode",status:"n/a",errors:N.length>0?N:void 0}}import{join as Vc}from"node:path";var Jc="dist/pi/index.js",Kc=new Set([Jc,"index.js"]),Ch=/[*?[\]{}]/;function rs(_){let N=_.env.get("PI_CODING_AGENT_DIR");return Vc(N?Nn(N,_.home):Vc(_.home,".pi","agent"),"settings.json")}function os(_){if(typeof _!=="string")return!1;return _==="npm:cc-safety-net"||_.startsWith("npm:cc-safety-net@")}function xh(_){if(!Array.isArray(_)||_.length===0)return!1;if(!_.every((Y)=>typeof Y==="string"))return!1;let N=(Y)=>_.some((Z)=>Z.startsWith(Y)&&Z.slice(1).replace(/^\.[/\\]/,"")===Jc);if(N("-"))return!1;if(N("+"))return!0;let U=_.filter((Y)=>!/^[-+!]/.test(Y));return(U.length===0||U.some((Y)=>Kc.has(Y)))&&!_.some((Y)=>Y.startsWith("!")&&(Kc.has(Y.slice(1))||Ch.test(Y)))}function Wc(_){let N=rs(_.environment),U=vn(N);if(U.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(U.kind==="missing")return{platform:"pi",status:"n/a"};let Y=Ze(U.value,"packages");if(!Array.isArray(Y))return{platform:"pi",status:"n/a"};let Z=Y.find((ie)=>os(typeof ie==="string"?ie:Ze(ie,"source")));if(Z===void 0)return{platform:"pi",status:"n/a"};let re=Ze(Z,"extensions");if(re!==void 0&&!xh(re))return{platform:"pi",status:"disabled",method:"package config",configPath:N,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:N}}var Sh={amp:Xa,"antigravity-cli":nl,"claude-code":sl,codex:ll,"copilot-cli":El,cursor:Nl,"deepseek-harness":jl,devin:Vl,droid:Ql,"gemini-cli":ec,"grok-build":dc,"hermes-agent":Cc,"kimi-code":po,openclaw:Lc,opencode:Kt,pi:Wc};function Jt(_,N,U){let Y={...U,cwd:N,environment:_};return Rr.map((Z)=>Ph(Sh[Z](Y)))}function Ph(_){if(_.status==="not-inspected")return{platform:_.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:_.platform,detected:_.status!=="n/a",configured:_.status==="configured",inspectionStatus:_.status!=="n/a"?"verified":_.errors&&_.errors.length>0?"failed":"not-applicable",method:_.method,configPath:_.configPath,configPaths:_.configPaths,errors:_.errors}}import{join as Eh}from"node:path";var Rh=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),_h=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),commandTools:Object.freeze([]),safety:Object.freeze({level:"standard"}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),Th={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function zc(_){let N=Eh(_.tmpdir,"cc-safety-net-self-test"),U=Rh.map((Y)=>{let Z=H(_,l("self-test",{command:Y.command},{kind:"command",shell:"auto"},{configCwd:N,executionCwd:N},Y.command),{guard:{dependencies:{loadPolicySnapshot:()=>_h,getModes:()=>Th,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),re=Y.expectBlocked?"blocked":"allowed",ie=Z.decision.kind==="deny"?"blocked":"allowed";return{command:Y.command,description:Y.description,expected:re,actual:ie,passed:re===ie,reason:Z.decision.kind==="deny"?Z.decision.reason:void 0,ruleId:Z.decision.kind==="deny"?Z.decision.ruleId:void 0}});return{passed:U.filter((Y)=>Y.passed).length,failed:U.filter((Y)=>!Y.passed).length,total:U.length,results:U}}function is(_){let N=mn({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},_);if($n(N.errors))return null;return{json:N.flags.json,skipUpdateCheck:N.flags.skipUpdateCheck}}async function Yc(_,N={}){let U=await er(!N.json,()=>{let Y=Ah(_,N);return{ready:Y,finish:()=>Y}},()=>Qt(),{loadingMessage:"Checking system status…"});if(N.json)console.log(JSON.stringify(U,null,2));else Oh(U);return U.engineSelfTest.failed>0||U.findings.some((Y)=>Y.severity==="error")?1:0}async function Ah(_,N){let U=N.cwd??process.cwd(),Y=await Nr((Me)=>Kt({environment:_,cwd:U,openCodeVersion:Me}).status!=="n/a",void 0,U),Z=Jt(_,U,{ampPluginListOutput:Y.ampPluginListOutput,codexPluginListOutput:Y.codexPluginListOutput,copilotCliVersion:Y.versions["copilot-cli"],openCodeVersion:Y.versions.opencode,openCodePluginListOutput:Y.openCodePluginListOutput}),re=ga(_,U),ie=ya(_),pe=R(_,{cwd:U}),me=pe.policy,ke=P(me,_.env),Ce=q(me,ke.capabilities),Re=Ar(_,7),Ne=Ja(_,U),_e=[Nt(U),Lt(_)].filter((Me)=>Ih(Me)),Te=N.skipUpdateCheck?{currentVersion:pn(),latestVersion:null,updateAvailable:!1}:await Gn(),We={hooks:Z,engineSelfTest:zc(_),userConfig:re.userConfig,projectConfig:re.projectConfig,configState:ze(pe),effectiveRules:re.effectiveRules,environment:ie,effectiveSafety:{selectedPreset:me.safety.level,level:ke.effectiveLevel,capabilities:ke.capabilities,ruleOverrides:me.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(Ce).filter(([,Me])=>Me.source==="rule_override"&&Me.override==="off"&&Me.inheritedEnabled&&Me.changesInherited).map(([Me])=>Me),ruleCounts:{stored:Object.keys(me.destructiveCommandRuleOverrides).length,effective:Object.values(Ce).filter((Me)=>Me.changesInherited).length},...pe.policyScopes?{policyScopes:pe.policyScopes}:{}},...Ne.length>0?{v2Leftovers:Ne}:{},..._e.length>0?{legacyConfigs:_e}:{},posture:Ia(_,re.userConfig.path),activity:Re,update:Te,system:Y};return{...We,findings:va(We)}}function Oh(_){console.log(),console.log(wa(_.hooks)),console.log(),console.log(ka(_.engineSelfTest)),console.log(),console.log(Ca(_)),console.log(),console.log(xa(_.environment)),console.log(),console.log(Sa(_)),console.log(),console.log(Pa(_.findings)),console.log(),console.log(Ea(_.activity)),console.log(),console.log(_a(_.system)),console.log(),console.log(Ra(_.update)),console.log(Ta(_))}import{existsSync as $h}from"node:fs";var Dh=/^[A-Za-z0-9_@%+=:,./-]+$/,Zc="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function ss(_){let N=mn({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},_);if($n(N.errors))return console.error(Zc),console.error("Pass -- before a command that starts with dashes."),null;if(N.values.cwd!==void 0&&!$h(N.values.cwd))return console.error(`Error: --cwd path does not exist: ${N.values.cwd}`),null;let U=N.positionals.length===1?N.positionals[0]:N.positionals.map((Y)=>Dh.test(Y)?Y:`'${Y.replaceAll("'","'\\''")}'`).join(" ");if(!U)return console.error("Error: No command provided"),console.error(Zc),null;return{json:N.flags.json,cwd:N.values.cwd,command:U}}function Xc(_){if(_)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function Qc(_,N){let Y=N-18;return[`${_.dtl}${_.dh.repeat(N)}${_.dtr}`,`${_.dv}  Command Analysis${" ".repeat(Y)}${_.dv}`,`${_.dbl}${_.dh.repeat(N)}${_.dbr}`]}function as(_){return JSON.stringify(_)}function ed(_,N=0){return`[${_.map((Y,Z)=>ba(Y,Z,N)).join(",")}]`}function fr(_,N,U=70){let Y=_.split(" "),Z=[],re="";for(let ie of Y)if(re&&re.length+ie.length+1>U)Z.push(re),re=ie;else re=re?`${re} ${ie}`:ie;if(re)Z.push(re);return Z.map((ie,pe)=>pe===0?ie:`${N}${ie}`)}function nd(_,N,U){let Y=[];switch(_.type){case"parse":return null;case"env-strip":return Y.push(""),Y.push(`STEP ${N} ${U.h} Strip environment variables`),Y.push(`  Removed: ${_.envVars.map((Z)=>`${Z}=<redacted>`).join(", ")}`),Y.push(`  Tokens:  ${as(_.output)}`),{lines:Y,incrementStep:!0};case"leading-tokens-stripped":return Y.push(""),Y.push(`STEP ${N} ${U.h} Strip wrappers`),Y.push(`  Removed: ${_.removed.join(", ")}`),Y.push(`  Tokens:  ${as(_.output)}`),{lines:Y,incrementStep:!0};case"shell-wrapper":return Y.push(""),Y.push(`STEP ${N} ${U.h} Detect shell wrapper`),Y.push(`  Wrapper: ${_.wrapper} -c`),Y.push(`  Inner:   ${_.innerCommand}`),{lines:Y,incrementStep:!0};case"interpreter":{if(Y.push(""),Y.push(`STEP ${N} ${U.h} Detect interpreter`),Y.push(`  Interpreter: ${_.interpreter}`),Y.push(`  Code:        ${_.codeArg}`),_.paranoidBlocked)Y.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:Y,incrementStep:!0}}case"busybox":return Y.push(""),Y.push(`STEP ${N} ${U.h} Busybox wrapper`),Y.push(`  Subcommand: ${_.subcommand}`),{lines:Y,incrementStep:!0};case"transparent-wrapper":return Y.push(""),Y.push(`STEP ${N} ${U.h} Transparent wrapper`),Y.push(`  Wrapper: ${_.wrapper}`),Y.push(`  Tokens:  ${as(_.output)}`),{lines:Y,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(Y.push(""),Y.push(`STEP ${N} ${U.h} Match rules`),Y.push(`  Rule:   ${_.rule}()`),_.matched)Y.push("  Result: MATCHED");else Y.push("  Result: No match");return{lines:Y,incrementStep:!0}}case"worktree-relaxation":return Y.push(""),Y.push(`STEP ${N} ${U.h} Worktree relaxation`),Y.push(`  Mode:   ${n.worktree.name}`),Y.push(`  Git cwd: ${_.gitCwd}`),Y.push("  Result: Allowed local discard in linked worktree"),{lines:Y,incrementStep:!0};case"temp-root-relaxation":return Y.push(""),Y.push(`STEP ${N} ${U.h} Temp-root relaxation`),Y.push(`  Git cwd: ${_.gitCwd}`),Y.push("  Result: Allowed git discard in a temp-root repository"),{lines:Y,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(_.embeddedCommandFound)return Y.push(""),Y.push(`STEP ${N} ${U.h} Fallback scan`),Y.push(`  Found: ${_.embeddedCommandFound}`),{lines:Y,incrementStep:!0};return null}case"custom-rules-check":{if(_.rulesChecked){if(Y.push(""),Y.push(`STEP ${N} ${U.h} Custom rules`),_.matched)Y.push("  Result: MATCHED");else Y.push("  Result: No match");return{lines:Y,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(_.matched)return Y.push(""),Y.push(`STEP ${N} ${U.h} Dangerous text check`),Y.push(`  Token:  ${_.token}`),Y.push("  Result: MATCHED"),{lines:Y,incrementStep:!0};return null}case"strict-unparseable":return Y.push(""),Y.push(`STEP ${N} ${U.h} Strict mode check`),Y.push(`  Command: ${_.rawCommand}`),Y.push("  Result:  ✗ UNPARSEABLE"),{lines:Y,incrementStep:!0};case"segment-skipped":return null;case"error":return Y.push(""),Y.push(`ERROR: ${_.message}`),{lines:Y,incrementStep:!1};default:return _}}function ls(_,N){let U=Xc(N?.asciiOnly??!1),Y=58,Z=[],re=1;Z.push(...Qc(U,58)),Z.push("");let ie=_.trace.steps.find((Te)=>Te.type==="error");if(ie&&ie.type==="error"){Z.push("ERROR"),Z.push(`  ${ie.message}`),Z.push(""),Z.push("RESULT"),Z.push(`  Status: ${_.result==="blocked"?en.red("BLOCKED"):en.green("ALLOWED")}`),Z.push(""),Z.push("CONFIG");let Te=_.configSource??"none";return Z.push(`  Path: ${Te}`),Z.join(`
`)}let pe=_.trace.steps.find((Te)=>Te.type==="parse");if(pe&&pe.type==="parse"){Z.push("INPUT"),Z.push(`  ${pe.input}`),Z.push(""),Z.push(`STEP ${re} ${U.h} Split shell commands`),re++;for(let Te=0;Te<pe.segments.length;Te++){let We=pe.segments[Te];if(We){let Me=Math.random();Z.push(`  Segment ${Te+1}: ${ed(We,Me)}`)}}}let me=_.trace.segments,ke=me.length>1;for(let Te of me){if(ke){Z.push("");let tn="";if(pe&&pe.type==="parse"){let Uo=pe.segments[Te.index];if(Uo)tn=Uo.join(" ")}let on=54,an=tn,nn=` Segment ${Te.index+1}: `,sn=" ";if(tn){if(nn.length+tn.length+sn.length>on){let af=on-nn.length-sn.length;an=`${tn.substring(0,af-1)}…`}}let Sn=tn?`${nn}${an}${sn}`:` Segment ${Te.index+1} `,of=tn?`${nn}${en.cyan(an)}${sn}`:Sn,Bs=58-Sn.length,qs=Math.floor(Bs/2),sf=Bs-qs;Z.push(`${U.sh.repeat(qs)}${of}${U.sh.repeat(sf)}`)}if(Te.steps.find((tn)=>tn.type==="segment-skipped")){Z.push(""),Z.push("  (skipped — prior segment blocked)");continue}let Me=!1,Ye=!1;for(let tn of Te.steps){let on=nd(tn,re,U);if(on){if(Ye=!0,tn.type==="recurse"){Z.push("");let an=" RECURSING ",nn=58-an.length-4;Z.push(`  ${U.tl}${U.h}${an}${U.h.repeat(nn)}`),Z.push(`  ${U.v}`),Me=!0;continue}for(let an of on.lines)if(Me)Z.push(`  ${U.v} ${an}`);else Z.push(an);if(on.incrementStep)re++}}if(Me)Z.push(`  ${U.v}`),Z.push(`  ${U.bl}${U.h.repeat(56)}`);if(!Ye)Z.push(""),Z.push(`  ${en.green("✓")} Allowed (no matching rules)`)}if(Z.push(""),Z.push("RESULT"),_.result==="blocked"){if(Z.push(`  Status: ${en.red("BLOCKED")}`),_.customRule){if(Z.push(`  Rule: ${_.customRule.id}`),_.customRule.rulebook)Z.push(`  Rulebook: ${_.customRule.rulebook.name} ${_.customRule.rulebook.version}`);if(_.customRule.source)Z.push(`  Source: ${_.customRule.source}`);if(_.customRule.override)Z.push(`  Override: reason ${_.customRule.override.reason}`)}if(_.reason){let Te=fr(_.reason,"          ");Z.push(`  Reason: ${Te[0]}`);for(let We=1;We<Te.length;We++)Z.push(Te[We]??"")}}else Z.push(`  Status: ${en.green("ALLOWED")}`);Z.push(""),Z.push("CONFIG");let Ce=_.configSource??"none",Re=_.configValid?"":" (invalid)";Z.push(`  Path: ${Ce}${Re}`);let Ne=_.safetyPresetScope;Z.push(`  Safety preset: ${_.selectedPreset??"standard"}${Ne?` (${Or(Ne)})`:""}`),Z.push(`  Effective capabilities: ${_.effectiveLevel}`);let _e=Object.entries(_.destructiveCommandRuleOverrides??{});if(Z.push(`  Rule customizations: ${_e.length}`),_.ruleActivation)Z.push(`  Rule activation: ${_.ruleActivation.id} — ${_.ruleActivation.enabled?"on":"off"} via ${_.ruleActivation.source}`);return Z.join(`
`)}function cs(_){return JSON.stringify(_,null,2)}import{resolve as Fh}from"node:path";var Nh=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function td(_){let N=0,U={allocateSegment(){return N++},getNextSegmentIndex(){return N},recordGlobal(Y){_.record({kind:"step",scope:"global",step:Y})},recordSegment(Y,Z=U.currentSegmentIndex){if(Z===void 0)return;_.record({kind:"step",scope:"segment",segmentIndex:Z,step:Y})}};return U}function rd(_={}){let N=[],U=_.maxEvents??512,Y={maxTextLength:_.maxTextLength??2048,maxListLength:_.maxListLength??128,maxObjectProperties:_.maxObjectProperties??_.maxListLength??128,maxDepth:_.maxDepth??16},Z,re=new Set;return{record(ie){if(Z)return;if(!ie||N.length>=U)return;try{N.push(ps(Lh(ie,Y,re)))}catch{}},finish(){if(Z)return Z;return Z=ps({events:Object.freeze(N)}),Z}}}function Lh(_,N,U){if(_.kind!=="step")throw TypeError("invalid trace event");let{scope:Y,step:Z}=_;ho(Z,U,N);let re=ds(Z,N,U);if(Y==="global")return{kind:"step",scope:"global",step:re};if(Y!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:_.segmentIndex,step:re}}function ho(_,N,U,Y=0,Z=new WeakSet){if(typeof _==="string"){let pe=_.slice(0,U.maxTextLength);if(!nt(pe))return;for(let me of yt(pe))for(let ke of me.match(/[^\s"'()$]+/g)??[])N.add(od(ke));return}if(!_||typeof _!=="object"||Y>=U.maxDepth||Z.has(_))return;if(Z.add(_),Array.isArray(_)){let pe=Math.min(_.length,U.maxListLength);for(let me=0;me<pe;me++)ho(_[me],N,U,Y+1,Z);return}let re=0,ie=new Set;for(let pe in _){if(!Object.hasOwn(_,pe))continue;if(re>=U.maxObjectProperties)break;re++,ho(pe,N,U);let me=us(pe,U,N);if(ie.has(me))continue;ie.add(me),ho(_[pe],N,U,Y+1,Z)}}function ds(_,N,U,Y=0,Z=new WeakSet){if(typeof _==="string")return us(_,N,U);if(!_||typeof _!=="object")return _;if(Y>=N.maxDepth)return;if(Z.has(_))return;if(Z.add(_),Array.isArray(_)){let pe=[],me=Math.min(_.length,N.maxListLength);for(let ke=0;ke<me;ke++)pe.push(ds(_[ke],N,U,Y+1,Z));return pe}let re={},ie=0;for(let pe in _){if(!Object.hasOwn(_,pe))continue;if(ie>=N.maxObjectProperties)break;ie++;let me=us(pe,N,U);if(Object.hasOwn(re,me))continue;Object.defineProperty(re,me,{value:ds(_[pe],N,U,Y+1,Z),enumerable:!0,configurable:!0,writable:!0})}return re}function us(_,N,U){let Y=_.slice(0,N.maxTextLength),Z=nt(Y)?tt(Y):Y,re=U.size>0?Hh(Z,U):Z;return(jh(re)?Le(re):re).slice(0,N.maxTextLength)}function jh(_){return _.includes("PRIVATE KEY")||_.includes("://")||_.includes("eyJ")||_.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(_)||_.length>=14&&Nh.some((N)=>_.includes(N))||_.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(_)}function Hh(_,N){return _.replace(/[^\s"'()$]+/g,(U)=>N.has(od(U))?"<redacted>":U)}function od(_){let N=2166136261,U=2166136261;for(let Y=0;Y<_.length;Y++)N=Math.imul(N^_.charCodeAt(Y),16777619),U=Math.imul(U^_.charCodeAt(_.length-Y-1),16777619);return`${N>>>0}:${U>>>0}:${_.length}`}function ps(_){if(_&&typeof _==="object"&&!Object.isFrozen(_)){for(let N of Object.values(_))ps(N);Object.freeze(_)}return _}function mr(_,N={},U){let Y=Fh(N.cwd??process.cwd()),Z=N.policySnapshot??R(U,{cwd:Y,userConfigDir:N.userConfigDir}),re=P(Z.policy,U.env),ie=Ve({policySnapshot:Z,effectiveCapabilities:re.capabilities,strict:re.strict,paranoidRm:re.paranoidRm,paranoidInterpreters:re.paranoidInterpreters,worktreeMode:re.worktreeMode}),pe={effectiveLevel:ie.effectiveLevel,selectedPreset:Z.policy.safety.level,...Z.policyScopes?{safetyPresetScope:Z.policyScopes.levelScope}:{},effectiveCapabilities:ie.effectiveCapabilities,destructiveCommandRuleOverrides:Z.policy.destructiveCommandRuleOverrides},{configSource:me,configValid:ke}=Uh(U,{cwd:Y,userConfigDir:N.userConfigDir});if(!_||!_.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:me,configValid:ke,...pe};let Ce=y(_,"auto");if(Ce.status==="limited")throw new b;let Re=Ce.dialect==="powershell"?y(_,"posix"):Ce,Ne=kt(Re),_e=rd(),Te=td(_e);Te.recordGlobal({type:"parse",input:_,segments:Ne.map((Sn)=>[...Sn])});let We=l("Bash",{command:_},{kind:"command",shell:"auto"},{configCwd:Y,executionCwd:Y},_),Me=K(We,{environment:U,trace:Te,dependencies:{loadPolicySnapshot:()=>Z}}),Ye=Me.decision.kind==="deny"?Me.decision:null;if(Ye&&(Me.stage==="policy-protection"||Me.stage==="secret-protection"))return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:Mh(Ye),matched:!0,reason:Ye.reason}]}]},result:"blocked",reason:T(Ye.reason),segment:T(id(Ye,_)),ruleId:T(Ye.ruleId),configSource:me,configValid:ke,...pe};let tn=Te.getNextSegmentIndex();if(Ye&&tn>0&&tn<Ne.length)Te.recordSegment({type:"segment-skipped",index:tn,reason:"prior-segment-blocked"},tn);let on=_e.finish(),an=Ye?.ruleId??Gh(We,Z,re,U),nn=V.find((Sn)=>Sn.id===an&&Sn.activationCapability),sn=nn?ie.policy.effectiveDestructiveCommandRules[nn.id]:void 0;return{trace:qh(on),result:Ye?"blocked":"allowed",reason:Ye?T(Ye.reason):void 0,segment:Ye?T(id(Ye,_)):void 0,ruleId:Ye?T(Ye.ruleId):void 0,customRule:Bh(Vh(Ye?.ruleId,Z)),configSource:me,configValid:ke,...pe,...nn&&sn?{ruleActivation:{id:nn.id,...sn}}:{}}}function id(_,N){return _.evidence?.segment??N}function Mh(_){if(_.reason===Ke)return"policy-protection:findPolicyConfigMutationTargetInSemanticFacts";if(_.reason===qe)return"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts";if(_.reason===v)return"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts";return"secret-protection:findSensitiveTargetInSemanticFacts"}function Uh(_,N){let U=I(N.cwd),Y=B(_,N),Z=Q(_,{cwd:N.cwd,userConfigDir:N.userConfigDir});try{if(r(Z.projectConfigTarget)!==null){if(Un(Z.projectConfigTarget).errors.length===0)return{configSource:U,configValid:!0};return{configSource:U,configValid:!1}}}catch(re){if(re instanceof o)return{configSource:U,configValid:!1};throw re}try{if(r(Z.userConfigTarget)!==null){let re=Un(Z.userConfigTarget);return{configSource:Y,configValid:re.errors.length===0}}return{configSource:null,configValid:!0}}catch(re){if(re instanceof o)return{configSource:Y,configValid:!1};throw re}}function Gh(_,N,U,Y){let Z=N.policy,re=De({...Z,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...Z.destructiveCommandRuleOverrides,...Object.fromEntries(V.flatMap((pe)=>pe.activationCapability?[[pe.id,"on"]]:[]))}},N.state==="degraded"?{diagnostics:N.diagnostics,reason:N.reason}:void 0),ie=K(_,{environment:Y,dependencies:{loadPolicySnapshot:()=>re,getModes:()=>({...U,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return ie.decision.kind==="deny"?ie.decision.ruleId:void 0}function Bh(_){if(!_)return;return{id:T(_.id),..._.rulebook?{rulebook:{name:T(_.rulebook.name),version:T(_.rulebook.version)}}:{},..._.source?{source:T(_.source)}:{},..._.override?{override:{type:"reason",reason:T(_.override.reason)}}:{}}}function qh(_){let N=_.events.flatMap((Y)=>Y.kind==="step"&&Y.scope==="global"?[Y.step]:[]),U=new Map;for(let Y of _.events){if(Y.kind!=="step"||Y.scope!=="segment")continue;let Z=U.get(Y.segmentIndex)??{index:Y.segmentIndex,steps:[]};Z.steps.push(Y.step),U.set(Y.segmentIndex,Z)}return{steps:N,segments:[...U.values()]}}function Vh(_,N){let U=_?.replace(/^custom\./,"");if(!U||!N.policy.rules.some((Y)=>Y.name===U))return;return N.ruleMetadata[U]??Object.freeze({id:U})}function sd(_){return new Promise((N)=>{process.stdout.write(`${_}
`,()=>N())})}async function ad(_,N){let U=ss(N);if(!U)return 1;try{let Y=mr(U.command,{cwd:U.cwd},_),Z=!!process.env.NO_COLOR||!process.stdout.isTTY;return await sd(U.json?cs(Y):ls(Y,{asciiOnly:Z})),0}catch(Y){let Z=Kh(Y instanceof f?Y.cause:Y);if(Z===void 0)throw Y;if(U.json)return await sd(JSON.stringify({error:Z})),1;return console.error(Z),1}}function Kh(_){if(_ instanceof b)return _.message;if(_ instanceof m)return _.message;if(_ instanceof s&&a[_.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var ld="2.6.11",Rn="  ",Pt="cc-safety-net";function cd(_){return _.argument?`${_.flags} ${_.argument}`:_.flags}function Jh(_){return Math.max(..._.map((N)=>cd(N).length))}function Wh(_){return Math.max(..._.map((N)=>N.usage.length))}function zh(_){return Math.max(..._.map((N)=>`${Pt} ${N.usage}`.length))}function Yh(_,N){let U=`${Pt} ${_.usage}`;return`${Rn}${U.padEnd(N+2)}${_.description}`}function An(_,N){return`${Rn}${_.padEnd(Math.max(40,_.length+2))}${N}`}function Wt(_,N=console.log){let U=[];if(U.push(`${Pt} ${_.name}`),U.push(""),U.push(`${Rn}${_.description}`),U.push(""),U.push("USAGE:"),U.push(`${Rn}${Pt} ${_.usage}`),U.push(""),_.subcommands&&_.subcommands.length>0){U.push("SUBCOMMANDS:");let Y=Wh(_.subcommands);for(let Z of _.subcommands)U.push(`${Rn}${Z.usage.padEnd(Y+2)}${Z.description}`);U.push("")}if(_.options.length>0){U.push("OPTIONS:");let Y=Jh(_.options);for(let Z of _.options){let re=cd(Z),ie=Z.default?`${Z.description} (default: ${Z.default})`:Z.description;U.push(`${Rn}${re.padEnd(Y+2)}${ie}`)}U.push("")}if(_.examples&&_.examples.length>0){U.push("EXAMPLES:");for(let Y of _.examples)U.push(`${Rn}${Y}`)}N(U.join(`
`))}function fs(){let _=zh(Tr),N=[];N.push(`${Pt} v${ld}`),N.push(""),N.push("Blocks destructive commands and secret access."),N.push(""),N.push("COMMANDS:");for(let U of Tr)N.push(Yh(U,_));N.push(""),N.push("GLOBAL OPTIONS:"),N.push(`${Rn}-h, --help       Show help (use with command for command-specific help)`),N.push(`${Rn}-V, --version    Show version`),N.push(""),N.push("HELP:"),N.push(`${Rn}${Pt} help <command>     Show help for a specific command`),N.push(`${Rn}${Pt} <command> --help   Show help for a specific command`),N.push(""),N.push("ENVIRONMENT VARIABLES:"),N.push(An(`${n.level.name}=standard|strict|paranoid`,"Set session safety level")),N.push(An(`${n.worktree.name}=1`,"Allow local git discards in linked worktrees")),N.push(An(`${n.debug.name}=1`,"Print diagnostic messages to stderr")),N.push(An(`${n.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),N.push(An(`${n.projectTightenOnly.name}=1`,"Ignore project policy settings that weaken the user policy")),N.push(An("CC_SAFETY_NET_HOME","Override rule config home directory")),N.push(""),N.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),N.push(An(`${n.strict.name}=1`,"Force safety.overrides.fail_closed on")),N.push(An(`${n.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),N.push(An(`${n.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),N.push(An(`${n.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),N.push(""),N.push("Documentation:        https://ccsafetynet.com/docs"),console.log(N.join(`
`))}function dd(){console.log(ld)}function gr(_,N=console.log){let U=Ir(_);if(!U)return!1;if(U.name.toLowerCase()!==_.toLowerCase())return!1;return Wt(U,N),!0}import{existsSync as Po,readFileSync as yu}from"node:fs";import{join as So}from"node:path";import*as Vn from"node:readline";function Zh(_){return _==="install"?"Install":"Uninstall"}function Xh(_){return _==="install"?"Installing":"Uninstalling"}function Qh(_){return _==="install"?"into":"from"}function fd(_){return _?.available===!0}function ev(_,N){let U=new Set(N);return _.filter((Y)=>U.has(Y.target)).map((Y)=>Y.target)}function ud(_,N,U){if(_.every((Y)=>!Y.available))return N;return Array.from({length:_.length},(Y,Z)=>Z+1).map((Y)=>(N+Y*U+_.length)%_.length).find((Y)=>fd(_[Y]))}function nv(_,N,U){if(U.ctrl&&U.name==="c")return"interrupt";if(U.name==="escape"||N==="q")return"abort";if(_==="install"&&(N==="u"||N==="U"))return"update";if(U.name==="up"||N==="k")return"up";if(U.name==="down"||N==="j")return"down";if(U.name==="space"||N===" ")return"toggle";if(U.name==="return"||U.name==="enter")return"confirm";return null}function tv(_){return{cursor:_.findIndex((N)=>N.available),selected:[]}}function rv(_,N,U){if(U==="confirm"||U==="update"||U==="abort"||U==="interrupt")return{state:_,done:U};if(U==="up")return{state:{..._,cursor:ud(N,_.cursor,-1)}};if(U==="down")return{state:{..._,cursor:ud(N,_.cursor,1)}};let Y=N[_.cursor];if(!fd(Y))return{state:_};let Z=_.selected.includes(Y.target)?_.selected.filter((re)=>re!==Y.target):ev(N,[..._.selected,Y.target]);return{state:{..._,selected:Z}}}var md="◉",gd="◯",yd=">",hd=" ";function ov(_,N,U){return["",`${Zh(_)} CC Safety Net ${Qh(_)}:`,"",...N.map((Y,Z)=>{let re=U.selected.includes(Y.target),ie=Z===U.cursor,pe=re?md:gd,me=ie?yd:hd,ke=Y.available?"":` (${Y.unavailableReason??"not installed"})`,Ce=`${pe} ${Y.label}${ke}`,Re=!Y.available?en.dim(Ce):re?en.green(Ce):ie?en.bold(Ce):Ce;return`${me} ${Re}`}),"",_==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":N.some((Y)=>Y.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${_}. q/Esc: close`].join(`
`)}var pd=["global-hook","plugin"];function iv(_,N,U={}){let Y=U.color!==!1?en.bold:(re)=>re;return["","Install the Kimi Code integration as:","",...[`Global hook — ${N?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((re,ie)=>{let pe=ie===_,me=`${pe?md:gd} ${re}`;return`${pe?yd:hd} ${pe?Y(me):me}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function vd(_){let{input:N,output:U}=_;Vn.emitKeypressEvents(N);let Y=N.isRaw===!0;N.setRawMode(!0),N.resume();let Z=0,re=()=>{if(Z===0)return;Vn.moveCursor(U,0,-Z),Vn.cursorTo(U,0),Vn.clearScreenDown(U)},ie=()=>{re();let pe=_.render();U.write(`${pe}
`),Z=pe.split(`
`).length};return new Promise((pe)=>{let me=(Ce)=>{N.off("keypress",ke),N.setRawMode(Y),N.pause(),re(),pe(Ce)};function ke(Ce,Re){_.onKey(Ce,Re,{finish:me,draw:ie})}N.on("keypress",ke),ie()})}function bd(_={}){let N=0;return vd({input:_.input??process.stdin,output:_.output??process.stdout,render:()=>iv(N,_.globalHookInstalled===!0),onKey:(U,Y,Z)=>{if(Y.ctrl&&Y.name==="c"){Z.finish(null),(_.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(Y.name==="escape"||U==="q")return Z.finish(null);if(Y.name==="return"||Y.name==="enter")return Z.finish(pd[N]);if(Y.name==="up"||Y.name==="down"||U==="k"||U==="j")N=(N+1)%pd.length,Z.draw()}})}function ms(_=process.stdin,N=process.stdout){return Boolean(_.isTTY&&N.isTTY&&typeof _.setRawMode==="function")}function wd(_,N,U={}){let Y=U.output??process.stdout,Z=tv(N);return vd({input:U.input??process.stdin,output:Y,render:()=>ov(_,N,Z),onKey:(re,ie,pe)=>{let me=nv(_,re,ie);if(!me)return;let ke=rv(Z,N,me);if(Z=ke.state,ke.done==="interrupt"){pe.finish(null),(U.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(ke.done==="abort")return pe.finish(null);if(ke.done==="update")return pe.finish("update");if(ke.done==="confirm"){if(Z.selected.length===0){Y.write("\x07"),pe.draw();return}pe.finish([...Z.selected]),Y.write(`${Xh(_)} selected integrations...
`);return}pe.draw()}})}import{existsSync as kd,lstatSync as av,mkdirSync as lv,mkdtempSync as cv,readdirSync as dv,readFileSync as Yt,rmSync as bo}from"node:fs";import{basename as uv,dirname as pv,join as Cn}from"node:path";import{fileURLToPath as fv}from"node:url";var gs="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",Rt="cc-safety-net",_t="cc-safety-net/index.ts";import{spawn as sv}from"node:child_process";var ys=(_,N)=>{let U=Xn([..._],process.env);return new Promise((Y)=>{let Z=sv(U.cmd,U.args,{cwd:N,stdio:["ignore","pipe","pipe"]}),re=di(Z),ie=!1,pe=setTimeout(()=>{ie=!0,Z.kill()},120000);Z.on("error",(me)=>{clearTimeout(pe),Y({status:null,errorCode:me.code,stdout:re.stdout,stderr:[me.message,re.stderr].filter(Boolean).join(`
`)})}),Z.on("close",(me)=>{clearTimeout(pe),Y({status:ie?null:me,errorCode:ie?"ETIMEDOUT":void 0,stdout:re.stdout,stderr:re.stderr})})})};var zt="cc-safety-net.ts",hs=Cn("amp",_t);function mv(_){return Cn(_.home,".config","amp","plugins","cc-safety-net.ts")}function gv(){let _=pv(fv(import.meta.url)),N=Cn(_,hs),U=Cn(_,"..",hs),Y=Cn(_,"..","..","..","dist",hs);return[N,U,Y]}function yv(_=gv()){let N=_.find((U)=>kd(U)&&av(U).isFile());if(!N)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return N}function Cd(_){try{return JSON.parse(_)}catch{return}}function wo(_){return _.subarray(0,Buffer.byteLength(gs)).toString("utf-8")===gs}async function yr(_,N,U){let Y=await _(N,U);if(Y.status===0)return Y;throw Error([`Failed to run ${N.join(" ")}${Y.status===null?"":` (exit ${Y.status})`}.`,[Y.stdout,Y.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function xd(_){let N=await _(["amp","plugins","repositories","--json"]);if(N.status===null)throw Error(`${N.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${N.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${N.stderr}`.trim());if(N.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${N.status}). Sign in with "amp login" and rerun install --amp.
${[N.stdout,N.stderr].filter(Boolean).join(`
`)}`.trim());let U=Cd(N.stdout),Y=(Array.isArray(U)?U:[]).filter((Z)=>Ze(Z,"scope")==="user"&&Ze(Z,"exists")===!0&&Ze(Z,"viewerCanWrite")===!0).map((Z)=>Ze(Z,"cloneRef")).find((Z)=>typeof Z==="string"&&Z.length>0);if(!Y)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return Y}async function Sd(_,N,U){let Y=cv(Cn(N.tmpdir,"cc-safety-net-amp-"));try{return await yr(_,["amp","clone","user-plugins",Y]),await U(Y)}finally{bo(Y,{recursive:!0,force:!0})}}function vs(_){return`rerun ${_==="overwrite"?"install":"uninstall"} --amp`}function Pd(_,N,U){let Y=Cn(_,N),Z=dn(Y);if(!Z)return;if(Z.isSymbolicLink()||!Z.isFile())throw Error(`Refusing to ${U} ${N} in your Amp personal plugins repository: not a regular file. Remove it there and ${vs(U)}.`);let re=Yt(Y);if(wo(re))return re;throw Error(`Refusing to ${U} unmanaged file ${N} in your Amp personal plugins repository. Remove it there and ${vs(U)}.`)}function Ed(_,N){let U=Cn(_,Rt),Y=dn(U);if(!Y)return;if(Y.isSymbolicLink()||!Y.isDirectory())throw Error(`Refusing to ${N} ${Rt} in your Amp personal plugins repository: not a regular directory. Remove it there and ${vs(N)}.`);return Pd(_,_t,N)}function hv(_){let N=Cn(_,zt),U=dn(N);if(!U||U.isSymbolicLink()||!U.isFile())return;let Y=Yt(N);return wo(Y)?Y:void 0}async function Rd(_,N,U,Y){if(await yr(_,U,N),(await yr(_,["git","status","--porcelain"],N)).stdout.trim()==="")return!1;return await yr(_,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",Y],N),await yr(_,["git","push","origin","HEAD"],N),!0}function vo(_,N){vv(_,N),bv(_,N)}function _d(_,N){if(N==="keep")return;throw Error(`Local Amp plugin ${_} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function vv(_,N){let U=mv(_),Y=dn(U);if(!Y)return;if(!Y.isSymbolicLink()&&Y.isFile()&&wo(Yt(U))){bo(U);return}_d(U,N)}function bv(_,N){let U=Cn(_.home,".config","amp","plugins",Rt),Y=dn(U);if(!Y)return;if(!Y.isSymbolicLink()&&Y.isDirectory()&&wv(U)){bo(U,{recursive:!0});return}_d(U,N)}function wv(_){let N=uv(_t);if(dv(_).join("\x00")!==N)return!1;let U=Cn(_,N),Y=dn(U);return!!Y&&!Y.isSymbolicLink()&&Y.isFile()&&wo(Yt(U))}function kv(_){let N=u(_);if(!kd(N))return"";let U=Cd(Yt(N,"utf-8"));if(!U||typeof U!=="object"||Array.isArray(U))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(k(U,_.home))};
`}async function Td(_,N=yv(),U=ys){let Y=Buffer.concat([Yt(N),Buffer.from(kv(_),"utf-8")]),Z=await xd(U);return Sd(U,_,async(re)=>{let ie=`${Z}/${Rt}`,pe=Ed(re,"overwrite"),me=Pd(re,zt,"overwrite");if(pe?.equals(Y)&&!me)return vo(_,"fail"),{path:ie,alreadyInstalled:!0};if(lv(Cn(re,Rt),{recursive:!0}),ln(Cn(re,_t),Y),me)bo(Cn(re,zt));let ke=await Rd(U,re,["git","add","--",_t,...me?[zt]:[]],`chore: update cc-safety-net plugin to v${pn()}`);return vo(_,"fail"),{path:ie,alreadyInstalled:!ke}})}async function Id(_,N=ys){let U=await xd(N);return Sd(N,_,async(Y)=>{let Z=Ed(Y,"remove"),re=hv(Y),ie=`${U}/${re&&!Z?zt:Rt}`;if(!Z&&!re)return vo(_,"keep"),{path:ie,alreadyInstalled:!1};return await Rd(N,Y,["git","rm","--",...Z?[_t]:[],...re?[zt]:[]],`chore: remove cc-safety-net plugin v${pn()}`),vo(_,"keep"),{path:ie,alreadyInstalled:!0}})}import{existsSync as Ad,mkdirSync as Cv,readFileSync as xv}from"node:fs";import{dirname as Sv}from"node:path";var bs=kn["antigravity-cli"],Tt="cc-safety-net";function It(_){return Boolean(_)&&typeof _==="object"&&!Array.isArray(_)}function Co(){return{PreToolUse:[{hooks:[{type:"command",command:bs,timeout:30}]}]}}function Od(_){try{let N=JSON.parse(xv(_,"utf-8"));if(!N||typeof N!=="object"||Array.isArray(N))throw Error("Antigravity hooks config must be a JSON object");return N}catch(N){if(N instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${_}: ${N.message}`);throw N}}function $d(_){let N=_[Tt];if(N===void 0){let Y=Co();return _[Tt]=Y,{definition:Y,preToolUse:Y.PreToolUse??[]}}if(!It(N))throw Error(`Antigravity hooks config entry "${Tt}" must be an object`);let U=Array.isArray(N.PreToolUse)?N.PreToolUse:[];return N.PreToolUse=U,{definition:N,preToolUse:U}}function Dd(_){if(!Array.isArray(_.PreToolUse))return!1;return _.PreToolUse.some((N)=>It(N)&&Array.isArray(N.hooks)&&N.hooks.some((U)=>It(U)&&U.command===bs))}function Pv(_){return Object.values(_).some((N)=>It(N)&&N.enabled!==!1&&Dd(N))}function Ev(_){if(_[Tt]===void 0)return!1;let N=$d(_);if(N.definition.enabled!==!1||!Dd(N.definition))return!1;return N.definition.enabled=!0,!0}function Rv(_){if(_[Tt]===void 0){_[Tt]=Co();return}let N=$d(_);N.definition.enabled=!0,N.preToolUse.push(Co().PreToolUse?.[0]??{hooks:[]})}function _v(_){let N=!1;for(let U of Object.values(_)){if(!It(U)||!Array.isArray(U.PreToolUse))continue;U.PreToolUse=U.PreToolUse.flatMap((Y)=>{if(!It(Y)||!Array.isArray(Y.hooks))return[Y];let Z=Y.hooks.filter((re)=>!It(re)||re.command!==bs);if(Z.length!==Y.hooks.length)N=!0;return Z.length===0?[]:[{...Y,hooks:Z}]})}return N}function ko(_,N){ln(_,`${JSON.stringify(N,null,2)}
`)}function Nd(_){let N=tr(_.home);if(Cv(Sv(N),{recursive:!0}),!Ad(N))return ko(N,{[Tt]:Co()}),{path:N,alreadyInstalled:!1};let U=Od(N);if(Pv(U))return{path:N,alreadyInstalled:!0};if(Ev(U))return ko(N,U),{path:N,alreadyInstalled:!1};return Rv(U),ko(N,U),{path:N,alreadyInstalled:!1}}function Ld(_){let N=tr(_.home);if(!Ad(N))return{path:N,alreadyInstalled:!1};let U=Od(N);if(!_v(U))return{path:N,alreadyInstalled:!1};return ko(N,U),{path:N,alreadyInstalled:!0}}import{existsSync as Cs,readlinkSync as Av}from"node:fs";import{join as Kn}from"node:path";import{spawn as Tv}from"node:child_process";var On=En.map((_)=>({target:_.id,flag:_.flag,label:cn(_.id),probeCommand:_.probeCommand}));function ws(_){let N=new Set(_);return On.map((U)=>U.target).filter((U)=>N.has(U))}async function jd(_,N){for(let U of _)await N(U)}var Iv=5000;function hr(_,N=Iv){return new Promise((U)=>{let Y=Xn([..._],process.env),Z=Tv(Y.cmd,Y.args,{env:process.env,stdio:"ignore"}),re=!1,ie=(me)=>{if(re)return;re=!0,clearTimeout(pe),U(me)},pe=setTimeout(()=>{Z.kill(),ie(!1)},N);Z.on("error",()=>ie(!1)),Z.on("close",(me)=>ie(me===0))})}function Hd(_=hr,N={}){let U=new Set(N.configuredTargets??[]);return Promise.all(On.map(async(Y)=>({target:Y.target,flag:Y.flag,label:Y.label,...Md(N.action,await _(Y.probeCommand)||Y.target==="cursor"&&await _(ta),U.has(Y.target))})))}function Fd(_,N){let U=new Set(N.configuredTargets??[]);return _.map((Y)=>({...Y,...Md(N.action,Y.available,U.has(Y.target))}))}function Md(_,N,U){if(_==="uninstall")return U?{available:!0}:{available:!1,unavailableReason:"not installed"};if(_==="install"&&U)return{available:!1,unavailableReason:"already installed"};if(!N)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}var Jn="cc-safety-net",qd=["npx","-y","@deepseek-ai/dsh"],Ud="DeepSeek Harness",Gd=["@deepseek-ai","dsh-desktop"],Vd="Quit DeepSeek Harness Desktop, then run this command again: Desktop plugins can only change while it is closed.",ks=(_)=>`DeepSeek Harness Desktop is not in its default location, so ${_} ${Jn} from its Plugins page.`,Kd=(_,N)=>Cs(Kn(wi(_),N,"package.json"));function xs(_,N){let U=N.platform??process.platform,Y=Kd(_,"desktop"),Z=U==="darwin"?[Kn(_.home,"Applications"),N.systemApplications??"/Applications"].map((re)=>Kn(re,`${Ud}.app`,"Contents","Resources","runtime","cli","bin","dsh")):U==="win32"?[Kn(_.env.get("LOCALAPPDATA")||Kn(_.home,"AppData","Local"),"Programs",Ud,"resources","runtime","cli","bin","dsh.cmd")]:[];return{profile:Y,cli:Y?Z.find((re)=>Cs(re)):void 0}}function Jd(_,N=process.platform){if(N==="win32")return Cs(Kn(_.env.get("APPDATA")||Kn(_.home,"AppData","Roaming"),...Gd,"lockfile"));let U=Ov(Kn(_.home,"Library","Application Support",...Gd,"SingletonLock")),Y=Number(/-(\d+)$/.exec(U??"")?.[1]);return Number.isInteger(Y)&&Y>0&&$v(Y)}function Ov(_){try{return Av(_)}catch{return}}function $v(_){try{return process.kill(_,0),!0}catch(N){return N.code==="EPERM"}}async function Wd(_,N={}){let U=xs(_,N);if(U.cli&&Jd(_,N.platform))throw Error(Vd);let Y=!U.cli||Kd(_,"web")||await(N.probe??hr)(Bo),Z=[...U.cli?[{profile:"desktop",label:"Desktop",dsh:[U.cli]}]:[],...Y?[{profile:"web",label:"web",dsh:qd}]:[]];return{commands:Z.map((re)=>[...re.dsh,"plugin","--profile",re.profile,"add",`${Jn}@${pn()}`]),afterInstall:async()=>{let re=new Set(ki(_).filter((pe)=>pe.enabled).map((pe)=>pe.name)),ie=Z.filter((pe)=>!re.has(pe.profile));if(ie.length>0)throw Error(`DeepSeek Harness installed ${Jn} in the ${Bd(ie)} but did not enable it. Enable it from the Plugins page.`)},message:[`Added ${Jn} to the DeepSeek Harness ${Bd(Z)}.`,...U.profile&&!U.cli?[ks("add")]:[]].join(`
`)}}function Bd(_){return`${_.map((N)=>N.label).join(" and ")} profile${_.length>1?"s":""}`}function zd(_,N={}){let U=new Set(ki(_).map((re)=>re.name));if(!U.has("desktop")&&!U.has("web"))throw Error(`${Jn} is not installed in the DeepSeek Harness web or Desktop profile`);let Y=U.has("desktop")?xs(_,N).cli:void 0,Z=U.has("desktop")&&!Y;if(Z&&!U.has("web"))throw Error(ks("remove"));if(Y&&Jd(_,N.platform))throw Error(Vd);return{commands:[...Y?[[Y,"plugin","--profile","desktop","remove",Jn]]:[],...U.has("web")?[[...qd,"plugin","--profile","web","remove",Jn]]:[]],...Z?{afterUninstall:()=>{throw Error(`Removed ${Jn} from the DeepSeek Harness web profile, but ${ks("remove")}`)}}:{}}}function Yd(_,N,U={}){let Y=xs(N,U).cli!==void 0;return _.map((Z)=>Z.target==="deepseek-harness"&&Y?{...Z,available:!0,unavailableReason:void 0}:Z)}import{existsSync as Dv,readdirSync as Nv,rmSync as Lv}from"node:fs";import{join as jv}from"node:path";function Zd(_,N=process.platform,U){if(!Dv(_))return;let Y=N==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);Nv(_).filter((Z)=>Z!==U&&Y.test(Z)).forEach((Z)=>{Lv(jv(_,Z),{recursive:!0,force:!0})})}import{existsSync as Xd,readdirSync as Hv,rmSync as Fv}from"node:fs";import{join as Zt}from"node:path";function xo(_,N=process.platform){let U=Zt(_.env.get("npm_config_cache")||(N==="win32"?Zt(_.env.get("LOCALAPPDATA")||Zt(_.home,"AppData","Local"),"npm-cache"):Zt(_.home,".npm")),"_npx");if(!Xd(U))return;Hv(U).filter((Y)=>Xd(Zt(U,Y,"node_modules","cc-safety-net"))).forEach((Y)=>{Fv(Zt(U,Y),{recursive:!0,force:!0})})}import{existsSync as ou,mkdirSync as Uv,readFileSync as iu}from"node:fs";import{dirname as Gv,join as ru}from"node:path";function Mv(_,N){if(_[N]!=="#")return N;let U=_.indexOf(`
`,N+1);return U===-1?_.length:U+1}function Ss(_,N,U){let Y=new RegExp(`^(\\s*)${N}\\s*=\\s*\\[`),Z=0;for(let re of _.split(`
`)){if(/^\s*\[/.test(re))return;let ie=Y.exec(re);if(ie){let pe=Z+ie[0].lastIndexOf("[");return{start:pe,end:ai(_,pe,{skipComment:Mv,...U})}}Z+=re.length+1}return}function Qd(_,N,U){let Y=_.slice(0,N.end).trimEnd(),Z=ul(_,N.end),re=Z===""?"     ":`${Z}  `,ie=!Y.endsWith("[")&&!Y.endsWith(",");return`${Y}${ie?",":""}
${re}${U}${_.slice(N.end)}`}function eu(_,N,U){let Y=_.indexOf(U,N.start);if(Y===-1||Y>N.end)return _;return`${_.slice(0,Y)}${_.slice(Y+U.length).replace(/^\s*,/,"")}`}function nu(_,N){let U=new RegExp(`^\\s*${N}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),Y=_.split(`
`),Z=Y.findIndex((pe)=>/^\s*\[/.test(pe)),re=Z===-1?Y:Y.slice(0,Z),ie=Z===-1?[]:Y.slice(Z);return[...re.filter((pe)=>!U.test(pe)),...ie].join(`
`)}function tu(_,N,U){let Y=new RegExp(`^\\s*\\[\\[${N}]]\\s*$`,"m");return _.split(/(?=^\s*\[)/m).filter((Z)=>!Y.test(Z)||!Z.includes(U)).join("").trimEnd()}var vr=kn["kimi-code"],Ps=`[[hooks]]
event = "PreToolUse"
command = "${vr}"`,su=`{ event = "PreToolUse", command = "${vr}" }`,au={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function lu(_){return ru(_.env.get("KIMI_CODE_HOME")??ru(_.home,".kimi-code"),"config.toml")}function Bv(_){let N=Ss(_,"hooks",au);if(N&&_.slice(N.start+1,N.end).trim())return Qd(_,N,su);let U=nu(_,"hooks").trimEnd();if(U==="")return`${Ps}
`;return`${U}

${Ps}
`}function cu(_){let N=lu(_);if(Uv(Gv(N),{recursive:!0}),!ou(N))return ln(N,`${Ps}
`),{path:N,alreadyInstalled:!1};let U=iu(N,"utf-8");if(U.includes(vr))return{path:N,alreadyInstalled:!0};return ln(N,Bv(U)),{path:N,alreadyInstalled:!1}}function du(_){let N=lu(_);if(!ou(N))return{path:N,alreadyInstalled:!1};let U=iu(N,"utf-8");if(!U.includes(vr))return{path:N,alreadyInstalled:!1};let Y=Ss(U,"hooks",au),Z=Y?eu(U,Y,su):`${tu(U,"hooks",vr)}
`;return ln(N,Z),{path:N,alreadyInstalled:!0}}var Es="safety-net@cc-marketplace",uu=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),pu=new Set(["antigravity-cli","cursor","devin","droid","grok-build","hermes-agent","kimi-code"]);function Rs(_){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(_??"")}function hu(_){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(_??"")}function qv(_){return/^Marketplace `cc-marketplace`\s*$/m.test(_??"")}var vu={"claude-code":{installCommands:(_)=>{let N=Kr(_,"cc-safety-net@cc-marketplace");return{commands:[...N?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...ii(_).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:Kr(_,Es)?[["claude","plugin","uninstall",Es]]:[],update:N}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(_,N)=>{let U=N??await fn(["codex","plugin","list"]),Y=hu(U);return{commands:[Y||qv(U)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:Rs(U)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:Y}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:al},"copilot-cli":{installCommands:async()=>{let _=await fn(["copilot","plugin","list"]),N=[...bl(_)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...wl(_)?[["copilot","plugin","uninstall",yl]]:[]];if(hl(_))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",Tn]],cleanupCommands:N,update:!0};return{commands:[vl(await fn(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",Tn]],cleanupCommands:N}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(_)=>{let N=Ai(_);if(N.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(N.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:Ki,installCommands:(_)=>{let N=!Po(So(dr(_),xn));return{commands:Ic(),afterInstall:()=>Ac(N)}},uninstallCommands:[["openclaw","plugins","uninstall",un,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{installCommands:Uc},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]},"deepseek-harness":{installCommands:(_)=>Wd(_),uninstallCommands:(_)=>zd(_)}};function bu(_,N=(U)=>U){try{let U=JSON.parse(N(yu(_,"utf-8")));if(!U||typeof U!=="object"||Array.isArray(U))throw Error(`Settings file ${_} must be a JSON object`);return U}catch(U){if(U instanceof SyntaxError)throw Error(`Failed to parse ${_}: ${U.message}`);throw U}}function Vv(_){let N=So(ir(_),"settings.json");if(!Po(N))return;let U=bu(N,yn),Y=U.enabledPlugins;if(!Y||typeof Y!=="object"||Array.isArray(Y))return;if(Y[Tn]!==!1)return;let Z=yu(N,"utf-8"),re=Z.replace(new RegExp(`("${Tn}"\\s*:\\s*)false`),"$1true");return Y[Tn]=!0,ln(N,re!==Z?re:`${JSON.stringify(U,null,2)}
`),`Enabled ${Tn} plugin in ${N}`}function Kv(_){let N=rs(_);if(!Po(N))return;let U=bu(N);if(!Array.isArray(U.packages))return;let Y=U.packages.find((Z)=>!!Z&&typeof Z==="object"&&!Array.isArray(Z)&&os(Z.source)&&("extensions"in Z));if(!Y)return;return delete Y.extensions,ln(N,`${JSON.stringify(U,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${N}`}function fu(_,N){let U=mn({label:N,booleans:Object.fromEntries(On.map((re)=>[re.target,[re.flag]]))},_),Y=U.errors[0];if(Y)throw Error(Y);let Z=On.filter((re)=>U.flags[re.target]).map((re)=>re.target);if(Z.length!==1)throw Error(`Choose exactly one ${N} target: ${On.map((re)=>re.flag).join(", ")}`);return Z[0]}async function wu(_,N=jt){let[U,Y,Z]=await Promise.all([N(["amp","plugins","list"],30000),N(["codex","plugin","list"],30000),N(["copilot","--binary-version"])]);return{codexPluginListOutput:Y,hooks:Jt(_,process.cwd(),{ampPluginListOutput:U,codexPluginListOutput:Y,copilotCliVersion:Z})}}async function Jv(_,N,U=jt){let Y=await wu(_,U);return Y.hooks.filter((Z)=>N==="install"?Z.configured:Z.detected&&Z.method!==eo||Z.inspectionStatus==="not-inspected").filter((Z)=>!xu(Z)).filter((Z)=>Z.platform!=="codex"||!Rs(Y.codexPluginListOutput)||hu(Y.codexPluginListOutput)).map((Z)=>Z.platform)}function Wv(_,N,U,Y){if(U.length>0)return{finish:async()=>[fu(U,N)]};if(!Y.selectTargets&&!ms(Y.input,Y.output))return{finish:async()=>[fu(U,N)]};let Z=Y.detectConfiguredTargets??(()=>Jv(_,N,Y.fetchVersion)),re=Promise.all([Hd(Y.probeTargets).then((ie)=>Yd(ie,_)),Z()]);return{ready:re,finish:async()=>{let[ie,pe]=await re,me=Fd(ie,{action:N,configuredTargets:pe}),ke=Y.selectTargets?await Y.selectTargets(N,gu(N,me)):await wd(N,gu(N,me),{input:Y.input,output:Y.output});if(ke==="update")return ke;if(!ke||ke.length===0)return null;return ws(ke)}}}async function zv(_,N,U=!1,Y){let Z=vu[_];Z.beforeInstall?.(N);let re=typeof Z.installCommands==="function"?await Z.installCommands(N,Y):{commands:Z.installCommands};return await ui(re.commands),await Rl(re.cleanupCommands??[]),await re.afterInstall?.(),[`${re.update||U?"Updated":"Installed"} ${cn(_)} integration`,re.message??Z.postInstallMessage].filter(Boolean).join(`
`)}async function Yv(_,N){let U=vu[_];if(!U.uninstallCommands)throw Error(`${cn(_)} uninstall is not supported`);let Y=typeof U.uninstallCommands==="function"?U.uninstallCommands(N):{commands:U.uninstallCommands};return await ui(Y.commands),Y.afterUninstall?.(),`Uninstalled ${cn(_)} integration`}function Zv(_){let N=qc(_);return N.alreadyInstalled?`Uninstalled OpenCode plugin from ${N.path}`:`OpenCode plugin not installed in ${N.path}`}var ku={"antigravity-cli":{install:Nd,uninstall:Ld},cursor:{install:$l,uninstall:Dl},devin:{install:Bl,uninstall:ql},droid:{install:Zl,uninstall:Xl},"grok-build":{install:sc,uninstall:ac},"kimi-code":{install:cu,uninstall:du}};function Xv(_,N,U,Y=!1){if(_==="install"&&!Y)xo(U);let Z=ku[N][_](U),re=cn(N),ie=_!=="install"?"Uninstalled":Y?"Updated":"Installed";return _==="install"&&Z.alreadyInstalled?Y?`${re} hook up to date in ${Z.path}`:`${re} hook already installed in ${Z.path}`:_==="uninstall"&&!Z.alreadyInstalled?`${re} hook not installed in ${Z.path}`:`${ie} ${re} hook ${_==="install"?"in":"from"} ${Z.path}`}var Cu={amp:{install:Td,uninstall:Id,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:mc,uninstall:gc,afterInstall:async(_)=>{let N=Ui(_);return await fn(["hermes","plugins","enable",Pn,"--no-allow-tool-override"]),!N},beforeUninstall:async(_)=>{Mi(_);try{await fn(["hermes","plugins","disable",Pn])}catch(N){console.warn(`${N instanceof Error?N.message:String(N)}
Removing the plugin files anyway; ${Pn} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Qv(_,N,U,Y=!1){let Z=Cu[N];if(_==="uninstall")await Z.beforeUninstall?.(U);let re=_==="install"?await Z.install(U):await Z.uninstall(U),ie=_==="install"&&await Z.afterInstall?.(U),pe=cn(N),me=!ie&&(_==="install"&&re.alreadyInstalled||_==="uninstall"&&!re.alreadyInstalled);return[me?_==="install"?`${pe} plugin ${Y?"up to date":"already installed"} at ${re.path}`:`${pe} plugin not installed at ${re.path}`:`${_!=="install"?"Uninstalled":Y?"Updated":"Installed"} ${pe} plugin ${_==="install"?"at":"from"} ${re.path}`,me?void 0:Z.restartNote].filter(Boolean).join(`
`)}var eb={"copilot-cli":{afterInstall:Vv},cursor:{afterUninstall:Tl},"hermes-agent":{beforeInstall:(_,N)=>{if(!N)xo(_)}},openclaw:{beforeUninstall:Ki},pi:{afterInstall:Kv}};function nb(_){return _ in ku}function tb(_){return _ in Cu}var mu=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net/tree/plugin","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function xu(_){return _.platform==="kimi-code"&&_.method===uo}function Su(_){return po({environment:_,cwd:process.cwd()}).method==="hook config"}function rb(_){if(!Su(_))return mu;return[mu,"",en.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function gu(_,N){return N.map((U)=>_==="install"&&U.target==="kimi-code"&&U.unavailableReason==="already installed"?{...U,available:!0,unavailableReason:void 0,label:`${U.label} (global hook installed)`}:U)}function ob(_,N){if(_.selectKimiInstallMethod)return _.selectKimiInstallMethod();if(!ms(_.input,_.output))return Promise.resolve("global-hook");return bd({input:_.input,output:_.output,globalHookInstalled:Su(N)})}async function Pu(_,N,U,Y=!1,Z){let re=eb[N];if(_==="install")re?.beforeInstall?.(U,Y);if(_==="uninstall")re?.beforeUninstall?.(U);if(nb(N))return[Xv(_,N,U,Y),_==="uninstall"?await re?.afterUninstall?.(U):void 0].filter(Boolean).join(`
`);if(tb(N))return Qv(_,N,U,Y);if(_==="uninstall")return N==="opencode"?Zv(U):Yv(N,U);return[await zv(N,U,Y,Z),await re?.afterInstall?.(U)].filter(Boolean).join(`
`)}function ib(_){let N=mn({label:"update"},_).errors[0];if(N)throw Error(N)}async function sb(_,N=jt){let U=await wu(_,N),Y=So(ir(_),"installed-plugins");return{targets:ws([...U.hooks.filter((re)=>re.platform!=="copilot-cli"&&re.detected&&re.method!==eo&&re.method!==hi).map((re)=>re.platform),...[Jr,gl,ml].flatMap((re)=>Po(So(Y,...re))?["copilot-cli"]:[]),...Kr(_,Es)?["claude-code"]:[],...Rs(U.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:U.codexPluginListOutput,kimiPlugin:U.hooks.some(xu)}}async function ab(_){let N=c(),U=_.output??process.stdout,Y=(_.scriptPath??process.argv[1]??"").split(/[\\/]/),Z=Y.find((_e)=>/^bunx-\d+-/.test(_e)),re=Z!==void 0||Y.includes("_npx")?null:(_.checkLatestVersion??Gn)(),ie=async()=>{let _e=re&&await re;if(_e?.updateAvailable)U.write(`
Update available: cc-safety-net ${_e.currentVersion} → ${_e.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},pe=sb(N,_.fetchVersion??jt).then(async(_e)=>{let Te=new Set(_e.targets);return{targets:_e.targets,codexPluginListOutput:_e.codexPluginListOutput,kimiPlugin:_e.kimiPlugin,available:new Map(await Promise.all(On.filter((We)=>Te.has(We.target)&&uu.has(We.target)).map(async(We)=>[We.target,await hr(We.probeCommand)])))}}),me=await er(_.showBanner??!0,()=>({ready:pe,finish:()=>pe}),()=>Qt({input:_.input??process.stdin,output:U}),{loadingMessage:"Checking installed integrations…",output:U}),ke=await Promise.resolve().then(()=>(Zd(N.tmpdir,process.platform,Z),null)).catch((_e)=>br(_e));if(me.targets.length===0){if(U.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),ke!==null)console.error(ke);return await ie(),ke===null?0:1}let Ce=me.targets.some((_e)=>pu.has(_e))?await Promise.resolve().then(()=>(xo(N),null)).catch((_e)=>br(_e)):null,Re=await Hr(Promise.all(me.targets.map((_e)=>{if(_e==="kimi-code"&&me.kimiPlugin)return Promise.resolve({message:"Kimi Code plugin skipped: update it in Kimi Code from /plugins (Installed tab, select cc-safety-net, press Enter)",failed:!1});if(uu.has(_e)&&!me.available.get(_e))return Promise.resolve({message:`${cn(_e)} not found; skipped`,failed:!1});if(Ce!==null&&pu.has(_e))return Promise.resolve({message:Ce,failed:!0});return Pu("install",_e,N,!0,me.codexPluginListOutput).then((Te)=>({message:Te,failed:!1}),(Te)=>({message:br(Te),failed:!0}))})),{loadingMessage:`Updating ${me.targets.length} integration${me.targets.length===1?"":"s"}…`,output:U}),Ne=ke===null?Re:[...Re,{message:ke,failed:!0}];return Ne.forEach((_e)=>_e.failed?console.error(_e.message):U.write(`${_e.message}
`)),await ie(),Ne.some((_e)=>_e.failed)?1:0}function _s(_,N={}){return Promise.resolve().then(()=>ib(_)).then(()=>ab(N)).catch((U)=>(console.error(br(U)),1))}async function wr(_,N,U={}){try{let Y=c(),Z=await er(!0,()=>Wv(Y,_,N,U),()=>Qt({input:U.input??process.stdin,output:U.output??process.stdout}),{loadingMessage:_==="install"?"Checking available integrations…":"Checking installed integrations…",output:U.output??process.stdout});if(!Z)return(U.output??process.stdout).write(`Cancelled: nothing was ${_}ed.
`),0;if(Z==="update")return(U.runUpdate??(()=>_s([],{fetchVersion:U.fetchVersion,input:U.input,output:U.output,showBanner:!1})))();let re=U.output??process.stdout;return await jd(Z,async(ie)=>{if(ie==="kimi-code"&&_==="install"){let me=await ob(U,Y);if(me===null){re.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(me==="plugin"){re.write(`${rb(Y)}
`);return}}let pe=await Hr(Pu(_,ie,Y),{loadingMessage:`${_==="install"?"Installing":"Uninstalling"} ${cn(ie)} integration…`,output:re});re.write(`${pe}
`)}),0}catch(Y){return console.error(br(Y)),1}}function br(_){let N=_ instanceof Error?_.message:String(_),U=typeof _==="object"&&_!==null&&"code"in _?_.code:null;if(U==="EACCES"||U==="EPERM")return`${N}
Check file permissions for the target config file and parent directory.`;if(U==="ENOENT")return`${N}
Check that the target config path and parent directory exist.`;if(U==="ENOTDIR")return`${N}
Check that every parent path component is a directory.`;return N}import{mkdirSync as fb}from"node:fs";import{dirname as mb}from"node:path";import{createInterface as gb}from"node:readline";import{existsSync as Ru,readFileSync as lb}from"node:fs";function At(_,N){let U=pt(_,N);return{policy:U.policy,errors:le(lt(U.issues,dt,(Y)=>Y.kind==="custom")," "," ")}}function kr(_,N){return At(_,N).errors}function Eu(_,N){return{"safety.level":_.safety.level,...Ts("safety.overrides",_.safety.overrides),"workflow.worktree_mode":String(_.workflow.worktree_mode),"destructive_command_protection.enabled":String(_.destructive_command_protection.enabled),...Ts("destructive_command_protection.overrides",_.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":Is(_.destructive_command_protection.allow_paths),"secret_protection.enabled":String(_.secret_protection.enabled),...Ts("secret_protection.overrides",_.secret_protection.overrides),"secret_protection.deny_paths":Is(_.secret_protection.deny_paths),"secret_protection.allow_paths":Is(_.secret_protection.allow_paths),...N?{"audit.retention_days":String(_.audit.retention_days)}:{}}}function Eo(_,N,U){let Y=Eu(_,U),Z=Eu(N,U);return[...new Set([...Object.keys(Y),...Object.keys(Z)])].flatMap((re)=>Y[re]===Z[re]?[]:[{field:re,before:Y[re],after:Z[re]}])}function Cr(_,N){let U=u(_,N);if(!Ru(U))return{baseline:k(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,_.home),diagnostics:[]};let Y=Ot(U),Z=At(Y.value,_.home);return{baseline:Z.policy,diagnostics:Y.errors.length>0?Y.errors:Z.errors}}function Ot(_){if(!Ru(_))return{errors:[`${_}: file not found`]};try{return{value:JSON.parse(lb(_,"utf-8")),errors:[]}}catch(N){let U=N instanceof Error?N.message:String(N);return{errors:[`${_}: ${N instanceof SyntaxError?`Invalid JSON: ${U}`:U}`]}}}function Ro(_,N){let U=cb(_)?_:{};return{version:N.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((Y)=>U[Y]!==void 0).map((Y)=>[Y,U[Y]]))}}function Ts(_,N){return Object.fromEntries(Object.entries(N).flatMap(([U,Y])=>Y===void 0?[]:[[`${_}.${U}`,String(Y)]]))}function Is(_){return _.length===0?"(none)":_.join(", ")}function cb(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{chmodSync as db,existsSync as _u,mkdirSync as ub,readFileSync as Tu}from"node:fs";import{dirname as pb}from"node:path";function Iu(_,N={}){let U=u(_,N);if(!_u(U))return{path:U,exists:!1,raw:"",policy:j(),errors:[]};let Y=Tu(U,"utf-8");if(!Y.trim())return{path:U,exists:!0,raw:Y,policy:j(),errors:["Config file is empty"]};try{let Z=At(JSON.parse(Y),_.home);return{path:U,exists:!0,raw:Y,policy:Z.policy,errors:Z.errors}}catch(Z){return{path:U,exists:!0,raw:Y,policy:j(),errors:[`Invalid JSON: ${Z instanceof Error?Z.message:String(Z)}`]}}}function Fn(_,N,U={}){let Y=u(_,U),Z=At(N,_.home);if(Z.errors.length>0)return{path:Y,policy:j(),errors:Z.errors};let re=Z.policy;return ub(pb(Y),{recursive:!0,mode:448}),g(se(Y),`${JSON.stringify(re,null,2)}
`,384),db(Y,384),{path:Y,policy:re,errors:[]}}function Au(_,N){let U=At(N,_.home);if(U.errors.length>0)return{errors:U.errors};return{preview:He(U.policy,_.env),errors:[]}}function Ou(_,N={}){let U=u(_,N);if(!_u(U))return Fn(_,F,N);let Y=Tu(U,"utf-8");if(!Y.trim())return Fn(_,F,N);try{return Fn(_,k(JSON.parse(Y),_.home),N)}catch{return Fn(_,F,N)}}var $u=new Set(["check","apply"]),Du="(unset)";async function Lu(_,N,U={}){let Y=mn({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},N),Z=Y.positionals[0],re=[...Y.errors,...Z&&!$u.has(Z)?[`Unknown policy subcommand: ${Z}`]:[],...Z&&$u.has(Z)&&!Y.positionals[1]?[`policy ${Z} requires a file`]:[],...Y.positionals.slice(2).map((We)=>`Unexpected policy argument: ${We}`)];if(re.length>0){for(let We of re)console.error(We);return 1}let ie=Y.positionals[1];if(!Z||!ie)return Wt(_r,console.error),1;let pe=U.cwd??process.cwd(),me=Y.flags.global?u(_):h(pe);if(!Y.flags.global&&A(_,{cwd:pe}))return console.error(`${me} is the user policy, not a project policy; use --global for the user scope, or run from a project directory`),1;let ke=Ot(ie),Ce=[...ke.errors,...kr(ke.value,_.home).map((We)=>`${ie}: ${We}`),...!Y.flags.global&&vb(ke.value)&&ke.value.audit!==void 0?[`${ie}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(Ce.length>0){for(let We of Ce)console.error(We);return 1}let Re=k(ke.value,_.home);if(console.log(`Scope: ${Y.flags.global?"user":"project"} (${me})`),console.log(`Proposal: ${ie}`),Y.flags.global)Nu(k(Ot(me).value,_.home),Re,!0);if(!Y.flags.global){let We=Cr(_).baseline;console.log("Effective policy (user + project merged):"),Nu(te(We,de(Ot(me).value,_.home).policy).policy,te(We,de(ke.value,_.home).policy).policy,!1)}if(Z==="check")return 0;let Ne=U.input??process.stdin,_e=U.output??process.stdout;if(!Ne.isTTY||!_e.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${ie}${Y.flags.global?" --global":""}`),1;if(!await yb(`Apply this policy to ${me}? [y/N] `,Ne,_e))return console.log("Cancelled; nothing was written."),0;return hb(_,me,ke.value,Re,Y.flags.global),console.log(`Policy applied: ${me}`),0}function yb(_,N,U){let Y=gb({input:N,output:U,terminal:!1});return new Promise((Z)=>{Y.once("close",()=>Z(!1)),Y.question(_,(re)=>{Z(/^y(es)?$/i.test(re.trim())),Y.close()})})}function hb(_,N,U,Y,Z){if(Z){Fn(_,Y);return}fb(mb(N),{recursive:!0}),bn(N,Ro(U,Y))}function Nu(_,N,U){let Y=Eo(_,N,U);if(Y.length===0){console.log("No changes.");return}console.log(`Changes (${Y.length}):`);for(let Z of Y)console.log(`  ${Z.field}: ${Z.before??Du} -> ${Z.after??Du}`)}function vb(_){return!!_&&typeof _==="object"&&!Array.isArray(_)}import{join as Aw}from"node:path";var ju="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- `caffeinate`, `exec`, `nice`, `nohup`, `setsid`, `stdbuf`, `time`, and `timeout` are built-in transparent wrappers and need no configuration. Configure only other wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n- `command_tools`: Optional array of shell tools that a plugin adds to an agent and that CC Safety Net does not know. Each entry is a tool name such as `\"ops_bash\"`, or `{ \"name\": \"ops_run_background\", \"cwd\": \"cwd\" }` when the tool takes its working directory in a named argument (otherwise `workdir`, `cwd`, or `working_directory` is read). A call to a declared tool with a non-empty string `command` is analyzed like a built-in shell command. User and project lists merge; the user entry wins a name declared in both.\n- Built-in shell and file tools are already analyzed and cannot be declared; `rule verify` reports one declared by hand.\n- Use `cc-safety-net rule tool add ops_bash ops_run_background` to declare tools in the user config, or add `--project` for the project config.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function _o(_,N){if(!_.ok){Bu(_);return}Mu(_,N)}function Fu(_,N,U){if(_.ok)console.log(U);if(!_.add){_o(_,`Added rulebook source: ${N}`);return}if(!_.ok){Bu(_);return}if(_.add.added.length>0)console.log(`Added ${_.add.added.length} ${_.add.added.length===1?"rulebook":"rulebooks"} from ${_.add.source} at ${_.add.ref}:`),_.add.added.forEach((Y)=>{console.log(`  - ${Y}`)});if(_.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${_.add.source} at ${_.add.ref}: ${_.add.alreadyConfigured.join(", ")}`);if(_.add.commits.length>0)console.log(`Vendored at ${_.add.commits.map((Y)=>Y.slice(0,7)).join(", ")}.`);Mu(_,"Rule config updated.")}function Mu(_,N){for(let U of _.changes??[])console.log(U);console.log(N),console.log(""),bb(_.entries)}function bb(_){if(_.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${_.length}):`);for(let N of _)console.log(`  - ${N.name} ${N.version} (${wb(N.ruleCount)})`),console.log(`    Source: ${N.spec}`)}function wb(_){return`${_} ${_===1?"rule":"rules"}`}function Uu(_){Wn("Active sources",_.rulebooks,(N)=>[`[${N.source}] ${N.name} ${N.version}`,`  Source: ${N.spec}`]),Wn("Active rules",_.rules,(N)=>[`[${Cb(_,N.name)}] ${N.name}`,...kb(N),`  Reason: ${N.reason}`]),Wn("Disabled rules",Hu(_,"off"),(N)=>[N.key]),Wn("Reason overrides",Hu(_,"reason"),(N)=>[N.key,`  Reason: ${N.value.reason}`]),Wn("Transparent wrappers",_.transparent_wrappers,(N)=>[N]),Wn("Issues",_.errors,(N)=>[N]),Wn("Warnings",_.warnings,(N)=>[N])}function Gu(_){Wn("Command tools",_,(N)=>typeof N.tool==="string"?[`[${N.scope}] ${N.tool}`]:[`[${N.scope}] ${N.tool.name}`,...N.tool.cwd===void 0?[]:[`  Cwd argument: ${N.tool.cwd}`]])}function Wn(_,N,U){if(N.length===0){console.log(`${_}: (none)`);return}console.log(`${_} (${N.length}):`);for(let Y of N){let[Z,...re]=U(Y);console.log(`  - ${Z}`);for(let ie of re)console.log(`    ${ie}`)}}function kb(_){if(!_.match)return[`  Command: ${_.subcommand?`${_.command} ${_.subcommand}`:_.command}`,`  Block args: ${_.block_args.join(", ")}`];return[`  Command: ${[_.command,..._.match.command_path].join(" ")}`,..._.match.any_args?[`  Any args: ${_.match.any_args.join(", ")}`]:[],..._.match.exclude_args?[`  Exclude args: ${_.match.exclude_args.join(", ")}`]:[]]}function Cb(_,N){return _.rulebooks.find((U)=>U.rules.includes(N))?.source??"project"}function Hu(_,N){return Object.entries({..._.userConfig?.overrides,..._.projectConfig?.overrides}).filter((U)=>{if(N==="off")return U[1]==="off";return!!U[1]&&typeof U[1]==="object"}).map(([U,Y])=>({key:U,value:Y}))}function Bu(_){for(let N of _.errors)console.error(N)}import{dirname as pp,join as Lo}from"node:path";import{join as Ds,resolve as Db}from"node:path";function xr(_){let N=d(_);if(N.errors.length>0)return{ok:!1,result:{ok:!1,errors:N.errors,entries:[]}};return{ok:!0,config:N.config??ce}}function qu(_){bn(_,ce)}function Vu(_){bn(_,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Oo}from"node:path";var xb="custom.";function To(_){if(_.rulebook_version!==2)return[];let N=_.rules.map((U)=>({name:U.name,command:U.command,block_args:[],match:U.match,reason:U.reason,intent:U.intent}));return(_.tests??[]).flatMap((U,Y)=>{let Z=As(y(U.command));if(Z.length===0)return[`tests[${Y}]: could not parse fixture command: ${U.command}`];let re=Z.reduce((ie,pe)=>ie??D(pe,N)?.id.slice(xb.length),void 0);if(U.expect==="blocked"){if(re===U.rule)return[];let ie=re?`"${re}" matched first`:"no rule matched";return[`tests[${Y}]: expected "${U.rule}" to block "${U.command}" but ${ie}`]}return re?[`tests[${Y}]: expected "${U.command}" to be allowed but "${re}" matched`]:[]})}function As(_){return _.nodes.flatMap((N)=>{if(N.kind==="group"||N.kind==="function")return As(N.body);if(N.kind!=="command")return[];let U=we(ne(N.dialect,N.words)).words.map(t);return[...U.length>0?[U]:[],...N.nested.flatMap((Y)=>As(Y))]})}var Io=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function Ao(_={}){return{requests:0,responseBytes:0,maxRequests:_.maxRequests??Io.maxRequests,maxResponseBytes:_.maxResponseBytes??Io.maxResponseBytes}}function Mn(_){return{controller:new AbortController,budget:Ao(),resolveUrl:_}}function Ku(_){return _ instanceof Error&&_.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function Ju(_){if(_.requests>=_.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.requests++}function Wu(_,N){if(N>_.maxResponseBytes-_.responseBytes)throw _.responseBytes+=N,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");_.responseBytes+=N}var Zu=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function zu(_,N,U=w(Oo(Oo(N)),"rules policy"),Y=Mn()){if(C(_))return Rb(_,Y);return Eb(_,N,U)}async function Xu(_,N,U,Y,Z,re){if(!C(_))return zu(_,N,U,Y);let ie=Z?null:Sb(_,N,U);if(ie)return ie;if(!Z&&!re)throw Error(`${_} is not vendored; run rule update ${_} to vendor it`);return zu(_,N,U,Y)}function Sb(_,N,U=w(Oo(Oo(N)),"rules policy")){let Y=L(_),Z=M(N,Y.name),re=r(i(U,Z));if(re===null)return null;let ie=ue(Os(re,`Invalid rulebook ${Z}.`));if(ie.name!==Y.name)throw Error(`rulebook name "${ie.name}" in ${Z} must match "${Y.name}"`);return{spec:_,rulebook:ie,content:re}}async function Qu(_,N={}){if(!X(_))throw Error(`Invalid GitHub repository source: ${_}`);let[U,Y]=_.split("/");if(!U||!Y)throw Error(`Invalid GitHub repository source: ${_}`);if(N.ref!==void 0&&!ae(N.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${N.ref}`);let Z=N.operation??Mn(),re=N.ref??await Pb(U,Y,_,Z),ie=await np(U,Y,re,_,Z),pe=await $o(`https://api.github.com/repos/${U}/${Y}/git/trees/${ie}?recursive=1`,"tree",Z),me=pe.response;if(!me.ok)throw Error(`Failed to inspect ${_}: GitHub tree returned ${me.status}`);let ke=JSON.parse(pe.content);if(!Array.isArray(ke?.tree))throw Error(`Failed to inspect ${_}: unexpected GitHub tree response`);let Ce=ke.tree,Re=[...new Set(Ce.flatMap((Ne)=>{if(!Ne||typeof Ne!=="object")return[];let _e=Ne;if(_e.type!=="blob"||typeof _e.path!=="string")return[];let Te=_e.path.match(Ct);return Te?.[1]?[Te[1]]:[]}))].sort();if(Re.length===0)throw Error(`No rulebooks found in ${_} under ${ye}/`);return{source:_,owner:U,repo:Y,ref:re,commit:ie,names:Re}}async function Pb(_,N,U,Y){let Z=await $o(`https://api.github.com/repos/${_}/${N}`,"metadata",Y),re=Z.response;if(!re.ok)throw Error(`Failed to inspect ${U}: GitHub returned ${re.status}`);let pe=JSON.parse(Z.content)?.default_branch;if(typeof pe!=="string"||pe==="")throw Error(`Failed to inspect ${U}: missing default branch`);if(!ae(pe))throw Error(`GitHub returned an invalid default branch: ${pe}`);return pe}function Eb(_,N,U){Et(_);let Y=M(N,_),Z=r(i(U,Y));if(Z===null)throw Error(`Rulebook source not found: ${_}`);let re=ep(Os(Z,"Invalid local rulebook source."));if(re.name!==_)throw Error(`rulebook name "${re.name}" must match local source "${_}"`);return{spec:_,rulebook:re,content:Z}}async function Rb(_,N){let U=L(_),Y=await np(U.owner,U.repo,U.ref,_,N),Z=await $o(`https://raw.githubusercontent.com/${U.owner}/${U.repo}/${Y}/${U.path}`,"raw",N),re=Z.response;if(!re.ok)throw Error(`Failed to fetch ${_}: GitHub raw returned ${re.status}`);let ie=Z.content,pe=ep(Os(ie,"Invalid GitHub rulebook response."));if(pe.name!==U.name)throw Error(`rulebook name "${pe.name}" must match GitHub source "${U.name}"`);return{spec:_,rulebook:pe,content:ie}}function ep(_){let N=ue(_),U=To(N);if(U.length>0)throw Error(U.join("; "));return N}function Os(_,N){try{return JSON.parse(_)}catch{throw Error(N)}}async function np(_,N,U,Y,Z){let re=await $o(`https://api.github.com/repos/${_}/${N}/commits/${encodeURIComponent(U)}`,"commit",Z),ie=re.response;if(!ie.ok)throw Error(`Failed to resolve ${Y}: GitHub returned ${ie.status}`);let pe=JSON.parse(re.content);if(typeof pe?.sha!=="string"||pe.sha==="")throw Error(`Failed to resolve commit for ${Y}`);return pe.sha}async function _b(_,N,U={}){if(U.signal?.aborted)throw U.signal.reason;let Y=U.budget??Ao(),Z=new AbortController,re=()=>Z.abort(U.signal?.reason);U.signal?.addEventListener("abort",re,{once:!0});let ie=!1,pe=setTimeout(()=>{if(Z.signal.aborted)return;ie=!0,Z.abort()},U.timeoutMs??Zu.timeoutMs);try{if(U.signal?.aborted)throw U.signal.reason;Ju(Y);let me=await fetch(_,{signal:Z.signal,redirect:"error"});if(!me.ok)return tp(me),{response:me,content:""};return{response:me,content:await Tb(me,N,Y,()=>Z.abort())}}catch(me){if(ie)throw Error("GitHub request timed out",{cause:me});if(U.signal?.aborted)throw U.signal.reason;throw me}finally{clearTimeout(pe),U.signal?.removeEventListener("abort",re)}}function $o(_,N,U){return _b(U.resolveUrl?.(_)??_,N,{budget:U.budget,signal:U.controller.signal})}async function Tb(_,N,U=Ao(),Y){let Z=Zu[`${N}Bytes`],re=Number(_.headers.get("content-length"));if(Number.isFinite(re)&&re>Z)throw tp(_),Error(`GitHub ${N} response exceeds ${Z} bytes`);if(!_.body)return"";let ie=_.body.getReader(),pe=[],me=0;while(!0){let ke=await ie.read();if(ke.done)break;try{Wu(U,ke.value.byteLength)}catch(Ce){throw Y?.(),Yu(ie),Ce}if(me+=ke.value.byteLength,me>Z)throw Y?.(),Yu(ie),Error(`GitHub ${N} response exceeds ${Z} bytes`);pe.push(Buffer.from(ke.value))}return Buffer.concat(pe,me).toString("utf-8")}function tp(_){if(!_.body)return;rp(()=>_.body?.cancel())}function Yu(_){rp(()=>_.cancel())}function rp(_){try{Promise.resolve(_()).catch(()=>{})}catch{}}var Ib=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function op(_,N){let U=ap(_.rules,N);if(U.length>0)return{ok:!0,specs:U};return sp(_.rules,N)}function ip(_,N){let U=ap(_,N);if(U.length>0)return{ok:!0,specs:U};let Y=Ob(_,N);if(Y.length>0)return{ok:!0,specs:Y};let Z=$b(_,N);if(!Z.ok)return Z;if(Z.specs.length>0)return{ok:!0,specs:Z.specs};return sp(_,N)}function sp(_,N){let U=_.filter((Y)=>$s(Y)?.name===N);if(U.length===1)return{ok:!0,specs:U};return Ab(N,U)}function Ab(_,N){return{ok:!1,result:{ok:!1,errors:N.length===0?[`No configured rulebook matches ${_}`]:[`Ambiguous rulebook match ${_}: ${N.join(", ")}`],entries:[]}}}function ap(_,N){return _.filter((U)=>U===N)}function Ob(_,N){let U=N.match(Ib),Y=U?.[1],Z=U?.[2],re=U?.[3];if(!Y||!Z||!re||!ae(re))return[];return lp(_,(ie)=>ie.owner===Y&&ie.repo===Z&&ie.ref===re)}function $b(_,N){if(!X(N))return{ok:!0,specs:[]};let[U,Y]=N.split("/"),Z=lp(_,(ie)=>ie.owner===U&&ie.repo===Y);if(new Set(Z.map((ie)=>$s(ie)?.ref).filter((ie)=>!!ie)).size<2)return{ok:!0,specs:Z};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${N}. Use an explicit ref:`,`  cc-safety-net rule remove ${N}#<ref>`],entries:[]}}}function $s(_){try{return L(_)}catch{return null}}function lp(_,N){return _.filter((U)=>{let Y=$s(U);return Y?N(Y):!1})}async function No(_,N={}){return Nb(_,N,await Do(_,N,Mn()))}function Nb(_,N,U){if(!U.ok)return U;let Y=hn(_,N),Z=[...new Set(z(Y.configPath,Y.filesystemScope))];if(Z.length===0)return U;return{ok:!1,errors:Z,entries:U.entries}}async function Do(_,N,U,Y={},Z=new Set,re=new Set){try{let ie=hn(_,N),pe=xr(ie.configTarget);if(!pe.ok)return pe.result;let me=pe.config,ke=N.only?op(me,N.only):{ok:!0,specs:me.rules};if(!ke.ok)return ke.result;let Ce=new Set([...N.refresh?ke.specs:[],...Z]),Re=(nn)=>Xu(nn,ie.configDir,ie.filesystemScope,U,Ce.has(nn),!N.refresh||Ce.has(nn)),Ne=await Vb(me.rules,N.refresh?(nn)=>Re(nn).then((sn)=>({ok:!0,item:sn})).catch((sn)=>{if(Ku(sn))throw sn;return{ok:!1,spec:nn,message:sn instanceof Error?sn.message:String(sn)}}):async(nn)=>({ok:!0,item:await Re(nn)}),U),_e=Ne.filter((nn)=>!nn.ok),Te=Ne.filter((nn)=>nn.ok).map((nn)=>nn.item),We=Te.flatMap((nn)=>Lb(nn,me.rules)),Me=Te.flatMap((nn)=>jb(nn,re,ie)),Ye=new Set([...We,...Me].map((nn)=>nn.spec)),tn=[..._e,...We,...Me],on=[],an=Fb(on,()=>Te.flatMap((nn)=>Ye.has(nn.spec)||tn.length>0&&re.has(nn.spec)?[]:Hb(nn,ie,Y,on)));return{ok:tn.length===0,errors:tn.map((nn)=>`Failed to update ${nn.spec}: ${nn.message}`),entries:Te.map(Ub),changes:an}}catch(ie){return Pr(ie)}}function Lb(_,N){if(!C(_.spec))return[];let U=Ge(_.spec),Y=N.filter((Z)=>Z!==_.spec&&Ge(Z).toLowerCase()===U.toLowerCase());if(Y.length===0)return[];return[{ok:!1,spec:_.spec,message:`rulebook name "${U}" is also claimed by ${Y.join(", ")}; rename one of them`}]}function jb(_,N,U){if(!N.has(_.spec)||!C(_.spec))return[];let Y=M(U.configDir,_.rulebook.name),Z=r(i(U.filesystemScope,Y));if(Z===null||Z===_.content)return[];return[{ok:!1,spec:_.spec,message:`${Y} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function Hb(_,N,U,Y){if(!C(_.spec))return[];let Z=M(N.configDir,_.rulebook.name),re=i(N.filesystemScope,Z),ie=r(re);if(ie===_.content)return[];return Y?.push({target:re,previous:ie}),g(re,_.content,void 0,U._testAfterPolicyRename),Mb(_,ie)}function Fb(_,N){try{return N()}catch(U){for(let Y of[..._].reverse()){if(Y.previous===null){W(Y.target);continue}g(Y.target,Y.previous)}throw U}}function Mb(_,N){if(N===null)return[`Vendored ${_.spec} (${_.rulebook.version})`];let U=Se(N),Y="problem"in U?null:U.rulebook,Z=new Map(Y?.rules.map((ie)=>[ie.name,JSON.stringify(ie)])??[]),re=new Set(_.rulebook.rules.map((ie)=>ie.name));return[`Updated ${_.spec} (${Y?.version??"unreadable"} -> ${_.rulebook.version})`,...[...re].filter((ie)=>!Z.has(ie)).map((ie)=>`  + ${ie}`),...[...Z.keys()].filter((ie)=>!re.has(ie)).map((ie)=>`  - ${ie}`),..._.rulebook.rules.filter((ie)=>{let pe=Z.get(ie.name);return pe!==void 0&&pe!==JSON.stringify(ie)}).map((ie)=>`  ~ ${ie.name}`)]}function Ub(_){return{spec:_.spec,name:_.rulebook.name,version:_.rulebook.version,ruleCount:_.rulebook.rules.length}}async function cp(_,N,U={}){return Gb(_,N,U,Mn())}async function Gb(_,N,U,Y,Z={}){let re=null,ie=!1;try{let pe=hn(_,U),me=r(pe.configTarget);re={target:pe.configTarget,content:me};let ke=xr(pe.configTarget);if(!ke.ok)return ke.result;let Ce=ke.config,Re=X(N)?await Qu(N,{ref:U.ref,operation:Y}):null,Ne=Re?Bb(Re,U.rulebooks):[],_e=Re?Ne.map((tn)=>qb(Ce.rules,Re,tn)??`${N}#${Re.ref}/${tn}`):[N],Te=_e.filter((tn)=>!Ce.rules.includes(tn)),We=[...Ce.rules,...Te];if(We.length>be)return Kb();if(We.length!==Ce.rules.length)ie=!0,bn(pe.configTarget,{...Ce,rules:We},void 0,Z._testAfterPolicyRename);let Me=await Do(_,U,Y,Z,new Set(Te),new Set(Te));if(!Me.ok)Sr(pe.configTarget,me);if(!Me.ok||!Re)return Me;let Ye=Ne.filter((tn,on)=>Te.includes(_e[on]??""));return{...Me,add:{source:N,ref:Re.ref,selected:Ne,added:Ye,alreadyConfigured:Ne.filter((tn)=>!Ye.includes(tn)),commits:Te.length>0?[Re.commit]:[]}}}catch(pe){if(ie&&re)try{Sr(re.target,re.content)}catch(me){return Pr(me)}return Pr(pe)}}function Bb(_,N){let U=N?[...new Set(N)]:_.names,Y=U.filter((Z)=>!_.names.includes(Z));if(Y.length>0)throw Error(`Rulebooks not found in ${_.source} at ${_.ref}: ${Y.join(", ")}
Available rulebooks: ${_.names.join(", ")}`);return U}function qb(_,N,U){let Y=`${N.source}#${N.ref}/${U}`;if(_.includes(Y))return Y;let Z=`${N.source}#${N.commit}/${U}`;return _.find((re)=>re===Z)}async function Vb(_,N,U=Mn()){if(_.length>be)throw Error(xe);let Y=[],Z=0,re,ie=Array.from({length:Math.min(_.length,Io.concurrency)},async()=>{while(!re){let pe=Z;if(pe>=_.length)return;Z++;try{Y[pe]=await N(_[pe],pe,U.controller.signal)}catch(me){if(!re)re={value:me},Z=_.length,U.controller.abort(me);return}}});if(await Promise.all(ie),re)throw re.value;return Y}function Kb(){return{ok:!1,errors:[xe],entries:[]}}async function dp(_,N,U={}){try{return await Jb(_,N,U,{})}catch(Y){return Pr(Y)}}async function Jb(_,N,U,Y){let Z=hn(_,U),re=d(Z.configTarget);if(re.errors.length>0)return{ok:!1,errors:re.errors,entries:[]};if(!re.config)return{ok:!1,errors:[`No config found at ${Z.configPath}`],entries:[]};let ie=ip(re.config.rules,N);if(!ie.ok)return ie.result;let pe=U.deleteSource?Wb(Z.configDir,ie.specs,Z.filesystemScope):{ok:!0,dirs:[]};if(!pe.ok)return pe.result;let me=r(Z.configTarget);if(me===null)return Pr(Error("Rules config is unavailable."));try{bn(Z.configTarget,{...re.config,rules:re.config.rules.filter((Re)=>!ie.specs.includes(Re))},void 0,Y._testAfterPolicyRename)}catch(Re){throw Sr(Z.configTarget,me),Re}let ke=await Do(_,U,Mn(),Y);if(!ke.ok)return Sr(Z.configTarget,me),ke;let Ce=zb(pe.dirs,Y,Z.filesystemScope);if(!Ce.ok){Sr(Z.configTarget,me);let Re=await Do(_,U,Mn(),Y);if(!Re.ok)return{ok:!1,errors:[...Ce.result.errors,...Re.errors],entries:Re.entries};return Ce.result}return ke}function Wb(_,N,U){let Y=N.flatMap((pe)=>p.test(pe)?[]:["--delete-source can only delete local rulebook sources"]),Z=N.map((pe)=>Ds(_,pe)),re=Y.length>0?[]:Z.flatMap((pe)=>up(pe,U)),ie=[...Y,...re];return ie.length>0?{ok:!1,result:{ok:!1,errors:ie,entries:[]}}:{ok:!0,dirs:Z}}function up(_,N){let U=Db(_),Y=i(N,U),Z=ge(Y);if(!Z)return[`Local rulebook source directory not found: ${_}`];let re=Z.find((ie)=>ie.name==="rulebook.json");if(!re)return[`Local rulebook source directory is missing rulebook.json: ${_}`];if(re.kind!=="file")throw new o(N.label);if(r(i(N,Ds(U,"rulebook.json"))),Z.length>1)return[`Local rulebook source directory contains extra files: ${_}. delete manually if you really want to remove the directory.`];return[]}function zb(_,N,U){let Y=_.flatMap((Z)=>{try{if(!ge(i(U,Z)))return[];let re=up(Z,U);if(re.length>0)return re;return Yb(Z,N,U),[]}catch(re){return[`Failed to delete local rulebook source ${Z}: ${re instanceof Error?re.message:String(re)}`]}});return Y.length>0?{ok:!1,result:{ok:!1,errors:Y,entries:[]}}:{ok:!0}}function Yb(_,N,U){if(N._testDeleteLocalSourceDir){N._testDeleteLocalSourceDir(_);return}W(i(U,Ds(_,he))),wt(i(U,_))}function Sr(_,N){if(N===null){W(_);return}g(_,N)}function Pr(_){return{ok:!1,errors:[_ instanceof Error?_.message:String(_)],entries:[]}}var Zb=".safety-net.json",Xb="~/.cc-safety-net/config.json";async function gp(_,N){let U=A(_,{cwd:N.cwd});if(U)console.log(`Skipped the project scope: ${I(N.cwd)} is the user rule config, not a project rule config`);return[U||await fp(_,{legacyPath:Nt(N.cwd),configPath:I(N.cwd),defaultRulebookName:"project-rules",migratedFrom:Zb,cleanup:N.cleanup,syncOptions:{cwd:N.cwd}}),await fp(_,{legacyPath:Lt(_),configPath:B(_),defaultRulebookName:"user-rules",migratedFrom:Xb,cleanup:N.cleanup,syncOptions:{cwd:N.cwd,global:!0}})].every((Z)=>Z)?0:1}async function fp(_,N){let U=hn(_,N.syncOptions),Y=i(U.filesystemScope,N.legacyPath),Z=r(Y);if(Z===null)return console.log(`No legacy config found at ${N.legacyPath}`),!0;let re=ew(Z);if(!re.ok){for(let _e of re.errors)console.error(_e);return!1}let ie=d(U.configTarget);if(ie.errors.length>0){for(let _e of ie.errors)console.error(_e);return!1}let pe=ie.config??ce,me=nw(pp(N.configPath),pe.rules,N.defaultRulebookName,N.migratedFrom,U.filesystemScope),ke=Lo(pp(N.configPath),me,"rulebook.json"),Ce=i(U.filesystemScope,ke),Re=[mp(U.configTarget),mp(Ce)],Ne=await Qb(_,N,U.configTarget,Ce,me,re.config.rules,{...pe,rules:pe.rules.includes(me)?pe.rules:[...pe.rules,me]});if(!Ne.ok){ow(Re);for(let _e of Ne.errors)console.error(_e);return!1}if(!N.cleanup)return console.log(`Migrated legacy config at ${N.legacyPath}. Legacy file is no longer used.`),!0;if(!rw(U.configTarget,Ce,me,N.migratedFrom,re.config.rules))return console.error(`Migration cleanup verification failed for ${N.legacyPath}`),!1;return W(Y),console.log(`Deleted legacy config at ${N.legacyPath}`),!0}async function Qb(_,N,U,Y,Z,re,ie){try{return bn(U,ie),bn(Y,tw(Z,N.migratedFrom,re)),await No(_,N.syncOptions)}catch(pe){return{ok:!1,errors:[pe instanceof Error?pe.message:String(pe)]}}}function ew(_){try{let N=JSON.parse(_),U=Wo(N);if(U.errors.length>0)return{ok:!1,errors:U.errors};return{ok:!0,config:{version:1,rules:N.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function nw(_,N,U,Y,Z){let re=N.find((ie)=>iw(i(Z,Lo(_,ie,"rulebook.json")))===Y);if(re)return re;if(r(i(Z,Lo(_,U,"rulebook.json")))===null)return U;for(let ie=2;;ie++){let pe=`${U}-${ie}`;if(r(i(Z,Lo(_,pe,"rulebook.json")))===null)return pe}}function tw(_,N,U){return{rulebook_version:1,name:_,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:N,allowed_commands:[...new Set(U.map((Y)=>Y.command))],rules:U,tests:U.map((Y)=>({command:[Y.command,Y.subcommand,Y.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:Y.name}))}}function rw(_,N,U,Y,Z){if(!d(_).config?.rules.includes(U))return!1;try{let ie=r(N);if(ie===null)return!1;let pe=JSON.parse(ie);return pe.migrated_from===Y&&JSON.stringify(pe.rules)===JSON.stringify(Z)}catch{return!1}}function mp(_){return{target:_,content:r(_)}}function ow(_){for(let N of _){if(N.content===null){W(N.target);continue}g(N.target,N.content)}}function iw(_){let N=r(_);if(N===null)return null;try{let U=JSON.parse(N);return typeof U.migrated_from==="string"?U.migrated_from:null}catch{return null}}import{mkdir as sw,readFile as aw,writeFile as lw}from"node:fs/promises";import{dirname as cw,join as dw}from"node:path";var uw=86400000,pw=604800000;async function hp(_,N=Date.now()){if(_.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let U=et(_);if(!U)return null;let Y=dw(U,".cc-safety-net","update-check.json"),Z=await fw(Y,N);if(!Z.lastCheck||N-Z.lastCheck>uw){let pe=await Gn();if(Z.lastCheck=N,pe.latestVersion)Z.latestVersion=pe.latestVersion;if(!await yp(Y,Z))return null;if(pe.error)return null}let re=Z.latestVersion,ie=pn();if(!re||!ei(re,ie))return null;if(Z.notifiedVersion===re&&Z.notifiedAt!==void 0&&N-Z.notifiedAt<pw)return null;if(Z.notifiedVersion=re,Z.notifiedAt=N,!await yp(Y,Z))return null;return`UPDATE_AVAILABLE: cc-safety-net v${re} is available (running v${ie}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function fw(_,N){let U=await aw(_,"utf8").then((re)=>JSON.parse(re)).catch(()=>{return});if(!U||typeof U!=="object"||Array.isArray(U))return{};let Y=U,Z=(re)=>typeof re==="number"&&Number.isFinite(re)&&re<=N?re:void 0;return{lastCheck:Z(Y.lastCheck),latestVersion:typeof Y.latestVersion==="string"?Y.latestVersion:void 0,notifiedVersion:typeof Y.notifiedVersion==="string"?Y.notifiedVersion:void 0,notifiedAt:Z(Y.notifiedAt)}}async function yp(_,N){return sw(cw(_),{recursive:!0,mode:448}).then(()=>lw(_,JSON.stringify(N),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as hw,resolve as Ls}from"node:path";var bp=new Map([["Bash","posix"],["PowerShell","powershell"],["Monitor","posix"]]);var wp=new Map([["Bash","auto"]]);var kp=new Map([["bash","auto"],["Bash","auto"],["powershell","powershell"],["PowerShell","powershell"]]);var Cp=new Map([["Shell","auto"]]);var Sp=new Map([["exec","auto"]]),Pp="write_to_process";var Ep=new Map([["Execute","auto"]]);var Rp=new Map([["run_shell_command","auto"]]);var _p=new Map([["run_terminal_command","auto"],["run_terminal_cmd","auto"],["monitor","auto"],["bash","auto"],["Shell","auto"]]);var Tp=new Map([["terminal","posix"]]);var Ip=new Map([["Bash","posix"]]);var Ap="exec";var gw=[["antigravity-cli",[...Qa.keys(),el]],["claude-code",[...bp.keys()]],["codex",[...wp.keys()]],["copilot-cli",[...kp.keys()]],["cursor",[...Cp.keys()]],["deepseek-harness",[...Qe.keys()]],["devin",[...Sp.keys(),Pp]],["droid",[...Ep.keys()]],["gemini-cli",[...Rp.keys()]],["grok-build",[..._p.keys()]],["hermes-agent",[...Tp.keys()]],["kimi-code",[...Ip.keys()]],["openclaw",[Ap]],["opencode",[Je,Ee]],["pi",[...Xe.keys()]]].flatMap(([_,N])=>N.map((U)=>({name:U,integration:cn(_)}))),Op="and is already analyzed. Built-in tools cannot be declared.";function jo(_){let N=Pe(_),U=[...new Set(gw.filter((Y)=>Pe(Y.name)===N).map((Y)=>Y.integration))].sort((Y,Z)=>Y.localeCompare(Z));if(U.length>0)return`"${_}" is a built-in shell tool of ${yw(U)}, ${Op}`;if(x(_)!=="unknown")return`"${_}" is a built-in file tool, ${Op}`;return}function yw(_){return _.length===1?_[0]??"":`${_.slice(0,-1).join(", ")} and ${_.at(-1)}`}var Dp="CC Safety Net Config",vw="═".repeat(Dp.length),bw="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",ww=new Set(["rule.json","rule.lock","cache"]);function Np(_,N={}){try{return kw(_,N)}catch(U){if(U instanceof o)return console.error(U.message),1;throw U}}function kw(_,N){let U=N.cwd??process.cwd(),Y=Q(_,{cwd:U}),Z=Lt(_),re=Nt(U),ie=Ls(U,ye),pe=i(Y.userScope,Z),me=i(Y.projectScope,re),ke=!1,Ce=!1,Re=[],Ne=[],_e=Cw(i(Y.projectScope,ie));if(Sw(),r(Y.userConfigTarget)!==null){let Te=Un(Y.userConfigTarget);if(Te.errors.push(...z(Y.userConfigPath,Y.userScope),...$p(Y.userConfigTarget)),Re.push({scope:"User",path:Y.userConfigPath,result:Te,schema:"rules",target:Y.userConfigTarget}),Te.errors.length>0)ke=!0}if(r(pe)!==null)if(Ce=!0,r(Y.userConfigTarget)!==null)Ne.push(Ho("user","cleanup"));else{let Te=zo(pe);if(Re.push({scope:"User",path:Z,result:Te,schema:"legacy",inactive:!0,target:pe}),Ne.push(Ho("user",Te.errors.length>0?"fix-or-delete":"migrate")),Te.errors.length>0)ke=!0}if(r(Y.projectConfigTarget)!==null){let Te=Un(Y.projectConfigTarget);if(Te.errors.push(...z(Y.projectConfigPath,Y.projectScope),...$p(Y.projectConfigTarget)),Re.push({scope:"Project",path:Ls(Y.projectConfigPath),result:Te,schema:"rules",target:Y.projectConfigTarget}),Te.errors.length>0)ke=!0;if(r(me)!==null)Ce=!0,Ne.push(Ho("project","cleanup"))}else if(r(me)!==null){Ce=!0,ke=!0;let Te=zo(me);Re.push({scope:"Project",path:Ls(re),result:Te,schema:"legacy",inactive:!0,target:me}),Ne.push(Ho("project",Te.errors.length>0?"fix-or-delete":"migrate"))}if(_e?.result.errors.length)ke=!0;if(Re.length===0&&!_e)return console.log(`
No config files found. Using built-in rules only.`),0;for(let Te of Re)if(Te.inactive)Ew(Te.scope,Te.path,Te.result);else if(Te.result.errors.length>0)Rw(Te.scope,Te.path,Te.result.errors);else{if(Te.schema==="rules"&&Iw(Te.target))console.log(`
Added $schema to ${Te.scope.toLowerCase()} config.`);Pw(Te.scope,Te.path,Te.result,Te.schema)}for(let Te of Ne)console.error(`
${en.red(Te)}`);if(_e)if(_e.result.errors.length>0)Tw(_e.path,_e.result.errors);else _w(_e.path,_e.result);if(ke)return console.error(`
Config validation failed.`),1;return console.log(Ce?`
Configs valid with warnings.`:`
All configs valid.`),0}function $p(_){return(d(_).config?.command_tools??[]).flatMap((N)=>jo(typeof N==="string"?N:N.name)??[])}function Ho(_,N){let U=`legacy ${_} config`;if(N==="cleanup")return`Warning: Legacy ${_} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(N==="migrate")return`Warning: Legacy ${_} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${_} config is no longer supported. Fix or delete the ${U}, then run \`npx -y cc-safety-net rule migrate\`.`}function Cw(_){if(ge(_)===null)return null;let N=xw(_);if(N.ruleNames.size===0&&N.errors.length===0)return null;return{path:_.path,result:N}}function xw(_){let N=[],U=new Set,Y=(ge(_)??[]).filter((Z)=>!ww.has(Z.name)).sort((Z,re)=>Z.name.localeCompare(re.name));if(Y.length===0)return{errors:N,ruleNames:U};for(let Z of Y){if(!p.test(Z.name)){N.push(`rulebook directory names must match ${p}: ${Z.name}`);continue}if(Z.kind!=="directory"){N.push(`${Z.name} must be a rulebook directory`);continue}let re=i(_.scope,hw(_.path,Z.name,"rulebook.json")),ie=r(re);if(ie===null){N.push(`${Z.name}/rulebook.json is required`);continue}try{let pe;try{pe=JSON.parse(ie)}catch{N.push(`${Z.name}/rulebook.json: invalid JSON`);continue}let me=ue(pe);if(me.name!==Z.name){N.push(`rulebook name "${me.name}" must match folder "${Z.name}"`);continue}let ke=To(me);if(ke.length>0){N.push(...ke.map((Ce)=>`${Z.name}/rulebook.json: ${Ce}`));continue}U.add(Z.name)}catch(pe){N.push(pe instanceof Error?`${Z.name}/rulebook.json: ${pe.message}`:`${Z.name}/rulebook.json: ${String(pe)}`)}}return{errors:N,ruleNames:U}}function Sw(){console.log(Dp),console.log(vw)}function Pw(_,N,U,Y){if(console.log(`
✓ ${_} config: ${N}`),console.log(`  Schema: ${Y==="rules"?"rulebook sources":"legacy inline rules"}`),U.ruleNames.size>0){console.log(`  ${Y==="rules"?"Sources":"Rules"}:`);let Z=1;for(let re of U.ruleNames)console.log(`    ${Z}. ${re}`),Z++}else console.log(`  ${Y==="rules"?"Sources":"Rules"}: (none)`)}function Ew(_,N,U){if(console.error(`
✗ Legacy ${_.toLowerCase()} config: ${N}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),U.errors.length>0){console.error("  Errors:");let Y=1;for(let Z of U.errors)for(let re of Z.split("; "))console.error(`    ${Y}. ${re}`),Y++;return}if(U.ruleNames.size>0){console.error("  Rules:");let Y=1;for(let Z of U.ruleNames)console.error(`    ${Y}. ${Z}`),Y++;return}console.error("  Rules: (none)")}function Rw(_,N,U){Lp(`${_} config`,N,U)}function _w(_,N){console.log(`
✓ GitHub source rules: ${_}`),console.log("  Rulebooks:");let U=1;for(let Y of N.ruleNames)console.log(`    ${U}. ${Y}`),U++}function Tw(_,N){Lp("GitHub source rules",_,N)}function Lp(_,N,U){console.error(`
✗ ${_}: ${N}`),console.error("  Errors:");let Y=1;for(let Z of U)for(let re of Z.split("; "))console.error(`    ${Y}. ${re}`),Y++}function Iw(_){try{let N=r(_);if(N===null)return!1;let U=JSON.parse(N);if(U.$schema)return!1;return g(_,JSON.stringify({$schema:bw,...U},null,2)),!0}catch(N){if(N instanceof o)throw N;return!1}}var jp=new Set(["init","add","remove","update","sync","list","wrapper","tool","migrate","doc","verify"]),Ow=new Set(["init","add","remove","update","sync","wrapper"]),Fp=new Set(["add","remove","list"]),$w="cc-safety-net/rulebooks";async function Mp(_,N){try{return await Dw(_,N)}catch(U){if(U instanceof o)return console.error(U.message),1;throw U}}async function Dw(_,N){let U=Lw(N),Y=U.help?Nw(U.positionals):null;if(Y)return Wt(Y),0;if(U.errors.length>0){for(let ke of U.errors)console.error(ke);return 1}let Z=U.positionals[0];if(!Z)return Wt(Dt,console.error),1;let re=U.positionals[1],ie={global:U.global},pe=process.cwd();if((Z==="tool"?U.project:!U.global&&Ow.has(Z)&&!(Z==="wrapper"&&re==="list"))&&A(_,{cwd:pe}))return console.error(`${I(pe)} is the user rule config, not a project rule config; ${Z==="tool"?"drop --project":"use --global"} for the user scope, or run from a project directory`),1;if(Z==="init"){let ke=hn(_,ie);Fw(ke.configTarget);let Ce=Aw(ke.configDir,"example-rules","rulebook.json"),Re=i(ke.filesystemScope,Ce);if(U.example&&r(Re)===null)Vu(Re);let Ne=z(ke.configPath,ke.filesystemScope);for(let _e of Ne)console.error(_e);if(Ne.length>0)return 1;return console.log("Rule config initialized."),0}if(Z==="add"){let ke=Up(U);if(!ke)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let Ce=hn(_,ie),Re=await cp(_,ke,{...ie,ref:U.ref,rulebooks:U.only.length>0?U.only:void 0});return Fu(Re,ke,`Scope: ${U.global?"user":"project"} (${Ce.configDir})`),Re.ok?0:1}if(Z==="remove"){if(!re)return console.error("rule remove requires a source"),1;let ke=await dp(_,re,{...ie,deleteSource:U.deleteSource});return _o(ke,`Removed rulebook source: ${re}`),ke.ok?0:1}if(Z==="update"){let ke=await No(_,{...ie,only:re,refresh:!0});return _o(ke,"Rule config updated."),ke.ok?0:1}if(Z==="sync")return Ka(_,{global:U.global});if(Z==="list"){let ke=ee(_,{cwd:pe});return Uu(ke),ke.errors.length>0?1:0}if(Z==="wrapper")return Mw(_,U);if(Z==="tool")return Gw(_,U,pe);if(Z==="migrate")return gp(_,{cleanup:U.cleanup,cwd:pe});if(Z==="doc"){console.log(ju);let ke=await hp(_);if(ke)console.error(ke);return 0}if(Z==="verify")return Np(_);return 1}function Nw(_){if(_.length===0)return Dt;let N=Dt.subcommands.filter((Y)=>Y.usage.split(" ")[0]===_[0]);if(N.length===0)return null;if(_.length===1&&N.length>1)return{name:`rule ${_[0]}`,description:`Subcommands of rule ${_[0]}`,usage:`rule ${_[0]} <subcommand>`,subcommands:N,options:[]};let U=_.length===1?N[0]:N.find((Y)=>Y.usage.split(" ")[1]===_[1]);if(!U)return null;return{name:`rule ${_[0]}`,description:U.description,usage:`rule ${U.usage}`,options:_[0]==="add"?Vo:[],examples:_[0]==="add"?Ko:void 0}}function Lw(_){let N=mn({label:"rule",booleans:{global:["-g","--global"],project:["--project"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"],cwdArg:["--cwd-arg"]},lists:{only:["--only"]},positionals:"list"},_),U={...N.flags,ref:N.values.ref,cwdArg:N.values.cwdArg,only:N.lists.only??[],help:N.help,positionals:N.positionals,errors:N.errors};return jw(U),U}function jw(_){let[N]=_.positionals;if(N&&!jp.has(N))_.errors.push(`Unknown rule subcommand: ${N}`);if(_.deleteSource&&N!=="remove")if(N&&jp.has(N))_.errors.push(`Unknown option for rule ${N}: --delete-source`);else _.errors.push("--delete-source is only valid with 'rule remove'");if(_.cleanup&&N!=="migrate")_.errors.push(zn(N,"--cleanup"));if(_.example&&N!=="init")_.errors.push(zn(N,"--example"));if(_.ref&&N!=="add")_.errors.push(zn(N,"--ref"));if(_.only.length>0&&N!=="add")_.errors.push(zn(N,"--only"));let U=N==="tool"?_.positionals[1]:void 0,Y=U&&Fp.has(U)?`tool ${U}`:N;if(_.project&&U!=="add"&&U!=="remove")_.errors.push(zn(Y,"--project"));if(_.cwdArg!==void 0&&U!=="add")_.errors.push(zn(Y,"--cwd-arg"));if(N==="tool"&&_.global)_.errors.push(zn(N,"--global"));if(N==="add")Hw(_);if(N==="migrate"){if(_.global)_.errors.push(zn(N,"--global"));if(_.positionals.length>1)_.errors.push(`Unexpected rule migrate argument: ${_.positionals[1]}`)}else if(N==="wrapper")Hp(_,"a command");else if(N==="tool")Hp(_,"a tool name");else if(_.positionals.length>2)_.errors.push(`Unexpected rule argument: ${_.positionals[2]}`);if(N==="list"&&_.global)_.errors.push("Unknown option for rule list: --global")}function Up(_){if(_.positionals[1])return _.positionals[1];if(_.ref||_.only.length>0)return $w;return}function Hw(_){let N=Up(_);if(!N)return;if((_.ref||_.only.length>0)&&!X(N)){if(_.ref)_.errors.push(`--ref can only select a ref for an owner/repo source: ${N}`);if(_.only.length>0)_.errors.push("--only can only select rulebooks from an owner/repo source");return}if(_.ref&&!ae(_.ref))_.errors.push(`--ref must use valid path segments: ${_.ref}`);let U=_.only.filter((Y)=>!p.test(Y));if(U.length>0)_.errors.push(`Invalid rulebook names: ${U.join(", ")}`)}function zn(_,N){return _?`Unknown option for rule ${_}: ${N}`:`Unknown option for rule: ${N}`}function Hp(_,N){let U=_.positionals[0],Y=_.positionals[1],Z=_.positionals[2];if(!Y){_.errors.push(`rule ${U} requires add, remove, or list`);return}if(!Fp.has(Y)){_.errors.push(`Unknown rule ${U} action: ${Y}`);return}if(Y==="list"){if(Z)_.errors.push(`Unexpected rule ${U} argument: ${Z}`);return}if(!Z){_.errors.push(`rule ${U} ${Y} requires ${N}`);return}if(U!=="tool"&&_.positionals.length>3)_.errors.push(`Unexpected rule ${U} argument: ${_.positionals[3]}`)}function Fw(_){if(r(_)===null){qu(_);return}let N=d(_);if(!N.config)return;bn(_,N.config)}async function Mw(_,N){let U=N.positionals[1],Y=N.positionals[2],Z=hn(_,{global:N.global}).configTarget;if(U==="list"){let me=d(Z);if(me.errors.length>0){for(let ke of me.errors)console.error(ke);return 1}return Uw(me.config?.transparent_wrappers??[]),0}if(!Y||!E.test(Y))return console.error("transparent wrapper must match command pattern"),1;if(Fe(Y))return console.error(`reserved command "${Y}" cannot be a wrapper`),1;let re=d(Z);if(re.errors.length>0){for(let me of re.errors)console.error(me);return 1}let ie=re.config??ce,pe=U==="add"?[...new Set([...ie.transparent_wrappers??[],Y])]:(ie.transparent_wrappers??[]).filter((me)=>me!==Y);return bn(Z,{...ie,transparent_wrappers:pe}),console.log(U==="add"?`Added transparent wrapper: ${Y}`:`Removed transparent wrapper: ${Y}`),0}function Uw(_){if(_.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${_.length}):`);for(let N of _)console.log(`  - ${N}`)}function Gw(_,N,U){let Y=N.positionals[1],Z=[...new Set(N.positionals.slice(2))];if(Y==="list")return Bw(_,U);let re=[...Z.flatMap((ke)=>{if(!je.test(ke))return[`"${ke}" is not a tool name: ${ve}.`];let Ce=Y==="add"?jo(ke):void 0;return Ce?[Ce]:[]}),...N.cwdArg!==void 0&&!je.test(N.cwdArg)?[`"${N.cwdArg}" is not an argument name: ${ve}.`]:[]];if(re.length>0){for(let ke of re)console.error(en.red(`Error: ${ke}`));return 1}let ie=hn(_,{global:!N.project}),pe=xr(ie.configTarget);if(!pe.ok){for(let ke of pe.result.errors)console.error(ke);return 1}let me=Z.reduce((ke,Ce)=>{let Re=N.cwdArg===void 0?Ce:{name:Ce,cwd:N.cwdArg},Ne=(_e)=>(typeof _e==="string"?_e:_e.name)===Ce;if(Y==="remove")return ke.filter((_e)=>!Ne(_e));return ke.some(Ne)?ke.map((_e)=>Ne(_e)?Re:_e):[...ke,Re]},pe.config.command_tools??[]);bn(ie.configTarget,{...pe.config,command_tools:me});for(let ke of Z)console.log(Y==="add"?`Added command tool: ${ke}${N.cwdArg===void 0?"":` (cwd argument: ${N.cwdArg})`}`:`Removed command tool: ${ke}`);return console.log(`Scope: ${N.project?"project":"user"} (${ie.configPath})`),0}function Bw(_,N){let U=(A(_,{cwd:N})?["user"]:["user","project"]).map((Z)=>{let re=hn(_,{global:Z==="user"});return{scope:Z,path:re.configPath,...d(re.configTarget)}}),Y=U.flatMap((Z)=>Z.errors.map((re)=>`${Z.path}: ${re}`));if(Y.length>0){for(let Z of Y)console.error(Z);return 1}return Gu(U.flatMap((Z)=>(Z.config?.command_tools??[]).map((re)=>({scope:Z.scope,tool:re})))),0}import{sep as zw}from"node:path";import{existsSync as qw,readFileSync as Vw}from"node:fs";import{join as Kw}from"node:path";async function Jw(_){if(_.isTTY)return null;return(await it(_).catch(()=>null))?.trim()||null}function Ww(_){let N=_.env.get("CLAUDE_SETTINGS_PATH");if(N)return N;return Kw(Vr(_),"settings.json")}function js(_){let N=Ww(_);if(!qw(N))return!1;try{let U=Vw(N,"utf-8"),Y=JSON.parse(U);if(!Y.enabledPlugins)return!1;let Z="cc-safety-net@cc-marketplace";if(!(Z in Y.enabledPlugins))return!1;return Y.enabledPlugins[Z]===!0}catch(U){if(S(n.debug,_.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${N}: ${U instanceof Error?U.message:String(U)}`);return!1}}async function Hs(_,N=process.stdin){let U=js(_),Y;if(!U)Y="\uD83D\uDEE1️ CC Safety Net ❌";else{let re=R(_,{cwd:process.cwd()}),ie=re.policy,pe=P(ie,_.env),me=Object.values(q(ie,pe.capabilities)).some((Re)=>Re.changesInherited),ke={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[me?"custom":pe.effectiveLevel],Ce=re.policyScopes&&!re.policyScopes.weakeningsIgnored&&re.policyScopes.weakenings.length>0?"\uD83D\uDD3B":"";Y=`\uD83D\uDEE1️ CC Safety Net ${ke}${pe.worktreeMode?"\uD83C\uDF33":""}${Ce}${re.state==="degraded"?"⚠️":""}`}let Z=await Jw(N);if(Z&&!Z.startsWith("{"))console.log(`${Z} | ${Y}`);else console.log(Y)}function Gp(_){let N=R(_,{cwd:process.cwd()}),U=N.policy,Y=P(U,_.env),Z=!!process.env.NO_COLOR||!process.stdout.isTTY,re=Math.min(process.stdout.columns||80,100),ie=Z?"ok":"✔",pe=Z?"OFF":"✘",me=(We,Me)=>{let Ye=`  ${We.padEnd(13)}${Me}`;return(Ye.length>re?`${Ye.slice(0,re-1)}…`:Ye).replaceAll(pe,en.red(pe))},ke=Object.values(q(U,Y.capabilities)).some((We)=>We.changesInherited),Ce=(We)=>We===_.home||We.startsWith(`${_.home}${zw}`)?`~${We.slice(_.home.length)}`:We,Re={ready:en.green,degraded:en.yellow}[N.state],Ne=N.policyScopes?.weakenings??[],_e=[...js(_)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...N.diagnostics],Te=Z?"-":"·";console.log([`${Z?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Re(N.state)}`,"",me("Protection",`destructive ${U.destructiveCommandProtectionEnabled?ie:pe}   secrets ${U.secretProtection.enabled?ie:pe}`),me("Level",ke?`${Y.effectiveLevel} (customised)`:Y.effectiveLevel),me("Rules",U.rules.length===0?"none active":`${U.rules.length} active`),me("Policy",Ce(u(_))),...N.policyScopes?[me("Project",Ce(h(process.cwd())))]:[],...Y.worktreeMode?[me("Worktree","relaxations active")]:[],"",...Ne.length===0?[]:[N.policyScopes?.weakeningsIgnored?"  Project policy (ignored)":"  Project policy",...Ne.flatMap((We)=>fr(We,"      ",re-6).map((Me,Ye)=>Ye===0?`    ${Me}`:Me)),""],..._e.length===0?["  Everything configured is active."]:["  Not active",..._e.flatMap((We)=>fr(We,"      ",re-6).map((Me,Ye)=>Ye===0?`    ${Te} ${Me}`:Me)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as Qp}from"node:child_process";import{randomBytes as ik}from"node:crypto";import{existsSync as sk}from"node:fs";import{createServer as ak}from"node:http";import{Writable as lk}from"node:stream";var Fo=500;function Yw(_){let N=_.filter((Z)=>Z.decision!=="allow"),U=_.filter((Z)=>Z.decision==="allow"),Y=Math.min(N.length,Math.max(Fo-U.length,Math.ceil(Fo/2)));return[...N.slice(0,Y),...U.slice(0,Fo-Y)]}function Bp(_,N,U=G(_)){if(U)J(_,U);let Y=(Me)=>new Date(Me.getFullYear(),Me.getMonth(),Me.getDate()).getTime(),Z=Y(new Date),re=new Date(Z);re.setDate(re.getDate()-(N-1));let ie=re.getTime(),pe=[],me={count:0};for(let Me of U?Yn(U,me):[])for(let Ye of $t(Me,me)){let tn=new Date(Ye.ts).getTime();if(!Number.isFinite(tn))continue;if(tn>=ie)pe.push(Ye)}pe.sort((Me,Ye)=>new Date(Ye.ts).getTime()-new Date(Me.ts).getTime());let ke=Array.from({length:N},()=>0),Ce=Array.from({length:N},()=>0),Re={},Ne={},_e={},Te=0,We=0;for(let Me of pe){let Ye=Me.agent||"unknown";Re[Ye]=(Re[Ye]??0)+1;let tn=Math.round((Z-Y(new Date(Me.ts)))/86400000),on=N-1-tn,an=tn>=0&&tn<N;if(an)Ce[on]=(Ce[on]??0)+1;if(Me.decision!=="allow"){if(Te++,Me.ruleId)Ne[Me.ruleId]=(Ne[Me.ruleId]??0)+1;let nn=Go(Me.segment||Me.command);if(nn)_e[nn]=(_e[nn]??0)+1;if(Me.failureStage)We++;if(an)ke[on]=(ke[on]??0)+1}}return{days:N,logsDir:U,homeDir:_.home,totalInWindow:pe.length,truncated:pe.length>Fo,unreadable:me.count,counts:{blocked:Te,allowed:pe.length-Te,agents:Re,blockedByDay:ke,analyzedByDay:Ce,rules:Ne,commands:_e,errors:We},entries:Yw(pe).sort((Me,Ye)=>new Date(Ye.ts).getTime()-new Date(Me.ts).getTime())}}import{spawn as Zw}from"node:child_process";import{existsSync as Xw,statSync as qp}from"node:fs";import{delimiter as Qw,join as ek}from"node:path";var nk=120000,Mo="Choose the project folder",tk=`try
  return POSIX path of (choose folder with prompt "${Mo}")
on error number -128
  return ""
end try`,rk=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Mo}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Vp=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Mo}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Mo]}],Kp=(_,N)=>(N.PATH??"").split(Qw).some((U)=>{if(U.length===0)return!1;try{let Y=qp(ek(U,_));return Y.isFile()&&(Y.mode&73)!==0}catch{return!1}});function Fs(_,N){if(_==="darwin"||_==="win32")return!0;if(_!=="linux")return!1;if(!N.DISPLAY&&!N.WAYLAND_DISPLAY)return!1;return Vp.some((U)=>Kp(U.binary,N))}function ok(_,N){if(_==="darwin")return{cmd:"osascript",args:["-e",tk]};if(_==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",rk]};let U=Vp.find((Y)=>Kp(Y.binary,N));return U?{cmd:U.binary,args:U.args}:null}function Ms(_=process.platform,N=process.env){let U=ok(_,N);if(!U)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((Y)=>{let Z=Zw(U.cmd,U.args,{env:N,stdio:["ignore","pipe","pipe"]}),re="",ie=!1,pe=(ke)=>{if(ie)return;ie=!0,clearTimeout(me),Y(ke)},me=setTimeout(()=>{Z.kill(),pe({error:"The folder dialog timed out"})},nk);Z.stdout.on("data",(ke)=>{re+=ke.toString()}),Z.on("error",()=>pe({error:`Could not open the folder dialog (${U.cmd})`})),Z.on("close",()=>{let ke=re.trim().replace(/\/+$/,"");if(!ke)return pe({cancelled:!0});if(!Xw(ke)||!qp(ke).isDirectory())return pe({error:"That selection is not a folder on disk"});pe({path:ke})})})}var Jp=`<!doctype html>
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
`;var Wp='<script id="ccsn-data" type="application/json">';function zp(_,N=Jp){return N.replace(Wp,()=>Wp+JSON.stringify({token:_}).replaceAll("<","\\u003c"))}var Gs="kenryu42/cc-safety-net",ck=`https://github.com/${Gs}`,ef=1e4,dk=7,uk="The project draft directory changed; reload the draft before applying.",pk="audit settings are user scope only; remove the audit section from a project proposal";async function nf(_,N={}){let U=mn({label:"gui",booleans:{noOpen:["--no-open"]}},_),Y=N.log??console.log,Z=N.error??console.error;if(U.errors.length>0){for(let ie of U.errors)Z(ie);return Z("Usage: cc-safety-net gui [--no-open]"),1}let re=await fk(c,N);if(Y(`CC Safety Net policy GUI: ${re.url}`),!U.flags.noOpen)try{await(N.openBrowser??Sk)(re.url)}catch(ie){Z(`Failed to open browser: ${ie instanceof Error?ie.message:String(ie)}`),Z(`Open this URL manually: ${re.url}`)}if(N.keepAlive===!1)return await re.close(),0;return await xk(re),0}async function fk(_,N={}){let U=ik(24).toString("base64url"),Y={dir:null,revision:0},Z=ak((pe,me)=>{mk(_,pe,me,U,N,Y)});await new Promise((pe,me)=>{Z.once("error",me),Z.listen(0,"127.0.0.1",()=>{Z.off("error",me),pe()})});let ie=`http://127.0.0.1:${Z.address().port}`;return{origin:ie,token:U,url:`${ie}/?token=${encodeURIComponent(U)}`,close:()=>Ck(Z)}}async function mk(_,N,U,Y,Z,re){let ie=_(),pe=new URL(N.url??"/","http://127.0.0.1");if(N.method==="GET"&&pe.pathname==="/favicon.ico"){U.writeHead(204,{"cache-control":"no-store"}),U.end();return}if(!bk(N,pe,Y)){rn(U,403,{error:"Forbidden"});return}if(N.method==="GET"&&pe.pathname==="/"){await Promise.resolve(Z.buildDocument?.()).then((me)=>kk(U,zp(Y,me)),(me)=>rn(U,500,{error:me instanceof Error?me.message:String(me)}));return}if(N.method==="GET"&&pe.pathname==="/api/policy"){let me=Iu(ie,Z),ke=R(ie,Us(Z));rn(U,200,{...me,configState:ze(ke),...ke.policyScopes?{projectPolicy:{path:h(Z.cwd??process.cwd()),weakenings:ke.policyScopes.weakeningsIgnored?[]:ke.policyScopes.weakenings}}:{},destructiveCommandRules:V,secretPatterns:ut,version:pn(),preview:me.errors.length>0?null:He(me.policy,ie.env)});return}if(N.method==="POST"&&pe.pathname==="/api/policy/preview"){let me=await Er(N);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=Au(ie,me.value);rn(U,ke.errors.length>0?400:200,ke);return}if(N.method==="POST"&&pe.pathname==="/api/policy/explain"){let me=await Er(N);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=me.value;if(ke===null||typeof ke.command!=="string"){rn(U,400,{errors:["command must be a string"]});return}let Ce=kr(ke.policy,ie.home);if(Ce.length>0){rn(U,400,{errors:Ce});return}rn(U,200,hk(ie,ke.command,ke.policy,Z));return}if(N.method==="POST"&&pe.pathname==="/api/policy"){let me=await Er(N);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=Fn(ie,me.value,Z);rn(U,ke.errors.length>0?400:200,ke);return}if(N.method==="POST"&&pe.pathname==="/api/reset"){rn(U,200,Fn(ie,F,Z));return}if(N.method==="POST"&&pe.pathname==="/api/repair"){rn(U,200,Ou(ie,Z));return}if(N.method==="POST"&&pe.pathname==="/api/policy/project/choose-directory"){let me=await(Z.chooseDirectory??Ms)();if("path"in me)re.dir=me.path,re.revision+=1;rn(U,200,{cancelled:"cancelled"in me,..."error"in me?{error:me.error}:{}});return}if(N.method==="GET"&&pe.pathname==="/api/policy/project"){let me=tf(re,Z),ke=rf(ie,me,Z),Ce=ke?{projection:{},diagnostics:[ke]}:Yp(me,ie.home),Re=Cr(ie,Z);rn(U,200,{path:h(me),revision:re.revision,baseline:Re.baseline,userPolicyDiagnostics:Re.diagnostics,projection:Ce.projection,projectionDiagnostics:Ce.diagnostics,canPickDirectory:Fs(process.platform,process.env)});return}if(N.method==="POST"&&pe.pathname==="/api/policy/project/diff"){let me=await Zp(ie,N,U,re,Z);if(!me)return;let ke=Yp(me.dir,ie.home),Ce=Cr(ie,Z).baseline,Re=te(Ce,de(me.proposal,ie.home).policy);rn(U,200,{rows:Eo(te(Ce,ke.projection).policy,Re.policy,!1),weakenings:Re.weakenings,existingFileDiagnostics:ke.diagnostics});return}if(N.method==="POST"&&pe.pathname==="/api/policy/project/apply"){let me=await Zp(ie,N,U,re,Z);if(!me)return;let ke=yk(me.dir,me.proposal,ie.home);rn(U,ke.errors.length>0?500:200,ke);return}if(N.method==="GET"&&pe.pathname==="/api/activity"){let me=oe(ie,Z),ke=vk(pe.searchParams.get("days"),me);if(ke===null){rn(U,400,{error:`days must be an integer between 1 and ${me}`});return}rn(U,200,Bp(ie,ke,Z.activityLogsDir));return}if(N.method==="POST"&&pe.pathname==="/api/rules/choose-directory"){rn(U,200,await Ms());return}if(N.method==="GET"&&pe.pathname==="/api/rules"){let me=ee(ie,Us(Z)),ke=new Map(me.rules.map((Ce)=>[Ce.name,Ce]));rn(U,200,{projectPath:Z.cwd??process.cwd(),canPickDirectory:Fs(process.platform,process.env),rulebooks:me.rulebooks.map((Ce)=>({source:Ce.source,spec:Ce.spec,name:Ce.name,version:Ce.version,rules:Ce.rules.flatMap((Re)=>{let Ne=ke.get(Re);if(!Ne)return[];return[{name:Ne.name,command:Ne.command,subcommand:Ne.subcommand,block_args:Ne.block_args,reason:Ne.reason}]})})),errors:me.errors,warnings:me.warnings});return}if(N.method==="GET"&&pe.pathname==="/api/star/context"){rn(U,200,await(Z.fetchStarContext??(()=>Ik(ie,{logsDir:Z.activityLogsDir})))());return}if(N.method==="POST"&&pe.pathname==="/api/star"){let me=await(Z.starRepo??Pk)();rn(U,200,me.ok?{ok:!0}:{ok:!1,fallbackUrl:ck});return}if(N.method==="GET"&&pe.pathname==="/api/integrations"){rn(U,200,await(Z.fetchIntegrations??(()=>Ek(ie)))());return}if(N.method==="GET"&&pe.pathname==="/api/health"){rn(U,200,await(Z.fetchHealth??_k)());return}if(N.method==="POST"&&(pe.pathname==="/api/install"||pe.pathname==="/api/uninstall")){let me=await Er(N);if(!me.ok){rn(U,me.status,{errors:[me.error]});return}let ke=me.value?.target;if(typeof ke!=="string"||!On.some((Re)=>Re.target===ke)){rn(U,400,{error:"unknown target"});return}let Ce=pe.pathname==="/api/install"?"install":"uninstall";rn(U,200,await(Z.runIntegration??Tk)(Ce,ke));return}rn(U,404,{error:"Not found"})}function Us(_){return{..._,cwd:_.cwd??process.cwd()}}function tf(_,N){return _.dir??N.cwd??process.cwd()}function rf(_,N,U){if(!A(_,{...U,cwd:N}))return null;return`${h(N)} is the user policy, not a project policy; choose a project directory, or run the GUI from one`}function Yp(_,N){let U=h(_),Y=sk(U)?Ot(U):{value:void 0,errors:[]},Z=de(Y.value,N);return{projection:Z.policy,diagnostics:[...Y.errors,...Z.diagnostics]}}async function Zp(_,N,U,Y,Z){let re=tf(Y,Z),ie=Y.revision,pe=await Er(N);if(!pe.ok)return rn(U,pe.status,{errors:[pe.error]}),null;let me=pe.value;if(typeof me?.revision!=="number")return rn(U,400,{errors:["revision must be a number"]}),null;if(me.revision!==ie)return rn(U,409,{errors:[uk]}),null;let ke=rf(_,re,Z);if(ke)return rn(U,400,{errors:[ke]}),null;let Ce=gk(me.proposal,_.home);if(Ce.length>0)return rn(U,400,{errors:Ce}),null;return{dir:re,proposal:me.proposal}}function gk(_,N){let U=kr(_,N);if(U.length>0)return U;return _?.audit===void 0?[]:[pk]}function yk(_,N,U){let Y=h(_),Z=Ro(N,k(N,U));try{return g(i(w(_,"project policy"),Y),`${JSON.stringify(Z,null,2)}
`),{path:Y,errors:[]}}catch(re){return{path:Y,errors:[re instanceof Error?re.message:String(re)]}}}function hk(_,N,U,Y){let Z=k(U,_.home),re=R(_,Us(Y)),ie=De({rules:re.policy.rules,transparentWrappers:re.policy.transparentWrappers,commandTools:re.policy.commandTools,safety:Be(Z.safety),worktreeMode:Z.workflow.worktree_mode,destructiveCommandProtectionEnabled:Z.destructive_command_protection.enabled,destructiveCommandRuleOverrides:Z.destructive_command_protection.overrides,destructiveCommandAllowPaths:Z.destructive_command_protection.allow_paths,secretProtection:{enabled:Z.secret_protection.enabled,disabledRules:ft(Z.secret_protection.overrides),denyPaths:Z.secret_protection.deny_paths,allowPaths:Z.secret_protection.allow_paths}});return mr(N,{policySnapshot:ie,cwd:Y.cwd,userConfigDir:Y.userConfigDir},_)}function vk(_,N){if(_===null)return Math.min(dk,N);let U=Number(_);if(!Number.isInteger(U)||U<1||U>N)return null;return U}function bk(_,N,U){if(N.searchParams.get("token")!==U)return!1;if(_.method!=="POST")return!0;return _.headers["x-cc-safety-net-token"]===U}var wk=1048576;async function Er(_){let N=[],U=0;for await(let Y of _){let Z=Y;if(U+=Z.byteLength,U>wk)return{ok:!1,status:413,error:"Request body is too large"};N.push(Z)}try{return{ok:!0,value:JSON.parse(Buffer.concat(N).toString("utf-8")||"{}")}}catch(Y){return{ok:!1,status:400,error:`Invalid JSON: ${Y instanceof Error?Y.message:String(Y)}`}}}function kk(_,N){_.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),_.end(N)}function rn(_,N,U){_.writeHead(N,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),_.end(JSON.stringify(U))}function Ck(_){return new Promise((N,U)=>{_.close((Y)=>Y?U(Y):N())})}function xk(_){return new Promise((N)=>{let U=()=>{process.off("SIGINT",Y),process.off("SIGTERM",Y)},Y=()=>{U(),_.close().then(N)};process.once("SIGINT",Y),process.once("SIGTERM",Y)})}function Sk(_){let N=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",U=process.platform==="win32"?["/c","start","",_]:[_];return new Promise((Y,Z)=>{let re=Qp(N,U,{detached:!0,stdio:"ignore"}),ie=(me)=>{re.off("spawn",pe),Z(me)},pe=()=>{re.off("error",ie),re.unref(),Y()};re.once("error",ie),re.once("spawn",pe)})}async function Pk(_="gh",N=ef){return{ok:await Ak(_,["api","-X","PUT",`/user/starred/${Gs}`],N)===0}}async function Ek(_,N={}){let U=await Nr((Z)=>Kt({environment:_,cwd:process.cwd(),openCodeVersion:Z}).status!=="n/a",N.fetcher),Y=Rk(_,U);return{targets:En.map((Z)=>{let re=Y.find((ie)=>ie.platform===Z.id);return{target:Z.id,label:cn(Z.id),version:U.versions[Z.id]??null,status:re?.configured?"active":re?.detected?"disabled":re?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:U.version,nodeVersion:U.nodeVersion,platform:U.platform}}}function Rk(_,N){return Jt(_,process.cwd(),{ampPluginListOutput:N.ampPluginListOutput,codexPluginListOutput:N.codexPluginListOutput,copilotCliVersion:N.versions["copilot-cli"],openCodeVersion:N.versions.opencode,openCodePluginListOutput:N.openCodePluginListOutput})}async function _k(_={}){let N=await(_.checkUpdates??Gn)();return{update:{latestVersion:N.latestVersion??null,updateAvailable:N.updateAvailable}}}var Xp=Promise.resolve();function Tk(_,N,U={}){let Y=async()=>{let re=[],{log:ie,error:pe}=console;console.log=(...me)=>re.push(me.map(String).join(" ")),console.error=console.log;try{return{ok:await wr(_,[],{selectTargets:async()=>[N],output:new lk({write(ke,Ce,Re){re.push(String(ke).replace(/\n$/,"")),Re()}}),...U})===0,output:re.join(`
`)}}finally{console.log=ie,console.error=pe}},Z=Xp.then(Y);return Xp=Z.then(()=>{return},()=>{return}),Z}async function Ik(_,N={}){let[U,Y]=await Promise.all([Ok(N.fetchRepo),Promise.resolve(Ar(_,oe(_),N.logsDir).totalBlocked)]);return{starCount:U,blockedTotal:Y}}function Ak(_,N,U){return new Promise((Y)=>{let Z=Qp(_,N,{stdio:"ignore",windowsHide:!0}),re=!1,ie=setTimeout(()=>{Z.kill(),pe(null)},U),pe=(me)=>{if(re)return;re=!0,clearTimeout(ie),Y(me)};Z.once("error",()=>pe(null)),Z.once("close",pe)})}async function Ok(_=fetch){try{let N=await _(`https://api.github.com/repos/${Gs}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(ef)});if(!N.ok)return null;let U=await N.json();return typeof U.stargazers_count==="number"?U.stargazers_count:null}catch{return null}}function $k(_){if(_[0]!=="help")return!1;let N=_[1];if(!N)fs(),process.exit(0);if(gr(N))process.exit(0);console.error(`Unknown command: ${N}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var Dk={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),gr("hook",console.error),process.exit(1)},install:async(_)=>{process.exit(await wr("install",_))},update:async(_)=>{process.exit(await _s(_))},uninstall:async(_)=>{process.exit(await wr("uninstall",_))},rule:async(_)=>{process.exit(await Mp(c(),_))},policy:async(_)=>{process.exit(await Lu(c(),_))},status:async(_)=>{if($n(mn({label:"status"},_).errors))process.exit(1);Gp(c())},statusline:async(_)=>{let N=mn({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},_);if(N.errors.length===0&&N.flags.claudeCode){await Hs(c());return}if($n(N.errors),!N.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");gr("statusline",console.error),process.exit(1)},doctor:async(_)=>{let N=is(_);if(!N)process.exit(1);let U=await Yc(c(),{json:N.json,skipUpdateCheck:N.skipUpdateCheck});process.exit(U)},logs:async(_)=>{process.exit(await Ys(c(),_))},gui:async(_)=>{process.exit(await nf(_))},explain:async(_)=>{process.exit(await ad(c(),_))}};async function Nk(_){let N=mn({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},_);if($k(_))return;let U=_[0],Y=U?Ir(U):void 0;if(N.help&&Y&&Y.name!=="rule")gr(Y.name),process.exit(0);if(!U||N.help&&!Y)fs(),process.exit(0);if(N.flags.version)dd(),process.exit(0);if(Y){await Dk[Y.name](_.slice(1));return}if(U==="--statusline"){await Hs(c());return}console.error(U.startsWith("-")?`Unknown option: ${U}`:`Unknown command: ${U}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{Nk as runCli};
