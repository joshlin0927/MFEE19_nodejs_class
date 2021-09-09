const db = require('./../modules/connect-mysql');


db.query("SELECT * FROM address_book LIMIT 5")
    .then( ([result, fields]) => {
        console.log(result);
        process.exit();
    })
    .catch(ex=>{
        console.log(ex);
    })

