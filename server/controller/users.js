import moment from 'moment';
import validations from '../middlewares/validations';
import utils from '../helpers/commons';
import UserModel from '../models/users';
import Responses from '../helpers/response';

/**
 * @function createAccount
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

export const createAccount = (req, res) => {
  const {
    firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
  } = req.body;
  const result = validations.validateCreateUser(req.body);
  if (result.error) {
    const errorMsg = result.error.details[0].message;
    Responses.setError(400, errorMsg.replace(/[^a-zA-Z ]/g, ''));
    return Responses.send(res);
  }
  const userValues = [firstName, lastName, email, utils.hashPassword(password),
    gender, jobRole, department, address, isAdmin, moment().format()];
  UserModel.signup(userValues, res);
};

/**
 * @function signin
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */
export const signin = (req, res) => {
  const { email, password } = req.body;
  const result = validations.validateSignin(req.body);
  if (result.error) {
    const errorMsg = result.error.details[0].message;
    Responses.setError(400, errorMsg.replace(/[^a-zA-Z ]/g, ''));
    return Responses.send(res);
  }
  const userEmail = [email];
  UserModel.signin(userEmail, res, password);
};
