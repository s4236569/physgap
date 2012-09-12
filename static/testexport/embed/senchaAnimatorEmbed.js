/*
 * Sencha Animator 2011, all rights reserved
 */
(function(a){a.PageManager={version:1,animations:[],externalResources:{},uniqueId:0,idPrefix:"a",initialize:function(){if(window.SENCHA_ANIMATOR_PREFIX_ID){this.idPrefix=window.SENCHA_ANIMATOR_PREFIX_ID}},run:function(){var b=this.findAnimationsPlaceholders();this.fetchAnimations(b);this.animations=this.animations.concat(b)},getUniqueId:function(){return this.uniqueId++},loadAnimation:function(c,b){if(typeof c==="string"){c=document.getElementById(c)}if(!c){console.warn("Invalid element");return}var d={element:c,url:this.getBaseUrl(b),isIframe:this.isIframeElement(c)};this.fetchAnimation(d);this.animations.push(d)},findAnimationsPlaceholders:function(){var c="//*[@data-sencha-anim-url]";var e=document.evaluate(c,document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);var b=[];var d,f;while(d=e.iterateNext()){f={element:d,url:this.getBaseUrl(d.getAttribute("data-sencha-anim-url")),isIframe:this.isIframeElement(d)};b.push(f)}return b},getBaseUrl:function(b){if(b.length>0&&b.charAt(b.length-1)!=="/"){b=b+"/"}return b},isIframeElement:function(b){if(b.nodeName==="IFRAME"){return true}return false},fetchAnimations:function(c){for(var b=0;b<c.length;b++){this.fetchAnimation(c[b])}},fetchAnimation:function(b){if(b.isIframe){this.fetchIframeAnimation(b)}else{this.fetchJSONAnimation(b)}},fetchJSONAnimation:function(c){var b=c.url+"data.json";this.externalGet(b,function(e,d){if(e){this.receivedJSONAnimation(c,d)}},this)},fetchIframeAnimation:function(b){this.loadAnimDataIntoIframe(b)},receivedJSONAnimation:function(g,c){try{g.data=JSON.parse(c)}catch(b){console.warn("Was not able to parse JSON for "+g.url+" msg: "+b);return}var d=/\{\_an\:asset\_parent\}/g;g.data.css=g.data.css.replace(d,g.url);g.data.js=g.data.js.replace(d,g.url);g.data.html=g.data.html.replace(d,g.url);var f=this.idPrefix+this.getUniqueId()+"-";var e=/\{\_an\:id\_prefix\}/g;g.data.css=g.data.css.replace(e,f);g.data.js=g.data.js.replace(e,f);g.data.html=g.data.html.replace(e,f);this.loadAnimDataIntoDiv(g)},loadAnimDataIntoDiv:function(d){d.element.innerHTML=d.data.html;d.styleTag=this.createNewStyleTag(d.data.css);var b=new Function(d.data.js+"; return configData;");d.config=b();d.config.basePath=d.url;var e=new Function(" var AN = undefined;"+d.data.controlJS+"; return AN.Controller;");var c=e();this.loadExternalResources(d.config.externalResources,function(){var f=new c();f.setConfig(d.config);d.controller=f},this)},loadAnimDataIntoIframe:function(b){b.element.src=b.url+"index.html";b.element.style.borderWidth="0"},loadExternalResources:function(f,g,d){var e=f.length;if(e===0){g.call(d);return}var b=function(h){e--;if(!e){g.call(d)}};for(var c=0;c<f.length;c++){this.loadExternalResource(f[c].url,f[c].type,b,this)}},loadExternalResource:function(b,d,e,c){if(this.externalResources[b]){if(this.externalResources[b].staus==="done"){e.call(c)}else{this.externalResources[b].callbacks.push({callback:e,scope:c})}return}this.externalResources[b]={status:"wait",callbacks:[{scope:c,callback:e}]};this.externalGet(b,function(j,h){if(j){if(d==="css"){this.createNewStyleTag(h)}else{if(d==="js"){this.createNewScriptTag(h)}}}this.externalResources[b].status="done";var f;for(var g=0;g<this.externalResources[b].callbacks.length;g++){f=this.externalResources[b].callbacks[g];f.callback.call(f.scope)}},this)},loadCSS:function(b,c){this.externalGet(b,function(e,d){if(e){this.createNewStyleTag(d)}c.status="done";callback.call(scope)},this)},loadJS:function(b,c){this.externalGet(b,function(e,d){if(e){this.createNewScriptTag(d)}callback.call(scope)},this)},externalGet:function(b,e,c){var d=new XMLHttpRequest();d.open("GET",b,true);d.onload=function(f){if(d.status===200||d.status===0){e.call(c,true,d.responseText)}else{e.call(c,false);console.warn("Error loading resource "+b+"\n")}};d.send(null)},createNewStyleTag:function(c){var b=document.createElement("style");b.type="text/css";b.innerHTML=c;document.getElementsByTagName("head")[0].appendChild(b);return b},createNewScriptTag:function(b){var c=document.createElement("script");c.type="text/javascript";c.innerHTML=b;document.getElementsByTagName("head")[0].appendChild(c);return c}};a.PageManager.initialize();a.PageManager.run()})(window.AN=window.AN||{});