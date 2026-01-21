export enum IPC_EVENTS {
  CLOSE_WINDOW = "close-window",
  MINIMIZE_WINDOW = "minimize-window",
  MAXIMIZE_WINDOW = "maximize-window",
  IS_WINDOW_MAXIMIZED = "is-window-maximized",
  SET_THEME_MODE = "set-theme-mode",
  GET_THEME_MODE = "get-theme-mode",
  IS_DARK_THEME = "is-dark-theme",
  SHOW_CONTEXT_MENU = "show-context-menu",
  LOG_DEBUG = "log-debug",
  LOG_ERROR = "log-error",
  LOG_INFO = "log-info",
  LOG_WARN = "log-warn",
  LOG_FATAL = "log-fatal",
  THEME_MODE_UPDATED = "theme-mode-updated",
}
export enum WINDOW_NAMES {
  MAIN = "main",
  SETTING = "setting",
  DIALOG = "dialog",
}
export const MAIN_WIN_SIZE = {
  width: 1024,
  height: 800,
  minWidth: 1024,
  minHeight: 800,
} as const;
export enum MENU_IDS {
  CONVERSATION_ITEM = "conversation-item",
  CONVERSATION_LIST = "conversation-list",
  MESSAGE_ITEM = "message-item",
}
export enum CONVERSATION_ITEM_MENU_IDS {
  PIN = "pin",
  RENAME = "rename",
  DEL = "del",
}
export enum CONVERSATION_LIST_MENU_IDS {
  NEW_CONVERSATION = "new-conversation",
  SORT_BY = "sort-by",
  SORT_BY_CREATE_TIME = "sort-by-create-time",
  SORT_BY_UPDATE_TIME = "sort-by-update-time",
  SORT_BY_NAME = "sort-by-name",
  SORT_BY_MODEL = "sort-by-model",
  SORT_ASCENDING = "sort-ascending",
  SORT_DESCENDING = "sort-descending",
  BATCH_OPERATIONS = "batch-operations",
}
