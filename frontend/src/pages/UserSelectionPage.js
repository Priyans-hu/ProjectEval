import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MentorApi from '../api/MentorApi';

const UserSelectionPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        MentorApi.getAllMentors()
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching mentors: ', error);
            });
    }, []);

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleContinue = () => {
        const user = users.find(user => user._id === selectedUser);
        localStorage.setItem('mentorUserId', user._id);
        navigate('/home');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full my-8">
            <h1 className="text-2xl font-bold mb-4">User Selection</h1>
            <div className="p-4 md:w-1/3">
                <h2 className="text-lg font-bold mb-2">Working As</h2>
                <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedUser}
                    onChange={handleUserChange}
                >
                    <option value="">Select user...</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 w-1/3 rounded float-right"
                    onClick={handleContinue}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default UserSelectionPage;