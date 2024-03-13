import React, { useState, useEffect } from 'react';
import studentapi from '../api/StudentApi';
import StudentCard from '../components/StudentCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const mentorUserId = localStorage.getItem('mentorUserId');
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        studentapi.getAllStudents()
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students: ', error);
            });
    }, []);

    const selectedStudents = students.filter(student => student.mentor === mentorUserId);
    const allStudents = students.filter(student => student.mentor !== mentorUserId);

    const handleEditClick = () => {
        navigate('/edit', { state: { selectedStudents } });
    };    

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-end'>
                <p>Current Session: </p>
                <p> {mentorUserId}</p>
            </div>
            <div className='my-4'>
                <div>
                    <div className='flex items-center justify-between my-4'>
                        <h1 className="text-3xl font-bold">Selected Students</h1>
                        <button className='py-2 px-6 bg-blue-400 rounded-xl font-bold' onClick={handleEditClick}>Edit</button>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {selectedStudents.map(student => (
                            <li key={student._id} className="bg-gray-200 p-4 rounded">
                                <StudentCard user={student} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mt-8 mb-4">All Students</h1>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {allStudents.map(student => (
                            <li key={student._id} className="bg-gray-200 p-4 rounded">
                                <StudentCard user={student} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;