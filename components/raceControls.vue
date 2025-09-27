<template>
  <div>
    <p>Round: {{ currentRound + 1 }} / 6</p>
    <button @click="$emit('startRace')" :disabled="currentRound >= 6">
      Yarışı Başlat
    </button>
  </div>
</template>

<script setup>
defineProps(['currentRound'])
</script>
