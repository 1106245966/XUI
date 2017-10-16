/**
 * Created by JET on 2016/11/2.
 */
$(function () {
    $(xui.eventDelegate)
    //iosSelect
    .on('click', "[xui-select-ios]", function (e) {
        var self = $(this);
        var title = self.attr('title');
        var select = self.find('select');
        var data = [];
        if(select.length > 0){
            select.find('option').each(function (index, element) {
                data.push({
                    id :$(element).val(),
                    value : $(element).text()
                });
            });
            $.iosSelect([data], {
                title : title,
                oneLevelId : select.prev().attr('value'),
                callback: function (selectOneObj) {
                    select.val(selectOneObj.id);
                    select.triggerHandler('change');
                    select.prev().attr('value', selectOneObj.id);
                    select.prev().text(selectOneObj.value);
                }
            });
        }
        return false;
    })
    .on('click', "[xui-select-ios-date]", function (e) {
        var self = $(this);
        self.iosSelectDate("", function (date) {
            self.trigger('xui.select.ios.date.ok', [date]);
        });
        return false;
    })
    .on('click', "[xui-select-ios-datetime]", function (e) {
        var self = $(this);
        self.iosSelectDateTime("", function (date) {
            self.trigger('xui.select.ios.date.ok', [date]);
        });
        return false;
    });
});