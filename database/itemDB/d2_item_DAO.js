const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');
const path = require('path');

const d2_item = path.join(__dirname,'world_sql_content.db');


//Data Access Object
class D2ItemDAO {
  constructor(dbFilePath = d2_item) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err);
      } else {
        console.log('Connected to database');
      }
    })
  }

  run (sql, params =[]) {
    return new Promise( (resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if(err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve( {id: this.lastID} );
        }
      })
    });
  }
  get(q, params = []) {
    return new Promise( (resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

module.exports = D2ItemDAO;


//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/