import express from 'express';
import authentication from '../middlewares/auth';
import article from '../controller/articles';

const articleRoute = express.Router();

articleRoute.post('/articles', authentication, article.createArticle);
articleRoute.patch('/articles/:id', authentication, article.editArticle);
articleRoute.delete('/articles/:id', authentication, article.deleteArticle);
articleRoute.get('/feed', authentication, article.viewAllArticle);

export default articleRoute;
