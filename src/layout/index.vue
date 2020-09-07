<template>
  <div class="app-wrapper">
    <div style="width:100%;height:65px" />
    <navbar v-if="!hideNav" />
    <app-main />
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {
    hideNav() {
      return this.$route.meta.hideNav
    }
  },
  activated() {
    console.log('------ssssssss------')
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .mobile .fixed-header {
    width: 100%;
  }
</style>
