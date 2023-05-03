import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth-medico.service';
import { AuthLoginDTO } from './dtos/login.dto';
import { User } from '../decorator/user.decorator';
import { AuthMedicoGuard } from '../guards/auth.medico.guard';
import { AuthPacienteService } from './auth-paciente.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authPacienteService: AuthPacienteService,
    ) { }

   
    @Post('login')
    async login(@Body() { nome, password }: AuthLoginDTO) {
        return this.authService.login(nome, password);
    }

    @Post('login/pacientes')
    async loginPaciente(@Body() { nome }: AuthLoginDTO) {
        return this.authPacienteService.login(nome);
    }

    @UseGuards(AuthMedicoGuard)
    @Post('me')
    async medico(@User() user) {
        return { user };
    }
}
