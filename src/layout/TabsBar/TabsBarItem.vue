<template>
  <div :class="item.path === curRouter ? 'tab-item cur-tab' : 'tab-item'" @click="jumpTo(item)">
            <span>
              {{item.label}}
              <i v-if="closeAble" @click.stop="closeTab(item)" class="el-icon-close"></i>
            </span>
  </div>
</template>

<script>
import { addRouters, delRouters } from '@/utils/util.js'
import { DEFAULT_RECENT_ROUTERS } from '@/utils/const.js'
export default {
  name: 'TabsBarItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    curRouter: function () {
      return this.$store.state.curRouter
    },
    recentRouters: {
      set: function (val) {
        this.$store.commit('recentRouters', val)
      },
      get: function () {
        return this.$store.state.recentRouters
      }
    },
    // 是否允许关闭
    closeAble: function () {
      // 只有不在默认标签页的标签才能关闭
      const arr = DEFAULT_RECENT_ROUTERS.filter(item => item.path === this.item.path)
      return arr.length <= 0
    }
  },
  methods: {
    jumpTo: function (item) {
      addRouters(item)
    },
    closeTab: function (item) {
      delRouters(item)
    }
  }
}
</script>

<style scoped>
  .tab-item {
    display: inline-block;
    height: 100%;
    padding: 0 1.5em;
    box-sizing: border-box;
    cursor: pointer;
    color: #909399;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }
  .tab-item:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .tab-item span {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.5em;
  }
  .tab-item span i {
    font-size: 1em;
    color: black;
  }
  .tab-item.cur-tab {
    background-color: white;
    border-left: 1px solid #e4e7ed;
    border-right: 1px solid #e4e7ed;
    border-bottom: 1px solid transparent;
    color: #409eff;
  }
</style>
