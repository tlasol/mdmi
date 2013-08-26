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
var s_Twitter = "res/twitter.png";
var s_FB = "res/fb.png";
var s_Info = "res/info.png";
var s_Health = "res/healthOrb.png";
var s_Mana = "res/manaOrb.png";
var s_Orbs = "res/orbs.png";
var s_GameOver = "res/gameOver.png";
var s_MainMenuButton = "res/mainMenuButton.png";
var s_MainMenuButtonActive = "res/mainMenuButtonActive.png";
var s_TryAgainButton = "res/tryAgainButton.png";
var s_TryAgainButtonActive = "res/tryAgainButtonActive.png";

var s_Hero_plist = "res/plists/hero.plist";
var s_Poring_plist = "res/plists/poring.plist";
var s_Portal_plist = "res/plists/portal.plist";
var s_Aura_plist = "res/plists/aura.plist";
var s_Catbug_plist = "res/plists/catbug.plist";
var s_Health_plist = "res/plists/healthOrb.plist";
var s_Mana_plist = "res/plists/manaOrb.plist";

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
    { src : s_Twitter },
    { src : s_FB },
    { src : s_Info },
    { src : s_Health },
    { src : s_Mana },
    { src : s_Orbs },
    { src : s_GameOver },
    { src : s_MainMenuButton },
    { src : s_MainMenuButtonActive },
    { src : s_TryAgainButton },
    { src : s_TryAgainButtonActive },

    //plist
    { src : s_Hero_plist },
    { src : s_Poring_plist },
    { src : s_Portal_plist },
    { src : s_Aura_plist },
    { src : s_Catbug_plist },
    { src : s_Health_plist },
    { src : s_Mana_plist }

    //fnt

    //tmx

    //bgm

    //effect
];

var dialogues = {
    '0' : [
        { x : 550, y : 400 },
        { x : 500, y : 300 },
        { x : 550, y : 400 } ],

    length : 1,
    getDialogueSource : function(level, index) {
        return "res/dialogues/" + level + "/" + index + ".png"
    }
};

for (var i = 0; i < dialogues.length; i++) {
    for (var index = 0; index < dialogues[i].length; index++) {
        g_resources.push({ src : dialogues.getDialogueSource(i, index) });
    }
}

var Game = { size : { width : 1024, height : 576  }, level : 0 };
function initLevels() {
    Game.levels = [
        {
            enemyProbability : 0.005,
            enemies : [
                //{ count : 1, create : function(layer) { return new Catbug(layer, 100); } },
                { count : 10, create : function(layer) { return new Poring(layer, 80); } }
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
    cache.addSpriteFrames(s_Health_plist, s_Health);
    cache.addSpriteFrames(s_Mana_plist, s_Mana);
}