export default class SwapiService {

	_apiBase = 'https://swapi.dev/api';

	getResource = async (url) => {
		const response = await fetch(url);
		if (!response.ok){
			throw new Error(`Could not fetch - ${url}, received ${response.status}`);
		}
		const body = await response.json();
		return body; 
	}

	getAllPeople = async () => {
		const response = await this.getResource(`${this._apiBase}/people/`);
		return response.results.map(this._transformPerson);
	}

	getPerson = async(id) => {
		const person = await this.getResource(`${this._apiBase}/people/${id}`);
		return this._transformPerson(person);
	}

	getAllPlanets = async() => {
		const response = await this.getResource(`${this._apiBase}/planets/`);
		return response.results.map(this._transformPlanet);
	}

	getPlanet = async (id) => {
		const planet = await this.getResource(`${this._apiBase}/planets/${id}/`);
		return this._transformPlanet(planet)
	}

	getAllStarships = async() => {
		const response = await this.getResource(`${this._apiBase}/starships/`);
		return response.results.map(this._transformStarship);
	}

	getStarship = async(id) => {
		const response = await this.getResource(`${this._apiBase}/starships/${id}`);
		return this._transformStarship(response);
	}

	getPersonImg = (item) => {
		return `https://starwars-visualguide.com/assets/img/characters/${item.id}.jpg`;
	}

	getStarshipImg = (item) => {
		return `https://starwars-visualguide.com/assets/img/starships/${item.id}.jpg`;
	}

	getPlanetImg = (item) => {
		return `https://starwars-visualguide.com/assets/img/planets/${item.id}.jpg`;
	}
	// async getStarships(){
	// 	const response = await this.getResource(`/starships/`);
	// 	return response.results.map(this._transformStarship);
	// }

	// async getStarship(id){
	// 	const starShip = await this.getResource(`/starships/${id}/`);
	// 	return this._transformPerson(starShip);
	// }

	_extractId(item){
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];

	}

	// _transformImg = (planet) =>{
	// 	return {
	// 		id : planet.id,
	// 		title : planet.title,
	// 		url : planet.url,
	// 		thumbnailUrl : planet.thumbnailUrl
	// 	}
	// }
	

	_transformPerson = (person) =>{
		return {
			id : this._extractId(person),
			name : person.name,
			gender : person.gender,
			birthYear : person.birth_year,
			eyeColor : person.eye_color
		}
	}
	
	_transformPlanet = (planet) =>{
		return {
			id : this._extractId(planet),
			name : planet.name,
			population : planet.population,
			rotationPeriod : planet.rotation_period,
			diameter : planet.diameter
		}
	}

	
	_transformStarship = (starship) =>{
		return {
			id : this._extractId(starship),
			name : starship.name,
			model : starship.model,
			manufacturer : starship.manufacturer,
			costInCredits : starship.cost_in_credits,
			length : starship.length,
			crew : starship.crew,
			passengers : starship.passengers,
			cargoCapacity : starship.cargo_capacity
		}
	}
}
// _transformPost = (post) => {
// 	return {
// 		id : post.id,
// 		userId : post.userId,
// 		title : post.title,
// 		body : post.body
// 	}
// }
