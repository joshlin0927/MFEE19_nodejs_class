require('dotenv').config(); //載入 .env 的設定


const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(`<p>PORT: ${process.env.PORT}</p>`);
});
console.log(`<p>PORT: ${process.env.PORT}</p>`);

server.listen(process.env.PORT); //一般用 3000 或 5000