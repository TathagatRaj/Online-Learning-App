(async () => { 
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const app = require('../server'); // Path to your server.js
    
    chai.use(chaiHttp);
    const { expect } = chai;
    
    describe('Login API Tests', () => {
        it('should return success for valid credentials', async () => {
            const res = await chai.request(app)
                .post('/api/login')
                .send({ email: 'test@example.com', password: 'password123' });
    
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Login successful');
        });
    
        it('should return error for invalid credentials', async () => {
            const res = await chai.request(app)
                .post('/api/login')
                .send({ email: 'wrong@example.com', password: 'wrongpassword' });
                    
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'Invalid email or password');        
        });
    });
})();
