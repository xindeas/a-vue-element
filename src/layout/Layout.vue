<template>
  <div class="content">
    <SideBar :class="sideBarClass" :isCollapse="isCollapse"></SideBar>
    <div class="main-layout">
      <TopBar></TopBar>
      <MainContent></MainContent>
      <FooterBar></FooterBar>
    </div>
  </div>
</template>

<script>
import SideBar from '@/layout/SideBar/SideBar'
import TopBar from '@/layout/TopBar/TopBar'
import FooterBar from '@/layout/FooterBar/FooterBar'
import MainContent from '@/layout/MainContent/MainContent'
export default {
  name: 'home',
  components: {
    SideBar,
    TopBar,
    FooterBar,
    MainContent
  },
  data: function () {
    return {
    }
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.menuCollapse
    },
    sideBarClass: function () {
      return {
        'side-bar': true,
        'side-bar-width': !this.isCollapse
      }
    }
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
  }
  .side-bar {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .side-bar-width {
    width: 20em;
  }

  .main-layout {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .top-bar {
    width: 100%;
    height: 4em;
    padding: 0.5em 1em;
    box-shadow: #999 6px 1px 5px 1px;
    box-sizing: border-box;
    position: relative;
  }
  .top-bar:after {
    content: '';
    height: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  .footer-bar {
    width: 100%;
    height: 3em;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    box-sizing: border-box;
    text-align: center;
    box-shadow: #999 6px 1px 5px 1px;
  }
  .footer-bar:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .main-content {
    width: 100%;
    height: calc(100% - 7.5em);
  }
</style>
