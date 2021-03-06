import request from 'supertest';
import { expect } from 'chai';
import server from '../index';
import utils from '../helpers/commons';

const userToken = utils.jwtToken({ id: 1, email: 'frank@gmail.com', isAdmin: true });

describe('/POST Create Gif Route', () => {
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

describe('/DELETE Delete Gif Route', () => {
  it('should delete gif if parameter is valid', (done) => {
    request(server)
      .delete('/api/v1/auth/gifs/1')
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
  it('should not delete gif if user is not logged in', (done) => {
    request(server)
      .delete('/api/v1/auth/gifs/1')
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

describe('/POST Gif Comment', () => {
  it('should create comment if parameter is valid', (done) => {
    request(server)
      .post('/api/v1/auth/gifs/2/comment')
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
      .post('/api/v1/auth/gifs/10/comment')
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
      .post('/api/v1/auth/gifs/1/comment')
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
      .post('/api/v1/auth/gifs/1/comment')
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

describe('/GET View specific gif', () => {
  it('should view specific gif if parameter is valid', (done) => {
    request(server)
      .get('/api/v1/auth/gifs/2')
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
  it('should not view specific gif if id is not valid', (done) => {
    request(server)
      .get('/api/v1/auth/gifs/10')
      .set('Authorization', userToken)
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
  // it('should not view specific gif if user is not logged in', (done) => {
  //   request(server)
  //     .post('/api/v1/auth/gifs/2')
  //     .set('Authorization', 'userToken')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(401)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       else {
  //         const responseData = JSON.parse(res.text);
  //         expect(responseData).to.be.an('object');
  //       }
  //       done();
  //     });
  // });
});
