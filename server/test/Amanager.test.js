import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import sample from './sampleData';

const {
    expect
} = chai;
chai.use(chaiHttp);

describe('/GET API', () => {
    it('should return 200 status ok code', (done) => {
        chai
            .request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });
});

describe('/POST SignUp input field validation test', () => {
    it('should return 400 bad request status code when manager email is invalid', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.signUpValidation1)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.be.eql('Valid email is required');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when manager national_Id is invalid', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.signUpValidation2)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when mnager phoneNumber is invalid', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.signUpValidation3)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when manager is not accepted format', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.signUpValidation4)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when age is below required', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.signUpValidation5)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when manager name is invalid', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.signUpValidation6)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
});


describe('/POST signUp', () => {
    it('should return 201 status created code when new manager signup successfully', (done) => {
        chai
            .request(app)
            .post('/auth/signup')
            .send(sample.validManager)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('newManager');
                done();
            });
    });
    it('should return 409 conflict status code when manager with same email, phoneNumber or id already exist', (done) => {
        chai
        .request(app)
        .post('/auth/signup')
        .send(sample.validManager)
        .end((err, res) => {
            expect(res).to.have.status(409);
            done();
        });
    });
    it('should return 400 bad request status code when submit invalid values', (done) => {
        chai
        .request(app)
        .post('/auth/signup')
        .send(sample.invalidManager)
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    });
});

describe('/POST login', () => {
    it('should return 200 ok status code when user signIn', (done) => {
        chai
            .request(app)
            .post('/auth/signin')
            .send({
                email: sample.validManager.email,
                password: sample.validManager.password
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('token');
                done();
            });
    });
    it('should return 400 bad request status code when user input wrong password', (done) => {
        chai
            .request(app)
            .post('/auth/signin')
            .send(sample.wrongPassword)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('Error');
                done();
            });
    });
    it('should return 404 not found status code when user doesn\'t exist ', (done) => {
        chai
        .request(app)
        .post('/auth/signin')
        .send(sample.unknownUser)
        .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('Error');
            done();
        });
    });
});

