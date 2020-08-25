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
