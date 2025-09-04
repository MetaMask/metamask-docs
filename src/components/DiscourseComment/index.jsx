import { useEffect } from 'react'

export default function DiscourseComment(props) {
  // eslint-disable-next-line react/prop-types
  const { postUrl } = props
  useEffect(() => {
    const url = window.location.href
    if (!url.includes('https://metamask.io/')) {
      return
    } else {
      window.DiscourseEmbed = {
        discourseUrl: 'https://builder.metamask.io/',
        discourseEmbedUrl: postUrl,
      }

      const d = document.createElement('script')
      d.type = 'text/javascript'
      d.async = true
      d.src = `${window.DiscourseEmbed.discourseUrl}javascripts/embed.js`
      ;(
        document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
      ).appendChild(d)
    }
  }, [])

  return (
    <>
      <meta name="discourse-username" content="shahbaz"></meta>
      <div id="discourse-comments" />
    </>
  )
}
