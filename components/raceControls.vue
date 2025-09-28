<template>
  <div>
    <div class="button-group">
      <v-button
        text="Next Race"
        type="primary"
        size="sm"
        :disabled="(store.currentRound >= store.totalRounds) || (!currentRoundAllResults?.finished)"
        @click="$emit('nextRace')"
      />
      <v-button
        text="Start Race"
        type="primary-dark"
        size="sm"
        :disabled="(Object.keys(currentRoundAllResults).length !== 0)"
        @click="$emit('startRace')"
      />
      <v-button
        v-if="(store.currentRound >= store.totalRounds)"
        text="Reset Race"
        type="primary"
        size="sm"
        @click="$emit('resetRace')"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/store/store.js'
defineEmits(['nextRace', 'startRace', 'resetRace'])

const store = useStore()

const currentRoundAllResults = computed(() => store.currentRoundAllResults)
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 10px;
}
</style>
