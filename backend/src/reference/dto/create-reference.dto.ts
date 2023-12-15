import { IsString, IsNumber, Min, Max, IsEnum, IsOptional, IsBoolean } from 'class-validator'
import { ReferenceType, TypePartners, TypeTMZ } from '../models/referense.model';

export class CreateReferenceDto {
  @IsString()
  name: string;

  @IsEnum(ReferenceType)
  referenceType: ReferenceType;
  
  @IsOptional()
  @IsEnum(TypePartners)
  typePartners?: TypePartners;
  
  @IsOptional()
  @IsEnum(TypeTMZ)
  typeTMZ?: TypeTMZ;
  
  @IsOptional()
  @IsString()
  unit?: string;
  
  @IsOptional()
  @IsBoolean()
  deleted: boolean = false;
  
  @IsOptional()
  @IsString()
  comment?: string;
}
