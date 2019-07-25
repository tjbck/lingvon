console.log('server is up!')

const express = require('express');
const app = express();
const server = app.listen(80);

app.use('/', express.static('docs'));

// Beta features (Not yet available on Github Page; Requires server)
const io = require('socket.io')(server)

app.get('/hi', (request, response) => {
    let name = request.query.name;
    response.send("hi " + name + "!");
});

app.get('/test', (req, res) => res.send('Got a GET request'))
app.post('/test', (req, res) => res.send('Got a POST request'))
