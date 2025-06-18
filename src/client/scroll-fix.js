export function onRouteDidUpdate({ location, previousLocation }) {
  function handleScroll() {
    const items = document.querySelectorAll('.menu__link--active')
    if (items?.length === 0) return

    const item = items[items.length - 1]
    const bounding = item.getBoundingClientRect()
    const isVisible =
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    if (!isVisible) {
      item.scrollIntoView({ block: 'start', inline: 'nearest' })
    }
  }

  setTimeout(handleScroll, 0)
}
