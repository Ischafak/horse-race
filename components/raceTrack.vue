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
      <div class="lane-numbers">
        <div
          v-for="(horse, index) in horses"
          :key="`lane-${index}`"
          class="relative"
        >
          <div
            class="lane-number"
            :class="{ 'winner-lane-number': winnerHorseId === horse.id }"
          >
            <p class="winner-text">
              {{ index + 1 }}
            </p>
          </div>
        </div>
      </div>

      <div class="track-lanes">
        <div
          v-for="(horse, index) in horses"
          :key="`track-${index}`"
          class="lane"
        >
          <div class="lane-lines"></div>

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

      <div class="finish-line"></div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/store/store.js'

const store = useStore()

defineProps({
  distance: Number
})

const horses = computed(() => store.currentRoundHorses)
const results = computed(() => store.currentRoundResults)
const currentRound = computed(() => store.currentRound)

const winnerHorseId = computed(() => {
  const currentRoundData = store.raceResults.find(r => r.round === store.currentRound)
  const winnerId = currentRoundData?.winnerHorseId

  if (winnerId) {
    const winnerHorse = horses.value.find(horse => horse.id === winnerId)
    console.log('Winner horse found:', winnerHorse)
    return winnerHorse && winnerHorse.status === 'finished' ? winnerId : null
  }

  return null
})

function getTime (horseId) {
  const res = results.value.find(r => r.horseId === horseId)
  return res ? res.time : 0
}

function isHorseRunning (horseId) {
  const horse = horses.value.find(h => h.id === horseId)
  const status = horse ? horse.status : 'not-started'
  console.log('isHorseRunning', horseId, status, 'running:', status === 'running')
  return status === 'running'
}

function getHorseStyle (horseId) {
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

  // Rastgele animasyon eğrisi seç
  const easingOptions = [
    'ease-out', // Başta hızlı, sonda yavaş
    'ease-in', // Başta yavaş, sonda hızlı
    'ease-in-out', // Başta yavaş, ortada hızlı, sonda yavaş
    'linear' // Sabit hız
  ]

  // Gerçek rastgele eğri seç
  const easingIndex = Math.floor(Math.random() * easingOptions.length)
  const easing = easingOptions[easingIndex]

  return {
    left: `${progress}%`,
    transform: 'translateY(-50%)',
    transition: `left ${animationDuration}s ${easing}`
  }
}
</script>

<style scoped>
.race-track {
  @apply bg-gray-100 rounded-lg p-5 my-5 relative;
}

.track-header {
  @apply flex justify-between mb-2.5 font-bold;
}

.lap-info {
  @apply text-red-600 text-lg;
}

.finish-label {
  @apply text-red-600 text-lg;
}

.track-container {
  @apply flex relative bg-gray-200 rounded p-2.5;
}

.lane-numbers {
  @apply flex flex-col gap-0.5 mr-2.5;
}

.lane-number {
  @apply w-7.5 h-10 bg-green-600 text-white flex items-center justify-center font-bold rounded text-sm;
}

.track-lanes {
  @apply flex-1 relative;
  height: 420px; /* 10 şerit * 40px + 2px gap */
}

.lane {
  @apply relative h-10 mb-0.5 border-b-2 border-dashed border-gray-400 last:border-b-0;
}

.lane-lines {
  @apply absolute inset-0;
  background: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 20px,
    #d1d5db 20px,
    #d1d5db 22px
  );
}

.horse-container {
  @apply absolute top-1/2 z-10;
}

.horse-icon {
  @apply drop-shadow-md;
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
  @apply absolute right-0 top-0 bottom-0 w-1 bg-red-600 rounded-sm;
}

/* Kazanan atın yeşil alanının içine kupa ikonu */
.winner-lane-number::before {
  content: "🏆";
  @apply absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base z-30;
}

/* Kazanan atın numarasını gizle */
.winner-lane-number .winner-text {
  @apply invisible;
}
</style>
