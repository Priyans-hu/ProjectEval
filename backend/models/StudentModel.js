const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", default: null },
    evaluation: {
        ideation: { type: Number, default: null },
        execution: { type: Number, default: null },
        vivaPitch: { type: Number, default: null },
    },
    isLocked: { type: Boolean, default: false },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;