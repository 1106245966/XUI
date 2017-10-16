/**
 * Created by JET on 2016/11/7.
 */
(function ($) {
    var alertHtml = '<div class="xui-dialog">\n    <div class="xui-dialog-box">\n        <div class="xui-dialog-header">{{title}}</div>\n        <div class="xui-dialog-body">{{content}}</div>\n        <div class="xui-dialog-footer">\n            <a class="xui-dialog-btn" href="javascript:void(0);">确定</a>\n        </div>\n    </div>\n</div>';
    var dialogHtml = '<div class="xui-dialog">\n    <div class="xui-dialog-box">\n        <div class="xui-dialog-header">{{title}}</div>\n        <div class="xui-dialog-body">{{content}}</div>\n        {{if options.length > 0}}\n        <div class="xui-dialog-footer">\n            <div class="xui-grid-avg-{{options.length}}">\n                {{each options as list}}\n                <a class="xui-dialog-btn" href="javascript:void(0);">{{list.name}}</a>\n                {{/each}}\n            </div>\n        </div>\n        {{/if}}\n    </div>\n</div>';
    var promptInfoHtml = '<div class="xui-dialog-info">\n    <div class="xui-dialog-box">\n        <div class="xui-dialog-header"><span class="{{icon}}"></span></div>\n        <div class="xui-dialog-body">{{content}}</div>\n    </div>\n</div>';
    var toastHtml = '<div class="xui-dialog-toast">{{content}}</div>';
    var actionHtml = '<div class="xui-dialog-action">\n     <div class="xui-dialog-box">\n        {{if title}}\n        <div class="xui-dialog-header">{{title}}</div>\n        {{/if}}\n        <ul class="xui-dialog-body">\n            {{each list}}\n            <li><a href="{{$value.link ? $value.link : \'javascript:void(0);\'}}">{{$value.name}}</a></li>\n            {{/each}}\n        </ul>\n        <div class="xui-dialog-footer">取消</div>\n    </div>\n</div>';
    var dialogWindowHtml = '<div class="xui-dialog-window {{theme}}">\n    <div class="xui-dialog-window-header xui-fc">\n        <div class="xui-fl">{{title}}</div>\n        <div class="xui-fr">\n            <i class="xui-icon-times"></i>\n        </div>\n    </div>\n    <div class="xui-dialog-window-body">\n        <iframe src="{{src}}"></iframe>\n    </div>\n    <div class="xui-dialog-window-zoom"></div>\n</div>';
    var promptInfoElement;
    $.extend({
        alert : function (content, title, callback) {
            if($.isFunction(title)){
                callback = title;
                title = '';
            }
            var html = artTemplate(alertHtml, {
                title : title,
                content : content
            });
            $(function () {
                var htmlElement = $(html);
                htmlElement.find('.xui-dialog-btn').click(function () {
                    htmlElement.find('.xui-dialog-box').hide(200, function () {
                        if(callback != null) callback();
                        htmlElement.remove();
                    });
                    return false;
                });
                htmlElement.hide().find('.xui-dialog-box').hide();
                htmlElement.appendTo('body');
                htmlElement.fadeIn(function () {
                    htmlElement.find('.xui-dialog-box').show(200);
                });
            });
        },
        promptInfo : function (icon, content) {
            if(icon == 'close'){
                promptInfoElement.remove();
                return;
            }
            var html = artTemplate(promptInfoHtml, {
                icon : icon,
                content : content
            });
            promptInfoElement = $(html);
            promptInfoElement.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $(function () {
                promptInfoElement.appendTo('body');
            });
        },
        wait : function (content) {
            if(content == 'close'){
                $.promptInfo('close');
                return;
            }
            content = (content == null) ? '加载中...' : content;
            $.promptInfo('xui-icon-spinner xui-icon-spin xui-text-xxl', content);
        },
        success : function (content) {
            if(content == 'close'){
                $.promptInfo('close');
                return;
            }
            content = (content == null) ? '提交成功' : content;
            $.promptInfo('xui-icon-check xui-text-xxxl', content);
        },
        error : function (content) {
            if(content == 'close'){
                $.promptInfo('close');
                return;
            }
            content = (content == null) ? '提交失败' : content;
            $.promptInfo('xui-icon-close xui-text-xxxl', content);
        },
        dialog : function (content, title, options) {
            options = (options == null) ? [] : options;
            var html = artTemplate(dialogHtml, {
                title : title,
                content : content,
                options : options
            });
            $(function () {
                var htmlElement = $(html);
                htmlElement.find('.xui-dialog-btn').each(function (index, element) {
                    $(element).click(function () {
                        if(options[index].before != null){
                            if(options[index].before() == false)
                                return false;
                        }
                        htmlElement.find('.xui-dialog-box').hide(200, function () {
                            htmlElement.remove();
                            if(options[index].callback != null) options[index].callback();
                        });
                    });
                });
                htmlElement.hide().find('.xui-dialog-box').hide();
                htmlElement.fadeIn(function () {
                    htmlElement.find('.xui-dialog-box').show(200);
                });
                htmlElement.appendTo('body');
            });
        },
        toast : function (content, callback, speed) {
            if(!$.isFunction(callback)){
                speed = callback;
                callback = null;
            }
            speed = (speed == null) ? 2000 : speed;

            var html = artTemplate(toastHtml, {
                content : content
            });
            $(function () {
                var htmlElement = $(html);
                htmlElement.appendTo('body').fadeIn();
                window.setTimeout(function () {
                    if(callback) callback();
                    htmlElement.remove();
                },speed);
            });
        },
        action : function (title, list) {
            if($.isArray(title)){
                list = title;
                title = '';
            }

            var html = artTemplate(actionHtml, {
                title : title,
                list : list
            });
            $(function () {
                var htmlElement = $(html);
                function close() {
                    htmlElement.find('.xui-dialog-box').animate({ bottom : -htmlElement.find('.xui-dialog-box').height() },'fast', function () {
                        htmlElement.remove();
                    });
                }
                htmlElement.click(close).find('.xui-dialog-footer').click(close);
                htmlElement.find('.xui-dialog-body li').each(function (index, element) {
                    $(element).click(function () {
                        if(list[index].callback) list[index].callback();
                        close();
                    });
                });

                htmlElement.find('.xui-dialog-box').click(function (e) {
                    window.event ? window.event.cancelBubble = true : e.stopPropagation();
                });

                htmlElement.hide().find('.xui-dialog-box').hide();
                htmlElement.appendTo('body').fadeIn(function () {
                    htmlElement.find('.xui-dialog-box').show().css('bottom', -htmlElement.find('.xui-dialog-box').height()).animate({
                        bottom : 0
                    }, 'fast');
                });
            });
        },
        dialogWindow :function (options) {
            if(typeof options === 'string'){
                options = options.toLowerCase();
                if(options === 'current'){
                    return {
                        close : function () {
                            $(self.frameElement).parent().parent().parent().remove();
                        }
                    }
                }
                return null;
            }

            options = $.extend(true, {}, {
                mask : true,
                width : 1000,
                height: 500
            }, options);

            var html = artTemplate((options.mask) ? '<div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0;"></div>' + dialogWindowHtml : dialogWindowHtml, options);

            var htmlElement = $('<div>' + html + '</div>');
            $(function () {
                function initBody() {
                    htmlElement.find('.xui-dialog-window-body').height(htmlElement.find('.xui-dialog-window').height() - htmlElement.find('.xui-dialog-window-header').outerHeight());
                }
                function init() {
                    htmlElement.find('.xui-dialog-window').css({
                        width : options.width,
                        height : options.height,
                        left : ($(window).width() - options.width) / 2,
                        top : ($(window).height() - options.height) / 2
                    });
                    initBody();
                }

                htmlElement.find('.xui-dialog-window-header').drag(function (event, dd) {
                    $(this).parent().css({
                        left : dd.offsetX,
                        top : dd.offsetY
                    });
                }).dblclick(function () {
                    var parent = $(this).parent();
                    var isFullScreen = typeof parent.data('isFullScreen') === 'undefined' ? false : parent.data('isFullScreen');
                    if(isFullScreen){
                        parent.css(parent.data('beforeFullScreen'));
                        parent.data('isFullScreen', false);
                    }else{
                        parent.data('beforeFullScreen', {
                            top : parent.css('top'),
                            left : parent.css('left'),
                            width : parent.width(),
                            height : parent.height()
                        });
                        parent.css({
                            top : 0,
                            left : 0,
                            width : $(window).width() - 2,
                            height : $(window).height() - 2
                        });
                        parent.data('isFullScreen', true);
                    }
                    initBody();
                });
                htmlElement.find('.xui-dialog-window').drag('start', function (event, dd) {
                    dd.width = $(this).width();
                    dd.height = $(this).height();
                }).drag(function (event, dd) {
                    $(this).css({
                        width : Math.max( options.width, dd.width + dd.deltaX ),
                        height : Math.max( options.height, dd.height + dd.deltaY )
                    });
                    initBody();
                },{ handle:'.xui-dialog-window-zoom' });
                htmlElement.find('.xui-dialog-window-header .xui-icon-times').click(function (){
                    $(this).parent().parent().parent().parent().remove();
                });

                htmlElement.appendTo('body');
                init();
            });
            return {
                close : function (){
                    htmlElement.remove();
                }
            };
        }
    });

    $.fn.extend({
        dialogPopup : function (type) {
            var popup = $(this);
            var modal = popup.find(".xui-dialog-popup-model");
            if(type === 'close'){
                popup.removeClass('xui-active');
                modal.transitionEnd(function() {
                    popup.hide();
                    popup.trigger("xui.dialog.popup.close");
                });
                return this;
            }

            popup.show();
            popup.width();
            popup.addClass('xui-active');

            modal.width();
            modal.transitionEnd(function() {
                popup.trigger("xui.dialog.popup.open");
            });
            return this;
        }
    });
})(jQuery);