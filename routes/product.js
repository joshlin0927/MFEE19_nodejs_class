const express = require("express");
// const db = require('./../modules/connect-mysql');
const upload = require("./../modules/upload-images");
const Product = require("./../models/Product");

const router = express.Router();

// 列表
router.get("/", async (req, res) => {
  const output = {
    success: false,
    data: null,
  };
  output.data = await Product.findAll();
  if (output.data) {
    output.success = true;
  }
  res.json(output);
});

// 讀取單筆
router.get("/:id", async (req, res) => {
  const output = {
    success: false,
    data: null,
  };
  
  // 方法一
  //   const sql = "SELECT * FROM product WHERE sid=?";
  //   const [recordSet] = await db.query(sql, [req.params.id]);
  //   if(recordSet && recordSet.length===1){
  //       output.success = true;
  //       output.data = recordSet[0];
  //   }

  //方法二，搭配model
  output.data = await Product.findOne(req.params.id);
  if (output.data) {
    output.success = true;
  }
  res.json(output);
});

// 測試用
router.get("/test01/2", async (req, res) => {
  const p1 = await Product.findOne(2);
  p1.data.price *= 2;
  res.json(await p1.save());
});

// TODO: 管理的功能，需要登入後才能使用

//新增
router.post("/", async (req, res) => {
  const p1 = new Product(req.body);
  res.json(await p1.save());
});

// 修改
router.put("/:id", async (req, res) => {
  const output = {
    success: false,
    data: null,
  };
  const p1 = await Product.findOne(req.params.id);
  if (p1) {
    output.success = true;
    output.result = await p1.edit(req.body);
  }
  res.json(output);
});

//刪除
router.delete("/:id", async (req, res) => {
  const p1 = await Product.findOne(req.params.id);
  if (p1) {
    return res.json(await p1.remove());
  }
  res.json({info:'item not found'});
});

module.exports = router;
