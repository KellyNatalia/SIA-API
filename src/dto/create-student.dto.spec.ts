import { describe, it } from 'node:test';
import { expect } from '@jest/globals';
import { CreateStudentDto } from './create-student.dto';

describe ('CreateStudentDto', () => {
  it('should be defined', () => {
    expect(new CreateStudentDto()).toBeDefined();
  });
});

