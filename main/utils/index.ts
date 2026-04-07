import logManager from "@main/service/LogService";
import en from "@locales/en.json";
import zh from "@locales/zh.json";
import { configManager } from "@main/service/ConfigService";
import { CONFIG_KEYS } from "@common/constants";
import path from "node:path";

type MessageSchema = typeof zh;
const messages: Record<string, MessageSchema> = { zh, en };

export function createTranslator() {
  return (key?: string) => {
    if (!key) return void 0;
    try {
      const keys = key?.split(".");
      let result: any = messages[configManager.get(CONFIG_KEYS.LANGUAGE)];
      for (const _key of keys) {
        result = result[_key];
      }
      return result as string;
    } catch (error) {
      logManager.error("failed to translate key: ", key, error);
      return key;
    }
  };
}
let logo: string | void = void 0;
export function createLogo() {
  if (logo != null) {
    return logo;
  }
  logo = path.join(__dirname, "logo.ico");
  return logo;
}
