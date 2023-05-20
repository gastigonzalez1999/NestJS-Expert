/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'fiat',
      model: 'mobi',
    },
    {
      id: uuid(),
      brand: 'toyota',
      model: 'corolla',
    },
    {
      id: uuid(),
      brand: 'bmw',
      model: 'm5',
    },
  ];

  public findAll() {
    return this.cars;
  }

  public findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car)
      throw new NotFoundException(`Car with id:${id} not found`);

    return car;
  }

  public create(body: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...body,
    };

    this.cars.push(car);

    return car;
  }

  public update(id: string, body: UpdateCarDto) {

    let existingCar = this.findById(id);

    this.cars = this.cars.map(car => {
      if (car.id === id) {

        existingCar = {
          ...existingCar,
          ...body,
          id,
        };

        return existingCar;
      }
      return car;
    })

    return existingCar;
  }

  public delete(id: string) {
    this.findById(id);
    this.cars = this.cars.filter(car => car.id !== id);
  }
}

