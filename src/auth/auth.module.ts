import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MedicoModule } from '../medico/medico.module';
import { PacienteModule } from '../paciente/paciente.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicoSchema } from '../schemas/medico.schema';
import { ConsultaModule } from '../consulta/consulta.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
    }),
    forwardRef(() => MedicoModule),
    forwardRef(() => PacienteModule),
    forwardRef(() => ConsultaModule),
    MongooseModule.forFeature([{name: 'CreateMedicoDTO', schema: MedicoSchema}]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
