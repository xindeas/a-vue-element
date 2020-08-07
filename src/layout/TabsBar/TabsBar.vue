<template>
    <draggable v-model="recentRouters" class="tabs-bar">
      <template v-for="(item, index) in recentRouters">
        <TabsBarItem :key="index" :item="item"></TabsBarItem>
      </template>
    </draggable>
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
    // 加载固定标签
    const arr = this.recentRouters.filter(item => item.path === this.curRouter)
    if (arr.length > 0) {
      for (let item of arr) {
        addRouters(item)
      }
    }
  }
}
</script>

<style scoped>
</style>
