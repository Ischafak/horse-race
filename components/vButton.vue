<template>
  <NuxtLink
    v-if="href"
    class="m-button1 vld-parent m-button-link"
    :class="[
      'button-type-' + type,
      'button-size-' + size,
      rounded ? 'rounded-full' : 'rounded-lg',
    ]"
    :to="href"
    :target="target ? '_blank' : undefined"
    :disabled="disabled || isLoading"
  >
    <loading :active="isLoading" :is-full-page="true">
      <div>
        <Lottie small-size />
      </div>
    </loading>
    <div class="flex items-center justify-center gap-2">
      <div v-if="leftIcon" class="arrow-icon inline-block">
        <v-icon
          :name="leftIcon"
          :icon-color="iconColor"
          :is-stroked="isIconStroked"
          :is-filled="isIconFilled"
          :size="iconSize ? iconSize : leftIconSize"
          filled
        />
      </div>
      <p v-if="text">
        {{ text }}
      </p>
      <div v-if="rightIcon" :class="isHaveRightIconNegativeMargin ? '-ml-1' : ''">
        <v-icon
          :name="rightIcon"
          :icon-color="iconColor"
          :is-stroked="isIconStroked"
          :is-filled="isIconFilled"
          :size="iconSize ? iconSize : rightIconSize"
          filled
        />
      </div>
    </div>
  </NuxtLink>

  <button
    v-else
    class="m-button1"
    :class="[
      'button-type-' + type,
      'button-size-' + size,
      rounded ? 'rounded-full' : 'rounded-lg',
    ]"
    :disabled="disabled || isLoading"
    :type="buttonType"
  >
    <loading :active="isLoading" :is-full-page="false">
      <div>
        <Lottie small-size />
      </div>
    </loading>
    <div class="flex items-center gap-2 justify-center">
      <div v-if="leftIcon" class="arrow-icon inline-block">
        <v-icon
          :name="leftIcon"
          :icon-color="iconColor"
          :is-stroked="isIconStroked"
          :is-filled="isIconFilled"
          :size="iconSize ? iconSize : leftIconSize"
          filled
        />
      </div>
      <p v-if="text">
        {{ text }}
      </p>
      <div v-if="rightIcon" class="arrow-icon inline-block" :class="isHaveRightIconNegativeMargin ? '-ml-1' : ''">
        <v-icon
          :name="rightIcon"
          :icon-color="iconColor"
          :is-stroked="isIconStroked"
          :is-filled="isIconFilled"
          :size="iconSize ? iconSize : rightIconSize"
          filled
        />
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: null
    },
    target: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'normal'
    },
    leftIcon: {
      type: String
    },
    rightIcon: {
      type: String
    },
    iconColor: {
      type: String,
      default: null
    },
    isIconStroked: {
      type: Boolean,
      default: true
    },
    isIconFilled: {
      type: Boolean,
      default: false
    },
    isHaveRightIconNegativeMargin: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: ''
    },
    leftIconSize: {
      type: String,
      default: ''
    },
    rightIconSize: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.m-button1 {
  .button-icon {
    @apply text-base;
  }
}
</style>
