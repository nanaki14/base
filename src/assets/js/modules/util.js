import { TweenLite, Power3 } from 'gsap'
const ScrollToPlugin = require('gsap/ScrollToPlugin') // eslint-disable-line no-unused-vars

/**
 * user agent
 * @param {string}
*/
export const uaDevice = ((u) => {
  return {
    Tablet:
      (u.indexOf('windows') !== -1 &&
        u.indexOf('touch') !== -1 &&
        u.indexOf('tablet pc') === -1) ||
      u.indexOf('ipad') !== -1 ||
      (u.indexOf('android') !== -1 && u.indexOf('mobile') === -1) ||
      (u.indexOf('firefox') !== -1 && u.indexOf('tablet') !== -1) ||
      u.indexOf('kindle') !== -1 ||
      u.indexOf('silk') !== -1 ||
      u.indexOf('playbook') !== -1,
    Mobile:
      (u.indexOf('windows') !== -1 && u.indexOf('phone') !== -1) ||
      u.indexOf('iphone') !== -1 ||
      u.indexOf('ipod') !== -1 ||
      (u.indexOf('android') !== -1 && u.indexOf('mobile') !== -1) ||
      (u.indexOf('firefox') !== -1 && u.indexOf('mobile') !== -1) ||
      u.indexOf('blackberry') !== -1
  }
})(window.navigator.userAgent.toLowerCase())

/**
 * 各種シェア
 * @param {string}
*/

export const socialShare = (url, title) => {
  const twitterShare = document.getElementsByClassName('js-twitterShare')
  const facebookShare = document.getElementsByClassName('js-facebookShare')
  const pocketShare = document.getElementsByClassName('js-pocketShare')
  const hatenaShare = document.getElementsByClassName('js-hatenaShare')
  const lineShare = document.getElementsByClassName('js-lineShare')
  const shareBtn = document.getElementsByClassName('js-shareBtn')
  if (twitterShare.length) {
    for (let i = 0; i < twitterShare.length; i++) {
      twitterShare[i].setAttribute(
        'href',
        `http://twitter.com/share?url=${url}&text=${title}`
      )
    }
  }
  if (facebookShare.length) {
    for (let i = 0; i < facebookShare.length; i++) {
      facebookShare[i].setAttribute(
        'href',
        `http://www.facebook.com/sharer.php?u=${url}&t=${title}`
      )
    }
  }
  if (pocketShare.length) {
    for (let i = 0; i < pocketShare.length; i++) {
      pocketShare[i].setAttribute(
        'href',
        `http://getpocket.com/edit?url=${url}&title=${title}`
      )
    }
  }
  if (hatenaShare.length) {
    for (let i = 0; i < pocketShare.length; i++) {
      pocketShare[i].setAttribute(
        'href',
        `http://b.hatena.ne.jp/entry/${window.location}`
      )
    }
  }
  if (lineShare.length) {
    for (let i = 0; i < lineShare.length; i++) {
      if (uaDevice.Tablet || uaDevice.Mobile) {
        lineShare[i].setAttribute(
          'href',
          `line://msg/text/?${encodeURIComponent(title + '\n')}${url}`
        )
      } else {
        lineShare[i].setAttribute(
          'href',
          `http://line.me/R/msg/text/?${encodeURIComponent(title)}`
        )
      }
    }
  }
  if (shareBtn.length) {
    for (let i = 0; i < shareBtn.length; i++) {
      shareBtn[i].addEventListener('click', (e) => {
        e.preventDefault()
        const windowUrl = shareBtn[i].getAttribute('href')
        window.open(
          windowUrl,
          'shareWindow',
          'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
        )
      })
    }
  }
}

/**
 * スムーススクロール
 * @param {number} - 止まる位置
*/
export const smoothScroll = (offset) => {
  let scrollLink = document.getElementsByClassName('js-smoothScroll')
  const _offset = offset || 0
  if (scrollLink) {
    for (let i = 0; i < scrollLink.length; i++) {
      scrollLink[i].addEventListener('click', (e) => {
        e.preventDefault()
        const hash = scrollLink[i].getAttribute('href')
        const _target = document.querySelector(`${hash}`)
        TweenLite.to(window, 0.6, {
          scrollTo: {
            y: _target,
            offsetY: _offset,
            autoKill: false
          },
          ease: Power3.easeOut
        })
      })
    }
  }
}
