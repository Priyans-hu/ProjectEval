import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StudentCard = ({ user, controls = true }) => {
    const navigate = useNavigate();
    
    const clickHandler = () => {
        navigate('/assign/' + user._id);
    }

    const totalMarks = (user.evaluation.ideation + user.evaluation.execution + user.evaluation.vivaPitch);

    return (
        <div className={`flex justify-between items-center p-4 hover:bg-gray-300 hover:cursor-pointer`} onClick={controls ? clickHandler : null}>
            <div>
                <img
                    src={user.image}
                    alt={user.name}
                    height='50px'
                    width='50px'
                    className='rounded-full object-cover inline mr-4'
                    style={{ aspectRatio: '1/1' }}
                />
                <p className='inline'>{user.name}</p>
            </div>
            {controls ? <div style={{ width: '50px' }}>
                <CircularProgressbar
                    value={totalMarks}
                    maxValue={30}
                    text={`${totalMarks}`}
                    styles={buildStyles({
                        textSize: '30px',
                        textColor: '#000',
                        pathColor: 'green',
                        trailColor: '#d6d6d6',
                    })}
                />
            </div> : null}
        </div>
    );
};

export default StudentCard;
