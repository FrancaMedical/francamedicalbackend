import {CanActivate, Injectable, ExecutionContext} from '@nestjs/common'
import { AuthService } from '../auth/auth-medico.service';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthMedicoGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService,
      ) {}
    
      async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        try {
          const data = this.authService.checkToken(
            (authorization ?? '').split(' ')[1],
          );
          
          request.tokenPayload = data;
          request.user = await this.adminService.getById(data.id);
    
          return request.user;
          ;
        } catch (e) {
          return false;
        }
      }
}