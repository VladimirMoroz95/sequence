<template>
  <div class="room-wrapper">
    <input
      v-if="isEditRoomNameMode"
      class="room-name"
      @keydown.enter="isEditRoomNameMode = false"
      v-model="roomName"
    />
    <h2 v-else class="room-name" @click.stop="isEditRoomNameMode = true">{{ roomName }}</h2>

    <h3 class="room-type-label">Select number of players:</h3>
    <div class="room-type-wrapper">
      <span
        v-for="type in roomTypes"
        :key="type"
        :class="['room-type', { 'room-type__active': activeType === type }]"
        @click="activeType = type"
      >
        {{ type }}
      </span>
    </div>

    <button class="success-button" @click="createRoom">Create room</button>
    <button class="error-button" @click="$emit('close')">Cancel room</button>
  </div>
</template>

<script>
export default {
  name: 'create-room',

  data() {
    return {
      roomName: 'Room name',
      isEditRoomNameMode: false,
      roomTypes: ['2', '3', '4', '6', '8'],
      activeType: '2'
    }
  },

  methods: {
    createRoom() {

    }
  },
}
</script>

<style scoped lang="sass">
@import "../styles/_variables"

.room-wrapper
  display: flex
  flex-direction: column
  border: 1px solid $primaryColor
  border-radius: 10px
  padding: 20px
  margin-bottom: 25px
  height: auto
  width: 300px
  box-sizing: border-box

.add-player
  color: var(--team-color)
  font-size: 14px
  font-weight: 600
  margin-left: 5px

.room-name
  font-size: 22px
  font-weight: 700
  color: $primaryColor
  cursor: pointer
  margin-bottom: 8px

.room-type-label
  font-size: 16px
  margin-bottom: 12px

.room-type-wrapper
  display: flex
  justify-content: center
  width: 100%
  gap: 12px

.room-type
  font-size: 26px
  font-weight: 800
  color: $shadowColor
  cursor: pointer

  &__active
    color: $primaryColor

  &:hover
    color: $primaryColor

.success-button
  margin: 15px 0

</style>
