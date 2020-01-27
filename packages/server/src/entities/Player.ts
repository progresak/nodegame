import Entity from "./Entity";

const Player = ({ username, ...params }: {username: string, params: Array<any>}) => {
    const self = Entity(params);

    self.number = "" + Math.floor(10 * Math.random());
    self.pressingRight = false;
    self.pressingLeft =     false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.pressingAttack = false;
    self.mouseAngle = 0;
    self.maxSpeed = 10;

    self.hp = 20;
    self.hpMax = 20;
    self.score = 0;

    self.username = username;

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
    }

    self.shootBullet = function (angle) {
        Bullet({
            parent: self.id,
            angle: angle,
            x: self.x,
            y: self.y,
            map: self.map
        });
    }

    self.updateSpeed = function () {
        if (self.pressingRight) {
            self.speedX = self.maxSpeed
        } else if (self.pressingLeft) {
            self.speedX = -self.maxSpeed
        } else {
            self.speedX = 0;
        }
        if (self.pressingUp) {
            self.speedY = -self.maxSpeed
        } else if (self.pressingDown) {
            self.speedY = self.maxSpeed
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
    }

    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            score: self.score,
            map: self.map
        };
    }

    Player.list[self.id] = self;
    initPack.player.push(self.getInitPack())
    return self;
}
export default Player;
