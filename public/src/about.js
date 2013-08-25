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

        var info = cc.MenuItemImage.create(s_Info, s_Info, function () { window.open("mailto:info@gprism.com", "_blank"); }, this);
        info.setAnchorPoint(cc.p(0.5, 0.5));
        info.setPosition(cc.p(650, 60));

        menu.addChild(info);

        addInfo(menu, 257, 480, "https://twitter.com/CastalianOrder", "https://www.facebook.com/ivan.ponomarev.89", true);
        addInfo(menu, 270, 335, "https://twitter.com/AshamGalkinberg", "https://www.facebook.com/maria.galkina.313", true);
        addInfo(menu, 235, 220, "https://twitter.com/dbalakov", "https://www.facebook.com/dbalakov", true);
        addInfo(menu, 275, 90, "https://twitter.com/tlasol", "https://www.facebook.com/mariya.galiulina", true);

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

function addInfo(menu, x, y, twitter, facebook, twitterFirst) {
    var twitterBtn = cc.MenuItemImage.create(s_Twitter, s_Twitter, function () { window.open(twitter, "_blank") }, this);
    var fbBtn = cc.MenuItemImage.create(s_FB, s_FB, function () { window.open(facebook, "_blank") }, this);

    twitterBtn.setPosition(x, y);
    fbBtn.setPosition(x + (twitterFirst ? 1 : -1) * 37, y)

    menu.addChild(twitterBtn);
    menu.addChild(fbBtn);
}