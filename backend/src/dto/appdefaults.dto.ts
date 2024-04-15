import { IsNotEmpty} from 'class-validator';

export class LoanProgram {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  type: number;

  @IsNotEmpty()
  sequence: number;

  @IsNotEmpty()
  name: string;
}
