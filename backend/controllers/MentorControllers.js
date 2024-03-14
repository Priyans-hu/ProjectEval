const Mentor = require("../models/MentorModel");

// Controller to get all mentors
const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to create a new mentor
const createMentor = async (req, res) => {
    const mentor = new Mentor({
        name: req.body.name,
        email: req.body.email,
        studentsEvaluated: req.body.studentsEvaluated || 0
    });

    try {
        const newMentor = await mentor.save();
        res.status(201).json(newMentor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to get a mentor by ID
const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (mentor) {
            res.json(mentor);
        } else {
            res.status(404).json({ message: "Mentor not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to update a mentor
const updateMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (mentor) {
            mentor.studentsEvaluated = req.body.studentsEvaluated || mentor.studentsEvaluated;
            const updatedMentor = await mentor.save();
            res.json(updatedMentor);
        } else {
            res.status(404).json({ message: "Mentor not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to delete a mentor
const deleteMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (mentor) {
            await mentor.remove();
            res.json({ message: "Mentor deleted" });
        } else {
            res.status(404).json({ message: "Mentor not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllMentors,
    createMentor,
    getMentorById,
    updateMentor,
    deleteMentor
};