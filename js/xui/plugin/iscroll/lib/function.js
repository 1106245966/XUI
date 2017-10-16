/**
 * Created by JET on 2016/11/15.
 */
(function ($) {
    $.fn.extend({
        iScroll : function (options) {
            if(this.data('iScrollReady') == null){
                var options =  $.extend({}, options);
                arguments.callee.object  = new iScroll(this.get(0), options);
                var myScroll = arguments.callee.object;
                $(window).bind('load', function () {
                    setTimeout(function(){
                        myScroll.refresh();
                    }, 200);
                });
                this.data('iScrollReady', true);
            }else{
                arguments.callee.object.refresh();
            }
            return arguments.callee.object;
        },
        /**
         * iScroll上拉和下拉
         * @param options : 参数
         */
        iScrollPullDrop : function (options) {
            var self = $(this);
            var isPull = true, isDropDown = true;
            var originalPull = (options.pullRefresh && options.pullRefresh.container) ? self.find(options.pullRefresh.container).html() : '',
                originalDropDown = (options.dropDownMore && options.dropDownMore.container) ? self.find(options.dropDownMore.container).html() : '';
            options = $.extend(true, {}, {
                scrollbar : 'xui-iScroll-scrollbar',
                pullRefresh : {
                    defaultContent : originalPull,
                    overContent : '<i class="xui-icon-arrow-up"></i> 释放刷新',
                    refreshContent : '<i class="xui-icon-spinner xui-icon-spin"></i> 加载中'
                },
                dropDownMore : {
                    defaultContent : originalDropDown,
                    refreshContent : '<i class="xui-icon-spinner xui-icon-spin"></i> 加载中'
                }
            }, options);
            $(this).iScroll({
                onScrollMove: function () {
                    if (this.y > 5) {
                        self.find(options.pullRefresh.container).html(options.pullRefresh.overContent);
                        isPull = true;
                        this.minScrollY = 0;
                    } else if (this.y < 5) {
                        self.find(options.pullRefresh.container).html(options.pullRefresh.defaultContent);
                        this.minScrollY = -$(options.pullRefresh.container).height();
                    }
                    if (this.y <= this.maxScrollY) {
                        isDropDown = true;
                    }
                },
                onRefresh: function () {
                    if(isPull){
                        self.find(options.pullRefresh.container).html(options.pullRefresh.defaultContent);
                        isPull = false;
                    }
                    if(isDropDown){
                        self.find(options.dropDownMore.container).html(options.dropDownMore.defaultContent);
                        isDropDown = false;
                    }
                },
                onScrollEnd: function () {
                    if(isPull){
                        self.find(options.pullRefresh.container).html(options.pullRefresh.refreshContent);
                        if(options.pullRefresh.callback) options.pullRefresh.callback(this);
                    }
                    if(isDropDown){
                        self.find(options.dropDownMore.container).html(options.dropDownMore.refreshContent);
                        if(options.dropDownMore.callback) options.dropDownMore.callback(this);
                    }
                },
                scrollbarClass : options.scrollbar,
                topOffset : self.find(options.pullRefresh.container).height()
            });
        }
    });
})(jQuery);