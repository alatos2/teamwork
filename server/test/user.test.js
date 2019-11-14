import request from 'supertest';
import { expect } from 'chai';
import server from '../index';
import utils from '../helpers/commons';

let userToken;

describe('/POST Create User Route', () => {
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
  it('should create a new user if details are valid', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should not create a new user if email is not in the right format', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kellygmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should not create a new user if firstname is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should create a new user if lastname is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should create a new user if gender is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should create a new user if address is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should create a new user if password is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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
  it('should create a new user if job role is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        department: 'Science',
        isAdmin: 'false',
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
  it('should create a new user if department is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        isAdmin: 'false',
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
  it('should create a new user if isAdmin is missing', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', userToken)
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
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
  it('should create a new user if creator is not an admin', (done) => {
    request(server)
      .post('/api/v1/auth/create-user')
      .set('Authorization', 'userToken')
      .send({
        email: 'kelly@gmail.com',
        firstName: 'Kenwoon',
        lastName: 'Ogechukwu',
        gender: 'Male',
        address: 'Lukas street1234',
        password: utils.hashPassword('1234'),
        jobRole: 'Cleaner',
        department: 'Science',
        isAdmin: 'false',
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

describe('/POST Sign In Route', () => {
  // it('should sign in a user if details are valid', (done) => {
  //   request(server)
  //     .post('/api/v1/auth/signin')
  //     .send({
  //       email: 'frank@gmail.com',
  //       password: '1234',
  //     })
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       else {
  //         const responseData = JSON.parse(res.text);
  //         expect(responseData).to.be.an('object');
  //       }
  //       done();
  //     });
  // });
  it('should not sign in a user if email is not in the right format', (done) => {
    request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'kellygmail.com',
        password: '1234',
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
  // it('should not create sign in a user if email is incorrect', (done) => {
  //   request(server)
  //     .post('/api/v1/auth/signin')
  //     .send({
  //       email: 'kelly123@gmail.com',
  //       password: '1234',
  //     })
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
  // it('should not sign in a user if password is incorrect', (done) => {
  //   request(server)
  //     .post('/api/v1/auth/signin')
  //     .send({
  //       email: 'frank@gmail.com',
  //       password: '123455',
  //     })
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
