import barba from '@barba/core'
import { headMetaReplace } from './head'

export const barbaInit = () => {
  headMetaReplace()
  barba.init({
    logLevel: 0,
  })
}
