<script setup lang="ts">
import type { SelectValue } from '@renderer/types';
import MessageInput from '@renderer/components/MessageInput.vue';
import CreateConversation from '@renderer/components/CreateConversation.vue';

const message = ref('');
const provider = ref<SelectValue>();
const { t } = useI18n();

const providerId = computed(() => ((provider.value as string)?.split(':')[0] ?? ''))
const selectedModel = computed(() => ((provider.value as string)?.split(':')[1] ?? ''))
async function handleCreateConversation(create: (title: string) => Promise<number | void>, _message: string) {
  const id = await create(_message);
  if (!id) return

}
</script>
<template>
  <div class="main-view h-full w-full flex flex-col">
    <title-bar>
      <drag-region class="w-full" />
    </title-bar>
    <main class="flex-auto">
      <!-- <router-view /> -->
      <!-- main -->
      <create-conversation :providerId="providerId" :selectedModel="selectedModel" v-slot="{ create }">
        <message-input :placeholder="t('main.conversation.placeholder')" v-model:message="message"
          v-model:provider="provider" @send="handleCreateConversation(create, message)" />
      </create-conversation>
    </main>
  </div>
</template>
