import * as Util from './modules/util'
import Inview from './modules/inview'

const inview = new Inview('js-inview', 'is-inview')

window.addEventListener('load', () => {
  Util.socialShare('https://google.com', 'fuga')
  Util.smoothScroll()
  inview.setup()
})

window.addEventListener('scroll', () => {
  inview.start()
})

const hoge = 'test'
console.log(hoge)
