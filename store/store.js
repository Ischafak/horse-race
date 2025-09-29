export const useStore = defineStore('race', {
  state: () => ({
    horses: [],
    roundHorses: [],
    raceResults: [],
    currentRound: 0,
    totalRounds: 5
  }),
  getters: {
    allHorses: state => state.horses,
    currentRoundHorses: state => state.roundHorses,
    currentRoundAllResults: (state) => {
      return state.raceResults.find(r => r.round === state.currentRound) || {}
    },
    currentRoundResults: (state) => {
      return state.raceResults.find(r => r.round === state.currentRound)?.results || []
    },
    allResults: state => state.raceResults,
    topWinningHorses: (state) => {
      const horseWins = {}

      state.raceResults.forEach((round) => {
        if (round.results && round.results.length > 0) {
          const winner = round.results[0]
          horseWins[winner.horseId] = (horseWins[winner.horseId] || 0) + 1
        }
      })

      return state.horses
        .map(horse => ({
          ...horse,
          wins: horseWins[horse.id] || 0
        }))
        .sort((a, b) => b.wins - a.wins)
    }
  },
  actions: {
    initHorses () {
      if (this.horses.length > 0) { return }

      const colors = [
        'red-500', 'green-500', 'blue-500', 'yellow-500', 'purple-500',
        'pink-500', 'indigo-500', 'orange-500', 'teal-500', 'cyan-500',
        'lime-500', 'amber-500', 'emerald-500', 'violet-500', 'sky-500',
        'fuchsia-500', 'slate-500', 'stone-500', 'brown-500', 'gray-500'
      ]

      this.horses = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Horse ${i + 1}`,
        color: colors[i % colors.length],
        condition: Math.floor(Math.random() * 20) + 80,
        status: 'not-started'
      }))
    },

    saveRoundResults (round, results, distance) {
      const existingIndex = this.raceResults.findIndex(r => r.round === round)
      const roundData = {
        round,
        results,
        distance,
        finished: false,
        timestamp: new Date().toISOString(),
        winnerHorseId: results && results.length > 0 ? results[0].horseId : null
      }

      if (existingIndex >= 0) {
        this.raceResults[existingIndex] = roundData
      } else {
        this.raceResults.push(roundData)
      }
    },

    nextRound () {
      if (this.currentRound < this.totalRounds) {
        this.currentRound++
      }
    },

    selectRoundHorses () {
      this.roundHorses = [...this.horses]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)

      this.roundHorses.forEach((horse) => {
        horse.status = 'not-started'
      })
    },

    resetRace () {
      this.raceResults = []
      this.currentRound = 0
      this.roundHorses = []
      this.horses.forEach((horse) => {
        horse.condition = Math.floor(Math.random() * 20) + 80
        horse.status = 'not-started'
      })
    },

    finishCurrentRace () {
      const roundIndex = this.raceResults.findIndex(r => r.round === this.currentRound)
      if (roundIndex >= 0) {
        this.raceResults[roundIndex].finished = true
      }
    }
  }
})
