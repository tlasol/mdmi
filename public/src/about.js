var About = cc.Layer.extend({
    init:function () {
        this._super();

        var background = cc.Sprite.create(s_AboutBackground);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);

        var back = cc.MenuItemImage.create(s_Back, s_BackActive, function () { cc.Director.getInstance().replaceScene(new MainMenu.scene()); }, this);
        back.setAnchorPoint(cc.p(0.5, 0.5));
        back.setPosition(cc.p(900, 60));

        var menu = cc.Menu.create(back);
        menu.setPosition(cc.p(0, 0));
        menu.addChild(back);

        this.addChild(menu);
    }
});

About.scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new About();
        layer.init();
        this.addChild(layer);
    }
});