/**
 * Created by JET on 2016/11/7.
 */
(function ($) {
    $(document).listenDomChange('[xui-lazyload] img', function (obj) {
        if(obj.type === 'nodeInsert'){
            $(this).attr('data-original', $(this).attr('src'));
            $(this).removeAttr('src');
            var lazyload = $(this).closest('[xui-lazyload]');
            $(this).lazyload({
                container : lazyload.is('body') ? window : lazyload,
                effect : "fadeIn",
                threshold : 500,
                load : function () {
                    $(this).removeAttr('data-original');
                }
            });
        }
    });
})(jQuery);
