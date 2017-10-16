/**
 * Created by JET on 2016/12/1.
 */
$(function () {
    $(xui.eventDelegate)
        .on('click', "[xui-collapse]", function (e) {
            var collapseClass = $(this).attr('xui-collapse') == '' ? 'xui-active' : $(this).attr('xui-collapse');
            var isGroup = typeof $(this).attr('xui-collapse-group') === 'undefined' ? false : true;
            var group = $(this).attr('xui-collapse-group');
            if(isGroup){
                $("[xui-collapse-group='" + group + "']").not($(this)).removeClass(collapseClass);
            }
            $(this).toggleClass(collapseClass);
            e.stopPropagation();
        }).on('click', "[xui-collapse-panel]", function (e) {
            e.stopPropagation();
        });
});