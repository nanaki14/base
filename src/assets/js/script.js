import {_uaDevice, share, smoothScroll} from './util'

window.addEventListener('load', () => {
  console.log(_uaDevice.Tablet)
  console.log(_uaDevice.Mobile)
  console.log(!_uaDevice.Mobile && !_uaDevice.Tablet)

  share('https://google.com', 'fuga')
  smoothScroll()
})
