var vA=Object.defineProperty;var IA=(i,e,t)=>e in i?vA(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Be=(i,e,t)=>IA(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function hl(i,e){const t=new Set(i.split(","));return n=>t.has(n)}const lt={},ys=[],pn=()=>{},CA=()=>!1,no=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),dl=i=>i.startsWith("onUpdate:"),kt=Object.assign,fl=(i,e)=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)},yA=Object.prototype.hasOwnProperty,$e=(i,e)=>yA.call(i,e),Ve=Array.isArray,pr=i=>so(i)==="[object Map]",SA=i=>so(i)==="[object Set]",Ke=i=>typeof i=="function",Lt=i=>typeof i=="string",io=i=>typeof i=="symbol",pt=i=>i!==null&&typeof i=="object",gd=i=>(pt(i)||Ke(i))&&Ke(i.then)&&Ke(i.catch),MA=Object.prototype.toString,so=i=>MA.call(i),wA=i=>so(i).slice(8,-1),BA=i=>so(i)==="[object Object]",Al=i=>Lt(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,gr=hl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ro=i=>{const e=Object.create(null);return t=>e[t]||(e[t]=i(t))},TA=/-(\w)/g,Ps=ro(i=>i.replace(TA,(e,t)=>t?t.toUpperCase():"")),RA=/\B([A-Z])/g,js=ro(i=>i.replace(RA,"-$1").toLowerCase()),md=ro(i=>i.charAt(0).toUpperCase()+i.slice(1)),yo=ro(i=>i?`on${md(i)}`:""),yi=(i,e)=>!Object.is(i,e),So=(i,e)=>{for(let t=0;t<i.length;t++)i[t](e)},Ua=(i,e,t)=>{Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value:t})},DA=i=>{const e=parseFloat(i);return isNaN(e)?i:e};let iu;const _d=()=>iu||(iu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ao(i){if(Ve(i)){const e={};for(let t=0;t<i.length;t++){const n=i[t],s=Lt(n)?UA(n):ao(n);if(s)for(const r in s)e[r]=s[r]}return e}else if(Lt(i)||pt(i))return i}const LA=/;(?![^(]*\))/g,PA=/:([^]+)/,FA=/\/\*[^]*?\*\//g;function UA(i){const e={};return i.replace(FA,"").split(LA).forEach(t=>{if(t){const n=t.split(PA);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}function Fs(i){let e="";if(Lt(i))e=i;else if(Ve(i))for(let t=0;t<i.length;t++){const n=Fs(i[t]);n&&(e+=n+" ")}else if(pt(i))for(const t in i)i[t]&&(e+=t+" ");return e.trim()}const NA="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",QA=hl(NA);function bd(i){return!!i||i===""}/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let En;class OA{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=En,!e&&En&&(this.index=(En.scopes||(En.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=En;try{return En=this,e()}finally{En=t}}}on(){En=this}off(){En=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function kA(i,e=En){e&&e.active&&e.effects.push(i)}function GA(){return En}let Wi;class pl{constructor(e,t,n,s){this.fn=e,this.trigger=t,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,kA(this,s)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,Ji();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(HA(t.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),Zi()}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=xi,t=Wi;try{return xi=!0,Wi=this,this._runnings++,su(this),this.fn()}finally{ru(this),this._runnings--,Wi=t,xi=e}}stop(){var e;this.active&&(su(this),ru(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function HA(i){return i.value}function su(i){i._trackId++,i._depsLength=0}function ru(i){if(i.deps.length>i._depsLength){for(let e=i._depsLength;e<i.deps.length;e++)Ed(i.deps[e],i);i.deps.length=i._depsLength}}function Ed(i,e){const t=i.get(e);t!==void 0&&e._trackId!==t&&(i.delete(e),i.size===0&&i.cleanup())}let xi=!0,vc=0;const xd=[];function Ji(){xd.push(xi),xi=!1}function Zi(){const i=xd.pop();xi=i===void 0?!0:i}function gl(){vc++}function ml(){for(vc--;!vc&&Ic.length;)Ic.shift()()}function vd(i,e,t){if(e.get(i)!==i._trackId){e.set(i,i._trackId);const n=i.deps[i._depsLength];n!==e?(n&&Ed(n,i),i.deps[i._depsLength++]=e):i._depsLength++}}const Ic=[];function Id(i,e,t){gl();for(const n of i.keys()){let s;n._dirtyLevel<e&&(s??(s=i.get(n)===n._trackId))&&(n._shouldSchedule||(n._shouldSchedule=n._dirtyLevel===0),n._dirtyLevel=e),n._shouldSchedule&&(s??(s=i.get(n)===n._trackId))&&(n.trigger(),(!n._runnings||n.allowRecurse)&&n._dirtyLevel!==2&&(n._shouldSchedule=!1,n.scheduler&&Ic.push(n.scheduler)))}ml()}const Cd=(i,e)=>{const t=new Map;return t.cleanup=i,t.computed=e,t},Cc=new WeakMap,qi=Symbol(""),yc=Symbol("");function nn(i,e,t){if(xi&&Wi){let n=Cc.get(i);n||Cc.set(i,n=new Map);let s=n.get(t);s||n.set(t,s=Cd(()=>n.delete(t))),vd(Wi,s)}}function Zn(i,e,t,n,s,r){const a=Cc.get(i);if(!a)return;let o=[];if(e==="clear")o=[...a.values()];else if(t==="length"&&Ve(i)){const c=Number(n);a.forEach((l,u)=>{(u==="length"||!io(u)&&u>=c)&&o.push(l)})}else switch(t!==void 0&&o.push(a.get(t)),e){case"add":Ve(i)?Al(t)&&o.push(a.get("length")):(o.push(a.get(qi)),pr(i)&&o.push(a.get(yc)));break;case"delete":Ve(i)||(o.push(a.get(qi)),pr(i)&&o.push(a.get(yc)));break;case"set":pr(i)&&o.push(a.get(qi));break}gl();for(const c of o)c&&Id(c,4);ml()}const zA=hl("__proto__,__v_isRef,__isVue"),yd=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(io)),au=VA();function VA(){const i={};return["includes","indexOf","lastIndexOf"].forEach(e=>{i[e]=function(...t){const n=tt(this);for(let r=0,a=this.length;r<a;r++)nn(n,"get",r+"");const s=n[e](...t);return s===-1||s===!1?n[e](...t.map(tt)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{i[e]=function(...t){Ji(),gl();const n=tt(this)[e].apply(this,t);return ml(),Zi(),n}}),i}function WA(i){const e=tt(this);return nn(e,"has",i),e.hasOwnProperty(i)}class Sd{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return n===(s?r?sp:Td:r?Bd:wd).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const a=Ve(e);if(!s){if(a&&$e(au,t))return Reflect.get(au,t,n);if(t==="hasOwnProperty")return WA}const o=Reflect.get(e,t,n);return(io(t)?yd.has(t):zA(t))||(s||nn(e,"get",t),r)?o:sn(o)?a&&Al(t)?o:o.value:pt(o)?s?Rd(o):El(o):o}}class Md extends Sd{constructor(e=!1){super(!1,e)}set(e,t,n,s){let r=e[t];if(!this._isShallow){const c=Us(r);if(!Na(n)&&!Us(n)&&(r=tt(r),n=tt(n)),!Ve(e)&&sn(r)&&!sn(n))return c?!1:(r.value=n,!0)}const a=Ve(e)&&Al(t)?Number(t)<e.length:$e(e,t),o=Reflect.set(e,t,n,s);return e===tt(s)&&(a?yi(n,r)&&Zn(e,"set",t,n):Zn(e,"add",t,n)),o}deleteProperty(e,t){const n=$e(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&n&&Zn(e,"delete",t,void 0),s}has(e,t){const n=Reflect.has(e,t);return(!io(t)||!yd.has(t))&&nn(e,"has",t),n}ownKeys(e){return nn(e,"iterate",Ve(e)?"length":qi),Reflect.ownKeys(e)}}class qA extends Sd{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const jA=new Md,KA=new qA,YA=new Md(!0),_l=i=>i,oo=i=>Reflect.getPrototypeOf(i);function qr(i,e,t=!1,n=!1){i=i.__v_raw;const s=tt(i),r=tt(e);t||(yi(e,r)&&nn(s,"get",e),nn(s,"get",r));const{has:a}=oo(s),o=n?_l:t?vl:Br;if(a.call(s,e))return o(i.get(e));if(a.call(s,r))return o(i.get(r));i!==s&&i.get(e)}function jr(i,e=!1){const t=this.__v_raw,n=tt(t),s=tt(i);return e||(yi(i,s)&&nn(n,"has",i),nn(n,"has",s)),i===s?t.has(i):t.has(i)||t.has(s)}function Kr(i,e=!1){return i=i.__v_raw,!e&&nn(tt(i),"iterate",qi),Reflect.get(i,"size",i)}function ou(i){i=tt(i);const e=tt(this);return oo(e).has.call(e,i)||(e.add(i),Zn(e,"add",i,i)),this}function cu(i,e){e=tt(e);const t=tt(this),{has:n,get:s}=oo(t);let r=n.call(t,i);r||(i=tt(i),r=n.call(t,i));const a=s.call(t,i);return t.set(i,e),r?yi(e,a)&&Zn(t,"set",i,e):Zn(t,"add",i,e),this}function lu(i){const e=tt(this),{has:t,get:n}=oo(e);let s=t.call(e,i);s||(i=tt(i),s=t.call(e,i)),n&&n.call(e,i);const r=e.delete(i);return s&&Zn(e,"delete",i,void 0),r}function uu(){const i=tt(this),e=i.size!==0,t=i.clear();return e&&Zn(i,"clear",void 0,void 0),t}function Yr(i,e){return function(n,s){const r=this,a=r.__v_raw,o=tt(a),c=e?_l:i?vl:Br;return!i&&nn(o,"iterate",qi),a.forEach((l,u)=>n.call(s,c(l),c(u),r))}}function Xr(i,e,t){return function(...n){const s=this.__v_raw,r=tt(s),a=pr(r),o=i==="entries"||i===Symbol.iterator&&a,c=i==="keys"&&a,l=s[i](...n),u=t?_l:e?vl:Br;return!e&&nn(r,"iterate",c?yc:qi),{next(){const{value:h,done:d}=l.next();return d?{value:h,done:d}:{value:o?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function oi(i){return function(...e){return i==="delete"?!1:i==="clear"?void 0:this}}function XA(){const i={get(r){return qr(this,r)},get size(){return Kr(this)},has:jr,add:ou,set:cu,delete:lu,clear:uu,forEach:Yr(!1,!1)},e={get(r){return qr(this,r,!1,!0)},get size(){return Kr(this)},has:jr,add:ou,set:cu,delete:lu,clear:uu,forEach:Yr(!1,!0)},t={get(r){return qr(this,r,!0)},get size(){return Kr(this,!0)},has(r){return jr.call(this,r,!0)},add:oi("add"),set:oi("set"),delete:oi("delete"),clear:oi("clear"),forEach:Yr(!0,!1)},n={get(r){return qr(this,r,!0,!0)},get size(){return Kr(this,!0)},has(r){return jr.call(this,r,!0)},add:oi("add"),set:oi("set"),delete:oi("delete"),clear:oi("clear"),forEach:Yr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{i[r]=Xr(r,!1,!1),t[r]=Xr(r,!0,!1),e[r]=Xr(r,!1,!0),n[r]=Xr(r,!0,!0)}),[i,t,e,n]}const[JA,ZA,$A,ep]=XA();function bl(i,e){const t=e?i?ep:$A:i?ZA:JA;return(n,s,r)=>s==="__v_isReactive"?!i:s==="__v_isReadonly"?i:s==="__v_raw"?n:Reflect.get($e(t,s)&&s in n?t:n,s,r)}const tp={get:bl(!1,!1)},np={get:bl(!1,!0)},ip={get:bl(!0,!1)},wd=new WeakMap,Bd=new WeakMap,Td=new WeakMap,sp=new WeakMap;function rp(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ap(i){return i.__v_skip||!Object.isExtensible(i)?0:rp(wA(i))}function El(i){return Us(i)?i:xl(i,!1,jA,tp,wd)}function op(i){return xl(i,!1,YA,np,Bd)}function Rd(i){return xl(i,!0,KA,ip,Td)}function xl(i,e,t,n,s){if(!pt(i)||i.__v_raw&&!(e&&i.__v_isReactive))return i;const r=s.get(i);if(r)return r;const a=ap(i);if(a===0)return i;const o=new Proxy(i,a===2?n:t);return s.set(i,o),o}function Ss(i){return Us(i)?Ss(i.__v_raw):!!(i&&i.__v_isReactive)}function Us(i){return!!(i&&i.__v_isReadonly)}function Na(i){return!!(i&&i.__v_isShallow)}function Dd(i){return Ss(i)||Us(i)}function tt(i){const e=i&&i.__v_raw;return e?tt(e):i}function Ld(i){return Object.isExtensible(i)&&Ua(i,"__v_skip",!0),i}const Br=i=>pt(i)?El(i):i,vl=i=>pt(i)?Rd(i):i;class Pd{constructor(e,t,n,s){this.getter=e,this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new pl(()=>e(this._value),()=>Ma(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const e=tt(this);return(!e._cacheable||e.effect.dirty)&&yi(e._value,e._value=e.effect.run())&&Ma(e,4),Fd(e),e.effect._dirtyLevel>=2&&Ma(e,2),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function cp(i,e,t=!1){let n,s;const r=Ke(i);return r?(n=i,s=pn):(n=i.get,s=i.set),new Pd(n,s,r||!s,t)}function Fd(i){var e;xi&&Wi&&(i=tt(i),vd(Wi,(e=i.dep)!=null?e:i.dep=Cd(()=>i.dep=void 0,i instanceof Pd?i:void 0)))}function Ma(i,e=4,t){i=tt(i);const n=i.dep;n&&Id(n,e)}function sn(i){return!!(i&&i.__v_isRef===!0)}function bt(i){return lp(i,!1)}function lp(i,e){return sn(i)?i:new up(i,e)}class up{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:tt(e),this._value=t?e:Br(e)}get value(){return Fd(this),this._value}set value(e){const t=this.__v_isShallow||Na(e)||Us(e);e=t?e:tt(e),yi(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Br(e),Ma(this,4))}}function hp(i){return sn(i)?i.value:i}const dp={get:(i,e,t)=>hp(Reflect.get(i,e,t)),set:(i,e,t,n)=>{const s=i[e];return sn(s)&&!sn(t)?(s.value=t,!0):Reflect.set(i,e,t,n)}};function Ud(i){return Ss(i)?i:new Proxy(i,dp)}/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function vi(i,e,t,n){try{return n?i(...n):i()}catch(s){co(s,e,t)}}function In(i,e,t,n){if(Ke(i)){const r=vi(i,e,t,n);return r&&gd(r)&&r.catch(a=>{co(a,e,t)}),r}const s=[];for(let r=0;r<i.length;r++)s.push(In(i[r],e,t,n));return s}function co(i,e,t,n=!0){const s=e?e.vnode:null;if(e){let r=e.parent;const a=e.proxy,o=`https://vuejs.org/error-reference/#runtime-${t}`;for(;r;){const l=r.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](i,a,o)===!1)return}r=r.parent}const c=e.appContext.config.errorHandler;if(c){vi(c,null,10,[i,a,o]);return}}fp(i,t,s,n)}function fp(i,e,t,n=!0){console.error(i)}let Tr=!1,Sc=!1;const zt=[];let Bn=0;const Ms=[];let pi=null,Gi=0;const Nd=Promise.resolve();let Il=null;function Ap(i){const e=Il||Nd;return i?e.then(this?i.bind(this):i):e}function pp(i){let e=Bn+1,t=zt.length;for(;e<t;){const n=e+t>>>1,s=zt[n],r=Rr(s);r<i||r===i&&s.pre?e=n+1:t=n}return e}function Cl(i){(!zt.length||!zt.includes(i,Tr&&i.allowRecurse?Bn+1:Bn))&&(i.id==null?zt.push(i):zt.splice(pp(i.id),0,i),Qd())}function Qd(){!Tr&&!Sc&&(Sc=!0,Il=Nd.then(kd))}function gp(i){const e=zt.indexOf(i);e>Bn&&zt.splice(e,1)}function mp(i){Ve(i)?Ms.push(...i):(!pi||!pi.includes(i,i.allowRecurse?Gi+1:Gi))&&Ms.push(i),Qd()}function hu(i,e,t=Tr?Bn+1:0){for(;t<zt.length;t++){const n=zt[t];if(n&&n.pre){if(i&&n.id!==i.uid)continue;zt.splice(t,1),t--,n()}}}function Od(i){if(Ms.length){const e=[...new Set(Ms)].sort((t,n)=>Rr(t)-Rr(n));if(Ms.length=0,pi){pi.push(...e);return}for(pi=e,Gi=0;Gi<pi.length;Gi++)pi[Gi]();pi=null,Gi=0}}const Rr=i=>i.id==null?1/0:i.id,_p=(i,e)=>{const t=Rr(i)-Rr(e);if(t===0){if(i.pre&&!e.pre)return-1;if(e.pre&&!i.pre)return 1}return t};function kd(i){Sc=!1,Tr=!0,zt.sort(_p);try{for(Bn=0;Bn<zt.length;Bn++){const e=zt[Bn];e&&e.active!==!1&&vi(e,null,14)}}finally{Bn=0,zt.length=0,Od(),Tr=!1,Il=null,(zt.length||Ms.length)&&kd()}}function bp(i,e,...t){if(i.isUnmounted)return;const n=i.vnode.props||lt;let s=t;const r=e.startsWith("update:"),a=r&&e.slice(7);if(a&&a in n){const u=`${a==="modelValue"?"model":a}Modifiers`,{number:h,trim:d}=n[u]||lt;d&&(s=t.map(f=>Lt(f)?f.trim():f)),h&&(s=t.map(DA))}let o,c=n[o=yo(e)]||n[o=yo(Ps(e))];!c&&r&&(c=n[o=yo(js(e))]),c&&In(c,i,6,s);const l=n[o+"Once"];if(l){if(!i.emitted)i.emitted={};else if(i.emitted[o])return;i.emitted[o]=!0,In(l,i,6,s)}}function Gd(i,e,t=!1){const n=e.emitsCache,s=n.get(i);if(s!==void 0)return s;const r=i.emits;let a={},o=!1;if(!Ke(i)){const c=l=>{const u=Gd(l,e,!0);u&&(o=!0,kt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(c),i.extends&&c(i.extends),i.mixins&&i.mixins.forEach(c)}return!r&&!o?(pt(i)&&n.set(i,null),null):(Ve(r)?r.forEach(c=>a[c]=null):kt(a,r),pt(i)&&n.set(i,a),a)}function lo(i,e){return!i||!no(e)?!1:(e=e.slice(2).replace(/Once$/,""),$e(i,e[0].toLowerCase()+e.slice(1))||$e(i,js(e))||$e(i,e))}let tn=null,uo=null;function Qa(i){const e=tn;return tn=i,uo=i&&i.type.__scopeId||null,e}function Ep(i){uo=i}function xp(){uo=null}function vp(i,e=tn,t){if(!e||i._n)return i;const n=(...s)=>{n._d&&xu(-1);const r=Qa(e);let a;try{a=i(...s)}finally{Qa(r),n._d&&xu(1)}return a};return n._n=!0,n._c=!0,n._d=!0,n}function Mo(i){const{type:e,vnode:t,proxy:n,withProxy:s,props:r,propsOptions:[a],slots:o,attrs:c,emit:l,render:u,renderCache:h,data:d,setupState:f,ctx:g,inheritAttrs:m}=i;let p,A;const x=Qa(i);try{if(t.shapeFlag&4){const I=s||n,P=I;p=Mn(u.call(P,I,h,r,f,d,g)),A=c}else{const I=e;p=Mn(I.length>1?I(r,{attrs:c,slots:o,emit:l}):I(r,null)),A=e.props?c:Ip(c)}}catch(I){Er.length=0,co(I,i,1),p=ht(Si)}let b=p;if(A&&m!==!1){const I=Object.keys(A),{shapeFlag:P}=b;I.length&&P&7&&(a&&I.some(dl)&&(A=Cp(A,a)),b=Ns(b,A))}return t.dirs&&(b=Ns(b),b.dirs=b.dirs?b.dirs.concat(t.dirs):t.dirs),t.transition&&(b.transition=t.transition),p=b,Qa(x),p}const Ip=i=>{let e;for(const t in i)(t==="class"||t==="style"||no(t))&&((e||(e={}))[t]=i[t]);return e},Cp=(i,e)=>{const t={};for(const n in i)(!dl(n)||!(n.slice(9)in e))&&(t[n]=i[n]);return t};function yp(i,e,t){const{props:n,children:s,component:r}=i,{props:a,children:o,patchFlag:c}=e,l=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return n?du(n,a,l):!!a;if(c&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(a[d]!==n[d]&&!lo(l,d))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:n===a?!1:n?a?du(n,a,l):!0:!!a;return!1}function du(i,e,t){const n=Object.keys(e);if(n.length!==Object.keys(i).length)return!0;for(let s=0;s<n.length;s++){const r=n[s];if(e[r]!==i[r]&&!lo(t,r))return!0}return!1}function Sp({vnode:i,parent:e},t){for(;e;){const n=e.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=e.vnode).el=t,e=e.parent;else break}}const Mp=Symbol.for("v-ndc"),wp=i=>i.__isSuspense;function Bp(i,e){e&&e.pendingBranch?Ve(i)?e.effects.push(...i):e.effects.push(i):mp(i)}const Tp=Symbol.for("v-scx"),Rp=()=>wa(Tp),Jr={};function ws(i,e,t){return Hd(i,e,t)}function Hd(i,e,{immediate:t,deep:n,flush:s,once:r,onTrack:a,onTrigger:o}=lt){if(e&&r){const M=e;e=(...B)=>{M(...B),P()}}const c=Yt,l=M=>n===!0?M:xs(M,n===!1?1:void 0);let u,h=!1,d=!1;if(sn(i)?(u=()=>i.value,h=Na(i)):Ss(i)?(u=()=>l(i),h=!0):Ve(i)?(d=!0,h=i.some(M=>Ss(M)||Na(M)),u=()=>i.map(M=>{if(sn(M))return M.value;if(Ss(M))return l(M);if(Ke(M))return vi(M,c,2)})):Ke(i)?e?u=()=>vi(i,c,2):u=()=>(f&&f(),In(i,c,3,[g])):u=pn,e&&n){const M=u;u=()=>xs(M())}let f,g=M=>{f=b.onStop=()=>{vi(M,c,4),f=b.onStop=void 0}},m;if(po)if(g=pn,e?t&&In(e,c,3,[u(),d?[]:void 0,g]):u(),s==="sync"){const M=Rp();m=M.__watcherHandles||(M.__watcherHandles=[])}else return pn;let p=d?new Array(i.length).fill(Jr):Jr;const A=()=>{if(!(!b.active||!b.dirty))if(e){const M=b.run();(n||h||(d?M.some((B,F)=>yi(B,p[F])):yi(M,p)))&&(f&&f(),In(e,c,3,[M,p===Jr?void 0:d&&p[0]===Jr?[]:p,g]),p=M)}else b.run()};A.allowRecurse=!!e;let x;s==="sync"?x=A:s==="post"?x=()=>en(A,c&&c.suspense):(A.pre=!0,c&&(A.id=c.uid),x=()=>Cl(A));const b=new pl(u,pn,x),I=GA(),P=()=>{b.stop(),I&&fl(I.effects,b)};return e?t?A():p=b.run():s==="post"?en(b.run.bind(b),c&&c.suspense):b.run(),m&&m.push(P),P}function Dp(i,e,t){const n=this.proxy,s=Lt(i)?i.includes(".")?zd(n,i):()=>n[i]:i.bind(n,n);let r;Ke(e)?r=e:(r=e.handler,t=e);const a=kr(this),o=Hd(s,r.bind(n),t);return a(),o}function zd(i,e){const t=e.split(".");return()=>{let n=i;for(let s=0;s<t.length&&n;s++)n=n[t[s]];return n}}function xs(i,e,t=0,n){if(!pt(i)||i.__v_skip)return i;if(e&&e>0){if(t>=e)return i;t++}if(n=n||new Set,n.has(i))return i;if(n.add(i),sn(i))xs(i.value,e,t,n);else if(Ve(i))for(let s=0;s<i.length;s++)xs(i[s],e,t,n);else if(SA(i)||pr(i))i.forEach(s=>{xs(s,e,t,n)});else if(BA(i))for(const s in i)xs(i[s],e,t,n);return i}function Ri(i,e,t,n){const s=i.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let c=o.dir[n];c&&(Ji(),In(c,t,8,[i.el,o,i,e]),Zi())}}/*! #__NO_SIDE_EFFECTS__ */function Mi(i,e){return Ke(i)?kt({name:i.name},e,{setup:i}):i}const mr=i=>!!i.type.__asyncLoader,Vd=i=>i.type.__isKeepAlive;function Lp(i,e){Wd(i,"a",e)}function Pp(i,e){Wd(i,"da",e)}function Wd(i,e,t=Yt){const n=i.__wdc||(i.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return i()});if(ho(e,n,t),t){let s=t.parent;for(;s&&s.parent;)Vd(s.parent.vnode)&&Fp(n,e,t,s),s=s.parent}}function Fp(i,e,t,n){const s=ho(e,i,n,!0);jd(()=>{fl(n[e],s)},t)}function ho(i,e,t=Yt,n=!1){if(t){const s=t[i]||(t[i]=[]),r=e.__weh||(e.__weh=(...a)=>{if(t.isUnmounted)return;Ji();const o=kr(t),c=In(e,t,i,a);return o(),Zi(),c});return n?s.unshift(r):s.push(r),r}}const ii=i=>(e,t=Yt)=>(!po||i==="sp")&&ho(i,(...n)=>e(...n),t),Up=ii("bm"),Or=ii("m"),Np=ii("bu"),Qp=ii("u"),qd=ii("bum"),jd=ii("um"),Op=ii("sp"),kp=ii("rtg"),Gp=ii("rtc");function Hp(i,e=Yt){ho("ec",i,e)}function zp(i,e,t,n){let s;const r=t;if(Ve(i)||Lt(i)){s=new Array(i.length);for(let a=0,o=i.length;a<o;a++)s[a]=e(i[a],a,void 0,r)}else if(typeof i=="number"){s=new Array(i);for(let a=0;a<i;a++)s[a]=e(a+1,a,void 0,r)}else if(pt(i))if(i[Symbol.iterator])s=Array.from(i,(a,o)=>e(a,o,void 0,r));else{const a=Object.keys(i);s=new Array(a.length);for(let o=0,c=a.length;o<c;o++){const l=a[o];s[o]=e(i[l],l,o,r)}}else s=[];return s}function wo(i,e,t={},n,s){if(tn.isCE||tn.parent&&mr(tn.parent)&&tn.parent.isCE)return ht("slot",t,n);let r=i[e];r&&r._c&&(r._d=!1),yt();const a=r&&Kd(r(t)),o=Ml(fn,{key:t.key||a&&a.key||`_${e}`},a||[],a&&i._===1?64:-2);return o.scopeId&&(o.slotScopeIds=[o.scopeId+"-s"]),r&&r._c&&(r._d=!0),o}function Kd(i){return i.some(e=>af(e)?!(e.type===Si||e.type===fn&&!Kd(e.children)):!0)?i:null}const Mc=i=>i?lf(i)?Bl(i)||i.proxy:Mc(i.parent):null,_r=kt(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>Mc(i.parent),$root:i=>Mc(i.root),$emit:i=>i.emit,$options:i=>yl(i),$forceUpdate:i=>i.f||(i.f=()=>{i.effect.dirty=!0,Cl(i.update)}),$nextTick:i=>i.n||(i.n=Ap.bind(i.proxy)),$watch:i=>Dp.bind(i)}),Bo=(i,e)=>i!==lt&&!i.__isScriptSetup&&$e(i,e),Vp={get({_:i},e){const{ctx:t,setupState:n,data:s,props:r,accessCache:a,type:o,appContext:c}=i;let l;if(e[0]!=="$"){const f=a[e];if(f!==void 0)switch(f){case 1:return n[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(Bo(n,e))return a[e]=1,n[e];if(s!==lt&&$e(s,e))return a[e]=2,s[e];if((l=i.propsOptions[0])&&$e(l,e))return a[e]=3,r[e];if(t!==lt&&$e(t,e))return a[e]=4,t[e];wc&&(a[e]=0)}}const u=_r[e];let h,d;if(u)return e==="$attrs"&&nn(i,"get",e),u(i);if((h=o.__cssModules)&&(h=h[e]))return h;if(t!==lt&&$e(t,e))return a[e]=4,t[e];if(d=c.config.globalProperties,$e(d,e))return d[e]},set({_:i},e,t){const{data:n,setupState:s,ctx:r}=i;return Bo(s,e)?(s[e]=t,!0):n!==lt&&$e(n,e)?(n[e]=t,!0):$e(i.props,e)||e[0]==="$"&&e.slice(1)in i?!1:(r[e]=t,!0)},has({_:{data:i,setupState:e,accessCache:t,ctx:n,appContext:s,propsOptions:r}},a){let o;return!!t[a]||i!==lt&&$e(i,a)||Bo(e,a)||(o=r[0])&&$e(o,a)||$e(n,a)||$e(_r,a)||$e(s.config.globalProperties,a)},defineProperty(i,e,t){return t.get!=null?i._.accessCache[e]=0:$e(t,"value")&&this.set(i,e,t.value,null),Reflect.defineProperty(i,e,t)}};function fu(i){return Ve(i)?i.reduce((e,t)=>(e[t]=null,e),{}):i}let wc=!0;function Wp(i){const e=yl(i),t=i.proxy,n=i.ctx;wc=!1,e.beforeCreate&&Au(e.beforeCreate,i,"bc");const{data:s,computed:r,methods:a,watch:o,provide:c,inject:l,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:g,activated:m,deactivated:p,beforeDestroy:A,beforeUnmount:x,destroyed:b,unmounted:I,render:P,renderTracked:M,renderTriggered:B,errorCaptured:F,serverPrefetch:S,expose:v,inheritAttrs:T,components:U,directives:Q,filters:q}=e;if(l&&qp(l,n,null),a)for(const j in a){const k=a[j];Ke(k)&&(n[j]=k.bind(t))}if(s){const j=s.call(t,t);pt(j)&&(i.data=El(j))}if(wc=!0,r)for(const j in r){const k=r[j],de=Ke(k)?k.bind(t,t):Ke(k.get)?k.get.bind(t,t):pn,Ae=!Ke(k)&&Ke(k.set)?k.set.bind(t):pn,be=Es({get:de,set:Ae});Object.defineProperty(n,j,{enumerable:!0,configurable:!0,get:()=>be.value,set:Te=>be.value=Te})}if(o)for(const j in o)Yd(o[j],n,t,j);if(c){const j=Ke(c)?c.call(t):c;Reflect.ownKeys(j).forEach(k=>{Zp(k,j[k])})}u&&Au(u,i,"c");function W(j,k){Ve(k)?k.forEach(de=>j(de.bind(t))):k&&j(k.bind(t))}if(W(Up,h),W(Or,d),W(Np,f),W(Qp,g),W(Lp,m),W(Pp,p),W(Hp,F),W(Gp,M),W(kp,B),W(qd,x),W(jd,I),W(Op,S),Ve(v))if(v.length){const j=i.exposed||(i.exposed={});v.forEach(k=>{Object.defineProperty(j,k,{get:()=>t[k],set:de=>t[k]=de})})}else i.exposed||(i.exposed={});P&&i.render===pn&&(i.render=P),T!=null&&(i.inheritAttrs=T),U&&(i.components=U),Q&&(i.directives=Q)}function qp(i,e,t=pn){Ve(i)&&(i=Bc(i));for(const n in i){const s=i[n];let r;pt(s)?"default"in s?r=wa(s.from||n,s.default,!0):r=wa(s.from||n):r=wa(s),sn(r)?Object.defineProperty(e,n,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[n]=r}}function Au(i,e,t){In(Ve(i)?i.map(n=>n.bind(e.proxy)):i.bind(e.proxy),e,t)}function Yd(i,e,t,n){const s=n.includes(".")?zd(t,n):()=>t[n];if(Lt(i)){const r=e[i];Ke(r)&&ws(s,r)}else if(Ke(i))ws(s,i.bind(t));else if(pt(i))if(Ve(i))i.forEach(r=>Yd(r,e,t,n));else{const r=Ke(i.handler)?i.handler.bind(t):e[i.handler];Ke(r)&&ws(s,r,i)}}function yl(i){const e=i.type,{mixins:t,extends:n}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=i.appContext,o=r.get(e);let c;return o?c=o:!s.length&&!t&&!n?c=e:(c={},s.length&&s.forEach(l=>Oa(c,l,a,!0)),Oa(c,e,a)),pt(e)&&r.set(e,c),c}function Oa(i,e,t,n=!1){const{mixins:s,extends:r}=e;r&&Oa(i,r,t,!0),s&&s.forEach(a=>Oa(i,a,t,!0));for(const a in e)if(!(n&&a==="expose")){const o=jp[a]||t&&t[a];i[a]=o?o(i[a],e[a]):e[a]}return i}const jp={data:pu,props:gu,emits:gu,methods:dr,computed:dr,beforeCreate:jt,created:jt,beforeMount:jt,mounted:jt,beforeUpdate:jt,updated:jt,beforeDestroy:jt,beforeUnmount:jt,destroyed:jt,unmounted:jt,activated:jt,deactivated:jt,errorCaptured:jt,serverPrefetch:jt,components:dr,directives:dr,watch:Yp,provide:pu,inject:Kp};function pu(i,e){return e?i?function(){return kt(Ke(i)?i.call(this,this):i,Ke(e)?e.call(this,this):e)}:e:i}function Kp(i,e){return dr(Bc(i),Bc(e))}function Bc(i){if(Ve(i)){const e={};for(let t=0;t<i.length;t++)e[i[t]]=i[t];return e}return i}function jt(i,e){return i?[...new Set([].concat(i,e))]:e}function dr(i,e){return i?kt(Object.create(null),i,e):e}function gu(i,e){return i?Ve(i)&&Ve(e)?[...new Set([...i,...e])]:kt(Object.create(null),fu(i),fu(e??{})):e}function Yp(i,e){if(!i)return e;if(!e)return i;const t=kt(Object.create(null),i);for(const n in e)t[n]=jt(i[n],e[n]);return t}function Xd(){return{app:null,config:{isNativeTag:CA,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Xp=0;function Jp(i,e){return function(n,s=null){Ke(n)||(n=kt({},n)),s!=null&&!pt(s)&&(s=null);const r=Xd(),a=new WeakSet;let o=!1;const c=r.app={_uid:Xp++,_component:n,_props:s,_container:null,_context:r,_instance:null,version:xg,get config(){return r.config},set config(l){},use(l,...u){return a.has(l)||(l&&Ke(l.install)?(a.add(l),l.install(c,...u)):Ke(l)&&(a.add(l),l(c,...u))),c},mixin(l){return r.mixins.includes(l)||r.mixins.push(l),c},component(l,u){return u?(r.components[l]=u,c):r.components[l]},directive(l,u){return u?(r.directives[l]=u,c):r.directives[l]},mount(l,u,h){if(!o){const d=ht(n,s);return d.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),u&&e?e(d,l):i(d,l,h),o=!0,c._container=l,l.__vue_app__=c,Bl(d.component)||d.component.proxy}},unmount(){o&&(i(null,c._container),delete c._container.__vue_app__)},provide(l,u){return r.provides[l]=u,c},runWithContext(l){const u=br;br=c;try{return l()}finally{br=u}}};return c}}let br=null;function Zp(i,e){if(Yt){let t=Yt.provides;const n=Yt.parent&&Yt.parent.provides;n===t&&(t=Yt.provides=Object.create(n)),t[i]=e}}function wa(i,e,t=!1){const n=Yt||tn;if(n||br){const s=n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:br._context.provides;if(s&&i in s)return s[i];if(arguments.length>1)return t&&Ke(e)?e.call(n&&n.proxy):e}}function $p(i,e,t,n=!1){const s={},r={};Ua(r,Ao,1),i.propsDefaults=Object.create(null),Jd(i,e,s,r);for(const a in i.propsOptions[0])a in s||(s[a]=void 0);t?i.props=n?s:op(s):i.type.props?i.props=s:i.props=r,i.attrs=r}function eg(i,e,t,n){const{props:s,attrs:r,vnode:{patchFlag:a}}=i,o=tt(s),[c]=i.propsOptions;let l=!1;if((n||a>0)&&!(a&16)){if(a&8){const u=i.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(lo(i.emitsOptions,d))continue;const f=e[d];if(c)if($e(r,d))f!==r[d]&&(r[d]=f,l=!0);else{const g=Ps(d);s[g]=Tc(c,o,g,f,i,!1)}else f!==r[d]&&(r[d]=f,l=!0)}}}else{Jd(i,e,s,r)&&(l=!0);let u;for(const h in o)(!e||!$e(e,h)&&((u=js(h))===h||!$e(e,u)))&&(c?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=Tc(c,o,h,void 0,i,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!$e(e,h))&&(delete r[h],l=!0)}l&&Zn(i,"set","$attrs")}function Jd(i,e,t,n){const[s,r]=i.propsOptions;let a=!1,o;if(e)for(let c in e){if(gr(c))continue;const l=e[c];let u;s&&$e(s,u=Ps(c))?!r||!r.includes(u)?t[u]=l:(o||(o={}))[u]=l:lo(i.emitsOptions,c)||(!(c in n)||l!==n[c])&&(n[c]=l,a=!0)}if(r){const c=tt(t),l=o||lt;for(let u=0;u<r.length;u++){const h=r[u];t[h]=Tc(s,c,h,l[h],i,!$e(l,h))}}return a}function Tc(i,e,t,n,s,r){const a=i[t];if(a!=null){const o=$e(a,"default");if(o&&n===void 0){const c=a.default;if(a.type!==Function&&!a.skipFactory&&Ke(c)){const{propsDefaults:l}=s;if(t in l)n=l[t];else{const u=kr(s);n=l[t]=c.call(null,e),u()}}else n=c}a[0]&&(r&&!o?n=!1:a[1]&&(n===""||n===js(t))&&(n=!0))}return n}function Zd(i,e,t=!1){const n=e.propsCache,s=n.get(i);if(s)return s;const r=i.props,a={},o=[];let c=!1;if(!Ke(i)){const u=h=>{c=!0;const[d,f]=Zd(h,e,!0);kt(a,d),f&&o.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!r&&!c)return pt(i)&&n.set(i,ys),ys;if(Ve(r))for(let u=0;u<r.length;u++){const h=Ps(r[u]);mu(h)&&(a[h]=lt)}else if(r)for(const u in r){const h=Ps(u);if(mu(h)){const d=r[u],f=a[h]=Ve(d)||Ke(d)?{type:d}:kt({},d);if(f){const g=Eu(Boolean,f.type),m=Eu(String,f.type);f[0]=g>-1,f[1]=m<0||g<m,(g>-1||$e(f,"default"))&&o.push(h)}}}const l=[a,o];return pt(i)&&n.set(i,l),l}function mu(i){return i[0]!=="$"&&!gr(i)}function _u(i){return i===null?"null":typeof i=="function"?i.name||"":typeof i=="object"&&i.constructor&&i.constructor.name||""}function bu(i,e){return _u(i)===_u(e)}function Eu(i,e){return Ve(e)?e.findIndex(t=>bu(t,i)):Ke(e)&&bu(e,i)?0:-1}const $d=i=>i[0]==="_"||i==="$stable",Sl=i=>Ve(i)?i.map(Mn):[Mn(i)],tg=(i,e,t)=>{if(e._n)return e;const n=vp((...s)=>Sl(e(...s)),t);return n._c=!1,n},ef=(i,e,t)=>{const n=i._ctx;for(const s in i){if($d(s))continue;const r=i[s];if(Ke(r))e[s]=tg(s,r,n);else if(r!=null){const a=Sl(r);e[s]=()=>a}}},tf=(i,e)=>{const t=Sl(e);i.slots.default=()=>t},ng=(i,e)=>{if(i.vnode.shapeFlag&32){const t=e._;t?(i.slots=tt(e),Ua(e,"_",t)):ef(e,i.slots={})}else i.slots={},e&&tf(i,e);Ua(i.slots,Ao,1)},ig=(i,e,t)=>{const{vnode:n,slots:s}=i;let r=!0,a=lt;if(n.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:(kt(s,e),!t&&o===1&&delete s._):(r=!e.$stable,ef(e,s)),a=e}else e&&(tf(i,e),a={default:1});if(r)for(const o in s)!$d(o)&&a[o]==null&&delete s[o]};function Rc(i,e,t,n,s=!1){if(Ve(i)){i.forEach((d,f)=>Rc(d,e&&(Ve(e)?e[f]:e),t,n,s));return}if(mr(n)&&!s)return;const r=n.shapeFlag&4?Bl(n.component)||n.component.proxy:n.el,a=s?null:r,{i:o,r:c}=i,l=e&&e.r,u=o.refs===lt?o.refs={}:o.refs,h=o.setupState;if(l!=null&&l!==c&&(Lt(l)?(u[l]=null,$e(h,l)&&(h[l]=null)):sn(l)&&(l.value=null)),Ke(c))vi(c,o,12,[a,u]);else{const d=Lt(c),f=sn(c);if(d||f){const g=()=>{if(i.f){const m=d?$e(h,c)?h[c]:u[c]:c.value;s?Ve(m)&&fl(m,r):Ve(m)?m.includes(r)||m.push(r):d?(u[c]=[r],$e(h,c)&&(h[c]=u[c])):(c.value=[r],i.k&&(u[i.k]=c.value))}else d?(u[c]=a,$e(h,c)&&(h[c]=a)):f&&(c.value=a,i.k&&(u[i.k]=a))};a?(g.id=-1,en(g,t)):g()}}}const en=Bp;function sg(i){return rg(i)}function rg(i,e){const t=_d();t.__VUE__=!0;const{insert:n,remove:s,patchProp:r,createElement:a,createText:o,createComment:c,setText:l,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=pn,insertStaticContent:g}=i,m=(w,R,G,H=null,se=null,ie=null,re=void 0,C=null,_=!!R.dynamicChildren)=>{if(w===R)return;w&&!er(w,R)&&(H=fe(w),Te(w,se,ie,!0),w=null),R.patchFlag===-2&&(_=!1,R.dynamicChildren=null);const{type:D,ref:V,shapeFlag:J}=R;switch(D){case fo:p(w,R,G,H);break;case Si:A(w,R,G,H);break;case Ba:w==null&&x(R,G,H,re);break;case fn:U(w,R,G,H,se,ie,re,C,_);break;default:J&1?P(w,R,G,H,se,ie,re,C,_):J&6?Q(w,R,G,H,se,ie,re,C,_):(J&64||J&128)&&D.process(w,R,G,H,se,ie,re,C,_,Le)}V!=null&&se&&Rc(V,w&&w.ref,ie,R||w,!R)},p=(w,R,G,H)=>{if(w==null)n(R.el=o(R.children),G,H);else{const se=R.el=w.el;R.children!==w.children&&l(se,R.children)}},A=(w,R,G,H)=>{w==null?n(R.el=c(R.children||""),G,H):R.el=w.el},x=(w,R,G,H)=>{[w.el,w.anchor]=g(w.children,R,G,H,w.el,w.anchor)},b=({el:w,anchor:R},G,H)=>{let se;for(;w&&w!==R;)se=d(w),n(w,G,H),w=se;n(R,G,H)},I=({el:w,anchor:R})=>{let G;for(;w&&w!==R;)G=d(w),s(w),w=G;s(R)},P=(w,R,G,H,se,ie,re,C,_)=>{R.type==="svg"?re="svg":R.type==="math"&&(re="mathml"),w==null?M(R,G,H,se,ie,re,C,_):S(w,R,se,ie,re,C,_)},M=(w,R,G,H,se,ie,re,C)=>{let _,D;const{props:V,shapeFlag:J,transition:K,dirs:le}=w;if(_=w.el=a(w.type,ie,V&&V.is,V),J&8?u(_,w.children):J&16&&F(w.children,_,null,H,se,To(w,ie),re,C),le&&Ri(w,null,H,"created"),B(_,w,w.scopeId,re,H),V){for(const ue in V)ue!=="value"&&!gr(ue)&&r(_,ue,null,V[ue],ie,w.children,H,se,ge);"value"in V&&r(_,"value",null,V.value,ie),(D=V.onVnodeBeforeMount)&&Sn(D,H,w)}le&&Ri(w,null,H,"beforeMount");const ae=ag(se,K);ae&&K.beforeEnter(_),n(_,R,G),((D=V&&V.onVnodeMounted)||ae||le)&&en(()=>{D&&Sn(D,H,w),ae&&K.enter(_),le&&Ri(w,null,H,"mounted")},se)},B=(w,R,G,H,se)=>{if(G&&f(w,G),H)for(let ie=0;ie<H.length;ie++)f(w,H[ie]);if(se){let ie=se.subTree;if(R===ie){const re=se.vnode;B(w,re,re.scopeId,re.slotScopeIds,se.parent)}}},F=(w,R,G,H,se,ie,re,C,_=0)=>{for(let D=_;D<w.length;D++){const V=w[D]=C?gi(w[D]):Mn(w[D]);m(null,V,R,G,H,se,ie,re,C)}},S=(w,R,G,H,se,ie,re)=>{const C=R.el=w.el;let{patchFlag:_,dynamicChildren:D,dirs:V}=R;_|=w.patchFlag&16;const J=w.props||lt,K=R.props||lt;let le;if(G&&Di(G,!1),(le=K.onVnodeBeforeUpdate)&&Sn(le,G,R,w),V&&Ri(R,w,G,"beforeUpdate"),G&&Di(G,!0),D?v(w.dynamicChildren,D,C,G,H,To(R,se),ie):re||k(w,R,C,null,G,H,To(R,se),ie,!1),_>0){if(_&16)T(C,R,J,K,G,H,se);else if(_&2&&J.class!==K.class&&r(C,"class",null,K.class,se),_&4&&r(C,"style",J.style,K.style,se),_&8){const ae=R.dynamicProps;for(let ue=0;ue<ae.length;ue++){const Ie=ae[ue],oe=J[Ie],_e=K[Ie];(_e!==oe||Ie==="value")&&r(C,Ie,oe,_e,se,w.children,G,H,ge)}}_&1&&w.children!==R.children&&u(C,R.children)}else!re&&D==null&&T(C,R,J,K,G,H,se);((le=K.onVnodeUpdated)||V)&&en(()=>{le&&Sn(le,G,R,w),V&&Ri(R,w,G,"updated")},H)},v=(w,R,G,H,se,ie,re)=>{for(let C=0;C<R.length;C++){const _=w[C],D=R[C],V=_.el&&(_.type===fn||!er(_,D)||_.shapeFlag&70)?h(_.el):G;m(_,D,V,null,H,se,ie,re,!0)}},T=(w,R,G,H,se,ie,re)=>{if(G!==H){if(G!==lt)for(const C in G)!gr(C)&&!(C in H)&&r(w,C,G[C],null,re,R.children,se,ie,ge);for(const C in H){if(gr(C))continue;const _=H[C],D=G[C];_!==D&&C!=="value"&&r(w,C,D,_,re,R.children,se,ie,ge)}"value"in H&&r(w,"value",G.value,H.value,re)}},U=(w,R,G,H,se,ie,re,C,_)=>{const D=R.el=w?w.el:o(""),V=R.anchor=w?w.anchor:o("");let{patchFlag:J,dynamicChildren:K,slotScopeIds:le}=R;le&&(C=C?C.concat(le):le),w==null?(n(D,G,H),n(V,G,H),F(R.children||[],G,V,se,ie,re,C,_)):J>0&&J&64&&K&&w.dynamicChildren?(v(w.dynamicChildren,K,G,se,ie,re,C),(R.key!=null||se&&R===se.subTree)&&nf(w,R,!0)):k(w,R,G,V,se,ie,re,C,_)},Q=(w,R,G,H,se,ie,re,C,_)=>{R.slotScopeIds=C,w==null?R.shapeFlag&512?se.ctx.activate(R,G,H,re,_):q(R,G,H,se,ie,re,_):ee(w,R,_)},q=(w,R,G,H,se,ie,re)=>{const C=w.component=pg(w,H,se);if(Vd(w)&&(C.ctx.renderer=Le),gg(C),C.asyncDep){if(se&&se.registerDep(C,W),!w.el){const _=C.subTree=ht(Si);A(null,_,R,G)}}else W(C,w,R,G,se,ie,re)},ee=(w,R,G)=>{const H=R.component=w.component;if(yp(w,R,G))if(H.asyncDep&&!H.asyncResolved){j(H,R,G);return}else H.next=R,gp(H.update),H.effect.dirty=!0,H.update();else R.el=w.el,H.vnode=R},W=(w,R,G,H,se,ie,re)=>{const C=()=>{if(w.isMounted){let{next:V,bu:J,u:K,parent:le,vnode:ae}=w;{const ze=sf(w);if(ze){V&&(V.el=ae.el,j(w,V,re)),ze.asyncDep.then(()=>{w.isUnmounted||C()});return}}let ue=V,Ie;Di(w,!1),V?(V.el=ae.el,j(w,V,re)):V=ae,J&&So(J),(Ie=V.props&&V.props.onVnodeBeforeUpdate)&&Sn(Ie,le,V,ae),Di(w,!0);const oe=Mo(w),_e=w.subTree;w.subTree=oe,m(_e,oe,h(_e.el),fe(_e),w,se,ie),V.el=oe.el,ue===null&&Sp(w,oe.el),K&&en(K,se),(Ie=V.props&&V.props.onVnodeUpdated)&&en(()=>Sn(Ie,le,V,ae),se)}else{let V;const{el:J,props:K}=R,{bm:le,m:ae,parent:ue}=w,Ie=mr(R);if(Di(w,!1),le&&So(le),!Ie&&(V=K&&K.onVnodeBeforeMount)&&Sn(V,ue,R),Di(w,!0),J&&L){const oe=()=>{w.subTree=Mo(w),L(J,w.subTree,w,se,null)};Ie?R.type.__asyncLoader().then(()=>!w.isUnmounted&&oe()):oe()}else{const oe=w.subTree=Mo(w);m(null,oe,G,H,w,se,ie),R.el=oe.el}if(ae&&en(ae,se),!Ie&&(V=K&&K.onVnodeMounted)){const oe=R;en(()=>Sn(V,ue,oe),se)}(R.shapeFlag&256||ue&&mr(ue.vnode)&&ue.vnode.shapeFlag&256)&&w.a&&en(w.a,se),w.isMounted=!0,R=G=H=null}},_=w.effect=new pl(C,pn,()=>Cl(D),w.scope),D=w.update=()=>{_.dirty&&_.run()};D.id=w.uid,Di(w,!0),D()},j=(w,R,G)=>{R.component=w;const H=w.vnode.props;w.vnode=R,w.next=null,eg(w,R.props,H,G),ig(w,R.children,G),Ji(),hu(w),Zi()},k=(w,R,G,H,se,ie,re,C,_=!1)=>{const D=w&&w.children,V=w?w.shapeFlag:0,J=R.children,{patchFlag:K,shapeFlag:le}=R;if(K>0){if(K&128){Ae(D,J,G,H,se,ie,re,C,_);return}else if(K&256){de(D,J,G,H,se,ie,re,C,_);return}}le&8?(V&16&&ge(D,se,ie),J!==D&&u(G,J)):V&16?le&16?Ae(D,J,G,H,se,ie,re,C,_):ge(D,se,ie,!0):(V&8&&u(G,""),le&16&&F(J,G,H,se,ie,re,C,_))},de=(w,R,G,H,se,ie,re,C,_)=>{w=w||ys,R=R||ys;const D=w.length,V=R.length,J=Math.min(D,V);let K;for(K=0;K<J;K++){const le=R[K]=_?gi(R[K]):Mn(R[K]);m(w[K],le,G,null,se,ie,re,C,_)}D>V?ge(w,se,ie,!0,!1,J):F(R,G,H,se,ie,re,C,_,J)},Ae=(w,R,G,H,se,ie,re,C,_)=>{let D=0;const V=R.length;let J=w.length-1,K=V-1;for(;D<=J&&D<=K;){const le=w[D],ae=R[D]=_?gi(R[D]):Mn(R[D]);if(er(le,ae))m(le,ae,G,null,se,ie,re,C,_);else break;D++}for(;D<=J&&D<=K;){const le=w[J],ae=R[K]=_?gi(R[K]):Mn(R[K]);if(er(le,ae))m(le,ae,G,null,se,ie,re,C,_);else break;J--,K--}if(D>J){if(D<=K){const le=K+1,ae=le<V?R[le].el:H;for(;D<=K;)m(null,R[D]=_?gi(R[D]):Mn(R[D]),G,ae,se,ie,re,C,_),D++}}else if(D>K)for(;D<=J;)Te(w[D],se,ie,!0),D++;else{const le=D,ae=D,ue=new Map;for(D=ae;D<=K;D++){const Me=R[D]=_?gi(R[D]):Mn(R[D]);Me.key!=null&&ue.set(Me.key,D)}let Ie,oe=0;const _e=K-ae+1;let ze=!1,Pe=0;const xe=new Array(_e);for(D=0;D<_e;D++)xe[D]=0;for(D=le;D<=J;D++){const Me=w[D];if(oe>=_e){Te(Me,se,ie,!0);continue}let Je;if(Me.key!=null)Je=ue.get(Me.key);else for(Ie=ae;Ie<=K;Ie++)if(xe[Ie-ae]===0&&er(Me,R[Ie])){Je=Ie;break}Je===void 0?Te(Me,se,ie,!0):(xe[Je-ae]=D+1,Je>=Pe?Pe=Je:ze=!0,m(Me,R[Je],G,null,se,ie,re,C,_),oe++)}const Ue=ze?og(xe):ys;for(Ie=Ue.length-1,D=_e-1;D>=0;D--){const Me=ae+D,Je=R[Me],E=Me+1<V?R[Me+1].el:H;xe[D]===0?m(null,Je,G,E,se,ie,re,C,_):ze&&(Ie<0||D!==Ue[Ie]?be(Je,G,E,2):Ie--)}}},be=(w,R,G,H,se=null)=>{const{el:ie,type:re,transition:C,children:_,shapeFlag:D}=w;if(D&6){be(w.component.subTree,R,G,H);return}if(D&128){w.suspense.move(R,G,H);return}if(D&64){re.move(w,R,G,Le);return}if(re===fn){n(ie,R,G);for(let J=0;J<_.length;J++)be(_[J],R,G,H);n(w.anchor,R,G);return}if(re===Ba){b(w,R,G);return}if(H!==2&&D&1&&C)if(H===0)C.beforeEnter(ie),n(ie,R,G),en(()=>C.enter(ie),se);else{const{leave:J,delayLeave:K,afterLeave:le}=C,ae=()=>n(ie,R,G),ue=()=>{J(ie,()=>{ae(),le&&le()})};K?K(ie,ae,ue):ue()}else n(ie,R,G)},Te=(w,R,G,H=!1,se=!1)=>{const{type:ie,props:re,ref:C,children:_,dynamicChildren:D,shapeFlag:V,patchFlag:J,dirs:K}=w;if(C!=null&&Rc(C,null,G,w,!0),V&256){R.ctx.deactivate(w);return}const le=V&1&&K,ae=!mr(w);let ue;if(ae&&(ue=re&&re.onVnodeBeforeUnmount)&&Sn(ue,R,w),V&6)ce(w.component,G,H);else{if(V&128){w.suspense.unmount(G,H);return}le&&Ri(w,null,R,"beforeUnmount"),V&64?w.type.remove(w,R,G,se,Le,H):D&&(ie!==fn||J>0&&J&64)?ge(D,R,G,!1,!0):(ie===fn&&J&384||!se&&V&16)&&ge(_,R,G),H&&Oe(w)}(ae&&(ue=re&&re.onVnodeUnmounted)||le)&&en(()=>{ue&&Sn(ue,R,w),le&&Ri(w,null,R,"unmounted")},G)},Oe=w=>{const{type:R,el:G,anchor:H,transition:se}=w;if(R===fn){ne(G,H);return}if(R===Ba){I(w);return}const ie=()=>{s(G),se&&!se.persisted&&se.afterLeave&&se.afterLeave()};if(w.shapeFlag&1&&se&&!se.persisted){const{leave:re,delayLeave:C}=se,_=()=>re(G,ie);C?C(w.el,ie,_):_()}else ie()},ne=(w,R)=>{let G;for(;w!==R;)G=d(w),s(w),w=G;s(R)},ce=(w,R,G)=>{const{bum:H,scope:se,update:ie,subTree:re,um:C}=w;H&&So(H),se.stop(),ie&&(ie.active=!1,Te(re,w,R,G)),C&&en(C,R),en(()=>{w.isUnmounted=!0},R),R&&R.pendingBranch&&!R.isUnmounted&&w.asyncDep&&!w.asyncResolved&&w.suspenseId===R.pendingId&&(R.deps--,R.deps===0&&R.resolve())},ge=(w,R,G,H=!1,se=!1,ie=0)=>{for(let re=ie;re<w.length;re++)Te(w[re],R,G,H,se)},fe=w=>w.shapeFlag&6?fe(w.component.subTree):w.shapeFlag&128?w.suspense.next():d(w.anchor||w.el);let Ce=!1;const we=(w,R,G)=>{w==null?R._vnode&&Te(R._vnode,null,null,!0):m(R._vnode||null,w,R,null,null,null,G),Ce||(Ce=!0,hu(),Od(),Ce=!1),R._vnode=w},Le={p:m,um:Te,m:be,r:Oe,mt:q,mc:F,pc:k,pbc:v,n:fe,o:i};let Ye,L;return{render:we,hydrate:Ye,createApp:Jp(we,Ye)}}function To({type:i,props:e},t){return t==="svg"&&i==="foreignObject"||t==="mathml"&&i==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Di({effect:i,update:e},t){i.allowRecurse=e.allowRecurse=t}function ag(i,e){return(!i||i&&!i.pendingBranch)&&e&&!e.persisted}function nf(i,e,t=!1){const n=i.children,s=e.children;if(Ve(n)&&Ve(s))for(let r=0;r<n.length;r++){const a=n[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=gi(s[r]),o.el=a.el),t||nf(a,o)),o.type===fo&&(o.el=a.el)}}function og(i){const e=i.slice(),t=[0];let n,s,r,a,o;const c=i.length;for(n=0;n<c;n++){const l=i[n];if(l!==0){if(s=t[t.length-1],i[s]<l){e[n]=s,t.push(n);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,i[t[o]]<l?r=o+1:a=o;l<i[t[r]]&&(r>0&&(e[n]=t[r-1]),t[r]=n)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function sf(i){const e=i.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:sf(e)}const cg=i=>i.__isTeleport,fn=Symbol.for("v-fgt"),fo=Symbol.for("v-txt"),Si=Symbol.for("v-cmt"),Ba=Symbol.for("v-stc"),Er=[];let vn=null;function yt(i=!1){Er.push(vn=i?null:[])}function lg(){Er.pop(),vn=Er[Er.length-1]||null}let Dr=1;function xu(i){Dr+=i}function rf(i){return i.dynamicChildren=Dr>0?vn||ys:null,lg(),Dr>0&&vn&&vn.push(i),i}function Vt(i,e,t,n,s,r){return rf(pe(i,e,t,n,s,r,!0))}function Ml(i,e,t,n,s){return rf(ht(i,e,t,n,s,!0))}function af(i){return i?i.__v_isVNode===!0:!1}function er(i,e){return i.type===e.type&&i.key===e.key}const Ao="__vInternal",of=({key:i})=>i??null,Ta=({ref:i,ref_key:e,ref_for:t})=>(typeof i=="number"&&(i=""+i),i!=null?Lt(i)||sn(i)||Ke(i)?{i:tn,r:i,k:e,f:!!t}:i:null);function pe(i,e=null,t=null,n=0,s=null,r=i===fn?0:1,a=!1,o=!1){const c={__v_isVNode:!0,__v_skip:!0,type:i,props:e,key:e&&of(e),ref:e&&Ta(e),scopeId:uo,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:n,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:tn};return o?(wl(c,t),r&128&&i.normalize(c)):t&&(c.shapeFlag|=Lt(t)?8:16),Dr>0&&!a&&vn&&(c.patchFlag>0||r&6)&&c.patchFlag!==32&&vn.push(c),c}const ht=ug;function ug(i,e=null,t=null,n=0,s=null,r=!1){if((!i||i===Mp)&&(i=Si),af(i)){const o=Ns(i,e,!0);return t&&wl(o,t),Dr>0&&!r&&vn&&(o.shapeFlag&6?vn[vn.indexOf(i)]=o:vn.push(o)),o.patchFlag|=-2,o}if(Eg(i)&&(i=i.__vccOpts),e){e=hg(e);let{class:o,style:c}=e;o&&!Lt(o)&&(e.class=Fs(o)),pt(c)&&(Dd(c)&&!Ve(c)&&(c=kt({},c)),e.style=ao(c))}const a=Lt(i)?1:wp(i)?128:cg(i)?64:pt(i)?4:Ke(i)?2:0;return pe(i,e,t,n,s,a,r,!0)}function hg(i){return i?Dd(i)||Ao in i?kt({},i):i:null}function Ns(i,e,t=!1){const{props:n,ref:s,patchFlag:r,children:a}=i,o=e?dg(n||{},e):n;return{__v_isVNode:!0,__v_skip:!0,type:i.type,props:o,key:o&&of(o),ref:e&&e.ref?t&&s?Ve(s)?s.concat(Ta(e)):[s,Ta(e)]:Ta(e):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:a,target:i.target,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:e&&i.type!==fn?r===-1?16:r|16:r,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:i.transition,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&Ns(i.ssContent),ssFallback:i.ssFallback&&Ns(i.ssFallback),el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce}}function xt(i=" ",e=0){return ht(fo,null,i,e)}function cf(i,e){const t=ht(Ba,null,i);return t.staticCount=e,t}function xr(i="",e=!1){return e?(yt(),Ml(Si,null,i)):ht(Si,null,i)}function Mn(i){return i==null||typeof i=="boolean"?ht(Si):Ve(i)?ht(fn,null,i.slice()):typeof i=="object"?gi(i):ht(fo,null,String(i))}function gi(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:Ns(i)}function wl(i,e){let t=0;const{shapeFlag:n}=i;if(e==null)e=null;else if(Ve(e))t=16;else if(typeof e=="object")if(n&65){const s=e.default;s&&(s._c&&(s._d=!1),wl(i,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!(Ao in e)?e._ctx=tn:s===3&&tn&&(tn.slots._===1?e._=1:(e._=2,i.patchFlag|=1024))}else Ke(e)?(e={default:e,_ctx:tn},t=32):(e=String(e),n&64?(t=16,e=[xt(e)]):t=8);i.children=e,i.shapeFlag|=t}function dg(...i){const e={};for(let t=0;t<i.length;t++){const n=i[t];for(const s in n)if(s==="class")e.class!==n.class&&(e.class=Fs([e.class,n.class]));else if(s==="style")e.style=ao([e.style,n.style]);else if(no(s)){const r=e[s],a=n[s];a&&r!==a&&!(Ve(r)&&r.includes(a))&&(e[s]=r?[].concat(r,a):a)}else s!==""&&(e[s]=n[s])}return e}function Sn(i,e,t,n=null){In(i,e,7,[t,n])}const fg=Xd();let Ag=0;function pg(i,e,t){const n=i.type,s=(e?e.appContext:i.appContext)||fg,r={uid:Ag++,vnode:i,type:n,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new OA(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zd(n,s),emitsOptions:Gd(n,s),emit:null,emitted:null,propsDefaults:lt,inheritAttrs:n.inheritAttrs,ctx:lt,data:lt,props:lt,attrs:lt,slots:lt,refs:lt,setupState:lt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=bp.bind(null,r),i.ce&&i.ce(r),r}let Yt=null,ka,Dc;{const i=_d(),e=(t,n)=>{let s;return(s=i[t])||(s=i[t]=[]),s.push(n),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};ka=e("__VUE_INSTANCE_SETTERS__",t=>Yt=t),Dc=e("__VUE_SSR_SETTERS__",t=>po=t)}const kr=i=>{const e=Yt;return ka(i),i.scope.on(),()=>{i.scope.off(),ka(e)}},vu=()=>{Yt&&Yt.scope.off(),ka(null)};function lf(i){return i.vnode.shapeFlag&4}let po=!1;function gg(i,e=!1){e&&Dc(e);const{props:t,children:n}=i.vnode,s=lf(i);$p(i,t,s,e),ng(i,n);const r=s?mg(i,e):void 0;return e&&Dc(!1),r}function mg(i,e){const t=i.type;i.accessCache=Object.create(null),i.proxy=Ld(new Proxy(i.ctx,Vp));const{setup:n}=t;if(n){const s=i.setupContext=n.length>1?bg(i):null,r=kr(i);Ji();const a=vi(n,i,0,[i.props,s]);if(Zi(),r(),gd(a)){if(a.then(vu,vu),e)return a.then(o=>{Iu(i,o,e)}).catch(o=>{co(o,i,0)});i.asyncDep=a}else Iu(i,a,e)}else uf(i,e)}function Iu(i,e,t){Ke(e)?i.type.__ssrInlineRender?i.ssrRender=e:i.render=e:pt(e)&&(i.setupState=Ud(e)),uf(i,t)}let Cu;function uf(i,e,t){const n=i.type;if(!i.render){if(!e&&Cu&&!n.render){const s=n.template||yl(i).template;if(s){const{isCustomElement:r,compilerOptions:a}=i.appContext.config,{delimiters:o,compilerOptions:c}=n,l=kt(kt({isCustomElement:r,delimiters:o},a),c);n.render=Cu(s,l)}}i.render=n.render||pn}{const s=kr(i);Ji();try{Wp(i)}finally{Zi(),s()}}}function _g(i){return i.attrsProxy||(i.attrsProxy=new Proxy(i.attrs,{get(e,t){return nn(i,"get","$attrs"),e[t]}}))}function bg(i){const e=t=>{i.exposed=t||{}};return{get attrs(){return _g(i)},slots:i.slots,emit:i.emit,expose:e}}function Bl(i){if(i.exposed)return i.exposeProxy||(i.exposeProxy=new Proxy(Ud(Ld(i.exposed)),{get(e,t){if(t in e)return e[t];if(t in _r)return _r[t](i)},has(e,t){return t in e||t in _r}}))}function Eg(i){return Ke(i)&&"__vccOpts"in i}const Es=(i,e)=>cp(i,e,po),xg="3.4.21";/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const vg="http://www.w3.org/2000/svg",Ig="http://www.w3.org/1998/Math/MathML",mi=typeof document<"u"?document:null,yu=mi&&mi.createElement("template"),Cg={insert:(i,e,t)=>{e.insertBefore(i,t||null)},remove:i=>{const e=i.parentNode;e&&e.removeChild(i)},createElement:(i,e,t,n)=>{const s=e==="svg"?mi.createElementNS(vg,i):e==="mathml"?mi.createElementNS(Ig,i):mi.createElement(i,t?{is:t}:void 0);return i==="select"&&n&&n.multiple!=null&&s.setAttribute("multiple",n.multiple),s},createText:i=>mi.createTextNode(i),createComment:i=>mi.createComment(i),setText:(i,e)=>{i.nodeValue=e},setElementText:(i,e)=>{i.textContent=e},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>mi.querySelector(i),setScopeId(i,e){i.setAttribute(e,"")},insertStaticContent(i,e,t,n,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{yu.innerHTML=n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i;const o=yu.content;if(n==="svg"||n==="mathml"){const c=o.firstChild;for(;c.firstChild;)o.appendChild(c.firstChild);o.removeChild(c)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},yg=Symbol("_vtc");function Sg(i,e,t){const n=i[yg];n&&(e=(e?[e,...n]:[...n]).join(" ")),e==null?i.removeAttribute("class"):t?i.setAttribute("class",e):i.className=e}const Su=Symbol("_vod"),Mg=Symbol("_vsh"),wg=Symbol(""),Bg=/(^|;)\s*display\s*:/;function Tg(i,e,t){const n=i.style,s=Lt(t);let r=!1;if(t&&!s){if(e)if(Lt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&Ra(n,o,"")}else for(const a in e)t[a]==null&&Ra(n,a,"");for(const a in t)a==="display"&&(r=!0),Ra(n,a,t[a])}else if(s){if(e!==t){const a=n[wg];a&&(t+=";"+a),n.cssText=t,r=Bg.test(t)}}else e&&i.removeAttribute("style");Su in i&&(i[Su]=r?n.display:"",i[Mg]&&(n.display="none"))}const Mu=/\s*!important$/;function Ra(i,e,t){if(Ve(t))t.forEach(n=>Ra(i,e,n));else if(t==null&&(t=""),e.startsWith("--"))i.setProperty(e,t);else{const n=Rg(i,e);Mu.test(t)?i.setProperty(js(n),t.replace(Mu,""),"important"):i[n]=t}}const wu=["Webkit","Moz","ms"],Ro={};function Rg(i,e){const t=Ro[e];if(t)return t;let n=Ps(e);if(n!=="filter"&&n in i)return Ro[e]=n;n=md(n);for(let s=0;s<wu.length;s++){const r=wu[s]+n;if(r in i)return Ro[e]=r}return e}const Bu="http://www.w3.org/1999/xlink";function Dg(i,e,t,n,s){if(n&&e.startsWith("xlink:"))t==null?i.removeAttributeNS(Bu,e.slice(6,e.length)):i.setAttributeNS(Bu,e,t);else{const r=QA(e);t==null||r&&!bd(t)?i.removeAttribute(e):i.setAttribute(e,r?"":t)}}function Lg(i,e,t,n,s,r,a){if(e==="innerHTML"||e==="textContent"){n&&a(n,s,r),i[e]=t??"";return}const o=i.tagName;if(e==="value"&&o!=="PROGRESS"&&!o.includes("-")){const l=o==="OPTION"?i.getAttribute("value")||"":i.value,u=t??"";(l!==u||!("_value"in i))&&(i.value=u),t==null&&i.removeAttribute(e),i._value=t;return}let c=!1;if(t===""||t==null){const l=typeof i[e];l==="boolean"?t=bd(t):t==null&&l==="string"?(t="",c=!0):l==="number"&&(t=0,c=!0)}try{i[e]=t}catch{}c&&i.removeAttribute(e)}function Pg(i,e,t,n){i.addEventListener(e,t,n)}function Fg(i,e,t,n){i.removeEventListener(e,t,n)}const Tu=Symbol("_vei");function Ug(i,e,t,n,s=null){const r=i[Tu]||(i[Tu]={}),a=r[e];if(n&&a)a.value=n;else{const[o,c]=Ng(e);if(n){const l=r[e]=kg(n,s);Pg(i,o,l,c)}else a&&(Fg(i,o,a,c),r[e]=void 0)}}const Ru=/(?:Once|Passive|Capture)$/;function Ng(i){let e;if(Ru.test(i)){e={};let n;for(;n=i.match(Ru);)i=i.slice(0,i.length-n[0].length),e[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):js(i.slice(2)),e]}let Do=0;const Qg=Promise.resolve(),Og=()=>Do||(Qg.then(()=>Do=0),Do=Date.now());function kg(i,e){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;In(Gg(n,t.value),e,5,[n])};return t.value=i,t.attached=Og(),t}function Gg(i,e){if(Ve(e)){const t=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{t.call(i),i._stopped=!0},e.map(n=>s=>!s._stopped&&n&&n(s))}else return e}const Du=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,Hg=(i,e,t,n,s,r,a,o,c)=>{const l=s==="svg";e==="class"?Sg(i,n,l):e==="style"?Tg(i,t,n):no(e)?dl(e)||Ug(i,e,t,n,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):zg(i,e,n,l))?Lg(i,e,n,r,a,o,c):(e==="true-value"?i._trueValue=n:e==="false-value"&&(i._falseValue=n),Dg(i,e,n,l))};function zg(i,e,t,n){if(n)return!!(e==="innerHTML"||e==="textContent"||e in i&&Du(e)&&Ke(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&i.tagName==="INPUT"||e==="type"&&i.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=i.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Du(e)&&Lt(t)?!1:e in i}const Vg=kt({patchProp:Hg},Cg);let Lu;function Wg(){return Lu||(Lu=sg(Vg))}const qg=(...i)=>{const e=Wg().createApp(...i),{mount:t}=e;return e.mount=n=>{const s=Kg(n);if(!s)return;const r=e._component;!Ke(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.innerHTML="";const a=t(s,!1,jg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function jg(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function Kg(i){return Lt(i)?document.querySelector(i):i}(function(){try{if(typeof document<"u"){var i=document.createElement("style");i.appendChild(document.createTextNode('.vue3-marquee{display:flex!important;position:relative}.vue3-marquee.horizontal{overflow-x:hidden!important;flex-direction:row!important;width:100%;height:max-content}.vue3-marquee.vertical{overflow-y:hidden!important;flex-direction:column!important;height:100%;width:max-content}.vue3-marquee:hover>.marquee{animation-play-state:var(--pauseOnHover)}.vue3-marquee:active>.marquee{animation-play-state:var(--pauseOnClick)}.vue3-marquee>.marquee{flex:0 0 auto;min-width:var(--min-width);min-height:var(--min-height);z-index:1;animation:var(--orientation) var(--duration) linear var(--delay) var(--loops);animation-play-state:var(--pauseAnimation);animation-direction:var(--direction)}.vue3-marquee.horizontal>.marquee{display:flex;flex-direction:row;align-items:center}.vue3-marquee.vertical>.marquee{display:flex;flex-direction:column;align-items:center}@keyframes scrollX{0%{transform:translate(0)}to{transform:translate(-100%)}}@keyframes scrollY{0%{transform:translateY(0)}to{transform:translateY(-100%)}}.vue3-marquee>.overlay{position:absolute;width:100%;height:100%}.vue3-marquee>.transparent-overlay{position:absolute;width:100%;height:100%}.vue3-marquee>.overlay:before,.vue3-marquee>.overlay:after{content:"";position:absolute;z-index:2}.vue3-marquee.horizontal>.overlay:before,.vue3-marquee.horizontal>.overlay:after{background:linear-gradient(to right,var(--gradient-color));height:100%;width:var(--gradient-length)}.vue3-marquee.vertical>.overlay:before,.vue3-marquee.vertical>.overlay:after{background:linear-gradient(to bottom,var(--gradient-color));height:var(--gradient-length);width:100%}.vue3-marquee.horizontal>.overlay:after{transform:rotate(180deg)}.vue3-marquee.vertical>.overlay:after{transform:rotate(-180deg)}.vue3-marquee>.overlay:before{left:0;top:0}.vue3-marquee.horizontal>.overlay:after{right:0;top:0}.vue3-marquee.vertical>.overlay:after{left:0;bottom:0}')),document.head.appendChild(i)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();var Yg=Object.defineProperty,Pu=Object.getOwnPropertySymbols,Xg=Object.prototype.hasOwnProperty,Jg=Object.prototype.propertyIsEnumerable,Fu=(i,e,t)=>e in i?Yg(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Uu=(i,e)=>{for(var t in e||(e={}))Xg.call(e,t)&&Fu(i,t,e[t]);if(Pu)for(var t of Pu(e))Jg.call(e,t)&&Fu(i,t,e[t]);return i},Zg=(i,e)=>{const t=i.__vccOpts||i;for(const[n,s]of e)t[n]=s;return t};const $g=Mi({props:{vertical:{type:Boolean,default:!1},direction:{type:String,default:"normal"},duration:{type:Number,default:20},delay:{type:Number,default:0},loop:{type:Number,default:0},clone:{type:Boolean,default:!1},gradient:{type:Boolean,default:!1},gradientColor:{type:Array,default:[255,255,255]},gradientWidth:{type:String},gradientLength:{type:String},pauseOnHover:{type:Boolean,default:!1},pauseOnClick:{type:Boolean,default:!1},pause:{type:Boolean,default:!1},animateOnOverflowOnly:{type:Boolean,default:!1}},emits:["onComplete","onLoopComplete","onPause","onResume","onOverflowDetected","onOverflowCleared"],setup(i,{emit:e}){const t=bt(0),n=bt("100%"),s=bt("100%"),r=bt(0),a=bt(!1),o=bt(!1),c=bt(0),l=bt(0),u=bt(0),h=bt(0),d=bt(!1),f=bt(!1),g=bt(0),m=bt(null),p=bt("200px"),A=bt(!1),x=bt(null),b=bt(null),I=async()=>{await P(),r.value++},P=async()=>{i.vertical&&(a.value=!0),setInterval(()=>{if(n.value="0%",s.value="0%",x.value!==null&&b.value!==null&&x.value&&b.value)if(i.vertical&&"clientHeight"in x.value&&"clientHeight"in b.value){h.value=x.value.clientHeight,u.value=b.value.clientHeight;const W=Math.ceil(u.value/h.value);return t.value=isFinite(W)?W:0,a.value=!1,t.value}else if(!i.vertical&&"clientWidth"in x.value&&"clientWidth"in b.value){if(l.value=x.value.clientWidth,c.value=b.value.clientWidth,i.animateOnOverflowOnly)return l.value<c.value?(o.value=!0,e("onOverflowDetected")):(o.value=!1,e("onOverflowCleared")),0;const W=Math.ceil(c.value/l.value);return t.value=isFinite(W)?W:0,t.value}else return n.value="100%",s.value="100%",0;else return n.value="100%",s.value="100%",0},100)};ws(l,async()=>{i.clone&&I()}),ws(c,async()=>{(i.clone||i.animateOnOverflowOnly)&&I()}),ws(()=>i.pause,(W,j)=>{W!==j&&e(W?"onResume":"onPause")});const M=()=>{i.pauseOnHover&&(e("onPause"),d.value=!0)},B=()=>{i.pauseOnHover&&(e("onResume"),d.value=!1)},F=()=>{i.pauseOnClick&&(e("onPause"),f.value=!0)},S=()=>{i.pauseOnClick&&(e("onResume"),f.value=!1)},v=Es(()=>i.pause||i.vertical&&a.value||i.animateOnOverflowOnly&&o.value?"paused":"running"),T=Es(()=>i.pauseOnHover&&(d.value||f.value)||!i.pauseOnHover&&v.value==="paused"?"paused":"running"),U=Es(()=>i.pauseOnHover&&d.value||i.pauseOnClick&&f.value||!i.pauseOnHover&&v.value==="paused"?"paused":"running"),Q=Es(()=>{const W={"--duration":`${i.duration}s`,"--delay":`${i.delay}s`,"--direction":`${i.direction}`,"--pauseOnHover":`${T.value}`,"--pauseOnClick":`${U.value}`,"--pauseAnimation":`${v.value}`,"--loops":`${i.loop===0?"infinite":i.loop}`,"--gradient-color":`rgba(${i.gradientColor[0]}, ${i.gradientColor[1]}, ${i.gradientColor[2]}, 1), rgba(${i.gradientColor[0]}, ${i.gradientColor[1]}, ${i.gradientColor[2]}, 0)`,"--gradient-length":`${p.value}`,"--min-width":`${n.value}`,"--min-height":`${s.value}`},j={"--orientation":"scrollX",orientation:"horizontal"};return i.vertical&&(j["--orientation"]="scrollY"),Uu(Uu({},W),j)}),q=Es(()=>!!i.gradient),ee=async()=>{i.vertical?(s.value="100%",n.value="auto",i.animateOnOverflowOnly&&console.warn("The `animateOnOverflowOnly` prop is not supported for vertical marquees.")):(s.value="auto",i.animateOnOverflowOnly?n.value="auto":n.value="100%"),i.gradient&&(i.gradientWidth?(console.warn("The `gradientWidth` prop has been deprecated and will be removed in a future release. Please use `gradientLength` instead."),p.value=i.gradientWidth):i.gradientLength&&(p.value=i.gradientLength)),(i.clone||i.animateOnOverflowOnly)&&(await P(),I()),A.value=!0};return Or(async()=>{ee(),m.value=setInterval(()=>{g.value++,i.loop!==0&&g.value===i.loop&&(e("onComplete"),clearInterval(m.value)),e("onLoopComplete")},i.duration*1e3)}),qd(()=>{clearInterval(m.value)}),{ready:A,contentWidth:l,containerWidth:c,contentHeight:h,containerHeight:u,loopCounter:g,loopInterval:m,mouseOverMarquee:d,mouseDownMarquee:f,minWidth:n,minHeight:s,animateOnOverflowPause:o,marqueeContent:x,marqueeOverlayContainer:b,componentKey:r,showGradient:q,cloneAmount:t,ForcesUpdate:I,checkForClone:P,setupMarquee:ee,getCurrentStyle:Q,hoverStarted:M,hoverEnded:B,mouseDown:F,mouseUp:S}}}),em={class:"transparent-overlay",ref:"marqueeOverlayContainer","aria-hidden":!0},tm={class:"marquee",ref:"marqueeContent"},nm={key:1,"aria-hidden":!0,class:"marquee"};function im(i,e,t,n,s,r){return i.ready?(yt(),Vt("div",{class:Fs(["vue3-marquee",{vertical:i.vertical,horizontal:!i.vertical}]),style:ao(i.getCurrentStyle),key:i.componentKey,onMouseenter:e[0]||(e[0]=(...a)=>i.hoverStarted&&i.hoverStarted(...a)),onMouseleave:e[1]||(e[1]=(...a)=>i.hoverEnded&&i.hoverEnded(...a)),onMousedown:e[2]||(e[2]=(...a)=>i.mouseDown&&i.mouseDown(...a)),onMouseup:e[3]||(e[3]=(...a)=>i.mouseUp&&i.mouseUp(...a))},[pe("div",em,null,512),i.showGradient?(yt(),Vt("div",{key:0,"aria-hidden":!0,class:Fs(["overlay",{vertical:i.vertical,horizontal:!i.vertical}])},null,2)):xr("",!0),pe("div",tm,[wo(i.$slots,"default")],512),!i.animateOnOverflowOnly||i.animateOnOverflowOnly&&!i.animateOnOverflowPause?(yt(),Vt("div",nm,[wo(i.$slots,"default")])):xr("",!0),(yt(!0),Vt(fn,null,zp(i.cloneAmount,a=>(yt(),Vt("div",{"aria-hidden":!0,class:"marquee cloned",key:a},[wo(i.$slots,"default")]))),128))],38)):xr("",!0)}var sm=Zg($g,[["render",im]]),rm={install(i,e){var t;const n=(t=e==null?void 0:e.name)!=null?t:"Vue3Marquee";i.component(n,sm)}},am=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function om(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var hf={exports:{}};(function(i,e){(function(t,n){i.exports=n()})(am,function(){return function(t){function n(r){if(s[r])return s[r].exports;var a=s[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}var s={};return n.m=t,n.c=s,n.p="dist/",n(0)}([function(t,n,s){function r(q){return q&&q.__esModule?q:{default:q}}var a=Object.assign||function(q){for(var ee=1;ee<arguments.length;ee++){var W=arguments[ee];for(var j in W)Object.prototype.hasOwnProperty.call(W,j)&&(q[j]=W[j])}return q},o=s(1),c=(r(o),s(6)),l=r(c),u=s(7),h=r(u),d=s(8),f=r(d),g=s(9),m=r(g),p=s(10),A=r(p),x=s(11),b=r(x),I=s(14),P=r(I),M=[],B=!1,F={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},S=function(){var q=arguments.length>0&&arguments[0]!==void 0&&arguments[0];if(q&&(B=!0),B)return M=(0,b.default)(M,F),(0,A.default)(M,F.once),M},v=function(){M=(0,P.default)(),S()},T=function(){M.forEach(function(q,ee){q.node.removeAttribute("data-aos"),q.node.removeAttribute("data-aos-easing"),q.node.removeAttribute("data-aos-duration"),q.node.removeAttribute("data-aos-delay")})},U=function(q){return q===!0||q==="mobile"&&m.default.mobile()||q==="phone"&&m.default.phone()||q==="tablet"&&m.default.tablet()||typeof q=="function"&&q()===!0},Q=function(q){F=a(F,q),M=(0,P.default)();var ee=document.all&&!window.atob;return U(F.disable)||ee?T():(F.disableMutationObserver||f.default.isSupported()||(console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),F.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",F.easing),document.querySelector("body").setAttribute("data-aos-duration",F.duration),document.querySelector("body").setAttribute("data-aos-delay",F.delay),F.startEvent==="DOMContentLoaded"&&["complete","interactive"].indexOf(document.readyState)>-1?S(!0):F.startEvent==="load"?window.addEventListener(F.startEvent,function(){S(!0)}):document.addEventListener(F.startEvent,function(){S(!0)}),window.addEventListener("resize",(0,h.default)(S,F.debounceDelay,!0)),window.addEventListener("orientationchange",(0,h.default)(S,F.debounceDelay,!0)),window.addEventListener("scroll",(0,l.default)(function(){(0,A.default)(M,F.once)},F.throttleDelay)),F.disableMutationObserver||f.default.ready("[data-aos]",v),M)};t.exports={init:Q,refresh:S,refreshHard:v}},function(t,n){},,,,,function(t,n){(function(s){function r(U,Q,q){function ee(R){var G=ne,H=ce;return ne=ce=void 0,Le=R,fe=U.apply(H,G)}function W(R){return Le=R,Ce=setTimeout(de,Q),Ye?ee(R):fe}function j(R){var G=R-we,H=R-Le,se=Q-G;return L?v(se,ge-H):se}function k(R){var G=R-we,H=R-Le;return we===void 0||G>=Q||G<0||L&&H>=ge}function de(){var R=T();return k(R)?Ae(R):void(Ce=setTimeout(de,j(R)))}function Ae(R){return Ce=void 0,w&&ne?ee(R):(ne=ce=void 0,fe)}function be(){Ce!==void 0&&clearTimeout(Ce),Le=0,ne=we=ce=Ce=void 0}function Te(){return Ce===void 0?fe:Ae(T())}function Oe(){var R=T(),G=k(R);if(ne=arguments,ce=this,we=R,G){if(Ce===void 0)return W(we);if(L)return Ce=setTimeout(de,Q),ee(we)}return Ce===void 0&&(Ce=setTimeout(de,Q)),fe}var ne,ce,ge,fe,Ce,we,Le=0,Ye=!1,L=!1,w=!0;if(typeof U!="function")throw new TypeError(d);return Q=u(Q)||0,o(q)&&(Ye=!!q.leading,L="maxWait"in q,ge=L?S(u(q.maxWait)||0,Q):ge,w="trailing"in q?!!q.trailing:w),Oe.cancel=be,Oe.flush=Te,Oe}function a(U,Q,q){var ee=!0,W=!0;if(typeof U!="function")throw new TypeError(d);return o(q)&&(ee="leading"in q?!!q.leading:ee,W="trailing"in q?!!q.trailing:W),r(U,Q,{leading:ee,maxWait:Q,trailing:W})}function o(U){var Q=typeof U>"u"?"undefined":h(U);return!!U&&(Q=="object"||Q=="function")}function c(U){return!!U&&(typeof U>"u"?"undefined":h(U))=="object"}function l(U){return(typeof U>"u"?"undefined":h(U))=="symbol"||c(U)&&F.call(U)==g}function u(U){if(typeof U=="number")return U;if(l(U))return f;if(o(U)){var Q=typeof U.valueOf=="function"?U.valueOf():U;U=o(Q)?Q+"":Q}if(typeof U!="string")return U===0?U:+U;U=U.replace(m,"");var q=A.test(U);return q||x.test(U)?b(U.slice(2),q?2:8):p.test(U)?f:+U}var h=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(U){return typeof U}:function(U){return U&&typeof Symbol=="function"&&U.constructor===Symbol&&U!==Symbol.prototype?"symbol":typeof U},d="Expected a function",f=NaN,g="[object Symbol]",m=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,A=/^0b[01]+$/i,x=/^0o[0-7]+$/i,b=parseInt,I=(typeof s>"u"?"undefined":h(s))=="object"&&s&&s.Object===Object&&s,P=(typeof self>"u"?"undefined":h(self))=="object"&&self&&self.Object===Object&&self,M=I||P||Function("return this")(),B=Object.prototype,F=B.toString,S=Math.max,v=Math.min,T=function(){return M.Date.now()};t.exports=a}).call(n,function(){return this}())},function(t,n){(function(s){function r(T,U,Q){function q(w){var R=Oe,G=ne;return Oe=ne=void 0,we=w,ge=T.apply(G,R)}function ee(w){return we=w,fe=setTimeout(k,U),Le?q(w):ge}function W(w){var R=w-Ce,G=w-we,H=U-R;return Ye?S(H,ce-G):H}function j(w){var R=w-Ce,G=w-we;return Ce===void 0||R>=U||R<0||Ye&&G>=ce}function k(){var w=v();return j(w)?de(w):void(fe=setTimeout(k,W(w)))}function de(w){return fe=void 0,L&&Oe?q(w):(Oe=ne=void 0,ge)}function Ae(){fe!==void 0&&clearTimeout(fe),we=0,Oe=Ce=ne=fe=void 0}function be(){return fe===void 0?ge:de(v())}function Te(){var w=v(),R=j(w);if(Oe=arguments,ne=this,Ce=w,R){if(fe===void 0)return ee(Ce);if(Ye)return fe=setTimeout(k,U),q(Ce)}return fe===void 0&&(fe=setTimeout(k,U)),ge}var Oe,ne,ce,ge,fe,Ce,we=0,Le=!1,Ye=!1,L=!0;if(typeof T!="function")throw new TypeError(h);return U=l(U)||0,a(Q)&&(Le=!!Q.leading,Ye="maxWait"in Q,ce=Ye?F(l(Q.maxWait)||0,U):ce,L="trailing"in Q?!!Q.trailing:L),Te.cancel=Ae,Te.flush=be,Te}function a(T){var U=typeof T>"u"?"undefined":u(T);return!!T&&(U=="object"||U=="function")}function o(T){return!!T&&(typeof T>"u"?"undefined":u(T))=="object"}function c(T){return(typeof T>"u"?"undefined":u(T))=="symbol"||o(T)&&B.call(T)==f}function l(T){if(typeof T=="number")return T;if(c(T))return d;if(a(T)){var U=typeof T.valueOf=="function"?T.valueOf():T;T=a(U)?U+"":U}if(typeof T!="string")return T===0?T:+T;T=T.replace(g,"");var Q=p.test(T);return Q||A.test(T)?x(T.slice(2),Q?2:8):m.test(T)?d:+T}var u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(T){return typeof T}:function(T){return T&&typeof Symbol=="function"&&T.constructor===Symbol&&T!==Symbol.prototype?"symbol":typeof T},h="Expected a function",d=NaN,f="[object Symbol]",g=/^\s+|\s+$/g,m=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,A=/^0o[0-7]+$/i,x=parseInt,b=(typeof s>"u"?"undefined":u(s))=="object"&&s&&s.Object===Object&&s,I=(typeof self>"u"?"undefined":u(self))=="object"&&self&&self.Object===Object&&self,P=b||I||Function("return this")(),M=Object.prototype,B=M.toString,F=Math.max,S=Math.min,v=function(){return P.Date.now()};t.exports=r}).call(n,function(){return this}())},function(t,n){function s(u){var h=void 0,d=void 0;for(h=0;h<u.length;h+=1)if(d=u[h],d.dataset&&d.dataset.aos||d.children&&s(d.children))return!0;return!1}function r(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function a(){return!!r()}function o(u,h){var d=window.document,f=r(),g=new f(c);l=h,g.observe(d.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function c(u){u&&u.forEach(function(h){var d=Array.prototype.slice.call(h.addedNodes),f=Array.prototype.slice.call(h.removedNodes),g=d.concat(f);if(s(g))return l()})}Object.defineProperty(n,"__esModule",{value:!0});var l=function(){};n.default={isSupported:a,ready:o}},function(t,n){function s(d,f){if(!(d instanceof f))throw new TypeError("Cannot call a class as a function")}function r(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function d(f,g){for(var m=0;m<g.length;m++){var p=g[m];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(f,p.key,p)}}return function(f,g,m){return g&&d(f.prototype,g),m&&d(f,m),f}}(),o=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,l=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,u=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,h=function(){function d(){s(this,d)}return a(d,[{key:"phone",value:function(){var f=r();return!(!o.test(f)&&!c.test(f.substr(0,4)))}},{key:"mobile",value:function(){var f=r();return!(!l.test(f)&&!u.test(f.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),d}();n.default=new h},function(t,n){Object.defineProperty(n,"__esModule",{value:!0});var s=function(a,o,c){var l=a.node.getAttribute("data-aos-once");o>a.position?a.node.classList.add("aos-animate"):typeof l<"u"&&(l==="false"||!c&&l!=="true")&&a.node.classList.remove("aos-animate")},r=function(a,o){var c=window.pageYOffset,l=window.innerHeight;a.forEach(function(u,h){s(u,l+c,o)})};n.default=r},function(t,n,s){function r(l){return l&&l.__esModule?l:{default:l}}Object.defineProperty(n,"__esModule",{value:!0});var a=s(12),o=r(a),c=function(l,u){return l.forEach(function(h,d){h.node.classList.add("aos-init"),h.position=(0,o.default)(h.node,u.offset)}),l};n.default=c},function(t,n,s){function r(l){return l&&l.__esModule?l:{default:l}}Object.defineProperty(n,"__esModule",{value:!0});var a=s(13),o=r(a),c=function(l,u){var h=0,d=0,f=window.innerHeight,g={offset:l.getAttribute("data-aos-offset"),anchor:l.getAttribute("data-aos-anchor"),anchorPlacement:l.getAttribute("data-aos-anchor-placement")};switch(g.offset&&!isNaN(g.offset)&&(d=parseInt(g.offset)),g.anchor&&document.querySelectorAll(g.anchor)&&(l=document.querySelectorAll(g.anchor)[0]),h=(0,o.default)(l).top,g.anchorPlacement){case"top-bottom":break;case"center-bottom":h+=l.offsetHeight/2;break;case"bottom-bottom":h+=l.offsetHeight;break;case"top-center":h+=f/2;break;case"bottom-center":h+=f/2+l.offsetHeight;break;case"center-center":h+=f/2+l.offsetHeight/2;break;case"top-top":h+=f;break;case"bottom-top":h+=l.offsetHeight+f;break;case"center-top":h+=l.offsetHeight/2+f}return g.anchorPlacement||g.offset||isNaN(u)||(d=u),h+d};n.default=c},function(t,n){Object.defineProperty(n,"__esModule",{value:!0});var s=function(r){for(var a=0,o=0;r&&!isNaN(r.offsetLeft)&&!isNaN(r.offsetTop);)a+=r.offsetLeft-(r.tagName!="BODY"?r.scrollLeft:0),o+=r.offsetTop-(r.tagName!="BODY"?r.scrollTop:0),r=r.offsetParent;return{top:o,left:a}};n.default=s},function(t,n){Object.defineProperty(n,"__esModule",{value:!0});var s=function(r){return r=r||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(r,function(a){return{node:a}})};n.default=s}])})})(hf);var cm=hf.exports;const lm=om(cm),um="/images/inugames-logo.svg",hm={class:"w-full h-[120px] z-30 bg-[#000] fixed top-0"},dm={class:"container py-5 flex justify-between items-center"},fm=cf('<a href="#" class="z-10"><img src="'+um+'" width="250" alt=""></a><ul class="hidden lg:static transition-all lg:flex justify-center items-center gap-[30px] font-normal text-xl"><li><a href="#idea" class="transition-all hover:text-[#ffffff]">Games</a></li><li><a href="#token" class="transition-all hover:text-[#ffffff]">Token</a></li><li><a href="#FAQ" class="transition-all hover:text-[#ffffff]">FAQ</a></li><li><a href="https://docs.inu.games/" target="_blank" class="transition-all hover:text-[#ffffff]">Docs</a></li></ul>',2),Am=pe("div",{class:"w-full h-[5px] bg-white rounded-md"},null,-1),pm=pe("div",{class:"w-full h-[5px] bg-white rounded-md"},null,-1),gm=pe("div",{class:"w-full h-[5px] bg-white rounded-md"},null,-1),mm=[Am,pm,gm],_m={class:"container flex flex-col h-full items-start justify-start pt-[155px] gap-[30px] text-white font-normal text-2xl relative"},bm=Mi({__name:"Header",setup(i){const e=bt(!1),t=n=>{e.value=n};return(n,s)=>(yt(),Vt("header",hm,[pe("div",dm,[fm,pe("div",{class:"lg:hidden w-[40px] h-[35px] flex flex-col gap-2 cursor-pointer z-20",onClick:s[0]||(s[0]=r=>t(!e.value))},mm),pe("div",{class:Fs(["fixed w-full lg:hidden top-0 h-screen bg-black flex justify-start pl-10 pr-10 transition-all",{"left-0":e.value,"-left-full":!e.value}])},[pe("ul",_m,[pe("li",null,[pe("a",{href:"#idea",onClick:s[1]||(s[1]=r=>t(!e.value)),class:"transition-all hover:text-[#ffffff]"},"Games")]),pe("li",null,[pe("a",{href:"#token",onClick:s[2]||(s[2]=r=>t(!e.value)),class:"transition-all hover:text-[#ffffff]"},"Token")]),pe("li",null,[pe("a",{href:"#FAQ",onClick:s[3]||(s[3]=r=>t(!e.value)),class:"transition-all hover:text-[#ffffff]"},"FAQ")]),pe("li",null,[pe("a",{href:"https://docs.inu.games/",target:"_blank",onClick:s[4]||(s[4]=r=>t(!e.value)),class:"transition-all hover:text-[#ffffff]"},"Docs")])])],2)])]))}});/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Tl="167",es={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Em=0,Nu=1,xm=2,df=1,vm=2,qn=3,ti=0,$t=1,An=2,Ii=0,Bs=1,Qu=2,Ou=3,ku=4,Im=5,Hi=100,Cm=101,ym=102,Sm=103,Mm=104,wm=200,Bm=201,Tm=202,Rm=203,Lc=204,Pc=205,Dm=206,Lm=207,Pm=208,Fm=209,Um=210,Nm=211,Qm=212,Om=213,km=214,Gm=0,Hm=1,zm=2,Ga=3,Vm=4,Wm=5,qm=6,jm=7,ff=0,Km=1,Ym=2,Ci=0,Xm=1,Jm=2,Zm=3,$m=4,e_=5,t_=6,n_=7,Gu="attached",i_="detached",Af=300,Ki=301,Qs=302,Fc=303,Uc=304,go=306,Os=1e3,Yn=1001,Ha=1002,Jt=1003,pf=1004,fr=1005,Xt=1006,Da=1007,Dn=1008,Et=1009,gf=1010,mf=1011,Lr=1012,Rl=1013,Yi=1014,Zt=1015,$n=1016,Dl=1017,Ll=1018,ks=1020,_f=35902,bf=1021,Ef=1022,Dt=1023,xf=1024,vf=1025,Ts=1026,Gs=1027,bi=1028,Pl=1029,Vi=1030,Fl=1031,Ul=1033,La=33776,vr=33777,Pa=33778,Ir=33779,za=35840,Nc=35841,Va=35842,Qc=35843,Wa=36196,qa=37492,ja=37496,Ka=37808,Oc=37809,kc=37810,Gc=37811,Pr=37812,Hc=37813,zc=37814,Vc=37815,Wc=37816,qc=37817,jc=37818,Kc=37819,Yc=37820,Xc=37821,Cr=36492,Jc=36494,Zc=36495,If=36283,$c=36284,el=36285,tl=36286,s_=2200,r_=2201,a_=2202,Fr=2300,Ur=2301,Lo=2302,vs=2400,Is=2401,Ya=2402,Nl=2500,o_=2501,c_=0,Cf=1,nl=2,l_=3200,u_=3201,yf=0,h_=1,Tn="",Ct="srgb",wt="srgb-linear",mo="display-p3",Gr="display-p3-linear",Xa="linear",ct="srgb",Ja="rec709",Za="p3",ns=7680,Hu=519,d_=512,f_=513,A_=514,Sf=515,p_=516,g_=517,m_=518,__=519,il=35044,zu="300 es",Xn=2e3,$a=2001;class wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vu=1234567;const yr=Math.PI/180,Hs=180/Math.PI;function Cn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function Ut(i,e,t){return Math.max(e,Math.min(t,i))}function Ql(i,e){return(i%e+e)%e}function b_(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function E_(i,e,t){return i!==e?(t-i)/(e-i):0}function Sr(i,e,t){return(1-t)*i+t*e}function x_(i,e,t,n){return Sr(i,e,1-Math.exp(-t*n))}function v_(i,e=1){return e-Math.abs(Ql(i,e*2)-e)}function I_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function C_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function y_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function S_(i,e){return i+Math.random()*(e-i)}function M_(i){return i*(.5-Math.random())}function w_(i){i!==void 0&&(Vu=i);let e=Vu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function B_(i){return i*yr}function T_(i){return i*Hs}function R_(i){return(i&i-1)===0&&i!==0}function D_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function L_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function P_(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Mf={DEG2RAD:yr,RAD2DEG:Hs,generateUUID:Cn,clamp:Ut,euclideanModulo:Ql,mapLinear:b_,inverseLerp:E_,lerp:Sr,damp:x_,pingpong:v_,smoothstep:I_,smootherstep:C_,randInt:y_,randFloat:S_,randFloatSpread:M_,seededRandom:w_,degToRad:B_,radToDeg:T_,isPowerOfTwo:R_,ceilPowerOfTwo:D_,floorPowerOfTwo:L_,setQuaternionFromProperEuler:P_,normalize:at,denormalize:xn};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,n,s,r,a,o,c,l){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],m=s[0],p=s[3],A=s[6],x=s[1],b=s[4],I=s[7],P=s[2],M=s[5],B=s[8];return r[0]=a*m+o*x+c*P,r[3]=a*p+o*b+c*M,r[6]=a*A+o*I+c*B,r[1]=l*m+u*x+h*P,r[4]=l*p+u*b+h*M,r[7]=l*A+u*I+h*B,r[2]=d*m+f*x+g*P,r[5]=d*p+f*b+g*M,r[8]=d*A+f*I+g*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=h*m,e[1]=(s*l-u*n)*m,e[2]=(o*n-s*a)*m,e[3]=d*m,e[4]=(u*t-s*c)*m,e[5]=(s*r-o*t)*m,e[6]=f*m,e[7]=(n*c-l*t)*m,e[8]=(a*t-n*r)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Po.makeScale(e,t)),this}rotate(e){return this.premultiply(Po.makeRotation(-e)),this}translate(e,t){return this.premultiply(Po.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Po=new qe;function wf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function F_(){const i=Nr("canvas");return i.style.display="block",i}const Wu={};function Rs(i){i in Wu||(Wu[i]=!0,console.warn(i))}function U_(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const qu=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ju=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),tr={[wt]:{transfer:Xa,primaries:Ja,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ct]:{transfer:ct,primaries:Ja,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Gr]:{transfer:Xa,primaries:Za,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(ju),fromReference:i=>i.applyMatrix3(qu)},[mo]:{transfer:ct,primaries:Za,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(ju),fromReference:i=>i.applyMatrix3(qu).convertLinearToSRGB()}},N_=new Set([wt,Gr]),et={enabled:!0,_workingColorSpace:wt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!N_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=tr[e].toReference,s=tr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return tr[i].primaries},getTransfer:function(i){return i===Tn?Xa:tr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(tr[e].luminanceCoefficients)}};function Ds(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let is;class Q_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{is===void 0&&(is=Nr("canvas")),is.width=e.width,is.height=e.height;const n=is.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ds(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ds(t[n]/255)*255):t[n]=Ds(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let O_=0;class Bf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Uo(s[a].image)):r.push(Uo(s[a]))}else r=Uo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Uo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Q_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let k_=0;class Mt extends wi{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,n=Yn,s=Yn,r=Xt,a=Dn,o=Dt,c=Et,l=Mt.DEFAULT_ANISOTROPY,u=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Cn(),this.name="",this.source=new Bf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Af)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Os:e.x=e.x-Math.floor(e.x);break;case Yn:e.x=e.x<0?0:1;break;case Ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Os:e.y=e.y-Math.floor(e.y);break;case Yn:e.y=e.y<0?0:1;break;case Ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mt.DEFAULT_IMAGE=null;Mt.DEFAULT_MAPPING=Af;Mt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,s=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],m=c[2],p=c[6],A=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-m)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+m)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+A-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,I=(f+1)/2,P=(A+1)/2,M=(u+d)/4,B=(h+m)/4,F=(g+p)/4;return b>I&&b>P?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=M/n,r=B/n):I>P?I<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(I),n=M/s,r=F/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=B/r,s=F/r),this.set(n,s,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(h-m)*(h-m)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(h-m)/x,this.z=(d-u)/x,this.w=Math.acos((l+f+A-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class G_ extends wi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Mt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Bf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xi extends G_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Tf extends Mt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Rf extends Mt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ln{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],m=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=m;return}if(h!==m||c!==d||l!==f||u!==g){let p=1-o;const A=c*d+l*f+u*g+h*m,x=A>=0?1:-1,b=1-A*A;if(b>Number.EPSILON){const P=Math.sqrt(b),M=Math.atan2(P,A*x);p=Math.sin(p*M)/P,o=Math.sin(o*M)/P}const I=o*x;if(c=c*p+d*I,l=l*p+f*I,u=u*p+g*I,h=h*p+m*I,p===1-o){const P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*f-l*d,e[t+1]=c*g+u*d+l*h-o*f,e[t+2]=l*g+u*f+o*d-c*h,e[t+3]=u*g-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ku.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ku.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return No.copy(this).projectOnVector(e),this.sub(No)}reflect(e){return this.sub(No.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const No=new N,Ku=new ln;class si{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(r,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zr.copy(n.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),$r.subVectors(this.max,nr),ss.subVectors(e.a,nr),rs.subVectors(e.b,nr),as.subVectors(e.c,nr),ci.subVectors(rs,ss),li.subVectors(as,rs),Li.subVectors(ss,as);let t=[0,-ci.z,ci.y,0,-li.z,li.y,0,-Li.z,Li.y,ci.z,0,-ci.x,li.z,0,-li.x,Li.z,0,-Li.x,-ci.y,ci.x,0,-li.y,li.x,0,-Li.y,Li.x,0];return!Qo(t,ss,rs,as,$r)||(t=[1,0,0,0,1,0,0,0,1],!Qo(t,ss,rs,as,$r))?!1:(ea.crossVectors(ci,li),t=[ea.x,ea.y,ea.z],Qo(t,ss,rs,as,$r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new N,new N,new N,new N,new N,new N,new N,new N],mn=new N,Zr=new si,ss=new N,rs=new N,as=new N,ci=new N,li=new N,Li=new N,nr=new N,$r=new N,ea=new N,Pi=new N;function Qo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Pi.fromArray(i,r);const o=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),c=e.dot(Pi),l=t.dot(Pi),u=n.dot(Pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const H_=new si,ir=new N,Oo=new N;class Un{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):H_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ir.subVectors(e,this.center);const t=ir.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ir,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ir.copy(e.center).add(Oo)),this.expandByPoint(ir.copy(e.center).sub(Oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new N,ko=new N,ta=new N,ui=new N,Go=new N,na=new N,Ho=new N;class Hr{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ko.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(ko);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ta),o=ui.dot(this.direction),c=-ui.dot(ta),l=ui.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const m=1/u;h*=m,d*=m,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ko).addScaledVector(ta,d),f}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,s,r){Go.subVectors(t,e),na.subVectors(n,e),Ho.crossVectors(Go,na);let a=this.direction.dot(Ho),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ui.subVectors(this.origin,e);const c=o*this.direction.dot(na.crossVectors(ui,na));if(c<0)return null;const l=o*this.direction.dot(Go.cross(ui));if(l<0||c+l>a)return null;const u=-o*ui.dot(Ho);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class je{constructor(e,t,n,s,r,a,o,c,l,u,h,d,f,g,m,p){je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,d,f,g,m,p)}set(e,t,n,s,r,a,o,c,l,u,h,d,f,g,m,p){const A=this.elements;return A[0]=e,A[4]=t,A[8]=n,A[12]=s,A[1]=r,A[5]=a,A[9]=o,A[13]=c,A[2]=l,A[6]=u,A[10]=h,A[14]=d,A[3]=f,A[7]=g,A[11]=m,A[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new je().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,g=o*u,m=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=d-m*l,t[9]=-o*c,t[2]=m-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,f=c*h,g=l*u,m=l*h;t[0]=d+m*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=m+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,f=c*h,g=l*u,m=l*h;t[0]=d-m*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=m-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,f=a*h,g=o*u,m=o*h;t[0]=c*u,t[4]=g*l-f,t[8]=d*l+m,t[1]=c*h,t[5]=m*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,m=o*l;t[0]=c*u,t[4]=m-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+g,t[10]=d-m*h}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,m=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+m,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=m*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(z_,e,V_)}lookAt(e,t,n){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),hi.crossVectors(n,on),hi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),hi.crossVectors(n,on)),hi.normalize(),ia.crossVectors(on,hi),s[0]=hi.x,s[4]=ia.x,s[8]=on.x,s[1]=hi.y,s[5]=ia.y,s[9]=on.y,s[2]=hi.z,s[6]=ia.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],m=n[6],p=n[10],A=n[14],x=n[3],b=n[7],I=n[11],P=n[15],M=s[0],B=s[4],F=s[8],S=s[12],v=s[1],T=s[5],U=s[9],Q=s[13],q=s[2],ee=s[6],W=s[10],j=s[14],k=s[3],de=s[7],Ae=s[11],be=s[15];return r[0]=a*M+o*v+c*q+l*k,r[4]=a*B+o*T+c*ee+l*de,r[8]=a*F+o*U+c*W+l*Ae,r[12]=a*S+o*Q+c*j+l*be,r[1]=u*M+h*v+d*q+f*k,r[5]=u*B+h*T+d*ee+f*de,r[9]=u*F+h*U+d*W+f*Ae,r[13]=u*S+h*Q+d*j+f*be,r[2]=g*M+m*v+p*q+A*k,r[6]=g*B+m*T+p*ee+A*de,r[10]=g*F+m*U+p*W+A*Ae,r[14]=g*S+m*Q+p*j+A*be,r[3]=x*M+b*v+I*q+P*k,r[7]=x*B+b*T+I*ee+P*de,r[11]=x*F+b*U+I*W+P*Ae,r[15]=x*S+b*Q+I*j+P*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],m=e[7],p=e[11],A=e[15];return g*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+m*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+p*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+A*(-s*o*u-t*c*h+t*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],m=e[13],p=e[14],A=e[15],x=h*p*l-m*d*l+m*c*f-o*p*f-h*c*A+o*d*A,b=g*d*l-u*p*l-g*c*f+a*p*f+u*c*A-a*d*A,I=u*m*l-g*h*l+g*o*f-a*m*f-u*o*A+a*h*A,P=g*h*c-u*m*c-g*o*d+a*m*d+u*o*p-a*h*p,M=t*x+n*b+s*I+r*P;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/M;return e[0]=x*B,e[1]=(m*d*r-h*p*r-m*s*f+n*p*f+h*s*A-n*d*A)*B,e[2]=(o*p*r-m*c*r+m*s*l-n*p*l-o*s*A+n*c*A)*B,e[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*B,e[4]=b*B,e[5]=(u*p*r-g*d*r+g*s*f-t*p*f-u*s*A+t*d*A)*B,e[6]=(g*c*r-a*p*r-g*s*l+t*p*l+a*s*A-t*c*A)*B,e[7]=(a*d*r-u*c*r+u*s*l-t*d*l-a*s*f+t*c*f)*B,e[8]=I*B,e[9]=(g*h*r-u*m*r-g*n*f+t*m*f+u*n*A-t*h*A)*B,e[10]=(a*m*r-g*o*r+g*n*l-t*m*l-a*n*A+t*o*A)*B,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*B,e[12]=P*B,e[13]=(u*m*s-g*h*s+g*n*d-t*m*d-u*n*p+t*h*p)*B,e[14]=(g*o*s-a*m*s-g*n*c+t*m*c+a*n*p-t*o*p)*B,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*d+t*o*d)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,m=a*u,p=a*h,A=o*h,x=c*l,b=c*u,I=c*h,P=n.x,M=n.y,B=n.z;return s[0]=(1-(m+A))*P,s[1]=(f+I)*P,s[2]=(g-b)*P,s[3]=0,s[4]=(f-I)*M,s[5]=(1-(d+A))*M,s[6]=(p+x)*M,s[7]=0,s[8]=(g+b)*B,s[9]=(p-x)*B,s[10]=(1-(d+m))*B,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=os.set(s[0],s[1],s[2]).length();const a=os.set(s[4],s[5],s[6]).length(),o=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);const l=1/r,u=1/a,h=1/o;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=u,_n.elements[5]*=u,_n.elements[6]*=u,_n.elements[8]*=h,_n.elements[9]*=h,_n.elements[10]*=h,t.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Xn){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===Xn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===$a)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Xn){const c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(a-r),d=(t+e)*l,f=(n+s)*u;let g,m;if(o===Xn)g=(a+r)*h,m=-2*h;else if(o===$a)g=r*h,m=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=m,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const os=new N,_n=new je,z_=new N(0,0,0),V_=new N(1,1,1),hi=new N,ia=new N,on=new N,Yu=new je,Xu=new ln;class Fn{constructor(e=0,t=0,n=0,s=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xu.setFromEuler(this),this.setFromQuaternion(Xu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class Df{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let W_=0;const Ju=new N,cs=new ln,Hn=new je,sa=new N,sr=new N,q_=new N,j_=new ln,Zu=new N(1,0,0),$u=new N(0,1,0),eh=new N(0,0,1),th={type:"added"},K_={type:"removed"},ls={type:"childadded",child:null},zo={type:"childremoved",child:null};class ut extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new N,t=new Fn,n=new ln,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new je},normalMatrix:{value:new qe}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Df,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.multiply(cs),this}rotateOnWorldAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.premultiply(cs),this}rotateX(e){return this.rotateOnAxis(Zu,e)}rotateY(e){return this.rotateOnAxis($u,e)}rotateZ(e){return this.rotateOnAxis(eh,e)}translateOnAxis(e,t){return Ju.copy(e).applyQuaternion(this.quaternion),this.position.add(Ju.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zu,e)}translateY(e){return this.translateOnAxis($u,e)}translateZ(e){return this.translateOnAxis(eh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sa.copy(e):sa.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(sr,sa,this.up):Hn.lookAt(sa,sr,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),cs.setFromRotationMatrix(Hn),this.quaternion.premultiply(cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(th),ls.child=e,this.dispatchEvent(ls),ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(K_),zo.child=e,this.dispatchEvent(zo),zo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(th),ls.child=e,this.dispatchEvent(ls),ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,q_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,j_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ut.DEFAULT_UP=new N(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bn=new N,zn=new N,Vo=new N,Vn=new N,us=new N,hs=new N,nh=new N,Wo=new N,qo=new N,jo=new N;class Rn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),bn.subVectors(e,t),s.cross(bn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){bn.subVectors(s,t),zn.subVectors(n,t),Vo.subVectors(e,t);const a=bn.dot(bn),o=bn.dot(zn),c=bn.dot(Vo),l=zn.dot(zn),u=zn.dot(Vo),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Vn.x),c.addScaledVector(a,Vn.y),c.addScaledVector(o,Vn.z),c)}static isFrontFacing(e,t,n,s){return bn.subVectors(n,t),zn.subVectors(e,t),bn.cross(zn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),bn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;us.subVectors(s,n),hs.subVectors(r,n),Wo.subVectors(e,n);const c=us.dot(Wo),l=hs.dot(Wo);if(c<=0&&l<=0)return t.copy(n);qo.subVectors(e,s);const u=us.dot(qo),h=hs.dot(qo);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(us,a);jo.subVectors(e,r);const f=us.dot(jo),g=hs.dot(jo);if(g>=0&&f<=g)return t.copy(r);const m=f*l-c*g;if(m<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(hs,o);const p=u*g-f*h;if(p<=0&&h-u>=0&&f-g>=0)return nh.subVectors(r,s),o=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(nh,o);const A=1/(p+m+d);return a=m*A,o=d*A,t.copy(n).addScaledVector(us,a).addScaledVector(hs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Lf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},ra={h:0,s:0,l:0};function Ko(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Ql(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ko(a,r,e+1/3),this.g=Ko(a,r,e),this.b=Ko(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=Lf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}copyLinearToSRGB(e){return this.r=Fo(e.r),this.g=Fo(e.g),this.b=Fo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return et.fromWorkingColorSpace(Ht.copy(this),e),Math.round(Ut(Ht.r*255,0,255))*65536+Math.round(Ut(Ht.g*255,0,255))*256+Math.round(Ut(Ht.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Ht.copy(this),t);const n=Ht.r,s=Ht.g,r=Ht.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Ct){et.fromWorkingColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,s=Ht.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(di),this.setHSL(di.h+e,di.s+t,di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(di),e.getHSL(ra);const n=Sr(di.h,ra.h,t),s=Sr(di.s,ra.s,t),r=Sr(di.l,ra.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new He;He.NAMES=Lf;let Y_=0;class Pn extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=Bs,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lc,this.blendDst=Pc,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Lc&&(n.blendSrc=this.blendSrc),this.blendDst!==Pc&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ga&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class Jn extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=ff,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new N,aa=new Ne;class Ot{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=il,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Rs("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)aa.fromBufferAttribute(this,t),aa.applyMatrix3(e),this.setXY(t,aa.x,aa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==il&&(e.usage=this.usage),e}}class Pf extends Ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ff extends Ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ei extends Ot{constructor(e,t,n){super(new Float32Array(e),t,n)}}let X_=0;const hn=new je,Yo=new ut,ds=new N,cn=new si,rr=new si,Rt=new N;class yn extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wf(e)?Ff:Pf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Yo.lookAt(e),Yo.updateMatrix(),this.applyMatrix4(Yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ei(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(cn.min,rr.min),cn.expandByPoint(Rt),Rt.addVectors(cn.max,rr.max),cn.expandByPoint(Rt)):(cn.expandByPoint(rr.min),cn.expandByPoint(rr.max))}cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Rt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Rt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Rt.fromBufferAttribute(o,l),c&&(ds.fromBufferAttribute(e,l),Rt.add(ds)),s=Math.max(s,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ot(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let F=0;F<n.count;F++)o[F]=new N,c[F]=new N;const l=new N,u=new N,h=new N,d=new Ne,f=new Ne,g=new Ne,m=new N,p=new N;function A(F,S,v){l.fromBufferAttribute(n,F),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,v),d.fromBufferAttribute(r,F),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,v),u.sub(l),h.sub(l),f.sub(d),g.sub(d);const T=1/(f.x*g.y-g.x*f.y);isFinite(T)&&(m.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(T),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(T),o[F].add(m),o[S].add(m),o[v].add(m),c[F].add(p),c[S].add(p),c[v].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let F=0,S=x.length;F<S;++F){const v=x[F],T=v.start,U=v.count;for(let Q=T,q=T+U;Q<q;Q+=3)A(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const b=new N,I=new N,P=new N,M=new N;function B(F){P.fromBufferAttribute(s,F),M.copy(P);const S=o[F];b.copy(S),b.sub(P.multiplyScalar(P.dot(S))).normalize(),I.crossVectors(M,S);const T=I.dot(c[F])<0?-1:1;a.setXYZW(F,b.x,b.y,b.z,T)}for(let F=0,S=x.length;F<S;++F){const v=x[F],T=v.start,U=v.count;for(let Q=T,q=T+U;Q<q;Q+=3)B(e.getX(Q+0)),B(e.getX(Q+1)),B(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,u=new N,h=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),m=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,p),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),l.fromBufferAttribute(n,p),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let m=0,p=c.length;m<p;m++){o.isInterleavedBufferAttribute?f=c[m]*o.data.stride+o.offset:f=c[m]*u;for(let A=0;A<u;A++)d[g++]=l[f++]}return new Ot(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yn,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ih=new je,Fi=new Hr,oa=new Un,sh=new N,fs=new N,As=new N,ps=new N,Xo=new N,ca=new N,la=new Ne,ua=new Ne,ha=new Ne,rh=new N,ah=new N,oh=new N,da=new N,fa=new N;class St extends ut{constructor(e=new yn,t=new Jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ca.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Xo.fromBufferAttribute(h,e),a?ca.addScaledVector(Xo,u):ca.addScaledVector(Xo.sub(t),u))}t.add(ca)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(oa.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(oa,sh)===null||Fi.origin.distanceToSquared(sh)>(e.far-e.near)**2))&&(ih.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(ih),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){const p=d[g],A=a[p.materialIndex],x=Math.max(p.start,f.start),b=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let I=x,P=b;I<P;I+=3){const M=o.getX(I),B=o.getX(I+1),F=o.getX(I+2);s=Aa(this,A,e,n,l,u,h,M,B,F),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),m=Math.min(o.count,f.start+f.count);for(let p=g,A=m;p<A;p+=3){const x=o.getX(p),b=o.getX(p+1),I=o.getX(p+2);s=Aa(this,a,e,n,l,u,h,x,b,I),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,m=d.length;g<m;g++){const p=d[g],A=a[p.materialIndex],x=Math.max(p.start,f.start),b=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let I=x,P=b;I<P;I+=3){const M=I,B=I+1,F=I+2;s=Aa(this,A,e,n,l,u,h,M,B,F),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),m=Math.min(c.count,f.start+f.count);for(let p=g,A=m;p<A;p+=3){const x=p,b=p+1,I=p+2;s=Aa(this,a,e,n,l,u,h,x,b,I),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function J_(i,e,t,n,s,r,a,o){let c;if(e.side===$t?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ti,o),c===null)return null;fa.copy(o),fa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(fa);return l<t.near||l>t.far?null:{distance:l,point:fa.clone(),object:i}}function Aa(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,fs),i.getVertexPosition(c,As),i.getVertexPosition(l,ps);const u=J_(i,e,t,n,fs,As,ps,da);if(u){s&&(la.fromBufferAttribute(s,o),ua.fromBufferAttribute(s,c),ha.fromBufferAttribute(s,l),u.uv=Rn.getInterpolation(da,fs,As,ps,la,ua,ha,new Ne)),r&&(la.fromBufferAttribute(r,o),ua.fromBufferAttribute(r,c),ha.fromBufferAttribute(r,l),u.uv1=Rn.getInterpolation(da,fs,As,ps,la,ua,ha,new Ne)),a&&(rh.fromBufferAttribute(a,o),ah.fromBufferAttribute(a,c),oh.fromBufferAttribute(a,l),u.normal=Rn.getInterpolation(da,fs,As,ps,rh,ah,oh,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new N,materialIndex:0};Rn.getNormal(fs,As,ps,h.normal),u.face=h}return u}class Ks extends yn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ei(l,3)),this.setAttribute("normal",new ei(u,3)),this.setAttribute("uv",new ei(h,2));function g(m,p,A,x,b,I,P,M,B,F,S){const v=I/B,T=P/F,U=I/2,Q=P/2,q=M/2,ee=B+1,W=F+1;let j=0,k=0;const de=new N;for(let Ae=0;Ae<W;Ae++){const be=Ae*T-Q;for(let Te=0;Te<ee;Te++){const Oe=Te*v-U;de[m]=Oe*x,de[p]=be*b,de[A]=q,l.push(de.x,de.y,de.z),de[m]=0,de[p]=0,de[A]=M>0?1:-1,u.push(de.x,de.y,de.z),h.push(Te/B),h.push(1-Ae/F),j+=1}}for(let Ae=0;Ae<F;Ae++)for(let be=0;be<B;be++){const Te=d+be+ee*Ae,Oe=d+be+ee*(Ae+1),ne=d+(be+1)+ee*(Ae+1),ce=d+(be+1)+ee*Ae;c.push(Te,Oe,ce),c.push(Oe,ne,ce),k+=6}o.addGroup(f,k,S),f+=k,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Kt(i){const e={};for(let t=0;t<i.length;t++){const n=zs(i[t]);for(const s in n)e[s]=n[s]}return e}function Z_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Uf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const $_={clone:zs,merge:Kt};var eb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eb,this.fragmentShader=tb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=Z_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ol extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=Xn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fi=new N,ch=new Ne,lh=new Ne;class Nt extends Ol{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,ch,lh),t.subVectors(lh,ch)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(yr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const gs=-90,ms=1;class nb extends ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Nt(gs,ms,e,t);s.layers=this.layers,this.add(s);const r=new Nt(gs,ms,e,t);r.layers=this.layers,this.add(r);const a=new Nt(gs,ms,e,t);a.layers=this.layers,this.add(a);const o=new Nt(gs,ms,e,t);o.layers=this.layers,this.add(o);const c=new Nt(gs,ms,e,t);c.layers=this.layers,this.add(c);const l=new Nt(gs,ms,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===$a)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nf extends Mt{constructor(e,t,n,s,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Ki,super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ib extends Xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Nf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Xt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ks(5,5,5),r=new ni({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:Ii});r.uniforms.tEquirect.value=t;const a=new St(s,r),o=t.minFilter;return t.minFilter===Dn&&(t.minFilter=Xt),new nb(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Jo=new N,sb=new N,rb=new qe;class _i{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Jo.subVectors(n,t).cross(sb.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Jo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||rb.getNormalMatrix(e),s=this.coplanarPoint(Jo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new Un,pa=new N;class kl{constructor(e=new _i,t=new _i,n=new _i,s=new _i,r=new _i,a=new _i){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],m=s[10],p=s[11],A=s[12],x=s[13],b=s[14],I=s[15];if(n[0].setComponents(c-r,d-l,p-f,I-A).normalize(),n[1].setComponents(c+r,d+l,p+f,I+A).normalize(),n[2].setComponents(c+a,d+u,p+g,I+x).normalize(),n[3].setComponents(c-a,d-u,p-g,I-x).normalize(),n[4].setComponents(c-o,d-h,p-m,I-b).normalize(),t===Xn)n[5].setComponents(c+o,d+h,p+m,I+b).normalize();else if(t===$a)n[5].setComponents(o,h,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){return Ui.center.set(0,0,0),Ui.radius=.7071067811865476,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(pa.x=s.normal.x>0?e.max.x:e.min.x,pa.y=s.normal.y>0?e.max.y:e.min.y,pa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ab(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c._updateRange,d=c.updateRanges;if(i.bindBuffer(l,o),h.count===-1&&d.length===0&&i.bufferSubData(l,0,u),d.length!==0){for(let f=0,g=d.length;f<g;f++){const m=d[f];i.bufferSubData(l,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count)}c.clearUpdateRanges()}h.count!==-1&&(i.bufferSubData(l,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Ys extends yn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,d=t/c,f=[],g=[],m=[],p=[];for(let A=0;A<u;A++){const x=A*d-a;for(let b=0;b<l;b++){const I=b*h-r;g.push(I,-x,0),m.push(0,0,1),p.push(b/o),p.push(1-A/c)}}for(let A=0;A<c;A++)for(let x=0;x<o;x++){const b=x+l*A,I=x+l*(A+1),P=x+1+l*(A+1),M=x+1+l*A;f.push(b,I,M),f.push(I,P,M)}this.setIndex(f),this.setAttribute("position",new ei(g,3)),this.setAttribute("normal",new ei(m,3)),this.setAttribute("uv",new ei(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.width,e.height,e.widthSegments,e.heightSegments)}}var ob=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ub=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,db=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ab=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_b=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Eb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ib=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Tb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Db=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ub=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qb=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ob=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$b=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,eE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,iE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,aE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,oE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,AE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_E=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,EE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,IE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,CE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,SE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ME=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,BE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,RE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,PE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,FE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,UE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,NE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,QE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,HE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,zE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,VE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,WE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,KE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,XE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,JE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ZE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$E=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,e0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,t0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,r0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const a0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,o0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,f0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,A0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,p0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,m0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,y0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,M0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,w0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Q0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,O0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:ob,alphahash_pars_fragment:cb,alphamap_fragment:lb,alphamap_pars_fragment:ub,alphatest_fragment:hb,alphatest_pars_fragment:db,aomap_fragment:fb,aomap_pars_fragment:Ab,batching_pars_vertex:pb,batching_vertex:gb,begin_vertex:mb,beginnormal_vertex:_b,bsdfs:bb,iridescence_fragment:Eb,bumpmap_pars_fragment:xb,clipping_planes_fragment:vb,clipping_planes_pars_fragment:Ib,clipping_planes_pars_vertex:Cb,clipping_planes_vertex:yb,color_fragment:Sb,color_pars_fragment:Mb,color_pars_vertex:wb,color_vertex:Bb,common:Tb,cube_uv_reflection_fragment:Rb,defaultnormal_vertex:Db,displacementmap_pars_vertex:Lb,displacementmap_vertex:Pb,emissivemap_fragment:Fb,emissivemap_pars_fragment:Ub,colorspace_fragment:Nb,colorspace_pars_fragment:Qb,envmap_fragment:Ob,envmap_common_pars_fragment:kb,envmap_pars_fragment:Gb,envmap_pars_vertex:Hb,envmap_physical_pars_fragment:$b,envmap_vertex:zb,fog_vertex:Vb,fog_pars_vertex:Wb,fog_fragment:qb,fog_pars_fragment:jb,gradientmap_pars_fragment:Kb,lightmap_pars_fragment:Yb,lights_lambert_fragment:Xb,lights_lambert_pars_fragment:Jb,lights_pars_begin:Zb,lights_toon_fragment:eE,lights_toon_pars_fragment:tE,lights_phong_fragment:nE,lights_phong_pars_fragment:iE,lights_physical_fragment:sE,lights_physical_pars_fragment:rE,lights_fragment_begin:aE,lights_fragment_maps:oE,lights_fragment_end:cE,logdepthbuf_fragment:lE,logdepthbuf_pars_fragment:uE,logdepthbuf_pars_vertex:hE,logdepthbuf_vertex:dE,map_fragment:fE,map_pars_fragment:AE,map_particle_fragment:pE,map_particle_pars_fragment:gE,metalnessmap_fragment:mE,metalnessmap_pars_fragment:_E,morphinstance_vertex:bE,morphcolor_vertex:EE,morphnormal_vertex:xE,morphtarget_pars_vertex:vE,morphtarget_vertex:IE,normal_fragment_begin:CE,normal_fragment_maps:yE,normal_pars_fragment:SE,normal_pars_vertex:ME,normal_vertex:wE,normalmap_pars_fragment:BE,clearcoat_normal_fragment_begin:TE,clearcoat_normal_fragment_maps:RE,clearcoat_pars_fragment:DE,iridescence_pars_fragment:LE,opaque_fragment:PE,packing:FE,premultiplied_alpha_fragment:UE,project_vertex:NE,dithering_fragment:QE,dithering_pars_fragment:OE,roughnessmap_fragment:kE,roughnessmap_pars_fragment:GE,shadowmap_pars_fragment:HE,shadowmap_pars_vertex:zE,shadowmap_vertex:VE,shadowmask_pars_fragment:WE,skinbase_vertex:qE,skinning_pars_vertex:jE,skinning_vertex:KE,skinnormal_vertex:YE,specularmap_fragment:XE,specularmap_pars_fragment:JE,tonemapping_fragment:ZE,tonemapping_pars_fragment:$E,transmission_fragment:e0,transmission_pars_fragment:t0,uv_pars_fragment:n0,uv_pars_vertex:i0,uv_vertex:s0,worldpos_vertex:r0,background_vert:a0,background_frag:o0,backgroundCube_vert:c0,backgroundCube_frag:l0,cube_vert:u0,cube_frag:h0,depth_vert:d0,depth_frag:f0,distanceRGBA_vert:A0,distanceRGBA_frag:p0,equirect_vert:g0,equirect_frag:m0,linedashed_vert:_0,linedashed_frag:b0,meshbasic_vert:E0,meshbasic_frag:x0,meshlambert_vert:v0,meshlambert_frag:I0,meshmatcap_vert:C0,meshmatcap_frag:y0,meshnormal_vert:S0,meshnormal_frag:M0,meshphong_vert:w0,meshphong_frag:B0,meshphysical_vert:T0,meshphysical_frag:R0,meshtoon_vert:D0,meshtoon_frag:L0,points_vert:P0,points_frag:F0,shadow_vert:U0,shadow_frag:N0,sprite_vert:Q0,sprite_frag:O0},Ee={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},wn={basic:{uniforms:Kt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Kt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new He(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Kt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Kt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Kt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new He(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Kt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Kt([Ee.points,Ee.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Kt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Kt([Ee.common,Ee.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Kt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Kt([Ee.sprite,Ee.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Kt([Ee.common,Ee.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Kt([Ee.lights,Ee.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};wn.physical={uniforms:Kt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ga={r:0,b:0,g:0},Ni=new Fn,k0=new je;function G0(i,e,t,n,s,r,a){const o=new He(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(x){let b=x.isScene===!0?x.background:null;return b&&b.isTexture&&(b=(x.backgroundBlurriness>0?t:e).get(b)),b}function m(x){let b=!1;const I=g(x);I===null?A(o,c):I&&I.isColor&&(A(I,1),b=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(x,b){const I=g(b);I&&(I.isCubeTexture||I.mapping===go)?(u===void 0&&(u=new St(new Ks(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:zs(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,M,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ni.copy(b.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(k0.makeRotationFromEuler(Ni)),u.material.toneMapped=et.getTransfer(I.colorSpace)!==ct,(h!==I||d!==I.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=I,d=I.version,f=i.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(l===void 0&&(l=new St(new Ys(2,2),new ni({name:"BackgroundMaterial",uniforms:zs(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=I,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=et.getTransfer(I.colorSpace)!==ct,I.matrixAutoUpdate===!0&&I.updateMatrix(),l.material.uniforms.uvTransform.value.copy(I.matrix),(h!==I||d!==I.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=I,d=I.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function A(x,b){x.getRGB(ga,Uf(i)),n.buffers.color.setClear(ga.r,ga.g,ga.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(x,b=1){o.set(x),c=b,A(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,A(o,c)},render:m,addToRenderList:p}}function H0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(v,T,U,Q,q){let ee=!1;const W=h(Q,U,T);r!==W&&(r=W,l(r.object)),ee=f(v,Q,U,q),ee&&g(v,Q,U,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,I(v,T,U,Q),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function u(v){return i.deleteVertexArray(v)}function h(v,T,U){const Q=U.wireframe===!0;let q=n[v.id];q===void 0&&(q={},n[v.id]=q);let ee=q[T.id];ee===void 0&&(ee={},q[T.id]=ee);let W=ee[Q];return W===void 0&&(W=d(c()),ee[Q]=W),W}function d(v){const T=[],U=[],Q=[];for(let q=0;q<t;q++)T[q]=0,U[q]=0,Q[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:U,attributeDivisors:Q,object:v,attributes:{},index:null}}function f(v,T,U,Q){const q=r.attributes,ee=T.attributes;let W=0;const j=U.getAttributes();for(const k in j)if(j[k].location>=0){const Ae=q[k];let be=ee[k];if(be===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(be=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(be=v.instanceColor)),Ae===void 0||Ae.attribute!==be||be&&Ae.data!==be.data)return!0;W++}return r.attributesNum!==W||r.index!==Q}function g(v,T,U,Q){const q={},ee=T.attributes;let W=0;const j=U.getAttributes();for(const k in j)if(j[k].location>=0){let Ae=ee[k];Ae===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(Ae=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(Ae=v.instanceColor));const be={};be.attribute=Ae,Ae&&Ae.data&&(be.data=Ae.data),q[k]=be,W++}r.attributes=q,r.attributesNum=W,r.index=Q}function m(){const v=r.newAttributes;for(let T=0,U=v.length;T<U;T++)v[T]=0}function p(v){A(v,0)}function A(v,T){const U=r.newAttributes,Q=r.enabledAttributes,q=r.attributeDivisors;U[v]=1,Q[v]===0&&(i.enableVertexAttribArray(v),Q[v]=1),q[v]!==T&&(i.vertexAttribDivisor(v,T),q[v]=T)}function x(){const v=r.newAttributes,T=r.enabledAttributes;for(let U=0,Q=T.length;U<Q;U++)T[U]!==v[U]&&(i.disableVertexAttribArray(U),T[U]=0)}function b(v,T,U,Q,q,ee,W){W===!0?i.vertexAttribIPointer(v,T,U,q,ee):i.vertexAttribPointer(v,T,U,Q,q,ee)}function I(v,T,U,Q){m();const q=Q.attributes,ee=U.getAttributes(),W=T.defaultAttributeValues;for(const j in ee){const k=ee[j];if(k.location>=0){let de=q[j];if(de===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(de=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(de=v.instanceColor)),de!==void 0){const Ae=de.normalized,be=de.itemSize,Te=e.get(de);if(Te===void 0)continue;const Oe=Te.buffer,ne=Te.type,ce=Te.bytesPerElement,ge=ne===i.INT||ne===i.UNSIGNED_INT||de.gpuType===Rl;if(de.isInterleavedBufferAttribute){const fe=de.data,Ce=fe.stride,we=de.offset;if(fe.isInstancedInterleavedBuffer){for(let Le=0;Le<k.locationSize;Le++)A(k.location+Le,fe.meshPerAttribute);v.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Le=0;Le<k.locationSize;Le++)p(k.location+Le);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let Le=0;Le<k.locationSize;Le++)b(k.location+Le,be/k.locationSize,ne,Ae,Ce*ce,(we+be/k.locationSize*Le)*ce,ge)}else{if(de.isInstancedBufferAttribute){for(let fe=0;fe<k.locationSize;fe++)A(k.location+fe,de.meshPerAttribute);v.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let fe=0;fe<k.locationSize;fe++)p(k.location+fe);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let fe=0;fe<k.locationSize;fe++)b(k.location+fe,be/k.locationSize,ne,Ae,be*ce,be/k.locationSize*fe*ce,ge)}}else if(W!==void 0){const Ae=W[j];if(Ae!==void 0)switch(Ae.length){case 2:i.vertexAttrib2fv(k.location,Ae);break;case 3:i.vertexAttrib3fv(k.location,Ae);break;case 4:i.vertexAttrib4fv(k.location,Ae);break;default:i.vertexAttrib1fv(k.location,Ae)}}}}x()}function P(){F();for(const v in n){const T=n[v];for(const U in T){const Q=T[U];for(const q in Q)u(Q[q].object),delete Q[q];delete T[U]}delete n[v]}}function M(v){if(n[v.id]===void 0)return;const T=n[v.id];for(const U in T){const Q=T[U];for(const q in Q)u(Q[q].object),delete Q[q];delete T[U]}delete n[v.id]}function B(v){for(const T in n){const U=n[T];if(U[v.id]===void 0)continue;const Q=U[v.id];for(const q in Q)u(Q[q].object),delete Q[q];delete U[v.id]}}function F(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:F,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:M,releaseStatesOfProgram:B,initAttributes:m,enableAttribute:p,disableUnusedAttributes:x}}function z0(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let m=0;m<h;m++)g+=u[m];for(let m=0;m<d.length;m++)t.update(g,n,d[m])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function V0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(M){return!(M!==Dt&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(M){const B=M===$n&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(M!==Et&&n.convert(M)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==Zt&&!B)}function c(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=f>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:A,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:I,maxSamples:P}}function W0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new _i,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,m=h.clipIntersection,p=h.clipShadows,A=i.get(h);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{const x=r?0:n,b=x*4;let I=A.clippingState||null;c.value=I,I=u(g,d,b,f);for(let P=0;P!==b;++P)I[P]=t[P];A.clippingState=I,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const m=h!==null?h.length:0;let p=null;if(m!==0){if(p=c.value,g!==!0||p===null){const A=f+m*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<A)&&(p=new Float32Array(A));for(let b=0,I=f;b!==m;++b,I+=4)a.copy(h[b]).applyMatrix4(x,o),a.normal.toArray(p,I),p[I+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,p}}function q0(i){let e=new WeakMap;function t(a,o){return o===Fc?a.mapping=Ki:o===Uc&&(a.mapping=Qs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fc||o===Uc)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new ib(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Gl extends Ol{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Cs=4,uh=[.125,.215,.35,.446,.526,.582],zi=20,Zo=new Gl,hh=new He;let $o=null,ec=0,tc=0,nc=!1;const ki=(1+Math.sqrt(5))/2,_s=1/ki,dh=[new N(-ki,_s,0),new N(ki,_s,0),new N(-_s,0,ki),new N(_s,0,ki),new N(0,ki,-_s),new N(0,ki,_s),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class fh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){$o=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($o,ec,tc),this._renderer.xr.enabled=nc,e.scissorTest=!1,ma(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ki||e.mapping===Qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$o=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:$n,format:Dt,colorSpace:wt,depthBuffer:!1},s=Ah(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=j0(r)),this._blurMaterial=K0(r,e,t)}return s}_compileMaterial(e){const t=new St(this._lodPlanes[0],e);this._renderer.compile(t,Zo)}_sceneToCubeUV(e,t,n,s){const o=new Nt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(hh),u.toneMapping=Ci,u.autoClear=!1;const f=new Jn({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),g=new St(new Ks,f);let m=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,m=!0):(f.color.copy(hh),m=!0);for(let A=0;A<6;A++){const x=A%3;x===0?(o.up.set(0,c[A],0),o.lookAt(l[A],0,0)):x===1?(o.up.set(0,0,c[A]),o.lookAt(0,l[A],0)):(o.up.set(0,c[A],0),o.lookAt(0,0,l[A]));const b=this._cubeSize;ma(s,x*b,A>2?b:0,b,b),u.setRenderTarget(s),m&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ki||e.mapping===Qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new St(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ma(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Zo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=dh[(s-r-1)%dh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new St(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*zi-1),m=r/g,p=isFinite(r)?1+Math.floor(u*m):zi;p>zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zi}`);const A=[];let x=0;for(let B=0;B<zi;++B){const F=B/m,S=Math.exp(-F*F/2);A.push(S),B===0?x+=S:B<p&&(x+=2*S)}for(let B=0;B<A.length;B++)A[B]=A[B]/x;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=A,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const I=this._sizeLods[s],P=3*I*(s>b-Cs?s-b+Cs:0),M=4*(this._cubeSize-I);ma(t,P,M,3*I,2*I),c.setRenderTarget(t),c.render(h,Zo)}}function j0(i){const e=[],t=[],n=[];let s=i;const r=i-Cs+1+uh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Cs?c=uh[a-i+Cs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,m=3,p=2,A=1,x=new Float32Array(m*g*f),b=new Float32Array(p*g*f),I=new Float32Array(A*g*f);for(let M=0;M<f;M++){const B=M%3*2/3-1,F=M>2?0:-1,S=[B,F,0,B+2/3,F,0,B+2/3,F+1,0,B,F,0,B+2/3,F+1,0,B,F+1,0];x.set(S,m*g*M),b.set(d,p*g*M);const v=[M,M,M,M,M,M];I.set(v,A*g*M)}const P=new yn;P.setAttribute("position",new Ot(x,m)),P.setAttribute("uv",new Ot(b,p)),P.setAttribute("faceIndex",new Ot(I,A)),e.push(P),s>Cs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ah(i,e,t){const n=new Xi(i,e,t);return n.texture.mapping=go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ma(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function K0(i,e,t){const n=new Float32Array(zi),s=new N(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function ph(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function gh(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Hl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Y0(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Fc||c===Uc,u=c===Ki||c===Qs;if(l||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new fh(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new fh(i)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function X0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Rs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function J0(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const m=d.morphAttributes[g];for(let p=0,A=m.length;p<A;p++)e.remove(m[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const m=f[g];for(let p=0,A=m.length;p<A;p++)e.update(m[p],i.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let m=0;if(f!==null){const x=f.array;m=f.version;for(let b=0,I=x.length;b<I;b+=3){const P=x[b+0],M=x[b+1],B=x[b+2];d.push(P,M,M,B,B,P)}}else if(g!==void 0){const x=g.array;m=g.version;for(let b=0,I=x.length/3-1;b<I;b+=3){const P=b+0,M=b+1,B=b+2;d.push(P,M,M,B,B,P)}}else return;const p=new(wf(d)?Ff:Pf)(d,1);p.version=m;const A=r.get(h);A&&e.remove(A),r.set(h,p)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Z0(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let A=0;A<g;A++)p+=f[A];t.update(p,n,1)}function h(d,f,g,m){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let A=0;A<d.length;A++)l(d[A]/a,f[A],m[A]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,m,0,g);let A=0;for(let x=0;x<g;x++)A+=f[x];for(let x=0;x<m.length;x++)t.update(A,n,m[x])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function $0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ex(i,e,t){const n=new WeakMap,s=new ot;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let v=function(){F.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var f=v;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,A=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let I=0;g===!0&&(I=1),m===!0&&(I=2),p===!0&&(I=3);let P=o.attributes.position.count*I,M=1;P>e.maxTextureSize&&(M=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const B=new Float32Array(P*M*4*h),F=new Tf(B,P,M,h);F.type=Zt,F.needsUpdate=!0;const S=I*4;for(let T=0;T<h;T++){const U=A[T],Q=x[T],q=b[T],ee=P*M*4*T;for(let W=0;W<U.count;W++){const j=W*S;g===!0&&(s.fromBufferAttribute(U,W),B[ee+j+0]=s.x,B[ee+j+1]=s.y,B[ee+j+2]=s.z,B[ee+j+3]=0),m===!0&&(s.fromBufferAttribute(Q,W),B[ee+j+4]=s.x,B[ee+j+5]=s.y,B[ee+j+6]=s.z,B[ee+j+7]=0),p===!0&&(s.fromBufferAttribute(q,W),B[ee+j+8]=s.x,B[ee+j+9]=s.y,B[ee+j+10]=s.z,B[ee+j+11]=q.itemSize===4?s.w:1)}}d={count:h,texture:F,size:new Ne(P,M)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const m=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function tx(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Of extends Mt{constructor(e,t,n,s,r,a,o,c,l,u=Ts){if(u!==Ts&&u!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ts&&(n=Yi),n===void 0&&u===Gs&&(n=ks),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Jt,this.minFilter=c!==void 0?c:Jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const kf=new Mt,mh=new Of(1,1),Gf=new Tf,Hf=new Rf,zf=new Nf,_h=[],bh=[],Eh=new Float32Array(16),xh=new Float32Array(9),vh=new Float32Array(4);function Xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=_h[s];if(r===void 0&&(r=new Float32Array(s),_h[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function _o(i,e){let t=bh[e];t===void 0&&(t=new Int32Array(e),bh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function nx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ix(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function ax(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Bt(t,n))return;vh.set(n),i.uniformMatrix2fv(this.addr,!1,vh),Tt(t,n)}}function ox(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Bt(t,n))return;xh.set(n),i.uniformMatrix3fv(this.addr,!1,xh),Tt(t,n)}}function cx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Bt(t,n))return;Eh.set(n),i.uniformMatrix4fv(this.addr,!1,Eh),Tt(t,n)}}function lx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function fx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function px(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function mx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mh.compareFunction=Sf,r=mh):r=kf,t.setTexture2D(e||r,s)}function _x(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Hf,s)}function bx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zf,s)}function Ex(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Gf,s)}function xx(i){switch(i){case 5126:return nx;case 35664:return ix;case 35665:return sx;case 35666:return rx;case 35674:return ax;case 35675:return ox;case 35676:return cx;case 5124:case 35670:return lx;case 35667:case 35671:return ux;case 35668:case 35672:return hx;case 35669:case 35673:return dx;case 5125:return fx;case 36294:return Ax;case 36295:return px;case 36296:return gx;case 35678:case 36198:case 36298:case 36306:case 35682:return mx;case 35679:case 36299:case 36307:return _x;case 35680:case 36300:case 36308:case 36293:return bx;case 36289:case 36303:case 36311:case 36292:return Ex}}function vx(i,e){i.uniform1fv(this.addr,e)}function Ix(i,e){const t=Xs(e,this.size,2);i.uniform2fv(this.addr,t)}function Cx(i,e){const t=Xs(e,this.size,3);i.uniform3fv(this.addr,t)}function yx(i,e){const t=Xs(e,this.size,4);i.uniform4fv(this.addr,t)}function Sx(i,e){const t=Xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Mx(i,e){const t=Xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function wx(i,e){const t=Xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Bx(i,e){i.uniform1iv(this.addr,e)}function Tx(i,e){i.uniform2iv(this.addr,e)}function Rx(i,e){i.uniform3iv(this.addr,e)}function Dx(i,e){i.uniform4iv(this.addr,e)}function Lx(i,e){i.uniform1uiv(this.addr,e)}function Px(i,e){i.uniform2uiv(this.addr,e)}function Fx(i,e){i.uniform3uiv(this.addr,e)}function Ux(i,e){i.uniform4uiv(this.addr,e)}function Nx(i,e,t){const n=this.cache,s=e.length,r=_o(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||kf,r[a])}function Qx(i,e,t){const n=this.cache,s=e.length,r=_o(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Hf,r[a])}function Ox(i,e,t){const n=this.cache,s=e.length,r=_o(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zf,r[a])}function kx(i,e,t){const n=this.cache,s=e.length,r=_o(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Gf,r[a])}function Gx(i){switch(i){case 5126:return vx;case 35664:return Ix;case 35665:return Cx;case 35666:return yx;case 35674:return Sx;case 35675:return Mx;case 35676:return wx;case 5124:case 35670:return Bx;case 35667:case 35671:return Tx;case 35668:case 35672:return Rx;case 35669:case 35673:return Dx;case 5125:return Lx;case 36294:return Px;case 36295:return Fx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Nx;case 35679:case 36299:case 36307:return Qx;case 35680:case 36300:case 36308:case 36293:return Ox;case 36289:case 36303:case 36311:case 36292:return kx}}class Hx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xx(t.type)}}class zx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gx(t.type)}}class Vx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ic=/(\w+)(\])?(\[|\.)?/g;function Ih(i,e){i.seq.push(e),i.map[e.id]=e}function Wx(i,e,t){const n=i.name,s=n.length;for(ic.lastIndex=0;;){const r=ic.exec(n),a=ic.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ih(t,l===void 0?new Hx(o,i,e):new zx(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Vx(o),Ih(t,h)),t=h}}}class Fa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Wx(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ch(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const qx=37297;let jx=0;function Kx(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Yx(i){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(i);let n;switch(e===t?n="":e===Za&&t===Ja?n="LinearDisplayP3ToLinearSRGB":e===Ja&&t===Za&&(n="LinearSRGBToLinearDisplayP3"),i){case wt:case Gr:return[n,"LinearTransferOETF"];case Ct:case mo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function yh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Kx(i.getShaderSource(e),a)}else return s}function Xx(i,e){const t=Yx(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Jx(i,e){let t;switch(e){case Xm:t="Linear";break;case Jm:t="Reinhard";break;case Zm:t="OptimizedCineon";break;case $m:t="ACESFilmic";break;case t_:t="AgX";break;case n_:t="Neutral";break;case e_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _a=new N;function Zx(){et.getLuminanceCoefficients(_a);const i=_a.x.toFixed(4),e=_a.y.toFixed(4),t=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $x(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function ev(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ar(i){return i!==""}function Sh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function sl(i){return i.replace(nv,sv)}const iv=new Map;function sv(i,e){let t=We[e];if(t===void 0){const n=iv.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return sl(t)}const rv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(i){return i.replace(rv,av)}function av(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ov(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===df?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===vm?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===qn&&(e="SHADOWMAP_TYPE_VSM"),e}function cv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ki:case Qs:e="ENVMAP_TYPE_CUBE";break;case go:e="ENVMAP_TYPE_CUBE_UV";break}return e}function lv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Qs:e="ENVMAP_MODE_REFRACTION";break}return e}function uv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ff:e="ENVMAP_BLENDING_MULTIPLY";break;case Km:e="ENVMAP_BLENDING_MIX";break;case Ym:e="ENVMAP_BLENDING_ADD";break}return e}function hv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function dv(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ov(t),l=cv(t),u=lv(t),h=uv(t),d=hv(t),f=$x(t),g=ev(r),m=s.createProgram();let p,A,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ar).join(`
`),p.length>0&&(p+=`
`),A=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ar).join(`
`),A.length>0&&(A+=`
`)):(p=[Bh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),A=[Bh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?We.tonemapping_pars_fragment:"",t.toneMapping!==Ci?Jx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Xx("linearToOutputTexel",t.outputColorSpace),Zx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ar).join(`
`)),a=sl(a),a=Sh(a,t),a=Mh(a,t),o=sl(o),o=Sh(o,t),o=Mh(o,t),a=wh(a),o=wh(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,A=["#define varying in",t.glslVersion===zu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+A);const b=x+p+a,I=x+A+o,P=Ch(s,s.VERTEX_SHADER,b),M=Ch(s,s.FRAGMENT_SHADER,I);s.attachShader(m,P),s.attachShader(m,M),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function B(T){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(m).trim(),Q=s.getShaderInfoLog(P).trim(),q=s.getShaderInfoLog(M).trim();let ee=!0,W=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(ee=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,P,M);else{const j=yh(s,P,"vertex"),k=yh(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+U+`
`+j+`
`+k)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(Q===""||q==="")&&(W=!1);W&&(T.diagnostics={runnable:ee,programLog:U,vertexShader:{log:Q,prefix:p},fragmentShader:{log:q,prefix:A}})}s.deleteShader(P),s.deleteShader(M),F=new Fa(s,m),S=tv(s,m)}let F;this.getUniforms=function(){return F===void 0&&B(this),F};let S;this.getAttributes=function(){return S===void 0&&B(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(m,qx)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=P,this.fragmentShader=M,this}let fv=0;class Av{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new pv(e),t.set(e,n)),n}}class pv{constructor(e){this.id=fv++,this.code=e,this.usedTimes=0}}function gv(i,e,t,n,s,r,a){const o=new Df,c=new Av,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,v,T,U,Q){const q=U.fog,ee=Q.geometry,W=S.isMeshStandardMaterial?U.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),k=j&&j.mapping===go?j.image.height:null,de=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const Ae=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,be=Ae!==void 0?Ae.length:0;let Te=0;ee.morphAttributes.position!==void 0&&(Te=1),ee.morphAttributes.normal!==void 0&&(Te=2),ee.morphAttributes.color!==void 0&&(Te=3);let Oe,ne,ce,ge;if(de){const Ze=wn[de];Oe=Ze.vertexShader,ne=Ze.fragmentShader}else Oe=S.vertexShader,ne=S.fragmentShader,c.update(S),ce=c.getVertexShaderID(S),ge=c.getFragmentShaderID(S);const fe=i.getRenderTarget(),Ce=Q.isInstancedMesh===!0,we=Q.isBatchedMesh===!0,Le=!!S.map,Ye=!!S.matcap,L=!!j,w=!!S.aoMap,R=!!S.lightMap,G=!!S.bumpMap,H=!!S.normalMap,se=!!S.displacementMap,ie=!!S.emissiveMap,re=!!S.metalnessMap,C=!!S.roughnessMap,_=S.anisotropy>0,D=S.clearcoat>0,V=S.dispersion>0,J=S.iridescence>0,K=S.sheen>0,le=S.transmission>0,ae=_&&!!S.anisotropyMap,ue=D&&!!S.clearcoatMap,Ie=D&&!!S.clearcoatNormalMap,oe=D&&!!S.clearcoatRoughnessMap,_e=J&&!!S.iridescenceMap,ze=J&&!!S.iridescenceThicknessMap,Pe=K&&!!S.sheenColorMap,xe=K&&!!S.sheenRoughnessMap,Ue=!!S.specularMap,Me=!!S.specularColorMap,Je=!!S.specularIntensityMap,E=le&&!!S.transmissionMap,Y=le&&!!S.thicknessMap,X=!!S.gradientMap,te=!!S.alphaMap,he=S.alphaTest>0,Re=!!S.alphaHash,ke=!!S.extensions;let At=Ci;S.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(At=i.toneMapping);const vt={shaderID:de,shaderType:S.type,shaderName:S.name,vertexShader:Oe,fragmentShader:ne,defines:S.defines,customVertexShaderID:ce,customFragmentShaderID:ge,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:we,batchingColor:we&&Q._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&Q.instanceColor!==null,instancingMorph:Ce&&Q.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:wt,alphaToCoverage:!!S.alphaToCoverage,map:Le,matcap:Ye,envMap:L,envMapMode:L&&j.mapping,envMapCubeUVHeight:k,aoMap:w,lightMap:R,bumpMap:G,normalMap:H,displacementMap:d&&se,emissiveMap:ie,normalMapObjectSpace:H&&S.normalMapType===h_,normalMapTangentSpace:H&&S.normalMapType===yf,metalnessMap:re,roughnessMap:C,anisotropy:_,anisotropyMap:ae,clearcoat:D,clearcoatMap:ue,clearcoatNormalMap:Ie,clearcoatRoughnessMap:oe,dispersion:V,iridescence:J,iridescenceMap:_e,iridescenceThicknessMap:ze,sheen:K,sheenColorMap:Pe,sheenRoughnessMap:xe,specularMap:Ue,specularColorMap:Me,specularIntensityMap:Je,transmission:le,transmissionMap:E,thicknessMap:Y,gradientMap:X,opaque:S.transparent===!1&&S.blending===Bs&&S.alphaToCoverage===!1,alphaMap:te,alphaTest:he,alphaHash:Re,combine:S.combine,mapUv:Le&&m(S.map.channel),aoMapUv:w&&m(S.aoMap.channel),lightMapUv:R&&m(S.lightMap.channel),bumpMapUv:G&&m(S.bumpMap.channel),normalMapUv:H&&m(S.normalMap.channel),displacementMapUv:se&&m(S.displacementMap.channel),emissiveMapUv:ie&&m(S.emissiveMap.channel),metalnessMapUv:re&&m(S.metalnessMap.channel),roughnessMapUv:C&&m(S.roughnessMap.channel),anisotropyMapUv:ae&&m(S.anisotropyMap.channel),clearcoatMapUv:ue&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(S.sheenRoughnessMap.channel),specularMapUv:Ue&&m(S.specularMap.channel),specularColorMapUv:Me&&m(S.specularColorMap.channel),specularIntensityMapUv:Je&&m(S.specularIntensityMap.channel),transmissionMapUv:E&&m(S.transmissionMap.channel),thicknessMapUv:Y&&m(S.thicknessMap.channel),alphaMapUv:te&&m(S.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(H||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!ee.attributes.uv&&(Le||te),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:Q.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Te,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:At,decodeVideoTexture:Le&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===ct,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===An,flipSided:S.side===$t,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ke&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&S.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return vt.vertexUv1s=l.has(1),vt.vertexUv2s=l.has(2),vt.vertexUv3s=l.has(3),l.clear(),vt}function A(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const T in S.defines)v.push(T),v.push(S.defines[T]);return S.isRawShaderMaterial===!1&&(x(v,S),b(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function x(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function b(S,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.skinning&&o.enable(4),v.morphTargets&&o.enable(5),v.morphNormals&&o.enable(6),v.morphColors&&o.enable(7),v.premultipliedAlpha&&o.enable(8),v.shadowMapEnabled&&o.enable(9),v.doubleSided&&o.enable(10),v.flipSided&&o.enable(11),v.useDepthPacking&&o.enable(12),v.dithering&&o.enable(13),v.transmission&&o.enable(14),v.sheen&&o.enable(15),v.opaque&&o.enable(16),v.pointsUvs&&o.enable(17),v.decodeVideoTexture&&o.enable(18),v.alphaToCoverage&&o.enable(19),S.push(o.mask)}function I(S){const v=g[S.type];let T;if(v){const U=wn[v];T=$_.clone(U.uniforms)}else T=S.uniforms;return T}function P(S,v){let T;for(let U=0,Q=u.length;U<Q;U++){const q=u[U];if(q.cacheKey===v){T=q,++T.usedTimes;break}}return T===void 0&&(T=new dv(i,v,S,r),u.push(T)),T}function M(S){if(--S.usedTimes===0){const v=u.indexOf(S);u[v]=u[u.length-1],u.pop(),S.destroy()}}function B(S){c.remove(S)}function F(){c.dispose()}return{getParameters:p,getProgramCacheKey:A,getUniforms:I,acquireProgram:P,releaseProgram:M,releaseShaderCache:B,programs:u,dispose:F}}function mv(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function _v(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Th(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Rh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,g,m,p){let A=i[e];return A===void 0?(A={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:m,group:p},i[e]=A):(A.id=h.id,A.object=h,A.geometry=d,A.material=f,A.groupOrder=g,A.renderOrder=h.renderOrder,A.z=m,A.group=p),e++,A}function o(h,d,f,g,m,p){const A=a(h,d,f,g,m,p);f.transmission>0?n.push(A):f.transparent===!0?s.push(A):t.push(A)}function c(h,d,f,g,m,p){const A=a(h,d,f,g,m,p);f.transmission>0?n.unshift(A):f.transparent===!0?s.unshift(A):t.unshift(A)}function l(h,d){t.length>1&&t.sort(h||_v),n.length>1&&n.sort(d||Th),s.length>1&&s.sort(d||Th)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function bv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Rh,i.set(n,[a])):s>=r.length?(a=new Rh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ev(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new He};break;case"SpotLight":t={position:new N,direction:new N,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function xv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let vv=0;function Iv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Cv(i){const e=new Ev,t=xv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new je,a=new je;function o(l){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,m=0,p=0,A=0,x=0,b=0,I=0,P=0,M=0,B=0;l.sort(Iv);for(let S=0,v=l.length;S<v;S++){const T=l[S],U=T.color,Q=T.intensity,q=T.distance,ee=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=U.r*Q,h+=U.g*Q,d+=U.b*Q;else if(T.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(T.sh.coefficients[W],Q);B++}else if(T.isDirectionalLight){const W=e.get(T);if(W.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const j=T.shadow,k=t.get(T);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=ee,n.directionalShadowMatrix[f]=T.shadow.matrix,x++}n.directional[f]=W,f++}else if(T.isSpotLight){const W=e.get(T);W.position.setFromMatrixPosition(T.matrixWorld),W.color.copy(U).multiplyScalar(Q),W.distance=q,W.coneCos=Math.cos(T.angle),W.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),W.decay=T.decay,n.spot[m]=W;const j=T.shadow;if(T.map&&(n.spotLightMap[P]=T.map,P++,j.updateMatrices(T),T.castShadow&&M++),n.spotLightMatrix[m]=j.matrix,T.castShadow){const k=t.get(T);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,n.spotShadow[m]=k,n.spotShadowMap[m]=ee,I++}m++}else if(T.isRectAreaLight){const W=e.get(T);W.color.copy(U).multiplyScalar(Q),W.halfWidth.set(T.width*.5,0,0),W.halfHeight.set(0,T.height*.5,0),n.rectArea[p]=W,p++}else if(T.isPointLight){const W=e.get(T);if(W.color.copy(T.color).multiplyScalar(T.intensity),W.distance=T.distance,W.decay=T.decay,T.castShadow){const j=T.shadow,k=t.get(T);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,k.shadowCameraNear=j.camera.near,k.shadowCameraFar=j.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=ee,n.pointShadowMatrix[g]=T.shadow.matrix,b++}n.point[g]=W,g++}else if(T.isHemisphereLight){const W=e.get(T);W.skyColor.copy(T.color).multiplyScalar(Q),W.groundColor.copy(T.groundColor).multiplyScalar(Q),n.hemi[A]=W,A++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const F=n.hash;(F.directionalLength!==f||F.pointLength!==g||F.spotLength!==m||F.rectAreaLength!==p||F.hemiLength!==A||F.numDirectionalShadows!==x||F.numPointShadows!==b||F.numSpotShadows!==I||F.numSpotMaps!==P||F.numLightProbes!==B)&&(n.directional.length=f,n.spot.length=m,n.rectArea.length=p,n.point.length=g,n.hemi.length=A,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=I,n.spotShadowMap.length=I,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=I+P-M,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=B,F.directionalLength=f,F.pointLength=g,F.spotLength=m,F.rectAreaLength=p,F.hemiLength=A,F.numDirectionalShadows=x,F.numPointShadows=b,F.numSpotShadows=I,F.numSpotMaps=P,F.numLightProbes=B,n.version=vv++)}function c(l,u){let h=0,d=0,f=0,g=0,m=0;const p=u.matrixWorldInverse;for(let A=0,x=l.length;A<x;A++){const b=l[A];if(b.isDirectionalLight){const I=n.directional[h];I.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(p),h++}else if(b.isSpotLight){const I=n.spot[f];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(p),I.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(p),f++}else if(b.isRectAreaLight){const I=n.rectArea[g];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const I=n.point[d];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){const I=n.hemi[m];I.direction.setFromMatrixPosition(b.matrixWorld),I.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Dh(i){const e=new Cv(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function yv(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Dh(i),e.set(s,[o])):r>=a.length?(o=new Dh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Sv extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=l_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Mv extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const wv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tv(i,e,t){let n=new kl;const s=new Ne,r=new Ne,a=new ot,o=new Sv({depthPacking:u_}),c=new Mv,l={},u=t.maxTextureSize,h={[ti]:$t,[$t]:ti,[An]:An},d=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:wv,fragmentShader:Bv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new yn;g.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new St(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=df;let A=this.type;this.render=function(M,B,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;const S=i.getRenderTarget(),v=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ii),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const Q=A!==qn&&this.type===qn,q=A===qn&&this.type!==qn;for(let ee=0,W=M.length;ee<W;ee++){const j=M[ee],k=j.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const de=k.getFrameExtents();if(s.multiply(de),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/de.x),s.x=r.x*de.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/de.y),s.y=r.y*de.y,k.mapSize.y=r.y)),k.map===null||Q===!0||q===!0){const be=this.type!==qn?{minFilter:Jt,magFilter:Jt}:{};k.map!==null&&k.map.dispose(),k.map=new Xi(s.x,s.y,be),k.map.texture.name=j.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const Ae=k.getViewportCount();for(let be=0;be<Ae;be++){const Te=k.getViewport(be);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),U.viewport(a),k.updateMatrices(j,be),n=k.getFrustum(),I(B,F,k.camera,j,this.type)}k.isPointLightShadow!==!0&&this.type===qn&&x(k,F),k.needsUpdate=!1}A=this.type,p.needsUpdate=!1,i.setRenderTarget(S,v,T)};function x(M,B){const F=e.update(m);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Xi(s.x,s.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(B,null,F,d,m,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(B,null,F,f,m,null)}function b(M,B,F,S){let v=null;const T=F.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(T!==void 0)v=T;else if(v=F.isPointLight===!0?c:o,i.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0){const U=v.uuid,Q=B.uuid;let q=l[U];q===void 0&&(q={},l[U]=q);let ee=q[Q];ee===void 0&&(ee=v.clone(),q[Q]=ee,B.addEventListener("dispose",P)),v=ee}if(v.visible=B.visible,v.wireframe=B.wireframe,S===qn?v.side=B.shadowSide!==null?B.shadowSide:B.side:v.side=B.shadowSide!==null?B.shadowSide:h[B.side],v.alphaMap=B.alphaMap,v.alphaTest=B.alphaTest,v.map=B.map,v.clipShadows=B.clipShadows,v.clippingPlanes=B.clippingPlanes,v.clipIntersection=B.clipIntersection,v.displacementMap=B.displacementMap,v.displacementScale=B.displacementScale,v.displacementBias=B.displacementBias,v.wireframeLinewidth=B.wireframeLinewidth,v.linewidth=B.linewidth,F.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const U=i.properties.get(v);U.light=F}return v}function I(M,B,F,S,v){if(M.visible===!1)return;if(M.layers.test(B.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&v===qn)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,M.matrixWorld);const Q=e.update(M),q=M.material;if(Array.isArray(q)){const ee=Q.groups;for(let W=0,j=ee.length;W<j;W++){const k=ee[W],de=q[k.materialIndex];if(de&&de.visible){const Ae=b(M,de,S,v);M.onBeforeShadow(i,M,B,F,Q,Ae,k),i.renderBufferDirect(F,null,Q,Ae,M,k),M.onAfterShadow(i,M,B,F,Q,Ae,k)}}}else if(q.visible){const ee=b(M,q,S,v);M.onBeforeShadow(i,M,B,F,Q,ee,null),i.renderBufferDirect(F,null,Q,ee,M,null),M.onAfterShadow(i,M,B,F,Q,ee,null)}}const U=M.children;for(let Q=0,q=U.length;Q<q;Q++)I(U[Q],B,F,S,v)}function P(M){M.target.removeEventListener("dispose",P);for(const F in l){const S=l[F],v=M.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}function Rv(i){function e(){let E=!1;const Y=new ot;let X=null;const te=new ot(0,0,0,0);return{setMask:function(he){X!==he&&!E&&(i.colorMask(he,he,he,he),X=he)},setLocked:function(he){E=he},setClear:function(he,Re,ke,At,vt){vt===!0&&(he*=At,Re*=At,ke*=At),Y.set(he,Re,ke,At),te.equals(Y)===!1&&(i.clearColor(he,Re,ke,At),te.copy(Y))},reset:function(){E=!1,X=null,te.set(-1,0,0,0)}}}function t(){let E=!1,Y=null,X=null,te=null;return{setTest:function(he){he?ge(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(he){Y!==he&&!E&&(i.depthMask(he),Y=he)},setFunc:function(he){if(X!==he){switch(he){case Gm:i.depthFunc(i.NEVER);break;case Hm:i.depthFunc(i.ALWAYS);break;case zm:i.depthFunc(i.LESS);break;case Ga:i.depthFunc(i.LEQUAL);break;case Vm:i.depthFunc(i.EQUAL);break;case Wm:i.depthFunc(i.GEQUAL);break;case qm:i.depthFunc(i.GREATER);break;case jm:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}X=he}},setLocked:function(he){E=he},setClear:function(he){te!==he&&(i.clearDepth(he),te=he)},reset:function(){E=!1,Y=null,X=null,te=null}}}function n(){let E=!1,Y=null,X=null,te=null,he=null,Re=null,ke=null,At=null,vt=null;return{setTest:function(Ze){E||(Ze?ge(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(Ze){Y!==Ze&&!E&&(i.stencilMask(Ze),Y=Ze)},setFunc:function(Ze,It,gt){(X!==Ze||te!==It||he!==gt)&&(i.stencilFunc(Ze,It,gt),X=Ze,te=It,he=gt)},setOp:function(Ze,It,gt){(Re!==Ze||ke!==It||At!==gt)&&(i.stencilOp(Ze,It,gt),Re=Ze,ke=It,At=gt)},setLocked:function(Ze){E=Ze},setClear:function(Ze){vt!==Ze&&(i.clearStencil(Ze),vt=Ze)},reset:function(){E=!1,Y=null,X=null,te=null,he=null,Re=null,ke=null,At=null,vt=null}}}const s=new e,r=new t,a=new n,o=new WeakMap,c=new WeakMap;let l={},u={},h=new WeakMap,d=[],f=null,g=!1,m=null,p=null,A=null,x=null,b=null,I=null,P=null,M=new He(0,0,0),B=0,F=!1,S=null,v=null,T=null,U=null,Q=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,W=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(j)[1]),ee=W>=1):j.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),ee=W>=2);let k=null,de={};const Ae=i.getParameter(i.SCISSOR_BOX),be=i.getParameter(i.VIEWPORT),Te=new ot().fromArray(Ae),Oe=new ot().fromArray(be);function ne(E,Y,X,te){const he=new Uint8Array(4),Re=i.createTexture();i.bindTexture(E,Re),i.texParameteri(E,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(E,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<X;ke++)E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY?i.texImage3D(Y,0,i.RGBA,1,1,te,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(Y+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return Re}const ce={};ce[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ge(i.DEPTH_TEST),r.setFunc(Ga),G(!1),H(Nu),ge(i.CULL_FACE),w(Ii);function ge(E){l[E]!==!0&&(i.enable(E),l[E]=!0)}function fe(E){l[E]!==!1&&(i.disable(E),l[E]=!1)}function Ce(E,Y){return u[E]!==Y?(i.bindFramebuffer(E,Y),u[E]=Y,E===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Y),E===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Y),!0):!1}function we(E,Y){let X=d,te=!1;if(E){X=h.get(Y),X===void 0&&(X=[],h.set(Y,X));const he=E.textures;if(X.length!==he.length||X[0]!==i.COLOR_ATTACHMENT0){for(let Re=0,ke=he.length;Re<ke;Re++)X[Re]=i.COLOR_ATTACHMENT0+Re;X.length=he.length,te=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,te=!0);te&&i.drawBuffers(X)}function Le(E){return f!==E?(i.useProgram(E),f=E,!0):!1}const Ye={[Hi]:i.FUNC_ADD,[Cm]:i.FUNC_SUBTRACT,[ym]:i.FUNC_REVERSE_SUBTRACT};Ye[Sm]=i.MIN,Ye[Mm]=i.MAX;const L={[wm]:i.ZERO,[Bm]:i.ONE,[Tm]:i.SRC_COLOR,[Lc]:i.SRC_ALPHA,[Um]:i.SRC_ALPHA_SATURATE,[Pm]:i.DST_COLOR,[Dm]:i.DST_ALPHA,[Rm]:i.ONE_MINUS_SRC_COLOR,[Pc]:i.ONE_MINUS_SRC_ALPHA,[Fm]:i.ONE_MINUS_DST_COLOR,[Lm]:i.ONE_MINUS_DST_ALPHA,[Nm]:i.CONSTANT_COLOR,[Qm]:i.ONE_MINUS_CONSTANT_COLOR,[Om]:i.CONSTANT_ALPHA,[km]:i.ONE_MINUS_CONSTANT_ALPHA};function w(E,Y,X,te,he,Re,ke,At,vt,Ze){if(E===Ii){g===!0&&(fe(i.BLEND),g=!1);return}if(g===!1&&(ge(i.BLEND),g=!0),E!==Im){if(E!==m||Ze!==F){if((p!==Hi||b!==Hi)&&(i.blendEquation(i.FUNC_ADD),p=Hi,b=Hi),Ze)switch(E){case Bs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qu:i.blendFunc(i.ONE,i.ONE);break;case Ou:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ku:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",E);break}else switch(E){case Bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ou:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ku:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",E);break}A=null,x=null,I=null,P=null,M.set(0,0,0),B=0,m=E,F=Ze}return}he=he||Y,Re=Re||X,ke=ke||te,(Y!==p||he!==b)&&(i.blendEquationSeparate(Ye[Y],Ye[he]),p=Y,b=he),(X!==A||te!==x||Re!==I||ke!==P)&&(i.blendFuncSeparate(L[X],L[te],L[Re],L[ke]),A=X,x=te,I=Re,P=ke),(At.equals(M)===!1||vt!==B)&&(i.blendColor(At.r,At.g,At.b,vt),M.copy(At),B=vt),m=E,F=!1}function R(E,Y){E.side===An?fe(i.CULL_FACE):ge(i.CULL_FACE);let X=E.side===$t;Y&&(X=!X),G(X),E.blending===Bs&&E.transparent===!1?w(Ii):w(E.blending,E.blendEquation,E.blendSrc,E.blendDst,E.blendEquationAlpha,E.blendSrcAlpha,E.blendDstAlpha,E.blendColor,E.blendAlpha,E.premultipliedAlpha),r.setFunc(E.depthFunc),r.setTest(E.depthTest),r.setMask(E.depthWrite),s.setMask(E.colorWrite);const te=E.stencilWrite;a.setTest(te),te&&(a.setMask(E.stencilWriteMask),a.setFunc(E.stencilFunc,E.stencilRef,E.stencilFuncMask),a.setOp(E.stencilFail,E.stencilZFail,E.stencilZPass)),ie(E.polygonOffset,E.polygonOffsetFactor,E.polygonOffsetUnits),E.alphaToCoverage===!0?ge(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function G(E){S!==E&&(E?i.frontFace(i.CW):i.frontFace(i.CCW),S=E)}function H(E){E!==Em?(ge(i.CULL_FACE),E!==v&&(E===Nu?i.cullFace(i.BACK):E===xm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),v=E}function se(E){E!==T&&(ee&&i.lineWidth(E),T=E)}function ie(E,Y,X){E?(ge(i.POLYGON_OFFSET_FILL),(U!==Y||Q!==X)&&(i.polygonOffset(Y,X),U=Y,Q=X)):fe(i.POLYGON_OFFSET_FILL)}function re(E){E?ge(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function C(E){E===void 0&&(E=i.TEXTURE0+q-1),k!==E&&(i.activeTexture(E),k=E)}function _(E,Y,X){X===void 0&&(k===null?X=i.TEXTURE0+q-1:X=k);let te=de[X];te===void 0&&(te={type:void 0,texture:void 0},de[X]=te),(te.type!==E||te.texture!==Y)&&(k!==X&&(i.activeTexture(X),k=X),i.bindTexture(E,Y||ce[E]),te.type=E,te.texture=Y)}function D(){const E=de[k];E!==void 0&&E.type!==void 0&&(i.bindTexture(E.type,null),E.type=void 0,E.texture=void 0)}function V(){try{i.compressedTexImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function le(){try{i.texSubImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function ae(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function ue(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function Ie(){try{i.texStorage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function oe(){try{i.texStorage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function ze(){try{i.texImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function Pe(E){Te.equals(E)===!1&&(i.scissor(E.x,E.y,E.z,E.w),Te.copy(E))}function xe(E){Oe.equals(E)===!1&&(i.viewport(E.x,E.y,E.z,E.w),Oe.copy(E))}function Ue(E,Y){let X=c.get(Y);X===void 0&&(X=new WeakMap,c.set(Y,X));let te=X.get(E);te===void 0&&(te=i.getUniformBlockIndex(Y,E.name),X.set(E,te))}function Me(E,Y){const te=c.get(Y).get(E);o.get(Y)!==te&&(i.uniformBlockBinding(Y,te,E.__bindingPointIndex),o.set(Y,te))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},k=null,de={},u={},h=new WeakMap,d=[],f=null,g=!1,m=null,p=null,A=null,x=null,b=null,I=null,P=null,M=new He(0,0,0),B=0,F=!1,S=null,v=null,T=null,U=null,Q=null,Te.set(0,0,i.canvas.width,i.canvas.height),Oe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ge,disable:fe,bindFramebuffer:Ce,drawBuffers:we,useProgram:Le,setBlending:w,setMaterial:R,setFlipSided:G,setCullFace:H,setLineWidth:se,setPolygonOffset:ie,setScissorTest:re,activeTexture:C,bindTexture:_,unbindTexture:D,compressedTexImage2D:V,compressedTexImage3D:J,texImage2D:_e,texImage3D:ze,updateUBOMapping:Ue,uniformBlockBinding:Me,texStorage2D:Ie,texStorage3D:oe,texSubImage2D:K,texSubImage3D:le,compressedTexSubImage2D:ae,compressedTexSubImage3D:ue,scissor:Pe,viewport:xe,reset:Je}}function Lh(i,e,t,n){const s=Dv(n);switch(t){case bf:return i*e;case xf:return i*e;case vf:return i*e*2;case bi:return i*e/s.components*s.byteLength;case Pl:return i*e/s.components*s.byteLength;case Vi:return i*e*2/s.components*s.byteLength;case Fl:return i*e*2/s.components*s.byteLength;case Ef:return i*e*3/s.components*s.byteLength;case Dt:return i*e*4/s.components*s.byteLength;case Ul:return i*e*4/s.components*s.byteLength;case La:case vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pa:case Ir:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Nc:case Qc:return Math.max(i,16)*Math.max(e,8)/4;case za:case Va:return Math.max(i,8)*Math.max(e,8)/2;case Wa:case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case kc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Pr:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case zc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case jc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Kc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Cr:case Jc:case Zc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case If:case $c:return Math.ceil(i/4)*Math.ceil(e/4)*8;case el:case tl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dv(i){switch(i){case Et:case gf:return{byteLength:1,components:1};case Lr:case mf:case $n:return{byteLength:2,components:1};case Dl:case Ll:return{byteLength:2,components:4};case Yi:case Rl:case Zt:return{byteLength:4,components:1};case _f:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Lv(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ne,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,_){return f?new OffscreenCanvas(C,_):Nr("canvas")}function m(C,_,D){let V=1;const J=re(C);if((J.width>D||J.height>D)&&(V=D/Math.max(J.width,J.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const K=Math.floor(V*J.width),le=Math.floor(V*J.height);h===void 0&&(h=g(K,le));const ae=_?g(K,le):h;return ae.width=K,ae.height=le,ae.getContext("2d").drawImage(C,0,0,K,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+K+"x"+le+")."),ae}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Jt&&C.minFilter!==Xt}function A(C){i.generateMipmap(C)}function x(C,_,D,V,J=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=_;if(_===i.RED&&(D===i.FLOAT&&(K=i.R32F),D===i.HALF_FLOAT&&(K=i.R16F),D===i.UNSIGNED_BYTE&&(K=i.R8)),_===i.RED_INTEGER&&(D===i.UNSIGNED_BYTE&&(K=i.R8UI),D===i.UNSIGNED_SHORT&&(K=i.R16UI),D===i.UNSIGNED_INT&&(K=i.R32UI),D===i.BYTE&&(K=i.R8I),D===i.SHORT&&(K=i.R16I),D===i.INT&&(K=i.R32I)),_===i.RG&&(D===i.FLOAT&&(K=i.RG32F),D===i.HALF_FLOAT&&(K=i.RG16F),D===i.UNSIGNED_BYTE&&(K=i.RG8)),_===i.RG_INTEGER&&(D===i.UNSIGNED_BYTE&&(K=i.RG8UI),D===i.UNSIGNED_SHORT&&(K=i.RG16UI),D===i.UNSIGNED_INT&&(K=i.RG32UI),D===i.BYTE&&(K=i.RG8I),D===i.SHORT&&(K=i.RG16I),D===i.INT&&(K=i.RG32I)),_===i.RGB&&D===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),_===i.RGBA){const le=J?Xa:et.getTransfer(V);D===i.FLOAT&&(K=i.RGBA32F),D===i.HALF_FLOAT&&(K=i.RGBA16F),D===i.UNSIGNED_BYTE&&(K=le===ct?i.SRGB8_ALPHA8:i.RGBA8),D===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),D===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function b(C,_){let D;return C?_===null||_===Yi||_===ks?D=i.DEPTH24_STENCIL8:_===Zt?D=i.DEPTH32F_STENCIL8:_===Lr&&(D=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Yi||_===ks?D=i.DEPTH_COMPONENT24:_===Zt?D=i.DEPTH_COMPONENT32F:_===Lr&&(D=i.DEPTH_COMPONENT16),D}function I(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Jt&&C.minFilter!==Xt?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function P(C){const _=C.target;_.removeEventListener("dispose",P),B(_),_.isVideoTexture&&u.delete(_)}function M(C){const _=C.target;_.removeEventListener("dispose",M),S(_)}function B(C){const _=n.get(C);if(_.__webglInit===void 0)return;const D=C.source,V=d.get(D);if(V){const J=V[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&F(C),Object.keys(V).length===0&&d.delete(D)}n.remove(C)}function F(C){const _=n.get(C);i.deleteTexture(_.__webglTexture);const D=C.source,V=d.get(D);delete V[_.__cacheKey],a.memory.textures--}function S(C){const _=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let J=0;J<_.__webglFramebuffer[V].length;J++)i.deleteFramebuffer(_.__webglFramebuffer[V][J]);else i.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)i.deleteFramebuffer(_.__webglFramebuffer[V]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=C.textures;for(let V=0,J=D.length;V<J;V++){const K=n.get(D[V]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(D[V])}n.remove(C)}let v=0;function T(){v=0}function U(){const C=v;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),v+=1,C}function Q(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function q(C,_){const D=n.get(C);if(C.isVideoTexture&&se(C),C.isRenderTargetTexture===!1&&C.version>0&&D.__version!==C.version){const V=C.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Oe(D,C,_);return}}t.bindTexture(i.TEXTURE_2D,D.__webglTexture,i.TEXTURE0+_)}function ee(C,_){const D=n.get(C);if(C.version>0&&D.__version!==C.version){Oe(D,C,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,D.__webglTexture,i.TEXTURE0+_)}function W(C,_){const D=n.get(C);if(C.version>0&&D.__version!==C.version){Oe(D,C,_);return}t.bindTexture(i.TEXTURE_3D,D.__webglTexture,i.TEXTURE0+_)}function j(C,_){const D=n.get(C);if(C.version>0&&D.__version!==C.version){ne(D,C,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+_)}const k={[Os]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[Ha]:i.MIRRORED_REPEAT},de={[Jt]:i.NEAREST,[pf]:i.NEAREST_MIPMAP_NEAREST,[fr]:i.NEAREST_MIPMAP_LINEAR,[Xt]:i.LINEAR,[Da]:i.LINEAR_MIPMAP_NEAREST,[Dn]:i.LINEAR_MIPMAP_LINEAR},Ae={[d_]:i.NEVER,[__]:i.ALWAYS,[f_]:i.LESS,[Sf]:i.LEQUAL,[A_]:i.EQUAL,[m_]:i.GEQUAL,[p_]:i.GREATER,[g_]:i.NOTEQUAL};function be(C,_){if(_.type===Zt&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Xt||_.magFilter===Da||_.magFilter===fr||_.magFilter===Dn||_.minFilter===Xt||_.minFilter===Da||_.minFilter===fr||_.minFilter===Dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,k[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,k[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,k[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,de[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,de[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Jt||_.minFilter!==fr&&_.minFilter!==Dn||_.type===Zt&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Te(C,_){let D=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",P));const V=_.source;let J=d.get(V);J===void 0&&(J={},d.set(V,J));const K=Q(_);if(K!==C.__cacheKey){J[K]===void 0&&(J[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,D=!0),J[K].usedTimes++;const le=J[C.__cacheKey];le!==void 0&&(J[C.__cacheKey].usedTimes--,le.usedTimes===0&&F(_)),C.__cacheKey=K,C.__webglTexture=J[K].texture}return D}function Oe(C,_,D){let V=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=i.TEXTURE_3D);const J=Te(C,_),K=_.source;t.bindTexture(V,C.__webglTexture,i.TEXTURE0+D);const le=n.get(K);if(K.version!==le.__version||J===!0){t.activeTexture(i.TEXTURE0+D);const ae=et.getPrimaries(et.workingColorSpace),ue=_.colorSpace===Tn?null:et.getPrimaries(_.colorSpace),Ie=_.colorSpace===Tn||ae===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let oe=m(_.image,!1,s.maxTextureSize);oe=ie(_,oe);const _e=r.convert(_.format,_.colorSpace),ze=r.convert(_.type);let Pe=x(_.internalFormat,_e,ze,_.colorSpace,_.isVideoTexture);be(V,_);let xe;const Ue=_.mipmaps,Me=_.isVideoTexture!==!0,Je=le.__version===void 0||J===!0,E=K.dataReady,Y=I(_,oe);if(_.isDepthTexture)Pe=b(_.format===Gs,_.type),Je&&(Me?t.texStorage2D(i.TEXTURE_2D,1,Pe,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Pe,oe.width,oe.height,0,_e,ze,null));else if(_.isDataTexture)if(Ue.length>0){Me&&Je&&t.texStorage2D(i.TEXTURE_2D,Y,Pe,Ue[0].width,Ue[0].height);for(let X=0,te=Ue.length;X<te;X++)xe=Ue[X],Me?E&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,xe.width,xe.height,_e,ze,xe.data):t.texImage2D(i.TEXTURE_2D,X,Pe,xe.width,xe.height,0,_e,ze,xe.data);_.generateMipmaps=!1}else Me?(Je&&t.texStorage2D(i.TEXTURE_2D,Y,Pe,oe.width,oe.height),E&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe.width,oe.height,_e,ze,oe.data)):t.texImage2D(i.TEXTURE_2D,0,Pe,oe.width,oe.height,0,_e,ze,oe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Me&&Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Y,Pe,Ue[0].width,Ue[0].height,oe.depth);for(let X=0,te=Ue.length;X<te;X++)if(xe=Ue[X],_.format!==Dt)if(_e!==null)if(Me){if(E)if(_.layerUpdates.size>0){const he=Lh(xe.width,xe.height,_.format,_.type);for(const Re of _.layerUpdates){const ke=xe.data.subarray(Re*he/xe.data.BYTES_PER_ELEMENT,(Re+1)*he/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,Re,xe.width,xe.height,1,_e,ke,0,0)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,xe.width,xe.height,oe.depth,_e,xe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Pe,xe.width,xe.height,oe.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?E&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,xe.width,xe.height,oe.depth,_e,ze,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,Pe,xe.width,xe.height,oe.depth,0,_e,ze,xe.data)}else{Me&&Je&&t.texStorage2D(i.TEXTURE_2D,Y,Pe,Ue[0].width,Ue[0].height);for(let X=0,te=Ue.length;X<te;X++)xe=Ue[X],_.format!==Dt?_e!==null?Me?E&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,xe.width,xe.height,_e,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,X,Pe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?E&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,xe.width,xe.height,_e,ze,xe.data):t.texImage2D(i.TEXTURE_2D,X,Pe,xe.width,xe.height,0,_e,ze,xe.data)}else if(_.isDataArrayTexture)if(Me){if(Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Y,Pe,oe.width,oe.height,oe.depth),E)if(_.layerUpdates.size>0){const X=Lh(oe.width,oe.height,_.format,_.type);for(const te of _.layerUpdates){const he=oe.data.subarray(te*X/oe.data.BYTES_PER_ELEMENT,(te+1)*X/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,te,oe.width,oe.height,1,_e,ze,he)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,_e,ze,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,oe.width,oe.height,oe.depth,0,_e,ze,oe.data);else if(_.isData3DTexture)Me?(Je&&t.texStorage3D(i.TEXTURE_3D,Y,Pe,oe.width,oe.height,oe.depth),E&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,_e,ze,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,oe.width,oe.height,oe.depth,0,_e,ze,oe.data);else if(_.isFramebufferTexture){if(Je)if(Me)t.texStorage2D(i.TEXTURE_2D,Y,Pe,oe.width,oe.height);else{let X=oe.width,te=oe.height;for(let he=0;he<Y;he++)t.texImage2D(i.TEXTURE_2D,he,Pe,X,te,0,_e,ze,null),X>>=1,te>>=1}}else if(Ue.length>0){if(Me&&Je){const X=re(Ue[0]);t.texStorage2D(i.TEXTURE_2D,Y,Pe,X.width,X.height)}for(let X=0,te=Ue.length;X<te;X++)xe=Ue[X],Me?E&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,_e,ze,xe):t.texImage2D(i.TEXTURE_2D,X,Pe,_e,ze,xe);_.generateMipmaps=!1}else if(Me){if(Je){const X=re(oe);t.texStorage2D(i.TEXTURE_2D,Y,Pe,X.width,X.height)}E&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,ze,oe)}else t.texImage2D(i.TEXTURE_2D,0,Pe,_e,ze,oe);p(_)&&A(V),le.__version=K.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ne(C,_,D){if(_.image.length!==6)return;const V=Te(C,_),J=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+D);const K=n.get(J);if(J.version!==K.__version||V===!0){t.activeTexture(i.TEXTURE0+D);const le=et.getPrimaries(et.workingColorSpace),ae=_.colorSpace===Tn?null:et.getPrimaries(_.colorSpace),ue=_.colorSpace===Tn||le===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Ie=_.isCompressedTexture||_.image[0].isCompressedTexture,oe=_.image[0]&&_.image[0].isDataTexture,_e=[];for(let te=0;te<6;te++)!Ie&&!oe?_e[te]=m(_.image[te],!0,s.maxCubemapSize):_e[te]=oe?_.image[te].image:_.image[te],_e[te]=ie(_,_e[te]);const ze=_e[0],Pe=r.convert(_.format,_.colorSpace),xe=r.convert(_.type),Ue=x(_.internalFormat,Pe,xe,_.colorSpace),Me=_.isVideoTexture!==!0,Je=K.__version===void 0||V===!0,E=J.dataReady;let Y=I(_,ze);be(i.TEXTURE_CUBE_MAP,_);let X;if(Ie){Me&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Y,Ue,ze.width,ze.height);for(let te=0;te<6;te++){X=_e[te].mipmaps;for(let he=0;he<X.length;he++){const Re=X[he];_.format!==Dt?Pe!==null?Me?E&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,0,0,Re.width,Re.height,Pe,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,Ue,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Me?E&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,0,0,Re.width,Re.height,Pe,xe,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he,Ue,Re.width,Re.height,0,Pe,xe,Re.data)}}}else{if(X=_.mipmaps,Me&&Je){X.length>0&&Y++;const te=re(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Y,Ue,te.width,te.height)}for(let te=0;te<6;te++)if(oe){Me?E&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,_e[te].width,_e[te].height,Pe,xe,_e[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ue,_e[te].width,_e[te].height,0,Pe,xe,_e[te].data);for(let he=0;he<X.length;he++){const ke=X[he].image[te].image;Me?E&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,0,0,ke.width,ke.height,Pe,xe,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,Ue,ke.width,ke.height,0,Pe,xe,ke.data)}}else{Me?E&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Pe,xe,_e[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ue,Pe,xe,_e[te]);for(let he=0;he<X.length;he++){const Re=X[he];Me?E&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,0,0,Pe,xe,Re.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,he+1,Ue,Pe,xe,Re.image[te])}}}p(_)&&A(i.TEXTURE_CUBE_MAP),K.__version=J.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ce(C,_,D,V,J,K){const le=r.convert(D.format,D.colorSpace),ae=r.convert(D.type),ue=x(D.internalFormat,le,ae,D.colorSpace);if(!n.get(_).__hasExternalTextures){const oe=Math.max(1,_.width>>K),_e=Math.max(1,_.height>>K);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,K,ue,oe,_e,_.depth,0,le,ae,null):t.texImage2D(J,K,ue,oe,_e,0,le,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),H(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,J,n.get(D).__webglTexture,0,G(_)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,J,n.get(D).__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(C,_,D){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){const V=_.depthTexture,J=V&&V.isDepthTexture?V.type:null,K=b(_.stencilBuffer,J),le=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=G(_);H(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,K,_.width,_.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,K,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,K,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,C)}else{const V=_.textures;for(let J=0;J<V.length;J++){const K=V[J],le=r.convert(K.format,K.colorSpace),ae=r.convert(K.type),ue=x(K.internalFormat,le,ae,K.colorSpace),Ie=G(_);D&&H(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,ue,_.width,_.height):H(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ie,ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ue,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(C,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const V=n.get(_.depthTexture).__webglTexture,J=G(_);if(_.depthTexture.format===Ts)H(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0);else if(_.depthTexture.format===Gs)H(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function Ce(C){const _=n.get(C),D=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!_.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");fe(_.__webglFramebuffer,C)}else if(D){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]=i.createRenderbuffer(),ge(_.__webglDepthbuffer[V],C,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),ge(_.__webglDepthbuffer,C,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function we(C,_,D){const V=n.get(C);_!==void 0&&ce(V.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),D!==void 0&&Ce(C)}function Le(C){const _=C.texture,D=n.get(C),V=n.get(_);C.addEventListener("dispose",M);const J=C.textures,K=C.isWebGLCubeRenderTarget===!0,le=J.length>1;if(le||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=_.version,a.memory.textures++),K){D.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[ae]=[];for(let ue=0;ue<_.mipmaps.length;ue++)D.__webglFramebuffer[ae][ue]=i.createFramebuffer()}else D.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)D.__webglFramebuffer[ae]=i.createFramebuffer()}else D.__webglFramebuffer=i.createFramebuffer();if(le)for(let ae=0,ue=J.length;ae<ue;ae++){const Ie=n.get(J[ae]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&H(C)===!1){D.__webglMultisampledFramebuffer=i.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ae=0;ae<J.length;ae++){const ue=J[ae];D.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,D.__webglColorRenderbuffer[ae]);const Ie=r.convert(ue.format,ue.colorSpace),oe=r.convert(ue.type),_e=x(ue.internalFormat,Ie,oe,ue.colorSpace,C.isXRRenderTarget===!0),ze=G(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,_e,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,D.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(D.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(D.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),be(i.TEXTURE_CUBE_MAP,_);for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ce(D.__webglFramebuffer[ae][ue],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ue);else ce(D.__webglFramebuffer[ae],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(_)&&A(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let ae=0,ue=J.length;ae<ue;ae++){const Ie=J[ae],oe=n.get(Ie);t.bindTexture(i.TEXTURE_2D,oe.__webglTexture),be(i.TEXTURE_2D,Ie),ce(D.__webglFramebuffer,C,Ie,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,0),p(Ie)&&A(i.TEXTURE_2D)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ae=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,V.__webglTexture),be(ae,_),_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ce(D.__webglFramebuffer[ue],C,_,i.COLOR_ATTACHMENT0,ae,ue);else ce(D.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,ae,0);p(_)&&A(ae),t.unbindTexture()}C.depthBuffer&&Ce(C)}function Ye(C){const _=C.textures;for(let D=0,V=_.length;D<V;D++){const J=_[D];if(p(J)){const K=C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,le=n.get(J).__webglTexture;t.bindTexture(K,le),A(K),t.unbindTexture()}}}const L=[],w=[];function R(C){if(C.samples>0){if(H(C)===!1){const _=C.textures,D=C.width,V=C.height;let J=i.COLOR_BUFFER_BIT;const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(C),ae=_.length>1;if(ae)for(let ue=0;ue<_.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let ue=0;ue<_.length;ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);const Ie=n.get(_[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ie,0)}i.blitFramebuffer(0,0,D,V,0,0,D,V,J,i.NEAREST),c===!0&&(L.length=0,w.length=0,L.push(i.COLOR_ATTACHMENT0+ue),C.depthBuffer&&C.resolveDepthBuffer===!1&&(L.push(K),w.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,L))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let ue=0;ue<_.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);const Ie=n.get(_[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function G(C){return Math.min(s.maxSamples,C.samples)}function H(C){const _=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function se(C){const _=a.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function ie(C,_){const D=C.colorSpace,V=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||D!==wt&&D!==Tn&&(et.getTransfer(D)===ct?(V!==Dt||J!==Et)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),_}function re(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=T,this.setTexture2D=q,this.setTexture2DArray=ee,this.setTexture3D=W,this.setTextureCube=j,this.rebindTextures=we,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=R,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=H}function Pv(i,e){function t(n,s=Tn){let r;const a=et.getTransfer(s);if(n===Et)return i.UNSIGNED_BYTE;if(n===Dl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_f)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gf)return i.BYTE;if(n===mf)return i.SHORT;if(n===Lr)return i.UNSIGNED_SHORT;if(n===Rl)return i.INT;if(n===Yi)return i.UNSIGNED_INT;if(n===Zt)return i.FLOAT;if(n===$n)return i.HALF_FLOAT;if(n===bf)return i.ALPHA;if(n===Ef)return i.RGB;if(n===Dt)return i.RGBA;if(n===xf)return i.LUMINANCE;if(n===vf)return i.LUMINANCE_ALPHA;if(n===Ts)return i.DEPTH_COMPONENT;if(n===Gs)return i.DEPTH_STENCIL;if(n===bi)return i.RED;if(n===Pl)return i.RED_INTEGER;if(n===Vi)return i.RG;if(n===Fl)return i.RG_INTEGER;if(n===Ul)return i.RGBA_INTEGER;if(n===La||n===vr||n===Pa||n===Ir)if(a===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===La)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===La)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===za||n===Nc||n===Va||n===Qc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Nc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wa||n===qa||n===ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wa||n===qa)return a===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ja)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ka||n===Oc||n===kc||n===Gc||n===Pr||n===Hc||n===zc||n===Vc||n===Wc||n===qc||n===jc||n===Kc||n===Yc||n===Xc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ka)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===kc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pr)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Kc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xc)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cr||n===Jc||n===Zc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Cr)return a===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===If||n===$c||n===el||n===tl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Cr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$c)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Fv extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qt extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uv={type:"move"};class sc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const m of e.hand.values()){const p=t.getJointPose(m,n),A=this._getHandJoint(l,m);p!==null&&(A.matrix.fromArray(p.transform.matrix),A.matrix.decompose(A.position,A.rotation,A.scale),A.matrixWorldNeedsUpdate=!0,A.jointRadius=p.radius),A.visible=p!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uv)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Nv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ov{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Mt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ni({vertexShader:Nv,fragmentShader:Qv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new St(new Ys(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kv extends wi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const m=new Ov,p=t.getContextAttributes();let A=null,x=null;const b=[],I=[],P=new Ne;let M=null;const B=new Nt;B.layers.enable(1),B.viewport=new ot;const F=new Nt;F.layers.enable(2),F.viewport=new ot;const S=[B,F],v=new Fv;v.layers.enable(1),v.layers.enable(2);let T=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ce=b[ne];return ce===void 0&&(ce=new sc,b[ne]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(ne){let ce=b[ne];return ce===void 0&&(ce=new sc,b[ne]=ce),ce.getGripSpace()},this.getHand=function(ne){let ce=b[ne];return ce===void 0&&(ce=new sc,b[ne]=ce),ce.getHandSpace()};function Q(ne){const ce=I.indexOf(ne.inputSource);if(ce===-1)return;const ge=b[ce];ge!==void 0&&(ge.update(ne.inputSource,ne.frame,l||a),ge.dispatchEvent({type:ne.type,data:ne.inputSource}))}function q(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",ee);for(let ne=0;ne<b.length;ne++){const ce=I[ne];ce!==null&&(I[ne]=null,b[ne].disconnect(ce))}T=null,U=null,m.reset(),e.setRenderTarget(A),f=null,d=null,h=null,s=null,x=null,Oe.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ne){if(s=ne,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",q),s.addEventListener("inputsourceschange",ee),p.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0){const ce={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Xi(f.framebufferWidth,f.framebufferHeight,{format:Dt,type:Et,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ce=null,ge=null,fe=null;p.depth&&(fe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=p.stencil?Gs:Ts,ge=p.stencil?ks:Yi);const Ce={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Ce),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Xi(d.textureWidth,d.textureHeight,{format:Dt,type:Et,depthTexture:new Of(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Oe.setContext(s),Oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(ne){for(let ce=0;ce<ne.removed.length;ce++){const ge=ne.removed[ce],fe=I.indexOf(ge);fe>=0&&(I[fe]=null,b[fe].disconnect(ge))}for(let ce=0;ce<ne.added.length;ce++){const ge=ne.added[ce];let fe=I.indexOf(ge);if(fe===-1){for(let we=0;we<b.length;we++)if(we>=I.length){I.push(ge),fe=we;break}else if(I[we]===null){I[we]=ge,fe=we;break}if(fe===-1)break}const Ce=b[fe];Ce&&Ce.connect(ge)}}const W=new N,j=new N;function k(ne,ce,ge){W.setFromMatrixPosition(ce.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);const fe=W.distanceTo(j),Ce=ce.projectionMatrix.elements,we=ge.projectionMatrix.elements,Le=Ce[14]/(Ce[10]-1),Ye=Ce[14]/(Ce[10]+1),L=(Ce[9]+1)/Ce[5],w=(Ce[9]-1)/Ce[5],R=(Ce[8]-1)/Ce[0],G=(we[8]+1)/we[0],H=Le*R,se=Le*G,ie=fe/(-R+G),re=ie*-R;ce.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(re),ne.translateZ(ie),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert();const C=Le+ie,_=Ye+ie,D=H-re,V=se+(fe-re),J=L*Ye/_*C,K=w*Ye/_*C;ne.projectionMatrix.makePerspective(D,V,J,K,C,_),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}function de(ne,ce){ce===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ce.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(s===null)return;m.texture!==null&&(ne.near=m.depthNear,ne.far=m.depthFar),v.near=F.near=B.near=ne.near,v.far=F.far=B.far=ne.far,(T!==v.near||U!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),T=v.near,U=v.far,B.near=T,B.far=U,F.near=T,F.far=U,B.updateProjectionMatrix(),F.updateProjectionMatrix(),ne.updateProjectionMatrix());const ce=ne.parent,ge=v.cameras;de(v,ce);for(let fe=0;fe<ge.length;fe++)de(ge[fe],ce);ge.length===2?k(v,B,F):v.projectionMatrix.copy(B.projectionMatrix),Ae(ne,v,ce)};function Ae(ne,ce,ge){ge===null?ne.matrix.copy(ce.matrixWorld):(ne.matrix.copy(ge.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ce.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ce.projectionMatrix),ne.projectionMatrixInverse.copy(ce.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Hs*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(ne){c=ne,d!==null&&(d.fixedFoveation=ne),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(v)};let be=null;function Te(ne,ce){if(u=ce.getViewerPose(l||a),g=ce,u!==null){const ge=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let fe=!1;ge.length!==v.cameras.length&&(v.cameras.length=0,fe=!0);for(let we=0;we<ge.length;we++){const Le=ge[we];let Ye=null;if(f!==null)Ye=f.getViewport(Le);else{const w=h.getViewSubImage(d,Le);Ye=w.viewport,we===0&&(e.setRenderTargetTextures(x,w.colorTexture,d.ignoreDepthValues?void 0:w.depthStencilTexture),e.setRenderTarget(x))}let L=S[we];L===void 0&&(L=new Nt,L.layers.enable(we),L.viewport=new ot,S[we]=L),L.matrix.fromArray(Le.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(Le.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),we===0&&(v.matrix.copy(L.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),fe===!0&&v.cameras.push(L)}const Ce=s.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const we=h.getDepthInformation(ge[0]);we&&we.isValid&&we.texture&&m.init(e,we,s.renderState)}}for(let ge=0;ge<b.length;ge++){const fe=I[ge],Ce=b[ge];fe!==null&&Ce!==void 0&&Ce.update(fe,ce,l||a)}be&&be(ne,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),g=null}const Oe=new Qf;Oe.setAnimationLoop(Te),this.setAnimationLoop=function(ne){be=ne},this.dispose=function(){}}}const Qi=new Fn,Gv=new je;function Hv(i,e){function t(p,A){p.matrixAutoUpdate===!0&&p.updateMatrix(),A.value.copy(p.matrix)}function n(p,A){A.color.getRGB(p.fogColor.value,Uf(i)),A.isFog?(p.fogNear.value=A.near,p.fogFar.value=A.far):A.isFogExp2&&(p.fogDensity.value=A.density)}function s(p,A,x,b,I){A.isMeshBasicMaterial||A.isMeshLambertMaterial?r(p,A):A.isMeshToonMaterial?(r(p,A),h(p,A)):A.isMeshPhongMaterial?(r(p,A),u(p,A)):A.isMeshStandardMaterial?(r(p,A),d(p,A),A.isMeshPhysicalMaterial&&f(p,A,I)):A.isMeshMatcapMaterial?(r(p,A),g(p,A)):A.isMeshDepthMaterial?r(p,A):A.isMeshDistanceMaterial?(r(p,A),m(p,A)):A.isMeshNormalMaterial?r(p,A):A.isLineBasicMaterial?(a(p,A),A.isLineDashedMaterial&&o(p,A)):A.isPointsMaterial?c(p,A,x,b):A.isSpriteMaterial?l(p,A):A.isShadowMaterial?(p.color.value.copy(A.color),p.opacity.value=A.opacity):A.isShaderMaterial&&(A.uniformsNeedUpdate=!1)}function r(p,A){p.opacity.value=A.opacity,A.color&&p.diffuse.value.copy(A.color),A.emissive&&p.emissive.value.copy(A.emissive).multiplyScalar(A.emissiveIntensity),A.map&&(p.map.value=A.map,t(A.map,p.mapTransform)),A.alphaMap&&(p.alphaMap.value=A.alphaMap,t(A.alphaMap,p.alphaMapTransform)),A.bumpMap&&(p.bumpMap.value=A.bumpMap,t(A.bumpMap,p.bumpMapTransform),p.bumpScale.value=A.bumpScale,A.side===$t&&(p.bumpScale.value*=-1)),A.normalMap&&(p.normalMap.value=A.normalMap,t(A.normalMap,p.normalMapTransform),p.normalScale.value.copy(A.normalScale),A.side===$t&&p.normalScale.value.negate()),A.displacementMap&&(p.displacementMap.value=A.displacementMap,t(A.displacementMap,p.displacementMapTransform),p.displacementScale.value=A.displacementScale,p.displacementBias.value=A.displacementBias),A.emissiveMap&&(p.emissiveMap.value=A.emissiveMap,t(A.emissiveMap,p.emissiveMapTransform)),A.specularMap&&(p.specularMap.value=A.specularMap,t(A.specularMap,p.specularMapTransform)),A.alphaTest>0&&(p.alphaTest.value=A.alphaTest);const x=e.get(A),b=x.envMap,I=x.envMapRotation;b&&(p.envMap.value=b,Qi.copy(I),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),p.envMapRotation.value.setFromMatrix4(Gv.makeRotationFromEuler(Qi)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=A.reflectivity,p.ior.value=A.ior,p.refractionRatio.value=A.refractionRatio),A.lightMap&&(p.lightMap.value=A.lightMap,p.lightMapIntensity.value=A.lightMapIntensity,t(A.lightMap,p.lightMapTransform)),A.aoMap&&(p.aoMap.value=A.aoMap,p.aoMapIntensity.value=A.aoMapIntensity,t(A.aoMap,p.aoMapTransform))}function a(p,A){p.diffuse.value.copy(A.color),p.opacity.value=A.opacity,A.map&&(p.map.value=A.map,t(A.map,p.mapTransform))}function o(p,A){p.dashSize.value=A.dashSize,p.totalSize.value=A.dashSize+A.gapSize,p.scale.value=A.scale}function c(p,A,x,b){p.diffuse.value.copy(A.color),p.opacity.value=A.opacity,p.size.value=A.size*x,p.scale.value=b*.5,A.map&&(p.map.value=A.map,t(A.map,p.uvTransform)),A.alphaMap&&(p.alphaMap.value=A.alphaMap,t(A.alphaMap,p.alphaMapTransform)),A.alphaTest>0&&(p.alphaTest.value=A.alphaTest)}function l(p,A){p.diffuse.value.copy(A.color),p.opacity.value=A.opacity,p.rotation.value=A.rotation,A.map&&(p.map.value=A.map,t(A.map,p.mapTransform)),A.alphaMap&&(p.alphaMap.value=A.alphaMap,t(A.alphaMap,p.alphaMapTransform)),A.alphaTest>0&&(p.alphaTest.value=A.alphaTest)}function u(p,A){p.specular.value.copy(A.specular),p.shininess.value=Math.max(A.shininess,1e-4)}function h(p,A){A.gradientMap&&(p.gradientMap.value=A.gradientMap)}function d(p,A){p.metalness.value=A.metalness,A.metalnessMap&&(p.metalnessMap.value=A.metalnessMap,t(A.metalnessMap,p.metalnessMapTransform)),p.roughness.value=A.roughness,A.roughnessMap&&(p.roughnessMap.value=A.roughnessMap,t(A.roughnessMap,p.roughnessMapTransform)),A.envMap&&(p.envMapIntensity.value=A.envMapIntensity)}function f(p,A,x){p.ior.value=A.ior,A.sheen>0&&(p.sheenColor.value.copy(A.sheenColor).multiplyScalar(A.sheen),p.sheenRoughness.value=A.sheenRoughness,A.sheenColorMap&&(p.sheenColorMap.value=A.sheenColorMap,t(A.sheenColorMap,p.sheenColorMapTransform)),A.sheenRoughnessMap&&(p.sheenRoughnessMap.value=A.sheenRoughnessMap,t(A.sheenRoughnessMap,p.sheenRoughnessMapTransform))),A.clearcoat>0&&(p.clearcoat.value=A.clearcoat,p.clearcoatRoughness.value=A.clearcoatRoughness,A.clearcoatMap&&(p.clearcoatMap.value=A.clearcoatMap,t(A.clearcoatMap,p.clearcoatMapTransform)),A.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=A.clearcoatRoughnessMap,t(A.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),A.clearcoatNormalMap&&(p.clearcoatNormalMap.value=A.clearcoatNormalMap,t(A.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(A.clearcoatNormalScale),A.side===$t&&p.clearcoatNormalScale.value.negate())),A.dispersion>0&&(p.dispersion.value=A.dispersion),A.iridescence>0&&(p.iridescence.value=A.iridescence,p.iridescenceIOR.value=A.iridescenceIOR,p.iridescenceThicknessMinimum.value=A.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=A.iridescenceThicknessRange[1],A.iridescenceMap&&(p.iridescenceMap.value=A.iridescenceMap,t(A.iridescenceMap,p.iridescenceMapTransform)),A.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=A.iridescenceThicknessMap,t(A.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),A.transmission>0&&(p.transmission.value=A.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),A.transmissionMap&&(p.transmissionMap.value=A.transmissionMap,t(A.transmissionMap,p.transmissionMapTransform)),p.thickness.value=A.thickness,A.thicknessMap&&(p.thicknessMap.value=A.thicknessMap,t(A.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=A.attenuationDistance,p.attenuationColor.value.copy(A.attenuationColor)),A.anisotropy>0&&(p.anisotropyVector.value.set(A.anisotropy*Math.cos(A.anisotropyRotation),A.anisotropy*Math.sin(A.anisotropyRotation)),A.anisotropyMap&&(p.anisotropyMap.value=A.anisotropyMap,t(A.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=A.specularIntensity,p.specularColor.value.copy(A.specularColor),A.specularColorMap&&(p.specularColorMap.value=A.specularColorMap,t(A.specularColorMap,p.specularColorMapTransform)),A.specularIntensityMap&&(p.specularIntensityMap.value=A.specularIntensityMap,t(A.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,A){A.matcap&&(p.matcap.value=A.matcap)}function m(p,A){const x=e.get(A).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function zv(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,b){const I=b.program;n.uniformBlockBinding(x,I)}function l(x,b){let I=s[x.id];I===void 0&&(g(x),I=u(x),s[x.id]=I,x.addEventListener("dispose",p));const P=b.program;n.updateUBOMapping(x,P);const M=e.render.frame;r[x.id]!==M&&(d(x),r[x.id]=M)}function u(x){const b=h();x.__bindingPointIndex=b;const I=i.createBuffer(),P=x.__size,M=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,I),i.bufferData(i.UNIFORM_BUFFER,P,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,I),I}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const b=s[x.id],I=x.uniforms,P=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let M=0,B=I.length;M<B;M++){const F=Array.isArray(I[M])?I[M]:[I[M]];for(let S=0,v=F.length;S<v;S++){const T=F[S];if(f(T,M,S,P)===!0){const U=T.__offset,Q=Array.isArray(T.value)?T.value:[T.value];let q=0;for(let ee=0;ee<Q.length;ee++){const W=Q[ee],j=m(W);typeof W=="number"||typeof W=="boolean"?(T.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,U+q,T.__data)):W.isMatrix3?(T.__data[0]=W.elements[0],T.__data[1]=W.elements[1],T.__data[2]=W.elements[2],T.__data[3]=0,T.__data[4]=W.elements[3],T.__data[5]=W.elements[4],T.__data[6]=W.elements[5],T.__data[7]=0,T.__data[8]=W.elements[6],T.__data[9]=W.elements[7],T.__data[10]=W.elements[8],T.__data[11]=0):(W.toArray(T.__data,q),q+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,b,I,P){const M=x.value,B=b+"_"+I;if(P[B]===void 0)return typeof M=="number"||typeof M=="boolean"?P[B]=M:P[B]=M.clone(),!0;{const F=P[B];if(typeof M=="number"||typeof M=="boolean"){if(F!==M)return P[B]=M,!0}else if(F.equals(M)===!1)return F.copy(M),!0}return!1}function g(x){const b=x.uniforms;let I=0;const P=16;for(let B=0,F=b.length;B<F;B++){const S=Array.isArray(b[B])?b[B]:[b[B]];for(let v=0,T=S.length;v<T;v++){const U=S[v],Q=Array.isArray(U.value)?U.value:[U.value];for(let q=0,ee=Q.length;q<ee;q++){const W=Q[q],j=m(W),k=I%P,de=k%j.boundary,Ae=k+de;I+=de,Ae!==0&&P-Ae<j.storage&&(I+=P-Ae),U.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=I,I+=j.storage}}}const M=I%P;return M>0&&(I+=P-M),x.__size=I,x.__cache={},this}function m(x){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),b}function p(x){const b=x.target;b.removeEventListener("dispose",p);const I=a.indexOf(b.__bindingPointIndex);a.splice(I,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function A(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}class Vv{constructor(e={}){const{canvas:t=F_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const A=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ct,this.toneMapping=Ci,this.toneMappingExposure=1;const b=this;let I=!1,P=0,M=0,B=null,F=-1,S=null;const v=new ot,T=new ot;let U=null;const Q=new He(0);let q=0,ee=t.width,W=t.height,j=1,k=null,de=null;const Ae=new ot(0,0,ee,W),be=new ot(0,0,ee,W);let Te=!1;const Oe=new kl;let ne=!1,ce=!1;const ge=new je,fe=new N,Ce=new ot,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function Ye(){return B===null?j:1}let L=n;function w(y,O){return t.getContext(y,O)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Tl}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",te,!1),t.addEventListener("webglcontextcreationerror",he,!1),L===null){const O="webgl2";if(L=w(O,y),L===null)throw w(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let R,G,H,se,ie,re,C,_,D,V,J,K,le,ae,ue,Ie,oe,_e,ze,Pe,xe,Ue,Me,Je;function E(){R=new X0(L),R.init(),Ue=new Pv(L,R),G=new V0(L,R,e,Ue),H=new Rv(L),se=new $0(L),ie=new mv,re=new Lv(L,R,H,ie,G,Ue,se),C=new q0(b),_=new Y0(b),D=new ab(L),Me=new H0(L,D),V=new J0(L,D,se,Me),J=new tx(L,V,D,se),ze=new ex(L,G,re),Ie=new W0(ie),K=new gv(b,C,_,R,G,Me,Ie),le=new Hv(b,ie),ae=new bv,ue=new yv(R),_e=new G0(b,C,_,H,J,d,c),oe=new Tv(b,J,G),Je=new zv(L,se,G,H),Pe=new z0(L,R,se),xe=new Z0(L,R,se),se.programs=K.programs,b.capabilities=G,b.extensions=R,b.properties=ie,b.renderLists=ae,b.shadowMap=oe,b.state=H,b.info=se}E();const Y=new kv(b,L);this.xr=Y,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=R.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=R.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(y){y!==void 0&&(j=y,this.setSize(ee,W,!1))},this.getSize=function(y){return y.set(ee,W)},this.setSize=function(y,O,Z=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=y,W=O,t.width=Math.floor(y*j),t.height=Math.floor(O*j),Z===!0&&(t.style.width=y+"px",t.style.height=O+"px"),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(ee*j,W*j).floor()},this.setDrawingBufferSize=function(y,O,Z){ee=y,W=O,j=Z,t.width=Math.floor(y*Z),t.height=Math.floor(O*Z),this.setViewport(0,0,y,O)},this.getCurrentViewport=function(y){return y.copy(v)},this.getViewport=function(y){return y.copy(Ae)},this.setViewport=function(y,O,Z,$){y.isVector4?Ae.set(y.x,y.y,y.z,y.w):Ae.set(y,O,Z,$),H.viewport(v.copy(Ae).multiplyScalar(j).round())},this.getScissor=function(y){return y.copy(be)},this.setScissor=function(y,O,Z,$){y.isVector4?be.set(y.x,y.y,y.z,y.w):be.set(y,O,Z,$),H.scissor(T.copy(be).multiplyScalar(j).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(y){H.setScissorTest(Te=y)},this.setOpaqueSort=function(y){k=y},this.setTransparentSort=function(y){de=y},this.getClearColor=function(y){return y.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor.apply(_e,arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha.apply(_e,arguments)},this.clear=function(y=!0,O=!0,Z=!0){let $=0;if(y){let z=!1;if(B!==null){const me=B.texture.format;z=me===Ul||me===Fl||me===Pl}if(z){const me=B.texture.type,ve=me===Et||me===Yi||me===Lr||me===ks||me===Dl||me===Ll,ye=_e.getClearColor(),Se=_e.getClearAlpha(),Qe=ye.r,Ge=ye.g,Fe=ye.b;ve?(f[0]=Qe,f[1]=Ge,f[2]=Fe,f[3]=Se,L.clearBufferuiv(L.COLOR,0,f)):(g[0]=Qe,g[1]=Ge,g[2]=Fe,g[3]=Se,L.clearBufferiv(L.COLOR,0,g))}else $|=L.COLOR_BUFFER_BIT}O&&($|=L.DEPTH_BUFFER_BIT),Z&&($|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",te,!1),t.removeEventListener("webglcontextcreationerror",he,!1),ae.dispose(),ue.dispose(),ie.dispose(),C.dispose(),_.dispose(),J.dispose(),Me.dispose(),Je.dispose(),K.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",gt),Y.removeEventListener("sessionend",ri),Pt.stop()};function X(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function te(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const y=se.autoReset,O=oe.enabled,Z=oe.autoUpdate,$=oe.needsUpdate,z=oe.type;E(),se.autoReset=y,oe.enabled=O,oe.autoUpdate=Z,oe.needsUpdate=$,oe.type=z}function he(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Re(y){const O=y.target;O.removeEventListener("dispose",Re),ke(O)}function ke(y){At(y),ie.remove(y)}function At(y){const O=ie.get(y).programs;O!==void 0&&(O.forEach(function(Z){K.releaseProgram(Z)}),y.isShaderMaterial&&K.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,Z,$,z,me){O===null&&(O=we);const ve=z.isMesh&&z.matrixWorld.determinant()<0,ye=_A(y,O,Z,$,z);H.setMaterial($,ve);let Se=Z.index,Qe=1;if($.wireframe===!0){if(Se=V.getWireframeAttribute(Z),Se===void 0)return;Qe=2}const Ge=Z.drawRange,Fe=Z.attributes.position;let nt=Ge.start*Qe,dt=(Ge.start+Ge.count)*Qe;me!==null&&(nt=Math.max(nt,me.start*Qe),dt=Math.min(dt,(me.start+me.count)*Qe)),Se!==null?(nt=Math.max(nt,0),dt=Math.min(dt,Se.count)):Fe!=null&&(nt=Math.max(nt,0),dt=Math.min(dt,Fe.count));const ft=dt-nt;if(ft<0||ft===1/0)return;Me.setup(z,$,ye,Z,Se);let rn,it=Pe;if(Se!==null&&(rn=D.get(Se),it=xe,it.setIndex(rn)),z.isMesh)$.wireframe===!0?(H.setLineWidth($.wireframeLinewidth*Ye()),it.setMode(L.LINES)):it.setMode(L.TRIANGLES);else if(z.isLine){let De=$.linewidth;De===void 0&&(De=1),H.setLineWidth(De*Ye()),z.isLineSegments?it.setMode(L.LINES):z.isLineLoop?it.setMode(L.LINE_LOOP):it.setMode(L.LINE_STRIP)}else z.isPoints?it.setMode(L.POINTS):z.isSprite&&it.setMode(L.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)it.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(R.get("WEBGL_multi_draw"))it.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const De=z._multiDrawStarts,Ft=z._multiDrawCounts,st=z._multiDrawCount,gn=Se?D.get(Se).bytesPerElement:1,$i=ie.get($).currentProgram.getUniforms();for(let an=0;an<st;an++)$i.setValue(L,"_gl_DrawID",an),it.render(De[an]/gn,Ft[an])}else if(z.isInstancedMesh)it.renderInstances(nt,ft,z.count);else if(Z.isInstancedBufferGeometry){const De=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ft=Math.min(Z.instanceCount,De);it.renderInstances(nt,ft,Ft)}else it.render(nt,ft)};function vt(y,O,Z){y.transparent===!0&&y.side===An&&y.forceSinglePass===!1?(y.side=$t,y.needsUpdate=!0,Wr(y,O,Z),y.side=ti,y.needsUpdate=!0,Wr(y,O,Z),y.side=An):Wr(y,O,Z)}this.compile=function(y,O,Z=null){Z===null&&(Z=y),p=ue.get(Z),p.init(O),x.push(p),Z.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),y!==Z&&y.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const $=new Set;return y.traverse(function(z){const me=z.material;if(me)if(Array.isArray(me))for(let ve=0;ve<me.length;ve++){const ye=me[ve];vt(ye,Z,z),$.add(ye)}else vt(me,Z,z),$.add(me)}),x.pop(),p=null,$},this.compileAsync=function(y,O,Z=null){const $=this.compile(y,O,Z);return new Promise(z=>{function me(){if($.forEach(function(ve){ie.get(ve).currentProgram.isReady()&&$.delete(ve)}),$.size===0){z(y);return}setTimeout(me,10)}R.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Ze=null;function It(y){Ze&&Ze(y)}function gt(){Pt.stop()}function ri(){Pt.start()}const Pt=new Qf;Pt.setAnimationLoop(It),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(y){Ze=y,Y.setAnimationLoop(y),y===null?Pt.stop():Pt.start()},Y.addEventListener("sessionstart",gt),Y.addEventListener("sessionend",ri),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),y.isScene===!0&&y.onBeforeRender(b,y,O,B),p=ue.get(y,x.length),p.init(O),x.push(p),ge.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Oe.setFromProjectionMatrix(ge),ce=this.localClippingEnabled,ne=Ie.init(this.clippingPlanes,ce),m=ae.get(y,A.length),m.init(),A.push(m),Y.enabled===!0&&Y.isPresenting===!0){const me=b.xr.getDepthSensingMesh();me!==null&&On(me,O,-1/0,b.sortObjects)}On(y,O,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(k,de),Le=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Le&&_e.addToRenderList(m,y),this.info.render.frame++,ne===!0&&Ie.beginShadows();const Z=p.state.shadowsArray;oe.render(Z,y,O),ne===!0&&Ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,z=m.transmissive;if(p.setupLights(),O.isArrayCamera){const me=O.cameras;if(z.length>0)for(let ve=0,ye=me.length;ve<ye;ve++){const Se=me[ve];$s($,z,y,Se)}Le&&_e.render(y);for(let ve=0,ye=me.length;ve<ye;ve++){const Se=me[ve];Ti(m,y,Se,Se.viewport)}}else z.length>0&&$s($,z,y,O),Le&&_e.render(y),Ti(m,y,O);B!==null&&(re.updateMultisampleRenderTarget(B),re.updateRenderTargetMipmap(B)),y.isScene===!0&&y.onAfterRender(b,y,O),Me.resetDefaultState(),F=-1,S=null,x.pop(),x.length>0?(p=x[x.length-1],ne===!0&&Ie.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function On(y,O,Z,$){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)Z=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Oe.intersectsSprite(y)){$&&Ce.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ge);const ve=J.update(y),ye=y.material;ye.visible&&m.push(y,ve,ye,Z,Ce.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Oe.intersectsObject(y))){const ve=J.update(y),ye=y.material;if($&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ce.copy(y.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ce.copy(ve.boundingSphere.center)),Ce.applyMatrix4(y.matrixWorld).applyMatrix4(ge)),Array.isArray(ye)){const Se=ve.groups;for(let Qe=0,Ge=Se.length;Qe<Ge;Qe++){const Fe=Se[Qe],nt=ye[Fe.materialIndex];nt&&nt.visible&&m.push(y,ve,nt,Z,Ce.z,Fe)}}else ye.visible&&m.push(y,ve,ye,Z,Ce.z,null)}}const me=y.children;for(let ve=0,ye=me.length;ve<ye;ve++)On(me[ve],O,Z,$)}function Ti(y,O,Z,$){const z=y.opaque,me=y.transmissive,ve=y.transparent;p.setupLightsView(Z),ne===!0&&Ie.setGlobalState(b.clippingPlanes,Z),$&&H.viewport(v.copy($)),z.length>0&&Vr(z,O,Z),me.length>0&&Vr(me,O,Z),ve.length>0&&Vr(ve,O,Z),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function $s(y,O,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new Xi(1,1,{generateMipmaps:!0,type:R.has("EXT_color_buffer_half_float")||R.has("EXT_color_buffer_float")?$n:Et,minFilter:Dn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const me=p.state.transmissionRenderTarget[$.id],ve=$.viewport||v;me.setSize(ve.z,ve.w);const ye=b.getRenderTarget();b.setRenderTarget(me),b.getClearColor(Q),q=b.getClearAlpha(),q<1&&b.setClearColor(16777215,.5),b.clear(),Le&&_e.render(Z);const Se=b.toneMapping;b.toneMapping=Ci;const Qe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),ne===!0&&Ie.setGlobalState(b.clippingPlanes,$),Vr(y,Z,$),re.updateMultisampleRenderTarget(me),re.updateRenderTargetMipmap(me),R.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Fe=0,nt=O.length;Fe<nt;Fe++){const dt=O[Fe],ft=dt.object,rn=dt.geometry,it=dt.material,De=dt.group;if(it.side===An&&ft.layers.test($.layers)){const Ft=it.side;it.side=$t,it.needsUpdate=!0,$l(ft,Z,$,rn,it,De),it.side=Ft,it.needsUpdate=!0,Ge=!0}}Ge===!0&&(re.updateMultisampleRenderTarget(me),re.updateRenderTargetMipmap(me))}b.setRenderTarget(ye),b.setClearColor(Q,q),Qe!==void 0&&($.viewport=Qe),b.toneMapping=Se}function Vr(y,O,Z){const $=O.isScene===!0?O.overrideMaterial:null;for(let z=0,me=y.length;z<me;z++){const ve=y[z],ye=ve.object,Se=ve.geometry,Qe=$===null?ve.material:$,Ge=ve.group;ye.layers.test(Z.layers)&&$l(ye,O,Z,Se,Qe,Ge)}}function $l(y,O,Z,$,z,me){y.onBeforeRender(b,O,Z,$,z,me),y.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),z.transparent===!0&&z.side===An&&z.forceSinglePass===!1?(z.side=$t,z.needsUpdate=!0,b.renderBufferDirect(Z,O,$,z,y,me),z.side=ti,z.needsUpdate=!0,b.renderBufferDirect(Z,O,$,z,y,me),z.side=An):b.renderBufferDirect(Z,O,$,z,y,me),y.onAfterRender(b,O,Z,$,z,me)}function Wr(y,O,Z){O.isScene!==!0&&(O=we);const $=ie.get(y),z=p.state.lights,me=p.state.shadowsArray,ve=z.state.version,ye=K.getParameters(y,z.state,me,O,Z),Se=K.getProgramCacheKey(ye);let Qe=$.programs;$.environment=y.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(y.isMeshStandardMaterial?_:C).get(y.envMap||$.environment),$.envMapRotation=$.environment!==null&&y.envMap===null?O.environmentRotation:y.envMapRotation,Qe===void 0&&(y.addEventListener("dispose",Re),Qe=new Map,$.programs=Qe);let Ge=Qe.get(Se);if(Ge!==void 0){if($.currentProgram===Ge&&$.lightsStateVersion===ve)return tu(y,ye),Ge}else ye.uniforms=K.getUniforms(y),y.onBeforeCompile(ye,b),Ge=K.acquireProgram(ye,Se),Qe.set(Se,Ge),$.uniforms=ye.uniforms;const Fe=$.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Fe.clippingPlanes=Ie.uniform),tu(y,ye),$.needsLights=EA(y),$.lightsStateVersion=ve,$.needsLights&&(Fe.ambientLightColor.value=z.state.ambient,Fe.lightProbe.value=z.state.probe,Fe.directionalLights.value=z.state.directional,Fe.directionalLightShadows.value=z.state.directionalShadow,Fe.spotLights.value=z.state.spot,Fe.spotLightShadows.value=z.state.spotShadow,Fe.rectAreaLights.value=z.state.rectArea,Fe.ltc_1.value=z.state.rectAreaLTC1,Fe.ltc_2.value=z.state.rectAreaLTC2,Fe.pointLights.value=z.state.point,Fe.pointLightShadows.value=z.state.pointShadow,Fe.hemisphereLights.value=z.state.hemi,Fe.directionalShadowMap.value=z.state.directionalShadowMap,Fe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Fe.spotShadowMap.value=z.state.spotShadowMap,Fe.spotLightMatrix.value=z.state.spotLightMatrix,Fe.spotLightMap.value=z.state.spotLightMap,Fe.pointShadowMap.value=z.state.pointShadowMap,Fe.pointShadowMatrix.value=z.state.pointShadowMatrix),$.currentProgram=Ge,$.uniformsList=null,Ge}function eu(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=Fa.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function tu(y,O){const Z=ie.get(y);Z.outputColorSpace=O.outputColorSpace,Z.batching=O.batching,Z.batchingColor=O.batchingColor,Z.instancing=O.instancing,Z.instancingColor=O.instancingColor,Z.instancingMorph=O.instancingMorph,Z.skinning=O.skinning,Z.morphTargets=O.morphTargets,Z.morphNormals=O.morphNormals,Z.morphColors=O.morphColors,Z.morphTargetsCount=O.morphTargetsCount,Z.numClippingPlanes=O.numClippingPlanes,Z.numIntersection=O.numClipIntersection,Z.vertexAlphas=O.vertexAlphas,Z.vertexTangents=O.vertexTangents,Z.toneMapping=O.toneMapping}function _A(y,O,Z,$,z){O.isScene!==!0&&(O=we),re.resetTextureUnits();const me=O.fog,ve=$.isMeshStandardMaterial?O.environment:null,ye=B===null?b.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:wt,Se=($.isMeshStandardMaterial?_:C).get($.envMap||ve),Qe=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ge=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Fe=!!Z.morphAttributes.position,nt=!!Z.morphAttributes.normal,dt=!!Z.morphAttributes.color;let ft=Ci;$.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(ft=b.toneMapping);const rn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,it=rn!==void 0?rn.length:0,De=ie.get($),Ft=p.state.lights;if(ne===!0&&(ce===!0||y!==S)){const un=y===S&&$.id===F;Ie.setState($,y,un)}let st=!1;$.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Ft.state.version||De.outputColorSpace!==ye||z.isBatchedMesh&&De.batching===!1||!z.isBatchedMesh&&De.batching===!0||z.isBatchedMesh&&De.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&De.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&De.instancing===!1||!z.isInstancedMesh&&De.instancing===!0||z.isSkinnedMesh&&De.skinning===!1||!z.isSkinnedMesh&&De.skinning===!0||z.isInstancedMesh&&De.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&De.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&De.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&De.instancingMorph===!1&&z.morphTexture!==null||De.envMap!==Se||$.fog===!0&&De.fog!==me||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==Ie.numPlanes||De.numIntersection!==Ie.numIntersection)||De.vertexAlphas!==Qe||De.vertexTangents!==Ge||De.morphTargets!==Fe||De.morphNormals!==nt||De.morphColors!==dt||De.toneMapping!==ft||De.morphTargetsCount!==it)&&(st=!0):(st=!0,De.__version=$.version);let gn=De.currentProgram;st===!0&&(gn=Wr($,O,z));let $i=!1,an=!1,vo=!1;const mt=gn.getUniforms(),ai=De.uniforms;if(H.useProgram(gn.program)&&($i=!0,an=!0,vo=!0),$.id!==F&&(F=$.id,an=!0),$i||S!==y){mt.setValue(L,"projectionMatrix",y.projectionMatrix),mt.setValue(L,"viewMatrix",y.matrixWorldInverse);const un=mt.map.cameraPosition;un!==void 0&&un.setValue(L,fe.setFromMatrixPosition(y.matrixWorld)),G.logarithmicDepthBuffer&&mt.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&mt.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,an=!0,vo=!0)}if(z.isSkinnedMesh){mt.setOptional(L,z,"bindMatrix"),mt.setOptional(L,z,"bindMatrixInverse");const un=z.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),mt.setValue(L,"boneTexture",un.boneTexture,re))}z.isBatchedMesh&&(mt.setOptional(L,z,"batchingTexture"),mt.setValue(L,"batchingTexture",z._matricesTexture,re),mt.setOptional(L,z,"batchingIdTexture"),mt.setValue(L,"batchingIdTexture",z._indirectTexture,re),mt.setOptional(L,z,"batchingColorTexture"),z._colorsTexture!==null&&mt.setValue(L,"batchingColorTexture",z._colorsTexture,re));const Io=Z.morphAttributes;if((Io.position!==void 0||Io.normal!==void 0||Io.color!==void 0)&&ze.update(z,Z,gn),(an||De.receiveShadow!==z.receiveShadow)&&(De.receiveShadow=z.receiveShadow,mt.setValue(L,"receiveShadow",z.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(ai.envMap.value=Se,ai.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&O.environment!==null&&(ai.envMapIntensity.value=O.environmentIntensity),an&&(mt.setValue(L,"toneMappingExposure",b.toneMappingExposure),De.needsLights&&bA(ai,vo),me&&$.fog===!0&&le.refreshFogUniforms(ai,me),le.refreshMaterialUniforms(ai,$,j,W,p.state.transmissionRenderTarget[y.id]),Fa.upload(L,eu(De),ai,re)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Fa.upload(L,eu(De),ai,re),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&mt.setValue(L,"center",z.center),mt.setValue(L,"modelViewMatrix",z.modelViewMatrix),mt.setValue(L,"normalMatrix",z.normalMatrix),mt.setValue(L,"modelMatrix",z.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const un=$.uniformsGroups;for(let Co=0,xA=un.length;Co<xA;Co++){const nu=un[Co];Je.update(nu,gn),Je.bind(nu,gn)}}return gn}function bA(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function EA(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(y,O,Z){ie.get(y.texture).__webglTexture=O,ie.get(y.depthTexture).__webglTexture=Z;const $=ie.get(y);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=Z===void 0,$.__autoAllocateDepthBuffer||R.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,O){const Z=ie.get(y);Z.__webglFramebuffer=O,Z.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,Z=0){B=y,P=O,M=Z;let $=!0,z=null,me=!1,ve=!1;if(y){const Se=ie.get(y);Se.__useDefaultFramebuffer!==void 0?(H.bindFramebuffer(L.FRAMEBUFFER,null),$=!1):Se.__webglFramebuffer===void 0?re.setupRenderTarget(y):Se.__hasExternalTextures&&re.rebindTextures(y,ie.get(y.texture).__webglTexture,ie.get(y.depthTexture).__webglTexture);const Qe=y.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(ve=!0);const Ge=ie.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ge[O])?z=Ge[O][Z]:z=Ge[O],me=!0):y.samples>0&&re.useMultisampledRTT(y)===!1?z=ie.get(y).__webglMultisampledFramebuffer:Array.isArray(Ge)?z=Ge[Z]:z=Ge,v.copy(y.viewport),T.copy(y.scissor),U=y.scissorTest}else v.copy(Ae).multiplyScalar(j).floor(),T.copy(be).multiplyScalar(j).floor(),U=Te;if(H.bindFramebuffer(L.FRAMEBUFFER,z)&&$&&H.drawBuffers(y,z),H.viewport(v),H.scissor(T),H.setScissorTest(U),me){const Se=ie.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Se.__webglTexture,Z)}else if(ve){const Se=ie.get(y.texture),Qe=O||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Se.__webglTexture,Z||0,Qe)}F=-1},this.readRenderTargetPixels=function(y,O,Z,$,z,me,ve){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=ie.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){H.bindFramebuffer(L.FRAMEBUFFER,ye);try{const Se=y.texture,Qe=Se.format,Ge=Se.type;if(!G.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!G.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-$&&Z>=0&&Z<=y.height-z&&L.readPixels(O,Z,$,z,Ue.convert(Qe),Ue.convert(Ge),me)}finally{const Se=B!==null?ie.get(B).__webglFramebuffer:null;H.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(y,O,Z,$,z,me,ve){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=ie.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){H.bindFramebuffer(L.FRAMEBUFFER,ye);try{const Se=y.texture,Qe=Se.format,Ge=Se.type;if(!G.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=y.width-$&&Z>=0&&Z<=y.height-z){const Fe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.bufferData(L.PIXEL_PACK_BUFFER,me.byteLength,L.STREAM_READ),L.readPixels(O,Z,$,z,Ue.convert(Qe),Ue.convert(Ge),0),L.flush();const nt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await U_(L,nt,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,me)}finally{L.deleteBuffer(Fe),L.deleteSync(nt)}return me}}finally{const Se=B!==null?ie.get(B).__webglFramebuffer:null;H.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.copyFramebufferToTexture=function(y,O=null,Z=0){y.isTexture!==!0&&(Rs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,y=arguments[1]);const $=Math.pow(2,-Z),z=Math.floor(y.image.width*$),me=Math.floor(y.image.height*$),ve=O!==null?O.x:0,ye=O!==null?O.y:0;re.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,Z,0,0,ve,ye,z,me),H.unbindTexture()},this.copyTextureToTexture=function(y,O,Z=null,$=null,z=0){y.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,y=arguments[1],O=arguments[2],z=arguments[3]||0,Z=null);let me,ve,ye,Se,Qe,Ge;Z!==null?(me=Z.max.x-Z.min.x,ve=Z.max.y-Z.min.y,ye=Z.min.x,Se=Z.min.y):(me=y.image.width,ve=y.image.height,ye=0,Se=0),$!==null?(Qe=$.x,Ge=$.y):(Qe=0,Ge=0);const Fe=Ue.convert(O.format),nt=Ue.convert(O.type);re.setTexture2D(O,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const dt=L.getParameter(L.UNPACK_ROW_LENGTH),ft=L.getParameter(L.UNPACK_IMAGE_HEIGHT),rn=L.getParameter(L.UNPACK_SKIP_PIXELS),it=L.getParameter(L.UNPACK_SKIP_ROWS),De=L.getParameter(L.UNPACK_SKIP_IMAGES),Ft=y.isCompressedTexture?y.mipmaps[z]:y.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,Ft.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ft.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ye),L.pixelStorei(L.UNPACK_SKIP_ROWS,Se),y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,z,Qe,Ge,me,ve,Fe,nt,Ft.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,z,Qe,Ge,Ft.width,Ft.height,Fe,Ft.data):L.texSubImage2D(L.TEXTURE_2D,z,Qe,Ge,me,ve,Fe,nt,Ft),L.pixelStorei(L.UNPACK_ROW_LENGTH,dt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ft),L.pixelStorei(L.UNPACK_SKIP_PIXELS,rn),L.pixelStorei(L.UNPACK_SKIP_ROWS,it),L.pixelStorei(L.UNPACK_SKIP_IMAGES,De),z===0&&O.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),H.unbindTexture()},this.copyTextureToTexture3D=function(y,O,Z=null,$=null,z=0){y.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,$=arguments[1]||null,y=arguments[2],O=arguments[3],z=arguments[4]||0);let me,ve,ye,Se,Qe,Ge,Fe,nt,dt;const ft=y.isCompressedTexture?y.mipmaps[z]:y.image;Z!==null?(me=Z.max.x-Z.min.x,ve=Z.max.y-Z.min.y,ye=Z.max.z-Z.min.z,Se=Z.min.x,Qe=Z.min.y,Ge=Z.min.z):(me=ft.width,ve=ft.height,ye=ft.depth,Se=0,Qe=0,Ge=0),$!==null?(Fe=$.x,nt=$.y,dt=$.z):(Fe=0,nt=0,dt=0);const rn=Ue.convert(O.format),it=Ue.convert(O.type);let De;if(O.isData3DTexture)re.setTexture3D(O,0),De=L.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)re.setTexture2DArray(O,0),De=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const Ft=L.getParameter(L.UNPACK_ROW_LENGTH),st=L.getParameter(L.UNPACK_IMAGE_HEIGHT),gn=L.getParameter(L.UNPACK_SKIP_PIXELS),$i=L.getParameter(L.UNPACK_SKIP_ROWS),an=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ft.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ft.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Se),L.pixelStorei(L.UNPACK_SKIP_ROWS,Qe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ge),y.isDataTexture||y.isData3DTexture?L.texSubImage3D(De,z,Fe,nt,dt,me,ve,ye,rn,it,ft.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(De,z,Fe,nt,dt,me,ve,ye,rn,ft.data):L.texSubImage3D(De,z,Fe,nt,dt,me,ve,ye,rn,it,ft),L.pixelStorei(L.UNPACK_ROW_LENGTH,Ft),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,st),L.pixelStorei(L.UNPACK_SKIP_PIXELS,gn),L.pixelStorei(L.UNPACK_SKIP_ROWS,$i),L.pixelStorei(L.UNPACK_SKIP_IMAGES,an),z===0&&O.generateMipmaps&&L.generateMipmap(De),H.unbindTexture()},this.initRenderTarget=function(y){ie.get(y).__webglFramebuffer===void 0&&re.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?re.setTextureCube(y,0):y.isData3DTexture?re.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?re.setTexture2DArray(y,0):re.setTexture2D(y,0),H.unbindTexture()},this.resetState=function(){P=0,M=0,B=null,H.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===mo?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===Gr?"display-p3":"srgb"}}class Wv extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class qv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=il,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Rs("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Wt=new N;class zl{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ph=new N,Fh=new ot,Uh=new ot,jv=new N,Nh=new je,ba=new N,rc=new Un,Qh=new je,ac=new Hr;class Kv extends St{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gu,this.bindMatrix=new je,this.bindMatrixInverse=new je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new si),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingBox.expandByPoint(ba)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ba),this.boundingSphere.expandByPoint(ba)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rc.copy(this.boundingSphere),rc.applyMatrix4(s),e.ray.intersectsSphere(rc)!==!1&&(Qh.copy(s).invert(),ac.copy(e.ray).applyMatrix4(Qh),!(this.boundingBox!==null&&ac.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ac)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ot,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Gu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===i_?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Fh.fromBufferAttribute(s.attributes.skinIndex,e),Uh.fromBufferAttribute(s.attributes.skinWeight,e),Ph.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Uh.getComponent(r);if(a!==0){const o=Fh.getComponent(r);Nh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(jv.copy(Ph).applyMatrix4(Nh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Vf extends ut{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Vl extends Mt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Jt,u=Jt,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Oh=new je,Yv=new je;class Wl{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Yv;Oh.multiplyMatrices(o,t[r]),Oh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Wl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Vl(t,e,e,Dt,Zt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Vf),this.bones.push(a),this.boneInverses.push(new je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class rl extends Ot{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const bs=new je,kh=new je,Ea=[],Gh=new si,Xv=new je,ar=new St,or=new Un;class Wf extends St{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Xv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new si),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),Gh.copy(e.boundingBox).applyMatrix4(bs),this.boundingBox.union(Gh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),or.copy(e.boundingSphere).applyMatrix4(bs),this.boundingSphere.union(or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),or.copy(this.boundingSphere),or.applyMatrix4(n),e.ray.intersectsSphere(or)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,bs),kh.multiplyMatrices(n,bs),ar.matrixWorld=kh,ar.raycast(e,Ea);for(let a=0,o=Ea.length;a<o;a++){const c=Ea[a];c.instanceId=r,c.object=this,t.push(c)}Ea.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vl(new Float32Array(s*this.count),s,this.count,bi,Zt));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class qf extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const eo=new N,to=new N,Hh=new je,cr=new Hr,xa=new Un,oc=new N,zh=new N;class ql extends ut{constructor(e=new yn,t=new qf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)eo.fromBufferAttribute(t,s-1),to.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=eo.distanceTo(to);e.setAttribute("lineDistance",new ei(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(s),xa.radius+=r,e.ray.intersectsSphere(xa)===!1)return;Hh.copy(s).invert(),cr.copy(e.ray).applyMatrix4(Hh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let m=f,p=g-1;m<p;m+=l){const A=u.getX(m),x=u.getX(m+1),b=va(this,e,cr,c,A,x);b&&t.push(b)}if(this.isLineLoop){const m=u.getX(g-1),p=u.getX(f),A=va(this,e,cr,c,m,p);A&&t.push(A)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let m=f,p=g-1;m<p;m+=l){const A=va(this,e,cr,c,m,m+1);A&&t.push(A)}if(this.isLineLoop){const m=va(this,e,cr,c,g-1,f);m&&t.push(m)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function va(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(eo.fromBufferAttribute(a,s),to.fromBufferAttribute(a,r),t.distanceSqToSegment(eo,to,oc,zh)>n)return;oc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(oc);if(!(c<e.near||c>e.far))return{distance:c,point:zh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,object:i}}const Vh=new N,Wh=new N;class Jv extends ql{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Vh.fromBufferAttribute(t,s),Wh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Vh.distanceTo(Wh);e.setAttribute("lineDistance",new ei(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zv extends ql{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class jf extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const qh=new je,al=new Hr,Ia=new Un,Ca=new N;class $v extends ut{constructor(e=new yn,t=new jf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ia.copy(n.boundingSphere),Ia.applyMatrix4(s),Ia.radius+=r,e.ray.intersectsSphere(Ia)===!1)return;qh.copy(s).invert(),al.copy(e.ray).applyMatrix4(qh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,m=f;g<m;g++){const p=l.getX(g);Ca.fromBufferAttribute(h,p),jh(Ca,p,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,m=f;g<m;g++)Ca.fromBufferAttribute(h,g),jh(Ca,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jh(i,e,t,n,s,r,a){const o=al.distanceSqToPoint(i);if(o<t){const c=new N;al.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class bo extends Mt{constructor(e,t,n,s,r,a,o,c,l,u,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class eI extends bo{constructor(e,t,n,s,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=s,this.wrapR=Yn,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tI extends bo{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Ki),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class jl extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yf,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nn extends jl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ya(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function nI(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function iI(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Kh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Kf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class zr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class sI extends zr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vs,endingEnd:vs}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Is:r=e,o=2*t-n;break;case Ya:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Is:a=e,c=2*n-t;break;case Ya:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),m=g*g,p=m*g,A=-d*p+2*d*m-d*g,x=(1+d)*p+(-1.5-2*d)*m+(-.5+d)*g+1,b=(-1-f)*p+(1.5+f)*m+.5*g,I=f*p-f*m;for(let P=0;P!==o;++P)r[P]=A*a[u+P]+x*a[l+P]+b*a[c+P]+I*a[h+P];return r}}class Yf extends zr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class rI extends zr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Qn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ya(t,this.TimeBufferType),this.values=ya(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ya(e.times,Array),values:ya(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new rI(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sI(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fr:t=this.InterpolantFactoryMethodDiscrete;break;case Ur:t=this.InterpolantFactoryMethodLinear;break;case Lo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return Ur;case this.InterpolantFactoryMethodSmooth:return Lo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&nI(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Lo,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{const h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){const m=t[h+g];if(m!==t[d+g]||m!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Qn.prototype.TimeBufferType=Float32Array;Qn.prototype.ValueBufferType=Float32Array;Qn.prototype.DefaultInterpolation=Ur;class Js extends Qn{constructor(e,t,n){super(e,t,n)}}Js.prototype.ValueTypeName="bool";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=Fr;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class Xf extends Qn{}Xf.prototype.ValueTypeName="color";class Vs extends Qn{}Vs.prototype.ValueTypeName="number";class aI extends zr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let u=l+o;l!==u;l+=4)ln.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Ws extends Qn{InterpolantFactoryMethodLinear(e){return new aI(this.times,this.values,this.getValueSize(),e)}}Ws.prototype.ValueTypeName="quaternion";Ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Zs extends Qn{constructor(e,t,n){super(e,t,n)}}Zs.prototype.ValueTypeName="string";Zs.prototype.ValueBufferType=Array;Zs.prototype.DefaultInterpolation=Fr;Zs.prototype.InterpolantFactoryMethodLinear=void 0;Zs.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends Qn{}qs.prototype.ValueTypeName="vector";class ol{constructor(e="",t=-1,n=[],s=Nl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Cn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(cI(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Qn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=iI(c);c=Kh(c,1,u),l=Kh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Vs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,g,m){if(f.length!==0){const p=[],A=[];Kf(f,p,A,g),p.length!==0&&m.push(new h(d,p,A))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let m=0;m<d[g].morphTargets.length;m++)f[d[g].morphTargets[m]]=-1;for(const m in f){const p=[],A=[];for(let x=0;x!==d[g].morphTargets.length;++x){const b=d[g];p.push(b.time),A.push(b.morphTarget===m?1:0)}s.push(new Vs(".morphTargetInfluence["+m+"]",p,A))}c=f.length*a}else{const f=".bones["+t[h].name+"]";n(qs,f+".position",d,"pos",s),n(Ws,f+".quaternion",d,"rot",s),n(qs,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function oI(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Vs;case"vector":case"vector2":case"vector3":case"vector4":return qs;case"color":return Xf;case"quaternion":return Ws;case"bool":case"boolean":return Js;case"string":return Zs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function cI(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=oI(i.type);if(i.times===void 0){const t=[],n=[];Kf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ei={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class lI{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const uI=new lI;class Bi{constructor(e){this.manager=e!==void 0?e:uI,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Bi.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wn={};class hI extends Error{constructor(e,t){super(e),this.response=t}}class ji extends Bi{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ei.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Wn[e]!==void 0){Wn[e].push({onLoad:t,onProgress:n,onError:s});return}Wn[e]=[],Wn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Wn[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let m=0;const p=new ReadableStream({start(A){x();function x(){h.read().then(({done:b,value:I})=>{if(b)A.close();else{m+=I.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:f});for(let M=0,B=u.length;M<B;M++){const F=u[M];F.onProgress&&F.onProgress(P)}A.enqueue(I),x()}},b=>{A.error(b)})}}});return new Response(p)}else throw new hI(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Ei.add(e,l);const u=Wn[e];delete Wn[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=Wn[e];if(u===void 0)throw this.manager.itemError(e),l;delete Wn[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class dI extends Bi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ei.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Nr("img");function c(){u(),Ei.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Jf extends Bi{constructor(e){super(e)}load(e,t,n,s){const r=new Mt,a=new dI(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Eo extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const cc=new je,Yh=new N,Xh=new N;class Kl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kl,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yh),Xh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xh),t.updateMatrixWorld(),cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fI extends Kl{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Hs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class AI extends Eo{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new fI}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Jh=new je,lr=new N,lc=new N;class pI extends Kl{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ne(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),lr.setFromMatrixPosition(e.matrixWorld),n.position.copy(lr),lc.copy(n.position),lc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(lc),n.updateMatrixWorld(),s.makeTranslation(-lr.x,-lr.y,-lr.z),Jh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jh)}}class gI extends Eo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new pI}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class mI extends Kl{constructor(){super(new Gl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yl extends Eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new mI}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Zf extends Eo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class _I extends Bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ei.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ei.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ei.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ei.add(e,c),r.manager.itemStart(e)}}class Xl{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Zh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Zh(){return(typeof performance>"u"?Date:performance).now()}class bI{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){ln.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const a=this._workIndex*r;ln.multiplyQuaternionsFlat(e,a,e,t,e,n),ln.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*s}}}const Jl="\\[\\]\\.:\\/",EI=new RegExp("["+Jl+"]","g"),Zl="[^"+Jl+"]",xI="[^"+Jl.replace("\\.","")+"]",vI=/((?:WC+[\/:])*)/.source.replace("WC",Zl),II=/(WCOD+)?/.source.replace("WCOD",xI),CI=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zl),yI=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zl),SI=new RegExp("^"+vI+II+CI+yI+"$"),MI=["material","materials","bones","map"];class wI{constructor(e,t,n){const s=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(EI,"")}static parseTrackName(e){const t=SI.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);MI.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=wI;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class BI{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:vs,endingEnd:vs};for(let l=0;l!==a;++l){const u=r[l].createInterpolant(null);o[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=r_,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case o_:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulateAdditive(o);break;case Nl:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(a),l[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const a=n===a_;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===s_){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){const o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=Is,s.endingEnd=Is):(e?s.endingStart=this.zeroSlopeAtStart?Is:vs:s.endingStart=Ya,t?s.endingEnd=this.zeroSlopeAtEnd?Is:vs:s.endingEnd=Ya)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const TI=new Float32Array(1);class $h extends wi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){const d=s[h],f=d.name;let g=u[f];if(g!==void 0)++g.referenceCount,a[h]=g;else{if(g=a[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const m=t&&t._propertyBindings[h].binding.parsedPath;g=new bI(rt.create(n,f,m),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[h]=g}o[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Yf(new Float32Array(2),new Float32Array(2),1,TI),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let a=typeof e=="string"?ol.findByName(s,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Nl),c!==void 0){const h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const u=new BI(this,a,t,n);return this._bindAction(u,l),this._addInactiveAction(u,o,r),u}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?ol.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class ed{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tl);const td={type:"change"},uc={type:"start"},nd={type:"end"},Sa=new Hr,id=new _i,RI=Math.cos(70*Mf.DEG2RAD);class sd extends wi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:es.ROTATE,MIDDLE:es.DOLLY,RIGHT:es.PAN},this.touches={ONE:ts.ROTATE,TWO:ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(E){E.addEventListener("keydown",ue),this._domElementKeyEvents=E},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ue),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(td),n.update(),r=s.NONE},this.update=function(){const E=new N,Y=new ln().setFromUnitVectors(e.up,new N(0,1,0)),X=Y.clone().invert(),te=new N,he=new ln,Re=new N,ke=2*Math.PI;return function(vt=null){const Ze=n.object.position;E.copy(Ze).sub(n.target),E.applyQuaternion(Y),o.setFromVector3(E),n.autoRotate&&r===s.NONE&&U(v(vt)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let It=n.minAzimuthAngle,gt=n.maxAzimuthAngle;isFinite(It)&&isFinite(gt)&&(It<-Math.PI?It+=ke:It>Math.PI&&(It-=ke),gt<-Math.PI?gt+=ke:gt>Math.PI&&(gt-=ke),It<=gt?o.theta=Math.max(It,Math.min(gt,o.theta)):o.theta=o.theta>(It+gt)/2?Math.max(It,o.theta):Math.min(gt,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let ri=!1;if(n.zoomToCursor&&M||n.object.isOrthographicCamera)o.radius=Ae(o.radius);else{const Pt=o.radius;o.radius=Ae(o.radius*l),ri=Pt!=o.radius}if(E.setFromSpherical(o),E.applyQuaternion(X),Ze.copy(n.target).add(E),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0)),n.zoomToCursor&&M){let Pt=null;if(n.object.isPerspectiveCamera){const On=E.length();Pt=Ae(On*l);const Ti=On-Pt;n.object.position.addScaledVector(I,Ti),n.object.updateMatrixWorld(),ri=!!Ti}else if(n.object.isOrthographicCamera){const On=new N(P.x,P.y,0);On.unproject(n.object);const Ti=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),ri=Ti!==n.object.zoom;const $s=new N(P.x,P.y,0);$s.unproject(n.object),n.object.position.sub($s).add(On),n.object.updateMatrixWorld(),Pt=E.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Pt!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Pt).add(n.object.position):(Sa.origin.copy(n.object.position),Sa.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Sa.direction))<RI?e.lookAt(n.target):(id.setFromNormalAndCoplanarPoint(n.object.up,n.target),Sa.intersectPlane(id,n.target))))}else if(n.object.isOrthographicCamera){const Pt=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),Pt!==n.object.zoom&&(n.object.updateProjectionMatrix(),ri=!0)}return l=1,M=!1,ri||te.distanceToSquared(n.object.position)>a||8*(1-he.dot(n.object.quaternion))>a||Re.distanceToSquared(n.target)>a?(n.dispatchEvent(td),te.copy(n.object.position),he.copy(n.object.quaternion),Re.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",_e),n.domElement.removeEventListener("pointerdown",re),n.domElement.removeEventListener("pointercancel",_),n.domElement.removeEventListener("wheel",J),n.domElement.removeEventListener("pointermove",C),n.domElement.removeEventListener("pointerup",_),n.domElement.getRootNode().removeEventListener("keydown",le,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ue),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new ed,c=new ed;let l=1;const u=new N,h=new Ne,d=new Ne,f=new Ne,g=new Ne,m=new Ne,p=new Ne,A=new Ne,x=new Ne,b=new Ne,I=new N,P=new Ne;let M=!1;const B=[],F={};let S=!1;function v(E){return E!==null?2*Math.PI/60*n.autoRotateSpeed*E:2*Math.PI/60/60*n.autoRotateSpeed}function T(E){const Y=Math.abs(E*.01);return Math.pow(.95,n.zoomSpeed*Y)}function U(E){c.theta-=E}function Q(E){c.phi-=E}const q=function(){const E=new N;return function(X,te){E.setFromMatrixColumn(te,0),E.multiplyScalar(-X),u.add(E)}}(),ee=function(){const E=new N;return function(X,te){n.screenSpacePanning===!0?E.setFromMatrixColumn(te,1):(E.setFromMatrixColumn(te,0),E.crossVectors(n.object.up,E)),E.multiplyScalar(X),u.add(E)}}(),W=function(){const E=new N;return function(X,te){const he=n.domElement;if(n.object.isPerspectiveCamera){const Re=n.object.position;E.copy(Re).sub(n.target);let ke=E.length();ke*=Math.tan(n.object.fov/2*Math.PI/180),q(2*X*ke/he.clientHeight,n.object.matrix),ee(2*te*ke/he.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(q(X*(n.object.right-n.object.left)/n.object.zoom/he.clientWidth,n.object.matrix),ee(te*(n.object.top-n.object.bottom)/n.object.zoom/he.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function j(E){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=E:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(E){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=E:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function de(E,Y){if(!n.zoomToCursor)return;M=!0;const X=n.domElement.getBoundingClientRect(),te=E-X.left,he=Y-X.top,Re=X.width,ke=X.height;P.x=te/Re*2-1,P.y=-(he/ke)*2+1,I.set(P.x,P.y,1).unproject(n.object).sub(n.object.position).normalize()}function Ae(E){return Math.max(n.minDistance,Math.min(n.maxDistance,E))}function be(E){h.set(E.clientX,E.clientY)}function Te(E){de(E.clientX,E.clientX),A.set(E.clientX,E.clientY)}function Oe(E){g.set(E.clientX,E.clientY)}function ne(E){d.set(E.clientX,E.clientY),f.subVectors(d,h).multiplyScalar(n.rotateSpeed);const Y=n.domElement;U(2*Math.PI*f.x/Y.clientHeight),Q(2*Math.PI*f.y/Y.clientHeight),h.copy(d),n.update()}function ce(E){x.set(E.clientX,E.clientY),b.subVectors(x,A),b.y>0?j(T(b.y)):b.y<0&&k(T(b.y)),A.copy(x),n.update()}function ge(E){m.set(E.clientX,E.clientY),p.subVectors(m,g).multiplyScalar(n.panSpeed),W(p.x,p.y),g.copy(m),n.update()}function fe(E){de(E.clientX,E.clientY),E.deltaY<0?k(T(E.deltaY)):E.deltaY>0&&j(T(E.deltaY)),n.update()}function Ce(E){let Y=!1;switch(E.code){case n.keys.UP:E.ctrlKey||E.metaKey||E.shiftKey?Q(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:E.ctrlKey||E.metaKey||E.shiftKey?Q(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:E.ctrlKey||E.metaKey||E.shiftKey?U(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:E.ctrlKey||E.metaKey||E.shiftKey?U(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):W(-n.keyPanSpeed,0),Y=!0;break}Y&&(E.preventDefault(),n.update())}function we(E){if(B.length===1)h.set(E.pageX,E.pageY);else{const Y=Me(E),X=.5*(E.pageX+Y.x),te=.5*(E.pageY+Y.y);h.set(X,te)}}function Le(E){if(B.length===1)g.set(E.pageX,E.pageY);else{const Y=Me(E),X=.5*(E.pageX+Y.x),te=.5*(E.pageY+Y.y);g.set(X,te)}}function Ye(E){const Y=Me(E),X=E.pageX-Y.x,te=E.pageY-Y.y,he=Math.sqrt(X*X+te*te);A.set(0,he)}function L(E){n.enableZoom&&Ye(E),n.enablePan&&Le(E)}function w(E){n.enableZoom&&Ye(E),n.enableRotate&&we(E)}function R(E){if(B.length==1)d.set(E.pageX,E.pageY);else{const X=Me(E),te=.5*(E.pageX+X.x),he=.5*(E.pageY+X.y);d.set(te,he)}f.subVectors(d,h).multiplyScalar(n.rotateSpeed);const Y=n.domElement;U(2*Math.PI*f.x/Y.clientHeight),Q(2*Math.PI*f.y/Y.clientHeight),h.copy(d)}function G(E){if(B.length===1)m.set(E.pageX,E.pageY);else{const Y=Me(E),X=.5*(E.pageX+Y.x),te=.5*(E.pageY+Y.y);m.set(X,te)}p.subVectors(m,g).multiplyScalar(n.panSpeed),W(p.x,p.y),g.copy(m)}function H(E){const Y=Me(E),X=E.pageX-Y.x,te=E.pageY-Y.y,he=Math.sqrt(X*X+te*te);x.set(0,he),b.set(0,Math.pow(x.y/A.y,n.zoomSpeed)),j(b.y),A.copy(x);const Re=(E.pageX+Y.x)*.5,ke=(E.pageY+Y.y)*.5;de(Re,ke)}function se(E){n.enableZoom&&H(E),n.enablePan&&G(E)}function ie(E){n.enableZoom&&H(E),n.enableRotate&&R(E)}function re(E){n.enabled!==!1&&(B.length===0&&(n.domElement.setPointerCapture(E.pointerId),n.domElement.addEventListener("pointermove",C),n.domElement.addEventListener("pointerup",_)),!xe(E)&&(ze(E),E.pointerType==="touch"?Ie(E):D(E)))}function C(E){n.enabled!==!1&&(E.pointerType==="touch"?oe(E):V(E))}function _(E){switch(Pe(E),B.length){case 0:n.domElement.releasePointerCapture(E.pointerId),n.domElement.removeEventListener("pointermove",C),n.domElement.removeEventListener("pointerup",_),n.dispatchEvent(nd),r=s.NONE;break;case 1:const Y=B[0],X=F[Y];Ie({pointerId:Y,pageX:X.x,pageY:X.y});break}}function D(E){let Y;switch(E.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case es.DOLLY:if(n.enableZoom===!1)return;Te(E),r=s.DOLLY;break;case es.ROTATE:if(E.ctrlKey||E.metaKey||E.shiftKey){if(n.enablePan===!1)return;Oe(E),r=s.PAN}else{if(n.enableRotate===!1)return;be(E),r=s.ROTATE}break;case es.PAN:if(E.ctrlKey||E.metaKey||E.shiftKey){if(n.enableRotate===!1)return;be(E),r=s.ROTATE}else{if(n.enablePan===!1)return;Oe(E),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(uc)}function V(E){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;ne(E);break;case s.DOLLY:if(n.enableZoom===!1)return;ce(E);break;case s.PAN:if(n.enablePan===!1)return;ge(E);break}}function J(E){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(E.preventDefault(),n.dispatchEvent(uc),fe(K(E)),n.dispatchEvent(nd))}function K(E){const Y=E.deltaMode,X={clientX:E.clientX,clientY:E.clientY,deltaY:E.deltaY};switch(Y){case 1:X.deltaY*=16;break;case 2:X.deltaY*=100;break}return E.ctrlKey&&!S&&(X.deltaY*=10),X}function le(E){E.key==="Control"&&(S=!0,n.domElement.getRootNode().addEventListener("keyup",ae,{passive:!0,capture:!0}))}function ae(E){E.key==="Control"&&(S=!1,n.domElement.getRootNode().removeEventListener("keyup",ae,{passive:!0,capture:!0}))}function ue(E){n.enabled===!1||n.enablePan===!1||Ce(E)}function Ie(E){switch(Ue(E),B.length){case 1:switch(n.touches.ONE){case ts.ROTATE:if(n.enableRotate===!1)return;we(E),r=s.TOUCH_ROTATE;break;case ts.PAN:if(n.enablePan===!1)return;Le(E),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case ts.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;L(E),r=s.TOUCH_DOLLY_PAN;break;case ts.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;w(E),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(uc)}function oe(E){switch(Ue(E),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;R(E),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;G(E),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;se(E),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ie(E),n.update();break;default:r=s.NONE}}function _e(E){n.enabled!==!1&&E.preventDefault()}function ze(E){B.push(E.pointerId)}function Pe(E){delete F[E.pointerId];for(let Y=0;Y<B.length;Y++)if(B[Y]==E.pointerId){B.splice(Y,1);return}}function xe(E){for(let Y=0;Y<B.length;Y++)if(B[Y]==E.pointerId)return!0;return!1}function Ue(E){let Y=F[E.pointerId];Y===void 0&&(Y=new Ne,F[E.pointerId]=Y),Y.set(E.pageX,E.pageY)}function Me(E){const Y=E.pointerId===B[0]?B[1]:B[0];return F[Y]}n.domElement.addEventListener("contextmenu",_e),n.domElement.addEventListener("pointerdown",re),n.domElement.addEventListener("pointercancel",_),n.domElement.addEventListener("wheel",J,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",le,{passive:!0,capture:!0}),this.update()}}const DI=0,rd=2,LI=1,ad=2,PI=0,FI=1,UI=10,NI=0,$f=9,eA=15,tA=16,nA=22,iA=37,sA=43,rA=76,aA=83,oA=97,cA=100,lA=103,uA=109,hA=165,dA=166;class QI{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}}class ur{constructor(e,t,n,s){this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=s,this._offset=0}_nextUint8(){const e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){const e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){const e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){const e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){const e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){const n=this._offset;let s=0;for(;this._dataView.getUint8(this._offset)!==t&&s<e;)s++,this._offset++;return s<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,s)}}const qt=[171,75,84,88,32,50,48,187,13,10,26,10];function od(i){return typeof TextDecoder<"u"?new TextDecoder().decode(i):Buffer.from(i).toString("utf8")}function OI(i){const e=new Uint8Array(i.buffer,i.byteOffset,qt.length);if(e[0]!==qt[0]||e[1]!==qt[1]||e[2]!==qt[2]||e[3]!==qt[3]||e[4]!==qt[4]||e[5]!==qt[5]||e[6]!==qt[6]||e[7]!==qt[7]||e[8]!==qt[8]||e[9]!==qt[9]||e[10]!==qt[10]||e[11]!==qt[11])throw new Error("Missing KTX 2.0 identifier.");const t=new QI,n=17*Uint32Array.BYTES_PER_ELEMENT,s=new ur(i,qt.length,n,!0);t.vkFormat=s._nextUint32(),t.typeSize=s._nextUint32(),t.pixelWidth=s._nextUint32(),t.pixelHeight=s._nextUint32(),t.pixelDepth=s._nextUint32(),t.layerCount=s._nextUint32(),t.faceCount=s._nextUint32();const r=s._nextUint32();t.supercompressionScheme=s._nextUint32();const a=s._nextUint32(),o=s._nextUint32(),c=s._nextUint32(),l=s._nextUint32(),u=s._nextUint64(),h=s._nextUint64(),d=new ur(i,qt.length+n,3*r*8,!0);for(let j=0;j<r;j++)t.levels.push({levelData:new Uint8Array(i.buffer,i.byteOffset+d._nextUint64(),d._nextUint64()),uncompressedByteLength:d._nextUint64()});const f=new ur(i,a,o,!0),g={vendorId:f._skip(4)._nextUint16(),descriptorType:f._nextUint16(),versionNumber:f._nextUint16(),descriptorBlockSize:f._nextUint16(),colorModel:f._nextUint8(),colorPrimaries:f._nextUint8(),transferFunction:f._nextUint8(),flags:f._nextUint8(),texelBlockDimension:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],bytesPlane:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],samples:[]},m=(g.descriptorBlockSize/4-6)/4;for(let j=0;j<m;j++){const k={bitOffset:f._nextUint16(),bitLength:f._nextUint8(),channelType:f._nextUint8(),samplePosition:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&k.channelType?(k.sampleLower=f._nextInt32(),k.sampleUpper=f._nextInt32()):(k.sampleLower=f._nextUint32(),k.sampleUpper=f._nextUint32()),g.samples[j]=k}t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(g);const p=new ur(i,c,l,!0);for(;p._offset<l;){const j=p._nextUint32(),k=p._scan(j),de=od(k),Ae=p._scan(j-k.byteLength);t.keyValue[de]=de.match(/^ktx/i)?od(Ae):Ae,p._offset%4&&p._skip(4-p._offset%4)}if(h<=0)return t;const A=new ur(i,u,h,!0),x=A._nextUint16(),b=A._nextUint16(),I=A._nextUint32(),P=A._nextUint32(),M=A._nextUint32(),B=A._nextUint32(),F=[];for(let j=0;j<r;j++)F.push({imageFlags:A._nextUint32(),rgbSliceByteOffset:A._nextUint32(),rgbSliceByteLength:A._nextUint32(),alphaSliceByteOffset:A._nextUint32(),alphaSliceByteLength:A._nextUint32()});const S=u+A._offset,v=S+I,T=v+P,U=T+M,Q=new Uint8Array(i.buffer,i.byteOffset+S,I),q=new Uint8Array(i.buffer,i.byteOffset+v,P),ee=new Uint8Array(i.buffer,i.byteOffset+T,M),W=new Uint8Array(i.buffer,i.byteOffset+U,B);return t.globalData={endpointCount:x,selectorCount:b,imageDescs:F,endpointsData:Q,selectorsData:q,tablesData:ee,extendedData:W},t}function cd(i,e){if(e===c_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===nl||e===Cf){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===nl)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}const hc=new WeakMap;class kI extends Bi{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){const r=new ji(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Ct,n).catch(n)}decodeDracoFile(e,t,n,s,r=wt,a=()=>{}){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){const n=JSON.stringify(t);if(hc.has(e)){const c=hc.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s;const r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(c=>(s=c,new Promise((l,u)=>{s._callbacks[r]={resolve:l,reject:u},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),hc.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new yn;e.index&&t.setIndex(new Ot(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const s=e.attributes[n],r=s.name,a=s.array,o=s.itemSize,c=new Ot(a,o);r==="color"&&(this._assignVertexColorSpace(c,s.vertexColorSpace),c.normalized=!(a instanceof Float32Array)),t.setAttribute(r,c)}return t}_assignVertexColorSpace(e,t){if(t!==Ct)return;const n=new He;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s).convertSRGBToLinear(),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new ji(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const r=GI.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){const a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function GI(){let i,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(i)});break;case"decode":const c=o.buffer,l=o.taskConfig;e.then(u=>{const h=u.draco,d=new h.Decoder;try{const f=t(h,d,new Int8Array(c),l),g=f.attributes.map(m=>m.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{h.destroy(d)}});break}};function t(a,o,c,l){const u=l.attributeIDs,h=l.attributeTypes;let d,f;const g=o.GetEncodedGeometryType(c);if(g===a.TRIANGULAR_MESH)d=new a.Mesh,f=o.DecodeArrayToMesh(c,c.byteLength,d);else if(g===a.POINT_CLOUD)d=new a.PointCloud,f=o.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const m={index:null,attributes:[]};for(const p in u){const A=self[h[p]];let x,b;if(l.useUniqueIDs)b=u[p],x=o.GetAttributeByUniqueId(d,b);else{if(b=o.GetAttributeId(d,a[u[p]]),b===-1)continue;x=o.GetAttribute(d,b)}const I=s(a,o,d,p,A,x);p==="color"&&(I.vertexColorSpace=l.vertexColorSpace),m.attributes.push(I)}return g===a.TRIANGULAR_MESH&&(m.index=n(a,o,d)),a.destroy(d),m}function n(a,o,c){const u=c.num_faces()*3,h=u*4,d=a._malloc(h);o.GetTrianglesUInt32Array(c,h,d);const f=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:f,itemSize:1}}function s(a,o,c,l,u,h){const d=h.num_components(),g=c.num_points()*d,m=g*u.BYTES_PER_ELEMENT,p=r(a,u),A=a._malloc(m);o.GetAttributeDataArrayForAllPoints(c,h,p,m,A);const x=new u(a.HEAPF32.buffer,A,g).slice();return a._free(A),{name:l,array:x,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}class HI extends Bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new jI(t)}),this.register(function(t){return new KI(t)}),this.register(function(t){return new iC(t)}),this.register(function(t){return new sC(t)}),this.register(function(t){return new rC(t)}),this.register(function(t){return new XI(t)}),this.register(function(t){return new JI(t)}),this.register(function(t){return new ZI(t)}),this.register(function(t){return new $I(t)}),this.register(function(t){return new qI(t)}),this.register(function(t){return new eC(t)}),this.register(function(t){return new YI(t)}),this.register(function(t){return new nC(t)}),this.register(function(t){return new tC(t)}),this.register(function(t){return new VI(t)}),this.register(function(t){return new aC(t)}),this.register(function(t){return new oC(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Mr.extractUrlBase(e);a=Mr.resolveURL(l,this.path)}else a=Mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ji(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===fA){try{a[Xe.KHR_BINARY_GLTF]=new cC(e)}catch(h){s&&s(h);return}r=JSON.parse(a[Xe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new xC(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Xe.KHR_MATERIALS_UNLIT:a[h]=new WI;break;case Xe.KHR_DRACO_MESH_COMPRESSION:a[h]=new lC(r,this.dracoLoader);break;case Xe.KHR_TEXTURE_TRANSFORM:a[h]=new uC;break;case Xe.KHR_MESH_QUANTIZATION:a[h]=new hC;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function zI(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class VI{constructor(e){this.parser=e,this.name=Xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new He(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],wt);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Yl(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new gI(u),l.distance=h;break;case"spot":l=new AI(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Kn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class WI{constructor(){this.name=Xe.KHR_MATERIALS_UNLIT}getMaterialType(){return Jn}extendParams(e,t,n){const s=[];e.color=new He(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],wt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ct))}return Promise.all(s)}}class qI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class jI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(o,o)}return Promise.all(r)}}class KI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class YI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class XI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new He(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ct)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class JI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class ZI{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new He().setRGB(o[0],o[1],o[2],wt),Promise.all(r)}}class $I{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class eC{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new He().setRGB(o[0],o[1],o[2],wt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ct)),Promise.all(r)}}class tC{constructor(e){this.parser=e,this.name=Xe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class nC{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class iC{constructor(e){this.parser=e,this.name=Xe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class sC{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class rC{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class aC{constructor(e){this.name=Xe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}}class oC{constructor(e){this.name=Xe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==dn.TRIANGLES&&l.mode!==dn.TRIANGLE_STRIP&&l.mode!==dn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(const g of h){const m=new je,p=new N,A=new ln,x=new N(1,1,1),b=new Wf(g.geometry,g.material,d);for(let I=0;I<d;I++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,I),c.ROTATION&&A.fromBufferAttribute(c.ROTATION,I),c.SCALE&&x.fromBufferAttribute(c.SCALE,I),b.setMatrixAt(I,m.compose(p,A,x));for(const I in c)if(I==="_COLOR_0"){const P=c[I];b.instanceColor=new rl(P.array,P.itemSize,P.normalized)}else I!=="TRANSLATION"&&I!=="ROTATION"&&I!=="SCALE"&&g.geometry.setAttribute(I,c[I]);ut.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const fA="glTF",hr=12,ld={JSON:1313821514,BIN:5130562};class cC{constructor(e){this.name=Xe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,hr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==fA)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-hr,r=new DataView(e,hr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===ld.JSON){const l=new Uint8Array(e,hr+a,o);this.content=n.decode(l)}else if(c===ld.BIN){const l=hr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class lC{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=cl[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=cl[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=Ls[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(const g in f.attributes){const m=f.attributes[g],p=c[g];p!==void 0&&(m.normalized=p)}h(f)},o,l,wt,d)})})}}class uC{constructor(){this.name=Xe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class hC{constructor(){this.name=Xe.KHR_MESH_QUANTIZATION}}class AA extends zr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,g=e*l,m=g-l,p=-2*f+3*d,A=f-d,x=1-p,b=A-d+h;for(let I=0;I!==o;I++){const P=a[m+I+o],M=a[m+I+c]*u,B=a[g+I+o],F=a[g+I]*u;r[I]=x*P+b*M+p*B+A*F}return r}}const dC=new ln;class fC extends AA{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return dC.fromArray(r).normalize().toArray(r),r}}const dn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ls={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ud={9728:Jt,9729:Xt,9984:pf,9985:Da,9986:fr,9987:Dn},hd={33071:Yn,33648:Ha,10497:Os},dc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ai={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},AC={CUBICSPLINE:void 0,LINEAR:Ur,STEP:Fr},fc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function pC(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new jl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ti})),i.DefaultMaterial}function Oi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Kn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gC(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function mC(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _C(i){let e;const t=i.extensions&&i.extensions[Xe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ac(t.attributes):e=i.indices+":"+Ac(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Ac(i.targets[n]);return e}function Ac(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ll(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function bC(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const EC=new je;class xC{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new zI,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Jf(this.options.manager):this.textureLoader=new _I(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ji(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Oi(r,o,s),Kn(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Xe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Mr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=dc[s.type],o=Ls[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Ot(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=dc[s.type],l=Ls[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let m,p;if(f&&f!==h){const A=Math.floor(d/f),x="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+A+":"+s.count;let b=t.cache.get(x);b||(m=new l(o,A*f,s.count*f/u),b=new qv(m,f/u),t.cache.add(x,b)),p=new zl(b,c,d%f/u,g)}else o===null?m=new l(s.count*c):m=new l(o,d,s.count*c),p=new Ot(m,c,g);if(s.sparse!==void 0){const A=dc.SCALAR,x=Ls[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,I=s.sparse.values.byteOffset||0,P=new x(a[1],b,s.sparse.count*A),M=new l(a[2],I,s.sparse.count*c);o!==null&&(p=new Ot(p.array.slice(),p.itemSize,p.normalized));for(let B=0,F=P.length;B<F;B++){const S=P[B];if(p.setX(S,M[B*c]),c>=2&&p.setY(S,M[B*c+1]),c>=3&&p.setZ(S,M[B*c+2]),c>=4&&p.setW(S,M[B*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=ud[d.magFilter]||Xt,u.minFilter=ud[d.minFilter]||Dn,u.wrapS=hd[d.wrapS]||Os,u.wrapT=hd[d.wrapT]||Os,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(m){const p=new Mt(m);p.needsUpdate=!0,d(p)}),t.load(Mr.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Kn(h,a),h.userData.mimeType=a.mimeType||bC(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Xe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Xe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Xe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new jf,Pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new qf,Pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return jl}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Xe.KHR_MATERIALS_UNLIT]){const h=s[Xe.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new He(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],wt),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,Ct)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=An);const u=r.alphaMode||fc.OPAQUE;if(u===fc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===fc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Jn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ne(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==Jn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Jn){const h=r.emissiveFactor;o.emissive=new He().setRGB(h[0],h[1],h[2],wt)}return r.emissiveTexture!==void 0&&a!==Jn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ct)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Kn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Oi(s,h,r),h})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return dd(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=_C(l),h=s[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[Xe.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=dd(new yn,l,t),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?pC(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){const m=u[f],p=a[f];let A;const x=l[f];if(p.mode===dn.TRIANGLES||p.mode===dn.TRIANGLE_STRIP||p.mode===dn.TRIANGLE_FAN||p.mode===void 0)A=r.isSkinnedMesh===!0?new Kv(m,x):new St(m,x),A.isSkinnedMesh===!0&&A.normalizeSkinWeights(),p.mode===dn.TRIANGLE_STRIP?A.geometry=cd(A.geometry,Cf):p.mode===dn.TRIANGLE_FAN&&(A.geometry=cd(A.geometry,nl));else if(p.mode===dn.LINES)A=new Jv(m,x);else if(p.mode===dn.LINE_STRIP)A=new ql(m,x);else if(p.mode===dn.LINE_LOOP)A=new Zv(m,x);else if(p.mode===dn.POINTS)A=new $v(m,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(A.geometry.morphAttributes).length>0&&mC(A,r),A.name=t.createUniqueName(r.name||"mesh_"+e),Kn(A,r),p.extensions&&Oi(s,A,p),t.assignFinalMaterial(A),h.push(A)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&Oi(s,h[0],r),h[0];const d=new Qt;r.extensions&&Oi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(Mf.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Gl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new je;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Wl(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){const f=s.channels[h],g=s.samplers[f.sampler],m=f.target,p=m.node,A=s.parameters!==void 0?s.parameters[g.input]:g.input,x=s.parameters!==void 0?s.parameters[g.output]:g.output;m.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",A)),c.push(this.getDependency("accessor",x)),l.push(g),u.push(m))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],g=h[2],m=h[3],p=h[4],A=[];for(let x=0,b=d.length;x<b;x++){const I=d[x],P=f[x],M=g[x],B=m[x],F=p[x];if(I===void 0)continue;I.updateMatrix&&I.updateMatrix();const S=n._createAnimationTracks(I,P,M,B,F);if(S)for(let v=0;v<S.length;v++)A.push(S[v])}return new ol(r,void 0,A)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,EC)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Vf:l.length>1?u=new Qt:l.length===1?u=l[0]:u=new ut,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Kn(u,r),r.extensions&&Oi(n,u,r),r.matrix!==void 0){const h=new je;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Qt;n.name&&(r.name=s.createUniqueName(n.name)),Kn(r,n),n.extensions&&Oi(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,f]of s.associations)(d instanceof Pn||d instanceof Mt)&&h.set(d,f);return u.traverse(d=>{const f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];Ai[r.path]===Ai.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(Ai[r.path]){case Ai.weights:l=Vs;break;case Ai.rotation:l=Ws;break;case Ai.position:case Ai.scale:l=qs;break;default:switch(n.itemSize){case 1:l=Vs;break;case 2:case 3:default:l=qs;break}break}const u=s.interpolation!==void 0?AC[s.interpolation]:Ur,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+Ai[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ll(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Ws?fC:AA;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function vC(i,e,t){const n=e.attributes,s=new si;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){const u=ll(Ls[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new N,c=new N;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const m=ll(Ls[d.componentType]);c.multiplyScalar(m)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Un;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function dd(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=cl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return et.workingColorSpace!==wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),Kn(i,e),vC(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?gC(i,e.targets,t):i})}class IC{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){const t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){const n=this.workersResolve[e];if(n&&n(t),this.queue.length){const{resolve:s,msg:r,transfer:a}=this.queue.shift();this.workersResolve[e]=s,this.workers[e].postMessage(r,a)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{const s=this._getIdleWorker();s!==-1?(this._initWorker(s),this.workerStatus|=1<<s,this.workersResolve[s]=n,this.workers[s].postMessage(e,t)):this.queue.push({resolve:n,msg:e,transfer:t})})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}}let pc,jn,ul;const gc={env:{emscripten_notify_memory_growth:function(i){ul=new Uint8Array(jn.exports.memory.buffer)}}};class CC{init(){return pc||(pc=typeof fetch<"u"?fetch("data:application/wasm;base64,"+fd).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,gc)).then(this._init):WebAssembly.instantiate(Buffer.from(fd,"base64"),gc).then(this._init),pc)}_init(e){jn=e.instance,gc.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!jn)throw new Error("ZSTDDecoder: Await .init() before decoding.");const n=e.byteLength,s=jn.exports.malloc(n);ul.set(e,s),t=t||Number(jn.exports.ZSTD_findDecompressedSize(s,n));const r=jn.exports.malloc(t),a=jn.exports.ZSTD_decompress(r,t,s,n),o=ul.slice(r,r+a);return jn.exports.free(s),jn.exports.free(r),o}}const fd="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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",mc=new WeakMap;let _c=0,bc;class Ln extends Bi{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new IC,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER<"u"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}async detectSupportAsync(e){return this.workerConfig={astcSupported:await e.hasFeatureAsync("texture-compression-astc"),etc1Supported:await e.hasFeatureAsync("texture-compression-etc1"),etc2Supported:await e.hasFeatureAsync("texture-compression-etc2"),dxtSupported:await e.hasFeatureAsync("texture-compression-bc"),bptcSupported:await e.hasFeatureAsync("texture-compression-bptc"),pvrtcSupported:await e.hasFeatureAsync("texture-compression-pvrtc")},this}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature("texture-compression-astc"),etc1Supported:e.hasFeature("texture-compression-etc1"),etc2Supported:e.hasFeature("texture-compression-etc2"),dxtSupported:e.hasFeature("texture-compression-bc"),bptcSupported:e.hasFeature("texture-compression-bptc"),pvrtcSupported:e.hasFeature("texture-compression-pvrtc")}:this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},this}init(){if(!this.transcoderPending){const e=new ji(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);const t=e.loadAsync("basis_transcoder.js"),n=new ji(this.manager);n.setPath(this.transcoderPath),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials);const s=n.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([t,s]).then(([r,a])=>{const o=Ln.BasisWorker.toString(),c=["/* constants */","let _EngineFormat = "+JSON.stringify(Ln.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(Ln.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(Ln.BasisFormat),"/* basis_transcoder.js */",r,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c])),this.transcoderBinary=a,this.workerPool.setWorkerCreator(()=>{const l=new Worker(this.workerSourceURL),u=this.transcoderBinary.slice(0);return l.postMessage({type:"init",config:this.workerConfig,transcoderBinary:u},[u]),l})}),_c>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),_c++}return this.transcoderPending}load(e,t,n,s){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");const r=new ji(this.manager);r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials),r.load(e,a=>{if(mc.has(a))return mc.get(a).promise.then(t).catch(s);this._createTexture(a).then(o=>t?t(o):null).catch(s)},n,s)}_createTextureFrom(e,t){const{faces:n,width:s,height:r,format:a,type:o,error:c,dfdFlags:l}=e;if(o==="error")return Promise.reject(c);let u;if(t.faceCount===6)u=new tI(n,a,Et);else{const h=n[0].mipmaps;u=t.layerCount>1?new eI(h,s,r,t.layerCount,a,Et):new bo(h,s,r,a,Et)}return u.minFilter=n[0].mipmaps.length===1?Xt:Dn,u.magFilter=Xt,u.generateMipmaps=!1,u.needsUpdate=!0,u.colorSpace=pA(t),u.premultiplyAlpha=!!(l&LI),u}async _createTexture(e,t={}){const n=OI(new Uint8Array(e));if(n.vkFormat!==NI)return SC(n);const s=t,r=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:e,taskConfig:s},[e])).then(a=>this._createTextureFrom(a.data,n));return mc.set(e,{promise:r}),r}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),_c--,this}}Ln.BasisFormat={ETC1S:0,UASTC_4x4:1};Ln.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16};Ln.EngineFormat={RGBAFormat:Dt,RGBA_ASTC_4x4_Format:Ka,RGBA_BPTC_Format:Cr,RGBA_ETC2_EAC_Format:ja,RGBA_PVRTC_4BPPV1_Format:Va,RGBA_S3TC_DXT5_Format:Ir,RGB_ETC1_Format:Wa,RGB_ETC2_Format:qa,RGB_PVRTC_4BPPV1_Format:za,RGBA_S3TC_DXT1_Format:vr};Ln.BasisWorker=function(){let i,e,t;const n=_EngineFormat,s=_TranscoderFormat,r=_BasisFormat;self.addEventListener("message",function(g){const m=g.data;switch(m.type){case"init":i=m.config,a(m.transcoderBinary);break;case"transcode":e.then(()=>{try{const{faces:p,buffers:A,width:x,height:b,hasAlpha:I,format:P,dfdFlags:M}=o(m.buffer);self.postMessage({type:"transcode",id:m.id,faces:p,width:x,height:b,hasAlpha:I,format:P,dfdFlags:M},A)}catch(p){console.error(p),self.postMessage({type:"error",id:m.id,error:p.message})}});break}});function a(g){e=new Promise(m=>{t={wasmBinary:g,onRuntimeInitialized:m},BASIS(t)}).then(()=>{t.initializeBasis(),t.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function o(g){const m=new t.KTX2File(new Uint8Array(g));function p(){m.close(),m.delete()}if(!m.isValid())throw p(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");const A=m.isUASTC()?r.UASTC_4x4:r.ETC1S,x=m.getWidth(),b=m.getHeight(),I=m.getLayers()||1,P=m.getLevels(),M=m.getFaces(),B=m.getHasAlpha(),F=m.getDFDFlags(),{transcoderFormat:S,engineFormat:v}=h(A,x,b,B);if(!x||!b||!P)throw p(),new Error("THREE.KTX2Loader:	Invalid texture");if(!m.startTranscoding())throw p(),new Error("THREE.KTX2Loader: .startTranscoding failed");const T=[],U=[];for(let Q=0;Q<M;Q++){const q=[];for(let ee=0;ee<P;ee++){const W=[];let j,k;for(let Ae=0;Ae<I;Ae++){const be=m.getImageLevelInfo(ee,Ae,Q);Q===0&&ee===0&&Ae===0&&(be.origWidth%4!==0||be.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),P>1?(j=be.origWidth,k=be.origHeight):(j=be.width,k=be.height);const Te=new Uint8Array(m.getImageTranscodedSizeInBytes(ee,Ae,0,S));if(!m.transcodeImage(Te,ee,Ae,Q,S,0,-1,-1))throw p(),new Error("THREE.KTX2Loader: .transcodeImage failed.");W.push(Te)}const de=f(W);q.push({data:de,width:j,height:k}),U.push(de.buffer)}T.push({mipmaps:q,width:x,height:b,format:v})}return p(),{faces:T,buffers:U,width:x,height:b,hasAlpha:B,format:v,dfdFlags:F}}const c=[{if:"astcSupported",basisFormat:[r.UASTC_4x4],transcoderFormat:[s.ASTC_4x4,s.ASTC_4x4],engineFormat:[n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[s.BC7_M5,s.BC7_M5],engineFormat:[n.RGBA_BPTC_Format,n.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[s.BC1,s.BC3],engineFormat:[n.RGBA_S3TC_DXT1_Format,n.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[s.ETC1,s.ETC2],engineFormat:[n.RGB_ETC2_Format,n.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[s.ETC1],engineFormat:[n.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[s.PVRTC1_4_RGB,s.PVRTC1_4_RGBA],engineFormat:[n.RGB_PVRTC_4BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],l=c.sort(function(g,m){return g.priorityETC1S-m.priorityETC1S}),u=c.sort(function(g,m){return g.priorityUASTC-m.priorityUASTC});function h(g,m,p,A){let x,b;const I=g===r.ETC1S?l:u;for(let P=0;P<I.length;P++){const M=I[P];if(i[M.if]&&M.basisFormat.includes(g)&&!(A&&M.transcoderFormat.length<2)&&!(M.needsPowerOfTwo&&!(d(m)&&d(p))))return x=M.transcoderFormat[A?1:0],b=M.engineFormat[A?1:0],{transcoderFormat:x,engineFormat:b}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),x=s.RGBA32,b=n.RGBAFormat,{transcoderFormat:x,engineFormat:b}}function d(g){return g<=2?!0:(g&g-1)===0&&g!==0}function f(g){if(g.length===1)return g[0];let m=0;for(let x=0;x<g.length;x++){const b=g[x];m+=b.byteLength}const p=new Uint8Array(m);let A=0;for(let x=0;x<g.length;x++){const b=g[x];p.set(b,A),A+=b.byteLength}return p}};const yC=new Set([Dt,Vi,bi]),Ec={[uA]:Dt,[oA]:Dt,[iA]:Dt,[sA]:Dt,[lA]:Vi,[aA]:Vi,[tA]:Vi,[nA]:Vi,[cA]:bi,[rA]:bi,[eA]:bi,[$f]:bi,[dA]:Pr,[hA]:Pr},xc={[uA]:Zt,[oA]:$n,[iA]:Et,[sA]:Et,[lA]:Zt,[aA]:$n,[tA]:Et,[nA]:Et,[cA]:Zt,[rA]:$n,[eA]:Et,[$f]:Et,[dA]:Et,[hA]:Et};async function SC(i){const{vkFormat:e}=i;if(Ec[e]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");let t;i.supercompressionScheme===rd&&(bc||(bc=new Promise(async r=>{const a=new CC;await a.init(),r(a)})),t=await bc);const n=[];for(let r=0;r<i.levels.length;r++){const a=Math.max(1,i.pixelWidth>>r),o=Math.max(1,i.pixelHeight>>r),c=i.pixelDepth?Math.max(1,i.pixelDepth>>r):0,l=i.levels[r];let u;if(i.supercompressionScheme===DI)u=l.levelData;else if(i.supercompressionScheme===rd)u=t.decode(l.levelData,l.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let h;xc[e]===Zt?h=new Float32Array(u.buffer,u.byteOffset,u.byteLength/Float32Array.BYTES_PER_ELEMENT):xc[e]===$n?h=new Uint16Array(u.buffer,u.byteOffset,u.byteLength/Uint16Array.BYTES_PER_ELEMENT):h=u,n.push({data:h,width:a,height:o,depth:c})}let s;if(yC.has(Ec[e]))s=i.pixelDepth===0?new Vl(n[0].data,i.pixelWidth,i.pixelHeight):new Rf(n[0].data,i.pixelWidth,i.pixelHeight,i.pixelDepth);else{if(i.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");s=new bo(n,i.pixelWidth,i.pixelHeight)}return s.mipmaps=n,s.type=xc[e],s.format=Ec[e],s.colorSpace=pA(i),s.needsUpdate=!0,Promise.resolve(s)}function pA(i){const e=i.dataFormatDescriptor[0];return e.colorPrimaries===FI?e.transferFunction===ad?Ct:wt:e.colorPrimaries===UI?e.transferFunction===ad?mo:Gr:(e.colorPrimaries===PI||console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`),Tn)}var wr=function(){var i=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(u){u.preventDefault(),n(++i%e.children.length)},!1);function t(u){return e.appendChild(u.dom),u}function n(u){for(var h=0;h<e.children.length;h++)e.children[h].style.display=h===u?"block":"none";i=u}var s=(performance||Date).now(),r=s,a=0,o=t(new wr.Panel("FPS","#0ff","#002")),c=t(new wr.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=t(new wr.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){s=(performance||Date).now()},end:function(){a++;var u=(performance||Date).now();if(c.update(u-s,200),u>=r+1e3&&(o.update(a*1e3/(u-r),100),r=u,a=0,l)){var h=performance.memory;l.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return u},update:function(){s=this.end()},domElement:e,setMode:n}};wr.Panel=function(i,e,t){var n=1/0,s=0,r=Math.round,a=r(window.devicePixelRatio||1),o=80*a,c=48*a,l=3*a,u=2*a,h=3*a,d=15*a,f=74*a,g=30*a,m=document.createElement("canvas");m.width=o,m.height=c,m.style.cssText="width:80px;height:48px";var p=m.getContext("2d");return p.font="bold "+9*a+"px Helvetica,Arial,sans-serif",p.textBaseline="top",p.fillStyle=t,p.fillRect(0,0,o,c),p.fillStyle=e,p.fillText(i,l,u),p.fillRect(h,d,f,g),p.fillStyle=t,p.globalAlpha=.9,p.fillRect(h,d,f,g),{dom:m,update:function(A,x){n=Math.min(n,A),s=Math.max(s,A),p.fillStyle=t,p.globalAlpha=1,p.fillRect(0,0,o,d),p.fillStyle=e,p.fillText(r(A)+" "+i+" ("+r(n)+"-"+r(s)+")",l,u),p.drawImage(m,h+a,d,f-a,g,h,d,f-a,g),p.fillRect(h+f-a,d,a,g),p.fillStyle=t,p.globalAlpha=.9,p.fillRect(h+f-a,d,a,r((1-A/x)*g))}}};var MC=function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?e:i,r,a=WebAssembly.instantiate(o(s),{}).then(function(A){r=A.instance,r.exports.__wasm_call_ctors()});function o(A){for(var x=new Uint8Array(A.length),b=0;b<A.length;++b){var I=A.charCodeAt(b);x[b]=I>96?I-97:I>64?I-39:I+4}for(var P=0,b=0;b<A.length;++b)x[P++]=x[b]<60?n[x[b]]:(x[b]-60)*64+x[++b];return x.buffer.slice(0,P)}function c(A,x,b,I,P,M){var B=r.exports.sbrk,F=b+3&-4,S=B(F*I),v=B(P.length),T=new Uint8Array(r.exports.memory.buffer);T.set(P,v);var U=A(S,b,I,v,P.length);if(U==0&&M&&M(S,F,I),x.set(T.subarray(S,S+b*I)),B(S-B(0)),U!=0)throw new Error("Malformed buffer data: "+U)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],d=0;function f(A){var x={object:new Worker(A),pending:0,requests:{}};return x.object.onmessage=function(b){var I=b.data;x.pending-=I.count,x.requests[I.id][I.action](I.value),delete x.requests[I.id]},x}function g(A){for(var x="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(s))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+p.toString(),b=new Blob([x],{type:"text/javascript"}),I=URL.createObjectURL(b),P=0;P<A;++P)h[P]=f(I);URL.revokeObjectURL(I)}function m(A,x,b,I,P){for(var M=h[0],B=1;B<h.length;++B)h[B].pending<M.pending&&(M=h[B]);return new Promise(function(F,S){var v=new Uint8Array(b),T=d++;M.pending+=A,M.requests[T]={resolve:F,reject:S},M.object.postMessage({id:T,count:A,size:x,source:v,mode:I,filter:P},[v.buffer])})}function p(A){a.then(function(){var x=A.data;try{var b=new Uint8Array(x.count*x.size);c(r.exports[x.mode],b,x.count,x.size,x.source,r.exports[x.filter]),self.postMessage({id:x.id,count:x.count,action:"resolve",value:b},[b.buffer])}catch(I){self.postMessage({id:x.id,count:x.count,action:"reject",value:I})}})}return{ready:a,supported:!0,useWorkers:function(A){g(A)},decodeVertexBuffer:function(A,x,b,I,P){c(r.exports.meshopt_decodeVertexBuffer,A,x,b,I,r.exports[l[P]])},decodeIndexBuffer:function(A,x,b,I){c(r.exports.meshopt_decodeIndexBuffer,A,x,b,I)},decodeIndexSequence:function(A,x,b,I){c(r.exports.meshopt_decodeIndexSequence,A,x,b,I)},decodeGltfBuffer:function(A,x,b,I,P,M){c(r.exports[u[P]],A,x,b,I,r.exports[l[M]])},decodeGltfBufferAsync:function(A,x,b,I,P){return h.length>0?m(A,x,b,u[I],l[P]):a.then(function(){var M=new Uint8Array(A*x);return c(r.exports[u[I]],M,A,x,b,r.exports[l[P]]),M})}}}();class wC{constructor(e){Be(this,"type");Be(this,"loader");this.type="gltf",this.loader=new HI().setCrossOrigin("anonymous").setDRACOLoader(new kI).setKTX2Loader(new Ln().detectSupport(e)).setMeshoptDecoder(MC)}resolve(e){return new Promise(t=>{this.loader.load(e.url,n=>{t(Object.assign(e,{gltf:n}))})})}get(e){return e.gltf}}class BC{constructor(e){Be(this,"type");Be(this,"renderer");Be(this,"loader");this.type="texture",this.renderer=e,this.loader=new Jf}resolve(e){return new Promise(t=>{this.loader.load(e.url,n=>{n.needsUpdate=!0,t(Object.assign(e,{texture:n}))})})}get(e){var n;const t=(n=e.texture)==null?void 0:n.clone();return t&&(t.needsUpdate=!0),t}}class TC{constructor(){Be(this,"type");this.type="image"}resolve(e){return new Promise(t=>{const n=new Image;n.onload=()=>{t(Object.assign(e,{image:n}))},n.src=e.url})}get(e){return e.image}}class RC{constructor(e,t){Be(this,"MAX_RESOLUTION",2);Be(this,"MIN_RESOLUTION",.5);Be(this,"FPS_STORAGE",100);Be(this,"FPS_LIMIT",29);Be(this,"FPS_PRECISION",10);Be(this,"LOW_FPS_FRAME_STEP",10);Be(this,"HIGH_FPS_FRAME_STEP",50);Be(this,"RES_PENALTY_RATE",.95);Be(this,"RES_GAIN_RATE_1",1.01);Be(this,"RES_GAIN_RATE_2",1.02);this.clock=new Xl,this.renderer=e,this.pixelRatio=t||window.devicePixelRatio||1,this.lastFrameTimes=[],this.frames=0,this.fps=0}update(){this.calculateFPS(),this.handleFPS()}setPixelRatio(e,t=null,n=null){this.pixelRatio=e,this.renderer.setPixelRatio(this.pixelRatio),t&&(this.MAX_RESOLUTION=t),n&&(this.MIN_RESOLUTION=n)}calculateFPS(){this.lastFrameTimes.push(this.clock.getDelta()),this.lastFrameTimes.length>this.FPS_STORAGE&&this.lastFrameTimes.shift(),this.frames++;let e=this.lastFrameTimes.reduce((t,n)=>t+=n)/this.lastFrameTimes.length;this.fps=e>0?1/e:this.FPS_LIMIT}handleFPS(){this.frames%this.LOW_FPS_FRAME_STEP===0&&this.fps<this.FPS_LIMIT&&(this.pixelRatio*=this.RES_PENALTY_RATE,this.pixelRatio=Math.max(this.pixelRatio,this.MIN_RESOLUTION),this.renderer.setPixelRatio(Math.round(this.pixelRatio*this.FPS_PRECISION)/this.FPS_PRECISION)),this.frames%this.HIGH_FPS_FRAME_STEP===0&&this.fps>this.FPS_LIMIT&&(this.pixelRatio*=this.pixelRatio>=1?this.RES_GAIN_RATE_1:this.RES_GAIN_RATE_2,this.pixelRatio=Math.min(this.pixelRatio,this.MAX_RESOLUTION),this.renderer.setPixelRatio(Math.round(this.pixelRatio*this.FPS_PRECISION)/this.FPS_PRECISION))}}class DC{constructor(){Be(this,"resolvers",[]);Be(this,"manifest",[])}warn(...e){console.warn("[Preloader]",...e)}init(...e){e.forEach(t=>{t.hasOwnProperty("type")||this.warn("init()","This resolver should have a `type` property",t),typeof t.resolve!="function"&&this.warn("init()","This resolver should implement a `resolve` function",t),typeof t.get!="function"&&this.warn("init()","This resolver should implement a `get` function",t),this.resolvers.push(t)})}load(e,t="/",n=null){if(!Array.isArray(e))return this.warn("load()","manifest should be an array",e),Promise.reject("Manifest is not an array");const s=e.map(o=>{let c=o.url;const l=c.startsWith("data:");return!(c.startsWith("http://")||c.startsWith("https://"))&&!l&&(c=o.cdn&&n?n+o.url:t+o.url),l||(c+="?v="+(o.version||"1")),{...o,url:c}});this.manifest=this.manifest.concat(s);const r=new Set;for(const o of s){if(r.has(o.id)){this.warn("load()",`This id is used twice in the manifest: \`${o.id}\``);break}r.add(o.id)}const a=s.map(o=>{const c=this.getResolverForType(o.type);if(!c)return this.warn(`No resolver found for type "${o.type}"`),Promise.reject(`No resolver found for type "${o.type}"`);const l=c.resolve(o);return typeof l.then!="function"&&this.warn(`Resolver for type "${o.type}" does not return a promise in its resolve method, check its implementation`),l});return Promise.all(a)}getResolverForType(e){const t=this.resolvers.filter(n=>n.type===e);return t.length?t[0]:null}get(e,...t){const n=this.manifest.filter(s=>s.id===e);if(n.length){const s=n[0],r=this.getResolverForType(s.type);return r==null?void 0:r.get(s,...t)}return null}}class gA{constructor(e,t,n=window.devicePixelRatio/2){Be(this,"scene");Be(this,"camera");Be(this,"renderer");Be(this,"controls");Be(this,"preloader",new DC);Be(this,"stats",new wr);Be(this,"fpsHandler");Be(this,"lights",[]);Be(this,"objects",[]);Be(this,"afterLoad");Be(this,"domContainer");Be(this,"domWidth");Be(this,"domHeight");if(!e)throw new Error("No container element provided");this.domContainer=e,this.domWidth=e.clientWidth,this.domHeight=e.clientHeight,this.afterLoad=t,this.scene=new Wv,this.camera=new Ol,this.scene.add(this.camera),this.renderer=new Vv({antialias:!0}),this.renderer.setClearColor(16777215),this.renderer.setSize(this.domWidth,this.domWidth),this.renderer.setPixelRatio(n),this.renderer.outputColorSpace=Ct,e.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>this.resize()),this.controls=new sd(this.camera,this.renderer.domElement),this.fpsHandler=new RC(this.renderer,n),setTimeout(()=>this.setup(),0)}setCamera(e){this.camera=e}async setup(){await this.setupCamera(),await this.setupControls(),await this.setupComposer(),await this.setupLights(),await this.setupSkybox(),await this.setupObjects(),await this.preload(),this.setupRendering(),this.resize(),this.afterLoad()}async setupCamera(){}async setupObjects(){}async setupLights(){}async setupSkybox(){}setupComposer(){}setupControls(){this.controls=new sd(this.camera,this.renderer.domElement)}setupRendering(){this.renderer.setAnimationLoop(this.render.bind(this))}async preload(){this.preloader.init(new wC(this.renderer)),this.preloader.init(new BC(this.renderer)),this.preloader.init(new TC);for(const e of this.objects)e.preload&&await e.preload()}addObject(e){this.scene.add(e),this.objects.push(e)}addLight(e){this.lights.push(e),this.scene.add(e)}async render(){var e;this.fpsHandler.update(),(e=this.controls)==null||e.update(),this.stats.update();for(const t of this.objects)t.render&&t.render();this.renderer.render(this.scene,this.camera)}resize(){this.domWidth=this.domContainer.clientWidth,this.domHeight=this.domContainer.clientHeight,this.camera.aspect=this.domWidth/this.domHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.domWidth,this.domHeight)}}class LC extends Qt{constructor(t,n=1e5){super();Be(this,"preloader");Be(this,"far");this.far=n,this.preloader=t}async preload(){await this.preloader.load([{id:"skyboxBack",type:"texture",url:"assets/three/textures/skybox/back.png"},{id:"skyboxBottom",type:"texture",url:"assets/three/textures/skybox/bottom.png"},{id:"skyboxFront",type:"texture",url:"assets/three/textures/skybox/front.png"},{id:"skyboxLeft",type:"texture",url:"assets/three/textures/skybox/left.png"},{id:"skyboxRight",type:"texture",url:"assets/three/textures/skybox/right.png"},{id:"skyboxTop",type:"texture",url:"assets/three/textures/skybox/top.png"}]);const t=["Right","Left","Top","Bottom","Front","Back"].map(r=>new Jn({side:$t,map:this.preloader.get("skybox"+r),depthWrite:!1})),n=new Ks(this.far,this.far,this.far),s=new St(n,t);this.add(s)}}class Ad extends Qt{constructor(t,n=10){super();Be(this,"clock",new Xl);const s=new ni({vertexShader:PC,fragmentShader:FC,uniforms:pd,side:An,transparent:!0}),r=48**2,a=new ut,o=new Ys(.1,1,1,4);o.translate(0,.5,0);const c=new Wf(o,s,r);for(let l=0;l<r;l++)a.position.set((Math.random()-.5)*10,0,(Math.random()-.5)*10),a.scale.setScalar(.5+Math.random()*.5),a.rotation.y=Math.random()*Math.PI,a.updateMatrix(),c.setMatrixAt(l,a.matrix);this.add(c)}render(){const t=this.clock.getDelta();pd.time.value+=.001*t}}const PC=`
varying vec2 vUv;
uniform float time;

varying vec3 vWorldPosition;


float N (vec2 st) { // https://thebookofshaders.com/10/
  return fract( sin( dot( st.xy, vec2(12.9898,78.233 ) ) ) *  43758.5453123);
}

float smoothNoise( vec2 ip ){ // https://www.youtube.com/watch?v=zXsWftRdsvU
  vec2 lv = fract( ip );
  vec2 id = floor( ip );

  lv = lv * lv * ( 3. - 2. * lv );

  float bl = N( id );
  float br = N( id + vec2( 1, 0 ));
  float b = mix( bl, br, lv.x );

  float tl = N( id + vec2( 0, 1 ));
  float tr = N( id + vec2( 1, 1 ));
  float t = mix( tl, tr, lv.x );

  return mix( b, t, lv.y );
}

void main() {

  vUv = uv;
  float t = time * 2.;

  // VERTEX POSITION

  vec4 mvPosition = vec4( position, 1.0 );
  #ifdef USE_INSTANCING
    mvPosition = instanceMatrix * mvPosition;
  #endif

  // DISPLACEMENT

  float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
  noise = pow(noise * 0.5 + 0.5, 2.) * 2.;

  // here the displacement is made stronger on the blades tips.
  float dispPower = 1. - cos( uv.y * 3.1416 * 0.5 );

  float displacement = noise * ( 0.3 * dispPower );
  mvPosition.z -= displacement;

  // get the world position of the vertex
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  vec4 modelViewPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * modelViewPosition;

}
`,FC=`
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
  	vec3 baseColor = vec3( 0.75, 1.0, 0.0 );
    float clarity = ( vUv.y * 0.875 ) + 0.125;
    // gl_FragColor = vec4( baseColor * clarity,  1.0);

    // make the grass blade transparent based on the depth
    float distance = length(vWorldPosition - cameraPosition);
    float fadeStart = 50.0;
    float fadeEnd = 150.0;
    float alpha = 1.0 - smoothstep(fadeStart, fadeEnd, distance);
    gl_FragColor = vec4( baseColor * clarity, pow(alpha, 3.0));
  }
`,pd={time:{value:0}};class UC extends Qt{constructor(t,n,s=24){super();Be(this,"preloader");Be(this,"tiles",new Qt);Be(this,"character");Be(this,"radius");Be(this,"plane",new St);this.preloader=t,this.character=n,this.radius=s}async preload(){for(let s=-this.radius/2;s<this.radius/2;s++)for(let r=-this.radius/2;r<this.radius/2;r++){if(Math.sqrt(s**2+r**2)>=this.radius/2)continue;const a=new Ad(this.preloader,10);a.position.set(s*10,0,r*10),this.tiles.add(a)}this.add(this.tiles);const t=new Ys(1e4,1e4,10,10),n=new Jn({color:11525888,side:An});this.plane=new St(t,n),this.plane.rotation.x=-Math.PI/2,this.add(this.plane),this.plane.updateMatrixWorld(),this.updateMatrixWorld()}render(){this.checkTiles(),this.movePlane(),this.tiles.children.forEach(t=>{t.render()})}movePlane(){this.plane.position.set(this.character.position.x,0,this.character.position.z)}checkTiles(){const t=Math.floor(this.character.position.x/10),n=Math.floor(this.character.position.z/10);this.tiles.children.forEach(s=>{Math.sqrt((s.position.x-t*10)**2+(s.position.z-n*10)**2)>=this.radius/2*10&&this.tiles.remove(s)});for(let s=-this.radius/2;s<this.radius/2;s++)for(let r=-this.radius/2;r<this.radius/2;r++){if(Math.sqrt(s**2+r**2)>=this.radius/2)continue;let a=!1;if(this.tiles.children.forEach(o=>{o.position.x===(t+s)*10&&o.position.z===(n+r)*10&&(a=!0)}),!a){const o=new Ad(this.preloader,10);o.position.set((t+s)*10,0,(n+r)*10),this.tiles.add(o)}}}}class NC extends Qt{constructor(t){super();Be(this,"preloader");Be(this,"clock",new Xl);Be(this,"mixer",new $h(new Qt));Be(this,"model",new Qt);Be(this,"gltf",{});Be(this,"walking",!0);this.preloader=t}async preload(){var n;await this.preloader.load([{id:"shibaInu",type:"gltf",url:"assets/three/models/shiba-inu.glb"}]),this.gltf=this.preloader.get("shibaInu"),this.model=this.gltf.scene,this.model.traverse(s=>{}),this.add(this.model),this.mixer=new $h(this.model);const t=this.gltf.animations.find(s=>s.name==="Shiba_Trot");t&&((n=this.mixer.clipAction(t))==null||n.play())}render(){var n;const t=this.clock.getDelta();this.walking&&((n=this.mixer)==null||n.update(t*1.5),this.position.z+=.2)}}class QC extends gA{constructor(t,n){super(t,n);Be(this,"cameraPerspective");Be(this,"cameraTop");Be(this,"character",new Qt);Be(this,"skybox",new St);Be(this,"ground",new St);Be(this,"lastCharacterPosition",new N);this.cameraPerspective=new Nt(75,window.innerWidth/window.innerHeight,.1,1e5),this.cameraTop=new Nt(75,window.innerWidth/window.innerHeight,.1,1e5),this.setCamera(this.cameraPerspective)}async setupCamera(){this.camera.position.set(0,50,50),this.cameraTop.position.set(0,100,0),this.cameraTop.lookAt(0,0,0)}async setupSkybox(){const t=new LC(this.preloader);this.addObject(t),this.skybox=t}async setupObjects(){this.character=new NC(this.preloader),this.addObject(this.character),this.ground=new UC(this.preloader,this.character),this.addObject(this.ground)}async setupLights(){const s=new Zf(16777215,3);this.addLight(s);const r=new Yl(16777215,1);r.position.set(0,10,0),r.shadow.mapSize.width=1024,r.shadow.mapSize.height=1024,r.shadow.camera.far=1e5,r.shadow.camera.near=.1,this.cameraPerspective.light=r,this.addLight(r)}setupControls(){super.setupControls(),this.controls.enableDamping=!0,this.controls.minPolarAngle=Math.PI*.465,this.controls.maxPolarAngle=.95*(Math.PI/2),this.controls.zoomSpeed=1,this.controls.maxDistance=25,this.controls.minDistance=15,this.controls.autoRotate=!0,this.controls.rotateSpeed=10}async render(){super.render(),this.cameraFollow(),this.lastCharacterPosition.copy(this.character.position)}toggleCamera(){this.setCamera(this.camera===this.cameraPerspective?this.cameraTop:this.cameraPerspective)}cameraFollow(){var n,s,r;const t=this.character.position.clone().sub(this.lastCharacterPosition);this.cameraTop.position.add(t),this.cameraPerspective.position.add(t),this.cameraPerspective.light.position.copy(this.cameraPerspective.position),(s=(n=this.cameraPerspective.light)==null?void 0:n.target)==null||s.position.copy(this.character.position),(r=this.controls)==null||r.target.copy(this.character.position)}}const OC={class:"w-full hero-section mt-[120px]"},kC=pe("div",{id:"three-hero"},null,-1),GC=pe("div",{class:"text-overlay w-full px-5 color-[#000]"},[pe("h1",{class:"lg:text-[64px] lg:leading-[64px] text-4xl font-bold text-center"},"Community-Driven Games"),pe("p",{class:"lg:text-2xl text-md text-center mt-5"},[xt(" Play, earn, and grow within our ecosystem of crypto games. "),pe("br"),xt(" Be a part of a game studio where players aren't just participants—they're partners. ")])],-1),HC=[kC,GC],zC=Mi({__name:"Hero",setup(i){return Or(()=>{const e=document.querySelector("#three-hero"),t=document.querySelector(".text-overlay");new QC(e,()=>{e.classList.add("fade-in"),t.classList.add("fade-in")})}),(e,t)=>(yt(),Vt("section",OC,HC))}}),VC="/images/community-gamers.png",xo=(i,e)=>{const t=i.__vccOpts||i;for(const[n,s]of e)t[n]=s;return t},WC={},qC={width:"22",height:"22",viewBox:"0 0 55 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",class:"mt-1 ml-4"},jC=pe("path",{d:"M3.16667 11H51.8333M51.8333 11L39.6667 2.66666M51.8333 11L39.6667 19.3333",stroke:"currentcolor","stroke-width":"5","stroke-linecap":"round","stroke-linejoin":"round"},null,-1),KC=[jC];function YC(i,e){return yt(),Vt("svg",qC,KC)}const Qr=xo(WC,[["render",YC]]),XC={id:"idea",class:"px-5 w-full pb-[50px] pt-[100px] lg:pt-[100px] lg:pb-[150px] bg-[#feb14b] text-black pr-5 pl-5 lg:pr-0 lg:pl-0"},JC={class:"container lg:px-0 relative"},ZC={"data-aos":"fade-up",class:"flex flex-col md:flex-col lg:flex-col xl:flex-row items-center"},$C=pe("div",{class:"w-full lg:w-full xl:w-1/2 mt-0 lg:mt-5 text-center"},[pe("div",{class:"flex justify-center items-center text-center content-center"},[pe("img",{src:VC,alt:""})])],-1),ey={class:"w-full lg:w-full xl:w-1/2"},ty=pe("p",{class:"font font-light text-[18px] lg:text-[30px] leading-7 lg:leading-[41px] mb-[50px]"},[pe("b",null,"INUGAMES"),xt(" is a community-driven game development studio that creates crypto games, from meme to casual games, that are fun, engaging, and addictive. "),pe("br"),pe("br"),xt(" Our games are designed to be easy to pick up and play, with a focus on creating memorable experiences that keep players coming back for more. ")],-1),ny={href:"#games",class:"bg-black text-white hover:bg-white hover:text-black max-w-[260px] rounded-[8px] mt-[0px] flex text-xl leading-[16px] items-center justify-between px-[20px] py-[12px] duration-[0.3s] transition-all"},iy=Mi({__name:"Idea",setup(i){return(e,t)=>(yt(),Vt("section",XC,[pe("div",JC,[pe("div",ZC,[$C,pe("div",ey,[ty,pe("a",ny,[xt(" 🕹️  Check Games! "),ht(Qr)])])])])]))}});class sy extends Qt{constructor(t,n){super();Be(this,"preloader");Be(this,"model",new Qt);Be(this,"gltf",{});this.preloader=t}async preload(){await this.preloader.load([{id:"inuCoin",type:"gltf",url:"assets/three/models/inu-coin.glb"}]),this.gltf=this.preloader.get("inuCoin"),this.model=this.gltf.scene.clone(),this.model.traverse(t=>{t instanceof St&&(t.material.metalness=.5,t.material.roughness=.25,t.material.envMapIntensity=.75,t.material.needsUpdate=!0)}),this.add(this.model)}render(){this.model.rotation.y+=.025,this.model.updateMatrix(),this.model.updateMatrixWorld(),this.updateMatrixWorld()}}class ry extends gA{constructor(t,n){super(t,n);Be(this,"cameraPerspective");Be(this,"coin");this.cameraPerspective=new Nt(45,window.innerWidth/window.innerHeight,1,100),this.setCamera(this.cameraPerspective)}async setupCamera(){this.camera.position.set(0,50,50)}async setupObjects(){this.coin=new sy(this.preloader,this.renderer),this.addObject(this.coin)}async setupLights(){const s=new Zf(16777215,4);this.addLight(s);const r=new Yl(16777215,1*2);r.position.set(10,0,3),this.addLight(r,0,0,0)}setupControls(){super.setupControls(),this.controls.enableDamping=!0,this.controls.minPolarAngle=Math.PI/2,this.controls.maxPolarAngle=Math.PI/2,this.controls.zoomSpeed=1,this.controls.maxDistance=7,this.controls.minDistance=7}}const ay={id:"token",class:"px-5 w-full pb-[50px] pt-[100px] lg:pt-[100px] lg:pb-[150px] bg-white text-black pr-5 pl-5 lg:pr-0 lg:pl-0"},oy={class:"container lg:px-0 relative"},cy={"data-aos":"fade-up",class:"flex flex-col md:flex-col lg:flex-col xl:flex-row-reverse items-center"},ly=pe("div",{class:"w-full lg:w-full xl:w-1/2 mt-0 lg:mt-5 text-center"},[pe("div",{id:"three-coin","data-aos":"fade-up"})],-1),uy={class:"font font-light text-[18px] lg:w-1/2 lg:text-[30px] leading-7 lg:leading-[41px] mb-[50px]"},hy=pe("p",{"data-aos":"fade-up"},[xt(" We have deployed "),pe("b",null,"$INU"),xt(" on the Ethereum network to power our game ecosystem. "),pe("br"),pe("br"),pe("b",null,"$INU"),xt(" is a utility token that can be used within the INUGAMES ecosystem. It can also be staked and rewards holders with each game virtual currency, and can be used for governance to decide how each game is developed. ")],-1),dy={"data-aos":"fade-up",class:"flex flex-col lg:flex-row gap-[21px] mt-[75px]"},fy={target:"_blank",href:"https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x64669032f612Ae608671853fF8871dF0889870A9",class:"bg-[#fdb04b] text-white hover:bg-black hover:text-white max-w-[260px] rounded-[8px] mt-[0px] flex text-xl leading-[16px] items-center justify-between px-[20px] py-[12px] duration-[0.3s] transition-all"},Ay=Mi({__name:"Token",setup(i){return Or(()=>{new ry(document.querySelector("#three-coin"),()=>{})}),(e,t)=>(yt(),Vt("section",ay,[pe("div",oy,[pe("div",cy,[ly,pe("div",uy,[hy,pe("div",dy,[pe("a",fy,[xt("  Buy Now! "),ht(Qr)])])])])])]))}}),py="/images/shiba-wif-hoodie.png",mA=i=>(Ep("data-v-8a9342ca"),i=i(),xp(),i),gy={id:"Community",class:"px-5 w-full pb-[50px] pt-[100px] lg:pt-[100px] lg:pb-[150px] bg-[#feb14b] text-black pr-5 pl-5 lg:pr-0 lg:pl-0"},my={class:"container lg:px-0 relative"},_y={"data-aos":"fade-up",class:"flex flex-col md:flex-col lg:flex-col xl:flex-row items-center"},by=mA(()=>pe("div",{class:"w-full lg:w-full xl:w-1/2 mt-0 lg:mt-5 text-center"},[pe("div",{class:"flex justify-center items-center text-center content-center pr-10"},[pe("img",{src:py,class:"w-full animated-image"})])],-1)),Ey={class:"w-full lg:w-full xl:w-1/2"},xy=mA(()=>pe("p",{class:"font font-light text-[18px] lg:text-[30px] leading-7 lg:leading-[41px] mb-[50px]"},[pe("h2",{"data-aos":"fade-up",class:"text-center font-bold leading-[87px] text-[50px] lg:text-[64px]"}," Join Us! "),xt(" We want our members to be able to participate in the development of our games, so we have created a community where you can share your ideas, feedback, and suggestions. "),pe("br"),pe("br"),xt(" Use our Telegram group to chat with other members, participate in polls, and get the latest updates on our games. ")],-1)),vy={href:"https://t.me/inudotgames",class:"m-auto mt-4 text-center bg-white text-black hover:bg-[#fdb04b] hover:text-black max-w-[260px] rounded-[8px] flex text-xl leading-[16px] items-center justify-between px-[20px] py-[12px] duration-[0.3s] transition-all"},Iy=Mi({__name:"Community",setup(i){return(e,t)=>(yt(),Vt("section",gy,[pe("div",my,[pe("div",_y,[by,pe("div",Ey,[xy,pe("a",vy,[xt(" 🕹️  Participate Now! "),ht(Qr)])])])])]))}}),Cy=xo(Iy,[["__scopeId","data-v-8a9342ca"]]),yy="/images/telegram.svg",Sy="/images/x.svg",My="/images/dextools.svg",wy={},By={class:"bg-black py-16"},Ty=cf('<div class="container flex justify-center"><div class="w-auto"><ul class="flex gap-x-[30px] mt-[15px]"><a target="_blank" href="https://t.me/inudotgames"><img width="35" height="35" src="'+yy+'" alt="Telegram Icon"></a><a target="_blank" href="https://x.com/inudotgames"><img width="34" height="34" src="'+Sy+'" alt="X Icon"></a><a target="_blank" href="https://www.dextools.io/app/en/ether/pair-explorer/0x58a63a150888c3399d00a0e2c64be8c3d2e88dcb"><img width="28" height="28" src="'+My+'" alt="Dextools Icon"></a></ul></div></div><div class="text-center text-white pt-5"> INUGAMES © 2024 </div>',2),Ry=[Ty];function Dy(i,e){return yt(),Vt("footer",By,Ry)}const Ly=xo(wy,[["render",Dy]]),Py="/images/game-process.png",Fy="/images/game-shiba-island.png",Uy="/images/game-meme-wars.png",Ny={id:"games",class:"px-5 w-full pt-[30px] lg:pt-[100px] pb-[0px] lg:pb-[70px] bg-[#000000]"},Qy={class:"container lg:px-0"},Oy=pe("h1",{class:"text-center font-semibold leading-[50px] lg:leading-[87px] text-3xl lg:text-[64px] text-white","data-aos":"fade-up"}," Our Games ",-1),ky=pe("div",null,[pe("p",{class:"text-center text-white font-light text-[18px] lg:text-[30px] leading-7 lg:leading-[41px] mt-[20px]","data-aos":"fade-up"},[pe("img",{class:"m-auto",src:Py}),xt(" Each game is crafted with love and care by our team of developers and designers. "),pe("br"),xt(" We start "),pe("b",null,"simple"),xt(" and build upon the "),pe("b",null,"feedback of our community"),xt(" to create the "),pe("b",null,"best gaming"),xt(" experience. ")])],-1),Gy={class:"flex flex-col lg:flex-row gap-[20px] mt-[20px] lg:mt-[50px] text-center"},Hy={class:"w-full lg:w-1/2"},zy=pe("p",{class:"font-light text-[18px] lg:text-[30px] leading-7 lg:leading-[41px] mb-[50px]","data-aos":"fade-up"},[pe("h2",{class:"font-bold font-4xl"},"Shiba Island"),pe("br"),pe("img",{class:"m-auto max-w-[350px]",src:Fy}),pe("br"),pe("p",{class:"font-light max-w-[350px] text-[18px] lg:text-[24px] leading-7 lg:leading-[41px] m-auto","data-aos":"fade-up"}," Farm, Collect & Trade with other players. Build your own island and collaborate with others! ")],-1),Vy={href:"https://t.me/shibaisland",class:"m-auto mt-4 text-center bg-white text-black hover:bg-[#fdb04b] hover:text-black max-w-[260px] rounded-[8px] flex text-xl leading-[16px] items-center justify-between px-[20px] py-[12px] duration-[0.3s] transition-all"},Wy={class:"w-full lg:w-1/2"},qy=pe("p",{class:"font-light text-[18px] lg:text-[30px] leading-7 lg:leading-[41px] mb-[50px]","data-aos":"fade-up"},[pe("h2",{class:"font-bold font-4xl"},"Meme Wars"),pe("br"),pe("img",{class:"m-auto max-w-[350px]",src:Uy}),pe("br"),pe("p",{class:"font-light max-w-[350px] text-[18px] lg:text-[24px] leading-7 lg:leading-[41px] m-auto","data-aos":"fade-up"}," Fight to be the last one standing in this battle royale game using your favorite meme characters! ")],-1),jy={class:"m-auto mt-4 text-center bg-white text-black hover:bg-[#aaa] cursor-pointer hover:text-black max-w-[260px] rounded-[8px] flex text-xl leading-[16px] items-center justify-between px-[20px] py-[12px] duration-[0.3s] transition-all"},Ky=Mi({__name:"Games",setup(i){return(e,t)=>(yt(),Vt("section",Ny,[pe("div",Qy,[Oy,ky,pe("div",Gy,[pe("div",Hy,[zy,pe("a",Vy,[xt(" 🕹️  Early Access "),ht(Qr)])]),pe("div",Wy,[qy,pe("a",jy,[xt(" 🕹️  Coming Soon "),ht(Qr,{class:"invisible"})])])])])]))}}),Yy="/images/inugames-icon.svg",Xy={},Jy={class:"spinner"},Zy=pe("div",null,[pe("img",{class:"inu-icon",src:Yy,alt:"Inu Icon",width:"200"})],-1),$y=[Zy];function eS(i,e){return yt(),Vt("div",Jy,$y)}const tS=xo(Xy,[["render",eS]]),nS={key:1},iS=Mi({__name:"App",setup(i){const e=bt(!0),t=async()=>{await new Promise(n=>{setTimeout(n,1500)}),e.value=!1};return Or(()=>{lm.init(),t()}),(n,s)=>(yt(),Vt("div",null,[e.value?(yt(),Ml(tS,{key:0})):xr("",!0),e.value?xr("",!0):(yt(),Vt("div",nS,[ht(bm),ht(zC),ht(iy),ht(Ky),ht(Ay),ht(Cy),ht(Ly)]))]))}});qg(iS).use(rm).mount("#app");
