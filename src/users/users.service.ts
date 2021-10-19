import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {User} from './user.model'
import {CreateUserDto} from './dto/create-user.dto'
import {RolesService} from '../roles/roles.service'
import {AddRolesDto} from './dto/add-roles.dto'
import {BanUserDto} from './dto/ban-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('ADMIN')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUser() {
    const users = await this.userRepository.findAll({include: {all: true}})
    return users
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
    return user
  }

  async addUserRole(dto: AddRolesDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (user && role) {
      await user.$add('role', role.id)
      return dto
    }

    throw new HttpException('Пользователь или роль не найдена', HttpStatus.NOT_FOUND)
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (user) {
      user.banned = true
      user.babReason = dto.banReason
      user.save()
      return dto
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
  }
}
