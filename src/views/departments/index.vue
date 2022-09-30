<template>
  <div class="departments-container">
    <el-card>
      <TreeTools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <TreeTools slot-scope="{data}" :tree-node="data" @addDept="handleAddDept" />
    </el-tree>

    <!-- 放置新增弹层组件  -->
    <add-dept :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import TreeTools from './components/TreeTools.vue'
import { getDepartmentsAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      currentNode: {}
    }
  },
  created() { this.getDepartments() },
  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartmentsAPI()
      console.log(depts)
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    // 新增部门
    handleAddDept(node) {
      this.showDialog = true
      this.currentNode = node
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        // padding-right: 20px;
      }
    }
  }

  .el-card__body {
    padding-right: 0;
  }
  </style>
