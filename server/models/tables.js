import Debug from 'debug';
import pool from './database';

const debug = Debug('http');

export default class Tables {
  static createUsersTable() {
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
      .then((response) => { debug(response); pool.end(); })
      .catch((error) => { debug(error); pool.end(); });
  }

  static createArticlesTable() {
    const articles = `CREATE TABLE IF NOT EXISTS
    articles (
        id serial primary key,
        user_id INT NOT NULL,
        title varchar(128) not null,
        article varchar(500) not null,
        created_at timestamp
    )`;
    pool.query(articles)
      .then((response) => { debug(response); pool.end(); })
      .catch((error) => { debug(error); pool.end(); });
  }

  static createGifTable() {
    const gifs = `CREATE TABLE IF NOT EXISTS
    gifs (
        id serial primary key,
        user_id INT NOT NULL,
        title varchar(128) not null,
        image varchar(256) not null,
        created_at timestamp
    )`;
    pool.query(gifs)
      .then((response) => { debug(response); pool.end(); })
      .catch((error) => { debug(error); pool.end(); });
  }

  static createCommentTable() {
    const comments = `CREATE TABLE IF NOT EXISTS
    comments (
        id serial primary key,
        article_id INT NOT NULL,
        author_id INT NOT NULL,
        type varchar(128) not null,
        comment varchar(128) not null,
        created_at timestamp
    )`;
    pool.query(comments)
      .then((response) => { debug(response); pool.end(); })
      .catch((error) => { debug(error); pool.end(); });
  }
}
