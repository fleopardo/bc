 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);

/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function($){var defaults={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},windowLoaded=false;$(window).bind("load.jcarousel",function(){windowLoaded=true});$.jcarousel=function(e,o){this.options=$.extend({},defaults,o||{});this.locked=false;this.autoStopped=false;this.container=null;this.clip=null;this.list=null;this.buttonNext=null;this.buttonPrev=null;this.buttonNextState=null;this.buttonPrevState=null;if(!o||o.rtl===undefined){this.options.rtl=($(e).attr("dir")||$("html").attr("dir")||"").toLowerCase()=="rtl"}this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?(this.options.rtl?"right":"left"):"top";var skin="",split=e.className.split(" ");for(var i=0;i<split.length;i++){if(split[i].indexOf("jcarousel-skin")!=-1){$(e).removeClass(split[i]);skin=split[i];break}}if(e.nodeName.toUpperCase()=="UL"||e.nodeName.toUpperCase()=="OL"){this.list=$(e);this.clip=this.list.parents(".jcarousel-clip");this.container=this.list.parents(".jcarousel-container")}else{this.container=$(e);this.list=this.container.find("ul,ol").eq(0);this.clip=this.container.find(".jcarousel-clip")}if(this.clip.size()===0){this.clip=this.list.wrap("<div></div>").parent()}if(this.container.size()===0){this.container=this.clip.wrap("<div></div>").parent()}if(skin!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1){this.container.wrap('<div class=" '+skin+'"></div>')}this.buttonPrev=$(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null){this.buttonPrev=$(this.options.buttonPrevHTML).appendTo(this.container)}this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext=$(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null){this.buttonNext=$(this.options.buttonNextHTML).appendTo(this.container)}this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css((this.options.rtl?"right":"left"),0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});if(!this.options.vertical&&this.options.rtl){this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl")}var di=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;var li=this.list.children("li");var self=this;if(li.size()>0){var wh=0,j=this.options.offset;li.each(function(){self.format(this,j++);wh+=self.dimension(this,di)});this.list.css(this.wh,(wh+100)+"px");if(!o||o.size===undefined){this.options.size=li.size()}}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){self.next()};this.funcPrev=function(){self.prev()};this.funcResize=function(){if(self.resizeTimer){clearTimeout(self.resizeTimer)}self.resizeTimer=setTimeout(function(){self.reload()},100)};if(this.options.initCallback!==null){this.options.initCallback(this,"init")}this.setup()};var $jc=$.jcarousel;$jc.fn=$jc.prototype={jcarousel:"0.2.8"};$jc.fn.extend=$jc.extend=$.extend;$jc.fn.extend({setup:function(){this.first=null;this.last=null;this.prevFirst=null;this.prevLast=null;this.animating=false;this.timer=null;this.resizeTimer=null;this.tail=null;this.inTail=false;if(this.locked){return}this.list.css(this.lt,this.pos(this.options.offset)+"px");var p=this.pos(this.options.start,true);this.prevFirst=this.prevLast=null;this.animate(p,false);$(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);if(this.options.setupCallback!==null){this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");if(this.options.initCallback!==null){this.options.initCallback(this,"reset")}this.setup()},reload:function(){if(this.tail!==null&&this.inTail){this.list.css(this.lt,$jc.intval(this.list.css(this.lt))+this.tail)}this.tail=null;this.inTail=false;if(this.options.reloadCallback!==null){this.options.reloadCallback(this)}if(this.options.visible!==null){var self=this;var di=Math.ceil(this.clipping()/this.options.visible),wh=0,lt=0;this.list.children("li").each(function(i){wh+=self.dimension(this,di);if(i+1<self.first){lt=wh}});this.list.css(this.wh,wh+"px");this.list.css(this.lt,-lt+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(s){if(s!==undefined){this.options.size=s;if(!this.locked){this.buttons()}}return this.options.size},has:function(i,i2){if(i2===undefined||!i2){i2=i}if(this.options.size!==null&&i2>this.options.size){i2=this.options.size}for(var j=i;j<=i2;j++){var e=this.get(j);if(!e.length||e.hasClass("jcarousel-item-placeholder")){return false}}return true},get:function(i){return $(">.jcarousel-item-"+i,this.list)},add:function(i,s){var e=this.get(i),old=0,n=$(s);if(e.length===0){var c,j=$jc.intval(i);e=this.create(i);while(true){c=this.get(--j);if(j<=0||c.length){if(j<=0){this.list.prepend(e)}else{c.after(e)}break}}}else{old=this.dimension(e)}if(n.get(0).nodeName.toUpperCase()=="LI"){e.replaceWith(n);e=n}else{e.empty().append(s)}this.format(e.removeClass(this.className("jcarousel-item-placeholder")),i);var di=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;var wh=this.dimension(e,di)-old;if(i>0&&i<this.first){this.list.css(this.lt,$jc.intval(this.list.css(this.lt))-wh+"px")}this.list.css(this.wh,$jc.intval(this.list.css(this.wh))+wh+"px");return e},remove:function(i){var e=this.get(i);if(!e.length||(i>=this.first&&i<=this.last)){return}var d=this.dimension(e);if(i<this.first){this.list.css(this.lt,$jc.intval(this.list.css(this.lt))+d+"px")}e.remove();this.list.css(this.wh,$jc.intval(this.list.css(this.wh))-d+"px")},next:function(){if(this.tail!==null&&!this.inTail){this.scrollTail(false)}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size)?1:this.first+this.options.scroll)}},prev:function(){if(this.tail!==null&&this.inTail){this.scrollTail(true)}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1)?this.options.size:this.first-this.options.scroll)}},scrollTail:function(b){if(this.locked||this.animating||!this.tail){return}this.pauseAuto();var pos=$jc.intval(this.list.css(this.lt));pos=!b?pos-this.tail:pos+this.tail;this.inTail=!b;this.prevFirst=this.first;this.prevLast=this.last;this.animate(pos)},scroll:function(i,a){if(this.locked||this.animating){return}this.pauseAuto();this.animate(this.pos(i),a)},pos:function(i,fv){var pos=$jc.intval(this.list.css(this.lt));if(this.locked||this.animating){return pos}if(this.options.wrap!="circular"){i=i<1?1:(this.options.size&&i>this.options.size?this.options.size:i)}var back=this.first>i;var f=this.options.wrap!="circular"&&this.first<=1?1:this.first;var c=back?this.get(f):this.get(this.last);var j=back?f:f-1;var e=null,l=0,p=false,d=0,g;while(back?--j>=i:++j<i){e=this.get(j);p=!e.length;if(e.length===0){e=this.create(j).addClass(this.className("jcarousel-item-placeholder"));c[back?"before":"after"](e);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(j<=0||j>this.options.size)){g=this.get(this.index(j));if(g.length){e=this.add(j,g.clone(true))}}}c=e;d=this.dimension(e);if(p){l+=d}if(this.first!==null&&(this.options.wrap=="circular"||(j>=1&&(this.options.size===null||j<=this.options.size)))){pos=back?pos+d:pos-d}}var clipping=this.clipping(),cache=[],visible=0,v=0;c=this.get(i-1);j=i;while(++visible){e=this.get(j);p=!e.length;if(e.length===0){e=this.create(j).addClass(this.className("jcarousel-item-placeholder"));if(c.length===0){this.list.prepend(e)}else{c[back?"before":"after"](e)}if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(j<=0||j>this.options.size)){g=this.get(this.index(j));if(g.length){e=this.add(j,g.clone(true))}}}c=e;d=this.dimension(e);if(d===0){throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...")}if(this.options.wrap!="circular"&&this.options.size!==null&&j>this.options.size){cache.push(e)}else{if(p){l+=d}}v+=d;if(v>=clipping){break}j++}for(var x=0;x<cache.length;x++){cache[x].remove()}if(l>0){this.list.css(this.wh,this.dimension(this.list)+l+"px");if(back){pos-=l;this.list.css(this.lt,$jc.intval(this.list.css(this.lt))-l+"px")}}var last=i+visible-1;if(this.options.wrap!="circular"&&this.options.size&&last>this.options.size){last=this.options.size}if(j>last){visible=0;j=last;v=0;while(++visible){e=this.get(j--);if(!e.length){break}v+=this.dimension(e);if(v>=clipping){break}}}var first=last-visible+1;if(this.options.wrap!="circular"&&first<1){first=1}if(this.inTail&&back){pos+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&last==this.options.size&&(last-visible+1)>=1){var m=$jc.intval(this.get(last).css(!this.options.vertical?"marginRight":"marginBottom"));if((v-m)>clipping){this.tail=v-clipping-m}}if(fv&&i===this.options.size&&this.tail){pos-=this.tail;this.inTail=true}while(i-->first){pos+=this.dimension(this.get(i))}this.prevFirst=this.first;this.prevLast=this.last;this.first=first;this.last=last;return pos},animate:function(p,a){if(this.locked||this.animating){return}this.animating=true;var self=this;var scrolled=function(){self.animating=false;if(p===0){self.list.css(self.lt,0)}if(!self.autoStopped&&(self.options.wrap=="circular"||self.options.wrap=="both"||self.options.wrap=="last"||self.options.size===null||self.last<self.options.size||(self.last==self.options.size&&self.tail!==null&&!self.inTail))){self.startAuto()}self.buttons();self.notify("onAfterAnimation");if(self.options.wrap=="circular"&&self.options.size!==null){for(var i=self.prevFirst;i<=self.prevLast;i++){if(i!==null&&!(i>=self.first&&i<=self.last)&&(i<1||i>self.options.size)){self.remove(i)}}}};this.notify("onBeforeAnimation");if(!this.options.animation||a===false){this.list.css(this.lt,p+"px");scrolled()}else{var o=!this.options.vertical?(this.options.rtl?{right:p}:{left:p}):{top:p};var settings={duration:this.options.animation,easing:this.options.easing,complete:scrolled};if($.isFunction(this.options.animationStepCallback)){settings.step=this.options.animationStepCallback}this.list.animate(o,settings)}},startAuto:function(s){if(s!==undefined){this.options.auto=s}if(this.options.auto===0){return this.stopAuto()}if(this.timer!==null){return}this.autoStopped=false;var self=this;this.timer=window.setTimeout(function(){self.next()},this.options.auto*1000)},stopAuto:function(){this.pauseAuto();this.autoStopped=true},pauseAuto:function(){if(this.timer===null){return}window.clearTimeout(this.timer);this.timer=null},buttons:function(n,p){if(n==null){n=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="first")||this.options.size===null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>=this.options.size){n=this.tail!==null&&!this.inTail}}if(p==null){p=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="last")||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1){p=this.tail!==null&&this.inTail}}var self=this;if(this.buttonNext.size()>0){this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext);if(n){this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext)}this.buttonNext[n?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",n?false:true);if(this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=n){this.buttonNext.each(function(){self.options.buttonNextCallback(self,this,n)}).data("jcarouselstate",n)}}else{if(this.options.buttonNextCallback!==null&&this.buttonNextState!=n){this.options.buttonNextCallback(self,null,n)}}if(this.buttonPrev.size()>0){this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev);if(p){this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev)}this.buttonPrev[p?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",p?false:true);if(this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=p){this.buttonPrev.each(function(){self.options.buttonPrevCallback(self,this,p)}).data("jcarouselstate",p)}}else{if(this.options.buttonPrevCallback!==null&&this.buttonPrevState!=p){this.options.buttonPrevCallback(self,null,p)}}this.buttonNextState=n;this.buttonPrevState=p},notify:function(evt){var state=this.prevFirst===null?"init":(this.prevFirst<this.first?"next":"prev");this.callback("itemLoadCallback",evt,state);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",evt,state,this.first);this.callback("itemFirstOutCallback",evt,state,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",evt,state,this.last);this.callback("itemLastOutCallback",evt,state,this.prevLast)}this.callback("itemVisibleInCallback",evt,state,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",evt,state,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(cb,evt,state,i1,i2,i3,i4){if(this.options[cb]==null||(typeof this.options[cb]!="object"&&evt!="onAfterAnimation")){return}var callback=typeof this.options[cb]=="object"?this.options[cb][evt]:this.options[cb];if(!$.isFunction(callback)){return}var self=this;if(i1===undefined){callback(self,state,evt)}else{if(i2===undefined){this.get(i1).each(function(){callback(self,this,i1,state,evt)})}else{var call=function(i){self.get(i).each(function(){callback(self,this,i,state,evt)})};for(var i=i1;i<=i2;i++){if(i!==null&&!(i>=i3&&i<=i4)){call(i)}}}}},create:function(i){return this.format("<li></li>",i)},format:function(e,i){e=$(e);var split=e.get(0).className.split(" ");for(var j=0;j<split.length;j++){if(split[j].indexOf("jcarousel-")!=-1){e.removeClass(split[j])}}e.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+i)).css({"float":(this.options.rtl?"right":"left"),"list-style":"none"}).attr("jcarouselindex",i);return e},className:function(c){return c+" "+c+(!this.options.vertical?"-horizontal":"-vertical")},dimension:function(e,d){var el=$(e);if(d==null){return !this.options.vertical?(el.outerWidth(true)||$jc.intval(this.options.itemFallbackDimension)):(el.outerHeight(true)||$jc.intval(this.options.itemFallbackDimension))}else{var w=!this.options.vertical?d-$jc.intval(el.css("marginLeft"))-$jc.intval(el.css("marginRight")):d-$jc.intval(el.css("marginTop"))-$jc.intval(el.css("marginBottom"));$(el).css(this.wh,w+"px");return this.dimension(el)}},clipping:function(){return !this.options.vertical?this.clip[0].offsetWidth-$jc.intval(this.clip.css("borderLeftWidth"))-$jc.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-$jc.intval(this.clip.css("borderTopWidth"))-$jc.intval(this.clip.css("borderBottomWidth"))},index:function(i,s){if(s==null){s=this.options.size}return Math.round((((i-1)/s)-Math.floor((i-1)/s))*s)+1}});$jc.extend({defaults:function(d){return $.extend(defaults,d||{})},intval:function(v){v=parseInt(v,10);return isNaN(v)?0:v},windowLoaded:function(){windowLoaded=true}});$.fn.jcarousel=function(o){if(typeof o=="string"){var instance=$(this).data("jcarousel"),args=Array.prototype.slice.call(arguments,1);return instance[o].apply(instance,args)}else{return this.each(function(){var instance=$(this).data("jcarousel");if(instance){if(o){$.extend(instance.options,o)}instance.reload()}else{$(this).data("jcarousel",new $jc(this,o))}})}}})(jQuery);



