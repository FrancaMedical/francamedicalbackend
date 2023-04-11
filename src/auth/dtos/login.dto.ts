import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  nome: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
