/**
 * Created by JET on 2016/11/17.
 */
$(function () {
    $(xui.eventDelegate)
        .on('click', "a[xui-frame]", function () {
            var frame = $(this).attr('xui-frame');
            $.iframe.open($(this).attr('href'), {
                animate : (frame == null || frame == '') ? 'none' : frame
            });
            return false;
        })
        .on('click', "a[xui-frame-close]", function () {
            var frame = $(this).attr('xui-frame-close');
            $.iframe.close($(this).attr('href'), {
                animate : (frame == null || frame == '') ? 'auto' : frame
            });
            return false;
        })
        .on('click', "a[xui-frame-hide]", function () {
            var frame = $(this).attr('xui-frame-hide');
            $.iframe.hide($(this).attr('href'), {
                animate : (frame == null || frame == '') ? 'auto' : frame
            });
            return false;
        });
});