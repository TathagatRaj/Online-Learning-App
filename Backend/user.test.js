const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server'); // Path to your server.js
chai.use(chaiHttp);
const { expect } = chai;

describe('Login API Tests', () => {
    it('should return success for valid credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Login successful');
                done();
            });
    });

    it('should return error for invalid credentials', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({ email: 'wrong@example.com', password: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message', 'Invalid email or password');
                done();
            });
    });
});
