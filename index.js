require('dotenv').config(); //載入 .env 的設定

const {urlencoded} = require('express');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
/*
指定需要用的樣板引擎，這是預設位置，所以不需要再多一行設定，如果有改資料夾才需要用PDF裡的方式
*/

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));
// parse application/json
app.use(express.json());
/* 上面的兩個才算是Top-level Middleware*/

app.use('/', express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));


// ***路由定義開始 ：BEGIN

app.get('/', (req, res) => {

    res.render('home', {
        name: 'Josh'
    });

    // res.send('<h2>Hello</h2>')

    /*上面的兩種檔頭設定方式，一次只能有一種，send、end、render、json都是檔頭的設定觸發方式*/
});

app.get('/json-sales', (req, res) => {
    const sales = require('./data/sales');
    /* require 過的檔案，就不會再 require*/

    // console.log(sales);
    // res.json(sales);
    // res.send(sales);
    /*send會自動判斷現在的文件是甚麼格式*/

    res.render('json-sales', {
        sales
    });
    /* sales 要用大括號包成物件才能傳輸，如果沒有包，就只是陣列，會出問題 */
});

app.get('/try-qs', (req, res) => {
    res.json(req.query);
});


app.post('/try-post', (req, res) => {
    res.json(req.body);
});
// ***路由定義結束 ：END


app.use((req, res) => {
    res.status(404).send(`<h1>找不到頁面</h1>`)
})


let port = process.env.PORT || 3000;
const node_env = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    console.log(`NODE_ENV: ${node_env}`);
    console.log(`啟動: ${port}`, new Date());
});