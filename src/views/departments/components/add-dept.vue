<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, getEmployeeSimpleAPI, addDepartments, updateDepartmentsAPI } from '@/api'
export default {

  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
  // 部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      if (this.formData.id) { // 编辑模式
        // 找到真正的同级部门
        const deptstj = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
        isRepeat = deptstj.some(item => item.name === value)
        console.log('同级部门', deptstj)
      } else { // 新增模式
        // 找到子部门
        const deptstj = depts.filter(item => item.pid === this.treeNode.id)
        isRepeat = deptstj.some(item => item.name === value)
        console.log('子部门', deptstj)
      }

      !isRepeat ? callback() : callback(new Error(`模块下已经存在${value}`))
      callback()
    }
    // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
    const codeCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      // 编辑模式下,不让自己和自己校验
      // 解决方案,对比的过程中,把自己排除掉,再进行对比
      if (this.formData.id) {
        isRepeat = depts.some(element => element.id !== this.formData.id && element.code === value)
      } else {
        isRepeat = depts.some(element => element.code === value)
      }
      !isRepeat ? callback() : callback(new Error(`模块下已经存在${value}编码`))
    }
    // 部门负责人（manager）：必填
    // 部门介绍 ( introduce)：必填 1-300个字符
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  // updated() {
  //   console.log('123456', this.treeNode)
  // },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.addDeptForm.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimpleAPI()
    },
    async submit() {
      try {
        // 通过表单校验
        await this.$refs.addDeptForm.validate()
        // loading
        this.loading = true
        // 调用接口
        if (this.formData.id) {
          // 编辑模式
          await updateDepartmentsAPI(this.formData)
        } else {
          // 新增模式
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
        }
        // 成功提示
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功`)
        // 触发父组件的刷新列表
        this.$parent.getDepartments()
        // 关闭弹窗
        this.handleClose()
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
