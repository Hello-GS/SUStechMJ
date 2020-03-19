cc.Class({
    extends: cc.Component,

    properties: {
        inputName:cc.EditBox,
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    
    onRandomBtnClicked:function(){
        var names = [
            "修仙",
            "养生",
            "计系",
            "金融",
            "机械",
            "医学",
            "化学",
            "物理",
            "生物",
            "环境",
            "海洋",
            "地空",
        ];
        
        var names2 = [
            "学神",
            "大佬",
            "渣渣",
            "菜鸡",
            "弱鸡",
            "大神",
            "有钱",
            "土豪",
        ];
        var idx = Math.floor(Math.random() * (names.length - 1));
        var idx2 = Math.floor(Math.random() * (names2.length - 1));
        this.inputName.string = names[idx] + names2[idx2];
    },

    // use this for initialization
    onLoad: function () {
        cc.vv.utils.setFitSreenMode();
        this.onRandomBtnClicked();
    },

    onBtnConfirmClicked:function(){
        var name = this.inputName.string;
        if(name == ""){
            console.log("invalid name.");
            return;
        }
        console.log(name);
        cc.vv.userMgr.create(name);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
