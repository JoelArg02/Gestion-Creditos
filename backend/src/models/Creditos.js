const db = require('../config/db');
const bcrypt = require('bcrypt');

const Creditos = {};


Creditos.getAllCreditos = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM creditos', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };