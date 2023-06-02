/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({}); //delete * from pokemons
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const pokemonToInsert: { name: string, num: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const num: number = +segments[segments.length - 2];

      //const pokemon = await this.pokemonModel.create({ name, url });
      pokemonToInsert.push({ name, num });
    });

    await this.pokemonModel.insertMany(pokemonToInsert); //insert into pokemons (name, num)

    return 'Seed executed';
  }
}
