<script setup lang="ts">
import { defineProps, computed } from 'vue'
interface Props {
  type?: string,
  text?: string,
}
const props = defineProps<Props>()
const type = computed(() => {
  return props.type || 'primary'
})
</script>
<template>
  <div class="sc-dialog-button">
    <span :class="type">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.sc-dialog-button {
  width: 92px;
  height: 32px;
  border-radius: 5px;
  margin-left: 10px;
  font-size: var(--font-size-text);
  cursor: pointer;
  display: inline-block;
  span {
    width: 100%;
    line-height: 32px;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 5px;
    &.primary {
      background-color: #0174e9;
      color: #fff;
    }
    &.cancel {
      background-color: rgba(1, 116, 233, 0.15);
      color: #0174e9;
      border: 1px solid #0174e9;
    }
  }
}
</style>