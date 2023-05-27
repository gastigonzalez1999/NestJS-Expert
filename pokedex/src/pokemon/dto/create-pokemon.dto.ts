import { MinLength, IsString, IsInt, IsPositive, Min } from 'class-validator';
export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  num: number;
}
