import validations from '../middlewares/validations';
import utils from '../helpers/commons';
import pool from '../models/database';
import { addUser } from '../models/queries';

/**
 * @function create_account
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

export const createAccount = (req, res) => {
  try {
    const {
      firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
    } = req.body;
    const result = validations.validateCreateUser(req.body);
    if (result.error) {
      const errorMsg = result.error.details[0].message;
      return res.status(400).json({
        status: 'error',
        error: errorMsg.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    const isValid = utils.validateEmail(email);
    if (!isValid) {
      return res.status(400).json({
        status: 'error',
        error: 'Email is not valid',
      });
    }
    const userData = {
      firstName, lastName, email, password: utils.hashPassword(password), gender, jobRole, department, address, isAdmin,
    };
    pool.connect((err, client, done) => {
      client.query(addUser(userData), (error, result) => {
        done();
        if (error) {
          if (error.code === '23505') {
            return res.status(400).json({
              status: 'error',
              error: 'Email already exists',
            });
          }
        }
        const user = result.rows[0];
        const userToken = utils.jwtToken({ id: user.id, email: user.email, isAdmin: user.is_admin });
        return res.status(201).json({
          status: 'success',
          data: {
            message: 'User account successfully created',
            token: userToken,
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        });
      });
    });
  } catch (e) { return res.status(500).json({ status: 'error', error: 'Server Error' }); }
};

export default createAccount;
