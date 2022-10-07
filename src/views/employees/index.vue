<template>
  <div>
    <PageTools type="error11" :show-before="false">
      <!-- before:作用域插槽 -->
      <template #before>
        <span>共25条记录</span>
      </template>

      <!-- after:作用域插槽 -->
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools/index.vue'

export default {
  // components: { PageTools }
}
</script>

<style>

</style>
