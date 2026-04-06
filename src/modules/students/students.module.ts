import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { Student } from 'src/entities/student/student.entity';
import { User } from 'src/entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}