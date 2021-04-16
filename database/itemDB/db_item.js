//DB Object

class ItemDB {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    let q = `CREATE TABLE IF NOT EXISTS itemDB (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT,
      hasIcon INTEGER NOT NULL,
      icon TEXT)`;
    return this.dao.run(q);
  }

  dropTable() {
    let q = `DROP TABLE IF EXISTS itemDB`;
    return this.dao.run(q);
  }

  init() {
    console.log('ITEM DB - init');
    return this.dropTable()
      .then(()=>{
        return this.createTable();
      });
  }

  create(id, name, type, hasIcon, icon){
    return this.dao.run(
      `INSERT INTO itemDB (id, name, type, hasIcon, icon)
        VALUES (?, ?, ?, ?, ?)`,
      [id, name, type, hasIcon, icon] );
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM itemDB WHERE id = ?`,
      id );
  }

  getByIds(ids) {
    // return this.dao.all(`SELECT * FROM itemDB WHERE id IN (${ids.join()})`);
    return this.dao.all(`SELECT * FROM itemDB WHERE id IN (${ids})`);
  }

  getAll() {
    return this.dao.all(`SELECT * FROM itemDB`);
  }

}

module.exports = ItemDB;


//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/