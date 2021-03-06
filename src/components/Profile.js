import React, { useState } from 'react';
import Dashboard from './Dashboard';
import HabitDisplay from './HabitDisplay';

const Profile = () => {


    return (
        <div>
            <div>
                <Dashboard />
                <h2>Welcome {localStorage.name}!</h2>
            </div>
            <div>
                <HabitDisplay/>
            </div>
        </div>
    );
};

export default Profile;