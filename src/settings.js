import Store from "electron-store";

const store = new Store({
  name: "settings",
});

store.set("window", {
  widht: 800,
  height: 600,
  x: 0,
  y: 0,
});

export default store;
