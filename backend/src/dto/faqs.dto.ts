import { IsNotEmpty } from 'class-validator';
export class FaqsDto {
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  answer: string;
}

export class FaqsArrangeDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  sequence_number: number;
}
