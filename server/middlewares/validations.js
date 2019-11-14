import Joi from '@hapi/joi';

const validateCreateUser = (data) => {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    firstName: Joi.string().required().error((_error) => ({ message: 'First name is required' })),
    lastName: Joi.string().required().error((_error) => ({ message: 'Last name is required' })),
    gender: Joi.string().required().error((_error) => ({ message: 'Gender is required' })),
    address: Joi.string().required().error((_error) => ({ message: 'Address is required' })),
    password: Joi.string().required().error((_error) => ({ message: 'Password is required' })),
    jobRole: Joi.string().required().error((_error) => ({ message: 'Job role is required' })),
    department: Joi.string().required().error((_error) => ({ message: 'Department is required' })),
    isAdmin: Joi.string().required().error((_error) => ({ message: 'is_admin is required' })),
  };
  return Joi.validate(data, schema);
};

const validateSignin = (data) => {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().error((_error) => ({ message: 'Password is required' })),
  };
  return Joi.validate(data, schema);
};

const validations = {
  validateCreateUser,
  validateSignin,
};

export default validations;
