const fs = require('fs');

const data = [{
    name: 'David',
    age: 28,
},{
    name: 'Lara',
    age: 28,
}];

fs.writeFile(
    './data.json',
    JSON.stringify(data, null, 4),
    error => {
        if (error) {
            console.log('無法寫入檔案', error);
            process.exit(); // 結束程式
        }
        console.log('寫入成功');
    });


    /*
    RWXRWXRWX
    
    本機使用者//

    RW-R--R--
    */