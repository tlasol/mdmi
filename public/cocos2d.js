(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        frameRate:60,
        loadExtension:false,
        renderMode:0,
        tag:'gameCanvas',
        engineDir:'cocos2d/',
        appFiles:[
            'src/resource.js',
            'src/mainMenu.js',
            'src/level.js',
            'src/utils.js',
            'src/objects.js',
            'src/about.js',
            "src/gameOver.js",
            "src/skils.js"
        ]
    };

    if(!d.createElement('canvas').getContext){
        var error = d.createElement('div');
        error.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(error);
        return;
    }

    window.addEventListener('DOMContentLoaded', function () {
        var script = d.createElement('script');
        script.src = c.engineDir + 'platform/jsloader.js';
        document.ccConfig = c;
        script.id = 'cocos2d-html5';
        d.body.appendChild(script);
    });
})();