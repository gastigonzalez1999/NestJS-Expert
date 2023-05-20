/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'The brand must be a string' })
  readonly brand: string;

  @IsString()
  readonly model: string;
}
