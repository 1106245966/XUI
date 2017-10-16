$(function () {
    $('body')
    /**
     * ajax提交控件
     */
    /*.on('submit', "form", function (e) {
        /!*function isVType(dom){
            var prefix = 'xui-vtype-';
            var validate = {
                'required' : 'isEmpty'
            };
            var validateObj = {};
            $.each(validate, function (name, value){
                if(dom.is('['+ prefix + name + ']')){
                    validateObj[value] = prefix + name;
                }
            });
            return validateObj;
        }*!/

        var self = $(this);
        var submitBeforeData = self.serializeArray();
        var isTrue = true;
        $.each(submitBeforeData, function(){
            var name = this.name;
            var value = this.value;
            var inputDom = $('[name="' + name + '"]');
            if(typeof inputDom.attr('xui-vtype-required') !== 'undefined'){
                if(value.isEmpty()){
                    $.toast(inputDom.attr('xui-vtype-required'));
                    isTrue = false;
                    return false;
                }
            }
        });

        if(isTrue === false){
            return false;
        }
    })*/
    .on('submit', "form[xui-type='ajax']", function () {
        var isTrue = true;
        $.each($(this).serializeArray(), function(){
            var name = this.name;
            var value = this.value;
            var inputDom = $('[name="' + name + '"]');
            if(typeof inputDom.attr('xui-vtype-required') !== 'undefined'){
                if(value.isEmpty()){
                    $.toast(inputDom.attr('xui-vtype-required'));
                    isTrue = false;
                    return false;
                }
            }
            if(typeof inputDom.attr('xui-vtype-phone') !== 'undefined'){
                if(!value.isPhone() && value !== ''){
                    $.toast(inputDom.attr('xui-vtype-phone'));
                    isTrue = false;
                    return false;
                }
            }
        });
        if(isTrue === false){
            return false;
        }

        var self = $(this);
        var submitData = {};
        var submitBeforeData = self.serializeArray();
        for (var i = 0; i < submitBeforeData.length; i++) {
            submitData[submitBeforeData[i]['name']] = submitBeforeData[i]['value'];
        }
        if (self.triggerHandler("xui.ajaxSubmit.before", [submitData]) == false) return false;
        $.ajax({
            url: self.attr('action'),
            type: self.attr('method'),
            dataType : 'json',
            data: submitData,
            success: function (data) {
                self.triggerHandler("xui.ajaxSubmit.success", [data]);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                self.triggerHandler("xui.ajaxSubmit.error", [XMLHttpRequest, textStatus, errorThrown]);
            }
        });
        return false;
    })

	/**
    * 显示隐藏属性
    */
	.on('click', '[xui-show]', function () {
        var selecter = $(this).attr('xui-show');
        $(selecter).show();
    }).on('click', '[xui-hide]', function () {
        var selecter = $(this).attr('xui-hide');
        $(selecter).hide();
    })

    /**
     * 跳转属性
     */
    .on('click', '[xui-location]', function () {
        window.location = $(this).attr('xui-location');
        return false;
    });
});