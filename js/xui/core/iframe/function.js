/**
 * Created by JET on 2016/11/16.
 */
(function ($) {
    //初始化跳转
    if(window.location.hash.match(/^#iframeLink#/)){
        window.location = window.location.hash.replace(/^#iframeLink#/, '');
    }
    var iframeHtml = '<div style="display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; box-shadow: 0 0 30px #898989;">\n    <iframe style="border: none; width: 100%; height: 100%;"></iframe>\n</div>';
    var zIndex = 2;
    var currentName = '';
    var iframe = {
        defaultOption : {
            animate : 'none',
            callback : function () { }
        },
        /**
         * 是否为iframe
         * @returns {boolean} : true|false
         */
        isFrame : function () {
            return (self.frameElement && self.frameElement.tagName.toLowerCase() == "iframe") ? true : false;
        },
        isJumpUrl : function (url) {
            if(url.match(/^(#|\?).*/)){
                return true;
            }
            return false;
        },
        /**
         * 获取当前主窗体的窗体名
         * @returns {string}
         */
        getCurrentWindowName : function () {
            return $window.location.host + '-' + $window.location.pathname.replace(/^\//,'').replace(/\//g, '-').replace(/\.\w+$/, '');
        },
        /**
         * 根据url获取唯一标识，不同页面不同标识
         * @param url
         * @returns {XML|string}
         */
        getWindowName : function(url){
            url = url.replace(/\?.*/, '').replace(/#.*/, '').replace(/\.\w+$/, ''); //去除所有后缀
            //是否http
            if(url.match(/^(|(http|https):)\/\//)){
                url = url.replace(/^(|(http|https):)\/\//, ''); //去除http
            }else{
                var domain = $window.location.host;
                var pathname = $window.location.pathname.replace(/\w+\.\w+$/, '');
                if(url.match(/^\//)){
                    url = domain + url;
                }else{
                    url = domain + pathname + url;
                }
            }

            //解析url上下级路径
            var urlArr = url.split('/');
            var newUrl = urlArr[0];
            for(var i = 1; i < urlArr.length; i++){
                if(urlArr[i] == '.' || urlArr[i] == '..' || urlArr[i + 1] == '..') continue;
                newUrl += '/' + urlArr[i];
            }
            return newUrl.replace(/\//g, '-');
        },
        find : function (url) {
            var name = iframe.getWindowName(url);
            if(iframe.getCurrentWindowName() == name) {
                return window;
            }else{
                if (iframe.isFrame()) {
                    return parent.window.frames[iframe.getWindowName(url)];
                }else{
                    return window.frames[iframe.getWindowName(url)];
                }
            }
        },
        findElement : function (url) {
            return $window.$('[name="' + iframe.getWindowName(url) + '"]');
        },
        createWindow : function (url, options) {
            //新建一个窗体
            $.wait();
            var rootElement = $(iframeHtml);
            rootElement.css('z-index', zIndex).bind('scroll', function (e) {
                $(this).scrollTop(0);
            }).bind('touchmove', function (e) {
                e.preventDefault();
            });

            var iframeElement = rootElement.find('iframe');
            var name = iframe.getWindowName(url);
            $.iframe.currentName = name;
            iframeElement.attr({
                'src': url,
                'name': name,
                'xui-winframe' : options.animate
            });
            iframeElement.load(function () {
                //iframe加载事件
                var iframeWindow = iframe.find(url).window;
                iframeWindow.$(iframeWindow).triggerHandler('xui.iframe.load', [iframe.getParams(url)]);
                options.callback();

                $.wait('close');
                //$window.document.title = iframe.find(url).document.title;
                iframe.showWindowAnimate(rootElement, options.animate, function (element) {
                    $('[xui-winframe]').parent().removeClass('xui-iframe-box');
                    element.addClass('xui-iframe-box');
                });
            });

            rootElement.appendTo('body');
        },
        openWindow : function (url, options) {
            $.iframe.currentName = iframe.getWindowName(url);
            var iframeElement = iframe.findElement(url);
            var rootElement = iframeElement.parent();
            iframeElement.attr('xui-winframe', options.animate);
            rootElement.css('z-index', zIndex);

            //iframe加载事件
            var iframeWindow = iframe.find(url).window;
            iframeWindow.$(iframeWindow).triggerHandler('xui.iframe.load', [iframe.getParams(url)]);
            options.callback();

            iframe.showWindowAnimate(rootElement, options.animate, function (element) {
                //$window.document.title = iframe.find(url).document.title;
                $('[xui-winframe]').parent().removeClass('xui-iframe-box');
                element.addClass('xui-iframe-box');
            });
        },
        showWindowAnimate : function (element, animate, callback) {
            switch (animate){
                case 'none' :
                    element.show();
                    if(callback) callback(element);
                    break;
                case 'slider-right' :
                    element.css({
                        'top' : '0',
                        'left' : '100%'
                    }).show().animate({
                        'left' : '0'
                    },function () {
                        if(callback) callback(element);
                    });
                    break;
                case 'slider-left' :
                    element.show().css({
                        'top' : '0',
                        'left' : '-100%'
                    }).show().animate({
                        'left' : '0'
                    },function () {
                        if(callback) callback(element);
                    });
                    break;
                case 'slider-top' :
                    element.show().css({
                        'top' : '-100%',
                        'left' : '0'
                    }).show().animate({
                        'top' : '0'
                    },function () {
                        if(callback) callback(element);
                    });
                    break;
                case 'slider-bottom' :
                    element.show().css({
                        'top' : '100%',
                        'left' : '0'
                    }).show().animate({
                        'top' : '0'
                    },function () {
                        if(callback) callback(element);
                    });
                    break;
                default:
                    element.show();
                    if(callback) callback(element);
                    break;
            }
        },
        hideWindowAnimate : function (element, animate, callback) {
            switch (animate){
                case 'none' :
                    element.hide();
                    if(callback) callback(element);
                    break;
                case 'slider-right' :
                    element.css({
                        'top' : '0',
                        'left' : '0'
                    }).animate({
                        'left' : '100%'
                    },function () {
                        element.hide();
                        if(callback) callback(element);
                    });
                    break;
                case 'slider-left' :
                    element.show().css({
                        'top' : '0',
                        'left' : '0'
                    }).animate({
                        'left' : '-100%'
                    },function () {
                        element.hide();
                        if(callback) callback(element);
                    });
                    break;
                case 'slider-top' :
                    element.show().css({
                        'top' : '0',
                        'left' : '0'
                    }).animate({
                        'top' : '-100%'
                    },function () {
                        element.hide();
                        if(callback) callback(element);
                    });
                    break;
                case 'slider-bottom' :
                    element.show().css({
                        'top' : '0',
                        'left' : '0'
                    }).animate({
                        'top' : '100%'
                    },function () {
                        element.hide();
                        if(callback) callback(element);
                    });
                    break;
                default:
                    element.hide();
                    if(callback) callback(element);
                    break;
            }
        },
        close : function () {
            
        },
        getParams : function(url){
            var param = {};
            if(url.indexOf('?') !== -1){
                var paramStr = url.substr(url.indexOf('?') + 1).replace(/#.*/, '');
                var paramStrArr = paramStr.split('&');
                for(var i = 0; i < paramStrArr.length; i++){
                    var value = paramStrArr[i].split('=');
                    param[value[0]] = value[1];
                }
            }
            return param;
        }
    };
    var $window = (iframe.isFrame()) ? parent.window : window;

    $.extend({
        iframe : {
            currentName : '',
            historyUrl : [],
            open : function (url, options) {
                zIndex++;
                options = $.extend({}, iframe.defaultOption, options);
                $window.$.iframe.historyUrl.push(url);

                if (iframe.isFrame()) {
                    parent.window.$.iframe.open(url, options);
                }else{
                    if(iframe.isJumpUrl(url)){
                        $('[xui-winframe]').parent().hide();
                        window.location = $window.location.pathname + url;
                    }else{
                        $window.location = $window.location.pathname + '#iframeLink#' + url;
                        var name = iframe.getWindowName(url);
                        if(iframe.getCurrentWindowName() == name){
                            options.callback();
                            $(window).triggerHandler('xui.iframe.load', [iframe.getParams(url)]);
                            $('[xui-winframe]').parent().hide();
                        }else{
                            if($.iframe.find(url) === undefined){
                                iframe.createWindow(url, options);
                            }else{
                                iframe.openWindow(url, options);
                            }
                        }
                    }
                }
            },
            find : function (url) {
                return iframe.find(url);
            },
            findElement : function (url) {
                return iframe.findElement(url);
            },
            hide : function (url, options, callback) {
                options = $.extend({}, iframe.defaultOption, { animate : 'auto' }, options);
                var historyUrl = $window.$.iframe.historyUrl[($window.$.iframe.historyUrl.length - 1) - 1];
                if(historyUrl === undefined){
                    $window.location = url;
                    return;
                }

                var iframeElement = $window.$('[name="' + $window.$.iframe.currentName + '"]');
                var rootElement = iframeElement.parent();
                iframe.hideWindowAnimate(rootElement, ((options.animate == 'auto') ? iframeElement.attr('xui-winframe') : options.animate), function () {
                    $window.location = $window.location.pathname + '#iframeLink#' + historyUrl;
                    $window.$.iframe.historyUrl.push(historyUrl);
                    if(callback) callback(rootElement);
                });
            },
            close: function (url, options, callback) {
                this.hide(url, options, function (element) {
                    element.remove();
                    if(callback) callback(element);
                });
            }
        }
    });
    if(!iframe.isFrame()){
        $window.$.iframe.historyUrl.push(window.location.href);
    }

})(jQuery);