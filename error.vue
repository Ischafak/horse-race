<template>
  <div>
    <SidebarNavigation v-if="isLogged" @slim-value="changeSlimValue" />
    <div
      :class="[navbarClass, isLogged ? (menuSlim ? 'md:ml-[92px]' : 'md:ml-[280px]') : '']"
      class="transition-[margin] duration-300 ease-out vl-parent"
    >
      <div class="error-page max-w-[587px] mx-auto flex items-center justify-center md:py-14 py-6">
        <div class="text-center">
          <div class="md:px-6 px-2.5">
            <!-- <img src="/Data/404-new.svg" alt="404-image" class="mx-auto" /> -->
          </div>
          <div class="">
            <p class="error-page-header">
              Sayfa bulunamadı.
            </p>
            <p class="md:mt-6 mt-1 error-page-text">
              Bu sayfa mevcut değil. Lütfen başka bir sayfaya geçiniz.
            </p>
            <VButton
              class="mt-4"
              type="primary"
              size="xl"
              right-icon="arrow-right"
              icon-size="muk-xl"
              is-stroked
              :text="'Anasayfa’ya Git' "
              rounded
              :href="'/'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'

export default {
  setup () {
    const title = ref('At Yarışı Oyunu | Sayfa bulunamadı.')
    const description = ref(
      'At Yarışı Oyunu'
    )

    // This will be reactive even you change title/description above
    useHead({
      title,
      meta: [
        {
          name: 'description',
          content: description
        }
      ]
    })
  },
  data () {
    return {
      menuSlim: false
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.error-page {
  min-height: calc(100vh - 116px);
  @media (max-width: 992px) {
    min-height: calc(100vh - 106px);
  }

  .error-page-header {
    @apply md:text-dmuk-md text-dmuk-xs font-medium text-gray-900;
  }

  .error-page-text {
    @apply text-muk-md md:font-normal font-medium mt-4 text-gray-700;
  }
}
</style>
