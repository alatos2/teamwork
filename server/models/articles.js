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
   * @description Model to create a user account
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
}
