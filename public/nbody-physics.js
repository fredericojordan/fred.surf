var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vector.prototype = { // typeof VAR === "object" | VAR instanceof Vector
    constructor: Vector,

    set: function (set) {
        if (typeof set === "object") {
            this.x = set.x;
            this.y = set.y;
        } else {
            this.x = set;
            this.y = set;
        }

        return this;
    },

    equals: function (v) {
        return ((v.x === this.x) && (v.y === this.y));
    },

    clone: function () {
        return new Vector(this.x, this.y);
    },

    mul: function (mul) {
        if (typeof mul === "object") {
            return new Vector(this.x * mul.x, this.y * mul.y);
        } else {
            return new Vector(this.x * mul, this.y * mul);
        }
    },

    div: function (div) {
        return new Vector(this.x / div, this.y / div);
    },

    add: function (add) {
        if (typeof add === "object") {
            return new Vector(this.x + add.x, this.y + add.y);
        } else {
            return new Vector(this.x + add, this.y + add);
        }
    },

    sub: function (sub) {
        if (typeof sub === "object") {
            return new Vector(this.x - sub.x, this.y - sub.y);
        } else {
            return new Vector(this.x - sub, this.y - sub);
        }
    },

    reverse: function () {
        return this.mul(-1);
    },

    abs: function () {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    },

    dot: function (v) {
        return (this.x * v.x + this.y * v.y);
    },

    length: function () {
        return Math.sqrt(this.dot(this));
    },

    lengthSq: function () {
        return this.dot(this);
    },

    setLength: function (l) {
        return this.normalize().mul(l);
    },

    lerp: function (v, s) {
        return new Vector(this.x + (v.x - this.x) * s, this.y + (v.y - this.y) * s);
    },

    normalize: function () {
        return this.div(this.length());
    },

    truncate: function (max) {
        if (this.length() > max) {
            return this.normalize().mul(max);
        } else {
            return this;
        }
    },

    dist: function (v) {
        return Math.sqrt(this.distSq(v));
    },

    distSq: function (v) {
        var dx = this.x - v.x,
            dy = this.y - v.y;
        return dx * dx + dy * dy;
    },

    cross: function (v) {
        return this.x * v.y - this.y * v.x;
    }
};

if (typeof Math.sign == "undefined") {
    Math.sign = function (x) {
        return x === 0 ? 0 : x > 0 ? 1 : -1;
    };
}








var low_color = [200, 60, 0];
var high_color = [255, 255, 100];
let hex2 = number => number <= 0x10 ? `0${number.toString(16)}` : number.toString(16);

var Particle = function (c, r, v) {
    this.c = c;
    this.r = r;
    this.v = v;
    this.m = r * r * Math.PI;
    this.a = new Vector();


    var proportion = r > 100.0 ? 1.0 : r/80.0;
    var colors = [
        Math.floor(low_color[0]*(1-proportion) + high_color[0]*proportion),
        Math.floor(low_color[1]*(1-proportion) + high_color[1]*proportion),
        Math.floor(low_color[2]*(1-proportion) + high_color[2]*proportion),
    ];
    this.colour = "#" + hex2(colors[0]) + hex2(colors[1]) + hex2(colors[2]) + "c0";
};









var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;

var gravity = 1;

var particles = [];
var newParticles = [];


window.addEventListener("mousemove", function (e) {

});

window.addEventListener("mousedown", function (e) {
    this.click_start = Date.now();
    this.x_start = e.pageX - canvas.getBoundingClientRect().left;
    this.y_start = e.pageY - canvas.getBoundingClientRect().top;

});

window.addEventListener("mouseup", function (e) {
    var mass = (Date.now() - this.click_start)/30;

    var x_end = e.pageX - canvas.getBoundingClientRect().left;
    var y_end = e.pageY - canvas.getBoundingClientRect().top;
    var v_x = (this.x_start - x_end)/10;
    var v_y = (this.y_start - y_end)/10;

    newParticles.push(new Particle(new Vector(x_end, y_end), mass, new Vector(v_x, v_y)));
});


function compute_forces() {
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.a.set(0);

        for (var j = 0; j < i; j++) {
            var p2 = particles[j];

            var d = p.c.sub(p2.c);
            var norm = Math.sqrt(100.0 + d.lengthSq());
            var mag = gravity / (norm * norm * norm);

            p.a.set(p.a.sub(d.mul(mag * p2.m)));
            p2.a.set(p2.a.add(d.mul(mag * p.m)));

        }
    }

}

function do_physics(dt) {
    for (var i1 = 0; i1 < particles.length; i1++) {
        var p1 = particles[i1];
        p1.c.set(p1.c.add(p1.v.mul(0.5 * dt)));
    }
    compute_forces();
    for (var i2 = 0; i2 < particles.length; i2++) {
        var p2 = particles[i2];
        p2.v.set(p2.v.add(p2.a.mul(dt)));
    }
    for (var i3 = 0; i3 < particles.length; i3++) {
        var p3 = particles[i3];
        p3.c.set(p3.c.add(p3.v.mul(0.5 * dt)));
    }
}

function update() {

    for(var newParticlesPos = 0; newParticlesPos < newParticles.length; newParticlesPos++)
    {
        particles.push(newParticles[newParticlesPos]);
    }
    newParticles = [];

    for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
        do_physics(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
    }

    render();

    RAF(update);
}

function render() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        ctx.beginPath();
        ctx.arc(p.c.x, p.c.y, p.r, 0, Math.PI * 2, false);
        ctx.fillStyle = p.colour;
        ctx.fill();
        ctx.closePath();
    }
}

update();