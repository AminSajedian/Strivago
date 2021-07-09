import mongoose from "mongoose"
import AccommodationSchema from "./schema.js"
const { model } = mongoose

export default model("accommodations", AccommodationSchema)