import React from 'react';
import './random-planet.css'

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

export default class RandomPlanet extends React.Component {
	state = {
		planet : {},
		loading : true,
		error : false
	}

	swapiService = new SwapiService();

	componentDidMount(){
		this.updatePlanet();;
	}

	// componentWillUnmount(){
	// 	clearInterval(this.interval);
	// }
	
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
		this.swapiService.getImg(id)
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
	const {id,title, url, thumbnailUrl} = planet;
	return (
		<React.Fragment>
			<img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
					className='random-image'/>
			<div>
				<h4>Данные о картине</h4>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<span className='term'>Tittle</span>
						<span>{title}</span>
					</li>
					<li className='list-group-item'>
						<span className='term'>Url</span>
						<span>{url}</span>
					</li>
					<li className='list-group-item'>
						<span className='term'>ThumbnailUrl</span>
						<span>{thumbnailUrl}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
}