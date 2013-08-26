var Rush = {
    icon : s_RushIcon,
    active : false,
    time : 1000,
    speed : 0.8,
    timer : 0,
    vector : { x : 0, y : 0 },

    activate : function(layer) {
        this.timer = this.time;

    },

    update : function(dt) {

    }
};