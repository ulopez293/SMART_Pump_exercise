import { atomWithStorage } from 'jotai/utils'

export const userDataAtom = atomWithStorage('userData', {
    login: false,
    // _id: ``,
    // guid: ``,
    // isActive: false,
    // balance: ``,
    // picture: ``,
    // age: 0,
    // eyeColor: ``,
    // name: {
    //   first: ``,
    //   last: ``,
    // },
    // company: ``,
    // email: ``,
    // phone: ``,
    // address: ``
})