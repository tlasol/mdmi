var Rush = createSkill({
    icon : s_RushIcon,
    mana : 1,
    time : 500,
    speed : 0.8,
    splash : 50,
    splashRadius : 50 * 50,
    damage : 3,
    vector : { x : 0, y : 0 },
    playerDamageZone : 0,

    activateInternal : function(layer) {
        this.vector = { x : layer.mouse.x - layer.player.x, y : layer.mouse.y - layer.player.y };
        var r = Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y);
        this.vector.x = this.vector.x / r;
        this.vector.y = this.vector.y / r;
        this.playerDamageZone = layer.player.damageZone;
        layer.player.damageZone = 0;
    },

    updateInternal : function(layer, dt) {
        for (var i = 0; i < layer.enemies.length; i++) {
            var enemy = layer.enemies[i];
            var enemyVector = { x : enemy.x - layer.player.x, y : enemy.y - layer.player.y }
            var r = enemyVector.x * enemyVector.x + enemyVector.y * enemyVector.y;
            if (r < this.splashRadius) {
                var enemyMoveVector = { x : this.vector.y, y : -this.vector.x };
                if (this.vector.x * enemyVector.x < this.vector.x * enemyVector.x) {
                    enemyMoveVector.x = -enemyMoveVector.x;
                    enemyMoveVector.y = -enemyMoveVector.y;
                }

                enemy.move(enemyMoveVector.x * this.splash, enemyMoveVector.y * this.splash);
                enemy.damage(this.damage);
            }
        }

        layer.player.move(this.speed * this.vector.x * dt, this.speed * this.vector.y * dt);
    },

    deactivate : function(layer) {
        this.active = false;
        layer.player.damageZone = this.playerDamageZone;
    }
});

var Berserk = createSkill({
    icon : s_BerserkIcon,
    mana : 1,
    time : 5000,
    playerDamage : 0,
    playerSpeed : 0,
    sprites : null,
    activeSprite : null,
    spriteTime : 0,
    spriteIndex : 0,

    activateInternal : function(layer) {
        this.playerDamage = layer.player.damagePower;
        this.playerSpeed = layer.player.speed;
        layer.player.damagePower = layer.player.damagePower * 2;
        layer.player.speed = layer.player.speed * 2;

        if (this.sprites == null) {
            this.sprites = [];
            for (var i = 0; i < 10; i++) {
                this.sprites.push(cc.Sprite.createWithSpriteFrameName("berserk_" + i));
            }
        }
        this.spriteTime = 1000;
    },

    updateInternal : function(layer, dt) {
        this.spriteTime += dt;
        if (this.spriteTime > 50) {
            this.spriteTime = 0;
            if (this.activeSprite != null) {
                this.activeSprite.removeFromParent();
            }
            this.spriteIndex++;
            if (this.spriteIndex >= this.sprites.length) {
                this.spriteIndex = 0;
            }
            this.activeSprite = this.sprites[this.spriteIndex];
            this.activeSprite.setZOrder(501);
            layer.addChild(this.activeSprite);
        }

        if (this.activeSprite != null) {
            this.activeSprite.setPosition(layer.player.x, layer.player.y);
        }
    },

    deactivate : function(layer) {
        layer.player.damagePower = this.playerDamage;
        layer.player.speed = this.playerSpeed;

        if (this.activeSprite != null) {
            this.activeSprite.removeFromParent();
        }
    }
});

var Light = createSkill({
    icon : s_LightIcon,
    mana : 0,
    damage : 10,
    time : 1000,

    activateInternal : function(layer) {
        if (this.sprite != null) {
            this.sprite.removeFromParent();
        }
        var angle = Math.atan2(layer.mouse.x - layer.player.x, layer.mouse.y - layer.player.y);
        vector = { x : layer.mouse.x - layer.player.x, y : layer.mouse.y - layer.player.y };
        var r = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        vector.x = vector.x / r;
        vector.y = vector.y / r;

        this.sprite = cc.Sprite.create(s_LightEffect);
        this.sprite.setPosition(layer.player.x + vector.x * 500, layer.player.y + vector.y * 500);
        this.sprite.setOpacity(150);
        this.sprite.setRotation(angle * (180 / Math.PI));
        this.sprite.setZOrder(503);
        layer.addChild(this.sprite);

        for (var i = 0; i < layer.enemies.length; i++) {
            var enemy = layer.enemies[i];
            var enemyAngle = Math.atan2(enemy.x - layer.player.x, enemy.y - layer.player.y);
            if (Math.abs(enemyAngle - angle) < 0.2) {
                enemy.damage(this.damage);
            }
        }
    },

    updateInternal : function(layer, dt) { },

    deactivate : function(layer) {
        this.sprite.removeFromParent();
    }
});

function createSkill(skill) {
    var result = skill;
    result.active = false;
    result.timer = 0;

    result.activate = function(layer) {
        if (layer.player.mana < this.mana) {
            return;
        }
        layer.player.mana -= this.mana;
        this.active = true;
        this.timer = this.time;
        this.activateInternal(layer);
    };
    result.update = function(layer, dt) {
        if (this.timer < dt) {
            dt = this.timer;
        }
        this.updateInternal(layer, dt);
        this.timer -= dt;
        if (this.timer <= 0) {
            this.active = false;
            this.deactivate(layer);
        }
    };

    return result;
}