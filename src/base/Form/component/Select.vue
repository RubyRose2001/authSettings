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
    <el-select
      v-model="form[item.key]"
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