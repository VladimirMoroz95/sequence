<template>
  <div class="team-wrapper" :style="[{'--team-color': name}]">
    <span class="team-name">{{ _.capitalize(name) }} team</span>
    <player
      v-for="player in players"
      :key="player.id"
      :player="player"
    />

    <tbutton v-slot:button align="right" @onClick="addPlayer">
      <addButton :color="name" />
      <span class="add-player" >Add player</span>
    </tbutton>
  </div>
</template>

<script>
  import player from "./playerInput"
  import tbutton from "./tbutton"
  import addButton from "./icons/add"

  export default {
    props: {
      name: String,
      players: Array,
    },
    mounted() {
      console.log('store', this.$store)
    },
    methods: {
      addPlayer() {
        if (this.$store.getters.playersCount < 6) {
          this.$store.commit('addPlayer', this.name)
        } else {
          this.$store.commit('setNotification', '6 maximum number of players')
          setTimeout(() => {
            this.$store.commit('removeNotification', null)
          }, 6000)
        }
      }
    },
    components: {
      player,
      tbutton,
      addButton,
    }
  }
</script>

<style scoped lang="sass">
  @import "../styles/_variables"

  .team-wrapper
    position: relative
    display: flex
    flex-direction: column
    border: 1px solid var(--team-color)
    border-radius: 10px
    padding: 25px
    margin-bottom: 25px
    height: auto
    width: 300px

  .add-player
    color: var(--team-color)
    font-size: 14px
    font-weight: 600
    margin-left: 5px

  .team-name
    position: absolute
    top: -7px
    font-size: 12px
    background: #fff
    padding: 0 5px
    color: var(--team-color)

</style>
