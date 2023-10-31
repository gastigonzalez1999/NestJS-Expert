import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "src/products/entities/product.entity";

@Entity('users')
export class User {

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User Id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string
  
  @ApiProperty({
    example: '******',
    description: 'User password',
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'Gaston Gonzalez',
    description: 'User full name',
  })
  @Column('text', {})
  fullName: string;

  @ApiProperty({
    example: 'true',
    description: 'User status',
    default: true,
  })
  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    example: ['amdin', 'super'],
    description: 'User roles',
    isArray: true,
    default: ['user'],
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(
    () => Product,
    (product) => product.user,
  )
  product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email =  this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdatet() {
    this.checkFieldsBeforeInsert();
  }
}
