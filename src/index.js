import { app, BrowserWindow, Menu, shell } from "electron";
import { autoUpdater } from "electron-updater";
import settings from "./settings";
import menuTemplate from "./templates/menu";

let mainWindow;
let isQuitting = false;

function createMainWindow() {
  const windowState = settings.get("window");

  const window = new BrowserWindow({
    show: false,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 400,
    minHeight: 200,
    titleBarStyle: "hidden-inset",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  window.loadURL("https://trello.com/");

  window.on("close", (e) => {
    if (isQuitting && !mainWindow.isFullScreen()) {
      settings.set("window", mainWindow.getBounds());
    } else {
      e.preventDefault();
      app.quit();
    }
  });

  return window;
}

app.on("ready", () => {
  mainWindow = createMainWindow();
  const page = mainWindow.webContents;

  page.on("dom-ready", () => {
    mainWindow.show();
    autoUpdater.checkForUpdatesAndNotify();
  });

  page.on("new-window", (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  mainWindow.show();
});

app.on("before-quit", () => {
  isQuitting = true;
});
