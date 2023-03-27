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
      createGame: function (data) {
        console.log('socket createGame event', data);
      },
      createGameSuccess: function (data) {
        console.log("Create game success; RoomId: ", data)
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

