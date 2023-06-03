const express = require("express");
const userController = require("../controllers/userController");
const decoder = require("../middlewares/decoder");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "Successfull", data:process.env });
});

//User Routes
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.post("/user/logout", decoder, userController.logout);




module.exports = router;
