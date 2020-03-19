cc.Class({
    extends: cc.Component,

    properties: {
        tipLabel:cc.Label,
        _stateStr:'',
        _progress:0.0,
        _splash:null,
        _isLoading:false,
    },

    // use this for initialization
    onLoad: function () {
        cc.vv.utils.setFitSreenMode();
        this.tipLabel.string = this._stateStr;
        this.startPreloading();
    },
    
    startPreloading:function(){
        this._stateStr = "正在加载资源，请稍候"
        this._isLoading = true;
        var self = this;
        
        self.onLoadComplete();      
    },
    
    onLoadComplete:function(){
        this._isLoading = false;
        this._stateStr = "准备登陆";
        console.log("**********")
        console.log("fsfsdfsd");
        console.log("*************")
        cc.director.loadScene("login");
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._stateStr.length == 0){
            return;
        }
        this.tipLabel.string = this._stateStr + ' ';
        if(this._isLoading){
            this.tipLabel.string += Math.floor(this._progress * 100) + "%";   
        }
        else{
            var t = Math.floor(Date.now() / 1000) % 4;
            for(var i = 0; i < t; ++ i){
                this.tipLabel.string += '.';
            }            
        }
    }
});