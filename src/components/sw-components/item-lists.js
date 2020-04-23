import React from 'react';

import ItemList from '../item-list/item-list';
import withData from '../hoc-helpers/with-data';
import withSwapiService from '../hoc-helpers/with-swapi-service';


const withChildFunc = ( fn ) => ( Wrapped ) => {
	return (props) => {
		return (
			<Wrapped {...props}>
				{fn}
			</Wrapped>
		);
	}
}
const renderName = ({name}) => <span>{name}</span>;

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData : swapiService.getAllPeople
	}
}
const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData : swapiService.getAllPlanets
	}
}
const mapStarshipMethodsToProps = (swapiService) => {
	return {
		getData : swapiService.getAllStarships
	}
}

const PersonList = withSwapiService(mapPersonMethodsToProps)(
					withData(
						withChildFunc(renderName)(
							ItemList)));

const PlanetsList = withSwapiService(mapPlanetMethodsToProps)(
				withData(
					withChildFunc(renderName)(
						ItemList)));

const StarshipList = withSwapiService(	mapStarshipMethodsToProps)(
				withData(
					withChildFunc(renderName)(
						ItemList))); 

export {
	PersonList,
	PlanetsList,
	StarshipList
}

