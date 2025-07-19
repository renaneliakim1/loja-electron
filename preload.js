const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  produtos: {
    listar: () => ipcRenderer.invoke('produtos:listar'),
    criar: (produto) => ipcRenderer.invoke('produtos:criar', produto),
    deletar: (id) => ipcRenderer.invoke('produtos:deletar', id),
  }
});
