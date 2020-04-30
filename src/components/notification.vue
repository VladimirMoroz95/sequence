<template>
  <transition name="fade">
    <div v-if="notificationText" class="notification">
      <span class="notification-text">{{ notificationText }}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    computed: {
      notificationText() {
        return this.$store.state.notification
      }
    }
  }
</script>

<style scoped lang="sass">
  .notification
    position: fixed
    top: 10px
    right: 10px
    display: flex
    justify-content: center
    align-items: center
    height: 70px
    width: 250px
    background: #494343
    opacity: 0.5
    border-radius: 10px

  .notification-text
    color: #fff

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to
    opacity: 0


</style>
