import React from 'react';
import './error.css';
import icon from './death-star.png';

const Error = () => {
	return (
		<div className='error'>
			<img src={icon} alt = 'Death star'/>
			<span className='boom'>BOOM!!!!</span>
			<span>
				Something has gone wrong
			</span>
			<span>
				(but we to fix it)
			</span>
		</div>
	);
}
export default Error;