<template>
  <el-dialog
    :title="title"
    width="60%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      v-loading="loading"
      label-width="80px"
      :model="roleForm"
      :rules="rules"
    >
      <el-form-item
        prop="name"
        label="角色"
      >
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="roleForm.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addRole">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRoleAPI, updateRole } from '@/api'
export default {
  name: 'HrsaasRoleDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClose() {
      // 表单效果重置
      this.$refs.roleDialogForm.resetFields()
      this.$emit('update:dialogVisible', false)
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    async addRole() {
      try {
        await this.$refs.roleDialogForm.validate()
        // 接口
        this.loading = true
        this.roleForm.id ? await updateRole(this.roleForm) : await addRoleAPI(this.roleForm)
        this.$emit('refreshList')
        this.$message.success(this.roleForm.id ? '编辑成功' : '新增成功')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
