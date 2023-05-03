import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthMedicoService } from './auth-medico.service';
import { AuthLoginDTO } from './dtos/login.dto';
import { User } from '../decorator/user.decorator';
import { AuthMedicoGuard } from '../guards/auth.medico.guard';
import { AuthPacienteService } from './auth-paciente.service';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminGuard } from '../guards/auth.admin.guard';
import { AuthAdminLoginDTO } from './dtos/login.admin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authMedicoService: AuthMedicoService,
        private readonly authPacienteService: AuthPacienteService,
        private readonly authAdminService: AuthAdminService,
    ) { }

    @Post('login/admin')
    async admin(@Body() { email, password }: AuthAdminLoginDTO) {
        return this.authAdminService.login(email, password);
    }
   
    @Post('login/medico')
    async paciente(@Body() { nome, password }: AuthLoginDTO) {
        return this.authMedicoService.login(nome, password);
    }

    @Post('login/pacientes')
    async medico(@Body() { nome }: AuthLoginDTO) {
        return this.authPacienteService.login(nome);
    }

    @UseGuards(AuthAdminGuard)
    @Post('me')
    async _me(@User() user) {
        return { user };
    }
}
