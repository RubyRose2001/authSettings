<script setup lang="ts">
import { defineProps } from 'vue'
import { type itemsRaw } from '../types'

interface Props {
  item: itemsRaw,
  form: any
}
defineProps<Props>()

</script>

<template>
  <el-form-item
    :key="item.key"
    :prop="item.key"
    :label="item.label">
    <el-radio-group
      v-model="form[item.key]"
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