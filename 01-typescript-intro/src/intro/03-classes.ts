import axios from "axios";

export class Pokemon {
    // public id: number;
    // public name: string;

    // constructor(id: number, name: string) {
    //     this.id = id;
    //     this.name = name;
    // }

    //different ways for the same thing

    constructor(public readonly id: number, public name: string) {}

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }

    public scream() {
        console.log(`${this.name.toLocaleUpperCase()}`);
    }

    async getMoves(): Promise<number> {
       const res = await axios.get('https://pokeapi.co/api/v2/pokemon/4');

        return res.data.moves;
    }
}

export const charmander = new Pokemon(1, 'charmandar');