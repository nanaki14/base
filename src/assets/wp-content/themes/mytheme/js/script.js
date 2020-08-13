import * as Util from './modules/util'
import Inview from './modules/inview'
import { barbaInit } from './modules/barba'

const inview = new Inview('js-inview', 'is-inview')

barbaInit()

window.addEventListener('load', () => {
  console.log(Util.ua().ios)
  console.log(Util.ua().android)
  console.log(Util.mq().isSp)
  Util.socialShare('https://google.com', 'fuga')
  Util.smoothScroll()
  inview.setup()
})

window.addEventListener('scroll', () => {
  inview.start()
})
