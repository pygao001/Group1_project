import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'c0nygre',
    database: 'music_db',
});

export default connection;