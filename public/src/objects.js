function SpriteObject(layer, name, x, y, size) {
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
            sprites.push(sprite);
        }
        _sprites[positionName] = sprites;
    }

    this.setActiveSprite("bottom");
}

SpriteObject.POSITIONS = [ "bottom", "left", "top", "right" ];
SpriteObject.DEFAULT_SIZE = 4;

function Enemy(layer, name, update, size) {
    var x = 0; var y = 0; //TODO random
    Enemy.superclass(layer, name, x, y, size);
    this.move(0, 0);
    this.update = update;
}

Object.inheritance(Enemy, SpriteObject);

function Poring(layer, size) {
    Enemy.superclass(layer, "poring", function() {

    }, size);
}