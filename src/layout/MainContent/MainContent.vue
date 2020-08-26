<template>
    <div class="main-content">
      <TabsBar></TabsBar>
      <div class="my-content">
        <keep-alive :include="include">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>

<script>
import TabsBar from '../TabsBar/TabsBar'
export default {
  name: 'MainContent',
  components: {TabsBar},
  computed: {
    include: function () {
      const recentRouters = this.$store.state.recentRouters
      const arr = recentRouters.map(item => {
        return item.path.startsWith('/') ? item.path.substring(1) : item.path
      })
      return arr
    }
  }
}
</script>

<style scoped>
  .my-content {
    width: 100%;
    height: calc(100% - 2.5em - 0.2em);
  }
  .tabs-bar {
    margin-bottom: 0.2em;
    height: 2.5em;
    background-color: #f5f7fa;
    border: 1px solid #e4e7ed;
  }
  .tabs-bar:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
</style>
