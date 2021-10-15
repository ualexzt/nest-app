import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@exp.com',
    description: 'Почтоовый адрес пользователя',
  })
  email: string;

  @ApiProperty({
    example: 'р12Имя34',
    description: 'Пароль пользователя',
  })
  password: string;
}
