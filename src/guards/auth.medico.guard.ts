import {CanActivate, Injectable, ExecutionContext} from '@nestjs/common'
import { AuthMedicoService } from '../auth/auth-medico.service';
import { MedicoService } from '../medico/medico.service';

@Injectable()
export class AuthMedicoGuard implements CanActivate {
    constructor(
        private readonly authMedicoService: AuthMedicoService,
        private readonly medicoService: MedicoService,
      ) {}
    
      async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        try {
          const data = this.authMedicoService.checkToken(
            (authorization ?? '').split(' ')[1],
          );
          
          request.tokenPayload = data;
          request.user = await this.medicoService.getById(data.id);
    
          return request.user;
          ;
        } catch (e) {
          return false;
        }
      }
}