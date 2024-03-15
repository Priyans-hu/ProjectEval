import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import studentApi from '../api/StudentApi';
import mentorApi from '../api/MentorApi';
import StudentCard from '../components/StudentCard';
import Loader from '../components/Loader';

const EditSelectedStudentPage = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students: ', error);
                setLoading(false);
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
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="container mx-auto p-4">
                    <div className='flex flex-col sm:flex-row justify-items-end sm:justify-between'>
                        <h1 className="text-xl md:text-3xl font-bold my-4 md:mt-4">Edit Selected Students</h1>
                        <button className='flex justify-end items-center'>
                            <a href='/addNew' className='p-3 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base rounded-md'>
                                Add new student
                            </a>
                        </button>
                    </div>
                    <div className='flex my-4 justify-between'>
                        <p className='text-red-500 text-sm' >Select atleast 3 students and max 4</p>
                        <p className='text-sm sm:text-base font-bold ml-4'>Selected students - {alreadyAssignedStudents.length}</p>
                    </div>
                    <Formik
                        initialValues={{ selectedStudents: alreadyAssignedStudents.map(student => student._id) }}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {() => (
                            <Form>
                                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-sm md:text-base'>
                                    {students.map(student => (
                                        <div
                                            key={student._id}
                                            className={`flex items-center justify-between px-4 bg-gray-200 hover:bg-gray-300 rounded`}
                                        >
                                            <div className='flex items-center justify-center'>
                                                <Field
                                                    type="checkbox"
                                                    name="selectedStudents"
                                                    value={student._id}
                                                    checked={alreadyAssignedStudents.some(s => s._id === student._id)}
                                                    onChange={() => handleCheckboxChange(student._id)}
                                                    className="mr-2 cursor-pointer"
                                                    disabled={(student.mentor !== null && student.mentor !== mentorUserId) || student.isLocked}
                                                />
                                                <label htmlFor={student._id}>
                                                    <StudentCard user={student} controls={false} />
                                                </label>
                                            </div>
                                            {student.isLocked && student.mentor === mentorUserId && (
                                                <span className="text-red-600 ml-2">
                                                    <LockIcon />
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-end'>
                                    {alreadyAssignedStudents.length >= 3 && alreadyAssignedStudents.length <= 4 && (
                                        <button
                                            type="submit"
                                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-1/4"
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>)}
        </div>
    );
};

export default EditSelectedStudentPage;