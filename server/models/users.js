import pool from './database';
import utils from '../helpers/commons';
import Responses from '../helpers/response';

/**
 * @class
 * @description A container class for all models
 * @exports UserModel
 */
export default class UserModel {
  /**
   * @method
   * @description Model to create a user account
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserModel
   */
  static signup(values, res) {
    const text = 'INSERT INTO users (first_name,last_name,email,password,gender,job_role,department,address,is_admin,created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    pool.connect((error, client, done) => {
      client
        .query(text, values)
        .then((result) => {
          const user = result.rows[0];
          const userToken = utils.jwtToken({ id: user.id, email: user.email, isAdmin: user.is_admin });
          const userData = {
            message: 'User account successfully created',
            token: userToken,
            userId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          };
          Responses.setSuccess(201, { ...userData });
          return Responses.send(res);
        })
        .catch((e) => {
          Responses.setError(500, 'Server error');
          return Responses.send(res);
        });
    });
  }

  /**
   * @method
   * @description Model to sign a user in
   * @static
   * @param {object} email - email
   * @param {object} res - Response object
   * @param {object} password - password
   * @returns {object} JSON response
   * @memberof UserModel
   */
  static signin(email, res, password) {
    pool.connect((error, client, done) => {
      client
        .query('SELECT * FROM users WHERE email = $1', email)
        .then((result) => {
          const user = result.rows[0];
          if (!user) {
            Responses.setError(401, 'Email does not exist'); return Responses.send(res);
          }
          if (utils.validatePassword(password, user.password)) {
            const userToken = utils.jwtToken({ id: user.id, email: user.email, isAdmin: user.is_admin });
            const userData = {
              token: userToken,
              userId: user.id,
              email: user.email,
            };
            Responses.setSuccess(200, { ...userData }); return Responses.send(res);
          }
          Responses.setError(401, 'Incorrect password'); return Responses.send(res);
        })
        .catch((e) => {
          Responses.setError(500, 'Server error'); return Responses.send(res);
        });
    });
  }
}
