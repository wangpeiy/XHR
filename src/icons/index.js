import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context('文件夹路径', '是否查看子文件夹', '正则格式')
// 返回一个方法,方法上有keys方法可以返回文件的数组
const req = require.context('./svg', false, /\.svg$/)
// console.dir(req)
// console.log(req.keys())
// console.log(req('./dashboard.svg'))
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// console.log(requireAll(req))
