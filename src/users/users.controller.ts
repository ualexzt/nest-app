import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common'
import {UsersService} from './users.service'
import {CreateUserDto} from './dto/create-user.dto'
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import {User} from './user.model'
import {Roles} from 'src/auth/roles-auth.decorator'
import {RolesGuard} from 'src/auth/roles.guard'
import {BanUserDto} from './dto/ban-user.dto'
import {AddRolesDto} from './dto/add-roles.dto'
import {ValidatorPipe} from 'src/sharead/validator.pipe'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidatorPipe)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({summary: 'Получение всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllUser() {
    return this.userService.getAllUser()
  }

  @ApiOperation({summary: 'Добавление роли пользователю'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRoles(@Body() dto: AddRolesDto) {
    return this.userService.addUserRole(dto)
  }

  @ApiOperation({summary: 'Блокирование пользователю'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/baned')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto)
  }
}
