/**
 * Created by JET on 2016/11/7.
 */
(function ($) {
    $.fn.extend({
        slider : function (options) {
            $(this).each(function (index, element) {
                var type = typeof(options);
                if(type == 'object' || options == null){
                    slider.init($(element), options);
                }else if(type == 'number'){
                    slider.select($(element), options);
                }else{
                    switch (options){
                        case 'init':
                            options = ($(element).attr('xui-slider') == '') ? {} : eval('(' + $(element).attr('xui-slider') + ')');
                            slider.init($(element), options);
                            break;
                        case 'uninstall':
                            slider.uninstall($(element));
                            break;
                        case 'play':
                            slider.play($(element));
                            break;
                        case 'stop':
                            slider.stop($(element));
                            break;
                        case 'next':
                            slider.next($(element));
                            break;
                        case 'prev':
                            slider.prev($(element));
                            break;
                    }
                }
            });
        }
    });

    var slider = {
        options : {
            group : '.xui-slider-group',          //滚动组
            btn : '.xui-slider-btn',              //按钮
            active : 'xui-active',                //选中样式
            autoplay : true,                     //自动播放
            isDrag : true,                       //是否拖动
            autoHeight : 'one',                   //自动高度，是第一个高度（one）或者当前（current），false取消自动高度
            speed : 3000                          //播放时间
        },
        init : function (element, options) {
            slider.currentOptions(element, $.extend({}, slider.options, options));
            var currentOptions = slider.currentOptions(element);

            /*//初始化
            function init() {
                element.find(currentOptions.group + ' > *').css('width', element.outerWidth());
                slider.selectNotAnimate(element, slider.currentIndex(element));
                var autoHeight = currentOptions.autoHeight;

                function setInitHeight() {
                    var height = (autoHeight == 'current') ? element.find(currentOptions.group + ' > *').eq(slider.currentIndex(element)).outerHeight() : ((autoHeight == 'one') ? element.find(currentOptions.group + ' > *').eq(0).outerHeight() : 0);
                    if(height !== 0)
                        element.find(currentOptions.group).parent().css('height', height);
                    element.triggerHandler('xui.slider.init.complete');
                }

                //如果有图片用图片事件
                if (element.find(currentOptions.group + ' > * img').length > 0) {
                    element.find(currentOptions.group + ' > * img').eq(0).bind('load error', function () {
                        setInitHeight();
                    });
                } else {
                    setInitHeight();
                }
            }

            //初始化选项
            var index = element.find(currentOptions.btn).index(element.find(currentOptions.btn + '.' + currentOptions.active));
            slider.currentIndex(element, index);
            slider.selectNotAnimate(element, index);

            element.imagesLoaded(function () {
                element.find(currentOptions.group + ' > *').css('width', element.outerWidth());
            });

            init();
            $(window).bind('resize', init);*/

            //初始化选项
            var index = element.find(currentOptions.btn).index(element.find(currentOptions.btn + '.' + currentOptions.active));
            slider.selectNotAnimate(element, index);

            //初始化宽高
            function initWH() {
                element.find(currentOptions.group + ' > *').css('width', element.outerWidth());
                var autoHeight = currentOptions.autoHeight;
                var height = (autoHeight == 'current') ? element.find(currentOptions.group + ' > *').eq(slider.currentIndex(element)).outerHeight() : ((autoHeight == 'one') ? element.find(currentOptions.group + ' > *').eq(0).outerHeight() : 0);
                if(height !== 0)
                    element.find(currentOptions.group).parent().css('height', height);
                slider.selectNotAnimate(element, index);
            }

            if (element.find(currentOptions.group + ' > * img').length > 0) {
                initWH();
                element.imagesLoaded(function () {
                    initWH();
                    element.triggerHandler('xui.slider.init.complete');
                });
            } else {
                initWH();
                element.triggerHandler('xui.slider.init.complete');
            }

            element.find(currentOptions.group + ' > *').bind('DOMNodeInserted', function () {
                initWH();
            }).bind('DOMNodeRemoved', function () {
                //为了等删除后再重新真正的高度
                window.setTimeout(function () {
                    initWH();
                },100);
            });

            $(window).bind('resize', initWH);

            //添加默认事件
            slider.addEvent(element);
            //自动播放
            if(currentOptions.autoplay) slider.play(element);
            //添加事件监听
            if(currentOptions.isDrag) slider.addDragEvent(element);

            element.data('xui.slider.init', true);
        },
        uninstall : function (element) {
            element.removeData('xui.slider.init');
            element.find(slider.currentOptions(element).btn).unbind('click');
            slider.stop(element);
            element.find(slider.currentOptions(element).group).unbind('dragstart drag dragend touchstart touchmove');
        },
        play : function (element) {
            if(element.data('xui.slider.timer') != null) return;

            var timer = window.setInterval(function () {
                slider.next(element);
            }, slider.currentOptions(element).speed);
            element.data('xui.slider.timer', timer);
        },
        stop : function (element) {
            window.clearInterval(element.data('xui.slider.timer'));
            element.data('xui.slider.timer', null);
        },
        addEvent : function (element) {
            element.find(slider.currentOptions(element).btn).click(function () {
                var index = element.find(slider.currentOptions(element).btn).index($(this));
                slider.select(element, index);
            });
        },
        addDragEvent : function (element) {
            var startX = 0;
            var touchStartX = 0, touchStartY = 0;
            element.find(slider.currentOptions(element).group).drag('start', function (event, dd) {
                slider.stop(element);
                startX = dd.offsetX;
            }).drag('end', function (event, dd) {
                var result = dd.offsetX - startX;
                var sliderIndex = slider.currentIndex(element);
                var sliderRange = element.width() / 2;
                if(result >= 0){
                    //范围
                    if(result >= sliderRange){
                        if(sliderIndex <= 0){
                            slider.select(element, sliderIndex);
                        }else{
                            slider.prev(element);
                        }
                    }else{
                        slider.select(element, sliderIndex);
                    }
                }else{
                    if(-result >= sliderRange){
                        if(sliderIndex >= $(this).find('> *').length - 1){
                            slider.select(element, sliderIndex);
                        }else{
                            slider.next(element);
                        }
                    }else{
                        slider.select(element, sliderIndex);
                    }
                }
                if(slider.currentOptions(element).autoplay) slider.play(element);
            }).drag(function (event, dd) {
                var result = dd.offsetX - startX;
                result = (result < 0) ? -result : result;
                if(result >= 20){
                    $(this).css('left', dd.offsetX);
                }
                //$(this).css('left', dd.offsetX);
            }).bind('touchstart', function (event) {
                touchStartX = event.clientX;
                touchStartY = event.clientY;
            }).bind('touchmove', function (event) {
                var moveX = event.clientX - touchStartX;
                var moveY = event.clientY - touchStartY;
                if (Math.abs(moveY) < Math.abs(moveX)) {
                    event.preventDefault();  //阻止其他事件
                }
            });
        },
        prev : function (element) {
            var sliderIndex = slider.currentIndex(element);
            sliderIndex--;
            if(sliderIndex <= -1) sliderIndex = element.find(slider.currentOptions(element).group + ' > *').length - 1;
            slider.select(element, sliderIndex);
            slider.currentIndex(element, sliderIndex);
        },
        next : function (element) {
            var sliderIndex = slider.currentIndex(element);
            sliderIndex++;
            if(sliderIndex >= element.find(slider.currentOptions(element).group + ' > *').length) sliderIndex = 0;
            slider.select(element, sliderIndex);
            slider.currentIndex(element, sliderIndex);
        },
        indexValue : function (element, index) {
            var sliderIndexLeft = 0;
            element.find(slider.currentOptions(element).group + ' > *').slice(0, index).each(function (index, element) {
                sliderIndexLeft += $(element).outerWidth();
            });
            return sliderIndexLeft;
        },
        select : function (element, index) {
            var currentOptions = slider.currentOptions(element);

            element.find(currentOptions.group).animate({ left : -slider.indexValue(element, index)}, function () {
                element.find(currentOptions.btn)
                    .removeClass(currentOptions.active)
                    .eq(index).addClass(currentOptions.active);

                slider.currentIndex(element, index);

                var autoHeight = currentOptions.autoHeight;
                if(autoHeight == 'current')
                    element.find(currentOptions.group).parent().css('height', element.find(currentOptions.group + ' > *').eq(slider.currentIndex(element)).outerHeight());
                else if(autoHeight == 'one')
                    element.find(currentOptions.group).parent().css('height', element.find(currentOptions.group + ' > *').eq(0).outerHeight());
                element.triggerHandler('xui.slider.select');
            });
        },
        selectNotAnimate : function (element, index) {
            element.find(slider.currentOptions(element).group).css({ left : -slider.indexValue(element, index)});
            slider.currentIndex(element, index);
        },
        currentOptions : function (element, options) {
            if(options != null){
                element.data('xui.slider.options', JSON.stringify(options));
            }
            return (element.data('xui.slider.options') == null) ? {} : JSON.parse(element.data('xui.slider.options'));
        },
        currentIndex : function (element, index) {
            if(index != null){
                element.data('xui.slider.index', index);
            }
            return (element.data('xui.slider.index') == null) ? 0 : element.data('xui.slider.index');
        }
    };
})(jQuery);