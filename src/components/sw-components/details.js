import React from 'react';

import ItemDetails , {Record} from '../item-details/item-details'
import {SwapiServiceConsumer} from '../swapi-service-context/swapi-service-context';

const PersonDetails = ({itemId}) => {
	return (
		<SwapiServiceConsumer>
			{
				({getPerson,getPersonImg}) => {
					return (
					<ItemDetails itemId={itemId}
											getData = {getPerson}
											getImgUrl={getPersonImg}>

						<Record field='name' label="Name"/>		
						<Record field='gender' label="Gender"/>	
						<Record field='birthYear' label="BirthYear"/>

					</ItemDetails>
					);
				}
			}
		</SwapiServiceConsumer>
	);
};

const PlanetDetails = ({itemId}) => {
	return (
		<SwapiServiceConsumer>
			{
				({getPlanet, getPlanetImg}) => {
					return (
					<ItemDetails itemId={itemId}
											getData = {getPlanet}
											getImgUrl={getPlanetImg}>

						<Record field='name' label="Name"/>	
						<Record field='population' label="Population:"/>	
						<Record field='rotationPeriod' label="Rotation Period:"/>

					</ItemDetails>
					);
				}
			}
		</SwapiServiceConsumer>
	);
};

const StarshipDetails = ({itemId}) => {
	return (
		<SwapiServiceConsumer>
			{
				({getStarship, getStarshipImg}) => {
					return (
					<ItemDetails itemId={itemId}
											getData = {getStarship}
											getImgUrl={getStarshipImg}>

						<Record field='model' label="Model:"/>	
						<Record field='crew' label="Crew:"/>	
						<Record field='costInCredits' label="costInCredits:"/>	

					</ItemDetails>

					);
				}
			}
		</SwapiServiceConsumer>
	);
};



export {
	PersonDetails,
	PlanetDetails,
	StarshipDetails
}