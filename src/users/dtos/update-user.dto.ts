import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  password?: string;
}
