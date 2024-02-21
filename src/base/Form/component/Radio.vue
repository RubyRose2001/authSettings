<script setup lang="ts">
import { ref } from 'vue'
import { type itemsRaw } from '../types'
import { watch } from 'vue';

interface Props {
  item: itemsRaw,
  value: string,
  label: string,
}
const emit = defineEmits(['change'])
const props = defineProps<Props>()
const val = ref(props.value)

watch(val, (v) => {
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
    <el-radio-group
      v-model="val"
      clearable
      :placeholder="item.placeholder">
      <el-radio
        v-for="option in item.options"
        :key="option.value"
        :label="option.value">
        {{ option.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>