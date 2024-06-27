import { IsNotEmpty } from 'class-validator';

export class GeneratePdfDto {
  @IsNotEmpty()
  html: string;
}
