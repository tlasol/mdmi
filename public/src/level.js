var Level = cc.LayerColor.extend({
    portalSprites : [],
    portalSprite : null,
    mouse : { x : 0, y : 0 },
    skill_0_Sprite : null,
    skill_1_Sprite : null,
    skill_2_Sprite : null,

    start : function() {
        initLevels();

        console.log(this.enemies)
        if (this.enemies != null) {
            for (var i = 0; i < this.enemies.length; i++) {
                console.log(this.enemies[i])
                this.enemies[i].removeFromLayer();
            }
        }

        this.portalIndex = 0;
        this.state = "dialogue";
        this.dialogue = 0;

        this.playerVector = { x : 0, y : 0 };
        this.enemies = [];
        this.portalTimer = 10000.1;
        this.portalState = "normal";
        this.last = null;
        if (this.gameOver != null) {
            this.gameOver.removeIt();
        }
        this.gameOver = null;

        this.portalLabel.setString(this.portalTimer == 0 ? 0 : ("" + this.portalTimer / 1000 + "0000000").substring(0, 5));
        this.portalLabel.draw();

        if (this.skill_0_Sprite != null) {
            this.skill_0_Sprite.removeFromParent();
        }
        if (this.skill_1_Sprite != null) {
            this.skill_1_Sprite.removeFromParent();
        }
        if (this.skill_2_Sprite != null) {
            this.skill_2_Sprite.removeFromParent();
        }

        if (this.player.skills[0] != null) {
            this.skill_0_Sprite = cc.Sprite.create(this.player.skills[0].icon);
            this.skill_0_Sprite.setPosition(cc.p(178, 63));
            this.skill_0_Sprite.setZOrder(500);
            this.addChild(this.skill_0_Sprite);
            ha = this.skill_0_Sprite;
        }

        this.initDialogue();
    },

    init:function () {
        this._super();

        var background = cc.Sprite.create(s_LevelBackground);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        background.setZOrder(0);
        this.addChild(background);

        var orbs = cc.Sprite.create(s_Orbs);
        orbs.setPosition(cc.p(440, 83));
        orbs.setZOrder(501);
        this.addChild(orbs);

        this.setKeyboardEnabled(true);
        this.setMouseEnabled(true);

        this.portalLabel = cc.LabelTTF.create(this.portalTimer == 0 ? 0 : ("" + this.portalTimer / 1000 + "0000000").substring(0, 5), "Arial Bold", 48);
        this.portalLabel.setPosition(cc.p(666, 66));
        this.portalLabel.setZOrder(1000);
        this.addChild(this.portalLabel);
        ha = this.portalLabel;

        this.player = new Player(this, "hero", Game.size.width / 2, Game.size.height / 2, null, 500);

        for (var i = 0; i < 5; i++) {
            var sprite = cc.Sprite.createWithSpriteFrameName("portal_0" + i);
            sprite.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2 - 10));
            sprite.setZOrder(100);
            this.portalSprites.push(sprite);
        }

        return true;
    },

    update : function() {
        if (this.state != "play") {
            if (this.state != "dialogue") {
                if (this.gameOver == null) {
                    this.gameOver = GameOver.instance;
                    this.gameOver.init(this);
                }
            }
            return;
        }

        var now = (new Date()).getTime();
        if (this.last == null) {
            this.last = now;
        }
        var dt = now - this.last;
        this.last = now;

        this.updatePlayer(now, dt);
        this.updateEnemies(now, dt);
        this.updateHits(now, dt);
        this.updatePortal(now, dt);
    },

    updatePlayer : function(now, dt) {
        this.player.update();
        var speed = this.player.speed;
        if (this.playerVector.x != 0 && this.playerVector.y != 0) {
            speed = speed / Math.sqrt(2);
        }

        if (this.player.skills["0"] != null && this.player.skills["0"].active) {
            this.player.skills["0"].update(this, dt);
        }
        this.player.move(speed * this.playerVector.x * dt / 1000, speed * this.playerVector.y * dt / 1000);
    },

    updateEnemies : function(now, dt) {
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this, dt);
        }

        var level = Game.levels[Game.level];
        if (this.enemies.length == 0) {
            if (level.enemies.length == 0) {
                Game.level++;
                this.start();
                return;
            }
        }
        if (Math.random() < level.enemyProbability || this.enemies.length == 0) {
            if (level.enemies.length == 0) {
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
    },

    updateHits : function(now, dt) {
        if (this.player.hitTime + this.player.reloadingTime <= now) {
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

    updatePortal : function(now, dt) {
        this.portalState = "normal";
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            if (Math.sqrt((enemy.x - Game.size.width / 2) * (enemy.x - Game.size.width / 2) + (enemy.y - Game.size.height / 2) * (enemy.y - Game.size.height / 2)) <= 10) {
                this.portalTimer -= dt;
                if (this.portalTimer < 0) {
                    this.portalTimer = 0;
                    this.state = "run_away";
                }
                this.portalState = "run_away";

                this.portalLabel.setString(this.portalTimer == 0 ? 0 : ("" + this.portalTimer / 1000 + "0000000").substring(0, 5));
                this.portalLabel.draw();
                break;
            }
        }

        if (this.portalSprite != null) {
            this.portalSprite.removeFromParent();
        }
        this.portalIndex += 0.15;
        if (Math.round(this.portalIndex) >= this.portalSprites.length) {
            this.portalIndex = 1;
        }
        this.portalSprite = this.portalSprites[this.portalState == "normal" ? 0 : Math.round(this.portalIndex)];
        this.addChild(this.portalSprite);
    },

    onKeyUp : function(e) {
        if (this.state != "play") {
            return;
        }
        if (e == 49 && this.player.skills[0] != null) {
            this.player.skills[0].activate(this);
        }


        if(e === cc.KEY.left || e === cc.KEY.right || e === cc.KEY.a || e === cc.KEY.d) {
            this.playerVector.x = 0;
        }

        if(e === cc.KEY.up || e === cc.KEY.down || e === cc.KEY.w || e === cc.KEY.s) {
            this.playerVector.y = 0;
        }
    },

    onKeyDown : function(e) {
        if(e === cc.KEY.z) {
            ha.setPosition(ha.getPosition().x - 1, ha.getPosition().y);
            console.log(ha.getPosition());
        }
        if(e === cc.KEY.x) {
            ha.setPosition(ha.getPosition().x + 1, ha.getPosition().y);
            console.log(ha.getPosition());
        }
        if(e === cc.KEY.c) {
            ha.setPosition(ha.getPosition().x, ha.getPosition().y + 1);
            console.log(ha.getPosition());
        }
        if(e === cc.KEY.v) {
            ha.setPosition(ha.getPosition().x, ha.getPosition().y - 1);
            console.log(ha.getPosition());
        }

        if (this.state != "play") {
            return;
        }

        if(e === cc.KEY.left || e === cc.KEY.a) {
            this.playerVector.x = -1;
        }

        if(e === cc.KEY.right || e === cc.KEY.d) {
            this.playerVector.x = 1;
        }

        if(e === cc.KEY.down || e === cc.KEY.s) {
            this.playerVector.y = -1;
        }

        if(e === cc.KEY.up  || e === cc.KEY.w) {
            this.playerVector.y = 1;
        }
    },

    onMouseMoved : function(e, pEvent) {
        if (this.state != "play") {
            return;
        }

        this.mouse = e._point;
        this.player.onTouchMove(e._point);
    },

    onMouseDown : function() {
        if (this.state == "dialogue") {
            this.dialogue++;
            this.initDialogue();
        }
    },

    hit : function(enemy) {
        //knock out
        var r = Math.sqrt((enemy.x - this.player.x) * (enemy.x - this.player.x) + (enemy.y - this.player.y) * (enemy.y - this.player.y));
        enemy.move(
            (enemy.x - this.player.x) * this.player.knockOut / r,
            (enemy.y - this.player.y) * this.player.knockOut / r
        );

        //damage
        enemy.damage(this.player.damagePower);
    },

    initDialogue : function() {
        if (this.dialogueSprite != null) {
            this.dialogueSprite.removeFromParent();
        }

        var levelDialogues = dialogues[Game.level];
        if (levelDialogues == null) {
            this.state = "play";
            return;
        }

        var thatDialogue = levelDialogues[this.dialogue];
        if (thatDialogue == null) {
            this.state = "play";
            return;
        }

        this.dialogueSprite = cc.Sprite.create(dialogues.getDialogueSource(Game.level, this.dialogue));
        this.dialogueSprite.setPosition(cc.p(thatDialogue.x, thatDialogue.y));
        this.dialogueSprite.setZOrder(20000);
        this.addChild(this.dialogueSprite);
    }
});

Level.scene = cc.Scene.extend({
    onEnter:function () { this._super(); }
});

Object.defineProperty(Level, "instance", {
    get : function() {
        if (Level._instance == null) {
            Level._instance = new Level.scene();
            Level._instance.layer = new Level();
            Level._instance.layer.init();
            Level._instance.addChild(Level._instance.layer);

            Level._instance.start = function() { Level._instance.layer.start(); };
        }

        Level._instance.layer.scheduleUpdate();
        Level._instance.layer.schedule(Level._instance.layer.update, 1);
        return Level._instance;
    }
});

var ha;