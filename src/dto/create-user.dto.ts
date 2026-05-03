import { IsEmail, IsNotEmpty, Length, IsOptional, IsEnum } from "class-validator";
import { RolesEnum } from "src/entities/user/user.entity";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 10, {message: 'La contraseña debe tener entre 8 y 10 caracteres' })
    password: string;

    @IsOptional()
    @IsEnum(RolesEnum, { message: 'El rol debe ser: admin, student o teacher' })
    role?: RolesEnum = RolesEnum.STUDENT;

    @IsOptional()
    status?: boolean = true;
}