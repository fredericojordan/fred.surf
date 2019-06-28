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

const clearParticles = () => { particles = []; newParticles = []; };

const preset = () => {
    particles = [];
    newParticles = [
        new Particle(new Vector(500, 300), 120, new Vector(0, 0)),
        new Particle(new Vector(350, 300), 6, new Vector(0, 31)),
        new Particle(new Vector(825, 300), 12, new Vector(0, -21)),
        new Particle(new Vector(840, 300), 3, new Vector(0, -22)),

        new Particle(new Vector(300, 300), 8, new Vector(0, -28)),
    ];
};

function onPress(e) {
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
}

function onRelease(e) {
    if (!clickStartTime) return;

    let canvas = document.getElementById("canvas");
    let mass = (Date.now() - clickStartTime)/30;
    let x_end = e.pageX - canvas.getBoundingClientRect().left;
    let y_end = e.pageY - canvas.getBoundingClientRect().top;
    let v_x = (clickStartX - x_end)/10;
    let v_y = (clickStartY - y_end)/10;

    newParticles.push(new Particle(new Vector(clickStartX, clickStartY), mass, new Vector(v_x, v_y)));

    clickStartTime = null;
}

window.addEventListener("mousedown", onPress);
window.addEventListener("mouseup", onRelease);
window.addEventListener("touchstart", onPress);
window.addEventListener("touchend", onRelease);


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

