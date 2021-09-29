import Utils from "../app/utils";
import * as yup from "yup";

module.exports = {
  validateRequest: async (req, res, next) => {
    const schema = yup.object().shape({
      address: yup.string().required(),
      allowVoting: yup.boolean().required(),
      allowProposalCreation: yup.boolean().required(),
    });
    await validate(schema, req.body, res, next, req);
  },
  validateAddProposal: async (req, res, next) => {
    const schema = yup.object().shape({
      proposalTitle: yup.string().required(),
      startDate: yup.string().required(),
      endDate: yup.number().required(),
      pollingContract : yup.string().required(),
      status : yup.string().required()
    })
    await validate(schema, req.body, res, next, req)
  }
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    Utils.responseForValidation(res, errors);
  }
};
