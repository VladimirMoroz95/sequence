<template>
  <div>
    <div class="player-wrapper">
      <span class="player-input-label">Player name</span>
      <div class="player-input-wrapper">
        <input class="player-input" v-model="playerName"/>
        <tbutton v-slot:button align="center" @onClick="removePlayer">
          <removeIco
            class="player-remove-button"
            :color="player.team"
          />
        </tbutton>
      </div>
    </div>
  </div>
</template>

<script>
  import removeIco from "./icons/remove"
  import tbutton from "./tbutton"

  export default {
    props: {
      player: Object,
    },
    watch: {
      playerName: function(value) {
        this.$store.commit('changePlayerName', { ...this.player, name: value })
      }
    },
    data() {
      return {
        playerName: this.$props.player.name
      }
    },
    methods: {
      removePlayer() {
        this.$store.commit('removePlayer', this.player)
      }
    },
    components: {
      removeIco,
      tbutton,
    }
  }
</script>

<style lang="sass" scoped>
  .player-wrapper
    display: flex
    flex-direction: column
    align-items: flex-start
    width: 300px
    margin-bottom: 30px

  .player-input-wrapper
    display: flex
    align-items: center

  .player-input-label
    font-size: 10px
    color: var(--team-color)

  .player-input
    height: 30px
    width: 270px
    font-size: 16px
    color: var(--team-color)
    border-color: var(--team-color)

  .player-remove-button
    cursor: pointer
    margin-left: 15px

</style>
