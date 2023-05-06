import {Injectable} from '@nestjs/common';
// import {Cloudinary} from 'cloudinary';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {

  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_API_NAME'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
    })
  }

  public uploadImage(file): Promise<string> {
    const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

    // const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})
    return res.then((data) => {
      console.log(data);
      console.log(data.secure_url);
      return data.secure_url
    });

    // const options: Cloudinary.UploadOptions = {
    //   folder: 'images',
    //   format: 'jpg',
    //   quality: 80,
    // };
    // return this.cloudinary.uploader().upload(file.buffer, options);
  }


}
