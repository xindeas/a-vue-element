<template>
  <div class="tabs-bar">
    <draggable v-model="recentRouters" class="tabs-bar">
      <template v-for="(item, index) in recentRouters">
        <TabsBarItem :key="index" :item="item"></TabsBarItem>
      </template>
    </draggable>
  </div>
</template>

<script>
import { addRouters } from '@/utils/util.js'
import draggable from 'vuedraggable'
import TabsBarItem from './TabsBarItem'
export default {
  name: 'TabsBar',
  components: {
    TabsBarItem,
    draggable
  },
  computed: {
    recentRouters: {
      set: function (val) {
        this.$store.commit('recentRouters', val)
      },
      get: function () {
        return this.$store.state.recentRouters
      }
    }
  },
  mounted: function () {
    const arr = this.recentRouters.filter(item => item.path === this.curRouter)
    if (arr.length > 0) {
      addRouters(arr[0])
    }
  }
}
</script>

<style scoped>
  .tabs-bar {
    height: 2.5em;
    background-color: #f5f7fa;
    border: 1px solid #e4e7ed;
  }
</style>
