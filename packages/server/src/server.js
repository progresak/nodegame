const express = require('express');

const app = express();
const server = require('http').Server(app);

const fs = require('fs');

app.get('/*', (req, res) => res.send('Server without render'));

// app.use(express.static(__dirname + '/../client'));

// eslint-disable-next-line no-undef
// const port = process.env.PORT || 8888;
const port = 8887;
const ip = process.env.IP || '127.0.0.1';

server.listen(port, () => {
    console.log(`Server started on IP ${ip} and port ${server.address().port} :)`);
});

const SOCKET_LIST = {};
const DEBUG = false;
let canvasWidth = 500;
let canvasHeight = 500;

const Entity = ({ x = 250, y = 250, map = 'wow', id = null }) => {
    const self = {
        x,
        y,
        speedX: 0,
        speedY: 0,
        id,
        map,
    };

    self.update = () => {
        self.x += self.speedX;
        self.y += self.speedY;
    };

    self.getDistance = ({ x, y }) => Math.sqrt(Math.pow(self.x - x, 2) + Math.pow(self.y - y, 2));

    return self;
};

const Player = function (param) {
    const self = Entity(param);
    self.number = '' + Math.floor(10 * Math.random());
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.pressingAttack = false;
    self.mouseAngle = 0;
    self.maxSpeed = 10;

    self.hp = 20;
    self.hpMax = 20;
    self.score = 0;

    self.username = param.username;

    const super_update = self.update;
    self.update = function () {
        self.updateSpeed();
        super_update();

        if (self.pressingAttack) {
            self.shootBullet(self.mouseAngle);
        }

        if (self.pressingNova) {
            for (let i = 0; i < 360; i += 180) {
                self.shootBullet(self.mouseAngle + i);
            }
        }
    };

    self.shootBullet = function (angle) {
        Bullet({
            parent: self.id,
            angle,
            x: self.x,
            y: self.y,
            map: self.map,
        });
    };

    self.updateSpeed = function () {
        if (self.pressingRight) {
            self.speedX = self.maxSpeed;
        } else if (self.pressingLeft) {
            self.speedX = -self.maxSpeed;
        } else {
            self.speedX = 0;
        }
        if (self.pressingUp) {
            self.speedY = -self.maxSpeed;
        } else if (self.pressingDown) {
            self.speedY = self.maxSpeed;
        } else {
            self.speedY = 0;
        }
    };

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            hpMax: self.hpMax,
            score: self.score,
            map: self.map,
            username: self.username,
        };
    };

    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            score: self.score,
            map: self.map,
        };
    };

    Player.list[self.id] = self;
    initPack.player.push(self.getInitPack());
    return self;
};

Player.list = {};
Player.onConnect = function (socket, data) {
    const map = 'wow';
    for (const i in SOCKET_LIST) {
        SOCKET_LIST[i].emit('addToChat', {
            player: 'Server',
            msg: 'Hráč: [' + data.username + '] se připojil do hry',
        });
    }
    logText('Hráč: [' + data.username + '] se připojil do hry');

    const player = Player({
        id: socket.id,
        map,
        username: data.username,
    });

    socket.on('keyPress', data => {
        if (data.inputId === 'left') {
            player.pressingLeft = data.state;
        }
        if (data.inputId === 'right') {
            player.pressingRight = data.state;
        }
        if (data.inputId === 'up') {
            player.pressingUp = data.state;
        }
        if (data.inputId === 'down') {
            player.pressingDown = data.state;
        }
        if (data.inputId === 'attack') {
            player.pressingAttack = data.state;
        }
        if (data.inputId === 'nova') {
            player.pressingNova = data.state;
        }
        if (data.inputId === 'mouseAngle') {
            player.mouseAngle = data.state;
        }
    });
    socket.on('changeMap', data => {
        if (player.map === 'wow') {
            player.map = 'field';
        } else {
            player.map = 'wow';
        }
    });

    socket.emit('init', {
        selfId: socket.id,
        player: Player.getAllInitPack(),
        bullet: Bullet.getAllInitPack(),
    });

    socket.on('sendMsgToServer', data => {
        const p = Player.list[socket.id];
        logText(player.username + ': ' + data);
        for (const i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', {
                player: player.username,
                msg: data,
            });
        }
    });

    socket.on('sendPmToServer', data => {
        let recipientSocket = null;
        for (const i in Player.list) {
            if (Player.list[i].username === data.username) {
                recipientSocket = SOCKET_LIST[i];
            }
        }
        logText('Od ' + player.username + ' to ' + data.username + ': ' + data.message);

        if (recipientSocket === null) {
            socket.emit('addToChat', {
                player: 'Server',
                msg: 'Hráč: ' + data.username + ' není online',
            });
        } else {
            recipientSocket.emit('addToChat', {
                player: player.username,
                msg: data.message,
                before: 'Od',
            });
            socket.emit('addToChat', {
                player: data.username,
                msg: data.message,
                before: 'To',
            });
        }
    });
};

