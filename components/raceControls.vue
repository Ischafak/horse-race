<template>
  <div>
    <p>Round: {{ currentRound + 1 }} / 6</p>
    <div class="button-group">
      <button :disabled="currentRound >= 6" @click="$emit('nextRace')">
        Sonraki Yarış
      </button>
      <button :disabled="currentRound >= 6 || !canStartRace" @click="$emit('startRace')">
        Yarışı Başlat
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '~/store/store.js'

const store = useStore()

const currentRound = computed(() => store.currentRound)
const canStartRace = computed(() => store.currentRoundHorses.length > 0)
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
