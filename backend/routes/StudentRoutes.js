const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentControllers");

router.get("/", studentController.getAllStudents);
router.post("/", studentController.createStudent);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.put("/remove/:id", studentController.removeMentor);
router.put("/eval/:id", studentController.updateEvaluation);
router.put('/lock/:id', studentController.lockStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;