Player.getAllInitPack = function () {
    const players = [];
    for (const i in Player.list) {
        players.push(Player.list[i].getInitPack());
    }
    return players;
};

Player.onDisconnect = function (socket) {
    if (Player.list[socket.id] !== undefined) {
        for (const i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', {
                player: 'Server',
                msg: 'Hráč: [' + Player.list[socket.id].username + '] se odpojil ze hry',
            });
        }
        logText('Hráč: [' + Player.list[socket.id].username + '] se odpojil ze hry');
    }
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
};

Player.update = function () {
    const pack = [];
    for (const i in Player.list) {
        const player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
};

const Bullet = function (param) {
    const self = Entity(param);
    self.id = Math.random();
    self.angle = param.angle;
    self.speedX = Math.cos(param.angle / 180 * Math.PI) * 16;
    self.speedY = Math.sin(param.angle / 180 * Math.PI) * 16;
    self.parent = param.parent;
    self.timer = 0;
    self.maxSpeed = 100;
    self.toRemove = false;
    const super_update = self.update;
    self.update = function () {
        if (self.timer++ > 30) {
            self.toRemove = true;
        }
        super_update();

        for (const i in Player.list) {
            const p = Player.list[i];
            if (self.map === p.map && self.getDistance(p) < 32 && self.parent !== p.id) {
                p.hp -= 1;

                if (p.hp <= 0) {
                    const shooter = Player.list[self.parent];
                    if (shooter) {
                        shooter.score += 1;
                    }
                    p.hp = p.hpMax;
                    p.x = Math.random() * canvasWidth;
                    p.y = Math.random() * canvasHeight;
                }
                self.toRemove = true;
            }
        }
    };

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            map: self.map,
            parent: self.parent,
        };
    };
    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            parent: self.parent,
        };
    };

    Bullet.list[self.id] = self;
    initPack.bullet.push(self.getInitPack());
    return self;
};

Bullet.list = {};

Bullet.update = function () {
    const pack = [];
    for (const i in Bullet.list) {
        const bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove) {
            delete Bullet.list[i];
            removePack.bullet.push(bullet.id);
        } else {
            pack.push(bullet.getUpdatePack());
        }
    }

    return pack;
};

Bullet.getAllInitPack = function () {
    const bullets = [];
    for (const i in Bullet.list) {
        bullets.push(Bullet.list[i].getInitPack());
    }
    return bullets;
};

const isValidPassword = function (data, cb) {
    // db.account.find(data, function(err, res) {
    //     // cb((res.length > 0));
    //     cb(true);
    // });
    cb(true);
};
const isUsernameTaken = function (data, cb) {
    // db.account.find({username:data.username}, function(err, res) {
    //     cb((res.length > 0));
    // });
    cb(false);
};
const addUser = function (data, cb) {
    // db.account.insert(data, function(err) {
    //     cb();
    // });
    cb();
};

const io = require('socket.io')(server, {});

io.sockets.on('connection', socket => {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    socket.on('signIn', data => {
        isValidPassword(data, res => {
            if (res) {
                Player.onConnect(socket, data);
                socket.emit('signInResponse', {
                    success: true,
                });
            } else {
                socket.emit('signInResponse', {
                    success: false,
                });
            }
        });
    });

    socket.on('signUp', data => {
        isUsernameTaken(data, res => {
            if (!res) {
                addUser(data, () => {
                    socket.emit('signUpResponse', {
                        success: true,
                    });
                });
            } else {
                socket.emit('signUpResponse', {
                    success: false,
                });
            }
        });
    });

    socket.on('disconnect', () => {
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });
    socket.on('setCanvas', data => {
        canvasWidth = data.width;
        canvasHeight = data.height;
    });

    socket.on('evalServer', data => {
        if (!DEBUG) {
            return;
        }
        const res = eval(data);
        socket.emit('evalAnswer', res);
    });
});

const initPack = {
    player: [],
    bullet: [],
};
const removePack = {
    player: [],
    bullet: [],
};

setInterval(() => {
    const pack = {
        player: Player.update(),
        bullet: Bullet.update(),
    };

    for (const i in SOCKET_LIST) {
        const socket = SOCKET_LIST[i];
        socket.emit('init', initPack);
        socket.emit('update', pack);
        socket.emit('remove', removePack);
    }
    initPack.player = [];
    initPack.bullet = [];
    removePack.player = [];
    removePack.bullet = [];
}, 1000 / 25);

const logText = function (text) {
    fs.appendFile('logs/chat.log', '(' + new Date().toLocaleString() + '): ' + text + '\r\n', err => {
    });
};
