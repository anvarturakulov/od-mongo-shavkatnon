import { Type } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { DocumentType } from '../../interfaces/document.interface';

export class CreateDocumentDto {
  @IsNumber()
  date: number;

  @IsNumber()
  docNumber: number

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsOptional()
  @IsBoolean()
  deleted: boolean = false;

  @IsString()
  user: string

  @IsString()
  senderId: string

  @IsString()
  receiverId: string

  @IsBoolean()
  isWorker: boolean

  @IsBoolean()
  isPartner: boolean

  @IsString()
  analiticId: string

  @IsNumber()
  count: number

  @IsNumber()
  price: number

  @IsNumber()
  total: number

  @IsNumber()
  cashFromPartner: number

  @IsString()
  @IsOptional()
  comment?: string
}