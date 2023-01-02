import { IsNotEmpty } from 'class-validator';

export class SigaLoginBody {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
