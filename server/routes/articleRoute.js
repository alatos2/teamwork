import express from 'express';
import authentication from '../middlewares/auth';
import article from '../controller/articles';

const articleRoute = express.Router();

articleRoute.post('/articles', authentication, article.createArticle);
articleRoute.patch('/articles/:id', authentication, article.editArticle);

export default articleRoute;
