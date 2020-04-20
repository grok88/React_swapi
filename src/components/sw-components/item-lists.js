import React from 'react';

import ItemList from '../item-list/item-list';
import withData from '../hoc-helpers/with-data';
import withSwapiService from '../hoc-helpers/with-swapi-service';


const withChildFunc = (Wrapped, fn) => {
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

const PersonList = withSwapiService(
		withData(withChildFunc(ItemList, renderName)),
		mapPersonMethodsToProps);
const PlanetsList = withSwapiService(
		withData(withChildFunc(ItemList, renderName)),
		mapPlanetMethodsToProps);
const StarshipList = withSwapiService(
		withData(withChildFunc(ItemList, renderName)),
		mapStarshipMethodsToProps); 

export {
	PersonList,
	PlanetsList,
	StarshipList
}

