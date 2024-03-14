import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import studentApi from '../api/StudentApi';
import { useNavigate } from 'react-router-dom';

const AssignMarks = () => {
    const { userId } = useParams();
    const [student, setStudent] = useState(null);
    const mentorUserId = localStorage.getItem('mentorUserId');
    const navigate = useNavigate();
    const [marks, setMarks] = useState({
        ideation: '',
        execution: '',
        vivaPitch: ''
    });

    useEffect(() => {
        studentApi.getStudentById(userId)
            .then(response => {
                setStudent(response.data);
                setMarks({
                    ideation: response.data.evaluation.ideation || '',
                    execution: response.data.evaluation.execution || '',
                    vivaPitch: response.data.evaluation.vivaPitch || ''
                });
            })
            .catch(error => {
                console.error('Error fetching student: ', error);
            });
    }, [userId]);

    if (!student) {
        return <div className='text-center text-4xl'>Loading...</div>;
    }

    const isEditable = student.mentor === mentorUserId;

    const validationSchema = Yup.object({
        ideation: Yup.number().max(10, 'Marks should be less than or equal to 10').nullable(),
        execution: Yup.number().max(10, 'Marks should be less than or equal to 10').nullable(),
        vivaPitch: Yup.number().max(10, 'Marks should be less than or equal to 10').nullable()
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            await studentApi.updateEvaluation(userId, values);
            console.log('Marks submitted successfully');
            navigate('/home');
        } catch (error) {
            console.error('Error submitting marks: ', error);
        }
        setSubmitting(false);
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>Assign Marks for {student.name}</h1>
            <Formik
                initialValues={marks}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className='md:w-1/2 m-auto space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor='ideation' className='text-lg font-semibold'>Ideation</label>
                        <Field
                            type='number'
                            id='ideation'
                            name='ideation'
                            readOnly={!isEditable}
                            className='border border-gray-300 rounded p-2'
                        />
                        <ErrorMessage name='ideation' component='div' className='text-red-600' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='execution' className='text-lg font-semibold'>Execution</label>
                        <Field
                            type='number'
                            id='execution'
                            name='execution'
                            readOnly={!isEditable}
                            className='border border-gray-300 rounded p-2'
                        />
                        <ErrorMessage name='execution' component='div' className='text-red-600' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='vivaPitch' className='text-lg font-semibold'>Viva</label>
                        <Field
                            type='number'
                            id='vivaPitch'
                            name='vivaPitch'
                            readOnly={!isEditable}
                            className='border border-gray-300 rounded p-2'
                        />
                        <ErrorMessage name='vivaPitch' component='div' className='text-red-600' />
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                    >
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AssignMarks;