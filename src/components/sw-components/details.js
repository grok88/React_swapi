import React from 'react';

import SwapiService from '../../services/swapi-service';
import ItemDetails , {Record} from '../item-details/item-details'

const swapiService = new SwapiService();
const {
	getPerson,
	getStarship,
	getPlanet,
	getPersonImg,
	getStarshipImg,
	getPlanetImg
} = swapiService;

const PersonDetails = ({itemId}) => {
	console.log(itemId);
	return (
		<ItemDetails itemId={itemId}
								getData = {getPerson}
								getImgUrl={getPersonImg}>

			<Record field='name' label="Name"/>		
			<Record field='gender' label="Gender"/>	
			<Record field='birthYear' label="BirthYear"/>

		</ItemDetails>
	);
};

const PlanetDetails = ({itemId}) => {
	return (
		<ItemDetails itemId={itemId}
								getData = {getPlanet}
								getImgUrl={getPlanetImg}>

			<Record field='name' label="Name"/>	
			<Record field='population' label="Population:"/>	
			<Record field='rotationPeriod' label="Rotation Period:"/>

		</ItemDetails>
	);
};

const StarshipDetails = ({itemId}) => {
	return (
		<ItemDetails itemId={itemId}
								getData = {getStarship}
								getImgUrl={getStarshipImg}>

			<Record field='model' label="Model:"/>	
			<Record field='crew' label="Crew:"/>	
			<Record field='costInCredits' label="costInCredits:"/>	

		</ItemDetails>
	);
};



export {
	PersonDetails,
	PlanetDetails,
	StarshipDetails
}