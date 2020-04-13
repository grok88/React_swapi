import React from 'react';
import './app.css';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorButton from '../error-btn/error-btn';
import Error from '../error/error';
import SwapiService from '../../services/swapi-service';

import PeoplePage from '../people-page/people-page';

export default class App  extends React.Component{
	state = {
		showPlanet : true,
		hasError : false
	}

	swapiService = new SwapiService();

	componentDidCatch(){
		console.log('componentDidCatch');
		this.setState({hasError : true});
	}

	onTogglePlanet = () => {
		this.setState((state) => {
			return {
				showPlanet : !state.showPlanet
			}
		});
	}

	render(){
		if (this.state.hasError){
			// return <h1>Sorry, we have big mistake</h1>
			return <Error/>
		}
		const planet = this.state.showPlanet ? <RandomPlanet /> : null;
		return (
			<div>
				<Header/>
				{planet}
				<div className='row mb2 button-row'>
					<button className='show-planet btn btn-warning btn-lg'
						onClick ={this.onTogglePlanet}>
						Toggle Planet
					</button>
					<ErrorButton />
				</div>

				<PeoplePage/>
				
				{/* <div className='row mb2'>
					<div className='col-md-6'>
						<ItemList 
							onPropsSelected = {this.onPersonSelected}
							getData = {this.swapiService.getAllImg}
							renderItem={(item) => item.title}/>
					</div>
					<div className='col-md-6'>
						<PersonDetails 
							personId={this.state.personSelected}/>
						<ErrorButton/>
					</div>
				</div>

				<div className='row mb2'>
					<div className='col-md-6'>
						<ItemList 
							onPropsSelected = {this.onPersonSelected}
							getData = {this.swapiService.getAllPosts}
							renderItem={(item) => (
								<span>
									{item.id} <button>!</button>
								</span>
							)}
							/>
					</div>
					<div className='col-md-6'>
						<PersonDetails 
							personId={this.state.personSelected}/>
						<ErrorButton/>
					</div>
				</div> */}
			</div>
		);
	}
}
