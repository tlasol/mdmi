var About = cc.Layer.extend({
    init:function () {
        this._super();

        var background = cc.Sprite.create(s_AboutBackground);
        background.setPosition(cc.p(Game.size.width / 2, Game.size.height / 2));
        this.addChild(background);

        var back = cc.MenuItemImage.create(s_Back, s_BackActive, function () {
            cc.Director.getInstance().replaceScene(MainMenu.instance);
        }, this);
        back.setAnchorPoint(cc.p(0.5, 0.5));
        back.setPosition(cc.p(900, 60));

        var menu = cc.Menu.create(back);
        menu.setPosition(cc.p(0, 0));

        var info = cc.MenuItemImage.create(s_Info, s_Info, function () { window.open("mailto:info@gprism.com", "_blank"); }, this);
        info.setAnchorPoint(cc.p(0.5, 0.5));
        info.setPosition(cc.p(650, 60));

        menu.addChild(info);

        addInfo(menu, 257, 480, "https://twitter.com/CastalianOrder", "https://www.facebook.com/ivan.ponomarev.89", true);
        addInfo(menu, 264, 336, "https://twitter.com/AshamGalkinberg", "https://www.facebook.com/maria.galkina.313", true);
        addInfo(menu, 238, 220, "https://twitter.com/dbalakov", "https://www.facebook.com/dbalakov", true);
        addInfo(menu, 271, 89, "https://twitter.com/tlasol", "https://www.facebook.com/mariya.galiulina", true);

        this.addChild(menu);
    }
});

About.scene = cc.Scene.extend({ onEnter:function () { this._super(); } });
Object.defineProperty(About, "instance", {
    get : function() {
        if (About._instance == null) {
            About._instance = new About.scene();
            var layer = new About();
            layer.init();
            About._instance.addChild(layer);
        }
        return About._instance;
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