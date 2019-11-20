import moment from 'moment';
import Debug from 'debug';
import pool from './database';

const debug = Debug('http');

/**
 * @name addUser
 * @description - adds a new employee
 * @param {object} data
 * @returns the object query
 */

// eslint-disable-next-line import/prefer-default-export
export const addUser = (data) => ({
  text: `INSERT INTO users (
    first_name,
    last_name,
    email,
    password,
    gender,
    job_role,
    department,
    address,
    is_admin,
    created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
  values: [data.firstName, data.lastName, data.email, data.password, data.gender, data.jobRole,
    data.department, data.address, data.isAdmin, moment().format()],
});

/**
* @name getUserByEmail
* @description - gets a single user
* @param {string} email
* @returns the query
*/

export const getUserByEmail = (email) => ({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email],
});

export const getQueryData = (data) => {
  pool.query(data)
    .then((response) => { debug(response); pool.end(); })
    .catch((error) => { debug(error); pool.end(); });
};
