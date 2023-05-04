import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMedicoService } from './auth-medico.service';
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
import { AuthAdminService } from './auth-admin.service';
import { AdminSchema } from '../../schemas/admin.schema';
import { FileModule } from '../files/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
    }),
    forwardRef(() => PacienteModule),
    forwardRef(() => ConsultaModule),
    forwardRef(() => MedicoModule),
    forwardRef(() => AdminModule),
    forwardRef(() => FileModule),
    MongooseModule.forFeature([{name: 'CreatePacienteDTO', schema: PacienteSchema}]),
    MongooseModule.forFeature([{name: 'CreateMedicoDTO', schema: MedicoSchema}]),
    MongooseModule.forFeature([{name: 'CreateAdminDTO', schema: AdminSchema}]),
  ],
  providers: [
    AuthMedicoService, 
    AuthPacienteService,
    AuthAdminService
  ],
  controllers: [AuthController],
  exports: [
    AuthMedicoService, 
    AuthPacienteService,
    AuthAdminService
  ]
})
export class AuthModule {}