/*
 * Brinda las funciones necesarias para poder manipular el submenu del header
 * Metodos expuestos:
 	* headerYPF.openSubmenu();
 	* headerYPF.closeSubmenu();
 	* headerYPF.setActive();
 	* headerYPF.removeActives();
*/
;(function(window,undefined){

	/*
	 * Cache de variables
	*/
		/* configuracion de velocidad de animacion */

		var speedClose = 300,

			speedOpen = 500,

		/* variable namespace */

			headerYPF = {};


		headerYPF.vars = {

			"header": $(".headerYPF"),

			"headerLinks": $(".headerYPF").find("nav a"),

			"headerSubmenues": $(".headerYPF").find(".submenu")

		};

	/*
	 * Metodos privados
	*/

	headerYPF.setActive = function(link){

		link.addClass("active");

	};

	headerYPF.removeActives = function(link){

		// Si recibo un link como parametro remuevo el activo solo a ese link
		if( link ){

			link.removeClass("active");

		}else{

			// Si el buscador esta abierto no borro el active del buscador
			if( headerYPF.vars.buscador.is(":visible") ){

				headerYPF.vars.headerLinks.not(".buscar a").removeClass("active");

			// Sino borro todos los actives
			}else{

				headerYPF.vars.headerLinks.removeClass("active");

			}

		}

	};

	_addDimmer = function(){

		var dimmer = '<div id="dimmer"></div>';

		$("body").append(dimmer);

		$("#dimmer").one("click",function(){

			headerYPF.closeSubmenu();

			$(this).remove();

		});
	};

	_removeDimmer = function(){

		$("#dimmer").remove();

	}

	/*
	 * Metodos públicos
	*/

	/*
	 * openSubmenu

		 * Abre el submenu que se le indica y agrega la class active al link que abre dicho submenu
		 * Parametros: link del menu correspondiente al submenu que se quiere abrir
		 * Ej: headerYPF.openSubmenu($(".headerYPF .nuevas-fronteras > a"));

	*/
	headerYPF.openSubmenu = function(link){

		var submenu = link.next();

		if(submenu.is(":visible")) {

			headerYPF.closeSubmenu();

			return;

		}

		headerYPF.closeSubmenu();

		submenu.stop(true,true).delay(speedClose).slideDown(speedOpen);

		//headerYPF.setActive(link);

		link.addClass("open");

		_addDimmer();

		isOpen = true;

	};


	/*
	 * headerYPF.closeSubmenu

		 * Cierra el submenu que este abierto y borra la class active del link correspondiente a ese submenu
		 * Parametros: no recibe

	*/
	headerYPF.closeSubmenu = function(){

		headerYPF.vars.headerSubmenues.stop(true,true).slideUp(speedClose);

		//headerYPF.removeActives();

		headerYPF.vars.headerLinks.removeClass("open");

		_removeDimmer();

	};


	window.headerYPF = headerYPF;

})(window);




