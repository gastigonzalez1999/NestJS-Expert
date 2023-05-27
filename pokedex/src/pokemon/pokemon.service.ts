import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(body: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(body);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (isNaN(+term)) pokemon = await this.pokemonModel.findOne({ num: term });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with ud, name or num ${term} was not found`,
      );

    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({ name: term.trim() });

    return pokemon;
  }

  async update(term: string, body: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    try {
      await pokemon.updateOne(body, { new: true });

      return { ...pokemon.toJSON, ...body };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async delete(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    //const result = this.pokemonModel.findByIdAndDelete(id);

    const result = await this.pokemonModel.deleteOne({ _id: id });

    if (result.deletedCount)
      throw new BadRequestException(`Pokemon with id ${id} not found`);

    return result;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - check servr logs`,
    );
  }
}
