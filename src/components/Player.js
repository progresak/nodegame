import React from 'react';

const Player = ({ctx, ctxUi}) => {

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


};

export default Player;

var Player = (initPack) => {
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

        ctx.textAlign = "center";
        ctxUi.textAlign = "center";
        ctxUi.fillText(self.username, x, y - 45);

        drawBorder(ctx, x - hpWidth / 2, y - 38, hpWidth, 11);
        ctx.fillStyle = 'red';
        ctxUi.fillStyle = 'black';
        ctxUi.font = '12px Arial';
        ctxUi.fillText(self.hp, x, y - 28)
        ctx.fillRect(x - hpWidth / 2, y - 38, hpWidth, 11);

        var height = Img.player.width;
        var width = Img.player.height;

        ctx.drawImage(Img.player,
            0, 0, Img.player.width, Img.player.height,
            x - width / 2, y - height / 2, width, height);
    }

    Player.list[self.id] = self;
    return self;
}