import yup from './MsgValidator'

const userValidator = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().max(50).min(8)
})

export const loginValidator = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().max(50).min(8)
})

export default userValidator
