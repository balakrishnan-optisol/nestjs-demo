import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name = '';

  @IsString()
  last_name = '';

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @IsString()
  father_name = '';

  @IsString()
  occupation = '';
}
