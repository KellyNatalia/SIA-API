import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 10, {message: 'La contraseña debe tener entre 8 y 10 caracteres' })
    password: string;
}