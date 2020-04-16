import React from 'react';

import ItemList from '../item-list/item-list';
import withData from '../hoc-helpers/with-data';
import SwapiService from '../../services/swapi-service';
import ItemDetails , {Record} from '../item-details/item-details'

const swapiService = new SwapiService();
const {
	getPerson,
	getImg,
	getPost,
	getPersonImg,
	getStarshipImg,
	getPlanetImg
} = swapiService;

const PersonDetails = ({itemId}) => {
	return (
		<ItemDetails itemId={itemId}
								getData = {getPerson}
								getImgUrl={getPersonImg}>

			<Record field='name' label="Name"/>	
			<Record field='email' label="Email"/>	
			<Record field='phone' label="Phone"/>

		</ItemDetails>
	);
};

const ImgDetails = ({itemId}) => {
	return (
		<ItemDetails itemId={itemId}
								getData = {getImg}
								getImgUrl={getStarshipImg}>

			<Record field='title' label="Title:"/>	
			<Record field='id' label="Id image:"/>	
			<Record field='url' label="Url:"/>

		</ItemDetails>
	);
};

const PostsDetails = ({itemId}) => {
	return (
		<ItemDetails itemId={itemId}
								getData = {getPost}
								getImgUrl={getPlanetImg}>

			<Record field='title' label="Title:"/>	
			<Record field='id' label="Id image:"/>	

		</ItemDetails>
	);
};

export {
	PersonDetails,
	ImgDetails,
	PostsDetails
}