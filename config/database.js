import mysql from "mysql2";

//create connection to database
const db = mysql.createPool({
    connectionLimit: 8,
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'bd852574d949e6',
    password: '01f1909d',
    database: 'heroku_3e3add89b0f9802'
});
// movie genre order: Sci-fi,Fantasy,Action,Thriller,Horror,Drama
export default db;