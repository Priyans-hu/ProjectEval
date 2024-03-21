import React from 'react';
import { Field, ErrorMessage } from 'formik';

const EvalMarksInputField = ({ label, name, isEditable, value }) => {
    return (
    <div className='flex flex-col'>
        <label htmlFor={name} className='text-lg font-semibold'>{label}</label>
        <Field
            type='number'
            id={name}
            value={value}
            name={name}
            disabled={isEditable}
            readOnly={isEditable}
            className='border border-gray-300 rounded p-2'
        />
        <ErrorMessage name={name} component='div' className='text-red-600' />
    </div>
)};

export default EvalMarksInputField;