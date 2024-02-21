<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import ScInput from './component/Input.vue'
import ScSelect from './component/Select.vue'
import ScRadio from './component/Radio.vue'
import { type itemsRaw } from './types'
// xs < 768px
// sm >= 768px
// md >= 992px
// lg >= 1200px
// xl >= 1920px
interface Props {
  items: itemsRaw[],
  form: any,
  rules?: any,
  rowsNumber?: number,
}
const props = defineProps<Props>()

const ruleFormRef = ref<FormInstance>()
const span = 24 /  (props.rowsNumber || 3)
const emit = defineEmits(['change'])
const change = (label: string, value: any) => {
  emit('change', label, value)
}
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
      <el-row>
        <template
          v-for="item in items"
          :key="item.key">
          <el-col
            :span="span"
            v-if="item.type != 'slot'">
              <sc-input
                :label="item.key"
                :value="form[item.key]"
                @change="change"
                :item="item"
                v-if="item.type == 'input'" />
              <sc-select
                :label="item.key"
                :value="form[item.key]"
                @change="change"
                :item="item"
                v-else-if="item.type == 'select'" />
              <sc-radio
                :label="item.key"
                :value="form[item.key]"
                @change="change"
                :item="item"
                v-else-if="item.type == 'radio'" />
          </el-col>
          <slot
            v-else
            :name="item.key"
            :label="item.key"
            :value="item.value"
            :item="item">
          </slot>
        </template>
      </el-row>
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
  :deep(.el-row) {
    width: 100%;
  }
}
</style>
