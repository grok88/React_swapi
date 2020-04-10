import React from 'react';
import './app.css';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorButton from '../error-btn/error-btn';
import Error from '../error/error';

import PeoplePage from '../people-page/people-page';

export default class App  extends React.Component{
	state = {
		showPlanet : true,
		hasError : false
	}

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
				<PeoplePage/>
				<PeoplePage/>
			</div>
		);
	}
}
