import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenExpirationInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is in the Authorization header
    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        // Check if token expiration date is in the past
        if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
          throw new UnauthorizedException('Token expired');
        }
      } catch (error) {
        throw new UnauthorizedException('Token invalid or expired');
      }
    } else {
      throw new UnauthorizedException('Token not provided');
    }
// console.log(token);
    return next.handle().pipe(
      catchError((error) => {
        throw new UnauthorizedException('Unauthorized');
      }),
    );
  }
}
