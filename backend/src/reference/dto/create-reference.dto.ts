import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator'
import { TypeReference, TypePartners, TypeTMZ } from '../../interfaces/reference.interface';

export class CreateReferenceDto {
  @IsString()
  name: string;

  @IsEnum(TypeReference)
  typeReference: TypeReference;

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
  deleted?: boolean = false;

  @IsOptional()
  @IsString()
  comment?: string;
  
  @IsOptional()
  @IsBoolean()
  delivery?: boolean;

  @IsOptional()
  @IsBoolean()
  filial?: boolean;

  @IsOptional()
  @IsBoolean()
  sklad?: boolean;

  @IsOptional()
  @IsBoolean()
  un?: boolean;

  @IsOptional()
  @IsString()
  clientForDeliveryId: string  
}
