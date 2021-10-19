import {ApiProperty} from '@nestjs/swagger'
import {IsString, Length, IsEmail} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'user@exp.com',
    description: 'Почтоовый адрес пользователя',
  })
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: 'Не корректный email'})
  readonly email: string

  @ApiProperty({
    example: 'р12Имя34',
    description: 'Пароль пользователя',
  })
  @IsString({message: 'Должно быть строкой'})
  @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
  readonly password: string
}
