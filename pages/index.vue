<template>
  <div class="py-6">
    <loading
      :active="isLoading"
      :is-full-page="true"
      :enforce-focus="true"
      class="rounded-lg"
    >
      <div>
        <Lottie />
      </div>
    </loading>
    <!-- Race Controls -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <race-controls
          @next-race="nextRace"
          @start-race="startRace"
          @reset-race="resetRace"
        />
      </div>
    </div>

    <!-- Race Track -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <race-track
          v-if="roundHorses.length"
          :distance="roundDistances[currentRound]"
        />
      </div>
    </div>

    <!-- Results Section -->
    <div v-if="store.allResults.length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">
          All Race Results
        </h2>

        <!-- Grid Layout for Race Results -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="(roundData, roundIndex) in finishedRaces" :key="roundIndex" class="mb-6">
            <h3 class="text-lg font-semibold mb-3 text-blue-600">
              Round {{ roundData.round + 1 }} - {{ roundData.distance }}m
            </h3>

            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horse
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Color
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
                      <NuxtLink
                        :to="`/horse/${result.horseId}`"
                        class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {{ result.name }}
                      </NuxtLink>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ result.time }}s
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <div
                          class="w-4 h-4 rounded-full mr-2"
                          :class="`bg-${result.color}`"
                        >
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from '~/store/store.js'

const store = useStore()
const isLoading = ref(false)

const horses = computed(() => store.allHorses)
const roundHorses = computed(() => store.currentRoundHorses)
const currentRound = computed(() => store.currentRound)
const results = computed(() => store.currentRoundResults)
const finishedRaces = computed(() => store.allResults.filter(round => round.finished))
const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200]

const startSound = ref(null)

const raceStartTimeout = ref(null)
const raceEndTimeout = ref(null)

onMounted(() => {
  startSound.value = new Audio('/sound/race-start.mp3')
  startSound.value.preload = 'auto'
})

function clearRaceTimeouts () {
  if (raceStartTimeout.value) {
    clearTimeout(raceStartTimeout.value)
    raceStartTimeout.value = null
  }
  if (raceEndTimeout.value) {
    clearTimeout(raceEndTimeout.value)
    raceEndTimeout.value = null
  }
}

onBeforeUnmount(() => {
  clearRaceTimeouts()

  const currentRoundData = store.raceResults.find(r => r.round === store.currentRound)
  if (currentRoundData && !currentRoundData.finished) {
    store.raceResults = store.raceResults.filter(r => r.round !== store.currentRound)

    store.roundHorses.forEach((horse) => {
      horse.status = 'not-started'
    })
  }

  if (startSound.value) {
    startSound.value.pause()
    startSound.value.currentTime = 0
  }
})

store.initHorses()

if (store.currentRoundHorses.length === 0) {
  store.selectRoundHorses()
}

function nextRace () {
  if (store.currentRound >= roundDistances.length) { return }

  store.nextRound()

  store.selectRoundHorses()
}

function resetRace () {
  store.resetRace()
}

function startRace () {
  if (store.currentRound >= roundDistances.length || roundHorses.value.length === 0) { return }

  const distance = roundDistances[store.currentRound]

  if (startSound.value) {
    startSound.value.play().catch((error) => {
      console.log('Sound play error:', error)
    })
  }

  raceStartTimeout.value = setTimeout(() => {
    roundHorses.value.forEach((horse) => {
      horse.status = 'running'
    })

    const raceResults = roundHorses.value.map((horse) => {
      const baseSpeed = Math.floor(Math.random() * (41)) + 180
      const speedMultiplier = Math.max(0.7, Math.min(1.0, horse.condition / 100))
      const time = distance / (baseSpeed * speedMultiplier)
      return {
        horseId: horse.id,
        name: horse.name,
        color: horse.color,
        condition: horse.condition,
        time: parseFloat(time.toFixed(2))
      }
    }).sort((a, b) => a.time - b.time)

    store.saveRoundResults(store.currentRound, raceResults, distance)

    const maxTime = Math.max(...raceResults.map(r => r.time))

    roundHorses.value.forEach((horse) => {
      const result = raceResults.find(r => r.horseId === horse.id)
      if (result) {
        setTimeout(() => {
          horse.status = 'finished'
          horse.condition = Math.max(10, horse.condition - 10)
        }, result.time * 1000)
      }
    })

    raceEndTimeout.value = setTimeout(() => {
      store.finishCurrentRace()
    }, maxTime * 1000)
  }, 4000)
}

</script>
