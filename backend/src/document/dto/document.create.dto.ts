import { Type } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { DocumentType } from '../../interfaces/document.interface';

class DocTableItemDto {
  @IsString()
  referenceId: string;

  @IsOptional()
  @IsString()
  referenceName: string;

  @IsNumber()
  count: number;

  @IsNumber()
  price: number;

  @IsNumber()
  total: number;
}

export class CreateDocumentDto {
  @IsDateString()
  date: Date;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;
  
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => DocTableItemDto)
  tableItems?: DocTableItemDto[];

  @IsOptional()
  @IsNumber()
  payValue?: number;
}
