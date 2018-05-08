import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PokemonData {
  name: string,
  abilities: {ability: {name: string}}[]
}
interface AbilityData {
  name: string,
  pokemon: {pokemon: {name: string}}[]
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getArcanine();
  }
  getArcanine() {
    let arcanineObservable = this._http.get("https://pokeapi.co/api/v2/pokemon/59/");
    arcanineObservable.subscribe(this.processMainPokeData);
  }
  processMainPokeData = (data: PokemonData) => {
    let outStr = `${data.name} has abilities:`;
    for(let i=0; i<data.abilities.length; i++) {
      outStr += ` ${data.abilities[i].ability.name}`;
    }
    console.log(outStr);
    for(let i=0; i<data.abilities.length; i++) {
      let abilityObservable = this._http.get(`https://pokeapi.co/api/v2/ability/${data.abilities[i].ability.name}`);
      abilityObservable.subscribe(this.processAbilityData);
    }
  }
  processAbilityData = (data: AbilityData) => {
    let outStr = `Other pokemon with ${data.name}:`;
    for(let i=0; i<data.pokemon.length; i++) {
      outStr += ` ${data.pokemon[i].pokemon.name}`;
    }
    console.log(outStr);
  }
}
