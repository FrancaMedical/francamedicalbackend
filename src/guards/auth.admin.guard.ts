import {CanActivate, Injectable, ExecutionContext} from '@nestjs/common'
import { AdminService } from '../admin/admin.service';
import { AuthAdminService } from '../auth/auth-admin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(
        private readonly authAdminService: AuthAdminService,
        private readonly adminService: AdminService,
      ) {}
    
      async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        try {
          const data = this.authAdminService.checkToken(
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