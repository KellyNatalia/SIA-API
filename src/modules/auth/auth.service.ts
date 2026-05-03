import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

/**
 * @class AuthService
 * @description Servicio que gestiona el registro, autenticación y generación de tokens JWT.
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    /**
    * @method register
    * @description Registra un nuevo usuario cifrando su contraseña.
    * @param data - Datos del usuario a registrar.
    * @returns Mensaje de confirmación y datos básicos del usuario creado.
    */
    async register(data: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userCreated = this.userRepo.create({ ...data, password: hashedPassword });
        await this.userRepo.save(userCreated);
        return { message: 'Usuario registrado correctamente', user: { id: userCreated.id, email: userCreated.email } };
    }

    /**
    * @method login
    * @description Verifica credenciales y genera token JWT.
    * @param data - Datos de inicio de sesión.
    * @returns Token de acceso JWT.
    * @throws UnauthorizedException - Si las credenciales no son válidas.
    */
    async login(data: LoginDTO) {
        const user = await this.userRepo.findOne({ where: { email: data.email } });

        if (!user) {
            throw new UnauthorizedException('El correo es Invalido');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('La Contraseña es Invalida');
        }

        const payloadToken = { sub: user.id, email: user.email, name: user.name, role: user.role };
        const token = await this.jwtService.signAsync(payloadToken);

        return { accessToken: token }

    }

    /**
     * @method getProfile
     * @description Obtiene el perfil completo del usuario desde la base de datos.
     * @param userId - ID del usuario.
     * @returns Información completa del usuario (id, name, email, role, status).
     */
    async getProfile(userId: number) {
        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        };
    }

    /**
     * @method createAdminUser
     * @description Crea un usuario admin de prueba para desarrollo (admin@example.com).
     * @returns Usuario admin creado.
     */
    async createAdminUser() {
        // Verifica si el admin ya existe
        const existingAdmin = await this.userRepo.findOne({ 
            where: { email: 'admin@example.com' } 
        });

        if (existingAdmin) {
            return { 
                message: 'Usuario admin ya existe',
                user: {
                    id: existingAdmin.id,
                    name: existingAdmin.name,
                    email: existingAdmin.email,
                    role: existingAdmin.role,
                    status: existingAdmin.status
                }
            };
        }

        // Crea el usuario admin
        const hashedPassword = await bcrypt.hash('Admin123', 10);
        const adminUser = this.userRepo.create({
            name: 'Administrador',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            status: true
        });

        await this.userRepo.save(adminUser);

        return {
            message: 'Usuario admin creado exitosamente',
            user: {
                id: adminUser.id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
                status: adminUser.status
            },
            credentials: {
                email: 'admin@example.com',
                password: 'Admin123'
            }
        };
    }
}
