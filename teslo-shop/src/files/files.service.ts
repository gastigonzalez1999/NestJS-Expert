import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  UploadedFile(file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sure your sending a file');

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return { secureUrl };
  }

  getStaticProductImage (imageName: string) {
    const path = join(__dirname, '../../static/uploads', imageName);

    if (!existsSync(path))
      throw new BadRequestException(`No product found with image $imageName}`);

    return path;
  }
}
