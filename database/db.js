const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'loja.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  init() {
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      preco REAL,
      estoque INTEGER
    )`);
  },

  listar() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM produtos`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  criar(produto) {
    return new Promise((resolve, reject) => {
      const { nome, preco, estoque } = produto;
      db.run(`INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)`,
        [nome, preco, estoque],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        });
    });
  },

  deletar(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM produtos WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
};
