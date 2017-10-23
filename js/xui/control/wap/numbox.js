/**
 * Created by JET on 2016/11/2.
 */
$(function () {
    $(xui.eventDelegate)
        /**
         * 数字加减框控件
         */
        .on('click', "[xui-numbox='minus']", function () {
            var self = $(this);
            var index = $("[xui-numbox='minus']").index(self);
            var input = $("[xui-numbox='input']").eq(index);
            var number = parseInt(input.val());
            var step = (input.attr('step') === undefined) ? 1 : parseInt(input.attr('step'));
            if (input.attr('min')) {
                if (parseInt(input.attr('min')) >= number) {
                    return false;
                }
            }
            if (self.triggerHandler('xui.numbox.minus.before', [number]) == false) return false;
            number -= step;
            input.val(number);
            self.triggerHandler('xui.numbox.minus.after', [number]);
        }).on('click', "[xui-numbox='plus']", function () {
            var self = $(this);
            var index = $("[xui-numbox='plus']").index(self);
            var input = $("[xui-numbox='input']").eq(index);
            var number = parseInt(input.val());
            var step = (input.attr('step') === undefined) ? 1 : parseInt(input.attr('step'));
            if (input.attr('max')) {
                if (parseInt(input.attr('max')) <= number) {
                    return false;
                }
            }
            if (self.triggerHandler('xui.numbox.plus.before', [number]) == false) return false;
            number += step;
            input.val(number);
            self.triggerHandler('xui.numbox.plus.after', [number]);
        }).on('blur', "[xui-numbox='input']", function () {
            var self = $(this);
            var oldValue = self.val();
            var max = self.attr('max') ? parseInt(self.attr('max')) : null;
            var min = self.attr('min') ? parseInt(self.attr('min')) : null;
            if(!/^\d+$/.test(self.val())){
                self.val((min) ? min : 1);
            }

            var number = parseInt(self.val());
            if(max && max < number){
                self.val(max);
            }

            if(min && min > number){
                self.val(min);
            }
            //在值发生改变时才触发事件
            if(oldValue !== self.val()){
                self.triggerHandler('xui.numbox.input.change', [self.val()]);
            }
        });
});