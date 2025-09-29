<template>
  <div class="py-6">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="horse" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <div class="w-16 h-16 rounded-full mr-4 flex items-center justify-center" :class="`bg-${horse.color}`">
              <v-icon
                name="horse-riding-icon"
                :is-filled="true"
                icon-color="white"
                size="dmuk-lg"
              />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">
                {{ horse.name }}
              </h1>
              <p class="text-gray-600">
                Horse ID: {{ horse.id }}
              </p>
            </div>
          </div>
          <NuxtLink to="/" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            ← Back to Races
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Condition -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Condition
            </h3>
            <div class="flex items-center">
              <div class="w-full bg-gray-200 rounded-full h-3 mr-3">
                <div
                  class="h-3 rounded-full transition-all duration-300"
                  :class="horse.condition >= 80 ? 'bg-green-500' : horse.condition >= 60 ? 'bg-yellow-500' : 'bg-red-500'"
                  :style="`width: ${horse.condition}%`"
                ></div>
              </div>
              <span class="text-lg font-bold text-gray-900">{{ horse.condition }}%</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Total Wins
            </h3>
            <div class="text-3xl font-bold text-gray-900">
              {{ horseWins }}
            </div>
            <p class="text-sm text-gray-600">
              from {{ totalRaces }} races
            </p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-2">
              Win Rate
            </h3>
            <div class="text-3xl font-bold text-gray-900">
              {{ winRate }}%
            </div>
            <p class="text-sm text-gray-600">
              success rate
            </p>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Race History
          </h2>
          <div v-if="horseRaceHistory.length" class="space-y-3">
            <div
              v-for="(race, index) in horseRaceHistory"
              :key="index"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span class="text-sm font-bold text-blue-600">{{ race.position }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">
                    Round {{ race.round + 1 }} - {{ race.distance }}m
                  </p>
                  <p class="text-sm text-gray-600">
                    Time: {{ race.time }}s
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="race.position === 1 ? 'bg-yellow-100 text-yellow-800' : race.position <= 3 ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'"
                >
                  {{ race.position === 1 ? '🥇 Winner' : race.position <= 3 ? `#${race.position}` : `#${race.position}` }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            No race history available for this horse.
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Performance Over Time
          </h2>
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="chart-container">
              <apexchart
                type="line"
                :options="chartOptions"
                :series="chartSeries"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-sm font-medium text-gray-500 mb-2">
            Horse Color
          </h3>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full mr-3" :class="`bg-${horse.color}`"></div>
            <span class="text-lg font-medium text-gray-900 capitalize">{{ horse.color.replace('-', ' ') }}</span>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-lg shadow-sm p-6 text-center">
        <div class="text-6xl mb-4">
          🐎
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Horse Not Found
        </h1>
        <p class="text-gray-600 mb-4">
          The horse you're looking for doesn't exist.
        </p>
        <NuxtLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Back to Races
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '~/store/store.js'

const store = useStore()
const route = useRoute()

const horseId = parseInt(route.params.id)
const horse = computed(() => store.allHorses.find(h => h.id === horseId))

const horseWins = computed(() => {
  return store.topWinningHorses.find(h => h.id === horseId)?.wins || 0
})

const totalRaces = computed(() => {
  return store.allResults.length
})

const winRate = computed(() => {
  if (totalRaces.value === 0) { return 0 }
  return Math.round((horseWins.value / totalRaces.value) * 100)
})

const horseRaceHistory = computed(() => {
  const history = []
  store.allResults.forEach((round) => {
    if (round.results) {
      const horseResult = round.results.find(r => r.horseId === horseId)
      if (horseResult) {
        const position = round.results.findIndex(r => r.horseId === horseId) + 1
        history.push({
          round: round.round,
          distance: round.distance,
          time: horseResult.time,
          position
        })
      }
    }
  })
  return history.sort((a, b) => a.round - b.round)
})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'line',
      height: 300,
      toolbar: {
        show: false
      }
    },
    colors: ['#2E90FA'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: horseRaceHistory.value.map(race => `Round ${race.round + 1}`),
      title: {
        text: 'Race Rounds'
      }
    },
    yaxis: {
      title: {
        text: 'Position'
      },
      min: 1,
      max: 10,
      reversed: true
    },
    title: {
      text: 'Race Performance',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `Position: ${value}`
        }
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 8
      }
    }
  }
})

const chartSeries = computed(() => {
  if (horseRaceHistory.value.length === 0) {
    return [{
      name: 'Position',
      data: []
    }]
  }

  return [{
    name: 'Position',
    data: horseRaceHistory.value.map(race => race.position)
  }]
})
</script>

<style lang="scss" scoped>
.chart-container {
  @apply w-full;
}
</style>
