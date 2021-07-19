import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'pos.db', createFromLocation: 1});

module.exports = {
  findOneBy: async function (condition) {
    let keyCondition = Object.keys(condition).map((value, key) => {
        return `${value} = (?)`
    }).join(' AND ');

    let valueCondition = Object.values(condition);

    await db.transaction(function (txn) {
        txn.executeSql(
            `SELECT id, product_id, amount, summary FROM cart WHERE ${keyCondition} LIMIT 1`,
            valueCondition,
            function (tx, results) {
                return results;
            },
            function(error) {
                return error;
            }
        );
    });
  },
};