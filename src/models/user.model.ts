import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserType } from './enums/user-type.enum';
import { UserPreference } from './user-preference.model';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop({ required: [true] })
  firstName: string;

  @Prop({ required: [true] })
  lastName: string;

  @Prop({ required: [true], unique: [true, 'Email already exists'] })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserType, default: UserType.TOURIST })
  userType: UserType;

  @Prop({ type: UserPreference, ref: UserPreference.name, default: new UserPreference() })
  userPreference: UserPreference;
}

export const UserSchema = SchemaFactory.createForClass(User);
