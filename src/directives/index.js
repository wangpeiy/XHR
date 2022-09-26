export const imgerror = {
  inserted(el, options) {
    console.log(el)
    console.log(options)
    el.onerror = () => {
      el.src = options.value
    }
  }
}
