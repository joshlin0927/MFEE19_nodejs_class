const jwt = require('jsonwebtoken');

// secretKey 網站保有，不能洩漏，洩漏出去，別人就能做其他應用
const secretKey = 'wijwefmlkdsfmpo3lk342';

(async ()=>{

    // 加密
    const token = await jwt.sign({name:"david"}, secretKey);

    console.log(token);
    
    // 要先執行並知道token是甚麼之後，才能夠使用

    const token1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGF2aWQiLCJpYXQiOjE2MzE2ODU3NjB9.lZRRnKTn7rMZf6y8tUp6HegXtixit-Bjd_CQUx_GRKA"

    // 解密
    const decoded = await jwt.verify(token1, secretKey);

    console.log(decoded);

})()