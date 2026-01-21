import { IPC_EVENTS } from "@common/constants";
import log from "electron-log";
import * as path from "path";
import * as fs from "fs";
import { app, ipcMain } from "electron";
import { promisify } from "util";

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const unlinkAsync = promisify(fs.unlink);

class LogService {
  private static _instance: LogService;
  private LOG_RETENTION_DAYS = 7;
  private readonly CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;
  private constructor() {
    const logPath = path.join(app.getPath("userData"), "logs");
    try {
      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath, { recursive: true });
      }
    } catch (error) {
      this.error("failed to create log dir", error);
    }
    log.transports.file.resolvePathFn = () => {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      return path.join(logPath, `${formattedDate}.log`);
    };
    log.transports.file.format =
      "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
    log.transports.file.maxSize = 1024 * 1024 * 10;
    log.transports.file.level = "debug";
    log.transports.console.level =
      process.env.NODE_ENV === "development" ? "debug" : "info";
    this._setupIpcEvents();
    this._rewriteConsole();
    this.info("LogService initialized successfully");
    this._cleanupOldLogs();
    setInterval(() => this._cleanupOldLogs(), this.CLEANUP_INTERVAL_MS);
  }
  private async _cleanupOldLogs() {
    try {
      const logPath = path.join(app.getPath("userData"), "logs");
      if (!fs.existsSync(logPath)) return;
      const now = new Date();
      const expirationDate = new Date(
        now.getTime() - this.LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000
      );
      const files = await readdirAsync(logPath);
      let deletedCount = 0;
      for (const file of files) {
        if (!file.endsWith(".log")) continue;
        const filePath = path.join(logPath, file);
        try {
          const stats = await statAsync(filePath);
          if (stats.isFile() && stats.birthtime < expirationDate) {
            await unlinkAsync(filePath);
            deletedCount++;
          }
        } catch (error) {
          this.error(`failed to delete old log file ${filePath}`, error);
        }
      }
      if (deletedCount > 0) {
        this.info(`deleted ${deletedCount} old log files`, deletedCount);
      }
    } catch (error) {
      this.error(`failed to cleanup old log files`, error);
    }
  }
  private _setupIpcEvents() {
    ipcMain.on(IPC_EVENTS.LOG_DEBUG, (_e, message: string, ...meta: any[]) =>
      this.debug(message, ...meta)
    );
    ipcMain.on(IPC_EVENTS.LOG_ERROR, (_e, message: string, ...meta: any[]) =>
      this.error(message, ...meta)
    );
    // ipcMain.on(IPC_EVENTS.LOG_FATAL, (_e, message:string, ...meta: any[]) => this.fatal(message, ...meta))
    ipcMain.on(IPC_EVENTS.LOG_INFO, (_e, message: string, ...meta: any[]) =>
      this.info(message, ...meta)
    );
    ipcMain.on(IPC_EVENTS.LOG_WARN, (_e, message: string, ...meta: any[]) =>
      this.warn(message, ...meta)
    );
  }
  private _rewriteConsole() {
    console.debug = log.debug;
    console.error = log.error;
    console.info = log.info;
    console.warn = log.warn;
    console.log = log.info;
  }
  public static getInstance(): LogService {
    if (!this._instance) {
      this._instance = new LogService();
    }
    return this._instance;
  }
  public debug(message: string, ...meta: any[]): void {
    log.debug(message, ...meta);
  }
  public info(message: string, ...meta: any[]): void {
    log.info(message, ...meta);
  }
  public warn(message: string, ...meta: any[]): void {
    log.warn(message, ...meta);
  }
  public error(message: string, ...meta: any[]): void {
    log.error(message, ...meta);
  }
  public logUserOperation(
    operation: string,
    userId: string = "unknown",
    details: any = {}
  ): void {
    this.info(
      `User operation: ${operation}by ${userId}, details:${JSON.stringify(
        details
      )}`
    );
  }
}
export const logManager = LogService.getInstance();
export default logManager;
