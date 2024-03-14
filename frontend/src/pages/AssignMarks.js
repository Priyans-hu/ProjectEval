import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import studentApi from '../api/StudentApi';
import EvalMarksInputField from '../components/EvalMarksInputField';
import ConfirmationBox from '../components/ConfirmationBox';

const AssignMarks = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const mentorUserId = localStorage.getItem('mentorUserId');
    const [student, setStudent] = useState(null);
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

    const notAllowed = student.isLocked || student.mentor !== mentorUserId;

    const validationSchema = Yup.object({
        ideation: Yup.number().max(10, 'Marks should be less than or equal to 10').nullable(),
        execution: Yup.number().max(10, 'Marks should be less than or equal to 10').nullable(),
        vivaPitch: Yup.number().max(10, 'Marks should be less than or equal to 10').nullable()
    });

    const handleSubmitAndLock = async (values) => {
        try {
            if (!values.ideation || !values.execution || !values.vivaPitch) {
                toast.error('Please fill in all fields before locking the student');
                return;
            }
    
            ConfirmationBox({
                onConfirm: async () => {
                    try {
                        await studentApi.updateEvaluation(userId, values);
                        await studentApi.lockStudent(userId);
                        toast.success('Student marks updated and locked successfully');
                        navigate('/home');
                    } catch (error) {
                        toast.error('Error updating student marks');
                        console.error('Error updating student marks: ', error);
                    }
                }
            });

        } catch (error) {
            toast.error('Error updating student marks or locking student');
            console.error('Error updating student marks or locking student: ', error);
        }
    };

    const handleSave = async (values, { setSubmitting }) => {
        try {
            await studentApi.updateEvaluation(userId, values);
            toast.success('Marks saved successfully');
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error('Student is locked and cannot be modified');
            } else {
                toast.error('Error submitting marks');
            }
            console.error('Error submitting marks: ', error);
        }
        setSubmitting(false);
    };

    return (
        <div className='container md:w-1/2 mx-auto p-4'>
            <h1 className='text-xl md:text-3xl font-bold mb-4'>Assign Marks for {student.name}</h1>
            {notAllowed ?
                <p className='text-sm text-red-500'>You cannot modify this data</p>
                : null}
            <Formik
                initialValues={marks}
                validationSchema={validationSchema}
                onSubmit={handleSave}
            >
                <Form className='m-auto space-y-4'>
                    <EvalMarksInputField label={'Ideation'} name={'ideation'} isEditable={notAllowed} />
                    <EvalMarksInputField label={'Execution'} name={'execution'} isEditable={notAllowed} />
                    <EvalMarksInputField label={'Viva'} name={'vivaPitch'} isEditable={notAllowed} />
                    <button
                        type='button'
                        className='bg-blue-500 text-white mr-4 py-2 px-4 rounded-md hover:bg-red-600 hover:cursor-pointer'
                        onClick={() => handleSubmitAndLock(marks)}
                        disabled={notAllowed}
                    >
                        Submit
                    </button>
                    <button type='submit' className='bg-blue-500 text-white mr-4 py-2 px-4 rounded-md hover:bg-blue-800 hover:cursor-pointer'
                        disabled={notAllowed}
                    >
                        Save
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AssignMarks;