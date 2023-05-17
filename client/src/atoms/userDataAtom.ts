import { atomWithStorage } from 'jotai/utils'

export const userDataAtom = atomWithStorage('userData', {
    login: false
})