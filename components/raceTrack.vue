<template>
  <div class="race-track">
    <div class="track-header">
      <div class="lap-info">
        {{ currentRound + 1 }}. Tur {{ distance }}m
      </div>
      <div class="finish-label">
        FINISH
      </div>
    </div>

    <div class="track-container">
      <!-- Şerit numaraları -->
      <div class="lane-numbers">
        <div
          v-for="(horse, index) in horses"
          :key="`lane-${index}`"
          class="lane-number"
        >
          {{ index + 1 }}
        </div>
      </div>

      <!-- Yarış pisti -->
      <div class="track-lanes">
        <div
          v-for="(horse, index) in horses"
          :key="`track-${index}`"
          class="lane"
        >
          <!-- Şerit çizgileri -->
          <div class="lane-lines"></div>

          <!-- At ikonu -->
          <div
            class="horse-container"
            :style="getHorseStyle(horse.id)"
          >
            <div class="horse-item" :class="{ 'horse-running': isHorseRunning(horse.id) }">
              <v-icon
                name="horse-riding-icon"
                :is-filled="true"
                :icon-color="horse.color"
                size="dmuk-md"
                class="horse-icon"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Finish çizgisi -->
      <div class="finish-line"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  horses: Array,
  distance: Number,
  results: Array,
  currentRound: Number
})

function getTime (horseId) {
  const res = props.results.find(r => r.horseId === horseId)
  return res ? res.time : 0
}

function isHorseRunning (horseId) {
  const horse = props.horses.find(h => h.id === horseId)
  const status = horse ? horse.status : 'not-started'
  console.log('isHorseRunning', horseId, status, 'running:', status === 'running')
  return status === 'running'
}

function getHorseStyle (horseId) {
  console.log('getHorseStyle', horseId)
  const time = getTime(horseId)
  if (time === 0) {
    const rotation = Math.sin(Date.now() * 0.005 + horseId) * 3
    return {
      left: '0%',
      transform: `translateY(-50%) rotate(${rotation}deg)`,
      transition: 'left 0.1s ease-out, transform 0.1s ease-out'
    }
  }

  const progress = 100

  const animationDuration = time

  return {
    left: `${progress}%`,
    transform: 'translateY(-50%)',
    transition: `left ${animationDuration}s ease-out`
  }
}
</script>

<style scoped>
.race-track {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  position: relative;
}

.track-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
}

.lap-info {
  color: #dc2626;
  font-size: 18px;
}

.finish-label {
  color: #dc2626;
  font-size: 18px;
}

.track-container {
  display: flex;
  position: relative;
  background: #e5e7eb;
  border-radius: 4px;
  padding: 10px;
}

.lane-numbers {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 10px;
}

.lane-number {
  width: 30px;
  height: 40px;
  background: #16a34a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 4px;
  font-size: 14px;
}

.track-lanes {
  flex: 1;
  position: relative;
  height: 420px; /* 10 şerit * 40px + 2px gap */
}

.lane {
  position: relative;
  height: 40px;
  margin-bottom: 2px;
  border-bottom: 2px dashed #9ca3af;
}

.lane:last-child {
  border-bottom: none;
}

.lane-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 20px,
    #d1d5db 20px,
    #d1d5db 22px
  );
}

.horse-container {
  position: absolute;
  top: 50%;
  z-index: 10;
}

.horse-icon {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}

.horse-item {
  /* Varsayılan durum - sallanma yok */
}

.horse-item.horse-running {
  animation: horseShake 0.5s ease-in-out infinite alternate;
}

@keyframes horseShake {
  0% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg);
  }
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #dc2626;
  border-radius: 2px;
}
</style>
