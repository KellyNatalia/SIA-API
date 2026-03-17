import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    /**
     * findAll: Método que devuelve todos los usuarios.
     */
    findAll() {
        return this.userRepo.find();
    }

    /**
    * findOne: Método para obtener un usuario por ID.
    * @typeParam id - { number } - ID del usuario.
    */
    async findOne(id: number) {
        const userFind = await this.userRepo.findOne({ where: { id } })
        if (!userFind) throw new NotFoundException('Usuario no encontrado')
        return userFind
    }

    /**
     * findName: Método para buscar usuarios por nombre.
     * @typeParam name - { string } - Nombre del usuario.
     */
    async findName(name: string) {
        const userFindName = await this.userRepo.find({ where: { name } });
        if (!userFindName) throw new NotFoundException('Nombre no encontrado');
        return userFindName;
    }

    /**
    * create: Método para crear un nuevo usuario.
    * @typeParam newUser - { CreateUserDTO } - Datos del usuario a crear.
    */
    create(newUser: CreateUserDTO) {
        newUser.name = newUser.name.toLocaleLowerCase()
        const userCreated = this.userRepo.create(newUser)
        return this.userRepo.save(userCreated)
    }

    /**
    * update: Método para actualizar un usuario existente.
    * @typeParam id - { number } - ID del usuario.
    * @typeParam updateUser - { UpdateUserDTO } - Datos actualizados.
    */
    async update(id: number, updateUser: UpdateUserDTO) {
        const hashedPassword = await bcrypt.hash(updateUser.password, 10)
        await this.userRepo.update(id, { ...updateUser, password: hashedPassword });
        return this.findOne(id);
    }

    /**
    * disabled: Método para desactivar un usuario.
    * @typeParam id - { number } - ID del usuario.
    */
    async disabled(id: number) {
        const userFind = await this.userRepo.findOne({ where: { id } });
        if (!userFind) { throw new NotFoundException(`Usuario con ID ${id} no encontrado`) }

        userFind.status = false;
        await this.userRepo.save(userFind);

        return { message: `Usuario con el ID ${id} ha sido desactivado correctamente`, userFind }
    }

}
