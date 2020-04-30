<template>
  <div class="menu-wrapper">
    <h1 class="title">SEQUENCE</h1>
    <team
      v-for="team in teams"
      :key="team.name"
      :name="team.name"
      :players="team.players"
    />
    <tbutton v-slot:button align="center" @onClick="startGame">
        <h3 class="button-text">START GAME</h3>
    </tbutton>
  </div>
</template>

<script>
  import tbutton from "./tbutton"
  import team from "./team"

  export default {
    computed: {
      teams() {
        return this.$store.getters.teamsArray
      },
    },
    methods: {
      startGame() {
        const { red, blue, green } = this.$store.state.teamPlayersCount
        const withoutZeros = _.without([red, blue, green], 0)
        const unionPlayersCount = _.union(withoutZeros, withoutZeros).length

        if ( unionPlayersCount === 1 && withoutZeros.length > 1) {
          this.$store.commit('setPlayers')
          this.$router.push('gameboard')
        } else {
          this.$store.commit('setNotification', 'Incorrect players count!')
          setTimeout(() => {
            this.$store.commit('removeNotification', null)
          }, 6000)
        }
      }
    },
    components: {
      team,
      tbutton,
    }
  }
</script>

<style scoped lang="sass">
  @import "../styles/_variables"

  .menu-wrapper
    width: 100%
    display: flex
    flex-direction: column
    align-items: center

  .title
    color: $primaryColor
    margin-bottom: 40px

  .button-text
    color: $primaryColor

</style>
