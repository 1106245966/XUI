(function ($) {
    $.listenDomChange('[xui-pull-refresh]', function (obj) {
        if(obj.type === 'nodeInsert'){
            var options = ($(this).attr('xui-pull-refresh') == '') ? 50 : parseInt($(this).attr('xui-pull-refresh'));
            $(this).pullRefresh(options);
        }else if(obj.type === 'attrRemove' && obj.attrName === 'xui-pull-refresh'){

        }
    }).listenDomChange('[xui-loadmore]', function (obj) {
        if(obj.type === 'nodeInsert'){
            var options = ($(this).attr('xui-loadmore') == '') ? 50 : parseInt($(this).attr('xui-loadmore'));
            $(this).loadmore(options);
        }else if(obj.type === 'attrRemove' && obj.attrName === 'xui-loadmore'){
            $(this).loadmore('uninstall');
        }
    });
})(jQuery);