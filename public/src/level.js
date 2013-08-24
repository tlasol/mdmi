var Level = cc.LayerColor.extend({
    playerVector : { x : 0, y : 0 },
    playerSpeed : 4,
    enemyTime : 0,

    init:function () {
        var selfPointer = this;
        this._super();

        var background = cc.Sprite.create(s_LevelBackground);

        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);
        var background = cc.Sprite.create(s_Portal);

        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);
        this.setTouchEnabled(true);

        this.setKeyboardEnabled(true);

        this.player = new SpriteObject(this, "poring", Game.size.width / 2, Game.size.height / 2);

        this.scheduleUpdate();
        this.schedule(this.update, 1);
        return true;
    },

    update : function() {
        var speed = this.playerSpeed;
        if (this.playerVector.x != 0 && this.playerVector.y != 0) {
            speed = speed / Math.sqrt(2);
        }

        this.player.move(speed * this.playerVector.x, speed * this.playerVector.y);
        if (this.enemyTime == 0) {

        }
    },

    onKeyUp : function(e) {
        if(e === cc.KEY.left || e === cc.KEY.right) {
            this.playerVector.x = 0;
        }

        if(e === cc.KEY.up || e === cc.KEY.down) {
            this.playerVector.y = 0;
        }
    },

    onKeyDown : function(e) {
        if(e === cc.KEY.left) {
            this.playerVector.x = -1;
        }

        if(e === cc.KEY.right) {
            this.playerVector.x = 1;
        }

        if(e === cc.KEY.down) {
            this.playerVector.y = -1;
        }

        if(e === cc.KEY.up) {
            this.playerVector.y = 1;
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