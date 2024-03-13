const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
    marks: {
        ideation: { type: Number, required: true },
        execution: { type: Number, required: true },
        vivaPitch: { type: Number, required: true },
    }
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;