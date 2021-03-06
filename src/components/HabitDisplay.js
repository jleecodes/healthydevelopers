import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import HabitCard from './HabitCard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dashboard from './Dashboard';


const HabitDisplay = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [userHabits, setUserHabits] = useState([])

    function handleChangeDate (currentDate) {
        setCurrentDate(currentDate)
        
        const url = 'https://healthydevelopers-jl.herokuapp.com/habits'


        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(habits => {
                const currentDateHabits = habits.filter((habit) => {
                    // console.log(new Date(habit.createdAt).toLocaleString().split(',')[0])
                    const habitDate = new Date(habit.createdAt).toLocaleString().split(',')[0]
                    const calendarDate = currentDate.toLocaleString().split(',')[0]
                    return habitDate === calendarDate
                })
                setUserHabits(currentDateHabits)
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    console.log(userHabits)
    // If user has no post for that day, return button to create
    if (!userHabits.length) {
        return (
            <div>
                <Calendar onChange={handleChangeDate} value={currentDate}/>
                <h3>You have not updated your daily habits today.</h3>
                <Link to='/create'>
                    <button>Create now</button>
                </Link>
            </div>

        )
    }

    // 
    return (
        <div>
            <Calendar onChange={handleChangeDate} value={currentDate}/>
            {
                userHabits.map((habit) => {
                    return (
                        <Link key={habit._id} to={`/today/${habit._id}`}>
                            <HabitCard habit={habit}/>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default HabitDisplay;