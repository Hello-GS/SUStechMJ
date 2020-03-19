function urlParse() {
    var params = {};
    if (window.location == null) {
        return params;
    }
    var name, value;
    var str = window.location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里　
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            params[name] = value;
        }
    }
    return params;
}

function initMgr() {
    cc.vv = {};
    var UserMgr = require("UserMgr");
    cc.vv.userMgr = new UserMgr();


    //请求封装
    cc.vv.http = require("HTTP");
    cc.vv.global = require("Global");
    cc.vv.net = require("Net");

    // 服务器将消息转派发，已知将桌面麻将信息存储
    var GameNetMgr = require("GameNetMgr");
    cc.vv.gameNetMgr = new GameNetMgr();
    cc.vv.gameNetMgr.initHandlers();

    // 接口
    var AnysdkMgr = require("AnysdkMgr");
    cc.vv.anysdkMgr = new AnysdkMgr();
    cc.vv.anysdkMgr.init();


    // 音频管理
    var AudioMgr = require("AudioMgr");
    cc.vv.audioMgr = new AudioMgr();
    cc.vv.audioMgr.init();

    //为节点添加点击 滑动 退出事件的绑定
    var Utils = require("Utils");
    cc.vv.utils = new Utils();


    cc.args = urlParse();
}



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
        label: {
            default: null,
            type: cc.Label
        },

        loadingProgess: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        initMgr();
        cc.vv.utils.setFitSreenMode();
        console.log('haha');
        // 切换场景
        this._mainScene = 'loading';
        this.showSplash(function () {
            this.getServerInfo();
        }.bind(this));
    },

    onBtnDownloadClicked: function () {
        // 获取使用的浏览器地址
        cc.sys.openURL(cc.vv.SI.appweb);
    },

    showSplash: function (callback) {
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 500;
        this._splash = cc.find("Canvas/splash");
        if (true || cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative) {
            this._splash.active = true;
            if (this._splash.getComponent(cc.Sprite).spriteFrame == null) {
                callback();
                return;
            }
            var t = Date.now();
            var fn = function () {
                var dt = Date.now() - t;
                if (dt < SHOW_TIME) {
                    setTimeout(fn, 33);
                }
                else {
                    var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
                    if (op < 0) {
                        self._splash.opacity = 0;
                        callback();
                    }
                    else {
                        self._splash.opacity = op;
                        setTimeout(fn, 33);
                    }
                }
            };
            setTimeout(fn, 33);
        }
        else {
            this._splash.active = false;
            callback();
        }
    },


    // 得到服务器信息
    getServerInfo: function () {
        var self = this;


        var onGetVersion = function (ret) {
            cc.vv.SI = ret;
            if (cc.sys.isNative) { //判断是否是原生平台
                var url = cc.url.raw('resources/ver/cv.txt'); console.log(url)
                cc.loader.load(url, function (err, data) {
                    cc.VERSION = data;
                    if (ret.version == null) {
                        //console.log("error.");
                    }
                    else {
                        // if (cc.vv.SI.version != cc.VERSION) {
                        //     cc.find("Canvas/alert").active = true;
                        // }
                        // else {
                            cc.director.loadScene(self._mainScene);
                            //console.log('jaha' + self._mainScene)
                        //}
                    }
                }.bind(this));
            }
            else {
                cc.director.loadScene(self._mainScene);
                console.log(self._mainScene)
            }
        };

        var xhr = null;
        var complete = false;
        var fnRequest = function () {
            self.loadingProgess.string = "正在连接服务器";
            xhr = cc.vv.http.sendRequest("/get_serverinfo", null, function (ret) {
                xhr = null;
                complete = true;
                onGetVersion(ret);
            });
            setTimeout(fn, 5000);
        }

        var fn = function () {
            if (!complete) {
                if (xhr) {
                    xhr.abort();
                    self.loadingProgess.string = "连接失败，即将重试";
                    setTimeout(function () {
                        fnRequest();
                    }, 5000);
                }
                else {
                    fnRequest();
                }
            }
        };
        fn();
    },
    log: function (content) {
        this.label.string += content + '\n';
    },
});
