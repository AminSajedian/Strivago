import express from "express"
import AccommodationModel from "../../models/index.js"

const { Router } = express

const accommodationsRouter = new Router()

accommodationsRouter.get("/", async (req, res) => {
    const accommodations = await AccommodationModel.find({})
    res.status(200).send({ accommodations })
})

accommodationsRouter.get('/:id', async (req, res) => {
    try {
        const accommodation = await AccommodationModel.findById(req.params.id)
        if (!accommodation) {
            res.status(404).send();
            return
        }
        res.status(200).send(accommodation)
    } catch (error) {
        res.status(404).send();
    }
})


accommodationsRouter.post("/", async (req, res) => {

    try {
        const { name, description, maxGuests, city } = req.body

        if (!name || !description || !maxGuests || !city) throw new Error("Invalid data")

        const accommodation = new AccommodationModel({ name, description, maxGuests, city })
        await accommodation.save()

        res.status(201).send(accommodation)

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


accommodationsRouter.put("/:id", async (req, res, next) => {
    try {
        const accommodation = await AccommodationModel.findById(req.params.id)
        if (!accommodation) {
            res.status(404).send();
            return
        }
        const _accommodation = await AccommodationModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, })
        if (_accommodation) {
            res.status(204).send()
        }

    } catch (error) {
        console.log(error.message)
    }

})



accommodationsRouter.delete('/:id', async (req, res, next) => {
    try {
        // if (req.params.id.length !== 23) {
        //     res.status(404).send();
        // }
        const accommodation = await AccommodationModel.findById(req.params.id)
        if (!accommodation) {
            res.status(404).send();
            // return
        }
        const _accommodation = await AccommodationModel.findByIdAndDelete(req.params.id)
        if (_accommodation) {
            res.status(204).send()
        }
    } catch (error) {
        console.log(error.message)
    }
})


export default accommodationsRouter