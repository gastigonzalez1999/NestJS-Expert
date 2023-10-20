import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter } from './helpers/file-filter';
import { fileNamer } from './helpers/file-namer';
import { Product } from 'src/products/entities/product.entity';


@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    return res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter,
    //limits: { fileSize: 1000 }
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer,
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.UploadedFile(file);
  }
}
