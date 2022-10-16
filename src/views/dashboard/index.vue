<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon icon-class="eye-open" />
    <UploadImg @on-success="onSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImg from '@/components/UploadImg/index.vue'

export default {
  name: 'Dashboard',
  components: { UploadImg },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onSuccess(val) {
      console.log('123', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
