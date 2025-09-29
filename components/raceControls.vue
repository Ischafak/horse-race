<template>
  <div>
    <div class="button-group">
      <v-button
        text="Start Race"
        type="primary-dark"
        size="sm"
        right-icon="play"
        icon-size="muk-md"
        is-stroked
        :disabled="(Object.keys(currentRoundAllResults).length !== 0)"
        @click="$emit('startRace')"
      />
      <v-button
        text="Next Race"
        type="primary"
        size="sm"
        right-icon="arrow-right"
        icon-size="muk-md"
        is-stroked
        :disabled="(store.currentRound >= store.totalRounds) || (!currentRoundAllResults?.finished)"
        @click="$emit('nextRace')"
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

<style lang="scss" scoped>
.button-group {
  display: flex;
  gap: 10px;
}
</style>
