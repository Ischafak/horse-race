<template>
  <div>
    <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#00aa6b 0%,#9c74ff 100%)" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
export default {
  provide () {
    return {

    }
  },
  setup () {
    // window.addEventListener('scroll', this.handleScroll);
    const title = ref('At Yarışı Oyunu')
    const description = ref(
      'At Yarışı Oyunu'
    )

    // This will be reactive even you change title/description above
    useHead({
      title,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: description
        },
        {
          name: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:image',
          content: '/data/logo/atyarisi_logo.svg'
        },
        {
          property: 'og:image:alt',
          content: title
        },
        {
          property: 'og:locale',
          content: 'tr'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: title
        },
        {
          property: 'twitter:title',
          content: title
        },
        {
          property: 'twitter:description',
          content: description
        },
        {
          property: 'twitter:image:alt',
          content: description
        },
        {
          property: 'twitter:creator',
          content: '@atyarisi'
        },
        {
          property: 'twitter:site',
          content: '@atyarisi'
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    })
  },
  data () {
    return {

    }
  },
  computed: {
  },
  watch: {

  },
  created () {

  },
  beforeMount () {

  },

  methods: {

  }
}

</script>
