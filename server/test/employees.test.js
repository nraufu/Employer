import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import sample from './sampleData';

const {
    expect
} = chai;
app.use(chaiHttp);

let token;
let cachedEntryId;

describe('/POST add employee', () => {
    it('return token to get authorization token', (done) => {
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
                token = res.body.token;
                done();
            });
    });
    it('should return 201 created status code when employee added successfully', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.validEmployee)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                cachedEntryId = res.body.newEmployee.id;
                done();
            });
    });
    it('should return 409 conflict status code when employee is already registered', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.validEmployee)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('Error');
                done();
            });
    });
    it('should return 403 forbidden status code when no token is set in headers', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .send(sample.validEmployee)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('Error');
                done();
            });
    });
    it('should return 401 unthorized status code when an invalid or expired token is set in headers', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', sample.invalidToken.token)
            .send(sample.validEmployee)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('Error');
                done();
            });
    });
});

describe('/PUT edit', () => {
    it('should return 200 ok status code when employee edited successfully', (done) => {
        chai
            .request(app)
            .put(`/employees/${cachedEntryId}`)
            .set('x-auth-token', token)
            .send(sample.editEmployee)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('Success');
                done();
            });
    });
    it('should return 404 not found status code when employee ID not found', (done) => {
        chai
            .request(app)
            .put(`/employees/30`)
            .set('x-auth-token', token)
            .send(sample.editEmployee)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});