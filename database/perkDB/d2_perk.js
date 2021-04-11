//DB Object

class D2PerkDB {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    return this.dao.all(`SELECT * FROM DestinySandboxPerkDefinition`);
  }
}

module.exports = D2PerkDB;


//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/