<template>
  <div>
    <h1>At Yarışı Oyunu</h1>

    <race-controls
      :current-round="currentRound"
      :can-start-race="roundHorses.length > 0"
      @nextRace="nextRace"
      @startRace="startRace"
    />

    <race-track
      v-if="roundHorses.length"
      :horses="roundHorses"
      :distance="roundDistances[currentRound]"
      :results="results"
      :current-round="currentRound"
    />

    <div v-if="results.length">
      <h2>Sonuçlar</h2>
      <ol>
        <li v-for="(res, index) in results" :key="index">
          {{ getHorseName(res.horseId) }} - {{ res }} sn
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const horses = ref([])
const roundHorses = ref([])
const results = ref([])

const currentRound = ref(0)
const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200]

function initHorses () {
  console.log('initHorses')
  const colors = [
    'red-500', // saf kırmızı
    'orange-500', // turuncu
    'amber-500', // sarımsı-turuncu
    'yellow-500', // saf sarı
    'lime-500', // sarı-yeşil
    'green-500', // klasik yeşil
    'emerald-500', // yeşil-mavi arası
    'teal-500', // turkuaz
    'cyan-500', // açık turkuaz
    'sky-500', // gök mavisi
    'blue-500', // saf mavi
    'indigo-500', // koyu mavi-mor
    'violet-500', // menekşe
    'fuchsia-500', // parlak mor-pembe
    'pink-500', // açık pembe
    'stone-500', // toprak rengi
    'neutral-500', // nötr gri
    'slate-500', // koyu gri-mavi
    'zinc-500', // gri-metal
    'amber-700' // koyu kahveye yakın amber
  ]

  horses.value = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `At ${i + 1}`,
    color: colors[i % colors.length],
    condition: Math.floor(Math.random() * 20) + 80, // 80-100 arası condition
    status: 'not-started' // not-started, running, finished
  }))
}
initHorses()
// İlk geldiğinde atları göster ama round'u artırma
roundHorses.value = [...horses.value]
  .sort(() => Math.random() - 0.5)
  .slice(0, 10)

roundHorses.value.forEach((horse) => {
  horse.status = 'not-started'
})

function nextRace () {
  if (currentRound.value >= roundDistances.length) { return }

  // Results'ı temizle
  results.value = []

  // 10 rastgele at seç
  roundHorses.value = [...horses.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)

  // Atları not-started yap
  roundHorses.value.forEach((horse) => {
    horse.status = 'not-started'
  })

  currentRound.value++
}

function startRace () {
  if (currentRound.value >= roundDistances.length || roundHorses.value.length === 0) { return }

  const distance = roundDistances[currentRound.value]

  // 2 saniye sonra tüm atları aynı anda başlat
  setTimeout(() => {
    roundHorses.value.forEach((horse) => {
      horse.status = 'running'
    })

    const raceResults = roundHorses.value.map((horse) => {
      const baseSpeed = 200
      const speedMultiplier = Math.max(0.7, Math.min(1.0, horse.condition / 100))
      const time = distance / (baseSpeed * speedMultiplier)
      return {
        horseId: horse.id,
        time: parseFloat(time.toFixed(2))
      }
    }).sort((a, b) => a.time - b.time)

    // Tüm atlar aynı anda başlasın
    results.value = raceResults

    // Her atın kendi süresinde bitirmesini sağla
    roundHorses.value.forEach((horse) => {
      const result = raceResults.find(r => r.horseId === horse.id)
      if (result) {
        setTimeout(() => {
          horse.status = 'finished'
          // Sadece bu yarışta koşan atın condition'ı 10 azalt
          const oldCondition = horse.condition
          horse.condition = Math.max(10, horse.condition - 10)
          console.log(`${horse.name} condition: ${oldCondition} → ${horse.condition}`)
        }, result.time * 1000) // Animasyon süresiyle uyumlu
      }
    })
  }, 2000)
}

function getHorseName (id) {
  const h = horses.value.find(h => h.id === id)
  return h?.name || 'Bilinmeyen At'
}
</script>
