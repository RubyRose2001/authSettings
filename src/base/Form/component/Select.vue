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

const change = (v: any) => {
  emit('change', props.label, v)
}
watch(() => props.value, (v) => {
  val.value = v
})
</script>

<template>
  <el-form-item
    :key="item.key"
    :prop="item.key"
    :label="item.label">
    <el-select
      v-model="val"
      @change="change"
      clearable
      :placeholder="item.placeholder">
      <el-option
        v-for="option in item.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"/>
    </el-select>
  </el-form-item>
</template>