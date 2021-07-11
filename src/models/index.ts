import mongoose from "mongoose"
import AccommodationSchema from "./schema"
const { model } = mongoose

export default model("accommodation", AccommodationSchema)