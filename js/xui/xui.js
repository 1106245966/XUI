function includeCss(path) {
    document.write('<link href="' + path + '" rel="stylesheet" type="text/css"' + xui.scriptAttrStr + ' />');
}
function includeScript(path) {
    document.write('<script type="text/javascript" src="'+ path +'"' + xui.scriptAttrStr + '></script>');
}
function include(path) {
    var suffix = path.match(/\.\w+$/);
    suffix = (suffix.length > 0) ? suffix[0] : '';
    suffix = suffix.replace('.', '');
    switch (suffix)
    {
        case 'js':
            includeScript(path);
            break;
        case 'css':
            includeCss(path);
            break;
    }
}
(function () {
    //XUI 入口
    var baseURL = '';
    // @koala-append 'jquery/jquery-1.8.3.min.js'
    // @koala-append 'jquery/jquery-listDomChange.js'
    // @koala-append 'jquery/jquery.event.drag-2.2.js'  //拖动事件
    // @koala-append 'jquery/jquery-scrollspy.js'  //滚动监听
    // @koala-append 'jquery/jquery.imagesloaded.min.js' //图片加载完成事件
    // @koala-append 'jquery/jquery-extend.js'
    // @koala-append 'jquery/jquery-control.js'
    // @koala-append 'jquery/jquery.html5.canvas-1.0.0.js'  //html5绘图
    // @koala-append 'core/artTemplate.js'    //artTemplate
    // @koala-append 'control/wap/select.js'
    // @koala-append 'control/wap/numbox.js'
    // @koala-append 'widget/wap/slider.js'
    // @koala-append 'widget/wap/dialog.js'
    // @koala-append 'widget/wap/dropload.js'
    // @koala-append 'widget/wap/tab.js'
    // @koala-append 'widget/wap/gallery.js'
    // @koala-append 'widget/wap/collapse.js'
    // koala-append 'core/iframe/function.js'
    // koala-append 'core/iframe/attrEnhance.js'
    // @koala-append 'core/main.js'

    var scripts = document.getElementsByTagName('script');
    var scriptArr = ['charset'];
    var xuiPlugin = null, xuiAttr = [], xuiAttrStr = '';
    for(var i = 0; i < scripts.length; i++){
        xuiPlugin = scripts[i].getAttribute('xui');
        if(xuiPlugin != null){
            for(var scriptArrIndex = 0; scriptArrIndex < scriptArr.length; scriptArrIndex++){
                var attr = scripts[i].getAttribute(scriptArr[scriptArrIndex]);
                if(attr !== null){
                    xuiAttr.push({
                        name : scriptArr[scriptArrIndex],
                        value : attr
                    });
                    xuiAttrStr += ' ' + scriptArr[scriptArrIndex] + '="' + attr + '"';
                }
            }
            baseURL = scripts[i].getAttribute('src').replace(/(xui\.js|xui\.min\.js)$/, '');
        }
    }

    //注册
    window['xui'] =  {
        baseURL : baseURL,
        version : '1.0.0',
        eventDelegate : 'body',
        scriptAttr : xuiAttr,
        scriptAttrStr : xuiAttrStr
    };

    //加载插件
    if(xuiPlugin !== null && xuiPlugin !== ''){
        var xuiPluginArr = xuiPlugin.split(',');
        for(var i = 0; i < xuiPluginArr.length; i++){
            includeScript(baseURL + 'plugin/' + xuiPluginArr[i] + '/main.js');
        }
    }

})();
