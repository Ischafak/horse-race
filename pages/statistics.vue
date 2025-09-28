<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-3xl font-bold mb-8 text-gray-900">
          🏆 Top Winning Horses
        </h1>

        <!-- Statistics Chart -->
        <div v-if="store.allResults.length" class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Win Distribution Chart
          </h2>
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="chart-container">
              <apexchart
                type="donut"
                :options="chartOptions"
                :series="chartSeries"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div v-if="store.allResults.length" class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead class="bg-gradient-to-r from-yellow-50 to-yellow-100">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horse
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wins
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
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
                  <NuxtLink
                    :to="`/horse/${horse.id}`"
                    class="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {{ horse.name }}
                  </NuxtLink>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="horse.wins > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ horse.wins }} {{ horse.wins === 1 ? 'win' : 'wins' }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-4 h-4 rounded-full mr-2"
                      :class="`bg-${horse.color}`"
                    >
                    </div>
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

        <div v-else class="text-center py-12">
          <div class="text-gray-500 text-lg">
            No race results available yet.
          </div>
          <div class="text-gray-400 text-sm mt-2">
            Start some races to see statistics!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '~/store/store.js'
import { getTailwindColor } from '~/utils/colors.js'

const store = useStore()

// Chart options
const chartOptions = computed(() => {
  const topHorses = store.topWinningHorses.filter(horse => horse.wins > 0).slice(0, 8) // Sadece kazanan atlar

  return {
    chart: {
      type: 'donut',
      height: 400,
      toolbar: {
        show: false
      }
    },
    colors: topHorses.map(horse => getTailwindColor(horse.color)),
    labels: topHorses.map(horse => horse.name),
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 500
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#374151'
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1F2937',
              formatter: function (val) {
                return val
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Wins',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#6B7280',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Top Winning Horses',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1F2937'
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value} ${value === 1 ? 'win' : 'wins'}`
        }
      }
    }
  }
})

// Chart series
const chartSeries = computed(() => {
  const topHorses = store.topWinningHorses.filter(horse => horse.wins > 0).slice(0, 8) // Sadece kazanan atlar

  return topHorses.map(horse => horse.wins)
})
</script>

<style scoped>
.chart-container {
  @apply w-full;
}
</style>
