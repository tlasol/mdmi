var s_MainMenu = "res/mainMenu.png";
var s_Start = "res/startButton.png";
var s_StartActive = "res/startButtonActive.png";
var s_About = "res/aboutButton.png";
var s_AboutActive = "res/aboutButtonActive.png";
var s_LevelBackground = "res/levelBackground.png";
var s_Portal = "res/portal.png";
var s_Hero = "res/hero.png";
var s_Poring = "res/poring.png";
var s_Aura = "res/aura.png"
var s_Catbug = "res/catbug.png"
var s_AboutBackground = "res/aboutBackground.png";
var s_Back = "res/backButton.png";
var s_BackActive = "res/backButtonActive.png";

var s_Hero_plist = "res/plists/hero.plist";
var s_Poring_plist = "res/plists/poring.plist";
var s_Portal_plist = "res/plists/portal.plist";
var s_Aura_plist = "res/plists/aura.plist";
var s_Catbug_plist = "res/plists/catbug.plist";

var g_resources = [
    { src : s_MainMenu },
    { src : s_Start },
    { src : s_StartActive },
    { src : s_About },
    { src : s_AboutActive },
    { src : s_LevelBackground },
    { src : s_Portal },
    { src : s_Hero },
    { src : s_Poring },
    { src : s_Aura },
    { src : s_Catbug },
    { src : s_AboutBackground },
    { src : s_Back },
    { src : s_BackActive },

    //plist
    { src : s_Hero_plist },
    { src : s_Poring_plist },
    { src : s_Portal_plist },
    { src : s_Aura_plist },
    { src : s_Catbug_plist }

    //fnt

    //tmx

    //bgm

    //effect
];

var Game = { size : { width : 1024, height : 576  }, level : 0 };
function initLevels() {
    Game.levels = [
        {
            enemyProbability : 0.005,
            enemies : [
                { count : 10, create : function(layer) { return new Catbug(layer, 1); } },
                { count : 10, create : function(layer) { return new Poring(layer, 1); } }
            ]
        }
    ]
}
initLevels();

function loadResources() {
    var cache = cc.SpriteFrameCache.getInstance();

    cache.addSpriteFrames(s_Hero_plist, s_Hero);
    cache.addSpriteFrames(s_Poring_plist, s_Poring);
    cache.addSpriteFrames(s_Portal_plist, s_Portal);
    cache.addSpriteFrames(s_Aura_plist, s_Aura);
    cache.addSpriteFrames(s_Catbug_plist, s_Catbug);
}