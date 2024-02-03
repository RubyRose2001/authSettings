<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import ScButton from './component/Button.vue'
interface Props {
  title?: string,
  width?: string | number,
  modelValue: boolean,
}
const emit = defineEmits(['update:modelValue', 'confirm'])

const cancel = () => {
  emit('update:modelValue', false)
}
const confirm = () => {
  emit('confirm')
}
const props = defineProps<Props>()
const visible = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  if (val === visible.value) return
  visible.value = val
})
</script>
<template>
  <el-dialog
    class="sc-dialog"
    v-model="visible"
    :draggable="true"
    :width="width || '50%'"
    :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="header">
        <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
        <div>
          <slot name="btn" :close="close">
            <sc-button
              type="cancel"
              @click="cancel">
              取消
            </sc-button>
            <sc-button
              type="primary"
              @click="confirm">
              确定
            </sc-button>
          </slot>
        </div>
      </div>
    </template>
    <template #default>
      <div class="content">
        <slot></slot>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="less">
.sc-dialog {
  // max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .content {
    max-height: 65vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
