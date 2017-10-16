(function ($) {
    function getBrowserType(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isIE11 = (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1);
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

        if (isIE)
        {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7)
            { return "ie7";}
            else if(fIEVersion == 8)
            { return "ie8";}
            else if(fIEVersion == 9)
            { return "ie9";}
            else if(fIEVersion == 10)
            { return "ie10";}
            else return "ie" + fIEVersion;
        }

        if (isFF) return "firefox";
        if (isOpera) return "opera";
        if (isSafari) return "safari";
        if (isChrome) return "chrome";
        if (isEdge) return "edge";
        if(isIE11) return 'ie11';
    }

    function getBrowserTerminal(){
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
        var iPhone = navigator.userAgent.indexOf('iPhone') > -1;
        var iPad = navigator.userAgent.indexOf('iPad') > -1;

        if(isWin) return 'windows';
        if(isMac) return 'mac';
        if(isAndroid) return 'android';
        if(iPhone) return 'iphone';
        if(iPad) return 'ipad';
    }

    $('html').addClass('xui-browser-' + getBrowserType()).addClass('xui-terminal-' + getBrowserTerminal());

    $(function () {
        $(document.body).bind('touchstart', function () {
        });
    });
    $.listenDomChange('[xui-fixed-placeholder]', function (obj) {

        function initPlaceholder() {
            //高度占位
            var placeholderTopHeight = 0;
            var placeholderBottomHeight = 0;
            var placeholderSelecter = 'body';
            var len = $('[xui-fixed-placeholder]').each(function (index, element) {
                var placeholderType = $(this).attr('xui-fixed-placeholder').toLowerCase();
                switch (placeholderType){
                    case 'top':
                        placeholderTopHeight += $(this).outerHeight();
                        break;
                    case 'bottom':
                        placeholderBottomHeight += $(this).outerHeight();
                        break;
                }
            }).length;
            if(len > 0){
                $(placeholderSelecter).css({
                    'padding-top' : placeholderTopHeight + 'px',
                    'padding-bottom' : placeholderBottomHeight + 'px'
                });
            }else{
                $(placeholderSelecter).css({
                    'padding-top' : '',
                    'padding-bottom' : ''
                });
            }
        }

        if(obj.type === 'nodeInsert'){
            initPlaceholder();
        }else if(obj.type === 'nodeRemove'){
            window.setTimeout(initPlaceholder, 100);
        }
    });

    $.listenDomChange('[xui-image-auto]', function (obj) {
        if(obj.type === 'nodeInsert'){
            var self = $(this);
            var img = new Image();
            img.src = $(this).attr('src');
            $(img).load(function () {
                var height = self.parent().outerHeight();
                var width = self.parent().outerWidth();
                var ratio = width / height;
                if ((img.width / img.height) > ratio) {
                    self.css({
                        'width' : 'auto',
                        'height': '100%',
                        'max-width' : 'initial',
                        'height-width' : 'initial'
                    });
                } else {
                    self.css({
                        'width' : '100%',
                        'height': 'auto',
                        'max-width' : 'initial',
                        'height-width' : 'initial'
                    });
                }
            });
        }
    });
})(jQuery);