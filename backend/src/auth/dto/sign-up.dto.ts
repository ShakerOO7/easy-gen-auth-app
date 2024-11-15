import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(3)
  readonly name: string;

  // To make sure we have at least one letter in the password
  @Matches(/[a-zA-Z]/, { message: 'Password must have at least one letter' })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 0,
      minUppercase: 0,
    },
    {
      message:
        'Password must have at least one special character, one number and is at least 8 characters long',
    },
  )
  readonly password: string;
}
