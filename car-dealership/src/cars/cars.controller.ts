/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    //ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Put,
    //UsePipes,
    //ValidationPipe,
  } from '@nestjs/common';
  import { CarsService } from './cars.service';
  import { CreateCarDto } from './dto/create-car.dto';
  import { UpdateCarDto } from './dto/update-car.dto';
  
  @Controller('cars')
  export class CarsController {
    constructor(private readonly carsService: CarsService) {}
  
    @Get()
    getAllCars() {
      return this.carsService.findAll();
    }
  
    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
      return this.carsService.findById(id);
    }
  
    @Post()
    //@UsePipes(ValidationPipe)
    createCar(@Body() body: CreateCarDto) {
      return this.carsService.create(body);
    }
  
    @Put('/:id')
    updateCar(
      @Param('id', ParseUUIDPipe) id: string,
      @Body()
      body: UpdateCarDto,
    ) {
      return this.carsService.update(id, body);
    }
  
    @Delete('/:id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
      return this.carsService.delete(id);
    }
  }
  
