import React from 'react'

const StudentCard = ({ user }) => {
    return (
        <div className='flex justify-between items-center'>
            <div>
                <img
                    src={user.image}
                    alt=''
                    height='50px'
                    width='50px'
                    className='rounded-full object-cover inline mr-4'
                    style={{ aspectRatio: '1/1' }}
                />
                <p className='inline'>{user.name}</p>
            </div>
        </div>
    )
}

export default StudentCard
