<template>
  <div class="button" :class="align" @click="onClick">
    <slot name="button"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      text: String,
      align: String
    },
    methods: {
      onClick() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style scoped lang="sass">
  .button
    display: flex
    cursor: pointer
    user-select: none

  .right
    justify-content: flex-end

  .center
    justify-content: center

  .left
    justify-content: flex-start
</style>
