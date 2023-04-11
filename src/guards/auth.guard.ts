import {CanActivate, Injectable, ExecutionContext} from '@nestjs/common'
import { AuthService } from '../auth/auth.service';
import { MedicoService } from '../medico/medico.service';
import { PacienteService } from '../paciente/paciente.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly medicoService: MedicoService,
        private readonly pacienteService: PacienteService,
      ) {}
    
      async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        try {
          const data = this.authService.checkToken(
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