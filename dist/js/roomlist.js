/*!
 * @project : MidAutumnFestival
 * @version : 0.0.1
 * @author  : 
 * @update  : 2017-10-01 5:08:53 pm
 */!function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var e={};return n.m=t,n.c=e,n.p="./js/",n(0)}([function(t,n,e){$(function(){var t={pageTpl:{roomlist:e(6)},buyNum:1,init:function n(){this.bindEvent(),this.getRoomList(),this.getAgentStatus()},getRoomList:function o(){var t=this;$.ajax({url:"http://www.czcycm.com/app/hb/my_room",type:"post"}).done(function(n){"string"==typeof n&&(n=JSON.parse(n)),console.log(n),$(".js-roomlist-main").html(t.pageTpl.roomlist({data:n.data}))})},getAgentStatus:function r(){var t=this;$.ajax({url:"http://www.czcycm.com/app/wallet/is_vip",type:"get"}).done(function(t){console.log(t),0==t.code&&(1==t.data.is_vip?$(".roomlist-banner").attr({src:"http://www.czcycm.com/mex/mid/img/page/agent.png",isvip:"1"}):$(".roomlist-banner").attr({src:"http://www.czcycm.com//mex/mid/img/page/be-agent.png",isvip:"0"}))})},payCard:function i(){var t=this;$.ajax({url:"http://www.czcycm.com/app/wallet/cardPay",type:"get"}).done(function(t){console.log(t),0==t.code&&(window.location.href=t.data.pay_url)})},bindEvent:function a(){var t=this,n=1;$(".roomlist-banner").on("click",function(){"1"==$(this).attr("isvip")?window.location.href="/app/wallet/index":t.payCard()}),$(".js-create-room-bt").on("click",function(){$(".js-create-room-window").removeClass("hide")}),$(".js-room-choose").on("click",".twn-choose",function(){$(".js-room-choose > .selected").removeClass("selected"),$(this).addClass("selected"),n=$(this).data("type")}),$(".js-create-now").on("click",function(){$(".js-create-room-window").addClass("hide"),$.ajax({url:"http://www.czcycm.com/app/hb/add_room",type:"post",data:{type:n}}).done(function(n){"string"==typeof n&&(n=JSON.parse(n)),console.log(n),1==n.code?($(".js-create-success").removeClass("hide"),t.getRoomList()):$(".js-create-fail").removeClass("hide")})}),$(".toast-window-mask").on("click",function(){$(this).parent(".toast-window").addClass("hide")}),$(".twn-t-close, .js-win-close").on("click",function(){$(this).parents(".toast-window").addClass("hide")})}};t.init()})},,,,,function(t,n){!function(){function n(t,n){return(/string|function/.test(typeof n)?s:c)(t,n)}function e(t,n){return"string"!=typeof t&&(n=typeof t,"number"===n?t+="":t="function"===n?e(t.call(t)):""),t}function o(t){return d[t]}function r(t){return e(t).replace(/&(?![\w#]+;)|[<>"']/g,o)}function i(t,n){if(f(t))for(var e=0,o=t.length;o>e;e++)n.call(t,t[e],e,t);else for(e in t)n.call(t,t[e],e)}function a(t,n){var e=/(\/)[^\/]+\1\.\.\1/,o=("./"+t).replace(/[^\/]+$/,""),r=o+n;for(r=r.replace(/\/\.\//g,"/");r.match(e);)r=r.replace(e,"/");return r}function c(t,e){var o=n.get(t)||l({filename:t,name:"Render Error",message:"Template not found"});return e?o(e):o}function s(t,n){if("string"==typeof n){var e=n;n=function(){return new u(e)}}var o=p[t]=function(e){try{return new n(e,t)+""}catch(o){return l(o)()}};return o.prototype=n.prototype=m,o.toString=function(){return n+""},o}function l(t){var n="{Template Error}",e=t.stack||"";if(e)e=e.split("\n").slice(0,2).join("\n");else for(var o in t)e+="<"+o+">\n"+t[o]+"\n\n";return function(){return"object"==typeof console&&console.error(n+"\n\n"+e),n}}var p=n.cache={},u=this.String,d={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},f=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},m=n.utils={$helpers:{},$include:function(t,n,e){return t=a(e,t),c(t,n)},$string:e,$escape:r,$each:i},h=n.helpers=m.$helpers;n.get=function(t){return p[t.replace(/^\.\//,"")]},n.helper=function(t,n){h[t]=n},t.exports=n}()},function(t,n,e){var o=e(5);t.exports=o("279cf3d0-a688-11e7-bc56-f10ac769aa36",function(t,n){"use strict";var e=this,o=e.$helpers,r=e.$each,i=t.data,a=t.v,c=t.i,s=e.$escape,l="";return r(i,function(t,n){l+=' <li> <img class="rl-avatar" src="',l+=s(t.pic),l+='" /> <div class="rl-name">',l+=s(t.name),l+='</div> <div class="rl-num">在线人数',l+=s(t.numb),l+='</div> <a class="rl-in js-rl-in" href="/app/wallet/room?roomid=',l+=s(t.room_id),l+='" data-id="',l+=s(t.room_id),l+='">进入</a> </li> '}),new String(l)})}]);