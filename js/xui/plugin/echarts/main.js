/**
 * Created by JET on 2017/3/2.
 */
include(xui.baseURL + 'plugin/echarts/lib/echarts.js');
$(function () {
    require.config({
        paths: {
            echarts: xui.baseURL + 'plugin/echarts/lib'
        }
    });
});