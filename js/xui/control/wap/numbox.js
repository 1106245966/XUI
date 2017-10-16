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
        });
});