<script setup lang="ts">
import { CTX_KEY } from './constants';
import NativeTooltip from '../NativeTooltip.vue';
import { NInput } from 'naive-ui';
interface ItemTitleProps {
  title: string;
  isEditable: boolean;
}

defineOptions({
  name: "ItemTitle",
});
const ctx = inject(CTX_KEY, void 0);
const props = defineProps<ItemTitleProps>();
const isTitleOverflow = ref(false);
const titleRef = useTemplateRef<HTMLElement>("titleRef");
const emit = defineEmits(["updateTitle"]);
const _title = ref(props.title);
function checkOverflow(element: HTMLElement | null): boolean {
  if (!element) return false;
  return element.scrollWidth > element.clientWidth;
}
function _updateOverflowStatus() {
  isTitleOverflow.value = checkOverflow(titleRef.value);
}
function updateTitle() {
  emit("updateTitle", _title.value);
}
const updateOberflowStatus = useDebounceFn(_updateOverflowStatus, 100);
onMounted(() => {
  updateOberflowStatus();
  window.addEventListener("resize", updateOberflowStatus);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateOberflowStatus);
});
watch([() => props.title, () => ctx?.width.value], () => updateOberflowStatus())
</script>
<template>
  <n-input v-if="isEditable" class="w-full" size="tiny" v-model:value="_title" @keydown.enter="updateTitle" />
  <h2 v-else ref="titleRef" class="conversation-title w-full text-tx-secondary font-semibold loading-5 truncate">
    <template v-if="isTitleOverflow">
      <NativeTooltip :content="title">
        {{ title }}
      </NativeTooltip>
    </template>
    <template v-else>
      {{ title }}
    </template>
  </h2>
</template>