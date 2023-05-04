import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  // TODO: To implement logging, model mapping and other conversions

  mapDTOToModel<T, R>(dto: T, model?: R): R {
    const m: R = model ?? <R>{};
    Object.keys(dto).forEach(key => {
      if(m.hasOwnProperty(key) && (typeof m[key] == typeof dto[key])) {
        m[key] = dto[key];
      }
    });
    return m;
  }

  generateRandomNumber() {
    const minLength = 2;
    const maxLength = 5;
    const randomNumber = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomString = randomNumber.toString();
    // Pad the random string with zeros to the desired length
    while (randomString.length < maxLength) {
      randomString = "0" + randomString;
    }
    return randomString;
  }

  mapModelToDTO<T, R >(model: T & Record<any, any>, dto: R): R {
    if(model['__v']) {
      delete model['__v']
    }

    Object.keys(dto).forEach(key => {
      if(key in model) {
        dto[key] = model[key]
      }
    });
    return dto;
  }
}
