<template>
  <div></div>
</template>

<script>
  export default {
    computed: {
      currentUserIndex() {
        return this.$store.state.currentUserIndex
      },
      players() {
        return this.$store.getters.players
      },
    }
  }
</script>

<style scoped>

</style>
