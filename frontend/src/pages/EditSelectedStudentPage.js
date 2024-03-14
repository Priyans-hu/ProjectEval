import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import studentApi from '../api/StudentApi';
import StudentCard from '../components/StudentCard';

const EditSelectedStudentPage = () => {
    const [students, setStudents] = useState([]);
    const mentorUserId = localStorage.getItem('mentorUserId');

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
        } else {
            if (values.selectedStudents.length < 4) {
                setFieldValue('selectedStudents', [...values.selectedStudents, studentId]);
            } else {
                toast.error('You can only select up to 4 students.');
            }
        }
    };

    const handleSubmit = (values) => {
        // Handle submit logic here
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
                                <div key={student._id} className="flex items-center bg-gray-300 p-4 rounded">
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
                        <button
                            type="submit"
                            disabled={values.selectedStudents.length < 3 || values.selectedStudents.length > 4}
                            className="py-2 px-4 bg-blue-500 text-white rounded-md float-right w-1/4"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditSelectedStudentPage;