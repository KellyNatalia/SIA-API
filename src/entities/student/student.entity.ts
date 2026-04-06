import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/entities/user/user.entity';

@Entity()
export class Student {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
 documento: string;

  @Column()
  edad: number;

  @Column()
  telefono: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}