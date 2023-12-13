import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

export enum ReferenceType {
  Charges = 'Харажатлар',
  Partners = 'Хамкорлар',
  Prices = 'Нархлар',
  Storages = 'Омборхоналар',
  TMZ = 'Товар моддий бойликлар',
  Workers = 'Ходимлар'
}

export enum TypePartners {
  Clients,
  Suppliers
}

export enum TypeTMZ {
  Material,
  Product,
  Halfstuff
}

export type ReferenceDocument = HydratedDocument<Reference>;

@Schema()
export class Reference {
  @Prop({ required: true })
  name: string;

  @Prop({enum: ReferenceType, required: true})
  referencyType: ReferenceType
  
  @Prop()
  fullName?: string;

  @Prop({ enum: TypePartners })
  typePartners?: TypePartners

  @Prop({ enum: TypeTMZ })
  typeTMZ?: TypeTMZ

  @Prop()
  location?: string;

  @Prop()
  unit?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Reference);