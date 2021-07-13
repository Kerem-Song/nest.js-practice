import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { CoreOutput } from './output.dto';

export class CreateUserInput extends PickType(User, [
  // 'id',
  'firstName',
  'lastName',
  'isActive',
]) {
  // id: number;
  // firstName: string;
  // lastName: string;
  // isActive: boolean;
}

export class CreateUserOutput extends CoreOutput {}
