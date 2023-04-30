import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PacienteSchema } from '../../schemas/paciente.schema';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'CreatePacienteDTO', schema: PacienteSchema}]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService]
})
export class PacienteModule {}
