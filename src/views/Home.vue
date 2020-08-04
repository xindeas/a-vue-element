<template>
<div class="logo-cotent">
  <div class="logo">
    <div class="font001 chen">沉</div>
    <div class="font002 xindeas">Xindeas</div>
    <div class="font001 zhou">舟</div>
  </div>
  <div class="font001 tip">势如破竹，志若沉舟</div>
</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
  .logo-cotent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 1em;
    flex-wrap: wrap;
  }
  .logo {
    border-radius: 50%;
    background: #b3d8ff;
    width: 12em;
    height: 12em;
    position: relative;
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
  }
</style>
