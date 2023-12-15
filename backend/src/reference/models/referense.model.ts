import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';

export enum ReferenceType {
  CHARGES ='CHARGES',
  PARTNERS ='PARTNERS',
  PRICES ='PRICES',
  STORAGES ='STORAGES',
  TMZ ='TMZ',
  WORKERS ='WORKERS'
}

export enum TypePartners {
  CLIENTS ='CLIENTS',
  SUPPLIERS ='SUPPLIERS'
}

export enum TypeTMZ {
  MATERIAL='MATERIAL',
  PRODUCT='PRODUCT',
  HALFSTUFF ='HALFSTUFF'
}

export type ReferenceDocument = HydratedDocument<Reference>;

@Schema()
export class Reference {
  @Prop({ required: true })
  name: string;
  
  @Prop()
  deleted?: boolean
  
  @Prop({enum: ReferenceType, required: true})
  referenceType: ReferenceType
  
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