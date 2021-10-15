import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../sharead/user-roles.model';

interface UserCreationAtr {
  email: string;
  password: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAtr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user@exp.com',
    description: 'Почтоовый адрес пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @ApiProperty({
    example: 'р12Имя34',
    description: 'Пароль пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @ApiProperty({
    example: 'true',
    description: 'Забанен или нет',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({
    example: 'За нарушение правил',
    description: 'Причина бана пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  babReason: string;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
