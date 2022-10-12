// 引用要注册的组件
// import PageTools from './PageTools'
// 把组件用数组收集起来
// const components = [PageTools]
// 默认导出Vue.use()中的对象,其中包含install属性
// 在install函数中循环注册组件
// export default {
//   install: function(Vue) {
//     components.forEach(Element => Vue.component(Element.name, Element))
//   }
// }

// 实现组件自动注册
const requireComponent = require.context('./', true, /\.vue$/) // require.context(路径，是否查看子目录，正则) ==》返回一个函数
console.log('requireComponent.keys()', requireComponent.keys()) // require.context 返回的函数 有一个keys属性，对应也是一个方法，返回值 找到内容的路径
console.log('根据路径查找模块', requireComponent('./PageTools/index.vue')) // require.context 返回的函数 的作用 根据路径 找到对应的模块

const components = requireComponent.keys().map(Element => requireComponent(Element))
console.log('components', components)

// 导入所有的过滤器
import * as filters from '@/filters'
// 也可以使用导出函数的方式
export default (Vue) => {
  // 循环注册组件
  components.forEach(Element => Vue.component(Element.default.name, Element.default))
  // 循环注册过滤器
  // Vue.filter('过滤器名称',过滤器的方法)
  Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
}

