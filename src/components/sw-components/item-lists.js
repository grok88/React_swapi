import React from 'react';

import ItemList from '../item-list/item-list';
import withData from '../hoc-helpers/with-data';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();
const {
	getAllPeople,
	getAllPlanets,
	getAllStarships
} = swapiService;

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


const PersonList = withData(withChildFunc(ItemList, renderName),getAllPeople);
const PlanetsList = withData(withChildFunc(ItemList, renderName), getAllPlanets);
const StarshipList = withData(withChildFunc(ItemList, renderName), getAllStarships);

export {
	PersonList,
	PlanetsList,
	StarshipList
}

