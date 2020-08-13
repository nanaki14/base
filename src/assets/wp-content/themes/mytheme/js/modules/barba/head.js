import barba from '@barba/core'

export const headMetaReplace = () => {
  barba.hooks.beforeEnter(({ current, next }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log({ current })
      console.log({ next })
    }
    const newPageHead = jQuery('<head />').html(
      jQuery.parseHTML(
        next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
        document,
        true
      )
    )

    const headTags = [
      "meta[name='keywords']",
      "meta[name='description']",
      "meta[property^='og']",
      "meta[name^='twitter']",
      'meta[itemprop]',
      'link[itemprop]',
      "link[rel='prev']",
      "link[rel='next']",
      "link[rel='canonical']",
      "link[rel='alternate']",
    ].join(',')
    jQuery('head').find(headTags).remove()
    newPageHead.find(headTags).appendTo('head')
  })
}
