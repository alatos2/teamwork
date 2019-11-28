import moment from 'moment';
import Debug from 'debug';
import pool from './database';
import Responses from '../helpers/response';

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


export const getQueryData2 = (data, values) => {
  pool
    .query(data, values)
    .then((result) => {
      debug(result.rows[0]);
    })
    .catch((error) => {
      debug(error.stack);
    });
};

export const specific = async (query1, query2, type, value, res) => {
  try {
    const text = await pool.query(query1, value);
    const val = text.rows[0];
    if (!val) {
      Responses.setError(400, 'Does not exist'); return Responses.send(res);
    }
    const commentText = await pool.query(query2, [val.id, type]);
    let comm;
    const comment = commentText.rows;
    if (!comment) {
      comm = 'No comment yet';
    } else {
      comm = comment;
    }
    const article = (type === 'gif') ? val.image : val.article;
    const data = {
      data: {
        id: val.id, createOn: val.created_at, title: val.title, article, comments: comm,
      },
    };
    Responses.setSuccess(200, { ...data }); return Responses.send(res);
  } catch (e) {
    Responses.setError(500, 'Server error'); return Responses.send(res);
  }
};
