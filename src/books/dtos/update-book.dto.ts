import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  Max,
  MinLength,
  IsUUID,
} from 'class-validator';

export class UpdateBookDTO {
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Max(5)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @Max(1000)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  authorId: string;
}
