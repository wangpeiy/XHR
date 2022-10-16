<template>
  <div>
    <el-upload
      v-loading="loading"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :limit="1"
      class="uploadImg"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog
      title="提示"
      :visible.sync="previewDialog"
      width="30%"
    >
      <img style="width:100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 1.引入并且准备好 存储桶名称,所属地域,SecretId,SecretKey
import COS from 'cos-js-sdk-v5'
// 2.创建cos实例
const cos = new COS({
  SecretId: 'AKID1vb2FEtKcgVAdstgFah7RZUBfvynRt77', /* SecretId 必须字段 */
  SecretKey: 'oNhnNjtoX2IJ7mKjwzqUvKbjgT5Zr01w'/* SecretKey 必须字段 */
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [],
      previewDialog: false,
      previewImgUrl: '',
      loading: false
    }
  },
  // 监视接收过来的值发生变化时将图片信息push到fileList
  watch: {
    defaultUrl() {
      console.log(this.defaultUrl)
      this.fileList.push({ name: 'default', url: this.defaultUrl })
    }
  },
  methods: {
    // 点击预览
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewDialog = true
    },
    // 点击删除
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 3. 在触发上传函数中写入一下配置
    httpRequest({ file }) {
      // console.log('覆盖默认上传行为')
      // console.log(file)
      this.loading = true
      cos.uploadFile({
        Bucket: 'wpy-1314348540', /* 填写自己的bucket，必须字段(存储桶名称) */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段(所属地域) */
        Key: file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // 如果上传成功 err为null
        if (err) return this.$message.error('图片上传失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
    },
    // 上传之前触发
    beforeUpload(file) {
      const allowTypes = ['image/jpeg', 'image/gif']
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + allowTypes.join(',') + '格式')
        return false
      }

      // 限制上传的大小
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('只能上传不超过1mb大小的图片')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.uploadImg {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
