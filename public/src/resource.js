var s_MainMenu = "res/mainMenu.png";
var s_NewGame = "res/newGame.png";
var s_NewGameActive = "res/newGame_active.png";
var s_LevelBackground = "res/levelBackground.png";
var s_Portal = "res/portal.png";
var s_Hero = "res/hero.png";
var s_Poring = "res/poring.png";

var s_Hero_plist = "res/plists/hero.plist";
var s_Poring_plist = "res/plists/poring.plist";

var g_resources = [
    { src : s_MainMenu },
    { src : s_NewGame },
    { src : s_NewGameActive },
    { src : s_LevelBackground },
    { src : s_Portal },
    { src : s_Hero },
    { src : s_Poring },

    //plist
    { src : s_Hero_plist },
    { src : s_Poring_plist }

    //fnt

    //tmx

    //bgm

    //effect
];

var Game = { size : { width : 1024, height : 576  } };

function loadResources() {
    var cache = cc.SpriteFrameCache.getInstance();
    cache.addSpriteFrames(s_Hero_plist, s_Hero);
    cache.addSpriteFrames(s_Poring_plist, s_Poring);
}