import request from 'supertest';
import { expect } from 'chai';
import server from '../index';

let userToken;

describe('/POST Create Gif Route', () => {
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
  it('should create gif if details are valid', (done) => {
    request(server)
      .post('/api/v1/auth/gifs')
      .set('Authorization', userToken)
      .send({
        title: 'Ralia the sugar girl',
        image: 'https://res.cloudinary.com/daealmvag/image/upload/v1561569684/house2_kagcwz.jpg',
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
  it('should not create gif if title is missing', (done) => {
    request(server)
      .post('/api/v1/auth/articles')
      .set('Authorization', userToken)
      .send({
        image: 'https://res.cloudinary.com/daealmvag/image/upload/v1561569684/house2_kagcwz.jpg',
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
  it('should not create gif if article image is missing', (done) => {
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
  it('should not create gif if user is not logged in', (done) => {
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
