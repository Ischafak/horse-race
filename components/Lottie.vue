<template>
  <div :class="'loading-animation-size-' + (smallSize ? 'small' : 'big')">
    <Vue3Lottie
      ref="anim"
      :animation-data="loader"
      :loop="true"
    />
  </div>
</template>

<script>
import loader from '../animation/loading.json'

export default {
  name: 'Lottie',
  props: {
    smallSize: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loader
    }
  },

  unmounted () {
    try {
      if (this.$refs.anim && this.$refs.anim.destroy) {
        this.$refs.anim.destroy()
      }
    } catch (err) {
      console.warn('Lottie destroy failed:', err)
    }
  }
}
</script>

<style>
.loading-animation-size-big svg {
  width: 900px !important;
}
.loading-animation-size-small svg {
  width: 300px !important;
}
</style>
