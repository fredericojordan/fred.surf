var l=void 0;function n(B,y,p,v,J){function F(){requestAnimationFrame(F,c.canvas);if(void 0===c.K)G(),c.m(c.canvas,0);else{var a=Date.now(),b=a-c.ea;1E3<b&&(b=c.L);c.ea=a;for(c.B+=b;c.B>=c.L;)K(),G(),c.B-=c.L;c.m(c.canvas,c.B/c.L)}}function K(){function a(b){b.W=b.x;b.X=b.y;b.children&&0<b.children.length&&b.children.forEach(function(d){a(d)})}c.f.children.forEach(function(b){a(b)})}function G(){if(0<c.buttons.length){c.canvas.style.cursor="auto";for(var a=c.buttons.length-1;0<=a;a--){var b=c.buttons[a];b.update(c.S,c.canvas);"over"!==b.state&&"down"!==b.state||b.f||(c.canvas.style.cursor="pointer")}}c.ja&&c.S.cb();c.state&&!c.paused&&c.state();if(0!==c.sa.length)for(a=0;a<c.sa.length;a++)(0,c.sa[a])()}function q(a){a.x=0;a.y=0;a.Ca=0;a.w=0;a.width=0;a.height=0;a.Wa=1;a.Xa=1;a.D=.5;a.F=.5;a.rotation=0;a.visible=!0;a.parent=void 0;a.f=!1;a.Za=!1;a.shadowColor="rgba(100, 100, 100, 0.5)";a.shadowOffsetX=3;a.shadowOffsetY=3;a.shadowBlur=3;a.wa=void 0;a.aa=1;a.ua=void 0;a.eb=0;a.J=!1;a.ba=!1;a.W=void 0;a.X=void 0;a.children=[];a.b=function(b){b.parent&&b.parent.removeChild(b);b.parent=a;a.children.push(b)};a.removeChild=function(b){if(b.parent===a)a.children.splice(a.children.indexOf(b),1);else throw Error(b+"is not a child of "+a);};a.yb=function(b,d){var f=a.children.indexOf(b),g=a.children.indexOf(d);if(-1!==f&&-1!==g)b.Ka=g,d.Ka=f,a.children[f]=d,a.children[g]=b;else throw Error(child+" Both objects must be a child of the caller "+a);};a.add=function(b){var d=Array.prototype.slice.call(arguments);1<d.length?d.forEach(function(f){a.b(f)}):a.b(d[0])};a.remove=function(b){var d=Array.prototype.slice.call(arguments);1<d.length?d.forEach(function(f){a.removeChild(f)}):a.removeChild(d[0])};a.setPosition=function(b,d){a.x=b;a.y=d};a.qb=function(b,d,f){b.x=a.x+a.u-b.u+(d||0);b.y=a.y+a.o-b.o+(f||0);a.O(a,b)};a.tb=function(b,d,f){b.x=a.x+a.u-b.u+(d||0);b.y=a.y-b.height+(f||0);a.O(a,b)};a.sb=function(b,d,f){b.x=a.x+a.width+(d||0);b.y=a.y+a.o-b.o+(f||0);a.O(a,b)};a.pb=function(b,d,f){b.x=a.x+a.u-b.u+(d||0);b.y=a.y+a.height+(f||0);a.O(a,b)};a.rb=function(b,d,f){b.x=a.x-b.width+(d||0);b.y=a.y+a.o-b.o+(f||0);a.O(a,b)};a.O=function(b,d){if(0!==d.parent.h||0!==d.parent.i)d.x-=b.h,d.y-=b.i};Object.defineProperties(a,{h:{get:function(){return this.parent?this.x+this.parent.h:this.x},enumerable:!0,configurable:!0},i:{get:function(){return this.parent?this.y+this.parent.i:this.y},enumerable:!0,configurable:!0},position:{get:function(){return{x:a.x,y:a.y}},enumerable:!0,configurable:!0},alpha:{get:function(){return a.parent.aa*a.aa},set:function(b){a.aa=b},enumerable:!0,configurable:!0},u:{get:function(){return a.width/2},enumerable:!0,configurable:!0},o:{get:function(){return a.height/2},enumerable:!0,configurable:!0},Ma:{get:function(){return a.J},set:function(b){!0===b&&!1===a.J&&(H(a),a.J=!0);!1===b&&!0===a.J&&(delete a.ga,delete a.T,a.J=!1)},enumerable:!0,configurable:!0},draggable:{get:function(){return a.ua},set:function(b){!0===b&&(c.g.push(a),a.ua=!0,!1===c.ja&&(c.ja=!0));!1===b&&c.g.splice(c.g.indexOf(a),1)},enumerable:!0,configurable:!0},Ra:{get:function(){return a.ba},set:function(b){!0===b&&(I(a),a.ba=!0);!1===b&&(c.buttons.splice(c.buttons.indexOf(a),1),a.ba=!1)},enumerable:!0,configurable:!0},empty:{get:function(){return 0===a.children.length?!0:!1},enumerable:!0,configurable:!0}})}function H(a){Object.defineProperties(a,{ga:{get:function(){return a.width},set:function(b){a.width=b;a.height=b},enumerable:!0,configurable:!0},T:{get:function(){return a.width/2},set:function(b){a.width=2*b;a.height=2*b},enumerable:!0,configurable:!0}})}function I(a){a.c=a.c||void 0;a.release=a.release||void 0;a.oa=a.oa||void 0;a.na=a.na||void 0;a.I=a.I||void 0;a.state="up";a.action="";a.pressed=!1;a.enabled=!0;a.Y=!1;c.buttons.push(a);a.update=function(b){if(a.enabled){var d=c.S.la(a);b.l&&(a.state="up","button"===a.qa&&a.show(0));d&&(a.state="over",a.frames&&3===a.frames.length&&"button"===a.qa&&a.show(1),b.j&&(a.state="down","button"===a.qa&&(3===a.frames.length?a.show(2):a.show(1))));"down"!==a.state||a.pressed||(a.c&&a.c(),a.pressed=!0,a.action="pressed");"over"===a.state&&(a.pressed&&(a.release&&a.release(),a.pressed=!1,a.action="released",c.S.Z&&a.I&&a.I()),a.Y||(a.oa&&a.oa(),a.Y=!0));"up"===a.state&&(a.pressed&&(a.release&&a.release(),a.pressed=!1,a.action="released"),a.Y&&(a.na&&a.na(),a.Y=!1))}}}function u(a){var b={};b.code=a;b.j=!1;b.l=!0;b.c=void 0;b.release=void 0;b.ha=function(d){d.keyCode===b.code&&(b.l&&b.c&&b.c(),b.j=!0,b.l=!1);d.preventDefault()};b.$=function(d){d.keyCode===b.code&&(b.j&&b.release&&b.release(),b.j=!1,b.l=!0);d.preventDefault()};window.addEventListener("keydown",b.ha.bind(b),!1);window.addEventListener("keyup",b.$.bind(b),!1);return b}var c={};c.canvas=document.createElement("canvas");c.canvas.setAttribute("width",1*B);c.canvas.setAttribute("height",1*y);c.canvas.style.backgroundColor="black";document.body.appendChild(c.canvas);c.canvas.fa=c.canvas.getContext("2d");c.f=function(){var a={};q(a);a.f=!0;a.width=c.canvas.width;a.height=c.canvas.height;a.x=0;a.y=0;a.parent=void 0;return a}();c.S=function(){var a={M:0,N:0};Object.defineProperties(a,{x:{get:function(){return a.M/c.scale},enumerable:!0,configurable:!0},y:{get:function(){return a.N/c.scale},enumerable:!0,configurable:!0},position:{get:function(){return{x:a.x,y:a.y}},enumerable:!0,configurable:!0}});a.j=!1;a.l=!0;a.Z=!1;a.ia=0;a.elapsedTime=0;a.c=void 0;a.release=void 0;a.I=void 0;a.P=null;a.ya=0;a.za=0;a.Va=function(b){a.M=b.pageX-b.target.offsetLeft;a.N=b.pageY-b.target.offsetTop;b.preventDefault()};a.ab=function(b){a.M=b.targetTouches[0].pageX-c.canvas.offsetLeft;a.N=b.targetTouches[0].pageY-c.canvas.offsetTop;b.preventDefault()};a.ha=function(b){a.M=b.pageX-b.target.offsetLeft;a.N=b.pageY-b.target.offsetTop;a.j=!0;a.l=!1;a.Z=!1;a.ia=Date.now();a.c&&a.c();b.preventDefault()};a.bb=function(b){a.M=b.targetTouches[0].pageX-c.canvas.offsetLeft;a.N=b.targetTouches[0].pageY-c.canvas.offsetTop;a.j=!0;a.l=!1;a.Z=!1;a.ia=Date.now();a.c&&a.c();b.preventDefault()};a.$=function(b){a.elapsedTime=Math.abs(a.ia-Date.now());200>=a.elapsedTime&&(a.Z=!0,a.I&&a.I());a.l=!0;a.j=!1;a.release&&a.release();b.preventDefault()};c.canvas.addEventListener("mousemove",a.Va.bind(a),!1);c.canvas.addEventListener("mousedown",a.ha.bind(a),!1);window.addEventListener("mouseup",a.$.bind(a),!1);c.canvas.addEventListener("touchmove",a.ab.bind(a),!1);c.canvas.addEventListener("touchstart",a.bb.bind(a),!1);window.addEventListener("touchend",a.$.bind(a),!1);c.canvas.style.touchAction="none";a.la=function(b){if(b.Ma){var d=a.x-(b.h+b.u),f=a.y-(b.i+b.o);b=Math.sqrt(d*d+f*f)<b.T}else{d=b.h+b.width;f=b.i;var g=b.i+b.height;b=a.x>b.h&&a.x<d&&a.y>f&&a.y<g}return b};a.cb=function(){if(a.j)if(null===a.P)for(var b=c.g.length-1;-1<b;b--){var d=c.g[b];if(d.draggable&&a.la(d)){a.ya=a.x-d.h;a.za=a.y-d.i;a.P=d;b=d.parent.children;b.splice(b.indexOf(d),1);b.push(d);c.g.splice(c.g.indexOf(d),1);c.g.push(d);break}}else a.P.x=a.x-a.ya,a.P.y=a.y-a.za;a.l&&(a.P=null);c.g.some(function(f){if(f.draggable&&a.la(f))return c.canvas.style.cursor="pointer",!0;c.canvas.style.cursor="auto";return!1})};return a}();c.key=function(){var a={};a.kb=u(37);a.Ab=u(38);a.vb=u(39);a.fb=u(40);a.xb=u(32);return a}();c.buttons=[];c.ja=!1;c.g=[];c.zb=[];c.state=void 0;c.load=J||void 0;c.pa=p||void 0;if(void 0===c.pa)throw Error("Please supply the setup function in the constructor");c.va=v||void 0;c.paused=!1;c.K=60;c.ea=Date.now();c.L=1E3/c.K;c.B=0;c.Sa=!0;c.sa=[];c.scale=1;c.start=function(){c.va?(c.a.Da=function(){c.state=void 0;c.pa()},c.a.load(c.va),c.load&&(c.state=c.load)):c.pa();F()};c.pause=function(){c.paused=!0};c.resume=function(){c.paused=!1};c.ib=function(){c.canvas.style.cursor="none"};c.wb=function(){c.canvas.style.cursor="auto"};Object.defineProperties(c,{ka:{get:function(){return c.K},set:function(a){c.K=a;c.ea=Date.now();c.L=1E3/c.K},enumerable:!0,configurable:!0},backgroundColor:{set:function(a){c.canvas.style.backgroundColor=a},enumerable:!0,configurable:!0}});c.remove=function(a){var b=Array.prototype.slice.call(arguments);if(b[0]instanceof Array){if(b=b[0],0<b.length)for(var d=b.length-1;0<=d;d--){var f=b[d];f.parent.removeChild(f);b.splice(b.indexOf(f),1)}}else 1<b.length?b.forEach(function(g){g.parent.removeChild(g)}):b[0].parent.removeChild(b[0])};c.group=function(a){var b={};q(b);b.b=function(d){d.parent&&d.parent.removeChild(d);d.parent=b;b.children.push(d);b.xa()};b.removeChild=function(d){if(d.parent===b)b.children.splice(b.children.indexOf(d),1);else throw Error(d+"is not a child of "+b);b.xa()};b.xa=function(){0<b.children.length&&(b.da=0,b.ca=0,b.children.forEach(function(d){d.x+d.width>b.da&&(b.da=d.x+d.width);d.y+d.height>b.ca&&(b.ca=d.y+d.height)}),b.width=b.da,b.height=b.ca)};c.f.b(b);a&&Array.prototype.slice.call(arguments).forEach(function(d){b.b(d)});return b};c.ub=function(a,b,d,f,g,e,h){var k={};q(k);k.ma=!1;k.width=a||32;k.height=b||32;k.fillStyle=d||"red";k.strokeStyle=f||"none";k.lineWidth=g||0;k.x=e||0;k.y=h||0;c.f.b(k);k.m=function(m){m.strokeStyle=k.strokeStyle;m.lineWidth=k.lineWidth;m.fillStyle=k.fillStyle;m.beginPath();m.rect(-k.width*k.D,-k.height*k.F,k.width,k.height);!0===k.ma?m.clip():("none"!==k.strokeStyle&&m.stroke(),"none"!==k.fillStyle&&m.fill())};return k};c.La=function(){var a=w.canvas.width/2-50,b={};q(b);b.ma=!1;b.width=100;b.height=100;b.fillStyle="lightgrey";b.strokeStyle="black";b.lineWidth=2;b.x=a||0;b.y=100;c.f.b(b);H(b);b.m=function(d){d.strokeStyle=b.strokeStyle;d.lineWidth=b.lineWidth;d.fillStyle=b.fillStyle;d.beginPath();d.arc(b.T+-b.ga*b.D,b.T+-b.ga*b.F,b.T,0,2*Math.PI,!1);!0===b.ma?d.clip():("none"!==b.strokeStyle&&d.stroke(),"none"!==b.fillStyle&&d.fill())};return b};c.line=function(a,b,d,f,g,e){var h={};q(h);d||0===d||(d=0);f||0===f||(f=0);g||0===g||(g=32);e||0===e||(e=32);h.Ga=d;h.Ha=f;h.Ia=g;h.Ja=e;h.strokeStyle=a||"red";h.lineWidth=b||1;h.lineJoin="round";c.f.b(h);h.m=function(k){k.strokeStyle=h.strokeStyle;k.lineWidth=h.lineWidth;k.lineJoin=h.lineJoin;k.beginPath();k.moveTo(h.Ga,h.Ha);k.lineTo(h.Ia,h.Ja);"none"!==h.strokeStyle&&k.stroke();"none"!==h.fillStyle&&k.fill()};return h};c.text=function(a,b,d,f,g){var e={};q(e);e.content=a||"Hello!";e.font=b||"12px sans-serif";e.fillStyle=d||"red";e.textBaseline="top";Object.defineProperties(e,{width:{get:function(){return c.canvas.fa.measureText(e.content).width},enumerable:!0,configurable:!0},height:{get:function(){return c.canvas.fa.measureText("M").width},enumerable:!0,configurable:!0}});c.f.b(e);e.x=f||0;e.y=g||0;e.m=function(h){h.strokeStyle=e.strokeStyle;h.lineWidth=e.lineWidth;h.fillStyle=e.fillStyle;0===e.width&&(e.width=h.measureText(e.content).width);0===e.height&&(e.height=h.measureText("M").width);h.translate(-e.width*e.D,-e.height*e.F);h.font=e.font;h.textBaseline=e.textBaseline;h.fillText(e.content,0,0)};return e};c.frame=function(a,b,d,f,g){var e={};e.image=a;e.x=b;e.y=d;e.width=f;e.height=g;return e};c.frames=function(a,b,d,f){var g={};g.image=a;g.data=b;g.width=d;g.height=f;return g};c.gb=function(a,b,d,f){var g=c.a[a].source,e=[],h=g.width/b;g=g.height/d*h;for(var k=0;k<g;k++){var m=k%h*b;var r=Math.floor(k/h)*d;f&&0<f&&(m+=f+f*k%h,r+=f+f*Math.floor(k/h));e.push([m,r])}return c.frames(a,e,b,d)};c.$a=function(a){var b={};if(void 0===a)throw Error("Sprites require a source");q(b);b.frames=[];b.loop=!0;b.ta=0;b.Ya=function(d){if(d.image)if(d.image&&!d.data){if(!(c.a[d.image].source instanceof Image))throw Error(d.image+" is not an image file");b.source=c.a[d.image].source;b.G=d.x;b.H=d.y;b.width=d.width;b.height=d.height;b.V=d.width;b.U=d.height}else d.image&&d.data&&(b.source=c.a[d.image].source,b.frames=d.data,b.G=b.frames[0][0],b.H=b.frames[0][1],b.width=d.width,b.height=d.height,b.V=d.width,b.U=d.height);else d instanceof Array?(b.frames=d,b.source=c.a[d[0]].source,b.G=c.a[d[0]].frame.x,b.H=c.a[d[0]].frame.y,b.width=c.a[d[0]].frame.A,b.height=c.a[d[0]].frame.s,b.V=c.a[d[0]].frame.A,b.U=c.a[d[0]].frame.s):(b.v=c.a[d],b.source=b.v.source,b.G=b.v.frame.x,b.H=b.v.frame.y,b.width=b.v.frame.A,b.height=b.v.frame.s,b.V=b.v.frame.A,b.U=b.v.frame.s)};b.Ya(a);b.C=function(d){if(0<b.frames.length)b.frames[0]instanceof Array?(b.G=b.frames[d][0],b.H=b.frames[d][1]):c.a[b.frames[d]].frame&&(b.source=c.a[b.frames[d]].source,b.G=c.a[b.frames[d]].frame.x,b.H=c.a[b.frames[d]].frame.y,b.V=c.a[b.frames[d]].frame.A,b.U=c.a[b.frames[d]].frame.s,b.width=c.a[b.frames[d]].frame.A,b.height=c.a[b.frames[d]].frame.s),b.ta=d;else throw Error("Frame number "+d+"doesn't exist");};b.x=0;b.y=0;0<b.frames.length&&(c.Ea(b),Object.defineProperty(b,"currentFrame",{get:function(){return b.ta},enumerable:!1,configurable:!1}));c.f.b(b);b.m=function(d){d.drawImage(b.source,b.G,b.H,b.V,b.U,-b.width*b.D,-b.height*b.F,b.width,b.height)};return b};c.button=function(a){a=c.$a(a);a.qa="button";I(a);return a};c.image=function(a){return c.a[a]};c.json=function(a){return c.a[a]};c.Ea=function(a){function b(t){f();h=t[0];k=t[1];e=k-h;0===h&&(e+=1,g+=1);1===e&&(e=2,g+=1);a.ka||(a.ka=12);t=1E3/a.ka;a.C(h);r||(m=setInterval(d.bind(this),t),r=!0)}function d(){g<e?(a.C(a.Oa+1),g+=1):a.loop&&(a.C(h),g=1)}function f(){void 0!==m&&!0===r&&(r=!1,e=k=h=g=0,clearInterval(m))}var g=0,e=0,h=0,k=0,m=void 0,r=!1;a.show=function(t){f();"string"!==typeof t?a.C(t):a.C(a.frames.indexOf(t))};a.play=function(){b([0,a.frames.length-1])};a.stop=function(){f();a.C(a.Oa)};a.ob=r;a.nb=b};c.m=function(a,b){function d(e){if(e.visible&&e.h<a.width+e.width&&e.h+e.width>=-e.width&&e.i<a.height+e.height&&e.i+e.height>=-e.height){f.save();c.Sa?(e.Aa=void 0!==e.W?(e.x-e.W)*b+e.W:e.x,e.Ba=void 0!==e.X?(e.y-e.X)*b+e.X:e.y):(e.Aa=e.x,e.Ba=e.y);f.translate(e.Aa+e.width*e.D,e.Ba+e.height*e.F);f.globalAlpha=e.alpha;f.rotate(e.rotation);f.scale(e.Wa,e.Xa);e.Za&&(f.shadowColor=e.shadowColor,f.shadowOffsetX=e.shadowOffsetX,f.shadowOffsetY=e.shadowOffsetY,f.shadowBlur=e.shadowBlur);e.wa&&(f.globalCompositeOperation=e.wa);e.m&&e.m(f);if(e.children&&0<e.children.length){f.translate(-e.width*e.D,-e.height*e.F);for(var h=0;h<e.children.length;h++)d(e.children[h])}f.restore()}}var f=a.fa;f.clearRect(0,0,a.width,a.height);for(var g=0;g<c.f.children.length;g++)d(c.f.children[g])};c.a={ra:0,loaded:0,Qa:["png","jpg","gif","webp"],Pa:["ttf","otf","ttc","woff"],Fa:["mp3","ogg","wav","webm"],Ta:["json"],Da:void 0,load:function(a){console.log("Loading assets...");var b=this;b.ra=a.length;a.forEach(function(d){var f=d.split(".").pop();if(-1!==b.Qa.indexOf(f)){var g=new Image;g.addEventListener("load",function(){g.name=d;b[g.name]={source:g,frame:{x:0,y:0,A:g.width,s:g.height}};b.R()},!1);g.src=d}else if(-1!==b.Pa.indexOf(f)){f=d.split("/").pop().split(".")[0];var e=document.createElement("style");e.appendChild(document.createTextNode("@font-face {font-family: '"+f+"'; src: url('"+d+"');}"));document.head.appendChild(e);b.R()}else if(-1!==b.Fa.indexOf(f))f=c.mb(d,b.R.bind(b)),f.name=d,b[f.name]=f;else if(-1!==b.Ta.indexOf(f)){var h=new XMLHttpRequest,k={};h.open("GET",d,!0);h.addEventListener("readystatechange",function(){200===h.status&&4===h.readyState&&(k=JSON.parse(h.responseText),k.name=d,b[k.name]=k,k.frames?b.Na(k,d):b.R())});h.send()}else console.log("File type not recognized: "+d)})},Na:function(a,b){var d=this,f=b.replace(/[^\/]*$/,""),g=new Image;g.addEventListener("load",function(){d[f+a.Ua.image]={source:g,frame:{x:0,y:0,A:g.width,s:g.height}};Object.keys(a.frames).forEach(function(e){d[e]=a.frames[e];d[e].source=g});d.R()},!1);g.src=f+a.Ua.image},R:function(){this.loaded+=1;console.log(this.loaded);this.ra===this.loaded&&(this.loaded=this.ra=0,this.Da())}};c.jb=u;c.lb=q;void 0!==l&&l(c);return c}window.hb=n;l=function(B){function y(p){p.x+=p.Ca|0;p.y+=p.w|0}B.move=function(p){if(!1===p instanceof Array)y(p);else for(var v=0;v<p.length;v++)y(p[v])}};var w=n(800,600,x);w.start();var z,A,C,D,E,L=0,M=.1;function x(){w.backgroundColor="#008330";D=w.group();A=w.text("kicks: 0","12px Futura","black",20,20);A.x=5;A.y=5;D.b(A);z=w.La();z.Ra=!0;z.c=function(){L+=1;A.content="kicks: "+L;z.w=5<z.w?-1*z.w:z.w-5;z.Ca=.1*(z.x+z.width/2-w.S.x)};D.b(z);C=w.text("Game Over!","40px Futura","black",20,20);C.x=w.canvas.width/2-180;C.y=w.canvas.height/2-64;E=w.group(C);E.visible=!1;w.state=N}function N(){w.move(z);z.w+=M;z.y>w.canvas.height-z.o&&(w.state=O)}function O(){C.content="Game Over! Kicks: "+L;D.visible=!1;E.visible=!0};

var container = document.getElementById("js13k")
var cvs = document.getElementsByTagName("canvas");
container.appendChild(cvs[0]);