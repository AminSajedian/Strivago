import express from "express"
import cors from "cors"
import accommodationRouter from "./services/accommodation/index.js"
import destinationRouter from "./services/destination/index.js"

const server = express()
server.use(express.json())
server.use(cors())

server.get("/test", (req, res) => {
    res.status(200).send({ message: "Test Success!" })
})

server.use("/accommodation", accommodationRouter)
server.use("/destination", destinationRouter)


export default server