function blackBodyColor(radius) {
    const maxRadius = 420;

    let ratio = radius > maxRadius ? 1.0 : radius/maxRadius;

    let colorPalette = ['#FF001D', '#FF001C', '#FF001B', '#FF0018', '#FF0013', '#FF0010', '#FF000F', '#FF000D', '#FF0E00', '#FF1000', '#FF1100', '#FF1200', '#FF1300', '#FF1500', '#FF1700', '#FF1900', '#FF1A00', '#FF1D00', '#FF2100', '#FF2600', '#FF2A00', '#FF2F00', '#FF3200', '#FF3400', '#FF3500', '#FF3600', '#FF3B00', '#FF3E00', '#FF4400', '#FF4500', '#FF4700', '#FF4800', '#FF4900', '#FF4A00', '#FF4B00', '#FF4E00', '#FF5100', '#FF5400', '#FF5700', '#FF5A00', '#FF5E00', '#FF5F00', '#FF6000', '#FF6100', '#FF6200', '#FF6300', '#FF6400', '#FF6500', '#FF6700', '#FF6A00', '#FF6C00', '#FF6D00', '#FF7000', '#FF7200', '#FF7300', '#FF7500', '#FF7700', '#FF7800', '#FF7B00', '#FF7C00', '#FF7E00', '#FF8000', '#FF8100', '#FF8200', '#FF8400', '#FF8500', '#FF8600', '#FF8601', '#FF8606', '#FF8608', '#FF8708', '#FF8709', '#FF870A', '#FF870D', '#FF870E', '#FF870F', '#FF880F', '#FF8810', '#FF8811', '#FF8812', '#FF8813', '#FF8913', '#FF8914', '#FF8916', '#FF8A17', '#FF8A18', '#FF8A19', '#FF8A1A', '#FF8B1A', '#FF8B1B', '#FF8B1C', '#FF8C1C', '#FF8C1D', '#FF8C1E', '#FF8C1F', '#FF8D1F', '#FF8D20', '#FF8D21', '#FF8E23', '#FF8E24', '#FF8F24', '#FF8F25', '#FF8F26', '#FF9026', '#FF9027', '#FF9028', '#FF9128', '#FF9129', '#FF912A', '#FF922A', '#FF922B', '#FF922C', '#FF932C', '#FF932D', '#FF932E', '#FF942E', '#FF942F', '#FF9430', '#FF9530', '#FF9531', '#FF9532', '#FF9632', '#FF9634', '#FF9734', '#FF9735', '#FF9736', '#FF9836', '#FF9837', '#FF9838', '#FF9938', '#FF9939', '#FF9A3A', '#FF9A3B', '#FF9B3B', '#FF9B3C', '#FF9B3D', '#FF9C3D', '#FF9C3E', '#FF9C3F', '#FF9D3F', '#FF9D40', '#FF9D41', '#FF9E41', '#FF9E42', '#FF9F43', '#FF9F44', '#FFA044', '#FFA045', '#FFA046', '#FFA146', '#FFA147', '#FFA148', '#FFA248', '#FFA249', '#FFA24A', '#FFA34A', '#FFA34B', '#FFA44C', '#FFA44D', '#FFA54D', '#FFA54E', '#FFA54F', '#FFA64F', '#FFA650', '#FFA651', '#FFA751', '#FFA752', '#FFA753', '#FFA853', '#FFA854', '#FFA955', '#FFA956', '#FFAA56', '#FFAA57', '#FFAA58', '#FFAB58', '#FFAB59', '#FFAB5A', '#FFAC5A', '#FFAC5B', '#FFAC5C', '#FFAD5C', '#FFAD5D', '#FFAD5E', '#FFAE5E', '#FFAE5F', '#FFAF5F', '#FFAF60', '#FFAF61', '#FFB061', '#FFB062', '#FFB063', '#FFB163', '#FFB164', '#FFB165', '#FFB265', '#FFB266', '#FFB267', '#FFB367', '#FFB368', '#FFB369', '#FFB469', '#FFB46A', '#FFB56A', '#FFB56B', '#FFB56C', '#FFB66C', '#FFB66D', '#FFB66E', '#FFB76E', '#FFB76F', '#FFB770', '#FFB870', '#FFB871', '#FFB872', '#FFB972', '#FFB973', '#FFB974', '#FFBA74', '#FFBA75', '#FFBA76', '#FFBB76', '#FFBB77', '#FFBB78', '#FFBC78', '#FFBC79', '#FFBC7A', '#FFBD7A', '#FFBD7B', '#FFBE7C', '#FFBE7D', '#FFBF7D', '#FFBF7E', '#FFBF7F', '#FFC07F', '#FFC080', '#FFC081', '#FFC181', '#FFC182', '#FFC183', '#FFC283', '#FFC284', '#FFC285', '#FFC385', '#FFC386', '#FFC387', '#FFC487', '#FFC488', '#FFC489', '#FFC589', '#FFC58A', '#FFC58B', '#FFC68B', '#FFC68C', '#FFC68D', '#FFC78D', '#FFC78E', '#FFC78F', '#FFC88F', '#FFC890', '#FFC891', '#FFC991', '#FFC992', '#FFC993', '#FFCA93', '#FFCA94', '#FFCA95', '#FFCB95', '#FFCB96', '#FFCB97', '#FFCC97', '#FFCC98', '#FFCC99', '#FFCD99', '#FFCD9A', '#FFCD9B', '#FFCE9B', '#FFCE9C', '#FFCE9D', '#FFCF9D', '#FFCF9E', '#FFCF9F', '#FFD0A0', '#FFD0A1', '#FFD0A2', '#FFD1A2', '#FFD1A3', '#FFD1A4', '#FFD2A4', '#FFD2A5', '#FFD2A6', '#FFD3A6', '#FFD3A7', '#FFD3A8', '#FFD4A8', '#FFD4AA', '#FFD5AA', '#FFD5AB', '#FFD5AC', '#FFD6AC', '#FFD6AD', '#FFD6AE', '#FFD7AE', '#FFD7AF', '#FFD8B2', '#FFD8B3', '#FFD9B3', '#FFD9B4', '#FFD9B5', '#FFDAB5', '#FFDAB6', '#FFDAB7', '#FFDBB7', '#FFDBB8', '#FFDBB9', '#FFDCB9', '#FFDCBA', '#FFDCBB', '#FFDDBB', '#FFDDBC', '#FFDDBD', '#FFDDBE', '#FFDEBE', '#FFDEBF', '#FFDEC0', '#FFDFC0', '#FFDFC1', '#FFDFC2', '#FFE0C2', '#FFE0C3', '#FFE0C4', '#FFE1C4', '#FFE1C5', '#FFE1C6', '#FFE1C7', '#FFE2C7', '#FFE2C8', '#FFE2C9', '#FFE3C9', '#FFE3CB', '#FFE4CB', '#FFE4CC', '#FFE4CD', '#FFE5CD', '#FFE5CE', '#FFE5CF', '#FFE5D0', '#FFE6D0', '#FFE6D1', '#FFE6D2', '#FFE7D2', '#FFE7D3', '#FFE7D4', '#FFE8D4', '#FFE8D5', '#FFE8D6', '#FFE8D7', '#FFE9D7', '#FFE9D8', '#FFE9D9', '#FFEAD9', '#FFEADA', '#FFEADB', '#FFEBDB', '#FFEBDC', '#FFEBDD', '#FFEBDE', '#FFECDE', '#FFECDF', '#FFECE0', '#FFEDE0', '#FFEDE1', '#FFEDE2', '#FFEEE2', '#FFEEE3', '#FFEEE4', '#FFEEE5', '#FFEFE5', '#FFEFE6', '#FFEFE7', '#FFF0E7', '#FFF0E8', '#FFF0E9', '#FFF0EA', '#FFF1EA', '#FFF1EB', '#FFF1EC', '#FFF2EC', '#FFF2ED', '#FFF2EE', '#FFF3EF', '#FFF3F0', '#FFF3F1', '#FFF4F1', '#FFF4F2', '#FFF4F3', '#FFF5F3', '#FFF5F4', '#FFF5F5', '#FFF5F6', '#FFF6F6', '#FFF6F7', '#FFF6F8', '#FFF7F8', '#FFF7F9', '#FFF7FA', '#FFF7FB', '#FFF8FB', '#FFF8FC', '#FFF8FD', '#FFF9FD', '#FFF9FE', '#FFF9FF', '#FEF9FF', '#FEF8FF', '#FDF8FF', '#FCF8FF', '#FCF7FF', '#FBF7FF', '#FAF7FF', '#FAF6FF', '#F9F6FF', '#F9F5FF', '#F8F5FF', '#F7F5FF', '#F7F4FF', '#F6F4FF', '#F5F4FF', '#F5F3FF', '#F4F3FF', '#F3F2FF', '#F2F2FF', '#F2F1FF', '#F1F1FF', '#F0F1FF', '#F0F0FF', '#EFF0FF', '#EEF0FF', '#EEEFFF', '#EDEFFF', '#EDEEFF', '#ECEEFF', '#EBEEFF', '#EBEDFF', '#EAEDFF', '#E9EDFF', '#E9ECFF', '#E8ECFF', '#E8EBFF', '#E7EBFF', '#E6EBFF', '#E6EAFF', '#E5EAFF', '#E4EAFF', '#E4E9FF', '#E3E9FF', '#E3E8FF', '#E2E8FF', '#E1E8FF', '#E1E7FF', '#E0E7FF', '#DFE7FF', '#DFE6FF', '#DEE6FF', '#DEE5FF', '#DDE5FF', '#DCE5FF', '#DCE4FF', '#DBE4FF', '#DAE4FF', '#DAE3FF', '#D9E3FF', '#D9E2FF', '#D8E2FF', '#D7E2FF', '#D7E1FF', '#D6E1FF', '#D5E1FF', '#D5E0FF', '#D4E0FF', '#D4DFFF', '#D3DFFF', '#D2DFFF', '#D2DEFF', '#D1DEFF', '#D1DDFF', '#D0DDFF', '#CFDDFF', '#CFDCFF', '#CEDCFF', '#CDDCFF', '#CDDBFF', '#CCDBFF', '#CCDAFF', '#CBDAFF', '#CADAFF', '#CAD9FF', '#C9D9FF', '#C8D8FF', '#C7D8FF', '#C7D7FF', '#C6D7FF', '#C5D7FF', '#C5D6FF', '#C4D6FF', '#C4D5FF', '#C3D5FF', '#C2D5FF', '#C2D4FF', '#C1D4FF', '#C1D3FF', '#C0D3FF', '#BFD3FF', '#BFD2FF', '#BED2FF', '#BDD2FF', '#BDD1FF', '#BCD1FF', '#BCD0FF', '#BBD0FF', '#BAD0FF', '#BACFFF', '#B9CFFF', '#B9CEFF', '#B9CEFF'];
    return colorPalette[Math.floor(524*ratio)] + 'cc';
}

