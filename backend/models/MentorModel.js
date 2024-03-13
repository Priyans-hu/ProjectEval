const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentsEvaluated: { 
        type: Number,
        default: 0,
        min: 0,
        max: 4
    }
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;