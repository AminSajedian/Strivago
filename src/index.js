import mongoose from "mongoose"
import server from "./server.js"
import endpoints from "express-list-endpoints"
const port = process.env.PORT || 3000

mongoose
    .connect(process.env.ATLAS_URL + "/strivago", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Atlas!")
        console.table(endpoints(server))
        server.listen(port, () => {
            console.log("Server listening on port" , port)
        })
    })
    .catch(error => console.trace(error))