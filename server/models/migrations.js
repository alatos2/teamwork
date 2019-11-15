import Debug from 'debug';
import moment from 'moment';
import utils from '../helpers/commons';
import pool from './database';
import { addUser } from './queries';

const debug = Debug('http');

const userText = 'INSERT INTO users (first_name,last_name,email,password,gender,job_role,department,address,is_admin,created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
const userValues = ['Frank', 'Lampard', 'frank@gmail.com', utils.hashPassword('1234'), 'male', 'Lorem', 'Lorem', 'Lorem', true, moment().format()];

const articleText = 'INSERT INTO articles (user_id,title,article,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
const articleValues = ['1', 'Black Cat', 'The black cat is handsome', moment().format()];

const gifText = 'INSERT INTO gifs (user_id,title,image,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
const gifValues = ['1', 'White House', 'https://res.cloudinary.com/daealmvag/image/upload/v1561569684/house2_kagcwz.jpg', moment().format()];

const commentText = 'INSERT INTO comments (article_id,user_id,comment,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
const commentValues = ['1', '1', 'Nice one', moment().format()];

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

  const articles = `CREATE TABLE IF NOT EXISTS
    articles (
        id serial primary key,
        user_id INT NOT NULL,
        title varchar(128) not null,
        article varchar(500) not null,
        created_at timestamp
    )`;

  const gifs = `CREATE TABLE IF NOT EXISTS
    gifs (
        id serial primary key,
        user_id INT NOT NULL,
        title varchar(128) not null,
        image varchar(256) not null,
        created_at timestamp
    )`;

  const comments = `CREATE TABLE IF NOT EXISTS
    comments (
        id serial primary key,
        article_id INT NOT NULL,
        user_id INT NOT NULL,
        comment varchar(128) not null,
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

  pool.query(articles)
    .then((response) => {
      debug(response);
      pool.end();
    })
    .catch((error) => {
      debug(error);
      pool.end();
    });

  pool.query(gifs)
    .then((response) => {
      debug(response);
      pool.end();
    })
    .catch((error) => {
      debug(error);
      pool.end();
    });

  pool.query(comments)
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
  pool.query('DROP TABLE IF EXISTS users, articles, gifs')
    .then(() => {
      debug('Table dropped');
    });
};

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

const createArticle = () => {
  pool
    .query(articleText, articleValues)
    .then((result) => {
      debug(result.rows[0]);
    })
    .catch((error) => {
      debug(error.stack);
    });
};

const createGif = () => {
  pool
    .query(gifText, gifValues)
    .then((result) => {
      debug(result.rows[0]);
    })
    .catch((error) => {
      debug(error.stack);
    });
};

const createComment = () => {
  pool
    .query(commentText, commentValues)
    .then((result) => {
      debug(result.rows[0]);
    })
    .catch((error) => {
      debug(error.stack);
    });
};

pool.on('remove', () => {
  debug('client removed');
  process.exit(0);
});

module.exports = {
  createTables, dropTables, createUser, createArticle, createGif, createComment,
};

require('make-runnable');
