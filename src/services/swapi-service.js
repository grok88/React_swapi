export default class SwapiService {

	getResource = async (url) => {
		const response = await fetch(url);
		if (!response.ok){
			throw new Error(`Could not fetch - ${url}, received ${response.status}`);
		}
		const body = await response.json();
		return body; 
	}

	getAllPeople = async () => {
		const response = await this.getResource(`http://jsonplaceholder.typicode.com/users`);
		return response.map(this._transformPerson);
	}

	getPerson = async(id) => {
		const person = await this.getResource(`http://jsonplaceholder.typicode.com/users/${id}`);
		return this._transformPerson(person);
	}

	getAllImg = async() => {
		const response = await this.getResource(`http://jsonplaceholder.typicode.com/photos/`);
		return response.map(this._transformImg);
	}

	getImg = async (id) => {
		const planet = await this.getResource(`http://jsonplaceholder.typicode.com/photos/${id}`);
		return this._transformImg(planet)
	}

	getAllPosts = async() => {
		const response = await this.getResource(`http://jsonplaceholder.typicode.com/posts`);
		return response.map(this._transformPost);
	}

	getPost = async(id) => {
		const response = await this.getResource(`http://jsonplaceholder.typicode.com/posts/${id}`);
		return response.map(this._transformPost(response));
	}

	// async getStarships(){
	// 	const response = await this.getResource(`/starships/`);
	// 	return response.results.map(this._transformStarship);
	// }

	// async getStarship(id){
	// 	const starShip = await this.getResource(`/starships/${id}/`);
	// 	return this._transformPerson(starShip);
	// }

	// _extractId(item){
	// 	const idRegExp = /\/([0-9]*)\/$/;
	// 	return item.url.match(idRegExp)[1];

	// }

	_transformImg = (planet) =>{
		return {
			id : planet.id,
			title : planet.title,
			url : planet.url,
			thumbnailUrl : planet.thumbnailUrl
		}
	}
	

	_transformPerson = (person) =>{
		return {
			// id : this._extractId(person),
			id : person.id,
			name : person.name,
			email : person.email,
			phone : person.phone,
			website : person.website
		}
	}

	_transformPost = (post) => {
		return {
			id : post.id,
			userId : post.userId,
			title : post.title,
			body : post.body
		}
	}

	// _transformPlanet = (planet) =>{
	// 	return {
	// 		id : this._extractId(planet),
	// 		name : planet.name,
	// 		population : planet.population,
	// 		rotationPeriod : planet.rotation_period,
	// 		diameter : planet.diameter
	// 	}
	// }

	// _transformStarship = (starship) =>{
	// 	return {
	// 		id : this._extractId(starship),
	// 		name : starship.name,
	// 		model : starship.model,
	// 		manufacturer : starship.manufacturer,
	// 		costInCredits : starship.cost_in_credits,
	// 		length : starship.length,
	// 		crew : starship.crew,
	// 		passengers : starship.passengers,
	// 		cargoCapacity : starship.cargo_capacity
	// 	}
	// }
}
