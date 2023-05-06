import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, BadRequestException } from '@nestjs/common';
import { AuthMedicoService } from './auth-medico.service';
import { AuthLoginDTO } from './dtos/login.dto';
import { User } from '../decorator/user.decorator';
import { AuthPacienteService } from './auth-paciente.service';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminGuard } from '../guards/auth.admin.guard';
import { AuthAdminLoginDTO } from './dtos/login.admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from '../files/file.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authMedicoService: AuthMedicoService,
        private readonly authPacienteService: AuthPacienteService,
        private readonly authAdminService: AuthAdminService,
        private readonly fileService: FileService,
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
    async medico(@Body() { nome, password }: AuthLoginDTO) {
        return this.authPacienteService.login(nome, password);
    }

    @UseGuards(AuthAdminGuard)
    @Post('me')
    async _me(@User() user) {
        return { user };
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthAdminGuard)
    @Post('photo')
    async upload(
        @User() user,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: (100 * 1024 * 1024)})
                ]
            })
        )
        photo: Express.Multer.File,
    ) { 
        const path = join(
            __dirname,'..', '..', '..', 'storage', 'photos', `photo-${user.id}.dcm`
        )

        try {
            await this.fileService.upload(photo, path);
        } catch (error) {
            throw new BadRequestException(error);
        }

        return {success: true}
    }

}
