const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// routes handler
getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requesTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

getTour = (req, res) => {
  const id = req.params.id * 1; //Convert a string in integer
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      messege: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//routes
const router = express.Router();

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour);

//export module
module.exports = router;
