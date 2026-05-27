import { next, rewrite } from '@vercel/edge'

/**
 * Accept: text/markdown content negotiation.
 *
 * The corresponding `rewrites` rule in vercel.json does NOT fire for paths
 * that resolve to an existing static asset (e.g. `/embedded-wallets/index.html`),
 * which is every documentation page on this site. Vercel Edge Middleware
 * runs before static file serving, so it's the only place we can route
 * `Accept: text/markdown` requests to the `.md` sibling that
 * `docusaurus-plugin-llms` (wrapped by `src/plugins/llms-html-injector`) emits
 * next to each page.
 *
 * The matcher excludes static asset directories so the middleware doesn't run
 * on every image, font, or script request. The `\.[a-zA-Z0-9]+$` clause
 * excludes any path that already ends in an extension (`/foo.md`, `/foo.png`,
 * `/llms-snaps.txt`, etc.) so those are served unmodified.
 */
export const config = {
  matcher: ['/((?!_next|api|img|js|fonts|logos|.*\\.[a-zA-Z0-9]+$).*)'],
}

export default function middleware(request: Request) {
  const accept = request.headers.get('accept') || ''
  if (!/text\/markdown/i.test(accept)) return next()

  const url = new URL(request.url)
  if (url.pathname.endsWith('.md')) return next()

  let pathname = url.pathname
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1)
  if (!pathname) return next()

  url.pathname = `${pathname}.md`
  return rewrite(url)
}
