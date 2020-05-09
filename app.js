const express = require('express');
const cors = require('cors')
const fs = require('fs');
const app = express();

const server = require('http').createServer(app);
app.use(express.json());
app.use(cors())

app.use('/api/',require('./routes/lingvon.js'))

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))