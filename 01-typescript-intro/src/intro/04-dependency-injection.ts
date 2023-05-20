import { HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter } from "../api/pokeApi.adapter";
import { Move, PokeAPIResponse } from "../interfaces/pokeapi-response.interface";

export class Pokemon {
    // public id: number;
    // public name: string;

    // constructor(id: number, name: string) {
    //     this.id = id;
    //     this.name = name;
    // }

    //different ways for the same thing

    constructor(
        public readonly id: number, 
        public name: string, 
        private readonly http: HttpAdapter
    ) {}

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }

    public scream() {
        console.log(`${this.name.toUpperCase()}`);
    }

    async getMoves(): Promise<Move[]> {
        //const res = await axios.get('https://pokeapi.co/api/v2/pokemon/4');
        const data = await this.http.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/4');

        return data.moves;
    }
}

const pokeApiAxios = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon(1, 'charmandar', pokeApiAxios);
export const bulbasur = new Pokemon(4, 'Bulbasur', pokeApiFetch);