import express from "express";
import DestinationModel from "../../models/index";
import { Property } from "../../types/interfaces";

const destinationRouter = express.Router();

destinationRouter.get("/", async (req, res) => {
  const destination: Property[] = await DestinationModel.find({});
  let allCities = destination.map((des) => des.city);

  let cities: string[] = [];
  allCities.forEach((des) => {
    if (!cities.includes(des)) cities.push(des)
  });

  res.status(200).send({ cities });
});

destinationRouter.get("/:city", async (req, res) => {
  try {
    const destination: Property[] = await DestinationModel.find({
      city: req.params.city,
    });
    if (!destination) {
      res.status(404).send();
      return;
    }

    res.status(200).send(destination);
  } catch (error) {
    res.status(404).send();
  }
});

// destinationRouter.post("/", async (req, res) => {

//     try {
//         const { name, description, maxGuests, city } = req.body

//         if (!name || !description || !maxGuests || !city) throw new Error("Invalid data")

//         const destination = new DestinationModel({ name, description, maxGuests, city })
//         await destination.save()

//         res.status(201).send(destination)

//     } catch (error) {
//         res.status(400).send({ message: error.message })
//     }
// })

export default destinationRouter;
