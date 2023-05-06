import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Paciente } from '../../schemas/paciente';
import { AuthRegisterMedicoDTO } from './dtos/auth-register-medico.dto';
import { CreatePacienteDTO } from '../paciente/dto/paciente.create.dto';


@Injectable()
export class AuthPacienteService {
    private issuer = 'login';
    private audience = 'users';
    constructor(
        private readonly JWRService: JwtService,
        @InjectModel('CreatePacienteDTO') private readonly Paciente: Model<CreatePacienteDTO>
    ) { }

    createToken(paciente: Paciente) {
        return {
            accessToken: this.JWRService.sign(
                {
                    id: paciente._id,
                    name: paciente.nome,
                    cpf: paciente.cpf,
                },
                {
                    expiresIn: '7 days',
                    subject: String(paciente._id),
                    issuer: this.issuer,
                    audience: this.audience,
                },
            ),
        };
    }

    checkToken(token: string) {
        try {
            const data = this.JWRService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(nome: string, password: string) {
        const paciente = await this.Paciente.findOne({ password: password, nome: nome}).exec();
        if (!paciente) throw new UnauthorizedException('Usuário não encontrado.');

        return {
            token: this.createToken(paciente),
            paciente,
        };

    }

    async register(data: AuthRegisterMedicoDTO) {
        const user = await this.Paciente.create(data);

        return this.createToken(user);
    }
}

