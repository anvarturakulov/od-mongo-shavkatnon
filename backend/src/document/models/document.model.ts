import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { DocumentType } from '../../interfaces/document.interface';

export type DocDocument = HydratedDocument<Document>;

class DocTableItem{
  @Prop()
  referenceId: Types.ObjectId;

  @Prop()
  referenceName?: string;

  @Prop()
  count: number;
  
  @Prop()
  price: number;

  @Prop()
  total: number;
}

@Schema()
export class Document {
  @Prop({ required: true })
  date: number;

  @Prop()
  docNumber: number;

  @Prop({ enum: DocumentType })
  documentType: DocumentType;

  @Prop()
  senderId: Types.ObjectId;

  @Prop()
  receiverId: Types.ObjectId;
  
  @Prop({ type: () => [DocTableItem], _id: false })
  tableItems?: DocTableItem[];

  @Prop()
  payValue?: number;

  @Prop()
  deleted?: boolean;

}

export const DocumentSchema = SchemaFactory.createForClass(Document);