import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


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

