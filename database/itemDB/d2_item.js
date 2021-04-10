//DB Object

class D2ItemDB {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    return this.dao.all(`SELECT * FROM DestinyInventoryItemDefinition`);
  }
}

module.exports = D2ItemDB;


//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/