cc.Class({
    extends: cc.Component,

    properties: {
        _mima: null,
        _mimaIndex: 0,
    },

    onLoad: function () {
        cc.vv.utils.setFitSreenMode();
        cc.vv.http.url = cc.vv.http.master_url;
        cc.vv.net.addHandler('push_need_create_role', function () {
            console.log("********")
            console.log("onLoad:push_need_create_role");
            console.log("********")
            cc.director.loadScene("createrole");
        });

        cc.vv.audioMgr.playBGM("bgMain.mp3");

        cc.find("Canvas/btn_yk").active = true;
        cc.find("Canvas/btn_weixin").active = false;
    },

    onBtnQuickStartClicked: function () {
        cc.vv.userMgr.guestAuth();
    },

});
