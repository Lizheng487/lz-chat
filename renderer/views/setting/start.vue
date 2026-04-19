<script setup lang="ts">
import { NCollapse, NCollapseItem, NCard, NText, NButton, useMessage, NGradientText } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const message = useMessage();
const { t } = useI18n();

function copyURL(url: string) {
  navigator.clipboard.writeText(url).then(() => {
    message.success(t('main.message.dialog.copySuccess'));
  });
}
</script>
<template>
  <div class="space-y-4">
    <NCard :title="t('settings.Instructions')" class="mb-4">
      <n-text :size="16" type="info">
        {{ t('settings.startGuide.description') }}
      </n-text>
      <n-gradient-text :size="18" type="success">
        {{ t('settings.startGuide.tryConversation') }}
      </n-gradient-text>
    </NCard>
    <NCard :title="t('settings.startGuide.apiKeyLinks')">
      <div class="space-y-2">
        <div class="flex items-center">
          <NButton type="primary" @click="copyURL('https://bigmodel.cn/')" text>
            智谱 AI (https://bigmodel.cn/)
          </NButton>
        </div>
        <div class="flex items-center">
          <NButton type="primary" @click="copyURL('https://platform.deepseek.com/')" text>
            DeepSeek (https://platform.deepseek.com/)
          </NButton>
        </div>
        <div class="flex items-center">
          <NButton type="primary" @click="copyURL('https://platform.openai.com')" text>
            OpenAI (https://platform.openai.com)
          </NButton>
        </div>
        <div class="flex items-center">
          <NButton type="primary" @click="copyURL('https://console.anthropic.com')" text>
            Anthropic (https://console.anthropic.com)
          </NButton>
        </div>
      </div>
    </NCard>
    <NCard :title="t('settings.startGuide.deepseekGuide')">
      <NCollapse>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step1')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step1Content') }}
            <NButton type="primary" @click="copyURL('https://platform.deepseek.com/')" text>
              https://platform.deepseek.com/
            </NButton>
          </NText>
        </NCollapseItem>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step2')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step2Content') }}
          </NText>
        </NCollapseItem>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step3')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step3Content') }}
          </NText>
        </NCollapseItem>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step4')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step4Content') }}
          </NText>
        </NCollapseItem>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step5')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step5Content') }}
          </NText>
        </NCollapseItem>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step6')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step6Content') }}
          </NText>
        </NCollapseItem>
        <NCollapseItem :title="t('settings.startGuide.deepseekSteps.step7')">
          <NText>
            {{ t('settings.startGuide.deepseekSteps.step7Content') }}
          </NText>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </div>
</template>