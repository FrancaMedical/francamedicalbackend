import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MedicoModule } from '../medico/medico.module';
import { PacienteModule } from '../paciente/paciente.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicoSchema } from '../schemas/medico.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: '5zyTX2S0noH!miJ5GPWc!94IZ6SfsNz4',
    }),
    forwardRef(() => MedicoModule),
    forwardRef(() => PacienteModule),
    MongooseModule.forFeature([{name: 'CreateMedicoDTO', schema: MedicoSchema}])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
