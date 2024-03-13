const express = require("express");
const router = express.Router();
const evalController = require("../controllers/EvalControllers");

router.get("/", evalController.getAllEvaluations);
router.post("/", evalController.createEvaluation);
router.get("/:id", evalController.getEvaluationById);
router.put("/:id", evalController.updateEvaluation);
router.delete("/:id", evalController.deleteEvaluation);

module.exports = router;