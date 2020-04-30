import Vue from 'vue'
import Vuex from 'vuex'
import data from '../assets/data'
Vue.use(Vuex)

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export default new Vuex.Store({
  state: {
    mapData: data.map,
    cards: shuffle(data.cards),
    teams: {
      red: {
        name: 'red',
        points: 0,
        players: [
          { id: 0, name: 'Player1', team: 'red' },
        ]
      },
      blue: {
        name: 'blue',
        points: 0,
        players: [
          { id: 1, name: 'Player2', team: 'blue' },
        ]
      },
      green: {
        name: 'green',
        points: 0,
        players: []
      }
    },
    teamPlayersCount: {
      red: 1,
      blue: 1,
      green: 0
    },
    totalCount: 2,
    notification: null,
    currentUserIndex: 0,
    players: [],
  },
  getters: {
    teamsArray(state) {
      return _.map(state.teams)
    },
    playersCount(state) {
      const { red, blue, green } = state.teamPlayersCount
      return red + blue + green
    },
    players(state) {

    },
    redTeamPoints(state) {
      return state.teams.red.points
    },
    blueTeamPoints(state) {
      return state.teams.blue.points
    },
    greenTeamPoints(state) {
      return state.teams.green.points
    },
  },
  mutations: {
    addPlayer(state, teamName) {
      state.totalCount++
      state.teams[teamName].players.push({
        id: state.totalCount,
        name: `Player${state.totalCount}`,
        team: teamName
      })
      state.teamPlayersCount[teamName]++
    },
    removePlayer(state, { id, team }) {
      state.teams[team].players = _.remove(
        state.teams[team].players,
        (player) => {
          return player.id !== id
        }) || []
      state.teamPlayersCount[team]--
    },
    changePlayerName(state, { id, team, name }) {
      state.teams[team].players = state.teams[team].players.map((player) => {
        if (player.id === id) {
          return { ...player, name }
        }
        return player
      })
    },
    setNotification(state, text) {
      state.notification = text
    },
    removeNotification(state) {
      state.notification = null
    },
    selectCard(state, index) {
      const { currentUserIndex, players, mapData } = state
      if ( mapData[index].busy !== 'all') {
        mapData[index].busy = players[currentUserIndex].team
        state.currentUserIndex = currentUserIndex + 1 === players.length ? 0 : currentUserIndex + 1
      }
    },
    setPlayers(state) {
      const redsTeam = state.teams.red.players
      const bluesTeam = state.teams.blue.players
      const greensTeam = state.teams.green.players
      const denom = (redsTeam.length && 1) + (bluesTeam.length && 1) + (greensTeam.length && 1)
      const numbOfIteration = (redsTeam.length + bluesTeam.length + greensTeam.length) / denom
      const result = []

      for(let index = 0; index < numbOfIteration; index++) {
        redsTeam[index] && result.push(redsTeam[index])
        bluesTeam[index] && result.push(bluesTeam[index])
        greensTeam[index] && result.push(greensTeam[index])
      }

      state.players = result
    }
  },

  actions: {
    calculate({ state }, { startPosition, team, step }) {
      const { mapData } = state
      for(
        let index = startPosition + step, iterationsCount = 0;
        iterationsCount < 4;
        index += step, iterationsCount++
      ) {
        if (!mapData[index]) return false
        if (!(mapData[index].busy === team || mapData[index].busy === 'all')) return false
      }
      return true
    },
    async calculatePoints({ state, dispatch }, index) {
      const { currentUserIndex, players } = state
      const { team } = players[currentUserIndex]
      let resultPoints = 0

      resultPoints += await dispatch('calculate', { startPosition: index, team, step: -11 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: -10 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: -9 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: 1 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: 11 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: 10 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: 9 })
      resultPoints += await dispatch('calculate', { startPosition: index, team, step: -1 })

      state.teams[team].points += resultPoints
      return state.teams[team].points >= 2 ? team : null
    },
  }
})
