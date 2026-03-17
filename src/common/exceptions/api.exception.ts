import { HttpException, HttpStatus } from "@nestjs/common";
//* General API Exception
export class ApiException extends HttpException {
    constructor(message: string) {
        super({ error: 'ApiError', message }, HttpStatus.BAD_REQUEST)
    }
}

//* Exception for unauthorized access
export class UnauthorizedAccessException extends HttpException {
  constructor(action: string) {
    super(
      {
        error: 'UnauthorizedAccess',
        message: `No tienes permisos para ${action}`,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
//* Exception for validation errors
export class ValidationException extends HttpException {
  constructor(errors: string[]) {
    super(
      {
        error: 'ValidationError',
        message: 'Datos inválidos',
        details: errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
