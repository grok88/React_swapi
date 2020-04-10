import React from 'react';
import './person-details.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';

export default class PersonDetails extends React.Component {
	state = {
		person : null
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
					person
				});
			});
	};

	render(){

		if(!this.state.person){
			return (<span>
					Select a person from List
				</span>)
		}
		
		const {person : {id, name,email,phone, website}} = this.state;


		return (
			<div className='person-details card'>
				<img className='person-image'
					src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
					<div className='card-body'>
						<h4>
							{name}
						</h4>
						<ul className='list-group list-group-flush'>
							<li className='list-group-item'>
								<span className='term'>Email</span>
								<span>{email}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Phone</span>
								<span>{phone}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Eye Color</span>
								<span>{website}</span>
							</li>
						</ul>
					</div>
			</div>
		);
	}
}
