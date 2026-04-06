import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from 'src/entities/student/student.entity';
import { User } from 'src/entities/user/user.entity';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class StudentsService {
  login(data: LoginDTO) {
      throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {

    const user = await this.userRepo.findOneBy({
      id: createStudentDto.userId,
    });

    const student = this.studentRepo.create({
      documento: createStudentDto.documento,
      edad: createStudentDto.edad,
      telefono: createStudentDto.telefono,
      user: user || undefined,
    });

    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find({
      relations: ['user'],
    });
  }
}