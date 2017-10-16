$.listenDomChange('[xui-ueditor]', function (obj) {
    if(obj.type === 'nodeInsert'){
        UE.getEditor(this).addListener('keyup blur', function(editor){
            $(this.textarea).val(this.getContent());
        });
    }
});