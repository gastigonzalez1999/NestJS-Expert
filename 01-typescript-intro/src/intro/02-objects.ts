export const pokemonIds: number[] = [1,2,3,4];

// export const pokemon = {
//     id: 1,
//     name: 'Bulbasur'
// };

interface Pokemon {
    id: number;
    name: string;
}

export const bulbasur: Pokemon = {
    id: 1,
    name: 'Bulbasur'
}

export const pokemons: Pokemon[] = [bulbasur];