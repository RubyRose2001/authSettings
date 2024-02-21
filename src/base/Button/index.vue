<script setup lang="ts">
import { computed } from 'vue'
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
  <div class="sc-button">
    <span :class="type">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.sc-button {
  width: 135px;
  height: 35px;
  border-radius: 6px;
  overflow: hidden;
  font-size: var(--font-size-text);
  cursor: pointer;
  display: inline-block;
  span {
    display: inline-block;
    width: 100%;
    line-height: 35px;
    text-align: center;
    &.default {
      background-color: #fff;
    }
    &.primary {
      background-color: #0174e9;
      color: #fff;
    }
    &.danger {
      background-color:  #ec808d;
      color: #fff;
    }
    &.import {
      background-color: rgba(1, 116, 233, 0.09);
      color: #0174e9;
    }
    &.export {
      background-color: rgba(1, 116, 233, 0.09);
      color: #0174e9
    }
    &.sort {
      background-color: rgba(149, 242, 4, 0.09);
      color: #63a103;
    }
  }
}
</style>