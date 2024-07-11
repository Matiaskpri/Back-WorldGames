const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'matute07',
    database:'games_dt_wg'
});

connection.connect((err)=>{
    if(err){
        console.error('Error conectando a la base de datos', err);
        return;
    }
    console.log('conectado a la base de datos');

    connection.query('create database if not exists games_dt_wg',(err,results)=>{
        if (err){
            console.error('error creating database:', err);
          return;
        }
        console.log('database ensured.');
        connection.changeUser({database:'games_dt_wg'},(err)=>{
            if (err){
                console.error('error switching to games_dt_wg:', err);
                return;
            }
            const createTableQuery = `
            create table if not exists games(
            id int auto_increment primary key,
            titulo varchar(250) not null,
            consola varchar(250) not null,
            genero varchar(250) not null
            );
            `;
            connection.query(createTableQuery,(err,results)=>{
                if(err){
                    console.error('error creating table', err);
                    return;
                }
                console.log('table ensured');
            });
        });
    });
});

module.exports = connection;