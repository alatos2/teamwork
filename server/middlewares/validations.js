import joi from '@hapi/joi';

const validateCreateUser = (data) => {
  const schema = {
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    first_name: joi.string().required().error((_error) => ({ message: 'First name is required' })),
    last_name: joi.string().required().error((_error) => ({ message: 'Last name is required' })),
    gender: joi.string().required().error((_error) => ({ message: 'Gender is required' })),
    address: joi.string().required().error((_error) => ({ message: 'Address is required' })),
    password: joi.string().required().error((_error) => ({ message: 'Password is required' })),
    job_role: joi.string().required().error((_error) => ({ message: 'Job role is required' })),
    department: joi.string().required().error((_error) => ({ message: 'Department is required' })),
    is_admin: joi.string().required().error((_error) => ({ message: 'is_admin is required' })),
  };
  return joi.validate(data, schema);
};

const validations = {
  validateCreateUser,
};

export default validations;
