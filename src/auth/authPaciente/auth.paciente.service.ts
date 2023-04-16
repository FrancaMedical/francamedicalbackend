import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Paciente } from '../../../schemas/paciente';
import * as bcrypt from 'bcrypt';
import { CreatePacienteDTO } from '../../paciente/dto/paciente.create.dto';
import { AuthRegisterPacienteDTO } from '../dtos/auth-register-paciente.dto';


@Injectable()
export class AuthService {
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
        const user = await this.Paciente.findOne({
          nome: nome,
          $and: [
            {
              password: password
            }
          ]
        }).exec();
    
        if (!user) throw new UnauthorizedException('Usuário ou senha incorretos.');
    
        return {
          token: this.createToken(user),
          user,
        };
      }

      async register(data: AuthRegisterPacienteDTO) {
        const user = await this.Paciente.create(data);
    
        return this.createToken(user);
      }
}
