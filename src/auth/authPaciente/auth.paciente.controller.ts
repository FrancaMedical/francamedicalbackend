import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.paciente.service';
import { User } from '../../decorator/user.decorator';
import { AuthLoginDTO } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login/pacientes')
    async login(@Body() { nome, password }: AuthLoginDTO) {
        return this.authService.login(nome, password);
    }

    // @UseGuards(AuthPacienteGuard)
    @Post('me/pacientes')
    async me(@User() user) {
        return { user };
    }
}
