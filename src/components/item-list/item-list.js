import React from 'react';
import './item-list.css'

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';

export default class ItemList extends React.Component{
	state = {
		people : null
	}

	swapiService = new SwapiService();

	componentDidMount = () => {
		this.swapiService.getAllPeople()
			.then(peopleList => {
				this.setState({
					peopleList
				});
			})
	}

	renderItems(items){
		const {onPropsSelected} = this.props;
		return items.map(({name, id})=>{
			return (
				<li className='list-group-item'
				key={id}
				onClick={() => onPropsSelected(id)}>{name}</li>
			);
		});
	}

	render(){
		const {peopleList} = this.state;

		if (!peopleList){
			return <Spinner/>
		}
		
		const items = this.renderItems(peopleList);
		return (
			<ul className='item-list list-group'>
				{items}
			</ul>
		);
	}
} 