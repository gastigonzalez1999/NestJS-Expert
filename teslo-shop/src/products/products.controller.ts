import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: 201, 'description': 'Product was created', type: Product })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @ApiResponse({ status: 403, 'description': 'Forbidden - Token' })
  @Post()
  @Auth()
  create(@Body() body: CreateProductDto,
  @GetUser() user: User,
  ) {
    return this.productsService.create(body, user);
  }

  @ApiResponse({ status: 200, type: [Product] })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.productsService.findAll(query);
  }

  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @ApiResponse({ status: 201, 'description': 'Product was updated', type: Product })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @ApiResponse({ status: 403, 'description': 'Forbidden - Token' })
  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() body: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, body, user);
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, 'description': 'Bad request' })
  @ApiResponse({ status: 403, 'description': 'Forbidden - Token' })
  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
