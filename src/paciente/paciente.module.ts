import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PacienteSchema } from '../../schemas/paciente.schema';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'CreatePacienteDTO', schema: PacienteSchema}])],
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService]
})
export class PacienteModule {}
