// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  saveImage: (imageData) => ipcRenderer.invoke('save-image', imageData),
  checkOnlineStatus: () => ipcRenderer.send('check-online-status'), // Send request to check online status
  onOnlineStatus: (callback) => ipcRenderer.on('online-status', callback), // Listen for online status updates
});