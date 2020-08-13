import barba from '@barba/core'
import { headMetaReplace } from './head'
import { commnTransition } from './transitions/common'

export const barbaInit = () => {
  headMetaReplace()
  barba.init({
    ...commnTransition,
    logLevel: 0,
  })
}
