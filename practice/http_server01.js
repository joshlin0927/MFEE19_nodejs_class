const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(`<h1>Hola, ${req.url}</h1>`);
});

server.listen(3000); //一般用 3000 或 5000