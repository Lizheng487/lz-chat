import type { Provider, Conversation, Message } from "@common/types";
import Dexie, { type EntityTable } from "dexie";
import { logger } from "./utils/logger";
import { stringifyOpenAISetting } from "@common/utils";

export const providers: Provider[] = [
  {
    id: 1,
    name: "Claude",
    title: "Claude",
    models: ["claude-opus-4-6", "claude-sonnet-4-6"],
    openAISetting: stringifyOpenAISetting({
      baseURL: "https://api.anthropic.com/v1",
      apiKey: "",
    }),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    id: 2,
    name: "ChatGPT",
    title: "ChatGPT",
    models: ["gpt-4.1", "gpt-4.1-mini"],
    openAISetting: stringifyOpenAISetting({
      baseURL: "https://api.openai.com/v1",
      apiKey: "",
    }),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    id: 3,
    name: "deepseek",
    title: "深度求索 (DeepSeek)",
    models: ["deepseek-chat"],
    openAISetting: stringifyOpenAISetting({
      baseURL: "https://api.deepseek.com/v1",
      apiKey: "",
    }),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    id: 4,
    name: "bigmodel",
    title: "智谱AI",
    models: ["glm-4.7-flash"],
    openAISetting: stringifyOpenAISetting({
      baseURL: "https://open.bigmodel.cn/api/paas/v4",
      apiKey: "",
    }),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
];

export const dataBase = new Dexie("LzChatDB") as Dexie & {
  providers: EntityTable<Provider, "id">;
  conversations: EntityTable<Conversation, "id">;
  messages: EntityTable<Message, "id">;
};

dataBase.version(1).stores({
  providers: "++id,name",
  conversations: "++id,providerId",
  messages: "++id,conversationId",
});

export async function initProviders() {
  const count = await dataBase.providers.count();
  if (count === 0) {
    await dataBase.providers.bulkAdd(providers);
    logger.info("Providers data init successfully");
  }
}
