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

describe('/POST SignUp input field validation test', () => {
    it('return 200 ok status to get authorization token', (done) => {
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
    it('should return 400 bad request status code when employee email is invalid', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.employeeValidation2)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when employee national_Id is invalid', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.employeeValidation3)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.be.eql('Enter national Id must be 16 numbers');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when mnager phoneNumber is invalid', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.employeeValidation4)
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
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.employeeValidation5)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                console.log(err);
                done();
            });
    });
    it('should return 400 bad request status code when employee name is invalid', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.employeeValidation1)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should return 400 bad request status code when employee position is not provided', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.employeeValidation7)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

describe('/POST add employee', () => {
    it('should return 201 created status code when employee added successfully', (done) => {
        chai
            .request(app)
            .post('/employees/')
            .set('x-auth-token', token)
            .send(sample.validEmployee)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                cachedEntryId = res.body.newEmployeeInfo.id;
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
    it('should return 401 unauthorized status code when an invalid or expired token is set in headers', (done) => {
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
    it('should return 400 bad request status code when employee ID requested is not an integer', (done) => {
        chai
            .request(app)
            .put(`/employees/manager`)
            .set('x-auth-token', token)
            .send(sample.editEmployee)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should 200 ok status code is activated successfully', (done) => {
        chai
            .request(app)
            .put(`/employees/${cachedEntryId}/activate`)
            .set('x-auth-token', token)
            .send(sample.editEmployee)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should 200 ok status code when user is suspended successfully', (done) => {
        chai
            .request(app)
            .put(`/employees/${cachedEntryId}/suspend`)
            .set('x-auth-token', token)
            .send(sample.editEmployee)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

describe('/DELETE remove employee', () => {
    it('should return 200 ok status code when employee successfully removed', (done) => {
        chai
            .request(app)
            .delete(`/employees/${cachedEntryId}`)
            .set('x-auth-token', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('deleted');
                done();
            })
    });
    it('should return 404 not found status code when employee ID not found', (done) => {
        chai
            .request(app)
            .put(`/employees/0`)
            .set('x-auth-token', token)
            .send(sample.editEmployee)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});