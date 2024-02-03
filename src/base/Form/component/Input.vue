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
    <el-input
      v-model="form[item.key]"
      :type="item.inputType || 'text'"
      v-if="item.type === 'input'"
      :placeholder="item.placeholder"/>
  </el-form-item>
</template>