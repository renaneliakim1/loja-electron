const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Garante que a pasta 'database' exista
const dirDatabase = __dirname;
if (!fs.existsSync(dirDatabase)) {
  fs.mkdirSync(dirDatabase);
}

// Caminho correto para salvar dentro da pasta database
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

  atualizar(produto) {
    return new Promise((resolve, reject) => {
      const { id, nome, preco, estoque } = produto;
      db.run(`UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?`,
        [nome, preco, estoque, id],
        function (err) {
          if (err) reject(err);
          else resolve(true);
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
  },

  buscarPorId(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM produtos WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};
