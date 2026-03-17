import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
    * findAll: Método para obtener todos los usuarios.
    */
    @Get()
    @Roles(RolesEnum.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    /**
    * findOne: Método para buscar un usuario por ID.
    * @typeParam id - { number } - ID del usuario.
    */
    @Get(':id')
    @Roles(RolesEnum.ADMIN)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    /**
     * findName: Método para buscar usuario por nombre.
     * @typeParam name - { string } - Nombre del usuario.
     */
    @Get('name/:name')
    @Roles(RolesEnum.ADMIN)
    findName(@Param('name') name: string) {
        return this.usersService.findName(name);
    }

    /**
  * create: Método para crear un nuevo usuario.
  * @typeParam body - { CreateUserDTO } - Datos del nuevo usuario.
  */
    @Post()
    @Roles(RolesEnum.ADMIN)
    create(@Body() body: CreateUserDTO) {
        return this.usersService.create(body);
    }

    /**
     * update: Método para actualizar un usuario existente.
     * @typeParam id - { number } - ID del usuario.
     * @typeParam body - { UpdateUserDTO } - Datos a actualizar.
     */
    @Put(':id')
    @Roles(RolesEnum.ADMIN)
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return this.usersService.update(id, body);
    }

    /**
    * desactivar: Método para desactivar un usuario.
    * @typeParam id - { number } - ID del usuario.
    */
    @Delete(':id')
    @Roles(RolesEnum.ADMIN)
    desactivar(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.disabled(id);
    }
}
