<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { addUserRules } from './js/rules'
import { formObjFn } from '@/utils/dataConversion'
import ScButton from '@/base/Button/index.vue'
import ScQueryCollection from '@/base/QueryCollection/index.vue'
import ScTable from '@/base/Table/index.vue'
import ScDialog from '@/base/Dialog/index.vue'
import ScForm from '@/base/Form/index.vue'

const router = useRouter()

interface Tree {
  label: string
  children?: Tree[]
}

const ruleFormRef = ref()

const items = [
  {
    label: '公司编号',
    key: 'username',
    type: 'input',
    placeholder: '请输入公司编号',
    value: ''
  },
  {
    label: '公司名称',
    key: 'password',
    type: 'input',
    placeholder: '请输入公司名称',
    value: ''
  },
  {
    label: '法定代表人',
    key: 'password',
    type: 'input',
    placeholder: '请输入法定代表人',
    value: ''
  },
]

const itemsAddUser = [
  {
    label: '用户名称',
    key: 'username',
    type: 'input',
    placeholder: '请输入公司编号',
    value: ''
  },
  {
    label: '排序',
    key: 'sort',
    type: 'input',
    placeholder: '请输入排序',
    value: ''
  },
  {
    label: '用户性别',
    key: 'sex',
    type: 'select',
    placeholder: '请选择用户性别',
    value: '1',
    options: [
      {
        label: '男',
        value: '1'
      },
      {
        label: '女',
        value: '2'
      }
    ]
  },
  {
    label: '归属部门',
    key: 'department',
    type: 'input',
    placeholder: '请输入公司编号',
    value: ''
  },
  {
    label: '用户岗位',
    key: 'post',
    type: 'select',
    placeholder: '请选择用户岗位',
    value: '',
    options: [
      {
        label: '研发',
        value: '1'
      },
      {
        label: '产品',
        value: '2'
      }
    ]
  },
  {
    label: '手机号',
    key: 'phone',
    type: 'input',
    placeholder: '请输入手机号',
    value: ''
  },
  {
    label: '邮箱',
    key: 'email',
    type: 'input',
    placeholder: '请输入邮箱',
    value: ''
  },
  {
    label: '登陆账号',
    key: 'loginAccount',
    type: 'input',
    placeholder: '请输入登陆账号',
    value: ''
  },
  {
    label: '密码',
    key: 'password',
    type: 'input',
    inputType: 'password',
    placeholder: '请输入登陆账号',
    value: ''
  },
  {
    label: '用户状态',
    key: 'status',
    type: 'slot',
    placeholder: '',
    value: '',
  },
  {
    label: '备注',
    key: 'remark',
    type: 'slot',
    placeholder: '请输入备注',
    value: ''
  },
]
const rules = reactive(addUserRules)

const formObj = formObjFn(items)

const form = ref(formObj)

const formAddUser = ref(formObjFn(itemsAddUser))

const data = ref([
  {
    username: '1',
    password: '2',
    name: '3',
    age: '4',
    address: '5',
    date: '6',
    operation: '7',
  },
  {
    username: '2',
    password: '2',
    name: '3',
    age: '4',
    address: '5',
    date: '6',
    operation: '7',
  },
  {
    username: '3',
    password: '2',
    name: '3',
    age: '4',
    address: '5',
    date: '6',
    operation: '7',
  }
])
const options = {
  selection: true,
  columns: [
    {
      label: '公司编号',
      prop: 'username',
    },
    {
      label: '公司名称',
      prop: 'password',
      slot: true,
    },
    {
      label: '法定代表人',
      prop: 'password',
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
      pageSize: 10,
    }
  })
}
const sortOptions = {
  selection: false,
  draggable: true,
  columns: [
    {
      label: '用户名称',
      prop: 'username',
    },
    {
      label: '登录名',
      prop: 'password'
    }
  ],
}
const showAddUser = ref(false)
const showSortDep = ref(false)
const treeData: Tree[]  = [
  {
    label: '集团总部',
    children: [
      {
        label: '深圳总部',
        children: [
          {
            label: '研发部',
          },
          {
            label: '运维部',
          },
          {
            label: '财务部',
          },
          {
            label: '市场部',
          }
        ],
      },
    ],
  }
]
const defaultProps = {
  children: 'children',
  label: 'label',
}
const handleNodeClick = (data: any) => {
  console.log(data)
}
const addUser = () => {
  showAddUser.value = true
}
const addUserConfirm = async () => {
  if (!ruleFormRef.value.ruleFormRef) return
  try {
    await ruleFormRef.value.ruleFormRef.validate()
    console.log('成功')
  } catch (error) {
    console.log(error)
  }
}
const formChange = (key: string, value: any) => {
  formAddUser.value[key] = value
}

const sortChange = (data: any) => {
  data.value = data
}
const goEdit = () => {
  router.push('/settings/auth/organization')
}
router
</script>
<template>
  <div class="setting_user">
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>
<style lang="less" scoped>
.setting_user{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  .organization {
    width: 193px;
    height: 100%;
    .title {
      width: 100%;
      height: 63px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 25px;
      border-bottom: 1px solid var(--sc-border-color);
      margin-bottom: 25px; 
    }
    .tree {
      width: 100%;
      box-sizing: border-box;
      padding: 0 25px;
    }
    .icon {
      cursor: pointer;
    }
  }
  .main {
    flex: 1;
    padding: 46px 30px 41px 30px;
    display: flex;
    flex-direction: column;
    .btns {
      margin-bottom: 15px;
      .btn {
        display: inline-block;
        margin-right: 20px;
      }
    }
    .setting_user_table {
      flex: 1;
      overflow: hidden;
    }
  }
  .mb-0 {
    width: 100%;
  }
}
</style>
