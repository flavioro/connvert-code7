import yup from './MsgValidator'

const DebtValidator = yup.object().shape({
  description: yup.string().required().min(1).max(200),
  client_id: yup.number().required(),
  date: yup.date().required(),
  value: yup.number().required()
})
export default DebtValidator
