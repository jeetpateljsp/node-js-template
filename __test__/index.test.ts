import supertest from 'supertest';
import app from '@server';

// Test node server
describe('node server', () => {

    it('should return 200 on GET request', async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
    });
    it('should return "node server at your service 🖖! "', async () => {
        const response = await supertest(app).get('/');
        expect(response.text).toBe('node server at your service 🖖! ');
    });
});