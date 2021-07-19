import SQLite from 'react-native-sqlite-storage';

let conn = SQLite.openDatabase(
    {
        name: 'pos.db',
        location: 'default',
        createFromLocation : 1
    },
    () => {},
    error => {
        console.log(error);
    }
);

class Database  {
    getConnection() {
        return conn;
    }
}

module.exports = new Database();