<template>
  <NuxtLink :to="`/horse/${horse.id}`" class="block">
    <div v-tippy="horse.name" class="horse-item" :class="{ 'horse-running': isHorseRunning }">
      <v-icon
        name="horse-riding-icon"
        :is-filled="true"
        :icon-color="horse.color"
        size="dmuk-md"
        class="horse-icon hover:scale-110 transition-transform cursor-pointer"
      />
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '~/store/store.js'

const props = defineProps({
  horse: {
    type: Object,
    required: true
  }
})

const store = useStore()

const isHorseRunning = computed(() => {
  return props.horse.status === 'running'
})
</script>

<style lang="scss" scoped>
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

</style>
