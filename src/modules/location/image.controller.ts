import {CloudinaryService} from './cloudinary.service';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from '../../models/location.model';

@Controller('image')
export class ImageController {

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  public async uploadImage(file: Express.Multer.File): Promise<string> {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return imageUrl;
  }


  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: Image,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
