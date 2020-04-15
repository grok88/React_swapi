import React from 'react';
import './item-details.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorButton from '../error-btn/error-btn'

const Record = ({item, field,label}) => {
		// console.log(item, field, label);
	return (
		<li className='list-group-item'>
			<span className='term'>{label}</span>
			<span>{item[field]}</span>
		</li>
	);
}

export {Record};

export default class ItemDetails extends React.Component {
	state = {
		item : null,
		image : null
	}

	swapiService = new SwapiService();

	componentDidMount(){
		this.updatePerson();
	}

	componentDidUpdate(prevProps){
		if(this.props.itemId !== prevProps.itemId){
			this.updatePerson();
		}
	}

	updatePerson = () =>{
		const {itemId, getData, getImgUrl} = this.props;

		if (!itemId){
			return;
		}


		getData(itemId)
			.then(item => {
				this.setState({
					item,
					image : getImgUrl(item)
				});
			});
	};

	render(){

		if(!this.state.item){
			return (<span>
					Select a item from List
				</span>)
		}
		
		const {item, image} = this.state;
		const {id, name,email,phone, website} = item;
		// const itemRender = this.props.itemRender(item); 


		return (
			<div className='item-details card'>
				<img className='item-image'
					// src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
					src={image}/>
					<div className='card-body'>
						<h4>
							{name}
						</h4>
						<ul className='list-group list-group-flush'>
							{
								React.Children.map(this.props.children, (child, index) => {
									return React.cloneElement(child, {item});
								})	
							}
							{/* <Record/>
							<li className='list-group-item'>
								<span className='term'>Email</span>
								<span>{email}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Phone</span>
								<span>{phone}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Eye Color</span>
								<span>{website}</span>
							</li> */}
						</ul>
						<ErrorButton/>
					</div>
			</div>
		);
	}
}
