interface WindowApi {
  closeWindow: () => void;
  isWindowMaximized: () => Promise<boolean>;
  maximizeWindow: () => void;
  minimizeWindow: () => void;
  onWindowMaximized: (callback: (isMaximized: boolean) => void) => void;
}
declare interface Window {
  api: WindowApi;
}
