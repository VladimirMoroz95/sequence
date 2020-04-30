<template>
  <div class="gameboardItem" @click="selectCard">
    <div :class="['round', item.busy]"></div>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object,
      index: Number,
    },
    methods: {
      selectCard() {
        this.$emit('selectCard', this.index)
      }
    }
  }
</script>

<style scoped lang="sass">
  @import "../styles/_variables"

  .gameboardItem
    display: flex
    justify-content: center
    align-items: center
    height: 50px
    width: 72px
    z-index: 100
    margin-right: 10px
    margin-bottom: 8px
    border: 1px solid transparent

  .round
    border-radius: 50%
    width: 26px
    height: 26px

  .red, .green, .blue
    border: 1px solid #000

  .red
    background-color: $redTeamColor

  .green
    background-color: $greenTeamColor

  .blue
    background-color: $blueTeamColor


</style>
