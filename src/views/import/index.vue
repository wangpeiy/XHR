<template>
  <UploadExcel :before-upload="beforeUpload" :on-success="onSuccess" />
</template>

<script>
import { importEmployee } from '@/api'
export default {
  methods: {
    beforeUpload(file) {
      console.log('file', file)
      if (file.size > 100000) {
        this.$message.error('文件过大')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // const arr = []
      // results.forEach(element => {
      //   const userInfo = {}
      //   Object.keys(element).forEach(key => {
      //     userInfo[userRelations[key]] = element[key]
      //   })
      //   arr.push(userInfo)
      // })

      const arr = results.map((element) => { // element: { '入职日期': 43678, '姓名': '高大山', '工号': 20089, '手机号': 13041131879, '转正日期': 43678 }
        const userInfo = {}
        console.log(element)
        Object.keys(element).forEach(key => { // Object.keys(element): ['入职日期','姓名','工号','手机号','转正日期']
          userInfo[userRelations[key]] = element[key] // userRelations[key]: 通过中文的每一项找到对应的英文 ; element[key]: 在将中文的每一项的值赋给英文
        })
        return userInfo
      })
      console.log(arr)
      try {
        await importEmployee(arr)
        this.$message.success('批量导入成功')
        this.$router.back()
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style>

</style>
