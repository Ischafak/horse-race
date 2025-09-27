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

    <div v-if="store.allResults.length" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">
        Tüm Yarış Sonuçları
      </h2>

      <div v-for="(roundData, roundIndex) in store.allResults" :key="roundIndex" class="mb-6">
        <h3 class="text-lg font-semibold mb-3 text-blue-600">
          Round {{ roundData.round }} - {{ roundData.distance }}m
        </h3>

        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sıra
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  At
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Süre
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renk
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(result, resultIndex) in roundData.results"
                :key="resultIndex"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ resultIndex + 1 }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ getHorseName(result.horseId) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {{ result.time }}s
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-4 h-4 rounded-full mr-2"
                      :class="`bg-${getHorseColor(result.horseId)}`"
                    >
                    </div>
                    <span class="text-sm text-gray-600">{{ getHorseColor(result.horseId) }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- En Çok Kazanan Atlar Tablosu -->
    <div v-if="store.allResults.length" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">
        🏆 En Çok Kazanan Atlar
      </h2>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-gradient-to-r from-yellow-50 to-yellow-100">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sıra
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                At
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kazanma Sayısı
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Renk
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(horse, index) in store.topWinningHorses"
              :key="horse.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                <div class="flex items-center">
                  <span v-if="index === 0" class="text-yellow-500 text-lg mr-2">🥇</span>
                  <span v-else-if="index === 1" class="text-gray-400 text-lg mr-2">🥈</span>
                  <span v-else-if="index === 2" class="text-orange-500 text-lg mr-2">🥉</span>
                  <span v-else class="text-gray-400 mr-2">{{ index + 1 }}.</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                {{ horse.name }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="horse.wins > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                >
                  {{ horse.wins }} {{ horse.wins === 1 ? 'kazanma' : 'kazanma' }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 rounded-full mr-2"
                    :class="`bg-${horse.color}`"
                  >
                  </div>
                  <span class="text-sm text-gray-600">{{ horse.color }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="horse.condition >= 80 ? 'bg-green-500' : horse.condition >= 60 ? 'bg-yellow-500' : 'bg-red-500'"
                      :style="`width: ${horse.condition}%`"
                    >
                    </div>
                  </div>
                  <span class="text-xs text-gray-600">{{ horse.condition }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '~/store/store.js'

// Store'u kullan
const store = useStore()

const roundHorses = ref([])

const horses = computed(() => store.allHorses)
const currentRound = computed(() => store.currentRound)
const results = computed(() => store.currentRoundResults)
const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200]

// Store'dan atları başlat
store.initHorses()

// İlk geldiğinde atları göster ama round'u artırma
roundHorses.value = [...horses.value]
  .sort(() => Math.random() - 0.5)
  .slice(0, 10)

roundHorses.value.forEach((horse) => {
  horse.status = 'not-started'
})

function nextRace () {
  if (store.currentRound >= roundDistances.length) { return }

  // 10 rastgele at seç
  roundHorses.value = [...horses.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)

  // Atları not-started yap
  roundHorses.value.forEach((horse) => {
    horse.status = 'not-started'
  })

  // Store'da sonraki tura geç
  store.nextRound()
}

function startRace () {
  if (store.currentRound >= roundDistances.length || roundHorses.value.length === 0) { return }

  const distance = roundDistances[store.currentRound]

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

    // Store'a sonuçları kaydet
    store.saveRoundResults(store.currentRound, raceResults, distance)

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

function getHorseColor (id) {
  const h = horses.value.find(h => h.id === id)
  return h?.color || 'gray-500'
}
</script>
