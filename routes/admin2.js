const express = require('express');

const router = express.Router();

router.get('/admin2/:p1?/:p2?', (req, res)=>{
    res.json({
        param: req.params,
    })
});

module.exports = router;