import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  readonly email: string;

  @MinLength(1)
  @IsNotEmpty()
  readonly password: string;
}
