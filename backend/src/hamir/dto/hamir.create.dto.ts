import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateHamirDto {
  @IsNumber()
  date: number;

  @IsNumber()
  order?: number;

  @IsString()
  user: string

  @IsString()
  sectionId: string

  @IsString()
  analiticId: string

  @IsBoolean()
  proveden: boolean = false

}