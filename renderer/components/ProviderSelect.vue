<script setup lang="ts">
import { NSelect, NButton } from 'naive-ui';
import type { SelectValue } from '@renderer/types'
import { useProvidersStore } from '@renderer/stores/providers';
defineOptions({
  name: 'ProviderSelect'
})


const { t } = useI18n()
const providersStore = useProvidersStore()
const selectedProvider = defineModel<SelectValue>('modelValue')
const providerOptions = computed(() => providersStore.allProviders.map(item => ({
  label: item.title || item.name,
  type: 'group',
  key: item.id,
  children: item.models.map(model => ({
    label: model,
    value: `${item.id}:${model}`
  }))
})))
function openSettingWindow() {
  // openSettingWindow()
}
</script>
<template>
  <n-select size="small" v-model:value="selectedProvider" :options="providerOptions"
    :placeholder="t('main.conversation.selectModel')" style="width: 100%">
    <template #empty>
      <span class="text-tx-primary text-[0.7rem]">{{ t('main.conversation.goSettings') }}<n-button
          class="go-setting-btn" size="tiny" text @click="openSettingWindow">{{ t('main.conversation.settings')
          }}</n-button>{{
            t('main.conversation.addModel') }}</span>
    </template>
  </n-select>
</template>

<style scoped>
.go-setting-btn {
  padding: 0 0.5rem;
  font-weight: bold;
}
</style>