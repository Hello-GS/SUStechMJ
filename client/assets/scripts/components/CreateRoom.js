cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        // _leixingxuanze: null,
        // _gamelist: null,
        // _currentGame: null,
    },

    // use this for initialization
    onLoad: function () {
        this.createRoom();
    },


    createRoom: function () {
        var self = this;
        var onCreate = function (ret) {
            if (ret.errcode !== 0) {
                cc.vv.wc.hide();
                if (ret.errcode == 2222) {
                    cc.vv.alert.show("警告", "GPA过低，创建房间失败\n好好学习，天天向上!");
                }
                else {
                    cc.vv.alert.show("提示", "创建房间失败,错误码:" + ret.errcode);
                }
            }
            else {
                cc.vv.gameNetMgr.connectGameServer(ret);
            }
        };
        
        var conf = {
            difen:1,
            zimo:true,
            jiangdui:true,
            huansanzhang:true,
            zuidafanshu:1,
            jushuxuanze:0,
            dianganghua:true,
            menqing:false,
            tiandihu:false,   
        };
        
        conf.type = 'xlch';
       

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            conf: JSON.stringify(conf)
        };
        
        console.log(data);
        cc.vv.wc.show("正在创建房间");
        cc.vv.http.sendRequest("/create_private_room", data, onCreate);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});




        


