import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadConfig from '@config/upload';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import BaseQueryParamsDTO from '@utils/query-params.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: uploadConfig.multer.storage,
    }),
  )
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file?: IFile) {
    createUserDto.avatar = file?.filename;

    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({
    description: 'Return all users',
    type: User,
    isArray: true,
  })
  @Get()
  findAll(@Query() query: BaseQueryParamsDTO) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') user_id: string) {
    return this.userService.findOne(user_id);
  }

  @Put(':id')
  update(@Param('id') user_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') user_id: string) {
    return this.userService.remove(user_id);
  }
}
