/**
 * Created by JET on 2016/11/14.
 */
$(function () {
    $(xui.eventDelegate)
        .on('click', "[xui-gallery]", function (e) {
            var groupName = $(this).attr('xui-gallery');
            $("[xui-gallery='" + groupName + "']").photoSwipe({
                index : $("[xui-gallery='" + groupName + "']").index($(this))
            });
            return false;
        });
});