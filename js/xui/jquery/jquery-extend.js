(function ($) {
    String.prototype.trim = function (value){
        return this.lTrim(value).rTrim(value);
    };

    String.prototype.lTrim = function (value){
        if(typeof(value) == "undefined"){
            replaceValue = "\\s";
        }else{
            replaceValue = value;
        }
        reg = new RegExp("(^"+replaceValue+"*)","g");
        return this.replace(reg, '');
    };

    String.prototype.rTrim = function (value){
        if(typeof(value) == "undefined"){
            replaceValue = "\\s";
        }else{
            replaceValue = value;
        }
        reg = new RegExp("("+replaceValue+"*$)","g");
        return this.replace(reg, '');
    };

    Number.prototype.patch = String.prototype.patch = function (Lenth, Value){
        var num = this;
        var len = this.toString().length;
        while(len < Lenth){
            if(typeof(this) == "object"){
                num = "0" + num;
            }else{
                num = Value + num;
            }
            len++;
        }
        return typeof(this) == "number" ? parseInt(num) : num;

    };

    String.prototype.isEmpty = function (){
        return (this.trim() == "") ? true : false;
    };
    String.prototype.isPhone = function (){
        return (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.trim())) ? true : false;
    };
    String.prototype.isNumber = function (){
        return (/^\d+$/.test(this.trim())) ? true : false;
    };
    String.prototype.isEmail = function (){
        return (/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/.test(this.trim())) ? true : false;
    };
    String.prototype.isTel = function (){
        return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.trim())) ? true : false;
    };
    String.prototype.isDate = function (){
        var pattern = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/;
        return (pattern.test(this.trim())) ? true : false;
    };
    String.prototype.isChinese = function (){
        var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
        return (pattern.test(this.trim())) ? true : false;
    };
    String.prototype.isIP = function (){
        var pattern = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
        return (pattern.test(this.trim())) ? true : false;
    };
    String.prototype.isURL = function (){
        var pattern = /^((https|http|ftp|rtsp|mms):\/\/)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?\/$/;
        return (pattern.test(this.trim())) ? true : false;
    };
    String.prototype.isNumOrLet = function (){
        return (/^[0-9a-zA-Z]+$/.test(this.trim())) ? true : false;
    };
    String.prototype.isLetter = function (){
        return (/^[a-zA-Z]+$/.test(this.trim())) ? true : false;
    };
    String.prototype.isDouble = function (){
        return (/^[-\+]?\d+(\.\d+)?$/.test(this.trim())) ? true : false;
    };
    String.prototype.isString = function (){
        return (/^\w+$/.test(this.trim())) ? true : false;
    };
    String.prototype.isPrice = function (){
        return (/(^[1-9](\d+(\.\d{1,2})?)?$)|(^[0-9](\.\d{1,2})?$)/.test(this.trim())) ? true : false;
    };
    String.prototype.isZIP = function (){
        return (/^\d{6}$/.test(this.trim())) ? true : false;
    };
    String.prototype.isIDCard = function (){
        return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.trim())) ? true : false;
    };
    Date.prototype.format = function (format) {
        var date = this;
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    };

    String.prototype.pathDocumentRoot = function (){
        var pattern = /([A-Za-z]:[\\|\/](.*?[\\|\/])+|[\\|\/|\w+](.*?[\\|\/])+)/;
        var path = this.Trim();
        var PathArray = path.match(pattern);
        return (PathArray != null) ? PathArray[0] : null;
    };
    String.prototype.pathDisk = function (){
        var pattern = /[A-Za-z]:[\\|\/]/;
        var path = this.Trim();
        var PathArray = path.match(pattern);
        return (PathArray != null) ? PathArray[0] : null;
    };
    String.prototype.pathFileName = function (){
        if(this.lastIndexOf('\\') > 0)
            var FileName = this.substr(this.lastIndexOf('\\'), this.length);
        else
            var FileName = this.substr(this.lastIndexOf('/'), this.length);
        FileName = FileName.replace('/','').replace('\\','');
        return FileName;
    };
    String.prototype.pathFile = function (){
        var DocumentRoot = this.PathDocumentRoot().RTrim("\\\\");
        var File = DocumentRoot.substr(DocumentRoot.lastIndexOf("\\")+1 ,DocumentRoot.length);
        return File;
    };
    String.prototype.pathExtension = function (){
        var FileName = this.PathFileName().Trim();
        var Extension = FileName.substr(FileName.lastIndexOf(".")+1, FileName.length);
        return Extension;
    };

    String.prototype.htmlToText = function (){
        var value = this;
        return value.replace(/<[^>].*?>/g, "");
    };

    $.support = (function() {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
        return support;
    })();

    $.extend({
        /**
        * 获取url中的参数
        * @param {Object} name : GET方法的name值，不填返回所有的参数值（可不填）
        * @returns {String|Object} : 返回参数值
        */
        getUrlParam: function (name) {
            if (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            } else {
                var all = window.location.search.substr(1);
                var params = {};
                if (all == "") return params;
                $.each(all.split("&"), function (i, param) {
                    var t = param.split("=");
                    params[t[0]] = (t[1] == null) ? null : decodeURIComponent(t[1]);
                });
                return params;
            }
        },
        /**
         * 剩余时间转换成 天时分秒毫秒
         * @param sumsecond : 剩余秒
         * @param format : 格式
         * @returns {string|*} 返回格式时间
         */
        getRemainTime : function (sumsecond, format) {
            format = (format == null) ? '{Day}天{Hour}时{Minute}分{Second}秒' : format;

            var dayTime = sumsecond % (24 * 3600);
            var day = Math.floor(sumsecond / (24 * 3600));
            var hour = Math.floor(dayTime / 3600);
            var minute = Math.floor((dayTime % 3600) / 60);
            var second = Math.floor((dayTime % 3600) % 60);
            var milliSecond = Math.floor((((dayTime % 3600) % 60) - second) * 100);

            day = (day <= 0) ? 0 : day;
            hour = (hour <= 0) ? 0 : hour;
            minute = (minute <= 0) ? 0 : minute;
            milliSecond = (milliSecond <= 0) ? 0 : milliSecond;

            var time = format;
            time = time.replace('{day}', day);
            time = time.replace('{hour}', hour);
            time = time.replace('{minute}', minute);
            time = time.replace('{second}', second);
            time = time.replace('{ms}', milliSecond);

            time = time.replace('{Day}', day.patch(2));
            time = time.replace('{Hour}', hour.patch(2));
            time = time.replace('{Minute}', minute.patch(2));
            time = time.replace('{Second}', second.patch(2));
            time = time.replace('{Ms}', milliSecond.patch(2));
            return time;
        },
        /**
         * 获取touch位置
         * @param e
         * @returns {{x, y}}
         */
        getTouchPosition : function(e) {
            e = e.originalEvent || e; //jquery wrap the originevent
            if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
                return {
                    x: e.targetTouches[0].pageX,
                    y: e.targetTouches[0].pageY
                };
            } else {
                return {
                    x: e.pageX,
                    y: e.pageY
                };
            }
        },
        date : function (value){
            var MonthArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
            var DArray = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
            var IArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

            var MyDate = new Date();
            var Year = MyDate.getFullYear();
            var Y = Year.toString().substr(2,2);
            var Month = MonthArray[n];
            var n = MyDate.getMonth();
            var M = (n+1).patch(2);
            var Dates = DArray[MyDate.getDate()];
            var D = MyDate.getDate().patch(2);
            var Hours = MyDate.getHours().patch(2);
            var H = MyDate.getHours() > 12 ? MyDate.getHours()-12 : Hours;
            var I = IArray[MyDate.getDate()];
            var Minutes = MyDate.getMinutes().patch(2);
            var Seconds = MyDate.getSeconds().patch(2);
            var AM = Hours <= 12 ? "AM" : "PM";
            var A = AM.toLowerCase();

            value = value.replace("{Y}", Year);
            value = value.replace("{y}", Y);
            value = value.replace("{n}", n);
            value = value.replace("{m}", M);
            value = value.replace("{D}", Dates);
            value = value.replace("{H}", Hours);
            value = value.replace("{h}", H);
            value = value.replace("{i}", Minutes);
            value = value.replace("{s}", Seconds);
            value = value.replace("{A}", AM);
            value = value.replace("{a}", A);
            value = value.replace("{d}", D);
            value = value.replace("{M}", Month);
            value = value.replace("{I}", I);

            return value;
        },
        /**
         * touch 事件
         */
        touchEvents : {
            start: $.support.touch ? 'touchstart' : 'mousedown',
            move: $.support.touch ? 'touchmove' : 'mousemove',
            end: $.support.touch ? 'touchend' : 'mouseup'
        }
    });

    var oldScroll = $.fn.scroll;

    $.fn.extend({
        /**
        * 是否在屏幕可视范围内
        * @param {String|Object} selecter : 选择器，选择在哪个范围，默认是window（可不填）
        * @returns {boolean} : 返回Bool
        */
        isOnScreen: function (selecter) {
            var win = $(selecter || window);

            var viewport = {
                top: win.scrollTop(),
                left: win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();

            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        },
        /**
        * 序列化form表单成object
        * @returns {Object} : 返回Object数据
        */
        serializeObject: function () {
            var serializeObject = {};
            $($(this).serializeArray()).each(function () {
                var name = this.name.replace(/\]\[/g, '.').replace('[', '.').replace(']', '');
                var value = this.value;
                var name_arr = name.split('.');
                var serializeObject_value = serializeObject;
                for (var i = 0; i < name_arr.length; i++) {
                    var key = name_arr[i];
                    //最后一个
                    if (i >= name_arr.length - 1) {
                        if ($.isArray(serializeObject_value)) {
                            serializeObject_value.push(value);
                        } else {
                            serializeObject_value[key] = value;
                        }
                    } else {
                        var next_key = name_arr[i + 1];
                        if ($.isArray(serializeObject_value)) {
                            var index = serializeObject_value.length;

                            if (index <= 0) {
                                serializeObject_value[index] = (next_key == '') ? [] : {};
                                index = serializeObject_value.length;
                            }
                            //看看上一个存不存在,如果不存在就用原来那一个，否则就加一个
                            var upper_serializeObject_value = serializeObject_value[index - 1][next_key];  //判断下一个值
                            if (upper_serializeObject_value === undefined) {
                                serializeObject_value = serializeObject_value[index - 1];
                            } else {
                                if ($.isArray(upper_serializeObject_value) || typeof (upper_serializeObject_value) === 'object') {
                                    serializeObject_value = serializeObject_value[index - 1];
                                } else {
                                    serializeObject_value[index] = (next_key == '') ? [] : {};
                                    serializeObject_value = serializeObject_value[index];
                                }
                            }
                        } else {
                            if (serializeObject_value[key] === undefined) {
                                serializeObject_value[key] = (next_key == '') ? [] : {};
                            }
                            serializeObject_value = serializeObject_value[key];
                        }
                    }
                }
            });
            return serializeObject;
        },
        /**
        * 序列化form表单成Json
        * @returns {String} : 返回Json的字符串
        */
        serializeJson: function () {
            return JSON.stringify($(this).serializeObject());
        },

        /**
         * 滚到底部事件
         * @param {string|function} type : 类型或者回调
         * @param {function} callback : 回调参数
         * @returns {object} : 返回当前
         */
        scroll: function (type, callback) {
            if(typeof type === 'string'){
                var typeName = type.toLowerCase();
                if(typeName === 'top'){
                    oldScroll.call(this, function (e) {
                        if ($(this).scrollTop() <= 0) {
                            callback(e);
                        }
                    });
                }else if(typeName === 'bottom'){
                    oldScroll.call(this, function (e) {
                        if ($(this).scrollTop() >= $(this)[0].scrollHeight - $(this).outerHeight(false)) {
                            callback(e);
                        }
                    });
                }

            }else{
                oldScroll.call(this, type);
            }
            return this;
        },
        /**
         * 获取滚动高度
         * @returns {scrollHeight|number}
         */
        scrollHeight : function() {
            return this[0].scrollHeight;
        },
        /**
         * 过渡结束事件回调
         * @param callback
         * @returns {transitionEnd}
         */
        transitionEnd : function(callback) {
            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                i, dom = this;

            function fireCallBack(e) {
                /*jshint validthis:true */
                if (e.target !== this) return;
                callback.call(this, e);
                for (i = 0; i < events.length; i++) {
                    dom.off(events[i], fireCallBack);
                }
            }
            if (callback) {
                for (i = 0; i < events.length; i++) {
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        }
    });
})(jQuery);