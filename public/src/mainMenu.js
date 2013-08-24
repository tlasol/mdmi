var MainMenu = cc.Layer.extend({
    init:function () {
        var selfPointer = this;
        this._super();

        this.newGame = cc.LabelTTF.create("New game", "Arial", 38);
        this.newGame.setPosition(cc.p(300, 500));
        this.addChild(this.newGame);
    }
});