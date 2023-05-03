import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../../schemas/admin';
import * as bcrypt from 'bcrypt';
import { AuthRegisterMedicoDTO } from './dtos/auth-register-medico.dto';
import { CreateAdminDTO } from '../admin/dto/admin.create.dto';

@Injectable()
export class AuthAdminService {
  private issuer = 'login';
  private audience = 'users';
  constructor(
    private readonly JWRService: JwtService,
    @InjectModel('CreateAdminDTO') private readonly Admin: Model<CreateAdminDTO>,
  ) { }

  createToken(admin: Admin) {
    return {
      accessToken: this.JWRService.sign(
        {
          id: admin._id,
          name: admin.nome,
          email: admin.email,
        },
        {
          expiresIn: '7 days',
          subject: String(admin._id),
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

  async login(email: string, password: string) {
    const admin = await this.Admin.findOne({ email: email }).exec();

    if (!admin) throw new UnauthorizedException('Usuário ou senha incorretos.');

    if (!(await bcrypt.compare(password, admin.password)))
      throw new UnauthorizedException('Usuário ou senha incorretos.');

    return {
      token: this.createToken(admin),
      admin,
    };

  }

  async register(data: AuthRegisterMedicoDTO) {
    const user = await this.Admin.create(data);

    return this.createToken(user);
  }
}
