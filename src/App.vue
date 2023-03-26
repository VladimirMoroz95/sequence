<template>
  <div id="app">
    <notification/>
    <router-view/>
  </div>
</template>

<script>
  import notification from "./components/notification"

  export default {
    sockets: {
      connect: function () {
        console.log('socket to notification channel connected')
      },
    },

    components: {
      notification
    }
  }
</script>

<style lang="sass">
  @import "styles/styles"
</style>

