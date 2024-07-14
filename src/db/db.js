const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

connection.connect((err)=>{
    if(err){
        console.error('Error conectando a la base de datos', err);
        return;
    }
    console.log('conectado a la base de datos');

    connection.query('create database if not exists matiaskpri_worldgames',(err,results)=>{
        if (err){
            console.error('error creating database:', err);
          return;
        }
        console.log('database ensured.');
        connection.changeUser({database:'matiaskpri_worldgames'},(err)=>{
            if (err){
                console.error('error switching to matiaskpri_worldgames:', err);
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