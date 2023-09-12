import { IsString, IsNumber } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly latitude: number;

  @IsNumber()
  readonly longitude: number;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly categoryId: number;
}
