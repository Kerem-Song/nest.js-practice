import { User } from '../entities/user.entity';
import { CoreOutput } from './output.dto';

export class UserInput {
  id: number;
}

export class UserOutput extends CoreOutput {
  user?: User;
}

export class UsersInput {
  take: number;
}

export class UsersOutput extends CoreOutput {
  users?: User[];
}
