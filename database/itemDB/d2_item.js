//DB Object

class D2ItemDB {
  constructor(dao) {
    console.log('D2 ITEM DB connection?');
    this.dao = dao;
  }

  getAll() {
    console.log('getALL!');
    return this.dao.all(`SELECT * FROM DestinyInventoryItemDefinition`);
  }
}

module.exports = D2ItemDB;


//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/