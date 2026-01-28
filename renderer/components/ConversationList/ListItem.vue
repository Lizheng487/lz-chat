<script setup lang="ts">
import type { Conversation } from '@common/types'
import { Icon as IconifyIcon } from '@iconify/vue'
import ItemTitle from './ItemTitle.vue';
import { CTX_KEY } from './constants';

const _PIN_ICON_SIZE = 16 as const

defineOptions({ name: 'ConversationListItem' });

const props = defineProps<Conversation>();
const emit = defineEmits(['updateTitle']);
const ctx = inject(CTX_KEY, void 0)
const isTitleEditable = computed(() => ctx?.editId.value === props.id)
function updateTitle(title: string) {
  emit('updateTitle', props.id, title)
}
</script>

<template>
  <div class="conversation-desc text-tx-secondary flex justify-between items-center text-sm loading-5">
    <span>
      {{ selectedModel }}
      <iconify-icon class="inline-block" v-if="pinned" icon="material-symbols:keep-rounded" :width="_PIN_ICON_SIZE"
        :height="_PIN_ICON_SIZE" />
    </span>
  </div>
  <div class="w-full flex items-center">
    <!-- 复选框 预留 -->
    <item-title :title="title" :is-editable="isTitleEditable" @update-title="updateTitle"></item-title>
  </div>
</template>