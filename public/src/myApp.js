var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        a = this;
        var layer = new MainMenu();
        layer.init();
        this.addChild(layer);
    }
});