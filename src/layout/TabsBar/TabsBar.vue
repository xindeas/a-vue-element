<template>
    <draggable v-model="recentRouters" class="tabs-bar" :move="checkMove" filter=".un-close-able">
      <template v-for="(item, index) in recentRouters">
        <TabsBarItem :key="index" :item="item"></TabsBarItem>
      </template>
    </draggable>
</template>

<script>
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
  methods: {
    checkMove: function (evt, originalEvent) {
      if (evt.draggedContext.futureIndex === 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
</style>
