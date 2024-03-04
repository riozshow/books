import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAuthorDTO {
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(3)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  country: string;
}
