require('dotenv').config(); //載入 .env 的設定

const express = require('express');

const app = express();

app.use(express.static('public'));


// ***路由定義開始 ：BEGIN
app.get('/', (req, res)=>{
    res.send('<h2>Hello</h2>')
});

// ***路由定義結束 ：END




app.use((req, res)=>{
    res.status(404).send(`<h1>找不到頁面</h1>`)
})



let port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`啟動: ${port}`, new Date());
});