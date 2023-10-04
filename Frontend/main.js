const electron = require("electron");
// Módulo para controlar a vida da aplicação.
const app = electron.app;
// Módulo para criar uma janela de browser nativa.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

// Mantém uma referência global do objeto da janela. Caso não o faças, a janela
// fechará automaticamente assim que o objeto JavaScript for recolhido para o lixo.
let mainWindow;

function createWindow() {
  // Criar a janela do browser.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // e carregar o index.html da aplicação.
  mainWindow.loadURL("http://localhost:3001");

  // Emitido quando a janela é fechada.
  mainWindow.on("closed", function () {
    // Desreferenciar o objeto da janela, geralmente irás armazenar as janelas
    // em um array caso a tua aplicação suporte várias janelas, esta é a altura
    // em que deves apagar o elemento correspondente.
    mainWindow = null;
  });
}

// Este método será chamado quando o Electron tiver terminado
// a inicialização e estiver pronto para criar janelas de browser.
// Algumas APIs podem ser utilizadas apenas após este evento ocorrer.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
});

// Saír assim que todas as janelas estejam fechadas.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
