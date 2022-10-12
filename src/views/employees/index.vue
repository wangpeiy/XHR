<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[5,10,15,20]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <!-- 新增员工弹出层 -->
    <AddEmployee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools/index.vue'
import { getEmployeeList, delEmployee } from '@/api'
import EnumHireType from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
export default {
  // components: { PageTools }
  name: 'Employees',
  components: { AddEmployee },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialogVisible: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    // 获取表格数据
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, col, currentValue) {
      const res = this.hireType.find(ele => ele.id === currentValue)
      return res ? res.value : '非正式'
    },
    // 新增员工事件
    handleEmploy() {
      // 点击的时候弹出新增员工的弹窗
      this.dialogVisible = true
    },
    // 删除员工
    async del(id) {
      try {
        // 确认提示
        await this.$confirm('确定删除该员工吗?', '提示', {
          type: 'warning'
        })
        // 调用删除接口
        await delEmployee(id)
        // 刷新页面重新渲染
        this.getEmployeeList()
        // 删除成功提示
        this.$message.success('删除成功!')
      } catch (error) {
        console.log(error)
      }
    },
    // 导出事件
    async exportExcel() {
      // 导出这个功能不常用,所以不希望页面加载的时候就加载导出模块, 所以可以使用懒加载的方式, 当点击导出事件的时候才进行加载
      // 路由懒加载函数的返回值是一个Promise, 所以可以使用then或者 async await 来接收结果
      const excel = await import('@/vendor/Export2Excel.js')
      // 获取所有的员工列表数据
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)

      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const header = Object.keys(exportExcelMapPath)

      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[h]]
        })
      })

      excel.export_json_to_excel({
        header, // 表头 必填
        // data中的二维数组, 其中的每个数组对应的是一行的数据
        data, // 具体数据 必填
        filename: '黑马员工列表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    }
  }
}
</script>

<style>

</style>
