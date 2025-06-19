export function onRouteDidUpdate({ location, previousLocation }) {
  if (!previousLocation && location.hash) {
    return;
  }
  if (previousLocation && 
      location.pathname === previousLocation.pathname && 
      location.hash) {
    return;
  }
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
      window.scrollTo(0, 0)
    }
  }

  setTimeout(handleScroll, 0)
}
