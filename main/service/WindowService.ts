import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  type IpcMainEvent,
  IpcMainInvokeEvent,
} from "electron";
import path from "node:path";
import type { WindowNames } from "@common/types";
import { debounce } from "@common/utils";
import { IPC_EVENTS } from "@common/constants";
import logManager from "./LogService";

interface SizeOption {
  width: number;
  height: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}
const SHARED_WINDOW_OPTIONS = {
  titleBarStyle: "hidden",
  title: "LzChat",
  webPreferences: {
    nodeIntegration: false, //禁用Node.js集成
    contextIsolation: true, //启用上下文隔离
    sandbox: true, //启用沙箱模式
    backgroundThrottling: false, //禁用后台节流
    preload: path.join(__dirname, "preload.js"),
  },
} as BrowserWindowConstructorOptions;

class WindowService {
  private static _instance: WindowService;
  private constructor() {
    this._setupIpcEvents();
    logManager.info("WindowService initialized successfully.");
  }
  private _setupIpcEvents() {
    const handleCloseWindow = (e: IpcMainEvent) => {
      this.close(BrowserWindow.fromWebContents(e.sender));
    };
    const handleMinimizeWindow = (e: IpcMainEvent) => {
      BrowserWindow.fromWebContents(e.sender)?.minimize();
    };
    const handleMaximizeWindow = (e: IpcMainEvent) => {
      this.toggleMax(BrowserWindow.fromWebContents(e.sender));
    };
    const handleIsWindowMaximized = (e: IpcMainInvokeEvent) => {
      return BrowserWindow.fromWebContents(e.sender)?.isMaximized() ?? false;
    };
    ipcMain.on(IPC_EVENTS.CLOSE_WINDOW, handleCloseWindow);
    ipcMain.on(IPC_EVENTS.MINIMIZE_WINDOW, handleMinimizeWindow);
    ipcMain.on(IPC_EVENTS.MAXIMIZE_WINDOW, handleMaximizeWindow);
    ipcMain.handle(IPC_EVENTS.IS_WINDOW_MAXIMIZED, handleIsWindowMaximized);
  }
  public static getInstance(): WindowService {
    if (!this._instance) {
      this._instance = new WindowService();
    }
    return this._instance;
  }
  public create(name: WindowNames, size: SizeOption) {
    const window = new BrowserWindow({
      ...SHARED_WINDOW_OPTIONS,
      ...size,
    });
    this._setupWinLifecycle(window, name)._loadWindowTemplate(window, name);
    return window;
  }
  private _setupWinLifecycle(window: BrowserWindow, name: WindowNames) {
    const updateWinStatus = debounce(
      () =>
        !window?.isDestroyed() &&
        window?.webContents?.send(
          IPC_EVENTS.MAXIMIZE_WINDOW + "back",
          window?.isMaximized()
        ),
      80
    );
    window.once("closed", () => {
      window?.destroy();
      window?.removeListener("resize", updateWinStatus);
      logManager.info(`Window closed: ${name}`);
    });
    window.on("resize", updateWinStatus);
    return this;
  }
  private _loadWindowTemplate(window: BrowserWindow, name: WindowNames) {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      return window.loadURL(
        `${MAIN_WINDOW_VITE_DEV_SERVER_URL}${
          "/html/" + (name === "main" ? "" : name)
        }`
      );
    }
    window.loadFile(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/html/${
          name === "main" ? "index" : name
        }.html`
      )
    );
  }
  public close(target: BrowserWindow | void | null) {
    if (!target) return;
    target?.close();
  }
  public toggleMax(target: BrowserWindow | void | null) {
    if (!target) return;
    target.isMaximized() ? target.unmaximize() : target.maximize();
  }
}
export const windowManager = WindowService.getInstance();
export default windowManager;
