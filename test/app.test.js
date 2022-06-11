const request = require('supertest')
const app = require('../app')
const sampleCar = {
        "id": 1,
        "name": "Mazda RX4",
        "price": 300000,
        "size": "SMALL",
        "image": "https://source.unsplash.com/500x500",
        "isCurrentlyRented": false,
        "createdAt": "2022-06-10T13:34:48.812Z",
        "updatedAt": "2022-06-10T13:34:48.812Z"
    }

describe('Home Endpoint Test', () => {
    test('GET /', () => {
        request(app)
            .get('/')
            .expect('Content-Type',  /json/)
            .expect(200)
            .expect((res) => {
                res.body.length = 1
                res.body = {
                    "status": "OK",
                    "message": "BCR API is up and running!"
                }
            })
            .end((err) => {
                if (err) return done(err)
            })
    })
})

describe('Cars Endpoint Test', () => {
    test('GET /v1/cars/:id', () => {
        request(app)
            .post('/v1/cars/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                (res.body).toEqual(sampleCars)
                (res.body.id).toEqual(1)
            })
            .end((err) => {
                if (err) return err
            })
    })
})

describe('Auth Endpoint Test', () => {
    test('POST /v1/auth/register', () => {
        request(app)
        .post('/v1/auth/register')
        .expect('Content-Type', /json/)
        // .send({
        //     name: 'sample',
        //     email: 'sample@mail.com',
        //     password: 'sample'
        // })
        .expect(201)
        .expect((res) => {
            (res.body.accessToken).toDefined()
        })
        .end((err) => {
            if (err) return err
        })
    })
})