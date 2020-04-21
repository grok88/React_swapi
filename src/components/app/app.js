import React from 'react';
import './app.css';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemDetails, {Record} from '../item-details/item-details';
import ErrorButton from '../error-btn/error-btn';
import Error from '../error/error';
import SwapiService from '../../services/swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context/swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';

import {Row, PeoplePage} from '../people-page/people-page';

import {
	PersonList,
	PlanetsList,
	StarshipList,
	PersonDetails,
	PlanetDetails,
	StarshipDetails
} from '../sw-components/index';

export default class App  extends React.Component{
	state = {
		showPlanet : true,
		hasError : false,
		swapiService : new DummySwapiService()
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
			const Service = swapiService instanceof SwapiService ? DummySwapiService :   SwapiService;
			console.log(Service);
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
		const {getPerson, getImg, getPersomImg, getStarshipImg, getPlanetImg} = this.state.swapiService;

		const personDetails = (
			<ItemDetails itemId={9}	
				getData={getPerson}
				getImgUrl={getPersomImg}>

				<Record field='name' label="Name"/>	
				<Record field='email' label="Email"/>	
				<Record field='phone' label="Phone"/>	

			</ItemDetails>
			);

		const imgDetails = (
			<ItemDetails itemId={5}	
				getData={getImg}
				getImgUrl={getStarshipImg}>

				<Record field='title' label="Title:"/>	
				<Record field='id' label="Id image:"/>	
				<Record field='url' label="Url:"/>	

			</ItemDetails>
			);

		return (
			<SwapiServiceProvider value={this.state.swapiService}>	
				<div>
					<Header onChangeService={this.onChangeService}/>

					{planet}
					<div className='row mb2 button-row'>
						<button className='show-planet btn btn-warning btn-lg'
							onClick ={this.onTogglePlanet}>
							Toggle Planet
						</button>
						<ErrorButton />
					</div>

					<PersonDetails itemId={5}/>
					<PlanetDetails itemId={10}/>
					<StarshipDetails itemId={9}/>

					<PersonList/>
					<PlanetsList/>
					<StarshipList/>
						
					{/* <Row
						left={personDetails}
						right={imgDetails}
					/> */}

					{/* <PeoplePage/>  */}

					
					{/* <div className='row mb2'>
						<div className='col-md-6'>
							<ItemList 
								onPropsSelected = {this.onPersonSelected}
								getData = {this.state.swapiService.getAllImg}
								renderItem={(item) => item.title}/>
						</div>
						<div className='col-md-6'>
							<ItemDetails 
								personId={this.state.personSelected}/>
							<ErrorButton/>
						</div>
					</div>

					<div className='row mb2'>
						<div className='col-md-6'>
							<ItemList 
								onPropsSelected = {this.onPersonSelected}
								getData = {this.state.swapiService.getAllPosts}
								renderItem={(item) => (
									<span>
										{item.id} <button>!</button>
									</span>
								)}
								/>
						</div>
						<div className='col-md-6'>
							<ItemDetails 
								personId={this.state.personSelected}/>
							<ErrorButton/>
						</div>
					</div> */}
				</div>
			</SwapiServiceProvider>
		);
	}
}
