import React from 'react';
import './item-list.css'


// import SwapiService from '../../services/swapi-service';
// import withData from '../hoc-helpers/with-data';

class ItemList extends React.Component{
	renderItems(items){
		const {onPropsSelected} = this.props;
		return items.map((item, i)=>{
			const {id} = item;
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
		const {data} = this.props;
		const items = this.renderItems(data);
		return (
			<ul className='item-list list-group'>
				{items}
			</ul>
		);
	}
} 

export default ItemList;
// const {getAllPeople} = new SwapiService();

// export default withData(ItemList, getAllPeople);