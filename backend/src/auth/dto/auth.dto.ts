import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum UserRoles {
  ADMIN ='ADMIN',
  SUPERVIZER ='SUPERVIZER',
  OWNER ='OWNER',
  GLBUX ='GLBUX',
  KASSIR ='KASSIR',
  DOSTAVSHIK ='DOSTAVSHIK',
  GUEST = 'GUEST'
}

export class AuthDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;

}
