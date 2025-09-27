export default {
  scrollBehavior (to) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop - '80'
      })
    }
    return window.scrollTo({ top: 0 })
  }
}
