import React from 'react';
import './person-details.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';

export default class PersonDetails extends React.Component {
	state = {
		person : null,
		loading : true
	}

	swapiService = new SwapiService();

	componentDidMount(){
		this.updatePerson();
	}

	componentDidUpdate(prevProps){
		if(this.props.personId !== prevProps.personId){
			this.updatePerson();
		}
	}

	updatePerson = () =>{
		const {personId} = this.props;

		if (!personId){
			return;
		}

		this.swapiService.getPerson(personId)
			.then(person => {
				this.setState({
					person,
					loading : false
				});
			});
	};

	render(){
		// console.log(this.state.loading);
		// console.log(this.state.person);
		const test = (this.state.loading && this.state.person) ? <Spinner/> : null;
		
		if(!this.state.person){
			return (<span>
					{test}
					Select a person from List
				</span>)
		}
		
		const {person : {id, name, gender, birthYear, eyeColor}, loading} = this.state;


		return (
			<div className='person-details card'>
				{test}
				<img className='person-image'
					src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
					<div className='card-body'>
						<h4>
							{name}
						</h4>
						<ul className='list-group list-group-flush'>
							<li className='list-group-item'>
								<span className='term'>Gender</span>
								<span>{gender}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Birth Year</span>
								<span>{birthYear}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Eye Color</span>
								<span>{eyeColor}</span>
							</li>
						</ul>
					</div>
			</div>
		);
	}
}
