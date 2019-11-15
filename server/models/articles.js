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
  /**
   * @method
   * @description Method to view all article
   * @static
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ArticleModel
   */

  static viewAll(res) {
    const text = 'SELECT * FROM articles ORDER BY id DESC';
    pool.connect((error, client, done) => {
      client
        .query(text)
        .then((result) => {
          const articles = result.rows;
          const articleData = {
            data: articles,
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

  // /**
  //  * @method
  //  * @description Method to view all article
  //  * @static
  //  * @param {object} res - Response object
  //  * @returns {object} JSON response
  //  * @memberof ArticleModel
  //  */

  // static viewSpecific(articleId, res) {
  //   pool.connect((error, client, done) => {
  //     client
  //       .query('SELECT * FROM articles WHERE id = $1 RETURNING *', articleId)
  //       .then((result) => {
  //         const articles = result.rows[0];
  //         const articleData = {
  //           data: articles,
  //         };
  //         Responses.setSuccess(200, { ...articleData });
  //         return Responses.send(res);
  //       })
  //       .catch((e) => {
  //         Responses.setError(500, 'Server error');
  //         return Responses.send(res);
  //       });
  //   });
  // }

  /**
   * @method
   * @description Method to create article
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ArticleModel
   */
  static async createComment(values1, values2, res) {
    try {
      const result1 = await pool.query('SELECT title, article FROM articles WHERE id = $1', values2);
      const getArticle = result1.rows[0];
      if (!getArticle) {
        Responses.setError(400, 'Article does not exist');
        return Responses.send(res);
      }
      const result2 = await pool.query('INSERT INTO comments (article_id,user_id,comment,type,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *', values1);
      const addComment = result2.rows[0];
      const commentData = {
        message: 'Comments successfully created',
        createdOn: addComment.created_at,
        articleTitle: getArticle.title,
        article: getArticle.article,
        comment: addComment.comment,
      };
      Responses.setSuccess(201, { ...commentData });
      return Responses.send(res);
    } catch (e) {
      Responses.setError(500, 'Server error');
      return Responses.send(res);
    }
  }
}
