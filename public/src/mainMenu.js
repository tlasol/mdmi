var MainMenu = cc.Layer.extend({
    init:function () {
        this._super();

        loadResources();
        var background = cc.Sprite.create(s_MainMenu);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);

        var newGame = cc.MenuItemImage.create(s_Start, s_StartActive, function () { cc.Director.getInstance().replaceScene(new Level.scene()); }, this);
        newGame.setAnchorPoint(cc.p(0.5, 0.5));

        var about = cc.MenuItemImage.create(s_About, s_AboutActive, function () { cc.Director.getInstance().replaceScene(new About.scene()); }, this);
        about.setAnchorPoint(cc.p(0.5, 0.5));
        about.setPosition(cc.p(400, -190));

        var menu = cc.Menu.create(newGame);
        menu.setPosition(cc.p(500, 250));
        menu.addChild(about);

        this.addChild(menu);
    }
});

MainMenu.scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenu();
        layer.init();
        this.addChild(layer);
    }
});