/**
 * Created by JET on 2016/11/7.
 */
$.listenDomChange('[xui-qrcode]', function (obj) {
    var config = ($(this).attr('xui-qrcode') == '') ? {} : eval('(' + $(this).attr('xui-qrcode') + ')');
    if(obj.type === 'nodeInsert'){
        $(this).qrcode(config);
    }else if(obj.type === 'attrChange' && obj.attrName === 'xui-qrcode'){
        $(this).empty().qrcode(config);
    }
});