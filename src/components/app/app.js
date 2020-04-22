import React from 'react';
import './app.css';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ErrorButton from '../error-btn/error-btn';
import Error from '../error/error';
import SwapiService from '../../services/swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context/swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import PeoplePage from '../pages/people-page'; 
import PlanetsPage from '../pages/planets-page'; 
import StarshipsPage from '../pages/starships-page'; 

export default class App  extends React.Component{
	state = {
		showPlanet : true,
		hasError : false,
		swapiService : new SwapiService()
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

	onChangeService = () =>{
		console.log('Changed');
		this.setState( ( {swapiService} ) => {
			const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
			return {
				swapiService : new Service()
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
			<SwapiServiceProvider value={this.state.swapiService}>	
				<div>
					<Header onChangeService={this.onChangeService}/>

					{ planet }

					<div className='row mb2 button-row'>
						<button className='show-planet btn btn-warning btn-lg'
							onClick ={this.onTogglePlanet}>
							Toggle Planet
						</button>
						<ErrorButton />
					</div>

					<PeoplePage />
					<PlanetsPage/>
					<StarshipsPage />
					
				</div>
			</SwapiServiceProvider>
		);
	}
}
