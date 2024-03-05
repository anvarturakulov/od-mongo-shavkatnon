import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum UserRoles {
  ADMIN = 'ADMIN',
  HEADCOMPANY = 'HEADCOMPANY',
  ZAMGLBUX = 'ZAMGLBUX',
  GLBUX = 'GLBUX',
  ELAKCHI = 'ELAKCHI',
  HAMIRCHI = 'HAMIRCHI',
  ZUVALACHI = 'ZUVALACHI',
  HEADSECTION = 'HEADSECTION',
  DELIVERY = 'DELIVERY',
  SELLER = 'SELLER',
  GUEST = 'GUEST',
}

export class AuthDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role: UserRoles;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  storageId: string;

}
