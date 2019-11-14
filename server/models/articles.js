import pool from './database';
import Responses from '../helpers/response';

/**
 * @class
 * @description A container class for all models
 * @exports ArticleModel
 */
export default class ArticleModel {
  /**
   * @method
   * @description Method to create article
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ArticleModel
   */
  static create(values, res) {
    const text = 'INSERT INTO articles (user_id,title,article,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
    pool.connect((error, client, done) => {
      client
        .query(text, values)
        .then((result) => {
          const article = result.rows[0];
          const articleData = {
            message: 'Article successfully posted',
            articleId: article.id,
            createdOn: article.created_at,
            title: article.title,
          };
          Responses.setSuccess(201, { ...articleData });
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
   * @description Method to edit article
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ArticleModel
   */

  static edit(values, res) {
    const text = 'UPDATE articles SET title = $1, article = $2 WHERE id = $3 RETURNING *';
    pool.connect((error, client, done) => {
      client
        .query(text, values)
        .then((result) => {
          const article = result.rows[0];
          const articleData = {
            message: 'Article successfully updated',
            title: article.title,
            article: article.article,
          };
          Responses.setSuccess(200, { ...articleData });
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
   * @description Method to delete article
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ArticleModel
   */

  static delete(values, res) {
    const text = 'DELETE FROM articles WHERE id = $1 RETURNING *';
    pool.connect((error, client, done) => {
      client
        .query(text, values)
        .then(() => {
          const articleData = {
            message: 'Article successfully deleted',
          };
          Responses.setSuccess(200, { ...articleData });
          return Responses.send(res);
        })
        .catch((e) => {
          Responses.setError(500, 'Server error');
          return Responses.send(res);
        });
    });
  }
}
