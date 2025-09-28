<template>
  <header class="bg-white shadow-sm border-b border-gray-200 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="/data/game-logo.png" alt="At Yarışı Oyunu" class="h-8 w-auto">
          </NuxtLink>
        </div>

        <!-- Navigation Menu -->
        <nav class="hidden md:flex space-x-8">
          <template v-for="item in menuItems" :key="item.id">
            <NuxtLink
              :to="item.to"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            @click="toggleMobileMenu"
          >
            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu - Absolute positioned -->
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <template v-for="item in menuItems" :key="item.id">
            <NuxtLink
              :to="item.to"
              class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      isMobileMenuOpen: false,
      menuItems: [
        {
          id: 'home',
          label: 'Home',
          to: '/'
        },
        {
          id: 'horses',
          label: 'Horses',
          to: '/horses'
        },
        {
          id: 'statistics',
          label: 'Statistics',
          to: '/statistics'
        }
      ]
    }
  },
  methods: {
    toggleMobileMenu () {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu () {
      this.isMobileMenuOpen = false
    }
  }
}
</script>
