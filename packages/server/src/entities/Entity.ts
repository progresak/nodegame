const Entity = ({ x = 250, y = 250, map = 'wow', id = null}) => {
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

    self.getDistance = ({ x, y }) => {
        return Math.sqrt(Math.pow(self.x - x, 2) + Math.pow(self.y - y, 2));
    };

    return self;
};

export default Entity;

