import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from '../dto/auth.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;
  
  @Prop()
  passwordHash: string;

  @Prop({ enum: UserRoles})
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);