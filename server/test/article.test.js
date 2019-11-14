import request from 'supertest';
import { expect } from 'chai';
import server from '../index';

let userToken;

describe('/POST Create Article Route', () => {
  before((done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'frank@gmail.com',
        password: '1234',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
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
  before((done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'frank@gmail.com',
        password: '1234',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
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
