<template>
  <div class="app-container">

    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row style="height:60px">
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="dialogVisible = true"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" border="" :data="roleList">
            <el-table-column label="序号" width="120" type="index" />
            <el-table-column label="角色名称" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" width="240">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              v-if="total > 0"
              background
              layout="total,prev, pager, next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,4,6]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <add-role ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleListAPI, deleteRole, getCompanyInfoAPI } from '@/api'
import { mapGetters } from 'vuex'
import addRole from './components/addRole.vue'
export default {
  name: 'Setting',
  components: { addRole },
  data() {
    return {
      activeName: 'first',
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 2
      },
      total: 0, // 记录总数
      roleList: [],
      loading: false,
      dialogVisible: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListAPI(this.page)
        this.roleList = rows
        this.total = total
        // 解决有数据但是当前页码为空的问题
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 编辑功能
    editRole(row) {
      console.log(row)
      this.$refs.addRole.roleForm = { ...row }
      this.dialogVisible = true
    },
    // 删除功能
    async delRole(id) {
      try {
        await this.$confirm('确认删除该角色吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用接口
        await deleteRole(id)
        // 刷新列表
        this.getRoleList()
      } catch (error) {
        // 取消
        console.log(error)
      }
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfoAPI(this.companyId)
    }
  }

}
</script>

<style>

</style>
