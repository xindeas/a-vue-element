<template>
    <div class="main-content">
      <TabsBar></TabsBar>
      <div class="my-content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import TabsBar from '../TabsBar/TabsBar'
export default {
  name: 'MainContent',
  components: {TabsBar}
}
</script>

<style scoped>
  .my-content {
    width: 100%;
    height: calc(100% - 2.5em);
  }
</style>
