<script setup lang="ts">
import { NCollapse, NCollapseItem, NCard, NText, NButton, useMessage, NGradientText } from 'naive-ui';

const message = useMessage();
const { t } = useI18n()

function copyURL(url: string) {
  navigator.clipboard.writeText(url).then(() => {
    message.success(t('main.message.dialog.copySuccess'));
  });
}
</script>
<template>
  <div class="space-y-4">
    <NCard title="使用说明" class="mb-4">
      <n-text :size="16" type="info">
        本软件免费提供 智谱AI 的GLM大模型的 API Key 。 模型配置 -> 智谱AI 右侧启用按钮，即可使用。
      </n-text>
      <n-gradient-text :size="18" type="success">
        快去尝试你的第一次对话吧！
      </n-gradient-text>
    </NCard>
    <NCard title="DeepSeek API Key 申请教程">
      <NCollapse>
        <NCollapseItem title="Step 1: 访问 DeepSeek 平台">
          <NText>
            打开浏览器，访问
            <NButton type="primary" @click="copyURL('https://platform.deepseek.com/')" text>
              https://platform.deepseek.com/
            </NButton>
          </NText>
        </NCollapseItem>
        <NCollapseItem title="Step 2: 注册/登录账号">
          <NText>
            点击右上角的注册/登录按钮，按照提示完成账号注册或登录
          </NText>
        </NCollapseItem>
        <NCollapseItem title="Step 3: 进入 API Key 管理页面">
          <NText>
            登录后，在左侧导航栏中找到 "API Key" 或 "密钥管理" 选项，点击进入
          </NText>
        </NCollapseItem>
        <NCollapseItem title="Step 4: 创建新的 API Key">
          <NText>
            点击 "创建 API Key" 或类似按钮，为你的 API Key 命名，然后点击确认
          </NText>
        </NCollapseItem>
        <NCollapseItem title="Step 5: 复制 API Key">
          <NText>
            创建成功后，系统会显示你的 API Key，请立即复制并保存，因为它只会显示一次
          </NText>
        </NCollapseItem>
        <NCollapseItem title="Step 6: 在本软件中配置">
          <NText>
            进入本软件的模型配置页面，在 DeepSeek 提供商的 API 密钥 输入框中粘贴你刚才复制的 API Key，然后点击右侧的按钮启动。
          </NText>
        </NCollapseItem>
        <NCollapseItem title="Step 7: 开始AI对话">
          <NText>
            此时首页的大模型即可选择DeepSeek，与大模型进行对话。
          </NText>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </div>
</template>