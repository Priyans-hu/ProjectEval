const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/MentorControllers");

router.get("/", mentorController.getAllMentors);
router.post("/", mentorController.createMentor);
router.get("/:id", mentorController.getMentorById);
router.put("/:id", mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;