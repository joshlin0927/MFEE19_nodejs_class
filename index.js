require('dotenv').config(); //載入 .env 的設定

const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('<h2>Hello</h2>')
});

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`啟動: ${port}`, new Date());
});