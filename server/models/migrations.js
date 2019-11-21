import Debug from 'debug';
import moment from 'moment';
import utils from '../helpers/commons';
import pool from './database';
import Tables from './tables';
import { getQueryData2 } from './queries';

const debug = Debug('http');

const userText = 'INSERT INTO users (first_name,last_name,email,password,gender,job_role,department,address,is_admin,created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
const userValues = ['Frank', 'Lampard', 'frank@gmail.com', utils.hashPassword('1234'), 'male', 'Lorem', 'Lorem', 'Lorem', true, moment().format()];

const articleText = 'INSERT INTO articles (user_id,title,article,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
const articleValues = ['1', 'Black Cat', 'The black cat is handsome', moment().format()];

const gifText = 'INSERT INTO gifs (user_id,title,image,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
const gifValues = ['1', 'White House', 'https://res.cloudinary.com/daealmvag/image/upload/v1561569684/house2_kagcwz.jpg', moment().format()];

const commentText = 'INSERT INTO comments (article_id,author_id,comment,type,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *';
const commentValues = ['1', '1', 'Nice one', 'article', moment().format()];

const createTables = () => {
  Tables.createUsersTable();
  Tables.createArticlesTable();
  Tables.createGifTable();
  Tables.createCommentTable();
};

const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS users, articles, gifs, comments')
    .then(() => {
      debug('Table dropped');
    });
};

const createUser = () => {
  getQueryData2(userText, userValues);
};
const createArticle = () => {
  getQueryData2(articleText, articleValues);
};
const createGif = () => {
  getQueryData2(gifText, gifValues);
};
const createComment = () => {
  getQueryData2(commentText, commentValues);
};

pool.on('remove', () => {
  debug('client removed');
  process.exit(0);
});

module.exports = {
  createTables, dropTables, createUser, createArticle, createGif, createComment,
};

require('make-runnable');
