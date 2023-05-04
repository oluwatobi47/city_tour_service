import { Types } from 'mongoose';
import ObjectId = Types.ObjectId

export type Entity<T> = T & {_id: ObjectId} & { id?: string } & { __v?: any };
