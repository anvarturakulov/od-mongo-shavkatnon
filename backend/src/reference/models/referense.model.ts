import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TypeReference, TypePartners, TypeTMZ } from '../../interfaces/reference.interface';

export type ReferenceDocument = HydratedDocument<Reference>;

@Schema()
export class Reference {
  @Prop({ required: true })
  name: string;

  @Prop()
  deleted?: boolean

  @Prop({ enum: TypeReference, required: true })
  typeReference: TypeReference

  @Prop({ enum: TypePartners })
  typePartners?: TypePartners

  @Prop({ enum: TypeTMZ })
  typeTMZ?: TypeTMZ

  @Prop()
  unit?: string;

  @Prop()
  comment?: string;

}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);