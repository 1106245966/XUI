/**
 * Created by JET on 2016/11/7.
 */
(function ($) {
    $.listenDomChange('[xui-slider]', function (obj) {
        if(obj.type === 'nodeInsert'){
            var options = ($(this).attr('xui-slider') == '') ? {} : eval('(' + $(this).attr('xui-slider') + ')');
            if(!$(this).data('xui.slider.init')){
                $(this).slider(options);
            }
        }else if(obj.type === 'attrRemove' && obj.attrName === 'xui-slider'){
            $(this).slider('uninstall');
        }
    });
})(jQuery);