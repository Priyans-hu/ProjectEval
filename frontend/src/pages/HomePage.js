import React, { useState, useEffect } from 'react';
import studentApi from '../api/StudentApi';
import mentorApi from '../api/MentorApi';
import StudentCard from '../components/StudentCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

import DownloadXLSX from '../utils/DownloadXLSX';

const HomePage = () => {
    const mentorUserId = localStorage.getItem('mentorUserId');
    const [students, setStudents] = useState([]);
    const [mentorName, setMentorName] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        studentApi.getAllStudents()
            .then(response => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching students: ', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        mentorApi.getMentorById(mentorUserId)
            .then(response => {
                setMentorName(response.data.name);
            })
            .catch(error => {
                console.error('Error fetching mentor: ', error);
            });
    }, [mentorUserId]);

    const selectedStudents = students.filter(student => student.mentor === mentorUserId);
    const filteredStudents = students.filter(student => {
        if (filter === 'all') return true;
        if (filter === 'assigned') return student.evaluation.ideation !== null || student.evaluation.execution !== null || student.evaluation.vivaPitch !== null;
        if (filter === 'pending') return student.evaluation.ideation === null && student.evaluation.execution === null && student.evaluation.vivaPitch === null;
        if (filter === 'locked') return student.isLocked;
        return false;
    });

    const handleEditClick = () => {
        navigate('/edit', { state: { selectedStudents } });
    };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className='flex font-bold justify-end'>
                        <p>Current Mentor - {mentorName}</p>
                    </div>
                    <div className='my-4'>
                        <div>
                            <div className='flex items-center justify-between my-4'>
                                <h1 className="text-xl md:text-3xl font-bold">Selected Students</h1>
                                <button className='py-2 px-6 bg-blue-400 rounded font-bold text-sm md:text-base' onClick={handleEditClick}>Edit</button>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedStudents.map(student => (
                                    <li key={student._id} className="bg-gray-200 rounded">
                                        <StudentCard user={student} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className='flex items-center justify-between'>
                                <h1 className="text-xl md:text-3xl font-bold mt-8 mb-4">All Students</h1>
                                <div className='flex gap-3'>
                                    <div className='text-sm md:text-base flex items-center'>
                                        <p className='mr-2'>Filter:</p>
                                        <select
                                            className='py-2 px-4 bg-gray-200 rounded'
                                            value={filter}
                                            onChange={e => setFilter(e.target.value)}
                                        >
                                            <option value="all">All</option>
                                            <option value="assigned">Assigned</option>
                                            <option value="pending">Pending</option>
                                            <option value="locked">Locked</option>
                                        </select>
                                    </div>
                                    <button className='py-2 px-4 bg-green-400 rounded'> <DownloadXLSX data={students} /> </button>
                                </div>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredStudents.map(student => (
                                    <li key={student._id} className="bg-gray-200 rounded">
                                        <StudentCard user={student} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default HomePage;