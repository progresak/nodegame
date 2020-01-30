$(document).ready(() => {
    // var socket = io('https://backend-mmo.herokuapp.com/');
    var socket = io('http://localhost:8888');
    // logging
    console.log({ socket });
    var gameDiv = $('#gameDiv');
    var signDiv = $('#signDiv');
    var signDivUsername = $('#signDiv-username');
    var signDivPassword = $('#signDiv-password').hide();
    var signDivSignUp = $('#signDiv-up').hide();

    var signDivSignIn = $('#signDiv-in');
    signDivUsername.focus();

    var chatText = $('#chat-text');
    var chatForm = $('#chat-form');
    var chatFormLabel = $('#chat-form label');
    var chatInput = $('#chat-input');
    // scroll to bottom

    // /////////////////////////////////////
    /* PREPARED FOR MAGIC CAMERA */

    // /////////////////////////////////////

    $('#chat').draggable({
        containment: 'parent',
    });

    function updateScroll(el) {
        el.scrollTop = el.scrollHeight;
    }

    // only shift-up if at bottom
    function scrollAtBottom(el) {
        return (el.scrollTop + 5 >= (el.scrollHeight - el.offsetHeight));
    }

    $('#signForm').submit(e => {
        e.preventDefault();
        console.log('sdf');
        if (!signDivUsername.val()) {
            return;
        }
        $('body').addClass('game');
        socket.emit('signIn', {
            username: signDivUsername.val(),
            password: signDivPassword.val(),
        });
    });

    $('#changeMap').click(() => {
        changeMap();
    });

    signDivSignUp.click(() => {
        socket.emit('signUp', {
            username: signDivUsername.val(),
            password: signDivPassword.val(),
        });
    });

    var area = $('#message-area');
    socket.on('signInResponse', data => {
        if (data.success) {
            signDiv.hide();
            gameDiv.show();
        } else {
            area.html('Neplatné přihlášení');
        }
    });
    socket.on('signUpResponse', data => {
        if (data.success) {
            area.html('Registrace proběhla úspěšně');
        } else {
            area.html('Jméno již existuje');
        }
    });
    // Game

    var Img = {};
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

    var ctx = document.getElementById('ctx').getContext('2d');
    var ctxUi = document.getElementById('ctx-ui').getContext('2d');
    var WIDTH;
    var HEIGHT;
    var setDimension = function (w, h) {
        w -= 20;
        h -= 20;
        WIDTH = w;
        HEIGHT = h;
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        ctxUi.canvas.width = w;
        ctxUi.canvas.height = h;
        $('#ui').width(w);
        $('#ui').height(h);
    };
    var w = $(window).width();
    var h = $(window).height();
    setDimension(w, h);

    $(window).resize(function () {
        var w = $(this).width();
        var h = $(this).height();
        setDimension(w, h);
        socket.emit('setCanvas', {
            width: w,
            height: h,
        });
    });

    var Player = function (initPack) {
        var self = {};
        self.id = initPack.id;
        self.number = initPack.number;
        self.x = initPack.x;
        self.y = initPack.y;
        self.hp = initPack.hp;
        self.hpMax = initPack.hpMax;
        self.score = initPack.score;
        self.map = initPack.map;
        self.username = initPack.username;

        self.draw = function () {
            if (Player.list[selfId].map !== self.map) {
                return;
            }
            var x = self.x - Player.list[selfId].x + WIDTH / 2;
            var y = self.y - Player.list[selfId].y + HEIGHT / 2;
            var hpWidth = 70 * self.hp / self.hpMax;

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

            var height = Img.player.width;
            var width = Img.player.height;

            ctx.drawImage(Img.player,
                0, 0, Img.player.width, Img.player.height,
                x - width / 2, y - height / 2, width, height);
        };

        Player.list[self.id] = self;
        return self;
    };
    Player.list = {};

    function drawBorder(canvas, xPos, yPos, width, height, thickness = 1) {
        canvas.fillStyle = '#000';
        canvas.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }

    var Bullet = function (initPack) {
        var self = {};
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

        self.draw = function () {
            if (Player.list[selfId].map !== self.map) {
                return;
            }
            var { width } = Img.bullet;
            var { height } = Img.bullet;

            var x = self.x - Player.list[selfId].x + WIDTH / 2;
            var y = self.y - Player.list[selfId].y + HEIGHT / 2;
            ctx.drawImage(self.img, 0, 0, self.img.width, self.img.height,
                x - width / 2, y - height / 2, width, height);
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
            var p = Player.list[pack.id];
            if (p) {
                if (pack.x !== undefined) { p.x = pack.x; }
                if (pack.y !== undefined) { p.y = pack.y; }
                if (pack.hp !== undefined) { p.hp = pack.hp; }
                if (pack.score !== undefined) { p.score = pack.score; }
                if (pack.map !== undefined) { p.map = pack.map; }

                $('#position span').html('[' + p.x + ', ' + p.y + ']');
            }
        }
        for (var i = 0; i < data.bullet.length; i++) {
            var pack = data.bullet[i];
            var b = Bullet.list[data.bullet[i].id];
            if (b) {
                if (pack.x !== undefined) { b.x = pack.x; }
                if (pack.y !== undefined) { b.y = pack.y; }
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
    //  var lastRepaintTime=window.performance.now();
    //  function bg(canvas){
    //      var player = Player.list[selfId];
    //      var x = WIDTH/2 - player.x
    //      var y = HEIGHT/2 - player.y
    //
    //      var time = 100;
    //      var velocity = 100;
    //       var framegap = time - lastRepaintTime;
    //       lastRepaintTime = time;
    //       var translateX = velocity * (framegap / 1000);
    //       ctx.clearRect(0, 0, canvas.width, canvas.height);
    //       var pattern = ctx.createPattern(bgImage, "repeat");
    //       ctx.fillStyle = pattern;
    //       ctx.rect(x, y, WIDTH, HEIGHT);
    //       ctx.fill();
    //     }

    var render = function () {
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
    //
    // window.requestAnimFrame = (function(){
    //   return  window.requestAnimationFrame       ||
    //           window.webkitRequestAnimationFrame ||
    //           window.mozRequestAnimationFrame    ||
    //           function( callback ){
    //             window.setTimeout(callback, 1000 / 10);
    //           };
    // })();
    // (function animloop(){
    //     // place the rAF *before* the render() to assure as close to
    //     // 60fps with the setTimeout fallback.
    //   requestAnimFrame(animloop);
    //   render();
    // })();

    setInterval(render, 1000 / 25);

    var bgImage = new Image();
    bgImage.src = './img/escheresque_ste.png';
    var drawMap = function () {
        var player = Player.list[selfId];
        var x = WIDTH / 2 - player.x;
        var y = HEIGHT / 2 - player.y;
        ctx.drawImage(Img.map[player.map], x, y);
    };

    var changeMap = function () {
        socket.emit('changeMap');
    };

    var lastScore = null;
    var drawScore = function () {
        if (lastScore === Player.list[selfId].score) {
            return;
        }
        ctxUi.font = '30px Arial';
        ctxUi.clearRect(0, 0, WIDTH, HEIGHT);
        ctxUi.fillStyle = 'white';
        ctxUi.fillText(Player.list[selfId].score, 10, 30);
    };

    socket.on('addToChat', data => {
        var { before } = data;
        var colored = 'colored';
        if (before === undefined) {
            before = '';
            colored = '';
        }
        chatText.prepend('<p class="' + colored + '">' + before + ' <b class="mgsplayer">[' + data.player + ']</b>: ' + data.msg + '</p>');
    });

    socket.on('evalAnswer', data => {
        console.log(data);
    });

    $(document).on('click', '.mgsplayer', function () {
        var playername = $(this).html().slice(1, -1);
        chatForm.show();
        chatFormLabel.html(playername);
        chatInput.focus();
    });
    chatInput.keypress(event => {
        var parts = chatInput.val().split(' ');
        if (parts[0] == '/w' && parts.length == 2 && event.keyCode === 32) {
            chatFormLabel.html(parts[1]);
            chatInput.val('');
        }
    });
    chatForm.submit(e => {
        e.preventDefault();
        var komu = chatFormLabel.html();
        var parts = chatInput.val().split(' ');
        if (!chatInput.val() || (parts[0] == '/w' && parts.length == 2)) {
            chatInput.val('');
            return;
        }
        if (komu === 'Všem') {
            socket.emit('sendMsgToServer', chatInput.val());
        } else {
            socket.emit('sendPmToServer', {
                username: komu,
                message: chatInput.val(),
            });
            chatFormLabel.html('Všem');
        }
        chatInput.val('');
    });
    let attackActive = false;
    document.onkeydown = function (event) {
        if (!chatForm.is(':visible')) {
            if (event.keyCode === 68) { // d
                socket.emit('keyPress', {
                    inputId: 'right',
                    state: true,
                });
            }
            if (event.keyCode === 83) { // s
                socket.emit('keyPress', {
                    inputId: 'down',
                    state: true,
                });
            }
            if (event.keyCode === 65) { // a
                socket.emit('keyPress', {
                    inputId: 'left',
                    state: true,
                });
            }
            if (event.keyCode === 87) { // w
                socket.emit('keyPress', {
                    inputId: 'up',
                    state: true,
                });
            }
            if (event.keyCode === 32) { // spacebar
                attackActive = true;
                socket.emit('keyPress', {
                    inputId: 'nova',
                    state: true,
                });
            }
        } else {
            chatInput.focusout(function () {
                this.focus();
            });
        }
        if (event.keyCode === 13) { // enter
            if (!signDiv.is(':visible')) {
                chatForm.toggle();
                chatInput.focus();
            }
        }
    };

    document.onkeyup = function (event) {
        if (event.keyCode === 68) { // d
            socket.emit('keyPress', {
                inputId: 'right',
                state: false,
            });
        }
        if (event.keyCode === 83) { // s
            socket.emit('keyPress', {
                inputId: 'down',
                state: false,
            });
        }
        if (event.keyCode === 65) { // a
            socket.emit('keyPress', {
                inputId: 'left',
                state: false,
            });
        }
        if (event.keyCode === 87) { // w
            socket.emit('keyPress', {
                inputId: 'up',
                state: false,
            });
        }
        if (event.keyCode === 32) { // spacebar
            attackActive = false;
            socket.emit('keyPress', {
                inputId: 'nova',
                state: false,
            });
        }
    };

    document.onmousedown = function (event) {
        attackActive = true;
        socket.emit('keyPress', {
            inputId: 'attack',
            state: true,
        });
    };
    document.onmouseup = function (event) {
        attackActive = false;
        socket.emit('keyPress', {
            inputId: 'attack',
            state: false,
        });
    };
    document.onmousemove = function (event) {
        var x = -WIDTH / 2 + event.clientX - 8;
        var y = -HEIGHT / 2 + event.clientY - 8;
        var angle = Math.atan2(y, x) / Math.PI * 180;
        if (attackActive) {
            socket.emit('keyPress', {
                inputId: 'mouseAngle',
                state: angle,
            });
        }
    };
});
