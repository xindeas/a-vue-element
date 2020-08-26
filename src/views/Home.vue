<template>
<div class="logo-cotent view-content">
  <div class="lg">
    <div class="logo">
      <div class="font001 chen">沉</div>
      <div class="font002 xindeas">Xindeas</div>
      <div class="font001 zhou">舟</div>
    </div>
    <div class="font001 tip">势如破竹，志若沉舟</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
  @import 'src/assets/css/theme-variable';
  .logo-cotent {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    overflow-y: auto;
  }
  .logo-cotent:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .lg {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .logo {
    border-radius: 50%;
    background: $--color-primary;
    width: 12em;
    height: 12em;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .font001 {
    font-family: Font001;
  }
  .font002 {
    font-family: Font002;
  }
  .chen {
    font-size: 6em;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: -0.1em;
  }
  .zhou {
    font-size: 6em;
    font-weight: bold;
    position: absolute;
    right: 0;
    bottom: -0.1em;
  }
  .xindeas {
    position: absolute;
    top: 7em;
    left: 2em;
    color: white;
  }
  .tip {
    margin-top: 1em;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
  }
</style>
