<template>
  <div id="app">
    <notification/>
    <router-view/>
  </div>
</template>

<script>
  import notification from "./components/notification"

  export default {
    components: {
      notification
    }
  }
</script>

<style lang="sass">
  @import "styles/styles"
</style>

