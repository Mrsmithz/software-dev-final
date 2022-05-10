import supertest from 'supertest'
import app from '../../app'
import { connectToDB, disconnectFromDB, clearDB } from '../../src/utils/db'

const MONGO_URI = process.env.MONGO_URI ?? 'localhost'
const data = {
    firstName:'john',
    lastName:'smith',
    namePrefix:'นาย',
    cardPrefix:'บัตรประชาชน',
    birthDate:new Date(),
    cardId:123456,
    tel:123456,
    vaccine:'3rd',
    location:'thailand',
    vaccineDate:new Date(),
    address:{
        address :'1/1',
        province:'bangkok',
        district:'latkrabang',
        zone:'latkrabang'
    }

}

describe('Register API', () => {

    beforeAll(async () => {
        await connectToDB(MONGO_URI)

    })
    afterAll(async () => {
        await disconnectFromDB()

    })
    afterEach(async () => {
        await clearDB()
    })

    it('Should register user', async () => {
        const response = await supertest(app)
        .post(`/register`)
        .send(data)
        const {body, statusCode} = response
        expect(statusCode).toBe(201)
        expect(body.firstName).toEqual(data.firstName)
        expect(body.lastName).toEqual(data.lastName)
        expect(body.namePrefix).toEqual(data.namePrefix)
        expect(body.cardPrefix).toEqual(data.cardPrefix)
        expect(body.cardId).toEqual(data.cardId)
    })
})