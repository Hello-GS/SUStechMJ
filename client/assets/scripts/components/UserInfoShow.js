cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _userinfo:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        
        this._userinfo = cc.find("Canvas/userinfo");
        this._userinfo.active = false;
        cc.vv.utils.addClickEvent(this._userinfo,this.node,"UserInfoShow","onClicked");
        
        cc.vv.userinfoShow = this;
    },
    
    show:function(name,userId,iconSprite,sex,ip){
        if(userId != null && userId > 0){
            this._userinfo.active = true;
            this._userinfo.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = iconSprite.spriteFrame;
            this._userinfo.getChildByName("name").getComponent(cc.Label).string = name;
            this._userinfo.getChildByName("ip").getComponent(cc.Label).string = "IP: " + ip.replace("::ffff:","");
            this._userinfo.getChildByName("id").getComponent(cc.Label).string = "ID: " + userId;
        }
    },
    
    onClicked:function(){
        this._userinfo.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
