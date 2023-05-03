import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth-medico.service';
import { AuthController } from './auth.controller';
import { MedicoModule } from '../medico/medico.module';
import { PacienteModule } from '../paciente/paciente.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicoSchema } from '../../schemas/medico.schema';
import { ConsultaModule } from '../consulta/consulta.module';
import { ConfigModule } from '@nestjs/config';
import { PacienteSchema } from '../../schemas/paciente.schema';
import { AuthPacienteService } from './auth-paciente.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
    }),
    forwardRef(() => MedicoModule),
    forwardRef(() => PacienteModule),
    forwardRef(() => ConsultaModule),
    forwardRef(() => AdminModule),
    MongooseModule.forFeature([{name: 'CreatePacienteDTO', schema: PacienteSchema}]),
    MongooseModule.forFeature([{name: 'CreateMedicoDTO', schema: MedicoSchema}]),
  ],
  providers: [AuthService, AuthPacienteService],
  controllers: [AuthController],
  exports: [AuthService, AuthPacienteService]
})
export class AuthModule {}
