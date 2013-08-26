var GameOver = function() {
    this.init = function(layer) {
        var background = null;
        var menu = null;
        var removeIt = function() {
            initLevels();
            layer.enemies = [];
            layer.portalTimer = 10000;
            layer.portalState = "normal";
            layer.last = null;

            layer.player.x = Game.size.width / 2;
            layer.player.y = Game.size.height / 2;
            layer.player.hp = layer.player.maxHp;
            layer.player.mana = layer.player.maxMana;

            background.removeFromParent();
            menu.removeFromParent();
        }

        background = cc.Sprite.create(s_GameOver);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        background.setZOrder(10000);

        var mainMenu = cc.MenuItemImage.create(s_MainMenuButton, s_MainMenuButtonActive, function () {
            removeIt();
            cc.Director.getInstance().replaceScene(new MainMenu.scene());
        }, this);
        mainMenu.setAnchorPoint(cc.p(0.5, 0.5));
        mainMenu.setPosition(cc.p(505, 205));
        mainMenu.setZOrder(12000);

        var tryAgain = cc.MenuItemImage.create(s_TryAgainButton, s_TryAgainButtonActive, function () {
            layer.state = "play";
            removeIt();
        }, this);
        tryAgain.setAnchorPoint(cc.p(0.5, 0.5));
        tryAgain.setPosition(cc.p(505, 275));
        tryAgain.setZOrder(12000);
        ha = tryAgain;

        var menu = cc.Menu.create(mainMenu);
        menu.setPosition(cc.p(0, 0));
        menu.addChild(tryAgain);
        menu.setZOrder(11000);

        layer.addChild(background);
        layer.addChild(menu);
    };
};

GameOver.instance = new GameOver();