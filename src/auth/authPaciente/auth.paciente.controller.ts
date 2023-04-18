import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthPacienteService } from './auth.paciente.service';
import { User } from '../../decorator/user.decorator';
import { AuthLoginDTO } from '../dtos/login.dto';
import { AuthPacienteGuard } from '../../guards/auth.paciente.guard';

@Controller('auth')
export class AuthPacienteController {
    constructor(
        private readonly authService: AuthPacienteService,
    ) { }

    @Post('login/pacientes')
    async login(@Body() { nome, password }: AuthLoginDTO) {
        return this.authService.login(nome, password);
    }
    
    @UseGuards(AuthPacienteGuard)
    @Post('me/pacientes')
    async me(@User() user) {
        return { user };
    }
}
