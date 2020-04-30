<template>
  <div class="game">
    <div
      v-if="victoryText"
      class="victory-text-background"
      @click="$router.push('/')"
    >
      <span>{{ victoryText }}</span>
    </div>
    <players-menu />
    <div class="board-wrapper">
      <div class="map">
        <img class="game-background" src="../assets/map.png" width="860px" height="620px" />
        <div class="gameboardItem-wrapper">
          <gameboardItem
            v-for="(item, index) in map"
            :key="item.id + index"
            :item="item"
            :index="index"
            @selectCard="selectCard"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gameboardItem from "./gameboardItem"
  import playersMenu from "./playersmenu"

  export default {
    data() {
      return {
        victoryText: ''
      }
    },
    computed: {
      map() {
        return this.$store.state.mapData
      }
    },
    mounted() {
      if (this.$store.state.players.length === 0) this.$router.push('/')
    },
    methods: {
      async selectCard(index) {
        const wonTeam = await this.$store.dispatch('calculatePoints', index)
        this.$store.commit('selectCard', index)

        if (wonTeam) {
          this.victoryText = `${wonTeam.toUpperCase()} TEAM WINS!`
        }
      }
    },
    components: {
      gameboardItem,
      playersMenu,
    }
  }
</script>

<style scoped lang="sass">
  .game
    display: flex
    flex-direction: column
    align-items: center
    width: 100%

  .board-wrapper
    display: flex
  .map
    position: relative
    width: 870px
    height: 620px
    background: #d7d7d9 //url("../assets/table.jpg") repeat
    z-index: 100

  .game-background
    position: absolute
    z-index: 1

  .gameboardItem-wrapper
    padding: 15px
    display: flex
    flex-wrap: wrap

  .victory-text-background
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 200
    background: rgba(0, 0, 0, 0.6)
    display: flex
    justify-content: center
    align-items: center
    font-size: 74px
    font-weight: 700
    color: #fac64d
    cursor: pointer

</style>
