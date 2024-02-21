<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import Sortable from 'sortablejs';

interface paginationRaw {
  show: boolean,
  total: number,
  pages: {
    page: number,
    pageSize: number,
  }
}
// 配置element-plus el-table 属性
interface optionsRaw {
  // 是否selection默认true
  selection?: boolean,
  columns: columnsRaw[],
  draggable?: boolean,
  rowKey?: string,
  defaultExpandAll?: boolean,
  operations?: {
    label: string,
    show: boolean,
    width?: string,
  },
  pagination?: paginationRaw
}

interface columnsRaw {
  prop: string,
  label: string,
  width?: string,
  slot?: boolean
}

interface Props {
  data: any[],
  options: optionsRaw,
}
const props = defineProps<Props>()
const table = ref()
const emit = defineEmits(['selectionChange', 'sizeChange', 'currentChange', 'sortChange'])
const selectionChange = (val: any[]) => {
  emit('selectionChange', val)
}
const handleSizeChange = (val: number) => {
  emit('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('currentChange', val)
}

const tableData = JSON.parse(JSON.stringify(props.data))

onMounted(() => {
  const el = table.value.$el
  const tbody = el.querySelector('.el-table__body-wrapper tbody')
  if (!tbody || !props.options.draggable) return
  Sortable.create(tbody, {
    onEnd: ({ newIndex, oldIndex }) => {
      nextTick(() => {
        const movedItem = tableData.splice(oldIndex, 1)[0];
        tableData.splice(newIndex, 0, movedItem)
        emit('sortChange', tableData)
      })
    },
  });
})


</script>
<template>
  <div class="sc-table">
    <el-table
      class="table"
      ref="table"
      :data="data"
      stripe
      :row-key="options.rowKey ? options.rowKey : ''"
      :default-expand-all="options.defaultExpandAll"
      @selection-change="selectionChange"
      style="width: 100%; height: 100%;">
      <el-table-column
        v-if="options.selection"
        type="selection"
        width="55" />
      <template
        v-for="column in options.columns"
        :key="column.prop">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : ''">
          <template
            v-if="column.slot"
            #default="scope">
            <slot :name="column.prop" :scope="scope"></slot>
          </template>
        </el-table-column> 
      </template>
      <el-table-column
        v-if="options?.operations?.show"
        fixed="right"
        :label="options?.operations.label ? options.operations.label : '操作'"
        :width="options?.operations.width ? options.operations.width : '160'">
        <template #default="scope">
          <slot name="operations" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="options.pagination && options.pagination.show"
      class="pages">
      <div class="total">
        共 <span>{{ options.pagination.total }} </span> 条
      </div>
      <el-pagination
        :hide-on-single-page="options.pagination.total <= options.pagination.pages.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="options.pagination.pages.page"
        :page-size="options.pagination.pages.pageSize"
        :page-sizes="[10, 20, 50, 100, 1000]"
        layout="prev, pager, next, sizes, jumper"
        :total="options.pagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>
.sc-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .table {
    flex: 1;
  }
  .pages {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    & span {
      color: red;
    }
  }
  :deep(.el-table th .cell)  {
    font-size: var(--font-size-lg);
    color: #0174e9;
  }
}
</style>