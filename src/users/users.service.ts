import { UserInput, UserOutput, UsersOutput } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    try {
      console.log(createUserInput);
      const newUser = this.users.create(createUserInput);
      const res = this.users.save(newUser);
      console.log('res: ', res);

      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'could not make user',
      };
    }
  }

  async findAll(): Promise<UsersOutput> {
    try {
      const allUsers = await this.users.find();
      return {
        ok: true,
        users: allUsers,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'could not find all',
      };
    }
  }

  async findOne(id: number): Promise<UserOutput> {
    try {
      const user = await this.users.findOne(id);
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'could not find the user',
      };
    }
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    try {
      const user = await this.users.findOne(id);

      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const res = await this.users.save([
        {
          id: id,
          ...updateUserInput,
        },
      ]);

      console.log('updated res:', res);

      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'could not update user',
      };
    }
  }

  async remove(id: number) {
    try {
      const user = await this.users.findOne(id);
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      await this.users.delete(id);

      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'could not delete',
      };
    }
  }
}
