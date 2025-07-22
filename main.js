const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database/db');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('./src/index.html');
}

app.whenReady().then(() => {
  db.init();
  createWindow();
});

ipcMain.handle('produtos:listar', () => db.listar());
ipcMain.handle('produtos:criar', (event, produto) => db.criar(produto));
ipcMain.handle('produtos:atualizar', (event, produto) => db.atualizar(produto));
ipcMain.handle('produtos:deletar', (event, id) => db.deletar(id));
ipcMain.handle('produtos:buscarPorId', (event, id) => db.buscarPorId(id));
