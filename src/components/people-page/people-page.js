import React from 'react';
import './people-page.css';

import ItemList from '../item-list/item-list';
import ItemDetails, {Record} from '../item-details/item-details';
import ErrorButton from '../error-btn/error-btn';
import Error from '../error/error';
import SwapiService from '../../services/swapi-service';


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

const Row = ({left, right}) => {
	return (
		<div className='row mb2 people'>
			<div className='col-md-6'>
				<ErrorBoundry>
					{left}
				</ErrorBoundry>
			</div>
			<div className='col-md-6'>
				<ErrorBoundry>
					{right}
				</ErrorBoundry>
			</div>
		</div>
	);
}


class PeoplePage extends React.Component{
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

		const itemList = (
			<ItemList 
				onPropsSelected = {this.onPersonSelected}
				getData = {this.swapiService.getAllPeople}>
				{(item) => `${item.name}  ( ${item.email})`}
			</ItemList>
		);

		const personDetails = (
			<ErrorBoundry>
				<ItemDetails itemId={this.state.personSelected}
							getData = {this.swapiService.getPerson}
							getImgUrl={this.swapiService.getPersomImg}>

						<Record field='name' label="Name"/>	
						<Record field='email' label="Email"/>	
						<Record field='phone' label="Phone"/>

				</ItemDetails>
			</ErrorBoundry>
		);


		return (
			// <ErrorBoundry>
				<Row left={itemList} right={personDetails}/>
			// </ErrorBoundry>
		);
	}
}

export {Row, PeoplePage};