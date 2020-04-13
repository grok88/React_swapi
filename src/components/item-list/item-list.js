import React from 'react';
import './item-list.css'

import Spinner from '../spinner/spinner';

export default class ItemList extends React.Component{
	state = {
		itemList : null
	}

	// swapiService = new SwapiService();

	componentDidMount = () => {
		const {getData} = this.props;

		getData()
			.then(itemList => {
				this.setState({
					itemList
				});
			})
	}

	
	// renderItems(items){
	// 	const {onPropsSelected} = this.props;
	// 	return items.map((item, i)=>{
	// 		for (i; i < 6; i++){
	// 			if(item.name){
	// 				return (
	// 					<li className='list-group-item'
	// 					key={item.id}
	// 					onClick={() => onPropsSelected(item.id)}>{item.name}</li>
	// 				);
	// 			} else if(item.url){
	// 				return (
	// 					<li className='list-group-item'
	// 					key={item.id}
	// 					onClick={() => onPropsSelected(item.id)}>{item.title}</li>
	// 				);
	// 			} else if (item.userId){
	// 				return (
	// 					<li className='list-group-item'
	// 					key={item.id}
	// 					onClick={() => onPropsSelected(item.id)}> Posts -{item.id}</li>
	// 				);
	// 			}
	// 		}
	// 	});
	// }

	renderItems(items){
		const {onPropsSelected} = this.props;
		return items.map((item, i)=>{
			const {id} = item;
			console.log(this.props.children);
			const label = this.props.children(item)
			for (i; i < 6; i++){
				
				return (
					<li className='list-group-item'
					key={id}
					onClick={() => onPropsSelected(id)}>{label}</li>
				);
			}
		});
	}

	render(){
		const {itemList} = this.state;

		if (!itemList){
			return <Spinner/>
		}
		
		const items = this.renderItems(itemList);
		return (
			<ul className='item-list list-group'>
				{items}
			</ul>
		);
	}
} 