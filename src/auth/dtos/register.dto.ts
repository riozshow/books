import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegisterDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(5)
  @MaxLength(40)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Match('password')
  passwordRepeat: string;
}
