const express = require("express");
const userController = require("./../controllers/userController");
//routes
const router = express.Router();

router
  .route("/")
  .get(userController.getAllusers)
  .post(userController.createUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//export module
module.exports = router;
