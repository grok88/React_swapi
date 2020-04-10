import React from 'react';
import './random-planet.css'

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

export default class RandomPlanet extends React.Component {
	constructor(){
		super();
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, 10000);
	}

	swapiService = new SwapiService();

	state = {
		planet : {},
		loading : true
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}
	
	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading : false,
			error : false
		});
	}

	onError = (err) => {
		this.setState({
			error : true,
			loading :false
		});
	}

	updatePlanet = () => {
		const id = Math.floor(Math.random()*25) + 2;
		this.swapiService.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	}

	render(){
		const {planet, loading, error} = this.state;
		const hasData = !(loading || error);
		// if (loading) return <Spinner/>;
		const errorMessage = error ? <Error/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = hasData ? <PlanetView planet={planet}/> : null;
		return (
			<div className='random-planet jumbotron rounded'>
				{errorMessage}
				{spinner}
				{content}
			</div>
		);
	}
}

const PlanetView = ({planet}) => {
	const {id, name, population, rotationPeriod, diameter} = planet;
	return (
		<React.Fragment>
			<img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
					className='random-image'/>
			<div>
				<h4>{name}</h4>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<span className='term'>Population</span>
						<span>{population}</span>
					</li>
					<li className='list-group-item'>
						<span className='term'>Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className='list-group-item'>
						<span className='term'>Diametr</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
}