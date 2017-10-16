/**
 * Created by JET on 2016/11/11.
 */
$(function () {
    $(xui.eventDelegate)
        /**
         * 选项卡控件
         */
        .on('click', "[xui-tab-nav-group] > *", function () {
            var navGroup = $(this).parent();  //属性组
            var navGroupChildren = navGroup.find(' > *');  //属性组所有子集
            var navActive = (navGroup.attr('xui-tab-active') == null) ? 'xui-active' : navGroup.attr('xui-tab-active');
            var index = navGroupChildren.index($(this));
            var name = navGroup.attr('xui-tab-nav-group');

            var panleGroup = $("[xui-tab-panel-group='" + name + "']");  //属性组
            var panleGroupChildren = panleGroup.find(' > *');            //属性组所有子集
            var panleActive = (panleGroup.attr('xui-tab-active') == null) ? 'xui-active' : panleGroup.attr('xui-tab-active');

            navGroupChildren.removeClass(navActive);
            $(this).addClass(navActive);

            panleGroupChildren.removeClass(panleActive).eq(index).addClass(panleActive);
        })
});