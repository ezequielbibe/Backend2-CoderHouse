import { expect } from 'chai'
import { PORT } from '../../config/environment.js'
import request from 'supertest'
import { app } from '../../index.js'

describe('GET /api/products', () => {

    describe('/:id?' , () => {
        it('Should return status 200 and object as body', async () => {
            const response = request(app).get('/api/products/1').expect(200)

            expect(response).to.be.eq(200)
        })
    })
})