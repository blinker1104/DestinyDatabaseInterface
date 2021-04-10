const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');
const path = require('path');

let db_item = path.join(__dirname,'./itemDB.db');


//DB Object

class ItemDB {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    let q_i = `CREATE TABLE IF NOT EXISTS itemDB (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      hasIcon INTEGER NOT NULL,
      icon TEXT)`;
    return this.dao.run(q_i);
  }

  create(id, name, hasIcon, icon){
    return this.dao.run(
      `INSERT INTO itemDB (id, name, hasIcon, icon)
        VALUES (?, ?, ?, ?)`,
      [id, name, hasIcon, icon] );
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM itemDB WHERE id = ?`,
      [id] );
  }

  getAll() {
    return this.dao.all(`SELECT * FROM itemDB`);
  }
}

module.exports = ItemDB;


//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/