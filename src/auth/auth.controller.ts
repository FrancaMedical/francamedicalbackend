import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dtos/login.dto';
import { User } from '../decorator/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() { nome, password }: AuthLoginDTO) {
        return this.authService.login(nome, password);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return { user };
    }
}
