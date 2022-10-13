<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置" name="first">
            <el-form ref="form" :model="accountInfo" :rules="accountInfoRules" label-width="80px">
              <el-form-item label="账户" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployeesInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane lazy label="个人详情" name="second">
            <UserInfo />
          </el-tab-pane>

          <el-tab-pane lazy label="岗位信息" name="third">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailByIdAPI, saveUserDetailByIdAPI } from '@/api'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'

export default {
  name: 'Detail',
  components: { UserInfo, JobInfo },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '长度须在 6 个字符以上', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    // 获取当前员工信息
    async loadEmployeesInfo() {
      const res = await getUserDetailByIdAPI(this.$route.params.id)
      this.accountInfo = res
    },
    // 更新员工信息
    async updateEmployeesInfo() {
      // async 和 await 的缺点
      // 错误必须用 try catch 捕获
      try {
        // 校验
        await this.$refs.form.validate()
        // 发送请求
        // 调用保存用户信息接口
        await saveUserDetailByIdAPI(this.accountInfo)
        // this.loadEmployeesInfo()
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
