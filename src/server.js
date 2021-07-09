import express from "express"
import cors from "cors"
import accommodationsRouter from "./services/accommodations/index.js"
import destinationsRouter from "./services/destinations/index.js"

const server = express()
server.use(express.json())
server.use(cors())

server.get("/test", (req, res) => {
    res.status(200).send({ message: "Test Success!" })
})

server.use("/accommodations", accommodationsRouter)
server.use("/destinations", destinationsRouter)


export default server
