<template />

<script>
import {
  uploads
} from './upload.js' // uploads.js是封装的一个上传方法，可基于Promise进行封装
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean'] // remove formatting button
]
export default {
  props: {
    values: { // 用于回显
      type: String,
      default: ''
    }
  },
  data() {
    return {
      spinning: false,
      content: '',
      editorOption: {
        placeholder: '请输入',
        modules: {
          imageResize: { // 图片放大缩小配置
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('.uploads').click()
                } else {
                  this.quill.format('image', false)
                }
              },
              'video': function(value) {
                if (value) {
                  document.querySelector('.upVideo').click()
                } else {
                  this.quill.format('video', false)
                }
              }
            }
          }
        }
      }
    }
  },
  watch: { // 监听回显的数据变化
    values: {
      handler(newVal, oldVal) {
        this.content = newVal
        this.$refs.QuillEditor.quill.blur()
      },
      immediate: true
    }
  },
  methods: {
    getVal() { // 返回内容
      return this.content
    },
    setVal(data) { // 赋值
      this.content = data
    },
    uploadImgs(e) { // 上传图片
      var file = this.$refs.imgs.files[0]
      this.spinning = true
      this.upFile(file, 'image')
      e.target.value = ''
    },
    uploadVideo(e) { // 上传视频
      var file = this.$refs.videos.files[0]
      this.spinning = true
      this.upFile(file, 'video')
    },
    upFile(file, type) { // 上传api
      uploads(file).then(result => {
        this.spinning = false
        this.insertImg(result, type)
      })
    },
    insertImg(url, type) { // 插入图片
      var quill = this.$refs.QuillEditor.quill
      const length = quill.getSelection().index
      quill.insertEmbed(length, type, url)
      quill.setSelection(length + 1)
    }
  }
}
</script>

<style scoped lang="less">
 p {
    margin: 10px;
  }
  .edit_container,
  .quill-editor {
    height: 300px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
  }
.richBox{
  width: 95% !important;
  .quill-editor{
    width: 100% !important;
    height: 600px;
  }
}
::v-deep .ql-container{
  height: 90% !important;
}
</style>
