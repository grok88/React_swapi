import React from 'react';
import './error-btn.css';

export default class ErrorButton extends React.Component {
	state = {
		renderError : false
	}

	render(){
		if (this.state.renderError){
			this.foo.bar = 0;
		}
		return(
			<button className='btn error-button btn-danger'
				onClick={() => this.setState({renderError:true})}>
				Throw Error
			</button>
		);
	}
}