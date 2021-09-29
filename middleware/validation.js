
import Utils from '../app/utils'
import * as yup from 'yup'
module.exports = {
  validateAddProposal: async (req, res, next) => {
    const schema = yup.object().shape({
      proposalTitle: yup.string().required(),
      startDate: yup.string().required(),
      endDate: yup.date().required(),
      pollingContract : yup.string().required(),
      status : yup.string().required()
    })
    await validate(schema, req.body, res, next, req)
  }
}
const validate = async (schema, reqData, res, next, req) => {
  try {
    await schema.validate(reqData, { abortEarly: false })
    next()
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({ path, message, value }))
    if (errors && errors.length) {
      return Utils.handleError(errors[0].message, req, res)
    }
  }
}