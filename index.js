require('dotenv').config(); // 載入 .env 的設定

const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const session = require('express-session');
const moment = require('moment-timezone');
const upload = multer({
    dest: 'tmp_uploads'
})
const uploadImg = require('./modules/upload-images')
const uploadVid = require('./modules/upload-videos')
const db = require('./modules/connect-mysql')



const app = express();

app.set('view engine', 'ejs');

/*
指定需要用的樣板引擎，這是預設位置，所以不需要再多一行設定，如果有改資料夾才需要用PDF裡的方式
*/

app.use(session({
    name: 'mySessionId',
    saveUninitialized: false,
    resave: false,
    secret: '54weewf254ewf4874gew231',
    cookie: {
        maxAge: 1200000, //20分鐘，這裡寫得是毫秒
    }
}));

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

app.use((req, res, next) => {
    // res.send('middleware'); 不要在這裡用send，會出錯
    res.locals.title = '小心的網站';
    // 這裡可以設定所有網站的title
    next();
})


// ***路由定義開始 ：BEGIN

app.get('/', (req, res) => {

    res.locals.title = '首頁-' + res.locals.title;
    // 各個頁面可以再做更改
    // 也可以用來判斷會員是否有登入，或者是會員身分

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

app.get('/try-post-form', (req, res) => {
    res.render('try-post-form', {
        email: '',
        password: ''
    });
});

app.post('/try-post-form', (req, res) => {
    res.render('try-post-form', req.body);
});

app.get('/pending', (req, res) => {});


// upload.single('這裡填寫對應的欄位')，要寫await就要寫async
app.post('/try-upload', upload.single('avatar'), async (req, res) => {
    if (req.file && req.file.mimetype === 'image/jpeg') {
        try {
            await fs.rename(req.file.path, __dirname + '/public/img/' + req.file.originalname);
            // 有await的時候可以用try catch，因為是一行行執行下來的

            return res.json({
                success: true,
                filename: req.file.originalname
            });
        } catch (ex) {
            return res.json({
                success: false,
                error: '無法存檔'
            });
        }

    } else {
        await fs.unlink(req.file.path) // 刪除暫存檔
        res.json({
            success: false,
            error: '格式不對'
        });
    }

})

app.post('/try-upload2', uploadImg.single('avatar'), async (req, res) => {
    res.json(req.file);
})

app.post('/try-upload3', uploadImg.array('photo', 10), async (req, res) => {
    res.json(req.files);
})

app.post('/try-upload4', uploadVid.single('video'), async (req, res) => {
    res.json(req.file);
})

app.get('/my-params1/:action?/:id(\\d+)?', (req, res) => {
    //id後面寫的就是regexp，如果超出規範就不能讀取頁面
    res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
    //在網址輸入：http://localhost:3001/m/0935-123-456?a=1，問號後面的是queryString
    let u = req.url.split('?')[0];
    u = u.slice(3);
    u = u.split('-').join('');

    res.json({
        url: req.url,
        mobile: u
    });
});

app.use(require('./routes/admin2'));
app.use('/admin3', require('./routes/admin3'));

//admin2、admin3，兩者的路徑並不一樣，所以可以用作檔案版本管理

//合併寫路徑進來的時後都會用app，如果要分開管理時就會用router，router都會寫在分開的檔案哩，在這裡的例子是admin

app.get('/try-sess', (req, res) => {
    req.session.myVar = req.session.myVar || 0;
    req.session.myVar++;
    res.json(req.session);
})

app.get('/try-moment', (req, res) => {
    const fm = 'YYYY-MM-DD HH:mm:ss';

    res.json({
        "m1-local": moment().format(fm),
        "m2-London": moment().tz('Europe/London').format(fm),
        "m3-Tokyo": moment().tz('Asia/Tokyo').format(fm),
    });
});

app.get('/try-db', async (req, res)=>{
    const [result]= await db.query('SELECT * FROM address_book WHERE `name` LIKE ?', ['%酷寶%'])
    res.json(result);
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