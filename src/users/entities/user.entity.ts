import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, isNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '이름' })
  @Column()
  @IsString()
  firstName: string;

  @ApiProperty({ description: '성' })
  @Column()
  @IsString()
  lastName: string;

  @ApiProperty({ description: '활성화' })
  @Column({ default: true, comment: '활성화' })
  @IsBoolean()
  isActive: boolean;
}
