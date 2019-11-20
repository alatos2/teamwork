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
 * @function deleteArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const deleteArticle = (req, res) => {
  const { id } = req.params;
  const articleValues = [id];
  ArticleModel.delete(articleValues, res);
};

/**
 * @function viewAllArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const viewAllArticle = (req, res) => {
  ArticleModel.viewAll(res);
};

/**
 * @function viewSpecificArticle
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const viewSpecificArticle = (req, res) => {
  ArticleModel.viewSpecificArticle([req.params.id], res);
};

/**
 * @function createComment
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const createComment = (req, res) => {
  const {
    comment,
  } = req.body;

  const result = validations.validateComment(req.body);
  if (result.error) {
    const errorMsg = result.error.details[0].message;
    Responses.setError(400, errorMsg.replace(/[^a-zA-Z ]/g, ''));
    return Responses.send(res);
  }
  const value1 = [req.params.id, req.decode.id, comment, 'article', moment().format()];
  const value2 = [req.params.id];
  ArticleModel.createComment(value1, value2, res);
};

const article = {
  createArticle, editArticle, deleteArticle, viewAllArticle, createComment, viewSpecificArticle,
};

export default article;
