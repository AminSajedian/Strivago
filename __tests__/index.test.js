import dotenv from "dotenv"
import supertest from "supertest"
import server from "../src/server.js"
import mongoose from "mongoose"
// import AccommodationModel from "../src/models/index.js"

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

afterAll((done) => {
    mongoose.connection.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

describe("Checking application main endpoints", () => {
    it("should check that the /test endpoint is working", async () => {
        const response = await request.get("/test")
        
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Test Success!")
    })

    it("should check that the /accommodations endpoint is working", async () => {
        const response = await request.get("/accommodations")
        console.log('--------------')
        console.log('response.status:', response.status)
        console.log('response.body.accommodations:', response.body.accommodations)
        console.log('--------------')
        expect(response.status).toBe(200)
        expect(response.body.accommodations).toBeDefined()
        
        expect(response.body.accommodations.length).toBe(0)
    })

    const validData = {
        "name": "randomFullName",
        "description": "randomDescriptor",
        "maxGuests": 3,
        "city": "randomCity"
    }

    it("should check that the /accommodations endpoint is allowing POST requests with valid data", async () => {
        const response = await request.post("/accommodations").send(validData)
        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        expect(response.body.description).toEqual(validData.description)
    })

    // const invalidData = {
    //     description: "Test product"
    // }

    // it("should check that the /products endpoint is NOT allowing POST requests with invalid data", async () => {
    //     const response = await request.post("/products").send(invalidData)
    //     expect(response.status).toBe(400)
    //     expect(response.body._id).not.toBeDefined()
    // })

    // it("should test that the /products endpoint is returning valid data after creating", async () => {
    //     const response = await request.post("/products").send(validData)

    //     expect(response.body._id).toBeDefined()

    //     const product = await AccommodationModel.findById(response.body._id)

    //     expect(product.createdAt).toStrictEqual(new Date(response.body.createdAt))

    // })

    // it("should test that the /products endpoint is returning all the products available", async () => {
    //     const productResponse = await request.post("/products").send(validData)

    //     const response = await request.get("/products")

    //     const included = response.body.products.some(product => product._id === productResponse.body._id)

    //     expect(included).toBe(true)

    // })

    // it("should check that the /products/:id is returning the correct product (created product)", async () => {
    //     const response = await request.post("/products").send(validData)
    //     expect(response.status).toBe(201)
    //     expect(response.body._id).toBeDefined()
    //     const _response = await request.get('/products/' + response.body._id)
    //     expect(_response.body.description).toEqual(validData.description)
    // })

    // it("should check that the /products/:id is returning proper error when the id is wrong", async () => {
    //     const response = await request.post("/products").send(validData)
    //     expect(response.status).toBe(201)
    //     expect(response.body._id).toBeDefined()
    //     const _response = await request.get(`/products/${response.body._id}10`)
    //     expect(_response.status).toBe(404)
    // })


    // it("should check that the /products/:id is returning proper error when the product will be deleted", async () => {
    //     const response = await request.post("/products").send(validData)
    //     expect(response.status).toBe(201)
    //     expect(response.body._id).toBeDefined()
    //     const _response = await request.delete(`/products/${response.body._id}`)
    //     expect(_response.status).toBe(204)
    // })

    // it("should check When updating a /product/:id endpoint with new data is working", async () => {
    //     const response = await request.post("/products").send(validData)
    //     expect(response.status).toBe(201)
    //     expect(response.body._id).toBeDefined()
    //     validData.description = "test2"
    //     const _response = await request.put("/products/" + response.body._id).send(validData)
    //     expect(_response.status).toBe(200)
    //     expect(_response.body.description).toEqual(validData.description)
    //     expect(typeof(response.body.description)).toBe('string')
    // })
})



