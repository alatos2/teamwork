import Debug from 'debug';
import moment from 'moment';
import utils from '../helpers/commons';
import pool from './database';
import { addUser } from './queries';

const debug = Debug('http');

const userText = 'INSERT INTO users (first_name,last_name,email,password,gender,job_role,department,address,is_admin,created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
const userValues = ['Frank', 'Lampard', 'frank@gmail.com', utils.hashPassword('1234'), 'male', 'Lorem', 'Lorem', 'Lorem', true, moment().format()];

const createTables = () => {
  const users = `CREATE TABLE IF NOT EXISTS
    users (
        id serial primary key,
        first_name varchar(128) not null,
        last_name varchar(128) not null,
        email varchar(128) not null,
        password varchar(128) not null,
        gender varchar(128) not null,
        job_role varchar(128) not null,
        department varchar(128) not null,
        address varchar(128) not null,
        is_admin boolean,
        created_at timestamp
    )`;

  pool.query(users)
    .then((response) => {
      debug(response);
      pool.end();
    })
    .catch((error) => {
      debug(error);
      pool.end();
    });
};

const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS users')
    .then(() => {
      debug('Table dropped');
    });
};

// const createUser = () => {
//   pool.query(addUser(user), (error, result) => {
//     if (error) {
//       debug(error);
//     }
//     debug(result);
//   });
// };

const createUser = () => {
  pool
    .query(userText, userValues)
    .then((result) => {
      debug(result.rows[0]);
    })
    .catch((error) => {
      debug(error.stack);
    });
};

// const createUser = () => {
//   pool.connect((error, client, done) => {
//     client
//       .query(userText, userValues)
//       .then((result) => {
//         debug(result.rows[0]);
//       })
//       .catch((error) => debug(error.stack));
//   });
// };

pool.on('remove', () => {
  debug('client removed');
  process.exit(0);
});

module.exports = {
  createTables, dropTables, createUser,
};

require('make-runnable');
