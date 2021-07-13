import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: '유저 생성 API',
    description: '유저를 한명 생성합니다.',
  })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  create(@Body() createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Get()
  @ApiOperation({
    summary: '모든 유저 정보 조회 API',
    description: '유저를 모두 조회합니다.',
  })
  @ApiCreatedResponse({ description: '유저를 모두 조회한다.', type: User })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 유저 정보 조회 API',
    description: '아이디를 사용하여 유저를 한명 조회합니다.',
  })
  @ApiCreatedResponse({ description: '유저를 한명 조회한다.', type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '유저 정보 업데이트 API',
    description: '특정 유저 정보를 업데이트 합니다.',
  })
  @ApiCreatedResponse({
    description: '특정 유저 정보를 업데이트 한다.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserInput: UpdateUserInput) {
    return this.usersService.update(+id, updateUserInput);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '유저 삭제 API',
    description: '특정 유저 정보를 삭제 합니다.',
  })
  @ApiCreatedResponse({
    description: '특정 유저를 삭제한다.',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
