import Utils from "../app/utils";
import * as yup from "yup";

module.exports = {
  validateRequest: async (requestData) => {
    const schema = yup.object().shape({
      address: yup.string().required(),
      allowVoting: yup.boolean().required(),
      allowProposalCreation: yup.boolean().required(),
    });
    await UtilMethods.validateData(schema, requestData);
  },
};

module.exports = {
  validateAddProposal: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
  },
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
