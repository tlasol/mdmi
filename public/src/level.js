var Level = cc.LayerColor.extend({
    init:function () {
        var selfPointer = this;
        this._super();

        var background = cc.Sprite.create(s_LevelBackground);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);

        var background = cc.Sprite.create(s_Portal);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);

        Game.player = new SpriteObject(this, "hero", Game.size.width / 2, Game.size.height / 2);

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
        return true;
    },

    onKeyDown:function(e) {
        if(e === cc.KEY.left) {
            Game.player.move(-1.5, 0);
            return;
        }

        if(e === cc.KEY.right) {
            Game.player.move(1.5, 0);
            return;
        }

        if(e === cc.KEY.down) {
            Game.player.move(0, -1.5);
            return;
        }

        if(e === cc.KEY.up) {
            Game.player.move(0, 1.5);
        }
    }
});

Level.scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Level();
        layer.init();
        this.addChild(layer);
    }
});