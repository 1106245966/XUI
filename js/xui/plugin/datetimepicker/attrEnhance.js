$.listenDomChange('[xui-datetimepicker]', function (obj) {
    if(obj.type === 'nodeInsert'){
        var datetimepicker = $(this).attr('xui-datetimepicker');
        var options = datetimepicker ? eval('(' + datetimepicker + ')') : {};
        var defaultOptions = {
            language : 'zh-CN'
        };

        if(options['format']){
            var format = options['format'];
            if(format.indexOf('y') > -1){
                defaultOptions['startView'] = 4;
                defaultOptions['minView'] = 4
            }
            if(format.indexOf('m') > -1){
                defaultOptions['startView'] = 3;
                defaultOptions['minView'] = 3;
            }
            if(format.indexOf('d') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 2;
            }
            if(format.indexOf('h') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 1;
            }
            if(format.indexOf('i') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 0;
            }
        }

        options = $.extend({}, options, defaultOptions);
        $(this).datetimepicker(options);
    }
});

$(function (){
    /*$('[xui-datetimepicker]').each(function (index, element) {
        var datetimepicker = $(this).attr('xui-datetimepicker');
        var options = datetimepicker ? eval('(' + datetimepicker + ')') : {};
        var defaultOptions = {
            language : 'zh-CN'
        };

        if(options['format']){
            var format = options['format'];
            if(format.indexOf('y') > -1){
                defaultOptions['startView'] = 4;
                defaultOptions['minView'] = 4
            }
            if(format.indexOf('m') > -1){
                defaultOptions['startView'] = 3;
                defaultOptions['minView'] = 3;
            }
            if(format.indexOf('d') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 2;
            }
            if(format.indexOf('h') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 1;
            }
            if(format.indexOf('i') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 0;
            }
        }

        options = $.extend({}, options, defaultOptions);
        $(this).datetimepicker(options);
    }).focus(function () {
        $(window).scrollTop($(this).offset().top);
        $(this).blur();
    });*/

    $(xui.eventDelegate)
    /*.on('click', "[xui-datetimepicker]", function (e) {
        var datetimepicker = $(this).attr('xui-datetimepicker');
        var options = datetimepicker ? eval('(' + datetimepicker + ')') : {};
        var defaultOptions = {
            language : 'zh-CN'
        };

        if(options['format']){
            var format = options['format'];
            if(format.indexOf('y') > -1){
                defaultOptions['startView'] = 4;
                defaultOptions['minView'] = 4
            }
            if(format.indexOf('m') > -1){
                defaultOptions['startView'] = 3;
                defaultOptions['minView'] = 3;
            }
            if(format.indexOf('d') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 2;
            }
            if(format.indexOf('h') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 1;
            }
            if(format.indexOf('i') > -1){
                defaultOptions['startView'] = 2;
                defaultOptions['minView'] = 0;
            }
        }

        options = $.extend({}, options, defaultOptions);
        $(this).datetimepicker(options).focus();
    })*/
    .on('focus', "[xui-datetimepicker]", function (e) {
        $(window).scrollTop($(this).offset().top);
        $(this).blur();
    });
});