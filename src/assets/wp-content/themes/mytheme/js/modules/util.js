import { UAParser } from 'ua-parser-js'
import { TweenLite, Power3 } from 'gsap'
const ScrollToPlugin = require('gsap/ScrollToPlugin') // eslint-disable-line no-unused-vars

/**
 * user agent判定関数 (ua.ios or ua.android のように使う)
 */
export const ua = () => {
  var parser = new UAParser()
  const os = parser.getOS()
  return {
    ie: parser.getBrowser() === 'IE',
    ios: os === 'iOS',
    android: os === 'Android',
  }
}

/**
 * メディアクエリ判定関数 必要に応じて拡張して使ってください
 */

export const mq = () => {
  const breakpoints = {
    s: 767,
  }
  return {
    isSp: window.matchMedia(`screen and (max-width: ${breakpoints.s}px)`)
      .matches,
  }
}

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
      if (ua().ios || ua().android) {
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
  const scrollLink = document.getElementsByClassName('js-smoothScroll')
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
            autoKill: false,
          },
          ease: Power3.easeOut,
        })
      })
    }
  }
}
