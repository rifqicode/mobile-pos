import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'pos.db', createFromLocation: 1});

module.exports = {
  findOneBy: async function (condition) {
        let keyCondition = Object.keys(condition).map((value, key) => {
            return `${value} = (?)`
        }).join(' AND ');

        let valueCondition = Object.values(condition);

        return new Promise((resolve, reject) => {
            db.transaction(function (txn) {
                txn.executeSql(
                    `SELECT id, product_id, amount, summary FROM cart WHERE ${keyCondition} LIMIT 1`,
                    valueCondition,
                    function (tx, results) {
                        resolve(results);
                    },
                    function(error) {
                        resolve(error)
                    }
                );
            });
        });
  },
  create: async function(data) {
    return new Promise((resolve, reject) => {
        let column = Object.keys(data).map((value, key) => {
            return value;
        }).join(', ');

        let value = Object.values(data);

        let valueLength = Object.keys(data).map((value, key) => {
            return '?'
        }).join(',')

        db.transaction(function (tx) {
            tx.executeSql(
                `INSERT INTO cart (${column}) VALUES (${valueLength})`,
                value,
                (tx, results) => {
                    resolve(results);
                },
                (error) => {
                    resolve(error);
                }
            );
        });
    });
  },
  update: async function(data, condition) {
    return new Promise((resolve, reject) => {
        let set = Object.keys(data).map((value, key) => {
            return `${value} =  ${data[value]}`
        }).join(', ');

        let where = Object.keys(condition).map((value, key) => {
            return `${value} =  ${condition[value]}`
        }).join(', ');
        
        db.transaction(function (tx) {
            tx.executeSql(
                `UPDATE cart SET ${set} WHERE ${where}`,
                [],
                (tx, results) => {
                    resolve(results);
                },
                (error) => {
                    resolve(error);
                }
            );
        });
    });
  },
  delete: async function(condition) {
        let where = Object.keys(condition).map((value, key) => {
            return `${value} = ${condition[value]}`
        }).join(', ');

        db.transaction(function (tx) {
            tx.executeSql(
                `DELETE FROM cart WHERE ${where}`,
                [],
                (tx, results) => {
                    resolve(results);
                },
                (error) => {
                    console.log(error);
                    resolve(error);
                }
            );
        });
  },
  reset: async function() {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM cart',
                [],
                (tx, results) => {
                    return results;
                },
            );
        });
  }
};