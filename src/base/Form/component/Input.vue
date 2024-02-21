<script setup lang="ts">
import { ref } from 'vue'
import { type itemsRaw } from '../types'
import { watch } from 'vue';

interface Props {
  item: itemsRaw,
  value: any,
  label: string,
}
const emit = defineEmits(['change'])
const props = defineProps<Props>()
const val = ref(props.value)

watch(val, (v) => {
  if (props.item.inputType === 'number' && v !== '') {
    emit('change', props.label, +v)
    return
  }
  emit('change', props.label, v)
})
watch(() => props.value, (v) => {
  val.value = v
})
</script>

<template>
  <el-form-item
    :key="item.key"
    :prop="item.key"
    :label="item.label">
    <el-input
      v-model.trim="val"
      :type="item.inputType || 'text'"
      v-if="item.type === 'input'"
      :placeholder="item.placeholder"/>
  </el-form-item>
</template>