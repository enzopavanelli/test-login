import { v4 as uuid } from 'uuid'

interface SignInReqData {
  email: string
  password: string
}

export function signInReq({ email, password }: SignInReqData) {
  if (email !== 'enzopvn@hotmail.com' && password !== '123456') {
    throw new Error()
  }

  return {
    token: uuid(),
    user: {
      name: 'Enzo Pavanelli',
      email: 'enzopvn@hotmail.com',
    },
  }
}

export function recoverUserData() {
  return {
    user: {
      name: 'Enzo Pavanelli',
      email: 'enzopvn@hotmail.com',
    },
  }
}
