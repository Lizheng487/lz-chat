type ThemeMode = "light" | "dark" | "system";
interface WindowApi {
  closeWindow: () => void;
  isWindowMaximized: () => Promise<boolean>;
  maximizeWindow: () => void;
  minimizeWindow: () => void;
  onWindowMaximized: (callback: (isMaximized: boolean) => void) => void;
  setThemeMode: (mode: ThemeMode) => Promise<boolean>;
  getThemeMode: () => Promise<ThemeMode>;
  isDarkTheme: () => Promise<boolean>;
  onSystenThemeChange: (callback: (isDark: boolean) => void) => void;
  logger: {
    debug: (message: string, ...meta: any[]) => void;
    info: (message: string, ...meta: any[]) => void;
    warn: (message: string, ...meta: any[]) => void;
    error: (message: string, ...meta: any[]) => void;
  };
}
declare interface Window {
  api: WindowApi;
}
