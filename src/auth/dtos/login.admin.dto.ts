import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthAdminLoginDTO {
  @IsString()
  email: string;
  
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
