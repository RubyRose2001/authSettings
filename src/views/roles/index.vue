<script setup lang="ts">
import { ref } from 'vue'
import ScButton from '@/base/Button/index.vue'
import ScQueryCollection from '@/base/QueryCollection/index.vue'
import ScTable from '@/base/Table/index.vue'

const formObjFn = (items) => {
  return items.reduce((obj, item) => {
    obj[item.key] = item.value || ''
    return obj
  }, {})
}

const items = [
  {
    label: '角色名称',
    key: 'roleName',
    type: 'input',
    placeholder: '请输入角色名称',
    value: ''
  },
  {
    label: '角色状态',
    key: 'roleStatus',
    type: 'select',
    placeholder: '请选择部门状态',
    options: [
      {
        label: '正常',
        value: '1'
      },
      {
        label: '停用',
        value: '2'
      }
    ],
    value: ''
  },
]
const options = ref({
  selection: true,
  columns: [
    {
      label: '角色编号',
      prop: 'roleId',
    },
    {
      label: '角色名称',
      prop: 'roleName',
    },
    {
      label: '角色状态',
      prop: 'roleStatus',
    },
  ],
  operations: {
    label: '操作',
    show: true,
  },
  pagination: {
    show: true,
    total: 100,
    pages: {
      page: 1,
      pageSize: 10,
    }
  }
})
const form = ref(formObjFn(items))
const tableOptions = ref(options)
const data = ref([
  {
    roleId: '1',
    roleName: '2',
    roleStatus: '3',
  },
  {
    roleId: '2',
    roleName: '2',
    roleStatus: '3',
  },
  {
    roleId: '3',
    roleName: '2',
    roleStatus: '3',
  }
])

</script>
<template>
  <div class="settings_user">
    <!-- 查询 -->
    <div class="settings_user_search">
      <sc-query-collection :form=form :items="items"></sc-query-collection>
        <div class="btns">
          <sc-button
            class="btn">
            +新增
          </sc-button>
          <sc-button type="import" class="btn">导入</sc-button>
          <sc-button type="export" class="btn">导出</sc-button>
        </div>
    </div>
    <!-- 表格 -->
    <div class="settings_user_table">
      <sc-table
        :options="tableOptions"
        :data="data">
        <template #password="{ scope }">
          <span>{{ scope.row.password }} </span>
        </template>
        <template #operations="{ scope }">
          <el-link type="primary">修改</el-link>&nbsp;
          <el-link type="danger">删除</el-link>&nbsp;
        </template>
      </sc-table>
    </div>
  </div>
</template>
<style lang="less">
.settings_user {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  padding: 46px 30px 41px 30px;
  &_search {
    width: 100%;
    .btns {
      margin: 10px 0;
      .btn {
        margin-right: 20px;
      }
    }
  }
  &_table {
    flex: 1;
    overflow: hidden;
  }
}
</style>