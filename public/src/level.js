var Level = cc.LayerColor.extend({
    portalIndex : 0,
    portalSprites : [],
    portalSprite : null,

    playerVector : { x : 0, y : 0 },
    playerSpeed : 4,
    enemies : [],
    createdEnemies : [],

    init:function () {
        this._super();

        var background = cc.Sprite.create(s_LevelBackground);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        background.setZOrder(0);
        this.addChild(background);

        this.setKeyboardEnabled(true);
        this.setMouseEnabled(true);

        this.player = new Player(this, "hero", Game.size.width / 2, Game.size.height / 2, null, 500);

        this.scheduleUpdate();
        this.schedule(this.update, 1);

        for (var i = 1; i < 5; i++) {
            var sprite = cc.Sprite.createWithSpriteFrameName("portal_0" + i);
            sprite.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2 - 10));
            sprite.setZOrder(100);
            this.portalSprites.push(sprite);
        }

        return true;
    },

    update : function(dt) {
        if (this.portalSprite != null) {
            this.portalSprite.removeFromParent();
        }
        this.portalIndex += 0.3;
        if (Math.round(this.portalIndex) >= this.portalSprites.length) {
            this.portalIndex = 0;
        }
        this.portalSprite = this.portalSprites[Math.round(this.portalIndex)];
        this.addChild(this.portalSprite);

        var speed = this.playerSpeed;
        if (this.playerVector.x != 0 && this.playerVector.y != 0) {
            speed = speed / Math.sqrt(2);
        }

        this.player.move(speed * this.playerVector.x, speed * this.playerVector.y);
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this);
        }

        var level = Game.levels[Game.level];
        if (Math.random() < level.enemyProbability || this.enemies.length == 0) {
            if (Game.levels.length == 0) {
                return;
            }
            var index = Math.round(Game.levels[Game.level].enemies.length * Math.random());
            if (index >= Game.levels.length) {
                index = Game.levels.length - 1;
            }
            var enemyDescription = level.enemies[index];
            if (enemyDescription == null) {
                return;
            }
            this.enemies.push(enemyDescription.create(this));
            enemyDescription.count--;
            if (enemyDescription.count <= 0) {
                level.enemies.splice(index, 1);
            }
        }

        var now = (new Date()).getTime();
        if (this.player.hitTime + 1000 <= now) {
            var enemiesToHit = [];
            for (var i = 0; i < this.enemies.length; i++) {
                var enemy = this.enemies[i];
                if (Math.sqrt((enemy.x - this.player.x) * (enemy.x - this.player.x) + (enemy.y - this.player.y) * (enemy.y - this.player.y)) < this.player.damageZone) {
                    var dAngle = Math.atan2(enemy.x - this.player.x, enemy.y - this.player.y) - this.player.angle;
                    if (dAngle < 0) {
                        dAngle = -dAngle;
                    }
                    if (dAngle * (180 / Math.PI) <= this.player.damageAngle / 2) {
                        enemiesToHit.push(enemy);
                    }
                }
            }
            if (enemiesToHit.length > 0) {
                this.player.hitTime = now;
                for (var i = 0; i < enemiesToHit.length; i++) {
                    this.hit(enemiesToHit[i]);
                }
            }
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
    },

    onMouseMoved : function(e, pEvent) {
        this.player.onTouchMove(e._point);
    },

    hit : function(enemy) {
        //knock out
        var r = Math.sqrt((enemy.x - this.player.x) * (enemy.x - this.player.x) + (enemy.y - this.player.y) * (enemy.y - this.player.y));
        enemy.move(
            (enemy.x - this.player.x) * this.player.knockOut / r,
            (enemy.y - this.player.y) * this.player.knockOut / r
        );

        //damage
        enemy.damage(this.player.damage);
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