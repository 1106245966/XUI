/**
 * Created by JET on 2016/11/14.
 */
(function ($) {
    var photoSwipeHtml = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n\n    <!-- Background of PhotoSwipe.\n         It\'s a separate element as animating opacity is faster than rgba(). -->\n    <div class="pswp__bg"></div>\n\n    <!-- Slides wrapper with overflow:hidden. -->\n    <div class="pswp__scroll-wrap">\n\n        <!-- Container that holds slides.\n            PhotoSwipe keeps only 3 of them in the DOM to save memory.\n            Don\'t modify these 3 pswp__item elements, data is added later on. -->\n        <div class="pswp__container">\n            <div class="pswp__item"></div>\n            <div class="pswp__item"></div>\n            <div class="pswp__item"></div>\n            <div class="pswp__item"></div>\n        </div>\n\n        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n        <div class="pswp__ui pswp__ui--hidden">\n\n            <div class="pswp__top-bar">\n\n                <!--  Controls are self-explanatory. Order can be changed. -->\n\n                <div class="pswp__counter"></div>\n\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n\n                <button class="pswp__button pswp__button--share" title="Share"></button>\n\n                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\n\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n                <!-- element will get class pswp__preloader--active when preloader is running -->\n                <div class="pswp__preloader">\n                    <div class="pswp__preloader__icn">\n                        <div class="pswp__preloader__cut">\n                            <div class="pswp__preloader__donut"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n                <div class="pswp__share-tooltip"></div>\n            </div>\n\n            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">\n            </button>\n\n            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">\n            </button>\n\n            <div class="pswp__caption">\n                <div class="pswp__caption__center"></div>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>';
    $.extend({
        photoSwipe : function (imgArr, options) {
            options = (options == null) ? {} : options;
            var photoSwipeElement = $(photoSwipeHtml).appendTo('body')[0];
            var defaultOptions = {
                shareEl : false,
                index: 0
            };
            var gallery = new PhotoSwipe( photoSwipeElement, PhotoSwipeUI_Default, imgArr, $.extend({}, defaultOptions, options));
            var photoSwipeDefaultClose = gallery.close;
            gallery.close = function () {
                photoSwipeDefaultClose();
                $(photoSwipeElement).remove();
            };
            gallery.init();
        }
    });
    $.fn.extend({
        photoSwipe : function (options) {
            options = (options == null) ? {} : options;
            var imgArr = [];
            $(this).each(function (index, element) {
                var src = '';
                switch ($(element)[0].tagName.toLowerCase()){
                    case 'img':
                        src = $(element).attr('src');
                        break;
                    case 'a':
                        src = $(element).attr('href');
                        break;
                }
                imgArr.push({
                    src : src,
                    title : ($(element).attr('title') == null) ? '' : $(element).attr('title')
                });
            });

            imgWidthHeight(imgArr, function (imgWidthHeightArr) {
                $.photoSwipe(imgWidthHeightArr, options);
            });
        }
    });

    var imgWidthArr = [];
    function imgWidthHeight(imgArr, callback) {
        var img = new Image();
        img.src = imgArr[0]['src'];
        img.title = imgArr[0]['title'];
        $(img).bind('load error', function () {
            imgArr.splice(0, 1);
            imgWidthArr.push({
                src : this.src,
                w : this.width,
                h : this.height,
                title : this.title
            });
            if(imgArr.length <= 0){
                callback(imgWidthArr);
                imgWidthArr = [];
            }else{
                imgWidthHeight(imgArr, callback);
            }
        });
    }
})(jQuery);