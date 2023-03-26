<template>
  <div class="home-wrapper">
    <h1 class="title">SEQUENCE</h1>

    <div class="user-name">
      <p>Your nickname:</p>
      <input v-model="userName" />

      <transition name="fade">
        <div v-show="isShowSaveButton" class="save-icon" @click.stop="saveNickname">
          <save-icon color="#0B61A4" />
        </div>
      </transition>
    </div>

    <create-room v-if="isCreateRoomMode" @close="isCreateRoomMode = false" />

    <button v-else class="create-room-button empty-button" @click="isCreateRoomMode = true">Create room</button>
  </div>
</template>

<script>
import saveIcon from '../components/icons/save-icon.vue';
import createRoom from '../components/CreateRoom.vue';

export default {
  name: 'home',

  data() {
    return {
      isShowSaveButton: false,
      isCreateRoomMode: false,
    }
  },

  created() {
    this.userName = localStorage.getItem('userName')
      || `Player${Math.floor(Math.random() * 100)}`;
  },

  computed: {
    userName: {
      get() {
        return this.$store.state.userName;
      },
      set(value) {
        if (!value) {
          return;
        }

        if (value !== localStorage.getItem('userName')) {
          this.isShowSaveButton = true;
        }

        this.$store.commit('setUserName', value);
      }
    }
  },

  methods: {
    saveNickname() {
      this.isShowSaveButton = false;
      localStorage.setItem('userName', this.userName);
    }
  },

  components: {
    saveIcon,
    createRoom
  },
}
</script>

<style scoped lang="sass">
@import "../styles/_variables"

.home-wrapper
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.title
  color: $primaryColor
  margin-bottom: 40px

.user-name
  display: flex
  align-items: center
  gap: 6px
  margin-bottom: 20px
  height: 40px
  width: 300px

  p
    white-space: nowrap

  input
    font-size: 14px
    font-weight: 500
    color: $primaryColor

.save-icon
  cursor: pointer

.create-room-button
  width: 300px
  margin-bottom: 20px

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0


</style>
