/**
 * Created by JET on 2016/11/2.
 */
(function ($) {
    $.extend({
        iosSelect : function (data, options) {
            new IosSelect(data.length, data, options);
        }
    });

    function dateData() {
        var data = [];
        data[0] = function (callback) {
            var yearData = [];
            for (var year = 1800; year <= 2300; year++) {
                yearData.push({
                    id: year,
                    value: year + "年"
                });
            }
            callback(yearData);
        };
        data[1] = function (year, callback) {
            var monthData = [];
            for (var month = 1; month <= 12; month++) {
                monthData.push({
                    id: month,
                    value: month + "月"
                });
            }
            callback(monthData);
        };
        data[2] = function (year, month, callback) {
            var dayData = [];
            var endDate = new Date(year,month,0).getDate();
            for (var day = 1; day <= endDate; day++) {
                dayData.push({
                    id: day,
                    value: day + "日"
                });
            }
            callback(dayData);
        };
        return data;
    }

    function timeData() {
        var data = [];
        data[0] = function (callback) {
            var hourData = [];
            for (var hour = 0; hour <= 23; hour++) {
                hourData.push({
                    id: hour,
                    value: hour.patch(2) + "时"
                });
            }
            callback(hourData);
        };
        data[1] = function (hour, callback) {
            var minuteData = [];
            for (var minute = 0; minute <= 60; minute++) {
                minuteData.push({
                    id: minute,
                    value: minute.patch(2) + "分"
                });
            }
            callback(minuteData);
        };
        return data;
    }

    $.fn.extend({
        iosSelectDate : function (format, callback) {
            $(this).blur();

            var self = $(this);
            if(self.val() == ''){
                if(self.data('xui.iosSelectDate.year') == null)
                    self.data('xui.iosSelectDate.year', new Date().getFullYear());
                if(self.data('xui.iosSelectDate.month') == null)
                    self.data('xui.iosSelectDate.month', new Date().getMonth() + 1);
                if(self.data('xui.iosSelectDate.day') == null)
                    self.data('xui.iosSelectDate.day', new Date().getDate());
            }else{
                var value = self.val();
                var valueArr = value.split('-');
                self.data('xui.iosSelectDate.year', parseInt(valueArr[0]));
                self.data('xui.iosSelectDate.month', parseInt(valueArr[1]));
                self.data('xui.iosSelectDate.day', parseInt(valueArr[2]));
            }

            $.iosSelect(dateData() ,{
                oneLevelId : self.data('xui.iosSelectDate.year'),
                twoLevelId : self.data('xui.iosSelectDate.month'),
                threeLevelId : self.data('xui.iosSelectDate.day'),
                showLoading: true,
                twoThreeRelation : 1,
                callback : function (oneLevelData, twoLevelData, threeLevelData) {
                    self.data('xui.iosSelectDate.year', parseInt(oneLevelData.id));
                    self.data('xui.iosSelectDate.month', parseInt(twoLevelData.id));
                    self.data('xui.iosSelectDate.day', parseInt(threeLevelData.id));
                    var value = oneLevelData.id.patch(4) + '-' + twoLevelData.id.patch(2) + '-' + threeLevelData.id.patch(2);
                    self.val(value);
                    callback(value);
                }
            });
        },
        iosSelectDateTime : function (format, callback) {
            $(this).blur();

            var self = $(this);
            if(self.val() == ''){
                if(self.data('xui.iosSelectDate.year') == null)
                    self.data('xui.iosSelectDate.year', new Date().getFullYear());
                if(self.data('xui.iosSelectDate.month') == null)
                    self.data('xui.iosSelectDate.month', new Date().getMonth() + 1);
                if(self.data('xui.iosSelectDate.day') == null)
                    self.data('xui.iosSelectDate.day', new Date().getDate());
                if(self.data('xui.iosSelectDate.hour') == null)
                    self.data('xui.iosSelectDate.hour', new Date().getHours());
                if(self.data('xui.iosSelectDate.minute') == null)
                    self.data('xui.iosSelectDate.minute', new Date().getMinutes());
            }else{
                var value = self.val();
                var dateTime = value.split(' ');
                var valueArr = dateTime[0].split('-');
                var time = dateTime[1].split(':');
                self.data('xui.iosSelectDate.year', parseInt(valueArr[0]));
                self.data('xui.iosSelectDate.month', parseInt(valueArr[1]));
                self.data('xui.iosSelectDate.day', parseInt(valueArr[2]));
                self.data('xui.iosSelectDate.hour', parseInt(time[0]));
                self.data('xui.iosSelectDate.minute', parseInt(time[1]));
            }

            $.iosSelect(dateData() ,{
                oneLevelId : self.data('xui.iosSelectDate.year'),
                twoLevelId : self.data('xui.iosSelectDate.month'),
                threeLevelId : self.data('xui.iosSelectDate.day'),
                showLoading: true,
                twoThreeRelation : 1,
                callback : function (oneLevelData, twoLevelData, threeLevelData) {
                    self.data('xui.iosSelectDate.year', parseInt(oneLevelData.id));
                    self.data('xui.iosSelectDate.month', parseInt(twoLevelData.id));
                    self.data('xui.iosSelectDate.day', parseInt(threeLevelData.id));
                    var date = oneLevelData.id.patch(4) + '-' + twoLevelData.id.patch(2) + '-' + threeLevelData.id.patch(2);
                    $.iosSelect(timeData() ,{
                        oneLevelId : self.data('xui.iosSelectDate.hour'),
                        twoLevelId : self.data('xui.iosSelectDate.minute'),
                        showLoading: true,
                        callback : function (oneLevelData, twoLevelData) {
                            self.data('xui.iosSelectDate.hour', parseInt(oneLevelData.id));
                            self.data('xui.iosSelectDate.minute', parseInt(twoLevelData.id));
                            var time = oneLevelData.id.patch(2) + ':' + twoLevelData.id.patch(2);
                            var value = date + ' ' + time;
                            self.val(value);
                            callback(value);
                        }
                    });
                }
            });
        }
    });
})(jQuery);