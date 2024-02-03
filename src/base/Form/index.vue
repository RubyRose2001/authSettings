<script setup lang="ts">
import { defineProps, reactive, ref, defineExpose } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import ScInput from './component/Input.vue'
import ScSelect from './component/Select.vue'
import ScRadio from './component/Radio.vue'
import { type itemsRaw } from './types'

interface Props {
  items: itemsRaw[],
  form: any,
  rules?: any,
}
const props = defineProps<Props>()

const ruleFormRef = ref<FormInstance>()

defineExpose({
  ruleFormRef
})
</script>
<template>
  <div>
    <el-form
      class="sc-form"
      ref="ruleFormRef"
      label-position="left"
      label-width="100px"
      :model="form"
      :rules="rules">
      <template
        v-for="item in items"
        :key="item.key">
        <div
          v-if="item.type != 'slot'"
          class="sc-item">
          <sc-input
            :form="form"
            :item="item"
            v-if="item.type == 'input'" />
          <sc-select
            :form="form"
            :item="item"
            v-else-if="item.type == 'select'" />
          <sc-radio
            :form="form"
            :item="item"
            v-else-if="item.type == 'radio'" />
        </div>
        <slot
          v-else
          :form="form"
          :name="item.key"
          :item="item">
        </slot>
      </template>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
// @item_width: 380px;
@item_width: 200px;
.sc-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  :deep(.el-form-item__content) {
    width: @item_width;
    margin-right: 20px;
  }
}
</style>
