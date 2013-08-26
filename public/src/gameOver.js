var GameOver = function() {
    this.background = null;
    this.menu = null;

    this.init = function(layer) {
        this.background = cc.Sprite.create(s_GameOver);
        this.background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.background.setZOrder(10000);

        var mainMenu = cc.MenuItemImage.create(s_MainMenuButton, s_MainMenuButtonActive, function () { cc.Director.getInstance().replaceScene(new MainMenu.scene()); }, this);
        mainMenu.setAnchorPoint(cc.p(0.5, 0.5));
        mainMenu.setPosition(cc.p(505, 205));
        mainMenu.setZOrder(12000);

        var tryAgain = cc.MenuItemImage.create(s_TryAgainButton, s_TryAgainButtonActive, function () {
            this.removeIt();
            layer.start();
        }, this);
        tryAgain.setAnchorPoint(cc.p(0.5, 0.5));
        tryAgain.setPosition(cc.p(505, 275));
        tryAgain.setZOrder(12000);
        ha = tryAgain;

        this.menu = cc.Menu.create(mainMenu);
        this.menu.setPosition(cc.p(0, 0));
        this.menu.addChild(tryAgain);
        this.menu.setZOrder(11000);

        layer.addChild(this.background);
        layer.addChild(this.menu);
    };

    this.removeIt = function() {
        this.background.removeFromParent();
        this.menu.removeFromParent();
    };
};

GameOver.instance = new GameOver();