import moment from 'moment';
import validations from '../middlewares/validations';
import ArticleModel from '../models/articles';
import Responses from '../helpers/response';

/**
 * @function createArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const createArticle = (req, res) => {
  const {
    title, article,
  } = req.body;
  const { id } = req.decode;
  const result = validations.validateArticle(req.body);
  if (result.error) {
    const errorMsg = result.error.details[0].message;
    Responses.setError(400, errorMsg.replace(/[^a-zA-Z ]/g, ''));
    return Responses.send(res);
  }
  const articleValues = [id, title, article, moment().format()];
  ArticleModel.create(articleValues, res);
};

/**
 * @function editArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const editArticle = (req, res) => {
  const {
    title, article,
  } = req.body;
  const { id } = req.params;
  const result = validations.validateArticle(req.body);
  if (result.error) {
    const errorMsg = result.error.details[0].message;
    Responses.setError(400, errorMsg.replace(/[^a-zA-Z ]/g, ''));
    return Responses.send(res);
  }
  const articleValues = [title, article, id];
  ArticleModel.edit(articleValues, res);
};

/**
 * @function editArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const deleteArticle = (req, res) => {
  const { id } = req.params;
  const articleValues = [id];
  ArticleModel.delete(articleValues, res);
};

const article = {
  createArticle, editArticle, deleteArticle,
};

export default article;
