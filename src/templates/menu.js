import { app } from "electron";

const template = [
  {
    label: "Application",
    submenu: [
      {
        label: "About Application",
        selector: "orderFrontStandardAboutPanel:",
      },
      { type: "separator" },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:",
      },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Developer Tools",
        accelerator: "CmdOrCtrl+alt+I",
        click: (menuItem, focusedBrowserWindow) => {
          const webContents = focusedBrowserWindow.webContents;

          if (webContents.isDevToolsOpened()) {
            webContents.closeDevTools();
          } else {
            webContents.openDevTools({ mode: "detach" });
          }
        },
      },
    ],
  },
];

export default template;
