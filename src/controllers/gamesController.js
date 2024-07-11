const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db/db');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const pathImage = path.join(__dirname, 'games');
      console.log('Ruta de destino:', pathImage);
      cb(null, pathImage);
    },
    filename: function(req, file, cb) {
      const fileNewUser = `img-user-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileNewUser);
    }
  });
  
  const upload = multer({ storage: storage }).single('image');

const getAllGames = (req, res) => {
  const sql = 'SELECT * FROM games';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};


const getGameId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM games WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};


const createGame = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error('Error al subir la imagen:', err);
        return res.status(500).json({ error: 'Error al subir la imagen' });
      }
  
      const { titulo, consola, genero, href } = req.body;
      const imagePath = req.file ? req.file.path : null; 
  
      
      if (!imagePath) {
        return res.status(400).json({ error: 'No se subió ninguna imagen' });
      }
  
      const sql = 'INSERT INTO games (titulo, consola, genero, href, image) VALUES (?, ?, ?, ?, ?)';
      const values = [titulo, consola, genero, href, imagePath];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al insertar el juego:', err);
        
          if (imagePath) {
            fs.unlinkSync(imagePath);
          }
          return res.status(500).json({ error: 'Error al insertar el juego en la base de datos' });
        }
        res.json({ message: 'Juego creado', gameid: result.insertId });
      });
    });
  };
  


const updateGame = (req, res) => {
  const { id } = req.params;
  const { titulo, consola, genero } = req.body;
  const sql = 'UPDATE games SET titulo = ?, consola = ?, genero = ? WHERE id = ?';
  db.query(sql, [titulo, consola, genero, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Game actualizado' });
  });
};


const deleteGame = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM games WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Game borrado' });
  });
};

module.exports = {
  getAllGames,
  getGameId,
  createGame,
  updateGame,
  deleteGame
};
