import request from 'supertest';
import { expect } from 'chai';
import server from '../index';
import utils from '../helpers/commons';

const userToken = utils.jwtToken({ id: 1, email: 'frank@gmail.com', isAdmin: true });

describe('/POST Create Article Route', () => {
  it('should create an article if details are valid', (done) => {
    request(server)
      .post('/api/v1/auth/articles')
      .set('Authorization', userToken)
      .send({
        title: 'Ralia the sugar girl',
        article: 'Ralia lives in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not create a new article if title is missing', (done) => {
    request(server)
      .post('/api/v1/auth/articles')
      .set('Authorization', userToken)
      .send({
        article: 'Ralia lives in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not create a new article if article body is missing', (done) => {
    request(server)
      .post('/api/v1/auth/articles')
      .set('Authorization', userToken)
      .send({
        title: 'Life in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should create a new article if user is not logged in', (done) => {
    request(server)
      .post('/api/v1/auth/articles')
      .set('Authorization', 'userToken')
      .send({
        title: 'Ralia the sugar girl',
        article: 'Ralia lives in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
});

describe('/PATCH Edit Article Route', () => {
  it('should edit an article if details are valid', (done) => {
    request(server)
      .patch('/api/v1/auth/articles/1')
      .set('Authorization', userToken)
      .send({
        title: 'Ralia the sugar girl',
        article: 'Ralia lives in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not edit article if title is missing', (done) => {
    request(server)
      .patch('/api/v1/auth/articles/1')
      .set('Authorization', userToken)
      .send({
        article: 'Ralia lives in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not edit article if article body is missing', (done) => {
    request(server)
      .patch('/api/v1/auth/articles/1')
      .set('Authorization', userToken)
      .send({
        title: 'Life in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not edit article if user is not logged in', (done) => {
    request(server)
      .patch('/api/v1/auth/articles/1')
      .set('Authorization', 'userToken')
      .send({
        title: 'Ralia the sugar girl',
        article: 'Ralia lives in calabar',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
});

describe('/DELETE Delete Article Route', () => {
  it('should delete an article if parameter is valid', (done) => {
    request(server)
      .delete('/api/v1/auth/articles/1')
      .set('Authorization', userToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not delete article if user is not logged in', (done) => {
    request(server)
      .delete('/api/v1/auth/articles/1')
      .set('Authorization', 'userToken')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
});

describe('/GET View All Article Route', () => {
  it('should get all article if parameter is valid', (done) => {
    request(server)
      .get('/api/v1/auth/feed')
      .set('Authorization', userToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
});

describe('/POST Create Comment', () => {
  it('should create comment if parameter is valid', (done) => {
    request(server)
      .post('/api/v1/auth/articles/2/comment')
      .set('Authorization', userToken)
      .send({
        comment: 'Nice word!',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not create comment if id is not valid', (done) => {
    request(server)
      .post('/api/v1/auth/articles/10/comment')
      .set('Authorization', userToken)
      .send({
        comment: 'Nice word!',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not create comment if there is no comment', (done) => {
    request(server)
      .post('/api/v1/auth/articles/1/comment')
      .set('Authorization', userToken)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
  it('should not create comment if user is not logged in', (done) => {
    request(server)
      .post('/api/v1/auth/articles/1/comment')
      .set('Authorization', 'userToken')
      .send({
        comment: 'Rubbish',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        else {
          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.an('object');
        }
        done();
      });
  });
});
