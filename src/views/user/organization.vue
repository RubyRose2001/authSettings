<script setup lang="ts">
import { ref, type Ref, reactive } from 'vue'
import { editUserRules } from './js/rules'
import type Node from 'element-plus/es/components/tree/src/model/node'
import ScButton from '@/base/Button/index.vue'
import ScQueryCollection from '@/base/QueryCollection/index.vue'
import ScTable from '@/base/Table/index.vue'
import ScDialog from '@/base/Dialog/index.vue'
import ScForm from '@/base/Form/index.vue'

const formObjFn = (items) => {
  return items.reduce((obj, item) => {
    obj[item.key] = item.value || ''
    return obj
  }, {})
}
// 定义树节点的接口
interface NodeData {
  id: number;
  label: string;
  children?: NodeData[];
}
const defaultProps = {
  children: 'children',
  label: 'label',
}
const treeData = ref<NodeData[]>([
  {
    label: '集团总部',
    id: 1,
    children: [
      {
        label: '深圳总部',
        id: 2,
        children: [
          {
            label: '研发部',
            id: 3,
          },
          {
            label: '运维部',
            id: 4,
          },
          {
            label: '财务部',
            id: 5,
          },
          {
            label: '市场部',
            id: 6,
          }
        ],
      },
    ],
  }
])
const items = [
  {
    label: '部门名称',
    key: 'department',
    type: 'input',
    placeholder: '请输入部门名称',
    value: ''
  },
  {
    label: '部门状态',
    key: 'departmentStatus',
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
  rowKey: 'id',
  columns: [
    {
      label: '部门名称',
      prop: 'department',
    },
    {
      label: '状态',
      prop: 'departmentStatus',
    },
    {
      label: '创建时间',
      prop: 'createTime',
    }
  ],
  operations: {
    label: '操作',
    show: true,
  }
})
// tree结构 包含节点id
const data = [
  {
    department: '总公司',
    departmentStatus: '正常',
    createTime: '2021-08-01 12:00:00',
    id: 1,
    children: [
      {
        department: '财务部',
        departmentStatus: '正常',
        createTime: '2021-08-01 12:00:00',
        id: 2,
        children: [
          {
            department: '财务部1',
            departmentStatus: '正常',
            createTime: '2021-08-01 12:00:00',
            id: 3,
          },
          {
            department: '财务部2',
            departmentStatus: '正常',
            createTime: '2021-08-01 12:00:00',
            id: 4,
          }
        ]
      },
      {
        department: '人事部',
        departmentStatus: '正常',
        createTime: '2021-08-01 12:00:00',
        id: 5,
      }
    ]
  }
]
const itemsAddUser = [
  {
    label: '部门名称',
    key: 'department',
    type: 'input',
    placeholder: '请输入公司编号',
    value: ''
  },
  {
    label: '上级部门',
    key: 'parentDepartment',
    type: 'slot',
    placeholder: '请选择用户性别',
    value: ''
  },
  {
    label: '部门状态',
    key: 'departmentStatus',
    type: 'radio',
    placeholder: '',
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
]
const tableOptions = ref(options)
const form = ref(formObjFn(items))
const showAddOrg: Ref<boolean> = ref(false)
const showSortOrg: Ref<boolean> = ref(false)
const showPreOrg: Ref<boolean> = ref(false)
const formAddOrg = ref(formObjFn(itemsAddUser))
const itemsAddOrg = ref(itemsAddUser)
const rule = reactive(editUserRules)
const addOrg = () => {
  showAddOrg.value = true
}
const sortOrg = () => {
  console.log('sortOrg')
  showSortOrg.value = true
}
const addUserConfirm = () => {
  console.log('addUserConfirm')
}
// 找到并移动节点的函数
const moveNode = (arr: NodeData[], from: NodeData, to: NodeData, type: 'before' | 'after' | 'inner') => {
  // 移除原节点
  const removeNode = (arr: NodeData[], node: NodeData): boolean => {
    const index = arr.findIndex(n => n.id === node.id);
    if (index > -1) {
      arr.splice(index, 1);
      return true;
    }
    arr.some(child => child.children && removeNode(child.children, node));
    return false;
  };

  // 插入节点
  const insertNode = (arr: NodeData[], node: NodeData, refNode: NodeData, type: 'before' | 'after' | 'inner') => {
    const index = arr.findIndex(n => n.id === refNode.id);
    if (index > -1) {
      if (type === 'inner') {
        if (!refNode.children) {
          refNode.children = [];
        }
        refNode.children.push(node);
      } else {
        arr.splice(type === 'before' ? index : index + 1, 0, node);
      }
    } else {
      arr.some(child => child.children && insertNode(child.children, node, refNode, type));
    }
  };

  removeNode(arr, from);
  insertNode(arr, from, to, type);
};

// 处理节点拖拽事件
const handleNodeDrop = (draggingNode: Node, dropNode: Node, dropType: 'before' | 'after' | 'inner') => {
  // 获得拖拽和目标节点的数据
  const fromNodeData: NodeData = draggingNode.data as NodeData;
  const toNodeData: NodeData = dropNode.data as NodeData;

  // 计算并更新树形数据结构
  moveNode(treeData.value, fromNodeData, toNodeData, dropType);
  console.log(treeData.value);
  // 由于直接修改了数据，Vue 应该能够检测到变化并更新视图
};
const selectOrg = () => {
  showPreOrg.value = true
}
</script>
<template>
  <div class="sc_organization">
    <!-- 查询 -->
    <div class="sc_organization_search">
      <sc-query-collection :form=form :items="items"></sc-query-collection>
        <div class="btns">
          <sc-button
            @click="addOrg"
            class="btn">
            +新增
          </sc-button>
          <sc-button type="import" class="btn">导入</sc-button>
          <sc-button type="export" class="btn">导出</sc-button>
          <sc-button
            type="sort"
            @click="sortOrg"
            class="btn">
            排序
          </sc-button>
        </div>
    </div>
    <!-- 表格 -->
    <div class="sc_organization_table">
      <sc-table
        :options="tableOptions"
        :data="data">
        <template #operations="{ scope }">
          <el-link type="primary">修改</el-link>&nbsp;
          <el-link type="danger">删除</el-link>&nbsp;
        </template>
      </sc-table>
    </div>
    <!-- 新增组织机构 -->
    <sc-dialog
      width="817"
      title="新增组织机构"
      @confirm="addUserConfirm"
      v-model="showAddOrg">
      <sc-form
        ref="ruleFormRef"
        :form="formAddOrg"
        :items="itemsAddOrg"  
        :rules="rule">
        <!-- parentDepartment -->
        <template #parentDepartment="{ form, item }">
          <el-form-item
            :key="item.key"
            :prop="item.key"
            :label="item.label">
            <div class="sc-org-input">
              <div @click="selectOrg"></div>
              <el-input
                v-model="form[item.key]"
                :disabled="true"
                :placeholder="item.placeholder">
              </el-input>
            </div>
          </el-form-item>
        </template>
      </sc-form>
    </sc-dialog>
    <!-- 新增组织机构排序 -->
    <sc-dialog
      width="817"
      title="组织机构排序"
      @confirm="addUserConfirm"
      v-model="showSortOrg">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        draggable
        @node-drop="handleNodeDrop"/>
    </sc-dialog>
    <!-- 上级部门 -->
    <sc-dialog
      width="817"
      title="组织机构排序"
      v-model="showPreOrg">
      <el-tree
        :data="treeData"
        :props="defaultProps"/>
    </sc-dialog>
  </div>
</template>
<style lang="less" scoped>
.sc_organization {
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
  .sc-org-input {
    position: relative;
    :deep(.el-input.is-disabled .el-input__wrapper) {
      background-color: #fff!important;
    }
    & > div:first-child {
      cursor: pointer;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }
}
</style>