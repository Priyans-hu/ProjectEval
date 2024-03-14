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
    const mentorUserId = localStorage.getItem('mentorUserId');
    const [selectedCount, setSelectedCount] = useState(0);

    useEffect(() => {
        studentApi.getAllStudents()
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students: ', error);
            });
    }, []);

    const handleCheckboxChange = (studentId, values, setFieldValue) => {
        const student = students.find(student => student._id === studentId);
        
        if (student.mentor !== null && student.mentor !== mentorUserId) {
            toast.error('This student is already selected by another mentor.');
            return;
        }
    
        if (values.selectedStudents.includes(studentId)) {
            setFieldValue('selectedStudents', values.selectedStudents.filter(id => id !== studentId));
            setSelectedCount(prevCount => prevCount - 1);
        } else {
            if (selectedCount < 4) {
                setFieldValue('selectedStudents', [...values.selectedStudents, studentId]);
                setSelectedCount(prevCount => prevCount + 1);
            } else {
                toast.error('You can only select up to 4 students.');
            }
        }
    };

    const handleSubmit = async (values) => {
        try {
            const mentorId = localStorage.getItem('mentorUserId');
            const selectedStudents = values.selectedStudents;
    
            // Update mentor with selected students
            await mentorApi.updateMentor(mentorId, { studentsEvaluated: selectedStudents });
    
            // Update students with mentorId
            const promises = selectedStudents.map(studentId => {
                return studentApi.updateStudent(studentId, { mentor: mentorId });
            });
    
            // Wait for all student updates to complete
            await Promise.all(promises);
    
            toast.success('Students assigned successfully');
            navigate('/home');
        } catch (error) {
            toast.error('Error assigning students');
            console.error('Error assigning students: ', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold my-4 mb-4">Edit Selected Students</h1>
            <Formik
                initialValues={{ selectedStudents: [] }}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                            {students.map(student => (
                                <div key={student._id} className="flex items-center px-4 bg-gray-200 hover:bg-gray-300 rounded">
                                    <Field
                                        type="checkbox"
                                        name="selectedStudents"
                                        value={student._id}
                                        checked={values.selectedStudents.includes(student._id)}
                                        onChange={() => handleCheckboxChange(student._id, values, setFieldValue)}
                                        className="mr-2 cursor-pointer"
                                        disabled={student.mentor !== null && student.mentor !== mentorUserId}
                                    />
                                    <label htmlFor={student._id}>
                                        <StudentCard user={student} controls={false}/>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {selectedCount >= 3 && selectedCount <= 4 && (
                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-500 text-white rounded-md float-right w-1/4"
                            >
                                Submit
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditSelectedStudentPage;