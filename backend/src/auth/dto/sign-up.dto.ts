import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(3)
  readonly name: string;

  @MaxLength(20)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must have at least one uppercase letter, one lowercase letter, one symbol, one number and at least 8 characters long',
    },
  )
  readonly password: string;
}
