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

var Particle = function (position, radius, speed) {
    this.position = position;
    this.radius = radius;
    this.speed = speed;
    this.mass = (4/3) * Math.PI * (radius * radius * radius);
    this.acceleration = new Vector();
};

var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var gravity = 0.01;

var particles = [];
var newParticles = [];

var clickStartTime = null;
var clickStartX = null;
var clickStartY = null;

var traces = false;

const toggleTraces = () => traces = !traces;
const clearParticles = () => { particles = []; newParticles = []; }
const preset = () => { particles = []; newParticles = [
    new Particle(new Vector(500, 300), 120, new Vector(0, 0)),
    new Particle(new Vector(350, 300), 6, new Vector(0, 31)),
    new Particle(new Vector(825, 300), 12, new Vector(0, -21)),
    new Particle(new Vector(840, 300), 3, new Vector(0, -22)),

    new Particle(new Vector(300, 300), 8, new Vector(0, -28)),
]; }

window.addEventListener("mousemove", function (e) {
});

window.addEventListener("mousedown", function (e) {
    let canvas = document.getElementById("canvas");
    clickStartX = e.pageX - canvas.getBoundingClientRect().left;
    clickStartY = e.pageY - canvas.getBoundingClientRect().top;

    if ( clickStartX < 0 ||
         clickStartY < 0 ||
         clickStartX > canvas.width ||
         clickStartY > canvas.height ) {
        return;
    }

    clickStartTime = Date.now();
});

window.addEventListener("mouseup", function (e) {
    if (!clickStartTime) return;

    let canvas = document.getElementById("canvas");
    let mass = (Date.now() - clickStartTime)/30;
    let x_end = e.pageX - canvas.getBoundingClientRect().left;
    let y_end = e.pageY - canvas.getBoundingClientRect().top;
    let v_x = (clickStartX - x_end)/10;
    let v_y = (clickStartY - y_end)/10;

    newParticles.push(new Particle(new Vector(clickStartX, clickStartY), mass, new Vector(v_x, v_y)));

    clickStartTime = null;
});


function calculateAcceleration() {
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.acceleration.set(0);

        for (let j = 0; j < i; j++) {
            let p2 = particles[j];

            let d = p.position.sub(p2.position);
            let norm = Math.sqrt(100.0 + d.lengthSq());
            let mag = gravity / (norm * norm * norm);

            p.acceleration.set(p.acceleration.sub(d.mul(mag * p2.mass)));
            p2.acceleration.set(p2.acceleration.add(d.mul(mag * p.mass)));
        }
    }
}

function applyAcceleration(dt) {
    for (let i = 0; i < particles.length; i++) {
        particles[i].speed.set(particles[i].speed.add(particles[i].acceleration.mul(dt)));
    }
}

function moveBodies(dt) {
    for (let i = 0; i < particles.length; i++) {
        particles[i].position.set(particles[i].position.add(particles[i].speed.mul(0.5 * dt)));
    }
}

function step(dt) {
    calculateAcceleration();
    applyAcceleration(dt);
    moveBodies(dt)
}

function update() {

    for(var newParticlesPos = 0; newParticlesPos < newParticles.length; newParticlesPos++)
    {
        particles.push(newParticles[newParticlesPos]);
    }
    newParticles = [];

    for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
        step(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
    }

    render();

    RAF(update);
}

function radiusColor(radius) {
    const low_color = [200, 60, 0];
    const high_color = [255, 255, 100];
    const max_radius = 100.0;

    let proportion = radius > max_radius ? 1.0 : radius/max_radius;
    let colors = [
        Math.floor(low_color[0]*(1-proportion) + high_color[0]*proportion),
        Math.floor(low_color[1]*(1-proportion) + high_color[1]*proportion),
        Math.floor(low_color[2]*(1-proportion) + high_color[2]*proportion),
    ];
    let hex2 = number => number <= 0x10 ? `0${number.toString(16)}` : number.toString(16);
    return "#" + hex2(colors[0]) + hex2(colors[1]) + hex2(colors[2]) + "cc";
}

function renderBody(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = radiusColor(radius);
    context.fill();
    context.closePath();
}

function render() {
    let canvas = document.getElementById("canvas");
    if (!canvas) return;
    let context = canvas.getContext("2d");

    if (!traces) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        renderBody(context, p.position.x, p.position.y, p.radius);
    }

    if (clickStartTime) {
        let r = (Date.now() - clickStartTime)/30;
        renderBody(context, clickStartX, clickStartY, r);
    }
}

update();