const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  produtos: {
    listar: () => ipcRenderer.invoke('produtos:listar'),
    criar: (produto) => ipcRenderer.invoke('produtos:criar', produto),
    atualizar: (produto) => ipcRenderer.invoke('produtos:atualizar', produto),
    deletar: (id) => ipcRenderer.invoke('produtos:deletar', id),
    buscarPorId: (id) => ipcRenderer.invoke('produtos:buscarPorId', id)
  }
});
