import React from 'react';

import ItemList from '../item-list/item-list';
import withData from '../hoc-helpers/with-data';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();
const {
	getAllPeople,
	getAllImg,
	getAllPosts
} = swapiService;

const PersonList = withData(ItemList, getAllPeople);
const ImgList = withData(ItemList, getAllImg);
const PostsList = withData(ItemList, getAllPosts);

export {
	PersonList,
	ImgList,
	PostsList
}

