import moment from 'moment';
import validations from '../middlewares/validations';
import GifModel from '../models/gifs';
import Responses from '../helpers/response';

/**
 * @function createArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const createGif = (req, res) => {
  const {
    title, image,
  } = req.body;
  const { id } = req.decode;
  const result = validations.validateGif(req.body);
  if (result.error) {
    const errorMsg = result.error.details[0].message;
    Responses.setError(400, errorMsg.replace(/[^a-zA-Z ]/g, ''));
    return Responses.send(res);
  }
  const gifValues = [id, title, image, moment().format()];
  GifModel.create(gifValues, res);
};

/**
 * @function deleteGif
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const deleteGif = (req, res) => {
  const { id } = req.params;
  const gifValues = [id];
  GifModel.delete(gifValues, res);
};

const gifs = {
  createGif, deleteGif,
};

export default gifs;
