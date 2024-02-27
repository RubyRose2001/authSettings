<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'
import { formObjFn } from '@/utils/dataConversion'
import ScButton from '@/base/Button/index.vue'
import ScQueryCollection from '@/base/QueryCollection/index.vue'
import ScTable from '@/base/Table/index.vue'
import ScDialog from '@/base/Dialog/index.vue'
import ScForm from '@/base/Form/index.vue'

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
const addItems = [
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
    type: 'radio',
    value: '1',
    options: [
      {
        label: '正常',
        value: '1'
      },
      {
        label: '停用',
        value: '2'
      }
    ]
  },
  {
    label: '备注',
    key: 'remark',
    type: 'slot',
    placeholder: '请输入备注',
    value: ''
  },
  {
    label: '菜单权限',
    key: 'menuPermission',
    type: 'slot',
    placeholder: '请选择角色菜单',
    value: ''
  },
  {
    label: '数据范围',
    key: 'dataRange',
    type: 'select',
    placeholder: '请选择角色权限',
    value: '',
    options: [
      {
        label: '全部数据权限',
        value: '1'
      },
      {
        label: '自定义数据权限',
        value: '2'
      },
      {
        label: '本部门数据权限',
        value: '3'
      },
      {
        label: '本部门及以下数据权限',
        value: '4'
      },
      {
        label: '本人数据权限',
        value: '5'
      },
      {
        label: '本人参与流程数据权限',
        value: '6'
      },
      {
        label: '本人及本人参与流程数据权限',
        value: '7'
      }
    ]
  },
]
const options = {
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
  pagination: reactive({
    show: true,
    total: 100,
    pages: {
      page: 1,
      pageSize: 20,
    }
  })
}
const defaultProps = {
  children: 'children',
  label: 'label'
}
const TreeData = ref([
  {
    id: 1,
    label: '基础管理',
    children: [
      {
        id: 4,
        label: '公司信息表',
        children: [
          {
            id: 5,
            label: '公司信息表查看',
          },
          {
            id: 10,
            label: '公司信息表新增',
          },
          {
            id: 11,
            label: '公司信息表删除',
          },
          {
            id: 12,
            label: '公司信息表修改',
          },
        ]
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 6,
        label: '二级 2-1',
      },
      {
        id: 7,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 8,
        label: '二级 3-1',
      },
      {
        id: 9,
        label: '二级 3-2',
      },
    ],
  }
])
const form = ref(formObjFn(items))
const formAddRoles = ref(formObjFn(addItems))
const checkList = ref([])
const treeRef: Ref = ref(null);
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
const showAddRoles = ref(false)

const addRoles = () => {
  showAddRoles.value = true
}
const changeCheck = (val: any) => {
  if (val.includes('isShow')) {
    expandAll(TreeData.value)
  } else {
    collapseAll(TreeData.value)
  }
}
// 展开全部节点
const expandAll = (nodes) => {
  if (treeRef.value) {
    nodes.forEach(node => {
      if (node.children && node.children.length) {
        treeRef.value.store.nodesMap[node.id].expanded = true;
        expandAll(node.children)
      }
    });
  }
};

// 收缩全部节点
const collapseAll = (nodes) => {
  if (treeRef.value) {
    nodes.forEach(node => {
      if (node.children && node.children.length) {
        treeRef.value.store.nodesMap[node.id].expanded = false;
        expandAll(node.children)
      }
    });
  }
};
const change = (key: string, value) => {
  form.value[key] = value
}
const addRolesChange = (key: string, value) => {
  formAddRoles.value[key] = value
}
</script>
<template>
  <div class="settings_user">
    <!-- 查询 -->
    <div class="settings_user_search">
      <sc-query-collection
        @change="change"
        :form=form 
        :items="items">
      </sc-query-collection>
        <div class="btns">
          <sc-button
            @click="addRoles"
            class="btn">
            +新增1
          </sc-button>
          <!-- <sc-button type="import" class="btn">导入</sc-button>
          <sc-button type="export" class="btn">导出</sc-button> -->
        </div>
    </div>
    <!-- 表格 -->
    <div class="settings_user_table">
      <sc-table
        :options="options"
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
    <sc-dialog
      width="817"
      title="新增角色"
      v-model="showAddRoles">
      <sc-form
        :form="formAddRoles"
        :rowsNumber="2"
        @change="addRolesChange"
        :items="addItems">
        <!-- remark -->
        <template #remark="{ item }">
          <el-form-item
            class="mb-0"
            :key="item.key"
            :prop="item.key"
            :label="item.label">
            <el-input
              v-model="formAddRoles[item.key]"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }" />
          </el-form-item>
        </template>
        <!-- menuPermission -->
        <template #menuPermission="{ item }">
          <el-form-item
            class="mb-0"
            :key="item.key"
            :prop="item.key"
            :label="item.label">
            <div class="mb-0">
              <el-checkbox-group
                @change="changeCheck"
                v-model="checkList">
                <el-checkbox label="isShow">展开/折叠</el-checkbox>
                <el-checkbox label="isCheck">全选/全不选</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="mb-0">
              <div class="menuPermission">
                <el-tree
                  ref="treeRef"
                  :data="TreeData"
                  :props="defaultProps"
                  node-key="id"
                  show-checkbox>
                </el-tree>
              </div>
            </div>
          </el-form-item>
        </template>
      </sc-form>
    </sc-dialog>
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
  .mb-0 {
    width: 100%;
  }
  .menuPermission {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: scroll;
    border: 1px solid var(--sc-border-color);
  }
}
</style>