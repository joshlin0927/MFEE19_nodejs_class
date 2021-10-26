const db = require("./../modules/connect-mysql");

const tableName = "products";
const pkField = "sid";

class Product {
  constructor(defaultObj = {}) {
    // `sid`, `author`, `bookname`, `category_sid`, `book_id`, `publish_date`, `pages`, `price`, `isbn`, `on_sale`, `introduction`
    this.data = defaultObj;
  }

  async findAll(){
    const sql = `SELECT * FROM ${tableName}`;
    const [r] = await db.query(sql, [this])
    return r;
  }

  /* 讀取單筆資料 */
  static async findOne(pk = 0) {
    const sql = `SELECT * FROM ${tableName} WHERE ${pkField}=?`;
    const [rs] = await db.query(sql, [pk]);
    if (rs && rs.length === 1) {
      // return rs[0];
      return new Product(rs[0]);
    }
    return null;
  }
  toJSON() {
    return this.data;
  }
  toString() {
    return JSON.stringify(this.data, null, 4);
  }

  // 新增
  async save() {
    // 若有 PK 則表示要做修改
    if (this.data.sid) {
      const sid = this.data.sid;
      const data = { ...this.data };
      delete data.sid;
      const sql = `UPDATE ${tableName} SET ? WHERE ${pkField}=?`;
      const [r] = await db.query(sql, [data, sid]);
      return r;
    } else {
      // 沒有 PK 則表示要做新增
      const sql = `INSERT INTO ${tableName} SET ?`;
      const [r] = await db.query(sql, [this.data]);
      return r;
    }
  }

  // 修改
  async edit(obj = {}) {
    // this.data = defaultObj;
    for (let i in this.data) {
      if (i === pkField) continue;
      if (obj[i]) {
        this.data[i] = obj[i];
      }
    }
    return await this.save();
  }

  // 刪除
  async remove() {
    const sql = `DELETE FROM ${tableName} WHERE ${pkField}=?`;
    const [r] = await db.query(sql, [this.data.sid]);
    return r;
  }
}

module.exports = Product;