function HSV2RGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function RGB2HSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

function HSVInterpolation(colorA, colorB, ratio) {
    let color_a = [colorA.slice(1,3), colorA.slice(3,5), colorA.slice(5,7)];
    let color_b = [colorB.slice(1,3), colorB.slice(3,5), colorB.slice(5,7)];

    const color_a2 = color_a.map(x => parseInt(x, 16));
    const color_b2 = color_b.map(x => parseInt(x, 16));

    const cAHSV = RGB2HSV(color_a2[0], color_a2[1], color_a2[2]);
    const cBHSV = RGB2HSV(color_b2[0], color_b2[1], color_b2[2]);

    let colorHSV = {
        h: cAHSV.h*(1-ratio) + cBHSV.h*ratio,
        s: cAHSV.s*(1-ratio) + cBHSV.s*ratio,
        v: cAHSV.v*(1-ratio) + cBHSV.v*ratio,
    };

    let colorRGB = HSV2RGB(colorHSV);

    let hex2 = number => number <= 0x10 ? `0${number.toString(16)}` : number.toString(16);
    return '#' + hex2(colorRGB.r) + hex2(colorRGB.g) + hex2(colorRGB.b);
}

function RGBInterpolation(colorA, colorB, ratio) {
    let color_a = [colorA.slice(1,3), colorA.slice(3,5), colorA.slice(5,7)];
    let color_b = [colorB.slice(1,3), colorB.slice(3,5), colorB.slice(5,7)];

    const color_a2 = color_a.map(x => parseInt(x, 16));
    const color_b2 = color_b.map(x => parseInt(x, 16));

    let colors = [
        Math.floor(color_a2[0]*(1-ratio) + color_b2[0]*ratio),
        Math.floor(color_a2[1]*(1-ratio) + color_b2[1]*ratio),
        Math.floor(color_a2[2]*(1-ratio) + color_b2[2]*ratio),
    ];
    let hex2 = number => number <= 0x10 ? `0${number.toString(16)}` : number.toString(16);
    return '#' + hex2(colors[0]) + hex2(colors[1]) + hex2(colors[2]);
}

function radiusColor(radius) {
    const maxRadius = 100.0;
    const lowColor = '#C83C00';
    const highColor = '#FFFF64';

    let ratio = radius > maxRadius ? 1.0 : radius/maxRadius;

    return HSVInterpolation(lowColor, highColor, ratio) + 'cc';
    // return RGBInterpolation(lowColor, highColor, ratio) + 'cc';
}

function renderBody(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    // context.fillStyle = blackBodyColor(radius);
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