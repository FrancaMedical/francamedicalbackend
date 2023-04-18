import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from '../../paciente/paciente.module';
import { ConsultaModule } from '../../consulta/consulta.module';
import { PacienteSchema } from '../../../schemas/paciente.schema';
import { AuthPacienteService } from './auth.paciente.service';
import { AuthPacienteController } from './auth.paciente.controller';
import { AuthModule } from '../auth.module';
import { MedicoModule } from '../../medico/medico.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
    }),
    forwardRef(() => PacienteModule),
    forwardRef(() => ConsultaModule),
    forwardRef(() => MedicoModule),
    forwardRef(() => AuthModule),

    MongooseModule.forFeature([{name: 'CreatePacienteDTO', schema: PacienteSchema}]),
  ],
  providers: [AuthPacienteService],
  controllers: [AuthPacienteController],
  exports: [AuthPacienteService]
})
export class AuthPacienteModule {}
