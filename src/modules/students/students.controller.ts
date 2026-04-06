import { Body,Controller, Post, Get} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { LoginDTO } from 'src/dto/login.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

@Post('register')
    register(@Body() data: CreateStudentDto) {
        return this.studentsService.create(data);
    }

    @Post('login')
        login(@Body() data: LoginDTO) {
            return this.studentsService.login(data);
        }
}
