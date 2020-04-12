import React from 'react';
import './people-page.css';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorButton from '../error-btn/error-btn';
import Error from '../error/error';
import SwapiService from '../../services/swapi-service';

const Row = ({left, right}) => {
	return (
		<div className='row mb2 people'>
			<div className='col-md-6'>
				{left}
			</div>
			<div className='col-md-6'>
				{right}
			</div>
		</div>
	);
}


export default class PeoplePage extends React.Component{
	state = {
		personSelected : null,
		hasError : false
	}

	swapiService = new SwapiService();

	componentDidCatch(error, info){
		// debugger;

		this.setState({hasError : true});
	}

	onPersonSelected = (id) => {
		this.setState({
			personSelected : id
		});
	}

	render(){

		if(this.state.hasError){
			return <Error/>
		}

		const itemList = (
			<ItemList 
								onPropsSelected = {this.onPersonSelected}
								getData = {this.swapiService.getAllPeople}
								renderItem={(item) => `${item.name}  ( ${item.email})`}/>
		);

		const personDetails = (
			<PersonDetails 
				personId={this.state.personSelected}/>
		);


		return (
			<div>
				<Row left={itemList} right={personDetails}/>
				<Row left='foo' right='bar'/>
			</div>
		);
	}
}