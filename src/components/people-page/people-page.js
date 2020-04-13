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
				<ErrorButton/>
			</div>
		</div>
	);
}

class ErrorBoundry extends React.Component{
	state ={
		hasError : false
	}

	componentDidCatch(error, info){
		// debugger;
		this.setState({hasError : true});
	}

	render(){
		if (this.state.hasError){
			return <Error/>
		}

		return this.props.children;
	}
}

export default class PeoplePage extends React.Component{
	state = {
		personSelected : null
	}

	swapiService = new SwapiService();

	onPersonSelected = (id) => {
		this.setState({
			personSelected : id
		});
	}

	render(){

		// if(this.state.hasError){
		// 	return <Error/>
		// }

		const itemList = (
			<ItemList 
				onPropsSelected = {this.onPersonSelected}
				getData = {this.swapiService.getAllPeople}>
				{(item) => `${item.name}  ( ${item.email})`}
			</ItemList>
		);

		const personDetails = (
			// <ErrorBoundry>
				<PersonDetails personId={this.state.personSelected}/>
			// </ErrorBoundry>
		);


		return (
			<ErrorBoundry>
				<Row left={itemList} right={personDetails}/>
			</ErrorBoundry>
		);
	}
}