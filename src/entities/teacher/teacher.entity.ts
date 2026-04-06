import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user/user.entity';

@Entity()
export class Teacher {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documento: string;

  @Column()
  especialidad: string;

  @Column()
  telefono: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}