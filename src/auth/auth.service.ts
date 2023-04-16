import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateMedicoDTO } from '../medico/dto/medico.create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Medico } from '../../schemas/medico';
import * as bcrypt from 'bcrypt';
import { AuthRegisterMedicoDTO } from './dtos/auth-register-medico.dto';


@Injectable()
export class AuthService {
    private issuer = 'login';
    private audience = 'users';
    constructor(
        private readonly JWRService: JwtService,
        @InjectModel('CreateMedicoDTO') private readonly Medico: Model<CreateMedicoDTO>
    ) { }

    createToken(medico: Medico) {
        return {
          accessToken: this.JWRService.sign(
            {
              id: medico._id,
              name: medico.nome,
              crm: medico.crm,
            },
            {
              expiresIn: '7 days',
              subject: String(medico._id),
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
        const user = await this.Medico.findOne({nome: nome}).exec();
    
        if (!user) throw new UnauthorizedException('Usuário ou senha incorretos.');
    
        if (!(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException('Usuário ou senha incorretos.');
        }
    
        return {
          token: this.createToken(user),
          user,
        };
      }

      async register(data: AuthRegisterMedicoDTO) {
        const user = await this.Medico.create(data);
    
        return this.createToken(user);
      }
}
