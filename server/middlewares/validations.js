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

const validateArticle = (data) => {
  const schema = {
    title: Joi.string().required().error((_error) => ({ message: 'Article title is required' })),
    article: Joi.string().required().error((_error) => ({ message: 'Article body is required' })),
  };
  return Joi.validate(data, schema);
};

const validateGif = (data) => {
  const schema = {
    title: Joi.string().required().error((_error) => ({ message: 'Article title is required' })),
    image: Joi.string().required().error((_error) => ({ message: 'Gif image is required' })),
  };
  return Joi.validate(data, schema);
};

const validateComment = (data) => {
  const schema = {
    comment: Joi.string().required().error((_error) => ({ message: 'Comment is required' })),
  };
  return Joi.validate(data, schema);
};

const validateGifComment = (data) => {
  const schema = {
    comment: Joi.string().required().error((_error) => ({ message: 'Comment is required' })),
  };
  return Joi.validate(data, schema);
};

const validations = {
  validateCreateUser,
  validateSignin,
  validateArticle,
  validateGif,
  validateComment,
  validateGifComment,
};

export default validations;
