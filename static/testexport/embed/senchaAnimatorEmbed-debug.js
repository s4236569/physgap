/*!
 * Sencha Animator 2011, all rights reserved
 */
(function(AN){

    AN.PageManager = {
        version: 1,
        animations: [],
        externalResources: {},
        uniqueId: 0,
        idPrefix: "a",
        initialize: function() {
            if (window.SENCHA_ANIMATOR_PREFIX_ID) {
                this.idPrefix = window.SENCHA_ANIMATOR_PREFIX_ID;
            }
        },
        run: function() {
            var pageAnimations = this.findAnimationsPlaceholders();
            this.fetchAnimations(pageAnimations);
            this.animations = this.animations.concat(pageAnimations);
        },
        getUniqueId: function() {
            return this.uniqueId++;
        },
        loadAnimation: function(element, url) {

            if (typeof element === 'string') {
                element = document.getElementById(element);
            }

            if (!element) {
                console.warn('Invalid element');
                return;
            }

            var animInfo = {
                element: element,
                url: this.getBaseUrl(url),
                isIframe: this.isIframeElement(element)
            };
            
            this.fetchAnimation(animInfo);
            this.animations.push(animInfo);
        },
        findAnimationsPlaceholders: function() {
            var xpath = '//*[@data-sencha-anim-url]';
            var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

            var anims = [];
            var animElement, animInfo;
            while (animElement = results.iterateNext()) {
                animInfo = {
                    element: animElement,
                    url: this.getBaseUrl(animElement.getAttribute('data-sencha-anim-url')),
                    isIframe: this.isIframeElement(animElement)
                };

                anims.push(animInfo);
            }

            return anims;
        },
        getBaseUrl: function(baseUrl) {
            if (baseUrl.length > 0 && baseUrl.charAt(baseUrl.length - 1) !== "/" ) {
                baseUrl = baseUrl + "/";
            }
            return baseUrl;
        },
        isIframeElement: function(element) {
            if (element.nodeName === "IFRAME") {
                return true;
            }
            return false;
        },
        fetchAnimations: function(animations) {
            for (var i=0; i < animations.length; i++) {
                this.fetchAnimation(animations[i]);
            }
        },
        fetchAnimation: function(animation) {
            if (animation.isIframe) {
                this.fetchIframeAnimation(animation);
            } else {
                this.fetchJSONAnimation(animation);
            }
        },
        fetchJSONAnimation: function(animation) {
            var url = animation.url + "data.json";
            this.externalGet(url, function(success, data){
                if (success) {
                    this.receivedJSONAnimation(animation, data);
                }
            },this);
        },
        fetchIframeAnimation: function(animation) {
            this.loadAnimDataIntoIframe(animation);
        },
        receivedJSONAnimation: function(animation, json) {
            try {
                animation.data = JSON.parse(json);
            } catch (error) {
                console.warn('Was not able to parse JSON for ' + animation.url + ' msg: ' + error);
                return;
            }
            
            //add basepath
            var basePathMatch = /\{\_an\:asset\_parent\}/g;
            animation.data.css = animation.data.css.replace(basePathMatch, animation.url);
            animation.data.js = animation.data.js.replace(basePathMatch, animation.url);
            animation.data.html = animation.data.html.replace(basePathMatch, animation.url);

            //add prefix
            var prefix = this.idPrefix + this.getUniqueId() + '-';
            var prefixMatch = /\{\_an\:id\_prefix\}/g;
            animation.data.css = animation.data.css.replace(prefixMatch, prefix);
            animation.data.js = animation.data.js.replace(prefixMatch, prefix);
            animation.data.html = animation.data.html.replace(prefixMatch, prefix);

            this.loadAnimDataIntoDiv(animation);

        },
        
        loadAnimDataIntoDiv: function(anim) {
            anim.element.innerHTML = anim.data.html;
            anim.styleTag = this.createNewStyleTag(anim.data.css);

            var getConfig = new Function(anim.data.js + '; return configData;');
            anim.config = getConfig();
            anim.config.basePath = anim.url;
            
            var getControl = new Function(" var AN = undefined;" + anim.data.controlJS + '; return AN.Controller;');
            var controllerJS = getControl();

            this.loadExternalResources(anim.config.externalResources, function(){
                var controller = new controllerJS();
                controller.setConfig(anim.config);
                anim.controller = controller;
            }, this);
            
        },
        loadAnimDataIntoIframe: function (anim) {
            anim.element.src = anim.url + 'index.html';
            anim.element.style.borderWidth = "0";
        },
        loadExternalResources: function(list, callback, scope) {
            var remaingingResources = list.length;
            if (remaingingResources === 0) {
                callback.call(scope);
                return;
            }
            var loadedOne = function(url) {
                remaingingResources--;
                if (!remaingingResources) {
                    callback.call(scope);
                }
            };
            for (var i = 0; i < list.length; i++) {
                this.loadExternalResource(list[i].url, list[i].type, loadedOne, this);
            }
        },
        loadExternalResource: function(url, type, callback, scope) {
            if (this.externalResources[url]) {
                if (this.externalResources[url].staus === 'done') {
                    callback.call(scope);
                } else {
                    this.externalResources[url].callbacks.push({
                        callback: callback, scope: scope
                    });
                }
                return;
            }
            this.externalResources[url] = {
                status: 'wait',
                callbacks: [{scope: scope, callback: callback}]
            };
            this.externalGet(url, function(success, data){
                if (success) {
                    if (type === 'css') {
                        this.createNewStyleTag(data);
                    } else if (type === 'js') {
                        this.createNewScriptTag(data);
                    }
                }
                this.externalResources[url].status = "done";
                var callbackInfo;
                for (var i = 0; i < this.externalResources[url].callbacks.length; i++) {
                    callbackInfo = this.externalResources[url].callbacks[i];
                    callbackInfo.callback.call(callbackInfo.scope);
                }
            },this);
        },
        loadCSS: function(url, resourceInfo) {
            this.externalGet(url, function(success, data){
                if (success) {
                    this.createNewStyleTag(data);
                }
                resourceInfo.status = "done";
                callback.call(scope);
            },this);
        },
        loadJS: function(url, resourceInfo) {
            this.externalGet(url, function(success, data){
                if (success) {
                    this.createNewScriptTag(data);
                }
                callback.call(scope);
            },this);
        },
        externalGet: function(url, callback, scope) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function (event) {
                if (request.status === 200 || request.status === 0) {
                    callback.call(scope, true, request.responseText);
                } else {
                    callback.call(scope, false);
                    console.warn("Error loading resource "+url+"\n");
                }
            };
            request.send(null);
        },
        createNewStyleTag: function(style) {
            var styleTag = document.createElement('style');
            styleTag.type = "text/css";
            styleTag.innerHTML = style;
            document.getElementsByTagName('head')[0].appendChild(styleTag);
            return styleTag;
        },
        createNewScriptTag: function(script) {
            var scriptTag = document.createElement('script');
            scriptTag.type = "text/javascript";
            scriptTag.innerHTML = script;
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
            return scriptTag;
        }

    };
    
    AN.PageManager.initialize();
    AN.PageManager.run();
    
})(window.AN = window.AN || {});