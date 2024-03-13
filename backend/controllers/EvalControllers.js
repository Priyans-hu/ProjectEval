const Evaluation = require("../models/EvalModel");

// Controller to get all evaluations
const getAllEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find();
        res.json(evaluations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to create a new evaluation
const createEvaluation = async (req, res) => {
    const evaluation = new Evaluation({
        student: req.body.student,
        mentor: req.body.mentor,
        marks: {
            ideation: req.body.marks.ideation,
            execution: req.body.marks.execution,
            vivaPitch: req.body.marks.vivaPitch
        }
    });

    try {
        const newEvaluation = await evaluation.save();
        res.status(201).json(newEvaluation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to get an evaluation by ID
const getEvaluationById = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (evaluation) {
            res.json(evaluation);
        } else {
            res.status(404).json({ message: "Evaluation not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to update an evaluation
const updateEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (evaluation) {
            evaluation.student = req.body.student || evaluation.student;
            evaluation.mentor = req.body.mentor || evaluation.mentor;
            evaluation.marks.ideation = req.body.marks.ideation || evaluation.marks.ideation;
            evaluation.marks.execution = req.body.marks.execution || evaluation.marks.execution;
            evaluation.marks.vivaPitch = req.body.marks.vivaPitch || evaluation.marks.vivaPitch;

            const updatedEvaluation = await evaluation.save();
            res.json(updatedEvaluation);
        } else {
            res.status(404).json({ message: "Evaluation not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to delete an evaluation
const deleteEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (evaluation) {
            await evaluation.remove();
            res.json({ message: "Evaluation deleted" });
        } else {
            res.status(404).json({ message: "Evaluation not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllEvaluations,
    createEvaluation,
    getEvaluationById,
    updateEvaluation,
    deleteEvaluation
};