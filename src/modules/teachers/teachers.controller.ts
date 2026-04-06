import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from 'src/dto/create-teacher.dto';

@Controller('teachers')
export class TeachersController {

  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }
}