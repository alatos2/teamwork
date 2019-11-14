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
}
