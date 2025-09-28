<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <div
        id="content-panel"
        class="transition-[margin] duration-300 ease-out"
      >
        <div class="vl-parent">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  // Layout logic here if needed
}
</script>
