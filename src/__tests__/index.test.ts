import dotenv from "dotenv"
import supertest from "supertest"
import server from "../server"
import mongoose from "mongoose"
import AccommodationModel from "../models/index"

dotenv.config()
const request = supertest(server)

describe("Stage I - Testing the test env", () => {

    it("should test that true is true", () => {
        expect(true).toBe(true)
    })

    it("should test that false is not true", () => {
        expect(false).not.toBe(true)
    })

    it("should test that false is falsy", () => {
        expect(false).toBeFalsy()
    })
})

beforeAll((done) => {
    console.log(process.env.ATLAS_URL)
    mongoose
        .connect(process.env.ATLAS_URL + "/test", { useNewUrlParser: true })
        .then(() => {
            console.log("Successfully connected to Atlas in test.")
            done()
        })
})

describe("Checking application main endpoints", () => {
    // GET /test - /test endpoint is working
    it("should check that the /test endpoint is working", async () => {
        const response = await request.get("/test")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Test Success!")
    })

    // GET /destinations - return the list of all available cities
    it("should check that the /destinations endpoint is working", async () => {
        const response = await request.get("/destinations")
        expect(response.status).toBe(200)
        expect(response.body.cities).toBeDefined()
        expect(response.body.cities.length).toBe(0)
    })

    // GET /accommodation - will return the full list of accommodation
    it("should check that the /accommodation endpoint is working", async () => {
        const response = await request.get("/accommodation")
        expect(response.status).toBe(200)
        expect(response.body.accommodation).toBeDefined()

        expect(response.body.accommodation.length).toBe(0)
    })

    // validData
    const validData = {
        name: "randomFullName",
        description: "randomDescriptor",
        maxGuests: 3,
        city: "randomCity"
    }

    // GET /destinations/:city - will return the list of accommodations for a specific city
    it("should check that the /accommodation endpoint is allowing POST requests with valid data", async () => {
        const response = await request.post("/accommodation").send(validData)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        const _response = await request.get(`/destinations/${validData.city}`)
        expect(_response.body[0].city).toEqual(validData.city)
    })

    // POST /accommodation - will add a new accommodation
    it("should check that the /accommodation endpoint is allowing POST requests with valid data", async () => {
        const response = await request.post("/accommodation").send(validData)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        expect(response.body.description).toEqual(validData.description)
    })

    const invalidData = {
        name: "randomFullName"
    }

    // POST /accommodation - 400 if invalid data
    it("should check that the /accommodation endpoint is NOT allowing POST requests with invalid data", async () => {
        const response = await request.post("/accommodation").send(invalidData)
        expect(response.status).toBe(400)
        expect(response.body._id).not.toBeDefined()
    })

    // GET /accommodation/:id - returns an existing accommodation
    it("should test that the GET /accommodation/:id", async () => {
        const response = await request.post("/accommodation").send(validData)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        const accommodation = await AccommodationModel.findById(response.body._id)
        expect(accommodation.createdAt).toStrictEqual(new Date(response.body.createdAt))
    })

    // GET /accommodation/:id - 404 if not existing
    it("should check that the /accommodation/:id is returning proper error when the id is wrong", async () => {
        let id = "aaaaaaaaaaaaaaaaaaaaaaaa"
        const _response = await request.get(`/accommodation/${id}`)
        expect(_response.status).toBe(404)
    })

    // PUT /accommodation/:id - 204 ok - will edit an existing accommodation
    it("should check When updating a /accommodation/:id endpoint with new data is working", async () => {
        const response = await request.post("/accommodation").send(validData)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        validData.name = "testName"
        const _response = await request.put("/accommodation/" + response.body._id).send(validData)
        expect(_response.status).toBe(204)
    })

    // PUT /accommodation/:id - 404 if not existing
    it("should check that the put method of /accommodation/:id is returning proper error when the id is wrong", async () => {
        let id = "aaaaaaaaaaaaaaaaaaaaaaaa"
        const _response = await request.put(`/accommodation/${id}`)
        expect(_response.status).toBe(404)
    })

    // DELETE /accommodation/:id - 204 if ok - will delete an existing accommodation
    it("should check that the /accommodation/:id is returning proper status when the product will be deleted", async () => {
        const response = await request.post("/accommodation").send(validData)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        const _response = await request.delete(`/accommodation/${response.body._id}`)
        expect(_response.status).toBe(204)
    })

    // DELETE /accommodation/:id - 404 if not existing
    it("should check that the delete method of /accommodation/:id is returning proper error when the id is wrong", async () => {
        let id = "aaaaaaaaaaaaaaaaaaaaaaaa"
        const _response = await request.delete(`/accommodation/${id}`)
        expect(_response.status).toBe(404)
    })



    afterAll((done) => {
        mongoose.connection.dropDatabase(() => {
            mongoose.connection.close(() => done())
        })
    })
})