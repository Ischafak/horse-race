<template>
  <nuxt-icon
    :name="name"
    :class="[
      iconColor ? `text-${iconColor}` : '',
      size ? `text-${size}` : 'text-base',
      isStroked ? 'icon-stroke-color' : '',
      isFilled ? 'icon-fill-color' : '',
    ]"
    :filled="filled"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    filled: {
      type: Boolean,
      default: false
    },
    isStroked: {
      type: Boolean,
      default: false
    },
    isFilled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-stroke {
  stroke-width: 1.5;
  stroke: currentColor;
}
</style>
