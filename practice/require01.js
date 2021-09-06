const {f1, f3} = require('./arrow-func');
//const f1 = require('arrow-func');  這樣的寫法是匯入內建套件，或是專案內的套件

const f2 = require(__dirname + '/arrow-func');
//上面兩個宣告得出的結果是一樣的，都是取得同一個檔案，只是f2的寫法比較傳統且明確

//會先找附檔名為js的檔案，然後再找JSON

console.log('2:', __dirname)
console.log(f1(9));
console.log(f3(10));


//因為 const {f1, f3} 與 const f2 是相同的，所以下面的寫法只是展開後再指定
console.log(f2.f1(5));
console.log(f2.f3(4));

