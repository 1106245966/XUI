(function (window, $) {
    var oldSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value) {
        var oldValue = this.getAttribute(name);
        var attrDom = oldSetAttribute.call(this, name, value);
        if(oldValue !== value){
            $(this).triggerHandler('DOMAttrChange', [name, oldValue, value]);
        }
        return attrDom;
    };

    var oldRemoveAttribute = Element.prototype.removeAttribute;
    Element.prototype.removeAttribute = function(name) {
        $(this).triggerHandler('DOMAttrRemove', [name]);
        return oldRemoveAttribute.call(this, name);
    };

    var selectorArr = {};

    $.fn.extend({
        /*listenDomChange : function (selector, callback) {
            var domHistory = [];
            return this.bind('ready', function () {
                $(selector).not(domHistory).each(function () {
                    callback.call(this, {
                        type : 'nodeInsert'
                    });
                });
                $('*').not(domHistory).bind('DOMAttrChange', function (e, attrName, oldValue, newValue) {
                    if($(this).is(selector)){
                        callback.call(this, {
                            type : 'attrChange',
                            attrName : attrName,
                            oldValue : oldValue,
                            newValue : newValue
                        });
                    }
                }).bind('DOMAttrRemove', function (e, removeAttrName) {
                    if($(this).is(selector)){
                        callback.call(this, {
                            type : 'attrRemove',
                            attrName : removeAttrName
                        });
                    }
                });
            }).bind('DOMNodeInserted', function (e) {
                var currentDom = $(e.target);
                if(currentDom.is(selector)){
                    //监听属性更改
                    currentDom.bind('DOMAttrChange', function (ev, attrName, oldValue, newValue) {
                        if($(this).is(selector)){
                            callback.call(this, {
                                type : 'attrChange',
                                attrName : attrName,
                                oldValue : oldValue,
                                newValue : newValue
                            });
                        }
                    }).bind('DOMAttrRemove', function (e, removeAttrName) {
                        if($(this).is(selector)){
                            callback.call(this, {
                                type : 'attrRemove',
                                attrName : removeAttrName
                            });
                        }
                    });
                    domHistory.push(e.target);
                    callback.call(e.target, {
                        type : 'nodeInsert'
                    });
                }else{
                    var selectorDom = currentDom.find(selector).not(domHistory);
                    selectorDom.each(function () {
                        domHistory.push(this);
                        callback.call(this, {
                            type : 'nodeInsert'
                        });
                    });

                    //监听属性更改
                    currentDom.find('*').bind('DOMAttrChange', function (ev, attrName, oldValue, newValue) {
                        if($(this).is(selector)){
                            callback.call(this, {
                                type : 'attrChange',
                                attrName : attrName,
                                oldValue : oldValue,
                                newValue : newValue
                            });
                        }
                    }).bind('DOMAttrRemove', function (e, removeAttrName) {
                        if($(this).is(selector)){
                            callback.call(this, {
                                type : 'attrRemove',
                                attrName : removeAttrName
                            });
                        }
                    });
                }
            }).bind('DOMNodeRemoved', function (e) {
                var currentDom = $(e.target);
                if(currentDom.is(selector)){
                    callback.call(e.target, {
                        type : 'nodeRemove'
                    });
                }else{
                    var selectorDom = currentDom.find(selector);
                    if(selectorDom.length > 0){
                        selectorDom.each(function () {
                            callback.call(this, {
                                type : 'nodeRemove'
                            });
                        });
                    }
                }
            });
        }*/
        listenDomChange : function (selector, callback) {
            var oldFun = (selectorArr[selector] != null) ? selectorArr[selector] : function () {};
            selectorArr[selector] = function (data) {
                oldFun.call(this, data);
                callback.call(this, data);
            };
            return this;
        }
    });

    $.extend({
        listenDomChange : function (selector, callback) {
            var oldFun = (selectorArr[selector] != null) ? selectorArr[selector] : function () {};
            selectorArr[selector] = function (data) {
                oldFun.call(this, data);
                callback.call(this, data);
            };
            return this;
        }
    });

    $(document).ready(function () {
        $.each(selectorArr, function (selector, callback) {
            $(selector).each(function () {
                callback.call(this, {
                    type : 'nodeInsert'
                });
            });
        });

        $('*').bind('DOMAttrChange', function (e, attrName, oldValue, newValue) {
            var self = $(this);
            $.each(selectorArr, function (selector, callback) {
                if(self.is(selector)){
                    callback.call(this, {
                        type : 'attrChange',
                        attrName : attrName,
                        oldValue : oldValue,
                        newValue : newValue
                    });
                }
            });
        }).bind('DOMAttrRemove', function (e, removeAttrName) {
            var self = $(this);
            $.each(selectorArr, function (selector, callback) {
                if(self.is(selector)){
                    callback.call(this, {
                        type : 'attrRemove',
                        attrName : removeAttrName
                    });
                }
            });
        });
    }).bind('DOMNodeInserted', function (e) {
        var currentDom = $(e.target);
        if(currentDom.data('initNodeInsert') === true) return;

        //添加属性监听
        currentDom.bind('DOMAttrChange', function (ev, attrName, oldValue, newValue) {
            var self = $(this);
            $.each(selectorArr, function (selector, callback) {
                if(self.is(selector)){
                    callback.call(this, {
                        type : 'attrChange',
                        attrName : attrName,
                        oldValue : oldValue,
                        newValue : newValue
                    });
                }
            });
        }).bind('DOMAttrRemove', function (e, removeAttrName) {
            var self = $(this);
            $.each(selectorArr, function (selector, callback) {
                if(self.is(selector)){
                    callback.call(this, {
                        type : 'attrRemove',
                        attrName : removeAttrName
                    });
                }
            });
        }).find('*').bind('DOMAttrChange', function (ev, attrName, oldValue, newValue) {
            var self = $(this);
            $.each(selectorArr, function (selector, callback) {
                if(self.is(selector)){
                    callback.call(this, {
                        type : 'attrChange',
                        attrName : attrName,
                        oldValue : oldValue,
                        newValue : newValue
                    });
                }
            });
        }).bind('DOMAttrRemove', function (e, removeAttrName) {
            var self = $(this);
            $.each(selectorArr, function (selector, callback) {
                if(self.is(selector)){
                    callback.call(this, {
                        type : 'attrRemove',
                        attrName : removeAttrName
                    });
                }
            });
        });

        //循环查找时候有相应的选择器
        $.each(selectorArr, function (selector, callback) {
            if(currentDom.is(selector)){
                callback.call(e.target, {
                    type : 'nodeInsert'
                });
            }

            currentDom.find(selector).each(function () {
                callback.call(this, {
                    type : 'nodeInsert'
                });
            });
        });

        currentDom.data('initNodeInsert', true);
    }).bind('DOMNodeRemoved', function (e) {
        var currentDom = $(e.target);

        $.each(selectorArr, function (selector, callback) {
            if(currentDom.is(selector)){
                callback.call(e.target, {
                    type : 'nodeRemove'
                });
            }
            currentDom.find(selector).each(function () {
                callback.call(this, {
                    type : 'nodeRemove'
                });
            });
        });
    });
})(window, jQuery);