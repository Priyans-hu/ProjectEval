import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import studentApi from '../api/StudentApi';
import mentorApi from '../api/MentorApi';
import StudentCard from '../components/StudentCard';

const EditSelectedStudentPage = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [alreadyAssignedStudents, setAlreadyAssignedStudents] = useState([]);
    const mentorUserId = localStorage.getItem('mentorUserId');
    const [initiallyAssignedStudents, setInitiallyAssignedStudents] = useState([]);

    useEffect(() => {
        studentApi.getAllStudents()
            .then(response => {
                setStudents(response.data);
                const assignedToCurrentMentor = response.data.filter(student => student.mentor === mentorUserId);
                setAlreadyAssignedStudents(assignedToCurrentMentor);
                setInitiallyAssignedStudents(assignedToCurrentMentor);
            })
            .catch(error => {
                console.error('Error fetching students: ', error);
            });
    }, [mentorUserId]);

    const handleCheckboxChange = (studentId) => {
        const isStudentSelected = alreadyAssignedStudents.some(student => student._id === studentId);

        if (isStudentSelected) {
            const updatedSelectedStudents = alreadyAssignedStudents.filter(student => student._id !== studentId);
            setAlreadyAssignedStudents(updatedSelectedStudents);
        } else {
            if (alreadyAssignedStudents.length < 4) {
                const selectedStudent = students.find(student => student._id === studentId);
                setAlreadyAssignedStudents([...alreadyAssignedStudents, selectedStudent]);
            } else {
                toast.error('You can only select up to 4 students.');
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const selectedStudents = alreadyAssignedStudents.map(student => student._id);

            await mentorApi.updateMentor(mentorUserId, { studentsEvaluated: selectedStudents });

            // Using Promise.all to wait for all removals to complete
            const removalPromises = initiallyAssignedStudents.map(async student => {
                if (student.isLocked) {
                    return;
                }
                await studentApi.removeMentor(student._id);
            });
            await Promise.all(removalPromises);

            // Using Promise.all to wait for all updates to complete
            const updatePromises = alreadyAssignedStudents.map(async student => {
                if (student.isLocked) {
                    return;
                }
                await studentApi.updateStudent(student._id, { mentor: mentorUserId });
            });
            await Promise.all(updatePromises);

            toast.success('Students assigned successfully');
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error(`Some students are locked`);
            } else {
                toast.error('Error assigning students');
            }
            console.error('Error assigning students: ', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl md:text-3xl font-bold mt-4">Edit Selected Students</h1>
            <p className='text-red-500 text-sm my-4' >Select atleast 3 students and max 4</p>
            <Formik
                initialValues={{ selectedStudents: alreadyAssignedStudents.map(student => student._id) }}
                onSubmit={(values) => handleSubmit(values)}
            >
                {() => (
                    <Form>
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-sm md:text-base'>
                            {students.map(student => (
                                <div key={student._id} className="flex items-center px-4 bg-gray-200 hover:bg-gray-300 rounded">
                                    <Field
                                        type="checkbox"
                                        name="selectedStudents"
                                        value={student._id}
                                        checked={alreadyAssignedStudents.some(s => s._id === student._id)}
                                        onChange={() => handleCheckboxChange(student._id)}
                                        className="mr-2 cursor-pointer"
                                        disabled={student.mentor !== null && student.mentor !== mentorUserId}
                                    />
                                    <label htmlFor={student._id}>
                                        <StudentCard user={student} controls={false} />
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            {alreadyAssignedStudents.length >= 3 && alreadyAssignedStudents.length <= 4 && (
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 text-white rounded-md w-1/4"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditSelectedStudentPage;