const f1 = a=>a*a;
const f3 = a=>a*a*a;

/*
console.log(f1(7));
console.log('1:', __dirname); // 與__DIR__是一樣的概念
console.log(f3(8));
*/


//如果要讓別人使用，一定要把要使用的東西做匯出，不然會無法使用
//module.exports = f1; //匯出

module.exports = {f1, f3}; // es6 寫法

//module.exports = {f1:f1, f3:f3}; // 傳統的寫法
