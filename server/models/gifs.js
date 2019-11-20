import pool from './database';
import Responses from '../helpers/response';

/**
 * @class
 * @description A container class for all models
 * @exports GifModel
 */
export default class GifModel {
  /**
   * @method
   * @description Method to create article
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof GifModel
   */
  static create(values, res) {
    const text = 'INSERT INTO gifs (user_id,title,image,created_at) VALUES ($1,$2,$3,$4) RETURNING *';
    pool.connect((error, client, done) => {
      client
        .query(text, values)
        .then((result) => {
          const gif = result.rows[0];
          const gifData = {
            message: 'Gif image successfully posted',
            gifId: gif.id,
            createdOn: gif.created_at,
            title: gif.title,
            imageUrl: gif.image,
          };
          Responses.setSuccess(201, { ...gifData });
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
   * @memberof GifModel
   */

  static delete(values, res) {
    const text = 'DELETE FROM gifs WHERE id = $1 RETURNING *';
    pool.connect((error, client, done) => {
      client
        .query(text, values)
        .then(() => {
          const gifData = {
            message: 'gif post successfully deleted',
          };
          Responses.setSuccess(200, { ...gifData });
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
   * @description Method to create gif comment
   * @static
   * @param {object} values - body values
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof GifModel
   */
  static async createComment(values1, values2, res) {
    try {
      const result1 = await pool.query('SELECT title FROM gifs WHERE id = $1', values2);
      const getGif = result1.rows[0];
      if (!getGif) {
        Responses.setError(400, 'Gif does not exist');
        return Responses.send(res);
      }
      const result2 = await pool.query('INSERT INTO comments (article_id,author_id,comment,type,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *', values1);
      const addComment = result2.rows[0];
      const commentData = {
        message: 'Comments successfully created',
        createdOn: addComment.created_at,
        gifTitle: getGif.title,
        comment: addComment.comment,
      };
      Responses.setSuccess(201, { ...commentData });
      return Responses.send(res);
    } catch (e) {
      Responses.setError(500, 'Server error');
      return Responses.send(res);
    }
  }

  /**
   * @method
   * @description Method to view all article
   * @static
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof GifModel
   */

  static async viewSpecificGif(id, res) {
    try {
      const gifText = await pool.query('SELECT * FROM gifs WHERE id = $1', id);
      const gif = gifText.rows[0];
      if (!gif) {
        Responses.setError(400, 'Gif does not exist'); return Responses.send(res);
      }
      const gifCommentText = await pool.query('SELECT id, comment, author_id FROM comments WHERE article_id = $1 AND type = $2', [gif.id, 'gif']);
      let comm;
      const comment = gifCommentText.rows;
      if (!comment) {
        comm = 'No comment yet';
      } else {
        comm = comment;
      }
      const articleData = {
        data: {
          id: gif.id, createOn: gif.created_at, title: gif.title, url: gif.image, comments: comm,
        },
      };
      Responses.setSuccess(200, { ...articleData }); return Responses.send(res);
    } catch (e) {
      Responses.setError(500, 'Server error'); return Responses.send(res);
    }
  }
}
