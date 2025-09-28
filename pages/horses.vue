<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-3xl font-bold mb-8 text-gray-900">
          🐎 All Horses
        </h1>

        <div v-if="store.allHorses.length" class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead class="bg-gradient-to-r from-blue-50 to-blue-100">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horse
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wins
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="horse in store.allHorses"
                :key="horse.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ horse.id }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                  <NuxtLink
                    :to="`/horse/${horse.id}`"
                    class="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                  >
                    <v-icon
                      name="horse-riding-icon"
                      :is-filled="true"
                      :icon-color="horse.color"
                      size="dmuk-sm"
                      class="mr-2"
                    />
                    {{ horse.name }}
                  </NuxtLink>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-6 h-6 rounded-full"
                      :class="`bg-${horse.color}`"
                    >
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex items-center">
                    <div class="w-20 bg-gray-200 rounded-full h-2 mr-3">
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
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="horseWins[horse.id] > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ horseWins[horse.id] || 0 }} {{ (horseWins[horse.id] || 0) === 1 ? 'win' : 'wins' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-12">
          <div class="text-gray-500 text-lg">
            No horses available.
          </div>
          <div class="text-gray-400 text-sm mt-2">
            Horses will be generated automatically.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '~/store/store.js'

const store = useStore()

// Her at için kazanma sayısını hesapla
const horseWins = computed(() => {
  const wins = {}
  
  store.allResults.forEach(round => {
    if (round.results && round.results.length > 0) {
      const winner = round.results[0] // İlk sıradaki at kazanan
      wins[winner.horseId] = (wins[winner.horseId] || 0) + 1
    }
  })
  
  return wins
})
</script>
