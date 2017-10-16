/**
 * Created by JET on 2017/3/7.
 */
include(xui.baseURL + 'plugin/turnjs/lib/extras/modernizr.2.5.3.min.js');
include(xui.baseURL + 'plugin/turnjs/lib/lib/turn.js');
if($.browser.msie && parseInt($.browser.version) == 8){
    include(xui.baseURL + 'plugin/turnjs/lib/lib/turn.html4.min.js');
}