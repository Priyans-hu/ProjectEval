const Student = require("../models/StudentModel");

// Controller to get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to create a new student
const createStudent = async (req, res) => {
    const student = new Student({
        name: req.body.name,
        image: req.body.image,
        email: req.body.email,
        mentor: req.body.mentor,
        evaluation: req.body.evaluation || {},
        isLocked: req.body.isLocked || false
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to get a student by ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to update a student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            student.name = req.body.name || student.name;
            student.image = req.body.image || student.image;
            student.email = req.body.email || student.email;
            student.mentor = req.body.mentor || student.mentor;
            student.evaluation = req.body.evaluation || student.evaluation;
            student.isLocked = req.body.isLocked || student.isLocked;

            const updatedStudent = await student.save();
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateEvaluation = async (req, res) => {
    const { ideation, execution, vivaPitch } = req.body;
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.evaluation.ideation = ideation || student.evaluation.ideation;
        student.evaluation.execution = execution || student.evaluation.execution;
        student.evaluation.vivaPitch = vivaPitch || student.evaluation.vivaPitch;

        await student.save();
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to delete a student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            await student.remove();
            res.json({ message: "Student deleted" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    updateEvaluation,
    deleteStudent
};