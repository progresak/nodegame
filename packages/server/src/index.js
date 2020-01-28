const express = require('express');

const app = express();
const server = require('http').Server(app);

app.get('/*', (req, res) => res.send('Server without render'));
const port = process.env.PORT || 8888;
const ip = process.env.IP || '127.0.0.1';

server.listen(port, () => {
    console.log('Listening on ' + ip + ':' + port);
});
