export const getWindowLocation = () => {
  if (typeof window !== 'undefined') return window.location.href
  return 'http://localhost'
}

export const getURLOptions = () => {
  const url = new URL(getWindowLocation())

  const urlOpts = new Map<string, string>()
  url.searchParams.forEach((value, key) => {
    urlOpts.set(key, value)
  })

  return Object.fromEntries(urlOpts)
}

export const getURLFromFilterOptions = (opts: Record<string, string>): string => {
  const url = new URL(getWindowLocation())
  url.search = ''
  for (const [key, value] of Object.entries(opts)) url.searchParams.append(key, value)
  return url.toString()
}