/*
 * Metodos para que funcione el buscador
 * Metodos expuestos:
 	* headerYPF.openSearch();
 	* headerYPF.closeSearch();
*/
;(function(window,undefined){

	/* Extiendo el objeto */

	headerYPF.vars.buscador = $(".headerBuscador");

	headerYPF.vars.linkBuscar = headerYPF.vars.header.find(".buscar > a");


	/* Variables locales */

	var heightBuscador = headerYPF.vars.buscador.outerHeight() + 'px';


	/* Abrir Buscador */

	headerYPF.openSearch = function(){

		if( headerYPF.vars.buscador.is(":visible") ) {

			headerYPF.closeSearch();

			return;
		};

		// Cierro los submenus que esten abiertos
		headerYPF.closeSubmenu();

		// Activo el link Buscar
		headerYPF.setActive(headerYPF.vars.linkBuscar);

		// Animo el header hacia abajo
		headerYPF.vars.header.animate({
			"top": heightBuscador
		}, 500);

		// Prendo el buscador
		headerYPF.vars.buscador.fadeIn(200);

	};

	/* Cerrar el buscador */
	headerYPF.closeSearch = function(){

		if( headerYPF.vars.buscador.is(":hidden") ) return;

		// Apago el buscador
		headerYPF.vars.buscador.fadeOut(500);

		// Retraigo el header
		headerYPF.vars.header.animate({
			"top": 0
		});

		// Remuevo el active solo del buscar
		headerYPF.removeActives(headerYPF.vars.linkBuscar);

	};



})(window);

