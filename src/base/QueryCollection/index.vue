<script setup lang="ts">
import ScForm from '@/base/Form/index.vue'
import { type itemsRaw } from '@/base/Form/types'
import {
  Search,
} from '@element-plus/icons-vue'

interface Props {
  items: itemsRaw[],
  form: any
}
const emit = defineEmits(['search', 'change'])
// 派发搜索
const search = () => {
  emit('search', props.form)
}
// 表单改变
const change = (label: string, value: any) => {
  emit('change', label, value)
}
const props = defineProps<Props>()
</script>
<template>
  <div class="query_collection">
    <div class="form">
      <sc-form
        @change="change"
        :form=form
        :items="items">
      </sc-form>
    </div>
    <div class="operate">
      <el-button @click="search" type="primary" :icon="Search"  />
    </div>
  </div>
</template>
<style lang="less" scoped>
.query_collection {
  width: 100%;
  display: flex;
  .form {
    flex: 1;
  }
  .operate {
    box-sizing: border-box;
    padding: 0 10px;
  }
}
</style>