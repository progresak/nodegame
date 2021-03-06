const socket = io('http://localhost:8888');
// const socket = io('https://backend-mmo.herokuapp.com/');
window.socket = socket;

window.playGame = () => {
    const ctx = $('#ctx')[0].getContext('2d');
    const ctxUi = $('#ctx-ui')[0].getContext('2d');

    const Img = {};
    Img.player = new Image();
    Img.player.src = './img/avatar.png';
    Img.bulletEnemy = new Image();
    Img.bulletEnemy.src = './img/bulletEnemy.png';
    Img.bullet = new Image();
    Img.bullet.src = './img/bullet.png';
    Img.map = {};
    Img.map.wow = new Image();
    Img.map.wow.src = './img/map.jpg';
    Img.map.field = new Image();
    Img.map.field.src = './img/field.jpg';

    let WIDTH;
    let HEIGHT;
    window.setDimension = ({ width, height }) => {
        width -= 20;
        height -= 20;
        WIDTH = width;
        HEIGHT = height;
    };

    var Player = function(initPack) {
        const self = {};
        self.id = initPack.id;
        self.number = initPack.number;
        self.x = initPack.x;
        self.y = initPack.y;
        self.hp = initPack.hp;
        self.hpMax = initPack.hpMax;
        self.score = initPack.score;
        self.map = initPack.map;
        self.username = initPack.username;

        self.draw = function() {
            if (Player.list[selfId].map !== self.map) {
                return;
            }
            const x = self.x - Player.list[selfId].x + WIDTH / 2;
            const y = self.y - Player.list[selfId].y + HEIGHT / 2;
            const hpWidth = (70 * self.hp) / self.hpMax;

            ctxUi.fillStyle = 'white';
            ctxUi.font = '16px Arial';

            ctx.textAlign = 'center';
            ctxUi.textAlign = 'center';
            ctxUi.fillText(self.username, x, y - 45);

            drawBorder(ctx, x - hpWidth / 2, y - 38, hpWidth, 11);
            ctx.fillStyle = 'red';
            ctxUi.fillStyle = 'black';
            ctxUi.font = '12px Arial';
            ctxUi.fillText(self.hp, x, y - 28);
            ctx.fillRect(x - hpWidth / 2, y - 38, hpWidth, 11);

            const height = Img.player.width;
            const width = Img.player.height;

            ctx.drawImage(
                Img.player,
                0,
                0,
                Img.player.width,
                Img.player.height,
                x - width / 2,
                y - height / 2,
                width,
                height
            );
        };

        Player.list[self.id] = self;
        return self;
    };
    Player.list = {};

    function drawBorder(canvas, xPos, yPos, width, height, thickness = 1) {
        canvas.fillStyle = '#000';
        canvas.fillRect(
            xPos - thickness,
            yPos - thickness,
            width + thickness * 2,
            height + thickness * 2
        );
    }

    var Bullet = function(initPack) {
        const self = {};
        self.id = initPack.id;
        self.x = initPack.x;
        self.y = initPack.y;
        self.map = initPack.map;
        self.parent = initPack.parent;
        if (Player.list[selfId] !== undefined && self.parent === Player.list[selfId].id) {
            self.img = Img.bullet;
        } else {
            self.img = Img.bulletEnemy;
        }

        self.draw = function() {
            if (Player.list[selfId].map !== self.map) {
                return;
            }
            const { width } = Img.bullet;
            const { height } = Img.bullet;

            const x = self.x - Player.list[selfId].x + WIDTH / 2;
            const y = self.y - Player.list[selfId].y + HEIGHT / 2;
            ctx.drawImage(
                self.img,
                0,
                0,
                self.img.width,
                self.img.height,
                x - width / 2,
                y - height / 2,
                width,
                height
            );
        };
        Bullet.list[self.id] = self;

        return self;
    };
    Bullet.list = {};

    var selfId = null;
    socket.on('init', data => {
        if (data.selfId) {
            selfId = data.selfId;
        }
        // { player : [{id:123,number:'1',x:0,y:0},{id:1,number:'2',x:0,y:0}], bullet: []}
        for (var i = 0; i < data.player.length; i++) {
            new Player(data.player[i]);
        }
        for (var i = 0; i < data.bullet.length; i++) {
            new Bullet(data.bullet[i]);
        }
    });

    socket.on('update', data => {
        // { player : [{id:123,x:0,y:0},{id:1,x:0,y:0}], bullet: []}
        for (var i = 0; i < data.player.length; i++) {
            var pack = data.player[i];
            const p = Player.list[pack.id];
            if (p) {
                if (pack.x !== undefined) {
                    p.x = pack.x;
                }
                if (pack.y !== undefined) {
                    p.y = pack.y;
                }
                if (pack.hp !== undefined) {
                    p.hp = pack.hp;
                }
                if (pack.score !== undefined) {
                    p.score = pack.score;
                }
                if (pack.map !== undefined) {
                    p.map = pack.map;
                }

                $('#position span').html(`[${p.x}, ${p.y}]`);
            }
        }
        for (var i = 0; i < data.bullet.length; i++) {
            var pack = data.bullet[i];
            const b = Bullet.list[data.bullet[i].id];
            if (b) {
                if (pack.x !== undefined) {
                    b.x = pack.x;
                }
                if (pack.y !== undefined) {
                    b.y = pack.y;
                }
            }
        }
    });

    socket.on('remove', data => {
        // {player:[12323],bullet:[12323,123123]}
        for (var i = 0; i < data.player.length; i++) {
            delete Player.list[data.player[i]];
        }
        for (var i = 0; i < data.bullet.length; i++) {
            delete Bullet.list[data.bullet[i]];
        }
    });
    var bgImage = new Image();
    bgImage.src = './img/escheresque_ste.png';

    const render = function() {
        if (!selfId) {
            return;
        }
        // bg(ctx);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        // setBackgruond();

        drawMap();
        drawScore();
        // ctx.fillText('P', data.player.x, data.player.y);
        for (var i in Player.list) {
            Player.list[i].draw();
        }
        for (var i in Bullet.list) {
            Bullet.list[i].draw();
        }
    };

    window.requestAnimFrame = (function() {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 25);
            }
        );
    })();
    (function animloop() {
        // place the rAF *before* the render() to assure as close to
        // 60fps with the setTimeout fallback.
        requestAnimFrame(animloop);
        render();
    })();

    var bgImage = new Image();
    bgImage.src = './img/escheresque_ste.png';
    var drawMap = function() {
        const player = Player.list[selfId];
        const x = WIDTH / 2 - player.x;
        const y = HEIGHT / 2 - player.y;
        ctx.drawImage(Img.map[player.map], x, y);
    };

    const lastScore = null;
    var drawScore = function() {
        if (lastScore === Player.list[selfId].score) {
            return;
        }
        ctxUi.font = '30px Arial';
        ctxUi.clearRect(0, 0, WIDTH, HEIGHT);
        ctxUi.fillStyle = 'white';
        ctxUi.fillText(Player.list[selfId].score, 10, 30);
    };

    let attackActive = false;
    document.onkeydown = function(event) {
        if (!$('#chat-form').is(':visible')) {
            if (event.keyCode === 68) {
                // d
                socket.emit('keyPress', {
                    inputId: 'right',
                    state: true
                });
            }
            if (event.keyCode === 83) {
                // s
                socket.emit('keyPress', {
                    inputId: 'down',
                    state: true
                });
            }
            if (event.keyCode === 65) {
                // a
                socket.emit('keyPress', {
                    inputId: 'left',
                    state: true
                });
            }
            if (event.keyCode === 87) {
                // w
                socket.emit('keyPress', {
                    inputId: 'up',
                    state: true
                });
            }
            if (event.keyCode === 32) {
                // spacebar
                attackActive = true;
                socket.emit('keyPress', {
                    inputId: 'nova',
                    state: true
                });
            }
        }
    };

    document.onkeyup = function(event) {
        if (event.keyCode === 68) {
            // d
            socket.emit('keyPress', {
                inputId: 'right',
                state: false
            });
        }
        if (event.keyCode === 83) {
            // s
            socket.emit('keyPress', {
                inputId: 'down',
                state: false
            });
        }
        if (event.keyCode === 65) {
            // a
            socket.emit('keyPress', {
                inputId: 'left',
                state: false
            });
        }
        if (event.keyCode === 87) {
            // w
            socket.emit('keyPress', {
                inputId: 'up',
                state: false
            });
        }
        if (event.keyCode === 32) {
            // spacebar
            attackActive = false;
            socket.emit('keyPress', {
                inputId: 'nova',
                state: false
            });
        }
    };

    document.onmousedown = function(event) {
        attackActive = true;
        socket.emit('keyPress', {
            inputId: 'attack',
            state: true
        });
    };
    document.onmouseup = function(event) {
        attackActive = false;
        socket.emit('keyPress', {
            inputId: 'attack',
            state: false
        });
    };
    document.onmousemove = function(event) {
        const x = -WIDTH / 2 + event.clientX - 8;
        const y = -HEIGHT / 2 + event.clientY - 8;
        const angle = (Math.atan2(y, x) / Math.PI) * 180;
        if (attackActive) {
            socket.emit('keyPress', {
                inputId: 'mouseAngle',
                state: angle
            });
        }
    };
};
