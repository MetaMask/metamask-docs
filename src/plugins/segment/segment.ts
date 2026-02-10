import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import siteConfig from '@generated/docusaurus.config'

// Only run on client-side
if (!ExecutionEnvironment.canUseDOM) {
  // Do nothing on server-side
} else {
  const { SEGMENT_ANALYTICS_KEY } = siteConfig.customFields
  const isProd = process.env.NODE_ENV === 'production'
  const isVercel = process.env.VERCEL === '1'

  // Only initialize Segment in production or Vercel deployments
  if ((isProd || isVercel) && typeof window !== 'undefined' && SEGMENT_ANALYTICS_KEY) {
    // Load Segment script
    ;(function () {
      var analytics = ((window as any).analytics = (window as any).analytics || [])
      if (!analytics.initialize) {
        if (analytics.invoked) {
          if (window.console && console.error) {
            console.error('Segment snippet included twice.')
          }
          return
        }
        analytics.invoked = true
        analytics.methods = [
          'trackSubmit',
          'trackClick',
          'trackLink',
          'trackForm',
          'pageview',
          'identify',
          'reset',
          'group',
          'track',
          'ready',
          'alias',
          'debug',
          'page',
          'once',
          'off',
          'on',
          'addSourceMiddleware',
          'addIntegrationMiddleware',
          'setAnonymousId',
          'addDestinationMiddleware',
        ]
        analytics.factory = function (method: string) {
          return function () {
            var args = Array.prototype.slice.call(arguments)
            args.unshift(method)
            analytics.push(args)
            return analytics
          }
        }
        for (var i = 0; i < analytics.methods.length; i++) {
          var key = analytics.methods[i]
          analytics[key] = analytics.factory(key)
        }
        analytics.load = function (key: string, options: any) {
          var script = document.createElement('script')
          script.type = 'text/javascript'
          script.async = true
          script.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js'
          var first = document.getElementsByTagName('script')[0]
          first.parentNode?.insertBefore(script, first)
          analytics._loadOptions = options
        }
        analytics.SNIPPET_VERSION = '4.15.3'
        analytics.load(SEGMENT_ANALYTICS_KEY as string, {
          cookie: { sameSite: 'None', secure: true },
        })
      }
    })()

    // Track initial page view
    ;(window as any).analytics.page()

    // Track subsequent page views on route changes
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      originalPushState.apply(history, args)
      // Use setTimeout to ensure the page change is complete
      setTimeout(() => {
        ;(window as any).analytics.page()
      }, 0)
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args)
      // Use setTimeout to ensure the page change is complete
      setTimeout(() => {
        ;(window as any).analytics.page()
      }, 0)
    }

    window.addEventListener('popstate', () => {
      // Use setTimeout to ensure the page change is complete
      setTimeout(() => {
        ;(window as any).analytics.page()
      }, 0)
    })
  }
}

export default null
