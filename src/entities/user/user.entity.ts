import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type Roles = 'admin' | 'student' | 'teacher';

export enum RolesEnum {
   ADMIN = 'admin',
   STUDENT = 'student',
   TEACHER = 'teacher'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: true })
    status: boolean;

    @Column({ nullable: false, type: 'enum', enum: RolesEnum, default: RolesEnum.STUDENT })
    role: Roles;
}