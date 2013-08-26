var Rush = {
    icon : s_RushIcon,
    active : false,
    time : 500,
    speed : 0.8,
    splash : 50,
    splashRadius : 30 * 30,
    damage : 3,
    timer : 0,
    vector : { x : 0, y : 0 },


    activate : function(layer) {
        this.timer = this.time;
        this.vector = { x : layer.mouse.x - layer.player.x, y : layer.mouse.y - layer.player.y };
        var r = Math.sqrt(this.vector.x * this.vector.x + this.vector.y * this.vector.y);
        this.vector.x = this.vector.x / r;
        this.vector.y = this.vector.y / r;
        this.active = true;
    },

    update : function(layer, dt) {
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
            }
        }

        if (this.timer < dt) {
            dt = this.timer;
        }
        this.timer -= dt;
        layer.player.move(this.speed * this.vector.x * dt, this.speed * this.vector.y * dt);
        if (this.timer <= 0) {
            this.active = false;
        }
    }
};