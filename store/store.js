export const useStore = defineStore('race', {
  state: () => ({
    // Tüm atlar
    horses: [],
    // Mevcut turda yarışan atlar
    roundHorses: [],
    // Tüm yarış sonuçları - her tur için ayrı array
    raceResults: [], // [{ round: 1, results: [...], distance: 1200 }, ...]
    currentRound: 0,
    totalRounds: 5
  }),
  getters: {
    // Tüm atlar
    allHorses: state => state.horses,
    // Mevcut turda yarışan atlar
    currentRoundHorses: state => state.roundHorses,
    // Mevcut turun sonuçları
    currentRoundAllResults: (state) => {
      return state.raceResults.find(r => r.round === state.currentRound) || {}
    },
    currentRoundResults: (state) => {
      return state.raceResults.find(r => r.round === state.currentRound)?.results || []
    },
    allResults: state => state.raceResults,
    topWinningHorses: (state) => {
      const horseWins = {}

      // Her at için kazanma sayısını hesapla
      state.raceResults.forEach((round) => {
        if (round.results && round.results.length > 0) {
          const winner = round.results[0] // İlk sıradaki at kazanan
          horseWins[winner.horseId] = (horseWins[winner.horseId] || 0) + 1
        }
      })

      // Atları kazanma sayısına göre sırala
      return state.horses
        .map(horse => ({
          ...horse,
          wins: horseWins[horse.id] || 0
        }))
        .sort((a, b) => b.wins - a.wins)
    }
  },
  actions: {
    // Atları başlat
    initHorses () {
      if (this.horses.length > 0) { return } // Zaten varsa tekrar oluşturma

      const colors = [
        'red-500', 'green-500', 'blue-500', 'yellow-500', 'purple-500',
        'pink-500', 'indigo-500', 'orange-500', 'teal-500', 'cyan-500',
        'lime-500', 'amber-500', 'emerald-500', 'violet-500', 'sky-500',
        'fuchsia-500', 'slate-500', 'stone-500', 'brown-500', 'gray-500'
      ]

      this.horses = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `At ${i + 1}`,
        color: colors[i % colors.length],
        condition: Math.floor(Math.random() * 20) + 80, // 80-100 arası condition
        status: 'not-started' // not-started, running, finished
      }))
    },

    // Tur sonuçlarını kaydet
    saveRoundResults (round, results, distance) {
      const existingIndex = this.raceResults.findIndex(r => r.round === round)
      const roundData = {
        round,
        results,
        distance,
        finished: false, // Yarış henüz bitmedi
        timestamp: new Date().toISOString()
      }

      if (existingIndex >= 0) {
        // Güncelle
        this.raceResults[existingIndex] = roundData
      } else {
        // Yeni ekle
        this.raceResults.push(roundData)
      }
    },

    // Sonraki tura geç
    nextRound () {
      if (this.currentRound < this.totalRounds) {
        this.currentRound++
      }
    },

    // Mevcut turda yarışan atları seç
    selectRoundHorses () {
      this.roundHorses = [...this.horses]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)

      // Atları not-started yap
      this.roundHorses.forEach((horse) => {
        horse.status = 'not-started'
      })
    },

    // Yarışı sıfırla
    resetRace () {
      this.raceResults = []
      this.currentRound = 0
      // Atları da sıfırla
      this.horses.forEach((horse) => {
        horse.condition = Math.floor(Math.random() * 20) + 80
        horse.status = 'not-started'
      })
    },

    // Belirli turun sonuçlarını getir
    getRoundResults (round) {
      return this.raceResults.find(r => r.round === round)
    },

    // Mevcut turun yarışını bitir
    finishCurrentRace () {
      const roundIndex = this.raceResults.findIndex(r => r.round === this.currentRound)
      if (roundIndex >= 0) {
        this.raceResults[roundIndex].finished = true
      }
    }
  }
})
