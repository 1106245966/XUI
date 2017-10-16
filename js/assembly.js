/**
 * Created by JET on 2017/4/7.
 */
//图片轮播
artTemplate.createAssembly('xui-carousel-figure', {
    default : {
        theme : null,                                          //主题
        images : [],                                            //图片路径
        imageLoadedCallback : function (data) { }             //图片加载完成回调
    },
    init : function () {
        var element = this.element;
        var data = this.data;
        $(element).children().slider('init');
        $(element).children().bind('xui.slider.init.complete', function () {
            $(element).children().slider('init');
            if(data.imageLoadedCallback) data.imageLoadedCallback({
                width : $(element).width(),
                height: $(element).height()
            });
        });
    },
    render : function () {
        return '<div class="xui-slider{{if theme}} {{theme}}{{/if}}">\n    <ul class="xui-slider-group">\n        {{each data as list}}\n        <li class="xui-slider-item"><a{{if list.link}} href="{{list.link}}"{{/if}}{{if list.title}} title="{{list.title}}"{{/if}}><img src="{{list.src}}"{{if list.title}} alt="{{list.title}}"{{/if}} /></a></li>\n        {{/each}}\n    </ul>\n    <ul class="xui-slider-btn-group">\n        {{each data as list index}}\n        <li class="xui-slider-btn{{if index == 0}} xui-active{{/if}}"></li>\n        {{/each}}\n    </ul>\n</div>'
    }
});

//宫格导航
artTemplate.createAssembly('xui-grid-nav', {
    default : {
        theme : null,                  //主题
        lists : [],                    //列表数据
        row : 3,                       //行
        col : 3                        //列
    },
    init : function () {
        var element = this.element;
        var data = this.data;
        $(element).children().slider({
            group : '.xui-tab-body-box',
            btn : '.xui-tab-nav > *',
            autoplay : false,
            isDrag : true
        });
    },
    render : function () {
        return '<div class="xui-tab{{if theme}} {{theme}}{{/if}}">\n    <div class="xui-tab-body">\n        <div class="xui-tab-body-box">\n            {{paging lists row*col newList}}\n            <div class="xui-tab-panel">\n                <div class="xui-grid-avg-{{col}} xui-padding-horizontal-children">\n                    {{each newList as value}}\n                        <a{{if value.link}} href="{{value.link}}"{{/if}}>\n                            <div class="xui-tab-nav-icon">\n                                {{if value.msgNum || value.msgNum != \'0\'}}\n                                    <span class="xui-badge xui-round xui-badge-red">{{value.msgNum}}</span>\n                                {{/if}}\n                                {{if value.src}}\n                                    <img src="{{value.src}}">\n                                {{/if}}\n                            </div>\n                            <div class="xui-tab-nav-text">{{value.text}}</div>\n                        </a>\n                    {{/each}}\n                    \n                    {{loop 1 (row*col)-newList.length}}\n                    <a></a>\n                    {{/loop}}\n                </div>\n            </div>\n            {{/paging}}\n        </div>\n    </div>\n    <ul class="xui-tab-nav">\n        {{paging lists (row*col) newList page}}\n        <li{{if page == 1}} class="xui-active"{{/if}}></li>\n        {{/paging}}\n    </ul>\n</div>';
    }
});

artTemplate.createAssembly('xui-select', {
    default : {
        theme : null,                  //主题
        name : null,                   //name名字
        data : null,                   //数据
        value : null                   //值
    },
    init : function () {
        var element = this.element;
        var data = this.data;
        function callbackData(listData){
            listData = {
                data : listData,
                value : data.value
            };
            var html = '{{each data as list}}\n<option value="{{list.id}}"{{if value == list.id}} selected="selected"{{/if}}>{{list.value}}</option>\n{{/each}}';
            $(element).children().html(artTemplate(html, listData));
        }

        if(typeof data['data'] == 'function'){
            data['data'](callbackData);
        }
    },
    render : function () {
        return '<select{{if theme}} class="{{theme}}"{{/if}}{{if name}} name="{{name}}"{{/if}}>\n    {{each data as list}}\n    <option value="{{list.id}}"{{if value == list.id}} selected="selected"{{/if}}>{{list.value}}</option>\n    {{/each}}\n</select>';
    }
});

artTemplate.createAssembly('xui-radio', {
    default : {
        theme : null,                  //主题
        name : null,                   //name名字
        data : null,                   //数据
        value : null                   //值
    },
    render : function () {
        return '{{each data as list}}\n    <label class="xui-radio{{if theme}} {{theme}}{{/if}}">\n        <input type="radio"{{if name}} name="{{name}}"{{/if}}value="{{list.id}}"{{if value == list.id}} checked="checked"{{/if}} />\n        <span class="xui-radio-icon"></span>\n        <span class="xui-radio-lable">{{list.value}}</span>\n    </label>\n{{/each}}';
    }
});

artTemplate.createAssembly('xui-header', {
    default : {
        theme : null,                  //主题
        title : null,                  //标题
        left : null,                   //左边
        right : null,                  //右边
        fixed : false                  //是否固定
    },
    render : function () {
        return '<header class="xui-header{{if theme}} {{theme}}{{/if}}{{if fixed === true || fixed === \'true\'}} xui-fixed xui-fixed-lt{{/if}}"{{if fixed === true || fixed === \'true\'}} xui-fixed-placeholder="top"{{/if}}{{each attr as attrvalue attrname}} {{attrname}}="{{attrvalue}}"{{/each}}>\n    {{if left}}\n        <div class="xui-header-left">\n            {{each left as list}}\n            <a{{if list.link}} href="{{list.link}}"{{/if}}{{each list.attr as attrvalue attrname}} {{attrname}}="{{attrvalue}}"{{/each}}>\n                {{if list.icon}}<i class="{{list.icon}}"></i>{{/if}}\n                {{if list.text}} {{list.text}}{{/if}}\n            </a>\n            {{/each}}\n        </div>\n    {{/if}}\n    {{if title}}\n        <h1 class="xui-header-title">{{#title}}</h1>\n    {{/if}}\n    {{if right}}\n        <div class="xui-header-right">\n            {{each right as list}}\n                <a{{if list.link}} href="{{list.link}}"{{/if}}{{each list.attr as attrvalue attrname}} {{attrname}}="{{attrvalue}}"{{/each}}>\n                    {{if list.text}}{{list.text}} {{/if}}\n                    {{if list.icon}}<i class="{{list.icon}}"></i>{{/if}}\n                </a>\n            {{/each}}\n        </div>\n    {{/if}}\n</header>';
    }
});