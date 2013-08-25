function SpriteObject(layer, name, x, y, size, zOrder) {
    var _x = x;
    var _y = y;
    var _sprites = {};
    var _activeSprite = null;
    var _spriteIndex = 0;

    Object.defineProperty(this, "x", { get : function() { return _x; } });
    Object.defineProperty(this, "y", { get : function() { return _y; } });

    this.move = function(dx, dy) {
        _x += dx;
        _y += dy;
        if (_x < 20) { _x = 20; }
        if (_x > Game.size.width - 20) { _x = Game.size.width - 20; }
        if (_y < 25) { _y = 25; }
        if (_y > Game.size.height - 25) { _y = Game.size.height - 25; }
        _spriteIndex += 0.1;

        if (_activeSprite != null) {
            _activeSprite.setPosition(_x, _y);
        }

        if (this.onMove) {
            this.onMove();
        }
        if (dx < 0) {
            this.setActiveSprite("left");
            return;
        }
        if (dx > 0) {
            this.setActiveSprite("right");
            return;
        }
        if (dy > 0) {
            this.setActiveSprite("top");
            return;
        }
        if (dy < 0) {
            this.setActiveSprite("bottom");
            return;
        }
    };

    this.setActiveSprite = function(name) {
        var sprites = _sprites[name];
        if (Math.round(_spriteIndex) >= sprites.length) {
            _spriteIndex = 0;
        }
        var sprite = sprites[Math.round(_spriteIndex)];
        if (_activeSprite == sprite) {
            return;
        }
        if (_activeSprite != null) {
            _activeSprite.removeFromParent();
        }
        _activeSprite = sprite;
        _activeSprite.setPosition(_x, _y);
        layer.addChild(_activeSprite);
    };

    for (var i = 0; i < SpriteObject.POSITIONS.length; i++) {
        var sprites = [];
        var positionName = SpriteObject.POSITIONS[i];
        var length = size == null ? SpriteObject.DEFAULT_SIZE : size;
        for (var j = 0; j < length; j++) {
            var sprite = cc.Sprite.createWithSpriteFrameName(name + "_" + positionName + "0" + j);
            if (zOrder != null) {
                sprite.setZOrder(zOrder);
            }
            sprites.push(sprite);
        }
        _sprites[positionName] = sprites;
    }

    this.setActiveSprite("bottom");
}

SpriteObject.POSITIONS = [ "bottom", "left", "top", "right" ];
SpriteObject.DEFAULT_SIZE = 4;

function Enemy(layer, name, update, size) {
    var position = (function() {
        var r = Math.random();
        if (r < 0.25) {
            return { x : 0, y : Math.random() * Game.size.height };
        }
        if (r < 0.5) {
            return { x : Game.size.width, y : Math.random() * Game.size.height };
        }
        if (r < 0.75) {
            return { x : Math.random() * Game.size.height, y : 0 };
        }
        return { x : Math.random() * Game.size.width, y : Game.size.height };
    })();
    Enemy.superclass.call(this, layer, name, position.x, position.y, size, 400);
    this.move(0, 0);
    this.update = update;
}
Object.inheritance(Enemy, SpriteObject);

function Poring(layer, speed, size) {
    Poring.superclass.call(this, layer, "poring", function() {
        var dx = Game.size.width / 2 - this.x;
        var dy = Game.size.height / 2 - this.y;
        if (dx * dx + dy * dy < 10) {
            return;
        }
        var l = Math.sqrt(dx * dx + dy * dy);
        dx = dx * speed / l;
        dy = dy * speed / l;
        this.move(dx, dy);
    }, size);
}

Object.inheritance(Poring, Enemy);

function Player(layer, name, x, y, size, zOrder) {
    Player.superclass.call(this, layer, name, x, y, size, zOrder);

    this.aura = cc.Sprite.create(s_Poring);
    this.aura.setPosition(x, y);
    this.aura.setScaleX(2);

    this.aura.setOpacity(150);
    this.aura.setZOrder(zOrder - 1);
    this.angle = 0;

    layer.addChild(this.aura);

    this.onMove = function() {
        this.aura.setPosition(this.x, this.y);
    };
    this.onTouchMove = function(e) {
        var angle = Math.atan2(e.x - this.x, e.y - this.y);
        this.angle = angle;
        this.aura.setRotation(this.angle * (180 / Math.PI));
    };
}

Object.inheritance(Player, SpriteObject);