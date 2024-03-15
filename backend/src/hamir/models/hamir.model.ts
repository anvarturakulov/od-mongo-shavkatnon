import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';

export type DocHamir = HydratedDocument<Hamir>;

@Schema()
export class Hamir {

  @Prop({ required: true })
  date: number;

  @Prop()
  order: number
  
  @Prop()
  user: string

  @Prop()
  sectionId: Types.ObjectId

  @Prop()
  analiticId: Types.ObjectId

  @Prop()
  proveden: boolean

}

export const HamirSchema = SchemaFactory.createForClass(Hamir);
