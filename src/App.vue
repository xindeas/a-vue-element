<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import 'src/assets/css/theme-variable';
  @font-face {
    font-family: Font001;
    src: url(./assets/font/yang.ttf)
  }
  @font-face {
    font-family: Font002;
    src: url(./assets/font/wei.otf)
  }
  #nprogress .bar {
    background: $--color-primary !important;
  }
</style>
