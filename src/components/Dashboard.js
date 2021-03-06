import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logout from './Logout';

const Dashboard = () => {
	// let history = useHistory();

	// function handleClick() {
	// 	history.push('/myprofile')
	// }

	return (
		<div>
			<div>
                <h1>DevHealthyHabits</h1>
            </div>
			<ul>
				<li>
					<Link to='/myprofile'>home</Link>
				</li>
				<li>
					<Link to='/today'>today</Link>
				</li>
				<li>
					<Link to='/month'>month</Link>
				</li>
				<li>
					<Link to='/about'>about</Link>
				</li>
				<li>
					<Logout />
				</li>
			</ul>
		</div>
	)
};

export default Dashboard;
