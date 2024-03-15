import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import studentApi from '../api/StudentApi';

const AddNewStudentPage = () => {
    const navigate = useNavigate();
    const initialValues = {
        name: '',
        email: '',
        image: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        image: Yup.string().url('Invalid image URL').required('Image URL is required')
    });

    const handleSubmit = async (values) => {
        try {
            await studentApi.createStudent(values);
            navigate('/');
            toast.success('Student added successfully');
        } catch (error) {
            toast.error('Error adding student');
            console.error('Error adding student: ', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl md:text-3xl text-center font-bold mt-4">Add New Student</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="md:w-1/2 mt-4 mx-auto flex flex-col">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 p-4 bg-gray-200 focus:bg-gray-300 outline-none block w-full shadow-sm text-sm md:text-base rounded-md"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-4 bg-gray-200 focus:bg-gray-300 outline-none block w-full shadow-sm text-sm md:text-base rounded-md"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-medium text-gray-700">Image URL</label>
                        <Field
                            type="text"
                            id="image"
                            name="image"
                            className="mt-1 p-4 bg-gray-200 focus:bg-gray-300 outline-none block w-full shadow-sm text-sm md:text-base rounded-md"
                        />
                        <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                    </div>
                    <button
                        type="submit"
                        className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                        Add Student
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddNewStudentPage;
