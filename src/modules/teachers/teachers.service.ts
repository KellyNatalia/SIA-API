import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from 'src/dto/create-teacher.dto';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class TeachersService {

  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {

    const user = await this.userRepo.findOneBy({
      id: createTeacherDto.userId,
    });

    const teacher = this.teacherRepo.create({
      documento: createTeacherDto.documento,
      especialidad: createTeacherDto.especialidad,
      telefono: createTeacherDto.telefono,
      user: user || undefined,
    });

    return this.teacherRepo.save(teacher);
  }

  findAll() {
    return this.teacherRepo.find({
      relations: ['user'],
    });
  }
}