/**
 * Created by JET on 2016/11/7.
 */
$(function () {
    $(xui.eventDelegate)
        .on('click', "[xui-dialog-popup]", function (e) {
            var selecter = $(this).attr('xui-dialog-popup');
            $(selecter).dialogPopup();
            return false;
        })
        .on('click', "[xui-dialog-popup-close]", function (e) {
            var selecter = $(this).attr('xui-dialog-popup-close');
            if(selecter.isEmpty()){
                $(this).closest('.xui-dialog-popup').dialogPopup('close');
            }else{
                $(selecter).dialogPopup('close');
            }
            return false;
        });
});