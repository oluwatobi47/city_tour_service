import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { UserDTO } from '../../dto/user/user.dto';
import { UserRegistrationDto } from '../../dto/auth/user-registration.dto';
import { UtilService } from '../../shared/services/util.service';
import { Entity } from '../../shared/types/model';
import { UserPreferenceDTO } from '../../dto/user/user-preference.dto';
import { City } from '../../models/city.model';
import { UserPreference } from '../../models/user-preference.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(City.name) private readonly cityModel: Model<City>,
    private readonly utilService: UtilService
  ) {}

  private generateUsername(firstName: string, lastName: string) {
    return `${firstName}.${lastName}${this.utilService.generateRandomNumber()}`.toLowerCase();
  }

  async createUser(user: UserDTO): Promise<User> {
    const newUser = new this.userModel();
    Object.keys(user).forEach((key: keyof UserDTO) => {
      newUser.set(key, user[key]);
    });
    return newUser.save();
  }

  async createNewUser(userSignUp: UserRegistrationDto): Promise<UserDTO> {
    const newUser = new this.userModel();
    Object.keys(userSignUp).forEach((key: keyof UserDTO) => {
      newUser.set(key, userSignUp[key]);
    });
    // TODO: Encrypt password
    newUser.set('username', this.generateUsername(userSignUp.firstName, userSignUp.lastName));
    return newUser.save().then((user) => {
      return this.mapToDTO(user.toObject());
    });
  }

  findUser(userId: string): Promise<UserDTO> {
    return this.userModel
      .findById(userId)
      .exec()
      .then((doc) => (doc ? this.mapToDTO(doc.toObject()) : null));
  }

  async updateUser(userDTO: UserDTO): Promise<UserDTO> {
    const user = await this.userModel.findById(userDTO.id).exec();
    const updateAttributes = ['email', 'firstName', 'lastName', 'phone'];
    if (user) {
      updateAttributes.map((key) => user.set(key, userDTO[key]));
    }
    return this.userModel
      .findByIdAndUpdate(user.id, user, { new: true })
      .exec()
      .then((res) => this.mapToDTO(res.toObject()));
  }

  async updateUserPreference(userId: string, userPreferenceDTO: UserPreferenceDTO): Promise<UserDTO> {
    const user: User = await this.userModel
      .findById(userId)
      .exec()
      .then((res) => res.toObject());
    const updateCity = userPreferenceDTO.activeCity?.id
      ? await this.cityModel.findById(userPreferenceDTO.activeCity.id).exec()
      : null;

    //TODO: Get a more optimal way of updating nested documents
    const updatedPref = { ...user.userPreference, ...userPreferenceDTO, activeCity: updateCity };
    return this.userModel
      .findByIdAndUpdate(userId, { $set: { ['userPreference']: updatedPref } }, { new: true })
      .exec()
      .then((res) => this.mapToDTO(res.toObject()));
  }

  deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  mapToDTO(user: Entity<User>): UserDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, password, ...userDTO } = user;
    return {
      ...userDTO,
      id: _id.toString(),
      userPreference: userDTO.userPreference
        ? this.mapPreferenceToDTO(<Entity<UserPreference>>userDTO.userPreference)
        : null,
    };
  }

  mapPreferenceToDTO(userPref: Entity<UserPreference>): UserPreferenceDTO {
    const { activeCity, _id, ...dto } = userPref;
    return {
      ...dto,
      activeCity: activeCity
        ? {
            id: (activeCity as Entity<City>)._id.toString(),
            name: activeCity.name,
            coordinates: activeCity.coordinates,
            country: activeCity.country,
          }
        : undefined,
    };
  }

  findUserByEmail(email: string): Promise<Entity<User>> {
    return this.userModel
      .find({ email: { $eq: email } })
      .exec()
      .then((res) => {
        return res.length ? res[0].toObject() : null;
      });
  }
}
