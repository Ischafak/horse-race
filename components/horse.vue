<template>
  <div class="horse">
    <div class="horse-name">
      {{ horse.name }}
    </div>
    <div class="horse-time">
      {{ time }}s
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  horse: Object,
  distance: Number,
  time: Number
})
</script>

<style scoped>
.horse {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
}

.horse-name {
  color: #374151;
}

.horse-time {
  color: #6b7280;
  font-size: 10px;
}
</style>
