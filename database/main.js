const { ipcMain } = require('electron');
const db = require('./database/db');
const path = require('path');

// faz o electron recarregar automaticamente apos alterações 
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

ipcMain.handle('produtos:listar', () => {
  return new Promise((resolve, reject) => {
    db.listar((err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

ipcMain.handle('produtos:criar', (event, produto) => {
  return new Promise((resolve, reject) => {
    db.criar(produto, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
});

ipcMain.handle('produtos:atualizar', (event, produto) => {
  return new Promise((resolve, reject) => {
    db.atualizar(produto, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
});

ipcMain.handle('produtos:deletar', (event, id) => {
  return new Promise((resolve, reject) => {
    db.deletar(id, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
});
