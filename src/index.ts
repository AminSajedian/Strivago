import mongoose from "mongoose"
import server from "./server"
import endpoints from "express-list-endpoints"
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000

// process.env.TS_NODE_DEV && require('dotenv').config()


const {ATLAS_URL} = process.env

if (!ATLAS_URL) throw new Error('No Atlas URL specified')

mongoose
    .connect(ATLAS_URL + "/strivago", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Atlas!")
        console.table(endpoints(server))
        server.listen(port, () => {
            console.log("Server listening on port" , port)
        })
    })
    .catch(error => console.trace(error))