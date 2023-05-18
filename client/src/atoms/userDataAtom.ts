import { atomWithStorage } from 'jotai/utils'

interface userData {
    login: boolean
    _id?: string | undefined
    guid?: string | undefined
    isActive?: boolean | undefined,
    balance?: string | undefined
    picture?: string | undefined
    age?: number | undefined,
    eyeColor?: string | undefined
    name?: {
      first?: string | undefined
      last?: string | undefined
    },
    company?: string | undefined
    email?: string | undefined
    phone?: string | undefined
    address?: string | undefined
}

export const userDataAtom = atomWithStorage<userData>('userData', { login: false })