<template>
  <div class="players-menu">
    <ul class="players-list">
      <li
        v-for="(player, index) in players"
        :key="player.id"
        :class="['player-item', player.team, { 'active': currentUserIndex === index }]"
      >
        <span>{{ player.name }}</span>
        <span>{{ getPoints(player.team) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    players() {
      return this.$store.state.players
    },
    currentUserIndex() {
      return this.$store.state.currentUserIndex
    },
    redTeamPoints() {
      return this.$store.getters.redTeamPoints
    },
    blueTeamPoints() {
      return this.$store.getters.blueTeamPoints
    },
    greenTeamPoints() {
      return this.$store.getters.greenTeamPoints
    },
  },
  methods: {
    getPoints(team) {
      return this[`${team}TeamPoints`]
    }
  },
}
</script>

<style scoped lang="sass">
  @import "../styles/_variables"

  .players-menu
    display: flex
    width: 100%

  .players-list
    display: flex
    justify-content: flex-start
    margin-bottom: 25px

  .player-item
    display: flex
    align-items: center
    justify-content: space-between
    color: #fff
    height: 60px
    width: 200px
    padding: 0 15px
    font-size: 15px
    margin-left: 15px

  .red
    background: $redTeamColor

  .blue
    background: $blueTeamColor

  .green
    background: $greenTeamColor

  .active
    border: 2px solid #fac64d

</style>
