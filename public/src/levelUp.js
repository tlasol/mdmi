var LevelUp = function() {
    this.init = function(layer) {

    };

    this.removeIt = function() {
        this.background.removeFromParent();
        this.menu.removeFromParent();
    };
};

LevelUp.instance = new LevelUp();
